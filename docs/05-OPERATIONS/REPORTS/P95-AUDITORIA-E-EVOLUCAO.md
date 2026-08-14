# P95-AUDITORIA-E-EVOLUCAO — Fechamento de pendências + evolução da experiência Ponte

> Missão **P95 — Fechamento de Pendências + Evolução da Experiência**. Este relatório consolida:
> (1) a matriz de auditoria P0–P3 atualizada após a P94, com item/estado/impacto/risco/dependências/ação;
> (2) o que foi corrigido nesta rodada (fechamento de pendências seguras);
> (3) a evolução da landing institucional (comparação conceitual por pares);
> (4) decisões e o que NÃO foi feito (por regra de fase).
>
> Base: `AUDITORIA_INTEGRAL_PONTE.md` (P94), `PENDENCIAS_PRIORIZADAS.md` (P94),
> `KNOWN_ISSUES.md`, `CURRENT_PRODUCT.md` (marco P93/P56), `ARCHITECTURE.md`.

---

## 1. Matriz de auditoria P0–P3 — estado após P94/P95

Legenda de estado: ✅ corrigido · 🟡 parcial/decidido · ⬜ pendente (não fazer nesta fase por regra).

### P0 — Quebra funcional / segurança / dados

| # | Item | Onde | Estado | Risco se não corrigir | Dependências | Ação |
|---|---|---|---|---|---|---|
| P0-1 | Navegação inviável no celular | `app-shell/header/sidebar` | ✅ (P94: drawer + overlay) | Inutilizável em mobile | — | Validado no deploy |
| P0-2 | `LIMITE_IA_DIARIO` ignorado | `api/assistente/route.ts` | ✅ (P94: verifica limite) | Custo de IA sem teto | — | Validar em produção |
| P0-3 | Tenant wrapper `prismaSeguro` desconectado | `lib/prisma-tenant-safe.ts` | 🟡 (P94: decisão de documentar, NÃO conectar) | Depende de disciplina manual | Decisão de fase (KNOWN_ISSUES) | Manter disciplina `empresaId`; conectar quando houver evidência |
| P0-4 | RLS incompleta (11 tabelas, 8 policies) | `prisma/rls-policies.sql` | 🟡 (P94: decisão de documentar, NÃO corrigir) | Defesa latente | Decisão de fase | Completar policies quando evoluir arquitetura |
| P0-5 | Notificação → rota morta `/historico` | `cognitive-notification-engine.ts:124` | ✅ (P94: → `/minha-jornada`) | Usuário cai em tela morta | — | OK |
| P0-6 | Sitemap desatualizado (3 de ~30 URLs) | `src/app/sitemap.ts` | ✅ (P94: completo) | SEO/inventário errado | — | OK |

### P1 — Fluxos essenciais incompletos

| # | Item | Onde | Estado | Risco se não corrigir | Dependências | Ação |
|---|---|---|---|---|---|---|
| P1-1 | Dashboard descarta centro+revisão | `(dashboard)/dashboard/page.tsx` | ✅ (P94: renderizado) | Dashboard "vazio" | — | OK |
| P1-2 | Sinais operacionais efêmeros | `registro-sinais.ts` / `HistoricoSinal` | ✅ (P94: persistidos, idempotente 12h) | Nada acumula | — | OK |
| P1-3 | `/crm`,`/tarefas`,`/implantacoes` sem link | `sidebar.tsx` MODULO_MAP | ✅ (P94: grupo Operação) | 40% invisível | — | OK |
| P1-4 | Botões mortos no perfil do cliente | `cliente-perfil.tsx` | ✅ (P94: 3 modais reais) | Hub promete e não executa | — | OK |
| P1-5 | **`ComoEstaHoje` descarta o input** | `dashboard/como-esta-hoje.tsx` | ✅ **(P95: check-in persistido como `SinalValor CHECKIN_DIARIO`)** | Perde check-in do usuário | Nenhuma (tabela existente) | **Fechado nesta rodada** |
| P1-6 | Copiloto sem UI | `copiloto-operacional.ts` | ✅ (P94: bloco visão do gerente no admin) | Motor desperdiçado | — | OK |

### P2 — Integração e experiência ponta a ponta

| # | Item | Onde | Estado | Risco se não corrigir | Dependências | Ação |
|---|---|---|---|---|---|---|
| P2-1 | `/diagnostico` protótipo mock público | `src/app/diagnostico/page.tsx` | 🟡 (P94: removido do público via proxy) | "Fantasma" público | Decisão de produto | Removido do público; backend real só com evidência |
| P2-2 | 16 endpoints REST órfãos | cluster cognitivo etc. | ⬜ (não tocar nesta fase) | Dívida estrutural | Revisão com evidência | Manter registrado no backlog |
| P2-3 | Conversa/Assistente não geram ação | `conversa/finalizar`, `api/assistente` | ⬜ (adiado) | Informam mas não executam | Evidência de uso | Postergar (regra fase V4) |
| P2-4 | Fluxo Cliente→Implantação→Caixa sem linha visual | dados existem | ⬜ (adiado) | Sem visual de ciclo | — | Postergar |
| P2-5 | **Landing: evolução narrativa/visual** | `components/marketing/*` | ✅ **(P95: comparação por pares + honestidade)** | — | — | **Evoluído nesta rodada** |
| P2-6 | Assistente sem histórico persistido | `components/assistente/chat.tsx` | ⬜ (design atual sem histórico) | Conversa efêmera | Decisão de produto | Manter design atual |

### P3 — Melhorias estruturais

| # | Item | Onde | Estado | Ação |
|---|---|---|---|---|
| P3-1 | `normalizarTexto` duplicado (≥8×) | engines | ⬜ | Extrair utilitário quando houver toque |
| P3-2 | 3 caminhos de escrita de evidência | `atendimento/feedback-intelligence/decision-engine` | ⬜ | Unificar quando houver evidência |
| P3-3 | `clareza-engine` vs `clarity-engine` | 2 engines | ⬜ | Documentar/esclarecer |
| P3-4 | Cards/estados vazios duplicados | narrativa/insight/action/... | ⬜ | Consolidar sistema único de card |
| P3-5 | Órfãos de engine (p40, retry-policy...) | engines | ⬜ | Remover ou dar consumidor |

### Decisões pendentes de produto (não inventar — registradas em `KNOWN_ISSUES.md`)

- Benefícios comerciais concretos do Founder (descontos/garantias/exclusividade) → definir com o fundador.
- O que o "Pioneiro do Ramo" ganha de concreto → definir após campo real (comunicação atual já é honesta).
- Deploy das migrations 008/009 + bootstrap do Founder (P84/P85) → aguarda autorização do usuário.

---

## 2. O que foi fechado nesta rodada (P95)

### 2.1 Check-in diário persistido — P1-5

**Antes:** no dashboard, o empresário escolhia um humor e escrevia o que aconteceu; o botão
apenas fazia `router.push('/conversa')` — **o texto era descartado**.

**Agora:**
- Novo `sistema/src/engine/checkin-engine.ts` — `registrarCheckinDiario(empresaId, {humor, texto})`
  grava em `SinalValor` existente (tipo `CHECKIN_DIARIO`, origem `DASHBOARD_COMO_ESTA_HOJE`),
  idempotente por janela de 24h (atualiza em vez de duplicar). Determinístico, sem IA.
- Nova rota `POST /api/dashboard/checkin` — `requireUserApi` (auth), `assertRateLimit` (`API_GERAL`),
  validação zod (humor em enum de 5 + texto 1..2000).
- `como-esta-hoje.tsx` — o texto agora é mantido em estado, persistido via fetch, e só então navega
  para `/conversa`; erro não bloqueia a conversa (mensagem honesta + segue).

**Impacto no produto:** a "entrada simples" vira memória operacional real — o que o empresário
registra no começo do dia acumula histórico e pode alimentar o dashboard, o centro de decisão e o
Copiloto Operacional. Nenhuma tabela nova; nenhum dado inventado.

### 2.2 Landing — comparação conceitual por pares (P2-5 / seção 10 do briefing)

**Antes:** `comparison.tsx` mostrava o grid "Modelo tradicional → Modelo Ponte" (partes
fragmentadas vs cadeia), mas sem a tabela de pares conceituais.

**Agora:** abaixo do grid, nova banda **"A mudança de papel — o que era guardar vira compreender"**
com 8 pares, cada um em linha própria:

| Sistema tradicional | Ponte |
|---|---|
| Cadastro | Contexto |
| Relatório | Leitura |
| Alerta | Sinal contextual |
| Formulário | Entrada simples |
| Módulo isolado | Operação conectada |
| Automação rígida | Evolução validada |
| Banco de dados | Memória operacional |
| IA genérica | Inteligência contextual |

Fecho honesto (regra da rodada): *"Não é trocar um sistema por outro: é mudar o papel que a
tecnologia cumpre — de guardar o que já foi feito para compreender o que está acontecendo. Direção,
não promessa de entrega pronta."* — usa só tokens existentes (`night-*`, `balloon`, `dot-green`).

### 2.3 Estado da landing vs briefing da rodada (não refeito — já existia)

Seções do briefing que **já estavam presentes** nas rodadas P86–P93 e foram preservadas (regra:
reutilizar, não duplicar):

- Exemplos de ramos (barbearia/lavação/oficina/estética/pequenos negócios) → `realities.tsx`.
- Exemplos de valor em situações do dia a dia (aprovou a obra / chegou material / remarcou) →
  `valor-exemplos.tsx` (rotulados "exemplo conceitual").
- Empresa pioneira (4 passos + pioneiro real `empresaPioneiraId`) → `base-pioneira.tsx`.
- Founder como posição de construção → `founder-panel.tsx`, `founder-cta.tsx`,
  `founder-solicitacao-flow.tsx`.
- Visão de futuro em 4 tempos (Hoje/Próximo/Depois/Futuro, linguagem "queremos construir") →
  `futuro.tsx`.
- Arco narrativo 01–20 (hero → o que é → fragmentação → mapa vivo → como pensa → valor →
  copiloto → carga → diferença → sem caixa-preta → não substitui → organismo → quem pode →
  base → história → crenças → nova categoria → founder → visão → CTA) → `page.tsx`.
- Alternância de profundidade de fundo (NOITE→SUPERFÍCIE→AZUL→NOITE→...) preservada nos tokens
  `night-950/900/850/800` + glows (`bg-landing-glow-azure/green`) + `balloon`/`light-panel` no CSS.

**Não houve recriação nem "segunda versão" de nada** — apenas a adição da tabela por pares, que era
o único gap explícito de conteúdo da comparação.

---

## 3. Decisões e não-fazimentos (regra de fase V4 Founder)

- **Não** se criou tabela/migration/schema novo → check-in usa `SinalValor` (existente). Rollback é
  só reverter código (ver guia).
- **Não** se criou "API paralela" — a rota `checkin` é o único consumidor da nova engine e o
  dashboard é o único chamador.
- **Não** se inventou cliente/percentual/claim: toda a comunicação da landing distingue
  "já existe" × "sendo construído" × "direção futura".
- **Não** se refatorou arquitetura nem se criou ADR novo (nenhuma decisão arquitetural).
- Alternância de fundo em 20 seções **não** foi tocada por inteiro: seria redesign arriscado sem
  valor comprovado; a alternância de profundidade já existe nos tokens atuais.

---

## 4. Verificação

- `npx tsc --noEmit` ✅
- `npm run build` ✅
- Testes (suíte P94, 63 verdes) — rodados na validação da rodada.
- Rotas tocadas: `/` (comparison), `/dashboard` (como-esta-hoje → POST `/api/dashboard/checkin`).

---

## 5. Anexos

- `GUIA-SUBSTITUICAO-E-ROLLBACK-P95.md` — como reverter cada peça desta rodada.
- `ponte-p95-final.zip` — apenas os arquivos alterados/criados na P95.
