# Arquitetura do Raciocínio Cognitivo

> **Programa 12 — Fase 3: Motor Cognitivo**
> Versão: 1.0
> Propósito: Definir como a Ponte Digital pensa, raciocina, decide e aprende

---

## Preâmbulo

Este documento responde à pergunta central da Fase 3: **Como a Ponte pensa?**

Até aqui definimos o que a Ponte conhece (Fase 1 — Modelo Cognitivo Universal) e como esse conhecimento entra (Fase 2 — Arquitetura da Aquisição Cognitiva). Agora definimos o mecanismo interno que transforma dados em raciocínio, raciocínio em decisão, e decisão em aprendizado.

O Raciocínio Cognitivo não é um algoritmo único. É um sistema de camadas sobrepostas: recepção, contextualização, análise, formulação de hipóteses, validação, decisão, execução, aprendizado. Cada camada tem regras precisas de operação.

---

## Princípios do Raciocínio

### PR1 — Raciocínio é determinístico

O Motor Cognitivo nunca "adivinha". Toda conclusão é traçável até evidências concretas. O raciocínio pode usar heurísticas (para velocidade), mas toda heurística é explicitamente marcada como tal e pode ser desligada.

### PR2 — Hipótese nunca é verdade

Toda conclusão do Motor é provisória. O sistema mantém um grau de incerteza sobre cada afirmação que faz. Quanto mais tempo uma hipótese resiste a refutações, maior sua convicção (ADR-032) — mas nunca atinge certeza absoluta.

### PR3 — Silêncio é preferível a erro

Se o Motor não tem evidência suficiente para formar uma hipótese com confiança mínima, ele permanece em silêncio. Não inventa. Não completa lacunas com suposições. Não usa a IA para "preencher" o que não sabe.

### PR4 — Toda inferência é classificada

O Motor distingue explicitamente entre:
- **Fato** — dado verificado, proveniente de fonte confiável
- **Correlação** — A e B ocorrem juntos (ADR-034)
- **Causalidade** — A causa B, com evidência direta
- **Inferência** — conclusão baseada em padrão observado
- **Especulação** — hipótese sem evidência suficiente (nunca é usada para decisões)

### PR5 — Raciocínio é sempre contextual

Nenhuma conclusão existe no vácuo. Toda decisão do Motor está vinculada ao Contexto Cognitivo (ADR-021) vigente no momento em que foi tomada. Se o contexto muda, a decisão pode ser reavaliada.

### PR6 — Aprendizado realimenta o raciocínio

Toda decisão que produz um resultado observável realimenta o Motor. Resultados positivos fortalecem as hipóteses que os geraram. Resultados negativos as enfraquecem. O Motor não repete o mesmo erro sem aprendizado.

### PR7 — IA nunca participa do raciocínio

A IA (modelo de linguagem) recebe o Contexto Cognitivo já processado e traduz para linguagem natural (ADR-017). Ela não contribui com hipóteses, não avalia evidências, não toma decisões. O raciocínio é 100% determinístico. A IA é apenas a voz.

---

## Seção 1 — Como a Ponte monta raciocínio

### 1.1 O Ciclo Fundamental do Raciocínio

O raciocínio da Ponte Digital opera em um ciclo de 8 estágios. Nenhum estágio pode ser pulado (ADR-024):

```
ESTÍMULO → PERCEPÇÃO → CONTEXTUALIZAÇÃO → ANÁLISE → HIPÓTESE → VALIDAÇÃO → DECISÃO → REGISTRO
```

Cada estágio transforma a saída do anterior. A saída de cada estágio é imutável após produzida — se o contexto muda, um novo ciclo é iniciado, não um ajuste no meio do ciclo existente.

### 1.2 Estágio 1 — Percepção

**O que faz:** Converte estímulo externo em sinal processável.

**Entrada:** Estímulo bruto (conversa, importação, dado novo, ciclo agendado, evento externo)
**Processamento:**
1. Identificar o tipo de estímulo (explícito, implícito, reativo, agendado)
2. Extrair entidades relevantes (ver MODELO_COGNITIVO_UNIVERSAL.md — 58 objetos)
3. Classificar urgência inicial (0-10) baseada apenas no tipo de estímulo
4. Marcar fonte (empresário, sistema, importação, terceiro)
5. Atribuir correlationId

**Saída:** `SinalProcessado { tipo, entidades[], urgenciaInicial, correlationId, fonte, timestamp }`

**Regras:**
- Percepção nunca descarta estímulo — tudo que entra é registrado como sinal
- Urgência inicial pode ser ajustada nos estágios seguintes
- Fonte determina o peso inicial do sinal (ver ARQUITETURA_DA_CONFIANCA.md)

### 1.3 Estágio 2 — Contextualização

**O que faz:** Insere o sinal no contexto cognitivo atual da empresa.

**Entrada:** SinalProcessado + ContextoCognitivo (pacote fechado)
**Processamento:**
1. Carregar Contexto Cognitivo vigente (ADR-021)
2. Identificar relacionamentos entre o sinal e objetos cognitivos existentes
3. Verificar histórico (a empresa já viu isso antes?)
4. Calcular relevância do sinal no momento atual
5. Produzir ContextoEnriquecido

**Saída:** `ContextoEnriquecido { sinal, contextoVigente, relacoes[], relevancia, historico[] }`

**Regras:**
- O Contexto Cognitivo é IMUTÁVEL durante o ciclo — se expirar, novo ciclo começa
- Relevância considera: momento da empresa, prioridades ativas, histórico de interações
- Se o sinal já foi processado antes (deduplicação), o ciclo pode ser interrompido

### 1.4 Estágio 3 — Análise

**O que faz:** Examina o sinal contextualizado para extrair padrões, anomalias e correlações.

**Entrada:** ContextoEnriquecido
**Processamento:**
1. Aplicar detectores de padrão (ver MODELO_DE_OBSERVACAO_CONTINUA.md)
2. Identificar anomalias (desvios do comportamento esperado)
3. Detectar correlações com sinais anteriores
4. Calcular força da evidência (0-100)
5. Classificar tipo de análise: fato, correlação, anomalia, tendência

**Saída:** `Analise { padroes[], anomalias[], correlacoes[], forcaEvidencia, tipoAnalise, dadosSuporte[] }`

**Regras:**
- Análise nunca produz conclusões — apenas observações estruturadas
- Força da evidência depende da quantidade e qualidade das fontes (ver MODELO_DE_CONFIANCA.md)
- Correlações são marcadas explicitamente como CORRELACIONAIS (ADR-034)

### 1.5 Estágio 4 — Hipótese

**O que faz:** Formula hipóteses explicativas para as observações da análise.

**Entrada:** Analise
**Processamento:**
1. Para cada padrão/anomalia detectada, formular uma ou mais hipóteses
2. Atribuir confiança inicial com base na força da evidência
3. Classificar tipo de causalidade (CORRELACIONAL, CAUSAL, INDETERMINADO)
4. Registrar evidências de suporte e evidências contrárias
5. Associar ao objeto cognitivo afetado

**Saída:** `Hipotese { id, descricao, confiancaInicial, tipoCausalidade, evidenciasSuporte[], evidenciasContrarias[], objetoAfetado, estado }`

**Regras:**
- Hipóteses sempre são registradas com estado inicial `EM_OBSERVACAO`
- Se confiança inicial < 20, a hipótese é descartada automaticamente (não vale observar)
- Múltiplas hipóteses para o mesmo fenômeno são permitidas — o Motor não escolhe ainda
- Hipóteses nunca são baseadas em um único dado (N mínimo = 3 observações independentes)

### 1.6 Estágio 5 — Validação

**O que faz:** Testa as hipóteses contra evidências disponíveis e planeja coleta de novas evidências.

**Entrada:** Hipotese[]
**Processamento:**
1. Verificar cada hipótese contra o conjunto de evidências existente
2. Identificar lacunas de evidência (o que falta para confirmar ou refutar)
3. Priorizar hipóteses por impacto (qual merece ser investigada primeiro)
4. Se evidências insuficientes: planejar perguntas ou observações adicionais
5. Se evidências suficientes: classificar como CONFIRMADA ou REFUTADA

**Saída:** `HipoteseValidada { hipotese, estado, evidenciasColetadas, lacunas[], prioridade, acoesSugeridas[] }`

**Regras:**
- Confirmação exige: 3+ evidências independentes, consistentes, convergindo para a mesma conclusão
- Refutação exige: 1 evidência direta e incontestável, OU 3+ evidências convergentes
- Se não há evidência suficiente, a hipótese permanece EM_OBSERVACAO
- O Motor pode sugerir perguntas ao empresário para coletar evidências (ver MODELO_DE_PERGUNTAS_INTELIGENTES.md)

### 1.7 Estágio 6 — Decisão

**O que faz:** Decide o que fazer com base nas hipóteses validadas.

**Entrada:** HipoteseValidada[]
**Processamento:**
1. Agregar hipóteses confirmadas como insumos para decisão
2. Aplicar modelo de priorização (ver MODELO_DE_PRIORIZACAO_COGNITIVA.md)
3. Verificar impacto nas áreas da empresa
4. Consultar regras de intervenção (ver MODELO_DE_INTERVENCAO.md)
5. Produzir decisão

**Saída:** `Decisao { tipo, acaoRecomendada, confianca, impactoEsperado, alternativas[], evidenciasBase[], prioridade }`

**Regras:**
- Decisão sempre explicita o nível de confiança
- Decisões com confiança < 50 exigem validação do empresário
- Decisões baseadas apenas em correlação são marcadas como CORRELACIONAIS
- Nenhuma decisão é executada sem antes passar pelo estágio de registro

### 1.8 Estágio 7 — Registro

**O que faz:** Persiste todo o ciclo de raciocínio como patrimônio cognitivo.

**Entrada:** Decisao + todo o ciclo anterior
**Processamento:**
1. Persistir sinal original no Histórico de Sinais
2. Persistir contexto enriquecido como Memória de Trabalho
3. Persistir análise como Evidência
4. Persistir hipótese (confirmada ou refutada) como Hipótese
5. Persistir decisão como Ação Cognitiva
6. Publicar eventos para todo o ciclo

**Saída:** Patrimônio cognitivo persistido + eventos publicados

**Regras:**
- Lei 10 da Constituição: toda engine cognitiva registra sua saída
- Nada é mantido apenas em memória — todo ciclo gera registros
- Hipóteses refutadas não são deletadas — são marcadas como REFUTADA com a evidência que as refutou

### 1.9 Ciclo Completo no Tempo

```
t0: Estímulo chega (conversa, dado novo, ciclo)
t1: Percepção → SinalProcessado (10-50ms)
t2: Contextualização → ContextoEnriquecido (50-200ms)
t3: Análise → Analise (100-500ms)
t4: Hipótese → Hipotese (50-200ms)
t5: Validação → HipoteseValidada (100ms-segundos, depende de perguntas ao usuário)
t6: Decisão → Decisao (50-100ms)
t7: Registro → Patrimônio persistido (100-500ms)

Total modo automático: ~0.5-1.5 segundos
Total com perguntas ao usuário: minutos a dias
```

---

## Seção 2 — Como a Ponte escolhe hipóteses

### 2.1 Seleção Inicial

Quando múltiplas hipóteses competem para explicar o mesmo fenômeno, o Motor aplica critérios objetivos de seleção:

**Critério 1 — Poder explicativo:** A hipótese que explica mais observações com menos suposições vence.
**Critério 2 — Consistência histórica:** A hipótese consistente com conhecimento validado anteriormente tem precedência.
**Critério 3 — Especificidade:** A hipótese mais específica (que faz previsões testáveis) tem precedência sobre hipóteses genéricas.
**Critério 4 — Falsificabilidade:** Se a hipótese não pode ser refutada por nenhuma observação possível, ela é rejeitada automaticamente.

### 2.2 Evolução de Confiança

```
Confiança(t) = ConfiançaInicial + Σ(evidênciasConfirmadoras × peso) - Σ(evidênciasRefutadoras × peso) - Decaimento(t)
```

Onde:
- ConfiançaInicial: determinada pela fonte (ADR-025)
- Evidências confirmadoras: cada nova observação consistente aumenta a confiança
- Evidências refutadoras: cada observação contraditória diminui a confiança
- Decaimento: a confiança decai com o tempo sem revalidação (ADR-026)
- Peso: determinado pela qualidade da fonte (ver MODELO_DE_CONFIANCA.md)

### 2.3 Transições de Estado

```
EM_OBSERVAÇÃO ──(confiança ≥ 70)──→ CONFIRMADA
EM_OBSERVAÇÃO ──(confiança < 10)──→ DESCARTADA
EM_OBSERVAÇÃO ──(tempo > 30 dias sem revalidação)──→ ARQUIVADA
CONFIRMADA ──(evidência refutadora forte)──→ REFUTADA
CONFIRMADA ──(tempo > 90 dias sem revalidação)──→ EM_REVALIDAÇÃO
REFUTADA ──(novas evidências)──→ EM_OBSERVAÇÃO (novo ciclo)
```

---

## Seção 3 — Como a Ponte elimina hipóteses

### 3.1 Critérios de Eliminação

Uma hipótese é eliminada (DESCARTADA ou REFUTADA) quando qualquer um dos seguintes critérios é atendido:

**E1 — Evidência direta contrária:** Uma observação que contradiz diretamente a hipótese, com confiança de fonte ≥ 80.

**E2 — Predição falhou:** A hipótese fez uma previsão testável que não se concretizou. A falha da predição reduz a confiança em 50% do valor atual.

**E3 — Explicação rival venceu:** Uma hipótese alternativa explica os mesmos dados com maior poder explicativo, consistência e especificidade. A hipótese inferior é descartada.

**E4 — Fonte original desmentida:** A fonte que gerou a hipótese foi desmentida ou perdeu credibilidade. A hipótese entra em revalidação forçada.

**E5 — Sinal expirou:** O sinal que originou a hipótese expirou (TTL configurado por tipo de sinal). A hipótese é arquivada.

### 3.2 Regra de Pareto Cognitivo

O Motor mantém ativas no máximo 7 hipóteses por domínio cognitivo por empresa. Se o limite é excedido, as hipóteses com menor confiança × impacto são arquivadas automaticamente. Este limite impede que o raciocínio se disperse em múltiplas direções.

---

## Seção 4 — Como a Ponte aprende

### 4.1 Tipos de Aprendizado

O Motor distingue três tipos de aprendizado:

| Tipo | Fonte | Score Inicial | Exemplo |
|------|-------|--------------|---------|
| Explícito | Empresário ensina diretamente | ≥ 70 (ADR-025) | "Meu negócio é sazonal no verão" |
| Inferido | Motor observa padrões | ≤ 30 | "Vendas caem em janeiro" |
| Validado | Empresário confirma inferência | ≥ 50 | "Sim, janeiro é realmente fraco" |

### 4.2 Ciclo de Aprendizado

```
Decisão → Execução → Resultado → Comparação(esperado × real) → Ajuste → Conhecimento
```

1. **Decisão:** O Motor decide algo com base em hipóteses ativas
2. **Execução:** A decisão gera uma ação (recomendação, alerta, pergunta, tarefa)
3. **Resultado:** O resultado da ação é observado
4. **Comparação:** O Motor compara o resultado com o esperado (projetado pela hipótese)
5. **Ajuste:** Se o resultado confirma a hipótese → confiança aumenta. Se contradiz → confiança diminui
6. **Conhecimento:** Se a hipótese atinge confiança ≥ 85 e está CONFIRMADA por ≥ 30 dias, ela se torna Conhecimento Validado

### 4.3 Aprendizado por Reforço Negativo

Quando uma decisão produz um resultado pior que o esperado, o Motor:
1. Reduz a confiança da hipótese que gerou a decisão
2. Registra o erro como evidência refutadora
3. Verifica hipóteses alternativas que previram o resultado correto
4. Se uma hipótese rival previu corretamente, sua confiança aumenta

### 4.4 Esquecimento como Aprendizado

O esquecimento programado (ADR-026) é parte integrante do aprendizado:
- Conhecimento não revalidado perde relevância gradualmente
- Conhecimento contradito é refutado
- Conhecimento irrelevante é arquivado
- O empresário pode explicitamente "desensinar" (reduzir score a 0)

---

## Seção 5 — Como a Ponte muda de opinião

### 5.1 Gatilhos de Mudança

O Motor muda de opinião quando:

**G1 — Evidência contraditória forte:** Uma única evidência direta e incontestável contradiz a crença atual.

**G2 — Acumulação de evidências contrárias:** 3+ evidências independentes apontam na direção oposta (mesmo que cada uma individualmente seja fraca).

**G3 — Mudança no contexto:** O contexto cognitivo mudou significativamente (ex.: a empresa mudou de ramo, o mercado mudou).

**G4 — Ciclo de revalidação:** Conhecimento validado há mais de 90 dias entra em revalidação automática. Se as evidências originais não podem mais ser verificadas, o conhecimento é rebaixado para hipótese.

**G5 — Ensino explícito:** O empresário diz explicitamente "isso mudou" ou "isso não é mais verdade".

### 5.2 Velocidade da Mudança

| Gatilho | Velocidade | Razão |
|---------|-----------|-------|
| Evidência direta forte | Imediata | A evidência é incontestável |
| Acumulação de contrárias | Gradual (dias) | Cada evidência reduz confiança em 10-30% |
| Mudança de contexto | Imediata | Novo contexto → novo ciclo de raciocínio |
| Revalidação agendada | Após 90 dias | Ciclo natural de revisão |
| Ensino explícito | Imediata | O empresário é a maior autoridade (se score ≥ 70) |

### 5.3 Resistência à Mudança

O Motor tem resistência inercial proporcional à convicção (ADR-032):
- Conhecimento com convicção ≥ 1 ano requer 2x mais evidências para ser alterado
- Conhecimento com convicção ≥ 2 anos requer 3x mais evidências
- Conhecimento validado pelo empresário explicitamente requer validação explícita do empresário para ser alterado

---

## Seção 6 — Como a Ponte evita alucinação

### 6.1 Definição de Alucinação na Ponte Digital

Alucinação no contexto da Ponte Digital não é o mesmo que num LLM. Para o Motor Cognitivo, alucinação é:

**Qualquer afirmação, recomendação ou decisão que não esteja baseada em evidências registradas e rastreáveis.**

### 6.2 Barreiras contra alucinação

**B1 — Separação IA/Motor (ADR-017):**
A IA nunca participa do raciocínio. Ela recebe o Contexto Cognitivo já processado e traduz. Se a IA "alucinar" na tradução, o conteúdo cognitivo subjacente permanece correto. A alucinação é limitada à apresentação, não ao conhecimento.

**B2 — Toda afirmação tem origem rastreável:**
Cada elemento do raciocínio (sinal, contexto, evidência, hipótese, decisão) está vinculado ao ciclo que o produziu. Não existe "conhecimento órfão".

**B3 — Confiança explícita:**
Toda recomendação é apresentada com seu nível de confiança. Se confiança < 50, a recomendação é qualificada como "baixa confiança" e sugere-se que o empresário valide.

**B4 — Modo Silêncio (nível 0 de intervenção):**
Se o Motor não tem confiança suficiente para afirmar algo, ele permanece em silêncio. Não preenche lacunas (ver MODELO_DE_INTERVENCAO.md).

**B5 — Falsificabilidade obrigatória:**
Toda hipótese registrada deve ser falsificável — deve existir pelo menos uma observação possível que a refutaria. Hipóteses não falsificáveis são rejeitadas automaticamente.

**B6 — Mínimo de 3 observações:**
Nenhuma hipótese é formada com base em menos de 3 observações independentes (exceto ensino explícito do empresário, que tem score inicial ≥ 70).

### 6.3 Detecção de Alucinação

O Motor executa uma verificação de integridade antes de qualquer saída:

```
VerificacaoIntegridade:
  ├─ A saída está baseada em evidências registradas? → Se não → BLOQUEAR
  ├─ A confiança da evidência é ≥ threshold mínimo? → Se não → BLOQUEAR
  ├─ A saída contradiz conhecimento validado? → Se sim → VERIFICAR
  ├─ A saída está dentro do domínio cognitivo da empresa? → Se não → BLOQUEAR
  └─ A saída pode ser rastreada até um ciclo de raciocínio? → Se não → BLOQUEAR
```

---

## Seção 7 — Quando a Ponte decide permanecer em silêncio

### 7.1 Níveis de Silêncio

O Motor opera em 6 níveis de intervenção (ver MODELO_DE_INTERVENCAO.md para especificação completa). O nível 0 é o silêncio absoluto:

| Nível | Ação | Quando |
|-------|------|--------|
| 0 — Silêncio | Nada | Confiança < 20 ou irrelevante |
| 1 — Observação | Registra internamente | Confiança ≥ 20 mas < 40 |
| 2 — Alerta | Notifica sem recomendar | Confiança ≥ 40 mas < 60 |
| 3 — Sugestão | Recomenda com baixa confiança | Confiança ≥ 60 mas < 80 |
| 4 — Ação | Recomenda com alta confiança | Confiança ≥ 80 |
| 5 — Plano | Cria plano de ação completo | Confiança ≥ 90 e impacto alto |

### 7.2 Regras de Silêncio

**S1 — Irrelevância contextual:** O sinal não tem relação com o contexto atual da empresa. Mesmo com confiança alta, o Motor não interrompe.

**S2 — Baixa confiança:** Confiança < 20. O Motor registra internamente e observa. Se a confiança evoluir, o nível de intervenção sobe.

**S3 — Saturação do empresário:** O empresário recebeu mais de 3 intervenções nas últimas 24 horas. O Motor silencia até o dia seguinte, a menos que o novo sinal seja classificado como CRÍTICO.

**S4 — Ciclo noturno:** Durante o período noturno (23h-6h), o Motor só intervém para sinais classificados como CRÍTICOS (risco imediato, perda financeira confirmada).

**S5 — Modo Aprendizado:** O Motor está em fase de observação inicial de uma empresa (primeiros 7 dias). Durante este período, o nível máximo de intervenção é 1 (observação), exceto para perguntas de cadastro.

**S6 — Sempre silêncio quando:** O Motor não tem permissão para acessar o domínio (ex.: plano gratuita não inclui recomendações).

### 7.3 Silêncio como Resposta

O silêncio não é ausência de processamento. É uma resposta ativa: o Motor processou, analisou, e decidiu conscientemente não intervir. Esta decisão é registrada como parte do patrimônio cognitivo.

---

## Seção 8 — O Ciclo de Raciocínio em Modos Especiais

### 8.1 Modo Conversa

Quando o empresário está em uma conversa (fluxo da primeira conversa ou chat), o ciclo de raciocínio é acelerado:

```
Percepção → Contextualização → Análise → (pula Hipótese se for pergunta direta) → Decisão → Registro
```

A hipótese é pulada apenas quando:
- A pergunta é objetiva ("qual meu saldo?")
- A resposta está em fato já registrado
- Não há ambiguidade na interpretação

### 8.2 Modo Primeira Conversa

Durante a primeira conversa (FLUXO_DA_PRIMEIRA_CONVERSA.md), o ciclo é adaptado:

```
Percepção → Contextualização → Análise → Hipótese → (pula Validação → decisão é "perguntar mais") → Registro
```

A validação é substituída por "formular próxima pergunta". O objetivo não é decidir, é conhecer.

### 8.3 Modo Ciclo Agendado

No ciclo agendado (noturno, semanal), o ciclo é completo, mas sem o estágio de Decisão:

```
Percepção (dados acumulados desde o último ciclo) → Contextualização → Análise → Hipótese → Validação → Registro
```

A decisão é delegada ao próximo ciclo ou a um gatilho. O ciclo noturno é main de observação e atualização de patrimônio.

### 8.4 Modo Crítico

Quando um sinal é classificado como CRÍTICO (urgência ≥ 9):

```
Percepção → Contextualização → Análise (acelerada) → Hipótese → Decisão (acelerada) → Registro → Intervenção imediata
```

Validação é reduzida ao mínimo: verificação de integridade básica (Seção 6.3). A validação completa ocorre posteriormente no próximo ciclo agendado.

---

## Seção 9 — Contratos de Interface

### 9.1 Entrada do Raciocínio

```typescript
interface Estimulo {
  tipo: 'CONVERSA' | 'IMPORTACAO' | 'DADO_NOVO' | 'CICLO_AGENDADO' | 'EVENTO_EXTERNO';
  conteudo: unknown; // depende do tipo
  fonte: {
    tipo: 'EMPRESARIO' | 'SISTEMA' | 'IMPORTACAO' | 'TERCEIRO';
    id?: string;
    confianca: number; // 0-100
  };
  timestamp: string;
  correlationId: string;
  empresaId: string;
}
```

### 9.2 Saída de cada estágio

```typescript
interface SinalProcessado {
  id: string;
  correlationId: string;
  tipoEstimulo: string;
  entidades: EntidadeCognitiva[];
  urgenciaInicial: number; // 0-10
  fonte: FonteInfo;
  timestamp: string;
  hashDeduplicacao: string; // para evitar processamento duplicado
}

interface ContextoEnriquecido {
  sinal: SinalProcessado;
  contextoVigente: ContextoCognitivo;
  relacoes: RelacaoCognitiva[];
  relevancia: number; // 0-100
  historico: ProcessamentoAnterior[];
  timestamp: string;
}

interface Analise {
  padroes: PadraoDetectado[];
  anomalias: AnomaliaDetectada[];
  correlacoes: CorrelacaoDetectada[];
  forcaEvidencia: number; // 0-100
  tipoAnalise: 'FATO' | 'CORRELACAO' | 'ANOMALIA' | 'TENDENCIA' | 'INDETERMINADO';
  dadosSuporte: Evidencia[];
  timestamp: string;
}

interface Hipotese {
  id: string;
  descricao: string;
  confiancaAtual: number; // 0-100
  confiancaInicial: number;
  tipoCausalidade: 'CORRELACIONAL' | 'CAUSAL' | 'INDETERMINADO';
  evidenciasSuporte: EvidenciaRef[];
  evidenciasContrarias: EvidenciaRef[];
  objetoAfetado: string; // id do objeto cognitivo
  estado: 'EM_OBSERVACAO' | 'CONFIRMADA' | 'REFUTADA' | 'DESCARTADA' | 'ARQUIVADA' | 'EM_REVALIDACAO';
  criadaEm: string;
  ultimaRevisao: string;
  conviccao: number; // ADR-032: dias sem refutação
}

interface Decisao {
  id: string;
  tipo: 'RECOMENDACAO' | 'ALERTA' | 'PERGUNTA' | 'TAREFA' | 'PLANO' | 'SILENCIO';
  acaoRecomendada: string;
  confianca: number; // 0-100
  impactoEsperado: ImpactoEstimado;
  alternativas: AlternativaDecisao[];
  evidenciasBase: EvidenciaRef[];
  hipotesesBase: string[]; // ids das hipóteses que fundamentam
  prioridade: number; // 0-10
  modo: 'AUTOMATICO' | 'REQUER_VALIDACAO';
  timestamp: string;
}
```

---

## Seção 10 — Descobertas, Pressupostos, Lacunas, Riscos

### Descobertas

1. O raciocínio da Ponte Digital não precisa de um "motor de inferência" complexo. As regras são suficientemente simples para serem implementadas como funções determinísticas em cada estágio do pipeline.
2. A maior complexidade não está no raciocínio em si, mas na gestão de contexto — selecionar o que é relevante entre milhares de informações possíveis.
3. O ciclo de 8 estágios pode ser implementado como 8 engines independentes coordenadas pelo cognitive-orchestrator, respeitando ADR-016 (comunicação exclusiva por eventos).

### Pressupostos

1. **P1:** O empresário responde a perguntas quando solicitado. Se não responder, o Motor opera com menos evidências (confiança mais baixa). Impacto: decisões podem ser menos precisas.
2. **P2:** O N mínimo de 3 observações para formar hipótese é suficiente. Pode ser necessário ajustar por tipo de domínio.
3. **P3:** A confiança inicial 70 para ensino explícito do empresário está correta. Se o empresário ensinar errado, o Motor precisa de refutação forte para corrigir.

### Lacunas

1. **L1:** Não foi especificado o mecanismo de "hash de deduplicação" — como garantir que o mesmo estímulo não seja processado duas vezes.
2. **L2:** Os thresholds exatos de confiança (20, 40, 60, 80, 90) precisam de validação empírica. Podem variar por tipo de decisão.
3. **L3:** A fórmula de convicção (ADR-032) precisa de uma função de normalização específica — `min(dias * 0.5 / max_conviccao, 1)` — que depende de uma definição precisa de `max_conviccao`.
4. **L4:** Não foi especificado como o Motor lida com estímulos simultâneos concorrentes.

### Riscos

1. **R1 — Performance do ciclo completo:** Se cada estágio roda em sequência, o tempo total pode exceder 1.5s para estímulos complexos. Mitigação: paralelizar estágios independentes (Análise pode rodar múltiplos detectores em paralelo).
2. **R2 — Acúmulo de hipóteses:** Se o empresário não interage por semanas, hipóteses EM_OBSERVAÇÃO se acumulam. Mitigação: o limite de 7 por domínio e o arquivamento automático.
3. **R3 — Círculo vicioso de confirmação:** O Motor pode buscar seletivamente evidências que confirmam hipóteses existentes. Mitigação: o estágio de validação exige buscas ativas de evidências contrárias (Princípio da Falsificabilidade).
4. **R4 — Dependência do ciclo noturno:** Se o ciclo noturno não roda (falha técnica), conhecimento deixa de ser revalidado. Mitigação: múltiplos ciclos ao longo do dia com tolerância a falhas.

### Conflitos

Nenhum conflito encontrado com código, arquitetura consolidada, ADRs ou documentos das Fases 1 e 2.

### Impacto Futuro

1. **Implementação:** Este documento define contratos de interface para cada estágio do raciocínio. Cada estágio pode ser implementado como uma engine independente.
2. **Manutenção:** A separação em 8 estágios com contratos claros permite modificar um estágio sem afetar os demais.
3. **Evolução:** Novos modos de raciocínio (ex.: raciocínio probabilístico, raciocínio causal avançado) podem ser adicionados como stages alternativos ou detectores de padrão no estágio de Análise.
4. **Testabilidade:** Cada estágio pode ser testado isoladamente com entradas e saídas definidas.

---

## Nota Final

Este documento define a arquitetura do raciocínio cognitivo da Ponte Digital. Ele é a especificação para implementação dos estágios de processamento que transformam estímulos brutos em decisões fundamentadas. Nenhuma linha de código foi gerada. Nenhuma engine foi criada. Nenhuma API foi definida. Apenas a arquitetura do pensamento foi consolidada.
