import { NextResponse } from 'next/server'
import { requireUserApi } from '@/lib/authorize'
import { handleApiError } from '@/lib/api-error'
import { gerarDecisoes, enriquecerDecisoesComTrust, filtrarDecisoesPorRelevancia } from '@/engine/decision-engine'

export async function GET() {
  try {
    const usuario = await requireUserApi()

    let decisoes = await gerarDecisoes(usuario.empresaId)
    decisoes = await enriquecerDecisoesComTrust(decisoes, usuario.empresaId)
    const comRelevancia = filtrarDecisoesPorRelevancia(decisoes as never)

    return NextResponse.json({
      data: {
        decisoes: comRelevancia.map(d => ({
          id: d.id,
          titulo: d.titulo,
          descricao: d.descricao,
          categoria: d.categoria,
          tipoAcao: d.tipoAcao,
          prioridade: d.prioridade,
          motivo: d.motivo,
          evidenciasChave: d.evidenciasChave,
          confianca: d.confianca,
          impacto: d.impacto,
          urgencia: d.urgencia,
          dificuldade: d.dificuldade,
          riscos: d.riscos,
          desconhecidos: d.desconhecidos,
          relevancia: d.relevancia,
        })),
        total: decisoes.length,
      },
    })
  } catch (err) {
    return handleApiError(err)
  }
}
