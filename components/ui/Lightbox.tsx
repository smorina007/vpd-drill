'use client'

import { ReactNode, useEffect } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import { FaChevronLeft, FaChevronRight, FaTimes } from 'react-icons/fa'

export type LightboxItem = { src: string; title: string; meta?: ReactNode }

type Props = {
  items: LightboxItem[]
  index: number | null
  onClose: () => void
  onIndex: (i: number) => void
}

/** Shikuesi i fotove në ekran të plotë — Esc mbyll, shigjetat ← → ndërrojnë foton. */
export default function Lightbox({ items, index, onClose, onIndex }: Props) {
  const open = index !== null && index >= 0 && index < items.length
  const item = open ? items[index!] : null

  useEffect(() => {
    if (!open) return
    const prev = () => onIndex((index! - 1 + items.length) % items.length)
    const next = () => onIndex((index! + 1) % items.length)
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, index, items.length, onClose, onIndex])

  return (
    <AnimatePresence>
      {open && item && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={item.title}
          className="fixed inset-0 z-[90] flex flex-col bg-bedrock/95 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex items-center justify-between px-4 py-3 text-white sm:px-6">
            <span className="text-sm font-semibold tabular text-white/70">
              {index! + 1} / {items.length}
            </span>
            <button
              type="button"
              onClick={onClose}
              aria-label="Mbyll"
              className="grid h-11 w-11 place-items-center rounded-md text-xl hover:bg-white/10"
            >
              <FaTimes />
            </button>
          </div>

          <div className="relative flex-1" onClick={onClose}>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={item.src + index}
                initial={{ opacity: 0, scale: 0.985 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 px-4 sm:px-20"
              >
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  sizes="100vw"
                  className="object-contain"
                  onClick={(e) => e.stopPropagation()}
                />
              </motion.div>
            </AnimatePresence>

            {items.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    onIndex((index! - 1 + items.length) % items.length)
                  }}
                  aria-label="Foto e mëparshme"
                  className="absolute left-2 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white backdrop-blur transition-colors hover:bg-white/20 sm:left-5"
                >
                  <FaChevronLeft />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    onIndex((index! + 1) % items.length)
                  }}
                  aria-label="Foto tjetër"
                  className="absolute right-2 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white backdrop-blur transition-colors hover:bg-white/20 sm:right-5"
                >
                  <FaChevronRight />
                </button>
              </>
            )}
          </div>

          <div className="px-4 pb-6 pt-4 text-center text-white sm:px-6">
            <p className="font-semibold">{item.title}</p>
            {item.meta && <div className="mt-1 text-sm text-white/60">{item.meta}</div>}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
