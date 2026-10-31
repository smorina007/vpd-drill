'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import { FaGlobeEurope, FaChevronDown, FaCheck } from 'react-icons/fa'
import { GJUHET, type Gjuha } from '@/lib/gjuha'

/** Ndërruesi i gjuhës në shiritin kryesor (dropdown) ose në menunë e celularit (rresht butonash). */
export default function NderruesiGjuhes({
  gjuha,
  solid = true,
  variant = 'dropdown',
}: {
  gjuha: Gjuha
  solid?: boolean
  variant?: 'dropdown' | 'rresht'
}) {
  const [hapur, setHapur] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!hapur) return
    const onDown = (e: MouseEvent) => ref.current && !ref.current.contains(e.target as Node) && setHapur(false)
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setHapur(false)
    document.addEventListener('mousedown', onDown)
    window.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDown)
      window.removeEventListener('keydown', onKey)
    }
  }, [hapur])

  if (variant === 'rresht') {
    return (
      <div className="grid grid-cols-3 gap-2" role="group" aria-label="Gjuha / Sprache / Language">
        {GJUHET.map((g) => {
          const on = g.kodi === gjuha
          return (
            <Link
              key={g.kodi}
              href={g.href}
              hrefLang={g.kodi}
              aria-current={on ? 'true' : undefined}
              className={`flex items-center justify-center gap-2 rounded-lg px-3 py-3 text-sm font-semibold transition-colors ${
                on ? 'bg-white text-bedrock' : 'bg-white/[0.06] text-white active:bg-white/15'
              }`}
            >
              <span className="text-xs font-bold opacity-60">{g.kodi.toUpperCase()}</span>
              {g.emri}
            </Link>
          )
        })}
      </div>
    )
  }

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setHapur((v) => !v)}
        aria-expanded={hapur}
        aria-haspopup="true"
        aria-label="Gjuha / Sprache / Language"
        className={`flex items-center gap-1.5 rounded-md px-2.5 py-2 text-sm font-bold transition-colors ${
          solid ? 'text-slate-ink hover:bg-stone' : 'text-white/90 hover:bg-white/10'
        } ${hapur ? (solid ? 'bg-stone' : 'bg-white/10') : ''}`}
      >
        <FaGlobeEurope className={solid ? 'text-brand' : 'text-glacier'} />
        {gjuha.toUpperCase()}
        <FaChevronDown className={`text-[9px] transition-transform ${hapur ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {hapur && (
          <motion.ul
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-2 w-44 rounded-xl bg-white p-1.5 text-bedrock shadow-[0_24px_60px_-20px_rgba(14,42,48,0.45)] ring-1 ring-stone-line"
          >
            {GJUHET.map((g) => {
              const on = g.kodi === gjuha
              return (
                <li key={g.kodi}>
                  <Link
                    href={g.href}
                    hrefLang={g.kodi}
                    onClick={() => setHapur(false)}
                    aria-current={on ? 'true' : undefined}
                    className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-semibold transition-colors hover:bg-stone ${on ? 'text-brand' : ''}`}
                  >
                    <span className="w-6 text-xs font-bold text-slate-mute">{g.kodi.toUpperCase()}</span>
                    <span className="flex-1">{g.emri}</span>
                    {on && <FaCheck className="text-xs" />}
                  </Link>
                </li>
              )
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}
