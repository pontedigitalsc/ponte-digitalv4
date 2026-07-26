'use client'

import { useEffect, useState, useCallback, useMemo } from 'react'
import { Plus, Search, RefreshCw, AlertCircle, ChevronDown, CheckSquare2 } from 'lucide-react'
import { useTarefas } from '@/hooks/use-tarefas'
import { useConfirm } from '@/hooks/use-confirm'
import { TarefaItem } from './tarefa-item'
import { TarefaModal } from './tarefa-modal'
import { EstadoVazio } from '@/components/shared/estado-vazio'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/avatar'
import {
  Select, SelectTrigger, SelectValue,
  SelectContent, SelectItem,
} from '@/components/ui/form-elements'
import { STATUS_TAREFA, PRIORIDADE } from '@/constants'
import { cn } from '@/lib/utils'
import type { Tarefa, StatusTarefa, Prioridade } from '@/types'
import type { TarefaInput } from '@/lib/validations'

// Ordem de exibição dos grupos
const GRUPOS: { status: StatusTarefa; label: string }[] = [
  { status: 'PENDENTE',     label: 'Pendentes' },
  { status: 'EM_ANDAMENTO', label: 'Em andamento' },
  { status: 'CONCLUIDA',    label: 'Concluídas' },
  { status: 'CANCELADA',    label: 'Canceladas' },
]

export function TarefaList() {
  const { tarefas, total, loading, error, carregarTarefas, criarTarefa, atualizarTarefa, toggleConcluida, excluirTarefa } = useTarefas()
  const { confirmar, ConfirmDialog } = useConfirm()

  const [busca, setBusca]               = useState('')
  const [statusFiltro, setStatusFiltro] = useState<StatusTarefa | 'TODOS'>('TODOS')
  const [prioFiltro, setPrioFiltro]     = useState<Prioridade | 'TODOS'>('TODOS')
  const [modalOpen, setModalOpen]       = useState(false)
  const [tarefaEditando, setTarefaEditando] = useState<Tarefa | null>(null)
  const [gruposColapsados, setGruposColapsados] = useState<Set<StatusTarefa>>(new Set(['CONCLUIDA', 'CANCELADA']))

  const carregar = useCallback(() => {
    carregarTarefas({
      status:     statusFiltro !== 'TODOS' ? statusFiltro : undefined,
      prioridade: prioFiltro   !== 'TODOS' ? prioFiltro   : undefined,
    })
  }, [statusFiltro, prioFiltro, carregarTarefas])

  useEffect(() => { carregar() }, [carregar])

  // Filtro local por busca
  const tarefasFiltradas = useMemo(() => {
    if (!busca.trim()) return tarefas
    const q = busca.toLowerCase()
    return tarefas.filter(
      (t) =>
        t.titulo.toLowerCase().includes(q) ||
        (t.descricao ?? '').toLowerCase().includes(q) ||
        (t.cliente?.nome ?? '').toLowerCase().includes(q)
    )
  }, [tarefas, busca])

  // Agrupa por status
  const tarefasPorStatus = useMemo(() => {
    const mapa = new Map<StatusTarefa, Tarefa[]>()
    GRUPOS.forEach((g) => mapa.set(g.status, []))
    tarefasFiltradas.forEach((t) => {
      const lista = mapa.get(t.status) ?? []
      lista.push(t)
      mapa.set(t.status, lista)
    })
    return mapa
  }, [tarefasFiltradas])

  const handleSubmit = async (dados: TarefaInput) => {
    if (tarefaEditando) {
      await atualizarTarefa(tarefaEditando.id, dados)
    } else {
      await criarTarefa(dados)
    }
    setModalOpen(false)
    setTarefaEditando(null)
  }

  const handleDelete = async (id: string) => {
    const ok = await confirmar({
      titulo: 'Mover tarefa para a Lixeira?',
      descricao: 'Você poderá restaurá-la dentro dos próximos 30 dias, caso precise.',
      textoConfirmar: 'Mover para a Lixeira',
      variante: 'destrutiva',
    })
    if (ok) await excluirTarefa(id)
  }

  const toggleGrupo = (status: StatusTarefa) => {
    setGruposColapsados((prev) => {
      const next = new Set(prev)
      next.has(status) ? next.delete(status) : next.add(status)
      return next
    })
  }

  const pendentesCount  = tarefasPorStatus.get('PENDENTE')?.length ?? 0
  const andamentoCount  = tarefasPorStatus.get('EM_ANDAMENTO')?.length ?? 0

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex items-center gap-3 flex-wrap justify-between">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <Input
              placeholder="Buscar tarefa..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="pl-8 h-8 text-xs"
            />
          </div>

          <Select value={statusFiltro} onValueChange={(v) => setStatusFiltro(v as StatusTarefa | 'TODOS')}>
            <SelectTrigger className="h-8 w-36 text-xs"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="TODOS">Todos status</SelectItem>
              {Object.entries(STATUS_TAREFA).map(([k, s]) => (
                <SelectItem key={k} value={k}>{s.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={prioFiltro} onValueChange={(v) => setPrioFiltro(v as Prioridade | 'TODOS')}>
            <SelectTrigger className="h-8 w-36 text-xs"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="TODOS">Todas prioridades</SelectItem>
              {Object.entries(PRIORIDADE).map(([k, p]) => (
                <SelectItem key={k} value={k}>{p.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <button
            onClick={carregar}
            disabled={loading}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border hover:bg-accent transition-colors"
          >
            <RefreshCw className={cn('h-3.5 w-3.5 text-muted-foreground', loading && 'animate-spin')} />
          </button>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-3 text-sm text-muted-foreground">
            {pendentesCount > 0 && (
              <span><strong className="text-amber-600">{pendentesCount}</strong> pendente{pendentesCount > 1 ? 's' : ''}</span>
            )}
            {andamentoCount > 0 && (
              <span><strong className="text-blue-600">{andamentoCount}</strong> em andamento</span>
            )}
          </div>
          <Button size="sm" onClick={() => { setTarefaEditando(null); setModalOpen(true) }}>
            <Plus className="h-4 w-4" />
            Nova tarefa
          </Button>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="flex items-center gap-2 rounded-lg bg-destructive/10 px-4 py-2.5 text-sm text-destructive">
          <AlertCircle className="h-4 w-4 shrink-0" />
          {error}
        </div>
      )}

      {/* Loading skeleton */}
      {loading && tarefas.length === 0 && (
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-14 rounded-lg" />
          ))}
        </div>
      )}

      {/* Empty state */}
      {!loading && tarefasFiltradas.length === 0 && (
        <EstadoVazio
          icone={CheckSquare2}
          titulo="Nenhuma tarefa por aqui ainda"
          descricao="Crie sua primeira tarefa para começar a organizar o que precisa ser feito."
          acaoLabel="Nova tarefa"
          onAcao={() => { setTarefaEditando(null); setModalOpen(true) }}
          temFiltroAtivo={Boolean(busca || statusFiltro !== 'TODOS' || prioFiltro !== 'TODOS')}
          onLimparFiltro={() => { setBusca(''); setStatusFiltro('TODOS'); setPrioFiltro('TODOS') }}
        />
      )}

      {/* Grupos */}
      {!loading && tarefasFiltradas.length > 0 && (
        <div className="space-y-4">
          {GRUPOS.map(({ status, label }) => {
            const lista = tarefasPorStatus.get(status) ?? []
            if (lista.length === 0) return null

            const colapsado = gruposColapsados.has(status)
            const stConfig  = STATUS_TAREFA[status]

            return (
              <div key={status}>
                {/* Group header */}
                <button
                  onClick={() => toggleGrupo(status)}
                  className="flex items-center gap-2 mb-2 w-full text-left group/header"
                >
                  <ChevronDown
                    className={cn(
                      'h-3.5 w-3.5 text-muted-foreground transition-transform',
                      colapsado && '-rotate-90'
                    )}
                  />
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {label}
                  </span>
                  <span
                    className="rounded-full px-1.5 py-0.5 text-[10px] font-semibold"
                    style={{ color: stConfig.cor, backgroundColor: stConfig.bg }}
                  >
                    {lista.length}
                  </span>
                </button>

                {/* Items */}
                {!colapsado && (
                  <div className="space-y-1.5">
                    {lista.map((tarefa) => (
                      <TarefaItem
                        key={tarefa.id}
                        tarefa={tarefa}
                        onToggle={toggleConcluida}
                        onEdit={(t) => { setTarefaEditando(t); setModalOpen(true) }}
                        onDelete={handleDelete}
                      />
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}

      {/* Modal */}
      <TarefaModal
        open={modalOpen}
        tarefa={tarefaEditando}
        onClose={() => { setModalOpen(false); setTarefaEditando(null) }}
        onSubmit={handleSubmit}
      />
      {ConfirmDialog}
    </div>
  )
}
