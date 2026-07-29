# Sistema Oficial do Centro de Decisão

> Como apresentar problemas, hipóteses, confiança, riscos, recomendações.
> O Centro de Decisão é o coração cognitivo da Ponte Digital — o local onde o empresário encontra clareza para decidir.

---

## 1. Estrutura de Cada Decisão

Toda decisão apresentada ao empresário segue sete partes obrigatórias, nesta ordem:

### 1.1 Contexto (2-3 linhas)

O empresário precisa entender a situação em segundos.

Regras:
- Máximo 3 linhas
- Responde: "O que está acontecendo?"
- Linguagem direta, sem jargão
- Inclui dado quantitativo sempre que possível
- Não inclui opinião — apenas fato

Exemplo:
> Sua receita de julho caiu 12% em relação a junho. Foram 3 clientes que reduziram o plano. O ticket médio caiu de R$ 2.450 para R$ 2.150.

### 1.2 Hipótese (1-2 linhas)

O que a IA acredita que está acontecendo.

Regras:
- Máximo 2 linhas
- Responde: "O que a IA pensa?"
- Inicia com "Acredito que..." ou "Minha hipótese é..."
- Baseada nas evidências (nunca suposição sem dado)
- Pode ter múltiplas hipóteses (máximo 3, ranqueadas por confiança)

Exemplo:
> Acredito que a queda foi causada pela saída de clientes do plano Premium para o plano Básico, motivada pela nova política de preços que entrou em vigor em junho.

### 1.3 Confiança (anel visual)

Nível de confiança na hipótese.

Formato:
- Anel circular (radial fill, 600ms, ease-out)
- Percentual: 0-100%
- Cor: verde (> 80%), amarelo (60-80%), laranja (40-60%), vermelho (< 40%)
- Tamanho: 48px (padrão), 64px (quando é a decisão em destaque)

Regras:
- Confiança nunca é 100% (nunca certeza absoluta)
- Confiança nunca é 0% (se zero, não é uma hipótese — é um palpite)
- Confiança <> Precisão. A IA comunica o quanto confia, não o quanto acerta.
- Abaixo do anel: legenda textual ("Confiança alta/média/baixa/muito baixa")

Níveis e cores:
| Faixa | Rótulo | Cor | Comportamento |
|---|---|---|---|
| 81-99% | Alta | Verde (#22C55E) | Recomendação com segurança |
| 61-80% | Média | Amarelo (#EAB308) | Recomendação, mas alerta |
| 41-60% | Baixa | Laranja (#F97316) | Precaução, explorar alternativas |
| 1-40% | Muito baixa | Vermelho (#EF4444) | Não recomendar sem mais dados |

### 1.4 Evidências (lista)

Dados que sustentam a hipótese.

Formato:
- Lista com bullets
- Ícone: dado/gráfico (📊 ou equivalente visual)
- Cada evidência: 1-2 linhas
- Máximo 5 evidências por hipótese
- Se múltiplas hipóteses: evidências separadas por hipótese

Regras:
- Evidências SEMPRE têm fonte (de onde veio o dado)
- Evidências SEMPRE têm valor (o dado em si)
- Evidências são ordenadas por relevância (mais forte primeiro)
- Evidência forte: dado quantitativo, recente, direto
- Evidência fraca: dado qualitativo, antigo, indireto — rotular como "evidência indireta"

Exemplo:
- 3 clientes migraram do Premium para Básico em junho (fonte: relatório de planos)
- Faturamento do plano Premium caiu 18% (fonte: financeiro)
- Novo preço do Premium: aumento de 25% (fonte: política de preços - junho)

### 1.5 Riscos (lista)

O que pode dar errado se seguir ou não a recomendação.

Formato:
- Lista com bullets
- Ícone: alerta (⚠️ ou equivalente visual)
- Cada risco: 1-2 linhas
- Máximo 3 riscos
- Risco principal em destaque (primeiro)

Cada risco inclui:
- Descrição do risco
- Impacto potencial (baixo/médio/alto)
- Probabilidade estimada (se disponível)

Exemplo:
- ⚠️ Clientes insatisfeitos podem cancelar se voltarmos ao preço anterior (impacto: alto, probabilidade: média)
- ⚠️ Reduzir preço pode impactar margem em 5% (impacto: médio, probabilidade: alta)
- ⚠️ Concorrentes podem acompanhar a redução (impacto: baixo, probabilidade: baixa)

### 1.6 Recomendação (destaque visual)

O que a IA sugere que o empresário faça.

Formato:
- Destaque visual: cor diferente, tamanho maior, fundo levemente destacado
- 1-3 linhas
- Clara, específica, acionável
- Inicia com "Recomendo..." ou "Sugiro..."
- Baseada na hipótese + evidências + riscos
- A recomendação não é uma ordem — é uma sugestão fundamentada

Caso a confiança seja baixa (< 60%):
- A recomendação é precedida de "Com a confiança atual, uma possibilidade seria..."
- Duas alternativas são oferecidas (explorar mais dados OU agir com cautela)

Exemplo (confiança alta):
> Recomendo revisar a política de preços do plano Premium. Sugiro manter o novo valor mas oferecer um desconto de fidelidade de 10% para clientes antigos, reduzindo o impacto da migração.

Exemplo (confiança baixa):
> Com a confiança atual, uma possibilidade seria investigar mais a fundo por que os clientes migraram antes de ajustar preços. Alternativamente, podemos oferecer um desconto temporário e medir a reação.

### 1.7 Ação (próximo passo)

O que o empresário pode fazer agora.

Formato:
- Botão primário: "Seguir recomendação"
- Botão secundário: "Explorar alternativas"
- (Opcional) Botão terciário: "Ver dados completos"

Comportamento dos botões:
| Botão | Ação | Resultado |
|---|---|---|
| Seguir recomendação | Assistente executa ou prepara execução | Confirmação + próximos passos |
| Explorar alternativas | Assistente apresenta 2-3 variações da recomendação | Lista de alternativas |
| Ver dados completos | Abre relatório completo no dashboard | Tela de relatório |

Abaixo dos botões (opcional, se relevante):
- "Essa decisão pode ser adiada por até [prazo]"
- "Decisão pode ser delegada para [pessoa]"

---

## 2. Apresentação Visual

### 2.1 Card principal

O centro de decisão é apresentado como um card que contém toda a estrutura acima.

Layout do card (ordem visual):

```
┌─────────────────────────────────────────────┐
│  [Área] · [Prioridade] · [Há quanto tempo]  │
│                                               │
│  CONTEXTO                                     │
│  (2-3 linhas)                                 │
│                                               │
│  ┌───────────┐                               │
│  │  HIPÓTESE  │  [Anel de confiança]          │
│  │  (1-2 linhas) │  78%                       │
│  └───────────┘                               │
│                                               │
│  📊 EVIDÊNCIAS                                │
│  • Evidência 1                                │
│  • Evidência 2                                │
│  • Evidência 3                                │
│                                               │
│  ⚠️ RISCOS                                    │
│  • Risco 1 (impacto: alto)                    │
│  • Risco 2 (impacto: médio)                   │
│                                               │
│  ┌─ RECOMENDAÇÃO ──────────────────────────┐  │
│  │  Recomendo [texto em destaque]           │  │
│  └─────────────────────────────────────────┘  │
│                                               │
│  [Seguir recomendação]  [Explorar alternativas]│
│                                               │
│  Pode ser adiada por até 15 dias              │
└─────────────────────────────────────────────┘
```

### 2.2 Hierarquia visual no card

| Elemento | Peso visual | Cor | Tamanho de fonte |
|---|---|---|---|
| Contexto | Normal | Texto primário | 14px |
| Hipótese | Destaque | Texto primário (bold) | 16px |
| Anel de confiança | Alto | Conforme nível | 48-64px |
| Evidências | Normal | Texto secundário | 13px |
| Riscos | Alerta | Texto de alerta | 13px |
| Recomendação | Máximo | Destaque (cor primária) | 16px bold |
| Botão primário | Alto | Primária (sólido) | 14px |
| Botão secundário | Médio | Primária (outline) | 14px |

### 2.3 Espaçamento e densidade

- Card: padding 24px
- Entre seções: 20px
- Entre bullets: 8px
- Máximo de texto por linha: ~70 caracteres (legibilidade)
- Card nunca ultrapassa 80% da altura da viewport (se maior, scroll interno)

---

## 3. Estados do Centro de Decisão

### 3.1 Estado vazio

Nenhuma decisão pendente.

Mensagem exibida:
> "Nenhuma decisão pendente. Continue usando a Ponte para receber recomendações."

Elementos visíveis:
- Mensagem centralizada
- Ilustração sutil (placeholder visual)
- Avatar do assistente (modo presente)
- Campo de texto disponível

### 3.2 Estado pendente

Lista de decisões a serem tomadas.

Regras:
- Decisões ordenadas por prioridade (urgente → pode esperar)
- Decisões agrupadas por área (financeiro, clientes, operação, equipe)
- Máximo 1 decisão em destaque (a mais urgente)
- Demais decisões: visíveis em lista compacta

Layout do estado pendente:

```
┌─────────────────────────────────────────────┐
│  Centro de Decisão        [Filtrar por área] │
│                                               │
│  ┌─ EM DESTAQUE ──────────────────────────┐  │
│  │  (Card completo da decisão mais urgente) │  │
│  └─────────────────────────────────────────┘  │
│                                               │
│  🔴 FINANCEIRO (2 pendentes)                  │
│  • [Alta] Queda de receita - 3 dias atrás     │
│  • [Média] Aumento de custos - 5 dias atrás   │
│                                               │
│  🟡 CLIENTES (1 pendente)                     │
│  • [Alta] Clientes inativos - 2 dias atrás    │
│                                               │
│  ⚪ OPERAÇÃO (0 pendentes)                     │
│  Nenhuma decisão pendente                     │
│                                               │
│  ⚪ EQUIPE (0 pendentes)                       │
│  Nenhuma decisão pendente                     │
└─────────────────────────────────────────────┘
```

### 3.3 Estado tomada

Decisões já tomadas, com resultado.

Regras:
- Decisão nunca é deletada — vai para histórico
- Cada decisão tomada inclui: decisão original + o que foi feito + resultado (se disponível)
- Ordenadas por data (mais recente primeiro)
- Filtráveis por área e período

Layout do card de decisão tomada:

```
┌─────────────────────────────────────────────┐
│  [Área] · [Data da decisão] · [Status]      │
│                                               │
│  DECISÃO:                                     │
│  (hipótese original, 1 linha)                 │
│                                               │
│  AÇÃO TOMADA:                                 │
│  (o que foi feito, 1-2 linhas)               │
│                                               │
│  RESULTADO:                                   │
│  (se disponível, 1-2 linhas + métrica)       │
│                                               │
│  [Ver histórico completo]                     │
└─────────────────────────────────────────────┘
```

Status da decisão:
| Status | Cor | Significado |
|---|---|---|
| Bem-sucedida | Verde | Resultado positivo |
| Parcial | Amarelo | Resultado misto |
| Malsucedida | Vermelho | Resultado negativo |
| Sem resultado | Cinza | Aguardando dados |

### 3.4 Estado arquivada

Decisões que não são mais relevantes.

Regras:
- Arquivamento é manual (empresário decide arquivar) OU automático (decisão com mais de 90 dias sem interação)
- Decisões arquivadas ficam disponíveis para consulta
- Aparecem apenas em "Histórico completo" ou busca

---

## 4. Regras do Centro de Decisão

### 4.1 Regra de destaque único

Apenas UMA decisão aparece em destaque por vez.

Critério para escolha da decisão em destaque:
1. Prioridade (urgência): quanto menos tempo para decidir, maior a prioridade
2. Impacto: quanto maior o impacto potencial, maior a prioridade
3. Novidade: decisões recentes (até 24h) têm prioridade extra
4. Área: alternar entre áreas para evitar viés (não mostrar só financeiro)

Cálculo de prioridade:
```
Prioridade = (Urgência × 0.4) + (Impacto × 0.3) + (Novidade × 0.2) + (Alternância × 0.1)
```

Onde:
- Urgência: 1 (pode esperar 30+ dias) a 10 (precisa decidir hoje)
- Impacto: 1 (impacto mínimo) a 10 (impacto crítico no negócio)
- Novidade: 1 (mais de 7 dias) a 10 (menos de 24h)
- Alternância: 1 (mesma área da última decisão) a 10 (área diferente)

### 4.2 Regra de agrupamento por área

Áreas definidas:

| Área | Cor | Ícone | Exemplos de decisão |
|---|---|---|---|
| Financeiro | Verde | R$ | Fluxo de caixa, faturamento, custos, margem |
| Clientes | Azul | 👥 | Retenção, aquisição, satisfação, planos |
| Operação | Laranja | ⚙️ | Processos, prazos, qualidade, fornecedores |
| Equipe | Roxo | 👤 | Desempenho, contratação, turnover, treinamento |

Se uma decisão envolve múltiplas áreas:
- Área principal: a de maior impacto
- Áreas secundárias: exibidas como tags no card
- Exemplo: "💰 (principal) · 👥 (secundária)"

### 4.3 Regra de ciclo de vida da decisão

```
Dado disponível → IA detecta padrão → Hipótese gerada
→ Confiança calculada → Centro de Decisão atualizado
→ Empresário visualiza → Empresário decide
→ Ação tomada → Resultado monitorado
→ Decisão arquivada ou reaberta
```

Cada etapa tem timestamp registrado.

### 4.4 Regra de não-deleção

Nenhuma decisão é deletada do sistema.

- Decisões tomadas: → histórico (estado "tomada")
- Decisões irrelevantes: → arquivadas (estado "arquivada")
- Decisões erradas: → histórico com status "malsucedida" (nunca apagadas)

Isso garante:
- Rastreabilidade: toda recomendação pode ser auditada
- Aprendizado: decisões passadas informam decisões futuras
- Confiança: o empresário sabe que o Assistente não "esconde" erros

### 4.5 Regra de evidência mínima

Uma hipótese só é apresentada no Centro de Decisão se:

1. Pelo menos 2 evidências a sustentam (nunca decisão com 1 evidência)
2. Confiança >= 30% (abaixo disso, aguardar mais dados)
3. Impacto potencial > 0 (se zero, não é prioritário)
4. A hipótese é falseável (pode ser provada errada — se não, não é científica)

Se não atende aos critérios:
- Hipótese permanece em processamento interno
- Assistente não apresenta ao empresário
- Registro interno: "Hipótese [X] — rejeitada por evidência insuficiente"

---

## 5. Comportamento do Assistente no Centro de Decisão

### 5.1 Apresentação de nova decisão

Quando uma nova decisão é adicionada ao centro:

1. Notificação sutil no avatar (badge com número de novas decisões)
2. Se empresário está na tela de decisão: card aparece com animação (slide up, 300ms)
3. Se empresário está em outra tela: badge acumula, não interrompe
4. Ao entrar na tela de decisão: "Você tem [N] novas decisões para revisar"

### 5.2 Exploração de alternativas

Quando empresário clica "Explorar alternativas":

1. Assistente apresenta 2-3 variações da recomendação
2. Cada variação: hipótese diferente + confiança + prós/contas
3. Empresário pode comparar lado a lado
4. Ao escolher: "Seguir [alternativa X]" ou "Voltar à recomendação original"

### 5.3 Pergunta do empresário sobre decisão

Empresário pode perguntar sobre qualquer decisão visível:

Exemplos de perguntas:
- "Por que você acredita nisso?" → IA mostra evidências detalhadas
- "O que acontece se eu não fizer nada?" → IA explica riscos da inação
- "Tem outra forma de ver isso?" → IA oferece perspectivas alternativas
- "O que você faria no meu lugar?" → IA reforça recomendação (se confiança alta) ou explica por que não tem certeza

### 5.4 Decisão adiada

Se empresário não toma decisão:

- 1 dia sem ação: notificação sutil (badge)
- 3 dias sem ação: "Lembrete: você tem [N] decisões pendentes" (notificação)
- 7 dias sem ação: "Decisão [X] está próxima do prazo limite" (destaque no centro)
- Prazo expirado: decisão marcada como "perdida" (ação não tomada = decisão por omissão)

---

## 6. Contratos do Centro de Decisão (Resumo)

1. Toda decisão tem 7 partes obrigatórias: Contexto, Hipótese, Confiança, Evidências, Riscos, Recomendação, Ação.
2. Apenas 1 decisão em destaque por vez (a mais urgente/impactante).
3. Decisões são agrupadas por área: financeiro, clientes, operação, equipe.
4. Nenhuma decisão é deletada — vai para histórico ou arquivo.
5. Hipótese só é apresentada com >= 2 evidências e confiança >= 30%.
6. Confiança nunca é 0% ou 100% — sempre há incerteza explícita.
7. Toda evidência tem fonte. Toda recomendação tem justificativa.
8. Empresário pode explorar alternativas, perguntar sobre decisões e adiar escolhas.
9. Decisão adiada por 7+ dias gera alerta. Prazo expirado = decisão por omissão.
10. O Centro de Decisão é o coração cognitivo — toda interação importante passa por ele.
