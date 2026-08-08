# P85 — A PONTE USA A PONTE: IDENTIDADE DEFINITIVA DO FOUNDER

> **Status:** BLOCO A CONCLUÍDO (Fases 1–6) — 8 de agosto de 2026
>
> Programa em dois blocos: **Bloco A** (Fases 1–6) entrega a identidade definitiva
> (modelo, permissões, numeração, empresa "Imperador", provisionamento); **Bloco B**
> (Fases 7–10) entrega a Conversa de Configuração Cognitiva (P86) e o retrato
> estratégico de abertura — a aguardar aprovação.
> ADR: `docs/04-DECISIONS/ADR/ADR-037-founder-identidade-membership.md`.

---

## 1. Objetivo

Tornar a **Ponte Digital a primeira empresa real que usa o próprio Business OS**:
a Fundação deixa de ser um código de exemplo (empresa seed genérica) e passa a ter
**identidade definitiva** no sistema que constrói para seus Founders.

## 2. Problema resolvido

- O seed criava uma empresa "Ponte Digital" sem pertencimento (números `NULL`);
- **Não existia a empresa "Imperador"** (Empresa/Fundador nº 1 — o "dono" institucional
  da plataforma);
- Toda a numeração de pertencimento (`numeroApoiador`/`numeroFundador`) estava `NULL`
  em produção — o primeiro Founder real ainda não existia dentro do próprio sistema;
- `PlatformRole` (P84) era um enum de **um valor só** (`FOUNDER_PRINCIPAL`), sem o
  vocabulário definitivo (`FOUNDER`/`APOIADOR`);
- Não existia associação explícita usuário ↔ empresa: `Usuario.empresaId` era único,
  impedindo "o Founder ser ADMIN da **sua** empresa da ponte" e da própria plataforma
  ao mesmo tempo;
- Não havia um **script idempotente e determinístico** para plantar a fundação.

## 3. Decisões do usuário (coletadas na FASE 0)

1. **Conta canônica do Founder Principal** = `pontedigitalsc@gmail.com`
   (id `cmrph3h540007g8vrmgffhym4`) → `FOUNDER_PRINCIPAL` + `ADMIN` da Ponte Digital;
2. **Sim**, criar a tabela `EmpresaUsuario` (membership) para permitir a mesma pessoa
   com múltiplas associações de empresa — mantendo `Usuario.empresaId` como principal;
3. **Imperador** = empresa do novo ciclo com **#1** e 0 usuários
   (`numeroApoiador=1`, `numeroFundador=1`);
4. Dois blocos: **1–6 + docs**, parar para aprovação; depois Fases 7–10.

## 4. Fase 0 — Auditoria (achados que moldaram o desenho)

- 3 empresas chamadas "Ponte Digital" em produção (`ponte-digital-mrph3h2o` de 17/07,
  `ponte-digital` do seed de 26/07, `ponte-digital-msb3q4ww` de 02/08) — **legado**;
- 3 contas do Founder no Supabase (`pontedigitalsc@gmail.com`, `kelven@pontedigital.com.br`,
  `kelvenwinck@gmail.com`);
- **todos** os `numeroApoiador`/`numeroFundador` = `NULL` em produção;
- migration `008` (P84) **não aplicada** em produção (`usuarios.platformRole` não existe);
- `DATABASE_URL` em `.env` (não `.env.local`); host Supabase pooler.

**Tratamento do legado:** empresas duplicadas de "Ponte Digital" de fases anteriores
**não são tocadas/apagadas** (histórico jamais é apagado) — ficam documentadas em
`KNOWN_ISSUES.md` como legado. A única "Ponte Digital" que recebe numeração é a
canônica (`slug: ponte-digital`, empresa do seed).

## 5. Bloco A — Fases 1–6 (implementado)

### Fase 1 — Modelo de dados (migração `009_ponte_usa_a_ponte`)
- enum `PlatformRole` alargado para `FOUNDER_PRINCIPAL | FOUNDER | APOIADOR`
  (Postgres `ALTER TYPE ... ADD VALUE`; sem remoção de valores);
- **modelo `EmpresaUsuario`** (tabela `empresa_usuarios`): associação explícita
  usuário ↔ empresa com `role` (`Role`), `ativo`, `deletedAt`, e índices compostos.
  `@@unique([empresaId, usuarioId])`;
- `Empresa` ↔ `Usuario` ganham a relação `membros EmpresaUsuario[]`;
- `Usuario.empresaId` continua obrigatório (empresa principal, compatibilidade
  total com os fluxos atuais — nada de leitura quebrada).

### Fase 2 — Tipos
- `src/types/index.ts`: `PlatformRole` em união de 3 valores; interface
  `EmpresaUsuario`; `Usuario` com `membros?: EmpresaUsuario[]`.

### Fase 3 — Permissões de plataforma (sem privilégios novos)
- `src/lib/permissao-plataforma.ts`: tipo ampliado para `FOUNDER | APOIADOR`, mas a
  **matriz de permissões** continua resolvendo **só** `FOUNDER_PRINCIPAL`. Regra
  P85: "não inventar privilégios" — `FOUNDER` e `APOIADOR` ainda **não** têm
  permissão alguma (só vocabulário de identidade).
- Teste novo em `permissao-plataforma.test.ts` comprova que FOUNDER/APOIADOR têm
  zero permissões.

### Fase 4 — Isolamento multi-tenant
- `prisma-tenant-safe.ts`: `'empresaUsuario'` entra nos `MODELOS_MULTI_TENANT` — a
  membership é multi-tenant e respeita o tenant guard do `prismaSeguro`.

### Fase 5 — Script de plantação da fundação
- `scripts/plantar-fundacao.ts` (**idempotente**, server-only, via env
  `FOUNDER_BOOTSTRAP_*`, igual ao `provision-founder`):
  1. garante a empresa **Imperador** (`slug: imperador`) com `#1/#1`;
  2. numera a **Ponte Digital canônica** (`slug: ponte-digital`, do seed) para
     `#2/#2` (criterioso: nunca altera número já preenchido);
  3. provisiona o **Founder Principal** (`FOUNDER_PRINCIPAL`) via env;
  4. cria a **membership ADMIN** do Founder na empresa canônica;
  5. grava auditoria `FUNDACAO_PLANTADA`; não toca nas duplicatas de legado.
- package.json: script `founder:plantar-fundacao`.

### Fase 6 — Verificação
- `prisma generate` OK (Supabase v7, driver adapter);
- `tsc --noEmit` limpo;
- `npm run test:plataforma`: 5 testes passando (inclui o novo P85);
- `npm run build` completo (63 páginas).

## 6. Fases 7–10 (Bloco B — pendente de aprovação)

- **Fase 7 — Rota da Conversa de Configuração** (P86): novo `fluxo='configuracao-founder'`
  na tabela `Conversa`, **reutilizando** `adaptive-question-engine` /
  `conversation-engine` / `retrato-estrategico` (proibido duplicar o cérebro);
- **Fase 8 — Sem infraestrutura nova**: não há novas tabelas; o fluxo grava em
  `Conversa` + `RespostasConversa` + `IdentidadeDigital` como feito hoje;
- **Fase 9 — Primeiro acesso**: quando o Founder entra na Ponte Digital canônica
  ainda sem retrato estratégico, abre a conversa P86 (sem fricção — nunca força
  cadastro);
- **Fase 10 — Retorno estratégico**: `retrato-estrategico.ts` reutilizado para
  gerar o retrato de abertura (fatia do Motor Cognitivo, não um novo motor).

## 7. Testes Bloco A

- `npm run test:plataforma` → 5 pass (P84 × 4 + P85 × 1).
- `tsc --noEmit` limpo.
- `npm run build` → 63 rotas, sem erros.

## 8. Docs afetados

- novo `ADR-037-founder-identidade-membership.md`;
- `CURRENT_PRODUCT.md` (marco P85 Bloco A);
- `CHANGELOG_OFICIAL.md`;
- `KNOWN_ISSUES.md` (registro das duplicatas de legado + pendência de aplicar
  008/009 em produção);

## 9. Pendente

- **Aplicar migrations `008` + `009` em produção** (`npx prisma migrate deploy`)
  — pré-requisito absoluto; sem isso a coluna `platformRole` e a tabela
  `empresa_usuarios` não existem;
- Rodar `npm run founder:plantar-fundacao` **em produção** com
  `FOUNDER_BOOTSTRAP_SUPABASE_ID` do usuário do Founder;
- Depois remover `FOUNDER_BOOTSTRAP_*` do ambiente (bootstrap é one-shot);
- Bloco B (Fases 7–10) após aprovação.