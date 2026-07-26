# Segurança Operacional — Checklist de Pré-Produção

> **WP-4.1** — Release Program v1.0, Programa 4 (Deploy, Go-Live e Operação Assistida)
> Data: 24/07/2026 | Status: **AGUARDANDO AÇÃO HUMANA**

---

## Objetivo

Resolver todas as ações humanas pendentes de segurança antes do Go-Live. Este checklist deve ser executado por um operador com acesso administrativo aos serviços (Supabase, Vercel, PostgreSQL).

---

## 1. Rotação de Chaves

### 1.1 Supabase Service Role Key

**Ação:** Rotacionar imediatamente.

- [ ] Acessar [Supabase Dashboard](https://supabase.com) → Project `ooczikpgogmcqzvctyik` → Settings → API
- [ ] Clicar "Rotate" ao lado de `service_role` key
- [ ] Copiar a nova chave
- [ ] Atualizar no Vercel: Project Settings → Environment Variables → `SUPABASE_SERVICE_ROLE_KEY`
- [ ] Remover do `.env` local (manter apenas placeholder)
- [ ] Confirmar que o `criar-conta` route funciona com a nova chave

**Risco:** Chave atual dá acesso administrativo total ao Supabase Auth (criar/excluir usuários, bypass RLS). Qualquer pessoa com acesso ao repositório (passado ou presente) pode ter copiado esta chave.

### 1.2 Database Password

**Ação:** Rotacionar imediatamente.

- [ ] Acessar [Supabase Dashboard](https://supabase.com) → Project Settings → Database → Database password → "Reset database password"
- [ ] Copiar a nova senha
- [ ] Atualizar `DATABASE_URL` e `DIRECT_URL` no Vercel com a nova senha
- [ ] Rodar `npx prisma db push` para validar conexão
- [ ] Remover do `.env` local (manter placeholder)

### 1.3 Anthropic API Key

**Ação:** Configurar chave real.

- [ ] Obter chave da API Anthropic (se disponível)
- [ ] Configurar como `ANTHROPIC_API_KEY` no Vercel
- [ ] Se não houver chave, confirmar que o assistente IA está desabilitado ou em fallback

---

## 2. Variáveis de Ambiente

### 2.1 Configuração no Vercel

- [ ] `NEXT_PUBLIC_SUPABASE_URL` — valor de produção
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` — chave anônima de produção (pode ser a mesma do dev)
- [ ] `SUPABASE_SERVICE_ROLE_KEY` — NOVA chave rotacionada
- [ ] `DATABASE_URL` — connection string via pooler
- [ ] `DIRECT_URL` — connection string direta (para migrations)
- [ ] `ANTHROPIC_API_KEY` — chave real ou placeholder
- [ ] `NEXT_PUBLIC_APP_URL` — URL pública de produção (ex: `https://pontedigital.com.br`)

### 2.2 Ambientes

| Variável | Desenvolvimento | Staging | Produção |
|----------|----------------|---------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase dev | Supabase prod | Supabase prod |
| `SUPABASE_SERVICE_ROLE_KEY` | Dev key | Prod key | Prod key |
| `DATABASE_URL` | Dev DB | Staging DB | Production DB |
| `ANTHROPIC_API_KEY` | dummy | Real key | Real key |
| `NEXT_PUBLIC_APP_URL` | localhost:3000 | staging.pontedigital.com.br | pontedigital.com.br |

---

## 3. Permissões do Banco

- [ ] Verificar usuário PostgreSQL: não usar `postgres` (superuser) em produção
- [ ] Criar role dedicada `app_user` com permissões mínimas (CRUD nas tabelas, sem DDL)
- [ ] Atualizar `DATABASE_URL` para usar `app_user`
- [ ] Manter `DIRECT_URL` com `postgres` apenas para migrations

### Script de exemplo para criar role:
```sql
CREATE ROLE app_user WITH LOGIN PASSWORD 'senha_segura';
GRANT USAGE ON SCHEMA public TO app_user;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO app_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO app_user;
```

---

## 4. Permissões Supabase

- [ ] Revisar usuários em Authentication → Users (remover contas de teste)
- [ ] Verificar Settings → API → JWT Settings (confirmação de expiração padrão 3600s)
- [ ] Configurar taxa de rate limiting em Authentication → Settings
- [ ] Confirmar que `Sign Up` está desabilitado se o cadastro for apenas via ADMIN

---

## 5. Permissões Vercel

- [ ] Revisar membros do time Vercel
- [ ] Configurar Protection Bypass para branches de preview (se aplicável)
- [ ] Ativar Password Protection no deployment de preview (para ambientes não-públicos)

---

## 6. Git e Repositório

- [ ] **Confirmar:** `.gitignore` incluí `.env` (já corrigido no WP-3.1)
- [ ] **Verificar:** git log para confirmar que `.env` nunca foi commitado
- [ ] Se `.env` foi commitado no passado:
  - [ ] Usar `git filter-branch` ou `bfg` para remover do histórico
  - [ ] Forçar push (`git push --force`) para todas as branches
  - [ ] Rotacionar todas as chaves (já listado acima)
- [ ] Criar `.env.example` com valores placeholder

---

## 7. Checklist de Segurança Operacional

```
□ 7.1 Service role key rotacionada
□ 7.2 Database password rotacionada
□ 7.3 Anthropic API key configurada
□ 7.4 Variáveis de ambiente configuradas no Vercel
□ 7.5 Role app_user criada no banco
□ 7.6 Role app_user em uso na DATABASE_URL
□ 7.7 Supabase Authentication revisada
□ 7.8 Acesso ao Vercel revisado
□ 7.9 .env nunca foi commitado (histórico verificado)
□ 7.10 .env.example criado
□ 7.11 CSP header configurado (ARCH-009)
□ 7.12 Rate limiting revisado
```

---

## Riscos

| Risco | Probabilidade | Impacto | Mitigação |
|-------|--------------|---------|-----------|
| Chave vazada usada antes da rotação | Média | Crítico | Rotacionar imediatamente após ler este documento |
| Role app_user sem permissões corretas | Média | Alto | Testar todas as queries após criar role |
| .env no histórico do git | Baixa | Crítico | Verificar com `git log --all --full-history -- .env` |
