/**
 * ─── OPERAÇÕES FOUNDER (P91) — NÚCLEO PURO ────────────────────────────────────
 *
 * Módulo determinístico (sem acesso a banco) que define as regras de operação
 * do processo de entrada de Founders: rótulos de status, transições válidas,
 * opções de onboarding e construção da mensagem/URL de contato via WhatsApp.
 *
 * Ao contrário dos services (que acessam o banco), este arquivo pode ser
 * testado de forma isolada — por isso toda lógica de regra de negócio vive
 * aqui, e não dentro das rotas ou componentes.
 */

// ─── WHATSAPP ─────────────────────────────────────────────────────────────────

/** Número oficial de contato da Ponte Digital (mesmo número usado em P90). */
export const FOUNDER_WHATSAPP_NUMERO = '5548991133397'

/**
 * Mensagem contextual de primeiro contato com o empresário que solicitou
 * participação como Founder. Determinística — o conteúdo é fixo e preparado
 * para envio pelo número oficial da Ponte.
 */
export function montarMensagemContato(dados: {
  responsavel: string
  nomeEmpresa: string
}): string {
  return [
    `Olá, ${dados.responsavel}.`,
    '',
    'Aqui é o Kelven, da Ponte Digital.',
    '',
    'Vi sua solicitação para participar como Founder.',
    '',
    `Quero conversar com você sobre a realidade da ${dados.nomeEmpresa}.`,
  ].join('\n')
}

/** URL do WhatsApp com mensagem pronta (encode automático). */
export function montarUrlWhatsAppFundador(
  mensagem: string,
  numero: string = FOUNDER_WHATSAPP_NUMERO,
): string {
  return `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`
}

// ─── STATUS DA SOLICITAÇÃO ────────────────────────────────────────────────────

export type StatusSolicitacaoFounderOp =
  | 'PENDING'
  | 'CONTACTED'
  | 'IN_REVIEW'
  | 'APPROVED'
  | 'REJECTED'

/** Rótulo amigável em português para cada status (exibição no painel). */
export const STATUS_SOLICITACAO_FOUNDER_ROTULO: Record<StatusSolicitacaoFounderOp, string> = {
  PENDING: 'Pendente',
  CONTACTED: 'Em contato',
  IN_REVIEW: 'Em análise',
  APPROVED: 'Aprovada',
  REJECTED: 'Rejeitada',
}

export const STATUS_SOLICITACAO_FOUNDER_ORDEM: StatusSolicitacaoFounderOp[] = [
  'PENDING',
  'CONTACTED',
  'IN_REVIEW',
  'APPROVED',
  'REJECTED',
]

/**
 * Transições permitidas entre status.
 *
 * O caminho feliz é linear: PENDING → CONTACTED → IN_REVIEW → APPROVED.
 * A regra preserva esse desenho: nada avança sem antes ter passado pela etapa
 * anterior (não se chega EM ANÁLISE sem antes ter tido CONTATO). O time pode
 * voltar um passo quando a realidade da conversa mudou, e REJECTED só reabre
 * para PENDING — nunca para um status avançado sem reconsiderar.
 */
export const TRANSICOES_STATUS_SOLICITACAO: Record<StatusSolicitacaoFounderOp, StatusSolicitacaoFounderOp[]> = {
  PENDING: ['CONTACTED', 'REJECTED'],
  CONTACTED: ['IN_REVIEW', 'PENDING', 'REJECTED'],
  IN_REVIEW: ['APPROVED', 'CONTACTED', 'REJECTED'],
  APPROVED: ['REJECTED'], // para desaprovar depois de aprovar (caso raro, com confirmação)
  REJECTED: ['PENDING'], // reabertura
}

/** Deve mudar de status? */
export function podeTransicionarStatusSolicitacao(
  de: StatusSolicitacaoFounderOp,
  para: StatusSolicitacaoFounderOp,
): boolean {
  if (de === para) return true
  const permitidos = TRANSICOES_STATUS_SOLICITACAO[de]
  return permitidos?.includes(para) ?? false
}

/**
 * Status que exigem confirmação explícita no painel (ação de peso).
 * Aprovar e rejeitar mudam o rumo da relação — nunca devem ser ações em 1 clique.
 */
export const STATUS_COM_CONFIRMACAO: StatusSolicitacaoFounderOp[] = ['APPROVED', 'REJECTED']

// ─── ONBOARDING (P91) ─────────────────────────────────────────────────────────

export type OnboardingFounderChave = 'RAPIDA' | 'GRADUAL' | 'COMPLETA'

export const ONBOARDING_FOUNDER_OPCOES: {
  chave: OnboardingFounderChave
  titulo: string
  subtitulo: string
  descricao: string
  passos: string[]
}[] = [
  {
    chave: 'RAPIDA',
    titulo: 'Rápida',
    subtitulo: 'Primeiro passo',
    descricao:
      'Para a empresa que quer começar sem longas cerimônias: uma conversa curta pela estrutura da Primeira Sessão, contexto mínimo registrado e o primeiro retrato da empresa. O mapa inicial nasce da primeira conversa.',
    passos: [
      'Uma conversa guiada pela estrutura da Primeira Sessão Estratégica',
      'Contexto mínimo da empresa registrado',
      'Primeiro retrato da empresa (o ponto de partida)',
    ],
  },
  {
    chave: 'GRADUAL',
    titulo: 'Gradual',
    subtitulo: 'Dia após dia',
    descricao:
      'Para a empresa que prefere construir aos poucos, sem sobrecarga: um capítulo por conversa, no ritmo do empresário. Cada dia deixa o retrato mais completo.',
    passos: [
      'Dia 1 — Empresa e contexto',
      'Dia 2 — Clientes e operação',
      'Dia 3 — Equipe e comunicação',
      'Dia 4 — Decisões e desafios',
      'Mapa inicial da empresa',
    ],
  },
  {
    chave: 'COMPLETA',
    titulo: 'Completa',
    subtitulo: 'Mergulho profundo',
    descricao:
      'Para a empresa que quer começar já com profundidade: a conversa completa da Ponte, dividida em etapas, usando a mesma estrutura do /conversa. Sem atalhos e sem pressa.',
    passos: [
      'Conversa completa em etapas, reutilizando a estrutura do /conversa',
      'Cada etapa registra contexto no patrimônio da empresa',
      'Retrato estratégico inicial gerado a partir da conversa',
    ],
  },
]

export function rotuloOnboardingFounder(chave: string | null | undefined): string | null {
  if (!chave) return null
  return ONBOARDING_FOUNDER_OPCOES.find((o) => o.chave === chave)?.titulo ?? null
}