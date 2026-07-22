'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { FaArrowRight, FaCheckCircle, FaSpinner } from 'react-icons/fa'
import { motion } from 'framer-motion'
import { useOferta } from '@/app/context/OfertaContext'

export default function Hero() {
  const { openOferta } = useOferta()
  const [currentTime, setCurrentTime] = useState('')
  const [weather, setWeather] = useState<{ temp: number; condition: string } | null>(null)
  const [weatherLoading, setWeatherLoading] = useState(true)

  // Ora reale
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
    const interval = setInterval(fetchWeather, 1800000)
    return () => clearInterval(interval)
  }, [])

  const stats = [
    { number: '500m', label: 'Terene te forta' },
    { number: '55m', label: 'Terene te buta' },
    { number: '10+', label: 'Makineri Shpimi' },
    { number: '100%', label: 'Klientë' }
  ]

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero/casagrande.jpg"
          alt="VPD DRILL - Makineri Casagrande në punë"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 py-12">
        <div className="max-w-3xl text-white">
          {/* Badge */}
          <div className="inline-flex items-center bg-white/10 px-3 py-1.5 rounded-full border border-white/20 mb-4">
            <span className="w-2 h-2 bg-[#256D7B] rounded-full mr-2 animate-pulse" />
            <span className="text-xs font-medium">Ekspertizë Gjeoteknike</span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3">
            Ekspertizë e Thellë,{' '}
            <span className="text-[#256D7B]">Themele të Sigurta</span>
          </h1>

          <p className="text-sm text-gray-200 mb-4">
            Specialiste në shpime, puse uji, pilota, ankera, germim me diafragmë.
          </p>

          {/* Features */}
          <div className="grid grid-cols-2 gap-2 mb-6">
            <div className="flex items-center text-gray-200">
              <FaCheckCircle className="text-[#256D7B] mr-1 text-sm" />
              <span className="text-sm">500m <strong>Thellësi në terene te forta</strong></span>
            </div>
            <div className="flex items-center text-gray-200">
              <FaCheckCircle className="text-[#256D7B] mr-1 text-sm" />
              <span className="text-sm">55m <strong>Thellësi në terene te buta</strong></span>
            </div>
            <div className="flex items-center text-gray-200">
              <FaCheckCircle className="text-[#256D7B] mr-1 text-sm" />
              <span className="text-sm">Germim diafragmë</span>
            </div>
            <div className="flex items-center text-gray-200">
              <FaCheckCircle className="text-[#256D7B] mr-1 text-sm" />
              <span className="text-sm">10+ makineri</span>
            </div>
          </div>

          {/* Butonat */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={openOferta}
              className="bg-white text-[#256D7B] px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition text-sm text-center shadow-lg"
            >
              Kërko Ofertë
            </button>
            <Link
              href="/projektet"
              className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition text-sm text-center"
            >
              Shiko Projektet
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Bar - VETËM STATISTIKAT, ORA DHE MOTI */}
      <div className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-md border-t border-white/10">
        <div className="container mx-auto px-4">
          {/* Statistikat */}
          <div className="grid grid-cols-4 gap-1 py-2">
            {stats.map((stat, i) => (
              <div key={i} className="text-center text-white">
                <div className="text-base font-bold text-[#256D7B]">{stat.number}</div>
                <div className="text-[9px] text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
          
          {/* Ora dhe moti - PA VIZITORË */}
          <div className="flex justify-center items-center py-2 border-t border-white/20 text-[11px] text-gray-300">
            <div className="flex items-center gap-4">
              <span>⏱️ {currentTime}</span>
              <span className="w-px h-3 bg-white/20"></span>
              <span>🌡️ {weatherLoading ? <FaSpinner className="animate-spin inline" /> : weather ? `${weather.temp}°C, ${weather.condition}` : 'Moti N/A'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute bottom-28 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center cursor-pointer"
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
    </section>
  )
}