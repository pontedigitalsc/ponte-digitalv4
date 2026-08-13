# GUIA-P93 — Consolidação do Sistema + Landing Viva

## 1. Propósito

Reconstruir a landing como um caminho que **demonstra compreensão** (e não apenas explica),
resolver pendências técnicas reais (P1/P2) e limpar o lixo acumulado — **sem inventar nenhuma
promessa** e **sem tocar em schema ou API de negócio**.

## 2. Regras da rodada

- Nada inventado: nenhum número, claim ou funcionalidade que não exista em código.
- Exemplos de cliente são **exemplo conceitual** (rótulo explícito).
- `package.json` intocado; nenhuma dependência nova; nenhum schema novo.
- `prefers-reduced-motion` respeitado; responsividade 320–430px.

## 3. Arquivos envolvidos

**Novos (componentes):**
- `sistema/src/components/marketing/live-map.tsx`
- `sistema/src/components/marketing/valor-exemplos.tsx`
- `sistema/src/components/marketing/copiloto-demo.tsx`
- `sistema/src/components/marketing/carga-cognitiva.tsx`
- `sistema/src/components/marketing/nao-substitui.tsx`
- `sistema/src/components/marketing/base-pioneira.tsx`

**Modificados:**
- `sistema/src/app/page.tsx` — landing reconstruída (~20 seções)
- `sistema/src/components/marketing/flow-steps.tsx` — passos 01–06 renomeados
- `sistema/src/components/marketing/marketing-nav.tsx` — client + menu mobile
- `sistema/src/components/layout/header.tsx` — link único `/configuracoes`
- `sistema/src/app/layout.tsx` — import de `ui/toast` corrigido
- `sistema/src/app/api/founder/solicitar/route.ts` — WhatsApp via engine
- `sistema/src/components/ui/toast.tsx` — renomeado de `toat.tsx` via `git mv`

**Deletados (dead code, 0 refs):** `reach.tsx`, `micro-insights.tsx`, `thought-chain.tsx`,
`story-example.tsx`, `signal-demo.tsx`, `evolucao.tsx`.

## 4. Como validar

1. `npx tsc --noEmit` — limpo.
2. `npm run build` — `Compiled successfully` + `Finished TypeScript`. Log em
   `build-log.txt` deve ser deletado antes do commit.
3. Testes: `npm test` — 52/52 verdes.
4. Navegar `/`, âncoras (`#o-mapa`, `#como-funciona`, `#copiloto`, `#a-visao`), menu mobile
   (< md), CTAs (`/conversa`, `/solicitar-founder`).

## 5. Ancoragem dos componentes (o que NÃO inventar)

- **Carga cognitiva (8 dimensões):** `engine/copiloto-operacional.ts`
  → `avaliarCargaCognitivaPorProcesso`.
- **Pioneiro de categoria:** `services/descoberta-operacional.service.ts:74`
  (`empresaPioneiraId` criado quando a categoria nasce).
- **Exemplos de valor:** sempre acompanhados do rótulo "exemplo conceitual".

## 6. Ancoras da narrativa na página

| Âncora | Seção |
| --- | --- |
| `#o-que-e` | O que é a Ponte |
| `#o-mapa` | LiveMap (mapa vivo) |
| `#como-funciona` | FlowSteps |
| `#copiloto` | CopilotoDemo |
| `#carga-cognitiva` | Carga cognitiva |
| `#nao-substitui` | Não-substitui |
| `#base` | BasePioneira |
| `#a-visao` | Futuro |
| `#founder` | FounderPanel |

## 7. Limites (não fazer)

- Não criar claims numericos na landing.
- Não adicionar dependências.
- Não tocar `prisma/schema.prisma`.
- Não alterar APIs de negócio.
- No commit: stagear **apenas** arquivos da rodada (excluir pré-existentes do git status:
  `package.json`, `(auth)/criar-conta`, `api/auth/criar-conta`, `conversa/page.tsx`, `lib/ritmo.ts`,
  GUIA-* das rodadas P86/P88/P90/P91, zips antigos).