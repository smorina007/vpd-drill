/** Gjuhët e faqes dhe përkthimet e shiritit kryesor, footer-it dhe butonave të përbashkët. */

export type Gjuha = 'sq' | 'de' | 'en'

export const GJUHET: { kodi: Gjuha; emri: string; href: string }[] = [
  { kodi: 'sq', emri: 'Shqip', href: '/' },
  { kodi: 'de', emri: 'Deutsch', href: '/de' },
  { kodi: 'en', emri: 'English', href: '/en' },
]

export function gjuhaNgaPath(pathname: string | null): Gjuha {
  if (!pathname) return 'sq'
  if (pathname === '/de' || pathname.startsWith('/de/')) return 'de'
  if (pathname === '/en' || pathname.startsWith('/en/')) return 'en'
  return 'sq'
}

/** Seksionet e faqeve DE/EN (id-të e ankorave). */
export const SEKSIONET = { sherbimet: 'sherbimet', projektet: 'projektet', kontakti: 'kontakti' } as const

export const WHATSAPP = '38344184114'

export const TEKSTET = {
  de: {
    nav: [
      { href: '/de', label: 'Startseite' },
      { href: `/de#${SEKSIONET.sherbimet}`, label: 'Leistungen' },
      { href: `/de#${SEKSIONET.projektet}`, label: 'Projekte' },
      { href: `/de#${SEKSIONET.kontakti}`, label: 'Kontakt' },
    ],
    oferta: 'Angebot anfragen',
    ofertaWa: 'Hallo VPD DRILL, ich möchte ein Angebot anfragen.',
    menuHap: 'Menü öffnen',
    menuMbyll: 'Menü schließen',
    navAria: 'Hauptnavigation',
    gjuha: 'Sprache',
    footer: {
      moto: 'Tiefe Expertise, sichere Fundamente. Spezialisiert auf Bohrungen und Betonfertigteile.',
      linket: 'Schnellzugriff',
      kontakti: 'Kontakt',
      adresa: 'Adresse',
      adresaTekst: 'Dragobil, 24000 Malishevë, Kosovo',
      maps: 'Auf Google Maps finden',
      zonat: 'Einsatzgebiet',
      zonatTekst: (q: string) => `Brunnenbohrungen, Pfähle, Anker und Schlitzwände in ${q} und im ganzen Kosovo.`,
      te_drejtat: 'Alle Rechte vorbehalten.',
      privatesia: 'Datenschutz (Albanisch)',
    },
    ai: 'Fragen Sie unseren KI-Assistenten 🤖',
  },
  en: {
    nav: [
      { href: '/en', label: 'Home' },
      { href: `/en#${SEKSIONET.sherbimet}`, label: 'Services' },
      { href: `/en#${SEKSIONET.projektet}`, label: 'Projects' },
      { href: `/en#${SEKSIONET.kontakti}`, label: 'Contact' },
    ],
    oferta: 'Get a quote',
    ofertaWa: 'Hello VPD DRILL, I would like to request a quote.',
    menuHap: 'Open menu',
    menuMbyll: 'Close menu',
    navAria: 'Main navigation',
    gjuha: 'Language',
    footer: {
      moto: 'Deep expertise, solid foundations. Specialists in drilling and precast concrete.',
      linket: 'Quick links',
      kontakti: 'Contact',
      adresa: 'Address',
      adresaTekst: 'Dragobil, 24000 Malishevë, Kosovo',
      maps: 'Find us on Google Maps',
      zonat: 'Where we work',
      zonatTekst: (q: string) => `Water wells, piles, ground anchors and diaphragm walls in ${q} and across Kosovo.`,
      te_drejtat: 'All rights reserved.',
      privatesia: 'Privacy policy (Albanian)',
    },
    ai: 'Ask our AI assistant 🤖',
  },
} as const
