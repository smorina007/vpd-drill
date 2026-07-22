'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { 
  FaBars, FaTimes, FaClock, FaCloudSun, FaUsers, 
  FaCalculator, FaFileAlt, FaRobot, FaStar, FaEnvelope,
  FaHome, FaServicestack, FaCube, FaImages, FaWater,
  FaSpinner
} from 'react-icons/fa'
import { useOferta } from '@/app/context/OfertaContext'
import ModalLlogaritesMuriL from './ModalLlogaritesMuriL'
import ModalLlogaritesPilota from './ModalLlogaritesPilota'
import ModalLlogaritesKonstruksion from './ModalLlogaritesKonstruksion'
import ModalLlogaritesUji from './ModalLlogaritesUji'
import ModalAI from './ModalAI'
import ModalVleresime from './ModalVleresime'
import GalleryViewerModal from './GalleryViewerModal'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentTime, setCurrentTime] = useState('')
  const [weather, setWeather] = useState<{ temp: number; condition: string } | null>(null)
  const [weatherLoading, setWeatherLoading] = useState(true)
  const [showGallery, setShowGallery] = useState(false)

  const [showMuriL, setShowMuriL] = useState(false)
  const [showPilota, setShowPilota] = useState(false)
  const [showKonstruksion, setShowKonstruksion] = useState(false)
  const [showUji, setShowUji] = useState(false)
  const [showAI, setShowAI] = useState(false)
  const [showVleresime, setShowVleresime] = useState(false)

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

  // Moti real – Open-Meteo
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await fetch(
          'https://api.open-meteo.com/v1/forecast?latitude=42.48&longitude=20.75&current_weather=true'
        )
        const data = await res.json()
        if (data.current_weather) {
          const code = data.current_weather.weathercode
          let condition = 'Diell'
          if (code > 0) condition = 'Vranët'
          if (code >= 51 && code <= 67) condition = 'Shi'
          if (code >= 71 && code <= 77) condition = 'Borë'
          setWeather({
            temp: Math.round(data.current_weather.temperature),
            condition
          })
        } else {
          setWeather({ temp: 22, condition: 'Diell' })
        }
      } catch (error) {
        console.error('Weather fetch failed:', error)
        setWeather({ temp: 22, condition: 'Diell' })
      } finally {
        setWeatherLoading(false)
      }
    }

    fetchWeather()
    const interval = setInterval(fetchWeather, 1800000) // 30 minuta
    return () => clearInterval(interval)
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
        onSubmit={(newVleresim) => {
          console.log('Vlerësim i ri nga header:', newVleresim)
        }}
      />
      <GalleryViewerModal isOpen={showGallery} onClose={() => setShowGallery(false)} />

      <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
        {/* Top bar - info reale */}
        <div className="hidden sm:block bg-gradient-to-r from-[#256D7B] to-[#1a4f5a] text-white text-sm py-1">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <FaClock className="mr-1 animate-pulse" />
                  <span className="font-mono">{currentTime}</span>
                </div>
                <div className="flex items-center min-w-[100px]">
                  <FaCloudSun className="mr-1" />
                  {weatherLoading ? (
                    <FaSpinner className="animate-spin" />
                  ) : weather ? (
                    <span>{weather.temp}°C, {weather.condition}</span>
                  ) : (
                    <span>Moti N/A</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main navigation */}
        <nav className="container mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20 lg:h-24">
            {/* Logo + Emri i Kompanisë (klikimi të çon në home) */}
            <Link href="/" className="flex items-center space-x-2 group">
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
            <div className="hidden lg:flex items-center space-x-6 xl:space-x-8 ml-8">
              <Link href="/" className="text-gray-600 hover:text-[#256D7B] transition font-medium flex items-center text-sm xl:text-base">
                <FaHome className="mr-2" /> Ballina
              </Link>
              <Link href="/sherbimet" className="text-gray-600 hover:text-[#256D7B] transition font-medium flex items-center text-sm xl:text-base">
                <FaServicestack className="mr-2" /> Shërbimet
              </Link>
              <Link href="/produktet" className="text-gray-600 hover:text-[#256D7B] transition font-medium flex items-center text-sm xl:text-base">
                <FaCube className="mr-2" /> Produktet
              </Link>
              <Link href="/projektet" className="text-gray-600 hover:text-[#256D7B] transition font-medium flex items-center text-sm xl:text-base">
                <FaImages className="mr-2" /> Projektet
              </Link>
            </div>

            {/* Desktop Icons */}
            <div className="hidden lg:flex items-center space-x-3 xl:space-x-5">
              <button onClick={openOferta} className="flex flex-col items-center text-gray-600 hover:text-[#256D7B] transition group">
                <FaFileAlt className="text-lg xl:text-xl group-hover:scale-110 transition" />
                <span className="text-[10px] xl:text-xs mt-1">Oferta</span>
              </button>
              <button onClick={() => setShowMuriL(true)} className="flex flex-col items-center text-gray-600 hover:text-[#256D7B] transition group">
                <FaCalculator className="text-lg xl:text-xl group-hover:scale-110 transition" />
                <span className="text-[10px] xl:text-xs mt-1">Muri L</span>
              </button>
              <button onClick={() => setShowPilota(true)} className="flex flex-col items-center text-gray-600 hover:text-[#256D7B] transition group">
                <FaCalculator className="text-lg xl:text-xl group-hover:scale-110 transition" />
                <span className="text-[10px] xl:text-xs mt-1">Pilota</span>
              </button>
              <button onClick={() => setShowKonstruksion(true)} className="flex flex-col items-center text-gray-600 hover:text-[#256D7B] transition group">
                <FaCalculator className="text-lg xl:text-xl group-hover:scale-110 transition" />
                <span className="text-[10px] xl:text-xs mt-1">Konstr.</span>
              </button>
              <button onClick={() => setShowUji(true)} className="flex flex-col items-center text-gray-600 hover:text-[#256D7B] transition group">
                <FaWater className="text-lg xl:text-xl group-hover:scale-110 transition" />
                <span className="text-[10px] xl:text-xs mt-1">Uji</span>
              </button>
              <button onClick={() => setShowAI(true)} className="flex flex-col items-center text-gray-600 hover:text-[#256D7B] transition group">
                <FaRobot className="text-lg xl:text-xl group-hover:scale-110 transition" />
                <span className="text-[10px] xl:text-xs mt-1">AI</span>
              </button>
              <button onClick={() => setShowVleresime(true)} className="flex flex-col items-center text-gray-600 hover:text-[#256D7B] transition group">
                <FaStar className="text-lg xl:text-xl group-hover:scale-110 transition" />
                <span className="text-[10px] xl:text-xs mt-1">Vlerëso</span>
              </button>
              <button onClick={() => setShowGallery(true)} className="flex flex-col items-center text-gray-600 hover:text-[#256D7B] transition group">
                <FaImages className="text-lg xl:text-xl group-hover:scale-110 transition" />
                <span className="text-[10px] xl:text-xs mt-1">Galeria</span>
              </button>
              <Link href="/kontakti" className="flex flex-col items-center text-gray-600 hover:text-[#256D7B] transition group">
                <FaEnvelope className="text-lg xl:text-xl group-hover:scale-110 transition" />
                <span className="text-[10px] xl:text-xs mt-1">Kontakt</span>
              </Link>
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
                <Link href="/" className="text-gray-600 hover:text-[#256D7B] hover:bg-gray-50 px-4 py-3 rounded-lg transition flex items-center text-base min-h-[44px]" onClick={() => setIsOpen(false)}>
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
                <button onClick={() => { openOferta(); setIsOpen(false); }} className="flex flex-col items-center p-3 hover:bg-gray-50 rounded-lg transition min-h-[70px]">
                  <FaFileAlt className="text-xl text-[#256D7B]" />
                  <span className="text-xs mt-1 text-center">Oferta</span>
                </button>
                <button onClick={() => { setShowMuriL(true); setIsOpen(false); }} className="flex flex-col items-center p-3 hover:bg-gray-50 rounded-lg transition min-h-[70px]">
                  <FaCalculator className="text-xl text-[#256D7B]" />
                  <span className="text-xs mt-1 text-center">Muri L</span>
                </button>
                <button onClick={() => { setShowPilota(true); setIsOpen(false); }} className="flex flex-col items-center p-3 hover:bg-gray-50 rounded-lg transition min-h-[70px]">
                  <FaCalculator className="text-xl text-[#256D7B]" />
                  <span className="text-xs mt-1 text-center">Pilota</span>
                </button>
                <button onClick={() => { setShowKonstruksion(true); setIsOpen(false); }} className="flex flex-col items-center p-3 hover:bg-gray-50 rounded-lg transition min-h-[70px]">
                  <FaCalculator className="text-xl text-[#256D7B]" />
                  <span className="text-xs mt-1 text-center">Konstr.</span>
                </button>
                <button onClick={() => { setShowUji(true); setIsOpen(false); }} className="flex flex-col items-center p-3 hover:bg-gray-50 rounded-lg transition min-h-[70px]">
                  <FaWater className="text-xl text-[#256D7B]" />
                  <span className="text-xs mt-1 text-center">Uji</span>
                </button>
                <button onClick={() => { setShowAI(true); setIsOpen(false); }} className="flex flex-col items-center p-3 hover:bg-gray-50 rounded-lg transition min-h-[70px]">
                  <FaRobot className="text-xl text-[#256D7B]" />
                  <span className="text-xs mt-1 text-center">AI</span>
                </button>
                <button onClick={() => { setShowVleresime(true); setIsOpen(false); }} className="flex flex-col items-center p-3 hover:bg-gray-50 rounded-lg transition min-h-[70px]">
                  <FaStar className="text-xl text-[#256D7B]" />
                  <span className="text-xs mt-1 text-center">Vlerëso</span>
                </button>
                <button onClick={() => { setShowGallery(true); setIsOpen(false); }} className="flex flex-col items-center p-3 hover:bg-gray-50 rounded-lg transition min-h-[70px]">
                  <FaImages className="text-xl text-[#256D7B]" />
                  <span className="text-xs mt-1 text-center">Galeria</span>
                </button>
              </div>
            </div>
          )}
        </nav>
      </header>
    </>
  )
}