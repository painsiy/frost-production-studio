import { useState } from 'react'
import { useTheme } from '../context/ThemeContext'

export default function SettingsToggle() {
  const { theme, cursor, toggleTheme, toggleCursor } = useTheme()
  const [open, setOpen] = useState(false)

  const isDark   = theme  === 'dark'
  const isCustom = cursor === 'custom'

  // Colours that follow the current theme
  const panelBg     = isDark ? '#0d1a2e'              : '#ffffff'
  const panelBorder = isDark ? 'rgba(30,111,255,.22)' : 'rgba(13,17,32,.14)'
  const panelShadow = isDark ? '0 24px 60px rgba(0,0,0,.7)' : '0 24px 60px rgba(0,0,0,.18)'
  const titleColor  = isDark ? '#e8edf5'              : '#0d1120'
  const subColor    = isDark ? '#5a6a82'              : '#7a8aaa'
  const dividerColor= isDark ? 'rgba(255,255,255,.06)': 'rgba(0,0,0,.07)'
  const fabBg       = isDark ? '#0d1a2e'              : '#ffffff'
  const fabBorder   = isDark ? 'rgba(30,111,255,.3)'  : 'rgba(13,17,32,.18)'
  const fabColor    = isDark ? '#7aa8e8'              : '#1e6fff'

  return (
    <div style={{
      position: 'fixed', bottom: '2rem', right: '2rem',
      zIndex: 800, display: 'flex', flexDirection: 'column',
      alignItems: 'flex-end', gap: '0.7rem',
    }}>

      {/* ── SETTINGS PANEL ── */}
      <div style={{
        width: 300,
        borderRadius: 14,
        overflow: 'hidden',
        background: panelBg,
        border: `1px solid ${panelBorder}`,
        boxShadow: panelShadow,
        opacity: open ? 1 : 0,
        transform: open ? 'translateY(0) scale(1)' : 'translateY(10px) scale(0.96)',
        pointerEvents: open ? 'auto' : 'none',
        transition: 'opacity .25s ease, transform .25s ease',
        transformOrigin: 'bottom right',
      }}>

        {/* Header */}
        <div style={{ padding: '1.1rem 1.4rem 0.9rem', borderBottom: `1px solid ${dividerColor}` }}>
          <div style={{ fontFamily:'var(--font-display)', fontWeight:800, fontSize:'1rem', color: titleColor, marginBottom:'.2rem' }}>
            ⚙️  Site Settings
          </div>
          <div style={{ fontFamily:'var(--font-ui)', fontSize:'0.72rem', color: subColor, letterSpacing:'.05em' }}>
            Preferences saved across all pages
          </div>
        </div>

        {/* ── Theme row ── */}
        <Row
          icon={isDark ? '🌙' : '☀️'}
          label={isDark ? 'Dark Mode' : 'Light Mode'}
          sub={isDark ? 'Switch to white background' : 'Switch to dark background'}
          active={isDark}
          onToggle={toggleTheme}
          titleColor={titleColor}
          subColor={subColor}
          dividerColor={dividerColor}
        />

        {/* ── Cursor row ── */}
        <Row
          icon={isCustom ? '🔵' : '🖱️'}
          label={isCustom ? 'Custom Cursor' : 'System Cursor'}
          sub={isCustom ? 'Switch to system pointer' : 'Switch to custom dot'}
          active={isCustom}
          onToggle={toggleCursor}
          titleColor={titleColor}
          subColor={subColor}
          dividerColor={dividerColor}
          last
        />
      </div>

      {/* ── FAB BUTTON — bigger, always readable ── */}
      <button
        onClick={() => setOpen(o => !o)}
        aria-label="Site settings"
        title="Site settings"
        style={{
          width: 52, height: 52,
          borderRadius: '50%',
          background: fabBg,
          border: `1.5px solid ${fabBorder}`,
          boxShadow: isDark ? '0 8px 32px rgba(0,0,0,.5)' : '0 8px 32px rgba(0,0,0,.14)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer',
          transition: 'all .2s',
          color: fabColor,
          fontSize: '1.3rem',
        }}
      >
        <span style={{
          display: 'block',
          transition: 'transform .35s',
          transform: open ? 'rotate(45deg)' : 'rotate(0deg)',
          lineHeight: 1,
        }}>
          {open ? '✕' : '⚙️'}
        </span>
      </button>
    </div>
  )
}

/* ── Reusable toggle row ── */
function Row({ icon, label, sub, active, onToggle, titleColor, subColor, dividerColor, last }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '1rem 1.4rem',
      borderBottom: last ? 'none' : `1px solid ${dividerColor}`,
      gap: '1rem',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', flex: 1, minWidth: 0 }}>
        <span style={{ fontSize: '1.2rem', flexShrink: 0 }}>{icon}</span>
        <div>
          <div style={{ fontFamily:'var(--font-ui)', fontWeight:500, fontSize:'0.88rem', color: titleColor, marginBottom:'.18rem' }}>
            {label}
          </div>
          <div style={{ fontFamily:'var(--font-ui)', fontSize:'0.72rem', color: subColor, lineHeight:1.4 }}>
            {sub}
          </div>
        </div>
      </div>

      {/* Toggle pill */}
      <button
        onClick={onToggle}
        style={{
          width: 50, height: 28, borderRadius: 14,
          background: active ? '#1e6fff' : 'rgba(90,106,130,.3)',
          border: 'none', cursor: 'pointer', flexShrink: 0,
          position: 'relative', transition: 'background .25s', padding: 0,
        }}
        aria-label={`Toggle ${label}`}
      >
        <div style={{
          position: 'absolute', top: 3,
          left: active ? 24 : 3,
          width: 22, height: 22, borderRadius: '50%',
          background: '#ffffff',
          boxShadow: '0 1px 4px rgba(0,0,0,.3)',
          transition: 'left .25s ease',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '0.65rem',
        }}>
          {active ? '✓' : ''}
        </div>
      </button>
    </div>
  )
}
