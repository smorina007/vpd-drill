'use client'

import { FaStar, FaQuoteLeft } from 'react-icons/fa'
import { useMjete } from '@/app/context/MjeteContext'
import SectionHeading from './ui/SectionHeading'

const vleresimet = [
  {
    id: 1,
    emri: 'Besim Krasniqi',
    roli: 'Kontraktues, Malisheve',
    vleresimi: 5,
    data: '15.02.2026',
    komenti: 'Punë profesionale dhe në kohë. Pilotat e vendosur për objektin tim janë të shkëlqyeshëm. E rekomandoj patjetër!',
  },
  {
    id: 2,
    emri: 'Valon Berisha',
    roli: 'Inxhinier Ndërtimi',
    vleresimi: 5,
    data: '10.02.2026',
    komenti: 'Bashkëpunim i shkëlqyer për shpimin e pusit. Makineritë moderne dhe ekipi profesional bënë diferencën.',
  },
  {
    id: 3,
    emri: 'Lumni Gashi',
    roli: 'Investitor',
    vleresimi: 4.5,
    data: '05.02.2026',
    komenti: 'Muri L i porositur ishte cilësor dhe montimi i shpejtë. Çmimet konkurruese.',
  },
  {
    id: 4,
    emri: 'Artan Hoxha',
    roli: 'Arkitekt',
    vleresimi: 5,
    data: '28.01.2026',
    komenti: 'Profesionalizëm në çdo detaj. Llogaritjet e sakta dhe ekzekutimi perfekt për projektin tonë.',
  },
]

/** Yjet me mbushje të pjesshme (p.sh. 4.9 → 4 yje + 90% e të pestit). */
function Yjet({ vlera, size = 'text-sm' }: { vlera: number; size?: string }) {
  return (
    <span className={`inline-flex gap-0.5 ${size}`} aria-label={`${vlera} nga 5 yje`}>
      {[0, 1, 2, 3, 4].map((i) => {
        const mbushja = Math.max(0, Math.min(1, vlera - i))
        return (
          <span key={i} className="relative inline-block">
            <FaStar className="text-stone-line" />
            <span className="absolute inset-0 overflow-hidden" style={{ width: `${mbushja * 100}%` }}>
              <FaStar className="text-signal" />
            </span>
          </span>
        )
      })}
    </span>
  )
}

export default function Vleresimet() {
  const { hap } = useMjete()
  const total = vleresimet.length
  const mesatarja = (vleresimet.reduce((a, v) => a + v.vleresimi, 0) / total).toFixed(1)

  return (
    <section id="vleresimet" data-shtresa="Vlerësimet" className="bg-stone py-20 sm:py-28">
      <div className="shell">
        <SectionHeading
          title="Vlerësimet e Klientëve"
          lede="Çfarë thonë klientët tanë për punën tonë"
          action={
            <div className="flex items-center gap-6">
              <div>
                <p className="text-4xl font-extrabold font-xwide tabular text-bedrock">{mesatarja}</p>
                <Yjet vlera={parseFloat(mesatarja)} />
                <p className="mt-1 text-xs text-slate-mute">Vlerësim mesatar</p>
              </div>
              <div className="h-14 w-px bg-stone-line" />
              <div>
                <p className="text-4xl font-extrabold font-xwide tabular text-bedrock">{total}</p>
                <p className="mt-1 text-xs text-slate-mute">Vlerësime totale</p>
              </div>
            </div>
          }
        />

        <div className="grid gap-px overflow-hidden rounded-xl bg-stone-line ring-1 ring-stone-line md:grid-cols-2">
          {vleresimet.map((v) => (
            <figure key={v.id} className="flex flex-col bg-white p-6 sm:p-8">
              <FaQuoteLeft className="text-2xl text-brand/25" />
              <blockquote className="mt-4 flex-1 text-[17px] leading-relaxed text-bedrock">{v.komenti}</blockquote>
              <figcaption className="mt-6 flex items-end justify-between gap-4 border-t border-stone-line pt-4">
                <div>
                  <p className="font-bold text-bedrock">{v.emri}</p>
                  <p className="text-sm text-slate-mute">{v.roli}</p>
                </div>
                <div className="text-right">
                  <Yjet vlera={v.vleresimi} />
                  <p className="mt-1 text-xs tabular text-slate-mute">{v.data}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="mt-10">
          <button type="button" onClick={() => hap('vleresime')} className="btn-brand px-7">
            Lini një vlerësim
          </button>
        </div>
      </div>
    </section>
  )
}
