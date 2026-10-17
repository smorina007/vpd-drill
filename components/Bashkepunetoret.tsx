import Image from 'next/image'

/** Kompanitë me të cilat VPD DRILL ka bashkëpunuar (logot në public/images/bashkepunetoret). */
const bashkepunetoret = [
  { emri: 'BTP Holding', logo: 'btp-holding' },
  { emri: 'Driloni Com', logo: 'driloni-com' },
  { emri: 'Geo Mineral', logo: 'geo-mineral' },
  { emri: 'Inon Investments', logo: 'inon-investments' },
  { emri: 'Mendi-P', logo: 'mendi-p' },
  { emri: 'Pika', logo: 'pika' },
  { emri: 'DP Partners', logo: 'dp-partners' },
  { emri: 'Dream Palace', logo: 'dream-palace' },
  { emri: 'Tulltoria', logo: 'tulltoria' },
  { emri: 'Puntori', logo: 'puntori' },
  { emri: 'Plastika', logo: 'plastika' },
  { emri: 'Albanica Residence', logo: 'albanica-residence' },
  { emri: 'HAB Engineering', logo: 'hab-engineering' },
  { emri: 'Cima Construction', logo: 'cima-construction' },
  { emri: 'EuroFood', logo: 'eurofood' },
  { emri: 'Model Slovenia', logo: 'model-slovenia' },
  { emri: 'Delta Invest', logo: 'delta-invest' },
  { emri: 'Nord Invest', logo: 'nord-invest' },
  { emri: 'Priinvest', logo: 'priinvest' },
  { emri: 'EH Group', logo: 'eh-group' },
]

function Pllaka({ b, fshehur }: { b: (typeof bashkepunetoret)[number]; fshehur?: boolean }) {
  return (
    <li className="shrink-0 pr-4 sm:pr-5" aria-hidden={fshehur || undefined}>
      <div
        className="flex h-28 w-48 items-center justify-center rounded-lg bg-white p-3 shadow-[0_1px_0_rgba(14,42,48,0.06)] ring-1 ring-stone-line transition-shadow hover:shadow-[0_10px_30px_-12px_rgba(14,42,48,0.35)] sm:h-32 sm:w-56"
        title={b.emri}
      >
        {/* Kuti me madhësi fikse + object-contain: logoja shfaqet gjithmonë e plotë */}
        <div className="relative h-full w-full">
          <Image
            src={`/images/bashkepunetoret/${b.logo}.png`}
            alt={fshehur ? '' : b.emri}
            fill
            sizes="(max-width: 640px) 170px, 210px"
            loading="eager"
            className="object-contain"
          />
        </div>
      </div>
    </li>
  )
}

export default function Bashkepunetoret() {
  return (
    <section id="bashkepunetoret" data-shtresa="Bashkëpunëtorët" className="overflow-hidden border-t border-stone-line bg-white py-16 sm:py-20">
      <div className="shell mb-8 flex flex-col gap-2 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
        <h2 className="display-md">Bashkëpunëtorët tanë</h2>
        <p className="text-sm text-slate-mute">Kompani me të cilat kemi punuar</p>
      </div>

      {/* Shirit që lëviz ngadalë; ndalet kur kalon mausi. Pa lëvizje nëse përdoruesi e ka çaktivizuar. */}
      <div className="bashkepunetoret-shirit relative [mask-image:linear-gradient(90deg,transparent,#000_3%,#000_97%,transparent)]">
        <ul className="bashkepunetoret-track flex w-max">
          {bashkepunetoret.map((b) => (
            <Pllaka key={b.logo} b={b} />
          ))}
          {bashkepunetoret.map((b) => (
            <Pllaka key={`${b.logo}-2`} b={b} fshehur />
          ))}
        </ul>
      </div>
    </section>
  )
}
