'use client'

import { useState, useMemo, useCallback, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FaWater, FaWrench, FaRuler, FaCog, FaBolt, FaShieldAlt, FaSearch,
  FaTimes, FaChevronLeft, FaChevronRight, FaThLarge,
} from 'react-icons/fa'

const produkteKategorite = [
  {
    title: 'Muri L',
    icon: FaShieldAlt,
    color: 'from-blue-500 to-blue-600',
    badge: 'bg-blue-500',
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
    color: 'from-purple-500 to-pink-500',
    badge: 'bg-purple-500',
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
    color: 'from-yellow-500 to-orange-500',
    badge: 'bg-orange-500',
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
    color: 'from-cyan-500 to-blue-500',
    badge: 'bg-cyan-500',
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
    color: 'from-gray-600 to-gray-800',
    badge: 'bg-gray-700',
    items: [
      { name: 'Gyp hekuri i galvanizuar', image: '/images/produktet/GH1.jpg' },
      { name: 'Gyp hekuri pa galvanizuar', image: '/images/produktet/GH2.jpg' },
    ]
  },
  {
    title: 'Elemente shpimi',
    icon: FaWrench,
    color: 'from-green-500 to-emerald-500',
    badge: 'bg-emerald-500',
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
    color: 'from-red-500 to-red-600',
    badge: 'bg-red-500',
    items: [
      { name: 'Kosh arme 1', image: '/images/produktet/KA1.jpg' },
      { name: 'Kosh arme 2', image: '/images/produktet/KA2.jpg' },
    ]
  },
  {
    title: 'Sajla (shufra hekuri)',
    icon: FaRuler,
    color: 'from-indigo-500 to-indigo-600',
    badge: 'bg-indigo-500',
    items: [
      { name: 'Sajla 10-24mm', image: '/images/produktet/SH.jpg' },
    ]
  }
]

// Rrafshojmë të gjitha produktet në një listë të vetme, secili me referencën e kategorisë
const teGjithaProduktet = produkteKategorite.flatMap((kat, katIndex) =>
  kat.items.map((item, itemIndex) => ({
    ...item,
    id: `${katIndex}-${itemIndex}`,
    kategoria: kat.title,
    badge: kat.badge,
    color: kat.color,
  }))
)

export default function Produkte({ showHeading = true }: { showHeading?: boolean }) {
  const [filter, setFilter] = useState<string>('Të gjitha')
  const [kerkimi, setKerkimi] = useState('')
  const [lightboxId, setLightboxId] = useState<string | null>(null)

  const kategoriteEmrat = ['Të gjitha', ...produkteKategorite.map(k => k.title)]

  const produktetFiltruar = useMemo(() => {
    return teGjithaProduktet.filter((p) => {
      const perputhetKategoria = filter === 'Të gjitha' || p.kategoria === filter
      const perputhetKerkimi = p.name.toLowerCase().includes(kerkimi.toLowerCase())
      return perputhetKategoria && perputhetKerkimi
    })
  }, [filter, kerkimi])

  const lightboxIndex = produktetFiltruar.findIndex(p => p.id === lightboxId)
  const aktivi = lightboxIndex >= 0 ? produktetFiltruar[lightboxIndex] : null

  const closeLightbox = useCallback(() => setLightboxId(null), [])
  const nextProduct = useCallback(() => {
    setLightboxId((prev) => {
      const i = produktetFiltruar.findIndex(p => p.id === prev)
      if (i < 0) return prev
      return produktetFiltruar[(i + 1) % produktetFiltruar.length].id
    })
  }, [produktetFiltruar])
  const prevProduct = useCallback(() => {
    setLightboxId((prev) => {
      const i = produktetFiltruar.findIndex(p => p.id === prev)
      if (i < 0) return prev
      return produktetFiltruar[(i - 1 + produktetFiltruar.length) % produktetFiltruar.length].id
    })
  }, [produktetFiltruar])

  useEffect(() => {
    if (!lightboxId) return
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowRight') nextProduct()
      if (e.key === 'ArrowLeft') prevProduct()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = 'auto'
      window.removeEventListener('keydown', onKey)
    }
  }, [lightboxId, closeLightbox, nextProduct, prevProduct])

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {showHeading && (
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Katalogu i Produkteve
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Gama e plotë e produkteve për puse, ndërtim dhe shpime — {teGjithaProduktet.length} artikuj
            </p>
            <div className="w-32 h-1.5 bg-gradient-to-r from-[#256D7B] to-[#1a4f5a] mx-auto mt-6 rounded-full"></div>
          </div>
        )}

        {/* Kërkimi */}
        <div className="max-w-md mx-auto mb-6 relative">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={kerkimi}
            onChange={(e) => setKerkimi(e.target.value)}
            placeholder="Kërko produkt (p.sh. 'Muri L', '300mm'...)"
            className="w-full pl-11 pr-4 py-3 rounded-full border border-gray-200 bg-white shadow-sm focus:ring-2 focus:ring-[#256D7B] focus:border-transparent transition"
          />
        </div>

        {/* Filtrat e kategorive */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          <button
            onClick={() => setFilter('Të gjitha')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-1.5 ${
              filter === 'Të gjitha'
                ? 'bg-[#256D7B] text-white shadow-md shadow-[#256D7B]/30 scale-105'
                : 'bg-white text-gray-700 border border-gray-200 hover:border-[#256D7B]/40'
            }`}
          >
            <FaThLarge size={12} />
            Të gjitha
            <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${filter === 'Të gjitha' ? 'bg-white/20' : 'bg-gray-100'}`}>
              {teGjithaProduktet.length}
            </span>
          </button>
          {produkteKategorite.map((kat) => {
            const active = filter === kat.title
            const count = kat.items.length
            return (
              <button
                key={kat.title}
                onClick={() => setFilter(kat.title)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-1.5 ${
                  active
                    ? 'bg-[#256D7B] text-white shadow-md shadow-[#256D7B]/30 scale-105'
                    : 'bg-white text-gray-700 border border-gray-200 hover:border-[#256D7B]/40'
                }`}
              >
                <kat.icon size={12} />
                {kat.title}
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${active ? 'bg-white/20' : 'bg-gray-100'}`}>
                  {count}
                </span>
              </button>
            )
          })}
        </div>

        {/* Grid i produkteve */}
        {produktetFiltruar.length === 0 ? (
          <p className="text-center text-gray-500 py-16">Asnjë produkt nuk u gjet për këtë kërkim.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5">
            <AnimatePresence mode="popLayout">
              {produktetFiltruar.map((p) => (
                <motion.div
                  key={p.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.25 }}
                  whileHover={{ y: -4 }}
                  onClick={() => setLightboxId(p.id)}
                  className="group cursor-zoom-in bg-white rounded-2xl shadow-md hover:shadow-xl hover:shadow-[#256D7B]/15 ring-1 ring-black/5 hover:ring-[#256D7B]/30 overflow-hidden transition-shadow duration-300"
                >
                  <div className="relative h-28 sm:h-32 w-full overflow-hidden">
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <span className={`absolute top-2 left-2 ${p.badge} text-white text-[9px] font-semibold px-2 py-0.5 rounded-full shadow`}>
                      {p.kategoria}
                    </span>
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity text-white text-xs font-semibold bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full">
                        Shiko
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-center font-medium text-gray-700 px-2 py-2.5 leading-tight">{p.name}</p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Lightbox — foto e plotë */}
      <AnimatePresence>
        {aktivi && (
          <div className="fixed inset-0 z-[9999]">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-gray-950/90 backdrop-blur-sm"
              onClick={closeLightbox}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full h-full flex items-center justify-center p-4 md:p-10"
              onClick={(e) => e.stopPropagation()}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={aktivi.id}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.25 }}
                  className="relative w-full h-full max-w-3xl flex items-center justify-center"
                >
                  <Image
                    src={aktivi.image}
                    alt={aktivi.name}
                    width={1000}
                    height={1000}
                    className="object-contain max-h-[75vh] w-auto rounded-lg shadow-2xl"
                    priority
                  />
                </motion.div>
              </AnimatePresence>

              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-full max-w-md px-4">
                <div className="bg-black/50 backdrop-blur-md rounded-xl px-5 py-3 text-white text-center">
                  <p className="font-semibold text-sm">{aktivi.name}</p>
                  <span className={`inline-block mt-1 ${aktivi.badge} text-white text-[10px] font-semibold px-2 py-0.5 rounded-full`}>
                    {aktivi.kategoria}
                  </span>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                onClick={closeLightbox}
                className="fixed top-5 right-5 z-20 p-2.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full hover:bg-white/20 transition-colors text-white"
                aria-label="Mbyll"
              >
                <FaTimes size={20} />
              </motion.button>
              <button
                onClick={prevProduct}
                className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 p-2.5 md:p-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full hover:bg-white/20 transition-colors text-white"
                aria-label="Produkti i mëparshëm"
              >
                <FaChevronLeft size={18} />
              </button>
              <button
                onClick={nextProduct}
                className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 p-2.5 md:p-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full hover:bg-white/20 transition-colors text-white"
                aria-label="Produkti tjetër"
              >
                <FaChevronRight size={18} />
              </button>

              <div className="fixed top-5 left-5 z-20 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 text-white text-xs font-medium">
                {lightboxIndex + 1} / {produktetFiltruar.length}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}
