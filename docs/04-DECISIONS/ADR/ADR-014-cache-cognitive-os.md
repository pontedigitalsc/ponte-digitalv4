# ADR-014: Política de cache do Cognitive OS (futura)

**Data:** 2026-07-18
**Status:** Aceita (futura — implementação na Fase 4)

## Contexto

`obterEstadoCognitivoCompleto` é chamado em toda navegação no dashboard e executa 8+ queries em paralelo. Não há cache. A auditoria (P12) classifica como ALTA gravidade, mas a implementação de cache depende do Event Bus (ADR-011) e do agregado unificado (ADR-010) estarem em vigor primeiro, pois:

1. Sem Event Bus, não há como invalidar cache seletivamente quando um evento de domínio ocorre.
2. Sem agregado unificado, o cache precisaria cobrir 5+ tabelas independentes — alto risco de incoerência.

## Decisão

1. **Decisão aceita em princípio:** o Cognitive OS DEVE ter cache.
2. **Implementação adiada para a Fase 4** da auditoria, após ADR-011 e ADR-010 estarem operacionais.
3. Diretrizes para a implementação futura:
   - Cache in-memory com TTL de 30s como implementação inicial (Redis se houver necessidade de compartilhamento entre instâncias).
   - Cache por `empresaId`.
   - Invalidação por evento: cada evento de domínio relevante invalida o cache da empresa correspondente.
   - Não cachear no primeiro nível sem antes medir o impacto real (evitar otimização prematura).

## Alternativas consideradas

- Implementar cache agora (sem Event Bus e sem agregado unificado) — rejeitada: risco alto de cache incoerente e complexidade de invalidação manual.
- Não implementar cache — rejeitada: o problema é real e piora com o número de usuários. Apenas adiado, não cancelado.

## Consequências

- Positivo: decisão registrada e aceita — não será esquecida.
- Positivo: quando implementado, o cache estará apoiado nos fundamentos corretos (Event Bus + agregado unificado).
- Negativo: performance de `obterEstadoCognitivoCompleto` continua sem cache até a Fase 4 — aceito como custo da ordem correta de implementação.
