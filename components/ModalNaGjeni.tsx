'use client'

import { FaMapMarkerAlt, FaDirections, FaPhoneAlt } from 'react-icons/fa'
import Modal from './ui/Modal'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
}

const ADRESA = 'Fsh Dragobil, 24000 Malishevë, Kosovë'
const MAPS_EMBED_SRC = `https://www.google.com/maps?q=${encodeURIComponent(ADRESA)}&output=embed`
const MAPS_DIRECTIONS = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(ADRESA)}`

export default function ModalNaGjeni({ isOpen, onClose }: ModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Si të na gjeni" icon={<FaMapMarkerAlt />} size="lg" flush>
      <div className="relative h-64 w-full bg-stone-2 sm:h-80">
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
      <div className="grid gap-5 p-5 sm:grid-cols-[1fr_1fr_auto] sm:items-end sm:p-6">
        <div>
          <p className="text-xs font-semibold text-slate-mute">Adresa</p>
          <p className="mt-1 font-semibold text-bedrock">{ADRESA}</p>
        </div>
        <div>
          <p className="text-xs font-semibold text-slate-mute">Telefoni</p>
          <p className="mt-1 space-x-3 font-semibold tabular text-bedrock">
            <a href="tel:+38344184114" className="hover:text-brand">044 184 114</a>
            <a href="tel:+38344204877" className="hover:text-brand">044 204 877</a>
          </p>
        </div>
        <a href={MAPS_DIRECTIONS} target="_blank" rel="noopener noreferrer" className="btn-brand">
          <FaDirections /> Merr Udhëzime (Google Maps)
        </a>
      </div>
    </Modal>
  )
}
