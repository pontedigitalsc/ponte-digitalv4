# Blueprint — Libs e Hooks

> **Programa 13 — Blueprint de Implementação**
> Arquivos: `sistema/src/lib/` (19 libs), `sistema/src/hooks/` (5 hooks)
> Criticidade: **Crítica**

---

## 1. Libs

| Lib | Responsabilidade | Quem usa | Tipo |
|-----|-----------------|----------|------|
| `prisma-tenant-safe` | Wrapper Prisma com tenant guard | Todos services + engines | **Crítica** |
| `app-errors` | Hierarquia de 8 classes de erro | Toda aplicação | **Crítica** |
| `api-error` | Handler unificado de erro HTTP | Todas API routes | **Crítica** |
| `auth` | Autenticação SSR | Server Components, Route Handlers | **Crítica** |
| `authorize` | Autorização com erros tipados | API routes | **Alta** |
| `logger` | Logger estruturado (createLogger) | Toda aplicação | **Alta** |
| `cache` + `cache-provider` | Cache in-memory com TTL (30s/60s/300s) | 4 engines | Média |
| `rate-limit` + config + provider | Rate limiting in-memory | 5 API routes | **Alta** |
| `supabase` + `supabase-browser` | Cliente Supabase SSR/browser | auth, componentes | **Crítica** |
| `planos` | Feature gating por plano | Services, API routes | Média |
| `validations/index` | Schemas Zod (18 schemas, ~60% cobertura) | API routes | **Alta** |
| `utils` | Formatação (moeda, data, CNPJ), paginação | Componentes, páginas | Baixa |
| `cognitive-pipeline-store` | Observabilidade do pipeline (1392 linhas) | Orchestrator, Dashboard | **Alta** |
| `api-client` | Cliente HTTP frontend | Hooks | **Alta** |
| `prisma` | Singleton PrismaClient | prisma-tenant-safe | **Crítica** |

### Contratos das Libs Críticas

```typescript
// prisma-tenant-safe
const prismaSeguro: PrismaClient;  // mesmo que PrismaClient, mas com guard

// app-errors
class BaseAppError extends Error { /* codigo, statusCode, correlationId */ }
class ValidationError extends BaseAppError { statusCode = 400 }
class AuthenticationError extends BaseAppError { statusCode = 401 }
class AuthorizationError extends BaseAppError { statusCode = 403 }
class NotFoundError extends BaseAppError { statusCode = 404 }
class BusinessRuleError extends BaseAppError { statusCode = 422 }
class ConflictError extends BaseAppError { statusCode = 409 }
class RateLimitError extends BaseAppError { statusCode = 429 }
class InternalApplicationError extends BaseAppError { statusCode = 500 }

// logger
function createLogger(module: string, context?: string): {
  info(msg: string, data?: Record<string, unknown>): void;
  warn(msg: string, data?: Record<string, unknown>): void;
  error(msg: string, data?: Record<string, unknown>): void;
  debug(msg: string, data?: Record<string, unknown>): void;
};

// cache
function getCache(): CacheProvider;  // singleton
enum TTL { RAPIDO = 30, CONTEXTO = 60, AGREGADO = 300 }

// auth
async function getSession(): Promise<Session | null>;
async function getCurrentUser(): Promise<Usuario | null>;
async function requireUser(): Promise<{ usuario: Usuario; empresa: Empresa }>;
async function getEmpresaDoUsuario(usuarioId: string): Promise<Empresa | null>;
function temPermissao(usuario: Usuario, permissao: string): boolean;
```

---

## 2. Hooks

| Hook | Responsabilidade | Quem usa | Funções |
|------|-----------------|----------|---------|
| `useClientes(filtros?)` | Dados de clientes | Páginas cliente | cliente CRUD |
| `useLeads(filtros?)` | Dados de leads | Página CRM | lead CRUD + mover estágio |
| `useTarefas(filtros?)` | Dados de tarefas | Página tarefas | tarefa CRUD + toggle |
| `useTransacoes(filtros?)` | Dados financeiros | Página financeiro | transação CRUD + resumo |
| `useConfirm()` | Diálogo de confirmação | Componentes | `confirmar(mensagem) → boolean` |

### Contrato dos Hooks

```typescript
function useClientes(filtrosIniciais?: FiltroCliente): {
  clientes: Cliente[];
  total: number;
  loading: boolean;
  error: string | null;
  carregarClientes(filtros?: FiltroCliente): Promise<void>;
  criarCliente(dados: CriarClienteInput): Promise<Cliente>;
  atualizarCliente(id: string, dados: AtualizarClienteInput): Promise<Cliente>;
  excluirCliente(id: string): Promise<void>;
  converterLead(id: string): Promise<Cliente>;
};
```

### Observações

- `cognitive-pipeline-store.ts` (1392 linhas) está acima do limite saudável — candidato a refatoração em 3-5 módulos separados.
- `validations/index.ts` cobre ~60% das rotas — as 40% restantes fazem validação manual inline.
- `useConfirm` não segue o padrão `api-client` dos outros hooks — é um hook de UI, não de dados.
