# Modelo de Perguntas Inteligentes

> **Programa 12 — Fase 3: Motor Cognitivo**
> Versão: 1.0
> Propósito: Definir quando, como e por que o Motor pergunta ao empresário

---

## Preâmbulo

Perguntar é a ferramenta mais poderosa de aquisição cognitiva. Uma pergunta bem formulada pode revelar anos de conhecimento empresarial em segundos. Uma pergunta mal formulada desperdiça o tempo do empresário e reduz sua confiança na plataforma.

Este documento especifica o modelo de perguntas do Motor Cognitivo: quando perguntar, quando silenciar, como medir o valor de cada pergunta, e como maximizar o conhecimento adquirido com o mínimo de interrupções.

Toda pergunta é uma intervenção (ver MODELO_DE_INTERVENCAO.md). O custo de perguntar é a atenção do empresário — recurso escasso e valioso.

---

## Seção 1 — Quando perguntar

### 1.1 O Princípio do Valor Líquido

O Motor só pergunta quando o valor esperado da resposta supera o custo da interrupção:

```
ValorLiquido = ValorEsperado - CustoInterrupcao
```

Onde:
- **ValorEsperado:** quanto o conhecimento adquirido melhorará as decisões futuras (0-10)
- **CustoInterrupcao:** quanto custa interromper o empresário no momento atual (0-10)

Uma pergunta só é feita se ValorLiquido > 0.

### 1.2 Gatilhos para Perguntar

O Motor pergunta quando:

**G1 — Lacuna crítica de conhecimento:**
Falta uma informação essencial para uma decisão importante. Ex.: "Qual o prazo médio de recebimento das suas vendas?"

**G2 — Hipótese inconclusiva:**
Duas hipóteses competem e uma pergunta pode desempatar. Ex.: "Você percebeu se a queda nas vendas está relacionada a preço ou a demanda?"

**G3 — Validação de inferência:**
O Motor inferiu um padrão mas precisa confirmar. Ex.: "Notei que suas vendas caem em janeiro. Isso é sazonalidade do seu negócio?"

**G4 — Regra de negócio:**
Informação estrutural que o Motor não pode inferir sozinho. Ex.: "Qual a margem de lucro média dos seus produtos?"

**G5 — Período de onboarding:**
Nos primeiros 7 dias, o Motor faz perguntas de cadastro para construir a base de conhecimento inicial.

### 1.3 Thresholds por Tipo de Pergunta

| Tipo | Threshold Mínimo de ValorLiquido | Exemplo |
|------|:-------------------------------:|---------|
| Cadastro (onboarding) | 3 | "Qual seu ramo de atividade?" |
| Validação de inferência | 5 | "Você confirma que...?" |
| Lacuna crítica | 7 | "Você tem controle de estoque?" |
| Desempate de hipótese | 6 | "Qual das duas opções...?" |
| Aprofundamento | 4 | "Poderia me contar mais sobre...?" |
| Curiosidade do Motor | 8 | (quase nunca — só se valor esperado muito alto) |

---

## Seção 2 — Quando NÃO perguntar

### 2.1 Regras de Bloqueio

**B1 — Saturação:** Máximo de 3 perguntas em 24 horas (exceto onboarding, que pode ter até 10 no primeiro dia).

**B2 — Momento inapropriado:** Não perguntar entre 22h e 7h, exceto se a pergunta for sobre urgência.

**B3 — Pergunta já respondida:** Se o empresário já forneceu a informação, não perguntar de novo (a menos que o contexto tenha mudado e o Motor precise revalidar).

**B4 — Sem contexto:** Se o Motor não tem contexto cognitivo mínimo sobre a empresa (menos de 5 objetos cognitivos registrados), perguntas complexas são bloqueadas — apenas perguntas de cadastro básico são permitidas.

**B5 — Irrelevância comprovada:** Se a resposta não afetará nenhuma decisão previsível nos próximos 30 dias, a pergunta não deve ser feita.

**B6 — Modo silêncio forçado:** Se o empresário ignorou as últimas 3 perguntas, o Motor entra em modo silêncio por 48 horas.

### 2.2 Temas Proibidos

O Motor nunca pergunta sobre:
- Dados pessoais não relacionados ao negócio
- Informações bancárias ou de acesso
- Senhas, tokens ou credenciais
- Informações de terceiros sem relação com a empresa

---

## Seção 3 — Como medir o valor de uma pergunta

### 3.1 Fórmula de Valor Esperado

```
ValorEsperado = (ImpactoPotencial × 0.4) + (ProbabilidadeRespostaUtil × 0.3) + (Exclusividade × 0.2) + (UrgenciaContexto × 0.1)
```

Onde:
- **ImpactoPotencial (0-10):** Qual o impacto de saber a resposta nas decisões futuras?
- **ProbabilidadeRespostaUtil (0-10):** Qual a chance de o empresário dar uma resposta que realmente adicione conhecimento?
- **Exclusividade (0-10):** Esta informação pode ser obtida de outra forma (importação, dados, ciclo noturno)? Se sim, perguntar é menos valioso.
- **UrgênciaDeContexto (0-10):** A informação é necessária agora ou pode esperar?

### 3.2 Fórmula de Custo de Interrupção

```
CustoInterrupcao = (Momento × 0.4) + (Frequencia × 0.3) + (Complexidade × 0.2) + (Historico × 0.1)
```

Onde:
- **Momento (0-10):** O empresário está em meio a uma tarefa? Acabou de chegar? Saiu?
- **Frequência (0-10):** Quantas perguntas já foram feitas nas últimas 24h (normalizado: 0 = nenhuma, 10 = já atingiu limite)?
- **Complexidade (0-10):** A pergunta exige consulta (abrir planilha, ligar para contador) ou pode ser respondida de cabeça?
- **Histórico (0-10):** O empresário respondeu perguntas similares antes? Se sim, o custo é menor.

### 3.3 Valor Líquido na Prática

| Cenário | Impacto | Prob. | Exclusiv. | Urgência | Valor | Momento | Freq. | Compl. | Hist. | Custo | Saldo |
|---------|:-------:|:-----:|:---------:|:--------:|:-----:|:-------:|:-----:|:------:|:-----:|:-----:|:-----:|
| "Confirmar se o cliente X pagou?" | 8 | 9 | 1 | 9 | 7.4 | 2 | 1 | 1 | 9 | 2.2 | **5.2** ✅ |
| "Qual a história da sua empresa?" | 3 | 5 | 8 | 1 | 3.9 | 5 | 0 | 5 | 0 | 3.3 | **0.6** |
| "Qual o nome do seu primeiro cliente?" | 1 | 3 | 2 | 1 | 1.6 | 5 | 3 | 3 | 0 | 3.6 | **-2.0** ❌ |
| "Sua margem de lucro média?" | 9 | 8 | 9 | 7 | 8.5 | 3 | 2 | 6 | 2 | 3.4 | **5.1** ✅ |

---

## Seção 4 — Como evitar perguntas desnecessárias

### 4.1 Estratégias de Redução

**E1 — Fontes alternativas:**
Antes de perguntar, verificar se a informação pode ser obtida de:
- Importação de documentos (NF, extrato, planilha)
- Dados já registrados no sistema
- Ciclo de observação noturno
- APIs públicas (CNPJ, dados setoriais)

**E2 — Inferência:**
Se o Motor pode inferir a informação com confiança ≥ 70 (baseado em 3+ evidências indiretas), não pergunta — confirma depois: "Notei que X. Estou certo?"

**E3 — Pergunta única no lugar de múltiplas:**
Em vez de 3 perguntas separadas, o Motor consolida:
- ❌ "Qual seu ramo?" + "Há quanto tempo existe?" + "Quantos funcionários?"
- ✅ "Me conte sobre sua empresa: ramo, tempo de mercado e funcionários."

**E4 — Momento certo:**
A pergunta é adiada se:
- O empresário está em uma tarefa complexa → esperar próximo login
- O empresário ignorou perguntas recentes → esperar 48h
- Ciclo noturno pode responder → esperar ciclo noturno

**E5 — Reutilização:**
Uma vez que o empresário respondeu, a resposta é reutilizada para múltiplas finalidades. Nunca perguntar a mesma coisa duas vezes (exceto revalidação após 1 ano).

### 4.2 Perguntas que Nunca São Feitas

- Perguntas cuja resposta o Motor já pode inferir com confiança ≥ 80
- Perguntas cujo impacto na decisão é marginal (ValorEsperado < 4)
- Perguntas que o empresário já respondeu explicitamente em interação anterior
- Perguntas que podem ser respondidas pelo ciclo noturno

---

## Seção 5 — Como maximizar conhecimento adquirido

### 5.1 Técnicas de Formulação

**T1 — Pergunta contextualizada:**
Em vez de "Qual sua margem?", o Motor diz:
"Estou analisando suas finanças e notei que suas despesas estão crescendo. Para eu poder recomendar melhor, você poderia me dizer qual a margem de lucro média dos seus produtos?"

**T2 — Pergunta com opções:**
Em vez de pergunta aberta, oferecer opções quando possível:
"Sua sazonalidade é: (a) verão, (b) inverno, (c) Natal, (d) não tenho sazonalidade"

**T3 — Pergunta com confirmação:**
"Notei que a maioria dos seus clientes paga em até 30 dias. Estou certo?"

**T4 — Pergunta em lote:**
No onboarding, agrupar perguntas relacionadas em um único bloco:
"Agora me conte sobre seu negócio: {ramo}, {tempo}, {funcionários}, {faturamento mensal}"

**T5 — Micro-perguntas:**
Na conversa guiada (FLUXO_DA_PRIMEIRA_CONVERSA.md), perguntas curtas e sequenciais que formam uma árvore de decisão.

### 5.2 Sequenciamento Inteligente

As perguntas não são feitas em ordem aleatória. O Motor segue uma árvore de decisão que maximiza o conhecimento adquirido por pergunta:

```
Nível 1: Informação demográfica (ramo, porte, tempo)
  │
  ▼ (se ramo = comércio)
Nível 2: Informação operacional (estoque, fornecedores, canais)
  │
  ▼ (se porte = pequeno)
Nível 3: Informação financeira (faturamento, margem, custos fixos)
  │
  ▼ (se margem > 30%)
Nível 4: Informação de crescimento (planos de expansão, contratação)
  │
  ▼
Próximo nível...
```

A árvore garante que perguntas de alto impacto são feitas primeiro e que perguntas irrelevantes para o perfil da empresa são puladas automaticamente.

### 5.3 Ciclo de Feedback da Pergunta

```
Pergunta → Resposta → ValorRealizado = ImpactoDaRespostaNasDecisoes
                            ↓
                    AjustarValorEsperado para perguntas similares no futuro
                            ↓
                    Se ValorRealizado consistentemente baixo → parar de fazer a pergunta
                    Se ValorRealizado consistentemente alto → manter prioridade
```

---

## Seção 6 — Modos Especiais de Pergunta

### 6.1 Modo Onboarding (dias 1-7)

Durante o onboarding:
- Limite: até 10 perguntas por dia no primeiro dia, 5 nos dias seguintes
- Apenas perguntas de cadastro e conhecimento básico
- Nenhuma pergunta que exija consulta externa (planilha, contador)
- Objetivo: construir o perfil mínimo da empresa (10+ objetos cognitivos)

### 6.2 Modo Investigação (hipótese inconclusiva)

Quando duas hipóteses competem:
- Máximo 3 perguntas por ciclo
- Perguntas focadas em desempatar (não em explorar)
- Se após 3 perguntas o empate persiste → registrar como "conflito não resolvido" e arquivar

### 6.3 Modo Revalidação (após 90 dias)

Para conhecimento que está sendo revalidado:
- A pergunta é sobre o conhecimento existente, não sobre novo
- "Há 3 meses você me disse que X. Isso ainda é verdade?"
- Máximo 2 perguntas de revalidação por ciclo

---

## Seção 7 — Descobertas, Pressupostos, Lacunas, Riscos

### Descobertas

1. O maior erro que o Motor pode cometer não é dar uma recomendação errada — é fazer uma pergunta irrelevante. Cada pergunta irrelevante reduz a confiança do empresário.
2. A maioria das perguntas necessárias pode ser respondida por inferência com confiança ≥ 60 — o Motor só precisa perguntar para validar.
3. O formato de pergunta com confirmação ("Notei que X. Estou certo?") tem 2x mais engajamento que pergunta aberta.

### Pressupostos

1. **P1:** 3 perguntas por dia é o limite máximo sem gerar irritação. Validar com dados reais de engajamento.
2. **P2:** Empresários preferem perguntas com opções a perguntas abertas. Baseado em princípios de UX, não em dados da plataforma.
3. **P3:** Onboarding com 10 perguntas no primeiro dia é aceitável. Pode ser excessivo para alguns perfis.

### Lacunas

1. **L1:** O sistema de árvore de decisão de perguntas não foi especificado como estrutura de dados — pode ser uma configuração JSON ou uma engine dedicada.
2. **L2:** A fórmula de ValorRealizado precisa de uma métrica objetiva — como medir o impacto de uma resposta nas decisões?
3. **L3:** Não foi especificado o que fazer quando o empresário dá uma resposta ambígua ou incompleta.

### Riscos

1. **R1 — Fadiga de perguntas:** Se o Motor faz muitas perguntas no início, o empresário pode abandonar. Mitigação: limite rígido de 10/dia no onboarding.
2. **R2 — Viés de confirmação nas perguntas:** O Motor pode formular perguntas que confirmam hipóteses existentes em vez de explorar alternativas. Mitigação: o estágio de Análise (Documento 1) busca ativamente evidências contrárias.
3. **R3 — Pergunta inadequada ao momento:** Perguntar sobre expansão quando a empresa está em crise. Mitigação: o contexto cognitivo (estado da empresa) modula o tipo de perguntas.

### Conflitos

Nenhum conflito com documentos anteriores. O FLUXO_DA_PRIMEIRA_CONVERSA.md (Fase 2) define a sequência de perguntas da primeira conversa — este documento complementa com o modelo de quando perguntar em geral.

### Impacto Futuro

1. O sistema de ValorLíquido permite que o Motor aprenda a perguntar melhor com o tempo (ajustando pesos conforme feedback).
2. A árvore de decisão pode ser expandida para novos domínios sem quebrar perguntas existentes.
3. O formato de pergunta com opções pode ser substituído por perguntas abertas quando o Motor tiver mais confiança no relacionamento com o empresário.
