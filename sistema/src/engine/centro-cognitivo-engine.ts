import type { EstadoCognitivoCompleto } from './cognitive-orchestrator'
import type { HealthScore } from './cognitive-health-engine'
import type { CognitiveEvolution } from './cognitive-evolution-engine'
import type { CompanyMaturity } from './company-maturity-engine'
import type { Decisao } from './decision-engine'

export type StatusGeral = 'POSITIVO' | 'ATENCAO' | 'CRITICO'

export interface CentroCognitivoExecutivo {
  atualizadoEm: Date
  estadoGeral: {
    status: StatusGeral
    titulo: string
    resumo: string
  }
  statusAtual: {
    scoreMaturidade: number
    nivelMaturidade: string
    scoreSaude: number
    confiancaMedia: number
    areasExploradas: number
    totalAreas: number
  }
  mudancas: {
    evolucaoGeral: number
    variacaoMaturidade: number
    principaisMudancas: Array<{ area: string; tipo: 'POSITIVA' | 'NEGATIVA' | 'ATENCAO'; descricao: string }>
  }
  pontosAtencao: Array<{ categoria: string; descricao: string; severidade: 'ALTA' | 'MEDIA' | 'BAIXA' }>
  melhorDecisao: {
    titulo: string
    descricao: string
    impacto: string
    confianca: number
    urgencia: number
  } | null
  decisaoCompleta: Decisao | null
  aprendizadosRecentes: number
}

const ROTULO_NIVEL: Record<string, string> = {
  INICIAL: 'Inicial',
  EM_DESENVOLVIMENTO: 'Em desenvolvimento',
  MADURA: 'Madura',
  EVOLUIDA: 'Evoluída',
  REFERENCIA: 'Referência',
}

export function construirCentroCognitivo(
  estado: EstadoCognitivoCompleto,
  healthScore: HealthScore | null,
  maturity: CompanyMaturity,
  evolution: CognitiveEvolution,
  melhorDecisao: Decisao | null,
  aprendizadosRecentes: number,
): CentroCognitivoExecutivo {
  const scoreSaude = healthScore?.score ?? 0
  const scoreMaturidade = maturity.score
  const confiancaMedia = evolution.crescimentoConfianca ?? 0

  const status = determinarStatusGeral(scoreMaturidade, scoreSaude, estado.impacto.areaAtencao !== null)
  const titulo = gerarTitulo(status, evolution.evolucaoTotal, estado.impacto.areaMaisEvoluiu?.categoria)
  const resumo = gerarResumo(status, scoreMaturidade, scoreSaude, evolution.evolucaoTotal)

  const principaisMudancas: Array<{ area: string; tipo: 'POSITIVA' | 'NEGATIVA' | 'ATENCAO'; descricao: string }> = []
  if (estado.impacto.areaMaisEvoluiu) {
    principaisMudancas.push({ area: estado.impacto.areaMaisEvoluiu.categoria, tipo: 'POSITIVA', descricao: estado.impacto.areaMaisEvoluiu.justificativa })
  }
  if (estado.impacto.areaAtencao) {
    principaisMudancas.push({ area: estado.impacto.areaAtencao.categoria, tipo: 'ATENCAO', descricao: estado.impacto.areaAtencao.justificativa })
  }

  const pontosAtencao: Array<{ categoria: string; descricao: string; severidade: 'ALTA' | 'MEDIA' | 'BAIXA' }> = []
  if (estado.impacto.areaAtencao) {
    const severidade = scoreSaude < 30 ? 'ALTA' : scoreSaude < 60 ? 'MEDIA' : 'BAIXA'
    pontosAtencao.push({ categoria: estado.impacto.areaAtencao.categoria, descricao: estado.impacto.areaAtencao.justificativa, severidade })
  }
  if (healthScore?.pontosFracos) {
    for (const pf of healthScore.pontosFracos) {
      if (!pontosAtencao.some(p => p.descricao === pf)) {
        pontosAtencao.push({ categoria: 'GERAL', descricao: pf, severidade: 'MEDIA' })
      }
    }
  }

  return {
    atualizadoEm: new Date(),
    estadoGeral: { status, titulo, resumo },
    statusAtual: {
      scoreMaturidade,
      nivelMaturidade: ROTULO_NIVEL[maturity.nivel] ?? maturity.nivel,
      scoreSaude,
      confiancaMedia,
      areasExploradas: estado.contexto?.setoresEstaveis?.length ?? 0,
      totalAreas: 7,
    },
    mudancas: {
      evolucaoGeral: evolution.evolucaoTotal,
      variacaoMaturidade: maturity.variacaoSemanal,
      principaisMudancas,
    },
    pontosAtencao,
    melhorDecisao: melhorDecisao
      ? {
          titulo: melhorDecisao.titulo,
          descricao: melhorDecisao.descricao,
          impacto: melhorDecisao.impacto,
          confianca: melhorDecisao.confianca,
          urgencia: typeof melhorDecisao.urgencia === 'number' ? melhorDecisao.urgencia : 3,
        }
      : null,
    decisaoCompleta: melhorDecisao,
    aprendizadosRecentes,
  }
}

function determinarStatusGeral(maturidade: number, saude: number, temAtencao: boolean): StatusGeral {
  if (maturidade >= 50 && saude >= 50 && !temAtencao) return 'POSITIVO'
  if (maturidade >= 25 || saude >= 25) return 'ATENCAO'
  return 'CRITICO'
}

function gerarTitulo(status: StatusGeral, evolucaoTotal: number, areaMaisEvoluiu?: string | null): string {
  if (status === 'POSITIVO') {
    if (evolucaoTotal > 20) return 'Sua empresa está evoluindo'
    return 'Tudo caminhando bem'
  }
  if (status === 'ATENCAO') {
    if (areaMaisEvoluiu) return `${areaMaisEvoluiu} merece atenção estratégica`
    return 'Pontos de atenção identificados'
  }
  return 'É hora de agir'
}

function gerarResumo(status: StatusGeral, maturidade: number, saude: number, evolucao: number): string {
  const partes: string[] = []
  if (maturidade >= 50) partes.push(`maturidade em desenvolvimento (${maturidade}/100)`)
  else if (maturidade >= 25) partes.push(`maturidade começando a se formar (${maturidade}/100)`)
  else partes.push(`maturidade inicial (${maturidade}/100)`)

  if (saude >= 60) partes.push('saúde empresarial estável')
  else if (saude >= 30) partes.push('saúde empresarial requer atenção')
  else partes.push('saúde empresarial crítica')

  if (evolucao > 0) partes.push(`evolução de ${evolucao}% no período`)
  return partes.join(', ') + '.'
}
