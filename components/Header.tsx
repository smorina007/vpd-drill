'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { 
  FaBars, FaTimes, FaClock, FaCloudSun, FaUsers, 
  FaCalculator, FaFileAlt, FaRobot, FaStar, FaEnvelope,
  FaHome, FaServicestack, FaCube, FaImages, FaWater,
  FaSpinner, FaLayerGroup, FaColumns, FaDraftingCompass,
  FaMapMarkerAlt
} from 'react-icons/fa'
import { useOferta } from '@/app/context/OfertaContext'
import { useWeather } from '@/app/context/WeatherContext'
import ModalLlogaritesMuriL from './ModalLlogaritesMuriL'
import ModalLlogaritesPilota from './ModalLlogaritesPilota'
import ModalLlogaritesKonstruksion from './ModalLlogaritesKonstruksion'
import ModalLlogaritesUji from './ModalLlogaritesUji'
import ModalAI from './ModalAI'
import ModalVleresime from './ModalVleresime'
import GalleryViewerModal from './GalleryViewerModal'
import ModalNaGjeni from './ModalNaGjeni'
import ModalParashikimiMotit from './ModalParashikimiMotit'

export default function Header() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [currentTime, setCurrentTime] = useState('')
  const { weather, loading: weatherLoading } = useWeather()
  const [showGallery, setShowGallery] = useState(false)

  // Nëse jemi tashmë në ballinë, Next.js Link nuk bën asgjë (s'ka navigim = s'ka scroll-to-top).
  // Prandaj e detektojmë vetë dhe e bëjmë scroll manualisht në krye.
  const handleHomeClick = (e: React.MouseEvent) => {
    if (pathname === '/') {
      e.preventDefault()
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const [showMuriL, setShowMuriL] = useState(false)
  const [showPilota, setShowPilota] = useState(false)
  const [showKonstruksion, setShowKonstruksion] = useState(false)
  const [showUji, setShowUji] = useState(false)
  const [showAI, setShowAI] = useState(false)
  const [showVleresime, setShowVleresime] = useState(false)
  const [showNaGjeni, setShowNaGjeni] = useState(false)
  const [showParashikimi, setShowParashikimi] = useState(false)

  const { openOferta } = useOferta()

  // Ora reale
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date()
      setCurrentTime(now.toLocaleTimeString('sq-AL', { 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit' 
      }))
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <>
      <ModalLlogaritesMuriL isOpen={showMuriL} onClose={() => setShowMuriL(false)} />
      <ModalLlogaritesPilota isOpen={showPilota} onClose={() => setShowPilota(false)} />
      <ModalLlogaritesKonstruksion isOpen={showKonstruksion} onClose={() => setShowKonstruksion(false)} />
      <ModalLlogaritesUji isOpen={showUji} onClose={() => setShowUji(false)} />
      <ModalAI isOpen={showAI} onClose={() => setShowAI(false)} />
      <ModalVleresime
        isOpen={showVleresime}
        onClose={() => setShowVleresime(false)}
      />
      <GalleryViewerModal isOpen={showGallery} onClose={() => setShowGallery(false)} />
      <ModalNaGjeni isOpen={showNaGjeni} onClose={() => setShowNaGjeni(false)} />
      <ModalParashikimiMotit isOpen={showParashikimi} onClose={() => setShowParashikimi(false)} />

      <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
        {/* Top bar - info reale */}
        <div className="hidden sm:block bg-gradient-to-r from-[#256D7B] to-[#1a4f5a] text-white text-sm py-1.5">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <FaClock className="mr-1.5 opacity-80" />
                  <span className="font-mono tabular-nums">{currentTime}</span>
                </div>
                <button
                  onClick={() => setShowParashikimi(true)}
                  className="flex items-center min-w-[110px] hover:bg-white/10 px-2 py-0.5 rounded-full transition-colors"
                  title="Shiko parashikimin 5-ditor"
                >
                  <FaCloudSun className="mr-1.5 opacity-80" />
                  {weatherLoading ? (
                    <FaSpinner className="animate-spin" />
                  ) : weather ? (
                    <span>{weather.temp}°C, {weather.condition}</span>
                  ) : (
                    <span>Moti N/A</span>
                  )}
                  <span className="ml-1.5 text-[10px] underline underline-offset-2 opacity-70 hidden md:inline">5-ditor</span>
                </button>
              </div>
              <button
                onClick={() => setShowNaGjeni(true)}
                className="flex items-center gap-1.5 hover:bg-white/10 px-2 py-0.5 rounded-full transition-colors"
              >
                <FaMapMarkerAlt className="opacity-80" />
                <span>Si të na gjeni</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main navigation */}
        <nav className="container mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20 lg:h-24">
            {/* Logo + Emri i Kompanisë (klikimi të çon në home) */}
            <Link href="/" onClick={handleHomeClick} className="flex items-center space-x-2 group">
              <Image 
                src="/images/logo.png" 
                alt="VPD DRILL Logo" 
                width={65} 
                height={65} 
                className="object-contain"
              />
              <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 hover:text-[#256D7B] transition">
                VPD<span className="text-[#256D7B] group-hover:text-gray-900 transition"> DRILL</span>
              </span>
            </Link>

            {/* Desktop Menu - PËRFSHIN BALLINA */}
            <div className="hidden lg:flex items-center space-x-1 xl:space-x-2 ml-8">
              <Link
                href="/"
                onClick={handleHomeClick}
                className={`px-3 py-2 rounded-full transition-all font-medium flex items-center gap-2 text-sm xl:text-base ${
                  pathname === '/' ? 'text-[#256D7B] bg-[#256D7B]/8' : 'text-gray-600 hover:text-[#256D7B] hover:bg-gray-50'
                }`}
              >
                <FaHome /> Ballina
              </Link>
              <Link
                href="/sherbimet"
                className={`px-3 py-2 rounded-full transition-all font-medium flex items-center gap-2 text-sm xl:text-base ${
                  pathname === '/sherbimet' ? 'text-[#256D7B] bg-[#256D7B]/8' : 'text-gray-600 hover:text-[#256D7B] hover:bg-gray-50'
                }`}
              >
                <FaServicestack /> Shërbimet
              </Link>
              <Link
                href="/produktet"
                className={`px-3 py-2 rounded-full transition-all font-medium flex items-center gap-2 text-sm xl:text-base ${
                  pathname === '/produktet' ? 'text-[#256D7B] bg-[#256D7B]/8' : 'text-gray-600 hover:text-[#256D7B] hover:bg-gray-50'
                }`}
              >
                <FaCube /> Produktet
              </Link>
              <Link
                href="/projektet"
                className={`px-3 py-2 rounded-full transition-all font-medium flex items-center gap-2 text-sm xl:text-base ${
                  pathname === '/projektet' ? 'text-[#256D7B] bg-[#256D7B]/8' : 'text-gray-600 hover:text-[#256D7B] hover:bg-gray-50'
                }`}
              >
                <FaImages /> Projektet
              </Link>
            </div>

            {/* Desktop Icons */}
            <div className="hidden lg:flex flex-wrap justify-end items-center gap-x-1.5 xl:gap-x-2.5 gap-y-1 max-w-[420px] xl:max-w-none">
              <button onClick={openOferta} className="flex flex-col items-center gap-1 group">
                <span className="w-9 h-9 xl:w-10 xl:h-10 rounded-full bg-[#256D7B]/8 flex items-center justify-center text-[#256D7B] group-hover:bg-[#256D7B] group-hover:text-white group-hover:-translate-y-0.5 group-hover:shadow-md transition-all duration-200">
                  <FaFileAlt className="text-base xl:text-lg" />
                </span>
                <span className="text-[10px] xl:text-xs text-gray-600 group-hover:text-[#256D7B] transition font-medium">Oferta</span>
              </button>
              <button onClick={() => setShowMuriL(true)} className="flex flex-col items-center gap-1 group">
                <span className="w-9 h-9 xl:w-10 xl:h-10 rounded-full bg-[#256D7B]/8 flex items-center justify-center text-[#256D7B] group-hover:bg-[#256D7B] group-hover:text-white group-hover:-translate-y-0.5 group-hover:shadow-md transition-all duration-200">
                  <FaLayerGroup className="text-base xl:text-lg" />
                </span>
                <span className="text-[10px] xl:text-xs text-gray-600 group-hover:text-[#256D7B] transition font-medium">Muri L</span>
              </button>
              <button onClick={() => setShowPilota(true)} className="flex flex-col items-center gap-1 group">
                <span className="w-9 h-9 xl:w-10 xl:h-10 rounded-full bg-[#256D7B]/8 flex items-center justify-center text-[#256D7B] group-hover:bg-[#256D7B] group-hover:text-white group-hover:-translate-y-0.5 group-hover:shadow-md transition-all duration-200">
                  <FaColumns className="text-base xl:text-lg" />
                </span>
                <span className="text-[10px] xl:text-xs text-gray-600 group-hover:text-[#256D7B] transition font-medium">Pilota</span>
              </button>
              <button onClick={() => setShowKonstruksion(true)} className="flex flex-col items-center gap-1 group">
                <span className="w-9 h-9 xl:w-10 xl:h-10 rounded-full bg-[#256D7B]/8 flex items-center justify-center text-[#256D7B] group-hover:bg-[#256D7B] group-hover:text-white group-hover:-translate-y-0.5 group-hover:shadow-md transition-all duration-200">
                  <FaDraftingCompass className="text-base xl:text-lg" />
                </span>
                <span className="text-[10px] xl:text-xs text-gray-600 group-hover:text-[#256D7B] transition font-medium">Konstr.</span>
              </button>
              <button onClick={() => setShowUji(true)} className="flex flex-col items-center gap-1 group">
                <span className="w-9 h-9 xl:w-10 xl:h-10 rounded-full bg-[#256D7B]/8 flex items-center justify-center text-[#256D7B] group-hover:bg-[#256D7B] group-hover:text-white group-hover:-translate-y-0.5 group-hover:shadow-md transition-all duration-200">
                  <FaWater className="text-base xl:text-lg" />
                </span>
                <span className="text-[10px] xl:text-xs text-gray-600 group-hover:text-[#256D7B] transition font-medium">Uji</span>
              </button>
              <button onClick={() => setShowAI(true)} className="flex flex-col items-center gap-1 group">
                <span className="w-9 h-9 xl:w-10 xl:h-10 rounded-full bg-[#256D7B]/8 flex items-center justify-center text-[#256D7B] group-hover:bg-[#256D7B] group-hover:text-white group-hover:-translate-y-0.5 group-hover:shadow-md transition-all duration-200">
                  <FaRobot className="text-base xl:text-lg" />
                </span>
                <span className="text-[10px] xl:text-xs text-gray-600 group-hover:text-[#256D7B] transition font-medium">AI</span>
              </button>
              <button onClick={() => setShowVleresime(true)} className="flex flex-col items-center gap-1 group">
                <span className="w-9 h-9 xl:w-10 xl:h-10 rounded-full bg-[#256D7B]/8 flex items-center justify-center text-[#256D7B] group-hover:bg-[#256D7B] group-hover:text-white group-hover:-translate-y-0.5 group-hover:shadow-md transition-all duration-200">
                  <FaStar className="text-base xl:text-lg" />
                </span>
                <span className="text-[10px] xl:text-xs text-gray-600 group-hover:text-[#256D7B] transition font-medium">Vlerëso</span>
              </button>
              <button onClick={() => setShowGallery(true)} className="flex flex-col items-center gap-1 group">
                <span className="w-9 h-9 xl:w-10 xl:h-10 rounded-full bg-[#256D7B]/8 flex items-center justify-center text-[#256D7B] group-hover:bg-[#256D7B] group-hover:text-white group-hover:-translate-y-0.5 group-hover:shadow-md transition-all duration-200">
                  <FaImages className="text-base xl:text-lg" />
                </span>
                <span className="text-[10px] xl:text-xs text-gray-600 group-hover:text-[#256D7B] transition font-medium">Galeria</span>
              </button>
              <Link href="/kontakti" className="flex flex-col items-center gap-1 group">
                <span className="w-9 h-9 xl:w-10 xl:h-10 rounded-full bg-[#256D7B]/8 flex items-center justify-center text-[#256D7B] group-hover:bg-[#256D7B] group-hover:text-white group-hover:-translate-y-0.5 group-hover:shadow-md transition-all duration-200">
                  <FaEnvelope className="text-base xl:text-lg" />
                </span>
                <span className="text-[10px] xl:text-xs text-gray-600 group-hover:text-[#256D7B] transition font-medium">Kontakt</span>
              </Link>
              <button onClick={() => setShowNaGjeni(true)} className="flex flex-col items-center gap-1 group">
                <span className="w-9 h-9 xl:w-10 xl:h-10 rounded-full bg-[#256D7B]/8 flex items-center justify-center text-[#256D7B] group-hover:bg-[#256D7B] group-hover:text-white group-hover:-translate-y-0.5 group-hover:shadow-md transition-all duration-200">
                  <FaMapMarkerAlt className="text-base xl:text-lg" />
                </span>
                <span className="text-[10px] xl:text-xs text-gray-600 group-hover:text-[#256D7B] transition font-medium">Na Gjeni</span>
              </button>
              <button onClick={() => setShowParashikimi(true)} className="flex flex-col items-center gap-1 group">
                <span className="w-9 h-9 xl:w-10 xl:h-10 rounded-full bg-[#256D7B]/8 flex items-center justify-center text-[#256D7B] group-hover:bg-[#256D7B] group-hover:text-white group-hover:-translate-y-0.5 group-hover:shadow-md transition-all duration-200">
                  <FaCloudSun className="text-base xl:text-lg" />
                </span>
                <span className="text-[10px] xl:text-xs text-gray-600 group-hover:text-[#256D7B] transition font-medium">Moti 5D</span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="lg:hidden text-xl sm:text-2xl text-gray-600 hover:text-[#256D7B] transition p-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>

          {/* Mobile Menu - PËRFSHIN BALLINA NË FILLIM */}
          {isOpen && (
            <div className="lg:hidden pb-4 animate-fadeIn">
              <div className="flex flex-col space-y-2 pt-2 pb-4 border-b border-gray-200">
                <Link href="/" className="text-gray-600 hover:text-[#256D7B] hover:bg-gray-50 px-4 py-3 rounded-lg transition flex items-center text-base min-h-[44px]" onClick={(e) => { handleHomeClick(e); setIsOpen(false); }}>
                  <FaHome className="mr-3 text-[#256D7B]" /> Ballina
                </Link>
                <Link href="/sherbimet" className="text-gray-600 hover:text-[#256D7B] hover:bg-gray-50 px-4 py-3 rounded-lg transition flex items-center text-base min-h-[44px]" onClick={() => setIsOpen(false)}>
                  <FaServicestack className="mr-3 text-[#256D7B]" /> Shërbimet
                </Link>
                <Link href="/produktet" className="text-gray-600 hover:text-[#256D7B] hover:bg-gray-50 px-4 py-3 rounded-lg transition flex items-center text-base min-h-[44px]" onClick={() => setIsOpen(false)}>
                  <FaCube className="mr-3 text-[#256D7B]" /> Produktet
                </Link>
                <Link href="/projektet" className="text-gray-600 hover:text-[#256D7B] hover:bg-gray-50 px-4 py-3 rounded-lg transition flex items-center text-base min-h-[44px]" onClick={() => setIsOpen(false)}>
                  <FaImages className="mr-3 text-[#256D7B]" /> Projektet
                </Link>
                <Link href="/kontakti" className="text-gray-600 hover:text-[#256D7B] hover:bg-gray-50 px-4 py-3 rounded-lg transition flex items-center text-base min-h-[44px]" onClick={() => setIsOpen(false)}>
                  <FaEnvelope className="mr-3 text-[#256D7B]" /> Kontakti
                </Link>
              </div>
              
              <div className="grid grid-cols-4 gap-2 py-4">
                <button onClick={() => { openOferta(); setIsOpen(false); }} className="flex flex-col items-center gap-1.5 p-3 hover:bg-gray-50 rounded-lg transition min-h-[70px]">
                  <span className="w-10 h-10 rounded-full bg-[#256D7B]/8 flex items-center justify-center text-[#256D7B]">
                    <FaFileAlt className="text-lg" />
                  </span>
                  <span className="text-xs text-center font-medium text-gray-700">Oferta</span>
                </button>
                <button onClick={() => { setShowMuriL(true); setIsOpen(false); }} className="flex flex-col items-center gap-1.5 p-3 hover:bg-gray-50 rounded-lg transition min-h-[70px]">
                  <span className="w-10 h-10 rounded-full bg-[#256D7B]/8 flex items-center justify-center text-[#256D7B]">
                    <FaLayerGroup className="text-lg" />
                  </span>
                  <span className="text-xs text-center font-medium text-gray-700">Muri L</span>
                </button>
                <button onClick={() => { setShowPilota(true); setIsOpen(false); }} className="flex flex-col items-center gap-1.5 p-3 hover:bg-gray-50 rounded-lg transition min-h-[70px]">
                  <span className="w-10 h-10 rounded-full bg-[#256D7B]/8 flex items-center justify-center text-[#256D7B]">
                    <FaColumns className="text-lg" />
                  </span>
                  <span className="text-xs text-center font-medium text-gray-700">Pilota</span>
                </button>
                <button onClick={() => { setShowKonstruksion(true); setIsOpen(false); }} className="flex flex-col items-center gap-1.5 p-3 hover:bg-gray-50 rounded-lg transition min-h-[70px]">
                  <span className="w-10 h-10 rounded-full bg-[#256D7B]/8 flex items-center justify-center text-[#256D7B]">
                    <FaDraftingCompass className="text-lg" />
                  </span>
                  <span className="text-xs text-center font-medium text-gray-700">Konstr.</span>
                </button>
                <button onClick={() => { setShowUji(true); setIsOpen(false); }} className="flex flex-col items-center gap-1.5 p-3 hover:bg-gray-50 rounded-lg transition min-h-[70px]">
                  <span className="w-10 h-10 rounded-full bg-[#256D7B]/8 flex items-center justify-center text-[#256D7B]">
                    <FaWater className="text-lg" />
                  </span>
                  <span className="text-xs text-center font-medium text-gray-700">Uji</span>
                </button>
                <button onClick={() => { setShowAI(true); setIsOpen(false); }} className="flex flex-col items-center gap-1.5 p-3 hover:bg-gray-50 rounded-lg transition min-h-[70px]">
                  <span className="w-10 h-10 rounded-full bg-[#256D7B]/8 flex items-center justify-center text-[#256D7B]">
                    <FaRobot className="text-lg" />
                  </span>
                  <span className="text-xs text-center font-medium text-gray-700">AI</span>
                </button>
                <button onClick={() => { setShowVleresime(true); setIsOpen(false); }} className="flex flex-col items-center gap-1.5 p-3 hover:bg-gray-50 rounded-lg transition min-h-[70px]">
                  <span className="w-10 h-10 rounded-full bg-[#256D7B]/8 flex items-center justify-center text-[#256D7B]">
                    <FaStar className="text-lg" />
                  </span>
                  <span className="text-xs text-center font-medium text-gray-700">Vlerëso</span>
                </button>
                <button onClick={() => { setShowGallery(true); setIsOpen(false); }} className="flex flex-col items-center gap-1.5 p-3 hover:bg-gray-50 rounded-lg transition min-h-[70px]">
                  <span className="w-10 h-10 rounded-full bg-[#256D7B]/8 flex items-center justify-center text-[#256D7B]">
                    <FaImages className="text-lg" />
                  </span>
                  <span className="text-xs text-center font-medium text-gray-700">Galeria</span>
                </button>
                <button onClick={() => { setShowNaGjeni(true); setIsOpen(false); }} className="flex flex-col items-center gap-1.5 p-3 hover:bg-gray-50 rounded-lg transition min-h-[70px]">
                  <span className="w-10 h-10 rounded-full bg-[#256D7B]/8 flex items-center justify-center text-[#256D7B]">
                    <FaMapMarkerAlt className="text-lg" />
                  </span>
                  <span className="text-xs text-center font-medium text-gray-700">Na Gjeni</span>
                </button>
                <button onClick={() => { setShowParashikimi(true); setIsOpen(false); }} className="flex flex-col items-center gap-1.5 p-3 hover:bg-gray-50 rounded-lg transition min-h-[70px]">
                  <span className="w-10 h-10 rounded-full bg-[#256D7B]/8 flex items-center justify-center text-[#256D7B]">
                    <FaCloudSun className="text-lg" />
                  </span>
                  <span className="text-xs text-center font-medium text-gray-700">Moti 5D</span>
                </button>
              </div>
            </div>
          )}
        </nav>
      </header>
    </>
  )
}