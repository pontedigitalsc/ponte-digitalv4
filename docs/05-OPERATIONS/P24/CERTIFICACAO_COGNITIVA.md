# CERTIFICAÇÃO COGNITIVA — Alinhamento Motor Cognitivo ↔ Experiência

**Programa 24 | Documento de Certificação | Versão 1.0**

> Certificar que cada estado cognitivo do Motor possui exatamente UM comportamento visual,
> e cada comportamento visual possui origem em UM estado cognitivo.
> Nada existe sem origem. Nada é decorativo.

---

## Regra Fundamental

```
Estado Cognitivo (Motor)  →  Comportamento Visual (Experiência)
    1:1 obrigatório             1:1 obrigatório
    N:0 = LACUNA                0:1 = INCONSISTÊNCIA
```

---

## Mapeamento Estado-a-Estado

### E1 — Estado Inicial / Vazio

| Campo | Conteúdo |
|---|---|
| **Estado cognitivo** | VAZIO |
| **O que acontece internamente** | Nenhum dado de empresa carregado. Nenhuma identidade digital. Nenhum sinal processado. Context Engine retorna estado padrão (confianca: 0.1, motivo: "Ainda não conhecemos sua empresa"). |
| **Gatilho de entrada** | Primeiro acesso sem dados; empresa recém-criada sem interações |
| **Gatilho de saída** | Primeira resposta do empresário registrada; primeiro sinal processado |
| **Tempo de processamento esperado** | — (não há processamento) |
| **Comportamento visual associado** | Tela de login ou primeira saudação da IA. Painel cognitivo vazio (0%). Barra de confiança em zero. Mapa cognitivo sem áreas preenchidas. |
| **O que o empresário percebe** | "A IA ainda não me conhece." Expectativa de início. |
| **O que o painel cognitivo mostra** | Cobertura: 0%. Confiança: 0%. Insights: 0. Lacunas: "Aguardando primeira resposta." |
| **Variações por nível de confiança** | N/A — não há confiança. |
| **Documentos P23 que especificam** | EXPERIENCIA_COGNITIVA.md (Fase 0-1), MATRIZ_DA_PERCEPCAO.md (S01, S02), ARQUITETURA_VISUAL_DA_CONVERSA.md |

---

### E2 — Escutando / Recebendo Dados

| Campo | Conteúdo |
|---|---|
| **Estado cognitivo** | RECEBENDO |
| **O que acontece internamente** | Signal Engine processa sinais de entrada (clientes, tarefas, financeiro). Conversa em andamento. Identity Engine interpreta respostas. Evidence Engine registra evidências. Nenhuma hipótese formada ainda. Confiança < 20%. |
| **Gatilho de entrada** | Empresário envia uma resposta OU sistema recebe novo sinal de domínio |
| **Gatilho de saída** | Evidência suficiente para formar primeira hipótese (confiança >= 20%) |
| **Tempo de processamento esperado** | 300ms–5s (proporcional à complexidade da resposta) |
| **Comportamento visual associado** | Microfeedback imediato ("Entendi.", "Interessante.") + badge "Recebido" + indicador de pensamento com texto narrativo ("Estou analisando seu fluxo comercial..."). Painel cognitivo: badge cinza "Explorando". |
| **O que o empresário percebe** | "A IA está prestando atenção e registrando o que digo." Percepção de escuta ativa. |
| **O que o painel cognitivo mostra** | Badge "Explorando" (cinza). Barra de cobertura começa a preencher (2-15%). Confiança: < 20%. Itens de lacuna aparecem. |
| **Variações por nível de confiança** | Se confianca < 10%: apenas "Entendi." sem indicador narrativo. Se confianca 10-20%: "Entendi. Interessante." + indicador narrativo de área sendo analisada. |
| **Documentos P23 que especificam** | EXPERIENCIA_COGNITIVA.md (Fase 2-3), SISTEMA_DE_INSIGHTS.md (padrão "areaIdentified"), GUIA_DA_CONVERSA.md (R-MF01), LOADING_INTELIGENTE.md |

---

### E3 — Investigando / Correlacionando

| Campo | Conteúdo |
|---|---|
| **Estado cognitivo** | INVESTIGANDO |
| **O que acontece internamente** | Context Engine cruza evidências recebidas. Hypothesis Engine começa a formar padrões. Trust Engine atribui score inicial (20-50%). Knowledge Engine inicia mapeamento ontológico. Synthesis Engine agrupa evidências similares. |
| **Gatilho de entrada** | 2+ evidências em um mesmo domínio OU confiança atinge 20% em uma categoria |
| **Gatilho de saída** | Confiança em uma hipótese >= 50% OU 5+ interações sem nova evidência significativa |
| **Tempo de processamento esperado** | 2–7s (cruzamento de múltiplas fontes) |
| **Comportamento visual associado** | Badge amarelo "Investigando" + card de hipótese inicial aparece no painel cognitivo com borda amarela. Texto narrativo: "Estou começando a ver padrões..." ou "Vou investigar isso mais a fundo..." + indicador de pensamento com texto dinâmico. |
| **O que o empresário percebe** | "A IA está conectando pontos. Ela está começando a entender meu negócio." Primeira sugestão de que não é um formulário. |
| **O que o painel cognitivo mostra** | Card de hipótese com badge "Em Observação" (amarelo). Confiança: 20-50%. Cobertura: 15-40%. Áreas sendo mapeadas com ícones. Lacunas destacadas. |
| **Variações por nível de confiança** | Confiança 20-35%: badge "Hipótese Inicial" com ícone de interrogação. Confiança 35-50%: badge "Em Observação" com ícone de lupa. Card muda de borda tracejada para borda sólida. |
| **Documentos P23 que especificam** | EXPERIENCIA_COGNITIVA.md (Fase 4-5), SISTEMA_DE_INSIGHTS.md (padrões "hypothesisFormed", "investigationStarted"), SISTEMA_DE_CONFIANCA_VISUAL.md (Confiança Média), LOADING_INTELIGENTE.md |

---

### E4 — Revelando Insight

| Campo | Conteúdo |
|---|---|
| **Estado cognitivo** | REVELANDO |
| **O que acontece internamente** | Hypothesis Engine valida hipótese com confiança >= 60%. Pattern Engine confirma correlação. Priority Engine classifica relevância. Synthesis Engine gera síntese. Outcome Intelligence Engine projeta implicações. |
| **Gatilho de entrada** | Confiança em hipótese >= 60% (threshold para WOW) |
| **Gatilho de saída** | Confiança >= 80% (vai para CONFIRMANDO) OU empresário contesta (vai para CORRIGINDO) OU confiança cai abaixo de 60% (volta para INVESTIGANDO) |
| **Tempo de processamento esperado** | 800ms–2s (pausa dramática de 1-2s antes da revelação + entrega) |
| **Comportamento visual associado** | Pausa de 1-2s com indicador "Encontrei algo...", seguida de revelação com destaque visual. Badge verde "Insight" com ícone ✦. Card em destaque no painel com glow. Texto em formato de descoberta. Confiança exibida junto ao insight. |
| **O que o empresário percebe** | **Momento WOW.** "Ela viu algo que eu não vi." Pico da experiência. Surpresa intelectual. |
| **O que o painel cognitivo mostra** | Card de insight em destaque com badge verde. Confiança exibida (ex.: "Confiança: 87%"). Mapa cognitivo ganha boost de preenchimento. Barra de confiança sobe visivelmente. |
| **Variações por nível de confiança** | Confiança 60-75%: badge "Em Observação" + "Isso parece ser um padrão..." Tom investigativo. Confiança 75-90%: badge "Descoberta" + tom confiante. Confiança > 90%: badge "Confirmado" + tom afirmativo ("Isso é um padrão"). |
| **Documentos P23 que especificam** | EXPERIENCIA_COGNITIVA.md (Fase 6), SISTEMA_DE_VALOR.md (20 momentos WOW), SISTEMA_DE_INSIGHTS.md (padrões "evidenceSufficient", "confirmNeeded"), SISTEMA_DE_CONFIANCA_VISUAL.md (Confiança Alta), MATRIZ_DA_PERCEPCAO.md (S06) |

---

### E5 — Confirmando / Validando

| Campo | Conteúdo |
|---|---|
| **Estado cognitivo** | CONFIRMANDO |
| **O que acontece internamente** | Trust Engine recalcula confiança com evidências suficientes (>= 5 evidências, 30+ dias sustentados). Knowledge Governance Engine promove conhecimento. Cognitive Memory Engine registra como memória de longo prazo. Consolidação completa. |
| **Gatilho de entrada** | Confiança >= 80% com evidências de 2+ fontes diferentes |
| **Gatilho de saída** | Empresário confirma (sobe para CONCLUINDO) OU empresário contesta (vai para CORRIGINDO) |
| **Tempo de processamento esperado** | 600ms–1.5s |
| **Comportamento visual associado** | Badge verde-escuro com ícone de escudo. Barra de confiança >= 80% preenchida em verde sólido. Card com borda verde e label "Confiança Alta". A IA pergunta "Confirma?" ou "Isso faz sentido para você?" + botões "Confirmo" / "Discordo". Tom afirmativo. |
| **O que o empresário percebe** | "Posso confiar nessa informação. A IA está segura." Confiança transferida da IA para o empresário. |
| **O que o painel cognitivo mostra** | Card verde "Confiança Alta" com escudo. Evidências listadas (expansível). Barra de confiança sólida. Lacuna correspondente é fechada. |
| **Variações por nível de confiança** | Confiança 80-90%: "Tenho alta confiança." + tom afirmativo. Confiança > 90%: "Isso é algo que sei com convicção." + tom direto, menos alternativas. |
| **Documentos P23 que especificam** | SISTEMA_DE_CONFIANCA_VISUAL.md (Confiança Alta), SISTEMA_DE_INSIGHTS.md (padrão "evidenceSufficient"), EXPERIENCIA_COGNITIVA.md (Fase 8), GUIA_DA_CONVERSA.md (R-CO01, R-CO02) |

---

### E6 — Duvidando / Baixa Confiança

| Campo | Conteúdo |
|---|---|
| **Estado cognitivo** | DUVIDANDO |
| **O que acontece internamente** | Trust Engine com score < 50%. Evidências insuficientes (1 evidência), conflitantes (diferença < 10 pontos), ou desatualizadas (> 60 dias). Context Engine identifica lacuna crítica. Forgetting Engine pode descartar se confiança cair abaixo de 20 por 30+ dias. |
| **Gatilho de entrada** | Confiança < 50% OU evidências contraditórias de força similar |
| **Gatilho de saída** | Confiança >= 50% (nova evidência resolve dúvida) OU confiança < 20% por 30+ dias (descartado) |
| **Tempo de processamento esperado** | < 500ms (resposta imediata) |
| **Comportamento visual associado** | Badge azul-marinho com ícone de balança (dúvida) OU badge cinza com interrogação (baixa confiança). A IA só comunica se o empresário perguntar. "Não tenho certeza ainda. Vou investigar." para dúvida. "Preciso de mais informações para confirmar." para baixa confiança. Indicador neutro para "Não Sei". |
| **O que o empresário percebe** | "A IA é honesta sobre o que não sabe." Confiança na honestidade aumenta. |
| **O que o painel cognitivo mostra** | Card azul-marinho com badge "Em Análise" (dúvida) OU card cinza com borda tracejada "Hipótese" (baixa). Barras lado a lado (evidências a favor vs contra) para dúvida. Nenhum card para "Não Sei". |
| **Variações por nível de confiança** | Confiança 30-50%: badge cinza "Hipótese Inicial". Confiança < 30%: badge azul-marinho "Dúvida". Evidências contraditórias: badge azul-marinho "Em Análise". Fora do escopo: nenhum badge, "Não sei" direto. |
| **Documentos P23 que especificam** | SISTEMA_DE_CONFIANCA_VISUAL.md (Confiança Baixa, Dúvida Admitida, "Não Sei"), SISTEMA_DE_INSIGHTS.md (padrão "lowConfidence"), GUIA_DA_CONVERSA.md (R-TO02) |

---

### E7 — Corrigindo / Revisando

| Campo | Conteúdo |
|---|---|
| **Estado cognitivo** | CORRIGINDO |
| **O que acontece internamente** | Nova evidência contradiz conhecimento estabelecido (diferença > 20 pontos). Trust Engine recalcula. Validation Engine detecta inconsistência em revalidação noturna. Outcome Engine detecta decisão baseada em conhecimento com resultado negativo. |
| **Gatilho de entrada** | Empresário corrige explicitamente OU nova evidência contradiz hipótese existente com score suficiente |
| **Gatilho de saída** | Correção aplicada e integrada (confiança recalculada, hipótese revisada) |
| **Tempo de processamento esperado** | 600ms–1.5s (nunca deixar empresário esperando por correção) |
| **Comportamento visual associado** | Badge azul-claro com ícone de seta em curva (revisão). Texto: "Com essa nova informação, preciso revisar minha hipótese anterior." Card original recebe tarja "Revisado". Novo card aparece ao lado com explicação. O tom é de humildade intelectual: "Os dados me mostraram que eu estava enganado." |
| **O que o empresário percebe** | "A IA aprende com seus erros. Isso gera mais confiança." Percepção de sistema vivo e honesto. |
| **O que o painel cognitivo mostra** | Dois cards lado a lado: original com tarja "Revisado" + novo card. Linha do tempo mostrando: hipótese → evidência contrária → correção. Confiança pode cair (se refutada) ou subir (se contradição resolvida). |
| **Variações por nível de confiança** | Correção noturna (acumulada): comunicada no próximo login. Correção imediata: comunicada assim que detectada. Se mesmo conhecimento corrigido 3+ vezes: sistema sugere revisão do modelo. |
| **Documentos P23 que especificam** | SISTEMA_DE_CONFIANCA_VISUAL.md (Correção de Hipótese), EXPERIENCIA_COGNITIVA.md (Fase 8), GUIA_DA_CONVERSA.md (R-TR04), MANUAL_DA_INTELIGENCIA_VISIVEL.md (Mecanismo 5) |

---

### E8 — Evoluindo / Refinando

| Campo | Conteúdo |
|---|---|
| **Estado cognitivo** | EVOLUINDO |
| **O que acontece internamente** | Nova evidência complementa conhecimento existente (não contradiz — expande). Learning Engine processa feedback "AJUDOU_PARCIALMENTE". Intelligence Engine detecta novo padrão que refina conhecimento. |
| **Gatilho de entrada** | Confiança aumenta em 5+ pontos OU empresário fornece contexto adicional que preenche lacuna |
| **Gatilho de saída** | Confiança estabiliza por 24h OU transição para outro estado |
| **Tempo de processamento esperado** | Imediato (500ms–1.5s) |
| **Comportamento visual associado** | Badge verde-claro com ícone de seta em espiral (evolução). Card existente recebe badge "Atualizado" com data. Barra de confiança mostra mudança: linha tracejada da anterior + linha sólida da atual. Texto: "Isso complementa o que eu estava vendo. Minha confiança subiu." |
| **O que o empresário percebe** | "A IA está aprendendo comigo. Minha contribuição tem valor." Sensação de cocriação. |
| **O que o painel cognitivo mostra** | Card com badge "Atualizado". Indicador de delta (+X% confiança). Tooltip: "Este conhecimento foi refinado com novas informações." |
| **Variações por nível de confiança** | Evolução positiva (confiança aumenta): badge + seta para cima. Evolução por expansão (nova dimensão): "Agora entendo melhor." Evolução por refinamento (ajuste fino): "Agora com mais precisão." Melhoria < 5 pontos: não comunica, apenas registra. |
| **Documentos P23 que especificam** | SISTEMA_DE_CONFIANCA_VISUAL.md (Evolução da Compreensão), MANUAL_DA_INTELIGENCIA_VISIVEL.md (Mecanismo 7 — Revelação Gradual), SISTEMA_DE_VALOR.md (momento 17) |

---

### E9 — Concluindo / Sintetizando

| Campo | Conteúdo |
|---|---|
| **Estado cognitivo** | CONCLUINDO |
| **O que acontece internamente** | Cobertura >= 80% OU confiança média > 75% OU Knowledge Engine confirma threshold de diagnóstico (60% nas 5 dimensões). Synthesis Engine gera síntese consolidada. Outcome Intelligence Engine projeta recomendações. Tudo integrado em um diagnóstico. |
| **Gatilho de entrada** | Threshold de diagnóstico atingido OU empresário indica que precisa parar |
| **Gatilho de saída** | Relatório entregue OU sessão encerrada |
| **Tempo de processamento esperado** | 1–3s (organização do diagnóstico) |
| **Comportamento visual associado** | Card de resumo expande com animação. Cerimônia sutil: barra de "Cobertura Cognitiva" completa. Texto: "Já tenho conhecimento suficiente para formar um diagnóstico consistente." Bullet points com descobertas, implicações, recomendações. Botão "Continuar" ou "Ver dashboard completo". |
| **O que o empresário percebe** | "A conversa teve valor. Saio daqui sabendo mais do que entrei." Sensação de progresso e conclusão. |
| **O que o painel cognitivo mostra** | Cobertura final. Confiança final. Todos os insights organizados por categoria. Lacunas não exploradas (para próxima sessão). Painel em estado de conclusão (checklist completo). |
| **Variações por nível de confiança** | Se empresário precisa parar: "Posso salvar seu progresso e continuamos depois." Se empresário quer mais: "Posso aprofundar em qualquer área." Se IA detecta urgência: "Isso merece atenção esta semana ainda." |
| **Documentos P23 que especificam** | EXPERIENCIA_COGNITIVA.md (Fase 10-11), SISTEMA_DE_VALOR.md (momento 13 — Diagnóstico Inicial), MATRIZ_DA_PERCEPCAO.md (S08, S09), SISTEMA_DE_INSIGHTS.md (Autoavaliação "Pronto") |

---

### E10 — Em Silêncio / Processamento em Background

| Campo | Conteúdo |
|---|---|
| **Estado cognitivo** | SILÊNCIO |
| **O que acontece internamente** | Motor Cognitivo ativo em background. Ritmo Engine determina que não há necessidade de comunicação. Observação de rotina sem alertas. Conhecimento estável sem novidades. Processamento noturno (consolidação). |
| **Gatilho de entrada** | Empresário inativo por 30s+ OU processamento noturno automático |
| **Gatilho de saída** | Priority Engine determina que algo merece interrupção OU empresário puxa conversa |
| **Tempo de processamento esperado** | Indeterminado (pode durar segundos a horas) |
| **Comportamento visual associado** | Indicador mínimo: ponto pulsante no canto da tela (ícone de "ativo mas em silêncio"). Sem badge, sem card, sem notificação. Se empresário clica: "Estou analisando seus dados. Nada urgente." |
| **O que o empresário percebe** | "A IA está lá, trabalhando, mas não me interrompe. Respeita meu espaço." Confiança no background processing. |
| **O que o painel cognitivo mostra** | Ponto pulsante cinza claro. Texto: "Processando... última análise: [timestamp]." |
| **Variações por nível de confiança** | Silêncio padrão após resposta: IA não comunica, apenas aguarda. Silêncio longo (>5min): ponto para de pulsar, só reativa com interação. Silêncio produtivo (empresário lendo): IA não intervém. |
| **Documentos P23 que especificam** | SISTEMA_DE_CONFIANCA_VISUAL.md (Silêncio Cognitivo), GUIA_DA_CONVERSA.md (R-SI01 a R-SI04), EXPERIENCIA_SENSORIAL.md (seção 9 — Invisibilidade), MANUAL_DA_INTELIGENCIA_VISIVEL.md (seção 9) |

---

### E11 — Processando Ação / Decidindo

| Campo | Conteúdo |
|---|---|
| **Estado cognitivo** | AGINDO |
| **O que acontece internamente** | Decision Engine calcula melhor decisão. Action Intelligence Engine cria ação. Cognitive Memory Engine registra na memória. Event bus publica eventos de saída. Feedback Intelligence Engine aguarda retorno. |
| **Gatilho de entrada** | Decisão tomada pelo Decision Engine OU ação sugerida pelo Priority Engine |
| **Gatilho de saída** | Ação criada e registrada OU empresário recusa a ação |
| **Tempo de processamento esperado** | 1–3s |
| **Comportamento visual associado** | Card de recomendação/ação com ícone e botões de ação. "Recomendo: [ação] com [X%] de confiança." Botões "Sim, fazer" / "Não agora" / "Personalizar". Se ação criada: badge "Ação Criada" com data e status. |
| **O que o empresário percebe** | "A IA não só analisa — também sugere ações práticas." Valor tangível. |
| **O que o painel cognitivo mostra** | Seção "Recomendações" ou "Próximos Passos" com lista de ações sugeridas. Status: pendente, em andamento, concluída. |
| **Variações por nível de confiança** | Confiança > 80%: recomendações diretas com tom afirmativo. Confiança 50-80%: recomendações com "sugiro" e alternativas. Confiança < 50%: IA não recomenda, apenas pergunta "Quer investigar?". |
| **Documentos P23 que especificam** | SISTEMA_DE_VALOR.md (momentos 3, 8, 9, 12, 18, 20), MANUAL_DA_INTELIGENCIA_VISIVEL.md (seção 7 — Quando Apenas Agir), EXPERIENCIA_COGNITIVA.md (Fase 11) |

---

### E12 — Retornando / Memória Reativada

| Campo | Conteúdo |
|---|---|
| **Estado cognitivo** | RETORNANDO |
| **O que acontece internamente** | Cognitive Memory Engine recupera contexto da última sessão. Context Engine recalcula prioridade com dados acumulados. Founder Activation Engine consulta jornada do fundador. Observation Engine detecta mudanças desde último login. |
| **Gatilho de entrada** | Login do empresário com sessão anterior existente |
| **Gatilho de saída** | Contexto restaurado e apresentado ao empresário |
| **Tempo de processamento esperado** | < 1s (login + restauração de contexto) |
| **Comportamento visual associado** | Saudação personalizada: "Bem-vindo de volta, [nome]. Sua última visita foi na [dia]. Desde então, processei [mudança detectada]." Painel cognitivo restaura estado anterior. Mapa mostra dados acumulados. Se houve mudança: "Notei que [mudança] desde sua última visita." |
| **O que o empresário percebe** | "A IA lembra de mim e do que conversamos." Sensação de continuidade e relacionamento. |
| **O que o painel cognitivo mostra** | Estado completo restaurado: cobertura, confiança, hipóteses, lacunas. Mapa com áreas preenchidas da sessão anterior. Cards de insight preservados. |
| **Variações por nível de confiança** | Primeiro retorno: saudação + restauração simples. Retorno com novidade: "Enquanto você estava fora, encontrei um padrão novo." Retorno sem novidade: "Nada mudou desde sua última visita. Vamos continuar de onde paramos?" |
| **Documentos P23 que especificam** | EXPERIENCIA_COGNITIVA.md (Fase 1 — variação de retorno), MATRIZ_DA_PERCEPCAO.md (S11), SISTEMA_DE_VALOR.md (momento 19), CHECKLIST_DE_EXPERIENCIA.md (Continuidade) |

---

## Tabela Resumo — Matriz Completa de Estados Cognitivos

| # | Estado Motor | Gatilho Entrada | Gatilho Saída | Tempo Esperado | Comportamento Visual | Painel Cognitivo | Documentos P23 |
|---|---|---|---|---|---|---|---|
| E1 | VAZIO | Primeiro acesso sem dados | Primeira resposta | — | Tela de login, painel vazio, saudação inicial | 0% cobertura, 0% confiança | EXP_COGNITIVA (F0-1), MATRIZ (S01-02) |
| E2 | RECEBENDO | Empresário envia resposta | Confianca >= 20% | 300ms–5s | Microfeedback + badge "Recebido" + indicador narrativo | Badge cinza "Explorando", cobertura 2-15% | SIST_INSIGHTS (areaIdentified), GUIA_CONV (R-MF01) |
| E3 | INVESTIGANDO | 2+ evidências no domínio | Confianca >= 50% | 2–7s | Badge amarelo "Investigando" + card hipótese | Card amarelo "Em Observação", cobertura 15-40% | SIST_INSIGHTS (hypothesisFormed), SIST_CONFIANCA (Média) |
| E4 | REVELANDO | Confianca >= 60% | Confianca >= 80% ou contestação | 800ms–2s | Pausa dramática + ✦ + badge verde "Insight" | Card insight em destaque, boost de cobertura | SIST_VALOR (20 WOWs), EXP_COGNITIVA (F6) |
| E5 | CONFIRMANDO | Confianca >= 80% | Empresário confirma ou contesta | 600ms–1.5s | Badge verde-escuro escudo + "Confirma?" + tom afirmativo | Card verde "Confiança Alta", evidências listadas | SIST_CONFIANCA (Alta), GUIA_CONV (R-CO01) |
| E6 | DUVIDANDO | Confianca < 50% | Confianca >= 50% ou descarte | < 500ms | Badge azul-marinho balança ou cinza interrogação | Card azul "Em Análise" ou cinza "Hipótese" | SIST_CONFIANCA (Baixa, Dúvida), SIST_INSIGHTS (lowConfidence) |
| E7 | CORRIGINDO | Empresário corrige ou contradição | Correção aplicada | 600ms–1.5s | Badge azul-claro seta curva + tarja "Revisado" | Dois cards: original revisado + novo | SIST_CONFIANCA (Correção), EXP_COGNITIVA (F8) |
| E8 | EVOLUINDO | Confianca sobe 5+ pontos | Confianca estabiliza 24h | 500ms–1.5s | Badge verde-claro espiral + "Atualizado" + delta | Card "Atualizado", indicador de melhoria | SIST_CONFIANCA (Evolução), MANUAL_INTEL (M7) |
| E9 | CONCLUINDO | Threshold diagnóstico >= 60% | Relatório entregue | 1–3s | Card resumo expande + barra completa + bullets | Cobertura final, insights organizados, lacunas | EXP_COGNITIVA (F10-11), SIST_VALOR (#13) |
| E10 | SILÊNCIO | 30s+ inatividade | Priority Engine interrompe | Indeterminado | Ponto pulsante no canto, sem badge ou card | "Processando... última análise: [timestamp]" | SIST_CONFIANCA (Silêncio), GUIA_CONV (R-SI01) |
| E11 | AGINDO | Decision Engine decide | Ação criada ou recusada | 1–3s | Card recomendação + botões "Sim, fazer" | Seção "Recomendações" com status | SIST_VALOR (#3, 8, 9, 12, 18, 20) |
| E12 | RETORNANDO | Login c/ sessão anterior | Contexto restaurado | < 1s | Saudação personalizada + mapa restaurado | Estado completo restaurado | MATRIZ (S11), SIST_VALOR (#19) |

---

## Lacunas Catalogadas (Estado Cognitivo sem Comportamento Visual)

| ID | Lacuna | Estado de Origem | Descrição | Gravidade |
|---|---|---|---|---|
| L1 | Falha do Motor | E2–E12 | Nenhum documento P23 especifica o que a IA mostra quando o Motor falha (timeout, API error, dado inconsistente). O comportamento visual para falha não está mapeado para nenhum estado cognitivo. | GRAVE |
| L2 | Processamento em Background sem Indicador | E10 | O processamento noturno (rotina diária, semanal, mensal do Orchestrator) não tem representação visual quando o empresário está offline. O ponto pulsante só aparece quando ele está logado. | MÉDIA |
| L3 | Descarte de Hipótese (Forgetting Engine) | E6 | Quando a Forgetting Engine descarta uma hipótese (confiança < 20 por 30+ dias), não há comunicação visual. A hipótese simplesmente "some". O empresário pode estranhar se perguntar depois. | MÉDIA |
| L4 | Zero Confiança Sem Dados | E1 | O estado VAZIO com confiança 0 não tem representação visual específica — a tela de login é genérica. O empresário não sabe que "a IA está pronta mas não tem dados ainda". | BAIXA |
| L5 | Timeout de Processamento | E3 | Processamento > 8s sem indicador de progresso não tem protocolo visual definido. A AUDITORIA identificou que isso é uma lacuna (L2). | ALTA |

## Inconsistências Catalogadas (Comportamento Visual sem Estado Cognitivo de Origem)

| ID | Inconsistência | Comportamento Visual | Estado Ausente | Descrição | Gravidade |
|---|---|---|---|---|---|
| I1 | Animação Decorativa | Animações sem correspondência com processamento real do Motor | NENHUM | Se uma animação existe sem processamento real correspondente, é "fake processing" — proibido pelo MANUAL_DA_INTELIGENCIA_VISIVEL.md (Antipadrão 2). Catalogar cada animação que não tenha gatilho de engine. | GRAVE |
| I2 | Som Decorativo | Sons que não correspondem a eventos cognitivos reais | NENHUM | EXPERIENCIA_SENSORIAL.md define 5 sons, todos vinculados a eventos cognitivos. Se um som for implementado sem gatilho real de engine, é inconsistência. | ALTA |
| I3 | Telas Operacionais com Tom de IA | Configurações/pagamento usando tom de voz da IA | NENHUM | CERTIFICACAO_DA_EXPERIENCIA.md seção 7.3 proíbe. Telas fora do escopo de certificação não podem usar elementos da experiência certificada. | ALTA |

---

## Regras de Verificação

1. **Toda nova engine** criada no `sistema/src/engine/` deve ter seu estado mapeado nesta certificação antes de qualquer implementação visual.
2. **Toda nova tela/componente** visual deve apontar para UM estado cognitivo nesta matriz. Se não apontar, não pode existir.
3. **Todo comportamento visual** sem estado cognitivo de origem é considerado INCONSISTÊNCIA e deve ser removido ou justificado com ADR.
4. **Todo estado cognitivo** sem comportamento visual é considerado LACUNA e deve ser priorizado no próximo sprint.
5. **A cada sprint**, esta matriz deve ser revisada contra o código real das engines e da camada de experiência.

---

*Este documento é parte do Programa 24 — Certificação Cognitiva.*
*Substitui qualquer mapeamento anterior entre Motor Cognitivo e Experiência.*
