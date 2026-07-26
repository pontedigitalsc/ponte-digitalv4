# Roadmap

Este arquivo é sobre **fases**, não sprints. Para o que está sendo construído nesta semana, ver `05-OPERATIONS/SPRINTS/SPRINT-001-DIAGNOSTICO.md`. Para a ordem prevista dos próximos itens dentro da fase atual, ver `05-OPERATIONS/BACKLOG.md`.

## Jornada do usuário (Escada Comunitária) — desde 2026-07-14

Complementar às fases técnicas abaixo: descreve como o **usuário** avança, não como o **produto** é construído.

```
Curioso → Apoiador → Fundador → Embaixador
```

Detalhamento completo em `07-BUSINESS/JORNADA_APOIADOR.md` (ver ADR-003). As fases técnicas abaixo continuam sendo a referência de o que construir; a jornada é a referência de para quem e por quê.

## Fase atual — V4 Founder

Objetivo: colocar 100 fundadores usando uma versão básica, mas funcional, da Ponte, para acumular evidências reais antes de investir em arquitetura cognitiva sofisticada (ver `02-PRODUCT/MVP_SCOPE.md`).

Ordem macro dentro desta fase:

1. ~~Infraestrutura~~ ✅ login, empresas, usuários, permissões, multiempresa.
2. ~~CRM~~ ✅ pipeline de Lead, kanban, temperatura, conversão.
3. ~~Financeiro~~ ✅ transações, categorização, recorrência.
4. ~~Tarefas~~ ✅ criação, atribuição, prioridade, tipos.
5. ~~Diagnóstico Inteligente~~ ✅ 5 blocos (empresa, operação, gestão, problemas, objetivos) via `/conversa`.
6. ~~Knowledge Vault~~ ✅ Biblioteca de Conhecimento (`/dashboard/conhecimento`).
7. ~~Conversational Learning~~ ✅ Aprendizados explícitos (`/dashboard/aprendizados`).
8. Agenda como capacidade — ainda não existe.
9. Centro de Decisão (tela dedicada sobre `HistoricoSinal`).
10. Assistente da Ponte com contexto completo (diagnóstico + aprendizados).
11. Validação com os 100 fundadores e coleta de evidências (ver `07-BUSINESS/FOUNDERS.md`).

## Hierarquia de documentos da plataforma

Desde a criação da Ontologia Cognitiva (`03-ENGINEERING/ONTOLOGIA_COGNITIVA.md`), a hierarquia documental é:

```
Constituição (Docs 0–9)
    ↓
Ontologia Cognitiva (19 conceitos fundamentais)
    ↓
Motor Cognitivo (16 submotores, pipeline, 20 princípios)
    ↓
DDD (13 bounded contexts, 20 agregados, 22 eventos)
    ↓
ADRs (34 decisões arquiteturais aprovadas)
    ↓
Implementação (código, banco, telas)
```

## Fase 2 — Implementação das ADRs aprovadas (plano de 6 fases)

As 34 ADRs (001–034) foram aprovadas. A implementação da arquitetura definida segue o plano de 6 fases da auditoria (`03-ENGINEERING/AUDITORIA_ARQUITETURAL.md`), não um rollout único:

```
Fase 0 ─────── Documentação (ADR-009, ADR-033 separar invariantes)
Fase 1 ─────── Fundação (ADR-010 agregado único, ADR-013 ciclo contínuo)
Fase 2 ─────── Comunicação (ADR-011 Event Bus, ADR-012 catálogo,
               ADR-031 Padrão/Correlação)
Fase 3 ─────── Desacoplamento (repositórios, remover @prisma/client,
               ADR-029 renomear agregados, ADR-030 eliminar duplicatas)
Fase 4 ─────── Escala (ADR-014 cache, eliminar N+1,
               ADR-032 convicção na priorização)
Fase 5 ─────── Limpeza (Experience Engine p/ apresentação, handlers dedicados,
               ADR-034 política causalidade)
Fase 6 ─────── Contínuo (HistoricoSinal → eventos reais)
```

**As fases iniciam quando a Fase 0 estiver concluída** (documentação alinhada), não quando os 100 fundadores estiverem validados. ADRs 015–028 (Motor Cognitivo) e ADRs 029–034 (Ontologia) são implementadas gradualmente dentro dessas fases.

Itens que permanecem pós-validação (sem ADR e sem previsão):

- Camada `server/actions/services/repositories`.
- Modelo Cognitivo do Empresário.

## Fase 3 (visão de longo prazo) — sem data, condicionada a evidência

- Patrimônio Empresarial (5 dimensões) com visualizações.
- KnowledgeRegistry e Patrimônios de Conhecimento.
- Inteligência Coletiva (escopo coletivo/institucional).

## Regra de atualização

Este documento muda quando uma fase inteira é concluída ou reordenada — não a cada sprint. Mudança de fase é decisão de fundador, registrada em `DECISIONS.md`, nunca inferida por um agente a partir do progresso técnico.

Para o plano de implementação detalhado das ADRs aprovadas, ver `03-ENGINEERING/AUDITORIA_ARQUITETURAL.md` seção 9 (Plano de Refatoração Arquitetural).
