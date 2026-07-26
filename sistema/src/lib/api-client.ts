/**
 * ─── CLIENTE HTTP CENTRALIZADO ────────────────────────────────────────────────
 *
 * Por que este arquivo existe:
 * Antes dele, cada hook (use-clientes, use-leads, use-tarefas, use-transacoes)
 * reimplementava fetch + tratamento de erro de forma ligeiramente diferente.
 * Auditoria de QA encontrou o resultado disso: metade dos métodos de cada hook
 * lia corretamente a mensagem de erro que a API retorna (`{ error: '...' }`),
 * e a outra metade descartava essa mensagem e mostrava um texto genérico fixo
 * — então quando a API passou a retornar erros mais específicos (403 de
 * permissão, 429 de rate limit, 402 de plano insuficiente), esses textos
 * relevantes nunca chegavam à tela em vários pontos do sistema.
 *
 * Este helper resolve isso na raiz: um único lugar que sabe fazer fetch e
 * extrair a mensagem de erro real, usado por todos os hooks e pelo chat da
 * IA. Qualquer rota nova herda o tratamento correto automaticamente — não
 * é preciso lembrar de replicar a lógica a cada novo hook.
 */

export class ApiError extends Error {
  status: number
  constructor(message: string, status: number) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

interface ApiFetchOptions extends RequestInit {
  /** Corpo já serializável — o helper cuida do JSON.stringify e do header */
  json?: unknown
}

/**
 * Faz um fetch para a API e retorna o corpo já tipado em caso de sucesso.
 * Em caso de erro (status não-2xx), lança ApiError com a mensagem REAL
 * vinda do corpo da resposta (`{ error: string }`), nunca um texto genérico
 * inventado no cliente — a API já formula a mensagem certa para cada caso
 * (permissão insuficiente, rate limit, plano bloqueado, validação, etc.);
 * o papel deste helper é apenas garantir que essa mensagem chegue à tela.
 */
export async function apiFetch<T = unknown>(url: string, options: ApiFetchOptions = {}): Promise<T> {
  const { json, headers, ...rest } = options

  const res = await fetch(url, {
    ...rest,
    headers: {
      ...(json !== undefined && { 'Content-Type': 'application/json' }),
      ...headers,
    },
    ...(json !== undefined && { body: JSON.stringify(json) }),
  })

  // Tenta ler o corpo mesmo em erro — é onde a mensagem real mora.
  // Se o corpo não for JSON válido (ex: erro de rede antes de chegar no
  // servidor, ou timeout), cai no texto genérico como último recurso.
  let corpo: unknown = null
  try {
    corpo = await res.json()
  } catch {
    corpo = null
  }

  if (!res.ok) {
    const mensagem =
      (corpo && typeof corpo === 'object' && 'error' in corpo && typeof corpo.error === 'string')
        ? corpo.error
        : `Erro na requisição (${res.status})`
    throw new ApiError(mensagem, res.status)
  }

  return corpo as T
}

/**
 * Variante para respostas em streaming (usada pelo Assistente IA), onde o
 * corpo não é JSON — é um ReadableStream de texto. A diferença em relação
 * a apiFetch: em caso de erro, ainda tentamos ler o JSON de erro (a rota
 * retorna JSON normal quando barra por 402/429/401, e só entrega o stream
 * quando a requisição é aceita).
 */
export async function apiFetchStream(url: string, options: ApiFetchOptions = {}): Promise<Response> {
  const { json, headers, ...rest } = options

  const res = await fetch(url, {
    ...rest,
    headers: {
      ...(json !== undefined && { 'Content-Type': 'application/json' }),
      ...headers,
    },
    ...(json !== undefined && { body: JSON.stringify(json) }),
  })

  if (!res.ok) {
    let corpo: unknown = null
    try {
      corpo = await res.json()
    } catch {
      corpo = null
    }
    const mensagem =
      (corpo && typeof corpo === 'object' && 'error' in corpo && typeof corpo.error === 'string')
        ? corpo.error
        : `Erro na requisição (${res.status})`
    throw new ApiError(mensagem, res.status)
  }

  return res
}

/**
 * Helper de conveniência para extrair a mensagem de um erro desconhecido
 * capturado em catch — usado nos hooks no lugar de `e instanceof Error ? e.message : '...'`
 * espalhado em cada catch. Sempre prioriza a mensagem real do ApiError.
 */
export function mensagemDeErro(e: unknown, fallback = 'Erro desconhecido'): string {
  if (e instanceof ApiError) return e.message
  if (e instanceof Error) return e.message
  return fallback
}
