'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { FaArrowDown, FaPlay, FaVolumeMute } from 'react-icons/fa'
import { useOferta } from '@/app/context/OfertaContext'
import Lightbox from '@/components/ui/Lightbox'

const REEL = '/videos/hero-reel'

const stats = [
  { number: '500m', label: 'Thellësi në terrene të forta' },
  { number: '50m+', label: 'Gërmim me diafragmë' },
  { number: '100+', label: 'Projekte të realizuara' },
  { number: '10+', label: 'Makineri shpimi' },
]

/** Video pa zë që luan vetëm kur është në ekran (kursen bateri/të dhëna). */
function useAutoplay(ref: React.RefObject<HTMLVideoElement | null>, enabled: boolean) {
  useEffect(() => {
    const v = ref.current
    if (!v || !enabled) return
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? v.play().catch(() => {}) : v.pause()), { threshold: 0.2 })
    io.observe(v)
    return () => io.disconnect()
  }, [ref, enabled])
}

export default function Hero() {
  const { openOferta } = useOferta()
  const reduce = useReducedMotion()
  const bgRef = useRef<HTMLVideoElement>(null)
  const cardRef = useRef<HTMLVideoElement>(null)
  const deskRef = useRef<HTMLVideoElement>(null)
  const [hapur, setHapur] = useState<number | null>(null)

  useAutoplay(bgRef, !reduce)
  useAutoplay(cardRef, !reduce)
  useAutoplay(deskRef, !reduce)

  return (
    <section id="ballina" data-shtresa="Sipërfaqja" className="relative isolate overflow-hidden bg-bedrock text-white">
      {/* Sfondi: video me dron në desktop, video portret në celular */}
      <div className="absolute inset-0 -z-10">
        {/* Desktop: video me dron e bazës së prodhimit */}
        <video
          ref={deskRef}
          src="/videos/hero-fabrika.mp4"
          poster="/videos/hero-fabrika.jpg"
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          className="absolute inset-0 hidden h-full w-full object-cover md:block"
        />
        <video
          ref={bgRef}
          src={`${REEL}.mp4`}
          poster={`${REEL}.jpg`}
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover md:hidden"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(14,42,48,0.88)_0%,rgba(14,42,48,0.5)_45%,rgba(14,42,48,0.1)_100%)] max-md:bg-[linear-gradient(180deg,rgba(14,42,48,0.75)_0%,rgba(14,42,48,0.6)_45%,rgba(14,42,48,0.92)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-bedrock via-bedrock/60 to-transparent" />
      </div>

      <div className="shell flex min-h-svh-safe flex-col pt-[calc(var(--header-h)+32px)]">
        <div className="grid flex-1 items-center gap-10 py-8">
          {/* Titulli */}
          <div className="max-w-3xl">
            <p className="anim-fade-up mb-5 flex items-center gap-3 text-[15px] font-semibold text-glacier" style={{ animationDelay: '0.1s' }}>
              <span className="h-px w-10 bg-signal" />
              VPD DRILL SHPK
            </p>
            <h1 className="display-xl text-white">
              {['Themele të Sigurta', 'për të Ardhmen'].map((rr, k) => (
                <span key={rr} className="block pb-[0.08em]">
                  <span className="anim-rise block" style={{ animationDelay: `${0.1 + k * 0.12}s` }}>
                    {rr}
                  </span>
                </span>
              ))}
            </h1>
            <p
              style={{ animationDelay: '0.3s' }}
              className="anim-lift mt-6 max-w-[52ch] text-base leading-relaxed text-white/75 sm:text-lg"
            >
              Shpime pusesh deri 500m, pilota, ankera dhe gërmime me diafragmë — me makineritë dhe ekipin tonë, anembanë Kosovës.
            </p>
            <div
              style={{ animationDelay: '0.45s' }}
              className="anim-fade-up mt-9 flex flex-col gap-3 sm:flex-row"
            >
              <button type="button" onClick={openOferta} className="btn-signal px-7 py-3.5 text-base">
                Kërko Ofertë
              </button>
              <a href="#si-punojme" className="btn-ghost-light px-7 py-3.5 text-base">
                <FaPlay className="text-xs" /> Shiko si punojmë
              </a>
            </div>
          </div>

          {/* Kartela video "nga kantieri" — vetëm desktop */}
          <motion.button
            type="button"
            onClick={() => setHapur(0)}
            data-kursor="Luaj"
            initial={reduce ? false : { opacity: 0, y: 30, rotate: 2 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ duration: 0.9, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="group absolute right-8 top-[max(calc(var(--header-h)+24px),calc(46%-205px))] z-10 2xl:top-[max(calc(var(--header-h)+24px),calc(46%-231px))] hidden aspect-[9/16] w-[230px] overflow-hidden rounded-[26px] bg-black text-left shadow-[0_40px_80px_-30px_rgba(0,0,0,0.85)] ring-1 ring-white/20 xl:block 2xl:right-12 2xl:w-[260px] [@media(max-height:760px)]:w-[190px]"
            aria-label="Shiko videon nga kantieri"
          >
            <video
              ref={cardRef}
              src={`${REEL}.mp4`}
              poster={`${REEL}.jpg`}
              muted
              loop
              playsInline
              preload="metadata"
              aria-hidden="true"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <span className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-black/45 px-2.5 py-1 text-[11px] font-semibold backdrop-blur">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-signal" />
              </span>
              Nga kantieri
            </span>
            <span className="absolute right-3 top-3 grid h-7 w-7 place-items-center rounded-full bg-black/45 text-[11px] backdrop-blur">
              <FaVolumeMute />
            </span>
            <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent p-4 pt-14">
              <span className="block text-sm font-bold">Pilota, ankera, diafragmë</span>
              <span className="mt-0.5 block text-xs text-white/65">Video reale nga punimet tona</span>
            </span>
          </motion.button>
        </div>

        {/* Shiriti i statistikave */}
        <div className="pb-6 sm:pb-8">
          <div className="strata-rule-light" aria-hidden="true" />
          <dl className="grid grid-cols-2 lg:grid-cols-4">
            {stats.map((s, k) => (
              <div
                key={k}
                style={{ animationDelay: `${0.55 + k * 0.08}s` }}
                className={`anim-fade-up py-5 pr-4 ${k % 2 === 1 ? 'border-l border-white/15 pl-4 sm:pl-6' : ''} ${
                  k > 0 ? 'lg:border-l lg:border-white/15 lg:pl-6' : ''
                } ${k >= 2 ? 'border-t border-white/15 lg:border-t-0' : ''}`}
              >
                <dt className="sr-only">{s.label}</dt>
                <dd className="text-2xl font-extrabold font-xwide tabular text-white sm:text-[28px]">{s.number}</dd>
                <dd className="mt-1 text-sm text-glacier">{s.label}</dd>
              </div>
            ))}
          </dl>
          <div className="flex justify-end border-t border-white/15 pt-4 text-[13px]">
            <a href="#sherbimet" className="flex items-center gap-2 font-semibold text-white/70 transition-colors hover:text-white">
              Eksploro <FaArrowDown className="text-[10px]" />
            </a>
          </div>
        </div>
      </div>

      <Lightbox
        items={[{ src: `${REEL}.mp4`, poster: `${REEL}.jpg`, type: 'video', title: 'Nga kantieret e VPD DRILL', meta: 'Shpim, armaturë, betonim, ankerim' }]}
        index={hapur}
        onClose={() => setHapur(null)}
        onIndex={setHapur}
      />
    </section>
  )
}
