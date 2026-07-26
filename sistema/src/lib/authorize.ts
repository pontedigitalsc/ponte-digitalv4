import { getCurrentUser, temPermissao } from '@/lib/auth'
import type { Usuario } from '@/types'
import { AuthenticationError, AuthorizationError } from '@/lib/app-errors'

/**
 * ─── AUTORIZAÇÃO PARA API ROUTES ─────────────────────────────────────────────
 *
 * `requireUser()` em lib/auth.ts usa `redirect()` do Next.js, que funciona
 * em Server Components mas não em Route Handlers — dentro de uma API route,
 * redirect() não produz o JSON de erro que o frontend espera tratar.
 *
 * Este arquivo fornece o equivalente para uso em `route.ts`: lança um erro
 * tipado (AuthenticationError / AuthorizationError) que cada rota captura e
 * converte na resposta HTTP correta (401 ou 403).
 */

/**
 * Garante que existe um usuário autenticado. Lança AuthenticationError(401) se não.
 * Use no lugar de `requireUser()` dentro de qualquer arquivo `route.ts`.
 */
export async function requireUserApi(): Promise<Usuario> {
  const usuario = await getCurrentUser()
  if (!usuario) throw new AuthenticationError('Não autenticado')
  return usuario
}

/**
 * Garante que o usuário autenticado tem, no mínimo, o role informado.
 * Lança AuthorizationError(403) se o usuário não tiver permissão suficiente.
 *
 * Uso típico em uma rota DELETE:
 *   const usuario = await requireRole('GESTOR')
 */
export async function requireRole(permissaoMinima: 'MEMBRO' | 'GESTOR' | 'ADMIN'): Promise<Usuario> {
  const usuario = await requireUserApi()
  if (!temPermissao(usuario.role, permissaoMinima)) {
    throw new AuthorizationError(
      `Esta ação exige permissão de ${permissaoMinima} ou superior`
    )
  }
  return usuario
}

/**
 * Mantido para compatibilidade. Prefira usar handleApiError de lib/api-error.ts
 * diretamente nos catch blocks.
 */
export function respostaErroAuth(err: unknown): { error: string; status: number } {
  if (err instanceof AuthenticationError || err instanceof AuthorizationError) {
    return { error: err.message, status: err.statusCode }
  }
  return { error: 'Erro interno', status: 500 }
}
