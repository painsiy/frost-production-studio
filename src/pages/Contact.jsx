import { useState } from 'react'
import { Link } from 'react-router-dom'

const PROJECT_TYPES = ['Brand Identity Motion','Title Sequence','3D Animation','UI / UX Motion','Broadcast Package','Social Content','Other']
const TIMELINES     = ['ASAP (Rush)','2–4 Weeks','1–2 Months','3+ Months','Ongoing / Retainer']
const SOCIALS       = [
  { label:'Vimeo',     href:'https://vimeo.com' },
  { label:'Instagram', href:'https://instagram.com' },
  { label:'LinkedIn',  href:'https://linkedin.com' },
  { label:'Behance',   href:'https://behance.net' },
]

export default function Contact() {
  const [form, setForm]       = useState({ fname:'', lname:'', email:'', company:'', ptype:'', timeline:'', message:'' })
  const [budget, setBudget]   = useState(5000)
  const [fileName, setFileName] = useState('No file chosen')
  const [loading, setLoading] = useState(false)
  const [sent, setSent]       = useState(false)
  const [errors, setErrors]   = useState({})

  const budgetLabel = budget >= 100000 ? '$ 100,000+' : `$ ${budget.toLocaleString('en')}`

  const validate = () => {
    const e = {}
    if (!form.fname.trim()) e.fname = true
    if (!form.lname.trim()) e.lname = true
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = true
    if (!form.ptype) e.ptype = true
    if (!form.message.trim()) e.message = true
    return e
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setLoading(true)
    setTimeout(() => { setLoading(false); setSent(true) }, 2000)
  }

  const field = (key, placeholder, type='text') => ({
    value: form[key],
    onChange: e => { setForm(f => ({ ...f, [key]:e.target.value })); setErrors(er => ({ ...er, [key]:false })) },
    placeholder,
    type,
    style: { ...S.input, borderBottom: errors[key] ? '1px solid var(--accent)' : '1px solid transparent' },
  })

  if (sent) return (
    <div style={S.successOverlay}>
      <div style={S.successIcon}><svg width="36" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.5"><polyline points="20 6 9 17 4 12"/></svg></div>
      <h2 style={S.successTitle}>Message<br/><span style={{ color:'var(--accent)' }}>Sent.</span></h2>
      <p style={S.successSub}>Thank you for reaching out to Frost Production Studio. Richard will review your brief and respond within 24 hours.</p>
      <Link to="/" style={S.successBack}>← Back to Home</Link>
    </div>
  )

  return (
    <div style={S.layout}>
      {/* LEFT */}
      <div style={S.left}>
        <div style={S.leftBgText}>SAY<br/>HELLO</div>
        <div>
          <div style={{ ...S.availTag, animation:'fadeUp .6s .4s forwards', opacity:0 }}>
            <span style={S.availDot} /> Available for new projects
          </div>
          <p style={{ ...S.leftEyebrow, animation:'fadeUp .6s .3s forwards', opacity:0 }}>Let's Collaborate</p>
          <h1 style={{ ...S.leftTitle, animation:'fadeUp .8s .45s forwards', opacity:0 }}>
            Let's<br/>Make<br/>
            <em style={{ fontFamily:'var(--font-body)', fontStyle:'italic', color:'rgba(4,8,15,.55)', fontWeight:300 }}>Frost.</em>
          </h1>
          <p style={{ ...S.leftSub, animation:'fadeUp .8s .6s forwards', opacity:0 }}>
            Have a project in mind? Frost Production Studio is ready to hear it.
            Fill in the brief and Richard will get back to you within 24 hours.
          </p>
        </div>

        <div style={{ ...S.infoBlock, animation:'fadeUp .8s .8s forwards', opacity:0 }}>
          {[
            { icon:<EmailIcon/>, label:'Email',        val:<a href="mailto:hello@frostproductionstudio.com" style={{ color:'rgba(255,255,255,.85)', textDecoration:'none' }}>hello@frostproductionstudio.com</a> },
            { icon:<PinIcon/>,   label:'Studio',       val:'Lagos, Nigeria — WAT (UTC+1)' },
            { icon:<ClockIcon/>, label:'Response Time',val:'Within 24 hours' },
          ].map(({ icon,label,val }) => (
            <div key={label} style={S.infoRow}>
              <div style={S.infoIcon}>{icon}</div>
              <div>
                <div style={S.infoKey}>{label}</div>
                <div style={S.infoVal}>{val}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ ...S.socialsRow, animation:'fadeUp .8s 1s forwards', opacity:0 }}>
          {SOCIALS.map(s => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" style={S.socialBtn}>{s.label}</a>
          ))}
        </div>
      </div>

      {/* RIGHT */}
      <div style={S.right}>
        <p style={{ ...S.formEyebrow, animation:'fadeUp .6s .5s forwards', opacity:0 }}>Send a Brief</p>
        <h2 style={{ ...S.formTitle, animation:'fadeUp .7s .65s forwards', opacity:0 }}>
          Tell me about<br/>your project.
        </h2>

        <form onSubmit={handleSubmit} style={{ ...S.formBody, animation:'fadeUp .8s .8s forwards', opacity:0 }} noValidate>
          {/* Name row */}
          <div style={S.fieldRow}>
            <div style={S.fieldWrap}>
              <label style={S.label}>First Name *</label>
              <input {...field('fname','Jane')} />
            </div>
            <div style={{ ...S.fieldWrap, borderLeft:'1px solid var(--border)', paddingLeft:'1.5rem' }}>
              <label style={S.label}>Last Name *</label>
              <input {...field('lname','Doe')} />
            </div>
          </div>

          <div style={S.fieldWrap}>
            <label style={S.label}>Email Address *</label>
            <input {...field('email','jane@studio.com','email')} />
          </div>

          <div style={S.fieldWrap}>
            <label style={S.label}>Company / Studio</label>
            <input {...field('company','Acme Studio (optional)')} />
          </div>

          <div style={S.fieldRow}>
            <div style={S.fieldWrap}>
              <label style={S.label}>Project Type *</label>
              <select
                value={form.ptype}
                onChange={e => { setForm(f => ({ ...f, ptype:e.target.value })); setErrors(er => ({ ...er, ptype:false })) }}
                style={{ ...S.input, borderBottom: errors.ptype ? '1px solid var(--accent)' : '1px solid transparent' }}
              >
                <option value="" disabled>Select type</option>
                {PROJECT_TYPES.map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div style={{ ...S.fieldWrap, borderLeft:'1px solid var(--border)', paddingLeft:'1.5rem' }}>
              <label style={S.label}>Timeline</label>
              <select value={form.timeline} onChange={e => setForm(f => ({ ...f, timeline:e.target.value }))} style={S.input}>
                <option value="" disabled>Select timeline</option>
                {TIMELINES.map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
          </div>

          {/* Budget */}
          <div style={{ ...S.fieldWrap, paddingBottom:'.5rem' }}>
            <label style={S.label}>Estimated Budget</label>
            <div style={S.budgetDisplay}>{budgetLabel}</div>
            <input
              type="range" min="1000" max="100000" step="500"
              value={budget} onChange={e => setBudget(+e.target.value)}
              style={S.slider}
            />
            <div style={{ display:'flex', justifyContent:'space-between', fontFamily:'var(--font-ui)', fontSize:'.48rem', color:'var(--muted)', letterSpacing:'.12em' }}>
              <span>$1K</span><span>$100K+</span>
            </div>
          </div>

          {/* Message */}
          <div style={{ ...S.fieldWrap, flex:1 }}>
            <label style={S.label}>Project Brief *</label>
            <textarea
              value={form.message}
              onChange={e => { setForm(f => ({ ...f, message:e.target.value })); setErrors(er => ({ ...er, message:false })) }}
              placeholder="Describe your project, goals, and anything we should know..."
              style={{ ...S.input, height:110, resize:'none', lineHeight:1.8, borderBottom: errors.message ? '1px solid var(--accent)' : '1px solid transparent' }}
            />
          </div>

          {/* File */}
          <div style={S.fileRow}>
            <label style={S.fileBtn}>
              + Attach Brief / Moodboard
              <input type="file" accept=".pdf,.jpg,.png,.zip" style={{ display:'none' }} onChange={e => setFileName(e.target.files[0]?.name || 'No file chosen')} />
            </label>
            <span style={{ fontFamily:'var(--font-ui)', fontSize:'.58rem', color:'var(--muted)' }}>{fileName}</span>
          </div>

          {/* Submit */}
          <div style={S.submitRow}>
            <p style={S.formNote}>Your information is kept strictly confidential and never shared with third parties.</p>
            <button type="submit" style={S.submitBtn} disabled={loading}>
              {loading
                ? <span style={{ display:'flex', gap:4 }}>
                    {[0,1,2].map(i => <span key={i} style={{ width:6, height:6, borderRadius:'50%', background:'#fff', animation:`bounce .8s ${i*0.15}s infinite` }} />)}
                  </span>
                : <>Send Brief <svg width="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg></>
              }
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

/* icon helpers */
const EmailIcon = () => <svg width="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.7)" strokeWidth="1.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
const PinIcon   = () => <svg width="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.7)" strokeWidth="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
const ClockIcon = () => <svg width="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.7)" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>

const S = {
  layout: { display:'grid', gridTemplateColumns:'1fr 1fr', minHeight:'100vh' },
  left: { background:'var(--accent)', padding:'9rem 4rem 4rem', display:'flex', flexDirection:'column', justifyContent:'space-between', position:'relative', overflow:'hidden' },
  leftBgText: { position:'absolute', bottom:'-2rem', left:'-1rem', fontFamily:'var(--font-display)', fontWeight:900, fontSize:'clamp(8rem,16vw,14rem)', color:'transparent', WebkitTextStroke:'1px rgba(255,255,255,.08)', lineHeight:1, userSelect:'none', pointerEvents:'none' },
  availTag: { display:'inline-flex', alignItems:'center', gap:'.6rem', padding:'.4rem 1rem', border:'1px solid rgba(255,255,255,.2)', fontFamily:'var(--font-ui)', fontSize:'.52rem', letterSpacing:'.2em', textTransform:'uppercase', color:'rgba(255,255,255,.75)', marginBottom:'1.5rem' },
  availDot: { width:6, height:6, borderRadius:'50%', background:'#4dff91', display:'inline-block', animation:'pulse-dot 2s infinite' },
  leftEyebrow: { fontFamily:'var(--font-ui)', fontSize:'.52rem', letterSpacing:'.28em', textTransform:'uppercase', color:'rgba(255,255,255,.55)', marginBottom:'1.5rem' },
  leftTitle: { fontFamily:'var(--font-display)', fontWeight:900, fontSize:'clamp(4rem,10vw,8rem)', lineHeight:.9, letterSpacing:'-.02em', color:'#fff' },
  leftSub: { marginTop:'1.8rem', fontFamily:'var(--font-body)', fontSize:'.85rem', lineHeight:1.9, color:'rgba(255,255,255,.7)', maxWidth:'34ch' },
  infoBlock: { position:'relative', zIndex:2 },
  infoRow: { display:'flex', alignItems:'flex-start', gap:'1.2rem', padding:'1.2rem 0', borderTop:'1px solid rgba(255,255,255,.12)' },
  infoIcon: { width:32, height:32, border:'1px solid rgba(255,255,255,.2)', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 },
  infoKey: { fontFamily:'var(--font-ui)', fontSize:'.5rem', letterSpacing:'.2em', textTransform:'uppercase', color:'rgba(255,255,255,.45)', marginBottom:'.3rem' },
  infoVal: { fontFamily:'var(--font-body)', fontSize:'.8rem', color:'rgba(255,255,255,.85)' },
  socialsRow: { display:'flex', gap:'.8rem', flexWrap:'wrap', position:'relative', zIndex:2 },
  socialBtn: { padding:'.45rem 1rem', border:'1px solid rgba(255,255,255,.2)', fontFamily:'var(--font-ui)', fontSize:'.52rem', letterSpacing:'.2em', textTransform:'uppercase', color:'rgba(255,255,255,.7)', textDecoration:'none', transition:'all .2s' },

  right: { background:'var(--ink)', padding:'9rem 4rem 4rem', display:'flex', flexDirection:'column' },
  formEyebrow: { fontFamily:'var(--font-ui)', fontSize:'.52rem', letterSpacing:'.28em', textTransform:'uppercase', color:'var(--accent)', marginBottom:'.8rem' },
  formTitle: { fontFamily:'var(--font-body)', fontStyle:'italic', fontSize:'clamp(1.8rem,3.5vw,2.8rem)', lineHeight:1.25, marginBottom:'3rem' },
  formBody: { display:'flex', flexDirection:'column', gap:0, flex:1 },
  fieldRow: { display:'grid', gridTemplateColumns:'1fr 1fr', gap:2 },
  fieldWrap: { position:'relative', borderTop:'1px solid var(--border)', padding:'0' },
  label: { display:'block', fontFamily:'var(--font-ui)', fontSize:'.48rem', letterSpacing:'.25em', textTransform:'uppercase', color:'var(--muted)', padding:'1rem 0 .3rem' },
  input: { width:'100%', background:'none', border:'none', outline:'none', fontFamily:'var(--font-body)', fontWeight:300, fontSize:'.85rem', color:'var(--paper)', padding:'.3rem 0 1rem' },
  budgetDisplay: { fontFamily:'var(--font-display)', fontWeight:900, fontSize:'1.8rem', color:'var(--accent)', letterSpacing:'.05em' },
  slider: { width:'100%', height:2, background:'rgba(232,237,245,.08)', outline:'none', margin:'1rem 0 .5rem', WebkitAppearance:'none', appearance:'none', cursor:'none' },
  fileRow: { borderTop:'1px solid var(--border)', padding:'1rem 0', display:'flex', alignItems:'center', gap:'1rem' },
  fileBtn: { padding:'.45rem 1.1rem', border:'1px solid rgba(232,237,245,.12)', fontFamily:'var(--font-ui)', fontSize:'.52rem', letterSpacing:'.18em', textTransform:'uppercase', color:'var(--muted)', background:'none', cursor:'none', transition:'all .2s' },
  submitRow: { display:'flex', justifyContent:'space-between', alignItems:'center', paddingTop:'2rem', borderTop:'1px solid var(--border)', marginTop:'auto' },
  formNote: { fontFamily:'var(--font-ui)', fontSize:'.58rem', color:'var(--muted)', lineHeight:1.7, maxWidth:'28ch' },
  submitBtn: { display:'inline-flex', alignItems:'center', gap:'.8rem', padding:'1rem 2.2rem', background:'var(--accent)', fontFamily:'var(--font-ui)', fontSize:'.65rem', letterSpacing:'.2em', textTransform:'uppercase', color:'#fff', border:'none', cursor:'none', transition:'background .2s, transform .2s' },

  successOverlay: { position:'fixed', inset:0, background:'var(--ink)', display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', gap:'2rem', textAlign:'center', padding:'2rem', animation:'fadeIn .5s forwards' },
  successIcon: { width:80, height:80, borderRadius:'50%', border:'1.5px solid var(--accent)', display:'flex', alignItems:'center', justifyContent:'center' },
  successTitle: { fontFamily:'var(--font-display)', fontWeight:900, fontSize:'clamp(3rem,8vw,6rem)', lineHeight:.9 },
  successSub: { fontFamily:'var(--font-body)', fontSize:'.85rem', color:'var(--ice)', lineHeight:1.9, maxWidth:'36ch' },
  successBack: { display:'inline-flex', alignItems:'center', gap:'.7rem', padding:'.9rem 2rem', border:'1px solid rgba(232,237,245,.2)', fontFamily:'var(--font-ui)', fontSize:'.62rem', letterSpacing:'.18em', textTransform:'uppercase', color:'var(--paper)', textDecoration:'none', marginTop:'1rem' },
}
