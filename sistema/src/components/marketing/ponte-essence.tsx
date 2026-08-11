const CADEIA = [
  'informação',
  'contexto',
  'interpretação',
  'pergunta',
  'decisão',
  'aprendizado',
]

const SEPARACOES = [
  'informação separada',
  'pessoas separadas',
  'setores separados',
  'experiências separadas',
  'decisões separadas',
  'conhecimento espalhado',
]

/**
 * O que é a Ponte — uma explicação simples e profunda. A metáfora do nome
 * vira narrativa: uma ponte conecta lugares que estavam separados; na
 * empresa acontece o mesmo. A cadeia mostra o sentido da camada:
 * informação → contexto → interpretação → pergunta → decisão → aprendizado.
 */
export function PonteEssence() {
  return (
    <div className="mx-auto grid max-w-4xl gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center">
      <div>
        <h2 className="font-editorial text-3xl font-light leading-tight text-night-text text-balance sm:text-4xl">
          Uma ponte conecta lugares que{' '}
          <span className="italic text-night-mist">estavam separados.</span>
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-night-text-soft sm:text-base sm:leading-7">
          Na empresa acontece algo parecido. A informação de um sistema não fala
          com a informação de outro. As conversas não falam com os números. O
          conhecimento das pessoas não fala com o histórico. Existem partes — e
          falta a conexão entre elas.
        </p>

        <ul className="mt-6 flex flex-wrap gap-2" aria-hidden="true">
          {SEPARACOES.map((s) => (
            <li key={s} className="pill px-3.5 py-1.5 text-xs text-night-text-dim">
              {s}
            </li>
          ))}
        </ul>

        <p className="mt-6 text-sm leading-relaxed text-night-text-soft sm:text-base sm:leading-7">
          Não basta armazenar informações sobre uma empresa. É preciso{' '}
          <span className="font-editorial italic text-night-green-bright">
            ajudar a empresa a enxergar o que elas significam
          </span>
          .
        </p>
      </div>

      <div className="balloon px-6 py-7">
        <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-night-teal">
          O sentido da camada
        </p>
        <ol className="mt-4 space-y-0">
          {CADEIA.map((c, i) => (
            <li key={c} className="relative flex items-center gap-3 pb-3 last:pb-0">
              {i < CADEIA.length - 1 && (
                <span aria-hidden="true" className="absolute left-[13px] top-7 h-[calc(100%-0.5rem)] w-px bg-night-teal/30" />
              )}
              <span className="relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-night-700/70 bg-night-800 text-xs font-semibold text-night-teal">
                {i + 1}
              </span>
              <span className="text-sm text-night-text">{c}</span>
            </li>
          ))}
        </ol>
        <p className="mt-5 border-t border-night-700/60 pt-4 text-sm leading-relaxed text-night-text-soft">
          Essa é a Ponte: uma camada que procura transformar o que já existe em
          contexto, conexão e perguntas melhores — sem substituir o seu julgamento.
        </p>
      </div>
    </div>
  )
}