import Image from 'next/image'
import Link from 'next/link'
import { FaWater, FaBuilding, FaAnchor, FaHammer, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaClock, FaWhatsapp, FaGoogle, FaFacebookF } from 'react-icons/fa'
import { SEKSIONET } from '@/lib/gjuha'
import { BIZNESI_ID, FACEBOOK_URL, GOOGLE_PROFILE_URL, QYTETET_E_PUNES, SITE_URL } from '@/lib/site'

/** Faqe hyrëse për vizitorët që nuk flasin shqip (diaspora, investitorë të huaj). */

export type Gjuha = 'de' | 'en'  // faqet e huaja; shqipja është ballina

const T = {
  de: {
    eyebrow: 'Geotechnik & Tiefbau im Kosovo',
    h1: 'Brunnenbohrungen, Pfähle, Anker und Schlitzwände im ganzen Kosovo',
    lead: 'VPD DRILL ist ein Bohr- und Spezialtiefbauunternehmen mit Sitz in Dragobil, Malishevë. Mit eigenem Maschinenpark realisieren wir Wasserbrunnen, Pfahlgründungen, Verankerungen und Schlitzwände – auch wenn Sie aus dem Ausland in Kosovo bauen.',
    cta: 'Angebot per WhatsApp',
    call: 'Anrufen',
    sq: 'Shqip',
    servicesTitle: 'Unsere Leistungen',
    services: [
      { icon: FaWater, t: 'Wasserbrunnen', d: 'Brunnenbohrungen bis 500 m in Fels und bis 55 m in Lockergestein – inkl. geologischer Vorerkundung.', href: '/sherbimet/shpime-puse' },
      { icon: FaBuilding, t: 'Pfahlgründungen', d: 'Bohrpfähle und CFA-Pfähle für Wohn-, Gewerbe- und Industriebauten.', href: '/sherbimet/pilota' },
      { icon: FaAnchor, t: 'Anker & Hangsicherung', d: 'Vorgespannte Anker zur Sicherung von Baugruben, Böschungen und Stützmauern.', href: '/sherbimet/ankera' },
      { icon: FaHammer, t: 'Schlitzwände', d: 'Schlitzwände bis über 50 m Tiefe mit Bauer MC 32 – für Tiefgaragen und tiefe Baugruben.', href: '/sherbimet/germim-diafragme' },
    ],
    moreSq: 'Details (auf Albanisch)',
    statsTitle: 'VPD DRILL in Zahlen',
    stats: [
      ['500 m', 'Bohrtiefe in Fels'],
      ['50 m+', 'Schlitzwandtiefe'],
      ['100+', 'realisierte Projekte'],
      ['22', 'Städte im Kosovo'],
      ['10+', 'eigene Bohrgeräte'],
    ],
    productsTitle: 'Betonfertigteile aus eigener Produktion',
    products: 'L-Steine (Winkelstützmauern), Betonrohre, Brunnenrohre, Betonplatten und Bewehrungskörbe.',
    projectsTitle: 'Aus unseren Baustellen',
    projectsLink: 'Alle Fotos und Videos ansehen',
    areaTitle: 'Einsatzgebiet',
    area: 'Wir arbeiten im ganzen Kosovo, unter anderem in',
    contactTitle: 'Kontakt',
    hours: 'Mo–Sa: 07:00–19:00, So: geschlossen',
    address: 'Dragobil, 24000 Malishevë, Kosovo',
    google: 'Google Maps & Bewertungen',
    facebook: 'Facebook',
  },
  en: {
    eyebrow: 'Geotechnical drilling & foundations in Kosovo',
    h1: 'Water wells, piles, anchors and diaphragm walls across Kosovo',
    lead: 'VPD DRILL is a drilling and specialist foundation contractor based in Dragobil, Malishevë. With our own fleet of rigs we deliver water wells, pile foundations, ground anchors and diaphragm walls — including for clients building in Kosovo from abroad.',
    cta: 'Get a quote on WhatsApp',
    call: 'Call us',
    sq: 'Shqip',
    servicesTitle: 'Our services',
    services: [
      { icon: FaWater, t: 'Water well drilling', d: 'Wells up to 500 m deep in rock and up to 55 m in soft ground, with a site assessment before drilling.', href: '/sherbimet/shpime-puse' },
      { icon: FaBuilding, t: 'Pile foundations', d: 'Bored and CFA piles for residential, commercial and industrial buildings.', href: '/sherbimet/pilota' },
      { icon: FaAnchor, t: 'Ground anchors', d: 'Tensioned anchors to secure excavations, slopes and retaining walls.', href: '/sherbimet/ankera' },
      { icon: FaHammer, t: 'Diaphragm walls', d: 'Diaphragm walls over 50 m deep with a Bauer MC 32 — for underground car parks and deep excavations.', href: '/sherbimet/germim-diafragme' },
    ],
    moreSq: 'Details (in Albanian)',
    statsTitle: 'VPD DRILL in numbers',
    stats: [
      ['500 m', 'drilling depth in rock'],
      ['50 m+', 'diaphragm wall depth'],
      ['100+', 'completed projects'],
      ['22', 'towns across Kosovo'],
      ['10+', 'drilling rigs'],
    ],
    productsTitle: 'Precast concrete from our own plant',
    products: 'L-shaped retaining walls, concrete pipes, well pipes, concrete slabs and rebar cages.',
    projectsTitle: 'From our sites',
    projectsLink: 'See all photos and videos',
    areaTitle: 'Where we work',
    area: 'We work all over Kosovo, including',
    contactTitle: 'Contact',
    hours: 'Mon–Sat: 07:00–19:00, Sun: closed',
    address: 'Dragobil, 24000 Malishevë, Kosovo',
    google: 'Google Maps & reviews',
    facebook: 'Facebook',
  },
} as const

const FOTOT = ['/images/galeria/diafragme/d7.jpg', '/images/galeria/G4.jpeg', '/images/galeria/diafragme/d2.jpg', '/images/galeria/muri-l/m2.jpg']

export default function FaqjaGjuhe({ gjuha }: { gjuha: Gjuha }) {
  const t = T[gjuha]
  const wa = `https://wa.me/38344184114?text=${encodeURIComponent(gjuha === 'de' ? 'Hallo VPD DRILL, ich möchte ein Angebot anfragen.' : 'Hello VPD DRILL, I would like to request a quote.')}`

  const ld = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    url: `${SITE_URL}/${gjuha}`,
    name: t.h1,
    description: t.lead,
    inLanguage: gjuha,
    about: { '@id': BIZNESI_ID },
  }

  return (
    <div lang={gjuha}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />

      <section className="relative isolate overflow-hidden bg-bedrock text-white">
        <div className="absolute inset-0 -z-10">
          <Image src="/images/hero/casagrande.jpg" alt="" fill priority sizes="100vw" className="object-cover opacity-40" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(14,42,48,0.96)_0%,rgba(14,42,48,0.75)_60%,rgba(14,42,48,0.5)_100%)]" />
        </div>
        <div className="shell pb-16 pt-[calc(var(--header-h)+56px)] sm:pb-24 sm:pt-[calc(var(--header-h)+88px)]">
          <p className="text-sm font-semibold uppercase tracking-wider text-glacier">{t.eyebrow}</p>
          <h1 className="display-lg mt-3 max-w-4xl text-white">{t.h1}</h1>
          <p className="mt-6 max-w-[62ch] text-base leading-relaxed text-white/75 sm:text-lg">{t.lead}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={wa} target="_blank" rel="noopener noreferrer" className="btn-brand px-7">
              <FaWhatsapp /> {t.cta}
            </a>
            <a href="tel:+38344184114" className="btn-ghost-light px-6">
              <FaPhoneAlt className="text-sm" /> {t.call}: +383 44 184 114
            </a>
          </div>
        </div>
      </section>

      <section id={SEKSIONET.sherbimet} className="bg-white py-16 sm:py-24">
        <div className="shell">
          <h2 className="display-lg">{t.servicesTitle}</h2>
          <div className="mt-10 grid gap-px overflow-hidden rounded-xl bg-stone-line ring-1 ring-stone-line sm:grid-cols-2">
            {t.services.map((s) => (
              <div key={s.t} className="flex flex-col bg-white p-7">
                <s.icon className="text-2xl text-brand" />
                <h3 className="mt-4 text-xl font-bold text-bedrock">{s.t}</h3>
                <p className="mt-2 flex-1 text-[15px] leading-relaxed text-slate-ink">{s.d}</p>
                <Link href={s.href} hrefLang="sq" className="mt-4 text-sm font-semibold text-brand hover:underline">
                  {t.moreSq} →
                </Link>
              </div>
            ))}
          </div>
          <div className="mt-8 rounded-xl bg-stone p-7">
            <h3 className="text-lg font-bold text-bedrock">{t.productsTitle}</h3>
            <p className="mt-2 text-[15px] text-slate-ink">{t.products}</p>
          </div>
        </div>
      </section>

      <section className="bg-bedrock py-16 text-white sm:py-20">
        <div className="shell">
          <h2 className="mb-8 text-xl font-bold sm:text-2xl">{t.statsTitle}</h2>
          <dl className="grid grid-cols-2 gap-x-6 sm:grid-cols-3 lg:grid-cols-5">
            {t.stats.map(([v, l]) => (
              <div key={l} className="border-t border-white/15 py-5">
                <dt className="sr-only">{l}</dt>
                <dd className="text-4xl font-extrabold font-xwide tabular sm:text-5xl">{v}</dd>
                <dd className="mt-2 text-sm text-white/65">{l}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section id={SEKSIONET.projektet} className="bg-white py-16 sm:py-24">
        <div className="shell">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="display-lg">{t.projectsTitle}</h2>
            <Link href="/projektet" className="btn-ghost">
              {t.projectsLink} →
            </Link>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
            {FOTOT.map((src) => (
              <div key={src} className="relative aspect-[4/3] overflow-hidden rounded-lg bg-stone-2">
                <Image src={src} alt="VPD DRILL" fill sizes="(max-width: 1024px) 50vw, 25vw" className="object-cover" />
              </div>
            ))}
          </div>
          <h3 className="mt-14 text-lg font-bold text-bedrock">{t.areaTitle}</h3>
          <p className="mt-2 text-[15px] leading-relaxed text-slate-ink">
            {t.area} {QYTETET_E_PUNES.join(', ')}.
          </p>
        </div>
      </section>

      <section id={SEKSIONET.kontakti} className="bg-stone py-16 sm:py-24">
        <div className="shell grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="display-lg">{t.contactTitle}</h2>
            <ul className="mt-8 space-y-4 text-[15px] text-bedrock">
              {['+38344184114', '+38344204877', '+38345700201'].map((n) => (
                <li key={n}>
                  <a href={`tel:${n}`} className="flex items-center gap-3 hover:text-brand">
                    <FaPhoneAlt className="text-sm text-brand" /> +383 {n.slice(4, 6)} {n.slice(6, 9)} {n.slice(9)}
                  </a>
                </li>
              ))}
              <li>
                <a href="mailto:info@vllezeritpaqarizi.com" className="flex items-center gap-3 break-all hover:text-brand">
                  <FaEnvelope className="text-sm text-brand" /> info@vllezeritpaqarizi.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <FaMapMarkerAlt className="text-sm text-brand" /> {t.address}
              </li>
              <li className="flex items-center gap-3">
                <FaClock className="text-sm text-brand" /> {t.hours}
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-3 self-end">
            <a href={wa} target="_blank" rel="noopener noreferrer" className="btn-brand justify-center px-7 py-4">
              <FaWhatsapp /> {t.cta}
            </a>
            <a href={GOOGLE_PROFILE_URL} target="_blank" rel="noopener noreferrer" className="btn-ghost justify-center px-6">
              <FaGoogle /> {t.google}
            </a>
            <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" className="btn-ghost justify-center px-6">
              <FaFacebookF /> {t.facebook}
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
