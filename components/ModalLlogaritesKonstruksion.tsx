'use client'

import { useState } from 'react'
import { FaTimes, FaCalculator, FaRuler, FaWeight, FaCircle, FaArrowsAltV, FaRedo } from 'react-icons/fa'

type ModalProps = {
  isOpen: boolean
  onClose: () => void
}

export default function ModalLlogaritesKonstruksion({ isOpen, onClose }: ModalProps) {
  const [parametrat, setParametrat] = useState({
    diametriPilotes: 600, // mm
    thellesia: 10, // m
    numriFijeveVertikale: 8,
    diametriFijeve: 16, // mm
    diametriSpirales: 10, // mm
    distancaSpirales: 20 // cm
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
    // Konvertimet
    const rPilotes = parametrat.diametriPilotes / 1000 / 2
    const perimeter = 2 * Math.PI * rPilotes
    
    // Llogaritja e fijeve vertikale
    const siperfaqjaFijes = Math.PI * Math.pow(parametrat.diametriFijeve / 1000 / 2, 2)
    const gjatesiaFijes = parametrat.thellesia + 0.5 // +50cm për mbivendosje
    const vellimiFijeve = siperfaqjaFijes * gjatesiaFijes * parametrat.numriFijeveVertikale
    const peshaFijeve = vellimiFijeve * densitetiHekur

    // Llogaritja e spirales
    const numriSpiralave = Math.ceil(parametrat.thellesia * 100 / parametrat.distancaSpirales)
    const gjatesiaPerSpirale = Math.sqrt(Math.pow(perimeter, 2) + Math.pow(parametrat.distancaSpirales / 100, 2))
    const gjatesiaSpirales = gjatesiaPerSpirale * numriSpiralave
    
    const siperfaqjaSpirales = Math.PI * Math.pow(parametrat.diametriSpirales / 1000 / 2, 2)
    const vellimiSpirales = siperfaqjaSpirales * gjatesiaSpirales
    const peshaSpirales = vellimiSpirales * densitetiHekur

    // Totali
    const peshaTotale = peshaFijeve + peshaSpirales
    
    // Raporti hekur/beton
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
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-900 opacity-75" onClick={onClose}></div>
        </div>

        <div className="inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full">
          <div className="bg-white px-6 pt-6 pb-4 sm:p-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Llogaritësi i Konstruksionit të Pilotave</h3>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
                <FaTimes className="text-2xl" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Parametrat e pilotës */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FaCircle className="inline mr-2 text-[#256D7B]" />
                    Diametri i pilotës (mm)
                  </label>
                  <input
                    type="number"
                    min="300"
                    max="1500"
                    step="50"
                    value={parametrat.diametriPilotes}
                    onChange={(e) => setParametrat({...parametrat, diametriPilotes: Number(e.target.value)})}
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
                    min="2"
                    max="30"
                    step="0.5"
                    value={parametrat.thellesia}
                    onChange={(e) => setParametrat({...parametrat, thellesia: Number(e.target.value)})}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#256D7B]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FaRuler className="inline mr-2 text-[#256D7B]" />
                    Numri i fijeve vertikale
                  </label>
                  <input
                    type="number"
                    min="4"
                    max="20"
                    value={parametrat.numriFijeveVertikale}
                    onChange={(e) => setParametrat({...parametrat, numriFijeveVertikale: Number(e.target.value)})}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#256D7B]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FaRuler className="inline mr-2 text-[#256D7B]" />
                    Diametri i fijeve (mm)
                  </label>
                  <input
                    type="number"
                    min="8"
                    max="32"
                    step="2"
                    value={parametrat.diametriFijeve}
                    onChange={(e) => setParametrat({...parametrat, diametriFijeve: Number(e.target.value)})}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#256D7B]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FaRedo className="inline mr-2 text-[#256D7B]" />
                    Diametri i spirales (mm)
                  </label>
                  <input
                    type="number"
                    min="6"
                    max="20"
                    step="2"
                    value={parametrat.diametriSpirales}
                    onChange={(e) => setParametrat({...parametrat, diametriSpirales: Number(e.target.value)})}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#256D7B]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FaArrowsAltV className="inline mr-2 text-[#256D7B]" />
                    Distanca e spirales (cm)
                  </label>
                  <input
                    type="number"
                    min="5"
                    max="50"
                    step="5"
                    value={parametrat.distancaSpirales}
                    onChange={(e) => setParametrat({...parametrat, distancaSpirales: Number(e.target.value)})}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#256D7B]"
                  />
                </div>
              </div>

              <button
                onClick={llogarit}
                className="w-full bg-[#256D7B] text-white px-6 py-4 rounded-lg font-semibold hover:bg-[#1a4f5a] transition flex items-center justify-center"
              >
                <FaCalculator className="mr-2" />
                Llogarit Armaturën
              </button>

              {rezultati && (
                <div className="mt-6 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                        <FaRuler className="text-[#256D7B] mr-2" />
                        Fijet Vertikale
                      </h4>
                      <p className="text-3xl font-bold text-[#256D7B] mb-1">{rezultati.peshaFijeve} kg</p>
                      <p className="text-sm text-gray-500">{parametrat.numriFijeveVertikale} fije ø{parametrat.diametriFijeve}mm</p>
                    </div>

                    <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                        <FaRedo className="text-[#256D7B] mr-2" />
                        Spiralja
                      </h4>
                      <p className="text-3xl font-bold text-[#256D7B] mb-1">{rezultati.peshaSpirales} kg</p>
                      <p className="text-sm text-gray-500">{rezultati.numriSpiralave} spirale, gjatësi {rezultati.gjatesiaSpirales} m</p>
                    </div>
                  </div>

                  <div className="bg-[#256D7B] text-white p-6 rounded-lg">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="text-lg font-semibold mb-1">Pesha Totale e Hekurit</h4>
                        <p className="text-4xl font-bold">{rezultati.peshaTotale} kg</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm opacity-90">Raporti hekur/beton</p>
                        <p className="text-2xl font-bold">{rezultati.raportiHekurBeton} kg/m³</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-100 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">
                      <span className="font-semibold">Shënim:</span> Llogaritja përfshin mbivendosje prej 50cm për fijet vertikale 
                      dhe bazohet në standardet e zakonshme të konstruksionit.
                    </p>
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