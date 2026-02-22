'use client'

import { useState, useEffect } from 'react'
import { FaCloudSun, FaCloudRain, FaSnowflake, FaWind, FaSun } from 'react-icons/fa'

export default function MotiReal() {
  const [weather, setWeather] = useState({
    temp: 22,
    feelsLike: 20,
    condition: 'Diell',
    humidity: 65,
    windSpeed: 8,
    location: 'Malisheve'
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Këtu do të integrohet API e motit (OpenWeatherMap, WeatherAPI, etj)
    // Për momentin përdorim simulim
    const fetchWeather = () => {
      setLoading(true)
      // Simulimi i thirrjes API
      setTimeout(() => {
        setWeather({
          temp: Math.floor(Math.random() * 15) + 15, // 15-30°C
          feelsLike: Math.floor(Math.random() * 10) + 12,
          condition: ['Diell', 'Pjesërisht me re', 'Vranët', 'Shi'][Math.floor(Math.random() * 4)],
          humidity: Math.floor(Math.random() * 40) + 40, // 40-80%
          windSpeed: Math.floor(Math.random() * 15) + 5, // 5-20 km/h
          location: 'Malisheve'
        })
        setLoading(false)
      }, 1000)
    }

    fetchWeather()
    const interval = setInterval(fetchWeather, 1800000) // Përditëso çdo 30 minuta

    return () => clearInterval(interval)
  }, [])

  const getWeatherIcon = (condition: string) => {
    switch(condition) {
      case 'Diell': return <FaSun className="text-yellow-500" />
      case 'Pjesërisht me re': return <FaCloudSun className="text-gray-500" />
      case 'Vranët': return <FaCloudSun className="text-gray-600" />
      case 'Shi': return <FaCloudRain className="text-blue-500" />
      default: return <FaCloudSun />
    }
  }

  if (loading) {
    return (
      <div className="bg-white p-4 rounded-lg shadow animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="h-8 bg-gray-200 rounded w-1/2"></div>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-r from-[#256D7B] to-[#1a4f5a] text-white p-4 rounded-lg shadow-lg">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm opacity-90">{weather.location}</p>
          <div className="flex items-center">
            {getWeatherIcon(weather.condition)}
            <span className="text-3xl font-bold ml-2">{weather.temp}°C</span>
          </div>
          <p className="text-sm opacity-90">{weather.condition}</p>
        </div>
        <div className="text-right">
          <p className="text-sm">Ndjehet si {weather.feelsLike}°C</p>
          <p className="text-sm">Lagështia: {weather.humidity}%</p>
          <p className="text-sm">Era: {weather.windSpeed} km/h</p>
        </div>
      </div>
    </div>
  )
}