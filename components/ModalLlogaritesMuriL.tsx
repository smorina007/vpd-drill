'use client'

import { FaLayerGroup } from 'react-icons/fa'
import Modal from './ui/Modal'
import LlogaritesMuriL from './LlogaritesMuriL'

type ModalProps = { isOpen: boolean; onClose: () => void }

/** I njëjti llogaritës si në ballinë, i hapur në dritare (nga menuja "Mjete"). */
export default function ModalLlogaritesMuriL({ isOpen, onClose }: ModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Llogaritësi i Murit L" icon={<FaLayerGroup />} size="xl">
      <LlogaritesMuriL />
    </Modal>
  )
}
