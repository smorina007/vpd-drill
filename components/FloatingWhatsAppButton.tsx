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
      className="fixed bottom-24 sm:bottom-28 right-4 sm:right-6 z-50 w-12 h-12 sm:w-14 sm:h-14 bg-[#25D366] rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 flex items-center justify-center group"
    >
      <FaWhatsapp className="text-white text-2xl sm:text-3xl" />
      <span className="absolute right-full mr-3 bg-gray-900 text-white text-xs font-medium px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        Shkruani në WhatsApp
      </span>
    </a>
  )
}
