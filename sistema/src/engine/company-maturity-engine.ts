import type { EstadoCognitivoCompleto } from './cognitive-orchestrator'
import { prismaSeguro as prisma } from '@/lib/prisma-tenant-safe'

export type NivelMaturidade = 'INICIAL' | 'EM_DESENVOLVIMENTO' | 'MADURA' | 'EVOLUIDA' | 'REFERENCIA'

export interface CompanyMaturity {
  score: number
  nivel: NivelMaturidade
  fatores: string[]
  maiorEvolucao: { area: string; descricao: string } | null
  maiorRisco: { area: string; descricao: string } | null
  maiorOportunidade: { area: string; descricao: string } | null
  variacaoSemanal: number
}

async function buscarMaturidadeAnterior(empresaId: string): Promise<number | null> {
  const registro = await prisma.memoriaCognitiva.findFirst({
    where: { empresaId, tipo: 'evolucao', descricao: { startsWith: 'Maturidade:' } },
    orderBy: { criadaEm: 'desc' },
    select: { metadados: true },
  })
  if (registro?.metadados && typeof registro.metadados === 'object' && 'score' in registro.metadados) {
    return (registro.metadados as { score: number }).score
  }
  return null
}

export async function calcularMaturidade(empresaId: string, estado: EstadoCognitivoCompleto): Promise<CompanyMaturity> {
  const fatores: string[] = []
  let score = 0

  const auditoria = estado.auditoria
  const impacto = estado.impacto
  const jornada = estado.jornada
  const totalConhecimentos = auditoria?.totalConhecimentos ?? 0
  const scoreMedio = auditoria?.scoreMedio ?? 0
  const feedbackCount = estado.feedbackRecente.length
  const acoesCount = estado.acoesAtivas.length
  const outcomesCount = estado.topOutcomes.length
  const evolucaoGeral = impacto.evolucaoGeral ?? 0

  if (totalConhecimentos >= 50) {
    score += 25
    fatores.push(`${totalConhecimentos} conhecimentos validados`)
  } else if (totalConhecimentos >= 10) {
    score += 15
    fatores.push(`${totalConhecimentos} conhecimentos validados`)
  } else if (totalConhecimentos > 0) {
    score += 5
    fatores.push('Primeiros conhecimentos validados')
  }

  if (evolucaoGeral >= 50) {
    score += 20
    fatores.push(`Evolução geral de ${evolucaoGeral}%`)
  } else if (evolucaoGeral >= 20) {
    score += 10
    fatores.push('Evolução moderada')
  }

  if (scoreMedio >= 70) {
    score += 15
    fatores.push(`Confiança média: ${scoreMedio}`)
  } else if (scoreMedio >= 40) {
    score += 8
    fatores.push('Confiança média dos conhecimentos')
  }

  if (feedbackCount >= 5) {
    score += 10
    fatores.push(`${feedbackCount} feedbacks recentes`)
  } else if (feedbackCount > 0) {
    score += 3
    fatores.push('Feedbacks registrados')
  }

  if (acoesCount >= 3) {
    score += 10
    fatores.push(`${acoesCount} ações ativas`)
  } else if (acoesCount > 0) {
    score += 5
    fatores.push('Ações em andamento')
  }

  if (outcomesCount >= 3) {
    score += 10
    fatores.push(`${outcomesCount} outcomes registrados`)
  } else if (outcomesCount > 0) {
    score += 5
    fatores.push('Outcomes registrados')
  }

  if (jornada.nivel === 'FUNDADOR_VALIDADO' || jornada.nivel === 'ENGAJADO') {
    score += 10
    fatores.push(`Nível de jornada: ${jornada.nivel}`)
  } else if (jornada.nivel === 'ATIVO') {
    score += 5
    fatores.push('Jornada em progresso')
  }

  let nivel: NivelMaturidade
  if (score >= 80) {
    nivel = 'REFERENCIA'
  } else if (score >= 60) {
    nivel = 'EVOLUIDA'
  } else if (score >= 40) {
    nivel = 'MADURA'
  } else if (score >= 20) {
    nivel = 'EM_DESENVOLVIMENTO'
  } else {
    nivel = 'INICIAL'
  }

  const scoreAnterior = await buscarMaturidadeAnterior(empresaId)
  const variacaoSemanal = scoreAnterior !== null ? score - scoreAnterior : 0

  let maiorEvolucao: { area: string; descricao: string } | null = null
  if (impacto.areaMaisEvoluiu) {
    const rotulo: Record<string, string> = {
      FINANCEIRO: 'Financeiro', CLIENTES: 'Clientes', OPERACAO: 'Operação',
      GESTAO: 'Gestão', PESSOAS: 'Pessoas', PRODUTO: 'Produto', ESTRATEGIA: 'Estratégia',
    }
    maiorEvolucao = { area: rotulo[impacto.areaMaisEvoluiu.categoria] ?? impacto.areaMaisEvoluiu.categoria, descricao: impacto.areaMaisEvoluiu.justificativa }
  }

  let maiorRisco: { area: string; descricao: string } | null = null
  if (impacto.areaAtencao) {
    const rotulo: Record<string, string> = {
      FINANCEIRO: 'Financeiro', CLIENTES: 'Clientes', OPERACAO: 'Operação',
      GESTAO: 'Gestão', PESSOAS: 'Pessoas', PRODUTO: 'Produto', ESTRATEGIA: 'Estratégia',
    }
    maiorRisco = { area: rotulo[impacto.areaAtencao.categoria] ?? impacto.areaAtencao.categoria, descricao: impacto.areaAtencao.justificativa }
  }

  let maiorOportunidade: { area: string; descricao: string } | null = null
  if (estado.contexto?.acaoSugerida) {
    const areaPrioridade = estado.contexto.prioridade
    const areaRotulo: Record<string, string> = {
      FINANCEIRO: 'Financeiro', CLIENTES: 'Clientes', OPERACAO: 'Operação',
      GESTAO: 'Gestão', PESSOAS: 'Pessoas', PRODUTO: 'Produto', ESTRATEGIA: 'Estratégia',
    }
    maiorOportunidade = { area: areaRotulo[areaPrioridade] ?? areaPrioridade, descricao: estado.contexto.acaoSugerida }
  }

    await registrarScoreMaturidade(empresaId, score)

  return { score, nivel, fatores, maiorEvolucao, maiorRisco, maiorOportunidade, variacaoSemanal }
}

async function registrarScoreMaturidade(empresaId: string, score: number): Promise<void> {
  try {
    const { registrarNaMemoria } = await import('./cognitive-memory-engine')
    await registrarNaMemoria(empresaId, {
      tipo: 'evolucao',
      descricao: `Maturidade: ${score}/100`,
      categoria: 'ESTRATEGIA',
      versao: 1,
      metadados: { score, registradoEm: new Date().toISOString() },
    })
  } catch {
    // Silencioso
  }
}

export function calcularMaturidadeSincrono(estado: EstadoCognitivoCompleto): CompanyMaturity & { variacaoSemanal: number } {
  return {
    score: 0,
    nivel: 'INICIAL',
    fatores: [],
    maiorEvolucao: null,
    maiorRisco: null,
    maiorOportunidade: null,
    variacaoSemanal: 0,
  }
}
