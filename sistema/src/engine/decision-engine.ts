import { listarHipoteses } from './cognitive-memory-engine'
import { acaoAtivaPorDecisao } from './action-intelligence-engine'
import type { CategoriaEvidencia } from './evidence-engine'
import { classificarPrioridade, type EntradaPrioridade } from './priority-engine'
import { obterTodosTrustScores, type TrustScore } from './trust-engine'
import { calcularRelevancia, type ItemRelevancia } from './relevance-engine'
import type { DecisaoContexto } from './cognitive-context-engine'
import { buscarSituacaoEmpresa, type SituacaoEmpresa } from './cognitive-context-engine'

// ─── Tipos ──────────────────────────────────────────────────────────

type Urgencia = 'alta' | 'media' | 'baixa'
type Impacto = 'alto' | 'medio' | 'baixo'
type Dificuldade = 'alta' | 'media' | 'baixa'
type TipoAcao = 'registrar' | 'revisar' | 'contatar' | 'negociar' | 'organizar' | 'mapear' | 'conversar' | 'analisar' | 'planejar'

export interface Decisao {
  id: string
  titulo: string
  descricao: string
  categoria: CategoriaEvidencia
  tipoAcao: TipoAcao
  prioridade: number  // 1-5
  motivo: string
  evidenciasChave: string[]
  confianca: number  // 0-1
  impacto: Impacto
  urgencia: Urgencia
  dificuldade: Dificuldade
  riscos: string[]
  desconhecidos: string[]
  dependencias?: string[]
  expiraEm?: Date
}

// ─── Banco de regras de decisão ──────────────────────────────────────
// Cada regra mapeia um padrão de contexto → uma ou mais decisões.
// Todas são determinísticas e rastreáveis.

interface RegraDecisao {
  id: string
  categoria: CategoriaEvidencia
  tipoAcao: TipoAcao
  titulo: string
  descricao: string
  prioridade: number
  impacto: Impacto
  urgencia: Urgencia
  dificuldade: Dificuldade
  condicao: (params: ContextoDecisao) => { atende: boolean; motivo: string; evidencias: string[]; confianca: number; riscos?: string[]; desconhecidos?: string[] }
  dependencias?: string[]
  expiraEmHoras?: number
}

interface ContextoDecisao {
  empresaId: string
  evidencias: SituacaoEmpresa['evidencias']
  identidade: SituacaoEmpresa['identidade']
  memoria: SituacaoEmpresa['memoria']
  hipoteses: Awaited<ReturnType<typeof listarHipoteses>>
  sinais: SituacaoEmpresa['sinais']
  temTransacoesRecentes: boolean
  temTarefasAtrasadas: boolean
  temLeadsQuentes: boolean
  temClientesInadimplentes: boolean
  diasSemRegistroFinanceiro: number
  totalEvidencias: number
}

const REGRAS: RegraDecisao[] = [
  // ─── FINANCEIRO ─────────────────────────────────────────────────
  {
    id: 'fin-registrar-movimentacao',
    categoria: 'FINANCEIRO',
    tipoAcao: 'registrar',
    titulo: 'Registrar movimentação financeira',
    descricao: 'Lançar receitas e despesas pendentes no sistema',
    prioridade: 5,
    impacto: 'alto',
    urgencia: 'alta',
    dificuldade: 'baixa',
    condicao: (ctx) => {
      if (ctx.diasSemRegistroFinanceiro >= 7) {
        const evidencias = [`${ctx.diasSemRegistroFinanceiro} dias sem movimentação financeira`]
        const motivo = `Há ${ctx.diasSemRegistroFinanceiro} dias não existe movimentação financeira registrada${ctx.hipoteses.some(h => h.descricao.toLowerCase().includes('financeiro')) ? ' e sua principal hipótese atual envolve gestão financeira' : ''}.`
        return { atende: true, motivo, evidencias, confianca: 0.9 }
      }
      return { atende: false, motivo: '', evidencias: [], confianca: 0 }
    },
  },
  {
    id: 'fin-revisar-fluxo-caixa',
    categoria: 'FINANCEIRO',
    tipoAcao: 'revisar',
    titulo: 'Revisar o fluxo de caixa',
    descricao: 'Analisar entradas e saídas dos últimos 30 dias para identificar padrões',
    prioridade: 4,
    impacto: 'alto',
    urgencia: 'media',
    dificuldade: 'baixa',
    condicao: (ctx) => {
      const temSinalFinanceiro = ctx.sinais.some(s => s.dominio === 'financeiro' && s.urgencia === 'alta')
      if (temSinalFinanceiro) {
        return {
          atende: true,
          motivo: 'Os sinais do sistema indicam urgência financeira. Revisar o fluxo de caixa pode evitar surpresas.',
          evidencias: ctx.sinais.filter(s => s.dominio === 'financeiro').map(s => s.titulo),
          confianca: 0.85,
        }
      }
      return { atende: false, motivo: '', evidencias: [], confianca: 0 }
    },
  },
  {
    id: 'fin-negociar-receber',
    categoria: 'FINANCEIRO',
    tipoAcao: 'negociar',
    titulo: 'Negociar contas a receber em atraso',
    descricao: 'Contatar clientes com pagamentos pendentes e renegociar prazos',
    prioridade: 4,
    impacto: 'alto',
    urgencia: 'alta',
    dificuldade: 'media',
    condicao: (ctx) => {
      if (ctx.temClientesInadimplentes) {
        return {
          atende: true,
          motivo: 'Existem clientes inadimplentes. Atrasar a negociação pode comprometer o fluxo de caixa dos próximos meses.',
          evidencias: ['Clientes com status inadimplente identificados no sistema'],
          confianca: 0.8,
        }
      }
      return { atende: false, motivo: '', evidencias: [], confianca: 0 }
    },
  },

  // ─── CLIENTES ───────────────────────────────────────────────────
  {
    id: 'cli-followup-leads',
    categoria: 'CLIENTES',
    tipoAcao: 'contatar',
    titulo: 'Retomar o contato com negociações quentes',
    descricao: 'Negociações avançadas aguardam contato — uma oportunidade pode esfriar',
    prioridade: 5,
    impacto: 'alto',
    urgencia: 'alta',
    dificuldade: 'baixa',
    condicao: (ctx) => {
      if (ctx.temLeadsQuentes) {
        return {
          atende: true,
          motivo: 'Existem negociações em estágio avançado que podem esfriar sem contato. O momento de agir é agora.',
          evidencias: ['Negociações em andamento ou proposta enviada identificadas'],
          confianca: 0.85,
        }
      }
      return { atende: false, motivo: '', evidencias: [], confianca: 0 }
    },
  },
  {
    id: 'cli-revisar-pipeline',
    categoria: 'CLIENTES',
    tipoAcao: 'revisar',
    titulo: 'Revisar as negociações de vendas',
    descricao: 'Analisar as negociações em andamento para identificar onde as oportunidades se perdem',
    prioridade: 3,
    impacto: 'medio',
    urgencia: 'media',
    dificuldade: 'baixa',
    condicao: (ctx) => {
      const sinalClientes = ctx.sinais.some(s => s.dominio === 'clientes')
      if (sinalClientes || ctx.evidencias.some(e => e.categoria === 'CLIENTES' && e.confianca === 'ALTA')) {
        return {
          atende: true,
          motivo: 'Há evidências recentes de movimentação na área de clientes. Revisar as negociações ajuda a não perder oportunidades.',
          evidencias: ['Atividades recentes na área de clientes'],
          confianca: 0.7,
        }
      }
      return { atende: false, motivo: '', evidencias: [], confianca: 0 }
    },
  },

  // ─── GESTAO ─────────────────────────────────────────────────────
  {
    id: 'ges-organizar-tarefas',
    categoria: 'GESTAO',
    tipoAcao: 'organizar',
    titulo: 'Organizar tarefas pendentes',
    descricao: 'Priorizar e distribuir tarefas em aberto para evitar acúmulo',
    prioridade: 4,
    impacto: 'medio',
    urgencia: 'media',
    dificuldade: 'baixa',
    condicao: (ctx) => {
      if (ctx.temTarefasAtrasadas) {
        const qtd = ctx.sinais.filter(s => s.dominio === 'tarefas').length
        return {
          atende: true,
          motivo: `${qtd > 0 ? `${qtd} tarefas estão pendentes ou atrasadas. ` : ''}Organizar agora evita que o acúmulo comprometa prazos futuros.`,
          evidencias: ctx.sinais.filter(s => s.dominio === 'tarefas').map(s => s.titulo),
          confianca: 0.8,
        }
      }
      return { atende: false, motivo: '', evidencias: [], confianca: 0 }
    },
  },

  // ─── OPERACAO ───────────────────────────────────────────────────
  {
    id: 'ope-mapear-gargalos',
    categoria: 'OPERACAO',
    tipoAcao: 'mapear',
    titulo: 'Mapear gargalos operacionais',
    descricao: 'Identificar processos que consomem mais tempo e recursos que deveriam',
    prioridade: 3,
    impacto: 'medio',
    urgencia: 'media',
    dificuldade: 'media',
    condicao: (ctx) => {
      const temEvidenciaOperacao = ctx.evidencias.some(e => e.categoria === 'OPERACAO' && e.confianca === 'ALTA')
      const temHipoteseOperacao = ctx.hipoteses.some(h => h.categoria === 'OPERACAO')
      if (temEvidenciaOperacao || temHipoteseOperacao) {
        return {
          atende: true,
          motivo: 'Existem evidências ou hipóteses sobre desafios operacionais. Mapear gargalos é o primeiro passo para resolvê-los.',
          evidencias: ctx.evidencias.filter(e => e.categoria === 'OPERACAO').slice(0, 2).map(e => e.descricao),
          confianca: 0.65,
        }
      }
      return { atende: false, motivo: '', evidencias: [], confianca: 0 }
    },
  },

  // ─── ESTRATEGIA ─────────────────────────────────────────────────
  {
    id: 'est-primeira-conversa',
    categoria: 'ESTRATEGIA',
    tipoAcao: 'conversar',
    titulo: 'Fazer a Primeira Conversa',
    descricao: 'Responder às perguntas iniciais para que possamos conhecer sua empresa',
    prioridade: 5,
    impacto: 'alto',
    urgencia: 'alta',
    dificuldade: 'baixa',
    condicao: (ctx) => {
      if (ctx.totalEvidencias < 3 && !ctx.identidade) {
        return {
          atende: true,
          motivo: 'Ainda não conhecemos sua empresa. Sem esse conhecimento inicial, não podemos oferecer recomendações precisas.',
          evidencias: ['Nenhuma conversa inicial realizada', `${ctx.totalEvidencias} evidências coletadas`],
          confianca: 0.95,
        }
      }
      return { atende: false, motivo: '', evidencias: [], confianca: 0 }
    },
    dependencias: [],
  },
  {
    id: 'est-revisar-planejamento',
    categoria: 'ESTRATEGIA',
    tipoAcao: 'planejar',
    titulo: 'Revisar o planejamento dos próximos meses',
    descricao: 'Com base no que aprendemos, vale reavaliar prioridades e metas',
    prioridade: 3,
    impacto: 'alto',
    urgencia: 'baixa',
    dificuldade: 'alta',
    condicao: (ctx) => {
      const temMemoriaEstrategica = ctx.memoria.some(m => m.tipo === 'mudanca' || m.tipo === 'descoberta')
      if (temMemoriaEstrategica && ctx.totalEvidencias > 10) {
        return {
          atende: true,
          motivo: 'Nosso entendimento sobre sua empresa evoluiu. Revisar o planejamento com esse novo contexto pode revelar melhores caminhos.',
          evidencias: ctx.memoria.slice(0, 2).map(m => m.descricao),
          confianca: 0.6,
        }
      }
      return { atende: false, motivo: '', evidencias: [], confianca: 0 }
    },
  },

  // ─── PESSOAS ────────────────────────────────────────────────────
  {
    id: 'pes-analisar-equipe',
    categoria: 'PESSOAS',
    tipoAcao: 'analisar',
    titulo: 'Analisar carga de trabalho da equipe',
    descricao: 'Verificar distribuição de tarefas para evitar sobrecarga',
    prioridade: 2,
    impacto: 'medio',
    urgencia: 'baixa',
    dificuldade: 'media',
    condicao: (ctx) => {
      if (ctx.temTarefasAtrasadas && ctx.sinais.filter(s => s.dominio === 'tarefas').length > 3) {
        return {
          atende: true,
          motivo: 'Múltiplas tarefas atrasadas podem indicar sobrecarga da equipe. Uma análise pode revelar se o problema é capacidade ou priorização.',
          evidencias: [`${ctx.sinais.filter(s => s.dominio === 'tarefas').length} sinais de tarefas`],
          confianca: 0.5,
        }
      }
      return { atende: false, motivo: '', evidencias: [], confianca: 0 }
    },
  },
]

// ─── Engine ─────────────────────────────────────────────────────────

export async function gerarDecisoes(empresaId: string): Promise<Decisao[]> {
  const contexto = await montarContexto(empresaId)
  const decisoes: Decisao[] = []

  for (const regra of REGRAS) {
    const { atende, motivo, evidencias, confianca, riscos, desconhecidos } = regra.condicao(contexto)
    if (!atende) continue

    const acaoAtiva = await acaoAtivaPorDecisao(empresaId, regra.id)
    if (acaoAtiva) continue

    decisoes.push({
      id: regra.id,
      titulo: regra.titulo,
      descricao: regra.descricao,
      categoria: regra.categoria,
      tipoAcao: regra.tipoAcao,
      prioridade: regra.prioridade,
      motivo,
      evidenciasChave: evidencias,
      confianca,
      impacto: regra.impacto,
      urgencia: regra.urgencia,
      dificuldade: regra.dificuldade,
      riscos: riscos ?? gerarRiscosPadrao(regra.categoria, regra.tipoAcao),
      desconhecidos: desconhecidos ?? gerarDesconhecidosPadrao(regra.categoria, contexto),
      dependencias: regra.dependencias,
      expiraEm: regra.expiraEmHoras
        ? new Date(Date.now() + regra.expiraEmHoras * 60 * 60 * 1000)
        : undefined,
    })
  }

  return decisoes.sort((a, b) => b.prioridade - a.prioridade || b.confianca - a.confianca)
}

export async function melhorDecisao(empresaId: string): Promise<Decisao | null> {
  const decisoes = await gerarDecisoes(empresaId)
  return decisoes.length > 0 ? decisoes[0] : null
}

export async function registrarExecucaoDecisao(
  empresaId: string,
  decisaoId: string,
  titulo: string,
  categoria: string,
) {
  const { registrarEvidencia } = await import('./evidence-engine')
  await registrarEvidencia(empresaId, {
    categoria: categoria as CategoriaEvidencia,
    origem: 'SISTEMA',
    descricao: `Decisão executada: ${titulo}`,
    confianca: 'ALTA',
    dados: { decisaoId, executadaEm: new Date().toISOString() },
  })
}

// ─── Helpers ────────────────────────────────────────────────────────

function gerarRiscosPadrao(categoria: string, tipoAcao: string): string[] {
  const mapa: Record<string, string[]> = {
    FINANCEIRO: ['Decisão baseada em dados financeiros parciais', 'Mudanças no mercado podem alterar o cenário'],
    CLIENTES: ['Cliente pode não responder ao contato', 'Priorização pode deixar outras negociações sem atenção'],
    GESTAO: ['Mudanças na gestão podem encontrar resistência interna', 'Resultados podem levar tempo para aparecer'],
    OPERACAO: ['Intervenções operacionais podem causar curto prazo instável', 'Gargalos podem ter causas não mapeadas'],
    ESTRATEGIA: ['Decisão estratégica requer validação com dados adicionais', 'Cenário econômico pode mudar'],
    PESSOAS: ['Mudanças na equipe podem gerar desconforto inicial', 'Capacitação requer investimento de tempo'],
    PRODUTO: ['Mudanças no produto podem afetar clientes existentes', 'Retorno pode não ser imediato'],
  }
  return mapa[categoria] ?? ['Impacto pode variar conforme fatores externos', 'Dados insuficientes para prever efeitos colaterais']
}

function gerarDesconhecidosPadrao(categoria: string, contexto: ContextoDecisao): string[] {
  const desconhecidos: string[] = []

  const temHipotese = contexto.hipoteses.some(h => h.categoria === categoria)
  if (!temHipotese) {
    desconhecidos.push('Não temos uma hipótese formal sobre esta área ainda')
  }

  const evidenciasRecentes = contexto.evidencias.filter(e => e.categoria === categoria).length
  if (evidenciasRecentes < 5) {
    desconhecidos.push(`Apenas ${evidenciasRecentes} evidências coletadas — podem não contar a história completa`)
  }

  if (!contexto.identidade) {
    desconhecidos.push('A identidade digital da empresa ainda não foi completamente formada')
  }

  if (desconhecidos.length === 0) {
    desconhecidos.push('Cenários futuros imprevistos podem alterar as premissas atuais')
  }

  return desconhecidos
}

async function montarContexto(empresaId: string): Promise<ContextoDecisao> {
  const situacao = await buscarSituacaoEmpresa(empresaId)
  const hipoteses = await listarHipoteses(empresaId, true)

  return {
    empresaId: situacao.empresaId,
    evidencias: situacao.evidencias,
    identidade: situacao.identidade,
    memoria: situacao.memoria,
    hipoteses,
    sinais: situacao.sinais,
    temTransacoesRecentes: situacao.temTransacoesRecentes,
    temTarefasAtrasadas: situacao.temTarefasAtrasadas,
    temLeadsQuentes: situacao.temLeadsQuentes,
    temClientesInadimplentes: situacao.temClientesInadimplentes,
    diasSemRegistroFinanceiro: situacao.diasSemRegistroFinanceiro,
    totalEvidencias: situacao.evidencias.length,
  }
}

// ─── PTR Integration (WP-5.4) ───────────────────────────────────────────

export function classificarDecisoesPorPrioridade(
  decisoes: Decisao[],
  entradaPrioridade: EntradaPrioridade
): Array<Decisao & { classificacaoPrioridade: ReturnType<typeof classificarPrioridade> }> {
  const classificacao = classificarPrioridade(entradaPrioridade)
  return decisoes.map((d) => {
    const scorePrioridade = classificacao.score / 20
    return {
      ...d,
      prioridade: Math.max(1, Math.min(5, Math.round(scorePrioridade))),
      classificacaoPrioridade: classificacao,
    }
  })
}

export async function enriquecerDecisoesComTrust(
  decisoes: Decisao[],
  empresaId: string
): Promise<Array<Decisao & { trustScore: TrustScore | null }>> {
  const todosScores = await obterTodosTrustScores(empresaId)
  const mapa = new Map(todosScores.map((t) => [t.nomeFonte, t]))
  return decisoes.map((d) => ({
    ...d,
    trustScore: mapa.get(d.categoria) ?? null,
  }))
}

export function filtrarDecisoesPorRelevancia(
  decisoes: Array<Decisao & { trustScore?: TrustScore | null }>,
  contexto?: DecisaoContexto
): Array<Decisao & { relevancia: number; trustScore?: TrustScore | null }> {
  const trustScores = new Map<string, TrustScore>()
  for (const d of decisoes) {
    if (d.trustScore) trustScores.set(d.categoria, d.trustScore)
  }

  const itens: ItemRelevancia[] = decisoes.map((d) => ({
    id: d.id,
    tipo: d.categoria,
    descricao: d.titulo,
    data: new Date(),
    trustScore: d.trustScore?.scoreAtual ?? 50,
    relevancia: 0,
    prioridade: String(d.prioridade),
  }))

  const filtrados = itens.map((item) => {
    const trust = trustScores.get(item.tipo) ?? null
    const relevancia = calcularRelevancia(
      { id: item.id, tipo: item.tipo, descricao: item.descricao, data: item.data },
      trust,
      contexto
    )
    return { ...item, relevancia }
  })

  return decisoes.map((d, i) => ({
    ...d,
    trustScore: decisoes[i].trustScore,
    relevancia: filtrados[i]?.relevancia ?? 50,
  }))
}
