# Blueprint — Deploy

> **Programa 13 — Blueprint de Implementação**
> Plataforma: Vercel (via `vercel.json`) + Supabase (PostgreSQL)
> Estado atual: Sem CI/CD configurado, sem testes automatizados

---

## 1. Build

```bash
# Comandos (package.json)
npm run dev      # next dev
npm run build    # next build
npm run start    # next start
npm run lint     # next lint
npm run typecheck # tsc --noEmit
```

### Pipeline de CI (plano)

```
1. Push para main/develop
2. npm ci (instala dependências exatas)
3. npm run typecheck (verifica tipos)
4. npm run lint (verifica estilo)
5. npm run test (testes unitários + integração)
6. npx prisma generate (gera Prisma Client)
7. npx prisma migrate deploy (aplica migrations pendentes)
8. next build
9. Deploy para Vercel (produção ou preview)
```

---

## 2. Migrações

```bash
# Desenvolvimento
npx prisma migrate dev --name descricao_da_mudanca

# Produção
npx prisma migrate deploy
```

### Regras

1. Nunca editar migration já aplicada — criar nova
2. Toda migration deve ser reversível (down não é obrigatório, mas recomendado)
3. Testar migration em staging antes de produção
4. Migrações são aplicadas automaticamente no build da Vercel (via `prisma.config.ts`)

---

## 3. Rollback

| Tipo | Estratégia |
|------|-----------|
| **Código** | Vercel Instant Rollback — reverter para deploy anterior |
| **Banco (migration)** | `prisma migrate diff` + SQL manual de reversão |
| **Feature Flag** | Desligar feature flag — não requer deploy |
| **Dados (soft delete)** | Restaurar registro: `UPDATE tabela SET deletedAt = null WHERE id = X` |

---

## 4. Feature Flags

Arquivo: `sistema/src/engine/feature-flags.ts`

| Flag | Padrão | Quando desligar |
|------|--------|-----------------|
| `enablePipelineSubscribers` | false | Se event bus tiver bugs |
| `enableSubFluxosConversa` | false | Se IA estiver instável |
| `enableCognitivePipelineStore` | true | Se pipeline store causar lentidão |

### Como adicionar nova flag

1. Adicionar em `feature-flags.ts`
2. Usar `featureFlags.isEnabled('nomeDaFlag')` no código
3. Valor padrão sempre false para flags experimentais

---

## 5. Verificações Pós-Deploy

| O quê | Como | Quem |
|-------|------|------|
| Health check | `GET /api/health` → 200 | Pipeline CI |
| Pipeline carregando | `GET /dashboard` → 200 + dados cognitivos | Manual |
| Login funcionando | Login com usuário de teste | Manual |
| Conversa funcionando | `GET /api/conversa` → 200 | Manual |
| Event Bus ativo | Log: "EventBus inicializado" | Logs |

---

## 6. Variáveis de Ambiente

| Variável | Onde | Obrigatória |
|----------|------|-------------|
| `DATABASE_URL` | Supabase PostgreSQL | Sim |
| `DIRECT_URL` | SupgreSQL (migrations) | Sim |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase Auth | Sim |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase Auth | Sim |
| `ANTHROPIC_API_KEY` | Anthropic (IA) | Sim |
| `NEXT_PUBLIC_APP_URL` | App URL | Sim |
