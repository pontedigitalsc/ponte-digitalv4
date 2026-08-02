import type { Conquista } from '@/engine/celebracao-service'

// P53 — Celebrações de Evolução: as conquistas não são apenas de dinheiro.
// A Ponte celebra regularidade do hábito, aprendizados, decisões confirmadas
// e o amadurecimento da relação — sempre a partir de dados reais.

export function Celebracoes({ conquistas }: { conquistas: Conquista[] }) {
  if (conquistas.length === 0) return null

  return (
    <section className="rounded-xl border border-emerald-500/15 bg-card p-6 space-y-4 animate-fade-in">
      <div>
        <h2 className="text-base font-semibold tracking-tight">Suas conquistas</h2>
        <p className="text-xs text-muted-foreground">Marcos de evolução — não apenas dinheiro</p>
      </div>

      <div className="space-y-3">
        {conquistas.map((c) => (
          <div key={c.titulo} className="flex gap-3 items-start border-l-2 border-emerald-500/40 pl-3">
            <span className="text-xl leading-none mt-0.5">{c.icone}</span>
            <div className="space-y-0.5">
              <p className="text-sm font-medium">{c.titulo}</p>
              <p className="text-xs text-muted-foreground leading-relaxed">{c.descricao}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
