'use client'

import { useState } from 'react'
import { FaTimes, FaCalculator, FaRuler, FaWeight, FaCube, FaArrowsAltV } from 'react-icons/fa'
import ShaftiSimulim3D from './ShaftiSimulim3D'

type ModalProps = {
  isOpen: boolean
  onClose: () => void
}

export default function ModalLlogaritesPilota({ isOpen, onClose }: ModalProps) {
  const [thellesia, setThellesia] = useState<number>(8)
  const [diametri, setDiametri] = useState<number>(600)
  const [rezultati, setRezultati] = useState<{
    vellimi: number
    pesha: number
    hekuri: number
    kapaciteti: number
  } | null>(null)

  const densitetiBetoni = 2400 // kg/m³
  const hekuriPerM3 = 150 // kg/m³ për pilota

  const llogarit = () => {
    const rrezja = diametri / 1000 / 2
    const siperfaqja = Math.PI * rrezja * rrezja
    const vellimi = siperfaqja * thellesia
    const pesha = (vellimi * densitetiBetoni) / 1000
    const hekuri = vellimi * hekuriPerM3
    const kapaciteti = siperfaqja * 400 * thellesia

    setRezultati({
      vellimi: Number(vellimi.toFixed(2)),
      pesha: Number(pesha.toFixed(2)),
      hekuri: Number(hekuri.toFixed(2)),
      kapaciteti: Number(kapaciteti.toFixed(2))
    })
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[60] overflow-y-auto">
      <div className="flex items-end sm:items-center justify-center min-h-screen">
        {/* Overlay */}
        <div className="fixed inset-0 bg-gray-900/75" onClick={onClose} />

        {/* Modal - Optimizuar për mobile */}
        <div className="relative bg-white w-full sm:rounded-2xl sm:max-w-2xl sm:mx-4 rounded-t-2xl sm:my-8 max-h-[90vh] flex flex-col">
          {/* Header - Touch optimized */}
          <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-3 sm:px-6 sm:py-4 flex justify-between items-center z-10">
            <h3 className="text-lg sm:text-2xl font-bold text-gray-900">Llogaritësi i Pilotave</h3>
            <button 
              onClick={onClose} 
              className="p-2 hover:bg-gray-100 rounded-lg transition min-w-[44px] min-h-[44px] flex items-center justify-center"
            >
              <FaTimes className="text-xl sm:text-2xl text-gray-500" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 sm:p-8">
            <div className="space-y-4 sm:space-y-6">
              {/* Input fields - Grid responsive */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                    <FaArrowsAltV className="inline mr-1 sm:mr-2 text-[#256D7B]" />
                    Thellësia (m)
                  </label>
                  <input
                    type="number"
                    min="2"
                    max="30"
                    step="0.5"
                    value={thellesia}
                    onChange={(e) => setThellesia(Number(e.target.value))}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#256D7B] text-sm sm:text-base touch-manipulation"
                  />
                  <p className="text-[10px] sm:text-xs text-gray-400 mt-1">Min: 2m, Max: 30m</p>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                    <FaRuler className="inline mr-1 sm:mr-2 text-[#256D7B]" />
                    Diametri (mm)
                  </label>
                  <select
                    value={diametri}
                    onChange={(e) => setDiametri(Number(e.target.value))}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#256D7B] text-sm sm:text-base touch-manipulation"
                  >
                    <option value="400">400 mm</option>
                    <option value="500">500 mm</option>
                    <option value="600">600 mm</option>
                    <option value="800">800 mm</option>
                    <option value="1000">1000 mm</option>
                  </select>
                </div>
              </div>

              {/* Simulim 3D live */}
              <div className="bg-gradient-to-b from-gray-100 to-white rounded-xl border border-gray-200 py-6">
                <ShaftiSimulim3D diametriMM={diametri} thellesiaM={thellesia} lloji="beton" />
              </div>

              {/* Llogarit button - Touch optimized */}
              <button
                onClick={llogarit}
                className="w-full bg-gradient-to-r from-[#256D7B] to-[#1a4f5a] text-white px-4 sm:px-6 py-3 sm:py-4 rounded-lg font-semibold hover:shadow-lg active:scale-95 transition-all duration-300 flex items-center justify-center text-sm sm:text-base touch-manipulation"
              >
                <FaCalculator className="mr-2" />
                Llogarit
              </button>

              {/* Rezultatet - Responsive grid */}
              {rezultati && (
                <div className="grid grid-cols-2 sm:grid-cols-2 gap-2 sm:gap-4 mt-4 sm:mt-6">
                  <div className="bg-gradient-to-br from-[#256D7B]/10 to-transparent p-3 sm:p-4 rounded-lg border border-[#256D7B]/20">
                    <div className="flex items-center mb-1 sm:mb-2">
                      <FaCube className="text-[#256D7B] text-sm sm:text-base mr-1 sm:mr-2" />
                      <h4 className="text-xs sm:text-sm font-semibold text-gray-900">Vëllimi</h4>
                    </div>
                    <p className="text-lg sm:text-2xl font-bold text-[#256D7B]">{rezultati.vellimi} m³</p>
                  </div>

                  <div className="bg-gradient-to-br from-[#256D7B]/10 to-transparent p-3 sm:p-4 rounded-lg border border-[#256D7B]/20">
                    <div className="flex items-center mb-1 sm:mb-2">
                      <FaWeight className="text-[#256D7B] text-sm sm:text-base mr-1 sm:mr-2" />
                      <h4 className="text-xs sm:text-sm font-semibold text-gray-900">Pesha</h4>
                    </div>
                    <p className="text-lg sm:text-2xl font-bold text-[#256D7B]">{rezultati.pesha} ton</p>
                  </div>

                  <div className="bg-gradient-to-br from-[#256D7B]/10 to-transparent p-3 sm:p-4 rounded-lg border border-[#256D7B]/20">
                    <div className="flex items-center mb-1 sm:mb-2">
                      <FaWeight className="text-[#256D7B] text-sm sm:text-base mr-1 sm:mr-2" />
                      <h4 className="text-xs sm:text-sm font-semibold text-gray-900">Hekuri</h4>
                    </div>
                    <p className="text-lg sm:text-2xl font-bold text-[#256D7B]">{rezultati.hekuri} kg</p>
                  </div>

                  <div className="bg-gradient-to-br from-[#256D7B]/10 to-transparent p-3 sm:p-4 rounded-lg border border-[#256D7B]/20">
                    <div className="flex items-center mb-1 sm:mb-2">
                      <FaCube className="text-[#256D7B] text-sm sm:text-base mr-1 sm:mr-2" />
                      <h4 className="text-xs sm:text-sm font-semibold text-gray-900">Kapaciteti</h4>
                    </div>
                    <p className="text-lg sm:text-2xl font-bold text-[#256D7B]">{rezultati.kapaciteti} kN</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .touch-manipulation {
          touch-action: manipulation;
          -webkit-tap-highlight-color: transparent;
        }
      `}</style>
    </div>
  )
}