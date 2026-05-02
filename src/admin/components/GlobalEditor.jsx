import { useState } from 'react'
import { useContent } from '../../context/ContentContext'
import { Field, TextInput, TextArea, ImageUpload, SaveBar, SectionCard } from './EditorField'

// ── GLOBAL EDITOR ──────────────────────────────────────────────────
export function GlobalEditor() {
  const { content, saveSection, saving } = useContent()
  const [form, setForm] = useState({ ...content.global })
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  return (
    <div>
      <p style={D.intro}>These settings apply across every page of the site.</p>
      <SectionCard title="Brand Identity">
        <Field label="Brand Name"><TextInput value={form.brandName} onChange={v=>set('brandName',v)} /></Field>
        <Field label="Designer Name"><TextInput value={form.designerName} onChange={v=>set('designerName',v)} /></Field>
      </SectionCard>
      <SectionCard title="Contact Info">
        <Field label="Email Address"><TextInput value={form.email} onChange={v=>set('email',v)} placeholder="hello@..." /></Field>
        <Field label="Location"><TextInput value={form.location} onChange={v=>set('location',v)} /></Field>
      </SectionCard>
      <SectionCard title="Social Links">
        <Field label="Vimeo URL"><TextInput value={form.vimeoUrl} onChange={v=>set('vimeoUrl',v)} placeholder="https://vimeo.com/..." /></Field>
        <Field label="Instagram URL"><TextInput value={form.instagramUrl} onChange={v=>set('instagramUrl',v)} placeholder="https://instagram.com/..." /></Field>
        <Field label="LinkedIn URL"><TextInput value={form.linkedinUrl} onChange={v=>set('linkedinUrl',v)} placeholder="https://linkedin.com/..." /></Field>
        <Field label="Behance URL"><TextInput value={form.behanceUrl} onChange={v=>set('behanceUrl',v)} placeholder="https://behance.net/..." /></Field>
      </SectionCard>
      <SectionCard title="Showreel">
        <Field label="Vimeo Embed URL" hint="Paste the full player embed URL from Vimeo (e.g. https://player.vimeo.com/video/123456?autoplay=1)">
          <TextInput value={form.showreelUrl} onChange={v=>set('showreelUrl',v)} />
        </Field>
      </SectionCard>
      <SaveBar onSave={() => saveSection('global', form)} saving={saving} />
    </div>
  )
}

// ── HOME EDITOR ────────────────────────────────────────────────────
export function HomeEditor() {
  const { content, saveSection, saving } = useContent()
  const [form, setForm] = useState({ ...content.home })
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  return (
    <div>
      <p style={D.intro}>Edit all text and content that appears on the home page.</p>

      <SectionCard title="Hero Section">
        <Field label="Eyebrow Text" hint="Small text above the name"><TextInput value={form.heroEyebrow} onChange={v=>set('heroEyebrow',v)} /></Field>
        <Field label="Main Name (large)"><TextInput value={form.heroTitle} onChange={v=>set('heroTitle',v)} /></Field>
        <Field label="Surname / Accent"><TextInput value={form.heroSubtitle} onChange={v=>set('heroSubtitle',v)} /></Field>
        <Field label="Hero Paragraph"><TextArea value={form.heroBody} onChange={v=>set('heroBody',v)} rows={3} /></Field>
      </SectionCard>

      <SectionCard title="Hero Stats">
        <div style={D.row3}>
          <Field label="Years Stat"><TextInput value={form.statsYears} onChange={v=>set('statsYears',v)} placeholder="8+" /></Field>
          <Field label="Projects Stat"><TextInput value={form.statsProjects} onChange={v=>set('statsProjects',v)} placeholder="200+" /></Field>
          <Field label="Clients Stat"><TextInput value={form.statsClients} onChange={v=>set('statsClients',v)} placeholder="60+" /></Field>
        </div>
      </SectionCard>

      <SectionCard title="Showreel Strip">
        <Field label="Duration Label"><TextInput value={form.showreelDuration} onChange={v=>set('showreelDuration',v)} /></Field>
        <Field label="Featured Work Label"><TextInput value={form.showreelFeatured} onChange={v=>set('showreelFeatured',v)} /></Field>
        <Field label="Tools Label"><TextInput value={form.showreelTools} onChange={v=>set('showreelTools',v)} /></Field>
      </SectionCard>

      <SectionCard title="About Strip (Home)">
        <Field label="Quote Text"><TextArea value={form.aboutQuote} onChange={v=>set('aboutQuote',v)} rows={2} /></Field>
        <Field label="Body Text"><TextArea value={form.aboutBody} onChange={v=>set('aboutBody',v)} rows={3} /></Field>
      </SectionCard>

      <SectionCard title="Contact CTA">
        <div style={D.row2}>
          <Field label="CTA Heading"><TextInput value={form.ctaTitle} onChange={v=>set('ctaTitle',v)} /></Field>
          <Field label="Accent Word"><TextInput value={form.ctaAccent} onChange={v=>set('ctaAccent',v)} /></Field>
        </div>
      </SectionCard>

      <SectionCard title="Marquee Ticker" >
        <Field label="Items (comma separated)" hint="These scroll across the accent bar below the hero.">
          <TextArea
            value={(form.marqueeItems||[]).join(', ')}
            onChange={v => set('marqueeItems', v.split(',').map(s=>s.trim()).filter(Boolean))}
            rows={3}
          />
        </Field>
      </SectionCard>

      <SaveBar onSave={() => saveSection('home', form)} saving={saving} />
    </div>
  )
}

// ── ABOUT EDITOR ───────────────────────────────────────────────────
export function AboutEditor() {
  const { content, saveSection, uploadImage, saving } = useContent()
  const [form, setForm]     = useState({ ...content.about })
  const [uploading, setUploading] = useState(false)
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handlePortrait = async (file) => {
    if (!file) { set('portraitUrl', ''); return }
    setUploading(true)
    const url = await uploadImage(file, 'portrait')
    set('portraitUrl', url)
    setUploading(false)
  }

  return (
    <div>
      <p style={D.intro}>Edit content for the About page.</p>

      <SectionCard title="Portrait Photo">
        <ImageUpload label="Portrait" value={form.portraitUrl} onUpload={handlePortrait} uploading={uploading} />
      </SectionCard>

      <SectionCard title="Bio">
        <Field label="Headline"><TextInput value={form.headline} onChange={v=>set('headline',v)} /></Field>
        <Field label="Bio Paragraph 1"><TextArea value={form.bio1} onChange={v=>set('bio1',v)} rows={4} /></Field>
        <Field label="Bio Paragraph 2"><TextArea value={form.bio2} onChange={v=>set('bio2',v)} rows={4} /></Field>
        <Field label="Bio Paragraph 3"><TextArea value={form.bio3} onChange={v=>set('bio3',v)} rows={3} /></Field>
        <Field label="Based In"><TextInput value={form.basedIn} onChange={v=>set('basedIn',v)} /></Field>
      </SectionCard>

      <SectionCard title="Philosophy Quote">
        <Field label="Quote Text"><TextArea value={form.quote} onChange={v=>set('quote',v)} rows={3} /></Field>
      </SectionCard>

      <SectionCard title="Availability Tags" >
        <Field label="Tags (comma separated)" hint="e.g. Freelance Projects, Creative Direction">
          <TextArea
            value={(form.availability||[]).join(', ')}
            onChange={v => set('availability', v.split(',').map(s=>s.trim()).filter(Boolean))}
            rows={2}
          />
        </Field>
      </SectionCard>

      <SectionCard title="Client Logos">
        <Field label="Client Names (comma separated)" hint="Names appear in the client wall — one per cell">
          <TextArea
            value={(form.clients||[]).join(', ')}
            onChange={v => set('clients', v.split(',').map(s=>s.trim()).filter(Boolean))}
            rows={2}
          />
        </Field>
      </SectionCard>

      <SaveBar onSave={() => saveSection('about', form)} saving={saving} />
    </div>
  )
}

// ── NOVA CASE STUDY EDITOR ─────────────────────────────────────────
export function NovaEditor() {
  const { content, saveSection, saving } = useContent()
  const [form, setForm] = useState({ ...content.nova })
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  return (
    <div>
      <p style={D.intro}>Edit the Nova Collective case study page.</p>

      <SectionCard title="Project Details (Sidebar)">
        <Field label="Client Name"><TextInput value={form.client} onChange={v=>set('client',v)} /></Field>
        <Field label="Studio Location"><TextInput value={form.location} onChange={v=>set('location',v)} /></Field>
        <Field label="Delivered By"><TextInput value={form.deliveredBy} onChange={v=>set('deliveredBy',v)} /></Field>
        <Field label="Tools Used"><TextInput value={form.tools} onChange={v=>set('tools',v)} /></Field>
        <div style={D.row2}>
          <Field label="Budget Range"><TextInput value={form.budget} onChange={v=>set('budget',v)} /></Field>
          <Field label="Timeline"><TextInput value={form.timeline} onChange={v=>set('timeline',v)} /></Field>
        </div>
        <Field label="Delivery Format"><TextInput value={form.format} onChange={v=>set('format',v)} /></Field>
      </SectionCard>

      <SectionCard title="Brief Text">
        <Field label="Paragraph 1"><TextArea value={form.brief} onChange={v=>set('brief',v)} rows={5} /></Field>
        <Field label="Paragraph 2"><TextArea value={form.brief2} onChange={v=>set('brief2',v)} rows={4} /></Field>
        <Field label="Client Quote"><TextArea value={form.quote} onChange={v=>set('quote',v)} rows={2} /></Field>
        <Field label="Quote Author"><TextInput value={form.quoteAuthor} onChange={v=>set('quoteAuthor',v)} /></Field>
      </SectionCard>

      <SectionCard title="Outcome Numbers">
        <div style={D.row4}>
          <Field label="Stat 1 Value"><TextInput value={form.outcome1} onChange={v=>set('outcome1',v)} placeholder="4.2M" /></Field>
          <Field label="Stat 1 Label"><TextInput value={form.outcome1Label} onChange={v=>set('outcome1Label',v)} /></Field>
          <Field label="Stat 2 Value"><TextInput value={form.outcome2} onChange={v=>set('outcome2',v)} placeholder="+68%" /></Field>
          <Field label="Stat 2 Label"><TextInput value={form.outcome2Label} onChange={v=>set('outcome2Label',v)} /></Field>
        </div>
        <div style={D.row4}>
          <Field label="Stat 3 Value"><TextInput value={form.outcome3} onChange={v=>set('outcome3',v)} /></Field>
          <Field label="Stat 3 Label"><TextInput value={form.outcome3Label} onChange={v=>set('outcome3Label',v)} /></Field>
          <Field label="Stat 4 Value"><TextInput value={form.outcome4} onChange={v=>set('outcome4',v)} /></Field>
          <Field label="Stat 4 Label"><TextInput value={form.outcome4Label} onChange={v=>set('outcome4Label',v)} /></Field>
        </div>
      </SectionCard>

      <SectionCard title="Client Testimony">
        <Field label="Testimony Text"><TextArea value={form.testimony} onChange={v=>set('testimony',v)} rows={4} /></Field>
        <Field label="Attributed To"><TextInput value={form.testimonyBy} onChange={v=>set('testimonyBy',v)} /></Field>
      </SectionCard>

      <SaveBar onSave={() => saveSection('nova', form)} saving={saving} />
    </div>
  )
}

// ── PROJECTS EDITOR ────────────────────────────────────────────────
export function ProjectsEditor() {
  const { content, saveProjects, uploadImage, saving } = useContent()
  const [projects, setProjects] = useState([...content.projects])
  const [expanded, setExpanded] = useState(null)
  const [uploading, setUploading] = useState(null)

  const update = (id, key, val) => {
    setProjects(prev => prev.map(p => p.id===id ? { ...p, [key]:val } : p))
  }

  const handleImage = async (id, file) => {
    if (!file) { update(id, 'imageUrl', ''); return }
    setUploading(id)
    const url = await uploadImage(file, `project-${id}`)
    update(id, 'imageUrl', url)
    setUploading(null)
  }

  const addProject = () => {
    const newId = Math.max(...projects.map(p=>p.id), 0) + 1
    const newP  = { id:newId, cat:'branding', tag:'', title:'NEW PROJECT', year:new Date().getFullYear().toString(), desc:'', imageUrl:'', grad:'linear-gradient(135deg,#04080f 0%,#1e6fff 100%)', link:'', featured:false, visible:true }
    setProjects(prev => [...prev, newP])
    setExpanded(newId)
  }

  const removeProject = (id) => {
    setProjects(prev => prev.filter(p => p.id !== id))
    if (expanded === id) setExpanded(null)
  }

  const moveProject = (id, dir) => {
    setProjects(prev => {
      const idx = prev.findIndex(p=>p.id===id)
      const next = [...prev]
      const swap = idx + dir
      if (swap < 0 || swap >= next.length) return prev
      ;[next[idx], next[swap]] = [next[swap], next[idx]]
      return next
    })
  }

  const CATS = ['branding','broadcast','3d','ui']

  return (
    <div>
      <div style={D.projectsHeader}>
        <p style={D.intro}>Manage all projects — reorder, edit, show/hide, and upload images.</p>
        <button onClick={addProject} style={D.addBtn}>+ Add Project</button>
      </div>

      {projects.map((p, idx) => (
        <div key={p.id} style={{ ...D.projectRow, opacity: p.visible ? 1 : 0.45 }}>
          {/* Row header */}
          <div style={D.projectRowHeader} onClick={() => setExpanded(expanded===p.id ? null : p.id)}>
            {/* Thumbnail swatch */}
            <div style={{ width:42, height:42, background: p.imageUrl ? `url(${p.imageUrl}) center/cover` : p.grad, flexShrink:0, border:'1px solid rgba(30,111,255,.15)' }}/>
            <div style={{ flex:1, minWidth:0 }}>
              <div style={D.projTitle}>{p.title}</div>
              <div style={D.projMeta}>{p.cat} · {p.year}</div>
            </div>
            {/* Controls */}
            <div style={D.rowControls} onClick={e=>e.stopPropagation()}>
              <button onClick={()=>moveProject(p.id,-1)} style={D.iconBtn} title="Move up">↑</button>
              <button onClick={()=>moveProject(p.id,1)}  style={D.iconBtn} title="Move down">↓</button>
              <button
                onClick={()=>update(p.id,'visible',!p.visible)}
                style={{ ...D.iconBtn, color: p.visible ? '#4dff91' : '#5a6a82' }}
                title={p.visible ? 'Hide project' : 'Show project'}
              >
                {p.visible ? '👁' : '🙈'}
              </button>
              <button onClick={()=>removeProject(p.id)} style={{ ...D.iconBtn, color:'rgba(255,80,80,.6)' }} title="Delete">✕</button>
              <span style={D.expandChevron}>{expanded===p.id ? '▲' : '▼'}</span>
            </div>
          </div>

          {/* Expanded editor */}
          {expanded === p.id && (
            <div style={D.projectEditor}>
              <div style={D.row2}>
                <Field label="Title"><TextInput value={p.title} onChange={v=>update(p.id,'title',v)} /></Field>
                <Field label="Year"><TextInput value={p.year} onChange={v=>update(p.id,'year',v)} /></Field>
              </div>
              <div style={D.row2}>
                <Field label="Category">
                  <select value={p.cat} onChange={e=>update(p.id,'cat',e.target.value)} style={D.select}>
                    {CATS.map(c=><option key={c} value={c}>{c}</option>)}
                  </select>
                </Field>
                <Field label="Tag Label"><TextInput value={p.tag} onChange={v=>update(p.id,'tag',v)} placeholder="e.g. Brand Identity" /></Field>
              </div>
              <Field label="Description"><TextArea value={p.desc} onChange={v=>update(p.id,'desc',v)} rows={3} /></Field>
              <Field label="Case Study Link" hint="Leave blank if no case study page yet"><TextInput value={p.link} onChange={v=>update(p.id,'link',v)} placeholder="/project-nova" /></Field>
              <div style={D.row2}>
                <label style={D.checkLabel}>
                  <input type="checkbox" checked={p.featured} onChange={e=>update(p.id,'featured',e.target.checked)} />
                  Featured on Home Page
                </label>
                <label style={D.checkLabel}>
                  <input type="checkbox" checked={p.visible} onChange={e=>update(p.id,'visible',e.target.checked)} />
                  Visible on Projects Page
                </label>
              </div>
              <Field label="Project Image">
                <ImageUpload label="Project image" value={p.imageUrl} onUpload={f=>handleImage(p.id,f)} uploading={uploading===p.id} />
              </Field>
            </div>
          )}
        </div>
      ))}

      <SaveBar onSave={() => saveProjects(projects)} saving={saving} label="Save All Projects" />
    </div>
  )
}

// ── Shared layout helpers ──
const D = {
  intro: { fontFamily:'var(--font-body)', fontSize:'0.95rem', color:'#5a6a82', marginBottom:'1.5rem', lineHeight:1.6 },
  row2:  { display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1rem' },
  row3:  { display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:'1rem' },
  row4:  { display:'grid', gridTemplateColumns:'1fr 1fr 1fr 1fr', gap:'1rem', marginBottom:'1rem' },
  projectsHeader: { display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'1.5rem', flexWrap:'wrap', gap:'1rem' },
  addBtn: { background:'rgba(30,111,255,.15)', border:'1px solid rgba(30,111,255,.3)', color:'#7aa8e8', padding:'0.6rem 1.2rem', fontFamily:'var(--font-ui)', fontSize:'0.88rem', cursor:'pointer', whiteSpace:'nowrap' },
  projectRow: { background:'#080f1a', border:'1px solid rgba(30,111,255,.1)', marginBottom:'0.5rem', transition:'opacity 0.2s' },
  projectRowHeader: { display:'flex', alignItems:'center', gap:'1rem', padding:'1rem', cursor:'pointer' },
  projTitle: { fontFamily:'var(--font-display)', fontWeight:800, fontSize:'1rem', color:'#e8edf5' },
  projMeta:  { fontFamily:'var(--font-ui)', fontSize:'0.78rem', color:'#5a6a82', marginTop:2 },
  rowControls:  { display:'flex', alignItems:'center', gap:'0.4rem' },
  iconBtn:      { background:'none', border:'none', color:'#5a6a82', cursor:'pointer', fontSize:'1rem', padding:'0.3rem 0.5rem', transition:'color 0.2s' },
  expandChevron:{ fontFamily:'var(--font-ui)', fontSize:'0.75rem', color:'#5a6a82', paddingLeft:'0.3rem' },
  projectEditor:{ padding:'1.5rem', borderTop:'1px solid rgba(30,111,255,.08)', background:'#060d1a' },
  select:       { width:'100%', background:'rgba(232,237,245,.04)', border:'1px solid rgba(30,111,255,.18)', padding:'0.75rem 1rem', fontFamily:'var(--font-body)', fontSize:'0.95rem', color:'#e8edf5', outline:'none' },
  checkLabel:   { display:'flex', alignItems:'center', gap:'0.5rem', fontFamily:'var(--font-ui)', fontSize:'0.88rem', color:'#7aa8e8', cursor:'pointer' },
}
