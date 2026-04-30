import { Link } from 'react-router-dom'

const socials = [
  { label: 'Vimeo',     href: 'https://vimeo.com' },
  { label: 'Instagram', href: 'https://instagram.com' },
  { label: 'LinkedIn',  href: 'https://linkedin.com' },
  { label: 'Behance',   href: 'https://behance.net' },
]

export default function Footer() {
  return (
    <footer className="site-footer">
      <Link to="/" className="footer-logo">Frost Production Studio</Link>
      <div className="footer-socials">
        {socials.map(s => (
          <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer">
            {s.label}
          </a>
        ))}
      </div>
      <span style={{ fontFamily: 'var(--font-ui)' }}>
        © 2025 Richard Amune / Frost Production Studio
      </span>
    </footer>
  )
}
