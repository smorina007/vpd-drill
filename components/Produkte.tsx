'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import { FaWater, FaWrench, FaRuler, FaCog, FaBolt, FaShieldAlt, FaSearch, FaThLarge, FaExpand } from 'react-icons/fa'
import SectionHeading from './ui/SectionHeading'
import Lightbox from './ui/Lightbox'

const produkteKategorite = [
  {
    title: 'Muri L',
    icon: FaShieldAlt,
    items: [
      { name: 'Muri L - 0.5m', image: '/images/produktet/ML1.jpeg' },
      { name: 'Muri L - 0.75m', image: '/images/produktet/ML2.jpeg' },
      { name: 'Muri L - 1m', image: '/images/produktet/ML3.jpeg' },
      { name: 'Muri L - 1.25m', image: '/images/produktet/ML4.jpeg' },
      { name: 'Muri L - 1.5 m', image: '/images/produktet/ML5.jpeg' },
      { name: 'Muri L - 1.75m', image: '/images/produktet/ML6.jpg' },
      { name: 'Muri L - 2m', image: '/images/produktet/ML6.jpg' },
    ]
  },
  {
    title: 'Gypa betoni',
    icon: FaRuler,
    items: [
      { name: 'Gyp betoni 300mm', image: '/images/produktet/GB1.jpg' },
      { name: 'Gyp betoni 400mm', image: '/images/produktet/GB1.jpg' },
      { name: 'Gyp betoni 500mm', image: '/images/produktet/GB1.jpg' },
      { name: 'Gyp betoni 600mm', image: '/images/produktet/GB1.jpg' },
      { name: 'Gyp betoni 800mm', image: '/images/produktet/GB1.jpg' },
      { name: 'Gyp betoni 1000mm', image: '/images/produktet/GB1.jpg' },
    ]
  },
  {
    title: 'Pllaka betoni',
    icon: FaBolt,
    items: [
      { name: 'Pllakë betoni - 80x30x8cm', image: '/images/produktet/P1.jpg' },
      { name: 'Pllakë betoni - 100x30x8cm', image: '/images/produktet/P2.jpg' },
      { name: 'Pllakë betoni - 150x30x8cm', image: '/images/produktet/P3.jpg' },
      { name: 'Pllakë betoni - 200x30x8cm', image: '/images/produktet/P4.jpg' },
      { name: 'Pllakë betoni - 80x50x8cm', image: '/images/produktet/P5.jpg' },
      { name: 'Pllakë betoni - 150x50x8cm', image: '/images/produktet/P6.jpg' },
      { name: 'Pllakë betoni - 200x50x8cm', image: '/images/produktet/P6.jpg' },
      { name: 'Pllakë betoni - 80x80x8xm', image: '/images/produktet/P6.jpg' },
      { name: 'Pllakë betoni - 100x80x8xm', image: '/images/produktet/P6.jpg' },
      { name: 'Pllakë betoni - 150x80x8xm', image: '/images/produktet/P6.jpg' },
      { name: 'Pllakë betoni - 200x80x8xm', image: '/images/produktet/P6.jpg' },
    ]
  },
  {
    title: 'Gypa plastike për puse',
    icon: FaWater,
    items: [
      { name: 'Gyp plastik 125mm', image: '/images/produktet/GP1.jpg' },
      { name: 'Gyp plastik 140mm', image: '/images/produktet/GP1.jpg' },
      { name: 'Gyp plastik 160mm', image: '/images/produktet/GP1.jpg' },
      { name: 'Gyp plastik 175mm', image: '/images/produktet/GP2.jpg' },
      { name: 'Gyp plastik 200mm', image: '/images/produktet/GP3.jpg' },
      { name: 'Gyp plastik 225mm', image: '/images/produktet/GP3.jpg' },
      { name: 'Gyp plastik 250mm', image: '/images/produktet/GP3.jpg' },
    ]
  },
  {
    title: 'Gypa hekuri',
    icon: FaCog,
    items: [
      { name: 'Gyp hekuri i galvanizuar', image: '/images/produktet/GH1.jpg' },
      { name: 'Gyp hekuri pa galvanizuar', image: '/images/produktet/GH2.jpg' },
    ]
  },
  {
    title: 'Elemente shpimi',
    icon: FaWrench,
    items: [
      { name: 'Element shpimi 1', image: '/images/produktet/ESH1.jpg' },
      { name: 'Element shpimi 2', image: '/images/produktet/ESH2.jpg' },
      { name: 'Element shpimi 3', image: '/images/produktet/ESH3.jpg' },
      { name: 'Element shpimi 4', image: '/images/produktet/ESH4.jpg' },
    ]
  },
  {
    title: 'Kosha armature',
    icon: FaBolt,
    items: [
      { name: 'Kosh arme 1', image: '/images/produktet/KA1.jpg' },
      { name: 'Kosh arme 2', image: '/images/produktet/KA2.jpg' },
    ]
  },
  {
    title: 'Sajla (shufra hekuri)',
    icon: FaRuler,
    items: [
      { name: 'Sajla 10-24mm', image: '/images/produktet/SH.jpg' },
    ]
  }
]

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
