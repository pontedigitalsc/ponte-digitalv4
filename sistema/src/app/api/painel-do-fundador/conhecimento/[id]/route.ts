import { NextRequest, NextResponse } from 'next/server'
import { requirePlataforma } from '@/lib/authorize'
import { atualizarStatusConhecimento, descartarConhecimento } from '@/engine/inteligencia-coletiva'
import { handleApiError } from '@/lib/api-error'
import { BusinessRuleError } from '@/lib/app-errors'
import { registrarAuditoriaPlataforma } from '@/lib/plataforma'
import { z } from 'zod'
import type { StatusConhecimentoColetivo } from '@prisma/client'

// P62 — validação de conhecimento coletivo pelo Founder Principal.
// O único caminho que tira um padrão de CANDIDATO e o torna visível como
// conhecimento (VALIDADO → REPLICADO → CONSOLIDADO), ou o descarta.
// Apenas o Founder Principal pode fazer isso; nunca uma empresa cliente.

const validarSchema = z.object({
  status: z.enum(['CANDIDATO', 'VALIDADO', 'REPLICADO', 'CONSOLIDADO']),
})

// PATCH /api/painel-do-fundador/conhecimento/[id]
export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const usuario = await requirePlataforma('FOUNDER_MANAGE_PLATFORM')
    const { id } = await params

    const body = await request.json().catch(() => null)
    const parsed = validarSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: 'Status inválido' }, { status: 422 })
    }

    const conhecimento = await atualizarStatusConhecimento(id, parsed.data.status as StatusConhecimentoColetivo)

    await registrarAuditoriaPlataforma({
      usuario,
      acao: 'CONHECIMENTO_STATUS_ALTERADO',
      modulo: 'painel-do-fundador',
      contexto: 'plataforma',
      detalhes: { conhecimentoId: id, status: parsed.data.status },
    })

    return NextResponse.json({ data: { conhecimento } })
  } catch (err) {
    return handleApiError(err)
  }
}

// DELETE /api/painel-do-fundador/conhecimento/[id] — descarta um candidato
export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const usuario = await requirePlataforma('FOUNDER_MANAGE_PLATFORM')
    const { id } = await params
    if (!id) throw new BusinessRuleError('Conhecimento não informado')

    const conhecimento = await descartarConhecimento(id)

    await registrarAuditoriaPlataforma({
      usuario,
      acao: 'CONHECIMENTO_DESCARTADO',
      modulo: 'painel-do-fundador',
      contexto: 'plataforma',
      detalhes: { conhecimentoId: id },
    })

    return NextResponse.json({ data: { conhecimento } })
  } catch (err) {
    return handleApiError(err)
  }
}
