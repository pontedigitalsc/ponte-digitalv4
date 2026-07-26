# Blueprint — APIs

> **Programa 13 — Blueprint de Implementação**
> Arquivos: `sistema/src/app/api/**/route.ts` (26 rotas)
> Dependências: `authorize.ts`, `api-error.ts`, `rate-limit.ts`, `validations/`, `app-errors.ts`, `planos.ts`
> Criticidade: **Crítica**

---

## 1. Regras Arquiteturais (Lei 3)

1. **API nunca implementa regra de negócio** — só valida entrada, chama service, retorna
2. Toda API chama `requireUserApi()` no início (proteção de rota)
3. Toda API usa `handleApiError()` para erros padronizados
4. APIs de escrita validam entrada com Zod (`validations/index.ts`)
5. APIs críticas têm rate limiting (`rate-limit.ts`)

---

## 2. Catálogo de Rotas

### 2.1 CRM

| Rota | Métodos | Service | Rate Limit | Proteção |
|------|---------|---------|------------|----------|
| `/api/clientes` | GET, POST | `cliente.service` | — | Auth |
| `/api/clientes/[id]` | GET, PUT, DELETE | `cliente.service` | — | Auth |
| `/api/leads` | GET, POST | `lead.service` | — | Auth |
| `/api/leads/[id]` | GET, PUT, DELETE | `lead.service` | — | Auth |
| `/api/leads/[id]/converter` | POST | `lead.service` | — | Auth |

### 2.2 Financeiro

| Rota | Métodos | Service | Rate Limit | Proteção |
|------|---------|---------|------------|----------|
| `/api/transacoes` | GET, POST | `transacao.service` | — | Auth |
| `/api/transacoes/[id]` | GET, PUT, DELETE | `transacao.service` | — | Auth |

### 2.3 Tarefas

| Rota | Métodos | Service | Rate Limit | Proteção |
|------|---------|---------|------------|----------|
| `/api/tarefas` | GET, POST | `tarefa.service` | — | Auth |
| `/api/tarefas/[id]` | GET, PUT, DELETE | `tarefa.service` | — | Auth |

### 2.4 Implantação

| Rota | Métodos | Service | Rate Limit | Proteção |
|------|---------|---------|------------|----------|
| `/api/implantacoes` | GET, POST | `implantacao.service` | — | Auth |
| `/api/implantacoes/[id]` | GET, PUT, DELETE | `implantacao.service` | — | Auth |
| `/api/implantacoes/etapas/[id]` | PUT | `implantacao.service` | — | Auth |

### 2.5 Histórico

| Rota | Métodos | Service | Rate Limit | Proteção |
|------|---------|---------|------------|----------|
| `/api/historicos` | GET, POST | `historico.service` | — | Auth |
| `/api/historicos/[id]` | GET, DELETE | `historico.service` | — | Auth |

### 2.6 Cognitivo

| Rota | Métodos | Engine | Rate Limit | Proteção |
|------|---------|--------|------------|----------|
| `/api/cognitive-heritage` | GET | Heritage Facade | — | Auth |
| `/api/patrimonio` | GET | Heritage Facade | — | Auth |
| `/api/cognitivo/config` | GET, PUT | Feature flags | — | Auth |
| `/api/assistente` | POST | Conversation Engine | 20/min | Auth + Plano |
| `/api/aprendizados` | GET, POST | Aprendizado Service | — | Auth |
| `/api/experience/login` | GET | Experience Engine | — | Auth (pós-login) |

### 2.7 Configuração

| Rota | Métodos | Service | Rate Limit | Proteção |
|------|---------|---------|------------|----------|
| `/api/configuracoes` | GET, PUT | `configuracao.service` | — | Auth |

### 2.8 Lixeira

| Rota | Métodos | Service | Rate Limit | Proteção |
|------|---------|---------|------------|----------|
| `/api/lixeira/[tipo]` | GET | Multi-service | — | Auth |
| `/api/lixeira/[tipo]/[id]` | DELETE | Multi-service | — | Auth |

### 2.9 Conversa (pública)

| Rota | Métodos | Engine | Rate Limit | Proteção |
|------|---------|--------|------------|----------|
| `/api/conversa` | GET, POST | Conversation Engine | 30/min | IP (anon) |
| `/api/conversa/finalizar` | POST | Conversation Engine | 30/min | IP (anon) |

### 2.10 Auth

| Rota | Métodos | Dependência | Rate Limit | Proteção |
|------|---------|-------------|------------|----------|
| `/api/auth/criar-conta` | POST | Supabase Auth | 3/min | IP |

### 2.11 Utilitários

| Rota | Métodos | Dependência | Rate Limit | Proteção |
|------|---------|-------------|------------|----------|
| `/api/health` | GET | Nenhuma | — | Nenhuma |

---

## 3. Formato de Resposta

```typescript
// Sucesso
{ dados: T; mensagem?: string }

// Erro (via handleApiError)
{ erro: string; codigo: string; correlationId?: string }
```

---

## 4. Fluxo de Requisição

```
1. Requisição HTTP chega na rota
2. [Se autenticada] authorize.requireUserApi() → valida sessão
3. [Se rate limited] rateLimit.assertRateLimit() → verifica limite
4. [Se escrita] Zod schema valida body (validations/index.ts)
5. Chama service/engine correspondente
6. [Se erro] apiError.handleApiError() → resposta padronizada
7. Resposta JSON → { dados, mensagem }
```

---

## 5. Rate Limiting

| Limite | Rotas | Penalidade |
|--------|-------|------------|
| 20/min | Assistente | 429 Too Many Requests |
| 30/min | Conversa | 429 |
| 10/min | Login | 429 |
| 3/min | Criar Conta | 429 |
| 60/min | API Geral | 429 |

---

## 6. APIs que NÃO Existem (documentadas por engano)

As seguintes APIs constam em documentação anterior mas **não existem** no código:
- `/api/auth/login`, `/api/auth/logout`, `/api/auth/session`
- `/api/crm`
- `/api/contatos`, `/api/contatos/[id]`
- `/api/dashboard`
- `/api/cognitivo/decisao`, `/api/cognitivo/contexto`, `/api/cognitivo/memoria`, `/api/cognitivo/conhecimento`

Estas funcionalidades são servidas por Server Components (dashboard) ou Supabase Auth diretamente (login).
