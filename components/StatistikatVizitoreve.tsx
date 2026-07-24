import { FaRulerVertical, FaTruckMonster, FaSmile, FaTools } from 'react-icons/fa'

/**
 * Shifra reale të kompanisë (të njëjtat si te Hero), jo numra "vizitorësh live"
 * të gjeneruar rastësisht — kjo është arsyeja pse u zëvendësua komponenti i vjetër.
 */
const stats = [
  { icon: FaRulerVertical, number: '500m', label: 'Thellësi në terrene të forta' },
  { icon: FaRulerVertical, number: '55m', label: 'Thellësi në terrene të buta' },
  { icon: FaTruckMonster, number: '10+', label: 'Makineri shpimi moderne' },
  { icon: FaSmile, number: '>90%', label: 'Klientë të kënaqur' },
]

export default function StatistikatVizitoreve() {
  return (
    <section className="py-10 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gray-50 rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center justify-center md:justify-start">
            <FaTools className="text-[#256D7B] mr-2" />
            Pse na zgjedhin klientët
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((s, i) => {
              const Icon = s.icon
              return (
                <div key={i} className="bg-white p-4 rounded-xl text-center border border-gray-100">
                  <Icon className="mx-auto mb-2 text-2xl text-[#256D7B]" />
                  <p className="text-2xl font-bold text-gray-900">{s.number}</p>
                  <p className="text-xs text-gray-500 mt-1">{s.label}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
