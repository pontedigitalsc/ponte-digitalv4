# ADR-034: Estabelecer política de correlação vs causalidade

**Data:** 2026-07-18
**Status:** Aceita

## Contexto

A Ontologia Cognitiva estabelece a Regra Universal R5: "Correlação nunca implica causalidade. O Motor pode observar que A e B ocorrem juntos. O Motor nunca afirmará que A causa B sem evidência direta."

No entanto, não há mecanismo explícito no sistema para:
- Marcar se uma hipótese é causal ou apenas correlacional.
- Rastrear a evidência que distingue causalidade de correlação.
- Impedir que o sistema trate uma correlação como causal em uma recomendação.

Sem este mecanismo, o princípio R5 é apenas uma intenção documentada, não uma garantia do sistema.

## Decisão

1. Toda hipótese no sistema recebe um campo `tipoCausalidade` com valores:
   - `CORRELACIONAL` — "A e B acontecem juntos, mas não sabemos se um causa o outro."
   - `CAUSAL` — "A causa B, com evidência direta (mecanismo observado, experimento, ou sequência temporal confirmada)."
   - `INDETERMINADO` — padrão inicial, exige classificação antes de virar conhecimento.
2. Hipóteses `CORRELACIONAIS` não podem gerar recomendações que afirmem causalidade.
   - Ex.: podem gerar "observamos que A e B acontecem juntos" (fato) mas não "faça A para obter B" (recomendação causal).
3. Hipóteses `CAUSAIS` devem declarar a evidência causal que as sustenta (qual observação demonstra o mecanismo causal).
4. A transição de `INDETERMINADO` para `CAUSAL` ou `CORRELACIONAL` é feita pela Hypothesis Engine com base na evidência disponível.
5. O campo `tipoCausalidade` é auditável e imutável após a classificação (uma hipótese não pode mudar de CAUSAL para CORRELACIONAL depois de classificada — apenas refutada e recriada).

## Alternativas consideradas

- Confiar apenas no princípio documentado — rejeitada: princípios sem mecanismo são intenções, não garantias.
- Não distinguir — rejeitada: a Ontologia Cognitiva exige a distinção como regra universal.

## Consequências

- Positivo: garantia executável de que correlação não é tratada como causalidade.
- Positivo: rastreabilidade da evidência causal — toda hipótese causal tem uma justificativa.
- Negativo: hipóteses `CORRELACIONAIS` têm utilidade limitada (não geram recomendações causais). Aceito: melhor limitar e estar correto que recomendar baseado em coincidência.
- Negativo: complexidade adicional no ciclo de vida da hipótese (campo + regras de transição).
