import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'

function useReveal() {
  const ref = useRef(null)
  useEffect(() => {
    if (!ref.current) return
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          setTimeout(() => e.target.classList.add('visible'), i * 90)
          obs.unobserve(e.target)
        }
      })
    }, { threshold: 0.1 })
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

const MARQUEE_ITEMS = [
  'Title Sequences','Brand Identity','Visual Effects','Broadcast Design',
  '3D Animation','Richard Amune','UI / UX Motion','After Effects',
  'Title Sequences','Brand Identity','Visual Effects','Broadcast Design',
  '3D Animation','Richard Amune','UI / UX Motion','After Effects',
]

const PROJECTS = [
  { id:1, cat:'branding', tag:'Motion Design · Brand Video', title:'Rideflow',         year:'2026', grad:'linear-gradient(160deg,#04080f 0%,#0d1526 50%,#2C4BFD 100%)', imageUrl:'/frost-production-studio/images/rideflow-thumbnail.png', link:'/project-rideflow', caption:'Rideflow',        captionTag:'Motion Design · 2026', num:'01', featured:true },
  { id:2, cat:'branding', tag:'Brand Identity',              title:'NOVA\nCOLLECTIVE', year:'2024', grad:'linear-gradient(135deg,#04080f 0%,#0d1a3a 40%,#1e6fff 100%)',                                                                   link:'/project-nova' },
  { id:3, cat:'broadcast',tag:'Broadcast',                   title:'DEEP CURRENT\nSERIES', year:'2024', grad:'linear-gradient(135deg,#060c18 0%,#0a1830 60%,#4a90d9 100%)' },
  { id:4, cat:'3d',       tag:'3D Animation',                title:'AURUM\nFRAGRANCE', year:'2023', grad:'linear-gradient(135deg,#06101a 0%,#0c2040 60%,#7aa8e8 100%)' },
  { id:5, cat:'ui',       tag:'UI Motion',                   title:'PULSE\nAPP',       year:'2023', grad:'linear-gradient(135deg,#0a0614 0%,#180a30 60%,#6644cc 100%)' },
]

const FILTERS = ['all','branding','broadcast','3d','ui']

export default function Home() {
  const page     = useReveal()
  const isMobile = useIsMobile()
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [cat,   setCat]   = useState('all')
  const [modal, setModal] = useState(false)

  const visible = (c) => cat === 'all' || c === cat

  const px = isMobile ? '1.5rem' : '3rem'

  return (
    <div ref={page}>

      {/* ── HERO ─────────────────────────────────────────── */}
      <section style={{
        minHeight: '100vh',
        display: 'flex', flexDirection: 'column', justifyContent: 'flex-start',
        padding: isMobile ? `5.5rem ${px} 3rem` : `6rem ${px} 3rem`,
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse 70% 60% at 65% 35%,rgba(30,111,255,.08),transparent 65%),linear-gradient(160deg,#04080f 0%,#060c18 60%,#04080f 100%)' }}/>
        <div style={{ position:'absolute', inset:0, backgroundImage:'linear-gradient(rgba(30,111,255,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(30,111,255,.03) 1px,transparent 1px)', backgroundSize:'80px 80px' }}/>
        <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', fontFamily:'var(--font-display)', fontWeight:900, fontSize:'clamp(6rem,22vw,22rem)', color:'transparent', WebkitTextStroke:'1px rgba(30,111,255,.035)', whiteSpace:'nowrap', userSelect:'none', pointerEvents:'none' }}>RICHARD</div>



        {/* Main content — always single column */}
        <div style={{ position:'relative', zIndex:2, display:'flex', flexDirection:'column' }}>
          <p style={{ fontFamily:'var(--font-ui)', fontSize: isMobile ? '0.8rem' : '0.85rem', letterSpacing:'.2em', textTransform:'uppercase', color:'var(--accent)', marginBottom:'1.2rem', animation:'fadeUp .8s .2s forwards', opacity:0 }}>
            Motion Designer &amp; Visual Storyteller
          </p>
          <h1 style={{ fontFamily:'var(--font-display)', fontWeight:900, fontSize: isMobile ? 'clamp(3.5rem,16vw,6rem)' : 'clamp(4rem,13vw,12rem)', lineHeight:.92, letterSpacing:'-.02em', animation:'fadeUp .9s .4s forwards', opacity:0 }}>
            RICHARD<br/>
            <em style={{ fontFamily:'var(--font-body)', fontStyle:'italic', color:'var(--accent)', fontWeight:300 }}>Amune</em>
          </h1>
          <p style={{ marginTop:'1.5rem', maxWidth:'40ch', fontFamily:'var(--font-body)', fontSize: isMobile ? '0.95rem' : '1.05rem', lineHeight:1.8, color:'var(--ice)', animation:'fadeUp .9s .65s forwards', opacity:0 }}>
            Richard Amune — crafting kinetic narratives that move brands forward. From concept to final frame, every pixel in motion.
          </p>
          <div style={{ display:'flex', gap:'1rem', marginTop:'2rem', flexWrap:'wrap', animation:'fadeUp .9s .8s forwards', opacity:0 }}>
            <a href="#showreel" className="btn-primary">
              Watch Showreel
              <svg width="15" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
            </a>
            <Link to="/projects" className="btn-outline">
              View Projects
              <svg width="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
          </div>
        </div>

        {/* Bottom row — stacks on mobile */}
        <div style={{ position:'relative', zIndex:2, display:'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent:'space-between', alignItems: isMobile ? 'flex-start' : 'flex-end', marginTop: isMobile ? '2rem' : '3rem', gap:'1.5rem', animation:'fadeUp .8s 1s forwards', opacity:0 }}>
          <div style={{ display:'flex', alignItems:'center', gap:'1.2rem' }}>
            <div style={{ width:60, height:1, background:'var(--muted)', position:'relative', overflow:'hidden' }}>
              <div style={{ position:'absolute', left:'-100%', top:0, width:'100%', height:'100%', background:'var(--accent)', animation:'slide 2.2s 1.2s infinite' }}/>
            </div>
            <span style={{ fontFamily:'var(--font-ui)', fontSize:'0.78rem', letterSpacing:'.22em', textTransform:'uppercase', color:'var(--muted)' }}>Scroll to explore</span>
          </div>
          <div style={{ display:'flex', gap: isMobile ? '1.5rem' : '3rem', flexWrap:'wrap' }}>
            {[['8+','Years'],['400+','Projects'],['80+','Clients']].map(([n,l]) => (
              <div key={l}>
                <div style={{ fontFamily:'var(--font-display)', fontWeight:900, fontSize: isMobile ? '2rem' : '2.8rem', lineHeight:1 }}>{n}</div>
                <div style={{ fontFamily:'var(--font-ui)', fontSize:'0.78rem', letterSpacing:'.2em', textTransform:'uppercase', color:'var(--muted)', marginTop:'.3rem' }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MARQUEE ──────────────────────────────────────── */}
      <div style={{ background:'var(--accent)', overflow:'hidden', padding:'1.1rem 0', whiteSpace:'nowrap' }}>
        <div style={{ display:'inline-flex', animation:'marqueScroll 20s linear infinite' }}>
          {MARQUEE_ITEMS.map((item, i) => (
            <span key={i} style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:'1.1rem', letterSpacing:'.12em', color:'#fff', padding:'0 2.5rem', display:'inline-flex', alignItems:'center', gap:'2.5rem' }}>
              {item}<span style={{ width:5, height:5, borderRadius:'50%', background:'rgba(255,255,255,.35)', display:'inline-block', flexShrink:0 }}/>
            </span>
          ))}
        </div>
      </div>

      {/* ── SHOWREEL ─────────────────────────────────────── */}
      <section id="showreel" style={{ padding: isMobile ? `4rem ${px}` : `8rem ${px}`, background:'var(--ink)' }}>
        <p className="reveal" style={{ fontFamily:'var(--font-ui)', fontSize:'0.85rem', letterSpacing:'.25em', textTransform:'uppercase', color:'var(--accent)', marginBottom:'1rem', display:'flex', alignItems:'center', gap:'1rem' }}>
          <span style={{ display:'block', width:32, height:1, background:'var(--accent)' }}/>Featured
        </p>
        <h2 className="reveal" style={{ fontFamily:'var(--font-display)', fontWeight:900, fontSize: isMobile ? 'clamp(3rem,12vw,5rem)' : 'clamp(3.5rem,8vw,7rem)', lineHeight:.95, letterSpacing:'-.01em', marginBottom: isMobile ? '2rem' : '4rem' }}>
          Show<br/>Reel
        </h2>

        <div className="reveal" style={{ position:'relative', borderRadius:4, overflow:'hidden', aspectRatio:'16/9', cursor:'pointer', border:'1px solid var(--border)' }} onClick={() => setModal(true)}>
          <div style={{ width:'100%', height:'100%', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:'2rem', background:'linear-gradient(135deg,#060c18 0%,#091428 50%,#060c18 100%)', position:'relative', overflow:'hidden' }}>
            <div style={{ position:'absolute', inset:0, backgroundImage:'linear-gradient(rgba(30,111,255,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(30,111,255,.04) 1px,transparent 1px)', backgroundSize:'60px 60px' }}/>
            <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', width:400, height:400, background:'radial-gradient(circle,rgba(30,111,255,.07),transparent 70%)' }}/>
            {[['tl','2025 — SHOWREEL'],['tr','04:32'],['bl','RICHARD AMUNE'],['br','MOTION DESIGN']].map(([pos,txt]) => (
              <span key={pos} style={{ position:'absolute', fontFamily:'var(--font-display)', fontWeight:700, fontSize: isMobile ? '0.65rem' : '0.85rem', letterSpacing:'.15em', color:'rgba(232,237,245,.08)', ...(pos==='tl'?{top:'1.5rem',left:'1.5rem'}:pos==='tr'?{top:'1.5rem',right:'1.5rem'}:pos==='bl'?{bottom:'1.5rem',left:'1.5rem'}:{bottom:'1.5rem',right:'1.5rem'}) }}>{txt}</span>
            ))}
            <div style={{ width: isMobile ? 64 : 80, height: isMobile ? 64 : 80, borderRadius:'50%', border:'1.5px solid rgba(232,237,245,.35)', display:'flex', alignItems:'center', justifyContent:'center', position:'relative', zIndex:2 }}>
              <svg width={isMobile ? 22 : 28} viewBox="0 0 24 24" fill="var(--paper)" style={{ marginLeft:4 }}><path d="M8 5v14l11-7z"/></svg>
            </div>
            <span style={{ position:'relative', zIndex:2, fontFamily:'var(--font-ui)', fontSize: isMobile ? '0.7rem' : '0.78rem', letterSpacing:'.3em', textTransform:'uppercase', color:'var(--muted)' }}>Play Showreel</span>
          </div>
        </div>

        {/* Reel info — 1 col on mobile, 3 col on desktop */}
        <div className="reveal" style={{ display:'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3,1fr)', borderTop:'1px solid var(--border)', marginTop:2 }}>
          {[['Duration','4 minutes 32 seconds'],['Featured Work','Brand Identity · Broadcast · 3D · UI Motion'],['Tools','After Effects · Cinema 4D · DaVinci']].map(([k,v], i) => (
            <div key={k} style={{ padding: isMobile ? '1.1rem 0' : '1.4rem 2rem', borderRight: isMobile ? 'none' : i < 2 ? '1px solid var(--border)' : 'none', borderBottom: isMobile && i < 2 ? '1px solid var(--border)' : 'none' }}>
              <div style={{ fontFamily:'var(--font-ui)', fontSize:'0.78rem', letterSpacing:'.18em', textTransform:'uppercase', color:'var(--muted)', marginBottom:'.5rem' }}>{k}</div>
              <div style={{ fontFamily:'var(--font-body)', fontSize:'0.95rem' }}>{v}</div>
            </div>
          ))}
        </div>

        {modal && (
          <div style={{ position:'fixed', inset:0, zIndex:800, background:'rgba(0,0,0,.94)', display:'flex', alignItems:'center', justifyContent:'center', backdropFilter:'blur(6px)' }} onClick={() => setModal(false)}>
            <div style={{ position:'relative', width:'min(90vw,960px)' }} onClick={e => e.stopPropagation()}>
              <button style={{ position:'absolute', top:'-3rem', right:0, background:'none', border:'none', color:'var(--paper)', cursor:'pointer', fontFamily:'var(--font-ui)', fontSize:'0.82rem', letterSpacing:'.15em', textTransform:'uppercase', display:'flex', alignItems:'center', gap:'.6rem', opacity:.7 }} onClick={() => setModal(false)}>
                <span style={{ width:24, height:24, border:'1px solid currentColor', borderRadius:'50%', display:'inline-flex', alignItems:'center', justifyContent:'center', fontSize:'1rem' }}>×</span> Close
              </button>
              <div style={{ width:'100%', aspectRatio:'16/9', background:'#000', borderRadius:4, overflow:'hidden' }}>
                <iframe src="https://player.vimeo.com/video/YOUR_VIDEO_ID?autoplay=1" allow="autoplay; fullscreen" allowFullScreen style={{ width:'100%', height:'100%', border:'none', borderRadius:4 }}/>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* ── PROJECTS ─────────────────────────────────────── */}
      <section style={{ padding: isMobile ? `4rem ${px}` : `8rem ${px}`, background:'var(--paper)', color:'var(--ink)' }}>
        <p className="reveal" style={{ fontFamily:'var(--font-ui)', fontSize:'0.85rem', letterSpacing:'.25em', textTransform:'uppercase', color:'var(--accent)', marginBottom:'1rem', display:'flex', alignItems:'center', gap:'1rem' }}>
          <span style={{ display:'block', width:32, height:1, background:'var(--accent)' }}/>Selected Work
        </p>
        <h2 className="reveal" style={{ fontFamily:'var(--font-display)', fontWeight:900, fontSize: isMobile ? 'clamp(3rem,12vw,5rem)' : 'clamp(3.5rem,8vw,7rem)', lineHeight:.95, letterSpacing:'-.01em', marginBottom: isMobile ? '2rem' : '4rem', color:'var(--ink)' }}>
          Featured<br/>Projects
        </h2>

        {/* Filter buttons */}
        <div className="reveal" style={{ display:'flex', gap:'.6rem', flexWrap:'wrap', marginBottom: isMobile ? '2rem' : '3.5rem' }}>
          {FILTERS.map(f => (
            <button key={f} onClick={() => setCat(f)} style={{ padding: isMobile ? '.45rem 1rem' : '.55rem 1.3rem', border:'1px solid', borderRadius:2, fontFamily:'var(--font-ui)', fontSize: isMobile ? '0.78rem' : '0.85rem', letterSpacing:'.1em', textTransform:'uppercase', cursor:'pointer', transition:'all .2s', background: cat===f ? 'var(--ink)' : 'none', color: cat===f ? 'var(--paper)' : 'var(--muted)', borderColor: cat===f ? 'var(--ink)' : 'rgba(10,15,30,.15)' }}>
              {f==='all'?'All':f==='3d'?'3D':f==='ui'?'UI Motion':f.charAt(0).toUpperCase()+f.slice(1)}
            </button>
          ))}
        </div>

        {/* Project cards:
             MOBILE  → single column, top to bottom
             DESKTOP → 12-col asymmetric grid (Rideflow spans 8, others span 4) */}
        {isMobile ? (
          /* ── MOBILE: stacked single column ── */
          <div className="reveal" style={{ display:'flex', flexDirection:'column', gap:'2.5rem' }}>
            {PROJECTS.map((p) => (
              <div key={p.id} className="proj-card" style={{ opacity: visible(p.cat)?1:0.1, transition:'opacity .35s', pointerEvents: visible(p.cat)?'auto':'none' }}>
                {/* Entire thumbnail is clickable */}
                {p.link ? (
                  <Link to={p.link} style={{ display:'block', width:'100%', aspectRatio:'16/9', background:p.grad, position:'relative', overflow:'hidden', outline:'none', textDecoration:'none', border:'none', boxShadow:'none', WebkitTapHighlightColor:'transparent' }}>
                    {p.imageUrl && <img src={p.imageUrl} alt={p.caption||p.title} style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }}/>}
                    <div className="proj-overlay">
                      <span style={{ fontFamily:'var(--font-ui)', fontSize:'0.8rem', letterSpacing:'.18em', textTransform:'uppercase', color:'var(--accent)', marginBottom:'.5rem' }}>{p.tag}</span>
                      <div style={{ fontFamily:'var(--font-display)', fontWeight:900, fontSize:'1.5rem', color:'#fff', lineHeight:1.05 }}>
                        {p.title.split('\n').map((line,j)=><span key={j}>{line}<br/></span>)}
                      </div>
                      <span style={{ fontFamily:'var(--font-ui)', marginTop:'.5rem', fontSize:'0.78rem', color:'rgba(255,255,255,.4)', letterSpacing:'.15em' }}>{p.year}</span>
                      <span className="case-study-btn" style={{ fontFamily:'var(--font-ui)', marginTop:'1rem', display:'inline-flex', fontSize:'0.78rem', letterSpacing:'.15em', textTransform:'uppercase', color: isDark ? '#ffffff' : '#0d1120', background: isDark ? 'var(--accent)' : '#ffffff', padding:'.35rem .9rem' }}>View Case Study →</span>
                    </div>
                  </Link>
                ) : (
                  <div style={{ width:'100%', aspectRatio:'16/9', background:p.grad, position:'relative', overflow:'hidden' }}>
                    {p.imageUrl && <img src={p.imageUrl} alt={p.caption||p.title} style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }}/>}
                    <div className="proj-overlay">
                      <span style={{ fontFamily:'var(--font-ui)', fontSize:'0.8rem', letterSpacing:'.18em', textTransform:'uppercase', color:'var(--accent)', marginBottom:'.5rem' }}>{p.tag}</span>
                      <div style={{ fontFamily:'var(--font-display)', fontWeight:900, fontSize:'1.5rem', color:'#fff', lineHeight:1.05 }}>
                        {p.title.split('\n').map((line,j)=><span key={j}>{line}<br/></span>)}
                      </div>
                      <span style={{ fontFamily:'var(--font-ui)', marginTop:'.5rem', fontSize:'0.78rem', color:'rgba(255,255,255,.4)', letterSpacing:'.15em' }}>{p.year}</span>
                    </div>
                  </div>
                )}
                <div style={{ padding:'0.9rem 0', borderTop:'1px solid rgba(10,15,30,.08)', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                  <div>
                    <div style={{ fontFamily:'var(--font-ui)', fontSize:'0.72rem', letterSpacing:'.15em', textTransform:'uppercase', color:'var(--accent)' }}>{p.captionTag||(`${p.tag} · ${p.year}`)}</div>
                    <div style={{ fontFamily:'var(--font-body)', fontSize:'0.95rem', color:'var(--ink)', marginTop:'.15rem' }}>{p.caption||p.title}</div>
                  </div>
                  <div style={{ fontFamily:'var(--font-display)', fontWeight:900, fontSize:'2rem', color:'rgba(10,15,30,.06)' }}>{p.num}</div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* ── DESKTOP: 12-column asymmetric grid ── */
          <div className="reveal" style={{ display:'grid', gridTemplateColumns:'repeat(12,1fr)', gap:2 }}>
            {PROJECTS.map((p, i) => {
              // Col spans: Rideflow=8 spanning 2 rows, others=4
              const colSpan = p.featured ? 'span 8' : 'span 4'
              const rowSpan = p.featured ? 'span 2' : 'span 1'
              return (
                <div key={p.id} className="proj-card" style={{ gridColumn:colSpan, gridRow:rowSpan, opacity:visible(p.cat)?1:0.1, transition:'opacity .35s', pointerEvents:visible(p.cat)?'auto':'none' }}>
                  {/* Entire thumbnail clickable */}
                  {p.link ? (
                    <Link to={p.link} style={{ display:'block', width:'100%', height: p.featured ? '100%' : 'auto', minHeight: p.featured ? 480 : 'unset', aspectRatio: p.featured ? 'unset' : '4/3', background:p.grad, position:'relative', overflow:'hidden', outline:'none', textDecoration:'none', border:'none', boxShadow:'none', WebkitTapHighlightColor:'transparent' }}>
                      {p.imageUrl && <img src={p.imageUrl} alt={p.caption||p.title} style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }}/>}
                      <div className="proj-overlay">
                        <span style={{ fontFamily:'var(--font-ui)', fontSize:'0.82rem', letterSpacing:'.18em', textTransform:'uppercase', color:'var(--accent)', marginBottom:'.5rem' }}>{p.tag}</span>
                        <div style={{ fontFamily:'var(--font-display)', fontWeight:900, fontSize:'1.8rem', color:'#fff', lineHeight:1.05 }}>
                          {p.title.split('\n').map((line,j)=><span key={j}>{line}<br/></span>)}
                        </div>
                        <span style={{ fontFamily:'var(--font-ui)', marginTop:'.6rem', fontSize:'0.82rem', color:'rgba(255,255,255,.4)', letterSpacing:'.15em' }}>{p.year}</span>
                        <span className="case-study-btn" style={{ fontFamily:'var(--font-ui)', marginTop:'1rem', display:'inline-flex', fontSize:'0.82rem', letterSpacing:'.15em', textTransform:'uppercase', color: isDark ? '#ffffff' : '#0d1120', background: isDark ? 'var(--accent)' : '#ffffff', padding:'.35rem .9rem' }}>View Case Study →</span>
                      </div>
                    </Link>
                  ) : (
                    <div style={{ width:'100%', height: p.featured ? '100%' : 'auto', minHeight: p.featured ? 480 : 'unset', aspectRatio: p.featured ? 'unset' : '4/3', background:p.grad, position:'relative', overflow:'hidden' }}>
                      {p.imageUrl && <img src={p.imageUrl} alt={p.caption||p.title} style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }}/>}
                      <div className="proj-overlay">
                        <span style={{ fontFamily:'var(--font-ui)', fontSize:'0.82rem', letterSpacing:'.18em', textTransform:'uppercase', color:'var(--accent)', marginBottom:'.5rem' }}>{p.tag}</span>
                        <div style={{ fontFamily:'var(--font-display)', fontWeight:900, fontSize:'1.8rem', color:'#fff', lineHeight:1.05 }}>
                          {p.title.split('\n').map((line,j)=><span key={j}>{line}<br/></span>)}
                        </div>
                        <span style={{ fontFamily:'var(--font-ui)', marginTop:'.6rem', fontSize:'0.82rem', color:'rgba(255,255,255,.4)', letterSpacing:'.15em' }}>{p.year}</span>
                      </div>
                    </div>
                  )}
                  {p.featured && (
                    <div style={{ padding:'1rem 1.4rem', background:'var(--ink)', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                      <div>
                        <div style={{ fontFamily:'var(--font-ui)', fontSize:'0.72rem', letterSpacing:'.15em', textTransform:'uppercase', color:'var(--accent)' }}>{p.captionTag}</div>
                        <div style={{ fontFamily:'var(--font-body)', fontSize:'1.05rem', color:'var(--paper)', marginTop:'.15rem' }}>{p.caption}</div>
                      </div>
                      <div style={{ fontFamily:'var(--font-display)', fontWeight:900, fontSize:'2.4rem', color:'rgba(232,237,245,.05)' }}>{p.num}</div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}

        <div className="reveal" style={{ display:'flex', justifyContent:'center', marginTop: isMobile ? '2rem' : '3rem' }}>
          <Link to="/projects" style={{ padding:'.9rem 2.2rem', border:'1px solid rgba(10,15,30,.18)', display:'inline-flex', alignItems:'center', gap:'.6rem', fontFamily:'var(--font-ui)', fontSize:'0.85rem', letterSpacing:'.1em', textTransform:'uppercase', color:'var(--ink)', background:'none' }}>
            View All Projects →
          </Link>
        </div>
      </section>

      {/* ── ABOUT STRIP ──────────────────────────────────── */}
      <div style={{ background:'var(--accent)', color:'#fff', padding: isMobile ? `3rem ${px}` : `5rem ${px}`, display:'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? '2rem' : '4rem', alignItems:'center' }}>
        <div className="reveal">
          <p style={{ fontFamily:'var(--font-body)', fontStyle:'italic', fontSize: isMobile ? 'clamp(1.4rem,5vw,1.8rem)' : 'clamp(1.8rem,3.5vw,2.8rem)', lineHeight:1.3 }}>
            "Motion is the language that turns brand stories into felt experiences."
          </p>
        </div>
        <div className="reveal d1">
          <p style={{ fontFamily:'var(--font-body)', fontSize: isMobile ? '0.95rem' : '1rem', lineHeight:1.9, color:'rgba(255,255,255,.82)' }}>
            Based in Lagos and available worldwide, Richard crafts motion identities for brands that refuse to stand still. Every project begins with one question: what does this need to feel like?
          </p>
          <div style={{ marginTop:'1.8rem', display:'flex', flexWrap:'wrap', gap:'.5rem' }}>
            {['After Effects','Cinema 4D','DaVinci Resolve','Houdini','Figma','Blender'].map(t => (
              <span key={t} style={{ padding:'.3rem .9rem', border:'1px solid rgba(255,255,255,.25)', fontFamily:'var(--font-ui)', fontSize:'0.78rem', letterSpacing:'.12em', textTransform:'uppercase', borderRadius:2 }}>{t}</span>
            ))}
          </div>
          <div style={{ marginTop:'2rem' }}>
            <Link to="/about" className="btn-outline" style={{ borderColor:'rgba(255,255,255,.3)', color:'#fff' }}>Learn More →</Link>
          </div>
        </div>
      </div>

      {/* ── CONTACT CTA ──────────────────────────────────── */}
      <section style={{ padding: isMobile ? `4rem ${px}` : `8rem ${px}`, background:'var(--ink)', textAlign:'center' }}>
        <p className="reveal" style={{ fontFamily:'var(--font-ui)', fontSize:'0.85rem', letterSpacing:'.2em', textTransform:'uppercase', color:'var(--muted)', marginBottom:'2rem' }}>
          Let's make something extraordinary
        </p>
        <h2 className="reveal" style={{ fontFamily:'var(--font-display)', fontWeight:900, fontSize: isMobile ? 'clamp(3rem,12vw,6rem)' : 'clamp(4rem,11vw,10rem)', lineHeight:.9, letterSpacing:'-.02em', marginBottom:'2.5rem' }}>
          Let's<br/><span style={{ color:'var(--accent)' }}>Work</span>
        </h2>
        <Link to="/contact" className="btn-primary reveal" style={{ display:'inline-flex' }}>Get In Touch →</Link>
      </section>

    </div>
  )
}
