import { useCanvasStore } from '@/store/canvasStore'
import { useAuthStore } from '@/store/authStore'
import { createObject } from '@/lib/document'
import type { ToolType, InteractionMode } from '@/types/canvas'
import clsx from 'clsx'

interface ToolButton {
  label:  string
  type:   ToolType
  icon:   string
}

const TOOL_BUTTONS: ToolButton[] = [
  { label: 'Word',         type: 'wordprocessor', icon: '✍' },
  { label: 'Spreadsheet',  type: 'spreadsheet',   icon: '⊞' },
  { label: 'Presentation', type: 'presentation',  icon: '▶' },
  { label: 'Database',     type: 'database',      icon: '🗄' },
  { label: 'Chart',        type: 'chart',         icon: '📊' },
  { label: 'Image',        type: 'image',         icon: '🖼' },
  { label: 'Citations',    type: 'citation',      icon: '📚' },
  { label: 'Code',         type: 'code',          icon: '</>' },
  { label: 'Math',         type: 'math',          icon: 'Σ'  },
  { label: 'Diagram',      type: 'diagram',       icon: '◇'  },
  { label: 'Callout',      type: 'callout',       icon: '💬' },
  { label: 'ARIA',         type: 'ai',            icon: '✦'  },
]

const MODE_BUTTONS: Array<{ label: string; mode: InteractionMode; icon: string }> = [
  { label: 'Select', mode: 'select', icon: '↖' },
  { label: 'Pan',    mode: 'pan',    icon: '✥'  },
]

export function Toolbar() {
  const {
    mode, setMode, selectedId, objects,
    addObject, removeObject,
    zoomIn, zoomOut, zoomReset,
    viewport,
  } = useCanvasStore()

  const { signOut } = useAuthStore()
  const selected = objects.find(o => o.id === selectedId)

  function placeTool(type: ToolType) {
    const obj = createObject(type, {
      x: 200 + Math.random() * 200,
      y: 200 + Math.random() * 150,
    })
    addObject(obj)
    setMode('select')
  }

  function cycleWrap() {
    if (!selected) return
    const modes = ['square', 'topbottom', 'none'] as const
    const idx = modes.indexOf(selected.wrapMode as typeof modes[number])
    useCanvasStore.getState().updateObject(selected.id, {
      wrapMode: modes[(idx + 1) % modes.length],
    })
  }

  return (
    <div className="flex items-center gap-1 px-3 h-11 bg-[#16213e] border-b border-[#0f3460] shrink-0 no-select overflow-x-auto">

      {/* Logo */}
      <span className="font-serif text-white font-bold text-base tracking-tight mr-2 shrink-0">
        Omni<span className="text-red-500">Office</span>
      </span>

      <div className="w-px h-5 bg-[#0f3460] mx-1 shrink-0" />

      {/* Mode buttons */}
      {MODE_BUTTONS.map(({ label, mode: m, icon }) => (
        <button
          key={m}
          onClick={() => setMode(m)}
          title={label}
          className={clsx(
            'px-2.5 py-1 rounded text-xs font-medium transition-colors shrink-0',
            mode === m
              ? 'bg-red-600 text-white'
              : 'text-[#a8b2d8] hover:bg-[#0f3460] hover:text-white'
          )}
        >
          {icon} {label}
        </button>
      ))}

      <div className="w-px h-5 bg-[#0f3460] mx-1 shrink-0" />

      {/* Tool buttons */}
      {TOOL_BUTTONS.map(({ label, type, icon }) => (
        <button
          key={type}
          onClick={() => placeTool(type)}
          title={`Place ${label}`}
          className="px-2.5 py-1 rounded text-xs text-[#a8b2d8] hover:bg-[#0f3460] hover:text-white transition-colors shrink-0"
        >
          {icon}
        </button>
      ))}

      <div className="w-px h-5 bg-[#0f3460] mx-1 shrink-0" />

      {/* Selected object controls */}
      {selected && (
        <>
          <button
            onClick={cycleWrap}
            className="px-2.5 py-1 rounded text-xs text-[#a8b2d8] hover:bg-[#0f3460] hover:text-white transition-colors shrink-0"
            title="Cycle wrap mode (W)"
          >
            wrap: {selected.wrapMode}
          </button>
          <button
            onClick={() => removeObject(selected.id)}
            className="px-2.5 py-1 rounded text-xs text-red-400 hover:bg-red-900/30 transition-colors shrink-0"
            title="Delete (Del)"
          >
            ✕
          </button>
          <div className="w-px h-5 bg-[#0f3460] mx-1 shrink-0" />
        </>
      )}

      {/* Spacer */}
      <div className="flex-1" />

      {/* Zoom controls */}
      <button
        onClick={zoomOut}
        className="px-2 py-1 rounded text-xs text-[#a8b2d8] hover:bg-[#0f3460] hover:text-white transition-colors shrink-0"
        title="Zoom out (−)"
      >−</button>
      <button
        onClick={zoomReset}
        className="px-2 py-1 rounded text-xs text-[#a8b2d8] hover:bg-[#0f3460] hover:text-white transition-colors shrink-0 min-w-[44px] text-center"
        title="Reset zoom"
      >
        {Math.round(viewport.zoom * 100)}%
      </button>
      <button
        onClick={zoomIn}
        className="px-2 py-1 rounded text-xs text-[#a8b2d8] hover:bg-[#0f3460] hover:text-white transition-colors shrink-0"
        title="Zoom in (+)"
      >+</button>

      <div className="w-px h-5 bg-[#0f3460] mx-1 shrink-0" />

      {/* Sign out */}
      <button
        onClick={signOut}
        className="px-2.5 py-1 rounded text-xs text-[#4a5568] hover:text-[#a8b2d8] transition-colors shrink-0"
        title="Sign out"
      >
        ⎋
      </button>
    </div>
  )
}
