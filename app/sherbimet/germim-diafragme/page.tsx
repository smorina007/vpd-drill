import ServiceDetail, { ListeThjeshte } from '@/components/ServiceDetail'
import { FaHammer, FaRuler, FaWater, FaHardHat } from 'react-icons/fa'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Gërmim me Diafragmë — Mure Nëntokësore deri 50m',
  description:
    'Gërmime precize me diafragmë për mure nëntokësore, themele të thella dhe struktura mbajtëse, deri 50m thellësi. Stabilizim me bentonit, për çdo lloj terreni në Kosovë.',
  keywords: 'germim diafragme, mur diafragme, mure nentokesore, diaphragm wall Kosovo, deep excavation, bentonite wall construction',
  alternates: { canonical: '/sherbimet/germim-diafragme' },
  openGraph: {
    title: 'Gërmim me Diafragmë — VPD DRILL',
    description: 'Gërmime precize për mure nëntokësore dhe themele të thella, deri 50m thellësi.',
    url: '/sherbimet/germim-diafragme',
  },
}

export default function GermimDiafragmePage() {
  return (
    <ServiceDetail
      titulli="Germim me Diafragmë"
      hyrja="Germime precize për mure nëntokësore, themele të thella dhe struktura mbajtëse, me stabilizim duke përdorur bentonit."
      image="/images/galeria/G21.jpeg"
      h2="Teknologji e avancuar për themele të thella"
      paragrafi="Muri me diafragmë është një strukturë nëntokësore e ndërtuar duke gërmuar një kanal të ngushtë dhe të thellë, i cili mbushet me beton dhe armaturë. Kjo teknikë përdoret për të krijuar mure mbajtëse, themele të thella dhe struktura nëntokësore."
      listaTitulli="Avantazhet e metodës"
      lista={[
        { icon: FaHammer, titulli: 'Thellësi deri 30m', pershkrimi: 'Mund të arrijmë thellësi të mëdha për projekte që kërkojnë themele të forta.' },
        { icon: FaRuler, titulli: 'Precizion i lartë', pershkrimi: 'Përdorim makineri dhe teknologji efikase dhe staf me pervojë në këtë fushë.' },
        { icon: FaWater, titulli: 'Stabilizim me bentonit', pershkrimi: 'Gjatë gërmimit, përdorim llucë bentoniti për të parandaluar shembjen e mureve të kanalit.' },
        { icon: FaHardHat, titulli: 'Për çdo lloj terreni', pershkrimi: 'Metoda përshtatet për terrene të forta, të buta dhe në prani të ujërave nëntokësore.' },
      ]}
      shtese={[
        {
          titulli: 'Aplikimet',
          content: (
            <ListeThjeshte
              items={[
                'Mure nëntokësore për parkingje dhe bodrume',
                'Themele për ura dhe ndërtesa të larta',
                'Mbrojtje e shpateve dhe gërmimeve të thella',
                'Struktura nëntokësore (metro, tunele)',
              ]}
            />
          ),
        },
      ]}
      sidebarTitulli="Specifikimet"
      specs={[
        { icon: FaRuler, text: 'Thellësi: deri 50m' },
        { icon: FaRuler, text: 'Trashësi: 0.5-1.5m' },
        { icon: FaHammer, text: 'Makineri të specializuara' },
      ]}
    />
  )
}
