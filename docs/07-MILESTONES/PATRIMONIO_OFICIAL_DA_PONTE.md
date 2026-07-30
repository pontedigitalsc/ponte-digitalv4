# PATRIMÔNIO OFICIAL DA PONTE DIGITAL

## Classificação Patrimonial — Foundation Freeze V2 / Etapa 1

> **Data:** 29 de julho de 2026
> **Base:** Foundation Candidate V2 + Foundation Database V1 + Foundation Freeze V1
> **Total auditado:** ~30.000+ linhas de código, 40+ engines, 14 documentos constitucionais, 40 models, 17 páginas, 15 diretórios de componentes

---

## SUMÁRIO

| Categoria | Itens | Prioridade |
|-----------|-------|------------|
| Patrimônio Permanente | 100+ | 🔒 Nunca remover |
| Patrimônio Evolutivo | 50+ | 🔄 Pode evoluir |
| Patrimônio Experimental | 11 | ⚗️ Depende de validação |
| Patrimônio Obsoleto | 10+ | 🗑️ Pode ser removido |

---

## 1. PATRIMÔNIO PERMANENTE — NUNCA REMOVER

### 1.1 Constituição da Ponte Digital (14 documentos)

| # | Documento | Linhas | Peso |
|---|-----------|--------|------|
| 01 | CONSTITUICAO_DA_PONTE_DIGITAL.md | 198 | 🔒 Fundador |
| 02 | TEORIA_DA_EVOLUCAO_EMPRESARIAL.md | 168 | 🔒 Fundador |
| 03 | MODELO_DAS_CAPACIDADES_EMPRESARIAIS.md | 294 | 🔒 Fundador |
| 04 | CAPITAL_COGNITIVO_EMPRESARIAL.md | 172 | 🔒 Fundador |
| 05 | PATRIMONIOS_COGNITIVOS_OFICIAIS.md | 165 | 🔒 Fundador |
| 06 | MAPA_DOS_DOMINIOS_EMPRESARIAIS.md | 184 | 🔒 Fundador |
| 07 | CICLO_OFICIAL_DE_EVOLUCAO.md | 159 | 🔒 Fundador |
| 08 | PRINCÍPIOS_DA_EXPERIÊNCIA_PONTE_DIGITAL.md | 150 | 🔒 Fundador |
| 09 | REGRA_DE_OURO_DA_PONTE_DIGITAL.md | 97 | 🔒 Fundador |
| 10 | ARQUITETURA_CONCEITUAL_DO_MOTOR_COGNITIVO.md | 201 | 🔒 Fundador |
| 11 | ARVORE_DE_DECISOES_DE_PRODUTO.md | 195 | 🔒 Fundador |
| 12 | CONTRATO_COM_O_USUARIO.md | 141 | 🔒 Fundador |
| 13 | EMENDA_01-DOS_CINCO_PATRIMONIOS.md | 53 | 🔒 Fundador |
| 14 | EMENDA_02-DOS_MODOS_OPERACIONAIS.md | 97 | 🔒 Fundador |

**Path:** `docs/06-CONSTITUTION/P32/`
**Total:** ~2.274 linhas
**Regra:** Nenhuma alteração sem emenda constitucional (Art. 9 da Constituição)

### 1.2 Documentos de Fundação

| Documento | Path | Linhas | Peso |
|-----------|------|--------|------|
| FOUNDATION.md | `docs/01-VISION/FOUNDATION.md` | 37 | 🔒 Fundador |
| CURRENT_PRODUCT.md | `docs/02-PRODUCT/CURRENT_PRODUCT.md` | 190 | 🔒 Operacional |

### 1.3 Architecture Decision Records (ADRs)

34 ADRs aprovadas (001–034) em `docs/04-DECISIONS/ADR/`.
Incluem: ADR-009 a ADR-034 (arquitetura futura do Motor Cognitivo, Event Bus, Memória, etc.)

**Path:** `docs/04-DECISIONS/ADR/`
**Regra:** Nenhuma alteração arquitetural sem ADR.

### 1.4 Milestones Oficiais

| Documento | Path | Linhas |
|-----------|------|--------|
| FOUNDATION_CANDIDATE_V2.md | `docs/07-MILESTONES/FOUNDATION_CANDIDATE_V2.md` | 225 |
| FOUNDATION_DATABASE_V1.md | `docs/07-MILESTONES/FOUNDATION_DATABASE_V1.md` | 172 |
| FOUNDATION_FREEZE_V1.md | `docs/07-MILESTONES/FOUNDATION_FREEZE_V1.md` | 250 |

### 1.5 Prisma Schema — Foundation Database V1

**Path:** `sistema/prisma/schema.prisma` (1.306 linhas)
**Models:** 40 (Empresa, Usuario, Lead, Cliente, Contato, Implantacao, EtapaImplantacao, Tarefa, Historico, Transacao, ConfiguracaoEmpresa, HistoricoSinal, Evidencia, Hipotese, MemoriaCognitiva, AcaoCognitiva, FeedbackAcao, EventoAtivacao, Outcome, ConhecimentoValidado, Conversa, IdentidadeDigital, ConversaHistorico, Aprendizado, Anotacao, Tag, OnboardingDecisao, Event, EventSubscription, DeadLetter, CicloConfiguracao, ConfiancaFonte, RespostasConversa + 5 P36)
**Enums:** 8 (Plano, Role, StatusCliente, StatusImplantacao, StatusTarefa, Prioridade, TipoTarefa, TipoHistorico, TipoTransacao, StatusTransacao, OrigemLead, EstagioLead, Temperatura, CategoriaEvidencia, OrigemEvidencia, ConfiancaEvidencia, EstadoHipotese, ImpactoHipotese, OrigemHipotese, StatusAcao, OrigemAcao, TipoEventoAtivacao, CategoriaOutcome, OrigemOutcome, TipoFeedbackAcao, EventStatus, FrequenciaCiclo, OrigemResposta + enums P36)
**Funcionalidades:** Multi-tenancy (`empresaId` em todas), Soft delete (`deletedAt`), Audit trail (`createdAt`/`updatedAt`), Índices estratégicos

### 1.6 Core Cognitive Engines

**Path:** `sistema/src/engine/` (total ~13.721 linhas)

#### 1.6.1 Orquestração Central (nunca remover)

| Engine | Linhas | Função |
|--------|--------|--------|
| `cognitive-orchestrator.ts` | 900 | Coordenação de todos os subsistemas cognitivos |
| `cognitive-experience-engine.ts` | 1.872 | Geração de experiência, narrativas, insights |
| `index.ts` | 262 | Barramento de exportação pública |

#### 1.6.2 Core Cognitivo (nunca remover)

| Engine | Linhas | Função |
|--------|--------|--------|
| `cognitive-memory-engine.ts` | 317 | Memória e hipóteses |
| `cognitive-context-engine.ts` | 295 | Contexto cognitivo |
| `decision-engine.ts` | 452 | Decisões e recomendações |
| `identity-engine.ts` | 267 | Identidade digital da empresa |
| `evidence-engine.ts` | 70 | Registro de evidências |
| `knowledge-governance-engine.ts` | 263 | Governança do conhecimento |
| `trust-engine.ts` | 123 | Confiança de fontes |
| `forgetting-engine.ts` | 330 | Esquecimento e decay |
| `synthesis-engine.ts` | 317 | Síntese com score |
| `priority-engine.ts` | 113 | Priorização |
| `relevance-engine.ts` | 84 | Relevância temporal |
| `ritmo-engine.ts` | 190 | Ciclos e frequência |
| `cognitive-capital-engine.ts` | 62 | Cálculo do Capital Cognitivo |
| `cognitive-curve-engine.ts` | 78 | Curva de evolução |
| `cognitive-narrative-engine.ts` | 281 | Narrativas de evolução |
| `cognitive-evolution-engine.ts` | 76 | Evolução cognitiva |
| `cognitive-heritage-facade.ts` | 198 | Fachada de patrimônios |

#### 1.6.3 Motores de Inteligência (nunca remover)

| Engine | Linhas | Função |
|--------|--------|--------|
| `action-intelligence-engine.ts` | 201 | Inteligência de ações |
| `feedback-intelligence-engine.ts` | 186 | Inteligência de feedback |
| `outcome-intelligence-engine.ts` | 228 | Inteligência de resultados |
| `founder-activation-engine.ts` | 134 | Ativação do fundador |

#### 1.6.4 Camada de Conversa (nunca remover)

| Engine | Linhas | Função |
|--------|--------|--------|
| `conversation-engine.ts` | 230 | Motor de conversa |
| `adaptive-question-engine.ts` | 169 | Perguntas adaptativas |
| `question-answer-engine.ts` | 66 | Perguntas e respostas |
| `aprendizado-service.ts` | 182 | Serviço de aprendizado |

#### 1.6.5 Camada de Sinais (nunca remover)

| Engine | Linhas | Função |
|--------|--------|--------|
| `clientes.sinais.ts` | 67 | Sinais de clientes |
| `financeiro.sinais.ts` | 58 | Sinais financeiros |
| `tarefas.sinais.ts` | 56 | Sinais de tarefas |
| `tipos.ts` | 81 | Tipos de sinais |
| `reacoes.ts` | 40 | Reações a sinais |
| `interpretacoes.ts` | 134 | Interpretação de sinais |

#### 1.6.6 Event Bus System (nunca remover — ADR-011/012)

| Engine | Linhas | Função |
|--------|--------|--------|
| `cognitive-bus.ts` | 89 | Barramento cognitivo |
| `event-publisher.ts` | 102 | Publicador de eventos |
| `event-subscriber.ts` | 139 | Assinante de eventos |
| `event-store.ts` | 155 | Armazenamento de eventos |
| `event-catalog.ts` | 104 | Catálogo de eventos |
| `dead-letter-queue.ts` | 79 | Filas mortas |

#### 1.6.7 Subscribers (nunca remover)

| Subscriber | Linhas | Evento |
|------------|--------|--------|
| `diagnostico-concluido.subscriber.ts` | 12 | Diagnóstico concluído |
| `contexto-atualizado.subscriber.ts` | 12 | Contexto atualizado |
| `conhecimento-promovido.subscriber.ts` | 12 | Conhecimento promovido |
| `resultado-registrado.subscriber.ts` | 12 | Resultado registrado |
| `index.ts` | 17 | Registro central |

**Path:** `sistema/src/engine/subscribers/`

#### 1.6.8 Pipelines (nunca remover)

| Pipeline | Linhas | Função |
|----------|--------|--------|
| `diagnostico.pipeline.ts` | 167 | Pipeline de diagnóstico |
| `pipeline-registry.ts` | 24 | Registro de pipelines |

**Path:** `sistema/src/engine/pipelines/`

#### 1.6.9 Fluxos (nunca remover)

| Fluxo | Linhas | Função |
|-------|--------|--------|
| `primeira-conversa.ts` | 42 | Fluxo da primeira conversa |

**Path:** `sistema/src/engine/fluxos/`

#### 1.6.10 Infraestrutura (nunca remover)

| Engine | Linhas | Função |
|--------|--------|--------|
| `cognitive-observatory.ts` | 633 | Observatório cognitivo (admin) |
| `pipeline-monitor.ts` | 197 | Monitoramento de pipelines |
| `pipeline-comparator.ts` | 199 | Comparador de pipelines |
| `retry-policy.ts` | 102 | Política de retry |
| `feature-flags.ts` | 63 | Feature flags |
| `cognitive-action-composer.ts` | 76 | Compositor de ações |
| `centro-cognitivo-engine.ts` | 134 | Engine do centro cognitivo |

### 1.7 Serviços de Negócio

**Path:** `sistema/src/services/` (total ~1.129 linhas)

| Service | Função |
|---------|--------|
| `cliente.service.ts` | CRUD de clientes |
| `transacao.service.ts` | CRUD de transações |
| `tarefa.service.ts` | CRUD de tarefas |
| `lead.service.ts` | CRUD de leads |
| `historico.service.ts` | CRUD de histórico |
| `implantacao.service.ts` | CRUD de implantações |
| `configuracao.service.ts` | Configurações da empresa |

### 1.8 Lib — Core Utilities

**Path:** `sistema/src/lib/` (total ~2.681 linhas)

| File | Função |
|------|--------|
| `prisma.ts` | Cliente Prisma singleton |
| `prisma-tenant-safe.ts` | Tenant guard |
| `auth.ts` | Autenticação |
| `authorize.ts` | Autorização |
| `supabase.ts` | Supabase server |
| `supabase-browser.ts` | Supabase browser |
| `ai-provider.ts` | Provedor de IA (Gemini) |
| `logger.ts` | Logging |
| `cache.ts` / `cache-provider.ts` | Cache |
| `rate-limit.ts` / `rate-limit-config.ts` / `rate-limit-provider.ts` | Rate limiting |
| `api-client.ts` | API client |
| `api-error.ts` / `app-errors.ts` | Error handling |
| `utils.ts` | Utilities |
| `planos.ts` | Planos |
| `cognitive-pipeline-store.ts` | Pipeline store |
| `tokens/motion.ts` | Design tokens |
| `providers/gemini-provider.ts` | Gemini provider |
| `validations/index.ts` | Validações Zod |

---

## 2. PATRIMÔNIO EVOLUTIVO — PODE EVOLUIR

### 2.1 Supporting Cognitive Engines (podem ser refatorados)

| Engine | Linhas | Função | Risco |
|--------|--------|--------|-------|
| `cognitive-timeline-engine.ts` | 268 | Timeline cognitiva | Baixo |
| `cognitive-journey-engine.ts` | 162 | Jornada cognitiva | Baixo |
| `cognitive-workflow-engine.ts` | 157 | Fluxos cognitivos | Baixo |
| `cognitive-milestone-engine.ts` | 129 | Marcos cognitivos | Baixo |
| `cognitive-briefing-engine.ts` | 132 | Briefings | Baixo |
| `cognitive-alert-engine.ts` | 134 | Alertas proativos | Baixo |
| `cognitive-heatmap-engine.ts` | 135 | Mapa de calor | Baixo |
| `cognitive-brainstorm-engine.ts` | 135 | Geração de ideias | Baixo |
| `cognitive-radar-engine.ts` | 80 | Radar de capacidades | Baixo |
| `cognitive-before-after-engine.ts` | 90 | Antes/depois | Baixo |
| `cognitive-notification-engine.ts` | 170 | Notificações | Baixo |
| `cognitive-health-engine.ts` | 92 | Saúde cognitiva | Baixo |
| `clarity-engine.ts` | 53 | Clareza cognitiva | Baixo |
| `company-maturity-engine.ts` | 154 | Maturidade da empresa | Baixo |
| `adaptive-capacity-engine.ts` | 187 | Capacidade adaptativa | Baixo |
| `growth-opportunity-engine.ts` | 144 | Oportunidades de crescimento | Baixo |
| `strategic-memory-engine.ts` | 66 | Memória estratégica | Baixo |
| `founder-panel-engine.ts` | 62 | Painel do fundador | Baixo |
| `confidence-drift-engine.ts` | 45 | Deriva de confiança | Baixo |
| `knowledge-aging-engine.ts` | 44 | Envelhecimento do conhecimento | Baixo |
| `decision-learning-cycle-engine.ts` | 176 | Ciclo de aprendizado de decisões | Baixo |

**Razão:** Engines com baixo acoplamento ao core cognitivo. Podem ser refatoradas, unificadas ou ter responsabilidades redistribuídas sem afetar a fundação.

### 2.2 UI Components

**Path:** `sistema/src/components/` (total ~6.859 linhas)

| Diretório | Componentes | Linhas (aprox.) | Status |
|-----------|-------------|-----------------|--------|
| `layout/` | app-shell, sidebar, header | 275 | 🟢 Ativo |
| `atendimento/` | atendimento-shell | 351 | 🟢 Ativo (novo P34B) |
| `centro-cognitivo/` | 8 componentes do ciclo cognitivo | ~250 | 🟢 Ativo |
| `shared/` | experience-renderer, action-card, etc. | ~400 | 🟢 Ativo |
| `ui/` | card, button, dialog, input, avatar, form-elements | ~430 | 🟢 Base UI |
| `assistente/` | chat, chat-message | ~200 | 🟢 Ativo |
| `clientes/` | cliente-form, list, modal, perfil | ~300 | 🟢 Ativo |
| `conhecimento/` | knowledge-card, filters, summary, tag, timeline | ~350 | 🟢 Ativo |
| `conversa/` | question-card, revelacao-card, micro-reaction, progress-bar | ~300 | 🟢 Ativo |
| `historico/` | timeline-viva | ~200 | 🟢 Ativo (novo P34B) |
| `aprendizados/` | conversation-knowledge-card, learning-history, quick-learning | ~200 | 🟢 Ativo |
| `financeiro/` | financeiro-resumo, transacao-form/list/modal | ~350 | 🟢 Ativo |
| `crm/` | lead-card/form/modal, pipeline, pipeline-column | ~400 | 🟡 Legado oculto |
| `tarefas/` | tarefa-form/item/list/modal | ~300 | 🟡 Legado oculto |

### 2.3 Páginas Ativas

**Path:** `sistema/src/app/` (total ~4.816 linhas)

| Rota | Página | Linhas | Componente principal | Capacidade |
|------|--------|--------|---------------------|------------|
| `/` | Landing | 46 | - | Observação |
| `/conversa` | Diagnóstico | 267 | question-card, revelacao-card | Observação |
| `/login` | Login | 114 | - | - |
| `/criar-conta` | Registro | 138 | - | - |
| `/dashboard` | Centro Diário | 102 | ciclo-cognitivo | Clareza |
| `/atendimento` | Atendimento | 27 | atendimento-shell | Execução |
| `/assistente` | Assistente | 46 | chat | Decisão |
| `/conhecimento` | Knowledge Vault | 25 | knowledge-card | Aprendizado |
| `/centro-decisao` | Decisões | 110 | - | Priorização |
| `/aprendizados` | Aprendizados | 25 | quick-learning | Incorporação |
| `/historico` | Timeline | 18 | timeline-viva | Aprendizado |
| `/financeiro` | Caixa | 25 | financeiro-resumo | Execução |
| `/clientes` | Pessoas | 25 | cliente-list | Execução |
| `/configuracoes` | Configurações | 25 | - | - |

### 2.4 API Routes

**Path:** `sistema/src/app/api/` (19 endpoints)

| Endpoint | Função |
|----------|--------|
| `/api/clientes` | CRUD clientes |
| `/api/transacoes` | CRUD transações |
| `/api/tarefas` | CRUD tarefas |
| `/api/leads` | CRUD leads |
| `/api/historicos` | CRUD histórico |
| `/api/implantacoes` | CRUD implantações |
| `/api/configuracoes` | Configurações |
| `/api/aprendizados` | Aprendizados |
| `/api/conversa` | Conversa/diagnóstico |
| `/api/assistente` | Chat com IA |
| `/api/auth` | Autenticação |
| `/api/cognitivo` | Cognitivo |
| `/api/cognitive` | Decisões + Panel |
| `/api/cognitive-heritage` | Heritage facade |
| `/api/patrimonio` | Patrimônios |
| `/api/experience` | Experiência |
| `/api/health` | Health check |
| `/api/sessao` | Sessão |
| `/api/lixeira` | Soft delete recovery |

### 2.5 Documentation (Evolutivo)

| Documento | Path | Nota |
|-----------|------|------|
| AGENTS.md (raiz) | `./AGENTS.md` | Pode evoluir com novas regras |
| AGENTS.md (docs) | `docs/06-AI/AGENTS.md` | Pode evoluir |
| CHANGELOG.md | `docs/07-MILESTONES/CHANGELOG.md` | Atualizado a cada sprint |
| KNOWN_ISSUES.md | `docs/05-OPERATIONS/KNOWN_ISSUES.md` | Atualizado |

---

## 3. PATRIMÔNIO EXPERIMENTAL — DEPENDE DE VALIDAÇÃO

### 3.1 P36 — Scientific Validation Engines

**Path:** `sistema/src/engine/p36/` (total ~354 linhas)

| Engine | Linhas | Modelo Prisma | Hipótese |
|--------|--------|---------------|----------|
| `wow-detector.ts` | 60 | `MomentoWow` | Momentos de valor percebido geram engajamento |
| `friction-radar.ts` | 57 | `Friccao` | Identificar atrito melhora experiência |
| `value-index.ts` | 77 | `SinalValor` | Sinais de valor percebido são mensuráveis |
| `recommendation-auditor.ts` | 58 | `AuditoriaRecomendacao` | Auditoria de recomendações melhora precisão |
| `platform-capital-engine.ts` | 55 | `PlataformaSnapshot` | Capital cognitivo da plataforma é mensurável |
| `evidence-autologger.ts` | 47 | (usa modelos existentes) | Auto-registro de evidências funciona |

**Status:** Materializado no banco via migration `002_p36_materialization`. Código funcional mas **não validado com usuários reais**.

### 3.2 P36 Admin Pages

| Rota | Arquivo | Linhas |
|------|---------|--------|
| `/admin/diario-founder` | `page.tsx` | 211 |
| `/admin/diario-founder` | `mapa-transformacao.tsx` | ~100 |
| `/admin/cognitive-observatory` | `page.tsx` | 240 |

**Razão da classificação:** Páginas administrativas para fundador monitorar métricas da plataforma. Não expostas ao usuário final. Dependem de validação de uso real.

### 3.3 P36 Database Models

| Model | Tabela | Uso |
|-------|--------|-----|
| `MomentoWow` | `momentos_wow` | Wow detector |
| `Friccao` | `fricoes` | Friction radar |
| `SinalValor` | `sinais_valor` | Value index |
| `AuditoriaRecomendacao` | `auditoria_recomendacoes` | Recommendation auditor |
| `PlataformaSnapshot` | `plataforma_snapshots` | Platform capital |

---

## 4. PATRIMÔNIO OBSOLETO — PODE SER REMOVIDO

### 4.1 Páginas Legado Ocultas (ERP remnants)

**Path:** `sistema/src/app/(dashboard)/`

| Rota | Arquivo | Linhas | Observação |
|------|---------|--------|------------|
| `/crm` | `page.tsx` | 25 | Pipeline de leads — oculto da sidebar |
| `/tarefas` | `page.tsx` | 25 | Tarefas — oculto da sidebar |
| `/implantacoes` | `page.tsx` | 25 | Onboarding — oculto da sidebar |

**Razão:** Declaradas como "legado preservado" em FOUNDATION_CANDIDATE_V2.md seção 2. Código existe, sem link na navegação. Podem ser removidas ou convertidas em abas dentro de outras páginas.

### 4.2 Components com Jargão Técnico (sobreviventes do P33)

**Path:** `sistema/src/components/cognitive/`

| Componente | Linhas | Jargão | Problema |
|-----------|--------|--------|----------|
| `health-score-card.tsx` | 112 | "HealthScore" | Jargão técnico, deveria ter sido renomeado no P33 |
| `confidence-ring.tsx` | 72 | "ConfidenceRing" | Jargão técnico, deveria ter sido renomeado |

**Razão:** CURRENT_PRODUCT.md afirma que "jargão técnico removido (HealthScore, ConfidenceRing)" no P33, mas estes arquivos ainda existem no código. Precisam ser auditados para verificar se ainda são importados.

### 4.3 Engines com Potencial Dead Code

**Path:** `sistema/src/engine/`

Baseado em FOUNDATION_CANDIDATE_V2.md seção 8 — "Remover engines mortos — P33 focou em components; engines têm código não usado":

| Engine | Linhas | Risco |
|--------|--------|-------|
| `cognitive-heatmap-engine.ts` | 135 | 🟡 Pode não estar conectado à UI |
| `cognitive-brainstorm-engine.ts` | 135 | 🟡 Pode não estar conectado à UI |
| `cognitive-before-after-engine.ts` | 90 | 🟡 Pode não estar conectado à UI |
| `cognitive-milestone-engine.ts` | 129 | 🟡 Pode não estar conectado à UI |
| `cognitive-celebrations-engine.ts` | - | ⚠️ Listado no Foundation Freeze V1 mas AUSENTE do diretório |

**Nota:** `cognitive-celebrations-engine.ts` consta no Foundation Freeze V1 (seção 5.1) mas não existe no diretório `sistema/src/engine/`. Já foi removido ou renomeado.

### 4.4 Engines com Sufixo -engine (a renomear)

**Recomendação FOUNDATION_CANDIDATE_V2.md seção 8:** "Renomear engines — eliminar sufixo -engine"

Vários engines ainda mantêm o sufixo `-engine` que deveria ser eliminado para consistência com a nova nomenclatura. Afeta apenas código interno, mas a renomeação está pendente.

### 4.5 API Route `/api/patrimonio` — Desalinhada

**Path:** `sistema/src/app/api/patrimonio/route.ts`

FOUNDATION_CANDIDATE_V2.md seção 8 recomenda revisitar esta rota para alinhar com os 5 patrimônios oficiais da Emenda Constitucional 01.

### 4.6 Caixa Inteligente Hardcoded

No componente `atendimento-shell.tsx` e/ou páginas relacionadas, os dados de Caixa do Dia estão mockados (FOUNDATION_CANDIDATE_V2.md seção 6). Código funcional para demonstração, não conectado a dados reais de transações.

---

## 5. MAPA DE DIVERGÊNCIAS (Documentação vs Realidade)

| # | Tipo | Descrição | Local |
|---|------|-----------|-------|
| D-01 | Tipo C - Débito | `cognitive-celebrations-engine.ts` listado no Freeze V1 mas ausente do diretório | `docs/07-MILESTONES/FOUNDATION_FREEZE_V1.md` vs `sistema/src/engine/` |
| D-02 | Tipo C - Débito | `validation-engine` listado no Freeze V1 mas ausente do diretório | `docs/07-MILESTONES/FOUNDATION_FREEZE_V1.md` vs `sistema/src/engine/` |
| D-03 | Tipo C - Débito | health-score-card.tsx e confidence-ring.tsx existem apesar de P33 ter "removido" jargão | `sistema/src/components/cognitive/` |
| D-04 | Tipo C - Débito | Soft delete incompleto — alguns models sem `deletedAt` | Todo o schema |
| D-05 | Tipo E - Conflito | Foundation Freeze V1 lista 51 engines; diretório real tem ~68 arquivos | Documento vs código |

---

## 6. MÉTRICAS GERAIS DO PATRIMÔNIO

| Dimensão | Total | Permanente | Evolutivo | Experimental | Obsoleto |
|----------|-------|------------|-----------|--------------|----------|
| **Documentos constitucionais** | 14 | 14 | 0 | 0 | 0 |
| **Engines** | 68 | 45 | 17 | 6 | 0* |
| **Services** | 7 | 7 | 0 | 0 | 0 |
| **Lib modules** | 22 | 22 | 0 | 0 | 0 |
| **Componentes** | ~55 | 0 | ~50 | 0 | ~2 |
| **Páginas** | 17 | 0 | 14 | 2 | 3 |
| **API routes** | 19 | 0 | 19 | 0 | 0 |
| **Models Prisma** | 40 | 35 | 0 | 5 | 0 |
| **ADRs** | 34 | 34 | 0 | 0 | 0 |

*Engines obsoletas já foram removidas em programas anteriores (cognitive-celebrations-engine, validation-engine).

---

## 7. RECOMENDAÇÕES PARA ETAPA 2

### Remoções prioritárias:
1. Verificar e remover `health-score-card.tsx` e `confidence-ring.tsx` se não estiverem mais sendo importados
2. Decidir destino das 3 páginas legado (CRM, Tarefas, Implantações) — remover ou converter
3. Revisar `cognitive-heatmap-engine`, `cognitive-brainstorm-engine`, `cognitive-before-after-engine` — verificar conectividade com UI

### Renomeações:
4. Eliminar sufixo `-engine` de todos os engines (recomendação P35)
5. Renomear `Patrimony`/`Heritage` referências

### Correções:
6. Alinhar `/api/patrimonio` com os 5 patrimônios oficiais
7. Substituir dados mockados da Caixa Inteligente por dados reais
8. Completar soft delete nos models pendentes

### Validação:
9. Manter P36 como experimental até validação com empresa real
10. Definir critérios de promoção para P36 sair de experimental

---

## 8. ÁRVORE DE DECISÃO PARA CLASSIFICAÇÃO DE NOVOS ITENS

```
ITEM NOVO
    │
    ▼
┌─────────────────────────────────┐
│ É parte da Constituição?        │ → PERMANENTE
├─────────────────────────────────┤
│ É core cognitivo (orquestração, │
│ memória, decisão, identidade,   │
│ evidência, conhecimento)?       │ → PERMANENTE
├─────────────────────────────────┤
│ É engine de suporte, UI,        │
│ página, API route?              │ → EVOLUTIVO
├─────────────────────────────────┤
│ É feature não validada com      │
│ usuários reais?                 │ → EXPERIMENTAL
├─────────────────────────────────┤
│ É código legado, não referen-   │
│ ciado, substituído?             │ → OBSOLETO
└─────────────────────────────────┘
```

---

*Este documento constitui a Etapa 1 (Auditoria Patrimonial Exaustiva) do Foundation Freeze V2. Deve ser revisado a cada sprint para refletir mudanças de classificação.*
