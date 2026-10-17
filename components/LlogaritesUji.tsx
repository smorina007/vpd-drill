'use client'

import { useMemo, useState } from 'react'
import ShaftiSimulim3D from './ShaftiSimulim3D'
import { CalcField, CalcLayout, NumInput, Result, r2 } from './LlogaritesUI'

export default function LlogaritesUji() {
  const [diametri, setDiametri] = useState(300) // mm
  const [thellesia, setThellesia] = useState(10) // m

  const r = useMemo(() => {
    const rrezjaM = diametri / 1000 / 2
    const vellimiM3 = Math.PI * Math.pow(rrezjaM, 2) * thellesia
    return { m3: r2(vellimiM3), l: Number.isFinite(vellimiM3) ? Math.round(vellimiM3 * 1000) : NaN }
  }, [diametri, thellesia])

  return (
    <CalcLayout
      intro={<p>Llogarit sa ujë mund të ruajë pusi juaj në varësi të diametrit dhe thellësisë.</p>}
      fields={
        <>
          <CalcField label="Diametri" unit="mm" hint="Min: 100mm, Max: 2000mm">
            <NumInput value={diametri} onChange={setDiametri} min={100} max={2000} step={10} />
          </CalcField>
          <CalcField label="Thellësia" unit="m" hint="Min: 1m, Max: 500m">
            <NumInput value={thellesia} onChange={setThellesia} min={1} max={500} step={0.5} />
          </CalcField>
        </>
      }
      sim={<ShaftiSimulim3D diametriMM={diametri || 0} thellesiaM={thellesia || 0} lloji="uje" />}
      results={
        <>
          <Result primary label="Vëllimi" value={r.m3} unit="m³" />
          <Result label="Vëllimi" value={r.l} unit="litra" />
        </>
      }
      footnote="Llogaritja bazohet në formulën e vëllimit të cilindrit: π × r² × h"
    />
  )
}
