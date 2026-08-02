'use client'

import { Pencil, Trash2, ExternalLink } from 'lucide-react'
import { DropdownMenu } from '@/components/shared/dropdown-menu'
import { Avatar } from '@/components/ui/avatar'
import { PRIORIDADE, TIPO_TAREFA, STATUS_TAREFA } from '@/constants'
import { formatarDataRelativa, estaAtrasado, cn } from '@/lib/utils'
import type { Tarefa } from '@/types'

interface TarefaItemProps {
  tarefa: Tarefa
  onToggle: (id: string) => void
  onEdit: (tarefa: Tarefa) => void
  onDelete: (id: string) => void
  compact?: boolean
}

export function TarefaItem({ tarefa, onToggle, onEdit, onDelete, compact = false }: TarefaItemProps) {
  const concluida  = tarefa.status === 'CONCLUIDA'
  const atrasada   = !concluida && tarefa.dataVencimento ? estaAtrasado(tarefa.dataVencimento) : false
  const prioridade = PRIORIDADE[tarefa.prioridade]
  const tipo       = TIPO_TAREFA[tarefa.tipo]

  return (
    <div
      className={cn(
        'group flex items-start gap-3 rounded-lg border bg-card transition-colors hover:bg-muted/30',
        compact ? 'px-3 py-2.5' : 'px-4 py-3',
        concluida && 'opacity-60'
      )}
    >
      {/* Checkbox */}
      <button
        onClick={() => onToggle(tarefa.id)}
        className={cn(
          'mt-0.5 shrink-0 flex h-4 w-4 items-center justify-center rounded border-2 transition-colors',
          concluida
            ? 'border-emerald-500 bg-emerald-500'
            : 'border-muted-foreground/40 hover:border-primary'
        )}
        aria-label={concluida ? 'Reabrir tarefa' : 'Concluir tarefa'}
      >
        {concluida && (
          <svg className="h-2.5 w-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        )}
      </button>

      {/* Dot prioridade */}
      <div
        className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
        style={{ backgroundColor: concluida ? '#9CA3AF' : prioridade.cor }}
        title={prioridade.label}
      />

      {/* Conteúdo */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start gap-2">
          <p className={cn('text-sm font-medium flex-1 min-w-0', concluida && 'line-through text-muted-foreground')}>
            {tarefa.titulo}
          </p>
        </div>

        {!compact && (
          <div className="flex items-center gap-3 mt-1 flex-wrap">
            {/* Tipo */}
            <span className="text-xs text-muted-foreground">{tipo.label}</span>

            {/* Cliente / Lead */}
            {tarefa.cliente && (
              <span className="text-xs text-muted-foreground">
                · {tarefa.cliente.nome}
              </span>
            )}
            {tarefa.lead && !tarefa.cliente && (
              <span className="text-xs text-muted-foreground">
                · {tarefa.lead.nome}
              </span>
            )}

            {/* Vencimento */}
            {tarefa.dataVencimento && (
              <span className={cn(
                'text-xs font-medium',
                atrasada   ? 'text-destructive' :
                concluida  ? 'text-muted-foreground' :
                             'text-muted-foreground'
              )}>
                {atrasada ? '⚠ ' : ''}{formatarDataRelativa(tarefa.dataVencimento)}
              </span>
            )}
          </div>
        )}

        {compact && tarefa.dataVencimento && (
          <p className={cn('text-xs mt-0.5', atrasada ? 'text-destructive font-medium' : 'text-muted-foreground')}>
            {atrasada ? '⚠ ' : ''}{formatarDataRelativa(tarefa.dataVencimento)}
          </p>
        )}
      </div>

      {/* Responsável */}
      {tarefa.responsavel && !compact && (
        <div className="shrink-0 hidden sm:block">
          <Avatar src={tarefa.responsavel.avatar} nome={tarefa.responsavel.nome} size="sm" />
        </div>
      )}

      {/* Status badge (não concluída) */}
      {!concluida && !compact && (
        <div
          className="shrink-0 hidden md:flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium"
          style={{
            color:           STATUS_TAREFA[tarefa.status].cor,
            backgroundColor: STATUS_TAREFA[tarefa.status].bg,
          }}
        >
          {STATUS_TAREFA[tarefa.status].label}
        </div>
      )}

      {/* Menu */}
      <div className="shrink-0">
        <DropdownMenu
          width="w-40"
          items={[
            { label: 'Editar', onClick: () => onEdit(tarefa), icon: <Pencil className="h-3.5 w-3.5" /> },
            ...(tarefa.cliente
              ? [{ label: 'Ver cliente', onClick: () => window.location.href = `/clientes/${tarefa.cliente!.id}`, icon: <ExternalLink className="h-3.5 w-3.5" /> }]
              : []),
            'divider',
            { label: 'Remover', onClick: () => onDelete(tarefa.id), variant: 'danger' as const, icon: <Trash2 className="h-3.5 w-3.5" /> },
          ]}
        />
      </div>
    </div>
  )
}
