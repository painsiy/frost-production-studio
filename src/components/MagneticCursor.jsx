import { useEffect, useRef, useState } from 'react'
import { useTheme } from '../context/ThemeContext'

// Images that appear as a trail when moving the mouse
// Uses the Rideflow thumbnail — you can add more in the array
const TRAIL_IMAGES = [
  '/frost-production-studio/images/rideflow-thumbnail.png',
  '/frost-production-studio/images/rideflow-logo-new.svg',
  '/frost-production-studio/images/rideflow-thumbnail.png',
]

export default function MagneticCursor() {
  const { cursor, theme } = useTheme()
  const isCustom = cursor === 'custom'
  const isDark   = theme === 'dark'

  const dotRef   = useRef(null)
  const ringRef  = useRef(null)
  const textRef  = useRef(null)
  const pos      = useRef({ mx:0, my:0, rx:0, ry:0, vx:0, vy:0 })
  const rafRef   = useRef(null)

  // Trail state
  const [trail, setTrail] = useState([])
  const lastTrail = useRef(0)
  const trailIdx  = useRef(0)

  useEffect(() => {
    if (!isCustom) return

    const onMove = (e) => {
      pos.current.mx = e.clientX
      pos.current.my = e.clientY

      // Spawn trail image every 120ms
      const now = Date.now()
      if (now - lastTrail.current > 120) {
        lastTrail.current = now
        const idx = trailIdx.current % TRAIL_IMAGES.length
        trailIdx.current++
        const id = now + Math.random()
        setTrail(t => [...t.slice(-6), {
          id, x: e.clientX, y: e.clientY,
          src: TRAIL_IMAGES[idx],
          rotation: (Math.random() - 0.5) * 24,
        }])
        // Remove after 800ms
        setTimeout(() => setTrail(t => t.filter(i => i.id !== id)), 800)
      }

      // Magnetic effect — pull cursor ring toward magnetic elements
      const els = document.querySelectorAll('[data-magnetic]')
      els.forEach(el => {
        const rect = el.getBoundingClientRect()
        const cx = rect.left + rect.width / 2
        const cy = rect.top  + rect.height / 2
        const dx = e.clientX - cx
        const dy = e.clientY - cy
        const dist = Math.sqrt(dx*dx + dy*dy)
        const threshold = Math.max(rect.width, rect.height) * 1.2

        if (dist < threshold) {
          const pull = 1 - dist / threshold
          el.style.transform = `translate(${-dx * pull * 0.35}px, ${-dy * pull * 0.35}px)`
        } else {
          el.style.transform = 'translate(0,0)'
        }
      })

      // Detect hover targets
      const target = e.target.closest('a, button, [data-cursor]')
      if (target) {
        const label = target.getAttribute('data-cursor') || ''
        if (textRef.current) textRef.current.textContent = label
        ringRef.current?.classList.add('cursor-hover')
        dotRef.current?.classList.add('cursor-hover')
      } else {
        if (textRef.current) textRef.current.textContent = ''
        ringRef.current?.classList.remove('cursor-hover')
        dotRef.current?.classList.remove('cursor-hover')
      }
    }

    window.addEventListener('mousemove', onMove)

    const animate = () => {
      const p = pos.current
      p.rx += (p.mx - p.rx) * 0.12
      p.ry += (p.my - p.ry) * 0.12
      if (dotRef.current) {
        dotRef.current.style.left = p.mx + 'px'
        dotRef.current.style.top  = p.my + 'px'
      }
      if (ringRef.current) {
        ringRef.current.style.left = p.rx + 'px'
        ringRef.current.style.top  = p.ry + 'px'
      }
      rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafRef.current)
      // Reset magnetic elements
      document.querySelectorAll('[data-magnetic]').forEach(el => {
        el.style.transform = 'translate(0,0)'
      })
    }
  }, [isCustom])

  if (!isCustom) return null

  const ringColor = isDark ? 'rgba(30,111,255,0.6)' : 'rgba(30,111,255,0.5)'
  const dotColor  = 'var(--accent)'

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        id="fps-cursor"
        style={{
          position:'fixed', top:0, left:0, zIndex:9999,
          width:8, height:8,
          background: dotColor, borderRadius:'50%',
          pointerEvents:'none', transform:'translate(-50%,-50%)',
          transition:'width .2s, height .2s, background .2s',
          mixBlendMode:'difference',
        }}
      />

      {/* Ring */}
      <div
        ref={ringRef}
        id="fps-cursor-ring"
        style={{
          position:'fixed', top:0, left:0, zIndex:9998,
          width:40, height:40,
          border:`1.5px solid ${ringColor}`,
          borderRadius:'50%',
          pointerEvents:'none', transform:'translate(-50%,-50%)',
          transition:'width .3s cubic-bezier(.22,.68,0,1.2), height .3s cubic-bezier(.22,.68,0,1.2), border-color .2s',
          display:'flex', alignItems:'center', justifyContent:'center',
        }}
      >
        <span
          ref={textRef}
          style={{
            fontFamily:'var(--font-ui)', fontSize:'0.52rem',
            letterSpacing:'.12em', textTransform:'uppercase',
            color:'var(--accent)', whiteSpace:'nowrap',
            transition:'opacity .2s',
          }}
        />
      </div>

      {/* Image trail */}
      {trail.map(item => (
        <div
          key={item.id}
          style={{
            position:'fixed',
            left: item.x, top: item.y,
            transform:`translate(-50%,-50%) rotate(${item.rotation}deg)`,
            width: 120, height: 80,
            pointerEvents:'none',
            zIndex: 9997,
            animation:'trailFade .8s ease forwards',
            overflow:'hidden',
            borderRadius: 4,
            boxShadow:'0 8px 32px rgba(0,0,0,.3)',
          }}
        >
          <img
            src={item.src}
            alt=""
            style={{ width:'100%', height:'100%', objectFit:'cover' }}
          />
        </div>
      ))}

      <style>{`
        /* Ring grows on hover */
        #fps-cursor-ring.cursor-hover { width:64px !important; height:64px !important; }
        #fps-cursor.cursor-hover      { width:6px !important; height:6px !important; opacity:.5; }

        /* Trail image animation */
        @keyframes trailFade {
          0%   { opacity:0;   transform:translate(-50%,-60%) rotate(var(--r,0deg)) scale(.7); }
          20%  { opacity:1;   transform:translate(-50%,-50%) rotate(var(--r,0deg)) scale(1); }
          100% { opacity:0;   transform:translate(-50%,-40%) rotate(var(--r,0deg)) scale(.85); }
        }

        /* Magnetic element transition */
        [data-magnetic] { transition: transform .4s cubic-bezier(.22,.68,0,1.2); }
      `}</style>
    </>
  )
}
