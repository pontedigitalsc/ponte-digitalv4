import { test } from 'node:test'
import assert from 'node:assert/strict'
import { gerarHipoteses, gerarLeituraCognitiva } from '../hipoteses-estrategicas.ts'
import { gerarDescobertas } from '../motor-descobertas.ts'
import { interpretar, gerarResumoNatural } from '../interpretacoes.ts'
import type { HipoteseEstrategica } from '../hipoteses-estrategicas.ts'

// P86-B2 — testes determinísticos do contexto Founder.
// Usa os RÓTULOS reais do fluxo `configuracao-founder` (o valor gravado em
// `respostas` é o rótulo natural da opção; os adaptadores normalizam acentos e
// buscam fragmentos). Nenhum teste depende de IA ou de banco.
type Respostas = Record<string, string | null>

function respostasFounderTipico(): Respostas {
  return {
    'fundador.papel': 'Uma empresa que precisa se sustentar sozinha',
    'identidade.expectativa': 'Que Founders reais a usem e voltem',
    'realidade.momento': 'Está em formação — mais visão do que operação',
    'realidade.uso': 'Só eu, e olhe lá',
    'fluxo.trabalho': 'Praticamente tudo passa por você',
    'fluxo.afastamento': 'Pararia quase tudo',
    'decisoes.influencia': 'Dados e evidência dos encontros com Founders',
    'decisoes.trava': 'Pouca tração: poucos Founders de verdade usando',
    'evolucao.aprendizado': 'A metodologia de leitura em si',
    'evolucao.registro': 'Na minha cabeça, principalmente',
    'atencao.mudanca': 'Fazer a coisa girar com menos de mim',
    'atencao.sucesso': 'Quando quem voltou por conta própria volta por conta própria',
    'atencao.nao_dito': 'O que ainda não registrei: a ponta de quem testa',
  }
}

function respostasPrimeiraConversa(): Respostas {
  return {
    'empresa.momento': 'Está em formação — mais visão do que operação',
    'rotina.energia': 'Apagar incêndio o dia inteiro',
    'historia.nascer': 'De uma necessidade minha mesmo',
    'empresa.dependencia': 'Se eu faltar, para tudo',
  }
}

test('P86-B2: gerarHipoteses com contexto Founder retorna hipóteses fundador_*', () => {
  const hs = gerarHipoteses(respostasFounderTipico())
  assert.ok(hs.length >= 1)
  assert.ok(hs.every((h) => h.id.startsWith('founder_')))
})

test('P86-B2: gerarHipoteses ordena por força (mais sustentada primeiro)', () => {
  const hs = gerarHipoteses(respostasFounderTipico())
  for (let i = 1; i < hs.length; i++) {
    assert.ok(hs[i - 1].forca >= hs[i].forca)
  }
})

test('P86-B2: contexto Founder é determinístico — mesma entrada, mesma saída', () => {
  assert.deepEqual(gerarHipoteses(respostasFounderTipico()), gerarHipoteses(respostasFounderTipico()))
  assert.deepEqual(gerarDescobertas(respostasFounderTipico()), gerarDescobertas(respostasFounderTipico()))
})

test('P86-B2: resposta típica gera dependência pessoal + trava + construção fase', () => {
  const hs = gerarHipoteses(respostasFounderTipico())
  const ids = hs.map((h: HipoteseEstrategica) => h.id)
  assert.ok(ids.includes('founder_dependencia_pessoal'))
  assert.ok(ids.includes('founder_construcao_fase'))
  assert.ok(ids.includes('founder_trava_principal'))
  // com evidência forte de dependência (tudo passa por você + pararia tudo), a
  // hipótese de dependência deve ter forca 3 (confiança ALTA).
  const dependencia = hs.find((h) => h.id === 'founder_dependencia_pessoal')
  assert.equal(dependencia?.forca, 3)
})

test('P86-B2: Primeira Sessão continua usando hipóteses clássicas (nunca founder_*)', () => {
  const hs = gerarHipoteses(respostasPrimeiraConversa())
  assert.ok(hs.length >= 1)
  assert.ok(hs.every((h) => !h.id.startsWith('founder_')))
})

test('P86-B2: leitura cognitiva do Founder detecta contradição centralizada × querer girar com menos', () => {
  const respostas = respostasFounderTipico()
  const hs = gerarHipoteses(respostas)
  const leitura = gerarLeituraCognitiva(respostas, hs)
  assert.ok(leitura.contradicoes.some((c) => c.includes('menos de você no comando')))
  // frase transformadora ligada à centralidade.
  assert.ok(leitura.frase !== null)
})

test('P86-B2: leitura conecta trava e afastamento quando as duas existem', () => {
  const respostas = respostasFounderTipico()
  const hs = gerarHipoteses(respostas)
  const leitura = gerarLeituraCognitiva(respostas, hs)
  assert.ok(leitura.relacoes.some((r) => r.includes('travamento')))
  assert.ok(leitura.padrao.length > 0)
})

test('P86-B2: motor de descobertas gera descobertas do Founder conectando respostas', () => {
  const geradas = gerarDescobertas(respostasFounderTipico())
  assert.equal(geradas.insuficiente, null)
  assert.ok(geradas.descobertas.length >= 1)
  assert.ok(geradas.descobertas.every((d) => d.id.startsWith('founder_')))
})

test('P86-B2: descobertas só nascem com evidência — sem amostra, insuficiente', () => {
  const semEvidencia: Respostas = {
    'fundador.papel': 'Um produto que ainda está sendo construído',
  }
  const geradas = gerarDescobertas(semEvidencia)
  assert.equal(geradas.descobertas.length, 0)
  assert.ok(geradas.insuficiente !== null)
})

test('P86-B2: interpretação fala da Ponte (não da empresa) no contexto Founder', () => {
  const interp = interpretar(respostasFounderTipico())
  assert.ok(interp.observacao.length > 0)
  assert.ok(interp.pontoAtencao.length > 0)
  const resumo = gerarResumoNatural(respostasFounderTipico(), interp)
  assert.ok(resumo.secao1.paragrafo.includes('retrato inicial'))
})

test('P86-B2: Primeira Conversa mantém carta original (empresa.*) com interpretar', () => {
  const interp = interpretar(respostasPrimeiraConversa())
  assert.ok(interp.observacao.length > 0)
  assert.ok(/empresa/i.test(interp.observacao) || /sua empresa/i.test(interp.observacao))
})