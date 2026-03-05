import { useCallback, useRef, RefObject } from 'react'
import { useCanvasStore } from '@/store/canvasStore'
import { pointInObject, hitHandle } from '@/engine/reflow'
import { createObject } from '@/lib/document'
import type { AnyCanvasObject, InkObject, InkPoint } from '@/types/canvas'

export function useCanvasInteraction(canvasRef: RefObject<HTMLCanvasElement>) {
  const store = useCanvasStore()
  const lastClickRef = useRef<{ id: string; time: number } | null>(null)

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
      if (objects[i].locked) continue  // skip ink layer and any other locked objects
      if (pointInObject(px, py, objects[i])) return objects[i]
    }
    return null
  }

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    e.preventDefault()
    canvasRef.current?.setPointerCapture(e.pointerId)
    const { x, y } = canvasPos(e)
    const { mode, selectedId, objects, select, setDrag, setResize, bringToFront } = store

    // ── Ink mode ──────────────────────────────────────────
    if (mode === 'ink') {
      const pt: InkPoint = [x, y]
      let inkId = store.inkObjectId
      if (!inkId) {
        // Reuse existing ink object if present (e.g. after load)
        const existing = objects.find(o => o.type === 'ink') as InkObject | undefined
        if (existing) {
          inkId = existing.id
          store.setInkObjectId(inkId)
        } else {
          // Create a new ink object covering the full paper area
          const paperX = (store.viewport.width / store.viewport.zoom - 900) / 2
          const inkObj = createObject('ink', { x: paperX, y: 40 })
          store.addObject(inkObj)
          inkId = inkObj.id
          store.setInkObjectId(inkId)
        }
      }
      store.startLiveStroke(pt)
      return
    }

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

    // Hit test objects (locked objects skipped)
    const hit = hitTestObjects(x, y)
    if (hit) {
      const now  = Date.now()
      const last = lastClickRef.current
      if (last && last.id === hit.id && now - last.time < 300) {
        // Double-click: enter content edit mode
        store.setEditingObjectId(hit.id)
        lastClickRef.current = null
        return
      }
      lastClickRef.current = { id: hit.id, time: now }
      store.setEditingObjectId(null)
      select(hit.id)
      bringToFront(hit.id)
      setDrag({ objectId: hit.id, startX: x, startY: y, offsetX: x - hit.x, offsetY: y - hit.y })
      store.setTextEditMode(false)
    } else {
      lastClickRef.current = null
      store.setEditingObjectId(null)
      select(null)
      store.setTextEditMode(true)
    }
  }, [store, canvasRef]) // eslint-disable-line react-hooks/exhaustive-deps

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    const { x, y } = canvasPos(e)
    const { drag, resize, updateObject, setViewport, mode } = store

    // ── Ink: extend live stroke ───────────────────────────
    if (mode === 'ink' && store.liveStroke) {
      store.extendLiveStroke([x, y] as InkPoint)
      return
    }

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
  }, [store, canvasRef]) // eslint-disable-line react-hooks/exhaustive-deps

  const onPointerUp = useCallback((_e: React.PointerEvent) => {
    const { mode } = store

    // ── Ink: commit stroke ────────────────────────────────
    if (mode === 'ink') {
      store.commitLiveStroke('#1a1a2e', 2)
      return
    }

    store.setDrag(null)
    store.setResize(null)
  }, [store])

  return { onPointerDown, onPointerMove, onPointerUp }
}
