import Link from 'next/link'
import { FaArrowRight, FaPhoneAlt } from 'react-icons/fa'

export default function CTA() {
  return (
    <section className="relative overflow-hidden bg-brand text-white">
      <div className="strata-rule-light opacity-60" aria-hidden="true" />
      <div className="shell flex flex-col gap-8 py-16 sm:py-20 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl">
          <h2 className="display-lg text-white">Gati për të filluar projektin tuaj?</h2>
          <p className="mt-4 text-lg text-white/80">Na kontaktoni sot për një konsultë falas dhe ofertë të personalizuar</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link href="/kontakti" className="btn-signal px-7 py-4 text-base">
            Kërko Ofertë Falas <FaArrowRight className="text-xs" />
          </Link>
          <a href="tel:+38344184114" className="btn-ghost-light px-7 py-4 text-base tabular">
            <FaPhoneAlt className="text-xs" /> 044 184 114
          </a>
        </div>
      </div>
    </section>
  )
}
