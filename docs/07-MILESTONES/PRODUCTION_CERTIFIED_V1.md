# PRODUCTION CERTIFIED V1 — Certidão de Nascimento da Produção

> **STATUS OFICIAL: produção publicada e sincronizada com `main`.**
> **Data:** 2 de agosto de 2026
> **Programa:** P56 — Produção Certificada e Operação Founder V1

---

## 1. Dados oficiais da publicação

| Item | Valor |
|------|-------|
| **URL oficial** | `https://ponte-digital.vercel.app` |
| **Projeto Vercel** | `ponte-digital` |
| **Equipe Vercel** | `ponte-digital1` |
| **Conta de deploy** | `pontedigitalsc-1314` |
| **Deployment ID** | `dpl_6SeqxXUU5JF2c9kU9nStekZi6fdS` |
| **Commit publicado** | `ca4a099` (branch `main`) — contém P50 → P55 |
| **Rótulo do commit** | `P55 — Certificação Founder Ready V1` |
| **Fecha** | 2026-08-02 |
| **Runtime** | Node.js 24.x (lambda, região `iad1` por CDN Edge) |
| **Ambiente** | `production` (confirmado por `/api/health`) |

---

## 2. Como foi publicado

1. CLI Vercel autenticada com a conta proprietária (`pontedigitalsc-1314`, digital OAuth device flow).
2. Diretório `sistema/` vinculado ao projeto existente `ponte-digital` (não foi criado projeto novo).
3. Root Directory `sistema/` (verificado: build/install definitions em `sistema/vercel.json`).
4. `vercel deploy --prod --yes --scope ponte-digital1` a partir da raiz do repositório.
5. Resultado: `"status": "ok"`, `"target": "production"`, `readyState READY`.

> Opção manual alternativa aqui documentada para o time (após configurar autorização): na raiz do repo, `npx vercel deploy --prod --yes --scope ponte-digital1`.

---

## 3. Sincronização produção == main (Etapa 2) — CONFIRMADO

| Verificação | Status |
|-------------|--------|
| Commit publicado = `main` | ✅ `git rev-parse --short HEAD` = `ca4a099`; deploy deste commit |
| Migrations sincronizadas | ✅ `prisma migrate status`: "5 migrations … up to date", sem `deploy` pendente |
| Schema | ✅ sem alteração de schema de P50 a P55 |
| Build | ✅ `npm run build` limpo (P55): 56 páginas, 54 rotas |
| TypeScript | ✅ `npx tsc --noEmit` — 0 erros |
| Assets / cache | ✅ deploy único (Vercel rebuild) |
| Rotas | ✅ todas recompiladas como lambda |

---

## 4. Auditoria em produção (Etapa 3) — smoke de rotas públicas

Testado na URL de produção (`https://ponte-digital.vercel.app`):

| Rota | Status |
|------|--------|
| `/robots.txt` | 200 |
| `/sitemap.xml` | 200 |
| `/manifest.webmanifest` | 200 |
| `/login` | 200 |
| `/criar-conta` | 200 |
| `/reset-password` | 200 |
| `/diagnostico` | 200 |
| `/api/health` | 200 (`{"status":"ok","ambiente":"production"}`) |

> As rotas autenticadas (conversa, clientes, financeiro, jornada, centro de decisão etc.) exigem sessão — serão exercitadas por **um Founder real** no fluxo operacional (ETAPA 3 completa é executável por humano; as validações de código correspondentes estão detalhadas na seção 5).

---

## 5. Validações por código (devindependents de interação web) — aprovados

| Etapa | Validação | Resultado |
|-------|-----------|-----------|
| **P5** — Auditoria da IA | `/api/assistente`: timeout de 30s + `FALHA_GENTIL` em erro/stream vazio; `/api/conversa` finaliza sem travar; chamadas opcionais com `.catch(() => null)` | PASS |
| **P6** — Resiliência | `handleApiError` nunca exibe stack (`exposeStack` off); erro não tipado → resposta amigável "Não consegui fazer isso agora" + `correlationId`, nunca detalhe técnico | PASS |
| **P7** — Performance | `npm run build` limpo; 54 rotas; sem redirecionamentos; assets estáticos | PASS |
| **P1/P2** | Deploy feito + Produção == Main | PASS |
| **Tenant guard** | P55 já corrigira escritas por `where: { id, empresaId }`; modelos-filho isentos | PASS |

---

## 6. Diferenças encontradas e corrigidas (Etapa 4)

| Diferença/descoberta | Resolução |
|----------------------|-----------|
| Produção rodava P47.1 (main atrasada em P50–P55) | Deploy de produção executado — produção == `main` `ca4a099` |
| Conta Vercel sem permissão de produção (`kelvinisk-cub`) | Trocada para a conta autorra (`pontedigitassc-1314`) |
| `.vercel` e segredos locais (.env.local) no working tree origem | Adicionados ao `.gitignore` (`.vercel`, `.env*`); nada de segredo no repo |
| Conflito de URL nos docs (`pontedigital.com.br` vs real) | Registrado como divergência documental (KNOWN_ISSUES) |
| Root Directory duplicado ao rodar deploy de dentro de `sistema/` | Deploy executado a partir da raiz do repositório |

---

## 7. Checklist operacional (Etapa 11) — estado

- [x] **Domínio público ativo** — `ponte-digital.vercel.app` (domínio a configurar: `pontedigital.com.br` — registrado como evolução futura)
- [ ] **E-mail profissional** — a definir (fora do repo)
- [ ] **CNPJ / pessoa jurídica** — a definir
- [ ] **Política de privacidade / Termos de uso / LGPD** — a criar/publicar (tem meu conhecimento; fora do repo)
- [x] **Backups** — Supabase (banco gerenciado; documentar estratégia em OPS-BACKUP)
- [ ] **Monitoramento** — a ativar no Vercel (métricas/Alertas) + observabilidade
- [ ] **Analytics** — a ativar
- [x] **Logs** — `logger.ts` ativo em API (error/warn com `correlationId`)
- [ ] **Suporte** — canal a definir

> Itens marcados como "a definir/a criar" são decisões de operação/humano, não de código, e foram apenas registrados — a ponte não bloqueia o início da operação por eles, mas devem ser tratados na Fase Operaacional.

---

## 8. Assinatura da certificação

- [x] Produção publicada (`main`) — `ca4b099` em produção
- [x] Sincronização produção == main
- [x] Migrations sincronizadas (5/5)
- [x] Build e TypeScript limpos
- [x] Smoke de rotas públicas em produção (200)
- [x] IA resiliente (P5/P6) por código
- [x] Segurança: sem segredos no repositório; tenant guard ativo
- [x] Certidão registrada em `docs/07-MILESTONES/PRODUCTION_CERTIFIED_V1.md`

**A Ponte Digital deixa de ser desenvolvimento e passa a ser produção.**

> Ver também: `docs/05-OPERATIONS/P55/FOUNDER_READY_V1.md`, `docs/02-PRODUCT/CURRENT_PRODUCT.md` (STATUS), `docs/05-OPERATIONS/KNOWN_ISSUES.md`.