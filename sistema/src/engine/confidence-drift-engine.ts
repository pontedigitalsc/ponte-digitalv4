import { prismaSeguro as prisma } from '@/lib/prisma-tenant-safe'

export interface ConfidenceDrift {
  conhecimentoId: string
  descricao: string
  categoria: string
  scoreAnterior: number
  scoreAtual: number
  variacao: number
  drift: boolean
}

export async function calcularDrift(empresaId: string): Promise<ConfidenceDrift[]> {
  const conhecimentos = await prisma.conhecimentoValidado.findMany({
    where: { empresaId },
    select: {
      id: true,
      descricao: true,
      categoria: true,
      scoreConfianca: true,
      dados: true,
      criadoEm: true,
      atualizadoEm: true,
    },
  })

  const drifts: ConfidenceDrift[] = []

  for (const c of conhecimentos) {
    const metadados = c.dados as Record<string, unknown> | null
    const scoreAnterior = (metadados?.scoreAnterior as number) ?? c.scoreConfianca

    const scoreAtual = c.scoreConfianca
    const variacao = scoreAtual - scoreAnterior
    const drift = Math.abs(variacao) > 20

    if (drift || variacao !== 0) {
      drifts.push({
        conhecimentoId: c.id,
        descricao: c.descricao,
        categoria: c.categoria,
        scoreAnterior,
        scoreAtual,
        variacao,
        drift,
      })
    }
  }

  drifts.sort((a, b) => Math.abs(b.variacao) - Math.abs(a.variacao))

  return drifts.slice(0, 20)
}
