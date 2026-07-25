'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { FaMapMarkerAlt, FaTimes } from 'react-icons/fa'

interface Projekti {
  id: number
  titulli: string
  kategoria: string
  lokacioni: string
  foto: string
  data: string
}

// Koordinata reale (përafërt) të qyteteve — përdoren vetëm për pozicionimin
// relativ të "pin"-ave mbi hartë, jo si kufij precizë kartografikë.
const QYTETET: Record<string, { lat: number; lng: number }> = {
  'Prishtinë': { lat: 42.6629, lng: 21.1655 },
  'Prishtine': { lat: 42.6629, lng: 21.1655 },
  'Prizren': { lat: 42.2139, lng: 20.7397 },
  'Gjilan': { lat: 42.4633, lng: 21.4694 },
  'Suharekë': { lat: 42.3597, lng: 20.8244 },
  'Suhareke': { lat: 42.3597, lng: 20.8244 },
  'Klinë': { lat: 42.6178, lng: 20.5761 },
  'Kline': { lat: 42.6178, lng: 20.5761 },
  'Vushtrri': { lat: 42.8228, lng: 20.9678 },
  'Malishevë': { lat: 42.4822, lng: 20.7464 },
  'Malisheve': { lat: 42.4822, lng: 20.7464 },
  'Pejë': { lat: 42.6597, lng: 20.2889 },
  'Ferizaj': { lat: 42.3703, lng: 21.1553 },
  'Mitrovicë': { lat: 42.8914, lng: 20.8660 },
  'Gjakovë': { lat: 42.3803, lng: 20.4310 },
}

// Kufijtë përafërt të Kosovës (për normalizim lat/lng -> pozicion në hartë)
const BOUNDS = { latMin: 41.85, latMax: 43.28, lngMin: 20.02, lngMax: 21.82 }

function pozicioni(qyteti: string) {
  const koord = QYTETET[qyteti] ?? QYTETET['Prishtinë']
  const x = ((koord.lng - BOUNDS.lngMin) / (BOUNDS.lngMax - BOUNDS.lngMin)) * 100
  const y = (1 - (koord.lat - BOUNDS.latMin) / (BOUNDS.latMax - BOUNDS.latMin)) * 100
  return { x, y }
}

export default function HartaProjekteve({ projektet }: { projektet: Projekti[] }) {
  const [aktivi, setAktivi] = useState<string | null>(null)

  const grupetSipasQytetit = useMemo(() => {
    const grupe: Record<string, Projekti[]> = {}
    projektet.forEach((p) => {
      const emriNormal = p.lokacioni.replace('Prishtine', 'Prishtinë').replace('Malisheve', 'Malishevë').replace('Suhareke', 'Suharekë').replace('Kline', 'Klinë')
      if (!grupe[emriNormal]) grupe[emriNormal] = []
      grupe[emriNormal].push(p)
    })
    return grupe
  }, [projektet])

  const qytetet = Object.keys(grupetSipasQytetit)
  const maxCount = Math.max(...qytetet.map((q) => grupetSipasQytetit[q].length))

  return (
    <div className="max-w-md mx-auto bg-gradient-to-br from-[#0f2b33] to-[#0a1f26] rounded-2xl overflow-hidden border border-white/10 shadow-xl">
      <div className="px-4 sm:px-5 pt-4 sm:pt-5">
        <h3 className="text-white font-bold text-base sm:text-lg flex items-center gap-2">
          <FaMapMarkerAlt className="text-[#7fc8d9]" />
          Ku kemi punuar
        </h3>
        <p className="text-white/60 text-xs sm:text-sm mt-1">
          {projektet.length} projekte në {qytetet.length} qytete anembanë Kosovës
        </p>
      </div>

      <div className="relative w-full aspect-[4/5] sm:aspect-[1/1] mt-3">
        {/* Silueta e Kosovës — nxjerrë dhe mbushur nga logoja e kompanisë */}
        <div className="absolute inset-0 flex items-center justify-center opacity-25 pointer-events-none">
          <div className="relative w-[85%] h-[85%]">
            <Image src="/images/kosovo-siluete-teal.png" alt="" fill className="object-contain" />
          </div>
        </div>

        {/* Pin-at */}
        {qytetet.map((qyteti) => {
          const { x, y } = pozicioni(qyteti)
          const count = grupetSipasQytetit[qyteti].length
          const madhesia = 20 + (count / maxCount) * 16
          const isActive = aktivi === qyteti

          return (
            <button
              key={qyteti}
              onClick={() => setAktivi(isActive ? null : qyteti)}
              style={{ left: `${x}%`, top: `${y}%`, width: madhesia, height: madhesia }}
              className="absolute -translate-x-1/2 -translate-y-1/2 group z-10"
            >
              <span className="absolute inset-0 rounded-full bg-[#256D7B] animate-ping opacity-40" style={{ animationDuration: '2.5s' }} />
              <span
                className={`relative w-full h-full rounded-full flex items-center justify-center text-white font-bold border-2 transition-all duration-300 ${
                  isActive
                    ? 'bg-[#7fc8d9] border-white scale-110 shadow-lg shadow-[#7fc8d9]/50'
                    : 'bg-[#256D7B] border-white/40 hover:border-white hover:scale-105'
                }`}
                style={{ fontSize: madhesia * 0.4 }}
              >
                {count}
              </span>
              <span className="absolute top-full mt-1 left-1/2 -translate-x-1/2 text-[9px] sm:text-[10px] text-white/80 font-medium whitespace-nowrap pointer-events-none">
                {qyteti}
              </span>
            </button>
          )
        })}
      </div>

      {/* Paneli i qytetit aktiv */}
      <AnimatePresence mode="wait">
        {aktivi && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden border-t border-white/10"
          >
            <div className="p-5 sm:p-6">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-white font-semibold flex items-center gap-2">
                  <FaMapMarkerAlt className="text-[#7fc8d9]" />
                  {aktivi} — {grupetSipasQytetit[aktivi].length} projekte
                </h4>
                <button onClick={() => setAktivi(null)} className="text-white/50 hover:text-white transition">
                  <FaTimes />
                </button>
              </div>
              <div className="flex gap-3 overflow-x-auto pb-2">
                {grupetSipasQytetit[aktivi].slice(0, 8).map((p) => (
                  <div key={p.id} className="relative flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden ring-1 ring-white/10">
                    <Image src={p.foto} alt={p.titulli} fill className="object-cover" sizes="96px" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <p className="absolute bottom-1 left-1.5 right-1.5 text-white text-[9px] font-medium leading-tight truncate">
                      {p.titulli}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!aktivi && (
        <p className="text-center text-white/40 text-xs py-3 px-4">
          Prek një pikë në hartë për të parë projektet e atij qyteti
        </p>
      )}
    </div>
  )
}
