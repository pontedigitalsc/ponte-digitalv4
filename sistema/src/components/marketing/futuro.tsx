const TEMPOS = [
  {
    nome: 'Hoje',
    tipo: 'existe',
    itens: [
      'uma conversa que entende o que já foi dito',
      'leitura dos sinais que a empresa produz',
      'raciocínio visível, sem caixa-preta',
      'construção junto com os primeiros participantes',
    ],
  },
  {
    nome: 'Em construção',
    tipo: 'em desenvolvimento',
    itens: [
      'sinais com mais contexto da operação',
      'perguntas melhores a partir de mais história',
      'conexão entre as informações de cada empresa',
    ],
  },
  {
    nome: 'Depois',
    tipo: 'visão',
    itens: [
      'uma camada que acompanha a empresa de ponta a ponta',
      'conversas que usam o contexto acumulado',
      'decisões investigadas, nunca decididas sozinhas',
    ],
  },
  {
    nome: 'Futuro',
    tipo: 'visão maior',
    itens: [
      'a camada cognitiva da empresa: entre a operação e a decisão, uma camada que compreende',
    ],
  },
]

/**
 * Visão de futuro — quatro tempos separando o que é real, o que está em
 * construção, para onde aponta e a direção maior. Linguagem honesta: o que
 * existe hoje existe; o resto é direção. A camada cognitiva é explicada com
 * cuidado: uma camada de compreensão e conexão entre a operação e a
 * decisão — nunca uma substituição do julgamento humano.
 */
export function Futuro() {
  return (
    <div className="mx-auto max-w-4xl">
      <div className="mx-auto max-w-xl text-center">
        <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-night-teal">
          Para onde vamos
        </p>
        <h2 className="mt-3 font-editorial text-3xl font-light leading-tight text-night-text text-balance sm:text-4xl">
          Uma direção separada em quatro tempos.
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-night-text-soft">
          A ponte entre o que já existe e o que ainda é só direção — sem
          prometer o futuro no presente.
        </p>
      </div>

      <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {TEMPOS.map((t, i) => (
          <div
            key={t.nome}
            className={`balloon flex flex-col px-5 py-6 ${
              i === TEMPOS.length - 1 ? 'bg-night-850 ring-1 ring-night-green/30' : ''
            }`}
          >
            <p className={`text-[10px] font-semibold uppercase tracking-[0.2em] ${i === TEMPOS.length - 1 ? 'text-night-green-bright' : 'text-night-azure'}`}>
              {t.tipo}
            </p>
            <h3 className="mt-1 font-editorial text-2xl font-light text-night-text">{t.nome}</h3>
            <ul className="mt-4 space-y-2.5">
              {t.itens.map((item) => (
                <li key={item} className="flex items-start gap-2 text-[13px] leading-relaxed text-night-text-soft">
                  <span aria-hidden="true" className="dot-teal mt-[0.45em] h-1.5 w-1.5 shrink-0 rounded-full" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mx-auto mt-10 max-w-lg text-center">
        <p className="text-sm leading-relaxed text-night-text-soft">
          No centro dessa visão existe uma ideia sutil: uma{' '}
          <span className="font-editorial italic text-night-green-bright">
            camada cognitiva da empresa
          </span>
          — a possibilidade de uma companheira que, entre a operação e a
          decisão, ajude a compreender antes de agir.
        </p>
        <p className="mt-3 text-xs italic leading-relaxed text-night-text-dim">
          Uma direção honesta: cada participante ajuda a descobrir o que vale, sem
          vender o futuro como pronto.
        </p>
      </div>
    </div>
  )
}