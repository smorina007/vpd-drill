'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { FaCheckCircle, FaSpinner, FaArrowRight, FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { motion, AnimatePresence } from 'framer-motion'
import { useOferta } from '@/app/context/OfertaContext'
import { useWeather } from '@/app/context/WeatherContext'
import WeatherEffects from '@/components/WeatherEffects'

export default function Hero() {
  const { openOferta } = useOferta()
  const [currentTime, setCurrentTime] = useState('')
  const { weather, loading: weatherLoading } = useWeather()
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0)
  const audioCtxRef = useRef<AudioContext | null>(null)

  const projects = [
    { id: 1, title: 'Projekt në Prishtinë', image: '/images/projekte/p1.jpeg' },
    { id: 2, title: 'Projekt në Prishtinë', image: '/images/projekte/p2.jpeg' },
    { id: 3, title: 'Projekt në Prishtinë', image: '/images/projekte/p3.jpeg' },
    { id: 4, title: 'Projekt në Prishtinë', image: '/images/projekte/p4.jpeg' },
    { id: 5, title: 'Projekt në Prishtinë', image: '/images/projekte/p5.jpeg' },
    { id: 6, title: 'Projekt në Prishtinë', image: '/images/projekte/p6.jpeg' },
    { id: 7, title: 'Projekt në Prishtinë', image: '/images/projekte/p7.jpeg' },
    { id: 8, title: 'Projekt në Prishtinë', image: '/images/projekte/p8.jpeg' },
    { id: 9, title: 'Projekt në Prishtinë', image: '/images/projekte/p9.jpeg' },
    { id: 10, title: 'Projekt në Prishtinë', image: '/images/projekte/p10.jpeg' },
    { id: 11, title: 'Projekt në Prishtinë', image: '/images/projekte/p11.jpeg' },
    { id: 12, title: 'Projekt në Prishtinë', image: '/images/projekte/p12.jpeg' },
    { id: 13, title: 'Projekt në Prishtinë', image: '/images/projekte/p13.jpeg' },
    { id: 14, title: 'Projekt në Prishtinë', image: '/images/projekte/p14.jpeg' },
    { id: 15, title: 'Projekt në Prishtinë', image: '/images/projekte/p15.jpeg' },
    { id: 16, title: 'Projekt në Prishtinë', image: '/images/projekte/p16.jpeg' },
    { id: 17, title: 'Projekt në Prishtinë', image: '/images/projekte/p17.jpeg' },
    { id: 18, title: 'Projekt në Prishtinë', image: '/images/projekte/p18.jpeg' },
    { id: 19, title: 'Projekt në Prishtinë', image: '/images/projekte/p19.jpeg' },
    { id: 20, title: 'Projekt në Prishtinë', image: '/images/projekte/p20.jpeg' },
    { id: 21, title: 'Projekt në Prishtinë', image: '/images/projekte/p21.jpeg' },
    { id: 22, title: 'Projekt në Prishtinë', image: '/images/projekte/p22.jpeg' },
    { id: 23, title: 'Projekt në Prishtinë', image: '/images/projekte/p23.jpeg' },
    { id: 24, title: 'Projekt në Prishtinë', image: '/images/projekte/p24.jpeg' },
    { id: 25, title: 'Projekt në Prishtinë', image: '/images/projekte/p25.jpeg' },
    { id: 26, title: 'Projekt në Prishtinë', image: '/images/projekte/p26.jpeg' },
    { id: 27, title: 'Projekt në Prishtinë', image: '/images/projekte/p27.jpeg' },
    { id: 28, title: 'Projekt në Prishtinë', image: '/images/projekte/p28.jpeg' },
    { id: 29, title: 'Projekt në Prishtinë', image: '/images/projekte/p29.jpeg' },

  ]

  const playClickSound = () => {
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
      }
      const ctx = audioCtxRef.current
      const oscillator = ctx.createOscillator()
      const gainNode = ctx.createGain()
      oscillator.connect(gainNode)
      gainNode.connect(ctx.destination)
      oscillator.frequency.value = 1200
      oscillator.type = 'sine'
      gainNode.gain.setValueAtTime(0.12, ctx.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08)
      oscillator.start(ctx.currentTime)
      oscillator.stop(ctx.currentTime + 0.08)
    } catch (e) {}
  }

  useEffect(() => {
    setCurrentTime(new Date().toLocaleTimeString('sq-AL', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }))
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString('sq-AL', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }))
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentProjectIndex((prev) => (prev + 1) % projects.length)
    }, 4500)
    return () => clearInterval(interval)
  }, [projects.length])

  useEffect(() => {
    playClickSound()
  }, [currentProjectIndex])

  const stats = [
    { number: '500m thellësi', label: 'Terene te forta' },
    { number: '55m thellësi ', label: 'Terene te buta' },
    { number: '10+', label: 'Makineri shpimi' },
    { number: '>90 %', label: 'Klientë të knaqur' }
  ]

  const goToProject = (index: number) => {
    setCurrentProjectIndex(index)
  }

  const prevProject = () => {
    setCurrentProjectIndex((prev) => (prev - 1 + projects.length) % projects.length)
  }

  const nextProject = () => {
    setCurrentProjectIndex((prev) => (prev + 1) % projects.length)
  }

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* ========================== */}
{/*        MOBILE HERO          */}
{/* ========================== */}
<div className="md:hidden relative w-full h-full min-h-screen">
  {/* Background Image */}
  <div className="absolute inset-0 z-0">
    <Image
      src="/images/hero/casagrande1.jpg"
      alt="VPD DRILL"
      fill
      className="object-cover object-[center_20%] scale-[1]"
      priority
    />
    <WeatherEffects condition={weather?.condition ?? null} className="z-[1]" />
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
  </div>

    {/* Butonat - në këndin e majtë, pak më poshtë (top-24) */}
  <div className="absolute top-20 left-4 z-10 flex flex-col gap-3 w-auto">
    <button
      onClick={openOferta}
      className="bg-white text-[#256D7B] px-5 py-2.5 rounded-lg font-semibold text-sm text-center shadow-lg w-36"
    >
      Kërko Ofertë
    </button>
    <Link
      href="/projektet"
      className="bg-white text-[#256D7B] px-5 py-2.5 rounded-lg font-semibold text-sm text-center shadow-lg w-36"
    >
      Projektet
    </Link>
  </div>

  {/* Slogan - në qendër (mund të mbetet ose të zhvendoset) */}
   <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 text-center w-full px-4 pointer-events-none">
    <p className="text-white font-bold text-8xl tracking-wider drop-shadow-2xl leading-tight">
      Themele të Sigurta
    </p>
    <p className="text-[#256D7B] font-semibold text-7xl tracking-[0.15em] drop-shadow-2xl mt-2 leading-tight">
      për të Ardhmen
    </p>
  </div>

  {/* Shiriti i statistikave – fund */}
  <div className="absolute bottom-0 left-0 right-0 z-10 bg-black/60 backdrop-blur-md border-t border-white/10">
    <div className="grid grid-cols-4 gap-1 py-2 px-2">
      {stats.map((stat, i) => (
        <div key={i} className="text-center text-white">
          <div className="text-sm font-bold text-[#256D7B]">{stat.number}</div>
          <div className="text-[8px] text-gray-300">{stat.label}</div>
        </div>
      ))}
    </div>
    <div className="flex justify-center items-center py-1.5 border-t border-white/10 text-[10px] text-gray-300 gap-4">
      <span>⏱️ {currentTime}</span>
      <span className="w-px h-3 bg-white/20"></span>
      <span>🌡️ {weatherLoading ? <FaSpinner className="animate-spin inline" /> : weather ? `${weather.temp}°C` : 'N/A'}</span>
    </div>
  </div>
</div>

      {/* ========================== */}
      {/*      DESKTOP HERO          */}
      {/* ========================== */}
      <div className="hidden md:block relative w-full min-h-screen">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero/casagrande.jpg"
            alt="VPD DRILL - Makineri Casagrande në punë"
            fill
            className="object-cover object-center"
            priority
          />
          <WeatherEffects condition={weather?.condition ?? null} className="z-[1]" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent" />
          <div className="absolute inset-0 bg-white/5" />
        </div>

        {/* Logo lart */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20 text-center">
          <h1 className="text-white font-bold text-4xl lg:text-5xl tracking-wider drop-shadow-lg">
            VPD DRILL
          </h1>
          <p className="text-[#256D7B] text-lg font-medium tracking-[0.3em]">SHPK</p>
          <div className="w-16 h-0.5 bg-[#256D7B] mx-auto mt-2" />
        </div>

        {/* Slogan */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 text-center w-full px-4 pointer-events-none">
          <p className="text-white/80 text-xl font-light tracking-[0.3em] uppercase drop-shadow-lg">
            Themele të Sigurta për të Ardhmen
          </p>
        </div>

        {/* Galeria anësore e Projekteve – e njëjtë si më parë */}
        <div className="absolute right-8 lg:right-16 top-1/2 -translate-y-1/2 z-10 w-80 lg:w-[340px]">
          <div className="bg-white/10 backdrop-blur-2xl rounded-3xl overflow-hidden border border-white/20 shadow-2xl shadow-black/40">
            {/* Header */}
            <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between">
              <h3 className="text-white font-semibold flex items-center gap-2 text-sm">
                <span className="w-2 h-2 bg-[#256D7B] rounded-full animate-pulse" />
                Projektet e Fundit
              </h3>
              <span className="text-[#256D7B] text-xs font-bold">
                {String(currentProjectIndex + 1).padStart(2, '0')}/{String(projects.length).padStart(2, '0')}
              </span>
            </div>

            {/* Foto */}
            <div className="relative h-72 lg:h-80 overflow-hidden bg-black/30">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentProjectIndex}
                  initial={{ opacity: 0, scale: 0.9, rotateY: -8 }}
                  animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                  exit={{ opacity: 0, scale: 1.1, rotateY: 8 }}
                  transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                  className="absolute inset-0 flex items-center justify-center p-4"
                >
                  <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-xl bg-black/20">
                    <Image
                      src={projects[currentProjectIndex].image}
                      alt={projects[currentProjectIndex].title}
                      fill
                      className="object-cover"
                      sizes="400px"
                      priority={currentProjectIndex === 0}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <p className="text-white font-medium drop-shadow-lg text-sm">
                        {projects[currentProjectIndex].title}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Kontrollet */}
            <div className="px-5 py-4 border-t border-white/10 flex justify-between items-center">
              <div className="flex gap-2">
                <button
                  onClick={prevProject}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                >
                  <FaChevronLeft size={14} />
                </button>
                <button
                  onClick={nextProject}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                >
                  <FaChevronRight size={14} />
                </button>
              </div>
              <div className="flex gap-1.5">
                {projects.slice(0, 5).map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => goToProject(idx)}
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      idx === currentProjectIndex % 5
                        ? 'w-8 bg-[#256D7B] shadow-lg shadow-[#256D7B]/50'
                        : 'w-2 bg-white/30 hover:bg-white/60'
                    }`}
                  />
                ))}
                {projects.length > 5 && (
                  <span className="text-[10px] text-white/50 self-center ml-1">+{projects.length - 5}</span>
                )}
              </div>
              <Link
                href="/projektet"
                className="text-[#256D7B] text-xs font-medium hover:underline flex items-center gap-1.5 group"
              >
                <span>Të gjitha</span>
                <FaArrowRight size={10} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>

        {/* Butonat poshtë – pa tekst tjetër */}
        <div className="container mx-auto px-6 relative z-10 h-full flex items-end pb-12">
          <div className="max-w-3xl text-white pb-8">
            <div className="flex flex-row gap-4">
              <button
                onClick={openOferta}
                className="bg-white text-[#256D7B] px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition text-sm shadow-lg"
              >
                Kërko Ofertë
              </button>
              <Link
                href="/projektet"
                className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition text-sm"
              >
                Shiko Projektet
              </Link>
            </div>
          </div>
        </div>

        {/* Shiriti i statistikave */}
        <div className="absolute bottom-0 left-0 right-0 z-10 bg-black/60 backdrop-blur-md border-t border-white/10">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-4 gap-1 py-2">
              {stats.map((stat, i) => (
                <div key={i} className="text-center text-white">
                  <div className="text-lg font-bold text-[#256D7B]">{stat.number}</div>
                  <div className="text-[10px] text-gray-300">{stat.label}</div>
                </div>
              ))}
            </div>
            <div className="flex justify-center items-center py-2 border-t border-white/20 text-xs text-gray-300 gap-4">
              <span>⏱️ {currentTime}</span>
              <span className="w-px h-4 bg-white/20"></span>
              <span>🌡️ {weatherLoading ? <FaSpinner className="animate-spin inline" /> : weather ? `${weather.temp}°C, ${weather.condition}` : 'Moti N/A'}</span>
            </div>
          </div>
        </div>

        {/* Scroll Down */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.8 }}
          className="absolute bottom-28 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center cursor-pointer"
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
        >
          <span className="text-white/60 text-xs mb-2">Eksploro</span>
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1 h-2 bg-white rounded-full mt-2"
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}