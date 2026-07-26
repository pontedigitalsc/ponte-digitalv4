# Fluxo da Primeira Conversa — Design da Interação Inicial

> **Programa 12 — Fase 2** | Fluxo Operacional do Conhecimento
> Patrimônio Intelectual da Ponte Digital
> Nenhum código, classe, API, schema, migration ou engine foi criado.

---

## Índice

1. [O momento mais crítico](#1-o-momento-mais-crítico)
2. [Arquitetura da conversa](#2-arquitetura-da-conversa)
3. [Fase 1 — Abertura](#3-fase-1--abertura)
4. [Fase 2 — Descoberta](#4-fase-2--descoberta)
5. [Fase 3 — Aprofundamento](#5-fase-3--aprofundamento)
6. [Fase 4 — Fechamento](#6-fase-4--fechamento)
7. [Árvore de decisão da conversa](#7-árvore-de-decisão-da-conversa)
8. [Técnicas de pergunta](#8-técnicas-de-pergunta)
9. [Detecção de entidades](#9-detecção-de-entidades)
10. [Extra: Perguntas proibidas](#10-perguntas-proibidas)

---

## 1. O momento mais crítico

### 1.1 Por que a primeira conversa é diferente

A primeira conversa não é uma coleta de dados. É o **momento em que o empresário decide se a Ponte Digital entende ou não do negócio dele.**

Se a primeira conversa for boa, o empresário confia, responde, engaja.
Se for ruim, ele abandona — talvez para sempre.

### 1.2 O que está em jogo

| Aspecto | Se bom | Se ruim |
|---------|--------|---------|
| Confiança do empresário | Disposto a responder | Abandona |
| Qualidade dos dados | Respostas verdadeiras | Respostas de má vontade |
| Velocidade da reconstrução | Rápida (empresário engajado) | Lenta (depende de outras fontes) |
| Percepção de valor | "Essa IA é inteligente" | "Não entende nada" |
| Retenção | Volta, traz documentos | Nunca mais acessa |

### 1.3 Princípios da primeira conversa

1. **O empresário é o especialista** — a IA não sabe mais que ele sobre o negócio dele
2. **Perguntas abertas primeiro** — deixe o empresário falar antes de categorizar
3. **Nunca pergunte o que já sabe** — se o CNPJ revelou o segmento, não pergunte
4. **Valor antes de coleta** — entregue algo útil antes de pedir mais informação
5. **Respeite o ritmo** — uma conversa de 5min > cinco conversas de 1min
6. **Escute antes de sugerir** — não recomende algo antes de entender o problema

## 2. Arquitetura da conversa

### 2.1 As 4 fases da primeira conversa

```
FASE 1 — ABERTURA
  Objetivo: Estabelecer rapport, confirmar identidade
  Duração: 30 segundos
  Tom: Caloroso, pessoal, respeitoso

FASE 2 — ESCOPO
  Objetivo: Entender o básico (o que faz, como vende, público)
  Duração: 2-3 minutos
  Tom: Curioso, investigativo (mas não interrogatório)

FASE 3 — APROFUNDAMENTO
  Objetivo: Identificar dores, objetivos, lacunas
  Duração: 2-5 minutos
  Tom: Empático ("isso deve ser difícil"), solucionador

FASE 4 — FECHAMENTO
  Objetivo: Oferecer valor imediato, combinar próximos passos
  Duração: 30 segundos
  Tom: Positivo, promissor, agradecido
```

### 2.2 Estrutura de turnos

```
IA: Saudação + contexto + primeira pergunta aberta
    [2-3 frases. Máximo.]

Empresário: Responde (5-30 segundos)
    [IA processa: extrai entidades, intenções, lacunas]

IA: Reconhece resposta + aprofunda + segunda pergunta
    [Mostra que ouviu: "Entendi...", "Legal!", "Você mencionou..."]

Empresário: Responde

IA: Reconhece + aprofunda OU muda de tema
    ... (3-6 ciclos)
```

### 2.3 Condições para a conversa acontecer

```
A IA só inicia a primeira conversa quando:
├── Empresa em estado "Superficial" ou superior
├── Empresário disponível (online, respondeu contato)
├── Nenhuma conversa ativa em andamento
└── IA tem pelo menos o segmento da empresa
```

## 3. Fase 1 — Abertura

### 3.1 Template de abertura

```
"Olá, [nome]! Tudo bem?

Sou a assistente da Ponte Digital e estou aqui para
conhecer melhor a [nome da empresa].

Sei que você é [segmento inferido] em [cidade].
Se eu entender direitinho como funciona seu negócio,
posso te ajudar com recomendações e diagnósticos.

Posso fazer algumas perguntas?"
```

### 3.2 Variações por segmento

| Segmento | Variação na abertura |
|----------|---------------------|
| Restaurante | "Sei que você está na área de alimentação..." |
| Oficina | "Sei que você trabalha com veículos..." |
| Clínica | "Sei que você é da área da saúde..." |
| Barbearia | "Sei que você é barbeiro..." |
| Loja | "Sei que você tem um comércio..." |
| Profissional Liberal | "Sei que você é profissional autônomo..." |

### 3.3 O que NÃO fazer na abertura

| Erro | Consequência |
|------|-------------|
| "Precisamos de algumas informações" | Burocrático, impessoal |
| "Vou te fazer algumas perguntas" | Sem contexto, parece interrogatório |
| Silêncio ou "como posso ajudar?" | Vago, desperdiça a oportunidade |
| Já sugerir algo | Presunçoso — não conhece o negócio |

## 4. Fase 2 — Escopo

### 4.1 Perguntas de escopo

As perguntas de escopo variam por segmento. Aqui estão as primeiras perguntas para cada super-segmento:

| Super-segmento | Primeira pergunta |
|----------------|------------------|
| Comércio | "O que você vende?" |
| Serviço | "Qual serviço você presta?" |
| Indústria | "O que você produz?" |
| Prof. Liberal | "Qual sua especialidade?" |

### 4.2 Após a primeira resposta

A IA deve extrair entidades da resposta e fazer a segunda pergunta com base no que foi dito:

```
Se empresário disse "vendo roupas":
  → Segunda pergunta: "Que tipo de roupa? Tem loja física ou é só online?"

Se empresário disse "sou barbeiro":
  → Segunda pergunta: "Trabalha sozinho ou tem equipe?"

Se empresário disse "tenho uma clínica":
  → Segunda pergunta: "Quantos pacientes você atende por dia?"
```

### 4.3 O que a IA deve capturar na Fase 2

```
Após a Fase 2, a IA deve ter capturado:
✅ O que a empresa vende (produto/serviço)
✅ Como vende (canal, formato)
✅ Para quem vende (público-alvo)
✅ Com quem trabalha (sozinho ou equipe)
✅ Onde opera (local, região)
```

## 5. Fase 3 — Aprofundamento

### 5.1 Perguntas de aprofundamento

Depois de entender o básico, a IA aprofunda em dores e objetivos.

```
"Agora que já entendi melhor, me conte:
   Qual é a maior dificuldade que você enfrenta
   no dia a dia do seu negócio?"
```

### 5.2 Técnicas de aprofundamento

| Técnica | Descrição | Exemplo |
|---------|-----------|---------|
| Espelhamento | Repetir parte do que o empresário disse para validar | "Você mencionou que a demora é um problema..." |
| Escavação | Perguntar mais detalhes sobre algo mencionado | "Me conte mais sobre essa demora..." |
| Quantificação | Transformar sentimento em número | "Quantos clientes você perde por causa disso?" |
| Causa raiz | Perguntar "por quê?" até encontrar a causa | "Por que isso acontece?" |
| Impacto | Entender as consequências | "O que isso custa para você no fim do mês?" |

### 5.3 O que a IA deve capturar na Fase 3

```
Após a Fase 3, a IA deve ter capturado:
✅ Principais problemas
✅ Objetivos e metas
✅ O que o empresário já tentou fazer
✅ O que ele gostaria que um sistema fizesse
✅ Percepção de urgência (o que mais pressiona)
```

## 6. Fase 4 — Fechamento

### 6.1 Template de fechamento

```
"João, muito obrigado pelas respostas! Já entendi
bastante sobre a Barbearia do João.

Com o que você me contou, já posso começar a
analisar seu negócio. Nos próximos dias vou
trazer algumas sugestões.

Ah, e se você tiver NFs, planilhas ou quiser
conectar seu sistema, isso acelera o processo.

Tem mais alguma coisa que você gostaria de
compartilhar?"
```

### 6.2 O que a IA deve fazer no fechamento

```
1. Agradecer (sinceramente, não roboticamente)
2. Resumir o que entendeu (1-2 frases)
3. Prometer próximo passo ("vou analisar", "volto com sugestões")
4. Oferecer ação imediata (importar docs, conectar sistema)
5. Perguntar se há mais algo
6. Combinar quando voltar a falar
```

## 7. Árvore de decisão da conversa

```
                    ┌──────────────────────┐
                    │   INÍCIO DA CONVERSA  │
                    └──────────┬───────────┘
                               │
                    ┌──────────▼──────────┐
                    │ Empresa tem         │───Não──→ [Perguntar segmento]
                    │ segmento conhecido? │
                    └──────────┬──────────┘
                               │ Sim
                               │
                    ┌──────────▼──────────┐
                    │ Abrir com saudação  │
                    │ personalizada        │
                    └──────────┬──────────┘
                               │
                    ┌──────────▼──────────┐
                    │ Fazer pergunta de   │
                    │ escopo (aberta)      │
                    └──────────┬──────────┘
                               │
                    ┌──────────▼──────────┐
                    │ Processar resposta  │
                    │ Extrair entidades   │
                    └──────────┬──────────┘
                               │
                    ┌──────────▼──────────┐
               ┌───▶│ Entidades           │──Sim──→ [Pergunta de
               │    │ suficientes?        │          aprofundamento]
               │    └──────────┬──────────┘
               │               │ Não           ┌──────────────┐
               │               ▼               │ Extrair mais │
               │    ┌──────────────────┐       │ entidades    │
               │    │ 3+ perguntas     │───────▶              │
               │    │ feitas?          │       └──────┬───────┘
               │    └──────────┬───────┘              │
               │               │ Sim                  │
               │               ▼                      │
               │    ┌──────────────────┐              │
               └────│ Empresário       │◀─────────────┘
                    │ engajado?        │──Não──→ [Encerrar]
                    └──────────┬───────┘
                               │ Sim
                               │
                    ┌──────────▼──────────┐
                    │ Lacunas críticas    │──Sim──→ [Perguntar sobre
                    │ preenchidas?        │          problemas/metas]
                    └──────────┬──────────┘
                               │ Sim
                               │
                    ┌──────────▼──────────┐
                    │ Fechar com resumo   │
                    │ + próximo passo     │
                    └──────────┬──────────┘
                               │
                    ┌──────────▼──────────┐
                    │ CONVERSA CONCLUÍDA  │
                    └─────────────────────┘
```

### 7.1 Condições de saída da árvore

| Condição | Ação |
|----------|------|
| 3+ tentativas sem resposta produtiva | Encerrar educadamente |
| Empresário claramente ocupado ("agora não") | Oferecer outro horário |
| Empresário respondeu todas as perguntas-chave | Avançar para fechamento |
| Empresário pede para parar | Parar imediatamente, agradecer |
| Empresário pergunta algo que IA não sabe | "Ainda estou aprendendo, mas vou descobrir" |

## 8. Técnicas de pergunta

### 8.1 Tipos de pergunta

| Tipo | Quando usar | Exemplo |
|------|-------------|---------|
| **Aberta** | Início, para entender contexto | "Como é seu negócio?" |
| **Direcionada** | Para confirmar hipótese | "Você vende para pessoas físicas?" |
| **Quantitativa** | Para obter número | "Quantos clientes por dia?" |
| **Comparativa** | Para entender evolução | "Está melhor ou pior que mês passado?" |
| **Causal** | Para encontrar causa | "O que leva um cliente a não voltar?" |
| **Hipotética** | Para entender prioridade | "Se pudesse mudar uma coisa, o que seria?" |

### 8.2 Ordem ideal das perguntas

```
1. Aberta (entender contexto)
2. Direcionada (preencher lacuna específica)
3. Quantitativa (obter métrica)
4. Causal (entender motivo)
5. Hipotética (entender prioridade)
```

### 8.3 Quando NÃO perguntar

```
A IA não pergunta quando:
├── Já tem a informação com confiança ≥ 0.70
├── Pode obter de outra fonte (documento, integração)
├── A pergunta pode ser ofensiva ("Você não controla seu caixa?")
├── A pergunta é obvia para o segmento (perguntar se restaurante tem cozinha)
├── O empresário está claramente sem tempo
└── A informação não é prioritária (lacuna de baixo impacto)
```

## 9. Detecção de entidades

### 9.1 O que a IA extrai de cada resposta

| Entidade | Exemplo | Objeto cognitivo |
|----------|---------|-----------------|
| Pessoa mencionada | "Meu funcionário Carlos" | Equipe |
| Produto mencionado | "Vendo tesoura profissional" | Produto |
| Serviço mencionado | "Faço corte e barba" | Serviço |
| Valor mencionado | "Cobro R$ 45" | Preço |
| Problema mencionado | "O problema é a demora" | Problema |
| Cliente mencionado | "Pedro vem toda semana" | Cliente |
| Tempo mencionado | "Atendo de segunda a sábado" | Agenda |
| Local mencionado | "Na Rua Augusta" | Local |
| Objetivo mencionado | "Quero crescer 20%" | Objetivo |
| Concorrente mencionado | "A barbearia X ali perto" | Concorrente (ambiente) |

### 9.2 Processamento da resposta

```
Resposta do empresário:
  "Vendo corte a R$ 45 e barba a R$ 25. Tenho um funcionário,
   o Carlos. O problema é que no horário de almoço fica cheio"

Entidades extraídas:
  → Serviço: "Corte" (R$ 45)
  → Serviço: "Barba" (R$ 25)
  → Equipe: "Carlos" (1 funcionário)
  → Problema: "Horário de almoço cheio"
  → Contexto: "Horário de almoço" (período crítico)

Objetos criados/atualizados:
  → Serviço: Corte (novo)
  → Serviço: Barba (novo)
  → Equipe: Carlos (novo)
  → Problema: Lotação no almoço (novo)
```

## 10. Perguntas proibidas

### 10.1 Perguntas que a IA nunca deve fazer

```
❌ "Qual seu CNPJ?" — já tem ou pode consultar
❌ "Qual seu segmento?" — já inferiu ou pergunta de outra forma
❌ "Quantos funcionários?" — pode inferir do contexto
❌ "Qual seu faturamento?" — pergunta agressiva, prefira "qual sua receita mensal?"
❌ "Você controla suas finanças?" — parece julgamento
❌ "Por que você não faz X?" — parece crítica
❌ "Você sabe quanto gasta?" — parece acusação de desorganização
❌ Perguntas que exigem consulta a documento que o empresário não tem em mãos
```

### 10.2 Como perguntar o mesmo de forma melhor

| Proibido | Permitido |
|----------|-----------|
| "Qual seu faturamento?" | "Qual foi sua receita no último mês?" |
| "Quantos clientes você tem?" | "Quantos clientes você atende por semana?" |
| "Você tem dívidas?" | "Como está o fluxo de caixa?" |
| "Qual seu lucro?" | "Sobra dinheiro no fim do mês?" |
| "Você é MEI?" | "Qual o porte do seu negócio?" |

---

> **Fim do Fluxo da Primeira Conversa**
> Próximo: `FLUXO_DA_IMPORTACAO_INTELIGENTE.md` — Importação de fontes estruturadas
