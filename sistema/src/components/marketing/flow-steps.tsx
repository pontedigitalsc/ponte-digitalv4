const PASSOS = [
  {
    n: '01',
    titulo: 'Observar',
    texto: 'Você conta como as coisas funcionam. A Ponte escuta o que já está acontecendo — sem pressa.',
  },
  {
    n: '02',
    titulo: 'Conectar',
    texto: 'O que foi dito ganha estrutura, e informações de mundos diferentes começam a conversar entre si.',
  },
  {
    n: '03',
    titulo: 'Compreender',
    texto: 'O que parecia isolado pode revelar uma relação — e a relação muda a leitura.',
  },
  {
    n: '04',
    titulo: 'Questionar',
    texto: 'Antes de uma resposta pronta, uma pergunta melhor: é aqui que a decisão começa a melhorar.',
  },
  {
    n: '05',
    titulo: 'Decidir',
    texto: 'A decisão continua sendo sua — agora, sobre uma base mais clara.',
  },
  {
    n: '06',
    titulo: 'A realidade evolui',
    texto: 'A próxima conversa parte de um lugar melhor. O olhar sobre a empresa constrói memória.',
  },
]

/**
 * O fluxo mental da Ponte — não um roteiro, mas uma forma de pensar:
 * observar → conectar → compreender → questionar → decidir → evoluir.
 * Camada Rodada 3: timeline vertical em balões translúcidos, nós verdes
 * com luz interna, fio teal correndo entre eles.
 */
export function FlowSteps() {
  return (
    <ol className="mx-auto max-w-md space-y-0">
      {PASSOS.map((p, i) => (
        <li key={p.n} className="relative flex gap-5 pb-8 last:pb-0">
          {i < PASSOS.length - 1 && (
            <span aria-hidden="true" className="absolute left-[15px] top-8 h-[calc(100%-1.25rem)] w-px bg-gradient-to-b from-night-teal/40 to-night-teal/10" />
          )}
          <span className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-night-700/70 bg-night-800 text-xs font-semibold text-night-teal shadow-[0_0_16px_-4px_hsl(var(--l-teal)/0.5)]">
            {p.n}
          </span>
          <div className="pt-0.5">
            <p className="font-editorial text-lg font-light tracking-tight text-night-text">{p.titulo}</p>
            <p className="mt-1 text-sm leading-relaxed text-night-text-soft">{p.texto}</p>
          </div>
        </li>
      ))}
    </ol>
  )
}
