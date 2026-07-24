import Produkte from '@/components/Produkte'
import PageHeroBanner from '@/components/PageHeroBanner'
import { FaCube } from 'react-icons/fa'
import type { Viewport } from 'next'

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