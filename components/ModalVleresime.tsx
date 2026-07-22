'use client'

import { useState } from 'react'
import { FaTimes, FaStar } from 'react-icons/fa'

type ModalProps = {
  isOpen: boolean
  onClose: () => void
  onSubmit: (vleresim: any) => void
}

export default function ModalVleresime({ isOpen, onClose, onSubmit }: ModalProps) {
  const [vleresimi, setVleresimi] = useState(5)
  const [emri, setEmri] = useState('')
  const [komenti, setKomenti] = useState('')

  const dergoVleresimin = () => {
    if (!emri.trim() || !komenti.trim()) {
      alert('Ju lutem plotësoni të gjitha fushat')
      return
    }

    const newVleresim = {
      id: Date.now(), // ID unik
      emri,
      roli: 'Klient',
      vleresimi,
      data: new Date().toLocaleDateString('sq-AL'),
      komenti
    }

    onSubmit(newVleresim)

    // Pastro fushat dhe mbyll modal-in
    setEmri('')
    setKomenti('')
    setVleresimi(5)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[60] overflow-y-auto">
      <div className="flex items-end sm:items-center justify-center min-h-screen">
        <div className="fixed inset-0 bg-gray-900/75" onClick={onClose} />

        <div className="relative bg-white w-full sm:rounded-2xl sm:max-w-lg sm:mx-4 rounded-t-2xl sm:my-8">
          {/* Header */}
          <div className="sticky top-0 bg-white border-b px-4 py-3 flex justify-between items-center">
            <h3 className="text-lg font-bold">Lini një vlerësim</h3>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
              <FaTimes />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Emri juaj</label>
              <input
                type="text"
                value={emri}
                onChange={(e) => setEmri(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Vlerësimi</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((v) => (
                  <button key={v} onClick={() => setVleresimi(v)} type="button">
                    <FaStar className={v <= vleresimi ? 'text-yellow-400' : 'text-gray-300'} size={24} />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Komenti</label>
              <textarea
                value={komenti}
                onChange={(e) => setKomenti(e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border rounded-lg"
                required
              />
            </div>

            <button
              onClick={dergoVleresimin}
              className="w-full bg-[#256D7B] text-white py-3 rounded-lg font-semibold hover:bg-[#1a4f5a] transition"
            >
              Dërgo vlerësimin
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}