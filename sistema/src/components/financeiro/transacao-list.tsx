'use client'

import { useState } from 'react'
import {
  Search, Pencil, Trash2,
  CheckCircle, AlertTriangle, ArrowUpCircle, ArrowDownCircle, DollarSign,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/avatar'
import { EstadoVazio } from '@/components/shared/estado-vazio'
import { DropdownMenu } from '@/components/shared/dropdown-menu'
import {
  Select, SelectTrigger, SelectValue,
  SelectContent, SelectItem,
} from '@/components/ui/form-elements'
import { TransacaoModal } from './transacao-modal'
import { STATUS_TRANSACAO } from '@/constants'
import { formatarMoeda, formatarData, estaAtrasado, cn } from '@/lib/utils'
import type { Transacao, TipoTransacao, StatusTransacao } from '@/types'
import type { TransacaoInput } from '@/lib/validations'

interface TransacaoListProps {
  transacoes: Transacao[]
  loading: boolean
  error?: string | null
  total: number
  totalPages: number
  page: number
  onPageChange: (page: number) => void
  onFiltroChange: (filtros: { tipo?: string; status?: string; busca?: string }) => void
  onCriar: (dados: TransacaoInput) => Promise<void>
  onAtualizar: (id: string, dados: Partial<TransacaoInput>) => Promise<void>
  onPagar: (id: string) => Promise<void>
  onExcluir: (id: string) => Promise<void>
}

export function TransacaoList({
  transacoes, loading, error, total, totalPages, page,
  onPageChange, onFiltroChange, onCriar, onAtualizar, onPagar, onExcluir,
}: TransacaoListProps) {
  const [busca, setBusca]             = useState('')
  const [tipoFiltro, setTipoFiltro]   = useState<TipoTransacao | 'TODOS'>('TODOS')
  const [statusFiltro, setStatusFiltro] = useState<StatusTransacao | 'TODOS'>('TODOS')
  const [modalOpen, setModalOpen]     = useState(false)
  const [tipoModal, setTipoModal]     = useState<'RECEITA' | 'DESPESA'>('RECEITA')
  const [transacaoEditando, setTransacaoEditando] = useState<Transacao | null>(null)

  const aplicarFiltros = (overrides: { tipo?: string; status?: string; busca?: string }) => {
    onFiltroChange({
      tipo:   tipoFiltro   !== 'TODOS' ? tipoFiltro   : undefined,
      status: statusFiltro !== 'TODOS' ? statusFiltro : undefined,
      busca:  busca || undefined,
      ...overrides,
    })
  }

  const handleSubmit = async (dados: TransacaoInput) => {
    if (transacaoEditando) {
      await onAtualizar(transacaoEditando.id, dados)
    } else {
      await onCriar(dados)
    }
    setModalOpen(false)
    setTransacaoEditando(null)
  }

  const abrirNova = (tipo: 'RECEITA' | 'DESPESA') => {
    setTransacaoEditando(null)
    setTipoModal(tipo)
    setModalOpen(true)
  }

  return (
    <div className="space-y-3">
      {/* Toolbar */}
      <div className="flex items-center gap-2 flex-wrap justify-between">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <Input
              placeholder="Buscar..."
              value={busca}
              onChange={(e) => {
                setBusca(e.target.value)
                aplicarFiltros({ busca: e.target.value })
              }}
              className="pl-8 h-8 text-xs"
            />
          </div>

          <Select value={tipoFiltro} onValueChange={(v) => {
            setTipoFiltro(v as TipoTransacao | 'TODOS')
            aplicarFiltros({ tipo: v !== 'TODOS' ? v : undefined })
          }}>
            <SelectTrigger className="h-8 w-32 text-xs"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="TODOS">Todos tipos</SelectItem>
              <SelectItem value="RECEITA">Receitas</SelectItem>
              <SelectItem value="DESPESA">Despesas</SelectItem>
            </SelectContent>
          </Select>

          <Select value={statusFiltro} onValueChange={(v) => {
            setStatusFiltro(v as StatusTransacao | 'TODOS')
            aplicarFiltros({ status: v !== 'TODOS' ? v : undefined })
          }}>
            <SelectTrigger className="h-8 w-32 text-xs"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="TODOS">Todos status</SelectItem>
              {Object.entries(STATUS_TRANSACAO).map(([k, s]) => (
                <SelectItem key={k} value={k}>{s.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground hidden sm:block">
            <strong className="text-foreground">{total}</strong> lançamentos
          </span>
          <Button size="sm" variant="outline" onClick={() => abrirNova('DESPESA')}>
            <ArrowDownCircle className="h-3.5 w-3.5 text-destructive" />
            Despesa
          </Button>
          <Button size="sm" onClick={() => abrirNova('RECEITA')}>
            <ArrowUpCircle className="h-3.5 w-3.5" />
            Receita
          </Button>
        </div>
      </div>

      {/* Erro */}
      {error && (
        <div className="flex items-center gap-2 rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-2 text-sm text-destructive">
          <AlertTriangle className="h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Tabela */}
      <div className="rounded-xl border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/30">
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Descrição</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden md:table-cell">Categoria</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden lg:table-cell">Vencimento</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider">Valor</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 w-10" />
              </tr>
            </thead>
            <tbody className="divide-y">
              {loading && transacoes.length === 0
                ? Array.from({ length: 5 }).map((_, i) => (
                    <tr key={i}>
                      <td className="px-4 py-3"><Skeleton className="h-4 w-40" /></td>
                      <td className="px-4 py-3 hidden md:table-cell"><Skeleton className="h-4 w-24" /></td>
                      <td className="px-4 py-3 hidden lg:table-cell"><Skeleton className="h-4 w-20" /></td>
                      <td className="px-4 py-3"><Skeleton className="h-4 w-20 ml-auto" /></td>
                      <td className="px-4 py-3"><Skeleton className="h-5 w-16 rounded-full" /></td>
                      <td className="px-4 py-3" />
                    </tr>
                  ))
                : transacoes.map((t) => {
                    const st       = STATUS_TRANSACAO[t.status]
                    const atrasada = t.status !== 'PAGO' && t.dataVencimento ? estaAtrasado(t.dataVencimento) : false
                    const receita  = t.tipo === 'RECEITA'

                    return (
                      <tr key={t.id} className="hover:bg-muted/20 transition-colors">
                        {/* Descrição */}
                        <td className="px-4 py-3">
                          <div className="flex items-start gap-2">
                            {t.tipo === 'RECEITA'
                              ? <ArrowUpCircle className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                              : <ArrowDownCircle className="h-4 w-4 text-destructive shrink-0 mt-0.5" />
                            }
                            <div>
                              <p className="font-medium leading-tight">{t.descricao}</p>
                              {t.cliente && (
                                <p className="text-xs text-muted-foreground">{t.cliente.nome}</p>
                              )}
                            </div>
                          </div>
                        </td>

                        {/* Categoria */}
                        <td className="px-4 py-3 text-sm text-muted-foreground hidden md:table-cell">
                          {t.categoria ?? '—'}
                        </td>

                        {/* Vencimento */}
                        <td className={cn(
                          'px-4 py-3 text-sm hidden lg:table-cell',
                          atrasada ? 'text-amber-600 font-medium' : 'text-muted-foreground'
                        )}>
                          {atrasada && <AlertTriangle className="inline h-3 w-3 mr-1" />}
                          {formatarData(t.dataVencimento)}
                        </td>

                        {/* Valor */}
                        <td className={cn(
                          'px-4 py-3 text-right font-semibold',
                          receita ? 'text-emerald-600 dark:text-emerald-400' : 'text-destructive'
                        )}>
                          {receita ? '+' : '-'}{formatarMoeda(t.valor)}
                        </td>

                        {/* Status */}
                        <td className="px-4 py-3">
                          <span
                            className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium"
                            style={{ color: st.cor, backgroundColor: st.bg }}
                          >
                            {st.label}
                          </span>
                        </td>

                        {/* Ações */}
                        <td className="px-4 py-3">
                          <DropdownMenu
                            items={[
                              ...(t.status !== 'PAGO'
                                ? [{ label: 'Marcar como pago', onClick: () => onPagar(t.id), icon: <CheckCircle className="h-3.5 w-3.5 text-emerald-600" /> }]
                                : []),
                              { label: 'Editar', onClick: () => { setTransacaoEditando(t); setModalOpen(true) }, icon: <Pencil className="h-3.5 w-3.5" /> },
                              'divider',
                              { label: 'Excluir', onClick: () => onExcluir(t.id), variant: 'danger' as const, icon: <Trash2 className="h-3.5 w-3.5" /> },
                            ]}
                          />
                        </td>
                      </tr>
                    )
                  })}
            </tbody>
          </table>

          {!loading && transacoes.length === 0 && (
            <EstadoVazio
              icone={DollarSign}
              titulo="Nenhum lançamento por aqui ainda"
              descricao="Anote sua primeira receita ou despesa para começar a acompanhar o dinheiro da empresa."
              acaoLabel="Nova receita"
              onAcao={() => abrirNova('RECEITA')}
              temFiltroAtivo={Boolean(busca || tipoFiltro !== 'TODOS' || statusFiltro !== 'TODOS')}
              onLimparFiltro={() => {
                setBusca(''); setTipoFiltro('TODOS'); setStatusFiltro('TODOS')
                aplicarFiltros({ tipo: undefined, status: undefined, busca: undefined })
              }}
            />
          )}
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-between border-t px-4 py-3">
            <p className="text-xs text-muted-foreground">Página {page} de {totalPages}</p>
            <div className="flex gap-1">
              <Button variant="outline" size="sm" onClick={() => onPageChange(page - 1)} disabled={page === 1 || loading}>Anterior</Button>
              <Button variant="outline" size="sm" onClick={() => onPageChange(page + 1)} disabled={page === totalPages || loading}>Próxima</Button>
            </div>
          </div>
        )}
      </div>

      <TransacaoModal
        open={modalOpen}
        transacao={transacaoEditando}
        tipoInicial={tipoModal}
        onClose={() => { setModalOpen(false); setTransacaoEditando(null) }}
        onSubmit={handleSubmit}
      />
    </div>
  )
}
