/**
 * ─── COPILOTO OPERACIONAL — NÚCLEO PURO ───────────────────────────────────────
 *
 * Módulo determinístico (sem banco) que transforma o que JÁ está registrado no
 * caderno de descoberta (P92) em resposta para quem gerencia a operação:
 *
 *  - classificarNivelIntervencao  → Nv 0..4 (recorte operacional dos 7 níveis
 *    do MODELO_DE_INTERVENCAO) + motivos, apenas a partir de dado registrado;
 *  - montarContextoOperacional   → texto puro "Visão do gerente" (o que
 *    aconteceu, em que estado está, responsável, o que falta, próximo passo,
 *    risco, decisão pendente, exceção);
 *  - avaliarCargaCognitivaPorProcesso → 8 dimensões de carga (BAIXA/MEDIA/ALTA);
 *  - montarMapaDeAtrito          → linha por atrito registrado (nunca inventa
 *    frequência/impacto sem dado);
 *  - proximasPerguntasContextuais→ ≤3 perguntas com gatilho real (nunca por
 *    "campo vazio").
 *
 * Regra do P82/P80 vale aqui: nada é inventado. O que não está registrado fica
 * "não sabemos". Nenhuma regra da operação real (Souza Mestrinho) é codificada.
 */

import type { ConfiancaDescobertaOp, TipoRegistroDescobertaOp } from './descoberta-operacional.ts'
import { rotuloCategoriaOportunidade } from './descoberta-operacional.ts'

function ar(v: unknown): unknown[] {
  if (!Array.isArray(v)) return []
  return v.filter((x): x is unknown => x !== null && x !== undefined)
}

function texto(v: unknown): string {
  return typeof v === 'string' ? v.trim() : ''
}

function verdadeiro(v: unknown): boolean {
  return v === true || v === 'true'
}

// ─── NÍVEL DE INTERVENÇÃO (Nv 0..4) ───────────────────────────────────────────

/**
 * Recorte operacional dos 7 níveis do MODELO_DE_INTERVENCAO (09-ARCHITECTURE):
 * 0 SILENCIOSA, 1 AUTOMÁTICA, 2 SUGESTÃO, 3 CONFIRMAÇÃO, 4 ESCALADA.
 * Decisão determinística e priorizada: 4 > 3 > 2 > 1 > 0.
 */
export const NIVEL_INTERVENCAO_ROTULO: Record<number, string> = {
  0: 'Nv 0 — Silenciosa',
  1: 'Nv 1 — Automática',
  2: 'Nv 2 — Sugestão',
  3: 'Nv 3 — Confirmação',
  4: 'Nv 4 — Escalada',
} as const

export interface ProcessoCopilotoBase {
  nome?: string | null
  etapas?: unknown
  dependencias?: unknown
  retrabalhos?: unknown
  riscos?: unknown
}

export interface DivergenciaCopilotoBase {
  titulo?: string | null
  descricao?: string | null
  status?: string | null
  questaoValidacao?: string | null
}

export interface OportunidadeCopilotoBase {
  descricao?: string | null
  categoria?: string | null
  status?: string | null
}

export interface AvaliarIntervencaoInput {
  status: string
  respostaAncoraRegistrada: boolean
  processos: ProcessoCopilotoBase[]
  divergencias: DivergenciaCopilotoBase[]
  oportunidades: OportunidadeCopilotoBase[]
}

export interface ResultadoNivelIntervencao {
  nivel: 0 | 1 | 2 | 3 | 4
  rotulo: string
  motivos: string[]
}

export function classificarNivelIntervencao(input: AvaliarIntervencaoInput): ResultadoNivelIntervencao {
  const motivos: string[] = []

  const comRetrabalhoOuRisco = input.processos.filter((p) => {
    const retrabalho = ar(p.retrabalhos).length > 0
    const risco = ar(p.riscos).length > 0
    return retrabalho || risco
  })

  const validadaNaoImplementada = input.oportunidades.filter(
    (o) => (o.status === 'VALIDADA' || o.status === 'EM_IMPLEMENTACAO')
  )

  if (comRetrabalhoOuRisco.length > 0 || validadaNaoImplementada.length > 0) {
    if (comRetrabalhoOuRisco.length > 0) {
      motivos.push(
        `Retrabalho/risco registrado em: ${comRetrabalhoOuRisco.map((p) => p.nome ?? '(sem nome)').join(', ')}. Informar responsável e acompanhar.`
      )
    }
    if (validadaNaoImplementada.length > 0) {
      motivos.push(
        `Oportunidade validada sem implementação concluída: ${validadaNaoImplementada.map((o) => o.descricao ?? '(sem descrição)').join(', ')}. Acompanhar execução.`
      )
    }
    return { nivel: 4, rotulo: NIVEL_INTERVENCAO_ROTULO[4], motivos }
  }

  const divergenciaPendente = input.divergencias.filter(
    (d) => d.status === 'ABERTA' || d.status === 'QUESTAO_VALIDACAO'
  )
  if (divergenciaPendente.length > 0) {
    for (const d of divergenciaPendente) {
      const titulo = texto(d.titulo) || '(sem título)'
      if (d.status === 'QUESTAO_VALIDACAO' && texto(d.questaoValidacao)) {
        motivos.push(`Divergência em validação — o campo precisa responder: ${d.questaoValidacao}`)
      } else {
        motivos.push(`Divergência aberta entre fontes: ${titulo}. Confirmar com o campo.`)
      }
    }
    return { nivel: 3, rotulo: NIVEL_INTERVENCAO_ROTULO[3], motivos }
  }

  const candidatas = input.oportunidades.filter((o) => o.status === 'CANDIDATA')
  if (candidatas.length > 0) {
    motivos.push(
      `Oportunidades candidatas a priorizar: ${candidatas.map((o) => o.descricao ?? '(sem descrição)').join(', ')}.`
    )
    return { nivel: 2, rotulo: NIVEL_INTERVENCAO_ROTULO[2], motivos }
  }

  const mapeadoComEtapas = input.processos.filter(
    (p) => ar(p.etapas).length > 0 || ar(p.dependencias).length > 0
  )

  if (mapeadoComEtapas.length > 0 && (input.status === 'IMPLEMENTADO' || input.status === 'EM_APRENDIZADO')) {
    motivos.push('Rotina mapeada em operação e sem pendências registradas: acompanhamento automático do processo.')
    return { nivel: 1, rotulo: NIVEL_INTERVENCAO_ROTULO[1], motivos }
  }

  if (mapeadoComEtapas.length > 0) {
    motivos.push(
      `Processos mapeados prontos para o próximo passo: ${mapeadoComEtapas.map((p) => p.nome ?? '(sem nome)').join(', ')}.`
    )
    return { nivel: 2, rotulo: NIVEL_INTERVENCAO_ROTULO[2], motivos }
  }

  if (input.respostaAncoraRegistrada === false && input.status === 'NAO_INICIADO') {
    return { nivel: 0, rotulo: NIVEL_INTERVENCAO_ROTULO[0], motivos: ['Diagnóstico em branco: ainda não ouvimos o campo.'] }
  }

  return { nivel: 0, rotulo: NIVEL_INTERVENCAO_ROTULO[0], motivos: ['Nada pendente no caderno hoje.'] }
}

// ─── VISÃO DO GERENTE (contexto) ──────────────────────────────────────────────

export interface HistoricoCopiloto {
  acao?: string | null
  statusDe?: string | null
  statusPara?: string | null
  criadoEm?: Date | string | null
}

export interface ProcessoContextoCopiloto extends ProcessoCopilotoBase {
  responsavel?: string | null
  inicio?: string | null
  fim?: string | null
}

export interface DadosContextoOperacional {
  nomeEmpresa: string
  status: string
  unidadeOperacional?: string | null
  respostaAncora?: string | null
  processos: ProcessoContextoCopiloto[]
  divergencias: DivergenciaCopilotoBase[]
  oportunidades: OportunidadeCopilotoBase[]
  historico?: HistoricoCopiloto[]
}

/**
 * Visão do gerente em texto puro: responde (na ordem) o que aconteceu, em que
 * estado está, quem é responsável, o que falta, próximo passo, risco, decisão
 * pendente e exceção — usando apenas o que foi registrado. Lacunas aparecem
 * como "não sabemos".
 */
export function montarContextoOperacional(dados: DadosContextoOperacional): string {
  const linhas: string[] = []
  const pad = '  '

  linhas.push('VISÃO DO GERENTE — COPILOTO OPERACIONAL')
  linhas.push('='.repeat(64))
  linhas.push('')
  linhas.push(`Empresa: ${dados.nomeEmpresa}`)
  linhas.push(`Estado do diagnóstico: ${dados.status ?? 'NÃO SABEMOS'}`)
  if (dados.unidadeOperacional) linhas.push(`Unidade operacional: ${dados.unidadeOperacional}`)
  if (dados.respostaAncora) linhas.push(`Âncora (bagunça única): ${dados.respostaAncora}`)
  linhas.push('')

  linhas.push('O que aconteceu (últimos registros)')
  const recentes = (dados.historico ?? []).slice(0, 5)
  if (recentes.length === 0) {
    linhas.push(`${pad}— Nada registrado ainda no histórico.`)
  } else {
    for (const h of recentes) {
      const de = h.statusDe ? ` (de ${h.statusDe})` : ''
      const para = h.statusPara ? ` para ${h.statusPara}` : ''
      linhas.push(`${pad}- ${h.acao ?? '(ação)'}${de}${para}`)
    }
  }
  linhas.push('')

  linhas.push('Em que estado está o trabalho')
  if (dados.processos.length === 0) {
    linhas.push(`${pad}— Nenhum processo mapeado ainda.`)
  } else {
    for (const p of dados.processos) {
      const nome = p.nome ?? '(sem nome)'
      const onde = p.inicio ? ` (de: ${p.inicio}` : ''
      const ate = p.fim ? ` até: ${p.fim})` : onde ? ')' : ''
      const responsavel = p.responsavel ? ` — responsável: ${p.responsavel}` : ''
      const etapaCount = ar(p.etapas).length
      const etapasInfo = etapaCount > 0 ? ` — ${etapaCount} etapas mapeadas` : ' — etapas: não sabemos'
      linhas.push(`${pad}- ${nome}${onde}${ate}${responsavel}${etapasInfo}`)
    }
  }
  linhas.push('')

  linhas.push('O que falta / próximo passo')
  const pendentes: string[] = []
  for (const p of dados.processos) {
    for (const d of ar(p.dependencias)) {
      pendentes.push(`"${p.nome ?? '(sem nome)'}" depende de: ${texto(d) || '(não sabemos)'}`)
    }
  }
  const divergenciaPendente = dados.divergencias.filter(
    (d) => d.status === 'ABERTA' || d.status === 'QUESTAO_VALIDACAO'
  )
  for (const d of divergenciaPendente) {
    pendentes.push(`Confirmar divergência: ${texto(d.titulo) || '(sem título)'}`)
  }
  if (pendentes.length === 0) {
    linhas.push(`${pad}— Nenhuma pendência registrada.`)
  } else {
    for (const p of pendentes.slice(0, 6)) linhas.push(`${pad}- ${p}`)
  }
  linhas.push('')

  linhas.push('Risco e exceção (registrados)')
  const riscos: string[] = []
  for (const p of dados.processos) {
    for (const r of ar(p.riscos)) riscos.push(`"${p.nome ?? '(sem nome)'}": ${texto(r) || '(não sabemos)'}`)
    if (ar(p.retrabalhos).length > 0) riscos.push(`"${p.nome ?? '(sem nome)'}" tem retrabalho registrado`)
  }
  if (riscos.length === 0) {
    linhas.push(`${pad}— Nenhum risco/exceção registrado.`)
  } else {
    for (const r of riscos.slice(0, 6)) linhas.push(`${pad}- ${r}`)
  }
  linhas.push('')

  linhas.push('Decisão pendente')
  const decisoes: string[] = []
  for (const d of divergenciaPendente) {
    if (d.status === 'QUESTAO_VALIDACAO' && texto(d.questaoValidacao)) decisoes.push(d.questaoValidacao!)
    else if (texto(d.titulo)) decisoes.push(`Resolução da divergência: ${d.titulo}`)
  }
  const validadasNaoImplementadas = dados.oportunidades.filter(
    (o) => o.status === 'VALIDADA' || o.status === 'EM_IMPLEMENTACAO'
  )
  for (const o of validadasNaoImplementadas) decisoes.push(`Implementar oportunidade validada: ${o.descricao ?? '(sem descrição)'}`)
  if (decisoes.length === 0) {
    linhas.push(`${pad}— Nenhuma decisão pendente registrada.`)
  } else {
    for (const d of decisoes.slice(0, 5)) linhas.push(`${pad}- ${d}`)
  }

  return linhas.join('\n')
}

// ─── CARGA COGNITIVA POR PROCESSO ─────────────────────────────────────────────

export type NivelCarga = 'BAIXA' | 'MEDIA' | 'ALTA'

export interface DimensaoCarga {
  dimensao: string
  descricao: string
  contagem: number
  nivel: NivelCarga
}

export interface ProcessoCargaInput {
  nome?: string | null
  etapas?: unknown
  dependencias?: unknown
  entradas?: unknown
  retrabalhos?: unknown
  ferramentas?: unknown
  oportunidades?: number
  divergenciasAbertas?: number
}

export interface ResultadoCargaCognitiva {
  processo: string
  dimensoes: DimensaoCarga[]
  geral: NivelCarga
}

function nivelPorContagem(n: number): NivelCarga {
  if (n >= 4) return 'ALTA'
  if (n >= 2) return 'MEDIA'
  return 'BAIXA'
}

/**
 * 8 dimensões de carga (§5 da arquitetura), cada uma com proxy determinístico
 * medido sobre arrays existentes no caderno P92. Níveis são heurísticos a
 * calibrar com o campo — já nascem sem inventar dado.
 */
export function avaliarCargaCognitivaPorProcesso(p: ProcessoCargaInput): ResultadoCargaCognitiva {
  const etapas = ar(p.etapas)
  const dependencias = ar(p.dependencias)
  const entradas = ar(p.entradas)
  const retrabalhos = ar(p.retrabalhos)
  const ferramentas = ar(p.ferramentas)

  const decisoesEtapa = etapas.filter((e) => {
    const eo = e as Record<string, unknown>
    return texto(eo.decisao).length > 0
  })

  const dimensoes: DimensaoCarga[] = [
    {
      dimensao: 'Decisões',
      descricao: 'Etapas que exigem decisão explícita',
      contagem: decisoesEtapa.length,
      nivel: nivelPorContagem(decisoesEtapa.length),
    },
    {
      dimensao: 'Memória',
      descricao: 'Dependências a lembrar (quem/motivo consultar)',
      contagem: dependencias.length,
      nivel: nivelPorContagem(dependencias.length),
    },
    {
      dimensao: 'Digitação',
      descricao: 'Informação que precisa ser informada por passo',
      contagem: entradas.length,
      nivel: nivelPorContagem(entradas.length),
    },
    {
      dimensao: 'Repetição',
      descricao: 'Retrabalhos observados no processo',
      contagem: retrabalhos.length,
      nivel: nivelPorContagem(retrabalhos.length),
    },
    {
      dimensao: 'Consulta',
      descricao: 'Etapas que exigem consulta de informação',
      contagem: etapas.length,
      nivel: nivelPorContagem(etapas.length),
    },
    {
      dimensao: 'Ferramentas',
      descricao: 'Ferramentas/equipamentos usados',
      contagem: ferramentas.length,
      nivel: nivelPorContagem(ferramentas.length),
    },
    {
      dimensao: 'Exceções',
      descricao: 'Retrabalhos (exceção à rotina)',
      contagem: retrabalhos.length,
      nivel: nivelPorContagem(retrabalhos.length),
    },
    {
      dimensao: 'Intervenção do gerente',
      descricao: 'Divergências abertas + oportunidades registradas',
      contagem: (p.divergenciasAbertas ?? 0) + (p.oportunidades ?? 0),
      nivel: nivelPorContagem((p.divergenciasAbertas ?? 0) + (p.oportunidades ?? 0)),
    },
  ]

  let geral: NivelCarga = 'BAIXA'
  for (const d of dimensoes) {
    if (d.nivel === 'ALTA') {
      geral = 'ALTA'
      break
    }
    if (d.nivel === 'MEDIA') geral = 'MEDIA'
  }

  return { processo: p.nome ?? '(sem nome)', dimensoes, geral }
}

// ─── MAPA DE ATRITO ───────────────────────────────────────────────────────────

export interface DadosMapaAtrito extends DadosContextoOperacional {}

/**
 * Cada atrito REGISTRADO vira uma linha Processo → Atrito → Causa →
 * Consequência → Frequência? → Impacto? → Intervenção. Frequência/impacto sem
 * dado aparecem como "não sabemos" — o motor nunca preenche suposição.
 */
export function montarMapaDeAtrito(dados: DadosMapaAtrito): string[] {
  const linhas: string[] = []

  for (const p of dados.processos) {
    const nome = p.nome ?? '(sem nome)'
    for (const r of ar(p.retrabalhos)) {
      linhas.push(
        `Processo: ${nome} → Atrito: retrabalho (${texto(r) || 'não sabemos'}) → Causa: a investigar no campo → Consequência: atraso/custo registrado → Frequência: não sabemos → Impacto: não sabemos → Intervenção: adiar liberação/validar antes (a validar)`
      )
    }
    for (const r of ar(p.riscos)) {
      linhas.push(
        `Processo: ${nome} → Atrito: risco (${texto(r) || 'não sabemos'}) → Causa: a investigar no campo → Consequência: possível parada → Frequência: não sabemos → Impacto: não sabemos → Intervenção: acompanhar (Nv escalada se confirmado)`
      )
    }
    for (const d of ar(p.dependencias)) {
      linhas.push(
        `Processo: ${nome} → Atrito: espera por ${texto(d) || 'algo não sabemos'} → Causa: dependência externa/pessoa → Consequência: parada de fluxo → Frequência: não sabemos → Impacto: não sabemos → Intervenção: perguntar (Nv 3)`
      )
    }
  }

  for (const d of dados.divergencias) {
    if (d.status === 'ABERTA' || d.status === 'QUESTAO_VALIDACAO') {
      linhas.push(
        `Divergência: ${texto(d.titulo) || '(sem título)'} → Atrito: informação divergente entre fontes → Causa: dito × observado → Consequência: decisão arriscada → Frequência: não sabemos → Impacto: não sabemos → Intervenção: confirmar com o campo (Nv 3)`
      )
    }
  }

  for (const o of dados.oportunidades) {
    if (o.status === 'CANDIDATA' || o.status === 'VALIDADA') {
      linhas.push(
        `Oportunidade: ${texto(o.descricao) || '(sem descrição)'} [${rotuloCategoriaOportunidade(o.categoria) ?? o.categoria ?? 'categoria não sabemos'}] → Atrito: ${rotuloCategoriaOportunidade(o.categoria) ?? 'a classificar'} → Causa: registrada no caderno → Consequência: perda de energia → Frequência: não sabemos → Impacto: ${texto(o.categoria) === '' ? 'não sabemos' : 'a validar'} → Intervenção: priorizar com o dono`
      )
    }
  }

  if (linhas.length === 0) {
    linhas.push('Nenhum atrito registrado no caderno até agora — sem evidência, sem intervenção.')
  }
  return linhas
}

// ─── PERGUNTAS CONTEXTUAIS ────────────────────────────────────────────────────

export const MAX_PERGUNTAS_CONTEXTUAIS = 3

export interface PerguntaContextual {
  texto: string
  porQueSurgiu: string
  para: string
}

export interface DadosPerguntasContextuais {
  status: string
  respostaAncora?: string | null
  processos: ProcessoCopilotoBase[]
  divergencias: DivergenciaCopilotoBase[]
  oportunidades: OportunidadeCopilotoBase[]
}

/**
 * Perguntas com gatilho real (informação registrada); nunca por falta de
 * preenchimento. Máximo 3 — quando não há gatilho, a lista é vazia.
 */
export function proximasPerguntasContextuais(dados: DadosPerguntasContextuais): PerguntaContextual[] {
  const perguntas: PerguntaContextual[] = []

  if (!texto(dados.respostaAncora) && dados.status === 'NAO_INICIADO') {
    perguntas.push({
      texto: 'Podemos começar? Qual é a única bagunça que, se eliminada primeiro, faria o restante ficar mais fácil?',
      porQueSurgiu: 'Diagnóstico sem a pergunta-âncora respondida.',
      para: 'Proprietário(a)',
    })
  }

  for (const d of dados.divergencias) {
    if (perguntas.length >= MAX_PERGUNTAS_CONTEXTUAIS) break
    if (d.status === 'ABERTA' || d.status === 'QUESTAO_VALIDACAO') {
      const perguntaBase =
        d.status === 'QUESTAO_VALIDACAO' && texto(d.questaoValidacao)
          ? d.questaoValidacao!
          : `Está registrada uma divergência entre fontes ("${texto(d.titulo) || 'sem título'}"). O que de fato acontece?`
      perguntas.push({
        texto: perguntaBase,
        porQueSurgiu: `Divergência aberta: ${texto(d.titulo) || '(sem título)'}.`,
        para: 'Gestão',
      })
    }
  }

  for (const p of dados.processos) {
    if (perguntas.length >= MAX_PERGUNTAS_CONTEXTUAIS) break
    if (ar(p.retrabalhos).length > 0) {
      perguntas.push({
        texto: `Identificamos retrabalho em "${p.nome ?? 'processo'}". Quer revisar como a informação chega e onde trava?`,
        porQueSurgiu: 'Retrabalho registrado no processo.',
        para: 'Operação',
      })
      break
    }
  }

  for (const o of dados.oportunidades) {
    if (perguntas.length >= MAX_PERGUNTAS_CONTEXTUAIS) break
    if (o.status === 'CANDIDATA') {
      perguntas.push({
        texto: `A oportunidade "${texto(o.descricao) || 'sem descrição'}" parece impactar a categoria ${rotuloCategoriaOportunidade(o.categoria) ?? 'em análise'}. Vamos validar com o campo?`,
        porQueSurgiu: 'Oportunidade candidata registrada no caderno.',
        para: 'Proprietário(a)',
      })
      break
    }
  }

  return perguntas
}

// Re-exports de tipos usados pelo service (compatibilidade estrutural).
export type { ConfiancaDescobertaOp, TipoRegistroDescobertaOp }