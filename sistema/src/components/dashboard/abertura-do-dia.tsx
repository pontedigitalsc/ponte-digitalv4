import Link from 'next/link'
import { AvatarPonte } from '@/components/ui/avatar'
import type { AberturaPermanente, PrioridadeAssunto } from '@/engine/motor-continuacao'

const MARCA_PRIORIDADE: Record<PrioridadeAssunto, string> = {
  ALTA: 'algo para pensarmos hoje',
  MEDIA: 'algo que vale observar',
  BAIXA: 'uma conversa para quando puder',
}

// P69.5 — Presença Cognitiva Permanente. A abertura NÃO é um dashboard nem um
// card. É a CONTINUIDADE DA CONVERSA:
//
//   continuidade → observação → conexão → prioridade → convite
//
// A Ponte começa mostrando que lembra, interpreta o que viu, liga fatos
// separados, explica POR QUE vale conversar e convida como um conselheiro —
// nunca com botões de sistema, listas, KPIs ou "você possui".
export function AberturaDoDia({ data }: { data: AberturaPermanente }) {
  return (
    <section className="rounded-2xl bg-gradient-to-b from-card to-muted/20 p-6 sm:p-8 animate-fade-in space-y-7">
      {/* Presença — a Ponte lembra */}
      <div className="flex items-start gap-4">
        <AvatarPonte
          state={data.momento.tipo === 'NADA_URGENTE' ? 'breathing' : 'thinking'}
          size="md"
        />
        <div className="space-y-1 pt-1">
          <p className="text-lg sm:text-xl font-semibold leading-snug tracking-tight">
            {data.saudacao}
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed" data-testid="moment-frase">
            {data.momento.frase}
          </p>
        </div>
      </div>

      {/* Camada 1 — Continuidade */}
      <p className="text-sm sm:text-base text-foreground leading-relaxed">
        {data.continuidade}
      </p>
      <p className="text-sm sm:text-base text-foreground leading-relaxed">
        Enquanto você esteve trabalhando na empresa, algumas coisas continuaram chamando
        minha atenção.
      </p>

      {/* Camada 2 — Observação */}
      <div className="rounded-xl border-l-2 border-primary/40 bg-background/60 p-4">
        <p className="text-sm sm:text-base text-foreground leading-relaxed">
          {data.observacao}
        </p>
      </div>

      {/* Camada 3 — Conexão */}
      {data.conexao && (
        <div className="rounded-xl border border-dashed border-primary/20 bg-background/60 p-4">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-primary/70">
            Uma conexão que me chamou atenção
          </p>
          <p className="mt-1.5 text-sm sm:text-base text-foreground leading-relaxed">
            {data.conexao}
          </p>
        </div>
      )}

      {/* Camada 4 — Prioridade (por que conversar) */}
      <p className="text-sm sm:text-base text-foreground leading-relaxed">{data.prioridade}</p>

      {/* Assuntos — pequenas conversas, nunca cards */}
      <div className="space-y-4">
        {data.assuntos.map((assunto) => (
          <Link
            key={assunto.id}
            href={assunto.rota}
            className="block rounded-xl border border-border bg-background p-5 transition-all hover:border-primary/30 hover:bg-muted/30"
          >
            <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/70">
              {MARCA_PRIORIDADE[assunto.prioridade]}
            </p>
            <p className="mt-2 text-sm sm:text-base text-foreground leading-relaxed">
              {assunto.fala}
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <p className="text-sm font-medium text-primary">{assunto.pergunta}</p>
              <div className="flex flex-wrap gap-1.5">
                {assunto.opcoes.map((opcao) => (
                  <span
                    key={opcao}
                    className="rounded-full border border-border px-3 py-1 text-[11px] text-muted-foreground"
                  >
                    {opcao}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Camada 5 — Convite (parece conversa, não botão) */}
      <div className="flex items-center justify-between gap-4 pt-1">
        <p className="text-sm text-muted-foreground italic leading-relaxed">{data.convite}</p>
        <Link
          href="/conversa"
          className="shrink-0 rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 active:scale-[0.98]"
        >
          Vamos pensar nisso juntos.
        </Link>
      </div>
    </section>
  )
}