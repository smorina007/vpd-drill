'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'
import { FaRulerVertical, FaTruckMonster, FaSmile, FaTools, FaImages, FaFutbol } from 'react-icons/fa'

/**
 * Shifra reale të kompanisë (jo numra "vizitorësh live" fals) — tani me
 * animacion "numërimi" (count-up) kur seksioni hyn në pamje, për një ndjesi
 * më premium/dinamike se thjesht tekst statik.
 */
const stats = [
  { icon: FaRulerVertical, target: 500, suffix: 'm', label: 'Thellësi në terrene të forta' },
  { icon: FaRulerVertical, target: 55, suffix: 'm', label: 'Thellësi në terrene të buta' },
  { icon: FaImages, target: 42, suffix: '+', label: 'Projekte të realizuara' },
  { icon: FaTruckMonster, target: 10, suffix: '+', label: 'Makineri shpimi moderne' },
  { icon: FaSmile, target: 90, prefix: '>', suffix: '%', label: 'Klientë të kënaqur' },
]

function useCountUp(target: number, active: boolean, duration = 1400) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!active) return
    let start: number | null = null
    let raf: number

    const step = (timestamp: number) => {
      if (start === null) start = timestamp
      const progress = Math.min((timestamp - start) / duration, 1)
      // ease-out për ndjesi më natyrale drejt fundit
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(eased * target))
      if (progress < 1) raf = requestAnimationFrame(step)
    }

    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [active, target, duration])

  return value
}

function StatCard({ stat, active, delay }: { stat: typeof stats[number]; active: boolean; delay: number }) {
  const [start, setStart] = useState(false)
  useEffect(() => {
    if (!active) return
    const t = setTimeout(() => setStart(true), delay)
    return () => clearTimeout(t)
  }, [active, delay])

  const value = useCountUp(stat.target, start)
  const Icon = stat.icon

  return (
    <div className="bg-white p-4 rounded-xl text-center border border-gray-100 hover:border-[#256D7B]/30 hover:shadow-lg hover:shadow-[#256D7B]/10 hover:-translate-y-1 transition-all duration-300">
      <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-gradient-to-br from-[#256D7B]/15 to-[#256D7B]/5 flex items-center justify-center">
        <Icon className="text-lg text-[#256D7B]" />
      </div>
      <p className="text-2xl font-bold text-gray-900 tabular-nums">
        {stat.prefix}{value}{stat.suffix}
      </p>
      <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
    </div>
  )
}

export default function StatistikatVizitoreve() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="py-10 bg-white" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gray-50 rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center justify-center md:justify-start">
            <FaTools className="text-[#256D7B] mr-2" />
            Pse na zgjedhin klientët
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {stats.map((s, i) => (
              <StatCard key={i} stat={s} active={inView} delay={i * 150} />
            ))}
          </div>

          {/* Krahasim argëtues për ta bërë 500m të prekshëm */}
          <div className="mt-6 pt-6 border-t border-gray-100">
            <p className="text-sm text-gray-500 text-center md:text-left mb-3 flex items-center justify-center md:justify-start gap-2">
              <FaFutbol className="text-[#256D7B]" />
              500 metra thellësi = gjatësia e <strong className="text-gray-700 mx-1">5 fushave futbolli</strong>, njëra pas tjetrës
            </p>
            <div className="flex gap-1.5">
              {[0, 1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="football-bar h-3 flex-1 rounded-full bg-gradient-to-r from-green-500 to-green-600 opacity-0"
                  style={{ animationDelay: `${800 + i * 150}ms` }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .football-bar {
          transform-origin: left;
          animation: fadeInGrow 0.5s ease-out forwards;
        }
        @keyframes fadeInGrow {
          from {
            opacity: 0;
            transform: scaleX(0);
          }
          to {
            opacity: 1;
            transform: scaleX(1);
          }
        }
      `}</style>
    </section>
  )
}
