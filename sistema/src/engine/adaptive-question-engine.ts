import { prismaSeguro as prisma } from '@/lib/prisma-tenant-safe'
import { buscarSituacaoEmpresa } from './cognitive-context-engine'
import { consultarMemoria, listarHipoteses } from './cognitive-memory-engine'
import { listarRespostasPorEmpresa } from './question-answer-engine'
import { createLogger } from '@/lib/logger'
import type { CategoriaEvidencia } from './evidence-engine'

const log = createLogger('engine', 'adaptive-question')

export interface AdaptiveQuestion {
  id: string
  pergunta: string
  tipo: 'texto' | 'selecao' | 'faixa'
  opcoes?: { valor: string; rotulo: string }[]
  categoria: CategoriaEvidencia
  lacuna: string
  urgencia: number
}

const CATEGORIAS: CategoriaEvidencia[] = [
  'FINANCEIRO', 'CLIENTES', 'OPERACAO', 'GESTAO', 'PESSOAS', 'PRODUTO', 'ESTRATEGIA',
]

const PERGUNTAS_POR_LACUNA: Record<string, { pergunta: string; tipo: 'texto' | 'selecao' | 'faixa'; opcoes?: { valor: string; rotulo: string }[] }> = {
  'segmento': { pergunta: 'Qual o segmento do seu negócio?', tipo: 'texto' },
  'tempo_operacao': { pergunta: 'Há quanto tempo está em operação?', tipo: 'texto' },
  'funcionarios': { pergunta: 'Quantos funcionários, incluindo você?', tipo: 'texto' },
  'faturamento': {
    pergunta: 'Qual o faturamento médio mensal?', tipo: 'faixa',
    opcoes: [
      { valor: 'ate-5k', rotulo: 'Até R$ 5 mil' },
      { valor: '5k-20k', rotulo: 'R$ 5 mil a R$ 20 mil' },
      { valor: '20k-50k', rotulo: 'R$ 20 mil a R$ 50 mil' },
      { valor: '50k-100k', rotulo: 'R$ 50 mil a R$ 100 mil' },
      { valor: '100k+', rotulo: 'Acima de R$ 100 mil' },
    ],
  },
  'aquisicao': { pergunta: 'Como um cliente comum chega até você hoje?', tipo: 'texto' },
  'produto_principal': { pergunta: 'Qual serviço ou produto você mais vende?', tipo: 'texto' },
  'lucro': { pergunta: 'Qual deles dá mais lucro?', tipo: 'texto' },
  'trabalhoso': { pergunta: 'Qual dá mais trabalho para o retorno que gera?', tipo: 'texto' },
  'horas_trabalho': { pergunta: 'Quantas horas por dia você dedica ao negócio?', tipo: 'texto' },
  'contratacao': { pergunta: 'Como você decide se vai contratar alguém?', tipo: 'texto' },
  'promocao': { pergunta: 'Como você decide se vai fazer uma promoção?', tipo: 'texto' },
  'caixa': { pergunta: 'Você acompanha o caixa diariamente, semanalmente ou só quando falta dinheiro?', tipo: 'texto' },
  'decisao_dificil': { pergunta: 'Qual foi a decisão mais difícil que você tomou esta semana?', tipo: 'texto' },
  'insonia': { pergunta: 'O que mais tira o seu sono no negócio hoje?', tipo: 'texto' },
  'repeticao': { pergunta: 'Qual problema se repete, mesmo você já tendo tentado resolver antes?', tipo: 'texto' },
  'perda_dinheiro': { pergunta: 'O que te faz perder dinheiro sem perceber na hora?', tipo: 'texto' },
  'meta': { pergunta: 'Qual é o objetivo principal para os próximos 6 meses?', tipo: 'texto' },
  'automatizar': { pergunta: 'O que você gostaria de automatizar ou parar de fazer manualmente?', tipo: 'texto' },
  'delegar': { pergunta: 'O que você gostaria que alguém resolvesse por você, se pudesse?', tipo: 'texto' },
  'receita_mensal': { pergunta: 'Qual a sua receita mensal aproximada?', tipo: 'texto' },
  'despesas_principais': { pergunta: 'Quais são as principais despesas do negócio?', tipo: 'texto' },
  'margem': { pergunta: 'Você sabe qual a margem dos seus produtos?', tipo: 'selecao', opcoes: [{ valor: 'sim', rotulo: 'Sim' }, { valor: 'nao', rotulo: 'Não' }, { valor: 'parcial', rotulo: 'Mais ou menos' }] },
  'clientes_top': { pergunta: 'Quem são seus melhores clientes?', tipo: 'texto' },
  'clientes_problema': { pergunta: 'Que tipo de cliente dá mais problema?', tipo: 'texto' },
  'concorrencia': { pergunta: 'Quem são seus principais concorrentes?', tipo: 'texto' },
  'diferencial': { pergunta: 'O que te diferencia no mercado?', tipo: 'texto' },
  'crescimento': { pergunta: 'Qual o maior desafio para crescer agora?', tipo: 'texto' },
  'tecnologia': { pergunta: 'Que ferramentas você usa para gerir o negócio?', tipo: 'texto' },
  'equipe': { pergunta: 'Como está composta sua equipe hoje?', tipo: 'texto' },
  'capacitacao': { pergunta: 'Sua equipe tem as habilidades necessárias para os próximos passos?', tipo: 'selecao', opcoes: [{ valor: 'sim', rotulo: 'Sim' }, { valor: 'nao', rotulo: 'Não' }, { valor: 'parcial', rotulo: 'Parcialmente' }] },
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
        })
      }
    }
  }

  return lacunas.sort((a, b) => b.urgencia - a.urgencia)
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

    const topLacuna = lacunas[0]
    const perguntaData = PERGUNTAS_POR_LACUNA[topLacuna.chave]

    if (!perguntaData) return null

    return {
      id: `${topLacuna.categoria.toLowerCase()}.${topLacuna.chave}`,
      pergunta: perguntaData.pergunta,
      tipo: perguntaData.tipo,
      opcoes: perguntaData.opcoes,
      categoria: topLacuna.categoria as CategoriaEvidencia,
      lacuna: topLacuna.chave,
      urgencia: topLacuna.urgencia,
    }
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

    const perguntas: AdaptiveQuestion[] = []
    for (const lacuna of lacunas.slice(0, quantidade)) {
      const perguntaData = PERGUNTAS_POR_LACUNA[lacuna.chave]
      if (perguntaData) {
        perguntas.push({
          id: `${lacuna.categoria.toLowerCase()}.${lacuna.chave}`,
          pergunta: perguntaData.pergunta,
          tipo: perguntaData.tipo,
          opcoes: perguntaData.opcoes,
          categoria: lacuna.categoria as CategoriaEvidencia,
          lacuna: lacuna.chave,
          urgencia: lacuna.urgencia,
        })
      }
    }

    return perguntas
  } catch (err) {
    log.error('Erro ao obter múltiplas perguntas adaptativas', { empresaId, error: err instanceof Error ? err : undefined })
    return []
  }
}
