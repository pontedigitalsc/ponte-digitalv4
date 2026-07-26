# Modelo de Estados — Estados Cognitivos da Empresa

> **Programa 12 — Fase 1** | Patrimônio Intelectual da Ponte Digital
> Derivado de: MODELO_COGNITIVO_UNIVERSAL.md, MODELO_DE_RECONSTRUCAO.md
> Nenhum código, classe, API, schema, migration ou engine foi criado.

---

## Índice

1. [O que é um estado cognitivo](#1-o-que-é-um-estado-cognitivo)
2. [Os 9 estados cognitivos](#2-os-9-estados-cognitivos)
3. [Transições entre estados](#3-transições-entre-estados)
4. [Regressão de estado](#4-regressão-de-estado)
5. [Estado composto por domínio](#5-estado-composto-por-domínio)
6. [Matriz de ações por estado](#6-matriz-de-ações-por-estado)
7. [Indicadores de transição](#7-indicadores-de-transição)
8. [Tempo estimado por estado](#8-tempo-estimado-por-estado)
9. [Estados de objeto vs estados de empresa](#9-estados-de-objeto-vs-estados-de-empresa)
10. [Autoavaliação da IA](#10-autoavaliação-da-ia)

---

## 1. O que é um estado cognitivo

### 1.1 Definição

O **estado cognitivo** é uma classificação do nível de compreensão que a Ponte Digital possui sobre uma empresa em um determinado momento.

Não é um estado da empresa real — é um estado do **conhecimento da IA sobre a empresa**.

### 1.2 Propriedades do estado

| Propriedade | Descrição |
|-------------|-----------|
| **Nome** | Rótulo do estado (ex: "Operacional") |
| **Nível** | Número de 0 a 8 (ordem de profundidade) |
| **Fase associada** | Fase da reconstrução que habilita este estado |
| **Confiança mínima** | Confiança média mínima para entrar neste estado |
| **Permanência** | Tempo mínimo esperado neste estado |
| **Ações permitidas** | O que a IA pode fazer neste estado |
| **Ações proibidas** | O que a IA ainda não deve fazer |

## 2. Os 9 estados cognitivos

### 2.1 Visão geral

```
NÍVEL   ESTADO               CONFIÂNCIA MÍNIMA   FASE
─────────────────────────────────────────────────────
0       Desconhecida         0.00                —
1       Superficial          0.30                Fase 0
2       Estrutural           0.40                Fase 1
3       Operacional          0.50                Fase 2
4       Financeira           0.55                Fase 3
5       Comercial            0.55                Fase 4
6       Diagnosticada        0.50                Fase 5
7       Cognitiva            0.60                Fase 6
8       Validada             0.75                Fase 7
```

### 2.2 Estado 0 — Desconhecida

| Aspecto | Descrição |
|---------|-----------|
| **Definição** | Nada se sabe além de um identificador mínimo (CNPJ, nome, contato) |
| **Condição de entrada** | Primeiro contato com a empresa |
| **O que a IA sabe** | Apenas que a empresa existe |
| **O que a IA NÃO sabe** | Tudo — segmento, pessoas, oferta, finanças |
| **Ações da IA** | Perguntar nome e segmento básico; consultar CNPJ |
| **Ações proibidas** | Sugerir qualquer ação, afirmar qualquer informação, comparar com outras |
| **Confiança típica** | 0.00-0.10 |
| **Tempo típico** | Minutos (sai rápido para Superficial) |
| **Objetos preenchidos** | 1-2 (apenas Empresa com atributos mínimos) |

### 2.3 Estado 1 — Superficial

| Aspecto | Descrição |
|---------|-----------|
| **Definição** | Sabe-se o segmento, porte e localização da empresa |
| **Condição de entrada** | Fase 0 concluída |
| **O que a IA sabe** | Segmento, porte aproximado, localização, talvez data de fundação |
| **O que a IA NÃO sabe** | Oferta específica, pessoas, finanças, problemas |
| **Ações da IA** | Perguntar sobre oferta e pessoas; buscar site/redes sociais |
| **Ações proibidas** | Sugerir ações financeiras ou estratégicas |
| **Confiança típica** | 0.30-0.50 |
| **Tempo típico** | 1-5 minutos ativos (pode ficar dias parado se empresário não responder) |
| **Objetos preenchidos** | 3-5 (Empresa, Local, talvez Pessoas) |

### 2.4 Estado 2 — Estrutural

| Aspecto | Descrição |
|---------|-----------|
| **Definição** | Sabe-se a estrutura básica: pessoas, oferta, recursos principais |
| **Condição de entrada** | Fase 1 concluída |
| **O que a IA sabe** | Quem trabalha, o que vende, preços, recursos básicos |
| **O que a IA NÃO sabe** | Processos, finanças, clientes, problemas |
| **Ações da IA** | Perguntar como funciona o dia a dia; perguntar sobre clientes |
| **Ações proibidas** | Sugerir mudanças operacionais (não conhece a operação) |
| **Confiança típica** | 0.40-0.60 |
| **Tempo típico** | 5-15 minutos ativos |
| **Objetos preenchidos** | 8-15 (Empresa, Pessoas, Produtos/Serviços, Recursos) |

### 2.5 Estado 3 — Operacional

| Aspecto | Descrição |
|---------|-----------|
| **Definição** | Sabe-se como a empresa funciona: processos, agenda, gargalos |
| **Condição de entrada** | Fase 2 concluída |
| **O que a IA sabe** | Processos principais, gargalos, agenda, fornecedores, fluxo operacional |
| **O que a IA NÃO sabe** | Finanças precisas, perfil de clientes, padrões |
| **Ações da IA** | Perguntar sobre finanças; sugerir melhorias operacionais simples |
| **Ações proibidas** | Sugerir investimentos (não conhece margem) |
| **Confiança típica** | 0.50-0.70 |
| **Tempo típico** | 15-45 minutos ativos |
| **Objetos preenchidos** | 15-25 (adiciona Processos, Tarefas, Agenda) |

### 2.6 Estado 4 — Financeira

| Aspecto | Descrição |
|---------|-----------|
| **Definição** | Sabe-se o fluxo financeiro: receitas, despesas, margens, resultado |
| **Condição de entrada** | Fase 3 concluída |
| **O que a IA sabe** | Receita, despesa, margem por oferta, resultado, dívidas |
| **O que a IA NÃO sabe** | Perfil detalhado de clientes, padrões, conhecimento tácito |
| **Ações da IA** | Sugerir cortes de despesa, identificar oportunidades de aumento de margem |
| **Ações proibidas** | Sugerir estratégia de clientes (não conhece perfil) |
| **Confiança típica** | 0.55-0.80 |
| **Tempo típico** | 30-90 minutos ativos |
| **Objetos preenchidos** | 20-30 (adiciona Receita, Despesa, Margem, Caixa) |

### 2.7 Estado 5 — Comercial

| Aspecto | Descrição |
|---------|-----------|
| **Definição** | Sabe-se quem compra, como compra, por que compra |
| **Condição de entrada** | Fase 4 concluída |
| **O que a IA sabe** | Perfil de clientes, frequência, ticket, canais, satisfação |
| **O que a IA NÃO sabe** | Problemas profundos, conhecimento validado |
| **Ações da IA** | Sugerir ações de retenção, campanhas, canais |
| **Ações proibidas** | Afirmar padrões com alta confiança (pouco histórico) |
| **Confiança típica** | 0.55-0.75 |
| **Tempo típico** | 20-60 minutos ativos |
| **Objetos preenchidos** | 25-35 (adiciona Cliente, Venda, Lead, Pipeline, Canal) |

### 2.8 Estado 6 — Diagnosticada

| Aspecto | Descrição |
|---------|-----------|
| **Definição** | Sabe-se o que impede a empresa de crescer |
| **Condição de entrada** | Fase 5 concluída |
| **O que a IA sabe** | Problemas, causas raiz, decisões necessárias, riscos |
| **O que a IA NÃO sabe** | Padrões validados, conhecimento consolidado |
| **Ações da IA** | Sugerir planos de ação, priorizar problemas, alertar riscos |
| **Ações proibidas** | Afirmar conhecimento como verdade absoluta |
| **Confiança típica** | 0.50-0.70 |
| **Tempo típico** | 15-30 minutos ativos |
| **Objetos preenchidos** | 30-40 (adiciona Problema, Decisao, Risco, Oportunidade) |

### 2.9 Estado 7 — Cognitiva

| Aspecto | Descrição |
|---------|-----------|
| **Definição** | Sabe-se os padrões, regras e aprendizados da empresa |
| **Condição de entrada** | Fase 6 concluída |
| **O que a IA sabe** | Padrões, conhecimentos validados, ciclo de aprendizado |
| **O que a IA NÃO sabe** | Se o modelo está correto (falta validação do empresário) |
| **Ações da IA** | Sugerir com base em conhecimento, propor novas hipóteses |
| **Ações proibidas** | Nada — a IA já tem base para agir |
| **Confiança típica** | 0.60-0.85 |
| **Tempo típico** | Contínuo (não é estado terminal) |
| **Objetos preenchidos** | 35-50 (adiciona Conhecimento, Padrao, Hipotese, Aprendizado) |

### 2.10 Estado 8 — Validada

| Aspecto | Descrição |
|---------|-----------|
| **Definição** | O empresário validou o modelo cognitivo completo |
| **Condição de entrada** | Fase 7 concluída (empresário confirma ou corrige) |
| **O que a IA sabe** | Tudo acima, com validação humana direta |
| **O que a IA NÃO sabe** | O futuro, o que vai mudar (ninguém sabe) |
| **Ações da IA** | Todas — a IA age com base no modelo validado |
| **Ações proibidas** | Nenhuma — desde que respeite confiança das informações |
| **Confiança típica** | 0.75-0.95 |
| **Tempo típico** | Renovável (validação periódica) |
| **Objetos preenchidos** | 42-58 (modelo completo) |

## 3. Transições entre estados

### 3.1 Mapa de transições

```
                   ┌──────────────┐
                   │ Desconhecida │
                   └──────┬───────┘
                          │ Identificar segmento
                          ▼
                   ┌──────────────┐
          ┌───────▶│ Superficial  │◀────── (regressão por perda de dados)
          │        └──────┬───────┘
          │               │ Descobrir pessoas, oferta, recursos
          │               ▼
          │        ┌──────────────┐
          │        │ Estrutural   │◀────── (regressão)
          │        └──────┬───────┘
          │               │ Mapear processos, agenda, fluxo
          │               ▼
          │        ┌──────────────┐
          │        │ Operacional  │◀────── (regressão)
          │        └──┬────┬──────┘
          │           │    │
          │           │    └──────────► (se empresa não tem finanças separadas)
          │           │
          │     ┌─────▼────────┐
          │     │  Financeira  │
          │     └──────┬───────┘
          │            │ Descobrir clientes
          │            ▼
          │     ┌──────────────┐
          │     │  Comercial   │
          │     └──────┬───────┘
          │            │ Descobrir problemas
          │            ▼
          │     ┌──────────────┐
          │     │Diagnosticada │
          │     └──────┬───────┘
          │            │ Extrair conhecimento
          │            ▼
          │     ┌──────────────┐
          │     │  Cognitiva   │
          │     └──────┬───────┘
          │            │ Validar com empresário
          │            ▼
          │     ┌──────────────┐
          │     │  Validada    │──────────────► (ciclo de revalidação)
          │     └──────────────┘
          │
          └───── (reconstrução após crise/mudança radical)
```

### 3.2 Regras de transição

| Transição | Gatilho | Mínimo de objetos | Confiança mínima |
|-----------|---------|-------------------|------------------|
| Desconhecida → Superficial | Segmento identificado | 2 (Empresa + Local) | 0.30 |
| Superficial → Estrutural | Oferta + Pessoas mapeadas | 8 | 0.40 |
| Estrutural → Operacional | Processos mapeados | 15 | 0.50 |
| Estrutural → Financeira | Finanças disponíveis (atalho) | 12 | 0.55 |
| Operacional → Financeira | Finanças mapeadas | 20 | 0.55 |
| Financeira → Comercial | Clientes mapeados | 25 | 0.55 |
| Comercial → Diagnosticada | Problemas identificados | 30 | 0.50 |
| Diagnosticada → Cognitiva | Conhecimento extraído | 35 | 0.60 |
| Cognitiva → Validada | Empresário validou | 42 | 0.75 |

## 4. Regressão de estado

### 4.1 Quando a empresa regride

| Causa | Efeito | Exemplo |
|-------|--------|---------|
| Decaimento temporal | Informação desatualizada > 90 dias | Empresa mudou de endereço, IA não sabia |
| Contradição | Nova fonte contradiz informação anterior | Extrato mostra receita 2x maior que a declarada |
| Mudança real | Empresa mudou significativamente | Abriu nova unidade, mudou de segmento |
| Fonte invalidada | Fonte se mostrou não confiável | Planilha estava errada |
| Crise | Empresa passou por crise e mudou | Pandemia forçou mudança de modelo |

### 4.2 Como a regressão funciona

```
Regra: quando uma informação crítica perde confiança,
o estado regride ao nível mais alto onde todas as
informações ainda têm confiança ≥ 0.50.

Exemplo:
  Empresa estava em "Financeira" (nível 4)
  Dados financeiros são contraditos (confiança cai para 0.30)
  Dados operacionais ainda são válidos (confiança 0.70)
  → Empresa regride para "Operacional" (nível 3)
  → Lacuna criada: "Revalidar finanças"
```

### 4.3 Regressão vs. estagnação

| Situação | Ação |
|----------|------|
| Regressão por decaimento | Revalidar informações desatualizadas |
| Regressão por contradição | Investigar, perguntar ao empresário |
| Regressão por mudança real | Recomeçar parcialmente a fase afetada |
| Estagnação (empresa não avança de estado) | Identificar o que falta, perguntar |
| Estagnação por falta de resposta | Modo passivo — coletar de outras fontes |

## 5. Estado composto por domínio

### 5.1 Estados por domínio

Uma empresa pode estar em estados diferentes para cada domínio:

```
EMPRESA: Barbearia do João — 18/07/2026

Domínio              Estado        Confiança     Objetos
───────────────────────────────────────────────────────────
Identidade           Validada      0.90          3/3
Pessoas              Estrutural    0.65          5/6
Oferta               Validada      0.85          4/4
Operação             Operacional   0.60          8/10
Finanças             Financeira    0.70          5/8
Clientes             Comercial     0.55          4/6
Problemas            Diagnosticada 0.65          3/4
Conhecimento         Cognitiva     0.60          4/6

Estado GERAL: Diagnosticada (média ponderada por relevância)
```

### 5.2 Diferença entre estado geral e específico

O estado geral é uma simplificação. Para a IA, o estado por domínio é mais útil:

```
Ação baseada em estado por domínio:

Domínio Finanças = Financeira (confiança 0.70)
  → IA pode: Sugerir cortes de despesa, alertar sobre margem
  → IA não pode: Afirmar resultado do próximo mês

Domínio Clientes = Comercial (confiança 0.55)
  → IA pode: Perguntar sobre perfil de clientes
  → IA não pode: Sugerir campanha de marketing segmentada
```

## 6. Matriz de ações por estado

### 6.1 O que a IA pode fazer em cada estado

| Ação | Des | Sup | Est | Ope | Fin | Com | Dia | Cog | Val |
|------|-----|-----|-----|-----|-----|-----|-----|-----|-----|
| Perguntar | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Buscar CNPJ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Identificar lacunas | — | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Sugerir oferta | — | — | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Sugerir processo | — | — | — | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Sugerir corte custo | — | — | — | — | ✅ | ✅ | ✅ | ✅ | ✅ |
| Sugerir retenção | — | — | — | — | — | ✅ | ✅ | ✅ | ✅ |
| Priorizar problemas | — | — | — | — | — | — | ✅ | ✅ | ✅ |
| Sugerir com base em conhecimento | — | — | — | — | — | — | — | ✅ | ✅ |
| Afirmar com certeza | — | — | — | — | — | — | — | — | ✅ |

### 6.2 Exemplo prático por estado

```
Estado: Estrutural (empresa recém-cadastrada)
  IA pode: "João, como é o dia a dia da barbearia?"
  IA não pode: "Sugiro contratar mais um barbeiro" (não conhece processo)

Estado: Financeira
  IA pode: "João, sua despesa com aluguel é 18% da receita — isso está dentro do esperado"
  IA não pode: "Seus clientes preferem Pix" (não conhece cliente)

Estado: Validada
  IA pode: "João, baseado nos últimos 3 meses, contratar mais um barbeiro no horário de almoço aumenta seu lucro líquido em 15%"
```

## 7. Indicadores de transição

### 7.1 Gatilhos que avançam o estado

| Gatilho | Estado alvo | Condição |
|---------|-------------|----------|
| Empresa respondeu segmento | Superficial | Qualquer resposta válida |
| Empresa listou ofertas | Estrutural | 2+ ofertas ou 3+ pessoas |
| Processos foram descritos | Operacional | 2+ processos mapeados |
| Receita e despesa informadas | Financeira | Receita + despesa com confiança ≥ 0.50 |
| Lista de clientes obtida | Comercial | 10+ clientes ou perfil descrito |
| Problemas identificados | Diagnosticada | 2+ problemas com causa raiz |
| Conhecimento extraído | Cognitiva | 3+ padrões ou aprendizados |
| Empresário validou | Validada | Confirmação de 70%+ do modelo |

### 7.2 Gatilhos que regridem o estado

| Gatilho | De | Para |
|---------|----|------|
| Informação crítica desatualizada > 90 dias | Qualquer | -1 nível |
| Contradição não resolvida | Qualquer | -1 nível |
| Mudança de segmento | Qualquer | Superficial |
| Empresa passou por crise significativa | Qualquer | Estrutural |
| Fonte principal invalidada | Qualquer | -1 nível |

## 8. Tempo estimado por estado

### 8.1 Tempo real (interação ativa com empresário)

| Transição | Tempo ativo | Tempo calendário |
|-----------|-------------|------------------|
| Desconhecida → Superficial | 1-2 min | 1 min |
| Superficial → Estrutural | 5-15 min | 1 dia |
| Estrutural → Operacional | 15-30 min | 1-3 dias |
| Operacional → Financeira | 30-60 min | 1-7 dias |
| Financeira → Comercial | 10-30 min | 1-30 dias |
| Comercial → Diagnosticada | 10-20 min | 1-7 dias |
| Diagnosticada → Cognitiva | Contínuo | 7-90 dias |
| Cognitiva → Validada | 5-15 min | 1-7 dias |
| **Total** | **~2-4 horas** | **~2-4 semanas** |

### 8.2 Fatores que aceleram

| Fator | Redução de tempo |
|-------|-----------------|
| Integração ERP/CRM | -50% a -70% |
| Documentos organizados | -30% a -50% |
| Empresário disponível | -40% |
| Empresário já usa dados | -30% |
| Segmento muito conhecido | -20% |

### 8.3 Fatores que atrasam

| Fator | Aumento de tempo |
|-------|-----------------|
| Empresário não responde | +200% a +500% |
| Dados bagunçados | +50% a +100% |
| Segmento complexo | +30% a +60% |
| Múltiplas unidades | +50% |
| Empresário desconfiado | +30% |

## 9. Estados de objeto vs estados de empresa

### 9.1 Cada objeto tem seu próprio estado

Assim como a empresa tem um estado cognitivo, cada objeto individual também tem:

| Objeto | Estados possíveis |
|--------|------------------|
| Cliente | Lead, Prospect, Ativo, Inativo, Recuperado, Perdido |
| Produto | Ativo, Inativo, EmDesenvolvimento, Descontinuado |
| Problema | Identificado, Analisado, EmSolucao, Resolvido, Recorrente |
| Conhecimento | Emergente, Validado, Contestado, Obsoleto |
| Processo | Mapeado, Documentado, Otimizado, ComGargalo |

### 9.2 Impacto dos estados de objeto no estado da empresa

```
Se 80%+ dos objetos de um domínio estão no estado mais alto,
o domínio pode ser considerado completo.

Exemplo:
  Domínio Finanças tem 8 objetos possíveis:
  - Receita: estado "Recebida" (completo)
  - Despesa: estado "Paga" (completo)
  - Margem: estado "Calculada" (completo)
  - Caixa: estado "Monitorado" (completo)
  - Resultado: estado "Calculado" (completo)
  - Investimento: estado "NãoInformado" (incompleto)
  - Divida: estado "NãoInformado" (incompleto)
  - Credito: estado "NãoInformado" (incompleto)

  5/8 completos = 62.5% → Domínio "Financeira" com maturidade média
  → Empresa recebe estado Financeira com ressalva de objetos faltantes
```

## 10. Autoavaliação da IA

### 10.1 A IA deve saber o que sabe e o que não sabe

A IA deve ser capaz de responder, para qualquer empresa:

```
Autoavaliação Cognitiva — Barbearia do João

Estado geral: Diagnosticada (nível 6/8)
Confiança geral: 0.65

Domínios:
├── OK: Identidade, Oferta, Operação
├── PARCIAL: Finanças (falta margem), Clientes (falta perfil)
└── CRÍTICO: Conhecimento (só 2 padrões extraídos)

Lacunas chave:
1. Margem por oferta (impacto: alto)
2. Perfil de cliente ideal (impacto: alto)
3. Churn rate (impacto: médio)
4. NPS (impacto: médio)

O que posso afirmar com confiança:
- A empresa é uma barbearia na Rua Augusta
- Tem 3 pessoas, fatura ~R$ 14 mil/mês
- Maior problema: demora no horário de almoço

O que NÃO posso afirmar:
- Qual a margem do combo (não calculada)
- Quanto cresceu no último ano (não tem histórico)
- Qual a satisfação do cliente (não medida)
```

---

> **Fim do Modelo de Estados**
> Próximo: `MODELO_DE_EVOLUCAO.md` — Evolução, mudança e crise
