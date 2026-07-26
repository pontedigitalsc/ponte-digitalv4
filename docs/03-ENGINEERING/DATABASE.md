# Banco de Dados

PostgreSQL via Supabase, acessado por Prisma 7.8 com `@prisma/adapter-pg` (ver `03-ENGINEERING/STACK.md`).

## Regras obrigatórias em todo model (sem exceção, nenhuma fase — ver `01-VISION/FOUNDATION.md`)

- **Tenant guard:** todo model que pertence a uma empresa precisa de uma coluna de tenant (empresa) e toda query precisa filtrar por ela. Nunca confiar em filtro só na camada de UI.
- **Soft delete:** todo model precisa de `deletedAt` (nullable). Queries de leitura devem filtrar `deletedAt: null` por padrão. Nunca fazer `DELETE` físico em dado de empresário.
- **Audit trail:** mudanças relevantes devem ser rastreáveis — no mínimo `createdAt`/`updatedAt`, e quando fizer sentido, quem alterou.

## Situação real hoje (ver `05-OPERATIONS/KNOWN_ISSUES.md`)

Parte dos models ainda não tem `deletedAt`. Duas auditorias anteriores reportaram listas diferentes e inconsistentes entre si sobre quais models estão faltando — **não confiar em nenhuma dessas listas**. Antes de corrigir, rodar uma verificação direta contra `schema.prisma` (ex.: `grep -L "deletedAt" **/*.prisma` ou revisão manual completa), gerar uma lista única e conferida, e só então corrigir os models que deveriam ter o campo e não têm.

Essa correção pode ser feita em paralelo a qualquer sprint (ver `05-OPERATIONS/SPRINTS/SPRINT-001-DIAGNOSTICO.md`), sem precisar de sprint dedicada — mas precisa ser feita com a lista real, não com uma lista assumida.

## Nomenclatura

- Models em `PascalCase`, em português, consistente com o domínio já em uso (`Lead`, `Cliente`, `Tarefa`, etc. — ver `03-ENGINEERING/CODE_PATTERNS.md`).
- Nunca renomear um model existente fora de uma sprint dedicada a isso.

## Camada de sinal — `HistoricoSinal`

Ver `03-ENGINEERING/DOMAIN_EVENTS.md` para o que esse model resolve hoje e por que ele não segue ainda a nomenclatura semântica formal de `DomainEvent` (aceito, ver `ADR-001`).

## O que não fazer no schema agora

- Não introduzir tabelas para conceitos congelados em `02-PRODUCT/MVP_SCOPE.md` (ex.: `KnowledgeRegistry`, Patrimônio Empresarial estruturado) — mesmo que a modelagem pareça simples, a arquitetura deve permitir adicionar depois, não adiantar agora.
- Não migrar `HistoricoSinal` para um catálogo formal de eventos antes da Fase 2.
