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

function useIsMobile() {
  const [m, setM] = useState(window.innerWidth <= 768)
  useEffect(() => {
    const fn = () => setM(window.innerWidth <= 768)
    window.addEventListener('resize', fn)
    return () => window.removeEventListener('resize', fn)
  }, [])
  return m
}

const ALL_PROJECTS = [
  { id:0, cat:'branding',  num:'01', tag:'Motion Design · Brand Video', title:'Rideflow',           year:'2026', desc:'A complete motion content package — brand film, dashboard walkthrough, and social content for a Lagos-based logistics SaaS platform.', grad:'linear-gradient(160deg,#04080f 0%,#0d1526 50%,#2C4BFD 100%)', imageUrl:'/images/rideflow-thumbnail.png', link:'/project-rideflow', visible:true },
  { id:1, cat:'branding',  num:'02', tag:'Brand Identity',              title:'Nova Collective',    year:'2024', desc:'A complete motion identity system for a Berlin-based creative studio — from logo sting to 90-second brand film.',                        grad:'linear-gradient(135deg,#04080f 0%,#0d1a3a 40%,#1e6fff 100%)',                                                                          link:'/project-nova',     visible:true },
  { id:2, cat:'broadcast', num:'03', tag:'Broadcast',                   title:'Deep Current Series',year:'2024', desc:'Title sequence and full broadcast package for an award-winning documentary series on climate and oceans.',                             grad:'linear-gradient(135deg,#060c18 0%,#0a1830 60%,#4a90d9 100%)',                                                                          link:'',                  visible:true },
  { id:3, cat:'3d',        num:'04', tag:'3D Animation',                title:'Aurum Fragrance',    year:'2023', desc:'Photorealistic 3D product animation for a luxury fragrance launch campaign across digital and OOH.',                                  grad:'linear-gradient(135deg,#06101a 0%,#0c2040 60%,#7aa8e8 100%)',                                                                          link:'',                  visible:true },
  { id:4, cat:'ui',        num:'05', tag:'UI Motion',                   title:'Pulse App',          year:'2023', desc:'Motion design system for a health-tech startup — micro-interactions, onboarding flows and Lottie animations.',                         grad:'linear-gradient(135deg,#0a0614 0%,#180a30 60%,#6644cc 100%)',                                                                          link:'',                  visible:true },
  { id:5, cat:'branding',  num:'06', tag:'Branding',                    title:'Verdant Studios',    year:'2023', desc:'Brand motion for an independent film production house — identity animations and festival title cards.',                                grad:'linear-gradient(135deg,#040c18 0%,#081828 60%,#0044cc 100%)',                                                                          link:'',                  visible:true },
  { id:6, cat:'3d',        num:'07', tag:'3D · Broadcast',              title:'Orbit Network',      year:'2022', desc:'Full broadcast rebrand including idents, stings and transition package for a pan-African news network.',                              grad:'linear-gradient(135deg,#060814 0%,#0c1430 60%,#2244aa 100%)',                                                                          link:'',                  visible:true },
  { id:7, cat:'ui',        num:'08', tag:'UI Motion',                   title:'Solara Dashboard',   year:'2022', desc:'Data visualisation animations and dashboard motion design for a renewable energy monitoring platform.',                               grad:'linear-gradient(135deg,#080610 0%,#140c28 60%,#4422aa 100%)',                                                                          link:'',                  visible:true },
  { id:8, cat:'branding',  num:'09', tag:'Brand Identity',              title:'Kano Creative',      year:'2021', desc:'Full motion identity for a creative agency based in Kano — from concept through to brand film.',                                      grad:'linear-gradient(135deg,#04080f 0%,#0d1a3a 60%,#1e4fcc 100%)',                                                                          link:'',                  visible:true },
]

const FILTERS = [
  { key:'all',       label:'All Work'  },
  { key:'branding',  label:'Branding'  },
  { key:'broadcast', label:'Broadcast' },
  { key:'3d',        label:'3D'        },
  { key:'ui',        label:'UI Motion' },
]

export default function Projects() {
  const page     = useReveal()
  const isMobile = useIsMobile()
  const [cat,     setCat]     = useState('all')
  const [hovered, setHovered] = useState(null)

  const visible = (c) => cat === 'all' || c === cat
  const px = isMobile ? '1.5rem' : '3rem'
  const filtered = ALL_PROJECTS.filter(p => visible(p.cat))

  return (
    <div ref={page}>

      {/* ── PAGE HEADER ───────────────────────────────── */}
      <div style={{
        minHeight: 'auto',
        display: 'flex', flexDirection: 'column', justifyContent: 'flex-start',
        padding: isMobile ? `5.5rem ${px} 2.5rem` : `6rem ${px} 3rem`,
        position: 'relative', overflow: 'hidden',
        borderBottom: '1px solid var(--border)',
      }}>
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse 60% 70% at 70% 30%,rgba(30,111,255,.08),transparent 65%),linear-gradient(160deg,#04080f 0%,#060c18 60%,#04080f 100%)' }}/>
        <div style={{ position:'absolute', inset:0, backgroundImage:'linear-gradient(rgba(30,111,255,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(30,111,255,.03) 1px,transparent 1px)', backgroundSize:'80px 80px' }}/>
        {!isMobile && (
          <div style={{ position:'absolute', top:'5rem', right:'3rem', fontFamily:'var(--font-display)', fontWeight:900, fontSize:'clamp(8rem,18vw,16rem)', color:'transparent', WebkitTextStroke:'1px rgba(30,111,255,.04)', lineHeight:1, userSelect:'none' }}>03</div>
        )}
        <div style={{ position:'absolute', bottom:0, left:0, right:0, height:1, background:'linear-gradient(90deg,transparent,var(--accent) 40%,transparent)' }}/>

        <p style={{ position:'relative', zIndex:2, fontFamily:'var(--font-ui)', fontSize: isMobile ? '0.75rem' : '0.85rem', letterSpacing:'.15em', textTransform:'uppercase', color:'var(--muted)', marginBottom:'1.2rem', animation:'fadeUp .6s .2s forwards', opacity:0 }}>
          <Link to="/" style={{ color:'var(--muted)', textDecoration:'none' }}>Home</Link>
          <span style={{ color:'var(--accent)', margin:'0 .5rem' }}>→</span>
          Projects
        </p>
        <h1 style={{ position:'relative', zIndex:2, fontFamily:'var(--font-display)', fontWeight:900, fontSize: isMobile ? 'clamp(3.5rem,14vw,6rem)' : 'clamp(4.5rem,12vw,10rem)', lineHeight:.92, letterSpacing:'-.02em', animation:'fadeUp .8s .35s forwards', opacity:0 }}>
          All<br/>
          <em style={{ fontFamily:'var(--font-body)', fontStyle:'italic', color:'var(--accent)', fontWeight:300 }}>Projects</em>
        </h1>
      </div>

      {/* ── FILTER BAR — sticky ───────────────────────── */}
      <div style={{
        padding: isMobile ? `1.2rem ${px}` : `1.8rem ${px}`,
        borderBottom: '1px solid var(--border)',
        position: 'sticky', top: 0, zIndex: 100,
        background: 'rgba(4,8,15,0.94)', backdropFilter: 'blur(14px)',
      }}>
        <div style={{ display:'flex', gap:'.6rem', flexWrap:'wrap', alignItems:'center' }}>
          {FILTERS.map(f => (
            <button
              key={f.key}
              onClick={() => setCat(f.key)}
              style={{
                padding: isMobile ? '.4rem .9rem' : '.55rem 1.4rem',
                border: '1px solid',
                borderRadius: 2,
                fontFamily: 'var(--font-ui)',
                fontSize: isMobile ? '0.75rem' : '0.88rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                transition: 'all 0.2s',
                whiteSpace: 'nowrap',
                background:   cat === f.key ? 'var(--accent)' : 'none',
                color:        cat === f.key ? '#fff'          : 'var(--muted)',
                borderColor:  cat === f.key ? 'var(--accent)' : 'rgba(232,237,245,.12)',
              }}
            >
              {f.label}
            </button>
          ))}
          <span style={{ fontFamily:'var(--font-ui)', fontSize:'0.82rem', color:'var(--muted)', marginLeft:'auto' }}>
            {filtered.length} project{filtered.length !== 1 ? 's' : ''}
          </span>
        </div>
      </div>

      {/* ── PROJECT LIST — always single column on mobile ── */}
      <div style={{ padding: isMobile ? `2rem ${px}` : `3rem ${px}`, background:'var(--ink)' }}>
        <div style={{
          display: 'grid',
          // 1 col on mobile, 3 col on desktop
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(3,1fr)',
          gap: isMobile ? '2.5rem' : '2px',
        }}>
          {ALL_PROJECTS.map((p) => (
            <div
              key={p.id}
              className="proj-card reveal"
              style={{
                display: 'flex', flexDirection: 'column',
                background: 'var(--ink)',
                opacity:       visible(p.cat) ? 1    : 0.08,
                pointerEvents: visible(p.cat) ? 'auto': 'none',
                transition: 'opacity 0.35s',
              }}
              onMouseEnter={() => setHovered(p.id)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Thumbnail — whole image clickable if has link */}
              {p.link ? (
                <Link to={p.link} style={{ display:'block', width:'100%', aspectRatio:'16/9', background:p.grad, position:'relative', overflow:'hidden' }}>
                  {p.imageUrl && <img src={p.imageUrl} alt={p.title} style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', objectPosition:'center' }}/>}
                  <div className="proj-overlay">
                    <span style={{ fontFamily:'var(--font-ui)', fontSize:'0.78rem', letterSpacing:'.18em', textTransform:'uppercase', color:'var(--accent)', marginBottom:'.5rem' }}>{p.tag}</span>
                    <div style={{ fontFamily:'var(--font-display)', fontWeight:900, fontSize:'1.6rem', color:'#fff', lineHeight:1.05 }}>{p.title}</div>
                    <span style={{ fontFamily:'var(--font-ui)', fontSize:'0.78rem', color:'rgba(255,255,255,.4)', letterSpacing:'.15em', marginTop:'.5rem' }}>{p.year}</span>
                    <span style={{ marginTop:'1rem', display:'inline-flex', fontFamily:'var(--font-ui)', fontSize:'0.78rem', letterSpacing:'.15em', textTransform:'uppercase', color:'#fff', background:'var(--accent)', padding:'.32rem .85rem' }}>View Case Study →</span>
                  </div>
                  <div style={{ position:'absolute', top:'1rem', right:'1rem', fontFamily:'var(--font-display)', fontWeight:900, fontSize:'3rem', color:'rgba(232,237,245,.06)', lineHeight:1, userSelect:'none' }}>{p.num}</div>
                </Link>
              ) : (
                <div style={{ width:'100%', aspectRatio:'16/9', background:p.grad, position:'relative', overflow:'hidden' }}>
                  {p.imageUrl && <img src={p.imageUrl} alt={p.title} style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', objectPosition:'center' }}/>}
                  <div className="proj-overlay">
                    <span style={{ fontFamily:'var(--font-ui)', fontSize:'0.78rem', letterSpacing:'.18em', textTransform:'uppercase', color:'var(--accent)', marginBottom:'.5rem' }}>{p.tag}</span>
                    <div style={{ fontFamily:'var(--font-display)', fontWeight:900, fontSize:'1.6rem', color:'#fff', lineHeight:1.05 }}>{p.title}</div>
                    <span style={{ fontFamily:'var(--font-ui)', fontSize:'0.78rem', color:'rgba(255,255,255,.4)', letterSpacing:'.15em', marginTop:'.5rem' }}>{p.year}</span>
                    <span style={{ marginTop:'1rem', display:'inline-flex', fontFamily:'var(--font-ui)', fontSize:'0.78rem', letterSpacing:'.15em', textTransform:'uppercase', color:'var(--muted)' }}>Coming Soon</span>
                  </div>
                  <div style={{ position:'absolute', top:'1rem', right:'1rem', fontFamily:'var(--font-display)', fontWeight:900, fontSize:'3rem', color:'rgba(232,237,245,.06)', lineHeight:1, userSelect:'none' }}>{p.num}</div>
                </div>
              )}

              {/* Caption — always visible below thumbnail */}
              <div style={{
                padding: isMobile ? '1rem 0' : '1.2rem 1.4rem',
                borderTop: '1px solid var(--border)',
                display: 'flex', justifyContent: 'space-between',
                alignItems: 'flex-start', gap: '1rem', flex: 1,
              }}>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontFamily:'var(--font-ui)', fontSize:'0.75rem', letterSpacing:'.15em', textTransform:'uppercase', color:'var(--accent)', marginBottom:'.4rem' }}>
                    {p.tag} · {p.year}
                  </div>
                  <div style={{ fontFamily:'var(--font-display)', fontWeight:800, fontSize: isMobile ? '1.1rem' : '1.2rem', color:'var(--paper)', marginBottom:'.5rem' }}>
                    {p.title}
                  </div>
                  <div style={{ fontFamily:'var(--font-body)', fontSize: isMobile ? '0.88rem' : '0.92rem', lineHeight:1.7, color:'var(--muted)' }}>
                    {p.desc}
                  </div>
                </div>
                {p.link && (
                  <div style={{ fontFamily:'var(--font-display)', fontWeight:900, fontSize:'1.5rem', color: hovered===p.id ? 'var(--accent)' : 'var(--muted)', transition:'color 0.2s', flexShrink:0 }}>
                    <Link to={p.link} style={{ color:'inherit', textDecoration:'none' }}>→</Link>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── BOTTOM CTA ────────────────────────────────── */}
      <div style={{ padding: isMobile ? `4rem ${px}` : `7rem ${px}`, textAlign:'center', background:'var(--ink)', borderTop:'1px solid var(--border)' }}>
        <h2 className="reveal" style={{ fontFamily:'var(--font-display)', fontWeight:900, fontSize: isMobile ? 'clamp(2.5rem,10vw,4.5rem)' : 'clamp(3rem,8vw,7rem)', lineHeight:.9, marginBottom:'2.5rem' }}>
          Want to work<br/><span style={{ color:'var(--accent)' }}>together?</span>
        </h2>
        <div className="reveal" style={{ display:'flex', gap:'1rem', justifyContent:'center', flexWrap:'wrap' }}>
          <Link to="/contact" className="btn-primary">Start a Project →</Link>
          <Link to="/about"   className="btn-outline">About Richard →</Link>
        </div>
      </div>

    </div>
  )
}
