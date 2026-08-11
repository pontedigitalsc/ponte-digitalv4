import Link from 'next/link'
import { Building2, ArrowRight, Inbox } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import type { StatusSolicitacaoFounderOp } from '@/engine/founder-operacoes'
import { rotuloEquipeFounder } from '@/lib/validations'
import { cn } from '@/lib/utils'

// ─── COMMAND CENTER FOUNDER (P91) ─────────────────────────────────────────────
// Painel de operação: cada solicitação de Founder em um card, filtrado por
// status. Simples de propósito — o importante é a próxima conversa, não um
// kanban pesado.

interface SolicitacaoItem {
  id: string
  nomeEmpresa: string
  responsavel: string
  segmento: string
  cidadeRegiao: string
  equipe: string | null
  status: StatusSolicitacaoFounderOp
  criadoEm: Date
  observacaoAdmin: string | null
}

const PILL_STYLE: Record<StatusSolicitacaoFounderOp, string> = {
  PENDING: 'bg-amber-100 text-amber-800',
  CONTACTED: 'bg-sky-100 text-sky-800',
  IN_REVIEW: 'bg-violet-100 text-violet-800',
  APPROVED: 'bg-emerald-100 text-emerald-800',
  REJECTED: 'bg-rose-100 text-rose-700',
}

function formatarQuando(data: Date): string {
  return formatDistanceToNow(data, { addSuffix: true, locale: ptBR })
}

export function CommandCenter({
  tabs,
  statusAtivo,
  solicitacoes,
  totais,
}: {
  tabs: { chave: StatusSolicitacaoFounderOp; rotulo: string; total: number }[]
  statusAtivo: StatusSolicitacaoFounderOp
  solicitacoes: SolicitacaoItem[]
  totais: Record<string, number>
}) {
  const lista = solicitacoes.filter((s) => s.status === statusAtivo)
  const totalFiltrado = totais[statusAtivo] ?? 0

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2">
          <Inbox className="h-5 w-5 text-primary" />
          <div>
            <h2 className="text-xl font-semibold leading-tight">Solicitações de Founder</h2>
            <p className="text-sm text-muted-foreground mt-0.5">
              A porta se abriu — agora é o corredor: cada solicitação é uma conversa que precisa começar.
            </p>
          </div>
        </div>
      </div>

      {/* Abas por status */}
      <div className="flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <Link
            key={tab.chave}
            href={{ pathname: '/admin/founder-operacoes', query: { status: tab.chave } }}
            className={cn(
              'inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors border',
              statusAtivo === tab.chave
                ? 'bg-primary text-primary-foreground border-primary'
                : 'bg-card text-muted-foreground border-border hover:bg-accent hover:text-foreground'
            )}
          >
            {tab.rotulo}
            <span
              className={cn(
                'rounded-full px-1.5 text-[10px] font-semibold',
                statusAtivo === tab.chave
                  ? 'bg-primary-foreground/20 text-primary-foreground'
                  : 'bg-muted text-muted-foreground'
              )}
            >
              {tab.total}
            </span>
          </Link>
        ))}
      </div>

      {/* Lista de solicitações */}
      {lista.length === 0 ? (
        <div className="rounded-xl border border-dashed bg-card/50 px-6 py-12 text-center">
          <p className="text-sm text-muted-foreground">
            Nenhuma solicitação com este status agora.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {lista.map((s) => (
            <Link
              key={s.id}
              href={`/admin/founder-operacoes/${s.id}`}
              className="group block rounded-xl border bg-card p-4 transition-colors hover:border-primary/40 hover:bg-accent/40"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
                      <Building2 className="h-4 w-4 text-muted-foreground" />
                      {s.nomeEmpresa}
                    </span>
                    <span className={cn('rounded-full px-2 py-0.5 text-[10px] font-semibold', PILL_STYLE[s.status])}>
                      {s.status}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {s.responsavel} · {s.segmento} · {s.cidadeRegiao}
                    {rotuloEquipeFounder(s.equipe) ? ` · ${rotuloEquipeFounder(s.equipe)}` : ''}
                  </p>
                  {s.observacaoAdmin && (
                    <p className="text-xs text-muted-foreground/70 line-clamp-1 italic">
                      › {s.observacaoAdmin}
                    </p>
                  )}
                </div>
                <div className="shrink-0 flex flex-col items-end gap-1">
                  <span className="text-[10px] text-muted-foreground/70">
                    {s.criadoEm ? formatarQuando(s.criadoEm) : ''}
                  </span>
                  <ArrowRight className="h-4 w-4 text-primary opacity-0 transition-opacity group-hover:opacity-100" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      <p className="text-[10px] uppercase tracking-widest text-muted-foreground/50">
        {totalFiltrado} solicitação(ns) em &quot;{tabs.find((t) => t.chave === statusAtivo)?.rotulo}&quot;
      </p>
    </div>
  )
}