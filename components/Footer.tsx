'use client'

import Link from 'next/link'
import Image from 'next/image'
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaGoogle } from 'react-icons/fa'
import { trackEvent } from '@/lib/gtag'
import { usePathname } from 'next/navigation'
import { gjuhaNgaPath, GJUHET, TEKSTET } from '@/lib/gjuha'
import { rrjetet } from './Kontakt'
import { GOOGLE_PROFILE_URL, QYTETET_E_PUNES } from '@/lib/site'

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
  const gjuha = gjuhaNgaPath(usePathname())
  const tx = gjuha === 'sq' ? null : TEKSTET[gjuha]
  const f = tx?.footer
  const navFooter: readonly { href: string; label: string }[] = tx ? tx.nav : linket
  const tel = (t: (typeof telefonat)[number]) => (tx ? `+383 ${t.shfaq.slice(1)}` : t.shfaq)

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
              {f ? f.moto : 'Ekspertizë e thellë, themele të sigurta. Specialiste në shpime dhe produkte betoni.'}
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

          <nav aria-label={f ? f.linket : 'Linke të shpejta'}>
            <h2 className="mb-4 text-sm font-bold text-white">{f ? f.linket : 'Linke të shpejta'}</h2>
            <ul className="space-y-2.5 text-[15px]">
              {navFooter.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="transition-colors hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="mb-4 text-sm font-bold text-white">{f ? f.kontakti : 'Kontakti'}</h2>
            <ul className="space-y-2.5 text-[15px]">
              {telefonat.map((t) => (
                <li key={t.tel}>
                  <a
                    href={`tel:${t.tel}`}
                    onClick={() => trackEvent('phone_click', { phone: t.id, location: 'footer' })}
                    className="flex items-center gap-3 tabular transition-colors hover:text-white"
                  >
                    <FaPhoneAlt className="text-xs text-glacier" />
                    {tel(t)}
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
            <h2 className="mb-4 text-sm font-bold text-white">{f ? f.adresa : 'Adresa'}</h2>
            <p className="flex items-start gap-3 text-[15px]">
              <FaMapMarkerAlt className="mt-1 shrink-0 text-xs text-glacier" />
              {f ? f.adresaTekst : 'Fsh Dragobil, 24000 Malisheve, Kosovë'}
            </p>
            <a
              href={GOOGLE_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-2 text-sm text-glacier transition-colors hover:text-white"
            >
              <FaGoogle className="text-xs" /> {f ? f.maps : 'Na gjeni në Google Maps'}
            </a>
          </div>
        </div>

        {/* Zonat që mbulojmë — tekst i dukshëm për kërkimet lokale */}
        <div className="mt-12 border-t border-white/10 pt-8">
          <h2 className="mb-3 text-sm font-bold text-white">{f ? f.zonat : 'Zonat ku kemi punuar'}</h2>
          <p className="text-sm leading-relaxed text-white/55">
            {f
              ? f.zonatTekst(QYTETET_E_PUNES.join(', '))
              : `Shpime pusesh uji, pilota, ankera dhe gërmime me diafragmë në ${QYTETET_E_PUNES.join(', ')} dhe anembanë Kosovës.`}
          </p>
        </div>


        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-sm text-white/50 sm:flex-row">
          <p>&copy; {currentYear} VPD DRILL. {f ? f.te_drejtat : 'Të gjitha të drejtat e rezervuara.'}</p>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            {GJUHET.filter((g) => g.kodi !== gjuha).map((g) => (
              <Link key={g.kodi} href={g.href} hrefLang={g.kodi} className="transition-colors hover:text-white">
                {g.emri}
              </Link>
            ))}
            <Link href="/politika-e-privatesise" className="transition-colors hover:text-white">
              {f ? f.privatesia : 'Politika e Privatësisë'}
            </Link>
            <span>Project by Selami Morina</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
