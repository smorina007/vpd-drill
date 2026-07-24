import Image from 'next/image'
import Link from 'next/link'
import { FaArrowLeft, FaHammer, FaRuler, FaWater, FaHardHat } from 'react-icons/fa'
import type { Metadata, Viewport } from 'next'

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

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#256D7B',
}

export default function GermimDiafragmePage() {
  return (
    <>
      <section className="pt-24 pb-12 bg-gradient-to-r from-[#256D7B] to-[#1a4f5a] text-white">
        <div className="container mx-auto px-4">
          <Link href="/sherbimet" className="inline-flex items-center text-white/80 hover:text-white mb-4">
            <FaArrowLeft className="mr-2" /> Kthehu te Shërbimet
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Germim me Diafragmë</h1>
          <p className="text-xl max-w-3xl">Germime precize për mure nëntokësore, themele të thella dhe struktura mbajtëse, me stabilizim duke përdorur bentonit.</p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Përshkrimi kryesor */}
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Teknologji e avancuar për themele të thella</h2>
              <p className="text-gray-700 mb-4 text-lg">
                Muri me diafragmë është një strukturë nëntokësore e ndërtuar duke gërmuar një kanal të ngushtë dhe të thellë, i cili mbushet me beton dhe armaturë. Kjo teknikë përdoret për të krijuar mure mbajtëse, themele të thella dhe struktura nëntokësore.
              </p>
              
              <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Avantazhet e metodës</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <FaHammer className="text-[#256D7B] text-xl mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Thellësi deri 30m</h4>
                    <p className="text-gray-600">Mund të arrijmë thellësi të mëdha për projekte që kërkojnë themele të forta.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <FaRuler className="text-[#256D7B] text-xl mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Precizion i lartë</h4>
                    <p className="text-gray-600">Përdorim makineri dhe teknologji efikase dhe staf me pervojë në këtë fushë.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <FaWater className="text-[#256D7B] text-xl mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Stabilizim me bentonit</h4>
                    <p className="text-gray-600">Gjatë gërmimit, përdorim llucë bentoniti për të parandaluar shembjen e mureve të kanalit.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <FaHardHat className="text-[#256D7B] text-xl mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Për çdo lloj terreni</h4>
                    <p className="text-gray-600">Metoda përshtatet për terrene të forta, të buta dhe në prani të ujërave nëntokësore.</p>
                  </div>
                </li>
              </ul>

              <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Aplikimet</h3>
              <ul className="list-disc list-inside text-gray-700">
                <li>Mure nëntokësore për parkingje dhe bodrume</li>
                <li>Themele për ura dhe ndërtesa të larta</li>
                <li>Mbrojtje e shpateve dhe gërmimeve të thella</li>
                <li>Struktura nëntokësore (metro, tunele)</li>
              </ul>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 p-6 rounded-xl sticky top-24">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Specifikimet</h3>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-[#256D7B]/10 rounded-lg flex items-center justify-center mr-3">
                      <FaRuler className="text-[#256D7B] text-sm" />
                    </div>
                    <span className="text-sm">Thellësi: deri 50m</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-[#256D7B]/10 rounded-lg flex items-center justify-center mr-3">
                      <FaRuler className="text-[#256D7B] text-sm" />
                    </div>
                    <span className="text-sm">Trashësi: 0.5-1.5m</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-[#256D7B]/10 rounded-lg flex items-center justify-center mr-3">
                      <FaHammer className="text-[#256D7B] text-sm" />
                    </div>
                    <span className="text-sm">Makineri të specializuara</span>
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