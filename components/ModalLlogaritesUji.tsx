'use client'

import { FaWater } from 'react-icons/fa'
import Modal from './ui/Modal'
import LlogaritesUji from './LlogaritesUji'

type ModalProps = { isOpen: boolean; onClose: () => void }

/** I njëjti llogaritës si në ballinë, i hapur në dritare (nga menuja "Mjete"). */
export default function ModalLlogaritesUji({ isOpen, onClose }: ModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Llogaritësi i Vëllimit të Ujit në Pus" icon={<FaWater />} size="xl">
      <LlogaritesUji />
    </Modal>
  )
}
