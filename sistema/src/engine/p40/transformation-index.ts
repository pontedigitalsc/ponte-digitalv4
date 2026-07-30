import { prisma } from '@/lib/prisma'

type IndiceTransformacao = {
  scoreDecisoesEstruturadas: number
  scoreReducaoImproviso: number
  scoreAumentoRecorrencia: number
  scoreReducaoEsquecimentos: number
  scoreMelhoriaOrganizacao: number
  scoreCapacidadeAdaptativa: number
  indiceGlobal: number
  tendencia: 'subindo' | 'estavel' | 'caindo'
}

export async function calcularIndiceTransformacao(empresaId: string): Promise<IndiceTransformacao> {
  const [totalDecisoes, decisoesRecentes, totalAtendimentos, retornos, sinais] = await Promise.all([
    prisma.hipotese.count({ where: { empresaId, deletedAt: null } }),
    prisma.hipotese.count({ where: { empresaId, criadaEm: { gte: new Date(Date.now() - 30 * 86400000) }, deletedAt: null } }),
    prisma.historico.count({ where: { empresaId, deletedAt: null } }),
    prisma.historico.count({ where: { empresaId, criadoEm: { gte: new Date(Date.now() - 30 * 86400000) }, deletedAt: null } }),
    prisma.sinalValor.findMany({ where: { empresaId, deletedAt: null } }),
  ])

  const scoreDecisoesEstruturadas = totalDecisoes > 0 ? Math.min(Math.round((decisoesRecentes / totalDecisoes) * 100), 100) : 0
  const scoreReducaoImproviso = totalAtendimentos > 0 ? Math.min(Math.round((retornos / totalAtendimentos) * 100), 100) : 0
  const scoreAumentoRecorrencia = sinais.filter(s => s.tipo === 'REPETIU_COMPORTAMENTO' || s.tipo === 'VOLTOU_ESPONTANEO').length > 0 ? 60 : 0
  const scoreReducaoEsquecimentos = sinais.filter(s => s.tipo === 'VOLTOU_ESPONTANEO').length > 0 ? 70 : 0
  const scoreMelhoriaOrganizacao = totalDecisoes > 3 ? 80 : totalDecisoes > 0 ? 40 : 0
  const scoreCapacidadeAdaptativa = Math.round((scoreDecisoesEstruturadas + scoreReducaoImproviso + scoreAumentoRecorrencia) / 3)

  const scores = [scoreDecisoesEstruturadas, scoreReducaoImproviso, scoreAumentoRecorrencia, scoreReducaoEsquecimentos, scoreMelhoriaOrganizacao, scoreCapacidadeAdaptativa]
  const indiceGlobal = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)

  const tendencia = scoreDecisoesEstruturadas > 50 && scoreReducaoImproviso > 50 ? 'subindo' as const : decisoesRecentes > 0 ? 'estavel' as const : 'caindo' as const

  return { scoreDecisoesEstruturadas, scoreReducaoImproviso, scoreAumentoRecorrencia, scoreReducaoEsquecimentos, scoreMelhoriaOrganizacao, scoreCapacidadeAdaptativa, indiceGlobal, tendencia }
}

export async function calcularIndiceTransformacaoGlobal() {
  const empresas = await prisma.empresa.findMany({ where: { ativa: true, deletedAt: null }, select: { id: true } })
  const indices = await Promise.all(empresas.map(e => calcularIndiceTransformacao(e.id).catch(() => null)))
  const validos = indices.filter((i): i is IndiceTransformacao => i !== null)
  if (validos.length === 0) return { mediaGlobal: 0, empresasAnalisadas: 0, distribuicao: { subindo: 0, estavel: 0, caindo: 0 } }
  return {
    mediaGlobal: Math.round(validos.reduce((s, i) => s + i.indiceGlobal, 0) / validos.length),
    empresasAnalisadas: validos.length,
    distribuicao: {
      subindo: validos.filter(i => i.tendencia === 'subindo').length,
      estavel: validos.filter(i => i.tendencia === 'estavel').length,
      caindo: validos.filter(i => i.tendencia === 'caindo').length,
    },
  }
}