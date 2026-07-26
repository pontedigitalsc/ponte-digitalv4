import { prismaSeguro as prisma } from '@/lib/prisma-tenant-safe'
import { consultarEvidencias } from './evidence-engine'
import { listarFeedbackRecente } from './feedback-intelligence-engine'
import type { CategoriaOutcome, OrigemOutcome, ConfiancaEvidencia } from '@prisma/client'
import { NotFoundError } from '@/lib/app-errors'

interface DadosOutcome {
  categoria: CategoriaOutcome
  origem: OrigemOutcome
  descricao: string
  detalhes?: Record<string, unknown>
  confianca?: ConfiancaEvidencia
  evidenciasIds?: string[]
}

export interface ImpactoEmpresa {
  mudancasPositivas: Array<{ categoria: string; descricao: string; confianca: string }>
  mudancasNegativas: Array<{ categoria: string; descricao: string; confianca: string }>
  permaneceuIgual: string[]
  areaMaisEvoluiu: { categoria: string; justificativa: string } | null
  areaAtencao: { categoria: string; justificativa: string } | null
  evolucaoGeral: number // 0-100
}

const MAPA_ROTULO_CATEGORIA: Record<string, string> = {
  FINANCEIRO: 'Financeiro',
  ORGANIZACAO: 'Organização',
  OPERACAO: 'Operação',
  CLIENTES: 'Clientes',
  PRODUTIVIDADE: 'Produtividade',
  PREVISIBILIDADE: 'Previsibilidade',
  BEM_ESTAR: 'Bem-estar',
  ESTRATEGIA: 'Estratégia',
}

// ─── Registrar ────────────────────────────────────────────────────────

export async function registrarOutcome(
  empresaId: string,
  dados: DadosOutcome
) {
  return prisma.outcome.create({
    data: {
      empresaId,
      categoria: dados.categoria,
      origem: dados.origem,
      descricao: dados.descricao,
      detalhes: dados.detalhes ?? undefined,
      confianca: dados.confianca ?? 'MEDIA',
      evidenciasIds: dados.evidenciasIds ?? [],
    },
  })
}

// ─── Consultas ────────────────────────────────────────────────────────

export async function listarOutcomes(
  empresaId: string,
  filtro?: {
    categorias?: CategoriaOutcome[]
    origens?: OrigemOutcome[]
    limite?: number
  }
) {
  return prisma.outcome.findMany({
    where: {
      empresaId,
      ...(filtro?.categorias?.length ? { categoria: { in: filtro.categorias } } : {}),
      ...(filtro?.origens?.length ? { origem: { in: filtro.origens } } : {}),
    },
    orderBy: { criadoEm: 'desc' },
    take: filtro?.limite ?? 20,
  })
}

export async function atualizarOutcome(
  id: string,
  dados: {
    descricao?: string
    detalhes?: Record<string, unknown>
    confianca?: ConfiancaEvidencia
    evidenciasIds?: string[]
  },
  empresaId: string
) {
  const outcome = await prisma.outcome.findFirst({ where: { id, empresaId } })
  if (!outcome) throw new NotFoundError('Outcome não encontrado')

  return prisma.outcome.update({
    where: { id },
    data: {
      ...(dados.descricao !== undefined ? { descricao: dados.descricao } : {}),
      ...(dados.detalhes !== undefined ? { detalhes: dados.detalhes } : {}),
      ...(dados.confianca !== undefined ? { confianca: dados.confianca } : {}),
      ...(dados.evidenciasIds !== undefined ? { evidenciasIds: dados.evidenciasIds } : {}),
    },
  })
}

// ─── Principais Outcomes ──────────────────────────────────────────────

export async function principaisOutcomes(empresaId: string, limite = 5) {
  const outcomes = await prisma.outcome.findMany({
    where: { empresaId },
    orderBy: { criadoEm: 'desc' },
    take: limite,
  })

  return outcomes.map((o) => ({
    id: o.id,
    categoria: o.categoria,
    descricao: o.descricao,
    confianca: o.confianca,
    criadoEm: o.criadoEm,
  }))
}

// ─── Calcular Impacto ─────────────────────────────────────────────────

export async function calcularImpactoEmpresa(empresaId: string): Promise<ImpactoEmpresa> {
  const outcomes = await prisma.outcome.findMany({
    where: { empresaId },
    orderBy: { criadoEm: 'desc' },
  })

  const evidenciasRecentes = await consultarEvidencias(empresaId, {
    desde: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
    limite: 100,
  })

  const feedbacks = await listarFeedbackRecente(empresaId, 60)

  // Agrupa outcomes por categoria
  const porCategoria = new Map<string, typeof outcomes>()
  for (const o of outcomes) {
    const cat = o.categoria
    if (!porCategoria.has(cat)) porCategoria.set(cat, [])
    porCategoria.get(cat)!.push(o)
  }

  // Evidências por categoria
  const evPorCategoria = new Map<string, number>()
  for (const e of evidenciasRecentes) {
    const cat = e.categoria
    evPorCategoria.set(cat, (evPorCategoria.get(cat) ?? 0) + 1)
  }

  // Feedback positivos por categoria
  const fbPositivo = new Set<string>()
  const fbNegativo = new Set<string>()
  for (const fb of feedbacks) {
    const acao = fb.acao as { categoria?: string } | null
    const cat = acao?.categoria
    if (!cat) continue
    if (fb.tipo === 'AJUDOU' || fb.tipo === 'AJUDOU_PARCIALMENTE') {
      fbPositivo.add(cat)
    } else if (fb.tipo === 'NAO_AJUDOU') {
      fbNegativo.add(cat)
    }
  }

  const mudancasPositivas: ImpactoEmpresa['mudancasPositivas'] = []
  const mudancasNegativas: ImpactoEmpresa['mudancasNegativas'] = []
  const permaneceuIgual: string[] = []
  let maiorEvolucao = { categoria: '', score: -1 }

  for (const [cat, outcomesCat] of porCategoria) {
    const qtde = outcomesCat.length
    const altaConfianca = outcomesCat.filter((o) => o.confianca === 'ALTA').length
    const comEvidencia = outcomesCat.filter(
      (o) => o.evidenciasIds.length > 0
    ).length
    const temFeedbackPositivo = fbPositivo.has(cat)
    const temFeedbackNegativo = fbNegativo.has(cat)
    const evCount = evPorCategoria.get(cat) ?? 0

    // Score de evolução: combina confiança, evidências e feedback
    const score = altaConfianca * 3 + comEvidencia * 2 + evCount * 0.5 + (temFeedbackPositivo ? 5 : 0) - (temFeedbackNegativo ? 3 : 0)

    if (score > 0 && (temFeedbackPositivo || altaConfianca > 0)) {
      mudancasPositivas.push({
        categoria: MAPA_ROTULO_CATEGORIA[cat] ?? cat,
        descricao: gerarDescricaoPositiva(cat, qtde, altaConfianca),
        confianca: altaConfianca > qtde / 2 ? 'ALTA' : 'MEDIA',
      })
    } else if (score < 0 || temFeedbackNegativo) {
      mudancasNegativas.push({
        categoria: MAPA_ROTULO_CATEGORIA[cat] ?? cat,
        descricao: gerarDescricaoNegativa(cat),
        confianca: temFeedbackNegativo ? 'ALTA' : 'BAIXA',
      })
    } else if (evCount > 0 && outcomesCat.length === 0) {
      permaneceuIgual.push(MAPA_ROTULO_CATEGORIA[cat] ?? cat)
    }

    if (score > maiorEvolucao.score) {
      maiorEvolucao = { categoria: cat, score }
    }
  }

  // Categorias com evidência mas sem outcome → área de atenção
  const categoriasOutcome = new Set(outcomes.map((o) => o.categoria))
  const areaAtencao = [...evPorCategoria.entries()]
    .filter(([cat]) => !categoriasOutcome.has(cat as CategoriaOutcome))
    .sort((a, b) => b[1] - a[1])
    .map(([cat]) => ({
      categoria: MAPA_ROTULO_CATEGORIA[cat] ?? cat,
      justificativa: `Há atividade em ${(MAPA_ROTULO_CATEGORIA[cat] ?? cat).toLowerCase()} mas ainda não registramos mudanças claras`,
    }))[0] ?? null

  // Área que mais evoluiu
  const areaMaisEvoluiu = maiorEvolucao.score > 0
    ? {
        categoria: MAPA_ROTULO_CATEGORIA[maiorEvolucao.categoria] ?? maiorEvolucao.categoria,
        justificativa: gerarJustificativaEvolucao(maiorEvolucao.categoria, porCategoria.get(maiorEvolucao.categoria)?.length ?? 0),
      }
    : null

  // Evolução geral (0-100)
  const totalOutcomes = outcomes.length
  const comAltaConfianca = outcomes.filter((o) => o.confianca === 'ALTA').length
  const comEvidenciaCruzada = outcomes.filter((o) => o.evidenciasIds.length > 0).length
  const evolucaoGeral = totalOutcomes > 0
    ? Math.min(
        Math.round(
          (comAltaConfianca / totalOutcomes) * 40 +
          (comEvidenciaCruzada / totalOutcomes) * 30 +
          (mudancasPositivas.length / Math.max(mudancasPositivas.length + mudancasNegativas.length, 1)) * 30
        ),
        100
      )
    : 0

  return {
    mudancasPositivas,
    mudancasNegativas,
    permaneceuIgual,
    areaMaisEvoluiu,
    areaAtencao,
    evolucaoGeral,
  }
}

function gerarDescricaoPositiva(categoria: string, qtde: number, altaConfianca: number): string {
  const base = MAPA_ROTULO_CATEGORIA[categoria] ?? categoria
  if (qtde >= 3 && altaConfianca >= 2) return `Melhoria consistente em ${base.toLowerCase()} — ${qtde} mudanças confirmadas`
  if (qtde >= 2) return `Progresso detectado em ${base.toLowerCase()}`
  return `Primeira mudança positiva observada em ${base.toLowerCase()}`
}

function gerarDescricaoNegativa(categoria: string): string {
  const base = MAPA_ROTULO_CATEGORIA[categoria] ?? categoria
  return `Ações em ${base.toLowerCase()} não geraram o resultado esperado`
}

function gerarJustificativaEvolucao(categoria: string, qtde: number): string {
  const base = MAPA_ROTULO_CATEGORIA[categoria] ?? categoria
  return `${base} teve ${qtde} mudança${qtde !== 1 ? 's' : ''} registrada${qtde !== 1 ? 's' : ''} — é a área com mais evidências de evolução`
}
