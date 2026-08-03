# P63 — Escala Comercial V1

**Data:** 2 de agosto de 2026
**STATUS:** IMPLEMENTADO (V1 — painel de métricas de transformação no Painel do Fundador).
Funil comercial (aquisição paga/indicação estruturada) permanece bloqueado até validação do P59.

> Não se escala aquilo que não provou utilidade. Primeiro o P59 mostra valor; depois a Ponte
> constrói o funil comercial — nunca o inverso.

---

## 1. Problema

Hoje o caminho do empresário até a Ponte é manual (o founder convida). Para escalar, o funil
precisa existir: entrada → valor → retorno → indicação.

## 1.1 Implementação (V1 — métricas de transformação)

- **`src/engine/operacao-founder.ts`** → `obterMetricasTransformacao()` (agregados de plataforma):
  - sessões iniciadas e concluídas;
  - clarezas percebidas, com distribuição por categoria;
  - empresas que voltaram (retorno espontâneo — ≥2 sessões);
  - primeiras decisões registradas (AcaoCognitiva origem USUARIO) e primeiras evoluções;
  - apoiadores e founders ativos; recomendações consolidadas.
- **Painel do Fundador**: seção "Transformação, não funcionalidades" — métricas que o founder usa
  para decidir (o que está gerando retorno e clareza), sem números fúteis.
- Só agregações: nenhum dado individual de empresa exposto.

## 2. Hipótese central

Uma vez provada a retenção (P59), o funil comercial transforma o valor já existente em
crescimento sustentável — e não o contrário.

## 3. Design planejado (quando autorizado)

- **Funil** explícito: Primeira Sessão Estratégica → retorno (7 dias) → Founder (pertencimento).
- Expansão do painel conforme o protocolo 1–10 apontar o que de fato ajuda a decidir.
- Apoiar o protocolo Founder 1–10 com dados do produto.

## 4. Critérios de aceite (quando iniciar)

- [x] Painel mostra métricas de transformação (retorno, clareza, decisões) — implementado.
- [ ] P59 validado: evidências de retorno e depoimentos reais.
- [ ] Funil comercial só com utilidade provada.

## 5. Não fazer

- Não construir funil antes da utilidade provada.
- Não adicionar métricas "bonitas" que ninguém usa na decisão.
