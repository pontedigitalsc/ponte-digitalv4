# Plano de Implementação — Sprints

> **Programa 13 — Blueprint de Implementação**
> Duração estimada: 8 sprints (2 semanas cada = 16 semanas)
> Dependência: Zero — todos os Blueprints estão prontos

---

## Sprint 1 — Fundação + Testes P0

**Objetivo:** Estabelecer base de testes e infraestrutura crítica antes de qualquer alteração.

| Item | Arquivos | Dependências | Risco |
|------|----------|-------------|:-----:|
| Configurar Vitest + MSW | `vitest.config.ts`, `__tests__/setup.ts` | Nenhuma | Baixo |
| Testes `app-errors.ts` | `__tests__/unit/lib/app-errors.test.ts` | app-errors | Baixo |
| Testes `logger.ts` | `__tests__/unit/lib/logger.test.ts` | logger | Baixo |
| Testes `prisma-tenant-safe.ts` | `__tests__/unit/lib/prisma-tenant-safe.test.ts` | prisma-tenant-safe | **Médio** |
| Testes `utils.ts` | `__tests__/unit/lib/utils.test.ts` | utils | Baixo |
| Testes `signal-engine.ts` (pure functions) | `__tests__/unit/engines/signal-engine.test.ts` | tipos | Baixo |
| Testes `decision-engine.ts` (formula) | `__tests__/unit/engines/decision-engine.test.ts` | tipos | Baixo |

**Critério de aceite:** 7 conjuntos de testes passando, cobertura > 80% nas libs testadas.

**Rollback:** `git revert` — apenas adição de testes, sem alteração de produção.

---

## Sprint 2 — Testes de Engines + Services

**Objetivo:** Testar todas as engines e services críticos.

| Item | Arquivos | Dependências | Risco |
|------|----------|-------------|:-----:|
| Testes Cognitive Orchestrator | `__tests__/unit/engines/cognitive-orchestrator.test.ts` | orchestrator, mock engines | **Alto** (mock complexo) |
| Testes Context Engine | `__tests__/unit/engines/context-engine.test.ts` | context-engine, mock prisma | **Médio** |
| Testes Trust Engine | `__tests__/unit/engines/trust-engine.test.ts` | trust-engine | Baixo |
| Testes cliente.service | `__tests__/integration/services/cliente.service.test.ts` | prisma, banco de teste | **Médio** |
| Testes tarefa.service | `__tests__/integration/services/tarefa.service.test.ts` | prisma, banco de teste | **Médio** |
| Testes Conversation Engine | `__tests__/unit/engines/conversation-engine.test.ts` | conversation-engine | Médio |

**Critério de aceite:** 12+ conjuntos de testes passando. Orchestrator testado com mocks de todas as engines downstream.

---

## Sprint 3 — Event Bus + Observabilidade

**Objetivo:** Implementar observabilidade que falta e melhorar Event Bus.

| Item | Arquivos | Dependências | Risco |
|------|----------|-------------|:-----:|
| Adicionar métricas no Event Bus | `event-publisher.ts`, `event-subscriber.ts` | Event Bus | Médio |
| Adicionar métricas nas engines | `cognitive-orchestrator.ts`, `cognitive-context-engine.ts` | logger | Baixo |
| Dashboard de observabilidade | `admin/cognitive-observatory/page.tsx` | observatory | Baixo |
| Testes Event Bus (pub/sub, DLQ, retry) | `__tests__/integration/engines/event-bus.integration.test.ts` | Event Bus | **Alto** |
| Refatorar `cognitive-pipeline-store.ts` | Dividir em 3-5 módulos | nada (mesma API) | **Alto** (1392 linhas) |

**Critério de aceite:** Event Bus com métricas, dashboard de observabilidade funcional, pipeline store refatorado.

---

## Sprint 4 — Correção de Anomalias

**Objetivo:** Corrigir anomalias documentais e técnicas identificadas na auditoria.

| Item | Arquivos | Dependências | Risco |
|------|----------|-------------|:-----:|
| Renomear `tenantId` → `empresaId` em Event/DeadLetter | `schema.prisma`, `cognitive-bus.ts` | Migration | **Alto** (migration) |
| Atualizar KNOWLEDGE_INDEX com nomes reais | `KNOWLEDGE_INDEX.md` | Nenhuma | Baixo |
| Remover APIs inexistentes da doc | `ARQUITETURA_CONSOLIDADA_V1.md` | Nenhuma | Baixo |
| Atualizar ADR-014 status | `ADR_NAVIGATOR.md` | Nenhuma | Baixo |
| Unificar CONSTITUIÇÃO (ENGINEERING_CONSTITUTION.md → redirect) | `ENGINEERING_CONSTITUTION.md` | Nenhuma | Baixo |
| Mover GOVERNANCA_PERMANENTE para `09-ARCHITECTURE/` | Arquivo | Nenhuma | Baixo |

**Critério de aceite:** Zero anomalias conhecidas. Todos os documentos refletem a realidade do código.

---

## Sprint 5 — APIs + Services

**Objetivo:** Testar e estabilizar todas as APIs e services.

| Item | Arquivos | Dependências | Risco |
|------|----------|-------------|:-----:|
| Testes de todas as API routes (26 rotas) | `__tests__/integration/api/*.test.ts` | services, auth mock | **Alto** |
| Adicionar Zod validation nas 40% restantes | `app/api/*/route.ts` | validations | Médio |
| Testes de autorização (requireUserApi) | `__tests__/unit/lib/authorize.test.ts` | authorize | Baixo |
| Testes de rate limit | `__tests__/unit/lib/rate-limit.test.ts` | rate-limit | Baixo |

**Critério de aceite:** 26 rotas testadas, 100% das rotas com validação Zod, testes de autorização passando.

---

## Sprint 6 — Frontend + Hooks

**Objetivo:** Testar e estabilizar frontend.

| Item | Arquivos | Dependências | Risco |
|------|----------|-------------|:-----:|
| Testes hooks (useClientes, useLeads, etc.) | `__tests__/unit/hooks/*.test.ts` | api-client mock | Médio |
| Testes componentes core (button, card, dialog) | `__tests__/unit/components/ui/*.test.tsx` | componentes | Baixo |
| Testes páginas principais (dashboard, clientes) | `__tests__/e2e/*.cy.ts` | app rodando | **Alto** |
| E2E fluxo login → dashboard | `__tests__/e2e/auth.cy.ts` | Supabase mock | **Alto** |

**Critério de aceite:** Hooks testados, 5+ componentes testados, E2E login→dashboard funcionando.

---

## Sprint 7 — Performance + Carga

**Objetivo:** Garantir que o sistema escala até 100 empresas.

| Item | Arquivos | Dependências | Risco |
|------|----------|-------------|:-----:|
| Teste de carga: 100 empresas simultâneas | `__tests__/load/cognitive-pipeline.yml` | k6/artillery | **Alto** |
| Teste de carga: 1000 sinais/s | `__tests__/load/signal-engine.yml` | signal-engine | Médio |
| Otimizar queries lentas (Prisma + índices) | `schema.prisma`, serviços | análise de queries | Médio |
| Cache tuning (verificar TTLs) | `cache.ts` | cache | Baixo |

**Critério de aceite:** Pipeline < 2s para 100 empresas simultâneas. Sinais < 500ms para 1000 sinais.

---

## Sprint 8 — Documentação + Finalização

**Objetivo:** Finalizar documentação e garantir que qualquer engenheiro consegue implementar.

| Item | Arquivos | Dependências | Risco |
|------|----------|-------------|:-----:|
| Revisão completa de todos os Blueprints | `BLUEPRINTS/*.md` | Nenhuma | Baixo |
| ADR para substituir `tenantId` por `empresaId` | ADR-035 | Nenhuma | Baixo |
| Atualizar CHANGELOG.md | `CHANGELOG.md` | Nenhuma | Baixo |
| Verificação final: tsc --noEmit + lint | Código total | Todas as sprints | **Médio** |

**Critério de aceite:** `tsc --noEmit` passa sem erros. `npm run lint` passa sem erros. Todos os blueprints aprovados.

---

## Resumo

| Sprint | Foco | Riscos | Testes | Documentos |
|:------:|:----:|:------:|:------:|:----------:|
| 1 | Fundação + Testes P0 | Baixo | 7 suites | 0 |
| 2 | Testes Engines + Services | **Alto** (mocks) | 12+ suites | 0 |
| 3 | Event Bus + Observabilidade | **Alto** (refactor) | 3 suites | 0 |
| 4 | Correção de Anomalias | **Alto** (migration) | 0 | 6 atualizados |
| 5 | APIs + Services | **Alto** (26 rotas) | 30+ suites | 0 |
| 6 | Frontend + Hooks | **Alto** (E2E) | 10+ suites | 0 |
| 7 | Performance + Carga | **Alto** (k6) | 2 suites carga | 0 |
| 8 | Documentação + Final | Baixo | 0 | 3 atualizados |
