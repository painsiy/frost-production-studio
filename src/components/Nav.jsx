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
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  // Lock body scroll when menu open
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
        padding: '1.4rem 3rem',
        background: scrolled ? 'rgba(4,8,15,0.88)' : 'linear-gradient(to bottom,rgba(4,8,15,0.9),transparent)',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        transition: 'backdrop-filter 0.3s, background 0.3s',
      }}>
        {/* Logo */}
        <Link to="/" onClick={close} style={{
          display: 'flex', alignItems: 'center', gap: '0.7rem',
          fontFamily: 'var(--font-display)', fontSize: '1.05rem',
          fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase',
          color: 'var(--paper)',
        }}>
          <span style={{
            width: 30, height: 30, background: 'var(--accent)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '0.75rem', fontWeight: 800, color: '#fff', flexShrink: 0,
          }}>FP</span>
          Frost Production Studio
        </Link>

        {/* Desktop links */}
        <ul className="desktop-nav" style={{ display: 'flex', gap: '2.2rem', listStyle: 'none' }}>
          <li><NavLink to="/" end style={linkStyle}>Home</NavLink></li>
          <li><NavLink to="/projects" style={linkStyle}>Projects</NavLink></li>
          <li><NavLink to="/about" style={linkStyle}>About</NavLink></li>
          <li><NavLink to="/contact" style={linkStyle}>Contact</NavLink></li>
        </ul>

        {/* Hamburger */}
        <button
          className="hamburger"
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Open menu"
        >
          <span style={{ transform: menuOpen ? 'rotate(45deg) translate(5px,5px)' : 'none' }} />
          <span style={{ opacity: menuOpen ? 0 : 1 }} />
          <span style={{ transform: menuOpen ? 'rotate(-45deg) translate(5px,-5px)' : 'none' }} />
        </button>
      </nav>

      {/* Mobile fullscreen menu */}
      <div className={`mobile-menu${menuOpen ? ' open' : ''}`}>
        <button className="mobile-menu-close" onClick={close}>×</button>
        <NavLink to="/"        end onClick={close} className={({isActive})=>isActive?'active':''}>Home</NavLink>
        <NavLink to="/projects"    onClick={close} className={({isActive})=>isActive?'active':''}>Projects</NavLink>
        <NavLink to="/about"       onClick={close} className={({isActive})=>isActive?'active':''}>About</NavLink>
        <NavLink to="/contact"     onClick={close} className={({isActive})=>isActive?'active':''}>Contact</NavLink>
      </div>
    </>
  )
}
