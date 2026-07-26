import { prismaSeguro as prisma } from '@/lib/prisma-tenant-safe'
import { registrarNaMemoria } from './cognitive-memory-engine'
import type { CategoriaEvidencia } from '@prisma/client'

// ─── Configuração ───────────────────────────────────────────────────────────

export interface SynthesisConfig {
  minimoItens: number
  similaridadeMinima: number
  pesoConfianca: number
  pesoConfirmacoes: number
  pesoRecencia: number
  maximoItensPorGrupo: number
}

export const SYNTHESIS_CONFIG: SynthesisConfig = {
  minimoItens: 2,
  similaridadeMinima: 0.3,
  pesoConfianca: 0.5,
  pesoConfirmacoes: 0.3,
  pesoRecencia: 0.2,
  maximoItensPorGrupo: 10,
}

// ─── Tipos ──────────────────────────────────────────────────────────────────

export interface ConhecimentoParaSintese {
  id: string
  descricao: string
  categoria: string
  scoreConfianca: number
  quantidadeConfirmacoes: number
  quantidadeRefutacoes: number
  origem: string
  criadoEm: Date
  atualizadoEm: Date
  estado: string
}

export interface GrupoSintese {
  id: string
  categoria: string
  conhecimentoIds: string[]
  itens: ConhecimentoParaSintese[]
  similaridadeMedia: number
}

export interface Sintese {
  id: string
  grupoId: string
  categoria: string
  resumo: string
  quantidadeConhecimentos: number
  fontes: string[]
  scoreAgregado: number
  confiancaConsolidada: number
  timestamp: Date
  valida: boolean
}

export interface ResultadoSintese {
  empresaId: string
  data: string
  grupos: GrupoSintese[]
  sinteses: Sintese[]
  resumo: {
    totalGrupos: number
    totalSinteses: number
    conhecimentosConsolidados: number
  }
}

// ─── Observabilidade ────────────────────────────────────────────────────────

export interface SynthesisStats {
  sintesesGeradas: number
  gruposAnalisados: number
  conhecimentosConsolidados: number
  tempoMedioMs: number
}

let stats: SynthesisStats = {
  sintesesGeradas: 0,
  gruposAnalisados: 0,
  conhecimentosConsolidados: 0,
  tempoMedioMs: 0,
}

let totalTimeMs = 0
let totalExecucoes = 0

export function getSynthesisStats(): SynthesisStats {
  return { ...stats }
}

export function resetSynthesisStats(): void {
  stats = { sintesesGeradas: 0, gruposAnalisados: 0, conhecimentosConsolidados: 0, tempoMedioMs: 0 }
  totalTimeMs = 0
  totalExecucoes = 0
}

// ─── Similaridade textual (Jaccard) ─────────────────────────────────────────

const STOPWORDS = new Set([
  'a', 'ao', 'aos', 'aquele', 'aqueles', 'aquilo', 'as', ' com', 'da', 'das',
  'de', 'dela', 'dele', 'deles', 'delas', 'do', 'dos', 'e', 'em', 'entre',
  'era', 'eram', 'esse', 'essa', 'esses', 'essas', 'esta', 'este', 'estes',
  'estas', 'eu', 'foi', 'foram', 'ha', 'isso', 'isto', 'ja', 'lhe', 'lhes',
  'mais', 'mas', 'me', 'mesmo', 'meu', 'meus', 'minha', 'minhas', 'muito',
  'na', 'nao', 'nas', 'nem', 'no', 'nos', 'nossa', 'nossas', 'nosso', 'nossos',
  'num', 'numa', 'o', 'os', 'ou', 'para', 'pela', 'pelas', 'pelo', 'pelos',
  'por', 'qual', 'quando', 'que', 'se', 'sem', 'seu', 'seus', 'sua', 'suas',
  'tal', 'te', 'tem', 'teu', 'teus', 'tu', 'tua', 'tuas', 'um', 'uma', 'umas',
  'uns', 'com', 'como', 'dos', 'das', 'muito', 'mais', 'mas', 'tambem',
])

function tokenizar(texto: string): Set<string> {
  const tokens = texto
    .toLowerCase()
    .replace(/[^a-záéíóúâêôãõç0-9\s]/g, '')
    .split(/\s+/)
    .filter((t) => t.length > 2 && !STOPWORDS.has(t))
  return new Set(tokens)
}

function calcularSimilaridadeToken(a: string, b: string): number {
  const tokensA = tokenizar(a)
  const tokensB = tokenizar(b)
  const intersecao = new Set([...tokensA].filter((t) => tokensB.has(t)))
  const uniao = new Set([...tokensA, ...tokensB])
  if (uniao.size === 0) return 0
  return intersecao.size / uniao.size
}

// ─── Estratégias ────────────────────────────────────────────────────────────

function gerarId(): string {
  return 'syn_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 6)
}

export async function identificarGrupos(
  empresaId: string,
  config?: Partial<SynthesisConfig>
): Promise<GrupoSintese[]> {
  const cfg = { ...SYNTHESIS_CONFIG, ...config }

  const conhecimentos = await prisma.conhecimentoValidado.findMany({
    where: { empresaId },
    select: {
      id: true,
      descricao: true,
      categoria: true,
      scoreConfianca: true,
      quantidadeConfirmacoes: true,
      quantidadeRefutacoes: true,
      origem: true,
      criadoEm: true,
      atualizadoEm: true,
      dados: true,
    },
  })

  const ativos: ConhecimentoParaSintese[] = conhecimentos
    .filter((c) => {
      const metadata = c.dados as Record<string, unknown> | null
      const estado = (metadata?.estadoConhecimento as string) ?? 'ATIVO'
      return estado === 'ATIVO'
    })
    .map((c) => ({
      id: c.id,
      descricao: c.descricao,
      categoria: c.categoria,
      scoreConfianca: c.scoreConfianca,
      quantidadeConfirmacoes: c.quantidadeConfirmacoes,
      quantidadeRefutacoes: c.quantidadeRefutacoes,
      origem: c.origem,
      criadoEm: c.criadoEm,
      atualizadoEm: c.atualizadoEm,
      estado: 'ATIVO',
    }))

  const grupos: GrupoSintese[] = []
  const visitados = new Set<string>()

  const categorias = [...new Set(ativos.map((c) => c.categoria))]

  for (const categoria of categorias) {
    const daCategoria = ativos.filter((c) => c.categoria === categoria)

    for (let i = 0; i < daCategoria.length; i++) {
      if (visitados.has(daCategoria[i].id)) continue

      const grupo: ConhecimentoParaSintese[] = [daCategoria[i]]
      visitados.add(daCategoria[i].id)

      for (let j = i + 1; j < daCategoria.length; j++) {
        if (visitados.has(daCategoria[j].id)) continue
        if (grupo.length >= cfg.maximoItensPorGrupo) break

        const similaridade = calcularSimilaridadeToken(
          daCategoria[i].descricao,
          daCategoria[j].descricao
        )

        if (similaridade >= cfg.similaridadeMinima) {
          grupo.push(daCategoria[j])
          visitados.add(daCategoria[j].id)
        }
      }

      if (grupo.length >= cfg.minimoItens) {
        const similaridades = grupo.slice(1).map((item) =>
          calcularSimilaridadeToken(grupo[0].descricao, item.descricao)
        )
        const similaridadeMedia =
          similaridades.length > 0
            ? similaridades.reduce((a, b) => a + b, 0) / similaridades.length
            : 1

        grupos.push({
          id: gerarId(),
          categoria,
          conhecimentoIds: grupo.map((c) => c.id),
          itens: grupo,
          similaridadeMedia,
        })
      }
    }
  }

  stats.gruposAnalisados += grupos.length
  return grupos
}

export function calcularScore(itens: ConhecimentoParaSintese[]): number {
  if (itens.length === 0) return 0
  const soma = itens.reduce((acc, c) => acc + c.scoreConfianca, 0)
  return Math.round(soma / itens.length)
}

export function calcularConfianca(itens: ConhecimentoParaSintese[], config?: Partial<SynthesisConfig>): number {
  const cfg = { ...SYNTHESIS_CONFIG, ...config }
  if (itens.length === 0) return 0

  const agora = Date.now()
  const totalPeso = itens.reduce((acc, c, i) => {
    const pesoConfianca = (c.scoreConfianca / 100) * cfg.pesoConfianca
    const pesoConfirmacoes = Math.min(c.quantidadeConfirmacoes / 10, 1) * cfg.pesoConfirmacoes

    const diasDesdeCriacao = (agora - c.criadoEm.getTime()) / (1000 * 60 * 60 * 24)
    const pesoRecencia = Math.max(0, 1 - diasDesdeCriacao / 365) * cfg.pesoRecencia

    return acc + pesoConfianca + pesoConfirmacoes + pesoRecencia
  }, 0)

  const pesoMaximo = cfg.pesoConfianca + cfg.pesoConfirmacoes + cfg.pesoRecencia
  const confianca = (totalPeso / itens.length / pesoMaximo) * 100

  return Math.round(Math.min(confianca, 100))
}

function gerarResumo(itens: ConhecimentoParaSintese[]): string {
  const descricoes = itens.map((c) => c.descricao.toLowerCase())

  const tokensComuns = descricoes
    .map((d) => tokenizar(d))
    .reduce((acc, tokens) => {
      for (const t of tokens) {
        acc.set(t, (acc.get(t) ?? 0) + 1)
      }
      return acc
    }, new Map<string, number>())

  const termosFrequentes = [...tokensComuns.entries()]
    .filter(([, count]) => count >= Math.ceil(itens.length * 0.5))
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([termo]) => termo)

  if (termosFrequentes.length === 0) {
    return `Síntese de ${itens.length} conhecimentos na categoria ${itens[0].categoria.toLowerCase()}`
  }

  return `Síntese baseada em ${itens.length} conhecimentos sobre: ${termosFrequentes.join(', ')}`
}

export async function gerarSintese(
  grupo: GrupoSintese,
  config?: Partial<SynthesisConfig>
): Promise<Sintese> {
  const cfg = { ...SYNTHESIS_CONFIG, ...config }

  const inicio = Date.now()

  const score = calcularScore(grupo.itens)
  const confianca = calcularConfianca(grupo.itens, cfg)
  const resumo = gerarResumo(grupo.itens)
  const fontes = [...new Set(grupo.itens.map((c) => c.origem).filter(Boolean))]

  stats.sintesesGeradas++
  stats.conhecimentosConsolidados += grupo.itens.length

  return {
    id: gerarId(),
    grupoId: grupo.id,
    categoria: grupo.categoria,
    resumo,
    quantidadeConhecimentos: grupo.itens.length,
    fontes,
    scoreAgregado: score,
    confiancaConsolidada: confianca,
    timestamp: new Date(),
    valida: true,
  }
}

export function validarSintese(
  grupo: GrupoSintese,
  sintese: Sintese,
  config?: Partial<SynthesisConfig>
): boolean {
  const cfg = { ...SYNTHESIS_CONFIG, ...config }

  if (grupo.itens.length < cfg.minimoItens) return false
  if (grupo.similaridadeMedia < cfg.similaridadeMinima) return false

  const scores = grupo.itens.map((c) => c.scoreConfianca)
  const media = scores.reduce((a, b) => a + b, 0) / scores.length
  const variancia = scores.reduce((acc, s) => acc + (s - media) ** 2, 0) / scores.length
  if (variancia > 500) return false

  return true
}

// ─── Execução completa ──────────────────────────────────────────────────────

export async function executarSintese(
  empresaId: string,
  config?: Partial<SynthesisConfig>
): Promise<ResultadoSintese> {
  const inicio = Date.now()
  const cfg = { ...SYNTHESIS_CONFIG, ...config }

  const grupos = await identificarGrupos(empresaId, cfg)
  const sinteses: Sintese[] = []

  for (const grupo of grupos) {
    const sintese = await gerarSintese(grupo, cfg)
    const valida = validarSintese(grupo, sintese, cfg)

    if (valida) {
      sinteses.push({ ...sintese, valida: true })

      void registrarNaMemoria(empresaId, {
        tipo: 'evolucao',
        descricao: `Síntese gerada: ${sintese.resumo} (${sintese.quantidadeConhecimentos} conhecimentos, confiança ${sintese.confiancaConsolidada}%)`,
        categoria: sintese.categoria as CategoriaEvidencia,
        versao: 0,
        metadados: { sinteseId: sintese.id, grupoId: grupo.id, scoreAgregado: sintese.scoreAgregado },
      })
    }
  }

  const duracao = Date.now() - inicio
  totalTimeMs += duracao
  totalExecucoes++
  stats.tempoMedioMs = totalExecucoes > 0 ? Math.round(totalTimeMs / totalExecucoes) : 0

  return {
    empresaId,
    data: new Date().toISOString(),
    grupos,
    sinteses,
    resumo: {
      totalGrupos: grupos.length,
      totalSinteses: sinteses.length,
      conhecimentosConsolidados: sinteses.reduce((acc, s) => acc + s.quantidadeConhecimentos, 0),
    },
  }
}
