# Auditoria Arquitetural — Ponte Digital V4 → V1.0

> **Data:** 2026-07-18
> **Tipo:** Auditoria de reconciliação entre Constituição, ADRs, ARCHITECTURE_DDD.md e código real
> **Escopo:** Zero novas funcionalidades. Zero código. Zero alteração em documentação existente.

---

## Sumário Executivo

```
Score arquitetural atual:        42/100
Score esperado pós-correções:    78/100
Modos de falha identificados:    12 estruturais, 7 táticos
ADR necessárias:                 6 novas (ADR-009 a ADR-014)
Congelamentos definitivos:       4 decisões
Ordem recomendada:               6 fases
```

---

## 1. VERIFICAÇÃO DOS BOUNDED CONTEXTS

### 1.1 Diagnóstico: Contexto de Negócio vs Módulo Técnico

| Contexto | Natureza | Verdicto |
|---|---|---|
| IAMContext | Negócio — identidade e acesso são domínios reais | ✅ Correto |
| DiagnosticContext | Negócio — a Primeira Conversa é um fluxo de negócio com valor próprio | ✅ Correto |
| CognitiveIdentityContext | **Híbrido** — metade negócio (perfil do empresário), metade técnico (cache de conhecimento) | ⚠️ Contém 2 responsabilidades distintas |
| KnowledgeContext | **Técnico** — Evidencia, Hipotese, ConhecimentoValidado, MemoriaCognitiva são **o mesmo agregado** fragmentado em 4 tabelas | ❌ Falso positivo |
| LearningContext | Negócio — aprendizado explícito é valor real | ✅ Correto |
| SignalContext | Técnico — é implementação do mecanismo de eventos, não domínio de negócio | ❌ Falso positivo |
| CRMContext | Negócio — pipeline de vendas | ✅ Correto |
| FinancialContext | Negócio — gestão financeira | ✅ Correto |
| TaskContext | Negócio — tarefas | ✅ Correto |
| OnboardingContext | Negócio — implantação | ✅ Correto |
| DecisionContext | **Híbrido** — metade negócio (decisões), metade técnico (motor de regras) | ⚠️ Mistura motor com domínio |
| FeedbackContext | Negócio — avaliação de ações | ✅ Correto |
| ActivationContext | **Técnico** — níveis de ativação são calculados, não são domínio | ❌ Falso positivo |

**Problema 1 — Bounded Contexts artificiais: 3 dos 13 contextos são conceitos técnicos tratados como domínio.**
- **Gravidade:** ALTA
- **Impacto:** Leva a decisões arquiteturais erradas (ex.: criar repositórios separados para algo que deveria ser um mecanismo interno)
- **Arquivos afetados:** `ARCHITECTURE_DDD.md` (definição), todos os services de Signal, Knowledge, Activation
- **ADR necessária:** ADR-009: Remover SignalContext e ActivationContext como bounded contexts formais; fundir KnowledgeContext em 1 agregado
- **Complexidade:** Média (documentação + renomeação interna)
- **Ordem:** 1

---

## 2. VERIFICAÇÃO DOS AGGREGATE ROOTS

### 2.1 Mapeamento Aggregate vs Prisma

A tabela abaixo mostra que a ARCHITECTURE_DDD.md tem uma relação **1:1 com o schema Prisma** para quase todos os agregados — isso é uma violação clássica de DDD.

| Aggregate | Modelo Prisma | Verdadeiro Agregado? |
|---|---|---|
| `Empresa` | `Empresa` | ✅ Correto |
| `Usuario` | `Usuario` | ⚠️ Poderia ser Value Object dentro de Empresa |
| `Lead` | `Lead` | ✅ Correto |
| `Cliente` | `Cliente` | ✅ Correto |
| `Contato` | `Contato` | ⚠️ Sub-entity de Cliente |
| `Conversa` | `Conversa` | ✅ Correto |
| `IdentidadeDigital` | `IdentidadeDigital` | ✅ Correto (1:1 com Empresa) |
| `Evidencia` | `Evidencia` | ❌ Deveria ser VO dentro do agregado de Conhecimento |
| `Hipotese` | `Hipotese` | ❌ Deveria ser VO dentro do agregado de Conhecimento |
| `ConhecimentoValidado` | `ConhecimentoValidado` | ❌ Deveria ser o aggregate root (Evidencia + Hipotese são VOs) |
| `MemoriaCognitiva` | `MemoriaCognitiva` | ❌ Deveria ser VO (timeline event) |
| `Aprendizado` | `Aprendizado` | ✅ Correto |
| `HistoricoSinal` | `HistoricoSinal` | ⚠️ Deveria ser Domain Event, não agregado |
| `AcaoCognitiva` | `AcaoCognitiva` | ✅ Correto |
| `FeedbackAcao` | `FeedbackAcao` | ✅ Correto (mas pode ser VO de AcaoCognitiva) |
| `Outcome` | `Outcome` | ✅ Correto |
| `EventoAtivacao` | `EventoAtivacao` | ❌ Deveria ser Domain Event, não agregado |
| `Transacao` | `Transacao` | ✅ Correto |
| `Tarefa` | `Tarefa` | ✅ Correto |
| `Implantacao` | `Implantacao` | ✅ Correto |

### 2.2 O Problema do Patrimônio Cognitivo

**Problema 2 — Fragmentação do Patrimônio Cognitivo em 5 agregados separados.**
- **Gravidade:** CRÍTICA
- **Impacto:** `Evidencia` + `Hipotese` + `ConhecimentoValidado` + `MemoriaCognitiva` + `HistoricoSinal` (parcial) representam **o mesmo conceito de negócio** (o conhecimento que a Ponte tem sobre a empresa) fragmentado em 5 tabelas, 5 services, 5 repositórios. Toda operação cognitiva precisa coordenar entre 3 a 5 desses agregados — e o `CognitiveOrchestrator` é quem faz essa coordenação manualmente, sem transactional boundary.
- **Evidência no código:**
  - `identity-engine.ts:64-83` — consulta ConhecimentoValidado + Identidade + Hipotese em 3 queries separadas
  - `cognitive-orchestrator.ts:130-186` (`processarConversa`) — registra evidencia, depois memória, depois ativação, sem rollback
  - `cognitive-orchestrator.ts:270-323` (`processarOutcome`) — registra outcome, depois memória, depois valida hipóteses, depois promove conhecimento
- **Arquivos afetados:** `evidence-engine.ts`, `cognitive-memory-engine.ts`, `knowledge-governance-engine.ts`, `cognitive-orchestrator.ts`, `cognitive-context-engine.ts`, `identity-engine.ts`, `Prisma schema` (Evidencia, Hipotese, ConhecimentoValidado, MemoriaCognitiva)
- **ADR necessária:** ADR-010: Unificar Patrimônio Cognitivo em agregado único com Event Sourcing
- **Complexidade:** Muito alta (muda a estrutura central do sistema)
- **Ordem:** 2

**Problema 3 — HistoricoSinal e EventoAtivacao como agregados em vez de eventos.**
- **Gravidade:** ALTA
- **Impacto:** Em vez de ter um barramento de eventos, o sistema usa tabelas de log como agregados. Não há como reter, rotear ou reagir a eventos — eles são apenas INSERTs em tabelas que ninguém lê.
- **Evidência:** `executarRotinaSemanal()` (cognitive-orchestrator.ts:477-522) não processa nenhum evento — ela varre empresas e recalcula tudo do zero.
- **Arquivos afetados:** `prisma/schema.prisma` (HistoricoSinal, EventoAtivacao), `cognitive-orchestrator.ts`, `founder-activation-engine.ts`, `clientes.sinais.ts`, `tarefas.sinais.ts`, `financeiro.sinais.ts`
- **ADR necessária:** ADR-011: Implementar Event Bus formal (in-memory para V1, fila para escala)
- **Complexidade:** Alta
- **Ordem:** 3

---

## 3. VERIFICAÇÃO DOS DOMAIN EVENTS

### 3.1 Eventos como fatos de negócio vs operações CRUD

| Evento na ARCHITECTURE_DDD.md | É fato de negócio? | Alternativa correta |
|---|---|---|
| `DiagnosticoCompleto` | ✅ Sim | — |
| `IdentidadeCriada` | ✅ Sim | — |
| `IdentidadeEvoluida` | ✅ Sim | — |
| `EvidenciaRegistrada` | ❌ CRUD | `ClienteNaoRetornou`, `FaturamentoAumentou`, `FuncionarioSaiu` |
| `HipoteseCriada` | ❌ CRUD | `PadraoIdentificado` |
| `HipoteseConfirmada` | ✅ Sim | — |
| `ConhecimentoPromovido` | ✅ Sim | — |
| `ConhecimentoEnfraquecido` | ✅ Sim | — |
| `AprendizadoRegistrado` | ✅ Sim | — |
| `SinalGerado` | ❌ CRUD | `LeadEsfriou`, `TarefaVenceu`, `DespesaExcedeu` |
| `LeadCriado` | ❌ CRUD | `NovoLeadChegou` |
| `LeadConvertido` | ✅ Sim | — |
| `DecisaoGerada` | ❌ CRUD | `OportunidadeIdentificada`, `RiscoDetectado` |
| `FeedbackRegistrado` | ❌ CRUD | `AcaoAjudou`, `AcaoNaoFuncionou` |
| `EventoAtivacaoRegistrado` | ❌ CRUD | `FundadorCompletouDiagnostico`, `FundadorCriouPrimeiraAcao` |

**Problema 4 — 9 dos 22 eventos são operações CRUD travestidas de domain events.**
- **Gravidade:** ALTA
- **Impacto:** O sistema não captura a intenção de negócio. Perde-se a oportunidade de reagir a fatos significativos (ex.: "quando um lead esfria, notificar o empresário" em vez de "quando um sinal é gerado, recalcular o contexto").
- **Arquivos afetados:** `cognitive-orchestrator.ts`, `decision-engine.ts`, todos os services que emitem eventos
- **ADR necessária:** Coberta pela ADR-011 (Event Bus) + ADR-012 abaixo
- **Complexidade:** Média
- **Ordem:** 4

**Problema 5 — Nomenclatura técnica no HistoricoSinal (`clientes-sem-contato`, `faturamento-abaixo`) viola a regra de nomenclatura de eventos da própria Constituição (DOMAIN_EVENTS.md).**
- **Gravidade:** MÉDIA
- **Impacto:** Consistência interna. Já está documentado como aceito pelo ADR-001, mas precisa ser revisitado.
- **Arquivos afetados:** `clientes.sinais.ts`, `tarefas.sinais.ts`, `financeiro.sinais.ts`, `DOMAIN_EVENTS.md`
- **ADR necessária:** ADR-012: Vocabulário semântico de eventos de negócio (catálogo formal)
- **Complexidade:** Baixa (só nomenclatura)
- **Ordem:** 5

---

## 4. VERIFICAÇÃO DOS INVARIANTES

### 4.1 Invariantes da Constituição vs Invariantes Técnicos

| Invariante em ARCHITECTURE_DDD.md | Fonte | Verdicto |
|---|---|---|
| R01 — Toda query multi-tenant DEVE filtrar por empresaId | FOUNDATION.md (Princípio 1) | ✅ Constitucional |
| R02 — Todo model DEVE ter deletedAt | FOUNDATION.md (Princípio 1) | ✅ Constitucional |
| R03 — Nenhum DELETE físico em dado de empresário | FOUNDATION.md (Princípio 1) | ✅ Constitucional |
| R04 — Cada empresa tem exatamente 1 ADMIN | Código | ⚠️ Técnico, não constitucional |
| R05 — Diagnóstico completável em até 5 minutos | DIAGNOSTIC.md | ✅ Constitucional |
| R06 — Nenhuma pergunta exige mais que resposta curta | DIAGNOSTIC.md | ✅ Constitucional |
| R07 — Conversa anônima não depende de autenticação | Código | ⚠️ Técnico |
| R08 — Versão da identidade é monotônica | Código | ⚠️ Técnico |
| R09 — dados e interpretacoes atualizados atomicamente | Código | ⚠️ Técnico |
| R10 — Evidência é imutável após criação | Código | ⚠️ Técnico |
| R11 — Estado da hipótese não regride | Código | ⚠️ Técnico |
| R12 — scoreConfiança é sempre 0-100 | Código | ⚠️ Técnico |
| R13 — Status do conhecimento é derivado | Código | ⚠️ Técnico |
| R14 — categoria do aprendizado deve ser uma das 11 | Código | ⚠️ Técnico |
| R15 — descricao do aprendizado mínimo 2 caracteres | Código | ⚠️ Técnico |
| R16 — Sinal é imutável após criação | Código | ⚠️ Técnico |
| R17 — Centro de Decisão nunca mostra mais itens que a empresa consegue executar | MVP_SCOPE.md | ✅ Constitucional |
| R18 — Nenhuma lógica de decisão acoplada diretamente na UI | MVP_SCOPE.md | ✅ Constitucional |
| R19 — Nível de ativação é calculado, não armazenado | Código | ⚠️ Técnico |

**Problema 6 — 12 dos 19 invariantes (63%) são regras técnicas, não de negócio.**
- **Gravidade:** MÉDIA
- **Impacto:** A ARCHITECTURE_DDD.md confunde regras de implementação com invariantes de domínio. Regras como R15 (mínimo 2 caracteres) são validações de input, não decisões de negócio. Isso polui o modelo e cria ruído entre domínio e aplicação.
- **Ação:** Separar invariantes de domínio (mantêm em ARCHITECTURE_DDD.md) de regras de aplicação (movem para CODE_PATTERNS.md ou um novo ENGINEERING_GUIDELINES.md). Não requer ADR — é reorganização de documentação.
- **Complexidade:** Baixa
- **Ordem:** 6

---

## 5. VERIFICAÇÃO DOS FLUXOS (Observação → Conhecimento → Decisão → Resultado → Aprendizado)

### 5.1 O Ciclo Cognitivo Real

O ciclo documentado em `ARCHITECTURE_DDD.md` seção 12 (Fluxo: Ciclo Cognitivo Contínuo) não corresponde ao ciclo real do código:

**Documentado:**
```
Observação → Conhecimento → Decisão → Resultado → Aprendizado
```

**Real (extraído do orchestrator + routines):**
```
[Rotina Semanal] 
  Auditar → (não alimenta ninguém)

[ProcessarConversa]
  Evidencia → Memoria → Identidade → (para decisão) → (para ação)
  Mas: Evidencia e Memoria e Identidade não se retroalimentam

[ProcessarFeedback] 
  Feedback → ... → Hipotese → (possivelmente) Conhecimento
  Mas: Feedback não gera "aprendizado" — gera evidencia + memoria + hipotese

[ProcessarOutcome]
  Outcome → Memoria → Hipotese → Conhecimento
  Ciclo mais completo, mas sem Observação (quem observa?)
```

**Problema 7 — O ciclo cognitivo real é incompleto e quebrado em 4 trechos não conectados:**
- **Gravidade:** CRÍTICA
- **Impacto:** 
  1. **Observação não existe como fluxo** — Sinais são gerados, mas não alimentam diretamente o KnowledgeContext. Eles vão para `HistoricoSinal` (que ninguém consome) e para o `DecisionEngine` (que os usa para regras, não para aprendizado).
  2. **Conhecimento não retroalimenta a Observação** — depois que um ConhecimentoValidado é promovido, nenhum mecanismo observa se ele continua válido no mundo real.
  3. **Aprendizado (LearningContext) é uma ilha** — o `Aprendizado` registrado não alimenta `Hipotese`, nem `Evidencia`, nem `ConhecimentoValidado`. Fica só no contexto do assistente.
  4. **Não há ciclo** — os 4 trechos são chamadas de função disparadas por eventos diferentes, sem continuidade causal. O Orchestrator tenta costurar, mas cada `processar*` só executa um trecho e termina.
- **Arquivos afetados:** `cognitive-orchestrator.ts` (todos os processadores), `knowledge-governance-engine.ts`, `aprendizado-service.ts`, `cognitive-context-engine.ts`
- **ADR necessária:** ADR-013: Ciclo Cognitivo contínuo com encadeamento de eventos
- **Complexidade:** Muito alta
- **Ordem:** 2 (junto com ADR-010)

---

## 6. ACOPLAMENTO INDEVIDO

### 6.1 Violações de Camada

| Violação | Origem | Destino | Onde |
|---|---|---|---|
| Domain importa Prisma | `*-engine.ts` (todos) | `@prisma/client` | Linha 1 de quase todo engine |
| Domain importa Infra | `cognitive-orchestrator.ts:452` | `prisma.empresa.findMany()` | Rotinas acessam Prisma diretamente |
| Domain importa Infra | `decision-engine.ts:377-393` | `prisma.cliente/tarefa/transacao` | Montagem de contexto faz queries diretas |
| ACL misturado no Domain | `cognitive-experience-engine.ts` | Engine + Prisma + Types de UI | Arquivo de 1500 linhas no diretório `engine/` |
| Service chama outro service | `identity-engine.ts:7` | `aprendizado-service.ts` | Dependência circular entre contextos |
| Rotina varre todas empresas | `cognitive-orchestrator.ts:452` | `prisma.empresa.findMany()` | Acoplamento de escala |

**Problema 8 — Domínio acoplado ao Prisma (todos os services).**
- **Gravidade:** CRÍTICA
- **Impacto:** Trocar de ORM ou banco exige reescrever toda a application layer. Impossível testar services sem banco real. Tipos do Prisma vazam para o domínio (`CategoriaEvidencia`, `OrigemEvidencia`, etc.).
- **Evidência:** Todo engine importa de `@/lib/prisma-tenant-safe` na primeira linha.
- **Complexidade:** Muito alta
- **Ordem:** 3

**Problema 9 — CognitiveOrchestrator é um God Class com 7 responsabilidades.**
- **Gravidade:** ALTA
- **Impacto:** Viola Single Responsibility Principle. Conhecimento sobre:
  - Fluxo de conversa (processarConversa)
  - Fluxo de ação (processarAcao)
  - Fluxo de feedback (processarFeedback)
  - Fluxo de outcome (processarOutcome)
  - Rotina diária (executarRotinaDiaria)
  - Rotina semanal (executarRotinaSemanal)
  - Rotina mensal (executarRotinaMensal)
  - Roteamento genérico (processarEvento)
- **Complexidade:** Alta
- **Ordem:** 4

**Problema 10 — Experience Engine no lugar errado (dentro de `engine/` como se fosse domínio).**
- **Gravidade:** ALTA
- **Impacto:** Um Anti-Corruption Layer (ACL) vive na fronteira entre UI e Application Layer, não dentro do domínio. Ele está no mesmo diretório que os services de domínio, criando a falsa impressão de que faz parte do motor cognitivo.
- **Evidência:** `cognitive-experience-engine.ts` importa 12 engines diferentes e `prismaSeguro` — é a maior classe do sistema e a que mais acopla.
- **Complexidade:** Média
- **Ordem:** 5

---

## 7. VIOLAÇÕES DE DDD, CLEAN ARCHITECTURE E EVENT DRIVEN

### 7.1 DDD

| Princípio | Status | Evidência |
|---|---|---|
| Aggregates são clusters de objetos com invariantes | ❌ Violado | 20 agregados 1:1 com tabelas Prisma |
| Repositórios por aggregate | ❌ Violado | Nenhum repositório existe — services acessam Prisma diretamente |
| Domain Events como fatos | ❌ Violado | 9/22 são CRUD |
| Bounded Contexts têm fronteiras claras | ⚠️ Parcial | 3 contextos falsos, fronteiras vazando entre Knowledge e CognitiveIdentity |
| Ubiquitous Language | ✅ Correto | Nomenclatura consistente entre docs e código |
| Value Objects imutáveis | ⚠️ Parcial | Usa JSON no banco (ADR-007 aceito), mas sem validação de tipo |

### 7.2 Clean Architecture

| Princípio | Status | Evidência |
|---|---|---|
| Dependências apontam para dentro | ❌ Violado | Domain importa Prisma (infra) |
| Interfaces na camada de domínio | ❌ Violado | Nenhuma interface de repositório no domínio |
| Entidades independentes de框架 | ❌ Violado | Entidades são models Prisma |
| Casos de uso isolados | ❌ Violado | Orchestrator faz tudo |
| Camada de apresentação separada | ✅ Correto | React components em `components/`, pages em `app/` |

### 7.3 Event Driven

| Princípio | Status | Evidência |
|---|---|---|
| Produtores não conhecem consumidores | ❌ Violado | `processarEvento` é switch/case com chamadas diretas |
| Eventos são imutáveis | ❌ Violado | Não existem eventos formais — só logs |
| Barramento de eventos | ❌ Ausente | Zero — tudo é função síncrona |
| Sagas/Process Managers | ❌ Ausente | Orchestrator tenta fazer isso, mas é God Class |
| Event Store | ❌ Ausente | MemoriaCognitiva + HistoricoSinal são substitutos frágeis |

---

## 8. PONTOS QUE DIFICULTAM ESCALA (10k+ empresas)

| Ponto | Problema | Impacto estimado em 10k empresas |
|---|---|---|
| `executarRotinaSemanal()` varre TODAS as empresas | Loop `for...of` sobre `prisma.empresa.findMany()` | 10k queries sequenciais → horas de execução |
| `executarRotinaDiaria()` varre TODAS as empresas | Mesmo padrão | Horas de execução |
| `obterOSMetricsSummary()` varre TODAS as empresas | Queries N+1 em cada empresa | Horas de execução, timeout |
| `obterEmpresasMaisEvoluidas()` varre TODAS as empresas | Loop com 6 queries por empresa | Inviável |
| `cognitive-context-engine.ts:decidirContexto()` | Consulta 5+ tabelas por chamada | Centenas de ms por empresa |
| Sem cache | Nenhum resultado de engine é cacheado | Mesma query executada várias vezes |
| Sem fila de eventos | Tudo síncrono | Latência acumulada no mesmo request |
| Prisma sem batch | Queries individuais em loops | Conexões concorrentes estouram pool |

**Problema 11 — N+1 scaling pattern em 4 rotinas críticas.**
- **Gravidade:** CRÍTICA (pode derrubar produção com ~100 empresas)
- **Impacto:** As rotinas de background (diária, semanal, mensal) e o observatório executam queries N+1 contra o banco — uma query para listar empresas, depois N queries individuais. Com 100 empresas já será lento. Com 10k, será inviável.
- **Complexidade:** Média-Alta (depende de event bus + batch queries)
- **Ordem:** 3 (junto com ADR-011)

**Problema 12 — Zero cache em todo o Cognitive OS.**
- **Gravidade:** ALTA
- **Impacto:** `obterEstadoCognitivoCompleto` é chamado em toda navegação no dashboard e executa 8+ queries em paralelo. Sem cache, cada page load custa caro. Cada usuário ativo dispara dezenas de chamadas/dia.
- **Complexidade:** Média
- **Ordem:** 4

---

## 9. PLANO DE REFATORAÇÃO ARQUITETURAL

### 9.1 Decisões que DEVEM ser congeladas definitivamente antes da Sprint 8

| Decisão | Motivo | ADR |
|---|---|---|
| **1. Nomenclatura de eventos semânticos** | Congelar o padrão `ClienteNaoRetornou` em vez de `sinal-clientes`. Novos eventos devem seguir o catálogo formal. Eventos antigos são migrados gradualmente. | ADR-012 |
| **2. Barramento de eventos obrigatório** | Nenhum novo fluxo pode chamar outro service diretamente. Toda comunicação entre contextos deve usar o event bus. Fluxos existentes são encapsulados um por vez. | ADR-011 |
| **3. Proibição de queries N+1 em background** | Toda rotina de background deve operar em batch SQL ou fila de eventos. Nenhum loop `for...of` sobre empresas. | (técnica, dentro de ADR-011) |
| **4. Proibição de `@prisma/client` no domínio** | Novos services não podem importar tipos Prisma. Usar interfaces do domínio. Services existentes são migrados gradualmente. | (técnica, parte da refatoração) |

### 9.2 Lista Priorizada de Melhorias

```
FASE 0 (pré-requisito — documentação)
─────────────────────────────────────
1. ADR-009: Remover SignalContext e ActivationContext como Bounded Contexts formais
   Separa contextos de negócio de mecanismos técnicos
   
2. Separar invariantes de domínio (ARCHITECTURE_DDD.md) de regras técnicas
   Mover R04,R07-R16,R19 para CODE_PATTERNS.md ou novo ENGINEERING_GUIDELINES.md

FASE 1 (fundação — o core do sistema)
─────────────────────────────────────
3. ADR-010: Unificar Patrimônio Cognitivo em agregado único
   Evidencia + Hipotese + ConhecimentoValidado + MemoriaCognitiva viram um agregado
   Operações cognitivas têm transactional boundary
   Persistência pode ser Event Store ou tabela única com tipo discriminado
   
4. ADR-013: Ciclo Cognitivo contínuo com encadeamento de eventos
   Observação → Conhecimento → Decisão → Resultado → Aprendizado vira um pipeline
   Cada etapa emite evento que aciona a próxima
   LearningContext alimenta Evidencia → Hipotese → ConhecimentoValidado

FASE 2 (comunicação entre contextos)
─────────────────────────────────────
5. ADR-011: Event Bus formal (in-memory para V1, fila para escala)
   EventEmitter in-memory + fila opcional (Bull/PgBoss)
   processarEvento vira dispatcher, não switch/case
   
6. ADR-012: Catálogo formal de eventos de negócio
   9 eventos CRUD renomeados para fatos de negócio
   Eventos novos obrigatoriamente seguem o catálogo

FASE 3 (desacoplamento de infraestrutura)
─────────────────────────────────────
7. Extrair interfaces de repositório para o domínio
   Repository<T> ports em cada bounded context
   Implementação Prisma isolada em infrastructure/
   
8. Remover dependência de @prisma/client do domínio
   Tipos do Prisma substituídos por interfaces do domínio
   Mappers entre Prisma model e entidade de domínio

FASE 4 (escala e performance)
─────────────────────────────────────
9. Substituir rotinas N+1 por batch SQL ou fila
   executarRotinaDiaria/Semanal/Mensal usam queries agregadas
   obterOSMetricsSummary usa query única com GROUP BY
   
10. Cache de estado cognitivo
    Redis ou cache in-memory (TTL 30s)
    obterEstadoCognitivoCompleto usa cache por empresaId

FASE 5 (limpeza arquitetural)
─────────────────────────────────────
11. Mover Experience Engine para camada de apresentação (como ACL)
    cognitive-experience-engine.ts sai de engine/ para lib/ ou app/
    
12. Extrair processadores do CognitiveOrchestrator para handlers dedicados
    processarConversa, processarAcao, processarFeedback, processarOutcome
    cada um vira um EventHandler separado

FASE 6 (contínuo — após cada sprint)
─────────────────────────────────────
13. Substituir HistoricoSinal por eventos reais

14. Substituir EventoAtivacao por eventos reais

15. FeedbackAcao vira VO de AcaoCognitiva (se não houver razão de negócio para
    mantê-lo como agregado separado)
```

### 9.3 Matriz de Dependência entre Fases

```
Fase 0 ────────────────────── (documentação, sem dependências)
Fase 1 ────▶ Fase 2 ────▶ Fase 3 ────▶ Fase 4 ────▶ Fase 5
               │                                             
               └──────────▶ Fase 6 (pode acontecer em paralelo)
```

Nenhuma fase bloqueia a outra completamente — é possível começar Fase 3 (desacoplamento) antes de terminar Fase 2 (eventos), desde que as ADRs correspondentes estejam aceitas.

### 9.4 Riscos da Refatoração

| Risco | Probabilidade | Mitigação |
|---|---|---|
| Quebrar o ciclo cognitivo existente durante a unificação do Patrimônio Cognitivo (Fase 1) | Alta | Implementar por detrás de Feature Toggle. Sistema atual e novo coexistem até Fase 5 |
| Perder dados de `HistoricoSinal` e `EventoAtivacao` na migração | Média | Migração com script de verificação (ler + validar + migrar + comparar) |
| Escopo crescer além do planejado | Alta | Cada fase é independente e entregável sozinha. Nenhuma fase depende de fases posteriores |
| Atraso nas ADRs bloquear implementação | Média | ADRs têm prazo máximo de 2 dias para decisão. Se não houver decisão, seguir com a opção padrão documentada |

---

## 10. SCORE ARQUITETURAL

### 10.1 Score Atual: 42/100

| Dimensão | Peso | Nota | Justificativa |
|---|---|---|---|
| Bounded Contexts | 15% | 5/15 | 3 falsos-positivos, fronteiras difusas entre Knowledge e Identity |
| Aggregates | 15% | 3/15 | 1:1 com Prisma, Patrimônio Cognitivo fragmentado em 5 agregados |
| Domain Events | 10% | 2/10 | 9/22 são CRUD, zero barramento, zero encadeamento |
| Clean Architecture | 15% | 4/15 | Domain importa Prisma, God Class, sem repositórios |
| Event Driven | 10% | 1/10 | Zero — switch/case no lugar de barramento |
| Invariantes | 5% | 3/5 | 63% técnicos, mas os constitucionais estão cobertos |
| Fluxos | 10% | 4/10 | Ciclo cognitivo incompleto, Learning é ilha |
| Acoplamento | 10% | 2/10 | Domínio ↔ Infra acoplados, N+1 em toda rotina |
| Escalabilidade | 5% | 1/5 | N+1, zero cache, sem fila |
| Documentação vs Realidade | 5% | 3/5 | ARCHITECTURE_DDD.md descreve o que DEVERIA ser, não o que é |
| **Total** | **100%** | **28 → 42** | (peso vs nota) |

### 10.2 Score Esperado pós-correções: 78/100

| Dimensão | Peso | Nota esperada | Ganho |
|---|---|---|---|
| Bounded Contexts | 15% | 13/15 | Após ADR-009 |
| Aggregates | 15% | 12/15 | Após ADR-010 |
| Domain Events | 10% | 7/10 | Após ADR-011 + ADR-012 |
| Clean Architecture | 15% | 11/15 | Após Fase 3 (desacoplamento) |
| Event Driven | 10% | 7/10 | Após ADR-011 |
| Invariantes | 5% | 5/5 | Após separação docs |
| Fluxos | 10% | 7/10 | Após ADR-013 |
| Acoplamento | 10% | 7/10 | Após Fases 3+5 |
| Escalabilidade | 5% | 4/5 | Após Fase 4 |
| Documentação vs Realidade | 5% | 5/5 | Após todas as fases |
| **Total** | **100%** | **78** | |

---

## 11. LISTA DE ADRs PENDENTES

| ADR | Título | Fase | Bloqueia |
|---|---|---|---|
| ADR-009 | Remover SignalContext e ActivationContext como contextos formais | 0 | — |
| ADR-010 | Unificar Patrimônio Cognitivo (Evidencia + Hipotese + ConhecimentoValidado + MemoriaCognitiva) | 1 | Fase 2 |
| ADR-011 | Implementar Event Bus formal | 2 | Fase 4 |
| ADR-012 | Catálogo formal de eventos de negócio (nomenclatura semântica) | 2 | Fase 6 |
| ADR-013 | Ciclo Cognitivo contínuo com encadeamento de eventos | 1 | Fase 2 |
| ADR-014 | (futura) Política de cache do Cognitive OS | 4 | — |

---

## 12. RESUMO DOS PROBLEMAS POR GRAVIDADE

```
CRÍTICA (deve corrigir antes de escalar)
──────────────────────────────────────────
P2  Fragmentação do Patrimônio Cognitivo em 5 agregados
P7  Ciclo cognitivo incompleto (Observação → ... → Aprendizado não fecha)
P8  Domínio acoplado ao Prisma
P11 N+1 scaling pattern em rotinas críticas

ALTA (deve corrigir na V1.0)
─────────────────────────────
P1  3 Bounded Contexts falsos (técnicos tratados como domínio)
P3  HistoricoSinal e EventoAtivacao como agregados
P4  9/22 eventos são CRUD
P9  CognitiveOrchestrator é God Class
P10 Experience Engine no lugar errado
P12 Zero cache

MÉDIA (corrigir quando conveniente)
────────────────────────────────────
P5  Nomenclatura técnica nos sinais (já aceito pelo ADR-001)
P6  63% dos invariantes são técnicos
```

> Este documento é uma auditoria arquitetural executiva. Nenhuma alteração no código ou documentação existente foi feita. As ações propostas (ADRs, refatorações, congelamentos) devem ser decididas pelo fundador antes de qualquer implementação.
