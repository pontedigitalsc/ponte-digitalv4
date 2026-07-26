# Arquitetura da Execução Assíncrona

> **Programa 12 — Fase 4: Sistema Cognitivo Completo (Nível Sistema Operacional)**
> Versão: 1.0
> Propósito: Projetar filas, retry, dead letters, background jobs e consistência eventual

---

## Preâmbulo

Nem toda execução no sistema cognitivo é síncrona. Decisões produzem ações que levam horas ou dias para serem concluídas. Ciclos agendados rodam em background. Aprendizado depende de resultados que ainda não aconteceram.

Este documento projeta a arquitetura de execução assíncrona: como tarefas longas e curtas são enfileiradas, priorizadas, canceladas, retentadas e, quando necessário, enviadas para dead letter.

A execução assíncrona é o que permite ao Motor Cognitivo processar milhares de empresas em paralelo sem bloquear o ciclo principal.

---

## Seção 1 — Tipos de Tarefa

### 1.1 Classificação por Duração

| Tipo | Duração | Exemplos | Engine Responsável |
|:----:|:-------:|----------|:------------------:|
| Instantânea | < 100ms | Percepção, Registro de sinal | perception, memory |
| Curta | 100ms - 2s | Ciclo cognitivo completo (1 empresa) | orchestrator |
| Média | 2s - 30s | Ciclo noturno (condensação, arquivamento) | ritmo, memory |
| Longa | 30s - 24h | Acompanhamento de plano, validação de resultado | action, learning |
| Background | Ilimitado | Ciclo noturno batch, aprendizado coletivo | ritmo, collective |

### 1.2 Classificação por Prioridade

| Prioridade | Tempo Máximo na Fila | Onde Executa |
|:----------:|:--------------------:|:------------:|
| CRÍTICA | Imediato (preempta) | Thread principal |
| ALTA | < 1s | Thread principal |
| NORMAL | < 10s | Thread principal ou background worker |
| BAIXA | < 60s | Background worker |
| BACKGROUND | Próximo ciclo noturno | Background worker |

---

## Seção 2 — Arquitetura de Filas

### 2.1 Filas do Sistema

O sistema mantém 3 filas de processamento:

```
                        ┌──────────────────────┐
                        │                      │
    Estímulo Externo ──►│ FILA DE CICLOS       │──► cognitive-orchestrator
                        │ (por empresa)        │
                        │                      │
                        └──────────────────────┘
                                   │
                                   ▼
                        ┌──────────────────────┐
                        │                      │
                        │ FILA DE AÇÕES        │──► action-engine
                        │ (por resultado)      │
                        │                      │
                        └──────────────────────┘
                                   │
                                   ▼
                        ┌──────────────────────┐
                        │                      │
                        │ FILA DE BACKGROUND   │──► ritmo-engine
                        │ (noturna, semanal)   │
                        │                      │
                        └──────────────────────┘
```

### 2.2 Fila de Ciclos

**Função:** Armazenar estímulos aguardando processamento pelo cognitive-orchestrator.

**Estrutura:**
```typescript
interface FilaCiclos {
  fila: {
    empresaId: string;
    estimulo: Estimulo;
    prioridade: 'CRITICA' | 'ALTA' | 'NORMAL' | 'BAIXA';
    criadoEm: string;
    timeoutEm: string; // 30s após criação
    tentativas: number;
  }[];
}
```

**Regras:**
- Máximo 1 ciclo por empresa na fila (deduplicação por empresaId)
- Se novo estímulo chega para empresa já na fila, o de maior prioridade substitui
- Timeout de 30s — se o ciclo não começar em 30s, é reclassificado como BAIXA
- Após 3 tentativas, move para dead letter

### 2.3 Fila de Ações

**Função:** Armazenar ações (acompanhamento de tarefas, planos) que precisam de verificação periódica.

**Estrutura:**
```typescript
interface FilaAcoes {
  fila: {
    acaoId: string;
    empresaId: string;
    tipo: 'ACOMPANHAMENTO_TAREFA' | 'ACOMPANHAMENTO_PLANO' | 'REVALIDACAO';
    proximaVerificacao: string; // quando verificar novamente
    intervaloSegundos: number; // frequência de verificação
    criadoEm: string;
    tentativas: number;
  }[];
}
```

**Regras:**
- Verificada a cada heartbeat (60s) — ações com `proximaVerificacao` vencida são processadas
- Intervalo mínimo entre verificações: 1 hora para tarefas, 1 dia para planos
- Após 3 verificações sem progresso → notificar empresário
- Após 10 verificações sem progresso → mover para dead letter

### 2.4 Fila de Background

**Função:** Armazenar jobs agendados (ciclo noturno, condensação, aprendizado coletivo).

**Estrutura:**
```typescript
interface FilaBackground {
  jobs: {
    tipo: 'CICLO_NOTURNO' | 'CONDENSACAO_MEMORIA' | 'APRENDIZADO_COLETIVO' | 'REVALIDACAO_GLOBAL';
    empresaId?: string; // se aplicável
    agendadoPara: string;
    janelaExecucao: string; // "00:00-04:00"
    criadoEm: string;
    tentativas: number;
    maxTentativas: number;
  }[];
}
```

**Regras:**
- Jobs são criados pelo ritmo-engine com base em CicloConfiguracao
- Janela de execução evita sobrecarga (ex.: ciclo noturno apenas entre 00:00-04:00)
- Jobs falhos são retentados na próxima janela
- Após `maxTentativas` falhas, job é movido para dead letter

---

## Seção 3 — Prioridades

### 3.1 Escalonamento de Filas

O escalonador (parte do cognitive-orchestrator) decide qual fila processar:

```
1. Processar fila de ciclos primeiro
   ├── CRÍTICA: imediato (preempta processo atual)
   ├── ALTA: antes de qualquer BACKGROUND
   ├── NORMAL: após ALTA
   └── BAIXA: se não há NORMAL
2. Processar fila de ações (verificações vencidas)
   ├── ACOMPANHAMENTO_URGENTE (prazo próximo): alta prioridade
   └── ACOMPANHAMENTO_NORMAL: após fila de ciclos
3. Processar fila de background
   └── Se nenhuma fila de ciclo ou ação tem itens pendentes
```

### 3.2 Starvation Prevention

Para evitar que tarefas BAIXA nunca sejam processadas:

- Tarefa BAIXA que espera > 60s sobe para NORMAL
- Tarefa BACKGROUND que espera > 5min sobe para BAIXA
- Mínimo de 10% do tempo de processamento dedicado a BACKGROUND

---

## Seção 4 — Reativação

### 4.1 Reativação de Tarefa

Uma tarefa é reativada quando:

1. O empresário faz login após período de inatividade → ações pendentes são reavaliadas
2. O prazo de uma ação está próximo (24h) → ação reativada para acompanhamento
3. Nova evidência relacionada a uma ação pendente chega → ação reativada para reconsideração

### 4.2 Reativação de Ciclo

Um ciclo pausado (preempção) é reativado automaticamente após o ciclo preemptor concluir:

```
1. Orchestrator salva estado do ciclo pausado (estágio atual + dados acumulados)
2. Ciclo preemptor executa e conclui
3. Orchestrator carrega estado salvo
4. Ciclo retoma do estágio onde parou
5. Se ciclo pausado excedeu 60s desde a pausa → reiniciar do estágio 01
```

---

## Seção 5 — Cancelamento

### 5.1 Cancelamento de Tarefa na Fila

Uma tarefa na fila pode ser cancelada:

| Motivo | Ação |
|--------|------|
| Sinal cancelado pelo empresário | Remover da fila |
| Ciclo da empresa expirou (timeout) | Remover da fila |
| Empresa cancelou plano | Remover todas as tarefas da empresa |
| Prioridade mais alta substituiu | Substituir na fila (a antiga é descartada) |

### 5.2 Cancelamento de Job Background

Jobs background podem ser cancelados:
- Se o ciclo noturno já rodou hoje para esta empresa → não re-agendar
- Se a empresa foi cancelada → remover todos os jobs
- Se o job falhou `maxTentativas` vezes → mover para dead letter (não cancelar, registrar)

---

## Seção 6 — Retry

### 6.1 Política de Retry

| Tipo de Falha | Retry | Backoff | Máximo |
|:-------------:|:-----:|:-------:|:------:|
| Timeout de engine | 3x | 1s, 2s, 4s | 3 |
| Erro de banco (transitório) | 3x | 1s, 2s, 4s | 3 |
| Erro de banco (permanente) | 0 | — | 0 (dead letter) |
| Erro de validação (hipótese refutada) | 0 | — | 0 (não retentar) |
| Timeout de IA | 2x | 2s, 5s | 2 |
| Erro de negócio (plano rejeitado) | 0 | — | 0 (registrar aprendizado) |
| Falha de ciclo noturno | 3x | Próxima noite | 3 |

### 6.2 Retry por Estágio do Ciclo

| Estágio | Retry? | Comportamento |
|:-------:|:------:|:--------------|
| 01 | Sim | Re-processar estímulo (se hash não mudou, dedup bloqueia) |
| 02 | Não | Usar último contexto válido (stale) |
| 03 | Parcial | Processar detectores que funcionaram, ignorar falhos |
| 04 | Não | Pular formulação de hipóteses |
| 05 | Não | Manter hipótese EM_OBSERVAÇÃO |
| 06 | Sim | Re-tentar decisão (se hipóteses mudaram, recalcular) |
| 07 | Sim | Re-tentar execução |
| 08 | CRÍTICO | Retry com backoff (1s, 2s, 4s, 8s, 16s — 5x) |
| 09 | Sim | Próximo ciclo (resultado não expira) |
| 10 | Não | Próximo ciclo corrige |

---

## Seção 7 — Dead Letters

### 7.1 O que vai para Dead Letter

| Critério | Exemplo |
|----------|---------|
| Timeout excedeu max retries | Engine não responde após 3 tentativas |
| Erro permanente de banco | Tabela não existe, constraint violada |
| Dados inválidos | Sinal com hash corrompido |
| Ciclo falhou 3x consecutivas | Mesmo correlationId falhou 3x |
| Job background falhou maxTentativas | Ciclo noturno falhou 3 noites |

### 7.2 Estrutura da Dead Letter

```typescript
interface DeadLetterEntry {
  id: string;
  tipo: 'CICLO' | 'ACAO' | 'JOB' | 'EVENTO';
  origem: string; // engine que gerou
  correlationId: string;
  empresaId?: string;
  dados: unknown; // payload original
  erro: string; // mensagem de erro
  tentativas: number;
  criadoEm: string;
  resolvidoEm?: string;
  status: 'PENDENTE' | 'EM_ANALISE' | 'RESOLVIDO' | 'IGNORADO';
}
```

### 7.3 Tratamento de Dead Letters

| Tipo | Tratamento | Responsável |
|:----:|:----------:|:-----------:|
| CICLO | Re-processar manualmente ou aguardar novo estímulo | Admin |
| ACAO | Notificar admin se ação é crítica | Sistema |
| JOB | Re-agendar na próxima janela | Ritmo-engine |
| EVENTO | Ignorar (evento perdido não afeta consistência) | Sistema |

---

## Seção 8 — Consistência Eventual

### 8.1 Onde a Consistência Eventual é Aceitável

| Operação | Janela de Inconsistência | Justificativa |
|----------|:------------------------:|:-------------:|
| Aprendizado coletivo | 24h | Ciclo noturno processa batch |
| Condensação de memória | 24h | Ciclo noturno |
| Atualização de contexto | 5min | TTL de cache |
| Métricas de saúde | 1h | Heartbeat |
| Padrão coletivo | 7 dias | Significância estatística |

### 8.2 Onde a Consistência é IMEDIATA

| Operação | Garantia |
|----------|:--------:|
| Persistência de patrimônio | Escrita síncrona no banco |
| Registro de sinal | Escrita síncrona |
| Decisão | Baseada em contexto imutável (mesmo que stale) |
| Ação (intervenção) | Execução imediata no banco |

### 8.3 Mecanismo de Consistência Eventual

```
Estado A (atual) → Operação assíncrona → Estado B (futuro)
                          │
                          ├── Se operação falha → Estado A permanece (seguro)
                          └── Se operação sucede → Estado B (consistente)
```

A consistência eventual nunca retrocede — ou o estado avança para B ou permanece em A. Não há estado intermediário inconsistente.

---

## Seção 9 — Background Jobs

### 9.1 Jobs Recorrentes

| Job | Frequência | Janela | Engine | Processa |
|:---:|:----------:|:------:|:------:|----------|
| Ciclo noturno | Diário | 00:00-04:00 | ritmo + orchestrator | Revalidação, condensação |
| Condensação de memória | Diário | 00:00-04:00 | memory + forgetting | Short→Long→Archived |
| Aprendizado coletivo | Semanal | Domingo 02:00 | learning + collective | Extrair padrões anônimos |
| Revalidação de conhecimento | Mensal | Dia 1 02:00 | validation | Conhecimento > 90 dias |
| Métricas de saúde | Horário | A cada hora | heritage | Atualizar scores |
| Poda de hipóteses | Diário | 02:00 | hypothesis | Arquivar excesso de 7/domínio |

### 9.2 Agendamento

Jobs são agendados pelo ritmo-engine com base na configuração de cada empresa:

```typescript
interface CicloConfiguracao {
  empresaId: string;
  frequenciaNoturna: boolean; // padrão: true
  frequenciaSemanal: boolean; // padrão: true
  frequenciaMensal: boolean;  // padrão: true
  janelaNoturna: string; // "00:00-04:00"
  ativo: boolean;
}
```

### 9.3 Execução Segura

Cada job background roda em contexto isolado:
- Empresa é "travada" para evitar processamento simultâneo
- Falha em uma empresa não afeta as demais
- Timeout por empresa: 30s (se exceder, empresa é pulada)
- Progresso é registrado: `{ empresaId, job, status, inicio, fim, erro? }`

---

## Seção 10 — Descobertas, Pressupostos, Lacunas, Riscos

### Descobertas

1. A execução assíncrona da Ponte Digital não precisa de Kafka ou RabbitMQ. EventEmitter + banco (event-store) resolvem para o volume atual.
2. O maior desafio não é a fila — é o retry. Saber quando retentar e quando desistir exige regras claras por tipo de falha.
3. Dead letter é um mecanismo de segurança, não de operação normal. Se muitas tarefas vão para dead letter, algo está errado.

### Pressupostos

1. **P1:** Máximo de 3 retries por operação é suficiente para falhas transitórias.
2. **P2:** Janela de 4 horas (00:00-04:00) é suficiente para processar todas as empresas ativas.
3. **P3:** Consistência eventual de 24h para aprendizado coletivo é aceitável.

### Lacunas

1. **L1:** O mecanismo de "travar empresa" para processamento simultâneo não foi especificado — como garantir que 2 processos não rodam para a mesma empresa ao mesmo tempo?
2. **L2:** A dead letter não especifica alerta para admin — quantas entradas na DL disparam notificação?
3. **L3:** Jobs background não têm SLA definido — quanto tempo o ciclo noturno pode levar para processar uma empresa?

### Riscos

1. **R1 — Acúmulo na fila de ciclos:** Se o throughput do orchestrator é menor que a taxa de chegada de estímulos, a fila cresce sem limite. Mitigação: timeout de 30s por item na fila.
2. **R2 — Dead letter overflow:** Se há um bug sistêmico, todas as empresas podem enviar tarefas para dead letter. Mitigação: alerta quando DL > 10% das tarefas do dia.
3. **R3 — Retry infinito:** Se a política de retry não for respeitada, uma tarefa pode ficar em loop. Mitigação: maxRetries = 3 para todo tipo (configurável).

### Conflitos

Nenhum conflito. A arquitetura de filas é consistente com o event-store existente e com a dead-letter-queue já implementada.

### Impacto Futuro

1. A separação em 3 filas permite escalar cada tipo de processamento independentemente.
2. A política de retry por tipo de falha evita desperdício de processamento em falhas não recuperáveis.
3. A dead letter garante que nenhuma tarefa é perdida — mesmo após falhas múltiplas.
