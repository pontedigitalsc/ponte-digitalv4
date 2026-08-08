# ADR-037: Identidade Founder definitiva + associação usuário ↔ empresa (membership)

**Data:** 2026-08-08
**Status:** Aceita (Bloco A do P85)

## Contexto

P84 criou a camada de **Plataforma** (identidade `FOUNDER_PRINCIPAL` + matriz de
permissões + re-gate das áreas internas). P85 vai além: a Ponte Digital precisa ser a
**primeira empresa real que usa o próprio Business OS**. Para isso, três lacunas
precisam ser resolvidas:

1. **Numeração de pertencimento vazia**: em produção, todas as empresas
   (incluindo as "Ponte Digital") tinham `numeroApoiador`/`numeroFundador = NULL`.
   Não existia a empresa **"Imperador"** (Empresa/Fundador nº 1) — o "dono"
   institucional da plataforma;
2. **Associação única usuário → empresa**: `Usuario.empresaId` era obrigatório e
   único, impedindo o Founder de ser ADMIN da **sua** empresa e da **plataforma**
   ao mesmo tempo (duas empresas);
3. **Vocabulário incompleto**: o enum `PlatformRole` tinha um valor só
   (`FOUNDER_PRINCIPAL`), sem `FOUNDER`/`APOIADOR` — a identidade definitiva
   precisa nomear os papéis mesmo que ainda não tenham privilégios.

## Decisão

1. **Alargar o enum `PlatformRole`** para `FOUNDER_PRINCIPAL | FOUNDER | APOIADOR`
   via `ALTER TYPE ... ADD VALUE` (Postgres) — **sem remover valores**. É **só
   vocabulário**: a matriz `PERMISSOES_PLATAFORMA` continua resolvendo apenas
   `FOUNDER_PRINCIPAL`. Nenhum privilégio novo é inventado (regra P85: identidade
   ≠ permissão).
2. **Criar associação explícita `EmpresaUsuario`** (tabela `empresa_usuarios`):
   `role`, `ativo`, `deletedAt`, `@@unique([empresaId, usuarioId])`, índices
   compostos. É a **fonte real da associação usuário ↔ empresa**. `Usuario.empresaId`
   permanece (obrigatório) como **empresa principal** — compatibilidade total,
   nenhuma leitura atual quebra. O Founder passa a ter membership na sua empresa
   canônica **e** na empresa da plataforma quando necessário.
3. **Multi-tenancy**: `EmpresaUsuario` entra nos `MODELOS_MULTI_TENANT` de
   `prisma-tenant-safe` — membership é dado de tenant, respeita o tenant guard;
   nunca escrita cross-tenant.
4. **Script idempotente `scripts/plantar-fundacao.ts`** (server-only, env
   `FOUNDER_BOOTSTRAP_*`): (a) garante a empresa "Imperador" (`#1` apoiador /
   `#1` fundador); (b) cataloga a "Ponte Digital" **canônica** (`slug: ponte-digital`,
   do seed) para `#2`, sem sobrescrever números já preenchidos;
   (c) provisiona o Founder Principal; (d) cria a membership ADMIN do Founder na
   empresa canônica; (e) grava auditoria `FUNDACAO_PLANTADA`. Este é o único lugar
   onde a numeração da fundação é gravada — sem duplicar lógica de alocação do
   `criar-conta` (P57B).
5. **Legado preservado**: as duas "Ponte Digital" duplicadas de fases anteriores
   **não são apagadas nem renumeradas** — documentadas em `KNOWN_ISSUES.md`
   (histórico jamais é apagado).

## Alternativas consideradas

- **Manter `Usuario.empresaId` único** — rejeitado: impede o Founder de ser ADMIN
  de mais de uma empresa; múltiplas associações ficam impossíveis sem hacks de pivot.
- **Reutilizar `role: ADMIN` para a plataforma** — rejeitado (já em ADR-036):
  voltar ao vazamento de acesso de cliente às áreas de plataforma.
- **Migrar tudo para join table e tornar `empresaId` opcional** — rejeitado:
  mudança ampla de leitura em todos os endpoints; alto risco de regressão sem
  benefício imediato para a fase de validação de produto.
- **Nova tabela apenas de numeração** — rejeitado: `Empresa` já tem
  `numeroApoiador`/`numeroFundador` (P57B); sem camada extra.

## Consequências

- **Positivo**: identidade real (Imperador + Ponte Digital canônica) dentro do
  próprio sistema; Founder opera sua empresa e a de plataforma; base de membership
  pronta para futuros múltiplos acessos por usuário; vocabulário alinhado ao produto.
- **Negativo**: exige aplicar migrations `008`+`009` e rodar
  `founder:plantar-fundacao` em produção antes de qualquer uso; empresas de legado
  permanecem (não tocadas) e precisam de registro documental.
- **Nulo**: nenhuma mudança na rotina de dados da empresa; nenhuma leitura de
  `usuario.empresaId` muda; nenhum privilégio de plataforma novo.

## Relação com decisões existentes

- **ADR-036** (Founder Access) — `platformRole` segue sendo a fonte de identidade
  de plataforma; este ADR amplia o enum e adiciona a membership.
- **ADR-008** (prisma-tenant-safe) — `EmpresaUsuario` entra no guard; sem bypass
  cross-tenant.
- **P57B** — a única escrita de numeração de pertencimento continua na `criar-conta`
  (transacional, anti-colisão); `plantar-fundacao` só planta a numeração da fundação
  (idempotente, sem repetir o algoritmo de retry).

## Implementação (Bloco A)

- Migration `009_ponte_usa_a_ponte`: `ALTER TYPE PlatformRole ADD VALUE 'FOUNDER'`;
  `ADD VALUE 'APOIADOR'`; tabela `empresa_usuarios` + índices + FKs.
- `src/types/index.ts`: `PlatformRole` (3 valores), `EmpresaUsuario`, `Usuario.membros`.
- `src/lib/permissao-plataforma.ts`: tipo ampliado; matriz de permissões intacta.
- `src/lib/prisma-tenant-safe.ts`: `'empresaUsuario'` em `MODELOS_MULTI_TENANT`.
- `src/lib/permissao-plataforma.test.ts`: teste que `FOUNDER`/`APOIADOR` têm zero
  permissões.
- `scripts/plantar-fundacao.ts` + script `founder:plantar-fundacao` no `package.json`.
- Docs: `P85_PONTE_USA_A_PONTE.md`, este ADR, `CURRENT_PRODUCT.md`,
  `CHANGELOG_OFICIAL.md`, `KNOWN_ISSUES.md`.