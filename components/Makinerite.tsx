import Image from 'next/image'
import { FaCog, FaTruck, FaHammer, FaCubes, FaArrowsAltV, FaAward, FaShieldAlt } from 'react-icons/fa'
import { GiCrane } from 'react-icons/gi'  // Import nga react-icons/gi për ikonën e kranes

export default function Makinerite() {
  const makinerite = [
    {
      kategoria: 'Makina Shpimi Casagrande',
      icon: FaCog,
      items: [
        '4 x Casagrande (makina të ndryshme)',
        'Mait 100',
        'Mait 120'
      ]
    },
    {
      kategoria: 'Makina Shpimi MDT dhe XCMG',
      icon: FaHammer,
      items: [
        '3 x MDT',
        'XCMG makinë shpimi'
      ]
    },
    {
      kategoria: 'Puntell dhe Eskavatorë',
      icon: FaTruck,
      items: [
        '2 x Puntell',
        'Eskavatorë të ndryshëm'
      ]
    },
    {
      kategoria: 'Gërmim me Diafragmë',
      icon: FaCubes,
      items: [
        'Bauer MC 32 — deri mbi 50m thellësi',
      ]
    },
    {
      kategoria: 'Krane dhe Ngritës',
      icon: GiCrane,  // Përdor GiCrane nga react-icons/gi
      items: [
        'XCMG kran i peshave të rënda',
        'Krane të tjera ndihmëse'
      ]
    }
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Makineritë tona
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Flotë e pasur me makineri të specializuara për çdo lloj pune
          </p>
          <div className="w-32 h-1.5 bg-gradient-to-r from-[#256D7B] to-[#1a4f5a] mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Makineria kryesuese — Bauer MC 32 (risi në treg) */}
        <div className="mb-12 rounded-3xl overflow-hidden bg-gradient-to-br from-[#0f2b33] to-[#0a1f26] shadow-2xl shadow-[#256D7B]/20">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Foto */}
            <div className="relative h-72 sm:h-96 lg:h-auto">
              <Image
                src="/images/makinerite/bauer-mc32.jpg"
                alt="Bauer MC 32 — makineri gërmimi me diafragmë deri mbi 50m thellësi"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a1f26] via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-[#0a1f26]/40" />
              <span className="absolute top-4 left-4 sm:top-6 sm:left-6 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs sm:text-sm font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5">
                <FaAward /> RISI NË TREG
              </span>
            </div>

            {/* Përshkrimi */}
            <div className="p-6 sm:p-8 lg:p-10 flex flex-col justify-center">
              <p className="text-[#7fc8d9] text-sm font-semibold tracking-wide uppercase mb-2">
                Bauer MC 32 · Gjermani
              </p>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight">
                Gërmim me Diafragmë deri mbi <span className="text-[#7fc8d9]">50 Metra</span> Thellësi
              </h3>
              <p className="text-white/70 text-sm sm:text-base leading-relaxed mb-6">
                VPD DRILL sjell në Kosovë Bauer MC 32 — një nga ndër të paktat makineri të
                këtij lloji në treg, e specializuar për gërmim precize me diafragmë (mure
                nëntokësore) në thellësi që shumica e kompanive vendase s'i ofrojnë. Teknologji
                gjermane e nivelit botëror, e ndërtuar për projekte ku çdo centimetër precizioni
                dhe siguria e strukturave fqinje kanë rëndësi kritike.
              </p>

              <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-6">
                <div className="bg-white/5 rounded-xl p-3 sm:p-4 text-center border border-white/10">
                  <FaArrowsAltV className="mx-auto text-[#7fc8d9] text-lg sm:text-xl mb-1.5" />
                  <p className="text-xl sm:text-2xl font-bold text-white">50m+</p>
                  <p className="text-[10px] sm:text-xs text-white/50 mt-0.5">Thellësi gërmimi</p>
                </div>
                <div className="bg-white/5 rounded-xl p-3 sm:p-4 text-center border border-white/10">
                  <FaShieldAlt className="mx-auto text-[#7fc8d9] text-lg sm:text-xl mb-1.5" />
                  <p className="text-xl sm:text-2xl font-bold text-white">Bauer</p>
                  <p className="text-[10px] sm:text-xs text-white/50 mt-0.5">Prodhues gjerman</p>
                </div>
                <div className="bg-white/5 rounded-xl p-3 sm:p-4 text-center border border-white/10">
                  <FaAward className="mx-auto text-[#7fc8d9] text-lg sm:text-xl mb-1.5" />
                  <p className="text-xl sm:text-2xl font-bold text-white">1-of-a-kind</p>
                  <p className="text-[10px] sm:text-xs text-white/50 mt-0.5">Në treg</p>
                </div>
              </div>

              <p className="text-white/60 text-xs sm:text-sm leading-relaxed">
                <strong className="text-white/80">Ideale për:</strong> parkingje nëntokësore,
                themele pranë ndërtesave ekzistuese, mure mbajtëse për projekte urbane komplekse,
                dhe çdo situatë ku metodat tradicionale të gërmimit rrezikojnë strukturat fqinje.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {makinerite.map((kategoria, idx) => {
            const Icon = kategoria.icon
            return (
              <div key={idx} className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition">
                <div className="flex items-center mb-6">
                  <div className="w-14 h-14 bg-[#256D7B]/10 rounded-xl flex items-center justify-center mr-4">
                    <Icon className="text-3xl text-[#256D7B]" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">{kategoria.kategoria}</h3>
                </div>
                <ul className="space-y-4">
                  {kategoria.items.map((item, i) => (
                    <li key={i} className="flex items-start">
                      <span className="w-6 h-6 bg-[#256D7B]/10 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                        <span className="text-xs text-[#256D7B] font-bold">{i + 1}</span>
                      </span>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}