import { prismaSeguro as prisma } from '@/lib/prisma-tenant-safe'
import { FLUXOS } from '@/engine/fluxos/primeira-conversa'
import { montarRitmoCognitivo } from '@/engine/reacoes'
import { registrarEvidencia } from '@/engine/evidence-engine'
import { registrarEventoAtivacao } from '@/engine/founder-activation-engine'
import { registrarResposta } from '@/engine/question-answer-engine'
import { obterProximaPergunta } from '@/engine/adaptive-question-engine'
import { BLOCOS_ORDEM } from '@/engine/tipos'
import type { EstadoConversa, RespostaConversa, Progresso, Fluxo, EstagioConselheiro, Etapa } from '@/engine/tipos'
import { NotFoundError, BusinessRuleError } from '@/lib/app-errors'

// P52 — cada pergunta da primeira conversa pertence a um estágio do conselheiro.
const ESTAGIO_POR_ETAPA: Record<string, EstagioConselheiro> = {
  'empresa.nome': 'contexto',
  'empresa.oque': 'contexto',
  'empresa.haquanto': 'contexto',
  'empresa.momento': 'contexto',
  'empresario.quem': 'contexto',
  'historia.nascer': 'contexto',
  'historia.momento': 'contexto',
  'rotina.pressao': 'realidade',
  'rotina.energia': 'realidade',
  'rotina.cabeca': 'realidade',
  'rotina.tranquilo': 'realidade',
  'empresa.clientes': 'realidade',
  'empresa.crescer': 'tensao',
  'empresa.decisao': 'tensao',
  'empresa.preocupacao': 'tensao',
  'empresa.dependencia': 'tensao',
  'historia.mudanca': 'tensao',
  'frente.diferente': 'tensao',
  'historia.orgulho': 'evolucao',
  'frente.funcionou': 'evolucao',
  'frente.surpresa': 'evolucao',
  'frente.proximo': 'proximo_movimento',
  'empresa.multiplicar': 'proximo_movimento',
  'empresa.horalivre': 'proximo_movimento',
}

// P65 — a conversa muda conforme o empresário responde. Uma etapa só aparece
// se `apenasSe` for satisfeita e é pulada se `pularSe` for satisfeita.
function etapaElegivel(etapa: Etapa, respostas: Record<string, string | null>): boolean {
  const condicao = etapa.condicao
  if (!condicao) return true

  const normalizar = (v: string) => v.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  const contemAlguma = (id: string, palavras: string[]): boolean => {
    const valor = respostas[id] ?? ''
    if (!valor.trim()) return false
    const texto = normalizar(valor)
    return palavras.some((p) => texto.includes(normalizar(p)))
  }

  if (condicao.apenasSe && !contemAlguma(condicao.apenasSe.perguntaId, condicao.apenasSe.palavras)) {
    return false
  }
  if (condicao.pularSe && contemAlguma(condicao.pularSe.perguntaId, condicao.pularSe.palavras)) {
    return false
  }
  return true
}

// Retorna a primeira etapa elegível a partir de `aPartirDe` (inclusive).
function proximaEtapaElegivel(fluxo: Fluxo, respostas: Record<string, string | null>, aPartirDe: number): Etapa | null {
  for (let i = Math.max(aPartirDe, 0); i < fluxo.etapas.length; i++) {
    const etapa = fluxo.etapas[i]
    if (etapaElegivel(etapa, respostas)) return etapa
  }
  return null
}

function calcularProgresso(etapaIndex: number, fluxo: Fluxo): Progresso {
  if (etapaIndex < 0 || fluxo.etapas.length === 0) {
    return { blocoAtual: 1, totalBlocos: BLOCOS_ORDEM.length, etapaNoBloco: 1, totalEtapasNoBloco: 1, percentual: 0 }
  }

  const etapaAtual = fluxo.etapas[etapaIndex]
  const blocoAtual = etapaAtual.bloco ?? BLOCOS_ORDEM[0]
  const blocoIdx = BLOCOS_ORDEM.indexOf(blocoAtual)

  const etapasNoBloco = fluxo.etapas.filter((e) => e.bloco === blocoAtual)
  const posNoBloco = etapasNoBloco.findIndex((e) => e.id === etapaAtual.id)

  return {
    blocoAtual: blocoIdx + 1,
    totalBlocos: BLOCOS_ORDEM.length,
    etapaNoBloco: Math.max(posNoBloco + 1, 1),
    totalEtapasNoBloco: Math.max(etapasNoBloco.length, 1),
    percentual: Math.round(((etapaIndex + 1) / fluxo.etapas.length) * 100),
  }
}

export async function criarConversa(token: string, fluxoId = 'primeira-conversa'): Promise<EstadoConversa> {
  const fluxo = FLUXOS[fluxoId]
  if (!fluxo) throw new NotFoundError(`Fluxo "${fluxoId}" não encontrado`)

  const primeiraEtapa = proximaEtapaElegivel(fluxo, {}, -1) ?? fluxo.etapas[0]

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
        estagio: adaptativa.estagio,
      }
    } else {
      foiConcluida = true
    }
  } else {
    proximaEtapa = proximaEtapaElegivel(fluxo, respostasAtuais, etapaIndex + 1)
    foiConcluida = !proximaEtapa
  }

  const etapaSalvar = proximaEtapa?.id ?? null

  // A conversa só é marcada como concluída no `finalizar` — não aqui.
  // Se a última resposta marcasse `concluida=true`, o POST finalizar
  // (que exige `concluida: false`) falharia com "Conversa já finalizada"
  // e o Retrato nunca chegaria ao empresário. O `foiConcluida` abaixo
  // apenas informa o cliente de que é hora de chamar `/finalizar`.
  await prisma.conversa.update({
    where: { id: conversa.id },
    data: {
      respostas: respostasAtuais,
      etapa: etapaSalvar,
    },
  })

  // Reação — P70: a Ponte conversa entre blocos citando as palavras reais do
  // empresário. Quando a resposta fecha um bloco (próxima etapa de outro bloco,
  // etapa adaptativa ou fim da conversa), a devolutiva referencia a evidência.
  // P65: dentro do mesmo bloco, micro devolutivas/percepção durante a conversa
  // ("Posso compartilhar algo que estou percebendo?") — sempre como hipótese.
  const etapaAtual = fluxo.etapas[etapaIndex]
  const blocoAtual = etapaAtual?.bloco
  const proximoBloco = proximaEtapa?.bloco
  const fechaBloco = !!blocoAtual && (!proximaEtapa || !proximoBloco || proximoBloco !== blocoAtual)

  const reacao = montarRitmoCognitivo({
    perguntaId,
    resposta: valor,
    respostas: respostasAtuais,
    blocoAtual,
    fechaBloco,
  })

  // Registra evidência + Q&A individual (apenas se vinculada a uma empresa)
  if (conversa.empresaId) {
    const blocoDaEtapa = etapaAtual?.bloco
    const blocoDoRegistro = blocoDaEtapa ?? ESTAGIO_POR_ETAPA[perguntaId] ?? categoriaDePerguntaId(perguntaId) ?? 'gestao'
    const categoriaEvidencia = mapearBlocoParaCategoria(blocoDoRegistro)
    void registrarEvidencia(conversa.empresaId, {
      categoria: categoriaEvidencia,
      origem: 'PRIMEIRA_CONVERSA',
      descricao: `Resposta: ${valor.slice(0, 120)}`,
      confianca: 'ALTA',
      dados: { perguntaId, bloco: blocoDoRegistro },
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
    reacao,
    proximaPergunta: proximaEtapa,
    progresso: calcularProgresso(etapaIndex, fluxo),
    concluida: foiConcluida,
  }
}

function categoriaDePerguntaId(perguntaId: string): string | null {
  const prefixo = perguntaId.split('.')[0]?.toUpperCase()
  if (['FINANCEIRO', 'CLIENTES', 'OPERACAO', 'GESTAO', 'PESSOAS', 'PRODUTO', 'ESTRATEGIA'].includes(prefixo)) {
    return prefixo
  }
  return null
}

function mapearBlocoParaCategoria(bloco: string) {
  const mapa: Record<string, 'FINANCEIRO' | 'CLIENTES' | 'OPERACAO' | 'GESTAO' | 'PESSOAS' | 'PRODUTO' | 'ESTRATEGIA'> = {
    contexto: 'GESTAO',
    realidade: 'OPERACAO',
    tensao: 'GESTAO',
    evolucao: 'ESTRATEGIA',
    proximo_movimento: 'ESTRATEGIA',
    // P67 — blocos da Primeira Sessão Estratégica (V4). O bloco `evolucao`
    // já está mapeado acima (mesma regra de classificação do estágio).
    atual: 'GESTAO',
    peso: 'OPERACAO',
    atencao: 'ESTRATEGIA',
    FINANCEIRO: 'FINANCEIRO',
    CLIENTES: 'CLIENTES',
    OPERACAO: 'OPERACAO',
    GESTAO: 'GESTAO',
    PESSOAS: 'PESSOAS',
    PRODUTO: 'PRODUTO',
    ESTRATEGIA: 'ESTRATEGIA',
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
        perguntaAtual: {
          id: adaptativa.id,
          pergunta: adaptativa.pergunta,
          tipo: adaptativa.tipo,
          opcoes: adaptativa.opcoes,
          categoria: adaptativa.categoria,
          estagio: adaptativa.estagio,
        },
        progresso: { blocoAtual: 1, totalBlocos: BLOCOS_ORDEM.length, etapaNoBloco: 1, totalEtapasNoBloco: 1, percentual: 50 },
        concluida: false,
        respostas: estado.respostas,
      }
    }
  }

  const fluxo = FLUXOS[estado.fluxo]
  if (!fluxo) return null

  const etapaIndex = fluxo.etapas.findIndex((e) => e.id === estado.etapa)

  // `concluida` também é verdade quando não há mais pergunta a fazer
  // (etapa nula) — o cliente então chama `/finalizar` para gerar o Retrato.
  const concluida = estado.concluida || !estado.etapa

  return {
    perguntaAtual: estado.etapa ? (fluxo.etapas.find((e) => e.id === estado.etapa) ?? null) : null,
    progresso: calcularProgresso(etapaIndex, fluxo),
    concluida,
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

  const respostas = (conversa.respostas as Record<string, string | null>) ?? {}

  // `__clareza` e `__retorno` são mecanismos internos (pendências de conta
  // anônima), nunca respostas de pergunta — não devem chegar aos consumidores.
  delete (respostas as Record<string, unknown>)['__clareza']
  delete (respostas as Record<string, unknown>)['__retorno']

  return respostas
}

export function getFluxoSteps(fluxoId: string) {
  return FLUXOS[fluxoId]?.etapas ?? []
}

