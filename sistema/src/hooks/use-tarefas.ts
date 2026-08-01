'use client'

import { useState, useCallback } from 'react'
import { apiFetch, mensagemDeErro } from '@/lib/api-client'
import type { Tarefa, FiltroTarefa } from '@/types'
import type { TarefaInput } from '@/lib/validations'

interface UseTarefasReturn {
  tarefas: Tarefa[]
  total: number
  loading: boolean
  error: string | null
  carregarTarefas: (filtros?: FiltroTarefa) => Promise<void>
  criarTarefa: (dados: TarefaInput) => Promise<Tarefa | null>
  atualizarTarefa: (id: string, dados: Partial<TarefaInput>) => Promise<Tarefa | null>
  toggleConcluida: (id: string) => Promise<void>
  excluirTarefa: (id: string) => Promise<boolean>
}

export function useTarefas(filtrosIniciais?: FiltroTarefa): UseTarefasReturn {
  const [tarefas, setTarefas] = useState<Tarefa[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // ─── CARREGAR ──────────────────────────────────────────────────────────────

  const carregarTarefas = useCallback(async (filtros?: FiltroTarefa) => {
    setLoading(true)
    setError(null)
    try {
      const params = new URLSearchParams()
      const f = { ...filtrosIniciais, ...filtros }
      if (f.status)        params.set('status',        f.status)
      if (f.prioridade)    params.set('prioridade',    f.prioridade)
      if (f.tipo)          params.set('tipo',          f.tipo)
      if (f.responsavelId) params.set('responsavelId', f.responsavelId)
      if (f.clienteId)     params.set('clienteId',     f.clienteId)
      if (f.page)          params.set('page',          String(f.page))

      const json = await apiFetch<{ tarefas: Tarefa[]; total: number }>(`/api/tarefas?${params}`)
      setTarefas(json.tarefas ?? [])
      setTotal(json.total ?? 0)
    } catch (e) {
      setError(mensagemDeErro(e, 'Não consegui carregar as tarefas'))
    } finally {
      setLoading(false)
    }
  }, [filtrosIniciais])

  // ─── CRIAR ─────────────────────────────────────────────────────────────────

  const criarTarefa = useCallback(async (dados: TarefaInput): Promise<Tarefa | null> => {
    try {
      const { data } = await apiFetch<{ data: Tarefa }>('/api/tarefas', {
        method: 'POST',
        json: dados,
      })
      setTarefas((prev) => [data, ...prev])
      setTotal((t) => t + 1)
      return data
    } catch (e) {
      setError(mensagemDeErro(e, 'Não consegui criar a tarefa'))
      return null
    }
  }, [])

  // ─── ATUALIZAR ─────────────────────────────────────────────────────────────

  const atualizarTarefa = useCallback(async (id: string, dados: Partial<TarefaInput>): Promise<Tarefa | null> => {
    try {
      const { data } = await apiFetch<{ data: Tarefa }>(`/api/tarefas/${id}`, {
        method: 'PATCH',
        json: dados,
      })
      setTarefas((prev) => prev.map((t) => (t.id === id ? data : t)))
      return data
    } catch (e) {
      setError(mensagemDeErro(e, 'Não consegui guardar a alteração'))
      return null
    }
  }, [])

  // ─── TOGGLE CONCLUÍDA (otimista) ───────────────────────────────────────────

  const toggleConcluida = useCallback(async (id: string) => {
    // Update otimista imediato
    setTarefas((prev) =>
      prev.map((t) =>
        t.id === id
          ? { ...t, status: t.status === 'CONCLUIDA' ? ('PENDENTE' as const) : ('CONCLUIDA' as const) }
          : t
      )
    )
    try {
      const { data } = await apiFetch<{ data: Tarefa }>(`/api/tarefas/${id}`, {
        method: 'PATCH',
        json: { _toggle: true },
      })
      setTarefas((prev) => prev.map((t) => (t.id === id ? data : t)))
    } catch (e) {
      // Reverter — e mostrar a razão real (ex: rate limit em cliques
      // muito rápidos), não mais um texto genérico fixo
      setError(mensagemDeErro(e, 'Não consegui concluir a tarefa'))
      await carregarTarefas()
    }
  }, [carregarTarefas])

  // ─── EXCLUIR ───────────────────────────────────────────────────────────────

  const excluirTarefa = useCallback(async (id: string): Promise<boolean> => {
    setTarefas((prev) => prev.filter((t) => t.id !== id))
    setTotal((n) => n - 1)
    try {
      await apiFetch(`/api/tarefas/${id}`, { method: 'DELETE' })
      return true
    } catch (e) {
      setError(mensagemDeErro(e, 'Não consegui remover a tarefa'))
      await carregarTarefas()
      return false
    }
  }, [carregarTarefas])

  return { tarefas, total, loading, error, carregarTarefas, criarTarefa, atualizarTarefa, toggleConcluida, excluirTarefa }
}
