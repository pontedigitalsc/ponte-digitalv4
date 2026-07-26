import { compactarSinais } from './tipos'
import type { Tarefa } from '@/types'
import type { Sinal } from './tipos'

/**
 * ─── SINAIS DE TAREFAS ────────────────────────────────────────────────────────
 */

const STATUS_ABERTOS = ['PENDENTE', 'EM_ANDAMENTO'] as const

/**
 * Tarefas com data de vencimento no passado e ainda não concluídas.
 * Mesma regra que já existia na query do Dashboard, extraída para cá.
 */
export function sinalTarefasAtrasadas(tarefas: Tarefa[], agora: Date = new Date()): Sinal | null {
  const atrasadas = tarefas.filter(
    (t) =>
      STATUS_ABERTOS.includes(t.status as (typeof STATUS_ABERTOS)[number]) &&
      t.dataVencimento !== null &&
      t.dataVencimento !== undefined &&
      new Date(t.dataVencimento) < agora
  )

  if (atrasadas.length === 0) return null

  return {
    id: 'tarefas-atrasadas',
    dominio: 'tarefas',
    urgencia: atrasadas.length >= 5 ? 'alta' : 'media',
    titulo: `${atrasadas.length} tarefa${atrasadas.length !== 1 ? 's' : ''} atrasada${atrasadas.length !== 1 ? 's' : ''}`,
    descricao: 'Tarefas com prazo vencido que ainda não foram concluídas.',
    origemDados: 'Tarefa.status em (PENDENTE, EM_ANDAMENTO) e Tarefa.dataVencimento no passado',
    acaoSugerida: { label: 'Ver tarefas', href: '/tarefas?status=PENDENTE' },
  }
}

/**
 * Tarefas de prioridade URGENTE ainda abertas — sinal distinto de "atrasada":
 * uma tarefa pode ser urgente sem ainda estar vencida, e merece atenção
 * mesmo com prazo futuro.
 */
export function sinalTarefasUrgentes(tarefas: Tarefa[]): Sinal | null {
  const urgentes = tarefas.filter(
    (t) => t.prioridade === 'URGENTE' && STATUS_ABERTOS.includes(t.status as (typeof STATUS_ABERTOS)[number])
  )

  if (urgentes.length === 0) return null

  return {
    id: 'tarefas-urgentes',
    dominio: 'tarefas',
    urgencia: 'alta',
    titulo: `${urgentes.length} tarefa${urgentes.length !== 1 ? 's' : ''} de prioridade urgente`,
    descricao: 'Tarefas marcadas como urgentes que ainda estão em aberto.',
    origemDados: 'Tarefa.prioridade = URGENTE e Tarefa.status em (PENDENTE, EM_ANDAMENTO)',
    acaoSugerida: { label: 'Ver tarefas', href: '/tarefas?prioridade=URGENTE' },
  }
}

export function gerarSinaisTarefas(tarefas: Tarefa[], agora: Date = new Date()): Sinal[] {
  return compactarSinais([
    sinalTarefasAtrasadas(tarefas, agora),
    sinalTarefasUrgentes(tarefas),
  ])
}
