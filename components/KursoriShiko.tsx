'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Kursor i personalizuar mbi fotot (vetëm me maus): një rreth me tekstin "Shiko".
 * Aktivizohet te çdo element me atributin `data-kursor="…"`.
 */
export default function KursoriShiko() {
  const ref = useRef<HTMLDivElement>(null)
  const [teksti, setTeksti] = useState<string | null>(null)

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return
    document.documentElement.classList.add('kursor-aktiv')
    let x = 0
    let y = 0
    let cx = 0
    let cy = 0
    let raf = 0
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const loop = () => {
      cx += (x - cx) * (reduce ? 1 : 0.22)
      cy += (y - cy) * (reduce ? 1 : 0.22)
      if (ref.current) ref.current.style.transform = `translate3d(${cx}px, ${cy}px, 0)`
      raf = requestAnimationFrame(loop)
    }
    const onMove = (e: PointerEvent) => {
      x = e.clientX
      y = e.clientY
      const el = (e.target as Element | null)?.closest?.('[data-kursor]') as HTMLElement | null
      setTeksti(el ? el.dataset.kursor || 'Shiko' : null)
    }
    const onLeave = () => setTeksti(null)
    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerleave', onLeave)
    window.addEventListener('scroll', onLeave, { passive: true })
    raf = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerleave', onLeave)
      window.removeEventListener('scroll', onLeave)
      document.documentElement.classList.remove('kursor-aktiv')
    }
  }, [])

  return (
    <div ref={ref} className="pointer-events-none fixed left-0 top-0 z-[95]" aria-hidden="true">
      <div
        className={`-translate-x-1/2 -translate-y-1/2 transition-[opacity,transform] duration-200 ${
          teksti ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
        }`}
      >
        <div className="grid h-[76px] w-[76px] place-items-center rounded-full bg-signal text-[13px] font-bold text-bedrock shadow-[0_8px_30px_-6px_rgba(14,42,48,0.55)]">
          {teksti}
        </div>
      </div>
    </div>
  )
}
