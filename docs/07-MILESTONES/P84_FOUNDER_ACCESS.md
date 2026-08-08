# P84 — FOUNDER ACCESS: IDENTIDADE E CAMADA DE PLATAFORMA

> **Status:** CONCLUÍDO (Fases B–G implementadas) — 8 de agosto de 2026
>
> Programa em paralelo ao P83 (visita de campo à Souza Mestrinho, sem código).
> ADR: `docs/04-DECISIONS/ADR/ADR-036-founder-access-plataforma.md`.

---

## 1. Objetivo

Criar a **camada de plataforma** da Ponte Digital: uma identidade distinta de quem **opera a ponte** (Founder Principal) versus quem **usa a ponte** (empresas clientes), e re-gate das áreas internas para essa camada — corrigindo a exposição de dados internos que existia porque o painel do fundador e `/admin/*` eram protegidos pelo mesmo `role: 'ADMIN'` das empresas.

## 2. Problema resolvido

- Qualquer usuário `ADMIN` de uma empresa cliente conseguia abrir `/painel-do-fundador` e `/admin/*` (painel, radar, diários, observatório, promoção de conhecimento);
- Não existia separação entre "quem é da plataforma" e "quem usa a plataforma";
- A permissão era decidida por `role` de empresa — contexto errado para patrimônio comum.

## 3. Critérios de aceite (simplificado)

- [x] `Usuario.platformRole` persistido no banco (enum `PlatformRole`) — identidade confiável;
- [x] Matriz de 5 permissões de plataforma, validada no servidor;
- [x] Páginas + APIs internas gateadas para Founder (re-gate);
- [x] Audit trail de escritas privilegiadas;
- [x] Health público mínimo + health detalhado privado;
- [x] Sidebar expõe "Plataforma" só para quem tem permissão (decisão do servidor).

## 4. O que foi implementado

### 4.1 Banco (migração `008_founder_access`)
- `enum PlatformRole ('FOUNDER_PRINCIPAL')` + coluna `usuarios.platformRole`;
- tabela `auditorias_plataforma` (sem tenant, agregada da plataforma; `usuarioId`, `email`, `acao`, `modulo`, `contexto`, `empresaId`, `detalhes` JSONB, `criadoEm`), com índices de `usuarioId`, `criadoEm`, `acao` e `usuarios_platformRole_idx`.

### 4.2 Código
- `src/lib/permissao-plataforma.ts` — **módulo puro** (sem imports): `PlataformaRole`, `PlataformaPermissao`, `PERMISSOES_PLATAFORMA`, `temPermissaoPlataforma`, `eFounderPrincipal`.
- `src/lib/plataforma.ts` — `temPermissaoPlataformaUsuario`, `usuarioEFounderPrincipal`, `registrarAuditoriaPlataforma`.
- `src/lib/authorize.ts` — nova `requirePlataforma(permissao)` para API routes (401/403).
- `scripts/provision-founder.ts` — bootstrap seguro (server-only env) que atribui `FOUNDER_PRINCIPAL` e grava auditoria.
- `src/types/index.ts` — `PlatformRole` + `platformRole` no `Usuario`.
- `package.json`: scripts `test:plataforma` e `founder:provision`; `.env.example` com `FOUNDER_BOOTSTRAP_*`.

### 4.3 Re-gate (páginas + APIs)
- Páginas → `requirePlataforma`/`temPermissaoPlataformaUsuario`:
  - `/painel-do-fundador` → `FOUNDER_VIEW_PLATFORM`
  - `/admin/radar-founders`, `/admin/diario-founder`, `/admin/diario-cientifico`, `/admin/cognitive-observatory` → `FOUNDER_VIEW_INTERNAL`
- APIs de plataforma → `requirePlataforma` + auditoria de escrita:
  - `api/painel-do-fundador` (GET → `FOUNDER_VIEW_INTERNAL`; POST → `FOUNDER_MANAGE_PLATFORM`)
  - `api/painel-do-fundador/revisar`, `api/painel-do-fundador/promover`, `api/painel-do-fundador/conhecimento/[id]` (PATCH/DELETE) → `FOUNDER_MANAGE_PLATFORM`
- Health: `/api/health` público mínimo; novo `/api/health/plataforma` (detalhado, `FOUNDER_VIEW_SYSTEM_HEALTH`).
- Sidebar: grupo "Plataforma" aparece somente quando o servidor informa `plataforma` (decisão do layout, nunca do cliente).

## 5. Testes

- `npm run test:plataforma` (node 24, `--experimental-strip-types`, sem deps): 4 testes passando (Founder acessa tudo; sem `platformRole` nenhum acesso; `eFounderPrincipal`; matriz com roles).
- `tsc --noEmit` limpo.
- `prisma generate` OK (Supabase v7 com driver adapter).

## 6. Docs afetados

- novo `ADR-036-founder-access-plataforma.md`;
- `CURRENT_PRODUCT.md` (marco P84);
- `CHANGELOG_OFICIAL.md`;
- `KNOWN_ISSUES.md` (removido registro antigo do vazamento via `ADMIN`).

## 7. Pendente (fica para próximos passos)

- Aplicação da migration no banco **Prod** (`npx prisma migrate deploy` no deploy);
- Rodar `npm run founder:provision` **em produção**, com `FOUNDER_BOOTSTRAP_SUPABASE_ID` do usuário do Founder, e depois remover os var desde o ambiente;
- Remoção do script nos termos previstos (bootstrap é one-shot);
- Aviso na IU (changelog) sobre a perda de acesso de `ADMIN` às áreas de plataforma.