'use client'

import { useState } from 'react'
import { FaTimes, FaCalculator, FaRuler, FaWeight, FaCube, FaInfoCircle } from 'react-icons/fa'

type ModalProps = {
  isOpen: boolean
  onClose: () => void
}

export default function ModalLlogaritesMuriL({ isOpen, onClose }: ModalProps) {
  const [gjatesia, setGjatesia] = useState<number>(2)
  const [lartesiaMurit, setLartesiaMurit] = useState<number>(1.5)
  const [trashesiaMurit, setTrashesiaMurit] = useState<number>(12)
  const [gjatesiaKembes, setGjatesiaKembes] = useState<number>(0.8)
  const [trashesiaKembes, setTrashesiaKembes] = useState<number>(20)
  const [rezultati, setRezultati] = useState<{
    vellimiTotal: number
    pesha: number
    hekuri: number
    forca: number
    vellimiMurit: number
    vellimiKembes: number
  } | null>(null)

  const densitetiBetoni = 2400 // kg/m³
  const hekuriPerM3 = 120 // kg/m³ beton
  const forcaPerM3 = 250 // kN/m³

  const llogarit = () => {
    const tMurit = trashesiaMurit / 100
    const tKembes = trashesiaKembes / 100

    const vellimiMurit = gjatesia * lartesiaMurit * tMurit
    const vellimiKembes = gjatesia * gjatesiaKembes * tKembes
    const vellimiTotal = vellimiMurit + vellimiKembes

    const pesha = (vellimiTotal * densitetiBetoni) / 1000
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

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[60] overflow-y-auto">
      <div className="flex items-end sm:items-center justify-center min-h-screen">
        <div className="fixed inset-0 bg-gray-900/75" onClick={onClose} />

        <div className="relative bg-white w-full sm:rounded-2xl sm:max-w-3xl sm:mx-4 rounded-t-2xl sm:my-8 max-h-[90vh] flex flex-col">
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-3 sm:px-6 sm:py-4 flex justify-between items-center z-10">
            <h3 className="text-lg sm:text-2xl font-bold text-gray-900">Llogaritësi i Murit L</h3>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition">
              <FaTimes className="text-xl sm:text-2xl text-gray-500" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 sm:p-6">
            {/* Informacion teknik */}
            <div className="mb-4 p-3 bg-[#256D7B]/5 rounded-lg border border-[#256D7B]/20">
              <div className="flex items-start">
                <FaInfoCircle className="text-[#256D7B] text-base mt-0.5 mr-2 flex-shrink-0" />
                <div className="text-xs text-gray-600">
                  <p className="font-medium text-[#256D7B] mb-1">Parametrat teknikë:</p>
                  <ul className="list-disc list-inside">
                    <li>Densiteti: 2400 kg/m³</li>
                    <li>Armatura: ~120 kg/m³</li>
                    <li>Kapaciteti: ~250 kN/m³</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {/* Gjatësia e përbashkët */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <FaRuler className="inline mr-1 text-[#256D7B]" /> Gjatësia e murit (m)
                </label>
                <input
                  type="number"
                  min="0.1"
                  max="10"
                  step="0.1"
                  value={gjatesia}
                  onChange={(e) => handleInputChange(setGjatesia, e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#256D7B] text-sm"
                />
              </div>

              {/* Pjesa vertikale */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Lartësia e murit (m)
                  </label>
                  <input
                    type="number"
                    min="0.1"
                    max="5"
                    step="0.1"
                    value={lartesiaMurit}
                    onChange={(e) => handleInputChange(setLartesiaMurit, e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#256D7B] text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Trashësia e murit (cm)
                  </label>
                  <input
                    type="number"
                    min="5"
                    max="50"
                    step="1"
                    value={trashesiaMurit}
                    onChange={(e) => handleInputChange(setTrashesiaMurit, e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#256D7B] text-sm"
                  />
                </div>
              </div>

              {/* Pjesa horizontale (këmba) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Gjatësia e këmbës (m)
                  </label>
                  <input
                    type="number"
                    min="0.1"
                    max="2"
                    step="0.1"
                    value={gjatesiaKembes}
                    onChange={(e) => handleInputChange(setGjatesiaKembes, e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#256D7B] text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Trashësia e këmbës (cm)
                  </label>
                  <input
                    type="number"
                    min="5"
                    max="50"
                    step="1"
                    value={trashesiaKembes}
                    onChange={(e) => handleInputChange(setTrashesiaKembes, e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#256D7B] text-sm"
                  />
                </div>
              </div>

              <button
                onClick={llogarit}
                className="w-full bg-gradient-to-r from-[#256D7B] to-[#1a4f5a] text-white py-3 rounded-lg font-semibold hover:shadow-lg transition mt-2 flex items-center justify-center"
              >
                <FaCalculator className="mr-2" /> Llogarit
              </button>

              {rezultati && (
                <div className="mt-4 space-y-3">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-[#256D7B]/10 p-3 rounded-lg">
                      <p className="text-xs text-gray-500">Vëllimi total</p>
                      <p className="text-lg font-bold text-[#256D7B]">{rezultati.vellimiTotal} m³</p>
                    </div>
                    <div className="bg-[#256D7B]/10 p-3 rounded-lg">
                      <p className="text-xs text-gray-500">Pesha totale</p>
                      <p className="text-lg font-bold text-[#256D7B]">{rezultati.pesha} ton</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-gray-50 p-2 rounded">
                      <p className="text-xs text-gray-500">Vëllimi i murit</p>
                      <p className="text-sm font-semibold">{rezultati.vellimiMurit} m³</p>
                    </div>
                    <div className="bg-gray-50 p-2 rounded">
                      <p className="text-xs text-gray-500">Vëllimi i këmbës</p>
                      <p className="text-sm font-semibold">{rezultati.vellimiKembes} m³</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-gray-50 p-2 rounded">
                      <p className="text-xs text-gray-500">Hekuri</p>
                      <p className="text-sm font-semibold">{rezultati.hekuri} kg</p>
                    </div>
                    <div className="bg-gray-50 p-2 rounded">
                      <p className="text-xs text-gray-500">Forca</p>
                      <p className="text-sm font-semibold">{rezultati.forca} kN</p>
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