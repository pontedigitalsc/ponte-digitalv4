import { prismaSeguro as prisma } from '@/lib/prisma-tenant-safe'

// ─── P53 — PILARES 5, 6 e 12: A LINHA DA VIDA ────────────────────────────────
// Toda empresa possui uma biografia — não um histórico. Uma história que cresce
// durante anos e nunca é apagada (P5). Além da empresa, a Ponte acompanha o
// empresário: clareza, confiança, maturidade, capacidade de decisão (P6). O
// objetivo não é medir pessoas — é mostrar crescimento (P12, Índice de Clareza).
// Tudo derivado de registros reais, sem invenção.

export interface MarcoVida {
  mes: string
  titulo: string
  descricao: string
  icone: string
}

export interface DimensaoFundador {
  dimensao: string
  nivel: 'observando' | 'crescendo' | 'consolidada'
  descricao: string
  progresso: number
}

export interface EvolucaoFundador {
  dimensoes: DimensaoFundador[]
  comparacao: string | null
  indiceClareza: number | null
  clarezaTexto: string | null
}

export interface LinhaDaVida {
  empresa: { marcos: MarcoVida[]; resumo: string }
  fundador: EvolucaoFundador
}

const MESES = [
  'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
  'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro',
]

function chaveMes(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
}

function rotuloMes(chave: string): string {
  const [ano, mes] = chave.split('-')
  const nome = MESES[Number(mes) - 1] ?? mes
  const n = Number(mes)
  return n === 1 || n === 12 ? `${nome.charAt(0).toUpperCase() + nome.slice(1)} de ${ano}` : `${nome.charAt(0).toUpperCase() + nome.slice(1)} de ${ano}`
}

function nivelDe(progresso: number): 'observando' | 'crescendo' | 'consolidada' {
  if (progresso < 25) return 'observando'
  if (progresso < 70) return 'crescendo'
  return 'consolidada'
}

async function obterMarcosEmpresa(empresaId: string): Promise<{ marcos: MarcoVida[]; resumo: string }> {
  const [conversas, aprendizados, outcomes, conhecimentos] = await Promise.all([
    prisma.conversa.findMany({
      where: { empresaId, deletedAt: null },
      select: { criadaEm: true },
      orderBy: { criadaEm: 'asc' },
    }),
    prisma.aprendizado.findMany({
      where: { empresaId, deletedAt: null },
      select: { criadoEm: true, descricao: true },
      orderBy: { criadoEm: 'asc' },
    }),
    prisma.outcome.findMany({
      where: { empresaId, deletedAt: null },
      select: { criadoEm: true, descricao: true },
      orderBy: { criadoEm: 'asc' },
    }),
    prisma.conhecimentoColetivo.findMany({
      where: { empresaOrigemId: empresaId, deletedAt: null },
      select: { criadoEm: true, titulo: true },
      orderBy: { criadoEm: 'asc' },
    }),
  ])

  const porMes = new Map<string, { conversas: number; aprendizados: string[]; outcomes: string[]; conhecimentos: string[] }>()
  const acumular = (chave: string) => {
    if (!porMes.has(chave)) porMes.set(chave, { conversas: 0, aprendizados: [], outcomes: [], conhecimentos: [] })
    return porMes.get(chave)!
  }

  for (const c of conversas) acumular(chaveMes(c.criadaEm)).conversas++
  for (const a of aprendizados) acumular(chaveMes(a.criadoEm)).aprendizados.push(a.descricao)
  for (const o of outcomes) acumular(chaveMes(o.criadoEm)).outcomes.push(o.descricao)
  for (const k of conhecimentos) acumular(chaveMes(k.criadoEm)).conhecimentos.push(k.titulo)

  const marcos: MarcoVida[] = []
  for (const [chave, dados] of [...porMes.entries()].sort((a, b) => a[0].localeCompare(b[0]))) {
    const linhas: string[] = []
    if (dados.conversas > 0) linhas.push(`você conversou ${dados.conversas} vez${dados.conversas > 1 ? 'es' : ''} comigo`)
    if (dados.aprendizados.length > 0) linhas.push(`registramos ${dados.aprendizados.length} aprendizado${dados.aprendizados.length > 1 ? 's' : ''}`)
    if (dados.outcomes.length > 0) linhas.push(`resultados começaram a aparecer: ${dados.outcomes.slice(0, 2).join('; ')}`)
    if (dados.conhecimentos.length > 0) linhas.push(`uma descoberta virou conhecimento coletivo: ${dados.conhecimentos[0]}`)

    if (linhas.length === 0) continue

    const titulo =
      dados.conhecimentos.length > 0 ? 'Um marco de conhecimento'
        : dados.outcomes.length > 0 ? 'Resultados registrados'
          : dados.aprendizados.length > 0 ? 'Novos aprendizados'
            : 'Meses de conversa'

    marcos.push({
      mes: rotuloMes(chave),
      titulo,
      descricao: linhas.join('. ') + '.',
      icone: dados.conhecimentos.length > 0 ? '💎' : dados.outcomes.length > 0 ? '🎯' : dados.aprendizados.length > 0 ? '📚' : '💬',
    })
  }

  const resumo =
    marcos.length > 0
      ? `Sua biografia já tem ${marcos.length} mes${marcos.length > 1 ? 'es' : ''} com marcos escritos. Ela cresce a cada conversa — e nunca é apagada.`
      : 'Sua biografia começa a ser escrita na primeira conversa. Ela cresce durante anos — e nunca é apagada.'

  return { marcos, resumo }
}

async function obterEvolucaoFundador(empresaId: string): Promise<EvolucaoFundador> {
  const [memorias, perguntasVivas, aprendizados, outcomes] = await Promise.all([
    prisma.memoriaEmocional.findMany({
      where: { empresaId, deletedAt: null },
      select: { tipo: true, sentimento: true, criadaEm: true },
      orderBy: { criadaEm: 'asc' },
    }),
    prisma.perguntaViva.findMany({
      where: { empresaId, deletedAt: null, estado: 'RESPONDIDA', resposta: { not: null } },
      select: { id: true },
    }),
    prisma.aprendizado.count({ where: { empresaId, deletedAt: null } }),
    prisma.outcome.count({ where: { empresaId, deletedAt: null } }),
  ])

  const negativos = new Set(['inseguranca', 'ansiedade', 'peso'])
  const positivos = new Set(['confianca', 'realizacao'])

  const negativas = memorias.filter((m) => negativos.has(m.tipo)).length
  const positivas = memorias.filter((m) => positivos.has(m.tipo)).length

  const clareza = Math.min(perguntasVivas.length * 20, 100)
  const confianca = positivas + negativas > 0 ? Math.min(Math.round((positivas / Math.max(positivas + negativas, 1)) * 100), 100) : 10
  const maturidade = Math.min(aprendizados * 20, 100)
  const decisao = Math.min(outcomes * 25, 100)

  const dimensoes: DimensaoFundador[] = [
    {
      dimensao: 'Clareza',
      nivel: nivelDe(clareza),
      descricao:
        perguntasVivas.length > 0
          ? `${perguntasVivas.length} pergunta(s) já resolvida(s) — decisões cada vez mais ancoradas`
          : 'Ainda estamos mapeando as prioridades juntos',
      progresso: clareza,
    },
    {
      dimensao: 'Confiança',
      nivel: nivelDe(confianca),
      descricao:
        positivas + negativas > 0
          ? `predominância de ${positivas >= negativas ? 'momentos de força' : 'momentos de peso'} nas nossas conversas`
          : 'Ainda não temos memórias suficientes para falar com segurança',
      progresso: confianca,
    },
    {
      dimensao: 'Maturidade',
      nivel: nivelDe(maturidade),
      descricao:
        aprendizados > 0
          ? `${aprendizados} aprendizado(s) registrados no patrimônio da empresa`
          : 'O primeiro aprendizado vem na primeira conversa',
      progresso: maturidade,
    },
    {
      dimensao: 'Capacidade de decisão',
      nivel: nivelDe(decisao),
      descricao:
        outcomes > 0
          ? `${outcomes} resultado(s) registrado(s) — decisões virando realidade`
          : 'As primeiras decisões ainda estão sendo construídas',
      progresso: decisao,
    },
  ]

  // Comparação honesta entre o início e o momento atual da relação.
  let comparacao: string | null = null
  if (memorias.length >= 4) {
    const metade = Math.floor(memorias.length / 2)
    const iniciais = memorias.slice(0, metade)
    const recentes = memorias.slice(metade)
    const pesoInicial = iniciais.filter((m) => negativos.has(m.tipo)).length
    const pesoRecente = recentes.filter((m) => negativos.has(m.tipo)).length
    const forcaInicial = iniciais.filter((m) => positivos.has(m.tipo)).length
    const forcaRecente = recentes.filter((m) => positivos.has(m.tipo)).length
    if (pesoRecente < pesoInicial) {
      comparacao = 'No início você tomava decisões reagindo aos problemas. Hoje percebemos que você antecipa muitos deles.'
    } else if (forcaRecente > forcaInicial) {
      comparacao = 'No início você carregava o peso sozinho. Hoje suas conquistas aparecem com mais regularidade.'
    }
  }

  const indiceClareza = Math.round(dimensoes.reduce((soma, d) => soma + d.progresso, 0) / dimensoes.length)
  const clarezaTexto =
    indiceClareza >= 70
      ? 'Sua clareza aumentou. As decisões importantes já seguem um padrão.'
      : indiceClareza >= 30
        ? 'Sua clareza está crescendo — cada conversa dá mais forma às prioridades.'
        : 'Estamos começando a construir a sua clareza juntos.'

  return { dimensoes, comparacao, indiceClareza, clarezaTexto }
}

export async function obterLinhaDaVida(empresaId: string): Promise<LinhaDaVida> {
  const [empresa, fundador] = await Promise.all([
    obterMarcosEmpresa(empresaId),
    obterEvolucaoFundador(empresaId),
  ])
  return { empresa, fundador }
}
