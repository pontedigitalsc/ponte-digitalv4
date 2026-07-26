// Micro-reações para a Primeira Conversa
// Cada pergunta tem uma reação padrão que demonstra escuta e cria conexão.
// Para respostas abertas, usa template genérico.


const reacoes: Record<string, string> = {
  // ─── Bloco 1 — Empresa ─────────────────────────────────────────────────
  'empresa.segmento':      'Saber o segmento me ajuda a entender quais desafios são comuns no seu ramo e quais práticas costumam funcionar melhor.',
  'empresa.tempo':         'O tempo de mercado revela o nível de maturidade da operação. Empresas mais novas enfrentam desafios diferentes de quem já está estabelecido.',
  'empresa.funcionarios':  'O tamanho da equipe influencia diretamente a complexidade da gestão. Quanto mais pessoas, mais processos e comunicação são necessários.',
  'empresa.faturamento':   'A faixa de faturamento me dá uma referência do porte e do potencial de crescimento. Cada escala exige um tipo diferente de planejamento.',

  // ─── Bloco 2 — Operação ────────────────────────────────────────────────
  'operacao.aquisicao':    'Saber como os clientes chegam até você mostra onde concentrar esforços de marketing e vendas para crescer de forma consistente.',
  'operacao.produto':      'Identificar o carro-chefe é essencial para proteger o que gera mais receita e encontrar oportunidades em outros produtos ou serviços.',
  'operacao.lucro':        'Margem é o que sustenta o negócio no longo prazo. Saber onde ela é melhor ajuda a decidir onde focar energia e recursos.',
  'operacao.trabalhoso':   'O que mais dá trabalho nem sempre é o que mais traz retorno. Identificar essa diferença é o primeiro passo para ganhar eficiência.',
  'operacao.horas':        'A quantidade de horas dedicadas ao negócio revela o quanto a operação depende de você pessoalmente — e onde uma delegação faria diferença.',

  // ─── Bloco 3 — Gestão ──────────────────────────────────────────────────
  'gestao.contratacao':    'Cada contratação impacta diretamente a cultura e o custo do negócio. Entender como você decide ajuda a prever o ritmo de crescimento da equipe.',
  'gestao.promocao':       'Decidir promoções sem critérios claros pode gerar insatisfação. Mapear esse processo evita que decisões importantes sejam tomadas no impulso.',
  'gestao.caixa':          'A frequência com que o caixa é acompanhado é um dos maiores indicadores de saúde financeira. Quanto mais regular, menor o risco de surpresas.',
  'gestao.decisao':        'As decisões mais difíceis revelam onde está a verdadeira pressão do negócio. Isso me ajuda a entender suas prioridades reais.',

  // ─── Bloco 4 — Problemas ───────────────────────────────────────────────
  'problemas.insonia':     'O que tira o sono de um empresário geralmente é um problema estrutural, não pontual. Identificá-lo é o primeiro passo para tratá-lo.',
  'problemas.repeticao':   'Problemas que se repetem indicam que a causa raiz ainda não foi resolvida. Cada repetição desgasta um pouco mais a equipe e os recursos.',
  'problemas.perda':       'Perdas que passam despercebidas são as mais perigosas — viram um vazamento contínuo que corrói a margem aos poucos, sem alerta.',

  // ─── Bloco 5 — Objetivos ───────────────────────────────────────────────
  'objetivos.meta':        'Ter um objetivo claro para os próximos meses permite que cada decisão seja avaliada com base em se ela aproxima ou afasta desse alvo.',
  'objetivos.automatizar': 'Automação libera tempo humano para atividades que realmente geram valor. Cada tarefa repetitiva que sai das mãos da equipe é ganho de produtividade.',
  'objetivos.delegar':     'Saber o que delegar revela onde o empresário está sobrecarregado. Resolver isso é muitas vezes o passo que desbloqueia o crescimento.',
}

export function obterReacao(etapaId: string): string {
  return reacoes[etapaId] ?? 'Entendi. Vou guardar essa informação.'
}

// Reações de bloco — exibidas ao completar cada bloco
export const REACOES_BLOCO: Record<string, string> = {
  'empresa':     'Já entendi o básico da sua empresa. Vamos falar sobre como ela funciona no dia a dia?',
  'operacao':    'Agora tenho uma noção melhor da sua operação. Vamos falar sobre gestão?',
  'gestao':      'Já estou começando a entender seu perfil de gestão. Mais algumas perguntas.',
  'problemas':   'Obrigado por compartilhar. Suas respostas estão me dando um retrato valioso.',
  'objetivos':   'Com isso, já consigo montar um retrato inicial da sua empresa.',
}
