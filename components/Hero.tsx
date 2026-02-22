import Link from 'next/link'
import Image from 'next/image'
import { FaArrowRight, FaCheckCircle } from 'react-icons/fa'

export default function Hero() {
  const stats = [
    { number: '500m', label: 'Thellësi në terrene të forta' },
    { number: '55m', label: 'Diametër në terrene të buta' },
    { number: '10+', label: 'Makineri të specializuara' },
    { number: '100%', label: 'Klientë të Kënaqur' }
  ]

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero/casagrande.jpg"
          alt="VPD DRILL - Makineri Casagrande në punë"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="container-custom relative z-10 py-20">
        <div className="max-w-3xl text-white">
          {/* Badge */}
          <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/20">
            <span className="w-2 h-2 bg-[#256D7B] rounded-full mr-2 animate-pulse" />
            <span className="text-sm font-medium tracking-wide">Ekspertizë Gjeoteknike</span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Ekspertizë e Thellë,{' '}
            <span className="text-[#256D7B]">Themele të Sigurta</span>
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl leading-relaxed">
            Specialiste në shpime puse uji, pilota për objekte, ankera stabilizues, 
            germim me diafragmë, prodhim betoni dhe produkte për puse me standarde evropiane.
          </p>

          {/* Features - Thellësitë e reja */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="flex items-center text-gray-200">
              <FaCheckCircle className="text-[#256D7B] mr-2 flex-shrink-0" />
              <span>Thellësi deri <strong>500m</strong> në terrene të forta</span>
            </div>
            <div className="flex items-center text-gray-200">
              <FaCheckCircle className="text-[#256D7B] mr-2 flex-shrink-0" />
              <span>Diametër deri <strong>55m</strong> në terrene të buta</span>
            </div>
            <div className="flex items-center text-gray-200">
              <FaCheckCircle className="text-[#256D7B] mr-2 flex-shrink-0" />
              <span>Germim me diafragmë</span>
            </div>
            <div className="flex items-center text-gray-200">
              <FaCheckCircle className="text-[#256D7B] mr-2 flex-shrink-0" />
              <span>10+ makineri të specializuara</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/kontakti"
              className="bg-white text-[#256D7B] px-8 py-4 rounded-md font-semibold hover:bg-gray-100 transition inline-flex items-center justify-center group"
            >
              Kërko Ofertë
              <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/projektet"
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-md font-semibold hover:bg-white/10 transition inline-flex items-center justify-center"
            >
              Shiko Projektet
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Bar - Përditësuar */}
      <div className="absolute bottom-0 left-0 right-0 bg-black/40 backdrop-blur-md border-t border-white/10">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6">
            {stats.map((stat, index) => (
              <div key={index} className="text-center text-white">
                <div className="text-2xl md:text-3xl font-bold text-[#256D7B]">{stat.number}</div>
                <div className="text-sm text-gray-300 tracking-wide">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}