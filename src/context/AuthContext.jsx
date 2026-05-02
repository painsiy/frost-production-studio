import { createContext, useContext, useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

// ── HARDCODED ADMIN CREDENTIALS (fallback when Supabase not connected) ──
// Change these to your own credentials before deploying
const ADMIN_EMAIL    = 'admin@frostproductionstudio.com'
const ADMIN_PASSWORD = 'FrostAdmin2025!'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user,    setUser]    = useState(null)
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState('')

  useEffect(() => {
    // Check Supabase session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // Also check localStorage fallback session
    const localSession = localStorage.getItem('frost_admin_session')
    if (localSession) {
      try {
        const parsed = JSON.parse(localSession)
        if (parsed.expires > Date.now()) setUser(parsed)
      } catch { localStorage.removeItem('frost_admin_session') }
    }

    // Listen for Supabase auth changes
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    setLoading(false)
    return () => listener?.subscription?.unsubscribe()
  }, [])

  const login = async (email, password) => {
    setError('')
    setLoading(true)

    // Try Supabase Auth first
    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({ email, password })
      if (data?.user && !authError) {
        setUser(data.user)
        setLoading(false)
        return true
      }
    } catch { /* Supabase not connected — fall through */ }

    // Fallback: check hardcoded credentials
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      const session = {
        email, id: 'local-admin',
        name: 'Richard Amune',
        expires: Date.now() + 1000 * 60 * 60 * 8, // 8 hours
      }
      localStorage.setItem('frost_admin_session', JSON.stringify(session))
      setUser(session)
      setLoading(false)
      return true
    }

    setError('Invalid email or password')
    setLoading(false)
    return false
  }

  const logout = async () => {
    await supabase.auth.signOut().catch(() => {})
    localStorage.removeItem('frost_admin_session')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, error, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
