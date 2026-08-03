import type { Fluxo } from '@/engine/tipos'

// P54 — A primeira conversa agora começa pela EMPRESA, não pelo empresário.
// A ordem é: qual é a empresa, o que ela faz, há quanto tempo existe, como
// está vivendo este momento — e só então quem é você dentro dessa história.
// Cada pergunta entrega valor antes de pedir uma resposta (P54 Etapa 2) e
// perguntas estratégicas ganham respostas rápidas com campo opcional
// "Se quiser, conte mais" (P54 Etapa 3). A estrutura de conselheiro em 5
// estágios permanece intacta:
//   Contexto → Realidade → Tensão → Evolução → Próximo Movimento
export const PRIMEIRA_CONVERSA: Fluxo = {
  id: 'primeira-conversa',
  nome: 'Primeira Conversa',
  versao: 5,
  etapas: [
    // ─── ESTÁGIO 1 — CONTEXTO: a empresa primeiro, só depois o empresário ──
    { id: 'empresa.nome',     pergunta: 'Para começar, me conta: qual é o nome da sua empresa?', tipo: 'texto', estagio: 'contexto' },
    { id: 'empresa.oque',     pergunta: 'Empresas que sabem explicar o que fazem em uma frase atraem melhor o que precisam. Como você explicaria a sua?', tipo: 'texto', estagio: 'contexto' },
    { id: 'empresa.haquanto', pergunta: 'Há quanto tempo a sua empresa existe?', tipo: 'selecao', permiteDetalhe: true, estagio: 'contexto', opcoes: [
      { valor: 'menos_de_1_ano', rotulo: 'Menos de 1 ano' },
      { valor: 'de_1_a_3_anos',  rotulo: 'De 1 a 3 anos' },
      { valor: 'de_3_a_5_anos',  rotulo: 'De 3 a 5 anos' },
      { valor: 'mais_de_5_anos', rotulo: 'Mais de 5 anos' },
    ] },
    { id: 'empresa.momento',  pergunta: 'Como está vivendo este momento?', tipo: 'selecao', permiteDetalhe: true, estagio: 'contexto', opcoes: [
      { valor: 'crescendo',             rotulo: 'Crescendo' },
      { valor: 'estavel',               rotulo: 'Estável' },
      { valor: 'organizando',           rotulo: 'Organizando' },
      { valor: 'recomecando',           rotulo: 'Recomeçando' },
      { valor: 'enfrentando_dificuldades', rotulo: 'Enfrentando dificuldades' },
    ] },
    { id: 'empresario.quem',  pergunta: 'E você? Quem é você dentro dessa história?',      tipo: 'texto', estagio: 'contexto' },
    { id: 'historia.nascer',  pergunta: 'Como sua empresa nasceu?',                        tipo: 'texto', estagio: 'contexto' },
    { id: 'historia.momento', pergunta: 'Qual momento mais marcou essa trajetória até hoje?', tipo: 'texto', estagio: 'contexto' },

    // ─── ESTÁGIO 2 — REALIDADE: como a empresa funciona de verdade ─────────
    { id: 'empresa.clientes', pergunta: 'Empresas que conhecem o ritmo dos próprios clientes crescem com mais previsibilidade. O que mais faz clientes voltarem para a sua hoje?', tipo: 'texto', estagio: 'realidade' },
    { id: 'rotina.pressao',   pergunta: 'Em que momento do dia você sente maior pressão?', tipo: 'texto', estagio: 'realidade' },
    { id: 'rotina.energia',   pergunta: 'O que mais consumiu sua energia esta semana?',    tipo: 'texto', estagio: 'realidade' },
    { id: 'rotina.cabeca',    pergunta: 'O que mais ocupa sua cabeça hoje?',               tipo: 'texto', estagio: 'realidade' },
    { id: 'rotina.tranquilo', pergunta: 'Quando foi a última vez que você terminou o dia tranquilo?', tipo: 'texto', estagio: 'realidade' },

    // ─── ESTÁGIO 3 — TENSÃO: o que trava, o que dói, o que pesa ────────────
    { id: 'empresa.crescer',  pergunta: 'Na maioria das empresas, o que trava o crescimento é quase invisível no dia a dia. O que você sente que segura a sua?', tipo: 'texto', estagio: 'tensao' },
    { id: 'empresa.decisao',  pergunta: 'Decidir é o trabalho mais caro de um empresário. Quando precisa saber se pode investir, como você descobre?', tipo: 'texto', estagio: 'tensao' },
    { id: 'empresa.preocupacao', pergunta: 'Hoje, sua maior preocupação é:', tipo: 'selecao', permiteDetalhe: true, estagio: 'tensao', opcoes: [
      { valor: 'clientes',     rotulo: 'Clientes' },
      { valor: 'financeiro',   rotulo: 'Financeiro' },
      { valor: 'organizacao',  rotulo: 'Organização' },
      { valor: 'equipe',       rotulo: 'Equipe' },
      { valor: 'tempo',        rotulo: 'Tempo' },
      { valor: 'outro',        rotulo: 'Outro' },
    ] },
    { id: 'empresa.dependencia', pergunta: 'Se você precisasse se afastar por 30 dias, o que aconteceria com a empresa?', tipo: 'texto', estagio: 'tensao' },
    { id: 'historia.mudanca', pergunta: 'Se pudesse voltar no início, o que faria diferente?', tipo: 'texto', estagio: 'tensao' },
    { id: 'frente.diferente', pergunta: 'O que você faria diferente se pudesse voltar ao início da semana?', tipo: 'texto', estagio: 'tensao' },

    // ─── ESTÁGIO 4 — EVOLUÇÃO: aprendizado como patrimônio ─────────────────
    { id: 'historia.orgulho', pergunta: 'Do que você mais se orgulha no negócio hoje?',     tipo: 'texto', estagio: 'evolucao' },
    { id: 'frente.funcionou', pergunta: 'O que funcionou melhor do que esperava ultimamente?', tipo: 'texto', estagio: 'evolucao' },
    { id: 'frente.surpresa',  pergunta: 'Algum cliente surpreendeu você esta semana?',      tipo: 'texto', estagio: 'evolucao' },

    // ─── ESTÁGIO 5 — PRÓXIMO MOVIMENTO: direção ─────────────────────────────
    { id: 'frente.proximo',   pergunta: 'Qual o objetivo principal para os próximos 6 meses?', tipo: 'texto', estagio: 'proximo_movimento' },
    { id: 'empresa.multiplicar', pergunta: 'Qual tipo de cliente você gostaria de multiplicar?', tipo: 'texto', estagio: 'proximo_movimento' },
    { id: 'empresa.horalivre', pergunta: 'Se tivesse uma hora livre por dia, onde investiria?', tipo: 'texto', estagio: 'proximo_movimento' },
  ],
}

export const FLUXOS: Record<string, Fluxo> = {
  'primeira-conversa': PRIMEIRA_CONVERSA,
}
