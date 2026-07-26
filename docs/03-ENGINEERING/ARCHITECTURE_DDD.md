# Arquitetura DDD — Ponte Digital V4 Founder

> Este documento é a especificação formal para implementação. Cada conceito aqui mapeia diretamente para código.
> Respeita exatamente a documentação — não inventa funcionalidades, não simplifica, não altera filosofia.
>
> **Nota sobre nomenclatura (ADR-029 + Glossário Oficial):** Os nomes de agregados, tabelas e repositórios neste documento refletem o código atual. O Glossário Oficial (`ONTOLOGIA_COGNITIVA.md`) depreca alguns destes termos — ex.: `Outcome` → `Resultado`, `HistoricoSinal` → `LogDeEventos`, `EventoAtivacao` → `MarcoDeJornada`. Estas renomeações dependem de implementação de código (ADR-029, Fase 2+). Até lá, este documento mantém os nomes atuais para preservar o mapeamento documentação↔código.

---

## 1. BOUNDED CONTEXTS

### 1.1 Catálogo de Contextos

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│  ECOSSISTEMA PÚBLICO              PLATAFORMA COGNITIVA                      │
│  (gratuito, aberto)               (restrito a Fundadores)                   │
│                                                                             │
│  ┌──────────────────────┐        ┌────────────────────────────────────────┐ │
│  │ DiagnosticContext     │        │  CRMContext                            │ │
│  │ ─────────────────── │        │  ──────────                            │ │
│  │ Primeira Conversa   │        │  Lead → Cliente → Contato              │ │
│  │ Fluxo de Perguntas  │        │  Pipeline / Kanban                     │ │
│  │ Interpretação       │        │  Temperatura / Risco                   │ │
│  └──────────────────────┘        └────────────────────────────────────────┘ │
│                                                                             │
│  ┌──────────────────────┐        ┌────────────────────────────────────────┐ │
│  │ CognitiveIdentityCtx  │        │  FinancialContext                       │ │
│  │ ─────────────────── │        │  ────────────────                       │ │
│  │ IdentidadeDigital   │        │  Receita / Despesa                      │ │
│  │ Perfil Cognitivo    │        │  Categorização                          │ │
│  │ VerdadesEstaveis    │        │  Recorrência                            │ │
│  │ Intepretações       │        │  Fluxo de Caixa                         │ │
│  └──────────────────────┘        └────────────────────────────────────────┘ │
│                                                                             │
│  ┌──────────────────────┐        ┌────────────────────────────────────────┐ │
│  │ KnowledgeContext      │        │  TaskContext                            │ │
│  │ ─────────────────── │        │  ──────────                            │ │
│  │ Evidencia            │        │  Tarefa (ligação, email,               │ │
│  │ Hipotese             │        │  reunião, follow-up, visita)           │ │
│  │ ConhecimentoValidado │        │  Prioridade / Status                   │ │
│  │ MemoriaCognitiva     │        │  Atribuição                            │ │
│  └──────────────────────┘        └────────────────────────────────────────┘ │
│                                                                             │
│  ┌──────────────────────┐        ┌────────────────────────────────────────┐ │
│  │ LearningContext       │        │  OnboardingContext                      │ │
│  │ ─────────────────── │        │  ─────────────────                    │ │
│  │ Aprendizado          │        │  Implantacao                           │ │
│  │ Categorias           │        │  EtapaImplantacao                      │ │
│  │ VALORES/REGRAS/etc   │        │  Acompanhamento                        │ │
│  │ Perguntas Rápidas    │        └────────────────────────────────────────┘ │
│  └──────────────────────┘                                                   │
│                                    ┌────────────────────────────────────────┐
│  ┌──────────────────────┐         │  DecisionContext                        │
│  │ SignalContext         │         │  ────────────────                      │
│  │ ─────────────────── │         │  AcaoCognitiva                           │
│  │ HistoricoSinal       │         │  Decisao (regras simples)               │
│  │ Sinais por domínio   │         │  Priorização                            │
│  │ Urgência             │         └────────────────────────────────────────┘
│  └──────────────────────┘                                                   │
│                                    ┌────────────────────────────────────────┐
│  ┌──────────────────────┐         │  FeedbackContext                        │
│  │ ActivationContext     │         │  ────────────────                      │
│  │ ─────────────────── │         │  FeedbackAcao                            │
│  │ EventoAtivacao       │         │  Outcome                                │
│  │ Nível de Ativação    │         │  Ciclo cognitivo                       │
│  │ Jornada do Fundador  │         └────────────────────────────────────────┘
│  └──────────────────────┘                                                   │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────────┐│
│  │  IAMContext (transversal a ambos)                                       ││
│  │  ─────────────────────────────────────────────────────                  ││
│  │  Empresa / Usuario / Papéis (ADMIN, GESTOR, MEMBRO)                    ││
│  │  Autenticação Supabase / Tenant guard / RLS                            ││
│  └─────────────────────────────────────────────────────────────────────────┘│
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 1.2 Descrição dos Contextos

| Contexto | Domínio | Público | Camada Estratégica |
|---|---|---|---|
| `IAMContext` | Identidade + Acesso | Ambos | Transversal |
| `DiagnosticContext` | Diagnóstico Inteligente | Público | Ecossistema Público |
| `CognitiveIdentityContext` | Perfil Cognitivo | Ambos | Híbrido (criado no público, usado na cognitiva) |
| `KnowledgeContext` | Conhecimento Validado | Cognitiva | Plataforma Cognitiva |
| `LearningContext` | Aprendizados Explícitos | Cognitiva | Plataforma Cognitiva |
| `SignalContext` | Sinais Operacionais | Cognitiva | Plataforma Cognitiva |
| `CRMContext` | Pipeline Comercial | Cognitiva | Plataforma Cognitiva |
| `FinancialContext` | Gestão Financeira | Cognitiva | Plataforma Cognitiva |
| `TaskContext` | Tarefas e Ações | Cognitiva | Plataforma Cognitiva |
| `OnboardingContext` | Implantações | Cognitiva | Plataforma Cognitiva |
| `DecisionContext` | Decisões e Ações Cognitivas | Cognitiva | Plataforma Cognitiva |
| `FeedbackContext` | Feedback e Outcomes | Cognitiva | Plataforma Cognitiva |
| `ActivationContext` | Ativação do Fundador | Cognitiva | Plataforma Cognitiva |

### 1.3 Relações entre Contextos

```
DiagnosticContext ──cria──▶ CognitiveIdentityContext
CognitiveIdentityContext ──alimenta──▶ KnowledgeContext
KnowledgeContext ──valida──▶ DecisionContext
SignalContext ──alimenta──▶ DecisionContext
DecisionContext ──gera──▶ TaskContext (via AcaoCognitiva)
TaskContext ──recebe──▶ FeedbackContext
FeedbackContext ──alimenta──▶ KnowledgeContext (via ciclo cognitivo)
CRMContext ──emite──▶ SignalContext
FinancialContext ──emite──▶ SignalContext
TaskContext ──emite──▶ SignalContext
LearningContext ──alimenta──▶ CognitiveIdentityContext
ActivationContext ──observa──▶ Todos os contextos
CognitiveIdentityContext ──alimenta──▶ Assistente IA
```

---

## 2. AGGREGATES

### 2.1 Aggregate: `Empresa`

**Aggregate Root**: `Empresa`
**Propriedade**: IAMContext
**Tabela**: `Empresa`

```
Empresa {
  id: String
  nome: String
  ativa: Boolean
  planoSlug: String? ("founder", "fundador")
  criadaEm: DateTime
  atualizadaEm: DateTime

  // Value Objects internos:
  ConfiguracaoFinanceira (limiteCategoria, etc.)
}

// Subordinados (parte do aggregate por consistência imediata):
Usuario[] (apenas leitura dentro do aggregate)
ConfiguracaoEmpresa (1:1)
```

**Regras de consistência**: Empresa só pode ser criada com usuário ADMIN. `planoSlug` restrito a valores definidos em `PLANO`.

---

### 2.2 Aggregate: `Usuario`

**Aggregate Root**: `Usuario`
**Propriedade**: IAMContext
**Tabela**: `Usuario`

```
Usuario {
  id: String
  empresaId: String (tenant)
  nome: String
  email: String
  papel: PapelUsuario (ADMIN | GESTOR | MEMBRO)
  ativo: Boolean
  aceitouTermos: Boolean
  ultimoAcesso: DateTime?
  criadoEm: DateTime
}
```

**Regras de consistência**: Cada empresa tem exatamente 1 ADMIN. Um usuário não pode se auto-rebaixar de ADMIN para papel inferior se for o único ADMIN.

---

### 2.3 Aggregate: `Lead`

**Aggregate Root**: `Lead`
**Propriedade**: CRMContext
**Tabela**: `Lead`

```
Lead {
  id: String
  empresaId: String (tenant)
  nome: String
  contato: String?
  origem: String?
  estagio: EstagioLead
  temperatura: TemperaturaLead (FRIA | MORNA | QUENTE)
  proximoContato: DateTime?
  ultimoContato: DateTime?
  deletedAt: DateTime?
  criadoEm: DateTime
  atualizadoEm: DateTime
}

// Nenhuma entidade subordinada — Contato é aggregate separado
```

**Regras de consistência**: Lead só pode ser convertido em Cliente se estiver em estágio `FECHADO`. Conversão é transacional (Lead + Cliente no mesmo evento).

---

### 2.4 Aggregate: `Cliente`

**Aggregate Root**: `Cliente`
**Propriedade**: CRMContext
**Tabela**: `Cliente`

```
Cliente {
  id: String
  empresaId: String (tenant)
  nome: String
  leadId: String? (referência ao Lead original)
  status: StatusCliente
  segmento: String?
  deletedAt: DateTime?
  criadoEm: DateTime
  atualizadoEm: DateTime
}
```

---

### 2.5 Aggregate: `Contato`

**Aggregate Root**: `Contato`
**Propriedade**: CRMContext
**Tabela**: `Contato`

```
Contato {
  id: String
  empresaId: String (tenant)
  clienteId: String?
  nome: String
  cargo: String?
  email: String?
  telefone: String?
  deletedAt: DateTime?
  criadoEm: DateTime
}
```

---

### 2.6 Aggregate: `Conversa`

**Aggregate Root**: `Conversa`
**Propriedade**: DiagnosticContext
**Tabela**: `Conversa`

```
Conversa {
  id: String
  token: String (identificador anônimo, UUID)
  empresaId: String? (opcional — associada se usuário criar conta)
  fluxo: String ("primeira-conversa")
  etapa: String?
  respostas: Json (mapa perguntaId → valor)
  concluida: Boolean
  criadaEm: DateTime
  atualizadaEm: DateTime
}
```

**Regras de consistência**: Conversa é imutável após concluída. Respostas são append-only. Token identifica sessão anônima — não depende de autenticação.

---

### 2.7 Aggregate: `IdentidadeDigital`

**Aggregate Root**: `IdentidadeDigital`
**Propriedade**: CognitiveIdentityContext
**Tabela**: `IdentidadeDigital`

```
IdentidadeDigital {
  id: String
  empresaId: String (tenant, 1:1 com Empresa)
  dados: Json (respostas do diagnóstico — Record<string, string|null>)
  interpretacoes: Json (Interpretacoes — { pontoAtencao, observacao, alinhamento })
  conhecimentos: Json (ConhecimentoDaIdentidade[] — { descricao, confianca })
  crencas: Json (CrencaDaIdentidade[] — { descricao, confianca })
  lacunas: Json (LacunaDaIdentidade[] — { descricao })
  versao: Int (incrementa a cada evolução)
  narrativaVersao: String?
  ultimaConversa: DateTime?
  criadoEm: DateTime
  atualizadoEm: DateTime
}
```

**Regras de consistência**: Versão é monotônica (nunca decrementa). `dados` e `interpretacoes` só podem ser atualizados juntos (consistência entre pergunta e interpretação).

---

### 2.8 Aggregate: `Evidencia`

**Aggregate Root**: `Evidencia`
**Propriedade**: KnowledgeContext
**Tabela**: `Evidencia`

```
Evidencia {
  id: String
  empresaId: String (tenant)
  descricao: String
  categoria: CategoriaEvidencia
  origem: OrigemEvidencia
  confianca: ConfiancaEvidencia (ALTA | MEDIA | BAIXA)
  contextoId: String?
  criadaEm: DateTime
}
```

**Regras de consistência**: Evidência é imutável após criação. Categoria deve existir em `CategoriaEvidencia`.

---

### 2.9 Aggregate: `Hipotese`

**Aggregate Root**: `Hipotese`
**Propriedade**: KnowledgeContext
**Tabela**: `Hipotese`

```
Hipotese {
  id: String
  empresaId: String (tenant)
  descricao: String
  categoria: CategoriaEvidencia
  confianca: ConfiancaEvidencia
  estado: EstadoHipotese
  origem: OrigemHipotese
  evidenciaIds: String[] (referências a Evidencia)
  criadaEm: DateTime
  atualizadaEm: DateTime
}
```

**Regras de consistência**: Estado segue o ciclo: NOVA → EM_OBSERVACAO → FORTALECIDA → CONFIRMADA | DESCARTADA. Estado não pode regredir (ex.: CONFIRMADA não volta para NOVA).

---

### 2.10 Aggregate: `ConhecimentoValidado`

**Aggregate Root**: `ConhecimentoValidado`
**Propriedade**: KnowledgeContext
**Tabela**: `ConhecimentoValidado`

```
ConhecimentoValidado {
  id: String
  empresaId: String (tenant)
  descricao: String
  categoria: CategoriaEvidencia
  scoreConfianca: Int (0-100)
  origem: String
  ultimaAuditoria: DateTime?
  ultimaValidacao: DateTime?
  criadoEm: DateTime
  atualizadoEm: DateTime
}
```

**Regras de consistência**: `scoreConfianca` é sempre 0-100. Status é derivado (não armazenado): ≥60 CONFIRMADO, <20 DESCARTADO, 20-59 EM_OBSERVACAO.

---

### 2.11 Aggregate: `MemoriaCognitiva`

**Aggregate Root**: `MemoriaCognitiva`
**Propriedade**: KnowledgeContext
**Tabela**: `MemoriaCognitiva`

```
MemoriaCognitiva {
  id: String
  empresaId: String (tenant)
  tipo: TipoMemoria (descoberta | confirmacao | mudanca | aprendizado | evolucao | descarte)
  descricao: String
  categoria: CategoriaEvidencia
  versao: Int
  metadados: Json?
  criadaEm: DateTime
}
```

---

### 2.12 Aggregate: `Aprendizado`

**Aggregate Root**: `Aprendizado`
**Propriedade**: LearningContext
**Tabela**: `Aprendizado`

```
Aprendizado {
  id: String
  empresaId: String (tenant)
  descricao: String
  categoria: CategoriaAprendizado (VALORES | PREFERENCIAS | REGRAS | OBJETIVOS | ROTINAS | EQUIPE | CLIENTES | FINANCEIRO | OPERACAO | VISAO | RISCOS)
  origem: OrigemAprendizado (CONVERSA | MANUAL | PERGUNTA)
  contexto: String?
  ativo: Boolean (soft delete)
  criadoEm: DateTime
}
```

**Regras de consistência**: `categoria` deve ser exatamente uma das 11 definidas. `origem` deve ser uma das 3 definidas. `descricao` mínimo 2 caracteres.

---

### 2.13 Aggregate: `HistoricoSinal`

**Aggregate Root**: `HistoricoSinal`
**Propriedade**: SignalContext
**Tabela**: `HistoricoSinal`

```
HistoricoSinal {
  id: String
  empresaId: String (tenant)
  dominio: DominioSinal (clientes | tarefas | financeiro)
  urgencia: UrgenciaSinal (alta | media | baixa)
  titulo: String
  descricao: String
  origemDados: String
  acaoSugerida: Json? ({ label, href })
  fatosBrutos: Json? (Record<string, unknown>)
  lido: Boolean (padrão: false)
  criadoEm: DateTime
}
```

**Regras de consistência**: Sinal é imutável após criação. Urgência é calculada no momento da criação (não reavaliada).

---

### 2.14 Aggregate: `AcaoCognitiva`

**Aggregate Root**: `AcaoCognitiva`
**Propriedade**: DecisionContext
**Tabela**: `AcaoCognitiva`

```
AcaoCognitiva {
  id: String
  empresaId: String (tenant)
  titulo: String
  descricao: String
  categoria: CategoriaEvidencia
  status: StatusAcao (PENDENTE | EM_ANDAMENTO | CONCLUIDA | CANCELADA)
  prioridade: PrioridadeAcao?
  dataVencimento: DateTime?
  criadaEm: DateTime
  atualizadaEm: DateTime
}
```

---

### 2.15 Aggregate: `FeedbackAcao`

**Aggregate Root**: `FeedbackAcao`
**Propriedade**: FeedbackContext
**Tabela**: `FeedbackAcao`

```
FeedbackAcao {
  id: String
  empresaId: String (tenant)
  acaoId: String (ref: AcaoCognitiva)
  tipo: TipoFeedback (AJUDOU | AJUDOU_PARCIALMENTE | NAO_AJUDOU | NAO_EXECUTADA)
  comentario: String?
  criadoEm: DateTime
}
```

---

### 2.16 Aggregate: `Outcome`

**Aggregate Root**: `Outcome`
**Propriedade**: FeedbackContext
**Tabela**: `Outcome`

```
Outcome {
  id: String
  empresaId: String (tenant)
  descricao: String
  categoria: CategoriaOutcome
  confianca: ConfiancaOutcome (ALTA | MEDIA | BAIXA)
  origem: OrigemOutcome
  hipoteseId: String?
  criadoEm: DateTime
}
```

---

### 2.17 Aggregate: `EventoAtivacao`

**Aggregate Root**: `EventoAtivacao`
**Propriedade**: ActivationContext
**Tabela**: `EventoAtivacao`

```
EventoAtivacao {
  id: String
  empresaId: String (tenant)
  tipo: TipoEventoAtivacao
  metadados: Json?
  criadoEm: DateTime
}
```

---

### 2.18 Aggregate: `Transacao`

**Aggregate Root**: `Transacao`
**Propriedade**: FinancialContext
**Tabela**: `Transacao`

```
Transacao {
  id: String
  empresaId: String (tenant)
  tipo: TipoTransacao (RECEITA | DESPESA)
  valor: Decimal
  categoria: String
  descricao: String?
  data: DateTime
  recorrente: Boolean
  deletedAt: DateTime?
  criadoEm: DateTime
  atualizadoEm: DateTime
}
```

---

### 2.19 Aggregate: `Tarefa`

**Aggregate Root**: `Tarefa`
**Propriedade**: TaskContext
**Tabela**: `Tarefa`

```
Tarefa {
  id: String
  empresaId: String (tenant)
  titulo: String
  descricao: String?
  tipo: TipoTarefa (LIGACAO | EMAIL | REUNIAO | FOLLOW_UP | VISITA)
  prioridade: PrioridadeTarefa?
  status: StatusTarefa
  atribuidoPara: String?
  clienteId: String?
  deletedAt: DateTime?
  dataVencimento: DateTime?
  criadoEm: DateTime
  atualizadoEm: DateTime
}
```

---

### 2.20 Aggregate: `Implantacao`

**Aggregate Root**: `Implantacao`
**Propriedade**: OnboardingContext
**Tabela**: `Implantacao`

```
Implantacao {
  id: String
  empresaId: String (tenant)
  clienteId: String
  status: StatusImplantacao
  deletedAt: DateTime?
  criadoEm: DateTime
  atualizadoEm: DateTime

  // Sub-entities:
  EtapaImplantacao[]
}
```

---

## 3. VALUE OBJECTS

### 3.1 Imutáveis e intercambiáveis por valor

| Value Object | Propriedades | Usado em | Contexto |
|---|---|---|---|
| `Interpretacoes` | `pontoAtencao: string`, `observacao: string`, `alinhamento: string` | `IdentidadeDigital.interpretacoes` | CognitiveIdentity |
| `ConhecimentoDaIdentidade` | `descricao: string`, `confianca: string (ALTA\|MEDIA\|BAIXA)` | `IdentidadeDigital.conhecimentos[]` | CognitiveIdentity |
| `CrencaDaIdentidade` | `descricao: string`, `confianca: string (ALTA\|MEDIA\|BAIXA)` | `IdentidadeDigital.crencas[]` | CognitiveIdentity |
| `LacunaDaIdentidade` | `descricao: string` | `IdentidadeDigital.lacunas[]` | CognitiveIdentity |
| `AcaoSugerida` | `label: string`, `href: string` | `HistoricoSinal.acaoSugerida` | Signal |
| `Progresso` | `blocoAtual: int`, `totalBlocos: int`, `etapaNoBloco: int`, `totalEtapasNoBloco: int`, `percentual: int` | `Conversa` | Diagnostic |
| `Sinal` | `id, dominio, urgencia, titulo, descricao, origemDados, acaoSugerida, fatosBrutos` | `SignalContext` | Signal |
| `DecisaoContexto` | `prioridade, motivo, confianca, evidenciasChave[], acaoSugerida?, setoresEstaveis[], mudancasRecentes[], tendencia?, memoriaRecente[]` | `CognitiveContext` | Decision |
| `ContagemCategoria` | `categoria: string`, `total: int` | `LearningContext` | Learning |
| `AprendizadoItem` | `id, descricao, categoria, origem, contexto?, ativo, criadoEm` | `LearningContext` | Learning |
| `PerguntaRapida` | `pergunta: string`, `categoria: string`, `contexto: string` | `LearningContext` | Learning |
| `Etapa` | `id: string`, `pergunta: string`, `tipo: enum`, `opcoes?: Opcao[]` | `Fluxo` | Diagnostic |
| `Fluxo` | `id, nome, versao, etapas: Etapa[]` | `DiagnosticContext` | Diagnostic |
| `IdentidadeEmpresa` | `empresaConhecida, verdadesEstaveis[], hipoteses[], lacunas[], mudancasRecentes[], categoriasComAtividade[], totalEvidencias, ultimaConversa?, versao, narrativaVersao?` | `CognitiveIdentity` | CognitiveIdentity |

### 3.2 Tipos Enum (atuam como Value Objects)

```
TipoPapel = "ADMIN" | "GESTOR" | "MEMBRO"              // IAMContext
EstagioLead = "NOVO" | "CONTATADO" | "QUALIFICADO" | "PROPOSTA" | "NEGOCIACAO" | "FECHADO" | "PERDIDO"
TemperaturaLead = "FRIA" | "MORNA" | "QUENTE"
StatusCliente = "ATIVO" | "INATIVO" | "BLOQUEADO"
CategoriaEvidencia = "FINANCEIRO" | "CLIENTES" | "OPERACAO" | "GESTAO" | "PESSOAS" | "PRODUTO" | "ESTRATEGIA"
ConfiancaEvidencia = "ALTA" | "MEDIA" | "BAIXA"
EstadoHipotese = "NOVA" | "EM_OBSERVACAO" | "FORTALECIDA" | "CONFIRMADA" | "DESCARTADA"
TipoMemoria = "descoberta" | "confirmacao" | "mudanca" | "aprendizado" | "evolucao" | "descarte"
CategoriaAprendizado = "VALORES" | "PREFERENCIAS" | "REGRAS" | "OBJETIVOS" | "ROTINAS" | "EQUIPE" | "CLIENTES" | "FINANCEIRO" | "OPERACAO" | "VISAO" | "RISCOS"
OrigemAprendizado = "CONVERSA" | "MANUAL" | "PERGUNTA"
StatusAcao = "PENDENTE" | "EM_ANDAMENTO" | "CONCLUIDA" | "CANCELADA"
StatusTarefa = "ABERTA" | "EM_ANDAMENTO" | "CONCLUIDA" | "CANCELADA"
TipoTarefa = "LIGACAO" | "EMAIL" | "REUNIAO" | "FOLLOW_UP" | "VISITA"
TipoTransacao = "RECEITA" | "DESPESA"
TipoFeedback = "AJUDOU" | "AJUDOU_PARCIALMENTE" | "NAO_AJUDOU" | "NAO_EXECUTADA"
UrgenciaSinal = "baixa" | "media" | "alta"
DominioSinal = "clientes" | "tarefas" | "financeiro"
```

---

## 4. DOMAIN EVENTS

> O catálogo completo e atualizado de eventos está em [`CATALOGO_EVENTOS.md`](./CATALOGO_EVENTOS.md), incluindo nomenclatura semântica, classificação por tipo (negócio, cognitivo, entrada, saída, jornada) e mapa de migração de eventos antigos para novos.

**Nota:** Durante a V4 Founder, eventos são registrados como `HistoricoSinal` + `MemoriaCognitiva` conforme ADR-001. A implementação formal com Event Bus dedicado ocorrerá na Fase 2 (ADR-011).

### 4.1 Assinatura dos Eventos (formato futuro)

```
interface DomainEvent<T> {
  eventId: string
  eventType: string        // ex: "DiagnosticoConcluido"
  aggregateId: string       // ex: empresaId
  aggregateType: string     // ex: "IdentidadeDigital"
  version: number
  occurredAt: DateTime
  data: T                   // payload específico do evento
  metadata: {
    tenantId: string
    correlationId: string   // ADR-027: obrigatório, rastreia cadeia causal
    causationId: string     // evento que causou este
  }
}
```

---

## 5. SERVICES

### 5.1 Domain Services

| Service | Contexto | Responsabilidade |
|---|---|---|
| `InterpretadorRespostas` | Diagnostic | Analisa respostas do diagnóstico e produz `Interpretacoes` (pontoAtencao, observacao, alinhamento) |
| `CalculadorNivelAtivacao` | Activation | Calcula nível de ativação do fundador com base em `EventoAtivacao` |
| `GeradorSinais` | Signal | Gera `Sinal[]` a partir de dados de clientes, tarefas, financeiro |
| `CalculadorConfianca` | Knowledge | Calcula `scoreConfianca` de `ConhecimentoValidado` com base em evidências |
| `DecisorContexto` | Decision | Determina prioridade do contexto atual (qual área merece atenção) |
| `CalculadorHealthScore` | Cognitive OS | Calcula score de saúde cognitiva da empresa |
| `CalculadorMaturidade` | Cognitive OS | Calcula maturidade da empresa baseada em métricas cognitivas |
| `CalculadorEvolucao` | Cognitive OS | Calcula evolução percentual da empresa no período |
| `AvaliadorEnvelhecimento` | Knowledge | Avalia idade do conhecimento e alerta sobre desatualização |
| `CalculadorDerivaConfianca` | Knowledge | Detecta variações no score de confiança ao longo do tempo |
| `GeradorMilestones` | Activation | Gera marcos cognitivos baseados no progresso da empresa |

### 5.2 Application Services

| Service | Contexto | Responsabilidade |
|---|---|---|
| `ConversaService` | Diagnostic | `criarConversa()`, `responder()`, `carregarConversa()`, `obterEstado()`, `vincularConversa()` |
| `IdentityService` | CognitiveIdentity | `construirIdentidade()`, `obterIdentidade()`, `atualizarIdentidade()`, `evoluirIdentidade()`, `contextoParaAssistente()`, `contextoParaDashboard()` |
| `EvidenceService` | Knowledge | `registrarEvidencia()`, `consultarEvidencias()`, `contagemPorCategoria()` |
| `HipoteseService` | Knowledge | `criarHipotese()`, `atualizarEstadoHipotese()`, `listarHipoteses()`, `validarHipoteses()` |
| `MemoriaService` | Knowledge | `registrarNaMemoria()`, `consultarMemoria()`, `ultimasMudancas()` |
| `KnowledgeGovernanceService` | Knowledge | `promoverConhecimento()`, `enfraquecerConhecimento()`, `descartarConhecimento()`, `auditarConhecimento()`, `obterConhecimentosAprovados()` |
| `AprendizadoService` | Learning | `adicionarAprendizado()`, `listarAprendizados()`, `contagemPorCategoria()`, `aprendizadosParaContexto()`, `aprendizadosRecentes()`, `desativarAprendizado()`, `obterPerguntasRapidas()`, `obterPerguntaAleatoria()` |
| `DecisionService` | Decision | `gerarDecisoes()`, `melhorDecisao()`, `registrarExecucaoDecisao()` |
| `ActionService` | Decision | `criarAcao()`, `atualizarStatusAcao()`, `registrarResultadoAcao()`, `listarAcoesAtivas()`, `analisarImpacto()` |
| `FeedbackService` | Feedback | `registrarFeedback()`, `analisarResultadoAcao()`, `listarFeedbackRecente()`, `acoesSemFeedback()`, `analisarAprendizados()` |
| `OutcomeService` | Feedback | `registrarOutcome()`, `listarOutcomes()`, `atualizarOutcome()`, `calcularImpactoEmpresa()`, `principaisOutcomes()` |
| `ActivationService` | Activation | `registrarEventoAtivacao()`, `calcularNivelAtivacao()`, `obterJornadaFundador()` |
| `ObservatoryService` | Cognitive OS | `obterResumoCognitivo()`, `obterMetricasConhecimento()`, `obterEvolucaoDiaria()`, `obterKnowledgeVaultMetrics()`, `obterLearningMetrics()`, `obterOSMetricsSummary()`, `obterEvolutionMetricsSummary()`, `obterAlertasGovernanca()` |
| `CognitiveOrchestrator` | Cognitive OS | `obterEstadoCognitivoCompleto()`, `processarEvento()`, `processarConversa()`, `processarAcao()`, `processarFeedback()`, `processarOutcome()`, `processarCadastro()`, `executarRotinaDiaria()`, `executarRotinaSemanal()`, `executarRotinaMensal()` |

### 5.3 Infrastructure Services

| Service | Contexto | Responsabilidade |
|---|---|---|
| `PrismaClientFactory` | IAM | Cria/gerencia instância Prisma com config de pooling + directUrl |
| `PrismaTenantSafeProxy` | IAM | Wrapper que valida `empresaId` em queries multi-tenant (ver ADR-008) |
| `SupabaseAuthClient` | IAM | Wrapper para autenticação Supabase (login, session, cookies) |
| `SupabaseAdminClient` | IAM | Cliente Supabase com role `service_role` (ações administrativas) |
| `AnthropicAIClient` | IA | Cliente para API Anthropic (chat, limites por plano) |
| `RateLimiter` | IAM | Controle de taxa para rotas sensíveis (auth, assistente IA) |

---

## 6. REPOSITORIES

### 6.1 Contratos de Repositório (Interfaces)

> Nota: Durante V4 Founder, a implementação concreta de cada repositório é o acesso direto ao Prisma via services (ADR-002, ADR-004). As interfaces abaixo são a **definição de contrato** para quando a camada `repositories/` for implementada (Fase 2/3). Por ora, o service implementa a query diretamente.

```
// === IAMContext ===
interface EmpresaRepository {
  findById(id: string): Promise<Empresa | null>
  findByIdentifier(identifier: string): Promise<Empresa | null>
  save(empresa: Empresa): Promise<void>
  softDelete(id: string): Promise<void>
}

interface UsuarioRepository {
  findById(id: string): Promise<Usuario | null>
  findByEmail(email: string): Promise<Usuario | null>
  findByEmpresaId(empresaId: string): Promise<Usuario[]>
  save(usuario: Usuario): Promise<void>
  softDelete(id: string): Promise<void>
}

// === DiagnosticContext ===
interface ConversaRepository {
  findByToken(token: string): Promise<Conversa | null>
  findById(id: string): Promise<Conversa | null>
  save(conversa: Conversa): Promise<void>
  addResposta(conversaId: string, perguntaId: string, valor: string): Promise<void>
  complete(conversaId: string): Promise<void>
}

// === CognitiveIdentityContext ===
interface IdentidadeDigitalRepository {
  findByEmpresaId(empresaId: string): Promise<IdentidadeDigital | null>
  save(identidade: IdentidadeDigital): Promise<void>
  updateInterpretacoes(empresaId: string, interpretacoes: Interpretacoes): Promise<void>
  evolve(empresaId: string, conhecimentos: any[], crencas: any[], lacunas: any[]): Promise<void>
}

// === KnowledgeContext ===
interface EvidenciaRepository {
  findById(id: string): Promise<Evidencia | null>
  findByEmpresaId(empresaId: string, filtros?: FiltroEvidencias): Promise<Evidencia[]>
  countByCategoria(empresaId: string, dias?: number): Promise<Record<string, number>>
  save(evidencia: Evidencia): Promise<void>
}

interface HipoteseRepository {
  findById(id: string): Promise<Hipotese | null>
  findByEmpresaId(empresaId: string, ativas?: boolean): Promise<Hipotese[]>
  save(hipotese: Hipotese): Promise<void>
  updateEstado(id: string, estado: EstadoHipotese): Promise<void>
}

interface ConhecimentoValidadoRepository {
  findById(id: string): Promise<ConhecimentoValidado | null>
  findByEmpresaId(empresaId: string): Promise<ConhecimentoValidado[]>
  findPromoviveis(scoreMin: number): Promise<ConhecimentoValidado[]>
  findParaAuditar(diasSemAuditoria: number): Promise<ConhecimentoValidado[]>
  save(conhecimento: ConhecimentoValidado): Promise<void>
  updateScore(id: string, novoScore: number): Promise<void>
  aggregateByCategoria(): Promise<CategoriaScoreAggregate[]>
}

interface MemoriaCognitivaRepository {
  findByEmpresaId(empresaId: string, limite: number): Promise<MemoriaCognitiva[]>
  save(memoria: MemoriaCognitiva): Promise<void>
  findByTipo(empresaId: string, tipo: TipoMemoria): Promise<MemoriaCognitiva[]>
}

// === LearningContext ===
interface AprendizadoRepository {
  findById(id: string): Promise<Aprendizado | null>
  findByEmpresaId(empresaId: string, filtros?: AprendizadoFilter): Promise<Aprendizado[]>
  countByCategoria(empresaId: string): Promise<ContagemCategoria[]>
  save(aprendizado: Aprendizado): Promise<void>
  softDelete(id: string, empresaId: string): Promise<void>
}

// === SignalContext ===
interface HistoricoSinalRepository {
  findById(id: string): Promise<HistoricoSinal | null>
  findByEmpresaId(empresaId: string, filtros?: SinalFilter): Promise<HistoricoSinal[]>
  findNaoLidos(empresaId: string): Promise<HistoricoSinal[]>
  save(sinal: HistoricoSinal): Promise<void>
  markAsRead(id: string): Promise<void>
}

// === DecisionContext ===
interface AcaoCognitivaRepository {
  findById(id: string): Promise<AcaoCognitiva | null>
  findByEmpresaId(empresaId: string, filtros?: AcaoFilter): Promise<AcaoCognitiva[]>
  findAtivas(empresaId: string): Promise<AcaoCognitiva[]>
  save(acao: AcaoCognitiva): Promise<void>
  updateStatus(id: string, status: StatusAcao): Promise<void>
}

// === FeedbackContext ===
interface FeedbackAcaoRepository {
  findById(id: string): Promise<FeedbackAcao | null>
  findByEmpresaId(empresaId: string): Promise<FeedbackAcao[]>
  findByAcaoId(acaoId: string): Promise<FeedbackAcao[]>
  save(feedback: FeedbackAcao): Promise<void>
}

interface OutcomeRepository {
  findById(id: string): Promise<Outcome | null>
  findByEmpresaId(empresaId: string): Promise<Outcome[]>
  findByHipoteseId(hipoteseId: string): Promise<Outcome[]>
  save(outcome: Outcome): Promise<void>
}

// === ActivationContext ===
interface EventoAtivacaoRepository {
  findByEmpresaId(empresaId: string): Promise<EventoAtivacao[]>
  save(evento: EventoAtivacao): Promise<void>
}

// === FinancialContext ===
interface TransacaoRepository {
  findById(id: string): Promise<Transacao | null>
  findByEmpresaId(empresaId: string, filtros?: TransacaoFilter): Promise<Transacao[]>
  save(transacao: Transacao): Promise<void>
  softDelete(id: string): Promise<void>
  sumByPeriodo(empresaId: string, inicio: Date, fim: Date): Promise<ResumoFinanceiro>
}

// === TaskContext ===
interface TarefaRepository {
  findById(id: string): Promise<Tarefa | null>
  findByEmpresaId(empresaId: string, filtros?: TarefaFilter): Promise<Tarefa[]>
  save(tarefa: Tarefa): Promise<void>
  softDelete(id: string): Promise<void>
}
```

---

## 7. REGRAS DE NEGÓCIO

> **Separação ADR-033:** Apenas invariantes de domínio genuínos estão listados abaixo. Regras técnicas (validação de input, constraints de banco, convenções de implementação) foram movidas para `ENGINEERING_GUIDELINES.md` — consulte lá para R04, R08-R16, R19.

### 7.1 Invariantes de domínio (sempre verdade)

| Regra | Contexto | Descrição |
|---|---|---|
| R01 | IAM | Toda query multi-tenant DEVE filtrar por `empresaId` |
| R02 | IAM | Todo model DEVE ter `deletedAt` para soft delete |
| R03 | IAM | Nenhum DELETE físico em dado de empresário |
| R05 | Diagnostic | Diagnóstico é completável em até 5 minutos |
| R06 | Diagnostic | Nenhuma pergunta exige mais que resposta curta ou seleção |
| R07 | Diagnostic | Conversa anônima não depende de autenticação |
| R17 | Decision | Centro de Decisão nunca mostra mais itens que a empresa consegue executar |
| R18 | Decision | Nenhuma lógica de decisão acoplada diretamente na UI |

> Regras técnicas movidas (R04, R08-R16, R19) disponíveis em [`ENGINEERING_GUIDELINES.md`](./ENGINEERING_GUIDELINES.md) — seção "Regras Técnicas Obrigatórias".

### 7.2 Políticas de Domínio

| Política | Contexto | Descrição |
|---|---|---|
| P01 | Knowledge | Conhecimento com `scoreConfiança` ≥ 60 por mais de 7 dias sem revalidação perde 5 pontos/semana |
| P02 | Knowledge | Hipótese com estado `EM_OBSERVACAO` por mais de 30 dias sem novas evidências é automaticamente DESCARTADA |
| P03 | Activation | Nível de ativação (NOVO → CONHECENDO → ATIVO → ENGAJADO → FUNDADOR_VALIDADO) é calculado por soma ponderada de `EventoAtivacao` |
| P04 | Diagnostic | Respostas do diagnóstico são guardadas como evidências (`registrarEvidencia`) para alimentar o ciclo cognitivo |
| P05 | Decision | Decisão tem prioridade baseada em: urgência do sinal + confiança do contexto + categoria mais afetada |
| P06 | Feedback | Feedback `AJUDOU` fortalece hipóteses relacionadas; `NAO_AJUDOU` as enfraquece |
| P07 | Identity | `construirIdentidade` prioriza conhecimentos aprovados pelo Governance Engine; complementa com conhecimentos da identidade |
| P08 | Identity | `contextoParaAssistente` inclui `aprendizados` nas verdades estáveis |

---

## 8. INTERFACES ENTRE CAMADAS

### 8.1 API Routes → Application Services

```
// Padrão: cada API Route chama exatamente 1 Application Service
// Validação com Zod antes de chamar o service
// Tenant guard via empresaId extraído da sessão (requireUser)

GET    /api/conversa              → ConversaService.carregarOuCriar()
POST   /api/conversa              → ConversaService.responder()
POST   /api/conversa/finalizar    → ConversaService.finalizar()
POST   /api/conversa/vincular     → ConversaService.vincularConta()

GET    /api/aprendizados          → AprendizadoService.listar()
POST   /api/aprendizados          → AprendizadoService.adicionar()
DELETE /api/aprendizados          → AprendizadoService.desativar()

POST   /api/assistente            → AssistenteService.chat() (via Anthropic)

GET    /api/feedback              → FeedbackService.listarRecente()
POST   /api/feedback              → FeedbackService.registrar()

// ... demais rotas seguem o mesmo padrão
```

### 8.2 Application Services → Domain Services

```
CognitiveOrchestrator.processarConversa()
  → IdentityService.atualizarIdentidade()
  → EvidenceService.registrarEvidencia()
  → MemoriaService.registrarNaMemoria()
  → ContextService.decidirContexto()
  → DecisionService.gerarDecisoes()
  → ActivationService.registrarEventoAtivacao()

CognitiveOrchestrator.processarFeedback()
  → FeedbackService.registrarFeedback()
  → EvidenceService.registrarEvidencia()
  → MemoriaService.registrarNaMemoria()
  → HipoteseService.atualizarEstadoHipotese()
  → ActivationService.registrarEventoAtivacao()

CognitiveOrchestrator.executarRotinaSemanal()
  → KnowledgeGovernanceService.auditarConhecimento()
  → KnowledgeGovernanceService.promoverConhecimento()
  → KnowledgeGovernanceService.enfraquecerConhecimento()
```

### 8.3 Experience Engine (Interface entre Cognitive OS e UI)

```
// A Experience Engine é um Anti-Corruption Layer entre o estado cognitivo e a interface

interface IExperienceEngine {
  obterHomeExperience(empresaId: string): Promise<HomeExperience>
  obterDashboardExperience(empresaId: string): Promise<DashboardExperience>
  obterSidebarExperience(empresaId: string): Promise<SidebarExperience>
  obterAssistenteExperience(empresaId: string): Promise<AssistenteExperience>
  obterLoginExperience(): Promise<LoginExperience>
  obterFinanceiroExperience(empresaId: string): Promise<FinanceiroExperience>
  obterCRMExperience(empresaId: string): Promise<CRMExperience>
  obterClientesExperience(empresaId: string): Promise<ClientesExperience>
  obterClienteExperience(empresaId: string, clienteNome: string): Promise<ClienteExperience>
  obterTarefasExperience(empresaId: string): Promise<TarefasExperience>
  obterHistoricoExperience(empresaId: string): Promise<HistoricoExperience>
  obterImplantacoesExperience(empresaId: string): Promise<ImplantacoesExperience>
  obterConfiguracoesExperience(empresaId: string): Promise<ConfiguracoesExperience>
  obterConhecimentoExperience(empresaId: string): Promise<ConhecimentoExperience>
  obterLearningExperience(empresaId: string): Promise<LearningExperience>
  obterEvolutionExperience(empresaId: string): Promise<EvolutionExperience>
}
```

---

## 9. MAPA COMPLETO DOS MÓDULOS

```
sistema/
├── src/
│   ├── app/                          # Next.js App Router (camada de apresentação)
│   │   ├── (auth)/                   #   Páginas de autenticação
│   │   ├── (dashboard)/              #   Páginas do dashboard (protegidas)
│   │   │   ├── admin/
│   │   │   ├── aprendizados/
│   │   │   ├── assistente/
│   │   │   ├── clientes/
│   │   │   ├── conhecimento/
│   │   │   ├── configuracoes/
│   │   │   ├── crm/
│   │   │   ├── dashboard/
│   │   │   ├── financeiro/
│   │   │   ├── historico/
│   │   │   ├── implantacoes/
│   │   │   ├── tarefas/
│   │   │   ├── layout.tsx
│   │   │   └── loading.tsx
│   │   ├── api/                      #   API Routes (entrada de mutações)
│   │   │   ├── conversa/             #     (anônimo) Diagnóstico
│   │   │   ├── aprendizados/         #     LearningContext
│   │   │   ├── assistente/           #     IA (Anthropic)
│   │   │   └── ...
│   │   ├── conversa/                 #   Página pública do Diagnóstico
│   │   ├── layout.tsx
│   │   └── globals.css
│   │
│   ├── engine/                       # DOMAIN LAYER (aplicação + domínio)
│   │   ├── tipos.ts                  #   Value Objects + tipos base
│   │   ├── reacoes.ts                #   Domain Service (micro-reações)
│   │   ├── interpretacoes.ts         #   Domain Service (interpretador)
│   │   │
│   │   ├── conversation-engine.ts    #   Application Service (DiagnosticContext)
│   │   ├── fluxos/                   #     Fluxos de conversa
│   │   │   └── primeira-conversa.ts
│   │   │
│   │   ├── identity-engine.ts        #   Application Service (CognitiveIdentityContext)
│   │   ├── cognitive-context-engine.ts #  Domain Service (DecisorContexto)
│   │   │
│   │   ├── evidence-engine.ts        #   Application Service (KnowledgeContext)
│   │   ├── cognitive-memory-engine.ts #   Application Service (KnowledgeContext)
│   │   ├── knowledge-governance-engine.ts # Application Service (KnowledgeContext)
│   │   ├── knowledge-aging-engine.ts #   Domain Service
│   │   ├── confidence-drift-engine.ts #   Domain Service
│   │   │
│   │   ├── aprendizado-service.ts    #   Application Service (LearningContext)
│   │   │
│   │   ├── decision-engine.ts        #   Application Service (DecisionContext)
│   │   ├── action-intelligence-engine.ts # Application Service (DecisionContext)
│   │   ├── feedback-intelligence-engine.ts # Application Service (FeedbackContext)
│   │   ├── outcome-intelligence-engine.ts # Application Service (FeedbackContext)
│   │   │
│   │   ├── founder-activation-engine.ts # Application Service (ActivationContext)
│   │   │
│   │   ├── clientes.sinais.ts        #   Domain Service (GeradorSinais - CRM)
│   │   ├── tarefas.sinais.ts         #   Domain Service (GeradorSinais - Tarefas)
│   │   ├── financeiro.sinais.ts      #   Domain Service (GeradorSinais - Financeiro)
│   │   │
│   │   ├── cognitive-orchestrator.ts #   Application Service (Orquestrador)
│   │   ├── cognitive-observatory.ts  #   Application Service (Observatório)
│   │   │
│   │   ├── cognitive-experience-engine.ts # Anti-Corruption Layer (Experience Engine)
│   │   ├── cognitive-action-composer.ts   #   Helper do Experience Engine
│   │   ├── cognitive-briefing-engine.ts   #   Helper do Experience Engine
│   │   ├── cognitive-workflow-engine.ts   #   Helper do Experience Engine
│   │   ├── cognitive-journey-engine.ts    #   Helper do Experience Engine
│   │   ├── cognitive-timeline-engine.ts   #   Helper do Experience Engine
│   │   ├── cognitive-notification-engine.ts # Helper do Experience Engine
│   │   ├── cognitive-health-engine.ts     #   Helper do Experience Engine
│   │   ├── cognitive-evolution-engine.ts  #   Helper do Experience Engine
│   │   ├── cognitive-routine-engine.ts    #   Helper do Experience Engine
│   │   ├── cognitive-milestone-engine.ts  #   Helper do Experience Engine
│   │   ├── company-maturity-engine.ts     #   Helper do Experience Engine
│   │   │
│   │   └── index.ts                 #   Barrel exports
│   │
│   ├── components/                   # REACT COMPONENTS (UI Layer)
│   │   ├── layout/                   #   Sidebar, Header, AppShell
│   │   ├── ui/                       #   shadcn/ui primitives
│   │   ├── shared/                   #   ExperienceRenderer, etc.
│   │   ├── cognitive/                #   Cards do Cognitive OS
│   │   ├── conversa/                 #   QuestionCard, MicroReaction, etc.
│   │   ├── conhecimento/            #   KnowledgeTag, KnowledgeCard, etc.
│   │   ├── aprendizados/            #   ConversationKnowledgeCard, etc.
│   │   ├── clientes/
│   │   ├── crm/
│   │   ├── dashboard/
│   │   ├── financeiro/
│   │   ├── tarefas/
│   │   ├── implantacoes/
│   │   └── assistente/
│   │
│   ├── lib/                         # INFRASTRUCTURE LAYER
│   │   ├── auth.ts                  #   Supabase Auth wrapper
│   │   ├── prisma.ts                #   PrismaClientFactory
│   │   ├── prisma-tenant-safe.ts    #   PrismaTenantSafeProxy (não conectado - ADR-008)
│   │   ├── supabase-admin.ts        #   SupabaseAdminClient (lazy)
│   │   ├── rate-limit.ts            #   RateLimiter
│   │   └── anthropic.ts             #   AnthropicAIClient
│   │
│   ├── types/                       # TIPOS COMPARTILHADOS
│   │   └── index.ts
│   │
│   └── constants/                   # CONSTANTES
│       └── index.ts
│
├── prisma/
│   ├── schema.prisma                # DATABASE SCHEMA (Prisma)
│   └── migrations/                  #   Migrations
│
└── prisma.config.ts                 # CONFIG PRISMA 7
```

---

## 10. MAPA DOS EVENTOS

### 10.1 Fluxo de Eventos por Ciclo

```
=== CICLO 1: DIAGNÓSTICO ===
[Usuário] → /conversa → POST /api/conversa (18 perguntas)
  ↓
[CognitiveOrchestrator.processarConversa()]
  ├── EvidenciaRegistrada × N (para cada resposta relevante)
  ├── IdentidadeCriada / IdentidadeEvoluida
  ├── MemoriaRegistrada (tipo: "descoberta")
  ├── DecisaoGerada (contexto + prioridade)
  ├── AcaoCognitivaCriada (se aplicável)
  └── EventoAtivacaoRegistrado (IDENTIDADE_CRIADA)

=== CICLO 2: SINAL OPERACIONAL ===
[Dados do sistema (lead novo, tarefa vencendo, despesa alta)]
  ↓
[GeradorSinais.gerar() → clientes.sinais | tarefas.sinais | financeiro.sinais]
  ├── SinalGerado (com urgência calculada)
  └── HistoricoSinal salvo

=== CICLO 3: DECISÃO ===
[ContextEngine.decidirContexto() + DecisionEngine.gerarDecisoes()]
  ├── DecisaoGerada (prioridade + motivo)
  ├── AcaoCognitivaCriada (se empresa segue a decisão)
  └── MemoriaRegistrada (tipo: "evolucao")

=== CICLO 4: FEEDBACK ===
[Empresário avalia ação: AJUDOU | NAO_AJUDOU | etc.]
  ↓
[CognitiveOrchestrator.processarFeedback()]
  ├── FeedbackRegistrado
  ├── EvidenciaRegistrada
  ├── MemoriaRegistrada (tipo: "confirmacao" | "aprendizado")
  ├── HipoteseFortalecida / HipoteseEnfraquecida (consequência)
  ├── OutcomeRegistrado (se aplicável)
  ├── ConhecimentoPromovido / ConhecimentoEnfraquecido
  └── EventoAtivacaoRegistrado (se marco atingido)

=== CICLO 5: APRENDIZADO EXPLÍCITO ===
[Empresário responde pergunta rápida ou ensina manualmente]
  ↓
[AprendizadoService.adicionarAprendizado()]
  ├── AprendizadoRegistrado
  ├── MemoriaRegistrada (tipo: "aprendizado")
  └── IdentityService.contextoParaAssistente() passa a incluir

=== CICLO 6: ROTINA SEMANAL ===
[CognitiveOrchestrator.executarRotinaSemanal()]
  ├── KnowledgeGovernanceService.auditarConhecimento()
  │   ├── ConhecimentoEnfraquecido (sem revalidação recente)
  │   └── ConhecimentoPromovido (score ≥ 60)
  ├── KnowledgeGovernanceService.promoverConhecimento()
  │   └── HipoteseConfirmada → ConhecimentoValidado
  └── MemoriaRegistrada (tipo: "evolucao")

=== CICLO 7: ROTINA DIÁRIA ===
[CognitiveOrchestrator.executarRotinaDiaria()]
  └── HipoteseService.validarHipoteses()
      └── HipoteseDescartada (30 dias sem evidências)
```

---

## 11. MAPA DOS SERVIÇOS (Dependências)

### 11.1 Árvore de Dependências

```
cognitive-orchestrator.ts
  ├── identity-engine.ts
  │     ├── evidence-engine.ts
  │     ├── cognitive-memory-engine.ts
  │     ├── knowledge-governance-engine.ts
  │     ├── founder-activation-engine.ts
  │     └── aprendizado-service.ts
  │
  ├── cognitive-context-engine.ts
  │     ├── evidence-engine.ts
  │     ├── identity-engine.ts
  │     └── cognitive-memory-engine.ts
  │
  ├── decision-engine.ts
  ├── action-intelligence-engine.ts
  ├── feedback-intelligence-engine.ts
  │     └── conversation-engine.ts (via reacoes.ts)
  │
  ├── outcome-intelligence-engine.ts
  ├── knowledge-governance-engine.ts
  │     └── evidence-engine.ts
  │
  ├── founder-activation-engine.ts
  ├── conversation-engine.ts
  │     ├── evidence-engine.ts
  │     ├── founder-activation-engine.ts
  │     └── reacoes.ts
  │
  ├── evidence-engine.ts
  ├── cognitive-memory-engine.ts
  └── cognitive-observatory.ts
        └── knowledge-governance-engine.ts

cognitive-experience-engine.ts
  ├── cognitive-orchestrator.ts
  ├── cognitive-action-composer.ts
  ├── cognitive-workflow-engine.ts
  ├── cognitive-journey-engine.ts
  ├── cognitive-timeline-engine.ts
  ├── cognitive-notification-engine.ts
  ├── cognitive-briefing-engine.ts
  ├── cognitive-health-engine.ts
  ├── cognitive-evolution-engine.ts
  ├── knowledge-aging-engine.ts
  ├── confidence-drift-engine.ts
  ├── cognitive-milestone-engine.ts
  ├── company-maturity-engine.ts
  ├── cognitive-routine-engine.ts
  ├── aprendizado-service.ts
  ├── cognitive-memory-engine.ts
  └── Prisma (via prismaSeguro)
```

### 11.2 Matriz de Dependência entre Contextos

```
Contexto emissor \ Consumidor | IAM | Dx | CI | Kn | Ln | Si | CR | Fi | Ta | On | Dc | Fb | Ac | OS |
──────────────────────────────┼─────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┼────┤
IAMContext                     │ —  │ —  │ —  │ —  │ —  │ —  │ ✓  │ ✓  │ ✓  │ ✓  │ —  │ —  │ —  │ —  │
DiagnosticContext              │ —  │ —  │ ✓  │ —  │ —  │ —  │ —  │ —  │ —  │ —  │ —  │ —  │ —  │ —  │
CognitiveIdentityContext       │ —  │ —  │ —  │ ✓  │ —  │ —  │ —  │ —  │ —  │ —  │ ✓  │ —  │ —  │ ✓  │
KnowledgeContext               │ —  │ —  │ ✓  │ —  │ —  │ —  │ —  │ —  │ —  │ —  │ ✓  │ ✓  │ —  │ ✓  │
LearningContext                │ —  │ —  │ ✓  │ —  │ —  │ —  │ —  │ —  │ —  │ —  │ —  │ —  │ —  │ ✓  │
SignalContext                  │ —  │ —  │ —  │ —  │ —  │ —  │ —  │ —  │ —  │ —  │ ✓  │ —  │ —  │ —  │
CRMContext                     │ —  │ —  │ —  │ —  │ —  │ ✓  │ —  │ —  │ —  │ ✓  │ —  │ —  │ —  │ —  │
FinancialContext               │ —  │ —  │ —  │ —  │ —  │ ✓  │ —  │ —  │ —  │ —  │ —  │ —  │ —  │ —  │
TaskContext                    │ —  │ —  │ —  │ —  │ —  │ ✓  │ —  │ —  │ —  │ —  │ —  │ —  │ —  │ —  │
OnboardingContext              │ —  │ —  │ —  │ —  │ —  │ —  │ —  │ —  │ —  │ —  │ —  │ —  │ —  │ —  │
DecisionContext                │ —  │ —  │ —  │ —  │ —  │ —  │ —  │ —  │ ✓  │ —  │ —  │ —  │ —  │ ✓  │
FeedbackContext                │ —  │ —  │ —  │ ✓  │ —  │ —  │ —  │ —  │ —  │ —  │ —  │ —  │ —  │ ✓  │
ActivationContext              │ —  │ —  │ —  │ —  │ —  │ —  │ —  │ —  │ —  │ —  │ —  │ —  │ —  │ ✓  │
CognitiveOS (Observatory)     │ —  │ —  │ —  │ ✓  │ ✓  │ —  │ —  │ —  │ —  │ —  │ —  │ —  │ ✓  │ —  │

Legenda: IAM=IAM, Dx=Diagnostic, CI=CognitiveIdentity, Kn=Knowledge, Ln=Learning,
         Si=Signal, CR=CRM, Fi=Financial, Ta=Task, On=Onboarding,
         Dc=Decision, Fb=Feedback, Ac=Activation, OS=CognitiveOS
```

---

## 12. MAPA DOS FLUXOS

### 12.1 Fluxo: Primeiro Acesso (Curioso → Apoiador)

```
[Curioso] → acessa pontedigital.com
  ↓
  GET /conversa
    ├── Cria Conversa anônima (token UUID → cookie conv_token)
    ├── Carrega primeira pergunta do fluxo "primeira-conversa"
    └── Exibe ProgressBar (bloco 1/5, 5%)
  ↓
  [18 perguntas] → POST /api/conversa (perguntaId + valor)
    ├── Reação instantânea (MicroReaction)
    ├── Timer 5s → auto-avança
    └── Se última pergunta → POST /api/conversa/finalizar
          ↓
  [Página de Revelação]
    ├── Exibe Interpretacoes (pontoAtencao, observacao, alinhamento)
    ├── Convite: "Crie sua conta para salvar"
    └── Link para /criar-conta
          ↓
  [Cria conta] → IdentidadeDigital criada (versao: 1)
    ├── Conversa vinculada à empresa (vincularConversa)
    └── EventoAtivacao: IDENTIDADE_CRIADA
          ↓
  [Apoiador] → Acesso ao dashboard
    ├── Sidebar: Inteligência vazia (sem dados ainda)
    └── Narrativa: "Vamos começar"
```

### 12.2 Fluxo: Ciclo Cognitivo Contínuo

```
[Uso diário] → CRM, Financeiro, Tarefas, Assistente
  ↓
[GeradorSinais] → HistoricoSinal (alertas operacionais)
  ↓
[Rotina Diária] → executaRotinaDiaria()
  ├── Validar hipóteses pendentes
  └── Descartar hipóteses sem evidências recentes
  ↓
[Rotina Semanal] → executaRotinaSemanal()
  ├── Auditar conhecimento (aging + drift)
  ├── Promover conhecimentos com score ≥ 60
  └── Enfraquecer conhecimento sem revalidação
  ↓
[Dashboard] → obtém estado cognitivo completo
  ├── Narrativa contextual
  ├── Insights (prioridade, evolução, feedback)
  ├── Briefing diário
  └── Notificações do Cognitive OS
```

### 12.3 Fluxo: Decisão → Ação → Feedback → Aprendizado

```
[Decisão gerada] → DecisionEngine.melhorDecisao()
  ↓
[Empresário] → "Criar ação" → ActionIntelligence.criarAcao()
  ├── AcaoCognitiva (PENDENTE)
  └── Tarefa? (se ação vira tarefa operacional)
  ↓
[Empresário] → Executa → ActionIntelligence.atualizarStatus()
  └── AcaoCognitiva (CONCLUIDA | CANCELADA)
  ↓
[Empresário] → FeedbackIntelligence.registrarFeedback()
  ├── FeedbackAcao (AJUDOU | NAO_AJUDOU | etc.)
  ├── Evidencia registrada
  ├── Memoria registrada ("confirmacao" | "aprendizado")
  ├── Hipotese fortalecida/enfraquecida
  └── KnowledgeGovernance recalcula scores
  ↓
[Sistema] → Outcome registrado (se aplicável)
  └── Memoria registrada ("evolucao")
```

### 12.4 Fluxo: Learning (Aprendizado Explícito)

```
[Empresário] → /dashboard/aprendizados
  ├── ConversationKnowledgeCard (lista aprendizados ativos)
  ├── QuickLearningQuestion (pergunta aleatória)
  └── LearningHistory (histórico completo)
  ↓
[Responde pergunta] → POST /api/aprendizados
  ├── Aprendizado (categoria, origem: PERGUNTA, ativo: true)
  ├── Memoria registrada ("aprendizado")
  └── IdentityService agora inclui no contexto
  ↓
[Assistente IA] → contextoParaAssistente()
  └── Inclui aprendizados como verdades estáveis
  ↓
[Empresário] → Desativa aprendizado → DELETE /api/aprendizados
  └── ativo: false (soft delete)
```

---

## 13. MAPA DOS CONTRATOS ENTRE MÓDULOS

### 13.1 Contratos Públicos (engine/index.ts)

```
// === DiagnosticContext ===
export { criarConversa, responder, carregarConversa, obterEstado, vincularConversa, obterRespostas }

// === CognitiveIdentityContext ===
export { construirIdentidade, obterIdentidade, interpretarRespostas, atualizarIdentidade }

// === KnowledgeContext ===
export { registrarEvidencia, consultarEvidencias, contagemPorCategoria }
export { analisarEvolucao, criarHipotese, atualizarEstadoHipotese, listarHipoteses, consultarMemoria, registrarNaMemoria, ultimasMudancas }
export { validarHipoteses, promoverConhecimento, enfraquecerConhecimento, descartarConhecimento, calcularConfiancaConhecimento, auditarConhecimento, obterConhecimentosAprovados }

// === LearningContext ===
export { adicionarAprendizado, listarAprendizados, contagemPorCategoria (as contagemAprendizados), aprendizadosParaContexto, aprendizadosRecentes, desativarAprendizado, obterPerguntasRapidas, obterPerguntaAleatoria, CATEGORIAS_APRENDIZADO, ORIGENS_APRENDIZADO }

// === SignalContext ===
export { gerarSinais, ordenarPorUrgencia }

// === DecisionContext ===
export { gerarDecisoes, melhorDecisao, registrarExecucaoDecisao }
export { criarAcao, atualizarStatusAcao, registrarResultadoAcao, listarAcoesAtivas, analisarImpacto, listarHistoricoAcoes }

// === FeedbackContext ===
export { registrarFeedback, analisarResultadoAcao, listarFeedbackRecente, acoesSemFeedback, analisarAprendizados }
export { registrarOutcome, listarOutcomes, atualizarOutcome, calcularImpactoEmpresa, principaisOutcomes }

// === ActivationContext ===
export { registrarEventoAtivacao, calcularNivelAtivacao, obterJornadaFundador, rotuloNivel, descricaoNivel, corNivel }

// === Cognitive OS (Orchestrator + Observatory + Experience) ===
export { obterEstadoCognitivoCompleto, processarEvento, processarConversa, processarAcao, processarFeedback, processarOutcome, executarRotinaDiaria, executarRotinaSemanal, executarRotinaMensal }
export { obterResumoCognitivo, obterKnowledgeVaultMetrics, obterLearningMetrics, obterOSMetricsSummary, obterEvolutionMetricsSummary, obterAlertasGovernanca, obterMetricasConhecimento, obterEvolucaoDiaria }
export { createExperienceEngine }

// === Experience Types (contratos de UI) ===
export { HomeExperience, DashboardExperience, SidebarExperience, AssistenteExperience, LoginExperience, FinanceiroExperience, CRMExperience, ClientesExperience, ClienteExperience, TarefasExperience, HistoricoExperience, ImplantacoesExperience, ConfiguracoesExperience, ConhecimentoExperience, LearningExperience, EvolutionExperience, JourneyExperience, TimelineExperience }
```

### 13.2 Contratos entre Contextos (eventos)

```
// Contrato: DiagnosticContext → CognitiveIdentityContext
interface OnDiagnosticoCompleto {
  empresaId: string
  respostas: Record<string, string | null>
  interpretacoes: Interpretacoes
}

// Contrato: CognitiveIdentityContext → KnowledgeContext
interface OnIdentidadeEvoluida {
  empresaId: string
  conhecimentos: ConhecimentoDaIdentidade[]
  crencas: CrencaDaIdentidade[]
  lacunas: LacunaDaIdentidade[]
  versao: number
}

// Contrato: FeedbackContext → KnowledgeContext
interface OnFeedbackRegistrado {
  empresaId: string
  acaoId: string
  tipoFeedback: TipoFeedback
  categorias: string[]  // categorias impactadas
  confiancaAnterior: number
}

// Contrato: LearningContext → CognitiveIdentityContext
interface OnAprendizadoRegistrado {
  empresaId: string
  aprendizadoId: string
  descricao: string
  categoria: CategoriaAprendizado
}

// Contrato: SignalContext → DecisionContext
interface OnSinalGerado {
  empresaId: string
  dominio: DominioSinal
  urgencia: UrgenciaSinal
  titulo: string
  descricao: string
}
```

---

## 14. LAYER ARCHITECTURE (Clean Architecture)

```
┌─────────────────────────────────────────────────────────────────────┐
│                      PRESENTATION LAYER                              │
│                                                                      │
│  Next.js Pages (app router)   |   React Components   |  Client      │
│  API Routes (mutations)       |   Server Components  |  State       │
│                                                                      │
│  Depende de: Application Layer (via engine/index.ts exports)        │
└─────────────────────────────────────────────────────────────────────┘
          │ depende de
          ▼
┌─────────────────────────────────────────────────────────────────────┐
│                      APPLICATION LAYER                                │
│                                                                      │
│  Services (engine/*.ts)    |   DTOs/Types        |  Orchestrator    │
│  Experience Engine (ACL)   |   Event Publishers  |  Rotinas         │
│                                                                      │
│  Depende de: Domain Layer (regras) + Infrastructure (repos)         │
└─────────────────────────────────────────────────────────────────────┘
          │ depende de
          ▼
┌─────────────────────────────────────────────────────────────────────┐
│                        DOMAIN LAYER                                   │
│                                                                      │
│  Entities (Aggregates)   |   Value Objects  |   Domain Events       │
│  Domain Services         |   Rules/Business  |   Repository Ports   │
│                                                                      │
│  Zero dependência externa (sem Prisma, sem React, sem Next)        │
└─────────────────────────────────────────────────────────────────────┘
          │ depende de
          ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    INFRASTRUCTURE LAYER                                │
│                                                                      │
│  Prisma (ORM)      |   Supabase Auth     |   Anthropic AI          │
│  PostgreSQL        |   RLS Policies      |   Rate Limiter          │
│  Repository Impls  |   PrismaTenantSafe  |   Cache/Metrics         │
│                                                                      │
│  Implementa interfaces do Domain Layer (Repository ports)           │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 15. REGRAS DE ARQUITETURA PARA IMPLEMENTAÇÃO

### 15.1 Dependências Permitidas

```
API Route → Application Service ✓
Application Service → Domain Service ✓
Application Service → Infrastructure (Prisma) ✓ (ADR-002, ADR-004)
Domain Service → Repository Port (interface) ✓
Repository Port → Infrastructure Implementation ✓
Experience Engine → Cognitive Orchestrator ✓
Component → Experience Engine (via engine/index.ts) ✓

API Route → Prisma Direto ✗ (deve passar pelo service)
Component → Domain Service Direto ✗ (deve passar pela Experience Engine)
Domain Service → Infrastructure Direto ✗ (deve usar Repository Port)
Cross-context query sem tenant guard ✗
```

### 15.2 Naming Conventions

```
Arquivos:                kebab-case.ts
Classes/Tipos:          PascalCase
Funções/Variáveis:      camelCase
Constantes:             UPPER_SNAKE_CASE
Models Prisma:          PascalCase em português
Enums Prisma:           PascalCase em português
Tabelas (SQL):          snake_case (via @@map)
Rotas API:              /api/kebab-case
Páginas:                /kebab-case
Componentes React:      PascalCase.tsx
Hooks React:            useCamelCase.ts
```

### 15.3 Prisma Schema — Regras Obrigatórias

```
TODO model:
  id: String @id @default(cuid())
  empresaId: String              (se multi-tenant)
  criadoEm: DateTime @default(now())
  atualizadoEm: DateTime @updatedAt
  deletedAt: DateTime?           (soft delete — ainda faltando em alguns models)

TODO enum:
  @@map("nome_em_portugues")

TODO relação:
  onDelete: Cascade
  Índice composto: [empresaId, campoDeBusca]
```

---

> Este documento é a especificação formal para implementação. Qualquer divergência entre este documento e o código existente deve ser avaliada: se o código implementa algo não documentado aqui, pode ser simplificação aceita (Tipo B) ou débito técnico (Tipo C). Se este documento descreve algo que o código não implementa, pode ser visão futura (Tipo D). Registrar em `KNOWN_ISSUES.md` e perguntar antes de decidir.
