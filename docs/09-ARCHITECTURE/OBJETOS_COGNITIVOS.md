# Objetos Cognitivos — Catálogo Completo

> **Programa 12 — Fase 1** | Patrimônio Intelectual da Ponte Digital
> Derivado de: MODELO_COGNITIVO_UNIVERSAL.md
> Nenhum código, classe, API, schema, migration ou engine foi criado.

---

## Índice

1. [O que é um objeto cognitivo](#1-o-que-é-um-objeto-cognitivo)
2. [Atributos universais](#2-atributos-universais)
3. [Categoria Fundacional (8 objetos)](#3-categoria-fundacional)
4. [Categoria Comercial (12 objetos)](#4-categoria-comercial)
5. [Categoria Operacional (10 objetos)](#5-categoria-operacional)
6. [Categoria Financeira (8 objetos)](#6-categoria-financeira)
7. [Categoria Pessoas (6 objetos)](#7-categoria-pessoas)
8. [Categoria Decisória (6 objetos)](#8-categoria-decisória)
9. [Categoria Cognitiva (8 objetos)](#9-categoria-cognitiva)
10. [Índice completo por segmento](#10-índice-completo-por-segmento)

---

## 1. O que é um objeto cognitivo

Um **objeto cognitivo** é a unidade mínima de significado no modelo de compreensão empresarial. Cada objeto representa um conceito real do mundo dos negócios, com:

- **Atributos** — características que o descrevem
- **Estados** — condições mutáveis ao longo do tempo
- **Propósito** — o que ele significa para a empresa
- **Proveniência** — como foi descoberto

Objetos cognitivos **não são tabelas**. São conceitos. A implementação técnica futura pode armazená-los como grafos, documentos, linhas em banco ou qualquer outra forma — o modelo não se preocupa com isso.

### 1.1 O que NÃO é um objeto cognitivo

| Não é | Por quê |
|-------|---------|
| Uma tabela de banco | Tabela é implementação, o conceito antecede |
| Um registro de API | API é interface, o conceito é o significado |
| Um componente de UI | UI é apresentação, o conceito é o conteúdo |
| Uma classe de código | Classe é código, o conceito é conhecimento |

## 2. Atributos universais

**Todo** objeto cognitivo, independentemente de sua categoria, possui estes atributos:

| Atributo | Tipo | Descrição | Exemplo |
|----------|------|-----------|---------|
| `id` | Identificador | ID único no modelo cognitivo | `obj_cliente_001` |
| `nome` | Texto | Nome ou rótulo principal | "João Silva" |
| `tipo` | Categoria | A categoria do catálogo | "Cliente" |
| `estado` | Estado | Condição atual do objeto | "Ativo" |
| `confianca` | Score 0.0-1.0 | Quanto confiamos nesta informação | 0.85 |
| `fonte` | Texto | De onde veio a informação | "Conversa 15/07" |
| `criadoEm` | Timestamp | Quando foi registrado | 15/07/2026 09:30 |
| `atualizadoEm` | Timestamp | Última atualização | 18/07/2026 14:22 |
| `versao` | Inteiro | Quantas vezes foi revisado | 3 |
| `lacunas` | Lista | Atributos que ainda não conhecemos | ["email", "telefone"] |
| `proveniencia` | Cadeia | Quem/quando informou cada atributo | "João em 15/07: nome; NF 4523 em 16/07: cpf" |

## 3. Categoria Fundacional (8 objetos)

Objetos que existem em **toda** empresa, independentemente de qualquer outra característica. São os fundamentos ontológicos.

### 3.1 Empresa

| Aspecto | Descrição |
|---------|-----------|
| **Propósito** | Representar a unidade cognitiva central. Tudo no modelo orbita em torno da empresa |
| **Atributos específicos** | segmento, nicho, porte, localizacao, fundacao, proposito, cultura, faturamentoEstimado |
| **Estados possíveis** | Identificada, Superficial, Estrutural, Operacional, Financeira, Comercial, Diagnosticada, Cognitiva, Validada |
| **Exemplo** | `Empresa{nome:"Barbearia do João", segmento:"Barbearia", porte:"MEI", estado:"Operacional"}` |
| **Como descobre** | CNPJ, conversa inicial, dados públicos |
| **Confiança típica** | 0.50 (início) → 0.90 (validada) |
| **Lacunas comuns** | Faturamento real, margem real, custos ocultos |

### 3.2 Pessoa

| Aspecto | Descrição |
|---------|-----------|
| **Propósito** | Representar qualquer ser humano relevante para a empresa (interna ou externamente) |
| **Atributos específicos** | nome, documento, contato, papel (socio/equipe/cliente/fornecedor), habilidades, historico |
| **Estados possíveis** | Identificada, Conhecida (atributos preenchidos), Validada, Desatualizada |
| **Exemplo** | `Pessoa{nome:"João", papel:"Socio+Barbeiro", habilidades:["corte","barba","tesoura"], estado:"Conhecida"}` |
| **Como descobre** | Conversa, documentos, integração, mensagens |
| **Confiança típica** | 0.60 (indicado) → 0.90 (documento oficial) |

### 3.3 Documento

| Aspecto | Descrição |
|---------|-----------|
| **Propósito** | Qualquer registro físico ou digital que contenha informação sobre a empresa |
| **Atributos específicos** | tipo (NF/contrato/planilha/PDF), conteudoExtraido, dataEmissao, dataValidade, confiancaExtracao |
| **Estados possíveis** | Recebido, Processado, Extraido, Validado, Rejeitado |
| **Exemplo** | `Documento{tipo:"NF", numero:"4523", dataEmissao:"15/07/2026", valor:"R$ 47", emitente:"João"}` |
| **Como descobre** | Upload, integração, OCR, email |
| **Confiança típica** | 0.45 (OCR) → 0.85 (XML oficial) |

### 3.4 Evento

| Aspecto | Descrição |
|---------|-----------|
| **Propósito** | Tudo que ocorre em um momento específico e deixa marca |
| **Atributos específicos** | tipo, dataHora, envolvidos, descricao, impacto, objetosAfetados |
| **Estados possíveis** | Ocorrido, Registrado, Analisado, AprendizadoExtraido |
| **Exemplo** | `Evento{tipo:"Venda", dataHora:"15/07/2026 09:25", envolvidos:["João","Pedro"], valor:"R$ 60"}` |
| **Como descobre** | Registro automático, conversa, integração, observação |
| **Confiança típica** | 0.70 (relatado) → 0.95 (registro automático) |

### 3.5 Recurso

| Aspecto | Descrição |
|---------|-----------|
| **Propósito** | Qualquer ativo que a empresa utiliza para operar |
| **Atributos específicos** | tipo (físico/financeiro/humano/tecnologico), quantidade, estado, valorEstimado, vidaUtil |
| **Estados possíveis** | Disponivel, EmUso, Manutencao, Indisponivel, Baixado |
| **Exemplo** | `Recurso{tipo:"Fisico", nome:"Cadeira 1", estado:"EmUso", valor:"R$ 1.200"}` |
| **Como descobre** | Conversa, observação, estoque, integração |
| **Confiança típica** | 0.50 (declarado) → 0.80 (inventário) |

### 3.6 Local

| Aspecto | Descrição |
|---------|-----------|
| **Propósito** | Qualquer lugar físico ou virtual onde a empresa opera ou se relaciona |
| **Atributos específicos** | endereco, tipo (sede/filial/digital), area, capacidade, custo |
| **Estados possíveis** | Ativo, Inativo, Reforma, Novo |
| **Exemplo** | `Local{endereco:"Rua Augusta 123", tipo:"Sede", area:"45m2", estado:"Ativo"}` |
| **Como descobre** | Conversa, CNPJ, observação |
| **Confiança típica** | 0.70 (declarado) → 0.95 (CNPJ) |

### 3.7 Tempo

| Aspecto | Descrição |
|---------|-----------|
| **Propósito** | Períodos, momentos e durações relevantes para a empresa |
| **Atributos específicos** | tipo (momento/periodo/sazao), inicio, fim, duracao, rotulo |
| **Estados possíveis** | Passado, Presente, Futuro, Recorrente |
| **Exemplo** | `Tempo{tipo:"Periodo", inicio:"01/07/2026", fim:"31/07/2026", rotulo:"Julho/2026"}` |
| **Como descobre** | Inferência, calendário, conversa |
| **Confiança típica** | 0.80 (calendário) → 0.60 (estimado) |

### 3.8 Objetivo

| Aspecto | Descrição |
|---------|-----------|
| **Propósito** | Resultado desejado que orienta decisões |
| **Atributos específicos** | descricao, prazo, metrica, progresso, prioridade, responsavel |
| **Estados possíveis** | Definido, EmAndamento, Atingido, Abandonado, Substituido |
| **Exemplo** | `Objetivo{descricao:"Aumentar ticket médio para R$ 55", prazo:"31/12/2026", progresso:"40%"}` |
| **Como descobre** | Conversa, planejamento, reunião |
| **Confiança típica** | 0.50 (declarado) → 0.70 (com métrica) |

## 4. Categoria Comercial (12 objetos)

Objetos relacionados à relação da empresa com o mercado.

### 4.1 Cliente

| Aspecto | Descrição |
|---------|-----------|
| **Propósito** | Pessoa ou empresa que compra a oferta |
| **Atributos específicos** | perfil (PF/PJ), segmento, ticketMedio, frequencia, dataPrimeiraCompra, dataUltimaCompra, LTV, churnRisco, nps |
| **Estados possíveis** | Lead, Prospect, Ativo, Inativo, Recuperado, Perdido |
| **Exemplo** | `Cliente{nome:"Pedro", perfil:"PF", ticketMedio:"R$ 60", frequencia:"Mensal", estado:"Ativo"}` |
| **Como descobre** | Vendas, conversa, integração CRM, planilha |
| **Confiança típica** | 0.40 (conversa) → 0.85 (NF com nome) |

### 4.2 Produto

| Aspecto | Descrição |
|---------|-----------|
| **Propósito** | Oferta tangível que a empresa vende |
| **Atributos específicos** | descricao, preco, custo, margem, estoqueAtual, estoqueMinimo, fornecedores |
| **Estados possíveis** | Ativo, Inativo, EmDesenvolvimento, Descontinuado |
| **Exemplo** | `Produto{nome:"Tesoura profissional", preco:"R$ 89", custo:"R$ 45", margem:"49%"}` |
| **Como descobre** | Conversa, integração ERP, NF |

### 4.3 Servico

| Aspecto | Descrição |
|---------|-----------|
| **Propósito** | Oferta intangível que a empresa presta |
| **Atributos específicos** | descricao, preco, duracaoMedia, recursosNecessarios, qualidade |
| **Estados possíveis** | Ativo, Inativo, EmDesenvolvimento |
| **Exemplo** | `Servico{nome:"Corte masculino", preco:"R$ 45", duracaoMedia:"25min", recursosNecessarios:["Tesoura","Máquina","Pente"]}` |

### 4.4 Combo

| Aspecto | Descrição |
|---------|-----------|
| **Propósito** | Oferta composta por múltiplos produtos e/ou serviços |
| **Atributos específicos** | itens, precoTotal, precoIndividualSomado, economiaPercentual, margem |
| **Estados possíveis** | Ativo, Inativo, Sazonal, Teste |
| **Exemplo** | `Combo{nome:"Corte + Barba", itens:["Corte","Barba"], precoTotal:"R$ 60", economia:"14%"}` |

### 4.5 Preco

| Aspecto | Descrição |
|---------|-----------|
| **Propósito** | Valor monetário associado a uma oferta |
| **Atributos específicos** | valor, moeda, tipo (fixo/hora/negociavel), vigenciaInicio, vigenciaFim, historicoReajustes |
| **Estados possíveis** | Vigente, Historico, Futuro |
| **Exemplo** | `Preco{valor:"R$ 45", tipo:"Fixo", vigencia:"Julho/2026", historico:[{valor:"R$ 40", periodo:"Jan-Jun/2026"}]}` |

### 4.6 Venda

| Aspecto | Descrição |
|---------|-----------|
| **Propósito** | Transação completa de troca de oferta por dinheiro |
| **Atributos específicos** | itens, valorTotal, formaPagamento, status, data, cliente, vendedor, canal |
| **Estados possíveis** | Iniciada, Confirmada, EmAndamento, Concluida, Cancelada, Estornada |
| **Exemplo** | `Venda{cliente:"Pedro", itens:["Corte+Barba"], valor:"R$ 60", forma:"Pix", data:"15/07/2026", status:"Concluida"}` |

### 4.7 Lead

| Aspecto | Descrição |
|---------|-----------|
| **Propósito** | Potencial cliente que ainda não comprou |
| **Atributos específicos** | contato, origem, interesse, pontuacao, estagio, dataCaptacao |
| **Estados possíveis** | Novo, Contatado, Qualificado, PropostaEnviada, Negociacao, Convertido, Perdido |
| **Exemplo** | `Lead{nome:"Carlos", origem:"Instagram", interesse:"Corte", estagio:"Qualificado"}` |

### 4.8 Pipeline

| Aspecto | Descrição |
|---------|-----------|
| **Propósito** | Sequência de estágios que um lead percorre até se tornar cliente |
| **Atributos específicos** | nome, estagios (lista ordenada), leadsPorEstagio, taxaConversao, tempoMedioPorEstagio |
| **Estados possíveis** | Ativo, Pausado, Otimizado |
| **Exemplo** | `Pipeline{nome:"Vendas WhatsApp", estagios:["Novo","Qualificado","Proposta","Fechado"], taxaConversao:"35%"}` |

### 4.9 Canal

| Aspecto | Descrição |
|---------|-----------|
| **Propósito** | Meio pelo qual a empresa se conecta com clientes |
| **Atributos específicos** | tipo (fisico/digital/whatsapp/telefone/email/redeSocial), alcance, custo, receitaGerada, leadsGerados |
| **Estados possíveis** | Ativo, Inativo, Teste, Prioridade |
| **Exemplo** | `Canal{tipo:"WhatsApp", alcance:"450 contatos", receitaGeradaMensal:"R$ 3.200"}` |

### 4.10 Contrato

| Aspecto | Descrição |
|---------|-----------|
| **Propósito** | Acordo formal entre a empresa e outra parte |
| **Atributos específicos** | partes, objeto, valor, vigenciaInicio, vigenciaFim, clausulas, renovacaoAutomatica |
| **Estados possíveis** | Vigente, Expirado, Renovado, Rescindido, EmNegociacao |
| **Exemplo** | `Contrato{partes:["Barbearia","BelezaBella"], objeto:"Fornecimento tesouras", valorMensal:"R$ 350", vigencia:"2026"}` |

### 4.11 Proposta

| Aspecto | Descrição |
|---------|-----------|
| **Propósito** | Oferta formal enviada a um potencial cliente |
| **Atributos específicos** | cliente, itens, valorTotal, prazoValidade, dataEnvio, status |
| **Estados possíveis** | Rascunho, Enviada, Visualizada, Aceita, Recusada, Contraproposta |
| **Exemplo** | `Proposta{cliente:"Salão Beleza Pura", itens:["Curso de barbearia"], valor:"R$ 2.500", status:"Aceita"}` |

### 4.12 Pedido

| Aspecto | Descrição |
|---------|-----------|
| **Propósito** | Solicitação de compra feita por cliente ou à fornecedor |
| **Atributos específicos** | tipo (compra/venda), itens, valor, data, status, prazoEntrega |
| **Estados possíveis** | Recebido, EmSeparacao, Faturado, Enviado, Entregue, Cancelado |
| **Exemplo** | `Pedido{tipo:"Compra", itens:["Tesoura profissional x3"], valor:"R$ 267", fornecedor:"BelezaBella", status:"Entregue"}` |

## 5. Categoria Operacional (10 objetos)

Objetos relacionados ao funcionamento interno da empresa.

### 5.1 Processo

| Aspecto | Descrição |
|---------|-----------|
| **Propósito** | Sequência de ações que transforma entrada em saída |
| **Atributos específicos** | nome, etapas (ordenadas), responsavel, duracaoMedia, frequencia, recursosNecessarios, gargalos |
| **Estados possíveis** | Mapeado, Documentado, Otimizado, ComGargalo, Automatizado |
| **Exemplo** | `Processo{nome:"Atendimento", etapas:["Recepcionar","Executar","Cobrar","Registrar"], duracaoMedia:"30min", gargalos:["Executar (1 barbeiro)"]}` |

### 5.2 Tarefa

| Aspecto | Descrição |
|---------|-----------|
| **Propósito** | Unidade atômica de trabalho dentro de um processo |
| **Atributos específicos** | descricao, responsavel, prazo, duracaoEstimada, prioridade, dependencias |
| **Estados possíveis** | Pendente, EmAndamento, Concluida, Atrasada, Cancelada |
| **Exemplo** | `Tarefa{nome:"Comprar tesoura nova", responsavel:"João", prazo:"20/07", prioridade:"Alta"}` |

### 5.3 Agenda

| Aspecto | Descrição |
|---------|-----------|
| **Propósito** | Compromissos e horários que organizam o tempo |
| **Atributos específicos** | tipo (atendimento/reuniao/entrega), dataHora, duracao, envolvidos, local, status, recorrencia |
| **Estados possíveis** | Agendado, Confirmado, EmAndamento, Concluido, Cancelado, Reagendado |
| **Exemplo** | `Agenda{tipo:"Atendimento", cliente:"Pedro", dataHora:"15/07 09:00", duracao:"30min", barbeiro:"João", status:"Concluido"}` |

### 5.4 Estoque

| Aspecto | Descrição |
|---------|-----------|
| **Propósito** | Produtos armazenados para venda ou consumo |
| **Atributos específicos** | item, quantidade, quantidadeMinima, quantidadeMaxima, localizacao, valorUnitario, dataUltimaEntrada, dataUltimaSaida |
| **Estados possíveis** | Normal, Baixo (abaixo do mínimo), Critico (quase zero), Excesso, SemEstoque |
| **Exemplo** | `Estoque{item:"Tesoura profissional", quantidade:3, minimo:2, estado:"Normal"}` |

### 5.5 Fornecedor

| Aspecto | Descrição |
|---------|-----------|
| **Propósito** | Pessoa ou empresa que vende insumos para a empresa |
| **Atributos específicos** | nome, contato, produtosFornecidos, precos, prazoEntrega, qualidadePercebida, historicoCompras |
| **Estados possíveis** | Ativo, Inativo, Preferencial, Substituto, Bloqueado |
| **Exemplo** | `Fornecedor{nome:"BelezaBella", produtos:["Tesoura","Máquina","Pente"], prazoEntrega:"3 dias", estado:"Preferencial"}` |

### 5.6 Compra

| Aspecto | Descrição |
|---------|-----------|
| **Propósito** | Aquisição de insumo para operação |
| **Atributos específicos** | fornecedor, itens, valorTotal, data, formaPagamento, status, notas |
| **Estados possíveis** | Cotada, Realizada, Recebida, Paga, Cancelada |
| **Exemplo** | `Compra{fornecedor:"BelezaBella", itens:["Tesoura x3"], valor:"R$ 267", data:"10/07", status:"Recebida"}` |

### 5.7 Producao

| Aspecto | Descrição |
|---------|-----------|
| **Propósito** | Transformação de insumos em oferta |
| **Atributos específicos** | tipo, insumosUtilizados, produtoGerado, quantidade, tempoTotal, custoProducao, responsavel |
| **Estados possíveis** | Planejada, EmAndamento, Concluida, ComDefeito, Cancelada |
| **Exemplo** | `Producao{insumos:["Massa","Recheio"], produto:"Pão de queijo", quantidade:50, tempoTotal:"2h", responsavel:"Maria"}` |

### 5.8 Entrega

| Aspecto | Descrição |
|---------|-----------|
| **Propósito** | Disponibilização da oferta ao cliente |
| **Atributos específicos** | tipo (presencial/envio/retirada), endereco, data, status, custoEntrega, prazo |
| **Estados possíveis** | Pendente, EmRota, Entregue, Atrasada, Devolvida |
| **Exemplo** | `Entrega{cliente:"Pedro", tipo:"Presencial", data:"15/07", status:"Entregue"}` |

### 5.9 Qualidade

| Aspecto | Descrição |
|---------|-----------|
| **Propósito** | Medida de conformidade da oferta com padrões ou expectativas |
| **Atributos específicos** | tipo (produto/servico/atendimento), criterios, pontuacao, dataAvaliacao, avaliador, naoConformidades |
| **Estados possíveis** | DentroPadrao, AbaixoPadrao, AcimaPadrao, NaoAvaliado |
| **Exemplo** | `Qualidade{tipo:"Servico", servico:"Corte masculino", nps:8, avaliador:"Cliente Pedro", estado:"DentroPadrao"}` |

### 5.10 Manutencao

| Aspecto | Descrição |
|---------|-----------|
| **Propósito** | Preservação de recursos em condições de uso |
| **Atributos específicos** | recurso, tipo (preventiva/corretiva), data, custo, proximaData, responsavel, observacoes |
| **Estados possíveis** | Pendente, Agendada, EmAndamento, Concluida, Atrasada |
| **Exemplo** | `Manutencao{recurso:"Máquina de cortar", tipo:"Preventiva", data:"20/07", custo:"R$ 80", estado:"Agendada"}` |

## 6. Categoria Financeira (8 objetos)

Objetos relacionados ao fluxo de valor econômico.

### 6.1 Receita

| Aspecto | Descrição |
|---------|-----------|
| **Propósito** | Dinheiro que entra na empresa |
| **Atributos específicos** | valor, data, categoria (venda/investimento/credito), origem, formaPagamento, status, comprovante |
| **Estados possíveis** | Prevista, Recebida, AReceber, Cancelada, Estornada |
| **Exemplo** | `Receita{valor:"R$ 60", categoria:"Venda", origem:"Pedro", forma:"Pix", data:"15/07", status:"Recebida"}` |

### 6.2 Despesa

| Aspecto | Descrição |
|---------|-----------|
| **Propósito** | Dinheiro que sai da empresa |
| **Atributos específicos** | valor, data, categoria (custo/despesa/investimento), destino, formaPagamento, status, comprovante, classificacao (fixa/variavel) |
| **Estados possíveis** | Prevista, Paga, APagar, Cancelada, Estornada |
| **Exemplo** | `Despesa{valor:"R$ 267", categoria:"Custo", destino:"BelezaBella", forma:"Pix", data:"10/07", status:"Paga"}` |

### 6.3 Margem

| Aspecto | Descrição |
|---------|-----------|
| **Propósito** | Diferença entre receita e custo, indicador de eficiência |
| **Atributos específicos** | tipo (bruta/liquida/porProduto/porServico), valor, percentual, periodo, comparacaoHistorico |
| **Estados possíveis** | Positiva, Negativa, Estavel, Crescente, Decrescente |
| **Exemplo** | `Margem{tipo:"Bruta", valor:"R$ 5.700", percentual:"40%", periodo:"Julho/2026", estado:"Positiva"}` |

### 6.4 Caixa

| Aspecto | Descrição |
|---------|-----------|
| **Propósito** | Disponibilidade financeira imediata |
| **Atributos específicos** | saldoAtual, saldoMinimo, saldoMedio, entradasPrevistas, saidasPrevistas, data |
| **Estados possíveis** | Positivo, Negativo, Critico (abaixo do mínimo), Confortavel |
| **Exemplo** | `Caixa{saldoAtual:"R$ 1.200", minimo:"R$ 500", entradasPrevistas:"R$ 3.000", saidasPrevistas:"R$ 2.500", estado:"Positivo"}` |

### 6.5 Investimento

| Aspecto | Descrição |
|---------|-----------|
| **Propósito** | Gasto com retorno esperado no futuro |
| **Atributos específicos** | descricao, valor, data, retornoEsperado, prazoRetorno, risco, tipo (equipamento/marketing/pessoa/infra) |
| **Estados possíveis** | Planejado, EmAndamento, Concluido, Abandonado, EmRetorno |
| **Exemplo** | `Investimento{descricao:"Curso barbeira Maria", valor:"R$ 1.500", retornoEsperado:"+30% capacidade", tipo:"Pessoa", estado:"Concluido"}` |

### 6.6 Divida

| Aspecto | Descrição |
|---------|-----------|
| **Propósito** | Obrigação financeira da empresa com terceiros |
| **Atributos específicos** | credor, valorTotal, valorRestante, juros, dataContratacao, dataVencimento, parcelas |
| **Estados possíveis** | EmDia, Atrasada, Renegociada, Quitada, Inadimplente |
| **Exemplo** | `Divida{credor:"Banco X", valorTotal:"R$ 10.000", restante:"R$ 6.000", parcelas:"12/24", estado:"EmDia"}` |

### 6.7 Credito

| Aspecto | Descrição |
|---------|-----------|
| **Propósito** | Limite de recursos financeiros disponíveis de terceiros |
| **Atributos específicos** | tipo (chequeEspecial/cartao/emprestimo), limite, utilizado, disponivel, juros, dataValidade |
| **Estados possíveis** | Disponivel, Utilizado, Esgotado, Bloqueado, Cancelado |
| **Exemplo** | `Credito{tipo:"Cartão", limite:"R$ 5.000", utilizado:"R$ 1.200", disponivel:"R$ 3.800"}` |

### 6.8 Resultado

| Aspecto | Descrição |
|---------|-----------|
| **Propósito** | Lucro ou prejuízo em um período |
| **Atributos específicos** | periodo, receitaTotal, despesaTotal, lucroPrejuizo, margemLiquida, comparacaoPeriodoAnterior |
| **Estados possíveis** | Lucro, Prejuizo, Equilibrio, Crescente, Decrescente |
| **Exemplo** | `Resultado{periodo:"Julho/2026", receita:"R$ 14.200", despesa:"R$ 8.500", lucro:"R$ 5.700", margem:"40%"}` |

## 7. Categoria Pessoas (6 objetos)

Objetos que descrevem papéis e capacidades humanas.

### 7.1 Socio

| Aspecto | Descrição |
|---------|-----------|
| **Propósito** | Proprietário da empresa com participação societária |
| **Atributos específicos** | participacaoPercentual, tipo (administrador/silencioso), dataEntrada, dataSaida, capitalInvestido, responsabilidades |
| **Estados possíveis** | Ativo, Inativo, Retirada |
| **Exemplo** | `Socio{nome:"João", participacao:"100%", tipo:"Administrador", capitalInvestido:"R$ 15.000"}` |

### 7.2 Equipe

| Aspecto | Descrição |
|---------|-----------|
| **Propósito** | Colaboradores que trabalham na empresa |
| **Atributos específicos** | nome, funcao, cargaHoraria, salario, dataContratacao, habilidades, avaliacao |
| **Estados possíveis** | Ativo, Ferias, Afastado, Treinamento, Desligado |
| **Exemplo** | `Equipe{nome:"Carlos", funcao:"Barbeiro", cargaHoraria:"44h", salario:"R$ 2.500", habilidades:["Corte","Barba","Hidratação"]}` |

### 7.3 Prestador

| Aspecto | Descrição |
|---------|-----------|
| **Propósito** | Terceiro contratado para serviço específico |
| **Atributos específicos** | nome, servico, valorContrato, vigencia, formaPagamento, qualidade |
| **Estados possíveis** | Contratado, EmExecucao, Concluido, Desligado |
| **Exemplo** | `Prestador{nome:"Maria", servico:"Limpeza", valor:"R$ 800/mês", vigencia:"2026", qualidade:"Boa"}` |

### 7.4 Parceiro

| Aspecto | Descrição |
|---------|-----------|
| **Propósito** | Aliado comercial com relação de ganho mútuo |
| **Atributos específicos** | nome, tipo, beneficioReciproco, dataInicio, dataFim, canaisCompartilhados |
| **Estados possíveis** | Ativo, Inativo, Potencial, Rompido |
| **Exemplo** | `Parceiro{nome:"Salão Beleza Pura", tipo:"Indicação mútua", beneficio:"Clientes de manicure viram clientes de barbearia"}` |

### 7.5 Habilidade

| Aspecto | Descrição |
|---------|-----------|
| **Propósito** | Competência específica de uma pessoa |
| **Atributos específicos** | nome, nivel (iniciante/intermediario/avancado/mestre), certificacao, tempoExperiencia, pessoa |
| **Estados possíveis** | Ativa, EmDesenvolvimento, Obsoleta |
| **Exemplo** | `Habilidade{nome:"Barba estilizada", nivel:"Avançado", certificacao:"Curso Barbearia 2025", pessoa:"João"}` |

### 7.6 Funcao

| Aspecto | Descrição |
|---------|-----------|
| **Propósito** | Papel organizacional que uma pessoa ocupa |
| **Atributos específicos** | nome, responsabilidades, requisitos, salarioMedio, pessoasNaFuncao, reportsTo |
| **Estados possíveis** | Ocupada, Vaga, Criada, Extinta |
| **Exemplo** | `Funcao{nome:"Barbeiro", responsabilidades:["Cortar","Barbear","Higienizar"], salarioMedio:"R$ 2.500", ocupadaPor:["João","Carlos"]}` |

## 8. Categoria Decisória (6 objetos)

Objetos relacionados a escolhas, problemas e futuro.

### 8.1 Decisao

| Aspecto | Descrição |
|---------|-----------|
| **Propósito** | Escolha entre duas ou mais alternativas que afeta o rumo da empresa |
| **Atributos específicos** | descricao, alternativas, escolhida, quemDecidiu, data, criterios, impacto, resultado, aprendizado |
| **Estados possíveis** | Pendente, Tomada, EmAndamento, Executada, Revertida, Abortada |
| **Exemplo** | `Decisao{descricao:"Contratar mais um barbeiro?", alternativas:["Sim: Carlos","Não: esperar demanda"], escolhida:"Sim", quem:"João", resultado:"Atendimento +40%", aprendizado:"Valioso"}` |

### 8.2 Problema

| Aspecto | Descrição |
|---------|-----------|
| **Propósito** | Obstáculo que impede a empresa de atingir um objetivo |
| **Atributos específicos** | descricao, categoria, gravidade (1-5), urgencia (1-5), impactoFinanceiro, causaRaiz, solucoesTentadas, desdeQuando |
| **Estados possíveis** | Identificado, Analisado, EmSolucao, Resolvido, Recorrente, Aceito (não será resolvido) |
| **Exemplo** | `Problema{descricao:"Demora no atendimento 14h-16h", categoria:"Operacional", gravidade:4, urgencia:5, causaRaiz:"Apenas 1 barbeiro no horário", estado:"EmSolucao"}` |

### 8.3 Risco

| Aspecto | Descrição |
|---------|-----------|
| **Propósito** | Possibilidade de perda ou dano futuro |
| **Atributos específicos** | descricao, probabilidade (baixa/media/alta), impacto (baixo/medio/alto), categoria, mitigacao, responsavel, prazo |
| **Estados possíveis** | Identificado, Mitigado, Materializado, NaoMaterializado, Ignorado |
| **Exemplo** | `Risco{descricao:"Carlos pedir demissão", probabilidade:"Média", impacto:"Alto", mitigacao:"Treinar Maria também", estado:"Mitigado"}` |

### 8.4 Oportunidade

| Aspecto | Descrição |
|---------|-----------|
| **Propósito** | Possibilidade de ganho ou melhoria futura |
| **Atributos específicos** | descricao, potencialGanho, esforcoNecessario, prazo, riscoAssociado, prioridade |
| **Estados possíveis** | Identificada, Analisada, EmExecucao, Concluida, Perdida, Adiada |
| **Exemplo** | `Oportunidade{descricao:"Atender no domingo", potencialGanho:"+R$ 2.000/mês", esforco:"Contratar 1 pessoa", prioridade:"Média"}` |

### 8.5 Cenario

| Aspecto | Descrição |
|---------|-----------|
| **Propósito** | Estado futuro possível construído a partir de hipóteses |
| **Atributos específicos** | descricao, premissas, probabilidadeEstimada, impactoFinanceiro, prazo, decisaoAssociada |
| **Estados possíveis** | Otimista, Pessimista, Realista, Hipotetico |
| **Exemplo** | `Cenario{descricao:"Se contratar Carlos", premissas:["Carlos aceitar R$ 2.500","Demanda continuar"], impacto:"+R$ 3.000/mês", tipo:"Realista"}` |

### 8.6 Meta

| Aspecto | Descrição |
|---------|-----------|
| **Propósito** | Objetivo quantificado com prazo (mais específico que Objetivo) |
| **Atributos específicos** | descricao, valorAlvo, valorAtual, prazo, metrica, responsavel, milestones, status |
| **Estados possíveis** | Definida, EmAndamento, Atingida, NaoAtingida, Substituida, Abandonada |
| **Exemplo** | `Meta{descricao:"Atingir R$ 15.000 de receita mensal", valorAlvo:"R$ 15.000", atual:"R$ 14.200", prazo:"31/08/2026", status:"EmAndamento"}` |

## 9. Categoria Cognitiva (8 objetos)

Objetos que representam o conhecimento e aprendizado da empresa. São os objetos de mais alto nível — o patrimônio intelectual.

### 9.1 Hipotese

| Aspecto | Descrição |
|---------|-----------|
| **Propósito** | Explicação proposta para um padrão observado, ainda não validada |
| **Atributos específicos** | descricao, baseadaEm (eventos/padroes), previsao ("Se X então Y"), statusTeste, resultadoTeste, confiancaAtual |
| **Estados possíveis** | Formulada, EmTeste, Confirmada, Refutada, Inconclusiva |
| **Exemplo** | `Hipotese{descricao:"Mais barbeiros no horário de almoço reduz reclamações", previsao:"Reclamações caem 50%", status:"EmTeste", confianca:"0.65"}` |

### 9.2 Conhecimento

| Aspecto | Descrição |
|---------|-----------|
| **Propósito** | Padrão validado que pode orientar decisões. É o patrimônio cognitivo da empresa |
| **Atributos específicos** | descricao, dominio, validadeInicio, validadeFim, confianca, evidencias, aplicacoes, contraEvidencias |
| **Estados possíveis** | Emergente, Validado, Contestado, Obsoleto, Arquivado |
| **Exemplo** | `Conhecimento{descricao:"2 barbeiros no pico aumenta lucro líquido", dominio:"Operação", confianca:"0.85", evidencias:["Teste Julho: receita +15%, custo +5%"], estado:"Validado"}` |

### 9.3 Aprendizado

| Aspecto | Descrição |
|---------|-----------|
| **Propósito** | Mudança de comportamento ou entendimento baseada em experiência |
| **Atributos específicos** | descricao, gatilho (evento/erro/acerto), data, impacto, aplicadoEm, pessoaQueAprendeu |
| **Estados possíveis** | Recente, Incorporado, Esquecido, Superado |
| **Exemplo** | `Aprendizado{descricao:"Tesoura X dura mais que Y", gatilho:"Compramos Y e durou 1 mês", impacto:"Economia de R$ 200/ano", aplicadoEm:"Compras", estado:"Incorporado"}` |

### 9.4 Padrao

| Aspecto | Descrição |
|---------|-----------|
| **Propósito** | Comportamento, resultado ou sequência que se repete |
| **Atributos específicos** | descricao, tipo (comportamental/operacional/financeiro), frequencia, exemplos, excecoes, forca |
| **Estados possíveis** | Identificado, Confirmado, EmMudanca, Rompido |
| **Exemplo** | `Padrao{descricao:"Segunda-feira é o dia mais fraco", tipo:"Operacional", frequencia:"92% das semanas", exemplos:["Média 8 clientes vs 15 nos outros dias"], forca:"Alta"}` |

### 9.5 Anomalia

| Aspecto | Descrição |
|---------|-----------|
| **Propósito** | Desvio significativo de um padrão esperado |
| **Atributos específicos** | descricao, padraoEsperado, valorObservado, desvioPercentual, data, possivelCausa, nivelAlerta |
| **Estados possíveis** | Detectada, Investigada, Explicada, Ignorada, Resolvida |
| **Exemplo** | `Anomalia{descricao:"Venda de R$ 600 em um dia (média R$ 720/semana)", padraoEsperado:"R$ 100/dia", valorObservado:"R$ 600", desvio:"500%", data:"18/07", nivelAlerta:"Alto"}` |

### 9.6 Lacuna

| Aspecto | Descrição |
|---------|-----------|
| **Propósito** | Ausência de informação necessária para completar um elemento ou decisão |
| **Atributos específicos** | descricao, objetoAfetado, atributoFaltante, importancia (1-5), comoPreencher, prazo |
| **Estados possíveis** | Identificada, EmPreenchimento, Preenchida, Ignorada, NaoPreenchevel |
| **Exemplo** | `Lacuna{descricao:"Não sabemos margem do combo Corte+Barba", objeto:"Combo", atributo:"margem", importancia:4, comoPreencher:"Calcular custo dos insumos", estado:"Identificada"}` |

### 9.7 Confianca

| Aspecto | Descrição |
|---------|-----------|
| **Propósito** | Metadado que qualifica o grau de certeza sobre qualquer informação no modelo |
| **Atributos específicos** | score (0.0-1.0), nivel (Confirmado/Alta/Média/Baixa/Suspeita), fonte, dataAfericao, historicoScores, tendencia |
| **Estados possíveis** | Estavel, Crescente, Decrescente, Contradita |
| **Exemplo** | `Confianca{score:0.85, nivel:"Alta", fonte:"João confirmou", data:"18/07", historico:[0.55, 0.70, 0.85], tendencia:"Crescente"}` |

### 9.8 Incerteza

| Aspecto | Descrição |
|---------|-----------|
| **Propósito** | Estado de conhecimento incompleto sobre um objeto ou relação |
| **Atributos específicos** | descricao, tipo (Certeza/Hipotese/Suspeita/Desconhecido/Contradicao), objetosAfetados, impactoNaDecisao, alternativas |
| **Estados possíveis** | Aberta, Reduzida, Resolvida, Ignorada |
| **Exemplo** | `Incerteza{descricao:"Margem real do combo é desconhecida", tipo:"Desconhecido", objetos:["Combo:Corte+Barba"], impacto:"Não sabemos se é lucrativo promover", estado:"Aberta"}` |

## 10. Índice completo por segmento

### 10.1 Objetos obrigatórios vs opcionais

| Segmento | Objetos sempre presentes | Objetos opcionais |
|----------|------------------------|-------------------|
| **Comércio** (loja) | Empresa, Pessoa, Cliente, Produto, Venda, Fornecedor, Compra, Estoque, Receita, Despesa, Margem, Caixa, Resultado, Processo, Problema, Decisao | Servico, Combo, Producao, Agenda |
| **Serviço** (barbearia, oficina) | Empresa, Pessoa, Cliente, Servico, Venda, Agenda, Receita, Despesa, Margem, Caixa, Resultado, Processo, Habilidade, Problema, Decisao | Produto, Estoque, Producao |
| **Indústria** | Empresa, Pessoa, Cliente, Produto, Venda, Fornecedor, Compra, Estoque, Producao, Receita, Despesa, Margem, Caixa, Resultado, Processo, Qualidade, Problema, Decisao | Servico, Agenda |
| **Profissional Liberal** | Empresa, Pessoa, Cliente, Servico, Agenda, Receita, Despesa, Margem, Caixa, Resultado, Habilidade, Problema, Decisao | Produto, Estoque, Fornecedor |

### 10.2 Objetos por maturidade

| Maturidade | Objetos que surgem |
|------------|-------------------|
| **Sobrevivência** | Empresa, Pessoa, Cliente, Produto/Servico, Venda, Receita, Despesa, Problema |
| **Estabilidade** | Processo, Agenda, Fornecedor, Caixa, Resultado |
| **Eficiência** | Margem, Estoque, Qualidade, Habilidade, Meta, Decisao |
| **Expansão** | Pipeline, Lead, Canal, Contrato, Parceiro, Risco, Oportunidade |
| **Maturidade** | Aprendizado, Conhecimento, Padrao, Anomalia, Cenario, Hipotese |

---

> **Fim do Catálogo de Objetos Cognitivos**
> Próximo: `RELACIONAMENTOS_COGNITIVOS.md` — Grafo completo de relacionamentos entre objetos
