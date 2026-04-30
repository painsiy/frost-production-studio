import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

/* ── hooks ── */
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
  const [mobile, setMobile] = useState(window.innerWidth <= 768)
  useEffect(() => {
    const fn = () => setMobile(window.innerWidth <= 768)
    window.addEventListener('resize', fn)
    return () => window.removeEventListener('resize', fn)
  }, [])
  return mobile
}

/* ── data ── */
const TOOLS = [
  { code:'AE',  name:'After Effects',   level:'Expert',       pct:98 },
  { code:'C4D', name:'Cinema 4D',       level:'Expert',       pct:95 },
  { code:'DV',  name:'DaVinci Resolve', level:'Advanced',     pct:88 },
  { code:'HOU', name:'Houdini',         level:'Intermediate', pct:72 },
  { code:'BLN', name:'Blender',         level:'Advanced',     pct:82 },
  { code:'FIG', name:'Figma',           level:'Advanced',     pct:85 },
  { code:'PR',  name:'Premiere Pro',    level:'Expert',       pct:92 },
  { code:'UE',  name:'Unreal Engine',   level:'Intermediate', pct:68 },
]

const EXP = [
  { years:'2020 — Now',  role:'Founder & Motion Director', co:'Frost Production Studio — Lagos',       desc:'Running a motion design studio specialising in brand identity and broadcast. Built a portfolio spanning global brands, broadcasters, and filmmakers across Africa, Europe and North America.', tags:['Creative Direction','Client Relations','Studio Management'], award:'Motionographer 2024' },
  { years:'2017 — 2020', role:'Senior Motion Designer',    co:'Meridian Creative — London',            desc:"Led motion across broadcast and brand projects for Nike, BBC, and Channel 4. Oversaw the studio's transition to real-time 3D pipelines using Cinema 4D and Unreal Engine.",               tags:['Team Leadership','Real-time 3D','Brand Motion'],             award:'D&AD Silver 2019' },
  { years:'2015 — 2017', role:'Motion Designer',           co:'Kinetic Studio — Lagos',               desc:"Designed broadcast packages and title sequences for Nigerian and pan-African broadcasters. Developed the studio's internal motion language for kinetic typography.",                      tags:['Broadcast','Typography','Editing'],                          award:'' },
  { years:'2011 — 2015', role:'BSc Communication Design',  co:'University of Lagos — First Class',    desc:'Graduated top of class with a focus on visual communication and motion graphics. Final project won the West Africa Design Award for Innovation in Motion.',                              tags:['Motion Graphics','Film','Research'],                         award:'Design Award' },
]

const CLIENTS = ['Nike','BBC','Spotify','Airbnb','Channel 4','Adidas','MTN','Vogue']

/* ── component ── */
export default function About() {
  const page     = useReveal()
  const isMobile = useIsMobile()

  return (
    <div ref={page}>

      {/* ── PAGE HEADER ──────────────────────────────────── */}
      <div style={{
        minHeight: isMobile ? '45vh' : '55vh',
        display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
        padding: isMobile ? '6rem 1.5rem 3rem' : '8rem 3rem 4rem',
        position: 'relative', overflow: 'hidden',
        borderBottom: '1px solid var(--border)',
      }}>
        <div style={S.headerBg}/>
        <div style={S.headerGrid}/>
        {!isMobile && <div style={S.headerNum}>02</div>}
        <div style={S.headerLine}/>
        <p style={{ ...S.breadcrumb, animation:'fadeUp .6s .2s forwards', opacity:0 }}>
          <Link to="/" style={{ color:'var(--muted)' }}>Home</Link>
          <span style={{ color:'var(--accent)', margin:'0 .6rem' }}>→</span>
          About
        </p>
        <h1 style={{ ...S.pageTitle, animation:'fadeUp .8s .35s forwards', opacity:0 }}>
          About<br/>
          <em style={{ fontFamily:'var(--font-body)', fontStyle:'italic', color:'var(--accent)', fontWeight:300 }}>
            Richard
          </em>
        </h1>
      </div>

      {/* ── PORTRAIT + BIO ───────────────────────────────── */}
      {/* On mobile: portrait full-width on top, bio below. On desktop: side-by-side. */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
        borderBottom: '1px solid var(--border)',
      }}>
        {/* Portrait column */}
        <div style={{
          padding: isMobile ? '2.5rem 1.5rem' : '5rem 3rem',
          borderRight: isMobile ? 'none' : '1px solid var(--border)',
          borderBottom: isMobile ? '1px solid var(--border)' : 'none',
        }} className="reveal">
          <p style={S.colLabel}>Portrait</p>
          <div style={{
            position: 'relative',
            aspectRatio: isMobile ? '4/3' : '3/4',
            overflow: 'hidden', marginBottom: '1.2rem',
          }}>
            <div style={S.portrait}/>
            <div style={S.portraitFrame}/>
          </div>
          <p style={S.portraitCaption}>Richard Amune — Lagos, 2024</p>
        </div>

        {/* Bio column */}
        <div style={{ padding: isMobile ? '2.5rem 1.5rem' : '5rem 3rem' }}>
          <p className="reveal" style={S.colLabel}>The Story</p>
          <h2 className="reveal" style={{
            fontFamily: 'var(--font-display)', fontWeight: 800,
            fontSize: isMobile ? 'clamp(1.6rem,6vw,2.2rem)' : 'clamp(1.8rem,3.5vw,2.8rem)',
            lineHeight: 1.25, marginBottom: '1.8rem',
          }}>
            Motion designer with an obsession for craft.
          </h2>
          <div className="reveal d1" style={S.colBody}>
            <p>I'm Richard Amune, founder of Frost Production Studio. My career began in broadcast design, developing a deep respect for the constraints of motion — the discipline of creating something that has to work at 24 frames a second, under any lighting condition, on any screen.</p>
            <p style={{ marginTop:'1.2rem' }}>Today, Frost Production Studio works at the intersection of brand identity, visual storytelling, and emerging technology. Our clients range from global brands launching new campaigns to independent filmmakers who need their titles to feel as important as the film itself.</p>
            <p style={{ marginTop:'1.2rem' }}>Every project begins with one question: what does this need to feel like? The motion is always in service of that answer.</p>
          </div>

          <div style={{ marginTop:'2.5rem' }}>
            <p className="reveal" style={S.colLabel}>Based in</p>
            <p className="reveal d1" style={{ ...S.colBody, color:'var(--paper)' }}>
              Lagos, Nigeria — available worldwide
            </p>
          </div>

          <div style={{ marginTop:'2rem' }}>
            <p className="reveal" style={S.colLabel}>Available for</p>
            <div className="reveal d1" style={{ display:'flex', flexWrap:'wrap', gap:'.5rem', marginTop:'.8rem' }}>
              {['Freelance Projects','Creative Direction','Studio Retainers','Workshops'].map(t => (
                <span key={t} style={S.tag}>{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── PHILOSOPHY QUOTE ─────────────────────────────── */}
      <div style={{ background:'var(--accent)', color:'#fff' }}>
        <div className="reveal" style={{
          padding: isMobile ? '4rem 1.5rem' : '6rem 3rem',
          maxWidth: 900, margin: '0 auto', textAlign: 'center',
        }}>
          <p style={{
            fontFamily: 'var(--font-body)', fontStyle: 'italic',
            fontSize: isMobile ? 'clamp(1.4rem,5vw,2rem)' : 'clamp(1.8rem,4vw,3rem)',
            lineHeight: 1.35, marginBottom: '2rem',
          }}>
            "Motion is not decoration. It is the moment a brand stops existing on a page and starts living in someone's memory."
          </p>
          <p style={{
            fontFamily: 'var(--font-ui)', fontSize: '0.9rem',
            letterSpacing: '.2em', textTransform: 'uppercase',
            color: 'rgba(255,255,255,.6)',
          }}>
            — Richard Amune, Frost Production Studio
          </p>
        </div>
      </div>

      {/* ── EXPERIENCE ───────────────────────────────────── */}
      <div>
        <div style={{ padding: isMobile ? '3rem 1.5rem 1.5rem' : '4rem 3rem 2rem' }}>
          <p className="reveal" style={S.sectionLabel}>Career</p>
          <h2 className="reveal" style={{
            fontFamily: 'var(--font-display)', fontWeight: 900,
            fontSize: isMobile ? 'clamp(2rem,8vw,3.5rem)' : 'clamp(2.5rem,6vw,5rem)',
            lineHeight: .95,
          }}>
            Experience &amp;<br/>Recognition
          </h2>
        </div>
        <div style={{ borderTop:'1px solid var(--border)' }}>
          {EXP.map((e, i) => (
            <div key={i} className="reveal" style={{
              display: 'grid',
              /* On mobile: single column. On desktop: year | content | award */
              gridTemplateColumns: isMobile ? '1fr' : '140px 1fr auto',
              gap: isMobile ? '0.5rem' : '2rem',
              padding: isMobile ? '1.8rem 1.5rem' : '2rem 3rem',
              borderBottom: '1px solid var(--border)',
              alignItems: 'start',
            }}>
              <div style={{
                fontFamily: 'var(--font-display)', fontWeight: 700,
                fontSize: '1.05rem', color: 'var(--muted)',
                letterSpacing: '.06em',
              }}>
                {e.years}
              </div>
              <div>
                <div style={{ fontFamily:'var(--font-body)', fontStyle:'italic', fontSize:'1.1rem' }}>{e.role}</div>
                <div style={{ fontFamily:'var(--font-ui)', fontSize:'0.95rem', color:'var(--muted)', marginTop:'.3rem' }}>{e.co}</div>
                <div style={{ fontFamily:'var(--font-body)', fontSize:'1rem', lineHeight:1.8, color:'var(--ice)', marginTop:'.6rem' }}>{e.desc}</div>
                <div style={{ display:'flex', gap:'.4rem', flexWrap:'wrap', marginTop:'.8rem' }}>
                  {e.tags.map(t => <span key={t} style={S.tag}>{t}</span>)}
                </div>
              </div>
              {e.award && (
                <div style={{
                  fontFamily: 'var(--font-ui)', fontSize: '0.88rem',
                  letterSpacing: '.12em', textTransform: 'uppercase',
                  color: 'var(--accent)', whiteSpace: 'nowrap',
                  paddingTop: isMobile ? '0.5rem' : '.2rem',
                }}>
                  {e.award}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── TOOLS ────────────────────────────────────────── */}
      <div style={{ background:'var(--accent)', padding: isMobile ? '3rem 1.5rem' : '5rem 3rem' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 2fr',
          gap: isMobile ? '2.5rem' : '4rem',
          alignItems: 'start',
        }}>
          {/* Heading */}
          <div className="reveal">
            <p style={{
              fontFamily: 'var(--font-ui)', fontSize: '0.88rem',
              letterSpacing: '.2em', textTransform: 'uppercase',
              color: 'rgba(255,255,255,.55)', marginBottom: '1rem',
            }}>
              Toolbox
            </p>
            <h2 style={{
              fontFamily: 'var(--font-body)', fontStyle: 'italic',
              fontSize: isMobile ? 'clamp(1.6rem,6vw,2.2rem)' : 'clamp(2rem,4vw,3rem)',
              lineHeight: 1.25, color: '#fff',
            }}>
              The instruments<br/>of the craft.
            </h2>
            <p style={{
              marginTop: '1.5rem', fontFamily: 'var(--font-body)',
              fontSize: '1rem', lineHeight: 1.85,
              color: 'rgba(255,255,255,.65)',
            }}>
              Software evolves. Craft doesn't. These are the tools Frost Production Studio reaches for to bring ideas to life.
            </p>
          </div>

          {/* Tool grid */}
          <div className="reveal" style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(2,1fr)',
            gap: 1, background: 'rgba(255,255,255,.12)',
          }}>
            {TOOLS.map(t => (
              <div key={t.code} style={{
                background: 'var(--accent)', padding: '1.4rem 1.6rem',
                display: 'flex', alignItems: 'center', gap: '1rem',
              }}>
                <div style={{
                  width: 38, height: 38, border: '1px solid rgba(255,255,255,.25)',
                  borderRadius: 4, display: 'flex', alignItems: 'center',
                  justifyContent: 'center', flexShrink: 0,
                  fontFamily: 'var(--font-display)', fontWeight: 800,
                  fontSize: '0.9rem', color: '#fff',
                }}>
                  {t.code}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily:'var(--font-body)', fontSize:'1rem', color:'#fff' }}>{t.name}</div>
                  <div style={{ fontFamily:'var(--font-ui)', fontSize:'0.82rem', letterSpacing:'.12em', textTransform:'uppercase', color:'rgba(255,255,255,.5)', marginTop:'.2rem' }}>{t.level}</div>
                  <div style={{ marginTop:'.4rem', height:2, background:'rgba(255,255,255,.15)', borderRadius:1, overflow:'hidden' }}>
                    <div style={{ height:'100%', background:'#fff', borderRadius:1, width:`${t.pct}%` }}/>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── CLIENTS ──────────────────────────────────────── */}
      <div style={{ padding: isMobile ? '3rem 1.5rem' : '5rem 3rem', borderTop:'1px solid var(--border)' }}>
        <p className="reveal" style={S.sectionLabel}>Trusted By</p>
        <div className="reveal" style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? 'repeat(2,1fr)' : 'repeat(4,1fr)',
          gap: 1, background: 'var(--border)',
        }}>
          {CLIENTS.map(c => (
            <div key={c} style={{
              background: 'var(--ink)', padding: '2rem 1.5rem',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'var(--font-display)', fontWeight: 800,
              fontSize: isMobile ? '1.1rem' : '1.3rem',
              letterSpacing: '.1em', color: 'rgba(232,237,245,.15)',
              transition: 'color .25s', cursor: 'default',
            }}>
              {c}
            </div>
          ))}
        </div>
      </div>

      {/* ── CTA ──────────────────────────────────────────── */}
      <div style={{
        padding: isMobile ? '4rem 1.5rem' : '7rem 3rem',
        textAlign: 'center',
      }}>
        <h2 className="reveal" style={{
          fontFamily: 'var(--font-display)', fontWeight: 900,
          fontSize: isMobile ? 'clamp(2.5rem,10vw,5rem)' : 'clamp(3rem,8vw,7rem)',
          lineHeight: .9, marginBottom: '2.5rem',
        }}>
          Ready to<br/><span style={{ color:'var(--accent)' }}>Collaborate?</span>
        </h2>
        <div className="reveal" style={{ display:'flex', gap:'1rem', justifyContent:'center', flexWrap:'wrap' }}>
          <Link to="/contact" className="btn-primary">Start a Project →</Link>
          <Link to="/projects" className="btn-outline">View My Work →</Link>
        </div>
      </div>

    </div>
  )
}

/* ── shared style objects ── */
const S = {
  headerBg:    { position:'absolute', inset:0, background:'radial-gradient(ellipse 60% 70% at 70% 30%,rgba(30,111,255,.07),transparent 65%),linear-gradient(160deg,#04080f 0%,#060c18 60%,#04080f 100%)' },
  headerGrid:  { position:'absolute', inset:0, backgroundImage:'linear-gradient(rgba(30,111,255,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(30,111,255,.03) 1px,transparent 1px)', backgroundSize:'80px 80px' },
  headerNum:   { position:'absolute', top:'8rem', right:'3rem', fontFamily:'var(--font-display)', fontWeight:900, fontSize:'clamp(8rem,18vw,16rem)', color:'transparent', WebkitTextStroke:'1px rgba(30,111,255,.04)', lineHeight:1, userSelect:'none' },
  headerLine:  { position:'absolute', bottom:0, left:0, right:0, height:1, background:'linear-gradient(90deg,transparent,var(--accent) 40%,transparent)' },
  breadcrumb:  { position:'relative', zIndex:2, fontFamily:'var(--font-ui)', fontSize:'0.88rem', letterSpacing:'.15em', textTransform:'uppercase', color:'var(--muted)', marginBottom:'1.5rem' },
  pageTitle:   { position:'relative', zIndex:2, fontFamily:'var(--font-display)', fontWeight:900, fontSize:'clamp(4rem,12vw,10rem)', lineHeight:.92, letterSpacing:'-.02em' },

  colLabel:    { fontFamily:'var(--font-ui)', fontSize:'0.88rem', letterSpacing:'.2em', textTransform:'uppercase', color:'var(--accent)', marginBottom:'1.4rem', display:'flex', alignItems:'center', gap:'.8rem' },
  colBody:     { fontFamily:'var(--font-body)', fontSize:'1.05rem', lineHeight:1.95, color:'var(--ice)' },
  portrait:    { width:'100%', height:'100%', background:'linear-gradient(160deg,#060c18 0%,#0d1a3a 50%,#1e3a6e 100%)' },
  portraitFrame:{ position:'absolute', inset:'1rem', border:'1px solid rgba(30,111,255,.18)', pointerEvents:'none' },
  portraitCaption:{ fontFamily:'var(--font-ui)', fontSize:'0.82rem', letterSpacing:'.15em', textTransform:'uppercase', color:'var(--muted)', textAlign:'center' },

  sectionLabel:{ fontFamily:'var(--font-ui)', fontSize:'0.88rem', letterSpacing:'.2em', textTransform:'uppercase', color:'var(--accent)', marginBottom:'.8rem' },
  tag:         { padding:'.3rem .85rem', border:'1px solid rgba(30,111,255,.2)', fontFamily:'var(--font-ui)', fontSize:'0.82rem', letterSpacing:'.1em', textTransform:'uppercase', color:'var(--muted)', borderRadius:2 },
}
