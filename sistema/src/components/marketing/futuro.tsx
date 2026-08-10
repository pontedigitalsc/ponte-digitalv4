const CAMINHOS = [
  'conhece a história da empresa',
  'acompanha a operação',
  'entende padrões',
  'percebe mudanças',
  'identifica sinais',
  'conversa com o empresário',
  'ajuda a investigar',
  'preserva o contexto',
]

/**
 * Visão futura — linguagem honesta no condicional ("Imagine..."). Nada é
 * prometido como pronto; é a direção. Verde profundo = evolução.
 */
export function Futuro() {
  return (
    <div className="mx-auto max-w-3xl">
      <div className="mx-auto max-w-xl text-center">
        <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-night-teal">
          Para onde vamos
        </p>
        <h2 className="mt-3 font-editorial text-3xl font-light leading-tight text-night-text text-balance sm:text-4xl">
          Imagine.
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-night-text-soft">
          Uma camada silenciosa acima da operação inteira — que conhece a
          história da empresa, acompanha seus padrões e conversa com você.
        </p>
      </div>

      <ul className="mx-auto mt-8 grid max-w-xl grid-cols-2 gap-3 sm:grid-cols-2">
        {CAMINHOS.map((c) => (
          <li key={c} className="flex items-start gap-2.5 text-sm leading-relaxed text-night-text-soft">
            <span aria-hidden="true" className="dot-teal mt-[0.45em] h-1.5 w-1.5 shrink-0 rounded-full" />
            {c}
          </li>
        ))}
      </ul>

      <p className="mx-auto mt-8 max-w-md text-center text-sm leading-relaxed text-night-text-dim">
        Nada disso precisa estar pronto hoje para a direção valer. É para onde a
        Ponte está indo — e os primeiros participantes caminham com ela.
      </p>
    </div>
  )
}