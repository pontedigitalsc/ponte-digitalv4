import type { Sinal } from './tipos'
import type { Prioridade } from '@prisma/client'

export interface EntradaPrioridade {
  sinais: Sinal[]
  tarefasAtrasadas: number
  diasSemFeedback: number
  receitaPendente: number
  diasSemConversa: number
  clientesInadimplentes: number
}

export interface ClassificacaoPrioridade {
  nivel: Prioridade
  score: number
  fatores: FatorPrioridade[]
}

export interface FatorPrioridade {
  nome: string
  peso: number
  contribuicao: number
}

const PESOS = {
  sinalAlta: 30,
  sinalMedia: 15,
  tarefasAtrasadas: 10,
  diasSemFeedback: 8,
  receitaPendente: 20,
  diasSemConversa: 12,
  clientesInadimplentes: 15,
} as const

function mapearScoreParaPrioridade(score: number): Prioridade {
  if (score >= 70) return 'URGENTE'
  if (score >= 45) return 'ALTA'
  if (score >= 20) return 'MEDIA'
  return 'BAIXA'
}

export function classificarPrioridade(entrada: EntradaPrioridade): ClassificacaoPrioridade {
  const fatores: FatorPrioridade[] = []

  const sinaisAlta = entrada.sinais.filter((s) => s.urgencia === 'alta').length
  fatores.push({
    nome: 'sinais_alta_urgencia',
    peso: PESOS.sinalAlta,
    contribuicao: Math.min(sinaisAlta * PESOS.sinalAlta, 60),
  })

  const sinaisMedia = entrada.sinais.filter((s) => s.urgencia === 'media').length
  if (sinaisMedia > 0) {
    fatores.push({
      nome: 'sinais_media_urgencia',
      peso: PESOS.sinalMedia,
      contribuicao: Math.min(sinaisMedia * PESOS.sinalMedia, 30),
    })
  }

  if (entrada.tarefasAtrasadas > 0) {
    fatores.push({
      nome: 'tarefas_atrasadas',
      peso: PESOS.tarefasAtrasadas,
      contribuicao: Math.min(entrada.tarefasAtrasadas * PESOS.tarefasAtrasadas, 30),
    })
  }

  if (entrada.diasSemFeedback > 7) {
    fatores.push({
      nome: 'dias_sem_feedback',
      peso: PESOS.diasSemFeedback,
      contribuicao: Math.min(Math.floor(entrada.diasSemFeedback / 7) * PESOS.diasSemFeedback, 24),
    })
  }

  if (entrada.receitaPendente > 0) {
    fatores.push({
      nome: 'receita_pendente',
      peso: PESOS.receitaPendente,
      contribuicao: Math.min(entrada.receitaPendente > 10000 ? 40 : entrada.receitaPendente > 5000 ? 30 : 20, 40),
    })
  }

  if (entrada.diasSemConversa > 60) {
    fatores.push({
      nome: 'dias_sem_conversa',
      peso: PESOS.diasSemConversa,
      contribuicao: Math.min(Math.floor(entrada.diasSemConversa / 30) * PESOS.diasSemConversa, 36),
    })
  }

  if (entrada.clientesInadimplentes > 0) {
    fatores.push({
      nome: 'clientes_inadimplentes',
      peso: PESOS.clientesInadimplentes,
      contribuicao: Math.min(entrada.clientesInadimplentes * PESOS.clientesInadimplentes, 30),
    })
  }

  const score = Math.min(fatores.reduce((acc, f) => acc + f.contribuicao, 0), 100)
  const nivel = mapearScoreParaPrioridade(score)

  return { nivel, score, fatores }
}

export function calcularPrioridadeGeral(empresaId: string, classificacoes: ClassificacaoPrioridade[]): ClassificacaoPrioridade {
  const scoreMedio = classificacoes.reduce((acc, c) => acc + c.score, 0) / classificacoes.length
  const todosFatores = classificacoes.flatMap((c) => c.fatores)
  const fatoresAgregados = agregarFatores(todosFatores)

  return {
    nivel: mapearScoreParaPrioridade(scoreMedio),
    score: Math.round(scoreMedio),
    fatores: fatoresAgregados.slice(0, 5),
  }
}

function agregarFatores(fatores: FatorPrioridade[]): FatorPrioridade[] {
  const mapa = new Map<string, FatorPrioridade>()
  for (const f of fatores) {
    const existente = mapa.get(f.nome)
    if (existente) {
      existente.contribuicao = Math.min(existente.contribuicao + f.contribuicao, 100)
      existente.peso = Math.max(existente.peso, f.peso)
    } else {
      mapa.set(f.nome, { ...f })
    }
  }
  return Array.from(mapa.values()).sort((a, b) => b.contribuicao - a.contribuicao)
}
