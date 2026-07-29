import type { EstadoCognitivoCompleto } from './cognitive-orchestrator'

export interface AreaCalor {
  area: string
  intensidade: number
  evidencias: number
  confiancaMedia: number
  tendencia: 'SUBINDO' | 'ESTAVEL' | 'CAINDO'
  alertas: number
}

export interface MapaCalor {
  areas: AreaCalor[]
  areaMaisQuente: string
  areaMaisFria: string
  mediaIntensidade: number
  totalEvidencias: number
}

const CATEGORIAS = ['FINANCEIRO', 'CLIENTES', 'GESTAO', 'OPERACAO', 'ESTRATEGIA', 'PESSOAS', 'PRODUTO']
const ROTULO_AREA: Record<string, string> = {
  FINANCEIRO: 'Financeiro',
  CLIENTES: 'Clientes',
  GESTAO: 'Gestão',
  OPERACAO: 'Operação',
  ESTRATEGIA: 'Estratégia',
  PESSOAS: 'Pessoas',
  PRODUTO: 'Produto',
}

export function gerarMapaCalor(estado: EstadoCognitivoCompleto): MapaCalor {
  const evidenciasPorArea = new Map<string, number>()
  const confiancaPorArea = new Map<string, number[]>()
  const alertasPorArea = new Map<string, number>()

  for (const cat of CATEGORIAS) {
    evidenciasPorArea.set(cat, 0)
    confiancaPorArea.set(cat, [])
    alertasPorArea.set(cat, 0)
  }

  if (estado.contexto?.evidenciasChave) {
    const descricoes = estado.contexto.evidenciasChave.map(e => e.descricao)
    const porCat = agruparPorCategoria(descricoes)
    for (const [cat, lista] of Object.entries(porCat)) {
      evidenciasPorArea.set(cat, (evidenciasPorArea.get(cat) ?? 0) + lista.length)
    }
  }

  if (estado.contexto?.setoresEstaveis) {
    for (const s of estado.contexto.setoresEstaveis) {
      const cat = normalizarCategoria(s)
      const atual = confiancaPorArea.get(cat) ?? []
      atual.push(70)
      confiancaPorArea.set(cat, atual)
    }
  }

  if (estado.contexto?.mudancasRecentes) {
    for (const m of estado.contexto.mudancasRecentes) {
      const cat = normalizarCategoria(m)
      const atual = evidenciasPorArea.get(cat) ?? 0
      evidenciasPorArea.set(cat, Math.max(0, atual + 1))
    }
  }

  if (estado.impacto.areaMaisEvoluiu) {
    const cat = estado.impacto.areaMaisEvoluiu.categoria
    const atual = evidenciasPorArea.get(cat) ?? 0
    evidenciasPorArea.set(cat, atual + 3)
    const confs = confiancaPorArea.get(cat) ?? []
    confs.push(80)
    confiancaPorArea.set(cat, confs)
  }

  if (estado.impacto.areaAtencao) {
    const cat = estado.impacto.areaAtencao.categoria
    alertasPorArea.set(cat, (alertasPorArea.get(cat) ?? 0) + 1)
    const confs = confiancaPorArea.get(cat) ?? []
    confs.push(30)
    confiancaPorArea.set(cat, confs)
  }

  const areas: AreaCalor[] = CATEGORIAS.map((cat) => {
    const totalEvidencias = evidenciasPorArea.get(cat) ?? 0
    const confs = confiancaPorArea.get(cat) ?? []
    const confiancaMedia = confs.length > 0 ? Math.round(confs.reduce((a, b) => a + b, 0) / confs.length) : 0
    const alertas = alertasPorArea.get(cat) ?? 0
    const tendencia = determinarTendencia(totalEvidencias, confiancaMedia)

    const intensidade = Math.min(100, Math.round(
      (totalEvidencias * 15) +
      (confiancaMedia * 0.4) +
      (confiancaMedia > 0 ? 10 : 0) +
      (alertas * -20)
    ))

    return {
      area: ROTULO_AREA[cat] ?? cat,
      intensidade: Math.max(0, intensidade),
      evidencias: totalEvidencias,
      confiancaMedia,
      tendencia,
      alertas,
    }
  })

  areas.sort((a, b) => b.intensidade - a.intensidade)

  const areaMaisQuente = areas.length > 0 ? areas[0].area : ''
  const areaMaisFria = areas.length > 0 ? areas[areas.length - 1].area : ''
  const mediaIntensidade = areas.length > 0
    ? Math.round(areas.reduce((s, a) => s + a.intensidade, 0) / areas.length)
    : 0
  const totalEvidencias = areas.reduce((s, a) => s + a.evidencias, 0)

  return { areas, areaMaisQuente, areaMaisFria, mediaIntensidade, totalEvidencias }
}

function determinarTendencia(evidencias: number, confianca: number): 'SUBINDO' | 'ESTAVEL' | 'CAINDO' {
  if (evidencias >= 3 && confianca >= 60) return 'SUBINDO'
  if (evidencias === 0) return 'CAINDO'
  return 'ESTAVEL'
}

function normalizarCategoria(valor: string): string {
  const upper = valor.toUpperCase()
  if (CATEGORIAS.includes(upper)) return upper
  if (upper.includes('FINAN')) return 'FINANCEIRO'
  if (upper.includes('CLIENT')) return 'CLIENTES'
  if (upper.includes('GEST') || upper.includes('GERAL')) return 'GESTAO'
  if (upper.includes('OPER')) return 'OPERACAO'
  if (upper.includes('ESTRAT')) return 'ESTRATEGIA'
  if (upper.includes('PESSO') || upper.includes('EQUIPE')) return 'PESSOAS'
  if (upper.includes('PROD')) return 'PRODUTO'
  return 'GESTAO'
}

function agruparPorCategoria(chaves: string[]): Record<string, string[]> {
  const grupos: Record<string, string[]> = {}
  for (const chave of chaves) {
    const cat = chave.includes('financeiro') ? 'FINANCEIRO'
      : chave.includes('cliente') ? 'CLIENTES'
      : chave.includes('gestão') || chave.includes('tarefa') ? 'GESTAO'
      : chave.includes('opera') ? 'OPERACAO'
      : chave.includes('estrat') ? 'ESTRATEGIA'
      : chave.includes('pessoa') || chave.includes('equipe') ? 'PESSOAS'
      : chave.includes('produto') ? 'PRODUTO'
      : 'GESTAO'
    if (!grupos[cat]) grupos[cat] = []
    grupos[cat].push(chave)
  }
  return grupos
}
