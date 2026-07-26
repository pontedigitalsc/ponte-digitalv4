import { prismaSeguro as prisma } from '@/lib/prisma-tenant-safe'
import type { EstadoCognitivoCompleto } from './cognitive-orchestrator'

export interface CognitiveEvolution {
  evolucaoTotal: number
  crescimentoConhecimento: number
  crescimentoConfianca: number
  conhecimentosNovos: number
  conhecimentosDescartados: number
  hipotesesConfirmadas: number
  hipotesesRefutadas: number
  scoreUltimos30Dias: number
  scoreUltimos90Dias: number
  tendencia: 'SUBINDO' | 'ESTAVEL' | 'CAINDO'
}

export async function calcularEvolucao(
  empresaId: string,
  estado: EstadoCognitivoCompleto,
): Promise<CognitiveEvolution> {
  const agora = new Date()
  const trintaDiasAtras = new Date(agora.getTime() - 30 * 24 * 60 * 60 * 1000)
  const noventaDiasAtras = new Date(agora.getTime() - 90 * 24 * 60 * 60 * 1000)

  const [
    totalConhecimentos,
    conhecimento30d,
    conhecimento90d,
    hipotesesConfirmadasCount,
    hipotesesRefutadasCount,
  ] = await Promise.all([
    prisma.conhecimentoValidado.count({ where: { empresaId } }),
    prisma.conhecimentoValidado.findMany({
      where: { empresaId, criadoEm: { gte: trintaDiasAtras } },
      select: { scoreConfianca: true },
    }),
    prisma.conhecimentoValidado.findMany({
      where: { empresaId, criadoEm: { gte: noventaDiasAtras } },
      select: { scoreConfianca: true },
    }),
    prisma.hipotese.count({ where: { empresaId, estado: 'CONFIRMADA' } }),
    prisma.hipotese.count({ where: { empresaId, estado: 'DESCARTADA' } }),
  ])

  const conhecimentosNovos = conhecimento30d.length
  const score30d = conhecimento30d.length > 0
    ? Math.round(conhecimento30d.reduce((s, c) => s + c.scoreConfianca, 0) / conhecimento30d.length)
    : 0
  const score90d = conhecimento90d.length > 0
    ? Math.round(conhecimento90d.reduce((s, c) => s + c.scoreConfianca, 0) / conhecimento90d.length)
    : 0

  const auditoria = estado.auditoria
  const totalAntes = auditoria?.totalConhecimentos ?? 0
  const descartados = auditoria?.conhecimentosDescartados ?? 0

  const crescimentoConhecimento = totalAntes > 0
    ? Math.round(((totalConhecimentos - totalAntes) / totalAntes) * 100)
    : totalConhecimentos > 0 ? 100 : 0

  const confiancaAtual = estado.auditoria?.scoreMedio ?? 0
  const crescimentoConfianca = confiancaAtual

  const pontuacaoConhecimento = Math.min(totalConhecimentos * 5, 30)
  const pontuacaoConfianca = Math.round(confiancaAtual * 0.3)
  const pontuacaoHipoteses = Math.min((hipotesesConfirmadasCount + 1) * 5, 20)
  const pontuacaoEvolucao = Math.round((estado.impacto.evolucaoGeral ?? 0) * 0.2)
  const evolucaoTotal = Math.min(pontuacaoConhecimento + pontuacaoConfianca + pontuacaoHipoteses + pontuacaoEvolucao, 100)

  const tendencia30vs90 = score30d - score90d
  const tendencia: 'SUBINDO' | 'ESTAVEL' | 'CAINDO' =
    tendencia30vs90 > 5 ? 'SUBINDO' : tendencia30vs90 < -5 ? 'CAINDO' : 'ESTAVEL'

  return {
    evolucaoTotal,
    crescimentoConhecimento,
    crescimentoConfianca,
    conhecimentosNovos,
    conhecimentosDescartados: descartados,
    hipotesesConfirmadas: hipotesesConfirmadasCount,
    hipotesesRefutadas: hipotesesRefutadasCount,
    scoreUltimos30Dias: score30d,
    scoreUltimos90Dias: score90d,
    tendencia,
  }
}
