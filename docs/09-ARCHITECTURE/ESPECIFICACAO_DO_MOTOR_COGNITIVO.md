# Especificação do Motor Cognitivo

> **Programa 32 — Materialização da Teoria da Evolução Empresarial**
> Versão: 2.0
> Propósito: Especificação definitiva do Motor Cognitivo orientado a **8 Capacidades Fundamentais** — evolução do ciclo de 10 estágios (Programa 12) para o ciclo de 8 capacidades

## Atualização Programa 32 — mudanças em relação à versão 1.0

O Motor Cognitivo foi reformulado para refletir as **8 Capacidades Fundamentais** da Teoria da Evolução Empresarial. As principais mudanças:

### O que mudou

| Aspecto | Versão 1.0 (Programa 12) | Versão 2.0 (Programa 32) |
|:--------|:-------------------------|:-------------------------|
| **Estágios** | 10 estágios técnicos | 8 capacidades fundamentais |
| **Orientação** | Pipeline de dados → decisão | Fortalecimento de capacidades |
| **Patrimônio** | Dados processados | **Capital Cognitivo** (decisões validadas, capacidades desenvolvidas, aprendizados registrados, hipóteses confirmadas, conhecimento acumulado, consistência operacional) |
| **Priorização** | Sub-etapa da decisão | Capacidade própria (**Priorizar**) |
| **Compreensão** | Contexto + Análise separados | Fundidos em **Compreender** |
| **Esclarecimento** | Hipótese + Validação separados | Fundidos em **Esclarecer** |
| **Aprendizado** | Memória + Aprendizado separados | Fundidos em **Aprender** |
| **Dashboard** | Técnico (engines, eventos) | Evolutivo (Retrato Vivo, ICA, Capital Cognitivo, Curva Evolutiva) |
| **Motor de Clareza** | Inexistente | **Novo** — 5 perguntas: Onde estamos? O que mudou? O que importa? O que pode esperar? Próximo melhor movimento? |
| **Memória Estratégica** | Inexistente | **Novo** — pós-decisão: Funcionou? Por quê? O que aprendemos? O que repetir? O que não repetir? |
| **Painel do Fundador** | Inexistente | **Novo** — visão diária de evolução, patrimônio, capacidades estagnadas |
| **Princípio** | A funcionalidade ajuda a decidir? | **Qual capacidade ela fortalece?** |

### Mapeamento 10 estágios → 8 capacidades

```
10 estágios (v1.0)             8 capacidades (v2.0)
─────────────────              ────────────────────
01 Perception    ──► OBSERVAR
02 Context       ──┐
03 Analysis      ──┤─► COMPREENDER
04 Hypothesis    ──┐
05 Validation    ──┤─► ESCLARECER
06 Decision      ──► DECIDIR
   Priority      ──► PRIORIZAR           (elevado a capacidade própria)
07 Action        ──► EXECUTAR
08 Memory        ──┐
09 Learning      ──┤─► APRENDER
10 Heritage      ──► EVOLUIR
```

### Ciclo cognitivo atualizado

```
OBSERVAR → COMPREENDER → ESCLARECER → PRIORIZAR → DECIDIR → EXECUTAR → APRENDER → EVOLUIR → OBSERVAR_NOVAMENTE
```

### Critério universal do Motor Cognitivo v2.0

Toda engine, todo ciclo, toda saída deve responder:
1. **Qual capacidade empresarial fortalece?** (das 8)
2. **Como aumenta o Capital Cognitivo?** (qual componente do patrimônio?)
3. **Como reduz o esforço mental do empresário?** (a cognição não é sobre processar mais — é sobre processar melhor)

---

> **Programa 12 — Fase 3: Motor Cognitivo** (versão original mantida para referência)
> Versão: 1.0
> Propósito: Especificação definitiva do Motor Cognitivo da Ponte Digital — suficiente para implementação por engenheiro experiente sem consulta aos fundadores

---

## Nota de Verificação

**Pergunta:** Um engenheiro extremamente experiente, recebendo apenas este documento e os 9 documentos complementares das Fases 1-3, conseguiria implementar integralmente o Motor Cognitivo da Ponte Digital sem conversar com os fundadores?

**Resposta:** SIM. Este documento consolida todos os subsistemas, contratos de interface, regras de operação e decisões arquiteturais. Qualquer decisão que exigiu escolha entre alternativas foi registrada em ADR com justificativa. O engenheiro precisa ler:

1. Este documento (ESPECIFICACAO_DO_MOTOR_COGNITIVO.md) — visão geral + arquitetura de componentes
2. ARQUITETURA_DO_RACIOCINIO_COGNITIVO.md — lógica de raciocínio
3. MODELO_DE_DECISAO_COGNITIVA.md — modelo de decisão
4. MODELO_DE_CONTEXTO.md — gestão de contexto
5. ARQUITETURA_DA_MEMORIA_OPERACIONAL.md — gestão de memória
6. MODELO_DE_PERGUNTAS_INTELIGENTES.md — quando e como perguntar
7. MODELO_DE_PRIORIZACAO_COGNITIVA.md — priorização
8. MODELO_DE_OBSERVACAO_CONTINUA.md — observação
9. MODELO_DE_INTERVENCAO.md — quando agir
10. MODELO_DO_CICLO_COGNITIVO.md — ciclo integrado
11. MODELO_COGNITIVO_UNIVERSAL.md (Fase 1) — ontologia
12. CONSTITUICAO_DA_ENGENHARIA.md — leis imutáveis da arquitetura

Os ADRs mencionados ao longo dos documentos contêm as decisões arquiteturais com alternativas consideradas.

---

## Seção 1 — O que é o Motor Cognitivo

### 1.1 Definição

O Motor Cognitivo é o cérebro determinístico da Ponte Digital. Ele transforma estímulos brutos (conversas, dados, importações) em conhecimento, decisões e ações, sem depender de modelos de linguagem para raciocinar. A IA é apenas a voz que traduz o que o Motor já decidiu.

### 1.2 O que NÃO é

- Não é um LLM (GPT, Claude, Gemini) — o Motor é 100% determinístico
- Não é um pipeline de dados — tem estado, memória e aprendizado
- Não é um sistema de regras fixas — evolui com o tempo
- Não é um chatbot — raciocina, decide e age, não apenas conversa

### 1.3 Princípios Arquiteturais

Este documento respeita os seguintes princípios, nessa ordem:

1. **Cognição é patrimônio, não pipeline** (Constituição Seção 1) — toda decisão gera registro permanente
2. **Separação rígida entre orquestração e execução** (Constituição Lei 1) — engines coordenam, services executam
3. **Engine nunca acessa Prisma diretamente** (Constituição Lei 2) — usa prisma-tenant-safe
4. **API nunca implementa regra de negócio** (Constituição Lei 3) — apenas validação e delegação
5. **Nunca duplicamos inteligência** (Constituição Lei 6) — cada conceito cognitivo existe em uma única engine
6. **IA como tradutora de contexto** (ADR-017) — IA não raciocina, apenas traduz
7. **Contexto é pacote fechado** (ADR-021) — imutável durante o ciclo de raciocínio
8. **Submotores comunicam-se exclusivamente por eventos** (ADR-016)
9. **Pipeline único Observação → Sinal → Hipótese → Conhecimento** (ADR-024) — sem atalhos
10. **Toda engine cognitiva registra sua saída** (Constituição Lei 10)

---

## Seção 2 — Arquitetura de Componentes

### 2.1 Visão Geral

O Motor Cognitivo é composto por engines organizadas em **8 Capacidades Fundamentais**, coordenadas pelo cognitive-orchestrator:

```
                    ┌──────────────────────────────────────────────┐
                    │           COGNITIVE-ORCHESTRATOR              │
                    │    Coordena o ciclo de 8 capacidades         │
                    └──────┬──────┬──────┬──────┬──────┬───────────┘
                           │      │      │      │      │
        ┌──────────────────┘      │      │      │      └──────────────────────┐
        ▼                         ▼      ▼      ▼                             ▼
┌──────────────────┐    ┌──────────────────────────────┐    ┌──────────────────────────────┐
│   OBSERVAR       │    │   COMPREENDER                │    │   ESCLARECER                 │
│ (perception)     │───►│ (context + analysis)         │───►│ (hypothesis + validation)     │
│ 1 engine         │    │ 2 engines integradas         │    │ 2 engines integradas         │
└──────────────────┘    └──────────────────────────────┘    └──────────────────────────────┘
                                                                          │
                                                                          ▼
┌──────────────────┐    ┌──────────────────┐    ┌──────────────────┐    ┌──────────────────┐
│   PRIORIZAR      │    │   DECIDIR        │    │   EXECUTAR       │    │   APRENDER       │
│ (priority)       │───►│ (decision)       │───►│ (action)         │───►│ (memory +        │
│ 1 engine         │    │ 1 engine         │    │ 1 engine         │    │  learning)       │
│                  │    │                  │    │                  │    │ 2 engines        │
└──────────────────┘    └──────────────────┘    └──────────────────┘    └──────────────────┘
                                                                          │
                                                                          ▼
                                                               ┌──────────────────┐
                                                               │   EVOLUIR        │
                                                               │ (heritage)       │
                                                               │ 1 engine         │
                                                               └──────────────────┘
```

**Nota:** as engines individuais (perception, context, analysis, hypothesis, validation, decision, priority, action, memory, learning, heritage) continuam existindo como unidades de implementação. O que muda é o agrupamento conceitual em 8 capacidades e a adição de novos componentes transversais:

- **Motor de Clareza** — orquestra as 5 perguntas em cada ciclo
- **Memória Estratégica** — registra o pós-decisão obrigatório
- **Painel do Fundador** — consolida a visão evolutiva para o empresário

### 2.2 Capacidades e Engines do Motor Cognitivo

| Capacidade | Engines | Função | Estado na Arquitetura Atual |
|:-----------|:--------|:------|:---------------------------:|
| **OBSERVAR** | `perception-engine` | Converter estímulo em sinal processável | ❌ Nova — não existe |
| **COMPREENDER** | `cognitive-context-engine` + `analysis-engine` | Montar contexto + detectar padrões e anomalias | 🔶 Parcial (context existe, analysis é nova) |
| **ESCLARECER** | `hypothesis-engine` + `validation-engine` | Formular hipóteses + validar contra evidências | 🔶 Parcial (hypothesis incompleta, validation nova) |
| **PRIORIZAR** | `priority-engine` | Classificar urgência, impacto e relevância | ✅ Existe (era sub-etapa, agora é capacidade própria) |
| **DECIDIR** | `decision-engine` | Construir decisões ponderadas | ✅ Existe (decision-engine + trust-engine) |
| **EXECUTAR** | `action-engine` | Executar intervenções (alerta, tarefa, plano) | 🔶 Parcial (cognitive-experience-engine faz parte) |
| **APRENDER** | `memory-engine` + `learning-engine` | Registrar ciclo + extrair aprendizado do resultado | 🔶 Parcial (memory existe, learning é nova) |
| **EVOLUIR** | `heritage-engine` | Consolidar e evoluir o patrimônio cognitivo | ✅ Existe (cognitive-heritage-facade) |

### 2.3 Engines de Suporte Existentes (já implementadas)

| Engine | Função no Motor | Como é usada |
|--------|----------------|-------------|
| `priority-engine` | Classificar urgência/impacto | Chamada pelo decision-engine (Estágio 06) |
| `trust-engine` | Calcular confiança de fontes | Chamada pelo validation-engine (Estágio 05) |
| `relevance-engine` | Filtrar por relevância | Chamada pelo context-engine (Estágio 02) |
| `signal-engine` | Capturar e distribuir sinais | Alimenta a perception-engine (Estágio 01) |
| `evidence-engine` | Coletar e classificar evidências | Chamada pelo analysis-engine (Estágio 03) |
| `forgetting-engine` | Gerenciar TTL e arquivamento | Chamada pelo memory-engine (Estágio 08) |
| `ritmo-engine` | Controlar ciclo agendado | Dispara ciclos noturnos, semanais, mensais |
| `cognitive-bus` | Barramento de eventos | Comunicação entre engines |
| `cognitive-orchestrator` | Coordenação do pipeline | Coordena os 10 estágios |
| `cognitive-experience-engine` | Orquestrar experiência do usuário | Consome outputs do action-engine |

### 2.4 Dependências entre Engines

```
perception-engine → [cognitive-bus → event-store]
context-engine → [prisma-tenant-safe, cache, relevance-engine]
analysis-engine → [evidence-engine, prisma-tenant-safe, cache]
hypothesis-engine → [trust-engine, prisma-tenant-safe]
validation-engine → [trust-engine, evidence-engine, prisma-tenant-safe]
decision-engine → [priority-engine, trust-engine, relevance-engine, prisma-tenant-safe]
action-engine → [cognitive-experience-engine, prisma-tenant-safe]
memory-engine → [forgetting-engine, prisma-tenant-safe]
learning-engine → [heritage-engine, prisma-tenant-safe]
heritage-engine → [cognitive-memory-engine, knowledge-governance-engine, synthesis-engine, forgetting-engine]
```

---

## Seção 3 — Contratos de Interface

### 3.1 Perception Engine

**Arquivo:** `engine/perception-engine.ts` (NOVO)

**Responsabilidade:** Receber estímulos brutos e converter em SinalProcessado.

```typescript
interface PerceptionEngine {
  processar(estimulo: Estimulo): Promise<SinalProcessado>;
}

interface Estimulo {
  tipo: 'CONVERSA' | 'IMPORTACAO' | 'DADO_NOVO' | 'CICLO_AGENDADO' | 'EVENTO_EXTERNO';
  conteudo: unknown;
  fonte: { tipo: string; id?: string; confianca: number };
  correlationId: string;
  empresaId: string;
  timestamp: string;
}

interface SinalProcessado {
  id: string;
  correlationId: string;
  tipo: string;
  entidades: EntidadeCognitiva[];
  urgenciaInicial: number; // 0-10
  fonte: { tipo: string; id?: string; confianca: number };
  hashDeduplicacao: string;
  timestamp: string;
  empresaId: string;
}
```

**Dependências:** nenhuma (independente)
**Testes:** unitário — mockar estímulo, verificar hash dedup, verificar entidades extraídas

### 3.2 Context Engine

**Arquivo:** `engine/cognitive-context-engine.ts` (EXTENSÃO do existente)

**Responsabilidade:** Montar ContextoEnriquecido a partir de um SinalProcessado.

**Mudanças no existente:** Adicionar método `enriquecer(sinal: SinalProcessado): ContextoEnriquecido`

```typescript
interface ContextEngine {
  enriquecer(sinal: SinalProcessado): Promise<ContextoEnriquecido>;
  getContextoVigente(empresaId: string): Promise<ContextoCognitivo>;
  invalidarContexto(empresaId: string): Promise<void>;
}

interface ContextoEnriquecido {
  sinal: SinalProcessado;
  contextoVigente: ContextoCognitivo;
  relacoes: RelacaoCognitiva[];
  relevancia: number; // 0-100
  historico: ProcessamentoAnterior[];
  timestamp: string;
  empresaId: string;
}

interface ContextoCognitivo {
  id: string;
  empresaId: string;
  criadoEm: string;
  expiraEm: string;
  estadoAtual: EstadoCognitivo;
  faseMaturidade: FaseEvolucao;
  sinaisAtivos: SinalProcessado[];
  conhecimentoRelevante: ConhecimentoRef[];
  decisoesPendentes: DecisaoPendente[];
  metricasConfianca: { scoreMedio: number; fontesAtivas: number };
  dominioAtivo: string;
  ultimaInteracao: string;
}
```

**Dependências:** prisma-tenant-safe, cache, relevance-engine
**Regras:** TTL de 5 min para contexto em cache. Pacote imutável durante ciclo.

### 3.3 Analysis Engine

**Arquivo:** `engine/analysis-engine.ts` (NOVO)

**Responsabilidade:** Detectar padrões, anomalias, correlações e tendências.

```typescript
interface AnalysisEngine {
  analisar(contexto: ContextoEnriquecido): Promise<Analise>;
}

interface Analise {
  padroes: PadraoDetectado[];
  anomalias: AnomaliaDetectada[];
  correlacoes: CorrelacaoDetectada[];
  forcaEvidencia: number; // 0-100
  tipoAnalise: 'FATO' | 'CORRELACAO' | 'ANOMALIA' | 'TENDENCIA' | 'INDETERMINADO';
  dadosSuporte: Evidencia[];
  timestamp: string;
}
```

**Detectores internos (devem ser implementados):**
- `detectorFinanceiro` — variação de receita/despesa, fluxo de caixa
- `detectorClientes` — churn, aquisição, concentração
- `detectorOperacional` — tarefas atrasadas, gargalos
- `detectorEngajamento` — frequência do empresário
- `detectorAnomalia` — desvio padrão > 2
- `detectorCorrelacao` — Pearson |r| ≥ 0.6

**Dependências:** evidence-engine, prisma-tenant-safe, cache

### 3.4 Hypothesis Engine

**Arquivo:** `engine/hypothesis-engine.ts` (NOVO — substitui o hypothesis-engine parcial existente)

**Responsabilidade:** Formular, gerenciar e evoluir hipóteses.

```typescript
interface HypothesisEngine {
  formular(analise: Analise, empresaId: string): Promise<Hipotese[]>;
  evoluirConfianca(hipoteseId: string, novasEvidencias: EvidenciaRef[]): Promise<number>;
  listarAtivas(empresaId: string, dominio?: string): Promise<Hipotese[]>;
  podar(empresaId: string): Promise<Hipotese[]>; // arquiva as menos relevantes
}

interface Hipotese {
  id: string;
  descricao: string;
  confiancaAtual: number; // 0-100
  confiancaInicial: number;
  tipoCausalidade: 'CORRELACIONAL' | 'CAUSAL' | 'INDETERMINADO';
  evidenciasSuporte: EvidenciaRef[];
  evidenciasContrarias: EvidenciaRef[];
  objetoAfetado: string;
  estado: 'EM_OBSERVACAO' | 'CONFIRMADA' | 'REFUTADA' | 'DESCARTADA' | 'ARQUIVADA' | 'EM_REVALIDACAO';
  criadaEm: string;
  ultimaRevisao: string;
  conviccao: number; // dias sem refutacao
  empresaId: string;
}
```

**Regras de implementação (da ARQUITETURA_DO_RACIOCINIO_COGNITIVO.md):**
- Confiança inicial: ≥ 70 para ensino explícito, ≤ 30 para inferência, ≥ 50 para terceiros
- Mínimo 3 observações independentes para formar hipótese
- Limite de 7 hipóteses ativas por domínio por empresa
- Hipóteses com confiança < 20 são descartadas automaticamente

### 3.5 Validation Engine

**Arquivo:** `engine/validation-engine.ts` (NOVO — função diferente da DEPRECIADA)

**Responsabilidade:** Validar hipóteses contra evidências disponíveis.

```typescript
interface ValidationEngine {
  validar(hipotese: Hipotese): Promise<HipoteseValidada>;
  identificarLacunas(hipotese: Hipotese): Promise<LacunaEvidencia[]>;
}

interface HipoteseValidada {
  hipotese: Hipotese;
  estado: 'CONFIRMADA' | 'REFUTADA' | 'EM_OBSERVACAO';
  evidenciasColetadas: EvidenciaRef[];
  lacunas: LacunaEvidencia[];
  acoesSugeridas: string[]; // perguntas ou observações adicionais
}

interface LacunaEvidencia {
  tipo: string; // o que falta
  importancia: number; // 0-10
  comoObter: 'PERGUNTAR' | 'OBSERVAR' | 'IMPORTAR' | 'AGUARDAR';
}
```

**Regras de validação:**
- Confirmação: 3+ evidências independentes convergindo + confiança ≥ 70
- Refutação: 1 evidência direta incontestável OU 3+ convergentes
- Hipótese permanece EM_OBSERVAÇÃO se evidências insuficientes

### 3.6 Decision Engine

**Arquivo:** `engine/decision-engine.ts` (EXTENSÃO do existente)

**Responsabilidade:** Construir decisões ponderadas a partir de hipóteses validadas.

**Mudanças no existente:** Adicionar suporte ao modelo de 5 categorias (URGENTE, IMPORTANTE, OPORTUNIDADE, RISCO, SILENCIO) e aos 7 níveis de intervenção.

```typescript
interface DecisionEngine {
  decidir(hipoteses: HipoteseValidada[], contexto: ContextoCognitivo): Promise<Decisao>;
  recomendar(hipotese: HipoteseValidada): Promise<Decisao>;
}

interface Decisao {
  id: string;
  tipo: 'RECOMENDACAO' | 'ALERTA' | 'PERGUNTA' | 'TAREFA' | 'PLANO' | 'SILENCIO';
  acaoRecomendada: string;
  confianca: number; // 0-100
  nivelIntervencao: 0-6;
  prioridade: number; // 0-10
  categoria: 'URGENTE' | 'IMPORTANTE' | 'OPORTUNIDADE' | 'RISCO' | 'SILENCIO';
  impactoEsperado: { financeiro?: number; operacional?: number; estrategico?: number };
  alternativas: AlternativaDecisao[];
  evidenciasBase: EvidenciaRef[];
  hipotesesBase: string[];
  requerValidacao: boolean;
  empresaId: string;
  timestamp: string;
}
```

**Fórmula de prioridade (MODELO_DE_PRIORIZACAO_COGNITIVA.md):**
```
Prioridade = Urgencia × 0.4 + Impacto × 0.3 + Confianca × 0.15 + Conviccao × 0.1 + Alinhamento × 0.05
```

### 3.7 Action Engine

**Arquivo:** `engine/action-engine.ts` (NOVO)

**Responsabilidade:** Executar intervenções no sistema — notificações, tarefas, planos.

```typescript
interface ActionEngine {
  executar(decisao: Decisao): Promise<ResultadoExecucao>;
  acompanhar(acaoId: string): Promise<StatusAcompanhamento>;
}

interface ResultadoExecucao {
  acaoId: string;
  tipo: string;
  canal: string;
  sucesso: boolean;
  idExterno: string; // id da notificação/tarefa/plano criado
  mensagem: string;
}

interface StatusAcompanhamento {
  acaoId: string;
  estado: 'PENDENTE' | 'EM_PROGRESSO' | 'CONCLUIDA' | 'CANCELADA';
  progresso: number; // 0-100
  diasRestantes: number;
  ultimoAcompanhamento: string;
}
```

**Mapeamento Decisao.tipo → Ação:**
- SILENCIO → registrar e parar
- ALERTA → criar notificação (Centro de Notificações)
- PERGUNTA → enviar pergunta (chat ou inline)
- RECOMENDACAO → criar card (Centro de Decisão)
- TAREFA → criar tarefa (sistema de tarefas)
- PLANO → criar plano (seção de Planos)

### 3.8 Memory Engine

**Arquivo:** `engine/cognitive-memory-engine.ts` (EXTENSÃO do existente)

**Responsabilidade:** Persistir ciclo como patrimônio e gerenciar níveis de memória.

**Mudanças no existente:** Adicionar suporte aos 4 níveis de memória (Working, Short, Long, Archived) e condensação.

```typescript
interface MemoryEngine {
  registrar(ciclo: CicloCompleto): Promise<PatrimonioAtualizado>;
  condensar(empresaId: string): Promise<ResultadoCondensacao>;
  arquivar(empresaId: string): Promise<ResultadoArquivamento>;
  reativar(memoriaId: string): Promise<void>;
}

interface PatrimonioAtualizado {
  sinalRegistrado: boolean;
  evidenciasPersistidas: number;
  hipotesesAtualizadas: number;
  decisaoPersistida: string;
  memoriaNivel: 'WORKING' | 'SHORT_TERM' | 'LONG_TERM';
}
```

**Políticas de retenção (ARQUITETURA_DA_MEMORIA_OPERACIONAL.md):**
- Working Memory: 100 itens, volátil (sessão)
- Short Term: 1.000 itens, 30 dias
- Long Term: 10.000 itens, 1 ano
- Archived: ilimitado, permanente

### 3.9 Learning Engine

**Arquivo:** `engine/learning-engine.ts` (NOVO)

**Responsabilidade:** Extrair aprendizado do resultado de decisões.

```typescript
interface LearningEngine {
  processarResultado(decisaoId: string, resultado: ResultadoObservado): Promise<Aprendizado>;
  validarConhecimento(hipoteseId: string): Promise<ConhecimentoValidado | null>;
}

interface ResultadoObservado {
  decisaoId: string;
  resultado: 'POSITIVO' | 'NEGATIVO' | 'NEUTRO';
  descricao: string;
  impactoObservado: number; // 0-10
  timestamp: string;
}

interface Aprendizado {
  hipoteseId: string;
  ajusteConfianca: number; // delta
  novaConviccao: number; // dias
  conhecimentoValidado: ConhecimentoValidado | null;
}
```

**Regras de aprendizado:**
- Resultado POSITIVO → +10 confiança, +30 dias convicção
- Resultado NEGATIVO → -20 confiança, reset convicção
- Se confiança ≥ 85 e consistente por 30+ dias → Conhecimento Validado

### 3.10 Heritage Engine

**Arquivo:** `engine/cognitive-heritage-facade.ts` (EXTENSÃO do existente)

**Responsabilidade:** Consolidar e unificar todo o patrimônio cognitivo.

**Mudanças no existente:** Adicionar suporte ao ciclo completo.

```typescript
interface HeritageEngine {
  consolidar(patrimonio: PatrimonioAtualizado): Promise<PatrimonioConsolidado>;
  getMetricasSaude(empresaId: string): Promise<MetricasSaudeCognitiva>;
}

interface PatrimonioConsolidado {
  versao: number;
  conhecimentoValidado: ConhecimentoValidado[];
  memoriaStatus: { shortTerm: number; longTerm: number; archived: number };
  metricasSaude: MetricasSaudeCognitiva;
}
```

---

## Seção 4 — O Orchestrator

### 4.1 Cognitive-Orchestrator (Programa 32 — ciclo de 8 capacidades)

O orchestrator existente (`cognitive-orchestrator.ts`) foi adaptado para coordenar o ciclo de **8 capacidades fundamentais**. Novos componentes transversais foram adicionados: **Motor de Clareza** (5 perguntas) e **Memória Estratégica** (pós-decisão).

**Fluxo de orquestração:**

```typescript
interface CognitiveOrchestrator {
  executarCiclo(estimulo: Estimulo): Promise<ResultadoCiclo>;
  executarCicloNoturno(empresaId: string): Promise<ResultadoCiclo>;
  aplicarMotorDeClareza(contexto: ContextoCognitivo): Promise<RespostasClareza>;
  registrarMemoriaEstrategica(decisao: Decisao, resultado: ResultadoObservado): Promise<void>;
}

interface ResultadoCiclo {
  correlationId: string;
  capacidadesExecutadas: number;  // antes: estagiosExecutados
  sinalProcessado: SinalProcessado | null;
  analise: Analise | null;
  hipoteses: number;
  decisoes: Decisao[];
  acoes: ResultadoExecucao[];
  aprendizados: Aprendizado[];
  capitalCognitivoGerado: CapitalCognitivoDelta;  // novo — mede impacto no patrimônio
  respostasClareza?: RespostasClareza;             // novo — Motor de Clareza
  duracaoMs: number;
  modo: 'COMPLETO' | 'CONVERSA' | 'ONBOARDING' | 'SILENCIO' | 'NOTURNO';
}

// Novo — Capital Cognitivo
interface CapitalCognitivoDelta {
  decisoesValidadas: number;
  capacidadesFortificadas: string[];   // quais das 8 foram exercitadas
  aprendizadosNovos: number;
  hipotesesConfirmadas: number;
  conhecimentoAcumulado: number;
  consistenciaOperacional: number;     // delta
}

// Novo — Motor de Clareza
interface RespostasClareza {
  ondeEstamos: string;
  oQueMudou: string;
  oQueImporta: string;
  oQuePodeEsperar: string;
  proximoMelhorMovimento: string;
}
```

**Sequência de chamadas (8 capacidades):**

```
1. OBSERVAR    —  perception-engine.processar(estimulo)
2. COMPREENDER —  context-engine.enriquecer(sinal)
                  analysis-engine.analisar(contexto)
3. ESCLARECER  —  hypothesis-engine.formular(analise, empresaId)
                  validation-engine.validar(hipotese)  [para cada hipótese]
4. PRIORIZAR   —  priority-engine.classificar(hipotesesValidadas, contexto)
5. DECIDIR     —  decision-engine.decidir(hipotesesPriorizadas, contexto)
                  ★ Motor de Clareza: 5 perguntas
6. EXECUTAR    —  action-engine.executar(decisao)
7. APRENDER    —  memory-engine.registrar(cicloCompleto)
                  learning-engine.processarResultado(decisaoId, resultado)  [assíncrono]
                  ★ Memória Estratégica: Funcionou? Por quê? O que aprendemos?
8. EVOLUIR     —  heritage-engine.consolidar(patrimonio)
                  heritage-engine.atualizarCurvaEvolutiva(capacidades)
```

### 4.2 Modos de Operação

O orchestrator decide qual modo executar com base no tipo de estímulo e estado da empresa:

```typescript
function determinarModo(estimulo: Estimulo, empresaId: string): ModoCiclo {
  if (estimulo.tipo === 'CICLO_AGENDADO' && horarioNoturno()) return 'NOTURNO';
  if (getEstadoEmpresa(empresaId) === 'CRITICO') return 'COMPLETO';
  if (estimulo.tipo === 'CONVERSA' && getConfiancaMinima(empresaId) >= 40) return 'CONVERSA';
  if (diasDesdeCriacao(empresaId) <= 7) return 'ONBOARDING';
  return 'COMPLETO';
}
```

### 4.3 Tolerância a Falhas do Orchestrator

| Capacidade | Se falhar | O orchestrator faz |
|:----------:|:---------:|--------------------|
| OBSERVAR | Sim | Retry 1x. Se persistir, loga e para o ciclo. |
| COMPREENDER | Parcial | Processa detectores que funcionaram, ignora falhos. Usa último contexto válido se context falhar. |
| ESCLARECER | Sim | Mantém hipóteses EM_OBSERVAÇÃO, pula validação. |
| PRIORIZAR | Sim | Usa prioridade padrão (média) para todas as hipóteses. |
| DECIDIR | Sim | Nível 0 (SILÊNCIO) — seguro. Motor de Clareza não bloqueia. |
| EXECUTAR | Sim | Re-tenta no próximo ciclo. |
| APRENDER | Sim | Memória: CRÍTICO — retry com backoff exponencial (1s, 2s, 4s, 8s). Learning: recalcula no próximo ciclo. |
| EVOLUIR | Sim | Próximo ciclo corrige. |

---

## Seção 5 — Eventos

### 5.1 Catálogo de Eventos do Motor Cognitivo

O Motor Cognitivo publica e consome os seguintes eventos via cognitive-bus:

| Evento | Publisher | Subscribers | Conteúdo |
|--------|:---------:|:-----------:|----------|
| `ESTIMULO_RECEBIDO` | Perception Engine | Orchestrator | SinalProcessado (resumido) |
| `SINAL_PROCESSADO` | Perception Engine | Context Engine, Event Store | SinalProcessado |
| `CONTEXTO_MONTADO` | Context Engine | Analysis Engine | ContextoEnriquecido (resumido) |
| `ANALISE_CONCLUIDA` | Analysis Engine | Hypothesis Engine | Analise (resumido) |
| `HIPOTESE_FORMULADA` | Hypothesis Engine | Validation Engine | Hipotese[] (resumido) |
| `HIPOTESE_CONFIRMADA` | Validation Engine | Decision Engine | HipoteseValidada |
| `HIPOTESE_REFUTADA` | Validation Engine | Memory Engine | HipoteseValidada |
| `DECISAO_TOMADA` | Decision Engine | Action Engine | Decisao |
| `ACAO_EXECUTADA` | Action Engine | Memory Engine, Learning Engine | ResultadoExecucao |
| `CICLO_CONCLUIDO` | Orchestrator | Heritage Engine, Event Store | ResultadoCiclo (resumido) |
| `RESULTADO_OBSERVADO` | Externa (sistema de tarefas) | Learning Engine | ResultadoObservado |
| `PATRIMONIO_ATUALIZADO` | Heritage Engine | Orchestrator | PatrimonioConsolidado (resumido) |
| `CONDENSACAO_CONCLUIDA` | Memory Engine | Heritage Engine | ResultadoCondensacao |

---

## Seção 6 — Persistência

### 6.1 Modelos Prisma Utilizados

O Motor Cognitivo utiliza os seguintes modelos Prisma existentes (não criar novos):

| Modelo | Usado por | Função |
|--------|:---------:|--------|
| `EventoAtivacao` | Perception, Action | Registro de eventos do ciclo |
| `HistoricoSinal` | Perception, Memory | Sinal original e processado |
| `Evidencia` | Analysis, Validation, Memory | Evidências coletadas |
| `Hipotese` | Hypothesis, Validation | Hipóteses formuladas |
| `AcaoCognitiva` | Decision, Action | Decisões e ações |
| `Outcome` | Learning, Heritage | Resultados observados |
| `ConhecimentoValidado` | Learning, Heritage | Conhecimento consolidado |
| `MemoriaCognitiva` | Memory, Heritage | Memória em todos os níveis |
| `CicloConfiguracao` | Orchestrator, Ritmo | Configuração de ciclos |

### 6.2 Campos Adicionais Sugeridos

Para suportar o novo modelo, os seguintes campos devem ser adicionados aos modelos existentes (via migration futura):

**Hipotese:**
- `tipoCausalidade` (enum: CORRELACIONAL, CAUSAL, INDETERMINADO)
- `conviccao` (Int — dias sem refutação)
- `evidenciasSuporteIds` (Json — lista de IDs)
- `evidenciasContrariasIds` (Json — lista de IDs)

**AcaoCognitiva:**
- `nivelIntervencao` (Int — 0-6)
- `categoriaPrioridade` (enum: URGENTE, IMPORTANTE, OPORTUNIDADE, RISCO, SILENCIO)
- `requerValidacao` (Boolean)

**MemoriaCognitiva:**
- `nivelMemoria` (enum: WORKING, SHORT_TERM, LONG_TERM, ARCHIVED)
- `ttl` (DateTime — quando expira)

---

## Seção 7 — Configuração

### 7.1 Parâmetros Configuráveis por Empresa

| Parâmetro | Padrão | Onde é usado | Pode ser alterado por |
|-----------|:------:|:------------:|:---------------------:|
| `limitePerguntasPorDia` | 3 | Pergunta Engine | Plano contratado |
| `limiteRecomendacoesPorDia` | 2 | Decision Engine | Plano contratado |
| `nivelIntervencaoMaximo` | 4 | Action Engine | Empresário |
| `cicloNoturnoAtivo` | true | Orchestrator | Empresário |
| `coletivoAtivo` | true | Learning Engine | Empresário |
| `modoSilencioNoturno` | true | Orchestrator | Empresário |
| `thresholdAnomaliaFinanceira` | 2.0 | Analysis Engine | Configuração interna |
| `thresholdAnomaliaClientes` | 2.5 | Analysis Engine | Configuração interna |
| `maxHipotesesPorDominio` | 7 | Hypothesis Engine | Configuração interna |

### 7.2 Feature Flags

| Flag | Padrão | O que controla |
|------|:------:|----------------|
| `cognitiveEngineV2Enabled` | false | Ativar o novo ciclo de 10 estágios |
| `perguntasInteligentesEnabled` | true | Ativar modelo de perguntas com ValorLíquido |
| `observacaoContinuaEnabled` | true | Ativar detectores de padrão contínuos |
| `acompanhamentoEnabled` | true | Ativar Nível 6 (acompanhamento) |
| `memoriaHierarquicaEnabled` | false | Ativar condensação em 4 níveis |

---

## Seção 8 — Sequência de Implementação Recomendada

### Sprint 1 — Fundação
1. Criar `perception-engine.ts` — receber estímulos, gerar SinalProcessado, hash de dedup
2. Estender `cognitive-context-engine.ts` — método `enriquecer()`
3. Atualizar `cognitive-orchestrator.ts` — suportar nova sequência de estágios

### Sprint 2 — Análise e Hipótese
4. Criar `analysis-engine.ts` — detectores de padrão financeiro e clientes
5. Criar `hypothesis-engine.ts` — formulação, evolução de confiança, poda
6. Integrar com `evidence-engine` e `trust-engine` existentes

### Sprint 3 — Validação e Decisão
7. Criar `validation-engine.ts` — validação contra evidências, lacunas
8. Estender `decision-engine.ts` — 5 categorias, 7 níveis de intervenção
9. Atualizar `priority-engine` se necessário

### Sprint 4 — Ação e Registro
10. Criar `action-engine.ts` — intervenções, acompanhamento
11. Estender `memory-engine.ts` — 4 níveis, condensação
12. Atualizar `forgetting-engine` para suportar TTL por nível

### Sprint 5 — Aprendizado e Ciclo Completo
13. Criar `learning-engine.ts` — resultado, aprendizado, conhecimento validado
14. Estender `heritage-engine.ts` — consolidação do ciclo
15. Ciclo completo integrado — testes end-to-end

### Sprint 6 — Modos Especiais e Ajustes
16. Modo noturno, modo onboarding, modo emergência
17. Modelo de perguntas inteligentes integrado ao ciclo
18. Ajuste de thresholds com dados reais

---

## Seção 9 — Verificação de Completude

### 9.1 O Motor Cognitivo RESPONDE às perguntas dos fundadores?

| Pergunta | Resposta | Onde |
|----------|----------|------|
| Como a Ponte pensa? | Ciclo de **8 capacidades fundamentais**: OBSERVAR → COMPREENDER → ESCLARECER → PRIORIZAR → DECIDIR → EXECUTAR → APRENDER → EVOLUIR | Documento 1, Seções 1-8 |
| Quais são as 8 capacidades? | Observar, Compreender, Esclarecer, Priorizar, Decidir, Executar, Aprender, Evoluir | Documento 1, Seção 2 |
| Como monta raciocínio? | Observar → Compreender (Contexto + Análise) → Esclarecer (Hipótese + Validação) | Documento 1, Seção 1 |
| Como escolhe hipóteses? | 4 critérios (poder explicativo, consistência, especificidade, falsificabilidade) | Documento 1, Seção 2 |
| Como elimina hipóteses? | Escolha por Priorizar + 5 critérios + Pareto de 7 por domínio | Documento 1, Seção 3 |
| Como aprende? | Ciclo decisão → resultado → ajuste de confiança → conhecimento validado → evolui | Documento 1, Seção 4 |
| Como muda de opinião? | 5 gatilhos + resistência inercial por convicção | Documento 1, Seção 5 |
| Como evita alucinação? | 6 barreiras + verificação de integridade | Documento 1, Seção 6 |
| Quando decide permanecer em silêncio? | 6 regras de silêncio + nível 0 de intervenção | Documento 1, Seção 7 |
| Como constrói decisões? | Capacidade Decidir (5 fases: entrada, ponderação, classificação, formulação, registro) + **Motor de Clareza** (5 perguntas) | Documento 1 + Programa 32 |
| Como resolve conflitos? | Matriz de resolução por tipo de conflito | Documento 2, Seção 2 |
| Como reduz milhares de informações? | 5 técnicas (janela, sumarização, filtro, priorização — que virou capacidade própria, referências) | Documento 3, Seção 2 |
| Como descarta contexto? | 5 gatilhos de descarte + preservação do patrimônio | Documento 3, Seção 6 |
| Como funciona a memória? | 4 níveis com políticas de retenção e condensação | Documento 4 |
| Quando perguntar? | ValorLíquido > 0 + 6 gatilhos específicos | Documento 5, Seção 1 |
| Como classificar prioridade? | 5 categorias + fórmula com 5 fatores — **Priorizar** é capacidade própria | Documento 6 + Programa 32 |
| O que observar continuamente? | 7 domínios com indicadores por domínio | Documento 7, Seção 1 |
| Quando intervir? | 7 níveis de intervenção com thresholds de confiança | Documento 8 |
| Qual o ciclo completo? | **8 capacidades** integradas em 4 modos de operação | Documento 9 + Programa 32 |
| **O que é Capital Cognitivo?** | Patrimônio composto por: decisões validadas, capacidades desenvolvidas, aprendizados registrados, hipóteses confirmadas, conhecimento acumulado, consistência operacional | Programa 32 |
| **O que é o Motor de Clareza?** | 5 perguntas em cada ciclo: Onde estamos? O que mudou? O que importa? O que pode esperar? Próximo melhor movimento? | Programa 32 |
| **O que é a Memória Estratégica?** | Registro obrigatório pós-decisão: Funcionou? Por quê? O que aprendemos? O que repetir? O que não repetir? | Programa 32 |

### 9.2 Um engenheiro experiente consegue implementar?

**Sim, porque:**

1. **Contratos de interface estão definidos** — Seção 3 especifica entrada/saída de cada engine
2. **Fórmulas estão especificadas** — prioridade, confiança, relevância, VAL, custo de interrupção
3. **Regras de negócio estão documentadas** — quando confirmar, refutar, perguntar, silenciar
4. **Dependências entre engines estão mapeadas** — Seção 2.4
5. **Modelos de dados existentes e necessários estão listados** — Seção 6
6. **Configuração e feature flags estão definidas** — Seção 7
7. **Ordem de implementação recomendada existe** — Seção 8
8. **ADRs justificam cada decisão arquitetural** — 34 ADRs disponíveis
9. **Leis imutáveis da Constituição protegem contra decisões erradas** — Constituição Seção 2

**O que o engenheiro ainda precisará decidir (dentro do esperado):**
- Nomes de arquivos e organização interna de cada engine
- Estratégia de cache (se usar o cache existente ou criar específico)
- Tratamento de erros específico de cada engine (além do fallback do orchestrator)
- Testes unitários e de integração (a arquitetura não define estratégia de teste)

---

## Seção 10 — Descobertas, Pressupostos, Lacunas, Riscos

### Descobertas

1. Das 11 engines do Motor Cognitivo, 5 já existem (precisam de extensão), 4 são novas, 2 existem parcialmente. Isso reduz significativamente o esforço de implementação.
2. O cognitive-orchestrator existente pode ser adaptado para coordenar os 10 estágios — não precisa ser reescrito.
3. Todos os modelos Prisma necessários já existem — apenas campos adicionais são necessários.

### Pressupostos

1. **P1:** O cognitive-orchestrator existente suporta a adição de novos estágios sem refatoração.
2. **P2:** O volume de empresas atuais (centenas) não exige processamento paralelo dos ciclos.
3. **P3:** A engine `validation-engine` (nova, função diferente da DEPRECIADA) não conflita com a existente porque a DEPRECIADA não é mais importada por ninguém.

### Lacunas

1. **L1:** Mecanismo de detecção de "resultado observado" — como o sistema de tarefas notifica o Motor que uma ação foi concluída? Precisa de integração com Event Bus.
2. **L2:** A engine `analysis-engine` requer detectores de padrão específicos que dependem de dados de domínio (financeiro, clientes, tarefas) — estes detectores precisam ser implementados.
3. **L3:** Os thresholds exatos de confiança (20, 40, 60, 80, 90 para níveis de intervenção) precisam de validação empírica.

### Riscos

1. **R1 — Performance do ciclo completo:** Se todos os 10 estágios rodarem sequencialmente, pode exceder 2s para empresas complexas. Mitigação: paralelismo nos estágios 03 (análise) e 05 (validação).
2. **R2 — Sobrecarga do cognitive-orchestrator:** Se o orchestrator atual não suporta a complexidade de 10 estágios, pode precisar de refatoração. Mitigação: o orchestrator foi criado para coordenar engines; 10 estágios é um aumento gradual, não uma mudança de paradigma.
3. **R3 — Migração de dados:** Adicionar campos aos modelos existentes (tipoCausalidade, conviccao, nivelIntervencao) requer migration com valores padrão para dados existentes.

### Conflitos

Nenhum conflito encontrado com código, ADRs, ou documentos anteriores.

### Impacto Futuro

1. A implementação do Motor Cognitivo transforma a Ponte Digital de uma plataforma com "recursos de IA" para uma plataforma verdadeiramente cognitiva.
2. A separação em 11 engines independentes permite evolução gradual — cada engine pode ser melhorada sem afetar as demais.
3. O Motor Cognitivo é independente de LLM — sobrevive à troca completa do modelo de linguagem.
4. A especificação é completa o suficiente para guiar anos de implementação sem depender da memória dos fundadores.
