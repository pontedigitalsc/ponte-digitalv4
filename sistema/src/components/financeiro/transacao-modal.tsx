'use client'

import { useState } from 'react'
import {
  Dialog, DialogContent, DialogHeader,
  DialogTitle, DialogDescription,
} from '@/components/ui/dialog'
import { TransacaoForm } from './transacao-form'
import type { Transacao } from '@/types'
import type { TransacaoInput } from '@/lib/validations'

interface TransacaoModalProps {
  open: boolean
  transacao?: Transacao | null
  tipoInicial?: 'RECEITA' | 'DESPESA'
  clienteIdInicial?: string
  onClose: () => void
  onSubmit: (dados: TransacaoInput) => Promise<void>
}

export function TransacaoModal({ open, transacao, tipoInicial, clienteIdInicial, onClose, onSubmit }: TransacaoModalProps) {
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (dados: TransacaoInput) => {
    setLoading(true)
    try { await onSubmit(dados); onClose() }
    finally { setLoading(false) }
  }

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>{transacao ? 'Editar lançamento' : 'Novo lançamento'}</DialogTitle>
          <DialogDescription>
            {transacao ? 'Atualize os dados do lançamento.' : 'Anote uma nova receita ou despesa.'}
          </DialogDescription>
        </DialogHeader>
        <TransacaoForm
          transacao={transacao}
          tipoInicial={tipoInicial}
          clienteIdInicial={clienteIdInicial}
          onSubmit={handleSubmit}
          onCancel={onClose}
          loading={loading}
        />
      </DialogContent>
    </Dialog>
  )
}
