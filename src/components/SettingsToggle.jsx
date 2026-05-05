import { useState } from 'react'
import { useTheme } from '../context/ThemeContext'

export default function SettingsToggle() {
  const { theme, cursor, toggleTheme, toggleCursor } = useTheme()
  const [open, setOpen] = useState(false)

  const isDark   = theme  === 'dark'
  const isCustom = cursor === 'custom'

  return (
    <div style={S.wrap}>
      {/* Panel — slides up when open */}
      <div style={{
        ...S.panel,
        opacity:        open ? 1 : 0,
        transform:      open ? 'translateY(0) scale(1)' : 'translateY(8px) scale(0.97)',
        pointerEvents:  open ? 'auto' : 'none',
        background:     isDark ? '#0d1526' : '#ffffff',
        border:         isDark ? '1px solid rgba(30,111,255,.18)' : '1px solid rgba(13,17,32,.12)',
        boxShadow:      isDark
          ? '0 24px 60px rgba(0,0,0,.7), 0 0 0 1px rgba(30,111,255,.08)'
          : '0 24px 60px rgba(0,0,0,.15), 0 0 0 1px rgba(13,17,32,.06)',
      }}>
        {/* Header */}
        <div style={{ ...S.panelHeader, borderBottom: isDark ? '1px solid rgba(255,255,255,.06)' : '1px solid rgba(0,0,0,.06)' }}>
          <span style={{ ...S.panelTitle, color: isDark ? '#e8edf5' : '#0d1120' }}>
            ⚙️  Site Settings
          </span>
          <span style={{ ...S.panelSub, color: isDark ? '#5a6a82' : '#7a8aaa' }}>
            Saved automatically
          </span>
        </div>

        {/* ── THEME TOGGLE ── */}
        <div style={S.row}>
          <div>
            <div style={{ ...S.rowLabel, color: isDark ? '#e8edf5' : '#0d1120' }}>
              {isDark ? '🌙  Dark Mode' : '☀️  Light Mode'}
            </div>
            <div style={{ ...S.rowSub, color: isDark ? '#5a6a82' : '#7a8aaa' }}>
              {isDark ? 'Switch to light background' : 'Switch to dark background'}
            </div>
          </div>
          <button
            onClick={toggleTheme}
            style={{
              ...S.toggle,
              background:  isDark ? '#1e6fff' : '#e0e5f0',
            }}
            aria-label="Toggle theme"
          >
            <div style={{
              ...S.toggleKnob,
              transform:   isDark ? 'translateX(22px)' : 'translateX(2px)',
              background:  '#ffffff',
            }}>
              {isDark ? '🌙' : '☀️'}
            </div>
          </button>
        </div>

        {/* Divider */}
        <div style={{ height:1, background: isDark ? 'rgba(255,255,255,.05)' : 'rgba(0,0,0,.06)', margin:'0 1rem' }}/>

        {/* ── CURSOR TOGGLE ── */}
        <div style={S.row}>
          <div>
            <div style={{ ...S.rowLabel, color: isDark ? '#e8edf5' : '#0d1120' }}>
              {isCustom ? '🔵  Custom Cursor' : '🖱️  Normal Cursor'}
            </div>
            <div style={{ ...S.rowSub, color: isDark ? '#5a6a82' : '#7a8aaa' }}>
              {isCustom ? 'Switch to system pointer' : 'Switch to custom dot cursor'}
            </div>
          </div>
          <button
            onClick={toggleCursor}
            style={{
              ...S.toggle,
              background: isCustom ? '#1e6fff' : '#e0e5f0',
            }}
            aria-label="Toggle cursor"
          >
            <div style={{
              ...S.toggleKnob,
              transform:  isCustom ? 'translateX(22px)' : 'translateX(2px)',
              background: '#ffffff',
            }}>
              {isCustom ? '🔵' : '🖱️'}
            </div>
          </button>
        </div>

        {/* Footer note */}
        <div style={{ ...S.panelFooter, borderTop: isDark ? '1px solid rgba(255,255,255,.05)' : '1px solid rgba(0,0,0,.06)', color: isDark ? '#3a4a62' : '#aab4cc' }}>
          Settings saved across all pages
        </div>
      </div>

      {/* FAB trigger button */}
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          ...S.fab,
          background: isDark ? '#0d1526' : '#ffffff',
          border:     isDark ? '1px solid rgba(30,111,255,.25)' : '1px solid rgba(13,17,32,.15)',
          boxShadow:  isDark ? '0 8px 32px rgba(0,0,0,.5)' : '0 8px 32px rgba(0,0,0,.12)',
          color:      isDark ? '#7aa8e8' : '#3a5aaa',
        }}
        aria-label="Site settings"
        title="Site settings"
      >
        <span style={{ fontSize:'1.1rem', transition:'transform .35s', display:'block', transform: open ? 'rotate(45deg)' : 'rotate(0deg)' }}>
          {open ? '×' : '⚙️'}
        </span>
      </button>
    </div>
  )
}

const S = {
  wrap: {
    position: 'fixed',
    bottom: '2rem',
    right:  '2rem',
    zIndex: 800,
    display:'flex', flexDirection:'column', alignItems:'flex-end', gap:'0.6rem',
  },
  panel: {
    width: 280,
    borderRadius: 12,
    overflow: 'hidden',
    transition: 'opacity .25s ease, transform .25s ease',
    transformOrigin: 'bottom right',
  },
  panelHeader: {
    padding: '1rem 1.2rem 0.9rem',
    display: 'flex', flexDirection:'column', gap:'0.2rem',
  },
  panelTitle: {
    fontFamily: 'var(--font-display)',
    fontWeight: 800,
    fontSize: '0.95rem',
    letterSpacing: '0.04em',
  },
  panelSub: {
    fontFamily: 'var(--font-ui)',
    fontSize: '0.72rem',
    letterSpacing: '0.06em',
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0.9rem 1.2rem',
    gap: '1rem',
  },
  rowLabel: {
    fontFamily: 'var(--font-ui)',
    fontSize: '0.88rem',
    fontWeight: 500,
    marginBottom: '0.2rem',
  },
  rowSub: {
    fontFamily: 'var(--font-ui)',
    fontSize: '0.72rem',
    lineHeight: 1.4,
  },
  toggle: {
    width: 48, height: 26, borderRadius: 13,
    border: 'none', cursor: 'pointer', flexShrink: 0,
    position: 'relative', transition: 'background .25s',
    padding: 0,
  },
  toggleKnob: {
    position: 'absolute', top: 2,
    width: 22, height: 22, borderRadius: '50%',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: '0.7rem', transition: 'transform .25s ease',
    boxShadow: '0 1px 4px rgba(0,0,0,.25)',
  },
  panelFooter: {
    padding: '0.65rem 1.2rem',
    fontFamily: 'var(--font-ui)',
    fontSize: '0.7rem',
    letterSpacing: '0.08em',
    textAlign: 'center',
  },
  fab: {
    width: 44, height: 44, borderRadius: '50%',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    cursor: 'pointer', transition: 'all .2s',
    padding: 0,
  },
}
