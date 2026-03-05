// ============================================================
// OMNIOFFICE — Code Edit Overlay
// Monospace textarea with line numbers + language selector.
// Visible only when editingObjectId matches a CodeObject.
// ============================================================

import { useRef, useEffect, KeyboardEvent, ChangeEvent } from 'react'
import { useCanvasStore } from '@/store/canvasStore'
import type { CodeObject } from '@/types/canvas'

interface Props {
  obj:  CodeObject
  panX: number
  panY: number
  zoom: number
}

const LANGUAGES = [
  'typescript', 'javascript', 'python', 'rust', 'go',
  'html', 'css', 'sql', 'json', 'bash', 'c', 'cpp',
]

export function CodeEditOverlay({ obj, panX, panY, zoom }: Props) {
  const { updateObject, setEditingObjectId } = useCanvasStore()
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const linesRef    = useRef<HTMLDivElement>(null)

  const left   = panX + obj.x * zoom
  const top    = panY + obj.y * zoom
  const width  = obj.w * zoom
  const height = obj.h * zoom

  const fontSize  = Math.max(10, Math.round(11 * zoom))
  const lineH     = Math.round(fontSize * 1.6)
  const gutterW   = Math.round(36 * zoom)

  // Focus textarea on mount
  useEffect(() => {
    textareaRef.current?.focus()
  }, [])

  // Sync line numbers scroll with textarea scroll
  function syncScroll() {
    if (linesRef.current && textareaRef.current) {
      linesRef.current.scrollTop = textareaRef.current.scrollTop
    }
  }

  function handleChange(e: ChangeEvent<HTMLTextAreaElement>) {
    updateObject(obj.id, { code: e.target.value } as any) // eslint-disable-line @typescript-eslint/no-explicit-any
  }

  function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Escape') {
      setEditingObjectId(null)
      return
    }
    if (e.key === 'Tab') {
      e.preventDefault()
      const ta    = e.currentTarget
      const start = ta.selectionStart
      const end   = ta.selectionEnd
      const next  = obj.code.slice(0, start) + '  ' + obj.code.slice(end)
      updateObject(obj.id, { code: next } as any) // eslint-disable-line @typescript-eslint/no-explicit-any
      // Restore cursor after React re-render
      requestAnimationFrame(() => {
        ta.selectionStart = ta.selectionEnd = start + 2
      })
    }
  }

  function handleLangChange(e: ChangeEvent<HTMLSelectElement>) {
    updateObject(obj.id, { language: e.target.value } as any) // eslint-disable-line @typescript-eslint/no-explicit-any
  }

  const lines = (obj.code || '').split('\n')
  const lineCount = Math.max(lines.length, 1)

  return (
    <div
      style={{
        position:     'absolute',
        left, top, width, height,
        zIndex:       30,
        background:   '#0d1117',
        borderRadius: 8,
        boxShadow:    '0 0 0 2px #c0392b',
        display:      'flex',
        flexDirection: 'column',
        overflow:     'hidden',
      }}
    >
      {/* Header bar: language selector + close */}
      <div style={{
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'space-between',
        padding:        `${Math.max(2, 3 * zoom)}px ${Math.max(6, 8 * zoom)}px`,
        background:     '#161b22',
        borderBottom:   '1px solid #30363d',
        flexShrink:     0,
      }}>
        <select
          value={obj.language ?? 'typescript'}
          onChange={handleLangChange}
          style={{
            background: '#21262d',
            color:      '#58a6ff',
            border:     '1px solid #30363d',
            borderRadius: 4,
            fontSize:   Math.max(9, 10 * zoom),
            padding:    `1px ${Math.max(2, 3 * zoom)}px`,
            cursor:     'pointer',
            outline:    'none',
            fontFamily: 'DM Mono, monospace',
          }}
        >
          {LANGUAGES.map(l => (
            <option key={l} value={l}>{l}</option>
          ))}
        </select>

        <button
          onClick={() => setEditingObjectId(null)}
          style={{
            background: 'none',
            border:     'none',
            color:      '#c0392b',
            cursor:     'pointer',
            fontSize:   Math.max(10, 12 * zoom),
            lineHeight: 1,
            padding:    0,
          }}
          title="Close (Escape)"
        >
          ✕
        </button>
      </div>

      {/* Editor area: line numbers + textarea */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* Line numbers */}
        <div
          ref={linesRef}
          style={{
            width:      gutterW,
            minWidth:   gutterW,
            overflowY:  'hidden',
            background: '#161b22',
            borderRight: '1px solid #21262d',
            userSelect: 'none',
            padding:    `${Math.max(4, 6 * zoom)}px 0`,
            fontFamily: 'DM Mono, monospace',
            fontSize,
            lineHeight: `${lineH}px`,
            color:      '#484f58',
            textAlign:  'right',
            boxSizing:  'border-box',
            paddingRight: Math.max(4, 6 * zoom),
          }}
        >
          {Array.from({ length: lineCount }, (_, i) => (
            <div key={i} style={{ height: lineH }}>{i + 1}</div>
          ))}
        </div>

        {/* Code textarea */}
        <textarea
          ref={textareaRef}
          value={obj.code ?? ''}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onScroll={syncScroll}
          spellCheck={false}
          style={{
            flex:       1,
            background: 'transparent',
            color:      '#e6edf3',
            border:     'none',
            outline:    'none',
            resize:     'none',
            fontFamily: 'DM Mono, monospace',
            fontSize,
            lineHeight: `${lineH}px`,
            padding:    `${Math.max(4, 6 * zoom)}px ${Math.max(6, 8 * zoom)}px`,
            caretColor: '#c0392b',
            whiteSpace: 'pre',
            overflowWrap: 'normal',
            overflowX:  'auto',
            boxSizing:  'border-box',
            tabSize:    2,
          }}
          placeholder="// Start typing..."
        />
      </div>
    </div>
  )
}
