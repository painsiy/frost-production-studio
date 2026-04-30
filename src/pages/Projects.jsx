import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

function useReveal() {
  const ref = useRef(null)
  useEffect(() => {
    if (!ref.current) return
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          setTimeout(() => e.target.classList.add('visible'), i * 80)
          obs.unobserve(e.target)
        }
      })
    }, { threshold: 0.08 })
    ref.current.querySelectorAll('.reveal').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])
  return ref
}

const ALL_PROJECTS = [
  {
    id: 1, cat: 'branding', num: '01',
    tag: 'Brand Identity', title: 'NOVA COLLECTIVE', year: '2024',
    desc: 'A complete motion identity system for a Berlin-based creative studio — from logo sting to 90-second brand film.',
    grad: 'linear-gradient(135deg,#04080f 0%,#0d1a3a 40%,#1e6fff 100%)',
    link: '/project-nova', featured: true,
  },
  {
    id: 2, cat: 'broadcast', num: '02',
    tag: 'Broadcast', title: 'DEEP CURRENT SERIES', year: '2024',
    desc: 'Title sequence and full broadcast package for an award-winning documentary series on climate and oceans.',
    grad: 'linear-gradient(135deg,#060c18 0%,#0a1830 60%,#4a90d9 100%)',
  },
  {
    id: 3, cat: '3d', num: '03',
    tag: '3D Animation', title: 'AURUM FRAGRANCE', year: '2023',
    desc: 'Photorealistic 3D product animation for a luxury fragrance launch campaign across digital and OOH.',
    grad: 'linear-gradient(135deg,#06101a 0%,#0c2040 60%,#7aa8e8 100%)',
  },
  {
    id: 4, cat: 'ui', num: '04',
    tag: 'UI Motion', title: 'PULSE APP', year: '2023',
    desc: 'Motion design system for a health-tech startup — micro-interactions, onboarding flows and Lottie animations.',
    grad: 'linear-gradient(135deg,#0a0614 0%,#180a30 60%,#6644cc 100%)',
  },
  {
    id: 5, cat: 'branding', num: '05',
    tag: 'Branding', title: 'VERDANT STUDIOS', year: '2023',
    desc: 'Brand motion for an independent film production house — identity animations and festival title cards.',
    grad: 'linear-gradient(135deg,#040c18 0%,#081828 60%,#0044cc 100%)',
  },
  {
    id: 6, cat: 'broadcast', num: '06',
    tag: 'Title Sequence', title: 'ECHOES', year: '2022',
    desc: 'Opening title sequence for a multi-part documentary series on African music and cultural identity.',
    grad: 'linear-gradient(160deg,#04080f 0%,#091428 30%,#1e6fff 70%,#7aa8e8 100%)',
  },
  {
    id: 7, cat: '3d', num: '07',
    tag: '3D · Broadcast', title: 'ORBIT NETWORK', year: '2022',
    desc: 'Full broadcast rebrand including idents, stings and transition package for a pan-African news network.',
    grad: 'linear-gradient(135deg,#060814 0%,#0c1430 60%,#2244aa 100%)',
  },
  {
    id: 8, cat: 'ui', num: '08',
    tag: 'UI Motion', title: 'SOLARA DASHBOARD', year: '2022',
    desc: 'Data visualisation animations and dashboard motion design for a renewable energy monitoring platform.',
    grad: 'linear-gradient(135deg,#080610 0%,#140c28 60%,#4422aa 100%)',
  },
  {
    id: 9, cat: 'branding', num: '09',
    tag: 'Brand Identity', title: 'KANO CREATIVE', year: '2021',
    desc: 'Full motion identity for a creative agency based in Kano — from concept through to brand film.',
    grad: 'linear-gradient(135deg,#04080f 0%,#0d1a3a 60%,#1e4fcc 100%)',
  },
]

const FILTERS = [
  { key: 'all',       label: 'All Work' },
  { key: 'branding',  label: 'Branding' },
  { key: 'broadcast', label: 'Broadcast' },
  { key: '3d',        label: '3D' },
  { key: 'ui',        label: 'UI Motion' },
]

export default function Projects() {
  const page = useReveal()
  const [cat, setCat] = useState('all')
  const [hovered, setHovered] = useState(null)

  const visible = (c) => cat === 'all' || c === cat

  return (
    <div ref={page}>
      {/* PAGE HEADER */}
      <div style={S.header}>
        <div style={S.headerBg} />
        <div style={S.headerGrid} />
        <div style={S.headerNum}>03</div>
        <div style={S.headerLine} />
        <p style={{ ...S.breadcrumb, animation:'fadeUp .6s .2s forwards', opacity:0 }}>
          <Link to="/" style={{ color:'var(--muted)' }}>Home</Link>
          <span style={{ color:'var(--accent)', margin:'0 .6rem' }}>→</span>
          Projects
        </p>
        <h1 style={{ ...S.pageTitle, animation:'fadeUp .8s .35s forwards', opacity:0 }}>
          All<br />
          <em style={{ fontFamily:'var(--font-body)', fontStyle:'italic', color:'var(--accent)', fontWeight:300 }}>
            Projects
          </em>
        </h1>
      </div>

      {/* FILTER BAR */}
      <div style={S.filterWrap} className="filter-wrap-sticky">
        <div className="reveal" style={S.filterRow}>
          {FILTERS.map(f => (
            <button
              key={f.key}
              onClick={() => setCat(f.key)}
              style={{
                ...S.filterBtn,
                background: cat === f.key ? 'var(--accent)' : 'none',
                color: cat === f.key ? '#fff' : 'var(--muted)',
                borderColor: cat === f.key ? 'var(--accent)' : 'rgba(232,237,245,.12)',
              }}
            >
              {f.label}
            </button>
          ))}
          <span style={{ fontFamily:'var(--font-ui)', fontSize:'1.1rem', color:'var(--muted)', marginLeft:'auto', alignSelf:'center' }}>
            {ALL_PROJECTS.filter(p => cat === 'all' || p.cat === cat).length} projects
          </span>
        </div>
      </div>

      {/* PROJECT GRID */}
      <div style={S.gridWrap}>
        <div style={S.grid} className="projects-full-grid">
          {ALL_PROJECTS.map((p) => (
            <div
              key={p.id}
              className="proj-card reveal"
              style={{
                ...S.card,
                opacity: visible(p.cat) ? 1 : 0.08,
                pointerEvents: visible(p.cat) ? 'auto' : 'none',
                transition: 'opacity 0.35s',
              }}
              onMouseEnter={() => setHovered(p.id)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Thumbnail */}
              <div style={{ ...S.thumb, background: p.grad }}>
                {/* Overlay — uses CSS class for hover */}
                <div className="proj-overlay">
                  <span style={S.overlayTag}>{p.tag}</span>
                  <div style={S.overlayTitle}>{p.title}</div>
                  <span style={S.overlayYear}>{p.year}</span>
                  {p.link
                    ? <Link to={p.link} style={S.overlayCta}>View Case Study →</Link>
                    : <span style={S.overlayCta}>Coming Soon</span>
                  }
                </div>
                {/* Number watermark */}
                <div style={S.cardNum}>{p.num}</div>
              </div>

              {/* Caption always visible */}
              <div style={S.caption}>
                <div>
                  <div style={S.captionTag}>{p.tag} · {p.year}</div>
                  <div style={S.captionTitle}>{p.title}</div>
                  <div style={S.captionDesc}>{p.desc}</div>
                </div>
                {p.link && (
                  <Link to={p.link} style={{
                    ...S.captionLink,
                    color: hovered === p.id ? 'var(--accent)' : 'var(--muted)',
                  }}>→</Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* BOTTOM CTA */}
      <div style={S.cta}>
        <h2 className="reveal" style={S.ctaTitle}>
          Want to work<br /><span style={{ color:'var(--accent)' }}>together?</span>
        </h2>
        <div className="reveal" style={{ display:'flex', gap:'1rem', justifyContent:'center', flexWrap:'wrap' }}>
          <Link to="/contact" className="btn-primary">Start a Project →</Link>
          <Link to="/about"   className="btn-outline">About Richard →</Link>
        </div>
      </div>
    </div>
  )
}

const S = {
  header: { minHeight:'55vh', display:'flex', flexDirection:'column', justifyContent:'flex-end', padding:'8rem 3rem 4rem', position:'relative', overflow:'hidden', borderBottom:'1px solid var(--border)' },
  headerBg: { position:'absolute', inset:0, background:'radial-gradient(ellipse 60% 70% at 70% 30%,rgba(30,111,255,.08),transparent 65%),linear-gradient(160deg,#04080f 0%,#060c18 60%,#04080f 100%)' },
  headerGrid: { position:'absolute', inset:0, backgroundImage:'linear-gradient(rgba(30,111,255,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(30,111,255,.03) 1px,transparent 1px)', backgroundSize:'80px 80px' },
  headerNum: { position:'absolute', top:'8rem', right:'3rem', fontFamily:'var(--font-display)', fontWeight:900, fontSize:'clamp(8rem,18vw,16rem)', color:'transparent', WebkitTextStroke:'1px rgba(30,111,255,.04)', lineHeight:1, userSelect:'none' },
  headerLine: { position:'absolute', bottom:0, left:0, right:0, height:1, background:'linear-gradient(90deg,transparent,var(--accent) 40%,transparent)' },
  breadcrumb: { position:'relative', zIndex:2, fontFamily:'var(--font-ui)', fontSize:'1.1rem', letterSpacing:'0.15em', textTransform:'uppercase', color:'var(--muted)', marginBottom:'1.5rem' },
  pageTitle: { position:'relative', zIndex:2, fontFamily:'var(--font-display)', fontWeight:900, fontSize:'clamp(4.5rem,12vw,10rem)', lineHeight:.92, letterSpacing:'-.02em' },

  filterWrap: { padding:'2.5rem 3rem', borderBottom:'1px solid var(--border)', position:'sticky', top:0, zIndex:100, background:'rgba(4,8,15,0.92)', backdropFilter:'blur(12px)' },
  filterRow: { display:'flex', gap:'0.8rem', flexWrap:'wrap', alignItems:'center' },
  filterBtn: { padding:'0.55rem 1.4rem', border:'1px solid', borderRadius:2, fontFamily:'var(--font-ui)', fontSize:'1.1rem', letterSpacing:'0.1em', textTransform:'uppercase', cursor:'none', transition:'all 0.2s', whiteSpace:'nowrap' },

  gridWrap: { padding:'4rem 3rem', background:'var(--ink)' },
  grid: { display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'2px' },

  card: { display:'flex', flexDirection:'column', background:'var(--ink)' },
  thumb: { width:'100%', aspectRatio:'16/9', position:'relative', overflow:'hidden' },
  cardNum: { position:'absolute', top:'1rem', right:'1rem', fontFamily:'var(--font-display)', fontWeight:900, fontSize:'3rem', color:'rgba(232,237,245,.06)', lineHeight:1, userSelect:'none' },

  overlayTag: { fontFamily:'var(--font-ui)', fontSize:'1.05rem', letterSpacing:'0.18em', textTransform:'uppercase', color:'var(--accent)', marginBottom:'0.5rem' },
  overlayTitle: { fontFamily:'var(--font-display)', fontWeight:900, fontSize:'1.8rem', color:'#fff', lineHeight:1.05 },
  overlayYear: { fontFamily:'var(--font-ui)', fontSize:'1.05rem', color:'rgba(255,255,255,.4)', letterSpacing:'0.15em', marginTop:'0.5rem' },
  overlayCta: { marginTop:'1rem', display:'inline-flex', alignItems:'center', fontFamily:'var(--font-ui)', fontSize:'1.05rem', letterSpacing:'0.15em', textTransform:'uppercase', color:'var(--paper)' },

  caption: { padding:'1.4rem 1.6rem', borderTop:'1px solid var(--border)', display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:'1rem', flex:1 },
  captionTag: { fontFamily:'var(--font-ui)', fontSize:'1rem', letterSpacing:'0.15em', textTransform:'uppercase', color:'var(--accent)', marginBottom:'0.4rem' },
  captionTitle: { fontFamily:'var(--font-display)', fontWeight:800, fontSize:'1.2rem', color:'var(--paper)', marginBottom:'0.5rem' },
  captionDesc: { fontFamily:'var(--font-body)', fontSize:'0.85rem', lineHeight:1.7, color:'var(--muted)' },
  captionLink: { fontFamily:'var(--font-display)', fontWeight:900, fontSize:'1.5rem', transition:'color 0.2s', flexShrink:0, paddingTop:'0.2rem' },

  cta: { padding:'7rem 3rem', textAlign:'center', background:'var(--ink)', borderTop:'1px solid var(--border)' },
  ctaTitle: { fontFamily:'var(--font-display)', fontWeight:900, fontSize:'clamp(3rem,8vw,7rem)', lineHeight:.9, marginBottom:'2.5rem' },
}
