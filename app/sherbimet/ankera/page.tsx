import ServiceDetail, { ListeHapash } from '@/components/ServiceDetail'
import { FaAnchor, FaMountain, FaHardHat, FaShieldAlt } from 'react-icons/fa'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Ankera dhe Stabilizim Shpatesh — Siguri Ndërtimore',
  description:
    'Vendosje ankerash të tensionuar për mbrojtje dhe stabilizim themelesh, shpatesh dhe muresh mbajtëse. Zgjidhje inxhinierike sigurie për terrene problematike në Kosovë.',
  keywords: 'ankera, anker, stabilizim shpatesh, siguri ndertimi, mure mbajtese, ground anchors, slope stabilization Kosovo, retaining wall reinforcement',
  alternates: { canonical: '/sherbimet/ankera' },
  openGraph: {
    title: 'Ankera dhe Stabilizim — VPD DRILL',
    description: 'Mbrojtje dhe stabilizim i themeleve dhe shpateve me ankera, për terrene problematike.',
    url: '/sherbimet/ankera',
  },
}

export default function AnkeraPage() {
  return (
    <ServiceDetail
      titulli="Ankera dhe Stabilizim"
      hyrja="Mbrojtje dhe stabilizim i themeleve dhe shpateve me ankera të tensionuar. Zgjidhje inxhinierike për terrene problematike."
      image="/images/galeria/G3.jpeg"
      h2="Siguri shtesë për projektet tuaja"
      paragrafi="Ankerat janë elementë strukturorë që punojnë në tërheqje dhe përdoren për të stabilizuar themelet, muret mbajtëse dhe shpatet natyrore. Me ekspertizën tonë, garantojmë që çdo strukturë të jetë e sigurt dhe e qëndrueshme."
      listaTitulli="Aplikimet kryesore"
      lista={[
        { icon: FaAnchor, titulli: 'Vendosje ankerash të tensionuar', pershkrimi: 'Ankera të tensionuar për të mbajtur në vend muret e gërmimeve të thella dhe themelet e urave.' },
        { icon: FaMountain, titulli: 'Stabilizim shpatesh', pershkrimi: 'Mbrojtje e shpateve nga rrëshqitjet, duke përdorur ankera dhe rrjeta çeliku.' },
        { icon: FaHardHat, titulli: 'Forcim i mureve mbajtëse', pershkrimi: 'Përforcim i mureve ekzistuese me ankera për të rritur kapacitetin mbajtës.' },
        { icon: FaShieldAlt, titulli: 'Mbrojtje e themeleve ekzistuese', pershkrimi: 'Kur ndërtohet pranë objekteve ekzistuese, ankerat parandalojnë lëvizjet e tokës dhe dëmtimet.' },
      ]}
      shtese={[
        {
          titulli: 'Procesi i punës',
          content: (
            <ListeHapash
              hapat={[
                'Analizë gjeoteknike e terrenit',
                'Projektimi i sistemit të ankerimit',
                'Shpimi dhe vendosja e ankerave',
                'Tensionimi dhe testimi i kapacitetit',
                'Monitorimi afatgjatë (opsional)',
              ]}
            />
          ),
        },
      ]}
      sidebarTitulli="Specifikimet"
      specs={[
        { icon: FaAnchor, text: 'Kapacitet: 30-100 ton' },
        { icon: FaMountain, text: 'Thellësi shpimi: deri 30m' },
        { icon: FaShieldAlt, text: 'Jetëgjatësi: mbi 50 vjet' },
      ]}
    />
  )
}
