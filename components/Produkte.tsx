import { FaWater, FaWrench, FaRuler, FaCog, FaBolt, FaShieldAlt, FaCheck } from 'react-icons/fa'

const produkteKategorite = [
  {
    title: 'Gypa për puse',
    icon: FaWater,
    color: 'from-blue-500 to-blue-600',
    items: [
      { 
        name: 'Gypa plastike 125-300mm', 
        desc: 'Për puse uji, rezistent ndaj korrozionit',
        features: ['Rezistent', 'Lehtë', 'Ekonomik']
      },
      { 
        name: 'Gypa hekuri të galvanizuar', 
        desc: 'Të mbrojtur nga ndryshku, përdorim afatgjatë',
        features: ['Antikorroziv', 'I qëndrueshëm', 'Profesional']
      },
      { 
        name: 'Gypa hekuri pa galvanizuar', 
        desc: 'Për përdorim të brendshëm, çmim ekonomik',
        features: ['Ekonomik', 'Funksional', 'I besueshëm']
      }
    ]
  },
  {
    title: 'Sajla',
    icon: FaCog,
    color: 'from-green-500 to-green-600',
    items: [
      { 
        name: 'Sajla 10-24mm', 
        desc: 'Të gjitha dimensionet sipas kërkesës',
        features: ['Precize', 'Të forta', 'Të sakta']
      },
      { 
        name: 'Sherbim shtypjeje', 
        desc: 'Përpunim i saktë dhe profesional',
        features: ['Profesional', 'I shpejtë', 'Cilësor']
      }
    ]
  }
]

export default function Produkte() {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Produkte
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Gama e plotë e produkteve për puse dhe ndërtim
          </p>
          <div className="w-32 h-1.5 bg-gradient-to-r from-[#256D7B] to-[#1a4f5a] mx-auto mt-6 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {produkteKategorite.map((kat, i) => (
            <div 
              key={i} 
              className="group bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2"
            >
              {/* Header with gradient */}
              <div className={`bg-gradient-to-r ${kat.color} p-8 relative overflow-hidden`}>
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full transform translate-x-16 -translate-y-16" />
                <div className="relative flex items-center">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center mr-4">
                    <kat.icon className="text-3xl text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-white">{kat.title}</h3>
                </div>
              </div>

              {/* Items */}
              <div className="p-8 space-y-6">
                {kat.items.map((item, j) => (
                  <div key={j} className="border-l-4 border-[#256D7B] pl-6 py-2 hover:border-l-8 transition-all duration-300 group/item">
                    <h4 className="text-xl font-bold text-gray-900 mb-2">{item.name}</h4>
                    <p className="text-gray-600 mb-3 text-sm">{item.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {item.features.map((feature, k) => (
                        <span 
                          key={k} 
                          className="text-xs bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full flex items-center"
                        >
                          <FaCheck className="text-[#256D7B] mr-1 text-xs" />
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}