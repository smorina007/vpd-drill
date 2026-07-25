'use client'

import { useState, useRef, useEffect } from 'react'
import { 
  FaRobot, FaPaperPlane, FaSpinner, FaWater, FaRuler, FaCalculator,
  FaInfoCircle, FaPhone, FaEnvelope, FaMapMarkerAlt, FaBuilding,
  FaAnchor, FaCube, FaArrowDown
} from 'react-icons/fa'
import { gjejPergjigje, sugjerimet as sugjerimetBaze } from '@/lib/aiKnowledge'

type Mesazh = {
  text: string
  isUser: boolean
  timestamp: Date
}

type Sugjerim = {
  text: string
  icon: React.ReactNode
  action: string // Për të identifikuar llojin e pyetjes
}

export default function AIAsistent() {
  const [pyetja, setPyetja] = useState('')
  const [mesazhet, setMesazhet] = useState<Mesazh[]>([
    { 
      text: "Përshëndetje! 👋 Unë jam asistenti i VPD DRILL. Mund të më pyesni për:\n\n" +
            "🔹 **Çka është shpimi/pilota/diafragma/CFA** – shpjegime të thjeshta\n" +
            "🔹 **Thellësia** – sa thellë shkojmë në terrene të forta/të buta\n" +
            "🔹 **Çmimet dhe pagesa** – si funksionon\n" +
            "🔹 **Si na gjeni** – adresa, telefoni, orari\n" +
            "🔹 **Shërbimet dhe produktet** tona\n\n" +
            "Përdor sugjerimet e shpejta më poshtë ose shkruaj pyetjen tënde!",
      isUser: false,
      timestamp: new Date()
    }
  ])
  const [dukeTyp, setDukeTyp] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const [showScrollButton, setShowScrollButton] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const messagesContainerRef = useRef<HTMLDivElement>(null)

  // Kontrollo nëse përdoruesi është afër fundit për të vendosur nëse shfaqet butoni
  useEffect(() => {
    const container = messagesContainerRef.current
    if (!container) return

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container
      const distanceFromBottom = scrollHeight - scrollTop - clientHeight
      setShowScrollButton(distanceFromBottom > 100)
    }

    container.addEventListener('scroll', handleScroll)
    return () => container.removeEventListener('scroll', handleScroll)
  }, [])

  // Funksioni për të shkuar në fund (kur përdoruesi klikon butonin)
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  // Efekti për të bërë scroll automatik VETËM kur përdoruesi dërgon një pyetje dhe AI përgjigjet
  useEffect(() => {
    // Nëse mesazhi i fundit është nga AI dhe përdoruesi nuk ka lëvizur larg fundit, atëherë scroll
    const lastMessage = mesazhet[mesazhet.length - 1]
    if (lastMessage && !lastMessage.isUser) {
      const container = messagesContainerRef.current
      if (container) {
        const { scrollTop, scrollHeight, clientHeight } = container
        const distanceFromBottom = scrollHeight - scrollTop - clientHeight
        if (distanceFromBottom < 200) {
          messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
        }
      }
    }
  }, [mesazhet])

  const dergoPyetjen = () => {
    if (!pyetja.trim()) return

    setMesazhet(prev => [...prev, { 
      text: pyetja, 
      isUser: true,
      timestamp: new Date()
    }])
    setPyetja('')
    setDukeTyp(true)

    setTimeout(() => {
      const pergjigja = gjejPergjigje(pyetja)
      setMesazhet(prev => [...prev, { 
        text: pergjigja, 
        isUser: false,
        timestamp: new Date()
      }])
      setDukeTyp(false)
    }, 1500)
  }

  const handleSugjerimClick = (sugjerim: Sugjerim) => {
    setPyetja(sugjerim.text)
    // Ose mund të dërgojë direkt pyetjen
    setTimeout(() => dergoPyetjen(), 100)
  }

  useEffect(() => {
    setIsClient(true)
  }, [])

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('sq-AL', { hour: '2-digit', minute: '2-digit' })
  }

  // Sugjerimet e shpejta – përfshijnë kalkulatorët dhe temat kryesore
  const ikonatSugjerimeve: Record<string, React.ReactNode> = {
    cfa: <FaCalculator />,
    thellesia: <FaRuler />,
    pilota: <FaBuilding />,
    diafragme: <FaCube />,
    lokacioni: <FaMapMarkerAlt />,
    pagesa: <FaInfoCircle />,
    sherbime: <FaWater />,
  }
  const sugjerimet: Sugjerim[] = sugjerimetBaze.map((s) => ({
    text: s.text,
    action: s.action,
    icon: ikonatSugjerimeve[s.action] ?? <FaInfoCircle />,
  }))

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="w-20 h-20 bg-gradient-to-r from-[#256D7B] to-[#1a4f5a] rounded-2xl flex items-center justify-center shadow-lg">
              <FaRobot className="text-4xl text-white" />
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Asistenti AI
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Pyet për llogaritës, pompa, gjeologji dhe më shumë
          </p>
          <div className="w-32 h-1.5 bg-gradient-to-r from-[#256D7B] to-[#1a4f5a] mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Sugjerimet e shpejta */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2 justify-center">
            {sugjerimet.map((s, i) => (
              <button
                key={i}
                onClick={() => handleSugjerimClick(s)}
                className="flex items-center px-4 py-2 bg-gray-100 hover:bg-[#256D7B]/10 rounded-full text-sm text-gray-700 hover:text-[#256D7B] transition border border-gray-200"
              >
                <span className="mr-2 text-[#256D7B]">{s.icon}</span>
                {s.text}
              </button>
            ))}
          </div>
        </div>

        {/* Dritarja e chat-it */}
        <div className="bg-gray-50 rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="relative">
            <div
              ref={messagesContainerRef}
              className="h-96 overflow-y-auto mb-4 space-y-4 p-4 bg-white rounded-lg scroll-smooth"
            >
              {mesazhet.map((m, i) => (
                <div key={i} className={`flex ${m.isUser ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-4 rounded-lg ${
                    m.isUser 
                      ? 'bg-gradient-to-r from-[#256D7B] to-[#1a4f5a] text-white rounded-br-none' 
                      : 'bg-gray-100 text-gray-800 rounded-bl-none'
                  }`}>
                    <p className="text-sm whitespace-pre-line leading-relaxed">{m.text}</p>
                    {isClient && (
                      <p className={`text-xs mt-2 ${m.isUser ? 'text-white/70' : 'text-gray-400'}`}>
                        {formatTime(m.timestamp)}
                      </p>
                    )}
                  </div>
                </div>
              ))}
              {dukeTyp && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 p-4 rounded-lg rounded-bl-none">
                    <div className="flex items-center space-x-2">
                      <FaSpinner className="animate-spin text-[#256D7B]" />
                      <span className="text-sm text-gray-500">AI po shkruan...</span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Butoni për të shkuar në fund (shfaqet kur nuk je në fund) */}
            {showScrollButton && (
              <button
                onClick={scrollToBottom}
                className="absolute bottom-4 right-4 bg-[#256D7B] text-white p-2 rounded-full shadow-lg hover:bg-[#1a4f5a] transition"
                title="Shko në fund"
              >
                <FaArrowDown />
              </button>
            )}
          </div>

          {/* Input field */}
          <div className="flex gap-2">
            <input
              type="text"
              value={pyetja}
              onChange={(e) => setPyetja(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && dergoPyetjen()}
              placeholder="Shkruani pyetjen tuaj..."
              className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#256D7B]"
            />
            <button
              onClick={dergoPyetjen}
              className="bg-gradient-to-r from-[#256D7B] to-[#1a4f5a] text-white px-6 py-3 rounded-lg hover:shadow-lg transition"
            >
              <FaPaperPlane />
            </button>
          </div>

          {/* Footer info */}
          <p className="text-xs text-gray-400 mt-4 text-center">
            Asistenti AI mund të ketë gabime. Për informacion zyrtar, na kontaktoni në telefon.
          </p>
        </div>
      </div>
    </section>
  )
}