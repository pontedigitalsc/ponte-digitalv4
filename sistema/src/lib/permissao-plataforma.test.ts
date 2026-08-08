import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  temPermissaoPlataforma,
  eFounderPrincipal,
  PERMISSOES_PLATAFORMA,
  type PlataformaPermissao,
} from './permissao-plataforma.ts'

test('P84: permissões de plataforma — Founder Principal acessa todas as áreas', () => {
  const permissoes: PlataformaPermissao[] = [
    'FOUNDER_VIEW_PLATFORM',
    'FOUNDER_VIEW_INTERNAL',
    'FOUNDER_VIEW_SYSTEM_HEALTH',
    'FOUNDER_MANAGE_PLATFORM',
    'FOUNDER_MANAGE_AUDIT_ACCESS',
  ]
  for (const permissao of permissoes) {
    assert.equal(temPermissaoPlataforma('FOUNDER_PRINCIPAL', permissao), true, `deve permitir ${permissao}`)
  }
})

test('P84: usuário sem platformRole não tem NENHUMA permissão de plataforma', () => {
  const permissoes: PlataformaPermissao[] = [
    'FOUNDER_VIEW_PLATFORM',
    'FOUNDER_VIEW_INTERNAL',
    'FOUNDER_VIEW_SYSTEM_HEALTH',
    'FOUNDER_MANAGE_PLATFORM',
    'FOUNDER_MANAGE_AUDIT_ACCESS',
  ]
  for (const permissao of permissoes) {
    assert.equal(temPermissaoPlataforma(null, permissao), false)
    assert.equal(temPermissaoPlataforma(undefined, permissao), false)
  }
})

test('P85: FOUNDER e APOIADOR ainda NÃO têm permissões (não inventar privilégios)', () => {
  const permissoes: PlataformaPermissao[] = [
    'FOUNDER_VIEW_PLATFORM',
    'FOUNDER_VIEW_INTERNAL',
    'FOUNDER_VIEW_SYSTEM_HEALTH',
    'FOUNDER_MANAGE_PLATFORM',
    'FOUNDER_MANAGE_AUDIT_ACCESS',
  ]
  for (const permissao of permissoes) {
    assert.equal(temPermissaoPlataforma('FOUNDER', permissao), false)
    assert.equal(temPermissaoPlataforma('APOIADOR', permissao), false)
  }
})

test('P84: eFounderPrincipal só retorna true para FOUNDER_PRINCIPAL', () => {
  assert.equal(eFounderPrincipal('FOUNDER_PRINCIPAL'), true)
  assert.equal(eFounderPrincipal(null), false)
  assert.equal(eFounderPrincipal(undefined), false)
})

test('P84: toda permissão declarada na matriz tem ao menos um role habilitado', () => {
  const permissoes = Object.keys(PERMISSOES_PLATAFORMA) as PlataformaPermissao[]
  for (const permissao of permissoes) {
    const roles = PERMISSOES_PLATAFORMA[permissao]
    assert.ok(roles.length > 0, `permissão ${permissao} sem roles`)
  }
})