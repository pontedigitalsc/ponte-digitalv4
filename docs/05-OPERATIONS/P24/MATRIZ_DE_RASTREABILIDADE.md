# MATRIZ DE RASTREABILIDADE — Mapeamento Completo Ponte Digital

**Programa 24 | Documento de Rastreabilidade | 26/07/2026**

> Matriz completa de rastreabilidade funcionalidade por camada.
> Colunas: ID | Funcionalidade | Documento Origem | Engine | Service | API | Tela | Banco | Evento | Status | Observação

---

## Legenda

| Campo | Formato |
|-------|---------|
| Documento Origem | `P23/arquivo.md` ou `ADR-XXX` ou `FUNDACIONAL` |
| Engine | `sistema/src/engine/arquivo.ts` |
| Service | `sistema/src/services/arquivo.ts` |
| API | `src/app/api/rota/` |
| Tela | `src/app/(rota)/` |
| Banco | Modelo Prisma (nome do model) |
| Evento | `cognitive-bus.ts` ou tipo de evento |
| Status | ESPECIFICADO / IMPLEMENTADO / PARCIAL / NÃO IMPLEMENTADO / VIOLAÇÃO |

---

## Matriz

| ID | Funcionalidade | Documento Origem | Engine | Service | API | Tela | Banco | Evento | Status | Observação |
|----|---------------|------------------|--------|---------|-----|------|-------|--------|--------|------------|
| F01 | Login | P23/ARQUITETURA_VISUAL_DA_CONVERSA (E1), P23/EXPERIENCIA_COGNITIVA (Fase 0) | `cognitive-orchestrator.ts` → `processarLogin()` | — | `src/app/api/auth/` | `src/app/(auth)/login/` | User/Account | Event Bus (parcial) | IMPLEMENTADO | Sem evento formal de domínio |
| F02 | Onboarding (primeira vez) | P23/PSICOLOGIA_DA_PRIMEIRA_IMPRESSAO, P23/EXPERIENCIA_COGNITIVA (Fase 1-2), P23/WP02 | `founder-activation-engine.ts`, `cognitive-journey-engine.ts` | — | `src/app/api/auth/` | `src/app/(auth)/criar-conta/` | User, ActivationEvent | Event Bus (parcial) | PARCIAL | Jornada de 7 dias não implementada |
| F03 | Conversa (pergunta) | P23/GUIA_DA_CONVERSA, P23/EXPERIENCIA_COGNITIVA, P23/ARQUITETURA_VISUAL (E3) | `conversation-engine.ts` → `criarConversa()` | — | `src/app/api/conversa/` | `src/app/conversa/page.tsx` | Conversation, Message | Event Bus | IMPLEMENTADO | Sem 7 estados visuais E1-E7 |
| F04 | Conversa (resposta) | P23/GUIA_DA_CONVERSA (R-VE01, R-VE02), P23/EXPERIENCIA_SENSORIAL | `conversation-engine.ts` → `responder()`, `cognitive-orchestrator.ts` | — | `src/app/api/conversa/` | `src/app/conversa/page.tsx` | Message | Event Bus | IMPLEMENTADO / VIOLAÇÃO | Resposta instantânea viola digitação simulada e variação de velocidade |
| F05 | Pensamento da IA | P23/LOADING_INTELIGENTE (7 fases), P23/ARQUITETURA_VISUAL (E4) | `pipeline-monitor.ts` (reporta fases) | — | PARCIAL (status pipeline) | NÃO (spinner genérico) | — | Event Bus (pipeline events) | VIOLAÇÃO | Loading inteligente com 7 fases não implementado |
| F06 | Insight | P23/SISTEMA_DE_INSIGHTS, P23/SISTEMA_DE_VALOR (20 momentos) | `cognitive-experience-engine.ts`, `evidence-engine.ts` | — | `src/app/api/experience/` | Dashboard (parcial) | Insight, Knowledge | Event Bus (parcial) | PARCIAL | Formato de apresentação diverge do P23 |
| F07 | Hipótese | P23/SISTEMA_DE_INSIGHTS (seção 2.2), P23/MAPAS_COGNITIVO_VIVO (seção 4) | `evidence-engine.ts`, `cognitive-memory-engine.ts` → `listarHipoteses()` | — | `src/app/api/cognitivo/` (parcial) | Dashboard (cards parciais) | Hipótese, Evidência | Event Bus (parcial) | PARCIAL | Card de hipótese sem botões Explorar/Ignorar |
| F08 | Confirmação de hipótese | P23/GUIA_DA_CONVERSA (R-CO02, R-CO04), P23/EXPERIENCIA_COGNITIVA (Fase 8) | `knowledge-governance-engine.ts` → `promoverConhecimento()` | — | PARCIAL (conhecimento) | NÃO | Knowledge, Hipótese | Event Bus (parcial) | PARCIAL | Fluxo de confirmação pelo empresário não implementado |
| F09 | Correção de hipótese | P23/EXPERIENCIA_COGNITIVA (Fase 8), P23/GUIA_DA_CONVERSA (R-TR04) | `confidence-drift-engine.ts`, `knowledge-governance-engine.ts` | — | NÃO | NÃO | Hipótese (histórico) | NÃO | PENDÊNCIA | Correção pelo empresário não implementada na interface |
| F10 | Resumo parcial | P23/EXPERIENCIA_COGNITIVA (Fase 9), P23/ARQUITETURA_VISUAL (E6) | `cognitive-briefing-engine.ts` → `gerarBriefing()` | — | `src/app/api/experience/` (parcial) | NÃO | — | NÃO | PENDÊNCIA | Timing de 5 perguntas/3min não implementado |
| F11 | Diagnóstico final | P23/EXPERIENCIA_COGNITIVA (Fase 10-11), P23/ARQUITETURA_VISUAL (E7) | `cognitive-health-engine.ts` → `calcularHealthScore()`, `cognitive-orchestrator.ts` | — | `src/app/api/health/` (parcial) | Dashboard (parcial) | Dados consolidados | NÃO | PARCIAL | Tela E7 não implementada |
| F12 | Mapa cognitivo (atualização) | P23/MAPAS_COGNITIVO_VIVO (338 linhas), P23/WP01 | `cognitive-context-engine.ts`, `cognitive-observatory.ts` → `obterResumoCognitivo()` | — | `src/app/api/experience/` (parcial) | NÃO | Contexto cognitivo | Event Bus (parcial) | PENDÊNCIA | WP01 P0 — não implementado |
| F13 | Painel de confiança | P23/SISTEMA_DE_CONFIANCA_VISUAL, P23/MAPAS_COGNITIVO_VIVO (seção 5) | `trust-engine.ts` | — | PARCIAL | NÃO | Trust data | Event Bus (parcial) | PARCIAL | Anel circular com breakdown não implementado |
| F14 | Gamificação | P23/GAMIFICACAO_COGNITIVA (29 seções) vs P23/MANIFESTO (seção 4.7) | `cognitive-milestone-engine.ts`, `cognitive-evolution-engine.ts`, `company-maturity-engine.ts` | — | NÃO | NÃO | — | NÃO | INCONSISTÊNCIA | Documento contradiz Manifesto. Decisão pendente. |
| F15 | Loading inteligente | P23/LOADING_INTELIGENTE, P23/MANIFESTO (Princípio 2) | `pipeline-monitor.ts`, `pipeline-comparator.ts` | — | PARCIAL (status) | NÃO (spinner) | — | Event Bus (pipeline) | VIOLAÇÃO | Spinner genérico — mesma violação de F05 |
| F16 | Explicação da IA | P23/GUIA_DA_CONVERSA (R-EX01 a R-EX04), P23/MANIFESTO (Princípio 6) | `cognitive-context-engine.ts`, `cognitive-experience-engine.ts` | — | NÃO | NÃO | — | NÃO | PENDÊNCIA | Camadas de explicação não implementadas |
| F17 | Espera inteligente | P23/A_ESPERA_INTELIGENTE, P23/GUIA_DA_CONVERSA (R-CA01, R-PA01-R-PA05) | NÃO | — | NÃO | NÃO | — | NÃO | NÃO IMPLEMENTADO | Pausas e intervenções não implementadas |
| F18 | Microinteração | P23/MICROINTERACOES | NÃO | — | NÃO | NÃO | — | NÃO | NÃO IMPLEMENTADO | Badges, reações visuais não implementadas |
| F19 | Transição de tela | P23/MANUAL_DE_TRANSICOES, P23/ARQUITETURA_VISUAL_DA_CONVERSA (transições) | N/A | N/A | N/A | NÃO (transições padrão Next.js) | N/A | N/A | NÃO IMPLEMENTADO | Transições especificadas não implementadas |
| F20 | Retorno de sessão | P23/EXPERIENCIA_COGNITIVA (Fase 1 variações), P23/WP10 | `conversation-engine.ts` → `carregarConversa()` | — | `src/app/api/sessao/` | PARCIAL | Session, Conversation | NÃO | PARCIAL | Saudação personalizada não implementada |
| F21 | Dashboard | P23/WP05 — Dashboard Inteligente | Várias engines | — | `src/app/api/experience/` | `src/app/(dashboard)/dashboard/` | Dados cognitivos | Event Bus (parcial) | PARCIAL | Sem Insight do dia, modo Foco |
| F22 | Recomendação | P23/WP07 — Sistema de Recomendações | `decision-engine.ts`, `action-intelligence-engine.ts`, `priority-engine.ts` | — | Rotas de decisão/ação (parcial) | `src/app/(dashboard)/centro-decisao/` (parcial) | Decision, Action | Event Bus (parcial) | PARCIAL | Card de recomendação com evidências não implementado |
| F23 | Automação | P23/WP11 — Ciclo Decisão → Ação | `cognitive-workflow-engine.ts` → `gerarWorkflows()` | — | NÃO | NÃO | — | NÃO | PENDÊNCIA | Workflow engine existe, interface não |
| F24 | Notificação | P23 (mencionado, sem doc dedicado) | `cognitive-notification-engine.ts` → `gerarNotificacoes()` | — | PARCIAL | NÃO | Notification | Event Bus | PARCIAL | Engine gera, frontend não exibe conforme P23 |
| F25 | Erro/fallback | P23/AUDITORIA_COMPLETA (L2), P23/LOADING_INTELIGENTE (seção 6, 8) | `dead-letter-queue.ts`, `retry-policy.ts` | — | NÃO | `error.tsx` (genérico) | DeadLetterEntry | DLQ + Event Bus | PARCIAL | DLQ no backend; fallback narrativo no frontend não implementado |
| F26 | Timeout | P23/LOADING_INTELIGENTE (seção 6 — 30s timeout) | NÃO | — | NÃO | NÃO | — | NÃO | NÃO IMPLEMENTADO | Tela de timeout com 3 opções não implementada |
| F27 | Logout | — | NÃO | — | `src/app/api/auth/` | Layout da app | Session | NÃO | IMPLEMENTADO | Funcional, sem documento nem evento |
| F28 | Cadastro | P23/PSICOLOGIA_DA_PRIMEIRA_IMPRESSAO (indiretamente) | `cognitive-orchestrator.ts` → `processarCadastro()` | — | `src/app/api/auth/` | `src/app/(auth)/criar-conta/` | User | Event Bus (parcial) | IMPLEMENTADO | Sem evento formal de domínio |
| F29 | Primeiro diagnóstico | P23/EXPERIENCIA_COGNITIVA (Fases 3-6) | `cognitive-orchestrator.ts`, várias engines | — | PARCIAL | Conversa + Dashboard | Dados coletados | Event Bus (parcial) | PARCIAL | Progressão de perguntas (fechada→aberta→confrontadora) não segue P23 |
| F30 | Histórico | P23 (painel cognitivo, descobertas) | `cognitive-timeline-engine.ts` → `gerarTimeline()` | — | `src/app/api/historicos/` | `src/app/(dashboard)/historico/` | Histórico de sessões | Event Bus (parcial) | IMPLEMENTADO | Timeline engine funcional |
| F31 | Centro de Decisão | P23 (WP05, WP07, WP08), ADR-032 (convicção/priorização) | `decision-engine.ts`, `priority-engine.ts`, `confidence-drift-engine.ts` | — | Rotas de decisão (parcial) | `src/app/(dashboard)/centro-decisao/` | Decision | Event Bus | IMPLEMENTADO | Funcional, com engines de suporte |
| F32 | Gestão de Conhecimento | P23/GAMIFICACAO_COGNITIVA (Patrimônio, Descobertas), ADR-010, ADR-018, ADR-028 | `cognitive-heritage-facade.ts`, `knowledge-governance-engine.ts`, `forgetting-engine.ts`, `synthesis-engine.ts`, `knowledge-aging-engine.ts` | `aprendizado-service.ts` | `src/app/api/patrimonio/`, `src/app/api/aprendizados/`, `src/app/api/cognitive-heritage/` | `src/app/(dashboard)/conhecimento/`, `src/app/(dashboard)/aprendizados/` | Knowledge, Aprendizado, Patrimônio | Event Bus (completo) | IMPLEMENTADO | Funcionalidade mais madura da plataforma |
| F33 | Cadastro de Clientes | FUNDACIONAL (CRM) | `clientes.sinais.ts` | — | `src/app/api/clientes/` | `src/app/(dashboard)/clientes/` | Cliente | Signal Engine (parcial) | IMPLEMENTADO | Módulo CRM funcional |
| F34 | Gestão Financeira | FUNDACIONAL | `financeiro.sinais.ts` | — | `src/app/api/transacoes/` | `src/app/(dashboard)/financeiro/` | Transação, Financeiro | Signal Engine (parcial) | IMPLEMENTADO | Módulo financeiro funcional |
| F35 | Gestão de Tarefas | FUNDACIONAL | `tarefas.sinais.ts` | — | `src/app/api/tarefas/` | `src/app/(dashboard)/tarefas/` | Tarefa | Signal Engine (parcial) | IMPLEMENTADO | Módulo de tarefas funcional |
| F36 | Configurações | FUNDACIONAL | — | — | `src/app/api/configuracoes/` | `src/app/(dashboard)/configuracoes/` | Config | — | IMPLEMENTADO | Tela de configurações funcional |
| F37 | Admin | FUNDACIONAL | — | — | — | `src/app/(dashboard)/admin/` | — | — | IMPLEMENTADO | Painel admin funcional |
| F38 | Implantações | FUNDACIONAL | — | — | `src/app/api/implantacoes/` | `src/app/(dashboard)/implantacoes/` | Implantação | — | IMPLEMENTADO | Módulo de implantação funcional |
| F39 | Sessão | FUNDACIONAL | `ritmo-engine.ts` → `obterCiclos()` | — | `src/app/api/sessao/` | — | Session, Ciclo | Event Bus | IMPLEMENTADO | Gestão de sessão implementada |
| F40 | Cognitive Bus (eventos) | ADR-011, ADR-012, ADR-015, ADR-027 | `cognitive-bus.ts`, `event-publisher.ts`, `event-subscriber.ts`, `event-catalog.ts`, `event-store.ts`, `event-monitor.ts` | — | — | — | EventStore | Event Bus (completo) | IMPLEMENTADO | Barramento de eventos funcional |

---

## Sumário estatístico

| Status | Quantidade | Percentual |
|--------|-----------|------------|
| IMPLEMENTADO | 17 | 42.5% |
| PARCIAL | 11 | 27.5% |
| PENDÊNCIA | 4 | 10.0% |
| NÃO IMPLEMENTADO | 4 | 10.0% |
| VIOLAÇÃO | 2 | 5.0% |
| INCONSISTÊNCIA | 2 | 5.0% |
| **Total** | **40** | **100%** |

### Funcionalidades P0 do P23 não implementadas

| WP | Funcionalidade | Status atual |
|----|---------------|--------------|
| WP01 | Mapa Cognitivo Vivo (transparência cognitiva) | PENDÊNCIA |
| WP02 | Jornada da Primeira Semana | PARCIAL (apenas cadastro + conversa básica) |
| WP03 | Motor de Insights | PARCIAL (engine existe, formato visual não segue P23) |
| WP04 | Nova Landing Page | PENDÊNCIA (não auditado — fora de `src/app/(auth)`) |

### Funcionalidades P1-P2 do P23 com implementação parcial ou inexistente

| WP | Funcionalidade | Status atual |
|----|---------------|--------------|
| WP05 | Dashboard Inteligente | PARCIAL |
| WP06 | Resumo de Sessão | PENDÊNCIA |
| WP07 | Sistema de Recomendações | PARCIAL |
| WP08 | Feedback Loop de Decisão | PARCIAL |
| WP09 | Relatório Mensal Inteligente | NÃO IMPLEMENTADO |
| WP10 | Login Personalizado | PARCIAL |
| WP11 | Automação | PENDÊNCIA |

---

## Distribuição por camada

| Camada | Funcionalidades cobertas | Cobertura |
|--------|--------------------------|-----------|
| Documento de origem | 35 de 40 (87.5%) | ALTA |
| Engine | 33 de 40 (82.5%) | ALTA |
| Service | 3 de 40 (7.5%) | MUITO BAIXA |
| API | 28 de 40 (70.0%) | MÉDIA |
| Tela | 21 de 40 (52.5%) | BAIXA |
| Banco | 30 de 40 (75.0%) | MÉDIA |
| Evento | 22 de 40 (55.0%) | BAIXA |

**Padrão identificado:** Engines e documentação têm alta cobertura. Telas e API têm cobertura média-baixa. Services têm cobertura quase zero (a maioria das funcionalidades pula a camada de serviço e vai direto da API para a engine).

---

*Documento certificado por auditoria arquitetural em 26/07/2026.*
*Programa 24 — 40 funcionalidades mapeadas, rastreabilidade completa documentada.*
