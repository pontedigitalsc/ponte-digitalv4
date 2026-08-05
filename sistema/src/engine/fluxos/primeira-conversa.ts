import type { Fluxo } from '@/engine/tipos'

// P70 → P67 — PRIMEIRA SESSÃO ESTRATÉGICA (V4)
//
// A primeira conversa deixou de ser um questionário (24 perguntas) e deixa de
// ser uma descoberta longa (V3: 7 blocos / 18 etapas) para ser uma descoberta
// ENXUTA em 4 blocos / 10–14 interações — sem nunca virar cadastro.
//
// P67 — EXPERIÊNCIA COGNITIVA DE CONVERSA:
//   • Toda pergunta sabe o seu PORQUÊ (`contexto` + `motivo`) — o empresário
//     entende que a pergunta não é coleta, é leitura. Nenhuma pergunta é só
//     de cadastro.
//   • Toda pergunta estratégica tem opções (3–5) + "Minha situação é
//     diferente" (texto livre) — nunca uma caixa de texto vazia.
//   • Os blocos conversam entre si citando as palavras do empresário.
//   • O Retrato final (V4, "Primeiro diagnóstico cognitivo") é consequência
//     das hipóteses que os blocos formam, nunca um template.
//
// Os 4 blocos (pergunta-guia de aconselhamento):
//   1. atual     → "Onde sua empresa está hoje?"        (3)
//   2. peso      → "Onde o peso está?"                  (4 + 1 cond.)
//   3. evolucao  → "O que impede a evolução?"           (4)
//   4. atencao   → "O que merece atenção?"              (3 + 1 cond.)
//
// IMPORTANTE — IDs preservados: as engines de hipóteses, reações e memória
// evolutiva dependem dos IDs de pergunta (empresa.momento, rotina.energia,
// financeiro.previsao...). Nenhum ID muda; apenas a agrupação em blocos muda.
export const PRIMEIRA_CONVERSA: Fluxo = {
  id: 'primeira-conversa',
  nome: 'Primeira Sessão Estratégica',
  versao: 7,
  etapas: [
    // ─── BLOCO 1 — ATUAL: onde você está hoje ───────────────────────────────
    { id: 'empresa.momento', pergunta: 'Se você tivesse que escolher a frase mais verdadeira sobre sua empresa hoje, qual seria?', tipo: 'selecao', permiteDetalhe: true, estagio: 'contexto', bloco: 'atual', contexto: 'Antes de qualquer coisa... quero entender como você enxerga sua empresa neste momento. Não financeiramente. Mas como empresário.', motivo: 'A frase que você escolher vira a régua que uso para interpretar tudo o que você me contar daqui pra frente.', opcoes: [
      { valor: 'crescendo_rapido', rotulo: 'Está crescendo mais rápido do que consigo organizar' },
      { valor: 'depende_de_mim', rotulo: 'Depende muito de mim para funcionar' },
      { valor: 'estavel_sem_avancar', rotulo: 'Está estável, mas não avança como eu gostaria' },
      { valor: 'muito_trabalho', rotulo: 'Está me dando mais trabalho do que retorno' },
      { valor: 'recomecando', rotulo: 'Está recomeçando, depois de um período difícil' },
      { valor: 'outro', rotulo: 'Minha situação é diferente' },
    ] },
    { id: 'empresa.crescer', pergunta: 'E o que você sente que segura a empresa hoje?', tipo: 'selecao', bloco: 'atual', estagio: 'tensao', motivo: 'Saber o que trava o crescimento me ajuda a não te empurrar para frente de cabeça às avessas.', opcoes: [
      { valor: 'organizacao', rotulo: 'Falta de organização e processo' },
      { valor: 'capital', rotulo: 'Falta de dinheiro ou capital de giro' },
      { valor: 'tempo', rotulo: 'Falta de tempo — eu virei o gargalo' },
      { valor: 'clientes', rotulo: 'Falta de clientes' },
      { valor: 'equipe', rotulo: 'Falta de gente certa na equipe' },
      { valor: 'outro', rotulo: 'Minha situação é diferente' },
    ] },
    { id: 'empresa.clientes', pergunta: 'O que mais faz clientes voltarem para a sua empresa hoje?', tipo: 'selecao', bloco: 'atual', estagio: 'realidade', contexto: 'Quando o cliente volta, há sempre um motivo. Quero tentar enxergá-lo com você.', motivo: 'Entender por que os clientes voltam mostra onde está o conhecimento mais valioso da empresa — e o que vira previsibilidade.', opcoes: [
      { valor: 'qualidade', rotulo: 'A qualidade do produto ou serviço' },
      { valor: 'atendimento', rotulo: 'O atendimento que a empresa dá' },
      { valor: 'confianca', rotulo: 'A confiança que construímos' },
      { valor: 'preco', rotulo: 'O preço justo' },
      { valor: 'relacao', rotulo: 'O relacionamento de longo prazo' },
      { valor: 'outro', rotulo: 'Minha situação é diferente' },
    ] },

    // ─── BLOCO 2 — PESO: onde o peso está ───────────────────────────────────
    { id: 'rotina.energia', pergunta: 'O que mais consumiu sua energia nesta semana?', tipo: 'selecao', bloco: 'peso', estagio: 'realidade', contexto: 'Quero entender o que realmente consome você — não o tempo, a energia.', motivo: 'O que drena sua energia quase sempre é também o que ocupa sua cabeça. Vou olhar os dois juntos.', opcoes: [
      { valor: 'operacao', rotulo: 'Apagar incêndio do dia a dia — eu mesmo' },
      { valor: 'clientes', rotulo: 'Resolver problemas de clientes' },
      { valor: 'equipe', rotulo: 'Gerenciar ou ensinar a equipe' },
      { valor: 'financeiro', rotulo: 'A preocupação com o dinheiro' },
      { valor: 'decisoes', rotulo: 'Decisões grandes sem clareza' },
      { valor: 'outro', rotulo: 'Minha situação é diferente' },
    ] },
    { id: 'rotina.cabeca', pergunta: 'E o que mais ocupa a sua cabeça hoje?', tipo: 'selecao', bloco: 'peso', estagio: 'realidade', contexto: 'Você já me disse o que consumiu sua energia. Agora, o que ocupa o centro da sua atenção?', motivo: 'O que ocupa sua cabeça define onde prestamos atenção primeiro nesta conversa.', opcoes: [
      { valor: 'futuro', rotulo: 'Onde a empresa estará daqui a alguns meses' },
      { valor: 'mes', rotulo: 'Se vamos conseguir cumprir o mês' },
      { valor: 'equipe', rotulo: 'Quem vai tocar cada área' },
      { valor: 'crescimento', rotulo: 'Como crescer sem bagunçar o que funciona' },
      { valor: 'operacional', rotulo: 'Os problemas operacionais de hoje' },
      { valor: 'outro', rotulo: 'Minha situação é diferente' },
    ] },
    { id: 'financeiro.previsao', pergunta: 'Você consegue prever, com segurança, quanto vai entrar no próximo mês?', tipo: 'selecao', permiteDetalhe: true, bloco: 'peso', estagio: 'realidade', contexto: 'Agora vou olhar a parte que mais engana a leitura de uma empresa: o dinheiro.', motivo: 'Sem previsão, toda decisão vira aposta. Quero saber com que segurança a empresa lê o próprio futuro próximo.', opcoes: [
      { valor: 'sim', rotulo: 'Sim, sei com números' },
      { valor: 'parcial', rotulo: 'Mais ou menos, no chute' },
      { valor: 'nao', rotulo: 'Não, nem sei o que vem' },
      { valor: 'outro', rotulo: 'Minha situação é diferente' },
    ] },
    { id: 'empresa.dependencia', pergunta: 'Se você precisasse se afastar por 30 dias, o que aconteceria com a empresa?', tipo: 'selecao', bloco: 'peso', estagio: 'tensao', contexto: 'Essa é a pergunta que separa um pequeno negócio de uma empresa de verdade.', motivo: 'Quando o conhecimento está só na sua cabeça, a empresa cresce até o tamanho dele. Quero saber onde a sua está.', opcoes: [
      { valor: 'pararia', rotulo: 'A empresa pararia de funcionar' },
      { valor: 'sofreria', rotulo: 'Sofreria muito, mas não pararia' },
      { valor: 'devagar', rotulo: 'Continuaria, mas devagar' },
      { valor: 'quase_sozinha', rotulo: 'Andaria quase sozinha, com alguns buracos' },
      { valor: 'estancaria', rotulo: 'Estancaria até eu voltar' },
      { valor: 'outro', rotulo: 'Minha situação é diferente' },
    ] },
    // P65 — adaptação: quem mostra delegação (equipe, processo, repasse) não
    // recebe pergunta básica sobre o que faria com a própria hora.
    { id: 'empresa.horalivre', pergunta: 'Se tivesse uma hora livre por dia, onde você a investiria?', tipo: 'selecao', bloco: 'peso', estagio: 'proximo_movimento', motivo: 'A resposta quase sempre revela o que a pessoa mais deseja. A sua, sim.', condicao: {
      pularSe: { perguntaId: 'empresa.dependencia', palavras: ['equipe', 'time', 'funcionário', 'funcionario', 'funcionários', 'delego', 'delegar', 'repasso', 'pessoas', 'quase sozinha', 'quase sozinho'] },
    }, opcoes: [
      { valor: 'projeto', rotulo: 'Um projeto que ficou parado' },
      { valor: 'planejamento', rotulo: 'Planejar e organizar o negócio' },
      { valor: 'equipe', rotulo: 'Cuidar da equipe' },
      { valor: 'descanso', rotulo: 'Descansar e pensar em silêncio' },
      { valor: 'clientes', rotulo: 'Atender ou prospectar clientes' },
      { valor: 'outro', rotulo: 'Outra coisa' },
    ] },

    // ─── BLOCO 3 — EVOLUÇÃO: o que impede a evolução ─────────────────────────
    { id: 'empresa.decisao', pergunta: 'Quando você precisa saber se pode investir — tempo ou dinheiro —, como você descobre?', tipo: 'selecao', bloco: 'evolucao', estagio: 'tensao', contexto: 'Como a empresa decide é o coração dela. Vou prestar atenção nesse padrão.', motivo: 'Decisões que dependem só do momento costumam se repetir do mesmo jeito — e aí o padrão vira o resultado.', opcoes: [
      { valor: 'instinto', rotulo: 'No feeling — confio no meu instinto' },
      { valor: 'momento', rotulo: 'Na hora, quando a oportunidade aparece' },
      { valor: 'caixa', rotulo: 'Só invisto se o dinheiro em caixa deixar' },
      { valor: 'parceria', rotulo: 'Trocando ideia com alguém de confiança' },
      { valor: 'sem_criterio', rotulo: 'Confesso que não tenho um critério claro' },
      { valor: 'outro', rotulo: 'Minha situação é diferente' },
    ] },
    { id: 'empresa.preocupacao', pergunta: 'Hoje, o que mais ocupa o seu pensamento sobre a empresa?', tipo: 'selecao', permiteDetalhe: true, bloco: 'evolucao', estagio: 'tensao', contexto: 'Entendi onde o peso está agora. Isso me diz onde colocamos a atenção primeiro.', motivo: 'O que mais ocupa seu pensamento define o primeiro ponto de atenção do retrato.', opcoes: [
      { valor: 'clientes', rotulo: 'Trazer mais clientes' },
      { valor: 'financeiro', rotulo: 'O dinheiro da empresa' },
      { valor: 'organizacao', rotulo: 'Organizar o dia a dia' },
      { valor: 'equipe', rotulo: 'Formar a equipe' },
      { valor: 'tempo', rotulo: 'Falta de tempo para tudo' },
      { valor: 'outro', rotulo: 'Outra coisa' },
    ] },
    { id: 'financeiro.caixa', pergunta: 'Quando você olha o caixa, o que você vê primeiro: o que entrou, o que vai entrar, ou o que pode faltar?', tipo: 'selecao', bloco: 'evolucao', estagio: 'realidade', contexto: 'O que você vê primeiro no caixa revela como a empresa lê o próprio dinheiro.', motivo: 'Ler só o que já entrou é olhar o passado; ver o que pode faltar é o que protege a próxima decisão.', opcoes: [
      { valor: 'entrou', rotulo: 'O que já entrou' },
      { valor: 'entrara', rotulo: 'O que vai entrar' },
      { valor: 'faltara', rotulo: 'O que pode faltar' },
      { valor: 'diferenca', rotulo: 'A diferença entre o que entra e o que sai' },
      { valor: 'pouco', rotulo: 'Confesso que olho pouco o caixa' },
      { valor: 'outro', rotulo: 'Minha situação é diferente' },
    ] },
    { id: 'rotina.tranquilo', pergunta: 'Quando foi a última vez que você terminou o dia tranquilo?', tipo: 'selecao', bloco: 'evolucao', estagio: 'realidade', contexto: 'Uma empresa que não descansa também não pensa. Esse sinal importa mais do que parece.', motivo: 'O fim de dia tranquilo é um termômetro de como a organização está desenhada hoje.', opcoes: [
      { valor: 'hoje', rotulo: 'Hoje, ou nos últimos dias' },
      { valor: 'semanas', rotulo: 'Há algumas semanas' },
      { valor: 'meses', rotulo: 'Há meses' },
      { valor: 'nao_lembro', rotulo: 'Não me lembro' },
      { valor: 'nunca', rotulo: 'Não me lembro de um dia assim' },
      { valor: 'outro', rotulo: 'Minha situação é diferente' },
    ] },

    // ─── BLOCO 4 — ATENÇÃO: o que merece atenção ─────────────────────────────
    { id: 'visao.funcionando', pergunta: 'Se a sua empresa funcionasse como você gostaria, o que seria diferente?', tipo: 'selecao', bloco: 'atencao', estagio: 'proximo_movimento', contexto: 'Essa imagem da empresa funcionando como você gostaria é a direção de tudo.', motivo: 'Sem essa imagem, decisão vira reação. Com ela, vira escolha.', opcoes: [
      { valor: 'sem_mim', rotulo: 'Rodaria bem mesmo quando eu não estivesse' },
      { valor: 'previsivel', rotulo: 'Teria um resultado previsível todo mês' },
      { valor: 'equipe', rotulo: 'A equipe decidiria sem me consultar' },
      { valor: 'foco', rotulo: 'Eu trabalharia menos e com mais foco' },
      { valor: 'crescimento', rotulo: 'Cresceria sem bagunçar o que já funciona' },
      { valor: 'outro', rotulo: 'Minha situação é diferente' },
    ] },
    { id: 'frente.proximo', pergunta: 'Qual o objetivo principal para os próximos 6 meses?', tipo: 'selecao', bloco: 'atencao', estagio: 'proximo_movimento', contexto: 'Agora, para onde vamos olhar nos próximos 6 meses?', motivo: 'Um objetivo concreto transforma a percepção desta conversa em decisão na vida real.', opcoes: [
      { valor: 'crescer', rotulo: 'Crescer o faturamento' },
      { valor: 'organizar', rotulo: 'Organizar a operação' },
      { valor: 'lucro', rotulo: 'Aumentar o lucro, mesmo sem vender mais' },
      { valor: 'equipe', rotulo: 'Formar a equipe' },
      { valor: 'fidelizar', rotulo: 'Fidelizar os melhores clientes' },
      { valor: 'outro', rotulo: 'Minha situação é diferente' },
    ] },
    { id: 'empresa.multiplicar', pergunta: 'Qual tipo de cliente você gostaria de multiplicar?', tipo: 'selecao', bloco: 'atencao', estagio: 'proximo_movimento', contexto: 'Saber quem você quer ver voltando é uma escolha. Você tem.', motivo: 'Multiplicar o cliente certo vale mais do que atrair qualquer cliente.', opcoes: [
      { valor: 'frequencia', rotulo: 'Quem compra com mais frequência' },
      { valor: 'indica', rotulo: 'Quem indica outros clientes' },
      { valor: 'fiel', rotulo: 'Quem já é fiel há muito tempo' },
      { valor: 'faturamento', rotulo: 'Quem gera maior faturamento' },
      { valor: 'facil', rotulo: 'Quem é mais fácil de atender' },
      { valor: 'outro', rotulo: 'Minha situação é diferente' },
    ] },
    // P65 — a Ponte questiona: quando o empresário fala em crescer, ela pede
    // precisão. "Crescer costuma significar coisas diferentes..."
    { id: 'exploracao.crescer', pergunta: 'Crescer costuma significar coisas diferentes para empresários diferentes. Quando você fala crescer, pensa mais em:', tipo: 'selecao', bloco: 'atencao', estagio: 'proximo_movimento', contexto: 'Você falou em crescer. Para eu acompanhar a direção certa, preciso saber o que isso significa para você.', motivo: 'Crescer vender mais é um caminho; crescer o lucro ou trabalhar menos é outro. A direção muda o que vale observar.', condicao: {
      apenasSe: { perguntaId: 'frente.proximo', palavras: ['crescer', 'crescimento', 'expandir', 'aumentar', 'mais vendas', 'ganhar mais', 'abrir', 'evoluir', 'escala', 'faturar'] },
    }, opcoes: [
      { valor: 'vender_mais', rotulo: 'Vender mais' },
      { valor: 'ganhar_mais', rotulo: 'Ganhar mais (mesmo sem vender mais)' },
      { valor: 'trabalhar_menos', rotulo: 'Trabalhar menos' },
      { valor: 'abrir_unidades', rotulo: 'Abrir novas unidades ou filiais' },
      { valor: 'outro', rotulo: 'Outra coisa' },
    ] },
  ],
}

export const FLUXOS: Record<string, Fluxo> = {
  'primeira-conversa': PRIMEIRA_CONVERSA,
}