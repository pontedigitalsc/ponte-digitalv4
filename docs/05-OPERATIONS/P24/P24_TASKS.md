# P24 — Tasks

> Tasks organizadas por área. Cada task tem ID, descrição, e estimativa.

---

## Motor como Barramento Central

| ID | Task | Estimativa |
|----|------|:----------:|
| P24-001 | Implementar orquestrador do Ciclo Cognitivo no Motor | 2d |
| P24-002 | Criar fila interna de processamento por tenant | 1d |
| P24-003 | Implementar barramento de eventos entre etapas do ciclo | 2d |
| P24-004 | Adicionar métricas de latência por etapa do ciclo | 0.5d |

## Ciclo Cognitivo Contínuo

| ID | Task | Estimativa |
|----|------|:----------:|
| P24-005 | Pipeline Observação → Conhecimento (consolidar ADR-024) | 1d |
| P24-006 | Pipeline Conhecimento → Correlação (usar motor existente) | 0.5d |
| P24-007 | Pipeline Correlação → Convicção (ADR-032) | 1.5d |
| P24-008 | Pipeline Convicção → Decisão (gerar decisões sugeridas) | 1.5d |

## Correlação com Convicção

| ID | Task | Estimativa |
|----|------|:----------:|
| P24-009 | Aprimorar algoritmo de convicção com peso por recência e frequência | 1d |
| P24-010 | Separar serviço de correlação do serviço de causalidade | 1d |
| P24-011 | Exibir nível de convicção no dashboard (0–100) | 0.5d |

## Frontend: Dashboard Cognitivo

| ID | Task | Estimativa |
|----|------|:----------:|
| P24-012 | Criar componente de lista de correlações com convicção | 1d |
| P24-013 | Criar componente de decisões sugeridas | 1d |
| P24-014 | Conectar engine ao frontend via API | 1d |
| P24-015 | Adicionar indicador de ciclo em execução (status do Motor) | 0.5d |

## Multi-tenant e Produção

| ID | Task | Estimativa |
|----|------|:----------:|
| P24-016 | Auditoria de isolamento entre tenants no ciclo cognitivo | 1d |
| P24-017 | Testes de carga com 3+ tenants simultâneos | 1d |
| P24-018 | Rate limiting por tenant no Motor | 0.5d |

## Qualidade e Testes

| ID | Task | Estimativa |
|----|------|:----------:|
| P24-019 | Testes de integração do ciclo completo | 1.5d |
| P24-020 | Logging estruturado do ciclo cognitivo | 0.5d |
| P24-021 | Health check do Motor expondo status de cada etapa | 0.5d |

---

**Total estimado:** ~19.5 dias — entregar em 10 dias úteis exige pareamento e priorização rigorosa. Semana 1 focar em P24-001 a P24-008 (11.5d de esforço compactado em 5 dias com foco total).
