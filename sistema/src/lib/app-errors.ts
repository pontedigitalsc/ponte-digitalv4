/**
 * ─── HIERARQUIA DE ERROS ──────────────────────────────────────────────────────
 *
 * Hierarquia única de erros da aplicação. Todos os erros lançados em services,
 * engines e rotas devem usar estas classes em vez de `throw new Error(...)`.
 *
 * Estrutura:
 *   BaseAppError
 *   ├── ValidationError        (400)  — dados inválidos, schema Zod
 *   ├── AuthenticationError     (401)  — não autenticado
 *   ├── AuthorizationError      (403)  — sem permissão
 *   ├── NotFoundError           (404)  — recurso não encontrado
 *   ├── BusinessRuleError       (422)  — regra de negócio violada
 *   ├── ConflictError           (409)  — estado conflitante (ex: lead já convertido)
 *   ├── RateLimitError          (429)  — muitas requisições
 *   └── InternalApplicationError(500)  — erro interno não categorizado
 */

export class BaseAppError extends Error {
  /** Código textual do erro (ex: 'NOT_FOUND', 'VALIDATION_ERROR') */
  readonly code: string
  /** Status HTTP correspondente */
  readonly statusCode: number
  /** Detalhes adicionais (erros de validação, etc.) */
  readonly details?: unknown
  /** Erro original que causou este (quando aplicável) */
  readonly cause?: Error
  /** Se o erro é recuperável com retentativa */
  readonly retryable: boolean
  /** ID de correlação para rastreamento ponta a ponta */
  correlationId?: string
  /** ID da empresa associada (quando disponível) */
  empresaId?: string

  constructor(message: string, statusCode: number, code: string, options?: {
    details?: unknown
    cause?: Error
    retryable?: boolean
    correlationId?: string
    empresaId?: string
  }) {
    super(message)
    this.name = this.constructor.name
    this.code = code
    this.statusCode = statusCode
    this.details = options?.details
    this.cause = options?.cause
    this.retryable = options?.retryable ?? false
    this.correlationId = options?.correlationId
    this.empresaId = options?.empresaId
  }
}

export class ValidationError extends BaseAppError {
  constructor(message: string, options?: { details?: unknown; cause?: Error; correlationId?: string; empresaId?: string }) {
    super(message, 400, 'VALIDATION_ERROR', { ...options, retryable: false })
  }
}

export class AuthenticationError extends BaseAppError {
  constructor(message = 'Não autenticado', options?: { cause?: Error; correlationId?: string; empresaId?: string }) {
    super(message, 401, 'AUTHENTICATION_ERROR', { ...options, retryable: false })
  }
}

export class AuthorizationError extends BaseAppError {
  constructor(message = 'Sem permissão para esta ação', options?: { cause?: Error; correlationId?: string; empresaId?: string }) {
    super(message, 403, 'AUTHORIZATION_ERROR', { ...options, retryable: false })
  }
}

export class NotFoundError extends BaseAppError {
  constructor(message: string, options?: { details?: unknown; cause?: Error; correlationId?: string; empresaId?: string }) {
    super(message, 404, 'NOT_FOUND', { ...options, retryable: false })
  }
}

export class BusinessRuleError extends BaseAppError {
  constructor(message: string, options?: { details?: unknown; cause?: Error; correlationId?: string; empresaId?: string }) {
    super(message, 422, 'BUSINESS_RULE_ERROR', { ...options, retryable: false })
  }
}

export class ConflictError extends BaseAppError {
  constructor(message: string, options?: { details?: unknown; cause?: Error; correlationId?: string; empresaId?: string }) {
    super(message, 409, 'CONFLICT_ERROR', { ...options, retryable: false })
  }
}

export class RateLimitError extends BaseAppError {
  constructor(message = 'Muitas requisições. Tente novamente mais tarde.', options?: { details?: unknown; cause?: Error; correlationId?: string; empresaId?: string }) {
    super(message, 429, 'RATE_LIMIT_ERROR', { ...options, retryable: true })
  }
}

export class InternalApplicationError extends BaseAppError {
  constructor(message = 'Não consegui fazer isso agora. Vamos tentar novamente.', options?: { details?: unknown; cause?: Error; correlationId?: string; empresaId?: string }) {
    super(message, 500, 'INTERNAL_ERROR', { ...options, retryable: true })
  }
}
