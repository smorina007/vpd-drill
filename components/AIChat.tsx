'use client'

import { Fragment, useEffect, useRef, useState } from 'react'
import { FaPaperPlane, FaRobot } from 'react-icons/fa'
import { gjejPergjigje, sugjerimet } from '@/lib/aiKnowledge'

type Mesazh = { id: number; text: string; isUser: boolean; ora: string }

const oraTani = () => new Date().toLocaleTimeString('sq-AL', { hour: '2-digit', minute: '2-digit', hour12: false })

/** Shfaq **tekst** si të theksuar (baza e njohurive përdor këtë format). */
function Tekst({ text }: { text: string }) {
  const pjeset = text.split(/(\*\*[^*]+\*\*)/g)
  return (
    <>
      {pjeset.map((p, i) =>
        p.startsWith('**') && p.endsWith('**') ? (
          <strong key={i} className="font-semibold text-inherit">
            {p.slice(2, -2)}
          </strong>
        ) : (
          <Fragment key={i}>{p}</Fragment>
        )
      )}
    </>
  )
}

/**
 * Bisedë me asistentin — e përbashkët për seksionin në ballinë dhe dritaren (modal).
 * Rregullim: më parë klikimi i një sugjerimi dërgonte pyetjen e MËPARSHME
 * (ose asgjë herën e parë), sepse lexonte vlerën e vjetër të input-it.
 */
export default function AIChat({ pershendetja, height = 'h-[26rem]' }: { pershendetja: string; height?: string }) {
  const [pyetja, setPyetja] = useState('')
  const [mesazhet, setMesazhet] = useState<Mesazh[]>([])
  const [dukeTyp, setDukeTyp] = useState(false)
  const listRef = useRef<HTMLDivElement>(null)
  const idRef = useRef(1)

  useEffect(() => {
    setMesazhet([{ id: 0, text: pershendetja, isUser: false, ora: oraTani() }])
  }, [pershendetja])

  useEffect(() => {
    const el = listRef.current
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' })
  }, [mesazhet, dukeTyp])

  const dergo = (tekst: string) => {
    const q = tekst.trim()
    if (!q || dukeTyp) return
    setMesazhet((m) => [...m, { id: idRef.current++, text: q, isUser: true, ora: oraTani() }])
    setPyetja('')
    setDukeTyp(true)
    window.setTimeout(() => {
      setMesazhet((m) => [...m, { id: idRef.current++, text: gjejPergjigje(q), isUser: false, ora: oraTani() }])
      setDukeTyp(false)
    }, 700)
  }

  return (
    <div className="flex flex-col">
      <div className="no-scrollbar -mx-1 mb-4 flex gap-2 overflow-x-auto px-1 pb-1 sm:flex-wrap">
        {sugjerimet.map((s) => (
          <button
            key={s.action}
            type="button"
            onClick={() => dergo(s.text)}
            disabled={dukeTyp}
            className="shrink-0 rounded-md border border-stone-line bg-white px-3 py-2 text-left text-[13px] font-semibold text-bedrock transition-colors hover:border-brand hover:text-brand disabled:opacity-50"
          >
            {s.text}
          </button>
        ))}
      </div>

      <div
        ref={listRef}
        className={`${height} space-y-4 overflow-y-auto rounded-lg bg-stone p-4 sm:p-5`}
        aria-live="polite"
        aria-label="Biseda me asistentin"
      >
        {mesazhet.map((m) => (
          <div key={m.id} className={`flex gap-3 ${m.isUser ? 'justify-end' : 'justify-start'}`}>
            {!m.isUser && (
              <span className="mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-md bg-bedrock text-sm text-glacier">
                <FaRobot />
              </span>
            )}
            <div
              className={`max-w-[82%] rounded-lg px-4 py-3 text-[14px] leading-relaxed ${
                m.isUser ? 'bg-brand text-white' : 'bg-white text-bedrock ring-1 ring-stone-line'
              }`}
            >
              <p className="whitespace-pre-line">
                <Tekst text={m.text} />
              </p>
              <p className={`mt-1.5 text-[11px] tabular ${m.isUser ? 'text-white/60' : 'text-slate-mute'}`}>{m.ora}</p>
            </div>
          </div>
        ))}
        {dukeTyp && (
          <div className="flex items-center gap-3">
            <span className="grid h-8 w-8 place-items-center rounded-md bg-bedrock text-sm text-glacier">
              <FaRobot />
            </span>
            <span className="flex gap-1 rounded-lg bg-white px-4 py-3.5 ring-1 ring-stone-line" aria-label="AI po shkruan...">
              {[0, 1, 2].map((d) => (
                <span key={d} className="h-1.5 w-1.5 animate-bounce rounded-full bg-brand" style={{ animationDelay: `${d * 120}ms` }} />
              ))}
            </span>
          </div>
        )}
      </div>

      <form
        className="mt-3 flex gap-2"
        onSubmit={(e) => {
          e.preventDefault()
          dergo(pyetja)
        }}
      >
        <label className="flex-1">
          <span className="sr-only">Pyetja juaj</span>
          <input
            type="text"
            value={pyetja}
            onChange={(e) => setPyetja(e.target.value)}
            placeholder="Shkruani pyetjen tuaj..."
            className="field h-12"
          />
        </label>
        <button type="submit" aria-label="Dërgo" className="btn-brand h-12 w-12 px-0" disabled={!pyetja.trim() || dukeTyp}>
          <FaPaperPlane />
        </button>
      </form>
      <p className="mt-3 text-xs text-slate-mute">
        Asistenti AI mund të ketë gabime. Për informacion zyrtar, na kontaktoni në telefon.
      </p>
    </div>
  )
}
