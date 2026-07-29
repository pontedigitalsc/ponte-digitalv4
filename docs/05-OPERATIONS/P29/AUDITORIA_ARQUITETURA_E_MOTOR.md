# AUDITORIA ARQUITETURA (Camada 1) E MOTOR COGNITIVO (Camada 2)

**Data:** 26/07/2026 | **Auditor:** Auditor-Chefe de Materialização | **Processo:** P29

---

## Resumo Executivo

Foram auditados 58 artefatos em `sistema/src/engine/`, 8 em `sistema/src/services/`, 24 modelos Prisma, 5+ documentos arquiteturais (ARCHITECTURE.md, CERTIFICACAO_ARQUITETURAL.md, COGNITIVE_MAP.md, ARCHITECTURAL_INVENTORY.md, EVENT_MAP.md, PIPELINE_MAP.md, KNOWLEDGE_INDEX.md). **Grau geral de fidelidade documentação → código: 38%.** O código implementa substancialmente mais do que a documentação registra, e vários nomes de arquivo documentados não correspondem aos reais.

---

## 1. MATRIZ DE FICHAS — ENGINES

### 1.1 `cognitive-experience-engine.ts`
| Campo | Valor |
|---|---|
| Existe na documentação? | Sim — COGNITIVE_MAP.md, ARCHITECTURAL_INVENTORY.md, KNOWLEDGE_INDEX.md |
| Documentação corresponde ao código? | Parcial — COGNITIVE_MAP.md chama de `experience-engine.ts` (sem prefixo `cognitive-`), KNOWLEDGE_INDEX.md chama de `cognitive-experience-engine.ts` (correto). Código tem 1943 linhas, documentação descreve 16 métodos mas o código tem mais de 30 funções exportadas. |
| O que a documentação promete que o código não implementa? | Nada — documentação subestimada |
| O que o código implementa que a documentação não menciona? | `obterEvolutionExperience`, `EvolutionPlatformFields`, `CognitiveOSFields`, `PerguntaRapida`, timeline com agrupamento |
| Grau de fidelidade | 60% |
| Complexidade de alinhamento | Alta (1943 linhas monolíticas) |
| Prioridade | P1 |

### 1.2 `cognitive-orchestrator.ts`
| Campo | Valor |
|---|---|
| Existe na documentação? | Sim — COGNITIVE_MAP.md (`orchestrator-engine.ts` — nome errado), ARCHITECTURAL_INVENTORY.md, KNOWLEDGE_INDEX.md (`cognitive-orchestrator-engine.ts` — nome errado) |
| Documentação corresponde ao código? | Parcial — COGNITIVE_MAP.md descreve pipeline de 12 engines em sequência; o código real tem 935 linhas com 7 pipelines (processarConversa, processarAcao, processarFeedback, processarOutcome, processarCadastro, processarLogin, processarMudancaEmpresa) e um `EstadoCognitivoCompleto` que agrega 12 subsistemas. |
| O que a documentação promete que o código não implementa? | Nada |
| O que o código implementa que a documentação não menciona? | `processarEvento`, `processarMudancaEmpresa`, `processarLogin`, integração com `PipelineComparator`, `criarEventPublisherPersistente`, `cognitive-pipeline-store` |
| Grau de fidelidade | 45% |
| Complexidade de alinhamento | Alta |
| Prioridade | P0 |

### 1.3 `cognitive-context-engine.ts`
| Campo | Valor |
|---|---|
| Existe na documentação? | Sim — COGNITIVE_MAP.md (`context-engine.ts` — nome errado), ARCHITECTURAL_INVENTORY.md |
| Documentação corresponde ao código? | Sim — descrição "montar contexto cognitivo" corresponde. |
| Grau de fidelidade | 70% |
| Complexidade de alinhamento | Baixa |
| Prioridade | P3 |

### 1.4 `cognitive-memory-engine.ts`
| Campo | Valor |
|---|---|
| Existe na documentação? | Sim — COGNITIVE_MAP.md (`memory-engine.ts` — nome errado) |
| Documentação corresponde ao código? | Sim — hierarquia de memória, curto/longo prazo. |
| Grau de fidelidade | 75% |
| Complexidade | Baixa |
| Prioridade | P3 |

### 1.5 `identity-engine.ts`
| Campo | Valor |
|---|---|
| Existe na documentação? | Sim — COGNITIVE_MAP.md (nome correto), ARCHITECTURAL_INVENTORY.md |
| Documentação corresponde ao código? | Parcial — documentação descreve "interpretar respostas, criar identidade, promover hipóteses". Código tem `construirIdentidade`, `obterIdentidade`, `interpretarRespostas`, `atualizarIdentidade`, `vincularConversa`, `registrarHistoricoConversa`. Função de promoção de hipóteses não está no código (está em knowledge-governance-engine). |
| Grau de fidelidade | 65% |
| Complexidade | Média |
| Prioridade | P2 |

### 1.6 `decision-engine.ts`
| Campo | Valor |
|---|---|
| Existe na documentação? | Sim — COGNITIVE_MAP.md (nome correto), ARCHITECTURAL_INVENTORY.md |
| Documentação corresponde ao código? | Sim — "priorizar a decisão mais importante". Código exporta `gerarDecisoes`, `melhorDecisao`, `classificarDecisoesPorPrioridade`, `enriquecerDecisoesComTrust`, `filtrarDecisoesPorRelevancia`. |
| Grau de fidelidade | 80% |
| Complexidade | Baixa |
| Prioridade | P3 |

### 1.7 `signal-engine.ts`
| Campo | Valor |
|---|---|
| Existe na documentação? | Sim — COGNITIVE_MAP.md (`sinal-engine.ts` — nome errado, a documentação usa "Sinal" com S, o código usa "Signal" com S). ARCHITECTURAL_INVENTORY.md chama de "Sinal Engine". |
| Documentação corresponde ao código? | Sim — gera sinais de atenção. |
| Grau de fidelidade | 75% |
| Complexidade | Baixa |
| Prioridade | P3 |

### 1.8 `cognitive-evolution-engine.ts`
| Campo | Valor |
|---|---|
| Existe na documentação? | Sim — COGNITIVE_MAP.md (sem prefixo `cognitive-`), KNOWLEDGE_INDEX.md (nome correto) |
| Documentação corresponde ao código? | Sim — "calcular métricas de evolução". |
| Grau de fidelidade | 80% |
| Complexidade | Baixa |
| Prioridade | P3 |

### 1.9 `cognitive-health-engine.ts`
| Campo | Valor |
|---|---|
| Existe na documentação? | Sim — COGNITIVE_MAP.md (`health-engine.ts` — nome errado) |
| Documentação corresponde ao código? | Sim — "avaliar saúde do conhecimento". |
| Grau de fidelidade | 80% |
| Complexidade | Baixa |
| Prioridade | P3 |

### 1.10 `cognitive-journey-engine.ts`
| Campo | Valor |
|---|---|
| Existe na documentação? | Sim — COGNITIVE_MAP.md (`journey-engine.ts` — nome errado) |
| Documentação corresponde ao código? | Sim — "gerenciar jornada de ativação". |
| Grau de fidelidade | 80% |
| Complexidade | Baixa |
| Prioridade | P3 |

### 1.11 `cognitive-timeline-engine.ts`
| Campo | Valor |
|---|---|
| Existe na documentação? | Sim — COGNITIVE_MAP.md (`timeline-engine.ts` — nome errado) |
| Documentação corresponde ao código? | Sim — "produzir timeline de eventos". |
| Grau de fidelidade | 80% |
| Complexidade | Baixa |
| Prioridade | P3 |

### 1.12 `cognitive-workflow-engine.ts`
| Campo | Valor |
|---|---|
| Existe na documentação? | Sim — COGNITIVE_MAP.md (`workflow-engine.ts` — nome errado) |
| Documentação corresponde ao código? | Sim — "gerenciar workflows cognitivos". |
| Grau de fidelidade | 80% |
| Complexidade | Baixa |
| Prioridade | P3 |

### 1.13 `cognitive-notification-engine.ts`
| Campo | Valor |
|---|---|
| Existe na documentação? | Sim — COGNITIVE_MAP.md (`notification-engine.ts` — nome errado) |
| Documentação corresponde ao código? | Sim — "consolidar notificações". |
| Grau de fidelidade | 80% |
| Complexidade | Baixa |
| Prioridade | P3 |

### 1.14 `action-intelligence-engine.ts`
| Campo | Valor |
|---|---|
| Existe na documentação? | Sim — COGNITIVE_MAP.md (nome correto), ARCHITECTURAL_INVENTORY.md |
| Documentação corresponde ao código? | Sim — "gerar ações sugeridas". |
| Grau de fidelidade | 80% |
| Complexidade | Baixa |
| Prioridade | P3 |

### 1.15 `feedback-intelligence-engine.ts`
| Campo | Valor |
|---|---|
| Existe na documentação? | Sim — COGNITIVE_MAP.md (`feedback-engine.ts` — nome errado, sem "-intelligence-") |
| Documentação corresponde ao código? | Sim — "processar feedback do usuário". |
| Grau de fidelidade | 75% |
| Complexidade | Baixa |
| Prioridade | P3 |

### 1.16 `outcome-intelligence-engine.ts`
| Campo | Valor |
|---|---|
| Existe na documentação? | Sim — COGNITIVE_MAP.md (`outcome-engine.ts` — nome errado, sem "-intelligence-") |
| Documentação corresponde ao código? | Sim — "registrar outcomes". |
| Grau de fidelidade | 75% |
| Complexidade | Baixa |
| Prioridade | P3 |

### 1.17 `conversation-engine.ts`
| Campo | Valor |
|---|---|
| Existe na documentação? | Sim — COGNITIVE_MAP.md (nome correto) |
| Documentação corresponde ao código? | Sim — "gerenciar fluxo da conversa". |
| Grau de fidelidade | 80% |
| Complexidade | Baixa |
| Prioridade | P3 |

### 1.18 `ritmo-engine.ts`
| Campo | Valor |
|---|---|
| Existe na documentação? | Sim — COGNITIVE_MAP.md (nome correto) |
| Documentação corresponde ao código? | Sim — "ciclos cognitivos automáticos". |
| Grau de fidelidade | 80% |
| Complexidade | Baixa |
| Prioridade | P3 |

### 1.19 `cognitive-briefing-engine.ts`
| Campo | Valor |
|---|---|
| Existe na documentação? | Não |
| Documentação corresponde ao código? | N/A |
| Grau de fidelidade | 0% |
| Complexidade | Baixa |
| Prioridade | P2 |

### 1.20 `cognitive-action-composer.ts`
| Campo | Valor |
|---|---|
| Existe na documentação? | Não |
| Grau de fidelidade | 0% |
| Complexidade | Baixa |
| Prioridade | P2 |

### 1.21 `cognitive-milestone-engine.ts`
| Campo | Valor |
|---|---|
| Existe na documentação? | Não |
| Grau de fidelidade | 0% |
| Complexidade | Baixa |
| Prioridade | P2 |

### 1.22 `cognitive-routine-engine.ts`
| Campo | Valor |
|---|---|
| Existe na documentação? | Não |
| Grau de fidelidade | 0% |
| Complexidade | Baixa |
| Prioridade | P2 |

### 1.23 `company-maturity-engine.ts`
| Campo | Valor |
|---|---|
| Existe na documentação? | Não |
| Grau de fidelidade | 0% |
| Complexidade | Baixa |
| Prioridade | P2 |

### 1.24 `confidence-drift-engine.ts`
| Campo | Valor |
|---|---|
| Existe na documentação? | Não |
| Grau de fidelidade | 0% |
| Complexidade | Baixa |
| Prioridade | P2 |

### 1.25 `knowledge-aging-engine.ts`
| Campo | Valor |
|---|---|
| Existe na documentação? | Não como engine separada — COGNITIVE_MAP.md menciona "envelhecimento" dentro da Memory Engine |
| Grau de fidelidade | 10% |
| Complexidade | Média |
| Prioridade | P2 |

### 1.26 `knowledge-governance-engine.ts`
| Campo | Valor |
|---|---|
| Existe na documentação? | Não como engine separada — COGNITIVE_MAP.md menciona "Knowledge Engine" que seria esta, mas o nome documentado não existe no código. |
| Documentação corresponde ao código? | A documentação descreve `knowledge-engine.ts` que não existe. O código tem `knowledge-governance-engine.ts` com `validarHipoteses`, `promoverConhecimento`, `enfraquecerConhecimento`, `calcularConfiancaConhecimento`, `auditarConhecimento`, `obterConhecimentosAprovados`. |
| Grau de fidelidade | 15% |
| Complexidade | Alta (engine documentada não existe, existe engine não documentada) |
| Prioridade | P0 |

### 1.27 `evidence-engine.ts`
| Campo | Valor |
|---|---|
| Existe na documentação? | Sim — ARCHITECTURAL_INVENTORY.md menciona "Evidencia" como modelo |
| Documentação corresponde ao código? | Parcial — modelo existe, engine não é descrita como motor separado |
| Grau de fidelidade | 40% |
| Complexidade | Média |
| Prioridade | P2 |

### 1.28 `validation-engine.ts`
| Campo | Valor |
|---|---|
| Existe na documentação? | Sim — ARCHITECTURAL_INVENTORY.md lista como "ValidationEngine (MORTA)" |
| Documentação corresponde ao código? | Sim — ambos a marcam como morta |
| Grau de fidelidade | 90% |
| Complexidade | Baixa |
| Prioridade | P4 |

### 1.29 `synthesis-engine.ts`
| Campo | Valor |
|---|---|
| Existe na documentação? | Não |
| Grau de fidelidade | 0% |
| Complexidade | Média |
| Prioridade | P2 |

### 1.30 `forgetting-engine.ts`
| Campo | Valor |
|---|---|
| Existe na documentação? | Não como engine — COGNITIVE_MAP.md menciona "esquecimento programado" dentro da Memory Engine |
| Grau de fidelidade | 10% |
| Complexidade | Média |
| Prioridade | P2 |

### 1.31 `trust-engine.ts`
| Campo | Valor |
|---|---|
| Existe na documentação? | Sim — modelo `ConfiancaFonte` existe no schema; engine não documentada como motora |
| Grau de fidelidade | 30% |
| Complexidade | Média |
| Prioridade | P2 |

### 1.32 `relevance-engine.ts`
| Campo | Valor |
|---|---|
| Existe na documentação? | Não |
| Grau de fidelidade | 0% |
| Complexidade | Baixa |
| Prioridade | P2 |

### 1.33 `priority-engine.ts`
| Campo | Valor |
|---|---|
| Existe na documentação? | Não |
| Grau de fidelidade | 0% |
| Complexidade | Baixa |
| Prioridade | P2 |

### 1.34 `founder-activation-engine.ts`
| Campo | Valor |
|---|---|
| Existe na documentação? | Sim — modelo `EventoAtivacao` existe no schema; engine não descrita como motor separado em COGNITIVE_MAP.md |
| Grau de fidelidade | 30% |
| Complexidade | Média |
| Prioridade | P2 |

### 1.35 `pipeline-comparator.ts`
| Campo | Valor |
|---|---|
| Existe na documentação? | Não |
| Grau de fidelidade | 0% |
| Complexidade | Média |
| Prioridade | P2 |

### 1.36 `pipeline-monitor.ts`
| Campo | Valor |
|---|---|
| Existe na documentação? | Não |
| Grau de fidelidade | 0% |
| Complexidade | Média |
| Prioridade | P2 |

### 1.37 `cognitive-observatory.ts`
| Campo | Valor |
|---|---|
| Existe na documentação? | Não |
| Grau de fidelidade | 0% |
| Complexidade | Média |
| Prioridade | P2 |

### 1.38 `aprendizado-service.ts`
| Campo | Valor |
|---|---|
| Existe na documentação? | Sim — modelo `Aprendizado` existe; mencionado como endpoint em PIPELINE_MAP.md |
| Grau de fidelidade | 50% |
| Complexidade | Baixa |
| Prioridade | P3 |

### 1.39 `cognitive-heritage-facade.ts`
| Campo | Valor |
|---|---|
| Existe na documentação? | Não — nem em COGNITIVE_MAP.md, nem em ARCHITECTURAL_INVENTORY.md, nem em EVENT_MAP.md. KNOWLEDGE_INDEX.md menciona API `/api/cognitive-heritage` mas não a facade. |
| Grau de fidelidade | 0% |
| Complexidade | Alta (218 linhas, 5 engines envolvidas) |
| Prioridade | P0 |

---

## 2. SERVIÇOS

| Service | Documentado? | Fidelidade | Obs |
|---|---|---|---|
| `cliente.service.ts` | Sim — nome correto no inventário | 85% | Nome em KNOWLEDGE_INDEX.md errado (`cliente-service.ts`) |
| `lead.service.ts` | Sim | 85% | Nome em KNOWLEDGE_INDEX.md errado (`lead-service.ts`) |
| `tarefa.service.ts` | Sim | 85% | Nome em KNOWLEDGE_INDEX.md errado |
| `transacao.service.ts` | Sim | 85% | |
| `historico.service.ts` | Sim | 85% | |
| `implantacao.service.ts` | Sim | 85% | |
| `historico-sinal.service.ts` | Sim | 85% | |
| `configuracao.service.ts` | Não documentado em arquitetura | 0% | Existe no código, zero menção |

---

## 3. VERIFICAÇÕES ESPECÍFICAS

### 3.1 As 58+ engines estão todas documentadas?

**Não.** A documentação (COGNITIVE_MAP.md) lista nominalmente **19 engines** + 4 módulos de infraestrutura. O código tem **58 arquivos** em `sistema/src/engine/`. Das 19 engines listadas, **nenhuma tem o nome de arquivo correto** (todas faltam o prefixo `cognitive-` ou usam nomes diferentes). **Pelo menos 16 engines/arquivos não têm documentação:** cognitive-briefing-engine, cognitive-action-composer, cognitive-milestone-engine, cognitive-routine-engine, company-maturity-engine, confidence-drift-engine, knowledge-aging-engine, synthesis-engine, forgetting-engine, trust-engine, relevance-engine, priority-engine, pipeline-comparator, pipeline-monitor, cognitive-observatory, aprendizado-service

### 3.2 O cognitive-orchestrator tem documentação equivalente?

**Parcial.** COGNITIVE_MAP.md descreve `orchestrator-engine.ts` (nome errado) com um único pipeline linear de 12 passos. O código real tem 935 linhas com 7 pipelines diferentes, orquestração complexa com `EventPublisher`, `PipelineComparator`, `feature-flags`, `cognitive-pipeline-store`, e um `EstadoCognitivoCompleto` que não está documentado.

### 3.3 O event-bus documentado corresponde ao implementado?

**Parcial.** EVENT_MAP.md descreve uma arquitetura com `EventPublisher.emit()` que primeiro persiste, depois distribui. O código real tem `EventPublisher.publish()` que emite **antes** de persistir (linha 60-63 do event-publisher.ts: `emit` → `salvarEvento`). O catálogo documentado tem 5 eventos de negócio + 4 internos; o código real tem **50+ eventos** organizados em 7 categorias (NEGOCIO, COGNITIVO, ENTRADA, SAIDA, JORNADA, PIPELINE, CICLO).

### 3.4 A cognitive-heritage-facade está documentada?

**Não.** Zero menção em qualquer documento de arquitetura. KNOWLEDGE_INDEX.md menciona a API `/api/cognitive-heritage` mas não a facade em si.

### 3.5 Os subscribers de eventos estão documentados?

**Parcial com erro.** EVENT_MAP.md lista 5 subscribers como "STUB — não implementam lógica de negócio". O código real tem **5 subscribers reais** em `subscribers/` (`diagnostico-concluido`, `conhecimento-promovido`, `resultado-registrado`, `contexto-atualizado`) que **têm lógica de negócio**. Além disso, os 5 handlers stubs listados em event-subscriber.ts (`EmpresaCriadaHandler`, `HipoteseConfirmadaHandler`, etc.) são apenas logs — não subscribers registrados. A documentação está desatualizada.

### 3.6 O schema do banco cobre todos os modelos documentados?

**Sim, e além.** Todos os modelos documentados em ARCHITECTURE.md e diagramas ER existem no schema. O schema tem modelos adicionais: `Contato`, `EtapaImplantacao`, `Anotacao`, `Tag`, `OnboardingDecisao`, `DecisaoSinal`, `EventoAtivacao`, `ConfiancaFonte`, `CicloConfiguracao` que não estão no diagrama ER de ARCHITECTURAL_INVENTORY.md.

### 3.7 Existem modelos documentados que NÃO existem no schema?

**Não.** Todos os modelos mencionados na documentação existem no Prisma schema.

### 3.8 Existem modelos no schema que NÃO foram documentados?

**Sim.** `Contato`, `EtapaImplantacao`, `Anotacao`, `Tag`, `OnboardingDecisao`, `DecisaoSinal`, `EventoAtivacao`, `ConfiancaFonte`, `CicloConfiguracao` — não aparecem nos diagramas ER de ARCHITECTURAL_INVENTORY.md.

---

## 4. GRAU GERAL DE FIDELIDADE

| Categoria | Avaliação |
|---|---|
| Nomes de engines (documentação vs código) | 15% — quase todos os nomes divergem |
| Comportamento das engines | 60% — comportamento corresponde, mas documentação omiti detalhes |
| Cobertura de engines documentadas | 38% — 22 das 58 engines têm alguma documentação |
| Serviços | 80% — serviço `configuracao.service.ts` não documentado |
| Event bus | 45% — catálogo muito maior que documentado, ordem de persistência invertida |
| Subscribers | 30% — documentação marca como stubs, código tem lógica real |
| Prisma schema | 70% — 9 modelos não documentados em diagramas |
| cognitive-heritage-facade | 0% — completamente ausente da documentação |
| **Geral** | **38%** |

---

## 5. CLASSIFICAÇÃO DE DIVERGÊNCIAS

### Tipo B — Simplificações estratégicas
- 19 engines documentadas como núcleo, 58 engines no total — aceitável pela fase V4
- Serviço configuracao não documentado

### Tipo C — Débitos técnicos
- KNOWLEDGE_INDEX.md lista 11 nomes de arquivo que NÃO EXISTEM (ex: `cognitive-knowledge-engine.ts`, `cognitive-decision-engine.ts`, `cognitive-sinal-engine.ts`, etc.)
- COGNITIVE_MAP.md lista 12 nomes de engine sem prefixo `cognitive-` que não correspondem
- `configuracao.service.ts` sem documentação
- 9 modelos Prisma não documentados

### Tipo D — Ausências
- `cognitive-heritage-facade.ts` completamente ausente da documentação
- 16+ engines não documentadas
- `EventoAtivacao`, `ConfiancaFonte`, `CicloConfiguracao` como modelos sem documentação de engine

### Tipo E — Conflitos documentais
- EVENT_MAP.md diz que subscribers são "stubs", código tem 4 subscribers reais
- EVENT_MAP.md diz que `emit` acontece antes da persistência, o código faz `emit` antes de salvar (o doc diz que o ideal é persistir primeiro — na verdade o código faz exatamente o que doc critica)
- KNOWLEDGE_INDEX.md referencia 11 arquivos inexistentes
- COGNITIVE_MAP.md referencia `knowledge-engine.ts`, `feedback-engine.ts`, `outcome-engine.ts` etc. que não existem

---

## 6. RECOMENDAÇÕES

1. **P0 — Urgente:** Atualizar KNOWLEDGE_INDEX.md com nomes de arquivo reais; remover referências a `cognitive-knowledge-engine.ts`, `cognitive-decision-engine.ts` e outros que não existem.
2. **P0 — Urgente:** Documentar `cognitive-heritage-facade.ts` em ARCHITECTURAL_INVENTORY.md e COGNITIVE_MAP.md.
3. **P1 — Alta:** Alinhar nomes no COGNITIVE_MAP.md com nomes reais de arquivo.
4. **P1 — Alta:** Documentar event-catalog com 50+ eventos (vs 9 atuais em EVENT_MAP.md).
5. **P1 — Alta:** Documentar os 4 subscribers reais vs os stubs.
6. **P2 — Média:** Decidir se as 16 engines não documentadas merecem documentação ou são "conveniência" (Lei 7).
7. **P2 — Média:** Incluir modelos faltantes no diagrama ER (Contato, Anotacao, Tag, etc.).
8. **P3 — Baixa:** Adicionar `configuracao.service.ts` ao inventário.

---

## 7. ESTATÍSTICAS FINAIS

| Métrica | Valor |
|---|---|
| Engines auditadas | 39 fichas individuais |
| Engines com documentação completa | 0 |
| Engines com documentação parcial | 22 |
| Engines sem documentação | 17 |
| Serviços documentados | 7 de 8 |
| Modelos Prisma documentados | 15 de 24 |
| Documentos com nomes de arquivo errados | 3 (COGNITIVE_MAP.md, KNOWLEDGE_INDEX.md, ARCHITECTURAL_INVENTORY.md) |
| Fidelidade geral | 38% |
| Recomendações P0 | 2 |
| Recomendações P1 | 3 |
| Recomendações P2 | 2 |
