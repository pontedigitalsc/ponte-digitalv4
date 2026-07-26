import { prismaSeguro as prisma } from '@/lib/prisma-tenant-safe'
import type { ImplantacaoInput } from '@/lib/validations'
import { NotFoundError } from '@/lib/app-errors'

// ─── LISTAR IMPLANTAÇÕES ──────────────────────────────────────────────────────

export async function listarImplantacoes(empresaId: string, status?: string, limite = 50) {
  return prisma.implantacao.findMany({
    where: {
      empresaId,
      deletedAt: null,
      ...(status && status !== 'TODAS' && { status: status as never }),
    },
    orderBy: [{ status: 'asc' }, { criadaEm: 'desc' }],
    take: limite,
    include: {
      cliente: { select: { id: true, nome: true, segmento: true } },
      etapas:  { orderBy: { ordem: 'asc' } },
      _count:  { select: { etapas: true } },
    },
  })
}

// ─── BUSCAR IMPLANTAÇÃO POR ID ────────────────────────────────────────────────

export async function buscarImplantacaoPorId(id: string, empresaId: string) {
  return prisma.implantacao.findFirst({
    where: { id, empresaId, deletedAt: null },
    include: {
      cliente:   { select: { id: true, nome: true, segmento: true, telefone: true } },
      etapas:    { orderBy: { ordem: 'asc' } },
      historicos: {
        orderBy: { criadoEm: 'desc' },
        take: 10,
        include: { usuario: { select: { id: true, nome: true, avatar: true } } },
      },
    },
  })
}

// ─── CRIAR IMPLANTAÇÃO ────────────────────────────────────────────────────────

export async function criarImplantacao(
  empresaId: string,
  usuarioId: string,
  dados: ImplantacaoInput,
  etapasPadrao: string[]
) {
  return prisma.implantacao.create({
    data: {
      empresaId,
      ...dados,
      dataInicio:   dados.dataInicio   ?? null,
      dataPrevisao: dados.dataPrevisao ?? null,
      etapas: {
        create: etapasPadrao.map((titulo, i) => ({ empresaId, titulo, ordem: i + 1 })),
      },
    },
    include: {
      cliente: { select: { id: true, nome: true } },
      etapas:  { orderBy: { ordem: 'asc' } },
    },
  })
}

// ─── ATUALIZAR IMPLANTAÇÃO ────────────────────────────────────────────────────

export async function atualizarImplantacao(
  id: string,
  empresaId: string,
  dados: Partial<ImplantacaoInput & { dataConclusao?: Date | null }>
) {
  const existe = await prisma.implantacao.findFirst({ where: { id, empresaId, deletedAt: null } })
  if (!existe) throw new NotFoundError('Implantação não encontrada')

  return prisma.implantacao.update({
    where: { id },
    data: dados,
    include: {
      cliente: { select: { id: true, nome: true } },
      etapas:  { orderBy: { ordem: 'asc' } },
    },
  })
}

// ─── TOGGLE ETAPA (concluída / pendente) ─────────────────────────────────────

export async function toggleEtapa(etapaId: string, empresaId: string) {
  const etapa = await prisma.etapaImplantacao.findFirst({
    where: { id: etapaId, implantacao: { empresaId, deletedAt: null } },
  })
  if (!etapa) throw new NotFoundError('Etapa não encontrada')

  const novaConcluida = !etapa.concluida

  const etapaAtualizada = await prisma.etapaImplantacao.update({
    where: { id: etapaId },
    data: {
      concluida:   novaConcluida,
      concluidaEm: novaConcluida ? new Date() : null,
    },
  })

  // Verifica se todas as etapas foram concluídas → marca implantação como concluída
  const implantacao = await prisma.implantacao.findFirst({
    where: { id: etapa.implantacaoId, empresaId },
    include: { etapas: true },
  })

  if (implantacao && novaConcluida) {
    const todasConcluidas = implantacao.etapas.every(
      (e) => e.id === etapaId ? true : e.concluida
    )
    if (todasConcluidas && implantacao.status !== 'CONCLUIDA') {
      await prisma.implantacao.update({
        where: { id: etapa.implantacaoId },
        data: { status: 'CONCLUIDA', dataConclusao: new Date() },
      })
    }
  }

  return etapaAtualizada
}

// ─── EXCLUIR IMPLANTAÇÃO (soft delete) ────────────────────────────────────────
// As etapas (EtapaImplantacao) permanecem no banco vinculadas à implantação
// — não são apagadas nem precisam de tratamento especial, porque toda leitura
// de implantação já filtra deletedAt: null no pai, e toggleEtapa já bloqueia
// mutação em etapas de implantações soft-deletadas.

export async function excluirImplantacao(id: string, empresaId: string) {
  const existe = await prisma.implantacao.findFirst({ where: { id, empresaId, deletedAt: null } })
  if (!existe) throw new NotFoundError('Implantação não encontrada')

  await prisma.implantacao.update({
    where: { id },
    data: { deletedAt: new Date() },
  })
  return true
}

// ─── LIXEIRA: LISTAR EXCLUÍDAS ────────────────────────────────────────────────

export async function listarImplantacoesExcluidas(empresaId: string) {
  const trintaDiasAtras = new Date()
  trintaDiasAtras.setDate(trintaDiasAtras.getDate() - 30)

  return prisma.implantacao.findMany({
    where: { empresaId, deletedAt: { not: null, gte: trintaDiasAtras } },
    orderBy: { deletedAt: 'desc' },
    select: {
      id: true, titulo: true, status: true, deletedAt: true,
      cliente: { select: { nome: true } },
    },
  })
}

// ─── LIXEIRA: RESTAURAR ───────────────────────────────────────────────────────

export async function restaurarImplantacao(id: string, empresaId: string) {
  const existe = await prisma.implantacao.findFirst({ where: { id, empresaId, deletedAt: { not: null } } })
  if (!existe) throw new NotFoundError('Implantação excluída não encontrada')

  return prisma.implantacao.update({
    where: { id },
    data: { deletedAt: null },
  })
}
