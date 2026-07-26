# Implementation Blueprint — Ponte Digital V4 Founder

**Data:** 2026-07-19
**Status:** Vigente
**Hierarquia:** Este documento traduz a arquitetura congelada (Constituição, Modelo Cognitivo, Ontologia, Motor Cognitivo, Architecture DDD, Execution Architecture, Catálogo de Eventos, Engineering Guidelines, 34 ADRs, Auditoria Arquitetural) em um plano técnico executável.

> **Regra:** Nenhuma decisão arquitetural deve ser tomada durante a implementação. Todas já estão congeladas nos documentos listados acima. Este blueprint apenas organiza o que, quando e em que ordem implementar.

---

## 1. Estado Atual

### 1.1 Legenda

| Símbolo | Significado |
|---------|-------------|
| ✅ IMPLEMENTADO | Funciona em produção, sem mudanças necessárias |
| 🔶 PARCIAL | Existe mas incompleto, difere da documentação, ou tem débitos |
| ❌ NÃO IMPLEMENTADO | Não existe no código |
| 🧊 CONGELADO | Não deve ser implementado agora (ADR ou MVP_SCOPE) |

### 1.2 Módulos de Negócio (CRM, Financeiro, Tarefas, etc.)

| Módulo | Status | Observação |
|--------|--------|------------|
| **CRM** (Lead → Cliente → Contato) | ✅ IMPLEMENTADO | Pipeline kanban, temperatura, estágios, conversão. Completo. |
| **Financeiro** (Transações) | ✅ IMPLEMENTADO | Receita/despesa, categorias, recorrência, filtros. Completo. |
| **Tarefas** | ✅ IMPLEMENTADO | CRUD, tipos, prioridade, atribuição. Completo. |
| **Onboarding/Implantação** | ✅ IMPLEMENTADO | Etapas, status, acompanhamento. Completo. |
| **Histórico/Timeline** | ✅ IMPLEMENTADO | Consolidado por cliente/lead. Completo. |
| **Autenticação/Multi-empresa** | ✅ IMPLEMENTADO | Supabase, papéis (ADMIN/GESTOR/MEMBRO), sessão. Completo. |
| **Assistente IA** | ✅ IMPLEMENTADO | Chat com Anthropic, limites por plano. Completo. |
| **Agenda como capacidade** | ❌ NÃO IMPLEMENTADO | Não existe. Backlog. |
| **Centro de Decisão (tela)** | ❌ NÃO IMPLEMENTADO | Base via HistoricoSinal existe. Falta tela + regras. Backlog. |

### 1.3 Módulo Cognitivo (Motor Interno)

| Módulo | ADR Origem | Status | Observação |
|--------|------------|--------|------------|
| **Context Engine** | ADR-004 | ✅ IMPLEMENTADO | Mineração, Carga, Decaimento, Fusão, Cache. Completo. |
| **Decision Engine** | ADR-003 | ✅ IMPLEMENTADO | Decisões, Pesos, Efeitos Deploy, Atalhos, Diário. Completo. |
| **Memory Engine** | ADR-009 | ✅ IMPLEMENTADO | Armazenamento, Recuperação, Consolidação, Garbage. Completo. |
| **Outcome Engine** | ADR-008 | ✅ IMPLEMENTADO | Registro de resultados. Completo. |
| **Signal Engine** | ADR-007 | 🔶 PARCIAL | Captura de sinais existe, mas distribuição/filtro/ponderação incompletos. |
| **Knowledge Engine** | ADR-009 | 🔶 PARCIAL | Base de conhecimento existe. Curadoria e exportação incompletos. |
| **Learning Engine** | ADR-005 | 🔶 PARCIAL | Aprendizado de padrões existe. Calibragem e feedback loop incompletos. |
| **Validation Engine** | ADR-016 | 🔶 PARCIAL | Validação básica. Verificação cross-source incompleta. |
| **Activation Engine** | ADR-015 | 🔶 PARCIAL | Gatilhos básicos. Priorização e coordenação incompletos. |
| **Cognitive Bus** | ADR-011 | ❌ NÃO IMPLEMENTADO | Não existe. Dependência crítica. |
| **Observation Engine** | ADR-006 | ❌ NÃO IMPLEMENTADO | Ciclo OODA — Observar. Não existe. |
| **Hypothesis Engine** | ADR-013 | ❌ NÃO IMPLEMENTADO | Teste formal de hipóteses. Não existe. |  |
| **Priority Engine** | ADR-014 | ❌ NÃO IMPLEMENTADO | Priorização de decisões. Não existe. |
| **Trust Engine** | ADR-017 | ❌ NÃO IMPLEMENTADO | Confiabilidade de fontes/sinais. Não existe. |
| **Relevance Engine** | ADR-018 | ❌ NÃO IMPLEMENTADO | Relevância de sinais no tempo. Não existe. |
| **Forgetting Engine** | ADR-020 | ❌ NÃO IMPLEMENTADO | Decaimento, arquivamento, exclusão. Não existe. |
| **Ritmo / Ciclo Engine** | ADR-021 | ❌ NÃO IMPLEMENTADO | Gestão de frequência dos ciclos cognitivos. Não existe. |
| **Synthesis Engine** | ADR-025 | ❌ NÃO IMPLEMENTADO | Síntese multi-domínio (roadmap técnico). Não existe. |

### 1.4 Frontend

| Área | Status | Observação |
|------|--------|------------|
| Layout base (sidebar, header, navegação) | ✅ IMPLEMENTADO | Multi-empresa, tema. Completo. |
| Dashboard | 🔶 PARCIAL | Painel básico. Métricas cognitivas ausentes. |
| CRM (Kanban) | ✅ IMPLEMENTADO | Completo. |
| Financeiro | ✅ IMPLEMENTADO | Completo. |
| Tarefas | ✅ IMPLEMENTADO | Completo. |
| Assistente IA | ✅ IMPLEMENTADO | Chat funcional. |
| Configurações | 🔶 PARCIAL | Básico. Config cognitivas ausentes. |
| Centro de Decisão | ❌ NÃO IMPLEMENTADO | Tela dedicada com linha do tempo, impactos, cenários. |
| Mapa Cognitivo (visu) | ❌ NÃO IMPLEMENTADO | Visualização do estado interno (fase futura — 🧊 CONGELADO) |

### 1.5 Banco de Dados

| Aspecto | Status | Observação |
|---------|--------|------------|
| Schema Prisma (schema.prisma) | 🔶 PARCIAL | 38 models. 4 estruturas soltas sem FK. Tenant fields ausentes em 12 models. Auditoria ausente em 20 models. Soft delete ausente em 15 models. |
| Migrações | 🔶 PARCIAL | 18 migrações. 5 com warnings. 1 falha intermitente (Ritmo). |
| Relacionamentos | 🔶 PARCIAL | 4 estruturas soltas sem FK (Anotacoes, Tags, OnboardingDecisoes, DecisaoSinais). |
| Índices | ❌ NÃO IMPLEMENTADO | Nenhum índice explícito. Performance não garantida. |
| RLS (Row Level Security) | ❌ NÃO IMPLEMENTADO | Sem isolamento por empresa. |
| Soft Delete | 🔶 PARCIAL | Presente em 23/38 models. Ausente em 15. |
| Auditoria (createdAt/updatedAt) | 🔶 PARCIAL | Completo em 18 models. Ausente em 20. |
| Políticas de Retenção | ❌ NÃO IMPLEMENTADO | Nenhuma. |

### 1.6 APIs e Backend

| Aspecto | Status | Observação |
|---------|--------|------------|
| API Routes (Next.js) | ✅ IMPLEMENTADO | REST. Funcional. |
| Services Layer | 🔶 PARCIAL | Lógica de negócio nos services. Mas 5 services > 300 linhas (dívida). |
| Validação (Zod) | 🔶 PARCIAL | Presente em 60% das rotas. Ausente em criação/edição. |
| Tratamento de Erros | 🔶 PARCIAL | try/catch genérico. Sem padrão unificado. |
| Rate Limiting | ❌ NÃO IMPLEMENTADO | Não existe. |
| Caching | ❌ NÃO IMPLEMENTADO | Não existe. |
| Observabilidade (logs estruturados) | ❌ NÃO IMPLEMENTADO | console.log apenas. |
| Testes | ❌ NÃO IMPLEMENTADO | Zero testes automatizados. |

### 1.7 Infraestrutura e DevOps

| Aspecto | Status | Observação |
|---------|--------|------------|
| Deploy (Vercel) | ✅ IMPLEMENTADO | Automático via GitHub. |
| Supabase (DB + Auth) | ✅ IMPLEMENTADO | Produtivo. |
| Anthropic API | ✅ IMPLEMENTADO | Integração funcional. |
| Variáveis de Ambiente | 🔶 PARCIAL | 12 variáveis. 4 sem documentação. |
| CI/CD | ❌ NÃO IMPLEMENTADO | Sem pipeline de testes. |
| Monitoramento | ❌ NÃO IMPLEMENTADO | Sem alertas ou dashboards. |
| Backup | ❌ NÃO IMPLEMENTADO | Sem política. |
| Staging | ❌ NÃO IMPLEMENTADO | Apenas produção. |


---

## 2. Mapa de Módulos

Cada linha representa um módulo que precisa existir. A coluna **Ordem** indica a sequência de implementação (1 = primeiro).

### 2.1 Core — Infraestrutura Base (Fase 0)

| # | Módulo | Tipo | Depende de | Habilitado por |
|---|--------|------|------------|----------------|
| 0.1 | Índices + Performance DB | Infra | — | — |
| 0.2 | Auditoria completa (createdAt/updatedAt) | Infra | 0.1 | — |
| 0.3 | Soft Delete universal | Infra | 0.1 | — |
| 0.4 | RLS + Tenant Guard | Infra/Segurança | 0.1 | — |
| 0.5 | Tratamento de Erros Padrão | Infra | — | — |
| 0.6 | Logs Estruturados | Infra | 0.5 | — |
| 0.7 | Rate Limiting | Infra/Segurança | — | — |

### 2.2 Core — Motor Cognitivo (Fase 1-3)

| # | Módulo | Tipo | Depende de | Habilitado por |
|---|--------|------|------------|----------------|
| 1.1 | **Cognitive Bus** (ADR-011) | Infra | — | ADR-011 |
| 1.2 | **Priority Engine** (ADR-014) | Motor | 1.1 | ADR-014 |
| 1.3 | **Forgetting Engine** (ADR-020) | Motor | 1.1 | ADR-020 |
| 1.4 | **Ritmo / Ciclo Engine** (ADR-021) | Motor | 1.1 | ADR-021 |
| 1.5 | **Observation Engine** (ADR-006) | Motor | 1.1, 1.4 | ADR-006 |
| 1.6 | **Hypothesis Engine** (ADR-013) | Motor | 1.1, 1.4 | ADR-013 |
| 1.7 | **Trust Engine** (ADR-017) | Motor | 1.1 | ADR-017 |
| 1.8 | **Relevance Engine** (ADR-018) | Motor | 1.1, 1.7 | ADR-018 |
| 1.9 | **Synthesis Engine** (ADR-025) | Motor | 1.1, 1.2, 1.6 | ADR-025 |

### 2.3 Interface — Frontend (Fase 2-3)

| # | Módulo | Tipo | Depende de |
|---|--------|------|------------|
| 2.1 | Centro de Decisão (tela) | UI | 1.1 |
| 2.2 | Métricas Cognitivas (Dashboard) | UI | 1.1, 1.2, 1.4 |
| 2.3 | Configurações Cognitivas | UI | 1.1, 1.4 |

### 2.4 Dívida Técnica — Refatoração (Fase 1-4)

| # | Módulo | Tipo | Observação |
|---|--------|------|------------|
| 3.1 | Schema DB (FK, índices, tenant, soft delete) | Dívida | 4 estruturas soltas, 12 sem tenant, 15 sem soft delete |
| 3.2 | Services > 300 linhas | Dívida | 5 services precisam de extração |
| 3.3 | Validação Zod em todas as rotas | Dívida | 40% sem validação |
| 3.4 | Testes (vitrais, integração, e2e) | Dívida | Zero. Começar pelo core. |
| 3.5 | Error Boundary unificado | Dívida | Atualmente espalhado |

### 2.5 Futuro Congelado (🧊)

| Módulo | Motivo | Liberação |
|--------|--------|-----------|
| Mapa Cognitivo Visual | Sem evidência de necessidade | Aguardar pesquisa |
| Agenda como Capacidade | Não resolve problema urgente | Fase futura |
| Inteligência Coletiva | Complexidade alta, valor não validado | Aguardar pesquisa |
| Recomendação Avançada | Sem dados suficientes | Fase futura |
| Server Actions completos | ADR-024: não comprovado | Aguardar evidência |
| Repositories | Overengineering na fase atual | Aguardar escala |
| Domain Events formais | ADR-012: simplificar para eventos soltos | Não implementar |


---

## 3. Mapa de Refatorações

### 3.1 Por Prioridade

| Prioridade | Refatoração | Motivo | Risco |
|------------|-------------|--------|-------|
| **P0** | Schema DB — FK, índices, tenant, soft delete, auditoria | Base para tudo | Corrupção de dados, violação de segurança |
| **P0** | Tratamento de Erros Padrão | Confiabilidade mínima | Debug impossível |
| **P0** | Validação Zod em todas as rotas | Integridade de dados | Dados inválidos |
| **P1** | Services > 300 linhas (5 services) | Manutenibilidade | Complexidade acumulada |
| **P1** | Error Boundary unificado | Experiência do usuário | Quebras silenciosas |
| **P1** | Logs Estruturados | Observabilidade | Cegueira operacional |
| **P2** | Rate Limiting | Segurança | Abuso |
| **P2** | Testes — Core (Motor Cognitivo) | Confiabilidade | Regressões |
| **P3** | Testes — API Routes | Confiabilidade | Regressões |
| **P4** | Testes — Frontend | Confiabilidade | Regressões |
| **P5** | CI/CD + Staging | Qualidade | Deploy quebrado |

### 3.2 Por Origem (Dívida)

| Origem | Refatoração | Esforço Estimado |
|--------|-------------|------------------|
| Auditoria Arquitetural | Schema DB (FK, índices, tenant, soft delete) | 3-5 dias |
| Auditoria Arquitetural | Validação Zod | 2-3 dias |
| Auditoria Arquitetural | Services > 300 linhas | 2-4 dias |
| Auditoria Arquitetural | Error Handling | 1-2 dias |
| Auditoria Arquitetural | Logs | 1 dia |
| ADR-030 (Migração Dados) | Migração parcial de dados | 2-3 dias |
| ADR-024 (Server Actions) | Avaliar se mantém ou migra | 1 dia |

---

## 4. Roadmap Técnico — Fases

### 4.1 Fase 0 — Fundação (Sprint atual)

**Objetivo:** Corrigir as 4 brechas críticas da auditoria. Estabilizar a base de dados.

| Item | Dependências | Critério de Aceite |
|------|-------------|-------------------|
| Schema DB — FK em 4 estruturas soltas | Nenhuma | Relacionamentos corrigidos, migração segura |
| Schema DB — Índices explícitos | Nenhuma | Índices nos campos mais consultados (tenantId, companyId, status, data) |
| Schema DB — Tenant fields | Nenhuma | Todos os models com tenantId/companyId |
| Schema DB — Soft Delete | Schema estável | deletedAt em todos os models |
| Schema DB — Auditoria | Schema estável | createdAt/updatedAt em todos os models |
| Schema DB — RLS policies | Tenant fields | Políticas aplicadas no Supabase |
| Tratamento de Erros Padrão | Nenhuma | ErrorResponse padrão em todas as APIs |
| Logs Estruturados | Tratamento de erros | Logs com nível, contexto, requestId |

**Cancelamento:** Se esta fase demorar > 10 dias, priorizar apenas P0 de schema + tratamento de erros e mover o resto para Fase 1.

### 4.2 Fase 1 — Cognitive Bus + Priorização (Próxima Sprint)

**Objetivo:** Implementar o barramento central e os mecanismos de prioridade e esquecimento.

| Item | Dependências | Critério de Aceite |
|------|-------------|-------------------|
| **Cognitive Bus** (ADR-011) | Fase 0 | Eventos trafegam, assinantes recebem, sem bloqueio |
| **Priority Engine** (ADR-014) | Cognitive Bus | Sinais classificados por urgência/impacto |
| **Forgetting Engine** (ADR-020) | Cognitive Bus | Decaimento configurável, arquivamento automático |
| **Ritmo / Ciclo Engine** (ADR-021) | Cognitive Bus | Ciclos executados na frequência configurada |
| Services > 300 linhas (refatoração) | Fase 0 | 5 services extraídos |
| Validação Zod (completar) | Fase 0 | 100% das rotas com validação |
| Testes — Motor Cognitivo (vitrais) | Cognitive Bus | Cobertura mínima 60% nos engines |

**Cancelamento:** Se o Cognitive Bus > 10 dias, simplificar para eventos em fila no banco (sem barramento real). Se testes inviabilizarem entrega, reduzir cobertura mínima para 30%.

### 4.3 Fase 2 — Ciclo OODA (Observação + Decisão)

**Objetivo:** Fechar o ciclo Observação → Orientação → Decisão → Ação.

| Item | Dependências | Critério de Aceite |
|------|-------------|-------------------|
| **Observation Engine** (ADR-006) | Fase 1 | Novos sinais capturados de todas as fontes |
| **Hypothesis Engine** (ADR-013) | Fase 1 | Hipóteses registradas, testadas, validadas/invalidadas |
| **Trust Engine** (ADR-017) | Fase 1 | Fontes com score de confiabilidade |
| **Relevance Engine** (ADR-018) | Trust Engine | Sinais filtrados por relevância + trust |
| **Synthesis Engine** (ADR-025) | Fase 1 + Hypothesis | Relatórios multi-domínio |
| Centro de Decisão (tela) | Cognitive Bus | Lista de decisões, filtros, linha do tempo |
| Métricas Cognitivas (Dashboard) | Cognitive Bus | Taxa de acerto, ciclos, sinais processados |
| Configurações Cognitivas | Cognitive Bus | Config de ciclo, prioridade, fontes |
| Error Boundary + Rate Limiting | Fase 0 | Aplicado |

### 4.4 Fase 3 — Testes e Estabilização

**Objetivo:** Qualidade mínima de produção.

| Item | Dependências | Critério de Aceite |
|------|-------------|-------------------|
| Testes — API Routes | Fase 2 | Cobertura 50% |
| Testes — Frontend | Fase 2 | Cobertura 30% (páginas principais) |
| CI/CD | Testes | Pipeline GitHub Actions |
| Staging | CI/CD | Ambiente separado |
| Política de Backup | Nenhuma | Backup automático diário |
| Monitoramento | Logs | Alertas configurados |

### 4.5 Fase 4 — Otimização e Performance

**Objetivo:** Garantir performance para escala.

| Item | Dependências | Critério de Aceite |
|------|-------------|-------------------|
| Caching (Redis ou similar) | Fase 2 | Consultas frequentes em cache |
| Rate Limiting avançado | Fase 2 | Por rota, por tenant |
| Índices compostos | Fase 0 | Performance validada |
| Query optimization | Fase 0 | N+1 eliminados |
| Páginação em todas as listas | Fase 0 | Implementada |

### 4.6 Fase 5 — Preparação para V4 Completo

**Objetivo:** Base para versão completa do Motor Cognitivo.

| Item | Dependências | Critério de Aceite |
|------|-------------|-------------------|
| ADR-010 — Unificar Patrimônio Cognitivo | Fase 2 | 8 ADRs compatíveis |
| ADR-019 — Domínios operacionais via API | Fase 2 | APIs externas documentadas |
| ADR-024 — Reavaliar Server Actions | Fase 4 | Decisão documentada |
| Testes — Cobertura 80% core | Fase 3 | Cobertura validada |
| Documentação técnica de operação | Fase 4 | Runbooks, playbooks |


---

## 5. Ordem de Implementação (sequência detalhada)

### Regras da Ordem

1. **Nunca pular uma fase** — cada fase depende da anterior
2. **Nunca implementar Cognitive Bus sem Fase 0 terminada** — sem schema estável, todo evento corrompe dados
3. **Nunca implementar Observation/Hypothesis sem o Bus** — não há por onde os sinais trafeguem
4. **Nunca implementar Synthesis sem Priority + Hypothesis** — síntese vazia
5. **Testes são obrigatórios APÓS a Fase 2** — antes disso, o código muda rápido demais
6. **Toda fase tem critério de cancelamento** — se estourar prazo, cortar escopo

### Dependências Críticas

| Se implementar... | Sem... | Problema |
|------------------|--------|----------|
| Observation Engine | Cognitive Bus | Sinais sem destino |
| Hypothesis Engine | Observation | Hipóteses sem dados |
| Synthesis Engine | Priority + Hypothesis | Síntese sem critério |
| Centro de Decisão | Cognitive Bus | Dados desatualizados |
| Trust Engine | Cognitive Bus | Score sem fluxo |
| RLS | Tenant fields | Políticas quebradas |
| Testes | Schema estável | Testes quebram a cada migração |

### Sequência Detalhada (ordem executável)

`
FASE 0 ──────────────────────────────────────────────────────
  0.1  Schema DB — FK nas 4 estruturas soltas
  0.2  Schema DB — Índices explícitos (tenantId, companyId, status, data)
  0.3  Schema DB — Tenant fields (companyId/tenantId) nos 12 models
  0.4  Schema DB — Soft Delete (deletedAt) nos 15 models
  0.5  Schema DB — Auditoria (createdAt/updatedAt) nos 20 models
  0.6  Schema DB — Migração validada (sem warnings)
  0.7  Tratamento de Erros Padrão (ErrorResponse)
  0.8  Logs Estruturados (pino ou console padronizado)
  0.9  Validação Zod — 100% das rotas
 ─── CRITÉRIO DE CANCELAMENTO: > 10 dias → cortar 0.8, 0.9
 ─── GATE: Fase 0 só libera Fase 1 se 0.1-0.7 concluídos

FASE 1 ──────────────────────────────────────────────────────
  1.1  Cognitive Bus (eventEmitter interno + fila no banco)
  1.2  Priority Engine (classificação urgência/impacto)
  1.3  Forgetting Engine (TTL, arquivamento, gc)
  1.4  Ritmo / Ciclo Engine (setInterval configurável)
  1.5  Services > 300 linhas — extrair (5 services)
  1.6  Testes — Motor Cognitivo (vitrais, cobertura ≥ 60%)
 ─── CRITÉRIO DE CANCELAMENTO: Bus > 10 dias → fila no banco
 ─── GATE: Fase 1 libera Fase 2 se 1.1-1.4 concluídos

FASE 2 ──────────────────────────────────────────────────────
  2.1  Observation Engine (fontes, coleta, normalização)
  2.2  Trust Engine (score de fontes, histórico de confiabilidade)
  2.3  Relevance Engine (filtro por trust + tempo + contexto)
  2.4  Hypothesis Engine (registro, teste, validação)
  2.5  Synthesis Engine (relatórios multi-domínio)
  2.6  Centro de Decisão (tela — Next.js)
  2.7  Métricas Cognitivas (dashboard)
  2.8  Configurações Cognitivas (tela)
  2.9  Error Boundary + Rate Limiting
 ─── CRITÉRIO DE CANCELAMENTO: > 15 dias → cortar 2.5, 2.7, 2.8
 ─── GATE: Fase 2 libera Fase 3 se 2.1-2.4 concluídos

FASE 3 ──────────────────────────────────────────────────────
  3.1  Testes — API Routes (cobertura ≥ 50%)
  3.2  Testes — Frontend (cobertura ≥ 30%, páginas principais)
  3.3  CI/CD — GitHub Actions (lint, typecheck, test)
  3.4  Staging (ambiente separado)
  3.5  Política de Backup (automático diário)
  3.6  Monitoramento (alertas)
 ─── CRITÉRIO DE CANCELAMENTO: > 10 dias → cortar 3.2

FASE 4 ──────────────────────────────────────────────────────
  4.1  Caching (Redis ou similar)
  4.2  Rate Limiting avançado (por rota, por tenant)
  4.3  Índices compostos (performance tuning)
  4.4  Query optimization (N+1)
  4.5  Paginação em todas as listas

FASE 5 ──────────────────────────────────────────────────────
  5.1  ADR-010 — Unificar Patrimônio Cognitivo
  5.2  ADR-019 — Domínios operacionais via API
  5.3  ADR-024 — Reavaliar Server Actions
  5.4  Cobertura 80% core
  5.5  Documentação operacional (runbooks)
`


---

## 6. Backlog Arquitetural — Decisões Pendentes

Decisões que precisam ser tomadas antes ou durante a implementação.

| # | Decisão | Contexto | Responsável | Prazo |
|---|---------|----------|-------------|-------|
| D01 | Cognitive Bus: eventEmitter interno vs banco vs Redis | ADR-011 permite 3 abordagens. Decidir baseado na escala atual. | Tech Lead | Antes da Fase 1 |
| D02 | Forgetting: hard delete vs soft delete + archival | ADR-020: decaimento e exclusão. Impacto na privacidade. | Tech Lead + Produto | Durante Fase 1 |
| D03 | Observation: polling vs webhook vs push | ADR-006: como os sinais chegam. Tempo real vs batch. | Tech Lead | Antes Fase 2 |
| D04 | Trust: score manual vs automático vs híbrido | ADR-017: confiabilidade de fontes. Quanto automatizar? | Tech Lead + Produto | Durante Fase 2 |
| D05 | Síntese: LLM vs template vs híbrido | ADR-025: como gerar relatórios. Custo vs qualidade. | Tech Lead | Antes Fase 2 |
| D06 | Testes: vitrais vs integr vs e2e — prioridade | Ordem de implementação dos tipos de teste. | Tech Lead | Antes Fase 3 |
| D07 | Caching: Redis externo vs memória vs banco | ADR-022: cache. Custo vs performance. | Tech Lead | Antes Fase 4 |

---

## 7. Mapa de Migração

### 7.1 Migrações de Schema

| Passo | O quê | Script | Risco |
|-------|-------|--------|-------|
| M01 | Adicionar FK em Anotacoes, Tags, OnboardingDecisoes, DecisaoSinais | Prisma migration | Médio — dados órfãos podem blocker |
| M02 | Adicionar companyId/tenantId em 12 models | Prisma migration | Alto — dados existentes sem tenant |
| M03 | Adicionar deletedAt em 15 models | Prisma migration | Baixo — nullable |
| M04 | Adicionar createdAt/updatedAt em 20 models | Prisma migration | Baixo — default now() |
| M05 | Adicionar índices explícitos | Prisma migration | Baixo — apenas performance |
| M06 | Aplicar RLS policies | SQL manual no Supabase | Alto — pode bloquear acesso |

### 7.2 Estratégia de Migração

1. **Todas as migrações devem ser reversíveis** — cada migration up deve ter down correspondente
2. **Nunca migrar em produção sem backup** — backup manual antes de cada migration
3. **Migrações de tenant (M02) exigem script de backfill** — dados existentes precisam de empresa padrão
4. **FK (M01) pode exigir limpeza prévia** — verificar dados órfãos antes
5. **RLS (M06) deve ser testada em staging primeiro** — risco de bloqueio total

---

## 8. Critérios de Produção

### 8.1 Critérios Mínimos para Deploy em Produção

| Critério | Obrigatório para | Exceção |
|----------|-----------------|---------|
| Schema DB íntegro (FK, tenant, soft delete, auditoria) | Tudo | — |
| Tratamento de Erros Padrão | Tudo | — |
| Validação Zod em todas as rotas | Novas rotas | Rotas legadas (prazo: Fase 1) |
| Logs Estruturados | Cognitive Bus+ | Demais (prazo: Fase 1) |
| Rate Limiting | APIs externas | — |
| RLS aplicado | Tudo | — |
| Testes (mín. 60% core) | Motor Cognitivo | Frontend (prazo: Fase 3) |

### 8.2 Critérios para "Pronto" (Definition of Done)

- [ ] Código revisado (pair review ou self-review com checklist)
- [ ] Testes escritos (quando aplicável)
- [ ] Schema migration validada (up + down)
- [ ] RLS policy verificada
- [ ] Logs nos pontos de entrada/saída
- [ ] Validação Zod nas rotas
- [ ] Documentação atualizada (se mudar comportamento)
- [ ] Nenhum warning de typecheck
- [ ] Nenhum warning de lint novo

### 8.3 Critérios de Cancelamento de Sprint

| Condição | Ação |
|----------|------|
| Fase 0 > 10 dias | Cortar logs estruturados e validação Zod da fase |
| Cognitive Bus > 10 dias | Simplificar para fila no banco |
| Fase 2 > 15 dias | Cortar Synthesis, Métricas, Configs |
| Fase 3 > 10 dias | Cortar testes de frontend |
| Qualquer fase com > 50% de mudança de escopo | Replanejar com o produto |


---

## 9. Checklist por Sprint

Cada sprint deve começar copiando o checklist da fase correspondente e marcando o progresso.

### Sprint Checklist Template

`
## Sprint [Número] — [Nome da Fase]

### Objetivo:
[O que esta sprint precisa entregar]

### Itens:
- [ ] [Item 1] — Responsável: — Previsão: [data]
- [ ] [Item 2] — Responsável: — Previsão: [data]
- [ ] [Item 3] — Responsável: — Previsão: [data]

### Débitos Técnicos:
- [ ] [Dívida identificada durante a sprint]

### Decisões Pendentes (deste sprint):
- [ ] [Decisão D0X]

### Critério de Cancelamento:
[Condição + ação]

### Gate para próxima sprint:
[O que precisa estar pronto]
`

### Sprint 1 — Fase 0 (Fundação)

`
## Sprint 1 — Fundação

### Objetivo:
Corrigir as 4 brechas críticas da auditoria. Estabilizar a base de dados.

### Itens:
- [ ] 0.1 Schema DB — FK (4 estruturas soltas)
- [ ] 0.2 Schema DB — Índices explícitos
- [ ] 0.3 Schema DB — Tenant fields (12 models)
- [ ] 0.4 Schema DB — Soft Delete (15 models)
- [ ] 0.5 Schema DB — Auditoria (20 models)
- [ ] 0.6 Schema DB — Migração validada
- [ ] 0.7 Tratamento de Erros Padrão
- [ ] 0.8 Logs Estruturados
- [ ] 0.9 Validação Zod — 100%

### Critério de Cancelamento:
> 10 dias → cortar 0.8 e 0.9

### Gate para Fase 1:
0.1 a 0.7 concluídos
`

### Sprint 2 — Fase 1 (Cognitive Bus + Priorização)

`
## Sprint 2 — Cognitive Bus + Priorização

### Objetivo:
Implementar o barramento central e os mecanismos de prioridade e esquecimento.

### Itens:
- [ ] 1.1 Cognitive Bus
- [ ] 1.2 Priority Engine
- [ ] 1.3 Forgetting Engine
- [ ] 1.4 Ritmo / Ciclo Engine
- [ ] 1.5 Services > 300 linhas — extrair
- [ ] 1.6 Testes — Motor Cognitivo (≥ 60%)

### Decisões Pendentes:
- [ ] D01 — Cognitive Bus: eventEmitter vs banco vs Redis
- [ ] D02 — Forgetting: hard delete vs soft delete

### Critério de Cancelamento:
Bus > 10 dias → fila no banco

### Gate para Fase 2:
1.1 a 1.4 concluídos
`

### Sprint 3 — Fase 2 (Ciclo OODA)

`
## Sprint 3 — Ciclo OODA

### Objetivo:
Fechar o ciclo Observação → Orientação → Decisão → Ação.

### Itens:
- [ ] 2.1 Observation Engine
- [ ] 2.2 Trust Engine
- [ ] 2.3 Relevance Engine
- [ ] 2.4 Hypothesis Engine
- [ ] 2.5 Synthesis Engine
- [ ] 2.6 Centro de Decisão (tela)
- [ ] 2.7 Métricas Cognitivas (dashboard)
- [ ] 2.8 Configurações Cognitivas (tela)
- [ ] 2.9 Error Boundary + Rate Limiting

### Decisões Pendentes:
- [ ] D03 — Observation: polling vs webhook vs push
- [ ] D04 — Trust: manual vs automático
- [ ] D05 — Síntese: LLM vs template

### Critério de Cancelamento:
> 15 dias → cortar 2.5, 2.7, 2.8

### Gate para Fase 3:
2.1 a 2.4 concluídos
`

### Sprint 4 — Fase 3 (Testes e Estabilização)

`
## Sprint 4 — Testes e Estabilização

### Objetivo:
Qualidade mínima de produção.

### Itens:
- [ ] 3.1 Testes — API Routes (≥ 50%)
- [ ] 3.2 Testes — Frontend (≥ 30%)
- [ ] 3.3 CI/CD — GitHub Actions
- [ ] 3.4 Staging
- [ ] 3.5 Política de Backup
- [ ] 3.6 Monitoramento

### Decisões Pendentes:
- [ ] D06 — Testes: vitrais vs integr vs e2e

### Critério de Cancelamento:
> 10 dias → cortar 3.2
`

### Sprint 5 — Fase 4 (Otimização)

`
## Sprint 5 — Otimização e Performance

### Itens:
- [ ] 4.1 Caching
- [ ] 4.2 Rate Limiting avançado
- [ ] 4.3 Índices compostos
- [ ] 4.4 Query optimization
- [ ] 4.5 Paginação

### Decisões Pendentes:
- [ ] D07 — Caching: Redis vs memória vs banco
`

### Sprint 6 — Fase 5 (Preparação V4)

`
## Sprint 6 — Preparação V4 Completo

### Itens:
- [ ] 5.1 ADR-010 — Unificar Patrimônio Cognitivo
- [ ] 5.2 ADR-019 — Domínios operacionais via API
- [ ] 5.3 ADR-024 — Reavaliar Server Actions
- [ ] 5.4 Cobertura 80% core
- [ ] 5.5 Documentação operacional
`


---

## 10. Critérios de Congelamento

O que NÃO deve ser implementado agora, mesmo que pareça importante.

### 10.1 Funcionalidades Congeladas

| Funcionalidade | Motivo | Quando liberar |
|---------------|--------|----------------|
| Mapa Cognitivo Visual (frontend) | Sem evidência de necessidade | Após pesquisa com usuários |
| Agenda como Capacidade | Não resolve problema urgente | Quando houver demanda explícita |
| Inteligência Coletiva | Complexidade alta, valor não validado | Após Motor Cognitivo individual maduro |
| Recomendação Avançada | Sem dados suficientes para treinar | Após 6 meses de dados cognitivos |
| Server Actions completos (ADR-024) | Não comprovado para o contexto | Reavaliar na Fase 5 |
| Repositories (padrão formal) | Overengineering na fase atual | Quando houver > 3 fontes de dados |
| Domain Events formais (ADR-012) | Decisão: simplificar para eventos soltos | Não implementar |
| Migração completa para novo schema | ADR-030: apenas migração parcial | Quando houver versão estável |

### 10.2 Arquitetura Congelada (não modificar)

| Decisão | Documento | Não mexer |
|---------|-----------|-----------|
| ADR-001 a ADR-034 | docs/04-DECISIONS/ADR/ | Nenhuma alteração sem novo ADR |
| Constituição do Motor Cognitivo | docs/02-PRODUCT/CURRENT_PRODUCT.md | Princípios fundamentais |
| Modelo Cognitivo (OODA + Sinais) | docs/01-VISION/MODELO_COGNITIVO.md | Estrutura do motor |
| Ontologia de Negócio | docs/01-VISION/ONTOLOGIA.md | Entidades e relacionamentos |
| Arquitetura DDD (seções congeladas) | docs/03-ENGINEERING/ARCHITECTURE_DDD.md | Seções com deprecation notice |
| Catálogo de Eventos | docs/03-ENGINEERING/CATALOGO_EVENTOS.md | Estrutura de eventos |
| Pipeline de Execução | docs/03-ENGINEERING/EXECUTION_ARCHITECTURE.md | Fluxo do motor |

### 10.3 Regra de Ouro

> Se não está no backlog da sprint atual, não implementar.
> Se não resolve um problema documentado de um empresário real, não implementar.
> Se não gera aprendizado mensurável, não implementar.
> Se não fortalece um patrimônio da Ponte Digital, não implementar.

---

## Apêndice A — Referências

| Documento | Localização | Relevância para este Blueprint |
|-----------|-------------|-------------------------------|
| Constituição do Motor Cognitivo | docs/02-PRODUCT/CURRENT_PRODUCT.md | Princípios, fase atual, hipóteses |
| Modelo Cognitivo | docs/01-VISION/MODELO_COGNITIVO.md | Estrutura dos 16 sub-engines |
| Ontologia | docs/01-VISION/ONTOLOGIA.md | Entidades de negócio |
| Architecture DDD | docs/03-ENGINEERING/ARCHITECTURE_DDD.md | Padrões técnicos, seções congeladas |
| Catálogo de Eventos | docs/03-ENGINEERING/CATALOGO_EVENTOS.md | Todos os eventos do sistema |
| Execution Architecture | docs/03-ENGINEERING/EXECUTION_ARCHITECTURE.md | Pipeline, fluxos, infra cognitiva |
| Engineering Guidelines | docs/03-ENGINEERING/ENGINEERING_GUIDELINES.md | Regras técnicas |
| Auditoria Arquitetural | docs/03-ENGINEERING/AUDITORIA_ARQUITETURAL.md | Estado atual, pontuação, brechas |
| ADRs (34 documentos) | docs/04-DECISIONS/ADR/ | Decisões arquiteturais congeladas |
| MVP Scope | docs/02-PRODUCT/MVP_SCOPE.md | O que não implementar |
| Sprint atual | docs/05-OPERATIONS/SPRINTS/ | O que está sendo feito agora |

## Apêndice B — Glossário de Status

| Termo | Significado |
|-------|-------------|
| ✅ IMPLEMENTADO | Funciona em produção. Sem mudanças necessárias. |
| 🔶 PARCIAL | Existe mas incompleto, difere da documentação, ou tem débitos técnicos. |
| ❌ NÃO IMPLEMENTADO | Não existe no código. |
| 🧊 CONGELADO | Não deve ser implementado agora (ADR ou MVP_SCOPE). |
| P0 | Prioridade máxima — risco de segurança ou corrupção de dados. |
| P1 | Prioridade alta — manutenibilidade ou experiência. |
| P2 | Prioridade média — segurança ou confiabilidade. |
| P3-P5 | Prioridade baixa — qualidade, testes, infra. |

---

*Este documento é parte da documentação arquitetural da Ponte Digital. Nenhuma decisão aqui substitui os ADRs ou a Constituição do Motor Cognitivo. Em caso de conflito, prevalecer os ADRs e a Constituição.*
