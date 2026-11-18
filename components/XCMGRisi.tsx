'use client'

import { useEffect, useRef, useState, type CSSProperties, type ComponentProps } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { FaVolumeUp, FaVolumeMute, FaArrowRight, FaExpand, FaTruck, FaCircle } from 'react-icons/fa'
import { useOferta } from '@/app/context/OfertaContext'
import Lightbox, { type LightboxItem } from './ui/Lightbox'

/**
 * "E re në flotën tonë" — XCMG XR138E.
 * Ø1500 mm dhe 138 kN·m sipas XCMG (xcmg.com.tr/xr138e-374); thellësia mbi 50 m dhe
 * pesha 42 t sipas konfigurimit të makinës së VPD DRILL (konfirmuar nga kompania).
 */
const VIDEO = { src: '/videos/xcmg/xr138e-promo.mp4', poster: '/videos/xcmg/xr138e-promo.jpg' }
const DIR = '/images/makinerite/xcmg-xr138e'

const specs = [
  { vlera: 'Ø1500', njesia: 'mm', label: 'Diametri maksimal i pilotës' },
  { vlera: '50+', njesia: 'm', label: 'Thellësia e shpimit' },
  { vlera: '138', njesia: 'kN·m', label: 'Moment rrotullues' },
  { vlera: '42', njesia: 't', label: 'Pesha e punës' },
  { vlera: '173', njesia: 'kW', label: 'Fuqia e motorit (deri)' },
]

const fotot: (LightboxItem & { alt: string })[] = [
  {
    src: `${DIR}/xr138e-direku-qielli.jpg`,
    alt: 'XCMG XR138E e VPD Drill, e gatshme për shpim, nën qiell të kaltër',
    title: 'XCMG XR138E — e gatshme për shpim',
    meta: 'Flota VPD DRILL',
  },
  {
    src: `${DIR}/xr138e-direku-stuhia.jpg`,
    alt: 'XCMG XR138E me shufrën Kelly dhe kokën rrotulluese, nën qiell me re',
    title: 'Shufra Kelly dhe koka rrotulluese',
    meta: '138 kN·m moment rrotullues',
  },
  {
    src: `${DIR}/xr138e-detaj.jpg`,
    alt: 'Kabina dhe trupi i XCMG XR138E me logon VPD Drill',
    title: 'Kabina dhe motori',
    meta: 'XCMG XR138E',
  },
  {
    src: `${DIR}/xr138e-transporti.jpg`,
    alt: 'Makinë shpimi e VPD Drill e ngarkuar në rimorkio speciale gjatë transportit',
    title: 'Nga baza jonë deri te kantieri juaj',
    meta: 'Transport me rimorkio speciale',
  },
]

/** Foto që shfaqet butë (fade) sapo të ngarkohet. */
function FotoFade({ className = '', ...props }: ComponentProps<typeof Image>) {
  const [gati, setGati] = useState(false)
  return (
    <Image
      {...props}
      alt={props.alt}
      onLoad={() => setGati(true)}
      className={`${className} ${gati ? 'opacity-100' : 'opacity-0'}`}
    />
  )
}

/** Video vertikale (reel) — luan pa zë kur del në ekran; butoni e ndez zërin. */
function ReelVideo() {
  const ref = useRef<HTMLVideoElement>(null)
  const reduce = useReducedMotion()
  const [zeri, setZeri] = useState(false)
  const [progresi, setProgresi] = useState(0)

  useEffect(() => {
    const v = ref.current
    if (!v) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          if (!reduce || zeri) v.play().catch(() => {})
        } else {
          v.pause()
        }
      },
      { threshold: 0.35 }
    )
    io.observe(v)
    const t = () => setProgresi(v.duration ? v.currentTime / v.duration : 0)
    v.addEventListener('timeupdate', t)
    return () => {
      io.disconnect()
      v.removeEventListener('timeupdate', t)
    }
  }, [reduce, zeri])

  const ndrysho = () => {
    const v = ref.current
    if (!v) return
    const ndez = !zeri
    v.muted = !ndez
    if (ndez) {
      v.currentTime = 0
      v.volume = 0.7
    }
    v.play().catch(() => {})
    setZeri(ndez)
  }

  return (
    <div className="relative mx-auto w-full max-w-[340px]">
      {/* Shkëlqim i ngrohtë pas videos */}
      <div className="pointer-events-none absolute -inset-10 -z-10 rounded-full bg-signal/20 blur-[90px]" aria-hidden="true" />
      <div className="relative aspect-[9/16] overflow-hidden rounded-[28px] bg-black shadow-[0_40px_90px_-30px_rgba(0,0,0,0.9)] ring-1 ring-white/15">
        <video
          ref={ref}
          src={VIDEO.src}
          poster={VIDEO.poster}
          muted
          loop
          playsInline
          preload="metadata"
          className="h-full w-full object-cover"
          aria-label="Video promovuese: XCMG XR138E, e re në flotën e VPD Drill"
        />
        {/* Shiriti i progresit */}
        <div className="absolute inset-x-4 top-3 h-[3px] overflow-hidden rounded-full bg-white/25" aria-hidden="true">
          <div className="h-full bg-signal transition-[width] duration-200 ease-linear" style={{ width: `${progresi * 100}%` }} />
        </div>
        <button
          type="button"
          onClick={ndrysho}
          aria-pressed={zeri}
          className="absolute right-3 top-6 flex items-center gap-2 whitespace-nowrap rounded-full bg-black/60 px-3.5 py-2 text-[13px] font-semibold text-white ring-1 ring-white/20 backdrop-blur-md transition-colors hover:bg-black/75"
        >
          {zeri ? <FaVolumeUp className="text-signal" /> : <FaVolumeMute />}
          {zeri ? 'Zëri aktiv' : 'Luaj me zë'}
        </button>
      </div>
    </div>
  )
}

export default function XCMGRisi() {
  const reduce = useReducedMotion()
  const { openOferta } = useOferta()
  const [hapur, setHapur] = useState<number | null>(null)
  const listaRef = useRef<HTMLUListElement>(null)
  const [aktive, setAktive] = useState(0)
  const [skajet, setSkajet] = useState({ majtas: false, djathtas: true })
  const perditesoLeviz = () => {
    const el = listaRef.current
    if (!el) return
    const max = el.scrollWidth - el.clientWidth
    setSkajet({ majtas: el.scrollLeft > 8, djathtas: el.scrollLeft < max - 8 })
    const kartat = Array.from(el.querySelectorAll<HTMLElement>('[data-foto]'))
    let afer = 0
    let dist = Infinity
    kartat.forEach((k, i) => {
      const d = Math.abs(k.offsetLeft - el.scrollLeft - 16)
      if (d < dist) {
        dist = d
        afer = i
      }
    })
    setAktive(afer)
  }
  const maska = `linear-gradient(to right, ${skajet.majtas ? 'transparent 0, #000 9%' : '#000 0'}, ${skajet.djathtas ? '#000 82%, transparent 100%' : '#000 100%'})`

  return (
    <article id="xcmg-xr138e" className="relative isolate">
      <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,360px)_minmax(0,1fr)] lg:gap-16 xl:gap-20">
        <ReelVideo />

        <div>
          <p className="inline-flex items-center gap-2 rounded-full bg-signal px-3.5 py-1.5 text-xs font-bold text-bedrock">
            <FaCircle className="animate-pulse text-[7px]" /> E re në flotën tonë
          </p>
          <motion.h3
            initial={reduce ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mt-5 text-[clamp(2.6rem,6vw,4.6rem)] font-black leading-[0.92] tracking-tight font-xwide text-white"
          >
            XCMG
            <br />
            <span className="text-signal">XR138E</span>
          </motion.h3>
          <p className="mt-4 text-lg font-semibold text-glacier">Makinë shpimi rotative për pilota dhe themele të thella</p>

          <div className="mt-6 max-w-[60ch] space-y-4 text-[16px] leading-relaxed text-white/75">
            <p>
              Flota e VPD DRILL sapo u forcua me <strong className="text-white">XCMG XR138E</strong>, një makinë shpimi
              rotative e gjeneratës së re. Me <strong className="text-white">138 kN·m moment rrotullues</strong> ajo hap
              pilota deri në <strong className="text-white">Ø1500 mm</strong> dhe{' '}
              <strong className="text-white">mbi 50 metra thellësi</strong>, si në argjilë e rërë, ashtu edhe në shtresa të forta.
            </p>
            <p>
              Me 42 tonë peshë pune, qëndron e palëkundur gjatë shpimit, ndërsa transportohet dhe vendoset shpejt, ndaj futet lehtë edhe në kantiere urbane ku hapësira
              është e kufizuar. Për projektin tuaj kjo do të thotë themele më të shpejta, pilota të sakta dhe afate që
              mbahen. <span className="font-semibold text-white">Fuqi. Precizion. Gati për çdo sfidë.</span>
            </p>
          </div>

          {/* Specifikimet */}
          <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-xl bg-white/10 ring-1 ring-white/10 sm:grid-cols-5">
            {specs.map((s, i) => (
              <div key={s.label} className={`bg-bedrock px-4 py-4 ${i === specs.length - 1 ? 'col-span-2 sm:col-span-1' : ''}`}>
                <dd className="whitespace-nowrap text-2xl font-extrabold font-wide tabular text-white">
                  {s.vlera}
                  <span className="ml-1 text-sm font-semibold text-signal">{s.njesia}</span>
                </dd>
                <dt className="mt-1 text-xs leading-snug text-white/60">{s.label}</dt>
              </div>
            ))}
          </dl>
          <p className="mt-2 text-[11px] text-white/40">Specifikimet e makinës XCMG XR138E të VPD DRILL.</p>

          <ul className="mt-6 flex flex-wrap gap-2 text-sm font-semibold">
            {['Pilota me diametër të madh', 'Themele të thella', 'Kantiere urbane', 'Terrene të buta dhe të forta'].map((t) => (
              <li key={t} className="rounded-full border border-white/15 bg-white/[0.04] px-3.5 py-1.5 text-white/85">
                {t}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => openOferta({ burim: 'xcmg-xr138e', sherbimi: 'pilota' })}
              className="btn-signal px-6 py-3.5 text-base"
            >
              Kërko ofertë për pilota <FaArrowRight className="text-xs" />
            </button>
            <Link href="/sherbimet/pilota" className="btn-ghost-light px-6 py-3.5 text-base">
              Pilota për objekte
            </Link>
          </div>
        </div>
      </div>

      {/* Fotot — rrjetë "bento" në desktop, rrëshqitje horizontale në celular */}
      <div className="relative -mx-4 mt-14 sm:mx-0">
        <ul
          ref={listaRef}
          onScroll={perditesoLeviz}
          style={
            {
              WebkitMaskImage: maska,
              maskImage: maska,
            } as CSSProperties
          }
          className="no-scrollbar flex snap-x snap-mandatory scroll-px-4 gap-3 overflow-x-auto px-4 pb-1 sm:grid sm:grid-cols-2 sm:gap-4 sm:overflow-visible sm:px-0 sm:pb-0 sm:![mask-image:none] sm:![-webkit-mask-image:none] lg:h-[620px] lg:grid-cols-12 lg:grid-rows-2"
        >
          {fotot.map((f, i) => {
            const vendi = [
              'w-[80%] aspect-[3/4] sm:w-auto lg:col-span-5 lg:row-span-2 lg:aspect-auto',
              'w-[80%] aspect-[3/4] sm:w-auto lg:col-span-4 lg:col-start-6 lg:row-span-2 lg:row-start-1 lg:aspect-auto',
              'w-[80%] aspect-[3/4] sm:w-auto sm:aspect-[4/3] lg:col-span-3 lg:col-start-10 lg:row-start-1 lg:aspect-auto',
              'w-[80%] aspect-[3/4] sm:w-auto sm:aspect-[4/3] lg:col-span-3 lg:col-start-10 lg:row-start-2 lg:aspect-auto',
            ][i]
            const pozicioni = ['object-[40%_25%]', 'object-[55%_30%]', 'object-[72%_60%]', 'object-[50%_40%]'][i]
            return (
              <motion.li
                key={f.src}
                data-foto={i}
                className={`relative shrink-0 snap-start ${vendi}`}
                initial={reduce ? false : { opacity: 0, y: 28, scale: 0.97, filter: 'blur(10px)' }}
                whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.9, delay: reduce ? 0 : 0.08 + (i % 2) * 0.12 + Math.floor(i / 2) * 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <button
                  type="button"
                  onClick={() => setHapur(i)}
                  data-kursor="Shiko"
                  aria-label={`Hap foton: ${f.title}`}
                  className="group absolute inset-0 overflow-hidden rounded-2xl bg-bedrock ring-1 ring-white/10"
                >
                  <FotoFade
                    src={f.src}
                    alt={f.alt}
                    fill
                    sizes={i < 2 ? '(max-width: 640px) 80vw, (max-width: 1024px) 50vw, 40vw' : '(max-width: 640px) 70vw, (max-width: 1024px) 50vw, 25vw'}
                    className={`object-cover transition-[transform,opacity] duration-[1400ms] ease-out group-hover:scale-[1.06] ${pozicioni}`}
                  />
                  <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                  <span className="pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-black/30 to-transparent" />
                  <span className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-black/45 text-xs text-white opacity-0 backdrop-blur transition-opacity group-hover:opacity-100">
                    <FaExpand />
                  </span>
                  <span className="absolute inset-x-0 bottom-0 p-4 text-left">
                    {i === 3 && (
                      <span className="mb-1 flex items-center gap-1.5 text-xs font-semibold text-signal">
                        <FaTruck /> Transport i sigurt
                      </span>
                    )}
                    <span className="block text-sm font-bold leading-snug text-white sm:text-[15px]">{f.title}</span>
                  </span>
                </button>
              </motion.li>
            )
          })}
        </ul>

        {/* Pikat e rrëshqitjes — vetëm në celular */}
        <div className="mt-5 flex items-center justify-center gap-2 sm:hidden" aria-hidden="true">
          {fotot.map((f, i) => (
            <span
              key={f.src}
              className={`h-1.5 rounded-full transition-all duration-500 ${i === aktive ? 'w-6 bg-signal' : 'w-1.5 bg-white/30'}`}
            />
          ))}
          <span className="ml-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/50">
            {aktive + 1} / {fotot.length}
          </span>
        </div>
      </div>

      <Lightbox
        items={[...fotot.map(({ alt: _alt, ...f }) => f), { ...VIDEO, type: 'video' as const, title: 'XCMG XR138E — e re në flotën tonë', meta: 'Video promovuese · VPD DRILL' }]}
        index={hapur}
        onClose={() => setHapur(null)}
        onIndex={setHapur}
      />
    </article>
  )
}
