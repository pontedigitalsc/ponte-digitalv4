import { prismaSeguro as prisma } from '@/lib/prisma-tenant-safe'
import { NotFoundError, BusinessRuleError } from '@/lib/app-errors'
import { registrarAuditoriaPlataforma } from '@/lib/plataforma'
import type { Usuario } from '@/types'
import {
  podeTransicionarStatusDiagnostico,
  TEMPLATE_SERRALHERIA,
  montarRelatorioDescoberta,
  type StatusDiagnosticoDescobertaOp,
  type TipoRegistroDescobertaOp,
  type PapelParticipanteDescobertaOp,
} from '@/engine/descoberta-operacional'

// ─── PONTE DESCOBERTA (P92) — SERVIÇO ─────────────────────────────────────────
// Trabalho interno de descoberta operacional no campo real, nível PLATAFORMA
// (sem tenant — acesso restrito a FOUNDER). Cada escrita gera evento no
// histórico do diagnóstico + auditoria de plataforma. Não inventa dados: todo
// registro é classificado pela taxonomia e cada ação respeita a transição de
// estado definida no engine.

export const ACAO_HISTORICO_DESCOBERTA = {
  STATUS_ALTERADO: 'STATUS_ALTERADO',
  RESPOSTA_ANCORA: 'RESPOSTA_ANCORA',
  PARTICIPANTE_ADICIONADO: 'PARTICIPANTE_ADICIONADO',
  RESPOSTA_REGISTRADA: 'RESPOSTA_REGISTRADA',
  REGISTRO_CRIADO: 'REGISTRO_CRIADO',
  PROCESSO_CRIADO: 'PROCESSO_CRIADO',
  PROCESSO_DESEJADO_CRIADO: 'PROCESSO_DESEJADO_CRIADO',
  PROCESSO_DESEJADO_VALIDADO: 'PROCESSO_DESEJADO_VALIDADO',
  DIVERGENCIA_CRIADA: 'DIVERGENCIA_CRIADA',
  DIVERGENCIA_RESOLVIDA: 'DIVERGENCIA_RESOLVIDA',
  OPORTUNIDADE_CRIADA: 'OPORTUNIDADE_CRIADA',
} as const

type UsuarioOps = Pick<Usuario, 'id' | 'email'>

// ─── CRIAÇÃO ──────────────────────────────────────────────────────────────────

export type CriarDiagnosticoDados = {
  nomeEmpresa: string
  categoriaNome: string
  categoriaSlug: string
  empresaId?: string | null
  unidadeOperacional?: string | null
  usarTemplateSerralheria?: boolean
}

/**
 * Cria um diagnóstico de descoberta. A categoria é o recorte da vertical
 * (ADR-035): se a categoria informada ainda não existe, ela nasce agora e — no
 * caso do template da serralheria — recebe as áreas e perguntas do template
 * (configuração gravada como dados, nunca código). A primeira empresa real de
 * uma categoria vira a PIONEIRA (determinístico: a primeira diagnosticada).
 */
export async function criarDiagnosticoDescoberta(
  dados: CriarDiagnosticoDados,
  usuario: UsuarioOps,
) {
  return prisma.$transaction(async (tx) => {
    let categoria = await tx.categoriaOperacional.findUnique({
      where: { slug: dados.categoriaSlug },
    })

    if (!categoria) {
      const usarTemplate = dados.usarTemplateSerralheria ?? dados.categoriaSlug === TEMPLATE_SERRALHERIA.slug
      const areasTemplate = usarTemplate ? (TEMPLATE_SERRALHERIA.areas as unknown as object[]) : undefined

      categoria = await tx.categoriaOperacional.create({
        data: {
          nome: dados.categoriaNome,
          slug: dados.categoriaSlug,
          descricao: usarTemplate ? TEMPLATE_SERRALHERIA.descricao : null,
          areasTemplate: areasTemplate as never,
          empresaPioneiraId: dados.empresaId ?? null,
        },
      })

      // Seed das perguntas do template (configuração de vertical, ADR-035).
      if (usarTemplate) {
        await tx.perguntaDescoberta.createMany({
          data: TEMPLATE_SERRALHERIA.areas.flatMap((area) =>
            area.perguntas.map((p, i) => ({
              categoriaOperacionalId: categoria!.id,
              area: area.area,
              texto: p.texto,
              objetivo: p.objetivo,
              ordem: i,
            })),
          ),
        })
      }
    }

    const diagnostico = await tx.diagnosticoOperacional.create({
      data: {
        nomeEmpresa: dados.nomeEmpresa,
        categoriaOperacionalId: categoria.id,
        empresaId: dados.empresaId ?? null,
        unidadeOperacional: dados.unidadeOperacional ?? null,
        iniciadoEm: new Date(),
        criadoPorUsuarioId: usuario.id,
        criadoPorEmail: usuario.email,
      },
    })

    await tx.diagnosticoOperacionalHistorico.create({
      data: {
        diagnosticoId: diagnostico.id,
        acao: 'DIAGNOSTICO_CRIADO',
        detalhes: { categoria: categoria.nome, usarTemplateSerralheria: Boolean(dados.usarTemplateSerralheria) },
        criadoPorUsuarioId: usuario.id,
        criadoPorEmail: usuario.email,
      },
    })

    return diagnostico
  })
}

// ─── LISTAGEM ─────────────────────────────────────────────────────────────────

export async function obterDiagnosticosComContagem() {
  const [diagnosticos, agrupado] = await Promise.all([
    prisma.diagnosticoOperacional.findMany({
      where: { deletedAt: null },
      include: { categoria: { select: { nome: true, slug: true } } },
      orderBy: { criadaEm: 'desc' },
      take: 200,
    }),
    prisma.diagnosticoOperacional.groupBy({
      by: ['status'],
      where: { deletedAt: null },
      _count: { _all: true },
    }),
  ])

  const contagem = agrupado.reduce<Record<string, number>>((acc, item) => {
    acc[item.status] = item._count._all
    return acc
  }, {})

  return { diagnosticos, contagem }
}

/** Categorias existentes (todas, mesmo sem diagnóstico) para o formulário. */
export async function obterCategoriasOperacionais() {
  return prisma.categoriaOperacional.findMany({
    where: { deletedAt: null },
    orderBy: { criadaEm: 'asc' },
  })
}

/** Empresas reais ativas para vincular a um diagnóstico. */
export async function obterEmpresasParaDescoberta() {
  return prisma.empresa.findMany({
    where: { ativa: true, deletedAt: null },
    select: { id: true, nome: true, slug: true },
    orderBy: { nome: 'asc' },
    take: 300,
  })
}

// ─── DETALHE (agregado) ───────────────────────────────────────────────────────

/**
 * Devolve o diagnóstico completo: categoria, participantes, respostas,
 * registros, processos, desenhos desejados, divergências, oportunidades e o
 * histórico de eventos. Tudo que a tela de detalhe precisa, em uma leitura.
 */
export async function obterDiagnosticoDescobertaDetalhe(id: string) {
  const diagnostico = await prisma.diagnosticoOperacional.findUnique({
    where: { id },
  })
  if (!diagnostico || diagnostico.deletedAt) throw new NotFoundError('Diagnóstico não encontrado')

  const [categoria, participantes, respostas, registros, processos, processosDesejados, divergencias, oportunidades, historico] =
    await Promise.all([
      prisma.categoriaOperacional.findUnique({
        where: { id: diagnostico.categoriaOperacionalId },
      }),
      prisma.participanteDescoberta.findMany({
        where: { diagnosticoId: id, deletedAt: null },
        orderBy: { criadaEm: 'asc' },
      }),
      prisma.respostaDescoberta.findMany({
        where: { diagnosticoId: id, deletedAt: null },
        include: { participante: { select: { id: true, nome: true, papel: true } }, pergunta: { select: { texto: true, area: true } } },
        orderBy: { criadaEm: 'desc' },
      }),
      prisma.registroDescoberta.findMany({
        where: { diagnosticoId: id, deletedAt: null },
        orderBy: { criadaEm: 'asc' },
      }),
      prisma.processoDescoberta.findMany({
        where: { diagnosticoId: id, deletedAt: null },
        orderBy: { criadaEm: 'asc' },
      }),
      prisma.processoDesejadoDescoberta.findMany({
        where: { diagnosticoId: id, deletedAt: null },
        include: { processoAtual: { select: { id: true, nome: true } } },
        orderBy: { criadaEm: 'asc' },
      }),
      prisma.divergenciaDescoberta.findMany({
        where: { diagnosticoId: id, deletedAt: null },
        include: { participanteOrigem: { select: { id: true, nome: true } } },
        orderBy: { criadaEm: 'asc' },
      }),
      prisma.oportunidadeDescoberta.findMany({
        where: { diagnosticoId: id, deletedAt: null },
        orderBy: { criadaEm: 'asc' },
      }),
      prisma.diagnosticoOperacionalHistorico.findMany({
        where: { diagnosticoId: id },
        orderBy: { criadoEm: 'desc' },
      }),
    ])

  // Pioneira determinística: a primeira empresa diagnosticada da categoria
  // (quem abriu a categoria no banco). Nunca uma suposição — dado registrado.
  const primeiraDiagnostico = categoria
    ? await prisma.diagnosticoOperacional.findFirst({
        where: { categoriaOperacionalId: categoria.id, deletedAt: null },
        orderBy: { criadaEm: 'asc' },
        select: { nomeEmpresa: true },
      })
    : null

  return {
    diagnostico,
    categoria,
    participantes,
    respostas,
    registros,
    processos,
    processosDesejados,
    divergencias,
    oportunidades,
    historico,
    pioneiraNome: primeiraDiagnostico?.nomeEmpresa ?? null,
  }
}

// ─── ESTADO ───────────────────────────────────────────────────────────────────

export async function atualizarStatusDiagnosticoDescoberta(
  id: string,
  para: StatusDiagnosticoDescobertaOp,
  usuario: UsuarioOps,
) {
  return prisma.$transaction(async (tx) => {
    const atual = await tx.diagnosticoOperacional.findUnique({ where: { id } })
    if (!atual || atual.deletedAt) throw new NotFoundError('Diagnóstico não encontrado')

    if (!podeTransicionarStatusDiagnostico(atual.status, para)) {
      throw new BusinessRuleError(
        `Não é possível ir de "${atual.status}" para "${para}" diretamente.`
      )
    }

    const data: Record<string, unknown> = { status: para }
    if (para === 'EM_DESCOBERTA' && !atual.iniciadoEm) data.iniciadoEm = new Date()
    if (para === 'EM_APRENDIZADO' && !atual.concluidoEm) data.concluidoEm = new Date()

    const atualizado = await tx.diagnosticoOperacional.update({ where: { id }, data })

    await tx.diagnosticoOperacionalHistorico.create({
      data: {
        diagnosticoId: id,
        acao: ACAO_HISTORICO_DESCOBERTA.STATUS_ALTERADO,
        statusDe: atual.status,
        statusPara: para,
        criadoPorUsuarioId: usuario.id,
        criadoPorEmail: usuario.email,
      },
    })

    return atualizado
  })
}

// ─── PERGUNTA-ÂNCORA (obrigatória no MVP) ──────────────────────────────────────

export async function registrarRespostaAncoraDiagnostico(
  id: string,
  resposta: string,
  resultadoDeclarado: string | null,
  usuario: UsuarioOps,
) {
  return prisma.$transaction(async (tx) => {
    const atual = await tx.diagnosticoOperacional.findUnique({ where: { id } })
    if (!atual || atual.deletedAt) throw new NotFoundError('Diagnóstico não encontrado')

    const atualizado = await tx.diagnosticoOperacional.update({
      where: { id },
      data: { respostaAncora: resposta.trim(), resultadoDeclarado: resultadoDeclarado?.trim() ?? null },
    })

    await tx.diagnosticoOperacionalHistorico.create({
      data: {
        diagnosticoId: id,
        acao: ACAO_HISTORICO_DESCOBERTA.RESPOSTA_ANCORA,
        detalhes: { resposta },
        criadoPorUsuarioId: usuario.id,
        criadoPorEmail: usuario.email,
      },
    })

    await registrarAuditoriaPlataforma({
      usuario,
      acao: 'DESCOBERTA_RESPOSTA_ANCORA',
      modulo: 'descoberta-operacional',
      contexto: 'plataforma',
      detalhes: { diagnosticoId: id },
    })

    return atualizado
  })
}

// ─── PARTICIPANTES ────────────────────────────────────────────────────────────

export async function adicionarParticipanteDescoberta(
  diagnosticoId: string,
  dados: { nome: string; papel: PapelParticipanteDescobertaOp; cargo?: string | null },
  usuario: UsuarioOps,
) {
  return prisma.$transaction(async (tx) => {
    const diagnostico = await tx.diagnosticoOperacional.findUnique({ where: { id: diagnosticoId } })
    if (!diagnostico || diagnostico.deletedAt) throw new NotFoundError('Diagnóstico não encontrado')

    const participante = await tx.participanteDescoberta.create({
      data: {
        diagnosticoId,
        nome: dados.nome.trim(),
        papel: dados.papel,
        cargo: dados.cargo?.trim() ?? null,
        criadoPorUsuarioId: usuario.id,
        criadoPorEmail: usuario.email,
      },
    })

    await tx.diagnosticoOperacionalHistorico.create({
      data: {
        diagnosticoId,
        acao: ACAO_HISTORICO_DESCOBERTA.PARTICIPANTE_ADICIONADO,
        detalhes: { participanteId: participante.id, nome: participante.nome },
        criadoPorUsuarioId: usuario.id,
        criadoPorEmail: usuario.email,
      },
    })

    return participante
  })
}

// ─── RESPOSTAS ────────────────────────────────────────────────────────────────

export async function registrarRespostaDescoberta(
  diagnosticoId: string,
  dados: { participanteId?: string | null; resposta: string },
  usuario: UsuarioOps,
) {
  return prisma.$transaction(async (tx) => {
    const diagnostico = await tx.diagnosticoOperacional.findUnique({ where: { id: diagnosticoId } })
    if (!diagnostico || diagnostico.deletedAt) throw new NotFoundError('Diagnóstico não encontrado')

    const resposta = await tx.respostaDescoberta.create({
      data: {
        diagnosticoId,
        participanteId: dados.participanteId ?? null,
        resposta: dados.resposta.trim(),
        criadoPorUsuarioId: usuario.id,
        criadoPorEmail: usuario.email,
      },
    })

    await tx.diagnosticoOperacionalHistorico.create({
      data: {
        diagnosticoId,
        acao: ACAO_HISTORICO_DESCOBERTA.RESPOSTA_REGISTRADA,
        detalhes: { respostaId: resposta.id },
        criadoPorUsuarioId: usuario.id,
        criadoPorEmail: usuario.email,
      },
    })

    return resposta
  })
}

// ─── REGISTROS (taxonomia §2) ─────────────────────────────────────────────────

export async function criarRegistroDescoberta(
  diagnosticoId: string,
  dados: {
    tipo: TipoRegistroDescobertaOp
    conteudo: string
    area?: string | null
    processoId?: string | null
    confianca?: 'ALTA' | 'MEDIA' | 'BAIXA' | null
    verificacaoEm?: Date | string | null
  },
  usuario: UsuarioOps,
) {
  return prisma.$transaction(async (tx) => {
    const diagnostico = await tx.diagnosticoOperacional.findUnique({ where: { id: diagnosticoId } })
    if (!diagnostico || diagnostico.deletedAt) throw new NotFoundError('Diagnóstico não encontrado')

    const registro = await tx.registroDescoberta.create({
      data: {
        diagnosticoId,
        tipo: dados.tipo,
        conteudo: dados.conteudo.trim(),
        area: dados.area?.trim() ?? null,
        processoId: dados.processoId ?? null,
        confianca: dados.confianca ?? null,
        verificacaoEm: dados.verificacaoEm ? new Date(dados.verificacaoEm) : null,
        criadoPorUsuarioId: usuario.id,
        criadoPorEmail: usuario.email,
      },
    })

    await tx.diagnosticoOperacionalHistorico.create({
      data: {
        diagnosticoId,
        acao: ACAO_HISTORICO_DESCOBERTA.REGISTRO_CRIADO,
        detalhes: { registroId: registro.id, tipo: registro.tipo },
        criadoPorUsuarioId: usuario.id,
        criadoPorEmail: usuario.email,
      },
    })

    return registro
  })
}

// ─── PROCESSOS (COMO É) ────────────────────────────────────────────────────────

export type ProcessoDescobertaDados = {
  nome: string
  descricao?: string | null
  inicio?: string | null
  fim?: string | null
  responsavel?: string | null
  nivelConfianca?: 'ALTA' | 'MEDIA' | 'BAIXA'
  fonte?: string | null
  etapas?: unknown[]
  entradas?: unknown[]
  saidas?: unknown[]
  ferramentas?: unknown[]
  retrabalhos?: unknown[]
  dependencias?: unknown[]
  riscos?: unknown[]
  indicadores?: unknown[]
}

export async function criarProcessoDescoberta(
  diagnosticoId: string,
  dados: ProcessoDescobertaDados,
  usuario: UsuarioOps,
) {
  return prisma.$transaction(async (tx) => {
    const diagnostico = await tx.diagnosticoOperacional.findUnique({ where: { id: diagnosticoId } })
    if (!diagnostico || diagnostico.deletedAt) throw new NotFoundError('Diagnóstico não encontrado')

    const processo = await tx.processoDescoberta.create({
      data: {
        diagnosticoId,
        nome: dados.nome.trim(),
        descricao: dados.descricao?.trim() ?? null,
        inicio: dados.inicio?.trim() ?? null,
        fim: dados.fim?.trim() ?? null,
        responsavel: dados.responsavel?.trim() ?? null,
        nivelConfianca: dados.nivelConfianca ?? 'MEDIA',
        fonte: dados.fonte?.trim() ?? null,
        etapas: (dados.etapas ?? []) as never,
        entradas: (dados.entradas ?? []) as never,
        saidas: (dados.saidas ?? []) as never,
        ferramentas: (dados.ferramentas ?? []) as never,
        retrabalhos: (dados.retrabalhos ?? []) as never,
        dependencias: (dados.dependencias ?? []) as never,
        riscos: (dados.riscos ?? []) as never,
        indicadores: (dados.indicadores ?? []) as never,
        criadoPorUsuarioId: usuario.id,
        criadoPorEmail: usuario.email,
      },
    })

    await tx.diagnosticoOperacionalHistorico.create({
      data: {
        diagnosticoId,
        acao: ACAO_HISTORICO_DESCOBERTA.PROCESSO_CRIADO,
        detalhes: { processoId: processo.id, nome: processo.nome },
        criadoPorUsuarioId: usuario.id,
        criadoPorEmail: usuario.email,
      },
    })

    return processo
  })
}

// ─── COMO PODERIA SER ─────────────────────────────────────────────────────────

export async function criarProcessoDesejadoDescoberta(
  diagnosticoId: string,
  dados: {
    processoAtualId?: string | null
    nome: string
    descricao?: string | null
    melhoriaPrincipal?: string | null
    etapasDesejadas?: unknown[]
  },
  usuario: UsuarioOps,
) {
  return prisma.$transaction(async (tx) => {
    const diagnostico = await tx.diagnosticoOperacional.findUnique({ where: { id: diagnosticoId } })
    if (!diagnostico || diagnostico.deletedAt) throw new NotFoundError('Diagnóstico não encontrado')

    const desejado = await tx.processoDesejadoDescoberta.create({
      data: {
        diagnosticoId,
        processoAtualId: dados.processoAtualId ?? null,
        nome: dados.nome.trim(),
        descricao: dados.descricao?.trim() ?? null,
        melhoriaPrincipal: dados.melhoriaPrincipal?.trim() ?? null,
        etapasDesejadas: (dados.etapasDesejadas ?? []) as never,
        criadoPorUsuarioId: usuario.id,
        criadoPorEmail: usuario.email,
      },
    })

    await tx.diagnosticoOperacionalHistorico.create({
      data: {
        diagnosticoId,
        acao: ACAO_HISTORICO_DESCOBERTA.PROCESSO_DESEJADO_CRIADO,
        detalhes: { desejadoId: desejado.id, nome: desejado.nome },
        criadoPorUsuarioId: usuario.id,
        criadoPorEmail: usuario.email,
      },
    })

    return desejado
  })
}

export async function validarProcessoDesejadoDescoberta(
  processoDesejadoId: string,
  usuario: UsuarioOps,
) {
  return prisma.$transaction(async (tx) => {
    const desejado = await tx.processoDesejadoDescoberta.findUnique({ where: { id: processoDesejadoId } })
    if (!desejado || desejado.deletedAt) throw new NotFoundError('Processo desejado não encontrado')

    const atualizado = await tx.processoDesejadoDescoberta.update({
      where: { id: processoDesejadoId },
      data: { status: 'VALIDADO', validadoEm: new Date() },
    })

    await tx.diagnosticoOperacionalHistorico.create({
      data: {
        diagnosticoId: desejado.diagnosticoId,
        acao: ACAO_HISTORICO_DESCOBERTA.PROCESSO_DESEJADO_VALIDADO,
        detalhes: { desejadoId: desejado.id },
        criadoPorUsuarioId: usuario.id,
        criadoPorEmail: usuario.email,
      },
    })

    return atualizado
  })
}

// ─── DIVERGÊNCIAS ─────────────────────────────────────────────────────────────

export async function criarDivergenciaDescoberta(
  diagnosticoId: string,
  dados: {
    titulo: string
    descricao: string
    processoId?: string | null
    participantesId?: string | null
    questaoValidacao?: string | null
  },
  usuario: UsuarioOps,
) {
  return prisma.$transaction(async (tx) => {
    const diagnostico = await tx.diagnosticoOperacional.findUnique({ where: { id: diagnosticoId } })
    if (!diagnostico || diagnostico.deletedAt) throw new NotFoundError('Diagnóstico não encontrado')

    const divergencia = await tx.divergenciaDescoberta.create({
      data: {
        diagnosticoId,
        titulo: dados.titulo.trim(),
        descricao: dados.descricao.trim(),
        processoId: dados.processoId ?? null,
        participantesId: dados.participantesId ?? null,
        questaoValidacao: dados.questaoValidacao?.trim() ?? null,
        criadoPorUsuarioId: usuario.id,
        criadoPorEmail: usuario.email,
      },
    })

    await tx.diagnosticoOperacionalHistorico.create({
      data: {
        diagnosticoId,
        acao: ACAO_HISTORICO_DESCOBERTA.DIVERGENCIA_CRIADA,
        detalhes: { divergenciaId: divergencia.id, titulo: divergencia.titulo },
        criadoPorUsuarioId: usuario.id,
        criadoPorEmail: usuario.email,
      },
    })

    return divergencia
  })
}

export async function resolverDivergenciaDescoberta(
  divergenciaId: string,
  questaoValidacao: string,
  usuario: UsuarioOps,
) {
  return prisma.$transaction(async (tx) => {
    const divergencia = await tx.divergenciaDescoberta.findUnique({ where: { id: divergenciaId } })
    if (!divergencia || divergencia.deletedAt) throw new NotFoundError('Divergência não encontrada')

    const atualizada = await tx.divergenciaDescoberta.update({
      where: { id: divergenciaId },
      data: { status: 'QUESTAO_VALIDACAO', questaoValidacao: questaoValidacao.trim(), resolvidaEm: new Date() },
    })

    await tx.diagnosticoOperacionalHistorico.create({
      data: {
        diagnosticoId: divergencia.diagnosticoId,
        acao: ACAO_HISTORICO_DESCOBERTA.DIVERGENCIA_RESOLVIDA,
        detalhes: { divergenciaId, questaoValidacao },
        criadoPorUsuarioId: usuario.id,
        criadoPorEmail: usuario.email,
      },
    })

    return atualizada
  })
}

// ─── OPORTUNIDADES ────────────────────────────────────────────────────────────

export async function criarOportunidadeDescoberta(
  diagnosticoId: string,
  dados: {
    descricao: string
    categoria: string
    processoId?: string | null
    etapaReferente?: string | null
    impactoEstimado?: string | null
  },
  usuario: UsuarioOps,
) {
  return prisma.$transaction(async (tx) => {
    const diagnostico = await tx.diagnosticoOperacional.findUnique({ where: { id: diagnosticoId } })
    if (!diagnostico || diagnostico.deletedAt) throw new NotFoundError('Diagnóstico não encontrado')

    const oportunidade = await tx.oportunidadeDescoberta.create({
      data: {
        diagnosticoId,
        descricao: dados.descricao.trim(),
        categoria: dados.categoria,
        processoId: dados.processoId ?? null,
        etapaReferente: dados.etapaReferente?.trim() ?? null,
        impactoEstimado: dados.impactoEstimado?.trim() ?? null,
        criadoPorUsuarioId: usuario.id,
        criadoPorEmail: usuario.email,
      },
    })

    await tx.diagnosticoOperacionalHistorico.create({
      data: {
        diagnosticoId,
        acao: ACAO_HISTORICO_DESCOBERTA.OPORTUNIDADE_CRIADA,
        detalhes: { oportunidadeId: oportunidade.id },
        criadoPorUsuarioId: usuario.id,
        criadoPorEmail: usuario.email,
      },
    })

    return oportunidade
  })
}

// ─── RELATÓRIO (briefing §21) ─────────────────────────────────────────────────

/**
 * Monta o relatório final determinístico a partir do agregado do diagnóstico.
 * O preview usa dados novos; o texto puro é exibido com botão "copiar".
 */
export async function obterRelatorioDescoberta(id: string) {
  const agregado = await obterDiagnosticoDescobertaDetalhe(id)
  const { diagnostico, categoria } = agregado

  const texto = montarRelatorioDescoberta({
    nomeEmpresa: diagnostico.nomeEmpresa,
    categoriaNome: categoria?.nome ?? '—',
    unidadeOperacional: diagnostico.unidadeOperacional,
    status: diagnostico.status as StatusDiagnosticoDescobertaOp,
    respostaAncora: diagnostico.respostaAncora,
    participantes: agregado.participantes.map((p) => ({
      nome: p.nome,
      papel: p.papel,
      cargo: p.cargo,
    })),
    registros: agregado.registros.map((r) => ({
      tipo: r.tipo,
      conteudo: r.conteudo,
      area: r.area,
      confianca: r.confianca,
    })),
    processos: agregado.processos.map((p) => ({
      nome: p.nome,
      inicio: p.inicio,
      fim: p.fim,
      responsavel: p.responsavel,
      etapas: p.etapas,
      retrabalhos: p.retrabalhos,
      dependencias: p.dependencias,
      riscos: p.riscos,
    })),
    processosDesejados: agregado.processosDesejados.map((p) => ({
      nome: p.nome,
      melhoriaPrincipal: p.melhoriaPrincipal,
    })),
    divergencias: agregado.divergencias.map((d) => ({
      titulo: d.titulo,
      descricao: d.descricao,
      status: d.status,
    })),
    oportunidades: agregado.oportunidades.map((o) => ({
      descricao: o.descricao,
      categoria: o.categoria,
      status: o.status,
    })),
    criadaEm: diagnostico.criadaEm.toLocaleDateString('pt-BR'),
    concluidoEm: diagnostico.concluidoEm?.toLocaleDateString('pt-BR') ?? null,
  })

  return { texto }
}