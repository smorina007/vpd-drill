'use client'

import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FaArrowLeft, FaArrowRight, FaCheck, FaMapMarkerAlt, FaMountain, FaRulerVertical, FaWhatsapp } from 'react-icons/fa'
import { useOferta } from '@/app/context/OfertaContext'
import { TERRENET_OFERTE } from './OfertaForm'
import { CMIMI_PER_METER, MONEDHA, Terreni } from '@/lib/cmimet'
import { trackEvent } from '@/lib/gtag'

const KOMUNAT = [
  'Malishevë', 'Prishtinë', 'Prizren', 'Pejë', 'Gjakovë', 'Ferizaj', 'Gjilan', 'Mitrovicë', 'Vushtrri',
  'Suharekë', 'Rahovec', 'Klinë', 'Drenas', 'Skënderaj', 'Lipjan', 'Podujevë', 'Fushë Kosovë',
  'Obiliq', 'Kaçanik', 'Shtime', 'Viti', 'Kamenicë', 'Istog', 'Deçan', 'Dragash', 'Tjetër',
]

const TERRENET: { id: Terreni; emri: string; pershkrimi: string; max: number; ofertes?: string }[] = [
  { id: 'forte', emri: 'Terren i fortë', pershkrimi: 'Shkëmbor', max: 500, ofertes: TERRENET_OFERTE[0] },
  { id: 'bute', emri: 'Terren i butë', pershkrimi: 'Argjilë, rërë', max: 55, ofertes: TERRENET_OFERTE[1] },
  { id: 'perzier', emri: 'Terren i përzier', pershkrimi: 'Shtresa të ndryshme', max: 500, ofertes: TERRENET_OFERTE[2] },
  { id: 'panjohur', emri: "S'e di", pershkrimi: 'E vlerësojmë ne në terren', max: 500 },
]

const HAPAT = [
  { titulli: 'Lokacioni', icon: FaMapMarkerAlt },
  { titulli: 'Terreni', icon: FaMountain },
  { titulli: 'Thellësia', icon: FaRulerVertical },
]

/**
 * "Sa kushton pusi im?" — vlerësim i shpejtë në 3 hapa.
 * Çmimi shfaqet vetëm nëse janë plotësuar çmimet në lib/cmimet.ts;
 * përndryshe jep përmbledhjen dhe hap formularin e ofertës të plotësuar.
 */
export default function VleresuesiCmimit() {
  const { openOferta } = useOferta()
  const [hapi, setHapi] = useState(0)
  const [lokacioni, setLokacioni] = useState('')
  const [terreni, setTerreni] = useState<Terreni | null>(null)
  const [thellesia, setThellesia] = useState(80)

  const t = TERRENET.find((x) => x.id === terreni)
  const maxThellesia = t?.max ?? 500
  const thellesiaEfektive = Math.min(thellesia, maxThellesia)

  const cmimi = useMemo(() => {
    if (!terreni || terreni === 'panjohur') return null
    const c = CMIMI_PER_METER[terreni]
    if (!c) return null
    return { min: Math.round(c.min * thellesiaEfektive), max: Math.round(c.max * thellesiaEfektive) }
  }, [terreni, thellesiaEfektive])

  const mundTeVazhdoje = hapi === 0 ? !!lokacioni : hapi === 1 ? !!terreni : true
  const perfundoi = hapi === 3

  const hapOferten = () => {
    trackEvent('estimator_to_offer', { terreni, thellesia: thellesiaEfektive })
    openOferta({
      burim: 'vleresuesi',
      sherbimi: 'bunar',
      lokacioni: lokacioni === 'Tjetër' ? '' : lokacioni,
      spec: { thellesia: String(thellesiaEfektive), ...(t?.ofertes ? { llojiTerrenit: t.ofertes } : {}) },
    })
  }

  const whatsapp = () => {
    const tekst = [
      'Përshëndetje! Dua ofertë për shpim pusi:',
      `Lokacioni: ${lokacioni}`,
      `Terreni: ${t?.emri ?? ''}`,
      `Thellësia: ~${thellesiaEfektive} m`,
    ].join('\n')
    trackEvent('whatsapp_click', { location: 'vleresuesi' })
    window.open(`https://wa.me/38344184114?text=${encodeURIComponent(tekst)}`, '_blank', 'noopener,noreferrer')
  }

  return (
    <section id="sa-kushton" data-shtresa="Sa kushton?" className="bg-white py-20 sm:py-28">
      <div className="shell grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.3fr)] lg:gap-20">
        <div>
          <h2 className="display-lg">Sa kushton pusi im?</h2>
          <p className="lede mt-4">
            Tre pyetje të shpejta dhe e dini menjëherë çka ju duhet. Oferta e saktë vjen pas vlerësimit të terrenit.
          </p>
          <ol className="mt-10 space-y-1 border-l-2 border-stone-line">
            {HAPAT.map((h, i) => {
              const bere = i < hapi
              const aktiv = i === hapi
              return (
                <li key={h.titulli} className="relative pl-7">
                  <span
                    className={`absolute -left-[11px] top-2 grid h-5 w-5 place-items-center rounded-full text-[10px] font-bold transition-colors ${
                      bere ? 'bg-brand text-white' : aktiv ? 'bg-signal text-bedrock' : 'bg-stone-2 text-slate-mute'
                    }`}
                  >
                    {bere ? <FaCheck className="text-[8px]" /> : i + 1}
                  </span>
                  <button
                    type="button"
                    disabled={i > hapi}
                    onClick={() => setHapi(i)}
                    className={`py-1.5 text-left text-[15px] font-semibold ${aktiv ? 'text-bedrock' : bere ? 'text-brand hover:underline' : 'text-slate-mute'}`}
                  >
                    {h.titulli}
                    {bere && (
                      <span className="ml-2 font-normal text-slate-mute">
                        {i === 0 ? lokacioni : i === 1 ? t?.emri : `${thellesiaEfektive} m`}
                      </span>
                    )}
                  </button>
                </li>
              )
            })}
          </ol>
        </div>

        <div className="min-w-0 rounded-xl bg-stone p-5 ring-1 ring-stone-line sm:p-8">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={hapi}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.22 }}
            >
              {hapi === 0 && (
                <fieldset>
                  <legend className="display-md mb-5">Ku do të shpohet pusi?</legend>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                    {KOMUNAT.map((k) => (
                      <button
                        key={k}
                        type="button"
                        aria-pressed={lokacioni === k}
                        onClick={() => {
                          setLokacioni(k)
                          setHapi(1)
                        }}
                        className={`rounded-md border px-3 py-2.5 text-left text-sm font-semibold transition-colors ${
                          lokacioni === k ? 'border-bedrock bg-bedrock text-white' : 'border-stone-line bg-white text-bedrock hover:border-brand'
                        }`}
                      >
                        {k}
                      </button>
                    ))}
                  </div>
                </fieldset>
              )}

              {hapi === 1 && (
                <fieldset>
                  <legend className="display-md mb-5">Çfarë terreni keni?</legend>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {TERRENET.map((x) => (
                      <button
                        key={x.id}
                        type="button"
                        aria-pressed={terreni === x.id}
                        onClick={() => {
                          setTerreni(x.id)
                          setHapi(2)
                        }}
                        className={`rounded-lg border p-4 text-left transition-colors ${
                          terreni === x.id ? 'border-bedrock bg-bedrock text-white' : 'border-stone-line bg-white hover:border-brand'
                        }`}
                      >
                        <span className={`block font-bold ${terreni === x.id ? 'text-white' : 'text-bedrock'}`}>{x.emri}</span>
                        <span className={`mt-0.5 block text-sm ${terreni === x.id ? 'text-white/70' : 'text-slate-mute'}`}>
                          {x.pershkrimi}
                          {x.id === 'bute' && ' — deri 55m'}
                          {x.id === 'forte' && ' — deri 500m'}
                        </span>
                      </button>
                    ))}
                  </div>
                </fieldset>
              )}

              {hapi === 2 && (
                <div>
                  <label htmlFor="thellesia-pusit" className="display-md mb-6 block">
                    Sa thellë mendoni?
                  </label>
                  <p className="text-6xl font-extrabold font-xwide tabular text-bedrock">
                    {thellesiaEfektive}
                    <span className="ml-1 text-2xl text-brand">m</span>
                  </p>
                  <input
                    id="thellesia-pusit"
                    type="range"
                    min={10}
                    max={maxThellesia}
                    step={5}
                    value={thellesiaEfektive}
                    onChange={(e) => setThellesia(Number(e.target.value))}
                    className="mt-6 w-full accent-brand"
                  />
                  <div className="mt-1 flex justify-between text-xs tabular text-slate-mute">
                    <span>10 m</span>
                    <span>{maxThellesia} m</span>
                  </div>
                  {terreni === 'bute' && (
                    <p className="mt-4 text-sm text-slate-ink">Në terrene të buta shpojmë deri në 55m.</p>
                  )}
                  <p className="mt-4 text-sm text-slate-mute">Nuk e dini? Lëreni afërsisht — e përcaktojmë pas vlerësimit të terrenit.</p>
                </div>
              )}

              {perfundoi && (
                <div>
                  <p className="text-sm font-semibold text-brand">Vlerësimi juaj</p>
                  {cmimi ? (
                    <>
                      <p className="mt-2 text-5xl font-extrabold font-xwide tabular text-bedrock sm:text-6xl">
                        {cmimi.min.toLocaleString('de-DE')}–{cmimi.max.toLocaleString('de-DE')}
                        <span className="ml-1 text-2xl text-brand">{MONEDHA}</span>
                      </p>
                      <p className="mt-2 text-sm text-slate-mute">Çmim orientues. Oferta përfundimtare jepet pas vlerësimit të terrenit.</p>
                    </>
                  ) : (
                    <p className="display-md mt-2">Gati — ju dërgojmë ofertë të saktë falas.</p>
                  )}
                  <dl className="mt-6 grid grid-cols-3 border-y border-stone-line">
                    {[
                      ['Lokacioni', lokacioni],
                      ['Terreni', t?.emri ?? ''],
                      ['Thellësia', `~${thellesiaEfektive} m`],
                    ].map(([k, v], i) => (
                      <div key={k} className={`py-4 ${i > 0 ? 'border-l border-stone-line pl-4' : ''}`}>
                        <dt className="text-xs text-slate-mute">{k}</dt>
                        <dd className="mt-1 font-bold text-bedrock">{v}</dd>
                      </div>
                    ))}
                  </dl>
                  <div className="mt-6 flex flex-col gap-2 sm:flex-row">
                    <button type="button" onClick={hapOferten} className="btn-signal flex-1 py-3.5 text-base">
                      Merr ofertë të saktë <FaArrowRight className="text-xs" />
                    </button>
                    <button
                      type="button"
                      onClick={whatsapp}
                      className="btn border border-[#1f9d55] bg-white py-3.5 text-[#167a42] hover:bg-[#1f9d55] hover:text-white"
                    >
                      <FaWhatsapp className="text-lg" /> WhatsApp
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {hapi > 0 && (
            <div className="mt-8 flex items-center justify-between border-t border-stone-line pt-5">
              <button type="button" onClick={() => setHapi((h) => h - 1)} className="flex items-center gap-2 text-sm font-semibold text-slate-mute hover:text-bedrock">
                <FaArrowLeft className="text-xs" /> Mbrapa
              </button>
              {hapi === 2 && (
                <button type="button" onClick={() => setHapi(3)} disabled={!mundTeVazhdoje} className="btn-brand px-6">
                  Shiko vlerësimin <FaArrowRight className="text-xs" />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
