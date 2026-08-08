# ADR-036: Founder Access — identidade de plataforma e re-gate das áreas internas

**Data:** 2026-08-08
**Status:** Aceita

## Contexto

A Ponte Digital validou em P82/P84 que a camada de **Plataforma** (o patrimônio comum entre empresas: painel do fundador, radar, diários, observatório cognitivo, conhecimento coletivo) era protegida pelo **mesmo guarda de permissão das empresas clientes** (`role: 'ADMIN'`). Isso significava que:

- qualquer usuário `ADMIN` de uma empresa cliente podia ler e alterar o painel do fundador;
- as áreas internas (`/painel-do-fundador`, `/admin/*`) ficavam acessíveis a clientes — **exposição de dados da plataforma**;
- **não havia distinção de identidade entre "quem opera a plataforma" (Founder) e "quem usa a plataforma" (empresas)**.

P84 decidiu criar uma **camada de plataforma real** com três frentes:

1. **Identidade persistente**: um campo na tabela `Usuario` (`platformRole`, enum `PlatformRole`) — fonte confiável no backend, nunca email/URL/frontend;
2. **Matriz de permissões de plataforma** (5 permissões) validada no servidor;
3. **Re-gate** das páginas e APIs da plataforma para `FOUNDER_*`, removendo o acesso via `ADMIN` de cliente; + **audit trail** mínimo (tabela `auditorias_plataforma`) para ações de escrita privilegiadas.

## Decisão

1. **Identidade**: adiciona `Usuario.platformRole` (enum `PlatformRole`, valor inicial `FOUNDER_PRINCIPAL`) na mesma tabela `Usuario` — **sem nova tabela de usuários**. A identidade da camada vem do banco (coluna própria), atribuída por **bootstrap seguro** (`scripts/provision-founder.ts`) com variáveis server-only (`FOUNDER_BOOTSTRAP_SUPABASE_ID` / `FOUNDER_BOOTSTRAP_EMAIL`) — nunca hardcoded no código, nunca lido do frontend, sempre removível depois do provisionamento.
2. **Matriz de permissões**: `src/lib/permissao-plataforma.ts` (módulo puro) com `FOUNDER_VIEW_PLATFORM`, `FOUNDER_VIEW_INTERNAL`, `FOUNDER_VIEW_SYSTEM_HEALTH`, `FOUNDER_MANAGE_PLATFORM`, `FOUNDER_MANAGE_AUDIT_ACCESS` — todas resolvidas para `['FOUNDER_PRINCIPAL']`. Papéis futuros (quando houver equipe) entram como novo valor do enum, sem alterar a API usada (`role` de empresa fica intacto).
3. **Re-gate server-side**: toda área/página interna valida no servidor (`requirePlataforma` nas API routes; `temPermissaoPlataformaUsuario` nos Server Components). `ADMIN` de empresa **não** acessa mais `/painel-do-fundador` nem `/admin/*`. Frontend só controla visibilidade de menu (sidebar), nunca acesso.
4. **Auditoria mínima** (`AuditoriaPlataforma` / tabela `auditorias_plataforma`): registra somente **ações de escrita privilegiadas** (criar/revisar/promover/descartar conhecimento, criar pergunta) com `usuarioId`/`email`, ação, contexto, `empresaId` e `detalhes` JSONB — **nunca** leituras (evita logging excessivo). Falha de gravação nunca derruba a ação principal.
5. **Health**: `/api/health` fica público e mínimo (status ok + timestamp, para Vercel/healthchecks); o detalhe (memória/uptime/ambiente) sai para `/api/health/plataforma` com `FOUNDER_VIEW_SYSTEM_HEALTH`.
6. **Frontend**: novo grupo "Plataforma" no sidebar aparece **somente** quando o servidor informa que o usuário tem permissão de plataforma (propriedade `plataforma` do layout) — a decisão é do servidor, nunca do cliente.

## Alternativas consideradas

- **Nova tabela `PlatformUser`** — rejeitada: duplica usuário, maior complexidade de migração, sem vantagem para um único Founder.
- **Detectar "founder" por `email` no código** — rejeitada: frágil, impossível de gerenciar o valor correto, exposto em vários lugares.
- **Ocultar menu no frontend** apenas — rejeitada: back-end sem guard deixa dados expostos via API.
- **Eventos de auditoria do catálogo formal** — rejeitada para este momento: o barramento formal (ADR-011) é evolução futura; hoje basta um registro persistido simples em `auditorias_plataforma`.

## Consequências

- **Positivo**: isola de fato o patrimônio comum da plataforma (corrige a exposição que existia com `ADMIN`); identidade vem de fonte sólida (banco) com bootstrap seguro; matriz de permissões é pura e testável (suite `test:plataforma`); auditoria persistida para governança.
- **Negativo**: exige config de deploy (`FOUNDER_BOOTSTRAP_*` no ambiente) + rodar `founder:provision` após aplicar a migration; `ADMIN` de cliente "perde" acesso às áreas de Founder — precisa de aviso transparente.
- **Nulo**: nenhuma mudança no isolamento de tenant (`prisma-tenant-safe` e fluxo de empresa) — a rotina de dados da empresa segue intacta.

## Relação com decisões existentes

- **ADR-003** (Ecossistema Público vs Plataforma Cognitiva) — a camada de plataforma continua sendo a face "Plataforma Cognitiva" (não pública); este ADR adiciona o **canal de identidade/autorização** interno.
- **ADR-002 / requireRole** — padrão de autorização de empresa (MEMBRO/GESTOR/ADMIN) mantido; `requirePlataforma` fica no mesmo `authorize.ts`, como camada distinta.
- **ADR-011/012** (event bus + catálogo) — a auditoria não usa eventos; quando o bus formal for implementado, o trail pode ser reutilizado.

## Implementação

- Migration `008_founder_access` (enum `PlatformRole`, coluna `platformRole` em `usuarios`, tabela `auditorias_plataforma`).
- `src/lib/permissao-plataforma.ts` (puro), `src/lib/plataforma.ts` (helpers + auditoria), `src/lib/authorize.ts` (`requirePlataforma`).
- `scripts/provision-founder.ts` (bootstrap seguro) + `.env.example` (`FOUNDER_BOOTSTRAP_*`).
- Páginas: `/painel-do-fundador`, `/admin/radar-founders`, `/admin/diario-founder`, `/admin/diario-cientifico`, `/admin/cognitive-observatory` → gate de plataforma.
- APIs: `/api/painel-do-fundador` (GET/POST), `revisar`, `promover`, `conhecimento/[id]` (PATCH/DELETE) → `requirePlataforma` + auditoria; `/api/health/plataforma`.
- Teste: `src/lib/permissao-plataforma.test.ts` (script `test:plataforma`).