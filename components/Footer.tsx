'use client'

import Link from 'next/link'
import Image from 'next/image'
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaHeart } from 'react-icons/fa'
import { trackEvent } from '@/lib/gtag'
import { rrjetet } from './Kontakt'

const linket = [
  { href: '/', label: 'Ballina' },
  { href: '/sherbimet', label: 'Shërbimet' },
  { href: '/produktet', label: 'Produktet' },
  { href: '/projektet', label: 'Projektet' },
  { href: '/kontakti', label: 'Kontakti' },
  { href: '/pyetje-te-shpeshta', label: 'Pyetje të Shpeshta' },
]

const telefonat = [
  { tel: '+38344184114', shfaq: '044 184 114', id: '044184114' },
  { tel: '+38344204877', shfaq: '044 204 877', id: '044204877' },
  { tel: '+38345700201', shfaq: '045 700 201', id: '045700201' },
]

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-bedrock text-white/70">
      <div className="strata-rule-light opacity-40" aria-hidden="true" />
      <div className="shell py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-md bg-white p-1">
                <Image src="/images/logo.png" alt="" width={44} height={44} className="h-auto w-full object-contain" />
              </span>
              <p className="text-2xl font-extrabold font-xwide text-white">
                VPD <span className="text-glacier">DRILL</span>
              </p>
            </div>
            <p className="mt-5 max-w-xs text-[15px] leading-relaxed">
              Ekspertizë e thellë, themele të sigurta. Specialiste në shpime dhe produkte betoni.
            </p>
            <div className="mt-6 flex gap-2">
              {rrjetet.map((r) => (
                <a
                  key={r.label}
                  href={r.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={r.label}
                  className="grid h-10 w-10 place-items-center rounded-md bg-white/[0.06] text-white/80 transition-colors hover:bg-brand hover:text-white"
                >
                  <r.icon />
                </a>
              ))}
            </div>
          </div>

          <nav aria-label="Linke të shpejta">
            <h4 className="mb-4 text-sm font-bold text-white">Linke të shpejta</h4>
            <ul className="space-y-2.5 text-[15px]">
              {linket.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="transition-colors hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h4 className="mb-4 text-sm font-bold text-white">Kontakti</h4>
            <ul className="space-y-2.5 text-[15px]">
              {telefonat.map((t) => (
                <li key={t.tel}>
                  <a
                    href={`tel:${t.tel}`}
                    onClick={() => trackEvent('phone_click', { phone: t.id, location: 'footer' })}
                    className="flex items-center gap-3 tabular transition-colors hover:text-white"
                  >
                    <FaPhoneAlt className="text-xs text-glacier" />
                    {t.shfaq}
                  </a>
                </li>
              ))}
              <li>
                <a href="mailto:info@vllezeritpaqarizi.com" className="flex items-center gap-3 break-all transition-colors hover:text-white">
                  <FaEnvelope className="shrink-0 text-xs text-glacier" />
                  info@vllezeritpaqarizi.com
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-bold text-white">Adresa</h4>
            <p className="flex items-start gap-3 text-[15px]">
              <FaMapMarkerAlt className="mt-1 shrink-0 text-xs text-glacier" />
              Fsh Dragobil, 24000 Malisheve, Kosovë
            </p>
          </div>
        </div>

        {/* Dedikim i veçantë */}
        <div className="mt-14 border-t border-white/10 pt-10 text-center">
          <p className="inline-flex items-center gap-2 text-xs font-semibold text-glacier">
            <FaHeart className="text-[10px]" /> DEDIKIM I VEÇANTË <FaHeart className="text-[10px]" />
          </p>
          <p className="mt-3 text-lg italic text-white/85">&ldquo;Për ty, frymëzim i çdo dite.&rdquo;</p>
          <p className="mt-2 text-sm text-white/50">Me shumë dashuri dhe mirënjohje,</p>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-sm text-white/50 sm:flex-row">
          <p>&copy; {currentYear} VPD DRILL. Të gjitha të drejtat e rezervuara.</p>
          <div className="flex items-center gap-5">
            <Link href="/politika-e-privatesise" className="transition-colors hover:text-white">
              Politika e Privatësisë
            </Link>
            <span>Project by Selami Morina</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
