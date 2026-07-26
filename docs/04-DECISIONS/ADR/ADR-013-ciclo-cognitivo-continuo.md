# ADR-013: Ciclo Cognitivo contínuo com encadeamento de eventos

**Data:** 2026-07-18
**Status:** Aceita

## Contexto

O ciclo cognitivo atual é incompleto e segmentado. As engines operam de forma isolada:

1. `cognitive-observatory.ts` gera Evidencia periodicamente (rotina agendada).
2. `cognitive-hypothesis-engine.ts` gera Hipotese a partir de Evidencia.
3. `cognitive-knowledge-governance-engine.ts` valida e gera ConhecimentoValidado.
4. LearningContext opera como ilha — não há fluxo de aprendizado que retroalimente o ciclo.

O encadeamento entre essas etapas é feito por agendamento (cada um roda em horário diferente), não por eventos. Isso significa que:
- Uma observação pode levar horas para virar hipótese (depende do próximo agendamento).
- Não há fluxo de "resultado → aprendizado" — o ciclo não se fecha.
- Aprendizado não realimenta observação (não há "aprender a observar melhor").

A auditoria (P7) classifica como problema CRÍTICO.

## Decisão

1. Implementar o ciclo cognitivo como um pipeline contínuo encadeado por eventos:

   ```
   Observação → [Evento] → Hipotese → [Evento] → Validacao → [Evento] → Conhecimento
       ↑                                                                         │
       └──────────────────── Aprendizado ← [Evento] ← Resultado ← [Evento] ← Decisão
   ```

2. Cada etapa do pipeline emite um evento (via Event Bus, ADR-011) que aciona a próxima etapa automaticamente.
3. O pipeline substitui os agendamentos independentes por um único ciclo coordenado.
4. LearningContext é integrado ao pipeline: o resultado de uma decisão realimenta a observação (aprendizado fecha o ciclo).
5. A implementação é feita por detrás de Feature Toggle — o sistema atual e o novo coexistem até a migração completa (Fase 5 da auditoria).

## Alternativas consideradas

- Manter agendamentos independentes — rejeitada: o ciclo cognitivo nunca se fecha, aprendizado não retroalimenta observação.
- Implementar orquestrador central — rejeitada: o Event Bus (ADR-011) já oferece o encadeamento sem criar um novo acoplamento.

## Consequências

- Positivo: o ciclo cognitivo se fecha — observação vira conhecimento que vira decisão que vira resultado que vira aprendizado.
- Positivo: latência entre etapas cai de horas para segundos.
- Positivo: score de Fluxos sobe de 4/10 para 7/10.
- Negativo: engines existentes precisam ser refatoradas para emitir eventos em vez de depender de agendamento.
- Negativo: o pipeline contínuo exige mais cuidado com estados intermediários (ex.: uma observação que ainda está gerando hipótese não pode ser sobrescrita por uma nova observação).
