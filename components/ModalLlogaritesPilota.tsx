'use client'

import { FaColumns } from 'react-icons/fa'
import Modal from './ui/Modal'
import LlogaritesPilota from './LlogaritesPilota'

type ModalProps = { isOpen: boolean; onClose: () => void }

/** I njëjti llogaritës si në ballinë, i hapur në dritare (nga menuja "Mjete"). */
export default function ModalLlogaritesPilota({ isOpen, onClose }: ModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Llogaritësi i Pilotave" icon={<FaColumns />} size="xl">
      <LlogaritesPilota />
    </Modal>
  )
}
