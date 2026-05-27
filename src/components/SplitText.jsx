import { useEffect, useRef } from 'react'

export default function SplitText({ text, style = {}, tag = 'h2', delay = 0 }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        el.querySelectorAll('.split-char').forEach((ch, i) => {
          setTimeout(() => {
            ch.style.transform = 'translateY(0)'
            ch.style.opacity = '1'
          }, delay + i * 30)
        })
        obs.disconnect()
      }
    }, { threshold: 0.2 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [delay])

  const Tag = tag
  const words = text.split(' ')

  return (
    <Tag ref={ref} style={{ ...style, overflow:'hidden' }}>
      {words.map((word, wi) => (
        <span key={wi} style={{ display:'inline-block', overflow:'hidden', marginRight:'0.25em' }}>
          {word.split('').map((char, ci) => (
            <span
              key={ci}
              className="split-char"
              style={{
                display: 'inline-block',
                transform: 'translateY(110%)',
                opacity: 0,
                transition: 'transform 0.6s cubic-bezier(.22,.68,0,1.2), opacity 0.4s ease',
              }}
            >
              {char}
            </span>
          ))}
        </span>
      ))}
    </Tag>
  )
}
