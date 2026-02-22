'use client'

import { useState } from 'react'
import { FaTimes, FaCalculator, FaRuler, FaWeight, FaCube, FaArrowsAltV } from 'react-icons/fa'

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
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-900 opacity-75" onClick={onClose}></div>
        </div>

        <div className="inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
          <div className="bg-white px-6 pt-6 pb-4 sm:p-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Llogaritësi i Pilotave</h3>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
                <FaTimes className="text-2xl" />
              </button>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  </select>
                </div>
              </div>

              <button
                onClick={llogarit}
                className="w-full bg-[#256D7B] text-white px-6 py-4 rounded-lg font-semibold hover:bg-[#1a4f5a] transition flex items-center justify-center"
              >
                <FaCalculator className="mr-2" />
                Llogarit
              </button>

              {rezultati && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Vëllimi</h4>
                    <p className="text-2xl font-bold text-[#256D7B]">{rezultati.vellimi} m³</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Pesha</h4>
                    <p className="text-2xl font-bold text-[#256D7B]">{rezultati.pesha} ton</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Hekuri</h4>
                    <p className="text-2xl font-bold text-[#256D7B]">{rezultati.hekuri} kg</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Kapaciteti</h4>
                    <p className="text-2xl font-bold text-[#256D7B]">{rezultati.kapaciteti} kN</p>
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