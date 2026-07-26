# Arquitetura-Alvo (Fase 2/3 — NÃO é checklist obrigatório agora)

Este documento descreve para onde a arquitetura técnica caminha depois da validação com os 100 fundadores. Nada aqui deve ser implementado durante a V4 Founder sem uma decisão explícita registrada em `04-DECISIONS/DECISIONS.md` — ver a hierarquia em `00-START-HERE.md`: se este arquivo sugerir algo que `02-PRODUCT/CURRENT_PRODUCT.md` não autoriza para a fase atual, `CURRENT_PRODUCT.md` vence.

## Camadas (alvo futuro)

```
server/actions  →  services  →  repositories  →  Prisma
```

Hoje (V4 Founder), a camada real é mais simples e está documentada como aceita em `03-ENGINEERING/CODE_PATTERNS.md` e `04-DECISIONS/ADR/ADR-002-api-routes-vs-server-actions.md`:

```
API Routes  →  services  →  Prisma
```

A camada `repositories/` separada só se justifica quando houver mais de um consumidor real de dados por trás do mesmo domínio (hoje só existe Prisma/Postgres).

## Catálogo formal de `DomainEvent` (alvo futuro)

Ver `03-ENGINEERING/DOMAIN_EVENTS.md` para a regra de nomenclatura e o estado atual (`HistoricoSinal`, aceito como simplificação — ver `ADR-001`). O catálogo formal, quando implementado, deve:

- Nomear todo evento como um fato de negócio, nunca uma operação de CRUD.
- Ser emitido pelos quatro sistemas (hoje só uma parte emite sinal).
- Ser consumido pelo Motor Cognitivo (ver abaixo), que ainda não existe.

## Motor Cognitivo (congelado — ver `02-PRODUCT/MVP_SCOPE.md`)

Ciclo alvo: Observação → Hipótese → Experimento → Conhecimento. Consome o catálogo formal de `DomainEvent` e alimenta o Centro de Decisão, o Modelo Cognitivo do Empresário e o KnowledgeRegistry. Nenhuma peça deste motor deve ser implementada antes da Fase 2.

## Modelo Cognitivo do Empresário (congelado)

Perfil adaptativo do empresário, construído a partir das respostas de Gestão do Diagnóstico (ver `07-BUSINESS/DIAGNOSTIC.md`, Bloco 3) e do comportamento observado ao longo do uso. As respostas já podem ser coletadas e guardadas hoje — o motor que as interpreta é que está congelado.

## Regra de desacoplamento (vale desde já, não é congelada)

O Centro de Decisão já existe desde a V4 Founder, alimentado por regras simples sobre `HistoricoSinal`. Quando o Motor Cognitivo entrar, ele deve trocar apenas o motor por trás da mesma tela — a experiência do empresário não muda. **Nenhuma implementação atual pode acoplar lógica de decisão diretamente na tela**, justamente para que essa troca futura não exija refazer a UI.

## Documentação viva da arquitetura real

A arquitetura atual do sistema está documentada em `docs/09-ARCHITECTURE/` com mapas navegáveis gerados a partir do código real:

- [ARCHITECTURAL_INVENTORY.md](../09-ARCHITECTURE/ARCHITECTURAL_INVENTORY.md) — inventário completo: camadas, módulos, APIs, ER diagram
- [COGNITIVE_MAP.md](../09-ARCHITECTURE/COGNITIVE_MAP.md) — fluxo cognitivo e detalhamento das 19 engines
- [EVENT_MAP.md](../09-ARCHITECTURE/EVENT_MAP.md) — barramento de eventos, catálogo, DLQ
- [PIPELINE_MAP.md](../09-ARCHITECTURE/PIPELINE_MAP.md) — pipelines do sistema
- [DEPENDENCY_MAP.md](../09-ARCHITECTURE/DEPENDENCY_MAP.md) — grafo de dependências e acoplamentos
- [ADR_NAVIGATOR.md](../09-ARCHITECTURE/ADR_NAVIGATOR.md) — índice navegável das 34 ADRs

Consulte esses documentos para entender **o que o sistema realmente faz hoje** — este arquivo descreve para onde vamos.

## Como usar este documento na prática

- Para decidir o que fazer nesta sprint: não use este arquivo — use `05-OPERATIONS/SPRINTS/SPRINT-001-DIAGNOSTICO.md`.
- Para entender por que o código atual é mais simples do que este documento descreve: `04-DECISIONS/ADR/`.
- Para saber se algo daqui já pode ser implementado: seu status em `02-PRODUCT/MVP_SCOPE.md` decide, não o fato de estar descrito aqui.
