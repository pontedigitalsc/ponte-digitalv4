'use client'

import { useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { clienteSchema, type ClienteInput } from '@/lib/validations'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Label, Textarea, Select, SelectTrigger,
  SelectValue, SelectContent, SelectItem,
} from '@/components/ui/form-elements'
import { STATUS_CLIENTE } from '@/constants'
import type { Cliente } from '@/types'

const SEGMENTOS = [
  'Barbearia', 'Conveniência', 'Borracharia', 'Lavação', 'Oficina', 'Mercado',
  'Loja', 'Prestador de serviços', 'Clínica', 'Restaurante',
  'Tecnologia', 'Educação', 'Outro',
]

const ESTADOS_BR = [
  'AC','AL','AM','AP','BA','CE','DF','ES','GO','MA','MG','MS','MT',
  'PA','PB','PE','PI','PR','RJ','RN','RO','RR','RS','SC','SE','SP','TO',
]

interface ClienteFormProps {
  cliente?: Cliente | null
  onSubmit: (dados: ClienteInput) => Promise<void>
  onCancel: () => void
  loading?: boolean
}

export function ClienteForm({ cliente, onSubmit, onCancel, loading }: ClienteFormProps) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<ClienteInput>({
    resolver: zodResolver(clienteSchema),
    defaultValues: {
      nome: '',
      email: '',
      telefone: '',
      documento: '',
      segmento: '',
      site: '',
      endereco: '',
      cidade: '',
      estado: '',
      status: 'ATIVO',
      valorMensal: null,
      diaVencimento: null,
      observacoes: '',
    },
  })

  useEffect(() => {
    if (cliente) {
      reset({
        nome: cliente.nome,
        email: cliente.email ?? '',
        telefone: cliente.telefone ?? '',
        documento: cliente.documento ?? '',
        segmento: cliente.segmento ?? '',
        site: cliente.site ?? '',
        endereco: cliente.endereco ?? '',
        cidade: cliente.cidade ?? '',
        estado: cliente.estado ?? '',
        status: cliente.status,
        valorMensal: cliente.valorMensal ?? null,
        diaVencimento: cliente.diaVencimento ?? null,
        observacoes: cliente.observacoes ?? '',
      })
    }
  }, [cliente, reset])

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* ── Identificação ── */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
          Identificação
        </p>
        <div className="space-y-3">
          <div className="space-y-1.5">
            <Label htmlFor="nome">Nome <span className="text-destructive">*</span></Label>
            <Input id="nome" placeholder="Nome do cliente ou empresa" {...register('nome')} />
            {errors.nome && <p className="text-xs text-destructive">{errors.nome.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="documento">CPF / CNPJ</Label>
              <Input id="documento" placeholder="00.000.000/0001-00" {...register('documento')} />
            </div>
            <div className="space-y-1.5">
              <Label>Segmento</Label>
              <Controller
                name="segmento"
                control={control}
                render={({ field }) => (
                  <Select value={field.value ?? ''} onValueChange={field.onChange}>
                    <SelectTrigger><SelectValue placeholder="Selecionar" /></SelectTrigger>
                    <SelectContent>
                      {SEGMENTOS.map((s) => (
                        <SelectItem key={s} value={s}>{s}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label>Status</Label>
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {Object.entries(STATUS_CLIENTE).map(([key, s]) => (
                      <SelectItem key={key} value={key}>{s.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>
        </div>
      </div>

      {/* ── Contato ── */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
          Contato
        </p>
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="email">E-mail</Label>
              <Input id="email" type="email" placeholder="contato@empresa.com" {...register('email')} />
              {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="telefone">Telefone</Label>
              <Input id="telefone" placeholder="(11) 99999-9999" {...register('telefone')} />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="site">Site</Label>
            <Input id="site" placeholder="https://empresa.com.br" {...register('site')} />
            {errors.site && <p className="text-xs text-destructive">{errors.site.message}</p>}
          </div>
        </div>
      </div>

      {/* ── Endereço ── */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
          Endereço
        </p>
        <div className="space-y-3">
          <div className="space-y-1.5">
            <Label htmlFor="endereco">Endereço</Label>
            <Input id="endereco" placeholder="Rua, número, bairro" {...register('endereco')} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="cidade">Cidade</Label>
              <Input id="cidade" placeholder="São Paulo" {...register('cidade')} />
            </div>
            <div className="space-y-1.5">
              <Label>Estado</Label>
              <Controller
                name="estado"
                control={control}
                render={({ field }) => (
                  <Select value={field.value ?? ''} onValueChange={field.onChange}>
                    <SelectTrigger><SelectValue placeholder="UF" /></SelectTrigger>
                    <SelectContent>
                      {ESTADOS_BR.map((uf) => (
                        <SelectItem key={uf} value={uf}>{uf}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── Financeiro ── */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
          Financeiro
        </p>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label htmlFor="valorMensal">Mensalidade (R$)</Label>
            <Input
              id="valorMensal"
              type="number"
              step="0.01"
              min="0"
              placeholder="0,00"
              {...register('valorMensal', { valueAsNumber: true })}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="diaVencimento">Dia de vencimento</Label>
            <Input
              id="diaVencimento"
              type="number"
              min="1"
              max="31"
              placeholder="10"
              {...register('diaVencimento', { valueAsNumber: true })}
            />
          </div>
        </div>
      </div>

      {/* ── Observações ── */}
      <div className="space-y-1.5">
        <Label htmlFor="observacoes">Observações</Label>
        <Textarea
          id="observacoes"
          placeholder="Informações adicionais sobre o cliente..."
          rows={3}
          {...register('observacoes')}
        />
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-2 pt-1">
        <Button type="button" variant="outline" onClick={onCancel} disabled={loading}>
          Cancelar
        </Button>
        <Button type="submit" disabled={loading}>
          {loading && <Loader2 className="h-4 w-4 animate-spin" />}
          {cliente ? 'Guardar alterações' : 'Criar cliente'}
        </Button>
      </div>
    </form>
  )
}
