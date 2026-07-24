'use client'

import { useState } from 'react'
import { FaTimes, FaCalculator, FaRuler, FaWeight, FaCircle, FaArrowsAltV, FaRedo } from 'react-icons/fa'
import ArmaturaSimulim3D from './ArmaturaSimulim3D'

type ModalProps = {
  isOpen: boolean
  onClose: () => void
}

export default function ModalLlogaritesKonstruksion({ isOpen, onClose }: ModalProps) {
  const [parametrat, setParametrat] = useState({
    diametriPilotes: 600,
    thellesia: 10,
    numriFijeveVertikale: 8,
    diametriFijeve: 16,
    diametriSpirales: 10,
    distancaSpirales: 20
  })

  const [rezultati, setRezultati] = useState<{
    peshaFijeve: number
    peshaSpirales: number
    peshaTotale: number
    gjatesiaSpirales: number
    raportiHekurBeton: number
    numriSpiralave: number
  } | null>(null)

  const densitetiHekur = 7850 // kg/m³

  const llogarit = () => {
    const rPilotes = parametrat.diametriPilotes / 1000 / 2
    const perimeter = 2 * Math.PI * rPilotes
    
    const siperfaqjaFijes = Math.PI * Math.pow(parametrat.diametriFijeve / 1000 / 2, 2)
    const gjatesiaFijes = parametrat.thellesia + 0.5
    const vellimiFijeve = siperfaqjaFijes * gjatesiaFijes * parametrat.numriFijeveVertikale
    const peshaFijeve = vellimiFijeve * densitetiHekur

    const numriSpiralave = Math.ceil(parametrat.thellesia * 100 / parametrat.distancaSpirales)
    const gjatesiaPerSpirale = Math.sqrt(Math.pow(perimeter, 2) + Math.pow(parametrat.distancaSpirales / 100, 2))
    const gjatesiaSpirales = gjatesiaPerSpirale * numriSpiralave
    
    const siperfaqjaSpirales = Math.PI * Math.pow(parametrat.diametriSpirales / 1000 / 2, 2)
    const vellimiSpirales = siperfaqjaSpirales * gjatesiaSpirales
    const peshaSpirales = vellimiSpirales * densitetiHekur

    const peshaTotale = peshaFijeve + peshaSpirales
    const vellimiBetoni = Math.PI * Math.pow(rPilotes, 2) * parametrat.thellesia
    const raporti = peshaTotale / vellimiBetoni

    setRezultati({
      peshaFijeve: Number(peshaFijeve.toFixed(2)),
      peshaSpirales: Number(peshaSpirales.toFixed(2)),
      peshaTotale: Number(peshaTotale.toFixed(2)),
      gjatesiaSpirales: Number(gjatesiaSpirales.toFixed(2)),
      raportiHekurBeton: Number(raporti.toFixed(2)),
      numriSpiralave: numriSpiralave
    })
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[60] overflow-y-auto">
      <div className="flex items-end sm:items-center justify-center min-h-screen">
        {/* Overlay */}
        <div className="fixed inset-0 bg-gray-900/75" onClick={onClose} />

        {/* Modal - Optimizuar për mobile */}
        <div className="relative bg-white w-full sm:rounded-2xl sm:max-w-3xl sm:mx-4 rounded-t-2xl sm:my-8 max-h-[90vh] flex flex-col">
          {/* Header - Touch optimized */}
          <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-3 sm:px-6 sm:py-4 flex justify-between items-center z-10">
            <h3 className="text-lg sm:text-2xl font-bold text-gray-900">Llogaritësi i Konstruksionit</h3>
            <button 
              onClick={onClose} 
              className="p-2 hover:bg-gray-100 rounded-lg transition min-w-[44px] min-h-[44px] flex items-center justify-center"
            >
              <FaTimes className="text-xl sm:text-2xl text-gray-500" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 sm:p-8">
            <div className="space-y-4 sm:space-y-6">
              {/* Parametrat - Optimizuar për mobile */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                    <FaCircle className="inline mr-1 sm:mr-2 text-[#256D7B]" />
                    Diametri (mm)
                  </label>
                  <input
                    type="number"
                    min="300"
                    max="1500"
                    step="50"
                    value={parametrat.diametriPilotes}
                    onChange={(e) => setParametrat({...parametrat, diametriPilotes: Number(e.target.value)})}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#256D7B] text-sm sm:text-base touch-manipulation"
                  />
                </div>

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
                    value={parametrat.thellesia}
                    onChange={(e) => setParametrat({...parametrat, thellesia: Number(e.target.value)})}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#256D7B] text-sm sm:text-base touch-manipulation"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                    <FaRuler className="inline mr-1 sm:mr-2 text-[#256D7B]" />
                    Numri i fijeve
                  </label>
                  <input
                    type="number"
                    min="4"
                    max="20"
                    value={parametrat.numriFijeveVertikale}
                    onChange={(e) => setParametrat({...parametrat, numriFijeveVertikale: Number(e.target.value)})}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#256D7B] text-sm sm:text-base touch-manipulation"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                    <FaRuler className="inline mr-1 sm:mr-2 text-[#256D7B]" />
                    Diam. fijeve (mm)
                  </label>
                  <input
                    type="number"
                    min="8"
                    max="32"
                    step="2"
                    value={parametrat.diametriFijeve}
                    onChange={(e) => setParametrat({...parametrat, diametriFijeve: Number(e.target.value)})}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#256D7B] text-sm sm:text-base touch-manipulation"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                    <FaRedo className="inline mr-1 sm:mr-2 text-[#256D7B]" />
                    Diam. spirales (mm)
                  </label>
                  <input
                    type="number"
                    min="6"
                    max="20"
                    step="2"
                    value={parametrat.diametriSpirales}
                    onChange={(e) => setParametrat({...parametrat, diametriSpirales: Number(e.target.value)})}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#256D7B] text-sm sm:text-base touch-manipulation"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                    <FaArrowsAltV className="inline mr-1 sm:mr-2 text-[#256D7B]" />
                    Distanca (cm)
                  </label>
                  <input
                    type="number"
                    min="5"
                    max="50"
                    step="5"
                    value={parametrat.distancaSpirales}
                    onChange={(e) => setParametrat({...parametrat, distancaSpirales: Number(e.target.value)})}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#256D7B] text-sm sm:text-base touch-manipulation"
                  />
                </div>
              </div>

              {/* Simulim 3D live i prerjes tërthore */}
              <div className="bg-gradient-to-b from-gray-50 to-white rounded-xl border border-gray-100 py-6">
                <ArmaturaSimulim3D
                  diametriPilotesMM={parametrat.diametriPilotes}
                  numriFijeveVertikale={parametrat.numriFijeveVertikale}
                  diametriFijeveMM={parametrat.diametriFijeve}
                  diametriSpiralesMM={parametrat.diametriSpirales}
                />
              </div>

              <button
                onClick={llogarit}
                className="w-full bg-gradient-to-r from-[#256D7B] to-[#1a4f5a] text-white px-4 sm:px-6 py-3 sm:py-4 rounded-lg font-semibold hover:shadow-lg active:scale-95 transition-all duration-300 flex items-center justify-center text-sm sm:text-base touch-manipulation"
              >
                <FaCalculator className="mr-2" />
                Llogarit
              </button>

              {rezultati && (
                <div className="space-y-3 sm:space-y-4 mt-4 sm:mt-6">
                  {/* Rezultatet - Grid responsive */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div className="bg-gray-50 p-4 sm:p-5 rounded-lg border border-gray-200">
                      <h4 className="font-semibold text-gray-900 mb-2 flex items-center text-sm sm:text-base">
                        <FaRuler className="text-[#256D7B] mr-2" />
                        Fijet Vertikale
                      </h4>
                      <p className="text-2xl sm:text-3xl font-bold text-[#256D7B] mb-1">{rezultati.peshaFijeve} kg</p>
                      <p className="text-xs sm:text-sm text-gray-500">{parametrat.numriFijeveVertikale} fije ø{parametrat.diametriFijeve}mm</p>
                    </div>

                    <div className="bg-gray-50 p-4 sm:p-5 rounded-lg border border-gray-200">
                      <h4 className="font-semibold text-gray-900 mb-2 flex items-center text-sm sm:text-base">
                        <FaRedo className="text-[#256D7B] mr-2" />
                        Spiralja
                      </h4>
                      <p className="text-2xl sm:text-3xl font-bold text-[#256D7B] mb-1">{rezultati.peshaSpirales} kg</p>
                      <p className="text-xs sm:text-sm text-gray-500">{rezultati.numriSpiralave} spirale</p>
                    </div>
                  </div>

                  {/* Totali - Me gradient */}
                  <div className="bg-gradient-to-r from-[#256D7B] to-[#1a4f5a] text-white p-4 sm:p-6 rounded-lg">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0">
                      <div>
                        <h4 className="text-sm sm:text-lg font-semibold mb-1">Pesha Totale</h4>
                        <p className="text-2xl sm:text-4xl font-bold">{rezultati.peshaTotale} kg</p>
                      </div>
                      <div className="sm:text-right">
                        <p className="text-xs sm:text-sm opacity-90">Raporti hekur/beton</p>
                        <p className="text-xl sm:text-2xl font-bold">{rezultati.raportiHekurBeton} kg/m³</p>
                      </div>
                    </div>
                  </div>

                  {/* Shënim */}
                  <div className="bg-gray-100 p-3 sm:p-4 rounded-lg">
                    <p className="text-xs sm:text-sm text-gray-600">
                      <span className="font-semibold">Shënim:</span> Llogaritja përfshin mbivendosje 50cm.
                    </p>
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