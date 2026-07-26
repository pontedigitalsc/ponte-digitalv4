'use client'

import { useState } from 'react'
import {
  Dialog, DialogContent, DialogHeader,
  DialogTitle, DialogDescription
} from '@/components/ui/dialog'
import { LeadForm } from './lead-form'
import type { Lead, EstagioLead } from '@/types'
import type { LeadInput } from '@/lib/validations'

interface LeadModalProps {
  open: boolean
  lead?: Lead | null
  estagioInicial?: EstagioLead
  onClose: () => void
  onSubmit: (dados: LeadInput) => Promise<void>
}

export function LeadModal({ open, lead, estagioInicial, onClose, onSubmit }: LeadModalProps) {
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (dados: LeadInput) => {
    setLoading(true)
    try {
      await onSubmit(dados)
      onClose()
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{lead ? 'Editar oportunidade' : 'Nova oportunidade'}</DialogTitle>
          <DialogDescription>
            {lead
              ? 'Atualize as informações desta oportunidade.'
              : 'Preencha os dados para adicionar uma nova oportunidade às etapas de negociação.'}
          </DialogDescription>
        </DialogHeader>
        <LeadForm
          lead={lead}
          estagioInicial={estagioInicial}
          onSubmit={handleSubmit}
          onCancel={onClose}
          loading={loading}
        />
      </DialogContent>
    </Dialog>
  )
}
