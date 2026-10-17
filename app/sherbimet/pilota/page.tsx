import ServiceDetail from '@/components/ServiceDetail'
import HapMjetButton from '@/components/HapMjetButton'
import { FaBuilding, FaRuler, FaWeightHanging, FaHardHat, FaCalculator } from 'react-icons/fa'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pilota për Objekte — Themele të Sigurta me Metodën CFA',
  description:
    'Pilota për themele objektesh dhe komplekse industriale, me metodën CFA. Konstruksione pilotash, testime ngarkese dhe armaturë sipas projektit. Themele të sigurta për çdo lloj ndërtimi në Kosovë.',
  keywords: 'pilota, piloti, konstruksion themeli, metoda CFA, themele ndertimi, piling foundations, CFA piles Kosovo, deep foundation contractor',
  alternates: { canonical: '/sherbimet/pilota' },
  openGraph: {
    title: 'Pilota për Objekte — VPD DRILL',
    description: 'Themele të sigurta me pilota të thellë, nga ndërtesat individuale deri te komplekset industriale.',
    url: '/sherbimet/pilota',
  },
}

export default function PilotaPage() {
  return (
    <ServiceDetail
      titulli="Pilota për Objekte"
      hyrja="Themele të sigurta me pilota të thellë për çdo lloj objekti, nga ndërtesat individuale deri te komplekset industriale."
      image="/images/galeria/G4.jpeg"
      h2="Zgjidhje inxhinierike për themele të qëndrueshme"
      paragrafi="Pilotat janë elementë strukturorë vertikalë që transferojnë ngarkesën e ndërtesës në shtresat e thella të tokës. Me ekspertizën tonë, garantojmë qëndrueshmëri afatgjatë edhe në terrenet më problematike."
      listaTitulli="Llojet e pilotave që realizojmë"
      lista={[
        { icon: FaBuilding, titulli: 'Pilota nga 300 mm deri ne 1500 mm, pa këmisha (CFA)', pershkrimi: 'Metoda e avancuar që shpon dhe derdh në të njëjtën kohë tejkalon edhe pjeset me te veshtira, duke siguruar stabilitet maksimal.' },
        { icon: FaBuilding, titulli: 'Pilota nga 300 mm deri ne 1500 mm, me këmisha', pershkrimi: 'Metoda e avancuar që shpon dhe derdh në të njëjtën kohë tejkalon edhe pjeset me te veshtira, duke siguruar stabilitet maksimal, poashtu mbron nga shembjet e mundeshme.' },
        { icon: FaRuler, titulli: 'Konstruksione pilotash me armaturë të personalizuar', pershkrimi: 'Llogarisim dhe vendosim sasinë e duhur të hekurit për çdo projekt, duke siguruar kapacitetin e kërkuar.' },
      ]}
      shtese={[
        {
          titulli: 'Testime dhe kontroll cilësie',
          content: (
            <>
              <p className="max-w-[68ch] text-[15px] leading-relaxed text-slate-ink">
                Çdo pilotë i nënshtrohet testimit të ngarkesës për të verifikuar kapacitetin mbajtës. Përdorim pajisje të posaçme për matjen e deformimeve dhe sigurojmë që rezultatet përputhen me projektin.
              </p>
              <div className="mt-6 border-l-[3px] border-signal bg-stone px-5 py-4">
                <h4 className="font-bold">Kapaciteti mbajtës</h4>
                <p className="mt-1 text-[15px] text-slate-ink">
                  Në varësi të diametrit dhe thellësisë, pilotat tona mund të mbajnë ngarkesa deri në <strong className="text-bedrock">150 ton/pilotë</strong>.
                </p>
              </div>
            </>
          ),
        },
      ]}
      sidebarTitulli="Informacione teknike"
      specs={[
        { icon: FaRuler, text: 'Diametrat: 300-1500mm' },
        { icon: FaWeightHanging, text: 'Kapacitet: deri 150 ton' },
        { icon: FaHardHat, text: 'Thellësi: deri +35m' },
      ]}
      veprimiDyte={
        <HapMjetButton mjet="pilota" className="btn-ghost-light w-full">
          <FaCalculator className="text-xs" /> Përdor llogaritësin
        </HapMjetButton>
      }
    />
  )
}
