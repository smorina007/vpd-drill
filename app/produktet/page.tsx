import Produkte from '@/components/Produkte'
import PageHeroBanner from '@/components/PageHeroBanner'
import { FaCube } from 'react-icons/fa'
import type { Metadata, Viewport } from 'next'

export const metadata: Metadata = {
  title: 'Produkte Betoni: Muri L, Gypa Betoni, Pllaka, Kosha Armature',
  description:
    'Katalog i plotë produktesh betoni dhe hekuri për ndërtim dhe puse: Muri L, gypa betoni dhe plastikë, pllaka betoni, gypa hekuri, kosha armature dhe sajla. Prodhim dhe furnizim në Kosovë.',
  keywords: 'muri l, gypa betoni, pllaka betoni, gypa per puse, kosha armature, hekur ndertimi, sajla, produkte betoni Kosove, concrete products Kosovo, rebar cages',
  alternates: { canonical: '/produktet' },
  openGraph: {
    title: 'Produktet e VPD DRILL — Muri L, Gypa Betoni, Armaturë',
    description: 'Gama e plotë e produkteve për puse, ndërtim dhe shpime në Kosovë.',
    url: '/produktet',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#256D7B',
}

export default function ProduktetPage() {
  return (
    <>
      <PageHeroBanner
        icon={FaCube}
        title="Katalogu i Produkteve"
        subtitle="Gama e plotë e produkteve për puse, ndërtim dhe shpime — Muri L, gypa betoni, pllaka, elemente shpimi dhe më shumë."
        crumbs={[{ label: 'Ballina', href: '/' }, { label: 'Produktet' }]}
      />
      <Produkte showHeading={false} />
    </>
  )
}