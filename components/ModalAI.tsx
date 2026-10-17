'use client'

import { FaRobot } from 'react-icons/fa'
import Modal from './ui/Modal'
import AIChat from './AIChat'

type ModalProps = { isOpen: boolean; onClose: () => void }

export default function ModalAI({ isOpen, onClose }: ModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Asistenti AI" icon={<FaRobot />} size="lg">
      <AIChat
        height="h-[44svh] sm:h-[22rem]"
        pershendetja="Përshëndetje! 👋 Pyesni për shpimin, pilotat, diafragmën, CFA, thellësinë, pagesën, ose si të na gjeni."
      />
    </Modal>
  )
}
