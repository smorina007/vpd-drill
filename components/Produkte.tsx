import Image from 'next/image'
import { FaWater, FaWrench, FaRuler, FaCog, FaBolt, FaShieldAlt, FaCheck } from 'react-icons/fa'

const produkteKategorite = [
  {
    title: 'Muri L',
    icon: FaShieldAlt,
    color: 'from-blue-500 to-blue-600',
    items: [
      { name: 'Muri L - 0.5m', image: '/images/produktet/ML1.jpeg' },
      { name: 'Muri L - 0.75m', image: '/images/produktet/ML2.jpeg' },
      { name: 'Muri L - 1m', image: '/images/produktet/ML3.jpeg' },
      { name: 'Muri L - 1.25m', image: '/images/produktet/ML4.jpeg' },
      { name: 'Muri L - 1.5 m', image: '/images/produktet/ML5.jpeg' },
      { name: 'Muri L - 1.75m', image: '/images/produktet/ML6.jpg' },
      { name: 'Muri L - 2m', image: '/images/produktet/ML6.jpg' },
    ]
  },
  {
    title: 'Gypa betoni',
    icon: FaRuler,
    color: 'from-purple-500 to-pink-500',
    items: [
      { name: 'Gyp betoni 300mm', image: '/images/produktet/GB1.jpg' },
      { name: 'Gyp betoni 400mm', image: '/images/produktet/GB1.jpg' },
      { name: 'Gyp betoni 500mm', image: '/images/produktet/GB1.jpg' },
      { name: 'Gyp betoni 600mm', image: '/images/produktet/GB1.jpg' },
      { name: 'Gyp betoni 800mm', image: '/images/produktet/GB1.jpg' },
      { name: 'Gyp betoni 1000mm', image: '/images/produktet/GB1.jpg' },
    ]
  },
  {
    title: 'Pllaka betoni',
    icon: FaBolt,
    color: 'from-yellow-500 to-orange-500',
    items: [
      { name: 'Pllakë betoni - 80x30x8cm', image: '/images/produktet/P1.jpg' },
      { name: 'Pllakë betoni - 100x30x8cm', image: '/images/produktet/P2.jpg' },
      { name: 'Pllakë betoni - 150x30x8cm', image: '/images/produktet/P3.jpg' },
      { name: 'Pllakë betoni - 200x30x8cm', image: '/images/produktet/P4.jpg' },
      { name: 'Pllakë betoni - 80x50x8cm', image: '/images/produktet/P5.jpg' },
      { name: 'Pllakë betoni - 150x50x8cm', image: '/images/produktet/P6.jpg' },
      { name: 'Pllakë betoni - 200x50x8cm', image: '/images/produktet/P6.jpg' },
      { name: 'Pllakë betoni - 80x80x8xm', image: '/images/produktet/P6.jpg' },
       { name: 'Pllakë betoni - 100x80x8xm', image: '/images/produktet/P6.jpg' },
        { name: 'Pllakë betoni - 150x80x8xm', image: '/images/produktet/P6.jpg' },
         { name: 'Pllakë betoni - 200x80x8xm', image: '/images/produktet/P6.jpg' },
    ]
  },
  {
    title: 'Gypa plastike për puse',
    icon: FaWater,
    color: 'from-cyan-500 to-blue-500',
    items: [
      { name: 'Gyp plastik 125mm', image: '/images/produktet/GP1.jpg' },
      { name: 'Gyp plastik 140mm', image: '/images/produktet/GP1.jpg' },
      { name: 'Gyp plastik 160mm', image: '/images/produktet/GP1.jpg' },
      { name: 'Gyp plastik 175mm', image: '/images/produktet/GP2.jpg' },
      { name: 'Gyp plastik 200mm', image: '/images/produktet/GP3.jpg' },
      { name: 'Gyp plastik 225mm', image: '/images/produktet/GP3.jpg' },
      { name: 'Gyp plastik 250mm', image: '/images/produktet/GP3.jpg' },
    ]
  },
  {
    title: 'Gypa hekuri',
    icon: FaCog,
    color: 'from-gray-600 to-gray-800',
    items: [
      { name: 'Gyp hekuri i galvanizuar', image: '/images/produktet/GH1.jpg' },
      { name: 'Gyp hekuri pa galvanizuar', image: '/images/produktet/GH2.jpg' },
    ]
  },
  {
    title: 'Elemente shpimi',
    icon: FaWrench,
    color: 'from-green-500 to-emerald-500',
    items: [
      { name: 'Element shpimi 1', image: '/images/produktet/ESH1.jpg' },
      { name: 'Element shpimi 2', image: '/images/produktet/ESH2.jpg' },
      { name: 'Element shpimi 3', image: '/images/produktet/ESH3.jpg' },
      { name: 'Element shpimi 4', image: '/images/produktet/ESH4.jpg' },
    ]
  },
  {
    title: 'Kosha armature',
    icon: FaBolt,
    color: 'from-red-500 to-red-600',
    items: [
      { name: 'Kosh arme 1', image: '/images/produktet/KA1.jpg' },
      { name: 'Kosh arme 2', image: '/images/produktet/KA2.jpg' },
    ]
  },
  {
    title: 'Sajla (shufra hekuri)',
    icon: FaRuler,
    color: 'from-indigo-500 to-indigo-600',
    items: [
      { name: 'Sajla 10-24mm', image: '/images/produktet/SH.jpg' },
    ]
  }
]

export default function Produkte() {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Produkte
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Gama e plotë e produkteve për puse, ndërtim dhe shpime
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

              {/* Items - Grid me foto */}
              <div className="p-8">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {kat.items.map((item, j) => (
                    <div key={j} className="group/item">
                      <div className="relative h-24 w-full overflow-hidden rounded-lg mb-2">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover group-hover/item:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <p className="text-xs text-center font-medium text-gray-700">{item.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}