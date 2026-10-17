'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'
import { FaArrowRight } from 'react-icons/fa'

/**
 * "Shpimi" — seksion që lëviz me scroll-in: sfida zbret nëpër shtresat e tokës
 * nga 0 deri në 500 m dhe te çdo thellësi shfaqet shërbimi përkatës.
 * Thellësitë e shërbimeve janë ato të faqes; shtresat e tokës janë ilustruese.
 */

const MAX = 500

// Shkallë jo-lineare: 0–60 m zënë 62% të lartësisë (aty ndodhin shumica e punëve),
// 60–500 m pjesën tjetër — përndryshe 30–55 m do të ishin të ngjeshura në fund.
const PRAGU = 60
const PJESA = 0.62
function yNgaThellesia(d: number) {
  if (d <= PRAGU) return (d / PRAGU) * PJESA
  return PJESA + ((d - PRAGU) / (MAX - PRAGU)) * (1 - PJESA)
}
function thellesiaNgaY(y: number) {
  if (y <= PJESA) return (y / PJESA) * PRAGU
  return PRAGU + ((y - PJESA) / (1 - PJESA)) * (MAX - PRAGU)
}

const shtresat = [
  { emri: 'Dheu', nga: 0, deri: 6, ngjyra: '#5b4632', motiv: 'dots' },
  { emri: 'Argjilë', nga: 6, deri: 22, ngjyra: '#8a6a4a', motiv: 'lines' },
  { emri: 'Rërë dhe zhavorr', nga: 22, deri: 58, ngjyra: '#b39a74', motiv: 'gravel' },
  { emri: 'Shkëmb', nga: 58, deri: 500, ngjyra: '#5c6669', motiv: 'rock' },
] as const

const piket = [
  { d: 30, titulli: 'Ankera dhe Stabilizim', tekst: 'Thellësi shpimi: deri 30m', href: '/sherbimet/ankera' },
  { d: 35, titulli: 'Pilota për Objekte', tekst: 'Thellësi: deri +35m, diametrat 300-1500mm', href: '/sherbimet/pilota' },
  { d: 50, titulli: 'Germim me Diafragmë', tekst: 'Bauer MC 32 — deri mbi 50m thellësi', href: '/sherbimet/germim-diafragme' },
  { d: 55, titulli: 'Puse në terrene të buta', tekst: 'Terrene të buta (argjilë, rërë) — deri 55m', href: '/sherbimet/shpime-puse' },
  { d: 500, titulli: 'Puse në terrene të forta', tekst: 'Terrene të forta (shkëmbore) — deri 500m', href: '/sherbimet/shpime-puse' },
]

const shenjat = [0, 10, 20, 30, 40, 50, 60, 100, 200, 300, 400, 500]

function Motivi({ id, lloji }: { id: string; lloji: string }) {
  if (lloji === 'dots')
    return (
      <pattern id={id} width="14" height="14" patternUnits="userSpaceOnUse">
        <circle cx="3" cy="4" r="1.2" fill="rgba(255,255,255,0.18)" />
        <circle cx="10" cy="10" r="1" fill="rgba(0,0,0,0.25)" />
      </pattern>
    )
  if (lloji === 'lines')
    return (
      <pattern id={id} width="40" height="10" patternUnits="userSpaceOnUse">
        <path d="M0 5 Q10 2 20 5 T40 5" stroke="rgba(0,0,0,0.18)" fill="none" strokeWidth="1" />
      </pattern>
    )
  if (lloji === 'gravel')
    return (
      <pattern id={id} width="22" height="18" patternUnits="userSpaceOnUse">
        <ellipse cx="5" cy="5" rx="3" ry="2" fill="rgba(0,0,0,0.16)" />
        <ellipse cx="15" cy="12" rx="2.4" ry="1.7" fill="rgba(255,255,255,0.18)" />
        <circle cx="18" cy="3" r="1" fill="rgba(0,0,0,0.2)" />
      </pattern>
    )
  return (
    <pattern id={id} width="60" height="40" patternUnits="userSpaceOnUse">
      <path d="M0 20 L18 14 L34 24 L60 16" stroke="rgba(255,255,255,0.12)" fill="none" />
      <path d="M8 40 L22 30 L40 36 L52 28" stroke="rgba(0,0,0,0.25)" fill="none" />
    </pattern>
  )
}

export default function ShpimiNeThellesi() {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 })
  const [thellesia, setThellesia] = useState(reduce ? MAX : 0)

  const kufizo = (v: number) => Math.min(1, Math.max(0, v / 0.88))
  useMotionValueEvent(p, 'change', (v) => {
    if (!reduce) setThellesia(Math.round(thellesiaNgaY(kufizo(v))))
  })

  const topi = useTransform(p, (v) => `${kufizo(v) * 100}%`)
  const shtresaAktive = [...shtresat].reverse().find((s) => thellesia >= s.nga) ?? shtresat[0]

  return (
    <section
      ref={ref}
      id="thellesite"
      data-shtresa="Thellësitë"
      className={`relative bg-bedrock text-white ${reduce ? '' : 'h-[320vh]'}`}
    >
      <div className={`${reduce ? '' : 'sticky top-0 h-svh'} overflow-hidden`}>
        <div className="shell grid h-full grid-cols-[minmax(120px,0.8fr)_minmax(0,1.2fr)] gap-6 pb-8 pt-[calc(var(--header-h)+24px)] sm:gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16 lg:pb-12">
          {/* Prerja e tokës */}
          <div className="relative flex min-h-0 flex-col">
            <div className="relative flex-1 overflow-hidden rounded-lg ring-1 ring-white/10" aria-hidden="true">
              <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 1000">
                <defs>
                  {shtresat.map((s) => (
                    <Motivi key={s.emri} id={`m-${s.motiv}`} lloji={s.motiv} />
                  ))}
                </defs>
                {shtresat.map((s) => {
                  const y1 = yNgaThellesia(s.nga) * 1000
                  const y2 = yNgaThellesia(s.deri) * 1000
                  return (
                    <g key={s.emri}>
                      <rect x="0" y={y1} width="100" height={y2 - y1} fill={s.ngjyra} />
                      <rect x="0" y={y1} width="100" height={y2 - y1} fill={`url(#m-${s.motiv})`} />
                      <line x1="0" x2="100" y1={y1} y2={y1} stroke="rgba(0,0,0,0.35)" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
                    </g>
                  )
                })}
              </svg>

              {/* Emrat e shtresave */}
              {shtresat.map((s) => (
                <span
                  key={s.emri}
                  className="absolute right-2 rounded bg-black/35 px-1.5 py-0.5 text-[10px] font-semibold text-white/85 backdrop-blur-sm sm:right-3 sm:text-xs"
                  style={{
                    top:
                      s.nga === 0
                        ? '6px'
                        : `calc(${((yNgaThellesia(s.nga) + yNgaThellesia(Math.min(s.deri, s.nga + 120))) / 2) * 100}% - 9px)`,
                  }}
                >
                  {s.emri}
                </span>
              ))}

              {/* Vrima e shpuar */}
              <motion.div
                className="absolute left-1/2 top-0 w-[14%] max-w-[44px] -translate-x-1/2 bg-[linear-gradient(90deg,#0b2026,#183c44_50%,#0b2026)] shadow-[inset_0_0_8px_rgba(0,0,0,0.6)]"
                style={{ height: reduce ? '100%' : topi }}
              />
              {/* Sfida */}
              <motion.div
                className="absolute left-1/2 w-[14%] max-w-[44px] -translate-x-1/2 -translate-y-full"
                style={{ top: reduce ? '100%' : topi }}
              >
                <svg viewBox="0 0 40 60" className="w-full drop-shadow-[0_0_10px_rgba(242,183,5,0.45)]">
                  <rect x="17" y="0" width="6" height="30" fill="#c9d1d1" />
                  <path d="M6 30 H34 L20 60 Z" fill="#F2B705" />
                  <path d="M8 36 L32 40 M10 44 L30 47 M13 51 L27 53" stroke="#0E2A30" strokeWidth="2" />
                </svg>
              </motion.div>

              {/* Shenjat e thellësisë */}
              {shenjat.map((d) => (
                <span
                  key={d}
                  className="absolute left-0 flex -translate-y-1/2 items-center gap-1 text-[9px] font-semibold tabular text-white/70 sm:text-[10px]"
                  style={{ top: `${yNgaThellesia(d) * 100}%` }}
                >
                  <span className="h-px w-2.5 bg-white/60" />
                  {d}
                </span>
              ))}
            </div>
            <p className="mt-2 text-[10px] text-white/40 sm:text-xs">Shtresat e tokës janë ilustruese.</p>
          </div>

          {/* Teksti */}
          <div className="flex min-h-0 flex-col">
            <h2 className="display-lg text-white">Nga sipërfaqja deri në 500 metra</h2>
            <p className="mt-3 max-w-[48ch] text-sm text-white/65 sm:text-base">
              Çdo shërbim ka thellësinë e vet. {reduce ? '' : 'Bëni scroll për të zbritur.'}
            </p>

            <div className="mt-6 flex flex-wrap items-end gap-x-4 gap-y-1 border-y border-white/10 py-4 sm:mt-8">
              <p className="text-5xl font-extrabold font-xwide tabular text-white sm:text-7xl" aria-live="off">
                −{thellesia}
                <span className="ml-1 text-2xl text-glacier sm:text-3xl">m</span>
              </p>
              <p className="text-sm text-white/60 sm:pb-2">{shtresaAktive.emri}</p>
            </div>

            <ol className="mt-5 grid gap-2 overflow-hidden sm:gap-3">
              {piket.map((pk) => {
                const arritur = thellesia >= pk.d
                return (
                  <li key={pk.d + pk.titulli}>
                    <Link
                      href={pk.href}
                      className={`group flex items-center gap-3 rounded-md px-3 py-2.5 transition-all duration-500 sm:gap-4 sm:px-4 sm:py-3 ${
                        arritur ? 'bg-white/[0.07] opacity-100' : 'translate-x-2 opacity-30'
                      }`}
                    >
                      <span
                        className={`w-14 shrink-0 text-right text-sm font-extrabold font-wide tabular sm:w-16 sm:text-base ${
                          arritur ? 'text-signal' : 'text-white/50'
                        }`}
                      >
                        {pk.d} m
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-bold text-white sm:text-[15px]">{pk.titulli}</span>
                        <span className="hidden text-xs text-white/60 sm:block sm:text-[13px]">{pk.tekst}</span>
                      </span>
                      <FaArrowRight className="shrink-0 text-xs text-white/40 transition-transform group-hover:translate-x-1 group-hover:text-white" />
                    </Link>
                  </li>
                )
              })}
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}
