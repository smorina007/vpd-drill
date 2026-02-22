'use client'

import { useState } from 'react'
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa'

type Sherbimi = 'bunar' | 'pilota' | 'ankera' | 'muri-l' | 'gypa-betoni' | 'pllaka' | 'gypa-per-puse' | 'sajla'

export default function FormularOferte() {
  const [selectedSherbim, setSelectedSherbim] = useState<Sherbimi>('bunar')
  const [formData, setFormData] = useState({
    emri: '',
    email: '',
    telefoni: '',
    lokacioni: '',
    specifikat: {}
  })

  const sherbimet = [
    { id: 'bunar', label: 'Bunar (Shpim pusi)' },
    { id: 'pilota', label: 'Pilota' },
    { id: 'ankera', label: 'Ankera' },
    { id: 'muri-l', label: 'Muri L' },
    { id: 'gypa-betoni', label: 'Gypa betoni' },
    { id: 'pllaka', label: 'Pllaka betoni' },
    { id: 'gypa-per-puse', label: 'Gypa për puse' },
    { id: 'sajla', label: 'Sajla' }
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Këtu do të dërgohet email te info@vllezeritpaqarizi.com
    console.log('Form submitted:', { sherbim: selectedSherbim, ...formData })
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Kërko Ofertë
          </h2>
          <p className="text-lg text-gray-600">
            Plotësoni formularin dhe ne do t'ju kontaktojmë brenda 24 orëve
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-gray-50 rounded-2xl p-8 shadow-lg">
          {/* Të dhënat e klientit */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FaUser className="inline mr-2 text-[#256D7B]" />
                Emri dhe Mbiemri
              </label>
              <input
                type="text"
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#256D7B] focus:border-transparent"
                value={formData.emri}
                onChange={(e) => setFormData({...formData, emri: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FaEnvelope className="inline mr-2 text-[#256D7B]" />
                Email
              </label>
              <input
                type="email"
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#256D7B] focus:border-transparent"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FaPhone className="inline mr-2 text-[#256D7B]" />
                Telefoni
              </label>
              <input
                type="tel"
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#256D7B] focus:border-transparent"
                value={formData.telefoni}
                onChange={(e) => setFormData({...formData, telefoni: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FaMapMarkerAlt className="inline mr-2 text-[#256D7B]" />
                Lokacioni i projektit
              </label>
              <input
                type="text"
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#256D7B] focus:border-transparent"
                value={formData.lokacioni}
                onChange={(e) => setFormData({...formData, lokacioni: e.target.value})}
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
            <h3 className="font-semibold text-gray-900 mb-4">Specifikimet teknike</h3>
            
            {selectedSherbim === 'bunar' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Thellësia (m)</label>
                  <input type="number" className="w-full px-3 py-2 border rounded" />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Diametri (mm)</label>
                  <input type="number" className="w-full px-3 py-2 border rounded" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm text-gray-600 mb-1">Lloji i terrenit</label>
                  <select className="w-full px-3 py-2 border rounded">
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
                  <input type="number" className="w-full px-3 py-2 border rounded" />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Diametri (mm)</label>
                  <input type="number" className="w-full px-3 py-2 border rounded" />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Numri i pilotave</label>
                  <input type="number" className="w-full px-3 py-2 border rounded" />
                </div>
              </div>
            )}

            {selectedSherbim === 'muri-l' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Gjatësia (m)</label>
                  <input type="number" className="w-full px-3 py-2 border rounded" />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Lartësia (m)</label>
                  <input type="number" className="w-full px-3 py-2 border rounded" />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Trashësia (cm)</label>
                  <input type="number" className="w-full px-3 py-2 border rounded" />
                </div>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#256D7B] text-white px-6 py-4 rounded-lg font-semibold hover:bg-[#1a4f5a] transition flex items-center justify-center"
          >
            <FaPaperPlane className="mr-2" />
            Dërgo Kërkesën
          </button>
        </form>
      </div>
    </section>
  )
}