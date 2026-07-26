# KNOWLEDGE_MAP.md — Mapa de Todo o Patrimônio da Ponte Digital

Gerado pela auditoria de 2026-07-13 (ver `../../AUDITORIA_PATRIMONIO_INTELECTUAL.md` na raiz do repositório para o relatório completo). Este arquivo é o índice que amarra tudo — quando não souber onde procurar algo, comece aqui.

## Como este repositório de documentação está organizado hoje

```text
docs/00-START-HERE.md         → ponto de entrada obrigatório para qualquer agente
docs/01-VISION/                → por que a Ponte existe, o que nunca muda
docs/02-PRODUCT/               → o que o produto é, hoje e no roadmap
docs/03-ENGINEERING/           → arquitetura, banco, padrões de código, ADRs, segurança
docs/04-DECISIONS/             → decisions log, changelog, ADRs
docs/05-OPERATIONS/            → sprint atual (em SPRINTS/), backlog, known issues
docs/06-AI/                    → como um agente de IA deve se comportar aqui
docs/07-BUSINESS/              → ICP, pricing, diagnóstico, os 100 fundadores
docs/08-KNOWLEDGE/             → este patrimônio (mapa, lições, decisões, padrões)
```

## A árvore de documentação antiga foi movida para `archive/old-docs/`

Ela existia em `ponte-digital/docs/` com uma organização anterior (`00-foundation` a `06-playbooks`) — ver auditoria, "Achado zero". Na reorganização de 2026-07-13 (Sprint 0.5), `archive/old-docs/` virou o lugar oficial para ela: patrimônio histórico, mas o agente nunca deve ler ali primeiro. **Nota:** os arquivos dessa árvore antiga ainda não foram recebidos neste repositório — a pasta está reservada e vazia até que sejam fornecidos. Quando entrarem, dois documentos de lá merecem ser puxados para dentro da árvore ativa antes de serem esquecidos:

- `00-foundation/MAPA_DE_MATURIDADE.md` — classifica todo conceito já pensado (da filosofia à pesquisa de longo prazo) em 5 níveis de maturidade. Não tem equivalente aqui ainda. **Recomendação:** copiar para `01-VISION/MAPA_DE_MATURIDADE.md`.
- `01-product/CURRENT_STATE.md` — levantamento por inspeção direta do código, mais completo que `03-ENGINEERING/STACK.md` atual.

## Qual documento manda em qual pergunta

```text
Por que a Ponte existe, o que nunca muda           → 01-VISION/FOUNDATION.md, THESIS.md
Missão e as duas camadas (Ecossistema Público / Plataforma Cognitiva) → 01-VISION/THESIS.md
Jornada do usuário / Escada Comunitária (Curioso→Apoiador→Fundador→Embaixador) → 07-BUSINESS/JORNADA_APOIADOR.md
O que o produto é, nesta fase                        → 02-PRODUCT/CURRENT_PRODUCT.md
O que fica fora até validação                         → 02-PRODUCT/MVP_SCOPE.md
Quando/o que priorizar                                 → 02-PRODUCT/ROADMAP.md
Como o sistema é organizado tecnicamente                → 03-ENGINEERING/ARCHITECTURE.md
Stack técnica real                                        → 03-ENGINEERING/STACK.md
Situação real do tenant guard / RLS                        → 03-ENGINEERING/SECURITY.md
Por que uma decisão técnica foi tomada                     → 04-DECISIONS/ADR/
O que está sendo construído nesta semana                    → 05-OPERATIONS/SPRINTS/SPRINT-001-DIAGNOSTICO.md
Como abrir/fechar uma sprint (template + review)              → 05-OPERATIONS/SPRINTS/TEMPLATE.md, SPRINT_REVIEW_TEMPLATE.md
O que vamos medir quando houver uso real (sem números ainda)   → 05-OPERATIONS/METRICS.md
Problemas conhecidos, ainda não resolvidos                    → 05-OPERATIONS/KNOWN_ISSUES.md
Regras de comportamento para agentes de IA                     → 06-AI/AGENTS.md, AI_RULES.md
Proposta pendente sobre o formato do diagnóstico (SOMOD)         → 07-BUSINESS/DIAGNOSTIC_EXPERIENCE_PROPOSAL.md
Vocabulário oficial de qualquer termo do projeto                 → 01-VISION/TERMINOLOGY.md
O que já foi aprendido, sem repetir erro                          → 08-KNOWLEDGE/LESSONS_LEARNED.md
Hipóteses ainda não validadas, e seu status                        → 08-KNOWLEDGE/HYPOTHESES.md
O que já foi validado com uso real (vazio até haver fundadores)     → 08-KNOWLEDGE/VALIDATED_LEARNINGS.md
Onde encontrar qualquer decisão estratégica ou técnica já tomada   → 08-KNOWLEDGE/DECISION_LIBRARY.md
Conhecimento tácito de engenharia que só existia na cabeça de alguém → 08-KNOWLEDGE/ENGINEERING_KNOWLEDGE.md
Decisões de tom/UX já tomadas                                       → 08-KNOWLEDGE/UX_DECISIONS.md
Padrões de negócio observados (pendente até haver clientes reais)    → 08-KNOWLEDGE/BUSINESS_PATTERNS.md
Padrões de comportamento de cliente (pendente até haver clientes)     → 08-KNOWLEDGE/CUSTOMER_PATTERNS.md
```

## Regra de manutenção deste mapa

Sempre que um documento novo entrar em qualquer pasta `docs/`, adicionar uma linha aqui. Sempre que uma pergunta comum não tiver uma linha aqui, isso é sinal de que falta documentação — registrar em `05-OPERATIONS/KNOWN_ISSUES.md`, não deixar para lembrar depois.
