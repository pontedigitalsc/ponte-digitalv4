import { prismaSeguro as prisma } from '@/lib/prisma-tenant-safe'
import { FLUXOS } from '@/engine/fluxos/primeira-conversa'
import { obterReacao, REACOES_BLOCO } from '@/engine/reacoes'
import { registrarEvidencia } from '@/engine/evidence-engine'
import { registrarEventoAtivacao } from '@/engine/founder-activation-engine'
import { registrarResposta } from '@/engine/question-answer-engine'
import { obterProximaPergunta } from '@/engine/adaptive-question-engine'
import type { EstadoConversa, RespostaConversa, Progresso, Fluxo } from '@/engine/tipos'
import { NotFoundError, BusinessRuleError } from '@/lib/app-errors'

const BLOCO_POR_ETAPA: Record<string, string> = {
  'historia.nascer': 'historia',
  'historia.comecar': 'historia',
  'historia.momento': 'historia',
  'historia.orgulho': 'historia',
  'historia.mudanca': 'historia',
  'rotina.dia': 'rotina',
  'rotina.pressao': 'rotina',
  'rotina.cabeca': 'rotina',
  'rotina.tranquilo': 'rotina',
  'rotina.energia': 'rotina',
  'empresa.clientes': 'empresa',
  'empresa.multiplicar': 'empresa',
  'empresa.crescer': 'empresa',
  'empresa.horalivre': 'empresa',
  'empresa.decisao': 'empresa',
  'frente.surpresa': 'frente',
  'frente.funcionou': 'frente',
  'frente.diferente': 'frente',
  'frente.proximo': 'frente',
}

const BLOCO_ORDEM = ['historia', 'rotina', 'empresa', 'frente']

function calcularProgresso(etapaIndex: number, total: number): Progresso {
  if (etapaIndex < 0 || total === 0) {
    return { blocoAtual: 1, totalBlocos: 5, etapaNoBloco: 1, totalEtapasNoBloco: 1, percentual: 0 }
  }

  const idsEtapas = Object.keys(BLOCO_POR_ETAPA)
  const etapaId = idsEtapas[Math.min(etapaIndex, idsEtapas.length - 1)]
  const blocoAtual = BLOCO_POR_ETAPA[etapaId]
  const blocoIdx = BLOCO_ORDEM.indexOf(blocoAtual)

  const etapasNoBloco = idsEtapas.filter((id) => BLOCO_POR_ETAPA[id] === blocoAtual)
  const etapaNoBloco = etapasNoBloco.indexOf(etapaId)

  return {
    blocoAtual: blocoIdx + 1,
    totalBlocos: BLOCO_ORDEM.length,
    etapaNoBloco: etapaNoBloco + 1,
    totalEtapasNoBloco: etapasNoBloco.length,
    percentual: Math.round(((etapaIndex + 1) / idsEtapas.length) * 100),
  }
}

export async function criarConversa(token: string, fluxoId = 'primeira-conversa'): Promise<EstadoConversa> {
  const fluxo = FLUXOS[fluxoId]
  if (!fluxo) throw new NotFoundError(`Fluxo "${fluxoId}" não encontrado`)

  const primeiraEtapa = fluxo.etapas[0]

  await prisma.conversa.create({
    data: {
      token,
      fluxo: fluxoId,
      etapa: primeiraEtapa.id,
      respostas: {},
    },
  })

  return {
    token,
    fluxo: fluxoId,
    etapa: primeiraEtapa.id,
    concluida: false,
    respostas: {},
  }
}

export async function carregarConversa(token: string): Promise<EstadoConversa | null> {
  const conversa = await prisma.conversa.findFirst({
    where: { token, concluida: false },
    orderBy: { criadaEm: 'desc' },
  })
  if (!conversa) return null

  return {
    token: conversa.token,
    fluxo: conversa.fluxo,
    etapa: conversa.etapa ?? undefined,
    concluida: conversa.concluida,
    respostas: conversa.respostas as Record<string, string | null>,
  }
}

export async function responder(
  token: string,
  perguntaId: string,
  valor: string
): Promise<RespostaConversa> {
  const conversa = await prisma.conversa.findFirst({
    where: { token, concluida: false },
    orderBy: { criadaEm: 'desc' },
  })
  if (!conversa) throw new NotFoundError('Conversa não encontrada')
  if (conversa.concluida) throw new BusinessRuleError('Conversa já finalizada')

  const fluxo = FLUXOS[conversa.fluxo]
  if (!fluxo) throw new NotFoundError('Fluxo não encontrado')

  const respostasAtuais = (conversa.respostas as Record<string, string | null>) ?? {}
  respostasAtuais[perguntaId] = valor

  const etapaIndex = fluxo.etapas.findIndex((e) => e.id === perguntaId)

  let proximaEtapa: Fluxo['etapas'][0] | null = null
  let foiConcluida = false

  if (conversa.empresaId) {
    const adaptativa = await obterProximaPergunta(conversa.empresaId, token)
    if (adaptativa) {
      proximaEtapa = {
        id: adaptativa.id,
        pergunta: adaptativa.pergunta,
        tipo: adaptativa.tipo,
        opcoes: adaptativa.opcoes,
        categoria: adaptativa.categoria,
      }
    } else {
      foiConcluida = true
    }
  } else {
    proximaEtapa = fluxo.etapas[etapaIndex + 1] ?? null
    foiConcluida = !proximaEtapa
  }

  const etapaSalvar = proximaEtapa?.id ?? null

  await prisma.conversa.update({
    where: { id: conversa.id },
    data: {
      respostas: respostasAtuais,
      etapa: etapaSalvar,
      concluida: foiConcluida,
    },
  })

  // Reação
  const reacao = obterReacao(perguntaId)

  const reacaoFinal = reacao

  let reacaoExtra = reacaoFinal

  // Registra evidência + Q&A individual (apenas se vinculada a uma empresa)
  if (conversa.empresaId) {
    const blocoAtual = BLOCO_POR_ETAPA[perguntaId] ?? 'gestao'
    const categoriaEvidencia = mapearBlocoParaCategoria(blocoAtual)
    void registrarEvidencia(conversa.empresaId, {
      categoria: categoriaEvidencia,
      origem: 'PRIMEIRA_CONVERSA',
      descricao: `Resposta: ${valor.slice(0, 120)}`,
      confianca: 'ALTA',
      dados: { perguntaId, bloco: blocoAtual },
    })

    void registrarResposta({
      empresaId: conversa.empresaId,
      token,
      perguntaId,
      pergunta: fluxo.etapas.find((e) => e.id === perguntaId)?.pergunta ?? perguntaId,
      valor,
      bloco: blocoAtual,
      origem: 'PRIMEIRA_CONVERSA',
      ordem: etapaIndex,
    })
  }

  // Ativação — conversa concluída
  if (foiConcluida && conversa.empresaId) {
    void registrarEventoAtivacao(conversa.empresaId, 'DIAGNOSTICO_COMPLETO')
    void registrarEventoAtivacao(conversa.empresaId, 'CONVERSA_MENSAL_REALIZADA')
  }

  return {
    reacao: reacaoExtra,
    proximaPergunta: proximaEtapa,
    progresso: calcularProgresso(etapaIndex, fluxo.etapas.length),
    concluida: foiConcluida,
  }
}

function mapearBlocoParaCategoria(bloco: string) {
  const mapa: Record<string, 'FINANCEIRO' | 'CLIENTES' | 'OPERACAO' | 'GESTAO' | 'PESSOAS' | 'PRODUTO' | 'ESTRATEGIA'> = {
    historia: 'GESTAO',
    rotina: 'OPERACAO',
    empresa: 'GESTAO',
    frente: 'ESTRATEGIA',
  }
  return mapa[bloco] ?? 'GESTAO'
}

export async function obterEstado(token: string): Promise<{
  perguntaAtual: Fluxo['etapas'][0] | null
  progresso: Progresso
  concluida: boolean
  respostas: Record<string, string | null>
  reacao?: string
} | null> {
  const estado = await carregarConversa(token)
  if (!estado) return null

  const conversa = await prisma.conversa.findFirst({
    where: { token, concluida: false },
    orderBy: { criadaEm: 'desc' },
    select: { empresaId: true },
  })

  if (conversa?.empresaId && estado.etapa) {
    const adaptativa = await obterProximaPergunta(conversa.empresaId, token)
    if (adaptativa) {
      return {
        perguntaAtual: { id: adaptativa.id, pergunta: adaptativa.pergunta, tipo: adaptativa.tipo, opcoes: adaptativa.opcoes, categoria: adaptativa.categoria },
        progresso: { blocoAtual: 1, totalBlocos: 5, etapaNoBloco: 1, totalEtapasNoBloco: 1, percentual: 50 },
        concluida: false,
        respostas: estado.respostas,
      }
    }
  }

  const fluxo = FLUXOS[estado.fluxo]
  if (!fluxo) return null

  const etapaIndex = fluxo.etapas.findIndex((e) => e.id === estado.etapa)

  return {
    perguntaAtual: estado.etapa ? (fluxo.etapas.find((e) => e.id === estado.etapa) ?? null) : null,
    progresso: calcularProgresso(etapaIndex, fluxo.etapas.length),
    concluida: estado.concluida,
    respostas: estado.respostas,
  }
}

export async function retomarConversa(token: string): Promise<EstadoConversa | null> {
  return carregarConversa(token)
}

export async function vincularConversa(token: string, empresaId: string): Promise<void> {
  await prisma.conversa.updateMany({
    where: { token, empresaId: null },
    data: { empresaId },
  })
}

export async function obterRespostas(token: string): Promise<Record<string, string | null>> {
  const conversa = await prisma.conversa.findFirst({
    where: { token },
    orderBy: { criadaEm: 'desc' },
  })
  if (!conversa) throw new NotFoundError('Conversa não encontrada')
  return (conversa.respostas as Record<string, string | null>) ?? {}
}

export function getFluxoSteps(fluxoId: string) {
  return FLUXOS[fluxoId]?.etapas ?? []
}

