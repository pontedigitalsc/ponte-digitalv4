import type { EstagioLead, StatusCliente, StatusTarefa, Prioridade, TipoTarefa, StatusImplantacao, StatusTransacao, TipoTransacao, Temperatura, TipoHistorico } from '@/types'

// ─── PIPELINE DE LEADS ────────────────────────────────────────────────────────

export const ESTAGIOS_LEAD: Record<EstagioLead, { label: string; cor: string; bg: string }> = {
  CONTATO:         { label: 'Contato',     cor: '#6B7280', bg: '#F3F4F6' },
  DIAGNOSTICO:     { label: 'Diagnóstico', cor: '#2563EB', bg: '#EFF6FF' },
  PROPOSTA:        { label: 'Proposta',    cor: '#7C3AED', bg: '#F5F3FF' },
  NEGOCIACAO:      { label: 'Negociação',  cor: '#D97706', bg: '#FFFBEB' },
  FECHADO_GANHO:   { label: 'Ganho',       cor: '#059669', bg: '#ECFDF5' },
  FECHADO_PERDIDO: { label: 'Perdido',     cor: '#DC2626', bg: '#FEF2F2' },
}

export const TEMPERATURA: Record<Temperatura, { label: string; emoji: string; cor: string }> = {
  QUENTE: { label: 'Quente', emoji: '🔥', cor: '#DC2626' },
  MORNO:  { label: 'Morno',  emoji: '🌡️', cor: '#D97706' },
  FRIO:   { label: 'Frio',   emoji: '❄️', cor: '#2563EB' },
}

export const ORIGENS_LEAD = [
  { value: 'INDICACAO',    label: 'Indicação' },
  { value: 'SITE',         label: 'Site' },
  { value: 'INSTAGRAM',    label: 'Instagram' },
  { value: 'FACEBOOK',     label: 'Facebook' },
  { value: 'GOOGLE',       label: 'Google' },
  { value: 'WHATSAPP',     label: 'WhatsApp' },
  { value: 'COLD_OUTREACH',label: 'Cold Outreach' },
  { value: 'EVENTO',       label: 'Evento' },
  { value: 'OUTRO',        label: 'Outro' },
] as const

// ─── STATUS CLIENTES ──────────────────────────────────────────────────────────

export const STATUS_CLIENTE: Record<StatusCliente, { label: string; cor: string; bg: string }> = {
  ATIVO:        { label: 'Ativo',        cor: '#059669', bg: '#ECFDF5' },
  TRIAL:        { label: 'Trial',        cor: '#7C3AED', bg: '#F5F3FF' },
  INATIVO:      { label: 'Inativo',      cor: '#6B7280', bg: '#F3F4F6' },
  INADIMPLENTE: { label: 'Inadimplente', cor: '#DC2626', bg: '#FEF2F2' },
  CANCELADO:    { label: 'Cancelado',    cor: '#9CA3AF', bg: '#F9FAFB' },
}

// ─── TAREFAS ──────────────────────────────────────────────────────────────────

export const STATUS_TAREFA: Record<StatusTarefa, { label: string; cor: string; bg: string }> = {
  PENDENTE:    { label: 'Pendente',     cor: '#6B7280', bg: '#F3F4F6' },
  EM_ANDAMENTO:{ label: 'Em andamento', cor: '#2563EB', bg: '#EFF6FF' },
  CONCLUIDA:   { label: 'Concluída',    cor: '#059669', bg: '#ECFDF5' },
  CANCELADA:   { label: 'Cancelada',    cor: '#9CA3AF', bg: '#F9FAFB' },
}

export const PRIORIDADE: Record<Prioridade, { label: string; cor: string; bg: string }> = {
  URGENTE: { label: 'Urgente', cor: '#DC2626', bg: '#FEF2F2' },
  ALTA:    { label: 'Alta',    cor: '#D97706', bg: '#FFFBEB' },
  MEDIA:   { label: 'Média',   cor: '#2563EB', bg: '#EFF6FF' },
  BAIXA:   { label: 'Baixa',   cor: '#6B7280', bg: '#F3F4F6' },
}

export const TIPO_TAREFA: Record<TipoTarefa, { label: string; icone: string }> = {
  TAREFA:    { label: 'Tarefa',     icone: 'CheckSquare' },
  LIGACAO:   { label: 'Ligação',    icone: 'Phone' },
  EMAIL:     { label: 'E-mail',     icone: 'Mail' },
  REUNIAO:   { label: 'Reunião',    icone: 'Users' },
  FOLLOW_UP: { label: 'Follow-up',  icone: 'RefreshCw' },
  VISITA:    { label: 'Visita',     icone: 'MapPin' },
}

// ─── IMPLANTAÇÕES ─────────────────────────────────────────────────────────────

export const STATUS_IMPLANTACAO: Record<StatusImplantacao, { label: string; cor: string; bg: string }> = {
  PENDENTE:          { label: 'Pendente',          cor: '#6B7280', bg: '#F3F4F6' },
  EM_ANDAMENTO:      { label: 'Em andamento',      cor: '#2563EB', bg: '#EFF6FF' },
  AGUARDANDO_CLIENTE:{ label: 'Aguardando cliente',cor: '#D97706', bg: '#FFFBEB' },
  CONCLUIDA:         { label: 'Concluída',         cor: '#059669', bg: '#ECFDF5' },
  CANCELADA:         { label: 'Cancelada',         cor: '#9CA3AF', bg: '#F9FAFB' },
}

export const ETAPAS_PADRAO_IMPLANTACAO = [
  'Primeira conversa com o cliente',
  'Configuração inicial da Ponte',
  'Acomodar os dados atuais',
  'Apresentar para a equipe',
  'Período de testes',
  'Colocar no dia a dia',
  'Acompanhamento depois disso',
]

// ─── FINANCEIRO ───────────────────────────────────────────────────────────────

export const STATUS_TRANSACAO: Record<StatusTransacao, { label: string; cor: string; bg: string }> = {
  PENDENTE:  { label: 'Pendente',  cor: '#D97706', bg: '#FFFBEB' },
  PAGO:      { label: 'Pago',      cor: '#059669', bg: '#ECFDF5' },
  VENCIDO:   { label: 'Vencido',   cor: '#DC2626', bg: '#FEF2F2' },
  CANCELADO: { label: 'Cancelado', cor: '#9CA3AF', bg: '#F9FAFB' },
}

export const TIPO_TRANSACAO: Record<TipoTransacao, { label: string; cor: string }> = {
  RECEITA: { label: 'Receita', cor: '#059669' },
  DESPESA: { label: 'Despesa', cor: '#DC2626' },
}

export const CATEGORIAS_RECEITA = [
  'Mensalidade SaaS',
  'Implantação',
  'Consultoria',
  'Treinamento',
  'Suporte',
  'Outros',
]

// ─── HISTÓRICO ────────────────────────────────────────────────────────────────

export const TIPO_HISTORICO: Record<TipoHistorico, { label: string; cor: string; bg: string }> = {
  NOTA:     { label: 'Nota',     cor: '#6B7280', bg: '#F3F4F6' },
  LIGACAO:  { label: 'Ligação',  cor: '#2563EB', bg: '#EFF6FF' },
  EMAIL:    { label: 'E-mail',   cor: '#7C3AED', bg: '#F5F3FF' },
  REUNIAO:  { label: 'Reunião',  cor: '#D97706', bg: '#FFFBEB' },
  WHATSAPP: { label: 'WhatsApp', cor: '#059669', bg: '#ECFDF5' },
  PROPOSTA: { label: 'Proposta', cor: '#DC2626', bg: '#FEF2F2' },
  CONTRATO: { label: 'Contrato', cor: '#059669', bg: '#ECFDF5' },
  SISTEMA:  { label: 'Ponte',  cor: '#9CA3AF', bg: '#F9FAFB' },
}

export const CATEGORIAS_DESPESA = [
  'Infraestrutura',
  'Marketing',
  'Pessoal',
  'Ferramentas',
  'Operacional',
  'Outros',
]

// ─── CONHECIMENTO ─────────────────────────────────────────────────────────

export const CATEGORIA_EVIDENCIA: Record<string, { label: string; cor: string; bg: string }> = {
  FINANCEIRO:  { label: 'Financeiro',  cor: '#059669', bg: '#ECFDF5' },
  CLIENTES:    { label: 'Clientes',    cor: '#2563EB', bg: '#EFF6FF' },
  OPERACAO:    { label: 'Operação',    cor: '#D97706', bg: '#FFFBEB' },
  GESTAO:      { label: 'Gestão',      cor: '#7C3AED', bg: '#F5F3FF' },
  PESSOAS:     { label: 'Pessoas',     cor: '#DC2626', bg: '#FEF2F2' },
  PRODUTO:     { label: 'Produto',     cor: '#6B7280', bg: '#F3F4F6' },
  ESTRATEGIA:  { label: 'Estratégia',  cor: '#8B5CF6', bg: '#F5F3FF' },
}

export const ORIGEM_CONHECIMENTO: Record<string, { label: string }> = {
  validacao_hipotese: { label: 'Acompanhamento' },
  conversa:           { label: 'Nossa conversa' },
  empresario:         { label: 'Você' },
  equipe:             { label: 'Sua equipe' },
  sistema:            { label: 'Ponte' },
}

export const STATUS_CONHECIMENTO: Record<string, { label: string; cor: string; bg: string }> = {
  HIPOTESE:       { label: 'Hipótese',     cor: '#6B7280', bg: '#F3F4F6' },
  EM_OBSERVACAO:  { label: 'Em acompanhamento', cor: '#2563EB', bg: '#EFF6FF' },
  CONFIRMADO:     { label: 'Confirmado',   cor: '#059669', bg: '#ECFDF5' },
  DESCARTADO:     { label: 'Descartado',   cor: '#DC2626', bg: '#FEF2F2' },
}

// ─── LINGUAGEM AMIGÁVEL ──────────────────────────────────────────────────────

// Origem exibida em cards de insight, notificações e linha do tempo.
// Valores técnicos (Engine, SISTEMA etc.) são apresentados como "Ponte".
export const ORIGEM_AMIGAVEL: Record<string, string> = {
  SISTEMA: 'Ponte',
  sistema: 'Ponte',
  'Action Engine': 'Ponte',
  'Decision Engine': 'Ponte',
  'Feedback Engine': 'Ponte',
  'Outcome Engine': 'Ponte',
  'Activation Engine': 'Ponte',
  'Journey Engine': 'Ponte',
  'Knowledge Governance': 'Ponte',
  'Learning Engine': 'Ponte',
  'Context Engine': 'Ponte',
  'Workflow Engine': 'Ponte',
  'Brainstorm Engine': 'Ponte',
  'Memory Engine': 'Ponte',
  ANALISE_EVIDENCIAS: 'Ponte',
  ACAO_USUARIO: 'Sua ação',
  PRIMEIRA_CONVERSA: 'Nossa conversa',
  'primeira-conversa': 'Nossa conversa',
  CONVERSA: 'Nossa conversa',
  conversa: 'Nossa conversa',
  MANUAL: 'Registrado por você',
  PERGUNTA: 'Pergunta rápida',
  validacao_hipotese: 'Acompanhamento',
  empresario: 'Você',
  equipe: 'Sua equipe',
}

export const PRIORIDADE_AMIGAVEL: Record<string, string> = {
  alta: 'Agora',
  media: 'Em breve',
  baixa: 'Quando puder',
  URGENTE: 'Agora',
  ALTA: 'Em breve',
  MEDIA: 'Quando puder',
  BAIXA: 'Vale acompanhar',
}

// ─── MICROCOPY ────────────────────────────────────────────────────────────────

// Textos de interface com tom humano, sem jargão técnico (P54).
export const MICROCOPY = {
  buscaClienteVazia: 'Ainda não conhecemos nenhum cliente que combine com',
  guardar: 'Guardar',
  guardarAlteracoes: 'Guardar alterações',
  remover: 'Remover',
  removerDestaHistoria: 'Remover desta história',
} as const
