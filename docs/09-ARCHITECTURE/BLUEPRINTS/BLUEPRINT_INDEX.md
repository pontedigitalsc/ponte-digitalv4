# Blueprint de Implementação — Índice

> **Programa 13 — Blueprint de Implementação**
> Versão: 1.0
> Propósito: Índice mestre de todos os Blueprints — qualquer engenheiro encontra exatamente o que precisa implementar

---

## Hierarquia de Leitura

```
1. CONSTITUICAO_DA_ENGENHARIA.md (leis imutáveis — leia primeiro)
2. BLUEPRINT_COGNITIVE_ORCHESTRATOR.md (cérebro — leia para entender o todo)
3. BLUEPRINT_DATABASE.md (fundação — leia antes de models)
4. BLUEPRINT_SERVICES.md (operações — leia antes de APIs)
5. BLUEPRINT_APIS.md (contratos HTTP — leia antes do frontend)
6. BLUEPRINT_EVENT_BUS.md (comunicação entre engines)
7. BLUEPRINT_ENGINES/*.md (implementação de cada engine)
8. BLUEPRINT_LIBS.md (utilidades compartilhadas)
9. BLUEPRINT_FRONTEND.md (telas e componentes)
10. BLUEPRINT_HOOKS.md (hooks React)
11. BLUEPRINT_OBSERVABILITY.md (monitoramento)
12. BLUEPRINT_DEPLOY.md (infraestrutura)
13. BLUEPRINT_TESTES.md (testes)
14. PLANO_DE_IMPLEMENTACAO.md (sprints)
```

---

## Blueprints Produzidos

### Engines (arquivos em `sistema/src/engine/`)

| # | Blueprint | Arquivo | Criticidade |
|:-:|:---------:|:-------:|:-----------:|
| 1 | Cognitive Orchestrator | `BLUEPRINT_COGNITIVE_ORCHESTRATOR.md` | Crítica |
| 2 | Event Bus (bus + publisher + subscriber + DLQ + store) | `BLUEPRINT_EVENT_BUS.md` | Crítica |
| 3 | Signal Engine (sinais + clientes.sinais + tarefas.sinais + financeiro.sinais) | `BLUEPRINT_SIGNAL_ENGINE.md` | Crítica |
| 4 | Cognitive Context Engine | `BLUEPRINT_CONTEXT_ENGINE.md` | Crítica |
| 5 | Decision Engine + Priority + Trust + Relevance | `BLUEPRINT_DECISION_ENGINE.md` | Crítica |
| 6 | Experience Engine (+ Briefing, Health, Evolution, Journey, Timeline, Workflow, Milestone, Notification, Maturity) | `BLUEPRINT_EXPERIENCE_ENGINE.md` | Crítica |
| 7 | Memory Engine + Forgetting + Knowledge Aging | `BLUEPRINT_MEMORY_ENGINE.md` | Alta |
| 8 | Identity Engine + Conversation Engine | `BLUEPRINT_IDENTITY_CONVERSATION.md` | Alta |
| 9 | Knowledge Governance + Synthesis + Evidence | `BLUEPRINT_KNOWLEDGE_GOVERNANCE.md` | Alta |
| 10 | Feedback + Outcome + Action Intelligence + Founder Activation + Ritmo | `BLUEPRINT_FEEDBACK_OUTCOME_RITMO.md` | Média |
| 11 | Heritage Facade + Observatory + Pipeline Monitor + Pipeline Comparator | `BLUEPRINT_HERITAGE_OBSERVATORY.md` | Alta |

### Camadas

| # | Blueprint | Escopo |
|:-:|:---------:|:------:|
| 12 | Database | Schema Prisma completo (29 models, 21 enums) |
| 13 | APIs | 26 rotas HTTP |
| 14 | Services | 7 services de domínio |
| 15 | Libs | 19 libs compartilhadas |
| 16 | Frontend | 20 páginas, 58+ componentes |
| 17 | Hooks | 4 hooks + useConfirm |
| 18 | Observabilidade | Logs, métricas, alertas, dashboards |
| 19 | Deploy | Build, migrações, feature flags, rollback |
| 20 | Testes | Cobertura, estratégia, prioridade |

### Planejamento

| # | Documento | Escopo |
|:-:|:---------:|:------:|
| 21 | Plano de Implementação | Sprints 1 a N |

---

## Convenções Usadas em Todos os Blueprints

### Formato de Contrato

```typescript
// Entrada
interface NomeEntrada {
  empresaId: string;      // sempre presente (tenant)
  // ... campos específicos
}

// Saída
interface NomeSaida {
  sucesso: boolean;
  dados?: unknown;         // tipo específico por engine
  erro?: string;
}
```

### Regras que se Aplicam a Todos

1. Toda função que recebe `empresaId` DEVE usá-lo no `where` do Prisma
2. Nenhuma engine importa `@/lib/prisma` — sempre `@/lib/prisma-tenant-safe`
3. Toda engine exporta `createLogger('engine', '<nome>')` no topo
4. Toda engine pública no barrel `engine/index.ts`
5. Toda engine que falha lança erro tipado (hierarquia `app-errors.ts`)
6. Nenhum service importa nada de `engine/` (Lei 1 da Constituição)
