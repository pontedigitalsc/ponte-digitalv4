# ADR-018: Ciclo de vida formal do conhecimento

**Data:** 2026-07-18
**Status:** Aceita

## Contexto

O MOTOR_COGNITIVO.md (seção 7) define 8 estados do conhecimento: Hipótese → Em Observação → Conhecimento → Arquivado → etc. Hoje o código não tem representação formal desses estados — o conhecimento transita entre `Evidencia`, `Hipotese`, `ConhecimentoValidado` e `MemoriaCognitiva` sem uma máquina de estados explícita.

Isso significa que:
- Não há validação de transições válidas entre estados.
- Qualquer engine pode colocar conhecimento em qualquer estado.
- O ciclo de vida do conhecimento é implícito (pela tabela onde o registro está), não explícito (pelo estado do registro).

## Decisão

1. Os 8 estados do conhecimento são formalizados como o único ciclo de vida possível.
2. O agregado `PatrimonioCognitivo` (ADR-010) inclui um campo `estado` que representa o estado atual no ciclo de vida.
3. A máquina de estados define transições válidas — transições inválidas são rejeitadas.
4. Os estados formais são:
   - `SinalObservado` — dado bruto capturado
   - `HipoteseGerada` — interpretação inicial
   - `EmObservacao` — sendo monitorado para confirmação
   - `ConhecimentoValidado` — confirmado por curadoria (ADR-028)
   - `Arquivado` — não mais ativo, mas preservado
   - `Refutado` — hipótese que se provou incorreta
   - `Esquecido` — removido pelo Forgetting Engine (ADR-026)
   - `Revalidando` — em processo de revalidação periódica

## Alternativas consideradas

- Manter estados implícitos (pela tabela onde o registro está) — rejeitada: sem máquina de estados, não há como validar transições, e o conhecimento pode "pular" etapas.
- Usar 8 estados sem distinção entre "refutado" e "esquecido" — rejeitada: a distinção é importante — refutado é aprendizado (sabemos que não funciona), esquecido é expurgo (não lembramos mais).

## Consequências

- Positivo: ciclo de vida explícito, validável, auditável.
- Positivo: novas engines podem consultar o estado sem conhecer a implementação interna.
- Negativo: migração necessária para adicionar campo `estado` aos registros existentes.
- Negativo: toda engine que manipula conhecimento precisa respeitar a máquina de estados — código que viola transições válidas quebra em tempo de execução (intencional).
