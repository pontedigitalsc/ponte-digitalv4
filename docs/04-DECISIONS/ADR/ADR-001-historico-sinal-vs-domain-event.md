# ADR-001: Manter HistoricoSinal em vez de implementar o catálogo formal de DomainEvent agora

**Data:** 2026-07-13
**Status:** Aceita

## Contexto

`ARCHITECTURE.md` descreve um catálogo formal de `DomainEvent` com nomenclatura semântica, emitido por todos os quatro sistemas e consumido por um futuro Motor Cognitivo. O código implementado usa, em vez disso, `HistoricoSinal`: um modelo mais simples, com nomes mais técnicos, gerando sinais consumidos por uma camada de alerta simplificada.

Uma auditoria de código listou essa divergência como "conflito crítico". Isso está incorreto: é uma simplificação estratégica, não uma dívida técnica.

## Decisão

Manter `HistoricoSinal` como está durante toda a fase V4 Founder. Não implementar o catálogo formal de `DomainEvent`, nem migrar a nomenclatura, antes da validação com os 100 primeiros fundadores.

## Alternativas consideradas

- Migrar agora para o catálogo formal: rejeitada — é exatamente o tipo de sofisticação prematura que o princípio "o estágio da empresa é o teto da sofisticação técnica" existe para evitar.
- Documentar a divergência sem decidir: rejeitada — deixaria a ambiguidade se repetir a cada nova auditoria.

## Consequências

- Positivo: mantém a velocidade de entrega focada no Diagnóstico Inteligente, que é a lacuna real.
- Negativo: quando o Motor Cognitivo for implementado (Fase 2/3), será necessário migrar `HistoricoSinal` para o catálogo formal — custo aceito e esperado, não uma surpresa.
- Este ADR encerra a discussão: futuras auditorias não devem reabrir esse ponto como "conflito crítico" — apenas confirmar que o congelamento continua vigente em `MVP_SCOPE.md`.
- **Nota de auditoria (2026-07-13):** uma árvore de documentação mais antiga (`ponte-digital/docs/02-engineering/ADR.md`) pede explicitamente um "ADR-006" para decidir entre o vocabulário `DomainEvent`/`MotorDeDecisao` e `Sinal`/`HistoricoSinal`. Este ADR-001, na prática, já é essa resposta — só nunca foi cruzado com o pedido da árvore antiga. Ver `../../../AUDITORIA_PATRIMONIO_INTELECTUAL.md`.
