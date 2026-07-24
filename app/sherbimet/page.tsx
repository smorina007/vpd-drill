import Sherbimet from '@/components/Sherbimet'
import PageHeroBanner from '@/components/PageHeroBanner'
import { FaTools } from 'react-icons/fa'
import type { Metadata, Viewport } from 'next'

export const metadata: Metadata = {
  title: 'Shërbimet: Shpim Pusesh, Pilota, Ankera, Gërmim Diafragmë',
  description:
    'Shërbime gjeoteknike në Kosovë: shpim pusesh uji deri 500m, pilota për themele objektesh, ankera stabilizuese për shpate dhe mure, gërmim me diafragmë. Konstruksione të sigurta për çdo terren.',
  keywords: 'shpim pusi, pus uji, bunar, ankera, pilota, konstruksion themeli, gërmim diafragme, themele ndërtimi, siguri ndërtimor, water well drilling Kosovo, piling foundations, ground anchors',
  alternates: { canonical: '/sherbimet' },
  openGraph: {
    title: 'Shërbimet e VPD DRILL — Shpim Pusesh, Pilota, Ankera, Diafragmë',
    description: 'Ekspertizë gjeoteknike e thellë për themele të sigurta, në çdo lloj terreni në Kosovë.',
    url: '/sherbimet',
  },
}

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