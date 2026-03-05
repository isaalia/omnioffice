// ============================================================
// OMNIOFFICE — Canvas Renderer
// Pure function — takes state, paints canvas. No side effects.
// Called every animation frame via requestAnimationFrame.
// ============================================================

import type {
  AnyCanvasObject,
  Viewport,
  InkObject,
  InkPoint,
  ImageObject,
  SpreadsheetObject,
  CodeObject,
} from '@/types/canvas'
import { reflow, tokenise, getHandlePositions, DEFAULT_REFLOW_CONFIG } from '@/engine/reflow'
import { TOOL_STYLES } from './toolStyles'

const PLACEHOLDER_TEXT = `Begin writing here. Place objects on the canvas and watch the text reflow around them in real time.

This is OmniOffice — one canvas, every tool, no walls between them. Drag any object. Resize it. The text moves with it instantly.

Every capability is available everywhere on this canvas. Citations, math, code, charts, databases, diagrams — all native tools you place and use in place. The page edge is the only law. Everything inside it is yours.`

// ── Image cache ───────────────────────────────────────────
const IMG_CACHE = new Map<string, HTMLImageElement | 'loading' | 'error'>()
let _renderCallback: (() => void) | null = null

export function setRenderCallback(fn: () => void): void {
  _renderCallback = fn
}

function loadImage(src: string): HTMLImageElement | null {
  if (!src) return null
  const cached = IMG_CACHE.get(src)
  if (cached === 'loading' || cached === 'error') return null
  if (cached instanceof HTMLImageElement) return cached
  // Not yet cached — kick off load
  const img = new Image()
  IMG_CACHE.set(src, 'loading')
  img.onload  = () => { IMG_CACHE.set(src, img); _renderCallback?.() }
  img.onerror = () => { IMG_CACHE.set(src, 'error') }
  img.src = src
  return null
}

interface RenderState {
  objects:    AnyCanvasObject[]
  selectedId: string | null
  viewport:   Viewport
  bodyText:   string
  textEditMode:    boolean  // reserved — used by CanvasRenderer for textarea overlay
  editingObjectId: string | null
  liveStroke: InkPoint[] | null
}

export function renderCanvas(
  ctx: CanvasRenderingContext2D,
  state: RenderState
): void {
  const { objects, selectedId, viewport, bodyText, editingObjectId, liveStroke } = state
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

  const sourceText = bodyText.trim() ? bodyText : PLACEHOLDER_TEXT
  const words = tokenise(sourceText)
  const segments = reflow(words, objects, reflowCfg)

  // ── Render text ────────────────────────────────────────
  ctx.font         = `${reflowCfg.fontSize}px Georgia, serif`
  ctx.fillStyle    = bodyText.trim() ? '#2c2c2c' : 'rgba(44,44,44,0.35)'
  ctx.textBaseline = 'top'
  for (const seg of segments) {
    ctx.fillText(seg.text, seg.x, seg.y)
  }

  // ── Render objects (back to front) ────────────────────
  for (const obj of objects) {
    if (!obj.visible) continue
    renderObject(ctx, obj, obj.id === selectedId, obj.id === editingObjectId)
  }

  // ── Live ink stroke (in-progress) ─────────────────────
  if (liveStroke && liveStroke.length >= 2) {
    ctx.save()
    ctx.strokeStyle = '#1a1a2e'
    ctx.lineWidth   = 2
    ctx.lineCap     = 'round'
    ctx.lineJoin    = 'round'
    ctx.beginPath()
    ctx.moveTo(liveStroke[0][0], liveStroke[0][1])
    for (let i = 1; i < liveStroke.length; i++) {
      ctx.lineTo(liveStroke[i][0], liveStroke[i][1])
    }
    ctx.stroke()
    ctx.restore()
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
  selected: boolean,
  editing: boolean
): void {
  // Ink: render strokes directly, no box chrome
  if (obj.type === 'ink') {
    renderInkStrokes(ctx, obj as InkObject)
    return
  }

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
  ctx.strokeStyle = editing ? '#c0392b' : selected ? '#ffffff' : style.border
  ctx.lineWidth   = editing ? 2 : selected ? 2 : 1.5
  roundRect(ctx, x, y, w, h, 8)
  ctx.stroke()

  // ── Type-specific content (clipped to interior) ────────
  if (!editing) {
    ctx.save()
    roundRect(ctx, x + 1, y + 1, w - 2, h - 2, 7)
    ctx.clip()
    switch (obj.type) {
      case 'image':
        renderImageContent(ctx, obj as ImageObject, x, y, w, h)
        break
      case 'spreadsheet':
        renderSpreadsheetContent(ctx, obj as SpreadsheetObject, x, y, w, h)
        break
      case 'code':
        renderCodeContent(ctx, obj as CodeObject, x, y, w, h)
        break
      default:
        renderGenericContent(ctx, obj, style, x, y, w, h)
    }
    ctx.restore()
  }

  // Label (on top, outside clip)
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

// ── Ink strokes renderer ──────────────────────────────────
function renderInkStrokes(ctx: CanvasRenderingContext2D, obj: InkObject): void {
  for (const stroke of obj.strokes) {
    if (stroke.points.length < 2) continue
    ctx.save()
    ctx.strokeStyle = stroke.color
    ctx.lineWidth   = stroke.width
    ctx.lineCap     = 'round'
    ctx.lineJoin    = 'round'
    ctx.beginPath()
    ctx.moveTo(stroke.points[0][0], stroke.points[0][1])
    for (let i = 1; i < stroke.points.length; i++) {
      ctx.lineTo(stroke.points[i][0], stroke.points[i][1])
    }
    ctx.stroke()
    ctx.restore()
  }
}

// ── Image content renderer ────────────────────────────────
function renderImageContent(
  ctx: CanvasRenderingContext2D,
  obj: ImageObject,
  x: number, y: number, w: number, h: number
): void {
  if (!obj.src) {
    // Placeholder
    ctx.fillStyle    = 'rgba(255,255,255,0.08)'
    ctx.fillRect(x, y, w, h)
    ctx.font         = '32px serif'
    ctx.fillStyle    = 'rgba(255,255,255,0.3)'
    ctx.textAlign    = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText('🖼', x + w / 2, y + h / 2)
    ctx.textAlign    = 'start'
    ctx.textBaseline = 'top'
    ctx.font         = '11px DM Sans, sans-serif'
    ctx.fillStyle    = 'rgba(255,255,255,0.4)'
    ctx.fillText('Double-click to set image URL', x + 12, y + h - 26)
    return
  }

  const img = loadImage(obj.src)
  if (!img) {
    // Loading/error state
    ctx.fillStyle    = 'rgba(255,255,255,0.08)'
    ctx.fillRect(x, y, w, h)
    ctx.font         = '11px DM Sans, sans-serif'
    ctx.fillStyle    = 'rgba(255,255,255,0.4)'
    ctx.textBaseline = 'middle'
    ctx.textAlign    = 'center'
    ctx.fillText(IMG_CACHE.get(obj.src) === 'error' ? '⚠ Load failed' : '⟳ Loading…', x + w / 2, y + h / 2)
    ctx.textAlign    = 'start'
    ctx.textBaseline = 'top'
    return
  }

  const fit = obj.objectFit ?? 'cover'
  if (fit === 'fill') {
    ctx.drawImage(img, x, y, w, h)
  } else {
    const iAspect = img.naturalWidth / img.naturalHeight
    const bAspect = w / h
    let sw: number, sh: number, sx: number, sy: number
    if (fit === 'cover') {
      if (iAspect > bAspect) {
        sh = img.naturalHeight; sw = sh * bAspect
        sx = (img.naturalWidth - sw) / 2; sy = 0
      } else {
        sw = img.naturalWidth; sh = sw / bAspect
        sx = 0; sy = (img.naturalHeight - sh) / 2
      }
    } else { // contain
      if (iAspect > bAspect) {
        sw = img.naturalWidth; sh = img.naturalHeight
        sx = 0; sy = 0
        const dh = w / iAspect
        ctx.drawImage(img, sx, sy, sw, sh, x, y + (h - dh) / 2, w, dh)
        return
      } else {
        sw = img.naturalWidth; sh = img.naturalHeight
        sx = 0; sy = 0
        const dw = h * iAspect
        ctx.drawImage(img, sx, sy, sw, sh, x + (w - dw) / 2, y, dw, h)
        return
      }
    }
    ctx.drawImage(img, sx, sy, sw, sh, x, y, w, h)
  }
}

// ── Spreadsheet content renderer ─────────────────────────
function renderSpreadsheetContent(
  ctx: CanvasRenderingContext2D,
  obj: SpreadsheetObject,
  x: number, y: number, w: number, h: number
): void {
  const colCount = obj.colCount ?? 5
  const rowCount = obj.rowCount ?? 10
  const headerH  = 22
  const rowH     = 20
  const colW     = Math.max(40, (w - 32) / colCount)
  const startX   = x + 32        // room for row numbers
  const startY   = y + headerH

  // Background
  ctx.fillStyle = '#fafafa'
  ctx.fillRect(x, y, w, h)

  // Row number column bg
  ctx.fillStyle = '#f0f0f0'
  ctx.fillRect(x, y, 32, h)

  // Column header row bg
  ctx.fillStyle = '#e8e8e8'
  ctx.fillRect(x, y, w, headerH)

  ctx.strokeStyle = '#d0d0d0'
  ctx.lineWidth   = 0.5

  // Column headers (A, B, C …)
  ctx.font         = 'bold 10px DM Sans, sans-serif'
  ctx.fillStyle    = '#555'
  ctx.textBaseline = 'middle'
  ctx.textAlign    = 'center'
  for (let c = 0; c < colCount; c++) {
    const cx = startX + c * colW
    const label = String.fromCharCode(65 + c)
    ctx.fillText(label, cx + colW / 2, y + headerH / 2)
    // vertical grid line
    ctx.beginPath()
    ctx.moveTo(cx, y)
    ctx.lineTo(cx, Math.min(y + headerH + rowCount * rowH, y + h))
    ctx.stroke()
  }

  // Row headers and cell content
  ctx.font         = '10px DM Sans, sans-serif'
  ctx.textAlign    = 'center'
  const visibleRows = Math.min(rowCount, Math.floor((h - headerH) / rowH))
  for (let r = 0; r < visibleRows; r++) {
    const ry = startY + r * rowH
    if (ry + rowH > y + h) break

    // Row number
    ctx.fillStyle = '#888'
    ctx.fillText(String(r + 1), x + 16, ry + rowH / 2)

    // Horizontal grid line
    ctx.strokeStyle = '#e8e8e8'
    ctx.beginPath()
    ctx.moveTo(x, ry)
    ctx.lineTo(x + w, ry)
    ctx.stroke()

    // Cell values
    ctx.fillStyle    = '#1a1a2e'
    ctx.textAlign    = 'left'
    ctx.textBaseline = 'middle'
    for (let c = 0; c < colCount; c++) {
      const key = `${r}:${c}`
      const val = obj.cells[key] ?? ''
      if (val) {
        const cx = startX + c * colW + 3
        ctx.save()
        ctx.rect(startX + c * colW + 1, ry + 1, colW - 2, rowH - 2)
        ctx.clip()
        ctx.fillText(val.startsWith('=') ? '⟨formula⟩' : val, cx, ry + rowH / 2)
        ctx.restore()
      }
    }
    ctx.textAlign = 'center'
  }

  // Outer border
  ctx.strokeStyle = '#bbb'
  ctx.lineWidth   = 1
  ctx.strokeRect(x, y, w, h)
}

// ── Code content renderer ─────────────────────────────────
function renderCodeContent(
  ctx: CanvasRenderingContext2D,
  obj: CodeObject,
  x: number, y: number, w: number, h: number
): void {
  // Dark background
  ctx.fillStyle = '#0d1117'
  ctx.fillRect(x, y, w, h)

  // Language badge
  ctx.font         = 'bold 10px DM Mono, monospace'
  ctx.fillStyle    = '#58a6ff'
  ctx.textBaseline = 'top'
  ctx.textAlign    = 'right'
  ctx.fillText(obj.language ?? 'code', x + w - 10, y + 8)
  ctx.textAlign = 'left'

  if (!obj.code) {
    ctx.fillStyle    = 'rgba(255,255,255,0.2)'
    ctx.textBaseline = 'middle'
    ctx.textAlign    = 'center'
    ctx.font         = '11px DM Mono, monospace'
    ctx.fillText('Double-click to edit', x + w / 2, y + h / 2)
    ctx.textAlign    = 'left'
    ctx.textBaseline = 'top'
    return
  }

  const lineH  = 16
  const pad    = 10
  const startY = y + 24  // below language badge
  const lines  = obj.code.split('\n')
  const maxLines = Math.floor((h - 34) / lineH)

  ctx.font         = '11px DM Mono, monospace'
  ctx.textBaseline = 'top'

  for (let i = 0; i < Math.min(lines.length, maxLines); i++) {
    const ly = startY + i * lineH
    if (ly + lineH > y + h) break

    // Line number
    ctx.fillStyle = '#484f58'
    ctx.textAlign = 'right'
    ctx.fillText(String(i + 1), x + pad + 18, ly)

    // Code line
    ctx.fillStyle = '#e6edf3'
    ctx.textAlign = 'left'
    const maxChars = Math.floor((w - pad * 2 - 24) / 6.6)
    const lineText = lines[i].length > maxChars
      ? lines[i].slice(0, maxChars) + '…'
      : lines[i]
    ctx.fillText(lineText, x + pad + 24, ly)
  }

  if (lines.length > maxLines) {
    ctx.fillStyle    = '#484f58'
    ctx.textAlign    = 'left'
    ctx.textBaseline = 'bottom'
    ctx.fillText(`+${lines.length - maxLines} more lines`, x + pad + 24, y + h - 4)
  }
  ctx.textBaseline = 'top'
}

// ── Generic content renderer (word-processor, callout, etc.) ──
function renderGenericContent(
  ctx: CanvasRenderingContext2D,
  obj: AnyCanvasObject,
  style: { bg: string; border: string; label: string },
  x: number, y: number, w: number, h: number
): void {
  if ('content' in obj && typeof (obj as { content: unknown }).content === 'string') {
    const content = (obj as { content: string }).content.trim()
    if (content) {
      const pad     = 12
      const lineH   = 18
      const maxW    = w - pad * 2
      const startY  = y + 32    // below label
      const maxLines = Math.max(1, Math.floor((h - 44) / lineH))

      ctx.font      = `13px Georgia, serif`
      ctx.fillStyle = obj.type === 'callout'
        ? ((obj as { textColor: string }).textColor ?? '#ffffff')
        : '#2c2c2c'
      ctx.textBaseline = 'top'

      const words = content.split(/\s+/)
      const lines: string[] = []
      let line = ''
      for (const word of words) {
        const test = line ? `${line} ${word}` : word
        if (ctx.measureText(test).width > maxW && line) {
          lines.push(line)
          line = word
          if (lines.length >= maxLines) break
        } else {
          line = test
        }
      }
      if (line && lines.length < maxLines) lines.push(line)

      for (let i = 0; i < lines.length; i++) {
        ctx.fillText(lines[i], x + pad, startY + i * lineH)
      }
    }
  }

  // Placeholder hint
  if (!('content' in obj) || !(obj as { content: unknown }).content) {
    ctx.font         = '11px DM Sans, sans-serif'
    ctx.fillStyle    = 'rgba(255,255,255,0.25)'
    ctx.textBaseline = 'middle'
    ctx.textAlign    = 'center'
    ctx.fillText('Double-click to edit', x + w / 2, y + h / 2)
    ctx.textAlign    = 'left'
    ctx.textBaseline = 'top'
  }

  void style  // used for caller context; suppress unused warning
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
