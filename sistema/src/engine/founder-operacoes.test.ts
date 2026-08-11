import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  podeTransicionarStatusSolicitacao,
  TRANSICOES_STATUS_SOLICITACAO,
  montarMensagemContato,
  montarUrlWhatsAppFundador,
  FOUNDER_WHATSAPP_NUMERO,
  STATUS_COM_CONFIRMACAO,
  ONBOARDING_FOUNDER_OPCOES,
  STATUS_SOLICITACAO_FOUNDER_ROTULO,
} from './founder-operacoes.ts'

test('P91: número oficial de WhatsApp é o mesmo usado no fluxo P90', () => {
  assert.equal(FOUNDER_WHATSAPP_NUMERO, '5548991133397')
})

test('P91: mensagem de contato segue o tom humanizado e menciona empresa e responsável', () => {
  const mensagem = montarMensagemContato({
    responsavel: 'Marina',
    nomeEmpresa: 'Café Aurora',
  })
  assert.match(mensagem, /Olá, Marina\./)
  assert.match(mensagem, /Aqui é o Kelven, da Ponte Digital\./)
  assert.match(mensagem, /realidade da Café Aurora\./)
})

test('P91: URL do WhatsApp usa o número oficial e codifica a mensagem', () => {
  const url = montarUrlWhatsAppFundador('Olá? com & simbolos!')
  assert.ok(url.startsWith(`https://wa.me/${FOUNDER_WHATSAPP_NUMERO}?text=`))
  assert.ok(!/\s/.test(url), 'URL não deve conter espaços sem encode')
})

test('P91: transição válida do fluxo principal PENDING → CONTACTED → IN_REVIEW → APPROVED', () => {
  assert.equal(podeTransicionarStatusSolicitacao('PENDING', 'CONTACTED'), true)
  assert.equal(podeTransicionarStatusSolicitacao('CONTACTED', 'IN_REVIEW'), true)
  assert.equal(podeTransicionarStatusSolicitacao('IN_REVIEW', 'APPROVED'), true)
})

test('P91: saltos inválidos são bloqueados (sem contato direto para aprovado, etc.)', () => {
  assert.equal(podeTransicionarStatusSolicitacao('PENDING', 'APPROVED'), false)
  assert.equal(podeTransicionarStatusSolicitacao('PENDING', 'IN_REVIEW'), false)
  assert.equal(podeTransicionarStatusSolicitacao('REJECTED', 'APPROVED'), false)
  assert.equal(podeTransicionarStatusSolicitacao('APPROVED', 'PENDING'), false)
})

test('P91: REJECTED só reabre para PENDING; APPROVED só volta para REJECTED com confirmação', () => {
  assert.equal(podeTransicionarStatusSolicitacao('REJECTED', 'PENDING'), true)
  assert.equal(podeTransicionarStatusSolicitacao('APPROVED', 'REJECTED'), true)
  assert.ok(STATUS_COM_CONFIRMACAO.includes('APPROVED'))
  assert.ok(STATUS_COM_CONFIRMACAO.includes('REJECTED'))
})

test('P91: toda transição declarada é bidirecionalmente consistente (para ∈ permitidos[de])', () => {
  const statuses = Object.keys(TRANSICOES_STATUS_SOLICITACAO) as (keyof typeof TRANSICOES_STATUS_SOLICITACAO)[]
  for (const de of statuses) {
    for (const para of TRANSICOES_STATUS_SOLICITACAO[de]) {
      assert.equal(
        podeTransicionarStatusSolicitacao(de as never, para as never),
        true,
        `${de} deveria permitir ${para}`
      )
    }
  }
})

test('P91: onboarding tem exatamente os 3 níveis RAPIDA / GRADUAL / COMPLETA', () => {
  assert.deepEqual(
    ONBOARDING_FOUNDER_OPCOES.map((o) => o.chave),
    ['RAPIDA', 'GRADUAL', 'COMPLETA']
  )
  for (const opcao of ONBOARDING_FOUNDER_OPCOES) {
    assert.ok(opcao.titulo.length > 0)
    assert.ok(opcao.descricao.length > 0)
    assert.ok(opcao.passos.length > 0)
  }
})

test('P91: rótulos de todos os status existem em PT-BR', () => {
  for (const status of ['PENDING', 'CONTACTED', 'IN_REVIEW', 'APPROVED', 'REJECTED']) {
    assert.ok(STATUS_SOLICITACAO_FOUNDER_ROTULO[status as keyof typeof STATUS_SOLICITACAO_FOUNDER_ROTULO])
  }
})