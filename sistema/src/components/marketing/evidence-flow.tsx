const ETAPAS = [
  { nome: 'Fato', legenda: 'o que observamos' },
  { nome: 'Contexto', legenda: 'por que chamou atenção' },
  { nome: 'Hipótese', legenda: 'o que pode significar' },
  { nome: 'Pergunta', legenda: 'o que vale investigar' },
]

/**
 * A Ponte não entrega conclusões: desdobra o raciocínio até onde a verdade
 * é verificável (fato) e até onde é interpretação (contexto e hipótese),
 * para então devolver investigação (pergunta). Em linha no desktop, em
 * coluna no mobile — o nó final recebe a luz verde ("pergunta é ação").
 */
export function EvidenceFlow() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col items-center gap-3 sm:flex-row sm:justify-center sm:items-stretch sm:gap-0">
      {ETAPAS.map((etapa, i) => (
        <div key={etapa.nome} className="flex flex-col items-center sm:contents">
          <div
            className={`w-full sm:w-auto min-w-[150px] rounded-2xl border px-4 py-3 text-center backdrop-blur-sm ${
              i === ETAPAS.length - 1
                ? 'border-night-green/50 bg-[radial-gradient(110%_90%_at_50%_0%,hsl(var(--l-green)/0.16),transparent_70%)] bg-night-800/90'
                : 'border-night-700/60 bg-night-surf/70'
            }`}
          >
            <p className={`text-sm font-semibold ${i === ETAPAS.length - 1 ? 'text-night-green-bright' : 'text-night-text'}`}>
              {etapa.nome}
            </p>
            <p className="mt-0.5 text-xs leading-snug text-night-text-dim">{etapa.legenda}</p>
          </div>
          {i < ETAPAS.length - 1 && (
            <span aria-hidden="true" className="my-1 text-night-teal/70 sm:mx-2 sm:my-0 sm:self-center rotate-90 sm:rotate-0">
              →
            </span>
          )}
        </div>
      ))}
    </div>
  )
}