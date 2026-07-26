import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { requireUserApi } from '@/lib/authorize'
import { getEmpresaDoUsuario } from '@/lib/auth'
import { handleApiError } from '@/lib/api-error'
import { createLogger } from '@/lib/logger'
import {
  obterEstadoPatrimonio,
  obterConhecimentos,
  avaliarEnvelhecimentoPatrimonio,
  avaliarEsquecimento,
  gerarSinteses,
  obterMetricas,
} from '@/engine'

const log = createLogger('api', 'cognitive-heritage')

const querySchema = z.object({
  view: z.enum(['completo', 'conhecimentos', 'envelhecimento', 'esquecimento', 'sinteses', 'metricas']).optional().default('completo'),
})

export async function GET(request: NextRequest) {
  try {
    const usuario = await requireUserApi()
    const empresa = await getEmpresaDoUsuario(usuario.id)
    if (!empresa) {
      return NextResponse.json({ error: 'Empresa não encontrada' }, { status: 404 })
    }

    const { searchParams } = new URL(request.url)
    const parsed = querySchema.safeParse({ view: searchParams.get('view') ?? 'completo' })
    if (!parsed.success) {
      return NextResponse.json({ error: 'Parâmetro inválido', detalhes: parsed.error.flatten().fieldErrors }, { status: 422 })
    }

    const { view } = parsed.data

    log.info('Requisição ao patrimônio cognitivo', { empresaId: empresa.id, details: { view } })

    let patrimonio: unknown

    switch (view) {
      case 'conhecimentos':
        patrimonio = await obterConhecimentos(empresa.id)
        break
      case 'envelhecimento':
        patrimonio = await avaliarEnvelhecimentoPatrimonio(empresa.id)
        break
      case 'esquecimento':
        patrimonio = await avaliarEsquecimento(empresa.id)
        break
      case 'sinteses':
        patrimonio = await gerarSinteses(empresa.id)
        break
      case 'metricas':
        patrimonio = obterMetricas()
        break
      case 'completo':
      default:
        patrimonio = await obterEstadoPatrimonio(empresa.id)
        break
    }

    return NextResponse.json({ success: true, patrimonio })
  } catch (err) {
    return handleApiError(err)
  }
}
