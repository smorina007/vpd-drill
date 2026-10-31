'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { FaWhatsapp, FaPhoneAlt, FaRobot, FaTimes, FaCommentDots } from 'react-icons/fa'
import { useMjete } from '@/app/context/MjeteContext'
import { gjuhaNgaPath, WHATSAPP } from '@/lib/gjuha'
import { trackEvent } from '@/lib/gtag'

const T = {
  sq: { kontakt: 'Na kontaktoni', wa: 'WhatsApp', tel: 'Telefononi', ai: 'Asistenti AI', mesazh: 'Përshëndetje! Do të doja të pyesja për një shërbim.' },
  de: { kontakt: 'Kontakt', wa: 'WhatsApp', tel: 'Anrufen', ai: 'KI-Assistent', mesazh: 'Hallo VPD DRILL, ich habe eine Frage.' },
  en: { kontakt: 'Contact us', wa: 'WhatsApp', tel: 'Call us', ai: 'AI assistant', mesazh: 'Hello VPD DRILL, I have a question.' },
}

/** Një buton i vetëm kontakti (në vend të tre butonave lundrues): WhatsApp, telefon, asistenti AI. */
export default function ButoniKontaktit() {
  const { hap } = useMjete()
  const gjuha = gjuhaNgaPath(usePathname())
  const t = T[gjuha]
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onDown = (e: MouseEvent) => ref.current && !ref.current.contains(e.target as Node) && setOpen(false)
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('mousedown', onDown)
    window.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDown)
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  const opsionet = [
    {
      key: 'wa',
      label: t.wa,
      icon: FaWhatsapp,
      cls: 'bg-[#25D366] text-white',
      href: `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(t.mesazh)}`,
      onClick: () => trackEvent('whatsapp_click', { location: 'fab' }),
    },
    {
      key: 'tel',
      label: t.tel,
      icon: FaPhoneAlt,
      cls: 'bg-white text-bedrock',
      href: 'tel:+38344184114',
      onClick: () => trackEvent('phone_click', { phone: '044184114', location: 'fab' }),
    },
    {
      key: 'ai',
      label: t.ai,
      icon: FaRobot,
      cls: 'bg-bedrock-3 text-glacier',
      onClick: () => {
        setOpen(false)
        hap('ai')
      },
    },
  ]

  return (
    <div ref={ref} className="fixed bottom-4 right-4 z-40 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      <AnimatePresence>
        {open &&
          opsionet.map((o, i) => {
            const inner = (
              <>
                <span className="rounded-md bg-bedrock px-3 py-1.5 text-sm font-semibold text-white shadow-lg">{o.label}</span>
                <span className={`grid h-12 w-12 place-items-center rounded-full text-xl shadow-lg ${o.cls}`}>
                  <o.icon />
                </span>
              </>
            )
            return (
              <motion.div
                key={o.key}
                initial={{ opacity: 0, y: 16, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.8 }}
                transition={{ duration: 0.2, delay: (opsionet.length - 1 - i) * 0.04 }}
              >
                {o.href ? (
                  <a
                    href={o.href}
                    target={o.key === 'wa' ? '_blank' : undefined}
                    rel={o.key === 'wa' ? 'noopener noreferrer' : undefined}
                    onClick={o.onClick}
                    className="flex items-center gap-3"
                  >
                    {inner}
                  </a>
                ) : (
                  <button type="button" onClick={o.onClick} className="flex items-center gap-3">
                    {inner}
                  </button>
                )}
              </motion.div>
            )
          })}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={t.kontakt}
        className="relative grid h-14 w-14 place-items-center rounded-full bg-signal text-xl text-bedrock shadow-[0_12px_30px_-8px_rgba(14,42,48,0.7)] transition-transform hover:scale-105 active:scale-95"
      >
        <motion.span animate={{ rotate: open ? 90 : 0 }} transition={{ duration: 0.2 }} className="grid place-items-center">
          {open ? <FaTimes /> : <FaCommentDots />}
        </motion.span>
        {!open && <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-signal/50 [animation-duration:2.8s]" />}
      </button>
    </div>
  )
}
