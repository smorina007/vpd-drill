import type { Metadata } from 'next'
import FaqjaGjuhe from '@/components/FaqjaGjuhe'

export const metadata: Metadata = {
  title: { absolute: 'Brunnenbohrung, Pfähle & Schlitzwände im Kosovo | VPD DRILL' },
  description:
    'VPD DRILL: Brunnenbohrungen bis 500 m, Pfahlgründungen, Anker und Schlitzwände bis über 50 m im ganzen Kosovo. Betonfertigteile aus eigener Produktion. Angebot per WhatsApp.',
  alternates: {
    canonical: '/de',
    languages: { sq: '/', de: '/de', en: '/en', 'x-default': '/' },
  },
  openGraph: {
    title: 'VPD DRILL — Bohrungen & Spezialtiefbau im Kosovo',
    description: 'Brunnen, Pfähle, Anker und Schlitzwände im ganzen Kosovo.',
    url: '/de',
    locale: 'de_DE',
  },
}

export default function Page() {
  return <FaqjaGjuhe gjuha="de" />
}
