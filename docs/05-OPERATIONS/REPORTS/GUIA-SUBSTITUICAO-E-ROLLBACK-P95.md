# GUIA-SUBSTITUICAO-E-ROLLBACK-P95 — Como reverter cada peça da evolução de experiência

> Guia operacional da missão **P95 — Fechamento de Pendências + Evolução da Experiência**.
> Para cada entrega: **o que foi feito**, **como desfazer** (substituição e rollback),
> **impacto de reverter**, e **o que NÃO tem como desfazer** (sem migration, sem schema novo).

---

## Visão geral

| Item | Código | Banco | Rollback |
| --- | --- | --- | --- |
| Check-in diário persistido (P1-5) | `checkin-engine.ts` (novo), `api/dashboard/checkin/route.ts` (novo), `como-esta-hoje.tsx` | usa `SinalValor` (existente) — **sem schema novo** | Remover 2 arquivos novos + reverter 1 |
| Comparação por pares na landing (P2-5) | `comparison.tsx` | nenhum | Reverter 1 arquivo |

**Regra geral:** nenhuma peça criou tabela/migration. Rollback é só reverter código (ou remover
arquivos novos). Os dados de check-in gravados em `SinalValor` durante o uso permanecem no banco
(nada é apagado sem estratégia — regra do repositório).

---

## 1. Check-in diário persistido (P1-5)

**O que foi feito:**
- Novo `sistema/src/engine/checkin-engine.ts` — `registrarCheckinDiario(empresaId, {humor, texto})`,
  grava `SinalValor` tipo `CHECKIN_DIARIO` / origem `DASHBOARD_COMO_ESTA_HOJE`, idempotente por 24h
  (atualiza o registro do dia em vez de duplicar).
- Nova rota `sistema/src/app/api/dashboard/checkin/route.ts` — `POST`, auth `requireUserApi`,
  rate-limit `API_GERAL`, validação zod (`humor` enum de 5, `texto` 1..2000).
- `sistema/src/components/dashboard/como-esta-hoje.tsx` — mantém humor+texto em estado, persiste
  via `/api/dashboard/checkin` e só então navega para `/conversa` (erro não bloqueia).

**Substituição:** trocar a engine por outra fonte sem tocar no componente — o contrato é
`registrarCheckinDiario(empresaId, {humor, texto}): Promise<boolean>`.

**Rollback:**
```bash
rm sistema/src/engine/checkin-engine.ts
rm "sistema/src/app/api/dashboard/checkin/route.ts"
git checkout -- sistema/src/components/dashboard/como-esta-hoje.tsx
```

**Impacto:** o dashboard volta a descartar o texto digitado (estado anterior — o P1-5 reabre). Os
check-ins já gravados em `SinalValor` permanecem no banco (são memória operacional válida; filtrar
por `empresaId` + `tipo: 'CHECKIN_DIARIO'` se quiser localizá-los).

---

## 2. Comparação por pares na landing (P2-5)

**O que foi feito:**
- `sistema/src/components/marketing/comparison.tsx` — adicionada a banda "A mudança de papel — o
  que era guardar vira compreender" com 8 pares conceituais (Cadastro→Contexto, Relatório→Leitura,
  Alerta→Sinal contextual, Formulário→Entrada simples, Módulo isolado→Operação conectada,
  Automação rígida→Evolução validada, Banco de dados→Memória operacional, IA genérica→Inteligência
  contextual) + fecho honesto de "direção, não promessa". Somente tokens existentes.

**Rollback:**
```bash
git checkout -- sistema/src/components/marketing/comparison.tsx
```

**Impacto:** a seção "A diferença fundamental" volta a mostrar só o grid (modelo tradicional ×
modelo Ponte), sem a tabela por pares. Nenhum dado no banco envolvido.

---

## 3. O que NÃO tem como desfazer automaticamente

- **Dados de check-in gravados em `SinalValor` durante o uso** (`CHECKIN_DIARIO`). Rollback de
  código não apaga dados — e por design da Ponte, **dados não são apagados sem estratégia**.
- **Nenhuma migration foi criada** — não há o que reverter no banco.

---

## 4. Verificação pós-rollback

```bash
cd sistema
npx tsc --noEmit
npm run build
```

Se algum import de `checkin-engine` ou da rota continuar referenciado, o typecheck/build acusa —
corrigir antes de subir.
