'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const [isClient, setIsClient] = useState(false)
  const [audioEnabled, setAudioEnabled] = useState(false)
  const [audioPlaying, setAudioPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    setIsClient(true)
    
    if (typeof window !== 'undefined' && !audioRef.current) {
      audioRef.current = new Audio('/sounds/impact.mp3')
      audioRef.current.volume = 0.3
      audioRef.current.loop = true
    }

    document.body.style.overflow = 'hidden'
    
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + Math.floor(Math.random() * 4) + 1
        if (newProgress >= 100) {
          clearInterval(interval)
          return 100
        }
        return newProgress
      })
    }, 70)

    const timer = setTimeout(() => {
      setIsLoading(false)
      document.body.style.overflow = 'auto'
      
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.currentTime = 0
        setAudioPlaying(false)
      }
    }, 6200)

    return () => {
      clearInterval(interval)
      clearTimeout(timer)
      document.body.style.overflow = 'auto'
      if (audioRef.current) {
        audioRef.current.pause()
      }
    }
  }, [])

  const toggleAudio = () => {
    if (!audioRef.current) return
    
    if (audioPlaying) {
      audioRef.current.pause()
      setAudioPlaying(false)
    } else {
      audioRef.current.play()
        .then(() => {
          setAudioPlaying(true)
          setAudioEnabled(true)
        })
        .catch(err => console.log('Audio play error:', err))
    }
  }

  if (!isClient) return null

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          key="loading"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
          style={{
            background: 'radial-gradient(circle at 30% 30%, #1a3a4a, #0a1f2a)',
          }}
        >
          {/* BACKGROUND EFFECT - GRIMCA PLASËSE (50 grimca) - origjinale */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(50)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
                initial={{
                  x: Math.random() * 100 + '%',
                  y: Math.random() * 100 + '%',
                  scale: 0,
                }}
                animate={{
                  x: Math.random() * 100 + '%',
                  y: Math.random() * 100 + '%',
                  scale: [0, 2, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>

          {/* EFEKTI: RRUFE QË KALOJNË (5 rrufe) - origjinale */}
          <div className="absolute inset-0 opacity-30 pointer-events-none">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={`lightning-${i}`}
                className="absolute w-1 h-32 bg-gradient-to-b from-transparent via-blue-400 to-transparent"
                style={{
                  left: `${10 + i * 20}%`,
                  top: '-20%',
                  filter: 'blur(4px)',
                }}
                animate={{
                  y: ['0vh', '120vh'],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 1.5 + i * 0.5,
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: "linear",
                }}
              />
            ))}
          </div>

          {/* EFEKTI: VORTEKS RROTULLUES (3 unaza) - origjinale */}
          <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
            <motion.div
              className="w-[800px] h-[800px] rounded-full border-4 border-blue-500/20"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute w-[600px] h-[600px] rounded-full border-2 border-cyan-400/30"
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute w-[400px] h-[400px] rounded-full border border-white/20"
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            />
          </div>

          {/* Butoni i zërit - origjinal */}
          {!audioEnabled && (
            <motion.button
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              onClick={toggleAudio}
              className="absolute top-4 right-4 z-30 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold transition border border-white/30 flex items-center gap-2"
            >
              <span>🔊</span> Aktivizo zërin
            </motion.button>
          )}

          {/* Treguesi i zërit aktiv - origjinal */}
          {audioPlaying && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute top-4 right-4 z-30 bg-green-500/20 text-green-300 px-4 py-2 rounded-full text-xs flex items-center gap-2 border border-green-500/30"
            >
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              Zëri aktiv
            </motion.div>
          )}

          {/* PJESA QENDRORE - LOGOJA KRYESORE (origjinale) */}
          <div className="relative z-20 text-center px-4">
            {/* LOGOJA ME UNZA RROTULLUESE - origjinale */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 1.2, type: "spring", stiffness: 80 }}
              className="relative w-80 h-80 mx-auto mb-8"
            >
              {/* Unaza rreth logos - origjinale */}
              <motion.div
                className="absolute -inset-4 rounded-full border-4 border-blue-400/40 border-t-blue-300"
                animate={{ rotate: 360 }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute -inset-8 rounded-full border-2 border-cyan-300/30 border-b-cyan-300"
                animate={{ rotate: -360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              />

              {/* Logoja kryesore - origjinale */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Image
                  src="/images/logo1.png"
                  alt="VPD DRILL Logo"
                  width={280}
                  height={280}
                  className="object-contain drop-shadow-2xl"
                  priority
                />
              </motion.div>

              {/* Grimca orbitale (12 grimca) - origjinale */}
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-blue-300/60 rounded-full"
                  style={{
                    left: '50%',
                    top: '50%',
                  }}
                  animate={{
                    x: [0, Math.cos(i * 30 * Math.PI / 180) * 140],
                    y: [0, Math.sin(i * 30 * Math.PI / 180) * 140],
                    opacity: [1, 0],
                    scale: [1, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.1,
                  }}
                />
              ))}
            </motion.div>

            {/* Teksti kryesor - origjinal */}
            <motion.h1
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-7xl md:text-8xl font-black text-white mb-2 tracking-tight"
              style={{ textShadow: '0 0 30px #256D7B, 0 0 60px #00aaff' }}
            >
              VPD
            </motion.h1>

            <motion.h2
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="text-4xl md:text-5xl font-bold text-white mb-4"
              style={{ textShadow: '0 0 20px rgba(0,200,255,0.7)' }}
            >
              DRILL
            </motion.h2>

            {/* Slogani - origjinal */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.1 }}
              className="text-white/80 text-xl md:text-2xl mb-8 font-light tracking-wider"
            >
              Duke shpuar thellësitë e tokës
            </motion.p>

            {/* Loading bar - origjinal */}
            <div className="relative w-96 max-w-[90vw] mx-auto mb-4">
              <div className="w-full h-4 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm border border-white/20">
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  className="h-full bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-400 rounded-full"
                  style={{ boxShadow: '0 0 20px #4af0ff' }}
                />
              </div>
              
              {/* Përqindja e shfaqur - origjinale */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute -top-8 right-0 text-white/80 text-sm font-mono"
              >
                {progress}%
              </motion.div>
            </div>

            {/* Teksti pulsues - origjinal */}
            <motion.div
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="flex items-center justify-center space-x-2 mt-6"
            >
              <span className="w-2 h-2 bg-blue-300 rounded-full" />
              <span className="text-white/50 text-xs uppercase tracking-[0.2em]">
                DUKE NGARKUAR SISTEMET
              </span>
              <span className="w-2 h-2 bg-blue-300 rounded-full" />
            </motion.div>
          </div>

          {/* FUNDI I EKRANIT ME STATISTIKA - origjinale */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 0.6, y: 0 }}
            transition={{ duration: 1, delay: 2 }}
            className="absolute bottom-6 left-0 right-0 text-center text-white/40 text-sm"
          >
            <div className="flex justify-center space-x-6">
              <span>⚡ 500m -Teren i fortë</span>
              <span className="text-blue-300">◆</span>
              <span>💧 55m -Teren i but</span>
              <span className="text-blue-300">◆</span>
              <span>⛰️ 10+ MAKINERI</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}