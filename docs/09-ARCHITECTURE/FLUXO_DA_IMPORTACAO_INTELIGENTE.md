# Fluxo da Importação Inteligente — Fontes Estruturadas

> **Programa 12 — Fase 2** | Fluxo Operacional do Conhecimento
> Patrimônio Intelectual da Ponte Digital
> Nenhum código, classe, API, schema, migration ou engine foi criado.

---

## Índice

1. [O que é importação inteligente](#1-o-que-é-importação-inteligente)
2. [Arquitetura da importação](#2-arquitetura-da-importação)
3. [Importação de CSV/Excel](#3-importação-de-csvexcel)
4. [Importação de NF (XML e PDF)](#4-importação-de-nf-xml-e-pdf)
5. [Importação de Extrato Bancário](#5-importação-de-extrato-bancário)
6. [Integração com ERP](#6-integração-com-erp)
7. [Importação de WhatsApp](#7-importação-de-whatsapp)
8. [Importação de Planilhas Google](#8-importação-de-planilhas-google)
9. [OCR e Imagens](#9-ocr-e-imagens)
10. [Fluxo unificado de importação](#10-fluxo-unificado-de-importação)

---

## 1. O que é importação inteligente

### 1.1 Definição

Importação Inteligente é o processo de **receber dados estruturados ou semi-estruturados de fontes externas e transformá-los em objetos cognitivos** sem exigir que o empresário mapeie campos, defina schemas ou entenda de tecnologia.

### 1.2 Diferença para importação tradicional

| Aspecto | Importação tradicional | Importação Inteligente |
|---------|----------------------|----------------------|
| Quem mapeia os campos | Usuário | IA (automático ou guiado) |
| Formato esperado | CSV com colunas fixas | Qualquer formato comum |
| Tratamento de erro | Falha total se campo errado | Importa o que consegue |
| Deduplicação | Manual | Automática (por similaridade) |
| Relacionamentos | Não cria | Cria automaticamente |
| Confiança | Assume que tudo é verdade | Atribui confiança por campo |
| Atualizações | Substitui tudo | Mescla com patrimônio existente |

### 1.3 Princípios

1. **Importe o que der, não exija perfeição** — dados parciais entram com confiança reduzida
2. **Nunca substitua — sempre mescle** — importação nova se soma ao patrimônio, não substitui
3. **Detecte o schema, não exija** — IA infere colunas, cabecalhos e formatos
4. **Valide antes de incorporar** — consistência mínima antes de entrar no patrimônio
5. **Proveniência sempre** — todo campo importado sabe de qual arquivo veio

## 2. Arquitetura da importação

### 2.1 Fluxo de importação

```
                   ┌────────────────────┐
                   │   ARQUIVO ORIGEM    │
                   │  (CSV, XLSX, XML,  │
                   │   PDF, imagem, etc)│
                   └────────┬───────────┘
                            │
                            ▼
                   ┌────────────────────┐
                   │ 1. DETECÇÃO        │
                   │ Identificar formato│
                   │ e estrutura        │
                   └────────┬───────────┘
                            │
                            ▼
                   ┌────────────────────┐
                   │ 2. PRÉ-VISUALIZAÇÃO│
                   │ Amostra dos dados  │
                   │ + campos detectados│
                   └────────┬───────────┘
                            │
                    ┌───────┴────────┐
                    ▼                ▼
           ┌──────────────┐  ┌──────────────┐
           │ 3a. MAPEAMENTO│  │ 3b. MAPEAMENTO│
           │ AUTOMÁTICO    │  │ GUIADO        │
           │ (conf ≥ 0.70) │  │ (conf < 0.70) │
           └───────┬───────┘  └───────┬───────┘
                    └───────┬─────────┘
                            │
                            ▼
                   ┌────────────────────┐
                   │ 4. VALIDAÇÃO       │
                   │ Consistência,      │
                   │ deduplicação,      │
                   │ range              │
                   └────────┬───────────┘
                            │
                            ▼
                   ┌────────────────────┐
                   │ 5. INCORPORAÇÃO    │
                   │ Pipeline Universal │
                   │ (estágios 5-8)     │
                   └────────┬───────────┘
                            │
                            ▼
                   ┌────────────────────┐
                   │ 6. RESUMO          │
                   │ O que foi importado│
                   │ + o que não foi    │
                   └────────────────────┘
```

## 3. Importação de CSV/Excel

### 3.1 Detecção automática de colunas

A IA analisa cabeçalhos e conteúdo para inferir o tipo de cada coluna:

| Padrão no cabeçalho | Tipo inferido | Objeto cognitivo |
|---------------------|---------------|-----------------|
| "nome", "cliente", "nome_cliente" | Nome de pessoa | Cliente, Equipe |
| "cpf", "cnpj", "documento" | Documento | Pessoa |
| "telefone", "celular", "whatsapp" | Contato | Pessoa |
| "email", "e-mail" | Email | Pessoa |
| "produto", "descricao", "item" | Nome de produto | Produto |
| "valor", "preco", "preço", "R$" | Valor monetário | Preço, Receita, Despesa |
| "data", "dia", "emissao" | Data | Venda, Evento |
| "quantidade", "qtd", "qtde" | Quantidade | Produto, Estoque |
| "categoria", "tipo", "departamento" | Categoria | Vários |
| "status", "situacao" | Estado | Vários |

### 3.2 Processo de mapeamento

```
Detecção automática (confiança ≥ 0.70):
  → Mapear coluna para campo ontológico
  → Prosseguir sem intervenção

Detecção incerta (confiança < 0.70):
  → Mostrar amostra ao empresário
  → "Esta coluna é o quê? Nome, Produto, Outro?"
  → Empresário escolhe em 2-3 opções

Detecção falhou (nenhum padrão reconhecido):
  → Empresário mapeia manualmente (drag-and-drop)
  → Ou IA pergunta: "O que tem nesta coluna?"
```

### 3.3 Exemplo completo

```
Arquivo: clientes.csv

colunas detectadas:
  "Nome" → Nome do Cliente (conf 0.95)
  "Telefone" → Contato do Cliente (conf 0.90)
  "UltimaCompra" → Data última compra (conf 0.85)
  "ValorGasto" → Total gasto (conf 0.85)

Após validação e incorporação:
  150 clientes importados
  3 duplicatas removidas (mesmo telefone)
  12 clientes com dados incompletos (sem telefone)
  135 clientes incorporados ao patrimônio
  Confiança média: 0.65 (fonte: planilha manual)
```

## 4. Importação de NF (XML e PDF)

### 4.1 NF XML — Processamento automático

```
NF XML é o formato mais confiável de importação:

Entrada: XML NFe
Processo:
  → Parse automático (100% dos campos)
  → Validação fiscal (digitos do CNPJ, IE, valores)
  → Mapeamento ontológico:
    - emitente → Fornecedor (ou próprio)
    - destinatario → Cliente (ou próprio)
    - produtos → Produto (itens da NF)
    - valor_total → Venda (se venda) ou Despesa (se compra)
    - impostos → metadados fiscais

Saída:
  Objetos: Cliente, Fornecedor, Produto, Venda/Compra
  Confiança: 0.90-0.95
  Velocidade: 1-2 segundos por NF
```

### 4.2 NF PDF — Processamento com OCR

```
NF PDF é menos confiável, mas ainda valioso:

Entrada: PDF da NF
Processo:
  → OCR (reconhecimento de texto)
  → Regex para campos específicos
  → Validação cruzada (valor total = soma itens?)

Limitações:
  → Extração parcial (70-90% dos campos)
  → Erros de OCR em fontes não padronizadas
  → Confiança reduzida (0.40-0.70)

Estratégia:
  → Se extração ≥ 80% dos campos: incorporar com confiança média
  → Se extração < 80%: marcar como "precisa de revisão"
  → Se possível, pedir XML ao invés de PDF
```

### 4.3 Conciliação NF × Patrimônio

```
Quando múltiplas NFs são importadas:

Para cada NF:
  → Verificar se Fornecedor já existe (por CNPJ)
    - Sim: atualizar confiança, adicionar NFs
    - Não: criar Fornecedor
  → Verificar se Produto já existe (por nome/NCM)
    - Sim: atualizar preço médio, adicionar venda
    - Não: criar Produto
  → Verificar se Cliente já existe (por CNPJ/CPF)
    - Sim: adicionar ao histórico
    - Não: criar Cliente

Ao final:
  → Calcular ticket médio real
  → Calcular fornecedores mais frequentes
  → Detectar sazonalidade
```

## 5. Importação de Extrato Bancário

### 5.1 Formatos suportados

| Formato | Confiança | Processamento |
|---------|-----------|--------------|
| OFX (Open Financial Exchange) | 0.85-0.90 | Automático, campos padronizados |
| CSV bancário | 0.60-0.80 | Detecção de colunas + mapeamento |
| PDF de extrato | 0.30-0.60 | OCR + parser de linhas |
| API bancária | 0.85-0.90 | Integração direta |

### 5.2 Categorização automática de transações

A IA categoriza cada transação do extrato:

| Padrão na descrição | Categoria | Objeto |
|---------------------|-----------|--------|
| "PIX RECEBIDO", "TRANSFERENCIA RECEBIDA" | Receita | Receita |
| "PAGAMENTO", "PIX ENVIADO" | Despesa | Despesa |
| "ALUGUEL" | Despesa Fixa | Despesa (aluguel) |
| "FOLHA", "SALARIO" | Despesa Pessoal | Despesa (salário) |
| "NFE", "NOTA FISCAL" | Despesa Operacional | Despesa (compra) |
| "ANUIDADE", "TARIFA" | Despesa Bancária | Despesa (banco) |
| "EMPRESTIMO", "FINANCIAMENTO" | Dívida | Divida |

### 5.3 Conciliação automática

```
Para cada transação no extrato:
  → Verificar se já existe NF correspondente
  → Se NF existe: conciliar (NF = receita/despesa confirmada)
  → Se NF não existe: manter como "não conciliada"

Ao final:
  → Receitas conciliadas: 85% (15% sem NF → investigar)
  → Despesas conciliadas: 70% (30% sem NF → investigar)
  → Saldo do extrato: R$ 1.200
  → Diferença com patrimônio: R$ 50 (2%) → OK
```

## 6. Integração com ERP

### 6.1 Como funciona

A integração com ERP é o modo mais rico de aquisição passiva:

```
ERP conectado (Omie, Bling, ContaAzul, etc.):
  → API REST autenticada
  → Polling periódico (a cada N horas/minutos)
  → Webhook (ERP notifica mudanças)

Dados obtidos:
  → Clientes (cadastro completo)
  → Produtos (catálogo completo)
  → Vendas (histórico completo)
  → NFs (emissão e recebimento)
  → Contas a pagar/receber
  → Estoque (quantidades)
  → Fornecedores
```

### 6.2 Mapeamento ERP → Objetos Cognitivos

| Entidade ERP | Objeto Cognitivo | Campos mapeados |
|-------------|-----------------|-----------------|
| Cliente (ERP) | Cliente | nome, documento, telefone, email, endereco |
| Produto (ERP) | Produto | nome, codigo, ncm, preco, estoque |
| Pedido Venda | Venda | cliente, data, itens, valor, status |
| NF Emitida | Venda + Receita | todos os campos fiscais |
| Conta Receber | Receita (prevista) | valor, data, cliente, status |
| Conta Pagar | Despesa (prevista) | valor, data, fornecedor, status |

### 6.3 Ciclo de sincronização

```
Primeira sincronização (batch):
  → Importar histórico completo (ex: 12 meses)
  → Criar/mesclar todos os objetos
  → Estabelecer relacionamentos
  → Duração: 1-10 minutos (depende do volume)

Sincronizações incrementais (contínuo):
  → A cada 1 hora (ou webhook)
  → Importar apenas o que mudou desde a última
  → Atualizar objetos afetados
  → Duração: 1-30 segundos
```

## 7. Importação de WhatsApp

### 7.1 O que o WhatsApp revela

O WhatsApp Business é uma fonte rica de dados não-estruturados:

```
Conversas com clientes revelam:
  → Pedidos ("quero agendar corte para hoje")
  → Reclamações ("demorou muito semana passada")
  → Preferências ("prefiro pagar no pix")
  → Frequência ("faz 2 meses que não vou")
  → Novos clientes ("sou cliente novo, como funciona?")
  → Indicações ("meu amigo Pedro indicou")
```

### 7.2 Processamento de mensagens

```
Cada mensagem de WhatsApp passa pelo pipeline:

Classificação:
  → Tipo: pedido / reclamação / dúvida / agendamento / elogio / spam

Extração de entidades:
  → Cliente: número + nome (se disponível)
  → Produto/Serviço mencionado: "corte", "barba"
  → Data/Hora: "hoje", "amanhã", "15h"
  → Valor: "quanto custa?"
  → Intenção: agendar, reclamar, perguntar

Ação:
  → Se pedido de agendamento: criar evento na agenda
  → Se reclamação: associar ao cliente, extrair problema
  → Se dúvida: IA pode responder automaticamente
  → Se indicação: criar lead
```

### 7.3 Limitações

```
❌ Dados financeiros raramente aparecem no WhatsApp
❌ Cliente pode não estar identificado (só número)
❌ Mensagens de spam ou grupos poluem a fonte
❌ Volume alto pode ser custoso de processar
```

## 8. Importação de Planilhas Google

### 8.1 Como funciona

```
Empresário compartilha planilha do Google Sheets:
  → URL da planilha
  → Permissão de leitura (viewer)
  → IA acessa via API Google Sheets

Vantagens:
  → Dado já está na nuvem (sempre atualizado)
  → Empresário não precisa exportar/upload
  → Pode ser sincronizado automaticamente

Processo:
  1. Empresário compartilha link
  2. IA detecta abas (sheets)
  3. Para cada aba: detectar colunas e tipo de dado
  4. Mapear para objetos cognitivos
  5. Sincronizar periodicamente (se autorizado)
```

### 8.2 Diferenças para CSV

| Aspecto | CSV/Excel | Google Sheets |
|---------|-----------|---------------|
| Atualização | Manual (upload) | Automática (sincronizada) |
| Histórico | Versão do arquivo | Histórico de versões Google |
| Colaboração | Individual | Múltiplos editores |
| Tamanho típico | Pequeno-médio | Pequeno-grande |

## 9. OCR e Imagens

### 9.1 Quando usar OCR

```
OCR é o último recurso — deve ser usado apenas quando:
├── Não há XML disponível (NF em papel)
├── Não há extrato digital (extrato impresso)
├── Não há arquivo editável (contrato assinado escaneado)
├── Empresário só tem foto do comprovante
└── Documento é tão antigo que não existe em formato digital
```

### 9.2 Pipeline de OCR

```
Imagem recebida
    │
    ▼
1. Pré-processamento (corrigir inclinação, contraste, ruído)
    │
    ▼
2. Detecção de texto (OCR: Tesseract, Google Vision, etc.)
    │
    ▼
3. Pós-processamento (corrigir OCR erros comuns)
    │
    ▼
4. Extração de campos (regex, NER, padrões)
    │
    ▼
5. Pipeline Universal (estágios 4-8)
```

### 9.3 Confiança do OCR

| Qualidade da imagem | Confiança do OCR | Campos extraíveis |
|-------------------|-----------------|-------------------|
| Digitalização nítida (300dpi) | 0.60-0.80 | 70-90% |
| Foto de celular com boa luz | 0.40-0.65 | 50-80% |
| Foto de celular com pouca luz | 0.20-0.45 | 30-60% |
| Documento dobrado/amassado | 0.10-0.30 | 10-40% |
| Fonte manuscrita | 0.05-0.20 | 5-20% |

## 10. Fluxo unificado de importação

### 10.1 Matriz de fontes × objetos

| Fonte \ Objeto | Cliente | Produto | Venda | Receita | Despesa | Fornec. | Agenda | Problema |
|----------------|---------|---------|-------|---------|---------|---------|--------|----------|
| CSV/Excel | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | — |
| NF XML | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | — | — |
| Extrato | — | — | — | ✅ | ✅ | — | — | — |
| ERP | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | — | — |
| WhatsApp | ✅ | ✅ | — | — | — | — | ✅ | ✅ |
| Google Sheets | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| OCR/Imagem | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | — | — |
| Conversa | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

### 10.2 Estratégia de importação combinada

```
Cenário ideal: múltiplas fontes combinadas

  ERP + Extrato + WhatsApp:
    → ERP fornece: clientes, produtos, vendas (estruturado)
    → Extrato fornece: receitas, despesas, saldo (financeiro)
    → WhatsApp fornece: problemas, reclamações, agendamentos (contexto)

  Resultado:
    → Cobertura de 80%+ dos objetos
    → Confiança 0.75+ (convergência de fontes)
    → Reconciliação automática (NF × Extrato)
    → Empresa atinge estado Cognitiva em horas, não dias
```

### 10.3 Quando sugerir importação

A IA sugere importação no momento certo, não no primeiro contato:

```
Momento ideal para sugerir importação:
├── Após a primeira conversa (já estabeleceu rapport)
├── Quando identifica uma lacuna que a importação pode preencher
├── Após entregar primeiro valor (empresário já viu que a IA é útil)
├── Quando o empresário pergunta "como você pode me ajudar?"

Nunca sugerir importação:
├── No primeiro minuto de conversa (assustador)
├── Antes de entender o negócio (não sabe o que importar)
├── Quando o empresário está claramente ocupado
├── Mais de 2 vezes na mesma conversa (insistente)
```

---

> **Fim do Fluxo da Importação Inteligente**
> Próximo: `ARQUITETURA_DA_RECONSTRUCAO_EMPRESARIAL.md` — Reconstrução guiada
