const PASSOS = [
  { n: '01', titulo: 'Você conta.', texto: 'O que está acontecendo?' },
  { n: '02', titulo: 'A Ponte organiza.', texto: 'O que foi dito ganha estrutura.' },
  { n: '03', titulo: 'A Ponte conecta.', texto: 'Informações diferentes começam a conversar entre si.' },
  { n: '04', titulo: 'A Ponte devolve uma leitura.', texto: 'O que parece isolado pode revelar uma relação.' },
  { n: '05', titulo: 'Você decide.', texto: 'A decisão continua sendo sua.' },
  { n: '06', titulo: 'A realidade evolui.', texto: 'E a próxima conversa parte de um lugar melhor.' },
]

export function FlowSteps() {
  return (
    <ol className="mx-auto max-w-md space-y-0">
      {PASSOS.map((p, i) => (
        <li key={p.n} className="relative flex gap-5 pb-8 last:pb-0">
          {i < PASSOS.length - 1 && (
            <span
              aria-hidden="true"
              className="absolute left-[15px] top-8 h-[calc(100%-1.25rem)] w-px bg-border"
            />
          )}
          <span className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border bg-card text-xs font-semibold text-primary">
            {p.n}
          </span>
          <div className="pt-0.5">
            <p className="text-base font-semibold tracking-tight text-foreground">{p.titulo}</p>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{p.texto}</p>
          </div>
        </li>
      ))}
    </ol>
  )
}
