import { FaRobot } from 'react-icons/fa'
import AIChat from './AIChat'

const PERSHENDETJA =
  'Përshëndetje! 👋 Unë jam asistenti i VPD DRILL. Mund të më pyesni për:\n\n' +
  '🔹 **Çka është shpimi/pilota/diafragma/CFA** – shpjegime të thjeshta\n' +
  '🔹 **Thellësia** – sa thellë shkojmë në terrene të forta/të buta\n' +
  '🔹 **Çmimet dhe pagesa** – si funksionon\n' +
  '🔹 **Si na gjeni** – adresa, telefoni, orari\n' +
  '🔹 **Shërbimet dhe produktet** tona\n\n' +
  'Përdor sugjerimet e shpejta më poshtë ose shkruaj pyetjen tënde!'

export default function AIAsistent() {
  return (
    <section id="asistenti" data-shtresa="Asistenti AI" className="bg-stone-2 py-20 sm:py-28">
      <div className="shell grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.4fr)] lg:gap-20">
        <div>
          <span className="grid h-14 w-14 place-items-center rounded-lg bg-bedrock text-2xl text-glacier">
            <FaRobot />
          </span>
          <h2 className="display-lg mt-6">Asistenti AI</h2>
          <p className="lede mt-4">Pyet për llogaritës, pompa, gjeologji dhe më shumë</p>
        </div>
        <div className="min-w-0 rounded-xl bg-white p-4 ring-1 ring-stone-line sm:p-6">
          <AIChat pershendetja={PERSHENDETJA} />
        </div>
      </div>
    </section>
  )
}
