# Arquitetura da Reconstrução Empresarial

> **Programa 12 — Fase 2** | Fluxo Operacional do Conhecimento
> Patrimônio Intelectual da Ponte Digital
> Nenhum código, classe, API, schema, migration ou engine foi criado.

---

## Índice

1. [O que é reconstrução empresarial](#1-o-que-é-reconstrução-empresarial)
2. [Pipeline de reconstrução](#2-pipeline-de-reconstrução)
3. [Motor de reconstrução — 5 subprocessos](#3-motor-de-reconstrução)
4. [Reconstrução por tipo de entrada](#4-reconstrução-por-tipo-de-entrada)
5. [Priorização de lacunas](#5-priorização-de-lacunas)
6. [Ordem dinâmica de reconstrução](#6-ordem-dinâmica-de-reconstrução)
7. [Indicadores de completude](#7-indicadores-de-completude)

---

## 1. O que é reconstrução empresarial

### 1.1 Definição

Reconstrução Empresarial é o **processo contínuo de transformar dados normalizados em um modelo cognitivo coerente da empresa**, conectando objetos, preenchendo lacunas e evoluindo o estado de compreensão.

Ela é executada na **Camada 3** da arquitetura e consome a saída do Pipeline Universal (Camada 2), gerando conhecimento para o Patrimônio Cognitivo (Camada 4).

### 1.2 Diferença do Pipeline Universal

```
Pipeline Universal (Camada 2):
  "Como transformar dado bruto em dado normalizado?"
  → Extração, limpeza, padronização
  → Mesma lógica para toda fonte

Reconstrução Empresarial (Camada 3):
  "Como transformar dado normalizado em conhecimento de empresa?"
  → Mapeamento ontológico, relacionamentos, contexto
  → Lógica que depende do estado atual da empresa
```

### 1.3 O que a reconstrução NÃO faz

```
❌ Extrair dados de fontes — isso é função do Pipeline
❌ Armazenar conhecimento — isso é função do Patrimônio
❌ Apresentar resultados — isso é função da Experiência
❌ Tomar decisões — isso é função do Motor Cognitivo
❌ Fazer perguntas ao empresário — isso é função da Arquitetura das Perguntas
```

## 2. Pipeline de reconstrução

### 2.1 Os 5 subprocessos

```
                    ┌─────────────────────────────────────────────┐
                    │          RECONSTRUÇÃO EMPRESARIAL            │
                    │                                             │
   Dados            │  ┌──────────┐  ┌──────────┐  ┌──────────┐  │
   Normalizados ────┼─▶│ 1. MAP   │─▶│ 2. LINK  │─▶│ 3. GAP   │──┼──▶ Patrimônio
   (do Pipeline)    │  │ (mapear  │  │ (relacio-│  │ (identif.│  │    Cognitivo
                    │  │  objetos)│  │  nar)    │  │  lacunas)│  │
                    │  └──────────┘  └──────────┘  └──────────┘  │
                    │        │             │             │        │
                    │        ▼             ▼             ▼        │
                    │  ┌──────────┐  ┌──────────┐  ┌──────────┐  │
                    │  │ 4. CONF  │  │ 5. EVOL  │  │          │  │
                    │  │ (calcular│  │ (atualizar│  │          │  │
                    │  │  confian-│  │  estado)  │  │          │  │
                    │  │  ça)     │  │          │  │          │  │
                    │  └──────────┘  └──────────┘  └──────────┘  │
                    └─────────────────────────────────────────────┘
```

## 3. Motor de Reconstrução — 5 subprocessos

### 3.1 Subprocesso 1 — Map (Mapeamento Ontológico)

**Função:** Transformar campos normalizados em objetos cognitivos.

```
Entrada: camposNormalizados (do Pipeline, estágio 4)

Processo:
  1. Agrupar campos por afinidade (ex: nome+telefone+email → Pessoa)
  2. Para cada grupo, identificar tipo de objeto cognitivo
  3. Se grupo corresponde a objeto existente → modo atualização
  4. Se grupo NÃO corresponde → modo criação
  5. Se grupo ambíguo (pode ser 2 tipos) → criar ambos, marcar como "suspeito"

Regras de mapeamento:
  - Mínimo 3 campos para criar objeto completo
  - Mínimo 1 campo para criar objeto rascunho
  - Campo "nome" é obrigatório para objetos Pessoa/Produto/Serviço
  - Campo "valor" é obrigatório para objetos Receita/Despesa

Saída: objetosIdentificados
```

### 3.2 Subprocesso 2 — Link (Relacionamentos)

**Função:** Estabelecer conexões entre objetos novos e existentes.

```
Entrada: objetosIdentificados + patrimonioExistente

Processo:
  1. Para cada novo objeto, verificar relacionamentos possíveis:
     - Por referência direta (ex: venda.clienteId → Cliente)
     - Por inferência (ex: mesmo CNPJ → mesma empresa)
     - Por contexto (ex: mesma data, mesmo local)
  2. Para cada relacionamento detectado:
     - Se confiança ≥ 0.70 → estabelecer automaticamente
     - Se confiança 0.40-0.69 → estabelecer como "relacionamento hipotético"
     - Se confiança < 0.40 → registrar como "relacionamento possível" (não estabelecer)
  3. Atualizar grafo de relacionamentos

Saída: relacionamentosEstabelecidos
```

### 3.3 Subprocesso 3 — Gap (Identificação de Lacunas)

**Função:** Detectar o que ainda falta para completar o modelo.

```
Entrada: objetosIdentificados + relacionamentos + patrimonioExistente

Processo:
  1. Para cada objeto, comparar atributos atuais com atributos esperados:
     - Cliente espera: nome, contato, perfil → lacuna se faltar "perfil"
     - Venda espera: cliente, produto, valor, data → lacuna se faltar "produto"
  2. Para cada relacionamento esperado não estabelecido:
     - Venda sem Cliente → lacuna: "cliente da venda não identificado"
     - Produto sem Preço → lacuna: "preço do produto desconhecido"
  3. Calcular prioridade de cada lacuna:
     - Prioridade = impacto × urgencia / esforco
  4. Atualizar índice de lacunas

Saída: lacunasIdentificadas (ordenadas por prioridade)
```

### 3.4 Subprocesso 4 — Conf (Atribuição de Confiança)

**Função:** Calcular confiança composta para cada objeto e relacionamento.

```
Entrada: objetosIdentificados + relacionamentos + patrimonioExistente

Processo:
  1. Para cada objeto novo ou atualizado:
     a. ConfiancaExtracao: média das confianças dos campos (vem do Pipeline)
     b. ConfiancaFonte: confiança base da fonte (ver Modelo de Confiança Fase 1)
     c. ConfiancaConsistencia: 1.0 se campos consistentes, 0.7 se contraditórios
     d. ConfiancaConvergencia: bônus se converge com patrimônio, penalidade se contradiz
     e. ConfiancaFinal = media(ConfExtracao, ConfFonte) × Consistencia × Convergencia
  2. Para relacionamentos:
     ConfiancaRelacionamento = min(ConfiancaOrigem, ConfiancaDestino) × 0.90
  3. Se ConfiancaFinal < 0.20 → marcar como "suspeito", não incorporar
  4. Se ConfiancaFinal 0.20-0.50 → incorporar com baixa confiança, precisa de validação
  5. Se ConfiancaFinal > 0.50 → incorporar normalmente

Saída: objetosComConfianca
```

### 3.5 Subprocesso 5 — Evol (Evolução de Estado)

**Função:** Atualizar o estado cognitivo da empresa com base nos novos objetos.

```
Entrada: objetosComConfianca + estadoAtual

Processo:
  1. Recalcular cobertura: objetos preenchidos / total esperado (58)
  2. Recalcular confiança média
  3. Avaliar se empresa atingiu condições para novo estado:
     - Ex: de "Estrutural" para "Operacional" se processos mapeados
  4. Se novo estado atingido → transitar
  5. Se confiança de domínio caiu → regredir estado
  6. Notificar Camada 5 (Experiência) se houve mudança de estado

Saída: novoEstadoCognitivo, mudancasRegistradas
```

## 4. Reconstrução por tipo de entrada

### 4.1 Reconstrução a partir de Conversa

```
Entrada: entidades extraídas da conversa (texto não-estruturado)

Desafio:
  → Informação incompleta (empresário não deu todos os detalhes)
  → Informação imprecisa (empresário não lembrou ou arredondou)
  → Informação contraditória (empresário disse algo diferente antes)

Estratégia:
  MAP:  Criar objetos com campos disponíveis, marcar lacunas
  LINK: Estabelecer conexões óbvias, marcar "conexão hipotética" para incertas
  GAP:  Muitas lacunas (50-70% dos atributos faltando)
  CONF: Confiança inicial 0.50-0.65 (fonte: conversa)
  EVOL: Empresa avança 1-2 estados (ex: Superficial → Estrutural)
```

### 4.2 Reconstrução a partir de NF XML

```
Entrada: campos fiscais completos e precisos

Vantagem:
  → Dados completos e oficiais
  → Relacionamentos explícitos (venda → cliente, venda → produto)
  → Alta confiança

Estratégia:
  MAP:  Criar objetos completos (Cliente, Produto, Venda, Receita)
  LINK: Estabelecer todos os relacionamentos com alta confiança
  GAP:  Poucas lacunas (10-20%)
  CONF: Confiança 0.85-0.95
  EVOL: Avanço significativo (ex: Estrutural → Financeira)
```

### 4.3 Reconstrução a partir de Integração ERP

```
Entrada: dados estruturados do sistema da empresa

Vantagem:
  → Volume grande de dados
  → Histórico completo
  → Consistência interna

Desafio:
  → Dado pode estar desatualizado (ERP não reflete realidade)
  → Schema do ERP pode não mapear perfeitamente

Estratégia:
  MAP:  Criar objetos em lote, mesclar com existentes
  LINK: Estabelecer relacionamentos em massa
  GAP:  Lacunas principalmente de contexto (problemas, decisões)
  CONF: Confiança 0.70-0.85 (fonte confiável mas pode estar desatualizada)
  EVOL: Avanço significativo, possível pular estados
```

### 4.4 Reconstrução Mista (múltiplas fontes simultâneas)

```
Entrada: conversa + NF + extrato + whatsapp (o cenário real)

Vantagem:
  → Máxima cobertura
  → Validação cruzada entre fontes
  → Confiança mais alta por convergência

Estratégia:
  MAP:  Objetos de múltiplas fontes, mesclagem inteligente
  LINK: Relacionamentos de múltiplas perspectivas
  GAP:  Lacunas residuais pequenas (contexto, conhecimento tácito)
  CONF: Confiança elevada por convergência (0.75-0.90)
  EVOL: Empresa atinge estados avançados rapidamente
```

## 5. Priorização de lacunas

### 5.1 Matriz de prioridade

A IA prioriza as lacunas que mais importam para compreender a empresa:

```
Prioridade = Impacto × Urgencia × Facilidade

Impacto (1-10): quanto a informação melhora o modelo
  - 10: identidade da empresa
  - 8-9: oferta, pessoas, finanças
  - 5-7: processos, clientes
  - 2-4: detalhes operacionais
  - 1: preferências estéticas

Urgência (1-10): quão crítica para o estado atual
  - 10: impede avanço de estado
  - 7-9: lacuna em domínio atual
  - 4-6: lacuna em domínio próximo
  - 1-3: lacuna em domínio distante

Facilidade (1-10): quão fácil é preencher
  - 10: automático (integração)
  - 7-9: IA pode inferir
  - 4-6: empresário responde em 1 pergunta
  - 2-3: precisa de documento
  - 1: requer decisão do empresário
```

### 5.2 Exemplo de priorização

```
Empresa no estado "Estrutural" (sabe oferta e pessoas, não sabe finanças):

Lacuna           Impacto  Urgência  Facilidade  Prioridade  Ação
─────────────────────────────────────────────────────────────────────
Faturamento      10       10        6           600         Perguntar
Margem           9        8         4           288         Precisade NF
# Clientes       7        6         5           210         Perguntar
Processo compras 5        4         5           100         Perguntar
Nome fornecedor  4        2         7           56          Esperar NF
Endereço exato   2        1         9           18          Já tem (CNPJ)
```

## 6. Ordem dinâmica de reconstrução

### 6.1 A ordem não é fixa

Diferente de um questionário linear, a reconstrução adapta a ordem baseada no que está disponível:

```
Se empresa começou com NF:
  NF → Finanças → Clientes → Produtos → (pergunta: "Falta saber processos")

Se empresa começou com conversa:
  Conversa → Pessoas → Oferta → Problemas → (sugere: "Importe NFs para vermos finanças")

Se empresa começou com integração ERP:
  ERP → Tudo estruturado → (foco: extrair conhecimento tácito e problemas)
```

### 6.2 Algoritmo de ordenação

```
Para cada ciclo de reconstrução:

1. Avaliar estado atual da empresa
2. Identificar qual domínio tem mais lacunas de alto impacto
3. Verificar qual fonte disponível pode preencher essas lacunas
4. Executar reconstrução na ordem:
   a. Fontes automáticas (integração, documentos já enviados)
   b. Inferência (o que a IA pode deduzir do que já tem)
   c. Pergunta ao empresário (só se não houver alternativa)
5. Repetir
```

## 7. Indicadores de completude

### 7.1 Métricas da reconstrução

| Indicador | Definição | Meta |
|-----------|-----------|------|
| Cobertura total | % de objetos preenchidos / 58 | ≥ 70% |
| Cobertura por domínio | % de objetos do domínio preenchidos | ≥ 60% cada |
| Confiança média | Média dos scores dos objetos | ≥ 0.70 |
| Lacunas críticas | Lacunas com prioridade > 100 | ≤ 5 |
| Taxa de avanço | Estados avançados por semana | ≥ 0.5 |
| Precisão de inferência | % de inferências confirmadas depois | ≥ 70% |
| Tempo de reconstrução | Da identificação ao estado Cognitiva | ≤ 7 dias |

### 7.2 Dashboard da reconstrução

```
EMPRESA: Barbearia do João
ESTADO:  Diagnosticada (nível 6/9)
COBERTURA: 38/58 objetos (65.5%)
CONFIANÇA MÉDIA: 0.68

DOMÍNIOS:
  Identidade:      100%  ✅  Confiança: 0.90
  Pessoas:          83%  ✅  Confiança: 0.65
  Oferta:          100%  ✅  Confiança: 0.85
  Operação:         60%  ⚠️  Confiança: 0.55 (lacuna: processos documentados)
  Finanças:         62%  ⚠️  Confiança: 0.60 (lacuna: margem por oferta)
  Clientes:         50%  🔴  Confiança: 0.50 (lacuna: perfil, churn)
  Problemas:        75%  ✅  Confiança: 0.65
  Conhecimento:     33%  🔴  Confiança: 0.45 (lacuna: apenas 1 padrão detectado)

PRÓXIMAS AÇÕES:
  1. Coletar NFs dos últimos 3 meses → preenche Finanças
  2. Perguntar perfil de clientes → preenche Clientes
  3. Aguardar mais dados para detectar padrões → preenche Conhecimento
```

---

> **Fim da Arquitetura da Reconstrução Empresarial**
> Próximo: `ARQUITETURA_DA_CONFIANCA.md` — Competição entre fontes
