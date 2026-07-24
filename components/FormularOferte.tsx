'use client'

import { useRef, useState, FormEvent } from 'react'
import emailjs from '@emailjs/browser'
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane, FaSpinner, FaCheckCircle } from 'react-icons/fa'

type Sherbimi = 'bunar' | 'pilota' | 'ankera' | 'muri-l' | 'gypa-betoni' | 'pllaka' | 'gypa-per-puse' | 'sajla'

const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_OFERTE!
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!

export default function FormularOferte() {
  const formRef = useRef<HTMLFormElement>(null)
  const [selectedSherbim, setSelectedSherbim] = useState<Sherbimi>('bunar')
  const [isSending, setIsSending] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [formData, setFormData] = useState({
    emri: '',
    email: '',
    telefoni: '',
    lokacioni: '',
  })
  const [specifikat, setSpecifikat] = useState({
    thellesia: '',
    diametri: '',
    llojiTerrenit: 'Terren i fortë (shkëmbor)',
    numriPilotave: '',
    gjatesia: '',
    lartesia: '',
    trashesia: '',
  })

  const sherbimet = [
    { id: 'bunar', label: 'Bunar (Shpim pusi)' },
    { id: 'pilota', label: 'Pilota' },
    { id: 'ankera', label: 'Ankera' },
    { id: 'muri-l', label: 'Muri L' },
    { id: 'gypa-betoni', label: 'Gypa betoni' },
    { id: 'pllaka', label: 'Pllaka betoni' },
    { id: 'gypa-per-puse', label: 'Gypa për puse' },
    { id: 'sajla', label: 'Sajla' },
  ]

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!formRef.current) return

    setIsSending(true)
    setStatus('idle')

    const sherbimLabel = sherbimet.find((s) => s.id === selectedSherbim)?.label ?? selectedSherbim
    const specifikaText = Object.entries(specifikat)
      .filter(([, v]) => v !== '')
      .map(([k, v]) => `${k}: ${v}`)
      .join(', ')

    // Fusha të fshehta që i shtojmë vetë formularit para dërgimit te EmailJS
    const hiddenFields: HTMLInputElement[] = []
    const addHidden = (name: string, value: string) => {
      const input = document.createElement('input')
      input.type = 'hidden'
      input.name = name
      input.value = value
      formRef.current!.appendChild(input)
      hiddenFields.push(input)
    }
    addHidden('service', sherbimLabel)
    addHidden('specifikat', specifikaText || '—')
    addHidden('to_email', 'info@vllezeritpaqarizi.com')

    emailjs
      .sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, formRef.current, EMAILJS_PUBLIC_KEY)
      .then(() => {
        setStatus('success')
        formRef.current?.reset()
        setFormData({ emri: '', email: '', telefoni: '', lokacioni: '' })
        setSpecifikat({
          thellesia: '',
          diametri: '',
          llojiTerrenit: 'Terren i fortë (shkëmbor)',
          numriPilotave: '',
          gjatesia: '',
          lartesia: '',
          trashesia: '',
        })
      })
      .catch((error) => {
        console.error('EmailJS error:', error)
        setStatus('error')
      })
      .finally(() => {
        hiddenFields.forEach((f) => f.remove())
        setIsSending(false)
      })
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Kërko Ofertë</h2>
          <p className="text-lg text-gray-600">
            Plotësoni formularin dhe ne do t'ju kontaktojmë brenda 24 orëve
          </p>
        </div>

        <form ref={formRef} onSubmit={handleSubmit} className="bg-gray-50 rounded-2xl p-8 shadow-lg">
          {/* Të dhënat e klientit */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FaUser className="inline mr-2 text-[#256D7B]" />
                Emri dhe Mbiemri
              </label>
              <input
                type="text"
                name="user_name"
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#256D7B] focus:border-transparent"
                value={formData.emri}
                onChange={(e) => setFormData({ ...formData, emri: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FaEnvelope className="inline mr-2 text-[#256D7B]" />
                Email
              </label>
              <input
                type="email"
                name="user_email"
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#256D7B] focus:border-transparent"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FaPhone className="inline mr-2 text-[#256D7B]" />
                Telefoni
              </label>
              <input
                type="tel"
                name="user_phone"
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#256D7B] focus:border-transparent"
                value={formData.telefoni}
                onChange={(e) => setFormData({ ...formData, telefoni: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FaMapMarkerAlt className="inline mr-2 text-[#256D7B]" />
                Lokacioni i projektit
              </label>
              <input
                type="text"
                name="lokacioni"
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#256D7B] focus:border-transparent"
                value={formData.lokacioni}
                onChange={(e) => setFormData({ ...formData, lokacioni: e.target.value })}
              />
            </div>
          </div>

          {/* Zgjedhja e shërbimit */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Zgjedh shërbimin / produktin
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {sherbimet.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setSelectedSherbim(s.id as Sherbimi)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                    selectedSherbim === s.id
                      ? 'bg-[#256D7B] text-white'
                      : 'bg-white border border-gray-300 text-gray-700 hover:border-[#256D7B]'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Specifikimet sipas shërbimit */}
          <div className="mb-8 p-6 bg-white rounded-lg border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-4">Specifikimet teknike (opsionale)</h3>

            {selectedSherbim === 'bunar' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Thellësia (m)</label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border rounded"
                    value={specifikat.thellesia}
                    onChange={(e) => setSpecifikat({ ...specifikat, thellesia: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Diametri (mm)</label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border rounded"
                    value={specifikat.diametri}
                    onChange={(e) => setSpecifikat({ ...specifikat, diametri: e.target.value })}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm text-gray-600 mb-1">Lloji i terrenit</label>
                  <select
                    className="w-full px-3 py-2 border rounded"
                    value={specifikat.llojiTerrenit}
                    onChange={(e) => setSpecifikat({ ...specifikat, llojiTerrenit: e.target.value })}
                  >
                    <option>Terren i fortë (shkëmbor)</option>
                    <option>Terren i butë (argjilë)</option>
                    <option>Terren i përzier</option>
                  </select>
                </div>
              </div>
            )}

            {selectedSherbim === 'pilota' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Thellësia (m)</label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border rounded"
                    value={specifikat.thellesia}
                    onChange={(e) => setSpecifikat({ ...specifikat, thellesia: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Diametri (mm)</label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border rounded"
                    value={specifikat.diametri}
                    onChange={(e) => setSpecifikat({ ...specifikat, diametri: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Numri i pilotave</label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border rounded"
                    value={specifikat.numriPilotave}
                    onChange={(e) => setSpecifikat({ ...specifikat, numriPilotave: e.target.value })}
                  />
                </div>
              </div>
            )}

            {selectedSherbim === 'muri-l' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Gjatësia (m)</label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border rounded"
                    value={specifikat.gjatesia}
                    onChange={(e) => setSpecifikat({ ...specifikat, gjatesia: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Lartësia (m)</label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border rounded"
                    value={specifikat.lartesia}
                    onChange={(e) => setSpecifikat({ ...specifikat, lartesia: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Trashësia (cm)</label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border rounded"
                    value={specifikat.trashesia}
                    onChange={(e) => setSpecifikat({ ...specifikat, trashesia: e.target.value })}
                  />
                </div>
              </div>
            )}

            {!['bunar', 'pilota', 'muri-l'].includes(selectedSherbim) && (
              <p className="text-sm text-gray-500">
                Na shkruani sasinë/madhësinë e nevojshme te lokacioni ose do t'ju kontaktojmë për detaje.
              </p>
            )}
          </div>

          {/* Mesazhe statusi */}
          {status === 'success' && (
            <div className="mb-6 flex items-center gap-2 rounded-lg bg-green-50 border border-green-200 text-green-700 px-4 py-3">
              <FaCheckCircle />
              <span>Kërkesa u dërgua me sukses! Do t'ju kontaktojmë së shpejti.</span>
            </div>
          )}
          {status === 'error' && (
            <div className="mb-6 rounded-lg bg-red-50 border border-red-200 text-red-700 px-4 py-3">
              Dërgimi dështoi. Ju lutem provoni përsëri ose na kontaktoni në telefon.
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSending}
            className="w-full bg-[#256D7B] text-white px-6 py-4 rounded-lg font-semibold hover:bg-[#1a4f5a] transition flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSending ? (
              <>
                <FaSpinner className="mr-2 animate-spin" />
                Duke dërguar...
              </>
            ) : (
              <>
                <FaPaperPlane className="mr-2" />
                Dërgo Kërkesën
              </>
            )}
          </button>
        </form>
      </div>
    </section>
  )
}
