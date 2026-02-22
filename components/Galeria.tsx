import Link from 'next/link'
import { FaArrowRight } from 'react-icons/fa'

const projektet = [
  {
    id: 1,
    data: '16.12.2025',
    titulli: 'Casagrande në punë',
    kategoria: 'Shpime',
    lokacioni: 'Malisheve'
  },
  {
    id: 2,
    data: '10.01.2025',
    titulli: 'Soilmec në terren',
    kategoria: 'Shpime',
    lokacioni: 'Dragobil'
  },
  {
    id: 3,
    data: '20.11.2024',
    titulli: 'Pilota për objekt',
    kategoria: 'Pilota',
    lokacioni: 'Malisheve'
  }
]

export default function Galeria() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Projektet Tona
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Disa nga projektet e realizuara me sukses
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projektet.map((p) => (
            <div key={p.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="flex justify-between items-start mb-3">
                <span className="text-sm font-medium text-[#256D7B]">{p.data}</span>
                <span className="text-xs bg-[#256D7B]/10 text-[#256D7B] px-2 py-1 rounded-full">
                  {p.kategoria}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{p.titulli}</h3>
              <p className="text-sm text-gray-500">📍 {p.lokacioni}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link 
            href="/projektet" 
            className="inline-flex items-center text-[#256D7B] font-medium hover:underline"
          >
            Shiko të gjitha projektet
            <FaArrowRight className="ml-2 text-sm" />
          </Link>
        </div>
      </div>
    </section>
  )
}