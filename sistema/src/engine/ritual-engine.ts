import { prismaSeguro as prisma } from '@/lib/prisma-tenant-safe'
import { detectarMomentoEmpresa, type MomentoEmpresa } from './momento-engine'
import { decidirContexto } from './cognitive-context-engine'
import { melhorDecisao } from './decision-engine'

// ─── P53 — PILAR 1, 3, 7, 8, 13, 14: O RITUAL DIÁRIO ─────────────────────────
// A abertura nunca começa mostrando informações. Ela começa acolhendo.
//   Pilares 1 e 3 — conversas vivas: o foco muda conforme dia da semana e
//                    fase do mês (segunda = planejamento, quarta = acompanhamento,
//                    sexta = reflexão, início do mês = direção, fim = aprendizado).
//   Pilares 7 e 8 — descobertas espontâneas e silêncio inteligente: a Ponte
//                    percebe mudanças reais e observa; quando nada mudou, o
//                    silêncio também gera confiança.
//   Pilar 13 — o próximo melhor movimento: sempre UM, nunca uma lista.
//   Pilar 14 — conversas que permanecem: uma pergunta que o empresário leva
//                    consigo depois que fecha a Ponte.

export interface FocoDoDia {
  rotulo: string
  orientacao: string
}

export interface PercepcaoPonte {
  tipo: 'observacao' | 'silencio'
  texto: string
}

export interface RitualDiario {
  saudacao: string
  focoDoDia: FocoDoDia
  momento: {
    momento: MomentoEmpresa
    rotulo: string
    postura: string
    razao: string
  }
  percepcao: PercepcaoPonte
  proximoMovimento: string
  perguntaQueFica: string
}

const CATEGORIA_LABEL: Record<string, string> = {
  FINANCEIRO: 'o financeiro',
  CLIENTES: 'os clientes',
  OPERACAO: 'a operação',
  GESTAO: 'a gestão',
  PESSOAS: 'as pessoas',
  PRODUTO: 'o produto',
  ESTRATEGIA: 'a estratégia',
}

const PERGUNTAS_QUE_FICAM: Record<MomentoEmpresa, string> = {
  CRESCENDO: 'Se a empresa dobrasse de tamanho amanhã, o que quebraria primeiro?',
  DESACELERANDO: 'Existe alguma decisão que você está adiando há tempo demais?',
  ESTAGNADA: 'Se nada mudar nos próximos seis meses, qual seria o maior risco?',
  SOBRECARREGADA: 'O que está consumindo energia demais e poderia ser dividido?',
  COMEMORANDO: 'Qual conquista você ainda não comemorou direito?',
  EM_RECUPERACAO: 'O que precisa continuar acontecendo para essa recuperação se sustentar?',
}

function saudacao(agora: Date, nome: string): string {
  const hora = agora.getHours()
  const base = hora < 12 ? 'Bom dia' : hora < 18 ? 'Boa tarde' : 'Boa noite'
  return nome ? `${base}, ${nome}.` : `${base}.`
}

function focoDoDia(agora: Date): FocoDoDia {
  const dia = agora.getDate()
  const ultimoDia = new Date(agora.getFullYear(), agora.getMonth() + 1, 0).getDate()
  const diaSemana = agora.getDay()

  if (dia <= 3) {
    return {
      rotulo: 'Início do mês — direção',
      orientacao: 'Antes de qualquer coisa, vale confirmar a direção do mês: qual resultado importa de verdade agora?',
    }
  }
  if (dia >= ultimoDia - 2) {
    return {
      rotulo: 'Fim do mês — aprendizado',
      orientacao: 'Antes de virar a página do mês, vale perguntar: o que este mês ensinou para a empresa?',
    }
  }
  switch (diaSemana) {
    case 1:
      return {
        rotulo: 'Segunda-feira — planejamento',
        orientacao: 'Dia de olhar para frente: o que a semana precisa que esteja pronto?',
      }
    case 3:
      return {
        rotulo: 'Quarta-feira — acompanhamento',
        orientacao: 'Meio da semana: o que está no caminho do que planejamos?',
      }
    case 5:
      return {
        rotulo: 'Sexta-feira — reflexão',
        orientacao: 'Fim da semana: o que funcionou e vale repetir na próxima?',
      }
    default:
      return {
        rotulo: 'Um dia para observar',
        orientacao: 'Nem todo dia precisa de movimento. Só observar o presente da empresa já é caminhar.',
      }
  }
}

// Pilar 7 e 8 — descoberta espontânea ou silêncio inteligente. Observamos o
// volume de registros por categoria nas últimas 2 semanas vs. as 2 anteriores.
async function gerarPercepcao(empresaId: string): Promise<PercepcaoPonte> {
  const agora = Date.now()
  const duasSemanas = 14 * 24 * 60 * 60 * 1000
  const [recentes, anteriores] = await Promise.all([
    prisma.evidencia.groupBy({
      by: ['categoria'],
      where: { empresaId, deletedAt: null, criadaEm: { gte: new Date(agora - duasSemanas) } },
      _count: { id: true },
    }),
    prisma.evidencia.count({
      where: {
        empresaId,
        deletedAt: null,
        criadaEm: { gte: new Date(agora - 2 * duasSemanas), lt: new Date(agora - duasSemanas) },
      },
    }),
  ])

  const top = [...recentes].sort((a, b) => b._count.id - a._count.id)[0]
  if (top && top._count.id >= 3) {
    const label = CATEGORIA_LABEL[top.categoria] ?? 'informações da empresa'
    return {
      tipo: 'observacao',
      texto: `Nas últimas duas semanas você registrou ${top._count.id} registros sobre ${label}. Esse hábito costuma estar por trás de decisões mais consistentes.`,
    }
  }

  if (anteriores === 0 && recentes.length === 0) {
    return {
      tipo: 'silencio',
      texto: 'Hoje não encontrei nenhuma mudança importante. Continue exatamente como está — isso também gera confiança.',
    }
  }

  return {
    tipo: 'silencio',
    texto: 'Hoje não encontrei nenhuma mudança importante. Continue exatamente como está — isso também gera confiança.',
  }
}

export async function obterRitualDiario(empresaId: string, nome = ''): Promise<RitualDiario> {
  const agora = new Date()
  const primeiroNome = nome.split(' ')[0] ?? ''

  const [momento, contexto, decisao, percepcao] = await Promise.all([
    detectarMomentoEmpresa(empresaId).catch(() => ({
      momento: 'ESTAGNADA' as MomentoEmpresa,
      rotulo: 'Ainda estamos nos conhecendo',
      postura: 'Vamos continuar a conversa para eu entender melhor o momento da sua empresa.',
      razao: 'Ainda estamos juntando os primeiros registros',
    })),
    decidirContexto(empresaId).catch(() => null),
    melhorDecisao(empresaId).catch(() => null),
    gerarPercepcao(empresaId).catch(() => ({
      tipo: 'silencio' as const,
      texto: 'Hoje não encontrei nenhuma mudança importante. Continue exatamente como está — isso também gera confiança.',
    })),
  ])

  // Pilar 13 — sempre UM próximo melhor movimento, nunca uma lista.
  const proximoMovimento =
    decisao?.titulo
    ?? contexto?.acaoSugerida
    ?? 'Continuar nossa conversa é o melhor movimento de hoje.'

  return {
    saudacao: saudacao(agora, primeiroNome),
    focoDoDia: focoDoDia(agora),
    momento: {
      momento: momento.momento,
      rotulo: momento.rotulo,
      postura: momento.postura,
      razao: momento.razao,
    },
    percepcao,
    proximoMovimento,
    perguntaQueFica: PERGUNTAS_QUE_FICAM[momento.momento],
  }
}
