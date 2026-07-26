# Observabilidade do Fundador — Painel Conceitual

**Propósito:** Definir o que o fundador precisa enxergar para administrar a Ponte Digital com base em dados, não em intuição.

**Nota:** Este documento descreve o painel conceitual. Nenhuma funcionalidade será criada neste programa. O painel será implementado quando houver evidência e RFC aprovada.

---

## 1. Métricas Tradicionais

Métricas de negócio padrão para qualquer empresa.

### Receita e Crescimento

| Métrica | Definição | Fonte de dados | Frequência |
|---------|-----------|----------------|------------|
| MRR | Receita mensal recorrente | `Transacao` (RECEITA, recorrente) | Mensal |
| Receita total | Soma de todas as receitas | `Transacao` (RECEITA) | Mensal |
| Custos totais | Soma de todas as despesas | `Transacao` (DESPESA) | Mensal |
| Margem bruta | (Receita - Custos) / Receita | Derivado | Mensal |
| Run rate | MRR × 12 | Derivado | Mensal |
| Ticket médio | Receita total / Total de clientes | Derivado | Mensal |

### Clientes

| Métrica | Definição | Fonte | Frequência |
|---------|-----------|-------|------------|
| Total de clientes ativos | `Cliente` com status ATIVO | `Cliente.status` | Mensal |
| Clientes novos no mês | Clientes com `createdAt` no mês | `Cliente.createdAt` | Mensal |
| Churn rate | Clientes cancelados / Total no início do mês | `Cliente.status` (CANCELADO) | Mensal |
| NPS | Pesquisa de satisfação (0-10) | A implementar | Trimestral |

### Comercial

| Métrica | Definição | Fonte | Frequência |
|---------|-----------|-------|------------|
| Leads novos | Leads criados no período | `Lead.createdAt` | Semanal |
| Taxa de conversão | FECHADO_GANHO / Total leads | `Lead.estagio` | Mensal |
| Ciclo de venda médio | Dias entre CONTATO e FECHADO_GANHO | `Lead.estagio` + timestamps | Por lead |
| Pipeline total | Soma de `Lead.valor` em aberto | `Lead.valor` | Semanal |

---

## 2. Métricas Cognitivas

Métricas que medem o patrimônio intelectual da empresa.

### Patrimônio de Conhecimento

| Métrica | Definição | Fonte | Frequência |
|---------|-----------|-------|------------|
| Índice de Conhecimento Gerado | Total de `ConhecimentoValidado` com score ≥ 60 | `ConhecimentoValidado` | Semanal |
| Quantidade de decisões aprendidas | Total de `Outcome` registrados com feedback | `Outcome` + `FeedbackAcao` | Semanal |
| Hipóteses validadas | `Hipotese` com status CONFIRMADA | `Hipotese.status` | Mensal |
| Hipóteses rejeitadas | `Hipotese` com status REJEITADA | `Hipotese.status` | Mensal |
| Taxa de validação | Validadas / (Validadas + Rejeitadas) | Derivado | Mensal |

### Qualidade do Conhecimento

| Métrica | Definição | Fonte | Frequência |
|---------|-----------|-------|------------|
| Confiança média do conhecimento | Média de `scoreConfiança` em conhecimentos ativos | `ConhecimentoValidado` | Mensal |
| Cobertura cognitiva | % de categorias de aprendizado com ≥ 1 registro | `Aprendizado.categoria` | Mensal |
| Evolução do patrimônio intelectual | Delta de conhecimento entre meses | Derivado | Mensal |
| Redução de incerteza | (Hipóteses validadas + rejeitadas) / Total de hipóteses | Derivado | Mensal |

### Engajamento Cognitivo

| Métrica | Definição | Fonte | Frequência |
|---------|-----------|-------|------------|
| Ciclos cognitivos completados | Eventos de `ciclo_completado` | `EventoAtivacao` | Semanal |
| Aprendizados por semana | `Aprendizado` criados na semana | `Aprendizado.createdAt` | Semanal |
| Feedback rate | % de ações cognitivas com feedback | `FeedbackAcao` / `AcaoCognitiva` | Semanal |
| Sinais processados | `HistoricoSinal` processados no período | `HistoricoSinal` | Semanal |

---

## 3. Painel do Fundador — Layout Conceitual

### Visão Geral (topo)

```
┌─────────────────────────────────────────────────────────┐
│  📊 EMPRESA ZERO — PAINEL DO FUNDADOR         [data]    │
│                                                         │
│  ┌──────┐  ┌──────────┐  ┌──────────┐  ┌────────────┐  │
│  │ MRR  │  │ Clientes │  │  Churn   │  │ Conhecimen-│  │
│  │ R$ 0 │  │    0     │  │   0%     │  │ to: 0      │  │
│  └──────┘  └──────────┘  └──────────┘  └────────────┘  │
└─────────────────────────────────────────────────────────┘
```

### Métricas Tradicionais (meio-esquerda)

```
┌───────────────────────────────────────┐
│  RECEITA                  ┌─────────┐ │
│  ├── MRR: R$ 0           │ 📈 Graf │ │
│  ├── Receita: R$ 0       │   ic    │ │
│  └── Custos: R$ 0        │ Receita │ │
│                           │  x Mês  │ │
│  PIPELINE                 └─────────┘ │
│  ├── Leads abertos: 0                │
│  ├── Em negociação: 0                │
│  └── Pipeline total: R$ 0           │
└───────────────────────────────────────┘
```

### Métricas Cognitivas (meio-direita)

```
┌───────────────────────────────────────┐
│  PATRIMÔNIO INTELECTUAL               │
│  ├── Conhecimentos validados: 0      │
│  ├── Hipóteses: 0 (0V / 0R)         │
│  ├── Decisões aprendidas: 0          │
│  └── Cobertura cognitiva: 0%        │
│                                       │
│  CONFIANÇA MÉDIA                      │
│  ████████░░░░ 0%                     │
│                                       │
│  ÚLTIMOS APRENDIZADOS                 │
│  ├── (vazio — comece a usar!)        │
│  └──                                 │
└───────────────────────────────────────┘
```

### Últimos Eventos Cognitivos (rodapé)

```
┌─────────────────────────────────────────────────────────┐
│  📋 ÚLTIMOS EVENTOS                                     │
│  [data] lead_criado — Novo lead: Empresa X             │
│  [data] hipotese_criada — "Diagnóstico gratuito..."    │
│  [data] venda_realizada — Lead Y fechou em R$ Z        │
└─────────────────────────────────────────────────────────┘
```

---

## 4. Implementação Futura

Este painel será implementado quando:

1. A Empresa Zero tiver gerado dados reais suficientes para preencher as métricas
2. Houver uma hipótese testável sobre o que o fundador precisa ver
3. A RFC de implementação for aprovada

**Até lá:** o fundador deve consultar os dados manualmente via:
- Dashboard do sistema (métricas existentes)
- CRM (pipeline)
- Financeiro (transações)
- Cognitive Observatory (patrimônio intelectual)
- Diário Cognitivo (aprendizados)
