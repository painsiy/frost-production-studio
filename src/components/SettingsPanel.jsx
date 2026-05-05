import { useState } from 'react'
import { useTheme } from '../context/ThemeContext'

export default function SettingsPanel() {
  const { theme, cursorStyle, toggleTheme, toggleCursor } = useTheme()
  const [open, setOpen] = useState(false)

  const isDark    = theme === 'dark'
  const isCustom  = cursorStyle === 'custom'

  return (
    <>
      {/* ── TRIGGER BUTTON — fixed bottom-right ── */}
      <button
        onClick={() => setOpen(o => !o)}
        title="Site Settings"
        style={{
          position: 'fixed', bottom: '1.8rem', right: '1.8rem', zIndex: 5000,
          width: 44, height: 44, borderRadius: '50%',
          background: 'var(--accent)',
          border: 'none',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 20px rgba(30,111,255,0.4)',
          transition: 'transform 0.25s, box-shadow 0.25s',
          transform: open ? 'rotate(45deg)' : 'rotate(0)',
          cursor: 'pointer',
        }}
        aria-label="Settings"
      >
        {/* Gear icon */}
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3"/>
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
        </svg>
      </button>

      {/* ── PANEL ── */}
      <div style={{
        position: 'fixed', bottom: '5.2rem', right: '1.8rem', zIndex: 4999,
        width: 270,
        background: isDark ? '#080f1c' : '#ffffff',
        border: `1px solid ${isDark ? 'rgba(30,111,255,.2)' : 'rgba(13,17,32,.12)'}`,
        boxShadow: '0 20px 60px rgba(0,0,0,.4)',
        borderRadius: 4,
        overflow: 'hidden',
        opacity: open ? 1 : 0,
        transform: open ? 'translateY(0) scale(1)' : 'translateY(12px) scale(0.97)',
        pointerEvents: open ? 'auto' : 'none',
        transition: 'opacity 0.2s ease, transform 0.2s ease',
      }}>

        {/* Header */}
        <div style={{
          padding: '1rem 1.2rem',
          borderBottom: `1px solid ${isDark ? 'rgba(30,111,255,.1)' : 'rgba(13,17,32,.08)'}`,
          display: 'flex', alignItems: 'center', gap: '0.6rem',
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
          <span style={{ fontFamily:'var(--font-ui)', fontWeight:600, fontSize:'0.82rem', letterSpacing:'0.1em', textTransform:'uppercase', color:'var(--paper)' }}>
            Site Settings
          </span>
        </div>

        {/* ── THEME TOGGLE ── */}
        <div style={{ padding:'1rem 1.2rem', borderBottom:`1px solid ${isDark ? 'rgba(30,111,255,.08)' : 'rgba(13,17,32,.07)'}` }}>
          <p style={{ fontFamily:'var(--font-ui)', fontSize:'0.72rem', letterSpacing:'0.14em', textTransform:'uppercase', color:'var(--muted)', marginBottom:'0.8rem' }}>
            Colour Mode
          </p>
          <div style={{ display:'flex', gap:'0.5rem' }}>
            {/* Dark button */}
            <button
              onClick={() => { if (!isDark) toggleTheme() }}
              style={{
                flex:1, padding:'0.65rem 0',
                background: isDark ? 'var(--accent)' : 'transparent',
                border: `1px solid ${isDark ? 'var(--accent)' : (isDark ? 'rgba(232,237,245,.15)' : 'rgba(13,17,32,.15)')}`,
                color: isDark ? '#fff' : 'var(--muted)',
                fontFamily:'var(--font-ui)', fontSize:'0.8rem', letterSpacing:'0.08em',
                cursor:'pointer', transition:'all 0.2s',
                display:'flex', alignItems:'center', justifyContent:'center', gap:'0.5rem',
              }}
            >
              🌙 Dark
            </button>
            {/* Light button */}
            <button
              onClick={() => { if (isDark) toggleTheme() }}
              style={{
                flex:1, padding:'0.65rem 0',
                background: !isDark ? 'var(--accent)' : 'transparent',
                border: `1px solid ${!isDark ? 'var(--accent)' : (isDark ? 'rgba(232,237,245,.15)' : 'rgba(13,17,32,.15)')}`,
                color: !isDark ? '#fff' : 'var(--muted)',
                fontFamily:'var(--font-ui)', fontSize:'0.8rem', letterSpacing:'0.08em',
                cursor:'pointer', transition:'all 0.2s',
                display:'flex', alignItems:'center', justifyContent:'center', gap:'0.5rem',
              }}
            >
              ☀️ Light
            </button>
          </div>
          <p style={{ fontFamily:'var(--font-body)', fontSize:'0.78rem', color:'var(--muted)', marginTop:'0.6rem', lineHeight:1.5 }}>
            {isDark ? 'Dark mode active — deep blue-black palette.' : 'Light mode active — clean white palette.'}
          </p>
        </div>

        {/* ── CURSOR TOGGLE ── */}
        <div style={{ padding:'1rem 1.2rem', borderBottom:`1px solid ${isDark ? 'rgba(30,111,255,.08)' : 'rgba(13,17,32,.07)'}` }}>
          <p style={{ fontFamily:'var(--font-ui)', fontSize:'0.72rem', letterSpacing:'0.14em', textTransform:'uppercase', color:'var(--muted)', marginBottom:'0.8rem' }}>
            Cursor Style
          </p>
          <div style={{ display:'flex', gap:'0.5rem' }}>
            {/* Custom cursor */}
            <button
              onClick={() => { if (!isCustom) toggleCursor() }}
              style={{
                flex:1, padding:'0.65rem 0',
                background: isCustom ? 'var(--accent)' : 'transparent',
                border: `1px solid ${isCustom ? 'var(--accent)' : (isDark ? 'rgba(232,237,245,.15)' : 'rgba(13,17,32,.15)')}`,
                color: isCustom ? '#fff' : 'var(--muted)',
                fontFamily:'var(--font-ui)', fontSize:'0.8rem', letterSpacing:'0.08em',
                cursor:'pointer', transition:'all 0.2s',
                display:'flex', alignItems:'center', justifyContent:'center', gap:'0.5rem',
              }}
            >
              ✦ Custom
            </button>
            {/* Normal cursor */}
            <button
              onClick={() => { if (isCustom) toggleCursor() }}
              style={{
                flex:1, padding:'0.65rem 0',
                background: !isCustom ? 'var(--accent)' : 'transparent',
                border: `1px solid ${!isCustom ? 'var(--accent)' : (isDark ? 'rgba(232,237,245,.15)' : 'rgba(13,17,32,.15)')}`,
                color: !isCustom ? '#fff' : 'var(--muted)',
                fontFamily:'var(--font-ui)', fontSize:'0.8rem', letterSpacing:'0.08em',
                cursor:'pointer', transition:'all 0.2s',
                display:'flex', alignItems:'center', justifyContent:'center', gap:'0.5rem',
              }}
            >
              ↖ Normal
            </button>
          </div>
          <p style={{ fontFamily:'var(--font-body)', fontSize:'0.78rem', color:'var(--muted)', marginTop:'0.6rem', lineHeight:1.5 }}>
            {isCustom ? 'Custom dot cursor with trailing ring.' : 'Standard OS mouse pointer.'}
          </p>
        </div>

        {/* Footer note */}
        <div style={{ padding:'0.8rem 1.2rem' }}>
          <p style={{ fontFamily:'var(--font-body)', fontSize:'0.72rem', color:'var(--muted)', lineHeight:1.5, textAlign:'center' }}>
            Settings are saved and remembered across all pages.
          </p>
        </div>
      </div>
    </>
  )
}
