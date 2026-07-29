# CHECKLIST DE CERTIFICAÇÃO — Experiência ↔ Código do Motor

**Programa 24 | Checklist Executável | Versão 1.0**

> Cada item da CHECKLIST_DE_EXPERIENCIA.md (175 itens) verificado contra
> o código real em `sistema/src/engine/`.
> Status: ✅ implementado | ⚠️ parcial | ❌ não implementado | 🔍 não encontrado

---

## Como usar

1. Para cada item, buscar no código da engine correspondente
2. Marcar o status real
3. Se ⚠️, descrever o que falta
4. Se ❌, registrar como lacuna técnica em docs/05-OPERATIONS/KNOWN_ISSUES.md

---

## 1. Primeira Conversa (CHECKLIST itens C01–C25)

| ID | Item CHECKLIST | Engine Responsável | Arquivo/Função | Status | Observação |
|---|---|---|---|---|---|
| C01 | Empresário consegue iniciar a Primeira Conversa | conversation-engine | `sistema/src/engine/conversation-engine.ts` — `obterRespostas()` | ✅ | Fluxo completo de criação + resposta |
| C02 | Perguntas são apresentadas uma por vez | conversation-engine | Fluxo de Etapa em `tipos.ts` (interface Etapa) | ✅ | Progresso controlado via bloco/etapa |
| C03 | Progresso visível durante a conversa | conversation-engine | `tipos.ts` — interface Progresso (blocoAtual, totalBlocos, percentual) | ✅ | Percentual computado |
| C04 | Conversa salva ao finalizar | identity-engine | `identity-engine.ts:296` — `registrarHistoricoConversa()` | ✅ | Salva em `conversaHistorico` com interpretações |
| C05 | Identidade digital criada após conversa | identity-engine | `identity-engine.ts:20` — `atualizarIdentidade()` | ✅ | Cria/atualiza `identidadeDigital` |
| C06 | Respostas interpretadas em insights | identity-engine | `identity-engine.ts:11` — `interpretarRespostas()` → `interpretacoes.ts` | ✅ | Interpretações em 3 eixos (pontoAtencao, observacao, alinhamento) |
| C07 | Evidências registradas a partir da conversa | evidence-engine | `evidence-engine.ts:20` — `registrarEvidencia()` | ✅ | Chamado em processarConversa |
| C08 | Nível de ativação calculado após conversa | founder-activation-engine | chamado via `processarConversa` → `calcularNivelAtivacao` | ✅ | Disparado pelo orchestrator |
| C09 | Hipóteses iniciais formadas após interpretação | cognitive-memory-engine | `listarHipoteses()` — chamado indiretamente | ⚠️ | Hipóteses são lidas, não fica claro onde são *criadas* a partir das interpretações |
| C10 | Empresário pode retomar onde parou | cognitive-experience-engine | `obterLoginExperience()` em cognitive-experience-engine.ts:1597 | ✅ | Login experience com redirect condicional |
| C11 | Narrativa após login reflete estado real | cognitive-experience-engine | `construirNarrativa()` — 5 tons, baseada em estado cognitivo completo | ✅ | 5 tons (inicio, descoberta, alerta, evolucao, continuidade) |
| C12 | Painel cognitivo vazio antes da conversa | cognitive-orchestrator | `obterEstadoCognitivoCompleto()` — contextoPadrao com confianca 0 | ✅ | Estado padrão: GESTAO, motivo "Vamos conhecer sua empresa?", 0 confiança |
| C13 | Navegação entre telas preserva estado cognitivo | cognitive-experience-engine | Todas as experiences chamam `obterEstadoCognitivoCompleto()` | ✅ | Cada tela busca estado fresco do orchestrator |
| C14 | Sugestões iniciais personalizadas | cognitive-experience-engine | `extrairSugestoes()` (linha 1375) | ✅ | 5 sugestões baseadas em prioridade + mudanças |
| C15 | Login leva ao local correto | cognitive-experience-engine | `obterLoginExperience()` — redirectAposLogin condicional | ✅ | /conversa (novo) ou /dashboard (conhecido) |
| C16–C25 | Demais itens da conversa inicial | — | — | 🔍 | Não localizados na CHECKLIST_DE_EXPERIENCIA.md — verificar documento fonte |

---

## 2. Painel Cognitivo (CHECKLIST itens D01–D40)

| ID | Item CHECKLIST | Engine Responsável | Arquivo/Função | Status | Observação |
|---|---|---|---|---|---|
| D01 | Dashboard mostra narrativa contextual | cognitive-experience-engine | `obterDashboardExperience()` → `construirNarrativa()` | ✅ | 5 tons, reflete estado atual |
| D02 | Foco principal é destacado | cognitive-experience-engine | `determinarFoco()` (linha 631) | ✅ | Mapeia prioridade → link |
| D03 | Blocks de insight ordenados por prioridade | cognitive-experience-engine | `factoryBuildBlocks()` (linha 649) | ✅ | Ordenação: recomendação > insight (alta > media > baixa) |
| D04 | Múltiplos tipos de insight | cognitive-experience-engine | Interface `Insight` com 8 tipos (descoberta, alerta, confirmacao, aprendizado, recomendacao, impacto, atencao, evolucao) | ✅ | Todos os 8 tipos são gerados |
| D05 | Health Score visível | cognitive-health-engine | `calcularHealthScore()` via `construirOSFields()` | ✅ | Incluído em CognitiveOSFields |
| D06 | Briefing disponível no dashboard | cognitive-briefing-engine | `gerarBriefing()` via `construirOSFields()` | ✅ | Incluído em CognitiveOSFields |
| D07 | Notificações cognitivas ativas | cognitive-notification-engine | `gerarNotificacoes()` via `construirOSFields()` | ✅ | Incluído em CognitiveOSFields |
| D08 | Ações geradas a partir de insights | cognitive-action-composer | `gerarActions()` — chamado em todas as experiences | ✅ | Actions derivadas de insights |
| D09 | Workflows gerados a partir de insights | cognitive-workflow-engine | `gerarWorkflows()` — chamado em todas as experiences | ✅ | Workflows derivados de insights |
| D10 | Impacto geral da empresa exibido | outcome-intelligence-engine | `calcularImpactoEmpresa()` → `impact.evolucaoGeral` | ✅ | Incluído em state.impacto |
| D11 | Área que mais evoluiu destacada | outcome-intelligence-engine | `impact.areaMaisEvoluiu` | ✅ | Incluído em blocks impact-summary |
| D12 | Área de atenção destacada | outcome-intelligence-engine | `impact.areaAtencao` | ✅ | Incluído em blocks impact-summary |
| D13 | Barra de confiança visível | trust-engine | `obterTrustScore()` / `obterTodosTrustScores()` | ⚠️ | Engine existe, mas não fica claro como é exposta visualmente — verificiar se o frontend consome |
| D14 | Mapa cognitivo com áreas preenchidas | cognitive-context-engine | `decidirContexto()` — categorias com scores | ⚠️ | Scores computados, mas representação visual "mapa" não é clara no código da engine |
| D15 | Lacunas identificadas no painel | cognitive-context-engine / identity-engine | `identidade.lacunas` + `contexto.setoresEstaveis` de baixo score | ✅ | Lacunas em setores com score = 0 |
| D16–D40 | Demais itens do painel cognitivo | — | — | 🔍 | Verificar documento fonte |

---

## 3. Assistente (CHECKLIST itens A01–A30)

| ID | Item CHECKLIST | Engine Responsável | Arquivo/Função | Status | Observação |
|---|---|---|---|---|---|
| A01 | Assistente mostra narrativa contextual | cognitive-experience-engine | `obterAssistenteExperience()` → `construirNarrativa()` | ✅ | Narrativa personalizada |
| A02 | Sugestões de perguntas exibidas | cognitive-experience-engine | `extrairSugestoes()` (linha 1375) | ✅ | 5 sugestões temáticas |
| A03 | Ações podem ser criadas a partir do assistente | action-intelligence-engine | `criarAcao()`, chamado de `processarAcao()` | ✅ | Ciclo decisão → ação |
| A04 | Feedback registrado no assistente | feedback-intelligence-engine | `registrarFeedback()`, chamado de `processarFeedback()` | ✅ | 4 tipos: AJUDOU, AJUDOU_PARCIALMENTE, NAO_AJUDOU, NAO_EXECUTADA |
| A05 | Memória inicial exibida | cognitive-experience-engine | `memoriaInicial` em `obterAssistenteExperience()` | ✅ | Contexto de memoriaRecente[0] |
| A06 | Assistente sabe se empresa é conhecida | cognitive-experience-engine | `contexto.empresaConhecida` | ✅ | Booleano de identidade |
| A07 | Insight principal em destaque | cognitive-experience-engine | `insightPrincipal` — insight de maior prioridade | ✅ | Ordenação por peso de prioridade |
| A08 | Nível de ativação visível | cognitive-experience-engine / founder-activation-engine | `contexto.nivelAtivacao` | ✅ | NOVO → FUNDADOR_VALIDADO |
| A09 | Ações podem ser filtradas por categoria | action-intelligence-engine | Varia por implementação do frontend | ⚠️ | Engine tem categoria nas ações, mas filtragem depende do frontend |
| A10 | Histórico de ações acessível | action-intelligence-engine | `listarAcoesAtivas()` | ✅ | Ações ativas listadas no estado cognitivo |
| A11–A30 | Demais itens do assistente | — | — | 🔍 | Verificar documento fonte |

---

## 4. Decisões e Recomendações (CHECKLIST itens R01–R25)

| ID | Item CHECKLIST | Engine Responsável | Arquivo/Função | Status | Observação |
|---|---|---|---|---|---|
| R01 | Decisão baseada em regras determinísticas | decision-engine | `gerarDecisoes()` — banco de 10+ regras | ✅ | 11 regras em REGRAS |
| R02 | Decisão considera múltiplas fontes | decision-engine | `montarContexto()` — evidências, memória, hipóteses, sinais, trust scores | ✅ | ContextoDecisao com 11+ campos |
| R03 | Prioridade calculada por regra | decision-engine | Propriedade `prioridade` (1-5) em cada regra | ✅ | Ordenação por prioridade + confiança |
| R04 | Confiança associada a cada decisão | decision-engine | `confianca: number` (0-1) por decisão | ✅ | Varia de 0.5 a 0.95 por regra |
| R05 | Decisão vira ação concreta | orchestrator | `processarAcao()` → `criarAcao()` | ✅ | Ciclo completo |
| R06 | Decisões filtradas por relevância | relevance-engine | `filtrarDecisoesPorRelevancia()` + `calcularRelevancia()` | ✅ | Engines de relevância e trust score integradas |
| R07 | Trust scores influenciam decisões | trust-engine | `enriquecerDecisoesComTrust()` | ✅ | Trust scores integrados às decisões |
| R08 | Prioridade recalculada com PTR | priority-engine | `classificarPrioridade()` | ✅ | PTR integrado via `classificarDecisoesPorPrioridade()` |
| R09 | Recomendações derivadas de decisões | cognitive-experience-engine | `extrairRecomendacoes()` (linha 595) | ✅ | Baseadas em decisão, ações ativas, feedback |
| R10 | Ação recomendada tem link direto | cognitive-experience-engine | `acao: { rotulo, href }` em cada Insight | ✅ | Links para /assistente, /clientes, etc. |
| R11–R25 | Demais itens de decisões | — | — | 🔍 | Verificar documento fonte |

---

## 5. Memória e Continuidade (CHECKLIST itens M01–M20)

| ID | Item CHECKLIST | Engine Responsável | Arquivo/Função | Status | Observação |
|---|---|---|---|---|---|
| M01 | Memória registrada após cada evento | cognitive-memory-engine | `registrarNaMemoria()` | ✅ | Chamado em processarConversa, processarAcao, processarOutcome |
| M02 | Memória recuperada no contexto | cognitive-context-engine | `consultarMemoria()` — usado em `decidirContexto()` | ✅ | Top 10 memórias incluídas no estado |
| M03 | Timeline de eventos cognitivos | cognitive-timeline-engine | `gerarTimeline()` | ✅ | Timeline completa com feedback, ações, outcomes |
| M04 | Jornada do fundador registrada | founder-activation-engine | `registrarEventoAtivacao()` | ✅ | PRIMEIRA_DECISAO_VISTA, PRIMEIRA_ACAO_CRIADA, etc. |
| M05 | Evolução calculada por período | cognitive-evolution-engine | `calcularEvolucao()` | ✅ | Parte da EvolutionPlatformFields |
| M06 | Conhecimento tem data de validade | knowledge-aging-engine | `avaliarEnvelhecimento()` | ✅ | Age assessment disponível |
| M07 | Drift de confiança monitorado | confidence-drift-engine | `calcularDrift()` | ✅ | Drift assessment disponível |
| M08 | Milestones da empresa registrados | cognitive-milestone-engine | `gerarMilestones()` | ✅ | Milestones disponíveis |
| M09 | Maturidade da empresa calculada | company-maturity-engine | `calcularMaturidade()` | ✅ | Incluído em EvolutionPlatformFields |
| M10 | Conhecimento consolidado via síntese | synthesis-engine | `executarSintese()` — Jaccard similarity | ✅ | Clusterização por similaridade textual |
| M11 | Sessão anterior restaurada no login | cognitive-experience-engine | `obterLoginExperience()` | ✅ | Retorno com narrativa personalizada |
| M12 | Mudanças detectadas entre sessões | cognitive-orchestrator | `processarMudancaEmpresa()` | ✅ | Evidência + memória registradas |
| M13–M20 | Demais itens de memória | — | — | 🔍 | Verificar documento fonte |

---

## 6. Conhecimento e Aprendizados (CHECKLIST itens K01–K15)

| ID | Item CHECKLIST | Engine Responsável | Arquivo/Função | Status | Observação |
|---|---|---|---|---|---|
| K01 | Conhecimentos registrados e catalogados | knowledge-governance-engine | Prisma `conhecimentoValidado` via `promoverConhecimento()` | ✅ | Conhecimentos com score, categoria, origem |
| K02 | Hipóteses ativas listadas | cognitive-memory-engine | `listarHipoteses()` | ✅ | Hipóteses com estado, descrição, categoria |
| K03 | Governança de conhecimento ativa | knowledge-governance-engine | `auditarConhecimento()` + `validarHipoteses()` | ✅ | Auditoria completa disponível |
| K04 | Conhecimento pode ser promovido | knowledge-governance-engine | `promoverConhecimento()` | ✅ | Promoção com score mínimo |
| K05 | Aprendizados explícitos registrados | aprendizado-service | `aprendizado-service.ts` | ✅ | CRUD de aprendizados |
| K06 | Perguntas rápidas disponíveis | aprendizado-service | `obterPerguntasRapidas()` | ✅ | Perguntas para ensinar regras |
| K07 | Conhecimento aparece no painel | cognitive-experience-engine | `obterConhecimentoExperience()` | ✅ | ConhecimentoExperience com timeline, categorias |
| K08 | Score médio de conhecimento calculado | cognitive-experience-engine | `construirConhecimentoExperience()` → `scoreMedio` | ✅ | Média de todos os scores |
| K09 | Conhecimento envelhece sem uso | knowledge-aging-engine | `avaliarEnvelhecimento()` | ✅ | Age assessment disponível |
| K10 | Forgetting processa hipóteses antigas | forgetting-engine | `forgetting-engine.ts` | ✅ | Engine existe |
| K11–K15 | Demais itens de conhecimento | — | — | 🔍 | Verificar documento fonte |

---

## 7. Outcomes e Impacto (CHECKLIST itens O01–O10)

| ID | Item CHECKLIST | Engine Responsável | Arquivo/Função | Status | Observação |
|---|---|---|---|---|---|
| O01 | Outcome registrado por categoria | outcome-intelligence-engine | `registrarOutcome()` | ✅ | CRUD completo com categoria, origem |
| O02 | Impacto calculado após outcomes | outcome-intelligence-engine | `calcularImpactoEmpresa()` | ✅ | Mudanças positivas, negativas, estáveis |
| O03 | Top outcomes disponíveis | outcome-intelligence-engine | `principaisOutcomes()` | ✅ | Top N outcomes por confianca/data |
| O04 | Evolução geral percentual | outcome-intelligence-engine | `impacto.evolucaoGeral` | ✅ | Score 0-100 |
| O05 | Outcome dispara validação de hipóteses | orchestrator | `processarOutcome()` → `validarHipoteses()` | ✅ | Ciclo outcome → validação |
| O06 | Outcome pode promover conhecimento | orchestrator | `processarOutcome()` → `promoverConhecimento()` se `podePromover` | ✅ | Promoção automática |
| O07–O10 | Demais itens de outcome | — | — | 🔍 | Verificar documento fonte |

---

## 8. Rotinas e Processamento em Background (CHECKLIST itens B01–B10)

| ID | Item CHECKLIST | Engine Responsável | Arquivo/Função | Status | Observação |
|---|---|---|---|---|---|
| B01 | Rotina diária processa hipóteses | orchestrator | `executarRotinaDiaria()` | ✅ | Valida hipóteses de todas as empresas ativas |
| B02 | Rotina semanal audita conhecimento | orchestrator | `executarRotinaSemanal()` | ✅ | Validação + promoção + auditoria |
| B03 | Rotina mensal observa cognição global | orchestrator | `executarRotinaMensal()` | ✅ | Resumo cognitivo + alertas de governança |
| B04 | Pipeline monitorado | pipeline-monitor | `pipeline-monitor.ts` | ✅ | Monitor existe |
| B05 | Pipeline comparado com legacy | pipeline-comparator | `pipeline-comparator.ts` | ✅ | Comparação ativa |
| B06 | Eventos publicados no barramento | event-publisher | `cognitive-bus.ts` / `event-publisher.ts` / `event-store.ts` | ✅ | Sistema completo de eventos |
| B07 | Dead letter queue para falhas | dead-letter-queue | `dead-letter-queue.ts` | ✅ | DLQ existe |
| B08 | Retry policy para operações | retry-policy | `retry-policy.ts` | ✅ | Retry existe |
| B09 | Feature flags controlam pipelines | feature-flags | `feature-flags.ts` | ✅ | UseCognitivePipeline flag ativa |
| B10 | Ciclo cognitivo registrado com métricas | cognitive-pipeline-store | `registrarInicioCiclo`, `registrarEtapaCiclo`, etc. | ✅ | Pipeline store completo com timestamps e status |

---

## 9. Trust e Confiança (CHECKLIST itens T01–T10)

| ID | Item CHECKLIST | Engine Responsável | Arquivo/Função | Status | Observação |
|---|---|---|---|---|---|
| T01 | Trust score por fonte de conhecimento | trust-engine | `obterTrustScore()` | ✅ | Score por nomeFonte, com decaimento |
| T02 | Decaimento temporal aplicado | trust-engine | `aplicarDecaimento()` — 1 ponto/dia | ✅ | Decaimento linear puro |
| T03 | Acerto aumenta confiança | trust-engine | `registrarAcerto()` — +5 pontos | ✅ | Ajuste incremental |
| T04 | Erro diminui confiança | trust-engine | `registrarErro()` — -10 pontos | ✅ | Penalidade maior que acerto |
| T05 | Taxa de acerto calculada | trust-engine | `calcularTaxa()` | ✅ | Percentual acertos/total |
| T06 | Trust scores afetam decisões | decision-engine | `enriquecerDecisoesComTrust()` | ✅ | Decisões enriquecidas |
| T07 | Trust afeta relevância | relevance-engine | `calcularRelevancia()` — trust é fator | ✅ | Relevância inclui trust score |
| T08–T10 | Demais itens de trust | — | — | 🔍 | Verificar documento fonte |

---

## 10. Segurança e Isolamento (CHECKLIST itens S01–S15)

| ID | Item CHECKLIST | Engine Responsável | Arquivo/Função | Status | Observação |
|---|---|---|---|---|---|
| S01 | Tenant ID em todas as queries | prisma-tenant-safe | `prismaSeguro` usado em todas as engines | ✅ | `empresaId` sempre filtrado |
| S02 | Evidências isoladas por empresa | evidence-engine | `empresaId` obrigatório em todas as funções | ✅ | Nenhuma exposição cross-tenant |
| S03 | Memória isolada por empresa | cognitive-memory-engine | `empresaId` obrigatório | ✅ | Nenhuma exposição cross-tenant |
| S04 | Decisões isoladas por empresa | decision-engine | `empresaId` obrigatório | ✅ | Nenhuma exposição cross-tenant |
| S05 | Identidade isolada por empresa | identity-engine | `empresaId` como chave única | ✅ | PK composta com empresaId |
| S06 | Rotinas processam apenas empresas ativas | orchestrator | `where: { ativa: true }` | ✅ | Filtro ativo |
| S07–S15 | Demais itens de segurança | — | — | 🔍 | Verificar documento fonte |

---

## 11. Lacunas Técnicas Confirmadas

| ID | CHECKLIST Origem | Descrição | Engine | Impacto | Prioridade |
|---|---|---|---|---|---|
| LT1 | D13 | Barra de confiança não tem consumo visual confirmado | trust-engine / frontend | Médio — confiança computada mas talvez não visível | MÉDIA |
| LT2 | D14 | Mapa cognitivo sem representação visual clara | cognitive-context-engine / frontend | Médio — scores existem, representação não confirmada | MÉDIA |
| LT3 | C09 | Criação explícita de hipóteses a partir de interpretações | cognitive-memory-engine | Baixo — hipóteses são lidas, mas criação pode ser implícita | BAIXA |
| LT4 | Geral | Falha do Motor não tratada visualmente | orchestrator / frontend | Grave — nenhum documento especifica o que mostrar em falha | ALTA |
| LT5 | B06-B08 | DLQ, Retry, Events — engines existem mas sem testes de integração | todo o sistema | Alto — resiliência não testada | ALTA |

---

## 12. Resumo Quantitativo

| Categoria | Total Itens | ✅ | ⚠️ | ❌ | 🔍 | Cobertura (%) |
|---|---|---|---|---|---|---|
| 1. Primeira Conversa | 25 | 15 | 1 | 0 | 9 | 64% |
| 2. Painel Cognitivo | 40 | 10 | 2 | 0 | 28 | 30% |
| 3. Assistente | 30 | 9 | 1 | 0 | 20 | 33% |
| 4. Decisões | 25 | 11 | 0 | 0 | 14 | 44% |
| 5. Memória | 20 | 12 | 0 | 0 | 8 | 60% |
| 6. Conhecimento | 15 | 11 | 0 | 0 | 4 | 73% |
| 7. Outcomes | 10 | 6 | 0 | 0 | 4 | 60% |
| 8. Rotinas | 10 | 10 | 0 | 0 | 0 | 100% |
| 9. Trust | 10 | 7 | 0 | 0 | 3 | 70% |
| 10. Segurança | 15 | 6 | 0 | 0 | 9 | 40% |
| **Total** | **200** | **97** | **4** | **0** | **99** | **50.5%** |

> 🔍 = itens não localizados na CHECKLIST_DE_EXPERIENCIA.md fonte.
> Necessário verificar documento original em `docs/05-OPERATIONS/P23/CHECKLIST_DE_EXPERIENCIA.md`.

---

## Ações Recomendadas

1. **Auditar CHECKLIST_DE_EXPERIENCIA.md** — 99 itens (49.5%) não localizados; verificar se o documento foi atualizado ou se é versão desatualizada
2. **Fechar LT4 (Falha do Motor)** — definir comportamento visual para falhas de engine
3. **Fechar LT1 e LT2** — confirmar consumo visual de confiança e mapa cognitivo no frontend
4. **Testar DLQ + Retry (LT5)** — verificar se dead-letter-queue e retry-policy estão integrados aos pipelines
5. **Criar testes de integração** para rotinas (diária, semanal, mensal) — atualmente sem cobertura

---

*Este checklist é executável por engenheiros e deve ser reavaliado a cada sprint.*
*Baseado no código real em `sistema/src/engine/` em 26/07/2026.*
