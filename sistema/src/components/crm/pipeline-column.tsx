'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'
import { LeadCard } from './lead-card'
import { cn, formatarMoeda } from '@/lib/utils'
import { ESTAGIOS_LEAD } from '@/constants'
import type { Lead, EstagioLead } from '@/types'

interface PipelineColumnProps {
  estagio: EstagioLead
  leads: Lead[]
  onAddLead: (estagio: EstagioLead) => void
  onEditLead: (lead: Lead) => void
  onDeleteLead: (id: string) => void
  onDropLead: (leadId: string, novoEstagio: EstagioLead) => void
}

export function PipelineColumn({
  estagio,
  leads,
  onAddLead,
  onEditLead,
  onDeleteLead,
  onDropLead,
}: PipelineColumnProps) {
  const [dragOver, setDragOver] = useState(false)
  const config = ESTAGIOS_LEAD[estagio]

  const totalValor = leads.reduce((acc, l) => acc + (l.valor ?? 0), 0)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
    setDragOver(true)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    const leadId = e.dataTransfer.getData('leadId')
    if (leadId) onDropLead(leadId, estagio)
  }

  const isFechado = estagio === 'FECHADO_GANHO' || estagio === 'FECHADO_PERDIDO'

  return (
    <div className="flex flex-col min-w-[272px] w-[272px]">
      {/* Column header */}
      <div className="flex items-center justify-between mb-3 px-1">
        <div className="flex items-center gap-2">
          <div
            className="h-2 w-2 rounded-full"
            style={{ backgroundColor: config.cor }}
          />
          <span className="text-sm font-semibold">{config.label}</span>
          <span
            className="flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[10px] font-semibold"
            style={{ color: config.cor, backgroundColor: config.bg }}
          >
            {leads.length}
          </span>
        </div>
        {totalValor > 0 && (
          <span className="text-xs font-medium text-muted-foreground">
            {formatarMoeda(totalValor)}
          </span>
        )}
      </div>

      {/* Drop zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        className={cn(
          'flex-1 flex flex-col gap-2.5 rounded-xl p-2 min-h-[200px] transition-colors',
          dragOver
            ? 'bg-primary/5 border-2 border-dashed border-primary/40'
            : 'bg-muted/40 border-2 border-transparent'
        )}
      >
        {/* Lead cards */}
        {leads.map((lead) => (
          <LeadCard
            key={lead.id}
            lead={lead}
            onEdit={onEditLead}
            onDelete={onDeleteLead}
          />
        ))}

        {/* Empty state */}
        {leads.length === 0 && (
          <div className="flex-1 flex items-center justify-center py-8">
            <p className="text-xs text-muted-foreground/50 text-center">
              {dragOver ? 'Solte aqui' : 'Arraste uma oportunidade para cá'}
            </p>
          </div>
        )}

        {/* Add lead button */}
        {!isFechado && (
          <button
            onClick={() => onAddLead(estagio)}
            className="flex items-center gap-2 w-full rounded-lg px-3 py-2 text-xs text-muted-foreground hover:bg-card hover:text-foreground hover:shadow-sm transition-all border border-dashed border-transparent hover:border-border mt-1"
          >
            <Plus className="h-3.5 w-3.5" />
            Adicionar oportunidade
          </button>
        )}
      </div>
    </div>
  )
}
