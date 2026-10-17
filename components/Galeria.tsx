'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FaArrowRight, FaFacebookF, FaTwitter, FaLinkedinIn, FaMapMarkerAlt } from 'react-icons/fa'
import HartaProjekteve from './HartaProjekteve'
import SectionHeading from './ui/SectionHeading'
import Lightbox from './ui/Lightbox'

const projektet = [
  {
    id: 1,
    data: '16.12.2025',
    titulli: 'Pilota',
    kategoria: 'Shpime',
    lokacioni: 'Prishtinë',
    foto: '/images/galeria/G1.jpeg'
  },
  {
    id: 2,
    data: '10.01.2025',
    titulli: 'Gërmim me diafragmë',
    kategoria: 'Gërmim Diafragmë',
    lokacioni: 'Vushtrri',
    foto: '/images/galeria/G2.jpeg'
  },
  {
    id: 3,
    data: '20.11.2024',
    titulli: 'Pilota për objekt dhe ankerim',
    kategoria: 'Pilota dhe ankera',
    lokacioni: 'Prishtinë',
    foto: '/images/galeria/G3.jpeg'
  },
  {
    id: 4,
    data: '05.12.2024',
    titulli: 'Casagrande B175, pilota',
    kategoria: 'Shpime',
    lokacioni: 'Gjilan',
    foto: '/images/galeria/G4.jpeg'
  },
  {
    id: 5,
    data: '22.01.2026',
    titulli: 'Pilota',
    kategoria: 'Shpime',
    lokacioni: 'Prizren',
    foto: '/images/galeria/G5.jpeg'
  },
  {
    id: 6,
    data: '30.01.2026',
    titulli: 'Pilota',
    kategoria: 'Shpime',
    lokacioni: 'Prishtinë',
    foto: '/images/galeria/G6.jpeg'
  },
  {
    id: 7,
    data: '30.01.2026',
    titulli: 'Pilota dhe vendosje te konstruksioneve te prodhuara nga VPD DRILL',
    kategoria: 'Shpime',
    lokacioni: 'Suharekë',
    foto: '/images/galeria/G7.jpeg'
  },
  {
    id: 8,
    data: '30.01.2026',
    titulli: 'Soilmec ne detyrë',
    kategoria: 'Shpime',
    lokacioni: 'Klinë',
    foto: '/images/galeria/G10.jpeg'
  },
  {
    id: 9,
    data: '30.01.2026',
    titulli: 'Soilmec ne detyrë',
    kategoria: 'Shpime',
    lokacioni: 'Prishtinë',
    foto: '/images/galeria/G18.jpeg'
  },
   {
    id: 10,
    data: '30.06.2026',
    titulli: 'Casagrande Diafragmë',
    kategoria: 'Gërmim Diafragmë',
    lokacioni: 'Malishevë',
    foto: '/images/galeria/G21.jpeg'
      },
  {
    id: 11,
    data: '20.11.2024',
    titulli: 'Pilota për objekt dhe ankerim',
    kategoria: 'Pilota dhe ankera',
    lokacioni: 'Gjilan',
    foto: '/images/galeria/p1.jpeg'
        },
  {
    id: 12,
    data: '20.11.2024',
    titulli: 'Pilota për objekt dhe ankerim',
    kategoria: 'Pilota dhe ankera',
    lokacioni: 'Prishtinë',
    foto: '/images/galeria/p2.jpeg'
        },
  {
    id: 13,
    data: '20.11.2024',
    titulli: 'Pilota për objekt dhe ankerim',
    kategoria: 'Pilota dhe ankera',
    lokacioni: 'Prishtinë',
    foto: '/images/galeria/p3.jpeg'
        },
  {
    id: 14,
    data: '20.11.2024',
    titulli: 'Pilota për objekt dhe ankerim',
    kategoria: 'Pilota dhe ankera',
    lokacioni: 'Vushtrri',
    foto: '/images/galeria/p4.jpeg'
        },
  {
    id: 15,
    data: '20.11.2024',
    titulli: 'Pilota për objekt dhe ankerim',
    kategoria: 'Pilota dhe ankera',
    lokacioni: 'Prishtinë',
    foto: '/images/galeria/p5.jpeg'
        },
  {
    id: 16,
    data: '20.11.2024',
    titulli: 'Pilota për objekt dhe ankerim',
    kategoria: 'Pilota dhe ankera',
    lokacioni: 'Gjilan',
    foto: '/images/galeria/p6.jpeg'
        },
  {
    id: 17,
    data: '20.11.2024',
    titulli: 'Pilota për objekt dhe ankerim',
    kategoria: 'Pilota dhe ankera',
    lokacioni: 'Prizren',
    foto: '/images/galeria/p7.jpeg'
        },
  {
    id: 18,
    data: '20.11.2024',
    titulli: 'Pilota për objekt dhe ankerim',
    kategoria: 'Pilota dhe ankera',
    lokacioni: 'Prishtinë',
    foto: '/images/galeria/p8.jpeg'
        },
  {
    id: 19,
    data: '20.11.2024',
    titulli: 'Pilota për objekt dhe ankerim',
    kategoria: 'Pilota dhe ankera',
    lokacioni: 'Suharekë',
    foto: '/images/galeria/p9.jpeg'
        },
  {
    id: 20,
    data: '20.11.2024',
    titulli: 'Pilota për objekt dhe ankerim',
    kategoria: 'Pilota dhe ankera',
    lokacioni: 'Klinë',
    foto: '/images/galeria/p10.jpeg'
     },
  {
    id: 21,
    data: '20.11.2024',
    titulli: 'Pilota për objekt dhe ankerim',
    kategoria: 'Pilota dhe ankera',
    lokacioni: 'Prishtinë',
    foto: '/images/galeria/p11.jpeg'
     },
  {
    id: 22,
    data: '20.11.2024',
    titulli: 'Pilota për objekt dhe ankerim',
    kategoria: 'Pilota dhe ankera',
    lokacioni: 'Malishevë',
    foto: '/images/galeria/p12.jpeg'
     },
  {
    id: 23,
    data: '20.11.2024',
    titulli: 'Pilota për objekt dhe ankerim',
    kategoria: 'Pilota dhe ankera',
    lokacioni: 'Gjilan',
    foto: '/images/galeria/p13.jpeg'
     },
  {
    id: 24,
    data: '20.11.2024',
    titulli: 'Pilota për objekt dhe ankerim',
    kategoria: 'Pilota dhe ankera',
    lokacioni: 'Prishtinë',
    foto: '/images/galeria/p14.jpeg'
     },
  {
    id: 25,
    data: '20.11.2024',
    titulli: 'Pilota për objekt dhe ankerim',
    kategoria: 'Pilota dhe ankera',
    lokacioni: 'Prishtinë',
    foto: '/images/galeria/p15.jpeg'
     },
  {
    id: 26,
    data: '20.11.2024',
    titulli: 'Pilota për objekt dhe ankerim',
    kategoria: 'Pilota dhe ankera',
    lokacioni: 'Vushtrri',
    foto: '/images/galeria/p16.jpeg'
         },
  {
    id: 27,
    data: '20.11.2024',
    titulli: 'Pilota për objekt dhe ankerim',
    kategoria: 'Pilota dhe ankera',
    lokacioni: 'Prishtinë',
    foto: '/images/galeria/p17.jpeg'
         },
  {
    id: 28,
    data: '20.11.2024',
    titulli: 'Pilota për objekt dhe ankerim',
    kategoria: 'Pilota dhe ankera',
    lokacioni: 'Gjilan',
    foto: '/images/galeria/p18.jpeg'
         },
  {
    id: 29,
    data: '20.11.2024',
    titulli: 'Pilota për objekt dhe ankerim',
    kategoria: 'Pilota dhe ankera',
    lokacioni: 'Prizren',
    foto: '/images/galeria/p19.jpeg'
         },
  {
    id: 30,
    data: '20.11.2024',
    titulli: 'Pilota për objekt dhe ankerim',
    kategoria: 'Pilota dhe ankera',
    lokacioni: 'Prishtinë',
    foto: '/images/galeria/p20.jpeg'
         },
  {
    id: 31,
    data: '20.11.2024',
    titulli: 'Pilota për objekt dhe ankerim',
    kategoria: 'Pilota dhe ankera',
    lokacioni: 'Suharekë',
    foto: '/images/galeria/p21.jpeg'
         },
  {
    id: 32,
    data: '20.11.2024',
    titulli: 'Pilota për objekt dhe ankerim',
    kategoria: 'Pilota dhe ankera',
    lokacioni: 'Klinë',
    foto: '/images/galeria/p22.jpeg'
         },
  {
    id: 33,
    data: '20.11.2024',
    titulli: 'Pilota për objekt dhe ankerim',
    kategoria: 'Pilota dhe ankera',
    lokacioni: 'Prishtinë',
    foto: '/images/galeria/p23.jpeg'
         },
  {
    id: 34,
    data: '20.11.2024',
    titulli: 'Pilota për objekt dhe ankerim',
    kategoria: 'Pilota dhe ankera',
    lokacioni: 'Malishevë',
    foto: '/images/galeria/p24.jpeg'
         },
  {
    id: 35,
    data: '20.11.2024',
    titulli: 'Pilota për objekt dhe ankerim',
    kategoria: 'Pilota dhe ankera',
    lokacioni: 'Gjilan',
    foto: '/images/galeria/p25.jpeg'
           },
  {
    id: 36,
    data: '20.11.2024',
    titulli: 'Pilota për objekt dhe ankerim',
    kategoria: 'Pilota dhe ankera',
    lokacioni: 'Prishtinë',
    foto: '/images/galeria/p26.jpeg'
           },
  {
    id: 37,
    data: '20.11.2024',
    titulli: 'Pilota për objekt dhe ankerim',
    kategoria: 'Pilota dhe ankera',
    lokacioni: 'Prishtinë',
    foto: '/images/galeria/p26.jpeg'
           },
  {
    id: 38,
    data: '20.11.2024',
    titulli: 'Pilota për objekt dhe ankerim',
    kategoria: 'Pilota dhe ankera',
    lokacioni: 'Vushtrri',
    foto: '/images/galeria/p26.jpeg'
           },
  {
    id: 39,
    data: '20.11.2024',
    titulli: 'Pilota për objekt dhe ankerim',
    kategoria: 'Pilota dhe ankera',
    lokacioni: 'Prishtinë',
    foto: '/images/galeria/p26.jpeg'
           },
  {
    id: 40,
    data: '20.11.2024',
    titulli: 'Pilota për objekt dhe ankerim',
    kategoria: 'Pilota dhe ankera',
    lokacioni: 'Gjilan',
    foto: '/images/galeria/p27.jpeg'
           },
  {
    id: 41,
    data: '20.11.2024',
    titulli: 'Pilota për objekt dhe ankerim',
    kategoria: 'Pilota dhe ankera',
    lokacioni: 'Prizren',
    foto: '/images/galeria/p28.jpeg'
           },
  {
    id: 42,
    data: '20.11.2024',
    titulli: 'Pilota për objekt dhe ankerim',
    kategoria: 'Pilota dhe ankera',
    lokacioni: 'Prishtinë',
    foto: '/images/galeria/p29.jpeg'
  }

]

const NE_BALLINE = 6

export default function Galeria({ showHeading = true }: { showHeading?: boolean }) {
  // Në ballinë (showHeading) tregojmë një përzgjedhje; faqja /projektet i tregon të gjitha me filtra.
  const ballina = showHeading
  const kategorite = ['Të gjitha', ...Array.from(new Set(projektet.map((p) => p.kategoria)))]
  const [filter, setFilter] = useState('Të gjitha')
  const [lightbox, setLightbox] = useState<number | null>(null)

  const projektetFiltruar = useMemo(() => {
    const lista = filter === 'Të gjitha' ? projektet : projektet.filter((p) => p.kategoria === filter)
    return ballina ? lista.slice(0, NE_BALLINE) : lista
  }, [filter, ballina])

  const share = (rrjeti: 'fb' | 'tw' | 'in', titulli: string) => {
    const url = encodeURIComponent(window.location.href)
    const links = {
      fb: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      tw: `https://twitter.com/intent/tweet?url=${url}&text=${encodeURIComponent(titulli)}`,
      in: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
    }
    window.open(links[rrjeti], '_blank', 'noopener,noreferrer')
  }

  return (
    <section id="projektet" data-shtresa="Projektet" className="bg-white py-20 sm:py-28">
      <div className="shell">
        {showHeading && (
          <SectionHeading
            title="Projektet Tona"
            lede="Disa nga projektet e realizuara me sukses"
            action={
              <Link href="/projektet" className="btn-ghost">
                Shiko të gjitha projektet <FaArrowRight className="text-xs" />
              </Link>
            }
          />
        )}

        <div className={`grid grid-cols-1 gap-10 ${ballina ? 'lg:grid-cols-[360px_minmax(0,1fr)]' : ''} lg:gap-12`}>
          {/* Harta e projekteve */}
          <div className={ballina ? 'lg:sticky lg:top-[calc(var(--header-h)+24px)] lg:self-start' : 'mx-auto w-full max-w-md'}>
            <HartaProjekteve projektet={projektet} />
          </div>

          <div>
            {!ballina && (
              <div className="no-scrollbar -mx-4 mb-8 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:justify-center sm:px-0">
                {kategorite.map((kat) => {
                  const on = filter === kat
                  const count = kat === 'Të gjitha' ? projektet.length : projektet.filter((p) => p.kategoria === kat).length
                  return (
                    <button
                      key={kat}
                      type="button"
                      onClick={() => setFilter(kat)}
                      aria-pressed={on}
                      className={`flex shrink-0 items-center gap-2 rounded-md border px-3.5 py-2 text-sm font-semibold transition-colors ${
                        on ? 'border-bedrock bg-bedrock text-white' : 'border-stone-line bg-white text-bedrock hover:border-brand'
                      }`}
                    >
                      {kat}
                      <span className={`tabular text-xs ${on ? 'text-white/60' : 'text-slate-mute'}`}>{count}</span>
                    </button>
                  )
                })}
              </div>
            )}

            <ul className={`grid gap-x-6 gap-y-10 sm:grid-cols-2 ${ballina ? 'xl:grid-cols-3' : 'lg:grid-cols-3'}`}>
              {projektetFiltruar.map((p, idx) => (
                <li key={p.id} className="group">
                  <button
                    type="button"
                    onClick={() => setLightbox(idx)}
                    data-kursor="Shiko"
                    className="relative block aspect-[4/3] w-full cursor-zoom-in overflow-hidden rounded-lg bg-stone-2"
                    aria-label={`Hap foton: ${p.titulli}`}
                  >
                    <Image
                      src={p.foto}
                      alt={p.titulli}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                    <span className="absolute left-3 top-3 rounded bg-bedrock/85 px-2 py-1 text-[11px] font-semibold text-white backdrop-blur">
                      {p.kategoria}
                    </span>
                  </button>
                  <div className="mt-4">
                    <h3 className="text-[17px] font-bold leading-snug">{p.titulli}</h3>
                    <div className="mt-1.5 flex items-center justify-between gap-3 text-sm text-slate-mute">
                      <p className="flex flex-wrap items-center gap-x-3 gap-y-1">
                        <span className="flex items-center gap-1.5">
                          <FaMapMarkerAlt className="text-xs text-brand" />
                          {p.lokacioni}
                        </span>
                        <span className="tabular">{p.data}</span>
                      </p>
                      <div className="-mr-2 flex shrink-0 opacity-60 transition-opacity group-hover:opacity-100">
                        {(
                          [
                            ['fb', FaFacebookF, 'Share on Facebook'],
                            ['tw', FaTwitter, 'Share on Twitter'],
                            ['in', FaLinkedinIn, 'Share on LinkedIn'],
                          ] as const
                        ).map(([k, Icon, label]) => (
                          <button
                            key={k}
                            type="button"
                            onClick={() => share(k, p.titulli)}
                            aria-label={label}
                            className="grid h-8 w-8 place-items-center rounded text-[11px] text-slate-mute transition-colors hover:bg-stone hover:text-brand"
                          >
                            <Icon />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <Lightbox
        items={projektetFiltruar.map((p) => ({ src: p.foto, title: p.titulli, meta: `${p.lokacioni}, ${p.data}` }))}
        index={lightbox}
        onClose={() => setLightbox(null)}
        onIndex={setLightbox}
      />
    </section>
  )
}
