# Fluxo da Empresa Desconhecida — Jornada Completa

> **Programa 12 — Fase 2** | Fluxo Operacional do Conhecimento
> Patrimônio Intelectual da Ponte Digital
> Nenhum código, classe, API, schema, migration ou engine foi criado.

---

## Índice

1. [A jornada em 10 estágios](#1-a-jornada-em-10-estágios)
2. [Estágio 0 — Zero](#2-estágio-0--zero)
3. [Estágio 1 — Identificação](#3-estágio-1--identificação)
4. [Estágio 2 — Primeira Conversa](#4-estágio-2--primeira-conversa)
5. [Estágio 3 — Criação de Objetos](#5-estágio-3--criação-de-objetos)
6. [Estágio 4 — Primeiras Conexões](#6-estágio-4--primeiras-conexões)
7. [Estágio 5 — Primeiro Conhecimento](#7-estágio-5--primeiro-conhecimento)
8. [Estágio 6 — Primeira Validação](#8-estágio-6--primeira-validação)
9. [Estágio 7 — Primeira Recomendação](#9-estágio-7--primeira-recomendação)
10. [Estágio 8 — Aprendizado Contínuo](#10-estágio-8--aprendizado-contínuo)
11. [Estágio 9 — Empresa Especialista](#11-estágio-9--empresa-especialista)
12. [Fluxo dos Objetos Cognitivos](#12-fluxo-dos-objetos-cognitivos)
13. [Indicadores de progresso por estágio](#13-indicadores-de-progresso)

---

## 1. A jornada em 10 estágios

Cada empresa começa como um **ponto sem informação** e percorre 10 estágios até se tornar uma **empresa especialista** — profundamente compreendida pela Ponte Digital.

```
                 JORNADA DA EMPRESA DESCONHECIDA
                 ───────────────────────────────

  Estágio 0 ── ZERO
      │  Nada se sabe. A empresa não existe no sistema.
      ▼
  Estágio 1 ── IDENTIFICAÇÃO
      │  CNPJ, nome, segmento. A empresa passa a existir.
      ▼
  Estágio 2 ── PRIMEIRA CONVERSA
      │  Primeira interação com o empresário.
      ▼
  Estágio 3 ── CRIAÇÃO DE OBJETOS
      │  Pessoas, ofertas, recursos são criados.
      ▼
  Estágio 4 ── PRIMEIRAS CONEXÕES
      │  Relacionamentos entre objetos são estabelecidos.
      ▼
  Estágio 5 ── PRIMEIRO CONHECIMENTO
      │  Padrões e hipóteses emergem dos dados.
      ▼
  Estágio 6 ── PRIMEIRA VALIDAÇÃO
      │  Empresário confirma ou corrige o modelo.
      ▼
  Estágio 7 ── PRIMEIRA RECOMENDAÇÃO
      │  IA sugere ação baseada em conhecimento.
      ▼
  Estágio 8 ── APRENDIZADO CONTÍNUO
      │  Ciclo de melhoria permanente.
      ▼
  Estágio 9 ── EMPRESA ESPECIALISTA
      │  IA compreende profundamente a empresa.
```

## 2. Estágio 0 — Zero

### 2.1 Definição

A empresa não existe no sistema. Nenhum identificador, nenhum dado, nenhum objeto.

### 2.2 Como a empresa aparece

| Gatilho | Exemplo | Como acontece |
|---------|---------|---------------|
| CNPJ informado | Empresário digita CNPJ | Manual |
| Nome informado | Empresário diz "Barbearia do João" | Conversa |
| Indicação | Parceiro indica | API |
| Contato via site | Lead de site | Formulário |
| Importação em lote | Planilha de empresas | Batch |
| Dado público | Consulta CNPJ automática | Sistema |

### 2.3 O que a IA faz

```
1. Receber identificador (CNPJ, nome, contato)
2. Criar objeto Empresa com ID único
3. Consultar dados públicos (CNPJ → segmento, porte, localização)
4. Avançar para Estágio 1
```

### 2.4 Saída

```
Empresa: {
  id: "emp_001",
  estado: "Desconhecida",
  fonteCriacao: "cnpj_consulta",
  dataCriacao: "2026-07-18T10:00:00Z",
  objetosPreenchidos: 1  // apenas Empresa
}
```

## 3. Estágio 1 — Identificação

### 3.1 Definição

A empresa já tem identidade mínima. Sabe-se segmento, porte aproximado e localização.

### 3.2 O que a IA já sabe

| Informação | Como sabe | Confiança |
|-----------|-----------|-----------|
| Nome | CNPJ ou fornecido | 0.95 |
| Segmento | CNAE ou declarado | 0.70-0.90 |
| Porte | CNAE + faturamento estimado | 0.50-0.80 |
| Localização | CNPJ | 0.90 |
| Data de abertura | CNPJ | 0.95 |

### 3.3 O que a IA NÃO sabe

- Quem são as pessoas
- O que vendem exatamente
- Quanto faturam
- Como operam
- Quais problemas enfrentam

### 3.4 Decisão da IA

```
Se confiança do segmento ≥ 0.70:
  → Avançar para Estágio 2 (primeira conversa)
  → Preparar perguntas específicas do segmento

Se confiança do segmento < 0.70:
  → Perguntar segmento na primeira conversa
  → Não preparar perguntas específicas ainda
```

### 3.5 Saída

```
Empresa: {
  ...,
  estado: "Superficial",
  objetosPreenchidos: 2,  // Empresa + Local
  segmento: "Barbearia" (confiança 0.85),
  prontoParaConversa: true
}
```

## 4. Estágio 2 — Primeira Conversa

### 4.1 Definição

A primeira interação com o empresário. É o momento mais crítico da jornada.

(Design completo da primeira conversa está em FLUXO_DA_PRIMEIRA_CONVERSA.md. Aqui descrevemos apenas o que acontece do ponto de vista do fluxo.)

### 4.2 O que a IA faz

```
1. Iniciar conversa com saudação personalizada
2. Fazer primeira pergunta adaptativa
3. Processar resposta → extrair entidades
4. Se entidades suficientes: criar objetos
5. Se respostas insuficientes: fazer segunda pergunta
6. Após 3-5 perguntas produtivas: avançar para Estágio 3
```

### 4.3 Saída esperada

```
Após primeira conversa (típico, 5 min):
  - 3-8 objetos criados (Pessoa, Produto, Serviço)
  - Segmento confirmado ou corrigido
  - Primeiras intenções identificadas
  - Empresa avança para "Estrutural"
```

## 5. Estágio 3 — Criação de Objetos

### 5.1 Definição

Os primeiros objetos cognitivos são criados a partir das informações coletadas.

### 5.2 Quem cria

| Criador | Objetos típicos | Exemplo |
|---------|----------------|---------|
| Conversa | Pessoa, Produto, Serviço, Problema | "João é barbeiro" → Pessoa |
| CNPJ | Empresa, Local, Sócio | CNPJ → Empresa |
| Integração | Cliente, Venda, Produto | ERP → Vendas |
| Documento | Produto, Fornecedor, Compra | NF → Fornecedor |
| Observação | Padrão, Anomalia | Comportamento → Padrão |

### 5.3 Ciclo de vida de um objeto

```
CRIAÇÃO
  │
  ▼
  [ Objeto criado com versão 1, confiança inicial, estado "Emergente" ]
  │
  ▼
ATUALIZAÇÃO (nova fonte, correção, complemento)
  │
  ▼
  [ Objeto atualizado: versão ++, nova confiança, proveniência adicionada ]
  │
  ▼
VALIDAÇÃO (empresário confirma)
  │
  ▼
  [ Objeto validado: confiança alta, estado "Confirmado" ]
  │
  ▼
EVOLUÇÃO (nova fonte contradiz ou complementa)
  │
  ▼
  [ Objeto evoluído: versão ++, capaz de coexistir com contradição ]
  │
  ▼
APOSENTADORIA (objeto não é mais relevante)
  │
  ▼
  [ Objeto aposentado: marcado como obsoleto, histórico preservado ]
```

### 5.4 Regras de criação

| Regra | Descrição |
|-------|-----------|
| Mínimo viável | Criar objeto com mínimo de 3 atributos |
| Mesclagem automática | Se atributos compatíveis com objeto existente, mesclar |
| Objeto parcial | Se < 3 atributos, criar como "rascunho" (não entra no patrimônio) |
| Proibido duplicar | Verificar similaridade antes de criar |

## 6. Estágio 4 — Primeiras Conexões

### 6.1 Definição

Relacionamentos entre objetos são estabelecidos. O grafo começa a se formar.

### 6.2 Conexões que surgem primeiro

```
Após primeiros objetos criados:

  [Empresa]──tem_socio──[Pessoa: João]
  [Empresa]──vende──────[Produto: Corte]
  [Empresa]──vende──────[Serviço: Barba]
  [Pessoa: João]──ocupa_funcao──[Função: Barbeiro]
  [Empresa]──opera_em──[Local: Rua Augusta, 123]
```

### 6.3 Tipos de conexão por estágio

| Estágio | Conexões típicas |
|---------|-----------------|
| 4.1 — Estruturais | Empresa → Pessoas, Empresa → Oferta, Pessoas → Funções |
| 4.2 — Comerciais | Venda → Cliente, Venda → Produto, Venda → Receita |
| 4.3 — Operacionais | Processo → Tarefa, Agenda → Cliente, Compra → Fornecedor |
| 4.4 — Causais | Problema → Processo, Decisão → Problema, Evento → Aprendizado |
| 4.5 — Cognitivas | Conhecimento → Decisão, Hipotese → Teste, Padrão → Conhecimento |

### 6.4 O que a IA faz

```
1. Para cada novo objeto, verificar relacionamentos possíveis
2. Estabelecer conexões com objetos existentes
3. Se conexão incerta (< 0.50): marcar como "conexão hipotética"
4. Se conexão contradiz existente: manter ambas
5. Atualizar grafo cognitivo
```

## 7. Estágio 5 — Primeiro Conhecimento

### 7.1 Definição

Padrões e hipóteses emergem dos dados. A IA começa a aprender sobre a empresa.

### 7.2 Como nasce o primeiro conhecimento

```
Fonte: Múltiplas entradas do pipeline

Exemplo:
  Pipeline processou 3 NFs de venda da Barbearia
  → Objeto Venda #1: Corte (R$ 45, Pix)
  → Objeto Venda #2: Corte + Barba (R$ 60, Pix)
  → Objeto Venda #3: Corte (R$ 45, Dinheiro)

  Pipeline de aprendizado detecta:
  → 2/3 vendas foram no Pix
  → Ticket médio: R$ 50
  → Combo é 33% das vendas

  → Hipótese: "Clientes preferem Pix a dinheiro"
  → Hipótese: "Combo aumenta ticket em 33%"
```

### 7.3 Tipos de primeiro conhecimento

| Tipo | Exemplo | Confiança inicial |
|------|---------|-------------------|
| Preferência | "Clientes preferem Pix" | 0.50 |
| Padrão | "Segunda é dia mais fraco" | 0.40 |
| Correlação | "Quem compra barba também compra pomada" | 0.35 |
| Tendência | "Vendas estão crescendo" | 0.45 |
| Problema recorrente | "Tesoura cega a cada 2 meses" | 0.50 |
| Oportunidade | "Clientes pedem hidratação" | 0.30 |

### 7.4 O que a IA faz

```
1. Analisar objetos e relacionamentos existentes
2. Identificar padrões (repetição, frequência, correlação)
3. Formular hipóteses (nunca com confiança > 0.50)
4. Registrar hipóteses no patrimônio cognitivo
5. Avançar para validação
```

## 8. Estágio 6 — Primeira Validação

### 8.1 Definição

O empresário confirma ou corrige o modelo construído pela IA.

### 8.2 Como funciona

```
IA: "João, deixa eu ver se entendi:
     Você é barbeiro, trabalha sozinho, cobra R$ 45 no corte
     e R$ 60 no combo. Seus clientes preferem pagar no Pix.
     Está certo?"

João: "Tudo certo, mas também atendo barba por R$ 25"

IA: "Obrigado! Vou adicionar a barba. Mais alguma coisa?"
```

### 8.3 Efeitos da validação

| Ação do empresário | Efeito |
|--------------------|--------|
| "Tudo certo" | Confiança sobe para 0.90+ |
| Correção | Informação corrigida com confiança 0.90 |
| Complemento | Nova informação adicionada com confiança 0.75 |
| "Não sei" | Informação mantida com confiança atual |
| Silêncio (não responde) | Informação mantida, decaimento normal |

### 8.4 Saída

```
Modelo validado em: 70%+
Empresa avança para: "Diagnosticada" ou "Cognitiva"
Próximo estágio: Recomendação
```

## 9. Estágio 7 — Primeira Recomendação

### 9.1 Definição

A IA faz a primeira sugestão baseada em conhecimento sobre a empresa.

### 9.2 Condição para recomendar

```
Recomendação só ocorre quando:
├── Empresa atingiu estado ≥ "Diagnosticada"
├── Confiança média ≥ 0.60
├── Pelo menos 1 conhecimento ou hipótese identificada
└── Empresário já validou parte do modelo
```

### 9.3 Primeira recomendação típica

```
Baseada no conhecimento:
  "Clientes preferem Pix, e você aceita dinheiro e Pix"

Recomendação:
  "Que tal incentivar o Pix? Clientes pagam mais rápido,
   você não precisa dar troco, e o dinheiro cai na hora
   na conta. Posso te ajudar a criar uma plaquinha
   'Pix Preferencial'?"

Confiança da recomendação: 0.65 (média)
```

### 9.4 O que a IA faz

```
1. Consultar conhecimentos e hipóteses validados
2. Selecionar a recomendação com maior confiança × impacto
3. Apresentar em linguagem natural, explicando o porquê
4. Oferecer ação: "Quer testar? Posso acompanhar o resultado"
5. Registrar se o empresário aceitou, recusou ou ignorou
```

## 10. Estágio 8 — Aprendizado Contínuo

### 10.1 Definição

A empresa entrou no ciclo permanente de aquisição, aprendizado e evolução.

### 10.2 O que alimenta o ciclo

```
Todas as fontes continuam alimentando:
├── Novas vendas
├── NFs emitidas
├── Novos clientes
├── Conversas com o empresário
├── Feedback do empresário
├── Integrações contínuas (ERP, banco)
├── Comportamento na plataforma
└── Resultado de recomendações aceitas
```

### 10.3 Ciclo de melhoria

```
[Entrada] → [Pipeline] → [Conhecimento] → [Recomendação] → [Resultado] → [Aprendizado]
     ↑                                                                        │
     └─────────────────────────── (ciclo) ────────────────────────────────────┘
```

### 10.4 O que a IA faz

```
1. Monitorar novas entradas continuamente
2. Processar via pipeline universal
3. Atualizar objetos, confianças e relacionamentos
4. Identificar novos padrões
5. Formular novas hipóteses
6. Revalidar conhecimentos antigos (decaimento temporal)
7. Fazer novas recomendações baseadas em conhecimento mais sólido
```

## 11. Estágio 9 — Empresa Especialista

### 11.1 Definição

A Ponte Digital compreende a empresa profundamente. A IA não apenas conhece os dados — ela entende os padrões, antecipa problemas e sugere proativamente.

### 11.2 Características

```
✅ Modelo cognitivo com 50+ objetos preenchidos
✅ Confiança média ≥ 0.80
✅ 10+ conhecimentos validados
✅ 5+ padrões identificados e confirmados
✅ Empresário valida sem precisar corrigir
✅ Recomendações têm taxa de aceitação ≥ 50%
✅ IA detecta anomalias antes do empresário perceber
✅ Ciclo de aprendizado autônomo (IA aprende sem perguntar)
```

### 11.3 O que a IA pode fazer no nível especialista

```
No nível especialista, a IA pode:

✅ "João, percebi que suas vendas de segunda-feira
   caíram 30% nas últimas 4 semanas. Isso nunca
   aconteceu antes. Quer investigar juntos?"

✅ "Baseado nos últimos 6 meses, sugiro comprar
   estoque extra de tesouras agora — o preço
   costuma subir em setembro."

✅ "Notei que o cliente Pedro não vem há 45 dias.
   Ele costuma vir a cada 30. Quer que eu envie
   uma mensagem de saudade?"
```

### 11.4 Como a IA NUNCA trata uma empresa especialista

```
❌ Perguntar "Qual seu segmento?" (já sabe)
❌ Perguntar "O que você vende?" (já sabe)
❌ Pedir confirmação de informações básicas (já validou)
❌ Ignorar padrões que já identificou
```

## 12. Fluxo dos Objetos Cognitivos

### 12.1 Ciclo de vida completo por tipo de objeto

| Objeto | Quem cria | Quem altera | Quem valida | Quem aposenta | Quem versiona |
|--------|-----------|-------------|-------------|---------------|---------------|
| Empresa | Sistema (CNPJ) | Empresário | Empresário | Sistema (inatividade) | Sistema |
| Pessoa | Conversa/Integração | Conversa/Integração | Empresário | Empresário | Sistema |
| Produto | Conversa/NF | Conversa/NF | Empresário | Empresário | Sistema |
| Serviço | Conversa/NF | Conversa/NF | Empresário | Empresário | Sistema |
| Venda | NF/Integração | — (imutável) | Sistema (automático) | — | Sistema |
| Cliente | NF/CRM/Conversa | Integração/Feedback | Empresário | Empresário | Sistema |
| Fornecedor | NF/Conversa | NF/Conversa | Empresário | Empresário | Sistema |
| Compra | NF/Integração | — (imutável) | Sistema | — | Sistema |
| Receita | NF/Extrato | — (imutável) | Sistema | — | Sistema |
| Despesa | NF/Extrato | — (imutável) | Sistema | — | Sistema |
| Problema | Conversa/IA | Conversa/IA | Empresário | Empresário | Sistema |
| Decisão | Conversa/IA | IA (resultados) | Empresário | — | Sistema |
| Hipótese | IA | IA (teste) | Empresa | IA (refutada) | Sistema |
| Conhecimento | IA (validação) | IA (evolução) | Ciclo | IA (obsolescência) | Sistema |
| Evento | Pipeline | — (imutável) | — | — | Sistema |
| Aprendizado | IA | — | Ciclo | — | Sistema |

### 12.2 Matriz de mutabilidade

| Tipo | Imutável | Mutável | Quem pode mutar |
|------|----------|---------|-----------------|
| Venda | ✅ (depois de registrada) | — | — |
| Receita | ✅ | — | — |
| Despesa | ✅ | — | — |
| Evento | ✅ | — | — |
| Empresa | — | ✅ | Empresário |
| Pessoa | — | ✅ | Empresário + fontes |
| Produto | — | ✅ | Empresário + fontes |
| Problema | — | ✅ | Empresário + IA |
| Hipótese | — | ✅ | IA (baseada em teste) |
| Conhecimento | — | ✅ | IA (evolução) |

### 12.3 Quando um objeto é aposentado

```
Critérios de aposentadoria:

Produto: "Não é vendido há 6+ meses"
Serviço: "Não é prestado há 6+ meses"
Cliente: "Sem compras há 12+ meses"
Fornecedor: "Sem compras há 12+ meses"
Problema: "Resolvido há 3+ meses e sem recorrência"
Hipótese: "Refutada por teste"
Conhecimento: "Contradito por 3+ fontes independentes"
```

## 13. Indicadores de progresso por estágio

### 13.1 Matriz de indicadores

| Estágio | Estado cognitivo | Objetos | Confiança | Conhecimentos | Lacunas |
|---------|-----------------|---------|-----------|---------------|---------|
| 0 — Zero | — | 0 | 0.00 | 0 | ∞ |
| 1 — Identificação | Desconhecida → Superficial | 1-2 | 0.30-0.50 | 0 | 56-57 |
| 2 — Primeira Conversa | Superficial → Estrutural | 3-8 | 0.40-0.60 | 0 | 50-55 |
| 3 — Criação de Objetos | Estrutural | 8-15 | 0.45-0.60 | 0 | 43-50 |
| 4 — Primeiras Conexões | Estrutural → Operacional | 10-20 | 0.50-0.65 | 0 | 38-48 |
| 5 — Primeiro Conhecimento | Operacional → Financeira | 15-25 | 0.50-0.65 | 1-3 | 33-43 |
| 6 — Primeira Validação | Financeira → Diagnosticada | 20-30 | 0.60-0.75 | 1-3 | 28-38 |
| 7 — Primeira Recomendação | Diagnosticada → Cognitiva | 25-35 | 0.65-0.80 | 3-5 | 23-33 |
| 8 — Aprendizado Contínuo | Cognitiva → Validada | 30-45 | 0.70-0.85 | 5-15 | 13-28 |
| 9 — Empresa Especialista | Validada (madura) | 45-58 | 0.80-0.95 | 15+ | 0-13 |

### 13.2 Gatilhos de avanço entre estágios

| De → Para | Gatilho |
|-----------|---------|
| Estágio 0 → 1 | Identificador recebido e processado |
| Estágio 1 → 2 | Primeira interação com empresário inicia |
| Estágio 2 → 3 | 3+ entidades extraídas da conversa |
| Estágio 3 → 4 | 5+ objetos criados |
| Estágio 4 → 5 | 3+ relacionamentos estabelecidos |
| Estágio 5 → 6 | Pelo menos 1 hipótese formulada |
| Estágio 6 → 7 | Empresário validou ≥ 60% do modelo |
| Estágio 7 → 8 | Primeira recomendação foi feita |
| Estágio 8 → 9 | Empresa mantém ciclo por 30+ dias com indicadores estáveis |

---

> **Fim do Fluxo da Empresa Desconhecida**
> Próximo: `FLUXO_DA_PRIMEIRA_CONVERSA.md` — Design da primeira conversa
