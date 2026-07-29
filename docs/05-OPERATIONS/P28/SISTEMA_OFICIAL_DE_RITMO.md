# Sistema Oficial de Ritmo

> *Quanto tempo cada coisa permanece. Quando acelerar. Quando desacelerar. Quando silenciar. Quando interromper. Quando explicar. O ritmo da Ponte Digital não é acidental — é uma decisão de design que comunica segurança, competência e respeito.*

---

## 1. Fundamentos do Ritmo

### 1.1 O que o ritmo comunica

| Ritmo | O que o empresário sente |
|---|---|
| Rápido (< 600ms) | Segurança, domínio, confiança. A IA sabe o que está fazendo. |
| Médio (1-3s) | Reflexão, cuidado. A IA está considerando variáveis. |
| Lento (> 3s) | Processamento profundo. A IA está trabalhando em algo importante. |
| Pausa + revelação | Descoberta. "Isso merece sua atenção." |
| Silêncio | Respeito. O espaço é do empresário. |

### 1.2 Princípio fundamental

O ritmo da Ponte Digital deve fazer o empresário sentir que está interagindo com uma inteligência atenta e competente — não com uma máquina que responde no mesmo tempo sempre, nem com um robô que apressa.

---

## 2. Ritmo da Conversa

### 2.1 Tempos de resposta

| Situação | Tempo ideal | Por quê |
|---|---|---|
| **Pergunta simples** (qual o saldo?, quantos clientes?) | 400-600ms | Resposta direta, sem hesitação. O empresário confirma que a IA está presente. |
| **Pergunta complexa** (qual a tendência?, o que está acontecendo com X?) | 1.5-3s | A IA precisa de tempo para processar, correlacionar. Mostra que não é uma resposta superficial. **Exibir indicador de pensamento.** |
| **Insight** ("Percebi algo interessante...") | Pausa de 1s antes, revelação em 800ms, destaque por 3s | A pausa antes cria expectativa. A revelação é rápida, limpa. O destaque segura por 3s para o empresário absorver. |
| **Correção** ("Na verdade, o dado correto é...") | 600ms | Correção rápida mostra segurança. Hesitação na correção transmite dúvida. |
| **Confirmação** ("Feito.", "Atualizado.") | 300ms | Instantâneo. O que foi pedido já aconteceu. |
| **Não sei** ("Não tenho esse dado ainda.") | 600-800ms | Honesto, direto, sem enrolação. Seguido de "Posso descobrir se você quiser." |

### 2.2 Ritmo de espera

| Situação | Comportamento |
|---|---|
| **Silêncio do empresário** (não digita, não responde) | Esperar **5s** antes de qualquer intervenção. Se passar de 5s, oferecer ajuda de forma sutil ("Precisa de algo?"), nunca perguntar "Ainda está aí?". |
| **Empresário digitando** | IA espera **800ms após a última tecla** antes de processar. Isso evita interromper o raciocínio de quem ainda está formulando. |
| **Empresário lendo** (scroll ativo, sem digitação) | Não interromper. Se o empresário está lendo, a IA espera. Apenas intervir se houver um erro crítico. |
| **Empresário hesitante** (começa a digitar, para, recomeça) | Aguardar 3s após última tecla. Se houver pausa > 3s, perguntar "Posso ajudar com algo específico?" |

### 2.3 Progressão da conversa

Mensagens consecutivas da IA seguem este ritmo:

1. IA responde → empresário lê (mínimo 2s de pausa do empresário)
2. Se empresário não responde em 5s → IA pergunta se precisa de ajuda
3. Se empresário não responde em 15s → IA silencia e aguarda (a conversa não expira)
4. Se empresário responde imediatamente (< 1s) → IA responde também rápido (reconhece ritmo acelerado)

**Regra de acoplamento de ritmo:** A IA deve espelhar o ritmo do empresário. Empresário rápido → IA rápida. Empresário lento e reflexivo → IA mais lenta e ponderada. Nunca forçar seu ritmo sobre o dele.

---

## 3. Ritmo da Interface

### 3.1 Transições e animações

| Elemento | Duração | Comportamento |
|---|---|---|
| **Transição de tela** (rota) | 400ms | Fade sutil com leve translate. Nem rápida demais (desorienta), nem lenta (frustra). |
| **Card aparecendo em sequência** | 300ms entre cada card | Os cards entram um após o outro. Primeiro card + 300ms → segundo card + 300ms → terceiro. Máximo de 4 cards em sequência animada. |
| **Notificação / Toast** | 4s visível, auto-dismiss | Tempo suficiente para ler, não o suficiente para distrair. Se for crítica, permanece até ação do empresário. |
| **Loading progressivo** | Texto muda a cada 3s | Se o loading durar mais que 3s, trocar o texto do indicador. Não repetir o mesmo texto. Ex: "Analisando dados..." → "Comparando padrões..." → "Identificando conexões..." |
| **Painel atualizando** (barras, gráficos) | 600ms para cada barra/elemento | Atualização progressiva, não instantânea. O olho acompanha a mudança. |
| **Tooltip aparecendo** | 200ms delay, 150ms fade in | Delay evita tooltips fantasmas em mouseovers acidentais. |
| **Tooltip desaparecendo** | 100ms | Instantâneo. Quando o mouse sai, o tooltip sai junto. |
| **Modal abrindo** | 250ms fade + 250ms slide up | A modal não aparece do nada — ela "vem" de baixo para cima. |
| **Modal fechando** | 200ms fade out | Rápido. O empresário já decidiu fechar. |

### 3.2 Indicador de pensamento

O indicador de pensamento da IA não é um spinner genérico. Ele comunica progresso:

| Estado | Duração | Indicador |
|---|---|---|
| **Pensamento inicial** (0-1s) | Até 1s | Pontos pulando (3 pontos, fade sequencial) |
| **Pensamento médio** (1-3s) | 1-3s | "Analisando dados financeiros..." com texto dinâmico |
| **Pensamento longo** (3-6s) | 3-6s | Texto troca a cada 3s + mapa cognitivo mínimo visível |
| **Pensamento muito longo** (> 6s) | 6s+ | "Isso é complexo — estou conectando os pontos. Enquanto isso, você quer ajustar algum parâmetro?" |

**Regra:** O indicador de pensamento nunca mente. Se a IA não está realmente processando, não deve mostrar "pensando". O indicador só aparece quando há processamento real.

---

## 4. Ritmo Emocional

### 4.1 Quando acelerar

| Condição | Ação |
|---|---|
| **Confiança alta** (scoreConfiança > 70) | Reduzir tempos de resposta em 30%. A IA é mais direta. |
| **Empresário experiente** (5+ interações no mesmo assunto) | Respostas mais concisas, menos explicação, mais ação. |
| **Resposta urgente** (erro financeiro, prazo apertado) | IA responde no tempo mínimo possível. Explicações reduzem. |
| **Empresário em fluxo** (respostas em < 2s) | IA acompanha o ritmo acelerado. Máximo de eficiência. |

### 4.2 Quando desacelerar

| Condição | Ação |
|---|---|
| **Confiança baixa** (scoreConfiança < 30) | Aumentar tempos em 50%. Mais pausas. Oferecer confirmação antes de agir. |
| **Primeira vez do empresário** (na funcionalidade) | Ritmo mais lento, mais explicação, mais pausas entre passos. |
| **Pergunta difícil** ("O que eu deveria fazer sobre X?") | Pausa de 1.5s antes de responder. Isso comunica que a IA está refletindo seriamente. |
| **Empresário hesitante** (começa e para) | Desacelerar. Perguntar "Posso explicar de outra forma?" antes de continuar. |
| **Assunto emocional** (demissão, conflito, perda financeira) | Ritmo mais lento, tom mais suave. Mais espaço. Evitar respostas diretas demais. |

### 4.3 Quando silenciar

| Condição | Ação |
|---|---|
| **Empresário pensando** (não digita, mas está na tela) | Silêncio total. A IA não se manifesta. |
| **Empresário lendo** (scroll ativo) | Silêncio. A IA observa. |
| **Empresário refletindo após insight** | Silêncio por no mínimo 5s. O insight precisa de espaço para ser assimilado. |
| **Empresário em reunião** (indicado pelo calendário) | A IA só interrompe para alertas críticos. |

### 4.4 Quando interromper

| Condição | Prioridade | Como interromper |
|---|---|---|
| **Erro crítico** (sistema caiu, dado perdido) | Urgente | Notificação imediata com tom de alerta. |
| **Timeout** (empresário esqueceu a sessão aberta) | Médio | Alerta sutil após 20min de inatividade. |
| **Dado contraditório** (informação que conflita com decisão anterior) | Importante | Interromper com "Notei algo que parece inconsistente..." — nunca "Você está errado". |
| **Insight relevante** (padrão identificado) | Baixo | Aguardar momento adequado (fim do fluxo atual, pausa na conversa). |
| **Lembrete de ação** (prazo próximo) | Médio | Notificação suave 24h antes. Apenas uma vez. |

---

## 5. Regras de Ritmo

### 5.1 As Quatro Leis do Ritmo

**Lei 1 — Ritmo acelera com confiança**

> Quanto mais confiante a IA está no dado, no contexto e na relação, mais rápido pode responder. Confiança alta = resposta direta. Confiança baixa = resposta ponderada com validação.

*Implementação:* O tempo de resposta base é modulado pelo `scoreConfianca` do conhecimento acionado. Confiança > 70 → tempo base × 0.7. Confiança < 30 → tempo base × 1.5.

**Lei 2 — Ritmo desacelera com complexidade**

> Quanto mais complexa a pergunta, mais tempo a IA deve levar para responder. Uma resposta rápida a uma pergunta complexa parece superficial. Uma resposta lida a uma pergunta simples parece incompetente.

*Implementação:* Complexidade é medida por: número de fontes consultadas, número de variáveis envolvidas, ambiguidade da pergunta. Cada fator adiciona 200-500ms ao tempo de resposta.

**Lei 3 — Ritmo respeita o empresário**

> A IA nunca apressa o empresário. O empresário define o ritmo da conversa — a IA se adapta. Se o empresário é lento, a IA é paciente. Se o empresário está com pressa, a IA é eficiente.

*Implementação:* A IA calibra seu ritmo observando o tempo de resposta do empresário nas últimas 5 interações. Média móvel como referência.

**Lei 4 — Ritmo comunica estado**

> O ritmo é um sinal. Ritmo lento diz "estou pensando profundamente". Ritmo rápido diz "isso é direto, confie". O empresário deve sentir o estado da IA pelo ritmo, não apenas por indicadores visuais.

*Implementação:* Não esconder o processamento. Se a IA está fazendo 3 consultas diferentes, mostrar progresso, não um spinner genérico.

### 5.2 Tabela de modulação de ritmo

| Fator | Influência no ritmo | Escala |
|---|---|---|
| Confiança no dado | Inversamente proporcional | ±30% |
| Complexidade da consulta | Diretamente proporcional | +200-500ms/fonte |
| Experiência do empresário | Inversamente proporcional | ±25% |
| Urgência do contexto | Inversamente proporcional | -40% (modo urgente) |
| Estado emocional do empresário | Adaptativo | Manual via machine learning |
| Hora do dia | Sutil | — |

---

## 6. Anti-padrões de Ritmo

### 6.1 O que NUNCA fazer

| Anti-padrão | Problema | Solução |
|---|---|---|
| **Resposta instantânea para pergunta complexa** | Parece que a IA não pensou — resposta genérica. | Adicionar pausa de 1-3s com indicador de pensamento. |
| **Resposta lenta para pergunta simples** | Parece que a IA é lerda ou está com problema. | Responder em < 600ms. Se houver delay real, mostrar "Processando confirmação..." |
| **Interromper o empresário enquanto ele digita** | Quebra o raciocínio. O empresário se sente apressado. | Aguardar 800ms após última tecla. |
| **Silêncio após erro** | Empresário fica sem saber se a IA entendeu. | Responder em 600ms com confirmação do erro + correção. |
| **Spinner genérico sem contexto** | Empresário não sabe o que está acontecendo. | Texto dinâmico: "Analisando...", "Comparando...", "Identificando..." |
| **Velocidade constante** | Parece robótico, não humano. | Variar ritmo conforme conteúdo e contexto. |
| **Acelerar quando empresário está confuso** | Aumenta a confusão. | Desacelerar. Dar mais espaço. |

---

## 7. Métricas de Ritmo

Para avaliar se o ritmo está adequado:

| Métrica | Alvo | Como medir |
|---|---|---|
| Tempo médio de resposta | 1.5-2.5s | Média dos tempos de resposta da IA |
| Taxa de interrupção | < 5% | % de vezes que IA falou enquanto empresário digitava |
| Tempo de silêncio antes de intervenção | > 5s | Média de pausa antes da IA oferecer ajuda |
| Satisfação com velocidade | > 4/5 | Pergunta "A velocidade das respostas foi adequada?" |
| Abandono por lentidão | < 10% | Sessões fechadas durante loading > 10s |

---

*Documento complementar: SISTEMA_OFICIAL_DE_RESPIRACAO.md (o espaço entre as coisas), LINGUAGEM_VISUAL_OFICIAL.md (o que é mostrado), SISTEMA_OFICIAL_DE_ATENCAO.md (para onde o empresário olha).*
