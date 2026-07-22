'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { FaTimes } from 'react-icons/fa'
import GalleryViewer from './GalleryViewer'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function GalleryViewerModal({ isOpen, onClose }: ModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[9999] overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen">
        <div className="fixed inset-0 bg-black/90" onClick={onClose} />
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="relative w-full h-full"
        >
          <GalleryViewer onClose={onClose} />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 bg-white/10 rounded-full hover:bg-white/20 transition"
            aria-label="Mbyll galerinë"
          >
            <FaTimes className="text-white text-2xl" />
          </button>
        </motion.div>
      </div>
    </div>
  )
}