# ADR-024: Pipeline único Observação → Sinal → Hipótese → Conhecimento

**Data:** 2026-07-18
**Status:** Aceita

## Contexto

O MOTOR_COGNITIVO.md (seção 3) define o pipeline cognitivo completo: Observação → Sinal → Hipótese → Conhecimento → Decisão → Resultado → Aprendizado. Hoje o sistema permite atalhos: uma engine pode gerar "conhecimento" diretamente sem passar por hipótese, ou pode "decidir" sem contexto completo.

A auditoria identificou que o ciclo cognitivo atual é incompleto (P7) — Observação → ... → Aprendizado não fecha.

## Decisão

1. O fluxo Observação → Sinal → Hipótese → Conhecimento é o único pipeline de processamento.
2. Nenhum atalho pode pular etapas:
   - Conhecimento só pode ser gerado a partir de Hipótese validada.
   - Hipótese só pode ser gerada a partir de Sinal identificado.
   - Sinal só pode ser gerado a partir de Observação.
3. A transição entre etapas é feita exclusivamente por eventos (ADR-011).
4. O pipeline é aplicado a todo novo dado que entra no Motor.
5. Exceção: o empresário pode fornecer conhecimento explícito (ex.: "meu negócio é sazonal") — este entra diretamente como Conhecimento com score de confiança ≥ 70 (ADR-025).

## Alternativas consideradas

- Permitir atalhos para performance — rejeitada: atalhos quebram a cadeia causal e impedem rastreabilidade. Performance deve vir de cache e processamento paralelo, não de pular etapas cognitivas.
- Pipeline rígido sem exceção para conhecimento explícito — rejeitada: o empresário ensina o Motor; ignorar o ensino do empresário seria contradizer o propósito do Motor.

## Consequências

- Positivo: rastreabilidade causal completa — todo conhecimento tem uma cadeia de origem.
- Positivo: consistência — todo conhecimento segue o mesmo processo de validação.
- Positivo: alinhamento com ADR-013 (ciclo contínuo) — o pipeline é a implementação concreta do ciclo.
- Negativo: processamento mais lento que atalhos — mitigado por cache (ADR-014) e paralelismo.
- Negativo: exceção de conhecimento explícito exige validação para evitar que o empresário "ensine" dados contraditórios sem curadoria.
