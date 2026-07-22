'use client'

import { useState, useRef, useEffect } from 'react'
import { 
  FaRobot, FaPaperPlane, FaSpinner, FaWater, FaRuler, FaCalculator,
  FaInfoCircle, FaPhone, FaEnvelope, FaMapMarkerAlt, FaBuilding,
  FaAnchor, FaCube, FaArrowDown
} from 'react-icons/fa'

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
      text: "Përshëndetje! Unë jam asistenti inteligjent i VPD DRILL. Mund të më pyesni për:\n\n" +
            "🔹 **Llogaritësit** – vëllimi i ujit, muri L, pilota, etj.\n" +
            "🔹 **Pompa uji** – rekomandime bazuar në thellësi dhe nevojë\n" +
            "🔹 **Gjeologjia e tokës** – llojet e terreneve dhe këshilla për shpime\n" +
            "🔹 **Produktet** – specifikimet e murit L, gypave, pllakave\n" +
            "🔹 **Shërbimet** – shpime, pilota, ankera, germim diafragmë\n\n" +
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

  // Baza e zgjeruar e njohurive
  const knowledgeBase = {
    gjeologji: {
      title: '🏔️ Informacione Gjeologjike për Shpime',
      info: 'Kuptimi i terrenit është thelbësor për një shpim të suksesshëm:',
      specs: [
        '**Terrene shkëmbore (granit, gëlqeror)** – Shpime të qëndrueshme, por kërkojnë makineri të fuqishme (Casagrande, Soilmec). Thellësi deri 500m. Rekomandohet përdorimi i biteve me diamant.',
        '**Terrene argjilore** – Shpime më të lehta, por rrezik për ënjtje dhe shembje. Përdor llucë bentoniti për stabilizim.',
        '**Terrene ranore** – Rrezik i lartë për shembje. Kërkohet tubacion mbrojtës (casing) gjatë shpimit.',
        '**Terrene të përziera** – Alternim shtresash. Këshillohet analiza gjeologjike përpara fillimit.',
        '**Ujërat nëntokësore** – Niveli i ujit ndikon në stabilitetin e pusit. Mund të nevojiten pompa gjatë shpimit për të nxjerrë ujin.'
      ]
    },
    pompa: {
      title: '💧 Rekomandime për Pompa Uji',
      info: 'Zgjedhja e pompës së duhur siguri furnizim optimal:',
      specs: [
        '**Pompa sipërfaqësore** – Për thellësi deri 8m. Ideale për ujitje të vogla, kopshte, dhe puse të cekëta.',
        '**Pompa zhytëse (submersible)** – Për thellësi 10-200m. Të përshtatshme për puse të thella, furnizim me ujë të pijshëm dhe sisteme automatike.',
        '**Pompa me presion (booster)** – Për rritjen e presionit në rrjetet ekzistuese.',
        '**Pompa me inverter** – Kursim energjie dhe rregullim i shpejtësisë sipas nevojës.',
        '**Këshillë profesionale**: Për thellësi mbi 50m, rekomandojmë pompa zhytëse me mbrojtje nga puna e thatë dhe presostat.'
      ]
    },
    uji: {
      title: '💧 Informacione për Ujin dhe Puset',
      info: 'Faktorë që ndikojnë në cilësinë dhe sasinë e ujit:',
      specs: [
        '**Thellësia e pusit** – Ndikon në temperaturën dhe pastërtinë e ujit. Puse më të thella kanë ujë më të freskët dhe më pak ndotje.',
        '**Diametri i pusit** – Ndikon në vëllimin e ujit të ruajtur. Puse më të gjera kanë kapacitet më të madh.',
        '**Analiza e ujit** – Rekomandohet të bëhet analiza kimike dhe bakteriologjike çdo 6 muaj.',
        '**Trajtimi i ujit** – Në varësi të rezultateve, mund të nevojiten filtra, zbutës ose klorinues.',
        '**Mirëmbajtja e pusit** – Pastrimi periodik dhe kontrolli i pompës zgjasin jetën e pusit.'
      ]
    },
    llogaritesit: {
      title: '🧮 Llogaritësit tanë profesionalë',
      info: 'Kliko në ikonat përkatëse në header për t’i përdorur:',
      specs: [
        '**Llogaritësi i Murit L** – Llogarit vëllimin total (mur + këmbë), peshën dhe armaturën.',
        '**Llogaritësi i Pilotave** – Vëllimi i betonit dhe pesha për pilota rrethore.',
        '**Llogaritësi i Konstruksionit të Pilotave** – Pesha e hekurit për armaturë (fije vertikale + spiralje).',
        '**Llogaritësi i Ujit në Pus** – Vëllimi i ujit në m³ dhe litra, bazuar në diametër dhe thellësi.'
      ]
    },
    kontakt: {
      title: '📞 Informacione Kontakti',
      info: 'Na kontaktoni për çdo pyetje ose për të porositur:',
      specs: [
        '📱 Telefon: 044 184 1144, 044 204 877, 045 700 201',
        '📧 Email: info@vllezeritpaqarizi.com',
        '📍 Adresa: Fsh Dragobil, 24000 Malisheve, Kosovë',
        '⏰ Orari: Hënë - Shtunë, 07:00 - 19:00'
      ]
    }
  }

  // Funksioni për të llogaritur rekomandimin e pompës (me parametra opsionalë)
  const rekomandoPompen = (thellesia: number, kerkesaPerMin: number = 50): string => {
    let lloji = ''
    let fuqia = ''

    if (thellesia <= 8) {
      lloji = 'pompë sipërfaqësore'
      fuqia = kerkesaPerMin < 50 ? '0.5 kW' : kerkesaPerMin < 100 ? '1 kW' : '1.5 kW'
    } else if (thellesia <= 30) {
      lloji = 'pompë zhytëse (presion të ulët)'
      fuqia = kerkesaPerMin < 50 ? '0.75 kW' : kerkesaPerMin < 100 ? '1.5 kW' : '2.2 kW'
    } else if (thellesia <= 70) {
      lloji = 'pompë zhytëse (presion mesatar)'
      fuqia = kerkesaPerMin < 50 ? '1.5 kW' : kerkesaPerMin < 100 ? '2.2 kW' : '3 kW'
    } else {
      lloji = 'pompë zhytëse (presion të lartë)'
      fuqia = kerkesaPerMin < 50 ? '2.2 kW' : kerkesaPerMin < 100 ? '3 kW' : '4 kW'
    }

    return `Për thellësi **${thellesia}m** dhe nevojë **${kerkesaPerMin} litra/min**, rekomandojmë një **${lloji}** me fuqi **${fuqia}**.`
  }

  // Llogaritësi i vëllimit të ujit
  const llogaritVelliminEUjit = (diametri: number, thellesia: number): string => {
    const rrezja = diametri / 1000 / 2
    const vellimiM3 = Math.PI * Math.pow(rrezja, 2) * thellesia
    const vellimiL = vellimiM3 * 1000
    return `Pusi me diametër **${diametri}mm** dhe thellësi **${thellesia}m** ka vëllim **${vellimiM3.toFixed(2)} m³** (≈ **${vellimiL.toFixed(0)} litra**).`
  }

  // Llogaritësi i murit L (përgjigje e shpejtë pa futur parametra)
  const shembullMuriL = () => {
    return "Për një mur L me gjatësi 2m, lartësi muri 1.5m, trashësi muri 12cm, gjatësi këmbe 0.8m dhe trashësi këmbe 20cm, rezulton:\n" +
           "• Vëllimi total: 0.68 m³\n" +
           "• Pesha: 1.63 ton\n" +
           "• Hekur: 81.6 kg\n" +
           "Përdor llogaritësin në header për të futur vlerat e tua."
  }

  // Funksioni kryesor për të gjetur përgjigjen
  const gjejPergjigje = (pyetja: string): string => {
    const pyetjaL = pyetja.toLowerCase()

    // === LLOGARITËSIT ===
    if (pyetjaL.includes('ujë') && pyetjaL.includes('vëllim') && (pyetjaL.includes('diametër') || pyetjaL.includes('diametri'))) {
      const diametriMatch = pyetjaL.match(/(\d+)\s*mm/)
      const thellesiaMatch = pyetjaL.match(/(\d+)\s*m/)
      if (diametriMatch && thellesiaMatch) {
        const diametri = parseInt(diametriMatch[1])
        const thellesia = parseInt(thellesiaMatch[1])
        return llogaritVelliminEUjit(diametri, thellesia)
      } else {
        return "Për të llogaritur vëllimin e ujit, më tregoni diametrin në mm dhe thellësinë në m (p.sh., 'diametri 300mm thellësia 50m')."
      }
    }

    if (pyetjaL.includes('muri l') || pyetjaL.includes('mur l')) {
      // Nëse kërkon shembull, jep shembullin
      if (pyetjaL.includes('shembull') || pyetjaL.includes('llogarit')) {
        return shembullMuriL()
      } else {
        return knowledgeBase.llogaritesit.specs[0]
      }
    }

    if (pyetjaL.includes('pilot') && !pyetjaL.includes('konstruksion')) {
      return "**Llogaritësi i Pilotave**:\n" + knowledgeBase.llogaritesit.specs[1]
    }

    if (pyetjaL.includes('konstruksion') && pyetjaL.includes('pilot')) {
      return "**Llogaritësi i Konstruksionit të Pilotave**:\n" + knowledgeBase.llogaritesit.specs[2]
    }

    // === POMPA ===
    if (pyetjaL.includes('pompë') || pyetjaL.includes('pompa')) {
      const thellesiaMatch = pyetjaL.match(/(\d+)\s*m/)
      const kerkesaMatch = pyetjaL.match(/(\d+)\s*(litra|l|min)/)
      if (thellesiaMatch) {
        const thellesia = parseInt(thellesiaMatch[1])
        const kerkesa = kerkesaMatch ? parseInt(kerkesaMatch[1]) : 50
        return rekomandoPompen(thellesia, kerkesa) + '\n\n' + knowledgeBase.pompa.specs.slice(0, 2).join('\n')
      } else {
        return knowledgeBase.pompa.title + '\n' + knowledgeBase.pompa.info + '\n' + knowledgeBase.pompa.specs.map(s => '• ' + s).join('\n')
      }
    }

    // === GJEOLOGJI ===
    if (pyetjaL.includes('gjeologji') || pyetjaL.includes('terren') || pyetjaL.includes('tokë') || pyetjaL.includes('shkëmb')) {
      return knowledgeBase.gjeologji.title + '\n' + knowledgeBase.gjeologji.info + '\n' + knowledgeBase.gjeologji.specs.map(s => '• ' + s).join('\n')
    }

    // === UJI (informacione të përgjithshme) ===
    if (pyetjaL.includes('ujë') && !pyetjaL.includes('vëllim') && !pyetjaL.includes('pompë')) {
      return knowledgeBase.uji.title + '\n' + knowledgeBase.uji.info + '\n' + knowledgeBase.uji.specs.map(s => '• ' + s).join('\n')
    }

    // === LLOGARITËSIT (lista) ===
    if (pyetjaL.includes('llogaritës') || pyetjaL.includes('kalkulator')) {
      return knowledgeBase.llogaritesit.title + '\n' + knowledgeBase.llogaritesit.info + '\n' + knowledgeBase.llogaritesit.specs.map(s => '• ' + s).join('\n')
    }

    // === KONTAKT ===
    if (pyetjaL.includes('kontakt') || pyetjaL.includes('telefon') || pyetjaL.includes('email') || pyetjaL.includes('adresa')) {
      return knowledgeBase.kontakt.title + '\n' + knowledgeBase.kontakt.info + '\n' + knowledgeBase.kontakt.specs.map(s => '• ' + s).join('\n')
    }

    // === INFORMACIONE TË PËRGJITHSHME ===
    if (pyetjaL.includes('shërbim') || pyetjaL.includes('shpim')) {
      return "VPD DRILL ofron këto shërbime:\n" +
             "• Shpime puse uji (deri 500m)\n" +
             "• Pilota për objekte\n" +
             "• Ankera dhe stabilizim\n" +
             "• Germim me diafragmë\n" +
             "• Prodhim elementesh betoni (Muri L, gypa, pllaka)\n" +
             "Për më shumë, vizitoni faqet përkatëse ose na kontaktoni."
    }

    // Nëse nuk ka përputhje
    return "Faleminderit për pyetjen. Për informacion më të saktë, ju lutem përdorni një nga sugjerimet ose na kontaktoni në telefon/email."
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
  const sugjerimet: Sugjerim[] = [
    { text: 'Llogarit vëllimin e ujit (diametri 400mm, thellësia 60m)', icon: <FaWater />, action: 'ujë' },
    { text: 'Rekomando pompë për thellësi 45m', icon: <FaCalculator />, action: 'pompë' },
    { text: 'Informacione gjeologjike', icon: <FaInfoCircle />, action: 'gjeologji' },
    { text: 'Shembull për murin L', icon: <FaCube />, action: 'muriL' },
    { text: 'Llogaritësit tanë', icon: <FaCalculator />, action: 'llogarites' },
    { text: 'Kontakti', icon: <FaPhone />, action: 'kontakt' }
  ]

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