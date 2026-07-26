import type { Plano } from '@/types'
import { BaseAppError } from '@/lib/app-errors'

export type Recurso =
  | 'assistente_ia'
  | 'financeiro'
  | 'implantacoes'
  | 'relatorios'
  | 'automacoes'
  | 'multiplos_usuarios'

const RECURSOS_POR_PLANO: Record<Plano, Recurso[]> = {
  BASICO: [],
  PROFISSIONAL: ['financeiro', 'implantacoes', 'assistente_ia'],
  ENTERPRISE: ['financeiro', 'implantacoes', 'assistente_ia', 'relatorios', 'automacoes', 'multiplos_usuarios'],
}

export function temAcessoRecurso(plano: Plano, recurso: Recurso): boolean {
  return RECURSOS_POR_PLANO[plano]?.includes(recurso) ?? false
}

export const LIMITE_IA_DIARIO: Record<Plano, number> = {
  BASICO: 0,
  PROFISSIONAL: 50,
  ENTERPRISE: 500,
}

/**
 * Erro de plano insuficiente (402 Payment Required).
 */
export class PlanoError extends BaseAppError {
  /** Mantido para compatibilidade com código existente que usa err.status */
  readonly status = 402
  constructor(message: string) {
    super(message, 402, 'PLANO_INSUFICIENTE', { retryable: false })
    this.name = 'PlanoError'
  }
}

export function requireRecurso(plano: Plano, recurso: Recurso): void {
  if (!temAcessoRecurso(plano, recurso)) {
    throw new PlanoError(
      'Este recurso não está disponível no plano atual. Faça upgrade para acessar.'
    )
  }
}
