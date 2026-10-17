'use client'

import { FaImages } from 'react-icons/fa'
import Modal from './ui/Modal'
import GalleryViewer from './GalleryViewer'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function GalleryViewerModal({ isOpen, onClose }: ModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Galeria e Projekteve" icon={<FaImages />} size="xl">
      <GalleryViewer />
    </Modal>
  )
}
