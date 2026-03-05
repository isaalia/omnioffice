import { useEffect, useRef, useCallback, RefObject } from 'react'
import { useCanvasStore } from '@/store/canvasStore'
import { useCanvasInteraction } from '@/hooks/useCanvasInteraction'
import { renderCanvas } from './renderer'

interface Props {
  containerRef: RefObject<HTMLDivElement>
}

export function CanvasRenderer({ containerRef }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef    = useRef<number>(0)
  const { objects, selectedId, viewport } = useCanvasStore()

  // Resize canvas to container
  useEffect(() => {
    const resize = () => {
      const canvas = canvasRef.current
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
    renderCanvas(ctx, { objects, selectedId, viewport })
  }, [objects, selectedId, viewport])

  useEffect(() => {
    cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(render)
    return () => cancelAnimationFrame(rafRef.current)
  }, [render])

  // Pointer interaction
  const { onPointerDown, onPointerMove, onPointerUp } =
    useCanvasInteraction(canvasRef)

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 touch-none"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
    />
  )
}
