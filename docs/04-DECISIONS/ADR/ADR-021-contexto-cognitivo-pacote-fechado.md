# ADR-021: Contexto Cognitivo como pacote fechado

**Data:** 2026-07-18
**Status:** Aceita

## Contexto

O MOTOR_COGNITIVO.md (seção 4) define que o Context Engine produz um pacote único e imutável — o Contexto Cognitivo — que é consumido pela Decision Engine e pela IA. Ninguém mais pode produzir contexto.

Hoje o contexto é difuso: cada engine monta seu próprio entendimento da situação. A IA recebe dados brutos e "entende" à sua maneira. Não há uma única fonte de verdade contextual.

## Decisão

1. O Context Engine é o único produtor de Contexto Cognitivo.
2. O Contexto Cognitivo é um pacote fechado e imutável — uma vez produzido, não pode ser alterado.
3. O Contexto Cognitivo contém:
   - Estado cognitivo agregado da empresa
   - Sinais ativos e sua prioridade
   - Conhecimento relevante para o momento
   - Decisões pendentes e seu histórico
   - Métricas de confiança e relevância
4. A Decision Engine consome o Contexto Cognitivo para tomar decisões.
5. A IA consome o Contexto Cognitivo para traduzir em linguagem natural (ADR-017).
6. Nenhum outro módulo ou submotor pode produzir ou modificar contexto.

## Alternativas consideradas

- Contexto distribuído (cada engine produz seu próprio contexto) — rejeitada: sem visão unificada, decisões podem ser contraditórias.
- Contexto mutável — rejeitada: se o contexto muda enquanto a Decision Engine processa, a decisão pode ser baseada em informação inconsistente.

## Consequências

- Positivo: única fonte de verdade contextual para todo o sistema.
- Positivo: decisões são baseadas em um snapshot consistente do estado cognitivo.
- Positivo: a IA sempre recebe o mesmo contexto que a Decision Engine usou — não há divergência.
- Negativo: o Context Engine se torna um ponto de coordenação — precisa coletar informação de todos os submotores antes de produzir o pacote.
- Negativo: pacote imutável significa que atualizações de contexto exigem um novo pacote — frequência de atualização precisa ser calibrada.
