# Modelo de Aprendizado — Ciclo de Nascimento do Conhecimento

> **Programa 12 — Fase 1** | Patrimônio Intelectual da Ponte Digital
> Derivado de: MODELO_COGNITIVO_UNIVERSAL.md
> Nenhum código, classe, API, schema, migration ou engine foi criado.

---

## Índice

1. [O que é aprendizado empresarial](#1-o-que-é-aprendizado-empresarial)
2. [O ciclo completo — 8 estágios](#2-o-ciclo-completo)
3. [Estágio 1 — Percepção](#3-estágio-1--percepção)
4. [Estágio 2 — Registro](#4-estágio-2--registro)
5. [Estágio 3 — Análise](#5-estágio-3--análise)
6. [Estágio 4 — Hipótese](#6-estágio-4--hipótese)
7. [Estágio 5 — Teste](#7-estágio-5--teste)
8. [Estágio 6 — Medição](#8-estágio-6--medição)
9. [Estágio 7 — Validação](#9-estágio-7--validação)
10. [Estágio 8 — Incorporação](#10-estágio-8--incorporação)
11. [Ciclos de aprendizado simultâneos](#11-ciclos-simultâneos)
12. [Barreiras ao aprendizado](#12-barreiras-ao-aprendizado)
13. [Padrões de aprendizado empresarial](#13-padrões-de-aprendizado)
14. [Matriz de aprendizado por maturidade](#14-aprendizado-por-maturidade)
15. [Aprendizado coletivo entre empresas](#15-aprendizado-coletivo)

---

## 1. O que é aprendizado empresarial

### 1.1 Definição

Aprendizado empresarial é a **capacidade da empresa de modificar seu comportamento futuro com base em experiências passadas**, gerando melhores resultados ao longo do tempo.

### 1.2 Aprendizado não é acúmulo

| Não é | É |
|-------|---|
| Acumular dados | Extrair padrões dos dados |
| Repetir o que funciona | Entender *por que* funciona |
| Evitar erros | Aprender com erros |
| Ter mais informação | Ter melhor informação |
| Copiar concorrentes | Adaptar o aprendizado ao próprio contexto |

### 1.3 Por que empresas não aprendem

A maioria das pequenas empresas não aprende sistematicamente. Os motivos:

| Motivo | Consequência | Ação da IA |
|--------|-------------|------------|
| Falta de registro | Experiência se perde | Oferecer registro automático |
| Viés do dono ("já sei") | Ignora evidência contrária | Apresentar dados objetivos |
| Urgência do dia | Não sobra tempo para refletir | Extrair aprendizados passivamente |
| Falta de métrica | Não sabe se melhorou ou piorou | Criar indicadores simples |
| Aprendizado tácito | Saber fazer sem saber explicar | Perguntar "como você sabe?" |

## 2. O ciclo completo — 8 estágios

```
                       ┌─────────────────────────────────────────────┐
                       │           CICLO DE APRENDIZADO              │
                       │                                             │
   ┌────────────┐      │     ┌──────────┐      ┌────────────┐      │
   │  EVENTO    │──────┼────▶│PERCEBER  │─────▶│ REGISTRAR  │      │
   │  bruto     │      │     └──────────┘      └─────┬──────┘      │
   └────────────┘      │                             │              │
                       │                             ▼              │
                       │     ┌──────────┐      ┌────────────┐      │
                       │     │ANALISAR  │◀─────│ HIPOTETIZAR│      │
                       │     └────┬─────┘      └─────┬──────┘      │
                       │          │                   │              │
                       │          ▼                   ▼              │
                       │     ┌──────────┐      ┌────────────┐      │
                       │     │  TESTAR  │─────▶│   MEDIR    │      │
                       │     └────┬─────┘      └─────┬──────┘      │
                       │          │                   │              │
                       │          ▼                   ▼              │
                       │     ┌──────────┐      ┌────────────┐      │
                       │     │VALIDAR   │─────▶│INCORPORAR  │──────┼──▶ CONHECIMENTO
                       │     └──────────┘      └────────────┘      │
                       └─────────────────────────────────────────────┘
```

## 3. Estágio 1 — Percepção

### 3.1 Definição

Algo acontece ou muda no universo da empresa. A IA percebe.

### 3.2 Gatilhos de percepção

| Gatilho | Exemplo | Fonte |
|---------|---------|-------|
| Evento explícito | Venda realizada, NF emitida | Integração |
| Mudança de estado | Estoque baixou, caixa negativo | Monitoramento |
| Padrão detectado | "Toda segunda tem poucos clientes" | Análise |
| Anomalia | "Venda 10x acima da média hoje" | Detecção de desvio |
| Feedback | "Cliente reclamou" | Conversa |
| Pergunta | "Por que minha receita caiu?" | Empresário |
| Ciclo | Revisão semanal automática | Rotina |

### 3.3 O que a IA faz

```
1. Identificar o sinal relevante
2. Classificar o tipo (evento/mudança/padrão/anomalia/feedback)
3. Associar ao objeto cognitivo afetado
4. Registrar timestamp e fonte
5. Decidir se é um evento único ou início de padrão
```

## 4. Estágio 2 — Registro

### 4.1 Definição

A informação percebida é estruturada e armazenada com proveniência.

### 4.2 Estrutura do registro

```
RegistroDeAprendizado {
  id: string
  tipo: "evento" | "mudanca" | "padrao" | "anomalia" | "feedback"
  descricao: string
  data: timestamp
  objetosAfetados: [ObjetoCognitivo]
  fonte: string
  confiancaInicial: float
  contexto: string        // circunstâncias do evento
  rawData: any            // dado original antes de processamento
}
```

### 4.3 O que a IA faz

```
1. Criar um objeto Evento (se aplicável)
2. Associar o evento aos objetos afetados
3. Registrar proveniência (quem, quando, como)
4. Atribuir confiança inicial baseada na fonte
5. Se for dado quantitativo, armazenar valor bruto + unidade
```

## 5. Estágio 3 — Análise

### 5.1 Definição

O evento registrado é comparado com o histórico para identificar padrões.

### 5.2 Tipos de análise

| Tipo | Pergunta | Método |
|------|----------|--------|
| Descritiva | "O que aconteceu?" | Comparar com período anterior |
| Diagnóstica | "Por que aconteceu?" | Correlacionar com outros eventos |
| Preditiva | "O que tende a acontecer?" | Projetar padrão histórico |
| Prescritiva | "O que fazer?" | Simular cenários |
| Comparativa | "É normal ou anormal?" | Comparar com média histórica |

### 5.3 N mínimo para padrão

A IA não deve inferir padrão com poucas amostras:

| Tipo de padrão | N mínimo de observações |
|----------------|------------------------|
| Comportamento diário | 7 dias |
| Comportamento semanal | 4 semanas |
| Comportamento mensal | 3 meses |
| Sazonalidade | 12 meses |
| Tendência | 6 pontos no tempo |
| Correlação | 10 pares de eventos |

### 5.4 O que a IA faz

```
1. Coletar histórico do objeto afetado (N mínimo)
2. Calcular média, desvio, mínimo, máximo
3. Comparar com o novo evento
4. Se dentro do desvio esperado: marcar como normal
5. Se fora do desvio esperado: marcar como anomalia
6. Se anomalia se repete: iniciar detecção de novo padrão
```

## 6. Estágio 4 — Hipótese

### 6.1 Definição

A IA formula uma explicação causal para o padrão observado.

### 6.2 Estrutura da hipótese

```
Hipotese {
  id: string
  descricao: string              // "Se X então Y"
  baseadaEm: [Evento | Padrao]   // Evidências que a geraram
  previsao: string                // "Fazendo X, Y deve acontecer"
  confiancaInicial: float         // Sempre ≤ 0.50 (é hipótese)
  alternativas: [Hipotese]        // Outras explicações possíveis
  testavel: boolean               // Pode ser testada?
  prazoTeste: timestamp | null    // Até quando testar
}
```

### 6.3 Qualidade da hipótese

| Critério | Boa hipótese | Má hipótese |
|----------|-------------|-------------|
| Testável | "Se contratar mais 1 barbeiro, atendo +40%" | "Se o mercado melhorar, vou vender mais" |
| Específica | "Reduzir preço em 10% aumenta volume em 20%" | "Preço muito alto" |
| Falsificável | "Se não aumentar vendas em 30 dias, hipótese errada" | "Pode ser que funcione um dia" |
| Baseada em evidência | "3 clientes reclamaram de demora → falta gente" | "Acho que precisa de mais gente" |

### 6.4 O que a IA faz

```
1. Formular até 3 hipóteses alternativas para o mesmo padrão
2. Atribuir confiança inicial para cada (nunca > 0.50)
3. Verificar se a hipótese é testável
4. Se for testável: propor teste
5. Se não for testável: marcar como "hipótese não testável"
6. Registrar as hipóteses no modelo cognitivo
```

## 7. Estágio 5 — Teste

### 7.1 Definição

A hipótese é submetida a um experimento controlado no mundo real.

### 7.2 Tipos de teste

| Tipo | Descrição | Exemplo | Duração |
|------|-----------|---------|---------|
| Experimento controlado | Muda uma variável, mantém outras | "Contratar 1 barbeiro por 30 dias" | 30 dias |
| Observação natural | Apenas observa sem interferir | "Monitorar reclamações por 30 dias" | 30 dias |
| Pergunta direta | Pergunta ao empresário | "Você já tentou X? O que aconteceu?" | 1 pergunta |
| Simulação | Modela o resultado esperado | "Se contratar, seu lucro estimado é R$ X" | Instantâneo |
| Piloto | Teste em escala reduzida | "Testar em 1 unidade antes de expandir" | 15 dias |

### 7.3 Estrutura do teste

```
Teste {
  id: string
  hipoteseId: string
  tipo: "experimento" | "observacao" | "pergunta" | "simulacao" | "piloto"
  descricao: string
  variaveisControladas: [string]
  variavelTestada: string
  criterioSucesso: string        // "Reclamações caírem 50%"
  duracao: string                 // "30 dias"
  dataInicio: timestamp
  dataFim: timestamp | null
  status: "proposto" | "ativo" | "concluido" | "abortado"
  resultado: any | null
}
```

### 7.4 O que a IA faz

```
1. Propor o teste ao empresário com linguagem simples
2. Explicar: o que muda, por quanto tempo, como medir
3. Aguardar autorização do empresário (ou executar automaticamente se configurado)
4. Monitorar o teste durante sua duração
5. Coletar dados ao final
```

## 8. Estágio 6 — Medição

### 8.1 Definição

O resultado do teste é medido e comparado com o cenário anterior.

### 8.2 O que medir

| Métrica | Antes | Depois | Variação |
|---------|-------|--------|----------|
| Receita | R$ 14.200 | R$ 16.300 | +14.8% |
| Despesa | R$ 8.500 | R$ 9.000 | +5.9% |
| Lucro | R$ 5.700 | R$ 7.300 | +28.1% |
| Clientes/dia | 15 | 21 | +40% |
| Reclamações | 3/semana | 1/semana | -67% |
| Ticket médio | R$ 47 | R$ 45 | -4.3% |

### 8.3 O que a IA faz

```
1. Coletar métricas do período do teste
2. Coletar métricas do período anterior equivalente
3. Calcular variação absoluta e percentual
4. Verificar significância (mudança real ou ruído?)
5. Se melhoria > 10%: marcar como "resultado positivo"
6. Se piora > 10%: marcar como "resultado negativo"
7. Se dentro de ±10%: marcar como "inconclusivo"
```

## 9. Estágio 7 — Validação

### 9.1 Definição

O resultado é confrontado com a hipótese. A hipótese é confirmada, refutada ou qualificada.

### 9.2 Possíveis resultados

| Resultado | Significado | Ação |
|-----------|-------------|------|
| Confirmada | Resultado = previsão | Elevar confiança, incorporar como conhecimento |
| Parcialmente confirmada | Resultado próximo mas não igual | Ajustar hipótese, testar de novo |
| Refutada | Resultado contrário à previsão | Descartar hipótese, registrar aprendizado negativo |
| Inconclusiva | Ruído > sinal | Aumentar N, testar de novo |
| Surpreendente | Resultado inesperado | Criar nova hipótese |

### 9.3 Atualização de confiança

| Resultado | Confiança da hipótese | Confiança do conhecimento |
|-----------|----------------------|--------------------------|
| Confirmada (1ª vez) | 0.40 → 0.65 | 0.65 (Conhecimento emergente) |
| Confirmada (2ª vez) | 0.65 → 0.80 | 0.80 (Conhecimento validado) |
| Confirmada (3ª vez) | 0.80 → 0.90 | 0.90 (Conhecimento maduro) |
| Refutada | 0.40 → 0.05 | Não vira conhecimento |
| Inconclusiva | 0.40 → 0.30 | Repetir com mais dados |

## 10. Estágio 8 — Incorporação

### 10.1 Definição

O conhecimento validado é incorporado ao patrimônio cognitivo da empresa.

### 10.2 Estrutura do conhecimento incorporado

```
ConhecimentoIncorporado {
  id: string
  descricao: string
  dominio: string               // qual elemento universal
  confianca: float              // 0.65-0.90
  cicloOrigem: Evento → ... → Validacao  // cadeia completa
  aplicacoes: [string]           // processos/decisões que podem usar
  contraEvidencias: [string]     // evidências que contradizem (se houver)
  dataIncorporacao: timestamp
  versao: int
  revalidacaoPrevista: timestamp // quando reavaliar
}
```

### 10.3 Impacto no modelo cognitivo

Após incorporação, o conhecimento afeta o modelo:

```
Antes:  Processo "Atendimento" sem conhecimento associado
Depois: Processo "Atendimento" → conhecimento "2 barbeiros no pico aumenta lucro"

Antes:  Decisão sobre contratação baseada em feeling
Depois: Decisão → baseada_em → Conhecimento

Antes:  Aprendizado tácito (só na cabeça do João)
Depois: Aprendizado explícito (registrado, indexado, reutilizável)
```

### 10.4 O que a IA faz

```
1. Criar objeto Conhecimento com descrição, domínio e confiança
2. Vincular aos objetos que o conhecimento afeta
3. Registrar a cadeia de proveniência completa (Evento → ... → Conhecimento)
4. Agendar revalidação (prazo baseado no decaimento)
5. Se o conhecimento contradiz outro existente:
   a. Manter ambos (contradição registrada)
   b. Rebaixar confiança de ambos
   c. Perguntar ao empresário qual está correto
```

## 11. Ciclos simultâneos

### 11.1 Múltiplos ciclos rodando

Uma empresa madura tem múltiplos ciclos de aprendizado rodando simultaneamente, em estágios diferentes:

```
Barbearia do João — Julho/2026:

Ciclo A (contratação):  Hipótese → Teste (dia 15-45)
Ciclo B (preço):        Medição (coletando dados do novo preço)
Ciclo C (combo):        Percepção → Registro (combo está vendendo bem?)
Ciclo D (horário):      Validação (teste concluído, analisando resultado)
Ciclo E (marketing):    Evento (post no Instagram gerou leads)
Ciclo F (estoque):      Padrão detectado (tesoura acaba no mesmo período)
```

### 11.2 Gerenciamento de ciclos

```
Estado dos ciclos ativos:
├── Ciclo A (contratação): EM TESTE — 15 dias restantes
├── Ciclo B (preço): MEDINDO — conclusão em 15 dias
├── Ciclo C (combo): PERCEBENDO — aguardando mais 3 vendas para padrão
├── Ciclo D (horário): VALIDANDO — 90% confiança
└── Ciclo F (estoque): HIPOTETIZANDO — precisa de 1 observação a mais
```

## 12. Barreiras ao aprendizado

### 12.1 Barreiras cognitivas

| Barreira | Como a IA ajuda |
|----------|----------------|
| Viés de confirmação | IA apresenta evidência contrária |
| Viés de sobrevivência | IA pergunta "e os clientes que foram embora?" |
| Viés de recência | IA mostra histórico completo, não só o último mês |
| Ancoragem | IA pergunta "E se o número inicial estiver errado?" |
| Excesso de confiança | IA mostra lacunas e incertezas |

### 12.2 Barreiras operacionais

| Barreira | Como a IA ajuda |
|----------|----------------|
| Falta de tempo | IA coleta dados passivamente |
| Falta de métrica | IA sugere indicadores simples |
| Dado bagunçado | IA ajuda a organizar |
| Ninguém pensa nisso | IA pergunta "Já pensou em medir X?" |
| Cultura reativa | IA sugere revisões semanais automáticas |

## 13. Padrões de aprendizado empresarial

### 13.1 Aprendizado por tentativa e erro

```
Faz → Erra → Percebe → Ajusta → Tenta de novo
É o padrão mais comum em pequenas empresas.
A IA ajuda registrando o erro e o ajuste para evitar repetição.
```

### 13.2 Aprendizado por imitação

```
Concorrente faz → Observa → Copia → Adapta → Melhora
Rápido mas raso. A IA pergunta "isso faz sentido para sua realidade?"
```

### 13.3 Aprendizado por análise

```
Coleta dados → Mede → Compara → Conclui → Muda
Raro em pequenas empresas. A IA pode automatizar a coleta e análise.
```

### 13.4 Aprendizado por feedback

```
Cliente opina → Registra → Identifica padrão → Muda → Cliente percebe
Fonte rica mas subutilizada. A IA pergunta ao cliente e extrai padrões.
```

### 13.5 Aprendizado por crise

```
Crise → Caos → Sobrevivência → Reflexão → Mudança profunda
Mais intenso. Empresa muda só quando a dor é grande. A IA pode detectar sinais antes da crise.
```

## 14. Aprendizado por maturidade

| Maturidade | Como aprende | Papel da IA |
|------------|-------------|-------------|
| Sobrevivência | Tentativa e erro (reage) | Registrar erros, evitar repetição |
| Estabilidade | Imitação (copia) | Sugerir adaptação ao contexto |
| Eficiência | Análise (mede) | Automatizar coleta e análise |
| Expansão | Feedback (escuta) | Estruturar feedback, extrair padrões |
| Maturidade | Sistêmico (aprende a aprender) | Ciclos autônomos com supervisão |

## 15. Aprendizado coletivo

### 15.1 Aprendizado entre empresas

A Ponte Digital pode conectar aprendizados de diferentes empresas do mesmo segmento (sem identificar as empresas).

### 15.2 O que pode ser compartilhado

| Padrão | Anonimizado | Benefício |
|--------|-------------|-----------|
| "Restaurantes que fazem X têm margem Y" | Sim | Benchmark |
| "Problema mais comum em barbearias" | Sim | Diagnóstico |
| "Melhor horário para agendar" | Não (contextual) | Sugestão |
| "Ticket médio do segmento" | Sim | Referência |
| "O que empresas de sucesso fazem diferente" | Sim | Inspiração |

### 15.3 Limites do aprendizado coletivo

```
O que NÃO pode ser compartilhado:
├── Dados financeiros específicos de uma empresa
├── Problemas específicos com identificação
├── Decisões estratégicas (contexto único)
├── Clientes (identificáveis)
└── Conhecimento proprietário (diferencial competitivo)
```

---

> **Fim do Modelo de Aprendizado**
> Próximo: `MODELO_DE_RECONSTRUCAO.md` — Processo detalhado de reconstrução da empresa
