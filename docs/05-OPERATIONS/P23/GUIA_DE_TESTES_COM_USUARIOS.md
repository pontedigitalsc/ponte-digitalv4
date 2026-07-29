# GUIA DE TESTES COM USUÁRIOS — Programa 23

**Versão 1.0 | 26/07/2026**

> Guia completo para testar a experiência da Ponte Digital com empresários reais. Não é um guia de QA nem de teste de usabilidade tradicional. É um protocolo de investigação da experiência cognitiva — como o empresário PERCEBE, SENTE e CONFIA na inteligência da Ponte.

---

## Índice

1. [Filosofia do Teste](#1-filosofia-do-teste)
2. [Preparação do Ambiente](#2-preparação-do-ambiente)
3. [Como Observar Empresários](#3-como-observar-empresários)
4. [O que Medir (Sem Código)](#4-o-que-medir-sem-código)
5. [Roteiro da Sessão](#5-roteiro-da-sessão)
6. [O que Perguntar (Pós-Teste)](#6-o-que-perguntar-pós-teste)
7. [O que NUNCA Perguntar](#7-o-que-nunca-perguntar)
8. [Como Descobrir Fricções Invisíveis](#8-como-descobrir-fricções-invisíveis)
9. [Como Medir Abandono](#9-como-medir-abandono)
10. [Como Medir Encantamento](#10-como-medir-encantamento)
11. [Como Medir Confiança](#11-como-medir-confiança)
12. [Perfis de Empresário e Abordagens](#12-perfis-de-empresário-e-abordagens)
13. [Análise de Resultados](#13-análise-de-resultados)
14. [Checklist Pós-Teste](#14-checklist-pós-teste)

---

## 1. Filosofia do Teste

### 1.1 O que estamos testando

Não estamos testando se o empresário "consegue usar" a Ponte. Não estamos testando se a interface é "intuitiva". Não estamos testando se ele "gostou".

Estamos testando:

- **Ele percebe inteligência?** A IA parece inteligente ou parece um script?
- **Ele confia?** Ele acreditaria no diagnóstico a ponto de tomar uma decisão?
- **Ele descobre algo?** Ele aprendeu algo sobre a própria empresa que não sabia?
- **Ele quer continuar?** A conversa gerou curiosidade para a próxima sessão?
- **Ele sente que vale o tempo?** O valor percebido supera o investimento de tempo?

### 1.2 O viés do empresário

Empresários têm um viés específico que precisa ser considerado:

- **Viés de cortesia:** Empresários bem-educados tendem a dizer que "gostaram" mesmo quando não gostaram. Não confiar em avaliações positivas genéricas.
- **Viés de tempo investido:** Quanto mais tempo o empresário passou na sessão, mais propenso ele está a justificar que "valeu a pena" (dissonância cognitiva). Perguntar cedo, antes que ele racionalize.
- **Viés de comparação:** Empresários comparam com o que conhecem (WhatsApp, ChatGPT, CRM). A pergunta "Isso é melhor que X?" não revela nada — eles não têm referencial para a categoria.
- **Viés de novidade:** O efeito novidade dura cerca de 3 sessões. Testes na primeira sessão superestimam o engajamento real.

### 1.3 A regra de ouro do moderador

> **O que o empresário FAZ vale mais do que o que ele DIZ.**
> O que ele DIZ no calor da interação vale mais do que o que ele diz depois.
> O que ele diz depois, sem você perguntar, vale mais do que o que ele responde às suas perguntas.

Observação comportamental > relato verbal. Relato espontâneo > relato solicitado. Relato solicitado aberto > relato solicitado fechado.

---

## 2. Preparação do Ambiente

### 2.1 Setup físico

| Elemento | Configuração | Notas |
|----------|-------------|-------|
| **Dispositivo** | Notebook do empresário (preferencial) OU dispositivo da Ponte com dados mockados realistas | Usar o dispositivo dele elimina viés de ambiente estranho |
| **Tela** | Resolução nativa, sem zoom forçado | Empresário deve estar confortável |
| **Câmera** | Gravação facial (permissão explícita) | Essencial para capturar expressões e microexpressões |
| **Áudio** | Gravação ambiente + captura de tela | Essencial para capturar o que ele fala durante a interação |
| **Mouse/Teclado** | Captura de movimentos (opcional, mas valioso) | Ferramenta de gravação de tela com overlay de clique |
| **Iluminação** | Natural, sem reflexo na tela | Má iluminação afeta a gravação facial |
| **Ruído** | Ambiente silencioso, sem interrupções | Qualquer ruído externo contamina a experiência |
| **Celular** | Empresário deve deixar em modo avião ou entregar ao moderador | Uma notificação quebra o fluxo cognitivo |

### 2.2 Setup digital

| Elemento | Configuração | Notas |
|----------|-------------|-------|
| **Conta de teste** | Criar conta específica para o teste, com dados pré-preenchidos (se houver) | Não usar conta pessoal do empresário para não contaminar dados reais |
| **Dados mockados (se necessário)** | Base realista com: 5-15 funcionários, 2-3 áreas de negócio, dados financeiros simulados, clientes simulados | Dados mockados precisam ser realistas ao ponto do empresário perguntar "Isso é real?" |
| **Gravação** | Ferramenta de gravação de tela + câmera + áudio (ex.: OBS Studio, Loom) | Iniciar gravação antes do empresário chegar |
| **Backup** | Dois métodos de gravação (ex.: OBS + gravador de celular) | Se falhar um, outro salva |
| **Ambiente de produção vs. staging** | Usar ambiente de produção se possível | Staging raramente tem os dados que geram insights reais |
| **Reset** | Capacidade de resetar o estado entre testes | Cada teste deve começar do mesmo ponto base |
| **Logs** | Ativar logging de interações (anonimizado) | Para correlacionar comportamento observado com dados de sistema |

### 2.3 Perfil dos participantes

**Critérios de inclusão (mínimos por rodada de teste):**

| Critério | Percentual mínimo |
|----------|-------------------|
| Empresário real (dono, sócio, CEO) | 100% (não testar com funcionários, estagiários ou não-decisores) |
| Empresa com 2+ anos de mercado | 70% |
| Empresa com 5+ funcionários | 60% |
| Empresa com receita > R$ 30k/mês | 50% |
| Primeiro contato com a Ponte | 80% (para teste de primeira impressão) |
| Usuário existente da Ponte | 20% (para teste de continuidade) |
| Perfil "pragmático" (tempo escasso) | 30% |
| Perfil "analítico" (gosta de dados) | 30% |
| Perfil "curioso" (gosta de explorar) | 30% |
| Perfil "delegador" (quer resumos) | 10% |

**Critério mais importante:** O empresário precisa ter **um problema real** para o qual a Ponte poderia ser a resposta. Se ele não tem o problema, ele não pode avaliar se a solução funciona.

**Recrutamento:**

- **Evitar:** Recrutar amigos, familiares, colegas de trabalho, investidores, advisors.
- **Evitar:** Pagar pelo teste (cria viés de obrigação).
- **Preferir:** Empresários que já demonstraram interesse no produto (waiting list, indicação).
- **Ideal:** Empresário que chegou sozinho (orgânico) e está avaliando a solução.

### 2.4 Número de participantes

| Fase do teste | Mínimo | Ideal |
|---------------|--------|-------|
| Teste exploratório (qualitativo) | 5 | 10 |
| Teste de validação (qualitativo + métricas) | 10 | 20 |
| Teste de baseline (quantitativo) | 20 | 50 |
| Teste de regressão (a cada release) | 3 | 5 |

---

## 3. Como Observar Empresários

### 3.1 O que olhar durante o teste

**Expressões faciais (microexpressões):**

| Expressão | O que indica | Duração típica |
|-----------|-------------|----------------|
| **Sobrancelhas levantadas** | Surpresa, interesse, "não esperava por isso" | 0.5-1s |
| **Testa franzida** | Confusão, dúvida, esforço cognitivo | 2s+ |
| **Sorriso genuíno (olhos apertam)** | Encantamento, satisfação genuína | 1-3s |
| **Sorriso social (só boca)** | Cortesia, não engajamento real | < 1s |
| **Lábios comprimidos** | Incerteza, hesitação, discordância silenciosa | 1-2s |
| **Olhos semi-cerrados** | Ceticismo, desconfiança | Variável |
| **Piscar excessivo** | Estresse, ansiedade, sobrecarga cognitiva | > 15/min |
| **Desvio de olhar para fora da tela** | Desinteresse, evasão, perda de atenção | > 2s |
| **Inclinar cabeça** | Curiosidade, interesse, processamento | Variável |
| **Mão no queixo** | Reflexão profunda, ponderação | Bom sinal |
| **Tocar o rosto** | Ansiedade, desconforto, hesitação | Observar contexto |
| **Bocejo** | Tédio, cansaço, sobrecarga | MUITO RUIM |

**Pausas e hesitações:**

- **Pausa antes de responder < 2s:** Resposta automática, confortável (bom)
- **Pausa antes de responder 2-5s:** Processamento, reflexão (natural)
- **Pausa antes de responder > 5s:** Hesitação, confusão, incerteza (ALERTA)
- **Pausa no meio da digitação:** Empresário repensou, corrigiu, desistiu de escrever algo
- **Pausa com mão parada sobre o teclado:** "Estou processando" vs. "Não sei o que escrever"
- **Pausa com olhar fixo em um ponto da tela:** Leitura ou confusão — difícil distinguir sem contexto

**Movimentos de mouse:**

- **Mouse parado:** Leitura, processamento (se acompanhado de olhar fixo) ou abandono (se acompanhado de desvio de olhar)
- **Mouse se movendo sem direção:** Procura por algo que não está vendo (confusão)
- **Mouse sobre elementos não interativos:** Empresário achou que era clicável (expectativa frustrada)
- **Cursor acelerado (movimentos rápidos e erráticos):** Impaciência, frustração
- **Clique em elemento errado e volta:** Expectativa quebrada
- **Scroll rápido:** "Passando por cima", não está lendo
- **Scroll e para:** Achou algo que chamou atenção
- **Scroll, sobe, scroll, desce:** Relendo, confuso, procurando algo

**Scrolls:**

- **Scroll vertical sem pausa:** Empresário não está processando — só "passando os olhos"
- **Scroll e pausa em determinado ponto:** Achou algo relevante
- **Scroll para cima (volta):** Relendo, confirmando, ou confuso
- **Scroll lateral (se houver):** Provavelmente confusão — layout mal resolvido
- **Quantidade de scrolls por minuto:** Quanto mais scrolls, menos o conteúdo está sendo absorvido
- **Scroll até o fim e não volta:** Abandono ou conclusão (diferenciar pelo contexto)

**Abandonos visíveis e invisíveis:**

- **Empresário fecha a aba:** Abandono explícito
- **Empresário abre outra aba e volta:** Atenção dividida (sinal de tédio ou multítarefa)
- **Empresário olha para o celular:** Atenção dividida (sinal de tédio)
- **Empresário se recosta na cadeira:** Relaxamento (bom) ou desengajamento (ruim)
- **Empresário se inclina para frente:** Interesse, engajamento
- **Empresário cruza os braços:** Defensivo, cético

### 3.2 Instruções para o moderador

**O moderador DEVE:**

1. **Falar o mínimo possível.** A função do moderador é observar, não entrevistar. Cada palavra do moderador contamina a experiência.
2. **Interromper apenas em 3 casos:** (a) o empresário está claramente frustrado há mais de 30s, (b) o sistema quebrou (erro técnico), (c) o empresário pediu ajuda.
3. **Antes de começar,** explicar: "Não estou testando você. Estou testando o sistema. Você não pode errar. Qualquer dificuldade é culpa do sistema, não sua."
4. **Usar o protocolo de silêncio:** Se o empresário pergunta "É para clicar aqui?", o moderador responde "O que você acha?" ou "Faça o que faria se eu não estivesse aqui."
5. **Anotar em tempo real** com códigos (ver seção 3.3) para não perder o fluxo.
6. **Gravar tudo.** Nunca confiar na memória.
7. **Cuidado com o viés de confirmação.** O moderador quer que o produto seja bom. Anotar também os momentos ruins — eles são mais valiosos que os bons.

**O moderador NUNCA DEVE:**

1. **Nunca explicar o que o sistema faz.** Se o empresário não entendeu, o sistema falhou. Explicar esconde a falha.
2. **Nunca defender o sistema.** "Na verdade, se você clicar ali..." vicia o teste.
3. **Nunca dar dicas.** "Tenta digitar algo..." — se ele não sabe o que digitar, é um problema real.
4. **Nunca perguntar "Está gostando?" durante o teste.** Cria viés de resposta positiva.
5. **Nunca validar ou invalidar a opinião do empresário.** "É, realmente isso é confuso..." vicia a percepção dele.
6. **Nunca completar frases do empresário.** Deixe ele terminar — o que ele diz e como diz é o dado.
7. **Nunca minimizar problemas.** "Isso é um detalhe pequeno" — o moderador não decide o que é pequeno.

### 3.3 Sistema de anotação rápida

Para anotações em tempo real sem perder o fluxo, usar códigos:

| Código | Significado |
|--------|-------------|
| **H** | Hesitação — pausa > 3s antes de agir |
| **R** | Releitura — empresário lê a mesma mensagem 2x |
| **C** | Correção — empresário corrige a IA |
| **D** | Desvio — empresário desvia o olhar/atenção |
| **S+** | Surpresa positiva — expressão de encantamento |
| **S-** | Surpresa negativa — expressão de frustração |
| **?** | Confusão — testa franzida, inclinação de cabeça |
| **!** | Insight — expressão de "entendi!" |
| **A** | Abandono — empresário para de interagir |
| **M** | Momento WOW — reação genuína de "uau" |
| **F** | Fricção — qualquer dificuldade perceptível |
| **X** | Erro técnico |
| **P** | Pergunta espontânea do empresário |
| **K** | Comentário espontâneo ("Isso é legal!", "Nossa...") |

Cada anotação deve incluir o timestamp (minuto:segundo) e o contexto breve.

**Exemplo de anotação:**
```
[02:15] H (5s) — empresário leu a pergunta, parou, coçou a cabeça
[02:22] ? — testa franzida, olhou para mensagem anterior (R - releu)
[02:30] C — digitou resposta, apagou, digitou de novo
[02:45] S+ — abriu sorriso genuíno ao ver o insight
[02:50] K — "Nossa, isso é verdade. Não tinha pensado nisso."
```

---

## 4. O que Medir (Sem Código)

### 4.1 Medições quantitativas manuais

| Métrica | Como medir | Como registrar |
|---------|-----------|----------------|
| **Tempo até a primeira ação** | Do momento em que a tela carrega até o primeiro clique/tecla do empresário | Cronômetro na gravação |
| **Tempo até o primeiro insight percebido** | Do início à expressão/reconhecimento de que "descobriu" algo | Anotar S+, !, ou comentário espontâneo |
| **Número de pausas > 3s** | Contar hesitações registradas como H com duração > 3s | Somar H com tempo |
| **Número de vezes que relê a pergunta** | Empresário volta o olhar para mensagem anterior | Contar R |
| **Número de correções necessárias** | Empresário corrige resposta, apaga, reformula | Contar C |
| **Número de expressões de surpresa positiva** | Sorriso genuíno, sobrancelhas levantadas, exclamações | Contar S+ |
| **Número de expressões de confusão/frustração** | Testa franzida, lábios comprimidos, sighs | Contar S-, ?, H |
| **Taxa de conclusão da conversa** | Chegou ao resumo final? (Sim/Não) | Registrar ao final |
| **Número de perguntas espontâneas do empresário** | Empresário pergunta algo que a IA não solicitou | Contar P |
| **Número de comentários espontâneos** | "Isso é interessante", "Nossa", "Olha só" | Contar K |
| **Abandono explícito vs. silencioso** | Fechou a aba vs. parou de responder e ficou olhando | Classificar ao final |
| **Tempo total de conversa** | Do início ao fim da sessão | Cronômetro na gravação |
| **Scrolls por minuto** | Contar movimentos de scroll / tempo total | Calcular após gravação |
| **Desvios de olhar da tela** | Empresário olha para celular, janela, parede | Contar D |
| **Cliques em elementos não clicáveis** | Empresário clica onde não funciona como esperado | Contar durante gravação |

### 4.2 Indicadores qualitativos (observação)

**Indicadores de baixa clareza:**
- Empresário relê a mesma mensagem 2+ vezes
- Empresário pergunta "O que isso quer dizer?"
- Empresário clica em elemento errado e volta
- Empresário demora > 5s para responder pergunta simples
- Empresário diz "Não entendi" ou equivalente

**Indicadores de baixa confiança:**
- Empresário questiona a resposta: "Isso é verdade?"
- Empresário pede fonte: "De onde veio esse dado?"
- Empresário minimiza: "Isso é óbvio" (defensivo)
- Empresário ignora insight e muda de assunto
- Empresário não quer compartilhar dado solicitado

**Indicadores de encantamento genuíno:**
- Sorriso genuíno (olhos apertam) — não confundir com sorriso social
- Comentário espontâneo: "Olha que legal!"
- Empresário chama outra pessoa: "Vem ver isso!"
- Empresário faz anotação voluntária
- Empresário diz "Não esperava por isso"
- Empresário compartilha com terceiros (tira print, manda WhatsApp)

**Indicadores de abandono iminente:**
- Empresário para de responder por > 10s sem sinal de leitura
- Empresário suspira profundamente
- Empresário olha para o relógio
- Empresário diz "Tá, entendi" em tom de encerramento
- Empresário começa a responder com monossílabos depois de respostas longas

---

## 5. Roteiro da Sessão

### 5.1 Estrutura da sessão (60 min)

| Fase | Duração | Atividade |
|------|----------|-----------|
| **Abertura** | 5 min | Explicação, consentimento, setup técnico |
| **Pré-teste** | 5 min | Perguntas de contexto (sem mencionar a Ponte) |
| **Teste — Interação livre** | 20 min | Empresário usa a Ponte sem interferência |
| **Teste — Tarefas específicas** | 10 min | 2-3 tarefas guiadas (se aplicável) |
| **Pós-teste — Entrevista** | 15 min | Perguntas abertas sobre a experiência |
| **Encerramento** | 5 min | Agradecimento, próximos passos |

### 5.2 Fase de abertura (5 min)

**O moderador diz:**
"Obrigado por participar. Quero deixar claro: não estou testando você. Estou testando um sistema. Se algo for difícil, confuso, ou não funcionar, a culpa é do sistema, não sua. Você não pode errar. Por favor, pense em voz alta enquanto usa — diga o que está pensando, mesmo que seja crítico. Não se preocupe em me agradar. A honestidade é o que mais ajuda."

**Checar:**
- [ ] Gravação iniciada
- [ ] Microfone funcionando
- [ ] Câmera capturando rosto
- [ ] Captura de tela ativa
- [ ] Empresário confortável
- [ ] Celular em modo avião
- [ ] Consentimento registrado

### 5.3 Fase de pré-teste (5 min)

**Perguntas para contexto do empresário (antes de ver a Ponte):**

1. "Quantas ferramentas você usa hoje para gerenciar sua empresa?"
2. "O que você mais sente falta em termos de informação sobre seu negócio?"
3. "Quando você precisa tomar uma decisão importante, onde busca informação?"
4. "Você já usou alguma ferramenta com IA? Qual foi a experiência?"
5. "O que uma ferramenta precisaria fazer para você confiar nela?"
6. "Se você pudesse ter alguém que analisasse seus dados 24h por dia, o que você pediria?"

**Não mencionar a IA, a conversa, o chat, a inteligência, nem qualquer funcionalidade específica da Ponte. O pré-teste é sobre a dor, não sobre a solução.**

### 5.4 Fase de interação livre (20 min)

**Instrução:** "Vou pedir para você abrir esta ferramenta. Ela é uma inteligência que analisa empresas. Explore livremente. Fale em voz alta o que está pensando. Lembre-se: você não pode errar. Estou aqui só observando."

**O moderador:**
- Não fala nada pelos primeiros 20 minutos (exceto se o sistema quebrar ou o empresário pedir ajuda)
- Anota usando o sistema de códigos
- Registra timestamps de momentos críticos
- Se o empresário fica mudo por > 10s: "O que está passando pela sua cabeça agora?"
- NUNCA: "Tenta clicar aqui", "Na verdade é para fazer X", "Você pode perguntar Y"

**O empresário:**
- Pode fazer o que quiser
- Pode sair quando quiser
- Pode perguntar o que quiser (mas o moderador não responde)

### 5.5 Fase de tarefas específicas (10 min)

Após a interação livre, se o empresário não explorou pontos específicos que precisam ser testados:

**Tarefa 1 (testar confiança):** "A IA apresentou alguns insights. Pode me mostrar qual deles você considera mais confiável? E qual você considera menos confiável? Por quê?"

**Tarefa 2 (testar aprofundamento):** "A IA sugeriu aprofundar em algum tópico. O que você acha disso? Valeria a pena?"

**Tarefa 3 (testar continuidade):** "Se você fosse sair agora e voltar amanhã, o que você esperaria encontrar?"

---

## 6. O que Perguntar (Pós-Teste)

### 6.1 Perguntas abertas obrigatórias

As perguntas abaixo devem ser feitas a TODOS os participantes, na ordem e da forma exata descrita, para permitir comparação entre testes.

**Rodada 1 — Expectativa vs. Realidade:**

1. "O que você achou que ia acontecer quando viu a tela pela primeira vez?"
2. "O que realmente aconteceu foi o que você esperava?"
3. "Teve algum momento que você sentiu que a ferramenta te surpreendeu?"

**Rodada 2 — Fricção:**

4. "Teve algum momento em que você se sentiu perdido?"
5. "Teve algum momento em que você não soube o que fazer?"
6. "Teve algum momento em que você quis fazer algo mas não conseguiu?"

**Rodada 3 — Valor:**

7. "O que você aprendeu sobre sua empresa?"
8. "O que você descobriu que não sabia antes?"
9. "Isso mudou sua percepção sobre algum aspecto do seu negócio?"

**Rodada 4 — Confiança:**

10. "Você confia no que a IA descobriu?"
11. "Em qual insight você confia mais? E menos? Por quê?"
12. "Teve algo que a IA disse que você achou que não era verdade?"

**Rodada 5 — Julgamento:**

13. "O que você faria diferente se fosse a IA?"
14. "O que você mudaria na forma como ela conversa?"
15. "O que você tiraria? O que você adicionaria?"

**Rodada 6 — Retenção:**

16. "Você voltaria amanhã? Por quê?"
17. "Se você voltasse, o que você esperaria encontrar?"
18. "O que precisa acontecer para você usar isso toda semana?"

**Rodada 7 — Categórica final (APENAS após todas as perguntas abertas):**

19. "Numa escala de 0 a 10, o quanto você confia que essa inteligência pode te ajudar a tomar melhores decisões no seu negócio?"
20. "Por que essa nota e não [nota + 1]? O que falta para chegar lá?"
21. "E por que essa nota e não [nota - 1]? O que já está bom?"

### 6.2 Perguntas complementares (contexto-dependentes)

Use estas perguntas apenas se o comportamento do empresário durante o teste sugerir que elas são relevantes:

- "Você hesitou antes de responder à pergunta sobre [X]. O que passou pela sua cabeça?"
- "Notei que você leu a mensagem duas vezes. O que não ficou claro?"
- "Você corrigiu sua resposta sobre [Y]. Por que mudou?"
- "Você sorriu quando a IA disse [Z]. O que aconteceu ali?"
- "Você desviou o olhar quando a perguntou sobre [W]. O que aconteceu?"

### 6.3 Técnica de "eco" para aprofundar

Quando o empresário dá uma resposta superficial, repetir a última palavra ou frase em tom de pergunta:

- **Empresário:** "Foi uma experiência interessante."
- **Moderador:** "Interessante...?"
- **Empresário:** "É que ela disse algo que eu não esperava. Sobre meus clientes mais antigos."
- **Moderador:** "Seus clientes mais antigos...?"
- **Empresário:** "Ela mostrou que eles estão comprando menos. Eu não tinha notado."

A técnica de eco força o empresário a aprofundar sem direcionar a resposta.

---

## 7. O que NUNCA Perguntar

### 7.1 Perguntas proibidas

| Pergunta | Por que é proibida |
|----------|-------------------|
| **"Você gostou?"** | Pergunta genérica. Empresário responde "sim" por cortesia. Não revela nada sobre a experiência real. |
| **"A interface é bonita?"** | Não mede experiência. Mede opinião estética. Empresários confundem "bonito" com "funciona bem". |
| **"Foi fácil de usar?"** | Viés de resposta positiva. Quem vai dizer "Não, foi difícil"? Empresário prefere parecer competente. |
| **"Recomendaria para um amigo?"** | NPS prematuro. Empresário ainda não teve tempo de formar opinião real. Resposta na hora não reflete comportamento futuro. |
| **"O que você mudaria?"** | Pergunta muito ampla. Empresário não sabe o que é possível mudar. Respostas são genéricas ou absurdas. |
| **"Você entendeu?"** | Constrangedora. Empresário diz "sim" mesmo sem entender para não parecer incapaz. |
| **"Isso é melhor que [concorrente]?"** | Empresário provavelmente não conhece o concorrente bem o suficiente para comparar. Resposta é chute. |
| **"Você pagaria por isso?"** | Pergunta hipotética. O que o empresário DIZ que pagaria vs. o que ele realmente paga são coisas muito diferentes. |
| **"Quanto você pagaria?"** | Ainda pior. Empresário chuta um valor baixo (para não se comprometer) ou alto (para parecer generoso). Nenhum dos dois é real. |
| **"O que você achou da IA?"** | Muito genérica. Empresário não sabe o que você quer ouvir. Resposta é aleatória ou socialmente desejável. |
| **"Foi melhor do que você esperava?"** | Cria comparação com expectativa que você não mediu. Resposta não tem base. |

### 7.2 Substituições permitidas

| Em vez de... | Pergunte... |
|-------------|-------------|
| "Você gostou?" | "O que você sentiu quando [momento específico]?" |
| "A interface é bonita?" | "O que você notou primeiro na tela?" |
| "Foi fácil de usar?" | "Teve algum momento que você não soube o que fazer?" |
| "Recomendaria?" | "Você voltaria amanhã? Por quê?" |
| "O que você mudaria?" | "Se você pudesse tirar uma coisa, o que seria?" |
| "Você entendeu?" | "O que você entendeu até agora?" |
| "É melhor que X?" | "Como isso se compara com o que você usa hoje?" |
| "Você pagaria?" | "Quanto tempo por semana você investiria nisso?" |
| "O que achou da IA?" | "A IA pareceu inteligente pra você? O que te fez pensar isso?" |

---

## 8. Como Descobrir Fricções Invisíveis

### 8.1 O que são fricções invisíveis

Fricções invisíveis são problemas que o empresário NÃO relata espontaneamente, NÃO identifica quando perguntado, mas que afetam a experiência. Elas estão abaixo do limiar de consciência — o empresário sente o desconforto, mas não consegue nomeá-lo.

**Exemplos:**
- A IA responde rápido demais para perguntas complexas → empresário sente que a resposta é superficial, mas não diz
- O layout tem muito espaço em branco → empresário sente que "falta conteúdo", mas não identifica por quê
- A IA sempre confirma antes de avançar → empresário sente que a conversa é "lenta", mas não percebe que é o excesso de confirmações
- As cores são muito frias → empresário sente que a plataforma é "distante", mas não associa à paleta

### 8.2 Técnica 1 — Análise de hesitação

**O que medir:** Toda pausa > 3s entre o recebimento de uma mensagem e a ação do empresário.

**Como classificar:**

| Tipo de hesitação | Possível causa |
|-------------------|----------------|
| Hesitação antes de responder | Empresário não entendeu a pergunta, está processando, ou não sabe a resposta |
| Hesitação antes de clicar | Empresário não sabe se aquele elemento é clicável ou o que vai acontecer |
| Hesitação após resposta da IA | Empresário está avaliando a resposta — pode ser bom (processamento) ou ruim (desconfiança) |
| Hesitação com scroll para cima | Empresário está relendo — sinal de que a informação não ficou clara |
| Hesitação com mão parada no teclado | Empresário começou a digitar e parou — pode ter desistido de responder ou estar reformulando |

**Como investigar (após o teste):**
"Notei que você demorou um pouco para responder quando a IA perguntou sobre [X]. O que estava passando pela sua cabeça?"

### 8.3 Técnica 2 — Análise de re-leitura

**O que medir:** Empresário lê a mesma mensagem da IA mais de uma vez (scroll para cima, olhar volta para mensagem anterior).

**Possíveis causas:**
- A mensagem é longa demais
- A mensagem é ambígua
- A mensagem contémmuita informação (sobrecarga cognitiva)
- A mensagem usa termo que o empresário não conhece
- A mensagem contradiz o que o empresário pensava (ele relê para confirmar)
- A mensagem é interessante — ele quer absorver (bom sinal, mas difícil de diferenciar)

**Como diferenciar:**

| Contexto | Provavelmente ruído | Provavelmente valor |
|----------|--------------------|---------------------|
| + expressão facial negativa (testa franzida) | ✓ | |
| + expressão facial positiva ( sorriso, sobrancelhas levantadas) | | ✓ |
| + comentário espontâneo negativo ("Hmm, não entendi") | ✓ | |
| + comentário espontâneo positivo ("Olha isso!") | | ✓ |
| + scroll para cima e para baixo (oscilação) | ✓ | |
| + scroll para cima, pausa, e continua (leitura única) | | ✓ |
| Empresário inclina a cabeça | | ✓ (processamento) |
| Empresário coça a cabeça | ✓ | |

### 8.4 Técnica 3 — Análise de correção

**O que medir:** Empresário corrige a resposta que deu ou corrige o entendimento da IA.

**Tipos de correção:**

| Tipo | Exemplo | Implicação |
|------|---------|------------|
| **Correção factual** | "Na verdade são 15 funcionários, não 12" | Empresário sabe mais que a IA — natural |
| **Correção de interpretação** | "Não é bem assim — o problema não é esse" | IA entendeu errado — ALERTA de falha de diagnóstico |
| **Correção de expectativa** | "Não, eu perguntei outra coisa" | IA não entendeu a pergunta — ALERTA grave |
| **Autocorreção** | "Deixa eu reformular..." | Empresário sente que a IA não entendeu o que ele quis dizer |
| **Correção silenciosa** | Apaga o que digitou e digita de novo | Empresário reformulou a resposta — pode ser fricção de expressão |

**Padrão crítico:** Se o empresário precisa corrigir a IA mais de 2 vezes na mesma conversa, a percepção de inteligência cai abaixo do limiar de confiança.

### 8.5 Técnica 4 — Análise de abandono

**O que medir:** Em que ponto e por quanto tempo o empresário para de interagir antes do fim natural da conversa.

**Classificação de pontos de abandono:**

| Ponto | Provável causa |
|-------|----------------|
| **Antes da primeira ação** (< 5s na tela) | Primeira impressão falhou — visual, tempo de carga, confusão |
| **Após a primeira pergunta da IA** | Pergunta pareceu invasiva, irrelevante ou difícil |
| **Após a primeira resposta da IA** | Resposta foi genérica, errada ou irrelevante |
| **No meio da conversa** (3-5 min) | Plateau de valor — empresário sente que já "entendeu" |
| **Próximo ao fim** (8-10 min) | Cansaço cognitivo ou tédio |
| **Na transição para o dashboard** | Descontinuidade de experiência — chat vs. dashboard sem conexão |

### 8.6 Técnica 5 — Diário de bordo do moderador

Após cada teste, o moderador escreve um parágrafo respondendo:

> "Se eu pudesse mudar uma coisa no sistema baseado no que observei neste teste, seria ___________ porque ___________."

Essa resposta forçada ajuda o moderador a destilar a fricção mais importante de cada sessão.

---

## 9. Como Medir Abandono

### 9.1 O que constitui abandono

Abandono não é apenas "fechar a aba". Abandono é **qualquer interrupção da jornada cognitiva antes da entrega de valor completo**.

**Definição operacional:**
- **Sessão completa:** Empresário chegou ao resumo final ou diagnóstico completo, OU expressou explicitamente que obteve o valor que buscava.
- **Abandono:** Empresário saiu antes de qualquer um dos dois marcos acima.

### 9.2 Tipos de abandono

**Abandono Parcial:**
Empresário completa parte da jornada, mas sai antes do insight principal. Ex.: responde 5 perguntas, mas sai antes do primeiro insight. Causa mais comum: fricção acumulada.

**Abandono Total:**
Empresário sai nos primeiros 30 segundos sem interagir significativamente. Causa mais comum: primeira impressão falhou.

**Abandono por Rejeição:**
Empresário interage, recebe valor, mas decide conscientemente que não é para ele. Ex.: "Isso não se aplica ao meu negócio." Não é necessariamente ruim — pode ser segmentação correta.

**Abandono por Distração:**
Empresário é interrompido (notificação, ligação, pessoa) e não retorna. Difícil de atribuir ao sistema — mas se é frequente, o sistema pode não estar engajando o suficiente para merecer retorno.

**Abandono Silencioso:**
Empresário para de responder mas continua na tela. Ele está lendo, pensando, ou simplesmente desistiu sem fechar a aba. O pior tipo porque é invisível em métricas tradicionais.

### 9.3 Como diferenciar abandono por fricção vs. abandono por contexto

| Indicador | Fricção | Contexto |
|-----------|---------|----------|
| Expressão facial negativa antes de sair | ✓ | |
| Empresário suspira, franze a testa, coça a cabeça | ✓ | |
| Empresário diz "Não to entendendo" | ✓ | |
| Empresário sai após uma resposta específica | ✓ (aquela resposta foi o gatilho) | |
| Empresário sai durante loading/espera | ✓ | |
| Empresário sai e parece tranquilo | | ✓ |
| Empresário sai após olhar o relógio | | ✓ |
| Empresário recebe ligação e sai | | ✓ |
| Empresário diz "Preciso ir, mas depois eu volto" | | ✓ |
| Abandono consistente no mesmo ponto em múltiplos testes | ✓ | |

### 9.4 Como registrar a causa do abandono

Usar a matriz abaixo para classificar cada abandono:

```
Causa Primária (escolher uma):
  [ ] PRIMEIRA_IMPRESSAO — visual, velocidade, identidade
  [ ] CLAREZA — empresário não entendeu o propósito
  [ ] FRICCAO — dificuldade de interagir
  [ ] VALOR — empresário não viu valor suficiente
  [ ] CONFIANCA — empresário não confiou
  [ ] CONTEXTO — externo ao sistema (ligação, horário, etc.)
  [ ] TECNICO — erro, travamento, bug

Causa Secundária (opcional):
  [ ] LENTIDAO — tempo de resposta
  [ ] EXCESSO — informação, perguntas, texto
  [ ] IRRELEVANCIA — as perguntas não fazem sentido para ele
  [ ] INVASAO — sentiu que o sistema está perguntando demais
  [ ] REPETICAO — sentiu que já respondeu aquilo
  [ ] PLATEAU — sentiu que já viu tudo que importava

Gravidade:
  [ ] BAIXA — voltou depois (abandono temporário)
  [ ] MEDIA — não voltou na sessão, mas pode voltar
  [ ] ALTA — não voltará (expressou explicitamente)
  [ ] CRITICA — falou mal para outros (recomendação negativa)
```

---

## 10. Como Medir Encantamento

### 10.1 O que é encantamento na Ponte

Encantamento não é "surpresa vazia". Não é um efeito visual bonito. Não é uma animação legal. Não é uma frase de efeito.

**Encantamento na Ponte é:**
> O momento em que o empresário recebe um insight que ele não esperava, que é verdadeiro, relevante, e que muda sua percepção sobre o próprio negócio.

**Características do encantamento genuíno:**
- É sobre o negócio, não sobre a ferramenta
- É sobre descoberta, não sobre entretenimento
- É sobre utilidade, não sobre estética
- É sobre"como isso sabe?", não sobre "como isso é bonito?"
- O empresário se sente mais inteligente, não impressionado com a tecnologia

### 10.2 Sinais de encantamento genuíno

**Reações imediatas (durante a interação):**

| Sinal | Descrição | Confiabilidade |
|-------|-----------|----------------|
| **Sorriso genuíno** | Olhos se apertam (músculo orbicular dos olhos contrai) | Alta |
| **Sobrancelhas levantadas + pausa** | "Não esperava por isso" — seguido de absorção | Muito alta |
| **"Nossa!" ou equivalente** | Exclamação espontânea | Muito alta |
| **"Como isso sabe?"** | A pergunta mais valiosa que o empresário pode fazer | Altíssima |
| **Inclinação para frente** | Engajamento, interesse | Média (pode ser só curiosidade) |
| **Empresário relê o insight** | Está absorvendo, processando | Alta (se acompanhado de expressão positiva) |
| **Chamar outra pessoa** | "Vem ver isso!" | Altíssima |
| **Anotar** | Empresário escreve o insight em algum lugar | Altíssima |
| **Tirar print** | Quer guardar ou compartilhar | Altíssima |
| **Pausa prolongada após insight** | Empresário está "digerindo" a descoberta | Alta |

**Reações tardias (pós-teste, espontâneas):**

| Sinal | Descrição |
|-------|-----------|
| **Empresário menciona o insight espontaneamente** | Sem você perguntar, ele volta ao assunto |
| **Empresário pergunta "Quando posso usar de novo?"** | Indica que quer continuar |
| **Empresário pergunta "Isso funciona com meus dados reais?"** | Está considerando adoção |
| **Empresário dá um exemplo de como usaria** | Está aplicando mentalmente |
| **Empresário pergunta se pode mostrar para o sócio** | Quer validação social |

### 10.3 Como registrar momentos de encantamento

**Ficha de registro de momento WOW:**

```
Timestamp: [mm:ss]
Tipo: [  ] Surpresa (não esperava)  [  ] Conexão (ligou pontos)
      [  ] Revelação (descobriu algo)  [  ] Antecipação (adivinhou)
      [  ] Utilidade (resolveu um problema)  [  ] Profundidade (mais que esperava)

Gatilho (o que a IA disse/fes): [descrição]
Reação do empresário: [descrição da reação observada]
Fala do empresário (transcrição): "[...]"
Impacto percebido: [alta/médio/baixo]

Encantamento genuíno? [  ] Sim  [  ] Parcial (surpresa, mas sem profundidade)
```

### 10.4 Escala de encantamento (0-5)

| Nível | Nome | Descrição | Frequência esperada |
|-------|------|-----------|---------------------|
| **5** | Transformador | Empresário muda de ideia sobre algo fundamental. "Isso muda tudo que eu pensava sobre meu negócio." | < 5% das sessões |
| **4** | Marcante | Empresário descobre algo que não sabia e considera muito relevante. Comentário espontâneo + anotação. | 10-15% das sessões |
| **3** | Positivo | Empresário recebe um insight válido e relevante. Sorriso genuíno, comentário "legal". | 20-30% das sessões |
| **2** | Leve | Empresário reconhece valor, mas sem emoção forte. "Interessante." | 30-40% das sessões |
| **1** | Neutro | Empresário recebe a informação mas não reage. | 20-30% das sessões |
| **0** | Negativo | Informação é irrelevante, errada ou óbvia. Expressão de decepção. | < 10% (se > 10%, algo grave) |

**Meta P23:** Média de encantamento ≥ 2.5 na primeira sessão. ≥ 3.0 nas sessões seguintes (com mais dados acumulados).

---

## 11. Como Medir Confiança

### 11.1 Divergência entre o que o empresário diz e o que ele faz

A confiança real não está no que o empresário RESPONDE na entrevista. Está no que ele FAZ durante a interação.

| Ele diz... | Mas faz... | Confiança real |
|------------|-----------|----------------|
| "Confio sim" | Ignora o insight e muda de assunto | BAIXA |
| "Achei legal" | Não compartilha dados quando solicitado | BAIXA |
| "É interessante" | Pergunta "De onde veio isso?" com frequência | MÉDIA |
| "Parece verdade" | Relê o insight 3x antes de continuar | MÉDIA |
| "Confio" | Usa o insight para tomar uma decisão na hora ("Preciso agir sobre isso") | ALTA |
| "Achei bom" | Pergunta "Quando posso conectar meus dados reais?" | ALTA |
| "É legal" | Chama o sócio para ver | MUITO ALTA |

### 11.2 Perguntas que revelam confiança

Empresários que confiam fazem certas perguntas. Empresários que não confiam fazem outras.

**Perguntas de confiança ALTA:**
- "Como eu conecto meus dados reais a isso?"
- "Você consegue analisar meus últimos 12 meses?"
- "Isso funciona no meu celular?"
- "Quanto custa?"
- "Quando posso começar a usar de verdade?"

**Perguntas de confiança MÉDIA:**
- "De onde veio esse dado?"
- "Como você chegou a essa conclusão?"
- "Isso vale para qualquer empresa ou é específico?"
- "Você tem exemplos reais de empresas como a minha?"

**Perguntas de confiança BAIXA:**
- "Isso é verdade?"
- "Você tem certeza?"
- "Isso é automático ou alguém escreveu?"
- "Posso ver a fonte?"
- "Isso parece genérico..."
- "Qual a precisão disso?"

**Perguntas de confiança ZERO:**
(O empresário não pergunta — simplesmente ignora ou sai)

### 11.3 Comportamentos que indicam confiança

| Comportamento | Indicador de confiança | Notas |
|---------------|------------------------|-------|
| Compartilha dado sensível (faturamento real, margem, problema) | ALTA | O maior sinal de confiança |
| Discord da IA e explica por quê | ALTA (confia o suficiente para debater) | Empresário que não confia simplesmente ignora |
| Aprofunda resposta voluntariamente | ALTA | Não está com pressa de sair |
| Faz perguntas sobre o futuro | ALTA | Está considerando relacionamento de longo prazo |
| Relê o insight + expressão de aprovação | MÉDIA-ALTA | Está processando |
| Pede mais exemplos | MÉDIA | Quer confirmar antes de confiar totalmente |
| Pede detalhes técnicos | MÉDIA-BAIXA | Pode ser analítico (natural) ou desconfiado |
| Ignora o insight | BAIXA | Não achou relevante ou não confia |
| Questiona a fonte de cada dado | BAIXA | Ceticismo ativo |
| Sai após o insight | ZERO-Ou desconfiou, ou o insight era óbvio/irrelevante | Diferenciar pela expressão |

### 11.4 Escala de confiança percebida

| Nível | Nome | Descrição | Comportamentos associados |
|-------|------|-----------|---------------------------|
| **5** | Confiança plena | Empresário age baseado no insight sem verificar | Compartilha dados sensíveis, toma decisão, recomenda |
| **4** | Confiança alta | Empresário considera o insight válido mas quer confirmar | Pergunta sobre integração, custo, aplicação prática |
| **3** | Confiança moderada | Empresário aceita o insight mas com reservas | Pergunta "De onde veio?", relê, pede exemplos |
| **2** | Confiança baixa | Empresário duvida mas ainda está aberto | Questiona fontes, pede detalhes técnicos |
| **1** | Confiança mínima | Empresário não descarta mas não age | Responde educadamente, não se aprofunda |
| **0** | Nenhuma confiança | Empresário rejeita explicitamente | Sai, ignora, diz "Isso não é para mim" |

**Meta P23:** Confiança ≥ 3 (moderada) na primeira sessão. ≥ 4 (alta) após 3 sessões.

### 11.5 Como avaliar confiança sem perguntar diretamente

**Técnica de cenário hipotético:**
"Imagine que amanhã você precisa decidir se demite ou não um funcionário. A IA te mostrou dados que sugerem que ele está com baixo desempenho. Você usaria essa informação para decidir?"

**Técnica de compromisso:**
"Se eu te pedisse para conectar o financeiro da sua empresa aqui agora, você conectaria?"

**Técnica de preço:**
(Esta é arriscada, mas reveladora) "Se essa ferramenta custasse R$ 200/mês, você pagaria?"

---

## 12. Perfis de Empresário e Abordagens

### 12.1 Perfil Pragmático

**Características:** Tempo escasso, respostas curtas, quer resultado rápido, impaciente com explicações longas.

**Como testar:**
- Dar menos tempo de teste (15 min em vez de 30)
- Não forçar aprofundamento
- Observar com atenção redobrada nos primeiros 60s — se não houver engajamento, o teste acabou
- Perguntas pós-teste mais diretas

**Sinais de alerta específicos:**
- Olha o relógio nos primeiros 5 min
- Respostas monossilábicas
- Scroll rápido sem pausa
- "Vai direto ao ponto" (se falar isso, o sistema já falhou)

### 12.2 Perfil Analítico

**Características:** Gosta de dados, questiona fontes, quer entender o "como" e o "porquê".

**Como testar:**
- Dar mais tempo (30-40 min)
- Esperar muitas perguntas sobre fontes e métodos
- Observar se as respostas da IA são suficientemente profundas
- Preparar para perguntas difíceis
- Valorizar quando ele discorda — é sinal de engajamento profundo

**Sinais de alerta específicos:**
- "Isso é superficial" (se falar, o insight foi raso demais)
- "Isso é coincidência" (não está convencido)
- "Qual a margem de erro?" (se a IA não tem resposta, perde credibilidade)

### 12.3 Perfil Curioso

**Características:** Gosta de explorar, faz perguntas inesperadas, se empolga com descobertas.

**Como testar:**
- Deixar explorar sem direção
- Observar quantos desvios produtivos ele faz (isso é bom)
- Ver se a IA consegue acompanhar a curiosidade sem se perder
- Atenção: curiosidade não é engajamento real — ele pode estar se divertindo, não se comprometendo

**Sinais de alerta específicos:**
- Pergunta algo fora do escopo e a IA não sabe lidar
- A curiosidade morre após 2-3 respostas genéricas
- "Já vi isso" (plateau de novidade)

### 12.4 Perfil Delegador

**Características:** Quer resumo, não quer detalhes, quer que a IA pense por ele.

**Como testar:**
- Observar se ele tenta pular etapas ("Me dá logo o diagnóstico")
- Ver se as respostas resumidas são suficientes ou se ele precisa aprofundar
- Atenção: se o resumo for bom, ele engaja. Se for ruim, ele abandona.

**Sinais de alerta específicos:**
- "Resume isso pra mim" (se a IA não consegue, perde o perfil)
- "Pula essa pergunta" (se a IA insiste, ele abandona)
- "Me diz o que fazer" (se a IA não dá recomendação clara, frustra)

---

## 13. Análise de Resultados

### 13.1 Estrutura do relatório de teste

Para cada rodada de testes, produzir:

**1. Sumário executivo (meia página)**
- Quantos empresários testaram
- Perfil dos participantes
- Principais descobertas (3-5 bullets)
- Nota de confiança média
- Taxa de conclusão
- Principais fricções encontradas
- Recomendação: "Seguir para implementação" / "Corrigir itens X, Y, Z antes de seguir" / "Necessário nova rodada de testes"

**2. Resultados quantitativos**
- Tabela com métricas por participante
- Média, mediana, mínimo, máximo de cada métrica
- Distribuição por perfil de empresário

**3. Descobertas qualitativas**
- Fricções mais comuns (ordenadas por frequência)
- Momentos de encantamento (detalhados)
- Padrões de comportamento observados
- Citações literais dos empresários (as mais reveladoras)

**4. Matriz de prioridade de correções**

| Item | Gravidade | Frequência | Prioridade |
|------|-----------|------------|------------|
| [Fricção X] | Alta | 8/10 testes | P0 — corrigir antes da próxima release |
| [Fricção Y] | Média | 3/10 testes | P1 — corrigir na próxima sprint |
| [Fricção Z] | Baixa | 1/10 testes | P2 — monitorar |

**5. Comparação com baseline**

| Métrica | Baseline (antes) | Agora | Variação |
|---------|-----------------|-------|----------|
| Taxa de conclusão | 30% | 65% | +35pp |
| Confiança média | 2.0 | 3.2 | +1.2 |
| Encantamento médio | 1.0 | 2.5 | +1.5 |

---

## 14. Checklist Pós-Teste

- [ ] Gravações salvas e nomeadas (participante_YYYY-MM-DD)
- [ ] Anotações digitalizadas
- [ ] Fichas de encantamento preenchidas
- [ ] Classificação de abandono registrada para cada participante (se aplicável)
- [ ] Escala de confiança registrada
- [ ] Citações literais transcritas
- [ ]
- [ ] Fricções classificadas por gravidade e frequência
- [ ] Relatório de teste produzido
- [ ] Recomendações priorizadas
- [ ] Lições aprendidas registradas em `docs/05-OPERATIONS/LESSONS_LEARNED.md`
- [ ] Itens críticos adicionados à `CHECKLIST_DE_EXPERIENCIA.md` (se aplicável)
- [ ] Dados anonimizados (remover identificadores pessoais)
- [ ] Participante agradecido e convidado para próximos testes

---

## Apêndice A: Template de Relatório de Teste

```
# Relatório de Teste — [Data]

## Participante
- ID: P-[Número]
- Perfil: [Pragmático | Analítico | Curioso | Delegador]
- Setor: [ex.: varejo, indústria, serviços]
- Porte: [ex.: 12 funcionários, R$ 50k/mês]
- Experiência prévia com IA: [Sim | Não | Pouca]
- Primeiro contato com a Ponte: [Sim | Não]

## Métricas da Sessão
- Tempo total: [minutos]
- Tempo até primeira ação: [segundos]
- Tempo até primeiro insight: [minutos]
- Número de pausas > 3s: [contagem]
- Número de releituras: [contagem]
- Número de correções: [contagem]
- Número de surpresas positivas: [contagem]
- Número de confusões: [contagem]
- Número de perguntas espontâneas: [contagem]
- Número de comentários espontâneos: [contagem]
- Taxa de conclusão: [Completa | Parcial | Abandono]
- Confiança percebida (0-5): [nota]
- Encantamento máximo (0-5): [nota]

## Fricções Encontradas
1. [Descrição] — [Gravidade] — [Timestamp]
2. [Descrição] — [Gravidade] — [Timestamp]

## Momentos de Encantamento
1. [Timestamp] — [O que aconteceu] — [Reação]

## Citações Literais Relevantes
- "[citação]"
- "[citação]"

## Observações do Moderador
[Parágrafo sobre o que mais chamou atenção]

## Nota de Confiança (0-10)
[Nota] — "[Justificativa do empresário]"
```

---

## Apêndice B: Formulário de Consentimento

```
Termo de Consentimento para Teste de Experiência

Eu, ______________________________________, autorizo a gravação de áudio, vídeo e captura de tela durante minha interação com a Ponte Digital para fins de pesquisa e melhoria do produto.

Entendo que:
- Minha participação é voluntária e posso interromper a qualquer momento
- Os dados coletados serão anonimizados
- As gravações não serão compartilhadas publicamente
- Não há respostas certas ou erradas — estou testando o sistema, não o contrário

Nome: ______________________________________
Empresa: ______________________________________
Data: ___/___/2026
Assinatura: ______________________________________
```

---

## Histórico de Versões

| Data | Versão | Alterações |
|------|--------|------------|
| 26/07/2026 | 1.0 | Criação inicial |

---

*Este guia é um protocolo de investigação, não um script rígido. Adapte ao contexto de cada teste, mas mantenha a integridade das perguntas obrigatórias e das técnicas de observação para permitir comparação entre rodadas.*
