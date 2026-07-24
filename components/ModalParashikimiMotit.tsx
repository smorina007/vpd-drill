'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaTimes, FaSpinner, FaSun, FaCloud, FaCloudRain, FaSnowflake, FaBolt } from 'react-icons/fa'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
}

interface DitaMoti {
  data: string
  tempMax: number
  tempMin: number
  condition: string
}

const LAT = 42.48
const LON = 20.75

function iconaPerKushtin(condition: string) {
  switch (condition) {
    case 'Diell': return { Icon: FaSun, color: 'text-amber-500', bg: 'bg-amber-50' }
    case 'Shi': return { Icon: FaCloudRain, color: 'text-sky-600', bg: 'bg-sky-50' }
    case 'Borë': return { Icon: FaSnowflake, color: 'text-cyan-500', bg: 'bg-cyan-50' }
    case 'Stuhi': return { Icon: FaBolt, color: 'text-purple-600', bg: 'bg-purple-50' }
    default: return { Icon: FaCloud, color: 'text-gray-500', bg: 'bg-gray-100' }
  }
}

function kodiNeKusht(code: number): string {
  let condition = 'Diell'
  if (code > 0) condition = 'Vranët'
  if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82)) condition = 'Shi'
  if ((code >= 71 && code <= 77) || (code >= 85 && code <= 86)) condition = 'Borë'
  if (code >= 95 && code <= 99) condition = 'Stuhi'
  return condition
}

const emriDites = (dataStr: string, index: number) => {
  if (index === 0) return 'Sot'
  const dita = new Date(dataStr)
  return dita.toLocaleDateString('sq-AL', { weekday: 'short' })
}

export default function ModalParashikimiMotit({ isOpen, onClose }: ModalProps) {
  const [ditet, setDitet] = useState<DitaMoti[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (!isOpen) return
    let cancelled = false
    setLoading(true)
    setError(false)

    fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=5`
    )
      .then((res) => res.json())
      .then((data) => {
        if (cancelled) return
        if (!data?.daily) throw new Error('no data')
        const dita: DitaMoti[] = data.daily.time.map((d: string, i: number) => ({
          data: d,
          tempMax: Math.round(data.daily.temperature_2m_max[i]),
          tempMin: Math.round(data.daily.temperature_2m_min[i]),
          condition: kodiNeKusht(data.daily.weathercode[i]),
        }))
        setDitet(dita)
      })
      .catch(() => {
        if (!cancelled) setError(true)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] overflow-y-auto">
          <div className="flex items-end sm:items-center justify-center min-h-screen">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-gray-950/75 backdrop-blur-sm"
              onClick={onClose}
            />
            <motion.div
              initial={{ scale: 0.96, opacity: 0, y: 24 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.97, opacity: 0, y: 12 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="relative bg-white w-full sm:rounded-2xl sm:max-w-2xl sm:mx-4 rounded-t-2xl sm:my-8 max-h-[92vh] flex flex-col overflow-hidden"
            >
              <div className="sticky top-0 bg-white border-b border-gray-100 px-5 py-4 flex justify-between items-center z-10">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900">
                  🌤️ Parashikimi i motit — Malishevë
                </h3>
                <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition">
                  <FaTimes className="text-xl text-gray-500" />
                </button>
              </div>

              <div className="p-5 sm:p-6">
                {loading && (
                  <div className="flex items-center justify-center py-16 text-gray-400">
                    <FaSpinner className="animate-spin text-2xl mr-2" />
                    Duke marrë të dhënat e motit...
                  </div>
                )}

                {!loading && error && (
                  <p className="text-center text-gray-500 py-16">
                    S'u arrit të merret parashikimi. Provo përsëri më vonë.
                  </p>
                )}

                {!loading && !error && ditet && (
                  <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
                    {ditet.map((dita, i) => {
                      const { Icon, color, bg } = iconaPerKushtin(dita.condition)
                      return (
                        <motion.div
                          key={dita.data}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: i * 0.06 }}
                          className={`rounded-xl p-4 text-center border ${
                            i === 0 ? 'border-[#256D7B]/30 bg-[#256D7B]/5' : 'border-gray-100 bg-gray-50'
                          }`}
                        >
                          <p className="text-xs font-semibold text-gray-500 uppercase mb-2">
                            {emriDites(dita.data, i)}
                          </p>
                          <div className={`w-12 h-12 mx-auto rounded-full ${bg} flex items-center justify-center mb-2`}>
                            <Icon className={`text-xl ${color}`} />
                          </div>
                          <p className="text-xs text-gray-500 mb-1">{dita.condition}</p>
                          <p className="text-lg font-bold text-gray-900">{dita.tempMax}°</p>
                          <p className="text-sm text-gray-400">{dita.tempMin}°</p>
                        </motion.div>
                      )
                    })}
                  </div>
                )}

                <p className="text-xs text-gray-400 text-center mt-6">
                  Të dhëna nga Open-Meteo · përditësohet automatikisht
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  )
}
