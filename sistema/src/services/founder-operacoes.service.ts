import { prismaSeguro as prisma } from '@/lib/prisma-tenant-safe'
import { NotFoundError, BusinessRuleError, ConflictError } from '@/lib/app-errors'
import { registrarAuditoriaPlataforma } from '@/lib/plataforma'
import type { Usuario } from '@/types'
import { podeTransicionarStatusSolicitacao } from '@/engine/founder-operacoes'

// ─── OPERAÇÕES FOUNDER (P91) — SERVIÇO ────────────────────────────────────────
// Painel administrativo do processo de entrada de Founders: listar solicitações,
// abrir o detalhe, registrar o contato, mudar status com histórico e ativar a
// empresa como Founder. Nível de plataforma (sem tenant, como a solicitação).

export const ACAO_HISTORICO = {
  STATUS_ALTERADO: 'STATUS_ALTERADO',
  OBSERVACAO_ATUALIZADA: 'OBSERVACAO_ATUALIZADA',
  ONBOARDING_DEFINIDO: 'ONBOARDING_DEFINIDO',
  FOUNDER_ATIVADO: 'FOUNDER_ATIVADO',
} as const

type UsuarioOps = Pick<Usuario, 'id' | 'email'>

// ─── LISTAGEM ─────────────────────────────────────────────────────────────────

/**
 * Lista as solicitações não deletadas (mais novas primeiro) e a contagem por
 * status, para as abas do Command Center.
 */
export async function obterSolicitacoesComContagem() {
  const [solicitacoes, agrupado] = await Promise.all([
    prisma.solicitacaoFounder.findMany({
      where: { deletedAt: null },
      orderBy: { criadoEm: 'desc' },
      take: 200,
    }),
    prisma.solicitacaoFounder.groupBy({
      by: ['status'],
      where: { deletedAt: null },
      _count: { _all: true },
    }),
  ])

  const contagem = agrupado.reduce<Record<string, number>>((acc, item) => {
    acc[item.status] = item._count._all
    return acc
  }, {})

  return { solicitacoes, contagem }
}

/** Empresas ativas para o vínculo no momento da ativação como Founder. */
export async function obterEmpresasParaVinculo() {
  return prisma.empresa.findMany({
    where: { ativa: true, deletedAt: null },
    select: {
      id: true,
      nome: true,
      slug: true,
      numeroApoiador: true,
      numeroFundador: true,
      criadaEm: true,
    },
    orderBy: { nome: 'asc' },
  })
}

// ─── DETALHE ──────────────────────────────────────────────────────────────────

export async function obterSolicitacaoDetalhe(id: string) {
  const solicitacao = await prisma.solicitacaoFounder.findUnique({
    where: { id },
  })
  if (!solicitacao || solicitacao.deletedAt) throw new NotFoundError('Solicitação não encontrada')

  const [historico, empresa] = await Promise.all([
    prisma.solicitacaoFounderHistorico.findMany({
      where: { solicitacaoFounderId: id },
      orderBy: { criadoEm: 'desc' },
    }),
    solicitacao.empresaId
      ? prisma.empresa.findUnique({
          where: { id: solicitacao.empresaId },
          select: { id: true, nome: true, slug: true, numeroApoiador: true, numeroFundador: true },
        })
      : Promise.resolve(null),
  ])

  return { solicitacao, historico, empresa }
}

// ─── ATUALIZAÇÃO (PATCH) ─────────────────────────────────────────────────────

export type AtualizarSolicitacaoDados = {
  status?: 'PENDING' | 'CONTACTED' | 'IN_REVIEW' | 'APPROVED' | 'REJECTED'
  observacaoAdmin?: string | null
  onboardingTipo?: string | null
}

/**
 * Atualiza status, observação interna e/ou tipo de onboarding. Cada mudança
 * relevante vira um evento na tabela de histórico, com auditoria de plataforma.
 */
export async function atualizarSolicitacao(
  id: string,
  dados: AtualizarSolicitacaoDados,
  usuario: UsuarioOps,
) {
  const existente = await prisma.solicitacaoFounder.findUnique({ where: { id } })
  if (!existente || existente.deletedAt) throw new NotFoundError('Solicitação não encontrada')

  const data: Record<string, unknown> = {}
  const eventos: { acao: string; statusDe?: string; statusPara?: string; detalhes?: Record<string, unknown> }[] = []

  // STATUS — valida a transição antes de gravar
  if (dados.status && dados.status !== existente.status) {
    if (!podeTransicionarStatusSolicitacao(existente.status, dados.status)) {
      throw new BusinessRuleError(
        `Não é possível ir de "${existente.status}" para "${dados.status}" diretamente.`
      )
    }
    data.status = dados.status
    if (dados.status === 'CONTACTED' && !existente.contatoEm) {
      data.contatoEm = new Date()
    }
    eventos.push({
      acao: ACAO_HISTORICO.STATUS_ALTERADO,
      statusDe: existente.status,
      statusPara: dados.status,
    })
  }

  // OBSERVAÇÃO INTERNA
  if ('observacaoAdmin' in dados) {
    data.observacaoAdmin = dados.observacaoAdmin ?? null
    eventos.push({
      acao: ACAO_HISTORICO.OBSERVACAO_ATUALIZADA,
      detalhes: dados.observacaoAdmin ? { comObservacao: true } : { comObservacao: false },
    })
  }

  // TIPO DE ONBOARDING (decisão do time, sem IA)
  if ('onboardingTipo' in dados) {
    data.onboardingTipo = dados.onboardingTipo ?? null
    if (dados.onboardingTipo) {
      eventos.push({
        acao: ACAO_HISTORICO.ONBOARDING_DEFINIDO,
        detalhes: { onboardingTipo: dados.onboardingTipo },
      })
    }
  }

  if (Object.keys(data).length === 0) {
    throw new BusinessRuleError('Nada a atualizar.')
  }

  const atualizada = await prisma.$transaction(async (tx) => {
    const res = await tx.solicitacaoFounder.update({ where: { id }, data })
    if (eventos.length > 0) {
      await tx.solicitacaoFounderHistorico.createMany({
        data: eventos.map((e) => ({
          solicitacaoFounderId: id,
          acao: e.acao,
          statusDe: e.statusDe ?? null,
          statusPara: e.statusPara ?? null,
          detalhes: (e.detalhes as object) ?? undefined,
          criadoPorUsuarioId: usuario.id,
          criadoPorEmail: usuario.email,
        })),
      })
    }
    return res
  })

  await registrarAuditoriaPlataforma({
    usuario,
    acao: eventos.length > 0 ? `SOLICITACAO_FOUNDER_${eventos[0].acao}` : 'SOLICITACAO_FOUNDER_ATUALIZADA',
    modulo: 'founder-operacoes',
    contexto: 'plataforma',
    detalhes: {
      solicitacaoId: id,
      status: atualizada.status,
      mudancas: eventos.map((e) => e.statusPara ?? e.acao),
    },
  })

  return atualizada
}

// ─── ATIVAÇÃO COMO FOUNDER (POST /ativar) ────────────────────────────────────

export type AtivarFounderDados = {
  empresaId: string
  numeroFundador?: number | null
}

type SolicitacaoAtivada = {
  id: string
  status: 'PENDING' | 'CONTACTED' | 'IN_REVIEW' | 'APPROVED' | 'REJECTED'
}

export type ResultadoAtivacaoFounder = {
  solicitacao: SolicitacaoAtivada | null
  numeroFundador: number | null
}

/**
 * Ativa a empresa como Founder (P91). Requer solicitação APROVADA e uma
 * empresa real. Reutiliza a fonte de verdade existente (`Empresa.numeroFundador`,
 * P57B — mesmo número de apoiador quando aplicável). NÃO inventa privilégios de
 * `platformRole`: FOUNDER/APOIADOR seguem sem permissões até uma decisão futura.
 */
export async function ativarFounder(
  id: string,
  dados: AtivarFounderDados,
  usuario: UsuarioOps,
): Promise<ResultadoAtivacaoFounder> {
  const solicitacao = await prisma.solicitacaoFounder.findUnique({ where: { id } })
  if (!solicitacao || solicitacao.deletedAt) throw new NotFoundError('Solicitação não encontrada')
  if (solicitacao.status !== 'APPROVED') {
    throw new BusinessRuleError('A solicitação precisa estar aprovada antes de ativar a empresa como Founder.')
  }

  const empresa = await prisma.empresa.findUnique({ where: { id: dados.empresaId } })
  if (!empresa || !empresa.ativa || empresa.deletedAt) {
    throw new NotFoundError('Empresa não encontrada')
  }

  // Número de Fundador: reutiliza o já atribuído (P57B) ou usa o informado pelo time.
  let numeroFundador = empresa.numeroFundador
  if (!numeroFundador && dados.numeroFundador) {
    numeroFundador = dados.numeroFundador
  }

  let atualizada: SolicitacaoAtivada | null = null
  try {
    await prisma.$transaction(async (tx) => {
      if (numeroFundador) {
        await tx.empresa.update({
          where: { id: empresa.id },
          data: { numeroFundador },
        })
      }
      await tx.solicitacaoFounder.update({
        where: { id },
        data: { empresaId: empresa.id, fundadorAtivadoEm: new Date() },
      })
      await tx.solicitacaoFounderHistorico.create({
        data: {
          solicitacaoFounderId: id,
          acao: ACAO_HISTORICO.FOUNDER_ATIVADO,
          detalhes: { empresaId: empresa.id, numeroFundador: numeroFundador ?? null },
          criadoPorUsuarioId: usuario.id,
          criadoPorEmail: usuario.email,
        },
      })
      atualizada = await tx.solicitacaoFounder.findUnique({ where: { id } })
    })
  } catch (err) {
    // nº @unique em uso por outra empresa
    if ((err as { code?: string })?.code === 'P2002') {
      throw new ConflictError('Este número de Fundador já está em uso por outra empresa.')
    }
    throw err
  }

  await registrarAuditoriaPlataforma({
    usuario,
    acao: 'FOUNDER_ATIVADO',
    modulo: 'founder-operacoes',
    contexto: 'plataforma',
    empresaId: empresa.id,
    detalhes: {
      solicitacaoId: id,
      numeroFundador: numeroFundador ?? null,
      empresaId: empresa.id,
    },
  })

  return { solicitacao: atualizada, numeroFundador: numeroFundador ?? null }
}