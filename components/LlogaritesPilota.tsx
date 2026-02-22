'use client'

import { useState } from 'react'
import { FaCalculator, FaRuler, FaWeight, FaCube, FaArrowsAltV } from 'react-icons/fa'

export default function LlogaritesPilota() {
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
    const rrezja = diametri / 1000 / 2 // konverto mm në m dhe merr rrezen
    const siperfaqja = Math.PI * rrezja * rrezja
    const vellimi = siperfaqja * thellesia
    const pesha = vellimi * densitetiBetoni
    const hekuri = vellimi * hekuriPerM3
    const kapaciteti = siperfaqja * 400 // kN/m² (përllogaritje e thjeshtë)

    setRezultati({
      vellimi: Number(vellimi.toFixed(2)),
      pesha: Number((pesha / 1000).toFixed(2)),
      hekuri: Number(hekuri.toFixed(2)),
      kapaciteti: Number((kapaciteti * thellesia).toFixed(2))
    })
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Llogaritësi i Pilotave
          </h2>
          <p className="text-lg text-gray-600">
            Llogarit vëllimin e betonit dhe peshën e pilotave
          </p>
        </div>

        <div className="bg-gray-50 rounded-2xl p-8 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
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
                value={thellesia}
                onChange={(e) => setThellesia(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#256D7B]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FaRuler className="inline mr-2 text-[#256D7B]" />
                Diametri (mm)
              </label>
              <select
                value={diametri}
                onChange={(e) => setDiametri(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#256D7B]"
              >
                <option value="400">400 mm</option>
                <option value="500">500 mm</option>
                <option value="600">600 mm</option>
                <option value="800">800 mm</option>
                <option value="1000">1000 mm</option>
                <option value="1200">1200 mm</option>
              </select>
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
              <div className="bg-white p-6 rounded-lg">
                <div className="flex items-center mb-2">
                  <FaCube className="text-2xl text-[#256D7B] mr-3" />
                  <h3 className="font-semibold text-gray-900">Vëllimi</h3>
                </div>
                <p className="text-3xl font-bold text-[#256D7B]">{rezultati.vellimi} m³</p>
                <p className="text-sm text-gray-500">beton për pilotë</p>
              </div>

              <div className="bg-white p-6 rounded-lg">
                <div className="flex items-center mb-2">
                  <FaWeight className="text-2xl text-[#256D7B] mr-3" />
                  <h3 className="font-semibold text-gray-900">Pesha</h3>
                </div>
                <p className="text-3xl font-bold text-[#256D7B]">{rezultati.pesha} ton</p>
                <p className="text-sm text-gray-500">pesha e pilotës</p>
              </div>

              <div className="bg-white p-6 rounded-lg">
                <div className="flex items-center mb-2">
                  <FaWeight className="text-2xl text-[#256D7B] mr-3" />
                  <h3 className="font-semibold text-gray-900">Hekuri</h3>
                </div>
                <p className="text-3xl font-bold text-[#256D7B]">{rezultati.hekuri} kg</p>
                <p className="text-sm text-gray-500">armaturë</p>
              </div>

              <div className="bg-white p-6 rounded-lg">
                <div className="flex items-center mb-2">
                  <FaCube className="text-2xl text-[#256D7B] mr-3" />
                  <h3 className="font-semibold text-gray-900">Kapaciteti</h3>
                </div>
                <p className="text-3xl font-bold text-[#256D7B]">{rezultati.kapaciteti} kN</p>
                <p className="text-sm text-gray-500">≈ {(rezultati.kapaciteti / 10).toFixed(2)} ton</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}