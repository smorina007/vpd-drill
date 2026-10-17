import Galeria from '@/components/Galeria'
import PageHeroBanner from '@/components/PageHeroBanner'
import { FaImages } from 'react-icons/fa'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Projektet Tona — Shpime, Pilota dhe Gërmime të Realizuara',
  description:
    'Shikoni projektet e realizuara nga VPD DRILL: shpime puse uji, pilota për objekte, ankerime dhe gërmime me diafragmë në Prishtinë, Malishevë dhe anembanë Kosovës.',
  keywords: 'projekte ndertimi Kosove, shpim pusi Prishtine, pilota Kosove, konstruksione themeli, completed drilling projects Kosovo',
  alternates: { canonical: '/projektet' },
  openGraph: {
    title: 'Projektet e VPD DRILL — Punë të Realizuara në Kosovë',
    description: 'Disa nga projektet e realizuara me sukses anembanë Kosovës.',
    url: '/projektet',
  },
}


export default function ProjektetPage() {
  return (
    <>
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