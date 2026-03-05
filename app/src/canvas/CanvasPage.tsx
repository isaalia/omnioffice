import { useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { Toolbar } from './Toolbar'
import { CanvasRenderer } from './CanvasRenderer'
import { useCanvasStore } from '@/store/canvasStore'
import { useCanvasKeyboard } from '@/hooks/useCanvasKeyboard'
import { newDocument } from '@/lib/document'

export function CanvasPage() {
  const { id } = useParams<{ id: string }>()
  const { setDoc } = useCanvasStore()
  const containerRef = useRef<HTMLDivElement>(null)

  useCanvasKeyboard()

  useEffect(() => {
    if (id === 'new') {
      setDoc(newDocument())
    }
    // TODO: load existing doc from Supabase when id is a real UUID
  }, [id, setDoc])

  return (
    <div className="flex flex-col h-full w-full overflow-hidden bg-[#e8e6e1]">
      <Toolbar />
      <div ref={containerRef} className="flex-1 relative overflow-hidden">
        <CanvasRenderer containerRef={containerRef} />
      </div>
    </div>
  )
}
