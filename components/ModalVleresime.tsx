'use client'

import { FormEvent, useState } from 'react'
import emailjs from '@emailjs/browser'
import { trackEvent } from '@/lib/gtag'
import { FaStar, FaSpinner, FaCheckCircle } from 'react-icons/fa'
import Modal from './ui/Modal'

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
  const [website, setWebsite] = useState('') // honeypot anti-spam
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  const resetAndClose = () => {
    setEmri('')
    setKomenti('')
    setVleresimi(5)
    setWebsite('')
    setStatus('idle')
    onClose()
  }

  const dergoVleresimin = (e: FormEvent) => {
    e.preventDefault()
    if (website.trim()) {
      resetAndClose()
      return
    }
    setStatus('sending')
    // Vlerësimi dërgohet te ekipi për shqyrtim para se të publikohet.
    emailjs
      .send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          to_email: 'info@vllezeritpaqarizi.com',
          user_name: emri,
          user_email: '',
          user_phone: '',
          subject: `Vlerësim i ri nga uebfaqja (${vleresimi}/5 yje)`,
          message: komenti,
        },
        EMAILJS_PUBLIC_KEY
      )
      .then(() => {
        trackEvent('submit_review', { rating: vleresimi })
        setStatus('success')
        setTimeout(resetAndClose, 2500)
      })
      .catch((error) => {
        console.error('EmailJS error:', error)
        setStatus('error')
      })
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Lini një vlerësim" icon={<FaStar />} size="sm">
      {status === 'success' ? (
        <div className="space-y-3 py-6 text-center" role="status">
          <FaCheckCircle className="mx-auto text-5xl text-brand" />
          <p className="font-bold text-bedrock">Faleminderit për vlerësimin tuaj!</p>
          <p className="text-sm text-slate-mute">E kemi marrë dhe do ta shqyrtojmë përpara se ta publikojmë.</p>
        </div>
      ) : (
        <form onSubmit={dergoVleresimin} className="space-y-5">
          <input
            type="text"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="absolute -left-[9999px] h-px w-px opacity-0"
          />
          <fieldset>
            <legend className="field-label">Vlerësimi</legend>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setVleresimi(v)}
                  aria-label={`${v} yje`}
                  aria-pressed={v === vleresimi}
                  className="rounded p-1 transition-transform hover:scale-110"
                >
                  <FaStar className={v <= vleresimi ? 'text-signal' : 'text-stone-line'} size={28} />
                </button>
              ))}
            </div>
          </fieldset>
          <label className="block">
            <span className="field-label">Emri juaj</span>
            <input type="text" value={emri} onChange={(e) => setEmri(e.target.value)} className="field" required />
          </label>
          <label className="block">
            <span className="field-label">Komenti</span>
            <textarea value={komenti} onChange={(e) => setKomenti(e.target.value)} rows={4} className="field" required />
          </label>
          {status === 'error' && <p className="text-sm text-red-700">Dërgimi dështoi. Ju lutem provoni përsëri.</p>}
          <button type="submit" disabled={status === 'sending'} className="btn-brand w-full py-3.5 disabled:opacity-60">
            {status === 'sending' && <FaSpinner className="animate-spin" />}
            {status === 'sending' ? 'Duke dërguar...' : 'Dërgo vlerësimin'}
          </button>
        </form>
      )}
    </Modal>
  )
}
