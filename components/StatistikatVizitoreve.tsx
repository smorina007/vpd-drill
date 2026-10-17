'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'
import { FaFutbol } from 'react-icons/fa'

/** Shifra reale të kompanisë — me animacion numërimi kur seksioni hyn në pamje. */
const stats = [
  { target: 500, suffix: 'm', label: 'Thellësi në terrene të forta' },
  { target: 55, suffix: 'm', label: 'Thellësi në terrene të buta' },
  { target: 42, suffix: '+', label: 'Projekte të realizuara' },
  { target: 10, suffix: '+', label: 'Makineri shpimi moderne' },
  { target: 90, prefix: '>', suffix: '%', label: 'Klientë të kënaqur' },
]

function useCountUp(target: number, active: boolean, duration = 1400) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (!active) return
    let start: number | null = null
    let raf: number
    const step = (ts: number) => {
      if (start === null) start = ts
      const pr = Math.min((ts - start) / duration, 1)
      setValue(Math.round((1 - Math.pow(1 - pr, 3)) * target))
      if (pr < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [active, target, duration])
  return value
}

function Stat({ s, active }: { s: (typeof stats)[number]; active: boolean }) {
  const v = useCountUp(s.target, active)
  return (
    <div className="border-t border-white/15 py-5 sm:pr-6">
      <p className="text-4xl font-extrabold font-xwide tabular text-white sm:text-5xl">
        {s.prefix}
        {v}
        <span className="text-glacier">{s.suffix}</span>
      </p>
      <p className="mt-2 text-sm text-white/65">{s.label}</p>
    </div>
  )
}

export default function StatistikatVizitoreve() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const reduce = useReducedMotion()
  const active = inView || !!reduce

  return (
    <section ref={ref} className="bg-bedrock py-16 sm:py-20">
      <div className="shell">
        <h2 className="mb-8 text-xl font-bold text-white sm:text-2xl">Pse na zgjedhin klientët</h2>
        <div className="grid grid-cols-2 gap-x-6 sm:grid-cols-3 lg:grid-cols-5">
          {stats.map((s) => (
            <Stat key={s.label} s={s} active={active} />
          ))}
        </div>

        {/* Krahasim për ta bërë 500m të prekshëm */}
        <div className="mt-10">
          <p className="mb-3 flex items-center gap-2 text-sm text-white/65">
            <FaFutbol className="text-glacier" />
            500 metra thellësi = gjatësia e <strong className="text-white">5 fushave futbolli</strong>, njëra pas tjetrës
          </p>
          <div className="flex gap-1.5" aria-hidden="true">
            {[0, 1, 2, 3, 4].map((k) => (
              <div key={k} className="relative h-7 flex-1 overflow-hidden rounded-[3px] bg-white/[0.06]">
                <div
                  className="absolute inset-0 origin-left bg-[repeating-linear-gradient(90deg,#2f7d4a_0_10%,#38905a_10%_20%)] transition-transform duration-700 ease-out"
                  style={{ transform: active ? 'scaleX(1)' : 'scaleX(0)', transitionDelay: `${600 + k * 150}ms` }}
                />
                <div className="absolute inset-y-1 left-1/2 w-px bg-white/50" />
                <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/50" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
