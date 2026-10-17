'use client'

import { FaWhatsapp } from 'react-icons/fa'
import { trackEvent } from '@/lib/gtag'

// Numri në format ndërkombëtar pa '+' apo '0' fillestare (kërkesë e wa.me)
const WHATSAPP_NUMBER = '38344184114'
const WHATSAPP_MESSAGE = 'Përshëndetje! Do të doja të pyesja për një shërbim.'

export default function FloatingWhatsAppButton() {
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackEvent('whatsapp_click')}
      aria-label="Na shkruani në WhatsApp"
      className="group fixed bottom-[88px] right-[22px] z-40 grid h-12 w-12 place-items-center rounded-full bg-[#25D366] text-2xl text-white shadow-[0_10px_30px_-8px_rgba(14,42,48,0.55)] transition-transform hover:scale-105 sm:bottom-[104px] sm:right-[30px]"
    >
      <FaWhatsapp />
      <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-md bg-bedrock px-3 py-1.5 text-xs font-semibold opacity-0 transition-opacity group-hover:opacity-100">
        Shkruani në WhatsApp
      </span>
    </a>
  )
}
