import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { ThemeProvider } from './context/ThemeContext'
import { ContentProvider } from './context/ContentContext'
import { AuthProvider } from './context/AuthContext'
import Nav from './components/Nav'
import Cursor from './components/Cursor'
import ProgressBar from './components/ProgressBar'
import Footer from './components/Footer'
import SettingsToggle from './components/SettingsToggle'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Projects from './pages/Projects'
import ProjectNova from './pages/ProjectNova'
import ProjectRideflow from './pages/ProjectRideflow'

function AppInner() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])

  return (
    <>
      <Cursor />
      <ProgressBar />
      <Nav />
      <Routes>
        <Route path="/"             element={<Home />} />
        <Route path="/projects"     element={<Projects />} />
        <Route path="/about"        element={<About />} />
        <Route path="/contact"      element={<Contact />} />
        <Route path="/project-nova"     element={<ProjectNova />} />
        <Route path="/project-rideflow" element={<ProjectRideflow />} />
      </Routes>
      <Footer />
      <SettingsToggle />
    </>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ContentProvider>
          <AppInner />
        </ContentProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}
