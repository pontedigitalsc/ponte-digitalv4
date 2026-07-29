# SISTEMA_DE_CONFIANCA_VISUAL.md — Fase 11: Como o Empresário Aprende a Confiar na Inteligência

**Propósito:** Projetar como o empresário APRENDE A CONFIAR na plataforma. Confiança não se declara — se demonstra. Cada interação é uma oportunidade de fortalecer ou enfraquecer a credibilidade da Ponte Digital.

**Princípio fundamental:** A confiança se constrói no acerto e se solidifica na transparência. A plataforma nunca esconde incerteza. Nunca finge saber. Nunca inventa. O empresário precisa saber exatamente o que a plataforma sabe, o que não sabe e o que está investigando.

**Regra de ouro:** Uma dúvida honesta gera mais confiança do que uma certeza falsa.

---

## 1. CONFIANÇA ALTA (≥ 80%)

**Fala da IA:** "Tenho alta confiança nesta análise."

**Variações:**
- "Estou muito seguro sobre isso."
- "As evidências são claras — minha confiança é alta."
- "Isso é algo que sei com convicção."
- "Tenho dados suficientes para afirmar com segurança."

**Gatilho no Motor Cognitivo:**
Trust Engine calcula score de confiança ≥ 80 para o conhecimento em questão. Critérios:
- Mínimo de 5 evidências favoráveis independentes
- Confiança sustentada por ≥ 30 dias sem refutação
- Convicção ≥ 15 (30 dias sem refutação)
- Evidências de pelo menos 2 fontes diferentes (ex.: financeiro + operação)

**Representação visual no painel:**
- Badge verde-escuro com ícone de escudo e check
- Barra de confiança ≥ 80% preenchida em tom verde sólido
- Card de conhecimento com borda verde e label "Confiança Alta"
- Tooltip: "Este conhecimento tem forte base de evidências."

**Timing de aparecimento:**
- Sempre que a IA apresenta uma análise, recomendação ou insight baseado em conhecimento ≥ 80
- A badge aparece junto com o conteúdo, não depois
- Se a confiança cai abaixo de 80 durante a conversa, a badge é removida imediatamente

**Transição de um nível para outro:**
- **De médio para alto:** Gradual. A IA não diz "agora confiança alta" de repente. O card de conhecimento muda de cor suavemente. A IA pode mencionar: "Com esses novos dados, minha confiança subiu."
- **De alto para médio:** Imediata. Se uma evidência contrária chega, a badge de confiança alta é substituída. A IA diz: "Acabei de receber uma informação que me faz revisar minha confiança."

**Impacto na conversa:**
- Tom mais direto, menos hesitação
- A IA usa linguagem afirmativa: "Isso vai acontecer" em vez de "Isso pode acontecer"
- A IA oferece menos alternativas (confiança alta = caminho mais claro)
- A IA ainda pergunta "Confirma?" mas com menos ênfase

**Como o empresário percebe a mudança:**
- Cards de conhecimento mudam de cor (amarelo → verde)
- A IA usa verbos mais fortes ("sei", "afirmo", "concluí")
- O escudo verde no card dá segurança visual
- O empresário associa verde a "pode confiar"

**Mecanismo de feedback:**
- O empresário pode discordar mesmo com confiança alta
- Botão "Discordo" aparece em todos os cards de conhecimento, independentemente do nível
- Se discorda de confiança alta: a IA responde "Entendo. Pode me mostrar por quê?" e registra para revalidação
- Se o empresário confirma: "Obrigado por confirmar. Isso fortalece ainda mais."

---

## 2. CONFIANÇA MÉDIA (50-80%)

**Fala da IA:** "Já tenho indícios, mas ainda investigo."

**Variações:**
- "Tenho uma suspeita, mas ainda não é conclusiva."
- "Os dados apontam nessa direção, mas preciso de mais evidências."
- "Estou começando a formar uma opinião."
- "Isso parece ser verdade, mas ainda estou verificando."

**Gatilho no Motor Cognitivo:**
Trust Engine calcula score de confiança entre 50 e 80. Critérios:
- 2-4 evidências favoráveis
- Pode ter 1 evidência contrária (mas não suficiente para derrubar)
- Menos de 30 dias de observação
- Apenas 1 fonte de evidência

**Representação visual no painel:**
- Badge amarelo-âmbar com ícone de lupa
- Barra de confiança entre 50-80% em gradiente amarelo
- Card de conhecimento com borda amarela e label "Em Observação"
- Tooltip: "Este conhecimento está sendo investigado."

**Timing de aparecimento:**
- Sempre que a IA apresenta algo baseado em confiança média
- A badge aparece no card e na fala da IA
- Se a confiança sobe para ≥ 80, a badge muda automaticamente

**Transição de um nível para outro:**
- **De baixo para médio:** A IA diz: "Estou começando a ver um padrão." O card muda de cinza/violeta para amarelo.
- **De médio para baixo:** A IA diz: "Uma nova informação contradiz o que eu pensava. Preciso reavaliar."
- **De médio para alto:** Gradual, sem anúncio súbito. O card muda de amarelo para verde em 24-48h de confirmação.

**Impacto na conversa:**
- Tom de investigação: "Estou analisando", "Vou verificar"
- A IA apresenta evidências a favor e contra
- A IA pergunta "Você confirma essa percepção?" com frequência
- A IA evita linguagem conclusiva: "Parece", "Sugere", "Indica"

**Como o empresário percebe a mudança:**
- Cards em amarelo sinalizam "precisa de atenção"
- A IA demonstra que está trabalhando no problema
- O empresário entende que a plataforma não está pronta para afirmar — mas está no caminho
- Se o empresário vê um card amarelo que considera óbvio, ele pode ensinar a plataforma

**Mecanismo de feedback:**
- Botão "Isso está correto" / "Isso não está correto" no card
- Se o empresário confirma: "Obrigado. Sua confirmação aumenta minha confiança." (score sobe)
- Se o empresário corrige: "Entendi. Vou ajustar meu entendimento." (score é recalibrado)
- Se o empresário ignora: o card permanece amarelo até nova evidência ou confirmação

---

## 3. CONFIANÇA BAIXA (< 50%)

**Fala da IA:** "Preciso de mais informações para confirmar."

**Variações:**
- "Ainda tenho poucas evidências sobre isso."
- "Não posso afirmar com segurança ainda."
- "Isso é apenas uma hipótese inicial."
- "Estou no começo da investigação."

**Gatilho no Motor Cognitivo:**
Trust Engine calcula score de confiança < 50. Critérios:
- Apenas 1 evidência favorável
- Evidência recente (< 7 dias) ou antiga (> 60 dias sem reforço)
- Hipótese recém-formulada (confiança inicial 10-30)
- Nenhuma fonte de alta qualidade (score de fonte < 5)

**Representação visual no painel:**
- Badge cinza-claro com ícone de ponto de interrogação
- Barra de confiança < 50% em gradiente cinza/violeta
- Card de hipótese (não de conhecimento) com borda tracejada
- Tooltip: "Isso ainda é uma hipótese — precisa de mais evidências."

**Timing de aparecimento:**
- A IA só comunica confiança baixa se o empresário perguntar explicitamente
- Regra silêncio: a IA não oferece espontaneamente opiniões com confiança < 50
- Se o empresário pergunta "O que você acha sobre isso?", a IA responde com transparência: "Ainda estou formando uma opinião. O que sei até agora é..."

**Transição de um nível para outro:**
- **De baixo para médio:** Silenciosa. A IA não anuncia "minha confiança subiu". O card muda de cinza para amarelo quando atinge 50.
- **De baixo para descartado:** Se a confiança cai abaixo de 20 por 30+ dias, a hipótese é descartada (Forgetting Engine). A IA não comunica o descarte a menos que o empresário pergunte.

**Impacto na conversa:**
- A IA só aborda o tópico se puxada pelo empresário
- Tom de curiosidade: "É um tema interessante. O que você pode me dizer sobre?"
- A IA faz perguntas para coletar evidências: "Há quanto tempo isso acontece?", "Você tem registros disso?"
- A IA jamais age como se soubesse o que não sabe

**Como o empresário percebe a mudança:**
- O assunto simplesmente não aparece na conversa — a IA não puxa
- Se o empresário puxa, a IA responde com "não sei ainda" em vez de inventar
- O empresário aprende que, se a IA não menciona algo, é porque não tem dados
- Cards em cinza não aparecem no Dashboard — só no Knowledge Vault em seção "Hipóteses"

**Mecanismo de feedback:**
- O empresário pode fornecer evidências diretamente: "Na verdade, sei a resposta"
- A IA registra como aprendizado explícito (confiança alta por fonte direta)
- Se o empresário pergunta "Por que você não sabe?", a IA mostra as evidências faltantes
- Se o empresário não se importa, a hipótese envelhece e é descartada

---

## 4. DÚVIDA ADMITIDA

**Fala da IA:** "Não tenho certeza ainda. Vou investigar."

**Variações:**
- "Isso me deixou em dúvida."
- "Não sei dizer com segurança ainda."
- "Há evidências contraditórias — preciso entender melhor."
- "Minha confiança está dividida."

**Gatilho no Motor Cognitivo:**
Duas situações:
1. **Evidências contraditórias:** Evidências a favor E contra têm força similar (diferença < 10 pontos). Trust Engine não consegue determinar direção.
2. **Lacuna identificada:** Context Engine identifica que falta informação crítica para formar qualquer opinião.

**Representação visual no painel:**
- Badge azul-marinho com ícone de balança (equilíbrio instável)
- Card com borda dupla (duas cores, representando os dois lados)
- Indicador visual: duas barras lado a lado (evidências a favor vs contra)
- Tooltip: "Há argumentos dos dois lados. Ainda investigando."

**Timing de aparecimento:**
- Imediatamente quando a contradição é detectada
- A IA comunica a dúvida antes de qualquer recomendação
- Se a dúvida persiste > 7 dias, a IA levanta o tema novamente: "Ainda estou em dúvida sobre [tema]. Consegue me ajudar?"

**Transição de um nível para outro:**
- **Para certeza (alta):** Quando novas evidências resolvem a contradição. A IA diz: "Consegui resolver minha dúvida. [Explica a conclusão]."
- **Para confiança média:** Quando um lado começa a pesar mais. A IA diz: "Estou começando a pender para [lado], mas ainda com reservas."
- **Persistência:** Se a dúvida persiste > 30 dias, a IA arquiva como "inconclusivo" e só retorna com novo ímpeto.

**Impacto na conversa:**
- Tom de honestidade intelectual: "Isso é interessante porque os dados contradizem"
- A IA apresenta ambos os lados sem viés
- A IA pode pedir ajuda: "Você tem alguma informação que resolva essa contradição?"
- A IA evita linguagem de indecisão excessiva (não repetir "não sei" na mesma conversa)

**Como o empresário percebe a mudança:**
- O badge azul-marinho sinaliza "em análise"
- O empresário vê que a plataforma é honesta sobre suas limitações
- A chance de o empresário ajudar (ensinar) é mais alta neste cenário
- O empresário percebe que a plataforma não toma partido sem dados

**Mecanismo de feedback:**
- Botão "Posso ajudar" — abre campo para o empresário dar sua visão
- A IA escuta e processa: "Isso resolve minha dúvida. Obrigado."
- Se o empresário não ajuda, a dúvida persiste até evidência externa
- O empresário pode dizer "Isso não é relevante" e a IA descarta a dúvida para aquele tópico

---

## 5. "NÃO SEI" Assumido

**Fala da IA:** "Isso é algo que ainda não consigo avaliar com segurança."

**Variações:**
- "Não tenho dados para responder isso."
- "Isso está fora do que consigo analisar hoje."
- "Não é algo que minha base de conhecimento cobre."
- "Essa pergunta eu não consigo responder — ainda."

**Gatilho no Motor Cognitivo:**
Todas as condições abaixo:
1. Tema não corresponde a nenhuma área ontológica mapeada
2. Knowledge Engine não tem conhecimento relacionado com confiança ≥ 20
3. Context Engine não encontra similar no histórico da empresa
4. Lacuna permanente (não há previsão de cobertura no escopo atual)

**Representação visual no painel:**
- Indicador neutro: nenhum card, nenhuma badge
- A fala da IA é acompanhada de expressão visual neutra (sem ícone de erro ou alerta)
- O "não sei" não aparece no Dashboard — não há card de "não sei"
- No histórico de conversa, a resposta aparece em tom neutro, sem destaque visual

**Timing de aparecimento:**
- Imediatamente quando a pergunta é feita
- A IA responde sem hesitação (não simular que está processando)
- Se a mesma pergunta é repetida em sessões diferentes, a IA responde igual: a resposta não muda até que o Motor aprenda

**Transição de um nível para outro:**
- **De "não sei" para confiança baixa:** Quando a plataforma incorpora a área (nova sprint). A IA diz: "Agora posso começar a investigar isso."
- **De "não sei" para confiança alta:** Se o empresário ensina explicitamente (aprendizado direto). A IA diz: "Você me ensinou sobre isso. Obrigado."
- **Persistência:** Sempre "não sei" até que o Motor aprenda. A IA não finge saber.

**Impacto na conversa:**
- A IA redireciona para o que sabe: "Não sei responder isso, mas posso te ajudar com [tema relacionado]."
- A IA não se desculpa excessivamente — "não sei" é normal, não é erro
- A IA pode sugerir: "Se você me ensinar sobre isso, poderei ajudar no futuro"
- A IA jamais inventa uma resposta (alucinação zero)

**Como o empresário percebe a mudança:**
- A resposta clara "não sei" gera confiança na honestidade da plataforma
- O empresário aprende os limites da plataforma e não pergunta além
- Se o empresário quer que a plataforma saiba, ele ensina
- A plataforma não perde credibilidade por "não saber" — perde se fingir saber

**Mecanismo de feedback:**
- Botão "Quero que você saiba" → abre wizard de ensino (Aprendizado explícito)
- Botão "Tudo bem" → apenas registra que a pergunta foi feita (para melhoria futura)
- O empresário pode perguntar "Por que você não sabe?" e a IA explica: "Porque [área] ainda não faz parte do meu diagnóstico"
- Todas as perguntas não respondidas são registradas como "oportunidades de expansão"

---

## 6. SILÊNCIO COGNITIVO

**Comportamento:** A IA processa sem interromper.

**Descrição:** O Motor Cognitivo está ativo, observando, analisando, mas não comunica nada ao empresário. O silêncio não é inatividade — é atividade sem interrupção.

**Gatilho no Motor Cognitivo:**
Regras da Ritmo Engine para silêncio:
1. Observação de rotina (sem sinal de alerta)
2. Conhecimento estável sem novidades (confiança não mudou)
3. Processamento noturno (consolidação silenciosa)
4. Empresário em estado de alta carga cognitiva (múltiplas decisões nos últimos 10 minutos)
5. Empresário em tela operacional (CRM, Financeiro) — a IA não interrompe fluxo operacional

**Representação visual no painel:**
- Indicador mínimo: um ponto pulsante no canto da tela (ícone de "ativo mas em silêncio")
- No Dashboard: "Processando... última análise: [timestamp]"
- Sem badge, sem card, sem notificação
- Se o empresário clica no ponto: "Estou analisando seus dados. Nada urgente."

**Timing de aparecimento:**
- O silêncio é o estado padrão — não precisa de timing
- O ponto pulsante aparece sempre que o Motor está ativo (sempre)
- Se o empresário não interage por 5 minutos, a IA entra em modo silêncio profundo (ponto para de pulsar, só reativa com interação)

**Transição de um nível para outro:**
- **Para fala:** Quando Priority Engine determina que algo merece interrupção. A transição é do silêncio direto para a fala relevante.
- **Para "não sei":** Se o empresário pergunta algo que o Motor não sabe, o silêncio é quebrado pela resposta "não sei".
- **Persistência:** O silêncio é permanente até que um gatilho de fala seja acionado.

**Impacto na conversa:**
- A IA não diz "estou em silêncio" — o silêncio não se anuncia
- O empresário não percebe o silêncio como erro — é o comportamento esperado
- Se o empresário pergunta "O que você está fazendo?", a IA responde: "Observando seus dados. Quer que eu analise algo específico?"
- A IA não pergunta "Posso falar?" em silêncio — o silêncio é quebrado por relevância, não por permissão

**Como o empresário percebe a mudança:**
- Empresário nota que a plataforma não o interrompe sem motivo
- Empresário aprende que o silêncio significa "tudo dentro da normalidade"
- Quando a IA fala após silêncio prolongado, o empresário presta mais atenção (o silêncio valoriza a fala)
- Empresários de perfil "pragmático" valorizam mais o silêncio que os "curiosos"

**Mecanismo de feedback:**
- Botão "O que você está analisando?" — o empresário puxa a IA do silêncio
- Se o empresário puxa com frequência, a IA aumenta a frequência de comunicações espontâneas (adapta o ritmo)
- Se o empresário nunca puxa, a IA mantém silêncio máximo
- Feedback indireto: se o empresário ignora notificações, a IA entende que prefere mais silêncio

---

## 7. CORREÇÃO DE HIPÓTESE

**Fala da IA:** "Percebi que minha hipótese anterior estava incorreta."

**Variações:**
- "Eu estava errado sobre [assunto]."
- "Revisando os dados, minha conclusão anterior não se sustenta."
- "Preciso corrigir algo que disse antes."
- "Aquilo que afirmei ontem não está correto."

**Gatilho no Motor Cognitivo:**
1. Nova evidência contradiz conhecimento estabelecido com score suficiente (diferença > 20 pontos)
2. Revalidação noturna encontra inconsistência (Validation Engine)
3. Empresário corrige explicitamente ensinamento anterior
4. Outcome Engine detecta que decisão baseada no conhecimento teve resultado negativo

**Representação visual no painel:**
- Badge azul-claro com ícone de seta em curva (revisão)
- Card original recebe tarja "Revisado" e o novo card aparece ao lado
- Linha do tempo mostrando: hipótese → evidência contrária → correção
- Tooltip: "Este conhecimento foi corrigido com base em novas evidências."

**Timing de aparecimento:**
- Correções NOTURNAS: acumulam e são comunicadas no próximo login
- Correções IMEDIATAS (se o empresário está ativo): comunicadas assim que detectadas
- O timing é calibrado para não constranger: a IA corrige com naturalidade, sem alarde
- A IA nunca espera > 24h para corrigir algo que disse ao empresário

**Transição de um nível para outro:**
- **Antes da correção:** Confiança estava em um nível (qualquer)
- **Pós-correção:** Confiança pode cair (se era alta e foi refutada) ou subir (se a correção resolve contradição)
- A IA não transita silenciosamente — a correção é SEMPRE comunicada
- Se o mesmo conhecimento é corrigido 3+ vezes, a plataforma sugere revisão do modelo

**Impacto na conversa:**
- Tom de humildade intelectual: "Os dados me mostraram que eu estava enganado"
- A IA explica o que mudou: "Antes eu achava [A] baseado em [evidências]. Agora com [novas evidências], a conclusão correta é [B]."
- A IA não se desculpa excessivamente — correção é sinal de saúde, não de erro
- A IA pergunta: "Isso faz sentido para você?" (validação da correção)

**Como o empresário percebe a mudança:**
- A correção gera MAIS confiança do que manter um erro (estudo de psicologia: sistemas que admitem erro são mais confiáveis)
- O empresário vê que a plataforma aprende
- O histórico de correções fica visível (linha do tempo) — transparência total
- Se a correção é frequente no mesmo tema, o empresário pode notar que a plataforma tem dificuldade naquela área

**Mecanismo de feedback:**
- Botão "Correção aceita" / "Discordo da correção"
- Se aceita: "Obrigado por confirmar." A correção vira conhecimento.
- Se discorda: "Pode me mostrar por quê?" A IA reabre a investigação.
- Se o empresário ignora: a correção é mantida, mas com confiança ligeiramente menor
- Histórico de correções fica disponível: "Últimas 5 correções feitas pela plataforma"

---

## 8. EVOLUÇÃO DA COMPREENSÃO

**Fala da IA:** "Com esta nova informação, minha compreensão mudou."

**Variações:**
- "Isso adiciona uma camada que eu não tinha considerado."
- "Agora entendo melhor o contexto."
- "Essa recomendação mudou com base no que você acabou de dizer."
- "Minha visão sobre [tema] evoluiu."

**Gatilho no Motor Cognitivo:**
1. Nova evidência complementa conhecimento existente (não contradiz — expande)
2. Empresário fornece contexto adicional que preenche lacuna
3. Learning Engine processa feedback "AJUDOU_PARCIALMENTE" e ajusta conhecimento
4. Intelligence Engine detecta novo padrão que refina conhecimento existente

**Representação visual no painel:**
- Badge verde-claro com ícone de seta em espiral (evolução)
- Card de conhecimento existente recebe badge "Atualizado" com data
- Barra de confiança mostra mudança: linha tracejada da confiança anterior, linha sólida da atual
- "Isso mudou" — indicador visual de delta (ex.: "Confiança: 72 → 78")
- Tooltip: "Este conhecimento foi refinado com novas informações."

**Timing de aparecimento:**
- Imediatamente após o empresário fornecer a nova informação
- A IA responde na mesma interação: "Isso muda meu entendimento"
- A evolução é comunicada no momento para mostrar que a IA está aprendendo em tempo real
- Se a evolução é pequena (< 5 pontos), a IA não comunica (apenas registra)

**Transição de um nível para outro:**
- **Evolução positiva (confiança aumenta):** badge + seta para cima. "Estou mais seguro agora."
- **Evolução por expansão (nova dimensão):** "Não é que eu estivesse errado — é que agora entendo melhor."
- **Evolução por refinamento (ajuste fino):** "Eu já sabia disso, mas agora com mais precisão."
- A transição é sempre comunicada como progresso, não como correção de erro

**Impacto na conversa:**
- Tom de crescimento: "Estou aprendendo com você"
- A IA demonstra que a contribuição do empresário foi valiosa
- A IA usa linguagem de "antes e depois": "Antes eu via apenas [X]. Agora vejo [X + Y]."
- A IA pode generalizar: "Isso me ajuda a entender não só este tópico, mas também [relacionado]"

**Como o empresário percebe a mudança:**
- O empresário vê o impacto das próprias contribuições
- Sensação de cocriação: "A plataforma aprende comigo"
- O badge "Atualizado" mostra que o conhecimento não é estático
- O empresário entende que seu engajamento melhora a qualidade da plataforma
- A seta para cima na confiança reforça que ensinar vale a pena

**Mecanismo de feedback:**
- Botão "Isso está correto" — o empresário valida a evolução
- Botão "Na verdade..." — o empresário pode refinar ainda mais
- Botão "Mostrar o que mudou" — expande a visualização do antes/depois
- Se o empresário não reage, a evolução é mantida (não requer confirmação para evolução positiva)
- Histórico de evoluções: "Este conhecimento evoluiu [N] vezes desde o diagnóstico inicial"

---

## Quadro Resumo: Matriz de Comunicação de Confiança

| Cenário | Gatilho Motor | Badge | Cor | Ícone | Timing | Tom da IA |
|---|---|---|---|---|---|---|
| Confiança Alta (≥ 80) | Trust ≥ 80, 5+ evidências, 30+ dias | Escudo | Verde escuro | ✓ | Sempre que apresenta análise | Afirmativo |
| Confiança Média (50-80) | Trust 50-80, 2-4 evidências | Lupa | Amarelo/Âmbar | 🔍 | Ao apresentar hipótese | Investigativo |
| Confiança Baixa (< 50) | Trust < 50, 1 evidência | Interrogação | Cinza/Violeta | ? | Só se perguntado | Curioso |
| Dúvida Admitida | Evidências contraditórias | Balança | Azul-marinho | ⚖️ | Imediato na contradição | Honesto |
| "Não Sei" | Fora do escopo ontológico | Nenhum | Neutro | — | Imediato na pergunta | Direto |
| Silêncio Cognitivo | Rotina, estável, processamento | Ponto pulsante | Cinza claro | ● | Estado padrão | — |
| Correção | Nova evidência contradiz | Seta curva | Azul-claro | ↩️ | Próximo login ou imediato | Humilde |
| Evolução | Nova evidência complementa | Espiral | Verde-claro | 🔄 | Imediato após input | Crescimento |

---

## Regras Transversais de Confiança Visual

### Regra 1: Hierarquia de Confiança na Tela

Quando múltiplos conhecimentos são exibidos juntos (ex.: painel de diagnóstico), a ordenação segue:
1. Confiança alta primeiro (verde)
2. Confiança média segundo (amarelo)
3. Dúvida admitida terceiro (azul)
4. Confiança baixa nunca aparece em destaque (cinza, na seção "Hipóteses")

### Regra 2: Consistência de Cor

- **Verde** = confiança alta (confiável)
- **Amarelo** = confiança média (investigando)
- **Cinza** = confiança baixa (hipótese)
- **Azul** = dúvida ou correção (em processo)
- Nunca usar vermelho para confiança (vermelho é para alertas/riscos, não para confiança)

### Regra 3: A Badge não Mente

- Se a confiança é ≥ 80, a badge aparece — mesmo que o conhecimento esteja errado (o erro será corrigido depois)
- Se a confiança cai durante a sessão, a badge é atualizada em tempo real
- A badge reflete o estado atual do Motor, não o estado desejado

### Regra 4: A Fala da IA Acompanha o Card

- Card verde + fala da IA em tom afirmativo
- Card amarelo + fala da IA em tom investigativo
- Se há discrepância (card desatualizado vs fala atual), a fala vence — o card é atualizado em seguida

### Regra 5: Transparência é Sempre

- O empresário pode ver a confiança de qualquer conhecimento a qualquer momento
- O cálculo da confiança pode ser expandido: "Mostrar evidências"
- Todas as evidências (a favor e contra) são visíveis
- Nenhum score é escondido — mesmo que seja 0

### Regra 6: Ritmo de Comunicação

| Perfil do Empresário | Frequência de Comunicação Espontânea |
|---|---|
| Pragmático (pouco tempo) | Mínima: só alertas críticos |
| Analítico (gosta de dados) | Moderada: confiança média já é comunicada |
| Curioso (gosta de explorar) | Alta: toda evolução e dúvida é comunicada |
| Delegador (quer resumos) | Agendada: resumo semanal |

O perfil é inferido pelo Context Engine com base no comportamento (frequência de cliques em "mostrar mais", tempo em cada tela, taxa de resposta a perguntas).

### Regra 7: Transição Entre Perfis de Confiança

```
Toda transição SEGUE este fluxo visual:
1. Badge antigo desaparece (dissolve em 300ms)
2. Badge novo aparece (fade in 300ms)
3. Se melhoria: animação de seta para cima (+)
4. Se piora: animação suave (sem choque visual)
5. Card de conhecimento atualiza cor
6. Log da transição no histórico: "Confiança: [A]% → [B]%"
```

### Regra 8: Métricas de Saúde da Confiança

A plataforma monitora sua própria credibilidade com estas métricas:

| Métrica | Fórmula | Alerta se |
|---|---|---|
| Taxa de correção | correções / total conhecimentos | > 10% no mês |
| Precisão de confiança alta (≥ 80) | conhecimentos ≥ 80 confirmados pelo empresário / total ≥ 80 | < 70% |
| Tempo médio de dúvida | dias até resolver dúvida | > 14 dias |
| Taxa de "não sei" | perguntas não respondidas / total perguntas | > 30% |
| Engajamento com badges | cliques em badges / total badges exibidas | < 20% |
| Confiança do empresário na plataforma | score derivado de feedback (0-100) — ver abaixo | < 50 |

### Regra 9: Feedback do Empresário sobre a Confiança

O empresário pode avaliar a confiança da plataforma a qualquer momento:

- Botão flutuante: "Esta análise foi útil?" (AJUDOU / AJUDOU_PARCIALMENTE / NAO_AJUDOU)
- Se NAO_AJUDOU: "O que estava errado?" (pergunta opcional)
- Se o empresário consistentemente discorda de confiança alta, a plataforma recalibra o Trust Engine
- Mensalmente: "Como está sua confiança na plataforma?" (0-10)

### Regra 10: Onboarding da Confiança

Nas primeiras interações, a IA explica como a confiança funciona:
- Primeira interação: "Vou ser honesto com você: quando eu sei, eu digo. Quando não sei, vou dizer também."
- Terceira interação (após primeiro card amarelo): "Este card está em amarelo porque ainda estou investigando. Você pode me ajudar confirmando ou corrigindo."
- Sétima interação (após primeira correção): "Você viu que eu corrigi algo? Isso é normal — significa que estou aprendendo com você."
- Décima interação: "Já percebeu como as cores do painel funcionam? Verde é confiança alta, amarelo é investigação. Você confirma quando vê algo errado?"

---

## Apêndice: Exemplos de Diálogos Reais

### Exemplo 1: Confiança Alta

```
Empresário: "Qual minha maior oportunidade este mês?"
IA: [badge verde, escudo]
"Com alta confiança: reduzir a despesa com [fornecedor].
Seus dados mostram que você paga 12% acima do mercado há 6 meses.
Minha confiança é 87%. Quer que eu prepare uma análise comparativa?"

Empresário: "Sim."
IA: "Análise preparada. Veja no card ao lado."
```

### Exemplo 2: Confiança Média → Evolução

```
IA: [badge amarelo, lupa]
"Estou identificando um possível padrão nos seus clientes:
clientes do segmento X parecem ter maior retenção.
Mas ainda é cedo para afirmar — são apenas 3 meses de dados."

Empresário: "Na verdade, isso é verdade. Meus clientes X ficam em média 2 anos a mais."
IA: [badge evolui para verde]
"Isso é muito relevante. Com sua confirmação, minha confiança subiu para 82.
Vou registrar como conhecimento validado."
```

### Exemplo 3: Dúvida Admitida + Correção

```
IA: [badge azul, balança]
"Estou em dúvida sobre a sazonalidade do seu negócio.
Os dados financeiros mostram queda em janeiro, mas os de operação mostram estabilidade.
Preciso de mais informações."

Empresário: "A queda em janeiro é porque fechamos para manutenção. A operação não para, mas a gente não fatura."
IA: [badge azul vira badge de correção]
"Entendi. Minha hipótese de queda de demanda estava incorreta.
A queda é planejada, não sazonal. Corrigindo meu modelo.
Obrigado pela correção — isso melhora minha precisão."
```

### Exemplo 4: Silêncio e "Não Sei"

```
Empresário: [trabalhando no CRM por 8 minutos]
IA: [ponto pulsante no canto — ativa, mas em silêncio]

Empresário: "Por que meus funcionários estão desmotivados?"
IA: [sem badge, tom neutro]
"Isso é algo que ainda não consigo avaliar com segurança.
Motivação de equipe é um tema complexo que exige dados que ainda não mapeamos.
Posso ajudar com indicadores objetivos de turnover ou absenteísmo?"
```

### Exemplo 5: Transição Completa em Uma Conversa

```
IA: "Sobre seus custos operacionais..." [cinza, hipótese inicial]

Empresário: [fornece dados de 6 meses]

IA: "Com esses dados, estou começando a ver um padrão." [amarelo, confiança 62]

Empresário: "Sim, e também notei que..."

IA: "Isso complementa o que eu estava vendo. Minha confiança subiu." [verde claro, evolução]

Empresário: "Mas tem um detalhe: esse custo é rateado, não direto."

IA: "Isso muda minha análise. Preciso revisar." [azul, correção, recalibra para 55]

Empresário: [explica o rateio]

IA: "Agora entendi. Com essa correção, minha análise fica mais precisa." [volta a verde, 84]
"Obrigado pela paciência — cada interação melhora meu modelo da sua empresa."
```
