# FICHAS TÉCNICAS — MOTOR COGNITIVO

**Data:** 26/07/2026 | **Auditor:** Auditor-Chefe de Materialização | **Processo:** P29

Fichas individuais de materialização para cada engine do Motor Cognitivo. A numeração M-XXX é sequencial provisória para backlog de alinhamento documentação-código.

---

## FICHAS INDIVIDUAIS

### Engine: `cognitive-experience-engine.ts`
- **Documentação origem:** COGNITIVE_MAP.md (como `experience-engine.ts`), ARCHITECTURAL_INVENTORY.md, KNOWLEDGE_INDEX.md (nome correto)
- **Fidelidade:** 60%
- **Diferenças:** Nome documentado como `experience-engine.ts` (COGNITIVE_MAP) ou `cognitive-experience-engine.ts` (KNOWLEDGE_INDEX). Código tem 1943 linhas, documentação lista 16 métodos, código tem 30+ funções exportadas. Funções `obterEvolutionExperience`, `EvolutionPlatformFields`, `CognitiveOSFields`, `PerguntaRapida` não documentadas.
- **Impacto da diferença:** Alto — documentação subestima drasticamente a complexidade
- **Item de backlog:** M-001

---

### Engine: `founder-activation-engine.ts`
- **Documentação origem:** ARCHITECTURAL_INVENTORY.md (modelo `EventoAtivacao` no schema)
- **Fidelidade:** 30%
- **Diferenças:** Engine não listada em COGNITIVE_MAP.md como motor separado. Modelo `EventoAtivacao` existe no schema, mas engine não é descrita funcionalmente.
- **Impacto da diferença:** Médio — funcionalidade existe e é usada pelo orchestrator
- **Item de backlog:** M-002

---

### Engine: `cognitive-observatory.ts`
- **Documentação origem:** Nenhuma
- **Fidelidade:** 0%
- **Diferenças:** Engine completamente ausente de toda documentação arquitetural
- **Impacto da diferença:** Alto — `obterResumoCognitivo`, `obterAlertasGovernanca` são usados pelo orchestrator
- **Item de backlog:** M-003

---

### Engine: `cognitive-briefing-engine.ts`
- **Documentação origem:** Nenhuma
- **Fidelidade:** 0%
- **Diferenças:** Engine não documentada. Produtor de `CognitiveBriefing`, consumido pelo cognitive-experience-engine.
- **Impacto da diferença:** Médio
- **Item de backlog:** M-004

---

### Engine: `cognitive-context-engine.ts`
- **Documentação origem:** COGNITIVE_MAP.md (como `context-engine.ts`)
- **Fidelidade:** 70%
- **Diferenças:** Nome sem prefixo `cognitive-` na documentação. Comportamento corresponde.
- **Impacto da diferença:** Baixo
- **Item de backlog:** M-005

---

### Engine: `cognitive-evolution-engine.ts`
- **Documentação origem:** COGNITIVE_MAP.md (sem prefixo `cognitive-`), KNOWLEDGE_INDEX.md (nome correto)
- **Fidelidade:** 80%
- **Diferenças:** Nome inconsistente entre docs.
- **Impacto da diferença:** Baixo
- **Item de backlog:** M-006

---

### Engine: `cognitive-journey-engine.ts`
- **Documentação origem:** COGNITIVE_MAP.md (como `journey-engine.ts`)
- **Fidelidade:** 80%
- **Diferenças:** Nome sem prefixo `cognitive-`.
- **Impacto da diferença:** Baixo
- **Item de backlog:** M-007

---

### Engine: `cognitive-memory-engine.ts`
- **Documentação origem:** COGNITIVE_MAP.md (como `memory-engine.ts`)
- **Fidelidade:** 75%
- **Diferenças:** Nome sem prefixo `cognitive-`. Documentação menciona hierarquia de memória de 4 níveis, código implementa `consultarMemoria`, `registrarNaMemoria`, `analisarEvolucao`.
- **Impacto da diferença:** Baixo
- **Item de backlog:** M-008

---

### Engine: `cognitive-milestone-engine.ts`
- **Documentação origem:** Nenhuma
- **Fidelidade:** 0%
- **Diferenças:** Engine não documentada. Produz `CognitiveMilestone`, consumido pelo experience-engine.
- **Impacto da diferença:** Médio
- **Item de backlog:** M-009

---

### Engine: `cognitive-notification-engine.ts`
- **Documentação origem:** COGNITIVE_MAP.md (como `notification-engine.ts`)
- **Fidelidade:** 80%
- **Diferenças:** Nome sem prefixo `cognitive-`.
- **Impacto da diferença:** Baixo
- **Item de backlog:** M-010

---

### Engine: `cognitive-orchestrator.ts`
- **Documentação origem:** COGNITIVE_MAP.md (como `orchestrator-engine.ts`), KNOWLEDGE_INDEX.md (como `cognitive-orchestrator-engine.ts`)
- **Fidelidade:** 45%
- **Diferenças:** Nome documentado diverge em 2 docs diferentes (ambos errados). Documentação descreve pipeline linear de 12 passos; código tem 935 linhas com 7 pipelines, `EventPublisher`, `PipelineComparator`, `feature-flags`, `cognitive-pipeline-store`, `EstadoCognitivoCompleto` não documentados.
- **Impacto da diferença:** Crítico — orquestrador central do sistema com documentação imprecisa
- **Item de backlog:** M-011

---

### Engine: `cognitive-routine-engine.ts`
- **Documentação origem:** Nenhuma
- **Fidelidade:** 0%
- **Diferenças:** Engine não documentada. Não confundir com `ritmo-engine.ts` (que existe separadamente).
- **Impacto da diferença:** Médio
- **Item de backlog:** M-012

---

### Engine: `cognitive-timeline-engine.ts`
- **Documentação origem:** COGNITIVE_MAP.md (como `timeline-engine.ts`)
- **Fidelidade:** 80%
- **Diferenças:** Nome sem prefixo `cognitive-`.
- **Impacto da diferença:** Baixo
- **Item de backlog:** M-013

---

### Engine: `cognitive-workflow-engine.ts`
- **Documentação origem:** COGNITIVE_MAP.md (como `workflow-engine.ts`)
- **Fidelidade:** 80%
- **Diferenças:** Nome sem prefixo `cognitive-`.
- **Impacto da diferença:** Baixo
- **Item de backlog:** M-014

---

### Engine: `company-maturity-engine.ts`
- **Documentação origem:** Nenhuma
- **Fidelidade:** 0%
- **Diferenças:** Engine não documentada. Produz `CompanyMaturity`, `NivelMaturidade`, consumido pelo experience-engine.
- **Impacto da diferença:** Médio
- **Item de backlog:** M-015

---

### Engine: `confidence-drift-engine.ts`
- **Documentação origem:** Nenhuma
- **Fidelidade:** 0%
- **Diferenças:** Engine não documentada. Calcula deriva de confiança.
- **Impacto da diferença:** Médio
- **Item de backlog:** M-016

---

### Engine: `conversation-engine.ts`
- **Documentação origem:** COGNITIVE_MAP.md (nome correto)
- **Fidelidade:** 80%
- **Diferenças:** Nome correto, comportamento corresponde.
- **Impacto da diferença:** Baixo
- **Item de backlog:** M-017

---

### Engine: `decision-engine.ts`
- **Documentação origem:** COGNITIVE_MAP.md (nome correto), KNOWLEDGE_INDEX.md (como `cognitive-decision-engine.ts` — ERRO: não existe)
- **Fidelidade:** 80%
- **Diferenças:** KNOWLEDGE_INDEX.md referencia arquivo inexistente; nome real é `decision-engine.ts` sem prefixo.
- **Impacto da diferença:** Médio — documento referencia arquivo que não existe
- **Item de backlog:** M-018

---

### Engine: `evidence-engine.ts`
- **Documentação origem:** ARCHITECTURAL_INVENTORY.md (modelo Evidencia)
- **Fidelidade:** 40%
- **Diferenças:** Modelo documentado, engine não descrita como motor separado. Código tem `registrarEvidencia`, `consultarEvidencias`, `contagemPorCategoria`.
- **Impacto da diferença:** Médio
- **Item de backlog:** M-019

---

### Engine: `feedback-intelligence-engine.ts`
- **Documentação origem:** COGNITIVE_MAP.md (como `feedback-engine.ts`)
- **Fidelidade:** 75%
- **Diferenças:** Nome sem sufixo `-intelligence-`. Comportamento similar.
- **Impacto da diferença:** Baixo
- **Item de backlog:** M-020

---

### Engine: `forgetting-engine.ts`
- **Documentação origem:** COGNITIVE_MAP.md (mencionado dentro da Memory Engine)
- **Fidelidade:** 10%
- **Diferenças:** Engine separada no código, documentada como subfunção. Código tem `avaliar`, `getForgettingStats`, `EstadoConhecimento`.
- **Impacto da diferença:** Médio — engine autônoma vs subfunção documentada
- **Item de backlog:** M-021

---

### Engine: `identity-engine.ts`
- **Documentação origem:** COGNITIVE_MAP.md (nome correto)
- **Fidelidade:** 65%
- **Diferenças:** Documentação descreve promoção de hipóteses; no código isso está em `knowledge-governance-engine.ts`. Código tem `vincularConversa`, `registrarHistoricoConversa` não documentados.
- **Impacto da diferença:** Médio
- **Item de backlog:** M-022

---

### Engine: `knowledge-aging-engine.ts`
- **Documentação origem:** Nenhuma como engine separada
- **Fidelidade:** 10%
- **Diferenças:** Documentada apenas como subfunção de Memory Engine. Código tem engine independente com `avaliarEnvelhecimento`.
- **Impacto da diferença:** Médio
- **Item de backlog:** M-023

---

### Engine: `knowledge-governance-engine.ts`
- **Documentação origem:** COGNITIVE_MAP.md (como `knowledge-engine.ts` — arquivo que NÃO EXISTE)
- **Fidelidade:** 15%
- **Diferenças:** **Crítico:** Documentação referencia `knowledge-engine.ts` que não existe. A engine real chama-se `knowledge-governance-engine.ts` e contém funções de governança, validação, promoção e auditoria de conhecimento.
- **Impacto da diferença:** Crítico — engenheiro buscando `knowledge-engine.ts` não encontra nada
- **Item de backlog:** M-024

---

### Engine: `outcome-intelligence-engine.ts`
- **Documentação origem:** COGNITIVE_MAP.md (como `outcome-engine.ts`)
- **Fidelidade:** 75%
- **Diferenças:** Nome sem sufixo `-intelligence-`. Comportamento corresponde.
- **Impacto da diferença:** Baixo
- **Item de backlog:** M-025

---

### Engine: `pipeline-comparator.ts`
- **Documentação origem:** Nenhuma
- **Fidelidade:** 0%
- **Diferenças:** Engine completamente ausente da documentação. Usada pelo cognitive-orchestrator para comparar pipelines.
- **Impacto da diferença:** Alto — componente usado pelo orquestrador central sem documentação
- **Item de backlog:** M-026

---

### Engine: `priority-engine.ts`
- **Documentação origem:** Nenhuma
- **Fidelidade:** 0%
- **Diferenças:** Engine não documentada.
- **Impacto da diferença:** Médio
- **Item de backlog:** M-027

---

### Engine: `relevance-engine.ts`
- **Documentação origem:** Nenhuma
- **Fidelidade:** 0%
- **Diferenças:** Engine não documentada.
- **Impacto da diferença:** Médio
- **Item de backlog:** M-028

---

### Engine: `ritmo-engine.ts`
- **Documentação origem:** COGNITIVE_MAP.md (nome correto), KNOWLEDGE_INDEX.md (como `cognitive-ritmo-engine.ts` — nome errado)
- **Fidelidade:** 80%
- **Diferenças:** KNOWLEDGE_INDEX.md referencia arquivo inexistente.
- **Impacto da diferença:** Médio
- **Item de backlog:** M-029

---

### Engine: `signal-engine.ts`
- **Documentação origem:** COGNITIVE_MAP.md (como `sinal-engine.ts` — nome em português), KNOWLEDGE_INDEX.md (como `cognitive-sinal-engine.ts` — arquivo inexistente)
- **Fidelidade:** 75%
- **Diferenças:** Nome em português na doc (`sinal`), nome em inglês no código (`signal`). KNOWLEDGE_INDEX.md referencia arquivo que não existe.
- **Impacto da diferença:** Médio — confusão de nomenclatura português/inglês
- **Item de backlog:** M-030

---

### Engine: `synthesis-engine.ts`
- **Documentação origem:** Nenhuma
- **Fidelidade:** 0%
- **Diferenças:** Engine não documentada. Código tem `executarSintese`, `getSynthesisStats`, `identificarGrupos`, `gerarSintese`.
- **Impacto da diferença:** Alto — engine de síntese usada pela cognitive-heritage-facade
- **Item de backlog:** M-031

---

### Engine: `trust-engine.ts`
- **Documentação origem:** ARCHITECTURAL_INVENTORY.md (modelo `ConfiancaFonte` no schema)
- **Fidelidade:** 30%
- **Diferenças:** Modelo documentado, engine não descrita funcionalmente. Código tem `obterScore`, `registrarAcerto`, `registrarErro`, `aplicarDecaimento`.
- **Impacto da diferença:** Médio
- **Item de backlog:** M-032

---

### Engine: `validation-engine.ts`
- **Documentação origem:** ARCHITECTURAL_INVENTORY.md (marcada como "MORTA")
- **Fidelidade:** 90%
- **Diferenças:** Ambas as fontes (documentação e código) concordam que é uma engine morta.
- **Impacto da diferença:** Baixo
- **Item de backlog:** M-033

---

### Engine: `action-intelligence-engine.ts`
- **Documentação origem:** COGNITIVE_MAP.md (nome correto), KNOWLEDGE_INDEX.md (como `cognitive-action-intelligence-engine.ts` — nome errado)
- **Fidelidade:** 80%
- **Diferenças:** KNOWLEDGE_INDEX.md adiciona prefixo `cognitive-` que não existe no arquivo real.
- **Impacto da diferença:** Baixo
- **Item de backlog:** M-034

---

## TABELA RESUMO

| Grau de Fidelidade | Contagem | Engines |
|---|---|---|
| **0%** (sem documentação) | 10 | cognitive-briefing-engine, cognitive-action-composer, cognitive-milestone-engine, cognitive-routine-engine, company-maturity-engine, confidence-drift-engine, cognitive-observatory, pipeline-comparator, priority-engine, relevance-engine |
| **10%** (menção indireta) | 2 | knowledge-aging-engine, forgetting-engine |
| **15%** (documentação com nome errado) | 1 | knowledge-governance-engine |
| **30%** (modelo existe, engine não descrita) | 3 | founder-activation-engine, trust-engine, evidence-engine |
| **40-50%** (documentação desatualizada) | 2 | cognitive-orchestrator (45%), cognitive-experience-engine (60% — na média 45%) |
| **60-65%** (documentação parcial) | 2 | identity-engine (65%), aprendizado-service (~50%) |
| **70-80%** (documentação próxima) | 14 | cognitive-context-engine (70%), cognitive-evolution-engine (80%), cognitive-journey-engine (80%), cognitive-memory-engine (75%), cognitive-notification-engine (80%), cognitive-timeline-engine (80%), cognitive-workflow-engine (80%), conversation-engine (80%), decision-engine (80%), feedback-intelligence-engine (75%), outcome-intelligence-engine (75%), signal-engine (75%), ritmo-engine (80%), action-intelligence-engine (80%) |
| **90%** (engine morta) | 1 | validation-engine (90%) |

| Faixa | Quantidade | % |
|---|---|---|
| 0% (sem doc) | 10 | 29% |
| 10-30% (quase sem doc) | 6 | 18% |
| 40-65% (doc parcial) | 4 | 12% |
| 70-80% (doc próxima) | 14 | 41% |
| 90% (morta) | 1 | 3% |
| **Total** | **35** | **100%** |

**Mediana de fidelidade:** 30% (10 engines em 0%, 6 abaixo de 30%)

---

## RESUMO POR PRIORIDADE DE ALINHAMENTO

| Prioridade | Engines | Ação esperada |
|---|---|---|
| **P0** | cognitive-orchestrator, knowledge-governance-engine, cognitive-heritage-facade | Alinhamento imediato: documentar ou renomear |
| **P1** | cognitive-experience-engine, cognitive-observatory, pipeline-comparator, synthesis-engine | Documentar comportamento real |
| **P2** | knowledge-aging-engine, forgetting-engine, trust-engine, evidence-engine, founder-activation-engine, company-maturity-engine, confidence-drift-engine, cognitive-briefing-engine, cognitive-milestone-engine, cognitive-routine-engine, cognitive-action-composer, priority-engine, relevance-engine | Decidir se merecem documentação ou são "engines de conveniência" (Lei 7) |
| **P3** | Todas as 14 engines com 70-80% | Corrigir nomes nos documentos existentes |
| **P4** | validation-engine | Manter como está (morta, documentada) |
