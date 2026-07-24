'use client'

import { useState, useCallback, useEffect, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { FaArrowRight, FaFacebookF, FaTwitter, FaLinkedinIn, FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa'

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
    lokacioni: 'Prishtine',
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
    lokacioni: 'Prishtinë',
    foto: '/images/galeria/G4.jpeg'
  },
  {
    id: 5,
    data: '22.01.2026',
    titulli: 'Pilota',
    kategoria: 'Shpime',
    lokacioni: 'Malisheve',
    foto: '/images/galeria/G5.jpeg'
  },
  {
    id: 6,
    data: '30.01.2026',
    titulli: 'Pilota',
    kategoria: 'Shpime',
    lokacioni: 'Malisheve',
    foto: '/images/galeria/G6.jpeg'
  },
  {
    id: 7,
    data: '30.01.2026',
    titulli: 'Pilota dhe vendosje te konstruksioneve te prodhuara nga VPD DRILL',
    kategoria: 'Shpime',
    lokacioni: 'Prishtine',
    foto: '/images/galeria/G7.jpeg'
  },
  {
    id: 8,
    data: '30.01.2026',
    titulli: 'Soilmec ne detyrë',
    kategoria: 'Shpime',
    lokacioni: 'Prishtine',
    foto: '/images/galeria/G10.jpeg'
  },
  {
    id: 9,
    data: '30.01.2026',
    titulli: 'Soilmec ne detyrë',
    kategoria: 'Shpime',
    lokacioni: 'Prishtine',
    foto: '/images/galeria/G18.jpeg'
  },
   {
    id: 10,
    data: '30.06.2026',
    titulli: 'Casagrande Diafragmë',
    kategoria: 'Gërmim Diafragmë',
    lokacioni: 'Prishtine',
    foto: '/images/galeria/G21.jpeg'
      },
  {
    id: 11,
    data: '20.11.2024',
    titulli: 'Pilota për objekt dhe ankerim',
    kategoria: 'Pilota dhe ankera',
    lokacioni: 'Prishtinë',
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
    lokacioni: 'Prishtinë',
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
    lokacioni: 'Prishtinë',
    foto: '/images/galeria/p6.jpeg'
        },
  {
    id: 17,
    data: '20.11.2024',
    titulli: 'Pilota për objekt dhe ankerim',
    kategoria: 'Pilota dhe ankera',
    lokacioni: 'Prishtinë',
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
    lokacioni: 'Prishtinë',
    foto: '/images/galeria/p9.jpeg'
        },
  {
    id: 20,
    data: '20.11.2024',
    titulli: 'Pilota për objekt dhe ankerim',
    kategoria: 'Pilota dhe ankera',
    lokacioni: 'Prishtinë',
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
    lokacioni: 'Prishtinë',
    foto: '/images/galeria/p12.jpeg'
     },
  {
    id: 23,
    data: '20.11.2024',
    titulli: 'Pilota për objekt dhe ankerim',
    kategoria: 'Pilota dhe ankera',
    lokacioni: 'Prishtinë',
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
    lokacioni: 'Prishtinë',
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
    lokacioni: 'Prishtinë',
    foto: '/images/galeria/p18.jpeg'
         },
  {
    id: 29,
    data: '20.11.2024',
    titulli: 'Pilota për objekt dhe ankerim',
    kategoria: 'Pilota dhe ankera',
    lokacioni: 'Prishtinë',
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
    lokacioni: 'Prishtinë',
    foto: '/images/galeria/p21.jpeg'
         },
  {
    id: 32,
    data: '20.11.2024',
    titulli: 'Pilota për objekt dhe ankerim',
    kategoria: 'Pilota dhe ankera',
    lokacioni: 'Prishtinë',
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
    lokacioni: 'Prishtinë',
    foto: '/images/galeria/p24.jpeg'
         },
  {
    id: 35,
    data: '20.11.2024',
    titulli: 'Pilota për objekt dhe ankerim',
    kategoria: 'Pilota dhe ankera',
    lokacioni: 'Prishtinë',
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
    lokacioni: 'Prishtinë',
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
    lokacioni: 'Prishtinë',
    foto: '/images/galeria/p27.jpeg'
           },
  {
    id: 41,
    data: '20.11.2024',
    titulli: 'Pilota për objekt dhe ankerim',
    kategoria: 'Pilota dhe ankera',
    lokacioni: 'Prishtinë',
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

export default function Galeria({ showHeading = true }: { showHeading?: boolean }) {
  // Përdor URL-në aktuale për share
  const shareUrl = typeof window !== 'undefined' ? window.location.href : ''

  const kategorite = ['Të gjitha', ...Array.from(new Set(projektet.map(p => p.kategoria)))]
  const [filter, setFilter] = useState('Të gjitha')
  const [lightboxId, setLightboxId] = useState<number | null>(null)

  const projektetFiltruar = useMemo(
    () => (filter === 'Të gjitha' ? projektet : projektet.filter(p => p.kategoria === filter)),
    [filter]
  )

  const lightboxIndex = projektetFiltruar.findIndex(p => p.id === lightboxId)
  const aktivi = lightboxIndex >= 0 ? projektetFiltruar[lightboxIndex] : null

  const closeLightbox = useCallback(() => setLightboxId(null), [])
  const nextPhoto = useCallback(() => {
    setLightboxId((prev) => {
      const i = projektetFiltruar.findIndex(p => p.id === prev)
      if (i < 0) return prev
      return projektetFiltruar[(i + 1) % projektetFiltruar.length].id
    })
  }, [projektetFiltruar])
  const prevPhoto = useCallback(() => {
    setLightboxId((prev) => {
      const i = projektetFiltruar.findIndex(p => p.id === prev)
      if (i < 0) return prev
      return projektetFiltruar[(i - 1 + projektetFiltruar.length) % projektetFiltruar.length].id
    })
  }, [projektetFiltruar])

  useEffect(() => {
    if (lightboxId === null) return
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowRight') nextPhoto()
      if (e.key === 'ArrowLeft') prevPhoto()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = 'auto'
      window.removeEventListener('keydown', onKey)
    }
  }, [lightboxId, closeLightbox, nextPhoto, prevPhoto])

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {showHeading && (
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Projektet Tona
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Disa nga projektet e realizuara me sukses
            </p>
            <div className="w-32 h-1.5 bg-gradient-to-r from-[#256D7B] to-[#1a4f5a] mx-auto mt-6 rounded-full"></div>
          </div>
        )}

        {/* Filtrat e kategorive */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {kategorite.map((kat) => {
            const active = filter === kat
            const count = kat === 'Të gjitha' ? projektet.length : projektet.filter(p => p.kategoria === kat).length
            return (
              <button
                key={kat}
                onClick={() => setFilter(kat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-1.5 ${
                  active
                    ? 'bg-[#256D7B] text-white shadow-md shadow-[#256D7B]/30 scale-105'
                    : 'bg-white text-gray-700 border border-gray-200 hover:border-[#256D7B]/40'
                }`}
              >
                {kat}
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${active ? 'bg-white/20' : 'bg-gray-100'}`}>
                  {count}
                </span>
              </button>
            )
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projektetFiltruar.map((p) => (
            <div key={p.id} className="bg-white rounded-lg shadow-md hover:shadow-xl transition overflow-hidden">
              {/* Foto */}
              <div
                className="relative h-48 w-full cursor-zoom-in group"
                onClick={() => setLightboxId(p.id)}
              >
                <Image
                  src={p.foto}
                  alt={p.titulli}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
              </div>

              {/* Përshkrimet */}
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-sm font-medium text-[#256D7B]">{p.data}</span>
                  <span className="text-xs bg-[#256D7B]/10 text-[#256D7B] px-2 py-1 rounded-full">
                    {p.kategoria}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{p.titulli}</h3>
                <p className="text-sm text-gray-500">📍 {p.lokacioni}</p>

                {/* Butonat Share */}
                <div className="flex justify-end mt-3 space-x-2">
                  <button
                    onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank')}
                    className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition"
                    aria-label="Share on Facebook"
                  >
                    <FaFacebookF size={14} />
                  </button>
                  <button
                    onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(p.titulli)}`, '_blank')}
                    className="w-8 h-8 bg-sky-500 text-white rounded-full flex items-center justify-center hover:bg-sky-600 transition"
                    aria-label="Share on Twitter"
                  >
                    <FaTwitter size={14} />
                  </button>
                  <button
                    onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, '_blank')}
                    className="w-8 h-8 bg-blue-700 text-white rounded-full flex items-center justify-center hover:bg-blue-800 transition"
                    aria-label="Share on LinkedIn"
                  >
                    <FaLinkedinIn size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link 
            href="/projektet" 
            className="inline-flex items-center text-[#256D7B] font-medium hover:underline"
          >
            Shiko të gjitha projektet
            <FaArrowRight className="ml-2 text-sm" />
          </Link>
        </div>
      </div>

      {/* Lightbox — foto e plotë kur klikohet */}
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
              {/* Foto kryesore */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={aktivi.id}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.25 }}
                  className="relative w-full h-full max-w-5xl flex items-center justify-center"
                >
                  <Image
                    src={aktivi.foto}
                    alt={aktivi.titulli}
                    width={1400}
                    height={1000}
                    className="object-contain max-h-[78vh] w-auto rounded-lg shadow-2xl"
                    priority
                  />
                </motion.div>
              </AnimatePresence>

              {/* Informacioni + share */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-full max-w-xl px-4">
                <div className="bg-black/50 backdrop-blur-md rounded-xl px-5 py-3 text-white flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-semibold text-sm truncate">{aktivi.titulli}</p>
                    <p className="text-white/70 text-xs">{aktivi.data} · 📍 {aktivi.lokacioni}</p>
                  </div>
                  <div className="flex gap-1.5 flex-shrink-0">
                    <button
                      onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank')}
                      className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition"
                      aria-label="Share on Facebook"
                    >
                      <FaFacebookF size={12} />
                    </button>
                    <button
                      onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(aktivi.titulli)}`, '_blank')}
                      className="w-8 h-8 bg-sky-500 rounded-full flex items-center justify-center hover:bg-sky-600 transition"
                      aria-label="Share on Twitter"
                    >
                      <FaTwitter size={12} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Kontrollet */}
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
                onClick={prevPhoto}
                className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 p-2.5 md:p-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full hover:bg-white/20 transition-colors text-white"
                aria-label="Foto e mëparshme"
              >
                <FaChevronLeft size={18} />
              </button>
              <button
                onClick={nextPhoto}
                className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 p-2.5 md:p-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full hover:bg-white/20 transition-colors text-white"
                aria-label="Foto tjetër"
              >
                <FaChevronRight size={18} />
              </button>

              {/* Numërimi */}
              <div className="fixed top-5 left-5 z-20 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 text-white text-xs font-medium">
                {lightboxIndex + 1} / {projektetFiltruar.length}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}