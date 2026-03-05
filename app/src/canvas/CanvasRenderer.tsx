import { useEffect, useRef, useCallback, useState, RefObject } from 'react'
import { useCanvasStore } from '@/store/canvasStore'
import { useCanvasInteraction } from '@/hooks/useCanvasInteraction'
import { renderCanvas, setRenderCallback } from './renderer'
import { DEFAULT_REFLOW_CONFIG } from '@/engine/reflow'
import { SignInGate } from '@/components/SignInGate'
import { SpreadsheetEditOverlay } from './overlays/SpreadsheetEditOverlay'
import { CodeEditOverlay } from './overlays/CodeEditOverlay'
import { ImageEditOverlay } from './overlays/ImageEditOverlay'
import type { SpreadsheetObject, CodeObject, ImageObject } from '@/types/canvas'

interface Props {
  containerRef: RefObject<HTMLDivElement>
  readonly?: boolean
}

const PAPER_W   = 900
const PAPER_Y   = 40  // world coords

export function CanvasRenderer({ containerRef, readonly }: Props) {
  const canvasRef   = useRef<HTMLCanvasElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const rafRef      = useRef<number>(0)
  const [showGate, setShowGate] = useState(false)
  const [imgVersion, setImgVersion] = useState(0)

  const {
    objects, selectedId, viewport,
    bodyText, setBodyText,
    textEditMode,
    editingObjectId, updateObject,
    liveStroke,
  } = useCanvasStore()

  // Wire image-load callback so canvas re-renders when images finish loading
  useEffect(() => {
    setRenderCallback(() => setImgVersion(v => v + 1))
    return () => setRenderCallback(() => {})
  }, [])

  // Resize canvas to container
  useEffect(() => {
    const resize = () => {
      const canvas    = canvasRef.current
      const container = containerRef.current
      if (!canvas || !container) return
      canvas.width  = container.clientWidth
      canvas.height = container.clientHeight
      useCanvasStore.getState().setViewport({
        width:  container.clientWidth,
        height: container.clientHeight,
      })
    }
    resize()
    const ro = new ResizeObserver(resize)
    if (containerRef.current) ro.observe(containerRef.current)
    return () => ro.disconnect()
  }, [containerRef])

  // Render loop
  const render = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    void imgVersion  // include as dep so image loads trigger re-render
    renderCanvas(ctx, { objects, selectedId, viewport, bodyText, textEditMode, editingObjectId, liveStroke })
  }, [objects, selectedId, viewport, bodyText, textEditMode, editingObjectId, liveStroke, imgVersion])

  useEffect(() => {
    cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(render)
    return () => cancelAnimationFrame(rafRef.current)
  }, [render])

  // Focus textarea when entering edit mode
  useEffect(() => {
    if (textEditMode) {
      requestAnimationFrame(() => textareaRef.current?.focus())
    }
  }, [textEditMode])

  // Pointer interaction
  const { onPointerDown, onPointerMove, onPointerUp } =
    useCanvasInteraction(canvasRef)

  function handlePointerDown(e: React.PointerEvent) {
    if (readonly) { setShowGate(true); return }
    onPointerDown(e)
  }

  // Compute body-text textarea screen position
  const { zoom, panX, panY, width: W } = viewport
  const paperScreenX   = panX + ((W - PAPER_W * zoom) / 2)
  const textareaLeft   = paperScreenX + DEFAULT_REFLOW_CONFIG.marginLeft * zoom
  const textareaTop    = panY + (PAPER_Y + DEFAULT_REFLOW_CONFIG.marginTop) * zoom
  const textareaWidth  = (PAPER_W - DEFAULT_REFLOW_CONFIG.marginLeft - DEFAULT_REFLOW_CONFIG.marginRight) * zoom
  const scaledFontSize = DEFAULT_REFLOW_CONFIG.fontSize * zoom
  const scaledLineH    = DEFAULT_REFLOW_CONFIG.lineHeight * zoom

  // Editing object
  const editingObj = editingObjectId ? objects.find(o => o.id === editingObjectId) : null

  // Generic content overlay (wordprocessor / callout — 'content' field)
  const hasGenericContent = editingObj &&
    editingObj.type !== 'spreadsheet' &&
    editingObj.type !== 'code' &&
    editingObj.type !== 'image' &&
    'content' in editingObj
  const editingContent = hasGenericContent
    ? (editingObj as typeof editingObj & { content: string }).content ?? ''
    : null

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 touch-none"
        onPointerDown={handlePointerDown}
        onPointerMove={readonly ? undefined : onPointerMove}
        onPointerUp={readonly ? undefined : onPointerUp}
        onPointerLeave={readonly ? undefined : onPointerUp}
      />

      {/* Body text transparent textarea */}
      {!readonly && textEditMode && (
        <textarea
          ref={textareaRef}
          value={bodyText}
          onChange={e => setBodyText(e.target.value)}
          style={{
            position:   'absolute',
            left:       textareaLeft,
            top:        textareaTop,
            width:      textareaWidth,
            height:     `calc(100% - ${textareaTop}px - ${40 * zoom}px)`,
            background: 'transparent',
            border:     'none',
            outline:    'none',
            resize:     'none',
            fontFamily: DEFAULT_REFLOW_CONFIG.fontFamily,
            fontSize:   `${scaledFontSize}px`,
            lineHeight: `${scaledLineH}px`,
            color:            'transparent',
            caretColor:       '#c0392b',
            padding:          0,
            margin:           0,
            overflowY:  'auto',
            zIndex:     10,
          }}
          spellCheck
        />
      )}

      {/* Generic content overlay (wordprocessor / callout) */}
      {!readonly && editingContent !== null && editingObj && (
        <textarea
          key={editingObjectId}
          // eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus
          value={editingContent}
          onChange={e => updateObject(editingObjectId!, { content: e.target.value } as any)} // eslint-disable-line @typescript-eslint/no-explicit-any
          style={{
            position:   'absolute',
            left:       panX + editingObj.x * zoom,
            top:        panY + editingObj.y * zoom,
            width:      editingObj.w * zoom,
            height:     editingObj.h * zoom,
            background: 'transparent',
            border:     'none',
            outline:    'none',
            resize:     'none',
            fontFamily: 'Georgia, serif',
            fontSize:   `${14 * zoom}px`,
            lineHeight: `${20 * zoom}px`,
            color:      '#2c2c2c',
            caretColor: '#c0392b',
            padding:    `${12 * zoom}px`,
            margin:     0,
            zIndex:     20,
            boxSizing:  'border-box',
          }}
          spellCheck
        />
      )}

      {/* Spreadsheet edit overlay */}
      {!readonly && editingObj?.type === 'spreadsheet' && (
        <SpreadsheetEditOverlay
          obj={editingObj as SpreadsheetObject}
          panX={panX}
          panY={panY}
          zoom={zoom}
        />
      )}

      {/* Code edit overlay */}
      {!readonly && editingObj?.type === 'code' && (
        <CodeEditOverlay
          obj={editingObj as CodeObject}
          panX={panX}
          panY={panY}
          zoom={zoom}
        />
      )}

      {/* Image edit overlay */}
      {!readonly && editingObj?.type === 'image' && (
        <ImageEditOverlay
          obj={editingObj as ImageObject}
          panX={panX}
          panY={panY}
          zoom={zoom}
        />
      )}

      {showGate && <SignInGate onDismiss={() => setShowGate(false)} />}
    </div>
  )
}
