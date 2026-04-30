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

const CHAPTERS = ['hero','brief','discovery','concept','development','refinement','delivery','outcome']
const CHAPTER_LABELS = ['Intro','01 · Brief','02 · Discovery','03 · Concept','04 · Development','05 · Refinement','06 · Delivery','07 · Outcome']

const FEEDBACK = [
  { round:'Round 1', note:<>Logo reveal is <strong style={{color:'var(--ice)',fontWeight:400}}>too fast</strong> — the first frame disappears before we've registered it. The typography feels too mechanical; can we get closer to the static identity's warmth?</>, status:'Resolved', resolved:true },
  { round:'Round 2', note:<>The timing feels right now. The <strong style={{color:'var(--ice)',fontWeight:400}}>colour temperature</strong> is still cold — we're losing the blue tones from the brand palette. Transition library also needs shorter hold frames.</>, status:'Resolved', resolved:true },
  { round:'Round 3', note:<>Love the colour. The <strong style={{color:'var(--ice)',fontWeight:400}}>lower thirds entry</strong> animation conflicts with the logo direction — one goes left-to-right, the other right-to-left. Pick a direction and commit.</>, status:'Applied', resolved:false },
  { round:'Round 4', note:<>Can we make the logo sting available in a <strong style={{color:'var(--ice)',fontWeight:400}}>dark AND light version</strong>? Also — the brand film music is too cinematic; it makes us sound bigger than we are right now.</>, status:'Resolved', resolved:true },
  { round:'Round 5', note:<>Can the social templates have <strong style={{color:'var(--ice)',fontWeight:400}}>animated borders</strong> instead of static ones? And is it possible to export these as Lottie files so the dev team can use them in the web app?</>, status:'Applied', resolved:false },
  { round:'Round 6', note:<>Nearly there. The only thing left: the <strong style={{color:'var(--ice)',fontWeight:400}}>exit animation</strong> on the lower thirds — it currently disappears, but we'd like it to feel like it's being filed away, not deleted.</>, status:'Resolved', resolved:true },
]

const RESULT_CELLS = [
  { bg:'linear-gradient(135deg,#04080f 0%,#1e6fff 100%)', label:'Logo Sting — Dark' },
  { bg:'linear-gradient(135deg,#060c18 0%,#7aa8e8 100%)', label:'Logo Sting — Light' },
  { bg:'linear-gradient(135deg,#04080f 0%,#0044cc 100%)', label:'Lower Third System' },
  { bg:'linear-gradient(135deg,#030a14 0%,#4a90d9 100%)', label:'Transition Library' },
  { bg:'linear-gradient(135deg,#04080f 0%,#6644cc 100%)', label:'Social Templates' },
  { bg:'linear-gradient(135deg,#060c18 0%,#1e3a6e 100%)', label:'Motion Guidelines' },
]

export default function ProjectNova() {
  const page = useReveal()
  const [activeDot, setActiveDot] = useState(0)
  const [navVisible, setNavVisible] = useState(false)

  // Chapter dot scroll observer
  useEffect(() => {
    const heroEl = document.getElementById('hero')
    if (!heroEl) return
    const heroObs = new IntersectionObserver(([e]) => setNavVisible(!e.isIntersecting), { threshold: 0.2 })
    heroObs.observe(heroEl)

    const els = CHAPTERS.map(id => document.getElementById(id)).filter(Boolean)
    const activeObs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const i = CHAPTERS.indexOf(e.target.id)
          if (i >= 0) setActiveDot(i)
        }
      })
    }, { threshold: 0.4 })
    els.forEach(el => activeObs.observe(el))

    return () => { heroObs.disconnect(); activeObs.disconnect() }
  }, [])

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <div ref={page}>
      {/* CHAPTER NAV DOTS */}
      <div style={{ ...S.chapterNav, opacity: navVisible ? 1 : 0, pointerEvents: navVisible ? 'auto' : 'none' }}>
        {CHAPTERS.map((id, i) => (
          <div
            key={id}
            onClick={() => scrollTo(id)}
            style={{ ...S.dot, background: activeDot === i ? 'var(--accent)' : 'rgba(232,237,245,.15)', transform: activeDot === i ? 'scale(1.4)' : 'scale(1)' }}
            title={CHAPTER_LABELS[i]}
          />
        ))}
      </div>

      {/* ── HERO ── */}
      <section id="hero" style={S.heroSection}>
        <div style={S.heroBg} />
        <div style={S.heroGrid} />
        <div style={S.heroInner}>
          <div style={{ ...S.heroMeta, animation:'fadeUp .6s .2s forwards', opacity:0 }}>
            <div style={S.heroIndex}>01</div>
            <div style={{ borderLeft:'1px solid rgba(30,111,255,.2)', paddingLeft:'1.5rem' }}>
              <div style={S.heroCategory}>Brand Identity · Motion</div>
              <div style={S.heroDate}>Jan — Mar 2024 · 12 weeks · Frost Production Studio</div>
            </div>
          </div>
          <h1 style={{ ...S.heroTitle, animation:'fadeUp .9s .35s forwards', opacity:0 }}>
            Nova<br/>
            <em style={{ fontFamily:'var(--font-body)', fontStyle:'italic', color:'var(--accent)', fontWeight:300 }}>Collective</em>
          </h1>
          <p style={{ ...S.heroTagline, animation:'fadeUp .8s .55s forwards', opacity:0 }}>
            A complete motion identity system for a Berlin-based creative studio — from first brief to final delivery.
            The full story of how an abstract idea became a living brand in motion, crafted by Richard Amune at Frost Production Studio.
          </p>
          <div style={{ ...S.heroStats, animation:'fadeUp .8s .7s forwards', opacity:0 }}>
            {[['12','Weeks'],['340+','Frames'],['6','Revisions'],['28','Deliverables']].map(([v,k]) => (
              <div key={k}>
                <div style={S.hstatVal}>{v}</div>
                <div style={S.hstatKey}>{k}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={S.scrollHint}>
          <div style={S.scrollArrow} />
          <span style={{ fontFamily:'var(--font-ui)', fontSize:'0.88rem', letterSpacing:'.25em', textTransform:'uppercase', color:'var(--muted)' }}>Scroll to explore</span>
        </div>
      </section>

      {/* ── 01 BRIEF ── */}
      <section id="brief" style={S.chapter}>
        <ChapterHeader num="01" label="The Starting Point" title={<>The<br/><em>Brief</em></>} />
        <div style={S.briefLayout}>
          <div className="reveal">
            <div style={S.briefBody}>
              <p>Nova Collective came to Frost Production Studio in December 2023 with a clear problem: they were a world-class creative studio with a name that promised something special, but their brand moved like it was standing still. Static logos, generic typefaces, motion that felt borrowed rather than owned.</p>
              <p style={{marginTop:'1.2rem'}}>The ask was ambitious — build a complete motion identity system that could scale from a 3-second logo sting to a 90-second brand film. Everything needed to feel like it was in conversation: the easing curves, the typographic rhythm, the way colour appeared and disappeared.</p>
              <p style={{marginTop:'1.2rem'}}>They had just rebranded their visual identity and needed motion to be the primary expression of the new direction — not a translation of it, but the real thing.</p>
            </div>
            <blockquote style={S.briefPull}>
              "We want people to watch our logo and feel something they can't quite name."
              <footer style={{ marginTop:'.8rem', fontFamily:'var(--font-ui)', fontSize:'0.9rem', color:'var(--muted)', fontStyle:'normal' }}>— Léa Sørensen, Creative Director, Nova Collective</footer>
            </blockquote>
          </div>
          <div className="reveal d1">
            {[
              ['Client','Nova Collective GmbH'],
              ['Studio Location','Berlin-Mitte, Germany'],
              ['Delivered by','Richard Amune — Frost Production Studio'],
              ['Tools','After Effects · Cinema 4D · DaVinci Resolve'],
              ['Budget Range','€ 38,000 — €45,000'],
              ['Timeline','12 weeks · Jan 8 — Mar 28, 2024'],
              ['Format','ProRes 4444, H.264, After Effects source'],
            ].map(([k,v]) => (
              <div key={k} style={S.sidebarBlock}>
                <div style={S.sidebarKey}>{k}</div>
                <div style={S.sidebarVal}>{v}</div>
              </div>
            ))}
            <div style={S.sidebarBlock}>
              <div style={S.sidebarKey}>Scope of Work</div>
              <div style={{ display:'flex', flexWrap:'wrap', gap:'.4rem', marginTop:'.5rem' }}>
                {['Logo Animation','Brand Film','Motion Guidelines','Social Templates','Lower Thirds','Transition Library'].map(t => (
                  <span key={t} style={S.tag}>{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 02 DISCOVERY ── */}
      <section id="discovery" style={{ ...S.chapter, background:'#030710' }}>
        <ChapterHeader num="02" label="Research & Immersion" title={<>Dis<em>covery</em></>} />
        <div className="reveal" style={S.discGrid}>
          {[
            ['A','Competitive Audit','Analysed the motion identities of 22 studios in the same tier as Nova — from Tokyo to Zurich. Mapped common patterns: overuse of elastic easing, predictable logo reveals, colour-first rather than form-first thinking. The white space in the market was clear.'],
            ['B','Brand Archaeology','Dug into Nova\'s three-year history of work. Found recurring motifs they didn\'t know they had: a preference for radial compositions, a tension between organic forms and rigid grids, a consistent use of negative space as a storytelling device.'],
            ['C','Stakeholder Workshops','Two half-day sessions with the founding team using card-sorting and motion reference exercises. Asked them to react to 60 clips in 30 seconds each. The results were consistent: they responded to weight, restraint, and inevitability.'],
          ].map(([num,title,body]) => (
            <div key={num} style={S.discCard}>
              <div style={S.discNum}>{num}</div>
              <div style={S.discTitle}>{title}</div>
              <div style={S.discBody}>{body}</div>
            </div>
          ))}
        </div>
        <div className="reveal d2" style={S.researchBoard}>
          {[
            { cls:'linear-gradient(160deg,#04080f 0%,#0a1428 60%,#1e6fff 100%)', label:'Reference — Material Weight', span:2 },
            { cls:'linear-gradient(135deg,#04080f 0%,#091828 60%,#4a90d9 100%)', label:'Reference — Cosmic Scale' },
            { cls:'linear-gradient(135deg,#030810 0%,#061020 60%,#7aa8e8 100%)', label:'Reference — Tension' },
            { cls:'linear-gradient(135deg,#06040f 0%,#100828 60%,#6644cc 100%)', label:'Reference — Organic Rhythm' },
            { cls:'linear-gradient(135deg,#040c1a 0%,#061828 60%,#0044cc 100%)', label:'Reference — Deep Space' },
          ].map(({ cls,label,span },i) => (
            <div key={i} style={{ ...S.boardCell, background:cls, gridRow: i===0 ? 'span 2' : 'auto', minHeight: i===0 ? 320 : 'unset', aspectRatio: i===0 ? 'unset' : '4/3' }}>
              <span style={S.boardLabel}>{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── 03 CONCEPT ── */}
      <section id="concept" style={{ ...S.chapter, background:'var(--paper)', color:'var(--ink)' }}>
        <ChapterHeader num="03" label="Ideation & Direction" title={<>The<br/><em style={{color:'var(--accent)'}}>Concept</em></>} light />
        <p className="reveal" style={S.conceptIntro}>
          Three distinct directions were developed, each grounded in the research findings. One would be chosen — but all three had to be good enough to defend.
        </p>
        {/* Sketch grid */}
        <div className="reveal d1" style={S.sketchGrid}>
          {['Radial Core','Triangular Form','Nested Grid','Fluid Lens'].map((label,i) => (
            <div key={i} style={{ ...S.sketchItem, background: ['linear-gradient(135deg,#c8d8f0,#a8c0e8)','linear-gradient(135deg,#b8cce8,#98b8e0)','linear-gradient(135deg,#ccd8f0,#b0c8ec)','linear-gradient(135deg,#a8bce0,#90acd8)'][i] }}>
              <div style={S.sketchLabel}>Sketch 0{i+1} — {label}</div>
            </div>
          ))}
        </div>
        {/* Directions */}
        <div className="reveal d2" style={S.directionsGrid}>
          {[
            { dir:'A', title:'GRAVITY', body:'Every element moves as if it has mass. Reveals are slow, weighted, inevitable. Inspired by planetary systems — things that orbit, attract, collapse into form.', swatches:['#04080f','#0d1a3a','#4a90d9','#e8edf5'], chosen:false },
            { dir:'B', title:'SIGNAL',  body:'Motion as information. Clean, precise, purposeful — like data becoming visible. Elements don\'t decorate, they communicate. The feeling: we see things other people miss.', swatches:['#04080f','#0d1a3a','#1e6fff','#e8edf5'], chosen:true },
            { dir:'C', title:'TERRAIN', body:'Organic, textured, ground-level. Motion inspired by natural processes — erosion, growth, sedimentation. Tactile and cool, with analogue artefacts.', swatches:['#060c18','#0a1830','#7aa8e8','#c8d8f0'], chosen:false },
          ].map(({ dir,title,body,swatches,chosen }) => (
            <div key={dir} style={{ ...S.dirCard, ...(chosen ? S.dirCardChosen : {}) }}>
              {chosen && <div style={S.chosenMark}>✓ Selected</div>}
              <div style={{ ...S.dirBadge, color: chosen ? 'var(--accent)' : 'var(--muted)' }}>Direction {dir}</div>
              <div style={{ ...S.dirTitle, color: chosen ? 'var(--paper)' : 'var(--ink)' }}>{title}</div>
              <div style={{ ...S.dirBody, color: chosen ? 'var(--ice)' : 'rgba(10,15,30,.58)' }}>{body}</div>
              <div style={{ display:'flex', gap:'.4rem', marginTop:'1.2rem' }}>
                {swatches.map(c => <div key={c} style={{ width:22, height:22, borderRadius:'50%', background:c }} />)}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 04 DEVELOPMENT ── */}
      <section id="development" style={{ ...S.chapter, background:'#030710' }}>
        <ChapterHeader num="04" label="In the Studio" title={<>Develop<em>ment</em></>} />
        <div style={S.timeline}>
          {[
            { week:'Week 1–2', title:'Building the Motion Grammar', body:'Before touching the logo, Richard built the rules at Frost Production Studio: a custom easing curve library, a timing grid based on 24fps and multiples of 8 frames, a set of atomic behaviours — appear, exit, transition, persist.', grads:['linear-gradient(135deg,#04080f 0%,#1e6fff 100%)','linear-gradient(135deg,#060c18 0%,#7aa8e8 100%)'], labels:['Easing Curve Library','Timing Grid — 24fps'], cols:2 },
            { week:'Week 3–4', title:'Logo Animation — First Pass', body:'Seven distinct logo animation approaches built at full fidelity — not storyboards, not animatics. Real motion, real timing. The goal: find which one felt like it had always existed.', strip:true },
            { week:'Week 5–7', title:'System Expansion', body:'With the logo animation approved, the grammar expanded into every corner of the system. Lower thirds, transitions, social templates — each traced back to the core rules.', grads:['linear-gradient(135deg,#030810 0%,#4a90d9 100%)','linear-gradient(135deg,#06040f 0%,#6644cc 100%)','linear-gradient(135deg,#040c1a 0%,#0044cc 100%)'], labels:['Lower Third System','Transition Library','Social Templates'], cols:3 },
            { week:'Week 8–9', title:'Brand Film Production', body:'A 90-second brand film shot on location in Berlin, composited with the motion system by Richard Amune. The film had to work without sound — a discipline that made every motion choice more intentional.', grads:['linear-gradient(160deg,#04080f 0%,#091428 30%,#1e6fff 70%,#7aa8e8 100%)','linear-gradient(135deg,#04080f 0%,#1e6fff 100%)'], labels:['Brand Film — Wide Cut','Composite Layer'], cols:2 },
          ].map((item, i) => (
            <div key={i} className="reveal" style={S.timelineItem}>
              <div style={S.devWeek}>{item.week}</div>
              <div style={{ fontFamily:'var(--font-body)', fontStyle:'italic', fontSize:'1.4rem', color:'var(--paper)', marginBottom:'1rem' }}>{item.title}</div>
              <div style={{ fontFamily:'var(--font-body)', fontSize:'1.08rem', lineHeight:1.9, color:'var(--muted)', maxWidth:'52ch' }}>{item.body}</div>
              {item.strip && (
                <div style={S.iterStrip}>
                  {['V.01','V.02','V.03','V.04','V.05','V.06','V.07'].map((v,j) => (
                    <div key={v} style={{ ...S.iterFrame, background:`linear-gradient(${135+j*15}deg,#04080f 0%,#${['1e6fff','7aa8e8','0044cc','4a90d9','6644cc','1e6fff','7aa8e8'][j]} 100%)` }}>
                      <span style={{ position:'absolute', bottom:'.5rem', left:'.8rem', fontFamily:'var(--font-display)', fontWeight:700, fontSize:'1.1rem', letterSpacing:'.12em', color:'rgba(232,237,245,.25)' }}>{v}</span>
                    </div>
                  ))}
                </div>
              )}
              {item.grads && (
                <div style={{ display:'grid', gridTemplateColumns:`repeat(${item.cols},1fr)`, gap:2, marginTop:'1.8rem' }}>
                  {item.grads.map((g,j) => (
                    <div key={j} style={{ aspectRatio:item.cols===2&&i===3?'21/9':'16/9', background:g, position:'relative' }}>
                      <span style={{ position:'absolute', bottom:'.8rem', left:'.8rem', fontFamily:'var(--font-ui)', fontSize:'.46rem', letterSpacing:'.16em', textTransform:'uppercase', color:'rgba(232,237,245,.3)', background:'rgba(0,0,0,.5)', padding:'.2rem .6rem' }}>{item.labels[j]}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── 05 REFINEMENT ── */}
      <section id="refinement" style={S.chapter}>
        <ChapterHeader num="05" label="Iteration & Polish" title={<>Refine<em>ment</em></>} />
        <div className="reveal" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:2, marginTop:'2rem' }}>
          <div style={{ position:'relative' }}>
            <div style={{ ...S.baLabel, background:'rgba(232,237,245,.1)', color:'var(--muted)' }}>Before</div>
            <div style={{ aspectRatio:'4/3', background:'linear-gradient(135deg,#060c18 0%,#0a1828 60%,#1a3060 100%)' }} />
          </div>
          <div style={{ position:'relative' }}>
            <div style={{ ...S.baLabel, background:'var(--accent)', color:'#fff' }}>After R3</div>
            <div style={{ aspectRatio:'4/3', background:'linear-gradient(135deg,#04080f 0%,#0d1a3a 60%,#1e6fff 100%)' }} />
          </div>
        </div>

        <div className="reveal d1" style={S.feedbackLog}>
          <div style={S.feedbackHeader}>
            <span>Revision Log — Client Feedback</span>
            <span>6 rounds total</span>
          </div>
          {FEEDBACK.map((fb, i) => (
            <div key={i} style={S.feedbackItem}>
              <div style={S.fbRound}>{fb.round}</div>
              <div style={{ fontFamily:'var(--font-body)', fontSize:'1.05rem', lineHeight:1.75, color:'var(--paper)' }}>{fb.note}</div>
              <div style={{ ...S.fbStatus, background: fb.resolved ? 'rgba(30,111,255,.1)' : 'rgba(122,168,232,.1)', color: fb.resolved ? 'var(--accent)' : 'var(--ice)' }}>{fb.status}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 06 DELIVERY ── */}
      <section id="delivery" style={{ ...S.chapter, background:'#030710' }}>
        <ChapterHeader num="06" label="The Final Work" title={<>Deli<em>very</em></>} />
        <div className="reveal" style={{ position:'relative', aspectRatio:'16/9', overflow:'hidden', marginBottom:2 }}>
          <div style={{ width:'100%', height:'100%', background:'linear-gradient(160deg,#04080f 0%,#0d1a3a 30%,#1e3a6e 60%,#1e6fff 100%)' }} />
          <div style={{ position:'absolute', inset:0, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:'1.2rem' }}>
            <div style={S.rplayBtn}>
              <svg width="24" viewBox="0 0 24 24" fill="var(--paper)" style={{ marginLeft:3 }}><path d="M8 5v14l11-7z"/></svg>
            </div>
            <div style={{ fontFamily:'var(--font-ui)', fontSize:'0.9rem', letterSpacing:'.25em', textTransform:'uppercase', color:'rgba(232,237,245,.4)' }}>Play Brand Film — 01:32</div>
          </div>
          <span style={{ position:'absolute', top:'1.5rem', left:'1.5rem', fontFamily:'var(--font-display)', fontWeight:700, fontSize:'1.1rem', letterSpacing:'.12em', color:'rgba(232,237,245,.08)' }}>NOVA COLLECTIVE — BRAND FILM 2024</span>
          <span style={{ position:'absolute', bottom:'1.5rem', right:'1.5rem', fontFamily:'var(--font-display)', fontWeight:700, fontSize:'1.1rem', letterSpacing:'.12em', color:'rgba(232,237,245,.08)' }}>01:32 · PRORES 4444 · 4K · FROST PRODUCTION STUDIO</span>
        </div>
        <div className="reveal d1" style={S.resultGrid}>
          {RESULT_CELLS.map(({ bg, label },i) => (
            <div key={i} style={{ aspectRatio:'1', background:bg, position:'relative', overflow:'hidden' }}>
              <div style={{ position:'absolute', bottom:0, left:0, right:0, padding:'.8rem', background:'linear-gradient(to top,rgba(0,0,0,.7),transparent)', fontFamily:'var(--font-ui)', fontSize:'0.85rem', letterSpacing:'.18em', textTransform:'uppercase', color:'rgba(232,237,245,.45)' }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 07 OUTCOME ── */}
      <section id="outcome" style={{ ...S.chapter, background:'var(--accent)', color:'#fff' }}>
        <ChapterHeader num="07" label="Results & Impact" title={<>The<br/><em style={{color:'rgba(255,255,255,.5)'}}>Outcome</em></>} accent />
        <div className="reveal" style={S.outcomeGrid}>
          {[['4.2M','Brand Film Views','↑ in first 60 days'],['+68%','Inbound Inquiries','vs. prev. quarter'],['3','Industry Awards','Motionographer · D&AD · Awwwards'],['28','Deliverables','Across all formats']].map(([v,k,c]) => (
            <div key={k} style={S.outcomeStat}>
              <div style={S.osVal}>{v}</div>
              <div style={S.osKey}>{k}</div>
              <div style={S.osChange}>{c}</div>
            </div>
          ))}
        </div>
        <div className="reveal d2" style={S.testimony}>
          <p style={S.testimonyQuote}>"Working with Richard at Frost Production Studio was the closest thing to having a sixth sense in the room. He understood what we wanted before we could articulate it — and then made something better."</p>
          <p style={S.testimonyAttr}>Léa Sørensen <span style={{color:'rgba(255,255,255,.28)',margin:'0 .8rem'}}>·</span> Creative Director <span style={{color:'rgba(255,255,255,.28)',margin:'0 .8rem'}}>·</span> Nova Collective</p>
        </div>
      </section>

      {/* NEXT */}
      <section style={{ ...S.chapter, textAlign:'center', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse 60% 50% at 50% 50%,rgba(30,111,255,.04),transparent 70%)' }} />
        <p className="reveal" style={{ fontFamily:'var(--font-ui)', fontSize:'0.88rem', letterSpacing:'.28em', textTransform:'uppercase', color:'var(--muted)', marginBottom:'1.5rem' }}>You've reached the end</p>
        <h2 className="reveal" style={{ fontFamily:'var(--font-display)', fontWeight:900, fontSize:'clamp(3.5rem,9vw,8rem)', lineHeight:.9, letterSpacing:'-.02em', marginBottom:'1rem' }}>
          Start Your<br/><span style={{ color:'var(--accent)' }}>Project</span>
        </h2>
        <p className="reveal" style={{ fontFamily:'var(--font-body)', fontSize:'1.08rem', color:'var(--muted)', letterSpacing:'.1em', marginBottom:'3rem' }}>Have something as ambitious? Let's talk.</p>
        <div className="reveal d1" style={{ display:'flex', justifyContent:'center', gap:'1rem', flexWrap:'wrap' }}>
          <Link to="/contact" className="btn-primary">Start a Project →</Link>
          <Link to="/" className="btn-outline">← Back to Home</Link>
        </div>
      </section>
    </div>
  )
}

/* Chapter header component */
function ChapterHeader({ num, label, title, light, accent }) {
  const numColor = light ? 'rgba(10,15,30,.05)' : accent ? 'rgba(255,255,255,.08)' : 'rgba(232,237,245,.05)'
  return (
    <div style={{ display:'flex', alignItems:'flex-start', gap:'3rem', marginBottom:'5rem' }}>
      <div className="reveal" style={{ fontFamily:'var(--font-display)', fontWeight:900, fontSize:'6rem', lineHeight:.85, color:'transparent', WebkitTextStroke:`1px ${numColor}`, flexShrink:0, userSelect:'none' }}>{num}</div>
      <div>
        <div className="reveal d1" style={{ fontFamily:'var(--font-ui)', fontSize:'0.88rem', letterSpacing:'.3em', textTransform:'uppercase', color: accent ? 'rgba(255,255,255,.55)' : 'var(--accent)', display:'flex', alignItems:'center', gap:'.8rem', marginBottom:'.8rem' }}>
          <span style={{ display:'block', width:20, height:1, background: accent ? 'rgba(255,255,255,.35)' : 'var(--accent)' }} />
          {label}
        </div>
        <h2 className="reveal d2" style={{ fontFamily:'var(--font-display)', fontWeight:900, fontSize:'clamp(3rem,7vw,6rem)', lineHeight:.9, letterSpacing:'-.01em', color: accent ? '#fff' : light ? 'var(--ink)' : 'var(--paper)' }}>
          {title}
        </h2>
      </div>
    </div>
  )
}

const S = {
  chapterNav: { position:'fixed', right:'2.5rem', top:'50%', zIndex:400, transform:'translateY(-50%)', display:'flex', flexDirection:'column', gap:'.8rem', transition:'opacity .4s', pointerEvents:'auto' },
  dot: { width:6, height:6, borderRadius:'50%', cursor:'none', transition:'all .3s' },

  heroSection: { minHeight:'100vh', display:'grid', placeItems:'center', position:'relative', overflow:'hidden', padding:'8rem 3rem 4rem' },
  heroBg: { position:'absolute', inset:0, background:'radial-gradient(ellipse 70% 60% at 65% 35%,rgba(30,111,255,.08),transparent 65%),linear-gradient(160deg,#04080f 0%,#060c18 50%,#04080f 100%)' },
  heroGrid: { position:'absolute', inset:0, backgroundImage:'linear-gradient(rgba(30,111,255,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(30,111,255,.03) 1px,transparent 1px)', backgroundSize:'80px 80px' },
  heroInner: { position:'relative', zIndex:2, maxWidth:1200, width:'100%' },
  heroMeta: { display:'flex', alignItems:'center', gap:'2rem', marginBottom:'2.5rem' },
  heroIndex: { fontFamily:'var(--font-display)', fontWeight:900, fontSize:'4rem', color:'transparent', WebkitTextStroke:'1px rgba(30,111,255,.3)', lineHeight:1 },
  heroCategory: { fontFamily:'var(--font-ui)', fontSize:'0.88rem', letterSpacing:'.28em', textTransform:'uppercase', color:'var(--accent)', marginBottom:'.4rem' },
  heroDate: { fontFamily:'var(--font-ui)', fontSize:'0.92rem', color:'var(--muted)', letterSpacing:'.15em' },
  heroTitle: { fontFamily:'var(--font-display)', fontWeight:900, fontSize:'clamp(4.5rem,13vw,12rem)', lineHeight:.88, letterSpacing:'-.02em' },
  heroTagline: { marginTop:'2rem', maxWidth:'44ch', fontFamily:'var(--font-body)', fontSize:'1.15rem', lineHeight:1.9, color:'var(--ice)' },
  heroStats: { display:'flex', gap:'3rem', marginTop:'3.5rem', paddingTop:'2.5rem', borderTop:'1px solid var(--border)', flexWrap:'wrap' },
  hstatVal: { fontFamily:'var(--font-display)', fontWeight:900, fontSize:'2.2rem', color:'var(--paper)', lineHeight:1 },
  hstatKey: { fontFamily:'var(--font-ui)', fontSize:'0.88rem', letterSpacing:'.2em', textTransform:'uppercase', color:'var(--muted)', marginTop:'.35rem' },
  scrollHint: { position:'absolute', bottom:'3rem', left:'50%', transform:'translateX(-50%)', display:'flex', flexDirection:'column', alignItems:'center', gap:'.8rem' },
  scrollArrow: { width:1, height:50, background:'linear-gradient(to bottom,var(--accent),transparent)', animation:'scrollArrow 2s 1.3s infinite' },

  chapter: { padding:'7rem 3rem', borderTop:'1px solid var(--border)', background:'var(--ink)' },

  briefLayout: { display:'grid', gridTemplateColumns:'1fr 1fr', gap:'4rem', alignItems:'start' },
  briefBody: { fontFamily:'var(--font-body)', fontSize:'1.1rem', lineHeight:2, color:'var(--ice)' },
  briefPull: { fontFamily:'var(--font-body)', fontStyle:'italic', fontSize:'clamp(1.4rem,2.8vw,2rem)', lineHeight:1.35, color:'var(--ice)', marginTop:'2rem', paddingLeft:'1.5rem', borderLeft:'2px solid var(--accent)' },
  sidebarBlock: { padding:'1.6rem', border:'1px solid var(--border)', marginBottom:2 },
  sidebarKey: { fontFamily:'var(--font-ui)', fontSize:'0.88rem', letterSpacing:'.24em', textTransform:'uppercase', color:'var(--muted)', marginBottom:'.6rem' },
  sidebarVal: { fontFamily:'var(--font-body)', fontSize:'1.1rem', color:'var(--paper)', lineHeight:1.7 },
  tag: { padding:'.22rem .75rem', border:'1px solid rgba(30,111,255,.2)', fontFamily:'var(--font-ui)', fontSize:'0.85rem', letterSpacing:'.16em', textTransform:'uppercase', color:'var(--muted)' },

  discGrid: { display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:2, marginTop:'3rem' },
  discCard: { background:'#07111f', padding:'2.2rem 1.8rem', position:'relative', overflow:'hidden' },
  discNum: { fontFamily:'var(--font-display)', fontWeight:900, fontSize:'3.5rem', color:'transparent', WebkitTextStroke:'1px rgba(30,111,255,.1)', lineHeight:1, marginBottom:'1rem' },
  discTitle: { fontFamily:'var(--font-body)', fontStyle:'italic', fontSize:'1.1rem', color:'var(--paper)', marginBottom:'.8rem' },
  discBody: { fontFamily:'var(--font-body)', fontSize:'1.05rem', lineHeight:1.9, color:'var(--muted)' },
  researchBoard: { display:'grid', gridTemplateColumns:'2fr 1fr 1fr', gridTemplateRows:'auto auto', gap:2, marginTop:'4rem' },
  boardCell: { position:'relative', overflow:'hidden', display:'flex', alignItems:'flex-end', padding:'1.5rem' },
  boardLabel: { position:'relative', zIndex:2, fontFamily:'var(--font-ui)', fontSize:'0.85rem', letterSpacing:'.2em', textTransform:'uppercase', color:'rgba(232,237,245,.4)', background:'rgba(0,0,0,.4)', padding:'.3rem .7rem' },

  conceptIntro: { fontFamily:'var(--font-body)', fontStyle:'italic', fontSize:'clamp(1.3rem,2.8vw,2rem)', lineHeight:1.45, maxWidth:'60ch', marginBottom:'4rem', color:'var(--ink)' },
  sketchGrid: { display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:2, marginBottom:'4rem' },
  sketchItem: { aspectRatio:'3/4', position:'relative', overflow:'hidden' },
  sketchLabel: { position:'absolute', bottom:0, left:0, right:0, padding:'.8rem 1rem', background:'rgba(10,15,30,.06)', fontFamily:'var(--font-ui)', fontSize:'0.85rem', letterSpacing:'.18em', textTransform:'uppercase', color:'rgba(10,15,30,.38)' },
  directionsGrid: { display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:2 },
  dirCard: { padding:'2.2rem', border:'1px solid rgba(10,15,30,.08)', position:'relative', cursor:'none' },
  dirCardChosen: { background:'var(--ink)', borderColor:'var(--ink)' },
  dirBadge: { fontFamily:'var(--font-ui)', fontSize:'0.85rem', letterSpacing:'.2em', textTransform:'uppercase', marginBottom:'1.2rem' },
  dirTitle: { fontFamily:'var(--font-display)', fontWeight:900, fontSize:'1.8rem', lineHeight:1, marginBottom:'1rem' },
  dirBody: { fontFamily:'var(--font-body)', fontSize:'1.05rem', lineHeight:1.85 },
  chosenMark: { position:'absolute', top:'1.2rem', right:'1.2rem', background:'var(--accent)', color:'#fff', fontFamily:'var(--font-ui)', fontSize:'.46rem', letterSpacing:'.18em', textTransform:'uppercase', padding:'.28rem .7rem' },

  timeline: { position:'relative', paddingLeft:'2rem', marginTop:'2rem', borderLeft:'1px solid var(--accent)' },
  timelineItem: { position:'relative', paddingBottom:'4rem', paddingLeft:'3rem', paddingTop:'.4rem' },
  devWeek: { fontFamily:'var(--font-ui)', fontSize:'0.88rem', letterSpacing:'.25em', textTransform:'uppercase', color:'var(--accent)', marginBottom:'.6rem' },
  iterStrip: { display:'flex', gap:2, marginTop:'1.8rem', overflowX:'auto' },
  iterFrame: { flexShrink:0, width:200, height:130, position:'relative', overflow:'hidden' },

  baLabel: { position:'absolute', top:'1rem', left:'1rem', zIndex:2, fontFamily:'var(--font-ui)', fontSize:'0.88rem', letterSpacing:'.22em', textTransform:'uppercase', padding:'.32rem .85rem' },
  feedbackLog: { marginTop:'4rem', border:'1px solid var(--border)' },
  feedbackHeader: { padding:'1.2rem 1.8rem', borderBottom:'1px solid var(--border)', fontFamily:'var(--font-ui)', fontSize:'0.88rem', letterSpacing:'.22em', textTransform:'uppercase', color:'var(--muted)', display:'flex', justifyContent:'space-between' },
  feedbackItem: { display:'grid', gridTemplateColumns:'100px 1fr auto', gap:'1.5rem', padding:'1.4rem 1.8rem', borderBottom:'1px solid var(--border)', alignItems:'start' },
  fbRound: { fontFamily:'var(--font-display)', fontWeight:700, fontSize:'.9rem', letterSpacing:'.1em', color:'var(--muted)' },
  fbStatus: { fontFamily:'var(--font-ui)', fontSize:'0.85rem', letterSpacing:'.18em', textTransform:'uppercase', padding:'.22rem .65rem', whiteSpace:'nowrap' },

  rplayBtn: { width:70, height:70, borderRadius:'50%', border:'1.5px solid rgba(232,237,245,.35)', display:'flex', alignItems:'center', justifyContent:'center' },
  resultGrid: { display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:2, marginTop:0 },

  outcomeGrid: { display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:2, marginBottom:'4rem', background:'rgba(255,255,255,.1)' },
  outcomeStat: { background:'var(--accent)', padding:'2.5rem 2rem', textAlign:'center' },
  osVal: { fontFamily:'var(--font-display)', fontWeight:900, fontSize:'4rem', lineHeight:1, color:'#fff' },
  osKey: { fontFamily:'var(--font-ui)', fontSize:'0.88rem', letterSpacing:'.22em', textTransform:'uppercase', color:'rgba(255,255,255,.55)', marginTop:'.5rem' },
  osChange: { fontFamily:'var(--font-body)', fontSize:'0.92rem', color:'rgba(255,255,255,.4)', marginTop:'.4rem' },
  testimony: { maxWidth:700, margin:'0 auto', textAlign:'center', padding:'0 2rem' },
  testimonyQuote: { fontFamily:'var(--font-body)', fontStyle:'italic', fontSize:'clamp(1.3rem,2.8vw,2rem)', lineHeight:1.45, color:'#fff', marginBottom:'1.8rem' },
  testimonyAttr: { fontFamily:'var(--font-ui)', fontSize:'0.9rem', letterSpacing:'.22em', textTransform:'uppercase', color:'rgba(255,255,255,.5)' },
}
