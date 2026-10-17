'use client'

import { FormEvent, useMemo, useState } from 'react'
import emailjs from '@emailjs/browser'
import { FaWhatsapp, FaEnvelope, FaPaperPlane, FaSpinner, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa'
import { trackEvent } from '@/lib/gtag'

const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_OFERTE!
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
const EMAIL_KOMPANIE = 'info@vllezeritpaqarizi.com'
const WHATSAPP = '38344184114'

export type Sherbimi = 'bunar' | 'pilota' | 'ankera' | 'muri-l' | 'gypa-betoni' | 'pllaka' | 'gypa-per-puse' | 'sajla'

const sherbimet: { id: Sherbimi; label: string }[] = [
  { id: 'bunar', label: 'Bunar (Shpim pusi)' },
  { id: 'pilota', label: 'Pilota' },
  { id: 'ankera', label: 'Ankera' },
  { id: 'muri-l', label: 'Muri L' },
  { id: 'gypa-betoni', label: 'Gypa betoni' },
  { id: 'pllaka', label: 'Pllaka betoni' },
  { id: 'gypa-per-puse', label: 'Gypa për puse' },
  { id: 'sajla', label: 'Sajla' },
]

type Fushe = { key: string; label: string; unit?: string; type?: 'number' | 'select' | 'radio' | 'textarea'; options?: string[]; placeholder?: string; full?: boolean }

const TERRENET = ['Terren i fortë (shkëmbor)', 'Terren i butë (argjilë)', 'Terren i përzier']

// Specifikimet sipas shërbimit — çdo fushë ka çelësin e vet (më parë "Gjerësia" e pllakave mbishkruante "Gjatësinë").
const specifikimet: Record<Sherbimi, Fushe[]> = {
  bunar: [
    { key: 'thellesia', label: 'Thellësia', unit: 'm' },
    { key: 'diametri', label: 'Diametri', unit: 'mm' },
    { key: 'llojiTerrenit', label: 'Lloji i terrenit', type: 'select', options: TERRENET, full: true },
  ],
  pilota: [
    { key: 'thellesia', label: 'Thellësia', unit: 'm' },
    { key: 'diametri', label: 'Diametri', unit: 'mm' },
    { key: 'numriPilotave', label: 'Numri i pilotave' },
  ],
  ankera: [],
  'muri-l': [
    { key: 'gjatesia', label: 'Gjatësia', unit: 'm' },
    { key: 'lartesia', label: 'Lartësia', unit: 'm' },
    { key: 'trashesia', label: 'Trashësia', unit: 'cm' },
  ],
  'gypa-betoni': [
    { key: 'diametriGypit', label: 'Diametri i gypit', unit: 'mm' },
    { key: 'sasiaGypave', label: 'Sasia', unit: 'copë' },
  ],
  pllaka: [
    { key: 'gjatesia', label: 'Gjatësia', unit: 'm' },
    { key: 'gjeresia', label: 'Gjerësia', unit: 'm' },
    { key: 'trashesia', label: 'Trashësia', unit: 'cm' },
  ],
  'gypa-per-puse': [
    { key: 'llojiGypit', label: 'Lloji i gypit', type: 'radio', options: ['Plastik', 'Hekuri'], full: true },
    { key: 'diametriGypitPuse', label: 'Diametri', unit: 'mm' },
    { key: 'metratGypit', label: 'Gjatësia totale', unit: 'm' },
  ],
  sajla: [
    { key: 'diametriSajles', label: 'Diametri', unit: 'mm' },
    { key: 'metratSajles', label: 'Gjatësia', unit: 'm' },
    { key: 'perdorimiSajles', label: 'Përdorimi (përshkrimi i shkurtër)', type: 'textarea', placeholder: 'P.sh., për themele, për konstruksione, etj.', full: true },
  ],
}

const bosh = { emri: '', email: '', telefoni: '', lokacioni: '' }

/** Të dhëna që mund të plotësohen paraprakisht (p.sh. nga vlerësuesi i çmimit). */
export type OfertaPrefill = {
  burim: string
  sherbimi?: Sherbimi
  lokacioni?: string
  spec?: Record<string, string>
}

export const TERRENET_OFERTE = TERRENET

export default function OfertaForm({
  burimi,
  compact,
  prefill,
}: {
  burimi: 'oferte_formular' | 'oferte_modal'
  compact?: boolean
  prefill?: OfertaPrefill
}) {
  const [klienti, setKlienti] = useState({ ...bosh, lokacioni: prefill?.lokacioni ?? '' })
  const [sherbimi, setSherbimi] = useState<Sherbimi>(prefill?.sherbimi ?? 'bunar')
  const [spec, setSpec] = useState<Record<string, string>>({ llojiTerrenit: TERRENET[0], ...(prefill?.spec ?? {}) })
  const [website, setWebsite] = useState('') // honeypot
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  const label = sherbimet.find((s) => s.id === sherbimi)!.label
  const fushat = specifikimet[sherbimi]

  // Teksti i specifikimeve vetëm për fushat e shërbimit të zgjedhur
  const specRreshtat = useMemo(
    () =>
      fushat
        .map((f) => (spec[f.key] ? `${f.label}: ${spec[f.key]}${f.unit ? ` ${f.unit}` : ''}` : null))
        .filter(Boolean) as string[],
    [fushat, spec]
  )

  const mesazhi = () =>
    [
      'Kërkesë për ofertë – VPD DRILL',
      '',
      `Shërbimi: ${label}`,
      `Emri: ${klienti.emri}`,
      `Email: ${klienti.email}`,
      `Telefoni: ${klienti.telefoni}`,
      `Lokacioni: ${klienti.lokacioni}`,
      ...specRreshtat,
    ].join('\n')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (website) return // bot
    setStatus('sending')
    const specVetem = Object.fromEntries(fushat.map((f) => [f.key, spec[f.key] ?? '']))
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          user_name: klienti.emri,
          user_email: klienti.email,
          user_phone: klienti.telefoni,
          // I njëjti lokacion me të dy emrat — formularët e vjetër përdornin njërin ose tjetrin
          lokacioni: klienti.lokacioni,
          location: klienti.lokacioni,
          service: label,
          specifikat: specRreshtat.join(', ') || '—',
          to_email: EMAIL_KOMPANIE,
          ...specVetem,
        },
        EMAILJS_PUBLIC_KEY
      )
      trackEvent('generate_lead', { form_name: burimi, service: sherbimi, ...(prefill ? { burim: prefill.burim } : {}) })
      setStatus('success')
      setKlienti(bosh)
      setSpec({ llojiTerrenit: TERRENET[0] })
    } catch (error) {
      console.error('EmailJS error:', error)
      setStatus('error')
    }
  }

  const ndrysho = (k: keyof typeof bosh) => (e: React.ChangeEvent<HTMLInputElement>) => setKlienti((p) => ({ ...p, [k]: e.target.value }))

  if (status === 'success') {
    return (
      <div className="flex flex-col items-start gap-4 rounded-lg bg-brand/[0.07] p-6 ring-1 ring-brand/20 sm:p-8" role="status">
        <FaCheckCircle className="text-3xl text-brand" />
        <p className="text-lg font-bold text-bedrock">Kërkesa u dërgua me sukses! Do t&apos;ju kontaktojmë së shpejti.</p>
        <button type="button" onClick={() => setStatus('idle')} className="btn-ghost">
          Dërgo një kërkesë tjetër
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-7">
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        className="absolute -left-[9999px] h-px w-px opacity-0"
      />

      <fieldset>
        <legend className="mb-3 text-sm font-bold text-bedrock">Zgjedh shërbimin / produktin</legend>
        <div className={`grid gap-2 ${compact ? 'grid-cols-2 sm:grid-cols-4' : 'grid-cols-2 sm:grid-cols-4'}`}>
          {sherbimet.map((s) => {
            const on = sherbimi === s.id
            return (
              <button
                key={s.id}
                type="button"
                aria-pressed={on}
                onClick={() => setSherbimi(s.id)}
                className={`rounded-md border px-3 py-2.5 text-left text-sm font-semibold transition-colors ${
                  on ? 'border-bedrock bg-bedrock text-white' : 'border-stone-line bg-white text-bedrock hover:border-brand'
                }`}
              >
                {s.label}
              </button>
            )
          })}
        </div>
      </fieldset>

      <div className="grid gap-4 sm:grid-cols-2">
        <label>
          <span className="field-label">Emri dhe Mbiemri</span>
          <input className="field" name="user_name" autoComplete="name" required value={klienti.emri} onChange={ndrysho('emri')} />
        </label>
        <label>
          <span className="field-label">Email</span>
          <input className="field" type="email" name="user_email" autoComplete="email" required value={klienti.email} onChange={ndrysho('email')} />
        </label>
        <label>
          <span className="field-label">Telefoni</span>
          <input className="field" type="tel" name="user_phone" autoComplete="tel" required value={klienti.telefoni} onChange={ndrysho('telefoni')} />
        </label>
        <label>
          <span className="field-label">Lokacioni i projektit</span>
          <input className="field" name="lokacioni" required value={klienti.lokacioni} onChange={ndrysho('lokacioni')} />
        </label>
      </div>

      <fieldset className="rounded-lg bg-stone p-4 sm:p-5">
        <legend className="sr-only">Specifikimet teknike</legend>
        <p className="mb-3 text-sm font-bold text-bedrock">
          Specifikimet teknike <span className="font-normal text-slate-mute">(opsionale)</span>
        </p>
        {fushat.length === 0 ? (
          <p className="text-sm text-slate-ink">
            Na shkruani sasinë/madhësinë e nevojshme te lokacioni ose do t&apos;ju kontaktojmë për detaje.
          </p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-3">
            {fushat.map((f) => (
              <div key={sherbimi + f.key} className={f.full ? 'sm:col-span-3' : ''}>
                {f.type === 'radio' ? (
                  <div>
                    <span className="field-label">{f.label}</span>
                    <div className="flex gap-2">
                      {f.options!.map((o) => (
                        <label
                          key={o}
                          className={`flex cursor-pointer items-center gap-2 rounded-md border px-3.5 py-2 text-sm font-semibold ${
                            spec[f.key] === o ? 'border-brand bg-white text-brand' : 'border-stone-line bg-white text-bedrock'
                          }`}
                        >
                          <input
                            type="radio"
                            name={f.key}
                            value={o}
                            checked={spec[f.key] === o}
                            onChange={() => setSpec((p) => ({ ...p, [f.key]: o }))}
                            className="accent-brand"
                          />
                          {o}
                        </label>
                      ))}
                    </div>
                  </div>
                ) : (
                  <label className="block">
                    <span className="field-label">
                      {f.label}
                      {f.unit && <span className="ml-1 font-normal text-slate-mute">({f.unit})</span>}
                    </span>
                    {f.type === 'select' ? (
                      <select className="field" value={spec[f.key] ?? ''} onChange={(e) => setSpec((p) => ({ ...p, [f.key]: e.target.value }))}>
                        {f.options!.map((o) => (
                          <option key={o}>{o}</option>
                        ))}
                      </select>
                    ) : f.type === 'textarea' ? (
                      <textarea
                        rows={2}
                        className="field"
                        placeholder={f.placeholder}
                        value={spec[f.key] ?? ''}
                        onChange={(e) => setSpec((p) => ({ ...p, [f.key]: e.target.value }))}
                      />
                    ) : (
                      <input
                        type="number"
                        inputMode="decimal"
                        className="field tabular"
                        value={spec[f.key] ?? ''}
                        onChange={(e) => setSpec((p) => ({ ...p, [f.key]: e.target.value }))}
                      />
                    )}
                  </label>
                )}
              </div>
            ))}
          </div>
        )}
      </fieldset>

      {status === 'error' && (
        <p role="alert" className="flex items-start gap-2 rounded-md bg-red-50 px-4 py-3 text-sm text-red-800 ring-1 ring-red-200">
          <FaExclamationTriangle className="mt-0.5 shrink-0" />
          Dërgimi dështoi. Ju lutem provoni përsëri ose na kontaktoni në telefon.
        </p>
      )}

      <div className="flex flex-col gap-3 sm:flex-row">
        <button type="submit" disabled={status === 'sending'} className="btn-signal flex-1 py-3.5 text-base disabled:opacity-60">
          {status === 'sending' ? <FaSpinner className="animate-spin" /> : <FaPaperPlane />}
          {status === 'sending' ? 'Duke dërguar...' : 'Dërgo Kërkesën'}
        </button>
        <button
          type="button"
          onClick={() => {
            trackEvent('whatsapp_click', { location: burimi })
            window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(mesazhi())}`, '_blank', 'noopener,noreferrer')
          }}
          className="btn border border-[#1f9d55] bg-white py-3.5 text-[#167a42] hover:bg-[#1f9d55] hover:text-white"
        >
          <FaWhatsapp className="text-lg" /> WhatsApp
        </button>
        <button
          type="button"
          onClick={() => {
            window.location.href = `mailto:${EMAIL_KOMPANIE}?subject=${encodeURIComponent(`Kërkesë për ofertë – ${label}`)}&body=${encodeURIComponent(mesazhi())}`
          }}
          className="btn-ghost py-3.5"
        >
          <FaEnvelope /> Email
        </button>
      </div>
    </form>
  )
}
