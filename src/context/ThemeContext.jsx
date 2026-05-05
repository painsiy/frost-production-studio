import { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext(null)

export function ThemeProvider({ children }) {
  const [theme,  setTheme]  = useState(() => localStorage.getItem('fps-theme')  || 'dark')
  const [cursor, setCursor] = useState(() => localStorage.getItem('fps-cursor') || 'custom')

  // Apply theme to <html> so CSS vars kick in everywhere
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('fps-theme', theme)
  }, [theme])

  // Apply cursor class to <body>
  useEffect(() => {
    if (cursor === 'normal') {
      document.body.classList.add('cursor-normal')
    } else {
      document.body.classList.remove('cursor-normal')
    }
    localStorage.setItem('fps-cursor', cursor)
  }, [cursor])

  const toggleTheme  = () => setTheme(t  => t  === 'dark'   ? 'light'  : 'dark')
  const toggleCursor = () => setCursor(c => c  === 'custom' ? 'normal' : 'custom')

  return (
    <ThemeContext.Provider value={{ theme, cursor, toggleTheme, toggleCursor }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
