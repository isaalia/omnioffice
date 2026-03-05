// ============================================================
// OMNIOFFICE — Dashboard
// Lists the user's canvas documents. The entry point after login.
// ============================================================

import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'
import { listDocuments, deleteDocument, type DocSummary } from '@/lib/document'

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime()
  const m = Math.floor(diff / 60_000)
  if (m < 1)  return 'just now'
  if (m < 60) return `${m}m ago`
  const h = Math.floor(m / 60)
  if (h < 24) return `${h}h ago`
  const d = Math.floor(h / 24)
  if (d < 30) return `${d}d ago`
  return new Date(iso).toLocaleDateString()
}

export function DashboardPage() {
  const navigate         = useNavigate()
  const { user, signOut } = useAuthStore()
  const [docs,    setDocs]    = useState<DocSummary[]>([])
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState<string | null>(null)

  useEffect(() => {
    listDocuments()
      .then(setDocs)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  async function handleDelete(e: React.MouseEvent, id: string) {
    e.stopPropagation()
    if (!confirm('Delete this canvas? This cannot be undone.')) return
    setDeleting(id)
    try {
      await deleteDocument(id)
      setDocs(prev => prev.filter(d => d.id !== id))
    } catch (err) {
      console.error(err)
    } finally {
      setDeleting(null)
    }
  }

  return (
    <div className="min-h-screen bg-[#e8e6e1] flex flex-col">

      {/* Header */}
      <header className="flex items-center justify-between px-8 h-14 bg-[#16213e] border-b border-[#0f3460] shrink-0">
        <span className="font-serif text-white font-bold text-lg tracking-tight">
          Omni<span className="text-red-500">Office</span>
        </span>
        <div className="flex items-center gap-4">
          {user && (
            <span className="text-[#4a5568] text-xs">{user.email}</span>
          )}
          <button
            onClick={signOut}
            className="text-xs text-[#4a5568] hover:text-[#a8b2d8] transition-colors"
          >
            Sign out
          </button>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 px-8 py-10 max-w-6xl mx-auto w-full">

        <h1 className="text-2xl font-serif text-[#2c2c2c] mb-8 font-semibold">
          Your Canvases
        </h1>

        {loading ? (
          <div className="text-[#888] text-sm">Loading…</div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">

            {/* New canvas card */}
            <button
              onClick={() => navigate('/canvas/new')}
              className="group h-44 rounded-xl border-2 border-dashed border-[#c8c4bc]
                         hover:border-red-400 hover:bg-white/50
                         flex flex-col items-center justify-center gap-2
                         transition-all text-[#a8a09a] hover:text-red-500"
            >
              <span className="text-3xl font-light">+</span>
              <span className="text-xs font-medium">New Canvas</span>
            </button>

            {/* Document cards */}
            {docs.map(doc => (
              <div
                key={doc.id}
                onClick={() => navigate(`/canvas/${doc.id}`)}
                className="group relative h-44 rounded-xl bg-[#faf8f3]
                           shadow-[0_2px_12px_rgba(0,0,0,0.08)]
                           hover:shadow-[0_4px_20px_rgba(0,0,0,0.14)]
                           cursor-pointer transition-all
                           flex flex-col justify-between p-4 overflow-hidden"
              >
                {/* Paper lines decoration */}
                <div className="absolute inset-0 pointer-events-none opacity-30">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute left-4 right-4 h-px bg-[#b0a898]"
                      style={{ top: `${40 + i * 22}px` }}
                    />
                  ))}
                </div>

                {/* Delete button */}
                <button
                  onClick={e => handleDelete(e, doc.id)}
                  disabled={deleting === doc.id}
                  className="absolute top-2 right-2 w-6 h-6 rounded-full
                             bg-transparent text-[#c8c4bc] hover:bg-red-100 hover:text-red-500
                             opacity-0 group-hover:opacity-100 transition-all
                             flex items-center justify-center text-xs"
                  title="Delete canvas"
                >
                  ✕
                </button>

                {/* Spacer */}
                <div className="flex-1" />

                {/* Footer */}
                <div className="relative z-10">
                  <p className="text-sm font-medium text-[#2c2c2c] truncate leading-snug">
                    {doc.title || 'Untitled Canvas'}
                  </p>
                  <p className="text-[10px] text-[#a8a09a] mt-0.5">
                    {timeAgo(doc.updated_at)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
