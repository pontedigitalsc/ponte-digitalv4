# Sprint 7.1 — Knowledge Vault (Biblioteca de Conhecimento)

## Objetivo

Criar a camada de visualização e gestão do conhecimento validado da empresa, permitindo ao empresário ver, filtrar e acompanhar o conhecimento que a Ponte construiu sobre seu negócio.

## O que foi entregue

- Página `/dashboard/conhecimento` com sumário (total, confirmados, hipóteses ativas, descartados, score médio, criados esta semana)
- Filtros: busca textual, categoria, status (CONFIRMADO/EM_OBSERVACAO/DESCARTADO), ordenação (recentes, antigos, score)
- `KnowledgeTag` — badge visual por categoria e status
- `KnowledgeCard` — card individual com descrição, score, origem, status, ação de promoção
- `KnowledgeSummary` — cards de resumo estatístico
- `KnowledgeFilters` — barra de filtros completa
- `KnowledgeTimeline` — timeline lateral de eventos cognitivos
- Factory `construirConhecimentoExperience` no Experience Engine
- Métrica `obterKnowledgeVaultMetrics` no Observatório
- Sidebar: item "Conhecimento" (Sparkles) no grupo Inteligência

## Arquitetura

- **Sem novos models Prisma** — reaproveita `ConhecimentoValidado`, `Hipotese`, `Evidencia`, `MemoriaCognitiva`
- **Status derivado** — calculado do `scoreConfiança` (≥60 confirmado, <20 descartado, 20-59 em observação), não armazenado
- **Nenhuma IA envolvida** — apenas leitura e organização de dados existentes
- **Sem novas engines** — apenas factory no Experience Engine

## Critérios de aceite

- [x] Sumário exibe totais corretos
- [x] Filtros funcionam (busca, categoria, status, ordenação)
- [x] Timeline mostra eventos cognitivos recentes
- [x] Sidebar exibe link para Conhecimento
- [x] Build (`npx tsc --noEmit`) sem erros

## Não implementado (fora de escopo)

- Edição manual de conhecimento
- Promoção de hipótese para conhecimento validado
- Gráficos ou visualizações avançadas
- Exportação de dados
