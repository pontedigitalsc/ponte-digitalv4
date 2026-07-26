# Pipeline Universal de Aquisição

> **Programa 12 — Fase 2** | Fluxo Operacional do Conhecimento
> Patrimônio Intelectual da Ponte Digital
> Nenhum código, classe, API, schema, migration ou engine foi criado.
> Alinhado com: ARQUITETURA_DA_AQUISICAO_COGNITIVA.md

---

## Índice

1. [O princípio do pipeline único](#1-o-princípio-do-pipeline-único)
2. [Visão geral — 8 estágios](#2-visão-geral)
3. [Estágio 1 — Recepção](#3-estágio-1--recepção)
4. [Estágio 2 — Classificação](#4-estágio-2--classificação)
5. [Estágio 3 — Extração](#5-estágio-3--extração)
6. [Estágio 4 — Normalização](#6-estágio-4--normalização)
7. [Estágio 5 — Mapeamento Ontológico](#7-estágio-5--mapeamento-ontológico)
8. [Estágio 6 — Enriquecimento Contextual](#8-estágio-6--enriquecimento-contextual)
9. [Estágio 7 — Atribuição de Confiança](#9-estágio-7--atribuição-de-confiança)
10. [Estágio 8 — Incorporação ao Patrimônio](#10-estágio-8--incorporação-ao-patrimônio)
11. [Arquitetura da Entrada de Conhecimento](#11-arquitetura-da-entrada-de-conhecimento)
12. [Conectores — Especificação](#12-conectores)
13. [Fluxo completo com exemplo](#13-fluxo-completo-com-exemplo)

---

## 1. O princípio do pipeline único

### 1.1 Um pipeline, todas as fontes

Não importa se a informação veio de uma conversa, um CSV, uma NF XML, um extrato bancário, uma integração de ERP ou uma foto de comprovante.

**Todas as fontes passam pelo mesmo pipeline de 8 estágios.**

Isso garante que:
- O conhecimento resultante tem a mesma estrutura independentemente da origem
- Novos conectores podem ser adicionados sem alterar o pipeline
- A confiança é calculada de forma consistente
- A proveniência é rastreável de volta à fonte original

### 1.2 Por que não pipelines diferentes?

| Tentação | Problema | Resultado |
|----------|----------|-----------|
| Pipeline separado para conversa | Conhecimento da conversa tem estrutura diferente | Impossível comparar com dados de NF |
| Pipeline separado para CSV | CSV vira "dado importado" com regras próprias | Inconsistência com dados de integração |
| Pipeline separado para ERP | ERP vira "dado oficial" sem validação cruzada | Confiança cega em sistemas que podem ter dados errados |

### 1.3 O que o pipeline NÃO faz

| Não faz | Por quê |
|---------|---------|
| Decide o que perguntar | Isso é função da Arquitetura das Perguntas |
| Apresenta informações ao usuário | Isso é função da Camada 5 |
| Toma decisões de negócio | Isso é função do Motor Cognitivo |
| Valida com o empresário | Isso é função do ciclo de validação |

## 2. Visão geral — 8 estágios

```
                    PIPELINE UNIVERSAL DE AQUISIÇÃO
                    ───────────────────────────────

  ENTRADA (qualquer fonte)
      │
      ▼
  ┌──────────────────────────────────────────────────┐
  │  1. RECEPÇÃO         Receber o dado bruto         │
  │                      Validar integridade mínima   │
  └──────────────────────────────────────────────────┘
      │
      ▼
  ┌──────────────────────────────────────────────────┐
  │  2. CLASSIFICAÇÃO    Identificar tipo de fonte    │
  │                      Selecionar extrator          │
  └──────────────────────────────────────────────────┘
      │
      ▼
  ┌──────────────────────────────────────────────────┐
  │  3. EXTRAÇÃO         Extrair campos do formato   │
  │                      Aplicar parser específico    │
  └──────────────────────────────────────────────────┘
      │
      ▼
  ┌──────────────────────────────────────────────────┐
  │  4. NORMALIZAÇÃO     Converter para schema        │
  │                      universal                    │
  │                      Padronizar formatos          │
  └──────────────────────────────────────────────────┘
      │
      ▼
  ┌──────────────────────────────────────────────────┐
  │  5. MAPEAMENTO       Mapear campos para objetos   │
  │   ONTOLÓGICO         cognitivos                   │
  │                      Estabelecer relacionamentos   │
  └──────────────────────────────────────────────────┘
      │
      ▼
  ┌──────────────────────────────────────────────────┐
  │  6. ENRIQUECIMENTO   Adicionar contexto            │
  │   CONTEXTUAL         Cruzar com dados existentes   │
  │                      Detectar contradições         │
  └──────────────────────────────────────────────────┘
      │
      ▼
  ┌──────────────────────────────────────────────────┐
  │  7. ATRIBUIÇÃO DE    Calcular confiança composta  │
  │   CONFIANÇA          Registrar proveniência        │
  │                      Marcar lacunas               │
  └──────────────────────────────────────────────────┘
      │
      ▼
  ┌──────────────────────────────────────────────────┐
  │  8. INCORPORAÇÃO     Atualizar patrimônio          │
  │   AO PATRIMÔNIO      cognitivo                     │
  │                      Versionar objetos             │
  └──────────────────────────────────────────────────┘
      │
      ▼
  SAÍDA → Camada 4 (Cognitiva)
```

## 3. Estágio 1 — Recepção

### 3.1 Função

Receber o dado bruto da fonte, validar que é processável, registrar entrada.

### 3.2 Entrada

```
{
  fonte: string
  rawData: any
  metadados: { timestamp, empresaId, usuarioId, formato, tamanho }
}
```

### 3.3 Processamento

```
1. Verificar integridade (não-nulo, tamanho > 0, formato reconhecido)
2. Se integridade OK → gerar recibo de entrada
3. Se integridade NOK → rejeitar com motivo (sem perder o dado)
4. Registrar metadados de entrada (timestamp, fonte, tamanho)
5. Encaminhar para classificação
```

### 3.4 Saída

```
{
  recebidoId: string           // ID único desta entrada
  fonte: string
  rawData: any
  status: "recebido" | "rejeitado"
  motivoRejeicao: string | null
  metadados: { ... originais + timestampRecepcao }
}
```

### 3.5 Regras

- **Nunca rejeitar permanentemente** — dado rejeitado é armazenado para análise futura
- **Sempre gerar recibo** — toda entrada tem ID rastreável
- **Timeout por fonte** — se entrada demorar > N segundos, falhar graciosamente

## 4. Estágio 2 — Classificação

### 4.1 Função

Identificar o tipo exato da fonte para selecionar o extrator correto.

### 4.2 Matriz de classificação

| Sinal de entrada | Tipo detectado | Extrator selecionado |
|-----------------|---------------|---------------------|
| Content-Type: text/csv | CSV | CSV Extractor |
| Content-Type: text/xml + schema="nf" | NF XML | NF XML Extractor |
| Content-Type: application/pdf | PDF | OCR + PDF Extractor |
| Mensagem de texto (chat) | Conversa | Conversa Parser |
| JSON de API Externa | Integração ERP | ERP Connector |
| Content-Type: text/html | Site | Web Scraper |
| Áudio gravado | Voz | Speech-to-Text + NLP |
| Imagem (foto de comprovante) | Imagem | OCR + Classificador |

### 4.3 Processamento

```
1. Analisar cabeçalhos/metadados/assinatura do dado
2. Se tipo reconhecido → selecionar extrator
3. Se tipo NÃO reconhecido → marcar como "não-classificado"
4. "Não-classificado" → tentar classificação por IA (análise de conteúdo)
5. Se IA também não classificar → armazenar para revisão manual
```

### 4.4 Saída

```
{
  recebidoId: string
  tipoFonte: string
  extratorId: string           // qual extrator será usado
  confiancaClassificacao: float // 0.0-1.0
  rawData: any
}
```

## 5. Estágio 3 — Extração

### 5.1 Função

Extrair campos estruturados do formato específico da fonte.

### 5.2 Extratores

| Extrator | Formato | Campos extraídos | Confiança típica |
|----------|---------|-----------------|------------------|
| CSV Extractor | CSV/Excel | Colunas mapeadas por cabeçalho | 0.50-0.80 |
| NF XML Extractor | XML NF-e | Emitente, cliente, produtos, valores, impostos | 0.90-0.95 |
| NF PDF Extractor | PDF NF | OCR + regex para campos fiscais | 0.40-0.70 |
| Extrato OFX | OFX | Transações, saldos, datas | 0.80-0.90 |
| Extrato PDF | PDF | OCR de linhas de extrato | 0.35-0.65 |
| Conversa Parser | Texto | Entidades, intenções, valores mencionados | 0.40-0.70 |
| ERP Connector | JSON/API | Objetos do ERP mapeados | 0.70-0.85 |
| OCR Universal | Imagem | Texto bruto extraído | 0.30-0.60 |

### 5.3 Processamento

```
1. Aplicar extrator específico para o tipo de fonte
2. Extrair campos conforme schema do extrator
3. Se extração parcial (alguns campos falharam): extrair o que for possível
4. Marcar cada campo com confiança individual
5. Se extração total falhou: marcar como "falha de extração"
```

### 5.4 Saída

```
{
  recebidoId: string
  tipoFonte: string
  camposExtraidos: [{
    nome: string
    valor: any
    confianca: float
    rawValue: string           // valor original antes de parsing
  }]
  status: "completo" | "parcial" | "falha"
}
```

## 6. Estágio 4 — Normalização

### 6.1 Função

Converter os campos extraídos para o schema universal de objetos cognitivos.

### 6.2 Regras de normalização

| Tipo de campo | Regra | Exemplo |
|---------------|-------|---------|
| Data | Converter para ISO 8601 | "15/07/2026" → "2026-07-15" |
| Moeda | Converter para centavos + BRL | "R$ 45,00" → 4500 |
| Telefone | Remover máscara, deixar dígitos | "(11) 99999-9999" → "5511999999999" |
| CPF/CNPJ | Remover máscara, validar dígitos | "123.456.789-00" → "12345678900" |
| Nome próprio | Capitalizar corretamente | "joão silva" → "João Silva" |
| Categoria | Mapear para vocabulário ontológico | "corte cabelo" → "Corte" |

### 6.3 Processamento

```
1. Para cada campo extraído:
   a. Identificar tipo do campo
   b. Aplicar regra de normalização
   c. Validar campo normalizado
   d. Se validação falhar: manter valor original com confiança reduzida
2. Montar estrutura normalizada (lista de pares campo→valor)
```

### 6.4 Saída

```
{
  recebidoId: string
  camposNormalizados: [{
    nome: string
    valorNormalizado: any
    tipo: "texto" | "numero" | "data" | "moeda" | "documento" | ...
    confianca: float
    proveniencia: { fonte, campoOriginal, valorOriginal }
  }]
}
```

## 7. Estágio 5 — Mapeamento Ontológico

### 7.1 Função

Transformar campos normalizados em objetos cognitivos com relacionamentos.

### 7.2 Matriz de mapeamento

| Conjunto de campos detectados | Objeto cognitivo criado |
|------------------------------|------------------------|
| nome, cpf, telefone, email | Pessoa → Cliente |
| cnpj, razao_social, ie | Pessoa → Fornecedor |
| descricao, valor, ncm | Produto |
| data, valor_total, cliente | Venda |
| data, valor, tipo_receita | Receita |
| data, valor, tipo_despesa | Despesa |
| data, cliente, servico | Agenda (atendimento) |
| descricao, causa, impacto | Problema |

### 7.3 Processamento

```
1. Agrupar campos normalizados por afinidade ontológica
2. Para cada grupo:
   a. Identificar tipo de objeto cognitivo
   b. Criar ou atualizar objeto
   c. Se objeto já existe: mesclar campos (novos + existentes)
3. Estabelecer relacionamentos:
   a. Venda → Cliente
   b. Venda → Produto
   c. Receita → Venda
   d. ...
4. Se campos insuficientes para objeto: marcar como "objeto parcial"
```

### 7.4 Saída

```
{
  objetos: [{
    tipo: string
    acao: "criado" | "atualizado" | "mesclado"
    atributos: map
    confianca: float
  }]
  relacionamentos: [{
    origem: string
    destino: string
    tipo: string
    confianca: float
  }]
}
```

## 8. Estágio 6 — Enriquecimento Contextual

### 8.1 Função

Adicionar contexto cruzando o novo dado com o patrimônio cognitivo existente.

### 8.2 Tipos de enriquecimento

| Tipo | O que faz | Exemplo |
|------|-----------|---------|
| Cruzamento | Compara com dados existentes | "NF informa R$ 50, patrimônio tem R$ 45 → divergência de 11%" |
| Correlação | Conecta com objetos relacionados | "Cliente X comprou produto Y — adicionar ao histórico do cliente" |
| Tendência | Compara com série histórica | "Venda de R$ 500 é 3x maior que média — marcar como anomalia" |
| Contexto temporal | Associa a período relevante | "Venda em dezembro — marcar como sazonal" |

### 8.3 Processamento

```
1. Consultar patrimônio cognitivo da empresa
2. Para cada novo objeto:
   a. Verificar se já existe (por ID ou similaridade)
   b. Se existe: calcular delta (o que mudou)
   c. Se não existe: preparar para criação
3. Para cada nova informação:
   a. Comparar com informação existente sobre mesmo assunto
   b. Se convergente: aumentar confiança
   c. Se divergente: registrar contradição (não resolver)
4. Detectar anomalias (valor fora da distribuição esperada)
```

### 8.4 Saída

```
{
  objetosAtualizados: [{
    objetoId: string
    estadoAnterior: any
    estadoNovo: any
    delta: string
  }]
  contradicoes: [{
    objeto: string
    fonteA: string
    valorA: any
    fonteB: string
    valorB: any
  }]
  anomalias: [{
    objeto: string
    valor: any
    mediaHistorica: any
    desvio: number
  }]
}
```

## 9. Estágio 7 — Atribuição de Confiança

### 9.1 Função

Calcular a confiança final de cada informação e registrar proveniência.

### 9.2 Cálculo de confiança

```
ConfiançaFinal = ConfiançaExtracao × FonteBase × ConsistenciaInterna × Convergencia

Onde:
  ConfiançaExtracao: quão bem o extrator conseguiu extrair o campo
  FonteBase: confiança inerente à fonte (ver modelo de confiança Fase 1)
  ConsistenciaInterna: o campo é consistente com outros campos da mesma fonte?
  Convergencia: bônus se converge com patrimônio existente; penalidade se contradiz
```

### 9.3 Matriz de confiança final

| Cenário | Confiança | Ação |
|---------|-----------|------|
| NF XML + convergente com patrimônio | 0.85-0.95 | Incorporar como alta confiança |
| Conversa + convergente | 0.65-0.80 | Incorporar, buscar validação |
| CSV manual + sem patrimônio | 0.30-0.50 | Incorporar como baixa, pedir validação |
| OCR de PDF + divergente | 0.15-0.35 | Marcar como suspeita, não incorporar |
| Fonte única + contradiz patrimônio | 0.10-0.30 | Registrar contradição, não incorporar |

### 9.4 Saída

```
{
  objetosComConfianca: [{
    objetoId: string
    confianca: float
    proveniencia: [{
      campo: string
      fonte: string
      confiancaFonte: float
      timestamp: string
    }]
    lacunas: [string]       // campos que ainda faltam
  }]
}
```

## 10. Estágio 8 — Incorporação ao Patrimônio

### 10.1 Função

Persistir o conhecimento processado no patrimônio cognitivo, com versionamento.

### 10.2 Processamento

```
1. Para cada objeto:
   a. Se novo: criar com versão 1
   b. Se atualização: incrementar versão, manter histórico
   c. Se contradição: criar versão alternativa (não substituir)
2. Para cada relacionamento:
   a. Se novo: criar
   b. Se existente: atualizar peso/confiança
3. Atualizar estado cognitivo da empresa (se aplicável)
4. Atualizar índice de lacunas
5. Registrar evento de incorporação (para audit trail)
```

### 10.3 Saída

```
{
  patrimonioAtualizado: {
    objetosCriados: number
    objetosAtualizados: number
    contradicoesRegistradas: number
    novasLacunas: number
    confiancaMediaApos: float
  }
  estadoPosPipeline: {
    empresaId: string
    estadoCognitivo: string
    objetosPreenchidos: number
    totalObjetos: number
    timestamp: string
  }
}
```

## 11. Arquitetura da Entrada de Conhecimento

### 11.1 Mapa completo de entradas

Toda forma de conhecimento que chega à Ponte Digital:

```
ENTRADAS DE CONHECIMENTO

ATIVAS (IA/empresário iniciam)
├── Conversa (chat, perguntas e respostas)
├── Upload de documento (drag-and-drop)
├── Upload de imagem (foto de comprovante, nota)
├── Conexão de integração (OAuth, API Key)
├── Scanner (câmera do celular)
├── Áudio (gravação de voz, transcrição)
└── Preenchimento manual (campos de formulário)

PASSIVAS (fontes enviam automaticamente)
├── Webhook (ERP notifica mudança)
├── Integração contínua (API polling)
├── E-mail (NF por email, propostas)
├── WhatsApp (mensagens de clientes)
├── Redes sociais (menções, DMs)
├── Google Sheets (planilha compartilhada)
└── Extrato bancário automático (OFX)

REATIVAS (decorrentes de ação anterior)
├── Feedback (correção, confirmação, complemento)
├── Comportamento (navegação, cliques, tempo de uso)
├── Resposta a pergunta da IA
└── Resultado de ação sugerida (o que aconteceu depois)
```

### 11.2 Cada entrada converge para o mesmo pipeline

```
Conversa:
  [Texto] → Classificação → [Parser Conversa] → Normalização → Mapeamento → ...

CSV:
  [CSV] → Classificação → [CSV Extractor] → Normalização → Mapeamento → ...

NF XML:
  [XML] → Classificação → [NF XML Extractor] → Normalização → Mapeamento → ...

WhatsApp:
  [Mensagem] → Classificação → [Conversa Parser] → Normalização → Mapeamento → ...

Extrato PDF:
  [PDF] → Classificação → [OCR + Extrato Parser] → Normalização → Mapeamento → ...

ERP API:
  [JSON] → Classificação → [ERP Connector] → Normalização → Mapeamento → ...

Feedback:
  [Correção] → Classificação → [Feedback Parser] → Normalização → Mapeamento → ...
```

### 11.3 Diferenças no tratamento por tipo de entrada

| Aspecto | Conversa | Documento | Integração | Observação |
|---------|----------|-----------|------------|------------|
| Disponibilidade | Síncrona (precisa do empresário) | Assíncrona | Contínua | Contínua |
| Volume por vez | 1-5 informações | 10-1000 registros | 1-10000 registros | 1 informação |
| Estrutura | Não estruturada | Semi-estruturada | Estruturada | Indireta |
| Confiança base | 0.55 (média) | 0.40-0.85 (varia) | 0.75-0.85 | 0.35 |
| Necessita empresário | Sim | Não (só upload) | Não | Não |
| Frequência | Por demanda | Quando enviar | Automática | Contínua |
| Pipeline aplicado | Completo (8 estágios) | Completo | Completo | Completo |

## 12. Conectores

### 12.1 Especificação de conector

Cada fonte de entrada tem um **conector** que implementa os estágios 1-4 (Recepção, Classificação, Extração, Normalização). Os estágios 5-8 (Mapeamento, Enriquecimento, Confiança, Incorporação) são compartilhados por todos os conectores.

```
Conector = {
  id: string                    // ex: "csv_extractor"
  nome: string                  // ex: "CSV Extractor"
  tiposFonte: [string]          // ex: ["csv", "xlsx", "ods"]
  detecta(formato): boolean     // consegue processar este formato?
  extrair(rawData): Campos      // implementa estágio 3
  normalizar(campos): Campos    // implementa estágio 4
  confiancaBase: float          // confiança inerente do conector
  requerimentos: [string]       // ex: ["cabecalho", "delimitador"]
}
```

### 12.2 Conectores existentes (projetados)

| Conector | Fontes | Estágios implementados |
|----------|--------|----------------------|
| Conversa Parser | Texto, chat | 1-4 |
| CSV Extractor | CSV, XLSX, ODS | 1-4 |
| NF XML Extractor | XML NFe, NFCe | 1-4 |
| NF PDF Extractor | PDF de nota fiscal | 1-4 |
| Extrato OFX | OFX, QIF | 1-4 |
| Extrato PDF | PDF bancário | 1-4 |
| ERP Connector | JSON REST API | 1-4 |
| WhatsApp Connector | API WhatsApp | 1-4 |
| OCR Universal | Imagem (jpg, png) | 1-4 |
| Web Scraper | HTML | 1-4 |
| Speech-to-Text | Áudio | 1-4 |
| E-mail Parser | E-mail (IMAP) | 1-4 |

### 12.3 Adicionando um novo conector

Para adicionar uma nova fonte de conhecimento no futuro:

```
1. Criar conector que implementa estágios 1-4
2. Mapear campos de saída para schema universal
3. Definir confiancaBase
4. Registrar no classificador (estágio 2)
5. ✅ Feito — estágios 5-8 são automáticos
```

## 13. Fluxo completo com exemplo

### 13.1 Exemplo: NF XML entra no pipeline

```
Entrada: NF XML da Barbearia do João
         (compra de tesoura profissional)

Estágio 1 — RECEPÇÃO:
  RecebidoId: "rec_20260718_001"
  Fonte: "upload_nf_xml"
  Status: "recebido"

Estágio 2 — CLASSIFICAÇÃO:
  Tipo detectado: "nf_xml"
  Extrator: "NF XML Extractor"
  Confiança: 0.95

Estágio 3 — EXTRAÇÃO:
  Campos extraídos:
    - emitente: "BelezaBella LTDA" (conf 0.95)
    - cnpj_emitente: "12.345.678/0001-90" (conf 0.95)
    - destinatario: "Barbearia do João" (conf 0.95)
    - cnpj_dest: "98.765.432/0001-10" (conf 0.95)
    - produto: "Tesoura Profissional Inox" (conf 0.95)
    - ncm: "8214.10.00" (conf 0.95)
    - quantidade: 3 (conf 0.95)
    - valor_unitario: 89.00 (conf 0.95)
    - valor_total: 267.00 (conf 0.95)

Estágio 4 — NORMALIZAÇÃO:
  - CNPJs sem máscara
  - Valor em centavos: 26700
  - Data: "2026-07-18"

Estágio 5 — MAPEAMENTO ONTOLÓGICO:
  Objetos criados/atualizados:
    - Fornecedor: "BelezaBella LTDA" (atualizado)
    - Produto: "Tesoura Profissional Inox" (atualizado)
    - Compra: NF de compra (criado)
    - Despesa: R$ 267,00 (criado)

Estágio 6 — ENRIQUECIMENTO CONTEXTUAL:
  - Cruzamento: Fornecedor "BelezaBella" já existe (conf 0.85)
  - Compra anterior de tesouras: sim, 2 meses atrás
  - Padrão: João compra tesouras a cada 2 meses
  - Anomalia: preço subiu 15% desde última compra

Estágio 7 — ATRIBUIÇÃO DE CONFIANÇA:
  - Confiança da NF: 0.95 (fonte) × 0.95 (extração) × 1.00 (consistente) × 1.10 (convergente) = 0.99
  - Confiança do produto atualizado: 0.92
  - Confiança do fornecedor atualizado: 0.90

Estágio 8 — INCORPORAÇÃO AO PATRIMÔNIO:
  - Objetos: 1 criado, 3 atualizados
  - Versões: Fornecedor v3, Produto v5, Compra v1, Despesa v12
  - Confiança média após: 0.88
  - Estado cognitivo: Financeira (não mudou de nível)
```

---

> **Fim do Pipeline Universal de Aquisição**
> Próximo: `FLUXO_DA_EMPRESA_DESCONHECIDA.md` — Jornada do desconhecido ao compreendido
