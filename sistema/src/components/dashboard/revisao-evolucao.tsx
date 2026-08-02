import Link from 'next/link'
import { AvatarPonte } from '@/components/ui/avatar'

// P52 — Ritual mensal "Revisão da Evolução". A Ponte inicia o ciclo:
// "Passou mais um ciclo. Vamos olhar juntos o que mudou?" e mostra os quatro
// momentos da evolução com dados reais da relação.

export interface RevisaoEvolucaoData {
  diasDesdeUltimaConversa: number
  antes: string | null
  durante: string[]
  depois: string[]
  proximo: string | null
}

export function RevisaoEvolucao({ data }: { data: RevisaoEvolucaoData }) {
  return (
    <section className="rounded-xl border border-dashed border-primary/30 bg-primary/5 p-6 space-y-5 animate-fade-in">
      <div className="flex items-center gap-3">
        <AvatarPonte state="thinking" size="sm" />
        <div>
          <h2 className="text-base font-semibold tracking-tight">Revisão da Evolução</h2>
          <p className="text-xs text-muted-foreground">
            Passou mais de um mês desde nossa última conversa. Vamos olhar juntos o que mudou?
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Antes — o que preocupava</p>
          <p className="text-sm text-muted-foreground leading-relaxed border-l-2 border-muted pl-3">
            {data.antes ?? 'Quando começamos, ainda não tínhamos conversas suficientes para mapear suas preocupações.'}
          </p>
        </div>

        <div className="space-y-1.5">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Durante — o que foi decidido</p>
          {data.durante.length > 0 ? (
            <ul className="space-y-1">
              {data.durante.map((d, i) => (
                <li key={i} className="text-sm text-muted-foreground leading-relaxed border-l-2 border-muted pl-3">{d}</li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground">As primeiras decisões ainda estão sendo construídas conosco.</p>
          )}
        </div>

        <div className="space-y-1.5">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Depois — o que aprendemos</p>
          {data.depois.length > 0 ? (
            <ul className="space-y-1">
              {data.depois.map((d, i) => (
                <li key={i} className="text-sm text-muted-foreground leading-relaxed border-l-2 border-muted pl-3">{d}</li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground">Cada conversa soma aprendizado — o patrimônio continua crescendo.</p>
          )}
        </div>

        <div className="space-y-1.5">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Próximo — o que merece atenção agora</p>
          <p className="text-sm text-muted-foreground leading-relaxed border-l-2 border-muted pl-3">
            {data.proximo ?? 'O próximo passo é retomar a conversa e olhar o presente da empresa.'}
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-2 pt-1">
        <Link
          href="/conversa"
          className="rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors text-center"
        >
          Quero continuar essa conversa
        </Link>
        <Link
          href="/minha-jornada"
          className="rounded-lg border border-border bg-card px-5 py-2.5 text-sm text-foreground hover:bg-muted/50 transition-colors text-center"
        >
          Ver minha história
        </Link>
      </div>
    </section>
  )
}
