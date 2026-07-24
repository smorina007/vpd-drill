'use client'

import { useState } from 'react'
import emailjs from '@emailjs/browser'
import { FaTimes, FaStar, FaSpinner, FaCheckCircle } from 'react-icons/fa'

type ModalProps = {
  isOpen: boolean
  onClose: () => void
}

const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_CONTACT!
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!

export default function ModalVleresime({ isOpen, onClose }: ModalProps) {
  const [vleresimi, setVleresimi] = useState(5)
  const [emri, setEmri] = useState('')
  const [komenti, setKomenti] = useState('')
  const [isSending, setIsSending] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const resetAndClose = () => {
    setEmri('')
    setKomenti('')
    setVleresimi(5)
    setStatus('idle')
    onClose()
  }

  const dergoVleresimin = () => {
    if (!emri.trim() || !komenti.trim()) {
      alert('Ju lutem plotësoni të gjitha fushat')
      return
    }

    setIsSending(true)
    setStatus('idle')

    // Vlerësimi dërgohet te ekipi për shqyrtim para se të publikohet,
    // në vend që të shtohet automatikisht (fals) te lista publike.
    emailjs
      .send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        to_email: 'info@vllezeritpaqarizi.com',
        user_name: emri,
        user_email: '',
        user_phone: '',
        subject: `Vlerësim i ri nga uebfaqja (${vleresimi}/5 yje)`,
        message: komenti,
      }, EMAILJS_PUBLIC_KEY)
      .then(() => {
        setStatus('success')
        setTimeout(resetAndClose, 2500)
      })
      .catch((error) => {
        console.error('EmailJS error:', error)
        setStatus('error')
      })
      .finally(() => setIsSending(false))
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
          {status === 'success' ? (
            <div className="p-8 text-center space-y-3">
              <FaCheckCircle className="mx-auto text-5xl text-green-500" />
              <p className="text-gray-800 font-semibold">Faleminderit për vlerësimin tuaj!</p>
              <p className="text-gray-500 text-sm">
                E kemi marrë dhe do ta shqyrtojmë përpara se ta publikojmë.
              </p>
            </div>
          ) : (
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

              {status === 'error' && (
                <p className="text-sm text-red-600">
                  Dërgimi dështoi. Ju lutem provoni përsëri.
                </p>
              )}

              <button
                onClick={dergoVleresimin}
                disabled={isSending}
                className="w-full bg-[#256D7B] text-white py-3 rounded-lg font-semibold hover:bg-[#1a4f5a] transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSending && <FaSpinner className="animate-spin" />}
                {isSending ? 'Duke dërguar...' : 'Dërgo vlerësimin'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
