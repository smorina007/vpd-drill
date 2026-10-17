'use client'

import { useEffect, useState } from 'react'

type Shtresa = { id: string; emri: string; pos: number }

const THELLESIA_MAX = 500 // m — thellësia maksimale e shpimit të kompanisë

/**
 * Shkalla e thellësisë në anë të ballinës: scroll-i i faqes paraqitet si
 * shpim nga 0 m deri në 500 m. Çdo seksion me atributin `data-shtresa`
 * shfaqet si shtresë në shkallë dhe mund të klikohet për të shkuar aty.
 * Shfaqet vetëm në ekrane të gjera (xl), ku ka hapësirë anësore.
 */
export default function DepthGauge() {
  const [progress, setProgress] = useState(0)
  const [shtresat, setShtresat] = useState<Shtresa[]>([])

  useEffect(() => {
    const mat = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      const nodes = Array.from(document.querySelectorAll<HTMLElement>('[data-shtresa]'))
      setShtresat(
        nodes.map((n) => ({
          id: n.id,
          emri: n.dataset.shtresa || '',
          pos: max > 0 ? Math.min(1, Math.max(0, (n.getBoundingClientRect().top + window.scrollY - 80) / max)) : 0,
        }))
      )
    }
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      setProgress(max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0)
    }
    mat()
    onScroll()
    const ro = new ResizeObserver(mat)
    ro.observe(document.body)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      ro.disconnect()
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  const thellesia = Math.round(progress * THELLESIA_MAX)
  const aktive = [...shtresat].reverse().find((s) => s.pos <= progress + 0.002)

  return (
    <nav
      aria-label="Seksionet e faqes"
      className="pointer-events-none fixed bottom-24 left-3 top-[calc(var(--header-h)+28px)] z-30 hidden w-10 2xl:left-6 xl:block"
    >
      {/* Boshti — kapsulë e lehtë që lexohet si mbi sfond të errët ashtu edhe të çelët */}
      <div className="absolute -bottom-3 -left-1.5 -top-3 w-[42px] rounded-full bg-white/75 shadow-[0_4px_20px_-8px_rgba(14,42,48,0.4)] ring-1 ring-bedrock/10 backdrop-blur-md" />
      <div className="absolute bottom-0 left-[9px] top-0 w-px bg-bedrock/15" />
      <div
        className="absolute left-[8px] top-0 w-[3px] origin-top rounded-full bg-brand"
        style={{ height: `${progress * 100}%` }}
      />
      {/* Shenjat çdo 50 m */}
      {Array.from({ length: 11 }).map((_, i) => (
        <div key={i} className="absolute left-[5px] flex items-center" style={{ top: `${i * 10}%` }}>
          <span className={`h-px ${i % 2 === 0 ? 'w-[9px] bg-bedrock/40' : 'w-[6px] bg-bedrock/25'}`} />
          {i % 2 === 0 && <span className="ml-1 text-[9px] font-semibold text-bedrock/55 tabular">{i * 50}</span>}
        </div>
      ))}
      {/* Shtresat (seksionet) */}
      {shtresat.map((s) => (
        <a
          key={s.id}
          href={`#${s.id}`}
          aria-label={s.emri}
          className="group pointer-events-auto absolute left-[4px] -translate-y-1/2"
          style={{ top: `${s.pos * 100}%` }}
        >
          <span
            className={`block h-[11px] w-[11px] rounded-full border-2 transition-colors ${
              aktive?.id === s.id ? 'border-brand bg-signal' : 'border-bedrock/30 bg-stone group-hover:border-brand'
            }`}
          />
          <span className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 whitespace-nowrap rounded bg-bedrock px-2 py-1 text-[11px] font-semibold text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
            {s.emri}
          </span>
        </a>
      ))}
      {/* Treguesi i thellësisë aktuale */}
      <div
        className="absolute left-0 -translate-y-1/2 transition-[top] duration-150 ease-out"
        style={{ top: `${progress * 100}%` }}
      >
        <div className="ml-[-2px] flex items-center gap-1">
          <span className="h-[2px] w-3 bg-signal" />
          <span className="whitespace-nowrap rounded bg-bedrock px-1.5 py-0.5 text-[10px] font-bold text-white tabular shadow">
            −{thellesia}<span className="ml-px font-medium opacity-70">m</span>
          </span>
        </div>
      </div>
    </nav>
  )
}
