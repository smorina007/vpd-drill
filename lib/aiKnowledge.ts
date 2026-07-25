// Baza e njohurive e Asistentit AI — PËRDORET NGA TË DY `AIAsistent.tsx`
// (seksioni në ballinë) DHE `ModalAI.tsx` (modali nga ikona e header-it).
// E nxorra në një skedar të përbashkët që të dy vendet të japin GJITHMONË
// të njëjtat përgjigje — më parë secili kishte kopjen e vet të veçantë, gjë
// që i çonte "jashtë sinkronizimi" me kalimin e kohës.

export interface Sugjerim {
  text: string
  action: string
}

export const sugjerimet: Sugjerim[] = [
  { text: 'Çka është shpimi CFA?', action: 'cfa' },
  { text: 'Sa thellë shkoni në terrene të forta/të buta?', action: 'thellesia' },
  { text: 'Çka janë pilotat?', action: 'pilota' },
  { text: 'Çka është gërmimi me diafragmë?', action: 'diafragme' },
  { text: 'Si mund t\'ju gjejmë?', action: 'lokacioni' },
  { text: 'Cilat forma pagese pranoni?', action: 'pagesa' },
  { text: 'Çka ofroni si shërbime dhe produkte?', action: 'sherbime' },
]

const knowledgeBase = {
  shpimi: {
    title: '🛠️ Çka është "shpimi"?',
    body:
      'Shpimi është procesi i krijimit të një vrime vertikale (pusi) në tokë, me makineri të specializuara, për qëllime të ndryshme: nxjerrje uji nga nëntoka, vendosje pilotash për themele objektesh, ose sondazhe gjeologjike. VPD DRILL përdor makineri profesionale (Casagrande, Mait, XCMG, Bauer) të përshtatura për çdo lloj terreni — nga toka e butë deri te shkëmbi i fortë.',
  },
  thellesia: {
    title: '📏 Sa thellë shkojmë?',
    body:
      'Varet nga lloji i terrenit:\n' +
      '• **Terrene të forta (shkëmbore)** — deri në **500 metra** thellësi\n' +
      '• **Terrene të buta (argjilë, rërë)** — deri në **55 metra** thellësi\n\n' +
      'Përpara çdo shpimi bëjmë vlerësim të terrenit për të përcaktuar metodën dhe thellësinë optimale — kjo ju kursen kohë dhe kosto të panevojshme.',
  },
  pilota: {
    title: '🏗️ Çka janë "pilotat"?',
    body:
      'Pilotat janë kolona betoni (të armuara me hekur brenda) të vendosura thellë në tokë, që shërbejnë si **themel** për objekte — sidomos kur toka sipërfaqësore nuk është e fortë mjaftueshëm për të mbajtur peshën e ndërtesës direkt. Pilotat e transferojnë peshën e ndërtesës drejt shtresave më të thella e më të forta të tokës. I ndërtojmë me metodën **CFA** (shiko poshtë) dhe i përdorim për ndërtesa individuale deri te komplekse industriale.',
  },
  cfa: {
    title: '⚙️ Çka është shpimi CFA?',
    body:
      'CFA (**Continuous Flight Auger** — "vidhë e vazhdueshme") është një metodë moderne për ndërtimin e pilotave: një vidhë (auger) e gjatë shpon në tokë pa ndërprerje, dhe ndërsa hiqet nga toka, betoni injektohet njëkohësisht nëpër boshtin e saj për të mbushur vrimën. Pastaj vendoset armatura (kosh hekuri) përpara se betoni të ngurtësohet. Kjo metodë është e shpejtë, e qëndrueshme dhe prodhon më pak vibrim/zhurmë krahasuar me metodat tradicionale — ideale edhe pranë ndërtesave ekzistuese.',
  },
  diafragme: {
    title: '🧱 Çka është "gërmimi me diafragmë"?',
    body:
      'Gërmimi me diafragmë krijon **mure nëntokësore** të forta duke gërmuar një kanal të ngushtë e të thellë (mbajtur i hapur me llucë bentoniti që parandalon shembjen), i mbushur më pas me armaturë dhe beton. Përdoret për parkingje nëntokësore, themele të thella pranë ndërtesave ekzistuese, dhe struktura mbajtëse në projekte urbane komplekse. Makineria jonë **Bauer MC 32** arrin thellësi mbi **50 metra** — teknologji e rrallë në treg.',
  },
  ankera: {
    title: '⚓ Çka janë "ankerat"?',
    body:
      'Ankerat janë tela/shufra çeliku të tensionuara, të vendosura në tokë ose shkëmb, që shërbejnë për **stabilizimin** e themeleve, shpateve dhe mureve mbajtëse — parandalojnë rrëshqitjen ose shembjen e tokës në terrene problematike ose gërmime të thella.',
  },
  pagesa: {
    title: '💳 Format e pagesës',
    body:
      'Çdo projekt vlerësohet individualisht (varet nga lloji, thellësia, materialet). Për detaje të sakta rreth formave të pagesës (këste, transfertë bankare, para në dorë, faturë biznesi) na kontaktoni direkt — do t\'i diskutojmë kushtet së bashku me ofertën tuaj të personalizuar.',
  },
  lokacioni: {
    title: '📍 Si mund të na gjeni',
    body:
      '📌 **Adresa**: Fsh Dragobil, 24000 Malishevë, Kosovë\n' +
      '📱 **Telefon**: 044 184 114 · 044 204 877 · 045 700 201\n' +
      '📧 **Email**: info@vllezeritpaqarizi.com\n' +
      '⏰ **Orari**: Hënë – Shtunë, 07:00–19:00\n\n' +
      'Operojmë anembanë Kosovës — shiko hartën e projekteve tona të realizuara te faqja "Projektet".',
  },
  sherbime: {
    title: '🔧 Shërbimet dhe Produktet tona',
    body:
      '**Shërbimet:**\n' +
      '• Shpim pusesh uji (deri 500m)\n' +
      '• Pilota për objekte (metoda CFA)\n' +
      '• Ankera dhe stabilizim shpatesh\n' +
      '• Gërmim me diafragmë (deri 50m+)\n\n' +
      '**Produktet:**\n' +
      '• Muri L, gypa betoni, pllaka betoni\n' +
      '• Gypa plastikë/hekuri për puse\n' +
      '• Kosha armature dhe sajla\n\n' +
      'Shiko katalogun e plotë te faqja "Produktet", ose kërko ofertë direkt nga butoni "Kërko Ofertë".',
  },
  llogaritesit: {
    title: '🧮 Llogaritësit tanë',
    body:
      'Kemi 4 kalkulatorë falas që mund t\'i hapësh nga ikonat në header:\n' +
      '• **Uji** — vëllimi i ujit në pus (m³/litra)\n' +
      '• **Pilota** — vëllimi i betonit dhe pesha\n' +
      '• **Konstr.** — pesha e armaturës (hekurit)\n' +
      '• **Muri L** — vëllimi, pesha dhe armatura\n\n' +
      'Secili ka edhe simulim 3D live që përditësohet ndërsa fut vlerat!',
  },
  garanci: {
    title: '✅ Cilësi dhe siguri',
    body:
      'Përdorim makineri profesionale (Casagrande, Mait, XCMG, Bauer) dhe bëjmë vlerësim gjeologjik përpara çdo projekti për të siguruar rezultate të sakta dhe të qëndrueshme. Siguria e strukturave fqinje dhe respektimi i afateve janë prioritet në çdo punë.',
  },
}

/** Përgjigjet për fjalë të thjeshta bisede (jo tema teknike) */
function pergjigjeBisede(pyetjaL: string): string | null {
  if (/^(përshëndetje|tung|hej|hi|hello|ckemi|çka kemi)/.test(pyetjaL.trim())) {
    return 'Përshëndetje! 👋 Si mund t\'ju ndihmoj sot? Pyetni për shpimin, pilotat, diafragmën, çmimet, ose si të na gjeni.'
  }
  if (/faleminderit|flm|thanks|tnx/.test(pyetjaL)) {
    return 'Me kënaqësi! Nëse keni pyetje të tjera, jam këtu. 🙂'
  }
  return null
}

export function gjejPergjigje(pyetja: string): string {
  const pyetjaL = pyetja.toLowerCase()

  const bisede = pergjigjeBisede(pyetjaL)
  if (bisede) return bisede

  // === LLOGARITJE DIREKTE (vëllim uji nëse jep diametër+thellësi) ===
  const diametriMatch = pyetjaL.match(/(\d+)\s*mm/)
  const thellesiaMatch = pyetjaL.match(/(\d+)\s*m(?!m)/)
  if ((pyetjaL.includes('vëllim') || pyetjaL.includes('sa uje') || pyetjaL.includes('sa ujë')) && diametriMatch && thellesiaMatch) {
    const diametri = parseInt(diametriMatch[1])
    const thellesia = parseInt(thellesiaMatch[1])
    const rrezja = diametri / 1000 / 2
    const vellimiM3 = Math.PI * Math.pow(rrezja, 2) * thellesia
    return `Pusi me diametër **${diametri}mm** dhe thellësi **${thellesia}m** ka vëllim rreth **${vellimiM3.toFixed(2)} m³** (≈ ${(vellimiM3 * 1000).toFixed(0)} litra). Për llogaritje më të sakta, përdor kalkulatorin "Uji" në header.`
  }

  // === CFA (kontrollo para "pilota" sepse pyetja mund t'i ketë të dyja) ===
  if (pyetjaL.includes('cfa')) {
    return knowledgeBase.cfa.title + '\n' + knowledgeBase.cfa.body
  }

  // === DIAFRAGMË ===
  if (pyetjaL.includes('diafragm')) {
    return knowledgeBase.diafragme.title + '\n' + knowledgeBase.diafragme.body
  }

  // === ANKERA ===
  if (pyetjaL.includes('anker')) {
    return knowledgeBase.ankera.title + '\n' + knowledgeBase.ankera.body
  }

  // === PILOTA ===
  if (pyetjaL.includes('pilot')) {
    return knowledgeBase.pilota.title + '\n' + knowledgeBase.pilota.body
  }

  // === THELLËSIA / TERRENI ===
  if (pyetjaL.includes('thellë') || pyetjaL.includes('terren') || pyetjaL.includes('shkëmb') || pyetjaL.includes('metra')) {
    return knowledgeBase.thellesia.title + '\n' + knowledgeBase.thellesia.body
  }

  // === PAGESA ===
  if (pyetjaL.includes('pages') || pyetjaL.includes('çmim') || pyetjaL.includes('kosto') || pyetjaL.includes('kesh') || pyetjaL.includes('faturë')) {
    return knowledgeBase.pagesa.title + '\n' + knowledgeBase.pagesa.body
  }

  // === LOKACIONI / KONTAKT ===
  if (pyetjaL.includes('gjej') || pyetjaL.includes('lokacion') || pyetjaL.includes('adres') || pyetjaL.includes('kontakt') || pyetjaL.includes('telefon') || pyetjaL.includes('orar')) {
    return knowledgeBase.lokacioni.title + '\n' + knowledgeBase.lokacioni.body
  }

  // === LLOGARITËSIT ===
  if (pyetjaL.includes('llogarit') || pyetjaL.includes('kalkulat')) {
    return knowledgeBase.llogaritesit.title + '\n' + knowledgeBase.llogaritesit.body
  }

  // === CILËSI/GARANCI ===
  if (pyetjaL.includes('garanci') || pyetjaL.includes('cilësi') || pyetjaL.includes('siguri')) {
    return knowledgeBase.garanci.title + '\n' + knowledgeBase.garanci.body
  }

  // === SHËRBIME/PRODUKTE (kontrollo pas rasteve specifike, si "catch-all" më i gjerë) ===
  if (pyetjaL.includes('shërbim') || pyetjaL.includes('sherbim') || pyetjaL.includes('produkt') || pyetjaL.includes('ofroni') || pyetjaL.includes('bëni') || pyetjaL.includes('punoni')) {
    return knowledgeBase.sherbime.title + '\n' + knowledgeBase.sherbime.body
  }

  // === SHPIMI (i përgjithshëm — kontrollo i fundit se përfshin fjalë të zakonshme) ===
  if (pyetjaL.includes('shpim') || pyetjaL.includes('pus') || pyetjaL.includes('bunar')) {
    return knowledgeBase.shpimi.title + '\n' + knowledgeBase.shpimi.body
  }

  return (
    'Nuk jam plotësisht i sigurt si t\'i përgjigjem kësaj. Provo të pyesësh për: ' +
    '**shpimin, pilotat, diafragmën, metodën CFA, thellësinë e terrenit, pagesën, ose si të na gjeni** — ' +
    'ose na kontakto direkt në 044 184 114 për një përgjigje të saktë.'
  )
}
