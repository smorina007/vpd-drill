'use client'

import { useState, useRef } from 'react'
import { 
  FaTimes, FaRobot, FaPaperPlane, FaSpinner, 
  FaWater, FaBuilding, FaAnchor, FaCube, 
  FaRuler, FaCalculator, FaInfo,
  FaPhone, FaEnvelope, FaMapMarkerAlt
} from 'react-icons/fa'
import { gjejPergjigje, sugjerimet as sugjerimetBaze } from '@/lib/aiKnowledge'

type ModalProps = {
  isOpen: boolean
  onClose: () => void
}

type Mesazh = {
  text: string
  isUser: boolean
  timestamp: Date
}

type Sugjerim = {
  text: string
  icon: React.ReactNode
  action: string
}

export default function ModalAI({ isOpen, onClose }: ModalProps) {
  const [pyetja, setPyetja] = useState('')
  const [mesazhet, setMesazhet] = useState<Mesazh[]>([
    { 
      text: "Përshëndetje! 👋 Pyesni për shpimin, pilotat, diafragmën, CFA, thellësinë, pagesën, ose si të na gjeni.",
      isUser: false,
      timestamp: new Date()
    }
  ])
  const [dukeTyp, setDukeTyp] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const dergoPyetjen = () => {
    if (!pyetja.trim()) return
    setMesazhet(prev => [...prev, { text: pyetja, isUser: true, timestamp: new Date() }])
    setPyetja('')
    setDukeTyp(true)
    setTimeout(() => {
      setMesazhet(prev => [...prev, { text: gjejPergjigje(pyetja), isUser: false, timestamp: new Date() }])
      setDukeTyp(false)
    }, 1000)
  }

  const handleSugjerimClick = (sugjerim: string) => {
    setPyetja(sugjerim)
    setTimeout(() => dergoPyetjen(), 100)
  }

  if (!isOpen) return null

  const ikonatSugjerimeve: Record<string, React.ReactNode> = {
    cfa: <FaCalculator />,
    thellesia: <FaRuler />,
    pilota: <FaBuilding />,
    diafragme: <FaCube />,
    lokacioni: <FaMapMarkerAlt />,
    pagesa: <FaInfo />,
    sherbime: <FaWater />,
  }
  const sugjerimet: Sugjerim[] = sugjerimetBaze.map((s) => ({
    text: s.text,
    action: s.action,
    icon: ikonatSugjerimeve[s.action] ?? <FaInfo />,
  }))

  return (
    <div className="fixed inset-0 z-[60] overflow-y-auto">
      <div className="flex items-end sm:items-center justify-center min-h-screen">
        <div className="fixed inset-0 bg-gray-900/75" onClick={onClose} />

        <div className="relative bg-white w-full sm:rounded-2xl sm:max-w-2xl sm:mx-4 rounded-t-2xl sm:my-8 max-h-[90vh] flex flex-col">
          {/* Header */}
          <div className="sticky top-0 bg-white border-b px-4 py-3 flex justify-between items-center">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-r from-[#256D7B] to-[#1a4f5a] rounded-xl flex items-center justify-center mr-3">
                <FaRobot className="text-white" />
              </div>
              <h3 className="font-bold">Asistenti AI</h3>
            </div>
            <button onClick={onClose}><FaTimes /></button>
          </div>

          {/* Përmbajtja kryesore */}
          <div className="flex-1 overflow-y-auto p-4">
            {/* Sugjerimet */}
            <div className="mb-4 flex flex-wrap gap-2">
              {sugjerimet.map((s, i) => (
                <button
                  key={i}
                  onClick={() => handleSugjerimClick(s.text)}
                  className="flex items-center px-3 py-2 bg-gray-100 rounded-full text-xs"
                >
                  <span className="mr-1 text-[#256D7B]">{s.icon}</span>
                  {s.text}
                </button>
              ))}
            </div>

            {/* Mesazhet */}
            <div className="space-y-4">
              {mesazhet.map((m, i) => (
                <div key={i} className={`flex ${m.isUser ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-xl ${
                    m.isUser ? 'bg-[#256D7B] text-white' : 'bg-gray-100'
                  }`}>
                    <p className="text-sm whitespace-pre-line">{m.text}</p>
                  </div>
                </div>
              ))}
              {dukeTyp && <FaSpinner className="animate-spin text-[#256D7B]" />}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input */}
          <div className="sticky bottom-0 bg-white border-t p-4">
            <div className="flex gap-2">
              <input
                value={pyetja}
                onChange={(e) => setPyetja(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && dergoPyetjen()}
                placeholder="Shkruani pyetjen..."
                className="flex-1 p-3 border rounded-xl text-sm"
              />
              <button onClick={dergoPyetjen} className="bg-[#256D7B] text-white px-4 rounded-xl">
                <FaPaperPlane />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}