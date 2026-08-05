import Link from 'next/link'
import { AvatarPonte } from '@/components/ui/avatar'
import type { AgendaDoDia } from '@/engine/motor-continuacao'

const PRIORIDADE_LABEL = { ALTA: 'Atenção hoje', MEDIA: 'Vale observar', BAIXA: 'Quando puder' }

// P69 — Conversa Permanente: a abertura da Ponte. Antes de qualquer módulo,
// o empresário encontra "Hoje vale conversarmos sobre...": uma agenda montada
// da história da empresa. Toda abertura dura menos de um minuto. Quando não há
// um motivo legítimo, aparece apenas a mensagem gentil de disponibilidade —
// nunca um pedido artificial de voltar.
export function AberturaDoDia({ data }: { data: AgendaDoDia }) {
  return (
    <section className="rounded-xl border border-primary/20 bg-card p-6 animate-fade-in space-y-5">
      <div className="flex items-center gap-3">
        <AvatarPonte state={data.vazia ? 'breathing' : 'thinking'} size="md" />
        <div className="space-y-0.5">
          <h2 className="text-lg font-semibold tracking-tight">
            Hoje vale conversarmos sobre...
          </h2>
          <p className="text-xs text-muted-foreground">
            Desde nossa última conversa, algumas coisas podem ter mudado.
          </p>
        </div>
      </div>

      {data.vazia ? (
        <div className="rounded-lg bg-muted/50 p-4 space-y-2">
          <p className="text-sm text-muted-foreground leading-relaxed">
            {data.mensagemVazia}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {data.itens.map((item) => (
            <Link
              key={item.id}
              href={item.rota}
              className="block rounded-lg border border-border bg-background p-4 space-y-2 transition-colors hover:border-primary/40 hover:bg-muted/40"
            >
              <div className="flex items-center justify-between gap-2">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-primary/70">
                  {PRIORIDADE_LABEL[item.prioridade]}
                </p>
                <span className="text-[10px] text-muted-foreground/60">{item.titulo}</span>
              </div>
              <p className="text-sm font-medium leading-relaxed">{item.contexto}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.pergunta}</p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {item.opcoes.map((opcao) => (
                  <span
                    key={opcao}
                    className="rounded-full border border-border bg-card px-3 py-1 text-[11px] text-muted-foreground"
                  >
                    {opcao}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between gap-3 pt-1">
        <p className="text-xs text-muted-foreground italic">{data.convite}</p>
        <Link
          href="/conversa"
          className="shrink-0 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          Conversar agora
        </Link>
      </div>
    </section>
  )
}