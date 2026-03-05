import { useEffect } from 'react'
import { useCanvasStore } from '@/store/canvasStore'

export function useCanvasKeyboard() {
  const store = useCanvasStore()

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      // Don't intercept when typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return

      const { selectedId, removeObject, updateObject, objects, setMode, zoomIn, zoomOut, zoomReset } = store

      switch (e.key) {
        case 'Delete':
        case 'Backspace':
          if (selectedId) removeObject(selectedId)
          break

        case 'Escape':
          useCanvasStore.getState().select(null)
          useCanvasStore.getState().setTextEditMode(false)
          setMode('select')
          break

        case 'w':
        case 'W': {
          if (!selectedId) break
          const obj = objects.find(o => o.id === selectedId)
          if (!obj) break
          const modes = ['square', 'topbottom', 'none'] as const
          const idx = modes.indexOf(obj.wrapMode as typeof modes[number])
          updateObject(selectedId, { wrapMode: modes[(idx + 1) % modes.length] })
          break
        }

        case '=':
        case '+':
          if (e.metaKey || e.ctrlKey) { e.preventDefault(); zoomIn() }
          break

        case '-':
          if (e.metaKey || e.ctrlKey) { e.preventDefault(); zoomOut() }
          break

        case '0':
          if (e.metaKey || e.ctrlKey) { e.preventDefault(); zoomReset() }
          break

        case 'v': setMode('select'); break
        case 'h': setMode('pan');    break
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [store])
}
