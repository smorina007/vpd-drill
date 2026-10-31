'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import { FaSearch, FaThLarge, FaExpand } from 'react-icons/fa'
import { produkteKategorite } from '@/lib/produktet'
import SectionHeading from './ui/SectionHeading'
import Lightbox from './ui/Lightbox'

// Rrafshojmë të gjitha produktet në një listë të vetme, secili me referencën e kategorisë
const teGjithaProduktet = produkteKategorite.flatMap((kat, katIndex) =>
  kat.items.map((item, itemIndex) => ({ ...item, id: `${katIndex}-${itemIndex}`, kategoria: kat.title }))
)

export default function Produkte({ showHeading = true }: { showHeading?: boolean }) {
  const [filter, setFilter] = useState<string>('Të gjitha')
  const [kerkimi, setKerkimi] = useState('')
  const [lightbox, setLightbox] = useState<number | null>(null)
  // Në ballinë tregojmë fillimisht vetëm 2 rreshta; katalogu i plotë hapet me një klikim
  const [teGjitha, setTeGjitha] = useState(!showHeading)

  const produktetFiltruar = useMemo(
    () =>
      teGjithaProduktet.filter(
        (p) => (filter === 'Të gjitha' || p.kategoria === filter) && p.name.toLowerCase().includes(kerkimi.toLowerCase())
      ),
    [filter, kerkimi]
  )

  const pjesor = !teGjitha && filter === 'Të gjitha' && !kerkimi
  const teShfaqura = pjesor ? produktetFiltruar.slice(0, 10) : produktetFiltruar

  const filtrat = [
    { title: 'Të gjitha', icon: FaThLarge, count: teGjithaProduktet.length },
    ...produkteKategorite.map((k) => ({ title: k.title, icon: k.icon, count: k.items.length })),
  ]

  return (
    <section id="produktet" data-shtresa="Produktet" className="bg-stone py-20 sm:py-28">
      <div className="shell">
        {showHeading && (
          <SectionHeading
            title="Katalogu i Produkteve"
            lede={`Gama e plotë e produkteve për puse, ndërtim dhe shpime — ${teGjithaProduktet.length} artikuj`}
          />
        )}

        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          {/* Filtrat */}
          <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 lg:mx-0 lg:flex-wrap lg:px-0">
            {filtrat.map((f) => {
              const on = filter === f.title
              return (
                <button
                  key={f.title}
                  type="button"
                  onClick={() => setFilter(f.title)}
                  aria-pressed={on}
                  className={`flex shrink-0 items-center gap-2 rounded-md border px-3.5 py-2 text-sm font-semibold transition-colors ${
                    on ? 'border-bedrock bg-bedrock text-white' : 'border-stone-line bg-white text-bedrock hover:border-brand'
                  }`}
                >
                  <f.icon className={`text-xs ${on ? 'text-glacier' : 'text-brand'}`} />
                  {f.title}
                  <span className={`tabular text-xs ${on ? 'text-white/60' : 'text-slate-mute'}`}>{f.count}</span>
                </button>
              )
            })}
          </div>
          {/* Kërkimi */}
          <label className="relative block w-full lg:max-w-xs">
            <span className="sr-only">Kërko produkt</span>
            <FaSearch className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-slate-mute" />
            <input
              type="search"
              value={kerkimi}
              onChange={(e) => setKerkimi(e.target.value)}
              placeholder="Kërko produkt (p.sh. 'Muri L', '300mm'...)"
              className="field pl-10"
            />
          </label>
        </div>

        {produktetFiltruar.length === 0 ? (
          <p className="rounded-lg border border-dashed border-stone-line py-16 text-center text-slate-mute">
            Asnjë produkt nuk u gjet për këtë kërkim.
          </p>
        ) : (
          <ul className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {teShfaqura.map((p, idx) => (
              <li key={p.id}>
                <button type="button" data-kursor="Shiko" onClick={() => setLightbox(idx)} className="group block w-full text-left">
                  <span className="relative block aspect-square overflow-hidden rounded-lg bg-stone-2 ring-1 ring-stone-line">
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                    />
                    <span className="absolute right-2 top-2 grid h-7 w-7 place-items-center rounded bg-white/90 text-[11px] text-bedrock opacity-0 transition-opacity group-hover:opacity-100">
                      <FaExpand />
                    </span>
                  </span>
                  <span className="mt-2.5 block text-xs font-medium text-brand">{p.kategoria}</span>
                  <span className="mt-0.5 block text-sm font-semibold leading-snug text-bedrock">{p.name}</span>
                </button>
              </li>
            ))}
          </ul>
        )}

        {pjesor && produktetFiltruar.length > 10 && (
          <div className="mt-10 flex justify-center">
            <button type="button" onClick={() => setTeGjitha(true)} className="btn-ghost px-6">
              Të gjitha <span className="tabular text-slate-mute">({produktetFiltruar.length})</span>
            </button>
          </div>
        )}
      </div>

      <Lightbox
        items={produktetFiltruar.map((p) => ({ src: p.image, title: p.name, meta: p.kategoria }))}
        index={lightbox}
        onClose={() => setLightbox(null)}
        onIndex={setLightbox}
      />
    </section>
  )
}
