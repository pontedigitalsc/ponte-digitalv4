import { prismaSeguro as prisma } from '@/lib/prisma-tenant-safe'

// ─── P53 — PILAR 9: CELEBRAÇÕES DE EVOLUÇÃO ──────────────────────────────────
// As conquistas que a Ponte celebra não são apenas de dinheiro. São marcos de
// evolução: regularidade do hábito, primeiros aprendizados, primeiras decisões
// confirmadas, primeiros resultados registrados, perguntas resolvidas e o
// amadurecimento da relação. Tudo derivado de dados reais — nunca inventado.

export interface Conquista {
  titulo: string
  descricao: string
  icone: string
  quando: 'recém-alcançada' | 'em construção' | 'consolidada'
}

const LIMITE_CONQUISTAS = 4

export async function obterConquistas(empresaId: string): Promise<Conquista[]> {
  const [totalOutcomes, totalAprendizados, perguntasRespondidas, conhecimentosValidados, totalMemorias, positivas, conversasDistintas] =
    await Promise.all([
      prisma.outcome.count({ where: { empresaId, deletedAt: null } }),
      prisma.aprendizado.count({ where: { empresaId, deletedAt: null } }),
      prisma.perguntaViva.count({ where: { empresaId, deletedAt: null, estado: 'RESPONDIDA' } }),
      prisma.conhecimentoColetivo.count({
        where: { empresaOrigemId: empresaId, deletedAt: null, status: { in: ['VALIDADO', 'REPLICADO', 'CONSOLIDADO'] } },
      }),
      prisma.memoriaEmocional.count({ where: { empresaId, deletedAt: null } }),
      prisma.memoriaEmocional.count({ where: { empresaId, deletedAt: null, tipo: { in: ['confianca', 'realizacao'] } } }),
      prisma.conversa.groupBy({
        by: ['empresaId'],
        where: { empresaId, deletedAt: null, concluida: true },
        _count: { _all: true },
      }),
    ])

  const conquistas: Conquista[] = []

  if (totalOutcomes >= 1) {
    conquistas.push({
      titulo: totalOutcomes >= 3 ? 'Resultados viraram rotina' : 'Primeiro resultado registrado',
      descricao:
        totalOutcomes >= 3
          ? `${totalOutcomes} resultados já registrados — suas decisões estão virando realidade com frequência.`
          : 'Você registrou o primeiro resultado concreto. Decisão deixou de ser intenção e virou realidade.',
      icone: '🎯',
      quando: totalOutcomes >= 3 ? 'consolidada' : 'recém-alcançada',
    })
  }

  if (totalAprendizados >= 3) {
    conquistas.push({
      titulo: 'Aprendizado virou patrimônio',
      descricao: `${totalAprendizados} aprendizados guardados na biografia da empresa. Nenhuma lição se perde mais.`,
      icone: '📚',
      quando: totalAprendizados >= 6 ? 'consolidada' : 'em construção',
    })
  }

  if (perguntasRespondidas >= 1) {
    conquistas.push({
      titulo: perguntasRespondidas >= 3 ? 'Perguntas viram decisões' : 'Primeira pergunta respondida',
      descricao:
        perguntasRespondidas >= 3
          ? `${perguntasRespondidas} perguntas que ficam já foram respondidas — cada uma delas virou direção.`
          : 'Você respondeu à primeira pergunta que ficou. Ela já guia suas próximas escolhas.',
      icone: '💡',
      quando: perguntasRespondidas >= 3 ? 'consolidada' : 'recém-alcançada',
    })
  }

  if (conhecimentosValidados >= 1) {
    conquistas.push({
      titulo: 'Descoberta se tornou conhecimento',
      descricao: `${conhecimentosValidados} descoberta${conhecimentosValidados > 1 ? 's' : ''} validada${conhecimentosValidados > 1 ? 's' : ''} que ajuda outras empresas também.`,
      icone: '💎',
      quando: 'consolidada',
    })
  }

  if (conversasDistintas[0]?._count._all >= 6 && conquistas.length < LIMITE_CONQUISTAS) {
    conquistas.push({
      titulo: 'O hábito da conversa',
      descricao: `${conversasDistintas[0]._count._all} conversas concluídas. O hábito de organizar o pensamento está enraizado.`,
      icone: '💬',
      quando: 'consolidada',
    })
  }

  if (totalMemorias >= 3 && conquistas.length < LIMITE_CONQUISTAS) {
    const avancou = positivas >= totalMemorias / 2
    conquistas.push({
      titulo: avancou ? 'A relação amadureceu' : 'Você está sendo ouvido',
      descricao: avancou
        ? 'As nossas conversas registraram mais força do que peso recentemente. Você está carregando menos sozinho.'
        : 'A Ponte guarda também como você se sente — não apenas o que acontece. Nada fica só com você.',
      icone: '🤝',
      quando: avancou ? 'consolidada' : 'em construção',
    })
  }

  if (conquistas.length < LIMITE_CONQUISTAS) {
    conquistas.push({
      titulo: 'A base está sendo construída',
      descricao:
        totalMemorias > 0
          ? 'Cada conversa, cada registro e cada aprendizado estão construindo a biografia da sua empresa.'
          : 'A biografia da sua empresa começa na primeira conversa. Cada registro construído agora será patrimônio para sempre.',
      icone: '🌱',
      quando: 'em construção',
    })
  }

  return conquistas.slice(0, LIMITE_CONQUISTAS)
}
