# Plataforma de Aquisição Cognitiva — Projeto Arquitetural (Fase 0)

> Documento de arquitetura. Nenhum código, classe, API, schema, migration ou engine foi criado.
> Autor: Arquiteto-Chefe da Plataforma Cognitiva
> Alinhado com: Constituição da Engenharia, Governança Permanente, Arquitetura Consolidada v1.0

---

## 1. Qual é a missão desta plataforma?

**Transformar qualquer empresa existente — independente dos sistemas que ela utiliza — em uma fonte contínua de patrimônio cognitivo para o Motor Cognitivo da Ponte Digital, sem exigir que o empresário abandone, migre ou duplique trabalho em nenhuma ferramenta que já usa.**

A Plataforma de Aquisição Cognitiva não é um integrador de dados. É a primeira barreira de percepção da Ponte Digital: ela sente o mundo real da empresa através de múltiplos canais, traduz o que encontra para uma linguagem universal que o Motor Cognitivo entende, e faz isso de forma contínua, não como um evento de importação único.

Ela existe para que a Ponte Digital possa conhecer uma empresa profundamente antes mesmo que o empresário tenha preenchido um único campo manualmente no sistema.

---

## 2. Qual problema ela resolve?

O empresário brasileiro de pequeno e médio porte já opera em múltiplos sistemas: um ERP fiscal, um CRM de vendas, planilhas de controle financeiro, WhatsApp para comunicação com clientes, extrato bancário, Google Agenda, sistemas próprios herdados. Ele não vai migrar nada disso para a Ponte Digital — e nem deveria.

O problema não é "importar dados". O problema é que **o conhecimento sobre o negócio está fragmentado em silos que não conversam entre si**, e o empresário não tem tempo nem ferramentas para extrair inteligência dessa fragmentação.

A Plataforma de Aquisição Cognitiva resolve este problema ao:
- Conectar-se a cada fonte sem exigir mudanças na fonte.
- Extrair o significado (não apenas os dados) de cada fonte.
- Unificar o conhecimento disperso em um modelo cognitivo único.
- Alimentar o Motor Cognitivo continuamente, não em lotes.

O resultado é que a Ponte Digital passa a conhecer o negócio do empresário melhor do que qualquer sistema individual que ele usa — sem que ele tenha que mudar nada na sua operação.

---

## 3. Quais princípios arquiteturais ela deve seguir?

### Princípios absolutos (nunca violar)

| Princípio | Explicação | Consequência se violado |
|-----------|-----------|------------------------|
| **Nunca depender do sistema de origem** | A plataforma não pode parar porque o ERP do cliente mudou de versão. Cada conector é isolado. | Uma falha no conector paralisa toda a aquisição |
| **Nunca depender do formato do arquivo** | CSV, XML, JSON, PDF, XLSX — o formato é um detalhe do conector, não da plataforma. | A plataforma quebra quando um fornecedor muda de formato |
| **Nunca depender da IA** | O pipeline deve funcionar sem chamar modelo de IA. IA é usada para enriquecer, não para executar o fluxo. | Dados não entram se a IA estiver indisponível |
| **Sempre alimentar o Patrimônio Cognitivo** | Toda informação que entra deve aumentar o modelo cognitivo da empresa. Nada é "só armazenado". | A plataforma vira um data lake sem propósito |
| **Sempre produzir conhecimento reutilizável** | O mesmo dado normalizado deve servir para múltiplos consumidores (Motor Cognitivo, dashboard, recomendação, observabilidade). | Cada consumidor precisa normalizar de novo |
| **Nunca exigir mudança no fluxo do empresário** | Se a integração exige que o empresário exporte manualmente, ela falhou. | Baixa adoção, dado desatualizado, abandono |
| **Sempre preservar a proveniência** | Todo artefato cognitivo sabe de qual fonte veio, quando, com qual confiança. | Decisões erradas não podem ser auditadas |
| **Nunca assumir qualidade dos dados** | Todo dado que entra é suspeito até ser validado, deduplicado e contextualizado. | Lixo entra no patrimônio cognitivo |

### Princípios de design (fortemente recomendados)

- **Conectores são plugins, não features.** Cada conector é independente, testável isoladamente, e pode ser desenvolvido por terceiros.
- **Normalização é em camadas.** Formato → Semântica → Contexto → Confiança. Cada camada resolve um problema diferente.
- **Dados parciais são melhores que dados nenhum.** Se apenas 3 de 10 campos estão disponíveis, eles entram — com marcação de lacuna.
- **Conflito não é erro.** Duas fontes dizem coisas diferentes? Armazenar ambas com provenance e deixar o Motor Cognitivo decidir.
- **Aprendizado é acumulativo.** Cada ciclo de aquisição adiciona contexto ao anterior. Nunca substituir — sempre sobrepor.

---

## 4. Quais tipos de origem devem existir?

A classificação não é por "sistema" (ERP, CRM), mas por **natureza da informação** que cada origem produz. Um mesmo sistema pode pertencer a múltiplas categorias.

### Categoria A — Transações Estruturadas

Dados operacionais com schema conhecido (tabelas, colunas, relações).

| Tipo | Exemplos de origem | Informação produzida |
|------|-------------------|---------------------|
| ERP Fiscal | Omie, Bling, ContaAzul, Tiny, SAP | Notas fiscais, clientes, produtos, estoque |
| CRM | RD Station, HubSpot, Pipedrive, Zoho | Leads, oportunidades, pipeline, histórico |
| Contabilidade | Contabilizei, Agilize, sistema próprio | Balancete, DRE, impostos |
| Folha de pagamento | VR, conveniada, sistema próprio | Funcionários, custos, benefícios |

### Categoria B — Documentos Semi-estruturados

Arquivos com formato definido mas schema variável.

| Tipo | Exemplos | Informação produzida |
|------|----------|---------------------|
| Planilhas | Excel, Google Sheets, CSV, ODS | Qualquer dado tabular que o empresário controla manualmente |
| XML Fiscal | NFe, NFCe, CTE | Documentos fiscais padronizados |
| PDF | Boletos, contratos, extratos bancários | Dados extraídos por parsing (com confiança) |
| TXT/LOG | Exportações de sistemas legados | Dados em formato proprietário |

### Categoria C — Canais de Comunicação

Fluxo de conversação e troca de informações.

| Tipo | Exemplos | Informação produzida |
|------|----------|---------------------|
| Mensageria | WhatsApp Business API, Telegram | Conversas com clientes, pedidos, reclamações |
| Email | Gmail, Outlook, Exchange | Propostas, contratos, comunicados |
| Redes Sociais | Instagram, Facebook, LinkedIn | Menções, avaliações, lead generation |
| Agenda | Google Calendar, Outlook Calendar | Compromissos, reuniões, prazos |

### Categoria D — Sistemas Financeiros

Movimentação de dinheiro e instrumentos financeiros.

| Tipo | Exemplos | Informação produzida |
|------|----------|---------------------|
| Banco | Extrato bancário (OFX, OFC, PDF) | Transações, saldos, conciliação |
| Pagamentos | Pix (webhook), Stone, PagSeguro, Mercado Pago | Recebimentos, taxas, chargebacks |
| Cartão | Cielo, Rede, GetNet | Vendas parceladas, antecipações |
| Boleto | Banco do Brasil, Bradesco, Itaú | Boletos emitidos, pagos, vencidos |

### Categoria E — Dados Públicos

Informação disponível sobre a empresa em fontes abertas.

| Tipo | Exemplos | Informação produzida |
|------|----------|---------------------|
| Governo | Receita Federal (CNPJ), SEFAZ, Prefeituras | Dados cadastrais, certidões, alvarás |
| Crédito | Serasa, Boa Vista, SPC | Score, restrições, histórico |
| Setorial | Associações, sindicatos, IBGE | Benchmarks, indicadores do setor |

### Categoria F — Sistemas Próprios

Sistemas desenvolvidos internamente pelo cliente ou sob medida.

| Tipo | Exemplos | Informação produzida |
|------|----------|---------------------|
| API Rest | Sistema próprio com API | Qualquer dado que o sistema expõe |
| Banco direto | MySQL, PostgreSQL, SQL Server da empresa | Acesso direto com permissão do cliente |
| Legado | Delphi, Access, Clipper | Dados em formatos antigos com parsing específico |

### Categoria G — Dados Manuais

Informação fornecida ativamente pelo empresário.

| Tipo | Exemplos | Informação produzida |
|------|----------|---------------------|
| Upload único | CSV avulso, backup de sistema antigo | Carga inicial |
| Entrada periódica | Relatório mensal exportado | Dados que não têm API |
| Configuração | Preferências, metas, alertas | Contexto de negócio |

---

## 5. Como deveria ser o Pipeline Universal?

### Modelo conceitual em 10 estágios

```
ORIGEM
  ↓
① DESCOBERTA
  ─ O que existe? Quais fontes estão disponíveis?
  ─ Tipos de dado, volume, frequência de atualização
  ─ Sempre executada, mesmo que já conheça a fonte (pode ter mudado)
  ↓
② CONEXÃO
  ─ Autenticação, autorização, handshake
  ─ Estabelecer canal (API call, webhook listener, file watcher, DB query)
  ─ Testar conectividade e permissões
  ↓
③ INGESTÃO
  ─ Extrair dados brutos da origem
  ─ Preservar formato original (raw storage para reprocessamento)
  ─ Marcar com timestamp de captura + proveniência
  ↓
④ NORMALIZAÇÃO ESTRUTURAL
  ─ Converter formato bruto para schema canônico
  ─ CSV → colunas nomeadas, PDF → texto extraído, API → JSON normalizado
  ─ Resolver tipos (string → número, "01/01/2024" → Date)
  ↓
⑤ NORMALIZAÇÃO SEMÂNTICA
  ─ Mapear nomes de campos para modelo universal
  ─ "Cliente" = "Customer" = "Tomador" → Person.customer
  ─ Resolver enums: "Pago", "Recebido", "Liquidado" → PaymentStatus.settled
  ↓
⑥ VALIDAÇÃO E QUALIDADE
  ─ Verificar integridade (campos obrigatórios existem?)
  ─ Verificar consistência (valores dentro do range esperado?)
  ─ Calcular confiança (0.0 a 1.0) para cada registro
  ─ Marcar lacunas (campos que deveriam existir mas não vieram)
  ↓
⑦ DEDUPLICAÇÃO E RESOLUÇÃO DE ENTIDADES
  ─ "João Silva" da planilha é o mesmo "João Silva" do ERP?
  ─ Usar múltiplas dimensões: nome, documento, telefone, email
  ─ Produzir grafo de identidade: entidade canônica + aliases
  ↓
⑧ CONTEXTUALIZAÇÃO
  ─ Enriquecer com metadados: período fiscal, hierarquia organizacional
  ─ Relacionar com outros objetos: esta venda é de qual cliente?
  ─ Temporal: este dado se refere a qual mês/ano?
  ↓
⑨ INCORPORAÇÃO AO PATRIMÔNIO COGNITIVO
  ─ Persistir no modelo cognitivo universal
  ─ Atualizar ou criar entidades no grafo de conhecimento
  ─ Disparar eventos para o Motor Cognitivo processar
  ↓
⑩ OBSERVABILIDADE
  ─ Registrar origem → destino de cada artefato
  ─ Marcar confiança, lacunas, conflitos
  ─ Permitir rastreamento reverso: "por que o Motor sabe isso?"
```

### Propriedades do pipeline

- **Assíncrono e não bloqueante.** Cada estágio pode falhar sem parar os demais.
- **Reexecutável.** Reprocessar a mesma origem não duplica patrimônio — atualiza confiança e detecta mudanças.
- **Rastreável.** Cada artefato cognitivo carrega a trilha completa: origem → conexão → ingestão → normalização → validação → patrimônio.
- **Tolerante a lacunas.** Estágios produzem saída mesmo com entradas incompletas — a confiança é rebaixada, o dado não é descartado.

---

## 6. Como deve funcionar a Normalização Universal?

Este é o coração da plataforma. Não se trata de "mapear campos" — trata-se de **traduzir a realidade de cada empresa para uma linguagem que o Motor Cognitivo entende**, independente de como cada ERP chama as coisas.

### O problema da Torre de Babel

| ERP A chama | ERP B chama | ERP C chama | Planilha chama |
|-------------|-------------|-------------|----------------|
| Cliente | Customer | Tomador | Nome |
| Venda | Pedido | Orçamento | Fatura |
| Nota Fiscal | NFe | Documento | NF |
| Pagamento | Baixa | Liquidação | Pago |

Cada ERP foi construído para um nicho diferente (indústria, comércio, serviços, agronegócio). Os nomes refletem o jargão do setor, não uma ontologia universal.

### Solução: normalização em 5 camadas

#### Camada 1 — Normalização Estrutural (octype → schema canônico)

Converter o formato físico em uma estrutura padronizada independente de origem.

```
Entrada (ERP Omie):
  { "cCodigo": "123", "cNome": "João", "nValor": 1500.00 }

Entrada (Planilha CSV):
  "ID","Nome Completo","Valor Total"
  "123","João Silva","R$ 1.500,00"

Saída canônica (ambos):
  { "id_externo": "123", "nome": "João Silva", "valor_total": 1500.00 }
```

Cada conector implementa esta camada. O restante do pipeline só vê a saída canônica.

#### Camada 2 — Normalização Semântica (campo → objeto universal)

Mapear nomes de campos para o modelo cognitivo universal.

```
Tabela de mapeamento:
  "cCodigo" | "codigo_cliente" | "id_externo" | "Código"  →  Person.externalId
  "cNome"   | "nome_cliente"   | "Razão"      | "Nome"     →  Person.name
  "nValor"  | "valor_total"    | "vlr"        | "Total"    →  Transaction.amount
```

Esta camada usa:
- **Regras explícitas** (configuradas por conector, baseadas no schema conhecido da origem).
- **Heurísticas** (se o campo tem "CPF" ou "CNPJ" no nome, mapear para Person.document).
- **Aprendizado** (se 80% dos valores de um campo seguem formato de telefone, mapear para Person.phone).

#### Camada 3 — Normalização de Valores (valor → conceito universal)

Diferentes sistemas usam diferentes valores para o mesmo conceito.

```
Status de pagamento:
  ERP A: "P", "R", "C"  (Pendente, Recebido, Cancelado)
  ERP B: "1", "2", "9"  (Aberto, Liquidado, Baixado)
  ERP C: "pending", "paid", "cancelled"
  Planilha: "Não pago", "Pago", "Cancelado"

Saída universal:
  → PaymentStatus.pending
  → PaymentStatus.settled
  → PaymentStatus.cancelled
```

**Regra:** Cada conector fornece um dicionário de mapeamento de valores. Mas a plataforma também mantém um **dicionário global aprendido**: se 3 conectores diferentes mapearam "P" → PaymentStatus.pending, novo conector com "P" recebe sugestão automática.

#### Camada 4 — Resolução de Entidades (registro → entidade canônica)

Determinar se duas referências ao mesmo objeto de fontes diferentes são o mesmo objeto real.

```
Fonte A (ERP):    "João Silva", CNPJ: 12.345.678/0001-90, email: joao@empresa.com
Fonte B (CRM):    "João S.", telefone: (11) 99999-8888, cnpj: 12345678000190
Fonte C (Pix):    "J. Silva", chave: joao@empresa.com

Resolução:
  → Person.enterprise { id: "ent_001", confidence: 0.97 }
  → Evidências: CNPJ match (exato), email match (exato), nome match (parcial, 0.6)
```

A resolução usa múltiplas dimensões ponderadas:
- Documento (CPF/CNPJ) → peso 0.5 (match = identidade)
- Email → peso 0.3 (match = alta confiança)
- Telefone → peso 0.15
- Nome → peso 0.05 (match com fuzzy)
- Endereço → peso 0.05

#### Camada 5 — Contextualização Temporal e Relacional

O mesmo campo em diferentes períodos ou contextos significa coisas diferentes.

```
Fonte A: "Valor: R$ 1.500,00" (sem data — qual mês?)
Fonte B: "Faturamento: R$ 45.000,00" (é mensal? acumulado?)

Contextualização:
  Se Fonte A é extrato bancário, "Valor" é transação individual.
  Se Fonte B é relatório contábil, "Faturamento" é receita do período.
  
  A data é inferida por:
    1. Data explícita no registro
    2. Data do arquivo/exportação
    3. Data do período configurado no conector
    4. Valor default: mês corrente (com confiança baixa)
```

### O modelo de confiança

Cada campo normalizado carrega um `confidence: number (0.0 a 1.0)`:

| Confiança | Significado | Exemplo |
|-----------|-------------|---------|
| 1.0 | Origem confiável + mapeamento exato | ERP com campo `cnpj` mapeado para `Person.document` |
| 0.8 | Origem confiável + mapeamento heurístico | Campo "CPF/CNPJ" detectado por conter "CPF" no nome |
| 0.5 | Origem não confiável + mapeamento exato | PDF extraído com OCR, campo identificado |
| 0.3 | Inferido por contexto | Data inferida do período da exportação |
| 0.1 | Preenchido com valor padrão | Campo obrigatório ausente, preenchido com "desconhecido" |

O Motor Cognitivo usa esta confiança para decidir se um dado é forte o suficiente para basear uma recomendação.

---

## 7. Quais objetos universais existem?

Estes são os **blocos fundamentais** do modelo cognitivo — o mínimo denominador comum para entender qualquer empresa. Todo dado de qualquer fonte deve ser traduzido para um destes objetos ou para um relacionamento entre eles.

### Catálogo de Objetos Universais

#### Pessoa (Person)
Cliente, lead, contato, fornecedor, funcionário, parceiro. O centro do modelo cognitivo — toda transação envolve uma pessoa.

| Propriedade universal | Exemplos de origem | Confiança |
|----------------------|-------------------|-----------|
| `externalId` | Código do cliente no ERP, ID do lead no CRM | 1.0 |
| `name` | Razão social, nome fantasia, nome completo | 1.0 |
| `document` | CPF, CNPJ, RG, IE | 1.0 (se validação passar) |
| `contact` | Email, telefone, WhatsApp, endereço | 0.8 |
| `type` | PF/PJ, cliente/fornecedor/funcionário | 0.8 |
| `segment` | Ramo, setor, categoria | 0.5 |
| `relationship` | Vínculo com a empresa (contrato, parceria) | 0.5 |

#### Transação (Transaction)
Venda, compra, pagamento, recebimento, transferência. Toda movimentação de valor.

| Propriedade universal | Exemplos de origem |
|----------------------|-------------------|
| `externalId` | Número da nota, ID do pedido, código da transação |
| `type` | Venda, compra, pagamento, recebimento, estorno |
| `amount` | Valor total, valor unitário, desconto |
| `date` | Data de emissão, vencimento, pagamento |
| `person` | Cliente, fornecedor (ID da Person) |
| `items` | Produtos, serviços (array de TransactionItem) |
| `status` | Pendente, pago, cancelado, estornado |
| `channel` | Online, presencial, WhatsApp, Pix |

#### Produto/Serviço (ProductItem)
O que é vendido, comprado, produzido ou estocado.

| Propriedade universal | Exemplos de origem |
|----------------------|-------------------|
| `externalId` | SKU, código de barras, ID do produto |
| `name` | Nome, descrição |
| `category` | Categoria fiscal, departamento, linha |
| `unit` | Un, kg, m, hora, serviço |
| `price` | Preço unitário, custo |
| `type` | Produto, serviço, insumo |

#### Documento (Document)
Nota fiscal, contrato, proposta, boleto, relatório.

| Propriedade universal |
|----------------------|
| `externalId`, `type` (NFe, contrato, proposta, boleto) |
| `person` (emitente, destinatário) |
| `date` (emissão, vencimento) |
| `amount`, `status` |
| `url` (link para o documento original) |

#### Comunicação (Communication)
Mensagem, email, ligação, reunião, interação.

| Propriedade universal |
|----------------------|
| `externalId`, `type` (mensagem, email, ligação, reunião) |
| `person` (remetente, destinatário) |
| `date`, `content` (texto, resumo) |
| `channel` (WhatsApp, email, Instagram, telefone) |
| `sentiment` (positivo, neutro, negativo — se analisado) |

#### Tarefa (Task)
Atividade, etapa, compromisso, prazo.

| Propriedade universal |
|----------------------|
| `externalId`, `title`, `description` |
| `person` (responsável, cliente relacionado) |
| `date` (criação, vencimento, conclusão) |
| `status` (pendente, concluída, cancelada) |
| `priority` (alta, média, baixa) |

#### Financeiro (FinancialStatement)
Receita, despesa, fluxo de caixa, DRE.

| Propriedade universal |
|----------------------|
| `period` (mês/ano de referência) |
| `type` (receita, despesa, investimento) |
| `category` (categoria contábil ou gerencial) |
| `amount`, `person` (fornecedor/cliente) |
| `method` (dinheiro, cartão, boleto, Pix) |

#### Estoque (Inventory)
Produto em estoque, saldo, movimentação.

| Propriedade universal |
|----------------------|
| `product` (ID do ProductItem) |
| `quantity`, `unit` |
| `location` (depósito, filial) |
| `date` (última movimentação) |
| `status` (disponível, reservado, danificado) |

#### Evento (Event)
Compromisso, reunião, prazo, feriado.

| Propriedade universal |
|----------------------|
| `title`, `description` |
| `dateStart`, `dateEnd` |
| `person` (participantes) |
| `type` (reunião, prazo, feriado, lembrança) |
| `source` (Google Calendar, Outlook, sistema) |

### Relacionamentos universais

Objetos não existem isolados. O grafo cognitivo é construído sobre relacionamentos:

| Relacionamento | Origem | Destino | Exemplo |
|---------------|--------|---------|---------|
| `participates` | Transaction | Person | Cliente comprou |
| `contains` | Transaction | ProductItem | Venda contém produtos |
| `communicates` | Communication | Person | Mensagem para cliente |
| `generates` | Transaction | Document | Venda gera nota fiscal |
| `schedules` | Event | Person | Reunião com fornecedor |
| `employs` | Person | Person | Empresa contrata funcionário |
| `supplies` | Person | Transaction | Fornecedor na compra |

---

## 8. Como evitar acoplamento?

### Arquitetura de conectores

O princípio fundamental: **a plataforma não conhece as fontes. Os conectores conhecem as fontes. A plataforma conhece apenas a interface do conector.**

```
                    ┌──────────────────────────────────┐
                    │      PLATAFORMA (pipeline)        │
                    │  Normalização → Validação →       │
                    │  Deduplicação → Contexto →        │
                    │  Patrimônio Cognitivo              │
                    └──────────────┬───────────────────┘
                                   │
                    Interface do Conector
                                   │
         ┌────────────┬────────────┼────────────┬────────────┐
         │            │            │            │            │
    ConnectorERP  ConnectorCRM  ConnectorCSV  ConnectorBank ConnectorEmail
         │            │            │            │            │
      ERP Omie     RD Station   Planilhas     Banco Itaú   Gmail
```

### Contrato do Conector

Cada conector implementa esta interface conceitual:

```
Conector {
  // Identificação
  id: string           // "omie", "rdstation", "csv_generico"
  nome: string          // "ERP Omie", "RD Station CRM"
  categoria: string     // "transacoes_estruturadas", "documentos"
  
  // Descoberta: o que esta fonte pode fornecer?
  descobrir(): Promise<CatalogoFontes>
  // Retorna: [ { tipo: "cliente", estimativaRegistros: 1500, ultimaAtualizacao: Date }, ... ]
  
  // Conexão: autenticar e testar
  conectar(credenciais: Credenciais): Promise<EstadoConexao>
  testar(): Promise<boolean>
  
  // Ingestão: extrair dados
  ingerir(tipo: string, opcoes?: OpcoesIngestao): AsyncIterable<RegistroBruto>
  // Cada registro bruto preserva o formato original + metadados da fonte
  
  // Metadados
  metadados(): { versao: string, ultimaSincronizacao: Date, creditosRestantes?: number }
}
```

### Garantias de desacoplamento

1. **O pipeline nunca chama o conector diretamente.** Um dispatcher genérico recebe um `Conector` e executa o ciclo. O pipeline só conhece `RegistroBruto` e `RegistroNormalizado`.

2. **Novos conectores não exigem mudanças no pipeline.** Adicionar um novo conector = implementar a interface. O pipeline não precisa ser alterado, recompilado ou reimplantado.

3. **Falha de conector não afeta outros conectores.** Se o conector do ERP Omie falha, o pipeline continua processando os demais conectores normalmente.

4. **Cada conector é independente de versão.** Um conector para ERP Omie v1 e outro para v2 coexistem. A descoberta seleciona o correto.

5. **Conectores podem ser desenvolvidos por terceiros.** A interface pública é o único contrato. Desde que implementem o contrato, qualquer pessoa pode criar um conector.

---

## 9. Como preservar o Patrimônio Cognitivo?

O Patrimônio Cognitivo é o ativo mais valioso da Ponte Digital. A plataforma de aquisição é a porta de entrada — tudo que passa por ela deve fortalecer este patrimônio, nunca enfraquecê-lo.

### O que pode entrar

| Critério | Exemplo |
|----------|---------|
| Dado com proveniência clara | "Cliente João Silva, vindo do ERP Omie, extraído em 15/07/2026 14:30" |
| Dado com contexto temporal | "Faturamento de R$ 45.000 relativo a junho/2026" |
| Dado relacionável a outros objetos | "Esta venda é do cliente X, contém os produtos Y e Z" |
| Dado com confiança ≥ 0.3 | Abaixo disso, entra como "suspeito" e não alimenta decisões automáticas |
| Dado que aumenta o grafo de conhecimento | Novo cliente, novo relacionamento, nova transação |
| Dado que atualiza confiança de dado existente | Mesma informação de segunda fonte confirma a primeira |

### O que nunca deve entrar

| Bloqueio | Motivo |
|----------|--------|
| Dado sem identificação de origem | Não pode ser auditado, verificado ou corrigido |
| Dado pessoal sensível sem consentimento | LGPD, risco legal |
| Dado que não se relaciona a nenhum objeto universal | Não é possível extrair cognição |
| Dado puramente estético | Cor da logo, preferência de tema |
| Dado de período anterior não contextualizado | "R$ 5.000" sem mês/ano não tem significado |
| Dado duplicado sem resolução de entidade | Polui o grafo com identidades falsas |

### O que deve ser descartado

| Critério | O que fazer |
|----------|-------------|
| Duplicata exata (mesma fonte, mesmo ID, mesmo valor) | Ignorar (já processado) |
| Conflito resolvido (Motor escolheu uma versão) | Manter a vencedora + provenance da perdedora como "histórico" |
| Dado com confiança < 0.1 após 3 ciclos | Arquivar (não alimenta cognição, mas disponível para auditoria) |
| Dado fora do perímetro cognitivo | Ex: dado de filial que a empresa não quer monitorar — configurado pelo empresário |

### O ciclo de vida do dado na plataforma

```
RAW (bruto, preservado)
  → NORMALIZED (schema canônico, campo mapeado)
  → RESOLVED (entidade única, deduplicado)
  → CONTEXTUALIZED (com período, relação, confiança)
  → COGNITIVE (no Patrimônio Cognitivo, alimentando o Motor)
  → AGED (dado antigo, confiança reduzida pelo tempo)
  → ARCHIVED (dado histórico, não alimenta decisões ativas)
```

---

## 10. Como garantir qualidade dos dados?

### Problema: Dados incompletos

**Estratégia:** Entrada parcial com marcação de lacuna. Nunca bloquear por campo faltante.

```
Registro recebido:
  { nome: "João Silva", email: null, telefone: null, cnpj: "12.345.678/0001-90" }

Após validação:
  { 
    name: "João Silva" (confidence: 1.0),
    email: GAP (confidence: 0.0, motivo: "campo não fornecido pela origem"),
    phone: GAP,
    document: "12.345.678/0001-90" (confidence: 1.0),
    _lacunas: ["email", "telefone"],
    _completude: 0.5  // 2 de 4 campos preenchidos
  }
```

O Motor Cognitivo usa `_completude` e `_lacunas` para decidir se a informação é suficiente para uma recomendação.

### Problema: Dados duplicados

**Estratégia:** Resolução de entidade probabilística, não determinística. Dois registros são considerados a mesma entidade quando a confiança combinada ultrapassa o limiar (≥ 0.85).

```
Registro A (ERP):  "João Silva", "12.345.678/0001-90", "(11) 99999-8888"
Registro B (CRM):  "João S.",   "12.345.678/0001-90", null

Score de match:
  CNPJ: igual → +0.5
  Nome: fuzzy 0.85 → +0.2 (após peso 0.05 * 0.85 = 0.0425)
  Telefone: A tem, B não → neutro
  
  Total: 0.5 + 0.0425 = 0.5425 (abaixo do limiar — suspeito, não resolvido)
  
  Se +1 evidência (email igual): 0.5425 + 0.3 = 0.8425 → ainda suspeito
  Se +2 evidências (email + endereço): → 0.95 → RESOLVIDO
```

### Problema: Dados conflitantes

**Estratégia:** Armazenar ambas as versões com proveniência. O Motor Cognitivo decide qual usar baseado no contexto.

```
Fonte A (ERP):  "Cliente João Silva", status: "ATIVO", desde 2023
Fonte B (CRM):  "Cliente João Silva", status: "INADIMPLENTE", desde 2024

Patrimônio Cognitivo:
  Person.joao_silva {
    status_history: [
      { valor: "ATIVO", fonte: "ERP Omie", data: "2023-06-01", confianca: 0.9 },
      { valor: "INADIMPLENTE", fonte: "RD Station", data: "2024-03-15", confianca: 0.7 }
    ],
    status_atual: "INADIMPLENTE"  // Motor decidiu com base na recência + relevância
  }
```

### Problema: Dados sem contexto

**Estratégia:** Inferir contexto de múltiplas fontes ou do padrão de uso.

```
Entrada: "R$ 5.000,00" (sem data, sem descrição)

Inferência:
  - Se veio de arquivo chamado "faturamento-junho-2026.xlsx" → período = junho/2026
  - Se veio de extrato bancário com data da transação = 15/06/2026 → data = 15/06/2026
  - Se veio de exportação mensal do ERP → período = mês anterior ao da exportação
  - Se nada disso → período = "desconhecido", confiança = 0.1, lacuna marcada

Regra: O contexto nunca é inventado. Ele é inferido com confiança proporcional às evidências.
```

### Problema: Dados desatualizados

**Estratégia:** Todo dado tem um `freshness` que decai com o tempo. Se não for atualizado dentro de N ciclos (configurável por tipo de dado), sua confiança é reduzida.

```
Tabela de decaimento:
  Transaction.amount:    freshness = 30 dias (transações são pontuais)
  Person.name:           freshness = 365 dias (nome não muda)
  Person.phone:          freshness = 180 dias (telefone pode mudar)
  Person.address:        freshness = 365 dias
  Product.price:         freshness = 90 dias (preço muda com frequência)
  
  Após o período sem atualização: confidence -= 0.1 por mês
  Mínimo: 0.2 (dado existe mas não é confiável para decisões)
```

---

## 11. Como esta plataforma aprende?

Não se trata de IA. Trata-se de **conhecimento acumulativo**: a plataforma melhora com cada ciclo de aquisição, independente de modelos de linguagem.

### Mecanismos de aprendizado

#### 1. Aprendizado de mapeamento semântico

A cada novo conector, a plataforma aprende a reconhecer padrões de nomenclatura.

```
Ciclo 1: Conector ERP Omie → mapeamento manual de "cCodigo" → Person.externalId
Ciclo 2: Conector ERP Bling → encontra campo "codigo_cliente" → 85% similar ao padrão anterior
         → Sugestão automática: mapear "codigo_cliente" → Person.externalId
Ciclo 3: Conector Planilha → encontra campo "Código" → reconhece padrão
         → Mapeamento automático com confiança 0.8
```

Após 10 conectores, a plataforma consegue sugerir mapeamento para um novo conector com >90% de acerto nos campos comuns.

#### 2. Aprendizado de resolução de entidades

A cada resolução confirmada (explicita ou implicitamente pelo usuário), o grafo de identidade se fortalece.

```
Ciclo 1: ERP e CRM → resolvidos manualmente como mesma entidade
         → Grafo: CNPJ match → Person.joao_silva
Ciclo 2: Pix → transação com chave = email do João
         → Email match com Person.joao_silva.email
         → Nova aresta no grafo: Person.joao_silva.email → transação Pix
Ciclo 3: WhatsApp Business → mensagem com telefone do João
         → Telefone match com Person.joao_silva.phone
         → Grafo completo: CNPJ + Email + Telefone → Person.joao_silva
```

#### 3. Aprendizado de qualidade

A plataforma aprende quais fontes são confiáveis para quais tipos de dado.

```
Após 6 meses de operação:
  ERP Omie → confiança 0.95 para dados cadastrais, 0.90 para transações
  Planilha → confiança 0.60 para dados cadastrais (desatualiza rápido)
  PDF extrato bancário → confiança 0.85 para transações financeiras
  WhatsApp → confiança 0.40 para dados estruturados (não é fonte primária)
```

#### 4. Aprendizado de padrões temporais

A plataforma reconhece ciclos de negócio e ajusta expectativas.

```
Percebe que:
  - Clientes do segmento "Varejo" têm mais transações em novembro/dezembro
  - Clientes do segmento "Serviços" têm receita constante ao longo do ano
  - Inadimplência aumenta em janeiro (pós-férias)
  
Isto não é IA preditiva — é observação estatística acumulada que alimenta o Motor Cognitivo.
```

#### 5. Aprendizado de contexto

A plataforma infere regras de negócio observando padrões.

```
Observa que:
  - Toda vez que uma transação tem valor > R$ 10.000, o ERP gera um documento fiscal
  - Toda vez que um cliente fica 90 dias sem comprar, o CRM muda status para "INATIVO"
  - Toda vez que o estoque de um produto chega a 0, uma tarefa é criada no sistema

Isto não é programado. É inferido pela correlação de eventos no tempo.
```

### O que a plataforma NÃO faz

- Não usa IA generativa para preencher lacunas (isso é função do Motor Cognitivo).
- Não inventa dados que não existem.
- Não substitui a decisão humana sobre a qualidade dos dados.
- Não aprende sozinha sem supervisão inicial (todo novo conector precisa de configuração inicial).

---

## 12. Como ela conversa com o Motor Cognitivo?

### Fronteira de responsabilidades

```
PLATAFORMA DE AQUISIÇÃO COGNITIVA
├── Descobre fontes de dados
├── Conecta e autentica
├── Ingere dados brutos
├── Normaliza (estrutural + semântica)
├── Valida e calcula confiança
├── Deduplica e resolve entidades
├── Contextualiza (tempo, relação)
├── Persiste no modelo universal
│
│   ENTREGA: Objeto Cognitivo Universal
│   { tipo, entidade, atributos, confianca, proveniencia, lacunas }
│
▼
MOTOR COGNITIVO
├── Recebe objetos cognitivos universais
├── Atualiza o grafo de conhecimento
├── Detecta padrões e anomalias
├── Gera evidências e hipóteses
├── Toma decisões
├── Recomenda ações
├── Acumula aprendizado
│
│   RETORNA: Decisão, Recomendação, Aprendizado
│
▼
DECISION ENGINE
├── Consolida múltiplas saídas do Motor
├── Verifica consistência com o patrimônio existente
├── Produz ação executável ou recomendação para o empresário
```

### Contrato entre Plataforma e Motor

**A Plataforma NUNCA:**
- Toma decisões sobre os dados (exceto qualidade técnica: "isto é duplicado").
- Interpreta o significado do negócio ("este cliente está em risco").
- Gera recomendações.
- Decide o que é relevante ou irrelevante para o empresário.

**O Motor Cognitivo NUNCA:**
- Acessa fontes de dados diretamente.
- Sabe se o dado veio de ERP, CRM ou planilha.
- Gerencia conexões ou autenticação.
- Normaliza formatos.

**A Plataforma SEMPRE:**
- Entrega objetos com confiança, proveniência e lacunas explícitas.
- Permite que o Motor rastreie a origem de qualquer artefato cognitivo.
- Respeita o ciclo de vida do dado (raw → normalized → archived).

**O Motor Cognitivo SEMPRE:**
- Usa a confiança para ponderar decisões.
- Pode solicitar reaquisição de dado específico (via evento "confidence_too_low").
- Registra no patrimônio qual decisão foi baseada em qual dado.

---

## 13. Quais riscos arquiteturais existem?

### Risco 1 — Dependência do ciclo de vida do conector

**Problema:** Cada fonte (ERP, CRM, banco) pode mudar sua API sem aviso, quebrar o conector, e interromper a aquisição para aquele cliente.

**Mitigação:** Conectores com versionamento independente. Testes de conectividade periódicos. Ao detectar falha, o conector entra em modo "retry com backoff" e notifica o administrador. O pipeline continua operando para os demais conectores.

### Risco 2 — Explosão de conectores

**Problema:** Se cada ERP brasileiro (são centenas) exigir um conector específico, a manutenção se torna inviável.

**Mitigação:** Conectores genéricos por categoria (ERP fiscal, CRM, banco) que se configuram, não se programam. O conector "ERP Fiscal Genérico" usa um arquivo de mapeamento YAML, não código. Conectores específicos são exceção, não regra.

### Risco 3 — Resolução de entidade com falsos positivos

**Problema:** Dois clientes diferentes com nomes e documentos parecidos são resolvidos como a mesma pessoa. Decisões do Motor baseadas nisso afetam o cliente errado.

**Mitigação:** Limiar de confiança conservador (0.85). Abaixo disso, manter como "suspeito" e nunca basear decisões. Permitir que o empresário desfaça uma resolução manualmente.

### Risco 4 — Acumulação de lixo cognitivo

**Problema:** Dados de baixa qualidade, duplicados ou conflitantes se acumulam no patrimônio e poluem o grafo de conhecimento.

**Mitigação:** O ciclo de vida (raw → normalized → resolved → contextualized → cognitive → aged → archived) garante que dados de baixa confiança não alimentem decisões. A arquivagem automática remove dados obsoletos.

### Risco 5 — Dependência de IA para funcionamento básico

**Problema:** Se o pipeline depender de modelos de IA (ex: extrair dados de PDF), e a IA estiver indisponível, a aquisição para.

**Mitigação:** IA é apenas uma camada de enriquecimento. O pipeline funciona sem ela — dados de PDF entram com confiança baixa (texto bruto) e são enriquecidos quando a IA retorna.

### Risco 6 — Custo de armazenamento

**Problema:** Preservar dados brutos + normalizados + resolvidos + contextualizados para cada cliente gera múltiplas cópias dos mesmos dados.

**Mitigação:** Dados brutos são armazenados de forma eficiente (compressão, objetos no S3). Apenas o patrimônio cognitivo (versão resolved + contextualized) vive no banco principal. Dados brutos são referenciados por URL, não duplicados.

### Risco 7 — Complexidade de configuração

**Problema:** Cada nova fonte exige configuração manual (credenciais, mapeamento de campos, período). O custo de onboarding pode inviabilizar a plataforma.

**Mitigação:** Durante a Fase 0/1, configuração assistida (engenharia configura). A partir da Fase 2, auto-descoberta: o conector tenta mapear campos baseado em heurísticas e dicionários aprendidos. O empresário apenas confirma.

### Risco 8 — LGPD e conformidade

**Problema:** Dados pessoais de clientes dos empresários podem estar nas fontes. A plataforma precisa garantir conformidade com LGPD sem depender de cada fonte.

**Mitigação:** A plataforma opera exclusivamente com dados que o empresário já possui e controla. A provenance tracking permite, a qualquer momento, saber exatamente quais dados de quais pessoas estão no patrimônio. Mecanismo de "esquecimento" por solicitação.

### Risco 9 — Concorrência e consistência

**Problema:** Duas fontes atualizam o mesmo objeto simultaneamente. Qual versão prevalece?

**Mitigação:** A plataforma armazena ambas (conceito de "conflito"). A resolução é feita pelo Motor Cognitivo, não pela plataforma. A plataforma apenas registra que existe um conflito.

### Risco 10 — Amplitude vs profundidade

**Problema:** A plataforma tenta se conectar a muitas fontes e faz cada uma superficialmente. O patrimônio cognitivo fica raso.

**Mitigação:** Conectores são priorizados por valor cognitivo. Um conector de ERP (milhares de transações) vale mais que um conector de Instagram (posts públicos). A plataforma deve ser profunda nas fontes de alto valor antes de ser ampla.

---

## 14. Quais vantagens competitivas essa plataforma cria?

### Vantagem 1 — Conhecimento multi-fonte não replicável

Concorrentes que dependem de uma única fonte (ex: "conecte seu ERP e pronto") produzem conhecimento unilateral. A Ponte Digital, ao integrar ERP + CRM + banco + WhatsApp + planilhas, constrói um **grafo de conhecimento multi-fonte** que nenhuma ferramenta individual possui. Cada fonte confirma ou contradiz as outras — e o conhecimento resultante é mais rico e mais confiável do que qualquer fonte isolada.

### Vantagem 2 — Custo de mudança zero para o empresário

O empresário não precisa migrar nada. Ele continua usando exatamente os mesmos sistemas de sempre. A Ponte Digital se adapta a ele, não o contrário. Conc correntes que exigem migração (insira seus dados aqui, abandone seu ERP) têm barreira de adoção muito maior.

### Vantagem 3 — Conhecimento acumulativo ao longo do tempo

Quanto mais tempo um cliente usa a Ponte Digital, mais profundo é o conhecimento sobre o negócio dele. Um cliente com 3 anos de histórico tem um patrimônio cognitivo que não pode ser replicado por nenhum concorrente — eles teriam que começar do zero. Isto é um moat defensivo real.

### Vantagem 4 — Interpretação cross-source que nenhuma ferramenta individual tem

O ERP sabe o valor da venda. O CRM sabe a origem do lead. O WhatsApp sabe a reclamação do cliente. O banco sabe se o pagamento entrou. Sozinhas, cada ferramenta tem uma peça do quebra-cabeça. Juntas, produzem um **entendimento holístico do negócio** que nenhuma ferramenta individual consegue.

### Vantagem 5 — Pipeline de aquisição como barreira de entrada técnica

Construir a Plataforma de Aquisição Cognitiva é um investimento técnico significativo: conectores, normalização multi-camada, resolução de entidades, modelo de confiança, ciclo de vida do dado. Concorrentes que tentarem replicar precisarão de meses (ou anos) de desenvolvimento para alcançar a mesma profundidade.

### Vantagem 6 — Adaptabilidade a qualquer setor

Como o modelo universal não depende de schema de ERP específico, a mesma plataforma funciona para comércio, serviços, indústria, agronegócio, construção civil, etc. Basta conectar as fontes — o modelo cognitivo se adapta automaticamente aos objetos e relacionamentos que encontrar.

---

## 15. Como essa plataforma pode evoluir durante dez anos?

### Fase 0 — Projeto e Prova de Conceito (atual)

**Duração:** 3 meses
**O que entrega:** Projeto arquitetural completo (este documento). Prova de conceito com 1 conector (CSV/Excel) e pipeline mínimo.
**Capacidades:** Upload manual de planilha → normalização básica → patrimônio cognitivo.
**Riscos:** Validar que o pipeline funciona com dados reais. Validar que a normalização semântica produz objetos úteis para o Motor Cognitivo.

### Fase 1 — Conectores Estratégicos

**Duração:** 6 meses
**O que entrega:**
- Conector ERP fiscal (Omie ou Bling — o mais usado pelo público-alvo).
- Conector de planilhas (CSV, XLSX, Google Sheets).
- Conector bancário (extrato OFX).
- Pipeline completo (10 estágios) funcionando para estes 3 conectores.
- Resolução de entidades entre ERP e planilha.
- Primeira versão do modelo de confiança.

**Capacidades:** Empresário conecta o ERP e faz upload de planilha → plataforma unifica e alimenta o Motor Cognitivo.
**Métrica de sucesso:** 50 empresas com ERP conectado e patrimônio cognitivo sendo alimentado semanalmente.

### Fase 2 — Auto-Descoberta e Catálogo de Conectores

**Duração:** 12 meses
**O que entrega:**
- Mecanismo de auto-descoberta: a plataforma sugere conectores baseado no perfil da empresa.
- Catálogo público de conectores (5-10 conectores disponíveis).
- Conector genérico de API REST (empresário configura o mapeamento via UI).
- Conector de WhatsApp Business API.
- Conector de email (Gmail/Outlook).
- Melhoria da normalização semântica com aprendizado (heurísticas + dicionário global).

**Capacidades:** Empresário conecta múltiplas fontes. A plataforma descobre automaticamente o que cada fonte oferece.
**Métrica de sucesso:** 200 empresas com 3+ fontes conectadas cada. Precisão de resolução de entidades > 85%.

### Fase 3 — Tempo Real e Observabilidade

**Duração:** 12 meses
**O que entrega:**
- Pipeline de eventos em tempo real (webhooks, streaming).
- Conector Pix (webhook de pagamento).
- Conector de agenda (Google Calendar, Outlook).
- Dashboard de observabilidade da aquisição (qualidade, cobertura, lacunas por fonte).
- Sistema de alertas: "ERP Omie não atualiza há 7 dias", "Conflito detectado entre 2 fontes".

**Capacidades:** A plataforma reage a eventos em minutos, não em dias. O empresário vê o estado da aquisição.
**Métrica de sucesso:** Latência média < 5 minutos para dados de fontes com webhook.

### Fase 4 — Mercado de Conectores

**Duração:** 12 meses
**O que entrega:**
- SDK público para desenvolvimento de conectores por terceiros.
- Marketplace de conectores (curadoria, certificação, versionamento).
- Conectores comunitários (desenvolvidos por parceiros e clientes).
- Sistema de reputação de conectores (confiança baseada em uso).

**Capacidades:** Qualquer desenvolvedor pode criar um conector e disponibilizá-lo no marketplace.
**Métrica de sucesso:** 50+ conectores disponíveis, 10+ de terceiros. 70% das fontes suportadas por conectores do marketplace.

### Fase 5 — Aquisição Preditiva

**Duração:** 18 meses
**O que entrega:**
- A plataforma antecipa quais dados serão necessários antes do empresário pedir.
- Baseado no padrão de uso do Motor Cognitivo, a plataforma sugere novas fontes.
- "Detectamos que você está gerenciando clientes manualmente. Quer conectar seu CRM?"
- Conector autoconfigurável: empresário informa a URL do sistema, a plataforma descobre a API e configura o mapeamento.

**Capacidades:** A plataforma não espera o empresário agir — ela propõe conexões.
**Métrica de sucesso:** 40% dos novos conectores são iniciados por sugestão da plataforma (não por ação manual do empresário).

### Fase 6 — Gêmeo Digital Cognitivo

**Duração:** 24 meses
**O que entrega:**
- A plataforma mantém um gêmeo digital de cada empresa: uma representação viva e contínua do negócio.
- O gêmeo digital inclui não apenas dados, mas relacionamentos, padrões, confianças e históricos.
- A plataforma detecta mudanças no mundo real e reflete no gêmeo em tempo real.
- O Motor Cognitivo opera sobre o gêmeo digital, não sobre dados isolados.
- O empresário pode "simular" decisões no gêmeo antes de executá-las no mundo real.

**Capacidades:** A Ponte Digital conhece a empresa tão profundamente que pode simular o impacto de decisões antes delas acontecerem.
**Métrica de sucesso:** Precisão das simulações > 80% (comparada com resultados reais).

---

## Arquitetura Recomendada para Romper a Primeira Barreira da Ponte Digital

### Síntese da decisão arquitetural

A primeira barreira não é técnica — é de **percepção e adoção**. A Ponte Digital precisa conhecer a empresa antes de poder ajudá-la. Sem a Plataforma de Aquisição Cognitiva, o conhecimento da Ponte Digital se limita ao que o empresário digitar manualmente no sistema — o que é lento, incompleto e abandonado após a fase inicial de onboarding.

### O que deve ser construído primeiro (Fase 0 → Fase 1)

**Prioridade 1 — Conector de Planilhas (CSV/Excel)**
É a fonte mais universal: toda empresa tem pelo menos uma planilha com clientes, vendas ou finanças. Não exige API, não exige integração, não exige permissão do fornecedor. O empresário faz upload do arquivo e a plataforma extrai, normaliza e incorpora ao patrimônio.

**Prioridade 2 — Conector de ERP Fiscal (Omie ou Bling)**
É a fonte com maior densidade cognitiva: clientes, produtos, transações, notas fiscais, status de pagamento. Um conector de ERP substitui meses de digitação manual. O ERP é o "sistema da verdade" para a maioria das empresas brasileiras.

**Prioridade 3 — Pipeline de 5 estágios (não 10)**
Para a Fase 1, simplificar o pipeline para: `Ingestão → Normalização Estrutural → Normalização Semântica → Validação → Patrimônio Cognitivo`. As camadas de deduplicação, contextualização e resolução de entidades são adicionadas na Fase 2. O importante é que o dado entre e alimente o Motor Cognitivo — a qualidade melhora com o tempo.

### Alinhamento com a arquitetura existente

| Princípio da Constituição | Como a Plataforma de Aquisição respeita |
|--------------------------|----------------------------------------|
| Lei 1 — Service não importa Engine | A plataforma entrega objetos cognitivos. Não chama engines. |
| Lei 2 — Engine não acessa Prisma | O Motor Cognitivo recebe dados da plataforma, não acessa fontes. |
| Lei 3 — API não implementa regra | As APIs da plataforma (conectores) só extraem e normalizam. Regras são do Motor. |
| Lei 6 — Nunca duplicar inteligência | Cada objeto universal existe em um lugar. Conectores não duplicam lógica. |
| Lei 10 — Toda engine persiste saída | A plataforma persiste no Patrimônio Cognitivo. O Motor consome de lá. |
| Seção 4 — Princípios Cognitivos | A plataforma alimenta o Patrimônio Cognitivo. Motor, Pipeline e Decision Engine consomem. |

### O que NÃO deve ser construído agora

- **Resolução de entidades multi-fonte** (Fase 2) — requer 2+ fontes conectadas para fazer sentido.
- **Auto-descoberta** (Fase 2) — requer conectores maduros primeiro.
- **Marketplace de conectores** (Fase 4) — requer base de usuários e conectores.
- **Gêmeo digital** (Fase 6) — requer anos de dados acumulados.

### Critério de sucesso da primeira barreira

A primeira barreira está rompida quando:

1. Um empresário consegue fazer upload de uma planilha de clientes e o Motor Cognitivo começa a produzir contexto sobre aqueles clientes **sem que o empresário tenha digitado um único campo manualmente**.
2. Um empresário conecta seu ERP e a plataforma extrai automaticamente clientes, produtos e transações dos últimos 12 meses.
3. O Patrimônio Cognitivo da empresa tem mais entidades vindas da aquisição automática do que da digitação manual.
