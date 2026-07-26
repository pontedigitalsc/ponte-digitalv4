# Blueprint — Cognitive Orchestrator

> **Programa 13 — Blueprint de Implementação**
> Arquivo: `sistema/src/engine/cognitive-orchestrator.ts`
> Dependências: Todas as engines cognitivas, `prisma-tenant-safe`, `cognitive-pipeline-store`, `logger`
> Criticidade: **Crítica**

---

## 1. Responsabilidade

Coordenar a Infraestrutura Cognitiva como um único organismo. Não cria conhecimento. Não interpreta. Não decide. Apenas coordena.

---

## 2. Papel dentro do Sistema Cognitivo

**Onde entra:** Ponto de entrada único para todo processamento cognitivo. Chamado por:
- Server Components (dashboard layout)
- API routes (assistente, conversa, feedback)
- Ritmo Engine (ciclos automáticos)

**Onde termina:** Retorna `EstadoCognitivoCompleto` ou executa ações com side-effects (cadastro, login, feedback, outcome). Não renderiza UI — quem renderiza é o Experience Engine.

---

## 3. Dependências

### Quem chama o Orchestrator

| Quem | Quando | Função chamada |
|------|--------|----------------|
| `app/(dashboard)/layout.tsx` | Toda navegação no dashboard | `obterEstadoCognitivoCompleto()` |
| `app/api/assistente/route.ts` | Chat com IA | `processarConversa()` |
| `app/api/auth/criar-conta/route.ts` | Cadastro | `processarCadastro()` |
| `app/api/experience/login/route.ts` | Pós-login | `processarLogin()` |
| `ritmo-engine.ts` | Ciclo automático | `processarEvento()` |
| `api/historicos/route.ts` | Registro de histórico | `processarEvento()` |
| `event-subscriber.ts` | Eventos assíncronos | `processarEvento()` |

### Quem o Orchestrator chama

| Engine | Função | Quando |
|--------|--------|--------|
| `cognitive-context-engine` | `decidirContexto()` | Pipeline principal |
| `identity-engine` | `construirIdentidade()`, `interpretarRespostas()` | Contexto, cadastro |
| `decision-engine` | `melhorDecisao()` | Pipeline principal |
| `action-intelligence-engine` | `listarAcoesAtivas()`, `criarAcao()` | Pipeline, ações |
| `feedback-intelligence-engine` | `listarFeedbackRecente()`, `registrarFeedback()` | Pipeline, feedback |
| `founder-activation-engine` | `obterJornadaFundador()`, `registrarEventoAtivacao()` | Pipeline, ativação |
| `outcome-intelligence-engine` | `calcularImpactoEmpresa()`, `principaisOutcomes()`, `registrarOutcome()` | Pipeline, outcome |
| `knowledge-governance-engine` | `validarHipoteses()`, `promoverConhecimento()`, `auditarConhecimento()` | Pipeline, auditoria |
| `cognitive-observatory` | `obterResumoCognitivo()`, `obterAlertasGovernanca()` | Pipeline |
| `evidence-engine` | `registrarEvidencia()` | Side-effect |
| `cognitive-memory-engine` | `registrarNaMemoria()` | Side-effect |
| `conversation-engine` | `obterRespostas()`, `vincularConversa()` | Cadastro |
| `event-store` | `criarEventPublisherPersistente()` | Inicialização |

### Quem nunca pode chamar o Orchestrator

- **Services** (`services/`) — Lei 1 da Constituição
- **Libs** (`lib/`) — ciclo de dependência
- **Componentes React** — deve sempre passar pelo Server Component

---

## 4. Contratos

### 4.1 Entradas — Funções Públicas

```typescript
// Pipeline principal (dashboard, ciclos automáticos)
async function obterEstadoCognitivoCompleto(
  empresaId: string,
  correlationId?: string
): Promise<EstadoCognitivoCompleto>

// Processar conversa com IA
async function processarConversa(
  empresaId: string,
  mensagem: string,
  correlationId?: string
): Promise<{ resposta: string }>

// Processar ação do empresário
async function processarAcao(
  empresaId: string,
  acaoId: string,
  correlationId?: string
): Promise<{ sucesso: boolean }>

// Processar feedback
async function processarFeedback(
  empresaId: string,
  acaoId: string,
  tipo: TipoFeedbackAcao,
  correlationId?: string
): Promise<void>

// Processar outcome
async function processarOutcome(
  empresaId: string,
  params: {
    categoria: CategoriaOutcome;
    descricao: string;
    confianca: ConfiancaEvidencia;
    evidenciasIds: string[];
  },
  correlationId?: string
): Promise<void>

// Processar cadastro
async function processarCadastro(
  empresaId: string,
  tokenConversa: string,
  correlationId?: string
): Promise<void>

// Processar login (pós-login)
async function processarLogin(
  empresaId: string,
  correlationId?: string
): Promise<void>

// Processar mudança de empresa
async function processarMudancaEmpresa(
  empresaId: string,
  correlationId?: string
): Promise<void>

// Processar evento genérico
async function processarEvento(
  empresaId: string,
  tipo: string,
  dados: unknown,
  correlationId?: string
): Promise<void>
```

### 4.2 Saídas

```typescript
interface EstadoCognitivoCompleto {
  contexto: DecisaoContexto | null;
  identidade: IdentidadeDigital | null;
  decisao: Decisao | null;
  acoesAtivas: AcaoCognitiva[];
  feedbackRecente: FeedbackAcao[];
  jornada: JornadaFundador;
  impacto: ImpactoEmpresa;
  topOutcomes: Outcome[];
  auditoria: AuditoriaConhecimento | null;
  resumo: ResumoCognitivo | null;
  alertasGovernanca: string[];
}

interface DecisaoContexto {
  prioridade: string;        // CategoriaEvidencia
  motivo: string;
  confianca: number;         // 0-1
  evidenciasChave: Array<{ descricao: string; origem: string; data: Date; confianca: string }>;
  acaoSugerida?: string;
  setoresEstaveis: string[];
  mudancasRecentes: string[];
  tendencia?: string;
  memoriaRecente?: Array<{ tipo: string; descricao: string }>;
}

interface Decisao {
  id: string;
  titulo: string;
  descricao: string;
  prioridade: number;
  categoria: string;
  confianca: number;
}
```

### 4.3 Eventos Publicados

| Evento | Quando | Payload |
|--------|--------|---------|
| `EmpresaCriada` | Cadastro concluído | `{ empresaId, nome }` |
| `ConversaProcessada` | Conversa concluída | `{ empresaId, resumo }` |
| `FeedbackRegistrado` | Feedback registrado | `{ empresaId, acaoId, tipo }` |
| `OutcomeRegistrado` | Outcome registrado | `{ empresaId, categoria, descricao }` |
| `AcaoCognitivaCriada` | Ação criada | `{ empresaId, acaoId }` |
| `CicloCompleto` | Ciclo automático concluído | `{ empresaId }` |

### 4.4 Persistência

**Direta (via side-effect calls):**
- `Evidencia` — via `evidence-engine`
- `MemoriaCognitiva` — via `memory-engine`
- `AcaoCognitiva` — via `action-intelligence-engine`
- `FeedbackAcao` — via `feedback-intelligence-engine`
- `Outcome` — via `outcome-intelligence-engine`
- `Conversa` / `ConversaHistorico` — via `conversation-engine`

**Indireta (via pipeline-store):**
- Registro de ciclo em `cognitive-pipeline-store`

### 4.5 Cache

O Orchestrator não faz cache próprio. Depende do cache da `cognitive-context-engine` (`cache.ts` com TTL de 60s para contexto).

---

## 5. Fluxo Interno

### 5.1 Pipeline Principal (`obterEstadoCognitivoCompleto`)

```
1. Iniciar ciclo (cognitive-pipeline-store)
2. Montar contexto (cognitive-context-engine → decidirContexto)
3. Construir identidade (identity-engine → construirIdentidade)
4. Calcular decisão (decision-engine → melhorDecisao)
5. Listar ações ativas (action-intelligence-engine → listarAcoesAtivas)
6. Listar feedback recente (feedback-intelligence-engine → listarFeedbackRecente)
7. Obter jornada (founder-activation-engine → obterJornadaFundador)
8. Calcular impacto (outcome-intelligence-engine → calcularImpactoEmpresa)
9. Obter top outcomes (outcome-intelligence-engine → principaisOutcomes)
10. Auditar conhecimento (knowledge-governance-engine → auditarConhecimento)
11. Obter resumo cognitivo (cognitive-observatory → obterResumoCognitivo)
12. Obter alertas de governança (cognitive-observatory → obterAlertasGovernanca)
13. Finalizar ciclo (cognitive-pipeline-store)

Cada etapa é envolvida em registrarCicloSeguro — falha não quebra o pipeline.
```

### 5.2 Pipeline de Cadastro (`processarCadastro`)

```
1. Obter respostas da conversa (conversation-engine → obterRespostas)
2. Vincular conversa à empresa (conversation-engine → vincularConversa)
3. Interpretar respostas (identity-engine → interpretarRespostas)
4. Atualizar identidade (identity-engine → atualizarIdentidade)
5. Registrar histórico de conversa (identity-engine → registrarHistoricoConversa)
6. Publicar evento EmpresaCriada (event-store)
```

### 5.3 Pipeline de Feedback (`processarFeedback`)

```
1. Registrar feedback (feedback-intelligence-engine → registrarFeedback)
2. Registrar outcome (outcome-intelligence-engine → registrarOutcome)
3. Validar hipóteses (knowledge-governance-engine → validarHipoteses)
4. Publicar evento FeedbackRegistrado
```

---

## 6. Casos Extremos

| Caso | Comportamento |
|------|--------------|
| **Contexto vazio** | Retorna `contexto: null` — pipeline continua |
| **Identidade não encontrada** | Retorna `identidade: null` — pipeline continua |
| **Falha em engine downstream** | Pipeline registra falha via `registrarCicloSeguro` — não quebra |
| **Falha no ciclo inteiro** | `registrarFalhaCiclo()` é chamada, erro logado, exceção propagada |
| **empresaId inválido** | Prisma retorna erro → `registrarCicloSeguro` captura |
| **Cadastro sem token de conversa** | `obterRespostas` falha → fluxo interrompido |
| **Correlation ID ausente** | Gerado automaticamente via `randomUUID()` |

---

## 7. Critérios de Aceite

O Orchestrator é considerado implementado quando:

1. `obterEstadoCognitivoCompleto(empresaId)` retorna estado completo sem lançar erro
2. `processarCadastro(empresaId, token)` cria identidade + conhecimentos iniciais
3. `processarFeedback(empresaId, acaoId, tipo)` registra feedback + atualiza hipóteses
4. `processarOutcome(empresaId, params)` registra outcome no banco
5. Falha em qualquer engine downstream não quebra o pipeline (graceful degradation)
6. Todas as 10 funções públicas existem e têm os tipos corretos

---

## 8. Critérios de Teste

### Unitário

- `obterEstadoCognitivoCompleto` com contexto mock → retorna estado completo
- `processarFeedback` com feedback válido → registra no banco
- `processarCadastro` com token inválido → lança erro
- Falha simulada em engine downstream → pipeline continua

### Integração

- Pipeline completo com banco real → 13 etapas executadas
- Cadastro → identidade criada + conhecimentos iniciais
- Feedback → hipóteses atualizadas

### Carga

- 100 empresas simultâneas → pipeline não excede 5s
- 1000 ciclos cognitivos → sem deadlock ou memory leak

### Regressão

- Todas as funções públicas mantêm assinatura
- Nenhuma nova dependência de `services/` foi adicionada

---

## 9. Observabilidade

### Logs

| Evento | Nível | Informação |
|--------|-------|------------|
| Início de ciclo | `info` | empresaId, correlationId |
| Etapa executada | `debug` | nome da etapa, duração |
| Falha em etapa | `warn` | nome, erro, empresaId |
| Ciclo completo | `info` | duração total, qtd etapas |
| Cadastro concluído | `info` | empresaId, token |

### Métricas

- `orchestrator.ciclo.duracao_ms` — histograma
- `orchestrator.ciclo.etapas_executadas` — contador
- `orchestrator.ciclo.falhas` — contador por etapa
- `orchestrator.cadastro.concluidos` — contador

### Eventos

- `CicloCompleto` — publicado ao final do pipeline
- `EmpresaCriada` — publicado ao final do cadastro

### Alertas

- **Nenhum ciclo completo em 1h para empresa ativa** — sistema pode estar morto
- **Taxa de falha > 10% nos ciclos** — engine downstream com problema

---

## 10. Evolução Futura

### Pode crescer

- Novos pipelines (ex.: pipeline de importação)
- Novos métodos de processamento (ex.: `processarBatchEmpresas`)
- Cache de estado cognitivo completo (evitar reprocessar tudo)

### Nunca deve mudar

- Assinatura de `obterEstadoCognitivoCompleto` — usado pelo layout do dashboard
- Pipeline nunca chama services (Lei 1)
- Falha de engine downstream nunca quebra o pipeline
- Formato de `EstadoCognitivoCompleto` — consumido pelo Experience Engine
