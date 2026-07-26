# Backup e Recuperação — Estratégia e Plano

> **WP-4.3** — Release Program v1.0, Programa 4
> Data: 24/07/2026 | Status: **AGUARDANDO CONFIGURAÇÃO**

---

## Estratégia de Backup

### Backup Automático (Supabase Pro)

O Supabase Pro inclui backup automático diário (Point-in-Time Recovery) com retenção de 7 dias para projetos ativados com PITR. **Não há custo adicional — é necessário apenas ativar nas configurações do projeto.**

### Verificação

- [ ] Acessar [Supabase Dashboard](https://supabase.com) → Project → Database → Backups
- [ ] Verificar se "Enable Point-in-Time Recovery" está ativo
- [ ] Se não estiver, ativar PITR (gera custo adicional)

---

## Frequência e Retenção

| Tipo | Frequência | Retenção | Método |
|------|-----------|----------|--------|
| **PITR (Point-in-Time)** | Contínuo (WAL) | 7 dias | Supabase nativo |
| **Snapshot manual** | Semanal | 30 dias | `pg_dump` |
| **Schema (Prisma)** | A cada migration | Permanente | Git (migrations em `prisma/migrations/`) |

---

## Procedimento de Restauração

### 1. PITR (Point-in-Time Recovery)

```
Supabase Dashboard → Database → Backups → Restore
→ Selecionar timestamp → Confirmar restauração
```

**Tempo estimado:** 15-60 minutos (depende do volume)
**RPO:** < 5 minutos (WAL contínuo)
**RTO:** ~30 minutos

### 2. Restauração via pg_dump

```bash
# Backup (executar semanalmente)
pg_dump "postgresql://user:pass@host:5432/postgres" \
  --no-owner --no-acl \
  --file=backup-$(date +%Y-%m-%d).sql

# Restore (em novo banco)
psql "postgresql://user:pass@new-host:5432/postgres" < backup-2026-07-24.sql

# Após restore, rodar migrations pendentes
npx prisma migrate deploy
```

### 3. Rollback de Schema

```bash
# Reverter para migration anterior
npx prisma migrate resolve --rolled-back "nome-da-migration"

# Ou restaurar banco do backup e reaplicar migrations
```

---

## Disaster Recovery

### Cenários

| Cenário | Ação | RPO | RTO |
|---------|------|-----|-----|
| Perda de dados (erro humano) | PITR + replay de eventos | < 5 min | 30 min |
| Corrupção de schema | Restore de snapshot + migrations | 7 dias | 1 hora |
| Falha total do Supabase | Restore em novo projeto | 7 dias | 2 horas |
| Erro em deploy | Rollback via Vercel | N/A | 5 min |

### Procedimento de DR Completo

1. **Identificar falha** — Verificar logs em produção
2. **Decidir recovery** — PITR ou snapshot?
3. **Executar restore** — Seguir procedimento acima
4. **Validar dados** — Verificar integridade dos registros
5. **Reaplicar eventos** — Replay de eventos da DLQ (se aplicável)
6. **Testar funcionalidade** — Health check + fluxo crítico

---

## Simulação de Recuperação

### Checklist de Simulação (executar antes do Go-Live)

- [ ] Fazer backup manual com `pg_dump`
- [ ] Criar banco de teste temporário
- [ ] Restaurar o backup no banco de teste
- [ ] Rodar `npx prisma migrate deploy`
- [ ] Conectar aplicação ao banco restaurado
- [ ] Verificar health check
- [ ] Verificar login de usuário de teste
- [ ] Verificar dados críticos (clientes, transações)
- [ ] Destruir banco de teste

---

## Backups Automatizados

### Opção 1: Supabase PITR (Recomendado)

Mais simples e confiável. Ativar no Dashboard do Supabase.

### Opção 2: Script semanal via Cron (Backup manual)

```bash
#!/bin/bash
# backup-semanal.sh — Executar semanalmente (ex: domingo 03:00)
BACKUP_DIR="/backups/ponte-digital"
DB_URL="postgresql://..."

mkdir -p "$BACKUP_DIR"
pg_dump "$DB_URL" --no-owner --no-acl \
  --file="$BACKUP_DIR/backup-$(date +%Y-%m-%d).sql"

# Manter apenas últimos 30 dias
find "$BACKUP_DIR" -name "*.sql" -mtime +30 -delete
```

---

## Pendências

1. **Ativar PITR no Supabase** (se não estiver ativo)
2. **Validar restore** com simulação
3. **Documentar RPO/RTO aceitos** com o time de produto
