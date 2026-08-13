/**
 * "A Ponte não substitui a empresa" — a fronteira honesta da camada. Em vez
 * de prometer que a inteligência "faz tudo", a Ponte é explícita sobre o que
 * ela NÃO faz (não inventa regra, não decide em silêncio, não apaga exceções,
 * não vira hipótese em fato) e o que ela AJUDA a fazer (enxergar, conectar,
 * perguntar, decidir — sempre com o julgamento de quem conhece a empresa).
 *
 * Essa não é uma página de desdobramento: é uma seção própria da landing,
 * porque o limite é parte do produto, não um aviso de rodapé.
 */

const NAO_FAZ = [
  {
    titulo: 'Não inventa regra',
    texto: 'Uma observação precisa se apoiar em algo observado — nunca em suposição tratada como regra.',
  },
  {
    titulo: 'Não decide em silêncio',
    texto: 'Se algo não pode ser respondido com confiança, ela pergunta — não chuta nos bastidores.',
  },
  {
    titulo: 'Não apaga exceções',
    texto: 'Casos fora do padrão continuam existindo. A Ponte não "normaliza" por cima da realidade.',
  },
  {
    titulo: 'Não vira hipótese em fato',
    texto: 'O que é interpretação continua interpretação, marcada como tal — até ser validada por quem entende.',
  },
]

const AJUDA_A = [
  {
    titulo: 'Enxergar',
    texto: 'o que já existe: sinais, fatos, consenso e divergência entre o que foi dito e o que acontece.',
  },
  {
    titulo: 'Conectar',
    texto: 'informações que estão em lugares separados, sem misturar o que é fato do que é hipótese.',
  },
  {
    titulo: 'Perguntar melhor',
    texto: 'antes de decidir — porque a pergunta bem feita é o começo de uma decisão bem informada.',
  },
  {
    titulo: 'Preparar a decisão',
    texto: 'devolvendo contexto e opções — mas quem decide, continua sendo você.',
  },
]

export function NaoSubstitui() {
  return (
    <div className="mx-auto max-w-4xl">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-night-teal">
          O limite faz parte do produto
        </p>
        <h2 className="mt-3 font-editorial text-3xl font-light leading-tight text-night-text text-balance sm:text-4xl">
          A Ponte não substitui a empresa.{' '}
          <span className="italic text-night-mist">Ela existe para informar quem decide.</span>
        </h2>
      </div>

      <div className="mt-12 grid gap-5 lg:grid-cols-2">
        {/* O que ela não faz */}
        <div className="rounded-3xl border border-night-700/50 bg-night-850/60 px-5 py-7 backdrop-blur-sm sm:px-6">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-night-text-dim">
            O que ela não faz
          </p>
          <ul className="mt-5 space-y-4">
            {NAO_FAZ.map((item) => (
              <li key={item.titulo} className="flex items-start gap-3">
                <span aria-hidden="true" className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-night-700 text-[11px] text-night-text-dim">
                  —
                </span>
                <div>
                  <p className="text-sm font-semibold text-night-text">{item.titulo}</p>
                  <p className="mt-0.5 text-sm leading-relaxed text-night-text-soft">{item.texto}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* O que ela ajuda a fazer */}
        <div className="rounded-3xl border border-night-green/40 bg-[radial-gradient(120%_100%_at_100%_0%,hsl(var(--l-green)/0.12),transparent_65%)] bg-night-800/80 px-5 py-7 sm:px-6">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-night-green-bright">
            O que ela ajuda a fazer
          </p>
          <ul className="mt-5 space-y-4">
            {AJUDA_A.map((item) => (
              <li key={item.titulo} className="flex items-start gap-3">
                <span aria-hidden="true" className="dot-green mt-1 h-2 w-2 shrink-0 rounded-full" />
                <div>
                  <p className="text-sm font-semibold text-night-text">{item.titulo}</p>
                  <p className="mt-0.5 text-sm leading-relaxed text-night-text-soft">{item.texto}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="mx-auto mt-8 max-w-xl text-center font-editorial text-xl font-light italic leading-snug text-night-text text-balance sm:text-2xl">
        Uma empresa que decide no improviso responde aos sinais atrasado. Uma
        empresa que enxerga antes, pergunta antes — e aí sim decide.
      </p>
    </div>
  )
}