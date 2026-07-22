import Image from 'next/image'
import Link from 'next/link'
import { FaArrowLeft, FaWater, FaRuler, FaMountain, FaClock } from 'react-icons/fa'
import type { Viewport } from 'next'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#256D7B',
}

export default function ShpimePusePage() {
  return (
    <>
      <section className="pt-24 pb-12 bg-gradient-to-r from-[#256D7B] to-[#1a4f5a] text-white">
        <div className="container mx-auto px-4">
          <Link href="/sherbimet" className="inline-flex items-center text-white/80 hover:text-white mb-4">
            <FaArrowLeft className="mr-2" /> Kthehu te Shërbimet
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Shpime Puse Uji</h1>
          <p className="text-xl max-w-3xl">Specialistë në shpimin e puseve të ujit në çdo lloj terreni, me makineri të avancuara dhe staf profesional.</p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Përshkrimi kryesor */}
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Shërbimi ynë i shpimeve</h2>
              <p className="text-gray-700 mb-4 text-lg">
                Me mbi 20 vjet përvojë në fushën e shpimeve, ofrojmë zgjidhje të personalizuara për çdo klient. Përdorim makineri të fuqishme Casagrande, Mait, Masenzza, Puntell, Soilmec dhe XCMG për të garantuar rezultate optimale në çdo terren.
              </p>
              
              <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Çfarë ofrojmë?</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <FaWater className="text-[#256D7B] text-xl mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Shpime në terrene të forta (shkëmbore)</h4>
                    <p className="text-gray-600">Thellësi deri në 500m, duke përdorur bite diamanti dhe makineri të specializuara për shkëmb.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <FaWater className="text-[#256D7B] text-xl mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Shpime në terrene të buta (argjilë, rërë)</h4>
                    <p className="text-gray-600">Thellësi deri në 55m, me stabilizim dhe tubacion mbrojtës për të shmangur shembjet.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <FaRuler className="text-[#256D7B] text-xl mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Sondazhe gjeologjike</h4>
                    <p className="text-gray-600">Analizojmë terrenin përpara shpimit për të përcaktuar thellësinë dhe diametrin optimal.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <FaClock className="text-[#256D7B] text-xl mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Shpime të shpejta dhe efikase</h4>
                    <p className="text-gray-600">Me flotën tonë prej mbi 10 makinerish, realizojmë projektet në kohë rekord.</p>
                  </div>
                </li>
              </ul>

              <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Makineritë që përdorim</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <p className="font-semibold">Casagrande</p>
                  <p className="text-sm text-gray-500">4 njësi</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <p className="font-semibold">Mait 100/120</p>
                  <p className="text-sm text-gray-500">2 njësi</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <p className="font-semibold">MDT</p>
                  <p className="text-sm text-gray-500">3 njësi</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <p className="font-semibold">XCMG</p>
                  <p className="text-sm text-gray-500">2 njësi</p>
                </div>
              </div>
            </div>

            {/* Sidebar me informacione dhe CTA */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 p-6 rounded-xl sticky top-24">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Keni pyetje?</h3>
                <p className="text-gray-600 mb-6">Na kontaktoni për një konsultë falas dhe ofertë të personalizuar.</p>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-[#256D7B]/10 rounded-lg flex items-center justify-center mr-3">
                      <FaWater className="text-[#256D7B] text-sm" />
                    </div>
                    <span className="text-sm">Thellësi deri 500m, ne terene te forta</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-[#256D7B]/10 rounded-lg flex items-center justify-center mr-3">
                      <FaWater className="text-[#256D7B] text-sm" />
                    </div>
                    <span className="text-sm">Thellësi deri 55m, ne terene te buta</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-[#256D7B]/10 rounded-lg flex items-center justify-center mr-3">
                      <FaWater className="text-[#256D7B] text-sm" />
                    </div>
                    <span className="text-sm">10+ makineri të specializuara</span>
                  </div>
                </div>

                <Link
                  href="/kontakti"
                  className="block w-full bg-[#256D7B] text-white text-center px-4 py-3 rounded-lg font-semibold hover:bg-[#1a4f5a] transition mb-3"
                >
                  Kërko ofertë
                </Link>
                <Link
                  href="/projektet"
                  className="block w-full border border-[#256D7B] text-[#256D7B] text-center px-4 py-3 rounded-lg font-semibold hover:bg-[#256D7B] hover:text-white transition"
                >
                  Shiko projektet
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}