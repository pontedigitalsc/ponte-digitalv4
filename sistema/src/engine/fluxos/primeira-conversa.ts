import type { Fluxo } from '@/engine/tipos'

// P70 — PRIMEIRA SESSÃO ESTRATÉGICA (V3)
//
// A primeira conversa deixa de ser um questionário de 24 perguntas (que
// começava com 4 perguntas de cadastro) e vira uma descoberta em 7 blocos.
// Princípio: cada bloco responde "o que eu consigo concluir agora?".
// Nenhuma pergunta é só de cadastro; nenhuma devolutiva é genérica — a Ponte
// conversa entre blocos citando as palavras do empresário. O Retrato final é
// consequência das hipóteses que os blocos formam, nunca um template.
//
// Os blocos:
//   1. momento      — a frase mais verdadeira sobre a empresa hoje
//   2. decisao      — como a empresa decide (tempo e dinheiro)
//   3. dependencia  — o que acontece se o fundador se afasta
//   4. clientes     — o que faz clientes voltarem
//   5. dinheiro     — previsibilidade do próximo mês (não faturamento)
//   6. energia      — o que consome a energia (não o tempo)
//   7. visao        — como a empresa seria se funcionasse como o fundador quer
export const PRIMEIRA_CONVERSA: Fluxo = {
  id: 'primeira-conversa',
  nome: 'Primeira Sessão Estratégica',
  versao: 6,
  etapas: [
    // ─── BLOCO 1 — MOMENTO: a frase mais verdadeira ────────────────────────
    { id: 'empresa.momento', pergunta: 'Se você tivesse que escolher a frase mais verdadeira sobre sua empresa hoje, qual seria?', tipo: 'selecao', permiteDetalhe: true, estagio: 'contexto', bloco: 'momento', opcoes: [
      { valor: 'crescendo_rapido', rotulo: 'Está crescendo mais rápido do que consigo organizar' },
      { valor: 'depende_de_mim', rotulo: 'Depende muito de mim para funcionar' },
      { valor: 'estavel_sem_avancar', rotulo: 'Está estável, mas não avança como eu gostaria' },
      { valor: 'muito_trabalho', rotulo: 'Está me dando mais trabalho do que retorno' },
      { valor: 'recomecando', rotulo: 'Está recomeçando, depois de um período difícil' },
    ] },
    { id: 'empresa.crescer', pergunta: 'E o que você sente que segura a empresa hoje?', tipo: 'texto', estagio: 'tensao', bloco: 'momento' },

    // ─── BLOCO 2 — DECISÃO: como a empresa decide ───────────────────────────
    { id: 'empresa.decisao', pergunta: 'Quando você precisa saber se pode investir — tempo ou dinheiro —, como você descobre?', tipo: 'texto', estagio: 'tensao', bloco: 'decisao' },
    { id: 'empresa.preocupacao', pergunta: 'Hoje, o que mais ocupa o seu pensamento sobre a empresa?', tipo: 'selecao', permiteDetalhe: true, estagio: 'tensao', bloco: 'decisao', opcoes: [
      { valor: 'clientes', rotulo: 'Trazer mais clientes' },
      { valor: 'financeiro', rotulo: 'O dinheiro da empresa' },
      { valor: 'organizacao', rotulo: 'Organizar o dia a dia' },
      { valor: 'equipe', rotulo: 'Formar a equipe' },
      { valor: 'tempo', rotulo: 'Falta de tempo para tudo' },
      { valor: 'outro', rotulo: 'Outra coisa' },
    ] },

    // ─── BLOCO 3 — DEPENDÊNCIA: o fundador no centro ────────────────────────
    { id: 'empresa.dependencia', pergunta: 'Se você precisasse se afastar por 30 dias, o que aconteceria com a empresa?', tipo: 'texto', estagio: 'tensao', bloco: 'dependencia' },
    { id: 'empresa.horalivre', pergunta: 'Se tivesse uma hora livre por dia, onde você a investiria?', tipo: 'texto', estagio: 'proximo_movimento', bloco: 'dependencia' },

    // ─── BLOCO 4 — CLIENTES: o que faz voltarem ─────────────────────────────
    { id: 'empresa.clientes', pergunta: 'O que mais faz clientes voltarem para a sua empresa hoje?', tipo: 'texto', estagio: 'realidade', bloco: 'clientes' },
    { id: 'empresa.multiplicar', pergunta: 'Qual tipo de cliente você gostaria de multiplicar?', tipo: 'texto', estagio: 'proximo_movimento', bloco: 'clientes' },
    { id: 'historia.orgulho', pergunta: 'Do que você mais se orgulha no negócio hoje?', tipo: 'texto', estagio: 'evolucao', bloco: 'clientes' },

    // ─── BLOCO 5 — DINHEIRO: previsibilidade, não faturamento ───────────────
    { id: 'financeiro.previsao', pergunta: 'Você consegue prever, com segurança, quanto vai entrar no próximo mês?', tipo: 'selecao', permiteDetalhe: true, estagio: 'realidade', bloco: 'dinheiro', opcoes: [
      { valor: 'sim', rotulo: 'Sim, sei com números' },
      { valor: 'parcial', rotulo: 'Mais ou menos, no chute' },
      { valor: 'nao', rotulo: 'Não, nem sei o que vem' },
    ] },
    { id: 'financeiro.caixa', pergunta: 'Quando você olha o caixa, o que você vê primeiro: o que entrou, o que vai entrar, ou o que pode faltar?', tipo: 'texto', estagio: 'realidade', bloco: 'dinheiro' },

    // ─── BLOCO 6 — ENERGIA: o que consome, não o que toma tempo ─────────────
    { id: 'rotina.energia', pergunta: 'O que mais consumiu sua energia esta semana?', tipo: 'texto', estagio: 'realidade', bloco: 'energia' },
    { id: 'rotina.cabeca', pergunta: 'E o que mais ocupa sua cabeça hoje?', tipo: 'texto', estagio: 'realidade', bloco: 'energia' },
    { id: 'rotina.tranquilo', pergunta: 'Quando foi a última vez que você terminou o dia tranquilo?', tipo: 'texto', estagio: 'realidade', bloco: 'energia' },

    // ─── BLOCO 7 — VISÃO: a empresa funcionando como o fundador quer ────────
    { id: 'visao.funcionando', pergunta: 'Se a sua empresa funcionasse como você gostaria, o que seria diferente?', tipo: 'texto', estagio: 'proximo_movimento', bloco: 'visao' },
    { id: 'frente.proximo', pergunta: 'Qual o objetivo principal para os próximos 6 meses?', tipo: 'texto', estagio: 'proximo_movimento', bloco: 'visao' },
  ],
}

export const FLUXOS: Record<string, Fluxo> = {
  'primeira-conversa': PRIMEIRA_CONVERSA,
}
