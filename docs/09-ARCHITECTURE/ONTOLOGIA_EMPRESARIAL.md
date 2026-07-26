# Ontologia Empresarial — Estrutura Formal de Domínio

> **Programa 12 — Fase 1** | Patrimônio Intelectual da Ponte Digital
> Derivado de: MODELO_COGNITIVO_UNIVERSAL.md, OBJETOS_COGNITIVOS.md, RELACIONAMENTOS_COGNITIVOS.md
> Nenhum código, classe, API, schema, migration ou engine foi criado.

---

## Índice

1. [O que é uma ontologia empresarial](#1-o-que-é-uma-ontologia-empresarial)
2. [Hierarquia conceitual](#2-hierarquia-conceitual)
3. [Domínios semânticos](#3-domínios-semânticos)
4. [Taxonomia de segmentos](#4-taxonomia-de-segmentos)
5. [Vocabulário controlado](#5-vocabulário-controlado)
6. [Regras de inferência ontológica](#6-regras-de-inferência-ontológica)
7. [Herança e especialização](#7-herança-e-especialização)
8. [Polimorfismo cognitivo](#8-polimorfismo-cognitivo)
9. [Contradições e exceções ontológicas](#9-contradições-e-exceções-ontológicas)
10. [Glossário ontológico](#10-glossário-ontológico)

---

## 1. O que é uma ontologia empresarial

Uma **ontologia** é uma especificação formal e explícita de uma conceitualização compartilhada. No contexto da Ponte Digital, a ontologia empresarial define:

1. **O que existe** no universo empresarial (as categorias fundamentais)
2. **Como se relaciona** (as conexões semanticamente válidas)
3. **O que é verdade** (as regras que o domínio segue)
4. **O que pode ser inferido** (conhecimento dedutível a partir do explícito)

### 1.1 Diferença do modelo cognitivo

| Aspecto | Modelo Cognitivo | Ontologia Empresarial |
|---------|-----------------|----------------------|
| Foco | Descrever a empresa | Definir as regras do domínio |
| Pergunta | "Como esta empresa funciona?" | "O que significa ser uma empresa?" |
| Natureza | Descritiva (caso específico) | Normativa (regras gerais) |
| Mutabilidade | Muda com a empresa | Muda com o conhecimento do domínio |
| Conteúdo | Objetos e relacionamentos | Categorias, hierarquias, regras |

## 2. Hierarquia conceitual

### 2.1 Árvore ontológica completa

```
THING (coisa no mundo)
├── AGENTE (entidade que age)
│   ├── PESSOA (ser humano individual)
│   │   ├── Interno (da empresa)
│   │   │   ├── Socio
│   │   │   ├── Equipe
│   │   │   └── Prestador
│   │   └── Externo (da empresa)
│   │       ├── Cliente
│   │       ├── Fornecedor
│   │       ├── Parceiro
│   │       └── Consultor
│   └── ORGANIZACAO (entidade coletiva)
│       └── Empresa (a entidade central)
│
├── OFERTA (o que se oferece ao mercado)
│   ├── Produto (bem tangível)
│   ├── Servico (bem intangível)
│   └── Combo (oferta composta)
│
├── RECURSO (o que se usa para operar)
│   ├── Fisico (máquina, imóvel, veículo, estoque)
│   ├── Financeiro (caixa, crédito, investimento)
│   ├── Humano (habilidade, conhecimento, tempo)
│   ├── Tecnologico (software, sistema, ferramenta)
│   ├── Intelectual (marca, método, patente)
│   └── Relacional (rede, reputação, parceria)
│
├── EVENTO (ocorrência no tempo)
│   ├── Transacao (venda, compra, pagamento)
│   ├── Interacao (atendimento, reunião, contato)
│   ├── Mudanca (contratação, demissão, reforma)
│   └── Incidente (acidente, crise, falha)
│
├── MEDIDA (quantificação de algo)
│   ├── Preco (valor monetário de oferta)
│   ├── Receita (dinheiro que entra)
│   ├── Despesa (dinheiro que sai)
│   ├── Margem (diferença)
│   ├── Resultado (lucro ou prejuízo)
│   ├── Qualidade (conformidade)
│   └── Confianca (certeza)
│
├── PROCESSO (sequência de ações)
│   └── (instâncias específicas de cada empresa)
│
├── DECISAO (escolha entre alternativas)
│   └── (instâncias específicas)
│
├── CONHECIMENTO (informação validada)
│   ├── Padrao (comportamento recorrente)
│   ├── ConhecimentoValidado (regra confirmada)
│   ├── Hipotese (explicação proposta)
│   └── Aprendizado (mudança por experiência)
│
├── PROBLEMA (obstáculo)
│   ├── Financeiro, Comercial, Operacional
│   ├── Humano, Estrategico, Externo, Tecnologico
│   └── Risco (problema futuro possível)
│
├── DOCUMENTO (registro de informação)
│   ├── Fiscal (NF, contrato, boleto)
│   ├── Operacional (planilha, relatório)
│   └── Comunicacao (email, whatsapp, proposta)
│
├── TEMPO (dimensão temporal)
│   ├── Momento (instante específico)
│   ├── Periodo (intervalo)
│   └── Sazao (recorrência cíclica)
│
└── LUGAR (dimensão espacial)
    └── Local (endereço, coordenada, digital)
```

### 2.2 Relações hierárquicas

| Relação | Significado | Exemplo |
|---------|-------------|---------|
| `é_um` | Herança: subtipo de | "Cliente é_um Pessoa" |
| `parte_de` | Composição: faz parte de | "Equipe parte_de Empresa" |
| `instância_de` | Pertence a uma classe | "Barbearia do João instância_de Empresa" |
| `depende_de` | Dependência existencial | "Venda depende_de Cliente" |
| `manifestação_de` | Materialização de conceito | "NF manifestação_de Venda" |
| `oposto_de` | Relação antônima | "Receita oposto_de Despesa" |

## 3. Domínios semânticos

### 3.1 Os 8 domínios

Um **domínio semântico** é uma região do conhecimento empresarial que compartilha vocabulário, regras e lógica próprios.

```
                    ┌──────────────────────────────────────┐
                    │           EMPRESA                     │
                    │   (identidade, cultura, história)     │
                    └──────────┬───────────────────────────┘
                               │
       ┌───────────────────────┼───────────────────────┐
       │                       │                        │
       ▼                       ▼                        ▼
┌──────────────┐     ┌────────────────┐     ┌────────────────┐
│   COMERCIAL  │     │   OPERACIONAL  │     │   FINANCEIRO   │
│  (vender,    │     │  (produzir,    │     │  (receber,     │
│   clientes,  │     │   atender,     │     │   pagar,       │
│   produtos)  │     │   comprar)     │     │   resultar)    │
└──────────────┘     └────────────────┘     └────────────────┘
       │                       │                        │
       └───────────────────────┼───────────────────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │      DECISÓRIO       │
                    │   (escolher,         │
                    │    planejar,         │
                    │    priorizar)        │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │     COGNITIVO        │
                    │   (aprender,         │
                    │    inferir,          │
                    │    conhecer)         │
                    └──────────────────────┘
```

Além destes, existem mais 3 domínios transversais:

| Domínio | Escopo | Objetos |
|---------|--------|---------|
| **Temporal** | Passado, presente, futuro | Tempo, Evento, Periodo |
| **Espacial** | Onde as coisas acontecem | Local, Endereco |
| **Documental** | Registro e comprovação | Documento, NF, Contrato |

### 3.2 Regras de cada domínio

#### Domínio Comercial
- Toda oferta tem um preço
- Toda venda tem um cliente
- Toda venda envolve pelo menos uma oferta
- Cliente pode ser pessoa física ou jurídica
- Cada lead pertence a um pipeline

#### Domínio Operacional
- Todo processo tem entrada e saída
- Toda tarefa tem um responsável
- Toda agenda tem um participante principal
- Estoque sempre pertence a um produto
- Produção sempre consome recursos

#### Domínio Financeiro
- Receita sempre vem de uma venda (direta ou indireta)
- Despesa sempre tem um destino
- Margem = Receita - Custo (por oferta ou período)
- Caixa = soma de receitas - soma de despesas
- Resultado = Receita total - Despesa total

#### Domínio Decisório
- Toda decisão tem um responsável
- Toda decisão é tomada sob incerteza
- Decisões podem ser revertidas
- Problemas podem ter múltiplas causas
- Riscos podem ser mitigados, nunca eliminados

#### Domínio Cognitivo
- Conhecimento deriva de experiência validada
- Hipóteses são proposições testáveis
- Padrões requerem N mínimo de observações
- Anomalias são desvios de padrões estabelecidos
- Confiança decai com o tempo sem revalidação

## 4. Taxonomia de segmentos

### 4.1 Quatro super-segmentos

Todo negócio pertence a um dos quatro super-segmentos:

```
NEGÓCIO
├── COMÉRCIO (compra e revende sem transformação significativa)
│   ├── Varejo (loja física, e-commerce, marketplace)
│   ├── Atacado (distribuição, revenda em volume)
│   └── Híbrido (fábrica + loja, produtor + venda direta)
│
├── SERVIÇO (oferta intangível, baseada em conhecimento/habilidade)
│   ├── Técnico (oficina, assistência técnica, construção)
│   ├── Profissional (consultoria, advocacia, contabilidade)
│   ├── Saúde (clínica, consultório, laboratório)
│   ├── Beleza (barbearia, salão, estética)
│   ├── Alimentação (restaurante, lanchonete, bar)
│   └── Transporte (logística, entregas, fretes)
│
├── INDÚSTRIA (transforma matéria-prima em produto)
│   ├── Manufatura (produção em série)
│   ├── Artesanal (produção sob medida)
│   └── Processo (produção contínua, ex: alimentos)
│
└── PROFISSIONAL LIBERAL (pessoa física que presta serviço)
    ├── Autônomo (sem equipe)
    └── Pequeno escritório (com 1-3 pessoas)
```

### 4.2 Atributos ontológicos por super-segmento

| Atributo | Comércio | Serviço | Indústria | Prof. Liberal |
|----------|----------|---------|-----------|---------------|
| Oferta principal | Produto | Serviço | Produto | Serviço |
| Precificação | Markup sobre custo | Hora/projeto/valor | Custo + margem | Hora/consultoria |
| Estoques | Sim (crítico) | Não (ou mínimo) | Sim (insumo + produto) | Não |
| Agenda | Opcional | Obrigatória | Opcional | Muito relevante |
| Cliente | Pessoa (principalmente) | Pessoa ou empresa | Empresa | Pessoa |
| Diferencial | Preço/localização | Qualidade/habilidade | Escala/preço | Reputação/conhecimento |
| Problema típico | Fluxo de caixa | Inadimplência | Custo fixo | Tempo ocioso |

## 5. Vocabulário controlado

### 5.1 Princípio

Diferentes empresas chamam a mesma coisa de nomes diferentes. A ontologia deve normalizar o vocabulário.

### 5.2 Sinônimos por segmento

| Conceito universal | Comércio chama | Serviço chama | Indústria chama | Prof. Liberal |
|--------------------|----------------|---------------|-----------------|---------------|
| **Cliente** | Cliente | Cliente/Paciente/Aluno | Cliente | Cliente/Paciente/Aluno |
| **Venda** | Venda | Atendimento/Consulta | Pedido | Consultoria/Caso |
| **Produto** | Mercadoria | — | Peça/Item | — |
| **Serviço** | — | Serviço/Procedimento | — | Consultoria/Hora |
| **Agenda** | — | Agenda/Horários | Programação | Agenda |
| **Equipe** | Vendedor | Profissional | Operador | — |
| **Local** | Loja | Consultório | Fábrica | Sala |
| **Oferta** | Catálogo | Cardápio/Tabela | Portfólio | Serviços |

### 5.3 Mapa de termos proibidos e preferidos

Para garantir consistência cognitiva, a IA deve usar sempre o termo universal internamente:

| Termo universal | Termo aceito | Termo proibido |
|----------------|-------------|----------------|
| Cliente | Cliente, Paciente, Aluno | User, Usuário, Contato |
| Venda | Venda, Transação | Order (em português) |
| Produto | Produto, Item, Mercadoria | SKU (exceto como atributo) |
| Serviço | Serviço, Procedimento | Product (confunde) |
| Dinheiro | Receita, Despesa, Caixa | Money, Cash (genérico) |
| Problema | Problema, Dor, Gargalo | Bug, Issue |
| Pessoa | Pessoa, Profissional, Colaborador | Resource (coisifica) |

## 6. Regras de inferência ontológica

### 6.1 Inferências diretas (confiança alta)

| Premissa | Inferência | Confiança |
|----------|-----------|-----------|
| Empresa → vende → Produto | Empresa tem oferta comercial | 0.90 |
| Venda → envolve → Produto | Produto existe no catálogo | 0.95 |
| Venda → gerou → Receita | Empresa recebeu pagamento | 0.95 |
| Agenda → envolve → Cliente | Cliente existe | 0.90 |
| Despesa → veio_de → Compra | Compra foi realizada | 0.90 |

### 6.2 Inferências indiretas (confiança média)

| Premissa | Inferência | Confiança |
|----------|-----------|-----------|
| Múltiplas Vendas com mesmo Cliente | Cliente é recorrente | 0.75 |
| Múltiplas Vendas sem novo Cliente | Base de clientes estável | 0.65 |
| Nenhuma Venda em N dias | Empresa pode estar com problema | 0.40 |
| Despesa > Receita por N meses | Empresa pode estar em crise | 0.60 |
| Cliente não compra há N meses | Cliente pode ter migrado | 0.50 |

### 6.3 Inferências analógicas (confiança baixa)

| Premissa | Inferência | Confiança |
|----------|-----------|-----------|
| Empresa de segmento X | Provavelmente tem processo Y | 0.30 |
| Porte MEI | Provavelmente dono opera sozinho | 0.40 |
| Segmento Restaurante | Provavelmente tem horário de almoço | 0.50 |
| Loja de roupas | Provavelmente tem troca de estação | 0.45 |

## 7. Herança e especialização

### 7.1 Hierarquia de Pessoa

```
Pessoa
├── PessoaFisica
│   ├── Socio
│   │   ├── SocioAdministrador
│   │   └── SocioSilencioso
│   ├── Equipe
│   │   ├── Gerente
│   │   ├── Operacional
│   │   └── Auxiliar
│   ├── Prestador
│   ├── ClientePF
│   └── FornecedorPF
└── PessoaJuridica
    ├── ClientePJ
    └── FornecedorPJ
```

Cada subtipo herda todos os atributos do pai e adiciona específicos.

### 7.2 Hierarquia de Oferta

```
Oferta
├── Produto
│   ├── ProdutoFisico (tem peso, dimensões, estoque)
│   └── ProdutoDigital (tem link, acesso, licença)
└── Servico
    ├── ServicoProfissional (requer habilitação)
    ├── ServicoTecnico (requer ferramenta)
    └── ServicoContinuo (tem recorrência)
```

### 7.3 Hierarquia de Problema

```
Problema
├── Financeiro
│   ├── FaltaDeCaixa
│   ├── MargemBaixa
│   ├── Inadimplencia
│   └── Endividamento
├── Comercial
│   ├── PoucosClientes
│   ├── ChurnAlto
│   └── ConcorrenciaForte
├── Operacional
│   ├── Gargalo
│   ├── FaltaPessoa
│   └── ProcessoIneficiente
├── Estrategico
│   ├── RumoIncerteza
│   ├── OportunidadePerdida
│   └── PosicionamentoFraco
├── Humano
│   ├── EquipeDesalinhada
│   ├── DependenciaDoDono
│   └── FaltaHabilidade
└── Externo
    ├── RegulacaoNova
    ├── CriseEconomica
    └── MudancaDeMercado
```

## 8. Polimorfismo cognitivo

### 8.1 Um mesmo conceito pode ser múltiplos tipos

O mundo real não se encaixa perfeitamente em categorias. O polimorfismo cognitivo permite que um mesmo objeto seja classificado em múltiplos tipos simultaneamente.

| Objeto real | Tipo 1 | Tipo 2 | Explicação |
|-------------|--------|--------|------------|
| João é dono e barbeiro | Socio | Equipe | Acumula papéis |
| Produto digital (curso) | Produto | Servico | É tangível como produto, intangível como serviço |
| Veículo da empresa | Recurso | Produto (revenda) | É recurso operacional e pode ser vendido |
| Aluguel do ponto | Despesa | Investimento | É despesa mensal mas gera patrimônio |
| WhatsApp | Canal | Relacionamento | É canal de venda e meio de relacionamento |

### 8.2 Quando o polimorfismo é obrigatório

A IA deve permitir polimorfismo quando:

1. **O objeto claramente exerce múltiplos papéis** (ex: dono que também opera)
2. **O segmento do negócio exige dupla classificação** (ex: restaurante é serviço de alimentação + produto de comida)
3. **A empresa mesma classifica de forma diferente** (o empresário diz "meu produto é consultoria")
4. **Há evidência contraditória** (documento chama de produto, conversa chama de serviço)

## 9. Contradições e exceções ontológicas

### 9.1 Toda regra tem exceção

A ontologia define o que é **normalmente verdade**. Exceções são esperadas e não devem quebrar o modelo.

### 9.2 Exceções conhecidas

| Regra ontológica | Exceção possível | Como tratar |
|------------------|-----------------|-------------|
| Toda venda tem cliente | Venda anônima (sem identificação) | Cliente genérico "Anônimo" com confiança reduzida |
| Toda empresa tem CNPJ | MEI recente, profissional liberal sem CNPJ | Identificar por CPF do dono |
| Toda receita vem de venda | Receita de investimento, doação, prêmio | Categoria "OutrasReceitas" |
| Todo processo tem responsável | Processo tão informal que ninguém é dono | Marcar como "Processo Órfão" |

### 9.3 Registro de contradições

Quando uma regra ontológica é violada, o evento deve ser registrado:

```
ContradicaoOntologica {
  regra: "Toda venda tem cliente"
  evidencia: "Venda #452 sem campo cliente"
  fonte: "Importação de planilha incompleta"
  tratamento: "Cliente anônimo atribuído, confiança 0.20"
  data: 18/07/2026
}
```

Contradições frequentes indicam que a regra ontológica precisa ser revista.

## 10. Glossário ontológico

| Termo | Definição ontológica |
|-------|---------------------|
| Agente | Entidade capaz de agir e tomar decisões |
| Atributo | Propriedade descritiva de um objeto |
| Categoria | Classe ontológica abstrata |
| Classe | Conjunto de objetos que compartilham atributos |
| Domínio | Região do conhecimento com vocabulário e regras próprios |
| Herança | Subtipo que herda atributos do supertipo |
| Hierarquia | Relação de subordinação entre classes |
| Inferência | Conhecimento novo deduzido de conhecimento explícito |
| Instância | Objeto concreto que pertence a uma classe |
| Objeto | Entidade fundamental do modelo cognitivo |
| Ontologia | Especificação formal de uma conceitualização |
| Polimorfismo | Capacidade de um objeto ser múltiplos tipos |
| Relação | Conexão semântica entre dois objetos |
| Segmento | Classificação primária do negócio |
| Subtipo | Especialização de uma classe (herda + específica) |
| Supertipo | Generalização de múltiplas classes |
| Taxonomia | Hierarquia classificatória |
| Tipo | Classificação ontológica de um objeto |
| Vocabulário | Conjunto de termos normalizados |

---

> **Fim da Ontologia Empresarial**
> Próximo: `MODELO_DE_CONFIANCA.md` — Modelo detalhado de confiança e incerteza
