# Arquitetura da Explicabilidade

> **Programa 12 — Fase 4: Sistema Cognitivo Completo (Nível Sistema Operacional)**
> Versão: 1.0
> Propósito: Garantir que toda recomendação, decisão e silêncio do sistema seja explicável em 3 níveis — para o empresário, para o desenvolvedor e para o auditor

---

## Preâmbulo

A Ponte Digital toma decisões. Recomenda cortar custos. Sugere contratar. Alerta sobre fluxo de caixa. Identifica oportunidades. Às vezes, fica em silêncio.

Cada uma dessas ações precisa ser explicável. Não porque o empresário vai pedir explicação (muitas vezes ele não vai). Mas porque:

1. **Confiança:** o empresário precisa confiar na recomendação para agir
2. **Correção:** se a recomendação estiver errada, precisamos saber por quê
3. **Evolução:** não podemos melhorar o que não entendemos
4. **Responsabilidade:** a Ponte Digital decide com base em dados de empresas reais

Este documento define o mecanismo que rastreia, armazena e apresenta a explicação de cada ação do sistema — desde o nível mais simples ("recomendamos cortar custos porque seu fluxo de caixa está baixo") até o nível mais detalhado ("a prioridade 7.3 foi calculada com base em 5 fatores com pesos...").

---

## Seção 1 — Princípios da Explicabilidade

### EX1 — Tudo é explicável
Não existe ação sem explicação. Se o sistema age, existe um registro de por quê.

### EX2 — Hierarquia de profundidade
Toda explicação tem 3 níveis: Simples (empresário), Técnica (desenvolvedor), Completa (auditoria).

### EX3 — Explicação precede ação
A explicação é gerada DURANTE a decisão, não depois. Se não for possível gerar explicação, a ação não acontece.

### EX4 — Rastreabilidade total
Da ação ao dado original. Toda recomendação pode ser rastreada até a evidência que a gerou.

### EX5 — Silêncio também se explica
Se o sistema decide não agir, existe um registro de por que não agiu.

---

## Seção 2 — Os 3 Níveis de Explicação

### 2.1 Nível 1 — Explicação para o Empresário

**Formato:** Linguagem natural, 1-3 frases, sem jargão técnico.

**O que contém:**
- A recomendação/ação
- A razão principal (1 evidência)
- O que pode acontecer se ele não agir (opcional)
- Nível de confiança (Alta, Média, Baixa)

**Exemplo:**
> "Recomendamos cortar R$ 3.000/mês em custos operacionais.
> Seu fluxo de caixa atual (R$ 12.000/mês) cobre apenas 4 meses de operação,
> abaixo do recomendado para empresas do seu porte (8 meses).
> Confiança: Alta — baseado em 6 meses de dados financeiros."

**Formato armazenado:**

```typescript
interface ExplanationLevel1 {
  recomendacao: string;          // "Cortar R$ 3.000/mês em custos"
  razao: string;                 // "Fluxo de caixa baixo (cobertura de 4 meses)"
  consequencia?: string;         // "Risco de crise em 3 meses"
  confianca: 'alta' | 'media' | 'baixa';
  evidencias_principais: string[];  // ["Fluxo de caixa: R$ 12k/mês, cobertura 4m"]
  timestamp: Date;
}
```

### 2.2 Nível 2 — Explicação para o Desenvolvedor

**Formato:** Estruturado (JSON), com campos rastreáveis.

**O que contém:**
- Engine que gerou a recomendação
- Fatores que influenciaram a decisão (com pesos)
- Alternativas consideradas (com razão de rejeição)
- Pipeline de estágios percorridos
- Dados específicos usados (referências)
- Thresholds e limiares aplicados

**Exemplo:**

```json
{
  "engine": "cognitiveOrchestrator",
  "cicloId": "ciclo_2025-03-15_empresa_42",
  "decisao": "priorizar_reducao_custos",
  "prioridade": 7.3,
  "fatores": [
    {"fator": "cash_burn", "valor": 4, "peso": 0.35, "threshold": 6},
    {"fator": "tendencia_receita", "valor": -0.12, "peso": 0.25, "threshold": 0},
    {"fator": "inadimplencia", "valor": 0.08, "peso": 0.20, "threshold": 0.10}
  ],
  "alternativas": [
    {"alternativa": "aumentar_receita", "descarte": "tendencia negativa (-12%)"},
    {"alternativa": "nova_linha_credito", "descarte": "inadimplencia crescente"}
  ],
  "estagios": ["percepcao", "contextualizacao", "analise", "decisao"],
  "evidencias": [
    {"tipo": "memoria_curto_prazo", "id": "mem_456", "relevancia": 0.92},
    {"tipo": "patrimonio", "id": "pat_789", "relevancia": 0.78}
  ]
}
```

### 2.3 Nível 3 — Explicação para Auditoria

**Formato:** Registro imutável (append-only), completo.

**O que contém:**
- Tudo do Nível 2
- Estado completo do contexto no momento da decisão (snapshot)
- Memória ativa completa (working memory)
- Input de cada engine no pipeline
- Output de cada engine no pipeline
- Eventos gerados durante o ciclo
- Timestamps de cada etapa
- Metadados de versão (versão de cada engine, modelo de IA, data)

**Exemplo:**

```json
{
  "auditId": "aud_2025-03-15_empresa_42_001",
  "cicloId": "ciclo_2025-03-15_empresa_42",
  "nivel": "completo",
  "snapshotContexto": { /* dump completo do contexto */ },
  "pipeline": [
    {"estagio": "percepcao", "engine": "perceptionEngine", "input": {...}, "output": {...}, "ts": "..."},
    {"estagio": "contextualizacao", "engine": "contextEngine", "input": {...}, "output": {...}, "ts": "..."}
  ],
  "eventos": [{"tipo": "decisao.priorizada", "dados": {...}}],
  "versoes": {
    "cognitiveOrchestrator": "1.3.0",
    "perceptionEngine": "1.0.5",
    "modeloIA": "gpt-4-0125-preview"
  }
}
```

---

## Seção 3 — O Registro de Explicabilidade

### 3.1 Modelo de Dados

```prisma
model ExplanationRecord {
  id              String   @id
  empresaId       String
  cicloId         String?
  acao            String   // tipo de ação (recomendacao, alerta, silencio)
  nivel           String   // "simples", "tecnica", "completa"
  engine          String   // engine que gerou
  explicacao      Json     // o conteúdo da explicação (varia por nível)
  hash            String   // hash SHA-256 do conteúdo (imutabilidade)
  timestamp       DateTime
  createdAt       DateTime

  @@index([empresaId, timestamp])
  @@index([cicloId])
}
```

### 3.2 Nível de Detalhe por Contexto

| Contexto | Nível Salvo | Motivo |
|:--------:|:-----------:|:------:|
| Interação direta do empresário | Nível 1 + 2 | Empresário pode pedir detalhe |
| Ciclo noturno automático | Nível 2 | Eficiência (nível 3 é muito caro) |
| Alerta de crise | Nível 3 (completo) | Crise = precisa de auditoria |
| Recomendação rejeitada pelo empresário | Promover para Nível 3 | Empresário discordou — investigar |
| Erro ou anomalia | Nível 3 (completo) | Diagnosticar falha |
| Silêncio | Nível 2 | Saber por que não agiu |

### 3.3 Política de Retenção

| Nível | Retenção | Motivo |
|:-----:|:--------:|:------:|
| Nível 1 | Permanente | Histórico de recomendações |
| Nível 2 | 90 dias | Suporte e diagnóstico |
| Nível 3 | 30 dias | Auditoria (muito espaço) |

---

## Seção 4 — Explicação do Silêncio

O silêncio é a decisão mais comum do sistema — e a mais difícil de explicar. Se o sistema não age, como o empresário sabe que ele está funcionando?

### 4.1 Registro de Silêncio

```typescript
interface SilenceExplanation {
  empresaId: string;
  periodo: { inicio: Date; fim: Date };
  razao: string;  // "Nenhuma anomalia detectada" | "Tudo dentro dos thresholds" | etc.
  metricas_revisadas: string[];  // ["cash_burn: 8.2 (threshold: 6)", ...]
  eventos_recebidos: number;  // 15 (todos processados sem gerar ação)
  proxima_revisao: Date;
}
```

### 4.2 Quando o Silêncio Precisa Ser Explicado

1. Empresário pergunta "por que não fez nada?"
2. Auditoria de funcionamento
3. Dashboard de saúde do sistema (mostrar que o sistema está ativo)
4. Após um período sem interação do empresário (mostrar que o sistema não dormiu)

---

## Seção 5 — A Cadeia de Explicabilidade

```
Dado original → Engine A → Engine B → Decisão → Explicação
      │            │           │          │           │
      ▼            ▼           ▼          ▼           ▼
  Registro     Input A     Input B    Decisão     Explicação
  de origem    +Output A   +Output B  registrada  em 3 níveis
```

Cada elo da corrente é registrado no momento em que ocorre:

```
1. Dado original capturado → armazenado no patrimonio
2. Engine A recebe input → registrado (cicloId + input)
3. Engine A produz output → registrado (cicloId + output)
4. Engine B recebe output de A → registrado
5. Decisão final → registrada
6. Explicação gerada → registrada (nos 3 níveis)
```

Se qualquer elo falhar, a cadeia inteira falha — e a decisão não acontece. Isso garante que toda decisão tem rastro completo.

---

## Seção 6 — Explicação para o Empresário: UX

A interface do empresário deve oferecer:

### 6.1 Explicação Padrão (Nível 1)

Após cada recomendação:
> "Recomendamos [ação] porque [razão principal]."
> Botão: "Entendi" | "Quero saber mais"

### 6.2 Explicação Detalhada (Nível 2)

Ao clicar "Quero saber mais":
> "Baseamos essa recomendação em:"
> - "Seu fluxo de caixa atual: R$ 12k/mês (cobertura de 4 meses)"
> - "Empresas similares: cobertura média de 8 meses"
> - "Sua tendência de receita: queda de 12% nos últimos 3 meses"
> - "Sua inadimplência: 8% (crescente)"
>
> "Consideramos também:"
> - "Aumentar receita: descartado (tendência negativa)"
> - "Nova linha de crédito: descartado (inadimplência crescente)"
>
> Confiança: Alta

### 6.3 Explicação de Contexto (Nível 2+)

Botão "Como você sabe disso?" em qualquer fato:
> "Seu fluxo de caixa de R$ 12k/mês foi calculado com base nos dados financeiros
> dos últimos 6 meses (Jan a Jun/2025). Última atualização: ontem."

---

## Seção 7 — Garantias de Explicabilidade

### 7.1 Toda decisão tem explicação

Se o ciclo cognitivo produz uma decisão, o `cognitiveOrchestrator` é responsável por gerar a explicação antes de entregá-la. Se a explicação falhar, a decisão é bloqueada.

### 7.2 Toda explicação é armazenada

A explicação é armazenada em `ExplanationRecord` antes de ser apresentada ao empresário. Se o armazenamento falhar, a explicação não é apresentada.

### 7.3 Toda explicação é rastreável

Dado um `ExplanationRecord.id`, é possível reconstruir toda a cadeia de decisão — desde a recomendação até os dados originais.

### 7.4 Toda explicação é imutável

Uma vez armazenada, a explicação nunca é alterada. Se a decisão for revisada (por erro ou aprendizado), uma nova explicação é gerada — a anterior permanece como registro histórico.

---

## Seção 8 — Descobertas, Pressupostos, Lacunas, Riscos

### Descobertas

1. O Nível 3 (completo) é caro — snapshot de contexto + pipeline inteiro. Usar apenas em auditoria e crise.
2. A explicação de silêncio é essencial para confiança do empresário no longo prazo — sem ela, o sistema parece "morto".
3. A imutabilidade das explicações é o que permite auditoria e aprendizado — se a explicação muda, não podemos aprender com erros.

### Pressupostos

1. **P1:** O armazenamento de explicações não será gargalo (Nível 1 é pequeno, Nível 2 é médio).
2. **P2:** Empresários vão querer explicações detalhadas em casos específicos — não sempre.

### Lacunas

1. **L1:** O formato de snapshot do contexto (Nível 3) não foi definido — o que exatamente é capturado?
2. **L2:** A política de retenção (Seção 3.3) não especifica como é feita a limpeza dos registros antigos.
3. **L3:** Não foi definido como a explicação é gerada durante uma decisão — cada engine precisa reportar seu racional.

### Riscos

1. **R1 — Custo de armazenamento:** Nível 3 pode gerar ~50 KB por decisão. Em 10.000 empresas × 1 decisão/dia × 30 dias = 15 GB/mês só de nível 3.
2. **R2 — Performance:** Gerar explicação detalhada durante a decisão pode aumentar a latência do ciclo cognitivo.

### Conflitos

Nenhum. A explicabilidade é exigida pela ADR-008 (determinismo), pela Lei 5 da Constituição (rastreabilidade), e pelo princípio de que IA não decide (ADR-017) — se a IA não decide, a decisão precisa vir de um processo rastreável.

### Impacto Futuro

1. A explicabilidade é um diferencial competitivo da Ponte Digital — nenhum concorrente oferece rastreamento completo de decisões.
2. Na Fase V4 Founder, a explicabilidade pode ser simplificada (apenas Nível 1 armazenado). Níveis 2 e 3 são implementados quando houver escala.
