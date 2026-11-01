'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, useTransform, type MotionValue } from 'framer-motion'

/**
 * Prerja gjeologjike premium për seksionin "Nga sipërfaqja deri në 500 metra":
 * sipërfaqja me makinën e shpimit, shtresa me kufij natyralë, guralecë, ujë nëntokësor,
 * çarje në shkëmb, vargu i shpimit që rrotullohet dhe pikat e shërbimeve që ndizen.
 */

type Shtrese = { emri: string; nga: number; deri: number; lart: string; poshte: string }

const SHTRESAT: Shtrese[] = [
  { emri: 'Dheu', nga: 0, deri: 6, lart: '#5a412b', poshte: '#3e2b1c' },
  { emri: 'Argjilë', nga: 6, deri: 22, lart: '#94704c', poshte: '#76563a' },
  { emri: 'Rërë dhe zhavorr', nga: 22, deri: 58, lart: '#c8ab7c', poshte: '#a48558' },
  { emri: 'Shkëmb', nga: 58, deri: 500, lart: '#5f696c', poshte: '#2f3638' },
]
const UJI = { nga: 40, deri: 52 }

type Pike = { d: number; emri: string }

// Gjenerator i thjeshtë numrash "të rastësishëm" por gjithmonë të njëjtë (pa kërcime gjatë rivizatimit)
function rng(seed: number) {
  let s = seed
  return () => {
    s = (s * 16807) % 2147483647
    return (s - 1) / 2147483646
  }
}

/** Vijë e valëzuar natyrale përgjatë gjerësisë */
function valez(y: number, w: number, amp: number, seed: number) {
  const r = rng(seed)
  const pikat: string[] = []
  const hapa = 14
  for (let i = 0; i <= hapa; i++) {
    const x = (w / hapa) * i
    const dy = Math.sin(i * 0.9 + seed) * amp * 0.6 + (r() - 0.5) * amp
    pikat.push(`${x.toFixed(1)},${(y + dy).toFixed(1)}`)
  }
  return pikat
}

export default function PrerjaETokes({
  progres,
  thellesia,
  yNgaThellesia,
  piket,
  reduce,
}: {
  progres: MotionValue<number>
  thellesia: number
  yNgaThellesia: (d: number) => number
  piket: Pike[]
  reduce: boolean | null
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [{ w, h }, setMad] = useState({ w: 320, h: 640 })

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ro = new ResizeObserver(([e]) => setMad({ w: Math.round(e.contentRect.width), h: Math.round(e.contentRect.height) }))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const siperfaqja = Math.max(72, h * 0.14) // lartësia e qiellit + makinës
  const toka = h - siperfaqja
  const Y = (d: number) => siperfaqja + yNgaThellesia(d) * toka
  const cx = w / 2
  const vrimaW = Math.max(14, Math.min(30, w * 0.075))

  const thellesiaPx = useTransform(progres, (v) => Math.max(0, v) * toka)
  const bitY = useTransform(progres, (v) => siperfaqja + Math.max(0, v) * toka)

  // Gjeometria e shtresave (kufij të valëzuar) + detajet — llogariten një herë për madhësinë
  const gjeo = useMemo(() => {
    const kufijte = SHTRESAT.map((s, i) => (i === 0 ? [`0,${siperfaqja}`, `${w},${siperfaqja}`] : valez(Y(s.nga), w, Math.min(10, h * 0.012), i * 7 + 3)))
    const poligonet = SHTRESAT.map((s, i) => {
      const lart = kufijte[i]
      const poshte = i < SHTRESAT.length - 1 ? [...kufijte[i + 1]].reverse() : [`${w},${h}`, `0,${h}`]
      return [...lart, ...poshte].join(' ')
    })

    const r = rng(42)
    // Guralecë në rërë/zhavorr
    const guralecet: { x: number; y: number; rx: number; ry: number; rot: number; c: string }[] = []
    const yRL = Y(22) + 6
    const yRP = Y(58) - 6
    const n = Math.min(260, Math.round((w * (yRP - yRL)) / 520))
    for (let i = 0; i < n; i++) {
      const rx = 1.5 + r() * (r() > 0.85 ? 7 : 3.5)
      guralecet.push({
        x: r() * w,
        y: yRL + r() * (yRP - yRL),
        rx,
        ry: rx * (0.55 + r() * 0.35),
        rot: r() * 180,
        c: ['#e3d0ab', '#9c8460', '#bfa47a', '#7d6a4e', '#d8c39b'][Math.floor(r() * 5)],
      })
    }
    // Shtresëzime në argjilë
    const laminat: string[] = []
    for (let i = 0; i < 9; i++) {
      const yy = Y(6) + ((Y(22) - Y(6)) / 10) * (i + 1)
      laminat.push(valez(yy, w, 3, 100 + i).join(' '))
    }
    // Rrënjë dhe grimca në dhe
    const rrenjet: string[] = []
    for (let i = 0; i < Math.round(w / 28); i++) {
      const x0 = r() * w
      const y0 = siperfaqja + 1
      const l = (Y(6) - siperfaqja) * (0.4 + r() * 0.6)
      rrenjet.push(`M${x0},${y0} q${(r() - 0.5) * 14},${l * 0.5} ${(r() - 0.5) * 10},${l}`)
    }
    // Çarje në shkëmb
    const carjet: string[] = []
    for (let i = 0; i < Math.round(w / 16); i++) {
      let x = r() * w
      let y = Y(60) + r() * (h - Y(60))
      const seg: string[] = [`M${x.toFixed(1)},${y.toFixed(1)}`]
      for (let k = 0; k < 3 + Math.floor(r() * 3); k++) {
        x += (r() - 0.5) * 40
        y += 6 + r() * 22
        seg.push(`L${x.toFixed(1)},${y.toFixed(1)}`)
      }
      carjet.push(seg.join(' '))
    }
    // Kristale/facete të çelëta në shkëmb
    const facetet: string[] = []
    for (let i = 0; i < Math.round(w / 10); i++) {
      const x = r() * w
      const y = Y(62) + r() * (h - Y(62))
      const s = 4 + r() * 10
      facetet.push(`${x},${y} ${x + s},${y + s * 0.4} ${x + s * 0.3},${y + s}`)
    }
    // Bari mbi sipërfaqe
    const bari: string[] = []
    for (let x = 2; x < w; x += 5 + r() * 5) {
      const ht = 3 + r() * 5
      bari.push(`M${x},${siperfaqja} l${(r() - 0.5) * 3},${-ht}`)
    }
    return { poligonet, guralecet, laminat, rrenjet, carjet, facetet, bari }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [w, h])

  const yUjiL = Y(UJI.nga)
  const yUjiP = Y(UJI.deri)
  const shenjat = [0, 10, 20, 30, 40, 50, 60, 100, 200, 300, 400, 500]

  // Pjesa e palëvizshme e prerjes (shtresat, guralecët, uji, çarjet) — vizatohet vetëm kur ndryshon madhësia,
  // jo në çdo lëvizje të scroll-it.
  const statike = useMemo(
    () => (
      <>
        <defs>
          <linearGradient id="qielli" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#0f2f37" />
            <stop offset="1" stopColor="#2f6b77" />
          </linearGradient>
          {SHTRESAT.map((s, i) => (
            <linearGradient key={s.emri} id={`sh-${i}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor={s.lart} />
              <stop offset="1" stopColor={s.poshte} />
            </linearGradient>
          ))}
          <linearGradient id="uji" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#7fc8d9" stopOpacity="0.18" />
            <stop offset="0.5" stopColor="#9fe3f2" stopOpacity="0.55" />
            <stop offset="1" stopColor="#7fc8d9" stopOpacity="0.18" />
          </linearGradient>
          <linearGradient id="vrima" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#061418" />
            <stop offset="0.5" stopColor="#163a42" />
            <stop offset="1" stopColor="#061418" />
          </linearGradient>
          <linearGradient id="shufra" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#6d7a7d" />
            <stop offset="0.45" stopColor="#eef3f3" />
            <stop offset="1" stopColor="#5b6669" />
          </linearGradient>
          <radialGradient id="vinjeta" cx="0.5" cy="0.45" r="0.75">
            <stop offset="0.6" stopColor="#000" stopOpacity="0" />
            <stop offset="1" stopColor="#000" stopOpacity="0.45" />
          </radialGradient>
          <filter id="drite" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" />
          </filter>
          <clipPath id="clip-uji">
            <rect x="0" y={yUjiL} width={w} height={yUjiP - yUjiL} />
          </clipPath>
        </defs>

        {/* Qielli dhe sipërfaqja */}
        <rect x="0" y="0" width={w} height={siperfaqja} fill="url(#qielli)" />
        <circle cx={w * 0.82} cy={siperfaqja * 0.3} r={siperfaqja * 0.12} fill="#f2d27a" opacity="0.55" filter="url(#drite)" />

        {/* Shtresat */}
        {gjeo.poligonet.map((pts, i) => (
          <polygon key={i} points={pts} fill={`url(#sh-${i})`} />
        ))}
        {/* Kufijtë e shtresave */}
        {gjeo.poligonet.slice(1).map((_, i) => (
          <polyline key={i} points={gjeo.poligonet[i + 1].split(' ').slice(0, 15).join(' ')} fill="none" stroke="rgba(0,0,0,0.35)" strokeWidth="1.2" />
        ))}

        {/* Dheu: rrënjë */}
        <g stroke="rgba(30,18,8,0.55)" strokeWidth="0.8" fill="none">
          {gjeo.rrenjet.map((d, i) => (
            <path key={i} d={d} />
          ))}
        </g>
        {/* Argjila: shtresëzime */}
        <g stroke="rgba(0,0,0,0.13)" strokeWidth="1" fill="none">
          {gjeo.laminat.map((p, i) => (
            <polyline key={i} points={p} />
          ))}
        </g>
        {/* Zhavorri: guralecë me dritë */}
        <g>
          {gjeo.guralecet.map((g, i) => (
            <g key={i} transform={`rotate(${g.rot} ${g.x} ${g.y})`}>
              <ellipse cx={g.x} cy={g.y} rx={g.rx} ry={g.ry} fill={g.c} />
              <ellipse cx={g.x - g.rx * 0.25} cy={g.y - g.ry * 0.3} rx={g.rx * 0.45} ry={g.ry * 0.35} fill="#fff" opacity="0.25" />
              <ellipse cx={g.x + g.rx * 0.2} cy={g.y + g.ry * 0.35} rx={g.rx * 0.8} ry={g.ry * 0.4} fill="#000" opacity="0.12" />
            </g>
          ))}
        </g>
        {/* Uji nëntokësor (shkëlqim që lëviz) */}
        <g clipPath="url(#clip-uji)">
          <rect x="0" y={yUjiL} width={w} height={yUjiP - yUjiL} fill="#3aa6c2" opacity="0.28" />
          <rect x={-w} y={yUjiL} width={w * 3} height={yUjiP - yUjiL} fill="url(#uji)" className={reduce ? '' : 'prerja-uji'} />
        </g>
        <polyline points={valez(yUjiL, w, 2.5, 77).join(' ')} fill="none" stroke="#9fe3f2" strokeOpacity="0.6" strokeWidth="1" strokeDasharray="5 4" />
        {/* Shkëmbi: çarje dhe facete */}
        <g fill="rgba(255,255,255,0.06)">
          {gjeo.facetet.map((p, i) => (
            <polygon key={i} points={p} />
          ))}
        </g>
        <g stroke="rgba(0,0,0,0.4)" strokeWidth="1" fill="none">
          {gjeo.carjet.map((d, i) => (
            <path key={i} d={d} />
          ))}
        </g>
        <g stroke="rgba(255,255,255,0.08)" strokeWidth="1" fill="none" transform="translate(1,1)">
          {gjeo.carjet.map((d, i) => (
            <path key={i} d={d} />
          ))}
        </g>

        {/* Bari */}
        <g stroke="#5f8b4a" strokeWidth="1.2" strokeLinecap="round">
          {gjeo.bari.map((d, i) => (
            <path key={i} d={d} />
          ))}
        </g>

      </>
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [gjeo, w, h, reduce],
  )

  return (
    <div ref={ref} className="relative h-full w-full overflow-hidden rounded-2xl bg-[#13323a] shadow-[0_30px_60px_-30px_rgba(0,0,0,0.8)] ring-1 ring-white/10">
      <svg width={w} height={h} className="absolute inset-0 block" aria-hidden="true">
        {statike}
        {/* Pikat e shërbimeve në skajin e djathtë */}
        {piket.map((pk) => {
          const y = Y(pk.d)
          const arritur = thellesia >= pk.d
          return (
            <g key={pk.d + pk.emri}>
              <line x1={cx + vrimaW} x2={w - 10} y1={y} y2={y} stroke={arritur ? '#F2B705' : 'rgba(255,255,255,0.25)'} strokeWidth="1" strokeDasharray="2 4" />
              <circle cx={w - 10} cy={y} r={arritur ? 4.5 : 3} fill={arritur ? '#F2B705' : 'rgba(255,255,255,0.35)'} />
              {arritur && <circle cx={w - 10} cy={y} r="9" fill="#F2B705" opacity="0.35" filter="url(#drite)" />}
            </g>
          )
        })}

        <rect x="0" y="0" width={w} height={h} fill="url(#vinjeta)" pointerEvents="none" />
      </svg>

      {/* Etiketat e shtresave (majtas, me xham) */}
      {SHTRESAT.map((s) => (
        <span
          key={s.emri}
          className="absolute left-9 rounded-full bg-black/40 px-2 py-0.5 text-[10px] font-semibold text-white/85 ring-1 ring-white/10 backdrop-blur-sm max-[420px]:left-7 max-[420px]:px-1.5 max-[420px]:text-[8px] sm:text-[11px]"
          style={{ top: (s.nga === 0 ? Y(0) + 4 : Y(s.nga) + 8) }}
        >
          {s.emri}
        </span>
      ))}
      <span
        className="absolute left-9 flex items-center gap-1 rounded-full bg-[#3aa6c2]/30 px-2 py-0.5 text-[10px] font-semibold text-[#c9f1fa] ring-1 ring-[#9fe3f2]/30 backdrop-blur-sm max-[420px]:left-7 max-[420px]:text-[8px] sm:text-[11px]"
        style={{ top: (yUjiL + yUjiP) / 2 - 9 }}
      >
        💧 Ujë nëntokësor
      </span>

      {/* Vizorja e thellësisë */}
      {shenjat.map((d) => (
        <span
          key={d}
          className="absolute left-0 flex -translate-y-1/2 items-center gap-1 text-[9px] font-semibold tabular text-white/75 sm:text-[10px]"
          style={{ top: Y(d) }}
        >
          <span className={`h-px bg-white/70 ${d % 100 === 0 || d <= 60 ? 'w-3' : 'w-2'}`} />
          {d}
        </span>
      ))}

      {/* Vrima e shpuar */}
      <motion.div
        className="absolute rounded-b-sm"
        style={{
          left: cx - vrimaW / 2,
          width: vrimaW,
          top: siperfaqja,
          height: reduce ? toka : thellesiaPx,
          background: 'linear-gradient(90deg,#040e11,#163a42 45%,#0b2026 70%,#040e11)',
          boxShadow: 'inset 0 0 10px rgba(0,0,0,0.85), 0 0 0 1px rgba(0,0,0,0.35)',
        }}
      />
      {/* Vargu i shpimit: shufër + spirale që rrotullohet */}
      <motion.div
        className={`absolute ${reduce ? '' : 'prerja-spiralja'}`}
        style={{
          left: cx - vrimaW * 0.28,
          width: vrimaW * 0.56,
          top: siperfaqja,
          height: reduce ? toka : thellesiaPx,
          backgroundImage:
            'repeating-linear-gradient(160deg, rgba(14,42,48,0.55) 0 3px, transparent 3px 9px), linear-gradient(90deg,#6d7a7d,#eef3f3 45%,#5b6669)',
          backgroundSize: '100% 18px, 100% 100%',
          borderRadius: 2,
        }}
      />

      {/* Makina e shpimit mbi sipërfaqe */}
      <svg
        className="absolute"
        style={{ left: cx - siperfaqja * 0.8, top: siperfaqja - siperfaqja * (75 / 80), width: siperfaqja * 1.6, height: siperfaqja }}
        viewBox="0 0 100 80"
        aria-hidden="true"
      >
        {/* Shtylla (mast) */}
        <rect x="47" y="2" width="6" height="66" fill="#1b5a68" />
        <rect x="48.5" y="2" width="1.2" height="66" fill="#7fc8d9" opacity="0.6" />
        {Array.from({ length: 8 }, (_, i) => (
          <path key={i} d={`M47 ${6 + i * 8} L53 ${10 + i * 8}`} stroke="#0e2a30" strokeWidth="0.8" />
        ))}
        <circle cx="50" cy="3" r="2.2" fill="#F2B705" className={reduce ? '' : 'prerja-drita'} />
        {/* Trupi */}
        <path d="M22 56 H62 L66 66 H18 Z" fill="#256D7B" />
        <rect x="26" y="47" width="16" height="10" rx="1.5" fill="#1C4750" />
        <rect x="28" y="49" width="8" height="5" rx="1" fill="#9fe3f2" opacity="0.7" />
        <text x="44" y="63.5" fontSize="5" fontWeight="800" fill="#F2B705" fontFamily="Arial, sans-serif">VPD</text>
        {/* Zinxhirët */}
        <rect x="14" y="66" width="56" height="9" rx="4.5" fill="#0b1f24" />
        {Array.from({ length: 6 }, (_, i) => (
          <circle key={i} cx={20 + i * 9} cy="70.5" r="2.4" fill="#3d4f53" />
        ))}
      </svg>

      {/* Sfida + shkëndija + thellësia aktuale */}
      <motion.div className="absolute" style={{ left: cx, top: reduce ? h : bitY }}>
        <div className="absolute -translate-x-1/2 -translate-y-[85%]" style={{ width: vrimaW * 1.25 }}>
          <svg viewBox="0 0 40 46" className="w-full drop-shadow-[0_0_12px_rgba(242,183,5,0.7)]">
            <defs>
              <linearGradient id="sfida" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="#b8892e" />
                <stop offset="0.5" stopColor="#ffe08a" />
                <stop offset="1" stopColor="#a67c1a" />
              </linearGradient>
            </defs>
            <rect x="12" y="0" width="16" height="10" rx="2" fill="#4b585b" />
            <path d="M4 10 H36 L28 34 L20 46 L12 34 Z" fill="url(#sfida)" />
            <path d="M6 16 L34 20 M8 24 L31 27 M12 31 L27 33" stroke="#0E2A30" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
          </svg>
        </div>
        {!reduce && (
          <div className="pointer-events-none absolute left-0 top-0">
            {Array.from({ length: 6 }, (_, i) => (
              <span key={i} className="prerja-shkendija absolute h-1 w-1 rounded-full bg-[#ffd76a]" style={{ animationDelay: `${i * 0.18}s`, ['--dx' as string]: `${(i % 2 ? 1 : -1) * (10 + i * 4)}px` }} />
            ))}
          </div>
        )}
        <span
          className="absolute right-full top-0 mr-3 -translate-y-1/2 whitespace-nowrap rounded-full bg-signal px-2 py-0.5 text-[10px] font-extrabold tabular text-bedrock shadow-lg max-[420px]:hidden sm:text-[11px]"
          style={{ marginRight: vrimaW }}
        >
          −{thellesia} m
        </span>
      </motion.div>

      <span className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10" />
    </div>
  )
}
