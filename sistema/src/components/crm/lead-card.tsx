'use client'

import { Phone, Mail, Building2, Calendar, CheckSquare, Pencil, Trash2 } from 'lucide-react'
import { DropdownMenu } from '@/components/shared/dropdown-menu'
import { Avatar } from '@/components/ui/avatar'
import { formatarMoeda, formatarDataRelativa, cn } from '@/lib/utils'
import { TEMPERATURA } from '@/constants'
import type { Lead } from '@/types'

interface LeadCardProps {
  lead: Lead
  onEdit: (lead: Lead) => void
  onDelete: (id: string) => void
  dragging?: boolean
}

export function LeadCard({ lead, onEdit, onDelete, dragging = false }: LeadCardProps) {
  const temp = TEMPERATURA[lead.temperatura]

  return (
    <div
      className={cn(
        'group relative bg-card border rounded-xl p-3.5 cursor-grab active:cursor-grabbing',
        'hover:border-primary/30 hover:shadow-md transition-all duration-150',
        dragging && 'rotate-1 shadow-xl opacity-90 scale-105'
      )}
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData('leadId', lead.id)
        e.dataTransfer.effectAllowed = 'move'
      }}
    >
      {/* Header: nome + menu */}
      <div className="flex items-start justify-between gap-2 mb-2.5">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold leading-tight truncate">{lead.nome}</p>
          {lead.empresa && (
            <div className="flex items-center gap-1 mt-0.5">
              <Building2 className="h-3 w-3 text-muted-foreground shrink-0" />
              <p className="text-xs text-muted-foreground truncate">{lead.empresa}</p>
            </div>
          )}
        </div>

        {/* Temperatura */}
        <span
          className="shrink-0 text-sm"
          title={temp.label}
        >
          {temp.emoji}
        </span>

        {/* Menu */}
        <div className="shrink-0">
          <DropdownMenu
            width="w-36"
            items={[
              { label: 'Editar', onClick: () => onEdit(lead), icon: <Pencil className="h-3.5 w-3.5" /> },
              { label: 'Remover', onClick: () => onDelete(lead.id), variant: 'danger' as const, icon: <Trash2 className="h-3.5 w-3.5" /> },
            ]}
          />
        </div>
      </div>

      {/* Valor */}
      {lead.valor && (
        <div className="mb-2.5">
          <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
            {formatarMoeda(lead.valor)}
          </span>
        </div>
      )}

      {/* Contatos rápidos */}
      <div className="flex items-center gap-3 mb-2.5">
        {lead.telefone && (
          <a
            href={`tel:${lead.telefone}`}
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors"
          >
            <Phone className="h-3 w-3" />
            <span className="hidden sm:inline">Ligar</span>
          </a>
        )}
        {lead.email && (
          <a
            href={`mailto:${lead.email}`}
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors"
          >
            <Mail className="h-3 w-3" />
            <span className="hidden sm:inline">E-mail</span>
          </a>
        )}
        {lead.contatoEm && (
          <div className="flex items-center gap-1 text-xs text-muted-foreground ml-auto">
            <Calendar className="h-3 w-3" />
            <span>{formatarDataRelativa(lead.contatoEm)}</span>
          </div>
        )}
      </div>

      {/* Footer: responsável + contadores */}
      <div className="flex items-center justify-between pt-2.5 border-t">
        {lead.responsavel ? (
          <div className="flex items-center gap-1.5">
            <Avatar src={lead.responsavel.avatar} nome={lead.responsavel.nome} size="sm" />
            <span className="text-xs text-muted-foreground">{lead.responsavel.nome.split(' ')[0]}</span>
          </div>
        ) : (
          <span className="text-xs text-muted-foreground/50 italic">Sem responsável</span>
        )}

        {lead._count && (
          <div className="flex items-center gap-2">
            {lead._count.tarefas > 0 && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <CheckSquare className="h-3 w-3" />
                <span>{lead._count.tarefas}</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
