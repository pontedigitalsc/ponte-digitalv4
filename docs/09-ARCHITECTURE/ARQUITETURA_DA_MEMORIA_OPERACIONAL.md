# Arquitetura da Memória Operacional

> **Programa 12 — Fase 3: Motor Cognitivo**
> Versão: 1.0
> Propósito: Definir os tipos, ciclos de vida, retenção e descarte da memória cognitiva

---

## Preâmbulo

A memória é o substrato do patrimônio cognitivo. Sem memória, o Motor não acumula conhecimento — cada interação é um recomeço. Com memória mal estruturada, o Motor se torna lento, irrelevante ou contraditório.

Este documento especifica a arquitetura de memória operacional da Ponte Digital: tipos, níveis, ciclos de vida, critérios de retenção e descarte. Ele implementa a hierarquia definida no ADR-019 e a política de esquecimento do ADR-026.

A memória não é um depósito passivo. É uma estrutura ativa que condensa, arquiva e descarta conhecimento para manter o Motor relevante e eficiente.

---

## Seção 1 — Tipos de Memória

### 1.1 Mapa Geral

O Motor Cognitivo opera com 4 tipos de memória, cada um com função, capacidade e política de retenção distintos:

```
                     ┌──────────────────┐
                     │  MEMÓRIA DE      │
                     │  TRABALHO        │  ← Sessão atual, volátil
                     │  (Working)       │
                     └────────┬─────────┘
                              │ consolidação
                              ▼
                     ┌──────────────────┐
                     │  MEMÓRIA         │
                     │  TEMPORÁRIA      │  ← Últimos 30 dias, sumarizada
                     │  (Short Term)    │
                     └────────┬─────────┘
                              │ condensação
                              ▼
                     ┌──────────────────┐
                     │  MEMÓRIA         │
                     │  PERMANENTE      │  ← Até 1 ano, ativa
                     │  (Long Term)     │
                     └────────┬─────────┘
                              │ arquivamento
                              ▼
                     ┌──────────────────┐
                     │  MEMÓRIA         │
                     │  ARQUIVADA       │  ← Permanente, passiva
                     │  (Archived)      │
                     └──────────────────┘
```

### 1.2 Memória de Trabalho (Working Memory)

**Função:** Manter o contexto imediato da interação atual.

**Capacidade:** 100 itens por sessão
**Retenção:** Duração da sessão (máximo 24 horas)
**Persistência:** Volátil — não persiste entre sessões

**Conteúdo:**
- Contexto Cognitivo vigente (pacote imutável)
- Últimas interações do empresário
- Sinais processados na sessão atual
- Decisões tomadas na sessão atual
- Cache de consultas frequentes

**Consolidação:** Ao final da sessão, itens relevantes da Working Memory são consolidados para Short Term.

### 1.3 Memória Temporária (Short Term)

**Função:** Manter conhecimento recente para decisões de curto prazo.

**Capacidade:** 1.000 itens por empresa
**Retenção:** 30 dias (renovável a cada acesso)
**Persistência:** Banco de dados (modelo MemoriaCognitiva)

**Conteúdo:**
- Evidências dos últimos 30 dias
- Hipóteses em observação
- Decisões recentes e seus resultados
- Interações com o empresário
- Sinais processados (resumo)

**Condensação:** A cada 30 dias, a Short Term é condensada para Long Term. Itens não acessados nos últimos 30 dias são revisados (podem ser descartados ou condensados).

### 1.4 Memória Permanente (Long Term)

**Função:** Manter o conhecimento estabelecido sobre a empresa.

**Capacidade:** 10.000 itens por empresa
**Retenção:** 1 ano (renovável a cada validação)
**Persistência:** Banco de dados (modelo MemoriaCognitiva + ConhecimentoValidado)

**Conteúdo:**
- Conhecimento validado (confiança ≥ 70, convicção ≥ 30 dias)
- Hipóteses confirmadas
- Decisões históricas com outcomes
- Perfil do empresário (preferências, padrões)
- Métricas de confiança acumuladas

**Arquivamento:** A cada 90 dias sem acesso, itens da Long Term são revisados. Se irrelevantes, movidos para Archived.

### 1.5 Memória Arquivada (Archived)

**Função:** Preservar conhecimento histórico sem impacto no contexto ativo.

**Capacidade:** Ilimitado
**Retenção:** Permanente (apenas curadoria explícita remove)
**Persistência:** Banco de dados (modelo MemoriaCognitiva com status ARQUIVADO)

**Conteúdo:**
- Conhecimento desatualizado mas preservado
- Hipóteses refutadas (mantidas para auditoria)
- Decisões antigas (> 1 ano)
- Evidências arquivadas por tempo

**Reativação:** O empresário pode consultar memória arquivada. Se um item arquivado se torna relevante novamente, ele é reativado para Long Term.

---

## Seção 2 — Ciclo de Vida da Memória

### 2.1 Fluxo Padrão

```
CRIAÇÃO → USO ATIVO → CONDENSAÇÃO → ARQUIVAMENTO → (REATIVAÇÃO ou RETENÇÃO PERMANENTE)
```

### 2.2 Fases do Ciclo

**Fase 1 — Criação:**
- Uma informação é registrada (evidência, hipótese, decisão, interação)
- Entra na Short Term (ou Working Memory se for da sessão atual)
- Recebe TTL base (30 dias para Short Term)

**Fase 2 — Uso Ativo:**
- A informação é consultada pelo Motor para raciocínio
- Cada consulta renova o TTL (estende por +7 dias)
- Informação consultada frequentemente (3+ vezes por semana) ganha prioridade na condensação

**Fase 3 — Condensação:**
Aplica regras de condensação (Seção 4) para reduzir volume:
- Múltiplos itens similares → sumarização
- Itens conflitantes → resolução
- Itens redundantes → deduplicação

**Fase 4 — Arquivamento:**
- Informação não acessada por 90+ dias é movida para Archived
- Informação refutada é movida para Archived (com a evidência de refutação)
- Informação que excedeu TTL máximo é movida para Archived

**Fase 5 — Reativação:**
- Informação arquivada que se torna relevante novamente é reativada
- Reativação = mover para Long Term com novo TTL de 30 dias
- Gatilhos de reativação: nova evidência relacionada, menção do empresário, correlação com sinal atual

### 2.3 Tempos de Vida por Tipo

| Tipo de Informação | Short Term | Long Term | Archived |
|--------------------|:----------:|:---------:|:--------:|
| Evidência (confiança ≥ 70) | 30 dias | 1 ano | Permanente |
| Evidência (confiança < 70) | 30 dias | — (descarta) | — (descarta) |
| Hipótese EM_OBSERVAÇÃO | 30 dias | — (arquiva) | — |
| Hipótese CONFIRMADA | 30 dias | 1 ano | Permanente |
| Hipótese REFUTADA | — | — | Permanente |
| Decisão executada | 30 dias | 1 ano | Permanente |
| Decisão não executada | 7 dias | 30 dias | — (descarta) |
| Interação com empresário | 30 dias | — (descarta após sumarização) | — |
| Sinal processado | 7 dias | — (descarta) | — |
| Conhecimento Validado | — | 1 ano (renovável) | Permanente |

---

## Seção 3 — Critérios de Retenção

### 3.1 O que é Retido

Uma informação é retida na Short Term ou Long Term se atender a qualquer um dos seguintes critérios:

**R1 — Relevância atual ≥ 30 (ver MODELO_DE_CONTEXTO.md)**
**R2 — Foi consultado nas últimas 72 horas**
**R3 — Faz parte de uma hipótese ativa (EM_OBSERVAÇÃO ou CONFIRMADA)**
**R4 — Foi explicitamente marcado pelo empresário como "importante"**
**R5 — Tem confiança ≥ 50 (exceto se refutado)**

### 3.2 O que é Priorizado na Retenção

| Prioridade | Tipo de Informação | Motivo |
|:----------:|--------------------|--------|
| 1 | Conhecimento Validado | É o patrimônio principal |
| 2 | Hipóteses CONFIRMADAS | Base para decisões |
| 3 | Decisões com outcome conhecido | Aprendizado real |
| 4 | Preferências do empresário | Personalização |
| 5 | Evidências recentes (≤ 7 dias) | Contexto imediato |
| 6 | Hipóteses EM_OBSERVAÇÃO | Potencial futuro |
| 7 | Sinais recentes | Podem gerar hipóteses |
| 8 | Interações com o empresário | Entendimento do momento |

---

## Seção 4 — Critérios de Descarte e Condensação

### 4.1 Gatilhos de Descarte

**D1 — TTL expirou:** Informação não renovada dentro do período de retenção.

**D2 — Irrelevância comprovada:** Informação com relevância < 10 por mais de 30 dias consecutivos.

**D3 — Refutação definitiva:** Hipótese refutada por evidência direta e incontestável. A hipótese é arquivada (não deletada) e removida da memória ativa.

**D4 — Excesso de capacidade:** A Short Term ou Long Term excedeu 90% de sua capacidade. Informações com menor prioridade são revisadas para possível descarte.

**D5 — Desensinar explícito:** O empresário explicitamente pede para remover um conhecimento.

### 4.2 Regras de Condensação

Condensação é a redução de múltiplos itens em um sumário preservando o essencial:

**C1 — Deduplicação:**
- Se 3+ evidências apontam para a mesma conclusão, elas são substituídas por 1 evidência consolidada com confiança = média das 3 × 1.1 (bonus por consistência)
- As evidências originais são mantidas em Archived (histórico)

**C2 — Sumarização temporal:**
- 30 dias de interações → 1 parágrafo sumário do que foi aprendido
- 90 dias de decisões → sumário de padrões de decisão
- Cada sumário é armazenado como um novo item de memória com referência aos itens originais

**C3 — Resolução de conflito:**
- Se 2 evidências se contradizem, o Motor:
  1. Mantém ambas (se não houver evidência mais forte para refutar uma)
  2. Marca o conflito explicitamente
  3. Registra qual evidência tem maior confiança
  4. Aguarda nova evidência para resolver

**C4 — Arquivamento por baixa relevância:**
- Informação que não foi consultada em 90 dias é automaticamente movida para Archived
- Exceção: Conhecimento Validado permanece em Long Term mesmo sem consulta (é patrimônio)

### 4.3 Processo Noturno de Condensação

O ciclo noturno executa a rotina de condensação:

```
01: Agenda execução (00:00-04:00, janela de 4 horas)
02: Para cada empresa ativa:
03:   Calcular métricas de uso da memória
04:   Aplicar D2 (irrelevância) — descartar ou arquivar
05:   Aplicar D4 (excesso) — revisar itens de menor prioridade
06:   Aplicar C1 (deduplicação) — unir evidências convergentes
07:   Aplicar C2 (sumarização) — condensar períodos
08:   Aplicar C4 (arquivamento) — mover não acessados
09:   Registrar métricas da rodada de condensação
10: Publicar evento CONDENSACAO_CONCLUIDA
```

---

## Seção 5 — Memória Coletiva

### 5.1 Conceito

A memória coletiva é o conjunto de padrões anonimizados extraídos de todas as empresas da plataforma. Não contém dados individuais — apenas padrões agregados.

### 5.2 O que a Memória Coletiva Contém

| Tipo de Padrão | Origem | Exemplo |
|----------------|--------|---------|
| Decisão → Outcome | Agregação anônima | "70% das empresas que cortaram despesas administrativas melhoraram margem em 3 meses" |
| Correlação setorial | Agregação por setor | "Empresas de varejo têm sazonalidade em dezembro" |
| Padrão de erro | Frequência de hipóteses refutadas | "Hipótese de que 'aumentar preço reduz vendas' foi refutada em 60% dos casos" |
| Ciclo de aprendizado | Tempo médio para Confiança ≥ 70 | "Empresas de serviço levam 45 dias para ter conhecimento validado sobre fluxo de caixa" |

### 5.3 Como a Memória Coletiva é Usada

A memória coletiva é consultada quando:
- Uma nova empresa entra (acelera aprendizado com padrões do setor)
- Uma decisão tem baixa confiança individual (coletivo como referência)
- Um padrão não é conclusivo em uma única empresa

### 5.4 Privacidade

- Nenhum dado específico de empresa individual é armazenado na memória coletiva
- Padrões são extraídos apenas de conhecimento validado (não de hipóteses em observação)
- Empresas podem optar por não participar do coletivo (feature flag)

---

## Seção 6 — Memória Individual

### 6.1 Conceito

A memória individual é o patrimônio cognitivo exclusivo de uma empresa. Todo conhecimento, hipótese, decisão e evidência registrados para uma empresa residem em sua memória individual.

### 6.2 Isolamento

A memória individual é estritamente isolada por empresaId (Lei 8 da Constituição). Nenhum processo pode acessar memória de outra empresa. O prisma-tenant-safe é a barreira técnica que garante este isolamento.

### 6.3 Composição

A memória individual de cada empresa contém:
- Todos os modelos cognitivos (MemoriaCognitiva, Evidencia, Hipotese, AcaoCognitiva, Outcome, ConhecimentoValidado)
- Preferências e perfil do empresário
- Histórico de interações e decisões
- Contexto cognitivo atual e histórico
- Métricas de confiança específicas da empresa

---

## Seção 7 — Descobertas, Pressupostos, Lacunas, Riscos

### Descobertas

1. A memória da Ponte Digital não precisa ser um sistema de armazenamento complexo. O banco de dados existente (PostgreSQL via Prisma) com os modelos já definidos é suficiente.
2. O maior desafio não é armazenar — é condensar. A rotina noturna de condensação é o componente mais crítico.
3. A separação entre Short Term e Long Term pode ser implementada com um campo `nivelMemoria` no modelo MemoriaCognitiva + TTL.

### Pressupostos

1. **P1:** 100 itens de Working Memory é suficiente para uma sessão típica.
2. **P2:** 10.000 itens de Long Term é suficiente para empresas maduras.
3. **P3:** O ciclo noturno de 4 horas é suficiente para processar todas as empresas ativas.

### Lacunas

1. **L1:** A fórmula de condensação (C1) não especifica como "3 evidências apontam para a mesma conclusão" — qual o algoritmo de similaridade?
2. **L2:** A reativação de memória arquivada precisa de gatilhos explícitos. Quem dispara a reativação? O empresário consultando? Um sinal correlacionado?
3. **L3:** A memória coletiva precisa de um mecanismo de extração de padrões — não foi especificado.

### Riscos

1. **R1 — Short Term overflow:** Se uma empresa gera muitas evidências em 30 dias (> 1.000), itens podem ser descartados antes da condensação. Mitigação: aumentar limite para empresas de alto volume ou condensar com mais frequência.
2. **R2 — Perda por condensação agressiva:** Se a condensação for muito agressiva, detalhes importantes podem ser perdidos. Mitigação: as evidências originais são sempre preservadas em Archived (a condensação cria sumários, não substitui originais).
3. **R3 — Vazamento de memória coletiva:** Padrões anonimizados podem ser combinados para reidentificar empresas. Mitigação: N mínimo de 30 empresas para qualquer padrão coletivo.

### Conflitos

Nenhum conflito encontrado. ADR-019, ADR-026 e modelos Prisma existentes são consistentes com esta especificação.

### Impacto Futuro

1. A estrutura de memória em 4 níveis permite que o Motor escale para milhões de empresas sem degradação de performance.
2. A rotina noturna de condensação pode ser paralelizada por região ou lote de empresas.
3. A memória coletiva pode evoluir para um sistema de recomendação entre empresas sem violar privacidade.
