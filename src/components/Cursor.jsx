import { useEffect, useRef } from 'react'

const styles = {
  dot: {
    position: 'fixed', top: 0, left: 0, zIndex: 9999,
    width: 10, height: 10,
    background: 'var(--accent)', borderRadius: '50%',
    pointerEvents: 'none',
    transform: 'translate(-50%, -50%)',
    transition: 'width 0.18s, height 0.18s',
    mixBlendMode: 'difference',
  },
  ring: {
    position: 'fixed', top: 0, left: 0, zIndex: 9998,
    width: 38, height: 38,
    border: '1px solid rgba(30,111,255,0.5)', borderRadius: '50%',
    pointerEvents: 'none',
    transform: 'translate(-50%, -50%)',
    mixBlendMode: 'difference',
  },
}

export default function Cursor() {
  const dotRef  = useRef(null)
  const ringRef = useRef(null)
  const pos     = useRef({ mx: 0, my: 0, rx: 0, ry: 0 })

  useEffect(() => {
    const onMove = (e) => {
      pos.current.mx = e.clientX
      pos.current.my = e.clientY
    }
    window.addEventListener('mousemove', onMove)

    let raf
    const animate = () => {
      const { mx, my } = pos.current
      pos.current.rx += (mx - pos.current.rx) * 0.14
      pos.current.ry += (my - pos.current.ry) * 0.14
      if (dotRef.current) {
        dotRef.current.style.left = mx + 'px'
        dotRef.current.style.top  = my + 'px'
      }
      if (ringRef.current) {
        ringRef.current.style.left = pos.current.rx + 'px'
        ringRef.current.style.top  = pos.current.ry + 'px'
      }
      raf = requestAnimationFrame(animate)
    }
    raf = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <div ref={dotRef}  style={styles.dot}  />
      <div ref={ringRef} style={styles.ring} />
    </>
  )
}
