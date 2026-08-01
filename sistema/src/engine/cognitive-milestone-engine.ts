import { prismaSeguro as prisma } from '@/lib/prisma-tenant-safe'
import type { EstadoCognitivoCompleto } from './cognitive-orchestrator'

export interface CognitiveMilestone {
  titulo: string
  descricao: string
  categoria: string
  data: Date
}

function gerarId(): string {
  return `milestone_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
}

export async function gerarMilestones(
  empresaId: string,
  estado: EstadoCognitivoCompleto,
): Promise<CognitiveMilestone[]> {
  const milestones: CognitiveMilestone[] = []
  const agora = new Date()
  const hoje = new Date(agora.getFullYear(), agora.getMonth(), agora.getDate())

  const [
    totalEvidencias,
    totalConhecimentos,
    totalHipoteses,
    totalAcoesConcluidas,
    totalFeedbacksPositivos,
    hipotesesConfirmadasCount,
    totalAcoes,
    eventosAtivacao,
    outcomesPositivos,
  ] = await Promise.all([
    prisma.evidencia.count({ where: { empresaId } }),
    prisma.conhecimentoValidado.count({ where: { empresaId } }),
    prisma.hipotese.count({ where: { empresaId } }),
    prisma.acaoCognitiva.count({ where: { empresaId, status: 'CONCLUIDA' } }),
    prisma.feedbackAcao.count({
      where: { empresaId, tipo: { in: ['AJUDOU', 'AJUDOU_PARCIALMENTE'] } },
    }),
    prisma.hipotese.count({ where: { empresaId, estado: 'CONFIRMADA' } }),
    prisma.acaoCognitiva.count({ where: { empresaId } }),
    prisma.eventoAtivacao.findMany({
      where: { empresaId },
      select: { tipo: true, criadoEm: true },
    }),
    prisma.outcome.count({ where: { empresaId } }),
  ])

  const eventosExistentes = new Set(eventosAtivacao.map((e) => e.tipo))

  if (totalEvidencias >= 100 && !eventosExistentes.has('PRIMEIRO_RETORNO')) {
    milestones.push({
      titulo: '100 descobertas guardadas',
      descricao: `Sua empresa já gerou ${totalEvidencias} registros importantes — um marco de aprendizado.`,
      categoria: 'conhecimento',
      data: hoje,
    })
  }

  if (totalConhecimentos >= 50) {
    milestones.push({
      titulo: '50 informações confirmadas',
      descricao: `Foram confirmadas ${totalConhecimentos} informações — base sólida para decisões.`,
      categoria: 'conhecimento',
      data: hoje,
    })
  }

  if (totalConhecimentos >= 1 && totalEvidencias >= 1) {
    const primeiraHipoteseConfirmada = await prisma.hipotese.findFirst({
      where: { empresaId, estado: 'CONFIRMADA' },
      orderBy: { atualizadaEm: 'asc' },
      select: { atualizadaEm: true },
    })

    if (primeiraHipoteseConfirmada) {
      milestones.push({
      titulo: 'Primeira suspeita confirmada',
      descricao: 'O ciclo de aprendizado funcionou pela primeira vez: coleta → análise → confirmação.',
        categoria: 'aprendizado',
        data: primeiraHipoteseConfirmada.atualizadaEm,
      })
    }
  }

  if (hipotesesConfirmadasCount > 0 && outcomesPositivos > 0) {
    milestones.push({
      titulo: `${hipotesesConfirmadasCount} suspeitas confirmadas`,
      descricao: `Das ${totalHipoteses} suspeitas levantadas, ${hipotesesConfirmadasCount} foram confirmadas com sucesso.`,
      categoria: 'aprendizado',
      data: hoje,
    })
  }

  if (totalAcoesConcluidas >= 10) {
    milestones.push({
      titulo: `${totalAcoesConcluidas} ações concluídas`,
      descricao: `De ${totalAcoes} ações criadas, ${totalAcoesConcluidas} foram executadas até o fim.`,
      categoria: 'execucao',
      data: hoje,
    })
  }

  if (totalFeedbacksPositivos >= 5) {
    milestones.push({
      titulo: 'Feedbacks positivos consistentes',
      descricao: `${totalFeedbacksPositivos} feedbacks positivos registrados — as ações estão gerando valor.`,
      categoria: 'aprendizado',
      data: hoje,
    })
  }

  if (estado.auditoria && estado.auditoria.scoreMedio >= 60) {
    milestones.push({
      titulo: 'Qualidade de conhecimento alta',
      descricao: `Nota média de ${estado.auditoria.scoreMedio} — informações bem confirmadas.`,
      categoria: 'conhecimento',
      data: hoje,
    })
  }

  if (estado.jornada.nivel === 'ENGAJADO' || estado.jornada.nivel === 'FUNDADOR_VALIDADO') {
    milestones.push({
      titulo: 'Empresa atingiu nível avançado',
      descricao: `Sua empresa atingiu um novo patamar de maturidade na plataforma.`,
      categoria: 'maturidade',
      data: hoje,
    })
  }

  const semRefutacoes = await prisma.hipotese.count({
    where: { empresaId, estado: 'DESCARTADA' },
  })

  if (semRefutacoes === 0 && totalHipoteses > 0) {
    milestones.push({
      titulo: 'Primeiro mês sem refutações',
      descricao: 'Nenhuma suspeita foi descartada — as informações coletadas estão alinhadas.',
      categoria: 'conhecimento',
      data: hoje,
    })
  }

  return milestones.sort((a, b) => b.data.getTime() - a.data.getTime())
}
