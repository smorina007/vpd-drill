'use client'

import { createContext, ReactNode, useCallback, useContext, useState } from 'react'
import dynamic from 'next/dynamic'

// Modalet ngarkohen vetëm kur hapen — kodi i tyre s'rëndon ngarkimin e parë të faqes.
const ModalLlogaritesMuriL = dynamic(() => import('@/components/ModalLlogaritesMuriL'))
const ModalLlogaritesPilota = dynamic(() => import('@/components/ModalLlogaritesPilota'))
const ModalLlogaritesKonstruksion = dynamic(() => import('@/components/ModalLlogaritesKonstruksion'))
const ModalLlogaritesUji = dynamic(() => import('@/components/ModalLlogaritesUji'))
const ModalAI = dynamic(() => import('@/components/ModalAI'))
const ModalVleresime = dynamic(() => import('@/components/ModalVleresime'))
const GalleryViewerModal = dynamic(() => import('@/components/GalleryViewerModal'))
const ModalNaGjeni = dynamic(() => import('@/components/ModalNaGjeni'))
const ModalParashikimiMotit = dynamic(() => import('@/components/ModalParashikimiMotit'))

export type Mjet = 'muriL' | 'pilota' | 'konstruksion' | 'uji' | 'ai' | 'vleresime' | 'galeria' | 'naGjeni' | 'moti'

type Ctx = { hap: (m: Mjet) => void; mbyll: () => void; aktiv: Mjet | null }

const MjeteContext = createContext<Ctx | undefined>(undefined)

/**
 * Një vend i vetëm për të gjitha "mjetet" (llogaritësit, AI, moti, galeria…).
 * Më parë çdo komponent (Header, butoni AI) kishte kopjet e veta të modaleve.
 */
export function MjeteProvider({ children }: { children: ReactNode }) {
  const [aktiv, setAktiv] = useState<Mjet | null>(null)
  const [hapur, setHapur] = useState<Set<Mjet>>(new Set())

  const hap = useCallback((m: Mjet) => {
    setHapur((s) => (s.has(m) ? s : new Set(s).add(m)))
    setAktiv(m)
  }, [])
  const mbyll = useCallback(() => setAktiv(null), [])

  const p = (m: Mjet) => ({ isOpen: aktiv === m, onClose: mbyll })

  return (
    <MjeteContext.Provider value={{ hap, mbyll, aktiv }}>
      {children}
      {hapur.has('muriL') && <ModalLlogaritesMuriL {...p('muriL')} />}
      {hapur.has('pilota') && <ModalLlogaritesPilota {...p('pilota')} />}
      {hapur.has('konstruksion') && <ModalLlogaritesKonstruksion {...p('konstruksion')} />}
      {hapur.has('uji') && <ModalLlogaritesUji {...p('uji')} />}
      {hapur.has('ai') && <ModalAI {...p('ai')} />}
      {hapur.has('vleresime') && <ModalVleresime {...p('vleresime')} />}
      {hapur.has('galeria') && <GalleryViewerModal {...p('galeria')} />}
      {hapur.has('naGjeni') && <ModalNaGjeni {...p('naGjeni')} />}
      {hapur.has('moti') && <ModalParashikimiMotit {...p('moti')} />}
    </MjeteContext.Provider>
  )
}

export function useMjete() {
  const c = useContext(MjeteContext)
  if (!c) throw new Error('useMjete must be used within a MjeteProvider')
  return c
}
