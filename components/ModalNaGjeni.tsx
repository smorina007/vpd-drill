'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { FaTimes, FaMapMarkerAlt, FaDirections, FaPhone } from 'react-icons/fa'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
}

const ADRESA = 'Fsh Dragobil, 24000 Malishevë, Kosovë'
const MAPS_EMBED_SRC = `https://www.google.com/maps?q=${encodeURIComponent(ADRESA)}&output=embed`
const MAPS_DIRECTIONS = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(ADRESA)}`

export default function ModalNaGjeni({ isOpen, onClose }: ModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] overflow-y-auto">
          <div className="flex items-end sm:items-center justify-center min-h-screen">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-gray-950/75 backdrop-blur-sm"
              onClick={onClose}
            />
            <motion.div
              initial={{ scale: 0.96, opacity: 0, y: 24 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.97, opacity: 0, y: 12 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="relative bg-white w-full sm:rounded-2xl sm:max-w-2xl sm:mx-4 rounded-t-2xl sm:my-8 max-h-[92vh] flex flex-col overflow-hidden"
            >
              {/* Header */}
              <div className="sticky top-0 bg-white border-b border-gray-100 px-5 py-4 flex justify-between items-center z-10">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
                  <FaMapMarkerAlt className="text-[#256D7B]" />
                  Si të na gjeni
                </h3>
                <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition">
                  <FaTimes className="text-xl text-gray-500" />
                </button>
              </div>

              {/* Harta */}
              <div className="relative w-full h-64 sm:h-80 bg-gray-100">
                <iframe
                  src={MAPS_EMBED_SRC}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Harta e lokacionit të VPD DRILL"
                />
              </div>

              {/* Informacioni */}
              <div className="p-5 sm:p-6 space-y-4">
                <div className="flex items-start gap-3">
                  <FaMapMarkerAlt className="text-[#256D7B] mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">Adresa</p>
                    <p className="text-gray-600 text-sm">{ADRESA}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FaPhone className="text-[#256D7B] mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">Telefoni</p>
                    <p className="text-gray-600 text-sm">044 184 114 · 044 204 877</p>
                  </div>
                </div>

                <a
                  href={MAPS_DIRECTIONS}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-gradient-to-r from-[#256D7B] to-[#1a4f5a] text-white px-6 py-3.5 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <FaDirections />
                  Merr Udhëzime (Google Maps)
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  )
}
