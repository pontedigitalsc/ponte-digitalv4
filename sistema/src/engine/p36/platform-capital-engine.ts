// P36 ETAPA 9 — Capital Cognitivo da Plataforma
// A Ponte começa a medir a si mesma.
// Indicadores: hipóteses validadas, conhecimentos reutilizados,
// recomendações eficazes, capacidades fortalecidas.

import { prisma } from '@/lib/prisma'

export async function calcularMetricasPlataforma() {
  const [
    totalHipoteses,
    hipotesesFortalecidas,
    hipotesesDescartadas,
    conhecimentosValidos,
    totalEmpresasAtivas,
    totalRecomendacoes,
    recomendacoesEficazes,
  ] = await Promise.all([
    prisma.hipotese.count({ where: { deletedAt: null } }),
    prisma.hipotese.count({ where: { estado: { in: ['FORTALECIDA', 'CONFIRMADA'] }, deletedAt: null } }),
    prisma.hipotese.count({ where: { estado: 'DESCARTADA', deletedAt: null } }),
    prisma.conhecimentoValidado.count({ where: { deletedAt: null } }),
    prisma.empresa.count({ where: { ativa: true, deletedAt: null } }),
    prisma.auditoriaRecomendacao.count({ where: { deletedAt: null } }),
    prisma.auditoriaRecomendacao.count({ where: { resultado: 'SIM', deletedAt: null } }),
  ])

  return {
    hipotesesValidadas: hipotesesFortalecidas,
    hipotesesDescartadas,
    conhecimentosReutilizados: conhecimentosValidos,
    recomendacoesEficazes,
    precisaoRecomendacoes: totalRecomendacoes > 0
      ? Math.round((recomendacoesEficazes / totalRecomendacoes) * 100)
      : 0,
    totalEmpresas: totalEmpresasAtivas,
    totalHipoteses,
    taxaValidacao: totalHipoteses > 0
      ? Math.round((hipotesesFortalecidas / totalHipoteses) * 100)
      : 0,
  }
}

export async function gerarSnapshotPlataforma(periodo: string = 'DIARIO') {
  const metricas = await calcularMetricasPlataforma()

  await prisma.plataformaSnapshot.create({
    data: {
      hipotesesValidadas: metricas.hipotesesValidadas,
      hipotesesDescartadas: metricas.hipotesesDescartadas,
      conhecimentosReutilizados: metricas.conhecimentosReutilizados,
      recomendacoesEficazes: metricas.recomendacoesEficazes,
      capacidadesFortalecidas: 0,
      precisaoRecomendacoes: metricas.precisaoRecomendacoes,
      totalEmpresas: metricas.totalEmpresas,
      periodo,
      dataRef: new Date(),
    },
  })

  return metricas
}
