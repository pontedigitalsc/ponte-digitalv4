const CAMADAS = [
  {
    n: '1',
    titulo: 'Reunir',
    texto: 'As informações da empresa passam a estar no mesmo lugar, com os dados que já existem.',
  },
  {
    n: '2',
    titulo: 'Conectar',
    texto: 'Cliente, operação, equipe, conversas e histórico começam a conversar entre si.',
  },
  {
    n: '3',
    titulo: 'Interpretar',
    texto: 'O contexto ganha forma: padrões, mudanças e sinais passam a ser percebidos.',
  },
  {
    n: '4',
    titulo: 'Perguntar',
    texto: 'Interpretações viram perguntas — sempre com visibilidade do raciocínio.',
  },
  {
    n: '5',
    titulo: 'Evoluir',
    texto: 'Quanto mais contexto entra, melhores podem ser as perguntas — nunca uma autonomia total.',
  },
]

/**
 * Como a Ponte evolui — contexto progressivo, com linguagem responsável.
 * Etapas de maturidade em que a camada amadurece junto com o uso da
 * empresa. O último degrau nunca é "decidir sozinha", e sim aprofundar as
 * perguntas à medida que o contexto cresce. Isso é direção, não promessa.
 */
export function Evolucao() {
  return (
    <div className="mx-auto max-w-3xl">
      <div className="mx-auto max-w-xl text-center">
        <h3 className="font-editorial text-2xl font-light italic leading-snug text-night-text text-balance sm:text-3xl">
          A Ponte não é um produto pronto que se ativa. É uma camada que{' '}
          <span className="text-night-green-bright">amadurece com o uso.</span>
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-night-text-soft">
          O contexto da empresa cresce de forma progressiva — quanto mais a
          operação alimenta, mais rica a leitura de cada conversa e decisão.
        </p>
      </div>

      <ol className="mt-10 space-y-0">
        {CAMADAS.map((c, i) => (
          <li key={c.n} className="relative flex gap-5 pb-9 last:pb-0">
            {i < CAMADAS.length - 1 && (
              <span aria-hidden="true" className="absolute left-[17px] top-10 h-[calc(100%-1.25rem)] w-px bg-gradient-to-b from-night-teal/40 to-night-teal/10" />
            )}
            <span
              aria-hidden="true"
              className={`relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-sm font-semibold ${
                i === CAMADAS.length - 1
                  ? 'dot-green border-night-green/50 text-white'
                  : 'border-night-700/70 bg-night-800 text-night-teal'
              }`}
            >
              {c.n}
            </span>
            <div className="pt-1">
              <p className="font-editorial text-xl font-light text-night-text">{c.titulo}</p>
              <p className="mt-1.5 max-w-md text-sm leading-relaxed text-night-text-soft">{c.texto}</p>
            </div>
          </li>
        ))}
      </ol>

      <p className="mx-auto mt-8 max-w-md text-center text-xs italic leading-relaxed text-night-text-dim">
        Esses são os planos da evolução — a direção que guia a construção, não
        recursos já prometidos.
      </p>
    </div>
  )
}