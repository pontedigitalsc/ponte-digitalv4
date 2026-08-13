/**
 * Carga cognitiva — o custo invisível de manter uma empresa de pé: lembrar,
 * anotar, procurar, copiar, confirmar, avisar, atualizar. À esquerda, o fluxo
 * tradicional (essas ações se multiplicam); à direita, a leitura proposta
 * pela Ponte (compreensão → perguntas melhores → decisões melhores).
 *
 * As oito dimensões da coluna da direita vêm do MOTOR REAL — a função
 * avaliarCargaCognitivaPorProcesso (engine/copiloto-operacional.ts) mede
 * exatamente: Decisões, Memória, Digitação, Repetição, Consulta,
 * Ferramentas, Exceções, Intervenção do gerente. Não são nomes inventados
 * para o cartão de marketing: são as dimensões que o sistema já calcula.
 */

const ENCARGO_TRADICIONAL = [
  { nivel: 'Exceções', descricao: 'cada caso fora do padrão muda o caminho manualmente' },
  { nivel: 'Memória', descricao: 'manter na cabeça o que aconteceu antes' },
  { nivel: 'Digitação', descricao: 'repassar o dado de um lugar para outro' },
  { nivel: 'Repetição', descricao: 'fazer a mesma tarefa quando nada mudou de fato' },
  { nivel: 'Consulta', descricao: 'procurar a informação certo de que ela existe' },
  { nivel: 'Ferramentas', descricao: 'abrir N sistemas para juntar uma só resposta' },
  { nivel: 'Intervenção do gerente', descricao: 'parar o fluxo para uma decisão que poderia ser preparada' },
]

const FLUXO_PONTE = [
  { passo: 'Falar', descricao: 'você me conta como funciona hoje' },
  { passo: 'Organizar', descricao: 'o que foi dito ganha relação com o que já existe' },
  { passo: 'Perguntar quando necessário', descricao: 'não decide por você — pede o que falta saber' },
  { passo: 'Preparar a decisão', descricao: 'devolve contexto para você decidir melhor' },
]

/**
 * As oito dimensões reais do motor do Copiloto. Fonte: engine/
 * copiloto-operacional.ts — avaliarCargaCognitivaPorProcesso.
 */
const DIMENSOES_MOTOR = [
  'Decisões',
  'Memória',
  'Digitação',
  'Repetição',
  'Consulta',
  'Ferramentas',
  'Exceções',
  'Intervenção do gerente',
]

export function CargaCognitiva() {
  return (
    <div className="mx-auto max-w-4xl">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-night-teal">
          A carga invisível
        </p>
        <h2 className="mt-3 font-editorial text-3xl font-light leading-tight text-night-text text-balance sm:text-4xl">
          Antes, a empresa exigia{' '}
          <span className="italic text-night-mist">lembrar, anotar, procurar, copiar, confirmar, avisar.</span>
        </h2>
        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-night-text-soft">
          Boa parte do trabalho de gestão é esse esforço invisível por trás de
          cada decisão. A Ponte procura reduzir exatamente essa carga — com a
          operação contada por quem vive ela.
        </p>
      </div>

      <div className="mt-12 grid gap-5 lg:grid-cols-[1fr_auto_1fr] lg:items-center">
        {/* O modelo tradicional: carga que se multiplica */}
        <div className="rounded-3xl border border-night-700/50 bg-night-850/60 px-5 py-7 backdrop-blur-sm sm:px-6">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-night-text-dim">
            O modelo tradicional
          </p>
          <p className="mt-1 font-editorial text-lg font-light italic text-night-text">
            cada caso, um esforço novo.
          </p>
          <ul className="mt-5 space-y-3">
            {ENCARGO_TRADICIONAL.map((item) => (
              <li key={item.nivel} className="rounded-2xl border border-night-700/50 bg-night-900/50 px-4 py-3">
                <p className="text-sm font-medium text-night-text">{item.nivel}</p>
                <p className="mt-0.5 text-xs leading-relaxed text-night-text-dim">{item.descricao}</p>
              </li>
            ))}
          </ul>
        </div>

        <span aria-hidden="true" className="hidden justify-self-center text-2xl text-night-teal/70 lg:block">
          →
        </span>

        {/* A leitura da Ponte */}
        <div className="rounded-3xl border border-night-green/40 bg-[radial-gradient(120%_100%_at_100%_0%,hsl(var(--l-green)/0.12),transparent_65%)] bg-night-800/80 px-5 py-7 sm:px-6">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-night-green-bright">
            A leitura da Ponte
          </p>
          <p className="mt-1 font-editorial text-lg font-light italic text-night-green-bright">
            compreensão, em vez de mais telas.
          </p>
          <ol className="mt-5 space-y-3">
            {FLUXO_PONTE.map((step, i) => (
              <li key={step.passo} className="flex items-start gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-night-700/70 bg-night-850 text-xs font-semibold text-night-teal">
                  {i + 1}
                </span>
                <div className="pt-0.5">
                  <p className="text-sm font-medium text-night-text">{step.passo}</p>
                  <p className="mt-0.5 text-xs leading-relaxed text-night-text-soft">{step.descricao}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* As dimensões vêm do motor real — não é rótulo decorativo */}
      <div className="mx-auto mt-8 max-w-2xl">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-night-text-dim">
          O motor já mede essas dimensões
        </p>
        <div className="mt-3 flex flex-wrap justify-center gap-2">
          {DIMENSOES_MOTOR.map((d) => (
            <span key={d} className="pill px-3 py-1 text-xs text-night-text-soft">
              {d}
            </span>
          ))}
        </div>
        <p className="mx-auto mt-4 max-w-md text-center text-xs italic leading-relaxed text-night-text-dim">
          O Copiloto avalia a carga por processo em oito dimensões — da decisão
          à intervenção do gerente. Isso já existe: quando a Ponte conhece a
          operação, ela passa a enxergar onde o esforço se concentra.
        </p>
      </div>
    </div>
  )
}