import { useState, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'

const linkStyle = ({ isActive }) => ({
  fontFamily: 'var(--font-ui)',
  fontSize: '0.85rem',
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: isActive ? 'var(--accent)' : 'var(--paper)',
  opacity: isActive ? 1 : 0.7,
  transition: 'opacity 0.2s, color 0.2s',
})

export default function Nav() {
  const [scrolled, setScrolled]   = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)
  const [isMobile, setIsMobile]   = useState(window.innerWidth <= 768)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    const onResize = () => setIsMobile(window.innerWidth <= 768)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const close = () => setMenuOpen(false)

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 500,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: isMobile ? '1.2rem 1.5rem' : '1.4rem 3rem',
        // Always keep a solid-enough background so the hamburger is always visible
        background: scrolled
          ? 'rgba(4,8,15,0.92)'
          : 'rgba(4,8,15,0.75)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(232,237,245,0.04)',
        transition: 'background 0.3s',
      }}>

        {/* Logo */}
        <Link to="/" onClick={close} style={{
          display: 'flex', alignItems: 'center', gap: '0.6rem',
          fontFamily: 'var(--font-display)', fontWeight: 800,
          fontSize: isMobile ? '0.85rem' : '1.05rem',
          letterSpacing: '0.1em', textTransform: 'uppercase',
          color: 'var(--paper)', flexShrink: 0,
        }}>
          <span style={{
            width: 28, height: 28, background: 'var(--accent)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '0.72rem', fontWeight: 800, color: '#fff', flexShrink: 0,
          }}>FP</span>
          {/* Hide long name on very small screens */}
          <span style={{ display: isMobile ? 'none' : 'inline' }}>
            Frost Production Studio
          </span>
          <span style={{ display: isMobile ? 'inline' : 'none' }}>
            Frost Studio
          </span>
        </Link>

        {/* Desktop links */}
        {!isMobile && (
          <ul style={{ display: 'flex', gap: '2.2rem', listStyle: 'none' }}>
            <li><NavLink to="/" end style={linkStyle}>Home</NavLink></li>
            <li><NavLink to="/projects" style={linkStyle}>Projects</NavLink></li>
            <li><NavLink to="/about" style={linkStyle}>About</NavLink></li>
            <li><NavLink to="/contact" style={linkStyle}>Contact</NavLink></li>
          </ul>
        )}

        {/* Hamburger — only on mobile, always visible */}
        {isMobile && (
          <button
            onClick={() => setMenuOpen(o => !o)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            style={{
              display: 'flex', flexDirection: 'column',
              gap: 5, background: 'none', border: 'none',
              cursor: 'pointer', padding: '6px', zIndex: 510,
            }}
          >
            <span style={{
              display: 'block', width: 26, height: 2,
              background: '#fff',
              borderRadius: 2,
              transition: 'transform 0.3s, opacity 0.3s',
              transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none',
            }}/>
            <span style={{
              display: 'block', width: 26, height: 2,
              background: '#fff',
              borderRadius: 2,
              transition: 'opacity 0.3s',
              opacity: menuOpen ? 0 : 1,
            }}/>
            <span style={{
              display: 'block', width: 26, height: 2,
              background: '#fff',
              borderRadius: 2,
              transition: 'transform 0.3s, opacity 0.3s',
              transform: menuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none',
            }}/>
          </button>
        )}
      </nav>

      {/* Mobile fullscreen overlay menu */}
      {isMobile && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 490,
          background: 'rgba(4,8,15,0.97)',
          backdropFilter: 'blur(20px)',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          gap: '2.5rem',
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? 'auto' : 'none',
          transition: 'opacity 0.3s ease',
        }}>
          {/* Close button */}
          <button
            onClick={close}
            style={{
              position: 'absolute', top: '1.5rem', right: '1.5rem',
              background: 'none', border: 'none', color: 'var(--paper)',
              fontSize: '2rem', cursor: 'pointer', lineHeight: 1,
              width: 44, height: 44,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >×</button>

          {[
            { to: '/',        label: 'Home',     end: true },
            { to: '/projects',label: 'Projects'  },
            { to: '/about',   label: 'About'     },
            { to: '/contact', label: 'Contact'   },
          ].map(({ to, label, end }) => (
            <NavLink
              key={to} to={to} end={end} onClick={close}
              style={({ isActive }) => ({
                fontFamily: 'var(--font-display)', fontWeight: 900,
                fontSize: 'clamp(2rem, 10vw, 3rem)',
                letterSpacing: '0.06em', textTransform: 'uppercase',
                color: isActive ? 'var(--accent)' : 'var(--paper)',
                transition: 'color 0.2s',
              })}
            >
              {label}
            </NavLink>
          ))}

          <div style={{
            marginTop: '1rem',
            fontFamily: 'var(--font-ui)', fontSize: '0.82rem',
            letterSpacing: '0.15em', color: 'var(--muted)',
            textTransform: 'uppercase',
          }}>
            Richard Amune
          </div>
        </div>
      )}
    </>
  )
}
