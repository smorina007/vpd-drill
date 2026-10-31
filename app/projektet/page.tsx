import type { Metadata } from 'next'
import FaqjaProjekteve from '@/components/FaqjaProjekteve'

export const metadata: Metadata = {
  title: 'Projektet Tona — Shpime, Pilota dhe Gërmime të Realizuara',
  description:
    'Mbi 100 projekte të realizuara nga VPD DRILL: shpime puse uji, pilota, ankera, gërmime me diafragmë dhe mure L në Prishtinë, Prizren, Pejë, Gjakovë, Gjilan, Ferizaj dhe anembanë Kosovës. Foto dhe video nga kantieri.',
  keywords: 'projekte ndertimi Kosove, shpim pusi Prishtine, pilota Kosove, konstruksione themeli, completed drilling projects Kosovo',
  alternates: { canonical: '/projektet' },
  openGraph: {
    title: 'Projektet e VPD DRILL — Punë të Realizuara në Kosovë',
    description: 'Foto dhe video reale nga kantieret tona anembanë Kosovës.',
    url: '/projektet',
  },
}

export default function ProjektetPage() {
  return <FaqjaProjekteve />
}
