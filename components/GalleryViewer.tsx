'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import Lightbox from './ui/Lightbox'

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

/** Galeria e plotë e fotove (hapet nga menuja "Mjete" → Galeria). */
export default function GalleryViewer() {
  const [filter, setFilter] = useState('Të gjitha')
  const [lightbox, setLightbox] = useState<number | null>(null)
  const categories = ['Të gjitha', ...Array.from(new Set(fotot.map((f) => f.category)))]
  const filteredFotos = useMemo(() => (filter === 'Të gjitha' ? fotot : fotot.filter((f) => f.category === filter)), [filter])

  return (
    <div>
      <p className="mb-5 text-[15px] text-slate-ink">Shfletoni të gjitha projektet tona në një galeri të bukur</p>
      <div className="no-scrollbar -mx-5 mb-6 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:flex-wrap sm:px-0">
        {categories.map((cat) => {
          const count = cat === 'Të gjitha' ? fotot.length : fotot.filter((f) => f.category === cat).length
          const on = filter === cat
          return (
            <button
              key={cat}
              type="button"
              aria-pressed={on}
              onClick={() => setFilter(cat)}
              className={`flex shrink-0 items-center gap-2 rounded-md border px-3.5 py-2 text-sm font-semibold transition-colors ${
                on ? 'border-bedrock bg-bedrock text-white' : 'border-stone-line bg-white text-bedrock hover:border-brand'
              }`}
            >
              {cat}
              <span className={`tabular text-xs ${on ? 'text-white/60' : 'text-slate-mute'}`}>{count}</span>
            </button>
          )
        })}
      </div>

      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {filteredFotos.map((foto, index) => (
          <li key={foto.id}>
            <button
              type="button"
              onClick={() => setLightbox(index)}
              data-kursor="Shiko"
              className="group relative block aspect-[4/3] w-full overflow-hidden rounded-md bg-stone-2"
              aria-label={`Hap foton: ${foto.titulli ?? foto.alt}`}
            >
              <Image
                src={foto.src}
                alt={foto.alt}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
              />
              <span className="absolute inset-0 flex items-end bg-gradient-to-t from-black/70 via-transparent to-transparent p-3 text-left opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                <span>
                  <span className="block text-sm font-semibold text-white">{foto.titulli}</span>
                  <span className="block text-xs text-white/75">
                    {foto.data}, {foto.lokacioni}
                  </span>
                </span>
              </span>
            </button>
          </li>
        ))}
      </ul>

      <Lightbox
        items={filteredFotos.map((f) => ({
          src: f.src,
          title: f.titulli ?? f.alt,
          meta: `${f.data ?? ''}${f.lokacioni ? `, ${f.lokacioni}` : ''} — ${f.category}`,
        }))}
        index={lightbox}
        onClose={() => setLightbox(null)}
        onIndex={setLightbox}
      />
    </div>
  )
}
