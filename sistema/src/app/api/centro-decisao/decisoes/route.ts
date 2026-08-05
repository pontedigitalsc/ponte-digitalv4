import { NextRequest, NextResponse } from 'next/server'
import { prismaSeguro as prisma } from '@/lib/prisma-tenant-safe'
import { requireUserApi } from '@/lib/authorize'
import { handleApiError } from '@/lib/api-error'
import { assertRateLimit } from '@/lib/rate-limit'
import { registrarEventoAtivacao } from '@/engine/founder-activation-engine'
import { z } from 'zod'
import type { Prisma } from '@prisma/client'

// P61 — Centro de Decisão: pensar antes de decidir.
// Registra uma decisão como AcaoCognitiva (origem USUARIO) com o contexto
// completo: o que pretende fazer, por quê, resultado esperado, riscos e a
// condição para funcionar. A decisão vira patrimônio (P60 Memória).

const CATEGORIAS = ['FINANCEIRO', 'CLIENTES', 'OPERACAO', 'GESTAO', 'PESSOAS', 'PRODUTO', 'ESTRATEGIA'] as const

const criarSchema = z.object({
  titulo: z.string().trim().min(3).max(160),
  porQue: z.string().trim().min(3).max(1000),
  resultadoEsperado: z.string().trim().min(3).max(1000),
  riscos: z.string().trim().max(1000).optional().or(z.literal('')),
  condicao: z.string().trim().max(1000).optional().or(z.literal('')),
  categoria: z.enum(CATEGORIAS),
})

// GET /api/centro-decisao/decisoes — decisões registradas pela empresa
// P68: inclui também as decisões acompanhadas pelo conselheiro (origem
// ASSISTENTE) — a decisão que "ganhou vida" na conversa aparece aqui.
export async function GET() {
  try {
    const usuario = await requireUserApi()
    const decisoes = await prisma.acaoCognitiva.findMany({
      where: { empresaId: usuario.empresaId, deletedAt: null, origem: { in: ['USUARIO', 'ASSISTENTE'] } },
      orderBy: { criadaEm: 'desc' },
      include: {
        feedbacks: { where: { deletedAt: null }, orderBy: { criadoEm: 'desc' }, take: 1 },
      },
    })

    return NextResponse.json({
      decisoes: decisoes.map((d) => ({
        id: d.id,
        titulo: d.titulo,
        descricao: d.descricao,
        status: d.status,
        categoria: d.categoria,
        impactoEsperado: d.impactoEsperado as unknown,
        resultado: d.resultado as unknown,
        feedback: d.feedbacks[0] ?? null,
        criadaEm: d.criadaEm,
      })),
    })
  } catch (error) {
    return handleApiError(error)
  }
}

// POST /api/centro-decisao/decisoes — registrar uma decisão que está sendo pensada
export async function POST(request: NextRequest) {
  try {
    const usuario = await requireUserApi()
    const ip = request.headers.get('x-forwarded-for') ?? request.headers.get('x-real-ip') ?? 'unknown'
    assertRateLimit(`decisao:${ip}`, 'CONVERSA')

    const body = await request.json()
    const parsed = criarSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: 'Dados inválidos' }, { status: 422 })
    }

    const { titulo, porQue, resultadoEsperado, riscos, condicao, categoria } = parsed.data

    const decisao = await prisma.acaoCognitiva.create({
      data: {
        empresaId: usuario.empresaId,
        titulo,
        descricao: porQue,
        categoria,
        status: 'PENDENTE',
        origem: 'USUARIO',
        impactoEsperado: {
          resultadoEsperado,
          riscos: riscos || null,
          condicao: condicao || null,
        } as Prisma.InputJsonValue,
      },
    })

    await registrarEventoAtivacao(usuario.empresaId, 'PRIMEIRA_ACAO_CRIADA', { decisaoId: decisao.id })

    return NextResponse.json({ id: decisao.id }, { status: 201 })
  } catch (error) {
    return handleApiError(error)
  }
}
