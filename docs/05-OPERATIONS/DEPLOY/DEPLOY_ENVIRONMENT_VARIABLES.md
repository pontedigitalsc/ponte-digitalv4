# Ponte Digital — Auditoria de Variáveis de Ambiente para Deploy

## Variáveis obrigatórias

### NEXT_PUBLIC_SUPABASE_URL
- **Valor exemplo:** `https://ooczikpgogmcqzvctyik.supabase.co`
- **Obrigatória:** SIM
- **Opcional:** Não
- **Usada por:** `proxy.ts`, `supabase.ts`, `supabase-browser.ts`, `criar-conta/route.ts`, `seed.ts`
- **Arquivos:**
  - `src/proxy.ts:8`
  - `src/lib/supabase.ts:4`
  - `src/lib/supabase-browser.ts:3`
  - `src/app/api/auth/criar-conta/route.ts:15`
  - `prisma/seed.ts:9`
- **Finalidade:** URL do projeto Supabase. Necessária para criar o cliente Supabase e autenticar usuários.
- **Pode ficar vazia?** Não. Usa `!` assertion — crash se ausente.
- **Fallback/Default:** Nenhum
- **Pode ser removida?** Não
- **Categoria:** Supabase, Frontend, Backend, Segurança
- **Formato:** URL HTTPS
- **Risco se ausente:** Middleware quebra, server components quebram, browser client quebra, seed quebra, criação de conta quebra. **Sistema 100% inoperante.**

---

### NEXT_PUBLIC_SUPABASE_ANON_KEY
- **Valor exemplo:** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9vY3ppa3Bnb2dtY3F6dmN0eWlrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQyNDQxMTUsImV4cCI6MjA5OTgyMDExNX0.DoMPi6PbSli3Zv6fk3A8bE77QsnKK_0f8GCtbdMCrnQ`
- **Obrigatória:** SIM
- **Opcional:** Não
- **Usada por:** `proxy.ts`, `supabase.ts`, `supabase-browser.ts`
- **Arquivos:**
  - `src/proxy.ts:9`
  - `src/lib/supabase.ts:5`
  - `src/lib/supabase-browser.ts:4`
- **Finalidade:** Chave anônima pública do Supabase. Necessária para criar o cliente Supabase no frontend e backend.
- **Pode ficar vazia?** Não. Usa `!` assertion — crash se ausente.
- **Fallback/Default:** Nenhum
- **Pode ser removida?** Não
- **Categoria:** Supabase, Frontend, Backend
- **Formato:** JWT token (string)
- **Risco se ausente:** Middleware quebra, server components quebram, browser client quebra. **Sistema 100% inoperante.**

---

### SUPABASE_SERVICE_ROLE_KEY
- **Valor exemplo:** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9vY3ppa3Bnb2dtY3F6dmN0eWlrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NDI0NDExNSwiZXhwIjoyMDk5ODIwMTE1fQ.fBWiHU2RaEToOCuWhmX7VonBTmdTZ3fX5TQ7ZM7nNRk`
- **Obrigatória:** SIM
- **Opcional:** Não
- **Usada por:** `criar-conta/route.ts`, `seed.ts`
- **Arquivos:**
  - `src/app/api/auth/criar-conta/route.ts:16`
  - `prisma/seed.ts:10`
- **Finalidade:** Criação de usuários via Supabase Auth Admin API (criar conta sem necessidade de senha do usuário logado).
- **Pode ficar vazia?** Não. Usa `!` assertion — crash se ausente.
- **Fallback/Default:** Nenhum
- **Pode ser removida?** Não
- **Categoria:** Supabase, Backend, Segurança
- **Formato:** JWT token (service role — **NUNCA expor ao frontend**)
- **Risco se ausente:** Rota `/api/auth/criar-conta` retorna 500. Seed quebra. Novos usuários não podem se cadastrar.

---

### DATABASE_URL
- **Valor exemplo:** `postgresql://postgres.ooczikpgogmcqzvctyik:8fup8Pu1A8nsp8vz@aws-1-sa-east-1.pooler.supabase.com:5432/postgres`
- **Obrigatória:** SIM
- **Opcional:** Não
- **Usada por:** `prisma.ts`, `seed.ts`
- **Arquivos:**
  - `src/lib/prisma.ts:14`
  - `prisma/seed.ts:6`
- **Finalidade:** Conexão do Prisma Client com o banco PostgreSQL (pooled, porta 6543). A aplicação usa esta string para todas as queries em runtime.
- **Pode ficar vazia?** Não. Passada diretamente ao adapter — crash se ausente.
- **Fallback/Default:** Nenhum
- **Pode ser removida?** Não
- **Categoria:** Banco, Backend
- **Formato:** PostgreSQL connection string (URL)
- **Risco se ausente:** PrismaClient não consegue conectar ao banco. **Toda rota que acessa banco retorna 500.**

---

### DIRECT_URL
- **Valor exemplo:** `postgresql://postgres.ooczikpgogmcqzvctyik:8fup8Pu1A8nsp8vz@aws-1-sa-east-1.pooler.supabase.com:5432/postgres`
- **Obrigatória:** SIM (para migrations)
- **Opcional:** Não
- **Usada por:** `prisma.config.ts`
- **Arquivos:**
  - `prisma.config.ts:25`
- **Finalidade:** Conexão direta (sem pooling) usada pelo Prisma CLI para executar `prisma migrate deploy` durante o deploy. Não é usada pela aplicação em runtime.
- **Pode ficar vazia?** Não. `env('DIRECT_URL')` — Prisma CLI exige.
- **Fallback/Default:** Nenhum
- **Pode ser removida?** Não (enquanto houver migrations)
- **Categoria:** Banco, Deploy
- **Formato:** PostgreSQL connection string (URL)
- **Risco se ausente:** `prisma migrate deploy` falha no installCommand → deploy quebra. **Deploy 100% bloqueado.**

---

### NEXT_PUBLIC_APP_URL (obrigatória para SEO)
- **Valor exemplo:** `https://ponte-digitalv4.vercel.app`
- **Obrigatória:** Sim (para SEO correto)
- **Opcional:** Sim (para funcionamento do app)
- **Usada por:** `sitemap.ts`, `robots.ts`, `layout.tsx`, `seed.ts`
- **Arquivos:**
  - `src/app/sitemap.ts:4`
  - `src/app/robots.ts:4`
  - `src/app/layout.tsx:8`
  - `prisma/seed.ts:87`
- **Finalidade:** URL base da aplicação para geração de sitemap.xml, robots.txt e metadados.
- **Pode ficar vazia?** Sim — usa fallback `'https://pontedigital.com.br'`
- **Fallback/Default:** `'https://pontedigital.com.br'`
- **Pode ser removida?** Sim, mas SEO fica incorreto
- **Categoria:** Frontend, Deploy
- **Formato:** URL HTTPS
- **Risco se ausente:** Sitemap e robots.txt apontam para `pontedigital.com.br` em vez da URL real. Apenas impacto em SEO.

---

### SEED_ADMIN_EMAIL (obrigatória para seed)
- **Valor exemplo:** `kelven@pontedigital.com.br`
- **Obrigatória:** SIM (para executar seed)
- **Opcional:** Sim (apenas desenvolvimento)
- **Usada por:** `seed.ts`
- **Arquivos:**
  - `prisma/seed.ts:18`
- **Finalidade:** Email do admin da Empresa Zero. Usada apenas pelo script de seed.
- **Pode ficar vazia?** Não — `throw new Error('SEED_ADMIN_EMAIL é obrigatório')`
- **Fallback/Default:** Nenhum (throw)
- **Pode ser removida?** Sim, após seed executado uma vez
- **Categoria:** Backend
- **Formato:** Email string
- **Risco se ausente:** Seed não executa. **Apenas afeta ambiente de desenvolvimento.**

---

### SEED_ADMIN_PASSWORD (obrigatória para seed)
- **Valor exemplo:** `Ponte@2026`
- **Obrigatória:** SIM (para executar seed)
- **Opcional:** Sim (apenas desenvolvimento)
- **Usada por:** `seed.ts`
- **Arquivos:**
  - `prisma/seed.ts:19`
- **Finalidade:** Senha do admin da Empresa Zero. Usada apenas pelo script de seed.
- **Pode ficar vazia?** Não — `throw new Error('SEED_ADMIN_PASSWORD é obrigatório')`
- **Fallback/Default:** Nenhum (throw)
- **Pode ser removida?** Sim, após seed executado uma vez
- **Categoria:** Backend, Segurança
- **Formato:** String (senha)
- **Risco se ausente:** Seed não executa. **Apenas afeta ambiente de desenvolvimento.**

---

## Variáveis opcionais

### AI_PROVIDER
- **Valor exemplo:** `google`
- **Obrigatória:** Não
- **Usada por:** `ai-provider.ts`
- **Arquivos:** `src/lib/ai-provider.ts:158`
- **Finalidade:** Define qual provider de IA usar para o assistente.
- **Pode ficar vazia?** Sim — fallback para `'google'`
- **Fallback/Default:** `'google'`
- **Valores aceitos:** `google`, `groq`, `anthropic`, `noop`
- **Categoria:** IA
- **Formato:** Enum string
- **Risco se ausente:** Usa Google Gemini como padrão. Sem impacto.

### GOOGLE_API_KEY
- **Valor exemplo:** `AIzaSy...`
- **Obrigatória:** Não (a menos que AI_PROVIDER = google)
- **Usada por:** `ai-provider.ts`
- **Arquivos:** `src/lib/ai-provider.ts:161`
- **Finalidade:** Chave da API Google Gemini para o assistente IA.
- **Pode ficar vazia?** Sim — cai para NoopProvider
- **Fallback/Default:** Nenhum (se ausente e google, NoopProvider)
- **Categoria:** IA, Terceiros
- **Formato:** API key string
- **Risco se ausente:** Assistente IA retorna respostas vazias. Sistema continua funcional.

### GROQ_API_KEY
- **Valor exemplo:** `gsk_...`
- **Obrigatória:** Não (a menos que AI_PROVIDER = groq)
- **Usada por:** `ai-provider.ts`
- **Arquivos:** `src/lib/ai-provider.ts:166`
- **Finalidade:** Chave da API Groq para o assistente IA.
- **Pode ficar vazia?** Sim
- **Fallback/Default:** Nenhum
- **Categoria:** IA, Terceiros
- **Formato:** API key string
- **Risco se ausente:** Provider groq sem chave → NoopProvider.

### ANTHROPIC_API_KEY
- **Valor exemplo:** `sk-ant-...`
- **Obrigatória:** Não (a menos que AI_PROVIDER = anthropic)
- **Usada por:** `ai-provider.ts`
- **Arquivos:** `src/lib/ai-provider.ts:171`
- **Finalidade:** Chave da API Anthropic para o assistente IA.
- **Pode ficar vazia?** Sim
- **Fallback/Default:** Nenhum
- **Categoria:** IA, Terceiros
- **Formato:** API key string
- **Risco se ausente:** Provider anthropic sem chave → NoopProvider.

### AI_MODEL
- **Valor exemplo:** `gemini-2.5-flash`
- **Obrigatória:** Não
- **Usada por:** `gemini-provider.ts`, `ai-provider.ts`
- **Arquivos:**
  - `src/lib/providers/gemini-provider.ts:33`
  - `src/lib/ai-provider.ts:66,121`
- **Finalidade:** Modelo específico do provider ativo para o assistente IA.
- **Pode ficar vazia?** Sim — cada provider tem fallback
- **Fallback/Default:**
  - Gemini: `'gemini-2.5-flash'`
  - Groq: `'llama-3.3-70b-versatile'`
  - Anthropic: `'claude-sonnet-4-6'`
- **Categoria:** IA
- **Formato:** String (nome do modelo)
- **Risco se ausente:** Usa modelo padrão de cada provider. Cobre todos os casos.

---

## Variáveis que podem ser removidas

Nenhuma. Todas as variáveis do `.env` atual são utilizadas por pelo menos um arquivo do projeto.

---

## Variáveis duplicadas

Nenhuma.

---

## Variáveis sem uso

Nenhuma.

---

## Variáveis que precisam ser renomeadas

Nenhuma.

---

## Variáveis que NÃO devem estar na Vercel

### NODE_ENV
- **Motivo:** A Vercel já define `NODE_ENV=production` automaticamente durante o build. Se definida manualmente com valor diferente (ex: `staging`, `prod`), o Next.js emite warning e pode ter comportamento imprevisível.
- **Ação:** REMOVER das Environment Variables da Vercel (se estiver configurada manualmente).

---

## Tabela resumo

| VARIÁVEL | OBRIGATÓRIA | USADA POR | ARQUIVOS | RISCO SE AUSENTE |
|---|---|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | SIM | proxy, supabase, supabase-browser, criar-conta, seed | 5 arquivos | Sistema 100% inoperante |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | SIM | proxy, supabase, supabase-browser | 3 arquivos | Sistema 100% inoperante |
| `SUPABASE_SERVICE_ROLE_KEY` | SIM | criar-conta, seed | 2 arquivos | Criação de conta quebra |
| `DATABASE_URL` | SIM | prisma, seed | 2 arquivos | Toda query ao banco quebra |
| `DIRECT_URL` | SIM (migrations) | prisma.config | 1 arquivo | Deploy quebra (migrate falha) |
| `NEXT_PUBLIC_APP_URL` | SIM (SEO) | sitemap, robots, layout, seed | 4 arquivos | SEO incorreto (fallback para pontedigital.com.br) |
| `AI_PROVIDER` | Não | ai-provider | 1 arquivo | Usa google como padrão |
| `GOOGLE_API_KEY` | Não* | ai-provider | 1 arquivo | IA retorna vazio (NoopProvider) |
| `GROQ_API_KEY` | Não | ai-provider | 1 arquivo | Provider groq quebra |
| `ANTHROPIC_API_KEY` | Não | ai-provider | 1 arquivo | Provider anthropic quebra |
| `AI_MODEL` | Não | gemini-provider, ai-provider | 2 arquivos | Usa modelo padrão de cada provider |
| `SEED_ADMIN_EMAIL` | SIM (seed) | seed | 1 arquivo | Seed não executa |
| `SEED_ADMIN_PASSWORD` | SIM (seed) | seed | 1 arquivo | Seed não executa |
| `NODE_ENV` | **NÃO MANTER** | Vercel gerencia | — | Warning se definida manualmente |

*`GOOGLE_API_KEY` é obrigatória se `AI_PROVIDER=google` (padrão). Caso contrário, opcional.

---

## Observações de segurança

1. **`SUPABASE_SERVICE_ROLE_KEY`** — É uma chave de nível administrativo. Concede acesso total ao Supabase Auth e banco de dados. **NUNCA** deve ser exposta ao frontend. Na Vercel, deve ser marcada como "Secret".

2. **`DATABASE_URL`** — Contém credenciais de banco de dados em texto plano. Deve ser tratada como secreta.

3. **`DIRECT_URL`** — Mesmas credenciais de `DATABASE_URL`. Deve ser tratada como secreta.

4. **`SEED_ADMIN_PASSWORD`** — Senha do admin. Armazenar como secreta. Remover da Vercel após seed executado.

5. **`GOOGLE_API_KEY`** — Chave de API. Tratar como secreta, embora seja menos crítica que as anteriores.

6. **Nenhuma variável `NEXT_PUBLIC_` contém segredo** — `NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_ANON_KEY` são valores públicos por design.

7. **Nenhum segredo hardcoded no código** — Todas as credenciais vêm de variáveis de ambiente.

---

## Ordem de configuração recomendada na Vercel

### Obrigatórias (7 — sem elas o deploy falha ou o sistema quebra):
1. `NEXT_PUBLIC_SUPABASE_URL`
2. `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. `SUPABASE_SERVICE_ROLE_KEY` (secret)
4. `DATABASE_URL` (secret)
5. `DIRECT_URL` (secret)
6. `NEXT_PUBLIC_APP_URL`
7. `GOOGLE_API_KEY` (secret) — recomendado mesmo que opcional, para o assistente funcionar

### Opcionais para IA (adicione se necessário):
8. `AI_PROVIDER` — apenas se quiser mudar de google
9. `AI_MODEL` — apenas se quiser modelo diferente do padrão
10. `GROQ_API_KEY` — apenas se AI_PROVIDER=groq
11. `ANTHROPIC_API_KEY` — apenas se AI_PROVIDER=anthropic

### Seed (apenas desenvolvimento):
12. `SEED_ADMIN_EMAIL`
13. `SEED_ADMIN_PASSWORD`

### NÃO configurar:
- ❌ `NODE_ENV` — Vercel gerencia automaticamente
