import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

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

const CHAPTERS = ['hero','brief','challenge','work','videos','results','outcome']
const CHAPTER_LABELS = ['Intro','01 · Brief','02 · Challenge','03 · The Work','04 · Videos','05 · Results','06 · Outcome']

// Rideflow brand palette — deep green + amber accent on dark
const RF = {
  dark:   '#040d08',
  mid:    '#071410',
  green:  '#0f7a3c',
  lime:   '#22c55e',
  amber:  '#f59e0b',
  muted:  '#4a6a55',
  paper:  '#e8f5ee',
  border: 'rgba(34,197,94,.07)',
}

export default function ProjectRideflow() {
  const page      = useReveal()
  const isMobile  = useIsMobile()
  const [active, setActive] = useState(0)
  const [navShow, setNavShow] = useState(false)

  useEffect(() => {
    const heroEl = document.getElementById('rf-hero')
    if (!heroEl) return
    const hObs = new IntersectionObserver(([e]) => setNavShow(!e.isIntersecting), { threshold: 0.2 })
    hObs.observe(heroEl)
    const els = CHAPTERS.map(id => document.getElementById(`rf-${id}`)).filter(Boolean)
    const aObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const i = CHAPTERS.indexOf(e.target.id.replace('rf-',''))
          if (i >= 0) setActive(i)
        }
      })
    }, { threshold: 0.35 })
    els.forEach(el => aObs.observe(el))
    return () => { hObs.disconnect(); aObs.disconnect() }
  }, [])

  const scrollTo = (id) => document.getElementById(`rf-${id}`)?.scrollIntoView({ behavior:'smooth' })

  return (
    <div ref={page} style={{ background: RF.dark, color: RF.paper }}>

      {/* ── CHAPTER DOTS ── */}
      {!isMobile && (
        <div style={{ ...S.chapterNav, opacity: navShow ? 1 : 0, pointerEvents: navShow ? 'auto' : 'none' }}>
          {CHAPTERS.map((id, i) => (
            <div key={id} onClick={() => scrollTo(id)} title={CHAPTER_LABELS[i]} style={{
              ...S.dot,
              background: active===i ? RF.lime : 'rgba(34,197,94,.2)',
              transform: active===i ? 'scale(1.5)' : 'scale(1)',
              boxShadow: active===i ? `0 0 8px ${RF.lime}` : 'none',
            }}/>
          ))}
        </div>
      )}

      {/* ── HERO ── */}
      <section id="rf-hero" style={{
        minHeight: '100vh', display:'grid', placeItems:'center',
        position:'relative', overflow:'hidden', padding: isMobile ? '7rem 1.5rem 4rem' : '8rem 3rem 4rem',
      }}>
        {/* Background */}
        <div style={{ position:'absolute', inset:0, background:`radial-gradient(ellipse 80% 60% at 55% 40%, rgba(15,122,60,.12), transparent 65%), radial-gradient(ellipse 40% 50% at 15% 75%, rgba(34,197,94,.06), transparent 60%), linear-gradient(160deg,${RF.dark} 0%,${RF.mid} 60%,${RF.dark} 100%)` }}/>
        <div style={{ position:'absolute', inset:0, backgroundImage:`linear-gradient(rgba(34,197,94,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(34,197,94,.03) 1px,transparent 1px)`, backgroundSize:'80px 80px' }}/>

        {/* Big watermark */}
        <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', fontFamily:'var(--font-display)', fontWeight:900, fontSize:'clamp(6rem,18vw,18rem)', color:'transparent', WebkitTextStroke:`1px rgba(34,197,94,.04)`, whiteSpace:'nowrap', userSelect:'none', pointerEvents:'none' }}>
          RIDEFLOW
        </div>

        <div style={{ position:'relative', zIndex:2, maxWidth:1200, width:'100%' }}>
          {/* Meta row */}
          <div style={{ ...S.heroMeta, animation:'fadeUp .6s .2s forwards', opacity:0 }}>
            <div style={{ fontFamily:'var(--font-display)', fontWeight:900, fontSize:'4rem', lineHeight:1, color:'transparent', WebkitTextStroke:`1px rgba(34,197,94,.3)` }}>01</div>
            <div style={{ borderLeft:`1px solid rgba(34,197,94,.2)`, paddingLeft:'1.5rem' }}>
              <div style={{ fontFamily:'var(--font-ui)', fontSize: isMobile ? '0.78rem' : '0.88rem', letterSpacing:'.2em', textTransform:'uppercase', color: RF.lime, marginBottom:'.4rem' }}>
                Motion Design · Brand Video · Social Content
              </div>
              <div style={{ fontFamily:'var(--font-ui)', fontSize: isMobile ? '0.72rem' : '0.82rem', color: RF.muted, letterSpacing:'.1em' }}>
                2024 · Frost Production Studio · <a href="https://rideflow.org" target="_blank" rel="noopener noreferrer" style={{ color: RF.lime, textDecoration:'none' }}>rideflow.org</a>
              </div>
            </div>
          </div>

          {/* Title */}
          <h1 style={{ fontFamily:'var(--font-display)', fontWeight:900, fontSize: isMobile ? 'clamp(3.5rem,14vw,6rem)' : 'clamp(4.5rem,13vw,12rem)', lineHeight:.88, letterSpacing:'-.02em', animation:'fadeUp .9s .35s forwards', opacity:0 }}>
            RIDE<br/>
            <em style={{ fontFamily:'var(--font-body)', fontStyle:'italic', color: RF.lime, fontWeight:300 }}>flow</em>
          </h1>

          {/* Tagline */}
          <p style={{ marginTop:'2rem', maxWidth:'44ch', fontFamily:'var(--font-body)', fontSize: isMobile ? '1rem' : '1.1rem', lineHeight:1.85, color:'rgba(232,245,238,.6)', animation:'fadeUp .8s .55s forwards', opacity:0 }}>
            A complete motion content package for Rideflow — a Lagos-based logistics operations platform. Brand films, dashboard walkthroughs, and social content that turned a complex SaaS product into something people actually wanted to watch.
          </p>

          {/* Stats */}
          <div style={{ display:'flex', gap: isMobile ? '1.5rem' : '3rem', marginTop:'3.5rem', paddingTop:'2.5rem', borderTop:`1px solid ${RF.border}`, animation:'fadeUp .8s .7s forwards', opacity:0, flexWrap:'wrap' }}>
            {[['4','Videos Produced'],['3','Content Formats'],['10+','Happy Clients'],['2024','Year']].map(([v,k]) => (
              <div key={k}>
                <div style={{ fontFamily:'var(--font-display)', fontWeight:900, fontSize: isMobile ? '2rem' : '2.4rem', lineHeight:1, color: RF.paper }}>{v}</div>
                <div style={{ fontFamily:'var(--font-ui)', fontSize:'0.78rem', letterSpacing:'.15em', textTransform:'uppercase', color: RF.muted, marginTop:'.3rem' }}>{k}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll hint */}
        <div style={{ position:'absolute', bottom:'3rem', left:'50%', transform:'translateX(-50%)', display:'flex', flexDirection:'column', alignItems:'center', gap:'.8rem', animation:'fadeUp .8s 1.1s forwards', opacity:0 }}>
          <div style={{ width:1, height:50, background:`linear-gradient(to bottom, ${RF.lime}, transparent)`, animation:'scrollArrow 2s 1.3s infinite' }}/>
          <span style={{ fontFamily:'var(--font-ui)', fontSize:'0.72rem', letterSpacing:'.25em', textTransform:'uppercase', color: RF.muted }}>Scroll to explore</span>
        </div>
      </section>

      {/* ── 01 · BRIEF ── */}
      <section id="rf-brief" style={sectionStyle(RF.dark)}>
        <ChapterHeader num="01" label="The Brief" title={<>The<br/><em style={{ color: RF.lime }}>Brief</em></>} rf isMobile={isMobile} />
        <div style={{ display:'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap:'4rem', alignItems:'start' }}>
          <div className="reveal">
            <div style={{ fontFamily:'var(--font-body)', fontSize:'1.05rem', lineHeight:2, color:'rgba(232,245,238,.65)' }}>
              <p>Rideflow came to Frost Production Studio with a straightforward challenge — they had built an excellent logistics operations platform, but the product was complex, and no one could see its power from the outside. Potential clients didn't understand it. The team needed video content that could make a dense, feature-rich SaaS product feel immediate, human, and compelling.</p>
              <p style={{ marginTop:'1.2rem' }}>The brief: create a suite of video content — from a flagship brand film to social-first clips — that could live across the website, X (Twitter), and LinkedIn. Every piece needed to communicate speed, clarity, and control: the three things Rideflow gives logistics operators that nothing else does.</p>
            </div>
            <blockquote style={{ fontFamily:'var(--font-body)', fontStyle:'italic', fontSize: isMobile ? '1.2rem' : '1.6rem', lineHeight:1.35, color: RF.paper, marginTop:'2rem', paddingLeft:'1.5rem', borderLeft:`2px solid ${RF.lime}` }}>
              "Before Rideflow, managing orders and drivers felt chaotic."
              <footer style={{ marginTop:'.8rem', fontFamily:'var(--font-ui)', fontSize:'0.82rem', color: RF.muted, fontStyle:'normal' }}>— Rideflow.org</footer>
            </blockquote>
          </div>
          <div className="reveal d1">
            {[
              ['Client',        'Rideflow'],
              ['Website',       'rideflow.org'],
              ['Industry',      'Logistics SaaS / Transport Tech'],
              ['Delivered by',  'Richard Amune — Frost Production Studio'],
              ['Scope',         'Brand Film · Dashboard Demo · Social Content · Video Editing'],
              ['Platform',      'Website · X (Twitter) · LinkedIn'],
              ['Year',          '2024'],
            ].map(([k,v]) => (
              <div key={k} style={{ padding:'1.2rem 1.4rem', border:`1px solid ${RF.border}`, marginBottom:2, background:'rgba(34,197,94,.02)' }}>
                <div style={{ fontFamily:'var(--font-ui)', fontSize:'0.78rem', letterSpacing:'.18em', textTransform:'uppercase', color: RF.muted, marginBottom:'.5rem' }}>{k}</div>
                <div style={{ fontFamily:'var(--font-body)', fontSize:'0.98rem', color: RF.paper }}>
                  {k === 'Website'
                    ? <a href="https://rideflow.org" target="_blank" rel="noopener noreferrer" style={{ color: RF.lime, textDecoration:'none' }}>{v}</a>
                    : v
                  }
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 02 · CHALLENGE ── */}
      <section id="rf-challenge" style={sectionStyle(RF.mid)}>
        <ChapterHeader num="02" label="The Challenge" title={<>The<br/><em style={{ color: RF.amber }}>Challenge</em></>} rf isMobile={isMobile} />
        <div style={{ display:'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3,1fr)', gap:2, marginTop:'1rem' }}>
          {[
            ['📦', 'Complex Product', 'Rideflow manages drivers, fleets, orders, compliance documents, and analytics — all in one platform. Showing all of this without losing the viewer in 90 seconds required precise editorial choices.'],
            ['🎯', 'Multiple Audiences', 'The content needed to speak to logistics managers, operations directors, and individual dispatch operators — each with different concerns, vocabulary, and viewing habits.'],
            ['⚡', 'Speed & Clarity', "Logistics is a fast-moving industry. The videos had to feel as fast and efficient as Rideflow itself — no wasted frames, no padding. Every second had to earn its place."],
          ].map(([icon, title, body]) => (
            <div key={title} className="reveal" style={{ background:'rgba(34,197,94,.04)', border:`1px solid ${RF.border}`, padding:'2rem 1.8rem' }}>
              <div style={{ fontSize:'2rem', marginBottom:'1rem' }}>{icon}</div>
              <div style={{ fontFamily:'var(--font-body)', fontStyle:'italic', fontSize:'1.2rem', color: RF.paper, marginBottom:'.8rem' }}>{title}</div>
              <div style={{ fontFamily:'var(--font-body)', fontSize:'0.95rem', lineHeight:1.85, color: RF.muted }}>{body}</div>
            </div>
          ))}
        </div>

        {/* Platform logos / social stats strip */}
        <div className="reveal" style={{ display:'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4,1fr)', gap:2, marginTop:'4rem', background:`rgba(34,197,94,.05)`, borderTop:`1px solid ${RF.border}` }}>
          {[
            ['rideflow.org', 'Website', '🌐'],
            ['X / Twitter', 'Primary Platform', '𝕏'],
            ['Logistics SaaS', 'Industry', '🏭'],
            ['2024', 'Production Year', '📅'],
          ].map(([v,k,icon]) => (
            <div key={k} style={{ padding:'1.8rem 1.5rem', textAlign:'center', borderRight:`1px solid ${RF.border}` }}>
              <div style={{ fontSize:'1.6rem', marginBottom:'.5rem' }}>{icon}</div>
              <div style={{ fontFamily:'var(--font-display)', fontWeight:800, fontSize:'1rem', color: RF.paper, marginBottom:'.3rem' }}>{v}</div>
              <div style={{ fontFamily:'var(--font-ui)', fontSize:'0.75rem', letterSpacing:'.15em', textTransform:'uppercase', color: RF.muted }}>{k}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 03 · THE WORK ── */}
      <section id="rf-work" style={sectionStyle(RF.dark)}>
        <ChapterHeader num="03" label="The Approach" title={<>The<br/><em style={{ color: RF.lime }}>Work</em></>} rf isMobile={isMobile} />

        {/* Work process timeline */}
        <div style={{ position:'relative', paddingLeft:'2rem', marginTop:'2rem', borderLeft:`1px solid ${RF.lime}` }}>
          {[
            {
              phase: 'Phase 1 — Strategy & Scripting',
              body: 'Before any footage or motion was touched, the content strategy was mapped. Four distinct content pillars were identified: brand awareness (the flagship film), product demonstration (the dashboard walkthrough), social proof (testimonials & quick wins), and engagement (short-form social content). Each video was scripted to a specific length and CTA.',
              grads: [
                `linear-gradient(135deg,${RF.dark} 0%,${RF.mid} 50%,rgba(15,122,60,.6) 100%)`,
                `linear-gradient(135deg,${RF.mid} 0%,rgba(245,158,11,.2) 100%)`,
              ],
              labels: ['Strategy Map', 'Script Draft'],
            },
            {
              phase: 'Phase 2 — Motion Design & Editing',
              body: "The brand film was built around Rideflow's core promise: control. Every cut, transition, and motion graphic was timed to feel decisive — nothing floated, nothing lingered. The dashboard workflow video used screen recordings layered with motion annotations to make the UX immediately legible to a first-time viewer.",
              grads: [
                `linear-gradient(135deg,${RF.dark} 0%,rgba(15,122,60,.8) 100%)`,
                `linear-gradient(135deg,${RF.mid} 0%,rgba(34,197,94,.5) 100%)`,
                `linear-gradient(135deg,${RF.dark} 0%,rgba(245,158,11,.4) 100%)`,
              ],
              labels: ['Brand Film Edit', 'Dashboard Demo', 'Motion Graphics'],
              cols: 3,
            },
            {
              phase: 'Phase 3 — Social Content Cuts',
              body: 'From the flagship footage, short-form social cuts were crafted for X/Twitter. These were optimised for autoplay — meaning the first 3 seconds had to be visually arresting without sound. Captions, motion titles, and looping edits were added for the platform.',
              grads: [
                `linear-gradient(135deg,${RF.mid} 0%,rgba(34,197,94,.4) 100%)`,
                `linear-gradient(135deg,${RF.dark} 0%,rgba(245,158,11,.5) 100%)`,
              ],
              labels: ['Social Cut A', 'Social Cut B'],
            },
          ].map((item, i) => (
            <div key={i} className="reveal" style={{ position:'relative', paddingBottom:'4rem', paddingLeft:'3rem', paddingTop:'.4rem' }}>
              {/* Timeline dot */}
              <div style={{ position:'absolute', left:-4, top:'.4rem', width:9, height:9, borderRadius:'50%', background: RF.lime, boxShadow:`0 0 12px ${RF.lime}` }}/>
              <div style={{ fontFamily:'var(--font-ui)', fontSize:'0.82rem', letterSpacing:'.2em', textTransform:'uppercase', color: RF.lime, marginBottom:'.6rem' }}>{item.phase}</div>
              <div style={{ fontFamily:'var(--font-body)', fontSize:'0.98rem', lineHeight:1.9, color: RF.muted, maxWidth:'54ch' }}>{item.body}</div>
              {/* Visual swatches */}
              <div style={{ display:'grid', gridTemplateColumns:`repeat(${item.cols||2},1fr)`, gap:2, marginTop:'1.8rem' }}>
                {item.grads.map((g, j) => (
                  <div key={j} style={{ aspectRatio:'16/9', background:g, position:'relative' }}>
                    <span style={{ position:'absolute', bottom:'.8rem', left:'.8rem', fontFamily:'var(--font-ui)', fontSize:'0.72rem', letterSpacing:'.12em', textTransform:'uppercase', color:'rgba(232,245,238,.35)', background:'rgba(0,0,0,.5)', padding:'.2rem .6rem' }}>{item.labels[j]}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 04 · VIDEOS ── */}
      <section id="rf-videos" style={sectionStyle(RF.mid)}>
        <ChapterHeader num="04" label="Watch the Work" title={<>The<br/><em style={{ color: RF.lime }}>Videos</em></>} rf isMobile={isMobile} />
        <p className="reveal" style={{ fontFamily:'var(--font-body)', fontSize:'1.05rem', color: RF.muted, maxWidth:'52ch', marginBottom:'3rem', lineHeight:1.8 }}>
          All four videos produced for Rideflow — click to watch on X (Twitter). Each one was crafted for a specific moment in the customer journey.
        </p>

        <div style={{ display:'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2,1fr)', gap:2 }}>
          {[
            {
              num: '01',
              title: 'Brand Film — Main',
              desc: 'The flagship video introducing Rideflow to the world. Designed to live on the homepage and anchor the brand narrative. Shows the chaos of logistics without Rideflow — and the control that comes with it.',
              url: 'https://x.com/RideflowHQ/status/2046248124822200492',
              tag: 'Brand Film',
              grad: `linear-gradient(160deg,${RF.dark} 0%,rgba(15,122,60,.6) 50%,${RF.lime} 100%)`,
              duration: '~60s',
              platform: 'Website · Social',
            },
            {
              num: '02',
              title: 'Dashboard Workflow Walkthrough',
              desc: 'A deep-dive into the Rideflow dashboard — showing how operations managers track orders, assign drivers, and monitor fleet health in real time. Built for prospects who are evaluating the product.',
              url: 'https://x.com/RideflowHQ/status/2024873718342651984',
              tag: 'Product Demo',
              grad: `linear-gradient(160deg,${RF.dark} 0%,rgba(245,158,11,.25) 50%,rgba(245,158,11,.5) 100%)`,
              duration: '~90s',
              platform: 'Website · LinkedIn',
            },
            {
              num: '03',
              title: 'Video Edit — Social Cut',
              desc: 'A punchy, social-optimised cut built for autoplay performance on X. Tight editing rhythm, motion titles, and no reliance on sound for the first 5 seconds. Made to stop thumbs mid-scroll.',
              url: 'https://x.com/RideflowHQ/status/2049165403994075517',
              tag: 'Video Edit',
              grad: `linear-gradient(160deg,${RF.dark} 0%,rgba(34,197,94,.3) 50%,rgba(15,122,60,.8) 100%)`,
              duration: '~30s',
              platform: 'X / Twitter',
            },
            {
              num: '04',
              title: 'Social Media Content',
              desc: 'A short-form social video created specifically for top-of-funnel awareness. Fast, visual, and brand-led — designed to introduce Rideflow to new audiences who have never heard of the product.',
              url: 'https://x.com/RideflowHQ/status/2049910818536386573',
              tag: 'Social Content',
              grad: `linear-gradient(160deg,${RF.mid} 0%,rgba(34,197,94,.2) 40%,rgba(245,158,11,.3) 100%)`,
              duration: '~20s',
              platform: 'X · Instagram',
            },
          ].map((v) => (
            <div key={v.num} className="reveal" style={{ background:`rgba(34,197,94,.03)`, border:`1px solid ${RF.border}`, display:'flex', flexDirection:'column' }}>
              {/* Thumbnail */}
              <a href={v.url} target="_blank" rel="noopener noreferrer" style={{ display:'block', position:'relative', aspectRatio:'16/9', overflow:'hidden', textDecoration:'none' }}>
                <div style={{ width:'100%', height:'100%', background: v.grad }}/>
                {/* Play overlay */}
                <div style={{ position:'absolute', inset:0, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:'1rem', background:'rgba(4,13,8,.3)', transition:'background .3s' }}>
                  <div style={{ width:64, height:64, borderRadius:'50%', border:`1.5px solid rgba(232,245,238,.4)`, display:'flex', alignItems:'center', justifyContent:'center' }}>
                    <svg width="24" viewBox="0 0 24 24" fill={RF.paper} style={{ marginLeft:3 }}><path d="M8 5v14l11-7z"/></svg>
                  </div>
                  <span style={{ fontFamily:'var(--font-ui)', fontSize:'0.78rem', letterSpacing:'.2em', textTransform:'uppercase', color:'rgba(232,245,238,.5)' }}>Watch on X →</span>
                </div>
                {/* Number */}
                <div style={{ position:'absolute', top:'1rem', left:'1rem', fontFamily:'var(--font-display)', fontWeight:900, fontSize:'3rem', color:'rgba(232,245,238,.06)', lineHeight:1 }}>{v.num}</div>
                {/* Tag */}
                <div style={{ position:'absolute', top:'1rem', right:'1rem', background:`rgba(34,197,94,.2)`, border:`1px solid rgba(34,197,94,.3)`, padding:'.3rem .8rem', fontFamily:'var(--font-ui)', fontSize:'0.72rem', letterSpacing:'.12em', textTransform:'uppercase', color: RF.lime }}>
                  {v.tag}
                </div>
              </a>
              {/* Info */}
              <div style={{ padding:'1.6rem', flex:1, display:'flex', flexDirection:'column', gap:'.6rem' }}>
                <div style={{ fontFamily:'var(--font-display)', fontWeight:800, fontSize:'1.15rem', color: RF.paper }}>{v.title}</div>
                <div style={{ fontFamily:'var(--font-body)', fontSize:'0.95rem', lineHeight:1.75, color: RF.muted, flex:1 }}>{v.desc}</div>
                <div style={{ display:'flex', gap:'1rem', marginTop:'.8rem', paddingTop:'.8rem', borderTop:`1px solid ${RF.border}` }}>
                  <span style={{ fontFamily:'var(--font-ui)', fontSize:'0.78rem', letterSpacing:'.1em', textTransform:'uppercase', color: RF.muted }}>⏱ {v.duration}</span>
                  <span style={{ fontFamily:'var(--font-ui)', fontSize:'0.78rem', letterSpacing:'.1em', textTransform:'uppercase', color: RF.muted }}>📡 {v.platform}</span>
                </div>
                <a href={v.url} target="_blank" rel="noopener noreferrer" style={{ marginTop:'.5rem', display:'inline-flex', alignItems:'center', gap:'.5rem', fontFamily:'var(--font-ui)', fontSize:'0.85rem', letterSpacing:'.1em', textTransform:'uppercase', color: RF.lime, textDecoration:'none' }}>
                  Watch on X ↗
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 05 · RESULTS ── */}
      <section id="rf-results" style={sectionStyle(RF.dark)}>
        <ChapterHeader num="05" label="Deliverables" title={<>What Was<br/><em style={{ color: RF.lime }}>Delivered</em></>} rf isMobile={isMobile} />
        <div style={{ display:'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(3,1fr)', gap:2, marginTop:'1rem' }}>
          {[
            { icon:'🎬', title:'Brand Film', desc:'Flagship 60s video for homepage and social distribution' },
            { icon:'🖥', title:'Dashboard Demo', desc:'90s product walkthrough showing the full Rideflow workflow' },
            { icon:'✂️', title:'Video Edit', desc:'Social-first cut with motion titles and captions for X' },
            { icon:'📱', title:'Social Content', desc:'Short-form awareness video for top-of-funnel distribution' },
            { icon:'🎨', title:'Motion Graphics', desc:'Custom animated lower thirds, titles, and transition elements' },
            { icon:'🎯', title:'Platform Optimisation', desc:'Each video formatted and exported for its specific platform' },
          ].map(d => (
            <div key={d.title} className="reveal" style={{ padding:'2rem 1.8rem', border:`1px solid ${RF.border}`, background:`rgba(34,197,94,.02)` }}>
              <div style={{ fontSize:'2rem', marginBottom:'1rem' }}>{d.icon}</div>
              <div style={{ fontFamily:'var(--font-display)', fontWeight:800, fontSize:'1.1rem', color: RF.paper, marginBottom:'.6rem' }}>{d.title}</div>
              <div style={{ fontFamily:'var(--font-body)', fontSize:'0.92rem', lineHeight:1.75, color: RF.muted }}>{d.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 06 · OUTCOME ── */}
      <section id="rf-outcome" style={{ ...sectionStyle(RF.dark), background: RF.green, color:'#fff' }}>
        <ChapterHeader num="06" label="Results & Impact" title={<>The<br/><em style={{ color:'rgba(255,255,255,.5)' }}>Outcome</em></>} rf light isMobile={isMobile} />

        <div style={{ display:'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4,1fr)', gap:2, marginBottom:'4rem', background:'rgba(0,0,0,.15)' }}>
          {[
            ['4', 'Videos Produced', 'Full suite delivered'],
            ['10+', 'Happy Clients', 'Already onboard at launch'],
            ['95%', 'On-Time Delivery', 'Their platform benchmark'],
            ['2024', 'Live & Growing', 'rideflow.org'],
          ].map(([v,k,c]) => (
            <div key={k} style={{ padding:'2.5rem 2rem', textAlign:'center', background: RF.green }}>
              <div style={{ fontFamily:'var(--font-display)', fontWeight:900, fontSize: isMobile ? '3rem' : '4rem', lineHeight:1, color:'#fff' }}>{v}</div>
              <div style={{ fontFamily:'var(--font-ui)', fontSize:'0.82rem', letterSpacing:'.18em', textTransform:'uppercase', color:'rgba(255,255,255,.55)', marginTop:'.5rem' }}>{k}</div>
              <div style={{ fontFamily:'var(--font-body)', fontSize:'0.85rem', color:'rgba(255,255,255,.4)', marginTop:'.4rem' }}>{c}</div>
            </div>
          ))}
        </div>

        <div style={{ maxWidth:700, margin:'0 auto', textAlign:'center', padding: isMobile ? '0' : '0 2rem' }}>
          <p style={{ fontFamily:'var(--font-body)', fontStyle:'italic', fontSize: isMobile ? '1.2rem' : 'clamp(1.3rem,2.5vw,1.8rem)', lineHeight:1.5, color:'#fff', marginBottom:'1.8rem' }}>
            "Before Rideflow, managing orders and drivers felt chaotic. Now every part of our operation is in one place."
          </p>
          <p style={{ fontFamily:'var(--font-ui)', fontSize:'0.85rem', letterSpacing:'.18em', textTransform:'uppercase', color:'rgba(255,255,255,.5)' }}>
            — Rideflow.org
          </p>
          <div style={{ marginTop:'2rem' }}>
            <a href="https://rideflow.org" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ display:'inline-flex', background:'rgba(255,255,255,.15)', border:'1px solid rgba(255,255,255,.3)', borderRadius:0 }}>
              Visit Rideflow.org ↗
            </a>
          </div>
        </div>
      </section>

      {/* ── NEXT PROJECT ── */}
      <section style={{ ...sectionStyle(RF.dark), textAlign:'center', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', inset:0, background:`radial-gradient(ellipse 60% 50% at 50% 50%, rgba(34,197,94,.04), transparent 70%)` }}/>
        <p className="reveal" style={{ fontFamily:'var(--font-ui)', fontSize:'0.85rem', letterSpacing:'.25em', textTransform:'uppercase', color: RF.muted, marginBottom:'1.5rem' }}>You've reached the end</p>
        <h2 className="reveal" style={{ fontFamily:'var(--font-display)', fontWeight:900, fontSize: isMobile ? 'clamp(3rem,12vw,6rem)' : 'clamp(3.5rem,9vw,8rem)', lineHeight:.9, letterSpacing:'-.02em', marginBottom:'1rem' }}>
          Next<br/><span style={{ color: RF.lime }}>Project</span>
        </h2>
        <p className="reveal" style={{ fontFamily:'var(--font-body)', fontSize:'1rem', color: RF.muted, marginBottom:'3rem' }}>See the Nova Collective brand identity →</p>
        <div className="reveal" style={{ display:'flex', justifyContent:'center', gap:'1rem', flexWrap:'wrap' }}>
          <Link to="/project-nova" className="btn-primary" style={{ background: RF.green }}>Nova Collective →</Link>
          <Link to="/projects" className="btn-outline" style={{ borderColor:`rgba(34,197,94,.25)`, color: RF.lime }}>All Projects</Link>
          <Link to="/contact" className="btn-outline" style={{ borderColor:'rgba(232,237,245,.18)', color: RF.paper }}>Start a Project</Link>
        </div>
      </section>
    </div>
  )
}

/* ── Chapter header sub-component ── */
function ChapterHeader({ num, label, title, rf, light, isMobile }) {
  const lime = '#22c55e'
  const accent = light ? 'rgba(255,255,255,.4)' : lime
  return (
    <div style={{ display:'flex', alignItems:'flex-start', gap: isMobile ? '1rem' : '3rem', marginBottom:'5rem', flexDirection: isMobile ? 'column' : 'row' }}>
      <div className="reveal" style={{ fontFamily:'var(--font-display)', fontWeight:900, fontSize: isMobile ? '4rem' : '6rem', lineHeight:.85, color:'transparent', WebkitTextStroke:`1px rgba(34,197,94,.08)`, flexShrink:0, userSelect:'none' }}>
        {num}
      </div>
      <div>
        <div className="reveal d1" style={{ fontFamily:'var(--font-ui)', fontSize:'0.82rem', letterSpacing:'.25em', textTransform:'uppercase', color: accent, display:'flex', alignItems:'center', gap:'.8rem', marginBottom:'.8rem' }}>
          <span style={{ display:'block', width:20, height:1, background: accent }}/>
          {label}
        </div>
        <h2 className="reveal d2" style={{ fontFamily:'var(--font-display)', fontWeight:900, fontSize: isMobile ? 'clamp(2.5rem,9vw,4.5rem)' : 'clamp(3rem,7vw,6rem)', lineHeight:.9, letterSpacing:'-.01em', color: light ? '#fff' : '#e8f5ee' }}>
          {title}
        </h2>
      </div>
    </div>
  )
}

const sectionStyle = (bg) => ({
  padding:'7rem 3rem',
  borderTop:'1px solid rgba(34,197,94,.07)',
  background: bg,
  '@media(maxWidth:768px)': { padding:'5rem 1.5rem' },
})

const S = {
  chapterNav: { position:'fixed', right:'2.5rem', top:'50%', zIndex:400, transform:'translateY(-50%)', display:'flex', flexDirection:'column', gap:'.8rem', transition:'opacity .4s' },
  dot: { width:6, height:6, borderRadius:'50%', cursor:'none', transition:'all .3s' },
  heroMeta: { display:'flex', alignItems:'center', gap:'2rem', marginBottom:'2.5rem' },
}
