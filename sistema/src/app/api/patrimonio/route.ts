import { NextRequest, NextResponse } from 'next/server'
import { requireUserApi } from '@/lib/authorize'
import { handleApiError } from '@/lib/api-error'
import {
  obterConhecimentos,
  avaliarEnvelhecimentoPatrimonio,
  avaliarEsquecimento,
  gerarSinteses,
  obterEstadoPatrimonio,
  obterMetricas,
  consultarMemoria,
} from '@/engine'

const CONSULTAS_VALIDAS = [
  'conhecimentos',
  'memorias',
  'estado',
  'envelhecimento',
  'esquecimento',
  'sinteses',
  'metricas',
] as const

type Consulta = (typeof CONSULTAS_VALIDAS)[number]

// GET /api/patrimonio?consulta=conhecimentos&tipo=descoberta&categoria=VALORES&dataInicio=2025-01-01&dataFim=2025-12-31&limite=20
export async function GET(request: NextRequest) {
  try {
    const usuario = await requireUserApi()
    const { searchParams } = new URL(request.url)
    const consulta = (searchParams.get('consulta') ?? 'conhecimentos') as Consulta
    const tipo = searchParams.get('tipo')
    const categoria = searchParams.get('categoria')
    const dataInicio = searchParams.get('dataInicio')
    const dataFim = searchParams.get('dataFim')
    const limite = Math.min(Number(searchParams.get('limite') ?? '20'), 100)

    if (!CONSULTAS_VALIDAS.includes(consulta)) {
      return NextResponse.json(
        { erro: 'Consulta inválida', validas: CONSULTAS_VALIDAS },
        { status: 400 }
      )
    }

    let data: unknown

    switch (consulta) {
      case 'conhecimentos': {
        data = await obterConhecimentos(usuario.empresaId)
        break
      }
      case 'memorias': {
        const resultados = await consultarMemoria(usuario.empresaId, limite)
        data = resultados.filter((m) => {
          if (tipo && m.tipo !== tipo) return false
          if (categoria && m.categoria !== categoria) return false
          if (dataInicio && new Date(m.criadaEm) < new Date(dataInicio)) return false
          if (dataFim && new Date(m.criadaEm) > new Date(dataFim)) return false
          return true
        })
        break
      }
      case 'estado': {
        data = await obterEstadoPatrimonio(usuario.empresaId)
        break
      }
      case 'envelhecimento': {
        data = await avaliarEnvelhecimentoPatrimonio(usuario.empresaId)
        break
      }
      case 'esquecimento': {
        data = await avaliarEsquecimento(usuario.empresaId)
        break
      }
      case 'sinteses': {
        data = await gerarSinteses(usuario.empresaId)
        break
      }
      case 'metricas': {
        data = obterMetricas()
        break
      }
      default: {
        return NextResponse.json(
          { erro: 'Consulta inválida', validas: CONSULTAS_VALIDAS },
          { status: 400 }
        )
      }
    }

    return NextResponse.json({ data })
  } catch (error) {
    return handleApiError(error)
  }
}
