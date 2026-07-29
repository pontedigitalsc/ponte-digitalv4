interface EspelhoCardProps {
  saudacao: string
  nomeUsuario: string
  identidade: string
  forcas: string[]
  riscos: string[]
  transformacao: string | null
  ultimos90Dias: string
}

export function EspelhoCard({ saudacao, nomeUsuario, identidade, forcas, riscos, transformacao, ultimos90Dias }: EspelhoCardProps) {
  return (
    <div className="rounded-xl border bg-card p-6 space-y-5">
      <div>
        <p className="text-sm text-muted-foreground">{saudacao}, {nomeUsuario}</p>
        <p className="text-lg font-semibold mt-1 leading-relaxed">{identidade}</p>
      </div>

      {transformacao && (
        <div className="rounded-lg bg-primary/5 p-4 text-sm leading-relaxed text-card-foreground/90">
          {transformacao}
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        {forcas.length > 0 && (
          <div className="space-y-1.5">
            <p className="text-xs font-medium text-emerald-600 dark:text-emerald-500 uppercase tracking-wider">Forças</p>
            <ul className="space-y-1">
              {forcas.map((f, i) => (
                <li key={i} className="text-sm text-card-foreground/80 flex items-start gap-2">
                  <span className="text-emerald-500 mt-0.5 shrink-0">●</span>
                  {f}
                </li>
              ))}
            </ul>
          </div>
        )}
        {riscos.length > 0 && (
          <div className="space-y-1.5">
            <p className="text-xs font-medium text-amber-600 dark:text-amber-500 uppercase tracking-wider">Atenção</p>
            <ul className="space-y-1">
              {riscos.map((r, i) => (
                <li key={i} className="text-sm text-card-foreground/80 flex items-start gap-2">
                  <span className="text-amber-500 mt-0.5 shrink-0">●</span>
                  {r}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {ultimos90Dias && (
        <p className="text-xs text-muted-foreground/70 leading-relaxed">{ultimos90Dias}</p>
      )}
    </div>
  )
}
