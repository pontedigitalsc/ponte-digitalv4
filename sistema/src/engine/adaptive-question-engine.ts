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
