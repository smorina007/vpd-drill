'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import ModalOferte from '@/components/ModalOferte'

type OfertaContextType = {
  isOpen: boolean
  openOferta: () => void
  closeOferta: () => void
}

const OfertaContext = createContext<OfertaContextType | undefined>(undefined)

export function OfertaProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  const openOferta = () => setIsOpen(true)
  const closeOferta = () => setIsOpen(false)

  return (
    <OfertaContext.Provider value={{ isOpen, openOferta, closeOferta }}>
      {children}
      <ModalOferte isOpen={isOpen} onClose={closeOferta} />
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