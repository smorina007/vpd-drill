import Sherbimet from '@/components/Sherbimet'
import PageHeroBanner from '@/components/PageHeroBanner'
import { FaTools } from 'react-icons/fa'
import type { Viewport } from 'next'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#256D7B',
}

export default function SherbimetPage() {
  return (
    <>
      <PageHeroBanner
        icon={FaTools}
        title="Shërbimet Tona"
        subtitle="Ekspertizë e specializuar me makineri të avancuara — shpime puse, pilota, ankera dhe germim me diafragmë, për çdo lloj terreni në Kosovë."
        crumbs={[{ label: 'Ballina', href: '/' }, { label: 'Shërbimet' }]}
      />
      <Sherbimet showHeading={false} />
    </>
  )
}