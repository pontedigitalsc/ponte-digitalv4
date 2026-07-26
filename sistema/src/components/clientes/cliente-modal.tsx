'use client'

import { useState } from 'react'
import {
  Dialog, DialogContent, DialogHeader,
  DialogTitle, DialogDescription,
} from '@/components/ui/dialog'
import { ClienteForm } from './cliente-form'
import type { Cliente } from '@/types'
import type { ClienteInput } from '@/lib/validations'

interface ClienteModalProps {
  open: boolean
  cliente?: Cliente | null
  onClose: () => void
  onSubmit: (dados: ClienteInput) => Promise<void>
}

export function ClienteModal({ open, cliente, onClose, onSubmit }: ClienteModalProps) {
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (dados: ClienteInput) => {
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
      <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{cliente ? 'Editar cliente' : 'Novo cliente'}</DialogTitle>
          <DialogDescription>
            {cliente
              ? 'Atualize os dados do cliente abaixo.'
              : 'Preencha os dados para cadastrar um novo cliente.'}
          </DialogDescription>
        </DialogHeader>
        <ClienteForm
          cliente={cliente}
          onSubmit={handleSubmit}
          onCancel={onClose}
          loading={loading}
        />
      </DialogContent>
    </Dialog>
  )
}
