import { NextRequest, NextResponse } from 'next/server'
import { requireUserApi } from '@/lib/authorize'
import { toggleEtapa } from '@/services/implantacao.service'
import { checarLimiteMutacao } from '@/lib/rate-limit'
import { handleApiError } from '@/lib/api-error'

// PATCH /api/implantacoes/etapas/[id]
export async function PATCH(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const usuario = await requireUserApi()

    const limite = checarLimiteMutacao(usuario.id)
    if (limite) return limite

    const { id } = await params
    const etapa = await toggleEtapa(id, usuario.empresaId)
    return NextResponse.json({ data: etapa })
  } catch (err) {
    return handleApiError(err)
  }
}
