# Modelo de Contexto

> **Programa 12 — Fase 3: Motor Cognitivo**
> Versão: 1.0
> Propósito: Definir como a Ponte Digital monta, reduz, seleciona e descarta contexto

---

## Preâmbulo

O contexto é o elemento central do raciocínio cognitivo. Sem contexto, dados são apenas ruído. Com contexto excessivo, o Motor se perde em irrelevâncias. Com contexto insuficiente, as decisões são cegas.

Este documento especifica o mecanismo de montagem, compressão, seleção e descarte de contexto que permite ao Motor operar com milhares de informações sem se afogar nelas.

O Contexto Cognitivo é sempre um pacote fechado e imutável (ADR-021). Este documento define como esse pacote é construído.

---

## Seção 1 — Como montar contexto

### 1.1 Fontes de Contexto

O Motor coleta contexto de 7 fontes distintas, cada uma com prioridade e peso diferentes:

| Fonte | Prioridade | Peso Máximo | Conteúdo |
|-------|-----------|-------------|----------|
| Empresário (última interação) | 1 | 0.30 | O que ele disse, onde clicou, o que perguntou |
| Estado cognitivo atual | 2 | 0.20 | Em que estado a empresa está (MODELO_DE_ESTADOS.md) |
| Sinais ativos | 3 | 0.15 | Sinais não processados ou em observação |
| Conhecimento validado | 4 | 0.12 | O que o Motor sabe sobre a empresa |
| Ciclo de vida | 5 | 0.10 | Fase de maturidade (MODELO_DE_EVOLUCAO.md) |
| Domínio ativo | 6 | 0.08 | Seção da plataforma que o empresário está usando |
| Histórico recente | 7 | 0.05 | Decisões e resultados dos últimos 7 dias |

### 1.2 Estrutura do Contexto Cognitivo

```typescript
interface ContextoCognitivo {
  // Metadados
  id: string;
  empresaId: string;
  criadoEm: string; // timestamp
  expiraEm: string; // timestamp (TTL do contexto)
  correlationId: string; // ciclo que gerou este contexto

  // Conteúdo
  estadoAtual: EstadoCognitivo; // ver MODELO_DE_ESTADOS.md
  faseMaturidade: FaseEvolucao; // ver MODELO_DE_EVOLUCAO.md
  sinaisAtivos: SinalProcessado[];
  conhecimentoRelevante: ConhecimentoRef[]; // referências, não objetos completos
  decisoesPendentes: DecisaoPendente[];
  metricasConfianca: MetricasConfianca;
  metricasRelevancia: MetricasRelevancia;

  // Interação atual
  dominioAtivo: 'CRM' | 'FINANCEIRO' | 'TAREFAS' | 'DASHBOARD' | 'CONVERSA' | 'CENTRO_DECISAO';
  ultimaInteracao: string; // timestamp
  frequenciaInteracoes: number; // média de interações/dia

  // Restrições
  limitesPlano: LimitesPlano;
  permissoes: Permissao[];
}
```

### 1.3 Processo de Montagem

```
t0: Gatilho de montagem de contexto (nova interação, ciclo, sinal)
t1: Coletar estado cognitivo atual (leitura de banco, cache)
t2: Coletar sinais ativos (não processados ou em observação)
t3: Coletar conhecimento relevante (filtrado por domínio e urgência)
t4: Coletar decisões pendentes (não validadas ou em execução)
t5: Coletar métricas de confiança (fontes, evidências)
t6: Compactar (Seção 2)
t7: Produzir pacote imutável
t8: Cachear com TTL de 5 minutos (ou até novo evento)
```

---

## Seção 2 — Como reduzir milhares de informações

### 2.1 O Problema da Cardinalidade

Uma empresa média na Ponte Digital pode ter:
- 58+ tipos de objetos cognitivos
- Centenas de transações financeiras
- Dezenas de clientes
- Múltiplos sinais ativos
- Histórico de decisões
- Conhecimento validado acumulado

Incluir tudo no contexto é inviável. O Motor precisa reduzir.

### 2.2 Técnicas de Redução

**T1 — Janela temporal:**
Apenas informações dos últimos N dias participam do contexto ativo. N varia por tipo:

| Tipo de Informação | Janela | Motivo |
|--------------------|--------|--------|
| Sinais | 7 dias | Sinais antigos já foram processados ou expiraram |
| Transações | 30 dias | Financeiro recente para contexto de decisão |
| Clientes | 90 dias | Clientes inativos não são relevantes |
| Conhecimento | Ilimitado | Conhecimento validado não expira (mas pode ser arquivado por irrelevância) |
| Decisões pendentes | Até resolução | Pendências ativas sempre participam |

**T2 — Sumarização por domínio:**
Em vez de incluir todas as transações, o Motor inclui agregados:
- Total de receitas (mês)
- Total de despesas (mês)
- Top 5 despesas
- Variação percentual vs mês anterior

**T3 — Filtro por relevância:**
Apenas informações com score de relevância ≥ 30 participam (ver Seção 4).

**T4 — Priorização por urgência:**
Informações com classificação CRÍTICA (urgência ≥ 9) têm entrada garantida no contexto, independentemente de outros filtros.

**T5 — Referências em vez de objetos:**
O contexto não carrega objetos completos. Carrega referências (ID + tipo + resumo). O objeto completo é carregado sob demanda quando necessário para uma decisão.

### 2.3 Limite de Tamanho do Contexto

O pacote de contexto tem limite rígido:

| Métrica | Limite | Ação ao exceder |
|---------|--------|-----------------|
| Número de referências | 100 | Remover referências com menor relevância |
| Número de sinais ativos | 20 | Silenciar sinais com urgência < 5 |
| Número de decisões pendentes | 10 | Arquivar as de menor prioridade |
| Tamanho total (JSON) | 50 KB | Comprimir descrições, remover metadados não essenciais |

---

## Seção 3 — Como selecionar evidências

### 3.1 Critérios de Seleção

Nem toda evidência registrada entra no contexto. A seleção segue critérios rigorosos:

**C1 — Força da evidência:** A evidência deve ter confiança de fonte ≥ 40 para ser considerada.

**C2 — Relevância temporal:** A evidência deve estar dentro da janela temporal (ver T1).

**C3 — Consistência:** A evidência não deve ter sido refutada por evidência mais forte. Evidências refutadas são excluídas do contexto ativo (mas mantidas no histórico para auditoria).

**C4 — Diversidade de fontes:** O Motor prefere 3 evidências de fontes diferentes a 5 evidências da mesma fonte. Evidências da mesma fonte têm peso reduzido pela metade após a segunda.

**C5 — Convicção:** Evidências que resistiram ao tempo sem refutação têm precedência sobre evidências recentes (ADR-032).

### 3.2 Score de Seleção

```
ScoreSelecao = ForcaEvidencia × (1 + FatorDiversidade) × FatorConviccao
```

- ForcaEvidencia: confiança da fonte (0-100) / 100
- FatorDiversidade: 0 se for a 5+ evidência da mesma fonte, 0.3 se for a 3ª-4ª, 0.5 se for a 2ª, 1 se for a 1ª
- FatorConviccao: 1 + (diasSemRefutacao × 0.01), limitado a 2.0

Apenas evidências com ScoreSelecao ≥ 0.30 entram no contexto.

---

## Seção 4 — Como definir relevância

### 4.1 Fórmula de Relevância

```
Relevancia = (Urgencia × 0.4) + (Impacto × 0.3) + (ProximidadeContexto × 0.2) + (InteresseEmpresario × 0.1)
```

Onde:
- **Urgência (0-10):** quão rápido precisa de atenção
- **Impacto (0-10):** consequência de ignorar
- **Proximidade de Contexto (0-10):** quão relacionada está com o domínio ativo no momento
- **Interesse do Empresário (0-10):** inferido de interações anteriores (o empresário clica em recomendações financeiras? Então finanças têm maior interesse)

### 4.2 Thresholds de Relevância

| Score | Classificação | Inclusão no Contexto |
|-------|--------------|---------------------|
| ≥ 80 | CRÍTICA | Garantida — sempre incluída |
| ≥ 50 | ALTA | Incluída (sujeita a limites de tamanho) |
| ≥ 30 | MÉDIA | Incluída se houver espaço |
| ≥ 10 | BAIXA | Incluída apenas em contexto expandido |
| < 10 | IRRELEVANTE | Excluída |

### 4.3 Relevância por Papel

A relevância varia conforme quem está interagindo:

| Papel | Peso de Interesse alterado | Efeito |
|-------|---------------------------|--------|
| Empresário (dono) | Interesse = 1.0 | Todas as áreas têm peso igual |
| Gerente | Interesse × 1.5 para sua área | Sua área tem mais relevância |
| Contador | Interesse = 1.0 para financeiro | Contexto financeiro expandido |
| Consultor | Interesse × 0.5 para dados internos | Contexto operacional reduzido |

---

## Seção 5 — Como definir memória ativa

### 5.1 Conceito

Memória ativa é o subconjunto do patrimônio cognitivo que está disponível para consulta imediata pelo Motor durante o ciclo de raciocínio. Não precisa ser carregado de banco — está em cache.

### 5.2 O que Compõe a Memória Ativa

| Componente | Cache | TTL | Atualização |
|-----------|-------|-----|-------------|
| Contexto Cognitivo vigente | Cache | 5 min | A cada novo ciclo |
| Últimas 10 interações | Cache | Sessão | A cada interação |
| Top 20 sinais ativos | Cache | 1 min | Contínua |
| Conhecimento validado frequente | Cache | 1 hora | A cada ciclo noturno |
| Perfil do empresário | Cache | 24 horas | A cada nova sessão |
| Métricas de confiança agregadas | Cache | 1 hora | A cada ciclo noturno |

### 5.3 Gerenciamento de Cache

A memória ativa usa o sistema de cache existente (lib/cache.ts, ADR-014) com as seguintes regras:

- **Cache hit:** usa o valor em cache sem consultar banco
- **Cache miss:** carrega de banco, popula cache, marca como "quente"
- **Cache stale:** usa o valor obsoleto (se disponível) e agenda atualização assíncrona
- **Cache invalidation:** eventos específicos invalidam partes do cache (ex.: nova transação invalida cache de contexto financeiro)

---

## Seção 6 — Como descartar contexto

### 6.1 Ciclo de Vida do Contexto

```
CRIAÇÃO (novo ciclo) → USO (1+ decisões) → EXPIRAÇÃO (TTL) → DESCARTE (remoção)
```

### 6.2 Gatilhos de Descarte

**D1 — TTL expirou:** O contexto tem TTL de 5 minutos. Se não for usado dentro deste período, é descartado automaticamente.

**D2 — Contexto substituído:** Um novo ciclo de raciocínio produziu um novo contexto. O anterior é descartado (arquivado no patrimônio, removido da memória ativa).

**D3 — Domínio mudou:** O empresário mudou de seção (ex.: de CRM para Financeiro). O contexto anterior é substituído por um novo contexto focado no novo domínio.

**D4 — Sessão encerrada:** O empresário fechou a plataforma. O contexto da sessão é descartado (Working Memory, ADR-019).

**D5 — Forçado por limite de tamanho:** O contexto excedeu o limite de 50 KB. Informações com menor relevância são removidas até que o contexto caiba no limite.

### 6.3 O que NÃO é Descartado

O descarte de contexto NÃO significa perda de informação. Os seguintes elementos são preservados:
- **Hipóteses:** persistidas no banco independentemente do contexto
- **Evidências:** persistidas no banco
- **Decisões:** persistidas como Ação Cognitiva
- **Conhecimento Validado:** permanece no banco (patrimônio permanente)
- **Sinais:** persistidos no Histórico de Sinais

Apenas o pacote de contexto (que é uma montagem temporária) é descartado. O patrimônio cognitivo subjacente permanece intacto.

---

## Seção 7 — Modos Especiais de Contexto

### 7.1 Contexto de Primeira Conversa

Durante a primeira conversa (primeiros 7 dias), o contexto é expandido para incluir:
- Empresa descriptor completo (ramo, porte, tempo de mercado)
- Nível de maturidade digital
- Objetivos declarados

### 7.2 Contexto de Crise

Quando o estado cognitivo da empresa é CRÍTICO:
- Janela temporal expandida para 90 dias (mais histórico para análise)
- Todos os domínios entram no contexto (não apenas o domínio ativo)
- Conhecimento validado sobrecarregado (mais referências)
- Decisões pendentes sempre visíveis

### 7.3 Contexto de Ciclo Noturno

No ciclo agendado noturno:
- Nenhuma interação de usuário (empresário não está online)
- Contexto foca em acumulado do dia
- Revalidação de conhecimento é prioridade
- Decisões não são tomadas (apenas observação e validação)

---

## Seção 8 — Descobertas, Pressupostos, Lacunas, Riscos

### Descobertas

1. A montagem de contexto é o estágio mais caro computacionalmente do ciclo de raciocínio — mas é o que mais se beneficia de cache.
2. A técnica de sumarização por domínio (T2) reduz o tamanho do contexto em ~90% sem perda significativa de informação para decisões.
3. O sistema de referências em vez de objetos completos (T5) é essencial para escalar.

### Pressupostos

1. **P1:** 5 minutos de TTL é suficiente para a maioria dos ciclos de raciocínio. Confirmar com uso real.
2. **P2:** 50 KB de limite é adequado. Pode precisar ser maior para empresas complexas.
3. **P3:** A janela de 90 dias para clientes é suficiente para contexto de decisão. Clientes com ciclos de venda mais longos podem precisar de janela maior.

### Lacunas

1. **L1:** Mecanismo de inferência do "domínio ativo" não especificado — como o Motor sabe que o empresário está no CRM vs Financeiro?
2. **L2:** A regra de "relevância por papel" (Seção 4.3) depende de um sistema de papéis que pode não estar implementado.
3. **L3:** Coletivo de similaridade entre empresas (necessário para ScoreColetivo do Documento 2) não está especificado.

### Riscos

1. **R1 — Contexto muito pequeno:** Se o limite de 50 KB for atingido com frequência, informações relevantes são descartadas. Mitigação: monitorar taxa de estouro de limite e ajustar.
2. **R2 — Cache stale:** Se eventos de invalidação não forem publicados corretamente, o Motor decide com base em contexto desatualizado. Mitigação: TTL curto (5 min) e dupla verificação para decisões críticas.
3. **R3 — Domínio mal identificado:** Se o Motor identifica o domínio errado (ex.: acha que é CRM quando é Financeiro), o contexto é montado para o domínio errado. Mitigação: usar a URL + última interação como fonte da verdade.

### Conflitos

Nenhum conflito com código, ADRs, ou documentos anteriores.

### Impacto Futuro

1. O modelo de contexto com referências permite que novos tipos de objeto cognitivo sejam adicionados sem alterar a estrutura do pacote.
2. A técnica de sumarização pode ser refinada por domínio conforme o Motor acumula mais conhecimento.
3. O descarte seguro (que preserva o patrimônio) permite que o contexto evolua sem perder história.
