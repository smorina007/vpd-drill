'use client'

import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { FaChevronLeft, FaChevronRight, FaMapMarkerAlt, FaSearchPlus, FaArrowDown, FaClock, FaCloudSun } from 'react-icons/fa'
import { useOferta } from '@/app/context/OfertaContext'
import { useWeather } from '@/app/context/WeatherContext'
import WeatherEffects from '@/components/WeatherEffects'
import Ora from '@/components/Ora'
import Lightbox from '@/components/ui/Lightbox'

const projects = Array.from({ length: 29 }, (_, i) => ({
  id: i + 1,
  title: 'Projekt në Prishtinë',
  image: `/images/projekte/p${i + 1}.jpeg`,
}))

const stats = [
  { number: '500m thellësi', label: 'Terene te forta' },
  { number: '55m thellësi ', label: 'Terene te buta' },
  { number: '10+', label: 'Makineri shpimi' },
  { number: '>90 %', label: 'Klientë të knaqur' },
]

const INTERVALI = 4500

export default function Hero() {
  const { openOferta } = useOferta()
  const { weather, loading: weatherLoading } = useWeather()
  const reduce = useReducedMotion()
  const [i, setI] = useState(0)
  const [pause, setPause] = useState(false)
  const [lightbox, setLightbox] = useState<number | null>(null)

  const next = useCallback(() => setI((p) => (p + 1) % projects.length), [])
  const prev = useCallback(() => setI((p) => (p - 1 + projects.length) % projects.length), [])

  useEffect(() => {
    if (pause || lightbox !== null || reduce) return
    const t = setInterval(next, INTERVALI)
    return () => clearInterval(t)
  }, [pause, lightbox, reduce, next])

  const p = projects[i]
  const motiTekst = weatherLoading ? '…' : weather ? `${weather.temp}°C, ${weather.condition}` : 'Moti N/A'

  return (
    <section id="ballina" data-shtresa="Sipërfaqja" className="relative isolate overflow-hidden bg-bedrock text-white">
      {/* Fotoja e sfondit */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/hero/casagrande.jpg"
          alt="VPD DRILL - Makineri Casagrande në punë"
          fill
          priority
          sizes="100vw"
          className="hidden object-cover object-center md:block"
        />
        <Image
          src="/images/hero/casagrande1.jpg"
          alt="VPD DRILL"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_20%] md:hidden"
        />
        <WeatherEffects condition={weather?.condition ?? null} className="z-[1]" />
        <div className="absolute inset-0 z-[2] bg-[linear-gradient(90deg,rgba(14,42,48,0.92)_0%,rgba(14,42,48,0.55)_45%,rgba(14,42,48,0.15)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 z-[2] h-1/2 bg-gradient-to-t from-bedrock via-bedrock/60 to-transparent" />
      </div>

      <div className="shell relative flex min-h-svh-safe flex-col pt-[calc(var(--header-h)+32px)]">
        <div className="grid flex-1 items-center gap-8 py-8 lg:gap-16">
          {/* Titulli */}
          <div className="max-w-3xl">
            <motion.p
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-5 flex items-center gap-3 text-[15px] font-semibold text-glacier"
            >
              <span className="h-px w-10 bg-signal" />
              VPD DRILL SHPK
            </motion.p>
            <motion.h1
              initial={reduce ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="display-xl text-white"
            >
              Themele të Sigurta
              <br />
              për të Ardhmen
            </motion.h1>
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="mt-9 flex flex-col gap-3 sm:flex-row"
            >
              <button type="button" onClick={openOferta} className="btn-signal px-7 py-3.5 text-base">
                Kërko Ofertë
              </button>
              <Link href="/projektet" className="btn-ghost-light px-7 py-3.5 text-base">
                Shiko Projektet
              </Link>
            </motion.div>
          </div>

          {/* Projektet e Fundit */}
          <motion.aside
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            aria-label="Projektet e Fundit"
            className="w-full max-w-[240px] justify-self-start lg:absolute lg:right-10 lg:top-[calc(var(--header-h)+20px)] lg:z-10 lg:w-[200px] xl:right-20 2xl:right-12"
            onMouseEnter={() => setPause(true)}
            onMouseLeave={() => setPause(false)}
            onFocus={() => setPause(true)}
            onBlur={() => setPause(false)}
          >
            <div className="overflow-hidden rounded-xl bg-bedrock/55 ring-1 ring-white/15 backdrop-blur-md">
              <div className="flex items-center justify-between px-2.5 pb-1.5 pt-2">
                <h2 className="flex items-center gap-1.5 text-[11px] font-semibold text-white">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal opacity-60" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-signal" />
                  </span>
                  Projektet e Fundit
                </h2>
                <span className="text-[10px] font-semibold tabular text-white/60">
                  {String(i + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
                </span>
              </div>
              <div className="relative mx-2.5 aspect-[16/10] overflow-hidden rounded bg-black/30">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.button
                    key={p.id}
                    type="button"
                    onClick={() => setLightbox(i)}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.5}
                    onDragEnd={(_, info) => {
                      if (info.offset.x < -50) next()
                      else if (info.offset.x > 50) prev()
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35 }}
                    data-kursor="Shiko"
                    className="group absolute inset-0 cursor-zoom-in"
                    aria-label={`Hap foton: ${p.title}`}
                  >
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      sizes="240px"
                      className="pointer-events-none select-none object-cover"
                      draggable={false}
                    />
                    <span className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    <span className="absolute bottom-1.5 left-2 flex items-center gap-1 text-[10px] font-semibold">
                      <FaMapMarkerAlt className="text-xs text-glacier" />
                      {p.title}
                    </span>
                    <span className="absolute right-2 top-2 grid h-6 w-6 place-items-center rounded-full bg-black/45 opacity-0 transition-opacity group-hover:opacity-100">
                      <FaSearchPlus className="text-xs" />
                    </span>
                  </motion.button>
                </AnimatePresence>
              </div>
              {/* Progresi deri te foto tjetër */}
              <div className="mx-2.5 mt-1.5 h-[2px] overflow-hidden rounded-full bg-white/15">
                {!pause && lightbox === null && !reduce && (
                  <motion.div
                    key={i}
                    className="h-full bg-signal"
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: INTERVALI / 1000, ease: 'linear' }}
                  />
                )}
              </div>
              <div className="flex items-center justify-between px-2.5 py-1.5">
                <div className="flex gap-1.5">
                  <button
                    type="button"
                    onClick={prev}
                    aria-label="Projekti i mëparshëm"
                    className="grid h-6 w-6 place-items-center rounded bg-white/10 transition-colors hover:bg-white/20"
                  >
                    <FaChevronLeft className="text-[10px]" />
                  </button>
                  <button
                    type="button"
                    onClick={next}
                    aria-label="Projekti tjetër"
                    className="grid h-6 w-6 place-items-center rounded bg-white/10 transition-colors hover:bg-white/20"
                  >
                    <FaChevronRight className="text-[10px]" />
                  </button>
                </div>
                <Link href="/projektet" className="text-[11px] font-semibold text-glacier hover:text-white">
                  Të gjitha
                </Link>
              </div>
            </div>
          </motion.aside>
        </div>

        {/* Shiriti i statistikave — si një log shpimi */}
        <div className="pb-6 sm:pb-8">
          <div className="strata-rule-light" aria-hidden="true" />
          <dl className="grid grid-cols-2 lg:grid-cols-4">
            {stats.map((s, k) => (
              <div
                key={k}
                className={`py-5 pr-4 ${k % 2 === 1 ? 'pl-4 sm:pl-6' : ''} ${k > 0 ? 'lg:border-l lg:border-white/15 lg:pl-6' : ''} ${
                  k === 1 ? 'border-l border-white/15' : ''
                } ${k === 3 ? 'border-l border-white/15' : ''} ${k >= 2 ? 'border-t border-white/15 lg:border-t-0' : ''}`}
              >
                <dt className="sr-only">{s.label}</dt>
                <dd className="text-2xl font-extrabold font-xwide tabular text-white sm:text-[28px]">{s.number}</dd>
                <dd className="mt-1 text-sm text-glacier">{s.label}</dd>
              </div>
            ))}
          </dl>
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/15 pt-4 text-[13px] text-white/60">
            <div className="flex items-center gap-5">
              <span className="flex items-center gap-2">
                <FaClock className="text-glacier" />
                <Ora />
              </span>
              <span className="flex items-center gap-2">
                <FaCloudSun className="text-glacier" />
                <span className="tabular">{motiTekst}</span>
              </span>
            </div>
            <a href="#sherbimet" className="hidden items-center gap-2 font-semibold text-white/70 transition-colors hover:text-white sm:flex">
              Eksploro <FaArrowDown className="text-[10px]" />
            </a>
          </div>
        </div>
      </div>

      <Lightbox
        items={projects.map((x) => ({ src: x.image, title: x.title }))}
        index={lightbox}
        onClose={() => setLightbox(null)}
        onIndex={(n) => {
          setLightbox(n)
          setI(n)
        }}
      />
    </section>
  )
}
