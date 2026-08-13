# GUIA-SUBSTITUICAO-E-ROLLBACK-P94 — Como reverter cada peça do núcleo de evolução

> Guia operacional da missão **P94 — Núcleo de Evolução**. Para cada entrega: **o que foi
> feito**, **como desfazer** (substituição e rollback), **impacto de reverter**, e **o que
> NÃO tem como desfazer** (sem migration, sem schema novo).

---

## Visão geral

| Item | Código | Banco | Rollback |
| --- | --- | --- | --- |
| Dashboard vivo + sinais | `registro-sinais.ts`, `dashboard/page.tsx` | usa `HistoricoSinal` (existente) | Reverter 2 arquivos |
| Nav mobile + módulos | `app-shell.tsx`, `header.tsx`, `sidebar.tsx` | nenhum | Reverter 3 arquivos |
| Perfil cliente (3 modais) | `cliente-perfil.tsx`, `historico-modal.tsx` (novo), `transacao-form/modal.tsx` | nenhum | Reverter 4 arquivos (+ remover 1 novo) |
| Copiloto no admin | `copiloto-visao-gerente.tsx` (novo), `descoberta-detalhe.tsx` | nenhum | Reverter 1 + remover 1 |
| Fixs P0 (notificação, sitemap, diagnostico, limite IA) | 5 arquivos | contagem em `RespostasConversa` (existente) | Reverter 5 arquivos |

**Regra geral:** nenhuma peça criou tabela/migration — rollback é só reverter código (ou
remover arquivos novos) e, se preciso, os dados criados durante o uso (sinais, históricos,
transações, chamadas de IA). Nada bloqueia deploy.

---

## 1. Dashboard vivo + sinais operacionais (P1-1/P1-2)

**O que foi feito:**
- Novo `sistema/src/engine/registro-sinais.ts` com `persistirSinaisOperacionais`
  (idempotente, janela 12h, reativa `deletedAt`) e `listarSinaisRecentes` (limite 6, por
  urgência).
- `sistema/src/app/(dashboard)/dashboard/page.tsx` passa `data={centroDiario}` e
  `data={revisao}` para `CentroDiario`/`RevisaoEvolucao`.

**Substituição:** trocar a fonte de `centroDiario`/`revisao` por outra engine sem tocar nos
componentes — o contrato de props é `data`.

**Rollback:**
```bash
git checkout -- sistema/src/engine/registro-sinais.ts
git checkout -- "sistema/src/app/(dashboard)/dashboard/page.tsx"
```
Ou, se o arquivo era novo e não foi commitado:
```bash
rm sistema/src/engine/registro-sinais.ts
git checkout -- "sistema/src/app/(dashboard)/dashboard/page.tsx"
```

**Impacto:** o dashboard volta ao comportamento anterior (dados genéricos). Sinais já
gravados em `HistoricoSinal` permanecem no banco (dados não são apagados por rollback de
código). Se quiser apagar sinais da rodada, filtrar por `empresaId` + janela de data.

---

## 2. Nav mobile + módulos órfãos (P0-1)

**O que foi feito:**
- `app-shell.tsx`: estado do drawer + overlay z-40.
- `header.tsx`: botão `lg:hidden` com `MenuIcon` (SVG inline — ver nota do lucide abaixo).
- `sidebar.tsx`: grupo "Operação" (`/tarefas`, `/implantacoes`, `/crm`), drawer mobile,
  `mostrarRotulos = !collapsed || mobileAberto`.

**Rollback:**
```bash
git checkout -- sistema/src/components/layout/app-shell.tsx
git checkout -- sistema/src/components/layout/header.tsx
git checkout -- sistema/src/components/layout/sidebar.tsx
```

**Impacto:** `/tarefas`, `/implantacoes` e `/crm` voltam a não aparecer na sidebar (acesso
direto por URL continua — o que é comportamento de antes, documentado em KNOWN_ISSUES).

**Nota lucide-react:** o botão mobile usa `MenuIcon` (SVG inline) porque o barrel de tipos
do `lucide-react` está truncado no tsc (bug de tooling documentado em KNOWN_ISSUES). Se
reverter, não reintroduzir o import de `Menu` do lucide sem antes conferir que o tsc aceita.

---

## 3. Perfil cliente — 3 modais reais (P1-4)

**O que foi feito:**
- `cliente-perfil.tsx`: `TarefaModal`, `HistoricoModal` (novo), `TransacaoModal` com
  `clienteIdInicial`; submits via `apiFetch` + `router.refresh()`.
- Novo `sistema/src/components/clientes/historico-modal.tsx`.
- `transacao-form.tsx` / `transacao-modal.tsx`: prop `clienteIdInicial`.

**Rollback:**
```bash
git checkout -- sistema/src/components/clientes/cliente-perfil.tsx
rm sistema/src/components/clientes/historico-modal.tsx
git checkout -- sistema/src/components/financeiro/transacao-form.tsx
git checkout -- sistema/src/components/financeiro/transacao-modal.tsx
```

**Impacto:** os botões voltam a ser inativos (estado "morto" anterior). Históricos e
transações criados pelos modais permanecem no banco (são dados de domínio válidos). O
`transacao-form.tsx` voltará a não aceitar `clienteIdInicial` — se algum outro chamador
depender do prop novo, conferir antes de reverter.

---

## 4. Copiloto no admin descoberta (P1-6)

**O que foi feito:**
- Novo `sistema/src/components/descoberta/copiloto-visao-gerente.tsx` (visão do gerente:
  Nv 0–4, contexto, carga cognitiva, mapa de atrito, perguntas com gatilho).
- `descoberta-detalhe.tsx` renderiza `<CopilotoVisaoGerente ... />` antes do grid.

**Rollback:**
```bash
rm sistema/src/components/descoberta/copiloto-visao-gerente.tsx
git checkout -- sistema/src/components/descoberta/descoberta-detalhe.tsx
```

**Impacto:** o admin descoberta volta a mostrar só o caderno/grid. O motor
`engine/copiloto-operacional.ts` **não é afetado** (não foi criado nesta rodada — é da
rodada Copiloto Operacional/P92).

---

## 5. Fixs P0

### 5.1 CTA de histórico → `/minha-jornada`
```bash
git checkout -- sistema/src/engine/cognitive-notification-engine.ts
git checkout -- sistema/src/engine/cognitive-action-composer.ts
```
**Impacto:** CTAs de histórico voltam a apontar `/historico` (rota inexistente — era o bug).

### 5.2 `/diagnostico` fora do público
```bash
git checkout -- sistema/src/proxy.ts
git checkout -- sistema/src/app/diagnostico/page.tsx
```
**Impacto:** `/diagnostico` volta à lista de rotas públicas. (Decisão do usuário foi mantê-la
fora — reverter apenas se a decisão mudar.)

### 5.3 Sitemap completo
```bash
git checkout -- sistema/src/app/sitemap.ts
```
**Impacto:** sitemap volta ao estado anterior (menos rotas públicas listadas).

### 5.4 Limite diário de IA no assistente (P0)
```bash
git checkout -- sistema/src/app/api/assistente/route.ts
```
**Impacto:** o `LIMITE_IA_DIARIO` volta a ser definido mas não verificado (estado anterior).
Chamadas de modelo registradas em `RespostasConversa` durante o período continuam no banco —
não são apagadas pelo rollback. Para desfazer contagens de teste, filtrar por `empresaId` +
`perguntaId` `startsWith: 'assistente-ai:'`.

---

## 6. O que NÃO tem como desfazer automaticamente

- **Dados gravados durante o uso** (sinais em `HistoricoSinal`, históricos, transações,
  chamadas de IA em `RespostasConversa`). Rollback de código não apaga dados — e por design
  da Ponte, **dados não são apagados sem estratégia** (regra do repositório).
- **Nenhuma migration foi criada** — não há o que reverter no banco.

---

## 7. Verificação pós-rollback

```bash
cd sistema
npx tsc --noEmit
npm run build
```
Se algum import de componente removido continuar referenciado, o typecheck/build acusa —
corrigir antes de subir.
