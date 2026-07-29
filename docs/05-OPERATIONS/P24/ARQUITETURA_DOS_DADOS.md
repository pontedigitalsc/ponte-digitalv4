# ARQUITETURA DOS DADOS — Fluxo e Linhagem do Motor Cognitivo

**Programa 24 | Documento de Arquitetura | Versão 1.0**

> Documentar como os dados fluem pelo Motor Cognitivo: da entrada (input) ao processamento
> interno e à saída (experiência). Cada registro de dado deve ter origem, transformação e destino rastreáveis.

---

## Princípios

1. **Origem única** — todo dado tem exatamente uma fonte de entrada
2. **Transformação rastreável** — toda transformação intermediária preserva lineage
3. **Destino conhecido** — todo dado termina em um local de armazenamento ou experiência
4. **Nunca decorativo** — dado que não alimenta nenhuma engine não deve existir

---

## Arquitetura Geral de Fluxo

```
ENTRADA                              PROCESSAMENTO                          SAÍDA
═══════════                          ═══════════════                        ═══════

┌─────────────┐         ┌─────────────────────────────────────────────┐         ┌─────────────────┐
│ Respostas   │────────▶│                                             │────────▶│ Narrativa       │
│ Conversa    │         │                                             │         │ (experiência)   │
└─────────────┘         │                                             │         └─────────────────┘
                        │           ORCHESTRATOR                     │         ┌─────────────────┐
┌─────────────┐         │        (cognitive-orchestrator)            │────────▶│ Insights        │
│ Cadastro    │────────▶│                                             │         │ (experiência)   │
│ Empresa     │         │   processarConversa()                       │         └─────────────────┘
└─────────────┘         │   processarAcao()                           │
                        │   processarFeedback()                       │         ┌─────────────────┐
┌─────────────┐         │   processarOutcome()                        │────────▶│ Ações           │
│ Dados       │────────▶│   processarLogin()                          │         │ (experiência)   │
│ CRM/Sistema │         │   processarMudancaEmpresa()                  │         └─────────────────┘
└─────────────┘         │   executarRotinaDiaria/Semanal/Mensal()     │
                        │                                             │         ┌─────────────────┐
┌─────────────┐         │                                             │────────▶│ Notificações    │
│ Feedback    │────────▶│   ┌──────────────────────────────────────┐  │         │ Briefing        │
│ Ação        │         │   │       ENGINES DE PROCESSAMENTO        │  │         │ Health Score    │
└─────────────┘         │   │   identity-engine                     │  │         └─────────────────┘
                        │   │   evidence-engine                     │  │
┌─────────────┐         │   │   cognitive-context-engine             │  │         ┌─────────────────┐
│ Outcome     │────────▶│   │   decision-engine                     │  │────────▶│ Workflows       │
│ (manual)    │         │   │   trust-engine                        │  │         │ Jornadas        │
└─────────────┘         │   │   synthesis-engine                    │  │         │ Timeline        │
                        │   │   knowledge-governance-engine         │  │         └─────────────────┘
┌─────────────┐         │   │   cognitive-memory-engine             │  │
│ Sinais      │────────▶│   │   outcome-intelligence-engine         │  │         ┌─────────────────┐
│ Sistema     │         │   │   founder-activation-engine            │  │────────▶│ Conhecimento    │
└─────────────┘         │   │   action-intelligence-engine          │  │         │ Aprendizados    │
                        │   │   feedback-intelligence-engine        │  │         └─────────────────┘
                        │   └──────────────────────────────────────┘  │
                        └─────────────────────────────────────────────┘
```

---

## 1. Cadeias de Fluxo Completas

### 1.1 Cadeia: Primeira Conversa (origin → experience)

| Etapa | Engine | Função | Entrada | Saída | Armazenamento |
|---|---|---|---|---|---|
| E1 | conversation-engine | `obterRespostas()` | token (string) | `Record<string, string | null>` (respostas do empresário) | `conversa_historico` (após E5) |
| E2 | identity-engine | `interpretarRespostas()` | Respostas da conversa | `Interpretacoes` (pontoAtencao, observacao, alinhamento) | — (processamento em memória) |
| E3 | evidence-engine | `registrarEvidencia()` | empresaId + DadosEvidencia | Evidência criada | `evidencia` (Prisma) |
| E4 | identity-engine | `atualizarIdentidade()` | empresaId + respostas + interpretacoes | IdentidadeDigital criada/atualizada | `identidade_digital` (Prisma) |
| E5 | identity-engine | `registrarHistoricoConversa()` | empresaId + identidadeId + respostas + interpretacoes | Histórico registrado | `conversa_historico` (Prisma) |
| E6 | cognitive-memory-engine | `registrarNaMemoria()` | empresaId + entrada de memória | Memória registrada | `memoria_cognitiva` (Prisma) |
| E7 | founder-activation-engine | `registrarEventoAtivacao()` | empresaId + tipo + metadados | Evento de ativação | `evento_ativacao` (Prisma) |
| E8 | cognitive-context-engine | `decidirContexto()` | empresaId | `DecisaoContexto` (prioridade, motivo, confianca) | Cache (TTL CONTEXTO) |
| E9 | decision-engine | `melhorDecisao()` | empresaId | `Decisao | null` | — (processamento em memória) |
| E10 | cognitive-experience-engine | `obterDashboardExperience()` | empresaId | `DashboardExperience` | — (experiência computada on-demand) |

**Lineage:** Respostas brutas → interpretações → evidência + identidade + memória → contexto → decisão → experiência

---

### 1.2 Cadeia: Ação (processarAcao)

| Etapa | Engine | Função | Entrada | Saída | Armazenamento |
|---|---|---|---|---|---|
| A1 | action-intelligence-engine | `criarAcao()` | empresaId + Decisao + OrigemAcao | Ação criada | `acao_cognitiva` (Prisma) |
| A2 | cognitive-memory-engine | `registrarNaMemoria()` | empresaId + dados | Memória registrada | `memoria_cognitiva` |
| A3 | event-publisher | `publish()` | Evento DECISAO_TOMADA | Evento publicado | `event_store` |
| A4 | founder-activation-engine | `registrarEventoAtivacao()` | empresaId + PRIMEIRA_ACAO_CRIADA | Evento de ativação | `evento_ativacao` |

**Lineage:** Decisão → ação concreta → memória + evento + ativação

---

### 1.3 Cadeia: Feedback (processarFeedback)

| Etapa | Engine | Função | Entrada | Saída | Armazenamento |
|---|---|---|---|---|---|
| F1 | feedback-intelligence-engine | `registrarFeedback()` | empresaId + acaoId + tipo + comentário | Feedback registrado | `feedback_acao` (Prisma) |
| F2 | founder-activation-engine | `registrarEventoAtivacao()` | PRIMEIRO_FEEDBACK | Evento | `evento_ativacao` |
| F3 | event-publisher | `publish()` | ACAO_AJUDOU / ACAO_NAO_FUNCIONOU | Evento | `event_store` |
| F4 | trust-engine | `registrarAcerto()`/`registrarErro()` | empresaId + nomeFonte | Trust recalculado | `confianca_fonte` (Prisma) |

**Lineage:** Feedback → evento + trust (ajuste de confiança)

---

### 1.4 Cadeia: Outcome (processarOutcome)

| Etapa | Engine | Função | Entrada | Saída | Armazenamento |
|---|---|---|---|---|---|
| O1 | outcome-intelligence-engine | `registrarOutcome()` | empresaId + dados | Outcome registrado | `outcome` (Prisma) |
| O2 | cognitive-memory-engine | `registrarNaMemoria()` | Outcome → memória | Memória registrada | `memoria_cognitiva` |
| O3 | knowledge-governance-engine | `validarHipoteses()` | empresaId | Validações | `hipotese` (Prisma) |
| O4 | knowledge-governance-engine | `promoverConhecimento()` | empresaId + hipoteseId + score | Conhecimento promovido | `conhecimento_validado` (Prisma) |

**Lineage:** Outcome → memória + validação de hipóteses → possível promoção a conhecimento

---

### 1.5 Cadeia: Sinais do Sistema (fluxo contínuo)

| Etapa | Engine | Função | Entrada | Saída | Armazenamento |
|---|---|---|---|---|---|
| S1 | clientes.sinais | `gerarSinaisClientes()` | Clientes do Prisma | `Sinal[]` (dominio: "clientes") | — (processamento em memória) |
| S2 | tarefas.sinais | `gerarSinaisTarefas()` | Tarefas do Prisma | `Sinal[]` (dominio: "tarefas") | — |
| S3 | financeiro.sinais | `gerarSinaisFinanceiro()` | Transações do Prisma | `Sinal[]` (dominio: "financeiro") | — |
| S4 | tipos | `ordenarPorUrgencia()` | Sinais | Sinais ordenados | — |
| S5 | cognitive-context-engine | `decidirContexto()` | Sinais + evidências + memória | DecisaoContexto | Cache |
| S6 | decision-engine | `gerarDecisoes()` | SituacaoEmpresa (inclui sinais) | Decisao[] | — |

**Lineage:** Dados operacionais (clientes, tarefas, financeiro) → sinais → contexto → decisões

---

### 1.6 Cadeia: Rotina Diária

| Etapa | Engine | Função | Entrada | Saída | Armazenamento |
|---|---|---|---|---|---|
| R1 | orchestrator | `executarRotinaDiaria()` | Todas empresas ativas | Validações processadas | `hipotese` (status atualizado) |
| R2 | knowledge-governance-engine | `validarHipoteses()` | empresaId | Resultados de validação | pipeline_store |
| R3 | event-publisher | `publish()` | ROTINA_DIARIA_INICIADA | Evento | `event_store` |

**Lineage:** Todas empresas → validação em massa de hipóteses

---

## 2. Linhagem de Dados por Engine

### 2.1 identity-engine

```
Entrada:                               Saída:
  respostas (Record<string, string>)     ◀ IdentidadeDigital (empresaId, dados, interpretacoes, versao)
  empresaId                              ◀ ConstruirIdentidade (empresaConhecida, verdadesEstaveis,
  interpretacoes                               hipoteses, lacunas, categoriasComAtividade)
                                       ◀ contextoParaAssistente (segmento, faturamento, pontoAtencao)
                                       ◀ contextoParaDashboard (existeDiagnostico, destaqueSugerido)
```

**Dependências externas:** evidence-engine, cognitive-memory-engine, knowledge-governance-engine, aprendizado-service

### 2.2 evidence-engine

```
Entrada:                               Saída:
  empresaId + DadosEvidencia             ◀ Evidencia (categoria, origem, descricao, confianca, criadaEm)
  (categoria, origem, descricao,        ◀ contagemPorCategoria (Record<string, number>)
   confianca, dados)
```

**Destino:** `evidencia` (Prisma) — usado por context-engine, identity-engine, decision-engine

### 2.3 cognitive-context-engine

```
Entrada:                               Saída:
  empresaId                              ◀ DecisaoContexto (prioridade, motivo, confianca,
  Evidências (dos último 30 dias)               evidenciasChave, acaoSugerida, setoresEstaveis,
  Identidade (obterIdentidade)                  mudancasRecentes, tendencia, memoriaRecente)
  Memória (consultarMemoria)           ◀ SituacaoEmpresa (tudo sobre a empresa: clientes, tarefas,
  Sinais (clientes, tarefas, financeiro)      transacoes, leads, inadimplentes)
```

**Algoritmo:** Score por categoria = pesoTotal + pesoRecencia + pesoMemoria + sinais. Confiança = evidências/20 * 0.5 + score/total * 0.3 + identidade * 0.2

### 2.4 decision-engine

```
Entrada:                               Saída:
  empresaId                              ◀ Decisao[] (id, titulo, descricao, categoria, tipoAcao,
  SituacaoEmpresa                                prioridade, motivo, evidenciasChave, confianca,
  Hipóteses                                       impacto, urgencia, dificuldade)
  TrustScores                          ◀ melhorDecisao() — top 1 por prioridade + confianca
```

**Algoritmo:** 11 regras determinísticas; cada regra avalia condição booleana + motivo + confianca

### 2.5 trust-engine

```
Entrada:                               Saída:
  empresaId + nomeFonte                  ◀ TrustScore (nomeFonte, scoreAtual, totalAcertos/Erros,
                                               taxaAcerto, ultimoAcerto/ErroEm, emDecaimento)
```

**Algoritmo:** Score inicial = 50. Decaimento = 1 ponto/dia. Acerto = +5. Erro = -10.

### 2.6 synthesis-engine

```
Entrada:                               Saída:
  empresaId                              ◀ GrupoSintese[] (grupos por similaridade textual via Jaccard)
  conhecimentos do banco                ◀ Sintese[] (resumo, scoreAgregado, confiancaConsolidada)
                                       ◀ ResultadoSintese (grupos + sinteses + resumo)
```

**Algoritmo:** Tokenização → stopwords → Jaccard similarity (threshold 0.3) → agrupamento → score

### 2.7 cognitive-experience-engine

```
Entrada:                               Saída:
  EstadoCognitivoCompleto (orchestrator) ◀ DashboardExperience (narrativa, foco, blocks, actions,
                                               workflows, notifications, briefing, healthScore)
                                       ◀ AssistenteExperience (sugestoes, insightPrincipal, memoriaInicial)
                                       ◀ LoginExperience (narrativa, redirectAposLogin)
                                       ◀ SidebarExperience (foco, nivelAtivacao, OS fields)
                                       ◀ FinanceiroExperience, CRMExperience, etc. (10+ experiences)
```

**Regra de ouro:** Não produz conhecimento. Apenas transforma estado em experiência.

---

## 3. Estados de Dados por Ciclo de Vida

```
BRUTO                          PROCESSADO                       CONSOLIDADO
═════                          ═══════════                      ═══════════
Respostas da conversa        ▶ Interpretações                 ▶ Conhecimento (score >= 60)
Dados do cadastro            ▶ Evidências                     ▶ Identidade Digital (versão N)
Sinais do sistema            ▶ Hipóteses                      ▶ Memória Cognitiva (tipo, descrição)
Feedback                     ▶ Decisões                       ▶ Trust Score (com decaimento)
Outcome                      ▶ Ações                          ▶ Eventos de Ativação (milestones)
                             ▶ Contexto (prioridade)           ▶ Sínteses (grupos de conhecimento)
                             ▶ Impacto (evolução %)
```

---

## 4. Mapa de Armazenamento (Prisma)

| Tabela Prisma | Engine que ESCREVE | Engine que LÊ | Volume Esperado | TTL |
|---|---|---|---|---|
| `evidencia` | evidence-engine | context-engine, identity-engine, decision-engine | Alto (centenas/empresa) | Indefinido |
| `identidade_digital` | identity-engine | context-engine, experience-engine, dashboard | 1 por empresa | Indefinido |
| `memoria_cognitiva` | cognitive-memory-engine | context-engine, experience-engine | Médio (dezenas/empresa) | Indefinido |
| `conversa_historico` | identity-engine | — (auditoria) | Baixo (1-5/empresa) | Indefinido |
| `confianca_fonte` | trust-engine | decision-engine, relevance-engine | Baixo (1-10/empresa) | Indefinido |
| `hipotese` | knowledge-governance-engine | decision-engine, identity-engine | Médio (dezenas/empresa) | Indefinido |
| `conhecimento_validado` | knowledge-governance-engine | identity-engine, experience-engine | Médio (dezenas/empresa) | Indefinido |
| `acao_cognitiva` | action-intelligence-engine | experience-engine, feedback-engine | Baixo (5-20/empresa) | Indefinido |
| `feedback_acao` | feedback-intelligence-engine | experience-engine, trust-engine | Baixo (5-20/empresa) | Indefinido |
| `outcome` | outcome-intelligence-engine | experience-engine | Baixo (5-15/empresa) | Indefinido |
| `evento_ativacao` | founder-activation-engine | experience-engine, cognitive-observatory | Baixo (3-10/empresa) | Indefinido |
| `event_store` | event-publisher | event-monitor, observatory | Alto (global) | 90 dias (sugerido) |
| `cognitive_pipeline_store` | orchestrator | pipeline-monitor | Alto (por ciclo) | 30 dias (sugerido) |

---

## 5. Cache Strategy

| Cache | Engine | TTL | Invalidação |
|---|---|---|---|
| `contexto:{empresaId}:decisao` | context-engine | CONTEXTO (configurável) | Por padrão de cache |
| `identidade:{empresaId}` | identity-engine | RAPIDO (configurável) | `invalidateEmpresaCache(empresaId)` — padrão `:{empresaId}:` |
| `empresa:{empresaId}:identidade` | identity-engine | RAPIDO | `invalidateEmpresaCache` |
| `assistente:{empresaId}:contexto` | identity-engine | RAPIDO | `invalidateEmpresaCache` |

---

## 6. Event Bus (Event-Driven)

| Evento | Publisher (Engine) | Subscribers Potenciais | Tipo |
|---|---|---|---|
| IDENTIDADE_CRIADA | orchestrator | cognitive-memory-engine, founder-activation | NEGOCIO |
| DIAGNOSTICO_CONCLUIDO | orchestrator | cognitive-context-engine, decision-engine | NEGOCIO |
| DECISAO_TOMADA | orchestrator | action-intelligence-engine, cognitive-memory | COGNITIVO |
| ACAO_AJUDOU / ACAO_NAO_FUNCIONOU | orchestrator | trust-engine, cognitive-memory | COGNITIVO |
| RESULTADO_REGISTRADO | orchestrator | knowledge-governance, cognitive-memory | COGNITIVO |
| CONHECIMENTO_PROMOVIDO | orchestrator | cognitive-memory, cognitive-observatory | COGNITIVO |
| CONTEXTO_ATUALIZADO | orchestrator | cognitive-observatory, event-monitor | SAIDA |
| DADOS_SINCRONIZADOS | orchestrator | — | ENTRADA |
| ROTINA_DIARIA/SEMANAL_INICIADA | orchestrator | pipeline-monitor, cognitive-observatory | ENTRADA |
| ROTINA_MENSAL_INICIADA | orchestrator | cognitive-observatory | ENTRADA |

---

## 7. Regras de Linhagem

### 7.1 Origem

```typescript
// Toda evidência tem:
{
  origem: 'PRIMEIRA_CONVERSA' | 'SISTEMA' | 'EMPRESA' | 'USUARIO' | 'ORQUESTRADOR' | 'INTEGRACAO',
  categoria: 'FINANCEIRO' | 'CLIENTES' | 'OPERACAO' | 'GESTAO' | 'PESSOAS' | 'PRODUTO' | 'ESTRATEGIA',
  confianca: 'ALTA' | 'MEDIA' | 'BAIXA',
  descricao: string  // descreve o fato (não a interpretação)
}
```

### 7.2 Transformação

```
Resposta bruta → (evidence: fato) → (context: score) → (decision: ação) → (experience: narrativa)
                  ↘ (identity: interpretação) → (memory: história)
```

Cada transformação preserva o `empresaId` e adiciona timestamp. Nenhuma transformação destrói dados brutos.

### 7.3 Rastreabilidade Reversa

```
Experiência → estado cognitivo completo → contexto → evidências → resposta bruta
↑            ↑                              ↑            ↑
obterDashboard  obterEstadoCognitivo     decidir     consultar
Experience()    Completo()               Contexto()   Evidencias()
```

---

## 8. Padrões de Dados por Nível de Confiança

| Nível | Range Trust Score | Origem Típica | Ação |
|---|---|---|---|
| BRUTO | N/A | Resposta do empresário | Armazenar sem processamento |
| EVIDÊNCIA | 0-100 | Evidence Engine + Trust | Alimenta scores de contexto |
| HIPÓTESE | 20-80 | Memory + Context | Leva a decisões se > 50 |
| CONHECIMENTO | >= 60 | Governance Engine | Verdade estável, exposta no painel |
| SÍNTESE | 0-100 | Synthesis Engine | Consolidação de conhecimentos similares |
| CERTEZA | >= 80 | Trust + Governance | Escudo verde, confiança alta |

---

## 9. Contratos de Tipos entre Engines

### EstadoCognitivoCompleto (contrato central)

```typescript
interface EstadoCognitivoCompleto {
  contexto: DecisaoContexto | null       // ← cognitive-context-engine
  identidade: IdentidadeDigital | null   // ← identity-engine
  decisao: Decisao | null                // ← decision-engine
  acoesAtivas: AcaoCognitiva[]           // ← action-intelligence-engine
  feedbackRecente: FeedbackAcao[]        // ← feedback-intelligence-engine
  jornada: JornadaFundador               // ← founder-activation-engine
  impacto: ImpactoEmpresa                // ← outcome-intelligence-engine
  topOutcomes: Outcome[]                 // ← outcome-intelligence-engine
  auditoria: AuditoriaConhecimento | null // ← knowledge-governance-engine
}
```

Este é o único contrato que a camada de experiência consome. Qualquer engine que queira expor dados ao frontend deve adicionar seu output a este contrato.

---

## 10. Fluxos Não Mapeados (Lacunas na Arquitetura de Dados)

| ID | Lacuna | Impacto |
|---|---|---|
| DAL1 | **Falha de engine**: nenhum fluxo documenta o que acontece com os dados quando uma engine falha — dados intermediários são perdidos? | Dados podem ser perdidos sem rastreio |
| DAL2 | **Cache desalinhado**: `invalidateEmpresaCache` usa padrão `:{empresaId}:` mas nem toda cache segue esse padrão — possível cache obsoleto | Experiência pode mostrar dados desatualizados |
| DAL3 | **Dead Letter Queue**: `dead-letter-queue.ts` existe mas não está integrado a nenhum fluxo do orchestrator | Eventos com falha podem ser perdidos |
| DAL4 | **Retry sem visibilidade**: retry-policy existe mas não expõe métricas | Operações falhas são retentadas sem monitoramento |
| DAL5 | **Event Store sem TTL**: event_store não tem política de expurgo | Crescimento indefinido do banco |
| DAL6 | **Pipeline Store sem TTL**: cognitive_pipeline_store sem expurgo | Crescimento indefinido do banco |

---

*Este documento de arquitetura deve ser atualizado sempre que uma nova engine, fonte de dados ou experiência for criada. Mantém a integridade do fluxo de dados do Motor Cognitivo.*
