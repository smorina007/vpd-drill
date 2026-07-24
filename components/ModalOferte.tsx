'use client'

import { useState, useRef, FormEvent } from 'react'
import emailjs from '@emailjs/browser'
import { 
  FaTimes, FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, 
  FaPaperPlane, FaWhatsapp, FaEnvelope as FaEnvelopeSolid
} from 'react-icons/fa'

type ModalProps = {
  isOpen: boolean
  onClose: () => void
}

type Sherbimi = 'bunar' | 'pilota' | 'ankera' | 'muri-l' | 'gypa-betoni' | 'pllaka' | 'gypa-per-puse' | 'sajla'

const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_OFERTE!
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!

export default function ModalOferte({ isOpen, onClose }: ModalProps) {
  const formRef = useRef<HTMLFormElement>(null)
  const [isSending, setIsSending] = useState(false)

  const [selectedSherbim, setSelectedSherbim] = useState<Sherbimi>('bunar')
  const [emri, setEmri] = useState('')
  const [email, setEmail] = useState('')
  const [telefoni, setTelefoni] = useState('')
  const [lokacioni, setLokacioni] = useState('')
  
  // Specifikime të përbashkëta
  const [thellesia, setThellesia] = useState('')
  const [diametri, setDiametri] = useState('')
  const [llojiTerrenit, setLlojiTerrenit] = useState('Terren i fortë (shkëmbor)')
  const [numriPilotave, setNumriPilotave] = useState('')
  const [gjatesia, setGjatesia] = useState('')
  const [lartesia, setLartesia] = useState('')
  const [trashesia, setTrashesia] = useState('')
  
  // Specifikime për gypa betoni
  const [diametriGypit, setDiametriGypit] = useState('')
  const [sasiaGypave, setSasiaGypave] = useState('')
  
  // Specifikime për gypa për puse
  const [llojiGypit, setLlojiGypit] = useState<'plastik' | 'hekuri' | ''>('')
  const [diametriGypitPuse, setDiametriGypitPuse] = useState('')
  const [metratGypit, setMetratGypit] = useState('')
  
  // Specifikime për sajla
  const [diametriSajles, setDiametriSajles] = useState('')
  const [metratSajles, setMetratSajles] = useState('')
  const [perdorimiSajles, setPerdorimiSajles] = useState('')

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

  const handleWhatsApp = () => {
    const message = `*Kërkesë për ofertë – VPD DRILL*%0A%0A` +
      `*Shërbimi:* ${selectedSherbim}%0A` +
      `*Emri:* ${emri}%0A` +
      `*Email:* ${email}%0A` +
      `*Telefoni:* ${telefoni}%0A` +
      `*Lokacioni:* ${lokacioni}%0A` +
      (thellesia ? `*Thellësia:* ${thellesia} m%0A` : '') +
      (diametri ? `*Diametri:* ${diametri} mm%0A` : '') +
      (llojiTerrenit ? `*Terreni:* ${llojiTerrenit}%0A` : '') +
      (numriPilotave ? `*Numri i pilotave:* ${numriPilotave}%0A` : '') +
      (gjatesia ? `*Gjatësia:* ${gjatesia} m%0A` : '') +
      (lartesia ? `*Lartësia:* ${lartesia} m%0A` : '') +
      (trashesia ? `*Trashësia:* ${trashesia} cm%0A` : '') +
      (diametriGypit ? `*Diametri i gypit:* ${diametriGypit} mm%0A` : '') +
      (sasiaGypave ? `*Sasia e gypave:* ${sasiaGypave} copë%0A` : '') +
      (llojiGypit ? `*Lloji i gypit:* ${llojiGypit}%0A` : '') +
      (diametriGypitPuse ? `*Diametri:* ${diametriGypitPuse} mm%0A` : '') +
      (metratGypit ? `*Gjatësia totale:* ${metratGypit} m%0A` : '') +
      (diametriSajles ? `*Diametri i sajlës:* ${diametriSajles} mm%0A` : '') +
      (metratSajles ? `*Gjatësia:* ${metratSajles} m%0A` : '') +
      (perdorimiSajles ? `*Përdorimi:* ${perdorimiSajles}%0A` : '')

    window.open(`https://wa.me/38344184114?text=${message}`, '_blank')
  }

  const handleEmail = () => {
    const subject = `Kërkesë për ofertë – ${selectedSherbim}`
    const body = 
      `Kërkesë për ofertë – VPD DRILL\n\n` +
      `Shërbimi: ${selectedSherbim}\n` +
      `Emri: ${emri}\n` +
      `Email: ${email}\n` +
      `Telefoni: ${telefoni}\n` +
      `Lokacioni: ${lokacioni}\n` +
      (thellesia ? `Thellësia: ${thellesia} m\n` : '') +
      (diametri ? `Diametri: ${diametri} mm\n` : '') +
      (llojiTerrenit ? `Lloji i terrenit: ${llojiTerrenit}\n` : '') +
      (numriPilotave ? `Numri i pilotave: ${numriPilotave}\n` : '') +
      (gjatesia ? `Gjatësia: ${gjatesia} m\n` : '') +
      (lartesia ? `Lartësia: ${lartesia} m\n` : '') +
      (trashesia ? `Trashësia: ${trashesia} cm\n` : '') +
      (diametriGypit ? `Diametri i gypit: ${diametriGypit} mm\n` : '') +
      (sasiaGypave ? `Sasia e gypave: ${sasiaGypave} copë\n` : '') +
      (llojiGypit ? `Lloji i gypit: ${llojiGypit}\n` : '') +
      (diametriGypitPuse ? `Diametri: ${diametriGypitPuse} mm\n` : '') +
      (metratGypit ? `Gjatësia totale: ${metratGypit} m\n` : '') +
      (diametriSajles ? `Diametri i sajlës: ${diametriSajles} mm\n` : '') +
      (metratSajles ? `Gjatësia: ${metratSajles} m\n` : '') +
      (perdorimiSajles ? `Përdorimi: ${perdorimiSajles}\n` : '')

    window.location.href = `mailto:info@vllezeritpaqarizi.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!formRef.current) return

    setIsSending(true)

    // Shtojmë një fushë të fshehur për shërbimin e zgjedhur
    const serviceInput = document.createElement('input')
    serviceInput.type = 'hidden'
    serviceInput.name = 'service'
    serviceInput.value = selectedSherbim
    formRef.current.appendChild(serviceInput)

    emailjs.sendForm(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      formRef.current,
      EMAILJS_PUBLIC_KEY
    ).then(
      () => {
        alert('Kërkesa u dërgua me sukses!')
        formRef.current?.reset()
        // Rivendos state-in
        setEmri('')
        setEmail('')
        setTelefoni('')
        setLokacioni('')
        setThellesia('')
        setDiametri('')
        setLlojiTerrenit('Terren i fortë (shkëmbor)')
        setNumriPilotave('')
        setGjatesia('')
        setLartesia('')
        setTrashesia('')
        setDiametriGypit('')
        setSasiaGypave('')
        setLlojiGypit('')
        setDiametriGypitPuse('')
        setMetratGypit('')
        setDiametriSajles('')
        setMetratSajles('')
        setPerdorimiSajles('')
        // Fshijmë fushën e shtuar
        serviceInput.remove()
      },
      (error) => {
        console.error('EmailJS error:', error)
        alert('Dërgimi dështoi. Provo përsëri.')
        serviceInput.remove()
      }
    ).finally(() => setIsSending(false))
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[60] overflow-y-auto">
      <div className="flex items-end sm:items-center justify-center min-h-screen">
        <div className="fixed inset-0 bg-gray-900/75" onClick={onClose} />

        <div className="relative bg-white w-full sm:rounded-2xl sm:max-w-4xl sm:mx-4 rounded-t-2xl sm:my-8 max-h-[90vh] flex flex-col">
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-3 sm:px-6 sm:py-4 flex justify-between items-center z-10">
            <h3 className="text-lg sm:text-2xl font-bold text-gray-900">Kërko Ofertë</h3>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition">
              <FaTimes className="text-xl sm:text-2xl text-gray-500" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 sm:p-8">
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              {/* Të dhënat e klientit */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6">
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                    <FaUser className="inline mr-1 text-[#256D7B]" /> Emri
                  </label>
                  <input
                    type="text"
                    name="user_name"
                    required
                    value={emri}
                    onChange={(e) => setEmri(e.target.value)}
                    className="w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-[#256D7B] text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                    <FaEnvelope className="inline mr-1 text-[#256D7B]" /> Email
                  </label>
                  <input
                    type="email"
                    name="user_email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-[#256D7B] text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                    <FaPhone className="inline mr-1 text-[#256D7B]" /> Telefoni
                  </label>
                  <input
                    type="tel"
                    name="user_phone"
                    required
                    value={telefoni}
                    onChange={(e) => setTelefoni(e.target.value)}
                    className="w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-[#256D7B] text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                    <FaMapMarkerAlt className="inline mr-1 text-[#256D7B]" /> Lokacioni
                  </label>
                  <input
                    type="text"
                    name="location"
                    required
                    value={lokacioni}
                    onChange={(e) => setLokacioni(e.target.value)}
                    className="w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-[#256D7B] text-sm"
                  />
                </div>
              </div>

              {/* Zgjedhja e shërbimit */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                  Zgjedh shërbimin
                </label>
                <div className="flex flex-wrap gap-2">
                  {sherbimet.map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setSelectedSherbim(s.id as Sherbimi)}
                      className={`px-3 py-2 rounded-full text-xs font-medium transition ${
                        selectedSherbim === s.id
                          ? 'bg-[#256D7B] text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Specifikimet teknike */}
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="text-sm font-semibold text-gray-900 mb-3">Specifikimet teknike</h4>
                
                {/* Bunar */}
                {selectedSherbim === 'bunar' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Thellësia (m)</label>
                      <input type="number" name="thellesia" value={thellesia} onChange={(e) => setThellesia(e.target.value)} className="w-full px-3 py-2 border rounded text-sm" />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Diametri (mm)</label>
                      <input type="number" name="diametri" value={diametri} onChange={(e) => setDiametri(e.target.value)} className="w-full px-3 py-2 border rounded text-sm" />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs text-gray-600 mb-1">Lloji i terrenit</label>
                      <select name="llojiTerrenit" value={llojiTerrenit} onChange={(e) => setLlojiTerrenit(e.target.value)} className="w-full px-3 py-2 border rounded text-sm">
                        <option>Terren i fortë (shkëmbor)</option>
                        <option>Terren i butë (argjilë)</option>
                        <option>Terren i përzier</option>
                      </select>
                    </div>
                  </div>
                )}

                {/* Pilota */}
                {selectedSherbim === 'pilota' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Thellësia (m)</label>
                      <input type="number" name="thellesia" value={thellesia} onChange={(e) => setThellesia(e.target.value)} className="w-full px-3 py-2 border rounded text-sm" />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Diametri (mm)</label>
                      <input type="number" name="diametri" value={diametri} onChange={(e) => setDiametri(e.target.value)} className="w-full px-3 py-2 border rounded text-sm" />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Numri i pilotave</label>
                      <input type="number" name="numriPilotave" value={numriPilotave} onChange={(e) => setNumriPilotave(e.target.value)} className="w-full px-3 py-2 border rounded text-sm" />
                    </div>
                  </div>
                )}

                {/* Muri L */}
                {selectedSherbim === 'muri-l' && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Gjatësia (m)</label>
                      <input type="number" name="gjatesia" value={gjatesia} onChange={(e) => setGjatesia(e.target.value)} className="w-full px-3 py-2 border rounded text-sm" />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Lartësia (m)</label>
                      <input type="number" name="lartesia" value={lartesia} onChange={(e) => setLartesia(e.target.value)} className="w-full px-3 py-2 border rounded text-sm" />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Trashësia (cm)</label>
                      <input type="number" name="trashesia" value={trashesia} onChange={(e) => setTrashesia(e.target.value)} className="w-full px-3 py-2 border rounded text-sm" />
                    </div>
                  </div>
                )}

                {/* Gypa betoni */}
                {selectedSherbim === 'gypa-betoni' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Diametri i gypit (mm)</label>
                      <input type="number" name="diametriGypit" value={diametriGypit} onChange={(e) => setDiametriGypit(e.target.value)} className="w-full px-3 py-2 border rounded text-sm" />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Sasia (copë)</label>
                      <input type="number" name="sasiaGypave" value={sasiaGypave} onChange={(e) => setSasiaGypave(e.target.value)} className="w-full px-3 py-2 border rounded text-sm" />
                    </div>
                  </div>
                )}

                {/* Pllaka betoni */}
                {selectedSherbim === 'pllaka' && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Gjatësia (m)</label>
                      <input type="number" name="gjatesia" value={gjatesia} onChange={(e) => setGjatesia(e.target.value)} className="w-full px-3 py-2 border rounded text-sm" />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Gjerësia (m)</label>
                      <input type="number" name="gjeresia" value={gjatesia} onChange={(e) => setGjatesia(e.target.value)} className="w-full px-3 py-2 border rounded text-sm" />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Trashësia (cm)</label>
                      <input type="number" name="trashesia" value={trashesia} onChange={(e) => setTrashesia(e.target.value)} className="w-full px-3 py-2 border rounded text-sm" />
                    </div>
                  </div>
                )}

                {/* Gypa për puse */}
                {selectedSherbim === 'gypa-per-puse' && (
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs text-gray-600 mb-2">Lloji i gypit</label>
                      <div className="flex gap-4">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="llojiGypit"
                            value="plastik"
                            checked={llojiGypit === 'plastik'}
                            onChange={(e) => setLlojiGypit(e.target.value as 'plastik')}
                            className="mr-2"
                          />
                          <span className="text-sm">Plastik</span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="llojiGypit"
                            value="hekuri"
                            checked={llojiGypit === 'hekuri'}
                            onChange={(e) => setLlojiGypit(e.target.value as 'hekuri')}
                            className="mr-2"
                          />
                          <span className="text-sm">Hekuri</span>
                        </label>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">Diametri (mm)</label>
                        <input type="number" name="diametriGypitPuse" value={diametriGypitPuse} onChange={(e) => setDiametriGypitPuse(e.target.value)} className="w-full px-3 py-2 border rounded text-sm" />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">Gjatësia totale (m)</label>
                        <input type="number" name="metratGypit" value={metratGypit} onChange={(e) => setMetratGypit(e.target.value)} className="w-full px-3 py-2 border rounded text-sm" />
                      </div>
                    </div>
                  </div>
                )}

                {/* Sajla */}
                {selectedSherbim === 'sajla' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Diametri (mm)</label>
                      <input type="number" name="diametriSajles" value={diametriSajles} onChange={(e) => setDiametriSajles(e.target.value)} className="w-full px-3 py-2 border rounded text-sm" />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Gjatësia (m)</label>
                      <input type="number" name="metratSajles" value={metratSajles} onChange={(e) => setMetratSajles(e.target.value)} className="w-full px-3 py-2 border rounded text-sm" />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs text-gray-600 mb-1">Përdorimi (përshkrimi i shkurtër)</label>
                      <textarea
                        name="perdorimiSajles"
                        value={perdorimiSajles}
                        onChange={(e) => setPerdorimiSajles(e.target.value)}
                        rows={2}
                        placeholder="P.sh., për themele, për konstruksione, etj."
                        className="w-full px-3 py-2 border rounded text-sm"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Butonat e dërgimit */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={handleWhatsApp}
                  className="flex items-center justify-center gap-2 bg-green-600 text-white px-4 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
                >
                  <FaWhatsapp className="text-xl" />
                  <span>WhatsApp</span>
                </button>

                <button
                  type="button"
                  onClick={handleEmail}
                  className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                >
                  <FaEnvelopeSolid className="text-xl" />
                  <span>Email</span>
                </button>

                <button
                  type="submit"
                  disabled={isSending}
                  className="flex items-center justify-center gap-2 bg-[#256D7B] text-white px-4 py-3 rounded-lg font-semibold hover:bg-[#1a4f5a] transition disabled:opacity-50"
                >
                  <FaPaperPlane className="text-xl" />
                  <span>{isSending ? 'Duke dërguar...' : 'Dërgo'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}