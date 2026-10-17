'use client'

import { ReactNode } from 'react'
import { useMjete, Mjet } from '@/app/context/MjeteContext'

/** Buton që hap një nga mjetet (p.sh. llogaritësin) — për faqe "server". */
export default function HapMjetButton({ mjet, className, children }: { mjet: Mjet; className?: string; children: ReactNode }) {
  const { hap } = useMjete()
  return (
    <button type="button" onClick={() => hap(mjet)} className={className}>
      {children}
    </button>
  )
}
