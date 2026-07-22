'use client'

import { useState } from 'react'
import { FaCalculator, FaRuler, FaWater, FaArrowsAltV } from 'react-icons/fa'

export default function LlogaritesUji() {
  const [diametri, setDiametri] = useState<number>(300) // mm
  const [thellesia, setThellesia] = useState<number>(10) // m
  const [rezultati, setRezultati] = useState<{
    vellimiM3: number
    vellimiL: number
  } | null>(null)

  const llogarit = () => {
    // Konverto diametrin nga mm ne m
    const rrezjaM = (diametri / 1000) / 2
    const vellimiM3 = Math.PI * Math.pow(rrezjaM, 2) * thellesia
    const vellimiL = vellimiM3 * 1000

    setRezultati({
      vellimiM3: Number(vellimiM3.toFixed(2)),
      vellimiL: Number(vellimiL.toFixed(0))
    })
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Llogaritësi i Vëllimit të Ujit në Pus
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Llogarit sa ujë mund të ruajë pusi juaj në varësi të diametrit dhe thellësisë
          </p>
          <div className="w-32 h-1.5 bg-gradient-to-r from-[#256D7B] to-[#1a4f5a] mx-auto mt-6 rounded-full"></div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FaRuler className="inline mr-2 text-[#256D7B]" />
                  Diametri (mm)
                </label>
                <input
                  type="number"
                  min="100"
                  max="2000"
                  step="10"
                  value={diametri}
                  onChange={(e) => setDiametri(Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#256D7B]"
                />
                <p className="text-xs text-gray-400 mt-1">Min: 100mm, Max: 2000mm</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FaArrowsAltV className="inline mr-2 text-[#256D7B]" />
                  Thellësia (m)
                </label>
                <input
                  type="number"
                  min="1"
                  max="500"
                  step="0.5"
                  value={thellesia}
                  onChange={(e) => setThellesia(Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#256D7B]"
                />
                <p className="text-xs text-gray-400 mt-1">Min: 1m, Max: 500m</p>
              </div>
            </div>

            <button
              onClick={llogarit}
              className="w-full bg-gradient-to-r from-[#256D7B] to-[#1a4f5a] text-white px-6 py-4 rounded-lg font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center group"
            >
              <FaCalculator className="mr-2 group-hover:rotate-12 transition" />
              Llogarit vëllimin
            </button>

            {rezultati && (
              <div className="mt-6 p-6 bg-gradient-to-br from-[#256D7B]/10 to-transparent rounded-xl border border-[#256D7B]/20">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <FaWater className="mr-2 text-[#256D7B]" />
                  Rezultati
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="text-center">
                    <p className="text-sm text-gray-500 mb-1">Vëllimi</p>
                    <p className="text-3xl font-bold text-[#256D7B]">{rezultati.vellimiM3} m³</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-500 mb-1">Vëllimi</p>
                    <p className="text-3xl font-bold text-[#256D7B]">{rezultati.vellimiL} litra</p>
                  </div>
                </div>
                <p className="text-xs text-gray-400 mt-4 text-center">
                  Llogaritja bazohet në formulën e vëllimit të cilindrit: π × r² × h
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}