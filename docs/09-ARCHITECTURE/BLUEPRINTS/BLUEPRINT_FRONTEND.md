# Blueprint — Frontend

> **Programa 13 — Blueprint de Implementação**
> Framework: Next.js 16.2.9 (App Router) + React 19 + Tailwind CSS v4 + Radix UI
> Arquivos: 20 páginas, 58+ componentes, 5 hooks
> Criticidade: **Crítica**

---

## 1. Layouts

| Layout | Arquivo | Função |
|--------|---------|--------|
| Root | `app/layout.tsx` | Providers (ThemeProvider), fontes, metadata |
| Auth | `app/(auth)/layout.tsx` | Brand panel + formulário |
| Dashboard | `app/(dashboard)/layout.tsx` | `requireUser()` + `AppShell` + `CognitiveOS` |

---

## 2. Páginas por Grupo

### Auth (sem autenticação)

| Rota | Componente | Dados vindo de |
|------|-----------|----------------|
| `/login` | Formulário + brand panel | Supabase Auth (browser) |
| `/criar-conta` | Formulário multi-step | API + Supabase Auth |
| `/reset-password` | Formulário de email | Supabase Auth |
| `/reset-password/confirmar` | Formulário de nova senha | Supabase Auth |
| `/conversa` | QuestionCard + ProgressBar | `/api/conversa` |

### Dashboard (autenticado)

| Rota | Componente principal | Dados vindo de |
|------|---------------------|----------------|
| `/dashboard` | health-score, evolution, maturity, briefing cards | Experience Engine (server-side) |
| `/clientes` | ClienteList + ClienteModal | `useClientes` hook |
| `/clientes/[id]` | ClientePerfil | `useClientes` + `/api/clientes/[id]` |
| `/crm` | Pipeline Kanban + LeadCard | `useLeads` hook |
| `/financeiro` | FinanceiroResumo + TransacaoList | `useTransacoes` hook |
| `/tarefas` | TarefaList + TarefaModal | `useTarefas` hook |
| `/implantacoes` | WorkflowCard + Implantacao list | `/api/implantacoes` |
| `/historico` | Timeline + histórico list | `/api/historicos` |
| `/centro-decisao` | ActionCard + decisão atual | Experience Engine |
| `/assistente` | Chat + ChatMessage | `/api/assistente` (Anthropic) |
| `/conhecimento` | KnowledgeCard + filters | `/api/cognitive-heritage` |
| `/aprendizados` | LearningHistory + QuickLearning | `/api/aprendizados` |
| `/configuracoes` | Config form + perfil | `/api/configuracoes` |
| `/admin/cognitive-observatory` | Métricas + alertas | Cognitive Observatory |

---

## 3. Componentes por Domínio

| Domínio | Componentes |
|---------|-------------|
| **ui/** | button, card, dialog, input, form-elements, avatar |
| **layout/** | app-shell (sidebar + header + content), header, sidebar |
| **shared/** | action-card, insight-card, journey-card, narrativa-card, experience-renderer, workflow-card, estado-vazio, lixeira-modal, dropdown-menu |
| **cognitive/** | health-score-card, evolution-card, maturity-card, briefing-card, milestone-card, notification-card, knowledge-aging-card, confidence-drift-card |
| **clientes/** | cliente-list, cliente-form, cliente-modal, cliente-perfil |
| **crm/** | pipeline, pipeline-column, lead-card, lead-form, lead-modal |
| **financeiro/** | transacao-list, transacao-form, transacao-modal, financeiro-resumo |
| **tarefas/** | tarefa-list, tarefa-item, tarefa-form, tarefa-modal |
| **conversa/** | question-card, revelacao-card, progress-bar, micro-reaction |
| **assistente/** | chat, chat-message |
| **conhecimento/** | knowledge-card, knowledge-timeline, knowledge-tag, knowledge-summary, knowledge-filters |
| **aprendizados/** | quick-learning-question, learning-history, conversation-knowledge-card |

---

## 4. Fluxos de Dados

### Páginas Server + Client

Páginas do dashboard usam Server Components para dados iniciais (Experience Engine) e Client Components para interatividade:

```
Server Component (layout)
  ├─ requireUser() → session
  ├─ cognitive-experience-engine.obterCognitiveOS(empresaId)
  └─ Render AppShell + children

Client Component (página)
  ├─ useClientes() / useLeads() / useTarefas() / useTransacoes()
  └─ api-client → fetch → estado local (loading, error, data)
```

### Estado Global

Aplicação não usa estado global (Redux, Zustand). Cada página gerencia seu próprio estado via hooks.

---

## 5. Regras de Componente

1. Nenhum componente acessa Prisma ou service diretamente
2. Nenhum componente contém regra de negócio (Lei 3)
3. Componentes de UI (button, card, input) são puramente apresentacionais
4. Componentes de domínio (cliente-list, lead-form) usam hooks para dados
5. Server Components podem chamar engines diretamente (ex.: layout → Experience Engine)
