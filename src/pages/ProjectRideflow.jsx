import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

/* ─────────────────────────────────────────────────────────
   HOOKS
───────────────────────────────────────────────────────── */
function useReveal() {
  const ref = useRef(null)
  useEffect(() => {
    if (!ref.current) return
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          setTimeout(() => e.target.classList.add('visible'), i * 70)
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

/* ─────────────────────────────────────────────────────────
   BRAND PALETTE  — Rideflow Blue #2C4BFD
───────────────────────────────────────────────────────── */
const B = {
  bg:      '#05080f',        // page background
  surface: '#080f1c',        // cards / sections
  blue:    '#2C4BFD',        // primary brand blue
  blueHi:  '#5b78ff',        // lighter blue for text on dark
  blueDim: 'rgba(44,75,253,0.09)',
  blueGlow:'rgba(44,75,253,0.18)',
  border:  'rgba(44,75,253,0.12)',
  muted:   '#4a5a80',        // body text on dark
  paper:   '#e8edf5',        // off-white text
}

/* ─────────────────────────────────────────────────────────
   VIDEO DATA
   ➜  Replace each youtubeId value with the real YouTube
      video ID once you have the links.
      e.g. https://youtube.com/watch?v=dQw4w9WgXcQ
           → youtubeId: 'dQw4w9WgXcQ'
───────────────────────────────────────────────────────── */
const VIDEOS = [
  {
    num:       '01',
    title:     'Main Brand Film',
    type:      'Brand Film',
    desc:      'The flagship video introducing Rideflow to the world. Anchors the brand narrative and communicates the core promise: one dashboard, total control over your entire logistics operation.',
    youtubeId: 'PASTE_YOUTUBE_ID_1',
    xUrl:      'https://x.com/RideflowHQ/status/2046248124822200492',
    duration:  '~60s',
    platform:  'Website · Social',
  },
  {
    num:       '02',
    title:     'Dashboard Workflow',
    type:      'Product Demo',
    desc:      'A deep-dive into the Rideflow dashboard — showing how operations managers track orders, assign drivers, and monitor fleet health in real time. Built for prospects evaluating the product.',
    youtubeId: 'PASTE_YOUTUBE_ID_2',
    xUrl:      'https://x.com/RideflowHQ/status/2024873718342651984',
    duration:  '~90s',
    platform:  'Website · LinkedIn',
  },
  {
    num:       '03',
    title:     'Video Edit — Social Cut',
    type:      'Video Editing',
    desc:      'A punchy, social-optimised cut built for autoplay performance. Tight editing rhythm, motion titles, and zero reliance on sound for the first 5 seconds. Made to stop thumbs mid-scroll.',
    youtubeId: 'PASTE_YOUTUBE_ID_3',
    xUrl:      'https://x.com/RideflowHQ/status/2049165403994075517',
    duration:  '~30s',
    platform:  'X / Twitter',
  },
  {
    num:       '04',
    title:     'Social Media Content',
    type:      'Motion Design',
    desc:      'Short-form awareness video for top-of-funnel distribution. Fast, visual, brand-led — designed to introduce Rideflow to audiences encountering the product for the first time.',
    youtubeId: 'PASTE_YOUTUBE_ID_4',
    xUrl:      'https://x.com/RideflowHQ/status/2049910818536386573',
    duration:  '~20s',
    platform:  'X · Instagram',
  },
]

/* ─────────────────────────────────────────────────────────
   YOUTUBE PLAYER  — plays inline; falls back to X link
───────────────────────────────────────────────────────── */
function VideoPlayer({ youtubeId, xUrl, title, isMobile }) {
  const [playing, setPlaying] = useState(false)
  const isReal = youtubeId && !youtubeId.startsWith('PASTE_')

  // Active YouTube embed
  if (isReal && playing) {
    return (
      <div style={{ position:'relative', width:'100%', aspectRatio:'16/9', background:'#000' }}>
        <iframe
          src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1&color=white`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          style={{ position:'absolute', inset:0, width:'100%', height:'100%', border:'none' }}
        />
      </div>
    )
  }

  // Thumbnail / placeholder
  return (
    <div
      onClick={() => isReal && setPlaying(true)}
      style={{
        position:'relative', width:'100%', aspectRatio:'16/9', overflow:'hidden',
        background:`linear-gradient(160deg, ${B.bg} 0%, ${B.surface} 40%, rgba(44,75,253,.25) 100%)`,
        cursor: isReal ? 'pointer' : 'default',
      }}
    >
      {/* Real Rideflow thumbnail image — fills the whole card */}
      <img
        src="/frost-production-studio/images/rideflow-thumbnail.png"
        alt="Rideflow"
        style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', objectPosition:'center' }}
      />
      {/* Dark overlay so play button and text stay readable */}
      <div style={{ position:'absolute', inset:0, background:'rgba(4,8,15,.52)' }}/>

      {/* Play button */}
      <div style={{ position:'absolute', inset:0, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:'1rem' }}>
        <div style={{
          width: isMobile ? 52 : 68, height: isMobile ? 52 : 68, borderRadius:'50%',
          border:`1.5px solid ${isReal ? 'rgba(232,237,245,.55)' : 'rgba(232,237,245,.2)'}`,
          display:'flex', alignItems:'center', justifyContent:'center',
          background: isReal ? 'rgba(44,75,253,.25)' : 'rgba(44,75,253,.08)',
        }}>
          <svg width={isMobile ? 20 : 26} viewBox="0 0 24 24" fill={isReal ? B.paper : B.muted} style={{ marginLeft:3 }}>
            <path d="M8 5v14l11-7z"/>
          </svg>
        </div>
        <span style={{
          fontFamily:'var(--font-ui)', fontSize: isMobile ? '0.7rem' : '0.78rem',
          letterSpacing:'.18em', textTransform:'uppercase',
          color: isReal ? 'rgba(232,237,245,.6)' : B.muted,
        }}>
          {isReal ? 'Click to Play' : 'YouTube link coming soon'}
        </span>
      </div>

      {/* X fallback link */}
      <a
        href={xUrl} target="_blank" rel="noopener noreferrer"
        onClick={e => e.stopPropagation()}
        style={{
          position:'absolute', bottom:'1rem', right:'1rem',
          fontFamily:'var(--font-ui)', fontSize:'0.7rem', letterSpacing:'.1em',
          textTransform:'uppercase', color: B.blueHi, textDecoration:'none',
          background:'rgba(44,75,253,.15)', border:`1px solid rgba(44,75,253,.3)`,
          padding:'.3rem .75rem',
        }}
      >
        Watch on X ↗
      </a>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────
   MAIN PAGE COMPONENT
───────────────────────────────────────────────────────── */
export default function ProjectRideflow() {
  const page     = useReveal()
  const isMobile = useIsMobile()

  // Consistent section padding — tighter on mobile
  const px = isMobile ? '1.5rem' : '3rem'
  const py = isMobile ? '4.5rem' : '7rem'
  const sectionBase = { padding:`${py} ${px}`, borderTop:`1px solid ${B.border}` }

  return (
    <div ref={page} style={{ background: B.bg, color: B.paper }}>

      {/* ══════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════ */}
      <section style={{
        minHeight:'100vh', display:'flex', flexDirection:'column',
        justifyContent:'flex-start', position:'relative', overflow:'hidden',
        padding: isMobile ? '5.5rem 1.5rem 3rem' : '6rem 3rem 4rem',
      }}>
        {/* Full-bleed clean background image */}
        <div style={{
          position:'absolute', inset:0,
          backgroundImage:"url('/frost-production-studio/images/rideflow-thumbnail.png')",
          backgroundSize:'cover', backgroundPosition:'center center',
        }}/>
        {/* Single clean gradient overlay — dark at bottom for text, subtle at top */}
        <div style={{
          position:'absolute', inset:0,
          background:'linear-gradient(to top, rgba(4,8,15,0.96) 0%, rgba(4,8,15,0.55) 45%, rgba(4,8,15,0.25) 100%)',
        }}/>

        {/* CONTENT — always single column, top to bottom */}
        <div style={{ position:'relative', zIndex:2, display:'flex', flexDirection:'column', gap: isMobile ? '1.4rem' : '2rem' }}>

          {/* Breadcrumb */}
          <p style={{ fontFamily:'var(--font-ui)', fontSize: isMobile ? '0.75rem' : '0.85rem', letterSpacing:'.15em', textTransform:'uppercase', color: B.muted, animation:'fadeUp .6s .1s forwards', opacity:0 }}>
            <Link to="/" style={{ color:B.muted, textDecoration:'none' }}>Home</Link>
            <span style={{ color:B.blue, margin:'0 .5rem' }}>→</span>
            <Link to="/projects" style={{ color:B.muted, textDecoration:'none' }}>Projects</Link>
            <span style={{ color:B.blue, margin:'0 .5rem' }}>→</span>
            Rideflow
          </p>

          {/* Category pills */}
          <div style={{ display:'flex', gap:'.5rem', flexWrap:'wrap', animation:'fadeUp .6s .2s forwards', opacity:0 }}>
            {['SaaS Video', 'Motion Design', 'Video Editing'].map(t => (
              <span key={t} style={{ padding:'.32rem .85rem', background:'rgba(44,75,253,.12)', border:`1px solid rgba(44,75,253,.28)`, fontFamily:'var(--font-ui)', fontSize: isMobile ? '0.72rem' : '0.8rem', letterSpacing:'.1em', textTransform:'uppercase', color: B.blueHi }}>
                {t}
              </span>
            ))}
          </div>

          {/* Rideflow horizontal logo — the REAL wordmark, never overridden */}
          <div style={{ animation:'fadeUp .9s .35s forwards', opacity:0 }}>
            <img
              src="/frost-production-studio/images/rideflow-logo-new.svg"
              alt="Rideflow"
              style={{
                height: isMobile ? 40 : 60,
                width:'auto',
                display:'block',
              }}
            />
          </div>

          {/* Tagline */}
          <p style={{ maxWidth: isMobile ? '100%' : '48ch', fontFamily:'var(--font-body)', fontSize: isMobile ? '1rem' : '1.1rem', lineHeight:1.85, color:'rgba(232,237,245,.85)', animation:'fadeUp .8s .5s forwards', opacity:0 }}>
            A full suite of SaaS video content — brand film, dashboard walkthrough, video editing, and social motion design. Turning a powerful logistics platform into something people actually want to watch.
          </p>

          {/* Meta grid — 2 col on mobile, 4 col on desktop */}
          <div style={{
            display:'grid',
            gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4,1fr)',
            gap:1, background: B.border,
            animation:'fadeUp .8s .65s forwards', opacity:0,
          }}>
            {[['Client','Rideflow'],['Industry','Logistics SaaS'],['Scope','Video · Motion'],['Year','2026']].map(([k,v]) => (
              <div key={k} style={{ background:'rgba(4,8,15,0.75)', backdropFilter:'blur(8px)', padding: isMobile ? '1rem' : '1.3rem 1.6rem' }}>
                <div style={{ fontFamily:'var(--font-ui)', fontSize:'0.72rem', letterSpacing:'.15em', textTransform:'uppercase', color:B.muted, marginBottom:'.4rem' }}>{k}</div>
                <div style={{ fontFamily:'var(--font-display)', fontWeight:800, fontSize: isMobile ? '0.9rem' : '1rem', color:'#ffffff' }}>{v}</div>
              </div>
            ))}
          </div>

          {/* Stats row */}
          <div style={{ display:'flex', gap: isMobile ? '1.5rem' : '3rem', paddingTop: isMobile ? '1.2rem' : '1.8rem', borderTop:`1px solid ${B.border}`, flexWrap:'wrap', animation:'fadeUp .8s .8s forwards', opacity:0 }}>
            {[['4','Videos'],['SaaS','Industry'],['2026','Year'],['Motion + Edit','Scope']].map(([v,k]) => (
              <div key={k}>
                <div style={{ fontFamily:'var(--font-display)', fontWeight:900, fontSize: isMobile ? '1.7rem' : '2.3rem', lineHeight:1, color:'#ffffff' }}>{v}</div>
                <div style={{ fontFamily:'var(--font-ui)', fontSize:'0.72rem', letterSpacing:'.15em', textTransform:'uppercase', color:B.muted, marginTop:'.3rem' }}>{k}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll hint */}
        <div style={{ position:'absolute', bottom:'2.5rem', left:'50%', transform:'translateX(-50%)', display:'flex', flexDirection:'column', alignItems:'center', gap:'.7rem', animation:'fadeUp .8s 1.1s forwards', opacity:0 }}>
          <div style={{ width:1, height:44, background:`linear-gradient(to bottom,${B.blue},transparent)`, animation:'scrollArrow 2s 1.3s infinite' }}/>
          <span style={{ fontFamily:'var(--font-ui)', fontSize:'0.68rem', letterSpacing:'.22em', textTransform:'uppercase', color:B.muted }}>Scroll</span>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          01 · BRIEF
      ══════════════════════════════════════════════ */}
      <section id="rf-brief" style={{ ...sectionBase, background:B.bg }}>
        <ChNum n="01" label="The Brief" isMobile={isMobile} />
        <h2 className="reveal" style={H2(isMobile)}>
          The <Em isMobile={isMobile}>Brief</Em>
        </h2>

        {/* Body text — full width, stacks naturally */}
        <div className="reveal" style={{ fontFamily:'var(--font-body)', fontSize: isMobile ? '1rem' : '1.05rem', lineHeight:2, color:'rgba(232,237,245,.62)', marginBottom:'2.5rem', maxWidth:'66ch' }}>
          <p>Rideflow — a SaaS logistics operations platform for managing riders, drivers, fleets, and delivery workflows — needed video content that made a dense, feature-rich product feel immediate and compelling to first-time viewers.</p>
          <p style={{ marginTop:'1.2rem' }}>Four videos, four purposes: a brand film to anchor the narrative, a dashboard demo for prospects actively evaluating, a video edit for social performance, and a motion design piece for top-of-funnel awareness. Every second of every video had to justify its existence.</p>
        </div>

        {/* Pull quote */}
        <div className="reveal" style={{ borderLeft:`3px solid ${B.blue}`, paddingLeft: isMobile ? '1.2rem' : '2rem', marginBottom:'3rem' }}>
          <p style={{ fontFamily:'var(--font-body)', fontStyle:'italic', fontSize: isMobile ? '1.1rem' : '1.5rem', lineHeight:1.45, color:B.paper }}>
            "Before Rideflow, managing orders and drivers felt chaotic."
          </p>
          <p style={{ fontFamily:'var(--font-ui)', fontSize:'0.82rem', color:B.muted, marginTop:'.8rem', letterSpacing:'.06em' }}>— Rideflow.org</p>
        </div>

        {/* Project details — label left, value right. Single row on desktop, stacked on mobile */}
        <div className="reveal" style={{ display:'flex', flexDirection:'column', gap:1 }}>
          {[
            ['Client',       'Rideflow'],
            ['Website',      'rideflow.org', 'link'],
            ['Industry',     'Logistics SaaS / Transport Tech'],
            ['Delivered by', 'Richard Amune'],
            ['Scope',        'Brand Film · Dashboard Demo · Video Editing · Social Motion Design'],
            ['Platform',     'Website · YouTube · LinkedIn · X (Twitter)'],
            ['Year',         '2026'],
          ].map(([k,v,type]) => (
            <div key={k} style={{
              display:'grid',
              gridTemplateColumns: isMobile ? '1fr' : '180px 1fr',
              gap: isMobile ? '.25rem' : '2rem',
              padding: isMobile ? '.9rem 1.1rem' : '1.1rem 1.4rem',
              background:'rgba(44,75,253,.03)', border:`1px solid ${B.border}`,
            }}>
              <div style={{ fontFamily:'var(--font-ui)', fontSize:'0.76rem', letterSpacing:'.14em', textTransform:'uppercase', color:B.muted }}>{k}</div>
              <div style={{ fontFamily:'var(--font-body)', fontSize: isMobile ? '0.95rem' : '1rem', color:B.paper, lineHeight:1.6 }}>
                {type==='link'
                  ? <a href="https://rideflow.org" target="_blank" rel="noopener noreferrer" style={{ color:B.blueHi, textDecoration:'none' }}>{v} ↗</a>
                  : v
                }
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          02 · CHALLENGE
      ══════════════════════════════════════════════ */}
      <section id="rf-challenge" style={{ ...sectionBase, background:B.surface }}>
        <ChNum n="02" label="The Challenge" isMobile={isMobile} />
        <h2 className="reveal" style={H2(isMobile)}>
          The <Em isMobile={isMobile}>Challenge</Em>
        </h2>

        {/* Cards — 1 col on mobile */}
        <div style={{ display:'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3,1fr)', gap: isMobile ? '1px' : 2, marginBottom: isMobile ? '2.5rem' : '4rem' }}>
          {[
            ['📦','Complex SaaS Product','Rideflow manages drivers, fleets, orders, compliance docs, and analytics — all in one platform. Showing all of this without losing the viewer in under 90 seconds required surgical editorial decisions.'],
            ['🎯','Multiple Audiences','The content needed to speak to logistics managers, operations directors, and dispatch operators — each with completely different concerns, vocabulary, and viewing habits.'],
            ['⚡','Speed & Clarity','Logistics is a fast-moving industry. Every video had to feel as fast and efficient as Rideflow itself — no wasted frames, no padding. Every second earns its place.'],
          ].map(([icon,title,body]) => (
            <div key={title} className="reveal" style={{ background:'rgba(44,75,253,.05)', border:`1px solid ${B.border}`, padding: isMobile ? '1.8rem 1.5rem' : '2.2rem 2rem' }}>
              <div style={{ fontSize: isMobile ? '1.8rem' : '2.2rem', marginBottom:'1rem' }}>{icon}</div>
              <div style={{ fontFamily:'var(--font-display)', fontWeight:800, fontSize: isMobile ? '1.1rem' : '1.2rem', color:B.paper, marginBottom:'.8rem' }}>{title}</div>
              <div style={{ fontFamily:'var(--font-body)', fontSize: isMobile ? '0.95rem' : '1rem', lineHeight:1.85, color:B.muted }}>{body}</div>
            </div>
          ))}
        </div>

        {/* Platform strip — 2 col on mobile, 4 col on desktop */}
        <div className="reveal" style={{ display:'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4,1fr)', gap:1, background:B.border }}>
          {[['🌐','rideflow.org','Website'],['📺','YouTube','Primary Host'],['🏭','Logistics SaaS','Industry'],['📅','2026','Year']].map(([icon,v,k]) => (
            <div key={k} style={{ background:B.surface, padding: isMobile ? '1.2rem 1rem' : '1.8rem 1.5rem', textAlign:'center' }}>
              <div style={{ fontSize: isMobile ? '1.4rem' : '1.7rem', marginBottom:'.5rem' }}>{icon}</div>
              <div style={{ fontFamily:'var(--font-display)', fontWeight:800, fontSize: isMobile ? '0.92rem' : '1rem', color:B.paper, marginBottom:'.3rem' }}>{v}</div>
              <div style={{ fontFamily:'var(--font-ui)', fontSize:'0.7rem', letterSpacing:'.12em', textTransform:'uppercase', color:B.muted }}>{k}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          03 · THE WORK
      ══════════════════════════════════════════════ */}
      <section id="rf-work" style={{ ...sectionBase, background:B.bg }}>
        <ChNum n="03" label="The Approach" isMobile={isMobile} />
        <h2 className="reveal" style={H2(isMobile)}>
          The <Em isMobile={isMobile}>Work</Em>
        </h2>

        {/* Vertical timeline — always single column */}
        <div style={{ position:'relative', paddingLeft: isMobile ? '1.5rem' : '2rem', borderLeft:`1px solid ${B.blue}` }}>
          {[
            {
              phase:'Phase 1 — Strategy & Scripting',
              body:'Before a frame was touched, the content strategy was mapped across four pillars: brand awareness, product demonstration, video editing, and motion design. Each video was scripted to a specific length, pacing, and call-to-action. The scripting phase determined the editing rhythm for everything that followed.',
            },
            {
              phase:'Phase 2 — Motion Design & Video Editing',
              body:"The brand film was built around Rideflow's core promise: control. Every cut and transition was timed to feel decisive — nothing lingered. The dashboard demo layered screen recordings with motion annotations to make the UX immediately legible to a first-time viewer.",
            },
            {
              phase:'Phase 3 — Social Content Delivery',
              body:'Social cuts were crafted for autoplay performance — the first 3 seconds had to be visually arresting without sound. Animated titles, captions, and looping motion edits were added. Each video was exported in the optimal resolution and format for its distribution platform.',
            },
          ].map((item, i) => (
            <div key={i} className="reveal" style={{ position:'relative', paddingBottom: isMobile ? '2.5rem' : '3.5rem', paddingLeft: isMobile ? '1.5rem' : '2.5rem', paddingTop:'.3rem' }}>
              <div style={{ position:'absolute', left: isMobile ? -6 : -5.5, top:'.4rem', width:10, height:10, borderRadius:'50%', background:B.blue, boxShadow:`0 0 14px ${B.blueGlow}` }}/>
              <div style={{ fontFamily:'var(--font-ui)', fontSize: isMobile ? '0.76rem' : '0.84rem', letterSpacing:'.14em', textTransform:'uppercase', color:B.blue, marginBottom:'.7rem' }}>{item.phase}</div>
              <div style={{ fontFamily:'var(--font-body)', fontSize: isMobile ? '0.98rem' : '1.05rem', lineHeight:1.9, color:B.muted }}>{item.body}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          04 · VIDEOS
      ══════════════════════════════════════════════ */}
      <section id="rf-videos" style={{ ...sectionBase, background:B.surface }}>
        <ChNum n="04" label="Watch the Work" isMobile={isMobile} />
        <h2 className="reveal" style={H2(isMobile)}>
          The <Em isMobile={isMobile}>Videos</Em>
        </h2>

        <p className="reveal" style={{ fontFamily:'var(--font-body)', fontSize: isMobile ? '1rem' : '1.05rem', color:B.muted, maxWidth:'52ch', marginBottom: isMobile ? '2.5rem' : '3.5rem', lineHeight:1.8 }}>
          All four videos produced for Rideflow, playable directly below. YouTube links will be added — for now, each card links to the original X post.
        </p>

        {/* Always single-column — video player on top, info below */}
        <div style={{ display:'flex', flexDirection:'column', gap: isMobile ? '3rem' : '2px' }}>
          {VIDEOS.map((v) => (
            <div key={v.num} className="reveal" style={{ background:'rgba(44,75,253,.03)', border:`1px solid ${B.border}`, display:'flex', flexDirection:'column' }}>

              {/* Player — always full width */}
              <VideoPlayer
                youtubeId={v.youtubeId}
                xUrl={v.xUrl}
                title={v.title}
                isMobile={isMobile}
              />

              {/* Info — always below the video */}
              <div style={{ padding: isMobile ? '1.5rem' : '2rem', display:'flex', flexDirection:'column', gap:'.8rem' }}>
                {/* Type + number */}
                <div style={{ display:'flex', alignItems:'center', gap:'.8rem' }}>
                  <span style={{ fontFamily:'var(--font-ui)', fontSize: isMobile ? '0.72rem' : '0.78rem', letterSpacing:'.12em', textTransform:'uppercase', background:'rgba(44,75,253,.15)', border:`1px solid rgba(44,75,253,.3)`, color:B.blueHi, padding:'.3rem .75rem' }}>{v.type}</span>
                  <span style={{ fontFamily:'var(--font-display)', fontWeight:900, fontSize:'2rem', color:'rgba(232,237,245,.06)', lineHeight:1 }}>{v.num}</span>
                </div>

                {/* Title */}
                <div style={{ fontFamily:'var(--font-display)', fontWeight:800, fontSize: isMobile ? '1.2rem' : '1.4rem', color:B.paper }}>{v.title}</div>

                {/* Description */}
                <div style={{ fontFamily:'var(--font-body)', fontSize: isMobile ? '0.95rem' : '1.02rem', lineHeight:1.8, color:B.muted }}>{v.desc}</div>

                {/* Meta */}
                <div style={{ display:'flex', alignItems:'center', gap:'1.2rem', paddingTop:'.9rem', borderTop:`1px solid ${B.border}`, flexWrap:'wrap' }}>
                  <span style={{ fontFamily:'var(--font-ui)', fontSize:'0.78rem', letterSpacing:'.08em', textTransform:'uppercase', color:B.muted }}>⏱ {v.duration}</span>
                  <span style={{ fontFamily:'var(--font-ui)', fontSize:'0.78rem', letterSpacing:'.08em', textTransform:'uppercase', color:B.muted }}>📡 {v.platform}</span>
                  <a href={v.xUrl} target="_blank" rel="noopener noreferrer" style={{ marginLeft:'auto', fontFamily:'var(--font-ui)', fontSize:'0.78rem', letterSpacing:'.08em', textTransform:'uppercase', color:B.blueHi, textDecoration:'none' }}>
                    Watch on X ↗
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          05 · DELIVERABLES
      ══════════════════════════════════════════════ */}
      <section id="rf-results" style={{ ...sectionBase, background:B.bg }}>
        <ChNum n="05" label="Deliverables" isMobile={isMobile} />
        <h2 className="reveal" style={H2(isMobile)}>
          What Was <Em isMobile={isMobile}>Delivered</Em>
        </h2>

        <div style={{ display:'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3,1fr)', gap: isMobile ? '1px' : 2 }}>
          {[
            { icon:'🎬', title:'Brand Film',            desc:'Flagship video for homepage and social distribution' },
            { icon:'🖥',  title:'Dashboard Demo',        desc:'Product walkthrough showing the full Rideflow workflow' },
            { icon:'✂️', title:'Video Editing',          desc:'Social-first cut with motion titles and captions' },
            { icon:'📱', title:'Social Motion Design',   desc:'Short-form awareness content for top-of-funnel reach' },
            { icon:'🎨', title:'Motion Graphics',        desc:'Animated lower thirds, titles, and transition elements' },
            { icon:'🎯', title:'Platform Optimisation',  desc:'Every video formatted for its specific platform' },
          ].map(d => (
            <div key={d.title} className="reveal" style={{ padding: isMobile ? '1.6rem 1.4rem' : '2rem 1.8rem', border:`1px solid ${B.border}`, background:'rgba(44,75,253,.02)' }}>
              <div style={{ fontSize: isMobile ? '1.8rem' : '2rem', marginBottom:'1rem' }}>{d.icon}</div>
              <div style={{ fontFamily:'var(--font-display)', fontWeight:800, fontSize: isMobile ? '1rem' : '1.1rem', color:B.paper, marginBottom:'.6rem' }}>{d.title}</div>
              <div style={{ fontFamily:'var(--font-body)', fontSize: isMobile ? '0.92rem' : '0.98rem', lineHeight:1.75, color:B.muted }}>{d.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          06 · OUTCOME
      ══════════════════════════════════════════════ */}
      <section id="rf-outcome" style={{ ...sectionBase, background:B.blue, color:'#fff' }}>
        <ChNum n="06" label="Results & Impact" isMobile={isMobile} light />
        <h2 className="reveal" style={{ ...H2(isMobile), color:'#fff' }}>
          The <span style={{ fontFamily:'var(--font-body)', fontStyle:'italic', fontWeight:300, color:'rgba(255,255,255,.5)' }}>Outcome</span>
        </h2>

        {/* Stats — 2 col mobile, 4 col desktop */}
        <div style={{ display:'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4,1fr)', gap:1, background:'rgba(255,255,255,.15)', marginBottom: isMobile ? '3rem' : '4rem' }}>
          {[['4','Videos Produced','Full suite delivered'],['10+','Happy Clients','Onboard at launch'],['2026','Production Year','rideflow.org'],['SaaS','Industry','Logistics Tech']].map(([v,k,c]) => (
            <div key={k} style={{ background:B.blue, padding: isMobile ? '1.8rem 1rem' : '2.5rem 2rem', textAlign:'center' }}>
              <div style={{ fontFamily:'var(--font-display)', fontWeight:900, fontSize: isMobile ? '2.2rem' : '3.6rem', lineHeight:1, color:'#fff' }}>{v}</div>
              <div style={{ fontFamily:'var(--font-ui)', fontSize: isMobile ? '0.7rem' : '0.8rem', letterSpacing:'.14em', textTransform:'uppercase', color:'rgba(255,255,255,.55)', marginTop:'.5rem' }}>{k}</div>
              <div style={{ fontFamily:'var(--font-body)', fontSize: isMobile ? '0.8rem' : '0.88rem', color:'rgba(255,255,255,.38)', marginTop:'.35rem' }}>{c}</div>
            </div>
          ))}
        </div>

        {/* Quote + logo */}
        <div style={{ maxWidth:660, textAlign:'center', margin:'0 auto', padding: isMobile ? '0' : '0 2rem' }}>
          {/* Rideflow horizontal logo — white via screen blend */}
          <div style={{ display:'flex', justifyContent:'center', marginBottom:'2rem' }}>
            <img
              src="/frost-production-studio/images/rideflow-logo-new.svg"
              alt="Rideflow"
              style={{ height: isMobile ? 36 : 44, width:'auto', mixBlendMode:'screen', filter:'brightness(1.1) saturate(0) invert(1)', opacity:.55 }}
            />
          </div>

          <p style={{ fontFamily:'var(--font-body)', fontStyle:'italic', fontSize: isMobile ? '1.05rem' : 'clamp(1.2rem,2.5vw,1.65rem)', lineHeight:1.55, color:'#fff', marginBottom:'1.5rem' }}>
            "Before Rideflow, managing orders and drivers felt chaotic. Now every part of our operation is in one place."
          </p>
          <p style={{ fontFamily:'var(--font-ui)', fontSize:'0.82rem', letterSpacing:'.15em', textTransform:'uppercase', color:'rgba(255,255,255,.5)' }}>— Rideflow.org</p>
          <div style={{ marginTop:'2rem' }}>
            <a href="https://rideflow.org" target="_blank" rel="noopener noreferrer" style={{ display:'inline-flex', alignItems:'center', gap:'.6rem', padding:'.85rem 1.8rem', background:'rgba(255,255,255,.12)', border:'1px solid rgba(255,255,255,.3)', fontFamily:'var(--font-ui)', fontSize:'0.88rem', letterSpacing:'.1em', textTransform:'uppercase', color:'#fff', textDecoration:'none' }}>
              Visit Rideflow.org ↗
            </a>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          NEXT PROJECT
      ══════════════════════════════════════════════ */}
      <section style={{ ...sectionBase, background:B.bg, textAlign:'center', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', inset:0, background:`radial-gradient(ellipse 60% 50% at 50% 50%, rgba(44,75,253,.05), transparent 70%)` }}/>
        <p className="reveal" style={{ fontFamily:'var(--font-ui)', fontSize:'0.82rem', letterSpacing:'.22em', textTransform:'uppercase', color:B.muted, marginBottom:'1.5rem', position:'relative', zIndex:2 }}>You've reached the end</p>
        <h2 className="reveal" style={{ fontFamily:'var(--font-display)', fontWeight:900, fontSize: isMobile ? 'clamp(2.5rem,11vw,5rem)' : 'clamp(3.5rem,9vw,8rem)', lineHeight:.9, letterSpacing:'-.02em', marginBottom:'1rem', position:'relative', zIndex:2 }}>
          Next<br/><span style={{ color:B.blue }}>Project</span>
        </h2>
        <p className="reveal" style={{ fontFamily:'var(--font-body)', fontSize: isMobile ? '0.95rem' : '1rem', color:B.muted, marginBottom:'2.5rem', position:'relative', zIndex:2 }}>
          See the Nova Collective brand identity case study
        </p>
        <div className="reveal" style={{ display:'flex', justifyContent:'center', gap:'1rem', flexWrap:'wrap', position:'relative', zIndex:2 }}>
          <Link to="/project-nova" className="btn-primary">Nova Collective →</Link>
          <Link to="/projects" className="btn-outline" style={{ borderColor:`rgba(44,75,253,.3)`, color:B.blueHi }}>All Projects</Link>
          <Link to="/contact" className="btn-outline">Start a Project</Link>
        </div>
      </section>

    </div>
  )
}

/* ─────────────────────────────────────────────────────────
   SUB-COMPONENTS
───────────────────────────────────────────────────────── */

// Chapter number + label
function ChNum({ n, label, isMobile, light }) {
  return (
    <div className="reveal" style={{ display:'flex', alignItems:'center', gap:'.8rem', marginBottom: isMobile ? '1.5rem' : '2rem' }}>
      <span style={{ fontFamily:'var(--font-display)', fontWeight:900, fontSize:'1.15rem', color:'transparent', WebkitTextStroke:`1px rgba(44,75,253,.35)`, lineHeight:1 }}>{n}</span>
      <span style={{ display:'block', width:18, height:1, background: light ? 'rgba(255,255,255,.3)' : '#2C4BFD' }}/>
      <span style={{ fontFamily:'var(--font-ui)', fontSize: isMobile ? '0.76rem' : '0.84rem', letterSpacing:'.18em', textTransform:'uppercase', color: light ? 'rgba(255,255,255,.55)' : '#5b78ff' }}>{label}</span>
    </div>
  )
}

// Italic accent word in headings
function Em({ children, isMobile }) {
  return (
    <em style={{ fontFamily:'var(--font-body)', fontStyle:'italic', fontWeight:300, color:'#2C4BFD' }}>
      {children}
    </em>
  )
}

// H2 style helper
function H2(isMobile) {
  return {
    fontFamily:'var(--font-display)', fontWeight:900,
    fontSize: isMobile ? 'clamp(2.4rem,10vw,4rem)' : 'clamp(3rem,7vw,6rem)',
    lineHeight:.9, letterSpacing:'-.01em',
    marginBottom: isMobile ? '2rem' : '3rem',
    color:'#e8edf5',
  }
}
