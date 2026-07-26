# Runbook Operacional

> **WP-4.6** — Release Program v1.0, Programa 4
> Data: 24/07/2026 | Status: Concluído

---

## Índice

1. [Deploy](#1-deploy)
2. [Rollback](#2-rollback)
3. [Incidente](#3-incidente)
4. [Recuperação](#4-recuperação)
5. [Troca de Credenciais](#5-troca-de-credenciais)
6. [Manutenção](#6-manutenção)
7. [Resposta a Falhas Comuns](#7-resposta-a-falhas-comuns)
8. [Comandos Úteis](#8-comandos-úteis)

---

## 1. Deploy

### Deploy Manual (via Vercel CLI)

```bash
cd sistema
vercel --prod
```

### Deploy via Git

```
1. git push origin main
2. Vercel detecta push e faz deploy automático
3. Verificar: curl https://pontedigital.com.br/api/health
```

### Pré-requisitos

- [ ] `tsc --noEmit` passando
- [ ] `npm run lint` passando
- [ ] Migrations prontas: `npx prisma migrate dev` local
- [ ] Variáveis configuradas no Vercel

---

## 2. Rollback

### Rollback de Aplicação (Vercel)

```
Vercel Dashboard → Deployments
→ Último deploy estável → ⋮ → Promote to Production
```

### Rollback de Banco (Prisma)

```bash
# Ver histórico de migrations
npx prisma migrate status

# Reverter uma migration
npx prisma migrate resolve --rolled-back "20260724000000_nome_da_migration"

# Reaplicar migration correta
npx prisma migrate deploy
```

### Rollback Completo (App + Banco)

```
1. Rollback da aplicação no Vercel (5 min)
2. Restaurar banco do backup (se necessário, 30 min)
3. Verificar health check
4. Verificar dados críticos
```

---

## 3. Incidente

### Classificação

| Severidade | Exemplo | Resposta | SLA |
|-----------|---------|----------|-----|
| **P0 — Crítico** | Site fora do ar, vazamento de dados | Imediata | < 1h |
| **P1 — Alto** | Funcionalidade principal quebrada | Urgente | < 4h |
| **P2 — Médio** | Funcionalidade secundária quebrada | Normal | < 24h |
| **P3 — Baixo** | Bug cosmético, melhoria | Agendado | Próximo sprint |

### Fluxo de Incidente

```
1. DETECTAR — Alerta ou reporte de usuário
2. CLASSIFICAR — P0/P1/P2/P3
3. RESPONDER — Abrir comunicação no canal do time
4. MITIGAR — Rollback ou hotfix
5. INVESTIGAR — Logs, métricas, correlação
6. CORRIGIR — Fix definitivo
7. REVISAR — Post-mortem

Ferramentas de diagnóstico:
- /api/health — status da aplicação
- Logs do Vercel — runtime logs
- Supabase Dashboard — banco de dados
```

---

## 4. Recuperação

### Falha de Banco

```bash
# 1. Verificar conectividade
psql "$DATABASE_URL" -c "SELECT 1"

# 2. Verificar tamanho
psql "$DATABASE_URL" -c "SELECT pg_database_size('postgres')"

# 3. Verificar conexões ativas
psql "$DATABASE_URL" -c "SELECT count(*) FROM pg_stat_activity"

# 4. Se PITR habilitado: restore via Supabase Dashboard
# 5. Se não: restore via pg_dump
```

### Falha de Autenticação

```bash
# 1. Verificar Supabase Auth
curl -I https://ooczikpgogmcqzvctyik.supabase.co/auth/v1/settings

# 2. Verificar cookie de sessão
# No navegador: Application → Cookies → sb-*-auth-token

# 3. Se Supabase Auth indisponível:
# - Aplicação não consegue autenticar novos usuários
# - Sessões existentes continuam válidas (cache local)
# - Monitorar até恢复正常ção
```

### Falha da IA (Anthropic)

```
Sintoma: Assistente não responde ou retorna erro 500
Ação:
1. Verificar ANTHROPIC_API_KEY no Vercel
2. Verificar status em status.anthropic.com
3. Se API key expirou: renovar
4. Se Anthropic indisponível: assistente fica em fallback (erro amigável)
```

---

## 5. Troca de Credenciais

### Service Role Key (Supabase)

```bash
1. Supabase Dashboard → Settings → API → Rotate service_role key
2. Copiar nova chave
3. Vercel → Project Settings → Environment Variables → atualizar
4. Redeploy: vercel --prod
5. Testar: POST /api/auth/criar-conta
```

### Database Password

```bash
1. Supabase Dashboard → Settings → Database → Reset DB password
2. Atualizar DATABASE_URL e DIRECT_URL no Vercel
3. Verificar conexão: npx prisma db push
4. Redeploy
```

### Anthropic API Key

```bash
1. console.anthropic.com → API Keys
2. Gerar nova chave
3. Vercel → Project Settings → atualizar ANTHROPIC_API_KEY
4. Testar assistente
```

---

## 6. Manutenção

### Adicionar Migration

```bash
cd sistema
npx prisma migrate dev --name descricao_da_mudanca
# Revisar o SQL gerado em prisma/migrations/
npx prisma migrate deploy
```

### Atualizar Dependências

```bash
cd sistema
npm outdated
npm update    # atualizações seguras (patch/minor)
npm install   # verificar resolução
npm run build # verificar compilação
```

### Limpeza de Dead Letters

```bash
# A DLQ armazena eventos com falha em memória + banco.
# Para limpar manualmente via SQL:
DELETE FROM "DeadLetter" WHERE "criadoEm" < NOW() - INTERVAL '30 days';
```

---

## 7. Resposta a Falhas Comuns

| Problema | Causa Provável | Diagnóstico | Solução |
|----------|---------------|-------------|---------|
| **500 em API** | Erro não tratado | Logs Vercel | Ver `handleApiError`, correlationId |
| **Usuário não autentica** | Cookie expirado ou Supabase Auth down | `getSession()` | Logout + login |
| **Dados errados na tela** | Query sem empresaId | Logs do prismaSeguro | Verificar service |
| **Assistente não responde** | Anthropic key inválida ou API down | Logs `/api/assistente` | Verificar key |
| **Build falha** | TypeScript error ou dependência quebrada | Logs do build | `tsc --noEmit` local |
| **Migration falha** | Dados inconsistentes | `prisma migrate status` | Resolver manualmente |
| **Slow query** | Index ausente | Supabase Query Performance | Adicionar index |
| **Rate limit atingido** | Muitas requisições | Header `X-RateLimit-Remaining` | Aguardar ou aumentar limite |

---

## 8. Comandos Úteis

```bash
# Aplicação
npm run dev             # Desenvolvimento
npm run build           # Build produção
npm run start           # Servir produção local
npm run lint            # Lint
npm run typecheck       # TypeScript check

# Banco
npx prisma generate     # Gerar client
npx prisma migrate dev  # Criar migration (dev)
npx prisma migrate deploy # Aplicar migration (prod)
npx prisma db push      # Push schema direto 
npx prisma studio       # UI do banco

# Deploy
npx vercel              # Deploy preview
npx vercel --prod       # Deploy produção
npx vercel rollback     # Rollback

# Diagnóstico
curl https://pontedigital.com.br/api/health
psql "$DIRECT_URL" -c "SELECT count(*) FROM usuarios;"
```
