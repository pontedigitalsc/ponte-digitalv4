import { prismaSeguro as prisma } from '@/lib/prisma-tenant-safe'
import { consultarEvidencias } from './evidence-engine'
import { consultarMemoria, registrarNaMemoria } from './cognitive-memory-engine'
import { createLogger } from '@/lib/logger'
import type { CategoriaEvidencia } from './evidence-engine'
import type { EstadoHipotese, ImpactoHipotese, OrigemHipotese, ConfiancaEvidencia } from '@prisma/client'

const log = createLogger('engine', 'hypothesis')

interface HipoteseInput {
  empresaId: string
  descricao: string
  categoria: CategoriaEvidencia
  confianca?: ConfiancaEvidencia
  impacto?: ImpactoHipotese
  origem?: OrigemHipotese
  evidenciaOrigem?: string
}

export async function criarHipotese(input: HipoteseInput) {
  const hipotese = await prisma.hipotese.create({
    data: {
      empresaId: input.empresaId,
      descricao: input.descricao,
      categoria: input.categoria,
      confianca: input.confianca ?? 'MEDIA',
      impacto: input.impacto ?? 'MEDIO',
      origem: input.origem ?? 'ANALISE_EVIDENCIAS',
      evidenciaOrigem: input.evidenciaOrigem,
    },
  })

  await registrarNaMemoria(input.empresaId, {
    tipo: 'descoberta',
    descricao: `Nova hipótese: ${input.descricao.slice(0, 100)}`,
    categoria: input.categoria,
    versao: 1,
    metadados: { hipoteseId: hipotese.id, impacto: input.impacto },
  })

  return hipotese
}

export async function atualizarEstadoHipotese(
  id: string,
  estado: EstadoHipotese,
  empresaId: string
) {
  const hipotese = await prisma.hipotese.findFirst({ where: { id, empresaId } })
  if (!hipotese) return null

  const atualizada = await prisma.hipotese.update({
    where: { id },
    data: { estado },
  })

  await registrarNaMemoria(empresaId, {
    tipo: 'evolucao',
    descricao: `Hipótese "${hipotese.descricao.slice(0, 80)}" alterada para ${estado}`,
    categoria: hipotese.categoria as CategoriaEvidencia,
    versao: 1,
    metadados: { hipoteseId: id, estadoAnterior: hipotese.estado, estadoNovo: estado },
  })

  return atualizada
}

export async function listarHipoteses(empresaId: string, ativas?: boolean) {
  return prisma.hipotese.findMany({
    where: {
      empresaId,
      ...(ativas ? { estado: { in: ['NOVA', 'EM_OBSERVACAO', 'FORTALECIDA'] } } : {}),
    },
    orderBy: [{ impacto: 'desc' }, { atualizadaEm: 'desc' }],
  })
}

export interface HipoteseCompleta {
  id: string
  descricao: string
  categoria: string
  estado: string
  confianca: string
  impacto: string
  origem: string
  contagemEvidencias: number
  criadaEm: Date
  atualizadaEm: Date
  evidencias: Array<{ descricao: string; confianca: string; criadaEm: Date }>
}

export async function obterHipoteseCompleta(
  empresaId: string,
  hipoteseId: string
): Promise<HipoteseCompleta | null> {
  const hipotese = await prisma.hipotese.findFirst({ where: { id: hipoteseId, empresaId } })
  if (!hipotese) return null

  const evidencias = await consultarEvidencias(empresaId, {
    categorias: [hipotese.categoria as CategoriaEvidencia],
    limite: 20,
  })

  return {
    id: hipotese.id,
    descricao: hipotese.descricao,
    categoria: hipotese.categoria,
    estado: hipotese.estado,
    confianca: hipotese.confianca,
    impacto: hipotese.impacto,
    origem: hipotese.origem,
    contagemEvidencias: evidencias.length,
    criadaEm: hipotese.criadaEm,
    atualizadaEm: hipotese.atualizadaEm,
    evidencias: evidencias.map(e => ({
      descricao: e.descricao,
      confianca: e.confianca,
      criadaEm: e.criadaEm,
    })),
  }
}

export async function gerarHipotesesDeEvidencias(empresaId: string): Promise<number> {
  try {
    const evidencias = await consultarEvidencias(empresaId, { limite: 200 })
    const hipotesesExistentes = await listarHipoteses(empresaId, true)

    const categoriasComEvidencias = new Map<string, typeof evidencias>()

    for (const ev of evidencias) {
      const cat = ev.categoria
      if (!categoriasComEvidencias.has(cat)) {
        categoriasComEvidencias.set(cat, [])
      }
      categoriasComEvidencias.get(cat)!.push(ev)
    }

    let criadas = 0

    for (const [categoria, evs] of categoriasComEvidencias) {
      const jaTemHipotese = hipotesesExistentes.some(h => h.categoria === categoria)
      if (jaTemHipotese) continue

      if (evs.length < 3) continue

      const confiancas = evs.map(e => e.confianca)
      const temAlta = confiancas.some(c => c === 'ALTA')
      const confiancaMedia: ConfiancaEvidencia = temAlta ? 'ALTA' : confiancas.some(c => c === 'MEDIA') ? 'MEDIA' : 'BAIXA'

      const descricao = gerarDescricaoHipotese(categoria, evs)
      if (!descricao) continue

      const impacto = calcularImpacto(categoria, evs)

      await criarHipotese({
        empresaId,
        descricao,
        categoria: categoria as CategoriaEvidencia,
        confianca: confiancaMedia,
        impacto,
        origem: 'ANALISE_EVIDENCIAS',
        evidenciaOrigem: evs[0].origem,
      })
      criadas++
    }

    return criadas
  } catch (err) {
    log.error('Erro ao gerar hipóteses de evidências', { empresaId, error: err instanceof Error ? err : undefined })
    return 0
  }
}

function gerarDescricaoHipotese(categoria: string, evidencias: Array<{ descricao: string; origem: string }>): string | null {
  const map: Record<string, (evs: typeof evidencias) => string> = {
    FINANCEIRO: (evs) => {
      if (evs.some(e => e.descricao.toLowerCase().includes('perda') || e.descricao.toLowerCase().includes('inadimplente'))) {
        return 'Problemas financeiros podem estar afetando a saúde do negócio'
      }
      return 'A gestão financeira precisa de atenção e acompanhamento regular'
    },
    CLIENTES: (evs) => {
      if (evs.some(e => e.descricao.toLowerCase().includes('lead') || e.descricao.toLowerCase().includes('venda'))) {
        return 'O pipeline de vendas e aquisição de clientes é uma área crítica'
      }
      return 'A base de clientes requer análise e estratégias de retenção'
    },
    OPERACAO: () => 'A operação do negócio pode estar com gargalos que reduzem eficiência',
    GESTAO: () => 'Processos de gestão podem estar sobrecarregando o empresário',
    PESSOAS: () => 'A equipe e a gestão de pessoas precisam de atenção estratégica',
    PRODUTO: () => 'O portfólio de produtos/serviços pode estar concentrado em poucos itens',
    ESTRATEGIA: () => 'A estratégia de crescimento precisa ser revisitada com dados concretos',
  }

  const fn = map[categoria]
  return fn ? fn(evidencias) : `Atividade detectada em ${categoria.toLowerCase()} requer análise`
}

function calcularImpacto(categoria: string, evidencias: Array<{ descricao: string; confianca: string }>): ImpactoHipotese {
  const temUrgencia = evidencias.some(e =>
    e.descricao.toLowerCase().includes('urgente') ||
    e.descricao.toLowerCase().includes('crítico') ||
    e.descricao.toLowerCase().includes('perda') ||
    e.confianca === 'ALTA'
  )

  if (temUrgencia && evidencias.length >= 5) return 'ALTO'
  if (evidencias.length >= 3) return 'MEDIO'
  return 'BAIXO'
}
