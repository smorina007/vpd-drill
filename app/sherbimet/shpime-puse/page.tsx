import ServiceDetail from '@/components/ServiceDetail'
import VleresuesiCmimit from '@/components/VleresuesiCmimit'
import { FaWater, FaRuler, FaClock } from 'react-icons/fa'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Shpim Pusesh Uji (Bunar) deri 500m Thellësi',
  description:
    'Shpim pusesh uji dhe bunarësh në çdo lloj terreni — deri 500m në terrene të forta (shkëmbore), deri 55m diametër në terrene të buta. Makineri Casagrande, Mait, XCMG. Sondazhe gjeologjike.',
  keywords: 'shpim pusi, pus uji, bunar, shpim bunari, water well drilling, borehole drilling Kosovo, deep well drilling',
  alternates: { canonical: '/sherbimet/shpime-puse' },
  openGraph: {
    title: 'Shpim Pusesh Uji — VPD DRILL',
    description: 'Specialistë në shpimin e puseve të ujit deri 500m thellësi, në çdo lloj terreni në Kosovë.',
    url: '/sherbimet/shpime-puse',
  },
}

export default function ShpimePusePage() {
  return (
    <>
    <ServiceDetail
      titulli="Shpime Puse Uji"
      hyrja="Specialistë në shpimin e puseve të ujit në çdo lloj terreni, me makineri të avancuara dhe staf profesional."
      image="/images/hero/casagrande1.jpg"
      h2="Shërbimi ynë i shpimeve"
      paragrafi="Me mbi 20 vjet përvojë në fushën e shpimeve, ofrojmë zgjidhje të personalizuara për çdo klient. Përdorim makineri të fuqishme Casagrande, Mait, Masenzza, Puntell, Soilmec dhe XCMG për të garantuar rezultate optimale në çdo terren."
      listaTitulli="Çfarë ofrojmë?"
      lista={[
        { icon: FaWater, titulli: 'Shpime në terrene të forta (shkëmbore)', pershkrimi: 'Thellësi deri në 500m, duke përdorur bite diamanti dhe makineri të specializuara për shkëmb.' },
        { icon: FaWater, titulli: 'Shpime në terrene të buta (argjilë, rërë)', pershkrimi: 'Thellësi deri në 55m, me stabilizim dhe tubacion mbrojtës për të shmangur shembjet.' },
        { icon: FaRuler, titulli: 'Sondazhe gjeologjike', pershkrimi: 'Analizojmë terrenin përpara shpimit për të përcaktuar thellësinë dhe diametrin optimal.' },
        { icon: FaClock, titulli: 'Shpime të shpejta dhe efikase', pershkrimi: 'Me flotën tonë prej mbi 10 makinerish, realizojmë projektet në kohë rekord.' },
      ]}
      shtese={[
        {
          titulli: 'Makineritë që përdorim',
          content: (
            <dl className="grid grid-cols-2 border-y border-stone-line md:grid-cols-4">
              {[
                ['Casagrande', '4 njësi'],
                ['Mait 100/120', '2 njësi'],
                ['MDT', '3 njësi'],
                ['XCMG', '2 njësi'],
              ].map(([emri, sasia], i) => (
                <div key={emri} className={`py-5 ${i > 0 ? 'md:border-l md:border-stone-line md:pl-5' : ''} ${i % 2 === 1 ? 'border-l border-stone-line pl-5' : ''}`}>
                  <dt className="font-bold font-wide text-bedrock">{emri}</dt>
                  <dd className="mt-1 text-sm text-slate-mute">{sasia}</dd>
                </div>
              ))}
            </dl>
          ),
        },
      ]}
      sidebarTitulli="Keni pyetje?"
      sidebarTeksti="Na kontaktoni për një konsultë falas dhe ofertë të personalizuar."
      specs={[
        { icon: FaWater, text: 'Thellësi deri 500m, ne terene te forta' },
        { icon: FaWater, text: 'Thellësi deri 55m, ne terene te buta' },
        { icon: FaWater, text: '10+ makineri të specializuara' },
      ]}
    />
    <VleresuesiCmimit />
    </>
  )
}
