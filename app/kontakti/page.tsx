import Kontakt from '@/components/Kontakt'
import PageHeroBanner from '@/components/PageHeroBanner'
import { FaEnvelope } from 'react-icons/fa'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Kontakt — Kërko Ofertë për Shpim Pusi apo Pilota',
  description:
    'Na kontaktoni për shpim pusesh uji, pilota, ankera ose produkte betoni në Kosovë. Fsh Dragobil, Malishevë · 044 184 114 / 044 204 877.',
  keywords: 'kontakt VPD DRILL, ofertë shpim pusi, kompani ndertimi Malisheve, contact water well drilling Kosovo',
  alternates: { canonical: '/kontakti' },
  openGraph: {
    title: 'Kontaktoni VPD DRILL',
    description: 'Kërkoni ofertë ose na kontaktoni direkt për projektin tuaj.',
    url: '/kontakti',
  },
}


export default function KontaktiPage() {
  return (
    <>
      <PageHeroBanner
        icon={FaEnvelope}
        title="Kontakti"
        subtitle="Jemi në dispozicion për çdo pyetje apo kërkesë"
        crumbs={[{ label: 'Ballina', href: '/' }, { label: 'Kontakti' }]}
      />
      <Kontakt faqe />
    </>
  )
}