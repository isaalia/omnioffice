// ============================================================
// OMNIOFFICE — Spreadsheet Edit Overlay
// Interactive cell grid rendered as a React overlay on top
// of the canvas. Visible only when editingObjectId matches.
// ============================================================

import { useRef, KeyboardEvent } from 'react'
import { useCanvasStore } from '@/store/canvasStore'
import type { SpreadsheetObject } from '@/types/canvas'

interface Props {
  obj:  SpreadsheetObject
  panX: number
  panY: number
  zoom: number
}

const COL_LABELS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

export function SpreadsheetEditOverlay({ obj, panX, panY, zoom }: Props) {
  const { updateObject, setEditingObjectId } = useCanvasStore()
  const tableRef = useRef<HTMLDivElement>(null)

  const left   = panX + obj.x * zoom
  const top    = panY + obj.y * zoom
  const width  = obj.w * zoom
  const height = obj.h * zoom

  function cellKey(r: number, c: number): string {
    return `${r}:${c}`
  }

  function getCell(r: number, c: number): string {
    return obj.cells[cellKey(r, c)] ?? ''
  }

  function setCell(r: number, c: number, val: string) {
    const next = { ...obj.cells, [cellKey(r, c)]: val }
    updateObject(obj.id, { cells: next } as any) // eslint-disable-line @typescript-eslint/no-explicit-any
  }

  function focusCell(r: number, c: number) {
    const input = tableRef.current?.querySelector<HTMLInputElement>(
      `[data-row="${r}"][data-col="${c}"]`
    )
    input?.focus()
    input?.select()
  }

  function onKeyDown(e: KeyboardEvent<HTMLInputElement>, r: number, c: number) {
    if (e.key === 'Tab') {
      e.preventDefault()
      const nextC = e.shiftKey ? c - 1 : c + 1
      if (nextC >= 0 && nextC < obj.colCount) {
        focusCell(r, nextC)
      } else if (!e.shiftKey && r + 1 < obj.rowCount) {
        focusCell(r + 1, 0)
      }
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (r + 1 < obj.rowCount) focusCell(r + 1, c)
    } else if (e.key === 'Escape') {
      setEditingObjectId(null)
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (r + 1 < obj.rowCount) focusCell(r + 1, c)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (r > 0) focusCell(r - 1, c)
    } else if (e.key === 'ArrowRight' && (e.currentTarget.selectionStart ?? 0) >= e.currentTarget.value.length) {
      e.preventDefault()
      if (c + 1 < obj.colCount) focusCell(r, c + 1)
    } else if (e.key === 'ArrowLeft' && (e.currentTarget.selectionStart ?? 0) === 0) {
      e.preventDefault()
      if (c > 0) focusCell(r, c - 1)
    }
  }

  const headerH = Math.round(22 * zoom)
  const rowH    = Math.round(20 * zoom)
  const rowNumW = Math.round(32 * zoom)
  const colW    = Math.max(40, (width - rowNumW) / obj.colCount)
  const fontSize = Math.max(9, Math.round(10 * zoom))

  return (
    <div
      style={{
        position:   'absolute',
        left, top, width, height,
        zIndex:     30,
        boxShadow:  '0 0 0 2px #c0392b',
        borderRadius: 8,
        overflow:   'hidden',
        background: '#fff',
        userSelect: 'none',
      }}
    >
      {/* Close button */}
      <button
        onClick={() => setEditingObjectId(null)}
        style={{
          position:  'absolute',
          top: 2, right: 4,
          zIndex:    40,
          background: 'none',
          border:    'none',
          cursor:    'pointer',
          color:     '#c0392b',
          fontSize:  Math.max(10, 12 * zoom),
          lineHeight: 1,
        }}
        title="Close (Escape)"
      >
        ✕
      </button>

      <div ref={tableRef} style={{ width: '100%', height: '100%', overflow: 'auto' }}>
        <table
          style={{
            borderCollapse: 'collapse',
            tableLayout:    'fixed',
            fontSize,
            fontFamily:     'DM Mono, monospace',
            minWidth:       '100%',
          }}
        >
          {/* Column headers */}
          <thead>
            <tr>
              {/* row-number corner */}
              <th style={{
                width:      rowNumW,
                minWidth:   rowNumW,
                height:     headerH,
                background: '#e8e8e8',
                borderRight: '1px solid #ccc',
                borderBottom: '1px solid #ccc',
              }} />
              {Array.from({ length: obj.colCount }, (_, c) => (
                <th
                  key={c}
                  style={{
                    width:       colW,
                    minWidth:    colW,
                    height:      headerH,
                    background:  '#e8e8e8',
                    textAlign:   'center',
                    fontWeight:  'bold',
                    color:       '#555',
                    borderRight: '1px solid #ccc',
                    borderBottom: '1px solid #ccc',
                    fontSize,
                  }}
                >
                  {COL_LABELS[c] ?? String(c + 1)}
                </th>
              ))}
            </tr>
          </thead>

          {/* Rows */}
          <tbody>
            {Array.from({ length: obj.rowCount }, (_, r) => (
              <tr key={r}>
                {/* Row number */}
                <td style={{
                  width:      rowNumW,
                  minWidth:   rowNumW,
                  height:     rowH,
                  background: '#f0f0f0',
                  textAlign:  'center',
                  color:      '#888',
                  borderRight: '1px solid #ccc',
                  borderBottom: '1px solid #eee',
                  fontSize,
                }}>
                  {r + 1}
                </td>
                {/* Cells */}
                {Array.from({ length: obj.colCount }, (_, c) => (
                  <td
                    key={c}
                    style={{
                      width:       colW,
                      minWidth:    colW,
                      height:      rowH,
                      padding:     0,
                      borderRight: '1px solid #eee',
                      borderBottom: '1px solid #eee',
                    }}
                  >
                    <input
                      data-row={r}
                      data-col={c}
                      value={getCell(r, c)}
                      onChange={e => setCell(r, c, e.target.value)}
                      onKeyDown={e => onKeyDown(e, r, c)}
                      style={{
                        width:      '100%',
                        height:     '100%',
                        border:     'none',
                        outline:    'none',
                        padding:    `0 ${Math.max(2, 3 * zoom)}px`,
                        fontFamily: 'DM Mono, monospace',
                        fontSize,
                        background: 'transparent',
                        color:      '#1a1a2e',
                        boxSizing:  'border-box',
                      }}
                      onFocus={e => {
                        e.currentTarget.style.background = 'rgba(192,57,43,0.06)'
                        e.currentTarget.style.outline    = '1px solid #c0392b'
                      }}
                      onBlur={e => {
                        e.currentTarget.style.background = 'transparent'
                        e.currentTarget.style.outline    = 'none'
                      }}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
