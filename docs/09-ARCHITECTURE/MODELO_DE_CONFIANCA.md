# Modelo de Confiança — Certeza, Incerteza e Decisão

> **Programa 12 — Fase 1** | Patrimônio Intelectual da Ponte Digital
> Derivado de: MODELO_COGNITIVO_UNIVERSAL.md
> Nenhum código, classe, API, schema, migration ou engine foi criado.

---

## Índice

1. [Filosofia da confiança](#1-filosofia-da-confiança)
2. [Os 6 níveis de confiança](#2-os-6-níveis-de-confiança)
3. [Score de confiança — cálculo](#3-score-de-confiança)
4. [Matriz de confiança por fonte](#4-matriz-de-confiança-por-fonte)
5. [Os 5 estados de certeza](#5-os-5-estados-de-certeza)
6. [Incerteza — tipos e tratamento](#6-incerteza)
7. [Propagação de confiança](#7-propagação-de-confiança)
8. [Decaimento temporal](#8-decaimento-temporal)
9. [Convergência de fontes](#9-convergência-de-fontes)
10. [Contradição entre fontes](#10-contradição-entre-fontes)
11. [Regras de decisão da IA](#11-regras-de-decisão-da-ia)
12. [Silêncio cognitivo](#12-silêncio-cognitivo)
13. [Calibração empírica](#13-calibração-empírica)

---

## 1. Filosofia da confiança

### 1.1 A confiança não é opcional

Toda informação no modelo cognitivo **deve** ter um score de confiança. Informação sem confiança é tão arriscada quanto informação errada.

### 1.2 Princípios

1. **Toda fonte é suspeita até prova em contrário** — não confiar por padrão
2. **Convergência aumenta confiança** — duas fontes independentes que concordam valem mais que uma
3. **Tempo corrói confiança** — informação não revisitada perde validade
4. **Contradição não é erro** — é dado sobre a incerteza do domínio
5. **Confiança é contextual** — a mesma fonte pode ter confiança diferente para diferentes tipos de informação
6. **Confiança é revisável** — nova evidência pode aumentar ou diminuir o score
7. **Silêncio é preferível a informação não confiável** — a IA deve ficar calada se não tem segurança

### 1.3 O que confiança NÃO é

| Não é | É |
|-------|--|
| Probabilidade estatística | Score heurístico baseado em fontes, consistência e tempo |
| Valor absoluto | Valor contextual (depende do uso) |
| Atributo do objeto | Atributo da relação entre IA e informação |
| Escolha binária (confia/não confia) | Espectro contínuo com 6 níveis discretos |

## 2. Os 6 níveis de confiança

```
NÍVEL           SCORE       RÓTULO          COR         SIGNIFICADO
─────────────────────────────────────────────────────────────────────
Confirmado      0.95-1.00   Confirmado       🟢         Empresário validou
Alta            0.80-0.94   Alta             🟢         Múltiplas fontes convergentes
Média           0.55-0.79   Média            🟡         Fonte única confiável
Baixa           0.30-0.54   Baixa            🟠         Inferência com evidência indireta
Suspeita        0.05-0.29   Suspeita         🔴         Fonte não confiável ou contraditória
Nula            0.00-0.04   Nula             ⚫         Nenhuma informação
```

### 2.1 Ação esperada em cada nível

| Nível | Ação da IA | Exemplo |
|-------|-----------|---------|
| Confirmado | Afirmar como fato: "A empresa fatura R$ 14.200/mês" | "Sim, a receita de julho foi R$ 14.200" |
| Alta | Afirmar com segurança: "Pelo que vimos, sim" | "Pelo seu extrato, a receita média é R$ 14.000" |
| Média | Apresentar com ressalva: "Acredito que..." | "Acredito que sua receita seja por volta de R$ 14.000" |
| Baixa | Apresentar como hipótese: "Talvez..." | "Talvez sua receita esteja na faixa de R$ 12-16 mil" |
| Suspeita | Não usar — perguntar: "Você sabe me dizer?" | "Qual foi sua receita no último mês?" |
| Nula | Perguntar ou buscar outra fonte | "Ainda não sei quanto você fatura — pode me ajudar?" |

## 3. Score de confiança

### 3.1 Fórmula conceitual

```
Confianca = FonteBase × Consistencia × Temporalidade × Convergencia
```

Onde:
- **FonteBase** (0.0-1.0): confiança inerente à fonte (ver seção 4)
- **Consistencia** (0.5-1.0): penalidade se a fonte já se contradisse antes
- **Temporalidade** (0.0-1.0): decaimento com o tempo (ver seção 8)
- **Convergencia** (0.5-1.5): bônus se múltiplas fontes concordam; penalidade se contradizem

### 3.2 Exemplo de cálculo

```
Informação: "Receita mensal da Barbearia do João"
Fonte: Conversa com João em 15/07/2026
  FonteBase = 0.55 (conversa é confiança média-baixa)
  Consistencia = 0.90 (João nunca se contradisse)
  Temporalidade = 1.00 (informação de hoje)
  Convergencia = 1.00 (apenas uma fonte)

Confianca = 0.55 × 0.90 × 1.00 × 1.00 = 0.495 → Nível Baixa

Após validação com extrato bancário (integração):
  FonteBase = 0.80 (integração direta)
  Consistencia = 0.95
  Temporalidade = 1.00
  Convergencia = 1.20 (duas fontes concordam: conversa + extrato)

Confianca = 0.80 × 0.95 × 1.00 × 1.20 = 0.912 → Nível Alta
```

## 4. Matriz de confiança por fonte

### 4.1 FonteBase — valores de referência

| Fonte | FonteBase | Justificativa |
|-------|-----------|---------------|
| Empresário disse explicitamente | 0.85 | Fonte primária, mas sujeita a viés |
| Empresário confirmou após pergunta | 0.90 | Validação ativa aumenta confiança |
| Funcionário disse | 0.50 | Informação de terceiro |
| Documento oficial (NF XML, contrato) | 0.85 | Dado fiscal tem valor legal |
| Extrato bancário (via integração) | 0.85 | Dado financeiro direto |
| Documento não oficial (planilha manual) | 0.50 | Sujeito a erro humano |
| OCR de PDF/foto | 0.40 | Sujeito a erro de extração |
| Integração ERP (API oficial) | 0.80 | Dado estruturado, mas pode ter divergência |
| Integração CRM (API oficial) | 0.75 | Dado comercial, sujeito a não atualização |
| Dado público (CNPJ, redes sociais) | 0.45 | Pode estar desatualizado |
| Inferência de IA (padrão estatístico) | 0.30 | Indireto, sujeito a viés |
| Analogia com empresas similares | 0.15 | Muito indireto |
| Conversa com cliente | 0.35 | Percepção parcial |
| Observação de comportamento | 0.40 | Indireto mas objetivo |
| Múltiplas fontes convergentes (3+) | 0.95 | Máximo atingível sem validação humana |

### 4.2 Fatores de ajuste por contexto

| Contexto | Ajuste | Exemplo |
|----------|--------|---------|
| Fonte falhou antes (contradição histórica) | -0.15 | "João disse algo diferente mês passado" |
| Fonte é consistente (nunca errou) | +0.10 | "João sempre acerta os valores" |
| Informação é recente (< 7 dias) | +0.00 | Sem ajuste |
| Informação é antiga (> 30 dias) | -0.10 | "Dado do mês passado" |
| Informação é muito antiga (> 90 dias) | -0.25 | "Dado de 3 meses atrás" |
| Informação confirmada por segunda fonte | +0.15 | "Extrato confirmou o que João disse" |
| Informação contradita por outra fonte | -0.30 | "Extrato mostra valor diferente" |

## 5. Os 5 estados de certeza

### 5.1 Definição

Enquanto o score de confiança é um valor numérico contínuo, o **estado de certeza** é uma classificação qualitativa que orienta a ação da IA.

```
CERTEZA (a IA pode afirmar como verdade)
├── Confiança ≥ 0.80
├── Múltiplas fontes concordam OU fonte primária confirmou
└── Informação atualizada (< 30 dias)

HIPÓTESE (a IA pode sugerir, mas deve sinalizar)
├── Confiança 0.30 a 0.79
├── Fonte única ou inferência
└── IA diz: "Acredito que...", "Parece que...", "Talvez..."

SUSPEITA (a IA desconfia, mas não tem certeza)
├── Confiança 0.05 a 0.29
├── Fonte não confiável, indício fraco
└── IA não usa — pergunta

DESCONHECIDO (a IA não sabe)
├── Confiança 0.00 a 0.04
├── Nenhuma fonte disponível
└── IA pergunta ou permanece em silêncio

CONTRADIÇÃO (fontes discordam)
├── Duas ou mais fontes com confiança ≥ 0.50 dizem coisas diferentes
├── IA não escolhe — apresenta ambas
└── IA pergunta: "Fonte A diz X, fonte B diz Y — qual está correta?"
```

### 5.2 Mapa de transição entre estados

```
                    ┌──────────────┐
                    | DESCONHECIDO |
                    └──────┬───────┘
                           | Nova fonte
                           ▼
                    ┌──────────────┐
              ┌─────|   SUSPEITA   |←────────┐
              |     └──────┬───────┘          |
              |            | Nova evidência   |
              |            ▼                  |
              |     ┌──────────────┐          |
              ├────▶|   HIPÓTESE   |──────────┤
              |     └──────┬───────┘          |
              |            | Validação        | Contradição
              |            ▼                  |
              |     ┌──────────────┐          |
              ├────▶|   CERTEZA    |──────────┤
              |     └──────────────┐          |
              |                   |           |
              |                   ▼           ▼
              |          ┌─────────────────┐
              └─────────▶|  CONTRADIÇÃO    |
                         └─────────────────┘
```

## 6. Incerteza — tipos e tratamento

### 6.1 Os 5 tipos de incerteza

| Tipo | Definição | Exemplo | Tratamento |
|------|-----------|---------|------------|
| **Epistêmica** | Falta de conhecimento | "Não sei o faturamento" | Buscar fonte |
| **Aleatória** | Variação inerente | "Vendas variam todo mês" | Modelar distribuição |
| **Ambígua** | Múltiplas interpretações possíveis | "Lucro pode ser contábil ou operacional" | Perguntar qual definição |
| **Paradoxal** | Contradição lógica | "Empresa cresce mas não lucra" | Explorar causas |
| **Futura** | Imprevisibilidade do amanhã | "Receita do próximo mês" | Cenários probabilísticos |

### 6.2 Estratégia por tipo

| Tipo de incerteza | Estratégia da IA |
|-------------------|-----------------|
| Epistêmica | Registrar como lacuna, buscar preenchimento |
| Aleatória | Coletar mais amostras para estabelecer distribuição |
| Ambígua | Perguntar ao empresário qual definição usar |
| Paradoxal | Marcar como contradição, investigar causa |
| Futura | Construir cenários com ranges, não com valores pontuais |

## 7. Propagação de confiança

### 7.1 Propagação em cadeia

Quando uma informação B depende de A:

```
Confianca(B) = Confianca(A) × PenalidadeInferencia

Penalidades:
  Inferência direta (A → B):       0.90
  Inferência em 2 saltos (A→B→C):  0.80
  Inferência em 3+ saltos:         0.70
  Inferência analógica:            0.50
  Inferência estatística:          0.60
```

### 7.2 Propagação em composição

Quando uma informação depende de múltiplas fontes A e B:

```
Confianca(A ∧ B) = min(Confianca(A), Confianca(B)) × 0.95
Confianca(A ∨ B) = max(Confianca(A), Confianca(B)) × 0.85

Exemplo:
  "Margem" depende de "Receita" (0.85) e "Custo" (0.70)
  Confianca(Margem) = min(0.85, 0.70) × 0.95 = 0.665
```

## 8. Decaimento temporal

### 8.1 Curva de decaimento

A confiança decai com o tempo. Informação não revisitada perde validade.

```
Confiança(t) = ConfiancaInicial × e^(-λ × t)

Onde:
  t = tempo desde a última atualização (em dias)
  λ = taxa de decaimento (varia por tipo de informação)
```

### 8.2 Taxas de decaimento por tipo

| Tipo de informação | λ (por dia) | Meia-vida | Exemplo |
|--------------------|-------------|-----------|---------|
| Identidade (segmento) | 0.0005 | ~4 anos | Quase nunca muda |
| Sócios | 0.001 | ~2 anos | Muda raramente |
| Produtos/Serviços | 0.003 | ~8 meses | Muda algumas vezes/ano |
| Processos | 0.005 | ~5 meses | Muda com frequência |
| Preços | 0.01 | ~2.5 meses | Muda periodicamente |
| Finanças (mensal) | 0.03 | ~23 dias | Muda todo mês |
| Agenda | 0.10 | ~7 dias | Muda toda semana |
| Caixa (diário) | 0.30 | ~2 dias | Muda todo dia |

### 8.3 Revalidação automática

A IA deve revalidar informações com base no decaimento:

| Se confiança caiu para | Ação |
|------------------------|------|
| ≥ 0.70 | Manter — ainda confiável |
| 0.50 a 0.69 | Buscar confirmação passiva (observar sem perguntar) |
| 0.30 a 0.49 | Perguntar: "Isso ainda está correto?" |
| < 0.30 | Marcar como desatualizado, buscar nova fonte |

## 9. Convergência de fontes

### 9.1 Princípio da convergência

Duas fontes independentes que concordam são mais confiáveis que uma. Três fontes convergentes são o padrão ouro.

### 9.2 Bônus de convergência

| Fontes convergentes | Bônus | Exemplo |
|---------------------|-------|---------|
| 2 fontes independentes | ×1.15 | Conversa + extrato |
| 3 fontes independentes | ×1.30 | Conversa + extrato + NF |
| 4+ fontes independentes | ×1.40 | Máximo atingível |

### 9.3 Condições para convergência

Para duas fontes serem consideradas "convergentes":

1. **Independência**: uma não influenciou a outra
2. **Mesmo referente**: ambas falam exatamente da mesma coisa
3. **Diferença tolerável**: valores dentro de 10% (para dados quantitativos)
4. **Mesmo período**: ambas se referem ao mesmo intervalo de tempo

## 10. Contradição entre fontes

### 10.1 Quando ocorre

Duas fontes com confiança ≥ 0.50 dizem coisas incompatíveis sobre o mesmo objeto.

### 10.2 Como a IA deve tratar

```
1. DETECTAR contradição
2. REGISTRAR ambas as fontes com seus respectivos scores
3. NÃO ESCOLHER — IA não decide qual está certa
4. PERGUNTAR ao empresário: "Fonte A diz X, fonte B diz Y — qual está correta?"
5. ARMAZENAR a resposta como nova fonte (confiança 0.90 se o empresário respondeu)
6. AJUSTAR scores: a fonte rejeitada pelo empresário cai para 0.30
```

### 10.3 Contradição sem resolução

Se o empresário não responder, manter ambas com seus scores, marcar o objeto como "Contradição" e reduzir a confiança geral para o mínimo das duas.

## 11. Regras de decisão da IA

### 11.1 Matriz de ação

| Cenário | Confiança | Ação |
|---------|-----------|------|
| Sabe e tem certeza | ≥ 0.80 | Afirmar, usar em decisões, sugerir ações |
| Sabe mas não tem certeza | 0.30-0.79 | Sugerir com ressalva, não usar em decisões críticas |
| Não sabe | 0.00-0.29 | Perguntar, buscar fonte, ou ficar em silêncio |
| Fontes contradizem | N/A | Apresentar contradição, perguntar |

### 11.2 Regras específicas

| Regra | Descrição |
|-------|-----------|
| **Silêncio é seguro** | Se confiança < 0.30, não mencionar a informação |
| **Hipótese sinalizada** | Se apresentar hipótese (0.30-0.79), sempre sinalizar: "Acredito que..." |
| **Certeza condicional** | Mesmo com confiança alta, nunca afirmar 100% — sempre deixar margem |
| **Direito à dúvida** | Se o empresário contradiz a IA, a IA questiona a si mesma primeiro |
| **Proveniência sempre** | Toda afirmação pode ser rastreada até a fonte original |
| **Revisão explícita** | Quando a confiança muda de nível (ex: Média → Alta) por nova evidência, registrar |

## 12. Silêncio cognitivo

### 12.1 O que é

**Silêncio cognitivo** é a decisão ativa da IA de **não falar** sobre algo que não sabe com confiança suficiente. É uma virtude, não uma falha.

### 12.2 Quando aplicar silêncio

| Situação | Ação |
|----------|------|
| IA não tem a informação | Silêncio → buscar ou perguntar |
| IA tem informação com confiança < 0.30 | Silêncio — informação não confiável |
| IA tem hipótese sem evidência | Silêncio até ter mais dados |
| Pergunta do empresário sobre o que IA não sabe | "Ainda não sei responder isso, mas estou aprendendo" |
| IA detectou padrão mas não validou | Silêncio até validação |

### 12.3 Exceções ao silêncio

A IA pode falar sobre algo que não sabe com confiança em 2 casos:

1. **Educativo**: "Você sabia que pode me enviar seu extrato bancário para eu analisar seu fluxo de caixa?"
2. **Investigativo**: "Para te ajudar melhor, preciso saber: qual sua receita mensal?"

## 13. Calibração empírica

### 13.1 A confiança precisa ser testada

Os valores de FonteBase (seção 4) e λ (seção 8) são **chutes iniciais**. Devem ser calibrados empiricamente.

### 13.2 Método de calibração

```
1. Para cada fonte, coletar N amostras de:
   - Score atribuído pela IA no momento da coleta
   - Score real após validação pelo empresário
2. Calcular o erro: |ScoreIA - ScoreReal|
3. Se erro médio > 0.15, ajustar FonteBase daquela fonte
4. Repetir a cada 1000 validações
```

### 13.3 Matriz de calibração esperada

| Fonte | FonteBase inicial | FonteBase esperada após calibração |
|-------|-------------------|-------------------------------------|
| Conversa direta | 0.85 | 0.80-0.90 (depende do empresário) |
| NF XML | 0.85 | 0.90-0.95 (muito confiável) |
| OCR PDF | 0.40 | 0.35-0.60 (varia com qualidade) |
| Planilha manual | 0.50 | 0.30-0.70 (varia com organização) |
| Inferência IA | 0.30 | 0.20-0.50 (varia com domínio) |

---

> **Fim do Modelo de Confiança**
> Próximo: `MODELO_DE_APRENDIZADO.md` — Ciclo de nascimento do conhecimento
