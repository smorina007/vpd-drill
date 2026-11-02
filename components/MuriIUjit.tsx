'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { FaPlay, FaArrowRight, FaTint } from 'react-icons/fa'
import VideoNePamje from './ui/VideoNePamje'
import Lightbox from './ui/Lightbox'
import { linkuIMedias } from '@/lib/galeriaMedia'

const KLIPET = Array.from({ length: 10 }, (_, i) => ({ src: `/videos/puse/u${i + 1}.mp4`, poster: `/videos/puse/u${i + 1}.jpg` }))

/** Kolonat e murit: secila lëviz me shpejtësi dhe drejtim tjetër */
const KOLONAT = [
  { klipet: [0, 4, 7], kohezgjatja: 38, lart: true, klasa: '' },
  { klipet: [2, 5, 8, 1], kohezgjatja: 46, lart: false, klasa: 'mt-[-30%]' },
  { klipet: [3, 6, 9], kohezgjatja: 34, lart: true, klasa: 'hidden sm:block mt-[-12%]' },
]

const FILMI = {
  src: '/videos/puse/kolazh-puse.mp4',
  poster: '/videos/puse/kolazh-puse.jpg',
  type: 'video' as const,
  title: 'Uji nga thellësia',
  meta: 'Shpime pusesh uji · VPD DRILL',
  shareUrl: linkuIMedias('kolazh-puse'),
}

/** Mur video me klipe nga shpimet e puseve, me filmin e plotë në lightbox. */
export default function MuriIUjit() {
  const reduce = useReducedMotion()
  const [hapur, setHapur] = useState<number | null>(null)

  return (
    <section id="uji-nga-thellesia" data-shtresa="Uji" className="relative isolate overflow-hidden bg-bedrock py-20 text-white sm:py-28">
      <div className="pointer-events-none absolute -left-40 top-1/3 -z-10 h-[520px] w-[520px] rounded-full bg-glacier/15 blur-[140px]" aria-hidden="true" />
      <div className="shell grid items-center gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
        <div>
          <p className="flex items-center gap-3 text-sm font-semibold text-glacier">
            <span className="h-px w-10 bg-signal" /> Shpime pusesh uji
          </p>
          <h2 className="display-lg mt-4 text-white">
            Momenti kur
            <br />
            <span className="bg-gradient-to-r from-glacier via-white to-glacier bg-clip-text text-transparent">del uji</span>
          </h2>
          <p className="mt-5 max-w-[50ch] text-[17px] leading-relaxed text-white/70">
            Pas orësh shpimi në shkëmb, uji shpërthen nga thellësia. Këto janë pamje reale nga puset që kemi hapur për shtëpi,
            fabrika dhe fusha bujqësore anembanë Kosovës.
          </p>

          <ul className="mt-8 flex flex-wrap gap-2.5 text-sm font-semibold">
            {['Deri 500 m thellësi', 'Shkëmb dhe terrene të buta', 'Testim i prurjes'].map((t) => (
              <li key={t} className="flex items-center gap-2 rounded-full bg-white/[0.07] px-3.5 py-2 ring-1 ring-white/10">
                <FaTint className="text-[11px] text-glacier" /> {t}
              </li>
            ))}
          </ul>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              type="button"
              onClick={() => setHapur(0)}
              data-kursor="Luaj"
              className="group flex items-center gap-4 rounded-full bg-white py-2 pl-2 pr-6 text-left text-bedrock shadow-[0_20px_50px_-20px_rgba(140,205,220,0.6)] transition-transform hover:-translate-y-0.5"
            >
              <span className="relative grid h-12 w-12 place-items-center rounded-full bg-signal">
                <span className="absolute inset-0 animate-ping rounded-full bg-signal/50" />
                <FaPlay className="relative pl-0.5 text-sm" />
              </span>
              <span>
                <span className="block text-[15px] font-bold">Shiko filmin</span>
                <span className="block text-xs text-slate-mute">37 sekonda · nga kantieret</span>
              </span>
            </button>
            <Link href="/sherbimet/shpime-puse" className="btn-ghost-light px-6 py-3.5">
              Shpime pusesh <FaArrowRight className="text-xs" />
            </Link>
          </div>
        </div>

        {/* Muri i videove */}
        <div className="relative h-[560px] sm:h-[640px] lg:h-[700px]" aria-hidden="true">
          <div className="absolute inset-0 [mask-image:linear-gradient(180deg,transparent,black_14%,black_86%,transparent)]">
            <div className="grid h-full grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 [transform:rotate(-4deg)_scale(1.12)]">
              {KOLONAT.map((k, ki) => (
                <div key={ki} className={`relative overflow-hidden ${k.klasa}`}>
                  <div
                    className={`flex flex-col gap-3 sm:gap-4 ${reduce ? '' : 'muri-leviz'}`}
                    style={{ animationDuration: `${k.kohezgjatja}s`, animationDirection: k.lart ? 'normal' : 'reverse' }}
                  >
                    {[...k.klipet, ...k.klipet].map((n, i) => (
                      <button
                        key={i}
                        type="button"
                        tabIndex={-1}
                        onClick={() => setHapur(0)}
                        data-kursor="Luaj"
                        className="group relative aspect-[9/16] w-full shrink-0 overflow-hidden rounded-2xl bg-white/5 ring-1 ring-white/10"
                      >
                        <VideoNePamje
                          src={KLIPET[n].src}
                          poster={KLIPET[n].poster}
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <span className="absolute inset-0 bg-gradient-to-t from-bedrock/50 via-transparent to-transparent" />
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-bedrock/80 px-4 py-2 text-xs font-semibold text-white/85 ring-1 ring-white/15 backdrop-blur"
          >
            <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-signal align-middle" />
            Pamje reale nga puset tona
          </motion.div>
        </div>
      </div>

      <Lightbox items={[FILMI]} index={hapur} onClose={() => setHapur(null)} onIndex={setHapur} />
    </section>
  )
}
