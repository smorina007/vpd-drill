import type { Metadata } from 'next'
import FaqjaGjuhe from '@/components/FaqjaGjuhe'

export const metadata: Metadata = {
  title: { absolute: 'Water Well Drilling, Piles & Diaphragm Walls in Kosovo | VPD DRILL' },
  description:
    'VPD DRILL: water wells up to 500 m, pile foundations, ground anchors and diaphragm walls over 50 m deep across Kosovo. Precast concrete from our own plant. Quote on WhatsApp.',
  alternates: {
    canonical: '/en',
    languages: { sq: '/', de: '/de', en: '/en', 'x-default': '/' },
  },
  openGraph: {
    title: 'VPD DRILL — Drilling & foundation works in Kosovo',
    description: 'Water wells, piles, anchors and diaphragm walls across Kosovo.',
    url: '/en',
    locale: 'en_US',
  },
}

export default function Page() {
  return <FaqjaGjuhe gjuha="en" />
}
