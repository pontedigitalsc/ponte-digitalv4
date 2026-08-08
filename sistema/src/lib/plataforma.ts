import { prisma } from '@/lib/prisma'
import type { Prisma } from '@prisma/client'
import type { Usuario } from '@/types'
import {
  temPermissaoPlataforma,
  eFounderPrincipal,
  type PlataformaPermissao,
  type PlataformaRole,
} from '@/lib/permissao-plataforma'

/** Wrapper de `temPermissaoPlataforma` sobre o objeto Usuario da sessão. */
export function temPermissaoPlataformaUsuario(
  usuario: { platformRole?: PlataformaRole | null },
  permissao: PlataformaPermissao,
): boolean {
  return temPermissaoPlataforma(usuario.platformRole, permissao)
}

export function usuarioEFounderPrincipal(usuario: { platformRole?: PlataformaRole | null }): boolean {
  return eFounderPrincipal(usuario.platformRole)
}

/**
 * ─── PLATFORM AUDIT TRAIL (P84 Parte 13) ─────────────────────────────────────
 *
 * Registro mínimo e persistido de ações privilegiadas de plataforma.
 * Só deve ser usado para AÇÕES de escrita privilegiadas — nunca para leituras
 * (evita logging excessivo sem necessidade). Falha ao gravar não derruba a
 * requisição: auditoria é registro, não pré-condição de negócio.
 */
export async function registrarAuditoriaPlataforma(params: {
  usuario?: Pick<Usuario, 'id' | 'email'> | null
  acao: string
  modulo?: string
  contexto?: 'plataforma' | 'empresa'
  empresaId?: string | null
  detalhes?: Record<string, unknown>
}): Promise<void> {
  const { usuario, acao, modulo, contexto, empresaId, detalhes } = params
  try {
    await prisma.auditoriaPlataforma.create({
      data: {
        usuarioId: usuario?.id ?? null,
        email: usuario?.email ?? null,
        acao,
        modulo,
        contexto: contexto ?? 'plataforma',
        empresaId: empresaId ?? null,
        detalhes: detalhes as Prisma.InputJsonValue | undefined,
      },
    })
  } catch (err) {
    // Registro de auditoria nunca deve quebrar a ação principal.
    console.error('[auditoria-plataforma] falha ao registrar', err)
  }
}