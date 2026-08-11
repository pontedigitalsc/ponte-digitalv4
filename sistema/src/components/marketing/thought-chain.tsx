const ETAPAS = [
  {
    nome: 'Sinal',
    texto: 'Clientes estão retornando com menos frequência.',
  },
  {
    nome: 'Contexto',
    texto: 'O intervalo médio entre visitas aumentou.',
  },
  {
    nome: 'Hipótese',
    texto: 'Pode existir uma mudança no comportamento de retorno.',
  },
  {
    nome: 'Pergunta',
    texto: 'O que mudou na experiência ou no ciclo desses clientes?',
  },
  {
    nome: 'Decisão',
    texto: 'Antes de criar uma promoção, talvez seja melhor entender o motivo da mudança.',
  },
]

/**
 * Um exemplo da forma de pensar da Ponte — didático e EXPLICITAMENTE
 * ilustrativo (não é dado de cliente real). Demonstra o fluxo completo:
 * sinal → contexto → hipótese → pergunta → decisão, que é o coração da
 * proposta: entregar valor já na leitura, antes de qualquer conversa.
 */
export function ThoughtChain() {
  return (
    <div className="mx-auto max-w-2xl">
      <ol className="relative mx-auto max-w-md space-y-0">
        {ETAPAS.map((e, i) => (
          <li key={e.nome} className="relative flex gap-5 pb-7 last:pb-0">
            {i < ETAPAS.length - 1 && (
              <span aria-hidden="true" className="absolute left-[15px] top-8 h-[calc(100%-1.25rem)] w-px bg-gradient-to-b from-night-teal/40 to-night-teal/10" />
            )}
            <span
              aria-hidden="true"
              className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-xs font-semibold ${
                i === ETAPAS.length - 1
                  ? 'dot-green border-night-green/50 text-white'
                  : 'border-night-700/70 bg-night-800 text-night-teal'
              }`}
            >
              {i + 1}
            </span>
            <div className="pt-0.5">
              <p
                className={`font-editorial text-lg font-light tracking-tight ${
                  i === ETAPAS.length - 1 ? 'text-night-green-bright' : 'text-night-text'
                }`}
              >
                {e.nome}
              </p>
              <p className="mt-1 text-sm leading-relaxed text-night-text-soft">{e.texto}</p>
            </div>
          </li>
        ))}
      </ol>

      <p className="mx-auto mt-8 max-w-md text-center text-xs italic leading-relaxed text-night-text-dim">
        Exemplo ilustrativo — uma forma de pensar, não um dado de cliente real.
      </p>
    </div>
  )
}