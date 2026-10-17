'use client'

import { FaFileAlt } from 'react-icons/fa'
import Modal from './ui/Modal'
import OfertaForm, { OfertaPrefill } from './OfertaForm'

type ModalProps = { isOpen: boolean; onClose: () => void; prefill?: OfertaPrefill; hapja?: number }

export default function ModalOferte({ isOpen, onClose, prefill, hapja = 0 }: ModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Kërko Ofertë" icon={<FaFileAlt />} size="lg">
      {/* key: formulari rifillon me të dhënat e reja sa herë hapet me prefill */}
      <OfertaForm key={hapja} burimi="oferte_modal" compact prefill={prefill} />
    </Modal>
  )
}
