'use client'

import { useState } from 'react'
import { FaTimes, FaStar, FaStarHalf, FaUser, FaPaperPlane } from 'react-icons/fa'

type ModalProps = {
  isOpen: boolean
  onClose: () => void
}

export default function ModalVleresime({ isOpen, onClose }: ModalProps) {
  const [vleresimi, setVleresimi] = useState(5)
  const [emri, setEmri] = useState('')
  const [komenti, setKomenti] = useState('')

  const renderYjet = (count: number) => {
    const yjet = []
    for (let i = 1; i <= 5; i++) {
      yjet.push(
        <button
          key={i}
          onClick={() => setVleresimi(i)}
          className="focus:outline-none"
        >
          <FaStar 
            className={`text-3xl ${
              i <= vleresimi ? 'text-yellow-400' : 'text-gray-300'
            } hover:scale-110 transition`} 
          />
        </button>
      )
    }
    return yjet
  }

  const dergoVleresimin = () => {
    // Këtu do të dërgohet në backend
    console.log({ emri, vleresimi, komenti })
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[60] overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-900 opacity-75" onClick={onClose}></div>
        </div>

        <div className="inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-6 pt-6 pb-4 sm:p-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Vlerëso Shërbimin Tonë</h3>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
                <FaTimes className="text-2xl" />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Emri Juaj
                </label>
                <input
                  type="text"
                  value={emri}
                  onChange={(e) => setEmri(e.target.value)}
                  placeholder="Shkruani emrin tuaj"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#256D7B]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Vlerësimi
                </label>
                <div className="flex space-x-2">
                  {renderYjet(vleresimi)}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Komenti Juaj
                </label>
                <textarea
                  value={komenti}
                  onChange={(e) => setKomenti(e.target.value)}
                  rows={4}
                  placeholder="Shkruani komentin tuaj..."
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#256D7B]"
                />
              </div>

              <button
                onClick={dergoVleresimin}
                className="w-full bg-[#256D7B] text-white px-6 py-4 rounded-lg font-semibold hover:bg-[#1a4f5a] transition flex items-center justify-center"
              >
                <FaPaperPlane className="mr-2" />
                Dërgo Vlerësimin
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}