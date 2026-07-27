'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

export type WeatherCondition = 'Diell' | 'Vranët' | 'Shi' | 'Borë' | 'Stuhi'

export interface WeatherData {
  temp: number
  condition: WeatherCondition
}

interface WeatherContextValue {
  weather: WeatherData | null
  loading: boolean
}

const WeatherContext = createContext<WeatherContextValue>({ weather: null, loading: true })

// Koordinatat e Malishevës
const LAT = 42.48
const LON = 20.75
const REFRESH_MS = 10 * 60 * 1000 // 10 minuta — më shpesh, për stuhi që ndryshojnë shpejt

function codeToCondition(code: number, precipitation: number, rain: number, showers: number, snowfall: number): WeatherCondition {
  // Stuhia (rrufe/bubullimë) njihet vetëm nga weathercode — asnjë matje reshjesh s'e tregon këtë
  if (code >= 95 && code <= 99) return 'Stuhi'

  // Bora — nëse ka reshje bore të matura, ose weathercode i tregon
  if (snowfall > 0 || (code >= 71 && code <= 77) || (code >= 85 && code <= 86)) return 'Borë'

  // Shiu — përdorim MATJEN DIREKTE të reshjeve (precipitation/rain/showers), jo vetëm
  // kategorinë e përgjithshme weathercode. weathercode mund të mbetet "Vranët" (re)
  // edhe kur realisht po bie shi, sepse është një klasifikim i përgjithshëm i orës,
  // ndërsa precipitation/rain janë matje aktuale, më të sakta për momentin.
  if (rain > 0 || showers > 0 || precipitation > 0.1 || (code >= 51 && code <= 67) || (code >= 80 && code <= 82)) return 'Shi'

  if (code > 0) return 'Vranët'
  return 'Diell'
}

/**
 * Një thirrje e vetme API për të gjithë faqen (Header + Hero + efektet vizuale),
 * në vend që secili komponent ta thërrasë veç e veç.
 */
export function WeatherProvider({ children }: { children: ReactNode }) {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    const fetchWeather = async () => {
      try {
        const res = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}&current=temperature_2m,precipitation,rain,showers,snowfall,weather_code&minutely_15=precipitation,weather_code&forecast_minutely_15=4&timezone=auto&_=${Date.now()}`,
          { cache: 'no-store' }
        )
        const data = await res.json()
        if (cancelled) return

        if (data?.current) {
          const c = data.current

          // Nowcast 15-minutësh — sinjali më i saktë i disponueshëm për "çka po ndodh TANI"
          let nowcastPrecip = 0
          let nowcastCode: number | null = null
          if (data?.minutely_15?.time?.length) {
            // Merr intervalin e parë (më i afërti me tani, sipas timezone=auto)
            nowcastPrecip = data.minutely_15.precipitation?.[0] ?? 0
            nowcastCode = data.minutely_15.weather_code?.[0] ?? null
          }

          const efektivCode = nowcastCode !== null && nowcastCode > (c.weather_code ?? 0) ? nowcastCode : c.weather_code
          const efektivPrecip = Math.max(c.precipitation ?? 0, nowcastPrecip)

          const condition = codeToCondition(efektivCode, efektivPrecip, c.rain ?? 0, c.showers ?? 0, c.snowfall ?? 0)
          console.error(
            '[Moti-DEBUG] current.code:', c.weather_code, '| nowcast15.code:', nowcastCode,
            '| current.precip:', c.precipitation, '| nowcast15.precip:', nowcastPrecip,
            '-> kushti:', condition, '| temp:', c.temperature_2m
          )
          setWeather({
            temp: Math.round(c.temperature_2m),
            condition,
          })
        } else {
          console.error('[Moti-DEBUG] Open-Meteo s\'ktheu "current", po përdor fallback:', JSON.stringify(data))
          setWeather({ temp: 22, condition: 'Diell' })
        }
      } catch (error) {
        if (!cancelled) {
          console.error('[Moti-DEBUG] Fetch dështoi:', error)
          setWeather({ temp: 22, condition: 'Diell' })
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    fetchWeather()
    const interval = setInterval(fetchWeather, REFRESH_MS)
    return () => {
      cancelled = true
      clearInterval(interval)
    }
  }, [])

  return <WeatherContext.Provider value={{ weather, loading }}>{children}</WeatherContext.Provider>
}

export function useWeather() {
  return useContext(WeatherContext)
}
