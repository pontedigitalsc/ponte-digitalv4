import { prismaSeguro as prisma } from '@/lib/prisma-tenant-safe'
import type { Sinal } from './tipos'

/**
 * ─── REGISTRO DE SINAIS OPERACIONAIS ───────────────────────────────────────────
 *
 * Os sinais operacionais (clientes/tarefas/financeiro) eram calculados em
 * memória a cada request e descartados — nada persistia, nada acumulava.
 * Este módulo grava esses sinais na tabela existente `HistoricoSinal`
 * (que estava vazia por desenho), de forma idempotente:
 *
 * - um mesmo sinal ativo (mesmo `sinalId` + mesmo `dominio` + mesma `urgencia`)
 *   não é duplicado dentro da janela de tempo;
 * - quando o sinal deixa de existir (ex.: tarefa foi concluída), o registro
 *   anterior é marcado como resolvido via `deletedAt` na mesma operação.
 *
 * O resultado: "o que está acontecendo na empresa" passa a ter histórico e
 * pode alimentar o dashboard, o centro de decisão e o Copiloto Operacional.
 */

const JANELA_IGNORAR_DUPLICATA_MS = 12 * 60 * 60 * 1000 // 12h — sinal ativo não precisa "reavivar" a cada request

export interface SinalHistorico {
  id: string
  sinalId: string
  dominio: string
  urgencia: string
  titulo: string
  descricao: string | null
  criadoEm: Date
  deletedAt: Date | null
}/**
 * Persiste a lista de sinais atuais de uma empresa.
 * - Para cada sinal informado, garante UM registro ativo (idempotente).
 * - Sinais que existiam ativos mas não estão mais na lista são resolvidos.
 * - Retorna os sinais persistidos ordenados por urgência (para leitura imediata).
 */
export async function persistirSinaisOperacionais(
  empresaId: string,
  sinais: Sinal[]
): Promise<SinalHistorico[]> {
  if (sinais.length === 0) return []

  const agora = new Date()
  const janela = new Date(agora.getTime() - JANELA_IGNORAR_DUPLICATA_MS)

  const existentes = await prisma.historicoSinal.findMany({
    where: {
      empresaId,
      deletedAt: null,
      sinalId: { in: sinais.map((s) => s.id) },
    },
    select: { id: true, sinalId: true, urgencia: true, criadoEm: true },
  })

  const chaveDeAtivo = new Map(
    existentes.map((e) => [`${e.sinalId}:${e.urgencia}`, { id: e.id, criadoEm: e.criadoEm }])
  )

  for (const sinal of sinais) {
    const chave = `${sinal.id}:${sinal.urgencia}`
    const ativo = chaveDeAtivo.get(chave)

    if (ativo && ativo.criadoEm >= janela) {
      // Já existe um registro ativo e recente — não duplica.
      continue
    }

    if (ativo) {
      // Existe ativo, mas antigo — reativa tocando o registro (novo criadoEm).
      await prisma.historicoSinal.updateMany({
        where: { id: ativo.id, empresaId, deletedAt: null },
        data: { criadoEm: agora, titulo: sinal.titulo, descricao: sinal.descricao },
      })
      chaveDeAtivo.set(chave, { id: ativo.id, criadoEm: agora })
      continue
    }

    const criado = await prisma.historicoSinal.create({
      data: {
        empresaId,
        motorOrigem: 'sinais-operacionais',
        sinalId: sinal.id,
        dominio: sinal.dominio,
        urgencia: sinal.urgencia,
        titulo: sinal.titulo,
        descricao: sinal.descricao,
        dadosOriginais: sinal.fatosBrutos ?? undefined,
        metadata: {
          origemDados: sinal.origemDados,
          acaoSugerida: sinal.acaoSugerida,
        },
      },
      select: { id: true, sinalId: true, dominio: true, urgencia: true, titulo: true, descricao: true, criadoEm: true, deletedAt: true },
    })
    chaveDeAtivo.set(chave, { id: criado.id, criadoEm: agora })
  }

  // Resolve sinais que existiam ativos mas sumiram da lista atual
  const idsAtivosInformados = new Set(chaveDeAtivo.values().map((v) => v.id))
  const ativosQueSairam = existentes.filter((e) => !idsAtivosInformados.has(e.id))
  if (ativosQueSairam.length > 0) {
    await prisma.historicoSinal.updateMany({
      where: { id: { in: ativosQueSairam.map((e) => e.id) }, empresaId, deletedAt: null },
      data: { deletedAt: agora },
    })
  }

  return listarSinaisRecentes(empresaId)
}

/**
 * Lista os sinais operacionais ativos (não resolvidos) da empresa,
 * ordenados por urgência — para o dashboard/centro-decisão consumirem.
 */
export async function listarSinaisRecentes(
  empresaId: string,
  limite = 6
): Promise<SinalHistorico[]> {
  const registros = await prisma.historicoSinal.findMany({
    where: { empresaId, deletedAt: null },
    orderBy: { criadoEm: 'desc' },
    take: 50,
    select: {
      id: true,
      sinalId: true,
      dominio: true,
      urgencia: true,
      titulo: true,
      descricao: true,
      criadoEm: true,
      deletedAt: true,
    },
  })

  const peso: Record<string, number> = { alta: 3, media: 2, baixa: 1 }
  return registros
    .sort((a, b) => (peso[b.urgencia] ?? 0) - (peso[a.urgencia] ?? 0))
    .slice(0, limite) as SinalHistorico[]
}
