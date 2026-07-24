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
const REFRESH_MS = 30 * 60 * 1000 // 30 minuta

function codeToCondition(code: number): WeatherCondition {
  let condition: WeatherCondition = 'Diell'
  if (code > 0) condition = 'Vranët'
  if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82)) condition = 'Shi'
  if ((code >= 71 && code <= 77) || (code >= 85 && code <= 86)) condition = 'Borë'
  if (code >= 95 && code <= 99) condition = 'Stuhi'
  return condition
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
          `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}&current_weather=true`
        )
        const data = await res.json()
        if (cancelled) return

        if (data?.current_weather) {
          setWeather({
            temp: Math.round(data.current_weather.temperature),
            condition: codeToCondition(data.current_weather.weathercode),
          })
        } else {
          setWeather({ temp: 22, condition: 'Diell' })
        }
      } catch (error) {
        if (!cancelled) {
          console.error('Weather fetch failed:', error)
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
