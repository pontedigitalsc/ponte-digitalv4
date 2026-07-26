# Catálogo de Eventos — Ponte Digital V4 Founder

**Status:** Vigente
**Origem:** ADR-012 (fusão com ADR-022)
**Padrão de nomenclatura:** `{Sujeito}{AcaoNoParticipioPassado}`

> Este catálogo unifica a definição conceitual de todos os eventos da plataforma. Durante a V4 Founder, eventos podem ser registrados como `HistoricoSinal` + `MemoriaCognitiva` conforme ADR-001. A implementação formal com Event Bus dedicado ocorrerá na Fase 2.

---

## 1. Metadados comuns a todo evento

```
interface EventoPonteDigital<T> {
  eventId: string
  eventType: string
  aggregateId: string
  aggregateType: string
  version: number
  occurredAt: DateTime
  data: T
  metadata: {
    tenantId: string
    correlationId: string   // ADR-027: obrigatório, rastreia cadeia causal
    causationId: string     // evento que causou este
  }
}
```

---

## 2. Eventos de Negócio

Eventos que representam fatos do mundo real ocorridos nos domínios da plataforma.

### 2.1 DiagnosticContext

| Evento | Versão atual (ARCHITECTURE_DDD.md) | Significado |
|---|---|---|
| `DiagnosticoConcluido` | `DiagnosticoCompleto` | 18 perguntas respondidas, perfil gerado |
| `DiagnosticoAtualizado` | `DiagnosticoAtualizado` | Empresário refez diagnóstico com novas respostas |

### 2.2 CognitiveIdentityContext

| Evento | Versão atual | Significado |
|---|---|---|
| `IdentidadeCriada` | `IdentidadeCriada` | Primeira versão da identidade digital gerada |
| `IdentidadeEvoluida` | `IdentidadeEvoluida` | Nova versão da identidade (conhecimentos, hipóteses, lacunas atualizados) |

### 2.3 CRMContext

| Evento | Versão atual | Significado |
|---|---|---|
| `NovoLeadChegou` | `LeadCriado` | Novo lead entrou no pipeline |
| `LeadAvancou` | `LeadAvancou` | Lead mudou de estágio |
| `LeadConvertido` | `LeadConvertido` | Lead virou cliente |
| `ClienteCriado` | `ClienteCriado` | Novo cliente registrado |

### 2.4 FinancialContext

| Evento | Versão atual | Significado |
|---|---|---|
| `TransacaoRegistrada` | `TransacaoRegistrada` | Receita ou despesa registrada |
| `DespesaRecorrenteCriada` | `DespesaRecorrenteCriada` | Despesa com recorrência configurada |
| `FaturamentoAumentou` | — | Faturamento do período superou expectativa |
| `DespesaExcedeu` | — | Despesa em categoria ultrapassou limite |

### 2.5 TaskContext

| Evento | Versão atual | Significado |
|---|---|---|
| `TarefaCriada` | `TarefaCriada` | Nova tarefa no sistema |
| `TarefaConcluida` | `TarefaConcluida` | Tarefa marcada como concluída |
| `TarefaVenceu` | — | Tarefa atingiu data de vencimento sem conclusão |

### 2.6 LearningContext

| Evento | Versão atual | Significado |
|---|---|---|
| `AprendizadoRegistrado` | `AprendizadoRegistrado` | Empresário ensinou valor/regra/preferência |
| `AprendizadoDesativado` | `AprendizadoDesativado` | Aprendizado marcado como não mais relevante |

---

## 3. Eventos Cognitivos

Eventos gerados pelo Motor Cognitivo durante seu processamento interno.

### 3.1 KnowledgeContext (Patrimônio Cognitivo)

| Evento | Versão atual | Significado |
|---|---|---|
| `ClienteNaoRetornou` | `EvidenciaRegistrada` (CRUD) | Evidência de domínio registrada (nome semântico) |
| `FaturamentoAumentou` | `EvidenciaRegistrada` (CRUD) | Evidência financeira registrada |
| `PadraoIdentificado` | `HipoteseCriada` (CRUD) | Padrão recorrente detectado entre observações |
| `HipoteseFortalecida` | `HipoteseFortalecida` | Mais evidências confirmam a hipótese |
| `HipoteseConfirmada` | `HipoteseConfirmada` | Hipótese promovida a conhecimento validado |
| `HipoteseDescartada` | `HipoteseDescartada` | Hipótese refutada por evidências contrárias |
| `ConhecimentoPromovido` | `ConhecimentoPromovido` | Conhecimento validado atinge score de confiança ≥60 |
| `ConhecimentoEnfraquecido` | `ConhecimentoEnfraquecido` | Conhecimento perde confiança por falta de revalidação |
| `ConhecimentoDescartado` | `ConhecimentoDescartado` | Score cai abaixo de 20 |
| `InsightGerado` | — | Conexão entre conhecimentos identificada |

### 3.2 MemoryContext

| Evento | Versão atual | Significado |
|---|---|---|
| `MemoriaRegistrada` | `MemoriaRegistrada` | Novo registro na timeline cognitiva |

### 3.3 DecisionContext

| Evento | Versão atual | Significado |
|---|---|---|
| `OportunidadeIdentificada` | `DecisaoGerada` (CRUD) | Decisão positiva identificada pelo motor |
| `RiscoDetectado` | `DecisaoGerada` (CRUD) | Risco ou ponto de atenção identificado |
| `DecisaoTomada` | `AcaoCognitivaCriada` | Decisão convertida em ação pelo empresário |

### 3.4 FeedbackContext

| Evento | Versão atual | Significado |
|---|---|---|
| `AcaoAjudou` | `FeedbackRegistrado` (CRUD) | Empresário avaliou ação como útil |
| `AcaoNaoFuncionou` | `FeedbackRegistrado` (CRUD) | Empresário avaliou ação como não útil |
| `ResultadoRegistrado` | `OutcomeRegistrado` | Impacto/resultado registrado |

---

## 4. Eventos de Entrada (Motor Cognitivo)

Eventos que o Motor Cognitivo recebe de módulos externos ou de triggers do sistema.

| Evento | Origem | Disparado por |
|---|---|---|
| `ConversaIniciada` | DiagnosticContext | Empresário inicia novo diagnóstico |
| `RespostaRegistrada` | DiagnosticContext | Empresário responde pergunta |
| `DadosSincronizados` | CRM / Financial / Task | Integração com dados externos |
| `ComandoExplicito` | Assistente IA / UI | Empresário ou IA solicita ação direta |
| `RotinaDiariaIniciada` | Cron (Cognitive OS) | Início da rotina diária |
| `RotinaSemanalIniciada` | Cron (Cognitive OS) | Início da rotina semanal |

---

## 5. Eventos de Saída (Motor Cognitivo)

Eventos que o Motor Cognitivo produz para consumo de outros módulos ou da interface.

| Evento | Destino | Consumido por |
|---|---|---|
| `ContextoAtualizado` | Experience Engine | UI (dashboard, sidebar) |
| `NotificacaoGerada` | Notification Engine | UI (alertas, notificações) |
| `BriefingProduzido` | Experience Engine | UI (briefing diário) |
| `MilestoneAtingido` | Activation Engine | UI (jornada do fundador) |
| `SugestaoGerada` | Assistente IA | Assistente (contexto para resposta) |

---

## 6. Eventos de Jornada (Fundador)

Eventos que marcam marcos na jornada do empresário (substituem `EventoAtivacao` / `MarcoDeJornada`).

| Evento | Significado |
|---|---|
| `DiagnosticoConcluido` | Empresário completou as 18 perguntas |
| `ContaCriada` | Empresário criou conta após diagnóstico |
| `PrimeiraAcaoCriada` | Empresário criou primeira ação cognitiva |
| `PrimeiroFeedbackDado` | Empresário avaliou uma ação pela primeira vez |
| `PrimeiroAprendizadoRegistrado` | Empresário ensinou algo ao sistema |
| `PrimeiroOutcomeRegistrado` | Primeiro resultado registrado |
| `ConhecimentoPromovido` | Primeiro conhecimento validado promovido |
| `TodasFerramentasExploradas` | Empresário visitou todas as seções do dashboard |

---

## 7. Mapa de Migração (Eventos Antigos → Novos)

| Nome antigo (ARCHITECTURE_DDD.md) | Nome novo (Catálogo) | Fase |
|---|---|---|
| `EvidenciaRegistrada` | `ClienteNaoRetornou` / `FaturamentoAumentou` / semântico por domínio | Fase 2 |
| `HipoteseCriada` | `PadraoIdentificado` | Fase 2 |
| `SinalGerado` | `LeadEsfriou` / `TarefaVenceu` / `DespesaExcedeu` (semântico) | Fase 2 |
| `DecisaoGerada` | `OportunidadeIdentificada` / `RiscoDetectado` | Fase 2 |
| `FeedbackRegistrado` | `AcaoAjudou` / `AcaoNaoFuncionou` | Fase 2 |
| `EventoAtivacaoRegistrado` | `MarcoDeJornada` (cada marco vira evento específico) | Fase 2 |
| `OutcomeRegistrado` | `ResultadoRegistrado` | Fase 2 |
| `LeadCriado` | `NovoLeadChegou` | Fase 2 |

> **Fase 1:** Nomenclatura atual mantida. Eventos novos DEVEM seguir o catálogo.
> **Fase 2:** Migração gradual com Event Bus formal (ADR-011).
> **Fase 6:** Catálogo congelado e 100% implementado.

---

> Este catálogo substitui a seção 4 do `ARCHITECTURE_DDD.md` como fonte da verdade para definição de eventos. Consulte `ARCHITECTURE_DDD.md` para a arquitetura DDD e `ENGINEERING_GUIDELINES.md` para regras técnicas.
