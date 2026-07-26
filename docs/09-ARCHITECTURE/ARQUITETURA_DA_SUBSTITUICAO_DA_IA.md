# Arquitetura da Substituição da IA

> **Programa 12 — Fase 4: Sistema Cognitivo Completo (Nível Sistema Operacional)**
> Versão: 1.0
> Propósito: Projetar o caminho para substituir o LLM por completo — transformando a dependência externa em conhecimento interno determinístico

---

## Preâmbulo

A Ponte Digital hoje depende de um LLM (Large Language Model) para funcionar. A IA traduz o contexto da empresa em recomendações, gera hipóteses, valida padrões, e responde perguntas do empresário.

Mas essa dependência é temporária. O LLM é um motor de inferência externo, caro, não-determinístico, e fora do nosso controle. O objetivo da Ponte Digital é acumular conhecimento suficiente para tomar decisões sem depender de um modelo externo — ou reduzir a dependência ao mínimo possível.

Este documento projeta o caminho da substituição: como, quando e em que ordem cada função da IA pode ser substituída por regras determinísticas baseadas no conhecimento acumulado.

---

## Seção 1 — Princípios da Substituição

### SIA1 — IA é muleta, não destino
O LLM existe porque ainda não temos conhecimento suficiente para tomar decisões sem ele. À medida que acumulamos conhecimento, a dependência diminui.

### SIA2 — Substituição gradual
Cada função da IA é substituída individualmente, quando houver conhecimento determinístico suficiente para substituí-la.

### SIA3 — Nunca substituir o que funciona
Se uma função funciona bem com IA e substituí-la não traz benefício claro (custo, velocidade, determinismo), não substituir.

### SIA4 — A substituição é um sinal de maturidade
Quanto menos IA o sistema precisa, mais maduro ele é. O conhecimento acumulado substitui a inferência externa.

### SIA5 — IA residual sempre existirá
Algumas funções (ex.: entender linguagem natural) sempre precisarão de um modelo de linguagem. O objetivo é reduzir, não eliminar.

---

## Seção 2 — O que a IA Faz Hoje

### 2.1 Funções da IA no Sistema

| Função | Engine | Pode ser substituída? | Quando? |
|:------:|:------:|:---------------------:|:-------:|
| Traduzir contexto natural → dados estruturados | perceptionEngine | Sim | Curto prazo (regras + exemplos) |
| Gerar hipóteses sobre a empresa | analysisEngine | Sim | Médio prazo (padrões + regras) |
| Validar padrões contra dados históricos | validationEngine | Sim | Médio prazo (estatística) |
| Priorizar recomendações | decisionEngine | Sim | Curto prazo (fórmula determinística) |
| Responder perguntas do empresário | interactionEngine | Parcialmente | Longo prazo |
| Explicar recomendações | explanationEngine | Sim | Médio prazo (template + dados) |
| Detectar anomalias sutis | perceptionEngine | Parcialmente | Longo prazo |
| Identificar correlações inesperadas | learningEngine | Parcialmente | Longo prazo |

### 2.2 Dependência Real vs Percebida

Muitas funções que HOJE usam IA poderiam ser substituídas por regras determinísticas IMEDIATAMENTE:

- **Priorização:** Já tem fórmula matemática (5 fatores com pesos) — IA só adiciona ruído
- **Explicação:** Template + dados = explicação — IA é desnecessária
- **Contextualização:** Regras de janela temporal, TTL, referências — tudo determinístico
- **Detecção de anomalias óbvias:** Thresholds fixos — IA não adiciona valor

Funções que REALMENTE precisam de IA:
- **Interpretação de linguagem natural:** Empresário fala "tô apertado" → sistema precisa entender
- **Anomalias não-óbvias:** Padrões que não estão em thresholds conhecidos
- **Conexões inesperadas:** Correlações que o sistema nunca viu antes

---

## Seção 3 — As 3 Fases da Substituição

### 3.1 Fase 1 — IA como Principal (Atual — V4 Founder)

```
IA faz:       Tudo que envolve inferência
Sistema faz:  Coleta, armazena, executa ações determinísticas
```

**Custo:** Alto (LLM caro)

**Dependência:** Total — sem IA, o sistema não funciona

**Nesta fase, o sistema está APRENDENDO o que mais tarde substituirá a IA.**

### 3.2 Fase 2 — IA como Apoio

```
IA faz:       Interpretar linguagem natural, anomalias sutis, conexões inesperadas
Sistema faz:  Priorizar, explicar, contextualizar, detectar anomalias óbvias
```

**Custo:** Médio (LLM só para casos complexos)

**Dependência:** Parcial — sem IA, o sistema funciona para 70% dos casos

**Nesta fase, o sistema já substituiu a IA em funções determinísticas.**

### 3.3 Fase 3 — IA como Exceção

```
IA faz:       Apenas interpretar linguagem natural (entrada do empresário)
Sistema faz:  TODO o resto — raciocínio, decisão, explicação
```

**Custo:** Baixo (LLM só para entender o que o empresário disse)

**Dependência:** Mínima — sem IA, o sistema funciona, mas não entende perguntas novas

---

## Seção 4 — O Motor de Regras Cognitivas (Substituto da IA)

O Motor de Regras Cognitivas é o componente que substitui a IA em funções determinísticas.

### 4.1 Como Funciona

```typescript
interface CognitiveRule {
  id: string;
  name: string;
  domain: string;          // "risco", "oportunidade", "anomalia", "prioridade"
  condition: RuleCondition; // expressão lógica
  action: RuleAction;      // o que fazer se condição for verdadeira
  confidence: number;      // 0.0 a 1.0 (quão confiável é a regra)
  source: string;          // "aprendizado", "manual", "coletivo"
  weight: number;          // peso da regra na decisão final
  version: number;
  createdAt: Date;
  updatedAt: Date;
}

type RuleCondition = {
  operator: 'AND' | 'OR' | 'NOT';
  conditions: RuleCondition[] | AtomicCondition[];
};

type AtomicCondition = {
  field: string;           // "cash_burn_meses"
  operator: '<' | '>' | '==' | 'BETWEEN' | 'IN' | 'CHANGED';
  value: any;
};

type RuleAction = {
  type: 'ALERT' | 'RECOMMEND' | 'PRIORITIZE' | 'SILENCE' | 'CLASSIFY';
  params: Record<string, any>;
};
```

### 4.2 Exemplos de Regras

```typescript
// Regra aprendida: cash burn < 6 meses + tendência negativa = alerta
{
  id: "rule_cash_burn_001",
  name: "Alerta de fluxo de caixa crítico",
  domain: "risco",
  condition: {
    operator: "AND",
    conditions: [
      { field: "cash_burn_meses", operator: "<", value: 6 },
      { field: "tendencia_receita", operator: "<", value: 0 }
    ]
  },
  action: { type: "ALERT", params: { severity: "high", message: "..." }},
  confidence: 0.92,
  source: "aprendizado",
  weight: 0.8
}

// Regra manual: inadimplência > 15% = alerta
{
  id: "rule_inadimplencia_001",
  name: "Alerta de inadimplência alta",
  domain: "risco",
  condition: {
    operator: "AND",
    conditions: [
      { field: "inadimplencia_percentual", operator: ">", value: 15 }
    ]
  },
  action: { type: "ALERT", params: { severity: "medium" }},
  confidence: 0.95,
  source: "manual",
  weight: 1.0
}
```

### 4.3 O Ciclo de Aprendizado de Regras

O motor de regras não é estático — ele APRENDE novas regras a partir de:

1. **Decisões da IA:** Quando a IA toma uma decisão, o sistema extrai a regra implícita e a armazena
2. **Padrões coletivos:** Quando um padrão se repete em N empresas, ele vira uma regra
3. **Feedback do empresário:** Quando o empresário aceita/rejeita uma recomendação, o sistema ajusta o peso da regra
4. **Regras manuais:** Engenheiros podem criar regras manualmente

---

## Seção 5 — A Substituição por Domínio

### 5.1 Alto Potencial de Substituição (curto prazo)

| Domínio | Substituído por | Benefício |
|:-------:|:---------------:|:---------:|
| Priorização de recomendações | Fórmula de 5 fatores (já existe) | Zero IA, mais rápido, determinístico |
| Explicação de recomendações | Template + dados + regra | Zero IA, mais consistente |
| Classificação de urgência | Thresholds + regras | Zero IA, mais preciso |
| Detecção de anomalias óbvias | Thresholds + regras | Zero IA, mais rápido |

### 5.2 Médio Potencial de Substituição

| Domínio | Substituído por | Benefício |
|:-------:|:---------------:|:---------:|
| Geração de hipóteses | Combinação de regras + padrões coletivos | Menos IA, mais preciso |
| Validação de padrões | Estatística (testes de hipótese) | Zero IA, mais rigoroso |
| Detecção de tendências | Regressão linear + thresholds | Zero IA, mais rápido |
| Classificação de estágio evolutivo | Árvore de decisão baseada em indicadores | Zero IA, mais consistente |

### 5.3 Baixo Potencial de Substituição (longo prazo)

| Domínio | Substituído por | Benefício |
|:-------:|:---------------:|:---------:|
| Interpretação de linguagem natural | Modelo de NLP próprio (menor, mais barato, treinado nos dados da Ponte) | Menos dependência de LLM externo |
| Anomalias sutis | Modelo estatístico avançado + machine learning | Mais preciso, mas ainda precisa de ML |
| Conexões inesperadas | Descoberta automatizada de correlações | ML sempre será necessário |

### 5.4 Nunca Substituível

| Função | Motivo |
|:------:|:------:|
| Entender "tô apertado" como "preciso de ajuda financeira" | Linguagem natural sempre precisará de algum modelo |
| Detectar sarcasmo, ironia, emoção | Matéria de NLP avançado |
| Interpretar contextos ambíguos | Exige compreensão semântica |

---

## Seção 6 — A Curva de Substituição

```
Dependência de IA (%)
│
100% ┤▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ Fase 1 (Atual)
│   ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
│   ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
 70% ┤░░░░░░░░░░░░░░░░░░░░▓▓▓▓▓▓▓▓▓▓▓▓▓▓ Fase 2
│   ░░░░░░░░░░░░░░░░░░░░░░▓▓▓▓▓▓▓▓▓▓▓▓▓▓
│   ░░░░░░░░░░░░░░░░░░░░░░▓▓▓▓▓▓▓▓▓▓▓▓▓▓
 30% ┤░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▓▓▓▓ Fase 3
│   ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▓▓▓▓
│   ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▓▓▓▓
 10% ┤░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ Meta
│
└───────────────────────────────────────────► Tempo
    2025    2026    2027    2028    2029
```

### 6.1 Marcos da Curva

| Marco | Dependência | Condição para atingir |
|:-----:|:-----------:|:---------------------:|
| Hoje (2025) | 100% | — |
| Priorização sem IA | ~85% | Implementar fórmula de prioridade (já especificada) |
| Explicação sem IA | ~75% | Implementar template engine de explicações |
| Anomalias óbvias sem IA | ~65% | Coletar thresholds de 100+ empresas |
| Hipóteses sem IA | ~50% | Acumular 10.000+ padrões no motor de regras |
| Validação sem IA | ~40% | Acumular 50.000+ correlações validadas |
| NLP próprio | ~20% | Ter dados suficientes para treinar modelo próprio |
| Meta (2029+) | ~10% | Motor de regras maduro o suficiente |

---

## Seção 7 — Riscos da Substituição

### 7.1 Risco de Substituição Precoce

**Problema:** Substituir a IA antes de ter regras determinísticas suficientes.

**Efeito:** Recomendações piores, mais genéricas, menos úteis.

**Mitigação:** Cada substituição só acontece quando a regra tem confiança > 0.85 e foi validada em pelo menos 100 casos.

### 7.2 Risco de Regras Engessadas

**Problema:** Regras determinísticas não capturam nuances que a IA captura.

**Efeito:** Sistema perde sensibilidade para casos atípicos.

**Mitigação:** Manter IA como fallback para casos onde a confiança das regras é baixa.

### 7.3 Risco de Viés de Regras

**Problema:** Regras aprendidas de um conjunto limitado de empresas podem ter viés.

**Efeito:** Recomendações enviesadas para empresas fora do perfil de treinamento.

**Mitigação:** Regras são sempre validadas contra o patrimônio coletivo antes de ativadas.

---

## Seção 8 — A IA Residual

Mesmo na Fase 3, a IA ainda existe — mas em funções específicas:

### 8.1 NLP Residual

A IA interpreta a linguagem natural do empresário. O que o empresário diz → o sistema entende.

Isso é feito por um modelo de NLP (não necessariamente um LLM grande). Pode ser:
- **Hoje:** GPT-4 (LLM grande e caro)
- **Fase 2:** Modelo de NLP especializado (menor, treinado nos dados da Ponte)
- **Fase 3:** Modelo de NLP leve (edge computing, rodando local)

### 8.2 Descoberta Residual

A IA identifica padrões que o motor de regras não previu.

Exemplo: "Empresas que contratam em janeiro têm 40% mais chance de crise em março" — nenhuma regra previa isso. A IA descobre, e o motor de regras aprende.

---

## Seção 9 — Descobertas, Pressupostos, Lacunas, Riscos

### Descobertas

1. A maioria das funções "inteligentes" do sistema (priorização, explicação, classificação) JÁ pode ser substituída por regras determinísticas — não estamos fazendo isso porque a Fase V4 Founder prioriza velocidade sobre otimização.
2. A priorização sem IA é a substituição mais fácil e de maior impacto — implementar a fórmula de 5 fatores custa quase zero e elimina 15% das chamadas de LLM.
3. A IA nunca será completamente eliminada — linguagem natural sempre precisará de algum modelo. Mas a dependência pode cair de 100% para ~10%.

### Pressupostos

1. **P1:** O motor de regras aprenderá rápido o suficiente para substituir a IA dentro de 3-4 anos.
2. **P2:** Empresários aceitarão recomendações de regras determinísticas tanto quanto aceitam recomendações "inteligentes" da IA.

### Lacunas

1. **L1:** O mecanismo de extração de regras a partir de decisões da IA não foi especificado (como transformar "IA decidiu X" em "regra: se condição Y, então faça Z"?).
2. **L2:** O modelo de NLP próprio (Fase 3) não foi especificado — arquitetura, treinamento, dados necessários.
3. **L3:** A validação de regras contra o patrimônio coletivo não foi detalhada.

### Riscos

1. **R1 — Perda de nuance:** Regras determinísticas podem ser muito rígidas para capturar situações complexas.
2. **R2 — Custo de manutenção de regras:** Milhares de regras precisam ser mantidas, validadas e atualizadas.
3. **R3 — Ilusão de substituição:** O sistema pode parecer "inteligente" com regras, mas ser frágil diante de situações imprevistas.

### Conflitos

Nenhum. A substituição da IA respeita:
- ADR-017 (IA como tradutora de contexto) — a IA nunca decidiu; substituir a inferência por regras é natural
- Lei 1 (determinismo) — regras são mais determinísticas que LLM
- Lei 5 (rastreabilidade) — regras são mais rastreáveis que LLM

### Impacto Futuro

1. A substituição da IA é o que torna a Ponte Digital sustentável economicamente em escala (custo de LLM é o maior custo variável).
2. A Fase V4 Founder não precisa implementar substituição — mas o plano deve existir para guiar as decisões de hoje (ex.: não criar dependência desnecessária de IA em novas funcionalidades).
