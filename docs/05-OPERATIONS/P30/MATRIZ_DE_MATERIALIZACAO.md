# Matriz de Materialização — Programa 30

## Legenda

- **MC-XXX**: Código único do comportamento
- **Pilar**: 1 (Memória) / 2 (Hipóteses) / 3 (Confiança) / 4 (Investigação) / 5 (Mapa) / 6 (Explicação) / 7 (Descoberta) / 8 (Atualização)
- **Estado Atual**: `Ausente` / `Parcial` / `Existe` / `Completo`
- **Complexidade**: `XS` (<4h) / `S` (1-2d) / `M` (3-5d) / `L` (1-2sem) / `XL` (>2sem)
- **Prioridade**: `P0` (bloqueia) / `P1` (essencial) / `P2` (melhoria)
- **Dependências**: lista de MC-XXX que precisam estar concluídos antes

---

## PILAR 1 — Memória Contextual Permanente

Toda resposta altera permanentemente o contexto. Nada é descartável.

| Código | Comportamento | Estado Atual | Estado Desejado | Complexidade | Prioridade | Dependências | Arquivos Impactados |
|---|---|---|---|---|---|---|---|
| MC-001 | Registrar pares Q&A individuais no banco (não apenas agregado JSON) | Ausente | Cada pergunta-resposta vira um registro individual com contexto | M | P0 | — | `conversation-engine.ts`, schema Prisma (nova tabela `respostas_individuais`) |
| MC-002 | Toda resposta do assistente gera evidência automaticamente | Ausente | Assistente API chama `registrarEvidencia` para cada interação | M | P0 | — | `assistente/route.ts`, `evidence-engine.ts` |
| MC-003 | Memória acumulada molda o contexto da próxima interação | Parcial | `decidirContexto` já considera memória, mas assistente não carrega memória recente | S | P0 | MC-002 | `assistente/route.ts`, `cognitive-context-engine.ts` |
| MC-004 | Cada resposta do empresário é vinculada a uma categoria cognitiva | Ausente | Respostas são mapeadas para `CategoriaEvidencia` automaticamente | S | P1 | MC-001 | `conversation-engine.ts`, `cognitive-context-engine.ts` |

## PILAR 2 — Hipóteses Dinâmicas

Toda hipótese nasce fraca. Toda hipótese cresce lentamente. Toda hipótese pode morrer.

| Código | Comportamento | Estado Atual | Estado Desejado | Complexidade | Prioridade | Dependências | Arquivos Impactados |
|---|---|---|---|---|---|---|---|
| MC-005 | Criar hipótese automaticamente quando 3+ evidências na mesma categoria | Ausente | `analisarEvolucao` cria hipóteses no banco, não apenas detecta | M | P0 | MC-001 | `cognitive-memory-engine.ts`, `cognitive-orchestrator.ts` |
| MC-006 | Hipóteses enfraquecem por falta de evidência (decaimento temporal) | Parcial | `validarHipoteses` já faz scoring, mas sem decaimento automático | M | P1 | MC-005 | `cognitive-memory-engine.ts`, `cognitive-orchestrator.ts` (rotina diária) |
| MC-007 | Feedback do empresário fortalece/enfraquece hipóteses relacionadas (não todas da categoria) | Parcial | Hoje afeta TODAS da categoria. Deve afetar apenas as relacionadas semanticamente | M | P1 | MC-005 | `feedback-intelligence-engine.ts` |

## PILAR 3 — Sistema de Confiança

A confiança é visível, explicável e dinâmica.

| Código | Comportamento | Estado Atual | Estado Desejado | Complexidade | Prioridade | Dependências | Arquivos Impactados |
|---|---|---|---|---|---|---|---|
| MC-008 | Confiança por hipótese é calculada e persistida sempre que muda | Parcial | `ConfidenceRing` component existe. Persistência de drift precisa ser automática | S | P0 | MC-005, P0 UI | `confidence-drift-engine.ts`, `cognitive-orchestrator.ts` (rotina) |
| MC-009 | Confiança geral da empresa é exposta via API | Ausente | Endpoint GET `/api/cognitivo/trust` retorna confiança geral + por área | S | P1 | MC-008 | novo endpoint, `cognitive-heritage-facade.ts` |
| MC-010 | Trust Engine integrado ao pipeline cognitivo | Ausente | Trust scores são usados para ponderar decisões e contexto | M | P1 | MC-008 | `trust-engine.ts`, `cognitive-orchestrator.ts`, `decision-engine.ts` |
| MC-011 | Decaimento de confiança é persistido automaticamente | Ausente | `recalcularDecaimento` salva no banco, não só em memória | S | P1 | MC-010 | `trust-engine.ts` |

## PILAR 4 — Investigação Adaptativa

A próxima pergunta reduz a maior incerteza, não segue sequência fixa.

| Código | Comportamento | Estado Atual | Estado Desejado | Complexidade | Prioridade | Dependências | Arquivos Impactados |
|---|---|---|---|---|---|---|---|
| MC-012 | Perguntas deixam de ser sequenciais: escolha baseada em incerteza | Ausente | Hoje FLUXOS têm ordem fixa. Novo motor seleciona pergunta que minimiza incerteza | XL | P0 | MC-005, MC-008 | `conversation-engine.ts`, novo `adaptive-question-engine.ts` |
| MC-013 | Áreas não exploradas viram "?" no painel cognitivo | Parcial | `CognitivePanel` já renderiza lacunas. Falta integração com dados reais | S | P1 | MC-012 | `cognitive-panel.tsx`, `cognitive-heritage-facade.ts` |
| MC-014 | Perguntas são priorizadas por lacuna de conhecimento | Ausente | Nova engine calcula "gap de conhecimento" por área e ordena perguntas | L | P1 | MC-012 | novo `knowledge-gap-engine.ts` |
| MC-015 | IA sugere aprofundamento quando confiança é baixa | Ausente | Quando confiança < 40%, IA pergunta "quer que eu investigue mais X?" | S | P2 | MC-012, MC-008 | `assistente/route.ts`, `cognitive-briefing-engine.ts` |

## PILAR 5 — Mapa Cognitivo Vivo

O conhecimento acumulado é visível e navegável.

| Código | Comportamento | Estado Atual | Estado Desejado | Complexidade | Prioridade | Dependências | Arquivos Impactados |
|---|---|---|---|---|---|---|---|
| MC-016 | Mapa cognitivo renderiza áreas exploradas vs lacunas | Parcial | Componente existe, conectado a dados reais do patrimônio | S | P1 | MC-005, MC-008 | `cognitive-panel.tsx`, `dashboard/page.tsx` |
| MC-017 | Conexões entre áreas são visíveis (relações causais) | Ausente | Hipóteses relacionadas são conectadas visualmente | M | P2 | MC-016 | novo `components/cognitive/connection-map.tsx` |
| MC-018 | Timeline cognitiva no dashboard | Parcial | `cognitive-timeline-engine` existe mas não está no dashboard | S | P2 | — | `cognitive-timeline-engine.ts`, `dashboard/page.tsx` |

## PILAR 6 — Explicação Inteligente

Quando a confiança muda, o empresário entende por quê.

| Código | Comportamento | Estado Atual | Estado Desejado | Complexidade | Prioridade | Dependências | Arquivos Impactados |
|---|---|---|---|---|---|---|---|
| MC-019 | Gerar explicação "você disse X → concluí Y" para cada insight | Ausente | Nova engine que rastreia cadeia de evidências | M | P0 | MC-005, MC-008 | novo `explanation-engine.ts`, `cognitive-briefing-engine.ts` |
| MC-020 | Explicações aparecem no assistente e no dashboard | Ausente | Explicações são injetadas na resposta da IA e nos cards do dashboard | M | P1 | MC-019 | `assistente/route.ts`, `components/cognitive/` |
| MC-021 | Explicações usam linguagem natural, não termos técnicos | Ausente | Template engine converte cadeia de evidência em texto legível | S | P2 | MC-019 | novo `lib/templates/explanations.ts` |

## PILAR 7 — Descoberta Progressiva

A conversa parece uma Investigação, não um formulário.

| Código | Comportamento | Estado Atual | Estado Desejado | Complexidade | Prioridade | Dependências | Arquivos Impactados |
|---|---|---|---|---|---|---|---|
| MC-022 | IA faz pausa cognitiva antes de insights (1-2s) | Ausente | Delay antes de revelar insight, com indicador visual "processando" | XS | P0 | — | `components/conversa/revelacao-card.tsx`, `app/conversa/page.tsx` |
| MC-023 | Micro-reações evoluem para 4 tipos (recebido, processando, insight, completo) | Parcial | Componente `MicroReaction` já tem 4 variantes. Integrar com estados reais | S | P1 | — | `app/conversa/page.tsx`, `micro-reaction.tsx` |
| MC-024 | Loading inteligente usa 7 fases reais do motor cognitivo | Parcial | 7 fases existem no frontend. Conectar com progresso real do pipeline | M | P1 | MC-005, MC-008 | `app/conversa/page.tsx`, `cognitive-orchestrator.ts` |

## PILAR 8 — Atualização Contínua

Toda interação alimenta o aprendizado.

| Código | Comportamento | Estado Atual | Estado Desejado | Complexidade | Prioridade | Dependências | Arquivos Impactados |
|---|---|---|---|---|---|---|---|
| MC-025 | Toda ação do empresário nos módulos gera evento cognitivo | Ausente | Eventos de negócio (criar cliente, concluir tarefa) disparam pipeline cognitivo | L | P0 | MC-005 | `event-publisher.ts`, `cognitive-orchestrator.ts`, `subscribers/` |
| MC-026 | `/api/conversa/finalizar` chama o pipeline completo do orquestrador | Ausente | Finalização da conversa dispara `processarConversa` | S | P0 | — | `conversa/finalizar/route.ts` |
| MC-027 | Rotina diária inclui evolução de identidade e contexto | Ausente | `executarRotinaDiaria` também chama `evoluirIdentidade` e reavalia contexto | M | P1 | MC-005 | `cognitive-orchestrator.ts`, `identity-engine.ts` |
| MC-028 | Validação engine integrada às rotinas | Ausente | `validarSinaisCruzado`, `validarDecisoesComOutcomes` são chamados nas rotinas | S | P2 | — | `validation-engine.ts`, `cognitive-orchestrator.ts` |

---

## Resumo

| Pilar | Total | P0 | P1 | P2 | XS | S | M | L | XL |
|---|---|---|---|---|---|---|---|---|---|
| 1 — Memória | 4 | 2 | 2 | 0 | 0 | 2 | 2 | 0 | 0 |
| 2 — Hipóteses | 3 | 1 | 2 | 0 | 0 | 0 | 3 | 0 | 0 |
| 3 — Confiança | 4 | 1 | 3 | 0 | 0 | 3 | 1 | 0 | 0 |
| 4 — Investigação | 4 | 1 | 2 | 1 | 0 | 1 | 1 | 1 | 1 |
| 5 — Mapa | 3 | 0 | 1 | 2 | 0 | 2 | 1 | 0 | 0 |
| 6 — Explicação | 3 | 1 | 1 | 1 | 0 | 1 | 2 | 0 | 0 |
| 7 — Descoberta | 3 | 1 | 2 | 0 | 1 | 1 | 1 | 0 | 0 |
| 8 — Atualização | 4 | 2 | 1 | 1 | 0 | 1 | 1 | 1 | 0 |
| **Total** | **28** | **9** | **14** | **5** | **1** | **11** | **12** | **2** | **1** |
