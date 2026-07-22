'use client'

import { useState, useEffect } from 'react'
import { FaRobot, FaTimes, FaCommentDots } from 'react-icons/fa'
import ModalAI from './ModalAI'

export default function FloatingAIButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [showTooltip, setShowTooltip] = useState(true)

  // Fshije tooltip-in pas 5 sekondash
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(false)
    }, 5000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <ModalAI isOpen={isOpen} onClose={() => setIsOpen(false)} />

      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end">
        {/* Tooltip - Përshtatur për mobile */}
        {showTooltip && !isOpen && (
          <div className="mb-2 bg-white text-gray-800 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg shadow-lg border border-[#256D7B]/20 animate-bounce max-w-[200px] sm:max-w-none">
            <p className="text-xs sm:text-sm font-medium">Pyet Asistentin AI! 🤖</p>
            <div className="absolute bottom-0 right-4 transform translate-y-1/2 rotate-45 w-2 h-2 sm:w-3 sm:h-3 bg-white border-r border-b border-[#256D7B]/20"></div>
          </div>
        )}

        {/* AI Button with Animation - Optimizuar për touch */}
        <button
          onClick={() => setIsOpen(true)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={() => setIsHovered(true)} // Për mobile
          onTouchEnd={() => setIsHovered(false)}  // Për mobile
          className="relative group touch-manipulation"
          aria-label="Asistenti AI"
        >
          {/* Ripple Effect - Reduktuar për performancë */}
          <span className="absolute inset-0 rounded-full bg-[#256D7B] opacity-20 animate-ping"></span>
          
          {/* Main Button - Madhësi e përshtatur */}
          <div className={`
            relative flex items-center justify-center
            w-14 h-14 sm:w-16 sm:h-16 rounded-full
            bg-gradient-to-r from-[#256D7B] to-[#1a4f5a]
            text-white text-xl sm:text-2xl
            shadow-lg cursor-pointer
            transition-all duration-300 ease-in-out
            ${isHovered ? 'scale-110 shadow-xl' : 'scale-100'}
            ${isOpen ? 'rotate-90' : 'rotate-0'}
            active:scale-95 /* Efekt kur shtypet në mobile */
            touch-action: manipulation
            select-none
          `}>
            {/* Icon with animation - Thjeshtuar për mobile */}
            <div className={`
              transition-all duration-300
              ${isHovered ? 'scale-110' : 'scale-100'}
            `}>
              {isOpen ? <FaTimes /> : <FaRobot />}
            </div>

            {/* Pulse Dots - Më të vegjël në mobile */}
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5 sm:h-3 sm:w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 sm:h-3 sm:w-3 bg-green-500"></span>
            </span>
          </div>

          {/* Floating Messages - Pozicion i rregulluar */}
          <div className={`
            absolute bottom-full right-0 mb-2 sm:mb-3
            transition-all duration-300
            ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'}
            hidden sm:block /* Fshihet në mobile për të kursyer hapësirë */
          `}>
            <div className="bg-white text-[#256D7B] px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg shadow-lg whitespace-nowrap border border-[#256D7B]/20">
              <FaCommentDots className="inline mr-1 text-sm" />
              <span className="text-xs sm:text-sm font-medium">Kliko për ndihmë!</span>
            </div>
          </div>
        </button>

        {/* Quick Action Buttons - Opsionale për mobile */}
        <div className={`
          flex flex-col gap-2 mt-2
          transition-all duration-300
          ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 pointer-events-none'}
        `}>
          <button 
            onClick={() => setIsOpen(true)}
            className="bg-white text-[#256D7B] px-3 py-2 rounded-full text-xs shadow hover:bg-[#256D7B] hover:text-white transition touch-manipulation min-w-[100px] sm:hidden"
          >
            Pyet shpejt
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); } /* Më pak lëvizje në mobile */
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        /* Çaktivizo animacionin nëse përdoruesi preferon më pak lëvizje */
        @media (prefers-reduced-motion: reduce) {
          .animate-float {
            animation: none;
          }
        }
        
        /* Përmirësime për touch */
        .touch-manipulation {
          touch-action: manipulation;
          -webkit-tap-highlight-color: transparent;
        }
      `}</style>
    </>
  )
}