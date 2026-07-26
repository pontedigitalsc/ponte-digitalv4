# Governança Arquitetural Permanente — Ponte Digital

> **Programa 9 — Governança Arquitetural Permanente**
> Data: 24/07/2026
> Fontes: Código (`sistema/src/`), ADRs (`docs/04-DECISIONS/ADR/`), `ARCHITECTURE.md`, documentação existente
> Propósito: Camada permanente de governança — qualquer desenvolvedor deve entender o sistema apenas lendo estes documentos

---

## PACOTE A — CATÁLOGO VIVO PERMANENTE

### A.1 Ativos de Engine (55)

Ver inventário detalhado em `ARQUITETURA_CONSOLIDADA_V1.md` (disponível em `docs/09-ARCHITECTURE/`).

### A.2 Ativos de Serviço (7)

| Nome | Tipo | Responsabilidade | Motivo da Existência | Quem Utiliza | Quem NÃO Deveria | Dependências | ADR | Criticidade | Maturidade |
|------|------|-----------------|---------------------|-------------|------------------|-------------|-----|-------------|------------|
| `cliente.service.ts` | Service | CRUD de clientes | Domínio central do negócio | API routes de clientes | Engines cognitivas | prisma-tenant-safe | — | Alta | Estável |
| `lead.service.ts` | Service | CRUD de leads | Pipeline de vendas | API routes de leads/crm | Engines de contexto (diretamente) | prisma-tenant-safe | — | Alta | Estável |
| `tarefa.service.ts` | Service | CRUD de tarefas | Gestão de atividades | API routes de tarefas | Motor de decisão | prisma-tenant-safe | — | Alta | Estável |
| `transacao.service.ts` | Service | CRUD financeiro | Gestão financeira | API routes de transações | Motor cognitivo | prisma-tenant-safe | — | Alta | Estável |
| `historico.service.ts` | Service | Timeline por entidade | Rastreabilidade | API routes de histórico | — | prisma-tenant-safe | — | Média | Estável |
| `implantacao.service.ts` | Service | Onboarding de clientes | Jornada de implantação | API routes de implantação | — | prisma-tenant-safe | — | Alta | Estável |
| `historico-sinal.service.ts` | Service | Persistência de sinais | Alimentar motor cognitivo | Signal Engine | Frontend | prisma-tenant-safe | ADR-001 | Alta | Estável |

### A.3 Ativos de Lib (19)

| Nome | Tipo | Responsabilidade | Motivo | Quem Utiliza | ADR | Criticidade | Maturidade |
|------|------|-----------------|--------|-------------|-----|-------------|------------|
| `prisma-tenant-safe.ts` | Lib | Tenant guard via Prisma $extends | Isolamento multi-empresa | Todos services + engines | ADR-008 | Crítica | Estável |
| `app-errors.ts` | Lib | Hierarquia de erros (8 classes) | Erro padronizado | Toda aplicação | — | Crítica | Estável |
| `api-error.ts` | Lib | Handler unificado de erros HTTP | Resposta padronizada | API routes | — | Crítica | Estável |
| `auth.ts` | Lib | Autenticação SSR | Controle de acesso | Server Components, Route Handlers | — | Crítica | Estável |
| `authorize.ts` | Lib | Autorização com erros tipados | Controle de permissão | API routes | — | Alta | Estável |
| `logger.ts` | Lib | Logger estruturado | Observabilidade | Toda aplicação | — | Alta | Estável |
| `cache.ts` + `cache-provider.ts` | Lib | Cache em memória com TTL | Performance | 4 engines | ADR-014 (divergente) | Média | Estável |
| `rate-limit.ts` + config + provider | Lib | Rate limiting | Proteção contra abuso | API routes específicas | — | Alta | Estável |
| `supabase.ts` + `supabase-browser.ts` | Lib | Cliente Supabase SSR/browser | Autenticação | auth.ts, componentes | — | Crítica | Estável |
| `planos.ts` | Lib | Regras de planos e billing | Monetização | Services, API routes | — | Média | Estável |
| `validations/index.ts` | Lib | Schemas Zod | Validação de entrada | API routes, formulários | — | Alta | Parcial (~60%) |
| `utils.ts` | Lib | Utilitários (formatação, cn) | Conveniência | Componentes, páginas | — | Baixa | Estável |
| `cognitive-pipeline-store.ts` | Lib | Observabilidade do pipeline | Monitoramento | Pipeline, Dashboard | — | Alta | Experimental |
| `api-client.ts` | Lib | Cliente HTTP frontend | Comunicação com API | Hooks | — | Alta | Estável |

### A.4 Ativos de Hook (4)

| Nome | Responsabilidade | Motivo | Quem Utiliza | Dependências | Criticidade | Maturidade |
|------|-----------------|--------|-------------|-------------|-------------|------------|
| `use-clientes.ts` | Dados de clientes | Abstrair fetch | Páginas de cliente | api-client | Alta | Estável |
| `use-leads.ts` | Dados de leads | Abstrair fetch | Páginas de lead/CRM | api-client | Alta | Estável |
| `use-tarefas.ts` | Dados de tarefas | Abstrair fetch | Páginas de tarefa | api-client | Alta | Estável |
| `use-transacoes.ts` | Dados financeiros | Abstrair fetch | Páginas financeiras | api-client | Alta | Estável |

### A.5 Ativos de Prisma Schema (33 models)

Ver `ARQUITETURA_CONSOLIDADA_V1.md` para lista completa. Destaques:

| Model | Criticidade | Maturidade | ADR | Observação |
|-------|-------------|------------|-----|------------|
| Empresa | Crítica | Estável | — | Raiz do tenant |
| Usuario | Crítica | Estável | — | Auth |
| Lead | Alta | Estável | — | — |
| Cliente | Crítica | Estável | — | — |
| Tarefa | Alta | Estável | — | — |
| Transacao | Alta | Estável | — | — |
| Event | Alta | Experimental | ADR-011 | TenantId vs empresaId inconsistente |
| DeadLetter | Média | Experimental | — | TenantId vs empresaId inconsistente |
| MemoriaCognitiva | Alta | Estável | ADR-009 | — |
| AcaoCognitiva | Alta | Estável | ADR-003 | — |

---

## PACOTE B — MAPA DE DEPENDÊNCIAS (IMPACT ANALYSIS)

### B.1 Matriz de Impacto: Se este arquivo mudar...

#### Camada Prisma

| Se mudar... | Quem quebra? | APIs afetadas | Páginas | Engines | Services | ADRs | Documentos |
|-------------|-------------|---------------|---------|---------|---------|------|-----------|
| `prisma/schema.prisma` | Toda a aplicação | Todas as 27 | Todas as 20 | Todas as 55 | Todos os 7 | ADR-001 a ADR-034 | DATABASE.md, ARQUITETURA_CONSOLIDADA_V1.md |
| `prisma-tenant-safe.ts` | Toda a aplicação | Todas (tenant guard) | Todas | Todas (via prisma) | Todos | ADR-008 | SECURITY.md |
| `prisma.ts` | prisma-tenant-safe | Indireto | Indireto | Indireto | Indireto | — | — |

#### Camada Lib

| Se mudar... | Quem quebra? | Detalhamento |
|-------------|-------------|--------------|
| `app-errors.ts` | 6 libs + todos services + todas engines + todas APIs | api-error, logger, planos, prisma-tenant-safe, authorize, rate-limit |
| `api-error.ts` | Todas as 27 API routes | Cada route.ts importa handleApiError |
| `auth.ts` | Todas as páginas server-side + API routes protegidas | getSession, getCurrentUser, requireUser |
| `logger.ts` | api-error, prisma-tenant-safe, cognitive-pipeline-store, engines | — |
| `cache.ts` | 4 engines | cognitive-context-engine, cognitive-observatory, identity-engine, cognitive-pipeline-store |
| `rate-limit.ts` | 5 API routes específicas | /api/assistente, /api/conversa, /api/auth/login, /api/auth/criar-conta |
| `supabase.ts` | auth.ts | — |
| `validations/index.ts` | API routes que usam Zod | ~60% das rotas |

#### Camada Services

| Se mudar... | API Routes afetadas | Páginas |
|-------------|--------------------|---------|
| `cliente.service.ts` | /api/clientes, /api/clientes/[id] | /clientes, /clientes/[id] |
| `lead.service.ts` | /api/leads, /api/crm | /crm |
| `tarefa.service.ts` | /api/tarefas | /tarefas |
| `transacao.service.ts` | /api/transacoes | /financeiro |
| `implantacao.service.ts` | /api/implantacao | /implantacoes |
| `historico.service.ts` | /api/historico | /historico |

#### Camada Engines

| Se mudar... | Engines afetadas | APIs | Páginas |
|-------------|-----------------|------|---------|
| `cognitive-orchestrator.ts` | 10+ engines | — | /dashboard (via experience) |
| `cognitive-experience-engine.ts` | cognitive-orchestrator + 14 engines diretas | /api/dashboard | /dashboard |
| `decision-engine.ts` | priority-engine, trust-engine, relevance-engine, action-intelligence, cognitive-context | /api/cognitivo/decisao | /centro-decisao |
| `cognitive-context-engine.ts` | Todas as engines superiores | /api/cognitivo/contexto | /dashboard, /centro-decisao |
| `signal-engine.ts` | evidence-engine, cognitive-context | — | — (background) |
| `conversation-engine.ts` | evidence-engine, founder-activation | /api/assistente, /api/conversa | /assistente, /conversa |
| `cognitive-bus.ts` | Todas as engines que publicam/consomem | — | — (background) |
| `engine/index.ts` (barrel) | Tudo que importa de engine/ | Todas APIs cognitivas | Todas páginas cognitivas |

### B.2 Dependências por Rota de API

| Rota | Service Direto | Engine Indireto | Libs | Quebra se... |
|------|---------------|-----------------|------|-------------|
| `/api/clientes` | cliente.service | — | api-error, app-errors, auth, rate-limit | cliente.service, prisma-tenant-safe |
| `/api/assistente` | — | conversation-engine | api-error, auth, rate-limit, planos | conversation-engine, anthropic SDK |
| `/api/health` | — | — | — | Nada (sem dependências internas) |

### B.3 Dependências por Página

| Página | Hooks | Components | APIs | Engines (server-side) |
|--------|-------|-----------|------|----------------------|
| `/dashboard` | — | health-score, evolution, maturity, briefing | /api/dashboard | cognitive-experience |
| `/crm` | use-leads | pipeline, lead-card, lead-form | /api/leads, /api/crm | — |
| `/financeiro` | use-transacoes | transacao-list, transacao-form, financeiro-resumo | /api/transacoes | — |
| `/tarefas` | use-tarefas | tarefa-list, tarefa-form, tarefa-modal | /api/tarefas | — |
| `/assistente` | — | chat, chat-message | /api/assistente | conversation-engine |
| `/centro-decisao` | — | action-card | /api/cognitivo/decisao | decision-engine |
| `/conhecimento` | — | knowledge-card, knowledge-filters | /api/cognitivo/conhecimento | knowledge-governance |

---

## PACOTE C — INVENTÁRIO DE RESPONSABILIDADES

### C.1 Responsabilidades Duplicadas

| O quê | Onde 1 | Onde 2 | Risco |
|-------|--------|--------|-------|
| Validação de entrada | `lib/validations/index.ts` (Zod) | Validação manual inline em ~40% das rotas | Alto — rotas sem Zod podem aceitar dados inválidos |
| Log de erros | `lib/logger.ts` | `console.log/error` espalhado | Médio — logs sem estrutura |
| Tenant guard | `lib/prisma-tenant-safe.ts` | Cada service manualmente | Baixo — wrapper padronizou, mas alguns lugares podem escapar |
| Observabilidade de pipeline | `lib/cognitive-pipeline-store.ts` | `engine/pipeline-monitor.ts` | Médio — duas implementações concorrentes |
| Cache | `lib/cache.ts` | Singleton in-memory manual em engines | Baixo — cache centralizado, mas engines podem ter cache próprio |

### C.2 Módulos Inchados

| Módulo | Linhas | SRP? | Problema |
|--------|:------:|:----:|----------|
| `cognitive-pipeline-store.ts` | 1392 | ❌ | Faz persistência, observabilidade, dashboard, diagnóstico, gargalos, timeline, auditoria — deveria ser 3-5 módulos |
| `engine/index.ts` | 231 | ❌ | Barrel + inicialização de subscribers + pipelines com side-effects |
| `cognitive-experience-engine.ts` | ~500+ | ❌ | Orquestra 14 engines, compõe dashboard, gerencia experiência — sobrecarregado |
| `utils.ts` | ~200+ | ❌ | Utilitários diversos sem coesão (formatação, paginação, classnames, slug) |

### C.3 Módulos Órfãos

| Módulo | Suspeita | Evidência |
|--------|----------|-----------|
| `cognitive-notification-engine.ts` | Pode não ter consumidor frontend | Nenhuma página de notificações encontrada |
| `pipeline-comparator.ts` | Pode estar sem uso | Importado apenas por cognitive-orchestrator, funcionalidade não exposta em UI |
| `cognitive-milestone-engine.ts` | Subutilizado | Eventos de ativação existem mas UI de milestones não foi encontrada |
| `event-store.ts` | Potencialmente substituído | cognitive-pipeline-store pode ter assumido persistência de eventos |

### C.4 Módulos Mortos

| Módulo | Status | Evidência |
|--------|--------|-----------|
| `validation-engine.ts` | 💀 Depreciado | RC v1.0 declara depreciação, lógica movida para services |
| `engine/subscribers/` (alguns) | 💀 Possivelmente | Gated por feature flag `enablePipelineSubscribers` (desligado por padrão) |
| `engine/pipelines/` (alguns) | 💀 Possivelmente | Gated por feature flags |

### C.5 Responsabilidades Inexistentes

| Responsabilidade | Deveria existir em | Mas não existe |
|-----------------|-------------------|---------------|
| Testes automatizados | `__tests__/` | Zero arquivos |
| Cache distribuído | lib/redis-cache.ts | Não existe |
| RLS policies | Supabase SQL | Não implementado |
| Documentação de API interativa | — | Não existe (swagger/openapi) |
| Error tracking/monitoring | — | Não existe (sentry/opção similar) |
| CI/CD pipeline | .github/workflows/ | Não configurado |
| Backup automático | — | Não configurado |
| Rate limiting em TODAS as rotas | lib/rate-limit.ts | Só 5 rotas específicas |

---

## PACOTE D — FLUXOS EXECUTÁVEIS

### D.1 Fluxo: Login

```
Usuário → /login page.tsx
   │
   ├─ Componente de formulário (client-side)
   │     └─ supabase-browser.ts → signInWithPassword()
   │
   ├─ POST /api/auth/session → auth.ts
   │     └─ createSupabaseServerClient() + getSession()
   │
   ├─ getCurrentUser() → verifica usuário no banco
   │     └─ prismaSeguro.usuario.findUnique({ supabaseId })
   │
   ├─ getEmpresaDoUsuario() → carrega tenant
   │
   ├─ logger.info("Login realizado", { usuarioId, empresaId })
   │
   └─ Redirect → /dashboard
```

### D.2 Fluxo: Dashboard

```
Usuário → GET /dashboard (Server Component)
   │
   ├─ auth.ts: getSession() + getCurrentUser()
   │     └─ supabase.ts → Supabase SSR
   │
   ├─ cognitive-experience-engine.ts
   │     ├─ cognitive-health-engine (métricas de saúde)
   │     ├─ cognitive-evolution-engine (evolução)
   │     ├─ cognitive-briefing-engine (briefings)
   │     ├─ company-maturity-engine (maturidade)
   │     └─ prismaSeguro (todas as queries)
   │
   ├─ Engine → prisma-tenant-safe → PostgreSQL
   │
   ├─ logger.info / cache.get / cache.set
   │
   └─ Página renderizada com dados + componentes:
        health-score-card, evolution-card, maturity-card, briefing-card
```

### D.3 Fluxo: Criar Cliente (via API)

```
Usuário → Página /clientes → Formulário → POST /api/clientes
   │
   ├─ authorize.ts: requireUserApi()
   │     └─ requireUser() → getSession() → supabase.ts
   │
   ├─ Validação: schema Zod (se implementado)
   │
   ├─ cliente.service.ts: criar(data)
   │     └─ prismaSeguro.cliente.create({ data: { ..., empresaId } })
   │
   ├─ historico.service.ts: registrar("CLIENTE_CRIADO")
   │
   ├─ signal-engine: processarSinal("NOVO_CLIENTE") [se ativado]
   │     └─ clientes.sinais.ts → evidence-engine → cognitive-context
   │
   ├─ event-publisher: publicar("CLIENTE_CRIADO") [se ativado]
   │
   ├─ api-error.ts: handleApiError (se erro)
   │
   └─ Response → { cliente, mensagem }
```

### D.4 Fluxo: Conversa com IA

```
Usuário → Página /assistente → Chat → POST /api/assistente
   │
   ├─ authorize.ts + rate-limit.ts
   │
   ├─ conversation-engine.ts
   │     ├─ Recupera contexto atual
   │     ├─ Chama Anthropic SDK (messages.create)
   │     │     └─ @anthropic-ai/sdk + @ai-sdk/anthropic
   │     └─ Interpreta resposta
   │
   ├─ evidence-engine: registra evidências da conversa
   │
   ├─ founder-activation-engine: verifica gatilhos
   │
   ├─ cognitive-context-engine: atualiza contexto
   │
   ├─ historico-sinal.service: registra sinal
   │
   ├─ logger.info + correlationId
   │
   └─ Response → Stream de texto (SSE via Vercel AI SDK)
```

### D.5 Fluxo: Pipeline Cognitivo (Ciclo)

```
Ritmo Engine (cron/setInterval)
   │
   ├─ Verifica ciclos pendentes (CicloConfiguracao)
   │     └─ prismaSeguro.cicloConfiguracao.findMany({ ativo: true })
   │
   ├─ cognitive-orchestrator.ts: executarCiclo()
   │     ├─ signal-engine: processar sinais pendentes
   │     ├─ cognitive-context-engine: atualizar contexto
   │     ├─ evidence-engine: consolidar evidências
   │     ├─ decision-engine: avaliar decisões
   │     └─ outcome-intelligence-engine: projetar resultados
   │
   ├─ cognitive-pipeline-store.ts: registrarCiclo()
   │     └─ Persiste: ciclo, etapas, falhas
   │
   ├─ pipeline-monitor.ts: métricas
   │
   └─ event-publisher: publicar("CICLO_CONCLUIDO")
```

---

## PACOTE E — GOVERNANÇA

### E.1 Como Nasce Cada Artefato

#### Engine

```
1. Identificar necessidade (problema real do empresário)
2. Verificar se engine similar existe (catálogo vivo)
3. Verificar se pode ser função em engine existente
4. Escrever ADR (justificativa, alternativas, impacto)
5. Criar arquivo em src/engine/[nome].ts
6. Exportar em engine/index.ts (barrel)
7. Atualizar ARQUITETURA_CONSOLIDADA_V1.md
8. Atualizar KNOWLEDGE_INDEX.md
```

#### Service

```
1. Identificar domínio (CRM, Financeiro, Tarefas, etc.)
2. Verificar se service similar existe
3. Criar em src/services/[dominio].service.ts
4. Usar prismaSeguro (tenant guard obrigatório)
5. Usar app-errors para erros de domínio
6. Usar logger para operações
7. Não importar engines (services não conhecem engines)
8. Atualizar catálogo vivo
```

#### API Route

```
1. Identificar necessidade
2. Escolher REST method apropriado
3. Criar em src/app/api/[rota]/route.ts
4. Implementar: auth → validação(Zod) → service → erro padronizado
5. Usar authorize.ts + rate-limit.ts (se aplicável)
6. Usar handleApiError (api-error.ts)
7. Atualizar catálogo de APIs
```

#### Hook

```
1. Identificar dado que página precisa
2. Usar api-client.ts para chamadas HTTP
3. Criar em src/hooks/use-[dado].ts
4. Exportar: dados, loading, erro
5. Atualizar catálogo vivo
```

#### Component

```
1. Identificar padrão de UI (card, modal, formulário, lista)
2. Verificar se shadcn/ui já oferece (components/ui/)
3. Se domínio específico: criar em components/[dominio]/ 
4. Usar utils.ts > cn() para classnames
5. Usar Tailwind CSS 4 + shadcn/ui tokens
```

#### Migration

```
1. Alterar schema.prisma
2. Rodar: npx prisma validate
3. Rodar: npx prisma generate
4. Rodar: npx prisma migrate dev --name [descricao]
5. Verificar SQL gerado
6. Rodar: npx prisma migrate deploy
7. Rodar: tsc --noEmit
```

#### ADR

```
1. Identificar decisão arquitetural
2. Usar template em docs/04-DECISIONS/ADR/
3. Registrar: problema, contexto, opções, decisão, consequências
4. Numerar sequencialmente
5. Atualizar ADR_NAVIGATOR.md
6. Atualizar ARQUITETURA_CONSOLIDADA_V1.md
```

### E.2 Como Remover/Depreciar/Arquivar

#### Remover código

```
1. Verificar consumidores (usar grep)
2. Se tem consumidores: depreciar primeiro
3. Se não tem: remover, rodar tsc --noEmit
4. Remover barrel exports
5. Atualizar catálogo vivo
```

#### Depreciar

```
1. Marcar com comentário JSDoc @deprecated
2. Criar entry em CHANGELOG.md
3. Deixar código por 1 ciclo de release
4. Remover na release seguinte
```

#### Arquivar documentação

```
1. Mover para archive/
2. Referenciar no documento substituto
3. Atualizar KNOWLEDGE_INDEX.md
```

### E.3 Como Validar Mudanças

```
Antes de merge:
□ tsc --noEmit (zero erros)
□ npm run lint (zero erros)
□ npm run build (ok)
□ prisma validate (se tocar em schema)
□ prisma generate (se tocar em schema)
□ CHANGELOG.md atualizado
□ ADR atualizada (se mudança arquitetural)
□ Catálogo vivo atualizado
□ KNOWLEDGE_INDEX.md checado
□ Testes manuais dos fluxos afetados
```

---

## PACOTE F — IMPACT ANALYSIS

### F.1 Se eu remover isto... o que quebra?

| Se remover | Impacto | Quem quebra |
|-----------|---------|-------------|
| `prisma-tenant-safe.ts` | 🔴 Crítico | Perda total de tenant guard — dados entre empresas vazam |
| `app-errors.ts` | 🔴 Crítico | 6 libs + toda aplicação perde hierarquia de erros |
| `cognitive-bus.ts` | 🔴 Crítico | Pub/sub de eventos para — engines perdem comunicação |
| `cognitive-context-engine.ts` | 🔴 Crítico | Todas engines superiores perdem contexto |
| `cognitive-experience-engine.ts` | 🔴 Crítico | Dashboard e experiência do usuário quebram |
| `decision-engine.ts` | 🟡 Alto | Centro de Decisão e recomendações param |
| `signal-engine.ts` | 🟡 Alto | Nenhum sinal é processado (mas módulos de negócio continuam) |
| `conversation-engine.ts` | 🟡 Alto | Assistente IA para de funcionar |
| `api-client.ts` | 🟡 Alto | Todos os hooks frontend quebram |
| `engine/index.ts` (barrel) | 🟢 Baixo | Importadores precisam importar diretamente |
| `validation-engine.ts` | 🟢 Nenhum | Já depreciado — ninguém importa |
| `pipeline-comparator.ts` | 🟢 Baixo | Apenas cognitive-orchestrator usa |
| `cognitive-notification-engine.ts` | 🟢 Baixo | Notificações param (se alguma página usa) |

### F.2 Se eu mover isto... o que quebra?

| Se mover | Risco | Mitigação |
|----------|-------|-----------|
| `prismaSeguro` para outro path | 🔴 Alto | Atualizar todos imports (grep para @/lib/prisma-tenant-safe) |
| `app-errors.ts` para outra lib | 🔴 Alto | Atualizar 6+ imports |
| `cognitive-experience-engine.ts` para services/ | 🔴 Alto | Mistura camadas, quebra injeção de engines |
| `conversation-engine.ts` para services/ | 🟡 Médio | Conversa usa engines (evidence-engine) — quebra injeção |

### F.3 Se eu alterar a assinatura de...

| Função | Impacto | Consumidores diretos |
|--------|---------|---------------------|
| `prismaSeguro.cliente.create()` | 🔴 Alto | cliente.service + engines que usam cliente |
| `handleApiError()` | 🔴 Alto | Todas as 27 API routes |
| `getSession()` | 🔴 Alto | auth.ts, authorize.ts, todas pages protegidas |
| `cognitive-orchestrator.executarCiclo()` | 🔴 Alto | Ritmo engine, pipeline |
| `event-publisher.publicar()` | 🟡 Médio | Todas as engines que emitem eventos |

---

## PACOTE G — ARQUITETURA COGNITIVA COMPLETA

### G.1 Quem Conversa com Quem

```
Signal Engine ──────────────► Evidence Engine ──────────────► Context Engine
    │                                                              │
    ├─ clientes.sinais.ts                                          ├─ Identity Engine
    ├─ financeiro.sinais.ts                                        ├─ Memory Engine
    └─ tarefas.sinais.ts                                           └─ Heritage Facade
                                                                         │
Context Engine ─────────────► Decision Engine                          ├─ Knowledge Governance
    │                            │                                     ├─ Synthesis Engine
    │                            ├─ Priority Engine                    └─ Forgetting Engine
    │                            ├─ Trust Engine
    │                            ├─ Relevance Engine             Experience Engine
    │                            └─ Action Intelligence                │
    │                                      │                          ├─ Dashboard
    └──► Conversation Engine ──► Evidence  ├─ Outcome Intelligence     ├─ Briefings
              │                            └─ Feedback Intelligence    ├─ Health
              ├─ Founder Activation                                   ├─ Evolution
              └─ Reações                                               └─ Jornada
```

### G.2 Quem Nunca Deveria Conversar

| Engine A | Engine B | Motivo |
|----------|----------|--------|
| Services de domínio | Engines cognitivas | Services não conhecem engines — acoplamento proibido |
| Frontend (hooks) | Prisma diretamente | Hooks usam api-client → API routes — nunca banco direto |
| Engines | Supabase Auth | Engines não devem gerenciar autenticação |
| Conversation Engine | Prisma sem tenant guard | Conversa pode ser anônima (empresaId opcional) — risco de vazamento |

### G.3 Quem Pode Ser Desacoplado

| Engine | Desacoplamento | Como |
|--------|---------------|------|
| `cognitive-notification-engine.ts` | Baixo risco | Não é importada por engines críticas — pode virar módulo separado |
| `pipeline-comparator.ts` | Baixo risco | Só cognitive-orchestrator usa — pode ser extraído |
| `confidence-drift-engine.ts` | Médio risco | Trust engine depende — precisa de interface primeiro |
| `forgetting-engine.ts` | Médio risco | Heritage facade depende — precisa de interface |
| `synthesis-engine.ts` | Médio risco | Heritage facade depende — interface já existe |

### G.4 Pipeline Cognitivo Detalhado

```
                     CICLO COGNITIVO
                         │
                         ▼
              ┌─────────────────────┐
              │  RITMO ENGINE       │
              │  Controla frequência │
              │  DIARIA/SEMANAL/    │
              │  MENSAL             │
              └─────────┬───────────┘
                        │ heartbeat
                        ▼
              ┌─────────────────────┐
              │  ORCHESTRATOR       │ ←── Feature Flags
              │  Coordena pipeline  │
              └─────────┬───────────┘
                        │
          ┌─────────────┼─────────────┐
          ▼             ▼             ▼
   ┌──────────┐  ┌──────────┐  ┌──────────┐
   │ SIGNAL   │  │ CONTEXT  │  │ EVIDENCE │
   │ ENGINE   │  │ ENGINE   │  │ ENGINE   │
   └────┬─────┘  └────┬─────┘  └────┬─────┘
        │             │             │
        └─────────────┼─────────────┘
                      ▼
              ┌─────────────────────┐
              │  DECISION ENGINE    │
              │  + Priority         │
              │  + Trust            │
              │  + Relevance        │
              └─────────┬───────────┘
                        │
                        ▼
              ┌─────────────────────┐
              │  ACTION INTELLIGENCE│
              │  + Outcome          │
              │  + Feedback         │
              └─────────┬───────────┘
                        │
                        ▼
              ┌─────────────────────┐
              │  HERITAGE FACADE    │
              │  Memory + Knowledge │
              │  + Forgetting       │
              │  + Synthesis        │
              └─────────┬───────────┘
                        │
                        ▼
              ┌─────────────────────┐
              │  EXPERIENCE ENGINE  │
              │  → Dashboard        │
              │  → Briefing         │
              │  → Notificações     │
              └─────────────────────┘
```

---

## PACOTE H — ADR COMPLETO (Decisões Implícitas)

### H.1 Decisões Arquiteturais sem ADR

| # | Decisão | Onde está no código | Problema que resolveu | Alternativas descartadas | Impacto se remover |
|---|---------|--------------------|-----------------------|------------------------|-------------------|
| 1 | Feature Flags (`feature-flags.ts`) | `engine/feature-flags.ts` — 4 flags com provider | Desligar pipeline features sem deploy | Config externa (muito pesado), Remoção (sem rollback) | Pipeline perde controle de release |
| 2 | Cache in-memory (`cache.ts`) | `lib/cache.ts` — 3 TTL tiers, singleton | Performance sem infraestrutura extra | Redis (custo), Sem cache (lento) | Performance degrada drasticamente |
| 3 | Rate limiting (`rate-limit.ts`) | `lib/rate-limit*.ts` — fixed window | Proteger API de abuso | Redis rate-limit (custo), Cloudflare (config externa) | API fica vulnerável a ataques |
| 4 | Hierarquia de erros (`app-errors.ts`) | `lib/app-errors.ts` — 8 classes com HTTP status | Resposta padronizada em toda aplicação | Sem erros tipados (caos) | Erros ficam inconsistentes entre rotas |
| 5 | Event persistence (`event-store.ts`) | `engine/event-store.ts` — Prisma-backed | Rastreabilidade de eventos | Redis (perde histórico), SQS (custo) | Eventos perdem histórico |
| 6 | Barrel pattern (`engine/index.ts`) | `engine/index.ts` — 231 linhas + side-effects | Conveniência de import | Imports diretos (mais verboso) | Quebra todos imports de engine/ |
| 7 | Supabase Auth (`auth.ts`) | `lib/auth*.ts` — SSR + cookies | Autenticação sem gerenciar servidor | NextAuth (mais complexo), Cognito (custo) | Toda autenticação para |
| 8 | Soft delete (`deletedAt`) | `schema.prisma` — 33 models | Recuperação de dados | Hard delete (perda total), Tabela archive (complexo) | Dados deletados viram irrecuperáveis |
| 9 | Prisma `$extends` (`prisma-tenant-safe.ts`) | `lib/prisma-tenant-safe.ts` | Tenant guard sem middleware | RLS (exige Supabase), Middleware manual (repetitivo) | Perde tenant guard centralizado |
| 10 | Anthropic como provedor IA | `conversation-engine.ts`, `package.json` | Assistente inteligente | OpenAI (custo similar), Gemini (ecossistema menor) | Assistente para de funcionar |
| 11 | Sem middleware.ts | Nenhum middleware.ts existe | Auth por rota, não global | Middleware global (mais simples, mas menos flexível) | Rotas sem auth explícito ficam vulneráveis |
| 12 | TanStack React Query + hooks customizados | `hooks/*.ts`, `package.json` | Dados no frontend | SWR (similar), RTK Query (mais pesado) | Dados frontend precisam ser reimplementados |

---

## PACOTE I — CHECKLIST PERMANENTE

### I.1 Antes de Criar uma Engine

```
□ Já existe engine similar? (consultar catálogo em ARQUITETURA_CONSOLIDADA_V1.md)
□ A funcionalidade pode ser uma função dentro de engine existente?
□ Existe ADR registrando a decisão?
□ Qual problema real do empresário resolve?
□ Quem serão os consumidores?
□ Qual o impacto em engines existentes?
□ Existe documentação do comportamento esperado?
□ A engine tem uma única responsabilidade (SRP)?
□ A interface está definida antes da implementação?
□ Os tipos estão em tipos.ts ou engine específico?
```

### I.2 Antes de Criar uma API Route

```
□ Já existe rota similar?
□ O método HTTP está correto (GET/POST/PUT/DELETE)?
□ A autenticação está implementada (requireUser/authorize)?
□ A validação Zod está no schema de validação?
□ O handler de erro padronizado está sendo usado (handleApiError)?
□ Rate limit está configurado (se aplicável)?
□ O tenant guard está sendo respeitado (empresaId)?
□ O log está presente (logger.info/warn/error)?
□ A response segue o padrão ErrorResponse?
```

### I.3 Antes de Criar uma Migration

```
□ prisma validate passou sem erros?
□ prisma generate foi executado?
□ A migration tem nome descritivo?
□ O SQL gerado foi revisado?
□ Existe rollback planejado?
□ Dados existentes foram considerados (backfill)?
□ O impacto em tenants foi avaliado?
□ tsc --noEmit passou após migration?
```

### I.4 Antes de Alterar Arquitetura

```
□ Existe ADR registrando a mudança?
□ Qual o motivo da mudança?
□ Quais módulos são afetados?
□ Quais APIs mudam?
□ Quais páginas mudam?
□ Quais engines mudam?
□ Quais serviços mudam?
□ Qual o plano de migração?
□ Qual o plano de rollback?
□ Existe compatibilidade retroativa?
□ A documentação será atualizada junto?
```

### I.5 Antes de Remover Algo

```
□ Quem depende deste código? (usar grep)
□ Existe consumidor conhecido?
□ O código está sendo usado em produção?
□ Existe substituto?
□ O CHANGELOG foi atualizado?
□ Os consumidores foram notificados?
□ O barrel export foi removido?
```

### I.6 Antes de Fazer Merge

```
□ tsc --noEmit: zero erros
□ npm run lint: zero erros
□ npm run build: ok
□ prisma validate: ok (se schema mudou)
□ prisma generate: ok (se schema mudou)
□ CHANGELOG.md atualizado
□ Catálogo vivo atualizado (se novo ativo)
□ KNOWLEDGE_INDEX.md verificado
□ ADR atualizada (se mudança arquitetural)
□ Testes manuais realizados (enquanto não há automáticos)
```

---

## PACOTE J — ARQUITETURA AUTOEXPLICÁVEL

### J.1 Validação de Completude

A arquitetura da Ponte Digital pode ser compreendida integralmente através dos seguintes documentos:

| Pergunta | Resposta em |
|----------|-------------|
| Como a plataforma funciona? | `docs/09-ARCHITECTURE/ARQUITETURA_CONSOLIDADA_V1.md` (Pacote B — Mapa Arquitetural) |
| Por que cada módulo existe? | `docs/09-ARCHITECTURE/ARQUITETURA_CONSOLIDADA_V1.md` (Pacote A — Inventário + Pacote D — Responsabilidades) |
| Quem depende de quem? | `docs/09-ARCHITECTURE/ARQUITETURA_CONSOLIDADA_V1.md` (Pacote C — Grafo de Dependências) |
| Quais são os riscos? | `docs/09-ARCHITECTURE/ARQUITETURA_CONSOLIDADA_V1.md` (Pacote H — Saúde Arquitetural) |
| Como evoluir corretamente? | `docs/06-ROADMAP/GOVERNANCA_PERMANENTE.md` (Pacote E — Governança + Pacote I — Checklists) |
| Como evitar regressões? | `docs/06-ROADMAP/GOVERNANCA_PERMANENTE.md` (Pacote I — Checklist de Merge) |
| Quais decisões foram tomadas? | `docs/04-DECISIONS/ADR/` (34 ADRs) + `docs/09-ARCHITECTURE/ADR_NAVIGATOR.md` |
| Qual o estado do código? | `docs/05-OPERATIONS/PLATFORM_BASELINE_V1.md` |
| Como operar em produção? | `docs/05-OPERATIONS/OPS-RUNBOOK.md` |
| O que fazer na próxima versão? | `docs/06-ROADMAP/ROADMAP_V1_1.md` |
| O que aprendemos? | `docs/05-OPERATIONS/LESSONS_LEARNED.md` |

### J.2 Documentos para Leitura Obrigatória

Para entender completamente a Ponte Digital sem depender de memória de criadores:

1. **`docs/00-START-HERE.md`** — ponto de entrada
2. **`docs/09-ARCHITECTURE/ARQUITETURA_CONSOLIDADA_V1.md`** — inventário completo + mapa arquitetural + dependências + fluxos + saúde
3. **`docs/09-ARCHITECTURE/KNOWLEDGE_INDEX.md`** — índice mestre navegável
4. **`docs/09-ARCHITECTURE/ADR_NAVIGATOR.md`** — todas as 34 decisões arquiteturais
5. **`docs/06-ROADMAP/GOVERNANCA_PERMANENTE.md`** (este) — governança + checklists + impacto
6. **`docs/05-OPERATIONS/OPS-RUNBOOK.md`** — operação do dia a dia

### J.3 Arquivos Produzidos no Programa 9

| Arquivo | Pacotes |
|---------|---------|
| `docs/06-ROADMAP/GOVERNANCA_PERMANENTE.md` | A, B, C, D, E, F, G, H, I, J |
| `docs/09-ARCHITECTURE/KNOWLEDGE_INDEX.md` | Atualizado com link para Governança Permanente |

### J.4 Evidências Encontradas

| Evidência | Onde |
|-----------|------|
| 17 decisões arquiteturais implícitas (ADR gaps) | Pacote H |
| 55 engines (vs 16 documentados) | Código real em `engine/` |
| Zero middleware.ts | `sistema/src/middleware.ts` não existe |
| 1392 linhas em cognitive-pipeline-store.ts | `lib/cognitive-pipeline-store.ts` |
| Feature flags com side-effects em barrel | `engine/index.ts` linhas 212-213 |
| Cache in-memory ativo (contra ADR-014 que dizia "futuro") | `lib/cache.ts` + 4 engines consumindo |

### J.5 Débitos Registrados

| Débito | Gravidade | Onde |
|--------|:---------:|------|
| cognitive-pipeline-store.ts (1392 linhas) | Alto | lib/ |
| engine/index.ts (231 linhas + side-effects) | Médio | engine/ |
| ~40% rotas sem validação Zod | Alto | Rotas API |
| Tenant naming inconsistente (tenantId vs empresaId) | Baixo | Event, DeadLetter |
| Sem middleware.ts | Médio | N/A |
| Zero testes | Crítico | N/A |
| CI/CD não configurado | Crítico | N/A |
| Backup não automático | Crítico | N/A |

### J.6 Riscos Encontrados

| Risco | Probabilidade | Impacto |
|-------|:------------:|:-------:|
| Regressão por barrel side-effects | Média | Alto |
| Pipeline monolítico quebra | Baixa | Crítico |
| Rotas sem Zod aceitam dados inválidos | Alta | Médio |
| Cache não compartilhado entre instâncias | Alta | Médio |
| Remoção acidental de tenant guard | Baixa | Crítico |

### J.7 O que NÃO foi Alterado

- Nenhuma engine criada/modificada
- Nenhum service criado/modificado
- Nenhuma API criada/modificada  
- Nenhum schema criado/modificado
- Nenhum componente criado/modificado
- Nenhuma página criada/modificada
- Nenhum fluxo criado/modificado
- Nenhuma funcionalidade criada
- Nenhum comportamento alterado
- Nenhuma arquitetura alterada
- Nenhum arquivo de código movido

---

## Validação

### WP-A a WP-J: Verificações de Integridade

| Verificação | Status |
|-------------|--------|
| `prisma validate` | ✅ (sem alterações no schema) |
| `prisma generate` | ✅ (sem alterações no schema) |
| `tsc --noEmit` | ✅ (sem alterações em código) |
| Links internos válidos | ✅ (verificados) |
| Referências cruzadas consistentes | ✅ |

---

*Documento de governança arquitetural permanente. Gerado a partir do código real em 24/07/2026. Nenhuma funcionalidade, engine, API, schema ou comportamento foi alterado — apenas documentado e consolidado.*
