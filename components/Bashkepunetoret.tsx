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
]

function Pllaka({ b, fshehur }: { b: (typeof bashkepunetoret)[number]; fshehur?: boolean }) {
  return (
    <li
      className="shrink-0 pr-4 sm:pr-5"
      aria-hidden={fshehur || undefined}
    >
      <div className="group grid h-24 w-44 place-items-center rounded-lg bg-white px-5 py-4 ring-1 ring-stone-line sm:h-28 sm:w-52">
      <Image
        src={`/images/bashkepunetoret/${b.logo}.png`}
        alt={fshehur ? '' : b.emri}
        width={180}
        height={90}
        className="max-h-full w-auto max-w-full object-contain opacity-80 grayscale transition duration-300 group-hover:opacity-100 group-hover:grayscale-0"
      />
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
      <div className="bashkepunetoret-shirit relative [mask-image:linear-gradient(90deg,transparent,#000_6%,#000_94%,transparent)]">
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
