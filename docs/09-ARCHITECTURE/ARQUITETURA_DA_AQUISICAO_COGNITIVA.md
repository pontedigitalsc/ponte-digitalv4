# Arquitetura da Aquisição Cognitiva

> **Programa 12 — Fase 2** | Fluxo Operacional do Conhecimento
> Patrimônio Intelectual da Ponte Digital
> Nenhum código, classe, API, schema, migration ou engine foi criado.
> Alinhado com: Constituição da Engenharia, Modelo Cognitivo Universal (Fase 1), Plataforma de Aquisição Cognitiva

---

## Índice

1. [O que é Aquisição Cognitiva](#1-o-que-é-aquisição-cognitiva)
2. [Os 7 papéis da aquisição](#2-os-7-papéis-da-aquisição)
3. [Fluxo Cognitivo Completo](#3-fluxo-cognitivo-completo)
4. [Arquitetura em camadas](#4-arquitetura-em-camadas)
5. [Mapa dos 12 tópicos arquiteturais](#5-mapa-dos-12-tópicos-arquiteturais)
6. [Diagrama de contexto](#6-diagrama-de-contexto)
7. [Contratos entre camadas](#7-contratos-entre-camadas)
8. [Regras arquiteturais da aquisição](#8-regras-arquiteturais-da-aquisição)
9. [Documentos derivados](#9-documentos-derivados)

---

## 1. O que é Aquisição Cognitiva

### 1.1 Definição

Aquisição Cognitiva é o **processo contínuo pelo qual a Ponte Digital transforma sinais brutos do mundo real em patrimônio cognitivo estruturado**, permitindo compreender qualquer empresa independentemente da origem, formato ou qualidade dos dados disponíveis.

Ela não é:
- Importação de dados (embora inclua importação)
- Integração de sistemas (embora inclua integração)
- Coleta de informações (embora inclua coleta)

Ela é: **a ponte entre o caos do mundo real e a estrutura do conhecimento empresarial.**

### 1.2 A quem se destina esta arquitetura

| Papel | Como usa este documento |
|-------|----------------------|
| Arquiteto | Valida se implementações futuras respeitam o fluxo projetado |
| Engenheiro | Entende como o conhecimento percorre a plataforma antes de codificar |
| Produto | Sabe qual experiência o empresário terá em cada etapa |
| Conselho | Avalia se a arquitetura está alinhada com a visão da Ponte Digital |
| Futuro implementador | Traduz o fluxo em engines, services e APIs sem reinventar conceitos |

### 1.3 Relação com a Fase 1

```
Fase 1 (Modelo Cognitivo Universal)
├── O QUÊ: 58 objetos, 85 relacionamentos, 12 elementos universais
├── QUEM: Ontologia, taxonomia, vocabulário
└── QUANTO: Confiança, incerteza, estados

Fase 2 (Arquitetura da Aquisição Cognitiva) ← ESTAMOS AQUI
├── COMO: Fluxo operacional completo
├── QUANDO: Ordem, gatilhos, ciclos
└── ONDE: Camadas, pipelines, fronteiras

Fase 3 (futura) — Implementação
├── CODE: Engines, Services, APIs
├── DATA: Schemas, Migrations
└── UI: Componentes, Experiência
```

## 2. Os 7 papéis da aquisição

Todo fluxo de aquisição cognitiva deve responder a 7 perguntas. Estas perguntas formam a **matriz de responsabilidades** de toda a arquitetura.

| Papel | Pergunta | Resposta |
|-------|----------|----------|
| **Quem cria?** | Quem traz a informação para o sistema? | Empresário (ativa), Integrações (passiva), IA (ativa), Clientes (indireta), Documentos (upload) |
| **Quem interpreta?** | Quem extrai significado do dado bruto? | Pipeline Universal (normalização), IA (contexto), Humano (validação opcional) |
| **Quem valida?** | Quem confirma que a interpretação está correta? | Empresário (validação máxima), Convergência de fontes (validação automática), Ciclo de feedback |
| **Quem aprende?** | Quem extrai padrões do que foi validado? | Motor Cognitivo, Pipeline de Aprendizado Contínuo |
| **Quem registra?** | Quem armazena o conhecimento? | Patrimônio Cognitivo (com proveniência, versão, confiança) |
| **Quem evolui?** | Quem atualiza o conhecimento quando a empresa muda? | Ciclo de revalidação, Detecção de mudanças, Novo dado que contradiz |
| **Quem utiliza?** | Quem consome o conhecimento? | Empresário (recomendações), IA (decisões), Sistema (Experiência Engine), Coletivo (benchmarks anônimos) |

### 2.1 Matriz de responsabilidades por etapa

| Etapa | Criador | Intérprete | Validador | Aprendiz | Registrador | Evoluidor | Usuário |
|-------|---------|------------|-----------|----------|-------------|-----------|---------|
| Entrada de dado bruto | Fonte externa | Pipeline | — | — | — | — | — |
| Normalização | — | Pipeline | Pipeline (consistência) | — | Patrimônio | — | — |
| Reconstrução | — | IA | Empresário | — | Patrimônio | — | — |
| Validação de hipótese | — | IA | Empresário | Motor Cog. | Patrimônio | — | — |
| Conhecimento validado | — | — | Ciclo | Motor Cog. | Patrimônio | Tempo | IA/Experiência |
| Evolução | — | — | — | — | Patrimônio | Detector | IA/Experiência |

## 3. Fluxo Cognitivo Completo

### 3.1 Do primeiro acesso à maturidade

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    FLUXO COGNITIVO COMPLETO                                 │
│                                                                             │
│  [EMPRESA DESCONHECIDA]                                                     │
│       │                                                                     │
│       ▼                                                                     │
│  ┌──────────────────┐                                                       │
│  │ PRIMEIRO ACESSO  │──● CNPJ informado ou descoberto                       │
│  │ (identificação)  │──● Dados públicos consultados                         │
│  └──────┬───────────┘──● Segmento inferido                                  │
│         │                                                                    │
│         ▼                                                                    │
│  ┌──────────────────┐                                                       │
│  │ PRIMEIRA CONVERSA│──● Primeira interação com o empresário                │
│  │ (boas-vindas)    │──● Primeira pergunta adaptativa                       │
│  └──────┬───────────┘──● Primeiras entidades identificadas                  │
│         │                                                                    │
│         ▼                                                                    │
│  ┌──────────────────┐                                                       │
│  │ RECONSTRUÇÃO     │──● Esqueleto da empresa montado                       │
│  │ (fases 0-5)      │──● Objetos criados, relacionados                      │
│  └──────┬───────────┘──● Lacunas identificadas                              │
│         │                                                                    │
│         ▼                                                                    │
│  ┌──────────────────┐                                                       │
│  │ PRIMEIRO VALOR   │──● Primeiro diagnóstico entregue                      │
│  │ (percepção)      │──● Primeira recomendação                              │
│  └──────┬───────────┘──● Empresário entende que a IA está entendendo        │
│         │                                                                    │
│         ├─────────────────────────────────────────────────────┐             │
│         ▼                                                     ▼             │
│  ┌──────────────────┐                              ┌──────────────────┐     │
│  │ VALIDAÇÃO        │                              │ IMPORTAÇÃO       │     │
│  │ (empresário      │                              │ (documentos,     │     │
│  │  confirma modelo)│                              │  integrações)    │     │
│  └──────┬───────────┘                              └──────┬───────────┘     │
│         │                                                  │                 │
│         └──────────────────────┬──────────────────────────┘                 │
│                                │                                            │
│                                ▼                                            │
│  ┌──────────────────┐                                                       │
│  │ CONHECIMENTO     │──● Padrões identificados                              │
│  │ (aprendizado)    │──● Hipóteses testadas                                 │
│  └──────┬───────────┘──● Conhecimento validado                              │
│         │                                                                    │
│         ▼                                                                    │
│  ┌──────────────────┐                                                       │
│  │ RECOMENDAÇÃO     │──● Recomendações baseadas em conhecimento             │
│  │ (valor contínuo)  │──● Ciclo de melhoria contínua                        │
│  └──────┬───────────┘                                                       │
│         │                                                                    │
│         ▼                                                                    │
│  ┌──────────────────┐                                                       │
│  │ APRENDIZADO      │──● Revalidação periódica                              │
│  │ CONTÍNUO         │──● Novas fontes, novos padrões                        │
│  └──────┬───────────┘──● Evloução cognitiva                                 │
│         │                                                                    │
│         ▼                                                                    │
│  ┌──────────────────┐                                                       │
│  │ EMPRESA          │──● Empresa profundamente compreendida                 │
│  │ ESPECIALISTA     │──● IA entende padrões, antecipa problemas             │
│  └──────────────────┘                                                       │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 3.2 Marcos temporais do fluxo

| Marco | Descrição | Tempo estimado | Estado cognitivo |
|-------|-----------|---------------|------------------|
| Primeiro acesso | Empresa identificada | 0-1 min | Desconhecida |
| Primeira conversa | Primeira interação | 1-5 min | Superficial |
| Primeiras entidades | Objetos criados | 5-20 min | Estrutural |
| Primeiro valor | Diagnóstico/recomendação | 15-30 min | Operacional/Financeira |
| Primeira validação | Empresário confirma | 30-60 min | Diagnosticada |
| Primeiro conhecimento | Padrão validado | 1-30 dias | Cognitiva |
| Primeira recomendação | Sugestão baseada em conhecimento | 1-30 dias | Validada |
| Ciclo de melhoria | Aprendizado contínuo | 30+ dias | Validada+ |
| Empresa especialista | Compreensão profunda | 3-12 meses | Validada (madura) |

## 4. Arquitetura em camadas

A Aquisição Cognitiva opera em 5 camadas. Cada camada resolve um problema específico e se comunica apenas com as camadas adjacentes.

```
CAMADA 5 — EXPERIÊNCIA
O que o empresário vê, ouve e sente.
Problema: Como apresentar o conhecimento de forma útil?
Responsável: Experience Engine (já existe)
Comunica-se com: Camada 4

       ↑↓

CAMADA 4 — COGNITIVA
Onde o conhecimento vive e evolui.
Problema: Como armazenar, versionar e consultar conhecimento?
Responsável: Patrimônio Cognitivo + Motor Cognitivo (já existem)
Comunica-se com: Camada 3 e 5

       ↑↓

CAMADA 3 — RECONSTRUÇÃO
Onde o dado bruto vira conhecimento estruturado.
Problema: Como transformar sinais em objetos cognitivos?
Responsável: Pipeline Universal de Aquisição (projetado nesta fase)
Comunica-se com: Camada 2 e 4

       ↑↓

CAMADA 2 — NORMALIZAÇÃO
Onde diferentes formatos viram um formato universal.
Problema: Como fazer CSV, NF, conversa e ERP falarem a mesma língua?
Responsável: Conectores + Normalizadores (projetado nesta fase)
Comunica-se com: Camada 1 e 3

       ↑↓

CAMADA 1 — ENTRADA
Onde o mundo real encontra a Ponte Digital.
Problema: Como receber sinais de qualquer fonte?
Responsável: Receptores (projetado nesta fase)
Comunica-se com: Camada 2 e com o mundo externo
```

### 4.1 Responsabilidades de cada camada

#### Camada 1 — Entrada
- Receber dados de qualquer fonte (conversa, documento, integração, observação)
- Identificar o tipo de fonte
- Aplicar validação mínima de formato
- Encaminhar para a camada de normalização
- Registrar métricas de volume e origem
- **Não faz:** interpretar, validar, armazenar

#### Camada 2 — Normalização
- Converter formato específico para formato universal
- Extrair campos relevantes
- Aplicar regras de limpeza (deduplicação, formatação)
- Marcar proveniência e confiança inicial
- Encaminhar para reconstrução
- **Não faz:** criar objetos, inferir contexto

#### Camada 3 — Reconstrução
- Mapear dados normalizados para objetos cognitivos
- Estabelecer relacionamentos entre objetos
- Atualizar estados cognitivos
- Identificar lacunas
- Calcular confiança composta
- Encaminhar para camada cognitiva
- **Não faz:** apresentar ao usuário, tomar decisões

#### Camada 4 — Cognitiva
- Armazenar objetos, relacionamentos e metadados
- Versionar cada mudança
- Gerenciar ciclo de vida do conhecimento
- Aplicar decaimento temporal
- Responder consultas das camadas superiores
- **Não faz:** normalizar, reconstruir, apresentar

#### Camada 5 — Experiência
- Consultar camada cognitiva
- Montar narrativas, diagnósticos, recomendações
- Apresentar ao empresário
- Coletar feedback (correções, confirmações)
- Encaminhar feedback para camada 3 (reconstrução)
- **Não faz:** interpretar dados brutos, gerenciar conhecimento

## 5. Mapa dos 12 tópicos arquiteturais

Cada tópico do programa é endereçado por um ou mais documentos:

| # | Tópico | Documento primário | Documentos de apoio |
|---|-------|-------------------|---------------------|
| 1 | Fluxo Cognitivo Completo | ARQUITETURA_DA_AQUISICAO_COGNITIVA.md (este) | FLUXO_DA_EMPRESA_DESCONHECIDA.md |
| 2 | Arquitetura da Entrada de Conhecimento | PIPELINE_UNIVERSAL_DE_AQUISICAO.md | FLUXO_DA_IMPORTACAO_INTELIGENTE.md |
| 3 | Pipeline Universal de Aquisição | PIPELINE_UNIVERSAL_DE_AQUISICAO.md | — |
| 4 | Fluxo dos Objetos Cognitivos | FLUXO_DA_EMPRESA_DESCONHECIDA.md | ARQUITETURA_DA_RECONSTRUCAO_EMPRESARIAL.md |
| 5 | Arquitetura das Perguntas | ARQUITETURA_DA_CONFIANCA.md | FLUXO_DA_PRIMEIRA_CONVERSA.md |
| 6 | Arquitetura da Confiança | ARQUITETURA_DA_CONFIANCA.md | — |
| 7 | Arquitetura da Reconstrução | ARQUITETURA_DA_RECONSTRUCAO_EMPRESARIAL.md | FLUXO_DA_EMPRESA_DESCONHECIDA.md |
| 8 | Arquitetura da Evolução | ARQUITETURA_DA_EVOLUCAO_COGNITIVA.md | ARQUITETURA_DA_APRENDIZAGEM_CONTINUA.md |
| 9 | Arquitetura da Primeira Experiência | ARQUITETURA_DA_PRIMEIRA_PERCEPCAO_DE_VALOR.md | FLUXO_DA_PRIMEIRA_CONVERSA.md |
| 10 | Arquitetura da Aprendizagem Contínua | ARQUITETURA_DA_APRENDIZAGEM_CONTINUA.md | — |
| 11 | Arquitetura da Descoberta de Lacunas | ARQUITETURA_DA_APRENDIZAGEM_CONTINUA.md | ARQUITETURA_DA_RECONSTRUCAO_EMPRESARIAL.md |
| 12 | Aquisição em Escala | ARQUITETURA_DA_APRENDIZAGEM_CONTINUA.md | PIPELINE_UNIVERSAL_DE_AQUISICAO.md |

## 6. Diagrama de contexto

### 6.1 A Ponte Digital e o mundo externo

```
                        ┌─────────────────────────────────────────────┐
                        │              MUNDO REAL                      │
                        │                                              │
                        │  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐    │
                        │  │ERP   │  │CRM   │  │Banco │  │Site  │    │
                        │  └──┬───┘  └──┬───┘  └──┬───┘  └──┬───┘    │
                        │     │         │         │         │        │
                        │  ┌──▼───┐  ┌──▼───┐  ┌──▼───┐  ┌──▼───┐    │
                        │  │NF    │  │Whats │  │Plan. │  │CNPJ  │    │
                        │  └──┬───┘  └──┬───┘  └──┬───┘  └──┬───┘    │
                        │     │         │         │         │        │
                        │  ┌──▼─────────▼─────────▼─────────▼───┐    │
                        │  │       EMPRESÁRIO                   │    │
                        │  │  (conversa, comportamento,         │    │
                        │  │   feedback, documentos)            │    │
                        │  └────────────────┬──────────────────┘    │
                        └───────────────────┼───────────────────────┘
                                            │
                    ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─┼─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─
                       LIMITE DA PLATAFORMA │
                                            ▼
              ┌────────────────────────────────────────────────────┐
              │              PONTE DIGITAL                          │
              │                                                     │
              │  ┌──────────────────────────────────────────────┐   │
              │  │  CAMADA 1 — ENTRADA                          │   │
              │  │  Receptores: API Conversa, Upload,           │   │
              │  │  Integração, Webhook, Scanner                │   │
              │  └───────────────────┬──────────────────────────┘   │
              │                      ▼                               │
              │  ┌──────────────────────────────────────────────┐   │
              │  │  CAMADA 2 — NORMALIZAÇÃO                     │   │
              │  │  Conectores: CSV, NF, ERPParser, OCR,       │   │
              │  │  ConversaParser, ExtratoParser               │   │
              │  └───────────────────┬──────────────────────────┘   │
              │                      ▼                               │
              │  ┌──────────────────────────────────────────────┐   │
              │  │  CAMADA 3 — RECONSTRUÇÃO                     │   │
              │  │  Pipeline Universal: Interpretar →           │   │
              │  │  Mapear → Relacionar → Validar → Confiar     │   │
              │  └───────────────────┬──────────────────────────┘   │
              │                      ▼                               │
              │  ┌──────────────────────────────────────────────┐   │
              │  │  CAMADA 4 — COGNITIVA                        │   │
              │  │  Patrimônio Cognitivo (objetos, relacion.)   │   │
              │  │  Motor Cognitivo (decisões, recomendações)   │   │
              │  └───────────────────┬──────────────────────────┘   │
              │                      ▼                               │
              │  ┌──────────────────────────────────────────────┐   │
              │  │  CAMADA 5 — EXPERIÊNCIA                      │   │
              │  │  Narrativas, Diagnósticos, Recomendações,    │   │
              │  │  Dashboard, Perguntas, Feedback              │   │
              │  └──────────────────────────────────────────────┘   │
              └────────────────────────────────────────────────────┘
```

## 7. Contratos entre camadas

### 7.1 Contrato Camada 1 → Camada 2

```
Entrada: {
  fonte: string                 // "conversa" | "csv" | "nf_xml" | "extrato" | "whatsapp" | ...
  rawData: any                  // dado original, sem processamento
  metadados: {
    timestamp: string
    empresaId: string
    usuarioId: string | null
    formato: string              // "texto" | "csv" | "xml" | "json" | "pdf" | "imagem"
    tamanhoBytes: number
  }
}
```

### 7.2 Contrato Camada 2 → Camada 3

```
Saída: {
  objetosNormalizados: [{
    tipo: string                 // tipo do objeto cognitivo
    atributos: map               // campos extraídos e normalizados
    confiancaInicial: float      // 0.0-1.0
    fonte: string                // de onde veio
    proveniencia: [{
      fonte: string
      campo: string
      valor: string
      confianca: float
    }]
  }]
  relacionamentos: [{
    origem: string
    destino: string
    tipo: string
    confianca: float
  }]
}
```

### 7.3 Contrato Camada 3 → Camada 4

```
Saída: {
  objetosCriados: [string]       // IDs dos objetos criados ou atualizados
  objetosRelacionados: [string]  // IDs dos relacionamentos estabelecidos
  lacunasIdentificadas: [{
    objeto: string
    atributo: string
    prioridade: number
  }]
  confiancaAtualizada: map       // objetoId → novaConfianca
}
```

### 7.4 Contrato Camada 4 → Camada 5

```
Saída: {
  empresaId: string
  estadoCognitivo: string
  objetos: [ObjetoCognitivo]
  conhecimentos: [Conhecimento]
  lacunas: [Lacuna]
  confiancaMedia: float
  ultimaAtualizacao: timestamp
  recomendacoes: [{
    tipo: string
    descricao: string
    prioridade: number
    baseadaEm: string
    confianca: float
  }]
}
```

## 8. Regras arquiteturais da aquisição

### 8.1 Regras de fluxo

1. **Toda entrada passa pelas 5 camadas** — nenhuma camada pode ser pulada
2. **Cada camada adiciona metadados** — proveniência, confiança, timestamp
3. **Nenhuma camada armazena estado** — estado reside apenas na camada 4
4. **Camada 1 não interpreta** — recebe e encaminha, nada mais
5. **Camada 5 não interpreta** — apenas apresenta e coleta feedback
6. **Feedback do empresário volta para camada 3** — correções entram como nova fonte

### 8.2 Regras de consistência

7. **Mesma fonte, mesmo pipeline** — conversa, CSV, ERP: todos passam pelo mesmo pipeline universal
8. **Conflito não é erro** — fontes contraditórias coexistem com suas confianças
9. **Nunca deletar informação** — apenas marcar como obsoleta ou substituída
10. **Proveniência é imutável** — uma vez registrada, não pode ser alterada

### 8.3 Regras de prioridade

11. **Fonte com maior confiança vence** — em caso de empate, apresentar ambas
12. **Empresário sempre tem a palavra final** — correção do empresário sobrescreve qualquer fonte
13. **Dado recente tem prioridade sobre dado antigo** — mesma fonte, datas diferentes
14. **Dado estruturado tem prioridade sobre não estruturado** — NF XML > OCR de PDF

## 9. Documentos derivados

Este documento é o mestre da Fase 2. Dele derivam 9 documentos especializados:

| Documento | Conteúdo |
|-----------|----------|
| PIPELINE_UNIVERSAL_DE_AQUISICAO.md | Pipeline de 8 estágios + conectores de entrada |
| FLUXO_DA_EMPRESA_DESCONHECIDA.md | Jornada completa: do desconhecido ao compreendido |
| FLUXO_DA_PRIMEIRA_CONVERSA.md | Design, técnica e árvore de decisão da primeira conversa |
| FLUXO_DA_IMPORTACAO_INTELIGENTE.md | Importação de CSV, Excel, NF, ERP, extrato |
| ARQUITETURA_DA_RECONSTRUCAO_EMPRESARIAL.md | Reconstrução guiada por objetos e relacionamentos |
| ARQUITETURA_DA_CONFIANCA.md | Competição entre fontes, perguntas, silêncio, conflito |
| ARQUITETURA_DA_PRIMEIRA_PERCEPCAO_DE_VALOR.md | Primeiros 5 minutos: o que o empresário vê e recebe |
| ARQUITETURA_DA_EVOLUCAO_COGNITIVA.md | Indicadores, gatilhos e critérios de evolução |
| ARQUITETURA_DA_APRENDIZAGEM_CONTINUA.md | Ciclo contínuo, lacunas, escala |

---

> **Fim da Arquitetura da Aquisição Cognitiva**
> Próximo: `PIPELINE_UNIVERSAL_DE_AQUISICAO.md` — Pipeline de 8 estágios + conectores
