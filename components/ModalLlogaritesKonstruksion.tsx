'use client'

import { FaDraftingCompass } from 'react-icons/fa'
import Modal from './ui/Modal'
import LlogaritesKonstruksionPilote from './LlogaritesKonstruksionPilote'

type ModalProps = { isOpen: boolean; onClose: () => void }

/** I njëjti llogaritës si në ballinë, i hapur në dritare (nga menuja "Mjete"). */
export default function ModalLlogaritesKonstruksion({ isOpen, onClose }: ModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Llogaritësi i Konstruksionit të Pilotave" icon={<FaDraftingCompass />} size="xl">
      <LlogaritesKonstruksionPilote />
    </Modal>
  )
}
