// ============================================================
// OMNIOFFICE — Canvas Renderer
// Pure function — takes state, paints canvas. No side effects.
// Called every animation frame via requestAnimationFrame.
// ============================================================

import type { AnyCanvasObject, Viewport } from '@/types/canvas'
import { reflow, tokenise, getHandlePositions, DEFAULT_REFLOW_CONFIG } from '@/engine/reflow'
import { TOOL_STYLES } from './toolStyles'

interface RenderState {
  objects:    AnyCanvasObject[]
  selectedId: string | null
  viewport:   Viewport
}

// Sample text — replaced by real document content in Phase 2
const SAMPLE_TEXT = `Begin writing here. Place objects on the canvas and watch the text reflow around them in real time.

This is OmniOffice — one canvas, every tool, no walls between them. Drag any object. Resize it. The text moves with it instantly.

Every capability is available everywhere on this canvas. Citations, math, code, charts, databases, diagrams — all native tools you place and use in place. The page edge is the only law. Everything inside it is yours.`

const WORDS = tokenise(SAMPLE_TEXT)

export function renderCanvas(
  ctx: CanvasRenderingContext2D,
  state: RenderState
): void {
  const { objects, selectedId, viewport } = state
  const { zoom, panX, panY } = viewport
  const W = ctx.canvas.width
  const H = ctx.canvas.height

  // ── Clear ──────────────────────────────────────────────
  ctx.clearRect(0, 0, W, H)

  // ── Background (canvas surface colour) ────────────────
  ctx.fillStyle = '#e8e6e1'
  ctx.fillRect(0, 0, W, H)

  // ── Apply viewport transform ───────────────────────────
  ctx.save()
  ctx.translate(panX, panY)
  ctx.scale(zoom, zoom)

  // ── Paper surface ──────────────────────────────────────
  const paperW = 900
  const paperH = Math.max(H / zoom + 200, 1200)
  const paperX = (W / zoom - paperW) / 2
  const paperY = 40

  // Paper shadow
  ctx.shadowColor   = 'rgba(0,0,0,0.12)'
  ctx.shadowBlur    = 24
  ctx.shadowOffsetY = 4
  ctx.fillStyle = '#faf8f3'
  ctx.fillRect(paperX, paperY, paperW, paperH)
  ctx.shadowColor = 'transparent'
  ctx.shadowBlur  = 0

  // ── Baseline rules ─────────────────────────────────────
  ctx.strokeStyle = 'rgba(0,0,0,0.03)'
  ctx.lineWidth   = 1
  const cfg = {
    ...DEFAULT_REFLOW_CONFIG,
    canvasWidth:  paperX + paperW - DEFAULT_REFLOW_CONFIG.marginRight,
    marginLeft:   paperX + DEFAULT_REFLOW_CONFIG.marginLeft,
    canvasHeight: paperY + paperH,
  }
  for (let y = paperY + cfg.marginTop; y < paperY + paperH; y += cfg.lineHeight) {
    ctx.beginPath()
    ctx.moveTo(paperX + cfg.marginLeft - paperX, y)
    ctx.lineTo(paperX + paperW - DEFAULT_REFLOW_CONFIG.marginRight, y)
    ctx.stroke()
  }

  // ── Reflow engine ──────────────────────────────────────
  const reflowCfg = {
    ...DEFAULT_REFLOW_CONFIG,
    canvasWidth:  paperX + paperW - DEFAULT_REFLOW_CONFIG.marginRight,
    marginLeft:   paperX + DEFAULT_REFLOW_CONFIG.marginLeft,
    marginTop:    paperY + DEFAULT_REFLOW_CONFIG.marginTop,
    canvasHeight: paperY + paperH,
  }

  const segments = reflow(WORDS, objects, reflowCfg)

  // ── Render text ────────────────────────────────────────
  ctx.font         = `${reflowCfg.fontSize}px Georgia, serif`
  ctx.fillStyle    = '#2c2c2c'
  ctx.textBaseline = 'top'
  for (const seg of segments) {
    ctx.fillText(seg.text, seg.x, seg.y)
  }

  // ── Render objects (back to front) ────────────────────
  for (const obj of objects) {
    if (!obj.visible) continue
    renderObject(ctx, obj, obj.id === selectedId)
  }

  // ── Restore viewport transform ─────────────────────────
  ctx.restore()

  // ── Zoom indicator ─────────────────────────────────────
  if (zoom !== 1) {
    ctx.font      = '11px DM Sans, sans-serif'
    ctx.fillStyle = 'rgba(0,0,0,0.3)'
    ctx.textBaseline = 'bottom'
    ctx.fillText(`${Math.round(zoom * 100)}%`, 12, H - 12)
  }
}

// ── Render a single canvas object ────────────────────────
function renderObject(
  ctx: CanvasRenderingContext2D,
  obj: AnyCanvasObject,
  selected: boolean
): void {
  const style = TOOL_STYLES[obj.type] ?? TOOL_STYLES.callout
  const { x, y, w, h } = obj

  ctx.save()
  ctx.globalAlpha = obj.opacity

  // Shadow
  ctx.shadowColor   = 'rgba(0,0,0,0.18)'
  ctx.shadowBlur    = selected ? 20 : 8
  ctx.shadowOffsetY = 3

  // Fill
  ctx.fillStyle = style.bg
  roundRect(ctx, x, y, w, h, 8)
  ctx.fill()

  ctx.shadowColor = 'transparent'
  ctx.shadowBlur  = 0
  ctx.shadowOffsetY = 0

  // Border
  ctx.strokeStyle = selected ? '#ffffff' : style.border
  ctx.lineWidth   = selected ? 2 : 1.5
  roundRect(ctx, x, y, w, h, 8)
  ctx.stroke()

  // Label
  ctx.font         = 'bold 11px DM Sans, sans-serif'
  ctx.fillStyle    = style.border
  ctx.textBaseline = 'top'
  ctx.fillText(style.label, x + 12, y + 12)

  // Wrap badge
  ctx.font      = '10px DM Sans, sans-serif'
  ctx.fillStyle = 'rgba(255,255,255,0.3)'
  ctx.fillText(`wrap: ${obj.wrapMode}`, x + 12, y + h - 18)

  // Selection handles + exclusion zone
  if (selected) {
    // Dashed exclusion zone
    ctx.setLineDash([4, 3])
    ctx.strokeStyle = 'rgba(192,57,43,0.5)'
    ctx.lineWidth   = 1
    const gap = 10
    ctx.strokeRect(x - gap, y - gap, w + gap * 2, h + gap * 2)
    ctx.setLineDash([])

    // 8 handles
    for (const [hx, hy] of getHandlePositions(obj)) {
      ctx.fillStyle   = '#ffffff'
      ctx.strokeStyle = style.border
      ctx.lineWidth   = 1.5
      ctx.shadowColor = 'rgba(0,0,0,0.2)'
      ctx.shadowBlur  = 4
      ctx.beginPath()
      ctx.arc(hx, hy, 5, 0, Math.PI * 2)
      ctx.fill()
      ctx.shadowColor = 'transparent'
      ctx.shadowBlur  = 0
      ctx.stroke()
    }
  }

  ctx.restore()
}

// ── Rounded rect path helper ──────────────────────────────
function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number, y: number,
  w: number, h: number,
  r: number
): void {
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.lineTo(x + w - r, y)
  ctx.quadraticCurveTo(x + w, y, x + w, y + r)
  ctx.lineTo(x + w, y + h - r)
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h)
  ctx.lineTo(x + r, y + h)
  ctx.quadraticCurveTo(x, y + h, x, y + h - r)
  ctx.lineTo(x, y + r)
  ctx.quadraticCurveTo(x, y, x + r, y)
  ctx.closePath()
}
