# ADR-031: Formalizar Padrão e Correlação como conceitos do sistema

**Data:** 2026-07-18
**Status:** Aceita

## Contexto

A Ontologia Cognitiva (`ONTOLOGIA_COGNITIVA.md`) define Padrão e Correlação como conceitos distintos no ciclo cognitivo — ambos são estágios intermediários entre Observação e Hipótese. No entanto, o sistema atual não os representa:

- **Padrão**: regularidade observável em múltiplas observações. É a ponte entre Sinal e Hipótese. O Signal Engine detecta padrões, mas não há um tipo de evento ou estado que represente formalmente um padrão.
- **Correlação**: dois fenômenos que ocorrem juntos. O sistema não distingue entre "A e B acontecem juntos" (correlação) e "A causa B" (causalidade). Isso viola a Regra Universal R5.

Sem representação formal, o sistema corre o risco de:
- Tratar padrões como hipóteses (confundindo regularidade com explicação).
- Tratar correlações como causalidade (erro lógico clássico).

## Decisão

1. Adicionar eventos formais no barramento:
   - `PadraoDetectado` — emitido quando o Signal Engine identifica uma regularidade relevante.
   - `CorrelacaoObservada` — emitido quando duas variáveis apresentam correlação estatística significativa.
2. `PadraoDetectado` alimenta a Hypothesis Engine (que formula hipóteses causais).
3. `CorrelacaoObservada` é marcado explicitamente como não-causal (não alimenta hipótese diretamente — apenas sinaliza investigação).
4. Hipóteses recebem campo `tipoCausalidade` (CORRELACIONAL | CAUSAL) conforme ADR-034.
5. A implementação ocorre quando o Event Bus (ADR-011) estiver operacional.

## Alternativas consideradas

- Manter implícito — rejeitada: sem representação formal, a distinção entre padrão, correlação e hipótese se perde no código, e o risco de tratar correlação como causalidade aumenta.
- Modelar como agregados — rejeitada: são conceitos transitórios, não entidades persistentes. Eventos são suficientes.

## Consequências

- Positivo: distinção explícita entre regularidade (padrão), coincidência (correlação) e explicação (hipótese).
- Positivo: redução do risco de falsas causalidades no sistema.
- Negativo: novos tipos de evento aumentam a complexidade do barramento.
- Negativo: o Signal Engine precisa ser modificado para emitir eventos de padrão e correlação separadamente.
