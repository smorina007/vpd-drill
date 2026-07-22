'use client'

import Image from 'next/image'
import Link from 'next/link'
import { FaArrowRight, FaFacebookF, FaTwitter, FaLinkedinIn } from 'react-icons/fa'

const projektet = [
  {
    id: 1,
    data: '16.12.2025',
    titulli: 'Pilota',
    kategoria: 'Shpime',
    lokacioni: 'Prishtinë',
    foto: '/images/galeria/G1.jpeg'
  },
  {
    id: 2,
    data: '10.01.2025',
    titulli: 'Gërmim me diafragmë',
    kategoria: 'Gërmim Diafragmë',
    lokacioni: 'Prishtine',
    foto: '/images/galeria/G2.jpeg'
  },
  {
    id: 3,
    data: '20.11.2024',
    titulli: 'Pilota për objekt dhe ankerim',
    kategoria: 'Pilota dhe ankera',
    lokacioni: 'Prishtinë',
    foto: '/images/galeria/G3.jpeg'
  },
  {
    id: 4,
    data: '05.12.2024',
    titulli: 'Casagrande B175, pilota',
    kategoria: 'Shpime',
    lokacioni: 'Prishtinë',
    foto: '/images/galeria/G4.jpeg'
  },
  {
    id: 5,
    data: '22.01.2026',
    titulli: 'Pilota',
    kategoria: 'Shpime',
    lokacioni: 'Malisheve',
    foto: '/images/galeria/G5.jpeg'
  },
  {
    id: 6,
    data: '30.01.2026',
    titulli: 'Pilota',
    kategoria: 'Shpime',
    lokacioni: 'Malisheve',
    foto: '/images/galeria/G6.jpeg'
  },
  {
    id: 7,
    data: '30.01.2026',
    titulli: 'Pilota dhe vendosje te konstruksioneve te prodhuara nga VPD DRILL',
    kategoria: 'Shpime',
    lokacioni: 'Prishtine',
    foto: '/images/galeria/G7.jpeg'
  },
  {
    id: 8,
    data: '30.01.2026',
    titulli: 'Soilmec ne detyrë',
    kategoria: 'Shpime',
    lokacioni: 'Prishtine',
    foto: '/images/galeria/G10.jpeg'
  },
  {
    id: 9,
    data: '30.01.2026',
    titulli: 'Soilmec ne detyrë',
    kategoria: 'Shpime',
    lokacioni: 'Prishtine',
    foto: '/images/galeria/G18.jpeg'
  }
]

export default function Galeria() {
  // Përdor URL-në aktuale për share
  const shareUrl = typeof window !== 'undefined' ? window.location.href : ''

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
          <div className="w-32 h-1.5 bg-gradient-to-r from-[#256D7B] to-[#1a4f5a] mx-auto mt-6 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projektet.map((p) => (
            <div key={p.id} className="bg-white rounded-lg shadow-md hover:shadow-xl transition overflow-hidden">
              {/* Foto */}
              <div className="relative h-48 w-full">
                <Image
                  src={p.foto}
                  alt={p.titulli}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Përshkrimet */}
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-sm font-medium text-[#256D7B]">{p.data}</span>
                  <span className="text-xs bg-[#256D7B]/10 text-[#256D7B] px-2 py-1 rounded-full">
                    {p.kategoria}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{p.titulli}</h3>
                <p className="text-sm text-gray-500">📍 {p.lokacioni}</p>

                {/* Butonat Share */}
                <div className="flex justify-end mt-3 space-x-2">
                  <button
                    onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank')}
                    className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition"
                    aria-label="Share on Facebook"
                  >
                    <FaFacebookF size={14} />
                  </button>
                  <button
                    onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(p.titulli)}`, '_blank')}
                    className="w-8 h-8 bg-sky-500 text-white rounded-full flex items-center justify-center hover:bg-sky-600 transition"
                    aria-label="Share on Twitter"
                  >
                    <FaTwitter size={14} />
                  </button>
                  <button
                    onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, '_blank')}
                    className="w-8 h-8 bg-blue-700 text-white rounded-full flex items-center justify-center hover:bg-blue-800 transition"
                    aria-label="Share on LinkedIn"
                  >
                    <FaLinkedinIn size={14} />
                  </button>
                </div>
              </div>
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