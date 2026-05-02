// Reusable form field for the admin dashboard

export function Field({ label, hint, children }) {
  return (
    <div style={F.wrap}>
      <label style={F.label}>{label}</label>
      {hint && <p style={F.hint}>{hint}</p>}
      {children}
    </div>
  )
}

export function TextInput({ value, onChange, placeholder }) {
  return (
    <input
      type="text"
      value={value || ''}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      style={F.input}
    />
  )
}

export function TextArea({ value, onChange, rows = 4, placeholder }) {
  return (
    <textarea
      value={value || ''}
      onChange={e => onChange(e.target.value)}
      rows={rows}
      placeholder={placeholder}
      style={{ ...F.input, resize:'vertical', lineHeight:1.7 }}
    />
  )
}

export function ImageUpload({ label, value, onUpload, uploading }) {
  return (
    <div style={F.imageWrap}>
      {value
        ? <img src={value} alt={label} style={F.imagePreview}/>
        : <div style={F.imagePlaceholder}>No image — gradient will be used</div>
      }
      <label style={F.uploadBtn}>
        {uploading ? 'Uploading…' : '+ Upload Image'}
        <input
          type="file"
          accept="image/*"
          style={{ display:'none' }}
          onChange={e => e.target.files[0] && onUpload(e.target.files[0])}
          disabled={uploading}
        />
      </label>
      {value && (
        <button onClick={() => onUpload(null)} style={F.removeBtn}>
          Remove Image
        </button>
      )}
    </div>
  )
}

export function SaveBar({ onSave, saving, label = 'Save Changes' }) {
  return (
    <div style={F.saveBar}>
      <button onClick={onSave} disabled={saving} style={F.saveBtn}>
        {saving ? 'Saving…' : label}
      </button>
    </div>
  )
}

export function SectionCard({ title, children }) {
  return (
    <div style={F.card}>
      <h3 style={F.cardTitle}>{title}</h3>
      <div style={F.cardBody}>{children}</div>
    </div>
  )
}

const F = {
  wrap:  { display:'flex', flexDirection:'column', gap:'0.4rem', marginBottom:'1.2rem' },
  label: { fontFamily:'var(--font-ui)', fontSize:'0.8rem', letterSpacing:'0.12em', textTransform:'uppercase', color:'#7aa8e8', fontWeight:500 },
  hint:  { fontFamily:'var(--font-body)', fontSize:'0.82rem', color:'#5a6a82', margin:'0 0 .3rem', lineHeight:1.5 },
  input: {
    background:'rgba(232,237,245,.04)', border:'1px solid rgba(30,111,255,.18)',
    padding:'0.75rem 1rem', fontFamily:'var(--font-body)', fontSize:'0.95rem',
    color:'#e8edf5', outline:'none', width:'100%',
    transition:'border-color 0.2s',
  },
  imageWrap:        { display:'flex', flexDirection:'column', gap:'0.6rem' },
  imagePreview:     { width:'100%', maxHeight:200, objectFit:'cover', border:'1px solid rgba(30,111,255,.2)' },
  imagePlaceholder: { background:'rgba(30,111,255,.05)', border:'1px dashed rgba(30,111,255,.2)', padding:'2rem', textAlign:'center', fontFamily:'var(--font-ui)', fontSize:'0.85rem', color:'#5a6a82' },
  uploadBtn: {
    display:'inline-block', padding:'0.6rem 1.2rem',
    background:'rgba(30,111,255,.15)', border:'1px solid rgba(30,111,255,.3)',
    fontFamily:'var(--font-ui)', fontSize:'0.82rem', letterSpacing:'0.08em',
    textTransform:'uppercase', color:'#7aa8e8', cursor:'pointer', textAlign:'center',
  },
  removeBtn: {
    background:'none', border:'1px solid rgba(255,80,80,.2)', color:'rgba(255,80,80,.6)',
    padding:'0.4rem 0.8rem', fontFamily:'var(--font-ui)', fontSize:'0.78rem', cursor:'pointer',
  },
  saveBar: { position:'sticky', bottom:0, background:'#04080f', borderTop:'1px solid rgba(30,111,255,.1)', padding:'1rem 0', marginTop:'2rem' },
  saveBtn: {
    background:'#1e6fff', border:'none', padding:'0.85rem 2.5rem',
    fontFamily:'var(--font-ui)', fontSize:'0.9rem', letterSpacing:'0.12em',
    textTransform:'uppercase', color:'#fff', cursor:'pointer', transition:'background 0.2s',
  },
  card:      { background:'#080f1a', border:'1px solid rgba(30,111,255,.1)', padding:'1.8rem', marginBottom:'1.5rem' },
  cardTitle: { fontFamily:'var(--font-display)', fontWeight:800, fontSize:'1rem', color:'#e8edf5', marginBottom:'1.5rem', paddingBottom:'0.8rem', borderBottom:'1px solid rgba(30,111,255,.1)' },
  cardBody:  { display:'flex', flexDirection:'column' },
}
