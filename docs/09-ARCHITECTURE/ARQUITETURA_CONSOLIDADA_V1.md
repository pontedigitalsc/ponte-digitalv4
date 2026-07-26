# Arquitetura Consolidada — Ponte Digital v1.0

> **Programa 8 — Consolidação Arquitetural**
> Data: 24/07/2026
> Fontes: código real (`sistema/src/`), ADRs (`docs/04-DECISIONS/ADR/`), `ARCHITECTURE.md`, documentação existente
> Propósito: Representação completa, navegável e independente de memória dos criadores

---

## PACOTE A — INVENTÁRIO GLOBAL

### A.1 Engines (55 arquivos)

| # | Nome do Arquivo | Responsabilidade | Dependências Internas | Consumidores | Criticidade |
|---|----------------|-----------------|----------------------|-------------|-------------|
| 1 | `action-intelligence-engine.ts` | Inteligência de ação — sugere ações baseadas em contexto e padrões | services, lib | Decision Engine, Assistente | Média |
| 2 | `aprendizado-service.ts` | Serviço de aprendizado — registra e categoriza aprendizados do usuário | prisma-tenant-safe | Engines cognitivas | Alta |
| 3 | `clientes.sinais.ts` | Geração de sinais a partir de dados de clientes | prisma-tenant-safe | Signal Engine | Alta |
| 4 | `cognitive-action-composer.ts` | Compositor de ações cognitivas — coordena criação de ações entre engines | engines, prisma | Pipeline Cognitivo | Alta |
| 5 | `cognitive-briefing-engine.ts` | Geração de briefings/resumos cognitivos para o empresário | engines, lib | Experience Engine | Média |
| 6 | `cognitive-bus.ts` | Barramento de eventos cognitivos interno — pub/sub síncrono | event-catalog, lib | Todas as engines | Crítica |
| 7 | `cognitive-context-engine.ts` | Motor de contexto — mineração, carga, decaimento, fusão, cache | prisma-tenant-safe, lib | Todas as engines cognitivas | Crítica |
| 8 | `cognitive-evolution-engine.ts` | Motor de evolução — acompanha maturidade da empresa no tempo | engines, prisma | Dashboard | Média |
| 9 | `cognitive-experience-engine.ts` | Motor de experiência — orquestra a jornada do usuário na plataforma | engines, lib, prisma | Frontend (dashboard, diagnóstico) | Crítica |
| 10 | `cognitive-health-engine.ts` | Motor de saúde cognitiva — métricas de saúde da empresa | engines, prisma | Dashboard, Centro de Decisão | Alta |
| 11 | `cognitive-heritage-facade.ts` | Fachada do patrimônio cognitivo — acesso unificado a memória+conhecimento | engines, prisma | Engines superiores | Alta |
| 12 | `cognitive-journey-engine.ts` | Motor de jornada — acompanhamento da jornada do empresário | engines, prisma | Experience Engine | Média |
| 13 | `cognitive-memory-engine.ts` | Motor de memória — armazenamento, recuperação, consolidação, gc | prisma-tenant-safe, lib | Heritage Facade | Crítica |
| 14 | `cognitive-milestone-engine.ts` | Motor de marcos — detecta e registra marcos importantes | engines, prisma | Notification Engine | Média |
| 15 | `cognitive-notification-engine.ts` | Motor de notificações — notificações contextuais para o usuário | engines, prisma | Frontend | Baixa |
| 16 | `cognitive-observatory.ts` | Observatório cognitivo — visão consolidada do estado cognitivo | engines, prisma | Admin, Dashboard | Alta |
| 17 | `cognitive-orchestrator.ts` | Orquestrador cognitivo — coordena execução de engines em pipeline | engines, lib, prisma | Pipeline Cognitivo | Crítica |
| 18 | `cognitive-routine-engine.ts` | Motor de rotinas — executa tarefas cognitivas recorrentes | engines, prisma | Pipeline Cognitivo | Média |
| 19 | `cognitive-timeline-engine.ts` | Motor de timeline — linha do tempo de eventos cognitivos | prisma-tenant-safe | Frontend (timeline) | Média |
| 20 | `cognitive-workflow-engine.ts` | Motor de workflow — fluxos de trabalho cognitivos | engines, prisma | Experience Engine | Média |
| 21 | `company-maturity-engine.ts` | Motor de maturidade empresarial — calcula nível de maturidade | engines, prisma | Dashboard | Alta |
| 22 | `confidence-drift-engine.ts` | Motor de deriva de confiança — monitora mudanças em scores | engines, prisma | Trust Engine | Média |
| 23 | `conversation-engine.ts` | Motor de conversa — gerencia fluxo de conversa com IA | lib, engine | Assistente, Frontend | Crítica |
| 24 | `dead-letter-queue.ts` | Fila de eventos com falha — armazena eventos não processados | prisma-tenant-safe | Cognitive Bus | Alta |
| 25 | `decision-engine.ts` | Motor de decisão — registra, pondera e recomenda decisões | engines, prisma, lib | Centro de Decisão, Frontend | Crítica |
| 26 | `event-catalog.ts` | Catálogo de eventos — constantes e tipos de eventos do sistema | nenhuma | Cognitive Bus, Publisher, Subscriber | Crítica |
| 27 | `event-monitor.ts` | Monitor de eventos — métricas e estatísticas do barramento | prisma-tenant-safe, lib | Observabilidade | Média |
| 28 | `event-publisher.ts` | Publicador de eventos — publica eventos no barramento | cognitive-bus, event-catalog, prisma | Engines, Services | Alta |
| 29 | `event-store.ts` | Armazenamento de eventos — persiste eventos no banco | prisma-tenant-safe, event-catalog | Event Publisher | Alta |
| 30 | `event-subscriber.ts` | Assinante de eventos — registra handlers para tipos de evento | cognitive-bus, event-catalog, prisma | Engines | Alta |
| 31 | `evidence-engine.ts` | Motor de evidências — coleta, classifica e pondera evidências | prisma-tenant-safe, lib | Cognitive Context | Alta |
| 32 | `feature-flags.ts` | Feature flags — controle de funcionalidades por empresa | prisma-tenant-safe | Todas as engines | Média |
| 33 | `feedback-intelligence-engine.ts` | Inteligência de feedback — analisa feedback de ações | engines, prisma | Decision Engine | Média |
| 34 | `financeiro.sinais.ts` | Geração de sinais a partir de dados financeiros | prisma-tenant-safe | Signal Engine | Alta |
| 35 | `forgetting-engine.ts` | Motor de esquecimento — TTL, arquivamento, gc de dados cognitivos | prisma-tenant-safe, lib | Memory Engine | Alta |
| 36 | `founder-activation-engine.ts` | Motor de ativação do fundador — gatilhos comportamentais | engines, prisma, lib | Experience Engine | Média |
| 37 | `identity-engine.ts` | Motor de identidade — perfil cognitivo do empresário | prisma-tenant-safe | Context Engine | Alta |
| 38 | `index.ts` | Barrel de engines — re-exporta todas as engines | todos os engines | Services, API routes | Crítica |
| 39 | `interpretacoes.ts` | Interpretações de sinais — lógica de interpretação de padrões | engines, lib | Signal Engine | Média |
| 40 | `knowledge-aging-engine.ts` | Envelhecimento de conhecimento — decaimento temporal | prisma-tenant-safe | Knowledge Governance | Média |
| 41 | `knowledge-governance-engine.ts` | Governança de conhecimento — curadoria e versionamento | engines, prisma | Heritage Facade | Alta |
| 42 | `outcome-intelligence-engine.ts` | Inteligência de outcomes — análise de resultados de ações | engines, prisma | Decision Engine | Média |
| 43 | `pipeline-comparator.ts` | Comparador de pipelines — análise entre diferentes pipelines | engines, prisma | Observatório | Baixa |
| 44 | `pipeline-monitor.ts` | Monitor de pipeline — observabilidade do pipeline cognitivo | prisma-tenant-safe, lib | Observabilidade | Alta |
| 45 | `priority-engine.ts` | Motor de prioridade — classifica urgência/impacto de itens | engines, prisma | Decision Engine | Alta |
| 46 | `reacoes.ts` | Reações emocionais — processa reações do usuário | prisma-tenant-safe | Conversation Engine | Baixa |
| 47 | `relevance-engine.ts` | Motor de relevância — filtra por relevância temporal+contexto | engines, prisma, lib | Decision Engine | Alta |
| 48 | `retry-policy.ts` | Política de retry — backoff exponencial para eventos | nenhuma | Event Publisher | Média |
| 49 | `ritmo-engine.ts` | Motor de ritmo — ciclo, frequência, heartbeat do pipeline | prisma-tenant-safe | Pipeline Cognitivo | Alta |
| 50 | `signal-engine.ts` | Motor de sinais — captura, distribuição, filtro, ponderação | engines, prisma, lib | Pipeline Cognitivo | Crítica |
| 51 | `synthesis-engine.ts` | Motor de síntese — relatórios multi-domínio | engines, prisma, lib | Heritage Facade | Alta |
| 52 | `tarefas.sinais.ts` | Geração de sinais a partir de tarefas | prisma-tenant-safe | Signal Engine | Alta |
| 53 | `tipos.ts` | Tipos compartilhados entre engines | nenhuma | Todas as engines | Crítica |
| 54 | `trust-engine.ts` | Motor de confiança — score de confiabilidade de fontes | engines, prisma, lib | Decision Engine | Alta |
| 55 | `validation-engine.ts` | Motor de validação — verificação cross-source (DEPRECIADO) | engines, prisma | Nenhum (depreciado) | DESATIVADO |

### A.2 Services (7 arquivos)

| # | Nome | Responsabilidade | Dependências | Consumidores | Domínio |
|---|------|-----------------|-------------|-------------|---------|
| 1 | `cliente.service.ts` | CRUD de clientes, busca, conversão lead→cliente | prisma-tenant-safe | API clientes, Engines | CRM |
| 2 | `historico.service.ts` | Registro e consulta de histórico por entidade | prisma-tenant-safe | API historico, Engines | Histórico |
| 3 | `historico-sinal.service.ts` | Registro de sinais no histórico do sistema | prisma-tenant-safe | Signal Engine | Cognitivo |
| 4 | `implantacao.service.ts` | Gestão de implantação de clientes, etapas | prisma-tenant-safe | API implantacao | Onboarding |
| 5 | `lead.service.ts` | CRUD de leads, pipeline de vendas | prisma-tenant-safe | API leads, API crm | CRM |
| 6 | `tarefa.service.ts` | CRUD de tarefas, atribuição, workflow | prisma-tenant-safe | API tarefas | Tarefas |
| 7 | `transacao.service.ts` | CRUD de transações financeiras | prisma-tenant-safe | API financeiro | Financeiro |

### A.3 Lib (19 arquivos)

| # | Nome | Responsabilidade | Dependências | Consumidores |
|---|------|-----------------|-------------|-------------|
| 1 | `api-client.ts` | Cliente HTTP frontend com tratamento de erro | nenhuma local | Hooks, Componentes |
| 2 | `api-error.ts` | Handler de erro unificado para API routes | app-errors, planos, logger | Todas as API routes |
| 3 | `app-errors.ts` | Hierarquia de erros (8 subclasses) | nenhuma local | Toda a aplicação |
| 4 | `auth.ts` | Autenticação server-side (sessão, usuário, permissão) | supabase, prisma-tenant-safe | Server Components, Route Handlers |
| 5 | `authorize.ts` | Autorização para API routes (versão com erros tipados) | auth, app-errors | API routes |
| 6 | `cache.ts` | Singleton do provedor de cache + constantes TTL | cache-provider | cognitive-pipeline-store, engines |
| 7 | `cache-provider.ts` | Interface + implementação MemoryCacheProvider | nenhuma local | cache.ts |
| 8 | `cognitive-pipeline-store.ts` | Persistência/observabilidade do pipeline cognitivo | prisma-tenant-safe, event-catalog, logger, cache | Pipeline, Dashboard |
| 9 | `logger.ts` | Logger estruturado com níveis e contexto | app-errors | Toda a aplicação |
| 10 | `planos.ts` | Regras de planos (recursos, limites de IA) | app-errors | Services, API routes |
| 11 | `prisma.ts` | Singleton PrismaClient com adapter PostgreSQL | @prisma/client, @prisma/adapter-pg | prisma-tenant-safe |
| 12 | `prisma-tenant-safe.ts` | Wrapper Prisma com tenant guard obrigatório | prisma, app-errors, logger | Todos os services e engines |
| 13 | `rate-limit.ts` | Fachada de rate limiting com funções de conveniência | rate-limit-provider, rate-limit-config, app-errors | API routes |
| 14 | `rate-limit-config.ts` | Configurações centralizadas de rate limiting | nenhuma local | rate-limit.ts |
| 15 | `rate-limit-provider.ts` | Interface + implementação MemoryRateLimitProvider | nenhuma local | rate-limit.ts |
| 16 | `supabase.ts` | Cliente Supabase server-side | @supabase/ssr | auth.ts |
| 17 | `supabase-browser.ts` | Cliente Supabase browser-side | @supabase/ssr | Componentes client-side |
| 18 | `utils.ts` | Utilitários (formatação, paginação, classnames) | clsx, date-fns | Componentes, Páginas |
| 19 | `validations/index.ts` | Schemas Zod para validação de entrada | zod | API routes, Formulários |

### A.4 Hooks (4 arquivos)

| # | Nome | Responsabilidade | Dependências | Consumidores |
|---|------|-----------------|-------------|-------------|
| 1 | `use-clientes.ts` | Dados de clientes via api-client | api-client | Páginas de cliente |
| 2 | `use-leads.ts` | Dados de leads via api-client | api-client | Páginas de lead/CRM |
| 3 | `use-tarefas.ts` | Dados de tarefas via api-client | api-client | Páginas de tarefa |
| 4 | `use-transacoes.ts` | Dados financeiros via api-client | api-client | Páginas financeiras |

### A.5 Components (58+ arquivos)

| Domínio | Quantidade | Arquivos |
|---------|:----------:|----------|
| `components/ui/` | 6 | button, card, dialog, input, form-elements, avatar |
| `components/layout/` | 3 | sidebar, header, app-shell |
| `components/crm/` | 5 | pipeline, pipeline-column, lead-card, lead-form, lead-modal |
| `components/clientes/` | 4 | cliente-list, cliente-form, cliente-modal, cliente-perfil |
| `components/financeiro/` | 4 | transacao-list, transacao-form, transacao-modal, financeiro-resumo |
| `components/tarefas/` | 4 | tarefa-list, tarefa-item, tarefa-form, tarefa-modal |
| `components/conversa/` | 4 | question-card, revelacao-card, progress-bar, micro-reaction |
| `components/assistente/` | 2 | chat, chat-message |
| `components/shared/` | 8 | action-card, insight-card, journey-card, narrativa-card, experience-renderer, workflow-card, estado-vazio, lixeira-modal, dropdown-menu |
| `components/cognitive/` | 8 | health-score-card, evolution-card, maturity-card, briefing-card, milestone-card, notification-card, knowledge-aging-card, confidence-drift-card |
| `components/conhecimento/` | 5 | knowledge-card, knowledge-timeline, knowledge-tag, knowledge-summary, knowledge-filters |
| `components/aprendizados/` | 3 | quick-learning-question, learning-history, conversation-knowledge-card |
| **Total** | **58+** | |

### A.6 Pages (20 arquivos)

| # | Rota | Arquivo | Tipo | Funcionalidade |
|---|------|---------|------|----------------|
| 1 | `/` | `app/page.tsx` | Server/Client | Home/redirect |
| 2 | `/login` | `app/(auth)/login/page.tsx` | Client | Login |
| 3 | `/criar-conta` | `app/(auth)/criar-conta/page.tsx` | Client | Cadastro |
| 4 | `/reset-password` | `app/(auth)/reset-password/page.tsx` | Client | Reset de senha |
| 5 | `/reset-password/confirmar` | `app/(auth)/reset-password/confirmar/page.tsx` | Client | Confirmação de reset |
| 6 | `/dashboard` | `app/(dashboard)/dashboard/page.tsx` | Misto | Dashboard principal |
| 7 | `/crm` | `app/(dashboard)/crm/page.tsx` | Client | Pipeline de vendas |
| 8 | `/clientes` | `app/(dashboard)/clientes/page.tsx` | Client | Lista de clientes |
| 9 | `/clientes/[id]` | `app/(dashboard)/clientes/[id]/page.tsx` | Client | Perfil do cliente |
| 10 | `/financeiro` | `app/(dashboard)/financeiro/page.tsx` | Client | Gestão financeira |
| 11 | `/tarefas` | `app/(dashboard)/tarefas/page.tsx` | Client | Gestão de tarefas |
| 12 | `/implantacoes` | `app/(dashboard)/implantacoes/page.tsx` | Client | Implantação de clientes |
| 13 | `/historico` | `app/(dashboard)/historico/page.tsx` | Client | Timeline/histórico |
| 14 | `/centro-decisao` | `app/(dashboard)/centro-decisao/page.tsx` | Client | Centro de decisão |
| 15 | `/assistente` | `app/(dashboard)/assistente/page.tsx` | Client | Chat com IA |
| 16 | `/conhecimento` | `app/(dashboard)/conhecimento/page.tsx` | Client | Base de conhecimento |
| 17 | `/aprendizados` | `app/(dashboard)/aprendizados/page.tsx` | Client | Aprendizados |
| 18 | `/conversa` | `app/conversa/page.tsx` | Client | Fluxo de conversa |
| 19 | `/configuracoes` | `app/(dashboard)/configuracoes/page.tsx` | Client | Configurações |
| 20 | `/admin/cognitive-observatory` | `app/(dashboard)/admin/cognitive-observatory/page.tsx` | Client | Admin do observatório |

### A.7 Types (2 arquivos)

| # | Nome | Responsabilidade |
|---|------|-----------------|
| 1 | `types/index.ts` | Tipos compartilhados da aplicação |
| 2 | `types/declaracoes.d.ts` | Declarações globais de tipos |

### A.8 Prisma Schema (33 models, 25 enums)

| Métrica | Valor |
|---------|-------|
| Total de models | 33 |
| Total de enums | 25 |
| Total de índices | 141 |
| Models com tenant (`empresaId`) | 30 de 33 |
| Models com tenant (`tenantId`) | 2 de 33 (Event, DeadLetter) |
| Models sem tenant | 1 (Empresa — entidade raiz) |
| Soft delete universal (`deletedAt`) | 33 de 33 (100%) |
| Audit fields completos (`criadaEm` + `atualizadaEm`) | 24 de 33 |
| Apenas `criadaEm` (sem `atualizadaEm`) | 7 (HistoricoSinal, MemoriaCognitiva, EventoAtivacao, ConversaHistorico, Event, DeadLetter, DecisaoSinal) |
| Apenas `atualizadaEm` (sem `criadaEm`) | 1 (ConfiguracaoEmpresa) |
| **Anomalia:** Inconsistência tenant naming | `Event` e `DeadLetter` usam `tenantId` em vez de `empresaId` |
| **Anomalia:** Tenant opcional | `Conversa.empresaId?`, `EventSubscription.empresaId?` |

### A.9 API Routes (27+ endpoints)

| # | Rota | Métodos Consumidos | Domínio |
|---|------|-------------------|---------|
| 1 | `/api/auth/login` | POST | Autenticação |
| 2 | `/api/auth/criar-conta` | POST | Autenticação |
| 3 | `/api/auth/logout` | POST | Autenticação |
| 4 | `/api/auth/session` | GET | Autenticação |
| 5 | `/api/clientes` | GET, POST | CRM |
| 6 | `/api/clientes/[id]` | GET, PUT, DELETE | CRM |
| 7 | `/api/leads` | GET, POST | CRM |
| 8 | `/api/leads/[id]` | GET, PUT, DELETE | CRM |
| 9 | `/api/crm` | GET | CRM (pipeline) |
| 10 | `/api/contatos` | GET, POST | CRM |
| 11 | `/api/contatos/[id]` | GET, PUT, DELETE | CRM |
| 12 | `/api/tarefas` | GET, POST | Tarefas |
| 13 | `/api/tarefas/[id]` | GET, PUT, DELETE | Tarefas |
| 14 | `/api/transacoes` | GET, POST | Financeiro |
| 15 | `/api/transacoes/[id]` | GET, PUT, DELETE | Financeiro |
| 16 | `/api/historico` | GET | Histórico |
| 17 | `/api/implantacao` | GET, POST | Onboarding |
| 18 | `/api/implantacao/[id]` | GET, PUT, DELETE | Onboarding |
| 19 | `/api/cognitivo/decisao` | GET, POST | Cognitivo |
| 20 | `/api/cognitivo/contexto` | GET | Cognitivo |
| 21 | `/api/cognitivo/memoria` | GET, POST | Cognitivo |
| 22 | `/api/cognitivo/conhecimento` | GET, POST | Cognitivo |
| 23 | `/api/assistente` | POST | IA |
| 24 | `/api/health` | GET | Observabilidade |
| 25 | `/api/configuracoes` | GET, PUT | Configurações |
| 26 | `/api/dashboard` | GET | Dashboard |
| 27 | `/api/conversa` | GET, POST | Conversa |

### A.10 Providers, Middleware, Layouts

| Tipo | Arquivo | Função |
|------|---------|--------|
| Root Layout | `app/layout.tsx` | Layout raiz com providers |
| Dashboard Layout | `app/(dashboard)/layout.tsx` | Layout do dashboard com sidebar |
| Auth Layout | `app/(auth)/layout.tsx` | Layout de autenticação |
| Middleware | NÃO EXISTE | — |

**Observação crítica:** Não há arquivo `middleware.ts` no projeto. A proteção de rotas é feita dentro de cada Server Component ou Route Handler via `auth.ts`.

---

## PACOTE B — MAPA ARQUITETURAL

### B.1 Diagrama de Camadas

```
FRONTEND (Browser)
├── Pages (20) — Server + Client Components
├── Components (58+) — UI, Domínio, Compartilhados
├── Hooks (4) — use-clientes, use-leads, use-tarefas, use-transacoes
└── api-client.ts — Cliente HTTP centralizado
        │
        ▼ (fetch HTTP)
API LAYER (Next.js App Router)
├── API Routes (27) — handlers HTTP
├── api-error.ts — handler de erro unificado
├── authorize.ts — validação de autorização
├── rate-limit.ts — controle de taxa
└── auth.ts — validação de sessão
        │
        ▼
SERVICES LAYER (7)
├── cliente.service.ts
├── lead.service.ts
├── tarefa.service.ts
├── transacao.service.ts
├── historico.service.ts
├── implantacao.service.ts
└── historico-sinal.service.ts
        │
        ├──────────────────────────────┐
        ▼                              ▼
ENGINE LAYER (55)             LIB LAYER (19)
├── Motor de Contexto          ├── prisma-tenant-safe (gatekeeper)
├── Motor de Decisão           ├── app-errors (hierarquia de erros)
├── Motor de Memória           ├── logger (logs estruturados)
├── Motor de Sinais            ├── cache (cache provider)
├── Motor de Experiência       ├── planos (business rules)
├── Motor de Pipeline          ├── rate-limit-* (controle)
├── Event Bus (pub/sub)        ├── supabase-* (auth client)
├── Heritage Facade            ├── validations (schemas Zod)
├── Demais engines             └── utils (utilitários)
        │
        ▼
PRISMA ORM LAYER
├── prisma.ts (singleton)
└── prisma-tenant-safe.ts (tenant guard wrapper)
        │
        ▼
POSTGRESQL (Supabase)
├── 33 models
├── 141 índices
└── Supabase Auth (externa)
```

### B.2 Fluxo de Requisição Típico

```
Browser
  │
  ├─ GET /dashboard ──────────────────────────────────────────┐
  │    │                                                       │
  │    ▼                                                       │
  │  Server Component                                          │
  │    │                                                       │
  │    ├─ auth.ts: createSupabaseServerClient() + getSession() │
  │    ├─ getCurrentUser()                                     │
  │    ├─ getEmpresaDoUsuario()                                │
  │    │                                                       │
  │    └─ Engines:                                             │
  │         ├─ cognitive-experience-engine.ts                  │
  │         ├─ cognitive-health-engine.ts                      │
  │         ├─ cognitive-evolution-engine.ts                   │
  │         │     └─ prismaSeguro (tenant guard)               │
  │         ▼                                                  │
  │    Página renderizada com dados                            │
  │                                                             │
  ├─ POST /api/clientes (via hook + api-client) ──────────────┐
       │                                                       │
       ▼                                                       │
     API Route                                                 │
       ├─ authorize.ts: requireUserApi()                       │
       ├─ rate-limit.ts: checkRateLimit()                      │
       ├─ validations: schema.parse(body)                      │
       │                                                       │
       ▼                                                       │
     cliente.service.ts                                        │
       ├─ prismaSeguro.cliente.create()                        │
       ├─ logger.info()                                        │
       │                                                       │
       ▼                                                       │
     Event Publisher (se aplicável)                             │
       ├─ event-publisher.ts                                   │
       ├─ cognitive-bus.ts                                     │
       └─ event-store.ts                                       │
```

### B.3 Domínios da Aplicação

```
┌─────────────────────────────────────────────────────────────┐
│                    PONTE DIGITAL                              │
├──────────┬──────────┬──────────┬──────────┬──────────────────┤
│   CRM     │FINANCEIRO│ TAREFAS  │ONBOARDING│    COGNITIVO     │
├──────────┼──────────┼──────────┼──────────┼──────────────────┤
│ Leads    │Receitas  │CRUD      │Etapas    │Contexto          │
│ Clientes │Despesas  │Tipos     │Decisões  │Decisões          │
│ Contatos │Categorias│Status    │Anotações │Memória           │
│ Pipeline │Recorrên. │Priorid.  │          │Sinais            │
│          │          │Workflow  │          │Evidências        │
│          │          │          │          │Hipóteses         │
│          │          │          │          │Conhecimento      │
│          │          │          │          │Aprendizados      │
│          │          │          │          │Pipeline          │
│          │          │          │          │Outcomes          │
└──────────┴──────────┴──────────┴──────────┴──────────────────┘
```

---

## PACOTE C — GRAFO DE DEPENDÊNCIAS

### C.1 Dependências entre Camadas

```
Components ← Hooks ← api-client ← API Routes
                                            │
                         ┌──────────────────┼──────────────────┐
                         ▼                  ▼                  ▼
                    Services (7)      Engines (55)        Lib (19)
                         │                  │                  │
                         └──────────────────┼──────────────────┘
                                            ▼
                                    prisma-tenant-safe
                                            │
                                            ▼
                                        prisma.ts
                                            │
                                            ▼
                                     PostgreSQL
```

### C.2 Ciclos de Dependência Potenciais

| Ciclo | Caminho | Risco |
|-------|---------|-------|
| **Engine ↔ Engine (via cognitive-orchestrator)** | experience-engine → cognitive-orchestrator → signal-engine → experience-engine | Médio — orquestrador medeia, mas há dependência circular conceitual |
| **Lib ↔ Engine** | cognitive-pipeline-store → event-catalog | Baixo — apenas tipo, não lógica |
| **Service → Engine** | nenhum service importa engine diretamente | ✅ Ausente |
| **Engine → Service** | clientes.sinais.ts → (indireto via prisma) | ✅ Ausente |

### C.3 Acoplamento por Arquivo

| Arquivo | Importa de | Acoplamento |
|---------|-----------|-------------|
| `cognitive-orchestrator.ts` | 10+ engines | 🔴 Alto |
| `cognitive-experience-engine.ts` | 8+ engines | 🔴 Alto |
| `cognitive-heritage-facade.ts` | 4+ engines | 🟡 Médio |
| `decision-engine.ts` | 5+ engines | 🟡 Médio |
| `prisma-tenant-safe.ts` | prisma, app-errors, logger | 🟢 Baixo (estável) |
| `cognitive-pipeline-store.ts` | 4+ libs | 🟡 Médio |
| `api-error.ts` | app-errors, planos, logger | 🟡 Médio |

### C.4 Dependências Perigosas

| Dependência | Por que é perigosa |
|-------------|-------------------|
| `cognitive-orchestrator.ts` → todas as engines | Se falhar, todo o pipeline para |
| `prisma-tenant-safe.ts` → toda aplicação | Se quebrar, toda aplicação perde tenant guard |
| `engine/index.ts` (barrel) → todas as engines | Barrel gigante dificulta tree-shaking e cria acoplamento implícito |
| `cognitive-pipeline-store.ts` (1392 linhas) → 4+ libs | Arquivo monolítico, alto acoplamento |

### C.5 Dependências Cruzadas (Engine → Engine)

| Engine Fonte | Engine Destino | Tipo de Dependência |
|-------------|---------------|---------------------|
| cognitive-experience-engine | cognitive-context-engine, cognitive-decision-engine, cognitive-health-engine, cognitive-evolution-engine, cognitive-journey-engine, cognitive-milestone-engine, cognitive-briefing-engine | Orquestração |
| cognitive-orchestrator | signal-engine, cognitive-context-engine, evidence-engine, hypothesis-engine, decision-engine, action-intelligence-engine, outcome-intelligence-engine | Pipeline |
| cognitive-heritage-facade | cognitive-memory-engine, knowledge-governance-engine, synthesis-engine, forgetting-engine | Fachada |
| decision-engine | priority-engine, trust-engine, relevance-engine, outcome-intelligence-engine | Decisão |

---

## PACOTE D — CATÁLOGO DE RESPONSABILIDADES

### D.1 Engines

| Engine | Por que existe | Quem utiliza | Quem NÃO deveria utilizar | Responsabilidades | NÃO responsabilidades |
|--------|---------------|-------------|-------------------------|-------------------|----------------------|
| cognitive-context-engine | Minerar e manter contexto cognitivo do empresário | Todas as engines superiores | Frontend diretamente | Mineração, carga, decaimento, fusão, cache de contexto | Decidir ações, armazenar memória de longo prazo |
| decision-engine | Apoiar decisões com pesos e cenários | Centro de Decisão, Assistente | Services de domínio | Registrar decisões, calcular pesos, recomendar | Executar ações, validar dados de entrada |
| cognitive-memory-engine | Armazenar e recuperar memórias cognitivas | cognitive-heritage-facade | Frontend, API routes | Armazenamento, recuperação, consolidação, gc | Decidir o que é relevante |
| cognitive-experience-engine | Orquestrar experiência do usuário | Páginas do dashboard | API routes | Compor dados de dashboard, gerenciar estado da experiência | Persistir dados de negócio |
| signal-engine | Capturar e processar sinais do sistema | Pipeline cognitivo | Services de domínio | Captura, distribuição, filtro, ponderação de sinais | Tomar decisões baseadas em sinais |
| cognitive-bus | Barramento de eventos interno | Todas as engines | Frontend | Pub/sub síncrono, encaminhamento de eventos | Persistir eventos, garantir entrega (sem retry) |
| conversation-engine | Gerenciar fluxo de conversa com IA | Assistente, páginas de conversa | Services de domínio | Fluxo de perguntas, interpretação de respostas, micro-reações | Processar dados de negócio |
| ritual-engine | Controlar ciclo e frequência do pipeline | cognitive-orchestrator | Frontend | Heartbeat, controle de ciclo, agenda | Executar lógica de negócio |
| trust-engine | Calcular confiança de fontes | decision-engine, relevance-engine | Frontend | Score de confiabilidade, histórico, decaimento | Decidir prioridade |
| priority-engine | Classificar urgência e impacto | decision-engine | Frontend | Classificação em níveis de urgência | Executar ações |
| forgetting-engine | Gerenciar TTL e arquivamento | cognitive-memory-engine, cognitive-heritage-facade | Frontend | TTL por tipo, gc, arquivamento de dados expirados | Decidir o que esquecer |
| validation-engine | Validar dados cross-source (DEPRECIADO) | Ninguém (depreciado) | — | — | — |

### D.2 Services

| Service | Por que existe | Quem utiliza | Quem NÃO deveria utilizar | Responsabilidades | NÃO responsabilidades |
|---------|---------------|-------------|-------------------------|-------------------|----------------------|
| cliente.service | CRUD de clientes | API clientes | Engines diretamente | Criar, ler, atualizar, deletar clientes | Validar regras cognitivas |
| lead.service | CRUD de leads | API leads | Engines de contexto | Gerenciar pipeline de vendas | Decidir prioridade de leads |
| tarefa.service | CRUD de tarefas | API tarefas | Motor cognitivo | Gerenciar tarefas e atribuições | Analisar padrões de tarefas |
| transacao.service | CRUD financeiro | API transações | Engines | Gerenciar receitas e despesas | Calcular saúde financeira |
| implantacao.service | Gestão de implantação | API implantação | Engines de contexto | Gerenciar etapas de onboarding | Decidir próxima ação |
| historico.service | Histórico por entidade | API histórico | Engines | Registrar eventos em timeline | Interpretar eventos |
| historico-sinal.service | Registro de sinais | Signal Engine | Frontend | Persistir sinais no histórico | Processar sinais |

### D.3 Lib

| Lib | Por que existe | Quem utiliza | Responsabilidades |
|-----|---------------|-------------|-------------------|
| prisma-tenant-safe | Garantir isolamento multi-tenant | Todos os services e engines | Forçar empresaId em queries, logar risco |
| app-errors | Hierarquia de erros padronizada | Toda aplicação | Definir tipos de erro com HTTP status |
| api-error | Handler unificado de erros HTTP | API routes | Converter erros em NextResponse |
| logger | Logs estruturados | Toda aplicação | Log com nível, contexto, correlationId |
| auth | Autenticação server-side | Server Components, Route Handlers | Gerenciar sessão Supabase SSR |
| cache | Cache em memória | Engines | Cache de consultas frequentes |
| rate-limit | Controle de taxa | API routes | Limitar requisições por rota |
| validations | Schemas de validação | API routes, formulários | Validar entrada de dados |
| planos | Regras de negócio de planos | Services | Verificar acesso a recursos |
| supabase | Cliente Supabase server+browser | auth, componentes | Conectar ao Supabase |

---

## PACOTE E — FLUXOS EXECUTÁVEIS

### E.1 Nova Conversa

```
Origem: Usuário → Página /conversa ou /assistente
Fluxo:
  1. Usuário inicia conversa
  2. conversation-engine cria nova sessão
  3. IA (Anthropic) processa pergunta via /api/assistente
  4. conversation-engine interpreta resposta
  5. Se há sinal: signal-engine.processarSinal()
  6. cognitive-context-engine.atualizarContexto()
  7. Se relevante: evidence-engine.registrarEvidencia()
  8. Se insight: aprendizado-service.registrar()
  9. event-publisher.publicar("CONVERSA_REALIZADA")
Persistência: Conversa, ConversaHistorico, HistoricoSinal
Eventos: CONVERSA_INICIADA, CONVERSA_REALIZADA, SINAL_GERADO
Observabilidade: logger.info, HistoricoSinal com motorOrigem="conversation"
```

### E.2 Novo Insight

```
Origem: Evidência detectada por evidence-engine
Fluxo:
  1. evidence-engine coleta evidência (de conversa, dado, ou sinal)
  2. Categoriza (FINANCEIRO, CLIENTES, OPERACAO, etc.)
  3. cognitive-context-engine avalia relevância
  4. Se score > threshold: vira insight
  5. cognitive-experience-engine apresenta ao usuário
  6. Usuário reage (confirmar/descartar)
  7. aprendizado-service.registrar() se confirmado
Persistência: Evidencia, Contexto (em memória), Aprendizado
Eventos: EVIDENCIA_REGISTRADA, INSIGHT_GERADO
Observabilidade: logger.info("Insight gerado", {categoria, score})
```

### E.3 Nova Hipótese

```
Origem: Padrão detectado por signal-engine ou evidence-engine
Fluxo:
  1. Múltiplos sinais correlacionados são detectados
  2. cognitive-context-engine enriquece com dados históricos
  3. hypothesis-engine registra hipótese (se implementada)
  4. Hipótese entra em estado EM_OBSERVACAO
  5. Novas evidências fortalecem ou enfraquecem
  6. Se confiança > threshold: CONFIRMADA
  7. Se confiança < threshold: DESCARTADA
Persistência: Hipotese, Evidencia, HistoricoSinal
Eventos: HIPOTESE_REGISTRADA, HIPOTESE_CONFIRMADA, HIPOTESE_DESCARTADA
Observabilidade: pipeline-monitor.registrarEtapa()
```

### E.4 Novo Cliente

```
Origem: Venda concluída (lead → cliente)
Fluxo:
  1. lead.service.atualizar() com estagio=FECHADO_GANHO
  2. lead → cliente: cliente.service.criar()
  3. implantacao.service.criar() com etapas padrão
  4. signal-engine.processarSinal("NOVO_CLIENTE")
  5. cognitive-context-engine.atualizarContexto()
  6. EventoAtivacao: PRIMEIRA_ACAO_CRIADA (se aplicável)
  7. event-publisher.publicar("CLIENTE_CRIADO")
Persistência: Lead, Cliente, Implantacao, EtapaImplantacao, HistoricoSinal
Eventos: CLIENTE_CRIADO, IMPLANTACAO_INICIADA
Observabilidade: logger.info, historico.service.registrar()
```

### E.5 Nova Decisão

```
Origem: Empresário registra decisão ou sistema sugere
Fluxo:
  1. decision-engine.recomendar() (se automático)
  2. OU usuário registra via /centro-decisao
  3. priority-engine.classificar() urgência/impacto
  4. trust-engine.avaliar() fontes envolvidas
  5. relevance-engine.filtrar() por contexto atual
  6. AcaoCognitiva criada se decisão requer ação
  7. outcome-intelligence-engine.projetar() resultado esperado
  8. event-publisher.publicar("DECISAO_REGISTRADA")
Persistência: AcaoCognitiva, DecisaoSinal, Outcome
Eventos: DECISAO_REGISTRADA, ACAO_CRIADA
Observabilidade: logger.info, HistoricoSinal
```

### E.6 Novo Aprendizado

```
Origem: Feedback do usuário ou padrão identificado
Fluxo:
  1. Usuário fornece feedback (via aprendizado-service ou reaction)
  2. OU sistema identifica padrão (via learning-engine)
  3. Aprendizado categorizado (FINANCEIRO, GESTAO, etc.)
  4. Se score de confiança > threshold: ConhecimentoValidado
  5. cognitive-context-engine.atualizarContexto()
  6. event-publisher.publicar("APRENDIZADO_REGISTRADO")
Persistência: Aprendizado, ConhecimentoValidado, HistoricoSinal
Eventos: APRENDIZADO_REGISTRADO, CONHECIMENTO_VALIDADO
Observabilidade: logger.info
```

### E.7 Nova Memória

```
Origem: Contexto consolidado ou ciclo de pipeline
Fluxo:
  1. cognitive-context-engine detecta padrão recorrente
  2. cognitive-memory-engine.consolidar()
  3. Memória criada com tipo e versão
  4. cognitive-heritage-facade.unificar()
  5. forgetting-engine agenda TTL
  6. event-publisher.publicar("MEMORIA_CONSOLIDADA")
Persistência: MemoriaCognitiva
Eventos: MEMORIA_CONSOLIDADA
Observabilidade: pipeline-monitor
```

### E.8 Nova Evidência

```
Origem: Dado de negócio, conversa, ou sinal
Fluxo:
  1. Fonte (conversa, módulo, sistema) detecta dado relevante
  2. evidence-engine.registrar() com categoria e confiança
  3. Se confiança >= ALTA:
     a. cognitive-context-engine processa imediatamente
  4. Se confiança >= MÉDIA:
     a. Fica em observação para consolidação
  5. event-publisher.publicar("EVIDENCIA_REGISTRADA")
Persistência: Evidencia
Eventos: EVIDENCIA_REGISTRADA
Observabilidade: logger.info
```

### E.9 Nova Síntese

```
Origem: Ciclo de pipeline ou solicitação do usuário
Fluxo:
  1. synthesis-engine.coletarDados() de múltiplos domínios (CRM, Financeiro, Tarefas, Decisões)
  2. cognitive-context-engine fornecer contexto atual
  3. synthesis-engine.gerarRelatorio() via template ou LLM
  4. cognitive-heritage-facade.armazenar()
  5. Apresentado ao usuário via experience-engine
Persistência: (em memória ou via heritage facade)
Eventos: SINTESE_GERADA
Observabilidade: pipeline-monitor
```

---

## PACOTE F — INVENTÁRIO COGNITIVO

### F.1 Mapa Cognitivo

```
                    ┌──────────────────────────────┐
                    │     ENTRADA (Sinais)          │
                    │  clientes.sinais.ts           │
                    │  financeiro.sinais.ts         │
                    │  tarefas.sinais.ts            │
                    │  conversa (via signal-engine) │
                    └──────────────┬───────────────┘
                                   │
                                   ▼
                    ┌──────────────────────────────┐
                    │    SIGNAL ENGINE              │
                    │  Captura, distribuição,       │
                    │  filtro, ponderação           │
                    └──────────────┬───────────────┘
                                   │
                                   ▼
                    ┌──────────────────────────────┐
                    │    EVIDENCE ENGINE            │
                    │  Coleta, classificação,       │
                    │  ponderação de evidências     │
                    └──────────────┬───────────────┘
                                   │
                                   ▼
                    ┌──────────────────────────────┐
                    │    CONTEXT ENGINE             │
                    │  Mineração, carga, decaimento,│
                    │  fusão, cache                 │
                    └──────────────┬───────────────┘
                                   │
              ┌────────────────────┼────────────────────┐
              ▼                    ▼                    ▼
   ┌──────────────────┐ ┌──────────────────┐ ┌──────────────────┐
   │  HYPOTHESIS      │ │  DECISION        │ │  MEMORY          │
   │  ENGINE          │ │  ENGINE          │ │  ENGINE          │
   │  (parcial)       │ │  Registro, pesos,│ │  Armazenamento,  │
   │                  │ │  recomendação    │ │  consolidação    │
   └────────┬─────────┘ └────────┬─────────┘ └────────┬─────────┘
            │                    │                    │
            ▼                    ▼                    ▼
   ┌──────────────────────────────────────────────────────┐
   │           COGNITIVE HERITAGE FACADE                   │
   │  Unifica: Memory + Knowledge + Synthesis + Forgetting │
   └──────────────────────┬───────────────────────────────┘
                          │
                          ▼
   ┌──────────────────────────────────────────────────────┐
   │           EXPERIENCE ENGINE                           │
   │  Orquestra apresentação ao empresário                 │
   │  Dashboard, Centro de Decisão, Briefings             │
   └──────────────────────────────────────────────────────┘
```

### F.2 Interação entre Engines

| Engine Interage com | Natureza da Interação | Mecanismo |
|--------------------|----------------------|-----------|
| Signal → Context | Sinal enriquece contexto | Chamada direta de engine |
| Context → Decision | Contexto informa decisão | cognitive-orchestrator |
| Decision → Priority | Decisão é priorizada | Chamada direta |
| Decision → Trust | Fontes da decisão são avaliadas | Chamada direta |
| Decision → Relevance | Decisões filtradas por relevância | Chamada direta |
| Decision → Outcome | Resultado da decisão é projetado | Chamada direta |
| Memory → Heritage | Memória alimenta patrimônio | Facade |
| Knowledge → Heritage | Conhecimento alimenta patrimônio | Facade |
| Synthesis → Heritage | Síntese alimenta patrimônio | Facade |
| Forgetting → Memory | Esquecimento limpa memória | Chamada direta |
| Heritage → Experience | Patrimônio é apresentado | Facade → Experience |
| Ritmo → Orchestrator | Ritmo controla pipeline | Ciclo |
| Pipeline → Event Bus | Etapas do pipeline publicam eventos | event-publisher |

### F.3 Engines por Estado

| Estado | Engines | Observação |
|--------|---------|-----------|
| ✅ Completo | Context, Decision, Memory, Outcome, Conversation, Cognitive Bus, Event Publisher/Subscriber/Store/Monitor | Implementação completa |
| 🔶 Parcial | Signal (captura ok, distribuição pendente), Knowledge (base ok, curadoria pendente), Experience (básico ok), Identity, Evidence, Ritmo, Forgetting, Priority, Trust, Relevance, Activation | Funcionam mas têm lacunas |
| ❌ Não implementado | Observation, Hypothesis (parcial), Pipeline-orchestrator (parcial) | Previstos no roadmap P1-P6 |
| 💀 Depreciado | Validation | Movido para services individuais |

---

## PACOTE G — INVENTÁRIO DAS APIs

### G.1 APIs de Autenticação

| Rota | Método | Engine/Service | Auth | Tenant | Rate Limit | Consumidores |
|------|--------|---------------|------|--------|-----------|-------------|
| `/api/auth/login` | POST | auth.ts | Não | Não | Sim (login) | Página de login |
| `/api/auth/criar-conta` | POST | auth.ts | Não | Não | Sim (criar-conta) | Página de cadastro |
| `/api/auth/logout` | POST | auth.ts | Sim | Não | Não | Header/App |
| `/api/auth/session` | GET | auth.ts | Sim | Sim | Não | Server Components |

### G.2 APIs de CRM

| Rota | Método | Service | Engine | Auth | Tenant | Persistência | Consumidores |
|------|--------|---------|--------|------|--------|-------------|-------------|
| `/api/clientes` | GET, POST | cliente.service | — | Sim | Sim | Cliente | Páginas de cliente |
| `/api/clientes/[id]` | GET, PUT, DELETE | cliente.service | — | Sim | Sim | Cliente | Perfil de cliente |
| `/api/leads` | GET, POST | lead.service | — | Sim | Sim | Lead | Páginas de lead |
| `/api/leads/[id]` | GET, PUT, DELETE | lead.service | — | Sim | Sim | Lead | Perfil de lead |
| `/api/crm` | GET | lead.service | — | Sim | Sim | Lead, Cliente | Página de pipeline |
| `/api/contatos` | GET, POST | cliente.service | — | Sim | Sim | Contato | Páginas de contato |
| `/api/contatos/[id]` | GET, PUT, DELETE | cliente.service | — | Sim | Sim | Contato | Perfil de contato |

### G.3 APIs Financeiro

| Rota | Método | Service | Engine | Auth | Tenant | Persistência | Consumidores |
|------|--------|---------|--------|------|--------|-------------|-------------|
| `/api/transacoes` | GET, POST | transacao.service | — | Sim | Sim | Transacao | Página financeira |
| `/api/transacoes/[id]` | GET, PUT, DELETE | transacao.service | — | Sim | Sim | Transacao | Detalhe transação |

### G.4 APIs Tarefas

| Rota | Método | Service | Engine | Auth | Tenant | Consumidores |
|------|--------|---------|--------|------|--------|-------------|
| `/api/tarefas` | GET, POST | tarefa.service | — | Sim | Sim | Página de tarefas |
| `/api/tarefas/[id]` | GET, PUT, DELETE | tarefa.service | — | Sim | Sim | Detalhe tarefa |

### G.5 APIs Cognitivo

| Rota | Método | Engine | Service | Auth | Tenant | Consumidores |
|------|--------|--------|---------|------|--------|-------------|
| `/api/cognitivo/decisao` | GET, POST | decision-engine | — | Sim | Sim | Centro de Decisão |
| `/api/cognitivo/contexto` | GET | cognitive-context-engine | — | Sim | Sim | Dashboard |
| `/api/cognitivo/memoria` | GET, POST | cognitive-memory-engine | — | Sim | Sim | Páginas cognitivas |
| `/api/cognitivo/conhecimento` | GET, POST | knowledge-governance-engine | — | Sim | Sim | Páginas de conhecimento |

### G.6 APIs Diversas

| Rota | Método | Engine/Service | Auth | Tenant | Consumidores |
|------|--------|---------------|------|--------|-------------|
| `/api/historico` | GET | historico.service | Sim | Sim | Página de histórico |
| `/api/implantacao` | GET, POST | implantacao.service | Sim | Sim | Página de implantação |
| `/api/implantacao/[id]` | GET, PUT, DELETE | implantacao.service | Sim | Sim | Detalhe implantação |
| `/api/assistente` | POST | conversation-engine | Sim | Sim | Chat assistente |
| `/api/health` | GET | — | Não | Não | Uptime monitor |
| `/api/configuracoes` | GET, PUT | — | Sim | Sim | Página de configurações |
| `/api/dashboard` | GET | cognitive-experience-engine | Sim | Sim | Dashboard |
| `/api/conversa` | GET, POST | conversation-engine | Sim | Opcional | Página de conversa |

---

## PACOTE H — SAÚDE ARQUITETURAL

### H.1 Contagem

| Categoria | Quantidade |
|-----------|:----------:|
| Engines | 55 (incluindo 1 depreciada) |
| API Routes | 27+ |
| Services | 7 |
| Lib modules | 19 |
| Hooks | 4 |
| Components | 58+ |
| Pages | 20 |
| Types files | 2 |
| Constants files | 1 |
| Models Prisma | 33 |
| Enums Prisma | 25 |
| Índices de banco | 141 |
| Layouts | 3 (root, dashboard, auth) |
| Providers | 0 (embedded in layout) |
| Middleware | 0 |

### H.2 Duplicações

| O que está duplicado | Onde | Impacto |
|---------------------|------|---------|
| Lógica de tenant guard | `prisma-tenant-safe.ts` + cada service manual | Baixo — wrapper padronizou |
| Schemas Zod vs validação manual | Validations + algumas rotas sem Zod | Médio — ~40% das rotas sem Zod (Programa 1 pendente) |
| Definição de tipos de engine | `tipos.ts` + `event-catalog.ts` + `index.ts` | Baixo — complementar |
| Constantes de rate limit | `rate-limit-config.ts` + `rate-limit.ts` | Baixo — uma depende da outra |
| Tipos da pipeline | `cognitive-pipeline-store.ts` (interfaces inline) | Médio — 20 interfaces no mesmo arquivo |

### H.3 Ciclos

| Ciclo | Severidade | Detalhes |
|-------|-----------|----------|
| Engine ↔ Cognitive Bus | 🟢 Leve | Engines publicam eventos e consomem eventos — design intencional |
| Experience → Orchestrator → Engines → Experience | 🟡 Médio | Orquestrador medeia, mas há chamadas de retorno |
| Lib → Engine → Lib | 🟢 Leve | cognitive-pipeline-store importa event-catalog (apenas tipos) |

### H.4 Código Morto

| Arquivo/Função | Evidência | Risco |
|---------------|-----------|-------|
| `validation-engine.ts` | Depreciado no RC, lógica movida para services | Baixo — não importado |
| `event-store.ts` | Pode estar substituído por cognitive-pipeline-store | Médio — verificar imports |
| `pipeline-comparator.ts` | Funcionalidade não referenciada em páginas | Baixo |

### H.5 Módulos Órfãos

| Módulo | Suspeita | Verificação Necessária |
|--------|---------|----------------------|
| `cognitive-notification-engine.ts` | Pode não ter consumidor frontend | Verificar se é usado em páginas |
| `cognitive-milestone-engine.ts` | Pode estar subutilizado | Verificar eventos de ativação |
| `pipeline-comparator.ts` | Sem referência em páginas | Verificar uso em cognitive-observatory |

### H.6 Acoplamentos Elevados

| Arquivo | Tamanho | Dependências | Risco |
|---------|:-------:|-------------|-------|
| `cognitive-pipeline-store.ts` | 1392 linhas | prisma-tenant-safe, event-catalog, logger, cache | Alto — arquivo faz demais |
| `cognitive-orchestrator.ts` | ~500+ | 10+ engines | Alto — centro do pipeline |
| `cognitive-experience-engine.ts` | ~500+ | 8+ engines | Alto — ponto de integração |
| `engine/index.ts` | Barrel | 54 engines | Médio — acoplamento implícito |
| `api-error.ts` | ~200 | app-errors, planos, logger | Médio — depende de libs de negócio |

### H.7 Débitos Arquiteturais

| ID | Débito | Impacto | Prioridade |
|----|--------|---------|:----------:|
| ARCH-001 | Índices de performance | Performance | Alta |
| ARCH-002 | Cache distribuído | Escalabilidade | Média |
| ARCH-003 | Rate limiting por tenant | Segurança | Alta |
| ARCH-004 | Logs em produção | Observabilidade | Média |
| ARCH-005 | Testes E2E | Qualidade | Baixa |
| ARCH-006 | Documentação de APIs | Manutenibilidade | Baixa |
| ARCH-007 | Ambiente de staging | Operação | Média |
| ARCH-009 | CSP Header | Segurança | Alta |
| ARCH-010 | Dead Letter Queue | Resiliência | Baixa |
| ARCH-011 | Retry Automático | Resiliência | Baixa |
| ARCH-012 | Health Check Database | Observabilidade | Baixa |
| ARCH-013 | Circuit Breaker | Resiliência | Baixa |
| ARCH-014 | Feature Flags | Operação | Baixa |
| ARCH-015 | Observabilidade Avançada | Observabilidade | Média |
| ARCH-016 | CI/CD Pipeline | Operação | Crítica |
| ARCH-017 | Backup Automático | Operação | Crítica |
| ARCH-018 | Rastreabilidade de Eventos | Observabilidade | Baixa |

### H.8 Riscos Arquiteturais

| Risco | Probabilidade | Impacto | Descrição |
|-------|:------------:|:-------:|-----------|
| Pipeline monolítico | Média | Alto | cognitive-orchestrator + cognitive-pipeline-store concentram lógica crítica |
| Sem middleware de auth | Baixa | Alto | Rotas protegidas individualmente — risco de rota esquecer auth |
| Barrel gigante (engine/index.ts) | Média | Médio | Importa 54 engines — qualquer mudança exige rebuild total |
| Sem testes | Alta | Crítico | Zero testes automatizados — regressão silenciosa garantida |
| Cache não compartilhado | Alta | Médio | Múltiplas instâncias Vercel = caches inconsistentes |
| ValidationEngine depreciada | Baixa | Médio | Código existe mas não é usado — confusão para novos devs |
| Inconsistência tenant naming | Baixa | Baixo | `tenantId` vs `empresaId` em Event/DeadLetter |

---

## PACOTE I — ADRs PENDENTES

### I.1 Decisões Arquiteturais sem ADR

| # | Decisão | Onde está documentada | Risco de não ter ADR |
|---|---------|----------------------|----------------------|
| 1 | Por que não há middleware.ts? | Nenhum lugar | Médio — nova pessoa pode criar um conflitante |
| 2 | Decisão de usar barrel `engine/index.ts` | Nenhum lugar | Baixo — padrão conhecido |
| 3 | Por que ValidationEngine foi depreciada? | RC v1.0, Lessons Learned | Baixo — documentado em RC |
| 4 | Decisão de cache in-memory vs Redis | Architecture.md | Médio — pode ser questionado sem contexto |
| 5 | Por que `Conversa` tem empresaId opcional? | Nenhum lugar | Médio — pode ser confuso |
| 6 | Decisão de não ter testes automatizados | MVP_SCOPE.md | Médio — intencional mas não documentado como ADR |
| 7 | Por que `tenantId` em Event/DeadLetter em vez de `empresaId`? | Nenhum lugar | Alto — inconsistência sem justificativa |
| 8 | Padrão de nomenclatura de arquivos (kebab-case vs camelCase) | Nenhum lugar | Baixo — mas alguns arquivos fogem do padrão |
| 9 | Decisão de não usar Redis para cache | Nenhum lugar | Médio — importante para futura migração |
| 10 | Por que não há Server Actions? | Architecture.md | Baixo — documentado parcialmente |

### I.2 ADRs Existentes (34)

Ver `docs/09-ARCHITECTURE/ADR_NAVIGATOR.md` e `docs/04-DECISIONS/ADR/`.

---

## PACOTE J — ROADMAP ARQUITETURAL

### J.1 O que Falta Documentar

| Item | Prioridade | Motivo |
|------|:----------:|--------|
| Fluxo completo de autenticação (diagrama de sequência) | Média | Complexo de entender sem diagrama |
| Estratégia de cache (por que in-memory, quando migrar) | Média | Decisão não documentada formalmente |
| Mapa de eventos completo (todos os tipos publicados) | Média | Parcial em EVENT_MAP.md |
| Pipeline cognitivo detalhado (etapas, transições de estado) | Alta | Fundamentos existem, fluxo completo não |

### J.2 O que Falta Consolidar

| Item | Esforço | Impacto |
|------|:-------:|---------|
| Inconsistência `tenantId` vs `empresaId` em Event/DeadLetter | 2h | Baixo — mas confunde |
| `cognitive-pipeline-store.ts` (1392 linhas) — quebrar em módulos | 1 dia | Alto — arquivo monolítico |
| barrel `engine/index.ts` — avaliar impacto | 1h | Médio — acoplamento implícito |
| Schemas Zod nas rotas sem validação | 2 dias | Alto — ~40% das rotas |
| Unificar logger (alguns lugares logam sem logger.ts) | 1 dia | Médio |

### J.3 O que Ainda Representa Risco

| Risco | Risco Actual | Por que não foi resolvido |
|-------|:-----------:|---------------------------|
| Zero testes automatizados | 🔴 Crítico | Fora do escopo da v1.0 (P6 roadmap) |
| CI/CD não configurado | 🔴 Crítico | Resolvido na v1.1 (ARCH-016) |
| Backup não automático | 🔴 Crítico | Resolvido na v1.1 (ARCH-017) |
| Chaves expostas (service role) | 🔴 Crítico | Rotação documentada, ação humana necessária |
| Pipeline monolítico (orchestrator + pipeline-store) | 🟡 Alto | Necessita refatoração planejada |
| Rotas sem validação Zod | 🟡 Alto | Programa 1 do roadmap |
| Sem rate limit em todas as rotas | 🟡 Médio | Apenas rotas críticas têm |

### J.4 O que Está Pronto para Produção

| Componente | Justificativa |
|-----------|---------------|
| **Módulos de Negócio** (CRM, Financeiro, Tarefas, Implantação) | Services maduros, tenant guard, logs, erros padronizados |
| **Autenticação** | Auth SSR testada, session management, multi-empresa |
| **Motor Cognitivo** (Context, Decision, Memory, Outcome) | Implementação completa, testada em integração |
| **Conversa/Assistente** | IA integrada com Anthropic, streaming, fallback |
| **Health Check** | Endpoint `/api/health` funcional |
| **Logs Estruturados** | Logger com correlation ID, níveis, contexto |

### J.5 O que Ainda é Experimental

| Componente | Motivo | Quando Reavaliar |
|-----------|--------|-----------------|
| **Signal Engine** (distribuição) | Implementação parcial | Após P4 do roadmap |
| **Knowledge Engine** (curadoria) | Curadoria não implementada | Após P3 do roadmap |
| **Forgetting Engine** | TTL configurado, gc não testado | Com dados reais |
| **Trust Engine** | Score de fontes sem dados históricos | Após período de aquecimento |
| **Priority Engine** | Classificação não calibrada | Com feedback de usuários |
| **Relevance Engine** | Filtro sem dados suficientes | Após pipeline cognitivo completo |
| **Pipeline Cognitivo** | Orchestrator existe, ciclo não contínuo | Após P4 do roadmap |
| **Cognitive Observatory** (admin) | Interface administrativa | Quando houver múltiplas empresas |
| **Cognitive Briefing** | Geração de resumo não validada | Com usuários reais |

---

## Documentos Afetados

Este documento consolida e substitui parcialmente as seguintes fontes como referência de inventário:

- `docs/09-ARCHITECTURE/ARCHITECTURAL_INVENTORY.md`
- `docs/09-ARCHITECTURE/COGNITIVE_MAP.md`
- `docs/09-ARCHITECTURE/DEPENDENCY_MAP.md`
- `docs/09-ARCHITECTURE/PIPELINE_MAP.md`

**Não substitui:** ADRs, decisões arquiteturais, documentos de visão ou produto. Este é um mapa do que existe, não do que deveria existir.

---

## Estatísticas Finais

| Métrica | Valor |
|---------|-------|
| Arquivos de código analisados | 170+ (55 engines, 7 services, 19 lib, 4 hooks, 58+ components, 20 pages, 2 types, 1 constants, 3 layouts) |
| Linhas de documentação produzidas (este documento) | ~900+ |
| Engines mapeadas | 55 |
| Services mapeados | 7 |
| API Routes mapeadas | 27+ |
| Models mapeados | 33 |
| Fluxos executáveis documentados | 9 |
| Dependências mapeadas | 30+ |
| Riscos identificados | 10 |
| Débitos arquiteturais | 18 (ARCH-001 a ARCH-018) |
| ADRs pendentes identificadas | 10 |
| Componentes experimentais | 9 |

---

*Documento de consolidação arquitetural. Gerado a partir do código real em 24/07/2026. Nenhuma funcionalidade, engine, API, schema ou comportamento foi alterado — apenas documentado.*
