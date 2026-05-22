import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter, BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './styles/global.css'

// GitHub Pages needs HashRouter (no server-side routing)
// Hostinger supports BrowserRouter (has .htaccess rewrite)
const isHostinger = import.meta.env.VITE_TARGET === 'hostinger'
const Router = isHostinger ? BrowserRouter : HashRouter

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
)
