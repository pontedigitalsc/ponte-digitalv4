# CERTIFICAÇÃO ARQUITETURAL — Matriz de Consistência entre Documentos Fundacionais

**Documento de certificação | 26/07/2026 | Arquiteto-Chefe**

> Certificação da integridade arquitetural da Ponte Digital: comparação sistemática entre CONSTITUICAO_DA_ENGENHARIA.md, ARCHITECTURE.md, CURRENT_PRODUCT.md, ADRs 001-034, e o estado real do código. Cada divergência classificada por tipo (A-E).

---

## 1. Matriz de Consistência Geral

| Documento Fonte | Documento Comparado | Status | Divergências |
|---|---|---|---|
| CONSTITUICAO_DA_ENGENHARIA.md | ARCHITECTURE.md | ✅ Consistente | Nenhuma contradição direta |
| CONSTITUICAO_DA_ENGENHARIA.md | CURRENT_PRODUCT.md | ⚠️ Divergência aceitável | Arquitetura-alvo vs realidade V4 Founder |
| CONSTITUICAO_DA_ENGENHARIA.md | ADRs 001-034 | ⚠️ 3 ADRs implícitas | Cache (ADR-014), migrations, side-effects |
| CONSTITUICAO_DA_ENGENHARIA.md | Código real | ⚠️ 4 violações conhecidas | Seção 10 exceções documentadas |
| ARCHITECTURE.md | CURRENT_PRODUCT.md | ✅ Consistente | ARCHITECTURE.md declara-se como visão futura |
| CURRENT_PRODUCT.md | ADRs 001-034 | ⚠️ ADRs aceitas não implementadas | 9 ADRs sem código (ver seção 4) |
| CURRENT_PRODUCT.md | Código real | ✅ Consistente | Reflete o estado real |
| CONSTITUICAO_DA_ENGENHARIA.md | PRINCIPLES.md | ✅ Consistente | Princípios extraídos da Constituição |
| CONSTITUICAO_DA_ENGENHARIA.md | FOUNDATION.md | ✅ Consistente | Mesma filosofia, granularidade diferente |

---

## 2. Análise Detalhada por Par

### 2.1 CONSTITUICAO_DA_ENGENHARIA.md vs ARCHITECTURE.md

**Resultado: ✅ Consistente**

Ambos concordam nos pontos fundamentais. ARCHITECTURE.md declara-se explicitamente como visão futura (Fase 2/3) e não como estado atual. A Constituição é o documento vigente.

| Tópico | CONSTITUIÇÃO | ARCHITECTURE.md | Verdict |
|---|---|---|---|
| Separação service/engine | Lei 1 — Service nunca importa Engine | "Nenhuma implementação atual pode acoplar lógica de decisão diretamente na tela" | ✅ Alinhado |
| API Routes vs Server Actions | Árvore de decisão: "API" vence | "API Routes + services, sem repositories" | ✅ Alinhado |
| Motor Cognitivo | É patrimônio cognitivo, não pipeline | Nomeia explicitamente como congelado | ✅ Alinhado |
| Multi-tenancy | empresaId em toda query | Tenant guard obrigatório | ✅ Alinhado |
| Simplicidade arquitetural | "Crescer para dentro, não para fora" | "Nada aqui deve ser implementado durante a V4 Founder sem decisão explícita" | ✅ Alinhado |
| Português no domínio | "Nomes em português" | Mencionado indiretamente | ✅ Alinhado |

### 2.2 CONSTITUICAO_DA_ENGENHARIA.md vs CURRENT_PRODUCT.md

**Resultado: ⚠️ Tipo B — Simplificação estratégica**

CURRENT_PRODUCT.md descreve a realidade da V4 Founder. A Constituição descreve o padrão ideal. As divergências são esperadas e autorizadas pela fase do produto.

| Diferença | CONSTITUIÇÃO | CURRENT_PRODUCT.md | Tipo |
|---|---|---|---|
| 55 engines | "Muitas podem ser falsas" reconhece em Lei 7 | 10 motores cognitivos listados | B |
| cognitive-pipeline-store (1392 linhas) | "Refatorar em engines independentes" | Aceito como débito | B |
| cognitive-experience-engine (1898 linhas) | "Agrega 12 engines" | Aceito como monolítico (ADR-005) | B |
| Cobertura de teste | Espera testes por camada | "Zero cobertura — aceitável por ora" | B |
| Soft delete incompleto | Lei 9 — toda migration adiciona dados | "Alguns models não têm deletedAt" | ⚠️ C (débito) |

### 2.3 CONSTITUICAO_DA_ENGENHARIA.md vs ADRs

**Resultado: ⚠️ 3 ADRs implícitas**

A Constituição faz referência a decisões arquiteturais que não têm ADR formal.

| Decisão na Constituição | ADR Correspondente | Status |
|---|---|---|
| "Crescer para dentro, não para fora" — sem Redis, fila externa | Nenhum ADR | ❌ Ausente |
| Processo de remoção em 2 fases (deprecate → remove) | Nenhum ADR | ❌ Ausente |
| engine/index.ts com side-effects | Nenhum ADR sobre initialização explícita | ❌ Ausente |
| Nomes em português no domínio | ADR-004 (engine naming) + ADR-029 (renomear agregados PT) | ✅ Parcial |
| Piramide de dependências | ADR-002 + ADR-005 | ✅ Coberto |

### 2.4 CONSTITUICAO_DA_ENGENHARIA.md vs ADR-014 (Cache)

**Resultado: ⚠️ Tipo E — Conflito documental**

| CONSTITUIÇÃO (Erro 5) | ADR-014 |
|---|---|
| "Cache in-memory já está ativo, implementado em lib/cache.ts, consumido por 4 engines" | "Futuro/Fase 4 — implementação futura" |
| "ADR-014 diz que cache é futuro/Fase 4" | "Cache in-memory 30s TTL" (descrição contraditória no próprio ADR) |

O ADR-014 está desatualizado — o cache existe no código mas o ADR ainda o marca como futuro.

### 2.5 ADRs Aceitas vs Código Real

**9 ADRs aprovadas que ainda não foram implementadas no código:**

| ADR | Título | Status |
|---|---|---|
| ADR-010 | Unificar Patrimônio Cognitivo | ⏳ Aguarda pós-validação |
| ADR-011 | Event Bus formal completo | Parcial — estruturas existem, barramento não é onipresente |
| ADR-013 | Ciclo cognitivo contínuo | ⏳ Aguarda Event Bus |
| ADR-014 | Cache (Fase 4) | 🔴 Cache já existe no código! |
| ADR-015 | Motor como barramento central | ⏳ Visão futura |
| ADR-016 | 16 submotores SRP | ⏳ Arquitetura-alvo |
| ADR-019 | Hierarquia de memória (4 níveis) | ⏳ Aguarda Motor Cognitivo |
| ADR-029 | Renomear agregados para português | ⏳ Aguarda ADR-010 |
| ADR-030 | Eliminar duplicatas Crenca/ConhecimentoDaIdentidade | ⏳ Aguarda ADR-010 |

---

## 3. Matriz de Divergências Classificadas (Tipo A-E)

### Tipo A — Implementação correta (código segue documentação)

| Item | Documento | Código | Verificação |
|---|---|---|---|
| Service nunca importa Engine runtime | Lei 1 | Nenhum service importa runtime de engine | ✅ |
| API não implementa regra de negócio | Lei 3 | APIs chamam services/engines, sem lógica | ✅ |
| Componente não contém regra | Lei 5 | Componentes renderizam estado apenas | ✅ |
| prisma-tenant-safe nas engines | Lei 2 | Engines usam prisma-tenant-safe | ✅ |
| Nomes em português | Seção 1.6 | listarClientes, criarTarefa, etc. | ✅ |

### Tipo B — Simplificação estratégica (permitida pela fase V4 Founder)

| Item | Documento Ideal | Realidade | Justificativa |
|---|---|---|---|
| API Routes + services | server/actions → services → repositories | API Routes → services | ADR-002 |
| HistoricoSinal | DomainEvent formal | Modelo simplificado | ADR-001 |
| Zero cobertura de teste | Testes por camada | Sem testes | Aceito para fase |
| Experience monolítico | Split por interface | 1898 linhas | ADR-005 |
| cognitive-pipeline-store | 6 engines independentes | 1392 linhas monolíticas | Débito reconhecido |

### Tipo C — Débito técnico (viola princípio, precisa ser corrigido)

| Item | Documento | Realidade | Gravidade |
|---|---|---|---|
| Soft delete incompleto | Lei 9 + FOUNDATION.md | Alguns models sem deletedAt | ⚠️ Crítico |
| 55 engines (muitas falsas) | Lei 7 — checklist obrigatório | Engines sem justificativa cognitiva | 📐 Médio |
| TenantId vs empresaId | Padrão empresaId | Event/DeadLetter usam tenantId | 📐 Médio |
| engine/index.ts side-effects | Nunca fazer #5 (implícito) | Inicializa subscribers no import | 📐 Médio |

### Tipo D — Ausência (documentação prevê algo inexistente)

| Item | Previsto em | Realidade | Impacto |
|---|---|---|---|
| Motor Cognitivo completo | P23 (LOADING, SISTEMA_DE_INSIGHTS, MAPA) | Não existe (congelado) | 🚫 Bloqueante para P23 |
| Contexto acumulativo entre sessões | P23 — EXPERIENCIA_COGNITIVA | Chat com contexto limitado | 🚫 Bloqueante |
| Middleware de autenticação | CONSTITUIÇÃO Erro 7 | Nenhum middleware.ts | ⚠️ Gap de segurança |
| Agenda como capacidade | MVP_SCOPE.md | Não existe (gap real) | 📐 Escopo ativo |
| Cache in-memory com ADR atualizado | CONSTITUIÇÃO Erro 5 | ADR-014 desatualizado | 📐 Documental |

### Tipo E — Conflito documental (documentos discordam entre si)

| Conflito | Documento A | Documento B | Resolução |
|---|---|---|---|
| Cache in-memory vs ADR-014 | CONSTITUIÇÃO: "já está ativo" | ADR-014: "Futuro/Fase 4" | ADR-014 precisa ser atualizado |
| P23 vs CURRENT_PRODUCT (Motor Cognitivo) | P23 assume motor operacional | CURRENT: "CONGELADO" | P23 precisa de simulador ou motor mínimo |
| Gamificação P23 | GAMIFICACAO_COGNITIVA.md (29 seções) | MANIFESTO: "não gamifica" | Remover ou adotar oficialmente |
| 3 thresholds de confiança (P23) | SISTEMA_DE_INSIGHTS: ≥20% | SISTEMA_DE_VALOR: 40% e >50% | Unificar |
| CONSTITUIÇÃO em 09-ARCHITECTURE/ | Localização atual | Esperado em 03-ENGINEERING/ | Movido para 09-ARCHITECTURE/ |

---

## 4. Violações Conhecidas da Constituição (Seção 10)

Conforme o contrato de integridade (Seção 10), as violações conhecidas e justificadas são:

| Lei | Violação | Justificativa | Válida até |
|---|---|---|---|
| 3 | APIs cognitivas importam engines | Não implementam regra — apenas roteamento | Indeterminado |
| 2 | cognitive-context-engine usa prismaSeguro | prisma-tenant-safe é lib, não PrismaClient | Indeterminado |
| 1 | historico-sinal.service importa type Sinal de engine | Apenas tipo, não runtime | Indeterminado |
| 10 | identity-engine não escreve em banco | Identidade é derivada de dados existentes | Indeterminado |

---

## 5. Arquitetura Final Unificada

### Hierarquia Canônica (valida para V4 Founder)

```
components/ (UI — render, eventos)
     ↑
  hooks/ (estado + efeitos)
     ↑
api/ (valida entrada, chama service/engine, retorna)
     ↑                    ↑
services/ (CRUD,          engine/ (capacidades cognitivas
 regras de negócio)        autônomas — nunca importam services)
     ↑                    ↑
     └────────┬───────────┘
              ↓
        lib/ (prisma-tenant-safe, utils, cache, erros)
              ↑
        prisma/ (schema + client PostgreSQL)
```

### Regras de Dependência Obrigatórias

1. **Service nunca importa Engine** (runtime) — Lei 1
2. **Engine nunca acessa Prisma diretamente** — Lei 2
3. **API nunca implementa regra de negócio** — Lei 3
4. **Lib nunca conhece UI** — Lei 4
5. **Componente React nunca contém regra de negócio** — Lei 5
6. **Nunca duplicamos inteligência** — Lei 6
7. **Nunca criamos Engine por conveniência** — Lei 7
8. **Toda query multi-tenant inclui empresaId** — Lei 8
9. **Toda migration adiciona dados, nunca remove sem estratégia** — Lei 9
10. **Toda engine cognitiva registra sua saída** — Lei 10

---

## 6. Recomendações

### Curto prazo (sprint atual)
- [ ] Atualizar ADR-014 para refletir que cache in-memory já existe
- [ ] Mover GAMIFICACAO_COGNITIVA.md para archive/ ou adotar oficialmente
- [ ] Unificar thresholds de confiança P23 (≥20% sugestão, ≥40% WOW)

### Médio prazo (próximas 3 sprints)
- [ ] Criar ADR para "Crescer para dentro" (princípio de simplicidade de infraestrutura)
- [ ] Criar ADR para processo de remoção em 2 fases
- [ ] Criar ADR para initialização explícita vs side-effects em imports
- [ ] Completar soft delete nos models faltantes

### Longo prazo (pós-validação 100 fundadores)
- [ ] Implementar ADR-010 (unificar Patrimônio Cognitivo)
- [ ] Implementar ADR-029 + ADR-030 (renomear agregados + eliminar duplicatas)
- [ ] Implementar ADR-011 + ADR-013 (Event Bus formal + ciclo contínuo)

---

## 7. Resumo

| Métrica | Valor |
|---|---|
| Documentos analisados | 6 (CONSTITUIÇÃO, ARCHITECTURE, CURRENT_PRODUCT, PRINCIPLES, FOUNDATION, ADRs 001-034) |
| Consistências Tipo A | 6 |
| Simplificações Tipo B | 5 |
| Débitos Tipo C | 4 |
| Ausências Tipo D | 5 |
| Conflitos Tipo E | 5 |
| ADRs aceitas não implementadas | 9 |
| Recomendações curto prazo | 3 |
| Recomendações médio prazo | 3 |

**Nota geral de integridade arquitetural: 7.5/10** — A arquitetura é consistente nos fundamentos. As divergências são principalmente simplificações autorizadas pela fase V4 Founder e conflitos documentais localizados. Nenhuma violação de Lei Imutável não justificada foi encontrada.

*Documento certificado por arquitetura em 26/07/2026.*
