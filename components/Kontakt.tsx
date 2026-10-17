'use client'

import { FormEvent, useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaClock, FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube, FaCheckCircle, FaExclamationTriangle, FaSpinner } from 'react-icons/fa'
import { trackEvent } from '@/lib/gtag'

const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_CONTACT!
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!

const telefonat = [
  { tel: '+38344184114', shfaq: '044 184 114', id: '044184114' },
  { tel: '+38344204877', shfaq: '044 204 877', id: '044204877' },
  { tel: '+38345700201', shfaq: '045 700 201', id: '045700201' },
]

export const rrjetet = [
  { href: 'https://www.facebook.com/VllezeritPaqarizi', label: 'Facebook', icon: FaFacebookF },
  { href: 'https://instagram.com/vpddrill', label: 'Instagram', icon: FaInstagram },
  { href: 'https://linkedin.com/company/vpddrill', label: 'LinkedIn', icon: FaLinkedinIn },
  { href: 'https://youtube.com/@vpddrill', label: 'YouTube', icon: FaYoutube },
]

/**
 * Seksioni i kontaktit. Në faqen /kontakti titulli shfaqet nga banneri i faqes
 * (`faqe`), ndërsa në ballinë shfaqet këtu si titull seksioni.
 */
export default function Kontakt({ faqe = false }: { faqe?: boolean }) {
  const formRef = useRef<HTMLFormElement>(null)
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  const sendEmail = (e: FormEvent) => {
    e.preventDefault()
    if (!formRef.current) return
    const honeypot = (formRef.current.elements.namedItem('website') as HTMLInputElement)?.value
    if (honeypot) {
      formRef.current.reset()
      return
    }
    setStatus('sending')
    emailjs
      .sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, formRef.current, EMAILJS_PUBLIC_KEY)
      .then(() => {
        trackEvent('generate_lead', { form_name: 'kontakt' })
        setStatus('success')
        formRef.current?.reset()
      })
      .catch((error) => {
        console.error('EmailJS error:', error)
        setStatus('error')
      })
  }

  return (
    <section id="kontakti" data-shtresa="Kontakti" className="bg-white py-20 sm:py-28">
      <div className="shell">
        {!faqe && (
          <div className="mb-14 max-w-3xl">
            <h2 className="display-lg">Kontakti</h2>
            <p className="lede mt-4">Jemi në dispozicion për çdo pyetje apo kërkesë</p>
          </div>
        )}

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.3fr)] lg:gap-20">
          {/* Informacioni i Kontaktit */}
          <div>
            <h2 className="sr-only">Informacioni i Kontaktit</h2>
            <dl className="divide-y divide-stone-line border-y border-stone-line">
              <div className="flex gap-4 py-5">
                <dt className="w-24 shrink-0 text-sm font-semibold text-slate-mute">
                  <FaPhoneAlt className="mb-1 text-brand" />
                  Telefon
                </dt>
                <dd className="space-y-1">
                  {telefonat.map((t) => (
                    <a
                      key={t.tel}
                      href={`tel:${t.tel}`}
                      onClick={() => trackEvent('phone_click', { phone: t.id, location: faqe ? 'kontakti_page' : 'ballina' })}
                      className="block text-lg font-bold font-wide tabular text-bedrock hover:text-brand"
                    >
                      {t.shfaq}
                    </a>
                  ))}
                </dd>
              </div>
              <div className="flex gap-4 py-5">
                <dt className="w-24 shrink-0 text-sm font-semibold text-slate-mute">
                  <FaEnvelope className="mb-1 text-brand" />
                  Email
                </dt>
                <dd>
                  <a href="mailto:info@vllezeritpaqarizi.com" className="break-all font-semibold text-bedrock hover:text-brand">
                    info@vllezeritpaqarizi.com
                  </a>
                </dd>
              </div>
              <div className="flex gap-4 py-5">
                <dt className="w-24 shrink-0 text-sm font-semibold text-slate-mute">
                  <FaMapMarkerAlt className="mb-1 text-brand" />
                  Adresa
                </dt>
                <dd className="font-semibold text-bedrock">Fsh Dragobil, 24000 Malisheve, Kosovë</dd>
              </div>
              <div className="flex gap-4 py-5">
                <dt className="w-24 shrink-0 text-sm font-semibold text-slate-mute">
                  <FaClock className="mb-1 text-brand" />
                  Orari i Punës
                </dt>
                <dd className="text-bedrock">
                  <p className="font-semibold">Hënë - Shtunë: 07:00 - 19:00</p>
                  <p className="text-slate-mute">Die: Pushim</p>
                </dd>
              </div>
            </dl>

            <div className="mt-8">
              <h3 className="mb-4 text-base font-bold">Na ndiqni në rrjete sociale</h3>
              <div className="flex gap-2">
                {rrjetet.map((r) => (
                  <a
                    key={r.label}
                    href={r.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={r.label}
                    className="grid h-11 w-11 place-items-center rounded-md border border-stone-line text-bedrock transition-colors hover:border-brand hover:bg-brand hover:text-white"
                  >
                    <r.icon />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Dërgo Mesazh */}
          <div className="rounded-xl bg-stone p-6 sm:p-8">
            <h2 className="display-md">Dërgo Mesazh</h2>
            {status === 'success' ? (
              <div className="mt-6 flex flex-col items-start gap-4" role="status">
                <FaCheckCircle className="text-3xl text-brand" />
                <p className="text-lg font-bold text-bedrock">Mesazhi u dërgua me sukses!</p>
                <button type="button" onClick={() => setStatus('idle')} className="btn-ghost">
                  Dërgo një mesazh tjetër
                </button>
              </div>
            ) : (
              <form ref={formRef} onSubmit={sendEmail} className="mt-6 grid gap-4 sm:grid-cols-2">
                <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px] h-px w-px opacity-0" />
                <input type="hidden" name="to_email" value="info@vllezeritpaqarizi.com" />
                <label>
                  <span className="field-label">Emri dhe Mbiemri</span>
                  <input type="text" name="user_name" autoComplete="name" required className="field" placeholder="Shkruani emrin tuaj" />
                </label>
                <label>
                  <span className="field-label">Email</span>
                  <input type="email" name="user_email" autoComplete="email" required className="field" placeholder="shkruaj@email.com" />
                </label>
                <label>
                  <span className="field-label">
                    Telefoni <span className="font-normal text-slate-mute">(opsional)</span>
                  </span>
                  <input type="tel" name="user_phone" autoComplete="tel" className="field" placeholder="044 XXX XXX" />
                </label>
                <label>
                  <span className="field-label">
                    Subjekti <span className="font-normal text-slate-mute">(opsional)</span>
                  </span>
                  <input type="text" name="subject" className="field" placeholder="Subjekti i mesazhit" />
                </label>
                <label className="sm:col-span-2">
                  <span className="field-label">Mesazhi</span>
                  <textarea name="message" rows={5} required className="field" placeholder="Shkruani mesazhin tuaj..." />
                </label>
                {status === 'error' && (
                  <p role="alert" className="flex items-start gap-2 rounded-md bg-red-50 px-4 py-3 text-sm text-red-800 ring-1 ring-red-200 sm:col-span-2">
                    <FaExclamationTriangle className="mt-0.5 shrink-0" />
                    Dërgimi dështoi. Provo përsëri.
                  </p>
                )}
                <button type="submit" disabled={status === 'sending'} className="btn-brand py-3.5 text-base disabled:opacity-60 sm:col-span-2">
                  {status === 'sending' && <FaSpinner className="animate-spin" />}
                  {status === 'sending' ? 'Duke dërguar...' : 'Dërgo Mesazhin'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
