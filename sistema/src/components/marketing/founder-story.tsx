const ESTAGIOS = [
  {
    nome: 'Fazer',
    texto:
      'Muitos anos experimentando na prática: processos, atendimento, planilhas, clientes — aprender fazendo, com o dia a dia das empresas.',
  },
  {
    nome: 'Perceber',
    texto:
      'Notar que os problemas se repetiam: informação existia, mas vivia separada — e a falta de conexão virava ruído na gestão.',
  },
  {
    nome: 'Questionar',
    texto:
      'Começar a perguntar se a resposta era mais uma ferramenta — ou uma forma diferente de compreender a própria empresa.',
  },
  {
    nome: 'Construir',
    texto:
      'Entrar em contato com CRMs, automações, integrações, formulários, WhatsApp, tentativas e erros — e, ao construir, refinar a pergunta.',
  },
  {
    nome: 'Construir junto',
    texto:
      'Descobrir que a pergunta faz mais sentido com outras empresas. É nesse ponto que a Ponte está agora: uma construção aberta, com quem quer caminhar.',
  },
]

const FATOS = [
  'experimentação',
  'clientes reais',
  'planilhas',
  'CRM',
  'automação',
  'WhatsApp',
  'formulários',
  'integrações',
  'tentativas',
  'erros',
  'construção técnica',
  'refinamentos',
]

/**
 * A história da Ponte e de Kelven — somente fatos documentados. Trajetória
 * apresentada em estágios (Fazer → Perceber → Questionar → Construir →
 * Construir junto), sem transformá-lo em gênio visionário: é um construtor
 * que aprendeu na prática e decidiu construir de um jeito diferente. A
 * pergunta central é o coração da seção.
 */
export function FounderStory() {
  return (
    <div className="mx-auto max-w-3xl">
      <div className="mx-auto max-w-xl text-center">
        <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-night-teal">
          A história da Ponte
        </p>
        <h2 className="mt-3 font-editorial text-3xl font-light leading-tight text-night-text text-balance sm:text-4xl">
          Não nasceu no papel. Nasceu{' '}
          <span className="italic text-night-mist">fazendo</span>, errando e perguntando.
        </h2>
      </div>

      <ol className="mt-10 space-y-0">
        {ESTAGIOS.map((e, i) => (
          <li key={e.nome} className="relative flex gap-5 pb-9 last:pb-0">
            {i < ESTAGIOS.length - 1 && (
              <span aria-hidden="true" className="absolute left-[15px] top-8 h-[calc(100%-1.25rem)] w-px bg-gradient-to-b from-night-teal/40 to-night-teal/10" />
            )}
            <span
              aria-hidden="true"
              className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-xs font-semibold ${
                i === ESTAGIOS.length - 1
                  ? 'dot-green border-night-green/50 text-white'
                  : 'border-night-700/70 bg-night-800 text-night-teal'
              }`}
            >
              {i + 1}
            </span>
            <div className="pt-0.5">
              <p className="font-editorial text-xl font-light text-night-text">{e.nome}</p>
              <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-night-text-soft">{e.texto}</p>
            </div>
          </li>
        ))}
      </ol>

      <div className="balloon mt-10 px-6 py-7">
        <p className="font-editorial text-lg font-light italic leading-snug text-night-text sm:text-xl">
          E se uma empresa pudesse compreender melhor a própria realidade através
          das informações que já produz?
        </p>
        <p className="mt-3 text-sm leading-relaxed text-night-text-soft">
          Essa pergunta é o centro da Ponte. Quem está à frente dela não se
          apresenta como visionário — como alguém que construiu, aprendeu e
          decidiu tentar um caminho diferente, aberto a quem quiser caminhar junto.
        </p>
        <div className="mt-6 flex items-center gap-3 border-t border-night-700/60 pt-5">
          <span aria-hidden="true" className="dot-green h-2.5 w-2.5 rounded-full" />
          <div>
            <p className="text-sm font-semibold text-night-text">Kelven</p>
            <p className="text-xs text-night-text-dim">fundador da Ponte Digital</p>
          </div>
        </div>
      </div>

      <ul className="mt-8 flex flex-wrap justify-center gap-2">
        {FATOS.map((f) => (
          <li key={f} className="pill px-3.5 py-1.5 text-xs text-night-text-dim">
            {f}
          </li>
        ))}
      </ul>
    </div>
  )
}