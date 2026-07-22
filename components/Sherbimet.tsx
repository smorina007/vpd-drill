import { FaWater, FaBuilding, FaAnchor, FaHammer } from 'react-icons/fa'
import Link from 'next/link'

const sherbimet = [
  {
    id: 1,
    title: 'Shpime Puse Uji',
    description: 'Specialistë në shpimin e puseve të ujit në çdo lloj terreni. Përdorim makineri të fuqishme për rezultate optimale.',
    icon: FaWater,
    features: [
      'Terrene të forta (shkëmbore) - deri 500m',
      'Terrene të buta (argjilë, rërë) - deri 55m diametër',
      'Makineri Casagrande, Mait, XCMG, Masenzza, Puntell',
      'Sondazhe gjeologjike'
    ],
    link: '/sherbimet/shpime-puse'
  },
  {
    id: 2,
    title: 'Pilota për Objekte',
    description: 'Themele të sigurta me pilota të thellë për çdo lloj objekti. Nga ndërtesat individuale deri te komplekset industriale.',
    icon: FaBuilding,
    features: [
      'Pilota',
      'Metoda CFA',
      'Konstruksione pilotash',
      'Testime të ngarkesës'
    ],
    link: '/sherbimet/pilota'
  },
  {
    id: 3,
    title: 'Ankera dhe Stabilizim',
    description: 'Mbrojtje dhe stabilizim i themeleve dhe shpateve me ankera. Zgjidhje inxhinierike për terrene problematike.',
    icon: FaAnchor,
    features: [
      'Vendosje ankerash të tensionuar',
      'Mbrojtje e themeleve',
      'Stabilizim shpatesh',
      'Forcim i mureve mbajtëse'
    ],
    link: '/sherbimet/ankera'
  },
  {
    id: 4,
    title: 'Germim me Diafragmë',
    description: 'Germime precize me diafragmë për mure nëntokësore, themele të thella dhe struktura mbajtëse.',
    icon: FaHammer,
    features: [
      'Mure diafragme deri 50m thellësi',
      'Precizion i lartë',
      'Stabilizim me bentonit',
      'Për çdo lloj terreni'
    ],
    link: '/sherbimet/germim-diafragme'
  }
]

export default function Sherbimet() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Shërbimet Tona</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Ekspertizë e specializuar me makineri të avancuara për çdo lloj projekti
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {sherbimet.map((s) => (
            <div key={s.id} className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 bg-[#256D7B]/10 rounded-lg flex items-center justify-center mb-4">
                <s.icon className="text-2xl text-[#256D7B]" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{s.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{s.description}</p>
              <ul className="space-y-2 mb-6">
                {s.features.map((f, i) => (
                  <li key={i} className="text-sm text-gray-500 flex items-start">
                    <span className="text-[#256D7B] mr-2">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <Link 
                href={s.link}
                className="text-[#256D7B] font-medium hover:underline inline-flex items-center"
              >
                Mëso më shumë
                <span className="ml-1">→</span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}