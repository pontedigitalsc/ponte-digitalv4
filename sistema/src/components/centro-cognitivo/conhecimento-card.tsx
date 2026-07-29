interface ConhecimentoGerado {
  descricao: string
  categoria: string
  confianca: number
  data: string
}

interface ConhecimentoCardProps {
  conhecimentos: ConhecimentoGerado[]
}

export function ConhecimentoCard({ conhecimentos }: ConhecimentoCardProps) {
  if (conhecimentos.length === 0) return null

  return (
    <div className="rounded-xl border bg-card p-6 space-y-4">
      <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Conhecimento Gerado</h3>
      <div className="space-y-3">
        {conhecimentos.slice(0, 3).map((c, i) => (
          <div key={i} className="space-y-1.5">
            <p className="text-sm leading-relaxed text-card-foreground/90">{c.descricao}</p>
            <div className="flex items-center gap-2 text-[10px] text-muted-foreground/60 uppercase tracking-wider">
              <span>{c.categoria}</span>
              <span>·</span>
              <span>Confiança {c.confianca}%</span>
              {c.data && <><span>·</span><span>{c.data}</span></>}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
