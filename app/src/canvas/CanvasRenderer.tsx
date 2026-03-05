import { useEffect, useRef, useCallback, RefObject } from 'react'
import { useCanvasStore } from '@/store/canvasStore'
import { useCanvasInteraction } from '@/hooks/useCanvasInteraction'
import { renderCanvas } from './renderer'
import { DEFAULT_REFLOW_CONFIG } from '@/engine/reflow'

interface Props {
  containerRef: RefObject<HTMLDivElement>
}

const PAPER_W   = 900
const PAPER_Y   = 40  // world coords

export function CanvasRenderer({ containerRef }: Props) {
  const canvasRef   = useRef<HTMLCanvasElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const rafRef      = useRef<number>(0)

  const {
    objects, selectedId, viewport,
    bodyText, setBodyText,
    textEditMode,
  } = useCanvasStore()

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
    renderCanvas(ctx, { objects, selectedId, viewport, bodyText, textEditMode })
  }, [objects, selectedId, viewport, bodyText, textEditMode])

  useEffect(() => {
    cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(render)
    return () => cancelAnimationFrame(rafRef.current)
  }, [render])

  // Focus textarea when entering edit mode
  useEffect(() => {
    if (textEditMode) {
      // Small delay so the element is laid out
      requestAnimationFrame(() => textareaRef.current?.focus())
    }
  }, [textEditMode])

  // Pointer interaction
  const { onPointerDown, onPointerMove, onPointerUp } =
    useCanvasInteraction(canvasRef)

  // Compute textarea screen position to overlay paper text column
  const { zoom, panX, panY, width: W } = viewport
  const paperScreenX   = panX + ((W - PAPER_W * zoom) / 2)
  const textareaLeft   = paperScreenX + DEFAULT_REFLOW_CONFIG.marginLeft * zoom
  const textareaTop    = panY + (PAPER_Y + DEFAULT_REFLOW_CONFIG.marginTop) * zoom
  const textareaWidth  = (PAPER_W - DEFAULT_REFLOW_CONFIG.marginLeft - DEFAULT_REFLOW_CONFIG.marginRight) * zoom
  const scaledFontSize = DEFAULT_REFLOW_CONFIG.fontSize * zoom
  const scaledLineH    = DEFAULT_REFLOW_CONFIG.lineHeight * zoom

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 touch-none"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
      />
      {textEditMode && (
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
    </div>
  )
}
