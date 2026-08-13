'use client'

import { useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { transacaoSchema, type TransacaoInput } from '@/lib/validations'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Label, Textarea, Select, SelectTrigger,
  SelectValue, SelectContent, SelectItem,
} from '@/components/ui/form-elements'
import { STATUS_TRANSACAO, CATEGORIAS_RECEITA, CATEGORIAS_DESPESA } from '@/constants'
import type { Transacao } from '@/types'

interface TransacaoFormProps {
  transacao?: Transacao | null
  tipoInicial?: 'RECEITA' | 'DESPESA'
  clienteIdInicial?: string
  onSubmit: (dados: TransacaoInput) => Promise<void>
  onCancel: () => void
  loading?: boolean
}

export function TransacaoForm({ transacao, tipoInicial = 'RECEITA', clienteIdInicial, onSubmit, onCancel, loading }: TransacaoFormProps) {
  const {
    register, handleSubmit, control, watch, reset,
    formState: { errors },
  } = useForm<TransacaoInput>({
    resolver: zodResolver(transacaoSchema),
    defaultValues: {
      tipo:           tipoInicial,
      categoria:      '',
      descricao:      '',
      valor:          0,
      status:         'PENDENTE',
      dataVencimento: null,
      dataPagamento:  null,
      recorrente:     false,
      clienteId:      clienteIdInicial ?? null,
      observacoes:    '',
    },
  })

  const tipoAtual = watch('tipo')
  const categorias = tipoAtual === 'RECEITA' ? CATEGORIAS_RECEITA : CATEGORIAS_DESPESA

  useEffect(() => {
    if (transacao) {
      reset({
        tipo:           transacao.tipo,
        categoria:      transacao.categoria ?? '',
        descricao:      transacao.descricao,
        valor:          transacao.valor,
        status:         transacao.status,
        dataVencimento: transacao.dataVencimento ?? null,
        dataPagamento:  transacao.dataPagamento  ?? null,
        recorrente:     transacao.recorrente,
        clienteId:      transacao.clienteId ?? null,
        observacoes:    transacao.observacoes ?? '',
      })
    }
  }, [transacao, reset])

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Tipo */}
      <div className="space-y-1.5">
        <Label>Tipo</Label>
        <Controller
          name="tipo"
          control={control}
          render={({ field }) => (
            <div className="grid grid-cols-2 gap-2">
              {(['RECEITA', 'DESPESA'] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => field.onChange(t)}
                  className={`rounded-lg border py-2.5 text-sm font-medium transition-colors ${
                    field.value === t
                      ? t === 'RECEITA'
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400'
                        : 'border-destructive bg-destructive/5 text-destructive'
                      : 'border-border hover:bg-accent'
                  }`}
                >
                  {t === 'RECEITA' ? '↑ Receita' : '↓ Despesa'}
                </button>
              ))}
            </div>
          )}
        />
      </div>

      {/* Descrição */}
      <div className="space-y-1.5">
        <Label htmlFor="descricao">Descrição <span className="text-destructive">*</span></Label>
        <Input id="descricao" placeholder="Ex: Mensalidade — Cliente XPTO" {...register('descricao')} />
        {errors.descricao && <p className="text-xs text-destructive">{errors.descricao.message}</p>}
      </div>

      {/* Valor + Categoria */}
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label htmlFor="valor">Valor (R$) <span className="text-destructive">*</span></Label>
          <Input
            id="valor"
            type="number"
            step="0.01"
            min="0"
            placeholder="0,00"
            {...register('valor', { valueAsNumber: true })}
          />
          {errors.valor && <p className="text-xs text-destructive">{errors.valor.message}</p>}
        </div>
        <div className="space-y-1.5">
          <Label>Categoria</Label>
          <Controller
            name="categoria"
            control={control}
            render={({ field }) => (
              <Select value={field.value ?? ''} onValueChange={field.onChange}>
                <SelectTrigger><SelectValue placeholder="Selecionar" /></SelectTrigger>
                <SelectContent>
                  {categorias.map((c) => (
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>
      </div>

      {/* Status + Vencimento */}
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
                  {Object.entries(STATUS_TRANSACAO).map(([k, s]) => (
                    <SelectItem key={k} value={k}>{s.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="dataVencimento">Vencimento</Label>
          <Input id="dataVencimento" type="date" {...register('dataVencimento')} />
        </div>
      </div>

      {/* Data de pagamento */}
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label htmlFor="dataPagamento">Data de pagamento</Label>
          <Input id="dataPagamento" type="date" {...register('dataPagamento')} />
        </div>
        <div className="space-y-1.5 flex flex-col justify-end">
          <Controller
            name="recorrente"
            control={control}
            render={({ field }) => (
              <label className="flex items-center gap-2 cursor-pointer pb-2">
                <div
                  onClick={() => field.onChange(!field.value)}
                  className={`relative h-5 w-9 rounded-full transition-colors ${field.value ? 'bg-primary' : 'bg-muted-foreground/30'}`}
                >
                  <div className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform ${field.value ? 'translate-x-4' : 'translate-x-0.5'}`} />
                </div>
                <span className="text-sm text-muted-foreground">Recorrente</span>
              </label>
            )}
          />
        </div>
      </div>

      {/* Observações */}
      <div className="space-y-1.5">
        <Label htmlFor="observacoes">Observações</Label>
        <Textarea id="observacoes" placeholder="Informações adicionais..." rows={2} {...register('observacoes')} />
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-2 pt-1">
        <Button type="button" variant="outline" onClick={onCancel} disabled={loading}>
          Cancelar
        </Button>
        <Button type="submit" disabled={loading}>
          {loading && <Loader2 className="h-4 w-4 animate-spin" />}
          {transacao ? 'Guardar alterações' : 'Anotar'}
        </Button>
      </div>
    </form>
  )
}
