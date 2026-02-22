'use client'

import { useState, useRef, useEffect } from 'react'
import { 
  FaTimes, FaRobot, FaPaperPlane, FaSpinner, 
  FaWater, FaBuilding, FaAnchor, FaCube, 
  FaRuler, FaWeight, FaCalculator, FaInfo,
  FaPhone, FaEnvelope, FaMapMarkerAlt
} from 'react-icons/fa'

type Mesazh = {
  text: string
  isUser: boolean
  timestamp: Date
  timeString?: string  // Shtuar për të shmangur hydration error
}

type Sugjerim = {
  text: string
  icon: React.ReactNode
  category: string
}

export default function AIAsistent() {
  const [pyetja, setPyetja] = useState('')
  const [mesazhet, setMesazhet] = useState<Mesazh[]>([
    { 
      text: "Përshëndetje! Unë jam asistenti inteligjent i VPD DRILL. Mund të më pyesni për çdo gjë rreth shërbimeve, produkteve, llogaritjeve teknike ose të kërkoni ndihmë.", 
      isUser: false,
      timestamp: new Date()
    }
  ])
  const [dukeTyp, setDukeTyp] = useState(false)
  const [isClient, setIsClient] = useState(false) // Për të shmangur hydration error
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Baza e njohurive
  const knowledgeBase = {
    'shpime': {
      title: 'Shpime Puse Uji',
      info: 'Specialistë në shpimin e puseve të ujit në çdo lloj terreni.',
      specs: [
        'Terrene të forta (shkëmbore) - Thellësi deri 500m',
        'Terrene të buta (argjilë, rërë) - Diametër deri 55m',
        'Makineri: Casagrande, Mait 100, Mait 120, MDT, XCMG',
        'Sondazhe gjeologjike të detajuara'
      ]
    },
    'pilota': {
      title: 'Pilota për Objekte',
      info: 'Themele të sigurta me pilota të thellë për çdo lloj objekti.',
      specs: [
        'Pilota të derdhur në vend (diametrat: 400-1200mm)',
        'Metoda CFA për thellësi deri 25m',
        'Testime të ngarkesës deri 200 ton',
        'Kapacitet mbajtës deri 150 ton/pilotë'
      ]
    },
    'ankera': {
      title: 'Ankera dhe Stabilizim',
      info: 'Mbrojtje dhe stabilizim i themeleve dhe shpateve me ankera.',
      specs: [
        'Ankera të tensionuar (kapacitet 30-100 ton)',
        'Mbrojtje e themeleve ekzistuese',
        'Stabilizim shpatesh deri 20m lartësi',
        'Forcim i mureve mbajtëse'
      ]
    },
    'germim diafragme': {
      title: 'Germim me Diafragmë',
      info: 'Germime precize me diafragmë për mure nëntokësore dhe themele të thella.',
      specs: [
        'Mure diafragme deri 50m thellësi',
        'Precizion i lartë në ekzekutim',
        'Stabilizim me bentonit',
        'Për çdo lloj terreni'
      ]
    },
    'muri l': {
      title: 'Muri L',
      info: 'Elemente betoni për mure mbajtëse dhe kanale.',
      specs: [
        'Lartësi: 1-4m',
        'Gjatësi: 1-3m për element',
        'Trashësi: 15-30cm',
        'Pesha: 1.5-5 ton/element'
      ]
    },
    'gypa betoni': {
      title: 'Gypa Betoni',
      info: 'Për kanalizime dhe ujësjellës.',
      specs: [
        'Diametrat: 300-2000mm',
        'Gjatësi: 2-3m',
        'Rezistencë ndaj presionit deri 10 bar',
        'Lidhje hermetike'
      ]
    },
    'gypa per puse': {
      title: 'Gypa për Puse',
      info: 'Gypa plastike dhe hekuri për puse uji.',
      specs: [
        'Gypa plastike: 125-300mm',
        'Gypa hekuri të galvanizuar: 100-400mm',
        'Gypa hekuri pa galvanizuar: 100-400mm',
        'Rezistent ndaj korrozionit'
      ]
    },
    'sajla': {
      title: 'Sajla',
      info: 'Shufra hekuri për konstruksione.',
      specs: [
        'Diametrat: 10-24mm',
        'Gjatësi: 6-12m',
        'Servis shtypjeje sipas kërkesës',
        'Cilësi e lartë e materialit'
      ]
    },
    'makineri': {
      title: 'Makineritë tona',
      info: 'Flotë e pasur me makineri të specializuara:',
      specs: [
        '4 x Casagrande (makina të ndryshme)',
        'Mait 100 dhe Mait 120',
        '3 x MDT',
        '2 x Puntell',
        'XCMG makinë shpimi',
        'XCMG kran i peshave të rënda',
        'Eskavatorë të ndryshëm'
      ]
    },
    'kontakt': {
      title: 'Informacione Kontakti',
      info: 'Na kontaktoni për çdo pyetje.',
      specs: [
        'Tel 1: 044 184 1144',
        'Tel 2: 044 204 877',
        'Tel 3: 045 700 201',
        'Email: info@vllezeritpaqarizi.com',
        'Adresa: Fsh Dragobil, Malisheve, Kosovë'
      ]
    }
  }

  // Sugjerimet e shpejta
  const sugjerimet: Sugjerim[] = [
    { text: 'Çfarë lloj shpimesh bëni?', icon: <FaWater />, category: 'shpime' },
    { text: 'Sa thellë shponi?', icon: <FaRuler />, category: 'thellesi' },
    { text: 'Makineritë që dispononi', icon: <FaCube />, category: 'makineri' },
    { text: 'Germim me diafragmë', icon: <FaBuilding />, category: 'germim diafragme' },
    { text: 'Specifikimet e Murit L', icon: <FaCube />, category: 'muri l' },
    { text: 'Kontakti dhe adresa', icon: <FaPhone />, category: 'kontakt' },
    { text: 'Llogaritësi i pilotave', icon: <FaCalculator />, category: 'llogarites' },
    { text: 'Çmimet dhe ofertat', icon: <FaInfo />, category: 'cmime' }
  ]

  // Për të shmangur hydration error
  useEffect(() => {
    setIsClient(true)
  }, [])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [mesazhet])

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('sq-AL', { hour: '2-digit', minute: '2-digit' })
  }

  const gjejPergjigje = (pyetja: string): string => {
    const pyetjaL = pyetja.toLowerCase()
    
    if (pyetjaL.includes('shpim') || pyetjaL.includes('pus') || pyetjaL.includes('ujë')) {
      const k = knowledgeBase['shpime']
      return `${k.title}:\n${k.info}\n\nSpecifikimet:\n${k.specs.map(s => `• ${s}`).join('\n')}`
    }
    if (pyetjaL.includes('pilot')) {
      const k = knowledgeBase['pilota']
      return `${k.title}:\n${k.info}\n\nSpecifikimet teknike:\n${k.specs.map(s => `• ${s}`).join('\n')}`
    }
    if (pyetjaL.includes('anker')) {
      const k = knowledgeBase['ankera']
      return `${k.title}:\n${k.info}\n\nKapacitetet:\n${k.specs.map(s => `• ${s}`).join('\n')}`
    }
    if (pyetjaL.includes('diafragm')) {
      const k = knowledgeBase['germim diafragme']
      return `${k.title}:\n${k.info}\n\n${k.specs.map(s => `• ${s}`).join('\n')}`
    }
    if (pyetjaL.includes('muri l') || pyetjaL.includes('mur l')) {
      const k = knowledgeBase['muri l']
      return `${k.title}:\n${k.info}\n\nDimensionet:\n${k.specs.map(s => `• ${s}`).join('\n')}`
    }
    if (pyetjaL.includes('gypa betoni')) {
      const k = knowledgeBase['gypa betoni']
      return `${k.title}:\n${k.info}\n\nSpecifikimet:\n${k.specs.map(s => `• ${s}`).join('\n')}`
    }
    if (pyetjaL.includes('gypa per puse') || pyetjaL.includes('gypa për puse')) {
      const k = knowledgeBase['gypa per puse']
      return `${k.title}:\n${k.info}\n\nLlojet:\n${k.specs.map(s => `• ${s}`).join('\n')}`
    }
    if (pyetjaL.includes('sajl') || pyetjaL.includes('shufra')) {
      const k = knowledgeBase['sajla']
      return `${k.title}:\n${k.info}\n\nOpsionet:\n${k.specs.map(s => `• ${s}`).join('\n')}`
    }
    if (pyetjaL.includes('makineri') || pyetjaL.includes('mait') || pyetjaL.includes('casagrande') || pyetjaL.includes('xcmg')) {
      const k = knowledgeBase['makineri']
      return `${k.title}:\n${k.info}\n\n${k.specs.map(s => `• ${s}`).join('\n')}`
    }
    if (pyetjaL.includes('kontakt') || pyetjaL.includes('telefon') || pyetjaL.includes('email') || pyetjaL.includes('adresa')) {
      const k = knowledgeBase['kontakt']
      return `${k.title}:\n${k.info}\n\n${k.specs.map(s => `• ${s}`).join('\n')}`
    }
    if (pyetjaL.includes('thell') || pyetjaL.includes('500')) {
      return "Ne shpojmë deri në 500m thellësi në terrene të forta dhe deri në 55m diametër në terrene të buta. Makineritë tona Casagrande, Mait dhe XCMG janë të përshtatshme për çdo lloj terreni."
    }
    if (pyetjaL.includes('çmim') || pyetjaL.includes('kosto') || pyetjaL.includes('sa kushton')) {
      return "Për çmime të sakta dhe oferta të personalizuara, ju lutem:\n\n• Plotësoni formularin e ofertës (kliko ikonën Oferta)\n• Na telefononi në 044 184 1144\n• Dërgoni email në info@vllezeritpaqarizi.com\n\nNjë nga përfaqësuesit tanë do t'ju kontaktojë brenda 24 orëve."
    }
    if (pyetjaL.includes('llogarit') || pyetjaL.includes('kalkulim')) {
      return "Mund të përdorni llogaritësit tanë profesionalë:\n\n• 📐 Llogaritësi i Murit L (pesha, vëllimi, forca)\n• 📏 Llogaritësi i Pilotave (betoni, hekuri, kapaciteti)\n• 🔧 Llogaritësi i Konstruksioneve (armatura për pilota)\n\nKlikoni në ikonat përkatëse në header për t'i përdorur!"
    }
    
    return "Faleminderit për pyetjen. Për informacion më të detajuar, mund të:\n\n• Përdorni llogaritësit tanë teknikë\n• Plotësoni formularin e ofertës\n• Na kontaktoni direkt në telefon\n\nSi tjetër mund t'ju ndihmoj?"
  }

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

  const handleSugjerimClick = (sugjerim: string) => {
    setPyetja(sugjerim)
    setTimeout(() => dergoPyetjen(), 100)
  }

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
            Bëni pyetje rreth produkteve, llogaritjeve teknike dhe shërbimeve tona
          </p>
          <div className="w-32 h-1.5 bg-gradient-to-r from-[#256D7B] to-[#1a4f5a] mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Sugjerimet e shpejta */}
        <div className="mb-6">
          <p className="text-sm text-gray-500 mb-3 font-medium">SUGJERIME TË SHPEJTA:</p>
          <div className="flex flex-wrap gap-2">
            {sugjerimet.map((s, i) => (
              <button
                key={i}
                onClick={() => handleSugjerimClick(s.text)}
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
          <div className="h-96 overflow-y-auto mb-4 space-y-4 p-4 bg-white rounded-lg">
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

          {/* Input field */}
          <div className="flex gap-2">
            <input
              type="text"
              value={pyetja}
              onChange={(e) => setPyetja(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && dergoPyetjen()}
              placeholder="Shkruani pyetjen tuaj..."
              className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#256D7B] focus:border-transparent"
            />
            <button
              onClick={dergoPyetjen}
              className="bg-gradient-to-r from-[#256D7B] to-[#1a4f5a] text-white px-6 py-3 rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
            >
              <FaPaperPlane />
            </button>
          </div>

          {/* Footer info */}
          <p className="text-xs text-gray-400 mt-4 text-center">
            Asistenti AI mund të ketë gabime. Për informacion zyrtar, na kontaktoni direkt në telefon.
          </p>
        </div>
      </div>
    </section>
  )
}