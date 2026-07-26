import { prismaSeguro as prisma } from '@/lib/prisma-tenant-safe'
import { registrarNaMemoria } from './cognitive-memory-engine'

export const CATEGORIAS_APRENDIZADO = [
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

export type CategoriaAprendizado = typeof CATEGORIAS_APRENDIZADO[number]

export const ORIGENS_APRENDIZADO = ['CONVERSA', 'MANUAL', 'PERGUNTA'] as const
export type OrigemAprendizado = typeof ORIGENS_APRENDIZADO[number]

export interface AprendizadoItem {
  id: string
  descricao: string
  categoria: string
  origem: string
  contexto: string | null
  ativo: boolean
  criadoEm: string
}

export interface ContagemCategoria {
  categoria: string
  total: number
}

export async function adicionarAprendizado(
  empresaId: string,
  descricao: string,
  categoria: string,
  origem: OrigemAprendizado,
  contexto?: string | null,
): Promise<AprendizadoItem> {
  const resultado = await prisma.aprendizado.create({
    data: { empresaId, descricao, categoria, origem, contexto: contexto ?? null },
  })

  void registrarNaMemoria(empresaId, {
    tipo: 'descoberta',
    descricao: `Novo aprendizado: ${descricao} (${categoria.toLowerCase()})`,
    categoria: 'ESTRATEGIA',
    versao: 0,
    metadados: { aprendizadoId: resultado.id, categoria, origem },
  })

  return {
    id: resultado.id,
    descricao: resultado.descricao,
    categoria: resultado.categoria,
    origem: resultado.origem,
    contexto: resultado.contexto,
    ativo: resultado.ativo,
    criadoEm: resultado.criadoEm.toISOString(),
  }
}

export async function listarAprendizados(
  empresaId: string,
  filtros?: { categoria?: string | null; ativo?: boolean; limite?: number },
): Promise<AprendizadoItem[]> {
  const where: any = { empresaId }
  if (filtros?.categoria) where.categoria = filtros.categoria
  if (filtros?.ativo !== undefined) where.ativo = filtros.ativo

  const items = await prisma.aprendizado.findMany({
    where,
    orderBy: { criadoEm: 'desc' },
    take: filtros?.limite ?? 50,
  })

  return items.map((i) => ({
    id: i.id,
    descricao: i.descricao,
    categoria: i.categoria,
    origem: i.origem,
    contexto: i.contexto,
    ativo: i.ativo,
    criadoEm: i.criadoEm.toISOString(),
  }))
}

export async function contagemPorCategoria(empresaId: string): Promise<ContagemCategoria[]> {
  const items = await prisma.aprendizado.groupBy({
    by: ['categoria'],
    where: { empresaId, ativo: true },
    _count: { id: true },
  })

  return CATEGORIAS_APRENDIZADO.map((cat) => {
    const encontrado = items.find((i) => i.categoria === cat)
    return { categoria: cat, total: encontrado?._count.id ?? 0 }
  }).filter((c) => c.total > 0)
}

export async function aprendizadosParaContexto(
  empresaId: string,
  limite = 10,
): Promise<string[]> {
  const items = await prisma.aprendizado.findMany({
    where: { empresaId, ativo: true },
    orderBy: { criadoEm: 'desc' },
    take: limite,
    select: { descricao: true },
  })
  return items.map((i) => i.descricao)
}

export async function aprendizadosRecentes(
  empresaId: string,
  limite = 5,
): Promise<AprendizadoItem[]> {
  return listarAprendizados(empresaId, { ativo: true, limite })
}

export async function desativarAprendizado(id: string, empresaId: string): Promise<void> {
  await prisma.aprendizado.updateMany({
    where: { id, empresaId },
    data: { ativo: false },
  })
}

const PERGUNTAS_RAPIDAS = [
  { pergunta: 'Como você escolhe um fornecedor?', categoria: 'OPERACAO', contexto: 'Como você escolhe um fornecedor?' },
  { pergunta: 'Existe alguma regra importante da empresa?', categoria: 'REGRAS', contexto: 'Existe alguma regra importante da empresa?' },
  { pergunta: 'Existe alguma decisão que você sempre toma?', categoria: 'VISAO', contexto: 'Existe alguma decisão que você sempre toma?' },
  { pergunta: 'O que você mais valoriza nos seus clientes?', categoria: 'CLIENTES', contexto: 'O que você mais valoriza nos seus clientes?' },
  { pergunta: 'Como você define seus preços?', categoria: 'FINANCEIRO', contexto: 'Como você define seus preços?' },
  { pergunta: 'Qual o maior desafio da sua equipe hoje?', categoria: 'EQUIPE', contexto: 'Qual o maior desafio da sua equipe hoje?' },
  { pergunta: 'O que você espera do seu negócio daqui 1 ano?', categoria: 'OBJETIVOS', contexto: 'O que você espera do seu negócio daqui 1 ano?' },
  { pergunta: 'Tem alguma rotina que você repete todo dia?', categoria: 'ROTINAS', contexto: 'Tem alguma rotina que você repete todo dia?' },
  { pergunta: 'Qual valor nunca pode faltar na sua empresa?', categoria: 'VALORES', contexto: 'Qual valor nunca pode faltar na sua empresa?' },
  { pergunta: 'Que tipo de risco você evita ao máximo?', categoria: 'RISCOS', contexto: 'Que tipo de risco você evita ao máximo?' },
  { pergunta: 'O que você mais gosta no seu ramo?', categoria: 'PREFERENCIAS', contexto: 'O que você mais gosta no seu ramo?' },
  { pergunta: 'Como você prefere ser tratado pelos funcionários?', categoria: 'PREFERENCIAS', contexto: 'Como você prefere ser tratado pelos funcionários?' },
] as const

export function obterPerguntasRapidas() {
  return PERGUNTAS_RAPIDAS
}

export function obterPerguntaAleatoria(jaRespondidas: string[] = []) {
  const disponiveis = PERGUNTAS_RAPIDAS.filter(
    (p) => !jaRespondidas.includes(p.contexto),
  )
  if (disponiveis.length === 0) return null
  return disponiveis[Math.floor(Math.random() * disponiveis.length)]
}
