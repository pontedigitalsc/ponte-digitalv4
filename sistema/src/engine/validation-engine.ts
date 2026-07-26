import { prismaSeguro as prisma } from '@/lib/prisma-tenant-safe'
import type { Sinal } from './tipos'

export interface ResultadoValidacao {
  valido: boolean
  confianca: number
  inconsistencias: Inconsistencia[]
  sugestoes: string[]
}

export interface Inconsistencia {
  tipo: string
  severidade: 'BAIXA' | 'MEDIA' | 'ALTA'
  descricao: string
  fontes: string[]
}

export interface ValidacaoCruzada {
  dominio: string
  totalSinais: number
  conflitos: number
  taxaConsistencia: number
  inconsistencias: Inconsistencia[]
}

// ─── Matching helpers ──────────────────────────────────────────────

function calcularSobreposicaoPalavras(textoA: string, textoB: string): number {
  const palavrasA = new Set(textoA.toLowerCase().split(/\s+/).filter((p) => p.length > 3))
  const palavrasB = new Set(textoB.toLowerCase().split(/\s+/).filter((p) => p.length > 3))
  if (palavrasA.size === 0 || palavrasB.size === 0) return 0
  let intersecao = 0
  for (const p of palavrasA) {
    if (palavrasB.has(p)) intersecao++
  }
  return intersecao / Math.min(palavrasA.size, palavrasB.size)
}

function correlacionarPorId(texto: string, id: string): boolean {
  return texto.includes(id)
}

// ─── Validation logic (pure) ───────────────────────────────────────

export function validarSinaisCruzado(sinais: Sinal[]): ValidacaoCruzada[] {
  const resultados: ValidacaoCruzada[] = []
  const dominios = [...new Set(sinais.map((s) => s.dominio))]

  for (const dominio of dominios) {
    const sinaisDominio = sinais.filter((s) => s.dominio === dominio)
    const inconsistencias: Inconsistencia[] = []

    const urgencias = sinaisDominio.map((s) => s.urgencia)
    const temAlta = urgencias.includes('alta')
    const temBaixa = urgencias.includes('baixa')
    if (temAlta && temBaixa) {
      inconsistencias.push({
        tipo: 'urgencia_divergente',
        severidade: 'MEDIA',
        descricao: `Sinais de ${dominio} têm urgências conflitantes (alta e baixa)`,
        fontes: [dominio],
      })
    }

    const titulosVistos = new Set<string>()
    for (const s of sinaisDominio) {
      if (titulosVistos.has(s.titulo)) {
        inconsistencias.push({
          tipo: 'sinal_duplicado',
          severidade: 'BAIXA',
          descricao: `Sinal duplicado: "${s.titulo}"`,
          fontes: [dominio],
        })
      }
      titulosVistos.add(s.titulo)
    }

    const conflitos = inconsistencias.length
    const taxaConsistencia = sinaisDominio.length > 0
      ? Math.round(((sinaisDominio.length - conflitos) / sinaisDominio.length) * 100)
      : 100

    resultados.push({
      dominio,
      totalSinais: sinaisDominio.length,
      conflitos,
      taxaConsistencia,
      inconsistencias,
    })
  }

  return resultados
}

// ─── DB access ─────────────────────────────────────────────────────

export async function validarDecisoesComOutcomes(
  empresaId: string,
  dias?: number
): Promise<ResultadoValidacao> {
  const desde = dias ? new Date(Date.now() - dias * 24 * 60 * 60 * 1000) : undefined

  const [decisoes, outcomes] = await Promise.all([
    prisma.acaoCognitiva.findMany({
      where: {
        empresaId,
        ...(desde ? { criadaEm: { gte: desde } } : {}),
      },
      orderBy: { criadaEm: 'desc' },
      take: 200,
    }),
    prisma.outcome.findMany({
      where: {
        empresaId,
        ...(desde ? { criadoEm: { gte: desde } } : {}),
      },
      orderBy: { criadoEm: 'desc' },
      take: 200,
    }),
  ])

  const inconsistencias: Inconsistencia[] = []
  const decisoesSemOutcome = decisoes.filter(
    (d) => d.status === 'CONCLUIDA' && !outcomes.some((o) => correlacionarPorId(o.descricao, d.id))
  )

  if (decisoesSemOutcome.length > 5) {
    inconsistencias.push({
      tipo: 'decisoes_sem_outcome',
      severidade: 'ALTA',
      descricao: `${decisoesSemOutcome.length} decisões concluídas sem outcome registrado`,
      fontes: ['decision-engine', 'outcome-engine'],
    })
  }

  const outcomesSemDecisao = outcomes.filter(
    (o) => o.confianca === 'ALTA' && !decisoes.some((d) => correlacionarPorId(o.descricao, d.id))
  )

  if (outcomesSemDecisao.length > 3) {
    inconsistencias.push({
      tipo: 'outcomes_sem_decisao',
      severidade: 'MEDIA',
      descricao: `${outcomesSemDecisao.length} outcomes de alta confiança sem decisão correspondente`,
      fontes: ['outcome-engine', 'decision-engine'],
    })
  }

  const total = decisoes.length + outcomes.length
  const valido = inconsistencias.filter((i) => i.severidade === 'ALTA').length === 0
  const confianca = total > 0 ? Math.round(((total - inconsistencias.length) / total) * 100) : 100

  return { valido, confianca, inconsistencias, sugestoes: [] }
}

export async function validarConhecimentoComMemoria(
  empresaId: string
): Promise<ResultadoValidacao> {
  const [conhecimentos, memorias] = await Promise.all([
    prisma.conhecimentoValidado.findMany({
      where: { empresaId },
      select: { id: true, descricao: true, scoreConfianca: true },
    }),
    prisma.memoriaCognitiva.findMany({
      where: { empresaId },
      select: { id: true, descricao: true },
      take: 200,
    }),
  ])

  const inconsistencias: Inconsistencia[] = []
  const MIN_SOBREPOSICAO = 0.3

  for (const memoria of memorias) {
    const encontrada = conhecimentos.some((c) =>
      calcularSobreposicaoPalavras(memoria.descricao, c.descricao) >= MIN_SOBREPOSICAO
    )
    if (!encontrada) {
      inconsistencias.push({
        tipo: 'memoria_sem_conhecimento',
        severidade: 'MEDIA',
        descricao: `Memória "${memoria.descricao.slice(0, 60)}..." sem conhecimento validado correspondente`,
        fontes: ['memory-engine', 'governance-engine'],
      })
    }
  }

  const valido = inconsistencias.filter((i) => i.severidade === 'ALTA').length === 0
  const total = conhecimentos.length + memorias.length
  const confianca = total > 0 ? Math.round(((total - inconsistencias.length) / total) * 100) : 100

  return { valido, confianca, inconsistencias, sugestoes: [] }
}
