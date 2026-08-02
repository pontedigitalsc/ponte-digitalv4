import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { requireUserApi } from '@/lib/authorize'
import { getEmpresaDoUsuario, temPermissao } from '@/lib/auth'
import { checarLimiteMutacao } from '@/lib/rate-limit'
import { handleApiError } from '@/lib/api-error'
import {
  listarConfiguracoes,
  atualizarEmpresa,
  atualizarConfiguracao,
  atualizarPerfil,
} from '@/services/configuracao.service'

const configSchema = z.object({
  secao: z.enum(['empresa', 'configuracao', 'perfil']),
  dados: z.object({}).passthrough(),
})

// GET /api/configuracoes
export async function GET() {
  try {
    const usuario = await requireUserApi()
    const empresa = await getEmpresaDoUsuario(usuario.id)
    if (!empresa) return NextResponse.json({ error: 'Empresa não encontrada' }, { status: 404 })

    const resultado = await listarConfiguracoes(empresa.id, usuario.id)

    return NextResponse.json({
      empresa: resultado.empresa,
      config: resultado.config,
      usuario: resultado.usuario,
    })
  } catch (err) {
    return handleApiError(err)
  }
}

// PATCH /api/configuracoes
export async function PATCH(request: NextRequest) {
  try {
    const usuario = await requireUserApi()

    const limite = checarLimiteMutacao(usuario.id)
    if (limite) return limite

    const empresa = await getEmpresaDoUsuario(usuario.id)
    if (!empresa) return NextResponse.json({ error: 'Empresa não encontrada' }, { status: 404 })

    const body = await request.json()

    const validacao = configSchema.safeParse(body)
    if (!validacao.success) {
      return NextResponse.json({ error: 'Dados inválidos', detalhes: validacao.error.flatten().fieldErrors }, { status: 422 })
    }

    const { secao, dados } = validacao.data

    if (secao === 'empresa' || secao === 'configuracao') {
      if (!temPermissao(usuario.role, 'GESTOR')) {
        return NextResponse.json(
          { error: 'Esta ação exige permissão de GESTOR ou superior' },
          { status: 403 }
        )
      }
    }

    if (secao === 'empresa') {
      const empresaAtualizada = await atualizarEmpresa(empresa.id, {
        nome: dados.nome as string,
        logo: dados.logo as string | undefined,
      })
      return NextResponse.json({ data: empresaAtualizada })
    }

    if (secao === 'configuracao') {
      const config = await atualizarConfiguracao(empresa.id, dados)
      return NextResponse.json({ data: config })
    }

    if (secao === 'perfil') {
      const usuarioAtualizado = await atualizarPerfil(usuario.id, usuario.empresaId, {
        nome: dados.nome as string,
        cargo: dados.cargo as string | undefined,
      })
      return NextResponse.json({ data: usuarioAtualizado })
    }

    return NextResponse.json({ error: 'Seção inválida' }, { status: 422 })
  } catch (err) {
    return handleApiError(err)
  }
}
