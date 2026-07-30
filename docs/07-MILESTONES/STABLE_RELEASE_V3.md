# STABLE RELEASE V3 — Snapshot Oficial da Plataforma

**Data:** 29 de julho de 2026
**Programa:** 41 — Stable Release V3
**Estado:** Plataforma pronta para aquisição dos primeiros Founders

---

## 1. Stack Tecnológica

| Camada | Tecnologia | Versão |
|--------|-----------|--------|
| Framework | Next.js | 16.2.9 (Turbopack) |
| Linguagem | TypeScript | — |
| ORM | Prisma | 7.8.0 |
| Banco | PostgreSQL (Supabase) | — |
| Autenticação | Supabase Auth (SSR) | — |
| IA | Google Gemini (gemini-2.5-flash) | — |
| Deploy | Vercel | — |
| CSS | Tailwind CSS | — |
| Componentes UI | Radix UI / shadcn/ui | — |

## 2. Estrutura do Projeto

```
sistema/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (auth)/             # Login, criar conta, reset senha
│   │   ├── (dashboard)/        # Páginas protegidas (14 páginas)
│   │   │   ├── admin/          # 4 páginas admin
│   │   │   ├── atendimento/
│   │   │   ├── assistente/
│   │   │   ├── centro-decisao/
│   │   │   ├── clientes/
│   │   │   ├── conhecimento/
│   │   │   ├── configuracoes/
│   │   │   ├── crm/
│   │   │   ├── dashboard/
│   │   │   ├── financeiro/
│   │   │   ├── historico/
│   │   │   ├── implantacoes/
│   │   │   ├── aprendizados/
│   │   │   └── tarefas/
│   │   ├── api/                # 30 rotas de API
│   │   ├── conversa/           # Diagnóstico
│   │   ├── robots.ts
│   │   ├── sitemap.ts
│   │   └── manifest.ts
│   ├── components/             # 64 componentes em 15 diretórios
│   ├── engine/                 # 83 engines cognitivos
│   ├── services/               # 7 services
│   └── lib/                    # Utilitários, auth, prisma, validação
├── prisma/
│   ├── schema.prisma           # 42+ modelos
│   └── migrations/             # 3 migrations aplicadas
├── public/
│   └── favicon.svg
├── next.config.ts
├── vercel.json
└── .env.example
```

## 3. Rotas

### Páginas (24 `page.tsx`)

| Rota | Tipo | Funcionalidade |
|------|------|---------------|
| `/` | Pública | Landing page |
| `/conversa` | Pública | Diagnóstico Inteligente |
| `/login` | Pública | Login |
| `/criar-conta` | Pública | Criar conta |
| `/reset-password` | Pública | Reset de senha |
| `/reset-password/confirmar` | Pública | Confirmação de reset |
| `/dashboard` | Protegida | Centro Diário (5 perguntas) |
| `/atendimento` | Protegida | Página Única de Atendimento |
| `/assistente` | Protegida | Assistente IA |
| `/centro-decisao` | Protegida | Centro de Decisão |
| `/clientes` | Protegida | Lista de clientes |
| `/clientes/[id]` | Protegida | Perfil do cliente |
| `/conhecimento` | Protegida | Knowledge Vault |
| `/configuracoes` | Protegida | Configurações |
| `/crm` | Protegida | CRM (legado oculto) |
| `/financeiro` | Protegida | Financeiro |
| `/historico` | Protegida | Timeline Viva |
| `/implantacoes` | Protegida | Implantações (legado oculto) |
| `/aprendizados` | Protegida | Aprendizados |
| `/tarefas` | Protegida | Tarefas (legado oculto) |
| `/admin/diario-cientifico` | Protegida | Diário Científico |
| `/admin/radar-founders` | Protegida | Radar dos Founders |
| `/admin/diario-founder` | Protegida | Diário do Founder |
| `/admin/cognitive-observatory` | Protegida | Observatório Cognitivo |

### API Routes (30 `route.ts`)

Cobrindo: clientes, leads, tarefas, transações, conversa, auth, cognitivo, configurações, experiência, aprendizado, implantação, health, lixeira, sessão.

## 4. Banco de Dados

### Modelos (42+)

- **Core:** Empresa, Usuario, Cliente, Lead, Tarefa, Transacao, Implantacao
- **Cognitivo:** Hipotese, Evidencia, MemoriaCognitiva, AcaoCognitiva, EventoAtivacao, Outcome, ConhecimentoValidado, FeedbackAcao, DecisaoSinal, OnboardingDecisao
- **Conhecimento:** ConhecimentoColetivo, RegistroCientifico, CasoReal, Aprendizado, Anotacao
- **Infra:** Tag, Event, EventSubscription, DeadLetter, IdentidadeDigital, ConfiguracaoEmpresa, HistoricoSinal, Conversa, ConversaHistorico
- **Sistema:** Contato, EtapaImplantacao, Historico

### Migrations

| Migration | Data | Objetivo |
|-----------|------|----------|
| `001_foundation_database_v1` | — | Database inicial |
| `002_p36_materialization` | — | Materialização P36 |
| `003_sistema_cientifico` | — | Sistema científico (P40) |

**Status:** Todas aplicadas. Banco sincronizado.

## 5. Segurança

- **Proxy (middleware):** Ativo — Supabase SSR session check em todas as rotas protegidas
- **Autenticação:** Supabase Auth com SSR, sessão gerenciada por cookies httpOnly
- **Autorização:** `requireUserApi()` para APIs, `requireRole()` para operações GESTOR/ADMIN
- **Multi-tenant:** `prismaSeguro` com verificação de `empresaId` em todas as queries (bloqueia em produção)
- **.env:** Gitignorado, `.env.example` com placeholders
- **Rate limiting:** Implementado (configurável por rota)
- **Security headers:** HSTS, CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy
- **Validação:** Zod schemas em todas as APIs

## 6. Engines (83)

Distribuídas nas subpastas de `src/engine/`:
- Motor Cognitivo, Curva Evolutiva, Memória, Narrativa, Radar, Decisões, Hipóteses, Evidências, Aprendizado, Governança do Conhecimento
- Pipelines, Subscribers, Event Catalog
- P40: transformation-index

## 7. Componentes (64)

| Diretório | Quantidade | Finalidade |
|-----------|-----------|------------|
| `components/ui/` | 7 | Primitivos (Button, Card, Input, Dialog, etc.) |
| `components/layout/` | 3 | AppShell, Header, Sidebar |
| `components/shared/` | 9 | EstadoVazio, ExperienceRenderer, DropdownMenu, etc. |
| `components/centro-cognitivo/` | 8 | Dashboard cognitivo (4 usados, 4 potencialmente não utilizados) |
| `components/cognitive/` | 4 | BriefingCard, AnelConfianca, IndiceSaudeCard, NotificacaoCard |
| `components/conhecimento/` | 5 | KnowledgeCard, Timeline, Tag, Filters, Summary |
| `components/conversa/` | 4 | QuestionCard, RevelacaoCard, ProgressBar, MicroReaction |
| `components/aprendizados/` | 3 | QuickLearningQuestion, LearningHistory, ConversationKnowledgeCard |
| `components/assistente/` | 2 | Chat, ChatMessage |
| `components/cliente/` | 4 | List, Form, Modal, Perfil |
| `components/crm/` | 5 | Pipeline, Column, Card, Form, Modal |
| `components/financeiro/` | 4 | Resumo, List, Form, Modal |
| `components/tarefas/` | 4 | List, Item, Form, Modal |
| `components/atendimento/` | 1 | AtendimentoShell |
| `components/historico/` | 1 | TimelineViva |

## 8. Documentação

### Milestones (docs/07-MILESTONES/)
- FOUNDATION_RELEASE_V1.md
- FOUNDATION_RELEASE_V2.md
- FOUNDATION_CANDIDATE_V2.md
- FOUNDATION_DATABASE_V1.md
- STABLE_RELEASE_V3.md (este documento)
- FOUNDATION_STABLE_V3.md
- CHANGELOG_OFICIAL.md (P21-P41)
- ROADMAP_POS_FUNDACAO.md
- MANIFESTO_FOUNDER.md
- MANIFESTO_ERA_DA_VALIDACAO.md
- POLITICA_OFICIAL_DE_EVOLUCAO.md
- PLANO_PRIMEIROS_10_FOUNDERS.md
- RELATORIO_FINAL_P35.md

### Decisões (docs/04-DECISIONS/ADR/)
34 ADRs aprovadas (001-034)

### Constituição (docs/06-CONSTITUTION/P32/)
14 documentos (13 artigos + 2 emendas)

## 9. Métricas de Build

| Métrica | Valor |
|---------|-------|
| Tempo de compilação | 19.1s |
| TypeScript | 0 erros |
| Páginas (Next.js) | 45 |
| Páginas (page.tsx) | 24 |
| API Routes | 30 |

## 10. Riscos Remanescentes Conhecidos

1. **RLS não aplicado via Prisma** — Prisma conecta como superuser; RLS no banco não é efetivo para queries da aplicação
2. **4 componentes não utilizados** em `centro-cognitivo/` (JornadaCard, ConhecimentoCard, CapitalCard, CapacidadeCard) — decisão pendente: remover ou reativar
3. **Seed admin password** em `.env` (não versionado, mas vulnerável localmente)
4. **Zero testes automatizados** — aceito para esta fase
5. **Soft delete incompleto** — 7 de 12 modelos core sem `deletedAt`
6. **Caixa Inteligente** — ainda usa dados mockados (hardcoded)
7. **Rate limiting in-memory** — não escala com múltiplas instâncias serverless
8. **Sem CSRF tokens** — confiando em SameSite=Lax

## 11. Decisão

**STATUS: LIBERADO PARA AQUISIÇÃO DOS PRIMEIROS FOUNDERS**

A plataforma está estável, auditada, segura e documentada. Riscos remanescentes são conhecidos, documentados e aceitáveis para o estágio atual (primeiros Founders, ambiente controlado).

Próximo passo: aquisição, implantação e acompanhamento dos primeiros Founders conforme `docs/05-OPERATIONS/PLANO_PRIMEIROS_10_FOUNDERS.md`.
