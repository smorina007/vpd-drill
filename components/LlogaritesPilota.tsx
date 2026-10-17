'use client'

import { useMemo, useState } from 'react'
import ShaftiSimulim3D from './ShaftiSimulim3D'
import { CalcField, CalcLayout, NumInput, Result, r2 } from './LlogaritesUI'

const densitetiBetoni = 2400 // kg/m³
const hekuriPerM3 = 150 // kg/m³ për pilota

export default function LlogaritesPilota() {
  const [thellesia, setThellesia] = useState(8)
  const [diametri, setDiametri] = useState(600)

  const r = useMemo(() => {
    const rrezja = diametri / 1000 / 2
    const siperfaqja = Math.PI * rrezja * rrezja
    const vellimi = siperfaqja * thellesia
    const kapaciteti = siperfaqja * 400 * thellesia // kN (përllogaritje e thjeshtë)
    return {
      vellimi: r2(vellimi),
      pesha: r2((vellimi * densitetiBetoni) / 1000),
      hekuri: r2(vellimi * hekuriPerM3),
      kapaciteti: r2(kapaciteti),
    }
  }, [thellesia, diametri])

  return (
    <CalcLayout
      intro={<p>Llogarit vëllimin e betonit dhe peshën e pilotave.</p>}
      fields={
        <>
          <CalcField label="Thellësia" unit="m">
            <NumInput value={thellesia} onChange={setThellesia} min={2} max={30} step={0.5} />
          </CalcField>
          <CalcField label="Diametri" unit="mm">
            <select className="field tabular" value={diametri} onChange={(e) => setDiametri(Number(e.target.value))}>
              {[400, 500, 600, 800, 1000, 1200].map((d) => (
                <option key={d} value={d}>
                  {d} mm
                </option>
              ))}
            </select>
          </CalcField>
        </>
      }
      sim={<ShaftiSimulim3D diametriMM={diametri} thellesiaM={thellesia || 0} lloji="beton" />}
      results={
        <>
          <Result primary label="Vëllimi" value={r.vellimi} unit="m³" note="beton për pilotë" />
          <div className="grid grid-cols-2 gap-x-6">
            <Result label="Pesha" value={r.pesha} unit="ton" note="pesha e pilotës" />
            <Result label="Hekuri" value={r.hekuri} unit="kg" note="armaturë" />
          </div>
          <Result
            label="Kapaciteti"
            value={r.kapaciteti}
            unit="kN"
            note={Number.isFinite(r.kapaciteti) ? `≈ ${(r.kapaciteti / 10).toFixed(2)} ton` : undefined}
          />
        </>
      }
    />
  )
}
