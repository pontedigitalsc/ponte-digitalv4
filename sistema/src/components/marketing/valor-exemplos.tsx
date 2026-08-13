import Link from 'next/link'

/**
 * Mostrar o valor antes de cadastrar: três situações do dia a dia de uma
 * empresa de materiais/obra — "o cliente aprovou", "chegou o material",
 * "a instalação foi remarcada" — lado a lado no fluxo tradicional (cada
 * passo vive separado) e na leitura proposta pela Ponte (o passo é um
 * sinal que se conecta ao que vem antes e depois).
 *
 * REGRA 13/14: são exemplos CONCEITUAIS, não promessa de funcionalidade
 * pronta. Não citam fornecedores, preços, tempos ou dados fictícios.
 * Todo cartão termina com o aviso "exemplo conceitual".
 */

interface Situacao {
  titulo: string
  dica: string
  tradicional: string[]
  ponte: string[]
}

const SITUACOES: Situacao[] = [
  {
    titulo: 'O cliente aprovou a obra.',
    dica: 'Saiba o que essa aprovação muda na frente.',
    tradicional: [
      'A aprovação pode não aparecer para quem executa.',
      'O próximo passo fica dependendo de lembrar.',
    ],
    ponte: [
      'A aprovação vira um sinal que se conecta ao orçamento e ao cronograma.',
      'O que mudou fica visível: o que agora é possível fazer.',
    ],
  },
  {
    titulo: 'Chegou o material.',
    dica: 'Saiba o que a chegada libera em toda a cadeia.',
    tradicional: [
      'A chegada é anotada num lugar, e quem precisava saber nem sempre descobre.',
      'Produção, execução e financeiro podem ficar sem a informação na hora certa.',
    ],
    ponte: [
      'A chegada se liga à obra, à equipe e ao prazo combinado.',
      'Quem precisa saber passa a saber — sem precisar “avisar todo mundo”.',
    ],
  },
  {
    titulo: 'A instalação foi remarcada.',
    dica: 'Saiba que a remarcação muda também a agenda da equipe.',
    tradicional: [
      'A nova data existe, mas a equipe pode descobrir só quando pergunta.',
      'O atraso de um cliente pode afetar o encaixe do próximo sem ser percebido.',
    ],
    ponte: [
      'A remarcação se conecta à agenda, à equipe e aos próximos compromissos.',
      'O impacto fica visível: a Ponte pergunta o que isso gera — não inventa resposta.',
    ],
  },
]

/**
 * Destaque de "exemplo conceitual" — o que a Ponte se propõe a fazer ainda é
 * direção, e isso precisa estar explícito em todo cartão conceitual.
 */
function MarcaConceitual() {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-night-700/70 bg-night-850 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-night-text-dim">
      <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-night-700" />
      exemplo conceitual
    </span>
  )
}

export function ValorExemplos() {
  return (
    <div className="mx-auto max-w-5xl">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-night-teal">
          O valor antes de cadastrar
        </p>
        <h2 className="mt-3 font-editorial text-3xl font-light leading-tight text-night-text text-balance sm:text-4xl">
          Em cada conversa que você já tem, existe uma{' '}
          <span className="italic text-night-mist">decisão esperando para ser informada.</span>
        </h2>
        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-night-text-soft">
          Três situações do dia a dia. Do lado de esquerda, o fluxo tradicional,
          em que cada passo precisa ser lembrado e avisado. Do lado de direita,
          a leitura que a Ponte procura construir: cada passo vira um sinal
          conectado aos demais.
        </p>
      </div>

      <div className="mt-12 space-y-5">
        {SITUACOES.map((situacao) => (
          <div
            key={situacao.titulo}
            className="grid gap-4 rounded-3xl border border-night-700/50 bg-night-900/60 p-5 backdrop-blur-sm sm:p-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-8"
          >
            {/* titulo + dica */}
            <div className="flex flex-col justify-between gap-6">
              <div>
                <h3 className="font-editorial text-xl font-normal leading-snug text-night-text sm:text-2xl">
                  {situacao.titulo}
                </h3>
                <p className="mt-2 text-sm text-night-text-dim">{situacao.dica}</p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <MarcaConceitual />
              </div>
            </div>

            {/* tradicional × ponte */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-night-700/50 bg-night-850/60 px-4 py-4">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-night-text-dim">
                  Sem a Ponte
                </p>
                <ul className="mt-3 space-y-2">
                  {situacao.tradicional.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-[13px] leading-relaxed text-night-text-soft">
                      <span aria-hidden="true" className="mt-[0.4em] h-1 w-1 shrink-0 rounded-full bg-night-700" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-night-green/40 bg-[radial-gradient(120%_100%_at_100%_0%,hsl(var(--l-green)/0.12),transparent_65%)] bg-night-800/80 px-4 py-4">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-night-green-bright">
                  Com a Ponte
                </p>
                <ul className="mt-3 space-y-2">
                  {situacao.ponte.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-[13px] leading-relaxed text-night-text">
                      <span aria-hidden="true" className="dot-green mt-[0.45em] h-1.5 w-1.5 shrink-0 rounded-full" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* fecho honesto da seção */}
      <div className="mx-auto mt-10 max-w-2xl text-center">
        <p className="text-sm leading-relaxed text-night-text-soft">
          Essas leituras são <span className="text-night-text">conceito</span> — a direção que
          a Ponte está construindo. Ela só pode acompanhar cada empresa depois de
          aprender, em conversa real, como aquela operação funciona.
        </p>
        <p className="mt-3 text-xs italic leading-relaxed text-night-text-dim">
          Exemplo conceitual: mostra como a Ponte pensa, não promete que isso já
          acontece em todos os clientes.
        </p>
        <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link href="/conversa" className="inline-flex items-center gap-2 rounded-xl bg-night-azure px-6 py-3 text-sm font-medium text-night-light-foreground shadow-[0_10px_28px_-10px_hsl(var(--l-azure)/0.55)] transition-colors hover:bg-night-mist">
            Conte como a sua funciona
          </Link>
        </div>
      </div>
    </div>
  )
}