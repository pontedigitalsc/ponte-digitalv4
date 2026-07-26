import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { requireUserApi } from '@/lib/authorize'
import { handleApiError } from '@/lib/api-error'
import { obterCiclos, atualizarConfiguracaoCiclo } from '@/engine'
import type { FrequenciaCiclo } from '@/engine/ritmo-engine'

const patchCicloSchema = z.object({
  tipo: z.string().min(1, '"tipo" é obrigatório'),
  ativo: z.boolean().optional(),
  frequencia: z.enum(['DIARIA', 'SEMANAL', 'MENSAL']).optional(),
  config: z.record(z.string(), z.any()).optional(),
}).refine(
  (data) => {
    if (data.ativo !== false && !data.frequencia) return false
    return true
  },
  { message: '"frequencia" é obrigatório para ativar/atualizar um ciclo', path: ['frequencia'] }
)

// GET /api/cognitivo/config — lista configurações de ciclos cognitivos
export async function GET() {
  try {
    const usuario = await requireUserApi()
    const ciclos = await obterCiclos(usuario.empresaId)
    return NextResponse.json({ data: ciclos })
  } catch (error) {
    return handleApiError(error)
  }
}

// PATCH /api/cognitivo/config — atualiza configuração de um ciclo
export async function PATCH(request: NextRequest) {
  try {
    const usuario = await requireUserApi()
    const body = await request.json()
    const input = patchCicloSchema.parse(body)

    const resultado = await atualizarConfiguracaoCiclo(usuario.empresaId, {
      tipo: input.tipo,
      ativo: input.ativo,
      frequencia: input.frequencia as FrequenciaCiclo | undefined,
      config: input.config,
    })

    if (resultado === null) {
      return NextResponse.json({ sucesso: true })
    }
    return NextResponse.json({ data: resultado })
  } catch (error) {
    return handleApiError(error)
  }
}
