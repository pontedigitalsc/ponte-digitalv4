'use client'

import { useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { tarefaSchema, type TarefaInput } from '@/lib/validations'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Label, Textarea, Select, SelectTrigger,
  SelectValue, SelectContent, SelectItem,
} from '@/components/ui/form-elements'
import { STATUS_TAREFA, PRIORIDADE, TIPO_TAREFA } from '@/constants'
import type { Tarefa } from '@/types'

interface TarefaFormProps {
  tarefa?: Tarefa | null
  clienteIdInicial?: string
  leadIdInicial?: string
  onSubmit: (dados: TarefaInput) => Promise<void>
  onCancel: () => void
  loading?: boolean
}

export function TarefaForm({ tarefa, clienteIdInicial, leadIdInicial, onSubmit, onCancel, loading }: TarefaFormProps) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<TarefaInput>({
    resolver: zodResolver(tarefaSchema),
    defaultValues: {
      titulo:        '',
      descricao:     '',
      status:        'PENDENTE',
      prioridade:    'MEDIA',
      tipo:          'TAREFA',
      dataVencimento: null,
      responsavelId: null,
      clienteId:     clienteIdInicial ?? null,
      leadId:        leadIdInicial    ?? null,
    },
  })

  useEffect(() => {
    if (tarefa) {
      reset({
        titulo:         tarefa.titulo,
        descricao:      tarefa.descricao     ?? '',
        status:         tarefa.status,
        prioridade:     tarefa.prioridade,
        tipo:           tarefa.tipo,
        dataVencimento: tarefa.dataVencimento ?? null,
        responsavelId:  tarefa.responsavelId  ?? null,
        clienteId:      tarefa.clienteId      ?? null,
        leadId:         tarefa.leadId         ?? null,
      })
    }
  }, [tarefa, reset])

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Título */}
      <div className="space-y-1.5">
        <Label htmlFor="titulo">Título <span className="text-destructive">*</span></Label>
        <Input id="titulo" placeholder="Descreva a tarefa..." autoFocus {...register('titulo')} />
        {errors.titulo && <p className="text-xs text-destructive">{errors.titulo.message}</p>}
      </div>

      {/* Tipo + Prioridade */}
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label>Tipo</Label>
          <Controller
            name="tipo"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {Object.entries(TIPO_TAREFA).map(([key, t]) => (
                    <SelectItem key={key} value={key}>{t.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>
        <div className="space-y-1.5">
          <Label>Prioridade</Label>
          <Controller
            name="prioridade"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {Object.entries(PRIORIDADE).map(([key, p]) => (
                    <SelectItem key={key} value={key}>
                      <span className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full inline-block" style={{ backgroundColor: p.cor }} />
                        {p.label}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>
      </div>

      {/* Status + Data de vencimento */}
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label>Status</Label>
          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {Object.entries(STATUS_TAREFA).map(([key, s]) => (
                    <SelectItem key={key} value={key}>{s.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="dataVencimento">Vencimento</Label>
          <Input
            id="dataVencimento"
            type="date"
            {...register('dataVencimento')}
          />
        </div>
      </div>

      {/* Descrição */}
      <div className="space-y-1.5">
        <Label htmlFor="descricao">Descrição</Label>
        <Textarea
          id="descricao"
          placeholder="Detalhes adicionais..."
          rows={3}
          {...register('descricao')}
        />
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-2 pt-1">
        <Button type="button" variant="outline" onClick={onCancel} disabled={loading}>
          Cancelar
        </Button>
        <Button type="submit" disabled={loading}>
          {loading && <Loader2 className="h-4 w-4 animate-spin" />}
          {tarefa ? 'Guardar alterações' : 'Criar tarefa'}
        </Button>
      </div>
    </form>
  )
}
