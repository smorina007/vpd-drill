import Image from 'next/image'
import Link from 'next/link'
import { FaArrowRight, FaCheckCircle, FaCube, FaRuler, FaClock } from 'react-icons/fa'

const produktet = [
  {
    name: 'Muri L',
    description: 'Elemente betoni për mure mbajtëse. Prodhohen me standarde të larta cilësie.',
    icon: FaCube,
    specs: [
      { label: 'Dimensione të ndryshme', icon: FaRuler },
      { label: 'Rezistencë e lartë', icon: FaCheckCircle },
      { label: 'Montim të shpejtë', icon: FaClock }
    ],
    image: '/images/prodhimi/muri-l.jpeg'
  },
  {
    name: 'Gypa betoni',
    description: 'Për bunar dhe aplikime te tjera. Tubacion i qëndrueshëm për infrastrukturë nëntokësore.',
    icon: FaCube,
    specs: [
      { label: 'Diametra të ndryshëm', icon: FaRuler },
      { label: 'Rezistent ndaj presionit', icon: FaCheckCircle },
      { label: 'Jetëgjatësi e lartë', icon: FaClock }
    ],
    image: '/images/prodhimi/gypa-betoni.jpg'
  },
  {
    name: 'Pllaka betoni',
    description: 'Për shtrimin e rrugëve, trotuareve dhe hapësirave industriale.',
    icon: FaCube,
    specs: [
      { label: 'Trashësi të ndryshme', icon: FaRuler },
      { label: 'Sipërfaqe të lëmuar', icon: FaCheckCircle },
      { label: 'Ngarkesë e lartë', icon: FaCheckCircle }
    ],
    image: '/images/prodhimi/pllaka-betoni.jpg'
  }
]

export default function Prodhimi() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Prodhimi Betoni
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Prodhim i elementeve të betonit me cilësi të lartë për çdo lloj projekti
          </p>
          <div className="w-32 h-1.5 bg-gradient-to-r from-[#256D7B] to-[#1a4f5a] mx-auto mt-6 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {produktet.map((produkt, index) => (
            <div 
              key={index} 
              className="group relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100"
            >
              {/* Foto */}
              <div className="relative h-56 w-full bg-gray-200 overflow-hidden">
                <Image
                  src={produkt.image}
                  alt={produkt.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <produkt.icon className="text-4xl text-white opacity-50" />
                </div>
              </div>

              {/* Përmbajtja */}
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-[#256D7B] transition-colors duration-300">
                  {produkt.name}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {produkt.description}
                </p>

                {/* Specifikat me ikona */}
                <div className="space-y-4 mb-8">
                  {produkt.specs.map((spec, i) => (
                    <div key={i} className="flex items-center text-gray-600">
                      <div className="w-8 h-8 bg-[#256D7B]/10 rounded-lg flex items-center justify-center mr-3">
                        <spec.icon className="text-[#256D7B] text-sm" />
                      </div>
                      <span className="text-sm font-medium">{spec.label}</span>
                    </div>
                  ))}
                </div>

                {/* BUTONI – Blu me tekst të bardhë (i garantuar) */}
                <Link
                  href="/kontakti"
                  className="inline-flex items-center justify-center w-full bg-[#256D7B] text-white px-6 py-4 rounded-xl font-bold text-base hover:bg-[#1a4f5a] transition-all duration-300 group/btn shadow-md"
                >
                  <span>Kërko çmim</span>
                  <FaArrowRight className="ml-2 group-hover/btn:translate-x-2 transition-transform duration-300 text-white" />
                </Link>
              </div>

              {/* Këndi dekorativ */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-[#256D7B]/20 to-transparent rounded-bl-3xl" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}