import Link from 'next/link'
import { FaArrowRight } from 'react-icons/fa'

export default function CTA() {
  return (
    <section className="bg-[#256D7B] py-16">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Gati për të filluar projektin tuaj?
          </h2>
          <p className="text-lg text-white/90 mb-8">
            Na kontaktoni sot për një konsultë falas dhe ofertë të personalizuar
          </p>
          <Link 
            href="/kontakti" 
            className="inline-flex items-center bg-white text-[#256D7B] px-8 py-4 rounded-md font-semibold hover:bg-gray-100 transition-colors group"
          >
            Kërko Ofertë Falas
            <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  )
}