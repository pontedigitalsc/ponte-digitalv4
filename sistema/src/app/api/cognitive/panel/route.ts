import { NextResponse } from 'next/server'
import { requireUserApi } from '@/lib/authorize'
import { handleApiError } from '@/lib/api-error'
import { listarHipoteses } from '@/engine/cognitive-memory-engine'
import { contagemPorCategoria } from '@/engine/evidence-engine'
import { consultarMemoria } from '@/engine/cognitive-memory-engine'
import { obterEstadoCognitivoCompleto } from '@/engine/cognitive-orchestrator'

export async function GET() {
  try {
    const usuario = await requireUserApi()

    const hipoteses = await listarHipoteses(usuario.empresaId, true)
    const contagem = await contagemPorCategoria(usuario.empresaId, 30)
    const memoria = await consultarMemoria(usuario.empresaId, 5)
    const estado = await obterEstadoCognitivoCompleto(usuario.empresaId, { skipDecidirContexto: true, skipCalcularNivelAtivacao: true })

    const CATEGORIAS = ['FINANCEIRO', 'CLIENTES', 'OPERACAO', 'GESTAO', 'PESSOAS', 'PRODUTO', 'ESTRATEGIA']

    const areasExploradas = Object.keys(contagem)
    const confiancaGeral = Math.round((hipoteses.length / Math.max(CATEGORIAS.length, 1)) * 100)

    return NextResponse.json({
      data: {
        hipoteses: hipoteses.map(h => ({
          id: h.id,
          descricao: h.descricao,
          categoria: h.categoria,
          confianca: h.confianca,
          impacto: h.impacto,
          estado: h.estado,
          origem: h.origem,
          contagemEvidencias: h.contagemEvidencias,
          criadaEm: h.criadaEm,
        })),
        confiancaGeral,
        areasExploradas,
        areasTotal: CATEGORIAS,
        estado,
        memoriaRecente: memoria.map(m => ({ tipo: m.tipo, descricao: m.descricao })),
      },
    })
  } catch (err) {
    return handleApiError(err)
  }
}
