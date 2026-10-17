'use client'

import { ReactNode, useEffect, useId, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FaTimes } from 'react-icons/fa'

type ModalProps = {
  isOpen: boolean
  onClose: () => void
  title: ReactNode
  icon?: ReactNode
  children: ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl'
  /** Pa padding në trup (p.sh. për harta, chat) */
  flush?: boolean
  footer?: ReactNode
}

const SIZES = {
  sm: 'sm:max-w-md',
  md: 'sm:max-w-xl',
  lg: 'sm:max-w-3xl',
  xl: 'sm:max-w-5xl',
}

// Numërues global që disa modale njëkohësisht të mos e "lirojnë" scroll-in gabim
let openCount = 0
function lockScroll() {
  openCount++
  if (openCount === 1) {
    const sbw = window.innerWidth - document.documentElement.clientWidth
    document.body.style.overflow = 'hidden'
    if (sbw > 0) document.body.style.paddingRight = `${sbw}px`
  }
}
function unlockScroll() {
  openCount = Math.max(0, openCount - 1)
  if (openCount === 0) {
    document.body.style.overflow = ''
    document.body.style.paddingRight = ''
  }
}

/**
 * Modali i përbashkët: mbyllet me Esc ose klikim jashtë, bllokon scroll-in e faqes,
 * fokuson dritaren kur hapet dhe kthen fokusin te butoni që e hapi.
 * Në celular hapet si "sheet" nga poshtë.
 */
export default function Modal({ isOpen, onClose, title, icon, children, size = 'md', flush, footer }: ModalProps) {
  const titleId = useId()
  const panelRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef(onClose)
  closeRef.current = onClose

  useEffect(() => {
    if (!isOpen) return
    const previouslyFocused = document.activeElement as HTMLElement | null
    lockScroll()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeRef.current()
    }
    window.addEventListener('keydown', onKey)
    const t = window.setTimeout(() => panelRef.current?.focus(), 30)
    return () => {
      window.clearTimeout(t)
      window.removeEventListener('keydown', onKey)
      unlockScroll()
      previouslyFocused?.focus?.()
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center sm:p-6">
          <motion.div
            className="absolute inset-0 bg-bedrock/70 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            tabIndex={-1}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className={`relative flex max-h-[92svh] w-full flex-col overflow-hidden rounded-t-2xl bg-white shadow-[0_30px_80px_-20px_rgba(14,42,48,0.55)] outline-none sm:rounded-xl ${SIZES[size]}`}
          >
            <div className="flex items-center justify-between gap-4 border-b border-stone-line px-5 py-4 sm:px-6">
              <h2 id={titleId} className="flex items-center gap-2.5 text-lg font-bold sm:text-xl">
                {icon && <span className="text-brand">{icon}</span>}
                {title}
              </h2>
              <button
                type="button"
                onClick={onClose}
                aria-label="Mbyll"
                className="-mr-2 grid h-10 w-10 place-items-center rounded-md text-slate-mute transition-colors hover:bg-stone hover:text-bedrock"
              >
                <FaTimes />
              </button>
            </div>
            <div className={`flex-1 overflow-y-auto overscroll-contain ${flush ? '' : 'p-5 sm:p-6'}`}>{children}</div>
            {footer && <div className="border-t border-stone-line bg-stone/60 px-5 py-4 sm:px-6">{footer}</div>}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
