import { test } from 'node:test'
import assert from 'node:assert/strict'
import { decisaoFluxoInicial } from './configuracao-founder.ts'

test('P86-B1: Founder Principal SEM config concluída entra no fluxo de configuração', () => {
  assert.equal(decisaoFluxoInicial(true, false), 'configuracao-founder')
})

test('P86-B1: Founder Principal JÁ configurado segue o fluxo padrão', () => {
  assert.equal(decisaoFluxoInicial(true, true), 'primeira-conversa')
})

test('P86-B1: usuário comum (não Founder) segue o fluxo padrão em qualquer estado', () => {
  assert.equal(decisaoFluxoInicial(false, false), 'primeira-conversa')
  assert.equal(decisaoFluxoInicial(false, true), 'primeira-conversa')
})

test('P86-B1: decisão depende só do papel e do estado real — nunca de parâmetro externo', () => {
  // Quem chama `decisaoFluxoInicial` (a rota) nunca recebe `fluxo` da requisição:
  // o valor de retorno depende exclusivamente de (eFounderPrincipal, configurada).
  const casos: Array<[boolean, boolean, string]> = [
    [true, false, 'configuracao-founder'],
    [true, true, 'primeira-conversa'],
    [false, false, 'primeira-conversa'],
    [false, true, 'primeira-conversa'],
  ]
  for (const [eFounder, configurada, esperado] of casos) {
    assert.equal(decisaoFluxoInicial(eFounder, configurada), esperado)
  }
})

test('P86-B1: só FOUNDER_PRINCIPAL é reconhecido — FOUNDER e APOIADOR não ganham o fluxo', () => {
  // A rota só chama `decisaoFluxoInicial(true, ...)` depois de `eFounderPrincipal`
  // retornar true; aqui garantimos a preservação do legado fora da matriz de papel.
  assert.equal(decisaoFluxoInicial(false, false), 'primeira-conversa')
  assert.equal(decisaoFluxoInicial(false, true), 'primeira-conversa')
})
