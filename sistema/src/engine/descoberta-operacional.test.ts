import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  PERGUNTA_ANCORA,
  podeTransicionarStatusDiagnostico,
  TRANSICOES_STATUS_DIAGNOSTICO,
  STATUS_DIAGNOSTICO_DESCOBERTA_ORDEM,
  STATUS_DIAGNOSTICO_DESCOBERTA_ROTULO,
  STATUS_DIAGNOSTICO_COM_CONFIRMACAO,
  TAXONOMIA_REGISTRO_DESCOBERTA,
  rotuloTipoRegistroDescoberta,
  CONFIANCA_DESCOBERTA_ROTULO,
  TEMPLATE_SERRALHERIA,
  calcularProgressoDescoberta,
  montarRelatorioDescoberta,
  CATEGORIAS_OPORTUNIDADE_DESCOBERTA,
} from './descoberta-operacional.ts'

test('P92: pergunta-âncora é a do P82 (bagunça única, eliminada primeiro)', () => {
  assert.match(PERGUNTA_ANCORA, /Qual é a única bagunça/)
  assert.match(PERGUNTA_ANCORA, /eliminasse primeiro/)
  assert.match(PERGUNTA_ANCORA, /restante do trabalho ficar mais fácil/)
})

test('P92: estados seguem o fluxo da tarefa 15 (8 estados lineares)', () => {
  assert.deepEqual(STATUS_DIAGNOSTICO_DESCOBERTA_ORDEM, [
    'NAO_INICIADO',
    'EM_DESCOBERTA',
    'MAPEADO',
    'EM_VALIDACAO',
    'VALIDADO',
    'EM_IMPLEMENTACAO',
    'IMPLEMENTADO',
    'EM_APRENDIZADO',
  ])
  for (const s of STATUS_DIAGNOSTICO_DESCOBERTA_ORDEM) {
    assert.ok(STATUS_DIAGNOSTICO_DESCOBERTA_ROTULO[s], `rótulo de ${s}`)
  }
})

test('P92: caminho feliz do campo é linear e sem saltos', () => {
  assert.equal(podeTransicionarStatusDiagnostico('NAO_INICIADO', 'EM_DESCOBERTA'), true)
  assert.equal(podeTransicionarStatusDiagnostico('EM_DESCOBERTA', 'MAPEADO'), true)
  assert.equal(podeTransicionarStatusDiagnostico('MAPEADO', 'EM_VALIDACAO'), true)
  assert.equal(podeTransicionarStatusDiagnostico('EM_VALIDACAO', 'VALIDADO'), true)
  assert.equal(podeTransicionarStatusDiagnostico('VALIDADO', 'EM_IMPLEMENTACAO'), true)
  assert.equal(podeTransicionarStatusDiagnostico('EM_IMPLEMENTACAO', 'IMPLEMENTADO'), true)
  assert.equal(podeTransicionarStatusDiagnostico('IMPLEMENTADO', 'EM_APRENDIZADO'), true)
})

test('P92: saltos inválidos são bloqueados (nada pula etapa)', () => {
  assert.equal(podeTransicionarStatusDiagnostico('NAO_INICIADO', 'MAPEADO'), false)
  assert.equal(podeTransicionarStatusDiagnostico('EM_DESCOBERTA', 'VALIDADO'), false)
  assert.equal(podeTransicionarStatusDiagnostico('MAPEADO', 'VALIDADO'), false)
  assert.equal(podeTransicionarStatusDiagnostico('EM_APRENDIZADO', 'EM_DESCOBERTA'), false)
})

test('P92: pode voltar quando o campo corrige o entendimento', () => {
  assert.equal(podeTransicionarStatusDiagnostico('EM_DESCOBERTA', 'NAO_INICIADO'), true)
  assert.equal(podeTransicionarStatusDiagnostico('MAPEADO', 'EM_DESCOBERTA'), true)
  assert.equal(podeTransicionarStatusDiagnostico('EM_IMPLEMENTACAO', 'VALIDADO'), true)
})

test('P92: toda transição declarada é consistente (para ∈ permitidos[de])', () => {
  for (const de of Object.keys(TRANSICOES_STATUS_DIAGNOSTICO) as (keyof typeof TRANSICOES_STATUS_DIAGNOSTICO)[]) {
    for (const para of TRANSICOES_STATUS_DIAGNOSTICO[de]) {
      assert.equal(
        podeTransicionarStatusDiagnostico(de as never, para as never),
        true,
        `${de} deveria permitir ${para}`
      )
    }
  }
})

test('P92: estados de peso exigem confirmação explícita', () => {
  for (const s of STATUS_DIAGNOSTICO_COM_CONFIRMACAO) {
    assert.ok(STATUS_DIAGNOSTICO_DESCOBERTA_ORDEM.includes(s), `${s} existe`)
  }
  assert.ok(STATUS_DIAGNOSTICO_COM_CONFIRMACAO.includes('EM_APRENDIZADO'))
})

test('P92: taxonomia tem exatamente os 7 tipos do briefing §2', () => {
  assert.deepEqual(
    TAXONOMIA_REGISTRO_DESCOBERTA.map((t) => t.chave),
    [
      'CONHECIMENTO_CONHECIDO',
      'INFORMACAO_FORNECIDA',
      'OBSERVACAO',
      'HIPOTESE',
      'DECISAO',
      'OPORTUNIDADE',
      'DESCONHECIDO',
    ]
  )
  for (const t of TAXONOMIA_REGISTRO_DESCOBERTA) {
    assert.ok(t.rotulo.length > 0)
    assert.ok(t.descricao.length > 0)
  }
})

test('P92: registros de baixa confiabilidade exigem verificação (não viram fato)', () => {
  const exige = TAXONOMIA_REGISTRO_DESCOBERTA.filter((t) => t.exigeVerificacao).map((t) => t.chave)
  assert.ok(exige.includes('CONHECIMENTO_CONHECIDO'))
  assert.ok(exige.includes('INFORMACAO_FORNECIDA'))
  assert.ok(exige.includes('HIPOTESE'))
  assert.ok(!exige.includes('OBSERVACAO'))
  assert.ok(!exige.includes('DESCONHECIDO'))
})

test('P92: rótulos dos tipos existem em PT-BR', () => {
  for (const t of TAXONOMIA_REGISTRO_DESCOBERTA) {
    assert.equal(rotuloTipoRegistroDescoberta(t.chave), t.rotulo)
  }
  assert.equal(rotuloTipoRegistroDescoberta('QUALQUER_COISA'), 'QUALQUER_COISA')
})

test('P92: confiança tem rótulos ALTA/MEDIA/BAIXA', () => {
  assert.deepEqual(Object.keys(CONFIANCA_DESCOBERTA_ROTULO), ['ALTA', 'MEDIA', 'BAIXA'])
})

test('P92: template da vertical é configuração (ADR-035) e reutilizável', () => {
  assert.equal(TEMPLATE_SERRALHERIA.slug, 'serralheria-metais')
  assert.ok(TEMPLATE_SERRALHERIA.areas.length >= 5)
  for (const area of TEMPLATE_SERRALHERIA.areas) {
    assert.ok(area.area.length > 0)
    assert.ok(area.perguntas.length > 0, `área ${area.area} tem perguntas`)
  }
})

test('P92: categorias de oportunidade cobrem as perdas de energia do P82', () => {
  assert.ok(CATEGORIAS_OPORTUNIDADE_DESCOBERTA.includes('GARGALO'))
  assert.ok(CATEGORIAS_OPORTUNIDADE_DESCOBERTA.includes('RETRABALHO'))
  assert.ok(CATEGORIAS_OPORTUNIDADE_DESCOBERTA.includes('ESPERA'))
  assert.ok(CATEGORIAS_OPORTUNIDADE_DESCOBERTA.includes('DEPENDENCIA'))
  assert.ok(CATEGORIAS_OPORTUNIDADE_DESCOBERTA.includes('INFORMACAO_FALTANTE'))
})

test('P92: progresso exige resposta da âncora e fatos registrados', () => {
  const incompleto = calcularProgressoDescoberta({
    respostaAncora: null,
    totalParticipantes: 0,
    totalRegistros: 0,
    totalProcessos: 0,
    totalProcessosDesejados: 0,
    totalDivergencias: 0,
    totalOportunidades: 0,
  })
  assert.equal(incompleto.find((p) => p.chave === 'ancora')?.concluido, false)
  assert.equal(incompleto.find((p) => p.chave === 'registros')?.concluido, false)

  const completo = calcularProgressoDescoberta({
    respostaAncora: 'O orçamento, porque tudo espera ele.',
    totalParticipantes: 2,
    totalRegistros: 5,
    totalProcessos: 1,
    totalProcessosDesejados: 1,
    totalDivergencias: 1,
    totalOportunidades: 2,
  })
  assert.equal(completo.find((p) => p.chave === 'ancora')?.concluido, true)
  assert.equal(completo.find((p) => p.chave === 'processos')?.concluido, true)
})

test('P92: relatório tem as 12 seções do briefing §21 e não inventa resposta da âncora', () => {
  const relatorio = montarRelatorioDescoberta({
    nomeEmpresa: 'Souza Mestrinho',
    categoriaNome: 'Serralheria e Metais',
    unidadeOperacional: null,
    status: 'EM_DESCOBERTA',
    respostaAncora: null,
    participantes: [],
    registros: [{ tipo: 'DESCONHECIDO', conteudo: 'Ainda não sabemos como a produção é acionada.', area: 'Arranque da produção', confianca: null }],
    processos: [],
    processosDesejados: [],
    divergencias: [],
    oportunidades: [],
    criadaEm: '11/08/2026',
    concluidoEm: null,
  })
  for (const n of ['1. Identificação', '2. Resposta da pergunta-âncora', '7. COMO PODERIA SER', '9. O que ainda NÃO sabemos', '12. Próximo passo']) {
    assert.match(relatorio, new RegExp(n))
  }
  assert.match(relatorio, /NÃO REGISTRADA — obrigatória no MVP/)
  assert.match(relatorio, /Ainda não sabemos como a produção é acionada/)
  assert.ok(!/inventar|supor sem/.test(relatorio), 'relatório não afirma o que não foi registrado')
})