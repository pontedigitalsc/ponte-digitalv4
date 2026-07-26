# Go-Live Checklist v1.0

> **WP-4.7** — Release Program v1.0, Programa 4
> Data: 24/07/2026 | Status: **AGUARDANDO AÇÃO HUMANA**

---

## Instruções

Este checklist deve ser preenchido por um operador humano antes da liberação para produção. Cada item deve ser marcado como:

- **OK** — verificado e aprovado
- **N/A** — não se aplica
- **PENDENTE** — não verificado ou não resolvido

**Regra:** Zero pendências para Go-Live. Itens N/A devem ser justificados.

---

## Fase 1 — Segurança

| # | Item | Responsável | Status |
|---|------|------------|--------|
| 1.1 | Service role key rotacionada (Supabase) | | |
| 1.2 | Database password rotacionada | | |
| 1.3 | Anthropic API key configurada (não dummy) | | |
| 1.4 | Role `app_user` criada no PostgreSQL | | |
| 1.5 | `DATABASE_URL` usa role `app_user` | | |
| 1.6 | `.env` não está no repositório | | |
| 1.7 | `.env.example` existe com placeholders | | |
| 1.8 | Histórico git verificado (`.env` nunca commitado) | | |
| 1.9 | CSP headers configurados (ARCH-009) | | |
| 1.10 | Acesso ao Vercel revisado (membros do time) | | |

---

## Fase 2 — Infraestrutura

| # | Item | Responsável | Status |
|---|------|------------|--------|
| 2.1 | Domínio configurado no Vercel | | |
| 2.2 | SSL/TLS ativo (automático Vercel) | | |
| 2.3 | DNS apontando para Vercel | | |
| 2.4 | Ambiente de staging verificado | | |
| 2.5 | Variáveis de ambiente configuradas no Vercel | | |
| 2.6 | Build passando sem erros | | |
| 2.7 | Health check respondendo (`/api/health`) | | |

---

## Fase 3 — Backup e Recuperação

| # | Item | Responsável | Status |
|---|------|------------|--------|
| 3.1 | PITR ativado no Supabase (se aplicável) | | |
| 3.2 | Backup manual realizado (pg_dump) | | |
| 3.3 | Teste de restore realizado e validado | | |
| 3.4 | RPO documentado (< 5 min com PITR) | | |
| 3.5 | RTO documentado (~30 min) | | |

---

## Fase 4 — CI/CD

| # | Item | Responsável | Status |
|---|------|------------|--------|
| 4.1 | GitHub Actions workflow configurado | | |
| 4.2 | Lint passando | | |
| 4.3 | Typecheck passando | | |
| 4.4 | Build passando | | |
| 4.5 | VERCEL_TOKEN configurado no GitHub | | |
| 4.6 | Branch main protegida | | |

---

## Fase 5 — Observabilidade

| # | Item | Responsável | Status |
|---|------|------------|--------|
| 5.1 | Vercel Analytics ativado | | |
| 5.2 | Uptime monitor configurado (Better Stack/Pingdom) | | |
| 5.3 | Alerta de health check configurado | | |
| 5.4 | Logs acessíveis no Vercel Dashboard | | |
| 5.5 | Sentry configurado (opcional) | | |

---

## Fase 6 — Qualidade

| # | Item | Responsável | Status |
|---|------|------------|--------|
| 6.1 | `tsc --noEmit` zero erros | | |
| 6.2 | `npm run lint` zero erros | | |
| 6.3 | `npm run build` ok | | |
| 6.4 | Fluxo de login/testado em staging | | |
| 6.5 | Fluxo de cadastro/testado em staging | | |
| 6.6 | Assistente IA testado em staging | | |
| 6.7 | Health check testado | | |
| 6.8 | Vazamento de memória verificado (opcional) | | |

---

## Fase 7 — Documentação

| # | Item | Responsável | Status |
|---|------|------------|--------|
| 7.1 | Runbook operacional disponível | | |
| 7.2 | Checklist de segurança preenchido | | |
| 7.3 | Contato de suporte documentado | | |
| 7.4 | Plano de comunicação de incidentes | | |

---

## Fase 8 — Decisão Final

| # | Item | Responsável | Status |
|---|------|------------|--------|
| 8.1 | Todas as fases acima OK | | |
| 8.2 | GO-LIVE AUTORIZADO | | |
| 8.3 | Data/hora do Go-Live | | |

---

## Assinaturas

| Papel | Nome | Data |
|-------|------|------|
| **Responsável Técnico** | | |
| **Gestor de Produto** | | |
| **Operador de Deploy** | | |

---

## Pós-Go-Live (24h)

- [ ] Verificar logs de erro (zero 500 não esperados)
- [ ] Verificar health check (uptime > 99%)
- [ ] Verificar métricas de uso (Vercel Analytics)
- [ ] Coletar feedback dos primeiros usuários
