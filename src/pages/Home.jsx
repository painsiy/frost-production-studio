import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

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
  { id:1, cat:'branding', tag:'Motion Design · Brand Video', title:'RIDE\nFLOW',      year:'2024', grad:'linear-gradient(160deg,#040d08 0%,#071410 40%,#0f7a3c 80%,#22c55e 100%)', link:'/project-rideflow', caption:'Rideflow', captionTag:'Motion Design · 2024', num:'01', span8:true },
  { id:2, cat:'branding', tag:'Brand Identity', title:'NOVA\nCOLLECTIVE',  year:'2024', grad:'linear-gradient(135deg,#04080f 0%,#0d1a3a 40%,#1e6fff 100%)', link:'/project-nova' },
  { id:3, cat:'broadcast', tag:'Broadcast',     title:'DEEP CURRENT\nSERIES', year:'2024', grad:'linear-gradient(135deg,#060c18 0%,#0a1830 60%,#4a90d9 100%)' },
  { id:4, cat:'3d',       tag:'3D Animation',   title:'AURUM\nFRAGRANCE',   year:'2023', grad:'linear-gradient(135deg,#06101a 0%,#0c2040 60%,#7aa8e8 100%)', span6:true },
  { id:5, cat:'ui',       tag:'UI Motion',       title:'PULSE\nAPP',         year:'2023', grad:'linear-gradient(135deg,#0a0614 0%,#180a30 60%,#6644cc 100%)', span6b:true },
]

const FILTERS = ['all','branding','broadcast','3d','ui']

export default function Home() {
  const page  = useReveal()
  const [cat, setCat]     = useState('all')
  const [modal, setModal] = useState(false)

  const visible = (c) => cat === 'all' || c === cat

  // grid-column helper
  const getCol = (p, i) => {
    if (p.span8) return 'span 8'
    if (p.span6) return 'span 6'
    if (p.span6b) return 'span 6'
    if (p.wide)  return 'span 12'
    return 'span 4'
  }

  return (
    <div ref={page}>

      {/* ── HERO ───────────────────────────────────────── */}
      <section style={H.section}>
        <div style={H.bg}/><div style={H.grid}/>
        <div style={H.bgText}>FROST</div>
        <div style={{paddingTop:'8rem'}}/>

        <div style={H.center}>
          <p style={{...H.eyebrow, animation:'fadeUp .8s .2s forwards', opacity:0}}>
            Motion Designer &amp; Visual Storyteller
          </p>
          <h1 style={{...H.name, animation:'fadeUp .9s .4s forwards', opacity:0}}>
            RICHARD<br/>
            <em style={{fontFamily:'var(--font-body)',fontStyle:'italic',color:'var(--accent)',fontWeight:300}}>Amune</em>
          </h1>
          <p style={{...H.sub, animation:'fadeUp .9s .65s forwards', opacity:0}}>
            Frost Production Studio — crafting kinetic narratives that move brands forward.
            From concept to final frame, every pixel in motion.
          </p>
          <div style={{...H.ctaGroup, animation:'fadeUp .9s .8s forwards', opacity:0}}>
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

        <div style={{...H.bottom, animation:'fadeUp .8s 1s forwards', opacity:0}}>
          <div style={H.scroll}>
            <div style={H.scrollLine}><div style={H.scrollInner}/></div>
            <span style={H.scrollLabel}>Scroll to explore</span>
          </div>
          <div style={H.stats}>
            {[['8+','Years'],['200+','Projects'],['60+','Clients']].map(([n,l])=>(
              <div key={l}>
                <div style={H.statNum}>{n}</div>
                <div style={H.statLabel}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MARQUEE ────────────────────────────────────── */}
      <div style={M.wrap}><div style={M.track}>
        {MARQUEE_ITEMS.map((item,i)=>(
          <span key={i} style={M.item}>{item}<span style={M.dot}/></span>
        ))}
      </div></div>

      {/* ── SHOWREEL ───────────────────────────────────── */}
      <section id="showreel" style={SEC.dark}>
        <p className="reveal" style={SEC.label}>Featured</p>
        <h2 className="reveal" style={SEC.title}>Show<br/>Reel</h2>

        <div className="reveal" style={R.wrapper} onClick={()=>setModal(true)}>
          <div style={R.placeholder}>
            <div style={R.rgrid}/><div style={R.glow}/>
            {[['tl','2025 — SHOWREEL'],['tr','04:32'],['bl','FROST PRODUCTION STUDIO'],['br','RICHARD AMUNE']].map(([pos,txt])=>(
              <span key={pos} style={{...R.corner, ...(pos==='tl'?{top:'1.5rem',left:'1.5rem'}:pos==='tr'?{top:'1.5rem',right:'1.5rem'}:pos==='bl'?{bottom:'1.5rem',left:'1.5rem'}:{bottom:'1.5rem',right:'1.5rem'})}}>{txt}</span>
            ))}
            <div style={R.playBtn}><svg width="28" viewBox="0 0 24 24" fill="var(--paper)" style={{marginLeft:4}}><path d="M8 5v14l11-7z"/></svg></div>
            <span style={R.playLabel}>Play Showreel</span>
          </div>
        </div>

        <div className="reveal reel-info-row" style={R.infoRow}>
          {[['Duration','4 minutes 32 seconds'],['Featured Work','Brand Identity · Broadcast · 3D · UI Motion'],['Tools','After Effects · Cinema 4D · DaVinci']].map(([k,v])=>(
            <div key={k} style={R.infoItem}><div style={R.infoKey}>{k}</div><div style={R.infoVal}>{v}</div></div>
          ))}
        </div>

        {modal && (
          <div style={MOD.overlay} onClick={()=>setModal(false)}>
            <div style={MOD.inner} onClick={e=>e.stopPropagation()}>
              <button style={MOD.close} onClick={()=>setModal(false)}>
                <span style={MOD.closeX}>×</span> Close
              </button>
              <div style={MOD.video}>
                <iframe src="https://player.vimeo.com/video/YOUR_VIDEO_ID?autoplay=1" allow="autoplay; fullscreen" allowFullScreen style={{width:'100%',height:'100%',border:'none',borderRadius:4}}/>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* ── PROJECTS ───────────────────────────────────── */}
      <section style={SEC.paper}>
        <p className="reveal" style={{...SEC.label, color:'var(--accent)'}}>Selected Work</p>
        <h2 className="reveal" style={{...SEC.title, color:'var(--ink)'}}>Featured<br/>Projects</h2>

        {/* Filter */}
        <div className="reveal" style={P.filterRow}>
          {FILTERS.map(f=>(
            <button key={f} onClick={()=>setCat(f)} style={{
              ...P.filterBtn,
              background: cat===f ? 'var(--ink)' : 'none',
              color: cat===f ? 'var(--paper)' : 'var(--muted)',
              borderColor: cat===f ? 'var(--ink)' : 'rgba(10,15,30,.15)',
            }}>
              {f==='all'?'All':f==='3d'?'3D':f==='ui'?'UI Motion':f.charAt(0).toUpperCase()+f.slice(1)}
            </button>
          ))}
        </div>

        {/* Grid — uses CSS class proj-card + proj-overlay for hover */}
        <div className="reveal proj-grid-home" style={P.grid}>
          {PROJECTS.map((p,i)=>(
            <div
              key={p.id}
              className="proj-card"
              style={{
                gridColumn: getCol(p,i),
                gridRow: p.span8 ? 'span 2' : 'span 1',
                opacity: visible(p.cat) ? 1 : 0.1,
                transition: 'opacity .35s',
                pointerEvents: visible(p.cat) ? 'auto' : 'none',
              }}
            >
              <div style={{
                width:'100%',
                aspectRatio: p.span8 ? 'unset' : p.wide ? '21/9' : '4/3',
                height: p.span8 ? '100%' : 'auto',
                minHeight: p.span8 ? 480 : 'unset',
                background: p.grad,
                position:'relative', overflow:'hidden',
              }}>
                {/* CSS-driven overlay — .proj-card:hover .proj-overlay */}
                <div className="proj-overlay">
                  <span style={P.tag}>{p.tag}</span>
                  <div style={P.projTitle}>
                    {p.title.split('\n').map((line,j)=><span key={j}>{line}<br/></span>)}
                  </div>
                  <span style={P.year}>{p.year}</span>
                  {p.link
                    ? <Link to={p.link} style={P.cta}>View Case Study →</Link>
                    : <Link to="/projects" style={P.cta}>View →</Link>
                  }
                </div>
              </div>

              {/* Always-visible caption for featured card */}
              {p.span8 && (
                <div style={P.caption}>
                  <div>
                    <div style={P.captionTag}>{p.captionTag}</div>
                    <div style={P.captionTitle}>{p.caption}</div>
                  </div>
                  <div style={P.captionNum}>{p.num}</div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="reveal" style={{display:'flex',justifyContent:'center',marginTop:'3rem'}}>
          <Link to="/projects" style={{
            ...P.filterBtn, border:'1px solid rgba(10,15,30,.18)', color:'var(--ink)',
            display:'inline-flex', alignItems:'center', gap:'.6rem',
            fontFamily:'var(--font-ui)', fontSize:'0.85rem',
            letterSpacing:'0.1em', textTransform:'uppercase',
            padding:'.9rem 2.2rem', background:'none',
          }}>
            View All Projects →
          </Link>
        </div>
      </section>

      {/* ── ABOUT STRIP ────────────────────────────────── */}
      <div style={A.wrap} className="about-strip-grid">
        <div className="reveal">
          <p style={A.quote}>"Motion is the language that turns brand stories into felt experiences."</p>
        </div>
        <div className="reveal d1">
          <p style={A.body}>Based in Lagos and available worldwide, Frost Production Studio crafts motion identities for brands that refuse to stand still. Every project begins with one question: what does this need to feel like?</p>
          <div style={A.tools}>
            {['After Effects','Cinema 4D','DaVinci Resolve','Houdini','Figma','Blender'].map(t=>(
              <span key={t} style={A.toolTag}>{t}</span>
            ))}
          </div>
          <div style={{marginTop:'2rem'}}>
            <Link to="/about" className="btn-outline" style={{borderColor:'rgba(255,255,255,.3)',color:'#fff'}}>Learn More →</Link>
          </div>
        </div>
      </div>

      {/* ── CONTACT CTA ────────────────────────────────── */}
      <section style={{...SEC.dark, textAlign:'center'}}>
        <p className="reveal" style={{fontFamily:'var(--font-ui)',fontSize:'0.85rem',letterSpacing:'.2em',textTransform:'uppercase',color:'var(--muted)',marginBottom:'2rem'}}>
          Let's make something extraordinary
        </p>
        <h2 className="reveal" style={{fontFamily:'var(--font-display)',fontWeight:900,fontSize:'clamp(4rem,11vw,10rem)',lineHeight:.9,letterSpacing:'-.02em',marginBottom:'2.5rem'}}>
          Let's<br/><span style={{color:'var(--accent)'}}>Work</span>
        </h2>
        <Link to="/contact" className="btn-primary reveal" style={{display:'inline-flex'}}>Get In Touch →</Link>
      </section>

    </div>
  )
}

/* ── STYLE OBJECTS ── */
const H = {
  section:    { minHeight:'100vh', display:'grid', gridTemplateRows:'1fr auto', padding:'0 3rem 3rem', position:'relative', overflow:'hidden' },
  bg:         { position:'absolute', inset:0, background:'radial-gradient(ellipse 70% 60% at 65% 35%,rgba(30,111,255,.08),transparent 65%),linear-gradient(160deg,#04080f 0%,#060c18 60%,#04080f 100%)' },
  grid:       { position:'absolute', inset:0, backgroundImage:'linear-gradient(rgba(30,111,255,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(30,111,255,.03) 1px,transparent 1px)', backgroundSize:'80px 80px' },
  bgText:     { position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', fontFamily:'var(--font-display)', fontWeight:900, fontSize:'clamp(9rem,22vw,22rem)', color:'transparent', WebkitTextStroke:'1px rgba(30,111,255,.035)', whiteSpace:'nowrap', userSelect:'none', pointerEvents:'none' },
  center:     { position:'relative', zIndex:2, display:'flex', flexDirection:'column', justifyContent:'flex-end', paddingBottom:'2rem' },
  eyebrow:    { fontFamily:'var(--font-ui)', fontSize:'0.85rem', letterSpacing:'.2em', textTransform:'uppercase', color:'var(--accent)', marginBottom:'1.2rem' },
  name:       { fontFamily:'var(--font-display)', fontWeight:900, fontSize:'clamp(4rem,13vw,12rem)', lineHeight:.92, letterSpacing:'-.02em' },
  sub:        { marginTop:'2rem', maxWidth:'40ch', fontFamily:'var(--font-body)', fontSize:'1.05rem', lineHeight:1.8, color:'var(--ice)' },
  ctaGroup:   { display:'flex', gap:'1rem', marginTop:'2.2rem', flexWrap:'wrap' },
  bottom:     { position:'relative', zIndex:2, display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginTop:'3rem', flexWrap:'wrap', gap:'1.5rem' },
  scroll:     { display:'flex', alignItems:'center', gap:'1.2rem' },
  scrollLine: { width:60, height:1, background:'var(--muted)', position:'relative', overflow:'hidden' },
  scrollInner:{ position:'absolute', left:'-100%', top:0, width:'100%', height:'100%', background:'var(--accent)', animation:'slide 2.2s 1.2s infinite' },
  scrollLabel:{ fontFamily:'var(--font-ui)', fontSize:'1.05rem', letterSpacing:'.22em', textTransform:'uppercase', color:'var(--muted)' },
  stats:      { display:'flex', gap:'3rem', flexWrap:'wrap' },
  statNum:    { fontFamily:'var(--font-display)', fontWeight:900, fontSize:'2.8rem', lineHeight:1 },
  statLabel:  { fontFamily:'var(--font-ui)', fontSize:'1rem', letterSpacing:'.2em', textTransform:'uppercase', color:'var(--muted)', marginTop:'.3rem' },
}

const M = {
  wrap:  { background:'var(--accent)', overflow:'hidden', padding:'1.1rem 0', whiteSpace:'nowrap' },
  track: { display:'inline-flex', animation:'marqueScroll 20s linear infinite' },
  item:  { fontFamily:'var(--font-display)', fontWeight:700, fontSize:'1.1rem', letterSpacing:'.12em', color:'#fff', padding:'0 2.5rem', display:'inline-flex', alignItems:'center', gap:'2.5rem' },
  dot:   { width:5, height:5, borderRadius:'50%', background:'rgba(255,255,255,.35)', display:'inline-block', flexShrink:0 },
}

const SEC = {
  dark:  { padding:'8rem 3rem', background:'var(--ink)' },
  paper: { padding:'8rem 3rem', background:'var(--paper)', color:'var(--ink)' },
  label: { fontFamily:'var(--font-ui)', fontSize:'1.1rem', letterSpacing:'.25em', textTransform:'uppercase', color:'var(--accent)', marginBottom:'1rem', display:'flex', alignItems:'center', gap:'1rem' },
  title: { fontFamily:'var(--font-display)', fontWeight:900, fontSize:'clamp(3.5rem,8vw,7rem)', lineHeight:.95, letterSpacing:'-.01em', marginBottom:'4rem' },
}

const R = {
  wrapper:   { position:'relative', borderRadius:4, overflow:'hidden', aspectRatio:'16/9', cursor:'pointer', border:'1px solid var(--border)' },
  placeholder:{ width:'100%', height:'100%', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:'2rem', background:'linear-gradient(135deg,#060c18 0%,#091428 50%,#060c18 100%)', position:'relative', overflow:'hidden' },
  rgrid:     { position:'absolute', inset:0, backgroundImage:'linear-gradient(rgba(30,111,255,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(30,111,255,.04) 1px,transparent 1px)', backgroundSize:'60px 60px' },
  glow:      { position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', width:400, height:400, background:'radial-gradient(circle,rgba(30,111,255,.07),transparent 70%)' },
  corner:    { position:'absolute', fontFamily:'var(--font-display)', fontWeight:700, fontSize:'0.85rem', letterSpacing:'.15em', color:'rgba(232,237,245,.08)' },
  playBtn:   { width:80, height:80, borderRadius:'50%', border:'1.5px solid rgba(232,237,245,.35)', display:'flex', alignItems:'center', justifyContent:'center', position:'relative', zIndex:2 },
  playLabel: { position:'relative', zIndex:2, fontFamily:'var(--font-ui)', fontSize:'1.05rem', letterSpacing:'.25em', textTransform:'uppercase', color:'var(--muted)' },
  infoRow:   { display:'grid', gridTemplateColumns:'repeat(3,1fr)', borderTop:'1px solid var(--border)', marginTop:2 },
  infoItem:  { padding:'1.4rem 2rem', borderRight:'1px solid var(--border)' },
  infoKey:   { fontFamily:'var(--font-ui)', fontSize:'1rem', letterSpacing:'.18em', textTransform:'uppercase', color:'var(--muted)', marginBottom:'.5rem' },
  infoVal:   { fontFamily:'var(--font-body)', fontSize:'0.9rem' },
}

const MOD = {
  overlay: { position:'fixed', inset:0, zIndex:800, background:'rgba(0,0,0,.94)', display:'flex', alignItems:'center', justifyContent:'center', backdropFilter:'blur(6px)' },
  inner:   { position:'relative', width:'min(90vw,960px)' },
  close:   { position:'absolute', top:'-3rem', right:0, background:'none', border:'none', color:'var(--paper)', cursor:'none', fontFamily:'var(--font-ui)', fontSize:'0.82rem', letterSpacing:'.15em', textTransform:'uppercase', display:'flex', alignItems:'center', gap:'.6rem', opacity:.7 },
  closeX:  { width:24, height:24, border:'1px solid currentColor', borderRadius:'50%', display:'inline-flex', alignItems:'center', justifyContent:'center', fontSize:'1rem' },
  video:   { width:'100%', aspectRatio:'16/9', background:'#000', borderRadius:4, overflow:'hidden' },
}

const P = {
  filterRow: { display:'flex', gap:'.8rem', flexWrap:'wrap', marginBottom:'3.5rem' },
  filterBtn: { padding:'.55rem 1.3rem', border:'1px solid', borderRadius:2, fontFamily:'var(--font-ui)', fontSize:'1.1rem', letterSpacing:'.12em', textTransform:'uppercase', cursor:'none', transition:'all .2s' },
  grid:      { display:'grid', gridTemplateColumns:'repeat(12,1fr)', gap:2 },
  tag:       { fontFamily:'var(--font-ui)', fontSize:'1rem', letterSpacing:'.18em', textTransform:'uppercase', color:'var(--accent)', marginBottom:'.5rem' },
  projTitle: { fontFamily:'var(--font-display)', fontWeight:900, fontSize:'1.8rem', letterSpacing:'.04em', color:'#fff', lineHeight:1.05 },
  year:      { fontFamily:'var(--font-ui)', marginTop:'.6rem', fontSize:'1.05rem', color:'rgba(255,255,255,.4)', letterSpacing:'.15em' },
  cta:       { fontFamily:'var(--font-ui)', marginTop:'1rem', display:'inline-flex', alignItems:'center', gap:'.6rem', fontSize:'1.05rem', letterSpacing:'.15em', textTransform:'uppercase', color:'var(--paper)' },
  caption:   { padding:'1rem 1.4rem', background:'var(--ink)', display:'flex', justifyContent:'space-between', alignItems:'center' },
  captionTag:  { fontFamily:'var(--font-ui)', fontSize:'1rem', letterSpacing:'.15em', textTransform:'uppercase', color:'var(--accent)' },
  captionTitle:{ fontFamily:'var(--font-body)', fontSize:'1.05rem', color:'var(--paper)', marginTop:'.15rem' },
  captionNum:  { fontFamily:'var(--font-display)', fontWeight:900, fontSize:'2.4rem', color:'rgba(232,237,245,.05)' },
}

const A = {
  wrap:    { background:'var(--accent)', color:'#fff', padding:'5rem 3rem', display:'grid', gridTemplateColumns:'1fr 1fr', gap:'4rem', alignItems:'center' },
  quote:   { fontFamily:'var(--font-body)', fontStyle:'italic', fontSize:'clamp(1.8rem,3.5vw,2.8rem)', lineHeight:1.3 },
  body:    { fontFamily:'var(--font-body)', fontSize:'1rem', lineHeight:1.9, color:'rgba(255,255,255,.82)' },
  tools:   { marginTop:'1.8rem', display:'flex', flexWrap:'wrap', gap:'.5rem' },
  toolTag: { padding:'.3rem .9rem', border:'1px solid rgba(255,255,255,.25)', fontFamily:'var(--font-ui)', fontSize:'1.05rem', letterSpacing:'.12em', textTransform:'uppercase', borderRadius:2 },
}
