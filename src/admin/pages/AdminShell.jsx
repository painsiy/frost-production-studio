import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useContent } from '../../context/ContentContext'

// Editor panels
import GlobalEditor   from '../components/GlobalEditor'
import HomeEditor     from '../components/HomeEditor'
import AboutEditor    from '../components/AboutEditor'
import ProjectsEditor from '../components/ProjectsEditor'
import NovaEditor     from '../components/NovaEditor'
import MobilePreview  from '../components/MobilePreview'

const SECTIONS = [
  { key:'global',   label:'⚙️  Global Settings',  icon:'⚙️'  },
  { key:'home',     label:'🏠  Home Page',          icon:'🏠'  },
  { key:'about',    label:'👤  About Page',          icon:'👤'  },
  { key:'projects', label:'🎬  Projects',            icon:'🎬'  },
  { key:'nova',     label:'📁  Nova Case Study',     icon:'📁'  },
]

export default function AdminShell() {
  const { logout, user }      = useAuth()
  const { saving, saveMsg }   = useContent()
  const [section, setSection] = useState('home')
  const [preview, setPreview] = useState(false)
  const [previewPage, setPreviewPage] = useState('/')
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const PREVIEW_PAGES = [
    { path:'/',             label:'Home'     },
    { path:'/projects',     label:'Projects' },
    { path:'/about',        label:'About'    },
    { path:'/contact',      label:'Contact'  },
    { path:'/project-nova', label:'Nova'     },
  ]

  return (
    <div style={S.shell}>

      {/* ── SIDEBAR ── */}
      <aside style={{ ...S.sidebar, width: sidebarOpen ? 260 : 64, transition:'width 0.3s' }}>
        {/* Brand */}
        <div style={S.sidebarBrand}>
          <div style={S.brandMark}>FP</div>
          {sidebarOpen && (
            <div style={S.brandText}>
              <div style={S.brandName}>Frost CMS</div>
              <div style={S.brandSub}>Admin Panel</div>
            </div>
          )}
          <button onClick={() => setSidebarOpen(o=>!o)} style={S.collapseBtn}>
            {sidebarOpen ? '◀' : '▶'}
          </button>
        </div>

        {/* Nav */}
        <nav style={S.sideNav}>
          {SECTIONS.map(s => (
            <button
              key={s.key}
              onClick={() => setSection(s.key)}
              style={{
                ...S.navBtn,
                background: section===s.key ? 'rgba(30,111,255,.15)' : 'none',
                borderLeft: section===s.key ? '3px solid #1e6fff' : '3px solid transparent',
                color: section===s.key ? '#7aa8e8' : '#5a6a82',
              }}
              title={s.label}
            >
              <span style={S.navIcon}>{s.icon}</span>
              {sidebarOpen && <span style={S.navLabel}>{s.label.split('  ')[1]}</span>}
            </button>
          ))}
        </nav>

        {/* Preview toggle */}
        <div style={S.sidebarBottom}>
          <button
            onClick={() => setPreview(p => !p)}
            style={{
              ...S.previewToggle,
              background: preview ? '#1e6fff' : 'rgba(30,111,255,.1)',
              color: preview ? '#fff' : '#7aa8e8',
            }}
            title="Toggle Mobile Preview"
          >
            <span>📱</span>
            {sidebarOpen && <span>Mobile Preview</span>}
          </button>
        </div>
      </aside>

      {/* ── MAIN AREA ── */}
      <div style={S.main}>

        {/* Top bar */}
        <header style={S.topbar}>
          <div style={S.topbarLeft}>
            <h1 style={S.topbarTitle}>
              {SECTIONS.find(s=>s.key===section)?.label}
            </h1>
          </div>
          <div style={S.topbarRight}>
            {/* Save message */}
            {saveMsg && (
              <div style={{
                ...S.saveMsg,
                background: saveMsg.startsWith('✓') ? 'rgba(46,200,100,.15)' : 'rgba(255,100,100,.15)',
                color:       saveMsg.startsWith('✓') ? '#4dff91' : '#ff6b6b',
                border:      saveMsg.startsWith('✓') ? '1px solid rgba(77,255,145,.2)' : '1px solid rgba(255,107,107,.2)',
              }}>
                {saveMsg}
              </div>
            )}
            {saving && <div style={S.savingSpinner}>Saving…</div>}

            {/* Preview page selector */}
            {preview && (
              <select
                value={previewPage}
                onChange={e => setPreviewPage(e.target.value)}
                style={S.pageSelect}
              >
                {PREVIEW_PAGES.map(p=>(
                  <option key={p.path} value={p.path}>{p.label}</option>
                ))}
              </select>
            )}

            {/* Live site link */}
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              style={S.liveSiteBtn}
            >
              View Live Site ↗
            </a>

            {/* User + logout */}
            <div style={S.userChip}>
              <div style={S.userAvatar}>
                {(user?.name || user?.email || 'A')[0].toUpperCase()}
              </div>
              <div style={S.userName}>{user?.name || user?.email}</div>
              <button onClick={logout} style={S.logoutBtn}>Sign Out</button>
            </div>
          </div>
        </header>

        {/* Content area */}
        <div style={S.contentArea}>
          {/* Editor panel */}
          <div style={{
            flex: 1, overflowY: 'auto',
            padding: '2rem', minWidth: 0,
          }}>
            {section==='global'   && <GlobalEditor/>}
            {section==='home'     && <HomeEditor/>}
            {section==='about'    && <AboutEditor/>}
            {section==='projects' && <ProjectsEditor/>}
            {section==='nova'     && <NovaEditor/>}
          </div>

          {/* Mobile preview panel */}
          {preview && (
            <div style={S.previewPanel}>
              <div style={S.previewHeader}>
                <span style={S.previewTitle}>📱 Mobile Preview</span>
                <button onClick={() => setPreview(false)} style={S.previewClose}>×</button>
              </div>
              <MobilePreview page={previewPage} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

const S = {
  shell: { display:'flex', minHeight:'100vh', background:'#04080f', color:'#e8edf5', fontFamily:'var(--font-body)' },

  sidebar: { background:'#060d1a', borderRight:'1px solid rgba(30,111,255,.1)', display:'flex', flexDirection:'column', flexShrink:0, overflowX:'hidden' },
  sidebarBrand: { display:'flex', alignItems:'center', gap:'0.7rem', padding:'1.2rem 1rem', borderBottom:'1px solid rgba(30,111,255,.08)', minHeight:64 },
  brandMark: { width:34, height:34, background:'#1e6fff', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'var(--font-display)', fontWeight:900, fontSize:'0.85rem', color:'#fff', flexShrink:0 },
  brandText: { flex:1, minWidth:0 },
  brandName: { fontFamily:'var(--font-display)', fontWeight:800, fontSize:'0.88rem', letterSpacing:'0.08em', textTransform:'uppercase', color:'#e8edf5', whiteSpace:'nowrap' },
  brandSub:  { fontFamily:'var(--font-ui)', fontSize:'0.72rem', color:'#5a6a82', marginTop:2 },
  collapseBtn: { background:'none', border:'none', color:'#5a6a82', cursor:'pointer', fontSize:'0.75rem', padding:'0.3rem', flexShrink:0 },

  sideNav: { flex:1, display:'flex', flexDirection:'column', padding:'0.8rem 0', overflowY:'auto' },
  navBtn:  { display:'flex', alignItems:'center', gap:'0.7rem', padding:'0.75rem 1rem', background:'none', border:'none', cursor:'pointer', width:'100%', textAlign:'left', transition:'all 0.2s', whiteSpace:'nowrap' },
  navIcon: { fontSize:'1.1rem', flexShrink:0, width:24, textAlign:'center' },
  navLabel:{ fontFamily:'var(--font-ui)', fontSize:'0.88rem', letterSpacing:'0.05em' },

  sidebarBottom: { padding:'1rem', borderTop:'1px solid rgba(30,111,255,.08)' },
  previewToggle: { display:'flex', alignItems:'center', gap:'0.6rem', width:'100%', padding:'0.7rem 0.8rem', border:'none', cursor:'pointer', borderRadius:4, fontFamily:'var(--font-ui)', fontSize:'0.85rem', transition:'all 0.2s' },

  main:    { flex:1, display:'flex', flexDirection:'column', minWidth:0, overflow:'hidden' },
  topbar:  { display:'flex', justifyContent:'space-between', alignItems:'center', padding:'0 2rem', height:64, borderBottom:'1px solid rgba(30,111,255,.08)', background:'#060d1a', flexShrink:0, flexWrap:'wrap', gap:'0.5rem' },
  topbarLeft:  { display:'flex', alignItems:'center' },
  topbarRight: { display:'flex', alignItems:'center', gap:'1rem', flexWrap:'wrap' },
  topbarTitle: { fontFamily:'var(--font-display)', fontWeight:800, fontSize:'1.1rem', color:'#e8edf5' },

  saveMsg:       { fontFamily:'var(--font-ui)', fontSize:'0.82rem', padding:'0.4rem 0.9rem', borderRadius:4 },
  savingSpinner: { fontFamily:'var(--font-ui)', fontSize:'0.82rem', color:'#7aa8e8', animation:'pulse-dot 1s infinite' },
  pageSelect:    { background:'#0d1a2e', border:'1px solid rgba(30,111,255,.2)', color:'#e8edf5', padding:'0.4rem 0.8rem', fontFamily:'var(--font-ui)', fontSize:'0.82rem', cursor:'pointer' },
  liveSiteBtn:   { fontFamily:'var(--font-ui)', fontSize:'0.82rem', color:'#7aa8e8', textDecoration:'none', padding:'0.4rem 0.8rem', border:'1px solid rgba(30,111,255,.2)', transition:'all 0.2s', whiteSpace:'nowrap' },
  userChip:      { display:'flex', alignItems:'center', gap:'0.6rem' },
  userAvatar:    { width:30, height:30, borderRadius:'50%', background:'#1e6fff', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'var(--font-display)', fontWeight:800, fontSize:'0.85rem', color:'#fff' },
  userName:      { fontFamily:'var(--font-ui)', fontSize:'0.82rem', color:'#7aa8e8', maxWidth:140, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' },
  logoutBtn:     { background:'none', border:'1px solid rgba(255,100,100,.2)', color:'rgba(255,100,100,.7)', padding:'0.3rem 0.7rem', fontFamily:'var(--font-ui)', fontSize:'0.78rem', cursor:'pointer', transition:'all 0.2s' },

  contentArea:  { flex:1, display:'flex', overflow:'hidden' },
  previewPanel: { width:420, borderLeft:'1px solid rgba(30,111,255,.1)', background:'#030810', display:'flex', flexDirection:'column', flexShrink:0 },
  previewHeader:{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'0.8rem 1.2rem', borderBottom:'1px solid rgba(30,111,255,.08)' },
  previewTitle: { fontFamily:'var(--font-ui)', fontSize:'0.85rem', color:'#7aa8e8' },
  previewClose: { background:'none', border:'none', color:'#5a6a82', fontSize:'1.4rem', cursor:'pointer', lineHeight:1 },
}
