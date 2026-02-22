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

      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
        {/* Tooltip */}
        {showTooltip && !isOpen && (
          <div className="mb-2 bg-white text-gray-800 px-4 py-2 rounded-lg shadow-lg border border-[#256D7B]/20 animate-bounce">
            <p className="text-sm font-medium">Pyet Asistentin AI! 🤖</p>
            <div className="absolute bottom-0 right-4 transform translate-y-1/2 rotate-45 w-3 h-3 bg-white border-r border-b border-[#256D7B]/20"></div>
          </div>
        )}

        {/* AI Button with Animation */}
        <button
          onClick={() => setIsOpen(true)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative group"
        >
          {/* Ripple Effect */}
          <span className="absolute inset-0 rounded-full bg-[#256D7B] opacity-20 animate-ping"></span>
          
          {/* Main Button */}
          <div className={`
            relative flex items-center justify-center
            w-16 h-16 rounded-full
            bg-gradient-to-r from-[#256D7B] to-[#1a4f5a]
            text-white text-2xl
            shadow-lg cursor-pointer
            transition-all duration-300 ease-in-out
            ${isHovered ? 'scale-110 shadow-xl' : 'scale-100'}
            ${isOpen ? 'rotate-90' : 'rotate-0'}
            hover:shadow-2xl
            animate-float
          `}>
            {/* Icon with animation */}
            <div className={`
              transition-all duration-500
              ${isHovered ? 'rotate-12 scale-110' : 'rotate-0 scale-100'}
            `}>
              {isOpen ? <FaTimes /> : <FaRobot />}
            </div>

            {/* Pulse Dots */}
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
          </div>

          {/* Floating Messages */}
          <div className={`
            absolute bottom-full right-0 mb-3
            transition-all duration-300
            ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}
          `}>
            <div className="bg-white text-[#256D7B] px-4 py-2 rounded-lg shadow-lg whitespace-nowrap border border-[#256D7B]/20">
              <FaCommentDots className="inline mr-1" />
              <span className="text-sm font-medium">Kliko për ndihmë!</span>
            </div>
          </div>
        </button>

        {/* Quick Action Buttons (optional) */}
        <div className={`
          flex flex-col gap-2 mt-2
          transition-all duration-300
          ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}
        `}>
          <button className="bg-white text-[#256D7B] px-3 py-1 rounded-full text-xs shadow hover:bg-[#256D7B] hover:text-white transition">
            Pyet shpejt
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </>
  )
}