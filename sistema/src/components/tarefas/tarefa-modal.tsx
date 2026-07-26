'use client'

import { useState } from 'react'
import {
  Dialog, DialogContent, DialogHeader,
  DialogTitle, DialogDescription,
} from '@/components/ui/dialog'
import { TarefaForm } from './tarefa-form'
import type { Tarefa } from '@/types'
import type { TarefaInput } from '@/lib/validations'

interface TarefaModalProps {
  open: boolean
  tarefa?: Tarefa | null
  clienteIdInicial?: string
  leadIdInicial?: string
  onClose: () => void
  onSubmit: (dados: TarefaInput) => Promise<void>
}

export function TarefaModal({ open, tarefa, clienteIdInicial, leadIdInicial, onClose, onSubmit }: TarefaModalProps) {
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (dados: TarefaInput) => {
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
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>{tarefa ? 'Editar tarefa' : 'Nova tarefa'}</DialogTitle>
          <DialogDescription>
            {tarefa ? 'Atualize os dados da tarefa.' : 'Crie uma nova tarefa para acompanhar.'}
          </DialogDescription>
        </DialogHeader>
        <TarefaForm
          tarefa={tarefa}
          clienteIdInicial={clienteIdInicial}
          leadIdInicial={leadIdInicial}
          onSubmit={handleSubmit}
          onCancel={onClose}
          loading={loading}
        />
      </DialogContent>
    </Dialog>
  )
}
