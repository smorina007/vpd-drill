'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  FaBars, FaTimes, FaClock, FaCloudSun, FaUsers, 
  FaCalculator, FaFileAlt, FaRobot, FaStar, FaEnvelope,
  FaHome, FaServicestack, FaCube, FaImages
} from 'react-icons/fa'
import ModalOferte from './ModalOferte'
import ModalLlogaritesMuriL from './ModalLlogaritesMuriL'
import ModalLlogaritesPilota from './ModalLlogaritesPilota'
import ModalLlogaritesKonstruksion from './ModalLlogaritesKonstruksion'
import ModalAI from './ModalAI'
import ModalVleresime from './ModalVleresime'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentTime, setCurrentTime] = useState('')
  const [weather, setWeather] = useState({ temp: 22, condition: 'Diell' })
  const [visitors, setVisitors] = useState(1247)
  
  // Modal states
  const [showOferte, setShowOferte] = useState(false)
  const [showMuriL, setShowMuriL] = useState(false)
  const [showPilota, setShowPilota] = useState(false)
  const [showKonstruksion, setShowKonstruksion] = useState(false)
  const [showAI, setShowAI] = useState(false)
  const [showVleresime, setShowVleresime] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date()
      setCurrentTime(now.toLocaleTimeString('sq-AL', { 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit' 
      }))
    }, 1000)

    const visitorTimer = setInterval(() => {
      setVisitors(prev => prev + Math.floor(Math.random() * 3))
    }, 30000)

    const weatherTimer = setInterval(() => {
      const temperatures = [18, 19, 20, 21, 22, 23, 24, 25]
      const conditions = ['Diell', 'Pjesërisht me re', 'Vranët', 'Diell']
      setWeather({
        temp: temperatures[Math.floor(Math.random() * temperatures.length)],
        condition: conditions[Math.floor(Math.random() * conditions.length)]
      })
    }, 600000)

    return () => {
      clearInterval(timer)
      clearInterval(visitorTimer)
      clearInterval(weatherTimer)
    }
  }, [])

  return (
    <>
      {/* Modals */}
      <ModalOferte isOpen={showOferte} onClose={() => setShowOferte(false)} />
      <ModalLlogaritesMuriL isOpen={showMuriL} onClose={() => setShowMuriL(false)} />
      <ModalLlogaritesPilota isOpen={showPilota} onClose={() => setShowPilota(false)} />
      <ModalLlogaritesKonstruksion isOpen={showKonstruksion} onClose={() => setShowKonstruksion(false)} />
      <ModalAI isOpen={showAI} onClose={() => setShowAI(false)} />
      <ModalVleresime isOpen={showVleresime} onClose={() => setShowVleresime(false)} />

      <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
        {/* Top bar with real-time info */}
        <div className="bg-gradient-to-r from-[#256D7B] to-[#1a4f5a] text-white text-sm py-1">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap justify-between items-center">
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <FaClock className="mr-1 animate-pulse" />
                  <span className="font-mono">{currentTime || 'Ngarkohet...'}</span>
                </div>
                <div className="flex items-center">
                  <FaCloudSun className="mr-1" />
                  <span>{weather.temp}°C, {weather.condition}</span>
                </div>
              </div>
              <div className="flex items-center">
                <FaUsers className="mr-1" />
                <span className="font-semibold">{visitors.toLocaleString()}</span>
                <span className="ml-1 text-white/80">vizitorë sot</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main navigation */}
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-24"> {/* Rritur nga h-20 në h-24 */}
            {/* Logo - Madhësia e rritur */}
            <Link href="/" className="group">
              <span className="text-3xl md:text-4xl font-bold text-gray-900 hover:text-[#256D7B] transition">
                VPD<span className="text-[#256D7B] group-hover:text-gray-900 transition"> DRILL</span>
              </span>
            </Link>

            {/* Desktop Menu - Majtas */}
            <div className="hidden md:flex items-center space-x-8 ml-8"> {/* Rritur space-x-6 në space-x-8 */}
              <Link href="/" className="text-gray-600 hover:text-[#256D7B] transition font-medium flex items-center text-base">
                <FaHome className="mr-2" /> Ballina
              </Link>
              <Link href="/sherbimet" className="text-gray-600 hover:text-[#256D7B] transition font-medium flex items-center text-base">
                <FaServicestack className="mr-2" /> Shërbimet
              </Link>
              <Link href="/produktet" className="text-gray-600 hover:text-[#256D7B] transition font-medium flex items-center text-base">
                <FaCube className="mr-2" /> Produktet
              </Link>
              <Link href="/projektet" className="text-gray-600 hover:text-[#256D7B] transition font-medium flex items-center text-base">
                <FaImages className="mr-2" /> Projektet
              </Link>
            </div>

            {/* Desktop Icons - Djathtas */}
            <div className="hidden md:flex items-center space-x-5"> {/* Rritur pak hapësirën */}
              <button 
                onClick={() => setShowOferte(true)}
                className="flex flex-col items-center text-gray-600 hover:text-[#256D7B] transition group"
                title="Kërko Ofertë"
              >
                <FaFileAlt className="text-xl group-hover:scale-110 transition" />
                <span className="text-xs mt-1">Oferta</span>
              </button>

              <button 
                onClick={() => setShowMuriL(true)}
                className="flex flex-col items-center text-gray-600 hover:text-[#256D7B] transition group"
                title="Llogaritësi i Murit L"
              >
                <FaCalculator className="text-xl group-hover:scale-110 transition" />
                <span className="text-xs mt-1">Muri L</span>
              </button>

              <button 
                onClick={() => setShowPilota(true)}
                className="flex flex-col items-center text-gray-600 hover:text-[#256D7B] transition group"
                title="Llogaritësi i Pilotave"
              >
                <FaCalculator className="text-xl group-hover:scale-110 transition" />
                <span className="text-xs mt-1">Pilota</span>
              </button>

              <button 
                onClick={() => setShowKonstruksion(true)}
                className="flex flex-col items-center text-gray-600 hover:text-[#256D7B] transition group"
                title="Llogaritësi i Konstruksioneve"
              >
                <FaCalculator className="text-xl group-hover:scale-110 transition" />
                <span className="text-xs mt-1">Konstr.</span>
              </button>

              <button 
                onClick={() => setShowAI(true)}
                className="flex flex-col items-center text-gray-600 hover:text-[#256D7B] transition group"
                title="Asistenti AI"
              >
                <FaRobot className="text-xl group-hover:scale-110 transition" />
                <span className="text-xs mt-1">AI</span>
              </button>

              <button 
                onClick={() => setShowVleresime(true)}
                className="flex flex-col items-center text-gray-600 hover:text-[#256D7B] transition group"
                title="Vlerëso Shërbimin"
              >
                <FaStar className="text-xl group-hover:scale-110 transition" />
                <span className="text-xs mt-1">Vlerëso</span>
              </button>

              <Link 
                href="/kontakti" 
                className="flex flex-col items-center text-gray-600 hover:text-[#256D7B] transition group"
                title="Kontakti"
              >
                <FaEnvelope className="text-xl group-hover:scale-110 transition" />
                <span className="text-xs mt-1">Kontakt</span>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-2xl text-gray-600 hover:text-[#256D7B] transition"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <div className="md:hidden pb-4 animate-fadeIn">
              {/* Mobile Navigation Links */}
              <div className="flex flex-col space-y-2 pt-2 pb-4 border-b border-gray-200">
                <Link href="/" className="text-gray-600 hover:text-[#256D7B] hover:bg-gray-50 px-4 py-2 rounded-lg transition flex items-center text-base" onClick={() => setIsOpen(false)}>
                  <FaHome className="mr-2 text-[#256D7B]" /> Ballina
                </Link>
                <Link href="/sherbimet" className="text-gray-600 hover:text-[#256D7B] hover:bg-gray-50 px-4 py-2 rounded-lg transition flex items-center text-base" onClick={() => setIsOpen(false)}>
                  <FaServicestack className="mr-2 text-[#256D7B]" /> Shërbimet
                </Link>
                <Link href="/produktet" className="text-gray-600 hover:text-[#256D7B] hover:bg-gray-50 px-4 py-2 rounded-lg transition flex items-center text-base" onClick={() => setIsOpen(false)}>
                  <FaCube className="mr-2 text-[#256D7B]" /> Produktet
                </Link>
                <Link href="/projektet" className="text-gray-600 hover:text-[#256D7B] hover:bg-gray-50 px-4 py-2 rounded-lg transition flex items-center text-base" onClick={() => setIsOpen(false)}>
                  <FaImages className="mr-2 text-[#256D7B]" /> Projektet
                </Link>
              </div>
              
              {/* Mobile Icons Grid */}
              <div className="grid grid-cols-4 gap-2 py-4">
                <button onClick={() => { setShowOferte(true); setIsOpen(false); }} className="flex flex-col items-center p-2 hover:bg-gray-50 rounded-lg transition">
                  <FaFileAlt className="text-xl text-[#256D7B]" />
                  <span className="text-xs mt-1 text-center">Oferta</span>
                </button>
                <button onClick={() => { setShowMuriL(true); setIsOpen(false); }} className="flex flex-col items-center p-2 hover:bg-gray-50 rounded-lg transition">
                  <FaCalculator className="text-xl text-[#256D7B]" />
                  <span className="text-xs mt-1 text-center">Muri L</span>
                </button>
                <button onClick={() => { setShowPilota(true); setIsOpen(false); }} className="flex flex-col items-center p-2 hover:bg-gray-50 rounded-lg transition">
                  <FaCalculator className="text-xl text-[#256D7B]" />
                  <span className="text-xs mt-1 text-center">Pilota</span>
                </button>
                <button onClick={() => { setShowKonstruksion(true); setIsOpen(false); }} className="flex flex-col items-center p-2 hover:bg-gray-50 rounded-lg transition">
                  <FaCalculator className="text-xl text-[#256D7B]" />
                  <span className="text-xs mt-1 text-center">Konstr.</span>
                </button>
                <button onClick={() => { setShowAI(true); setIsOpen(false); }} className="flex flex-col items-center p-2 hover:bg-gray-50 rounded-lg transition">
                  <FaRobot className="text-xl text-[#256D7B]" />
                  <span className="text-xs mt-1 text-center">AI</span>
                </button>
                <button onClick={() => { setShowVleresime(true); setIsOpen(false); }} className="flex flex-col items-center p-2 hover:bg-gray-50 rounded-lg transition">
                  <FaStar className="text-xl text-[#256D7B]" />
                  <span className="text-xs mt-1 text-center">Vlerëso</span>
                </button>
                <Link href="/kontakti" className="flex flex-col items-center p-2 hover:bg-gray-50 rounded-lg transition" onClick={() => setIsOpen(false)}>
                  <FaEnvelope className="text-xl text-[#256D7B]" />
                  <span className="text-xs mt-1 text-center">Kontakt</span>
                </Link>
              </div>
            </div>
          )}
        </nav>
      </header>
    </>
  )
}