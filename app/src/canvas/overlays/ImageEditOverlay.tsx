// ============================================================
// OMNIOFFICE — Image Edit Overlay
// URL input + objectFit toggle. Anchored to bottom of image.
// ============================================================

import { useState, useRef, useEffect, KeyboardEvent } from 'react'
import { useCanvasStore } from '@/store/canvasStore'
import type { ImageObject } from '@/types/canvas'

interface Props {
  obj:  ImageObject
  panX: number
  panY: number
  zoom: number
}

const FIT_OPTIONS: Array<ImageObject['objectFit']> = ['cover', 'contain', 'fill']

export function ImageEditOverlay({ obj, panX, panY, zoom }: Props) {
  const { updateObject, setEditingObjectId } = useCanvasStore()
  const [urlInput, setUrlInput] = useState(obj.src ?? '')
  const inputRef = useRef<HTMLInputElement>(null)

  const left  = panX + obj.x * zoom
  const top   = panY + obj.y * zoom
  const width = obj.w * zoom

  // Panel sits just below the bottom of the image
  const panelTop = top + obj.h * zoom + 4

  const fontSize = Math.max(10, Math.round(11 * zoom))

  useEffect(() => {
    inputRef.current?.focus()
    inputRef.current?.select()
  }, [])

  function apply() {
    const trimmed = urlInput.trim()
    if (trimmed) {
      updateObject(obj.id, { src: trimmed } as any) // eslint-disable-line @typescript-eslint/no-explicit-any
    }
    setEditingObjectId(null)
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter')  apply()
    if (e.key === 'Escape') setEditingObjectId(null)
  }

  function cycleFit() {
    const idx  = FIT_OPTIONS.indexOf(obj.objectFit ?? 'cover')
    const next = FIT_OPTIONS[(idx + 1) % FIT_OPTIONS.length]
    updateObject(obj.id, { objectFit: next } as any) // eslint-disable-line @typescript-eslint/no-explicit-any
  }

  return (
    <>
      {/* Image selection outline */}
      <div style={{
        position:     'absolute',
        left, top,
        width,
        height:       obj.h * zoom,
        zIndex:       29,
        boxShadow:    '0 0 0 2px #c0392b',
        borderRadius: 8,
        pointerEvents: 'none',
      }} />

      {/* Control panel */}
      <div
        style={{
          position:     'absolute',
          left,
          top:          panelTop,
          width,
          zIndex:       30,
          background:   '#16213e',
          border:       '1px solid #c0392b',
          borderRadius: 6,
          padding:      `${Math.max(4, 6 * zoom)}px ${Math.max(6, 8 * zoom)}px`,
          display:      'flex',
          alignItems:   'center',
          gap:          Math.max(4, 6 * zoom),
          boxSizing:    'border-box',
        }}
      >
        {/* URL input */}
        <input
          ref={inputRef}
          value={urlInput}
          onChange={e => setUrlInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="https://example.com/image.jpg"
          style={{
            flex:       1,
            background: '#0f3460',
            color:      '#e0e0e0',
            border:     '1px solid #0f3460',
            borderRadius: 4,
            padding:    `${Math.max(2, 3 * zoom)}px ${Math.max(4, 5 * zoom)}px`,
            fontSize,
            fontFamily: 'DM Sans, sans-serif',
            outline:    'none',
          }}
          onFocus={e => { e.currentTarget.style.borderColor = '#c0392b' }}
          onBlur={e  => { e.currentTarget.style.borderColor = '#0f3460' }}
        />

        {/* objectFit toggle */}
        <button
          onClick={cycleFit}
          title="Cycle image fit mode"
          style={{
            background: '#0f3460',
            color:      '#a8b2d8',
            border:     '1px solid #0f3460',
            borderRadius: 4,
            padding:    `${Math.max(2, 3 * zoom)}px ${Math.max(4, 5 * zoom)}px`,
            fontSize,
            cursor:     'pointer',
            fontFamily: 'DM Sans, sans-serif',
            whiteSpace: 'nowrap',
          }}
        >
          {obj.objectFit ?? 'cover'}
        </button>

        {/* Set button */}
        <button
          onClick={apply}
          style={{
            background: '#c0392b',
            color:      '#fff',
            border:     'none',
            borderRadius: 4,
            padding:    `${Math.max(2, 3 * zoom)}px ${Math.max(6, 8 * zoom)}px`,
            fontSize,
            cursor:     'pointer',
            fontWeight: 'bold',
            fontFamily: 'DM Sans, sans-serif',
          }}
        >
          Set
        </button>

        {/* Close */}
        <button
          onClick={() => setEditingObjectId(null)}
          style={{
            background: 'none',
            border:     'none',
            color:      '#c0392b',
            cursor:     'pointer',
            fontSize:   Math.max(12, 14 * zoom),
            lineHeight: 1,
            padding:    0,
          }}
          title="Close (Escape)"
        >
          ✕
        </button>
      </div>
    </>
  )
}
