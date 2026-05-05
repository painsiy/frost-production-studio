import { useState, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'

export default function Nav() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  const [scrolled,  setScrolled]  = useState(false)
  const [menuOpen,  setMenuOpen]  = useState(false)
  const [isMobile,  setIsMobile]  = useState(window.innerWidth <= 768)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    const onResize = () => setIsMobile(window.innerWidth <= 768)
    window.addEventListener('scroll',  onScroll, { passive: true })
    window.addEventListener('resize',  onResize)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const close = () => setMenuOpen(false)

  // Nav bg — always readable on both themes
  const navBg = scrolled
    ? isDark ? 'rgba(4,8,15,0.94)'   : 'rgba(245,247,252,0.94)'
    : isDark ? 'rgba(4,8,15,0.80)'   : 'rgba(245,247,252,0.85)'

  // Text colours that follow the theme
  const textColor    = isDark ? '#e8edf5' : '#0d1120'
  const mutedColor   = isDark ? '#5a6a82' : '#5a6a90'
  const barColor     = isDark ? '#e8edf5' : '#0d1120'  // hamburger bars
  const overlayBg    = isDark ? 'rgba(4,8,15,0.97)' : 'rgba(245,247,252,0.97)'
  const menuLinkColor = isDark ? '#e8edf5' : '#0d1120'

  const linkStyle = ({ isActive }) => ({
    fontFamily: 'var(--font-ui)',
    fontSize: '0.85rem',
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    color: isActive ? 'var(--accent)' : textColor,
    opacity: isActive ? 1 : 0.7,
    transition: 'opacity 0.2s, color 0.2s',
  })

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 500,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: isMobile ? '1rem 1.5rem' : '1.2rem 3rem',
        background: navBg,
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        borderBottom: `1px solid ${isDark ? 'rgba(232,237,245,0.05)' : 'rgba(13,17,32,0.08)'}`,
        transition: 'background 0.3s',
      }}>

        {/* Logo */}
        <Link to="/" onClick={close} style={{
          display: 'flex', alignItems: 'center', gap: '0.6rem',
          fontFamily: 'var(--font-display)', fontWeight: 800,
          fontSize: isMobile ? '0.85rem' : '1.05rem',
          letterSpacing: '0.1em', textTransform: 'uppercase',
          color: textColor, flexShrink: 0,
          textDecoration: 'none',
        }}>
          <span style={{
            width: 30, height: 30, background: 'var(--accent)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '0.75rem', fontWeight: 800, color: '#fff', flexShrink: 0,
          }}>RA</span>
          <span style={{ display: isMobile ? 'none' : 'inline' }}>
            Richard Amune
          </span>
          <span style={{ display: isMobile ? 'inline' : 'none' }}>
            Richard Amune
          </span>
        </Link>

        {/* Desktop links */}
        {!isMobile && (
          <ul style={{ display: 'flex', gap: '2.2rem', listStyle: 'none' }}>
            <li><NavLink to="/" end style={linkStyle}>Home</NavLink></li>
            <li><NavLink to="/projects" style={linkStyle}>Projects</NavLink></li>
            <li><NavLink to="/about"    style={linkStyle}>About</NavLink></li>
            <li><NavLink to="/contact"  style={linkStyle}>Contact</NavLink></li>
          </ul>
        )}

        {/* Hamburger — bars use barColor so always visible on both themes */}
        {isMobile && (
          <button
            onClick={() => setMenuOpen(o => !o)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            style={{
              display: 'flex', flexDirection: 'column',
              gap: 5, background: 'none', border: 'none',
              cursor: 'pointer', padding: '8px', zIndex: 510,
            }}
          >
            {[
              { transform: menuOpen ? 'rotate(45deg) translate(5px,5px)' : 'none', opacity: 1 },
              { transform: 'none', opacity: menuOpen ? 0 : 1 },
              { transform: menuOpen ? 'rotate(-45deg) translate(5px,-5px)' : 'none', opacity: 1 },
            ].map((s, i) => (
              <span key={i} style={{
                display: 'block', width: 26, height: 2.5,
                background: barColor,          // ← follows theme
                borderRadius: 2,
                transition: 'transform 0.3s, opacity 0.3s, background 0.3s',
                transform: s.transform,
                opacity: s.opacity,
              }}/>
            ))}
          </button>
        )}
      </nav>

      {/* Mobile fullscreen overlay — background + text both follow theme */}
      {isMobile && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 490,
          background: overlayBg,
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          gap: '2.5rem',
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? 'auto' : 'none',
          transition: 'opacity 0.3s ease',
        }}>
          {/* Close × */}
          <button onClick={close} style={{
            position: 'absolute', top: '1.5rem', right: '1.5rem',
            background: 'none', border: 'none',
            color: textColor,          // ← follows theme
            fontSize: '2.2rem', cursor: 'pointer', lineHeight: 1,
            width: 48, height: 48,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>×</button>

          {[
            { to: '/',         label: 'Home',     end: true },
            { to: '/projects', label: 'Projects'  },
            { to: '/about',    label: 'About'     },
            { to: '/contact',  label: 'Contact'   },
          ].map(({ to, label, end }) => (
            <NavLink
              key={to} to={to} end={end} onClick={close}
              style={({ isActive }) => ({
                fontFamily: 'var(--font-display)', fontWeight: 900,
                fontSize: 'clamp(2rem,10vw,3rem)',
                letterSpacing: '0.06em', textTransform: 'uppercase',
                color: isActive ? 'var(--accent)' : menuLinkColor,  // ← follows theme
                textDecoration: 'none',
                transition: 'color 0.2s',
              })}
            >
              {label}
            </NavLink>
          ))}

          <div style={{
            marginTop: '1rem',
            fontFamily: 'var(--font-ui)', fontSize: '0.82rem',
            letterSpacing: '0.15em', color: mutedColor,
            textTransform: 'uppercase',
          }}>
            Richard Amune
          </div>
        </div>
      )}
    </>
  )
}
