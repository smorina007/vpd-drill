import Link from 'next/link'
import { FaWater, FaBuilding, FaAnchor, FaHammer, FaArrowRight } from 'react-icons/fa'
import SectionHeading from './ui/SectionHeading'

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
      'Sondazhe gjeologjike',
    ],
    link: '/sherbimet/shpime-puse',
  },
  {
    id: 2,
    title: 'Pilota për Objekte',
    description: 'Themele të sigurta me pilota të thellë për çdo lloj objekti. Nga ndërtesat individuale deri te komplekset industriale.',
    icon: FaBuilding,
    features: ['Pilota', 'Metoda CFA', 'Konstruksione pilotash', 'Testime të ngarkesës'],
    link: '/sherbimet/pilota',
  },
  {
    id: 3,
    title: 'Ankera dhe Stabilizim',
    description: 'Mbrojtje dhe stabilizim i themeleve dhe shpateve me ankera. Zgjidhje inxhinierike për terrene problematike.',
    icon: FaAnchor,
    features: ['Vendosje ankerash të tensionuar', 'Mbrojtje e themeleve', 'Stabilizim shpatesh', 'Forcim i mureve mbajtëse'],
    link: '/sherbimet/ankera',
  },
  {
    id: 4,
    title: 'Germim me Diafragmë',
    description: 'Germime precize me diafragmë për mure nëntokësore, themele të thella dhe struktura mbajtëse.',
    icon: FaHammer,
    features: ['Mure diafragme deri 50m thellësi', 'Precizion i lartë', 'Stabilizim me bentonit', 'Për çdo lloj terreni'],
    link: '/sherbimet/germim-diafragme',
  },
]

export default function Sherbimet({ showHeading = true }: { showHeading?: boolean }) {
  return (
    <section id="sherbimet" data-shtresa="Shërbimet" className="bg-stone py-20 sm:py-28">
      <div className="shell">
        {showHeading && (
          <SectionHeading
            title="Shërbimet Tona"
            lede="Ekspertizë e specializuar me makineri të avancuara për çdo lloj projekti"
            action={
              <Link href="/sherbimet" className="btn-ghost">
                Të gjitha shërbimet <FaArrowRight className="text-xs" />
              </Link>
            }
          />
        )}

        <ul className="border-b border-bedrock/20">
          {sherbimet.map((s) => (
            <li key={s.id} className="group relative border-t border-bedrock/20">
              <Link
                href={s.link}
                className="grid gap-5 py-8 transition-colors sm:py-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)_minmax(0,1fr)] lg:gap-10"
              >
                <div className="flex items-start gap-4">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-md bg-bedrock text-glacier transition-colors group-hover:bg-brand group-hover:text-white">
                    <s.icon className="text-xl" />
                  </span>
                  <div>
                    <h3 className="display-md">{s.title}</h3>
                    <span className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-brand">
                      Mëso më shumë
                      <FaArrowRight className="text-xs transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
                <p className="text-[15px] leading-relaxed text-slate-ink lg:pt-1">{s.description}</p>
                <ul className="grid gap-2 lg:pt-1">
                  {s.features.map((f) => (
                    <li key={f} className="flex gap-3 text-[15px] text-bedrock">
                      <span className="mt-[9px] h-[2px] w-3 shrink-0 bg-signal" />
                      {f}
                    </li>
                  ))}
                </ul>
              </Link>
              <span className="pointer-events-none absolute -top-px left-0 h-[2px] w-0 bg-brand transition-all duration-500 group-hover:w-full" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
