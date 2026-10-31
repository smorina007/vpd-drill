'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FaShareAlt, FaWhatsapp, FaFacebookF, FaLinkedinIn, FaViber, FaLink, FaCheck } from 'react-icons/fa'
import { trackEvent } from '@/lib/gtag'

type Props = {
  url: string
  titulli: string
  /** 'light' për sfond të bardhë, 'dark' për brenda shikuesit në ekran të plotë */
  tema?: 'light' | 'dark'
  /** Shfaq edhe tekstin "Shpërndaj" pranë ikonës */
  meTekst?: boolean
  /** Ku hapet menuja në raport me butonin */
  drejtimi?: 'lart' | 'poshte'
}

/**
 * Shpërndarja e një projekti/fotoje. Në celular hap menunë e telefonit (WhatsApp, Viber, Messenger…);
 * në kompjuter tregon WhatsApp, Facebook, LinkedIn, Viber dhe "Kopjo linkun".
 */
export default function Shperndaj({ url, titulli, tema = 'light', meTekst = false, drejtimi = 'lart' }: Props) {
  const [open, setOpen] = useState(false)
  const [kopjuar, setKopjuar] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onDown = (e: MouseEvent) => ref.current && !ref.current.contains(e.target as Node) && setOpen(false)
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && (e.stopPropagation(), setOpen(false))
    document.addEventListener('mousedown', onDown)
    window.addEventListener('keydown', onKey, true)
    return () => {
      document.removeEventListener('mousedown', onDown)
      window.removeEventListener('keydown', onKey, true)
    }
  }, [open])

  const teksti = `${titulli} — VPD DRILL`
  const u = encodeURIComponent(url)
  const rrjetet = [
    { k: 'whatsapp', label: 'WhatsApp', icon: FaWhatsapp, color: 'text-[#25D366]', href: `https://wa.me/?text=${encodeURIComponent(`${teksti}\n${url}`)}` },
    { k: 'facebook', label: 'Facebook', icon: FaFacebookF, color: 'text-[#1877F2]', href: `https://www.facebook.com/sharer/sharer.php?u=${u}` },
    { k: 'viber', label: 'Viber', icon: FaViber, color: 'text-[#7360F2]', href: `viber://forward?text=${encodeURIComponent(`${teksti} ${url}`)}` },
    { k: 'linkedin', label: 'LinkedIn', icon: FaLinkedinIn, color: 'text-[#0A66C2]', href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}` },
  ]

  const kliko = async (e: React.MouseEvent) => {
    e.stopPropagation()
    // Celular: menuja vendase e telefonit
    if (typeof navigator !== 'undefined' && navigator.share && window.matchMedia('(pointer: coarse)').matches) {
      try {
        await navigator.share({ title: teksti, url })
        trackEvent('share', { method: 'native', content: url })
      } catch {}
      return
    }
    setOpen((v) => !v)
  }

  const kopjo = async () => {
    try {
      await navigator.clipboard.writeText(url)
    } catch {
      const t = document.createElement('textarea')
      t.value = url
      document.body.appendChild(t)
      t.select()
      document.execCommand('copy')
      t.remove()
    }
    trackEvent('share', { method: 'copy', content: url })
    setKopjuar(true)
    setTimeout(() => {
      setKopjuar(false)
      setOpen(false)
    }, 1400)
  }

  const btnCls =
    tema === 'dark'
      ? 'text-white hover:bg-white/10'
      : 'text-slate-mute hover:bg-stone hover:text-brand'

  return (
    <div ref={ref} className="relative" onClick={(e) => e.stopPropagation()}>
      <button
        type="button"
        onClick={kliko}
        aria-haspopup="true"
        aria-expanded={open}
        aria-label={`Shpërndaj: ${titulli}`}
        className={`flex items-center gap-2 rounded-md text-sm font-semibold transition-colors ${meTekst ? 'h-11 px-3' : 'h-9 w-9 justify-center'} ${btnCls}`}
      >
        <FaShareAlt className={meTekst ? 'text-base' : 'text-[13px]'} />
        {meTekst && <span>Shpërndaj</span>}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: drejtimi === 'lart' ? 6 : -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: drejtimi === 'lart' ? 6 : -6, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className={`absolute right-0 z-[95] w-52 rounded-xl bg-white p-1.5 text-bedrock shadow-[0_24px_60px_-20px_rgba(14,42,48,0.5)] ring-1 ring-stone-line ${
              drejtimi === 'lart' ? 'bottom-full mb-2' : 'top-full mt-2'
            }`}
            role="menu"
          >
            {rrjetet.map((r) => (
              <a
                key={r.k}
                href={r.href}
                target="_blank"
                rel="noopener noreferrer"
                role="menuitem"
                onClick={() => {
                  trackEvent('share', { method: r.k, content: url })
                  setOpen(false)
                }}
                className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-semibold transition-colors hover:bg-stone"
              >
                <r.icon className={`text-base ${r.color}`} />
                {r.label}
              </a>
            ))}
            <div className="my-1 h-px bg-stone-line" />
            <button
              type="button"
              role="menuitem"
              onClick={kopjo}
              className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-sm font-semibold transition-colors hover:bg-stone"
            >
              {kopjuar ? <FaCheck className="text-base text-brand" /> : <FaLink className="text-base text-slate-mute" />}
              {kopjuar ? 'U kopjua!' : 'Kopjo linkun'}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
