# Protocolo da Decisão

## Ciclo oficial de tomada de decisão da Empresa Zero

---

## 1. Propósito

Toda decisão relevante produz aprendizado. O Protocolo da Decisão existe para garantir que nenhuma decisão — certa ou errada — seja perdida como experiência bruta não processada.

**Decisão não registrada = decisão que não aconteceu.**

---

## 2. Classificação de Decisões

| Nível | Impacto | Tempo de registro | Onde | RFC? |
|-------|---------|-------------------|------|------|
| **BAIXA** | Reversível em < 1 dia, afeta apenas sua própria rotina | 5 min | Diário, seção Decisões | Não |
| **MÉDIA** | Reversível em < 1 semana, afeta equipe ou 1 cliente | 15 min | Diário, protocolo completo | Não |
| **ALTA** | Reversível em > 1 semana ou irreversível, afeta arquitetura, produto ou múltiplos clientes | 30 min+ | Diário + RFC em `docs/04-DECISIONS/RFC/` | Sim |

### Exemplos de cada nível

| Nível | Exemplo |
|-------|---------|
| BAIXA | "Hoje vou trabalhar na feature X em vez da Y" |
| MÉDIA | "Vamos adiar a entrega do módulo X em 2 semanas para acomodar feedback do cliente Y" |
| ALTA | "Vamos migrar o banco de PostgreSQL para MySQL" ou "Vamos mudar o modelo de precificação" |

---

## 3. Ciclo Completo (7 Etapas)

Cada etapa tem: **template** → **o que preencher** → **dica**.

### ETAPA 1: CONTEXTO

**Template:**
```
CONTEXTO:
Situação atual:
O que está em jogo:
Quem é afetado:
Prazo / urgência:
```

**O que preencher:** Descreva a situação como ela é, não como você gostaria que fosse. Seja factual. Inclua o que motivou a necessidade de decidir agora.

**Dica:** Se você não consegue descrever o contexto em 3 frases, você não entendeu o problema ainda. Volte e pense mais.

---

### ETAPA 2: HIPÓTESE

**Template:**
```
HIPÓTESE:
Acreditamos que se escolhermos [alternativa],
então [resultado esperado].
Porque [razão].
```

**O que preencher:** Para cada alternativa principal, qual resultado você espera. Não é sobre qual é a certa — é sobre o que você acredita que vai acontecer.

**Dica:** Uma boa hipótese é testável. "Os clientes vão usar mais" não é testável. "A frequência de login semanal vai aumentar de 1x para 2x" é testável.

---

### ETAPA 3: EVIDÊNCIAS

**Template:**
```
EVIDÊNCIAS:
A favor de [alternativa]: [lista de dados/observações]
Contra [alternativa]: [lista de dados/observações]
Lacunas: [o que não sabemos]
Confiança nas evidências: [baixa/média/alta]
```

**O que preencher:** Apenas fatos e observações registradas. Opiniões não contam como evidência. Se a única evidência é "eu acho que", escreva explicitamente "Não há evidência, apenas intuição."

**Dica:** Evidência contrária é mais valiosa que evidência favorável. Se você só encontrou evidências a favor de uma alternativa, não procurou o suficiente.

---

### ETAPA 4: ALTERNATIVAS

**Template:**
```
ALTERNATIVAS:
1. [Alternativa A] — [risco] | [custo] | [benefício esperado]
2. [Alternativa B] — [risco] | [custo] | [benefício esperado]
3. ... (máximo 5)
```

**O que preencher:** Liste todas as opções consideradas, inclusive as descartadas. Mínimo 2 alternativas. Máximo 5 (se você tem mais de 5, está fragmentando demais).

**Dica:** Inclua sempre a alternativa "não fazer nada" ou "adiar a decisão" — ela revela o custo da inércia.

---

### ETAPA 5: ESCOLHA

**Template:**
```
ESCOLHA:
Alternativa escolhida: [A, B, C...]
Critério principal que determinou a escolha: [o que pesou mais]
Critérios secundários: [outros fatores]
Quem decidiu: [nome]
Nível de confiança na escolha: [0-100%]
```

**O que preencher:** Qual foi escolhida e, mais importante, **por quê**. Não escreva "porque é a melhor opção" — escreva qual critério foi decisivo.

**Dica:** Se o critério decisivo foi "intuição", está tudo bem. Mas registre como "intuição" e não disfarce de "análise".

---

### ETAPA 6: RESULTADO

**Template:**
```
RESULTADO:
O que realmente aconteceu: [descrição]
Data do resultado: [DD/MM/AAAA]
Diferenca do esperado: [melhor / pior / igual ao esperado]
Surpresas: [o que foi diferente do previsto]
```

**O que preencher:** Depois que a decisão foi implementada e o resultado é conhecido, volte e preencha esta etapa. Não pule.

**Dica:** O resultado pode levar dias, semanas ou meses para ser conhecido. Não feche a decisão antes do resultado real.

---

### ETAPA 7: APRENDIZADO

**Template:**
```
APRENDIZADO:
O que aprendemos que não sabíamos antes:
Isso confirma ou refuta alguma crença anterior?:
Este aprendizado gera uma nova hipótese?:
Este aprendizado deve virar Knowledge? [sim/não — se sim, criar entrada em docs/08-KNOWLEDGE/]
```

**O que preencher:** A etapa mais importante. Sem aprendizado registrado, a decisão não completou o ciclo.

**Dica:** Um bom aprendizado é algo que você usaria para decidir diferente no futuro. Se você não usaria, não é um aprendizado — é um dado.

---

## 4. Templates por Nível de Decisão

### Decisão BAIXA (5 min — apenas no diário)

```
Decisão: [o que foi decidido]
Contexto: [1 frase]
Alternativa preterida: [o que não foi escolhido]
```

### Decisão MÉDIA (15 min — protocolo completo no diário)

```
Decisão: [título]
CONTEXTO: [3 frases]
HIPÓTESE: [se X então Y]
EVIDÊNCIAS: [3-5 linhas]
ALTERNATIVAS: [2-3 opções]
ESCOLHA: [qual e por quê]
APRENDIZADO: [a preencher depois]
```

### Decisão ALTA (30 min+ — protocolo completo + RFC)

```
RFC: [título] (arquivo separado em docs/04-DECISIONS/RFC/)
CONTEXTO: [parágrafo]
HIPÓTESE: [se X então Y + métrica de sucesso]
EVIDÊNCIAS: [dados, fontes, lacunas]
ALTERNATIVAS: [2-5 opções com riscos]
ESCOLHA: [qual, por quê, quem decidiu]
RESULTADO: [a preencher depois]
APRENDIZADO: [a preencher depois]
```

---

## 5. Exemplos Completos

### Exemplo 1: Decisão BAIXA (real)

**Situação:** Durante a sprint atual, surgiu um bug no relatório financeiro que afeta apenas o Cliente B. Consertar agora interrompe a funcionalidade em que estou trabalhando.

```
Decisão: Corrigir bug do Cliente B agora, antes de continuar a feature X
Contexto: Bug afeta apenas 1 cliente, mas ele está ativamente usando o sistema
Alternativa preterida: Terminar feature X e corrigir bug depois
```

**Resultado conhecido depois:** Cliente B ficou satisfeito com a rapidez. Feature X atrasou 1 dia.

**Aprendizado:** Priorizar cliente ativo > funcionalidade não testada. Um cliente satisfeito hoje gera mais aprendizado que uma funcionalidade pronta amanhã.

---

### Exemplo 2: Decisão MÉDIA (real)

**Situação:** Três clientes iniciais pediram funcionalidades diferentes. Não temos recursos para fazer todas. Precisamos escolher qual priorizar.

```
Decisão: Priorizar relatório de fluxo de caixa comparativo
CONTEXTO: Cliente A pediu comparação temporal, Cliente B pediu integração bancária, Cliente C pediu alertas de vencimento. Temos 2 semanas de desenvolvimento disponíveis antes da próxima rodada de validação.

HIPÓTESE: Se implementarmos comparação temporal primeiro (vs integração bancária), manteremos os 3 clientes engajados porque a comparação é a funcionalidade mais pedida (3/3 clientes mencionaram) e a mais rápida de implementar (3 dias vs 10 dias).

EVIDÊNCIAS:
- 3/3 clientes mencionaram "comparar períodos" em entrevistas
- 1/3 mencionou integração bancária espontaneamente
- 0/3 mencionou alertas de vencimento
- Lacuna: não sabemos se as menções a "comparação" são cortesia ou real necessidade

ALTERNATIVAS:
1. Comparação temporal (3 dias, risco: pode ser superficial demais)
2. Integração bancária (10 dias, risco: pode não ser o que clientes realmente querem)
3. Alerta de vencimento (2 dias, risco: ninguém pediu)
4. Não fazer nada (0 dias, risco: perder janela de engajamento)

ESCOLHA: Alternativa 1 — comparação temporal
Critério principal: maior relação aprendizado/esforço. Em 3 dias testamos se clientes realmente usam funcionalidades analíticas.
Confiança: 65%

RESULTADO: [a preencher depois da implementação]

APRENDIZADO: [a preencher depois]
```

---

### Exemplo 3: Decisão ALTA (real)

**Situação:** A Ponte Digital precisa decidir se começa a cobrar pelos clientes atuais ou se mantém gratuito até atingir 10 clientes. A decisão afeta o modelo de negócio, o posicionamento e a relação com os primeiros usuários.

```
RFC: DEC-001 — Modelo de Precificação para Fase de Validação

CONTEXTO:
Atualmente temos 3 clientes usando gratuitamente. Precisamos de receita para sustentar operação, mas também precisamos de mais aprendizado antes de definir preço definitivo. Queimar pontes com clientes iniciais é arriscado. Não cobrar nada pode desvalorizar o produto.

HIPÓTESE:
Se cobrarmos um valor simbólico (R$ 97/mês) agora, os clientes atuais vão:
(a) levar o produto mais a sério e usar mais (50% de probabilidade)
OU
(b) cancelar por não estarem prontos para pagar (20% de probabilidade)
OU
(c) continuar usando sem reclamar (30% de probabilidade)

Métrica de sucesso: após 30 dias, pelo menos 2 dos 3 clientes continuarem ativos com pagamento em dia.

EVIDÊNCIAS:
A favor de cobrar:
- Cliente A disse "estou disposto a pagar se tiver suporte"
- Cliente B perguntou "quanto vai custar" (sinal de intenção)
- Startups que cobram cedo têm 40% mais retenção em 12 meses (fonte: estudo SaaS)

Contra cobrar:
- Cliente C nunca mencionou dinheiro
- Nenhum cliente assinou contrato ou termo de compromisso
- Produto ainda tem bugs (relatório quebrou essa semana)

Lacunas:
- Não sabemos o real poder de compra dos clientes
- Não sabemos quanto eles pagariam
- Não temos termo de serviço ou política de cancelamento

ALTERNATIVAS:
1. Cobrar R$ 97/mês agora (risco: perder cliente C; benefício: receita + validação de preço)
2. Cobrar R$ 0 até 10 clientes (risco: aprender sem receita; benefício: máxima adoção)
3. Cobrar "pague o que quiser" (risco: pode gerar R$ 0; benefício: revela valor percebido)
4. Cobrar apenas novos clientes, manter atuais gratuitos (risco: dois regimes; benefício: não queimar pontes)

ESCOLHA: Alternativa 4 — cobrar apenas novos clientes, manter atuais gratuitos vitaliciamente como "early adopters"
Critério principal: preservar relacionamento com clientes atuais enquanto testa disposição a pagar em novos.
Decidido por: [Nome do Fundador]
Confiança: 75%

RESULTADO: [a preencher]
APRENDIZADO: [a preencher]
```

---

## 6. Regras de Ouro

1. **Toda decisão MÉDIA ou ALTA precisa de uma hipótese explícita.** Se você não sabe o que espera que aconteça, não sabe o que vai aprender.
2. **Evidência contrária vale mais que evidência favorável.** Se você só encontrou prós, não procurou o suficiente.
3. **Registre a decisão ANTES de ver o resultado.** Registrar depois que já sabe o que aconteceu vicia o aprendizado.
4. **"Não decidir" também é uma decisão.** Registre como alternativa e com hipótese.
5. **Confiança é autorreportada.** Não existe confiança "objetiva". Seja honesto: 50% significa "não faço ideia".
6. **Toda decisão pode ser revisitada.** Aprender que estava errado não é fracasso — é não registrar o aprendizado.
