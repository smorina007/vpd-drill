'use client'

import { useState } from 'react'
import { FaCalculator, FaRuler, FaWeight, FaCube, FaArrowRight, FaInfoCircle } from 'react-icons/fa'
import MuriLSimulim3D from './MuriLSimulim3D'

export default function LlogaritesMuriL() {
  // Dimensionet e përbashkëta
  const [gjatesia, setGjatesia] = useState<number>(2) // m

  // Pjesa vertikale (muri)
  const [lartesiaMurit, setLartesiaMurit] = useState<number>(1.5) // m
  const [trashesiaMurit, setTrashesiaMurit] = useState<number>(12) // cm

  // Pjesa horizontale (këmba/fondi)
  const [gjatesiaKembes, setGjatesiaKembes] = useState<number>(0.8) // m
  const [trashesiaKembes, setTrashesiaKembes] = useState<number>(20) // cm

  const [rezultati, setRezultati] = useState<{
    vellimiTotal: number
    pesha: number
    hekuri: number
    forca: number
    vellimiMurit: number
    vellimiKembes: number
  } | null>(null)

  const densitetiBetoni = 2400 // kg/m³
  const hekuriPerM3 = 120 // kg/m³ beton (mesatare)
  const forcaPerM3 = 250 // kN/m³ (kapacitet mbajtës i përafërt)

  const llogarit = () => {
    // Konvertimi i trashësive nga cm në m
    const tMurit = trashesiaMurit / 100
    const tKembes = trashesiaKembes / 100

    // Vëllimet
    const vellimiMurit = gjatesia * lartesiaMurit * tMurit
    const vellimiKembes = gjatesia * gjatesiaKembes * tKembes
    const vellimiTotal = vellimiMurit + vellimiKembes

    // Llogaritjet
    const pesha = (vellimiTotal * densitetiBetoni) / 1000 // ton
    const hekuri = vellimiTotal * hekuriPerM3
    const forca = vellimiTotal * forcaPerM3

    setRezultati({
      vellimiTotal: Number(vellimiTotal.toFixed(2)),
      pesha: Number(pesha.toFixed(2)),
      hekuri: Number(hekuri.toFixed(2)),
      forca: Number(forca.toFixed(2)),
      vellimiMurit: Number(vellimiMurit.toFixed(2)),
      vellimiKembes: Number(vellimiKembes.toFixed(2))
    })
  }

  const handleInputChange = (setter: (value: number) => void, value: string) => {
    const numValue = parseFloat(value)
    if (!isNaN(numValue) && numValue > 0) {
      setter(numValue)
    }
  }

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Llogaritësi i Murit L
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Llogarit vëllimin, peshën dhe armaturën duke përfshirë murin vertikal dhe këmbën horizontale
          </p>
          <div className="w-32 h-1.5 bg-gradient-to-r from-[#256D7B] to-[#1a4f5a] mx-auto mt-6 rounded-full"></div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          {/* Informacion teknik */}
          <div className="mb-6 p-4 bg-[#256D7B]/5 rounded-lg border border-[#256D7B]/20">
            <div className="flex items-start">
              <FaInfoCircle className="text-[#256D7B] text-xl mt-0.5 mr-3 flex-shrink-0" />
              <div className="text-sm text-gray-600">
                <p className="font-medium text-[#256D7B] mb-1">Parametrat teknikë:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Densiteti i betonit: 2400 kg/m³</li>
                  <li>Armatura: ~120 kg/m³ beton</li>
                  <li>Kapaciteti mbajtës: ~250 kN/m³</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Input fields */}
          <div className="space-y-6">
            {/* Gjatësia e përbashkët */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FaRuler className="inline mr-2 text-[#256D7B]" />
                Gjatësia e murit (m)
              </label>
              <input
                type="number"
                min="0.1"
                max="10"
                step="0.1"
                value={gjatesia}
                onChange={(e) => handleInputChange(setGjatesia, e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#256D7B] focus:border-transparent transition"
              />
              <p className="text-xs text-gray-400 mt-1">Min: 0.1m, Max: 10m</p>
            </div>

            {/* Pjesa vertikale */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FaRuler className="inline mr-2 text-[#256D7B]" />
                  Lartësia e murit (m)
                </label>
                <input
                  type="number"
                  min="0.1"
                  max="5"
                  step="0.1"
                  value={lartesiaMurit}
                  onChange={(e) => handleInputChange(setLartesiaMurit, e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#256D7B] focus:border-transparent transition"
                />
                <p className="text-xs text-gray-400 mt-1">Min: 0.1m, Max: 5m</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FaRuler className="inline mr-2 text-[#256D7B]" />
                  Trashësia e murit (cm)
                </label>
                <input
                  type="number"
                  min="5"
                  max="50"
                  step="1"
                  value={trashesiaMurit}
                  onChange={(e) => handleInputChange(setTrashesiaMurit, e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#256D7B] focus:border-transparent transition"
                />
                <p className="text-xs text-gray-400 mt-1">Min: 5cm, Max: 50cm</p>
              </div>
            </div>

            {/* Pjesa horizontale (këmba) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FaRuler className="inline mr-2 text-[#256D7B]" />
                  Gjatësia e këmbës (m)
                </label>
                <input
                  type="number"
                  min="0.1"
                  max="2"
                  step="0.1"
                  value={gjatesiaKembes}
                  onChange={(e) => handleInputChange(setGjatesiaKembes, e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#256D7B] focus:border-transparent transition"
                />
                <p className="text-xs text-gray-400 mt-1">Min: 0.1m, Max: 2m</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FaRuler className="inline mr-2 text-[#256D7B]" />
                  Trashësia e këmbës (cm)
                </label>
                <input
                  type="number"
                  min="5"
                  max="50"
                  step="1"
                  value={trashesiaKembes}
                  onChange={(e) => handleInputChange(setTrashesiaKembes, e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#256D7B] focus:border-transparent transition"
                />
                <p className="text-xs text-gray-400 mt-1">Min: 5cm, Max: 50cm</p>
              </div>
            </div>
          </div>

          {/* Simulim 3D live i Murit L */}
          <div className="mt-8 bg-gradient-to-b from-gray-50 to-white rounded-xl border border-gray-100 py-6">
            <MuriLSimulim3D
              gjatesia={gjatesia}
              lartesiaMurit={lartesiaMurit}
              trashesiaMuritCM={trashesiaMurit}
              gjatesiaKembes={gjatesiaKembes}
              trashesiaKembesCM={trashesiaKembes}
            />
          </div>

          <button
            onClick={llogarit}
            className="w-full bg-gradient-to-r from-[#256D7B] to-[#1a4f5a] text-white px-6 py-4 rounded-lg font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center group mt-8 mb-8"
          >
            <FaCalculator className="mr-2 group-hover:rotate-12 transition" />
            Llogarit Murin L
          </button>

          {rezultati && (
            <div className="space-y-6">
              {/* Rezultatet kryesore */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-[#256D7B]/10 to-transparent p-6 rounded-xl border border-[#256D7B]/20">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-[#256D7B]/20 rounded-lg flex items-center justify-center mr-3">
                      <FaCube className="text-xl text-[#256D7B]" />
                    </div>
                    <h3 className="font-semibold text-gray-900">Vëllimi total</h3>
                  </div>
                  <p className="text-3xl font-bold text-[#256D7B] mb-1">{rezultati.vellimiTotal} m³</p>
                  <p className="text-sm text-gray-500">beton i armuar</p>
                </div>

                <div className="bg-gradient-to-br from-[#256D7B]/10 to-transparent p-6 rounded-xl border border-[#256D7B]/20">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-[#256D7B]/20 rounded-lg flex items-center justify-center mr-3">
                      <FaWeight className="text-xl text-[#256D7B]" />
                    </div>
                    <h3 className="font-semibold text-gray-900">Pesha totale</h3>
                  </div>
                  <p className="text-3xl font-bold text-[#256D7B] mb-1">{rezultati.pesha} ton</p>
                  <p className="text-sm text-gray-500">pesha totale</p>
                </div>
              </div>

              {/* Vëllimet e ndara */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500 mb-1">Vëllimi i murit vertikal</p>
                  <p className="text-xl font-semibold text-gray-900">{rezultati.vellimiMurit} m³</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500 mb-1">Vëllimi i këmbës</p>
                  <p className="text-xl font-semibold text-gray-900">{rezultati.vellimiKembes} m³</p>
                </div>
              </div>

              {/* Rezultatet sekondare */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500 mb-1">Hekuri (armaturë)</p>
                  <p className="text-xl font-semibold text-gray-900">{rezultati.hekuri} kg</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500 mb-1">Forca mbajtëse</p>
                  <p className="text-xl font-semibold text-gray-900">{rezultati.forca} kN</p>
                </div>
              </div>

              {/* Informacion shtesë */}
              <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
                <p className="text-sm text-green-800">
                  <span className="font-semibold">Rekomandim:</span> Për këtë mur L, rekomandojmë 
                  përdorimin e betonit të klasës C25/30 dhe armaturës ø10-14mm sipas projektit.
                </p>
              </div>

              {/* Butoni për ofertë */}
              <div className="flex justify-center mt-6">
                <button className="bg-white border-2 border-[#256D7B] text-[#256D7B] px-6 py-3 rounded-lg font-semibold hover:bg-[#256D7B] hover:text-white transition-all duration-300 flex items-center group">
                  Kërko ofertë për këtë mur
                  <FaArrowRight className="ml-2 group-hover:translate-x-1 transition" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}