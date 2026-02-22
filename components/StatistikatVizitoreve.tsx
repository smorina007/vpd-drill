'use client'

import { useState, useEffect } from 'react'
import { FaUsers, FaEye, FaClock, FaChartLine } from 'react-icons/fa'

export default function StatistikatVizitoreve() {
  const [stats, setStats] = useState({
    sot: 1247,
    keteJave: 8432,
    keteMuaj: 35421,
    total: 154782,
    onlineTani: 23
  })

  useEffect(() => {
    // Simulimi i vizitorëve online
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        onlineTani: Math.floor(Math.random() * 30) + 10, // 10-40 vizitorë online
        sot: prev.sot + Math.floor(Math.random() * 3)
      }))
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <FaChartLine className="text-[#256D7B] mr-2" />
        Statistikat e Vizitorëve
      </h3>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="bg-gray-50 p-3 rounded-lg">
          <div className="flex items-center text-[#256D7B] mb-1">
            <FaUsers className="mr-1" />
            <span className="text-xs">Online tani</span>
          </div>
          <p className="text-2xl font-bold">{stats.onlineTani}</p>
        </div>

        <div className="bg-gray-50 p-3 rounded-lg">
          <div className="flex items-center text-[#256D7B] mb-1">
            <FaEye className="mr-1" />
            <span className="text-xs">Sot</span>
          </div>
          <p className="text-2xl font-bold">{stats.sot.toLocaleString()}</p>
        </div>

        <div className="bg-gray-50 p-3 rounded-lg">
          <div className="flex items-center text-[#256D7B] mb-1">
            <FaClock className="mr-1" />
            <span className="text-xs">Këtë javë</span>
          </div>
          <p className="text-2xl font-bold">{stats.keteJave.toLocaleString()}</p>
        </div>

        <div className="bg-gray-50 p-3 rounded-lg col-span-2 md:col-span-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Totali i vizitorëve</span>
            <span className="text-2xl font-bold text-[#256D7B]">{stats.total.toLocaleString()}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div className="bg-[#256D7B] h-2 rounded-full" style={{ width: '67%' }}></div>
          </div>
        </div>
      </div>
    </div>
  )
}