'use client'

import { useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { leadSchema, type LeadInput } from '@/lib/validations'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Label, Textarea, Select, SelectTrigger, SelectValue,
  SelectContent, SelectItem
} from '@/components/ui/form-elements'
import { ORIGENS_LEAD, ESTAGIOS_LEAD, TEMPERATURA } from '@/constants'
import type { Lead, EstagioLead } from '@/types'

interface LeadFormProps {
  lead?: Lead | null
  estagioInicial?: EstagioLead
  onSubmit: (dados: LeadInput) => Promise<void>
  onCancel: () => void
  loading?: boolean
}

export function LeadForm({ lead, estagioInicial, onSubmit, onCancel, loading }: LeadFormProps) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<LeadInput>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      nome: '',
      email: '',
      telefone: '',
      empresa: '',
      cargo: '',
      origem: 'INDICACAO',
      estagio: estagioInicial ?? 'CONTATO',
      temperatura: 'MORNO',
      valor: null,
      observacoes: '',
      responsavelId: null,
    },
  })

  // Preenche o formulário quando editando
  useEffect(() => {
    if (lead) {
      reset({
        nome: lead.nome,
        email: lead.email ?? '',
        telefone: lead.telefone ?? '',
        empresa: lead.empresa ?? '',
        cargo: lead.cargo ?? '',
        origem: lead.origem,
        estagio: lead.estagio,
        temperatura: lead.temperatura,
        valor: lead.valor ?? null,
        observacoes: lead.observacoes ?? '',
        responsavelId: lead.responsavelId ?? null,
      })
    }
  }, [lead, reset])

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Nome */}
      <div className="space-y-1.5">
        <Label htmlFor="nome">Nome <span className="text-destructive">*</span></Label>
        <Input id="nome" placeholder="João Silva" {...register('nome')} />
        {errors.nome && <p className="text-xs text-destructive">{errors.nome.message}</p>}
      </div>

      {/* Empresa + Cargo */}
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label htmlFor="empresa">Empresa</Label>
          <Input id="empresa" placeholder="Empresa Ltda" {...register('empresa')} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="cargo">Cargo</Label>
          <Input id="cargo" placeholder="Gerente" {...register('cargo')} />
        </div>
      </div>

      {/* E-mail + Telefone */}
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label htmlFor="email">E-mail</Label>
          <Input id="email" type="email" placeholder="joao@empresa.com" {...register('email')} />
          {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="telefone">Telefone</Label>
          <Input id="telefone" placeholder="(11) 99999-9999" {...register('telefone')} />
        </div>
      </div>

      {/* Origem + Temperatura */}
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label>Origem</Label>
          <Controller
            name="origem"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {ORIGENS_LEAD.map((o) => (
                    <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>
        <div className="space-y-1.5">
          <Label>Temperatura</Label>
          <Controller
            name="temperatura"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {Object.entries(TEMPERATURA).map(([key, t]) => (
                    <SelectItem key={key} value={key}>{t.emoji} {t.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>
      </div>

      {/* Estágio + Valor */}
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label>Estágio</Label>
          <Controller
            name="estagio"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {Object.entries(ESTAGIOS_LEAD).map(([key, e]) => (
                    <SelectItem key={key} value={key}>{e.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="valor">Valor estimado (R$)</Label>
          <Input
            id="valor"
            type="number"
            step="0.01"
            min="0"
            placeholder="0,00"
            {...register('valor', { valueAsNumber: true })}
          />
        </div>
      </div>

      {/* Observações */}
      <div className="space-y-1.5">
        <Label htmlFor="observacoes">Observações</Label>
        <Textarea
          id="observacoes"
          placeholder="Anotações sobre este lead..."
          rows={3}
          {...register('observacoes')}
        />
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-2 pt-2">
        <Button type="button" variant="outline" onClick={onCancel} disabled={loading}>
          Cancelar
        </Button>
        <Button type="submit" disabled={loading}>
          {loading && <Loader2 className="h-4 w-4 animate-spin" />}
          {lead ? 'Salvar alterações' : 'Criar lead'}
        </Button>
      </div>
    </form>
  )
}
