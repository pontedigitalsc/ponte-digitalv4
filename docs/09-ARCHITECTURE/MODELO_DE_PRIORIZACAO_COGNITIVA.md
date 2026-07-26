# Modelo de Priorização Cognitiva

> **Programa 12 — Fase 3: Motor Cognitivo**
> Versão: 1.0
> Propósito: Definir como o Motor classifica estímulos, hipóteses e decisões por prioridade

---

## Preâmbulo

O Motor Cognitivo recebe múltiplos estímulos simultaneamente: conversas, importações, dados novos, ciclos agendados. Cada estímulo pode gerar hipóteses, cada hipótese pode gerar decisões, e cada decisão compete por atenção com as demais.

Sem um modelo de priorização, o Motor trataria tudo como igualmente importante — resultando em paralisia por análise ou intervenções irrelevantes.

Este documento especifica como o Motor classifica cada elemento em 5 categorias: urgente, importante, oportunidade, risco, silêncio — e como ele decide qual processar primeiro.

---

## Seção 1 — As Cinco Categorias de Prioridade

### 1.1 Definição das Categorias

| Categoria | Definição | Ação do Motor |
|-----------|-----------|---------------|
| **URGENTE** | Requer ação imediata. Consequência grave se ignorado. | Intervenção imediata. Nível 4-5. |
| **IMPORTANTE** | Impacto significativo. Pode esperar horas ou dias. | Recomendação no próximo ciclo. Nível 2-3. |
| **OPORTUNIDADE** | Benefício potencial. Sem prejuízo se ignorado. | Sugestão quando contextos permitir. Nível 1-2. |
| **RISCO** | Probabilidade de consequência negativa. | Alerta preventivo. Nível 2-4. |
| **SILÊNCIO** | Irrelevante, redundante ou confiança insuficiente. | Nenhuma ação. Registro interno. Nível 0. |

### 1.2 Matriz Urgência × Impacto

A classificação inicial de qualquer estímulo segue a matriz:

```
                Urgência
              Baixa    Média    Alta
        Alta  IMP      IMP+     URG+
Impacto Média OP       IMP      URG+
        Baixa SIL      OP       IMP
```

Onde:
- **URG+** — Urgente com impacto alto: intervenção imediata (nível 5)
- **URG** — Urgente: intervenção rápida (nível 4)
- **IMP+** — Importante com alto impacto: planejamento prioritário (nível 3)
- **IMP** — Importante: agendar para próximo ciclo (nível 2)
- **OP** — Oportunidade: quando houver contexto (nível 1)
- **SIL** — Silêncio: apenas registro (nível 0)

---

## Seção 2 — Como o Motor classifica

### 2.1 Fórmula de Prioridade

```
Prioridade = Urgencia × 0.4 + Impacto × 0.3 + Confianca × 0.15 + Conviccao × 0.1 + Alinhamento × 0.05
```

Onde (valores já normalizados 0-10):
- **Urgência:** quão rápido precisa de ação (ver Seção 2.2)
- **Impacto:** consequência de ignorar (ver Seção 2.3)
- **Confiança:** score da hipótese ou fonte (ADR-025)
- **Convicção:** tempo sem refutação (ADR-032), normalizado: `min(dias × 0.5 / 730, 1) × 10`
- **Alinhamento:** alinhamento com objetivos ativos da empresa

### 2.2 Atribuição de Urgência

A urgência é atribuída automaticamente com base no tipo de estímulo:

| Tipo de Estímulo | Urgência Base | Moduladores |
|-----------------|:------------:|-------------|
| Sinal financeiro crítico (despesa inesperada, faturamento zero) | 9 | — |
| Sinal de cliente crítico (cancelamento, reclamação grave) | 8 | — |
| Pergunta explícita do empresário | 7 | +1 se sobre dinheiro |
| Sinal financeiro importante (atraso, variação > 30%) | 6 | — |
| Interação do empresário na plataforma | 5 | +1 se navegando em seção crítica |
| Sinal operacional relevante | 4 | — |
| Ciclo agendado | 3 | — |
| Sinal de oportunidade | 2 | — |
| Dado de background (CNPJ, dados públicos) | 1 | — |

### 2.3 Atribuição de Impacto

O impacto é calculado considerando:

```
Impacto = ImpactoFinanceiro × 0.4 + ImpactoOperacional × 0.3 + ImpactoEstrategico × 0.2 + ImpactoRelacional × 0.1
```

- **ImpactoFinanceiro (0-10):** quanto dinheiro está envolvido? (baseado no porte da empresa)
- **ImpactoOperacional (0-10):** quantos processos são afetados?
- **ImpactoEstrategico (0-10):** afeta objetivos de longo prazo?
- **ImpactoRelacional (0-10):** afeta relacionamento com clientes ou fornecedores?

---

## Seção 3 — Hierarquia de Processamento

### 3.1 Fila de Prioridade

O Motor mantém uma fila de prioridade única para cada empresa:

```
Fila: [URGENTE, URGENTE, IMPORTANTE, IMPORTANTE, OPORTUNIDADE, OPORTUNIDADE, RISCO, SILÊNCIO, ...]
         ↑ processa primeiro                                    processa por último ↓
```

### 3.2 Limites por Categoria

| Categoria | Máximo na fila | Quando excede |
|-----------|:--------------:|---------------|
| URGENTE | 3 | O mais antigo é promovido a "ação imediata" (intervenção nível 5) |
| IMPORTANTE | 10 | O de menor prioridade é rebaixado a OPORTUNIDADE |
| OPORTUNIDADE | 20 | O de menor prioridade é arquivado |
| RISCO | 10 | O de menor prioridade é rebaixado a SILÊNCIO |
| SILÊNCIO | Ilimitado | Apenas registro — não afeta processamento |

### 3.3 Processamento por Ciclo

| Ciclo | O que processa |
|-------|---------------|
| Ciclo imediato (após cada interação) | URGENTE + IMPORTANTE prioritário |
| Ciclo diário (noturno) | IMPORTANTE restante + OPORTUNIDADE |
| Ciclo semanal | OPORTUNIDADE restante + RISCO |
| Ciclo mensal | Revisão de toda fila + reclassificação |

---

## Seção 4 — Classificação de Risco

### 4.1 O que é Risco

Risco é uma situação com probabilidade significativa de consequência negativa, mas que ainda não se materializou.

O Motor distingue risco de urgência:
- **Urgência:** a consequência negativa está ocorrendo AGORA
- **Risco:** a consequência negativa PODE ocorrer no futuro

### 4.2 Atribuição de Risco

```
ScoreRisco = Probabilidade × 0.5 + Severidade × 0.3 + TempoEstimado × 0.2
```

- **Probabilidade (0-10):** chances de o risco se materializar (baseado em padrões históricos)
- **Severidade (0-10):** gravidade da consequência se o risco se materializar
- **TempoEstimado (0-10):** quão próximo o risco está (10 = dias, 0 = anos)

### 4.3 Thresholds de Risco

| Score | Classificação | Ação |
|:-----:|:-------------:|------|
| ≥ 80 | Risco Crítico | Alerta imediato (nível 4) |
| ≥ 60 | Risco Alto | Alerta no próximo ciclo (nível 3) |
| ≥ 40 | Risco Médio | Monitoramento (nível 1) |
| ≥ 20 | Risco Baixo | Registro interno |
| < 20 | Não considerado risco | Silêncio |

---

## Seção 5 — Classificação de Oportunidade

### 5.1 O que é Oportunidade

Oportunidade é uma situação com benefício potencial que não requer ação imediata. Diferente de urgência, ignorar uma oportunidade não causa dano.

### 5.2 Atribuição de Oportunidade

```
ScoreOportunidade = BeneficioPotencial × 0.5 + ProbabilidadeSucesso × 0.3 + FacilidadeExecucao × 0.2
```

- **BenefícioPotencial (0-10):** quanto a empresa ganharia
- **ProbabilidadeSucesso (0-10):** chances de o benefício se concretizar
- **FacilidadeExecucao (0-10):** quão fácil é aproveitar a oportunidade

### 5.3 Quando Apresentar uma Oportunidade

Uma oportunidade só é apresentada ao empresário se:
- ScoreOportunidade ≥ 60
- O empresário não está em momento de crise
- Menos de 2 oportunidades foram apresentadas nos últimos 7 dias
- A oportunidade está alinhada com o estado cognitivo da empresa (MODELO_DE_ESTADOS.md)

---

## Seção 6 — Reclassificação de Prioridade

### 6.1 Gatilhos de Reclassificação

A prioridade de um item pode mudar ao longo do tempo:

| Gatilho | Efeito | Quando |
|---------|--------|--------|
| Tempo sem processamento | Prioridade aumenta +1 por dia | Itens IMPORTANTE não processados em 3 dias sobem para URGENTE |
| Nova evidência | Prioridade recalculada | A qualquer momento |
| Mudança de contexto | Prioridade recalculada | Quando o estado da empresa muda |
| Feedback do empresário | Prioridade ajustada | Se o empresário ignora, prioridade cai; se ele age, prioridade sobe |
| Ciclo de revalidação | Prioridade revista | A cada ciclo noturno |

### 6.2 Degradação de Prioridade

Se um item permanece na fila sem processamento por muito tempo:

| Tempo na fila | Efeito na Prioridade |
|:--------------:|:--------------------:|
| 1 dia | -10% |
| 7 dias | -30% (reclassificado para categoria inferior) |
| 30 dias | Arquivado automaticamente |

A exceção são itens marcados como RISCO — eles não degradam (risco não desaparece com o tempo).

---

## Seção 7 — Descobertas, Pressupostos, Lacunas, Riscos

### Descobertas

1. A priorização não precisa ser um motor separado. Ela pode ser implementada como uma função de score aplicada no momento do registro de cada estímulo/hipótese/decisão.
2. A reclassificação por tempo (Seção 6.1) é essencial — sem ela, itens importantes mas não urgentes podem ficar na fila para sempre.
3. Risco e Oportunidade são categorias assimétricas: risco exige alerta preventivo, oportunidade exige timing. A mesma fórmula não serve para ambas.

### Pressupostos

1. **P1:** Os pesos da fórmula de prioridade (0.4, 0.3, 0.15, 0.1, 0.05) são adequados para a maioria dos casos. Podem precisar de calibração por tipo de empresa.
2. **P2:** Máximo de 3 itens URGENTE na fila é suficiente. Empresas em crise podem ter mais.
3. **P3:** Risco não degrada com o tempo — mas talvez devesse (risco que nunca se materializa perde credibilidade).

### Lacunas

1. **L1:** A fórmula de ImpactoFinanceiro (Seção 2.3) depende de conhecer o porte financeiro da empresa — informação que pode não estar disponível no início.
2. **L2:** Reclassificação por feedback do empresário precisa de um mecanismo de detecção de "ignorou vs considerou".
3. **L3:** A prioridade de itens RISCO deveria incluir um fator de "prazo de validade" — risco que não se materializa após X dias deve ser rebaixado.

### Riscos

1. **R1 — Tempestade de urgências:** Se muitos itens são classificados como URGENTE, o efeito é o mesmo que nenhum — o empresário se acostuma e ignora. Mitigação: limite de 3 URGENTE na fila.
2. **R2 — Oportunidade em momento errado:** Apresentar oportunidade de expansão durante uma crise financeira. Mitigação: o estado cognitivo da empresa modula o threshold.
3. **R3 — Risco subnotificado:** Se o Motor subestima riscos (por falta de dados históricos), o empresário não recebe alertas preventivos. Mitigação: nos primeiros 90 dias, usar thresholds mais baixos para risco.

### Conflitos

Nenhum conflito encontrado. ADR-020 e ADR-032 são respeitados e estendidos por este documento.

### Impacto Futuro

1. O modelo de 5 categorias permite que novos tipos de estímulo sejam classificados sem alterar a estrutura.
2. A reclassificação automática garante que itens não sejam esquecidos mesmo em filas longas.
3. A separação entre risco e oportunidade permite que o Motor trate cada um com a sensibilidade adequada.
