'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

const HAPAT = [
  {
    nr: '01',
    titulli: 'Shpimi',
    teksti: 'Makinat tona të shpimit hapin pilotat deri në thellësinë që kërkon projekti statik — në terrene të buta dhe shkëmbore.',
    video: '/videos/procesi/1-shpimi',
  },
  {
    nr: '02',
    titulli: 'Prodhimi i armaturës',
    teksti: 'Kafazët e armaturës i prodhojmë vetë, me makineri automatike, sipas diametrit dhe gjatësisë së secilës pilotë.',
    video: '/videos/procesi/2-armatura',
  },
  {
    nr: '03',
    titulli: 'Vendosja e armaturës',
    teksti: 'Kafazi ngrihet me vinç dhe ulet me kujdes në shpim, i qendërzuar për mbulesën e duhur të betonit.',
    video: '/videos/procesi/3-vendosja',
  },
  {
    nr: '04',
    titulli: 'Betonimi',
    teksti: 'Betoni pompohet në shpim deri lart, që pilota të mbushet plotësisht dhe të marrë formën e saj përfundimtare.',
    video: '/videos/procesi/4-betonimi',
  },
  {
    nr: '05',
    titulli: 'Gërmimi dhe ankerimi',
    teksti: 'Kur muri i pilotave është gati, gërmojmë gropën shtresë pas shtrese dhe e stabilizojmë me ankera.',
    video: '/videos/procesi/5-ankerimi',
  },
  {
    nr: '06',
    titulli: 'Gropa e përfunduar',
    teksti: 'Një gropë themeli e sigurt dhe e thatë, gati për bodrume, parkingje nëntokësore dhe themelet e objektit.',
    video: '/videos/procesi/6-gropa',
  },
]

/** Video portret në formë "ekrani", luan vetëm kur është në pamje. */
function Klip({ src, aktiv = true, className = '' }: { src: string; aktiv?: boolean; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null)
  const reduce = useReducedMotion()
  useEffect(() => {
    const v = ref.current
    if (!v || reduce) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && aktiv) v.play().catch(() => {})
        else v.pause()
      },
      { threshold: 0.35 },
    )
    io.observe(v)
    return () => io.disconnect()
  }, [aktiv, reduce])
  return (
    <video
      ref={ref}
      src={`${src}.mp4`}
      poster={`${src}.jpg`}
      muted
      loop
      playsInline
      preload="none"
      aria-hidden="true"
      className={`h-full w-full object-cover ${className}`}
    />
  )
}

/**
 * "Si punojmë" — procesi i një gropë themeli me pilota dhe ankera, hap pas hapi.
 * Desktop: teksti rrëshqet, videoja qëndron (sticky) dhe ndërrohet sipas hapit.
 * Celular: çdo hap ka videon e vet.
 */
export default function SiPunojme() {
  const [aktiv, setAktiv] = useState(0)
  const hapRefs = useRef<(HTMLLIElement | null)[]>([])

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setAktiv(Number((e.target as HTMLElement).dataset.i))
        })
      },
      { rootMargin: '-45% 0px -45% 0px' },
    )
    hapRefs.current.forEach((el) => el && io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <section id="si-punojme" data-shtresa="Procesi" className="relative bg-bedrock py-20 text-white sm:py-28">
      <div className="shell">
        <div className="max-w-2xl">
          <p className="flex items-center gap-3 text-sm font-semibold text-glacier">
            <span className="h-px w-10 bg-signal" /> Procesi ynë
          </p>
          <h2 className="display-lg mt-4 text-white">Si punojmë — nga shpimi deri te gropa e gatshme</h2>
          <p className="mt-5 text-[17px] leading-relaxed text-white/70">
            Gjashtë hapa, të filmuar në kantieret tona. Çdo fazë kryhet nga ekipi dhe makineritë e VPD DRILL.
          </p>
        </div>

        <div className="mt-14 grid gap-10 lg:mt-20 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-20">
          <ol className="relative">
            {/* Vija e progresit */}
            <span className="absolute bottom-0 left-[19px] top-0 hidden w-px bg-white/15 lg:block" aria-hidden="true" />
            <motion.span
              className="absolute left-[19px] top-0 hidden w-px origin-top bg-signal lg:block"
              animate={{ height: `${((aktiv + 1) / HAPAT.length) * 100}%` }}
              transition={{ type: 'spring', stiffness: 120, damping: 24 }}
              aria-hidden="true"
            />
            {HAPAT.map((h, i) => {
              const on = i === aktiv
              return (
                <li
                  key={h.nr}
                  ref={(el) => {
                    hapRefs.current[i] = el
                  }}
                  data-i={i}
                  className="relative pb-12 lg:flex lg:min-h-[58vh] lg:items-center lg:pb-0 lg:pl-16"
                >
                  <span
                    className={`absolute left-0 top-1 hidden h-10 w-10 place-items-center rounded-full text-sm font-bold tabular ring-1 transition-all duration-500 lg:grid lg:top-1/2 lg:-translate-y-1/2 ${
                      on ? 'bg-signal text-bedrock ring-signal' : 'bg-bedrock text-white/60 ring-white/25'
                    }`}
                  >
                    {h.nr}
                  </span>
                  <div className={`transition-opacity duration-500 lg:max-w-md ${on ? 'lg:opacity-100' : 'lg:opacity-35'}`}>
                    <p className="text-sm font-bold tabular text-signal lg:hidden">{h.nr}</p>
                    <h3 className="mt-1 text-2xl font-extrabold text-white sm:text-3xl">{h.titulli}</h3>
                    <p className="mt-3 text-[17px] leading-relaxed text-white/70">{h.teksti}</p>
                    {/* Videoja e hapit — vetëm në celular */}
                    <div className="mt-6 aspect-[9/14] w-full max-w-sm overflow-hidden rounded-2xl bg-black ring-1 ring-white/10 lg:hidden">
                      <Klip src={h.video} />
                    </div>
                  </div>
                </li>
              )
            })}
          </ol>

          {/* Ekrani "sticky" në desktop */}
          <div className="hidden lg:block">
            <div className="sticky top-[calc(var(--header-h)+40px)]">
              <div className="relative aspect-[9/16] overflow-hidden rounded-[28px] bg-black shadow-[0_40px_80px_-30px_rgba(0,0,0,0.8)] ring-1 ring-white/15">
                <AnimatePresence initial={false}>
                  <motion.div
                    key={aktiv}
                    className="absolute inset-0"
                    initial={{ opacity: 0, scale: 1.06 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Klip src={HAPAT[aktiv].video} />
                  </motion.div>
                </AnimatePresence>
                <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-5 pt-16">
                  <p className="text-xs font-bold tabular text-signal">
                    {HAPAT[aktiv].nr} / {String(HAPAT.length).padStart(2, '0')}
                  </p>
                  <p className="mt-1 text-lg font-bold">{HAPAT[aktiv].titulli}</p>
                </div>
              </div>
              <div className="mt-4 flex gap-1.5" aria-hidden="true">
                {HAPAT.map((h, i) => (
                  <span key={h.nr} className={`h-1 flex-1 rounded-full transition-colors duration-500 ${i <= aktiv ? 'bg-signal' : 'bg-white/15'}`} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
