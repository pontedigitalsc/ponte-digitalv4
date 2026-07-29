## Atualização Programa 32 — Materialização da Teoria da Evolução Empresarial

A arquitetura da Ponte Digital foi reposicionada para refletir as **8 Capacidades Fundamentais** da Teoria da Evolução Empresarial:

| Capacidade | Descrição | Engine Correspondente |
|:-----------|-----------|:---------------------:|
| **Observar** | Capturar estímulos, sinais e dados do ambiente | perception-engine |
| **Compreender** | Analisar contexto, detectar padrões e formular hipóteses | context-engine + analysis-engine |
| **Esclarecer** | Validar hipóteses e eliminar ambiguidades | hypothesis-engine + validation-engine |
| **Priorizar** | Classificar urgência, impacto e relevância | priority-engine |
| **Decidir** | Construir decisões ponderadas com base em evidências | decision-engine |
| **Executar** | Agir: alertas, tarefas, planos, intervenções | action-engine |
| **Aprender** | Extrair aprendizado dos resultados e registrar na memória | memory-engine + learning-engine |
| **Evoluir** | Consolidar patrimônio cognitivo e evoluir a identidade | heritage-engine |

O ciclo cognitivo foi atualizado para **8 etapas**:
```
OBSERVAR → COMPREENDER → ESCLARECER → PRIORIZAR → DECIDIR → EXECUTAR → APRENDER → EVOLUIR → OBSERVAR_NOVAMENTE
```

**Novo fluxo do dashboard (visão evolutiva do empresário):**
```
Retrato Vivo → Índice de Capacidade Adaptativa → Capital Cognitivo → Curva Evolutiva → Maior Avanço → Maior Risco → Maior Aprendizado → Próximo Salto → Próximo Melhor Movimento
```

**Capital Cognitivo** — patrimônio invisível composto por: decisões validadas, capacidades desenvolvidas, aprendizados registrados, hipóteses confirmadas, conhecimento acumulado, consistência operacional.

**Princípio absoluto reformulado:** toda funcionalidade deve responder **"Qual capacidade empresarial ela fortalece?"** O critério universal de avaliação passa a ser:
1. Qual capacidade fortalece?
2. Como aumenta o Capital Cognitivo?
3. Como reduz o esforço mental do empresário?

Ver `docs/02-PRODUCT/CURRENT_PRODUCT.md` para detalhes do impacto no produto e `docs/09-ARCHITECTURE/ESPECIFICACAO_DO_MOTOR_COGNITIVO.md` para a especificação atualizada do Motor Cognitivo com o ciclo de 8 estágios.

---

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

## Motor Cognitivo (Programa 32 — ciclo de 8 capacidades)

O Motor Cognitivo foi atualizado para o ciclo de **8 capacidades fundamentais**: OBSERVAR → COMPREENDER → ESCLARECER → PRIORIZAR → DECIDIR → EXECUTAR → APRENDER → EVOLUIR.

As 11 engines anteriores foram reorganizadas em 8 grupos de capacidade. O Motor agora é orientado a fortalecer **Capital Cognitivo** — não apenas processar dados. Consome o catálogo formal de `DomainEvent` e alimenta o Centro de Decisão, o Modelo Cognitivo do Empresário e o KnowledgeRegistry.

**Motor de Clareza** — novo componente que aplica 5 perguntas a cada ciclo: Onde estamos? O que mudou? O que importa? O que pode esperar? Próximo melhor movimento?

**Memória Estratégica** — nova camada que registra sobre toda decisão: Funcionou? Por quê? O que aprendemos? O que repetir? O que não repetir?

Nenhuma peça do Motor Cognitivo completo deve ser implementada antes da Fase 2, mas o novo alinhamento conceitual (8 capacidades, Capital Cognitivo) já orienta o design de novas funcionalidades.

## Modelo Cognitivo do Empresário (Programa 32 — evolução contínua)

Perfil adaptativo do empresário, construído a partir das 8 capacidades. A **Curva Evolutiva** mostra a maturidade de cada capacidade ao longo do tempo. O **Índice de Capacidade Adaptativa (ICA)** é a métrica central — mede quão adaptável o empresário está para enfrentar o próximo desafio. O **Painel do Fundador** oferece visão diária de: evolução das capacidades, patrimônio cognitivo acumulado, capacidades estagnadas e novos conhecimentos gerados.

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
