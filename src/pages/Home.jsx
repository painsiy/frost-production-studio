import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

/* ── helpers ── */
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

const MARQUEE_ITEMS = [
  'Title Sequences','Brand Identity','Visual Effects','Broadcast Design',
  '3D Animation','Frost Production Studio','UI / UX Motion','After Effects',
  'Title Sequences','Brand Identity','Visual Effects','Broadcast Design',
  '3D Animation','Frost Production Studio','UI / UX Motion','After Effects',
]

const PROJECTS = [
  { id:1, cat:'branding', tag:'Brand Identity', title:'NOVA\nCOLLECTIVE', year:'2024', grad:'linear-gradient(135deg,#04080f 0%,#0d1a3a 40%,#1e6fff 100%)', link:'/project-nova', caption:'Nova Collective', captionTag:'Brand Identity · 2024', num:'01', featured:true },
  { id:2, cat:'broadcast', tag:'Broadcast', title:'DEEP CURRENT\nSERIES', year:'2024', grad:'linear-gradient(135deg,#060c18 0%,#0a1830 60%,#4a90d9 100%)' },
  { id:3, cat:'3d', tag:'3D Animation', title:'AURUM\nFRAGRANCE', year:'2023', grad:'linear-gradient(135deg,#06101a 0%,#0c2040 60%,#7aa8e8 100%)' },
  { id:4, cat:'ui', tag:'UI Motion', title:'PULSE\nAPP', year:'2023', grad:'linear-gradient(135deg,#0a0614 0%,#180a30 60%,#6644cc 100%)' },
  { id:5, cat:'branding', tag:'Branding', title:'VERDANT\nSTUDIOS', year:'2023', grad:'linear-gradient(135deg,#040c18 0%,#081828 60%,#0044cc 100%)' },
  { id:6, cat:'broadcast', tag:'Broadcast · Title Sequence', title:'ECHOES — DOCUMENTARY SERIES', year:'2022', grad:'linear-gradient(160deg,#04080f 0%,#091428 30%,#1e6fff 70%,#7aa8e8 100%)', wide:true },
]

const FILTERS = ['all','branding','broadcast','3d','ui']

export default function Home() {
  const page     = useReveal()
  const [cat, setCat]   = useState('all')
  const [modal, setModal] = useState(false)

  const visible = (c) => cat === 'all' || c === cat

  return (
    <div ref={page}>
      {/* ── HERO ─────────────────────────────────── */}
      <section style={heroStyles.section}>
        <div style={heroStyles.bg} />
        <div style={heroStyles.grid} />
        <div style={heroStyles.bgText}>FROST</div>

        <div style={{ paddingTop: '8rem' }} />

        <div style={heroStyles.center}>
          <p style={{ ...heroStyles.eyebrow, animation: 'fadeUp .8s .2s forwards', opacity: 0 }}>
            Motion Designer &amp; Visual Storyteller
          </p>
          <h1 style={{ ...heroStyles.name, animation: 'fadeUp .9s .4s forwards', opacity: 0 }}>
            RICHARD<br />
            <em style={{ fontFamily: 'var(--font-body)', fontStyle: 'italic', color: 'var(--accent)', fontWeight: 300 }}>
              Amune
            </em>
          </h1>
          <p style={{ ...heroStyles.sub, animation: 'fadeUp .9s .65s forwards', opacity: 0 }}>
            Frost Production Studio — crafting kinetic narratives that move brands forward.
            From concept to final frame, every pixel in motion.
          </p>
          <div style={{ ...heroStyles.ctaGroup, animation: 'fadeUp .9s .8s forwards', opacity: 0 }}>
            <a href="#showreel" className="btn-primary">
              Watch Showreel
              <svg width="14" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
            </a>
            <Link to="/project-nova" className="btn-outline">
              View Projects
              <svg width="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
          </div>
        </div>

        <div style={heroStyles.bottom}>
          <div style={{ ...heroStyles.scroll, animation: 'fadeUp .8s 1s forwards', opacity: 0 }}>
            <div style={heroStyles.scrollLine}>
              <div style={heroStyles.scrollLineInner} />
            </div>
            <span style={{ fontFamily: 'var(--font-ui)', fontSize: '.58rem', letterSpacing: '.22em', textTransform: 'uppercase', color: 'var(--muted)' }}>
              Scroll to explore
            </span>
          </div>
          <div style={{ ...heroStyles.stats, animation: 'fadeUp .8s .85s forwards', opacity: 0 }}>
            {[['8+','Years'],['200+','Projects'],['60+','Clients']].map(([n,l]) => (
              <div key={l}>
                <div style={heroStyles.statNum}>{n}</div>
                <div style={heroStyles.statLabel}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MARQUEE ───────────────────────────────── */}
      <div style={marqueeStyles.wrap}>
        <div style={marqueeStyles.track}>
          {MARQUEE_ITEMS.map((item, i) => (
            <span key={i} style={marqueeStyles.item}>
              {item}
              <span style={marqueeStyles.dot} />
            </span>
          ))}
        </div>
      </div>

      {/* ── SHOWREEL ──────────────────────────────── */}
      <section id="showreel" style={sectionStyles.dark}>
        <p className="reveal" style={sectionStyles.label}>Featured</p>
        <h2 className="reveal" style={sectionStyles.title}>Show<br/>Reel</h2>

        <div
          className="reveal"
          style={reelStyles.wrapper}
          onClick={() => setModal(true)}
        >
          <div style={reelStyles.placeholder}>
            <div style={reelStyles.grid} />
            <div style={reelStyles.glow} />
            {[['tl','2025 — SHOWREEL'],['tr','04:32'],['bl','FROST PRODUCTION STUDIO'],['br','RICHARD AMUNE']].map(([pos,text]) => (
              <span key={pos} style={{ ...reelStyles.corner, ...(pos==='tl'?{top:'1.5rem',left:'1.5rem'}:pos==='tr'?{top:'1.5rem',right:'1.5rem'}:pos==='bl'?{bottom:'1.5rem',left:'1.5rem'}:{bottom:'1.5rem',right:'1.5rem'}) }}>
                {text}
              </span>
            ))}
            <div style={reelStyles.playBtn}>
              <svg width="28" viewBox="0 0 24 24" fill="var(--paper)" style={{ marginLeft: 4 }}><path d="M8 5v14l11-7z"/></svg>
            </div>
            <span style={reelStyles.playLabel}>Play Showreel</span>
          </div>
        </div>

        <div className="reveal" style={reelStyles.infoRow}>
          {[['Duration','4 minutes 32 seconds'],['Featured Work','Brand Identity · Broadcast · 3D · UI Motion'],['Tools','After Effects · Cinema 4D · DaVinci']].map(([k,v]) => (
            <div key={k} style={reelStyles.infoItem}>
              <div style={reelStyles.infoKey}>{k}</div>
              <div style={reelStyles.infoVal}>{v}</div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {modal && (
          <div style={modalStyles.overlay} onClick={() => setModal(false)}>
            <div style={modalStyles.inner} onClick={e => e.stopPropagation()}>
              <button style={modalStyles.close} onClick={() => setModal(false)}>
                <span style={modalStyles.closeX}>×</span> Close
              </button>
              <div style={modalStyles.video}>
                <iframe
                  src="https://player.vimeo.com/video/YOUR_VIDEO_ID?autoplay=1"
                  allow="autoplay; fullscreen"
                  allowFullScreen
                  style={{ width:'100%',height:'100%',border:'none',borderRadius:4 }}
                />
              </div>
            </div>
          </div>
        )}
      </section>

      {/* ── PROJECTS ──────────────────────────────── */}
      <section style={sectionStyles.paper}>
        <p className="reveal" style={{ ...sectionStyles.label, color: 'var(--accent)' }}>Selected Work</p>
        <h2 className="reveal" style={{ ...sectionStyles.title, color: 'var(--ink)' }}>Featured<br/>Projects</h2>

        {/* Filter */}
        <div className="reveal" style={projStyles.filterRow}>
          {FILTERS.map(f => (
            <button
              key={f}
              onClick={() => setCat(f)}
              style={{
                ...projStyles.filterBtn,
                background: cat === f ? 'var(--ink)' : 'none',
                color: cat === f ? 'var(--paper)' : 'var(--muted)',
                borderColor: cat === f ? 'var(--ink)' : 'rgba(10,15,30,.15)',
              }}
            >
              {f === 'all' ? 'All' : f === '3d' ? '3D' : f === 'ui' ? 'UI Motion' : f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="reveal" style={projStyles.grid}>
          {PROJECTS.map((p, i) => (
            <div
              key={p.id}
              style={{
                ...projStyles.card(i, p.wide),
                opacity: visible(p.cat) ? 1 : 0.1,
                transition: 'opacity .35s',
                pointerEvents: visible(p.cat) ? 'auto' : 'none',
              }}
            >
              <div style={{ ...projStyles.thumb(i, p.wide), background: p.grad }}>
                <div style={projStyles.overlay}>
                  <span style={projStyles.tag}>{p.tag}</span>
                  <div style={projStyles.projTitle}>
                    {p.title.split('\n').map((line, j) => <span key={j}>{line}<br/></span>)}
                  </div>
                  <span style={projStyles.year}>{p.year}</span>
                  {p.link
                    ? <Link to={p.link} style={projStyles.cta}>View Case Study →</Link>
                    : <span style={projStyles.cta}>View →</span>
                  }
                </div>
              </div>
              {p.featured && (
                <div style={projStyles.caption}>
                  <div>
                    <div style={projStyles.captionTag}>{p.captionTag}</div>
                    <div style={projStyles.captionTitle}>{p.caption}</div>
                  </div>
                  <div style={projStyles.captionNum}>{p.num}</div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="reveal" style={{ display:'flex', justifyContent:'center', marginTop:'3rem' }}>
          <Link to="/project-nova" style={{ ...projStyles.filterBtn, border:'1px solid rgba(10,15,30,.18)', color:'var(--ink)', display:'inline-flex', alignItems:'center', gap:'.6rem', fontFamily:'var(--font-ui)', fontSize:'.62rem', letterSpacing:'.18em', textTransform:'uppercase', padding:'.9rem 2rem', background:'none' }}>
            View All Projects →
          </Link>
        </div>
      </section>

      {/* ── ABOUT STRIP ───────────────────────────── */}
      <div style={aboutStripStyles.wrap}>
        <div className="reveal">
          <p style={aboutStripStyles.quote}>
            "Motion is the language that turns brand stories into felt experiences."
          </p>
        </div>
        <div className="reveal d1">
          <p style={aboutStripStyles.body}>
            Based in Lagos and available worldwide, Frost Production Studio crafts motion identities
            for brands that refuse to stand still. Every project begins with one question:
            what does this need to feel like?
          </p>
          <div style={aboutStripStyles.tools}>
            {['After Effects','Cinema 4D','DaVinci Resolve','Houdini','Figma','Blender'].map(t => (
              <span key={t} style={aboutStripStyles.toolTag}>{t}</span>
            ))}
          </div>
          <div style={{ marginTop: '2rem' }}>
            <Link to="/about" className="btn-outline" style={{ borderColor:'rgba(255,255,255,.3)', color:'#fff' }}>
              Learn More →
            </Link>
          </div>
        </div>
      </div>

      {/* ── CONTACT CTA ───────────────────────────── */}
      <section style={{ ...sectionStyles.dark, textAlign:'center' }}>
        <p className="reveal" style={{ fontFamily:'var(--font-ui)', fontSize:'.6rem', letterSpacing:'.3em', textTransform:'uppercase', color:'var(--muted)', marginBottom:'2rem' }}>
          Let's make something extraordinary
        </p>
        <h2 className="reveal" style={{ fontFamily:'var(--font-display)', fontWeight:900, fontSize:'clamp(4rem,11vw,10rem)', lineHeight:.9, letterSpacing:'-.02em', marginBottom:'2.5rem' }}>
          Let's<br/><span style={{ color:'var(--accent)' }}>Work</span>
        </h2>
        <Link to="/contact" className="btn-primary reveal" style={{ display:'inline-flex' }}>
          Get In Touch →
        </Link>
      </section>
    </div>
  )
}

/* ── styles ── */
const heroStyles = {
  section: { minHeight:'100vh', display:'grid', gridTemplateRows:'1fr auto', padding:'0 3rem 3rem', position:'relative', overflow:'hidden' },
  bg: { position:'absolute', inset:0, background:'radial-gradient(ellipse 70% 60% at 65% 35%,rgba(30,111,255,.08),transparent 65%),linear-gradient(160deg,#04080f 0%,#060c18 60%,#04080f 100%)' },
  grid: { position:'absolute', inset:0, backgroundImage:'linear-gradient(rgba(30,111,255,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(30,111,255,.03) 1px,transparent 1px)', backgroundSize:'80px 80px' },
  bgText: { position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', fontFamily:'var(--font-display)', fontWeight:900, fontSize:'clamp(9rem,22vw,22rem)', color:'transparent', WebkitTextStroke:'1px rgba(30,111,255,.035)', whiteSpace:'nowrap', userSelect:'none', pointerEvents:'none' },
  center: { position:'relative', zIndex:2, display:'flex', flexDirection:'column', justifyContent:'flex-end', paddingBottom:'2rem' },
  eyebrow: { fontSize:'.6rem', letterSpacing:'.3em', textTransform:'uppercase', color:'var(--accent)', marginBottom:'1.2rem', fontFamily:'var(--font-ui)' },
  name: { fontFamily:'var(--font-display)', fontWeight:900, fontSize:'clamp(4rem,13vw,12rem)', lineHeight:.92, letterSpacing:'-.02em' },
  sub: { marginTop:'2rem', maxWidth:'40ch', fontSize:'.9rem', lineHeight:1.8, color:'var(--ice)', fontFamily:'var(--font-body)' },
  ctaGroup: { display:'flex', gap:'1rem', marginTop:'2.2rem', flexWrap:'wrap' },
  bottom: { position:'relative', zIndex:2, display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginTop:'3rem' },
  scroll: { display:'flex', alignItems:'center', gap:'1.2rem' },
  scrollLine: { width:60, height:1, background:'var(--muted)', position:'relative', overflow:'hidden' },
  scrollLineInner: { position:'absolute', left:'-100%', top:0, width:'100%', height:'100%', background:'var(--accent)', animation:'slide 2.2s 1.2s infinite' },
  stats: { display:'flex', gap:'3rem' },
  statNum: { fontFamily:'var(--font-display)', fontWeight:900, fontSize:'2.8rem', lineHeight:1 },
  statLabel: { fontFamily:'var(--font-ui)', fontSize:'.52rem', letterSpacing:'.2em', textTransform:'uppercase', color:'var(--muted)', marginTop:'.3rem' },
}

const marqueeStyles = {
  wrap: { background:'var(--accent)', overflow:'hidden', padding:'1.1rem 0', whiteSpace:'nowrap' },
  track: { display:'inline-flex', animation:'marqueScroll 20s linear infinite' },
  item: { fontFamily:'var(--font-display)', fontWeight:700, fontSize:'1.05rem', letterSpacing:'.12em', color:'#fff', padding:'0 2.5rem', display:'inline-flex', alignItems:'center', gap:'2.5rem' },
  dot: { width:5, height:5, borderRadius:'50%', background:'rgba(255,255,255,.35)', display:'inline-block', flexShrink:0 },
}

const sectionStyles = {
  dark: { padding:'8rem 3rem', background:'var(--ink)' },
  paper: { padding:'8rem 3rem', background:'var(--paper)', color:'var(--ink)' },
  label: { fontFamily:'var(--font-ui)', fontSize:'.58rem', letterSpacing:'.3em', textTransform:'uppercase', color:'var(--accent)', marginBottom:'1rem', display:'flex', alignItems:'center', gap:'1rem' },
  title: { fontFamily:'var(--font-display)', fontWeight:900, fontSize:'clamp(3.5rem,8vw,7rem)', lineHeight:.95, letterSpacing:'-.01em', marginBottom:'4rem' },
}

const reelStyles = {
  wrapper: { position:'relative', borderRadius:4, overflow:'hidden', aspectRatio:'16/9', cursor:'pointer', border:'1px solid var(--border)' },
  placeholder: { width:'100%', height:'100%', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:'2rem', background:'linear-gradient(135deg,#060c18 0%,#091428 50%,#060c18 100%)', position:'relative', overflow:'hidden' },
  grid: { position:'absolute', inset:0, backgroundImage:'linear-gradient(rgba(30,111,255,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(30,111,255,.04) 1px,transparent 1px)', backgroundSize:'60px 60px' },
  glow: { position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', width:400, height:400, background:'radial-gradient(circle,rgba(30,111,255,.07),transparent 70%)' },
  corner: { position:'absolute', fontFamily:'var(--font-display)', fontWeight:700, fontSize:'.85rem', letterSpacing:'.15em', color:'rgba(232,237,245,.08)' },
  playBtn: { width:80, height:80, borderRadius:'50%', border:'1.5px solid rgba(232,237,245,.35)', display:'flex', alignItems:'center', justifyContent:'center', position:'relative', zIndex:2 },
  playLabel: { position:'relative', zIndex:2, fontFamily:'var(--font-ui)', fontSize:'.58rem', letterSpacing:'.3em', textTransform:'uppercase', color:'var(--muted)' },
  infoRow: { display:'grid', gridTemplateColumns:'repeat(3,1fr)', borderTop:'1px solid var(--border)', marginTop:2 },
  infoItem: { padding:'1.4rem 2rem', borderRight:'1px solid var(--border)' },
  infoKey: { fontFamily:'var(--font-ui)', fontSize:'.52rem', letterSpacing:'.22em', textTransform:'uppercase', color:'var(--muted)', marginBottom:'.5rem' },
  infoVal: { fontFamily:'var(--font-body)', fontSize:'.78rem' },
}

const modalStyles = {
  overlay: { position:'fixed', inset:0, zIndex:800, background:'rgba(0,0,0,.94)', display:'flex', alignItems:'center', justifyContent:'center', backdropFilter:'blur(6px)' },
  inner: { position:'relative', width:'min(90vw,960px)' },
  close: { position:'absolute', top:'-3rem', right:0, background:'none', border:'none', color:'var(--paper)', cursor:'none', fontFamily:'var(--font-ui)', fontSize:'.62rem', letterSpacing:'.2em', textTransform:'uppercase', display:'flex', alignItems:'center', gap:'.6rem', opacity:.7 },
  closeX: { width:24, height:24, border:'1px solid currentColor', borderRadius:'50%', display:'inline-flex', alignItems:'center', justifyContent:'center', fontSize:'1rem' },
  video: { width:'100%', aspectRatio:'16/9', background:'#000', borderRadius:4, overflow:'hidden' },
}

const projStyles = {
  filterRow: { display:'flex', gap:'.8rem', flexWrap:'wrap', marginBottom:'3.5rem' },
  filterBtn: { padding:'.5rem 1.2rem', border:'1px solid', borderRadius:2, fontFamily:'var(--font-ui)', fontSize:'.58rem', letterSpacing:'.18em', textTransform:'uppercase', cursor:'none', transition:'all .2s' },
  grid: { display:'grid', gridTemplateColumns:'repeat(12,1fr)', gap:2 },
  card: (i, wide) => ({
    position:'relative', overflow:'hidden', background:'var(--ink)',
    cursor:'none',
    gridColumn: i===0?'span 8':i===3?'span 5':i===4?'span 7':wide?'span 12':'span 4',
    gridRow: i===0?'span 2':'span 1',
  }),
  thumb: (i, wide) => ({
    width:'100%',
    aspectRatio: i===0?'unset':wide?'21/9':'4/3',
    height: i===0?'100%':'auto',
    minHeight: i===0?480:'unset',
    position:'relative', overflow:'hidden',
  }),
  overlay: { position:'absolute', inset:0, background:'linear-gradient(to top,rgba(4,8,15,.92) 0%,transparent 60%)', display:'flex', flexDirection:'column', justifyContent:'flex-end', padding:'1.8rem', opacity:0, transition:'opacity .3s' },
  tag: { fontFamily:'var(--font-ui)', fontSize:'.52rem', letterSpacing:'.22em', textTransform:'uppercase', color:'var(--accent)', marginBottom:'.5rem' },
  projTitle: { fontFamily:'var(--font-display)', fontWeight:900, fontSize:'1.6rem', letterSpacing:'.04em', color:'#fff', lineHeight:1.1 },
  year: { fontFamily:'var(--font-ui)', marginTop:'.6rem', fontSize:'.58rem', color:'rgba(255,255,255,.4)', letterSpacing:'.15em' },
  cta: { fontFamily:'var(--font-ui)', marginTop:'1rem', display:'inline-flex', alignItems:'center', gap:'.6rem', fontSize:'.58rem', letterSpacing:'.18em', textTransform:'uppercase', color:'var(--paper)' },
  caption: { padding:'1rem 1.4rem', background:'var(--ink)', display:'flex', justifyContent:'space-between', alignItems:'center' },
  captionTag: { fontFamily:'var(--font-ui)', fontSize:'.52rem', letterSpacing:'.2em', textTransform:'uppercase', color:'var(--accent)' },
  captionTitle: { fontFamily:'var(--font-body)', fontSize:'1rem', color:'var(--paper)', marginTop:'.15rem' },
  captionNum: { fontFamily:'var(--font-display)', fontWeight:900, fontSize:'2.4rem', color:'rgba(232,237,245,.05)' },
}

const aboutStripStyles = {
  wrap: { background:'var(--accent)', color:'#fff', padding:'5rem 3rem', display:'grid', gridTemplateColumns:'1fr 1fr', gap:'4rem', alignItems:'center' },
  quote: { fontFamily:'var(--font-body)', fontStyle:'italic', fontSize:'clamp(1.8rem,3.5vw,2.8rem)', lineHeight:1.3 },
  body: { fontFamily:'var(--font-body)', fontSize:'.9rem', lineHeight:1.9, color:'rgba(255,255,255,.8)' },
  tools: { marginTop:'1.8rem', display:'flex', flexWrap:'wrap', gap:'.5rem' },
  toolTag: { padding:'.3rem .8rem', border:'1px solid rgba(255,255,255,.25)', fontFamily:'var(--font-ui)', fontSize:'.52rem', letterSpacing:'.18em', textTransform:'uppercase', borderRadius:2 },
}
