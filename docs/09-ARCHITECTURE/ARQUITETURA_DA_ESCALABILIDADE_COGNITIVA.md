# Arquitetura da Escalabilidade Cognitiva

> **Programa 12 — Fase 4: Sistema Cognitivo Completo (Nível Sistema Operacional)**
> Versão: 1.0
> Propósito: Projetar a evolução do sistema em 7 escalas — de 1 a 1 milhão de empresas

---

## Preâmbulo

A Ponte Digital foi projetada para escalar. Mas escalar não é apenas "mais servidores". Em cada escala, o comportamento do sistema muda: o que funciona para 10 empresas quebra para 1.000. O que funciona para 1.000 colapsa para 100.000.

Este documento projeta o sistema em 7 escalas, identificando em cada uma quais componentes precisam mudar, quais permanecem iguais, e quais são os gargalos que surgem.

A arquitetura atual (Fase V4 Founder) está na escala de 1-10 empresas. O plano de escalabilidade deve guiar a evolução até 1 milhão.

---

## Seção 1 — Mapa de Escalas

```
Escala 0:     1 empresa  ─── Prova de conceito
Escala 1:    10 empresas ─── Fase atual (V4 Founder)
Escala 2:   100 empresas ─── Primeiro gargalo de ciclo noturno
Escala 3: 1.000 empresas ─── Cache + fila precisam de revisão
Escala 4: 10.000 empresas ─── Event bus precisa de upgrade
Escala 5: 100.000 empresas ─── Banco relacional começa aLimit
Escala 6: 1.000.000 empresas ─── Arquitetura distribuída completa
```

---

## Seção 2 — Escala 0: 1 empresa (Prova de Conceito)

### 2.1 Arquitetura

```
1 servidor (Next.js)
├── Bancos: PostgreSQL (Supabase)
├── Cache: In-memory (lib/cache.ts)
├── Event Bus: EventEmitter
├── Engines: Todas no mesmo processo
└── Fila: Em memória (EventEmitter)
```

### 2.2 Performance

- Ciclo cognitivo: < 100ms
- Ciclo noturno: < 1s
- Armazenamento: < 100 MB
- LLM calls: < 100/dia

### 2.3 Limitações

Nenhuma. Tudo funciona perfeitamente para 1 empresa.

---

## Seção 3 — Escala 1: 10 empresas (Fase Atual — V4 Founder)

### 3.1 Arquitetura

Mesma da Escala 0.

### 3.2 Performance

- Ciclo cognitivo: < 200ms
- Ciclo noturno: < 5s (todas as empresas)
- Armazenamento: < 1 GB
- LLM calls: < 1.000/dia

### 3.3 Gargalos

| Gargalo | Impacto | Mitigação |
|:-------:|:-------:|:---------:|
| Ciclo noturno sequencial | 5s para 10 empresas | Aceitável — não requer mudança |
| Cache in-memory instância única | Perde cache se reiniciar | Aceitável — warm up pós-restart |
| Fila em memória | Perde fila se reiniciar | Aceitável — estímulos podem ser re-enviados |

### 3.4 Limites

- Cache in-memory: OK até ~100 empresas
- EventEmitter: OK até ~10 eventos/s
- Prisma conexões: OK (pool padrão)

---

## Seção 4 — Escala 2: 100 empresas

### 4.1 Mudanças Necessárias

| Componente | Mudança | Motivo |
|:----------:|:-------:|:------:|
| Ciclo noturno | Processamento paralelo (2-4 workers) | 50s sequencial é demais |
| Cache | TTL mais agressivo | Pressão de memória |
| Fila | Persistir fila em banco (event-store) | Evitar perda por restart |
| LLM | Rate limiting mais rigoroso | 10.000 chamadas/dia |

### 4.2 Performance Esperada

- Ciclo cognitivo: < 500ms (com cache working)
- Ciclo noturno: < 30s (com 4 workers paralelos)
- Armazenamento: < 10 GB
- LLM calls: ~10.000/dia

### 4.3 O que NÃO muda

- Instância única (Next.js roda 100 empresas sem problemas)
- Banco PostgreSQL (Supabase)
- Cache in-memory (ainda suficiente)
- Engines no mesmo processo

### 4.4 Gargalo Principal

**Ciclo noturno sequencial.** Se o ciclo noturno processa 100 empresas uma por uma a 500ms cada, leva 50s. Com paralelismo de 4 empresas por vez, cai para ~12s.

---

## Seção 5 — Escala 3: 1.000 empresas

### 5.1 Mudanças Necessárias

| Componente | Mudança | Motivo |
|:----------:|:-------:|:------:|
| Cache | Migrar de in-memory para Redis | Cache cross-instance |
| Workers | 2-4 instâncias do servidor | Processamento concorrente |
| Lock de empresa | Implementar lock distribído | Evitar processamento duplicado |
| Banco | Pool de conexões maior | 1.000 empresas simultâneas |
| Ciclo noturno | 10+ workers paralelos | Janela de 4h para 1.000 empresas |
| Dead letter | Monitoramento ativo | Volume maior de erros |

### 5.2 Performance Esperada

- Ciclo cognitivo: < 800ms
- Ciclo noturno: < 2h (janela de 4h)
- Armazenamento: < 100 GB
- LLM calls: ~100.000/dia

### 5.3 Novos Componentes

```
┌─────────────────────────────────────┐
│          Redis (Cache)               │
│   cache.ts passa a usar Redis       │
│   (interface inalterada)            │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│          Lock Distribído             │
│   EmpresaId → Redis lock            │
│   TTL: 30s (timeout de ciclo)       │
└─────────────────────────────────────┘
```

### 5.4 Gargalo Principal

**Cache in-memory não escala para múltiplas instâncias.** Cada instância teria seu próprio cache, resultando em dados inconsistentes. Migrar para Redis resolve.

---

## Seção 6 — Escala 4: 10.000 empresas

### 6.1 Mudanças Necessárias

| Componente | Mudança | Motivo |
|:----------:|:-------:|:------:|
| Event Bus | Migrar de EventEmitter para Redis Pub/Sub ou Kafka | Comunicação inter-instância |
| Banco | Read replicas para consultas de contexto | 10.000 empresas simultâneas |
| Ciclo noturno | 50+ workers | Janela de 4h para 10.000 empresas |
| Background jobs | Job scheduler dedicado (Bull/BullMQ) | 10.000 jobs agendados |
| LLM | Pool de chaves API + rate limit global | 1M chamadas/dia |
| Monitoramento | Dashboard de saúde cognitiva | Observabilidade em escala |

### 6.2 Performance Esperada

- Ciclo cognitivo: < 1.5s
- Ciclo noturno: < 3h (com 50 workers)
- Armazenamento: < 1 TB
- LLM calls: ~1.000.000/dia

### 6.3 Novos Componentes

```
┌─────────────────────────────────────┐
│          Kafka/Redis Pub/Sub         │
│   Substitui EventEmitter            │
│   Eventos persistem até consumo     │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│          Bull/BullMQ                 │
│   Job scheduler para background     │
│   Ciclo noturno, condensação, etc   │
└─────────────────────────────────────┘
```

### 6.4 Gargalo Principal

**EventEmitter.** Com 10.000 empresas publicando eventos, o EventEmitter in-memory não escala (perde eventos, sem garantia de entrega). Migrar para Kafka ou Redis Pub/Sub é necessário.

---

## Seção 7 — Escala 5: 100.000 empresas

### 7.1 Mudanças Necessárias

| Componente | Mudança | Motivo |
|:----------:|:-------:|:------:|
| Banco | Sharding por região ou por grupo de empresas | 10 TB de dados |
| Cache Redis | Cluster Redis (sharding) | 100.000 chaves de contexto |
| Workers | 100+ instâncias | Throughput de 100k empresas |
| Aprendizado coletivo | Batch processing (Spark ou similar) | Anonimizar 100k registros |
| Banco de conhecimento | Separate read replica para consultas cognitivas | Isolar carga de leitura |

### 7.2 Performance Esperada

- Ciclo cognitivo: < 2s
- Ciclo noturno: < 4h (janela de 4h — no limite)
- Armazenamento: ~10 TB
- LLM calls: ~10.000.000/dia

### 7.3 Gargalo Principal

**Banco relacional.** 100.000 empresas × 10.000 itens de memória cada = 1 bilhão de registros. Consultas de contexto começam a ficar lentas. Soluções:
- Sharding por grupo de empresas (ex.: 10.000 empresas por shard)
- Read replicas especializadas (uma para dados operacionais, uma para memória cognitiva)
- Cache Redis cluster para contexto (menos pressão no banco)

---

## Seção 8 — Escala 6: 1.000.000 de empresas

### 8.1 Mudanças Necessárias

| Componente | Mudança |
|:----------:|:-------:|
| Arquitetura | Totalmente distribuída — microsserviços por capacidade cognitiva |
| Orquestração | Orchestrator vira serviço independente |
| Percepção | Serviço dedicado (recebe estímulos, enfileira) |
| Análise | Serviço dedicado (processa detectores em paralelo) |
| Decisão | Serviço dedicado (priorização + recomendação) |
| Memória | Serviço dedicado (4 níveis, condensação) |
| Aprendizado | Serviço dedicado (coletivo + individual) |
| Banco | Sharding + replicação geográfica |
| Cache | Redis cluster global |
| Event Bus | Kafka cluster multi-região |
| Jobs | Distribuídos (workers por região) |

### 8.2 Arquitetura em 1M

```
                          ┌──────────────┐
                          │  API Gateway │
                          └──────┬───────┘
                                 │
                                 ▼
              ┌────────────────────────────────────┐
              │         ORCHESTRATOR SERVICE        │
              │   (coordena ciclos, sem estado)     │
              └──────┬──────┬──────┬──────┬────────┘
                     │      │      │      │
              ┌──────┘      │      │      └──────┐
              ▼             ▼      ▼              ▼
      ┌────────────┐ ┌──────────┐ ┌──────────┐ ┌────────────┐
      │ PERCEPTION │ │ DECISION │ │ MEMORY   │ │ LEARNING   │
      │ SERVICE    │ │ SERVICE  │ │ SERVICE  │ │ SERVICE    │
      └────────────┘ └──────────┘ └──────────┘ └────────────┘
              │             │         │              │
              ▼             ▼         ▼              ▼
      ┌────────────────────────────────────────────────────┐
      │              DATA LAYER (PostgreSQL + Redis)        │
      │   Shard 1     Shard 2     Shard 3     Shard N      │
      │  (0-10k)    (10k-50k)  (50k-200k)  (200k-1M)      │
      └────────────────────────────────────────────────────┘
```

### 8.3 O que NÃO muda da arquitetura original

- Modelo cognitivo universal (Fase 1) — mesmos 58 objetos, 85 relacionamentos
- Ciclo de raciocínio de 10 estágios
- Modelo de decisão (5 fases)
- Modelo de contexto (pacote fechado, TTL, referências)
- Memória em 4 níveis
- Hierarquia de intervenção (7 níveis)
- Priorização (5 categorias)
- Regras de orquestração (quem chama quem)
- Soft delete universal
- Isolamento multi-tenant por empresaId

### 8.4 Gargalos em 1M

| Gargalo | Impacto | Solução |
|:-------:|:-------:|:--------|
| Ciclo noturno | 4h não é suficiente para 1M empresas | Ciclo contínuo (24/7), não mais noturno |
| LLM calls | 100M/dia = ~1.200 chamadas/s | Pool de provedores + cache de respostas comuns |
| Contexto de empresa | 1M × 50 KB = 50 GB de contexto ativo | Redis cluster com LRU |
| Aprendizado coletivo | 1M registros para anonimizar | Processamento contínuo (streaming) |

---

## Seção 9 — Matriz de Evolução por Escala

| Componente | 1 | 10 | 100 | 1K | 10K | 100K | 1M |
|:----------:|:-:|:--:|:---:|:--:|:---:|:----:|:--:|
| Cache | In-memory | In-memory | In-memory | Redis | Redis | Redis Cluster | Global Redis |
| Event Bus | EventEmitter | EventEmitter | EventEmitter | Redis Pub/Sub | Kafka | Kafka | Kafka Cluster |
| Workers | 1 | 1 | 2-4 | 4-10 | 10-50 | 50-100 | 100+ |
| Ciclo noturno | Sequencial | Sequencial | Paralelo | 10 workers | 50 workers | 100 workers | Contínuo |
| Lock | Nenhum | Nenhum | Nenhum | Redis | Redis | Redis | Redis Cluster |
| Banco | PostgreSQL | PostgreSQL | PostgreSQL | PostgreSQL | + Replicas | + Sharding | + Geo |
| LLM | 1 chave | 1 chave | 2-3 chaves | Pool | Pool | Cache | Cache+Pool |
| Fila | Memória | Memória | Banco | Banco | Bull | Bull | Bull Cluster |
| Aprendizado coletivo | Manual | Manual | Semanal | Semanal | Diário | Streaming | Streaming |
| Monitoramento | Logs | Logs | Dashboard | Dashboard | Alerta | Auto-healing | Auto |

---

## Seção 10 — O que Nunca Muda (em qualquer escala)

1. **Modelo Cognitivo Universal** (58 objetos, 85 relacionamentos) — a ontologia é fixa
2. **Ciclo de raciocínio de 10 estágios** — a sequência de pensamento
3. **Leis da Constituição** — especialmente Leis 1, 2, 3, 6, 8, 10
4. **Isolamento por empresaId** — a barreira de tenant
5. **IA como tradutora de contexto** (ADR-017) — IA nunca decide
6. **Soft delete universal** — conhecimento nunca é perdido
7. **Separação service/engine** — a barreira mais importante
8. **Determinismo** — raciocínio é determinístico em qualquer escala

---

## Seção 11 — Descobertas, Pressupostos, Lacunas, Riscos

### Descobertas

1. A arquitetura atual (V4 Founder) escala sem modificações até ~100 empresas. A primeira grande mudança necessária é o cache (Redis em 1.000 empresas).
2. O ciclo noturno é o primeiro gargalo a aparecer — muito antes de CPU ou memória.
3. A maioria dos componentes (engines, modelo cognitivo, ciclo de raciocínio) permanece inalterada até 1M empresas. Apenas a infraestrutura muda.

### Pressupostos

1. **P1:** Cada empresa gera em média 1 ciclo cognitivo por dia + 1 ciclo por interação do empresário.
2. **P2:** O ciclo cognitivo médio leva 500ms em single-thread.
3. **P3:** O LLM é o recurso mais caro em qualquer escala (custo por chamada).

### Lacunas

1. **L1:** O custo operacional em cada escala não foi estimado (servidores, Redis, Kafka, LLM).
2. **L2:** A estratégia de sharding (Seção 7) não especifica a chave de shard — região? grupo de empresas? hash de empresaId?
3. **L3:** A migração entre escalas não foi detalhada — como migrar de EventEmitter para Kafka sem perder eventos?

### Riscos

1. **R1 — Custo de LLM em escala:** 1M empresas × 10 chamadas/dia = 10M chamadas/dia. A R$ 0,01/chamada = R$ 100.000/dia só de LLM. Mitigação: cache de respostas comuns, modelo próprio em escala.
2. **R2 — Complexidade operacional:** Em 1M empresas, a infraestrutura deixa de ser "gerenciável por uma equipe pequena" (princípio da Constituição). Mitigação: automatizar ao máximo.
3. **R3 — Consistência em sharding:** Se o banco é sharded, consultas que cruzam shards (ex.: aprendizado coletivo) ficam mais complexas. Mitigação: aprendizado coletivo em data warehouse separado.

### Conflitos

Nenhum conflito. A escalabilidade proposta respeita os princípios da Constituição (Seção 14 — simplicidade intencional) e adiciona complexidade apenas quando necessário.

### Impacto Futuro

1. Este plano de escalabilidade permite que a equipe saiba EXATAMENTE quando cada mudança é necessária.
2. Até 100 empresas, zero mudança de arquitetura — apenas código.
3. De 100 a 1.000, apenas Redis — sem mudança de arquitetura.
4. Acima de 10.000, a arquitetura distribuída começa — mas é uma evolução, não uma reescrita.
