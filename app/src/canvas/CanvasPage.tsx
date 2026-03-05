import { useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Toolbar } from './Toolbar'
import { CanvasRenderer } from './CanvasRenderer'
import { useCanvasStore } from '@/store/canvasStore'
import { useAuthStore } from '@/store/authStore'
import { useCanvasKeyboard } from '@/hooks/useCanvasKeyboard'
import { createDocumentInDB, loadDocument, saveDocument, newDocument } from '@/lib/document'

export function CanvasPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { setDoc, objects, bodyText, doc } = useCanvasStore()
  const { user, session } = useAuthStore()
  const containerRef = useRef<HTMLDivElement>(null)
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const readonly = !session

  useCanvasKeyboard()

  // Create new doc (auth-only) or load existing one (guests too)
  useEffect(() => {
    if (id === 'new') {
      if (!user) return
      createDocumentInDB(user.id)
        .then(docId => navigate(`/canvas/${docId}`, { replace: true }))
        .catch(console.error)
      return
    }
    if (!id) return
    loadDocument(id)
      .then(data => {
        if (!data) return
        setDoc({ ...newDocument(), id, title: data.title, bodyText: data.bodyText, objects: data.objects })
      })
      .catch(console.error)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, user?.id])

  // Auto-save — guests never write
  useEffect(() => {
    if (readonly || !id || id === 'new' || !doc || doc.id !== id) return
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current)
    saveTimerRef.current = setTimeout(() => {
      saveDocument(id, doc.title, bodyText, objects).catch(console.error)
    }, 1500)
    return () => { if (saveTimerRef.current) clearTimeout(saveTimerRef.current) }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, objects, bodyText, doc?.id, readonly])

  return (
    <div className="flex flex-col h-full w-full overflow-hidden bg-[#e8e6e1]">
      {!readonly && <Toolbar />}
      <div ref={containerRef} className="flex-1 relative overflow-hidden">
        <CanvasRenderer containerRef={containerRef} readonly={readonly} />
      </div>
    </div>
  )
}
