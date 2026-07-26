# ADR-032: Incluir convicção no algoritmo de priorização

**Data:** 2026-07-18
**Status:** Aceita

## Contexto

A ADR-020 define o algoritmo de priorização como:

```
Prioridade = urgencia × impacto × confianca × alinhamento × momento
```

No entanto, o MOTOR_COGNITIVO.md (seção 9) e a Ontologia Cognitiva estabelecem que a **convicção** (tempo sem refutação) é um fator fundamental de priorização: conhecimento que resistiu ao tempo merece mais peso que conhecimento recém-adquirido, mesmo com alta confiança.

A exclusão da convicção significa que um conhecimento com confiança 80 e 1 dia de idade tem o mesmo peso que um conhecimento com confiança 80 e 2 anos de idade.

A auditoria da Ontologia (C8) identificou esta divergência como de alta severidade.

## Decisão

1. Revisar a fórmula de priorização para incluir convicção:

   ```
   Prioridade = urgencia × impacto × confianca × conviccao × alinhamento × momento
   ```

2. Onde `conviccao` é normalizado em escala 0-1: `min(dias_sem_refutacao * 0.5 / max_conviccao, 1)`.
3. O `max_conviccao` é definido como 730 (2 anos) — acima disso, a convicção atinge o teto de 1.0.
4. Esta revisão altera a ADR-020. A ADR-020 original permanece como documento histórico.
5. A implementação ocorre quando o Priority Engine for implementado (Fase 1+ da auditoria).

## Alternativas consideradas

- Manter sem convicção — rejeitada: conhecimento antigo e testado merece mais peso. Ignorar convicção é ignorar a história do conhecimento.
- Convicção como fator separado (não multiplicativo) — rejeitada: se não for multiplicativo, a convicção pode ser compensada por outros fatores — o que derrota o propósito.

## Consequências

- Positivo: conhecimento testado pelo tempo tem precedência sobre conhecimento novo.
- Positivo: alinhamento com Ontologia Cognitiva e MOTOR_COGNITIVO.md.
- Negativo: fórmula depende de `conviccao` implementada no agregado `PatrimonioCognitivo` — há dependência com ADR-010 e ADR-019.
