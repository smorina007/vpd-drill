import Image from 'next/image'
import Link from 'next/link'
import { FaArrowLeft, FaBuilding, FaRuler, FaWeightHanging, FaHardHat } from 'react-icons/fa'
import type { Viewport } from 'next'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#256D7B',
}

export default function PilotaPage() {
  return (
    <>
      <section className="pt-24 pb-12 bg-gradient-to-r from-[#256D7B] to-[#1a4f5a] text-white">
        <div className="container mx-auto px-4">
          <Link href="/sherbimet" className="inline-flex items-center text-white/80 hover:text-white mb-4">
            <FaArrowLeft className="mr-2" /> Kthehu te Shërbimet
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Pilota për Objekte</h1>
          <p className="text-xl max-w-3xl">Themele të sigurta me pilota të thellë për çdo lloj objekti, nga ndërtesat individuale deri te komplekset industriale.</p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Përshkrimi kryesor */}
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Zgjidhje inxhinierike për themele të qëndrueshme</h2>
              <p className="text-gray-700 mb-4 text-lg">
                Pilotat janë elementë strukturorë vertikalë që transferojnë ngarkesën e ndërtesës në shtresat e thella të tokës. Me ekspertizën tonë, garantojmë qëndrueshmëri afatgjatë edhe në terrenet më problematike.
              </p>
              
              <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Llojet e pilotave që realizojmë</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <FaBuilding className="text-[#256D7B] text-xl mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Pilota nga 300 mm deri ne 1500 mm, pa këmisha (CFA)</h4>
                    <p className="text-gray-600">Metoda e avancuar që shpon dhe derdh në të njëjtën kohë tejkalon edhe pjeset me te veshtira, duke siguruar stabilitet maksimal.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <FaBuilding className="text-[#256D7B] text-xl mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Pilota nga 300 mm deri ne 1500 mm, me këmisha</h4>
                    <p className="text-gray-600">Metoda e avancuar që shpon dhe derdh në të njëjtën kohë tejkalon edhe pjeset me te veshtira, duke siguruar stabilitet maksimal, poashtu mbron nga shembjet e mundeshme.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <FaRuler className="text-[#256D7B] text-xl mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Konstruksione pilotash me armaturë të personalizuar</h4>
                    <p className="text-gray-600">Llogarisim dhe vendosim sasinë e duhur të hekurit për çdo projekt, duke siguruar kapacitetin e kërkuar.</p>
                  </div>
                </li>
              </ul>

              <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Testime dhe kontroll cilësie</h3>
              <p className="text-gray-700 mb-4">
                Çdo pilotë i nënshtrohet testimit të ngarkesës për të verifikuar kapacitetin mbajtës. Përdorim pajisje të posaçme për matjen e deformimeve dhe sigurojmë që rezultatet përputhen me projektin.
              </p>

              <div className="bg-gray-50 p-6 rounded-lg mt-6">
                <h4 className="font-semibold text-gray-900 mb-2">Kapaciteti mbajtës</h4>
                <p className="text-gray-700">Në varësi të diametrit dhe thellësisë, pilotat tona mund të mbajnë ngarkesa deri në <strong>150 ton/pilotë</strong>.</p>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 p-6 rounded-xl sticky top-24">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Informacione teknike</h3>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-[#256D7B]/10 rounded-lg flex items-center justify-center mr-3">
                      <FaRuler className="text-[#256D7B] text-sm" />
                    </div>
                    <span className="text-sm">Diametrat: 300-1500mm</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-[#256D7B]/10 rounded-lg flex items-center justify-center mr-3">
                      <FaWeightHanging className="text-[#256D7B] text-sm" />
                    </div>
                    <span className="text-sm">Kapacitet: deri 150 ton</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-[#256D7B]/10 rounded-lg flex items-center justify-center mr-3">
                      <FaHardHat className="text-[#256D7B] text-sm" />
                    </div>
                    <span className="text-sm">Thellësi: deri +35m</span>
                  </div>
                </div>
                <Link
                  href="/kontakti"
                  className="block w-full bg-[#256D7B] text-white text-center px-4 py-3 rounded-lg font-semibold hover:bg-[#1a4f5a] transition mb-3"
                >
                  Kërko ofertë
                </Link>
                <Link
                  href="/llogarites-pilota"
                  className="block w-full border border-[#256D7B] text-[#256D7B] text-center px-4 py-3 rounded-lg font-semibold hover:bg-[#256D7B] hover:text-white transition"
                >
                  Përdor llogaritësin
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}