# Blueprint — Event Bus Cognitivo

> **Programa 13 — Blueprint de Implementação**
> Arquivos: `cognitive-bus.ts`, `event-publisher.ts`, `event-subscriber.ts`, `event-store.ts`, `dead-letter-queue.ts`, `retry-policy.ts`, `event-catalog.ts`
> Dependências: `prisma-tenant-safe`, `app-errors`, `logger`
> Criticidade: **Crítica**
> ADRs: ADR-011, ADR-012, ADR-027

---

## 1. Responsabilidade

Barramento de eventos cognitivos interno — pub/sub síncrono in-memory com persistência opcional, retry, dead letter e correlation ID obrigatório.

---

## 2. Papel dentro do Sistema Cognitivo

**Onde entra:** Inicializado no bootstrap do sistema (`engine/index.ts` → `_initSubs()` + `_initPipes()`). Toda engine que precisa se comunicar com outra sem acoplamento direto usa o Event Bus.

**Onde termina:** Eventos são processados por subscribers registrados. Se um subscriber falha após todas as tentativas, o evento vai para dead letter.

---

## 3. Dependências

### Quem usa o Event Bus

| Componente | Como usa |
|------------|----------|
| `engine/index.ts` | Inicializa subscribers e pipelines |
| `cognitive-orchestrator.ts` | Publica eventos via `event-store` |
| `event-publisher.ts` | Sdk para publicar eventos |
| `event-subscriber.ts` | Sdk para assinar eventos |
| `engine/pipelines/*.ts` | Registram handlers de pipeline |
| `engine/subscribers/*.ts` | Registram handlers de evento |

### Quem o Event Bus chama

| Componente | Quando |
|------------|--------|
| `prisma-tenant-safe` | Persistir eventos (event-store) |
| `logger` | Logar publicações/falhas |
| `app-errors` | Erros de validação |

### Quem nunca pode chamar o Event Bus

- **Services** (`services/`) — eventos são internos do motor cognitivo
- **API Routes** — eventos publicados apenas por engines
- **Componentes React** — frontend não publica eventos diretamente

---

## 4. Contratos

### 4.1 Interface do Event Bus

```typescript
interface EventBus {
  on<T>(eventType: string, handler: TipoHandlerEvento<T>): void;
  off<T>(eventType: string, handler: TipoHandlerEvento<T>): void;
  emit<T>(evento: EventoPonteDigital<T>): Promise<void>;
  use(middleware: MiddlewareEvento): void;
}

interface EventoPonteDigital<T = unknown> {
  eventId: string;            // UUID v7
  eventType: string;          // ex.: "EmpresaCriada"
  aggregateId: string;        // ex.: empresaId
  aggregateType: string;      // ex.: "Empresa"
  version: number;            // sempre 1 na V4 Founder
  occurredAt: Date;
  data: T;
  metadata: MetadadosEvento;
}

interface MetadadosEvento {
  tenantId: string;           // empresaId (inconsistência: usar tenantId)
  correlationId: string;      // UUID v7 (obrigatório — ADR-027)
  causationId?: string;       // evento que causou este
}

type TipoHandlerEvento<T = unknown> = (evento: EventoPonteDigital<T>) => void | Promise<void>;

interface MiddlewareEvento {
  (evento: EventoPonteDigital, next: () => Promise<void>): Promise<void>;
}
```

### 4.2 Event Publisher

```typescript
interface EventPublisher {
  publicar<T>(evento: EventoPonteDigital<T>): Promise<void>;
  publicarEPersistir<T>(evento: EventoPonteDigital<T>): Promise<void>;
}
```

### 4.3 Event Subscriber

```typescript
interface EventSubscriber {
  assinar<T>(eventType: string, handler: TipoHandlerEvento<T>): void;
  cancelar<T>(eventType: string, handler: TipoHandlerEvento<T>): void;
}
```

### 4.4 Dead Letter Queue

```typescript
interface DeadLetterQueue {
  adicionar(evento: EventoPonteDigital, erro: Error): Promise<void>;
  reprocessar(dlqId: string): Promise<void>;
  listar(filtros?: { empresaId?: string; eventType?: string }): Promise<DeadLetter[]>;
  estatisticas(): Promise<{ total: number; porTipo: Record<string, number> }>;
}
```

### 4.5 Catálogo de Eventos

```typescript
// Namespaces (definidos em event-catalog.ts)
EVENTOS_NEGOCIO = ['EmpresaCriada', 'ClienteCriado', 'LeadConvertido', ...];
EVENTOS_COGNITIVOS = ['ContextoAtualizado', 'DecisaoTomada', 'AcaoCriada', ...];
EVENTOS_ENTRADA = ['SinalRecebido', 'FeedbackRegistrado', ...];
EVENTOS_SAIDA = ['OutcomeObservado', ...];
EVENTOS_JORNADA = ['EtapaCompletada', ...];
EVENTOS_PIPELINE = ['PipelineIniciado', 'PipelineCompleto', ...];
EVENTOS_CICLO = ['CicloIniciado', 'CicloCompleto', ...];
```

### 4.6 Persistência

```prisma
model Event {
  id            String   @id
  eventType     String
  aggregateId   String
  aggregateType String
  tenantId      String          // anomalia: deveria ser empresaId
  correlationId String
  causationId   String?
  version       Int
  payload       Json
  metadata      Json?
  status        EventStatus     // PENDENTE | PROCESSADO | FALHA
  occurredAt    DateTime
  criadoEm      DateTime
  processadoEm  DateTime?
  tentativas    Int
  deletedAt     DateTime?
}

model DeadLetter {
  id            String   @id
  eventId       String?
  eventType     String
  aggregateId   String
  aggregateType String
  tenantId      String          // anomalia: deveria ser empresaId
  correlationId String
  handlerName   String
  payload       Json
  errorName     String
  errorMessage  String
  error         String
  stack         String?
  tentativas    Int
  occurredAt    DateTime
  failedAt      DateTime
  criadoEm      DateTime
  deletedAt     DateTime?
}
```

### 4.7 Cache

Nenhum. Eventos não são cacheados (são processados em tempo real).

---

## 5. Fluxo Interno

### 5.1 Publicação de Evento

```
1. EventPublisher.publicar(evento)
2. Validar evento (eventType, aggregateId, correlationId obrigatórios)
3. Se persistente: salvar Event no banco (status: PENDENTE)
4. EventBus.emit(evento)
5. Middleware chain executada (logging, telemetria)
6. Handlers registrados para eventType são chamados em ordem
7. Se persistente: atualizar Event status para PROCESSADO
8. Se handler falha: registrar tentativa, aplicar retry policy
9. Se excede tentativas: mover para DeadLetter
```

### 5.2 Retry Policy

```typescript
// Configuração (retry-policy.ts)
interface RetryConfig {
  maxTentativas: number;        // 3
  backoffBaseMs: number;        // 1000
  backoffMultiplier: number;    // 2
  timeoutMs: number;            // 30000
}
```

---

## 6. Casos Extremos

| Caso | Comportamento |
|------|--------------|
| **Handler lança exceção** | Tentativa registrada, retry com backoff |
| **Todas as tentativas falham** | Evento movido para DeadLetter |
| **Evento sem handler registrado** | Evento é publicado mas não processado (log warn) |
| **EventEmitter morre (restart)** | Eventos in-memory perdidos. Eventos persistidos são reconstruídos |
| **correlationId ausente** | Gerado automaticamente (randomUUID) |
| **Payload inválido** | EventPublisher lança EventValidationError |

---

## 7. Critérios de Aceite

1. `EventBus.emit(evento)` chama todos os handlers registrados para `eventType`
2. `EventPublisher.publicarEPersistir(evento)` salva no banco ANTES de emitir
3. `DeadLetterQueue.adicionar(evento, erro)` persiste evento com falha
4. `DeadLetterQueue.reprocessar(dlqId)` re-publica evento da DLQ
5. Middleware chain é executada na ordem correta
6. Retry policy segue backoff exponencial configurado

---

## 8. Critérios de Teste

### Unitário

- `EventBus.on/emit/off` — subscription/unsubscription funciona
- `EventPublisher.publicar` — chama EventBus.emit
- `DeadLetterQueue.adicionar` — persiste com dados corretos
- Retry policy — backoff calculado corretamente

### Integração

- Evento publicado → handler chamado → evento persistido
- Evento com falha → retry 3x → DeadLetter
- DLQ reprocessar → evento re-publicado → handler chamado

### Carga

- 1000 eventos/s sem perda (in-memory)
- 100 eventos/s com persistência

---

## 9. Observabilidade

### Logs

| Evento | Nível |
|--------|-------|
| Evento publicado | `debug` |
| Handler chamado | `debug` |
| Handler falhou (tentativa N) | `warn` |
| Todas tentativas exauridas | `error` |
| Dead letter criada | `error` |

### Métricas

- `eventbus.eventos.publicados` — contador por tipo
- `eventbus.eventos.processados` — contador por tipo
- `eventbus.eventos.falhas` — contador por handler
- `eventbus.dlq.total` — gauge

---

## 10. Evolução Futura

### Pode crescer

- Substituir EventEmitter por Bull/PgBoss (fila persistente)
- Kafka/RabbitMQ para escala horizontal (100k+ empresas)
- Schema registry para validar payload de eventos
- Event sourcing para reconstruir estado

### Nunca deve mudar

- Interface `EventBus` (on/off/emit/use) — consumidores dependem dela
- Formato de `EventoPonteDigital` (eventId, eventType, aggregateId, metadata)
- `correlationId` obrigatório em todo evento (ADR-027)
- Separação entre Publisher e Bus
