# 00 — Comece Aqui

Este é o primeiro arquivo que qualquer agente (OpenCode, Cline, Claude Code, Gemini CLI, Codex, ou qualquer outro) deve ler ao entrar neste projeto.

> **Release Program v1.0:** Programas 0-5 ✅ **COMPLETO** (24/07/2026). Plataforma **GO-LIVE READY**. Toda evolução futura é v1.1. Nenhuma alteração na v1.0 exceto hotfixes críticos.

## Onde fica o quê no repositório

```
ponte-digital/
├── docs/                    → toda a documentação ativa (esta árvore)
│   └── 09-ARCHITECTURE/     → documentação viva da arquitetura real (gerada do código)
├── sistema/                 → o código da aplicação (Next.js, Prisma, tudo que roda)
├── archive/                 → documentação antiga, histórica — nunca ler primeiro
└── AGENTS.md, README.md     → raiz
```

## Ordem de leitura obrigatória

1. `01-VISION/THESIS.md` — o que a Ponte Digital é e por que existe (visão de longo prazo)
2. `02-PRODUCT/CURRENT_PRODUCT.md` — **a fonte da verdade operacional** durante a fase V4 Founder
3. `09-ARCHITECTURE/ARCHITECTURAL_INVENTORY.md` — arquitetura real do sistema (gerada do código)
4. `05-OPERATIONS/SPRINTS/` — sprint ativa (o que está sendo construído agora)
5. `06-AI/AGENTS.md` — como um agente deve se comportar neste projeto
6. `03-ENGINEERING/STACK.md` — a stack técnica real

Leia também, se a tarefa exigir:
- `06-AI/AI_RULES.md` antes de escrever qualquer código
- `06-AI/TASK_TEMPLATE.md` para estruturar a tarefa
- `06-AI/REVIEW_CHECKLIST.md` antes de considerar a tarefa concluída
- `05-OPERATIONS/KNOWN_ISSUES.md` para não recriar um problema já mapeado
- `05-OPERATIONS/OPS-*.md` para documentos operacionais (segurança, infraestrutura, backup, CI/CD, runbook, go-live)
- `04-DECISIONS/DECISIONS.md` e `09-ARCHITECTURE/ADR_NAVIGATOR.md` para decisões arquiteturais
- `09-ARCHITECTURE/COGNITIVE_MAP.md` para entender o motor cognitivo
- `09-ARCHITECTURE/EVENT_MAP.md` para o barramento de eventos
- `09-ARCHITECTURE/PIPELINE_MAP.md` para os pipelines do sistema
- `09-ARCHITECTURE/DEPENDENCY_MAP.md` para dependências entre camadas
- `09-ARCHITECTURE/KNOWLEDGE_INDEX.md` como índice mestre de toda a plataforma
- `03-ENGINEERING/DATABASE.md` se a tarefa tocar em schema ou banco
- `03-ENGINEERING/SECURITY.md` se a tarefa tocar em tenant guard, RLS, ou multi-empresa
- `01-VISION/TERMINOLOGY.md` sempre que um termo do projeto não estiver claro
- `07-BUSINESS/JORNADA_APOIADOR.md` se a tarefa tocar em Ecossistema Público vs Plataforma Cognitiva
- `02-PRODUCT/ROADMAP.md` se a dúvida for sobre ordem entre fases
- `05-OPERATIONS/VERSION_1.0.md` para o documento oficial da versão
- `05-OPERATIONS/RELEASE_FINAL_V1.md` para o parecer final da release
- `05-OPERATIONS/PLATFORM_CERTIFICATION_V1.md` para a certificação oficial
- `05-OPERATIONS/LESSONS_LEARNED.md` para lições aprendidas
- `05-OPERATIONS/TRANSITION_TO_V1_1.md` para saber como evoluir a plataforma
- `06-ROADMAP/ROADMAP_V1_1.md` para o planejamento da próxima versão
- `09-ARCHITECTURE/PLATFORM_BASELINE_V1.md` para o baseline oficial de comparação

## Hierarquia em caso de conflito

```
01-VISION/FOUNDATION.md, THESIS.md                     → visão de longo prazo (muda quase nunca)
02-PRODUCT/CURRENT_PRODUCT.md                          → manda no escopo do dia a dia (V4 Founder)
05-OPERATIONS/SPRINTS/                                  → sprint ativa (o que fazer nesta semana)
03-ENGINEERING/ARCHITECTURE.md                         → arquitetura futura, NÃO é checklist obrigatório agora
09-ARCHITECTURE/                                       → documentação viva da arquitetura real
```

Se `ARCHITECTURE.md` sugerir algo que `CURRENT_PRODUCT.md` não autoriza para esta fase, **`CURRENT_PRODUCT.md` vence**. Para saber a arquitetura real do sistema, consulte `09-ARCHITECTURE/`.

## Regra de ouro

> Nunca decida sozinho. Se encontrar um conflito entre documentos, ou entre o que foi pedido e o que está documentado: **pare, documente em `05-OPERATIONS/KNOWN_ISSUES.md`, e pergunte.** Não improvise uma regra nova silenciosamente.
