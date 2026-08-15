const REALIDADES = [
  {
    nome: 'Barbearia',
    texto: 'Agenda, cadastro de clientes e o que acontece na conversa ficam em lugares diferentes.',
  },
  {
    nome: 'Lavação',
    texto: 'O histórico de cada cliente e a rotina da operação quase não conversam entre si.',
  },
  {
    nome: 'Oficina',
    texto: 'Ordem de serviço, peça, prazo e a confiança que vem do acompanhamento dividem telas.',
  },
  {
    nome: 'Estética',
    texto: 'A recorrência de cada cliente e o que ele procura poderiam contar uma mesma história.',
  },
  {
    nome: 'Pequenos negócios',
    texto: 'Informações que já existem, espalhadas em conversas, planilhas e sistemas simples.',
  },
]

const EXEMPLO_BARBEARIA = [
  { tipo: 'Sinal', titulo: 'O que mudou?', texto: 'O intervalo entre as visitas de um cliente aumentou.' },
  { tipo: 'Contexto', titulo: 'Histórico', texto: 'Esse cliente costumava voltar a cada três semanas.' },
  { tipo: 'Pergunta', titulo: 'Investigação', texto: 'O que mudou na experiência ou no ciclo dele?' },
]

const OPERACOES = [
  {
    nome: 'Serralheria',
    passos: ['orçamento', 'materiais', 'produção', 'instalação', 'financeiro'],
  },
  {
    nome: 'Lavação',
    passos: ['cliente', 'serviço', 'recorrência', 'equipe', 'financeiro'],
  },
  {
    nome: 'Barbearia',
    passos: ['cliente', 'agenda', 'atendimento', 'relacionamento', 'gestão'],
  },
]

/**
 * Quem pode usar — realidades concretas de pequenos negócios, sem inventar
 * números nem clientes. Cada cartão é uma situação comum, descrita como
 * observação do mundo, não como caso atendido pela Ponte. O exemplo da
 * barbearia mostra a lógica "O que mudou?" de forma explícitamente didática.
 */
export function Realities() {
  return (
    <div className="mx-auto max-w-4xl">
      <p className="mx-auto max-w-xl text-center text-sm leading-relaxed text-night-text-soft sm:text-base">
        Não é preciso ter um sistema complexo. Basta que as informações da
        empresa existam — mesmo espalhadas por conversas, planilhas e alguns
        controles simples.
      </p>

      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {REALIDADES.map((r) => (
          <div key={r.nome} className="balloon balloon-lift flex flex-col justify-between px-5 py-5">
            <div className="flex items-center gap-2.5">
              <span aria-hidden="true" className="dot-azure h-1.5 w-1.5 rounded-full" />
              <h3 className="font-editorial text-lg font-light text-night-text">{r.nome}</h3>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-night-text-soft">{r.texto}</p>
          </div>
        ))}
      </div>

      {/* exemplo didático da barbearia */}
      <div className="balloon mt-6 px-5 py-6 sm:px-7">
        <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-night-teal">
          Um exemplo de pergunta — ilustrativo
        </p>
        <div className="mt-4 grid gap-3 md:grid-cols-[1.4fr_1fr_1fr] md:items-stretch">
          {EXEMPLO_BARBEARIA.map((e) => (
            <div key={e.tipo} className="rounded-xl border border-night-700/60 bg-night-850 px-4 py-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-night-azure">{e.tipo}</p>
              <p className="mt-2 font-editorial text-lg font-light leading-snug text-night-text">{e.titulo}</p>
              <p className="mt-2 text-xs leading-relaxed text-night-text-soft">{e.texto}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs italic leading-relaxed text-night-text-dim">
          Exemplo conceitual — mostra o tipo de pergunta que a Ponte procura
          fazer, não um caso real.
        </p>
      </div>

      {/* como a Ponte pode investigar e organizar uma operação */}
      <div className="mt-6">
        <p className="text-left text-[10px] font-semibold uppercase tracking-[0.25em] text-night-teal">
          Como a Ponte pode investigar e organizar uma operação
        </p>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-night-text-soft">
          Em cada ramo, os acontecimentos formam uma cadeia. A Ponte procura
          compreender essa cadeia em conversa — e depois conectar cada elo ao
          que vem antes e depois.
        </p>

        <div className="mt-5 grid gap-3 lg:grid-cols-3">
          {OPERACOES.map((op) => (
            <div key={op.nome} className="balloon px-5 py-5">
              <h3 className="font-editorial text-lg font-light text-night-text">{op.nome}</h3>
              <ol className="mt-3 space-y-2">
                {op.passos.map((passo) => (
                  <li key={passo} className="flex items-center gap-2 text-sm text-night-text-soft">
                    <span className="dot-teal h-1 w-1 shrink-0 rounded-full" />
                    {passo}
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>

        <p className="mx-auto mt-4 max-w-2xl text-center text-xs italic leading-relaxed text-night-text-dim">
          São exemplos de como a Ponte pode investigar e organizar uma operação —
          não promessa de módulos já prontos. Cada empresa é compreendida em
          conversa real, do jeito que ela funciona.
        </p>
      </div>
    </div>
  )
}