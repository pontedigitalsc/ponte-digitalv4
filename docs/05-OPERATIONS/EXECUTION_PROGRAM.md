# EXECUTION PROGRAM — Ponte Digital V4 Founder

**Data:** 2026-07-19
**Versão:** 1.1
**Status:** Vigente (Revisado 2026-07-24)
**Hierarquia:** Documento oficial de execução. Subordinado à arquitetura congelada. Não substitui ADRs, documentos de visão ou engenharia. Traduz decisões arquiteturais em ação.

> **Nota de revisão (2026-07-24):** Este documento descreve o plano de execução futuro (Programas P1-P6). O **Release Program v1.0** (preparação para produção) foi **completado integralmente** em 24/07/2026 — Programas 0 a 4, totalizando 25+ WPs executados. Abaixo, as seções P1-P6 permanecem como roadmap futuro para a próxima fase de produto. Consulte `docs/05-OPERATIONS/` para os documentos operacionais produzidos no Release Program.

> **Nota de revisão (2026-07-23):** As referências a ADRs nas seções abaixo usam numeração **planejada** que **não corresponde** aos ADRs reais em `docs/04-DECISIONS/ADR/` (ADR-001 a ADR-034). Consulte `docs/09-ARCHITECTURE/ADR_NAVIGATOR.md` para o mapeamento correto entre decisões arquiteturais e implementação.

> **Regra fundamental:** Toda decisão arquitetural já foi tomada e está congelada. Este programa não cria arquitetura. Ele executa.

---

## Release Program v1.0 — Status da Preparação para Produção

O Release Program v1.0 foi um programa de preparação pré-P1-P6 executado entre 19/07/2026 e 24/07/2026. Abaixo, o resumo dos programas executados:

| Programa | WPs | Status | Entregas |
|----------|:---:|:------:|----------|
| **Programa 0 — Setup** | 1 | ✅ Concluído | Configuração inicial do agente, leitura obrigatória |
| **Programa 1 — Auditoria Global** | 8 | ✅ Concluído | 198 arquivos auditados, 5 correções, 188 aprovados, ValidationEngine depreciada |
| **Programa 2 — Documentação Viva** | 8 | ✅ Concluído | 7 documentos vivos em `09-ARCHITECTURE/`, 6 documentos raiz atualizados |
| **Programa 3 — Hardening, Certificação, RC** | 8 | ✅ Concluído | 12 correções de segurança, 11 índices, health endpoint, RC v1.0 emitido (APROVADO COM RESSALVAS) |
| **Programa 4 — Deploy, Go-Live, Operação Assistida** | 8 | ✅ Concluído | 8 documentos operacionais em `05-OPERATIONS/OPS-*.md` |
| **Total** | **33** | **✅ Completo** | |

### Documentos Operacionais Produzidos (Programa 4)

| Documento | WP | Descrição |
|-----------|:--:|-----------|
| `OPS-SECURITY-CHECKLIST.md` | 4.1 | Checklist de rotação de chaves, permissões, segurança |
| `OPS-INFRASTRUCTURE.md` | 4.2 | Diagrama de infraestrutura, ambientes, stack, conexões |
| `OPS-BACKUP.md` | 4.3 | Estratégia de backup/RPO/RTO, disaster recovery |
| `OPS-CICD.md` | 4.4 | Pipeline CI/CD proposto (GitHub Actions + Vercel) |
| `OPS-OBSERVABILITY.md` | 4.5 | Logs, health check, métricas, alertas |
| `OPS-RUNBOOK.md` | 4.6 | Runbook operacional completo (8 seções) |
| `OPS-GO-LIVE-CHECKLIST.md` | 4.7 | Checklist de Go-Live (8 fases, 40+ itens) |
| `OPS-GO-LIVE-READY.md` | 4.8 | Plano de deploy, comunicação, responsabilidades |

### Ressalvas Não Resolvidas do RC v1.0

| Item | Prioridade | Ação Necessária |
|------|:----------:|-----------------|
| **ARCH-016 — CI/CD ausente** | P0 | Configurar GitHub Actions + Vercel CLI (docs em OPS-CICD.md) |
| **ARCH-017 — Backup automático ausente** | P0 | Ativar PITR no Supabase (docs em OPS-BACKUP.md) |
| **ARCH-005 a ARCH-009** | P1-P3 | Backlog arquitetural (18 itens abertos) |

### Recomendação

A aplicação está **pronta para Go-Live** condicionada à execução dos checklists de segurança (OPS-SECURITY-CHECKLIST.md) e Go-Live (OPS-GO-LIVE-CHECKLIST.md) por um operador humano com acesso aos serviços. As ressalvas CI/CD e Backup devem ser resolvidas como P0 na primeira semana de operação.

---

## 1. Estado Futuro (Roadmap P1-P6)

As seções abaixo descrevem o plano de execução para as próximas fases de produto (P1 a P6), que implementarão o Motor Cognitivo completo. **Não confundir com o Release Program v1.0 concluído acima.**

### 1.1 Mapa de Maturação (Pós-Release)

| Dimensão | Pontuação | Status | Meta |
|----------|-----------|--------|------|
| **Arquitetura** (documentada e congelada) | 100% | ✅ Completa | 100% |
| **Implementação** (código entregue) | 34% | 🔶 Parcial | 100% |
| **Refatoração** (dívida técnica paga) | 18% | ❌ Crítico | 100% |
| **Infraestrutura** (deploy, CI/CD, staging) | 60% | 🔶 Parcial | 100% |
| **Performance** (índices, cache, queries) | 25% | ❌ Crítico | 100% |
| **Segurança** (RLS, rate limit, validação) | 45% | ❌ Crítico | 100% |
| **Escalabilidade** (multi-tenant, concorrência) | 22% | ❌ Crítico | 100% |
| **Testes** (unitário, integração, e2e) | 0% | ❌ Crítico | 100% |

### 1.2 Brechas Críticas (P0)

| # | Brecha | Impacto | Programa | Prioridade |
|---|--------|---------|----------|------------|
| B01 | 4 estruturas soltas sem FK (Anotacoes, Tags, OnboardingDecisoes, DecisaoSinais) | Integridade referencial | P1-Foundation | P0 |
| B02 | 12 models sem companyId/tenantId | Isolamento multi-empresa quebrado | P1-Foundation | P0 |
| B03 | 15 models sem soft delete | Perda de dados irrecuperável | P1-Foundation | P0 |
| B04 | Zero testes automatizados | Regressão silenciosa | P6-Optimization | P0 |
| B05 | Sem RLS policies | Vazamento de dados entre empresas | P1-Foundation | P0 |
| B06 | Sem validação Zod em 40% das rotas | Dados inválidos em produção | P1-Foundation | P0 |
| B07 | 8 ADRs bloqueados por ADR-010 não implementado | Motor cognitivo incompleto | P3-Patrimonio | P0 |
| B08 | 7 ADRs bloqueados por ADR-011 não implementado | Sem comunicação entre engines | P2-EventBus | P0 |

### 1.3 Patrimônio Existente

| Ativo | Estado | Valor |
|-------|--------|-------|
| CRM (Lead → Cliente → Contato) | ✅ Completo | Core do negócio |
| Financeiro (receita/despesa/recorrência) | ✅ Completo | Core do negócio |
| Tarefas (CRUD, tipos, prioridade) | ✅ Completo | Core do negócio |
| Onboarding/Implantação | ✅ Completo | Core do negócio |
| Histórico/Timeline | ✅ Completo | Core do negócio |
| Autenticação + Multi-empresa | ✅ Completo | Core do negócio |
| Assistente IA (Anthropic) | ✅ Completo | Diferencial |
| Context Engine (mineração, carga, decaimento, fusão, cache) | ✅ Completo | Motor Cognitivo |
| Decision Engine (decisões, pesos, deploys, atalhos, diário) | ✅ Completo | Motor Cognitivo |
| Memory Engine (armazenamento, recuperação, consolidação, gc) | ✅ Completo | Motor Cognitivo |
| Outcome Engine (registro de resultados) | ✅ Completo | Motor Cognitivo |
| Signal Engine (captura) | 🔶 Parcial | Motor Cognitivo |
| Knowledge Engine (base) | 🔶 Parcial | Motor Cognitivo |
| Learning Engine (padrões) | 🔶 Parcial | Motor Cognitivo |
| Validation Engine (básico) | 🔶 Parcial | Motor Cognitivo |
| Activation Engine (gatilhos básicos) | 🔶 Parcial | Motor Cognitivo |
| Dashboard básico | 🔶 Parcial | Interface |
| Configurações básicas | 🔶 Parcial | Interface |

### 1.4 Dívida Técnica

| Tipo | Quantidade | Esforço Estimado |
|------|------------|------------------|
| Schema — FK ausentes | 4 estruturas | 2 dias |
| Schema — Tenant ausente | 12 models | 3 dias |
| Schema — Soft delete ausente | 15 models | 2 dias |
| Schema — Auditoria ausente | 20 models | 1 dia |
| Schema — Índices ausentes | Toda a base | 1 dia |
| Services > 300 linhas | 5 services | 3 dias |
| Validação Zod ausente | 40% das rotas | 2 dias |
| Sem tratamento de erro padrão | Global | 1 dia |
| Sem logs estruturados | Global | 1 dia |
| Sem testes | 100% | 20 dias |
| Sem RLS | Global | 2 dias |
| Sem rate limiting | Global | 1 dia |

### 1.5 Risco Atual

| Risco | Probabilidade | Impacto | Mitigação |
|-------|--------------|---------|-----------|
| Perda de dados por falta de soft delete | Alta | Alto | Programa 1 — urgente |
| Vazamento de dados entre empresas | Média | Crítico | Programa 1 — urgente |
| Regressão silenciosa sem testes | Alta | Alto | Programa 6 |
| Dados inválidos sem validação | Média | Médio | Programa 1 |
| Motor cognitivo paralisa sem Event Bus | Alta | Alto | Programa 2 |


---

## 2. Programa Mestre

O projeto é dividido em 6 Programas executados em sequência. Cada programa é independente do ponto de vista de entrega: ao final de cada programa, o sistema deve estar funcional e estável.

### Os 6 Programas

`
P1 ──────────────────────────────────────────────────
  FOUNDATION
  Base de dados íntegra. Segurança. Confiabilidade.
  ──────────────────────────────────────────────────
  Remove 6 brechas críticas. Habilita a execução segura.

P2 ──────────────────────────────────────────────────
  EVENT BUS
  Barramento cognitivo central.
  ──────────────────────────────────────────────────
  Habilita comunicação entre todos os engines.
  Dependência de 7 ADRs.

P3 ──────────────────────────────────────────────────
  PATRIMÔNIO COGNITIVO
  Memória unificada. Conhecimento. Esquecimento. Síntese.
  ──────────────────────────────────────────────────
  ADR-010. Central cognitiva de dados.

P4 ──────────────────────────────────────────────────
  PIPELINE COGNITIVO
  Ciclo OODA completo. Observação. Hipótese. Ritmo.
  ──────────────────────────────────────────────────
  Motor cognitivo em operação contínua.

P5 ──────────────────────────────────────────────────
  DECISION ENGINE
  Prioridade. Confiança. Relevância. Decisão. Interface.
  ──────────────────────────────────────────────────
  Decisor apoiando o empresário.

P6 ──────────────────────────────────────────────────
  OPTIMIZATION
  Testes. CI/CD. Performance. Cache. Escalabilidade.
  ──────────────────────────────────────────────────
  Qualidade de produção. Preparação para escala.
`

### Fluxo de Dependências

`
P1 ───> P2 ───> P3 ───> P4 ───> P5
                              │
                              └──> P6 (paralelo após P4)
`

P1 é pré-requisito de todos. P2 é pré-requisito de P3, P4, P5. P3 e P4 são pré-requisitos de P5. P6 pode começar após P4 (mas P1 é recomendado).

---

## 3. Cada Programa

### 3.1 Programa 1 — Foundation

**Objetivo:** Estabilizar a base de dados, garantir segurança mínima e criar fundação confiável para todo o motor cognitivo.

**Escopo:**
- Schema DB completo (FK, índices, tenant, soft delete, auditoria)
- Tratamento de erros padronizado em toda a aplicação
- Validação Zod em 100% das rotas
- Logs estruturados em todos os serviços
- RLS (Row Level Security) no Supabase
- Rate limiting básico

**Fora do escopo:**
- Testes automatizados (Programa 6)
- Cache (Programa 6)
- Otimização de performance (Programa 6)

**Dependências:** Nenhuma. É o primeiro programa.

**Riscos:**
- Migrações podem exigir limpeza de dados órfãos antes de criar FKs
- Backfill de tenantId em 12 models com dados existentes sem empresa vinculada
- RLS pode bloquear acesso se mal configurada

**Arquivos:**
- sistema/prisma/schema.prisma — todos os models
- sistema/src/app/api/**/route.ts — todas as rotas
- sistema/src/lib/prisma.ts — conexão com banco
- sistema/src/lib/errors.ts — tratamento de erros (criar)
- sistema/src/lib/logger.ts — logs estruturados (criar)
- sistema/src/lib/validation.ts — schemas Zod (criar)
- sistema/src/middleware.ts — rate limiting + RLS validation (criar)

**ADRs envolvidos:**
- ADR-030 (Migração de Dados)
- ADR-032 (Políticas de Retenção)
- ADR-012 (Eventos — validação de entrada)

**Critérios de Aceite:**
1. Todas as 38 models têm FKs íntegras, companyId/tenantId, deletedAt, createdAt, updatedAt
2. Índices explícitos nos campos de busca (tenantId, companyId, status, data)
3. Zero warnings de migration
4. 100% das rotas com validação Zod
5. Resposta de erro padronizada (ErrorResponse) em todas as APIs
6. Logs com nível (info/warn/error), contexto e requestId
7. RLS policies ativas no Supabase para todas as tabelas
8. Rate limiting ativo em rotas de API

**Métricas:**
- Modelos com FK: 38/38 (antes: 34/38)
- Modelos com tenant: 38/38 (antes: 26/38)
- Modelos com soft delete: 38/38 (antes: 23/38)
- Modelos com auditoria: 38/38 (antes: 18/38)
- Rotas com validação: 100% (antes: ~60%)
- RLS: ativo (antes: inexistente)

**Tempo estimado:** 10-14 dias


### 3.2 Programa 2 — Event Bus

**Objetivo:** Implementar o barramento central de eventos cognitivos que permite a comunicação entre todos os engines do motor cognitivo.

**Escopo:**
- Cognitive Bus (eventEmitter interno com fila no banco)
- Publicação e assinatura de eventos
- Eventos do Catálogo (negócio, cognitivo, entrada, saída, jornada)
- Dead letter queue para eventos com falha
- Retry com backoff exponencial
- Monitoramento básico de eventos (fila, taxa, falhas)

**Fora do escopo:**
- Redis ou mensageria externa (a menos que a fila no banco se prove insuficiente)
- Event sourcing
- CQRS

**Dependências:** Programa 1 (Foundation) — schema íntegro, tratamento de erros, logs

**Riscos:**
- Fila no banco pode ser gargalo em alta frequência — plano de migração para Redis preparado
- Eventos órfãos se o publicador falhar antes de persistir
- Ordem de eventos não garantida se usar fila no banco com paralelismo

**Arquivos:**
- sistema/src/engine/cognitive-bus.ts — barramento central (criar)
- sistema/src/engine/event-publisher.ts — publicação (criar)
- sistema/src/engine/event-subscriber.ts — assinatura (criar)
- sistema/src/engine/dead-letter-queue.ts — DLQ (criar)
- sistema/src/engine/event-retry.ts — retry (criar)
- sistema/prisma/schema.prisma — modelos Event, EventSubscription, DeadLetter (criar)

**ADRs envolvidos:**
- ADR-011 (Event Bus / Cognitive Bus) — **principal**
- ADR-012 (Event Catalog)
- ADR-025 (Synthesis Engine — consome eventos)
- ADR-006 (Observation Engine — publica eventos)
- ADR-005 (Learning Engine — consome eventos)
- ADR-007 (Signal Engine — publica eventos)
- ADR-015 (Activation Engine — consome eventos)

**Critérios de Aceite:**
1. Eventos são publicados e entregues a todos os assinantes registrados
2. Assinantes podem se registrar dinamicamente por tipo de evento
3. Falhas em assinantes não afetam a entrega a outros assinantes
4. Eventos com falha vão para DLQ com metadados (motivo, timestamp, tentativas)
5. Retry automático com backoff (3 tentativas, intervalo crescente)
6. Log de cada evento publicado com tipo, origem, timestamp
7. Rastreabilidade: cada evento carrega correlationId

**Métricas:**
- Eventos publicados/semana: baseline 0 → meta > 100
- Taxa de entrega: > 99%
- Taxa de falha: < 1%
- Tempo médio de entrega: < 500ms
- Eventos na DLQ: < 5%

**Tempo estimado:** 8-12 dias

### 3.3 Programa 3 — Patrimônio Cognitivo

**Objetivo:** Unificar todo o patrimônio cognitivo da Ponte Digital em uma camada coesa de memória, conhecimento e síntese, conforme ADR-010.

**Escopo:**
- ADR-010 — Unificar Patrimônio Cognitivo (memória + conhecimento + esquecimento + síntese)
- Knowledge Engine completo (curadoria, exportação, versionamento)
- Memory Engine — consolidação avançada (ADR-009)
- Forgetting Engine (ADR-020) — TTL, arquivamento, garbage collection, soft delete cognitivo
- Synthesis Engine (ADR-025) — relatórios multi-domínio, LLM ou template
- Schema de Memory/Knowledge integrado
- API de consulta unificada ao patrimônio cognitivo

**Fora do escopo:**
- Visualização gráfica do patrimônio (congelado)
- Inteligência Coletiva (congelado)
- Recomendação avançada (congelado)

**Dependências:** Programa 2 (Event Bus) — eventos são a fonte de dados do patrimônio

**Riscos:**
- ADR-010 é o maior bloqueador da arquitetura (8 ADRs dependem) — complexidade de unificação
- Knowledge Engine existente é parcial — pode exigir reescrita
- Forgetting Engine sem critérios claros de o que esquecer

**Arquivos:**
- sistema/src/engine/knowledge-engine.ts — curadoria, exportação (expandir)
- sistema/src/engine/memory-engine.ts — consolidação avançada (expandir)
- sistema/src/engine/forgetting-engine.ts — TTL, gc, arquivamento (criar)
- sistema/src/engine/synthesis-engine.ts — relatórios (criar)
- sistema/src/engine/patrimonio-cognitivo.ts — unified facade (criar)
- sistema/src/app/api/patrimonio/route.ts — API unificada (criar)
- sistema/prisma/schema.prisma — modelos MemoryConsolidation, KnowledgeVersion, ForgettingPolicy, SynthesisReport (criar)

**ADRs envolvidos:**
- ADR-010 (Unificar Patrimônio Cognitivo) — **principal**
- ADR-009 (Memory Engine)
- ADR-020 (Forgetting Engine)
- ADR-025 (Synthesis Engine)

**Critérios de Aceite:**
1. MemoryEngine + KnowledgeEngine compartilham a mesma camada de armazenamento
2. Todo dado cognitivo tem TTL configurável (por tipo)
3. Dados expirados são arquivados automaticamente (soft delete + tabela de arquivo morto)
4. Síntese multi-domínio gera relatórios combinando dados de CRM + Financeiro + Tarefas + Decisões
5. API unificada /api/patrimonio responde com qualquer tipo de dado cognitivo
6. Garbage collection roda em ciclo configurável (Forgetting Engine)

**Métricas:**
- Patrimônio unificado: antes 3 engines separados → depois 1 camada
- Dados com TTL: 100% (antes: 0%)
- Síntese multi-domínio: 0 → 4+ domínios
- Esquecimento automático: ativo (antes: inexistente)

**Tempo estimado:** 12-16 dias


### 3.4 Programa 4 — Pipeline Cognitivo

**Objetivo:** Implementar o ciclo OODA completo (Observar → Orientar → Decidir → Agir) no motor cognitivo, com ritmo controlado e hipóteses testáveis.

**Escopo:**
- Observation Engine (ADR-006): captura de sinais de todas as fontes (CRM, Financeiro, Tarefas, externas), normalização, classificação
- Ritmo/Ciclo Engine (ADR-021): execução em frequência configurável, controle de ciclos, heartbeat
- Hypothesis Engine (ADR-013): registro de hipóteses, teste, validação/invalidação, aprendizado
- Pipeline cognitivo completo: Sinal → Contexto → Hipótese → Decisão → Ação → Resultado
- Aprimoramento do Signal Engine existente (distribuição, filtro, ponderação)
- Aprimoramento do Validation Engine (verificação cross-source)
- Aprimoramento do Activation Engine (priorização, coordenação entre gatilhos)

**Fora do escopo:**
- Trust Engine (Programa 5)
- Relevance Engine (Programa 5)
- Priority Engine (Programa 5)
- Centro de Decisão (Programa 5)

**Dependências:** Programa 2 (Event Bus) e Programa 3 (Patrimônio Cognitivo)

**Riscos:**
- Observation Engine sem fontes bem definidas pode gerar ruído
- Hypothesis Engine sem critérios de validação claros pode gerar falsos positivos
- Ritmo mal configurado pode sobrecarregar o sistema

**Arquivos:**
- sistema/src/engine/observation-engine.ts — captura, normalização, classificação (criar)
- sistema/src/engine/ritmo-engine.ts — ciclo, frequência, heartbeat (criar)
- sistema/src/engine/hypothesis-engine.ts — registro, teste, validação (criar)
- sistema/src/engine/pipeline-cognitivo.ts — orchestrator do ciclo OODA (criar)
- sistema/src/engine/signal-engine.ts — distribuição, filtro, ponderação (expandir)
- sistema/src/engine/validation-engine.ts — cross-source (expandir)
- sistema/src/engine/activation-engine.ts — coordenação (expandir)
- sistema/src/app/api/cognitivo/route.ts — APIs de consulta e controle (criar)
- sistema/prisma/schema.prisma — modelos Observation, Hypothesis, CognitiveCycle, PipelineLog (criar)

**ADRs envolvidos:**
- ADR-006 (Observation Engine) — **principal**
- ADR-013 (Hypothesis Engine) — **principal**
- ADR-021 (Ritmo / Ciclo Engine) — **principal**
- ADR-007 (Signal Engine)
- ADR-016 (Validation Engine)
- ADR-015 (Activation Engine)
- ADR-004 (Context Engine — integração com pipeline)
- ADR-003 (Decision Engine — integração com pipeline)

**Critérios de Aceite:**
1. Observation Engine captura sinais de 3+ fontes (CRM, Financeiro, Tarefas)
2. Sinais são normalizados e classificados por tipo e domínio
3. Ritmo Engine executa ciclos na frequência configurada (padrão: 5 min)
4. Cada ciclo gera heartbeat com métricas (sinais processados, hipóteses, decisões)
5. Hypothesis Engine registra hipóteses, executa testes e marca como validada/inválida
6. Pipeline completo executa: Sinal → Contexto → Hipótese → Decisão (quando aplicável)
7. Signal Engine existente é expandido com distribuição e ponderação
8. Activation Engine coordena gatilhos sem conflito

**Métricas:**
- Ciclos executados/dia: baseline 0 → meta > 288 (5 min)
- Sinais processados/ciclo: baseline 0 → meta > 10
- Hipóteses testadas/semana: baseline 0 → meta > 20
- Taxa de validação de hipóteses: < 50% (esperado — hipóteses falsas são aprendizado)
- Pipeline concluído: 0% → 100% dos ciclos completos sem erro

**Tempo estimado:** 16-22 dias

### 3.5 Programa 5 — Decision Engine

**Objetivo:** Completar o motor de decisão com priorização, confiança, relevância e interface dedicada para o empresário.

**Escopo:**
- Priority Engine (ADR-014): classificação de sinais/decisões por urgência e impacto
- Trust Engine (ADR-017): score de confiabilidade de fontes, histórico, decaimento de confiança
- Relevance Engine (ADR-018): filtro de sinais por relevância temporal + trust + contexto
- Decision Engine: integração com Priority, Trust, Relevance
- Centro de Decisão (UI): tela dedicada com linha do tempo, impactos, cenários, filtros
- Métricas Cognitivas (Dashboard): taxa de acerto, ciclos, sinais, tendências
- Configurações Cognitivas (UI): configuração de ciclo, prioridade, fontes

**Fora do escopo:**
- Mapa Cognitivo Visual (congelado)
- Recomendação avançada (congelado)
- Inteligência Coletiva (congelado)

**Dependências:** Programa 3 (Patrimônio Cognitivo) e Programa 4 (Pipeline Cognitivo)

**Riscos:**
- Trust Engine sem dados históricos de fontes — começa frio, precisa de período de aquecimento
- Priority Engine pode classificar tudo como urgente se os critérios não forem calibrados
- Centro de Decisão sem dados suficientes nos primeiros dias (depende do Pipeline estar rodando)

**Arquivos:**
- sistema/src/engine/priority-engine.ts — classificação urgência/impacto (criar)
- sistema/src/engine/trust-engine.ts — score de fontes, histórico (criar)
- sistema/src/engine/relevance-engine.ts — filtro temporal + trust + contexto (criar)
- sistema/src/engine/decision-engine.ts — integração com PTR (expandir)
- sistema/src/app/dashboard/centro-decisao/page.tsx — tela Centro de Decisão (criar)
- sistema/src/app/dashboard/page.tsx — métricas cognitivas (expandir)
- sistema/src/app/configuracoes/cognitivo/page.tsx — config cognitivas (criar)
- sistema/prisma/schema.prisma — modelos TrustScore, PriorityRule, RelevanceCache (criar)

**ADRs envolvidos:**
- ADR-014 (Priority Engine) — **principal**
- ADR-017 (Trust Engine) — **principal**
- ADR-018 (Relevance Engine) — **principal**
- ADR-003 (Decision Engine)
- ADR-008 (Outcome Engine)
- ADR-004 (Context Engine)

**Critérios de Aceite:**
1. Priority Engine classifica sinais em 3+ níveis de urgência/impacto (baixo, médio, alto)
2. Trust Engine atribui score de confiabilidade a cada fonte, com decaimento temporal
3. Relevance Engine filtra sinais com base em: trust ≥ mínimo + relevância temporal + contexto atual
4. Centro de Decisão exibe: lista de decisões, linha do tempo, impactos, cenários alternativos
5. Dashboard cognitivo exibe: taxa de acerto, ciclos ativos, sinais processados, tendências
6. Configurações permitem ajustar: frequência de ciclo, níveis de prioridade, fontes ativas
7. Decision Engine considera prioridade + trust + relevância antes de apresentar decisões

**Métricas:**
- Decisões apresentadas/semana: baseline ~10 → meta > 50
- Taxa de acerto das decisões: baseline ~50% → meta > 70%
- Fontes com trust score: 0 → 5+
- Centro de Decisão: 0 → 1 tela ativa
- Configurações cognitivas: 0 → 3+ configurações ajustáveis

**Tempo estimado:** 14-20 dias


### 3.6 Programa 6 — Optimization

**Objetivo:** Elevar a qualidade de engenharia a padrão de produção: testes, CI/CD, performance, cache, escalabilidade, monitoramento.

**Escopo:**
- Testes unitários: Motor Cognitivo (todos os 16 engines), cobertura ≥ 60%
- Testes de integração: API Routes, cobertura ≥ 50%
- Testes e2e: fluxos críticos (CRM, Financeiro, Tarefas), cobertura ≥ 30%
- CI/CD: GitHub Actions com lint, typecheck, testes, build
- Ambiente de staging: separado de produção
- Caching: Redis ou banco para consultas frequentes (catálogo, decisões, sinais)
- Performance: índices compostos, eliminação de N+1, paginação em todas as listas
- Rate Limiting avançado: por rota, por tenant
- Monitoramento: logs centralizados, alertas, dashboard de saúde
- Política de Backup: automático diário

**Fora do escopo:**
- Testes de carga/estresse
- Multi-região
- Kubernetes ou orquestração

**Dependências:** Idealmente após Programa 4 (Pipeline) — código mais estável para testar. Pode começar antes em paralelo com P5.

**Riscos:**
- Zero testes existentes — cultura de teste precisa ser construída do zero
- Cobertura de 60% no Motor Cognitivo pode ser difícil se o código não for testável (dependências não injetadas)
- Staging dobra o custo de infraestrutura

**Arquivos:**
- sistema/__tests__/ — diretório de testes (criar)
- sistema/jest.config.ts — config jest/vitest (criar)
- .github/workflows/ci.yml — CI pipeline (criar)
- sistema/src/lib/cache.ts — cache layer (criar)
- sistema/src/lib/monitoring.ts — monitoramento (criar)
- sistema/src/app/api/**/route.ts — paginação em todas as listas (expandir)
- sistema/prisma/schema.prisma — índices compostos (expandir)

**ADRs envolvidos:**
- ADR-022 (Cache Strategy)
- ADR-027 (Monitoring & Observability)
- ADR-026 (Test Strategy)
- ADR-023 (CI/CD Pipeline)
- ADR-031 (Backup & Recovery)

**Critérios de Aceite:**
1. Testes unitários: cobertura ≥ 60% no Motor Cognitivo
2. Testes de integração: cobertura ≥ 50% nas API Routes
3. Testes e2e: fluxos CRM + Financeiro + Tarefas rodando
4. CI/CD: pipeline completo (lint → typecheck → test → build) rodando a cada push
5. Staging: deploy automático a partir da branch develop
6. Cache: respostas de consultas frequentes em < 100ms (vs > 500ms sem cache)
7. N+1 eliminados em todas as queries PRISMA
8. Paginação em todas as listas (CRM, Financeiro, Tarefas, Decisões)
9. Rate limiting: configurado por rota com limites por tenant
10. Backup: automático diário com retenção de 30 dias
11. Monitoramento: alertas configurados para erro 500, latência > 2s, taxa de erro > 5%

**Métricas:**
- Cobertura de testes: 0% → 60%+ (unit), 50%+ (integration), 30%+ (e2e)
- CI/CD: 0 pipelines → 1 pipeline ativo
- Staging: 0 ambientes → 1 ambiente separado
- Cache: 0% das consultas → 100% das consultas frequentes cacheadas
- Performance: N+1 = 0 → eliminados
- Backup: 0 → automático diário
- Monitoramento: 0 alertas → 3+ alertas configurados

**Tempo estimado:** 20-30 dias


---

## 4. Work Packages

Cada programa é decomposto em work packages (WP). Cada WP é uma entrega atômica: começa, termina e pode ser verificada independentemente.

### 4.1 Programa 1 — Foundation

| WP | Nome | Complexidade | Dependências | Arquivos | Tempo | Critério de Conclusão |
|----|------|-------------|-------------|----------|-------|----------------------|
| WP-1.1 | FK nas 4 estruturas soltas | Média | Nenhuma | schema.prisma, migração | 1 dia | Anotacoes, Tags, OnboardingDecisoes, DecisaoSinais com FK íntegras |
| WP-1.2 | Índices explícitos | Baixa | WP-1.1 | schema.prisma, migração | 1 dia | Índices em tenantId, companyId, status, data em todas as models |
| WP-1.3 | Tenant fields (12 models) | Alta | Nenhuma | schema.prisma, migração, script backfill | 2 dias | 12 models com companyId/tenantId, dados existentes com backfill |
| WP-1.4 | Soft Delete (15 models) | Média | WP-1.1 | schema.prisma, migração | 1 dia | 15 models com deletedAt, queries filtram deletedAt = null |
| WP-1.5 | Auditoria (20 models) | Baixa | Nenhuma | schema.prisma, migração | 1 dia | 20 models com createdAt/updatedAt com default now() |
| WP-1.6 | Migration validada | Média | WP-1.1 a WP-1.5 | prisma migrate, verificação | 1 dia | Zero warnings, up + down funcionando |
| WP-1.7 | Tratamento de Erros Padrão | Média | Nenhuma | lib/errors.ts, rotas API | 2 dias | ErrorResponse padronizado em todas as APIs |
| WP-1.8 | Logs Estruturados | Baixa | WP-1.7 | lib/logger.ts, services | 1 dia | Logs com nível, contexto, requestId, timestamp |
| WP-1.9 | Validação Zod 100% | Média | Nenhuma | lib/validation.ts, rotas sem validação | 2 dias | 100% das rotas com schema Zod |
| WP-1.10 | RLS Policies | Alta | WP-1.3 | SQL no Supabase, testes | 2 dias | RLS ativo em todas as tabelas, sem bloquear acesso legítimo |
| WP-1.11 | Rate Limiting básico | Baixa | WP-1.7 | middleware.ts | 1 dia | Rate limit ativo em rotas de API |

### 4.2 Programa 2 — Event Bus

| WP | Nome | Complexidade | Dependências | Arquivos | Tempo | Critério de Conclusão |
|----|------|-------------|-------------|----------|-------|----------------------|
| WP-2.1 | Modelos de Evento no Schema | Baixa | P1 completo | schema.prisma (Event, EventSubscription, DeadLetter) | 1 dia | Modelos criados, migração ok |
| WP-2.2 | Cognitive Bus core | Alta | WP-2.1 | engine/cognitive-bus.ts | 3 dias | EventEmitter interno funcional, pub/sub operacional |
| WP-2.3 | Event Publisher | Média | WP-2.2 | engine/event-publisher.ts | 1 dia | Eventos publicados com tipo, origem, correlationId, timestamp |
| WP-2.4 | Event Subscriber | Média | WP-2.2 | engine/event-subscriber.ts | 1 dia | Assinantes registrados por tipo, entregues sem bloqueio |
| WP-2.5 | Dead Letter Queue | Média | WP-2.2 | engine/dead-letter-queue.ts | 1 dia | Eventos com falha na DLQ com metadados |
| WP-2.6 | Retry com backoff | Média | WP-2.5 | engine/event-retry.ts | 1 dia | 3 tentativas com intervalo crescente |
| WP-2.7 | Catálogo de Eventos implementado | Baixa | WP-2.2 | engine/event-types.ts, CATALOGO_EVENTOS.md | 1 dia | Todos os tipos do catálogo registrados como constantes |
| WP-2.8 | Monitoramento de Eventos | Baixa | WP-2.2 | engine/event-monitor.ts | 1 dia | Métricas: fila, taxa, falhas, tempo de entrega |

### 4.3 Programa 3 — Patrimônio Cognitivo

| WP | Nome | Complexidade | Dependências | Arquivos | Tempo | Critério de Conclusão |
|----|------|-------------|-------------|----------|-------|----------------------|
| WP-3.1 | MemoryEngine — consolidação avançada | Média | P2 completo | engine/memory-engine.ts, schema | 3 dias | Consolidação automática, merge de memórias relacionadas |
| WP-3.2 | KnowledgeEngine — curadoria + exportação | Média | P2 completo | engine/knowledge-engine.ts, schema | 3 dias | Curadoria manual, exportação JSON/CSV, versionamento |
| WP-3.3 | ForgettingEngine — TTL + gc | Alta | WP-3.1, WP-3.2 | engine/forgetting-engine.ts, schema | 3 dias | TTL por tipo, gc automático, arquivamento |
| WP-3.4 | SynthesisEngine — relatórios | Alta | WP-3.1, WP-3.2 | engine/synthesis-engine.ts | 3 dias | Relatórios multi-domínio, template ou LLM |
| WP-3.5 | Facade Patrimônio Cognitivo | Média | WP-3.1 a WP-3.4 | engine/patrimonio-cognitivo.ts | 2 dias | API unificada, facade consolidando 3 engines |
| WP-3.6 | API de consulta /api/patrimonio | Baixa | WP-3.5 | app/api/patrimonio/route.ts | 1 dia | GET com filtros por tipo, data, domínio |

### 4.4 Programa 4 — Pipeline Cognitivo

| WP | Nome | Complexidade | Dependências | Arquivos | Tempo | Critério de Conclusão |
|----|------|-------------|-------------|----------|-------|----------------------|
| WP-4.1 | ObservationEngine — captura | Alta | P2, P3 | engine/observation-engine.ts, schema | 4 dias | Sinais capturados de 3+ fontes, normalizados, classificados |
| WP-4.2 | RitmoEngine — ciclo + frequência | Média | P2 | engine/ritmo-engine.ts, schema | 2 dias | Ciclos na frequência configurada, heartbeat |
| WP-4.3 | HypothesisEngine — registro + teste | Alta | P2, P3, WP-4.1 | engine/hypothesis-engine.ts, schema | 4 dias | Hipóteses registradas, testadas, validadas/invalidadas |
| WP-4.4 | Pipeline Orchestrator | Alta | WP-4.1 a WP-4.3 | engine/pipeline-cognitivo.ts | 3 dias | Pipeline OODA completo executando em ciclos |
| WP-4.5 | SignalEngine — expansão | Média | P2 | engine/signal-engine.ts | 2 dias | Distribuição por tipo, filtro por fonte, ponderação |
| WP-4.6 | ValidationEngine — cross-source | Média | WP-4.1 | engine/validation-engine.ts | 2 dias | Verificação cruzada entre fontes |
| WP-4.7 | ActivationEngine — coordenação | Média | WP-4.4 | engine/activation-engine.ts | 2 dias | Gatilhos coordenados sem conflito |

### 4.5 Programa 5 — Decision Engine

| WP | Nome | Complexidade | Dependências | Arquivos | Tempo | Critério de Conclusão |
|----|------|-------------|-------------|----------|-------|----------------------|
| WP-5.1 | PriorityEngine | Alta | P3, P4 | engine/priority-engine.ts, schema | 3 dias | Classificação urgência/impacto, 3+ níveis |
| WP-5.2 | TrustEngine | Alta | P2 | engine/trust-engine.ts, schema | 3 dias | Score de fontes, histórico, decaimento |
| WP-5.3 | RelevanceEngine | Média | WP-5.2, P3 | engine/relevance-engine.ts, schema | 2 dias | Filtro temporal + trust + contexto |
| WP-5.4 | DecisionEngine — integração PTR | Média | WP-5.1 a WP-5.3 | engine/decision-engine.ts | 2 dias | Decisões consideram prioridade + trust + relevância |
| WP-5.5 | Centro de Decisão (UI) | Alta | P2, WP-5.4 | app/dashboard/centro-decisao/ | 4 dias | Tela com lista, filtros, linha do tempo, impactos |
| WP-5.6 | Dashboard Cognitivo | Média | WP-5.4 | app/dashboard/page.tsx | 2 dias | Métricas: acerto, ciclos, sinais, tendências |
| WP-5.7 | Configurações Cognitivas | Média | WP-5.4 | app/configuracoes/cognitivo/ | 2 dias | Ciclo, prioridade, fontes configuráveis |

### 4.6 Programa 6 — Optimization

| WP | Nome | Complexidade | Dependências | Arquivos | Tempo | Critério de Conclusão |
|----|------|-------------|-------------|----------|-------|----------------------|
| WP-6.1 | Testes unitários — Motor Cognitivo | Alta | P4 completo | __tests__/engine/ | 8 dias | Cobertura ≥ 60% em 16 engines |
| WP-6.2 | Testes de integração — API | Média | P4 completo | __tests__/api/ | 5 dias | Cobertura ≥ 50% nas rotas |
| WP-6.3 | Testes e2e — fluxos críticos | Média | P5 completo | __tests__/e2e/ | 5 dias | CRM + Financeiro + Tarefas |
| WP-6.4 | CI/CD — GitHub Actions | Baixa | WP-6.1, WP-6.2 | .github/workflows/ci.yml | 1 dia | Pipeline completo rodando |
| WP-6.5 | Staging | Baixa | WP-6.4 | vercel.json, deploy config | 1 dia | Deploy automático de develop |
| WP-6.6 | Caching (Redis/banco) | Média | P4 completo | lib/cache.ts, services | 3 dias | Consultas frequentes < 100ms |
| WP-6.7 | Performance — índices + N+1 | Média | P1 | schema.prisma, services | 3 dias | N+1 eliminados, índices compostos |
| WP-6.8 | Paginação em listas | Baixa | P1 | app/api/**/route.ts | 2 dias | Todas as listas paginadas |
| WP-6.9 | Rate Limiting avançado | Média | P1 | middleware.ts | 2 dias | Por rota, por tenant |
| WP-6.10 | Backup automático | Baixa | Nenhuma | Script SQL, cron | 1 dia | Backup diário, retenção 30 dias |
| WP-6.11 | Monitoramento + alertas | Média | P1 | lib/monitoring.ts, config | 2 dias | 3+ alertas configurados |


---

## 5. Critical Path

O caminho crítico é a sequência de work packages que determina o tempo total do projeto. Qualquer atraso nestes pacotes atrasa o projeto inteiro.

### 5.1 Diagrama do Caminho Crítico

`
Foundation ──> Event Bus ──> Patrimônio ──> Pipeline ──> Decision Engine
WP-1.1       WP-2.2        WP-3.1         WP-4.1       WP-5.1
WP-1.3       WP-2.2        WP-3.3         WP-4.3       WP-5.5
└── WP-1.6   └── WP-2.6    └── WP-3.5     └── WP-4.4   └── WP-5.7

Parallel path (non-critical):
Optimization (P6) — pode começar após P4
├── P6 pode iniciar testes unitários (WP-6.1) após P4
├── P6 pode iniciar CI/CD (WP-6.4) após WP-6.1
└── Performance (WP-6.7) depende de P1 apenas
`

### 5.2 Dependências Críticas

| WP | Depende de | Bloqueia | Dias de Folga |
|----|-----------|----------|---------------|
| WP-1.1 (FK) | Nenhuma | WP-1.2, WP-1.4, WP-1.6 | 0 — crítico |
| WP-1.3 (Tenant) | Nenhuma | WP-1.6, WP-1.10 (RLS) | 0 — crítico |
| WP-1.6 (Migration válida) | WP-1.1 a WP-1.5 | P2 completo | 0 — crítico |
| WP-2.2 (Bus core) | WP-1.6 | WP-2.3 a WP-2.8, P3, P4 | 0 — crítico |
| WP-3.1 (Memory consolidação) | P2 | WP-3.3, WP-3.4, WP-3.5 | 0 — crítico |
| WP-4.1 (Observation) | P2, P3 | WP-4.3, WP-4.4 | 0 — crítico |
| WP-4.4 (Pipeline Orchestrator) | WP-4.1 a WP-4.3 | P5 | 0 — crítico |
| WP-5.1 (Priority) | P3, P4 | WP-5.4, WP-5.5 | 0 — crítico |
| WP-5.5 (Centro Decisão UI) | WP-5.4 | — | 2 dias |

### 5.3 Folga nos Caminhos Não Críticos

| WP | Caminho | Dias de Folga | Pode Atrasar |
|----|---------|---------------|-------------|
| WP-1.2 (Índices) | Foundation | 3 dias | Sim, sem atrasar o projeto |
| WP-1.4 (Soft Delete) | Foundation | 2 dias | Sim |
| WP-1.5 (Auditoria) | Foundation | 4 dias | Sim |
| WP-1.7 (Erros) | Foundation | 5 dias | Sim (independente de schema) |
| WP-1.8 (Logs) | Foundation | 5 dias | Sim |
| WP-1.9 (Zod) | Foundation | 5 dias | Sim |
| WP-1.10 (RLS) | Foundation | 3 dias | Sim |
| WP-1.11 (Rate Limit) | Foundation | 5 dias | Sim |
| WP-2.5 (DLQ) | Event Bus | 2 dias | Sim |
| WP-2.6 (Retry) | Event Bus | 2 dias | Sim |
| WP-2.8 (Monitoria Eventos) | Event Bus | 3 dias | Sim |
| WP-4.5 (Signal expansão) | Pipeline | 4 dias | Sim |
| WP-4.6 (Validation cross) | Pipeline | 4 dias | Sim |
| WP-4.7 (Activation coord) | Pipeline | 4 dias | Sim |
| P6 (Optimization) | Paralelo | Inicia após P4 | Pode começar antes |

### 5.4 Gargalos Identificados

| Gargalo | Causa | Impacto | Mitigação |
|---------|-------|---------|-----------|
| WP-1.3 (Tenant backfill) | 12 models com dados sem empresa | Atraso de 2 dias no caminho crítico | Script de backfill preparado antes de iniciar |
| WP-2.2 (Bus core) | Implementação mais complexa | Se > 5 dias, atrasa todo o projeto | Simplificar: fila no banco em vez de Redis |
| WP-4.1 (Observation) | Múltiplas fontes, normalização complexa | Se > 6 dias, atrasa P5 | Implementar 2 fontes primeiro, expandir depois |
| WP-5.5 (Centro Decisão UI) | Depende de dados do pipeline | Interface sem dados nos primeiros dias | Mock data para desenvolvimento frontend |

### 5.5 Tempo Total Estimado do Caminho Crítico

| Programa | Dias no Caminho Crítico |
|----------|------------------------|
| P1 — Foundation | 5 dias (WP-1.1 + WP-1.3 + WP-1.6) |
| P2 — Event Bus | 5 dias (WP-2.2 + WP-2.6) |
| P3 — Patrimônio | 8 dias (WP-3.1 + WP-3.3 + WP-3.5) |
| P4 — Pipeline | 11 dias (WP-4.1 + WP-4.3 + WP-4.4) |
| P5 — Decision Engine | 9 dias (WP-5.1 + WP-5.5 + WP-5.7) |
| **Total caminho crítico** | **38 dias** |

> **Nota:** P6 (Optimization) roda em paralelo parcial, não entra no caminho crítico. WP-6.7 (Performance) depende apenas de P1 e pode começar cedo.


---

## 6. Matriz de Dependências

### 6.1 Programa x Programa

| | P1 Foundation | P2 Event Bus | P3 Patrimônio | P4 Pipeline | P5 Decision | P6 Optimization |
|--|:---:|:---:|:---:|:---:|:---:|:---:|
| **P1 Foundation** | — | ✅ Requer | ✅ Requer | ✅ Requer | ✅ Requer | ✅ Requer |
| **P2 Event Bus** | — | — | ✅ Requer | ✅ Requer | ✅ Requer | ⬜ Opcional |
| **P3 Patrimônio** | — | — | — | ✅ Requer | ✅ Requer | ⬜ Opcional |
| **P4 Pipeline** | — | — | — | — | ✅ Requer | ⬜ Opcional |
| **P5 Decision** | — | — | — | — | — | ⬜ Opcional |
| **P6 Optimization** | ⬜ Parcial | — | — | ⬜ Recomendado | ⬜ Recomendado | — |

### 6.2 ADR x Programa

> **⚠️ Atenção:** Os números de ADR nesta tabela referem-se a ADRs **planejadas** durante a criação deste documento, que **não correspondem** aos ADRs reais em `docs/04-DECISIONS/ADR/`. A numeração real (ADR-001 a ADR-034) cobre decisões diferentes. Consulte `docs/09-ARCHITECTURE/ADR_NAVIGATOR.md` para o mapeamento correto.

| ADR (planejado) | Nome | P1 | P2 | P3 | P4 | P5 | P6 |
|-----|------|:--:|:--:|:--:|:--:|:--:|:--:|
| ADR-001 | Arquitetura DDD | ✅ | — | — | — | — | — |
| ADR-002 | Multi-tenancy | ✅ | — | — | — | — | — |
| ADR-003 | Decision Engine | — | — | — | — | ✅ | — |
| ADR-004 | Context Engine | — | — | — | ✅ | ✅ | — |
| ADR-005 | Learning Engine | — | — | — | ✅ | — | — |
| ADR-006 | Observation Engine | — | — | — | ✅ | — | — |
| ADR-007 | Signal Engine | — | ✅ | — | ✅ | — | — |
| ADR-008 | Outcome Engine | — | — | — | ✅ | ✅ | — |
| ADR-009 | Memory Engine | — | — | ✅ | — | — | — |
| ADR-010 | Unificar Patrimônio Cognitivo | — | — | ✅ | — | — | — |
| ADR-011 | Event Bus / Cognitive Bus | — | ✅ | — | — | — | — |
| ADR-012 | Eventos (Catálogo) | — | ✅ | — | — | — | — |
| ADR-013 | Hypothesis Engine | — | — | — | ✅ | — | — |
| ADR-014 | Priority Engine | — | — | — | — | ✅ | — |
| ADR-015 | Activation Engine | — | — | — | ✅ | — | — |
| ADR-016 | Validation Engine | — | — | — | ✅ | — | — |
| ADR-017 | Trust Engine | — | — | — | — | ✅ | — |
| ADR-018 | Relevance Engine | — | — | — | — | ✅ | — |
| ADR-019 | Domínios via API | — | — | — | — | — | ✅ |
| ADR-020 | Forgetting Engine | — | — | ✅ | — | — | — |
| ADR-021 | Ritmo / Ciclo Engine | — | — | — | ✅ | — | — |
| ADR-022 | Cache Strategy | — | — | — | — | — | ✅ |
| ADR-023 | CI/CD Pipeline | — | — | — | — | — | ✅ |
| ADR-024 | Server Actions | — | — | — | — | — | ✅ |
| ADR-025 | Synthesis Engine | — | — | ✅ | — | — | — |
| ADR-026 | Test Strategy | — | — | — | — | — | ✅ |
| ADR-027 | Monitoring | — | — | — | — | — | ✅ |
| ADR-028 | Deprecação DDD purista | ✅ | — | — | — | — | — |
| ADR-029 | Simplificar Architecture DDD | ✅ | — | — | — | — | — |
| ADR-030 | Migração de Dados | ✅ | — | — | — | — | — |
| ADR-031 | Backup & Recovery | — | — | — | — | — | ✅ |
| ADR-032 | Políticas de Retenção | ✅ | — | — | — | — | — |
| ADR-033 | Guidelines de engenharia | ✅ | — | — | — | — | — |
| ADR-034 | Congelamento de ADRs | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

### 6.3 Documento x Programa

| Documento | P1 | P2 | P3 | P4 | P5 | P6 |
|-----------|:--:|:--:|:--:|:--:|:--:|:--:|
| Constituição (CURRENT_PRODUCT.md) | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Modelo Cognitivo | — | ✅ | ✅ | ✅ | ✅ | — |
| Ontologia | ✅ | — | — | — | — | — |
| Motor Cognitivo | — | ✅ | ✅ | ✅ | ✅ | — |
| Architecture DDD | ✅ | — | — | — | — | — |
| Execution Architecture | — | ✅ | ✅ | ✅ | ✅ | — |
| Implementation Blueprint | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Catálogo de Eventos | — | ✅ | — | — | — | — |
| Engineering Guidelines | ✅ | — | — | — | — | ✅ |
| Auditoria Arquitetural | ✅ | — | — | — | — | ✅ |
| ADRs (34) | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

### 6.4 Work Package x WP (dependências internas)

| WP | Depende de | Bloqueia |
|----|-----------|----------|
| WP-1.2 | WP-1.1 | — |
| WP-1.4 | WP-1.1 | — |
| WP-1.6 | WP-1.1, WP-1.2, WP-1.3, WP-1.4, WP-1.5 | WP-2.1 |
| WP-1.10 | WP-1.3 | — |
| WP-2.1 | WP-1.6 | WP-2.2 |
| WP-2.2 | WP-2.1 | WP-2.3, WP-2.4, WP-2.5, WP-2.7, WP-3.1 |
| WP-2.5 | WP-2.2 | WP-2.6 |
| WP-2.8 | WP-2.2 | — |
| WP-3.1 | WP-2.2 | WP-3.3, WP-3.5 |
| WP-3.2 | WP-2.2 | WP-3.3, WP-3.5 |
| WP-3.3 | WP-3.1, WP-3.2 | WP-3.5 |
| WP-3.4 | WP-3.1, WP-3.2 | WP-3.5 |
| WP-3.5 | WP-3.1 a WP-3.4 | WP-3.6 |
| WP-4.1 | WP-2.2, WP-3.5 | WP-4.3, WP-4.4 |
| WP-4.2 | WP-2.2 | WP-4.4 |
| WP-4.3 | WP-3.5, WP-4.1 | WP-4.4 |
| WP-4.4 | WP-4.1, WP-4.2, WP-4.3 | WP-4.7, WP-5.1 |
| WP-4.5 | WP-2.2 | — |
| WP-4.6 | WP-4.1 | — |
| WP-4.7 | WP-4.4 | — |
| WP-5.1 | WP-3.5, WP-4.4 | WP-5.4 |
| WP-5.2 | WP-2.2 | WP-5.3, WP-5.4 |
| WP-5.3 | WP-5.2 | WP-5.4 |
| WP-5.4 | WP-5.1, WP-5.2, WP-5.3 | WP-5.5, WP-5.6, WP-5.7 |
| WP-6.1 | WP-4.4 | WP-6.4 |
| WP-6.2 | WP-4.4 | WP-6.4 |
| WP-6.4 | WP-6.1, WP-6.2 | WP-6.5 |
| WP-6.6 | WP-4.4 | — |
| WP-6.7 | WP-1.6 | — (pode começar cedo) |


---

## 7. Milestones

Marcos que determinam o progresso do projeto. Cada milestone representa um estado verificável do sistema.

### 7.1 Milestones por Programa

| # | Milestone | Programa | Critério | Previsão |
|---|-----------|----------|----------|----------|
| M1 | **Base Íntegra** | P1 | Schema com FK, índices, tenant, soft delete, auditoria em 100% das models. Migration sem warnings. | Dia 5 |
| M2 | **Segurança Mínima** | P1 | RLS ativo. Validação Zod em 100% das rotas. Rate limiting operacional. | Dia 10 |
| M3 | **Confiabilidade Operacional** | P1 | Tratamento de erros padronizado. Logs estruturados em todos os serviços. | Dia 12 |
| M4 | **Barramento Ativo** | P2 | Eventos publicados, assinantes entregues, DLQ operacional, retry funcionando. | Dia 17 |
| M5 | **Patrimônio Unificado** | P3 | Memory + Knowledge + Forgetting + Synthesis integrados em uma camada. API /api/patrimonio respondendo. | Dia 25 |
| M6 | **Primeiro Ciclo OODA** | P4 | Observation → Hypothesis → Decision → Action executando em ciclo automático. | Dia 33 |
| M7 | **Pipeline Cognitivo Completo** | P4 | Pipeline completo com ritmo controlado, sinais de 3+ fontes, validação cross-source, ativação coordenada. | Dia 38 |
| M8 | **Decisor Inteligente** | P5 | Decision Engine integrado com Priority + Trust + Relevance. Centro de Decisão funcional. | Dia 45 |
| M9 | **Dashboard Cognitivo** | P5 | Métricas de acerto, ciclos, sinais, tendências visíveis. Configurações ajustáveis. | Dia 48 |
| M10 | **Qualidade de Produção** | P6 | Testes ≥ 60% core. CI/CD rodando. Cache ativo. Backup automático. Monitoramento com alertas. | Dia 65 |

### 7.2 Timeline de Milestones

`
Dia 0  ├─── INÍCIO
       │
Dia 5  ├─── M1 — Base Íntegra
       │
Dia 10 ├─── M2 — Segurança Mínima
       │
Dia 12 ├─── M3 — Confiabilidade Operacional
       │    └── Foundation completo
       │
Dia 17 ├─── M4 — Barramento Ativo
       │    └── Event Bus completo
       │
Dia 25 ├─── M5 — Patrimônio Unificado
       │    └── Patrimônio Cognitivo completo
       │
Dia 33 ├─── M6 — Primeiro Ciclo OODA
       │
Dia 38 ├─── M7 — Pipeline Cognitivo Completo
       │    └── Pipeline Cognitivo completo
       │
Dia 45 ├─── M8 — Decisor Inteligente
       │
Dia 48 ├─── M9 — Dashboard Cognitivo
       │    └── Decision Engine completo
       │
Dia 65 ├─── M10 — Qualidade de Produção
            └── Optimization completo
`

### 7.3 Marcos de Qualidade

| Marco | Critério | Quando |
|-------|----------|--------|
| **Fundação segura** | Sem brecha P0 aberta | M3 |
| **Motor comunicante** | Todos os engines trocam eventos | M4 |
| **Motor pensante** | Pipeline OODA rodando autonomamente | M7 |
| **Motor útil** | Empresário toma decisão baseada no motor | M8 |
| **Motor confiável** | Testes, CI/CD, backup, monitoramento | M10 |


---

## 8. Definition of Done

Cada módulo do sistema tem critérios objetivos que determinam quando está pronto. Nenhum módulo é considerado completo até satisfazer todos os critérios.

### 8.1 DoD Global (todo módulo)

- [ ] Código implementado conforme arquitetura congelada
- [ ] Schema migration validada (up + down)
- [ ] RLS policy verificada para o módulo
- [ ] Validação Zod nas rotas de entrada
- [ ] Tratamento de erros padronizado
- [ ] Logs nos pontos de entrada/saída
- [ ] Testes unitários escritos (cobertura ≥ 60% quando aplicável)
- [ ] Sem warnings de typecheck
- [ ] Sem warnings de lint
- [ ] Documentação atualizada (se mudar comportamento)

### 8.2 DoD por Tipo de Módulo

**Engine (Motor Cognitivo):**
- [ ] Implementa a interface definida na Execution Architecture
- [ ] Publica eventos no Cognitive Bus quando o estado muda
- [ ] Assina eventos relevantes de outros engines
- [ ] Respeita TTL/configurações do Forgetting Engine
- [ ] Registra métricas de operação (tempo, taxa, erros)
- [ ] Tratamento de falhas sem interromper o pipeline

**API Route:**
- [ ] Validação Zod no body/query/params
- [ ] ErrorResponse padronizado para todos os erros
- [ ] Log com requestId, método, path, duração
- [ ] Rate limiting aplicado
- [ ] RLS respeitada (filtro por tenant)
- [ ] Paginação implementada (quando lista)
- [ ] Teste de integração escrito

**Página (Frontend):**
- [ ] Carrega dados da API com loading state
- [ ] Tratamento de erro (fallback UI)
- [ ] Responsivo (mobile + desktop)
- [ ] Acessível (labels, roles, aria)
- [ ] Tema consistente (cores, tipografia, spacing)

**Infraestrutura:**
- [ ] Documentada em runbook
- [ ] Backup automático verificado
- [ ] Monitoramento com alerta
- [ ] CI/CD pipeline atualizado

### 8.3 DoD por Programa

| Programa | DoD Específico |
|----------|----------------|
| **P1 — Foundation** | Todas as models íntegras. RLS ativo. Zero rota sem validação. Erro padronizado globalmente. |
| **P2 — Event Bus** | Eventos fluindo entre engines. DLQ capturando falhas. Retry funcionando. Métricas de evento visíveis. |
| **P3 — Patrimônio** | Memory + Knowledge + Forgetting + Synthesis integrados. API unificada respondendo. TTL configurado por tipo. |
| **P4 — Pipeline** | OODA completo rodando em ciclos. 3+ fontes de sinal. Hipóteses testadas. Pipeline sem erro em 95% dos ciclos. |
| **P5 — Decision** | Prioridade, Trust, Relevance integrados. Centro de Decisão funcional. Dashboard com métricas. |
| **P6 — Optimization** | Testes ≥ 60% core. CI/CD verde. Cache < 100ms. Backup diário. Alertas configurados. |

### 8.4 DoD de Sprint

Cada sprint termina quando:
- [ ] Todos os WPs da sprint concluídos e verificados
- [ ] Nenhum novo warning de typecheck ou lint
- [ ] Testes passando (quando aplicável)
- [ ] Migration validada (quando aplicável)
- [ ] Deploy em produção estável por 24h

---

## 9. Dashboard Executivo

Indicadores de progresso do projeto. Atualizar semanalmente.

### 9.1 Indicadores de Progresso

| Indicador | Hoje | Meta | Fórmula |
|-----------|:----:|:----:|---------|
| **Arquitetura** | 100% | 100% | Documentos congelados / total necessários |
| **Implementação** | 34% | 100% | Engines completos / 16 engines |
| **Refatoração** | 18% | 100% | Débitos pagos / total de débitos |
| **Infraestrutura** | 25% | 100% | Itens de infra implementados / planejados |
| **Performance** | 12% | 100% | Otimizações aplicadas / identificadas |
| **Segurança** | 30% | 100% | Controles de segurança ativos / necessários |
| **Testes** | 0% | 100% | Cobertura atual / cobertura meta |
| **Escalabilidade** | 22% | 100% | Práticas de escala implementadas / planejadas |

### 9.2 Indicadores por Programa

> **Nota:** Os Programas abaixo (P1-P6) referem-se ao roadmap futuro de produto. O Release Program v1.0 (Programas 0-5 de preparação para produção) foi concluído em 24/07/2026 com 33+ WPs executados.

| Programa | Progresso | WPs Concluídos | WPs Totais |
|----------|:---------:|:--------------:|:----------:|
| P1 — Foundation | 0% | 0 | 11 |
| P2 — Event Bus | 0% | 0 | 8 |
| P3 — Patrimônio | 0% | 0 | 6 |
| P4 — Pipeline | 0% | 0 | 7 |
| P5 — Decision | 0% | 0 | 7 |
| P6 — Optimization | 0% | 0 | 11 |

#### Release Program v1.0 (concluído)

| Programa | Progresso | WPs Concluídos | Descrição |
|----------|:---------:|:--------------:|-----------|
| Programa 0 — Setup | 100% | 1 | Configuração inicial |
| Programa 1 — Auditoria | 100% | 8 | 198 arquivos auditados |
| Programa 2 — Documentação Viva | 100% | 8 | 7+ documentos |
| Programa 3 — Hardening + RC | 100% | 8 | 12 correções + RC |
| Programa 4 — Deploy e Go-Live | 100% | 8 | 8 documentos OPS |
| Programa 5 — Encerramento | 100% | 8 | Baseline + certificação |

### 9.3 Indicadores de Saúde

| Indicador | Alerta | Crítico | Monitorar |
|-----------|--------|---------|-----------|
| Caminho crítico em dia | ✅ Sim | ⚠️ Atraso > 2 dias | ❌ Atraso > 5 dias |
| Brechas P0 abertas | 0 | 1-2 | 3+ |
| WPs bloqueados | 0 | 1-2 | 3+ |
| Migration warnings | 0 | 1-2 | 3+ |
| Testes quebrados | 0 | 1-3 | 4+ |
| Erros em produção | < 1% | 1-3% | > 3% |

### 9.4 Indicadores de Produto

| Indicador | Baseline | Meta Pós-P5 |
|-----------|:--------:|:-----------:|
| Decisões registradas/semana | ~10 | > 50 |
| Taxa de acerto das decisões | ~50% | > 70% |
| Sinais processados/semana | ~20 | > 500 |
| Ciclos cognitivos/dia | 0 | > 50 |
| Hipóteses testadas/semana | 0 | > 20 |
| Engines ativos | 4/16 | 16/16 |


---

## 10. Plano de Execução

Ordem cronológica de execução. Sem arquitetura. Somente ação. Cada linha é um comando executável.

### 10.1 Semana 1-2 — Foundation (Dias 1-12)

`
Dia 1-2   WP-1.1  FK nas 4 estruturas soltas
Dia 1-2   WP-1.3  Tenant fields (12 models) + script de backfill
Dia 3     WP-1.2  Índices explícitos
Dia 3     WP-1.4  Soft Delete (15 models)
Dia 4     WP-1.5  Auditoria (20 models)
Dia 5     WP-1.6  Migration validada (up + down, zero warnings)
          ─────── M1 — Base Íntegra ───────
Dia 6-7   WP-1.7  Tratamento de Erros Padrão
Dia 7     WP-1.8  Logs Estruturados
Dia 8-9   WP-1.9  Validação Zod 100%
Dia 10    WP-1.10 RLS Policies (testar staging primeiro)
          ─────── M2 — Segurança Mínima ───────
Dia 11    WP-1.11 Rate Limiting básico
Dia 12    Revisão P1 + correções
          ─────── M3 — Confiabilidade Operacional ───────
`

### 10.2 Semana 3-4 — Event Bus (Dias 13-20)

`
Dia 13    WP-2.1  Modelos Event/Subscription/DeadLetter no schema
Dia 14-16 WP-2.2  Cognitive Bus core (eventEmitter + fila banco)
Dia 17    WP-2.7  Catálogo de Eventos implementado (constantes)
Dia 17    WP-2.3  Event Publisher
Dia 18    WP-2.4  Event Subscriber
Dia 18    WP-2.5  Dead Letter Queue
Dia 19    WP-2.6  Retry com backoff
Dia 20    WP-2.8  Monitoramento de Eventos
          ─────── M4 — Barramento Ativo ───────
`

### 10.3 Semana 4-6 — Patrimônio Cognitivo (Dias 20-30)

`
Dia 20-22 WP-3.1  MemoryEngine — consolidação avançada
Dia 23-25 WP-3.2  KnowledgeEngine — curadoria + exportação
Dia 25-27 WP-3.3  ForgettingEngine — TTL + gc + arquivamento
Dia 28-30 WP-3.4  SynthesisEngine — relatórios multi-domínio
Dia 30    WP-3.5  Facade Patrimônio Cognitivo
Dia 30    WP-3.6  API /api/patrimonio
          ─────── M5 — Patrimônio Unificado ───────
`

### 10.4 Semana 5-8 — Pipeline Cognitivo (Dias 30-46)

`
Dia 30-33 WP-4.1  ObservationEngine — captura de 3+ fontes
Dia 33-34 WP-4.5  SignalEngine — expansão (distribuição, ponderação)
Dia 34-35 WP-4.2  RitmoEngine — ciclo + frequência
Dia 36-39 WP-4.3  HypothesisEngine — registro, teste, validação
Dia 39-41 WP-4.4  Pipeline Orchestrator — ciclo OODA completo
Dia 41-42 WP-4.6  ValidationEngine — cross-source
          ─────── M6 — Primeiro Ciclo OODA ───────
Dia 42-44 WP-4.7  ActivationEngine — coordenação
Dia 44-46 Testes de integração P4 + correções
          ─────── M7 — Pipeline Cognitivo Completo ───────
`

### 10.5 Semana 7-11 — Decision Engine (Dias 41-55)

`
Dia 41-43 WP-5.1  PriorityEngine — classificação urgência/impacto
Dia 43-45 WP-5.2  TrustEngine — score de fontes
Dia 45-46 WP-5.3  RelevanceEngine — filtro temporal + trust
Dia 47-48 WP-5.4  DecisionEngine — integração PTR
Dia 49-52 WP-5.5  Centro de Decisão (UI)
          ─────── M8 — Decisor Inteligente ───────
Dia 52-53 WP-5.6  Dashboard Cognitivo (métricas)
Dia 54-55 WP-5.7  Configurações Cognitivas (UI)
          ─────── M9 — Dashboard Cognitivo ───────
`

### 10.6 Semana 9-14 — Optimization (Dias 50-75)

`
===== PODE COMEÇAR PARALELO APÓS P4 =====

--- FASE 1: TESTES (iniciar após P4 completo) ---
Dia 50-57 WP-6.1  Testes unitários — Motor Cognitivo (16 engines, ≥ 60%)
Dia 55-59 WP-6.2  Testes de integração — API Routes (≥ 50%)
Dia 60-64 WP-6.3  Testes e2e — fluxos críticos (CRM + Financeiro + Tarefas)

--- FASE 2: INFRA E PERFORMANCE ---
Dia 60    WP-6.4  CI/CD — GitHub Actions (lint → typecheck → test → build)
Dia 61    WP-6.5  Staging (deploy automático develop)
Dia 62-64 WP-6.6  Caching (Redis ou banco, consultas < 100ms)

--- FASE 3: OTIMIZAÇÃO ---
Dia 50-52 WP-6.7  Performance — índices compostos + N+1 (pode começar cedo, só depende de P1)
Dia 53-54 WP-6.8  Paginação em todas as listas
Dia 55-56 WP-6.9  Rate Limiting avançado (por rota, por tenant)
Dia 57    WP-6.10 Backup automático diário
Dia 58-59 WP-6.11 Monitoramento + alertas

--- REVISÃO FINAL ---
Dia 65-70 Correções, ajustes, documentação
Dia 70-75 Validação final + deploy estabilizado
          ─────── M10 — Qualidade de Produção ───────
`

### 10.7 Cronograma Resumido

| Semana | Programa | Marcos | WPs |
|:------:|----------|--------|:---:|
| 1-2 | P1 — Foundation | M1 (dia 5), M2 (dia 10), M3 (dia 12) | 11 |
| 3-4 | P2 — Event Bus | M4 (dia 20) | 8 |
| 4-6 | P3 — Patrimônio | M5 (dia 30) | 6 |
| 5-8 | P4 — Pipeline | M6 (dia 39), M7 (dia 46) | 7 |
| 7-11 | P5 — Decision | M8 (dia 52), M9 (dia 55) | 7 |
| 9-14 | P6 — Optimization | M10 (dia 75) | 11 |
| | **Total** | | **50 WPs** |

### 10.8 Marcos de Paralelismo

| Período | Pode Rodar em Paralelo |
|---------|------------------------|
| Dias 1-12 | Foundation. Nada mais. |
| Dias 13-20 | Event Bus. Nada mais. |
| Dias 20-30 | Patrimônio. Nada mais. |
| Dias 30-46 | Pipeline. **Iniciar WP-6.7 (Performance)** após dia 30 (só depende de P1). |
| Dias 41-55 | Decision (P5) + Optimization (P6) em paralelo. |
| Dias 50-75 | Optimization completo. |

### 10.9 Riscos Temporais

| Risco | Probabilidade | Impacto em Dias | Mitigação |
|-------|:------------:|:---------------:|-----------|
| WP-1.3 backfill mais complexo que estimado | Média | +2 | Preparar script antes de iniciar |
| WP-2.2 Cognitive Bus complexo | Média | +3 | Simplificar: fila no banco, não Redis |
| WP-4.1 Observation multi-fonte | Alta | +4 | Implementar 2 fontes primeiro |
| WP-6.1 Testes sem testabilidade | Alta | +5 | Refatorar engines para injeção de dependência |
| Doenças/feriados | Variável | Variável | Buffer de 5 dias no final |

**Buffer de contingência: 5 dias** (incluídos no total de 75 dias)

### 10.10 Ordem de Execução (comandos)

`
1.  schema.prisma: adicionar FK, índices, tenant, soft delete, auditoria
2.  prisma migrate dev — nome da migration
3.  npm run typecheck — zero warnings
4.  Criar lib/errors.ts com ErrorResponse
5.  Refatorar todas as rotas para usar ErrorResponse
6.  Criar lib/logger.ts com pino/winston
7.  Adicionar logs em todos os services
8.  Criar lib/validation.ts com schemas Zod
9.  Zod em 100% das rotas
10. RLS policies no Supabase (SQL)
11. Rate limiting em middleware.ts
12. schema.prisma: Event, EventSubscription, DeadLetter
13. engine/cognitive-bus.ts
14. engine/event-publisher.ts, engine/event-subscriber.ts
15. engine/dead-letter-queue.ts, engine/event-retry.ts
16. engine/memory-engine.ts — consolidação avançada
17. engine/knowledge-engine.ts — curadoria
18. engine/forgetting-engine.ts — TTL + gc
19. engine/synthesis-engine.ts — relatórios
20. engine/patrimonio-cognitivo.ts — facade
21. engine/observation-engine.ts — captura 3+ fontes
22. engine/signal-engine.ts — expansão
23. engine/ritmo-engine.ts — ciclo
24. engine/hypothesis-engine.ts — teste de hipóteses
25. engine/pipeline-cognitivo.ts — orchestrator OODA
26. engine/validation-engine.ts — cross-source
27. engine/activation-engine.ts — coordenação
28. engine/priority-engine.ts — urgência/impacto
29. engine/trust-engine.ts — score de fontes
30. engine/relevance-engine.ts — filtro
31. engine/decision-engine.ts — integração PTR
32. UI: Centro de Decisão
33. UI: Dashboard Cognitivo
34. UI: Configurações Cognitivas
35. Testes unitários (16 engines)
36. Testes de integração (API)
37. Testes e2e (fluxos)
38. CI/CD GitHub Actions
39. Staging
40. Cache layer
41. Performance (índices, N+1, paginação)
42. Backup
43. Monitoramento
`

---

## Apêndice A — Glossário

| Termo | Significado |
|-------|-------------|
| WP | Work Package — entrega atômica |
| DoD | Definition of Done — critérios de conclusão |
| P0-P5 | Prioridade (P0 = crítica, P5 = baixa) |
| OODA | Observar → Orientar → Decidir → Agir |
| DLQ | Dead Letter Queue — fila de eventos com falha |
| RLS | Row Level Security — isolamento por tenant |
| TTL | Time To Live — tempo de vida de um dado |
| GC | Garbage Collection — limpeza automática |
| PTR | Priority + Trust + Relevance — triagem de decisões |
| M1-M10 | Milestones 1 a 10 |

## Apêndice B — Referências Rápidas

| Para saber... | Consulte |
|---------------|----------|
| O que cada engine faz | docs/01-VISION/MODELO_COGNITIVO.md |
| Como o pipeline executa | docs/03-ENGINEERING/EXECUTION_ARCHITECTURE.md |
| Quais eventos existem | docs/03-ENGINEERING/CATALOGO_EVENTOS.md |
| Regras técnicas de código | docs/03-ENGINEERING/ENGINEERING_GUIDELINES.md |
| Decisões arquiteturais | docs/04-DECISIONS/ADR/ADR-*.md |
| O que não implementar | docs/02-PRODUCT/MVP_SCOPE.md |
| Ordem de implementação | docs/03-ENGINEERING/IMPLEMENTATION_BLUEPRINT.md |
| Como cada WP é avaliado | Este documento, seções 4, 8 |

---

*Este documento é o programa oficial de execução da Ponte Digital V4 Founder. Nenhuma decisão arquitetural será tomada durante a execução. Em caso de dúvida, consultar os documentos de arquitetura congelada. Em caso de conflito, prevalecer os ADRs.*
