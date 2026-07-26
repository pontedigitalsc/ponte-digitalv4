# Modelo de Intervenção

> **Programa 12 — Fase 3: Motor Cognitivo**
> Versão: 1.0
> Propósito: Definir quando e como o Motor intervém na experiência do empresário

---

## Preâmbulo

O Motor Cognitivo não existe para pensar no vácuo. Ele existe para ajudar o empresário a decidir melhor. Isso significa que, em algum momento, o pensamento do Motor precisa se transformar em intervenção — uma ação que afeta a experiência do empresário.

Intervenção mal calibrada é pior que nenhuma intervenção: interrompe, irrita, gera desconfiança. Intervenção bem calibrada salva tempo, evita prejuízos, e constrói confiança.

Este documento especifica os 7 níveis de intervenção da Ponte Digital, quando cada um é aplicado e como o Motor transita entre eles.

---

## Seção 1 — Os 7 Níveis de Intervenção

### 1.1 Escala de Intervenção

```
Nível 0: NADA          → Registro interno, nenhuma ação visível
Nível 1: ALERTA         → Notificação sem recomendação
Nível 2: PERGUNTA       → Solicitação de informação
Nível 3: RECOMENDAÇÃO   → Sugestão de ação
Nível 4: TAREFA         → Criação de tarefa automática
Nível 5: PLANO          → Plano de ação completo
Nível 6: ACOMPANHAMENTO → Monitoramento contínuo pós-intervenção
```

Cada nível engloba o anterior. Uma intervenção de nível 4 (TAREFA) também inclui os elementos dos níveis 1-3 (alerta, pergunta, recomendação).

### 1.2 Mapa de Decisão de Intervenção

```
                      ┌──────────────────┐
                      │  Hipótese        │
                      │  Validada        │
                      └────────┬─────────┘
                               │
                               ▼
                      ┌──────────────────┐
                      │  Confiança ≥ 90? │─── Sim ──► Nível 5-6
                      └────────┬─────────┘
                               │ Não
                               ▼
                      ┌──────────────────┐
                      │  Confiança ≥ 80? │─── Sim ──► Nível 4
                      └────────┬─────────┘
                               │ Não
                               ▼
                      ┌──────────────────┐
                      │  Confiança ≥ 60? │─── Sim ──► Nível 3
                      └────────┬─────────┘
                               │ Não
                               ▼
                      ┌──────────────────┐
                      │  Confiança ≥ 40? │─── Sim ──► Nível 1-2
                      └────────┬─────────┘
                               │ Não
                               ▼
                          Nível 0 (Silêncio)
```

---

## Seção 2 — Nível 0: NADA (Silêncio)

### 2.1 Quando

O Motor não faz nada quando:
- Confiança < 40 para qualquer intervenção
- ScoreRelevância < 30 (ver MODELO_DE_CONTEXTO.md)
- O empresário está em modo "não perturbe" (ignorou últimas 3 intervenções)
- É período noturno e o sinal não é crítico
- Empresa em fase de observação inicial (< 7 dias)

### 2.2 O que acontece

- Nada é mostrado ao empresário
- O ciclo de raciocínio é registrado internamente (patrimônio cognitivo)
- O Motor continua observando para ver se a confiança evolui
- Se após 7 dias a confiança não mudou, a hipótese é arquivada

### 2.3 Transição de nível

O Motor sobe de nível se:
- Novas evidências aumentam a confiança
- O contexto muda (ex.: empresário está online)
- O tempo passa sem que o sinal seja resolvido (a urgência aumenta)

---

## Seção 3 — Nível 1: ALERTA

### 3.1 Quando

Alerta quando:
- Confiança ≥ 40 mas < 60
- Risco detectado com ScoreRisco ≥ 40 (ver MODELO_DE_PRIORIZACAO_COGNITIVA.md)
- Anomalia detectada com |Desvio| > 2 (ver MODELO_DE_OBSERVACAO_CONTINUA.md)
- Regressão detectada com Score ≥ 0.4

### 3.2 Formato

O alerta é uma notificação passiva:
- **Onde:** Centro de Notificações, badge no dashboard
- **Conteúdo:** O fato observado, sem recomendação
- **Tom:** Informativo, não alarmista
- **Exemplo:** "Sua despesa com fornecedores aumentou 25% este mês."

### 3.3 Regras

- Alerta não exige resposta do empresário
- Máximo 2 alertas por dia (exceto CRÍTICO)
- Alerta não repetido (se o empresário ignorou, próximo alerta é sobre assunto diferente)

---

## Seção 4 — Nível 2: PERGUNTA

### 4.1 Quando

Pergunta quando (ver MODELO_DE_PERGUNTAS_INTELIGENTES.md):
- Falta informação crítica para decidir
- Hipótese inconclusiva precisa de desempate
- Inferência precisa de validação
- Lacuna de conhecimento no onboarding

### 4.2 Formato

A pergunta é contextualizada e objetiva:
- **Onde:** Inline na interface (no momento apropriado), chat, ou notificação com call-to-action
- **Conteúdo:** A pergunta + contexto do porquê
- **Tom:** Curioso, não interrogativo
- **Exemplo:** "Notei que você não definiu margem de lucro dos seus produtos. Para eu poder calcular sua saúde financeira, qual a margem média?"

### 4.3 Regras

- Máximo 3 perguntas/dia (exceto onboarding: 10 no primeiro dia)
- Perguntas com ValorLíquido < 0 nunca são feitas
- Se o empresário ignora, a pergunta expira em 48h

---

## Seção 5 — Nível 3: RECOMENDAÇÃO

### 5.1 Quando

Recomenda quando:
- Confiança ≥ 60 mas < 80
- Hipótese CONFIRMADA com impacto médio ou alto
- ScoreOportunidade ≥ 60

### 5.2 Formato

A recomendação é uma sugestão com justificativa:
- **Onde:** Centro de Decisão, card no dashboard, chat
- **Conteúdo:** Ação sugerida + por que + evidências base + confiança
- **Tom:** Sugestivo, não imperativo
- **Exemplo:** "Com base no aumento consistente de receita nos últimos 3 meses (confiança 75), recomendo considerar a contratação de um vendedor. O quê você acha?"

### 5.3 Regras

- Recomendação sempre inclui nível de confiança
- Recomendação sempre oferece "Sim/Não/Me explique mais" como opções de resposta
- Se o empresário rejeita, a confiança da hipótese base é reduzida em 10 pontos
- Máximo 2 recomendações/dia

---

## Seção 6 — Nível 4: TAREFA

### 6.1 Quando

Cria tarefa quando:
- Confiança ≥ 80 mas < 95
- Ação claramente definida e de baixo risco
- Ação que o empresário já realizou antes (padrão conhecido)
- Ação com prazo crítico (ex.: pagar conta que vence amanhã)

### 6.2 Formato

A tarefa é criada automaticamente no sistema de tarefas:
- **Onde:** Lista de tarefas da empresa, com badge "Sugerida pelo Motor"
- **Conteúdo:** Título, descrição, prazo, prioridade, origem (qual hipótese gerou)
- **Tom:** Direto, com justificativa sucinta
- **Exemplo:** Tarefa criada: "Pagar fornecedor X — vence amanhã (R$ 5.000,00). Gerado a partir de alerta de vencimento."

### 6.3 Regras

- Tarefa é criada como "pendente" — o empresário confirma ou cancela
- Se o empresário não interage com a tarefa em 48h, o Motor pergunta se deve mantê-la
- Máximo 1 tarefa automática por dia
- Tarefas financeiras (pagamento, cobrança) requerem confiança ≥ 90

---

## Seção 7 — Nível 5: PLANO

### 7.1 Quando

Cria plano quando:
- Confiança ≥ 90
- Impacto alto (ScoreImpacto ≥ 7)
- Ação requer múltiplos passos
- Ação envolve múltiplos domínios (ex.: financeiro + operacional)

### 7.2 Formato

O plano é uma sequência de passos com prazos e responsáveis:
- **Onde:** Seção de Planos no Centro de Decisão
- **Conteúdo:** Objetivo, passos, prazos, recursos necessários, métricas de sucesso, riscos
- **Tom:** Estruturado, com visão de longo prazo
- **Exemplo:** "Plano de Redução de Custos: (1) Revisar fornecedores até 15/08, (2) Renegociar contratos até 30/08, (3) Implementar controle de despesas até 15/09."

### 7.3 Regras

- Plano requer aprovação explícita do empresário para ser ativado
- Após aprovação, o Motor acompanha cada passo (Nível 6)
- Máximo 1 plano ativo por vez
- Planos arquivados após 90 dias sem conclusão

---

## Seção 8 — Nível 6: ACOMPANHAMENTO

### 8.1 Quando

Acompanha quando:
- Uma tarefa (Nível 4) ou plano (Nível 5) foi ativado
- O empresário solicitou acompanhamento explícito
- Uma decisão importante foi tomada e o resultado precisa ser monitorado

### 8.2 Como funciona

O acompanhamento transforma o Motor em observador ativo da execução:

```
T0: Tarefa/plano criado
T1: Motor observa progresso (ciclo diário)
T2: Se prazo próximo sem progresso → alerta (Nível 1)
T3: Se prazo estourou → nova recomendação (Nível 3)
T4: Se concluído → registrar resultado → aprender com o resultado
T5: Se conclusão parcial → ajustar plano
```

### 8.3 Métricas de Acompanhamento

O Motor monitora:
- Progresso (%) em relação ao prazo
- Desvio de cronograma (dias de atraso)
- Barreiras encontradas (tarefas bloqueadas)
- Resultados parciais vs esperados

### 8.4 Regras

- Acompanhamento gera no máximo 1 alerta por semana para o mesmo plano
- Se o plano está parado há 30 dias sem progresso, o Motor pergunta se deve cancelar
- Acompanhamento termina quando o plano é concluído ou cancelado

---

## Seção 9 — Transições entre Níveis

### 9.1 Subindo de Nível

```
Nível 0 → Nível 1: Confiança ≥ 40 ou anomalia/regressão detectada
Nível 1 → Nível 2: Informação adicional necessária para validar hipótese
Nível 2 → Nível 3: Resposta da pergunta confirmou hipótese (confiança ≥ 60)
Nível 3 → Nível 4: Empresário aceitou recomendação ou confiança ≥ 80
Nível 4 → Nível 5: Tarefa revelou necessidade de múltiplos passos
Nível 5 → Nível 6: Plano foi aprovado pelo empresário
```

### 9.2 Descendo de Nível

```
Nível 6 → Nível 5: Plano concluído ou cancelado → volta a observar
Nível 5 → Nível 3: Empresário rejeitou plano → volta a recomendar alternativas
Nível 4 → Nível 3: Empresário cancelou tarefa → volta a recomendar
Nível 3 → Nível 1: Empresário rejeitou recomendação → volta a alertar
Nível 2 → Nível 0: Empresário ignorou pergunta por 48h → silêncio
Nível 1 → Nível 0: Contexto mudou e alerta perdeu relevância
```

### 9.3 Transição Forçada

- **Urgência:** Se um sinal CRÍTICO chega, o Motor pode pular níveis e ir direto ao nível apropriado.
- **Saturação:** Se o empresário ignorou 3 intervenções consecutivas, o Motor desce 2 níveis automaticamente.
- **Feedback explícito:** O empresário pode dizer "cala a boca" (ou similar) → o Motor desce para Nível 0 por 24h.

---

## Seção 10 — Canais de Intervenção

O nível de intervenção também determina o canal:

| Nível | Canal Principal | Canal Alternativo |
|:-----:|:---------------:|:-----------------:|
| 0 | Nenhum | — |
| 1 | Centro de Notificações | Badge no dashboard |
| 2 | Inline na interface | Chat |
| 3 | Centro de Decisão | Dashboard card, Chat |
| 4 | Lista de tarefas | Notificação |
| 5 | Seção de Planos | Centro de Decisão |
| 6 | Acompanhamento na tarefa/plano | Notificação semanal |

---

## Seção 11 — Descobertas, Pressupostos, Lacunas, Riscos

### Descobertas

1. A escala de 7 níveis cobre todos os estados de intervenção identificados nos fluxos existentes da plataforma (FLUXO_DA_PRIMEIRA_CONVERSA.md, ARQUITETURA_DA_PRIMEIRA_PERCEPCAO_DE_VALOR.md).
2. A transição entre níveis é mais importante que o nível em si — um Motor que sobe e desce de nível corretamente parece "inteligente"; um que fica preso em um nível parece "burro".
3. O acompanhamento (Nível 6) é o nível mais importante para construir confiança de longo prazo — mostra que o Motor não apenas recomenda, mas se importa com o resultado.

### Pressupostos

1. **P1:** Empresários preferem recomendações no Centro de Decisão a notificações pop-up. Validar com dados de uso.
2. **P2:** 2 recomendações e 3 perguntas por dia é o limite aceitável. Pode variar por perfil de empresário.
3. **P3:** Tarefas automáticas com confiança ≥ 80 são bem recebidas. Alguns empresários podem preferir autorizar explicitamente.

### Lacunas

1. **L1:** Não foi especificado como o Motor detecta "o empresário ignorou" vs "o empresário não viu" (crucial para transição de níveis).
2. **L2:** Plano de ação (Nível 5) precisa de um template ou estrutura — não foi definido como o Motor monta um plano.
3. **L3:** Cancelamento de plano pelo empresário não tem fluxo de "aprendizado" — se o plano foi rejeitado, o Motor deveria aprender por quê.

### Riscos

1. **R1 — Intervenção excessiva:** Se todos os níveis disparam no mesmo dia, o empresário recebe múltiplas comunicações. Mitigação: limites diários por nível e teto absoluto de 5 intervenções/dia.
2. **R2 — Acompanhamento obsessivo:** O Nível 6 pode parecer "vigilância" se gerar alertas muito frequentes. Mitigação: máximo 1 alerta/semana por plano.
3. **R3 — Tarefa automática indesejada:** Criar uma tarefa que o empresário não quer pode gerar retrabalho. Mitigação: tarefa sempre como "pendente" (requer confirmação).

### Conflitos

Nenhum conflito encontrado. Este documento é consistente com o nível de intervenção mencionado na Seção 7 do Documento 1 (ARQUITETURA_DO_RACIOCINIO_COGNITIVO.md) e expande o modelo para 7 níveis.

### Impacto Futuro

1. A escala de 7 níveis permite granularidade fina na calibragem da intervenção.
2. O acompanhamento pós-intervenção fecha o ciclo de aprendizado — o Motor vê o resultado de suas recomendações.
3. A transição entre níveis pode ser automatizada com regras determinísticas, sem ML.
