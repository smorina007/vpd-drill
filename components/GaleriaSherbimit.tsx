'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { FaArrowRight } from 'react-icons/fa'
import MediaTile from './ui/MediaTile'
import Lightbox from './ui/Lightbox'
import { teGjithaMediat, linkuIMedias } from '@/lib/galeriaMedia'

type Props = {
  titulli: string
  /** Kategoritë e galerisë që i përkasin këtij shërbimi */
  kategorite: string[]
  /** Fjalë në titull që e përfshijnë një foto/video edhe nga kategori të tjera (p.sh. "anker") */
  fjaleKyce?: string[]
  max?: number
}

/** Foto dhe video reale nga kantieri për një shërbim — videot dalin të parat. */
export default function GaleriaSherbimit({ titulli, kategorite, fjaleKyce = [], max = 9 }: Props) {
  const [hapur, setHapur] = useState<number | null>(null)

  const lista = useMemo(() => {
    const perputhet = teGjithaMediat.filter(
      (m) => kategorite.includes(m.kategoria) || fjaleKyce.some((f) => m.titulli.toLowerCase().includes(f)),
    )
    const videot = perputhet.filter((m) => m.lloji === 'video')
    const fotot = perputhet.filter((m) => m.lloji === 'foto')
    // ndërthurje video/foto, videot përpara
    const out = []
    for (let i = 0; i < Math.max(videot.length, fotot.length); i++) {
      if (videot[i]) out.push(videot[i])
      if (fotot[i]) out.push(fotot[i])
    }
    return out.slice(0, max)
  }, [kategorite, fjaleKyce, max])

  if (lista.length === 0) return null

  return (
    <section className="bg-stone py-16 sm:py-24">
      <div className="shell">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="flex items-center gap-3 text-sm font-semibold text-brand">
              <span className="h-px w-10 bg-signal" /> Nga kantieret tona
            </p>
            <h2 className="display-lg mt-3">{titulli}</h2>
          </div>
          <Link href="/projektet" className="btn-ghost">
            Të gjitha projektet <FaArrowRight className="text-xs" />
          </Link>
        </div>

        <ul className="grid grid-flow-dense auto-rows-[150px] grid-cols-2 gap-3 sm:auto-rows-[190px] md:grid-cols-3 sm:gap-4">
          {lista.map((m, i) => (
            <li key={m.id} className={m.vertikale ? 'row-span-2' : ''}>
              <MediaTile
                src={m.src}
                poster={m.poster}
                type={m.lloji}
                title={m.titulli}
                sizes="(max-width: 768px) 50vw, 33vw"
                className="h-full"
                fill
                delay={(i % 3) * 0.06}
                onOpen={() => setHapur(i)}
              >
                <span className="absolute inset-x-0 bottom-0 p-3 text-left text-sm font-semibold text-white opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  {m.titulli}
                </span>
              </MediaTile>
            </li>
          ))}
        </ul>
      </div>

      <Lightbox
        items={lista.map((m) => ({
          src: m.src,
          type: m.lloji,
          poster: m.poster,
          shareUrl: linkuIMedias(m.id),
          title: m.titulli,
          meta: [m.kategoria, m.lokacioni, m.data].filter(Boolean).join(' · '),
        }))}
        index={hapur}
        onClose={() => setHapur(null)}
        onIndex={setHapur}
      />
    </section>
  )
}
