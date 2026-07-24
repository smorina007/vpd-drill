import Image from 'next/image'
import Link from 'next/link'
import { FaArrowLeft, FaAnchor, FaMountain, FaHardHat, FaShieldAlt } from 'react-icons/fa'
import type { Metadata, Viewport } from 'next'

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

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#256D7B',
}

export default function AnkeraPage() {
  return (
    <>
      <section className="pt-24 pb-12 bg-gradient-to-r from-[#256D7B] to-[#1a4f5a] text-white">
        <div className="container mx-auto px-4">
          <Link href="/sherbimet" className="inline-flex items-center text-white/80 hover:text-white mb-4">
            <FaArrowLeft className="mr-2" /> Kthehu te Shërbimet
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Ankera dhe Stabilizim</h1>
          <p className="text-xl max-w-3xl">Mbrojtje dhe stabilizim i themeleve dhe shpateve me ankera të tensionuar. Zgjidhje inxhinierike për terrene problematike.</p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Përshkrimi kryesor */}
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Siguri shtesë për projektet tuaja</h2>
              <p className="text-gray-700 mb-4 text-lg">
                Ankerat janë elementë strukturorë që punojnë në tërheqje dhe përdoren për të stabilizuar themelet, muret mbajtëse dhe shpatet natyrore. Me ekspertizën tonë, garantojmë që çdo strukturë të jetë e sigurt dhe e qëndrueshme.
              </p>
              
              <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Aplikimet kryesore</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <FaAnchor className="text-[#256D7B] text-xl mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Vendosje ankerash të tensionuar</h4>
                    <p className="text-gray-600">Ankera të tensionuar për të mbajtur në vend muret e gërmimeve të thella dhe themelet e urave.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <FaMountain className="text-[#256D7B] text-xl mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Stabilizim shpatesh</h4>
                    <p className="text-gray-600">Mbrojtje e shpateve nga rrëshqitjet, duke përdorur ankera dhe rrjeta çeliku.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <FaHardHat className="text-[#256D7B] text-xl mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Forcim i mureve mbajtëse</h4>
                    <p className="text-gray-600">Përforcim i mureve ekzistuese me ankera për të rritur kapacitetin mbajtës.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <FaShieldAlt className="text-[#256D7B] text-xl mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Mbrojtje e themeleve ekzistuese</h4>
                    <p className="text-gray-600">Kur ndërtohet pranë objekteve ekzistuese, ankerat parandalojnë lëvizjet e tokës dhe dëmtimet.</p>
                  </div>
                </li>
              </ul>

              <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Procesi i punës</h3>
              <ol className="list-decimal list-inside space-y-2 text-gray-700">
                <li>Analizë gjeoteknike e terrenit</li>
                <li>Projektimi i sistemit të ankerimit</li>
                <li>Shpimi dhe vendosja e ankerave</li>
                <li>Tensionimi dhe testimi i kapacitetit</li>
                <li>Monitorimi afatgjatë (opsional)</li>
              </ol>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 p-6 rounded-xl sticky top-24">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Specifikimet</h3>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-[#256D7B]/10 rounded-lg flex items-center justify-center mr-3">
                      <FaAnchor className="text-[#256D7B] text-sm" />
                    </div>
                    <span className="text-sm">Kapacitet: 30-100 ton</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-[#256D7B]/10 rounded-lg flex items-center justify-center mr-3">
                      <FaMountain className="text-[#256D7B] text-sm" />
                    </div>
                    <span className="text-sm">Thellësi shpimi: deri 30m</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-[#256D7B]/10 rounded-lg flex items-center justify-center mr-3">
                      <FaShieldAlt className="text-[#256D7B] text-sm" />
                    </div>
                    <span className="text-sm">Jetëgjatësi: mbi 50 vjet</span>
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