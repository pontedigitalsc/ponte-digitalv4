const ETAPAS = [
  'O que observamos',
  'Por que isso chamou atenção',
  'O que pode significar',
  'O que vale investigar',
]

export function EvidenceFlow() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-0">
      {ETAPAS.map((etapa, i) => (
        <div key={etapa} className="flex items-center gap-3 sm:gap-0">
          <div className="rounded-xl border border-border/70 px-4 py-3 text-center text-sm text-foreground sm:min-w-[150px]">
            {etapa}
          </div>
          {i < ETAPAS.length - 1 && (
            <span aria-hidden="true" className="text-muted-foreground/40 sm:mx-3 sm:rotate-0 rotate-90">
              →
            </span>
          )}
        </div>
      ))}
    </div>
  )
}
