'use client'

import { FaFileAlt } from 'react-icons/fa'
import Modal from './ui/Modal'
import OfertaForm from './OfertaForm'

type ModalProps = { isOpen: boolean; onClose: () => void }

export default function ModalOferte({ isOpen, onClose }: ModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Kërko Ofertë" icon={<FaFileAlt />} size="lg">
      <OfertaForm burimi="oferte_modal" compact />
    </Modal>
  )
}
