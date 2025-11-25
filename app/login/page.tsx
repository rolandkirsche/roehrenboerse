'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase-client'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isSignUp, setIsSignUp] = useState(false)
  const router = useRouter()

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        })
        if (error) throw error
        setError('Bitte überprüfen Sie Ihre E-Mail, um die Registrierung abzuschließen.')
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })
        if (error) throw error
        router.push('/')
      }
    } catch (err: any) {
      setError(err.message || 'Ein Fehler ist aufgetreten')
    } finally {
      setLoading(false)
    }
  }

  const handleSocialLogin = async (provider: 'google' | 'github') => {
    setLoading(true)
    setError(null)

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/`
        }
      })
      if (error) throw error
    } catch (err: any) {
      setError(err.message || 'Ein Fehler ist aufgetreten')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-gradient-to-b from-gray-900 via-gray-950 to-black">
      <div className="w-full max-w-md bg-gradient-to-br from-orange-500/5 to-transparent backdrop-blur-sm border border-slate-700/50 rounded-2xl p-10 shadow-2xl">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-200 via-orange-500 to-orange-900 shadow-lg shadow-orange-500/50" />
          <div className="text-2xl font-bold uppercase tracking-wider">Röhrenbörse</div>
        </div>

        <h1 className="text-3xl font-bold text-center text-gray-50 mb-2">
          {isSignUp ? 'Konto erstellen' : 'Willkommen zurück'}
        </h1>
        <p className="text-center text-gray-400 text-sm mb-8">
          {isSignUp 
            ? 'Erstellen Sie ein Konto, um Angebote zu erstellen' 
            : 'Melden Sie sich an, um fortzufahren'}
        </p>

        {/* Social Login Buttons */}
        <div className="flex flex-col gap-3 mb-6">
          <button
            onClick={() => handleSocialLogin('google')}
            disabled={loading}
            className="w-full px-4 py-3 rounded-lg border border-slate-700/60 bg-slate-900/60 text-gray-50 font-medium flex items-center justify-center gap-3 hover:bg-slate-900 hover:border-orange-500/60 hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Mit Google fortfahren
          </button>

          <button
            onClick={() => handleSocialLogin('github')}
            disabled={loading}
            className="w-full px-4 py-3 rounded-lg border border-slate-700/60 bg-slate-900/60 text-gray-50 font-medium flex items-center justify-center gap-3 hover:bg-slate-900 hover:border-orange-500/60 hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            Mit GitHub fortfahren
          </button>
        </div>

        <div className="relative text-center my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-700/50"></div>
          </div>
          <span className="relative bg-slate-800 px-3 text-sm text-gray-400">oder</span>
        </div>

        {/* Email Login Form */}
        <form onSubmit={handleEmailLogin} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm font-medium text-gray-50">
              E-Mail
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg border border-slate-700/70 bg-slate-900/85 text-gray-50 placeholder-gray-400 outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/50 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              placeholder="ihre@email.de"
              disabled={loading}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-sm font-medium text-gray-50">
              Passwort
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg border border-slate-700/70 bg-slate-900/85 text-gray-50 placeholder-gray-400 outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/50 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              placeholder="••••••••"
              disabled={loading}
              minLength={6}
            />
          </div>

          {error && (
            <div className={`px-4 py-3 rounded-lg text-sm leading-relaxed ${
              error.includes('überprüfen') 
                ? 'bg-blue-500/15 border border-blue-500/30 text-blue-300' 
                : 'bg-red-500/15 border border-red-500/30 text-red-300'
            }`}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-orange-500 to-yellow-400 text-gray-950 font-semibold shadow-lg shadow-orange-500/45 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-orange-500/60 transition-all disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
          >
            {loading ? 'Lädt...' : isSignUp ? 'Registrieren' : 'Anmelden'}
          </button>
        </form>

        {/* Toggle Sign Up / Sign In */}
        <div className="mt-6 text-center text-sm text-gray-400">
          {isSignUp ? (
            <>
              Bereits ein Konto?{' '}
              <button
                onClick={() => {
                  setIsSignUp(false)
                  setError(null)
                }}
                className="text-amber-500 font-semibold underline hover:text-yellow-400 transition-colors"
                type="button"
              >
                Jetzt anmelden
              </button>
            </>
          ) : (
            <>
              Noch kein Konto?{' '}
              <button
                onClick={() => {
                  setIsSignUp(true)
                  setError(null)
                }}
                className="text-amber-500 font-semibold underline hover:text-yellow-400 transition-colors"
                type="button"
              >
                Registrieren
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
