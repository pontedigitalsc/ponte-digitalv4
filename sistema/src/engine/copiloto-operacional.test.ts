import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  classificarNivelIntervencao,
  NIVEL_INTERVENCAO_ROTULO,
  montarContextoOperacional,
  avaliarCargaCognitivaPorProcesso,
  montarMapaDeAtrito,
  proximasPerguntasContextuais,
  MAX_PERGUNTAS_CONTEXTUAIS,
  type AvaliarIntervencaoInput,
  type DadosContextoOperacional,
} from './copiloto-operacional.ts'

test('COP: níveis 0..4 existem com rótulos não vazios', () => {
  for (let i = 0; i <= 4; i++) {
    assert.ok(NIVEL_INTERVENCAO_ROTULO[i], `rótulo de Nv ${i}`)
    assert.ok(NIVEL_INTERVENCAO_ROTULO[i].includes(`Nv ${i}`))
  }
})

test('COP: caderno em branco leva a Nv 0 silenciosa', () => {
  const input: AvaliarIntervencaoInput = {
    status: 'NAO_INICIADO',
    respostaAncoraRegistrada: false,
    processos: [],
    divergencias: [],
    oportunidades: [],
  }
  const r = classificarNivelIntervencao(input)
  assert.equal(r.nivel, 0)
  assert.ok(r.motivos.length > 0, 'motivo informado')
})

test('COP: divergência aberta leva a Nv 3 (confirmação) — prioridade sobre sugestão', () => {
  const input: AvaliarIntervencaoInput = {
    status: 'EM_DESCOBERTA',
    respostaAncoraRegistrada: true,
    processos: [{ nome: 'Portão', etapas: ['a'] }],
    divergencias: [{ titulo: 'Medida', status: 'ABERTA' }],
    oportunidades: [],
  }
  const r = classificarNivelIntervencao(input)
  assert.equal(r.nivel, 3)
  assert.match(r.rotulo, /Confirmação/)
})

test('COP: divergência com questão de validação pede o campo (Nv 3)', () => {
  const input: AvaliarIntervencaoInput = {
    status: 'MAPEADO',
    respostaAncoraRegistrada: true,
    processos: [],
    divergencias: [
      { titulo: 'Orçamento', status: 'QUESTAO_VALIDACAO', questaoValidacao: 'Quem aprova o sinal?' },
    ],
    oportunidades: [],
  }
  const r = classificarNivelIntervencao(input)
  assert.equal(r.nivel, 3)
  assert.match(r.motivos.join(' '), /campo precisa responder/)
})

test('COP: retrabalho registrado leva a Nv 4 (escalada) — prioridade mais alta', () => {
  const input: AvaliarIntervencaoInput = {
    status: 'EM_DESCOBERTA',
    respostaAncoraRegistrada: true,
    processos: [{ nome: 'Calha', etapas: ['a'], retrabalhos: ['vazamento'] }],
    divergencias: [{ titulo: 'X', status: 'ABERTA' }],
    oportunidades: [],
  }
  const r = classificarNivelIntervencao(input)
  assert.equal(r.nivel, 4)
  assert.match(r.rotulo, /Escalada/)
})

test('COP: oportunidade candidata sem mais pendências leva a Nv 2 (sugestão)', () => {
  const input: AvaliarIntervencaoInput = {
    status: 'EM_DESCOBERTA',
    respostaAncoraRegistrada: true,
    processos: [],
    divergencias: [],
    oportunidades: [{ descricao: 'Padronizar orçamento', categoria: 'GARGALO', status: 'CANDIDATA' }],
  }
  const r = classificarNivelIntervencao(input)
  assert.equal(r.nivel, 2)
})

test('COP: oportunidade VALIDADA sem implementação leva a Nv 4', () => {
  const input: AvaliarIntervencaoInput = {
    status: 'VALIDADO',
    respostaAncoraRegistrada: true,
    processos: [],
    divergencias: [],
    oportunidades: [{ descricao: 'Checklist de medida', categoria: 'RETRABALHO', status: 'VALIDADA' }],
  }
  const r = classificarNivelIntervencao(input)
  assert.equal(r.nivel, 4)
})

test('COP: rotina mapeada e operando sem pendências leva a Nv 1 (automática)', () => {
  const input: AvaliarIntervencaoInput = {
    status: 'IMPLEMENTADO',
    respostaAncoraRegistrada: true,
    processos: [{ nome: 'Instalação', etapas: ['a', 'b'], dependencias: ['Cliente'] }],
    divergencias: [],
    oportunidades: [],
  }
  const r = classificarNivelIntervencao(input)
  assert.equal(r.nivel, 1)
})

test('COP: contexto do gerente não inventa pendência quando não há registro', () => {
  const dados: DadosContextoOperacional = {
    nomeEmpresa: 'Souza Mestrinho',
    status: 'NAO_INICIADO',
    processos: [],
    divergencias: [],
    oportunidades: [],
    historico: [],
  }
  const s = montarContextoOperacional(dados)
  assert.match(s, /Souza Mestrinho/)
  assert.match(s, /Nenhum processo mapeado/)
  assert.match(s, /Nenhuma pendência registrada/)
  assert.match(s, /Nenhum risco/)
  assert.match(s, /Nenhuma decisão pendente/)
})

test('COP: contexto mostra responsável, dependências e decisão pendente quando registrados', () => {
  const dados: DadosContextoOperacional = {
    nomeEmpresa: 'Souza Mestrinho',
    status: 'MAPEADO',
    processos: [{ nome: 'Portão', responsavel: 'Mestre', dependencias: ['Medida do cliente'] }],
    divergencias: [{ titulo: 'Cor da tinta', status: 'QUESTAO_VALIDACAO', questaoValidacao: 'Qual cor?', descricao: '' }],
    oportunidades: [],
    historico: [{ acao: 'PROCESSO_CRIADO' }],
  }
  const s = montarContextoOperacional(dados)
  assert.match(s, /responsável: Mestre/)
  assert.match(s, /Medida do cliente/)
  assert.match(s, /Qual cor\?/)
})

test('COP: carga cognitiva mede 8 dimensões numéricas', () => {
  const r = avaliarCargaCognitivaPorProcesso({
    nome: 'Orçamento',
    etapas: [
      { decisao: 'aprovar sinal' },
      { decisao: 'definir material' },
    ],
    dependencias: ['Cliente', 'Fornecedor'],
    entradas: ['medida'],
    retrabalhos: ['medida incompleta'],
    ferramentas: ['Excel'],
    oportunidades: 2,
    divergenciasAbertas: 1,
  })
  assert.equal(r.processo, 'Orçamento')
  assert.equal(r.dimensoes.length, 8)
  const decisao = r.dimensoes.find((d) => d.dimensao === 'Decisões')!
  assert.equal(decisao.contagem, 2)
  assert.equal(decisao.nivel, 'MEDIA')
  const intervencao = r.dimensoes.find((d) => d.dimensao === 'Intervenção do gerente')!
  assert.equal(intervencao.contagem, 3)
  assert.equal(r.geral, 'MEDIA')
})

test('COP: carga sem dados é BAIXA e não inventa contagem', () => {
  const r = avaliarCargaCognitivaPorProcesso({ nome: 'Vazio' })
  assert.equal(r.geral, 'BAIXA')
  for (const d of r.dimensoes) assert.equal(d.contagem, 0)
})

test('COP: mapa de atrito só existe com evidência registrada', () => {
  const vazio = montarMapaDeAtrito({
    nomeEmpresa: 'X',
    status: 'NAO_INICIADO',
    processos: [],
    divergencias: [],
    oportunidades: [],
  })
  assert.equal(vazio.length, 1)
  assert.match(vazio[0], /sem evidência/)

  const comDados = montarMapaDeAtrito({
    nomeEmpresa: 'X',
    status: 'EM_DESCOBERTA',
    processos: [{ nome: 'Calha', retrabalhos: ['vazamento'] }],
    divergencias: [{ titulo: 'Medida', status: 'ABERTA', descricao: '' }],
    oportunidades: [{ descricao: 'Checklist', categoria: 'GARGALO', status: 'CANDIDATA' }],
  })
  assert.ok(comDados.length >= 3)
  for (const linha of comDados) assert.match(linha, /Frequência: não sabemos/)
})

test('COP: perguntas contextuais respeitam máximo e só surgem com gatilho', () => {
  const comGatilho = proximasPerguntasContextuais({
    status: 'NAO_INICIADO',
    respostaAncora: null,
    processos: [],
    divergencias: [],
    oportunidades: [],
  })
  assert.equal(comGatilho.length, 1)
  assert.match(comGatilho[0].texto, /bagunça/)

  const semGatilho = proximasPerguntasContextuais({
    status: 'MAPEADO',
    respostaAncora: 'Orçamento na cabeça',
    processos: [],
    divergencias: [],
    oportunidades: [],
  })
  assert.equal(semGatilho.length, 0)

  const cheio: Parameters<typeof proximasPerguntasContextuais>[0] = {
    status: 'EM_DESCOBERTA',
    respostaAncora: 'ok',
    processos: [{ nome: 'Portão', retrabalhos: ['x'] }],
    divergencias: [
      { titulo: 'A', status: 'ABERTA' },
      { titulo: 'B', status: 'QUESTAO_VALIDACAO', questaoValidacao: 'Qual?' },
    ],
    oportunidades: [
      { descricao: 'O1', categoria: 'ESPERA', status: 'CANDIDATA' },
      { descricao: 'O2', categoria: 'GARGALO', status: 'CANDIDATA' },
    ],
  }
  const muitas = proximasPerguntasContextuais(cheio)
  assert.ok(muitas.length <= MAX_PERGUNTAS_CONTEXTUAIS)
  assert.ok(muitas.length >= 2)
})