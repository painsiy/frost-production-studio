import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { supabase, DEFAULT_CONTENT } from '../lib/supabase'

const ContentContext = createContext(null)

export function ContentProvider({ children }) {
  const [content, setContent]   = useState(DEFAULT_CONTENT)
  const [loading, setLoading]   = useState(true)
  const [saving,  setSaving]    = useState(false)
  const [saveMsg, setSaveMsg]   = useState('')

  // Load content from Supabase on mount
  useEffect(() => {
    loadContent()
  }, [])

  async function loadContent() {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('site_content')
        .select('*')
        .eq('id', 1)
        .single()

      if (data && !error) {
        setContent(prev => ({ ...prev, ...data.content }))
      }
      // If table doesn't exist yet, just use DEFAULT_CONTENT silently
    } catch {
      // Supabase not connected — use defaults
    } finally {
      setLoading(false)
    }
  }

  // Save a whole section (e.g. 'home', 'about', 'global')
  const saveSection = useCallback(async (section, data) => {
    setSaving(true)
    setSaveMsg('')

    // Update local state immediately (optimistic)
    setContent(prev => ({ ...prev, [section]: { ...prev[section], ...data } }))

    try {
      // Try to upsert to Supabase
      const newContent = { ...content, [section]: { ...content[section], ...data } }
      const { error } = await supabase
        .from('site_content')
        .upsert({ id: 1, content: newContent, updated_at: new Date().toISOString() })

      if (error) throw error
      setSaveMsg('✓ Saved successfully')
    } catch {
      // If Supabase isn't connected, save to localStorage as fallback
      const newContent = { ...content, [section]: { ...content[section], ...data } }
      localStorage.setItem('frost_content', JSON.stringify(newContent))
      setSaveMsg('✓ Saved locally (connect Supabase for cloud sync)')
    } finally {
      setSaving(false)
      setTimeout(() => setSaveMsg(''), 3000)
    }
  }, [content])

  // Save the entire projects array
  const saveProjects = useCallback(async (projects) => {
    setSaving(true)
    setContent(prev => ({ ...prev, projects }))
    try {
      const newContent = { ...content, projects }
      const { error } = await supabase
        .from('site_content')
        .upsert({ id: 1, content: newContent, updated_at: new Date().toISOString() })
      if (error) throw error
      setSaveMsg('✓ Projects saved')
    } catch {
      localStorage.setItem('frost_content', JSON.stringify({ ...content, projects }))
      setSaveMsg('✓ Saved locally')
    } finally {
      setSaving(false)
      setTimeout(() => setSaveMsg(''), 3000)
    }
  }, [content])

  // Upload image to Supabase storage, return public URL
  const uploadImage = useCallback(async (file, path) => {
    try {
      const ext  = file.name.split('.').pop()
      const name = `${path}-${Date.now()}.${ext}`
      const { error: upErr } = await supabase.storage
        .from('site-images')
        .upload(name, file, { upsert: true })
      if (upErr) throw upErr

      const { data } = supabase.storage.from('site-images').getPublicUrl(name)
      return data.publicUrl
    } catch {
      // Fallback: convert to base64 dataURL for demo
      return new Promise((res) => {
        const reader = new FileReader()
        reader.onload = (e) => res(e.target.result)
        reader.readAsDataURL(file)
      })
    }
  }, [])

  return (
    <ContentContext.Provider value={{
      content, loading, saving, saveMsg,
      saveSection, saveProjects, uploadImage, reload: loadContent,
    }}>
      {children}
    </ContentContext.Provider>
  )
}

export const useContent = () => {
  const ctx = useContext(ContentContext)
  if (!ctx) throw new Error('useContent must be used inside ContentProvider')
  return ctx
}
