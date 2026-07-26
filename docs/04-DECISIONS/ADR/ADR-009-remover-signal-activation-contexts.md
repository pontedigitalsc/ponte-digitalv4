# ADR-009: Remover SignalContext e ActivationContext como Bounded Contexts formais

**Data:** 2026-07-18
**Status:** Aceita

## Contexto

A auditoria arquitetural (`AUDITORIA_ARQUITETURAL.md`) identificou que `SignalContext` e `ActivationContext` são mecanismos técnicos de transporte de dados, não contextos delimitados de negócio. Eles não têm regras de domínio, invariantes, ou eventos de negócio próprios — são canais de comunicação tratados como bounded contexts, inflando artificialmente o numero de contextos e confundindo a arquitetura.

O ARCHITECTURE_DDD.md os lista como bounded contexts formais (P1 da auditoria, Score atual 5/15 em Bounded Contexts). Na prática, `SignalContext` é um barramento primitivo (switch/case) e `ActivationContext` é um pipeline de ativação. Nenhum dos dois deve ser modelado como domínio.

## Decisão

1. Remover `SignalContext` e `ActivationContext` da lista de bounded contexts formais no `ARCHITECTURE_DDD.md`.
2. `SignalContext` passa a ser documentado como "mecanismo de transporte" (infraestrutura), não como contexto de domínio.
3. `ActivationContext` passa a ser documentado como "pipeline de inicialização" (aplicação), não como contexto de domínio.
4. O código existente em `src/engine/` não é movido ou renomeado — apenas a classificação arquitetural muda.
5. O novo event bus formal (ADR-011) substituirá gradualmente o switch/case do `SignalContext`; `ActivationContext` será simplificado quando o pipeline cognitivo contínuo (ADR-013) estiver implementado.

## Alternativas consideradas

- Manter como bounded contexts — rejeitada: infla métrica de "contextos de domínio" com falsos-positivos, esconde a complexidade real do sistema.
- Renomear para "camada de infraestrutura" no código agora — rejeitada: mudança puramente cosmética sem benefício imediato; a reclassificação documental é suficiente até a refatoração real (Fase 2+).

## Consequências

- Positivo: o mapa de bounded contexts passa a refletir apenas contextos reais de negócio.
- Positivo: score de Bounded Contexts sobe de 5/15 para 13/15 (ganho imediato sem código alterado).
- Negativo: o código ainda contém `cognitive-signal-context.ts` e `cognitive-activation-context.ts` — a documentação agora diz uma coisa e o código outra. Aceito como débito temporário até a refatoração física (Fase 2).
