# SISTEMA OFICIAL DO CONHECIMENTO VISÍVEL

**Responsável:** Arquiteto de Superfície Cognitiva
**Versão:** 1.0
**Fase:** V4 Founder
**Classificação:** Estratégia de implementação obrigatória

---

## Propósito

Este documento define como a Ponte Digital torna visível o conhecimento que a IA constrói sobre o negócio do empresário. Hipóteses, confiança, aprendizados, lacunas e evolução não são conceitos abstratos — são elementos visuais que o empresário vê, entende e com os quais interage.

O conhecimento não é uma caixa-preta. É um ecossistema visível, navegável e compreensível.

---

## Princípio fundamental

> O empresário não precisa entender como a IA funciona. Ele precisa entender **o que a IA sabe**, **como sabe**, e **o que ainda não sabe**.

Todo conhecimento gerado pela IA deve ser apresentado em linguagem natural, com indicadores visuais claros, e com caminho de ação para o empresário. O conhecimento invisível não existe.

---

## COMO MOSTRAR HIPÓTESES

### Definição

Hipótese é uma conclusão que a IA construiu a partir dos dados — uma afirmação sobre o negócio que pode ser verdadeira ou falsa. Não é um fato absoluto. É a melhor interpretação da IA com as evidências disponíveis.

### Vocabulário proibido

| Termo técnico | Substituto |
|---------------|------------|
| "Hipótese" | — (não usar. Mostrar, não nomear) |
| "Inferência" | "O que os dados sugerem" |
| "Correlação" | "Relação entre" |
| "Probabilidade" | "Chance de" |
| "Algoritmo" | "Análise" |
| "Modelo" | "Entendimento do seu negócio" |
| "Treinamento" | "Aprendizado" |
| "Predição" | "Tendência" |

### Card de hipótese — estrutura visual

```
┌────────────────────────────────────────────────┐
│ 💡                                              │
│ **Seu faturamento está concentrado em 3 clientes**│
│                                                 │
│ ● Cliente A representa 40% da receita           │
│ ● Cliente B representa 25% da receita           │
│ ● Perder qualquer um impacta significativamente │
│                                                 │
│ ┌──────────┐  ┌────────────────────────────────┐│
│ │ ● Alta   │  │ [📊 Explorar]   [💬 Discutir] ││
│ │ confiança│  │                                ││
│ └──────────┘  └────────────────────────────────┘│
└────────────────────────────────────────────────┘
```

### Elementos do card de hipótese

1. **Ícone 💡** — Identifica visualmente como "percepção da IA", não como "fato objetivo"
2. **Título em linguagem natural** — Frase completa, sem jargão
3. **Evidências (bullets)** — Dados concretos que sustentam a hipótese (mínimo 2, máximo 5)
4. **Badge de confiança** — Indicador visual de quão certa a IA está (ver seção abaixo)
5. **Botão "Explorar"** — Leva a uma visualização detalhada dos dados
6. **Botão "Discutir"** — Leva a uma conversa com a IA sobre o tema (nunca "Conversar sobre")

### Regras de hipóteses

1. **Uma hipótese por card.** Agrupar hipóteses relacionadas quebra a clareza.
2. **Título é uma frase completa, não um rótulo.** "Seu faturamento está concentrado em 3 clientes" e não "Concentração de receita".
3. **Evidências são dados, não opiniões.** Bullets devem conter números, períodos, comparações.
4. **Botão "Explorar" é sempre presente.** Hipótese sem ação é informação inútil.
5. **Hipóteses conflitantes são mostradas lado a lado.** "Há evidências de que [X], mas também de que [Y]". A IA mostra que está considerando múltiplas possibilidades.
6. **Hipóteses confirmadas viram "aprendizado".** Quando evidências suficientes se acumulam, a hipótese é promovida para aprendizado confirmado.

### Estados da hipótese

```
NOVA ─→ EM ANÁLISE ─→ CONFIRMADA (vira aprendizado)
 │                     │
 │                     └→ REFUTADA (arquivada, visível para referência)
 │
 └→ EM OBSERVAÇÃO (precisa de mais dados)
```

Cada estado tem visual diferente:

| Estado | Borda | Badge | Ação |
|--------|-------|-------|------|
| Nova | Azul claro | "Nova" | Explorar |
| Em análise | Âmbar | "Analisando" | Explorar + Contribuir |
| Confirmada | Verde | "Identificado" | Explorar + Aprender |
| Refutada | Cinza tracejada | "Arquivado" | Ver histórico |
| Em observação | Azul pontilhada | "Observando" | Acompanhar |

---

## COMO MOSTRAR CONFIANÇA

### Definição

Confiança é o grau de certeza que a IA tem em uma hipótese ou informação. Não é uma nota técnica — é um sinal visual que ajuda o empresário a decidir quanto peso dar à informação.

### Componentes visuais da confiança

#### 1. Anel circular

```
       ┌─────────┐
    ┌──┤  85%    ├──┐
    │  └─────────┘  │     ← Anel circular com preenchimento
    │               │       Colorido (verde/âmbar/vermelho)
    │     ╭─────╮  │       + percentual no centro
    │     │ Alta│  │
    │     ╰─────╯  │
    └───────────────┘
```

**Cores do anel:**
- **Verde (#22c55e):** ≥ 70% — "Alta confiança"
- **Âmbar (#f59e0b):** 40–69% — "Confiança média"
- **Vermelho (#ef4444):** < 40% — "Ainda investigando"

**Variação do anel:**
- Sempre exibido como círculo, nunca como barra
- Diâmetro: 48px (padrão), 64px (destaque em card principal)
- Stroke-width: 4px
- Animação: preenchimento animado de 0 ao valor final (500ms, ease-out)

#### 2. Texto de confiança

Abaixo ou ao lado do anel, o texto correspondente:

| Faixa | Texto | Tooltip |
|-------|-------|---------|
| ≥ 90% | "Confiança alta" | "A IA tem alta confiança nesta informação, baseada em dados consistentes" |
| 70–89% | "Confiança boa" | "A IA tem boa confiança, mas novos dados podem refinar" |
| 40–69% | "Confiança média" | "A IA está analisando. Mais dados podem aumentar a precisão" |
| 20–39% | "Ainda investigando" | "A IA ainda está coletando dados para ter mais certeza" |
| < 20% | "Primeiras impressões" | "A IA acabou de começar a analisar. Pode mudar com mais dados" |

#### 3. Tooltip de confiança

Ao passar o mouse sobre o anel, tooltip aparece:

> "A IA tem [X]% de confiança nesta informação, baseada em [número] fontes de dados. Quanto mais dados, maior a confiança."

Tooltip não mostra explicação técnica (tamanho da amostra, desvio padrão, etc.). Mostra apenas o que o empresário precisa saber para confiar (ou não) na informação.

### Regras de exibição de confiança

1. **Confiança é exibida com qualquer informação gerada pela IA.** Toda informação não-factual vinda da IA carrega indicador de confiança. Informações factuais (faturamento do mês, número de clientes) não precisam — são dados, não inferências.

2. **Número exato dentro do anel é opcional.** Pode ser mostrado ou oculto dependendo do contexto. Card pequeno: sem número, apenas cor + texto. Card grande: com número.

3. **Confiança varia naturalmente.** Não é sempre 90%. Variação natural mostra que a IA está realmente avaliando.

4. **Confiança pode aumentar ou diminuir com novos dados.** Se IA fica mais confiante, anel muda de cor gradualmente. Se perde confiança, também.

5. **Nunca mostrar confiança 100%.** IA nunca tem 100% de certeza (seria mentira). Sempre deixar margem.

6. **Nunca mostrar confiança 0%.** Se a IA não tem nenhuma confiança, não exibe a informação.

### O que NÃO fazer

- **Número exato sem contexto (0–10).** "Confiança: 7" não significa nada para o empresário.
- **Explicação técnica no tooltip.** "Confiança baseada em 3 amostras com p=0.05" — zero valor.
- **Anel sem texto associado.** Apenas o círculo colorido não comunica o significado.
- **Confiança decorativa (sempre igual).** Se o indicador não varia, ele perde o sentido.
- **Cor do anel conflitando com semântica.** Não usar verde para "ainda investigando" ou vermelho para "alta confiança".

---

## COMO MOSTRAR APRENDIZADOS

### Definição

Aprendizado é uma hipótese que foi confirmada com evidências suficientes. A IA *aprendeu* algo sobre o negócio e isso vira parte do conhecimento permanente daquela empresa.

### Timeline de aprendizado

```
AO LONGO DO TEMPO, APRENDEMOS:

┌─────────────────────────────────────────────────────────────┐
│  📅 12/02 - Seu faturamento está concentrado em 3 clientes  │
│    ↑ Confirmado com 8 meses de dados consistentes          │
│                                                             │
│  📅 05/01 - Seu ticket médio cresce em dezembro             │
│    ↑ Sazonalidade confirmada após 3 anos de dados           │
│                                                             │
│  📅 18/11 - Clientes que pedem suporte têm maior retenção   │
│    ↑ Descoberta inesperada: correlação de 92%               │
│                                                             │
│  📅 02/10 - Segunda-feira tem menor volume de vendas        │
│    ↑ Padrão semanal identificado                            │
└─────────────────────────────────────────────────────────────┘
```

### Card de aprendizado

```
┌─────────────────────────────────────────────────────────┐
│ 📚 **Aprendizado confirmado**                           │
│                                                         │
│ Seu ticket médio cresce em dezembro                     │
│                                                         │
│ 📅 Confirmado em 05/01/2026                             │
│ 📊 Base: 3 anos de dados fiscais                        │
│                                                         │
│ Antes eu achava que: as vendas são consistentes         │
│                    o ano todo.                          │
│ Agora sei que:     dezembro tem ticket médio 23%       │
│                    maior que a média.                   │
│                                                         │
│ [📊 Explorar dados] [💬 Discutir implicação]           │
└─────────────────────────────────────────────────────────┘
```

### Elementos do aprendizado

1. **Ícone 📚** — Identifica como conhecimento consolidado
2. **Data de confirmação** — Quando a IA confirmou o aprendizado
3. **Base de evidências** — Volume de dados que suporta o aprendizado
4. **"Antes eu achava que... Agora sei que..."** — Narrativa de evolução do conhecimento (formato obrigatório para todo aprendizado)
5. **Ações** — Explorar (ver dados) + Discutir (conversar sobre implicações)

### Regras de aprendizado

1. **Aprendizado é permanente (a menos que refutado).** Uma vez confirmado, fica no histórico. Não desaparece.
2. **Aprendizado pode ser refutado.** Se novos dados contradizem, aprendizado vira "anteriormente aprendido" e novo aprendizado é registrado.
3. **Narrativa "Antes... Agora..." é obrigatória.** Ela mostra evolução do conhecimento da IA — que é um processo, não um fato estático.
4. **Máximo 5 aprendizados por visualização.** Se há mais, mostrar "Ver todos" que leva ao histórico completo.
5. **Aprendizado do dia.** Destacar o aprendizado mais recente ou relevante com badge "Novo" por 7 dias.
6. **Aprendizado relacionado a hipótese ativa.** Se um novo insight se conecta a um aprendizado anterior, mostrar link: "Isso se conecta com o que aprendemos em [data]."

### O que NÃO fazer

- **Jargão de machine learning.** "Modelo convergiu", "Feature importance", "Overfitting" → zero sentido para empresário.
- **Datas sem contexto.** "12/02" sem ano ou sem o que aconteceu.
- **Múltiplos aprendizados sem hierarquia.** Se todos têm o mesmo peso visual, nenhum se destaca.
- **Aprendizado sem "Antes... Agora...".** Sem essa narrativa, parece um fato solto, não um aprendizado.

---

## COMO MOSTRAR LACUNAS

### Definição

Lacuna é o que a IA ainda não sabe sobre o negócio. Não é falha — é oportunidade de aprendizado. Mostrar lacunas com transparência gera confiança (a IA não finge saber tudo) e engaja o empresário a contribuir com dados.

### Vocabulário proibido

| Termo técnico | Substituto |
|---------------|------------|
| "Dados insuficientes" | "Ainda não sei sobre" |
| "Falta de informação" | "Posso saber mais sobre" |
| "Baixa amostragem" | "Com mais dados, posso ser mais preciso" |
| "Dados incompletos" | "Ainda estou conhecendo seu negócio" |
| "Erro de medição" | "Quanto mais você usar, melhor entendo" |

### Card de lacuna

```
┌─────────────────────────────────────────────────────────┐
│ 🔍 **Ainda não sei sobre:**                              │
│                                                         │
│ Como a sazonalidade afeta seu negócio                    │
│                                                         │
│ Sei que: você tem variação mensal                        │
│ Não sei ainda: qual o padrão dessa variação             │
│                                                         │
│ Para eu entender melhor: preciso de 12 meses de dados   │
│                          completos (atualmente: 4 meses) │
│                                                         │
│ [📊 O que já sei]        [➕ Fornecer mais dados]       │
└─────────────────────────────────────────────────────────┘
```

### Elementos de lacuna

1. **Ícone 🔍** — Identifica como "descoberta pendente"
2. **O que a IA não sabe** — Em linguagem natural ("Como a sazonalidade afeta seu negócio")
3. **O que a IA já sabe sobre o tema** — Para não parecer que sabe zero
4. **O que falta** — Específico e acionável ("preciso de 12 meses de dados")
5. **Ações** — "O que já sei" (ver conhecimento parcial) + "Fornecer mais dados" (upload/conexão de dados)

### Mapa cognitivo com lacunas

```
CONHECIMENTO DO SEU NEGÓCIO:

┌────────────────────────────────────────────────────┐
│  🟢 Faturamento          🟡 Clientes             │
│  ━━━━━━━━━━━━━━━━ 85%    ━━━━━━━━━━━━ 60%         │
│  │                          │                       │
│  🟡 Custos               🔴 Sazonalidade          │
│  ━━━━━━━━ 45%             ━━━━ 20%                 │
│                              │                       │
│                            🔍 Preciso de 12 meses  │
│                              de dados completos     │
│                                                    │
│  ⚪ Tendências de mercado  ⚪ Concorrência         │
│  ━━ 10%                    ━━ 5%                   │
│                                                    │
│  [➕ Conectar nova fonte de dados]                  │
└────────────────────────────────────────────────────┘
```

**Legenda visual:**

| Símbolo | Significado |
|---------|-------------|
| 🟢 + barra cheia | Conhecimento alto (> 70%) |
| 🟡 + barra média | Conhecimento médio (40–70%) |
| 🔴 + barra baixa | Conhecimento baixo (< 40%) |
| 🔍 + destaque | Lacuna com ação possível |
| ⚪ + barra mínima | Área não explorada |

### Regras de lacunas

1. **Lacunas são mostradas proativamente.** Não esperar o empresário perguntar "você sabe sobre X?" para mostrar que não sabe.
2. **Lacuna sempre vem com ação.** "Ainda não sei sobre X" sem "aqui está o que você pode fazer" gera frustração.
3. **Lacuna não é erro.** Tom nunca é de desculpa. É de oportunidade: "Posso saber mais sobre isso."
4. **Hierarquia de lacunas.** Lacunas críticas (impacto no negócio) aparecem primeiro. Lacunas secundárias são colapsáveis.
5. **Lacunas preenchidas viram aprendizados.** Quando a lacuna é fechada, mostrar celebração sutil: "Agora sei! 🎉 Com os novos dados, entendi que..."
6. **Não mostrar lacunas demais.** Máximo 3 lacunas por visualização. Mais que isso parece que a IA não sabe nada.

### O que NÃO fazer

- **Lista enorme de "não sei".** Parece que a IA é inútil. Selecionar as lacunas mais relevantes.
- **Lacuna sem barra de progresso.** Empresário precisa saber o quanto falta.
- **Lacuna genérica.** "Não sei sobre seu negócio" — vago demais. Específico: "Não sei como as promoções afetam suas vendas."
- **Lacuna que o empresário não pode preencher.** Se depende de dados que o empresário não tem acesso, não mostrar como "ação".

---

## COMO MOSTRAR EVOLUÇÃO

### Definição

Evolução mostra como o conhecimento da IA mudou desde a última visita do empresário. O que melhorou, o que piorou, o que permaneceu igual. É o equivalente visual de "o que mudou desde a última vez".

### Vocabulário

| Termo técnico | Substituto |
|---------------|------------|
| "Precisão do modelo" | "O que melhorou" |
| "Acurácia" | "Mais certeza sobre" |
| "Regressão" | "Ainda investigando mais sobre" |
| "Nova feature" | "Passei a entender" |
| "Data drift" | "Mudança no padrão" |

### Timeline de evolução

```
COMPARADO COM SUA ÚLTIMA VISITA:

📈 O que melhorou:

┌──────────────────────────────────────────────────────────┐
│ 🟢 Sazonalidade — agora sei como dezembro afeta suas     │
│    vendas (antes: 25% de confiança, agora: 78%)          │
│                                                          │
│ 🟢 Ticket médio — identifiquei o padrão de crescimento   │
│    (antes: análise superficial, agora: 12 meses de dados)│
└──────────────────────────────────────────────────────────┘

📉 Ainda investigando:

┌──────────────────────────────────────────────────────────┐
│ 🟡 Custos operacionais — variação mensal identificada   │
│    mas ainda sem padrão claro (confiança: 45%)           │
└──────────────────────────────────────────────────────────┘

➡️ Permanece:

┌──────────────────────────────────────────────────────────┐
│ ⚪ Concentração de clientes — continua sendo 3 clientes │
│    representam 70% da receita (sem mudança)             │
└──────────────────────────────────────────────────────────┘
```

### Cards de evolução

#### Card de melhoria

```
┌──────────────────────────────────────────────────────┐
│ 🟢 **Sazonalidade**                                   │
│                                                       │
│ Antes:  25% de confiança  (sua última visita)         │
│ Agora:  78% de confiança  (+53% desde então)          │
│                                                       │
│ O que mudou: novos meses de dados permitiram          │
│              identificar o padrão de dezembro          │
│                                                       │
│ [📊 Ver timeline completa]                            │
└──────────────────────────────────────────────────────┘
```

#### Card de piora (ou "ainda investigando")

```
┌──────────────────────────────────────────────────────┐
│ 🟡 **Custos operacionais**                            │
│                                                       │
│ Antes: 55% de confiança (sua última visita)           │
│ Agora: 45% de confiança                              │
│                                                       │
│ Por que: dados recentes mostraram variações que       │
│          não se encaixam no padrão anterior           │
│                                                       │
│ [📊 Quero entender melhor]                            │
└──────────────────────────────────────────────────────┘
```

#### Card de estabilidade

```
┌──────────────────────────────────────────────────────┐
│ ⚪ **Concentração de clientes**                        │
│                                                       │
│ Desde sua última visita: sem mudanças significativas  │
│                                                       │
│ Confiança se mantém em 85% — 3 clientes representam  │
│ 70% da receita                                        │
│                                                       │
│ [📊 Ver detalhes]                                     │
└──────────────────────────────────────────────────────┘
```

### Timeline visual simples

```
EVOLUÇÃO DO CONHECIMENTO:

Sazonalidade     ████████████████░░░░░░░░░░░  55%
                 ████████████████████████░░░  78%  ↑

Custos           ██████████████████████░░░░░  55%
                 ██████████████████░░░░░░░░░  45%  ↓

Clientes         ███████████████████████████  85%
                 ███████████████████████████  85%  →

Ticket médio     ██████████████░░░░░░░░░░░░  42%
                 ██████████████████████░░░░░  68%  ↑
```

**Regras da timeline visual:**
1. **Linha de cima = visita anterior, linha de baixo = agora.** Empresário vê a diferença.
2. **Usar seta:** ↑ (melhorou), ↓ (piorou), → (estável), ✦ (novo).
3. **No máximo 5 itens na timeline.** Mais que isso é informação demais.
4. **Itens com ↑ são destacados (verde).** O cérebro busca o que melhorou.
5. **Itens com ↓ são destacados em âmbar.** Não vermelho — não é erro, é aprendizado em andamento.

### Regras de evolução

1. **Evolução é mostrada no primeiro acesso do dia.** "Desde sua última visita, aqui está o que mudou."
2. **Evolução não é apenas positiva.** Se algo piorou ou a IA perdeu confiança, mostrar. Transparência gera confiança.
3. **Evolução sempre compara com referência.** "Última visita" é a referência padrão. "Últimos 30 dias" é alternativa.
4. **Evolução é acionável.** Cada item tem ação: explorar, discutir, entender.
5. **Evolução de itens não visitados.** Se empresário nunca viu um tópico, "Novo ✦" em vez de comparação.
6. **Sem evolução negativa destacada.** Piora não é punição — é oportunidade de aprendizado. Tom neutro.

### O que NÃO fazer

- **Gráfico de linha complexo com múltiplas variáveis.** Empresário de PME não lê gráficos financeiros complexos na plataforma. Quer saber o que mudou em linguagem natural.
- **Apenas números.** "Confiança: 45% → 78%" sem explicação do que mudou.
- **Comparação sem contexto.** "↑ 33%" — 33% do quê? Em quanto tempo?
- **Evolução de tudo simultaneamente.** Mostrar apenas o que mudou significativamente desde a última visita.
- **Linguagem técnica de evolução de modelo.** "Loss function", "Convergence", "Epoch" — zero valor.

---

## REGRAS GERAIS DO CONHECIMENTO VISÍVEL

### Regra 1 — Hierarquia de exibição

```
TELA PRINCIPAL:
┌────────────────────────────────────────────────┐
│ 📚 Principais aprendizados (máx 3)            │ ← O mais importante
├────────────────────────────────────────────────┤
│ 💡 Hipóteses em análise (máx 3)               │ ← O que está sendo descoberto
├────────────────────────────────────────────────┤
│ 🔍 Lacunas que você pode preencher (máx 2)    │ ← O que falta
├────────────────────────────────────────────────┤
│ 📈 Evolução desde sua última visita            │ ← O que mudou
└────────────────────────────────────────────────┘
```

Se a tela for pequena ou o empresário estiver em foco, colapsar seções menos relevantes.

### Regra 2 — Linguagem natural em tudo

| Conceito | Como falar |
|----------|------------|
| Hipótese | "Identificamos que..." |
| Confiança | "Com boa certeza..." / "Ainda investigando..." |
| Aprendizado | "Aprendemos que..." |
| Lacuna | "Ainda não sei sobre..." |
| Evolução | "Desde sua última visita..." |
| Dados insuficientes | "Com mais dados, posso ser mais preciso..." |
| Descoberta inesperada | "Isso me chamou a atenção..." |

### Regra 3 — Progresso visível do conhecimento

O conhecimento da IA sobre o negócio nunca é "completo" — está sempre evoluindo. Mostrar isso visualmente.

```
CONHECIMENTO DO SEU NEGÓCIO:  [████████░░░░]  62%

● Finanças:       ████████████░░░░  82% ●
● Clientes:       ██████████░░░░░░  68%
● Operações:      ██████░░░░░░░░░░  45% ● ← lacuna ativa
● Mercado:        █████░░░░░░░░░░░  32% ● ← lacuna ativa
● Concorrência:   ██░░░░░░░░░░░░░░  12%

[➕ Conectar nova fonte de dados]
```

### Regra 4 — Sempre acionável

Todo elemento de conhecimento visível tem uma ação associada:

| Elemento | Ação primária | Ação secundária |
|----------|--------------|-----------------|
| Hipótese | Explorar dados | Discutir com IA |
| Confiança | (informativo) | Tooltip explicação |
| Aprendizado | Ver histórico | Discutir implicação |
| Lacuna | Fornecer dados | O que já sei |
| Evolução | Ver timeline completa | Explorar item |

### Regra 5 — Não sobrecarregar

O conhecimento visível é progressivo. O empresário não vê tudo de uma vez.

**Primeiro acesso:** Apenas aprendizados principais + indicador geral de conhecimento.
**Segundo acesso +:** Hipóteses + evolução.
**Uso frequente:** Lacunas + sugestões de novas fontes de dados.

---

## ANTIPADRÕES DO CONHECIMENTO VISÍVEL

1. **Caixa-preta.** IA mostra conclusão sem mostrar como chegou lá. Empresário não confia no que não entende.
2. **Excesso de confiança.** IA sempre 90%+ de confiança. Parece fake. Empresário desconfia.
3. **Lacunas escondidas.** IA finge que sabe tudo. Quando empresário descobre que não sabe, confiança quebra.
4. **Jargão técnico.** "Correlação de Pearson de 0.87". Empresário não sabe o que é correlação de Pearson.
5. **Conhecimento estático.** Mesmo conteúdo sempre. Não mostra evolução. Parece que a IA não aprende.
6. **Hipóteses sem evidência.** IA diz "seu negócio está concentrado" mas não mostra os números. Parece chute.
7. **Card sem ação.** Empresário vê informação mas não pode fazer nada com ela. Frustrante.

---

## TESTE DO CONHECIMENTO VISÍVEL

Para cada elemento de conhecimento gerado pela IA, responder:

1. O empresário entende o que a IA quer dizer? (linguagem natural?)
2. O empresário sabe o quanto confiar? (indicador de confiança?)
3. O empresário vê as evidências? (dados que sustentam?)
4. O empresário pode agir? (tem um botão, um link?)
5. O empresário entende o que falta? (lacunas visíveis?)

**Se qualquer resposta for "não", o conhecimento não está visível o suficiente.**

---

## GLOSSÁRIO VISUAL — SÍNTESE

| Conceito | Ícone | Cor | Elemento principal |
|----------|-------|-----|--------------------|
| Hipótese | 💡 | Azul | Card com evidências |
| Confiança alta | — | Verde #22c55e | Anel circular + badge |
| Confiança média | — | Âmbar #f59e0b | Anel circular + badge |
| Confiança baixa | — | Vermelho #ef4444 | Anel circular + badge |
| Aprendizado | 📚 | Verde | Card com narrativa "Antes... Agora..." |
| Lacuna | 🔍 | Azul claro | Card com ação de preenchimento |
| Melhoria | 🟢 | Verde | Card de evolução positiva |
| Estabilidade | ⚪ | Cinza | Card de evolução neutra |
| Investigação | 🟡 | Âmbar | Card de evolução pendente |

---

## Documentos relacionados

- `SISTEMA_OFICIAL_DE_PERFORMANCE_PERCEBIDA.md` — Como o conhecimento aparece durante e após esperas
- `SISTEMA_OFICIAL_DA_ATENCAO.md` — Para onde o empresário olha quando vê o conhecimento
- `SISTEMA_OFICIAL_DA_CONTINUIDADE.md` — Como o conhecimento evolui sem quebrar o fluxo
