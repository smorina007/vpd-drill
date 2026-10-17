import { ReactNode } from 'react'

/** Elementet e përbashkëta të llogaritësve (fushë, rezultat, paraqitje). */

export function CalcField({
  label,
  unit,
  hint,
  children,
}: {
  label: string
  unit?: string
  hint?: string
  children: ReactNode
}) {
  return (
    <label className="block">
      <span className="field-label flex items-baseline justify-between gap-2">
        <span>{label}</span>
        {unit && <span className="text-[11px] font-medium text-slate-mute">{unit}</span>}
      </span>
      {children}
      {hint && <span className="mt-1 block text-[11px] text-slate-mute">{hint}</span>}
    </label>
  )
}

export function NumInput({
  value,
  onChange,
  min,
  max,
  step,
}: {
  value: number
  onChange: (v: number) => void
  min?: number
  max?: number
  step?: number
}) {
  return (
    <input
      type="number"
      inputMode="decimal"
      className="field tabular"
      value={Number.isFinite(value) ? value : ''}
      min={min}
      max={max}
      step={step}
      onChange={(e) => {
        const v = parseFloat(e.target.value)
        onChange(Number.isFinite(v) ? v : NaN)
      }}
    />
  )
}

export function Result({
  label,
  value,
  unit,
  note,
  primary,
}: {
  label: string
  value: number | string
  unit: string
  note?: string
  primary?: boolean
}) {
  const shfaq = typeof value === 'number' ? (Number.isFinite(value) ? String(value) : '—') : value
  return (
    <div className={`border-t py-3.5 ${primary ? 'border-bedrock' : 'border-stone-line'}`}>
      <p className="text-[13px] text-slate-mute">{label}</p>
      <p className={`mt-0.5 font-bold tabular text-bedrock ${primary ? 'text-3xl font-wide' : 'text-xl'}`}>
        {shfaq}
        <span className="ml-1.5 text-sm font-semibold text-slate-mute">{unit}</span>
      </p>
      {note && <p className="mt-0.5 text-xs text-slate-mute">{note}</p>}
    </div>
  )
}

/**
 * Paraqitja e një llogaritësi: majtas fushat + simulimi, djathtas rezultatet
 * (të cilat llogariten menjëherë ndërsa ndryshojnë vlerat).
 */
export function CalcLayout({
  intro,
  fields,
  sim,
  results,
  footnote,
}: {
  intro?: ReactNode
  fields: ReactNode
  sim?: ReactNode
  results: ReactNode
  footnote?: ReactNode
}) {
  return (
    <div className="grid gap-8 lg:grid-cols-[1.15fr_1fr] lg:gap-12">
      <div>
        {intro && <div className="mb-6 text-sm leading-relaxed text-slate-ink">{intro}</div>}
        <div className="grid gap-4 sm:grid-cols-2">{fields}</div>
        {sim && <div className="mt-6 rounded-lg border border-stone-line bg-stone/70 py-5 [&_svg]:max-h-[280px]">{sim}</div>}
      </div>
      <div className="lg:sticky lg:top-[calc(var(--header-h)+24px)] lg:self-start">
        <div className="rounded-lg bg-white p-5 ring-1 ring-stone-line sm:p-6">
          <p className="mb-1 text-sm font-semibold text-brand">Rezultati</p>
          {results}
          {footnote && <div className="mt-4 text-xs leading-relaxed text-slate-mute">{footnote}</div>}
        </div>
      </div>
    </div>
  )
}

export const r2 = (v: number) => (Number.isFinite(v) ? Number(v.toFixed(2)) : NaN)
