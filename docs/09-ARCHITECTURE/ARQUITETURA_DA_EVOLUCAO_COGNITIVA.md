# Arquitetura da Evolução Cognitiva — Indicadores, Gatilhos e Critérios

> **Programa 12 — Fase 2** | Fluxo Operacional do Conhecimento
> Patrimônio Intelectual da Ponte Digital
> Nenhum código, classe, API, schema, migration ou engine foi criado.

---

## Índice

1. [O que é evolução cognitiva](#1-o-que-é-evolução-cognitiva)
2. [Os 8 indicadores de evolução](#2-os-8-indicadores-de-evolução)
3. [Gatilhos de evolução](#3-gatilhos-de-evolução)
4. [Critérios para cada nível](#4-critérios-para-cada-nível)
5. [Evolução assistida](#5-evolução-assistida)
6. [Platôs e estagnação](#6-platôs-e-estagnação)

---

## 1. O que é evolução cognitiva

### 1.1 Definição

Evolução Cognitiva é o **progresso da empresa através dos 9 estados de compreensão**, medida por indicadores objetivos e impulsionada por gatilhos específicos.

Ela não é automática — a empresa evolui porque:
- Novas fontes são conectadas
- O empresário responde perguntas
- Documentos são importados
- O tempo passa e padrões emergem
- A IA aprende com o comportamento

### 1.2 A evolução não é linear

```
Uma empresa pode:

✅ Avançar rápido (integração → dados completos em horas)
✅ Avançar devagar (só conversa → dias ou semanas)
✅ Estagnar (empresário não responde, sem novas fontes)
✅ Regredir (informação desatualizada, contradição)
✅ Pular etapas (integração de ERP já dá estado Financeira)
```

## 2. Os 8 indicadores de evolução

### 2.1 O score de evolução

O progresso da empresa é medido por 8 indicadores que compõem um **score de evolução** (0-1000):

```
Score Total = Σ(peso × score) de cada indicador

Indicador              Peso   Score máx   O que mede
──────────────────────────────────────────────────────
Cobertura              20%    200         Objetos preenchidos / 58
Confiança              15%    150         Média dos scores de confiança
Validação              15%    150         % do modelo validado pelo empresário
Conhecimento           15%    150         Conhecimentos validados
Fontes                 10%    100         Número de fontes convergindo
Atualidade             10%    100         Última atualização (dias)
Engajamento            10%    100         Frequência de interação
Complexidade           5%      50         Riqueza do grafo de relacionamentos
```

### 2.2 Cálculo de cada indicador

#### Cobertura (peso 20%)

```
Cobertura = (objetosPreenchidos / 58) × 200

Exemplo: 38/58 = 65.5% → score 131/200
```

#### Confiança (peso 15%)

```
Confiança = confiancaMedia × 150

Exemplo: confiança 0.68 → score 102/150
```

#### Validação (peso 15%)

```
Validacao = percentualModeloValidado × 150

Exemplo: 70% validado → score 105/150
```

#### Conhecimento (peso 15%)

```
Score por conhecimento validado:
  1-2 conhecimentos:     50
  3-5 conhecimentos:     100
  6-10 conhecimentos:    130
  11+ conhecimentos:     150

Exemplo: 3 conhecimentos → score 100/150
```

#### Fontes (peso 10%)

```
Score por número de fontes independentes convergindo:
  1 fonte:          20
  2 fontes:         50
  3 fontes:         80
  4+ fontes:        100

Exemplo: conversa + NF + extrato (3 fontes) → score 80/100
```

#### Atualidade (peso 10%)

```
Atualidade baseada em dias desde última atualização:
  0-7 dias:    100
  8-30 dias:   70
  31-90 dias:  40
  91+ dias:    10

Exemplo: última atualização há 5 dias → score 100/100
```

#### Engajamento (peso 10%)

```
Engajamento baseado em interações nos últimos 30 dias:
  10+ interações:   100
  5-9 interações:   70
  2-4 interações:   40
  0-1 interações:   10

Exemplo: 6 interações no mês → score 70/100
```

#### Complexidade (peso 5%)

```
Complexidade baseada em relacionamentos por objeto:
  < 0.5 rel/obj:    10
  0.5-1.0 rel/obj:  25
  1.0-2.0 rel/obj:  40
  2.0+ rel/obj:     50

Exemplo: 45 relacionamentos / 38 objetos = 1.18 → score 40/50
```

### 2.3 Score total e nível

```
Score 0-200:     Nível 0-1 (Desconhecida / Superficial)
Score 200-400:   Nível 2-3 (Estrutural / Operacional)
Score 400-600:   Nível 4-5 (Financeira / Comercial)
Score 600-800:   Nível 6-7 (Diagnosticada / Cognitiva)
Score 800-1000:  Nível 8 (Validada / Especialista)
```

## 3. Gatilhos de evolução

### 3.1 Gatilhos que avançam o score

| Gatilho | Indicador afetado | Bônus |
|---------|-------------------|-------|
| Nova fonte integrada | Fontes | +20-50 pontos |
| Empresário validou modelo | Validação | +30-80 pontos |
| 10 NFs importadas | Cobertura | +15-30 pontos |
| 1 conhecimento validado | Conhecimento | +50 pontos |
| Empresário respondeu conversa | Engajamento | +10 pontos |
| Dado atualizado (< 7 dias) | Atualidade | reset para 100 |
| Extrato bancário conciliado | Confiança | +10-20 pontos |

### 3.2 Gatilhos que reduzem o score

| Gatilho | Indicador afetado | Penalidade |
|---------|-------------------|------------|
| Dado desatualizado (> 90 dias) | Atualidade | -60 pontos |
| Fonte se mostrou não confiável | Confiança | -20-40 pontos |
| Contradição não resolvida | Confiança | -15 pontos |
| Empresário não interage há 30+ dias | Engajamento | -30 pontos |
| Conhecimento refutado | Conhecimento | -50 pontos |

## 4. Critérios para cada nível

### 4.1 Nível por score

| Estado | Score mínimo | Condições adicionais |
|--------|-------------|----------------------|
| Desconhecida | 0 | — |
| Superficial | 80 | Segmento identificado |
| Estrutural | 200 | 5+ objetos, oferta + pessoas |
| Operacional | 300 | 10+ objetos, processos mapeados |
| Financeira | 400 | Receita + despesa conhecidas |
| Comercial | 500 | Clientes mapeados |
| Diagnosticada | 600 | Problemas + causas identificadas |
| Cognitiva | 700 | 3+ conhecimentos validados |
| Validada | 850 | 70%+ modelo validado pelo empresário |

## 5. Evolução assistida

### 5.1 Como a IA acelera a evolução

A IA não espera passivamente — ela **age para acelerar** a evolução:

```
Se score está baixo em CONHECIMENTO:
  → IA analisa dados existentes em busca de padrões
  → Formula hipóteses
  → Pergunta ao empresário para validar

Se score está baixo em FONTES:
  → IA sugere integração com ERP
  → Oferece importação de NFs
  → Pergunta se empresário tem planilhas

Se score está baixo em ENGAJAMENTO:
  → IA envia notificação com insight relevante
  → "Notei que sua receita subiu 10% — quer ver detalhes?"
```

### 5.2 Prioridade de ação

```
A IA atua primeiro no indicador mais baixo com maior potencial de melhoria:

Prioridade:
1. Se Atualidade < 40 → revalidar dados urgentemente
2. Se Fontes = 1 → sugerir nova fonte
3. Se Conhecimento < 50 → analisar padrões
4. Se Engajamento < 40 → notificar com valor
5. Se Validação < 50 → pedir confirmação
```

## 6. Platôs e estagnação

### 6.1 Platôs comuns

| Platô | Causa | Como superar |
|-------|-------|-------------|
| Empresa chega em Financeira e para | Só tem dados financeiros, falta contexto | Perguntar sobre problemas e clientes |
| Empresa chega em Estrutural e para | Empresário não responde mais | Tentar outro canal, oferecer valor |
| Empresa chega em Cognitiva e não valida | Empresário não confirma modelo | Simplificar validação, 1 pergunta por vez |
| Score 600-700 sem avançar | Conhecimento não emerge (poucos dados) | Importar mais dados, aguardar tempo |

### 6.2 Estratégia para estagnação

```
Diagnóstico de estagnação:

Se score não melhora há 30+ dias:
  → Identificar indicador mais baixo
  → Se for cobertura: sugerir importação
  → Se for fontes: oferecer integração
  → Se for engajamento: enviar insight irresistível
  → Se for conhecimento: forçar análise de padrões
  → Se todos estão ok: empresa está no nível máximo possível com os dados atuais

Neste último caso:
  → Parar de tentar evoluir ativamente
  → Manter modo passivo (esperar novos dados)
  → Apenas reagir se empresário entrar em contato
```

---

> **Fim da Arquitetura da Evolução Cognitiva**
> Próximo: `ARQUITETURA_DA_APRENDIZAGEM_CONTINUA.md` — Ciclo contínuo, lacunas, escala
