import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'

export default function AdminLogin() {
  const { login, error, loading } = useAuth()
  const [email, setEmail]         = useState('')
  const [pass,  setPass]          = useState('')
  const [showPass, setShowPass]   = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    await login(email, pass)
  }

  return (
    <div style={S.wrap}>
      {/* Background */}
      <div style={S.bg}/>
      <div style={S.grid}/>

      <div style={S.card}>
        {/* Logo */}
        <div style={S.logoRow}>
          <div style={S.logoMark}>FP</div>
          <div>
            <div style={S.logoName}>Frost Production Studio</div>
            <div style={S.logoSub}>Admin Dashboard</div>
          </div>
        </div>

        <h1 style={S.title}>Sign In</h1>
        <p style={S.subtitle}>Only authorised admins can access this area.</p>

        <form onSubmit={handleSubmit} style={S.form} noValidate>
          {/* Email */}
          <div style={S.field}>
            <label style={S.label}>Email Address</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="admin@frostproductionstudio.com"
              style={S.input}
              required
              autoComplete="email"
            />
          </div>

          {/* Password */}
          <div style={S.field}>
            <label style={S.label}>Password</label>
            <div style={{ position:'relative' }}>
              <input
                type={showPass ? 'text' : 'password'}
                value={pass}
                onChange={e => setPass(e.target.value)}
                placeholder="••••••••••••"
                style={{ ...S.input, paddingRight: '3rem' }}
                required
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPass(s => !s)}
                style={S.eyeBtn}
              >
                {showPass ? '🙈' : '👁'}
              </button>
            </div>
          </div>

          {/* Error */}
          {error && <div style={S.errorBox}>{error}</div>}

          {/* Hint box — remove in production */}
          <div style={S.hintBox}>
            <strong>Demo credentials:</strong><br/>
            Email: admin@frostproductionstudio.com<br/>
            Password: FrostAdmin2025!
          </div>

          <button type="submit" disabled={loading} style={S.btn}>
            {loading ? 'Signing in…' : 'Sign In →'}
          </button>
        </form>

        <p style={S.footer}>
          © 2025 Frost Production Studio · Richard Amune
        </p>
      </div>
    </div>
  )
}

const S = {
  wrap: {
    minHeight: '100vh', display: 'flex', alignItems: 'center',
    justifyContent: 'center', background: '#04080f',
    padding: '2rem', position: 'relative', overflow: 'hidden',
  },
  bg: {
    position: 'absolute', inset: 0,
    background: 'radial-gradient(ellipse 70% 60% at 60% 40%, rgba(30,111,255,.08), transparent 65%)',
  },
  grid: {
    position: 'absolute', inset: 0,
    backgroundImage: 'linear-gradient(rgba(30,111,255,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(30,111,255,.03) 1px,transparent 1px)',
    backgroundSize: '60px 60px',
  },
  card: {
    position: 'relative', zIndex: 2,
    background: '#080f1a', border: '1px solid rgba(30,111,255,.15)',
    padding: '3rem', width: '100%', maxWidth: 440,
    boxShadow: '0 40px 80px rgba(0,0,0,.6)',
  },
  logoRow: { display:'flex', alignItems:'center', gap:'0.8rem', marginBottom:'2.5rem' },
  logoMark: {
    width:36, height:36, background:'#1e6fff',
    display:'flex', alignItems:'center', justifyContent:'center',
    fontFamily:'var(--font-display)', fontWeight:900, fontSize:'0.9rem', color:'#fff',
  },
  logoName: { fontFamily:'var(--font-display)', fontWeight:800, fontSize:'0.95rem', letterSpacing:'0.1em', textTransform:'uppercase', color:'#e8edf5' },
  logoSub:  { fontFamily:'var(--font-ui)', fontSize:'0.78rem', color:'#5a6a82', letterSpacing:'0.08em', marginTop:'2px' },

  title:    { fontFamily:'var(--font-display)', fontWeight:900, fontSize:'2rem', color:'#e8edf5', marginBottom:'0.5rem' },
  subtitle: { fontFamily:'var(--font-body)', fontSize:'0.95rem', color:'#5a6a82', marginBottom:'2rem', lineHeight:1.6 },

  form:  { display:'flex', flexDirection:'column', gap:'1.2rem' },
  field: { display:'flex', flexDirection:'column', gap:'0.4rem' },
  label: { fontFamily:'var(--font-ui)', fontSize:'0.8rem', letterSpacing:'0.1em', textTransform:'uppercase', color:'#7aa8e8' },
  input: {
    background: 'rgba(232,237,245,.04)', border: '1px solid rgba(30,111,255,.2)',
    padding: '0.85rem 1rem', fontFamily:'var(--font-body)', fontSize:'1rem',
    color:'#e8edf5', outline:'none', width:'100%',
    transition: 'border-color 0.2s',
  },
  eyeBtn: {
    position:'absolute', right:'0.8rem', top:'50%', transform:'translateY(-50%)',
    background:'none', border:'none', cursor:'pointer', fontSize:'1rem', padding:0,
  },
  errorBox: {
    background:'rgba(255,60,60,.1)', border:'1px solid rgba(255,60,60,.3)',
    padding:'0.75rem 1rem', fontFamily:'var(--font-ui)', fontSize:'0.88rem', color:'#ff6b6b',
  },
  hintBox: {
    background:'rgba(30,111,255,.06)', border:'1px solid rgba(30,111,255,.2)',
    padding:'0.75rem 1rem', fontFamily:'var(--font-ui)', fontSize:'0.8rem',
    color:'#7aa8e8', lineHeight:1.7,
  },
  btn: {
    background:'#1e6fff', border:'none', padding:'1rem',
    fontFamily:'var(--font-ui)', fontSize:'0.92rem',
    letterSpacing:'0.12em', textTransform:'uppercase', color:'#fff',
    cursor:'pointer', transition:'background 0.2s', marginTop:'0.5rem',
    width:'100%',
  },
  footer: { fontFamily:'var(--font-ui)', fontSize:'0.75rem', color:'#5a6a82', textAlign:'center', marginTop:'2rem' },
}
