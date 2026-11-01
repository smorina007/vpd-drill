import Image from 'next/image'
import { FaCog, FaTruck, FaHammer, FaArrowsAltV, FaAward, FaShieldAlt } from 'react-icons/fa'
import { GiCrane } from 'react-icons/gi'
import SectionHeading from './ui/SectionHeading'
import VideoNePamje from './ui/VideoNePamje'

/** Flota me media reale — çdo kartelë ka video ose foto nga kantieret tona. */
const flota = [
  {
    titulli: 'Soilmec SR-30',
    pershkrimi: 'Makinë shpimi me rrotullim për pilota — e markuar VPD, në punë në kantieret tona.',
    video: '/videos/te-reja/soilmec-4k',
    modelet: ['Soilmec SR-30'],
    icon: FaCog,
  },
  {
    titulli: 'Casagrande & Mait',
    pershkrimi: 'Makina shpimi për pilota dhe ankera, në terrene të buta dhe shkëmbore.',
    foto: '/images/hero/casagrande1.jpg',
    modelet: ['4 × Casagrande', 'Mait 100', 'Mait 120'],
    icon: FaHammer,
  },
  {
    titulli: 'Shpime pusesh uji',
    pershkrimi: 'Shpime deri 500 m në shkëmb — uji del me presion nga thellësia.',
    video: '/videos/te-reja/pus-uji',
    modelet: ['3 × MDT', 'XCMG makinë shpimi'],
    icon: FaArrowsAltV,
  },
  {
    titulli: 'Krane dhe ngritës',
    pershkrimi: 'Ngritje dhe montim: kafazë armature, mure L, shtylla dhe elemente të rënda.',
    video: '/videos/te-reja/vinc-1',
    modelet: ['XCMG kran i peshave të rënda', 'Krane ndihmëse'],
    icon: GiCrane,
  },
]
const teTjera = ['2 × Puntell', 'Eskavatorë të ndryshëm']

const bauerSpecs = [
  { icon: FaArrowsAltV, value: '50m+', label: 'Thellësi gërmimi' },
  { icon: FaShieldAlt, value: 'Bauer', label: 'Prodhues gjerman' },
  { icon: FaAward, value: '1-of-a-kind', label: 'Në treg' },
]

export default function Makinerite() {
  return (
    <section id="makinerite" data-shtresa="Makineritë" className="bg-bedrock-2 py-20 text-white sm:py-28">
      <div className="shell">
        <SectionHeading tone="dark" title="Makineritë tona" lede="Flotë e pasur me makineri të specializuara për çdo lloj pune" />

        {/* Makineria kryesuese — Bauer MC 32 */}
        <article className="group grid overflow-hidden rounded-xl bg-bedrock ring-1 ring-white/10 lg:grid-cols-2">
          <div className="relative min-h-[300px] overflow-hidden sm:min-h-[420px]">
            <Image
              src="/images/makinerite/bauer-mc32.jpg"
              alt="Bauer MC 32 — makineri gërmimi me diafragmë deri mbi 50m thellësi"
              fill
              className="object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-[1.07]"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded bg-signal px-3 py-1.5 text-xs font-bold text-bedrock sm:left-6 sm:top-6">
              <FaAward /> RISI NË TREG
            </span>
          </div>
          <div className="flex flex-col justify-center p-6 sm:p-10 lg:p-12">
            <p className="text-sm font-semibold text-glacier">Bauer MC 32 · Gjermani</p>
            <h3 className="display-md mt-2 text-white">Gërmim me Diafragmë deri mbi 50 Metra Thellësi</h3>
            <p className="mt-5 text-[15px] leading-relaxed text-white/70">
              VPD DRILL sjell në Kosovë Bauer MC 32 — një nga ndër të paktat makineri të këtij lloji në treg, e
              specializuar për gërmim precize me diafragmë (mure nëntokësore) në thellësi që shumica e kompanive vendase
              s&apos;i ofrojnë. Teknologji gjermane e nivelit botëror, e ndërtuar për projekte ku çdo centimetër
              precizioni dhe siguria e strukturave fqinje kanë rëndësi kritike.
            </p>
            <dl className="mt-8 grid grid-cols-3 border-y border-white/10">
              {bauerSpecs.map((s, k) => (
                <div key={s.label} className={`py-4 ${k > 0 ? 'border-l border-white/10 pl-4' : 'pr-4'}`}>
                  <s.icon className="mb-2 text-glacier" />
                  <dd className="text-lg font-bold font-wide text-white sm:text-2xl">{s.value}</dd>
                  <dt className="mt-0.5 text-xs text-white/55">{s.label}</dt>
                </div>
              ))}
            </dl>
            <p className="mt-6 text-sm leading-relaxed text-white/60">
              <strong className="text-white/85">Ideale për:</strong> parkingje nëntokësore, themele pranë ndërtesave
              ekzistuese, mure mbajtëse për projekte urbane komplekse, dhe çdo situatë ku metodat tradicionale të
              gërmimit rrezikojnë strukturat fqinje.
            </p>
          </div>
        </article>

        {/* Flota — kartela me video/foto reale */}
        <div className="mt-16 flex flex-wrap items-end justify-between gap-4">
          <h3 className="display-md text-white">Flota jonë</h3>
          <p className="text-sm text-white/55">Video dhe foto reale nga kantieret</p>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {flota.map((m) => (
            <article key={m.titulli} className="group relative overflow-hidden rounded-2xl bg-bedrock ring-1 ring-white/10">
              <div className="relative aspect-[16/10] overflow-hidden">
                {m.video ? (
                  <VideoNePamje
                    src={`${m.video}.mp4`}
                    poster={`${m.video}.jpg`}
                    className="h-full w-full object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-[1.06]"
                  />
                ) : (
                  <Image
                    src={m.foto!}
                    alt={m.titulli}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-[1.06]"
                  />
                )}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bedrock via-bedrock/30 to-transparent" />
                {m.video && (
                  <span className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full bg-black/45 px-2.5 py-1 text-[11px] font-semibold backdrop-blur">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-signal" /> Video
                  </span>
                )}
                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                  <p className="flex items-center gap-2 text-sm font-semibold text-glacier">
                    <m.icon /> Flota VPD
                  </p>
                  <h4 className="mt-1 text-2xl font-extrabold font-wide text-white">{m.titulli}</h4>
                </div>
              </div>
              <div className="p-5 pt-3 sm:p-6 sm:pt-3">
                <p className="text-[15px] leading-relaxed text-white/70">{m.pershkrimi}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {m.modelet.map((md) => (
                    <span key={md} className="rounded-full border border-white/15 bg-white/[0.04] px-3 py-1 text-sm font-semibold text-white/85">
                      {md}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] p-4 text-sm">
          <span className="mr-2 flex items-center gap-2 font-semibold text-white/60">
            <FaTruck className="text-glacier" /> Gjithashtu në flotë:
          </span>
          {teTjera.map((t) => (
            <span key={t} className="rounded-full border border-white/15 px-3 py-1 font-semibold text-white/80">
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
