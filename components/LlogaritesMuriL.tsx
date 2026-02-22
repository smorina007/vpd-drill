'use client'

import { useState } from 'react'
import { FaCalculator, FaRuler, FaWeight, FaCube } from 'react-icons/fa'

export default function LlogaritesMuriL() {
  const [gjatesia, setGjatesia] = useState<number>(2)
  const [lartesia, setLartesia] = useState<number>(1.5)
  const [trashesia, setTrashesia] = useState<number>(20)
  const [rezultati, setRezultati] = useState<{
    vellimi: number
    pesha: number
    hekuri: number
    forca: number
  } | null>(null)

  const densitetiBetoni = 2400 // kg/m³
  const hekuriPerM3 = 120 // kg/m³ beton (mesatare)

  const llogarit = () => {
    const gjatesiaM = gjatesia
    const lartesiaM = lartesia
    const trashesiaM = trashesia / 100 // konverto cm në m

    const vellimi = gjatesiaM * lartesiaM * trashesiaM
    const pesha = vellimi * densitetiBetoni
    const hekuri = vellimi * hekuriPerM3
    const forca = vellimi * 250 // kN/m³ (përllogaritje e thjeshtë)

    setRezultati({
      vellimi: Number(vellimi.toFixed(2)),
      pesha: Number((pesha / 1000).toFixed(2)), // konverto në ton
      hekuri: Number(hekuri.toFixed(2)),
      forca: Number(forca.toFixed(2))
    })
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Llogaritësi i Murit L
          </h2>
          <p className="text-lg text-gray-600">
            Llogarit shpejt peshën dhe sasinë e materialit për murin L
          </p>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FaRuler className="inline mr-2 text-[#256D7B]" />
                Gjatësia (m)
              </label>
              <input
                type="number"
                min="0.1"
                step="0.1"
                value={gjatesia}
                onChange={(e) => setGjatesia(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#256D7B]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FaRuler className="inline mr-2 text-[#256D7B]" />
                Lartësia (m)
              </label>
              <input
                type="number"
                min="0.1"
                step="0.1"
                value={lartesia}
                onChange={(e) => setLartesia(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#256D7B]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FaRuler className="inline mr-2 text-[#256D7B]" />
                Trashësia (cm)
              </label>
              <input
                type="number"
                min="10"
                max="50"
                step="5"
                value={trashesia}
                onChange={(e) => setTrashesia(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#256D7B]"
              />
            </div>
          </div>

          <button
            onClick={llogarit}
            className="w-full bg-[#256D7B] text-white px-6 py-4 rounded-lg font-semibold hover:bg-[#1a4f5a] transition flex items-center justify-center mb-8"
          >
            <FaCalculator className="mr-2" />
            Llogarit
          </button>

          {rezultati && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-center mb-2">
                  <FaCube className="text-2xl text-[#256D7B] mr-3" />
                  <h3 className="font-semibold text-gray-900">Vëllimi</h3>
                </div>
                <p className="text-3xl font-bold text-[#256D7B]">{rezultati.vellimi} m³</p>
                <p className="text-sm text-gray-500">beton</p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-center mb-2">
                  <FaWeight className="text-2xl text-[#256D7B] mr-3" />
                  <h3 className="font-semibold text-gray-900">Pesha</h3>
                </div>
                <p className="text-3xl font-bold text-[#256D7B]">{rezultati.pesha} ton</p>
                <p className="text-sm text-gray-500">pesha totale</p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-center mb-2">
                  <FaWeight className="text-2xl text-[#256D7B] mr-3" />
                  <h3 className="font-semibold text-gray-900">Hekuri</h3>
                </div>
                <p className="text-3xl font-bold text-[#256D7B]">{rezultati.hekuri} kg</p>
                <p className="text-sm text-gray-500">armaturë</p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-center mb-2">
                  <FaCube className="text-2xl text-[#256D7B] mr-3" />
                  <h3 className="font-semibold text-gray-900">Forca</h3>
                </div>
                <p className="text-3xl font-bold text-[#256D7B]">{rezultati.forca} kN</p>
                <p className="text-sm text-gray-500">kapacitet mbajtës</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}