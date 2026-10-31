import Galeria from '@/components/Galeria'
import PageHeroBanner from '@/components/PageHeroBanner'
import { FaImages } from 'react-icons/fa'
import type { Metadata } from 'next'
import { BIZNESI_ID, SITE_URL } from '@/lib/site'
import { mediaTeReja } from '@/lib/galeriaMedia'

export const metadata: Metadata = {
  title: 'Projektet Tona — Shpime, Pilota dhe Gërmime të Realizuara',
  description:
    'Mbi 100 projekte të realizuara nga VPD DRILL: shpime puse uji, pilota, ankera, gërmime me diafragmë dhe mure L në Prishtinë, Prizren, Pejë, Gjakovë, Gjilan, Ferizaj dhe anembanë Kosovës. Foto dhe video nga kantieri.',
  keywords: 'projekte ndertimi Kosove, shpim pusi Prishtine, pilota Kosove, konstruksione themeli, completed drilling projects Kosovo',
  alternates: { canonical: '/projektet' },
  openGraph: {
    title: 'Projektet e VPD DRILL — Punë të Realizuara në Kosovë',
    description: 'Disa nga projektet e realizuara me sukses anembanë Kosovës.',
    url: '/projektet',
  },
}


export default function ProjektetPage() {
  const galeriaLd = {
    '@context': 'https://schema.org',
    '@type': 'ImageGallery',
    name: 'Projektet e VPD DRILL — foto dhe video nga kantieri',
    url: `${SITE_URL}/projektet`,
    author: { '@id': BIZNESI_ID },
    associatedMedia: mediaTeReja.map((m) =>
      m.lloji === 'video'
        ? { '@type': 'VideoObject', name: m.titulli, description: `${m.titulli} — ${m.kategoria}`, contentUrl: `${SITE_URL}${m.src}`, thumbnailUrl: `${SITE_URL}${m.poster}`, uploadDate: '2026-10-31' }
        : { '@type': 'ImageObject', name: m.titulli, contentUrl: `${SITE_URL}${m.src}`, caption: `${m.titulli} — ${m.kategoria}` },
    ),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(galeriaLd) }} />
      <PageHeroBanner
        icon={FaImages}
        title="Projektet Tona"
        subtitle="Disa nga projektet e realizuara me sukses në terrene të ndryshme anembanë Kosovës."
        crumbs={[{ label: 'Ballina', href: '/' }, { label: 'Projektet' }]}
        image="/images/galeria/p2.jpeg"
      />
      <Galeria showHeading={false} />
    </>
  )
}