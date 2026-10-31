'use client'

import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Lightbox from './ui/Lightbox'
import MediaTile from './ui/MediaTile'
import { mediaTeReja, type MediaItem } from '@/lib/galeriaMedia'

interface Foto {
  id: number
  src: string
  alt: string
  category: string
  data?: string
  titulli?: string
  lokacioni?: string
}

const fotot: Foto[] = [
  {
    id: 1,
    src: '/images/galeria/G1.jpeg',
    alt: 'Pilota',
    category: 'Shpime',
    data: '16.12.2025',
    titulli: 'Pilota',
    lokacioni: 'Prishtinë'
  },
  {
    id: 2,
    src: '/images/galeria/G2.jpeg',
    alt: 'Gërmim me diafragmë',
    category: 'Gërmim Diafragmë',
    data: '10.01.2025',
    titulli: 'Gërmim me diafragmë',
    lokacioni: 'Prishtine'
  },
  {
    id: 3,
    src: '/images/galeria/G3.jpeg',
    alt: 'Pilota për objekt dhe ankerim',
    category: 'Pilota dhe ankera',
    data: '20.11.2024',
    titulli: 'Pilota për objekt dhe ankerim',
    lokacioni: 'Prishtinë'
  },
  {
    id: 4,
    src: '/images/galeria/G4.jpeg',
    alt: 'Casagrande B175, pilota',
    category: 'Shpime',
    data: '05.12.2024',
    titulli: 'Casagrande B175, pilota',
    lokacioni: 'Prishtinë'
  },
  {
    id: 5,
    src: '/images/galeria/G5.jpeg',
    alt: 'Pilota',
    category: 'Shpime',
    data: '22.01.2026',
    titulli: 'Pilota',
    lokacioni: 'Malisheve'
  },
  {
    id: 6,
    src: '/images/galeria/G6.jpeg',
    alt: 'Pilota',
    category: 'Shpime',
    data: '30.01.2026',
    titulli: 'Pilota',
    lokacioni: 'Malisheve'
  },
  {
    id: 7,
    src: '/images/galeria/G7.jpeg',
    alt: 'Pilota dhe vendosje te konstruksioneve',
    category: 'Shpime',
    data: '30.01.2026',
    titulli: 'Pilota dhe konstruksione',
    lokacioni: 'Prishtine'
  },
  {
    id: 8,
    src: '/images/galeria/G10.jpeg',
    alt: 'Soilmec ne detyrë',
    category: 'Shpime',
    data: '30.01.2026',
    titulli: 'Soilmec në detyrë',
    lokacioni: 'Prishtine'
  },
  {
    id: 9,
    src: '/images/galeria/G18.jpeg',
    alt: 'Soilmec ne detyrë',
    category: 'Shpime',
    data: '30.01.2026',
    titulli: 'Soilmec në detyrë',
    lokacioni: 'Prishtine'
  },
  {
    id: 10,
    src: '/images/galeria/G11.jpeg',
    alt: 'Pilota',
    category: 'Shpime',
    data: '30.01.2026',
    titulli: 'Pilota',
    lokacioni: 'Prishtinë'
  },
  {
    id: 11,
    src: '/images/galeria/G12.jpeg',
    alt: 'Pilota',
    category: 'Shpime',
    data: '30.01.2026',
    titulli: 'Pilota',
    lokacioni: 'Prishtinë'
  },
  {
    id: 12,
    src: '/images/galeria/G13.jpeg',
    alt: 'Pilota',
    category: 'Shpime',
    data: '30.01.2026',
    titulli: 'Pilota',
    lokacioni: 'Prishtinë'
  },
  {
    id: 13,
    src: '/images/galeria/G14.jpeg',
    alt: 'Pilota',
    category: 'Shpime',
    data: '30.01.2026',
    titulli: 'Pilota',
    lokacioni: 'Prishtinë'
  },
  {
    id: 14,
    src: '/images/galeria/G15.jpeg',
    alt: 'Pilota',
    category: 'Shpime',
    data: '30.01.2026',
    titulli: 'Pilota',
    lokacioni: 'Prishtinë'
  },
  {
    id: 15,
    src: '/images/galeria/G16.jpeg',
    alt: 'Pilota',
    category: 'Shpime',
    data: '30.01.2026',
    titulli: 'Pilota',
    lokacioni: 'Prishtinë'
  },
  {
    id: 16,
    src: '/images/galeria/G17.jpeg',
    alt: 'Pilota',
    category: 'Shpime',
    data: '30.01.2026',
    titulli: 'Pilota',
    lokacioni: 'Prishtinë'
  },
  {
    id: 17,
    src: '/images/galeria/G19.jpeg',
    alt: 'Pilota',
    category: 'Shpime',
    data: '30.01.2026',
    titulli: 'Pilota',
    lokacioni: 'Prishtinë'
  },
  {
    id: 18,
    src: '/images/galeria/G20.jpeg',
    alt: 'Pilota',
    category: 'Shpime',
    data: '30.01.2026',
    titulli: 'Pilota',
    lokacioni: 'Prishtinë'
  },
  {
   id: 19,
    src: '/images/galeria/G21.jpeg',
    alt: 'Gërmim me diafragmë',
    category: 'Gërmim Diafragmë',
    data: '30.01.2026',
    titulli: 'Diafragmë',
    lokacioni: 'Prishtinë'
    },
  {
   id: 20,
    src: '/images/galeria/p1.jpeg',
    alt: 'Shpime',
    category: 'Shpime',
    data: '30.01.2026',
    titulli: 'Shpime',
    lokacioni: 'Prishtinë'
      },
  {
   id: 21,
    src: '/images/galeria/p2.jpeg',
    alt: 'Shpime',
    category: 'Shpime',
    data: '30.01.2026',
    titulli: 'Shpime',
    lokacioni: 'Prishtinë'
      },
  {
   id: 22,
    src: '/images/galeria/p3.jpeg',
    alt: 'Shpime',
    category: 'Shpime',
    data: '30.01.2026',
    titulli: 'Shpime',
    lokacioni: 'Prishtinë'
      },
  {
   id: 23,
    src: '/images/galeria/p4.jpeg',
    alt: 'Shpime',
    category: 'Shpime',
    data: '30.01.2026',
    titulli: 'Shpime',
    lokacioni: 'Prishtinë'
      },
  {
   id: 24,
    src: '/images/galeria/p5.jpeg',
    alt: 'Shpime',
    category: 'Shpime',
    data: '30.01.2026',
    titulli: 'Shpime',
    lokacioni: 'Prishtinë'
      },
  {
   id: 25,
    src: '/images/galeria/p6.jpeg',
    alt: 'Shpime',
    category: 'Shpime',
    data: '30.01.2026',
    titulli: 'Shpime',
    lokacioni: 'Prishtinë'
      },
  {
   id: 26,
    src: '/images/galeria/p7.jpeg',
    alt: 'Shpime',
    category: 'Shpime',
    data: '30.01.2026',
    titulli: 'Shpime',
    lokacioni: 'Prishtinë'
      },
  {
   id: 27,
    src: '/images/galeria/p8.jpeg',
    alt: 'Shpime',
    category: 'Shpime',
    data: '30.01.2026',
    titulli: 'Shpime',
    lokacioni: 'Prishtinë'
      },
  {
   id: 28,
    src: '/images/galeria/p9.jpeg',
    alt: 'Shpime',
    category: 'Shpime',
    data: '30.01.2026',
    titulli: 'Shpime',
    lokacioni: 'Prishtinë'
      },
  {
   id: 29,
    src: '/images/galeria/p10.jpeg',
    alt: 'Shpime',
    category: 'Shpime',
    data: '30.01.2026',
    titulli: 'Shpime',
    lokacioni: 'Prishtinë'
     },
  {
   id: 30,
    src: '/images/galeria/p11.jpeg',
    alt: 'Shpime',
    category: 'Pilota dhe ankera',
    data: '30.01.2026',
    titulli: 'Shpime',
    lokacioni: 'Prishtinë'
      },
  {
   id: 31,
    src: '/images/galeria/p12.jpeg',
    alt: 'Shpime',
    category: 'Pilota dhe ankera',
    data: '30.01.2026',
    titulli: 'Shpime',
    lokacioni: 'Prishtinë'
      },
  {
   id: 32,
    src: '/images/galeria/p13.jpeg',
    alt: 'Shpime',
    category: 'Pilota dhe ankera',
    data: '30.01.2026',
    titulli: 'Shpime',
    lokacioni: 'Prishtinë'
      },
  {
   id: 33,
    src: '/images/galeria/p14.jpeg',
    alt: 'Shpime',
    category: 'Pilota dhe ankera',
    data: '30.01.2026',
    titulli: 'Shpime',
    lokacioni: 'Prishtinë'
      },
  {
   id: 34,
    src: '/images/galeria/p15.jpeg',
    alt: 'Shpime',
    category: 'Pilota dhe ankera',
    data: '30.01.2026',
    titulli: 'Shpime',
    lokacioni: 'Prishtinë'
      },
  {
   id: 35,
    src: '/images/galeria/p16.jpeg',
    alt: 'Shpime',
    category: 'Pilota dhe ankera',
    data: '30.01.2026',
    titulli: 'Shpime',
    lokacioni: 'Prishtinë'
      },
  {
   id: 36,
    src: '/images/galeria/p17.jpeg',
    alt: 'Shpime',
    category: 'Pilota dhe ankera',
    data: '30.01.2026',
    titulli: 'Shpime',
    lokacioni: 'Prishtinë'
      },
  {
   id: 37,
    src: '/images/galeria/p18.jpeg',
    alt: 'Shpime',
    category: 'Pilota dhe ankera',
    data: '30.01.2026',
    titulli: 'Shpime',
    lokacioni: 'Prishtinë'
      },
  {
   id: 38,
    src: '/images/galeria/p19.jpeg',
    alt: 'Shpime',
    category: 'Pilota dhe ankera',
    data: '30.01.2026',
    titulli: 'Shpime',
    lokacioni: 'Prishtinë'
      },
  {
   id: 39,
    src: '/images/galeria/p20.jpeg',
    alt: 'Shpime',
    category: 'Pilota dhe ankera',
    data: '30.01.2026',
    titulli: 'Shpime',
    lokacioni: 'Prishtinë'
      },
  {
   id: 40,
    src: '/images/galeria/p21.jpeg',
    alt: 'Shpime',
    category: 'Pilota dhe ankera',
    data: '30.01.2026',
    titulli: 'Shpime',
    lokacioni: 'Prishtinë'
       },
  {
   id: 41,
    src: '/images/galeria/p22.jpeg',
    alt: 'Shpime',
    category: 'Pilota dhe ankera',
    data: '30.01.2026',
    titulli: 'Shpime',
    lokacioni: 'Prishtinë'
       },
  {
   id: 42,
    src: '/images/galeria/p23.jpeg',
    alt: 'Shpime',
    category: 'Pilota dhe ankera',
    data: '30.01.2026',
    titulli: 'Shpime',
    lokacioni: 'Prishtinë'
       },
  {
   id: 43,
    src: '/images/galeria/p24.jpeg',
    alt: 'Shpime',
    category: 'Pilota dhe ankera',
    data: '30.01.2026',
    titulli: 'Shpime',
    lokacioni: 'Prishtinë'
       },
  {
   id: 44,
    src: '/images/galeria/p25.jpeg',
    alt: 'Shpime',
    category: 'Pilota dhe ankera',
    data: '30.01.2026',
    titulli: 'Shpime',
    lokacioni: 'Prishtinë'
       },
  {
   id: 45,
    src: '/images/galeria/p26.jpeg',
    alt: 'Shpime',
    category: 'Pilota dhe ankera',
    data: '30.01.2026',
    titulli: 'Shpime',
    lokacioni: 'Prishtinë'
       },
  {
   id: 46,
    src: '/images/galeria/p27.jpeg',
    alt: 'Shpime',
    category: 'Pilota dhe ankera',
    data: '30.01.2026',
    titulli: 'Shpime',
    lokacioni: 'Prishtinë'
       },
  {
   id: 47,
    src: '/images/galeria/p28.jpeg',
    alt: 'Shpime',
    category: 'Pilota dhe ankera',
    data: '30.01.2026',
    titulli: 'Shpime',
    lokacioni: 'Prishtinë'
       },
  {
   id: 48,
    src: '/images/galeria/p29.jpeg',
    alt: 'Shpime',
    category: 'Pilota dhe ankera',
    data: '30.01.2026',
    titulli: 'Shpime',
    lokacioni: 'Prishtinë'
  }
  
]

const TE_GJITHA = 'Të gjitha'
const VIDEO = 'Video'

const media: MediaItem[] = [
  ...mediaTeReja,
  ...fotot.map((f) => ({
    id: `g${f.id}`,
    lloji: 'foto' as const,
    src: f.src,
    titulli: f.titulli ?? f.alt,
    kategoria: f.category,
    lokacioni: f.lokacioni,
    data: f.data,
  })),
]

/** Galeria e plotë e fotove dhe videove (hapet nga menuja "Mjete" → Galeria). */
export default function GalleryViewer() {
  const [filter, setFilter] = useState(TE_GJITHA)
  const [lightbox, setLightbox] = useState<number | null>(null)
  const nrVideo = media.filter((m) => m.lloji === 'video').length
  const categories = [TE_GJITHA, ...Array.from(new Set(media.map((f) => f.kategoria))), ...(nrVideo ? [VIDEO] : [])]
  const filtered = useMemo(
    () =>
      filter === TE_GJITHA ? media : filter === VIDEO ? media.filter((m) => m.lloji === 'video') : media.filter((f) => f.kategoria === filter),
    [filter],
  )

  return (
    <div>
      <p className="mb-5 text-[15px] text-slate-ink">Shfletoni të gjitha projektet tona — foto dhe video nga kantieri</p>
      <div className="no-scrollbar -mx-5 mb-6 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:flex-wrap sm:px-0">
        {categories.map((cat) => {
          const count = cat === TE_GJITHA ? media.length : cat === VIDEO ? nrVideo : media.filter((f) => f.kategoria === cat).length
          const on = filter === cat
          return (
            <button
              key={cat}
              type="button"
              aria-pressed={on}
              onClick={() => setFilter(cat)}
              className={`relative flex shrink-0 items-center gap-2 rounded-md border px-3.5 py-2 text-sm font-semibold transition-colors ${
                on ? 'border-bedrock text-white' : 'border-stone-line bg-white text-bedrock hover:border-brand'
              }`}
            >
              {on && (
                <motion.span
                  layoutId="viewer-filter"
                  className="absolute inset-0 rounded-[5px] bg-bedrock"
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                />
              )}
              <span className="relative">{cat}</span>
              <span className={`relative tabular text-xs ${on ? 'text-white/60' : 'text-slate-mute'}`}>{count}</span>
            </button>
          )
        })}
      </div>

      {/* Rrjetë "masonry": fotot vertikale zënë dy rreshta */}
      <motion.ul layout className="grid grid-flow-dense auto-rows-[120px] grid-cols-2 gap-3 sm:auto-rows-[140px] sm:grid-cols-3 lg:grid-cols-4">
        <AnimatePresence mode="popLayout">
          {filtered.map((m, index) => (
            <motion.li
              key={m.id}
              layout
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className={m.vertikale ? 'row-span-2' : ''}
            >
              <MediaTile
                src={m.src}
                poster={m.poster}
                type={m.lloji}
                title={m.titulli}
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="h-full"
                fill
                delay={(index % 4) * 0.06}
                onOpen={() => setLightbox(index)}
              >
                <span className="absolute inset-x-0 bottom-0 p-3 text-left opacity-0 transition-all duration-500 group-hover:opacity-100 group-focus-visible:opacity-100">
                  <span className="block text-sm font-semibold text-white">{m.titulli}</span>
                  <span className="block text-xs text-white/75">{[m.kategoria, m.lokacioni, m.data].filter(Boolean).join(' · ')}</span>
                </span>
              </MediaTile>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>

      <Lightbox
        items={filtered.map((m) => ({
          src: m.src,
          type: m.lloji,
          poster: m.poster,
          title: m.titulli,
          meta: [m.kategoria, m.lokacioni, m.data].filter(Boolean).join(' · '),
        }))}
        index={lightbox}
        onClose={() => setLightbox(null)}
        onIndex={setLightbox}
      />
    </div>
  )
}
