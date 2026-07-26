# Ponte Digital — Plataforma Cognitiva para Empresários

> **Fase:** V4 Founder — validação de produto com 100 fundadores
> **Stack:** Next.js 16 + React 19 + Prisma 7 + PostgreSQL (Supabase)
> **Release Program v1.0:** Programas 0-5 ✅ **COMPLETO** — plataforma GO-LIVE READY desde 24/07/2026

---

## Acesso rápido

| Se você precisa | Vá para |
|----------------|---------|
| Entender o projeto | [`docs/00-START-HERE.md`](./docs/00-START-HERE.md) |
| Saber o que está sendo construído agora | [`docs/02-PRODUCT/CURRENT_PRODUCT.md`](./docs/02-PRODUCT/CURRENT_PRODUCT.md) |
| Ver a arquitetura atual | [`docs/09-ARCHITECTURE/ARCHITECTURAL_INVENTORY.md`](./docs/09-ARCHITECTURE/ARCHITECTURAL_INVENTORY.md) |
| Entender o motor cognitivo | [`docs/09-ARCHITECTURE/COGNITIVE_MAP.md`](./docs/09-ARCHITECTURE/COGNITIVE_MAP.md) |
| Ver o barramento de eventos | [`docs/09-ARCHITECTURE/EVENT_MAP.md`](./docs/09-ARCHITECTURE/EVENT_MAP.md) |
| Ver os pipelines do sistema | [`docs/09-ARCHITECTURE/PIPELINE_MAP.md`](./docs/09-ARCHITECTURE/PIPELINE_MAP.md) |
| Ver o mapa de dependências | [`docs/09-ARCHITECTURE/DEPENDENCY_MAP.md`](./docs/09-ARCHITECTURE/DEPENDENCY_MAP.md) |
| Navegar pelas decisões arquiteturais | [`docs/09-ARCHITECTURE/ADR_NAVIGATOR.md`](./docs/09-ARCHITECTURE/ADR_NAVIGATOR.md) |
| Índice mestre completo | [`docs/09-ARCHITECTURE/KNOWLEDGE_INDEX.md`](./docs/09-ARCHITECTURE/KNOWLEDGE_INDEX.md) |

---

## Repositório

```
/
├── docs/              → Documentação ativa (visão, produto, engenharia, operações)
│   ├── 00-START-HERE.md
│   ├── 01-VISION/     → Propósito, princípios, terminologia
│   ├── 02-PRODUCT/    → Escopo, roadmap, produto atual
│   ├── 03-ENGINEERING/→ Stack, arquitetura, segurança, banco
│   ├── 04-DECISIONS/  → ADRs e changelog
│   ├── 05-OPERATIONS/ → Sprints, backlog, métricas, painéis
│   ├── 06-AI/         → Regras e templates para agentes de IA
│   ├── 07-BUSINESS/   → ICP, pricing, diagnóstico, jornada
│   ├── 08-KNOWLEDGE/  → Aprendizados validados, decisões, hipóteses
│   └── 09-ARCHITECTURE/→ Documentação viva (mapas, fluxos, dependências)
├── sistema/           → Código da aplicação
│   ├── src/
│   │   ├── app/       → App Router (pages + API routes)
│   │   ├── components/→ Componentes React
│   │   ├── hooks/     → Hooks customizados
│   │   ├── services/  → Lógica de domínio
│   │   ├── engine/    → Motor cognitivo (19 engines)
│   │   └── lib/       → Utilitários compartilhados
│   └── prisma/        → Schema + migrations
└── AGENTS.md          → Contrato obrigatório para agentes de código
```

---

## Documentação Viva

A documentação da Ponte Digital passou por um Release Program completo. Todo documento em `docs/09-ARCHITECTURE/` foi gerado a partir do código real e permanece sincronizado com a implementação.

Principais documentos:

- **[Arquitetura](docs/09-ARCHITECTURE/ARCHITECTURAL_INVENTORY.md)** — visão geral, camadas, módulos, API map, ER diagram
- **[Mapa Cognitivo](docs/09-ARCHITECTURE/COGNITIVE_MAP.md)** — fluxo cognitivo, 19 engines, pipeline, integrações
- **[Mapa de Eventos](docs/09-ARCHITECTURE/EVENT_MAP.md)** — barramento de eventos, catálogo, DLQ, resiliência
- **[Mapa de Pipelines](docs/09-ARCHITECTURE/PIPELINE_MAP.md)** — pipelines de dashboard, diagnóstico, cadastro, ciclo, feedback
- **[Mapa de Dependências](docs/09-ARCHITECTURE/DEPENDENCY_MAP.md)** — grafo de dependências, acoplamentos, pontos críticos
- **[ADR Navigator](docs/09-ARCHITECTURE/ADR_NAVIGATOR.md)** — índice navegável de todas as 34 decisões arquiteturais
- **[Knowledge Index](docs/09-ARCHITECTURE/KNOWLEDGE_INDEX.md)** — índice mestre de toda a plataforma

---

## Release Program v1.0 — Resumo

| Programa | Status | Descrição |
|----------|:------:|-----------|
| Programa 0 — Setup | ✅ | Configuração inicial |
| Programa 1 — Auditoria Global | ✅ | 198 arquivos auditados |
| Programa 2 — Documentação Viva | ✅ | 7 documentos em `docs/09-ARCHITECTURE/` |
| Programa 3 — Hardening + RC | ✅ | 12 correções de segurança, RC emitido |
| Programa 4 — Deploy e Go-Live | ✅ | 8 documentos operacionais |
| Programa 5 — Encerramento | ✅ | Baseline, certificação, changelog, roadmap |

**Status final: GO-LIVE READY** — todas as engines implementadas, documentação completa, operação documentada.

### Documentos de Encerramento

| Documento | Descrição |
|-----------|-----------|
| [`CHANGELOG.md`](./CHANGELOG.md) | Changelog oficial semântico |
| [`docs/05-OPERATIONS/VERSION_1.0.md`](./docs/05-OPERATIONS/VERSION_1.0.md) | Documento oficial da versão |
| [`docs/05-OPERATIONS/RELEASE_FINAL_V1.md`](./docs/05-OPERATIONS/RELEASE_FINAL_V1.md) | Parecer final da release |
| [`docs/05-OPERATIONS/PLATFORM_CERTIFICATION_V1.md`](./docs/05-OPERATIONS/PLATFORM_CERTIFICATION_V1.md) | Certificação oficial |
| [`docs/05-OPERATIONS/LESSONS_LEARNED.md`](./docs/05-OPERATIONS/LESSONS_LEARNED.md) | Lições aprendidas |
| [`docs/09-ARCHITECTURE/PLATFORM_BASELINE_V1.md`](./docs/09-ARCHITECTURE/PLATFORM_BASELINE_V1.md) | Baseline oficial |
| [`docs/06-ROADMAP/ROADMAP_V1_1.md`](./docs/06-ROADMAP/ROADMAP_V1_1.md) | Roadmap v1.1 |
| [`docs/05-OPERATIONS/TRANSITION_TO_V1_1.md`](./docs/05-OPERATIONS/TRANSITION_TO_V1_1.md) | Transição para v1.1 |

### Documentos Operacionais

| Documento | Descrição |
|-----------|-----------|
| [`OPS-SECURITY-CHECKLIST.md`](./docs/05-OPERATIONS/OPS-SECURITY-CHECKLIST.md) | Checklist de segurança operacional |
| [`OPS-INFRASTRUCTURE.md`](./docs/05-OPERATIONS/OPS-INFRASTRUCTURE.md) | Diagrama de infraestrutura |
| [`OPS-BACKUP.md`](./docs/05-OPERATIONS/OPS-BACKUP.md) | Estratégia de backup e recuperação |
| [`OPS-CICD.md`](./docs/05-OPERATIONS/OPS-CICD.md) | Pipeline CI/CD |
| [`OPS-OBSERVABILITY.md`](./docs/05-OPERATIONS/OPS-OBSERVABILITY.md) | Observabilidade |
| [`OPS-RUNBOOK.md`](./docs/05-OPERATIONS/OPS-RUNBOOK.md) | Runbook operacional |
| [`OPS-GO-LIVE-CHECKLIST.md`](./docs/05-OPERATIONS/OPS-GO-LIVE-CHECKLIST.md) | Go-Live checklist |
| [`OPS-GO-LIVE-READY.md`](./docs/05-OPERATIONS/OPS-GO-LIVE-READY.md) | Plano de Go-Live |

Consulte também [`docs/05-OPERATIONS/PAINEL_AUDITORIA_GLOBAL.md`](./docs/05-OPERATIONS/PAINEL_AUDITORIA_GLOBAL.md) para o painel completo da auditoria.
