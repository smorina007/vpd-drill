'use client'

import { useState } from 'react'
import { FaStar, FaStarHalf, FaQuoteLeft, FaUser } from 'react-icons/fa'
import ModalVleresime from './ModalVleresime'

const vleresimetFillestare = [
  {
    id: 1,
    emri: 'Besim Krasniqi',
    roli: 'Kontraktues, Malisheve',
    vleresimi: 5,
    data: '15.02.2026',
    komenti: 'Punë profesionale dhe në kohë. Pilotat e vendosur për objektin tim janë të shkëlqyeshëm. E rekomandoj patjetër!'
  },
  {
    id: 2,
    emri: 'Valon Berisha',
    roli: 'Inxhinier Ndërtimi',
    vleresimi: 5,
    data: '10.02.2026',
    komenti: 'Bashkëpunim i shkëlqyer për shpimin e pusit. Makineritë moderne dhe ekipi profesional bënë diferencën.'
  },
  {
    id: 3,
    emri: 'Lumni Gashi',
    roli: 'Investitor',
    vleresimi: 4.5,
    data: '05.02.2026',
    komenti: 'Muri L i porositur ishte cilësor dhe montimi i shpejtë. Çmimet konkurruese.'
  },
  {
    id: 4,
    emri: 'Artan Hoxha',
    roli: 'Arkitekt',
    vleresimi: 5,
    data: '28.01.2026',
    komenti: 'Profesionalizëm në çdo detaj. Llogaritjet e sakta dhe ekzekutimi perfekt për projektin tonë.'
  }
]

export default function Vleresimet() {
  const [vleresimet] = useState(vleresimetFillestare)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Llogarit vlerësimin mesatar dhe numrin total
  const totalVleresime = vleresimet.length
  const shumaVleresimeve = vleresimet.reduce((acc, curr) => acc + curr.vleresimi, 0)
  const vleresimiTotal = (shumaVleresimeve / totalVleresime).toFixed(1)

  const renderYjet = (vleresimi: number) => {
    const yjet = []
    for (let i = 1; i <= 5; i++) {
      if (i <= vleresimi) {
        yjet.push(<FaStar key={i} className="text-yellow-400" />)
      } else if (i - 0.5 === vleresimi) {
        yjet.push(<FaStarHalf key={i} className="text-yellow-400" />)
      } else {
        yjet.push(<FaStar key={i} className="text-gray-300" />)
      }
    }
    return yjet
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Vlerësimet e Klientëve
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
            Çfarë thonë klientët tanë për punën tonë
          </p>

          {/* Statistikat e vlerësimeve */}
          <div className="flex items-center justify-center space-x-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-[#256D7B]">{vleresimiTotal}</div>
              <div className="flex items-center justify-center mt-1">
                {renderYjet(parseFloat(vleresimiTotal))}
              </div>
              <div className="text-sm text-gray-500 mt-1">Vlerësim mesatar</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#256D7B]">{totalVleresime}</div>
              <div className="text-sm text-gray-500 mt-1">Vlerësime totale</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {vleresimet.map((v) => (
            <div key={v.id} className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition">
              <div className="flex items-start mb-4">
                <div className="w-12 h-12 bg-[#256D7B]/10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <FaUser className="text-[#256D7B] text-xl" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-900">{v.emri}</h3>
                      <p className="text-sm text-gray-500">{v.roli}</p>
                    </div>
                    <div className="text-sm text-gray-400">{v.data}</div>
                  </div>
                  <div className="flex items-center mt-1">
                    {renderYjet(v.vleresimi)}
                  </div>
                </div>
              </div>
              <div className="relative">
                <FaQuoteLeft className="text-[#256D7B]/20 text-2xl absolute -top-2 -left-2" />
                <p className="text-gray-600 pl-6">{v.komenti}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Butoni për të lënë vlerësim */}
        <div className="text-center mt-10">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-[#256D7B] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#1a4f5a] transition"
          >
            Lini një vlerësim
          </button>
        </div>

        {/* Modal për vlerësim të ri */}
        <ModalVleresime
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
    </section>
  )
}