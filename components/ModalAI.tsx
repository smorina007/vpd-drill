'use client'

import { useState, useRef } from 'react'
import { 
  FaTimes, FaRobot, FaPaperPlane, FaSpinner, 
  FaWater, FaBuilding, FaAnchor, FaCube, 
  FaRuler, FaCalculator, FaInfo,
  FaPhone, FaEnvelope
} from 'react-icons/fa'

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
      text: "Përshëndetje! Unë jam asistenti inteligjent i VPD DRILL. Mund të më pyesni për:\n\n" +
            "🔹 Llogaritësit – vëllimi i ujit, muri L, pilota, etj.\n" +
            "🔹 Pompa uji – rekomandime bazuar në thellësi\n" +
            "🔹 Gjeologjia e tokës – llojet e terreneve\n" +
            "🔹 Produktet dhe shërbimet tona",
      isUser: false,
      timestamp: new Date()
    }
  ])
  const [dukeTyp, setDukeTyp] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // KnowledgeBase e plotë
  const knowledgeBase = {
    gjeologji: {
      title: '🏔️ Informacione Gjeologjike',
      specs: [
        'Terrene shkëmbore: Thellësi deri 500m',
        'Terrene argjilore: Kërkojnë stabilizim',
        'Terrene ranore: Rrezik shembjesh',
        'Ujërat nëntokësore: Ndikojnë në shpim'
      ]
    },
    pompa: {
      title: '💧 Rekomandime për Pompa',
      specs: [
        'Pompa sipërfaqësore: Deri 8m thellësi',
        'Pompa zhytëse: 10-200m thellësi',
        'Pompa me presion: Për rritje presioni',
        'Pompa me inverter: Kursim energjie'
      ]
    },
    uji: {
      title: '💧 Informacione për Ujin',
      specs: [
        'Thellësia e pusit ndikon në temperaturë',
        'Diametri ndikon në kapacitet',
        'Analiza e ujit rekomandohet çdo 6 muaj',
        'Mirëmbajtja zgjat jetën e pusit'
      ]
    },
    llogaritesit: {
      title: '🧮 Llogaritësit',
      specs: [
        'Muri L: Vëllim, peshë, armaturë',
        'Pilota: Beton dhe peshë',
        'Konstruksion pilotash: Hekur',
        'Uji në pus: Vëllim në litra'
      ]
    },
    kontakt: {
      title: '📞 Kontakti',
      specs: [
        'Tel: 044 184 114',
        'Email: info@vllezeritpaqarizi.com',
        'Adresa: Fsh Dragobil, Malisheve'
      ]
    }
  }

  // Funksionet ndihmëse
  const rekomandoPompen = (thellesia: number) => {
    if (thellesia <= 8) return 'pompë sipërfaqësore'
    if (thellesia <= 30) return 'pompë zhytëse (presion të ulët)'
    if (thellesia <= 70) return 'pompë zhytëse (presion mesatar)'
    return 'pompë zhytëse (presion të lartë)'
  }

  const llogaritVelliminEUjit = (diametri: number, thellesia: number) => {
    const rrezja = diametri / 1000 / 2
    return (Math.PI * rrezja * rrezja * thellesia).toFixed(2)
  }

  const shembullMuriL = () => {
    return "Shembull: Mur L 2m gjatësi, 1.5m lartësi, 12cm trashësi muri, 0.8m këmbë → 0.68m³ beton, 1.63 ton"
  }

  // Përgjigjet
  const gjejPergjigje = (pyetja: string): string => {
    const p = pyetja.toLowerCase()

    if (p.includes('gjeologji')) 
      return knowledgeBase.gjeologji.title + '\n' + knowledgeBase.gjeologji.specs.map(s => '• ' + s).join('\n')

    if (p.includes('pompë') || p.includes('pompa')) {
      const match = p.match(/(\d+)\s*m/)
      if (match) return 'Rekomandojmë ' + rekomandoPompen(parseInt(match[1]))
      return knowledgeBase.pompa.title + '\n' + knowledgeBase.pompa.specs.map(s => '• ' + s).join('\n')
    }

    if (p.includes('ujë') && p.includes('vëllim')) {
      const diam = p.match(/(\d+)\s*mm/)
      const thel = p.match(/(\d+)\s*m/)
      if (diam && thel) return `Vëllimi: ${llogaritVelliminEUjit(parseInt(diam[1]), parseInt(thel[1]))} m³`
      return 'Shembull: "diametri 300mm thellësia 50m"'
    }

    if (p.includes('mur') || p.includes('muri l')) return shembullMuriL()

    if (p.includes('llogaritës')) 
      return knowledgeBase.llogaritesit.title + '\n' + knowledgeBase.llogaritesit.specs.map(s => '• ' + s).join('\n')

    if (p.includes('kontakt')) 
      return knowledgeBase.kontakt.title + '\n' + knowledgeBase.kontakt.specs.map(s => '• ' + s).join('\n')

    return "Për më shumë, na kontaktoni në 044 184 114"
  }

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

  const sugjerimet: Sugjerim[] = [
    { text: 'Gjeologji', icon: <FaInfo />, action: '' },
    { text: 'Pompa për 45m', icon: <FaCalculator />, action: '' },
    { text: 'Llogarit vëllimin', icon: <FaWater />, action: '' },
    { text: 'Shembull Muri L', icon: <FaCube />, action: '' },
    { text: 'Llogaritësit', icon: <FaCalculator />, action: '' },
    { text: 'Kontakt', icon: <FaPhone />, action: '' }
  ]

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