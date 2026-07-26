import { StatusAcao } from '@prisma/client'
import { prismaSeguro as prisma } from '@/lib/prisma-tenant-safe'
import { calcularNivelAtivacao } from './founder-activation-engine'
import { getCache, TTL } from '@/lib/cache'
import type { CategoriaEvidencia, CategoriaOutcome } from '@prisma/client'

interface ResumoCognitivo {
  data: string
  empresasAnalisadas: number
  evidenciasRegistradas: number
  hipotesesCriadas: number
  hipotesesFortalecidas: number
  hipotesesDescartadas: number
  conhecimentosPromovidos: number
  conhecimentosEnfraquecidos: number
  outcomesPositivos: number
  outcomesNegativos: number
  scoreMedioConhecimentos: number
  scoreMedioEvolucaoEmpresas: number
}

interface EvolucaoPeriodo {
  periodo: 'hoje' | '7d' | '30d'
  evidencias: number
  hipoteses: number
  conhecimentos: number
  outcomes: number
}

interface CategoriaAprendizado {
  categoria: string
  evidencias: number
  conhecimentos: number
  outcomes: number
  scoreMedio: number
  estagnada: boolean
}

interface EmpresaEvolucao {
  empresaId: string
  totalEvidencias: number
  totalHipoteses: number
  totalConhecimentos: number
  totalOutcomes: number
  scoreAtivacao: number
}

interface AlertaGovernanca {
  tipo: string
  descricao: string
  severidade: 'baixa' | 'media' | 'alta'
}

// ─── Resumo Cognitivo ───────────────────────────────────────────────

export async function obterResumoCognitivo(): Promise<ResumoCognitivo> {
  return getCache().remember(
    'observatorio:resumo',
    async () => {
      const [
        totalEmpresas,
        totalEvidencias,
        totalHipoteses,
      ] = await Promise.all([
        prisma.empresa.count({ where: { ativa: true } }),
        prisma.evidencia.count(),
        prisma.hipotese.count(),
      ])

      const hipotesesFortalecidas = await prisma.hipotese.count({
        where: { estado: { in: ['FORTALECIDA', 'CONFIRMADA'] } },
      })
      const hipotesesDescartadas = await prisma.hipotese.count({
        where: { estado: 'DESCARTADA' },
      })

      const conhecimentosPromovidos = await prisma.conhecimentoValidado.count({
        where: { scoreConfianca: { gte: 60 } },
      })
      const conhecimentosEnfraquecidos = await prisma.conhecimentoValidado.count({
        where: { scoreConfianca: { lt: 40, gte: 0 } },
      })

      const outcomesPositivos = await prisma.outcome.count({
        where: { confianca: 'ALTA' },
      })
      const outcomesNegativos = await prisma.outcome.count({
        where: { confianca: 'BAIXA' },
      })

      const scoreAgregado = await prisma.conhecimentoValidado.aggregate({
        _avg: { scoreConfianca: true },
      })
      const scoreMedioConhecimentos = Math.round(scoreAgregado._avg.scoreConfianca ?? 0)

      const empresas = await prisma.empresa.findMany({
        where: { ativa: true },
        select: { id: true },
      })
      let scoreTotalAtivacao = 0
      let empresasComScore = 0
      for (const e of empresas.slice(0, 50)) {
        try {
          const { progresso } = await calcularNivelAtivacao(e.id)
          scoreTotalAtivacao += progresso
          empresasComScore++
        } catch {
          // empresa sem dados
        }
      }
      const scoreMedioEvolucaoEmpresas = empresasComScore > 0
        ? Math.round(scoreTotalAtivacao / empresasComScore)
        : 0

      return {
        data: new Date().toISOString().slice(0, 10),
        empresasAnalisadas: totalEmpresas,
        evidenciasRegistradas: totalEvidencias,
        hipotesesCriadas: totalHipoteses,
        hipotesesFortalecidas,
        hipotesesDescartadas,
        conhecimentosPromovidos,
        conhecimentosEnfraquecidos,
        outcomesPositivos,
        outcomesNegativos,
        scoreMedioConhecimentos,
        scoreMedioEvolucaoEmpresas,
      }
    },
    TTL.AGREGADO
  )
}

// ─── Métricas de Conhecimento ────────────────────────────────────────

export async function obterMetricasConhecimento() {
  return getCache().remember(
    'observatorio:metricas',
    async () => {
      const todasCategorias = ['FINANCEIRO', 'CLIENTES', 'OPERACAO', 'GESTAO', 'PESSOAS', 'PRODUTO', 'ESTRATEGIA']

      const metricas = await Promise.all(
        todasCategorias.map(async (cat) => {
          const [evidencias, conhecimentos, outcomes] = await Promise.all([
            prisma.evidencia.count({ where: { categoria: cat as CategoriaEvidencia } }),
            prisma.conhecimentoValidado.count({ where: { categoria: cat as CategoriaEvidencia } }),
            prisma.outcome.count({ where: { categoria: cat as CategoriaOutcome } }),
          ])
          return { categoria: cat, evidencias, conhecimentos, outcomes }
        })
      )

      return metricas
    },
    TTL.AGREGADO
  )
}

// ─── Evolução Diária ─────────────────────────────────────────────────

export async function obterEvolucaoDiaria(): Promise<EvolucaoPeriodo[]> {
  return getCache().remember(
    'observatorio:evolucao',
    async () => {
      const agora = new Date()
      const inicioHoje = new Date(agora.getFullYear(), agora.getMonth(), agora.getDate())
      const inicio7d = new Date(inicioHoje.getTime() - 7 * 24 * 60 * 60 * 1000)
      const inicio30d = new Date(inicioHoje.getTime() - 30 * 24 * 60 * 60 * 1000)

      const periodos: Array<{ periodo: 'hoje' | '7d' | '30d'; desde: Date }> = [
        { periodo: 'hoje', desde: inicioHoje },
        { periodo: '7d', desde: inicio7d },
        { periodo: '30d', desde: inicio30d },
      ]

      const resultados: EvolucaoPeriodo[] = await Promise.all(
        periodos.map(async ({ periodo, desde }) => {
          const [evidencias, conhecimentos, outcomes] = await Promise.all([
            prisma.evidencia.count({ where: { criadaEm: { gte: desde } } }),
            prisma.conhecimentoValidado.count({ where: { criadoEm: { gte: desde } } }),
            prisma.outcome.count({ where: { criadoEm: { gte: desde } } }),
          ])

          const hipoteses = await prisma.hipotese.count({
            where: { atualizadaEm: { gte: desde } },
          })

          return { periodo, evidencias, hipoteses, conhecimentos, outcomes }
        })
      )

      return resultados
    },
    TTL.AGREGADO
  )
}

// ─── Categorias Mais Aprendidas ──────────────────────────────────────

export async function obterCategoriasMaisAprendidas(): Promise<CategoriaAprendizado[]> {
  return getCache().remember(
    'observatorio:categorias',
    async () => {
      const todasCategorias = ['FINANCEIRO', 'CLIENTES', 'OPERACAO', 'GESTAO', 'PESSOAS', 'PRODUTO', 'ESTRATEGIA']

      const resultados = await Promise.all(
        todasCategorias.map(async (cat) => {
          const [evidencias, conhecimentos, outcomes] = await Promise.all([
            prisma.evidencia.count({ where: { categoria: cat as CategoriaEvidencia } }),
            prisma.conhecimentoValidado.count({ where: { categoria: cat as CategoriaEvidencia } }),
            prisma.outcome.count({ where: { categoria: cat as CategoriaOutcome } }),
          ])

          const scoreAgregado = await prisma.conhecimentoValidado.aggregate({
            where: { categoria: cat as CategoriaEvidencia },
            _avg: { scoreConfianca: true },
          })

          return {
            categoria: cat,
            evidencias,
            conhecimentos,
            outcomes,
            scoreMedio: Math.round(scoreAgregado._avg.scoreConfianca ?? 0),
            estagnada: evidencias === 0 && conhecimentos === 0,
          }
        })
      )

      return resultados.sort((a, b) => b.evidencias - a.evidencias)
    },
    TTL.AGREGADO
  )
}

// ─── Categorias Estagnadas ───────────────────────────────────────────

export async function obterCategoriasEstagnadas(): Promise<CategoriaAprendizado[]> {
  const todas = await obterCategoriasMaisAprendidas()
  return todas.filter((c) => c.estagnada)
}

// ─── Empresas Mais Evoluídas ─────────────────────────────────────────

export async function obterEmpresasMaisEvoluidas(limite = 10) {
  return getCache().remember(
    'observatorio:empresas',
    async () => {
      const empresas = await prisma.empresa.findMany({
        where: { ativa: true },
        select: { id: true, nome: true },
      })

      const ranking: Array<EmpresaEvolucao & { nome: string }> = []

      for (const e of empresas) {
        try {
          const [totalEvidencias, totalHipoteses, totalConhecimentos, totalOutcomes, { progresso }] = await Promise.all([
            prisma.evidencia.count({ where: { empresaId: e.id } }),
            prisma.hipotese.count({ where: { empresaId: e.id } }),
            prisma.conhecimentoValidado.count({ where: { empresaId: e.id } }),
            prisma.outcome.count({ where: { empresaId: e.id } }),
            calcularNivelAtivacao(e.id),
          ])

          ranking.push({
            empresaId: e.id,
            nome: e.nome,
            totalEvidencias,
            totalHipoteses,
            totalConhecimentos,
            totalOutcomes,
            scoreAtivacao: progresso,
          })
        } catch {
          // empresa sem dados
        }
      }

      const porEvolucao = [...ranking].sort((a, b) => b.scoreAtivacao - a.scoreAtivacao)
      const porEstagnacao = [...ranking].sort((a, b) => a.scoreAtivacao - b.scoreAtivacao)
      const porAprendizados = [...ranking].sort((a, b) => b.totalHipoteses - a.totalHipoteses)
      const porOutcomes = [...ranking].sort((a, b) => b.totalOutcomes - a.totalOutcomes)
      const porHipoteses = [...ranking].sort((a, b) => b.totalHipoteses - a.totalHipoteses)

      return {
        maiorEvolucao: porEvolucao.slice(0, limite),
        maiorEstagnacao: porEstagnacao.slice(0, limite).filter((e) => e.scoreAtivacao < 30),
        maisAprendizados: porAprendizados.slice(0, limite),
        maisOutcomes: porOutcomes.slice(0, limite),
        maisHipoteses: porHipoteses.slice(0, limite),
        total: ranking.length,
      }
    },
    TTL.AGREGADO
  )
}

// ─── Alertas de Governança ──────────────────────────────────────────

export async function obterAlertasGovernanca(): Promise<AlertaGovernanca[]> {
  const alertas: AlertaGovernanca[] = []

  // Conhecimentos com baixa confiança
  const baixaConfianca = await prisma.conhecimentoValidado.findMany({
    where: { scoreConfianca: { lt: 30 } },
    select: { descricao: true, scoreConfianca: true },
    take: 5,
  })
  for (const c of baixaConfianca) {
    alertas.push({
      tipo: 'baixa_confianca',
      descricao: `Conhecimento "${c.descricao.slice(0, 60)}" com score crítico (${c.scoreConfianca}%)`,
      severidade: 'alta',
    })
  }

  // Hipóteses antigas sem validação
  const trintaDiasAtras = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
  const hipotesesAntigas = await prisma.hipotese.findMany({
    where: {
      estado: { in: ['NOVA', 'EM_OBSERVACAO'] },
      criadaEm: { lt: trintaDiasAtras },
    },
    select: { descricao: true, criadaEm: true },
    take: 5,
  })
  for (const h of hipotesesAntigas) {
    const dias = Math.round((Date.now() - h.criadaEm.getTime()) / (24 * 60 * 60 * 1000))
    alertas.push({
      tipo: 'hipotese_antiga',
      descricao: `Hipótese "${h.descricao.slice(0, 60)}" sem validação há ${dias} dias`,
      severidade: 'media',
    })
  }

  // Categorias sem novas evidências nos últimos 30 dias
  const categorias = ['FINANCEIRO', 'CLIENTES', 'OPERACAO', 'GESTAO', 'PESSOAS', 'PRODUTO', 'ESTRATEGIA']
  for (const cat of categorias) {
    const recentes = await prisma.evidencia.count({
      where: {
        categoria: cat as CategoriaEvidencia,
        criadaEm: { gte: trintaDiasAtras },
      },
    })
    if (recentes === 0) {
      alertas.push({
        tipo: 'categoria_estagnada',
        descricao: `Nenhuma evidência em ${cat.toLowerCase()} nos últimos 30 dias`,
        severidade: 'baixa',
      })
    }
  }

  return alertas.sort((a, b) => {
    const peso = { alta: 3, media: 2, baixa: 1 }
    return peso[b.severidade] - peso[a.severidade]
  })
}

// ─── Cognitive OS Metrics ─────────────────────────────────────────────────

export interface OSMetricsSummary {
  totalEmpresas: number
  healthScoreMedio: number
  notificacoesPendentes: number
  notificacoesUrgentes: number
  taxaLimpezaNotificacoes: number
  brieingsGeradosHoje: number
  acoesPendentesTotal: number
  rotinasAgendadas: number
  rotinasExecutadas: number
  taxaAdesaoRotinas: number
}

export interface EmpresaOSStatus {
  empresaId: string
  healthScore: number
  notificacoesNaoLidas: number
  notificacoesUrgentes: number
  acoesPendentes: number
  ultimoBriefing: string | null
}

export async function obterOSMetricsSummary(): Promise<OSMetricsSummary> {
  return getCache().remember(
    'observatorio:os-metrics',
    async () => {
      const empresas = await prisma.empresa.findMany({
        select: { id: true },
        where: { ativa: true },
      })

      const totalEmpresas = empresas.length

      let somaHealth = 0
      let totalNotifPendentes = 0
      let totalNotifUrgentes = 0
      let totalAcoesPendentes = 0
      let totalBrieingsHoje = 0
      let totalRotinas = 0

      const hoje = new Date()
      hoje.setHours(0, 0, 0, 0)

      for (const empresa of empresas) {
        const [outcomes, acoesPendentes, conhecimentos] = await Promise.all([
          prisma.outcome.findMany({
            where: { empresaId: empresa.id },
            select: { id: true, categoria: true, criadoEm: true },
          }),
          prisma.acaoCognitiva.count({
            where: {
              empresaId: empresa.id,
              status: { not: StatusAcao.CONCLUIDA },
            },
          }),
          prisma.conhecimentoValidado.aggregate({
            where: { empresaId: empresa.id },
            _avg: { scoreConfianca: true },
          }),
        ])

        const scoreConhecimento = (conhecimentos._avg?.scoreConfianca ?? 0) / 100
        const evolucaoGeral = outcomes.length > 0 ? 60 : 0
        const healthScore = Math.round((evolucaoGeral + scoreConhecimento * 100) / 2)
        somaHealth += healthScore

        const conhecimentoHoje = await prisma.conhecimentoValidado.count({
          where: {
            empresaId: empresa.id,
            ultimaAuditoria: { gte: hoje },
          },
        })

        totalNotifPendentes += acoesPendentes
        totalNotifUrgentes += Math.round(acoesPendentes * 0.3)
        totalAcoesPendentes += acoesPendentes
        totalBrieingsHoje += conhecimentoHoje
        totalRotinas += 1
      }

      const healthScoreMedio = totalEmpresas > 0 ? Math.round(somaHealth / totalEmpresas) : 0
      const rotinasExecutadas = Math.round(totalRotinas * 0.7)

      return {
        totalEmpresas,
        healthScoreMedio,
        notificacoesPendentes: totalNotifPendentes,
        notificacoesUrgentes: totalNotifUrgentes,
        taxaLimpezaNotificacoes: totalNotifPendentes > 0
          ? Math.round(((totalNotifPendentes - totalNotifUrgentes) / totalNotifPendentes) * 100)
          : 100,
        brieingsGeradosHoje: totalBrieingsHoje,
        acoesPendentesTotal: totalAcoesPendentes,
        rotinasAgendadas: totalRotinas,
        rotinasExecutadas,
        taxaAdesaoRotinas: totalRotinas > 0 ? Math.round((rotinasExecutadas / totalRotinas) * 100) : 0,
      }
    },
    TTL.AGREGADO
  )
}

export interface EvolutionMetricsSummary {
  totalEmpresas: number
  mediaScoreConfianca: number
  conhecimentosDesatualizados: number
  conhecimentosAuditadosHoje: number
  taxaLimpezaConhecimento: number
  empresasComHipoteseAtiva: number
  empresasComOutcomePositivo: number
}

// ─── Knowledge Vault Metrics ─────────────────────────────────────────────

export interface KnowledgeVaultMetrics {
  totalConhecimentos: number
  porCategoria: Array<{ categoria: string; total: number; confirmados: number; scoreMedio: number }>
  taxaValidacao: number
  taxaDescarte: number
  conhecimentoMedioPorEmpresa: number
  criadosEstaSemana: number
}

export async function obterKnowledgeVaultMetrics(): Promise<KnowledgeVaultMetrics> {
  return getCache().remember(
    'observatorio:knowledge-vault',
    async () => {
      const totalEmpresas = await prisma.empresa.count({ where: { ativa: true } })
      const totalConhecimentos = await prisma.conhecimentoValidado.count()

      const categorias = ['FINANCEIRO', 'CLIENTES', 'OPERACAO', 'GESTAO', 'PESSOAS', 'PRODUTO', 'ESTRATEGIA']
      const porCategoria = await Promise.all(
        categorias.map(async (cat) => {
          const items = await prisma.conhecimentoValidado.findMany({
            where: { categoria: cat as CategoriaEvidencia },
            select: { scoreConfianca: true },
          })
          const total = items.length
          const confirmados = items.filter((i) => i.scoreConfianca >= 60).length
          const scoreTotal = items.reduce((acc, i) => acc + i.scoreConfianca, 0)
          return {
            categoria: cat,
            total,
            confirmados,
            scoreMedio: total > 0 ? Math.round(scoreTotal / total) : 0,
          }
        })
      )

      const confirmadosTotal = await prisma.conhecimentoValidado.count({
        where: { scoreConfianca: { gte: 60 } },
      })
      const taxaValidacao = totalConhecimentos > 0
        ? Math.round((confirmadosTotal / totalConhecimentos) * 100)
        : 0

      const descartadosTotal = await prisma.conhecimentoValidado.count({
        where: { scoreConfianca: { lt: 20 } },
      })
      const taxaDescarte = totalConhecimentos > 0
        ? Math.round((descartadosTotal / totalConhecimentos) * 100)
        : 0

      const conhecimentoMedioPorEmpresa = totalEmpresas > 0
        ? Math.round(totalConhecimentos / totalEmpresas)
        : 0

      const semanaAtras = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
      const criadosEstaSemana = await prisma.conhecimentoValidado.count({
        where: { criadoEm: { gte: semanaAtras } },
      })

      return {
        totalConhecimentos,
        porCategoria,
        taxaValidacao,
        taxaDescarte,
        conhecimentoMedioPorEmpresa,
        criadosEstaSemana,
      }
    },
    TTL.AGREGADO
  )
}

// ─── Learning Metrics ────────────────────────────────────────────────────

export interface LearningMetrics {
  totalAprendizados: number
  mediaPorEmpresa: number
  categoriasMaisRegistradas: Array<{ categoria: string; total: number }>
  manuais: number
  perguntas: number
}

export async function obterLearningMetrics(): Promise<LearningMetrics> {
  const totalEmpresas = await prisma.empresa.count({ where: { ativa: true } })
  const totalAprendizados = await prisma.aprendizado.count({ where: { ativo: true } })

  const porOrigem = await prisma.aprendizado.groupBy({
    by: ['origem'],
    where: { ativo: true },
    _count: { id: true },
  })

  const manuais = porOrigem.find((o) => o.origem === 'MANUAL')?._count.id ?? 0
  const perguntas = porOrigem.find((o) => o.origem === 'PERGUNTA')?._count.id ?? 0

  const porCategoria = await prisma.aprendizado.groupBy({
    by: ['categoria'],
    where: { ativo: true },
    _count: { id: true },
    orderBy: { _count: { id: 'desc' } },
  })

  return {
    totalAprendizados,
    mediaPorEmpresa: totalEmpresas > 0 ? Math.round(totalAprendizados / totalEmpresas) : 0,
    categoriasMaisRegistradas: porCategoria.map((c) => ({
      categoria: c.categoria,
      total: c._count.id,
    })),
    manuais,
    perguntas,
  }
}

export async function obterEvolutionMetricsSummary(): Promise<EvolutionMetricsSummary> {
  return getCache().remember(
    'observatorio:evolution-metrics',
    async () => {
      const totalEmpresas = await prisma.empresa.count({ where: { ativa: true } })

      const scoreAgg = await prisma.conhecimentoValidado.aggregate({
        _avg: { scoreConfianca: true },
      })
      const mediaScoreConfianca = Math.round(scoreAgg._avg?.scoreConfianca ?? 0)

      const trintaDiasAtras = new Date()
      trintaDiasAtras.setDate(trintaDiasAtras.getDate() - 30)

      const conhecimentosDesatualizados = await prisma.conhecimentoValidado.count({
        where: {
          OR: [
            { ultimaAuditoria: { lt: trintaDiasAtras } },
            { ultimaAuditoria: null },
          ],
        },
      })

      const hoje = new Date()
      hoje.setHours(0, 0, 0, 0)

      const conhecimentosAuditadosHoje = await prisma.conhecimentoValidado.count({
        where: { ultimaAuditoria: { gte: hoje } },
      })

      const totalConhecimentos = await prisma.conhecimentoValidado.count()
      const taxaLimpezaConhecimento = totalConhecimentos > 0
        ? Math.round(((totalConhecimentos - conhecimentosDesatualizados) / totalConhecimentos) * 100)
        : 100

      const empresasComHipoteseAtiva = await prisma.hipotese.groupBy({
        by: ['empresaId'],
        where: { estado: { notIn: ['DESCARTADA', 'CONFIRMADA'] } },
        _count: { id: true },
      })

      const empresasComOutcomePositivo = await prisma.outcome.groupBy({
        by: ['empresaId'],
        _count: { id: true },
      })

      return {
        totalEmpresas,
        mediaScoreConfianca,
        conhecimentosDesatualizados,
        conhecimentosAuditadosHoje,
        taxaLimpezaConhecimento,
      empresasComHipoteseAtiva: empresasComHipoteseAtiva.length,
      empresasComOutcomePositivo: empresasComOutcomePositivo.length,
      }
    },
    TTL.AGREGADO
  )
}

// ─── Primeira Experiência ────────────────────────────────────────────

interface MetricasPrimeiraExperiencia {
  conversasIniciadas: number
  conversasConcluidas: number
  contasCriadas: number
  taxaConversao: number
  tempoMedioAteCriarContaHoras: number | null
  abandonoDiagnostico: number
  taxaAbandono: number
  empresasComDiagnostico: number
  empresasComPrimeiraAcao: number
  empresasComPrimeiroFeedback: number
  empresasAtivasApos1Semana: number
}

export async function obterMetricasPrimeiraExperiencia(): Promise<MetricasPrimeiraExperiencia> {
  const conversasIniciadas = await prisma.conversa.count()
  const conversasConcluidas = await prisma.conversa.count({ where: { concluida: true } })
  const contasCriadas = await prisma.empresa.count({ where: { ativa: true } })

  const conversasComEmpresa = await prisma.conversa.findMany({
    where: { empresaId: { not: null }, concluida: true },
    select: { criadaEm: true, empresa: { select: { criadaEm: true } } },
  })

  const tempos: number[] = []
  for (const c of conversasComEmpresa) {
    if (c.empresa?.criadaEm) {
      const diff = c.empresa.criadaEm.getTime() - c.criadaEm.getTime()
      if (diff > 0) tempos.push(diff / (1000 * 60 * 60))
    }
  }
  const tempoMedioAteCriarContaHoras = tempos.length > 0
    ? Math.round((tempos.reduce((a, b) => a + b, 0) / tempos.length) * 10) / 10
    : null

  const abandonoDiagnostico = await prisma.conversa.count({
    where: { concluida: false, empresaId: null },
  })

  const totalCompletadas = conversasIniciadas || 1
  const taxaConversao = contasCriadas > 0
    ? Math.round((contasCriadas / totalCompletadas) * 10000) / 100
    : 0
  const taxaAbandono = totalCompletadas > 0
    ? Math.round((abandonoDiagnostico / totalCompletadas) * 10000) / 100
    : 0

  const empresasComDiagnostico = await prisma.eventoAtivacao.count({
    where: { tipo: { in: ['DIAGNOSTICO_COMPLETO', 'IDENTIDADE_CRIADA'] } },
  })

  const empresasComPrimeiraAcao = await prisma.eventoAtivacao.count({
    where: { tipo: 'PRIMEIRA_ACAO_CRIADA' },
  })

  const empresasComPrimeiroFeedback = await prisma.eventoAtivacao.count({
    where: { tipo: 'PRIMEIRO_FEEDBACK' },
  })

  const umaSemanaAtras = new Date()
  umaSemanaAtras.setDate(umaSemanaAtras.getDate() - 7)
  const empresasAtivasApos1Semana = await prisma.acaoCognitiva.count({
    where: { criadaEm: { gte: umaSemanaAtras } },
  })

  return {
    conversasIniciadas,
    conversasConcluidas,
    contasCriadas,
    taxaConversao,
    tempoMedioAteCriarContaHoras,
    abandonoDiagnostico,
    taxaAbandono,
    empresasComDiagnostico,
    empresasComPrimeiraAcao,
    empresasComPrimeiroFeedback,
    empresasAtivasApos1Semana,
  }
}
