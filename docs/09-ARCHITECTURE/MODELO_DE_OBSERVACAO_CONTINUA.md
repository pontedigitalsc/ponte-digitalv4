# Modelo de Observação Contínua

> **Programa 12 — Fase 3: Motor Cognitivo**
> Versão: 1.0
> Propósito: Definir o que, quando e como o Motor observa continuamente a empresa

---

## Preâmbulo

O Motor Cognitivo não espera ser perguntado para pensar. Ele observa continuamente tudo que acontece na empresa: transações, interações, mudanças, padrões. A observação é o primeiro estágio do ciclo de raciocínio e a principal fonte de novos sinais.

Este documento especifica o modelo de observação contínua: o que o Motor monitora, com que frequência, que gatilhos ativam cada tipo de observação, e como ele distingue mudanças significativas de ruído.

---

## Seção 1 — O que observar

### 1.1 Domínios de Observação

O Motor observa 7 domínios da empresa:

| Domínio | O que observa | Fonte |
|---------|--------------|-------|
| FINANCEIRO | Receitas, despesas, fluxo de caixa, margens, inadimplência | Transacoes, importação |
| CLIENTES | Entrada/saída, concentração, satisfação, ciclo de venda | Clientes, contatos, conversas |
| TAREFAS | Volume, conclusão, atraso, delegação | Tarefas |
| OPERAÇÃO | Processos internos, eficiência, gargalos | Dados operacionais |
| MERCADO | Sazonalidade, tendências, concorrência | Coletivo anônimo + perguntas |
| EMPRESÁRIO | Comportamento, frequência, preferências, humor | Interações, conversas |
| SAÚDE COGNITIVA | Confiança das fontes, qualidade das hipóteses, acurácia das decisões | Métricas internas do Motor |

### 1.2 Indicadores por Domínio

Cada domínio tem um conjunto de indicadores observáveis:

**Financeiro:**
- Variação de receita (diária, semanal, mensal)
- Variação de despesa (por categoria)
- Fluxo de caixa livre
- Prazo médio de recebimento
- Prazo médio de pagamento
- Inadimplência (percentual e valor)
- Margem bruta
- Concentração de receita (top clientes)

**Clientes:**
- Taxa de aquisição (novos clientes/semana)
- Taxa de cancelamento (churn)
- Satisfação (baseada em interações)
- Ciclo médio de venda
- Ticket médio
- Concentração de receita por cliente

**Tarefas:**
- Taxa de conclusão
- Idade média de tarefas abertas
- Distribuição por tipo e prioridade
- Tarefas atrasadas

**Empresário:**
- Frequência de login (última semana vs média histórica)
- Seções mais acessadas
- Tempo médio por sessão
- Taxa de resposta a perguntas do Motor
- Taxa de aceitação de recomendações

---

## Seção 2 — Quando observar

### 2.1 Frequências de Observação

| Tipo | Frequência | Gatilho |
|------|:----------:|---------|
| Contínua | A cada mudança de estado | Evento de domínio (nova transação, novo cliente) |
| Ciclo rápido | A cada 5 minutos | Timer (para domínios de alta frequência) |
| Ciclo diário | 1 vez por dia (noturno) | Timer (00:00-04:00) |
| Ciclo semanal | 1 vez por semana | Timer (domingo 02:00) |
| Ciclo mensal | 1 vez por mês | Timer (primeiro dia do mês) |
| Sob demanda | Quando solicitado | Pergunta do empresário ou decisão do Motor |

### 2.2 O que Cada Ciclo Observa

| Ciclo | Financeiro | Clientes | Tarefas | Operação | Mercado | Empresário | Saúde Cognitiva |
|-------|:----------:|:--------:|:-------:|:--------:|:-------:|:----------:|:---------------:|
| Contínua | ✅ | ✅ | ✅ | — | — | ✅ | — |
| Rápido | — | — | — | ✅ | — | — | ✅ |
| Diário | Indicadores | Indicadores | Indicadores | Resumo | — | Resumo | Métricas |
| Semanal | Tendências | Tendências | — | — | ✅ | Tendências | Revisão |
| Mensal | Projeções | Ciclo de vida | — | — | Sazonalidade | Perfil | Acurácia |

---

## Seção 3 — Gatilhos

### 3.1 Gatilhos de Observação

Gatilhos disparam observações específicas. Um gatilho é uma regra que, quando satisfeita, inicia um ciclo de observação focado.

**Gatilhos Financeiros:**
- Despesa registrada > 20% acima da média do período
- Receita cai abaixo do mínimo do mês anterior
- Fluxo de caixa projeta negativo nos próximos 7 dias
- Cliente com pagamento atrasado > 15 dias
- Nova despesa recorrente significativa

**Gatilhos de Clientes:**
- Cliente com mais de 60 dias sem compra
- Novo cliente adquirido (via lead convertido)
- Cliente cancela (churn)
- Reclamação registrada (via conversa ou tarefa)
- Cliente atinge N interações com suporte

**Gatilhos Operacionais:**
- Tarefa venceu sem conclusão
- Tarefa crítica atribuída mas não iniciada
- Implantação de novo cliente parada por mais de 7 dias

**Gatilhos do Empresário:**
- Primeiro login do dia
- Login após ausência > 7 dias
- Navegação em seção que nunca visitou
- Ignorou 3 recomendações consecutivas
- Respondeu positivamente a uma recomendação

**Gatilhos Cognitivos:**
- Nova hipótese registrada
- Hipótese confirmada ou refutada
- Confiança de fonte mudou significativamente (> 30 pontos)
- Conhecimento validado completou 90 dias

### 3.2 Gatilhos Compostos

Gatilhos compostos combinam 2+ condições para reduzir falsos positivos:

| Gatilho Composto | Condições | Dispara |
|-----------------|-----------|---------|
| Crise financeira | (Despesa > 30% acima da média) E (Fluxo de caixa projetado negativo) | Observação de crise + alerta urgente |
| Oportunidade de venda | (Cliente ativo > 90 dias) E (Sem compra nos últimos 30 dias) E (Score de satisfação ≥ 70) | Observação de oportunidade |
| Perda de engajamento | (Frequência de login caiu > 50%) E (Ignorou últimas 3 recomendações) | Observação de risco de abandono |
| Anomalia sistêmica | (Mesmo indicador anômalo em 3+ domínios) E (Sem causa externa conhecida) | Observação aprofundada |

---

## Seção 4 — Mudanças

### 4.1 Classificação de Mudanças

Quando o Motor observa uma mudança, ele a classifica em uma das categorias:

| Categoria | Definição | Exemplo |
|-----------|-----------|---------|
| **ESPERADA** | Mudança dentro do padrão histórico | Vendas de dezembro (já esperado) |
| **TENDÊNCIA** | Mudança gradual e consistente | Receita crescendo 5% ao mês por 3 meses |
| **ANOMALIA** | Desvio significativo do padrão | Despesa triplicou em um mês |
| **REGRESSÃO** | Mudança negativa revertendo progresso | Margem caiu para nível de 6 meses atrás |
| **RUPTURA** | Mudança abrupta sem precedentes | Cliente que representa 40% da receita cancelou |

### 4.2 Detecção de Mudanças

O Motor usa 3 mecanismos para detectar mudanças:

**M1 — Comparação com média histórica:**
```
Desvio = (ValorAtual - MediaHistorica) / DesvioPadrao
Se |Desvio| > 2 → Anomalia
Se |Desvio| > 1 → Tendência (se consistente por 3+ ciclos)
```

**M2 — Detecção de tendência:**
```
Inclinação = regressão linear dos últimos N pontos
Se |Inclinação| > Threshold → Tendência
```

**M3 — Comparação com coletivo:**
```
DesvioColetivo = (ValorEmpresa - MediaColetivo) / DesvioPadraoColetivo
Se DesvioColetivo > 2 → Diferença significativa (pode ser anomalia ou particularidade)
```

---

## Seção 5 — Anomalias

### 5.1 Classificação de Anomalias

| Tipo | Definição | Exemplo |
|------|-----------|---------|
| **PONTO** | Valor isolado muito fora da curva | Despesa de R$ 50 mil em um mês de R$ 10 mil |
| **CONTEXTUAL** | Valor anômalo no contexto mas normal em outro período | Venda de R$ 100 mil em dezembro (contexto de mês típico de R$ 30 mil) |
| **COLETIVA** | Conjunto de valores individuais normais que juntos são anômalos | 5 despesas pequenas que somam 40% da receita |
| **TEMPORAL** | Sequência que foge do padrão temporal | Vendas caem toda sexta-feira (padrão semanal incomum) |

### 5.2 Thresholds de Anomalia

| Domínio | Threshold (desvios padrão) | Confiança Mínima |
|---------|:--------------------------:|:----------------:|
| Financeiro (despesa) | 2.0 | 70 |
| Financeiro (receita) | 1.5 | 60 |
| Clientes (churn) | 2.5 | 80 |
| Clientes (aquisição) | 2.0 | 60 |
| Tarefas (atraso) | 2.0 | 50 |
| Empresário (engajamento) | 1.5 | 40 |

### 5.3 Tratamento de Anomalias

```
Anomalia detectada → Verificar se é erro de dado → Se erro → corrigir e notificar
                  → Se não é erro → Registrar como sinal → Iniciar ciclo de raciocínio
```

Cada anomalia registrada segue o ciclo completo do Documento 1:
1. Percepção (anomalia recebida)
2. Contextualização (inserir no contexto da empresa)
3. Análise (identificar padrão, causa possível)
4. Hipótese (formular explicação)
5. Validação (coletar evidências)
6. Decisão (o que fazer com a anomalia)

---

## Seção 6 — Regressões

### 6.1 Definição

Regressão é uma mudança negativa que reverte parcial ou totalmente um progresso anterior. Uma empresa que melhorou sua margem de 10% para 25% em 6 meses e agora caiu para 15% está em regressão.

### 6.2 Detecção de Regressão

```
Regressão = (ValorPico - ValorAtual) / (ValorPico - ValorBase) × (TempoQueda / TempoSubida)
```

Onde:
- ValorPico: melhor valor do indicador nos últimos 12 meses
- ValorAtual: valor atual do indicador
- ValorBase: valor antes do período de melhora
- TempoQueda: tempo que levou para cair do pico ao atual
- TempoSubida: tempo que levou para subir da base ao pico

Interpretação:
- Score ≥ 0.7 → Regressão severa (perdeu > 70% do progresso)
- Score ≥ 0.4 → Regressão moderada
- Score ≥ 0.2 → Regressão leve
- Score < 0.2 → Variação normal, não é regressão

### 6.3 Tratamento de Regressões

Regressões disparam gatilho de investigação forçada:
1. Identificar quando o progresso começou a reverter
2. Correlacionar com eventos do período (mudança de preço, saída de cliente, nova despesa)
3. Formular hipóteses sobre a causa da regressão
4. Apresentar ao empresário como alerta (nível 3-4)

---

## Seção 7 — Padrões

### 7.1 Tipos de Padrões

| Tipo | Definição | Exemplo |
|------|-----------|---------|
| **CÍCLICO** | Repete em intervalos regulares | Sazonalidade de vendas |
| **TENDÊNCIA** | Direção consistente | Receita cresce 3% ao mês |
| **CORRELAÇÃO** | Duas variáveis se movem juntas | Clientes novos coincidem com campanhas |
| **COMPORTAMENTAL** | Padrão de ação do empresário | Empresário sempre acessa finanças segundas 8h |
| **CAUSAL** | Uma variável causa outra (confirmado) | "Aumentar preço reduz volume" |

### 7.2 Detecção de Padrões

**Padrões cíclicos:**
- Análise de Fourier simplificada: detectar picos recorrentes
- Mínimo: 4 ciclos para confirmar padrão (ex.: 4 meses de sazonalidade)
- Armazenar como conhecimento validado após confirmação

**Padrões de tendência:**
- Regressão linear com R² ≥ 0.7 para considerar tendência
- Mínimo: 6 pontos de dados para estabelecer direção
- Revisão a cada 30 dias

**Padrões de correlação:**
- Coeficiente de Pearson |r| ≥ 0.6 para considerar correlação
- Sempre marcado como CORRELACIONAL (ADR-034)
- Mínimo: 10 pares de observação

### 7.3 Armazenamento de Padrões

Padrões confirmados são armazenados como:
- **Hipóteses** (se correlacionais ou causais) — com tipoCausalidade
- **Conhecimento Validado** (se confirmado por 30+ dias e score ≥ 70)
- **Regra de Negócio** (se ensinado pelo empresário)

---

## Seção 8 — Oportunidades

### 8.1 Detecção de Oportunidades

Oportunidades são detectadas observando:

**O1 — Gap de performance:**
A empresa está abaixo da média do coletivo para empresas similares.
Ex.: "Empresas do seu porte faturam em média R$ X por funcionário. Você fatura R$ Y. Há potencial de crescimento."

**O2 — Momento favorável:**
Indicadores mostram que a empresa está em momento de expansão.
Ex.: "Sua receita cresce 8% ao mês há 3 meses. Talvez seja hora de contratar."

**O3 — Recurso subutilizado:**
A empresa tem capacidade ociosa.
Ex.: "Você tem 3 vendedores mas apenas 10 leads/mês. Talvez seja hora de gerar mais leads."

**O4 — Padrão do coletivo:**
Empresas similares se beneficiaram de uma ação que esta empresa ainda não tomou.
Ex.: "80% das empresas do seu setor que implementaram controle de estoque reduziram custos em 15%."

### 8.2 Confirmação de Oportunidades

Toda oportunidade detectada deve ser validada antes de ser apresentada:
1. Verificar se o empresário já está ciente (perguntar: "Você já considerou X?")
2. Verificar se há restrições que impedem (orçamento, tempo, plano)
3. Apresentar com nível de intervenção 1 (sugestão leve) inicialmente

---

## Seção 9 — Descobertas, Pressupostos, Lacunas, Riscos

### Descobertas

1. A maior parte da observação pode ser feita com indicadores simples (média, desvio padrão, regressão linear) — não requer ML.
2. O maior desafio não é detectar anomalias — é filtrar falsos positivos. Gatilhos compostos (Seção 3.2) reduzem ruído significativamente.
3. A detecção de regressão (Seção 6) é o indicador mais valioso para intervenção — regressão sinaliza que uma melhoria anterior está se perdendo.

### Pressupostos

1. **P1:** 2 desvios padrão é o threshold correto para anomalia financeira. Pode ser muito sensível para empresas pequenas com alta variabilidade.
2. **P2:** Padrões cíclicos precisam de 4 repetições para confirmação. Negócios muito sazonais (ex.: apenas Natal) podem levar um ano para confirmar.
3. **P3:** Regressão linear com R² ≥ 0.7 é adequada para detectar tendências.

### Lacunas

1. **L1:** A detecção de correlação precisa de um mecanismo de pareamento de variáveis — não foi especificado como o Motor decide quais pares de variáveis observar.
2. **L2:** A análise de Fourier simplificada para padrões cíclicos não foi detalhada.
3. **L3:** O mecanismo de "coletivo anônimo" para comparação setorial não foi especificado (quais métricas, como normalizar por porte).

### Riscos

1. **R1 — Falso positivo de anomalia:** Thresholds muito sensíveis geram alarmes desnecessários. Mitigação: gatilhos compostos e confiança mínima por domínio.
2. **R2 — Oportunidade em momento errado:** Detectar oportunidade de expansão quando a empresa está em crise. Mitigação: estado cognitivo modula a apresentação.
3. **R3 — Sobrecarga de observação:** Observar todos os domínios continuamente pode ser caro computacionalmente. Mitigação: ciclos com frequências diferentes (contínuo para crítico, diário para o resto).

### Conflitos

Nenhum conflito com documentos anteriores. Este documento especifica o que os documentos das Fases 1 e 2 (MODELO_DE_AQUISICAO.md, ARQUITETURA_DA_EVOLUCAO_COGNITIVA.md) mencionam como "observação" mas não detalham.

### Impacto Futuro

1. O modelo de gatilhos permite que novos indicadores sejam adicionados sem alterar a estrutura.
2. A detecção de regressão pode alertar o empresário antes que o problema se agrave.
3. A observação contínua alimenta o ciclo de raciocínio sem depender de ação do empresário.
