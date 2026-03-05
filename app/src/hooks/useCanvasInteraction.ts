import { useCallback, RefObject } from 'react'
import { useCanvasStore } from '@/store/canvasStore'
import { pointInObject, hitHandle } from '@/engine/reflow'
import type { AnyCanvasObject } from '@/types/canvas'

export function useCanvasInteraction(canvasRef: RefObject<HTMLCanvasElement>) {
  const store = useCanvasStore()

  function canvasPos(e: React.PointerEvent): { x: number; y: number } {
    const rect = canvasRef.current!.getBoundingClientRect()
    const { zoom, panX, panY } = store.viewport
    return {
      x: (e.clientX - rect.left - panX) / zoom,
      y: (e.clientY - rect.top  - panY) / zoom,
    }
  }

  function hitTestObjects(px: number, py: number): AnyCanvasObject | null {
    const { objects } = store
    for (let i = objects.length - 1; i >= 0; i--) {
      if (pointInObject(px, py, objects[i])) return objects[i]
    }
    return null
  }

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    e.preventDefault()
    canvasRef.current?.setPointerCapture(e.pointerId)
    const { x, y } = canvasPos(e)
    const { mode, selectedId, objects, select, setMode, setDrag, setResize, addObject, bringToFront } = store

    // Pan mode
    if (mode === 'pan') {
      setDrag({ objectId: '__pan__', startX: e.clientX, startY: e.clientY, offsetX: store.viewport.panX, offsetY: store.viewport.panY })
      return
    }

    // Check resize handle on selected object
    if (selectedId) {
      const sel = objects.find(o => o.id === selectedId)
      if (sel) {
        const handle = hitHandle(sel, x, y)
        if (handle) {
          setResize({
            objectId: sel.id,
            handleX:  handle[0],
            handleY:  handle[1],
            startX: x, startY: y,
            origX: sel.x, origY: sel.y,
            origW: sel.w, origH: sel.h,
          })
          return
        }
      }
    }

    // Hit test objects
    const hit = hitTestObjects(x, y)
    if (hit) {
      select(hit.id)
      bringToFront(hit.id)
      setDrag({ objectId: hit.id, startX: x, startY: y, offsetX: x - hit.x, offsetY: y - hit.y })
    } else {
      select(null)
    }
  }, [store, canvasRef])

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    const { x, y } = canvasPos(e)
    const { drag, resize, updateObject, setViewport, viewport } = store

    if (resize) {
      const { origX, origY, origW, origH, handleX, handleY, startX, startY } = resize
      const dx = x - startX
      const dy = y - startY
      const onR = Math.abs(handleX - (origX + origW)) < 2
      const onB = Math.abs(handleY - (origY + origH)) < 2
      const onL = Math.abs(handleX - origX) < 2
      const onT = Math.abs(handleY - origY) < 2
      const patch: Partial<AnyCanvasObject> = {}
      if (onR) patch.w = Math.max(60, origW + dx)
      if (onB) patch.h = Math.max(40, origH + dy)
      if (onL) { patch.x = origX + dx; patch.w = Math.max(60, origW - dx) }
      if (onT) { patch.y = origY + dy; patch.h = Math.max(40, origH - dy) }
      updateObject(resize.objectId, patch)
      return
    }

    if (drag) {
      if (drag.objectId === '__pan__') {
        setViewport({
          panX: drag.offsetX + (e.clientX - drag.startX),
          panY: drag.offsetY + (e.clientY - drag.startY),
        })
        return
      }
      updateObject(drag.objectId, {
        x: x - drag.offsetX,
        y: y - drag.offsetY,
      })
    }
  }, [store, canvasRef])

  const onPointerUp = useCallback((_e: React.PointerEvent) => {
    store.setDrag(null)
    store.setResize(null)
  }, [store])

  return { onPointerDown, onPointerMove, onPointerUp }
}
