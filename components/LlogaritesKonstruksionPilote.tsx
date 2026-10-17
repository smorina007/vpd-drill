'use client'

import { useMemo, useState } from 'react'
import ArmaturaSimulim3D from './ArmaturaSimulim3D'
import { CalcField, CalcLayout, NumInput, Result, r2 } from './LlogaritesUI'

const densitetiHekur = 7850 // kg/m³

export default function LlogaritesKonstruksionPilote() {
  const [p, setP] = useState({
    diametriPilotes: 600, // mm
    thellesia: 10, // m
    numriFijeveVertikale: 8,
    diametriFijeve: 16, // mm
    diametriSpirales: 10, // mm
    distancaSpirales: 20, // cm
  })
  const set = (k: keyof typeof p) => (v: number) => setP((prev) => ({ ...prev, [k]: v }))

  const r = useMemo(() => {
    const rPilotes = p.diametriPilotes / 1000 / 2
    const perimeter = 2 * Math.PI * rPilotes

    const siperfaqjaFijes = Math.PI * Math.pow(p.diametriFijeve / 1000 / 2, 2)
    const gjatesiaFijes = p.thellesia + 0.5 // +50cm për mbivendosje
    const peshaFijeve = siperfaqjaFijes * gjatesiaFijes * p.numriFijeveVertikale * densitetiHekur

    const numriSpiralave = Math.ceil((p.thellesia * 100) / p.distancaSpirales)
    const gjatesiaPerSpirale = Math.sqrt(Math.pow(perimeter, 2) + Math.pow(p.distancaSpirales / 100, 2))
    const gjatesiaSpirales = gjatesiaPerSpirale * numriSpiralave
    const peshaSpirales = Math.PI * Math.pow(p.diametriSpirales / 1000 / 2, 2) * gjatesiaSpirales * densitetiHekur

    const peshaTotale = peshaFijeve + peshaSpirales
    const vellimiBetoni = Math.PI * Math.pow(rPilotes, 2) * p.thellesia
    return {
      peshaFijeve: r2(peshaFijeve),
      peshaSpirales: r2(peshaSpirales),
      gjatesiaSpirales: r2(gjatesiaSpirales),
      peshaTotale: r2(peshaTotale),
      raporti: r2(peshaTotale / vellimiBetoni),
    }
  }, [p])

  return (
    <CalcLayout
      intro={<p>Llogarit sasinë e hekurit për armaturën e pilotave.</p>}
      fields={
        <>
          <CalcField label="Diametri i pilotës" unit="mm">
            <NumInput value={p.diametriPilotes} onChange={set('diametriPilotes')} min={300} step={50} />
          </CalcField>
          <CalcField label="Thellësia" unit="m">
            <NumInput value={p.thellesia} onChange={set('thellesia')} min={1} step={0.5} />
          </CalcField>
          <CalcField label="Numri i fijeve vertikale">
            <NumInput value={p.numriFijeveVertikale} onChange={set('numriFijeveVertikale')} min={4} step={1} />
          </CalcField>
          <CalcField label="Diametri i fijeve" unit="mm">
            <NumInput value={p.diametriFijeve} onChange={set('diametriFijeve')} min={8} step={1} />
          </CalcField>
          <CalcField label="Diametri i spirales" unit="mm">
            <NumInput value={p.diametriSpirales} onChange={set('diametriSpirales')} min={6} step={1} />
          </CalcField>
          <CalcField label="Distanca e spirales" unit="cm">
            <NumInput value={p.distancaSpirales} onChange={set('distancaSpirales')} min={5} step={1} />
          </CalcField>
        </>
      }
      sim={
        <ArmaturaSimulim3D
          diametriPilotesMM={p.diametriPilotes || 0}
          numriFijeveVertikale={p.numriFijeveVertikale || 0}
          diametriFijeveMM={p.diametriFijeve || 0}
          diametriSpiralesMM={p.diametriSpirales || 0}
        />
      }
      results={
        <>
          <Result
            primary
            label="Pesha totale e hekurit"
            value={r.peshaTotale}
            unit="kg"
            note={`Raporti hekur/beton: ${Number.isFinite(r.raporti) ? r.raporti : '—'} kg/m³`}
          />
          <div className="grid grid-cols-2 gap-x-6">
            <Result label="Fijet vertikale" value={r.peshaFijeve} unit="kg" />
            <Result label="Spiralja" value={r.peshaSpirales} unit="kg" note={`Gjatësia: ${Number.isFinite(r.gjatesiaSpirales) ? r.gjatesiaSpirales : '—'} m`} />
          </div>
        </>
      }
    />
  )
}
