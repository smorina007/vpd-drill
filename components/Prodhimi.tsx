import Image from 'next/image'
import Link from 'next/link'
import { FaArrowRight, FaCheckCircle, FaRuler, FaClock } from 'react-icons/fa'
import SectionHeading from './ui/SectionHeading'

const produktet = [
  {
    name: 'Muri L',
    description: 'Elemente betoni për mure mbajtëse. Prodhohen me standarde të larta cilësie.',
    specs: [
      { label: 'Dimensione të ndryshme', icon: FaRuler },
      { label: 'Rezistencë e lartë', icon: FaCheckCircle },
      { label: 'Montim të shpejtë', icon: FaClock },
    ],
    image: '/images/prodhimi/muri-l.jpeg',
  },
  {
    name: 'Gypa betoni',
    description: 'Për bunar dhe aplikime te tjera. Tubacion i qëndrueshëm për infrastrukturë nëntokësore.',
    specs: [
      { label: 'Diametra të ndryshëm', icon: FaRuler },
      { label: 'Rezistent ndaj presionit', icon: FaCheckCircle },
      { label: 'Jetëgjatësi e lartë', icon: FaClock },
    ],
    image: '/images/prodhimi/gypa-betoni.jpg',
  },
  {
    name: 'Pllaka betoni',
    description: 'Për shtrimin e rrugëve, trotuareve dhe hapësirave industriale.',
    specs: [
      { label: 'Trashësi të ndryshme', icon: FaRuler },
      { label: 'Sipërfaqe të lëmuar', icon: FaCheckCircle },
      { label: 'Ngarkesë e lartë', icon: FaCheckCircle },
    ],
    image: '/images/prodhimi/pllaka-betoni.jpg',
  },
]

export default function Prodhimi() {
  return (
    <section id="prodhimi" data-shtresa="Prodhimi" className="bg-white py-20 sm:py-28">
      <div className="shell">
        <SectionHeading title="Prodhimi Betoni" lede="Prodhim i elementeve të betonit me cilësi të lartë për çdo lloj projekti" />

        <div className="grid gap-x-8 gap-y-12 md:grid-cols-3">
          {produktet.map((p) => (
            <article key={p.name} className="group flex flex-col">
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-stone-2">
                <Image
                  src={p.image}
                  alt={p.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.07]"
                />
              </div>
              <h3 className="display-md mt-6">{p.name}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-slate-ink">{p.description}</p>
              <ul className="mt-5 grid gap-2 border-t border-stone-line pt-5">
                {p.specs.map((s) => (
                  <li key={s.label} className="flex items-center gap-3 text-sm font-medium text-bedrock">
                    <s.icon className="text-brand" />
                    {s.label}
                  </li>
                ))}
              </ul>
              <Link href="/kontakti" className="btn-brand mt-6 w-full sm:w-auto sm:self-start">
                Kërko çmim <FaArrowRight className="text-xs" />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
