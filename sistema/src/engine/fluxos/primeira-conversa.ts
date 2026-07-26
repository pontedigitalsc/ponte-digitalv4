import type { Fluxo } from '@/engine/tipos'

export const PRIMEIRA_CONVERSA: Fluxo = {
  id: 'primeira-conversa',
  nome: 'Primeira Conversa',
  versao: 1,
  etapas: [
    // ─── Bloco 1 — Empresa ─────────────────────────────────────────────────
    { id: 'empresa.segmento',       pergunta: 'Qual o segmento do seu negócio?',           tipo: 'texto' },
    { id: 'empresa.tempo',          pergunta: 'Há quanto tempo está em operação?',         tipo: 'texto' },
    { id: 'empresa.funcionarios',   pergunta: 'Quantos funcionários, incluindo você?',     tipo: 'texto' },
    { id: 'empresa.faturamento',    pergunta: 'Qual o faturamento médio mensal?',          tipo: 'faixa',
      opcoes: [
        { valor: 'ate-5k',    rotulo: 'Até R$ 5 mil' },
        { valor: '5k-20k',    rotulo: 'R$ 5 mil a R$ 20 mil' },
        { valor: '20k-50k',   rotulo: 'R$ 20 mil a R$ 50 mil' },
        { valor: '50k-100k',  rotulo: 'R$ 50 mil a R$ 100 mil' },
        { valor: '100k+',     rotulo: 'Acima de R$ 100 mil' },
      ] },

    // ─── Bloco 2 — Operação ────────────────────────────────────────────────
    { id: 'operacao.aquisicao',     pergunta: 'Como um cliente comum chega até você hoje?', tipo: 'texto' },
    { id: 'operacao.produto',       pergunta: 'Qual serviço ou produto você mais vende?',   tipo: 'texto' },
    { id: 'operacao.lucro',         pergunta: 'Qual deles dá mais lucro?',                  tipo: 'texto' },
    { id: 'operacao.trabalhoso',    pergunta: 'Qual dá mais trabalho para o retorno que gera?', tipo: 'texto' },
    { id: 'operacao.horas',         pergunta: 'Quantas horas por dia você dedica ao negócio?', tipo: 'texto' },

    // ─── Bloco 3 — Gestão ──────────────────────────────────────────────────
    { id: 'gestao.contratacao',     pergunta: 'Como você decide se vai contratar alguém?',           tipo: 'texto' },
    { id: 'gestao.promocao',        pergunta: 'Como você decide se vai fazer uma promoção?',          tipo: 'texto' },
    { id: 'gestao.caixa',           pergunta: 'Você acompanha o caixa diariamente, semanalmente ou só quando falta dinheiro?', tipo: 'texto' },
    { id: 'gestao.decisao',         pergunta: 'Qual foi a decisão mais difícil que você tomou esta semana?', tipo: 'texto' },

    // ─── Bloco 4 — Problemas ───────────────────────────────────────────────
    { id: 'problemas.insonia',      pergunta: 'O que mais tira o seu sono no negócio hoje?',            tipo: 'texto' },
    { id: 'problemas.repeticao',    pergunta: 'Qual problema se repete, mesmo você já tendo tentado resolver antes?', tipo: 'texto' },
    { id: 'problemas.perda',        pergunta: 'O que te faz perder dinheiro sem perceber na hora?',     tipo: 'texto' },

    // ─── Bloco 5 — Objetivos ───────────────────────────────────────────────
    { id: 'objetivos.meta',         pergunta: 'Qual é o objetivo principal para os próximos 6 meses?',  tipo: 'texto' },
    { id: 'objetivos.automatizar',  pergunta: 'O que você gostaria de automatizar ou parar de fazer manualmente?', tipo: 'texto' },
    { id: 'objetivos.delegar',      pergunta: 'O que você gostaria que alguém resolvesse por você, se pudesse?', tipo: 'texto' },
  ],
}

export const FLUXOS: Record<string, Fluxo> = {
  'primeira-conversa': PRIMEIRA_CONVERSA,
}
