const FONTES = [
  { label: 'WhatsApp', rotate: -3 },
  { label: 'Planilhas', rotate: 2 },
  { label: 'Conversas', rotate: -1.5 },
  { label: 'Clientes', rotate: 3 },
  { label: 'Equipe', rotate: -2 },
  { label: 'Operação', rotate: 1.5 },
  { label: 'Experiência', rotate: -2.5 },
  { label: 'Problemas', rotate: 2.5 },
]

const DADOS_CONCRETOS = [
  'O mesmo pedido repetido no WhatsApp.',
  'A planilha que ninguém atualiza há semanas.',
  'A conversa onde alguém já tinha dito tudo.',
]

/**
 * A seção "Você já tem os dados": fontes de onde a realidade aparece, mas
 * abaixo delas, dado concreto + a Ponte como ponto que as liga. O aviso
 * final ("não substitui") mantém o tom honesto — nada de prometer que a
 * Ponte lê mentes. Camada Rodada 3: chips como balões translúcidos sobre
 * azul-noite; o dado concreto com o ponto verde; a Ponte como o nó.
 */
export function SignalStrip() {
  return (
    <div className="space-y-8">
      <div className="flex flex-wrap justify-center gap-3">
        {FONTES.map((f) => (
          <span
            key={f.label}
            className="pill px-4 py-1.5 text-sm text-night-text-soft"
            style={{ transform: `rotate(${f.rotate}deg)` }}
          >
            {f.label}
          </span>
        ))}
      </div>

      <ul className="mx-auto max-w-md space-y-2 text-left">
        {DADOS_CONCRETOS.map((d) => (
          <li key={d} className="flex items-start gap-2.5 text-sm leading-relaxed text-night-text-soft">
            <span aria-hidden="true" className="dot-green mt-[0.35em] h-1.5 w-1.5 shrink-0 rounded-full" />
            {d}
          </li>
        ))}
      </ul>

      <div className="flex flex-col items-center gap-4">
        <span className="text-2xl leading-none text-night-text-dim/50" aria-hidden="true">↓</span>
        <span className="rounded-full border border-night-700/60 bg-night-800 px-7 py-2.5 text-sm font-semibold tracking-[0.3em] text-night-mist uppercase">
          Ponte
        </span>
        <p className="mx-auto max-w-xs text-center text-xs italic leading-relaxed text-night-text-dim">
          A Ponte não substitui o seu julgamento — ela aproxima o que já está aí.
        </p>
      </div>
    </div>
  )
}