'use client'

import { createContext, useContext, useState, ReactNode, useCallback } from 'react'
import ModalOferte from '@/components/ModalOferte'
import type { OfertaPrefill } from '@/components/OfertaForm'

type OfertaContextType = {
  isOpen: boolean
  /** Hap formularin e ofertës; opsionalisht me fusha të plotësuara paraprakisht. */
  openOferta: (prefill?: OfertaPrefill | unknown) => void
  closeOferta: () => void
}

const OfertaContext = createContext<OfertaContextType | undefined>(undefined)

const eshtePrefill = (x: unknown): x is OfertaPrefill =>
  !!x && typeof x === 'object' && 'burim' in (x as Record<string, unknown>)

export function OfertaProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [prefill, setPrefill] = useState<OfertaPrefill | undefined>(undefined)
  const [hapja, setHapja] = useState(0)

  // openOferta përdoret edhe direkt si onClick, prandaj injorojmë eventin e klikimit
  const openOferta = useCallback((p?: OfertaPrefill | unknown) => {
    setPrefill(eshtePrefill(p) ? p : undefined)
    setHapja((n) => n + 1)
    setIsOpen(true)
  }, [])
  const closeOferta = useCallback(() => setIsOpen(false), [])

  return (
    <OfertaContext.Provider value={{ isOpen, openOferta, closeOferta }}>
      {children}
      <ModalOferte isOpen={isOpen} onClose={closeOferta} prefill={prefill} hapja={hapja} />
    </OfertaContext.Provider>
  )
}

export function useOferta() {
  const context = useContext(OfertaContext)
  if (context === undefined) {
    throw new Error('useOferta must be used within an OfertaProvider')
  }
  return context
}
