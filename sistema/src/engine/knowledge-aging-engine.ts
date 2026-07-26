import { prismaSeguro as prisma } from '@/lib/prisma-tenant-safe'

export interface KnowledgeAge {
  conhecimentoId: string
  descricao: string
  categoria: string
  diasSemValidacao: number
  risco: 'BAIXO' | 'MEDIO' | 'ALTO'
  precisaRevalidar: boolean
}

export async function avaliarEnvelhecimento(empresaId: string): Promise<KnowledgeAge[]> {
  const conhecimentos = await prisma.conhecimentoValidado.findMany({
    where: { empresaId },
    select: {
      id: true,
      descricao: true,
      categoria: true,
      ultimaValidacao: true,
      ultimaAuditoria: true,
      criadoEm: true,
    },
  })

  const agora = new Date()

  return conhecimentos.map((c) => {
    const referencia = c.ultimaAuditoria ?? c.ultimaValidacao ?? c.criadoEm
    const diffMs = agora.getTime() - new Date(referencia).getTime()
    const diasSemValidacao = Math.floor(diffMs / (1000 * 60 * 60 * 24))

    let risco: 'BAIXO' | 'MEDIO' | 'ALTO'
    if (diasSemValidacao > 180) {
      risco = 'ALTO'
    } else if (diasSemValidacao >= 90) {
      risco = 'MEDIO'
    } else {
      risco = 'BAIXO'
    }

    return {
      conhecimentoId: c.id,
      descricao: c.descricao,
      categoria: c.categoria,
      diasSemValidacao,
      risco,
      precisaRevalidar: diasSemValidacao > 90,
    }
  })
}
