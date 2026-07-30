# Migrações Arquivadas — Período Pré-Fundação

Estas migrations pertencem ao período anterior à **Foundation Database V1** (Programa 37).

Elas foram geradas durante a fase de prototipagem (Programas 31-36) e representam correções incrementais sobre uma baseline inicial que não existe mais na cadeia de migrations.

## Histórico

| Migration | Data | Descrição |
|-----------|------|-----------|
| `20260719000001_add_fk_4_structures` | 19/07 | FK and 4 structure tables |
| `20260719000002_add_explicit_indexes` | 19/07 | Explicit indexes + duplicate create |
| `20260720000001_fase0_emergencia` | 20/07 | Soft delete, tenant fields, FK fixes |
| `20260720000002_fase1_event_models` | 20/07 | Event model enrichment |

## Por que foram arquivadas

O histórico de migrations não representava mais a história completa do projeto. As primeiras migrations que criavam estruturas fundamentais (empresas, usuários, etc.) não existiam mais na cadeia.

A partir da Foundation Database V1, toda a estrutura do banco está contida em uma única migration: `001_foundation_database_v1`.

## Referências

- A arquitetura histórica está registrada na Constituição (`docs/06-CONSTITUTION/`)
- As decisões arquiteturais estão nos ADRs (`docs/04-DECISIONS/ADR/`)
- O changelog completo está em `docs/05-OPERATIONS/CHANGELOG.md`
- O marco Foundation Database V1 está em `docs/07-MILESTONES/FOUNDATION_DATABASE_V1.md`
