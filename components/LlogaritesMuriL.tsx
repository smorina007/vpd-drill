'use client'

import { useMemo, useState } from 'react'
import MuriLSimulim3D from './MuriLSimulim3D'
import { useOferta } from '@/app/context/OfertaContext'
import { CalcField, CalcLayout, NumInput, Result, r2 } from './LlogaritesUI'

const densitetiBetoni = 2400 // kg/m³
const hekuriPerM3 = 120 // kg/m³ beton (mesatare)
const forcaPerM3 = 250 // kN/m³ (kapacitet mbajtës i përafërt)

export default function LlogaritesMuriL() {
  const { openOferta } = useOferta()
  const [gjatesia, setGjatesia] = useState(2) // m
  const [lartesiaMurit, setLartesiaMurit] = useState(1.5) // m
  const [trashesiaMurit, setTrashesiaMurit] = useState(12) // cm
  const [gjatesiaKembes, setGjatesiaKembes] = useState(0.8) // m
  const [trashesiaKembes, setTrashesiaKembes] = useState(20) // cm

  const r = useMemo(() => {
    const vellimiMurit = gjatesia * lartesiaMurit * (trashesiaMurit / 100)
    const vellimiKembes = gjatesia * gjatesiaKembes * (trashesiaKembes / 100)
    const vellimiTotal = vellimiMurit + vellimiKembes
    return {
      vellimiMurit: r2(vellimiMurit),
      vellimiKembes: r2(vellimiKembes),
      vellimiTotal: r2(vellimiTotal),
      pesha: r2((vellimiTotal * densitetiBetoni) / 1000),
      hekuri: r2(vellimiTotal * hekuriPerM3),
      forca: r2(vellimiTotal * forcaPerM3),
    }
  }, [gjatesia, lartesiaMurit, trashesiaMurit, gjatesiaKembes, trashesiaKembes])

  return (
    <CalcLayout
      intro={
        <p>
          Llogarit vëllimin, peshën dhe armaturën duke përfshirë murin vertikal dhe këmbën horizontale.
          Parametrat teknikë: densiteti i betonit 2400 kg/m³, armatura ~120 kg/m³ beton, kapaciteti mbajtës ~250 kN/m³.
        </p>
      }
      fields={
        <>
          <div className="sm:col-span-2">
            <CalcField label="Gjatësia e murit" unit="m" hint="Min: 0.1m, Max: 10m">
              <NumInput value={gjatesia} onChange={setGjatesia} min={0.1} max={10} step={0.1} />
            </CalcField>
          </div>
          <CalcField label="Lartësia e murit" unit="m" hint="Min: 0.1m, Max: 5m">
            <NumInput value={lartesiaMurit} onChange={setLartesiaMurit} min={0.1} max={5} step={0.1} />
          </CalcField>
          <CalcField label="Trashësia e murit" unit="cm" hint="Min: 5cm, Max: 50cm">
            <NumInput value={trashesiaMurit} onChange={setTrashesiaMurit} min={5} max={50} step={1} />
          </CalcField>
          <CalcField label="Gjatësia e këmbës" unit="m" hint="Min: 0.1m, Max: 2m">
            <NumInput value={gjatesiaKembes} onChange={setGjatesiaKembes} min={0.1} max={2} step={0.1} />
          </CalcField>
          <CalcField label="Trashësia e këmbës" unit="cm" hint="Min: 5cm, Max: 50cm">
            <NumInput value={trashesiaKembes} onChange={setTrashesiaKembes} min={5} max={50} step={1} />
          </CalcField>
        </>
      }
      sim={
        <MuriLSimulim3D
          gjatesia={gjatesia || 0}
          lartesiaMurit={lartesiaMurit || 0}
          trashesiaMuritCM={trashesiaMurit || 0}
          gjatesiaKembes={gjatesiaKembes || 0}
          trashesiaKembesCM={trashesiaKembes || 0}
        />
      }
      results={
        <>
          <Result primary label="Vëllimi total" value={r.vellimiTotal} unit="m³" note="beton i armuar" />
          <div className="grid grid-cols-2 gap-x-6">
            <Result label="Pesha totale" value={r.pesha} unit="ton" />
            <Result label="Hekuri (armaturë)" value={r.hekuri} unit="kg" />
            <Result label="Vëllimi i murit vertikal" value={r.vellimiMurit} unit="m³" />
            <Result label="Vëllimi i këmbës" value={r.vellimiKembes} unit="m³" />
          </div>
          <Result label="Forca mbajtëse" value={r.forca} unit="kN" />
          <p className="mt-3 rounded-md bg-stone px-3.5 py-3 text-[13px] leading-relaxed text-slate-ink">
            <span className="font-semibold text-bedrock">Rekomandim:</span> Për këtë mur L, rekomandojmë përdorimin e
            betonit të klasës C25/30 dhe armaturës ø10-14mm sipas projektit.
          </p>
          <button type="button" onClick={openOferta} className="btn-brand mt-4 w-full">
            Kërko ofertë për këtë mur
          </button>
        </>
      }
    />
  )
}
