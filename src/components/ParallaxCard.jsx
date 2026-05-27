import { useRef } from 'react'

export default function ParallaxCard({ children, style = {}, className = '' }) {
  const cardRef = useRef(null)

  const handleMouseMove = (e) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const cx = rect.width  / 2
    const cy = rect.height / 2
    const rotX = ((y - cy) / cy) * -8   // max 8deg tilt
    const rotY = ((x - cx) / cx) *  8
    card.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.02,1.02,1.02)`
    card.style.transition = 'transform 0.1s ease'

    // Move inner highlight
    const shine = card.querySelector('.card-shine')
    if (shine) {
      shine.style.opacity = '1'
      shine.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.08) 0%, transparent 60%)`
    }
  }

  const handleMouseLeave = () => {
    const card = cardRef.current
    if (!card) return
    card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)'
    card.style.transition = 'transform 0.5s cubic-bezier(.22,.68,0,1.2)'
    const shine = card.querySelector('.card-shine')
    if (shine) shine.style.opacity = '0'
  }

  return (
    <div
      ref={cardRef}
      className={className}
      style={{ ...style, position:'relative', willChange:'transform' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Shine overlay */}
      <div
        className="card-shine"
        style={{
          position:'absolute', inset:0, zIndex:10,
          pointerEvents:'none', borderRadius:'inherit',
          opacity:0, transition:'opacity .3s',
        }}
      />
      {children}
    </div>
  )
}
