'use client'

import { useState, useCallback } from 'react'
import { apiFetch, mensagemDeErro } from '@/lib/api-client'
import type { Cliente, FiltroCliente } from '@/types'
import type { ClienteInput } from '@/lib/validations'

interface UseClientesReturn {
  clientes: Cliente[]
  total: number
  totalPages: number
  loading: boolean
  error: string | null
  carregarClientes: (filtros?: FiltroCliente) => Promise<void>
  criarCliente: (dados: ClienteInput) => Promise<Cliente | null>
  atualizarCliente: (id: string, dados: Partial<ClienteInput>) => Promise<Cliente | null>
  excluirCliente: (id: string) => Promise<boolean>
  converterLead: (leadId: string, extras?: Partial<ClienteInput>) => Promise<Cliente | null>
}

export function useClientes(filtrosIniciais?: FiltroCliente): UseClientesReturn {
  const [clientes, setClientes] = useState<Cliente[]>([])
  const [total, setTotal] = useState(0)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // ─── CARREGAR ──────────────────────────────────────────────────────────────

  const carregarClientes = useCallback(async (filtros?: FiltroCliente) => {
    setLoading(true)
    setError(null)
    try {
      const params = new URLSearchParams()
      const f = { ...filtrosIniciais, ...filtros }
      if (f.status)   params.set('status', f.status)
      if (f.segmento) params.set('segmento', f.segmento)
      if (f.busca)    params.set('busca', f.busca)
      if (f.page)     params.set('page', String(f.page))

      const json = await apiFetch<{ clientes: Cliente[]; total: number; totalPages: number }>(
        `/api/clientes?${params}`
      )
      setClientes(json.clientes ?? [])
      setTotal(json.total ?? 0)
      setTotalPages(json.totalPages ?? 1)
    } catch (e) {
      setError(mensagemDeErro(e, 'Erro ao carregar clientes'))
    } finally {
      setLoading(false)
    }
  }, [filtrosIniciais])

  // ─── CRIAR ─────────────────────────────────────────────────────────────────

  const criarCliente = useCallback(async (dados: ClienteInput): Promise<Cliente | null> => {
    try {
      const { data } = await apiFetch<{ data: Cliente }>('/api/clientes', {
        method: 'POST',
        json: dados,
      })
      setClientes((prev) => [data, ...prev])
      setTotal((t) => t + 1)
      return data
    } catch (e) {
      setError(mensagemDeErro(e, 'Erro ao criar cliente'))
      return null
    }
  }, [])

  // ─── ATUALIZAR ─────────────────────────────────────────────────────────────

  const atualizarCliente = useCallback(async (id: string, dados: Partial<ClienteInput>): Promise<Cliente | null> => {
    try {
      const { data } = await apiFetch<{ data: Cliente }>(`/api/clientes/${id}`, {
        method: 'PATCH',
        json: dados,
      })
      setClientes((prev) => prev.map((c) => (c.id === id ? data : c)))
      return data
    } catch (e) {
      setError(mensagemDeErro(e, 'Erro ao atualizar cliente'))
      return null
    }
  }, [])

  // ─── EXCLUIR ───────────────────────────────────────────────────────────────

  const excluirCliente = useCallback(async (id: string): Promise<boolean> => {
    // Update otimista: remove da UI antes da confirmação do servidor
    setClientes((prev) => prev.filter((c) => c.id !== id))
    setTotal((t) => t - 1)
    try {
      await apiFetch(`/api/clientes/${id}`, { method: 'DELETE' })
      return true
    } catch (e) {
      // Reverte o update otimista e mostra a razão real (ex: "Esta ação
      // exige permissão de GESTOR ou superior", não mais um texto genérico)
      setError(mensagemDeErro(e, 'Erro ao excluir cliente'))
      await carregarClientes()
      return false
    }
  }, [carregarClientes])

  // ─── CONVERTER LEAD ────────────────────────────────────────────────────────

  const converterLead = useCallback(async (leadId: string, extras?: Partial<ClienteInput>): Promise<Cliente | null> => {
    try {
      const { data } = await apiFetch<{ data: Cliente }>(`/api/leads/${leadId}/converter`, {
        method: 'POST',
        json: extras ?? {},
      })
      setClientes((prev) => [data, ...prev])
      setTotal((t) => t + 1)
      return data
    } catch (e) {
      setError(mensagemDeErro(e, 'Erro ao converter lead'))
      return null
    }
  }, [])

  return {
    clientes, total, totalPages, loading, error,
    carregarClientes, criarCliente, atualizarCliente, excluirCliente, converterLead,
  }
}
