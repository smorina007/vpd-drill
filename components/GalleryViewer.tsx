'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FaTimes, FaChevronLeft, FaChevronRight, FaExpand, FaCompress,
  FaHome, FaArrowLeft
} from 'react-icons/fa'

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
  }
]

export default function GalleryViewer({ onClose }: { onClose?: () => void }) {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [filter, setFilter] = useState('Të gjitha')
  const [filteredFotos, setFilteredFotos] = useState(fotot)

  const categories = ['Të gjitha', ...Array.from(new Set(fotot.map(f => f.category)))]

  useEffect(() => {
    if (filter === 'Të gjitha') {
      setFilteredFotos(fotot)
    } else {
      setFilteredFotos(fotot.filter(f => f.category === filter))
    }
  }, [filter])

  const openGallery = (index: number) => {
    setCurrentIndex(index)
    setIsOpen(true)
  }

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredFotos.length)
  }

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + filteredFotos.length) % filteredFotos.length)
  }

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  const goToHome = () => {
    if (onClose) onClose()
    router.push('/')
  }

  const closeModal = () => {
    setIsOpen(false)
  }

  return (
    <>
      {/* Galeria kryesore - me butonin HOME në krye */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Butoni HOME funksional */}
          <div className="mb-6 flex justify-start">
            <button
              onClick={goToHome}
              className="inline-flex items-center gap-2 bg-gray-100 hover:bg-[#256D7B] hover:text-white text-gray-700 px-5 py-3 rounded-full transition-all duration-300 group cursor-pointer"
            >
              <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
              <FaHome className="text-lg" />
              <span className="font-medium">Kthehu në Ballinë</span>
            </button>
          </div>

          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Galeria e Projekteve
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Shfletoni të gjitha projektet tona në një galeri të bukur
            </p>
            <div className="w-32 h-1.5 bg-gradient-to-r from-[#256D7B] to-[#1a4f5a] mx-auto mt-6 rounded-full"></div>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                  filter === cat
                    ? 'bg-[#256D7B] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid i fotove */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredFotos.map((foto, index) => (
              <motion.div
                key={foto.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                onClick={() => openGallery(index)}
                className="relative group cursor-pointer overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="relative h-64 w-full">
                  <Image
                    src={foto.src}
                    alt={foto.alt}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <div>
                    <p className="text-white text-sm font-semibold">{foto.titulli}</p>
                    <p className="text-white/80 text-xs">{foto.data} • {foto.lokacioni}</p>
                    <span className="inline-block mt-2 text-xs bg-[#256D7B] text-white px-2 py-1 rounded-full">
                      {foto.category}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal Viewer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center ${
              isFullscreen ? 'p-0' : 'p-4 md:p-8'
            }`}
            onClick={closeModal}
          >
            <div
              className={`relative ${
                isFullscreen ? 'w-full h-full' : 'max-w-6xl w-full'
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header i modalit */}
              <div className="absolute top-4 left-4 right-4 z-10 flex justify-between items-center text-white">
                {/* Butoni HOME në modal */}
                <button
                  onClick={goToHome}
                  className="inline-flex items-center gap-2 bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full hover:bg-black/70 transition text-sm cursor-pointer"
                >
                  <FaHome size={18} />
                  <span className="hidden sm:inline">Ballina</span>
                  <span className="sm:hidden">Home</span>
                </button>
                
                {/* Informacioni i fotos */}
                <div className="bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full ml-auto mr-2">
                  <span className="text-xs sm:text-sm">
                    {currentIndex + 1} / {filteredFotos.length} • {filteredFotos[currentIndex]?.category}
                  </span>
                </div>

                {/* Butonat e djathtë */}
                <div className="flex gap-2">
                  <button
                    onClick={toggleFullscreen}
                    className="p-2 bg-black/50 backdrop-blur-sm rounded-full hover:bg-black/70 transition"
                    aria-label="Toggle fullscreen"
                  >
                    {isFullscreen ? <FaCompress size={20} /> : <FaExpand size={20} />}
                  </button>
                  <button
                    onClick={closeModal}
                    className="p-2 bg-black/50 backdrop-blur-sm rounded-full hover:bg-black/70 transition"
                    aria-label="Close gallery"
                  >
                    <FaTimes size={20} />
                  </button>
                </div>
              </div>

              {/* Imazhi kryesor */}
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.3 }}
                className="relative w-full h-full flex items-center justify-center"
              >
                <Image
                  src={filteredFotos[currentIndex]?.src}
                  alt={filteredFotos[currentIndex]?.alt}
                  width={1200}
                  height={800}
                  className={`object-contain ${
                    isFullscreen ? 'max-h-screen' : 'max-h-[80vh]'
                  }`}
                  priority
                />
              </motion.div>

              {/* Informacioni i fotos (për mobile) */}
              <div className="absolute bottom-4 left-4 right-4 z-10 md:hidden">
                <div className="bg-black/50 backdrop-blur-sm p-3 rounded-lg text-white">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-white/60">
                      {currentIndex + 1} / {filteredFotos.length}
                    </span>
                    <span className="text-xs bg-[#256D7B] px-2 py-0.5 rounded-full">
                      {filteredFotos[currentIndex]?.category}
                    </span>
                  </div>
                  <h3 className="text-sm font-semibold">{filteredFotos[currentIndex]?.titulli}</h3>
                  <p className="text-white/60 text-xs mt-1">
                    {filteredFotos[currentIndex]?.data} • {filteredFotos[currentIndex]?.lokacioni}
                  </p>
                </div>
              </div>

              {/* Informacioni i fotos (për desktop) */}
              <div className="absolute bottom-4 left-4 right-4 z-10 hidden md:block">
                <div className="bg-black/50 backdrop-blur-sm p-4 rounded-lg text-white max-w-2xl mx-auto">
                  <h3 className="text-xl font-semibold">{filteredFotos[currentIndex]?.titulli}</h3>
                  <p className="text-white/80 text-sm mt-1">
                    {filteredFotos[currentIndex]?.data} • {filteredFotos[currentIndex]?.lokacioni}
                  </p>
                  <p className="text-white/60 text-xs mt-2">
                    Kategoria: {filteredFotos[currentIndex]?.category}
                  </p>
                </div>
              </div>

              {/* Butonat e navigimit */}
              <button
                onClick={prevImage}
                className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 p-2 md:p-3 bg-black/50 backdrop-blur-sm rounded-full hover:bg-black/70 transition text-white"
                aria-label="Previous image"
              >
                <FaChevronLeft size={20} />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 p-2 md:p-3 bg-black/50 backdrop-blur-sm rounded-full hover:bg-black/70 transition text-white"
                aria-label="Next image"
              >
                <FaChevronRight size={20} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}