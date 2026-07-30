import { NextResponse } from 'next/server'
import { requireUserApi } from '@/lib/authorize'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const schema = z.object({
  empresaId: z.string(),
  clienteId: z.string(),
  servico: z.string().min(1),
  valor: z.number().min(0),
})

export async function POST(request: Request) {
  const usuario = await requireUserApi()
  const body = await schema.parseAsync(await request.json())

  if (body.empresaId !== usuario.empresaId) {
    return NextResponse.json({ error: 'Empresa não autorizada' }, { status: 403 })
  }

  await prisma.historico.create({
    data: {
      empresaId: body.empresaId,
      usuarioId: usuario.id,
      clienteId: body.clienteId,
      tipo: 'SISTEMA',
      titulo: body.servico,
      descricao: `Atendimento: ${body.servico} — R$ ${body.valor.toFixed(2)}`,
    },
  })

  return NextResponse.json({ success: true })
}
