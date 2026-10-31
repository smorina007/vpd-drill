'use client'

import { type ReactNode, useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { animate, motion, useMotionValue, useTransform, useReducedMotion } from 'framer-motion'
import { FaChevronLeft, FaChevronRight, FaExpand, FaCompress, FaListUl, FaWhatsapp, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa'
import { produkteKategorite, type KategoriProduktesh } from '@/lib/produktet'
import { trackEvent } from '@/lib/gtag'

const WA = '38344184114'
const waLink = (tekst: string) => `https://wa.me/${WA}?text=${encodeURIComponent(tekst)}`
const VITI = 2026

/* ───────────────────────── Faqet ───────────────────────── */

type Faqe = { lloji: 'kopertina' | 'hyrja' | 'permbajtja' | 'foto' | 'lista' | 'rreth' | 'kontakti' | 'mbrapa'; kat?: KategoriProduktesh; nr?: number }

const FAQET: Faqe[] = [
  { lloji: 'kopertina' },
  { lloji: 'hyrja' },
  { lloji: 'permbajtja' },
  ...produkteKategorite.flatMap((kat, i) => [
    { lloji: 'foto' as const, kat, nr: i + 1 },
    { lloji: 'lista' as const, kat, nr: i + 1 },
  ]),
  { lloji: 'rreth' },
  { lloji: 'kontakti' },
  { lloji: 'mbrapa' },
]
const faqjaEKategorise = (i: number) => 3 + i * 2

/** Letër me teksturë të lehtë + hije te palosja (gutter). */
function Leter({ ana, children, nr }: { ana: 'majtas' | 'djathtas'; children: ReactNode; nr?: number }) {
  return (
    <div className="relative h-full w-full overflow-hidden bg-[#f8f5ef] text-bedrock">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.5]"
        style={{ backgroundImage: 'radial-gradient(circle at 30% 20%, rgba(255,255,255,0.9), transparent 60%), radial-gradient(circle at 80% 90%, rgba(180,160,120,0.12), transparent 55%)' }}
      />
      <div
        className={`pointer-events-none absolute inset-y-0 w-[12%] ${ana === 'majtas' ? 'right-0 bg-gradient-to-l' : 'left-0 bg-gradient-to-r'} from-black/[0.16] via-black/[0.04] to-transparent`}
      />
      <div className="relative h-full">{children}</div>
      {nr !== undefined && (
        <span className={`absolute bottom-[1.1em] text-[0.62em] font-semibold tabular text-slate-mute ${ana === 'majtas' ? 'left-[1.6em]' : 'right-[1.6em]'}`}>
          {nr}
        </span>
      )}
    </div>
  )
}

function Kopertina({ mbrapa = false }: { mbrapa?: boolean }) {
  return (
    <div className="relative h-full w-full overflow-hidden bg-[#0b2228] text-white">
      {/* "Lëkurë": zhurmë SVG + dritë */}
      <div
        className="absolute inset-0 opacity-[0.35] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 .5 0 0 0 0 .5 0 0 0 0 .5 0 0 0 .9 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_15%,rgba(127,200,217,0.18),transparent_55%),radial-gradient(ellipse_at_80%_100%,rgba(0,0,0,0.5),transparent_60%)]" />
      {/* Kurrizi */}
      <div className={`absolute inset-y-0 w-[7%] ${mbrapa ? 'right-0 bg-gradient-to-l' : 'left-0 bg-gradient-to-r'} from-black/60 to-transparent`} />
      {/* Korniza e artë */}
      <div className="absolute inset-[5%] rounded-[0.4em] border border-[#c9a54a]/50" />
      <div className="absolute inset-[6.2%] rounded-[0.3em] border border-[#c9a54a]/25" />
      {/* Këndet */}
      {['left-[3%] top-[3%] rotate-0', 'right-[3%] top-[3%] rotate-90', 'right-[3%] bottom-[3%] rotate-180', 'left-[3%] bottom-[3%] -rotate-90'].map((c) => (
        <span key={c} className={`absolute h-[9%] w-[9%] ${c}`} style={{ background: 'linear-gradient(135deg,#f3dc8b,#b8892e 55%,transparent 55%)' }} />
      ))}

      {!mbrapa ? (
        <div className="relative flex h-full flex-col items-center px-[12%] pb-[12%] pt-[14%] text-center">
          <span className="grid h-[4.2em] w-[4.2em] place-items-center rounded-full bg-white p-[0.5em] shadow-[0_0_0_0.18em_#c9a54a,0_0.6em_1.6em_rgba(0,0,0,0.5)]">
            <Image src="/images/logo1.png" alt="" width={120} height={120} className="h-auto w-full" />
          </span>
          <p className="mt-[1.4em] text-[0.7em] font-semibold uppercase tracking-[0.35em] text-[#d8bd6a]">VPD DRILL SHPK</p>
          <h3 className="ari mt-[0.5em] font-xwide text-[2.25em] font-extrabold leading-[1.02]">
            Katalogu
            <br />i Produkteve
          </h3>
          <div className="mt-[1.2em] h-px w-[40%] bg-gradient-to-r from-transparent via-[#c9a54a] to-transparent" />
          <div className="relative mt-[1.6em] aspect-[16/9] w-full overflow-hidden rounded-[0.35em] shadow-[0_0_0_0.12em_#c9a54a,0_0.8em_2em_rgba(0,0,0,0.55)]">
            <Image src="/images/katalogu/kopertina.jpg" alt="Baza e prodhimit të VPD" fill sizes="400px" className="object-cover" />
          </div>
          <p className="mt-auto text-[0.68em] tracking-[0.25em] text-white/60">MURE L · GYPA · PLLAKA · ARMATURË</p>
          <p className="ari mt-[0.4em] font-xwide text-[1.1em] font-bold">{VITI}</p>
        </div>
      ) : (
        <div className="relative flex h-full flex-col items-center justify-center px-[14%] text-center">
          <span className="grid h-[3.4em] w-[3.4em] place-items-center rounded-full bg-white p-[0.45em] shadow-[0_0_0_0.15em_#c9a54a]">
            <Image src="/images/logo1.png" alt="" width={100} height={100} className="h-auto w-full" />
          </span>
          <p className="ari mt-[1em] font-xwide text-[1.4em] font-extrabold">VPD DRILL</p>
          <p className="mt-[0.6em] text-[0.75em] text-white/65">Ekspertizë e thellë, themele të sigurta.</p>
          <div className="my-[1.4em] h-px w-[50%] bg-gradient-to-r from-transparent via-[#c9a54a] to-transparent" />
          <p className="text-[0.75em] leading-relaxed text-white/75">
            +383 44 184 114 · +383 44 204 877
            <br />
            info@vllezeritpaqarizi.com
            <br />
            vpddrill.com
          </p>
        </div>
      )}
    </div>
  )
}

function PermbajtjaFaqe({ shko }: { shko: (faqe: number) => void }) {
  return (
    <Leter ana="djathtas" nr={2}>
      <div className="flex h-full flex-col px-[10%] pb-[12%] pt-[11%]">
        <p className="text-[0.62em] font-bold uppercase tracking-[0.3em] text-brand">Përmbajtja</p>
        <h3 className="mt-[0.4em] font-xwide text-[1.6em] font-extrabold">Produktet</h3>
        <ol className="mt-[1.4em] flex-1 space-y-[0.15em]">
          {produkteKategorite.map((k, i) => (
            <li key={k.slug}>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  shko(faqjaEKategorise(i))
                }}
                className="group flex w-full items-baseline gap-[0.5em] rounded py-[0.42em] text-left text-[0.85em] transition-colors hover:text-brand"
              >
                <span className="w-[1.8em] font-bold tabular text-signal-dark">{String(i + 1).padStart(2, '0')}</span>
                <span className="font-semibold">{k.title}</span>
                <span className="mx-[0.3em] flex-1 border-b border-dotted border-bedrock/25" />
                <span className="tabular text-slate-mute">{faqjaEKategorise(i)}</span>
              </button>
            </li>
          ))}
        </ol>
        <p className="text-[0.62em] text-slate-mute">Klikoni një kategori për të shkuar direkt te faqja e saj.</p>
      </div>
    </Leter>
  )
}

function FaqeFoto({ kat, nr, faqe }: { kat: KategoriProduktesh; nr: number; faqe: number }) {
  return (
    <Leter ana="majtas" nr={faqe}>
      <div className="flex h-full flex-col">
        <div className="relative h-[58%] w-full overflow-hidden">
          <Image src={kat.foto} alt={kat.title} fill sizes="(max-width: 768px) 90vw, 500px" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#f8f5ef] via-transparent to-transparent" />
        </div>
        <div className="relative z-10 -mt-[2.2em] flex-1 px-[10%] pb-[12%]">
          <p className="font-xwide text-[3.2em] font-extrabold leading-none text-signal drop-shadow-[0_0.08em_0.2em_rgba(0,0,0,0.25)]">{String(nr).padStart(2, '0')}</p>
          <h3 className="mt-[0.15em] font-xwide text-[1.55em] font-extrabold leading-tight">{kat.title}</h3>
          <div className="mt-[0.7em] h-[0.18em] w-[2.6em] bg-brand" />
          <p className="mt-[0.9em] text-[0.82em] leading-relaxed text-slate-ink">{kat.pershkrimi}</p>
          <p className="mt-[0.9em] text-[0.68em] font-semibold text-slate-mute">{kat.items.length} modele në katalog →</p>
        </div>
      </div>
    </Leter>
  )
}

function FaqeLista({ kat, faqe }: { kat: KategoriProduktesh; faqe: number }) {
  const shume = kat.items.length > 8
  return (
    <Leter ana="djathtas" nr={faqe}>
      <div className="flex h-full flex-col px-[8%] pb-[11%] pt-[9%]">
        <div className="flex items-center gap-[0.6em]">
          <span className="grid h-[2em] w-[2em] place-items-center rounded-full bg-bedrock text-[0.8em] text-glacier">
            <kat.icon />
          </span>
          <div>
            <p className="text-[0.58em] font-bold uppercase tracking-[0.25em] text-brand">Modelet</p>
            <h4 className="text-[1.05em] font-extrabold leading-tight">{kat.title}</h4>
          </div>
        </div>
        <ul className={`mt-[1em] flex-1 divide-y divide-bedrock/10 overflow-y-auto pr-[0.3em] ${shume ? 'text-[0.78em]' : 'text-[0.86em]'}`}>
          {kat.items.map((it) => (
            <li key={it.name} className="flex items-center gap-[0.7em] py-[0.42em]">
              <span className="relative h-[2.5em] w-[2.5em] shrink-0 overflow-hidden rounded-[0.3em] bg-stone-2 ring-1 ring-bedrock/10">
                <Image src={it.image} alt="" fill sizes="48px" className="object-cover" />
              </span>
              <span className="flex-1 font-semibold leading-snug">{it.name}</span>
              <a
                href={waLink(`Përshëndetje VPD DRILL, dua një ofertë për: ${it.name}`)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  e.stopPropagation()
                  trackEvent('katalog_oferte', { produkti: it.name })
                }}
                className="shrink-0 rounded-full bg-[#25D366]/10 px-[0.7em] py-[0.3em] text-[0.78em] font-bold text-[#128C4B] transition-colors hover:bg-[#25D366] hover:text-white"
              >
                Ofertë
              </a>
            </li>
          ))}
        </ul>
        <a
          href={waLink(`Përshëndetje VPD DRILL, dua një ofertë për ${kat.title}.`)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="mt-[0.9em] flex items-center justify-center gap-[0.5em] rounded-[0.4em] bg-bedrock py-[0.65em] text-[0.78em] font-bold text-white transition-colors hover:bg-brand"
        >
          <FaWhatsapp className="text-[#25D366]" /> Kërko ofertë për {kat.title}
        </a>
      </div>
    </Leter>
  )
}

function FaqeHyrja() {
  return (
    <Leter ana="majtas" nr={1}>
      <div className="flex h-full flex-col px-[10%] pb-[12%] pt-[11%]">
        <p className="text-[0.62em] font-bold uppercase tracking-[0.3em] text-brand">Mirë se vini</p>
        <h3 className="mt-[0.4em] font-xwide text-[1.45em] font-extrabold leading-tight">Prodhim betoni për themele të sigurta</h3>
        <p className="mt-[1em] text-[0.82em] leading-relaxed text-slate-ink">
          Në këtë katalog gjeni produktet që VPD DRILL prodhon dhe furnizon për ndërtim, puse dhe shpime — nga muret L te gypat e betonit dhe kafazët e armaturës.
        </p>
        <div className="relative mt-[1.2em] aspect-[16/10] w-full overflow-hidden rounded-[0.4em]">
          <Image src="/images/katalogu/mure-l-stok.jpg" alt="Mure L në bazën e prodhimit" fill sizes="420px" className="object-cover" />
        </div>
        <dl className="mt-auto grid grid-cols-3 gap-[0.6em] border-t border-bedrock/10 pt-[1em] text-center">
          {[
            ['100+', 'projekte'],
            ['22', 'qytete'],
            ['10+', 'makineri'],
          ].map(([v, l]) => (
            <div key={l}>
              <dt className="sr-only">{l}</dt>
              <dd className="font-xwide text-[1.25em] font-extrabold text-brand">{v}</dd>
              <dd className="text-[0.62em] text-slate-mute">{l}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Leter>
  )
}

function FaqeRreth({ faqe }: { faqe: number }) {
  return (
    <Leter ana="majtas" nr={faqe}>
      <div className="flex h-full flex-col">
        <div className="relative h-[52%] w-full overflow-hidden">
          <Image src="/images/galeria/muri-l/m17.jpg" alt="Transporti i mureve L" fill sizes="500px" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#f8f5ef] via-transparent to-transparent" />
        </div>
        <div className="relative z-10 -mt-[1.5em] px-[10%] pb-[12%]">
          <p className="text-[0.62em] font-bold uppercase tracking-[0.3em] text-brand">Nga baza deri te kantieri</p>
          <h3 className="mt-[0.3em] font-xwide text-[1.4em] font-extrabold leading-tight">Prodhim · Transport · Montim</h3>
          <ul className="mt-[0.9em] space-y-[0.45em] text-[0.8em] text-slate-ink">
            <li>✓ Elemente të prodhuara në bazën tonë të prodhimit</li>
            <li>✓ Transport me kamion deri në lokacionin tuaj</li>
            <li>✓ Montim me vinç dhe ekip të specializuar</li>
            <li>✓ Ofertë sipas sasisë dhe distancës</li>
          </ul>
        </div>
      </div>
    </Leter>
  )
}

function FaqeKontakti({ faqe }: { faqe: number }) {
  return (
    <Leter ana="djathtas" nr={faqe}>
      <div className="flex h-full flex-col px-[10%] pb-[12%] pt-[11%]">
        <p className="text-[0.62em] font-bold uppercase tracking-[0.3em] text-brand">Kontakti</p>
        <h3 className="mt-[0.4em] font-xwide text-[1.45em] font-extrabold leading-tight">Kërkoni ofertë sot</h3>
        <ul className="mt-[1.2em] space-y-[0.7em] text-[0.8em]">
          <li className="flex items-center gap-[0.7em]"><FaPhoneAlt className="text-brand" /> +383 44 184 114 · +383 44 204 877</li>
          <li className="flex items-center gap-[0.7em]"><FaEnvelope className="text-brand" /> info@vllezeritpaqarizi.com</li>
          <li className="flex items-center gap-[0.7em]"><FaMapMarkerAlt className="text-brand" /> Dragobil, 24000 Malishevë</li>
          <li className="flex items-center gap-[0.7em]"><FaClock className="text-brand" /> Hënë–Shtunë, 07:00–19:00</li>
        </ul>
        <a
          href={waLink('Përshëndetje VPD DRILL, pashë katalogun dhe dua një ofertë.')}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="mt-[1.3em] flex items-center justify-center gap-[0.5em] rounded-[0.4em] bg-[#25D366] py-[0.7em] text-[0.82em] font-bold text-white"
        >
          <FaWhatsapp /> Shkruani në WhatsApp
        </a>
        <div className="mt-auto flex items-center gap-[0.9em] border-t border-bedrock/10 pt-[1em]">
          <span className="relative h-[4.4em] w-[4.4em] shrink-0">
            <Image src="/images/katalogu/qr-produktet.png" alt="Kodi QR i katalogut" fill sizes="80px" className="object-contain" />
          </span>
          <p className="text-[0.66em] leading-relaxed text-slate-mute">Skanoni për ta hapur këtë katalog në telefon: vpddrill.com/produktet</p>
        </div>
      </div>
    </Leter>
  )
}

function renderFaqe(i: number, shko: (f: number) => void) {
  const f = FAQET[i]
  if (!f) return <div className="h-full w-full bg-[#f8f5ef]" />
  switch (f.lloji) {
    case 'kopertina':
      return <Kopertina />
    case 'mbrapa':
      return <Kopertina mbrapa />
    case 'hyrja':
      return <FaqeHyrja />
    case 'permbajtja':
      return <PermbajtjaFaqe shko={shko} />
    case 'foto':
      return <FaqeFoto kat={f.kat!} nr={f.nr!} faqe={i} />
    case 'lista':
      return <FaqeLista kat={f.kat!} faqe={i} />
    case 'rreth':
      return <FaqeRreth faqe={i} />
    case 'kontakti':
      return <FaqeKontakti faqe={i} />
  }
}

/* ───────────────────────── Fleta që kthehet ───────────────────────── */

const KTHIMI = { duration: 0.95, ease: [0.645, 0.045, 0.355, 1] as const }

function Flete({
  kthyer,
  z,
  para,
  mbrapa,
  reduce,
  njeFaqe,
  fshehur,
}: {
  fshehur: boolean
  kthyer: boolean
  z: number
  para: ReactNode
  mbrapa: ReactNode
  reduce: boolean | null
  njeFaqe: boolean
}) {
  const rot = useMotionValue(kthyer ? -180 : 0)
  useEffect(() => {
    const c = animate(rot, kthyer ? -180 : 0, reduce ? { duration: 0 } : KTHIMI)
    return () => c.stop()
  }, [kthyer, rot, reduce])

  // Hije dhe dritë gjatë kthimit — japin ndjesinë e letrës që përkulet
  const hijePara = useTransform(rot, [0, -90], [0, 0.45])
  const hijeMbrapa = useTransform(rot, [-90, -180], [0.45, 0])
  const shkelqim = useTransform(rot, [0, -45, -90], [0, 0.35, 0])
  const shtrembim = useTransform(rot, [0, -90, -180], [0, njeFaqe ? -2 : -1.5, 0])
  const hijaPoshte = useTransform(rot, [0, -90, -180], [0, 0.35, 0])

  return (
    <motion.div
      className={`absolute inset-y-0 right-0 origin-left [transform-style:preserve-3d] ${fshehur ? 'hidden' : ''}`}
      style={{ rotateY: rot, skewY: shtrembim, zIndex: z, width: njeFaqe ? '100%' : '50%' }}
    >
      {/* Hija që hedh fleta mbi faqen poshtë */}
      <motion.div className="pointer-events-none absolute inset-0 -z-10 bg-black blur-xl" style={{ opacity: hijaPoshte }} />
      <div className="absolute inset-0 overflow-hidden rounded-r-[0.35em] [backface-visibility:hidden]">
        {para}
        <motion.div className="pointer-events-none absolute inset-0 bg-gradient-to-l from-black via-black/40 to-transparent" style={{ opacity: hijePara }} />
        <motion.div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white via-transparent to-transparent" style={{ opacity: shkelqim }} />
      </div>
      <div className="absolute inset-0 overflow-hidden rounded-l-[0.35em] [backface-visibility:hidden] [transform:rotateY(180deg)]">
        {mbrapa}
        <motion.div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent" style={{ opacity: hijeMbrapa }} />
      </div>
    </motion.div>
  )
}

/* ───────────────────────── Libri ───────────────────────── */

export default function KatalogLiber() {
  const reduce = useReducedMotion()
  const wrapRef = useRef<HTMLDivElement>(null)
  const bookRef = useRef<HTMLDivElement>(null)
  const [madhesia, setMadhesia] = useState({ W: 460, H: 630, dyFaqe: true })
  const [kthyer, setKthyer] = useState(0) // sa fleta janë kthyer
  const [aktiv, setAktiv] = useState<number | null>(null) // fleta që po kthehet (sipër të tjerave)
  const [plot, setPlot] = useState(false)
  const [permbajtja, setPermbajtja] = useState(false)

  // Madhësia sipas ekranit: dy faqe në desktop, një faqe në celular
  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const llogarit = () => {
      const w = el.clientWidth
      const h = plot ? window.innerHeight - 140 : window.innerHeight - 200
      const dyFaqe = w >= 760
      let W = dyFaqe ? Math.min(520, (w - 24) / 2) : Math.min(460, w)
      let H = W * 1.38
      if (H > Math.max(420, h)) {
        H = Math.max(420, h)
        W = H / 1.38
      }
      setMadhesia({ W: Math.round(W), H: Math.round(H), dyFaqe })
    }
    llogarit()
    const ro = new ResizeObserver(llogarit)
    ro.observe(el)
    window.addEventListener('resize', llogarit)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', llogarit)
    }
  }, [plot])

  const { W, H, dyFaqe } = madhesia
  const nrFletave = dyFaqe ? Math.ceil(FAQET.length / 2) : FAQET.length - 1

  // Ndërrimi dy-faqe ↔ një-faqe: ruaj faqen ku jemi
  const paraDy = useRef(dyFaqe)
  useEffect(() => {
    if (paraDy.current === dyFaqe) return
    setKthyer((k) => (dyFaqe ? Math.ceil(k / 2) : Math.max(0, k * 2 - 1)))
    paraDy.current = dyFaqe
  }, [dyFaqe])

  const kthe = useCallback(
    (d: number) => {
      setKthyer((k) => {
        const n = Math.min(nrFletave, Math.max(0, k + d))
        if (n !== k) {
          setAktiv(d > 0 ? k : n)
          trackEvent('katalog_faqe', { faqe: n })
        }
        return n
      })
    },
    [nrFletave],
  )

  const shko = useCallback(
    (faqe: number) => {
      const n = dyFaqe ? Math.ceil(faqe / 2) : faqe
      setAktiv(null)
      setKthyer(Math.min(nrFletave, Math.max(0, n)))
      setPermbajtja(false)
    },
    [dyFaqe, nrFletave],
  )

  useEffect(() => {
    if (aktiv === null) return
    const t = setTimeout(() => setAktiv(null), 1000)
    return () => clearTimeout(t)
  }, [aktiv, kthyer])

  // Tastiera
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const brenda = wrapRef.current?.contains(document.activeElement) || plot
      if (!brenda) return
      if (e.key === 'ArrowRight') kthe(1)
      if (e.key === 'ArrowLeft') kthe(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [kthe, plot])

  // Ekran i plotë
  useEffect(() => {
    const onFs = () => setPlot(!!document.fullscreenElement)
    document.addEventListener('fullscreenchange', onFs)
    return () => document.removeEventListener('fullscreenchange', onFs)
  }, [])
  const ndrroPlot = () => {
    if (document.fullscreenElement) document.exitFullscreen()
    else wrapRef.current?.requestFullscreen?.().catch(() => {})
  }

  // Rrëshqitja me gisht
  const filloX = useRef<number | null>(null)

  // Libri i mbyllur rri në qendër (vetëm kopertina); i hapur — dy faqe
  const zhvendosja = dyFaqe ? (kthyer === 0 ? -W / 2 : kthyer === nrFletave ? W / 2 : 0) : 0

  // Faqet që shfaqen tani (për treguesin)
  const faqjaMajtas = dyFaqe ? kthyer * 2 - 1 : kthyer
  const tregues = dyFaqe
    ? kthyer === 0
      ? 'Kopertina'
      : kthyer === nrFletave
        ? 'Kopertina e pasme'
        : `Faqet ${faqjaMajtas}–${faqjaMajtas + 1} / ${FAQET.length - 2}`
    : kthyer === 0
      ? 'Kopertina'
      : kthyer >= FAQET.length - 1
        ? 'Kopertina e pasme'
        : `Faqja ${kthyer} / ${FAQET.length - 2}`

  return (
    <div
      ref={wrapRef}
      tabIndex={-1}
      className={`relative outline-none ${plot ? 'flex flex-col items-center justify-center bg-bedrock p-4' : ''}`}
      aria-roledescription="libër"
      aria-label="Katalogu i produkteve të VPD DRILL"
    >
      {/* Skena */}
      <div className="flex justify-center py-6" style={{ fontSize: (W / 460) * 16 }}>
        <motion.div
          ref={bookRef}
          className="relative select-none"
          style={{ width: dyFaqe ? W * 2 : W, height: H, perspective: 2600, overflow: dyFaqe ? 'visible' : 'hidden' }}
          animate={{ x: zhvendosja }}
          transition={reduce ? { duration: 0 } : { duration: 0.9, ease: [0.645, 0.045, 0.355, 1] }}
          onPointerDown={(e) => (filloX.current = e.clientX)}
          onPointerUp={(e) => {
            if (filloX.current === null) return
            if ((e.target as HTMLElement).closest('a,button')) {
              filloX.current = null
              return
            }
            const dx = e.clientX - filloX.current
            filloX.current = null
            if (Math.abs(dx) > 40) return kthe(dx < 0 ? 1 : -1)
            // klikim: gjysma e djathtë → para, e majta → mbrapa
            const r = bookRef.current!.getBoundingClientRect()
            const x = e.clientX - r.left
            kthe(x > r.width / 2 ? 1 : -1)
          }}
        >
          {/* Hija e librit mbi tavolinë */}
          <div
            className="pointer-events-none absolute -inset-x-[4%] -bottom-[6%] h-[10%] rounded-[50%] bg-black/45 blur-2xl transition-all duration-700"
            style={{ left: dyFaqe && kthyer === 0 ? '50%' : undefined, right: dyFaqe && kthyer === nrFletave ? '50%' : undefined }}
          />
          {/* Trashësia e faqeve (anët) */}
          {dyFaqe && kthyer > 0 && (
            <div className="pointer-events-none absolute inset-y-[0.6%] left-0 w-1/2 rounded-l-[0.35em] shadow-[-1px_0_0_#e8e2d6,-2px_0_0_#d9d2c4,-3px_0_0_#ece6da,-4px_0_0_#d3cbbb,-5px_0_0_#e6dfd2]" />
          )}
          {kthyer < nrFletave && (
            <div
              className="pointer-events-none absolute inset-y-[0.6%] right-0 rounded-r-[0.35em] shadow-[1px_0_0_#e8e2d6,2px_0_0_#d9d2c4,3px_0_0_#ece6da,4px_0_0_#d3cbbb,5px_0_0_#e6dfd2]"
              style={{ width: dyFaqe ? '50%' : '100%' }}
            />
          )}

          {Array.from({ length: nrFletave }, (_, i) => {
            const eKthyer = i < kthyer
            const z = aktiv === i ? 200 : eKthyer ? i + 1 : nrFletave - i + 1
            const para = dyFaqe ? renderFaqe(i * 2, shko) : renderFaqe(i, shko)
            const mbrapa = dyFaqe ? renderFaqe(i * 2 + 1, shko) : <div className="h-full w-full bg-[#ece6da]" />
            // Shfaqim vetëm fletët pranë faqes aktuale (performancë)
            const afer = Math.abs(i - kthyer) <= 2 || aktiv === i
            return <Flete key={i} fshehur={!afer} kthyer={eKthyer} z={z} para={para} mbrapa={mbrapa} reduce={reduce} njeFaqe={!dyFaqe} />
          })}
        </motion.div>
      </div>

      {/* Shiriti i kontrollit */}
      <div className="relative mr-16 mt-2 flex max-w-xl items-center sm:mx-auto justify-between gap-2 rounded-full bg-bedrock p-1.5 text-white shadow-[0_20px_40px_-20px_rgba(14,42,48,0.7)]">
        <button
          type="button"
          onClick={() => kthe(-1)}
          disabled={kthyer === 0}
          aria-label="Faqja e mëparshme"
          className="grid h-10 w-10 place-items-center rounded-full transition-colors hover:bg-white/10 disabled:opacity-30"
        >
          <FaChevronLeft />
        </button>
        <div className="relative">
          <button
            type="button"
            onClick={() => setPermbajtja((v) => !v)}
            aria-expanded={permbajtja}
            className="flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold transition-colors hover:bg-white/10"
          >
            <FaListUl className="text-glacier" /> <span className="tabular">{tregues}</span>
          </button>
          {permbajtja && (
            <ul className="absolute bottom-full left-1/2 mb-3 w-64 -translate-x-1/2 rounded-xl bg-white p-1.5 text-bedrock shadow-2xl ring-1 ring-stone-line">
              <li>
                <button type="button" onClick={() => shko(0)} className="w-full rounded-md px-3 py-2 text-left text-sm font-semibold hover:bg-stone">
                  Kopertina
                </button>
              </li>
              {produkteKategorite.map((k, i) => (
                <li key={k.slug}>
                  <button
                    type="button"
                    onClick={() => shko(faqjaEKategorise(i))}
                    className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm font-semibold hover:bg-stone"
                  >
                    <k.icon className="text-brand" /> {k.title}
                  </button>
                </li>
              ))}
              <li>
                <button type="button" onClick={() => shko(FAQET.length - 2)} className="w-full rounded-md px-3 py-2 text-left text-sm font-semibold hover:bg-stone">
                  Kontakti
                </button>
              </li>
            </ul>
          )}
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={ndrroPlot}
            aria-label={plot ? 'Dil nga ekrani i plotë' : 'Ekran i plotë'}
            className="hidden h-10 w-10 place-items-center rounded-full transition-colors hover:bg-white/10 sm:grid"
          >
            {plot ? <FaCompress /> : <FaExpand />}
          </button>
          <button
            type="button"
            onClick={() => kthe(1)}
            disabled={kthyer === nrFletave}
            aria-label="Faqja tjetër"
            className="grid h-10 w-10 place-items-center rounded-full bg-signal text-bedrock transition-colors hover:bg-signal-dark disabled:opacity-30"
          >
            <FaChevronRight />
          </button>
        </div>
      </div>
      {!plot && <p className="mt-3 text-center text-xs text-slate-mute">Klikoni faqen ose rrëshqitni për ta shfletuar · ← → në tastierë</p>}
    </div>
  )
}
