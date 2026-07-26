# Blueprint — Signal Engine

> **Programa 13 — Blueprint de Implementação**
> Arquivos: `signal-engine.ts`, `clientes.sinais.ts`, `tarefas.sinais.ts`, `financeiro.sinais.ts`, `tipos.ts` (parcial)
> Dependências: `prisma-tenant-safe`, `evidence-engine`, `historico-sinal.service`
> Criticidade: **Crítica**

---

## 1. Responsabilidade

Capturar, filtrar, distribuir e ponderar sinais — estímulos brutos que indicam mudanças no estado da empresa. Sinais são a matéria-prima do raciocínio cognitivo.

---

## 2. Papel dentro do Sistema Cognitivo

**Onde entra:** Gerado por detectores de domínio (`clientes.sinais.ts`, `tarefas.sinais.ts`, `financeiro.sinais.ts`) que varrem dados operacionais. Também chamado pelo pipeline cognitivo completo (posição 10 no ciclo).

**Onde termina:** Sinais processados são registrados em `HistoricoSinal` e retornados como `Sinal[]` para o Orchestrator. Sinais alimentam o `cognitive-context-engine` e o `cognitive-notification-engine`.

---

## 3. Dependências

### Quem chama a Signal Engine

| Quem | Função | Quando |
|------|--------|--------|
| `cognitive-context-engine` | `gerarSinaisClientes()`, `gerarSinaisTarefas()`, `gerarSinaisFinanceiro()` | Montagem de contexto |
| `cognitive-orchestrator` | `gerarSinais()` (via barrel) | Pipeline principal |
| `app/(dashboard)/dashboard/page.tsx` | `consultarSinais()` | Dashboard |

### Quem a Signal Engine chama

| Componente | Quando |
|------------|--------|
| `prisma-tenant-safe` | Buscar dados de clientes, tarefas, transações |
| `evidence-engine` | `contagemPorCategoria()` — categorizar sinais |
| `tipos.ts` | `ordenarPorUrgencia()`, `compactarSinais()` |

### Quem nunca pode chamar

- **Services** (Lei 1)
- **Componentes React diretamente** (só via hook ou Server Component)

---

## 4. Contratos

### 4.1 Tipos Principais

```typescript
interface Sinal {
  id: string;
  dominio: DominioSinal;       // "FINANCEIRO" | "CLIENTES" | "TAREFAS"
  urgencia: UrgenciaSinal;     // "alta" | "media" | "baixa"
  titulo: string;
  descricao: string;
  motorOrigem: string;
  metadata?: Record<string, unknown>;
  timestamp: Date;
}

type DominioSinal = 'FINANCEIRO' | 'CLIENTES' | 'TAREFAS';
type UrgenciaSinal = 'alta' | 'media' | 'baixa';
```

### 4.2 Funções Públicas

```typescript
// Motor principal
function gerarSinais(empresaId: string): Promise<Sinal[]>;
// Filtragem (pure function)
function filtrarSinais(sinais: Sinal[], filtro?: FiltroSinal): Sinal[];
// Distribuição (pure function)
function distribuirPorDominio(sinais: Sinal[]): DistribuicaoDominio[];
// Consultas ao banco
function consultarSinais(empresaId: string, filtro?: FiltroSinal): Promise<Sinal[]>;
function consultarEstatisticas(empresaId: string): Promise<{ total: number; porUrgencia: Record<string, number> }>;
function consultarDistribuicao(empresaId: string): Promise<DistribuicaoDominio[]>;
function consultarHistorico(empresaId: string, filtro?: FiltroHistorico): Promise<SinalHistorico[]>;
```

### 4.3 Detectores de Domínio

```typescript
// clientes.sinais.ts
function gerarSinaisClientes(empresaId: string): Promise<Sinal[]>;
// Detecta: clientes inativos, inadimplentes, aniversariantes, sem contato recente

// tarefas.sinais.ts
function gerarSinaisTarefas(empresaId: string): Promise<Sinal[]>;
// Detecta: tarefas atrasadas, tarefas de hoje, alta prioridade

// financeiro.sinais.ts
function gerarSinaisFinanceiro(empresaId: string): Promise<Sinal[]>;
// Detecta: contas a vencer, transações vencidas, fluxo de caixa negativo
```

### 4.4 Eventos

Nenhum. Sinais são consultados (pull), não emitidos (push).

### 4.5 Persistência

```prisma
model HistoricoSinal {
  id            String   @id
  empresaId     String
  motorOrigem   String
  sinalId       String
  dominio       String
  urgencia      String
  titulo        String
  descricao     String?
  dadosOriginais Json?
  metadata      Json?
  criadoEm      DateTime
  deletedAt     DateTime?
}
```

### 4.6 Cache

Nenhum. Sinais são sempre frescos (consultam banco em tempo real).

---

## 5. Fluxo Interno

### 5.1 Geração de Sinais

```
1. Chamar detectores de domínio em paralelo:
   ├─ gerarSinaisClientes(empresaId)
   ├─ gerarSinaisTarefas(empresaId)
   └─ gerarSinaisFinanceiro(empresaId)
2. Cada detector consulta prismaSeguro para dados brutos
3. Cada detector aplica regras de domínio para produzir Sinal[]
4. Sinais são mesclados em um array único
5. Sinais são ordenados por urgência (ordenarPorUrgencia)
6. Sinais são compactados (remover duplicatas de mesmo domínio + título)
7. Cada sinal é registrado em HistoricoSinal (historico-sinal.service)
8. Retornar Sinal[] para o chamador
```

### 5.2 Regras por Detector

**Clientes:**
- Cliente com `status = INADIMPLENTE` → sinal ALTA
- Cliente sem `proximoContato` há 30+ dias → sinal MÉDIA
- Cliente com `status = INATIVO` → sinal BAIXA

**Tarefas:**
- Tarefa com `status != CONCLUIDA` e `dataVencimento < hoje` → sinal ALTA
- Tarefa com `prioridade = URGENTE` e `status != CONCLUIDA` → sinal ALTA
- Mais de 10 tarefas pendentes → sinal MÉDIA

**Financeiro:**
- Transação com `status = VENCIDO` → sinal ALTA
- Transação com `status = PENDENTE` e `dataVencimento < hoje` → sinal ALTA
- Total de despesas vencidas > R$ 1.000 → sinal MÉDIA
- Transação a vencer nos próximos 7 dias → sinal BAIXA

---

## 6. Casos Extremos

| Caso | Comportamento |
|------|--------------|
| **Nenhum dado no banco** | Retorna array vazio |
| **Erro em um detector** | Detectores rodam independentemente — falha em um não afeta os outros |
| **Muitos sinais** | `compactarSinais` agrupa por domínio+título para evitar duplicatas |
| **empresaId inválido** | Prisma retorna zero registros → array vazio |

---

## 7. Critérios de Aceite

1. `gerarSinais(empresaId)` executa todos os 3 detectores e mescla resultados
2. Cada detector produz sinais com base nas regras especificadas
3. Sinais são registrados em `HistoricoSinal`
4. `filtrarSinais` filtra por domínio e urgência mínima
5. `distribuirPorDominio` agrupa corretamente

---

## 8. Critérios de Teste

### Unitário

- `filtrarSinais` com filtro vazio → retorna todos
- `filtrarSinais` com filtro de domínio → retorna apenas do domínio
- `distribuirPorDominio` com 3 domínios → 3 entradas
- `compactarSinais` com duplicatas → array deduplicado

### Integração

- `gerarSinais(empresaId)` com dados reais → sinais nos 3 domínios
- `consultarSinais` com filtro → resultados filtrados
- Sinal registrado → aparece em `consultarHistorico`

### Carga

- 10.000 clientes + 10.000 tarefas + 10.000 transações → geração < 2s

---

## 9. Observabilidade

### Logs

| Evento | Nível |
|--------|-------|
| Detectores executados | `debug` |
| Nenhum sinal gerado | `debug` |
| Detector falhou | `warn` |

### Métricas

- `signal.sinais.gerados` — contador por domínio
- `signal.sinais.por_urgencia` — contador por nível
- `signal.detector.duracao_ms` — histograma por detector

---

## 10. Evolução Futura

### Pode crescer

- Novos detectores (mercado, operação, pessoas)
- Machine learning para detecção de anomalias sutis
- Sinais de fontes externas (bancos, ERPs)

### Nunca deve mudar

- Interface de detector: `function gerarSinais<Dominio>(empresaId: string): Promise<Sinal[]>`
- Formato de `Sinal` (dominio, urgencia, titulo, descricao)
- `ordenarPorUrgencia` — usado pelo Context Engine
- Registro em `HistoricoSinal` — audit trail
