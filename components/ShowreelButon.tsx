'use client'

import { useState } from 'react'
import { FaPlay } from 'react-icons/fa'
import Lightbox from './ui/Lightbox'

/** Butoni "Shiko videon" me kopertinë të vogël që luan — hap videon në ekran të plotë. */
export default function ShowreelButon() {
  const [hapur, setHapur] = useState<number | null>(null)
  return (
    <>
      <button
        type="button"
        onClick={() => setHapur(0)}
        data-kursor="Luaj"
        className="group mt-8 inline-flex items-center gap-4 rounded-full bg-white/10 py-2 pl-2 pr-6 text-left ring-1 ring-white/20 backdrop-blur transition-colors hover:bg-white/15"
      >
        <span className="relative grid h-14 w-14 shrink-0 place-items-center overflow-hidden rounded-full">
          <video src="/videos/hero-reel.mp4" muted autoPlay loop playsInline preload="metadata" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover" />
          <span className="absolute inset-0 bg-black/35" />
          <FaPlay className="relative ml-0.5 text-sm text-white transition-transform group-hover:scale-125" />
        </span>
        <span>
          <span className="block text-sm font-bold text-white">Shiko videon nga kantieri</span>
          <span className="block text-xs text-white/60">Shpim · armaturë · betonim · ankerim</span>
        </span>
      </button>
      <Lightbox
        items={[{ src: '/videos/hero-reel.mp4', poster: '/videos/hero-reel.jpg', type: 'video', title: 'Nga kantieret e VPD DRILL', meta: 'Video reale nga punimet tona' }]}
        index={hapur}
        onClose={() => setHapur(null)}
        onIndex={setHapur}
      />
    </>
  )
}
