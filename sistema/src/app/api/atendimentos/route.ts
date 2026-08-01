import { NextResponse } from 'next/server'
import { requireUserApi } from '@/lib/authorize'
import { z } from 'zod'
import { registrarAtendimento, resumoCaixaDoDia } from '@/services/atendimento.service'
import { handleApiError } from '@/lib/api-error'

const schema = z.object({
  empresaId: z.string(),
  clienteId: z.string(),
  servico: z.string().min(1),
  valor: z.number().min(0),
  recebido: z.boolean().optional(),
})

// POST /api/atendimentos — registra um atendimento e conecta Caixa + Aprendizado
export async function POST(request: Request) {
  try {
    const usuario = await requireUserApi()
    const body = await schema.parseAsync(await request.json())

    if (body.empresaId !== usuario.empresaId) {
      return NextResponse.json({ error: 'Empresa não autorizada' }, { status: 403 })
    }

    const { transacao } = await registrarAtendimento(usuario.empresaId, usuario.id, {
      clienteId: body.clienteId,
      servico: body.servico,
      valor: body.valor,
      recebido: body.recebido ?? false,
    })

    return NextResponse.json({ success: true, transacao })
  } catch (err) {
    return handleApiError(err)
  }
}

// GET /api/atendimentos?resumo=true — números reais do dia para o Caixa
export async function GET(request: Request) {
  try {
    const usuario = await requireUserApi()
    const { searchParams } = new URL(request.url)

    if (searchParams.get('resumo') === 'true') {
      const resumo = await resumoCaixaDoDia(usuario.empresaId)
      return NextResponse.json(resumo)
    }

    return NextResponse.json({ error: 'Use ?resumo=true' }, { status: 400 })
  } catch (err) {
    return handleApiError(err)
  }
}
