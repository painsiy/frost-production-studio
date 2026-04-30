import { useEffect, useState } from 'react'
import { NavLink, Link } from 'react-router-dom'

const S = {
  nav: (scrolled) => ({
    position: 'fixed', top: 0, left: 0, right: 0, zIndex: 500,
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    padding: '1.5rem 3rem',
    background: scrolled ? 'rgba(4,8,15,0.82)' : 'linear-gradient(to bottom, rgba(4,8,15,0.9), transparent)',
    backdropFilter: scrolled ? 'blur(16px)' : 'none',
    transition: 'backdrop-filter 0.3s, background 0.3s',
  }),
  logo: {
    display: 'flex', alignItems: 'center', gap: '0.7rem',
    fontFamily: 'var(--font-display)',
    fontSize: '1rem', fontWeight: 800,
    letterSpacing: '0.12em', textTransform: 'uppercase',
    color: 'var(--paper)',
  },
  mark: {
    width: 28, height: 28,
    background: 'var(--accent)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: '0.72rem', fontWeight: 700, color: '#fff',
    flexShrink: 0,
    fontFamily: 'var(--font-display)',
  },
  links: { display: 'flex', gap: '2.2rem', listStyle: 'none' },
}

const linkStyle = ({ isActive }) => ({
  fontFamily: 'var(--font-ui)',
  fontSize: '0.6rem',
  letterSpacing: '0.2em',
  textTransform: 'uppercase',
  color: isActive ? 'var(--accent)' : 'var(--paper)',
  opacity: isActive ? 1 : 0.6,
  transition: 'opacity 0.2s, color 0.2s',
})

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <nav style={S.nav(scrolled)}>
      <Link to="/" style={S.logo}>
        <span style={S.mark}>FP</span>
        Frost Production Studio
      </Link>
      <ul style={S.links}>
        <li><NavLink to="/"             end   style={linkStyle}>Home</NavLink></li>
        <li><NavLink to="/about"              style={linkStyle}>About</NavLink></li>
        <li><NavLink to="/project-nova"       style={linkStyle}>Projects</NavLink></li>
        <li><NavLink to="/contact"            style={linkStyle}>Contact</NavLink></li>
      </ul>
    </nav>
  )
}
