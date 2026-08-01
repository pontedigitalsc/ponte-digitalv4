'use client'

import { useState, useCallback } from 'react'
import { apiFetch, mensagemDeErro } from '@/lib/api-client'
import type { Lead, EstagioLead, FiltroLead } from '@/types'
import type { LeadInput } from '@/lib/validations'

// ─── ESTADO LOCAL DO PIPELINE (otimista) ─────────────────────────────────────
// Usamos estado local com updates otimistas para o pipeline Kanban ser fluido.
// Em vez de React Query (que adiciona complexidade), mantemos simples com fetch.

interface UseLeadsReturn {
  leads: Lead[]
  loading: boolean
  error: string | null
  carregarLeads: (filtros?: FiltroLead) => Promise<void>
  criarLead: (dados: LeadInput) => Promise<Lead | null>
  atualizarLead: (id: string, dados: Partial<LeadInput>) => Promise<Lead | null>
  moverEstagio: (id: string, novoEstagio: EstagioLead) => Promise<void>
  excluirLead: (id: string) => Promise<boolean>
}

export function useLeads(filtrosIniciais?: FiltroLead): UseLeadsReturn {
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // ─── CARREGAR ──────────────────────────────────────────────────────────────

  const carregarLeads = useCallback(async (filtros?: FiltroLead) => {
    setLoading(true)
    setError(null)
    try {
      const params = new URLSearchParams()
      const f = { ...filtrosIniciais, ...filtros }
      if (f.estagio)       params.set('estagio', f.estagio)
      if (f.responsavelId) params.set('responsavelId', f.responsavelId)
      if (f.temperatura)   params.set('temperatura', f.temperatura)
      if (f.busca)         params.set('busca', f.busca)
      if (f.page)          params.set('page', String(f.page))

      const json = await apiFetch<{ leads: Lead[] }>(`/api/leads?${params}`)
      setLeads(json.leads ?? [])
    } catch (e) {
      setError(mensagemDeErro(e, 'Não consegui carregar as oportunidades'))
    } finally {
      setLoading(false)
    }
  }, [filtrosIniciais])

  // ─── CRIAR ─────────────────────────────────────────────────────────────────

  const criarLead = useCallback(async (dados: LeadInput): Promise<Lead | null> => {
    try {
      const { data } = await apiFetch<{ data: Lead }>('/api/leads', {
        method: 'POST',
        json: dados,
      })
      setLeads((prev) => [data, ...prev])
      return data
    } catch (e) {
      setError(mensagemDeErro(e, 'Não consegui criar a oportunidade'))
      return null
    }
  }, [])

  // ─── ATUALIZAR ─────────────────────────────────────────────────────────────

  const atualizarLead = useCallback(async (id: string, dados: Partial<LeadInput>): Promise<Lead | null> => {
    try {
      const { data } = await apiFetch<{ data: Lead }>(`/api/leads/${id}`, {
        method: 'PATCH',
        json: dados,
      })
      setLeads((prev) => prev.map((l) => (l.id === id ? data : l)))
      return data
    } catch (e) {
      setError(mensagemDeErro(e, 'Não consegui guardar a alteração'))
      return null
    }
  }, [])

  // ─── MOVER ESTÁGIO (update otimista) ───────────────────────────────────────

  const moverEstagio = useCallback(async (id: string, novoEstagio: EstagioLead) => {
    // Update otimista: atualiza UI antes da resposta do servidor
    setLeads((prev) =>
      prev.map((l) => (l.id === id ? { ...l, estagio: novoEstagio } : l))
    )
    try {
      const { data } = await apiFetch<{ data: Lead }>(`/api/leads/${id}`, {
        method: 'PATCH',
        json: { estagio: novoEstagio },
      })
      setLeads((prev) => prev.map((l) => (l.id === id ? data : l)))
    } catch (e) {
      // Reverter update otimista em caso de erro, mostrando a razão real
      // (ex: rate limit ou permissão), não mais um texto genérico
      setError(mensagemDeErro(e, 'Não consegui mover a oportunidade'))
      await carregarLeads()
    }
  }, [carregarLeads])

  // ─── EXCLUIR ───────────────────────────────────────────────────────────────

  const excluirLead = useCallback(async (id: string): Promise<boolean> => {
    // Update otimista
    setLeads((prev) => prev.filter((l) => l.id !== id))
    try {
      await apiFetch(`/api/leads/${id}`, { method: 'DELETE' })
      return true
    } catch (e) {
      setError(mensagemDeErro(e, 'Não consegui remover a oportunidade'))
      await carregarLeads()
      return false
    }
  }, [carregarLeads])

  return { leads, loading, error, carregarLeads, criarLead, atualizarLead, moverEstagio, excluirLead }
}
