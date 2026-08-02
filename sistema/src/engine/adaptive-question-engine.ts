import { prismaSeguro as prisma } from '@/lib/prisma-tenant-safe'
import { buscarSituacaoEmpresa } from './cognitive-context-engine'
import { consultarMemoria, listarHipoteses } from './cognitive-memory-engine'
import { listarRespostasPorEmpresa } from './question-answer-engine'
import { createLogger } from '@/lib/logger'
import type { CategoriaEvidencia } from './evidence-engine'
import type { EstagioConselheiro } from './tipos'

const log = createLogger('engine', 'adaptive-question')

// ─── P52 — MOTOR DE QUALIDADE DE PERGUNTAS ───────────────────────────────────
// Cada pergunta da Ponte nasce com um propósito estratégico explícito:
//   estagio       — a qual etapa do conselheiro ela pertence (dos 5 estágios)
//   objetivo      — o que ela precisa descobrir, com a resposta honesta na mão
//   capacidade    — a capacidade empresarial que a pergunta desenvolve
//                   (nomes reais do adaptive-capacity-engine)
//   patrimonio    — o que essa resposta acrescenta ao patrimônio da empresa
//   tipoResposta  — que tipo de resposta ela espera (fato, percepção, reflexão...)
//   impacto       — o que essa informação muda na relação/evolução
// Nenhuma pergunta entra na conversa sem responder a essas 6 questões.

export interface QualidadePergunta {
  estagio: EstagioConselheiro
  objetivo: string
  capacidade: string
  patrimonio: string
  tipoResposta: 'fato' | 'percepcao' | 'reflexao' | 'decisao' | 'planejamento' | 'padrao'
  impacto: string
}

export interface AdaptiveQuestion {
  id: string
  pergunta: string
  tipo: 'texto' | 'selecao' | 'faixa'
  opcoes?: { valor: string; rotulo: string }[]
  categoria: CategoriaEvidencia
  lacuna: string
  urgencia: number
  estagio: EstagioConselheiro
  objetivo: string
  capacidade: string
  patrimonio: string
  tipoResposta: QualidadePergunta['tipoResposta']
  impacto: string
}

const CATEGORIAS: CategoriaEvidencia[] = [
  'FINANCEIRO', 'CLIENTES', 'OPERACAO', 'GESTAO', 'PESSOAS', 'PRODUTO', 'ESTRATEGIA',
]

const PERGUNTAS_POR_LACUNA: Record<string, { pergunta: string; tipo: 'texto' | 'selecao' | 'faixa'; opcoes?: { valor: string; rotulo: string }[] }> = {
  'segmento': { pergunta: 'Como você descreveria o ramo da sua empresa?', tipo: 'texto' },
  'tempo_operacao': { pergunta: 'Há quanto tempo essa empresa vem acontecendo?', tipo: 'texto' },
  'funcionarios': { pergunta: 'Quantas pessoas fazem parte da empresa hoje, contando com você?', tipo: 'texto' },
  'faturamento': {
    pergunta: 'Mais ou menos, quanto a empresa movimenta por mês?', tipo: 'faixa',
    opcoes: [
      { valor: 'ate-5k', rotulo: 'Até R$ 5 mil' },
      { valor: '5k-20k', rotulo: 'R$ 5 mil a R$ 20 mil' },
      { valor: '20k-50k', rotulo: 'R$ 20 mil a R$ 50 mil' },
      { valor: '50k-100k', rotulo: 'R$ 50 mil a R$ 100 mil' },
      { valor: '100k+', rotulo: 'Acima de R$ 100 mil' },
    ],
  },
  'aquisicao': { pergunta: 'Como um cliente costuma encontrar você?', tipo: 'texto' },
  'produto_principal': { pergunta: 'Qual serviço ou produto sai mais da sua porta?', tipo: 'texto' },
  'lucro': { pergunta: 'Qual deles deixa mais dinheiro no bolso?', tipo: 'texto' },
  'trabalhoso': { pergunta: 'Qual dá mais trabalho para o retorno que gera?', tipo: 'texto' },
  'horas_trabalho': { pergunta: 'Quantas horas por dia a empresa pede de você?', tipo: 'texto' },
  'contratacao': { pergunta: 'Como você decide se está na hora de contratar alguém?', tipo: 'texto' },
  'promocao': { pergunta: 'Como você decide se vale fazer uma promoção?', tipo: 'texto' },
  'caixa': { pergunta: 'Você olha o caixa todo dia, toda semana, ou só quando falta dinheiro?', tipo: 'texto' },
  'decisao_dificil': { pergunta: 'Qual foi a decisão mais difícil desta semana?', tipo: 'texto' },
  'insonia': { pergunta: 'O que mais tira o seu sono no negócio hoje?', tipo: 'texto' },
  'repeticao': { pergunta: 'Qual problema volta a aparecer, mesmo depois de você ter tentado resolver?', tipo: 'texto' },
  'perda_dinheiro': { pergunta: 'Em que lugar o dinheiro escapa sem você perceber na hora?', tipo: 'texto' },
  'meta': { pergunta: 'Qual o objetivo principal para os próximos 6 meses?', tipo: 'texto' },
  'automatizar': { pergunta: 'O que você gostaria de parar de fazer com as próprias mãos?', tipo: 'texto' },
  'delegar': { pergunta: 'Se pudesse, o que você passaria para outra pessoa resolver?', tipo: 'texto' },
  'receita_mensal': { pergunta: 'Quanto a empresa recebe por mês, aproximadamente?', tipo: 'texto' },
  'despesas_principais': { pergunta: 'Para onde vai a maior parte do dinheiro hoje?', tipo: 'texto' },
  'margem': { pergunta: 'Você sabe quanto sobra de cada venda?', tipo: 'selecao', opcoes: [{ valor: 'sim', rotulo: 'Sim' }, { valor: 'nao', rotulo: 'Não' }, { valor: 'parcial', rotulo: 'Mais ou menos' }] },
  'clientes_top': { pergunta: 'Quem são os clientes que você não quer perder de jeito nenhum?', tipo: 'texto' },
  'clientes_problema': { pergunta: 'Que tipo de cliente dá mais dor de cabeça?', tipo: 'texto' },
  'concorrencia': { pergunta: 'Quem mais disputa cliente com você?', tipo: 'texto' },
  'diferencial': { pergunta: 'O que fazem só quando vão a você?', tipo: 'texto' },
  'crescimento': { pergunta: 'O que mais atrapalha a empresa crescer hoje?', tipo: 'texto' },
  'tecnologia': { pergunta: 'O que você usa hoje pra cuidar do negócio — caderno, planilha, aplicativo?', tipo: 'texto' },
  'equipe': { pergunta: 'Como está formada sua equipe hoje?', tipo: 'texto' },
  'capacitacao': { pergunta: 'Sua equipe dá conta do que vem pela frente?', tipo: 'selecao', opcoes: [{ valor: 'sim', rotulo: 'Sim, dá conta' }, { valor: 'nao', rotulo: 'Não, não dá' }, { valor: 'parcial', rotulo: 'Mais ou menos' }] },
}

// Qualidade de cada pergunta — nenhuma lacuna entra na conversa sem propósito.
const QUALIDADE_POR_LACUNA: Record<string, QualidadePergunta> = {
  'segmento': { estagio: 'contexto', objetivo: 'Entender o ramo e o vocabulário do negócio', capacidade: 'Observar', patrimonio: 'Dados', tipoResposta: 'fato', impacto: 'Permite falar a língua da empresa desde o início' },
  'tempo_operacao': { estagio: 'contexto', objetivo: 'Situar a maturidade da operação', capacidade: 'Observar', patrimonio: 'Dados', tipoResposta: 'fato', impacto: 'Ajusta o tom e a profundidade das próximas perguntas' },
  'funcionarios': { estagio: 'contexto', objetivo: 'Saber o tamanho real da operação', capacidade: 'Observar', patrimonio: 'Dados', tipoResposta: 'fato', impacto: 'Revela se a dependência do fundador é estrutural' },
  'faturamento': { estagio: 'realidade', objetivo: 'Ter uma base real do tamanho financeiro', capacidade: 'Compreender', patrimonio: 'Contexto financeiro', tipoResposta: 'fato', impacto: 'Fundamenta recomendações financeiras sem chute' },
  'aquisicao': { estagio: 'contexto', objetivo: 'Entender como os clientes chegam', capacidade: 'Observar', patrimonio: 'Dados de clientes', tipoResposta: 'percepcao', impacto: 'Revela se a captação depende só de indicação' },
  'produto_principal': { estagio: 'realidade', objetivo: 'Identificar o que sustenta a receita', capacidade: 'Compreender', patrimonio: 'Contexto financeiro', tipoResposta: 'fato', impacto: 'Aponta onde concentrar atenção e esforço' },
  'lucro': { estagio: 'realidade', objetivo: 'Descobrir o que realmente dá retorno', capacidade: 'Compreender', patrimonio: 'Contexto financeiro', tipoResposta: 'percepcao', impacto: 'Mostra se a margem é percebida ou medida' },
  'trabalhoso': { estagio: 'tensao', objetivo: 'Encontrar onde o esforço não vira retorno', capacidade: 'Compreender', patrimonio: 'Aprendizado', tipoResposta: 'percepcao', impacto: 'Revela gargalo operacional escondido' },
  'horas_trabalho': { estagio: 'contexto', objetivo: 'Medir o custo de tempo do fundador', capacidade: 'Observar', patrimonio: 'Autonomia', tipoResposta: 'fato', impacto: 'Sustenta conversas honestas sobre delegação' },
  'contratacao': { estagio: 'proximo_movimento', objetivo: 'Entender o critério real de decisão de equipe', capacidade: 'Compreender', patrimonio: 'Decisões', tipoResposta: 'decisao', impacto: 'Revela se a contratação é planejada ou reativa' },
  'promocao': { estagio: 'proximo_movimento', objetivo: 'Entender como precifica promoções', capacidade: 'Decidir', patrimonio: 'Decisões', tipoResposta: 'decisao', impacto: 'Expõe se promoção é estratégia ou desespero' },
  'caixa': { estagio: 'realidade', objetivo: 'Saber como o caixa é acompanhado', capacidade: 'Compreender', patrimonio: 'Contexto financeiro', tipoResposta: 'fato', impacto: 'Base para trabalhar previsibilidade financeira' },
  'decisao_dificil': { estagio: 'tensao', objetivo: 'Mapear onde a decisão trava', capacidade: 'Esclarecer', patrimonio: 'Decisões', tipoResposta: 'percepcao', impacto: 'Localiza o ponto de maior tensão atual' },
  'insonia': { estagio: 'tensao', objetivo: 'Revelar a preocupação que move o fundador', capacidade: 'Observar', patrimonio: 'Contexto', tipoResposta: 'percepcao', impacto: 'Ajuda a priorizar o próximo tema da relação' },
  'repeticao': { estagio: 'tensao', objetivo: 'Encontrar padrões que se repetem', capacidade: 'Aprender', patrimonio: 'Aprendizado', tipoResposta: 'padrao', impacto: 'Converte problema recorrente em aprendizado' },
  'perda_dinheiro': { estagio: 'tensao', objetivo: 'Localizar onde o dinheiro escapa', capacidade: 'Compreender', patrimonio: 'Contexto financeiro', tipoResposta: 'percepcao', impacto: 'Revela vazamentos que passam despercebidos' },
  'meta': { estagio: 'proximo_movimento', objetivo: 'Ter um horizonte claro para orientar decisões', capacidade: 'Priorizar', patrimonio: 'Decisões', tipoResposta: 'planejamento', impacto: 'Define a direção das recomendações futuras' },
  'automatizar': { estagio: 'proximo_movimento', objetivo: 'Descobrir o que o fundador quer tirar das mãos', capacidade: 'Priorizar', patrimonio: 'Autonomia', tipoResposta: 'planejamento', impacto: 'Base para recomendações de operação' },
  'delegar': { estagio: 'proximo_movimento', objetivo: 'Mapear o que pode sair das costas do fundador', capacidade: 'Decidir', patrimonio: 'Autonomia', tipoResposta: 'planejamento', impacto: 'Reduz a dependência do dono' },
  'receita_mensal': { estagio: 'realidade', objetivo: 'Cruzar a percepção de faturamento com os dados', capacidade: 'Compreender', patrimonio: 'Contexto financeiro', tipoResposta: 'fato', impacto: 'Valida se o número percebido bate com o real' },
  'despesas_principais': { estagio: 'realidade', objetivo: 'Entender para onde o dinheiro vai', capacidade: 'Compreender', patrimonio: 'Contexto financeiro', tipoResposta: 'fato', impacto: 'Fundamenta controle de custos sem achismo' },
  'margem': { estagio: 'realidade', objetivo: 'Saber se a margem é conhecida por venda', capacidade: 'Compreender', patrimonio: 'Contexto financeiro', tipoResposta: 'fato', impacto: 'Revela se a lucratividade é medida de verdade' },
  'clientes_top': { estagio: 'evolucao', objetivo: 'Identificar os clientes que sustentam o negócio', capacidade: 'Compreender', patrimonio: 'Dados de clientes', tipoResposta: 'percepcao', impacto: 'Base para estratégia de retenção' },
  'clientes_problema': { estagio: 'tensao', objetivo: 'Reconhecer clientes que drenam energia', capacidade: 'Esclarecer', patrimonio: 'Dados de clientes', tipoResposta: 'padrao', impacto: 'Ajuda a escolher quem merece atenção' },
  'concorrencia': { estagio: 'proximo_movimento', objetivo: 'Entender o campo onde a empresa disputa', capacidade: 'Compreender', patrimonio: 'Contexto', tipoResposta: 'percepcao', impacto: 'Posiciona o diferencial da empresa' },
  'diferencial': { estagio: 'evolucao', objetivo: 'Capturar o motivo real de escolha', capacidade: 'Compreender', patrimonio: 'Aprendizado', tipoResposta: 'percepcao', impacto: 'Alimenta a identidade da empresa' },
  'crescimento': { estagio: 'tensao', objetivo: 'Revelar o que bloqueia o crescimento', capacidade: 'Esclarecer', patrimonio: 'Contexto', tipoResposta: 'padrao', impacto: 'Prioriza a barreira mais importante' },
  'tecnologia': { estagio: 'proximo_movimento', objetivo: 'Entender a base de gestão atual', capacidade: 'Observar', patrimonio: 'Contexto', tipoResposta: 'fato', impacto: 'Orienta se o próximo passo é organização' },
  'equipe': { estagio: 'realidade', objetivo: 'Entender a composição da equipe', capacidade: 'Observar', patrimonio: 'Dados', tipoResposta: 'fato', impacto: 'Base para falar de delegação e treinamento' },
  'capacitacao': { estagio: 'evolucao', objetivo: 'Saber se a equipe acompanha o crescimento', capacidade: 'Aprender', patrimonio: 'Aprendizado', tipoResposta: 'percepcao', impacto: 'Revela o limite de crescimento pela equipe' },
}

const GAPS_POR_CATEGORIA: Record<CategoriaEvidencia, string[]> = {
  FINANCEIRO: ['faturamento', 'receita_mensal', 'despesas_principais', 'margem', 'caixa', 'perda_dinheiro'],
  CLIENTES: ['clientes_top', 'clientes_problema', 'aquisicao', 'concorrencia', 'diferencial'],
  OPERACAO: ['produto_principal', 'lucro', 'trabalhoso', 'horas_trabalho', 'tecnologia'],
  GESTAO: ['contratacao', 'promocao', 'decisao_dificil', 'crescimento', 'repeticao'],
  PESSOAS: ['funcionarios', 'equipe', 'capacitacao', 'delegar'],
  PRODUTO: ['produto_principal', 'lucro', 'diferencial', 'margem'],
  ESTRATEGIA: ['segmento', 'tempo_operacao', 'meta', 'automatizar', 'insonia', 'concorrencia'],
}

interface LacunaConhecimento {
  chave: string
  categoria: string
  urgencia: number
  bloqueia: string[]
  estagio: EstagioConselheiro
}

async function identificarLacunas(
  empresaId: string,
  excluirPerguntasJaRespondidas: string[]
): Promise<LacunaConhecimento[]> {
  const situacao = await buscarSituacaoEmpresa(empresaId)
  const hipoteses = await listarHipoteses(empresaId, true)
  const memoria = await consultarMemoria(empresaId, 5)

  const lacunas: LacunaConhecimento[] = []

  for (const categoria of CATEGORIAS) {
    const gaps = GAPS_POR_CATEGORIA[categoria]
    const evidenciasDaCategoria = situacao.evidencias.filter(e => e.categoria === categoria)
    const hipotesesDaCategoria = hipoteses.filter(h => h.categoria === categoria)
    const temMemoriaRecente = memoria.some(m => m.categoria === categoria)

    for (const gap of gaps) {
      if (excluirPerguntasJaRespondidas.includes(gap)) continue

      let urgencia = 1

      if (evidenciasDaCategoria.length === 0) {
        urgencia += 3
      } else if (evidenciasDaCategoria.length < 3) {
        urgencia += 2
      }

      if (hipotesesDaCategoria.length === 0) {
        urgencia += 1
      }

      if (!temMemoriaRecente && evidenciasDaCategoria.length < 2) {
        urgencia += 1
      }

      if (urgencia > 1) {
        lacunas.push({
          chave: gap,
          categoria,
          urgencia,
          bloqueia: hipotesesDaCategoria.length === 0 ? [categoria] : [],
          estagio: QUALIDADE_POR_LACUNA[gap]?.estagio ?? 'contexto',
        })
      }
    }
  }

  return lacunas.sort((a, b) => b.urgencia - a.urgencia)
}

// ─── P52 — FOCO CONTEXTUAL ───────────────────────────────────────────────────
// As perguntas se adaptam ao contexto real da empresa. Detectamos o arquétipo
// a partir dos dados (nunca da intuição):
//   sem movimento no caixa          → previsibilidade → FINANCEIRO
//   receita crescendo rápido        → crescimento     → GESTAO (organização)
//   receita caindo                  → retenção        → CLIENTES
//   clientes inadimplentes          → retenção        → CLIENTES
//   tarefas atrasadas acumulando    → sobrecarga      → GESTAO/PESSOAS
// O arquétipo re-pondera quais lacunas merecem a próxima pergunta.

export interface FocoContextual {
  foco: CategoriaEvidencia | null
  razao: string | null
  estagioPrioritario: EstagioConselheiro
}

export async function detectarFocoContextual(empresaId: string): Promise<FocoContextual> {
  try {
    const situacao = await buscarSituacaoEmpresa(empresaId)
    const v = situacao.variacaoReceita

    if (!situacao.temTransacoesRecentes || situacao.diasSemRegistroFinanceiro >= 7) {
      return { foco: 'FINANCEIRO', razao: 'O caixa está sem movimento recente — quero entender a previsibilidade financeira.', estagioPrioritario: 'tensao' }
    }
    if (v !== null && v >= 20) {
      return { foco: 'GESTAO', razao: 'A receita cresceu rápido — quero entender se a organização acompanhou.', estagioPrioritario: 'proximo_movimento' }
    }
    if (v !== null && v <= -15) {
      return { foco: 'CLIENTES', razao: 'A receita caiu — quero entender o que mudou no comportamento dos clientes.', estagioPrioritario: 'realidade' }
    }
    if (situacao.temClientesInadimplentes) {
      return { foco: 'CLIENTES', razao: 'Há clientes inadimplentes — quero olhar a retenção e o recebimento.', estagioPrioritario: 'tensao' }
    }
    if (situacao.temTarefasAtrasadas) {
      return { foco: 'GESTAO', razao: 'Há tarefas atrasadas — quero entender a organização do dia a dia.', estagioPrioritario: 'realidade' }
    }

    return { foco: null, razao: null, estagioPrioritario: 'contexto' }
  } catch (err) {
    log.error('Erro ao detectar foco contextual', { empresaId, error: err instanceof Error ? err : undefined })
    return { foco: null, razao: null, estagioPrioritario: 'contexto' }
  }
}

function pontuarLacuna(lacuna: LacunaConhecimento, foco: FocoContextual): number {
  let pontos = lacuna.urgencia
  if (foco.foco && lacuna.categoria === foco.foco) pontos += 4
  if (lacuna.estagio === foco.estagioPrioritario) pontos += 3
  if (foco.foco && lacuna.categoria !== foco.foco && lacuna.estagio !== foco.estagioPrioritario) pontos -= 1
  return pontos
}

function montarAdaptiveQuestion(lacuna: LacunaConhecimento): AdaptiveQuestion | null {
  const perguntaData = PERGUNTAS_POR_LACUNA[lacuna.chave]
  const qualidade = QUALIDADE_POR_LACUNA[lacuna.chave]
  if (!perguntaData || !qualidade) return null

  return {
    id: `${lacuna.categoria.toLowerCase()}.${lacuna.chave}`,
    pergunta: perguntaData.pergunta,
    tipo: perguntaData.tipo,
    opcoes: perguntaData.opcoes,
    categoria: lacuna.categoria as CategoriaEvidencia,
    lacuna: lacuna.chave,
    urgencia: lacuna.urgencia,
    estagio: qualidade.estagio,
    objetivo: qualidade.objetivo,
    capacidade: qualidade.capacidade,
    patrimonio: qualidade.patrimonio,
    tipoResposta: qualidade.tipoResposta,
    impacto: qualidade.impacto,
  }
}

export async function obterProximaPergunta(
  empresaId: string,
  token?: string
): Promise<AdaptiveQuestion | null> {
  try {
    const respostasExistentes = await listarRespostasPorEmpresa(empresaId, { limite: 100 })
    const idsRespondidos = new Set(respostasExistentes.map(r => r.perguntaId.split('.').pop() ?? r.perguntaId))

    const lacunas = await identificarLacunas(empresaId, [...idsRespondidos])

    if (lacunas.length === 0) return null

    const foco = await detectarFocoContextual(empresaId)
    const ordenadas = [...lacunas].sort((a, b) => pontuarLacuna(b, foco) - pontuarLacuna(a, foco))

    return montarAdaptiveQuestion(ordenadas[0])
  } catch (err) {
    log.error('Erro ao obter próxima pergunta adaptativa', { empresaId, error: err instanceof Error ? err : undefined })
    return null
  }
}

export async function obterMultiplasPerguntas(
  empresaId: string,
  quantidade: number = 5
): Promise<AdaptiveQuestion[]> {
  try {
    const respostasExistentes = await listarRespostasPorEmpresa(empresaId, { limite: 100 })
    const idsRespondidos = new Set(respostasExistentes.map(r => r.perguntaId.split('.').pop() ?? r.perguntaId))

    const lacunas = await identificarLacunas(empresaId, [...idsRespondidos])
    const foco = await detectarFocoContextual(empresaId)
    const ordenadas = [...lacunas].sort((a, b) => pontuarLacuna(b, foco) - pontuarLacuna(a, foco))

    const perguntas: AdaptiveQuestion[] = []
    for (const lacuna of ordenadas.slice(0, quantidade)) {
      const pergunta = montarAdaptiveQuestion(lacuna)
      if (pergunta) perguntas.push(pergunta)
    }

    return perguntas
  } catch (err) {
    log.error('Erro ao obter múltiplas perguntas adaptativas', { empresaId, error: err instanceof Error ? err : undefined })
    return []
  }
}

// ─── P52 — ETAPA 1: BIBLIOTECA DAS GRANDES PERGUNTAS ─────────────────────────
// Catálogo permanente de perguntas de alto valor, curadas pelo fundador.
// Cada pergunta declara: objetivo, momento ideal, segmentos recomendados,
// capacidade fortalecida e benefício esperado para o empresário.
// Serve de fonte para a criação da Pergunta Aberta da semana.

export interface GrandePergunta {
  id: string
  titulo: string
  pergunta: string
  objetivo: string
  momentoIdeal: string
  segmentos: string[]
  capacidade: string
  beneficio: string
}

export const BIBLIOTECA_GRANDES_PERGUNTAS: GrandePergunta[] = [
  {
    id: 'lideranca.dependencia',
    titulo: 'Liderança',
    pergunta: 'O que hoje depende mais de você do que deveria?',
    objetivo: 'Identificar dependência do fundador e gargalos de delegação.',
    momentoIdeal: 'Empresas que cresceram sem processos formais de gestão.',
    segmentos: ['servicos', 'varejo', 'tecnologia', 'producao'],
    capacidade: 'Adaptação',
    beneficio: 'Fazer o empresário perceber onde ele é o gargalo sem enxergar.',
  },
  {
    id: 'clientes.ideal',
    titulo: 'Clientes',
    pergunta: 'Qual tipo de cliente você gostaria de ter mais?',
    objetivo: 'Entender o posicionamento desejado e o cliente ideal da empresa.',
    momentoIdeal: 'Quando a empresa atende qualquer um que aparece, sem foco.',
    segmentos: [],
    capacidade: 'Clareza estratégica',
    beneficio: 'Gerar clareza sobre para quem a empresa realmente quer vender.',
  },
  {
    id: 'financeiro.tensao',
    titulo: 'Financeiro',
    pergunta: 'Quando você olha para o caixa, qual é a sua maior preocupação?',
    objetivo: 'Descobrir a tensão financeira real, além dos números.',
    momentoIdeal: 'Empresas com fluxo de caixa instável ou sem previsibilidade.',
    segmentos: ['varejo', 'servicos', 'producao', 'alimentacao'],
    capacidade: 'Previsibilidade',
    beneficio: 'Preparar recomendações futuras ancoradas na dor financeira real.',
  },
  {
    id: 'crescimento.gargalos',
    titulo: 'Crescimento',
    pergunta: 'Se sua empresa dobrasse de tamanho amanhã, o que quebraria primeiro?',
    objetivo: 'Encontrar gargalos invisíveis antes de o crescimento revelá-los.',
    momentoIdeal: 'Empresas crescendo ou prestes a escalar operação.',
    segmentos: [],
    capacidade: 'Visão sistêmica',
    beneficio: 'Estimular o empresário a pensar no sistema, não só no dia a dia.',
  },
  {
    id: 'evolucao.aprendizado',
    titulo: 'Evolução',
    pergunta: 'O que sua empresa sabe hoje que não sabia há seis meses?',
    objetivo: 'Transformar experiência acumulada em patrimônio explícito.',
    momentoIdeal: 'Empresas com histórico de conversas e decisões registradas.',
    segmentos: [],
    capacidade: 'Memória empresarial',
    beneficio: 'Fazer o empresário perceber a evolução que ele já construiu.',
  },
  {
    id: 'operacao.ritual',
    titulo: 'Operação',
    pergunta: 'O que você começou a fazer com regularidade e fez diferença?',
    objetivo: 'Identificar rituais que funcionam para virar padrão da empresa.',
    momentoIdeal: 'Após mudanças positivas observadas no período.',
    segmentos: [],
    capacidade: 'Rotina',
    beneficio: 'Transformar boas práticas acidentais em processos conscientes.',
  },
]
