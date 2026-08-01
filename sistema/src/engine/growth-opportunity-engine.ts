import type { EstadoCognitivoCompleto } from './cognitive-orchestrator'
import type { CompanyMaturity } from './company-maturity-engine'
import type { HealthScore } from './cognitive-health-engine'
import type { CognitiveEvolution } from './cognitive-evolution-engine'

export type NivelImpacto = 'alto' | 'medio' | 'baixo'
export type NivelEsforco = 'alto' | 'medio' | 'baixo'
export type NivelRisco = 'alto' | 'medio' | 'baixo'
export type HorizonteTempo = 'curto' | 'medio' | 'longo'

export interface GrowthOpportunity {
  id: string
  titulo: string
  descricao: string
  categoria: string
  impacto: NivelImpacto
  esforco: NivelEsforco
  risco: NivelRisco
  tempo: HorizonteTempo
  confianca: number
  prioridade: number
  evidencias: string[]
  gatilho: string
  acaoSugerida: { rotulo: string; href: string } | null
}

export interface GrowthEngineOutput {
  oportunidades: GrowthOpportunity[]
  total: number
  categorias: { categoria: string; count: number }[]
}

const CATEGORIAS = ['FINANCEIRO', 'CLIENTES', 'OPERACAO', 'GESTAO', 'PESSOAS', 'PRODUTO', 'ESTRATEGIA'] as const

const ROTULO_IMPACTO: Record<NivelImpacto, number> = { alto: 3, medio: 2, baixo: 1 }
const ROTULO_ESFORCO: Record<NivelEsforco, number> = { alto: 3, medio: 2, baixo: 1 }
const ROTULO_RISCO: Record<NivelRisco, number> = { alto: 3, medio: 2, baixo: 1 }
const ROTULO_TEMPO: Record<HorizonteTempo, number> = { curto: 3, medio: 2, longo: 1 }

function calcularPrioridade(impacto: NivelImpacto, esforco: NivelEsforco, risco: NivelRisco, confianca: number): number {
  const scoreImpacto = ROTULO_IMPACTO[impacto] / 3
  const scoreEsforco = 1 - (ROTULO_ESFORCO[esforco] / 3)
  const scoreRisco = 1 - (ROTULO_RISCO[risco] / 3)
  return Math.round((scoreImpacto * 0.4 + confianca * 0.3 + scoreEsforco * 0.15 + scoreRisco * 0.15) * 100)
}

let _idCounter = 0
function gerarId(): string {
  _idCounter++
  return `opp-${_idCounter}-${Date.now()}`
}

const rotulo: Record<string, string> = {
  FINANCEIRO: 'Financeiro', CLIENTES: 'Clientes', OPERACAO: 'Operação',
  GESTAO: 'Gestão', PESSOAS: 'Pessoas', PRODUTO: 'Produto', ESTRATEGIA: 'Estratégia',
}

export function gerarOportunidades(
  estado: EstadoCognitivoCompleto,
  maturity: CompanyMaturity,
  healthScore: HealthScore | null,
  evolution: CognitiveEvolution,
): GrowthEngineOutput {
  const oportunidades: GrowthOpportunity[] = []

  const areasExploradas = new Set(
    [...(estado.impacto.mudancasPositivas.map(m => m.categoria)),
     ...(estado.impacto.mudancasNegativas.map(m => m.categoria)),
     ...(estado.impacto.permaneceuIgual)]
  )

  const areasNaoExploradas = CATEGORIAS.filter(c => !areasExploradas.has(c))

  if (estado.impacto.areaAtencao) {
    oportunidades.push({
      id: gerarId(), titulo: `${rotulo[estado.impacto.areaAtencao.categoria] ?? estado.impacto.areaAtencao.categoria} merece atenção`,
      descricao: estado.impacto.areaAtencao.justificativa,
      categoria: estado.impacto.areaAtencao.categoria, impacto: 'alto', esforco: 'medio',
      risco: 'medio', tempo: 'curto', confianca: 0.7, prioridade: 0,
      evidencias: ['Área identificada como ponto de atenção no impacto empresarial'],
      gatilho: 'area_atencao', acaoSugerida: { rotulo: 'Ver detalhes', href: '/dashboard' },
    })
  }

  for (const area of areasNaoExploradas) {
    oportunidades.push({
      id: gerarId(), titulo: `Explorar ${rotulo[area] ?? area}`,
      descricao: `Sua empresa ainda não registrou dados significativos em ${rotulo[area] ?? area}. Explorar esta área pode revelar oportunidades de melhoria.`,
      categoria: area, impacto: 'medio', esforco: 'baixo',
      risco: 'baixo', tempo: 'medio', confianca: 0.5, prioridade: 0,
      evidencias: ['Ainda não temos o que mostrar nesta área'],
      gatilho: 'area_nao_explorada', acaoSugerida: { rotulo: 'Explorar', href: '/assistente' },
    })
  }

  if (estado.decisao) {
    const d = estado.decisao
    oportunidades.push({
      id: gerarId(), titulo: d.titulo,
      descricao: d.descricao,
      categoria: d.categoria, impacto: d.impacto === 'alto' ? 'alto' : d.impacto === 'medio' ? 'medio' : 'baixo',
      esforco: d.dificuldade === 'alta' ? 'alto' : d.dificuldade === 'media' ? 'medio' : 'baixo',
      risco: d.riscos.length > 2 ? 'alto' : d.riscos.length > 0 ? 'medio' : 'baixo',
      tempo: d.urgencia === 'alta' ? 'curto' : d.urgencia === 'media' ? 'medio' : 'longo',
      confianca: d.confianca, prioridade: 0,
      evidencias: d.evidenciasChave,
      gatilho: 'decisao_disponivel', acaoSugerida: { rotulo: 'Agir agora', href: '/dashboard' },
    })
  }

  if (maturity.maiorOportunidade) {
    oportunidades.push({
      id: gerarId(), titulo: `Oportunidade: ${maturity.maiorOportunidade.area}`,
      descricao: maturity.maiorOportunidade.descricao,
      categoria: maturity.maiorOportunidade.area.toUpperCase(),
      impacto: 'medio', esforco: 'medio', risco: 'medio', tempo: 'medio',
      confianca: 0.6, prioridade: 0,
      evidencias: ['Identificado pelo índice de maturidade estratégica'],
      gatilho: 'maturidade_oportunidade', acaoSugerida: { rotulo: 'Analisar', href: '/dashboard' },
    })
  }

  if (healthScore?.pontosFracos && healthScore.pontosFracos.length > 0) {
    for (const pf of healthScore.pontosFracos.slice(0, 2)) {
      oportunidades.push({
        id: gerarId(), titulo: `Melhorar: ${pf}`,
        descricao: `A saúde empresarial identificou que "${pf}" precisa de atenção.`,
        categoria: 'GESTAO', impacto: 'medio', esforco: 'medio',
        risco: 'baixo', tempo: 'medio', confianca: 0.6, prioridade: 0,
        evidencias: ['Pontos fracos do health score'],
        gatilho: 'health_score_fraco', acaoSugerida: { rotulo: 'Ver saúde', href: '/dashboard' },
      })
    }
  }

  if (estado.jornada.proximosPassos && estado.jornada.proximosPassos.length > 0) {
    for (const passo of estado.jornada.proximosPassos.slice(0, 2)) {
      oportunidades.push({
        id: gerarId(), titulo: `Próximo passo: ${passo}`,
        descricao: passo,
        categoria: 'ESTRATEGIA', impacto: 'medio', esforco: 'baixo',
        risco: 'baixo', tempo: 'curto', confianca: 0.8, prioridade: 0,
        evidencias: ['Jornada do fundador'],
        gatilho: 'proximo_passo_jornada', acaoSugerida: { rotulo: 'Continuar', href: '/assistente' },
      })
    }
  }

  for (const op of oportunidades) {
    op.prioridade = calcularPrioridade(op.impacto, op.esforco, op.risco, op.confianca)
  }

  oportunidades.sort((a, b) => b.prioridade - a.prioridade)

  const categoriasMap = new Map<string, number>()
  for (const op of oportunidades) {
    categoriasMap.set(op.categoria, (categoriasMap.get(op.categoria) ?? 0) + 1)
  }

  return {
    oportunidades: oportunidades.slice(0, 10),
    total: oportunidades.length,
    categorias: Array.from(categoriasMap.entries()).map(([categoria, count]) => ({ categoria, count })),
  }
}
