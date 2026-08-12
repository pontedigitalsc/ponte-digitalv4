import Link from 'next/link'
import { Compass, ArrowRight, Building2 } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import type { StatusDiagnosticoDescobertaOp } from '@/engine/descoberta-operacional'
import { STATUS_DIAGNOSTICO_DESCOBERTA_ROTULO } from '@/engine/descoberta-operacional'
import { cn } from '@/lib/utils'

// ─── PONTE DESCOBERTA — LISTA (P92, T1/T2) ────────────────────────────────────
// Visão do trabalho de descoberta no campo real: cada empresa em estudo em um
// card, filtrado por estado. Sem IA — o painel orienta a próxima visita.

interface DiagnosticoItem {
  id: string
  nomeEmpresa: string
  status: StatusDiagnosticoDescobertaOp
  unidadeOperacional: string | null
  respostaAncora: string | null
  criadaEm: Date
  categoria?: { nome: string; slug: string } | null
}

const PILL_STYLE: Record<StatusDiagnosticoDescobertaOp, string> = {
  NAO_INICIADO: 'bg-slate-100 text-slate-700',
  EM_DESCOBERTA: 'bg-amber-100 text-amber-800',
  MAPEADO: 'bg-sky-100 text-sky-800',
  EM_VALIDACAO: 'bg-violet-100 text-violet-800',
  VALIDADO: 'bg-emerald-100 text-emerald-800',
  EM_IMPLEMENTACAO: 'bg-teal-100 text-teal-800',
  IMPLEMENTADO: 'bg-blue-100 text-blue-800',
  EM_APRENDIZADO: 'bg-rose-100 text-rose-700',
}

function formatarQuando(data: Date): string {
  return formatDistanceToNow(data, { addSuffix: true, locale: ptBR })
}

export function DescobertaLista({
  tabs,
  statusAtivo,
  diagnosticos,
}: {
  tabs: { chave: StatusDiagnosticoDescobertaOp; rotulo: string; total: number }[]
  statusAtivo: StatusDiagnosticoDescobertaOp
  diagnosticos: DiagnosticoItem[]
}) {
  const lista = diagnosticos.filter((d) => d.status === statusAtivo)
  const totalFiltrado = tabs.find((t) => t.chave === statusAtivo)?.total ?? 0

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2">
          <Compass className="h-5 w-5 text-primary" />
          <div>
            <h2 className="text-xl font-semibold leading-tight">Ponte Descoberta</h2>
            <p className="text-sm text-muted-foreground mt-0.5">
              O campo real entra na Ponte: uma empresa de cada vez, um processo de cada vez. Nada é inventado — tudo é descoberto e classificado.
            </p>
          </div>
        </div>
      </div>

      {/* Abas por estado (tarefa 15) */}
      <div className="flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <Link
            key={tab.chave}
            href={{ pathname: '/admin/descoberta', query: { status: tab.chave } }}
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

      {/* Lista de diagnósticos */}
      {lista.length === 0 ? (
        <div className="rounded-xl border border-dashed bg-card/50 px-6 py-12 text-center">
          {statusAtivo === 'EM_DESCOBERTA' ? (
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                Nenhuma empresa em descoberta agora. O primeiro caso real (Souza Mestrinho) entra aqui.
              </p>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">Nenhum diagnóstico com este estado agora.</p>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {lista.map((d) => (
            <Link
              key={d.id}
              href={`/admin/descoberta/${d.id}`}
              className="group block rounded-xl border bg-card p-4 transition-colors hover:border-primary/40 hover:bg-accent/40"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
                      <Building2 className="h-4 w-4 text-muted-foreground" />
                      {d.nomeEmpresa}
                    </span>
                    <span className={cn('rounded-full px-2 py-0.5 text-[10px] font-semibold', PILL_STYLE[d.status])}>
                      {STATUS_DIAGNOSTICO_DESCOBERTA_ROTULO[d.status]}
                    </span>
                    {d.categoria && (
                      <span className="rounded-full border px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                        {d.categoria.nome}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {d.unidadeOperacional
                      ? `Unidade: ${d.unidadeOperacional}`
                      : 'Unidade operacional ainda não definida'}
                    {' · '}
                    {d.respostaAncora ? 'pergunta-âncora respondida' : 'pergunta-âncora pendente'}
                  </p>
                </div>
                <div className="shrink-0 flex flex-col items-end gap-1">
                  <span className="text-[10px] text-muted-foreground/70">
                    {formatarQuando(d.criadaEm)}
                  </span>
                  <ArrowRight className="h-4 w-4 text-primary opacity-0 transition-opacity group-hover:opacity-100" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      <p className="text-[10px] uppercase tracking-widest text-muted-foreground/50">
        {totalFiltrado} diagnostico(s) em &quot;{tabs.find((t) => t.chave === statusAtivo)?.rotulo}&quot;
      </p>
    </div>
  )
}