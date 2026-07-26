# ADR-004: "Engine" como convenção de nomenclatura de domínio, não como afirmação arquitetural

**Data:** 2026-07-18
**Status:** Aceita

## Contexto

O diretório `src/engine/` contém 36 arquivos nomeados como `*-engine.ts`. Uma auditoria classificou alguns como "motores cognitivos legítimos" (decision-engine, evidence-engine, knowledge-governance-engine) e outros como "apenas services disfarçados" (conversation-engine, identity-engine, cognitive-orchestrator). A crítica procede do ponto de vista arquitetural estrito, mas ignora o propósito da nomenclatura na V4 Founder.

## Decisão

Manter o sufixo `-engine` para **todos** os módulos de domínio em `src/engine/`, independentemente de serem "verdadeiros motores" ou services. O nome não é uma reivindicação arquitetural — é uma convenção de organização que:

1. **Sinaliza pertencimento ao mesmo domínio conceitual** — todos os módulos participam do ciclo cognitivo (observar → interpretar → decidir → agir → aprender), mesmo que alguns sejam apenas serviços de suporte.
2. **Elimina a necessidade de subdiretórios artificiais** — se separássemos `engines/` de `services/`, criaríamos um problema de dependência circular e navegação mais复杂a, não mais simples.
3. **Permite renomeação futura sem custo** — quando o Motor Cognitivo real (Fase 2/3) for implementado, os módulos atuais serão reorganizados naturalmente. Até lá, o nome unificado reduz atrito.

## Alternativas consideradas

- Renomear para `src/services/` e `src/engines/` separados: rejeitada — criaria fronteiras artificiais que não existem no domínio (ex.: `identity-engine` depende de `evidence-engine`, que depende de `cognitive-memory-engine` — a separação física não refletiria a separação lógica).
- Manter tudo como `*.ts` sem sufixo: rejeitada — perderia a identificação imediata de pertencimento ao domínio cognitivo.

## Consequências

- Positivo: navegação consistente, nenhuma refatoração necessária.
- Positivo: novos módulos sabem exatamente onde devem ser criados.
- Negativo: auditores futuros podem reabrir a mesma crítica — este ADR encerra a discussão.
