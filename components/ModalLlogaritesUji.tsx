'use client'

import { useState } from 'react'
import { FaTimes, FaCalculator, FaRuler, FaWater, FaArrowsAltV } from 'react-icons/fa'
import ShaftiSimulim3D from './ShaftiSimulim3D'

type ModalProps = {
  isOpen: boolean
  onClose: () => void
}

export default function ModalLlogaritesUji({ isOpen, onClose }: ModalProps) {
  const [diametri, setDiametri] = useState<number>(300)
  const [thellesia, setThellesia] = useState<number>(10)
  const [rezultati, setRezultati] = useState<{
    vellimiM3: number
    vellimiL: number
  } | null>(null)

  const llogarit = () => {
    const rrezjaM = (diametri / 1000) / 2
    const vellimiM3 = Math.PI * Math.pow(rrezjaM, 2) * thellesia
    const vellimiL = vellimiM3 * 1000

    setRezultati({
      vellimiM3: Number(vellimiM3.toFixed(2)),
      vellimiL: Number(vellimiL.toFixed(0))
    })
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[60] overflow-y-auto">
      <div className="flex items-end sm:items-center justify-center min-h-screen">
        <div className="fixed inset-0 bg-gray-900/75" onClick={onClose} />

        <div className="relative bg-white w-full sm:rounded-2xl sm:max-w-2xl sm:mx-4 rounded-t-2xl sm:my-8 max-h-[90vh] flex flex-col">
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-3 sm:px-6 sm:py-4 flex justify-between items-center z-10">
            <h3 className="text-lg sm:text-2xl font-bold text-gray-900">Llogaritësi i Ujit në Pus</h3>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition">
              <FaTimes className="text-xl sm:text-2xl text-gray-500" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 sm:p-8">
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                </div>
              </div>

              {/* Simulim 3D live */}
              <div className="bg-gradient-to-b from-gray-50 to-white rounded-xl border border-gray-100 py-6">
                <ShaftiSimulim3D diametriMM={diametri} thellesiaM={thellesia} lloji="uje" />
              </div>

              <button
                onClick={llogarit}
                className="w-full bg-gradient-to-r from-[#256D7B] to-[#1a4f5a] text-white px-6 py-4 rounded-lg font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center"
              >
                <FaCalculator className="mr-2" />
                Llogarit
              </button>

              {rezultati && (
                <div className="p-6 bg-gradient-to-br from-[#256D7B]/10 to-transparent rounded-xl border border-[#256D7B]/20">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <FaWater className="mr-2 text-[#256D7B]" />
                    Rezultati
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="text-center">
                      <p className="text-sm text-gray-500 mb-1">Vëllimi</p>
                      <p className="text-3xl font-bold text-[#256D7B]">{rezultati.vellimiM3} m³</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-500 mb-1">Vëllimi</p>
                      <p className="text-3xl font-bold text-[#256D7B]">{rezultati.vellimiL} litra</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}