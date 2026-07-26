// ─── ENUMS ────────────────────────────────────────────────────────────────────

export type Plano = 'BASICO' | 'PROFISSIONAL' | 'ENTERPRISE'
export type Role = 'ADMIN' | 'GESTOR' | 'MEMBRO'
export type OrigemLead = 'INDICACAO' | 'SITE' | 'INSTAGRAM' | 'FACEBOOK' | 'GOOGLE' | 'WHATSAPP' | 'COLD_OUTREACH' | 'EVENTO' | 'OUTRO'
export type EstagioLead = 'CONTATO' | 'DIAGNOSTICO' | 'PROPOSTA' | 'NEGOCIACAO' | 'FECHADO_GANHO' | 'FECHADO_PERDIDO'
export type Temperatura = 'QUENTE' | 'MORNO' | 'FRIO'
export type StatusCliente = 'ATIVO' | 'INATIVO' | 'INADIMPLENTE' | 'CANCELADO' | 'TRIAL'
export type StatusImplantacao = 'PENDENTE' | 'EM_ANDAMENTO' | 'AGUARDANDO_CLIENTE' | 'CONCLUIDA' | 'CANCELADA'
export type StatusTarefa = 'PENDENTE' | 'EM_ANDAMENTO' | 'CONCLUIDA' | 'CANCELADA'
export type Prioridade = 'URGENTE' | 'ALTA' | 'MEDIA' | 'BAIXA'
export type TipoTarefa = 'TAREFA' | 'LIGACAO' | 'EMAIL' | 'REUNIAO' | 'FOLLOW_UP' | 'VISITA'
export type TipoHistorico = 'NOTA' | 'LIGACAO' | 'EMAIL' | 'REUNIAO' | 'WHATSAPP' | 'PROPOSTA' | 'CONTRATO' | 'SISTEMA'
export type TipoTransacao = 'RECEITA' | 'DESPESA'
export type StatusTransacao = 'PENDENTE' | 'PAGO' | 'VENCIDO' | 'CANCELADO'

// ─── MODELOS ──────────────────────────────────────────────────────────────────

export interface Empresa {
  id: string
  nome: string
  slug: string
  logo?: string | null
  plano: Plano
  ativa: boolean
  criadaEm: Date
  atualizadaEm: Date
}

export interface Usuario {
  id: string
  empresaId: string
  supabaseId: string
  nome: string
  email: string
  avatar?: string | null
  cargo?: string | null
  role: Role
  ativo: boolean
  criadoEm: Date
  atualizadoEm: Date
}

export interface Lead {
  id: string
  empresaId: string
  responsavelId?: string | null
  nome: string
  email?: string | null
  telefone?: string | null
  empresa?: string | null
  cargo?: string | null
  origem: OrigemLead
  estagio: EstagioLead
  temperatura: Temperatura
  valor?: number | null
  observacoes?: string | null
  perdidoMotivo?: string | null
  criadoEm: Date
  atualizadoEm: Date
  contatoEm?: Date | null
  responsavel?: Pick<Usuario, 'id' | 'nome' | 'avatar'> | null
  _count?: { tarefas: number; historicos: number }
}

export interface Cliente {
  id: string
  empresaId: string
  leadId?: string | null
  nome: string
  email?: string | null
  telefone?: string | null
  documento?: string | null
  segmento?: string | null
  site?: string | null
  endereco?: string | null
  cidade?: string | null
  estado?: string | null
  status: StatusCliente
  observacoes?: string | null
  valorMensal?: number | null
  diaVencimento?: number | null
  criadoEm: Date
  atualizadoEm: Date
  proximoContato?: Date | null
  _count?: { tarefas: number; historicos: number; implantacoes: number }
}

export interface Tarefa {
  id: string
  empresaId: string
  criadorId: string
  responsavelId?: string | null
  clienteId?: string | null
  leadId?: string | null
  titulo: string
  descricao?: string | null
  status: StatusTarefa
  prioridade: Prioridade
  tipo: TipoTarefa
  dataVencimento?: Date | null
  concluidaEm?: Date | null
  criadaEm: Date
  atualizadaEm: Date
  responsavel?: Pick<Usuario, 'id' | 'nome' | 'avatar'> | null
  cliente?: Pick<Cliente, 'id' | 'nome'> | null
  lead?: Pick<Lead, 'id' | 'nome'> | null
}

export interface Implantacao {
  id: string
  empresaId: string
  clienteId: string
  titulo: string
  descricao?: string | null
  status: StatusImplantacao
  dataInicio?: Date | null
  dataPrevisao?: Date | null
  dataConclusao?: Date | null
  criadaEm: Date
  atualizadaEm: Date
  cliente?: Pick<Cliente, 'id' | 'nome'> | null
  etapas?: EtapaImplantacao[]
  _count?: { etapas: number }
}

export interface EtapaImplantacao {
  id: string
  implantacaoId: string
  titulo: string
  descricao?: string | null
  concluida: boolean
  ordem: number
  concluidaEm?: Date | null
  criadaEm: Date
}

export interface Historico {
  id: string
  empresaId?: string | null
  usuarioId?: string | null
  clienteId?: string | null
  leadId?: string | null
  implantacaoId?: string | null
  tipo: TipoHistorico
  titulo: string
  descricao?: string | null
  metadata?: Record<string, unknown> | null
  criadoEm: Date
  usuario?: Pick<Usuario, 'id' | 'nome' | 'avatar'> | null
  cliente?: Pick<Cliente, 'id' | 'nome'> | null
}

export interface Transacao {
  id: string
  empresaId: string
  clienteId?: string | null
  tipo: TipoTransacao
  categoria?: string | null
  descricao: string
  valor: number
  status: StatusTransacao
  dataVencimento?: Date | null
  dataPagamento?: Date | null
  recorrente: boolean
  observacoes?: string | null
  criadaEm: Date
  atualizadaEm: Date
  cliente?: Pick<Cliente, 'id' | 'nome'> | null
}

// ─── DASHBOARD ────────────────────────────────────────────────────────────────

export interface DashboardStats {
  tarefasHoje: number
  tarefasAtrasadas: number
  clientesAtivos: number
  leadsAtivos: number
  receitaMes: number
  receitaPendente: number
  implantacoesEmAndamento: number
  clientesSemContato: number
}

// ─── API RESPONSE ─────────────────────────────────────────────────────────────

export interface ApiResponse<T> {
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

// ─── FILTROS ──────────────────────────────────────────────────────────────────

export interface FiltroLead {
  estagio?: EstagioLead
  responsavelId?: string
  temperatura?: Temperatura
  busca?: string
  page?: number
  pageSize?: number
}

export interface FiltroCliente {
  status?: StatusCliente
  busca?: string
  segmento?: string
  page?: number
  pageSize?: number
}

export interface FiltroTarefa {
  status?: StatusTarefa
  prioridade?: Prioridade
  responsavelId?: string
  clienteId?: string
  tipo?: TipoTarefa
  page?: number
  pageSize?: number
}
