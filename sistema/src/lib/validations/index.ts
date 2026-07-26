import { z } from 'zod'

// ─── AUTH ─────────────────────────────────────────────────────────────────────

export const loginSchema = z.object({
  email: z.string().email('E-mail inválido'),
  senha: z.string().min(6, 'Mínimo 6 caracteres'),
})

export type LoginInput = z.infer<typeof loginSchema>

export const registerSchema = z.object({
  nome: z.string().min(2, 'Nome muito curto'),
  email: z.string().email('E-mail inválido'),
  senha: z.string().min(6, 'Mínimo 6 caracteres'),
  nomeEmpresa: z.string().min(2, 'Nome da empresa muito curto'),
})

// ─── LEAD ─────────────────────────────────────────────────────────────────────

export const leadSchema = z.object({
  nome: z.string().min(2, 'Nome obrigatório'),
  email: z.string().email('E-mail inválido').optional().or(z.literal('')),
  telefone: z.string().optional(),
  empresa: z.string().optional(),
  cargo: z.string().optional(),
  origem: z.enum(['INDICACAO', 'SITE', 'INSTAGRAM', 'FACEBOOK', 'GOOGLE', 'WHATSAPP', 'COLD_OUTREACH', 'EVENTO', 'OUTRO']),
  estagio: z.enum(['CONTATO', 'DIAGNOSTICO', 'PROPOSTA', 'NEGOCIACAO', 'FECHADO_GANHO', 'FECHADO_PERDIDO']),
  temperatura: z.enum(['QUENTE', 'MORNO', 'FRIO']),
  valor: z.number().positive().optional().nullable(),
  observacoes: z.string().optional(),
  responsavelId: z.string().optional().nullable(),
})

export type LeadInput = z.infer<typeof leadSchema>

// ─── CLIENTE ──────────────────────────────────────────────────────────────────

export const clienteSchema = z.object({
  nome: z.string().min(2, 'Nome obrigatório'),
  email: z.string().email('E-mail inválido').optional().or(z.literal('')),
  telefone: z.string().optional(),
  documento: z.string().optional(),
  segmento: z.string().optional(),
  site: z.string().url('URL inválida').optional().or(z.literal('')),
  endereco: z.string().optional(),
  cidade: z.string().optional(),
  estado: z.string().optional(),
  status: z.enum(['ATIVO', 'INATIVO', 'INADIMPLENTE', 'CANCELADO', 'TRIAL']),
  valorMensal: z.number().positive().optional().nullable(),
  diaVencimento: z.number().min(1).max(31).optional().nullable(),
  observacoes: z.string().optional(),
})

export type ClienteInput = z.infer<typeof clienteSchema>

// ─── TAREFA ───────────────────────────────────────────────────────────────────

export const tarefaSchema = z.object({
  titulo: z.string().min(2, 'Título obrigatório'),
  descricao: z.string().optional(),
  status: z.enum(['PENDENTE', 'EM_ANDAMENTO', 'CONCLUIDA', 'CANCELADA']),
  prioridade: z.enum(['URGENTE', 'ALTA', 'MEDIA', 'BAIXA']),
  tipo: z.enum(['TAREFA', 'LIGACAO', 'EMAIL', 'REUNIAO', 'FOLLOW_UP', 'VISITA']),
  dataVencimento: z.coerce.date().optional().nullable(),
  responsavelId: z.string().optional().nullable(),
  clienteId: z.string().optional().nullable(),
  leadId: z.string().optional().nullable(),
})

export type TarefaInput = z.infer<typeof tarefaSchema>

// ─── HISTÓRICO ────────────────────────────────────────────────────────────────

export const historicoSchema = z.object({
  tipo: z.enum(['NOTA', 'LIGACAO', 'EMAIL', 'REUNIAO', 'WHATSAPP', 'PROPOSTA', 'CONTRATO', 'SISTEMA']),
  titulo: z.string().min(2, 'Título obrigatório'),
  descricao: z.string().optional(),
  clienteId: z.string().optional().nullable(),
  leadId: z.string().optional().nullable(),
})

export type HistoricoInput = z.infer<typeof historicoSchema>

// ─── TRANSAÇÃO ────────────────────────────────────────────────────────────────

export const transacaoSchema = z.object({
  tipo: z.enum(['RECEITA', 'DESPESA']),
  categoria: z.string().optional(),
  descricao: z.string().min(2, 'Descrição obrigatória'),
  valor: z.number().positive('Valor deve ser positivo'),
  status: z.enum(['PENDENTE', 'PAGO', 'VENCIDO', 'CANCELADO']),
  dataVencimento: z.coerce.date().optional().nullable(),
  dataPagamento: z.coerce.date().optional().nullable(),
  recorrente: z.boolean().default(false),
  clienteId: z.string().optional().nullable(),
  observacoes: z.string().optional(),
})

export type TransacaoInput = z.infer<typeof transacaoSchema>

// ─── IMPLANTAÇÃO ──────────────────────────────────────────────────────────────

export const implantacaoSchema = z.object({
  titulo: z.string().min(2, 'Título obrigatório'),
  descricao: z.string().optional(),
  clienteId: z.string().min(1, 'Cliente obrigatório'),
  status: z.enum(['PENDENTE', 'EM_ANDAMENTO', 'AGUARDANDO_CLIENTE', 'CONCLUIDA', 'CANCELADA']),
  dataInicio: z.coerce.date().optional().nullable(),
  dataPrevisao: z.coerce.date().optional().nullable(),
})

export type ImplantacaoInput = z.infer<typeof implantacaoSchema>

// ─── CONVERSA ──────────────────────────────────────────────────────────────────

export const conversaRespostaSchema = z.object({
  perguntaId: z.string().min(1, 'Pergunta obrigatória'),
  valor: z.string().max(5000, 'Resposta muito longa'),
})

export type ConversaRespostaInput = z.infer<typeof conversaRespostaSchema>

// ─── ASSISTENTE ────────────────────────────────────────────────────────────────

export const assistenteMensagemSchema = z.object({
  role: z.enum(['user', 'assistant', 'system']),
  content: z.string().min(1),
})

export const assistenteRequisicaoSchema = z.object({
  mensagens: z.array(assistenteMensagemSchema).min(1, 'Pelo menos uma mensagem'),
})

export type AssistenteRequisicaoInput = z.infer<typeof assistenteRequisicaoSchema>

// ─── APRENDIZADO ───────────────────────────────────────────────────────────────

export const aprendizadoCategorias = [
  'VALORES',
  'PREFERENCIAS',
  'REGRAS',
  'OBJETIVOS',
  'ROTINAS',
  'EQUIPE',
  'CLIENTES',
  'FINANCEIRO',
  'OPERACAO',
  'VISAO',
  'RISCOS',
] as const

export const aprendizadoOrigens = ['CONVERSA', 'MANUAL', 'PERGUNTA'] as const

export const aprendizadoSchema = z.object({
  descricao: z.string().min(2, 'Descrição deve ter pelo menos 2 caracteres'),
  categoria: z.enum(aprendizadoCategorias),
  origem: z.enum(aprendizadoOrigens).default('MANUAL'),
  contexto: z.string().optional().nullable(),
})

export type AprendizadoInput = z.infer<typeof aprendizadoSchema>
