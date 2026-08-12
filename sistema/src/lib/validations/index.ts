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

// ─── SOLICITAÇÃO FOUNDER ───────────────────────────────────────────────────────

export const EQUIPE_FOUNDER_OPCOES = [
  { chave: 'SOZINHO', rotulo: 'Só eu' },
  { chave: '2_A_5', rotulo: '2 a 5 pessoas' },
  { chave: '6_A_15', rotulo: '6 a 15 pessoas' },
  { chave: '16_A_30', rotulo: '16 a 30 pessoas' },
  { chave: '31_A_50', rotulo: '31 a 50 pessoas' },
  { chave: 'MAIS_50', rotulo: 'Mais de 50 pessoas' },
] as const

export type EquipeFounderChave = (typeof EQUIPE_FOUNDER_OPCOES)[number]['chave']

export function rotuloEquipeFounder(chave: string | null | undefined): string | null {
  if (!chave) return null
  return EQUIPE_FOUNDER_OPCOES.find((o) => o.chave === chave)?.rotulo ?? null
}

const textAreaObrigatorio = (mensagem: string) =>
  z.string().trim().min(10, mensagem).max(4000, 'Escreva em até 4000 caracteres.')

export const founderSolicitacaoSchema = z.object({
  nomeEmpresa: z
    .string()
    .trim()
    .min(2, 'Conte o nome da sua empresa.')
    .max(120, 'Nome da empresa muito longo.'),
  responsavel: z
    .string()
    .trim()
    .min(2, 'Conte o nome de quem é responsável pela empresa.')
    .max(120, 'Nome muito longo.'),
  segmento: z
    .string()
    .trim()
    .min(2, 'Conte o segmento da sua empresa.')
    .max(80, 'Segmento muito longo.'),
  cidadeRegiao: z
    .string()
    .trim()
    .min(2, 'Conte a cidade ou região da sua empresa.')
    .max(120, 'Localização muito longa.'),
  equipe: z
    .enum(['SOZINHO', '2_A_5', '6_A_15', '16_A_30', '31_A_50', 'MAIS_50'] as const)
    .optional()
    .nullable(),
  oQueEmpresaFaz: textAreaObrigatorio('Conte um pouco sobre o que sua empresa faz.'),
  principalDesafio: textAreaObrigatorio('Conte qual é o principal desafio hoje.'),
  gostariaEnxergar: textAreaObrigatorio('Conte o que gostaria de enxergar melhor.'),
  motivacao: textAreaObrigatorio('Conte por que quer se tornar Founder.'),
})

export type FounderSolicitacaoInput = z.infer<typeof founderSolicitacaoSchema>

// ─── OPERAÇÕES FOUNDER (P91) ──────────────────────────────────────────────────

export const STATUS_SOLICITACAO_FOUNDER_OPCOES = ['PENDING', 'CONTACTED', 'IN_REVIEW', 'APPROVED', 'REJECTED'] as const

export const ONBOARDING_FOUNDER_CHAVES = ['RAPIDA', 'GRADUAL', 'COMPLETA'] as const

export const atualizarSolicitacaoFounderSchema = z.object({
  status: z.enum(STATUS_SOLICITACAO_FOUNDER_OPCOES).optional(),
  observacaoAdmin: z.string().trim().max(2000, 'Observação muito longa.').optional().nullable(),
  onboardingTipo: z.enum(ONBOARDING_FOUNDER_CHAVES).optional().nullable(),
})

export type AtualizarSolicitacaoFounderInput = z.infer<typeof atualizarSolicitacaoFounderSchema>

export const ativarFounderSchema = z.object({
  empresaId: z.string().min(1, 'Empresa obrigatória.'),
  numeroFundador: z.coerce.number().int('Número inteiro.').positive('Número positivo.').max(999_999, 'Número muito grande.').optional().nullable(),
})

export type AtivarFounderInput = z.infer<typeof ativarFounderSchema>

// ─── PONTE DESCOBERTA (P92) ───────────────────────────────────────────────────

export const STATUS_DIAGNOSTICO_DESCOBERTA_OPCOES = [
  'NAO_INICIADO',
  'EM_DESCOBERTA',
  'MAPEADO',
  'EM_VALIDACAO',
  'VALIDADO',
  'EM_IMPLEMENTACAO',
  'IMPLEMENTADO',
  'EM_APRENDIZADO',
] as const

export const TAXONOMIA_REGISTRO_DESCOBERTA_OPCOES = [
  'CONHECIMENTO_CONHECIDO',
  'INFORMACAO_FORNECIDA',
  'OBSERVACAO',
  'HIPOTESE',
  'DECISAO',
  'OPORTUNIDADE',
  'DESCONHECIDO',
] as const

export const PAPEL_PARTICIPANTE_DESCOBERTA_OPCOES = ['PROPRIETARIO', 'GESTAO', 'OPERACAO'] as const

export const CONFIANCA_DESCOBERTA_OPCOES = ['ALTA', 'MEDIA', 'BAIXA'] as const

const textoSemHtml = (msg: string) =>
  z.string().trim().min(1, msg).max(8000, 'Texto muito longo.')

export const criarDiagnosticoDescobertaSchema = z.object({
  nomeEmpresa: z.string().trim().min(2, 'Nome da empresa é obrigatório.').max(120, 'Nome muito longo.'),
  categoriaNome: z.string().trim().min(2, 'Categoria é obrigatória.').max(80, 'Categoria muito longa.'),
  categoriaSlug: z
    .string()
    .trim()
    .min(2, 'Identificador da categoria é obrigatório.')
    .max(80, 'Identificador muito longo.')
    .regex(/^[a-z0-9-]+$/, 'Identificador deve ser minúsculo, sem espaços nem acentos.'),
  empresaId: z.string().min(1, 'Empresa inválida.').optional().nullable(),
  unidadeOperacional: z.string().trim().max(150, 'Textualidade longa.').optional().nullable(),
  usarTemplateSerralheria: z.boolean().optional(),
})

export type CriarDiagnosticoDescobertaInput = z.infer<typeof criarDiagnosticoDescobertaSchema>

export const atualizarStatusDiagnosticoDescobertaSchema = z.object({
  status: z.enum(STATUS_DIAGNOSTICO_DESCOBERTA_OPCOES),
})

export type AtualizarStatusDiagnosticoDescobertaInput = z.infer<
  typeof atualizarStatusDiagnosticoDescobertaSchema
>

export const registrarRespostaAncoraSchema = z.object({
  resposta: textoSemHtml('A resposta da pergunta-âncora é obrigatória no MVP.'),
  resultadoDeclarado: z.string().trim().max(8000, 'Texto muito longo.').optional().nullable(),
})

export const adicionarParticipanteSchema = z.object({
  nome: z.string().trim().min(2, 'Nome do participante é obrigatório.').max(120, 'Nome muito longo.'),
  papel: z.enum(PAPEL_PARTICIPANTE_DESCOBERTA_OPCOES),
  cargo: z.string().trim().max(120, 'Cargo muito longo.').optional().nullable(),
})

export const registrarRespostaDescobertaSchema = z.object({
  participanteId: z.string().min(1, 'Participante inválido.').optional().nullable(),
  resposta: textoSemHtml('A resposta é obrigatória.'),
})

export const criarRegistroDescobertaSchema = z.object({
  tipo: z.enum(TAXONOMIA_REGISTRO_DESCOBERTA_OPCOES),
  conteudo: textoSemHtml('O conteúdo do registro é obrigatório.'),
  area: z.string().trim().max(150, 'Área muito longa.').optional().nullable(),
  processoId: z.string().min(1, 'Processo inválido.').optional().nullable(),
  confianca: z.enum(CONFIANCA_DESCOBERTA_OPCOES).optional().nullable(),
  verificacaoEm: z.string().datetime({ offset: true }).or(z.string().datetime()).optional().nullable(),
})

export type CriarRegistroDescobertaInput = z.infer<typeof criarRegistroDescobertaSchema>

const listaDeElementos = (maxItens = 60) =>
  z.array(z.string().trim().min(1, 'Item vazio.').max(400, 'Item muito longo.')).max(maxItens, 'Muitos itens.').default([])

export const criarProcessoDescobertaSchema = z.object({
  nome: z.string().trim().min(2, 'Nome do processo é obrigatório.').max(160, 'Nome muito longo.'),
  descricao: z.string().trim().max(3000, 'Descrição muito longa.').optional().nullable(),
  inicio: z.string().trim().max(300, 'Gatilho muito longo.').optional().nullable(),
  fim: z.string().trim().max(300, 'Sinal de termo muito longo.').optional().nullable(),
  responsavel: z.string().trim().max(120, 'Responsável muito longo.').optional().nullable(),
  nivelConfianca: z.enum(CONFIANCA_DESCOBERTA_OPCOES).optional(),
  fonte: z.string().trim().max(300, 'Fonte muito longa.').optional().nullable(),
  etapas: listaDeElementos(),
  entradas: listaDeElementos(),
  saidas: listaDeElementos(),
  ferramentas: listaDeElementos(),
  retrabalhos: listaDeElementos(),
  dependencias: listaDeElementos(),
  riscos: listaDeElementos(),
  indicadores: listaDeElementos(),
})

export type CriarProcessoDescobertaInput = z.infer<typeof criarProcessoDescobertaSchema>

export const criarProcessoDesejadoSchema = z.object({
  processoAtualId: z.string().min(1, 'Processo inválido.').optional().nullable(),
  nome: z.string().trim().min(2, 'Nome do desenho é obrigatório.').max(160, 'Nome muito longo.'),
  descricao: z.string().trim().max(3000, 'Descrição muito longa.').optional().nullable(),
  melhoriaPrincipal: z.string().trim().max(3000, 'Texto muito longo.').optional().nullable(),
  etapasDesejadas: listaDeElementos(),
})

export const validarProcessoDesejadoSchema = z.object({})

export const criarDivergenciaSchema = z.object({
  titulo: z.string().trim().min(2, 'Título é obrigatório.').max(160, 'Título muito longo.'),
  descricao: textoSemHtml('Descreva a divergência.'),
  processoId: z.string().min(1, 'Processo inválido.').optional().nullable(),
  participantesId: z.string().min(1, 'Participante inválido.').optional().nullable(),
  questaoValidacao: z.string().trim().max(3000, 'Texto muito longo.').optional().nullable(),
})

export const resolverDivergenciaSchema = z.object({
  questaoValidacao: z.string().trim().min(2, 'Escreva a pergunta de validação.').max(3000, 'Texto muito longo.'),
})

export const criarOportunidadeSchema = z.object({
  descricao: textoSemHtml('Descreva a oportunidade.'),
  categoria: z.string().trim().min(2, 'Categoria é obrigatória.').max(80, 'Categoria muito longa.'),
  processoId: z.string().min(1, 'Processo inválido.').optional().nullable(),
  etapaReferente: z.string().trim().max(300, 'Etapa muito longa.').optional().nullable(),
  impactoEstimado: z.string().trim().max(8000, 'Texto muito longo.').optional().nullable(),
})
