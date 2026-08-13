'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  ArrowLeft, Phone, Mail, Globe, MapPin, DollarSign,
  Calendar, CheckSquare, Clock, Layers, Pencil,
  Plus, MessageSquare, FileText,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar } from '@/components/ui/avatar'
import { ClienteModal } from './cliente-modal'
import { TarefaModal } from '@/components/tarefas/tarefa-modal'
import { TransacaoModal } from '@/components/financeiro/transacao-modal'
import { HistoricoModal } from './historico-modal'
import { apiFetch } from '@/lib/api-client'
import { STATUS_CLIENTE, STATUS_TAREFA, PRIORIDADE, STATUS_IMPLANTACAO } from '@/constants'
import {
  formatarMoeda, formatarData, formatarDataHora,
  formatarTelefone, estaAtrasado, cn,
} from '@/lib/utils'
import type { ClienteInput, TarefaInput, TransacaoInput, HistoricoInput } from '@/lib/validations'

// Importação de tipos de Prisma via any para evitar problema de serialização
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ClienteCompleto = any

const TIPO_HISTORICO_LABEL: Record<string, { label: string; cor: string }> = {
  NOTA:     { label: 'Nota',     cor: '#6B7280' },
  LIGACAO:  { label: 'Ligação',  cor: '#2563EB' },
  EMAIL:    { label: 'E-mail',   cor: '#7C3AED' },
  REUNIAO:  { label: 'Reunião',  cor: '#D97706' },
  WHATSAPP: { label: 'WhatsApp', cor: '#059669' },
  PROPOSTA: { label: 'Proposta', cor: '#DC2626' },
  CONTRATO: { label: 'Contrato', cor: '#059669' },
  SISTEMA:  { label: 'Sistema',  cor: '#9CA3AF' },
}

type Aba = 'visao-geral' | 'tarefas' | 'historico' | 'implantacoes' | 'financeiro'

interface ClientePerfilProps {
  cliente: ClienteCompleto
  onAtualizar: (dados: Partial<ClienteInput>) => Promise<void>
}

export function ClientePerfil({ cliente, onAtualizar }: ClientePerfilProps) {
  const router = useRouter()
  const [abaAtiva, setAbaAtiva] = useState<Aba>('visao-geral')
  const [modalOpen, setModalOpen] = useState(false)
  const [tarefaModalOpen, setTarefaModalOpen] = useState(false)
  const [historicoModalOpen, setHistoricoModalOpen] = useState(false)
  const [transacaoModalOpen, setTransacaoModalOpen] = useState(false)

  const status = STATUS_CLIENTE[cliente.status as keyof typeof STATUS_CLIENTE]

  const criarTarefaDoCliente = async (dados: TarefaInput) => {
    await apiFetch<{ data: unknown }>('/api/tarefas', {
      method: 'POST',
      json: { ...dados, clienteId: cliente.id },
    })
    router.refresh()
  }

  const anotarContatoDoCliente = async (dados: HistoricoInput) => {
    await apiFetch<{ data: unknown }>('/api/historicos', {
      method: 'POST',
      json: { ...dados, clienteId: cliente.id },
    })
    router.refresh()
  }

  const criarCobrancaDoCliente = async (dados: TransacaoInput) => {
    await apiFetch<{ data: unknown }>('/api/transacoes', {
      method: 'POST',
      json: { ...dados, clienteId: cliente.id },
    })
    router.refresh()
  }

  const abas: { id: Aba; label: string; icone: React.ElementType; count?: number }[] = [
    { id: 'visao-geral',   label: 'Visão geral',  icone: FileText },
    { id: 'tarefas',       label: 'Tarefas',       icone: CheckSquare,  count: cliente._count?.tarefas },
    { id: 'historico',     label: 'Histórico',     icone: Clock,        count: cliente._count?.historicos },
    { id: 'implantacoes',  label: 'Implantações',  icone: Layers,       count: cliente._count?.implantacoes },
    { id: 'financeiro',    label: 'Financeiro',    icone: DollarSign },
  ]

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-start gap-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()} className="shrink-0 mt-0.5">
          <ArrowLeft className="h-4 w-4" />
        </Button>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3 flex-wrap">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-xl font-bold">{cliente.nome}</h1>
                <span
                  className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium"
                  style={{ color: status.cor, backgroundColor: status.bg }}
                >
                  {status.label}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                {cliente.segmento ?? '—'}
                {cliente.cidade && ` · ${cliente.cidade}${cliente.estado ? `/${cliente.estado}` : ''}`}
              </p>
            </div>
            <Button size="sm" variant="outline" onClick={() => setModalOpen(true)}>
              <Pencil className="h-3.5 w-3.5" />
              Editar
            </Button>
          </div>

          {/* Quick contact */}
          <div className="flex items-center gap-4 mt-3 flex-wrap">
            {cliente.telefone && (
              <a href={`tel:${cliente.telefone}`}
                className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <Phone className="h-3.5 w-3.5" />
                {formatarTelefone(cliente.telefone)}
              </a>
            )}
            {cliente.email && (
              <a href={`mailto:${cliente.email}`}
                className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <Mail className="h-3.5 w-3.5" />
                {cliente.email}
              </a>
            )}
            {cliente.site && (
              <a href={cliente.site} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <Globe className="h-3.5 w-3.5" />
                Site
              </a>
            )}
            {cliente.valorMensal && (
              <span className="flex items-center gap-1.5 text-sm font-semibold text-emerald-600">
                <DollarSign className="h-3.5 w-3.5" />
                {formatarMoeda(cliente.valorMensal)}/mês
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b">
        <nav className="flex gap-0 -mb-px overflow-x-auto">
          {abas.map((aba) => {
            const Icon = aba.icone
            return (
              <button
                key={aba.id}
                onClick={() => setAbaAtiva(aba.id)}
                className={cn(
                  'flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium border-b-2 whitespace-nowrap transition-colors',
                  abaAtiva === aba.id
                    ? 'border-primary text-primary'
                    : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
                )}
              >
                <Icon className="h-3.5 w-3.5" />
                {aba.label}
                {aba.count !== undefined && aba.count > 0 && (
                  <span className="ml-1 rounded-full bg-muted px-1.5 py-0.5 text-[10px] font-semibold">
                    {aba.count}
                  </span>
                )}
              </button>
            )
          })}
        </nav>
      </div>

      {/* Tab content */}
      <div>
        {/* ── Visão Geral ── */}
        {abaAtiva === 'visao-geral' && (
          <div className="grid gap-4 lg:grid-cols-3">
            {/* Dados principais */}
            <div className="lg:col-span-2 space-y-4">
              <Card>
                <CardHeader><CardTitle className="text-sm">Informações</CardTitle></CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { label: 'Documento',    valor: cliente.documento },
                    { label: 'Segmento',     valor: cliente.segmento },
                    { label: 'Endereço',     valor: cliente.endereco },
                    { label: 'Cidade/UF',    valor: cliente.cidade ? `${cliente.cidade}${cliente.estado ? `/${cliente.estado}` : ''}` : null },
                    { label: 'Dia venc.',    valor: cliente.diaVencimento ? `Todo dia ${cliente.diaVencimento}` : null },
                    { label: 'Cliente desde',valor: formatarData(cliente.criadoEm) },
                  ].map(({ label, valor }) => (
                    <div key={label} className="flex items-start justify-between gap-4 text-sm">
                      <span className="text-muted-foreground shrink-0 w-28">{label}</span>
                      <span className="text-right font-medium">{valor ?? '—'}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {cliente.observacoes && (
                <Card>
                  <CardHeader><CardTitle className="text-sm">Observações</CardTitle></CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground whitespace-pre-wrap">{cliente.observacoes}</p>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar de stats */}
            <div className="space-y-4">
              {/* Resumo financeiro */}
              <Card>
                <CardHeader><CardTitle className="text-sm">Financeiro</CardTitle></CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Mensalidade</span>
                    <span className="font-semibold text-emerald-600">
                      {formatarMoeda(cliente.valorMensal)}
                    </span>
                  </div>
                  {cliente.transacoes?.length > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">A receber</span>
                      <span className="font-semibold text-amber-600">
                        {formatarMoeda(
                          cliente.transacoes.reduce((a: number, t: { valor: number }) => a + Number(t.valor), 0)
                        )}
                      </span>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Próximo contato */}
              {cliente.proximoContato && (
                <Card className={cn(estaAtrasado(cliente.proximoContato) && 'border-amber-400/50')}>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">Próximo contato</p>
                        <p className={cn(
                          'text-sm font-medium',
                          estaAtrasado(cliente.proximoContato) && 'text-amber-600'
                        )}>
                          {formatarData(cliente.proximoContato)}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        )}

        {/* ── Tarefas ── */}
        {abaAtiva === 'tarefas' && (
          <div className="space-y-2">
            <div className="flex justify-end">
              <Button size="sm" variant="outline" onClick={() => setTarefaModalOpen(true)}>
                <Plus className="h-3.5 w-3.5" /> Nova tarefa
              </Button>
            </div>
            {cliente.tarefas?.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center px-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted mb-3">
                  <CheckSquare className="h-4 w-4 text-muted-foreground" />
                </div>
                <p className="text-sm font-medium text-foreground">Nenhuma tarefa vinculada</p>
                <p className="text-xs text-muted-foreground mt-1 max-w-xs">Tarefas relacionadas a este cliente aparecerão aqui automaticamente.</p>
              </div>
            ) : (
              <div className="space-y-2">
                {cliente.tarefas?.map((tarefa: { id: string; titulo: string; status: string; prioridade: string; dataVencimento?: string; responsavel?: { nome: string; avatar?: string } }) => {
                  const st = STATUS_TAREFA[tarefa.status as keyof typeof STATUS_TAREFA]
                  const pr = PRIORIDADE[tarefa.prioridade as keyof typeof PRIORIDADE]
                  const atrasada = tarefa.dataVencimento ? estaAtrasado(tarefa.dataVencimento) : false
                  return (
                    <div key={tarefa.id} className="flex items-center gap-3 rounded-lg border bg-card p-3">
                      <div className="h-2 w-2 rounded-full shrink-0" style={{ backgroundColor: pr.cor }} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{tarefa.titulo}</p>
                        {tarefa.dataVencimento && (
                          <p className={cn('text-xs', atrasada ? 'text-destructive' : 'text-muted-foreground')}>
                            {atrasada ? '⚠ ' : ''}{formatarData(tarefa.dataVencimento)}
                          </p>
                        )}
                      </div>
                      {tarefa.responsavel && (
                        <Avatar src={tarefa.responsavel.avatar} nome={tarefa.responsavel.nome} size="sm" />
                      )}
                      <span
                        className="shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium"
                        style={{ color: st.cor, backgroundColor: st.bg }}
                      >
                        {st.label}
                      </span>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )}

        {/* ── Histórico ── */}
        {abaAtiva === 'historico' && (
          <div className="space-y-3">
            <div className="flex justify-end">
              <Button size="sm" variant="outline" onClick={() => setHistoricoModalOpen(true)}>
                <MessageSquare className="h-3.5 w-3.5" /> Anotar contato
              </Button>
            </div>
            {cliente.historicos?.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center px-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted mb-3">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </div>
                <p className="text-sm font-medium text-foreground">Histórico começará a ser guardado</p>
                <p className="text-xs text-muted-foreground mt-1 max-w-xs">Toda interação com este contato será guardada automaticamente aqui.</p>
              </div>
            ) : (
              <div className="relative space-y-0">
                {/* Timeline line */}
                <div className="absolute left-[19px] top-0 bottom-0 w-px bg-border" />
                {cliente.historicos?.map((h: { id: string; tipo: string; titulo: string; descricao?: string; criadoEm: string; usuario?: { nome: string; avatar?: string } }) => {
                  const tipo = TIPO_HISTORICO_LABEL[h.tipo] ?? { label: h.tipo, cor: '#6B7280' }
                  return (
                    <div key={h.id} className="flex gap-4 pb-4 relative">
                      {/* Dot */}
                      <div
                        className="shrink-0 h-5 w-5 rounded-full border-2 border-background mt-0.5 z-10"
                        style={{ backgroundColor: tipo.cor }}
                      />
                      <div className="flex-1 min-w-0 pt-0.5">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <span
                              className="text-[10px] font-semibold uppercase tracking-wide"
                              style={{ color: tipo.cor }}
                            >
                              {tipo.label}
                            </span>
                            <p className="text-sm font-medium">{h.titulo}</p>
                            {h.descricao && (
                              <p className="text-sm text-muted-foreground mt-0.5">{h.descricao}</p>
                            )}
                          </div>
                          <span className="text-xs text-muted-foreground shrink-0">
                            {formatarDataHora(h.criadoEm)}
                          </span>
                        </div>
                        {h.usuario && (
                          <div className="flex items-center gap-1.5 mt-1.5">
                            <Avatar src={h.usuario.avatar} nome={h.usuario.nome} size="sm" />
                            <span className="text-xs text-muted-foreground">{h.usuario.nome}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )}

        {/* ── Implantações ── */}
        {abaAtiva === 'implantacoes' && (
          <div className="space-y-3">
            {cliente.implantacoes?.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center px-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted mb-3">
                  <Layers className="h-4 w-4 text-muted-foreground" />
                </div>
                <p className="text-sm font-medium text-foreground">Nenhuma implantação em andamento</p>
                <p className="text-xs text-muted-foreground mt-1 max-w-xs">Implantações aparecerão quando este contato estiver em uma oportunidade de negócio.</p>
              </div>
            ) : (
              cliente.implantacoes?.map((impl: { id: string; titulo: string; status: string; dataPrevisao?: string; etapas?: Array<{ id: string; titulo: string; concluida: boolean }> }) => {
                const st = STATUS_IMPLANTACAO[impl.status as keyof typeof STATUS_IMPLANTACAO]
                const etapas = impl.etapas ?? []
                const concluidas = etapas.filter((e) => e.concluida).length
                const progresso = etapas.length > 0 ? Math.round((concluidas / etapas.length) * 100) : 0
                return (
                  <Card key={impl.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div>
                          <p className="font-medium text-sm">{impl.titulo}</p>
                          {impl.dataPrevisao && (
                            <p className="text-xs text-muted-foreground">
                              Previsão: {formatarData(impl.dataPrevisao)}
                            </p>
                          )}
                        </div>
                        <span
                          className="shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-medium"
                          style={{ color: st.cor, backgroundColor: st.bg }}
                        >
                          {st.label}
                        </span>
                      </div>

                      {/* Progress bar */}
                      {etapas.length > 0 && (
                        <div>
                          <div className="flex justify-between text-xs text-muted-foreground mb-1">
                            <span>{concluidas}/{etapas.length} etapas</span>
                            <span>{progresso}%</span>
                          </div>
                          <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                            <div
                              className="h-full rounded-full bg-primary transition-all"
                              style={{ width: `${progresso}%` }}
                            />
                          </div>
                        </div>
                      )}

                      {/* Etapas */}
                      {etapas.length > 0 && (
                        <div className="mt-3 space-y-1.5">
                          {etapas.map((e) => (
                            <div key={e.id} className="flex items-center gap-2 text-xs">
                              <div className={cn(
                                'h-3.5 w-3.5 rounded-full border-2 shrink-0 flex items-center justify-center',
                                e.concluida ? 'bg-emerald-500 border-emerald-500' : 'border-muted-foreground/40'
                              )}>
                                {e.concluida && (
                                  <svg className="h-2 w-2 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                  </svg>
                                )}
                              </div>
                              <span className={cn(e.concluida && 'line-through text-muted-foreground')}>
                                {e.titulo}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )
              })
            )}
          </div>
        )}

        {/* ── Financeiro ── */}
        {abaAtiva === 'financeiro' && (
          <div className="space-y-3">
            <div className="flex justify-end">
              <Button size="sm" variant="outline" onClick={() => setTransacaoModalOpen(true)}>
                <Plus className="h-3.5 w-3.5" /> Nova cobrança
              </Button>
            </div>
            {cliente.transacoes?.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center px-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted mb-3">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </div>
                <p className="text-sm font-medium text-foreground">Nenhuma transação financeira registrada</p>
                <p className="text-xs text-muted-foreground mt-1 max-w-xs">Assim que houver cobranças ou pagamentos, o resumo financeiro aparecerá aqui.</p>
              </div>
            ) : (
              <div className="rounded-xl border overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-muted/30">
                      <th className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground">Descrição</th>
                      <th className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground">Vencimento</th>
                      <th className="px-4 py-2.5 text-right text-xs font-semibold text-muted-foreground">Valor</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {cliente.transacoes?.map((t: { id: string; descricao: string; dataVencimento?: string; valor: number; status: string }) => (
                      <tr key={t.id} className="hover:bg-muted/20">
                        <td className="px-4 py-3 font-medium">{t.descricao}</td>
                        <td className={cn(
                          'px-4 py-3 text-sm',
                          estaAtrasado(t.dataVencimento) ? 'text-destructive font-medium' : 'text-muted-foreground'
                        )}>
                          {formatarData(t.dataVencimento)}
                        </td>
                        <td className="px-4 py-3 text-right font-semibold text-emerald-600">
                          {formatarMoeda(t.valor)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Edit modal */}
      <ClienteModal
        open={modalOpen}
        cliente={cliente}
        onClose={() => setModalOpen(false)}
        onSubmit={async (dados) => { await onAtualizar(dados); setModalOpen(false) }}
      />

      <TarefaModal
        open={tarefaModalOpen}
        clienteIdInicial={cliente.id}
        onClose={() => setTarefaModalOpen(false)}
        onSubmit={criarTarefaDoCliente}
      />

      <HistoricoModal
        open={historicoModalOpen}
        clienteId={cliente.id}
        onClose={() => setHistoricoModalOpen(false)}
        onSubmit={anotarContatoDoCliente}
      />

      <TransacaoModal
        open={transacaoModalOpen}
        tipoInicial="RECEITA"
        clienteIdInicial={cliente.id}
        onClose={() => setTransacaoModalOpen(false)}
        onSubmit={criarCobrancaDoCliente}
      />
    </div>
  )
}
