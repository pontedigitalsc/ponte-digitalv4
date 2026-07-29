# Mapa de Dependências — Programa 30

## Ordem Obrigatória de Implementação

```
FASE 0 — FUNDAÇÃO (já existe)
├── MC-026: /api/conversa/finalizar chama orquestrador ← PRIMEIRO (desbloqueia o pipeline)
├── MC-022: Pausa cognitiva antes de insights (frontend puro)
├── MC-023: Micro-reações com 4 tipos integrados (frontend puro)
└── MC-024: Loading inteligente conectado a estados reais (frontend)

FASE 1 — MEMÓRIA (Pilar 1)
├── MC-001: Registrar Q&A individuais no banco
├── MC-002: Assistente gera evidência automaticamente
├── MC-003: Memória molda contexto do assistente
└── MC-004: Respostas vinculadas a categoria cognitiva

FASE 2 — HIPÓTESES (Pilar 2)
├── MC-005: Criar hipótese automaticamente por padrão de evidência
├── MC-006: Decaimento temporal de hipóteses (rotina diária)
└── MC-007: Feedback afeta hipóteses relacionadas (não todas)

FASE 3 — CONFIANÇA (Pilar 3)
├── MC-008: Confiança por hipótese persiste automaticamente
├── MC-009: API de confiança exposta
├── MC-010: Trust Engine integrado ao pipeline
└── MC-011: Decaimento de confiança persistido

FASE 4 — INVESTIGAÇÃO (Pilar 4)
├── MC-012: Perguntas adaptativas por incerteza (DEPENDE: MC-005, MC-008)
├── MC-013: Lacunas no painel cognitivo (DEPENDE: MC-012)
├── MC-014: Knowledge Gap Engine (DEPENDE: MC-012)
└── MC-015: IA sugere aprofundamento (DEPENDE: MC-012, MC-008)

FASE 5 — MAPA + EXPLICAÇÃO (Pilares 5 e 6)
├── MC-016: Mapa cognitivo com dados reais
├── MC-017: Conexões entre áreas (DEPENDE: MC-016)
├── MC-018: Timeline cognitiva no dashboard
├── MC-019: Explanation Engine (DEPENDE: MC-005, MC-008)
├── MC-020: Explicações no assistente/dashboard (DEPENDE: MC-019)
└── MC-021: Templates de linguagem natural (DEPENDE: MC-019)

FASE 6 — ATUALIZAÇÃO CONTÍNUA (Pilar 8)
├── MC-025: Eventos de negócio disparam pipeline (DEPENDE: FASE 1-2)
├── MC-027: Rotina diária evolui identidade (DEPENDE: FASE 2)
└── MC-028: Validation engine integrada (independente)
```

## Diagrama Visual

```
FASE 0 (fundação)
    │
    ▼
MC-026 ─────────────────────────────────────────────┐
MC-022                                              │
MC-023                                              │
MC-024                                              │
    │                                               │
    ▼                                               │
FASE 1 (memória)                                    │
MC-001 ──► MC-002 ──► MC-003 ──► MC-004            │
    │                                               │
    ▼                                               │
FASE 2 (hipóteses)                                  │
MC-005 ──► MC-006 ──► MC-007                       │
    │                                               │
    ▼                                               │
FASE 3 (confiança)                                  │
MC-008 ──► MC-009 ──► MC-010 ──► MC-011            │
    │                                               │
    ├───────────────────────────────────────────────┘
    ▼
FASE 4 (investigação)
MC-012 ──► MC-013 ──► MC-014 ──► MC-015
    │
    ├──────────────────┐
    ▼                  ▼
FASE 5a (mapa)      FASE 5b (explicação)
MC-016 ─► MC-017    MC-019 ─► MC-020 ─► MC-021
MC-018
    │
    ▼
FASE 6 (atualização contínua)
MC-025 ──► MC-027 ──► MC-028
```

## Regra de Implementação

Nenhum item pode ser iniciado enquanto suas dependências (→) não estiverem concluídas. Itens no mesmo nível (─►) podem ser implementados em paralelo.

## Próxima Sprint (FASE 0 + início FASE 1)

1. MC-026: `/api/conversa/finalizar` → chama `processarConversa` do orquestrador
2. MC-022: Pausa cognitiva de 1-2s antes de revelar insight
3. MC-023: Micro-reações integradas com estados reais
4. MC-024: Loading inteligente com progresso real
5. MC-001: Nova tabela `respostas_individuais` + registro de Q&A
6. MC-002: Assistente API registra evidência automaticamente
