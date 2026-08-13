'use client'

import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { historicoSchema, type HistoricoInput } from '@/lib/validations'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Label, Textarea, Select, SelectTrigger,
  SelectValue, SelectContent, SelectItem,
} from '@/components/ui/form-elements'
import {
  Dialog, DialogContent, DialogHeader,
  DialogTitle, DialogDescription,
} from '@/components/ui/dialog'
import { TIPO_HISTORICO } from '@/constants'

const TIPOS_MANUAIS = ['NOTA', 'LIGACAO', 'EMAIL', 'REUNIAO', 'WHATSAPP', 'PROPOSTA', 'CONTRATO'] as const

interface HistoricoModalProps {
  open: boolean
  clienteId?: string
  onClose: () => void
  onSubmit: (dados: HistoricoInput) => Promise<void>
}

export function HistoricoModal({ open, clienteId, onClose, onSubmit }: HistoricoModalProps) {
  const [loading, setLoading] = useState(false)

  const {
    register, handleSubmit, control, reset,
    formState: { errors },
  } = useForm<HistoricoInput>({
    resolver: zodResolver(historicoSchema),
    defaultValues: {
      tipo: 'NOTA',
      titulo: '',
      descricao: '',
      clienteId,
      leadId: null,
    },
  })

  const handleClose = () => {
    reset({ tipo: 'NOTA', titulo: '', descricao: '', clienteId, leadId: null })
    onClose()
  }

  const handleSubmitForm = async (dados: HistoricoInput) => {
    setLoading(true)
    try {
      await onSubmit({ ...dados, clienteId: clienteId ?? dados.clienteId })
      handleClose()
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={(v) => !v && handleClose()}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Anotar contato</DialogTitle>
          <DialogDescription>
            Registre a interação com este contato para guardar na memória da empresa.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleSubmitForm)} className="space-y-4">
          <div className="space-y-1.5">
            <Label>Tipo</Label>
            <Controller
              name="tipo"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {TIPOS_MANUAIS.map((tipo) => {
                      const t = TIPO_HISTORICO[tipo]
                      return (
                        <SelectItem key={tipo} value={tipo}>{t.label}</SelectItem>
                      )
                    })}
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="titulo">Título <span className="text-destructive">*</span></Label>
            <Input id="titulo" placeholder="Resumo do contato..." autoFocus {...register('titulo')} />
            {errors.titulo && <p className="text-xs text-destructive">{errors.titulo.message}</p>}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="descricao">Detalhes</Label>
            <Textarea id="descricao" placeholder="Complemento dessa interação..." rows={3} {...register('descricao')} />
          </div>

          <div className="flex justify-end gap-2 pt-1">
            <Button type="button" variant="outline" onClick={handleClose} disabled={loading}>
              Cancelar
            </Button>
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="h-4 w-4 animate-spin" />}
              Guardar anotação
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}