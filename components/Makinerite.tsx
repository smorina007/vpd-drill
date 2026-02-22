import { FaCog, FaTruck, FaHammer, FaCubes } from 'react-icons/fa'
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