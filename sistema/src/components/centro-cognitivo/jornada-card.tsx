interface MarcosJornada {
  data: string
  titulo: string
  descricao: string
  tipo: 'conquista' | 'aprendizado' | 'evolucao' | 'decisao'
}

interface JornadaCardProps {
  marcos: MarcosJornada[]
  capacidadeMaisEvoluida: { nome: string; variacao: number } | null
}

export function JornadaCard({ marcos, capacidadeMaisEvoluida }: JornadaCardProps) {
  return (
    <div className="rounded-xl border bg-card p-6 space-y-4">
      <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Jornada Evolutiva</h3>

      {capacidadeMaisEvoluida && (
        <div className="rounded-lg bg-primary/5 p-3 text-sm">
          <span className="text-muted-foreground">Maior evolução: </span>
          <span className="font-medium">{capacidadeMaisEvoluida.nome}</span>
          <span className="text-emerald-500 ml-1">+{capacidadeMaisEvoluida.variacao}%</span>
        </div>
      )}

      {marcos.length > 0 ? (
        <div className="space-y-0">
          {marcos.slice(0, 5).map((m, i) => (
            <div key={i} className="flex gap-3 py-2.5 border-l-2 border-border/40 pl-4 ml-1 relative">
              <div className={`absolute -left-[5.5px] top-3.5 w-2 h-2 rounded-full ${
                m.tipo === 'conquista' ? 'bg-emerald-500' :
                m.tipo === 'aprendizado' ? 'bg-blue-500' :
                m.tipo === 'evolucao' ? 'bg-primary' : 'bg-amber-500'
              }`} />
              <div className="space-y-0.5 min-w-0">
                <p className="text-sm font-medium truncate">{m.titulo}</p>
                <p className="text-xs text-muted-foreground/70 line-clamp-2">{m.descricao}</p>
                <p className="text-[10px] text-muted-foreground/40">{m.data}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-muted-foreground/60">Sua jornada começa aqui. Complete seu diagnóstico para gerar os primeiros marcos.</p>
      )}
    </div>
  )
}
