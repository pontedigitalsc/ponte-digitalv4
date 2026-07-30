interface RitualCardProps {
  ondeEstamos: string
  oqueMudou: string | null
  oqueMereceAtencao: string | null
  oquePodeEsperar: string | null
  proximoMovimento: string | null
  etapaCiclo: string
}

const CICLO_ETAPAS = [
  'Observação', 'Compreensão', 'Clareza', 'Priorização',
  'Decisão', 'Execução', 'Aprendizado', 'Incorporação',
]

export function RitualCard({ ondeEstamos, oqueMudou, oqueMereceAtencao, oquePodeEsperar, proximoMovimento, etapaCiclo }: RitualCardProps) {
  const idxAtual = CICLO_ETAPAS.findIndex(e => e.toLowerCase() === etapaCiclo.toLowerCase())

  return (
    <div className="rounded-xl border bg-card p-6 space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Ritual Diário</h3>
        <div className="flex items-center gap-1.5">
          {CICLO_ETAPAS.map((etapa, i) => (
            <div
              key={etapa}
              className={`h-1.5 w-1.5 rounded-full transition-colors ${
                i <= idxAtual ? 'bg-primary' : 'bg-muted-foreground/20'
              }`}
              title={etapa}
            />
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <div>
          <p className="text-xs text-muted-foreground mb-0.5">Onde estamos</p>
          <p className="text-sm font-medium leading-relaxed">{ondeEstamos}</p>
        </div>

        {oqueMudou && (
          <div>
            <p className="text-xs text-muted-foreground mb-0.5">O que mudou</p>
            <p className="text-sm leading-relaxed text-card-foreground/80">{oqueMudou}</p>
          </div>
        )}

        {oqueMereceAtencao && (
          <div>
            <p className="text-xs text-muted-foreground mb-0.5">Merece atenção</p>
            <p className="text-sm leading-relaxed text-amber-600 dark:text-amber-500">{oqueMereceAtencao}</p>
          </div>
        )}

        {oquePodeEsperar && (
          <div>
            <p className="text-xs text-muted-foreground mb-0.5">Quem precisa de você</p>
            <p className="text-sm leading-relaxed text-card-foreground/60">{oquePodeEsperar}</p>
          </div>
        )}

        {proximoMovimento && (
          <div className="pt-2 border-t border-border/40">
            <p className="text-xs text-muted-foreground mb-0.5">Próximo movimento</p>
            <p className="text-sm font-semibold text-primary">{proximoMovimento}</p>
          </div>
        )}
      </div>

      <div className="flex items-center gap-2 pt-1">
        <span className="text-[10px] text-muted-foreground/50 uppercase tracking-wider">Ciclo:</span>
        <span className="text-xs font-medium text-primary">{etapaCiclo}</span>
      </div>
    </div>
  )
}
