import type { Fluxo } from '@/engine/tipos'

// P86 — CONVERSA DE CONFIGURAÇÃO COGNITIVA DO FOUNDER PRINCIPAL (BLOCO B)
//
// O Founder Principal administra a Ponte Digital usando a mesma ferramenta que
// a Ponte constrói para seus Founders. Antes de configurar o produto, a Ponte
// precisa entender QUEM está administrando-a e COMO ele pensa a própria empresa.
//
// NÃO é formulário nem cadastro: é uma configuração cognitiva profunda, com a
// mesma experiência da Primeira Sessão — perguntas com `contexto` + `motivo`,
// opções estratégicas (3–5 + "Minha situação é diferente") e blocos que
// conversam entre si. Reutiliza todo o cérebro existente: conversation-engine,
// adaptive-question-engine, reações, retrato estratégico. Nenhum motor novo.
//
// Os blocos são prefixados com `fundador_` para não colidir com os blocos da
// Primeira Sessão (`atual`, `peso`, `evolucao`, `atencao`) nem com as regras
// de devolutiva/reacão existentes.
//
// Os 6 blocos (pergunta-guia):
//   1. fundador_identidade → "Quem está administrando a Ponte?"          (2)
//   2. fundador_realidade  → "A realidade de hoje."                       (2)
//   3. fundador_fluxo      → "Como o trabalho acontece?"                  (2)
//   4. fundador_decisoes   → "Como as decisões acontecem?"                (2)
//   5. fundador_evolucao   → "O que a Ponte já aprendeu?"                 (2)
//   6. fundador_atencao    → "O que merece atenção?"                      (3)
// Total: 13 interações (dentro da faixa 10–14 da Primeira Sessão V4).
//
// IMPORTANTE — separação SABEMOS / ACREDITAMOS / INVESTIGANDO: as respostas
// deste fluxo alimentam a configuração (umas verbais em hipoteses-estrategicas.ts)
// sempre como hipóteses determinísticas derivadas da evidência real, nunca invenção.
export const CONFIGURACAO_FOUNDER: Fluxo = {
  id: 'configuracao-founder',
  nome: 'Configuração Cognitiva do Founder',
  versao: 1,
  etapas: [
    // ─── BLOCO 1 — IDENTIDADE: quem administra a Ponte ────────────────────────
    { id: 'fundador.papel', pergunta: 'Para você, o que a Ponte é hoje?', tipo: 'selecao', permiteDetalhe: true, estagio: 'contexto', bloco: 'fundador_identidade', contexto: 'Antes de falarmos de números e rotinas, quero entender o que a Ponte é para você — porque é a ela que estamos ajustando nesta conversa.', motivo: 'A frase que você escolher vira o ponto de partida da minha leitura sobre como você a administra.', opcoes: [
      { valor: 'ferramenta_decisao', rotulo: 'Uma ferramenta para empresas decidirem melhor' },
      { valor: 'produto_em_construcao', rotulo: 'Um produto que ainda está sendo construído' },
      { valor: 'empresa_sustentavel', rotulo: 'Uma empresa que precisa se sustentar sozinha' },
      { valor: 'provando_tese', rotulo: 'A prova de que a abordagem dela funciona' },
      { valor: 'outro', rotulo: 'Minha situação é diferente' },
    ] },
    { id: 'identidade.expectativa', pergunta: 'O que você mais espera da Ponte nos próximos meses?', tipo: 'selecao', bloco: 'fundador_identidade', estagio: 'contexto', contexto: 'Agora que sei o que ela é para você, quero entender para onde você a está levando.', motivo: 'Sua expectativa define a régua que uso para ler cada decisão sua sobre a Ponte.', opcoes: [
      { valor: 'uso_real', rotulo: 'Que Founders reais a usem e voltem' },
      { valor: 'aprendizado', rotulo: 'Que a gente aprenda com dados reais antes de investir mais' },
      { valor: 'sustentabilidade', rotulo: 'Que ela se torne sustentável' },
      { valor: 'prova', rotulo: 'Que ela prove a tese de fundo' },
      { valor: 'outro', rotulo: 'Minha situação é diferente' },
    ] },

    // ─── BLOCO 2 — REALIDADE: o que é verdade hoje ────────────────────────────
    { id: 'realidade.momento', pergunta: 'Se você tivesse que ser honesto numa frase: como está a Ponte hoje?', tipo: 'selecao', permiteDetalhe: true, bloco: 'fundador_realidade', estagio: 'realidade', contexto: 'Não quero a versão do sonho — quero a versão real, do que começa e termina no dia de hoje.', motivo: 'A leitura mais útil para a Ponte começa reconhecendo a diferença entre o projeto e a execução.', opcoes: [
      { valor: 'formacao', rotulo: 'Está em formação — mais visão do que operação' },
      { valor: 'fundacao', rotulo: 'Acabou de ser fundada e está começando a andar' },
      { valor: 'uso', rotulo: 'Já funciona, mas ainda são poucas pessoas de verdade usando' },
      { valor: 'ferramenta_interna', rotulo: 'Está sendo usada por nós, mas ainda não pelos Founders de rua' },
      { valor: 'outro', rotulo: 'Minha situação é diferente' },
    ] },
    { id: 'realidade.uso', pergunta: 'Quem mais usa a Ponte hoje, além de você?', tipo: 'selecao', bloco: 'fundador_realidade', estagio: 'realidade', contexto: 'Agora me conta: isso é uma ferramenta de uma pessoa só, ou já tem mão de outros?', motivo: 'O estágio de uso define quanta infraestrutura a Ponte precisa ter — e onde sua energia pessoal se concentra.', opcoes: [
      { valor: 'so_eu', rotulo: 'Só eu, e olhe lá' },
      { valor: 'equipe', rotulo: 'Eu e a equipe interna' },
      { valor: 'founders', rotulo: 'Já tem Founders reais usando' },
      { valor: 'poucos', rotulo: 'Poucas pessoas, em testes' },
      { valor: 'outro', rotulo: 'Minha situação é diferente' },
    ] },

    // ─── BLOCO 3 — FLUXO: como o trabalho acontece ────────────────────────────
    { id: 'fluxo.trabalho', pergunta: 'Como o trabalho da Ponte está organizado hoje?', tipo: 'selecao', bloco: 'fundador_fluxo', estagio: 'realidade', contexto: 'Agora quero entender como as coisas acontecem — não como estão no organograma, mas como acontecem.', motivo: 'A forma como o trabalho flui hoje mostra onde a Ponte depende de você e onde ela já anda sozinha.', opcoes: [
      { valor: 'voce_tudo', rotulo: 'Praticamente tudo passa por você' },
      { valor: 'voce_mais_time', rotulo: 'Você decide, e o time executa' },
      { valor: 'time_proprio', rotulo: 'O time conduz, você revisa' },
      { valor: 'terceiros', rotulo: 'Mistura de terceiros e gente interna' },
      { valor: 'outro', rotulo: 'Minha situação é diferente' },
    ] },
    { id: 'fluxo.afastamento', pergunta: 'Se você se afastasse por 30 dias, o que aconteceria com a Ponte?', tipo: 'selecao', bloco: 'fundador_fluxo', estagio: 'tensao', contexto: 'Essa é uma pergunta fria, mas o fundador de uma empresa está sempre dando resposta.', motivo: 'A resposta mostra se a área que você dirige já tem vida própria ou se é uma extensão sua — e isso define muito da próxima fase.', opcoes: [
      { valor: 'pararia', rotulo: 'Pararia quase tudo' },
      { valor: 'arrastaria', rotulo: 'Seria levada no improviso' },
      { valor: 'continuaria', rotulo: 'Continuaria, mais lenta' },
      { valor: 'quase_sozinha', rotulo: 'Andaria quase sozinha, com nossas decisões' },
      { valor: 'outro', rotulo: 'Minha situação é diferente' },
    ] },

    // ─── BLOCO 4 — DECISÕES: como as decisões acontecem ───────────────────────
    { id: 'decisoes.influencia', pergunta: 'O que mais influencia suas decisões sobre a Ponte hoje?', tipo: 'selecao', permiteDetalhe: true, bloco: 'fundador_decisoes', estagio: 'tensao', contexto: 'Toda decisão segue um peso. Quero enxergar o que pesa mais nas suas.', motivo: 'Saber o que dirige suas decisões me ajuda a trazer a informação certa na hora certa — em vez de só opinião.', opcoes: [
      { valor: 'evidencia', rotulo: 'Dados e evidência dos encontros com Founders' },
      { valor: 'intuicao', rotulo: 'Minha intuição de fundador' },
      { valor: 'escassez', rotulo: 'O que os recursos permitem hoje' },
      { valor: 'urgencia', rotulo: 'O que está urgente à frente' },
      { valor: 'outro', rotulo: 'Minha situação é diferente' },
    ] },
    { id: 'decisoes.trava', pergunta: 'O que mais trava a Ponte hoje, no seu ponto de vista?', tipo: 'selecao', bloco: 'fundador_decisoes', estagio: 'tensao', contexto: 'Todo travamento tem um nome. Para mim, o que a gente não nomeia fica pesando no invisível.', motivo: 'O que você nomeia como travamento é onde a minha atenção vai primeiro — mas quero confirmar com outras camadas.', opcoes: [
      { valor: 'proposicao', rotulo: 'Falta de produto/ajuste clara' },
      { valor: 'recursos', rotulo: 'Falta de recursos (dinheiro, tempo, pessoas)' },
      { valor: 'operacao', rotulo: 'Estamos ocupados demais construindo sem recuar' },
      { valor: 'tracao', rotulo: 'Pouca tração: poucos Founders de verdade usando' },
      { valor: 'outro', rotulo: 'Minha situação é diferente' },
    ] },

    // ─── BLOCO 5 — EVOLUÇÃO: o que a Ponte já aprendeu ────────────────────────
    { id: 'evolucao.aprendizado', pergunta: 'O que a Ponte já aprendeu, até hoje, que vale mais para ela?', tipo: 'selecao', permiteDetalhe: true, bloco: 'fundador_evolucao', estagio: 'evolucao', contexto: 'Antes de decidirmos o próximo passo, quero saber o que já foi acumulado — a Ponte é uma empresa de conhecimento.', motivo: 'As descobertas que já fizemos são o patrimônio que esta configuração vai proteger — quero saber se você as enxerga.', opcoes: [
      { valor: 'metodo', rotulo: 'A metodologia de leitura em si' },
      { valor: 'retornos', rotulo: 'Aprender com os retornos de quem testou' },
      { valor: 'produto', rotulo: 'Aprender a construir o produto certo para quem usa' },
      { valor: 'processo', rotulo: 'Como tornar a operação reproduzível' },
      { valor: 'outro', rotulo: 'Minha situação é diferente' },
    ] },
    { id: 'evolucao.registro', pergunta: 'Onde mora hoje o conhecimento dos resultados que a Ponte vê?', tipo: 'selecao', bloco: 'fundador_evolucao', estagio: 'evolucao', contexto: 'Quando uma conversa termina, o que a empresa faz com o que descobriu nela?', motivo: 'Onde o conhecimento mora mostra se a Ponte está virando uma empresa que decide sobre evidência ou sobre memória.', opcoes: [
      { valor: 'minha_cabeca', rotulo: 'Na minha cabeça, principalmente' },
      { valor: 'documentos', rotulo: 'Em docs e arquivos, espalhados' },
      { valor: 'sistema', rotulo: 'No próprio sistema da Ponte, como memória' },
      { valor: 'pouco_registrado', rotulo: 'Honestamente, pouco ainda é registrado' },
      { valor: 'outro', rotulo: 'Minha situação é diferente' },
    ] },

    // ─── BLOCO 6 — ATENÇÃO: o que merece atenção ──────────────────────────────
    { id: 'atencao.mudanca', pergunta: 'Se você pudesse mudar UMA coisa na Ponte hoje, o que seria?', tipo: 'selecao', permiteDetalhe: true, bloco: 'fundador_atencao', estagio: 'proximo_movimento', contexto: 'Chega uma hora em que tudo parece importante. Eu preciso da única — a que mexe em todas as outras.', motivo: 'Sua prioridade única vira a agulha da minha configuração: é o que eu vou observar e cobrar junto.', opcoes: [
      { valor: 'founders_uso', rotulo: 'Conseguir Founders usando e voltando' },
      { valor: 'estabilidade_interna', rotulo: 'Estabilizar a operação da própria Ponte' },
      { valor: 'conhecimento', rotulo: 'Transformar o conhecimento em decisão melhor' },
      { valor: 'decolagem', rotulo: 'Fazer a coisa girar com menos de mim' },
      { valor: 'outro', rotulo: 'Minha situação é diferente' },
    ] },
    { id: 'atencao.sucesso', pergunta: 'Como você vai saber — sem usar a régua de ninguém — que a Ponte está indo bem?', tipo: 'selecao', bloco: 'fundador_atencao', estagio: 'proximo_movimento', contexto: 'Toda empresa precisa de uma medida que o dinheiro e a vaidade não enganam.', motivo: 'Seu critério de sucesso é o que transforma esta conversa em observação nas próximas semanas.', opcoes: [
      { valor: 'retorno', rotulo: 'Quando quem foi por conta própria volta por conta própria' },
      { valor: 'decisao', rotulo: 'Quando vejo um Founder decidindo melhor depois de uma conversa' },
      { valor: 'fluxo_interno', rotulo: 'Quando a Ponte anda sem precisar de mim em cada passo' },
      { valor: 'repeticao', rotulo: 'Quando existe um exemplo verificado de quem usou e falou' },
      { valor: 'outro', rotulo: 'Minha situação é diferente' },
    ] },
    { id: 'atencao.nao_dito', pergunta: 'Tem algo sobre a Ponte que você me contaria agora e que nunca disse a ninguém — nem registrou?', tipo: 'texto', bloco: 'fundador_atencao', estagio: 'proximo_movimento', contexto: 'A última fronteira desta conversa é a mais difícil: o que fica fora do planejamento.', motivo: 'O que você guarda revela onde a Ponte pode crescer sem desnudar — e me ajuda a configurar o que merece atenção daqui pra frente.' },
  ],
}

// P86-B1 — DECISÃO DE FLUXO (função pura, determinística).
// A rota consulta o estado real da configuração e chama esta decisão:
//   • FOUNDER_PRINCIPAL ainda sem config concluída → 'configuracao-founder'
//   • qualquer outro caso                         → 'primeira-conversa'
// Derivada apenas de `platformRole` (servidor) + estado real de Conversa;
// o cliente nunca controla o fluxo escolhido.
export function decisaoFluxoInicial(
  eFounderPrincipal: boolean,
  configuracaoConcluida: boolean,
): 'primeira-conversa' | 'configuracao-founder' {
  if (eFounderPrincipal && !configuracaoConcluida) return 'configuracao-founder'
  return 'primeira-conversa'
}