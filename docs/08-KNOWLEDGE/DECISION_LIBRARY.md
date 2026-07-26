# DECISION_LIBRARY.md — Índice de Todas as Decisões Já Tomadas

Este documento **não duplica** nenhuma decisão — é o índice que evita que a mesma pergunta seja respondida três vezes em três lugares diferentes (achado de redundância da auditoria de 2026-07-13). Sempre que for registrar uma decisão nova, ela vai no arquivo de origem correto abaixo, não aqui.

## Onde cada tipo de decisão vive

```text
Decisão estratégica de produto/negócio    → 04-DECISIONS/DECISIONS.md
Decisão arquitetural/técnica               → 04-DECISIONS/ADR/ADR-NNN-*.md
```

## Índice das decisões já tomadas (nesta árvore de documentação)

| # | Decisão | Onde está registrada | Resumo em uma linha |
|---|---|---|---|
| ADR-001 | Manter `HistoricoSinal` em vez do catálogo formal de `DomainEvent` | `04-DECISIONS/ADR/ADR-001-historico-sinal-vs-domain-event.md` | Simplificação estratégica aceita até Fase 2, não dívida técnica |
| ADR-002 | Manter API Routes em vez de Server Actions/repositories | `04-DECISIONS/ADR/ADR-002-api-routes-vs-server-actions.md` | Mesma lógica do ADR-001, aplicada à camada de acesso a dados |
| — | Diagnóstico Inteligente é a sprint atual, não refactor arquitetural | `04-DECISIONS/DECISIONS.md` | Prioriza a lacuna real (falta de contexto no produto) sobre sofisticação técnica prematura |
| — | Soft delete incompleto é exceção ao congelamento (corrigir em paralelo) | `04-DECISIONS/DECISIONS.md` | Único item das auditorias tratado como violação de princípio inegociável, não escolha de estágio |
| — | Desconfiar de auditorias com sinais de corrupção/desobediência | `04-DECISIONS/DECISIONS.md` | Uma execução de auditoria anterior foi descartada como fonte de verdade — ver `08-KNOWLEDGE/LESSONS_LEARNED.md` para o porquê |

## Decisão pendente encontrada nesta auditoria (ainda não registrada em nenhum ADR)

**Qual árvore de documentação é oficial: esta (`docs/`) ou a mais antiga (`ponte-digital/docs/`, estrutura `00-foundation`…`06-playbooks`)?**

A árvore antiga já pedia essa decisão sob o nome "ADR-006" (ver `02-engineering/ADR.md` dela). Na prática, o ADR-001 desta árvore já responde à pergunta de vocabulário técnico (`HistoricoSinal` venceu) — mas isso nunca foi formalizado como resposta ao pedido da árvore antiga, porque as duas nunca se referenciaram. Ver `AUDITORIA_PATRIMONIO_INTELECTUAL.md` (raiz do repo) para o relatório completo. Registrar aqui assim que uma decisão explícita existir.

## Decisão pendente adicional: gap de Row Level Security

Ver `08-KNOWLEDGE/ENGINEERING_KNOWLEDGE.md` para o achado técnico e `05-OPERATIONS/KNOWN_ISSUES.md` para o registro formal do problema. A decisão de como corrigir (criar as policies faltantes, confirmar qual role o Prisma usa para conectar, conectar o wrapper `prismaSeguro` nos services) ainda não foi tomada.
