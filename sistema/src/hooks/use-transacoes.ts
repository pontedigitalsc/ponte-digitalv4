'use client'

import { useState, useCallback } from 'react'
import { apiFetch, mensagemDeErro } from '@/lib/api-client'
import type { Transacao } from '@/types'
import type { TransacaoInput } from '@/lib/validations'

interface Resumo {
  receitaBruta: number
  despesaBruta: number
  receitaLiquida: number
  despesaLiquida: number
  lucro: number
  margem: number
  receitaPendente: number
  vencidas: number
  receitaAno: number
  despesaAno: number
  mrr: number
  porCategoria: { categoria: string; valor: number }[]
}

interface FiltrosTransacao {
  tipo?: string
  status?: string
  clienteId?: string
  categoria?: string
  busca?: string
  mes?: number
  ano?: number
  page?: number
}

interface UseTransacoesReturn {
  transacoes: Transacao[]
  resumo: Resumo | null
  total: number
  totalPages: number
  loading: boolean
  loadingResumo: boolean
  error: string | null
  carregarTransacoes: (filtros?: FiltrosTransacao) => Promise<void>
  carregarResumo: (mes?: number, ano?: number) => Promise<void>
  criarTransacao: (dados: TransacaoInput) => Promise<Transacao | null>
  atualizarTransacao: (id: string, dados: Partial<TransacaoInput>) => Promise<Transacao | null>
  marcarComoPago: (id: string) => Promise<void>
  excluirTransacao: (id: string) => Promise<boolean>
}

export function useTransacoes(): UseTransacoesReturn {
  const [transacoes, setTransacoes]     = useState<Transacao[]>([])
  const [resumo, setResumo]             = useState<Resumo | null>(null)
  const [total, setTotal]               = useState(0)
  const [totalPages, setTotalPages]     = useState(1)
  const [loading, setLoading]           = useState(false)
  const [loadingResumo, setLoadingResumo] = useState(false)
  const [error, setError]               = useState<string | null>(null)

  // ─── CARREGAR LISTA ────────────────────────────────────────────────────────

  const carregarTransacoes = useCallback(async (filtros?: FiltrosTransacao) => {
    setLoading(true); setError(null)
    try {
      const params = new URLSearchParams()
      if (filtros?.tipo)      params.set('tipo',      filtros.tipo)
      if (filtros?.status)    params.set('status',    filtros.status)
      if (filtros?.clienteId) params.set('clienteId', filtros.clienteId)
      if (filtros?.categoria) params.set('categoria', filtros.categoria)
      if (filtros?.busca)     params.set('busca',     filtros.busca)
      if (filtros?.mes)       params.set('mes',       String(filtros.mes))
      if (filtros?.ano)       params.set('ano',       String(filtros.ano))
      if (filtros?.page)      params.set('page',      String(filtros.page))

      const json = await apiFetch<{ transacoes: Transacao[]; total: number; totalPages: number }>(
        `/api/transacoes?${params}`
      )
      setTransacoes(json.transacoes ?? [])
      setTotal(json.total ?? 0)
      setTotalPages(json.totalPages ?? 1)
    } catch (e) {
      setError(mensagemDeErro(e, 'Não consegui carregar o que entra e o que sai'))
    } finally { setLoading(false) }
  }, [])

  // ─── CARREGAR RESUMO ───────────────────────────────────────────────────────
  // Falha aqui é deliberadamente silenciosa (não propaga para `error`): o
  // resumo é um complemento visual do Dashboard/Financeiro, não deveria
  // travar a tela inteira se a agregação falhar por qualquer motivo.

  const carregarResumo = useCallback(async (mes?: number, ano?: number) => {
    setLoadingResumo(true)
    try {
      const params = new URLSearchParams({ resumo: 'true' })
      if (mes) params.set('mes', String(mes))
      if (ano) params.set('ano', String(ano))
      const json = await apiFetch<Resumo>(`/api/transacoes?${params}`)
      setResumo(json)
    } catch { /* silencioso — comportamento intencional */ }
    finally { setLoadingResumo(false) }
  }, [])

  // ─── CRIAR ─────────────────────────────────────────────────────────────────

  const criarTransacao = useCallback(async (dados: TransacaoInput): Promise<Transacao | null> => {
    try {
      const { data } = await apiFetch<{ data: Transacao }>('/api/transacoes', {
        method: 'POST',
        json: dados,
      })
      setTransacoes((prev) => [data, ...prev])
      setTotal((n) => n + 1)
      return data
    } catch (e) {
      setError(mensagemDeErro(e, 'Não consegui anotar isso'))
      return null
    }
  }, [])

  // ─── ATUALIZAR ─────────────────────────────────────────────────────────────

  const atualizarTransacao = useCallback(async (id: string, dados: Partial<TransacaoInput>): Promise<Transacao | null> => {
    try {
      const { data } = await apiFetch<{ data: Transacao }>(`/api/transacoes/${id}`, {
        method: 'PATCH',
        json: dados,
      })
      setTransacoes((prev) => prev.map((t) => t.id === id ? data : t))
      return data
    } catch (e) {
      setError(mensagemDeErro(e, 'Não consegui guardar a alteração'))
      return null
    }
  }, [])

  // ─── MARCAR COMO PAGO (otimista) ───────────────────────────────────────────

  const marcarComoPago = useCallback(async (id: string) => {
    setTransacoes((prev) => prev.map((t) =>
      t.id === id ? { ...t, status: 'PAGO' as const, dataPagamento: new Date() } : t
    ))
    try {
      const { data } = await apiFetch<{ data: Transacao }>(`/api/transacoes/${id}`, {
        method: 'PATCH',
        json: { _pagar: true },
      })
      setTransacoes((prev) => prev.map((t) => t.id === id ? data : t))
    } catch (e) {
      setError(mensagemDeErro(e, 'Não consegui marcar como pago'))
      await carregarTransacoes()
    }
  }, [carregarTransacoes])

  // ─── EXCLUIR ───────────────────────────────────────────────────────────────

  const excluirTransacao = useCallback(async (id: string): Promise<boolean> => {
    setTransacoes((prev) => prev.filter((t) => t.id !== id))
    setTotal((n) => n - 1)
    try {
      await apiFetch(`/api/transacoes/${id}`, { method: 'DELETE' })
      return true
    } catch (e) {
      setError(mensagemDeErro(e, 'Não consegui remover isso'))
      await carregarTransacoes()
      return false
    }
  }, [carregarTransacoes])

  return {
    transacoes, resumo, total, totalPages, loading, loadingResumo, error,
    carregarTransacoes, carregarResumo, criarTransacao, atualizarTransacao,
    marcarComoPago, excluirTransacao,
  }
}
