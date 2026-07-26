# Arquitetura de Execução — Ponte Digital V4 Founder

**Data:** 2026-07-19
**Status:** Vigente
**Hierarquia:** Constituição → Modelo Cognitivo → Ontologia → Motor Cognitivo → DDD → **Arquitetura de Execução** → Implementação

> Este documento descreve **como o sistema roda em execução**. Não define conceitos, domínio ou entidades — esses já estão definidos nos documentos hierarquicamente superiores. Nada aqui contradiz a Constituição, a Ontologia, o Motor Cognitivo, o DDD, o Catálogo de Eventos, as Engineering Guidelines, a Auditoria Arquitetural ou as 34 ADRs aprovadas.

---

## 1. Filosofia de Execução

### 1.1 Como o Motor Cognitivo opera

O Motor Cognitivo opera como um **processador determinístico de eventos**. Ele não pensa, não intui, não sente — ele processa. Toda entrada é um evento. Toda saída é um evento. Toda transformação entre entrada e saída segue regras explícitas, rastreáveis e reproduzíveis.

O Motor executa em 4 tempos coordenados pela **Ritmo Engine**:
- **Observação Contínua** — tempo real, síncrono com a chegada de eventos
- **Processamento Discreto** — a cada 5 minutos (tick), processa fila acumulada
- **Síntese Periódica** — a cada hora, condensa observações em resumos
- **Consolidação Noturna** — uma vez por dia, executa validação, esquecimento, promoção

### 1.2 Por que ele é determinístico

Dado o mesmo conjunto de eventos de entrada, o Motor produz **exatamente o mesmo resultado**. Não há:
- Aleatoriedade
- "Intuição"
- "Feeling"
- Variação por modelo de IA
- Sorteio ou peso probabilístico

Isso é garantido por:
- **Regras explícitas** — todo score, toda transição, toda prioridade é fórmula, não heurística
- **Nenhuma inferência sem evidência** — se não há dado, não há conclusão
- **Contexto imutável** — toda decisão é tomada contra um snapshot congelado
- **Rastreabilidade causal** — toda decisão pode ser reconstruída: contexto, evidências, scores, regras aplicadas

### 1.3 Por que IA não participa das decisões

IA é substituível. Conhecimento não.

Se a IA decidisse, trocar o modelo de linguagem significaria trocar o cérebro da empresa — o conhecimento acumulado seria perdido ou distorcido.

A separação é inegociável:
- **Motor decide** — com regras determinísticas, sobre dados reais, com rastreabilidade
- **IA traduz** — recebe a decisão já tomada e a converte em linguagem natural
- **Motor funciona sem IA** — se a API cair, o sistema continua operando (sem tradução para linguagem natural)

### 1.4 Quem controla a execução

Ninguém "controla" a execução centralmente. O sistema é **event-driven**: cada submotor reage a eventos que lhe interessam, processa, e publica novos eventos. Não há um "orquestrador central" que decide o que cada submotor faz.

O **CognitiveOrchestrator** não orquestra — ele coordena. Ele:
- Inicia rotinas (diária, semanal, mensal)
- Emite eventos de trigger para a pipeline
- Não chama submotores diretamente

A **Ritmo Engine** é o único submotor que tem noção de tempo. Ela emite ticks e gatilhos — não controla o que outros submotores fazem com eles.

O **Event Bus** é o único barramento de comunicação. Nenhum submotor chama outro.

---

## 2. Pipeline Completo

Cada etapa do pipeline abaixo responde: entrada, saída, persistência, eventos publicados, eventos consumidos.

### 2.1 Entrada

**Gatilho:** Evento bruto do mundo real (lead criado, pagamento recebido, tarefa vencida, conversa iniciada) ou tick da Ritmo Engine.

**Origem:** Módulos da plataforma (CRM, Financeiro, Tarefas, Implantação), Assistente (IA), Empresário (feedback, aprendizado explícito), Ritmo Engine (tick, rotina).

**Formato:** `EventoPonteDigital<T>` com `eventType`, `aggregateId`, `data`, `metadata.correlationId`.

**Destino:** Event Bus.

| Quem publica | Evento | Para quem |
|---|---|---|
| CRM | `NovoLeadChegou`, `LeadAvancou`, `LeadConvertido` | Event Bus |
| Financeiro | `TransacaoRegistrada`, `DespesaExcedeu` | Event Bus |
| Tarefas | `TarefaCriada`, `TarefaVenceu` | Event Bus |
| Assistente | `ConversaIniciada`, `RespostaRegistrada` | Event Bus |
| Empresário | `FeedbackRegistrado`, `AprendizadoExplicito` | Event Bus |
| Ritmo Engine | `TickCognitivo`, `RotinaDiariaIniciada`, `RotinaSemanalIniciada` | Event Bus |

**Persistência:** Nesta etapa, apenas o log do evento. O fato original permanece na tabela de domínio (CRM, Financeiro, etc.).

---

### 2.2 Observation Engine

**Entrada:** Evento bruto do Event Bus (`NovoLeadChegou`, `TransacaoRegistrada`, etc.).

**Processamento:** Normaliza o evento para uma Observação padronizada. Enriquece com metadados de contexto (categoria, momento, confiança inicial). Não interpreta — apenas registra.

**Saída:** `ObservacaoRegistrada` (publicado no Event Bus).

**Persistência:** Nenhuma direta (a observação é volátil até ser processada pela Signal Engine).

**Eventos consumidos:**
- Todos os `EventosDeNegocio` do barramento

**Eventos publicados:**
- `ObservacaoRegistrada { tipo, categoria, timestamp, valor, confiancaInicial, correlationId }`

---

### 2.3 Signal Engine

**Entrada:** `ObservacaoRegistrada` do Event Bus.

**Processamento:**
1. Acumula observações em janelas de tempo (curta: horas, média: dias, longa: semanas)
2. Aplica limiares para distinguir sinal de ruído (ex.: 1 tarefa atrasada é ruído; 5 tarefas na mesma semana é sinal)
3. Calcula urgência (baixa, média, alta, crítica)
4. Aplica Priority Engine para ordenar sinais por relevância (não FIFO)

**Saída:** Sinal classificado por urgência.

**Eventos consumidos:**
- `ObservacaoRegistrada`

**Eventos publicados:**
- `SinalDetectado { urgencia, dominio, observacoes[], scorePrioridade, correlationId }`

**Persistência:**
- Nenhuma direta (Sinal é volátil)
- Se o sinal cruza o threshold de urgência → pode gerar `HistoricoSinal` (durante Fase V4 Founder)

---

### 2.4 Hypothesis Engine

**Entrada:** `SinalDetectado` do Event Bus.

**Processamento:**
1. Recebe o sinal
2. Busca em seu banco de padrões por causas conhecidas
3. Se encontra padrão → formula hipótese específica
4. Se não encontra → formula hipótese genérica
5. Atribui confiança inicial (sempre baixa: 10-30)
6. Relaciona a hipótese às observações que a motivaram
7. Marca `tipoCausalidade` conforme ADR-034:
   - `INDETERMINADO` (padrão inicial)
   - Só alterado para `CAUSAL` se houver evidência causal direta

**Saída:** Hipótese com confiança inicial e tipo de causalidade.

**Eventos consumidos:**
- `SinalDetectado`
- `PadraoDetectado` (ADR-031)

**Eventos publicados:**
- `HipoteseCriada { descricao, confiancaInicial, tipoCausalidade, observacoes[], correlationId }`

**Persistência:**
- Persiste no agregado `PatrimonioCognitivo` com `tipo = "hipotese"` e `estado = "HIPOTESE"`

---

### 2.5 Knowledge Engine (inclui Validation + Trust)

**Entrada:** `HipoteseCriada`, evidências (`EvidenciaDeHipotese`), resultados de ações.

**Processamento:**
1. **Validation Engine** escuta hipóteses e evidências associadas
2. Para cada hipótese, executa o algoritmo de validação:
   - Score (confiança) ≥ 60 → promove a conhecimento
   - Score < 20 → descarta
   - Score 20-59 há mais de 30 dias sem novas evidências → entra em observação
   - Score 20-59 há mais de 60 dias sem novas evidências → descarta por inatividade
3. **Curadoria obrigatória** (ADR-028): conhecimento só é validado se 2+ submotores confirmarem
4. **Trust Engine** mantém score de confiança (0-100) influenciado por:
   - Quantidade de evidências favoráveis
   - Evidências contrárias
   - Recência
   - Qualidade da origem (ADR-025)
5. Mantém score de convicção: `dias_sem_refutacao * 0.5` (máx 100)

**Saída:** Conhecimento validado ou hipótese reclassificada.

**Eventos consumidos:**
- `HipoteseCriada`
- `HipoteseFortalecida`
- `EvidenciaDeHipotese` (ADR-031)
- `ResultadoRegistrado` (do Outcome Engine)
- `AprendizadoRegistrado` (do Learning Engine)

**Eventos publicados:**
- `HipoteseFortalecida`
- `HipoteseEnfraquecida`
- `HipoteseConfirmada` (promovida)
- `HipoteseDescartada`
- `ConhecimentoPromovido { conhecimentoId, scoreConfianca, scoreConviccao, correlationId }`
- `ConhecimentoEnfraquecido`
- `ConhecimentoDescartado`
- `ConhecimentoReativado`

**Persistência:**
- Persiste no agregado `PatrimonioCognitivo` com `tipo` e `estado` adequados
- Cada transição de estado é persistida imediatamente

---

### 2.6 Memory Engine

**Entrada:** Todos os eventos do barramento.

**Processamento:**
1. Mantém 4 níveis de memória:
   - **Working Memory:** últimas 24h, volátil, acesso instantâneo
   - **Short Term:** últimos 30 dias, persistente, acesso < 100ms
   - **Long Term:** > 30 dias, persistente, acesso < 500ms
   - **Archived:** permanente, acesso < 2s, só curadoria remove
2. Rotina noturna (gatilho da Ritmo Engine):
   - Move eventos da Working para Short Term
   - Condensa eventos de Short Term em resumos semanais
   - Move resumos consolidados para Long Term
   - Identifica conhecimento não acessado recentemente para arquivamento

**Saída:** Eventos de consolidação, resumo, arquivamento.

**Eventos consumidos:**
- Todos os eventos do barramento

**Eventos publicados:**
- `MemoriaRegistrada { tipo, descricao, categoria, correlationId }`
- `ResumoDiario`
- `ResumoSemanal`

**Persistência:**
- Working Memory: volátil (em memória), não persiste entre sessões
- Short/Long/Archived: persiste no agregado `PatrimonioCognitivo` com `tipo = "memoria"`

---

### 2.7 Decision Engine

**Entrada:** Contexto Cognitivo (da Context Engine — seção 2.8) + gatilho da Priority Engine.

**Processamento:**
1. Recebe Contexto Cognitivo (pacote fechado e imutável — ADR-021)
2. Aplica regras de decisão:
   - Prioridade (da Priority Engine)
   - Urgência
   - Impacto estimado
   - Dificuldade
3. Consulta conhecimento disponível para embasar a decisão
4. Produz decisões ordenadas por score de prioridade
5. Cada decisão contém: o quê, por quê, com base em quais conhecimentos, score de confiança

**Saída:** Decisões ordenadas com rastreabilidade completa.

**Eventos consumidos:**
- `ContextoAtualizado` (da Context Engine)
- `PrioridadeDefinida` (da Priority Engine)

**Eventos publicados:**
- `DecisaoGerada { acao, motivo, conhecimentosUtilizados[], scoreConfianca, correlationId }` → se score ≥ threshold configurado
- `DecisaoTomada` → quando empresário converte decisão em ação (via feedback da UI)

**Persistência:**
- Decisão persiste como registro no agregado apropriado
- Cada decisão carrega metadados de rastreabilidade

---

### 2.8 Context Engine

**Entrada:** Todos os eventos do barramento (observações, sinais, conhecimento, decisões, resultados).

**Processamento:**
1. Escuta continuamente todos os eventos
2. Mantém um modelo vivo do estado atual da empresa (em memória, atualizado a cada evento)
3. Quando acionado (por demanda ou tick de 5 min):
   - Coleta: conhecimento ativo, sinais atuais, hipóteses em aberto, decisões pendentes, aprendizado explícito, métricas
   - Monta um **Contexto Cognitivo** — pacote fechado e imutável (ADR-021)
   - Congela o snapshot — ninguém altera depois de produzido
4. Publica o contexto no barramento

**Estrutura do Contexto Cognitivo:**
```
ContextoCognitivo {
  version, timestamp, empresaId, correlationId
  identity: { empresaConhecida, verdadesEstaveis[], ultimaConversa }
  knowledge: { conhecimentosAtivos[], scoreMedioConfianca }
  signals: { sinaisAtivos[], urgenciaAtual, prioridadeAtual }
  hypotheses: { hipotesesEmAberto[], emObservacao[] }
  decisions: { decisoesAtivas[], ultimaDecisao }
  learning: { aprendizadosRecentes[] }
  memory: { mudancasRecentes[], timeline[] }
  metrics: { healthScore, maturidadeScore }
}
```

**Saída:** `ContextoAtualizado` contendo o Contexto Cognitivo.

**Eventos consumidos:**
- Todos os eventos do barramento

**Eventos publicados:**
- `ContextoAtualizado { contexto, timestamp, correlationId }`
- `LacunaIdentificada` (quando detecta que informação importante está faltando)

**Persistência:**
- Nenhuma. Contexto é volátil — calculado sob demanda, descartado após consumo

---

### 2.9 Learning Engine

**Entrada:** Resultados de ações (`ResultadoRegistrado`), feedback explícito do empresário (`AcaoAjudou`, `AcaoNaoFuncionou`), aprendizado explícito (`AprendizadoExplicito`).

**Processamento:**
1. **Resultado positivo** → fortalece hipóteses e conhecimentos relacionados:
   - Score de confiança sobe
   - Convicção acumula
2. **Resultado negativo** → enfraquece:
   - Score de confiança desce
   - Pode rebaixar conhecimento para hipótese
3. **Feedback explícito**:
   - `AJUDOU` = fortalece
   - `NAO_AJUDOU` = enfraquece
   - `NAO_EXECUTADA` = registra como histórico
4. **Aprendizado explícito** (empresário ensina):
   - Cria conhecimento direto com score inicial ≥ 70 (ADR-025)
   - Sujeito a enfraquecimento se contradito por evidências futuras

**Saída:** Alterações nos scores de conhecimento e hipóteses.

**Eventos consumidos:**
- `ResultadoRegistrado` (do Outcome Engine)
- `AcaoAjudou` / `AcaoNaoFuncionou` (do FeedbackContext)
- `AprendizadoExplicito` (do empresário)

**Eventos publicados:**
- `AprendizadoRegistrado { conhecimentoId, variacaoScore, correlationId }`
- Pode disparar `ConhecimentoPromovido` ou `ConhecimentoEnfraquecido` via Knowledge Engine

**Persistência:**
- Persiste alterações no agregado `PatrimonioCognitivo`
- Aprendizado explícito persiste com `origem = "EXPLICITO"` e score inicial ≥ 70

---

### 2.10 IA

**Entrada:** Contexto Cognitivo (pacote fechado — seção 2.8) + pergunta do empresário.

**Processamento:**
1. Recebe o Contexto Cognitivo via Assistente
2. Recebe a pergunta/mensagem do empresário
3. Traduz o contexto + a pergunta em linguagem natural
4. Se a pergunta pode ser respondida com o contexto → responde
5. Se a pergunta exige informação que o Motor não tem → registra lacuna
6. Se a pergunta gera uma ação → recomenda ação baseada nas decisões do contexto
7. Após responder, publica evento de conversa realizada

**Saída:** Texto em linguagem natural para o empresário.

**Eventos consumidos:**
- `ContextoAtualizado` (da Context Engine)

**Eventos publicados:**
- `ConversaIniciada`
- `PerguntaRespondida`
- `LacunaReportada` (quando IA não consegue responder)
- `ComandoExplicito` (quando empresário pede ação direta)

**Persistência:**
- Nenhuma. IA não persiste nada. O evento de conversa é que gera persistência (via Motor)

---

### 2.11 Resposta

**Entrada:** Texto gerado pela IA.

**Destino:** Empresário (via interface do Assistente).

**Processamento:** Exibição simples. Nenhuma transformação adicional.

**Saída:** Mensagem visível ao empresário no chat.

**Persistência:** Nenhuma.

---

## 3. Fluxo dos Eventos

### 3.1 Quem publica

| Publicador | Eventos que publica |
|---|---|
| **Módulos da plataforma** (CRM, Financeiro, Tarefas) | `NovoLeadChegou`, `LeadAvancou`, `LeadConvertido`, `TransacaoRegistrada`, `TarefaCriada`, `TarefaConcluida`, `TarefaVenceu`, etc. |
| **Observation Engine** | `ObservacaoRegistrada` |
| **Signal Engine** | `SinalDetectado` |
| **Hypothesis Engine** | `HipoteseCriada` |
| **Knowledge Engine** (inclui Validation + Trust) | `HipoteseFortalecida`, `HipoteseEnfraquecida`, `HipoteseConfirmada`, `HipoteseDescartada`, `ConhecimentoPromovido`, `ConhecimentoEnfraquecido`, `ConhecimentoDescartado`, `ConhecimentoReativado` |
| **Memory Engine** | `MemoriaRegistrada`, `ResumoDiario`, `ResumoSemanal` |
| **Context Engine** | `ContextoAtualizado`, `LacunaIdentificada` |
| **Priority Engine** | `PrioridadeDefinida` |
| **Decision Engine** | `DecisaoGerada` |
| **Outcome Engine** | `ResultadoRegistrado`, `ImpactoCalculado` |
| **Learning Engine** | `AprendizadoRegistrado` |
| **Forgetting Engine** | `ConhecimentoArquivado`, `ConhecimentoDescartado` |
| **Ritmo Engine** | `TickCognitivo`, `RotinaDiariaIniciada`, `RotinaSemanalIniciada`, `RotinaMensalIniciada` |
| **Empresário** (via UI) | `FeedbackRegistrado`, `AprendizadoExplicito`, `ObjetivoDefinido` |
| **IA** (via Assistente) | `ConversaIniciada`, `PerguntaRespondida`, `LacunaReportada`, `ComandoExplicito` |

### 3.2 Quem escuta

| Ouvinte | Eventos que consome |
|---|---|
| **Observation Engine** | Eventos de negócio de todos os módulos |
| **Signal Engine** | `ObservacaoRegistrada` |
| **Hypothesis Engine** | `SinalDetectado`, `PadraoDetectado` |
| **Knowledge Engine** | `HipoteseCriada`, `HipoteseFortalecida`, `EvidenciaDeHipotese`, `ResultadoRegistrado`, `AprendizadoRegistrado` |
| **Context Engine** | Todos os eventos do barramento |
| **Priority Engine** | `ContextoAtualizado`, `SinalDetectado`, `ObjetivoDefinido` |
| **Decision Engine** | `ContextoAtualizado`, `PrioridadeDefinida` |
| **Outcome Engine** | Ações executadas, `FeedbackRegistrado` |
| **Learning Engine** | `ResultadoRegistrado`, `AcaoAjudou`, `AcaoNaoFuncionou`, `AprendizadoExplicito` |
| **Memory Engine** | Todos os eventos do barramento |
| **Relevance Engine** | `ContextoAtualizado`, `ObjetivoDefinido`, `PrioridadeDefinida` |
| **Forgetting Engine** | (gatilho noturno da Ritmo Engine + scores de relevância/confiança) |
| **IA** | `ContextoAtualizado` |
| **Ritmo Engine** | (relógio, não escuta eventos) |

### 3.3 Quem transforma

| Transformação | Quem faz | O que entra | O que sai |
|---|---|---|---|
| Evento bruto → Observação | Observation Engine | `NovoLeadChegou` | `ObservacaoRegistrada` |
| Observação → Sinal | Signal Engine | `ObservacaoRegistrada` | `SinalDetectado` |
| Sinal → Hipótese | Hypothesis Engine | `SinalDetectado` | `HipoteseCriada` |
| Hipótese → Conhecimento | Knowledge Engine | `HipoteseCriada` | `ConhecimentoPromovido` |
| Conhecimento + Sinal → Contexto | Context Engine | Vários | `ContextoAtualizado` |
| Contexto → Decisão | Decision Engine | `ContextoAtualizado` | `DecisaoGerada` |
| Ação → Resultado | Outcome Engine | Ação executada | `ResultadoRegistrado` |
| Resultado → Aprendizado | Learning Engine | `ResultadoRegistrado` | `AprendizadoRegistrado` |
| Eventos → Memória | Memory Engine | Vários | `MemoriaRegistrada` |
| Contexto → Texto | IA | `ContextoAtualizado` | Resposta em linguagem natural |

### 3.4 Quem ignora

Cada submotor **ignora todo evento que não lhe interessa**. Não há roteamento seletivo — todos os eventos vão para o barramento, e cada submotor filtra os que lhe são relevantes.

**Regra de ouro:** nenhum submotor precisa saber da existência de outro. Ele só precisa escutar os tipos de evento que lhe interessam.

### 3.5 Quem persiste

| Persistência | Quem faz | Quando |
|---|---|---|
| Hipóteses | Hypothesis Engine | Imediatamente após criar |
| Conhecimento | Knowledge Engine | Imediatamente após validar |
| Transições de estado | Knowledge Engine | A cada transição |
| Memória (Short/Long/Archived) | Memory Engine | Imediato + rotina noturna |
| Decisões | Decision Engine | Após gerar |
| Resultados | Outcome Engine | Imediatamente |
| Aprendizado explícito | Learning Engine | Imediatamente |
| Working Memory | Memory Engine | **NUNCA** (volátil) |
| Contexto Cognitivo | Context Engine | **NUNCA** (calculado sob demanda) |
| Observações | Observation Engine | **NUNCA** (voláteis até virarem sinal) |
| Sinais | Signal Engine | **NUNCA** (voláteis) |

---

## 4. Barramento Cognitivo

### 4.1 Event Bus

O Event Bus é o **único barramento de comunicação** entre todos os módulos e submotores. Características:

- **Topologia:** Pub/Sub. Publicadores não conhecem assinantes.
- **Implementação (Fase 2+):** In-memory (EventEmitter) para V1, fila para escala.
- **Tipagem:** Eventos seguem a interface `EventoPonteDigital<T>` com discriminação por `eventType`.
- **Roteamento:** Por tipo de evento (cada handler se registra para um ou mais `eventType`).

### 4.2 Event Dispatcher

O Event Dispatcher é o componente que conecta publicadores aos handlers. Ele:

1. Recebe um evento publicado no barramento
2. Identifica qual(is) handler(s) estão registrados para aquele `eventType`
3. Executa cada handler em sequência (mesmo event loop, por enquanto)
4. Captura falhas individuais sem bloquear outros handlers

### 4.3 Event Handlers

Cada submotor expõe um ou mais handlers. Cada handler:
- Declara qual `eventType` escuta (ex.: `ObservationEngine.onSinalDetectado`)
- Recebe o evento completo (incluindo `correlationId`)
- Processa e opcionalmente publica novos eventos
- **Nunca** chama outro submotor diretamente

### 4.4 Retry

Política de retry por handler:
- **Tentativas:** 3 (imediata, 5s, 30s)
- **Exceção:** eventos de rotina noturna — sem retry (executam de novo no próximo ciclo)
- **Handler idempotente:** todo evento DEVE ser processável mais de uma vez sem efeito colateral

### 4.5 Dead Letter

- Após 3 tentativas falhas, o evento vai para Dead Letter
- Dead Letter é um log consultável (não uma fila)
- Eventos em Dead Letter são revisados manualmente (curadoria)
- Dead Letter não bloqueia o barramento

### 4.6 Idempotência

Garantida por:
- **Correlation ID (ADR-027):** cada evento carrega ID único. Handlers verificam se já processaram aquele ID antes de processar.
- **Transições de estado:** toda transição de estado do conhecimento é validada contra o estado atual — se o evento já foi processado, a transição é rejeitada como duplicata.
- **Regra:** todo handler DEVE verificar idempotência antes de processar. Se o evento já foi processado, o handler simplesmente ignora.

---

## 5. Ordem de Execução

### 5.1 Síncrono (tempo real, dentro do mesmo event loop)

| Operação | Gatilho |
|---|---|
| Observação | Evento de negócio chega ao barramento |
| Geração de sinal | Observação publicada |
| Formulação de hipótese | Sinal detectado |
| Registro de resultado | Ação concluída ou feedback recebido |
| Aprendizado imediato | Resultado registrado |
| Decisão sob demanda | Empresário solicita recomendação |
| Contexto sob demanda | IA solicita, Dashboard solicita |

### 5.2 Assíncrono (fila de eventos, processamento discreto)

| Operação | Gatilho | Frequência |
|---|---|---|
| Atualização de contexto | Tick da Ritmo Engine | A cada 5 minutos |
| Priorização de sinais | Tick da Ritmo Engine | A cada 5 minutos |
| Geração de decisões | Tick da Ritmo Engine | A cada 5 minutos |
| Cálculo de relevância | Tick da Ritmo Engine | A cada 5 minutos |
| Promoção de conhecimento | Validação de hipótese | Quando threshold é atingido |

### 5.3 Background (rotinas agendadas)

| Operação | Gatilho | Frequência |
|---|---|---|
| Condensação de memória | Ritmo Engine | A cada hora |
| Consolidação noturna | Ritmo Engine | 1x por dia (00:00) |
| Revalidação de conhecimento | Consolidação noturna | 1x por dia |
| Esquecimento programado | Consolidação noturna | 1x por dia |
| Curadoria automática | Consolidação noturna | 1x por dia |

### 5.4 Batch (processamento em lote)

| Operação | Gatilho | Frequência |
|---|---|---|
| Validação de hipóteses pendentes | Consolidação noturna | 1x por dia |
| Descarte por inatividade (> 60 dias sem evidência) | Consolidação noturna | 1x por dia |
| Arquivamento por desinteresse (> 90 dias sem consulta) | Consolidação noturna | 1x por dia |
| Revisão de score de confiança (aging) | Consolidação noturna | 1x por dia |
| Revisão de score de convicção | Consolidação noturna | 1x por dia |

### 5.5 Realtime (streaming, tempo real)

**Não há streaming na V4 Founder.** Toda comunicação é pull ou evento discreto. O Motor não mantém conexões persistentes com módulos ou com a UI.

---

## 6. Persistência

### 6.1 Quando escreve banco

| Quem | O que persiste | Quando |
|---|---|---|
| Hypothesis Engine | Hipótese nova | Imediatamente após criar |
| Knowledge Engine (inclui Validation + Trust) | Conhecimento validado, transições de estado | Imediatamente após cada transição |
| Memory Engine | Memória Short/Long/Archived | Na rotina noturna + sob demanda |
| Decision Engine | Decisão gerada | Imediatamente após gerar |
| Outcome Engine | Resultado registrado | Imediatamente após receber |
| Learning Engine | Alterações em scores, aprendizado explícito | Imediatamente |

### 6.2 Quando apenas calcula

| Quem | O que calcula | Quando |
|---|---|---|
| Signal Engine | Urgência do sinal, score de prioridade | A cada observação |
| Priority Engine | Prioridade atual (score único) | A cada tick + sob demanda |
| Context Engine | Contexto Cognitivo | A cada tick + sob demanda |
| Relevance Engine | Score de relevância de cada conhecimento | A cada tick + rotina noturna |
| Trust Engine | Score de confiança | A cada evidência + aging noturno |
| Learning Engine | Variação de score após resultado | Imediatamente após resultado |
| Forgetting Engine | Decisão de arquivar/esquecer | Rotina noturna |

### 6.3 Quando usa cache

**Cache não está implementado na V4 Founder (ADR-014).** Previsto para Fase 4:
- Cache in-memory com TTL de 30s
- Por `empresaId`
- Invalidação por evento (via Event Bus)
- Apenas para Contexto Cognitivo e Consultas Frequentes

**Até a Fase 4:** `obterEstadoCognitivoCompleto` executa 8+ queries por navegação.

### 6.4 Quando apenas gera contexto

| Quem | O que gera | Quando |
|---|---|---|
| Context Engine | Contexto Cognitivo (volátil, não persiste) | A cada 5 min + sob demanda |
| Signal Engine | Sinal (volátil, não persiste) | A cada observação |
| Observation Engine | Observação (volátil, não persiste) | A cada evento bruto |

---

## 7. Contexto Cognitivo

### 7.1 Quem monta

**Apenas a Context Engine** monta o Contexto Cognitivo (ADR-021). Nenhum outro módulo pode produzi-lo.

### 7.2 Quem consome

**Apenas**:
- **Decision Engine** — para gerar decisões
- **IA** (via Assistente) — para traduzir em linguagem natural
- **Empresário** (via Dashboard) — para visualizar estado cognitivo

### 7.3 Quem nunca altera

**Ninguém.** O Contexto Cognitivo é imutável (ADR-021). Uma vez produzido, é um snapshot congelado. Se alguém precisa de informação diferente, solicita um novo contexto.

### 7.4 Quem nunca persiste

**Ninguém.** O Contexto Cognitivo nunca é persistido. Ele é calculado sob demanda e descartado após consumo. A persistência está nos dados de origem (conhecimento, sinais, hipóteses, etc.), não no contexto.

---

## 8. Relação entre Motor e IA

### 8.1 Fluxo formal

```
IA recebe
  └── Contexto Cognitivo (da Context Engine, via Event Bus)
  └── Pergunta/mensagem do empresário (via UI)
       │
       ▼
  Processa: traduz Contexto + Pergunta em linguagem natural
       │
       ▼
  Gera texto de resposta
       │
       ▼
  Devolve texto para o empresário (via UI)
       │
       ▼
  Publica evento:
    ├── `ConversaIniciada` (se nova conversa)
    ├── `PerguntaRespondida` (sempre)
    └── `LacunaReportada` (se não soube responder)
       │
       ▼
Motor decide se registra algo a partir do evento
```

### 8.2 O que a IA nunca faz

- **Nunca consulta banco de dados** — não tem acesso a Prisma, SQL ou qualquer storage
- **Nunca interpreta dados brutos** — recebe apenas Contexto Cognitivo já processado
- **Nunca cria conhecimento** — não pode gerar `ConhecimentoPromovido`
- **Nunca toma decisões** — não pode gerar `DecisaoGerada`
- **Nunca altera estado do Motor** — não persiste, não atualiza scores, não transiciona estados
- **Nunca chama submotor diretamente** — só se comunica via Event Bus

### 8.3 O que a IA faz

- **Traduz** Contexto Cognitivo em linguagem natural
- **Responde** perguntas do empresário dentro do escopo do contexto recebido
- **Registra** lacunas quando não consegue responder
- **Recomenda** ações baseadas nas decisões já contidas no contexto
- **Publica** eventos de conversa para que o Motor possa aprender

### 8.4 Exemplos de fluxo correto

```
Empresário: "O que devo fazer hoje?"
  IA recebe: Contexto Cognitivo + Pergunta
  IA traduz: "Segundo o que aprendemos sobre sua empresa,
              a prioridade hoje é organizar o fluxo de caixa.
              Tem uma decisão em aberto sobre isso."
  IA publica: PerguntaRespondida { ... }
  Motor: (processa o evento, aprende que empresário consultou)
```

```
Empresário: "A receita caiu?"
  IA recebe: Contexto Cognitivo (contém indicadores financeiros)
  IA traduz: "Pelos dados disponíveis, sua receita de julho está 15%
              abaixo de junho. Mas não sei dizer se é tendência
              ou variação pontual — ainda não temos evidência suficiente."
  IA publica: PerguntaRespondida { ... }
```

### 8.5 Exemplos de fluxo proibido

```
Empresário: "A receita caiu?"
  IA consulta banco → PROIBIDO
  IA interpreta dado bruto → PROIBIDO
  IA conclui: "Sua empresa está com problema" → PROIBIDO (é decisão)
```

---

## 9. Ciclo Cognitivo Completo

### 9.1 O ciclo

```
Observação (fato do mundo real registrado)
    │
    ▼
Sinal (observação que se destaca do ruído)
    │
    ▼
Hipótese (explicação candidata)
    │
    ▼
Conhecimento (hipótese validada com confiança ≥ 60)
    │
    ▼
Decisão (recomendação formal baseada no conhecimento + contexto)
    │
    ▼
Ação (execução da decisão pelo empresário ou módulo)
    │
    ▼
Resultado (consequência observável da ação)
    │
    ▼
Aprendizado (o resultado modifica o conhecimento)
    │
    ▼
Memória (o aprendizado é consolidado na hierarquia de memória)
    │
    ▼
Relevância (conhecimento é reavaliado — ainda importa?)
    │
    ▼
Nova observação (o ciclo recomeça, com conhecimento mais rico)
```

### 9.2 Regras do ciclo

1. **Nenhuma etapa pode ser pulada** — exceto conhecimento explícito do empresário (ADR-025), que entra direto como Conhecimento com score ≥ 70
2. **Toda etapa é opcional** — o fluxo pode parar em qualquer ponto se não houver dados suficientes
3. **O ciclo nunca termina** — o resultado sempre realimenta o sistema
4. **Correlation ID** propaga por todo o ciclo (ADR-027)
5. **Cada etapa gera no mínimo um evento** no barramento

### 9.3 Ciclo completo com eventos

```
Etapa                  Evento de entrada              Evento de saída
─────────────────────────────────────────────────────────────────────
Observação             EventoDeNegocio                ObservacaoRegistrada
Sinal                  ObservacaoRegistrada           SinalDetectado
Hipótese               SinalDetectado                 HipoteseCriada
Conhecimento           HipoteseCriada                 ConhecimentoPromovido
Decisão                ContextoAtualizado             DecisaoGerada
Ação                   DecisaoGerada                  (empresário executa)
Resultado              (ação executada)               ResultadoRegistrado
Aprendizado            ResultadoRegistrado            AprendizadoRegistrado
Memória                (todos os eventos)             MemoriaRegistrada
Relevância             (tick + contexto)              (score calculado, não público)
```

---

## 10. Fluxos Completos

### 10.1 Primeiro acesso (curioso)

```
1. Curioso acessa pontedigital.com/conversa
2. API route: GET /api/conversa
   └── Cria Conversa anônima (token UUID)
   └── Carrega primeira pergunta do fluxo "primeira-conversa"
3. UI exibe ProgressBar + QuestionCard
4. Evento: nenhum evento cognitivo ainda
```

### 10.2 Primeira conversa (diagnóstico)

```
1. Curioso responde 18 perguntas
2. API route: POST /api/conversa (perguntaId + valor)
   └── MicroReaction (reação instantânea)
   └── Timer 5s → auto-avança
3. Última pergunta: POST /api/conversa/finalizar
   └── CognitiveOrchestrator.processarConversa()
       ├── Event Bus: ConversaIniciada
       ├── Observation Engine: ObservacaoRegistrada (×N respostas)
       ├── Signal Engine: SinalDetectado (se alguma resposta se destacar)
       ├── Hypothesis Engine: HipoteseCriada (se houver padrão)
       ├── Context Engine: ContextoAtualizado
       └── IA: traduz em linguagem natural → tela de revelação
           ├── Interpretacoes (pontoAtencao, observacao, alinhamento)
           └── Convite: "Crie sua conta para salvar"

Eventos publicados:
  ConversaIniciada
  ObservacaoRegistrada (×N)
  SinalDetectado (0 ou mais)
  HipoteseCriada (0 ou mais)
  ContextoAtualizado

Persistência:
  ─ Conversa (DiagnosticContext)
  ─ IdentidadeDigital (se respostas forem vinculadas depois)
```

### 10.3 Cadastro (criação de conta)

```
1. Curioso cria conta (email + senha)
2. API route: POST /api/auth/cadastro
   ├── IAMContext: cria Empresa + Usuario ADMIN
   └── CognitiveOrchestrator.processarCadastro()
       ├── Event Bus: ContaCriada
       ├── Observation Engine: ObservacaoRegistrada
       ├── Identity Engine: constroi IdentidadeDigital (versao: 1)
       ├── Memory Engine: MemoriaRegistrada ("Identidade criada")
       └── Activation Engine: EventoAtivacao (IDENTIDADE_CRIADA)

Eventos publicados:
  ContaCriada
  ObservacaoRegistrada
  MemoriaRegistrada

Persistência:
  ─ Empresa (IAMContext)
  ─ Usuario (IAMContext)
  ─ IdentidadeDigital (CognitiveIdentityContext)
```

### 10.4 Primeira hipótese

```
1. Observation Engine recebe ObservacaoRegistrada
2. Signal Engine detecta que observação cruza threshold
3. Hypothesis Engine:
   ├── Busca padrões conhecidos
   ├── Se encontra padrão: formula hipótese específica
   ├── Se não encontra: formula hipótese genérica
   └── Atribui confiança inicial (10-30)
4. Event Bus: HipoteseCriada
5. Knowledge Engine:
   ├── Validation Engine avalia (score ainda < 60 → mantém como hipótese)
   └── Trust Engine: confiança inicial registrada

Eventos publicados:
  ObservacaoRegistrada (entrada)
  SinalDetectado
  HipoteseCriada

Persistência:
  ─ PatrimonioCognitivo (tipo: "hipotese", estado: "HIPOTESE")
```

### 10.5 Primeiro conhecimento

```
1. Hipótese acumula evidências suficientes (score ≥ 60)
2. Validation Engine promove:
   ├── Curadoria: mínimo 2 submotores confirmam (ADR-028)
   └── Transição: HIPOTESE → CONHECIMENTO
3. Event Bus: ConhecimentoPromovido
4. Trust Engine: score de confiança = ≥60, convicção = 0 (recém-promovido)
5. Context Engine: ContextoAtualizado (agora inclui o novo conhecimento)
6. Decision Engine: pode gerar decisão baseada no novo conhecimento

Eventos publicados:
  HipoteseFortalecida (0 ou mais, até atingir score)
  ConhecimentoPromovido
  ContextoAtualizado

Persistência:
  ─ PatrimonioCognitivo (tipo: "conhecimento", estado: "CONFIRMADO")
```

### 10.6 Primeira recomendação

```
1. Context Engine: ContextoAtualizado (contém conhecimento + sinais)
2. Priority Engine: calcula prioridade
3. Decision Engine:
   ├── Recebe ContextoAtualizado
   ├── Aplica regras de decisão
   └── Gera DecisaoGerada (com score de prioridade)
4. Event Bus: DecisaoGerada
5. IA (se empresário consulta):
   ├── Recebe ContextoAtualizado (já contém a decisão)
   └── Traduz: "Com base no que aprendemos, a prioridade hoje é..."

Eventos publicados:
  ContextoAtualizado
  PrioridadeDefinida
  DecisaoGerada

Persistência:
  ─ Decisão registrada
  ─ Nenhuma no Motor (decisão é volátil até ser convertida em ação pelo empresário)
```

### 10.7 Primeiro feedback

```
1. Empresário avalia ação: AJUDOU | NAO_AJUDOU | etc.
2. API route: POST /api/feedback
3. CognitiveOrchestrator.processarFeedback():
   ├── Event Bus: AcaoAjudou / AcaoNaoFuncionou
   ├── Outcome Engine: ResultadoRegistrado
   ├── Learning Engine:
   │   ├── Se AJUDOU: fortalece hipóteses relacionadas
   │   ├── Se NAO_AJUDOU: enfraquece
   │   └── Publica: AprendizadoRegistrado
   ├── Memory Engine: MemoriaRegistrada ("confirmacao" | "aprendizado")
   └── Se marco atingido: EventoAtivacao

Eventos publicados:
  AcaoAjudou | AcaoNaoFuncionou
  ResultadoRegistrado
  AprendizadoRegistrado
  MemoriaRegistrada

Persistência:
  ─ FeedbackAcao (FeedbackContext)
  ─ Alterações em PatrimonioCognitivo (scores)
  ─ MemoriaCognitiva
```

### 10.8 Primeiro aprendizado

```
1. Empresário responde pergunta rápida ou ensina manualmente
2. API route: POST /api/aprendizados
3. AprendizadoService.adicionarAprendizado():
   ├── Event Bus: AprendizadoExplicito
   ├── Learning Engine:
   │   ├── Cria conhecimento direto (score inicial ≥ 70, ADR-025)
   │   └── Publica: AprendizadoRegistrado
   ├── Memory Engine: MemoriaRegistrada ("aprendizado")
   └── Identity Engine: contextoParaAssistente() passa a incluir

Eventos publicados:
  AprendizadoExplicito
  AprendizadoRegistrado
  MemoriaRegistrada

Persistência:
  ─ Aprendizado (LearningContext)
  ─ PatrimonioCognitivo (novo conhecimento com origem "EXPLICITO")
```

### 10.9 Primeiro padrão coletivo

```
1. Múltiplas empresas geram observações similares
2. Signal Engine detecta: mesmo padrão aparece em N empresas
3. Hypothesis Engine:
   ├── Cria hipótese global (não vinculada a uma empresa específica)
   └── Marca como CORRELACIONAL (ADR-034): "observado em N empresas, mas sem evidência causal"
4. Event Bus: PadraoDetectado (ADR-031)
5. Por empresa:
   ├── Hypothesis Engine recebe PadraoDetectado
   └── Se aplicável à empresa: cria hipótese local com correlação referenciada

Eventos publicados:
  ObservacaoRegistrada (de cada empresa)
  PadraoDetectado (global)
  HipoteseCriada (por empresa, se aplicável)

Persistência:
  ─ Padrão (novo tipo no PatrimonioCognitivo)
  ─ Hipóteses locais vinculadas ao padrão
```

---

## 11. Rotinas

### 11.1 Realtime

| Rotina | Gatilho | Entrada | Saída | Eventos | Persistência |
|---|---|---|---|---|---|
| Observação | Evento bruto | EventoDeNegocio | ObservacaoRegistrada | 1 publicado | Nenhuma |
| Sinal | ObservacaoRegistrada | ObservacaoRegistrada | SinalDetectado | 1 publicado | Nenhuma |
| Hipótese | SinalDetectado | SinalDetectado | HipoteseCriada | 1 publicado | Imediata |
| Resultado | Ação concluída | Ação | ResultadoRegistrado | 1 publicado | Imediata |
| Aprendizado imediato | ResultadoRegistrado | ResultadoRegistrado | AprendizadoRegistrado | 1+ publicado | Imediata |

### 11.2 Diária (00:00)

| Rotina | Gatilho | Entrada | Saída | Eventos | Persistência |
|---|---|---|---|---|---|
| **Consolidação de memória** | Ritmo Engine | Working Memory | Short Term | MemoriaRegistrada | Imediata |
| **Revalidação de conhecimento** | Ritmo Engine | Conhecimentos ativos | Scores recalculados | ConhecimentoEnfraquecido (se aplicável) | Imediata |
| **Esquecimento programado** | Ritmo Engine | Conhecimentos antigos | Arquivamento | ConhecimentoArquivado | Imediata |
| **Curadoria automática** | Ritmo Engine | Hipóteses em observação | Promoção/descarte | HipoteseConfirmada / HipoteseDescartada | Imediata |
| **Aging de confiança** | Ritmo Engine | Conhecimentos ativos | -5 pontos/semana sem revalidação | ConhecimentoEnfraquecido | Imediata |
| **Descarte por inatividade** | Ritmo Engine | Hipóteses com > 30d sem evidência | Descarte | HipoteseDescartada | Imediata |
| **Arquivamento por desuso** | Ritmo Engine | Conhecimento com relevância = 0 por > 90d | Arquivamento | ConhecimentoArquivado | Imediata |

### 11.3 Semanal

| Rotina | Gatilho | Entrada | Saída | Eventos | Persistência |
|---|---|---|---|---|---|
| **Resumo semanal** | Ritmo Engine | Short Term (7 dias) | ResumoSemanal | ResumoSemanal | Imediata |
| **Revisão de objetivos** | Ritmo Engine | Objetivos vs progresso | Contexto atualizado | ContextoAtualizado | Nenhuma |
| **Auditoria de conhecimento** | Ritmo Engine | Conhecimentos com score < 50 | Auditoria registrada | (nenhum — apenas log) | Log |

### 11.4 Mensal

| Rotina | Gatilho | Entrada | Saída | Eventos | Persistência |
|---|---|---|---|---|---|
| **Resumo mensal** | Ritmo Engine | Long Term (30 dias) | ResumoMensal | ResumoMensal | Imediata |
| **Consolidação Long → Archived** | Ritmo Engine | Long Term não acessado | Archived | ConhecimentoArquivado | Imediata |

### 11.5 Background (sem agendamento fixo)

| Rotina | Gatilho | Entrada | Saída | Eventos | Persistência |
|---|---|---|---|---|---|
| **Síntese periódica** | A cada hora | Observações da última hora | Resumo horário | (nenhum — interno) | Nenhuma |
| **Processamento discreto** | A cada 5 min | Fila de eventos acumulados | Contexto atualizado | ContextoAtualizado | Nenhuma |

---

## 12. Sequência de Chamadas

### 12.1 Fluxo completo: Empresário responde pergunta no diagnóstico

```
Browser                                     API Route                           Application Service
  │                                           │                                     │
  │── POST /api/conversa (perguntaId+valor) ──▶                                     │
  │                                           │── valida Zod ──────────────────────▶│
  │                                           │                                     │── ConversaService.responder()
  │                                           │                                         │
  │                                           │                                         ├── Salva resposta (Prisma)
  │                                           │                                         ├── Reação instantânea
  │                                           │                                         └── Se última pergunta:
  │                                           │                                             ├── CognitiveOrchestrator
  │                                           │                                             │   .processarConversa()
  │                                           │                                             │       │
  │                                           │                                             │       ▼
  │                                           │                                             │   Event Bus
  │                                           │                                             │       │
  │                                           │                                             │       ├──▶ Observation Engine
  │                                           │                                             │       │       └── ObservacaoRegistrada
  │                                           │                                             │       ├──▶ Signal Engine
  │                                           │                                             │       │       └── SinalDetectado (talvez)
  │                                           │                                             │       ├──▶ Hypothesis Engine
  │                                           │                                             │       │       └── HipoteseCriada (talvez)
  │                                           │                                             │       ├──▶ Memory Engine
  │                                           │                                             │       │       └── MemoriaRegistrada
  │                                           │                                             │       └──▶ Context Engine
  │                                           │                                             │               └── ContextoAtualizado
  │                                           │                                             │
  │                                           │◀── Resposta ──────────────────────────────│
  │◀── JSON (interpretacoes, microReaction) ──▶                                           │
  │                                                                                       │
```

### 12.2 Fluxo completo: Empresário pergunta ao Assistente

```
Browser                                     API Route                           Application Service
  │                                           │                                     │
  │── POST /api/assistente (mensagem) ────────▶                                     │
  │                                           │── valida Zod ──────────────────────▶│
  │                                           │                                     │── AssistenteService.chat()
  │                                           │                                         │
  │                                           │                                         ├── Context Engine
  │                                           │                                         │   └── ContextoAtualizado
  │                                           │                                         │
  │                                           │                                         ├── IA (Anthropic)
  │                                           │                                         │   ├── Recebe: Contexto Cognitivo
  │                                           │                                         │   ├── Recebe: pergunta do empresário
  │                                           │                                         │   ├── Traduz: contexto + pergunta
  │                                           │                                         │   └── Retorna: texto
  │                                           │                                         │
  │                                           │                                         ├── Publica eventos:
  │                                           │                                         │   ├── PerguntaRespondida
  │                                           │                                         │   └── LacunaReportada (se aplicável)
  │                                           │                                         │
  │◀── JSON (resposta em texto) ──────────────▶                                       │
```

### 12.3 Fluxo completo: Rotina noturna

```
Ritmo Engine
  │
  ├── 00:00: TickCognitivo → Event Bus
  │       │
  │       ├──▶ Forgetting Engine
  │       │       └── Verifica conhecimentos arquiváveis
  │       │       └── Publica: ConhecimentoArquivado (se aplicável)
  │       │
  │       ├──▶ Memory Engine
  │       │       ├── Move Working → Short Term
  │       │       ├── Condensa Short Term
  │       │       ├── Move Short → Long Term
  │       │       └── Publica: MemoriaRegistrada
  │       │
  │       ├──▶ Knowledge Engine (Validation + Trust)
  │       │       ├── Revalida conhecimentos ativos
  │       │       ├── Aplica aging de confiança
  │       │       ├── Descarta hipóteses inativas
  │       │       └── Publica: ConhecimentoEnfraquecido, HipoteseDescartada
  │       │
  │       └──▶ Relevance Engine
  │               └── Recalcula relevância de todos os conhecimentos
  │               └── (score calculado, não publicado individualmente)
  │
  └── Fim: aguarda próximo ciclo (24h)
```

### 12.4 Fluxo completo: Feedback do empresário

```
Browser                                     API Route                           Application Service
  │                                           │                                     │
  │── POST /api/feedback (acaoId + tipo) ─────▶                                     │
  │                                           │── valida Zod ──────────────────────▶│
  │                                           │                                     │── FeedbackService.registrar()
  │                                           │                                         │
  │                                           │                                         ├── Salva FeedbackAcao (Prisma)
  │                                           │                                         │
  │                                           │                                         ├── CognitiveOrchestrator
  │                                           │                                         │   .processarFeedback()
  │                                           │                                         │       │
  │                                           │                                         │       ▼
  │                                           │                                         │   Event Bus
  │                                           │                                         │       │
  │                                           │                                         │       ├──▶ Outcome Engine
  │                                           │                                         │       │       └── ResultadoRegistrado
  │                                           │                                         │       ├──▶ Learning Engine
  │                                           │                                         │       │       ├── Fortalece/enfraquece
  │                                           │                                         │       │       └── AprendizadoRegistrado
  │                                           │                                         │       ├──▶ Knowledge Engine
  │                                           │                                         │       │       └── Score recalculado
  │                                           │                                         │       ├──▶ Memory Engine
  │                                           │                                         │       │       └── MemoriaRegistrada
  │                                           │                                         │       └──▶ Context Engine
  │                                           │                                         │               └── ContextoAtualizado
  │                                           │                                         │
  │◀── JSON (status) ─────────────────────────▶                                       │
```

---

## 13. Dependências Proibidas

### 13.1 Regras formais

```
✓ Motor → Event Bus (publica eventos)
✓ Motor ← Event Bus (consome eventos)
✓ Submotor → Event Bus (publica resultados)
✓ Submotor ← Event Bus (consome eventos de interesse)
✓ Application Service → Prisma (via service, não via repository)
✓ API Route → Application Service (via Zod validation)
✓ Component → Experience Engine (via engine/index.ts)
✓ Experience Engine → Cognitive Orchestrator (via engine/index.ts)

✗ Motor → UI (nunca chama interface)
✗ UI → Repository (nunca acessa banco)
✗ IA → Banco (nunca consulta Prisma, Supabase ou qualquer storage)
✗ Submotor → Outro Submotor (nunca chama função de outro — só eventos)
✗ Submotor → Banco de Outro Submotor (cada submotor só acessa seu próprio agregado)
✗ Motor → IA Direto (só via Contexto Cognitivo)
✗ IA → Motor Direto (só via Event Bus)
✗ API Route → Prisma Direto (deve passar pelo Application Service)
✗ Component → Domain Service Direto (deve passar pela Experience Engine)
✗ Domain Service → Infrastructure Direto (deve usar Repository Port)
✗ Cross-context query sem tenant guard
```

### 13.2 Razões

| Proibição | Razão |
|---|---|
| Motor → UI | Acoplamento entre domínio e apresentação; impede troca de UI |
| UI → Repository | Vaza lógica de banco para a camada de apresentação; risco de segurança |
| IA → Banco | Conhecimento ficaria preso ao modelo de IA; IA não é substituível |
| Submotor → Outro Submotor | Cria dependência direta; falha em um quebra o outro |
| IA → Motor Direto | Quebra o fluxo controlado de Contexto Cognitivo |

---

## 14. Contrato de Execução

Cada engine abaixo declara: entrada, saída, eventos publicados, eventos consumidos, dependências permitidas, dependências proibidas.

### 14.1 Observation Engine

| Item | Valor |
|---|---|
| **Entrada** | `EventoDeNegocio` de módulos da plataforma via Event Bus |
| **Saída** | `ObservacaoRegistrada` |
| **Eventos publicados** | `ObservacaoRegistrada { tipo, categoria, timestamp, valor, confiancaInicial, correlationId }` |
| **Eventos consumidos** | `NovoLeadChegou`, `TransacaoRegistrada`, `TarefaCriada`, `ConversaIniciada`, todos os eventos de negócio |
| **Dependências permitidas** | Event Bus (consumir + publicar) |
| **Dependências proibidas** | Banco de dados, outro submotor, IA |

### 14.2 Signal Engine

| Item | Valor |
|---|---|
| **Entrada** | `ObservacaoRegistrada` via Event Bus |
| **Saída** | `SinalDetectado` com urgência calculada |
| **Eventos publicados** | `SinalDetectado { urgencia, dominio, observacoes[], scorePrioridade, correlationId }` |
| **Eventos consumidos** | `ObservacaoRegistrada` |
| **Dependências permitidas** | Event Bus (consumir + publicar), Priority Engine (consultar score, não chamar) |
| **Dependências proibidas** | Banco de dados, outro submotor diretamente, IA |

### 14.3 Hypothesis Engine

| Item | Valor |
|---|---|
| **Entrada** | `SinalDetectado`, `PadraoDetectado` via Event Bus |
| **Saída** | `HipoteseCriada` |
| **Eventos publicados** | `HipoteseCriada { descricao, confiancaInicial, tipoCausalidade, observacoes[], correlationId }` |
| **Eventos consumidos** | `SinalDetectado`, `PadraoDetectado` |
| **Dependências permitidas** | Event Bus (consumir + publicar), `PatrimonioCognitivo` (persistir) |
| **Dependências proibidas** | Outro submotor diretamente, IA, Prisma fora do agregado |

### 14.4 Knowledge Engine (inclui Validation + Trust)

| Item | Valor |
|---|---|
| **Entrada** | `HipoteseCriada`, `HipoteseFortalecida`, `EvidenciaDeHipotese`, `ResultadoRegistrado`, `AprendizadoRegistrado` via Event Bus |
| **Saída** | Conhecimento validado, transições de estado |
| **Eventos publicados** | `HipoteseFortalecida`, `HipoteseEnfraquecida`, `HipoteseConfirmada`, `HipoteseDescartada`, `ConhecimentoPromovido`, `ConhecimentoEnfraquecido`, `ConhecimentoDescartado`, `ConhecimentoReativado` |
| **Eventos consumidos** | `HipoteseCriada`, `HipoteseFortalecida`, `EvidenciaDeHipotese`, `ResultadoRegistrado`, `AprendizadoRegistrado` |
| **Dependências permitidas** | Event Bus, `PatrimonioCognitivo` (persistir + ler) |
| **Dependências proibidas** | Outro submotor diretamente, IA, módulos de plataforma |

### 14.5 Context Engine

| Item | Valor |
|---|---|
| **Entrada** | Todos os eventos do barramento |
| **Saída** | `ContextoAtualizado` (contendo Contexto Cognitivo) |
| **Eventos publicados** | `ContextoAtualizado { contexto, timestamp, correlationId }`, `LacunaIdentificada` |
| **Eventos consumidos** | Todos os eventos do barramento |
| **Dependências permitidas** | Event Bus, todos os agregados (leitura) |
| **Dependências proibidas** | Banco (escrita), outro submotor diretamente, IA |

### 14.6 Decision Engine

| Item | Valor |
|---|---|
| **Entrada** | `ContextoAtualizado`, `PrioridadeDefinida` via Event Bus |
| **Saída** | `DecisaoGerada` |
| **Eventos publicados** | `DecisaoGerada { acao, motivo, conhecimentosUtilizados[], scoreConfianca, correlationId }` |
| **Eventos consumidos** | `ContextoAtualizado`, `PrioridadeDefinida` |
| **Dependências permitidas** | Event Bus, Contexto Cognitivo (leitura) |
| **Dependências proibidas** | Banco, outro submotor, IA |

### 14.7 Learning Engine

| Item | Valor |
|---|---|
| **Entrada** | `ResultadoRegistrado`, `AcaoAjudou`, `AcaoNaoFuncionou`, `AprendizadoExplicito` via Event Bus |
| **Saída** | Alterações em scores de conhecimento e hipóteses |
| **Eventos publicados** | `AprendizadoRegistrado { conhecimentoId, variacaoScore, correlationId }` |
| **Eventos consumidos** | `ResultadoRegistrado`, `AcaoAjudou`, `AcaoNaoFuncionou`, `AprendizadoExplicito` |
| **Dependências permitidas** | Event Bus, `PatrimonioCognitivo` (alterar scores) |
| **Dependências proibidas** | Outro submotor diretamente, IA, módulos de plataforma |

### 14.8 Memory Engine

| Item | Valor |
|---|---|
| **Entrada** | Todos os eventos do barramento |
| **Saída** | Eventos de consolidação, resumo, arquivamento |
| **Eventos publicados** | `MemoriaRegistrada { tipo, descricao, categoria, correlationId }`, `ResumoDiario`, `ResumoSemanal` |
| **Eventos consumidos** | Todos os eventos do barramento |
| **Dependências permitidas** | Event Bus, `PatrimonioCognitivo` (persistir) |
| **Dependências proibidas** | Outro submotor, IA |

### 14.9 Priority Engine

| Item | Valor |
|---|---|
| **Entrada** | `ContextoAtualizado`, `SinalDetectado`, `ObjetivoDefinido` via Event Bus |
| **Saída** | `PrioridadeDefinida` |
| **Eventos publicados** | `PrioridadeDefinida { score, fatores[], correlationId }` |
| **Eventos consumidos** | `ContextoAtualizado`, `SinalDetectado`, `ObjetivoDefinido` |
| **Dependências permitidas** | Event Bus |
| **Dependências proibidas** | Banco, outro submotor, IA |

### 14.10 Outcome Engine

| Item | Valor |
|---|---|
| **Entrada** | Ações executadas, `FeedbackRegistrado` via Event Bus |
| **Saída** | `ResultadoRegistrado` com impacto calculado |
| **Eventos publicados** | `ResultadoRegistrado { impacto, tipo, correlationId }` |
| **Eventos consumidos** | Ações executadas, `FeedbackRegistrado` |
| **Dependências permitidas** | Event Bus, agregado de ações (leitura) |
| **Dependências proibidas** | Outro submotor, IA |

### 14.11 Forgetting Engine

| Item | Valor |
|---|---|
| **Entrada** | Gatilho noturno da Ritmo Engine, scores de relevância |
| **Saída** | `ConhecimentoArquivado`, `ConhecimentoDescartado` |
| **Eventos publicados** | `ConhecimentoArquivado { motivo, correlationId }` |
| **Eventos consumidos** | Tick da Ritmo Engine, scores internos |
| **Dependências permitidas** | Event Bus, `PatrimonioCognitivo` (alterar estado) |
| **Dependências proibidas** | Outro submotor, IA |

### 14.12 Ritmo Engine

| Item | Valor |
|---|---|
| **Entrada** | Relógio do sistema |
| **Saída** | `TickCognitivo`, `RotinaDiariaIniciada`, `RotinaSemanalIniciada`, `RotinaMensalIniciada` |
| **Eventos publicados** | Ticks e gatilhos de rotina |
| **Eventos consumidos** | Nenhum (é autônomo) |
| **Dependências permitidas** | Event Bus (publicar), relógio do sistema |
| **Dependências proibidas** | Banco, outro submotor, IA |

---

## 15. Roadmap de Implementação

### Fase 0 — Documentação (pré-requisito, sem código)

**Objetivo:** Alinhar documentação com a arquitetura real antes de qualquer refatoração.

| Tarefa | ADR | Arquivos afetados | Risco |
|---|---|---|---|
| Remover SignalContext e ActivationContext como BCs formais | ADR-009 | ARCHITECTURE_DDD.md | Baixo |
| Separar invariantes de domínio de regras técnicas | ADR-033 | ARCHITECTURE_DDD.md, ENGINEERING_GUIDELINES.md | Baixo |
| Deprecação de termos no glossário | ADR-029, Glossário | Nota em ARCHITECTURE_DDD.md | Baixo |

**Dependências:** Nenhuma.

---

### Fase 1 — Fundação (o core do sistema)

**Objetivo:** Unificar o Patrimônio Cognitivo e implementar o ciclo contínuo.

| Tarefa | ADR | Arquivos afetados | Risco | Dependência |
|---|---|---|---|---|
| Unificar Evidencia, Hipotese, ConhecimentoValidado, MemoriaCognitiva em PatrimonioCognitivo | ADR-010 | schema.prisma (migração), 5+ engines | Alto (migração de dados) | Fase 0 |
| Implementar ciclo cognitivo contínuo (Observação → Aprendizado) | ADR-013 | cognitive-orchestrator.ts, todas as engines | Alto (mudança de paradigma) | Fase 0 |
| Algoritmo de priorização (incluindo convicção) | ADR-020, ADR-032 | Priority Engine | Médio | Fase 1 (ter Patrimonio) |
| Eliminar CrencaDaIdentidade e ConhecimentoDaIdentidade | ADR-030 | IdentidadeDigital (schema) | Alto (migração de JSON) | Fase 1 (ADR-010) |

**Impacto:** O Motor passa a ter atomicidade transacional. Ciclo deixa de ser 4 trechos isolados.

---

### Fase 2 — Comunicação entre contextos

**Objetivo:** Implementar Event Bus formal e substituir chamadas diretas por eventos.

| Tarefa | ADR | Arquivos afetados | Risco | Dependência |
|---|---|---|---|---|
| Implementar Event Bus formal (in-memory, pub/sub, middleware) | ADR-011 | Novo: event-bus.ts, event-dispatcher.ts | Médio | Fase 1 |
| Substituir switch/case do processarEvento por dispatcher | ADR-011 | cognitive-signal-context.ts | Médio | Fase 2 (Event Bus) |
| Correlation ID obrigatório em todo evento | ADR-027 | Todos os eventos | Baixo | Fase 2 (Event Bus) |
| Catálogo formal de eventos (renomear CRUD para fatos de negócio) | ADR-012 | Eventos em todas as engines | Médio | Fase 2 (Event Bus) |
| Formalizar Padrão e Correlação como conceitos | ADR-031 | Hypothesis Engine, Signal Engine | Médio | Fase 2 (Event Bus) |
| Política de correlação vs causalidade (tipoCausalidade) | ADR-034 | Hypothesis Engine | Baixo | Fase 2 (Event Bus) |
| Aprendizado explícito com score ≥ 70 | ADR-025 | Learning Engine | Baixo | Fase 1 |

**Impacto:** Fim das chamadas diretas entre engines. Tudo passa pelo barramento.

---

### Fase 3 — Desacoplamento de infraestrutura

**Objetivo:** Extrair interfaces de repositório para o domínio.

| Tarefa | ADR | Arquivos afetados | Risco | Dependência |
|---|---|---|---|---|
| Extrair interfaces Repository<T> para o domínio | — | engine/, novos arquivos ports/ | Médio | Fase 2 |
| Remover dependência de @prisma/client do domínio | — | engine/*.ts | Médio | Fase 3 (ports) |
| Renomear agregados para português (Outcome → Resultado, etc.) | ADR-029 | schema.prisma (migração), aggregates | Alto (renomeação) | Fase 1 |

**Impacto:** Domínio puro, sem dependência de infraestrutura.

---

### Fase 4 — Escala e performance

**Objetivo:** Otimizar performance sem comprometer arquitetura.

| Tarefa | ADR | Arquivos afetados | Risco | Dependência |
|---|---|---|---|---|
| Implementar cache de estado cognitivo (in-memory, TTL 30s) | ADR-014 | Context Engine, novo cache.ts | Médio | Fase 2 (Event Bus para invalidação) |
| Substituir rotinas N+1 por batch SQL ou fila | — | Rotinas (diária, semanal) | Médio | Fase 2 |

**Impacto:** Performance aceitável para 100+ empresas simultâneas.

---

### Fase 5 — Limpeza arquitetural

**Objetivo:** Remover débitos arquiteturais acumulados.

| Tarefa | ADR | Arquivos afetados | Risco | Dependência |
|---|---|---|---|---|
| Mover Experience Engine para camada de apresentação (ACL) | — | cognitive-experience-engine.ts | Médio | Fase 3 |
| Extrair processadores do CognitiveOrchestrator para EventHandlers | — | cognitive-orchestrator.ts | Médio | Fase 2 |
| Separar invariantes de domínio no código (se ainda houver) | ADR-033 | services de validação | Baixo | Fase 0 |
| Hierarquia de memória completa (Working, Short, Long, Archived) | ADR-019 | Memory Engine | Médio | Fase 1 |
| Curadoria obrigatória (validação cruzada 2+ submotores) | ADR-028 | Knowledge Engine | Médio | Fase 2 |

**Impacto:** Arquitetura limpa, sem atalhos ou acoplamentos indevidos.

---

### Fase 6 — Contínuo (eventos reais)

**Objetivo:** Substituir mecanismos provisórios por eventos formais.

| Tarefa | ADR | Arquivos afetados | Risco | Dependência |
|---|---|---|---|---|
| Substituir HistoricoSinal por eventos reais | ADR-001, ADR-011 | HistoricoSinal → LogDeEventos | Alto (migração) | Fase 2 |
| Substituir EventoAtivacao por eventos reais (MarcoDeJornada) | ADR-029 | EventoAtivacao → MarcoDeJornada | Alto (migração) | Fase 2 |
| FeedbackAcao vira VO de Decisao | — | Schema, services | Médio | Fase 1 |
| Remover nomenclatura técnica de eventos antigos | ADR-012 | Todas as engines | Médio | Fase 2 |

**Impacto:** Catálogo de eventos 100% implementado. Nomenclatura semântica em todo o sistema.

---

### Matriz de dependência entre fases

```
Fase 0 (documentação, sem código)
  │
  ▼
Fase 1 (Patrimonio Cognitivo + Ciclo Contínuo)
  │
  ▼
Fase 2 (Event Bus + Catálogo de Eventos)
  │
  ├──▶ Fase 3 (Repositories + Desacoplamento)
  │         │
  │         ▼
  │       Fase 4 (Cache + Performance)
  │         │
  │         ▼
  │       Fase 5 (Limpeza Arquitetural)
  │
  └──▶ Fase 6 (Contínuo — eventos reais)
```

---

> **Colofão:** Este documento descreve **como a Ponte Digital executa em produção**. Nenhuma linha de código foi escrita ou alterada para produzi-lo. Nenhum documento existente foi modificado. Nenhum conceito novo foi criado. Toda decisão aqui reflete uma ADR aprovada, um princípio da Constituição, ou uma definição da Ontologia Cognitiva.
