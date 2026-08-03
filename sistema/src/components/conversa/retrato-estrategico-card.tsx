import type { RetratoEstrategico } from '@/engine/retrato-estrategico'

interface RetratoEstrategicoCardProps {
  retrato: RetratoEstrategico
}

export function RetratoEstrategicoCard({ retrato }: RetratoEstrategicoCardProps) {
  return (
    <div className="space-y-5 animate-fade-in">
      <div className="text-center space-y-2">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-primary/70">
          Primeira Sessão Estratégica da sua empresa
        </p>
        <h3 className="text-lg font-semibold tracking-tight">{retrato.titulo}</h3>
        <p className="text-xs text-muted-foreground leading-relaxed max-w-md mx-auto">
          Cada parte diz o que percebemos, por que percebemos — e o que eu faria. Nada aqui é genérico: foi escrito a partir do que você contou.
        </p>
      </div>

      <div className="space-y-4">
        {retrato.secoes.map((secao) => (
          <div key={secao.numero} className="rounded-xl border bg-card p-5 space-y-3">
            <div className="flex items-center gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                {secao.numero}
              </span>
              <p className="text-sm font-semibold">{secao.titulo}</p>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">{secao.corpo}</p>
            {secao.itens && (
              <ul className="space-y-1.5">
                {secao.itens.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground leading-relaxed">
                    <span className="mt-0.5 text-emerald-500" aria-hidden>✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-dashed border-primary/30 bg-card/50 p-5 space-y-2">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-primary">
          Pergunta que continuaremos acompanhando
        </p>
        <p className="text-sm text-foreground leading-relaxed italic">
          {retrato.proximaReflexao}
        </p>
      </div>

      <p className="text-center text-xs text-muted-foreground italic leading-relaxed">
        {retrato.aviso}
      </p>
    </div>
  )
}
