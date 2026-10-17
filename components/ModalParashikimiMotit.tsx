'use client'

import { useState, useEffect } from 'react'
import Modal from './ui/Modal'
import { FaCloudSun, FaSpinner, FaSun, FaCloud, FaCloudRain, FaSnowflake, FaBolt } from 'react-icons/fa'

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

function kodiNeKusht(code: number, precipSum: number, rainSum: number, showersSum: number, snowfallSum: number): string {
  // Stuhia njihet vetëm nga kodi (rrufe/bubullimë)
  if (code >= 95 && code <= 99) return 'Stuhi'

  // Bora — nëse ka reshje bore të parashikuara, ose kodi e tregon
  if (snowfallSum > 0 || (code >= 71 && code <= 77) || (code >= 85 && code <= 86)) return 'Borë'

  // Shiu — përdorim shumën e parashikuar të reshjeve për ditën, jo vetëm kodin e
  // përgjithshëm (i cili mund të mbetet "i vranët" edhe kur parashikohet shi gjatë ditës)
  if (rainSum > 0 || showersSum > 0 || precipSum > 0.2 || (code >= 51 && code <= 67) || (code >= 80 && code <= 82)) return 'Shi'

  if (code > 0) return 'Vranët'
  return 'Diell'
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
      `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_sum,rain_sum,showers_sum,snowfall_sum&timezone=auto&forecast_days=5&_=${Date.now()}`,
      { cache: 'no-store' }
    )
      .then((res) => res.json())
      .then((data) => {
        if (cancelled) return
        if (!data?.daily) throw new Error('no data')
        const dita: DitaMoti[] = data.daily.time.map((d: string, i: number) => ({
          data: d,
          tempMax: Math.round(data.daily.temperature_2m_max[i]),
          tempMin: Math.round(data.daily.temperature_2m_min[i]),
          condition: kodiNeKusht(
            data.daily.weathercode[i],
            data.daily.precipitation_sum?.[i] ?? 0,
            data.daily.rain_sum?.[i] ?? 0,
            data.daily.showers_sum?.[i] ?? 0,
            data.daily.snowfall_sum?.[i] ?? 0
          ),
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
    <Modal isOpen={isOpen} onClose={onClose} title="Parashikimi i motit — Malishevë" icon={<FaCloudSun />} size="lg">
      {loading && (
        <div className="flex items-center justify-center py-16 text-slate-mute">
          <FaSpinner className="mr-2 animate-spin text-2xl" />
          Duke marrë të dhënat e motit...
        </div>
      )}

      {!loading && error && (
        <p className="py-16 text-center text-slate-mute">S&apos;u arrit të merret parashikimi. Provo përsëri më vonë.</p>
      )}

      {!loading && !error && ditet && (
        <ul className="grid grid-cols-1 divide-y divide-stone-line overflow-hidden rounded-lg ring-1 ring-stone-line sm:grid-cols-5 sm:divide-x sm:divide-y-0">
          {ditet.map((dita, i) => {
            const { Icon, color } = iconaPerKushtin(dita.condition)
            return (
              <li
                key={dita.data}
                className={`flex items-center gap-4 px-4 py-3 sm:flex-col sm:gap-2 sm:py-5 sm:text-center ${i === 0 ? 'bg-brand/[0.06]' : 'bg-white'}`}
              >
                <p className={`w-14 text-sm font-bold capitalize sm:w-auto ${i === 0 ? 'text-brand' : 'text-bedrock'}`}>{emriDites(dita.data, i)}</p>
                <Icon className={`text-2xl ${color}`} />
                <p className="flex-1 text-sm text-slate-mute sm:flex-none">{dita.condition}</p>
                <p className="tabular">
                  <span className="text-lg font-bold text-bedrock">{dita.tempMax}°</span>{' '}
                  <span className="text-sm text-slate-mute">{dita.tempMin}°</span>
                </p>
              </li>
            )
          })}
        </ul>
      )}

      <p className="mt-5 text-center text-xs text-slate-mute">Të dhëna nga Open-Meteo · përditësohet automatikisht</p>
    </Modal>
  )
}
