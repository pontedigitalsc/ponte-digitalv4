# ADR-020: Algoritmo de priorização do Motor

**Data:** 2026-07-18
**Status:** Aceita

## Contexto

O MOTOR_COGNITIVO.md (seção 9) define a fórmula conceitual de priorização como:

```
Prioridade = urgencia × impacto × confianca × alinhamento × momento
```

Hoje não há algoritmo de priorização. Sinais, recomendações e decisões são processados por ordem de chegada (FIFO) ou por agendamento fixo. Não há diferenciação entre "algo urgente que precisa de atenção agora" e "algo que pode esperar".

## Decisão

1. O algoritmo de priorização acima é o único mecanismo de priorização do sistema.
2. Cada fator é normalizado em uma escala de 0 a 1:
   - `urgencia`: quão próximo está o prazo / threshold de alerta
   - `impacto`: potencial de dano ou ganho para o negócio
   - `confianca`: score de confiança do conhecimento (ADR-025)
   - `alinhamento`: quão alinhado está com os objetivos atuais da empresa
   - `momento`: sazonalidade / contexto temporal
3. O resultado `Prioridade` é um número entre 0 e 1 que determina:
   - Ordem de processamento dos sinais no pipeline cognitivo
   - Ordem de apresentação de recomendações ao empresário
   - O que deve ser mantido em Working Memory vs movido para Short Term
4. O algoritmo é aplicado pelo Priority Engine, um dos 16 submotores do Motor.

## Alternativas consideradas

- FIFO ou agendamento fixo — rejeitada: não diferencia o importante do urgente. Uma crise financeira tem o mesmo tratamento que uma observação rotineira.
- Heurística simples (ex.: só urgencia × impacto) — rejeitada: sem confiança e alinhamento, o algoritmo prioriza ruído. Os 5 fatores são necessários para uma priorização equilibrada.

## Consequências

- Positivo: o sistema prioriza corretamente o que é mais relevante para o empresário no momento.
- Positivo: a fórmula é transparente — o empresário pode entender por que algo foi priorizado.
- Negativo: a calibração dos fatores (pesos relativos) exige experimentação com dados reais.
- Negativo: `confianca` depende de ADR-025 estar implementada — há dependência entre as ADRs.
