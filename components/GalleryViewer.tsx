'use client'

import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Lightbox from './ui/Lightbox'
import MediaTile from './ui/MediaTile'
import { mediaTeReja, projektet, type MediaItem } from '@/lib/galeriaMedia'

const TE_GJITHA = 'Të gjitha'
const VIDEO = 'Video'

const media: MediaItem[] = [
  ...mediaTeReja,
  ...projektet.map((p) => ({
    id: `p${p.id}`,
    lloji: 'foto' as const,
    src: p.foto,
    titulli: p.titulli,
    kategoria: p.kategoria,
    lokacioni: p.lokacioni,
    data: p.data,
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
