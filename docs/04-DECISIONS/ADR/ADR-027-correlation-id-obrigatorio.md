# ADR-027: Correlation ID obrigatório em todo evento

**Data:** 2026-07-18
**Status:** Aceita

## Contexto

O princípio 19 do MOTOR_COGNITIVO.md estabelece: "Todo evento tem um Correlation ID. Eventos encadeados carregam o mesmo ID de correlação. É possível reconstruir a cadeia causal completa de qualquer conhecimento, decisão ou resultado."

Hoje o sistema não tem rastreabilidade causal:
- Um sinal é emitido, mas não é possível rastrear qual observação o gerou.
- Uma decisão é tomada, mas não é possível rastrear qual conhecimento a fundamentou.
- Um resultado é registrado, mas não é possível ligá-lo à decisão que o causou.

## Decisão

1. Todo evento emitido no sistema (via Event Bus — ADR-011) DEVE carregar um `correlationId`.
2. Eventos encadeados (ex.: Observação → Sinal → Hipótese → Conhecimento) propagam o mesmo `correlationId`.
3. Quando um evento origina múltiplos eventos filho, todos herdam o mesmo `correlationId` raiz, com um `causationId` opcional apontando para o evento específico que o causou.
4. O formato do `correlationId` é `UUIDv7` (ordenável por tempo).
5. O `correlationId` é imutável — uma vez atribuído, não pode ser alterado.
6. É possível reconstruir a cadeia causal completa de qualquer conhecimento, decisão ou resultado a partir do `correlationId`.

## Alternativas consideradas

- Correlation ID opcional — rejeitada: se é opcional, não será usado consistentemente, e a cadeia causal terá lacunas.
- Correlation ID gerado por módulo individualmente — rejeitada: sem coordenação entre módulos, IDs duplicados ou inconsistentes quebram a rastreabilidade.

## Consequências

- Positivo: rastreabilidade causal completa — qualquer conhecimento, decisão ou resultado pode ser rastreado até sua origem.
- Positivo: debugging e auditoria — é possível reconstruir exatamente o que levou a uma decisão.
- Positivo: alinhamento com ADR-013 — o ciclo cognitivo contínuo usa `correlationId` para encadear eventos.
- Negativo: overhead de processamento para gerar e propagar UUIDv7 — insignificante (nanossegundos).
- Negativo: todos os eventos existentes precisam ser migrados para incluir `correlationId` — aceito como custo único.
