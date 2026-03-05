import { useState } from 'react'
import { supabase } from '@/lib/supabase'

interface Props {
  onDismiss: () => void
}

export function SignInGate({ onDismiss }: Props) {
  const [email,   setEmail]   = useState('')
  const [sent,    setSent]    = useState(false)
  const [error,   setError]   = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.includes('@')) { setError('Enter a valid email'); return }
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.signInWithOtp({
      email,
      // Redirect back to this exact canvas URL so the session lands here
      options: { emailRedirectTo: window.location.href },
    })
    setLoading(false)
    if (error) setError(error.message)
    else setSent(true)
  }

  return (
    <div
      className="absolute inset-0 z-50 flex items-center justify-center"
      style={{ background: 'rgba(10,10,12,0.72)', backdropFilter: 'blur(3px)' }}
      // click backdrop to dismiss
      onClick={e => { if (e.target === e.currentTarget) onDismiss() }}
    >
      <div className="bg-[#0a0a0c] border border-white/10 rounded-2xl p-8 w-full max-w-sm text-center shadow-2xl">

        {/* Logo mark */}
        <div className="mb-6">
          <div className="inline-flex items-center justify-center w-10 h-10 border border-red-700/40 rounded-xl mb-4">
            <div className="w-1.5 h-1.5 bg-red-600 rounded-full" />
          </div>
          <h2 className="font-serif text-white text-xl font-light italic tracking-tight">
            Sign in to edit
          </h2>
          <p className="text-white/25 text-xs mt-1 tracking-wide">
            Free · No credit card · Takes 10 seconds
          </p>
        </div>

        {sent ? (
          <div className="space-y-4">
            <p className="font-serif text-white/60 italic">Check your inbox.</p>
            <p className="text-white/25 text-sm">
              Magic link sent to <span className="text-white/50">{email}</span>
            </p>
            <button
              onClick={onDismiss}
              className="text-white/25 text-xs hover:text-white/45 transition-colors mt-2"
            >
              Keep viewing ↗
            </button>
          </div>
        ) : (
          <>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="your@email.com"
                // eslint-disable-next-line jsx-a11y/no-autofocus
                autoFocus
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white/70 text-sm placeholder:text-white/20 outline-none focus:border-red-700/50 transition-colors"
              />
              {error && <p className="text-red-400/70 text-xs">{error}</p>}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-red-700 hover:bg-red-600 disabled:opacity-50 text-white text-sm font-medium tracking-wider uppercase rounded-lg transition-colors"
              >
                {loading ? 'Sending…' : 'Continue with Email'}
              </button>
            </form>
            <button
              onClick={onDismiss}
              className="text-white/20 text-xs mt-4 hover:text-white/40 transition-colors block w-full"
            >
              Just viewing — keep reading
            </button>
          </>
        )}
      </div>
    </div>
  )
}
