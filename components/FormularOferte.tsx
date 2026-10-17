import { FaPhoneAlt, FaClock } from 'react-icons/fa'
import OfertaForm from './OfertaForm'

export default function FormularOferte() {
  return (
    <section id="oferta" data-shtresa="Oferta" className="bg-white py-20 sm:py-28">
      <div className="shell grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.4fr)] lg:gap-20">
        <div>
          <h2 className="display-lg">Kërko Ofertë</h2>
          <p className="lede mt-4">Plotësoni formularin dhe ne do t&apos;ju kontaktojmë brenda 24 orëve</p>
          <div className="mt-10 space-y-5 border-t border-stone-line pt-6 text-[15px]">
            <p className="flex items-start gap-3">
              <FaPhoneAlt className="mt-1 text-brand" />
              <span>
                <a href="tel:+38344184114" className="block font-semibold text-bedrock hover:text-brand">044 184 114</a>
                <a href="tel:+38344204877" className="block font-semibold text-bedrock hover:text-brand">044 204 877</a>
              </span>
            </p>
            <p className="flex items-start gap-3 text-slate-ink">
              <FaClock className="mt-1 text-brand" />
              Hënë - Shtunë: 07:00 - 19:00
            </p>
          </div>
        </div>
        <OfertaForm burimi="oferte_formular" />
      </div>
    </section>
  )
}
