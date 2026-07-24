'use client'

import { useState } from 'react'
import { FaCalculator, FaRuler, FaWeight, FaCircle, FaArrowRight } from 'react-icons/fa'
import ArmaturaSimulim3D from './ArmaturaSimulim3D'

export default function LlogaritesKonstruksionPilote() {
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
    
    // Raporti hekur/beton (përllogaritje e thjeshtë)
    const vellimiBetoni = Math.PI * Math.pow(rPilotes, 2) * parametrat.thellesia
    const raporti = peshaTotale / vellimiBetoni

    setRezultati({
      peshaFijeve: Number(peshaFijeve.toFixed(2)),
      peshaSpirales: Number(peshaSpirales.toFixed(2)),
      peshaTotale: Number(peshaTotale.toFixed(2)),
      gjatesiaSpirales: Number(gjatesiaSpirales.toFixed(2)),
      raportiHekurBeton: Number(raporti.toFixed(2))
    })
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Llogaritësi i Konstruksionit të Pilotave
          </h2>
          <p className="text-lg text-gray-600">
            Llogarit sasinë e hekurit për armaturën e pilotave
          </p>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Diametri i pilotës (mm)
              </label>
              <input
                type="number"
                value={parametrat.diametriPilotes}
                onChange={(e) => setParametrat({...parametrat, diametriPilotes: Number(e.target.value)})}
                className="w-full px-4 py-3 rounded-lg border"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Thellësia (m)
              </label>
              <input
                type="number"
                value={parametrat.thellesia}
                onChange={(e) => setParametrat({...parametrat, thellesia: Number(e.target.value)})}
                className="w-full px-4 py-3 rounded-lg border"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Numri i fijeve vertikale
              </label>
              <input
                type="number"
                value={parametrat.numriFijeveVertikale}
                onChange={(e) => setParametrat({...parametrat, numriFijeveVertikale: Number(e.target.value)})}
                className="w-full px-4 py-3 rounded-lg border"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Diametri i fijeve (mm)
              </label>
              <input
                type="number"
                value={parametrat.diametriFijeve}
                onChange={(e) => setParametrat({...parametrat, diametriFijeve: Number(e.target.value)})}
                className="w-full px-4 py-3 rounded-lg border"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Diametri i spirales (mm)
              </label>
              <input
                type="number"
                value={parametrat.diametriSpirales}
                onChange={(e) => setParametrat({...parametrat, diametriSpirales: Number(e.target.value)})}
                className="w-full px-4 py-3 rounded-lg border"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Distanca e spirales (cm)
              </label>
              <input
                type="number"
                value={parametrat.distancaSpirales}
                onChange={(e) => setParametrat({...parametrat, distancaSpirales: Number(e.target.value)})}
                className="w-full px-4 py-3 rounded-lg border"
              />
            </div>
          </div>

          {/* Simulim 3D live i prerjes tërthore të armaturës */}
          <div className="bg-gradient-to-b from-gray-50 to-white rounded-xl border border-gray-100 py-6 mb-8">
            <ArmaturaSimulim3D
              diametriPilotesMM={parametrat.diametriPilotes}
              numriFijeveVertikale={parametrat.numriFijeveVertikale}
              diametriFijeveMM={parametrat.diametriFijeve}
              diametriSpiralesMM={parametrat.diametriSpirales}
            />
          </div>

          <button
            onClick={llogarit}
            className="w-full bg-[#256D7B] text-white px-6 py-4 rounded-lg font-semibold hover:bg-[#1a4f5a] transition flex items-center justify-center mb-8"
          >
            <FaCalculator className="mr-2" />
            Llogarit Armaturën
          </button>

          {rezultati && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-semibold mb-2">Fijet vertikale</h3>
                <p className="text-2xl font-bold text-[#256D7B]">{rezultati.peshaFijeve} kg</p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-semibold mb-2">Spiralja</h3>
                <p className="text-2xl font-bold text-[#256D7B]">{rezultati.peshaSpirales} kg</p>
                <p className="text-sm text-gray-500">Gjatësia: {rezultati.gjatesiaSpirales} m</p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg md:col-span-2">
                <h3 className="font-semibold mb-2">Pesha totale e hekurit</h3>
                <p className="text-3xl font-bold text-[#256D7B]">{rezultati.peshaTotale} kg</p>
                <p className="text-sm text-gray-500">Raporti hekur/beton: {rezultati.raportiHekurBeton} kg/m³</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}