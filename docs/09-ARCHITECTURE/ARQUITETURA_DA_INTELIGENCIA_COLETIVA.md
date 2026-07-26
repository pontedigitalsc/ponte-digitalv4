# Arquitetura da Inteligência Coletiva

> **Programa 12 — Fase 4: Sistema Cognitivo Completo (Nível Sistema Operacional)**
> Versão: 1.0
> Propósito: Definir como o sistema aprende entre empresas — transformando dados isolados em padrões coletivos, sem violar privacidade

---

## Preâmbulo

A inteligência coletiva é o que transforma a Ponte Digital de um assistente individual em um sistema que aprende com milhares de empresas simultaneamente. Cada empresa que usa a Ponte torna todas as outras um pouco mais inteligentes.

Mas coletivizar conhecimento de empresas é perigoso. Uma empresa não deve saber o que outra empresa está fazendo. Dados financeiros, clientes, estratégias — são informações sensíveis. A inteligência coletiva precisa operar dentro de barreiras de privacidade que tornem impossível a identificação de qualquer empresa individual.

Este documento define o mecanismo que coleta, anonimiza, agrega, descobre padrões e distribui aprendizado entre empresas — sem nunca violar o sigilo de nenhuma delas.

---

## Seção 1 — Princípios da Inteligência Coletiva

### IC1 — Privacidade inegociável
Nenhum dado identificável de empresa individual jamais é exposto. A inteligência coletiva só vê sombras.

### IC2 — Anonimização antes da agregação
Nenhum dado bruto chega ao conhecimento coletivo. Toda coleta passa por anonimização antes de ser armazenada.

### IC3 — Padrões, não casos
A inteligência coletiva descobre padrões. Nunca casos específicos. "35% das empresas de varejo têm problemas de fluxo de caixa em janeiro" — não "a Empresa X tem problema."

### IC4 — Feed back útil
Padrões coletivos só têm valor se retornam como conhecimento aplicável para cada empresa individual.

### IC5 — Participação opcional
Empresas podem opt-out da inteligência coletiva (mas perdem os benefícios dos padrões).

### IC6 — N mínimo
Nenhum padrão é divulgado se não for baseado em pelo menos N empresas (N mínimo = 30).

---

## Seção 2 — O que é Coletivizável

### 2.1 Coletivizável (pode virar padrão)

| Dado | Como é anonimizado | Exemplo de padrão |
|:----:|:------------------:|:-----------------:|
| Métricas financeiras (faturamento, margem, lucro) | Faixas (R&#36; 0-5k, 5k-20k, 20k-100k) | "Empresas na faixa de 20-100k gastam 15% com marketing" |
| Indicadores de saúde (cash burn, inadimplência) | Faixas percentuais | "70% das empresas têm cash burn > 6 meses" |
| Padrões de atraso em contas a receber | Agregados estatísticos | "O atraso médio em prestação de serviços é 45 dias" |
| Temas de preocupação do empresário | Tags normalizadas | "Fluxo de caixa é a #1 preocupação em 2025" |
| Uso de features da plataforma | Contagem de uso | "Funcionalidade mais usada: planejamento financeiro" |
| Decisões tomadas com a Ponte | Categorias de decisão | "70% aceitam recomendação de corte de custos" |
| Padrões sazonais | Médias e medianas | "Vendas de construção civil caem 40% em dezembro" |
| Ciclo de vida de empresas (fundação à crise) | Fases de evolução | "Empresas na Fase 3 têm 60% de risco de crise" |

### 2.2 Nunca Coletivizável

| Dado | Motivo |
|:----:|:------:|
| Nome de empresa | Identificação direta |
| CNPJ | Identificação direta |
| Nome de cliente de empresa | Dado sensível de terceiros |
| CPF de cliente | Dado sensível de terceiros |
| Endereço | Identificação indireta |
| Custo específico de um produto | Identificação possvel |
| Estratégia de precificação | Dado competitivo |
| Número de funcionários exato | Faixa (1-5, 6-10) é aceitável; número exato, não |
| Contratos específicos | Dado sensível |
| Conversas literais do empresário | Privacidade |

---

## Seção 3 — O processo de Coletivização

### 3.1 Pipeline de Coletivização

```
Coleta → Filtro → Anonimização → Agregação → Patrocínio→ Distribuição
   │        │           │             │            │            │
   ▼        ▼           ▼             ▼            ▼            ▼
Dados   Remover    Remover      Juntar por   Validar    Gerar insights
brutos  não-       identidade   faixa +      N mínimo   por empresa
        coletiviz. e detalhes   categoria    (≥ 30)     similar
```

### 3.2 Estágio 1 — Coleta

**Gatilho:** Evento `patrimonio.padrao_descoberto` ou `evolucao.indicador_atualizado` ou ciclo noturno.

**O que coleta:** Apenas indicadores que estão na lista "coletivizável" (Seção 2.1).

**Formato:**

```typescript
interface RawCollectible {
  empresaId: string;       // removido na anonimização
  categoria: string;       // "varejo", "servicos", "industria"
  porte: string;           // faixa de faturamento
  indicador: string;       // "cash_burn_meses"
  valor: number;
  timestamp: Date;
  regiao?: string;         // removido se regiao < N mínimo
}
```

### 3.3 Estágio 2 — Filtro

**Regras:**

1. Remover qualquer dado que não está na lista de coletivizável
2. Remover qualquer dado com identificador direto (nomes, CNPJ, etc.)
3. Se o dado já existe no patrimônio coletivo (mesma categoria + indicador + faixa), verificar se houve mudança significativa (> 5%) antes de seguir
4. Se o dado veio de empresa opt-out, descartar totalmente

### 3.4 Estágio 3 — Anonimização

**Regras:**

1. Remover `empresaId` — o registro agora é anônimo (não pode ser rastreado de volta)
2. Converter valores exatos para faixas:
   - Faturamento: `[0-5k, 5k-20k, 20k-100k, 100k-500k, 500k-2M, 2M-10M, 10M+]`
   - Funcionários: `[1-5, 6-10, 11-50, 51-200, 200+]`
   - Tempo de operação: `[0-1a, 1-3a, 3-7a, 7-15a, 15a+]`
   - Idade do empresário: `[18-25, 26-35, 36-50, 51+]`
3. Remover `regiao` se o número de empresas na região for < N mínimo (30)
4. Remover `categoria` se o número de empresas na categoria for < N mínimo (30)

### 3.5 Estágio 4 — Agregação

Após anonimização, os dados são agregados por:

```typescript
interface AggregatedPattern {
  id: string;
  categoria: string;         // setor (ex.: "varejo")
  porte: string;             // faixa de faturamento
  indicador: string;         // ex.: "cash_burn_meses"
  estatisticas: {
    media: number;
    mediana: number;
    p25: number;
    p75: number;
    n_amostras: number;      // deve ser ≥ 30
    ultima_atualizacao: Date;
  };
  tendencia?: 'subindo' | 'estavel' | 'caindo';
  correlacoes?: Array<{
    indicador2: string;
    pearson: number;
  }>;
}
```

### 3.6 Estágio 5 — Validação (Patrocnio)

**Regras:**

1. `n_amostras` < 30: padrão não é divulgado (mantém histórico para quando atingir N mínimo)
2. `n_amostras` < 100: padrão é confiável, mas marcado como "baixa confiança"
3. `n_amostras` ≥ 100: padrão é considerado válido
4. Se o padrão contradiz um padrão anterior (ex.: "70% das empresas cortam custos" → "Agora 30% cortam custos"), o novo padrão substitui o antigo (com timestamp)

### 3.7 Estágio 6 — Distribuição (Feed back)

Quando uma empresa interage com a Ponte, o sistema:

1. Identifica a categoria e porte da empresa
2. Busca padrões coletivos que se aplicam
3. Injeta como contexto adicional no raciocínio cognitivo
4. Formato: "Empresas similares à sua (varejo, 20k-100k/mês) têm apresentado [indicador] com média de [valor]. Isso é [acima/abaixo] do seu cenário."

---

## Seção 4 — Níveis de Agregação

### 4.1 Nível 1 — Agregação por Categoria + Porte

O padrão mais comum. Ex.: "Empresas de varejo com faturamento de 20k-100k/mês."

**Requisito:** N ≥ 30 empresas na mesma categoria + porte.

### 4.2 Nível 2 — Agregação por Categoria apenas

Se N nível 1 < 30, agrupa só por categoria. Ex.: "Empresas de varejo."

**Requisito:** N ≥ 30 na mesma categoria.

### 4.3 Nível 3 — Visão geral (todas as empresas)

Se N nível 2 < 30, padrão não é divulgado.

**Requisito:** N ≥ 30 total.

### 4.4 Nível 0 — Abaixo de 30

Nenhum padrão é divulgado. O sistema aguarda até ter amostragem suficiente.

---

## Seção 5 — O Ciclo da Inteligência Coletiva

```
               ┌─────────────────────────────────┐
               │     COLETA (ciclo noturno)       │
               │   Cada empresa gera indicador    │
               └──────────────┬──────────────────┘
                              ▼
               ┌─────────────────────────────────┐
               │     FILTRO + ANONIMIZAÇÃO        │
               │   Remove identidade e detalhes   │
               └──────────────┬──────────────────┘
                              ▼
               ┌─────────────────────────────────┐
               │     AGREGAÇÃO (semanal/diário)   │
               │   Junta por categoria + porte    │
               └──────────────┬──────────────────┘
                              ▼
               ┌─────────────────────────────────┐
               │     DESCOBERTA DE PADRÕES        │
               │   Correlações, tendências,        │
               │   anomalias no agregado           │
               └──┬──────────────┬───────────────┘
                  │              │
                  ▼              ▼
      ┌──────────────────┐ ┌────────────────────┐
      │ ARMAZENAR        │ │ DISTRIBUIR         │
      │ Patrimônio       │ │ Contexto para      │
      │ Coletivo (banco) │ │ cada empresa       │
      └──────────────────┘ └────────────────────┘
```

### 5.1 Frequência

| Escala | Frequência |
|:------:|:----------:|
| 1-10 empresas | Manual / sem anonimização possível (N < 30) |
| 100 empresas | Quinzenal (coletivização ainda limitada) |
| 1.000 empresas | Semanal (N suficiente para maioria dos padrões) |
| 10.000+ empresas | Diária (N > 30 em praticamente todas as categorias) |
| 100.000+ empresas | Streaming (contínuo) |

---

## Seção 6 — Feedback para a Empresa Individual

### 6.1 Como o Conhecimento Coletivo é Injetado

Quando o sistema processa a empresa X (categoria: varejo, porte: 20k-100k):

```
1. Buscar em cognitive_heritage.patterns onde:
   categoria = 'varejo' AND porte = '20k-100k'

2. Retorna (ex.):
   - cash_burn_meses: media=8.3, mediana=7.0 (n=342)
   - ticket_medio: media=127, mediana=95 (n=298)
   - inadimplencia: media=12%, mediana=8% (n=215)

3. Comparar com os indicadores atuais da empresa X:
   - cash_burn = 6 meses (abaixo da média = alerta amarelo)
   - ticket_medio = R$ 85 (abaixo da média = oportunidade)
   - inadimplencia = 5% (abaixo = positivo)

4. Gerar insight contextualizado:
   "Empresas similares à sua têm cash burn médio de 8,3 meses.
    Seu cash burn (6 meses) está abaixo da média — atenção ao
    fluxo de caixa. 68% das empresas do seu porte que tiveram
    cash burn < 6 meses enfrentaram crise nos 3 meses seguintes."
```

### 6.2 Formato de Entrega

O conhecimento coletivo nunca é entregue como "dado bruto" — sempre como parte de uma análise contextualizada no ciclo cognitivo da empresa. O empresário nunca vê "média de cash burn = 8,3". Ele vê "empresas similares à sua têm em média 8,3 meses de reserva — você tem 6 meses."

### 6.3 Comparação entre Pares (Peer Benchmarking)

Regras:
1. A empresa só vê comparação com faixa (seu valor vs faixa), nunca vs empresa específica
2. A comparação mostra posição percentual ("você está no top 25%") — não ranking exato
3. Se N < 30 na categoria+porte, não mostra comparação (usa só categoria)
4. Se N < 30 na categoria, não mostra comparação (usa "empresas em geral")

---

## Seção 7 — Opt-Out e Privacidade

### 7.1 Como Funciona o Opt-Out

```typescript
interface EmpresaConfig {
  coletivo: {
    optOut: boolean;
    optOutAt: Date | null;
    // Se optOut = true, dados desta empresa nunca alimentam o coletivo
    // Empresa ainda RECEBE insights coletivos (eles são anônimos)
  };
}
```

### 7.2 Efeitos do Opt-Out

| Direção | Efeito |
|:-------:|:------:|
| Empresa → Coletivo | Dados desta empresa NÃO alimentam os padrões coletivos |
| Coletivo → Empresa | Empresa AINDA recebe insights baseados em padrões coletivos (padrões são anônimos) |

### 7.3 Remoção Retroativa

Se uma empresa optar por sair, os dados já coletivizados (e anônimos) não podem ser removidos — eles já perderam a identidade. Mas:
- A empresa pode solicitar que seus dados sejam excluídos do armazenamento interno (raw data)
- O padrão agregado não é afetado (já que a identidade foi removida antes da agregação)

---

## Seção 8 — Banco de Dados da Inteligência Coletiva

O patrimônio coletivo é armazenado separadamente do patrimônio individual (em banco separado ou schema separado).

```prisma
model CollectiblePattern {
  id            String   @id
  categoria     String   // "varejo", "servicos", "industria"
  porte         String   // faixa de faturamento
  indicador     String   // nome do indicador
  media         Float
  mediana       Float
  p25           Float
  p75           Float
  nAmostras     Int
  tendencia     String?  // "up", "stable", "down"
  updatedAt     DateTime
  createdAt     DateTime

  @@unique([categoria, porte, indicador])
}

model CollectibleCorrelation {
  id          String   @id
  indicador1  String
  indicador2  String
  pearson     Float
  nAmostras   Int
  updatedAt   DateTime

  @@unique([indicador1, indicador2])
}
```

---

## Seção 9 — Descobertas, Pressupostos, Lacunas, Riscos

### Descobertas

1. Até ~100 empresas, a inteligência coletiva ESSENCIALMENTE NÃO FUNCIONA — N < 30 na maioria das categorias. Isso significa que o produto precisa operar sem inteligência coletiva até ter massa crítica.
2. A barreira de privacidade de 30 empresas é alta o suficiente para garantir anonimato, mas baixa o suficiente para ser atingida relativamente cedo.
3. O opt-out não fragiliza o sistema — mesmo que empresas saiam, os padrões já agregados permanecem válidos.

### Pressupostos

1. **P1:** Empresas opt-in por padrão (opt-out é explícito).
2. **P2:** Empresas em geral não farão opt-out (os benefícios superam o desconforto).

### Lacunas

1. **L1:** O mecanismo de descoberta de correlações não foi especificado (como encontrar que "cash burn < 6 meses → 68% chance de crise"?).
2. **L2:** A governança do patrimônio coletivo não foi definida (quem aprova padrões? quem remove padrões obsoletos?).

### Riscos

1. **R1 — N mínimo nunca é atingido:** Se a Ponte Digital tiver apenas empresas muito diversas (poucas no mesmo setor+porte), os padrões nunca atingem N ≥ 30.
2. **R2 — Viés de seleção:** As empresas que usam a Ponte Digital podem não ser representativas do mercado geral.

### Conflitos

Nenhum. A inteligência coletiva respeita a ADR-012 (cognitive-heritage), ADR-017 (IA como tradutora), ADR-020 (event-driven), e a Lei 2 da Constituição (privacidade como direito).

### Impacto Futuro

1. A inteligência coletiva é o que torna a Ponte Digital mais valiosa a cada nova empresa cadastrada — efeito de rede.
2. A Fase V4 Founder não precisa implementar inteligência coletiva — não há massa crítica de empresas. Este documento serve como guia para quando a massa crítica for atingida.
