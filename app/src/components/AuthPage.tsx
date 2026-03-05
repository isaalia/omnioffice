import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'

export function AuthPage() {
  const [email, setEmail]   = useState('')
  const [sent, setSent]     = useState(false)
  const [error, setError]   = useState('')
  const [loading, setLoading] = useState(false)

  const { signIn, session, init } = useAuthStore()
  const navigate = useNavigate()

  useEffect(() => { init() }, [init])
  useEffect(() => {
    if (session) navigate('/canvas/new', { replace: true })
  }, [session, navigate])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.includes('@')) { setError('Enter a valid email'); return }
    setLoading(true)
    setError('')
    const { error } = await signIn(email)
    setLoading(false)
    if (error) setError(error)
    else setSent(true)
  }

  return (
    <div className="h-full w-full bg-[#0a0a0c] flex items-center justify-center p-6">
      <div className="w-full max-w-sm text-center">

        {/* Logo */}
        <div className="mb-10">
          <div className="inline-flex items-center justify-center w-12 h-12 border border-red-700/40 rounded-xl mb-6">
            <div className="w-1.5 h-1.5 bg-red-600 rounded-full" />
          </div>
          <h1 className="font-serif text-white text-3xl font-light italic tracking-tight">
            OmniOffice
          </h1>
          <p className="text-white/25 text-sm mt-2 tracking-wide">Early Access</p>
        </div>

        {sent ? (
          <div className="space-y-3">
            <p className="font-serif text-white/60 text-lg italic">Check your inbox.</p>
            <p className="text-white/25 text-sm">
              We sent a magic link to <span className="text-white/50">{email}</span>
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white/70 text-sm placeholder:text-white/20 outline-none focus:border-red-700/50 focus:bg-white/7 transition-colors"
              autoFocus
            />
            {error && (
              <p className="text-red-400/70 text-xs">{error}</p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-red-700 hover:bg-red-600 disabled:opacity-50 text-white text-sm font-medium tracking-wider uppercase rounded-lg transition-colors"
            >
              {loading ? 'Sending…' : 'Continue with Email'}
            </button>
          </form>
        )}

        <p className="text-white/15 text-xs mt-8 tracking-wide">
          omnioffice.co · Inov8if LLC
        </p>
      </div>
    </div>
  )
}
