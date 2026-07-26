# Relacionamentos Cognitivos — Grafo Completo

> **Programa 12 — Fase 1** | Patrimônio Intelectual da Ponte Digital
> Derivado de: MODELO_COGNITIVO_UNIVERSAL.md, OBJETOS_COGNITIVOS.md
> Nenhum código, classe, API, schema, migration ou engine foi criado.

---

## Índice

1. [O que é um relacionamento cognitivo](#1-o-que-é-um-relacionamento-cognitivo)
2. [Estrutura de um relacionamento](#2-estrutura-de-um-relacionamento)
3. [Grafo Mestre da Empresa](#3-grafo-mestre-da-empresa)
4. [Relacionamentos da Empresa](#4-relacionamentos-da-empresa)
5. [Relacionamentos de Pessoas](#5-relacionamentos-de-pessoas)
6. [Relacionamentos Comerciais](#6-relacionamentos-comerciais)
7. [Relacionamentos Operacionais](#7-relacionamentos-operacionais)
8. [Relacionamentos Financeiros](#8-relacionamentos-financeiros)
9. [Relacionamentos Decisórios](#9-relacionamentos-decisórios)
10. [Relacionamentos Cognitivos](#10-relacionamentos-cognitivos)
11. [Propriedades dos Relacionamentos](#11-propriedades-dos-relacionamentos)
12. [Caminhos Cognitivos — Navegação no Grafo](#12-caminhos-cognitivos)
13. [Regras de Integridade do Grafo](#13-regras-de-integridade-do-grafo)

---

## 1. O que é um relacionamento cognitivo

Um **relacionamento cognitivo** é a conexão entre dois objetos cognitivos que carrega significado semântico. Diferente de uma chave estrangeira em banco relacional, o relacionamento cognitivo possui:

- **Direção** — A → B (unidirecional ou bidirecional)
- **Tipo semântico** — "vende", "compra de", "gerou", "resolvido por"
- **Peso** — Força da conexão (0.0 a 1.0)
- **Confiança** — Quanto confiamos que este relacionamento existe
- **Proveniência** — Como descobrimos este relacionamento
- **Temporalidade** — Desde quando e até quando o relacionamento vale

### 1.1 Diferença para banco relacional

| Aspecto | Banco Relacional | Relacionamento Cognitivo |
|---------|-----------------|-------------------------|
| Conexão | Chave estrangeira (FK) | Conexão semântica nomeada |
| Rigidez | Obrigatório ou nulo | Pode ter peso e confiança |
| Direção | Normalmente bidirecional | Pode ser unidirecional |
| Temporalidade | Apenas o estado atual | Histórico de mudanças |
| Significado | "Pertence a" (relacional) | "vende", "comprou", "decidiu" (semântico) |

## 2. Estrutura de um relacionamento

Todo relacionamento possui:

```
RELACIONAMENTO {
    id:           string           // ID único no grafo
    origem:       ObjetoCognitivo  // Objeto de onde parte
    destino:      ObjetoCognitivo  // Objeto para onde vai
    tipo:         TipoRelacionamento // Ver seção 2.1
    direcao:      "unidirecional" | "bidirecional"
    peso:         float (0.0-1.0)  // Força da conexão
    confianca:    float (0.0-1.0)  // Confiança na existência
    fonte:        string           // Origem da informação
    criadoEm:     timestamp
    validoAte:    timestamp|null    // null = indefinido
    versao:       int
    atributos:    map              // Atributos específicos do tipo
}
```

## 3. Grafo Mestre da Empresa

### 3.1 Visão geral do grafo

```
                    ┌─────────────────────────────────────────────────────────────────┐
                    │                         EMPRESA (RAIZ)                           │
                    └──┬──┬──┬──┬──┬──┬──┬──┬──┬──┬──┬──┬──┬──┬──┬──┬──┬──┬──┬──┬──┘
                       │  │  │  │  │  │  │  │  │  │  │  │  │  │  │  │  │  │  │  │
   ┌───────────────────┘  │  │  │  │  │  │  │  │  │  │  │  │  │  │  │  │  │  │  └──────────┐
   │                      │  │  │  │  │  │  │  │  │  │  │  │  │  │  │  │  │  │             │
   ▼                      ▼  ▼  ▼  ▼  ▼  ▼  ▼  ▼  ▼  ▼  ▼  ▼  ▼  ▼  ▼  ▼  ▼  ▼             ▼
┌──────┐             ┌────────┐ ┌───┐ ┌───┐ ┌───┐ ┌────┐ ┌────┐ ┌────┐ ┌────┐        ┌──────────┐
│SÓCIOS│             │ EQUIPE │ │CLI│ │PRD│ │FRN│ │VEN │ │REC │ │DES │ │PRO │        │ PROBLEMAS│
│      │──►Empresa   │        │ │   │ │   │ │   │ │DA  │ │EITA│ │PESA│ │BLE │        │          │
│      │◄──Sócio     │──►Emp  │ │   │ │   │ │   │ │    │ │    │ │    │ │MA  │        │──►Empresa│
└──────┘             │──►Fun  │ │   │ │   │ │   │ │    │ │    │ │    │ │    │        │──►Decisão│
                     └────────┘ │   │ │   │ │   │ │    │ │    │ │    │ │    │        └──────────┘
                                └───┘ └───┘ └───┘ └────┘ └────┘ └────┘ └────┘
                                 CLI    PRD   FRN   VEN    REC    DES    PRO
                                 EN     UTO   ORN   DA     EITA   PESA   BLE
                                 TE     TO    ECE         │      │      MA
                                        │    DOR         │      │      │
                                        │                │      │      │
                                        ▼                ▼      ▼      ▼
                                   ┌────────┐      ┌──────────────────────┐
                                   │VENDA   │      │     RESULTADO        │
                                   │        │      │                      │
                                   │──►CLI  │      │◄──RECEITA + DESPESA  │
                                   │──►PRD  │      │                      │
                                   │──►REC  │      │──►APRENDIZADO        │
                                   │──►CANAL│      └──────────────────────┘
                                   └────────┘
```

## 4. Relacionamentos da Empresa

### 4.1 Empresa → (todos os objetos)

A Empresa é o nó raiz. Todo objeto no grafo se conecta à empresa por pelo menos um relacionamento.

| De | Relacionamento | Para | Direção | Peso | Descrição |
|---|---|---|---|---|---|
| Empresa | `tem_socio` | Socio | ↔ | 1.0 | Relação societária |
| Empresa | `tem_equipe` | Equipe | → | 0.9 | Vínculo empregatício |
| Empresa | `tem_prestador` | Prestador | → | 0.7 | Vínculo terceirizado |
| Empresa | `tem_parceiro` | Parceiro | → | 0.6 | Aliança comercial |
| Empresa | `vende` | Produto | → | 1.0 | Oferta ao mercado |
| Empresa | `presta` | Servico | → | 1.0 | Serviço oferecido |
| Empresa | `atende` | Cliente | → | 0.9 | Relação comercial |
| Empresa | `compra_de` | Fornecedor | → | 0.9 | Insumos |
| Empresa | `opera_em` | Local | → | 1.0 | Presença física/digital |
| Empresa | `usa` | Recurso | → | 0.9 | Ativo operacional |
| Empresa | `segue` | Processo | → | 0.8 | Fluxo de trabalho |
| Empresa | `tem_objetivo` | Objetivo | → | 0.7 | Direção estratégica |
| Empresa | `tem_meta` | Meta | → | 0.7 | Alvo quantificado |
| Empresa | `enfrenta` | Problema | → | 0.8 | Obstáculo ativo |
| Empresa | `tem_risco` | Risco | → | 0.6 | Risco identificado |
| Empresa | `tem_oportunidade` | Oportunidade | → | 0.5 | Oportunidade identificada |
| Empresa | `utiliza_canal` | Canal | → | 0.8 | Canal de vendas/comunicação |
| Empresa | `tem_divida` | Divida | → | 0.8 | Obrigação financeira |
| Empresa | `tem_credito` | Credito | → | 0.6 | Limite financeiro |
| Empresa | `tem_conhecimento` | Conhecimento | → | 0.7 | Patrimônio cognitivo |

## 5. Relacionamentos de Pessoas

### 5.1 Socio ↔ (demais objetos)

| De | Relacionamento | Para | Direção | Descrição |
|---|---|---|---|---|
| Socio | `e_socio_de` | Empresa | ↔ | Participação societária |
| Socio | `decidiu` | Decisao | → | Decisão tomada por este sócio |
| Socio | `tem_habilidade` | Habilidade | → | Competência do sócio |
| Socio | `ocupa_funcao` | Funcao | → | Papel na empresa |
| Socio | `informou` | Documento | → | Documento fornecido |

### 5.2 Equipe ↔ (demais objetos)

| De | Relacionamento | Para | Direção | Descrição |
|---|---|---|---|---|
| Equipe | `trabalha_em` | Empresa | ↔ | Vínculo empregatício |
| Equipe | `ocupa_funcao` | Funcao | → | Cargo ocupado |
| Equipe | `tem_habilidade` | Habilidade | → | Competência |
| Equipe | `executa` | Tarefa | → | Trabalho atribuído |
| Equipe | `participou` | Evento | → | Esteve em evento |
| Equipe | `responsavel_por` | Processo | → | Dono do processo |
| Equipe | `reporta_para` | Pessoa (socio/equipe) | → | Subordinação |
| Equipe | `decidiu` | Decisao | → | Decisão tomada |

### 5.3 Cliente ↔ (demais objetos)

| De | Relacionamento | Para | Direção | Descrição |
|---|---|---|---|---|
| Cliente | `e_cliente_de` | Empresa | → | Relação comercial |
| Cliente | `comprou` | Venda | → | Transação realizada |
| Cliente | `contratou` | Servico | → | Serviço contratado |
| Cliente | `adquiriu` | Produto | → | Produto comprado |
| Cliente | `enviou` | Documento | → | Documento compartilhado |
| Cliente | `relatou` | Problema | → | Problema reportado |
| Cliente | `deu_feedback` | Qualidade | → | Avaliação do serviço |
| Cliente | `agendou` | Agenda | → | Compromisso agendado |

### 5.4 Fornecedor ↔ (demais objetos)

| De | Relacionamento | Para | Direção | Descrição |
|---|---|---|---|---|
| Fornecedor | `fornece_para` | Empresa | → | Relação de insumo |
| Fornecedor | `vendeu` | Produto (insumo) | → | Produto vendido |
| Fornecedor | `recebeu_pedido` | Pedido (compra) | → | Pedido atendido |
| Fornecedor | `emitiu` | Documento (NF) | → | Documento fiscal |

## 6. Relacionamentos Comerciais

### 6.1 Venda ↔ (demais objetos)

| De | Relacionamento | Para | Direção | Descrição |
|---|---|---|---|---|
| Venda | `foi_de` | Cliente | → | Quem comprou |
| Venda | `envolveu` | Produto | → | Produto vendido |
| Venda | `envolveu` | Servico | → | Serviço prestado |
| Venda | `incluiu` | Combo | → | Combo vendido |
| Venda | `gerou` | Receita | → | Valor financeiro |
| Venda | `ocorreu_em` | Local | → | Onde ocorreu |
| Venda | `ocorreu_em` | Tempo | → | Quando ocorreu |
| Venda | `foi_por` | Canal | → | Canal de venda |
| Venda | `foi_realizada_por` | Pessoa | → | Quem vendeu |
| Venda | `produziu` | Documento (NF) | → | Documento gerado |

### 6.2 Produto ↔ (demais objetos)

| De | Relacionamento | Para | Direção | Descrição |
|---|---|---|---|---|
| Produto | `e_vendido_por` | Empresa | ↔ | Catálogo da empresa |
| Produto | `tem_preco` | Preco | → | Preço atual + histórico |
| Produto | `tem_estoque` | Estoque | → | Quantidade disponível |
| Produto | `e_fornecido_por` | Fornecedor | → | Origem do produto |
| Produto | `composto_por` | Produto (insumo) | → | Produto é insumo de outro |
| Produto | `faz_parte` | Combo | → | Integra oferta combinada |
| Produto | `foi_vendido_em` | Venda | → | Histórico de vendas |

### 6.3 Servico ↔ (demais objetos)

| De | Relacionamento | Para | Direção | Descrição |
|---|---|---|---|---|
| Servico | `e_prestado_por` | Empresa | ↔ | Catálogo de serviços |
| Servico | `tem_preco` | Preco | → | Valor do serviço |
| Servico | `requer` | Recurso | → | O que precisa para executar |
| Servico | `requer` | Habilidade | → | Competência necessária |
| Servico | `foi_contratado_em` | Venda | → | Histórico de vendas |
| Servico | `foi_avaliado` | Qualidade | → | Avaliação recebida |

### 6.4 Lead ↔ Pipeline

| De | Relacionamento | Para | Direção | Descrição |
|---|---|---|---|---|
| Lead | `esta_em` | Pipeline | → | Pipeline associado |
| Lead | `veio_de` | Canal | → | Origem do lead |
| Lead | `virou` | Cliente | → | Conversão |
| Lead | `foi_captado_por` | Pessoa | → | Responsável |

## 7. Relacionamentos Operacionais

### 7.1 Processo ↔ (demais objetos)

| De | Relacionamento | Para | Direção | Descrição |
|---|---|---|---|---|
| Processo | `pertence_a` | Empresa | → | Dono do processo |
| Processo | `tem_etapa` | Tarefa | → | Etapas do fluxo |
| Processo | `e_executado_por` | Pessoa | → | Responsável |
| Processo | `usa` | Recurso | → | Recursos necessários |
| Processo | `produz` | Produto/Servico | → | Saída do processo |
| Processo | `tem_gargalo` | Problema | → | Gargalo identificado |
| Processo | `e_afetado_por` | Problema | → | Problema no fluxo |
| Processo | `gerou` | Evento | → | Evento do processo |

### 7.2 Agenda ↔ (demais objetos)

| De | Relacionamento | Para | Direção | Descrição |
|---|---|---|---|---|
| Agenda | `pertence_a` | Empresa | → | Agenda da empresa |
| Agenda | `envolve` | Cliente | → | Cliente agendado |
| Agenda | `sera_executado_por` | Pessoa (equipe) | → | Profissional |
| Agenda | `e_para` | Servico | → | Serviço agendado |
| Agenda | `resultou_em` | Venda | → | Conversão |
| Agenda | `foi_cancelado` | Evento | → | Cancelamento registrado |

### 7.3 Estoque ↔ (demais objetos)

| De | Relacionamento | Para | Direção | Descrição |
|---|---|---|---|---|
| Estoque | `de` | Produto | → | Produto estocado |
| Estoque | `foi_reabastecido_por` | Compra | → | Origem do item |
| Estoque | `foi_consumido_em` | Venda | → | Saída por venda |
| Estoque | `foi_consumido_em` | Producao | → | Saída por produção |
| Estoque | `esta_em` | Local | → | Localização física |

## 8. Relacionamentos Financeiros

### 8.1 Receita ↔ (demais objetos)

| De | Relacionamento | Para | Direção | Descrição |
|---|---|---|---|---|
| Receita | `veio_de` | Venda | → | Origem da receita |
| Receita | `veio_de` | Cliente | → | Quem pagou |
| Receita | `compõe` | Resultado | → | Parte do resultado |
| Receita | `foi_registrada_em` | Documento | → | Comprovante |
| Receita | `afeta` | Caixa | → | Impacto no caixa |

### 8.2 Despesa ↔ (demais objetos)

| De | Relacionamento | Para | Direção | Descrição |
|---|---|---|---|---|
| Despesa | `veio_de` | Compra | → | Origem da despesa |
| Despesa | `veio_de` | Fornecedor | → | Quem recebeu |
| Despesa | `veio_de` | Equipe (salário) | → | Custo de pessoal |
| Despesa | `e_por` | Recurso | → | Manutenção/aquisição |
| Despesa | `compõe` | Resultado | → | Parte do resultado |
| Despesa | `afeta` | Caixa | → | Impacto no caixa |

### 8.3 Resultado ↔ (demais objetos)

| De | Relacionamento | Para | Direção | Descrição |
|---|---|---|---|---|
| Resultado | `composto_por` | Receita | ← | Receitas do período |
| Resultado | `composto_por` | Despesa | ← | Despesas do período |
| Resultado | `gerou` | Aprendizado | → | Lição do período |
| Resultado | `gerou` | Decisao | → | Decisão baseada no resultado |
| Resultado | `comparado_com` | Resultado (passado) | → | Série histórica |

### 8.4 Caixa ↔ (demais objetos)

| De | Relacionamento | Para | Direção | Descrição |
|---|---|---|---|---|
| Caixa | `recebeu` | Receita | ← | Entrada |
| Caixa | `enviou` | Despesa | → | Saída |
| Caixa | `e_afetado_por` | Divida | → | Pagamento de dívida |
| Caixa | `e_afetado_por` | Credito | → | Uso de crédito |

## 9. Relacionamentos Decisórios

### 9.1 Decisao ↔ (demais objetos)

| De | Relacionamento | Para | Direção | Descrição |
|---|---|---|---|---|
| Decisao | `foi_tomada_por` | Pessoa | → | Quem decidiu |
| Decisao | `afetou` | Empresa | → | Impacto na empresa |
| Decisao | `resolveu` | Problema | → | Problema solucionado |
| Decisao | `criou` | Problema | → | Novo problema gerado |
| Decisao | `foi_baseada_em` | Conhecimento | → | Base cognitiva |
| Decisao | `gerou` | Evento | → | Evento desencadeado |
| Decisao | `alterou` | Processo | → | Mudança de processo |
| Decisao | `exigiu` | Investimento | → | Recurso aplicado |

### 9.2 Problema ↔ (demais objetos)

| De | Relacionamento | Para | Direção | Descrição |
|---|---|---|---|---|
| Problema | `afeta` | Empresa | → | Impacto geral |
| Problema | `afeta` | Processo | → | Gargalo operacional |
| Problema | `reduz` | Receita | → | Impacto financeiro |
| Problema | `aumenta` | Despesa | → | Custo do problema |
| Problema | `causa` | Problema (outro) | → | Cadeia causal |
| Problema | `e_causado_por` | Problema (outro) | → | Causa raiz |
| Problema | `foi_resolvido_por` | Decisao | → | Solução aplicada |
| Problema | `persiste_desde` | Tempo | → | Cronologia |

### 9.3 Risco ↔ (demais objetos)

| De | Relacionamento | Para | Direção | Descrição |
|---|---|---|---|---|
| Risco | `ameaca` | Objetivo | → | Risco ao plano |
| Risco | `ameaca` | Empresa | → | Risco geral |
| Risco | `e_mitigado_por` | Decisao | → | Ação preventiva |
| Risco | `se_materializou_em` | Problema | → | Risco virou realidade |

### 9.4 Objetivo ↔ Meta

| De | Relacionamento | Para | Direção | Descrição |
|---|---|---|---|---|
| Objetivo | `desdobrado_em` | Meta | → | Meta quantifica o objetivo |
| Objetivo | `e_bloqueado_por` | Problema | → | Obstáculo ao objetivo |
| Objetivo | `e_apoiado_por` | Oportunidade | → | Alavanca |

## 10. Relacionamentos Cognitivos

### 10.1 Conhecimento ↔ (demais objetos)

| De | Relacionamento | Para | Direção | Descrição |
|---|---|---|---|---|
| Conhecimento | `veio_de` | Evento | → | Origem do aprendizado |
| Conhecimento | `veio_de` | Aprendizado | → | Ciclo de aprendizado |
| Conhecimento | `foi_validado_por` | Decisao | → | Teste que confirmou |
| Conhecimento | `foi_validado_por` | Resultado | → | Evidência quantitativa |
| Conhecimento | `aplicado_em` | Processo | → | Onde é útil |
| Conhecimento | `aplicado_em` | Decisao | → | Orienta escolhas |
| Conhecimento | `contradiz` | Conhecimento (outro) | ↔ | Conflito cognitivo |
| Conhecimento | `e_base_para` | Conhecimento (outro) | → | Hierarquia cognitiva |

### 10.2 Evento ↔ (demais objetos)

| De | Relacionamento | Para | Direção | Descrição |
|---|---|---|---|---|
| Evento | `ocorreu_em` | Empresa | → | Contexto |
| Evento | `envolveu` | Pessoa | → | Participantes |
| Evento | `produziu` | Documento | → | Registro gerado |
| Evento | `gerou` | Aprendizado | → | Lição extraída |
| Evento | `alterou_estado` | Objeto (qualquer) | → | Mudança de estado |
| Evento | `foi_gatilho_para` | Decisao | → | Decisão provocada |

### 10.3 Hipotese ↔ (demais objetos)

| De | Relacionamento | Para | Direção | Descrição |
|---|---|---|---|---|
| Hipotese | `baseada_em` | Padrao | → | Padrão observado |
| Hipotese | `baseada_em` | Evento | → | Evento específico |
| Hipotese | `testada_por` | Decisao | → | Experimento |
| Hipotese | `confirmada_em` | Conhecimento | → | Hipótese validada |
| Hipotese | `refutada_em` | Aprendizado | → | Hipótese rejeitada |

### 10.4 Padrao ↔ Anomalia

| De | Relacionamento | Para | Direção | Descrição |
|---|---|---|---|---|
| Padrao | `identificado_em` | Evento (múltiplos) | → | Base de observações |
| Padrao | `tem_excecao` | Anomalia | → | Desvios conhecidos |
| Anomalia | `desvia_de` | Padrao | → | Padrão violado |
| Anomalia | `pode_indicar` | Problema | → | Sinal de alerta |

## 11. Propriedades dos Relacionamentos

### 11.1 Cardinalidade

Cada relacionamento tem cardinalidade que define quantas conexões são possíveis:

| Cardinalidade | Exemplo | Significado |
|---|---|---|
| 1:1 | Empresa → Constituição | Uma empresa tem um contrato social |
| 1:N | Empresa → Produto | Uma empresa vende múltiplos produtos |
| N:N | Venda → Produto | Uma venda tem múltiplos produtos, um produto está em múltiplas vendas |
| 1:0..N | Empresa → Risco | Uma empresa pode ter zero ou múltiplos riscos |

### 11.2 Temporalidade

Relacionamentos podem ser temporais:

| Tipo | Exemplo | Implicação |
|---|---|---|
| Permanente | Empresa → Sócio | Vale desde a fundação |
| Periódico | Venda → Produto | Vale apenas para aquela venda |
| Vigente | Equipe → Empresa | Vale durante o contrato |
| Histórico | Preco → Produto | Preços anteriores ainda são acessíveis |

### 11.3 Propagação de confiança

Quando um relacionamento A → B existe com confiança C1, e outro B → C existe com confiança C2:

```
Confiança(A → B → C) = min(C1, C2) × 0.90
```

O fator 0.90 é a penalidade de salto. Quanto mais saltos, menor a confiança.

### 11.4 Regras de peso

O peso de um relacionamento pode ser dinâmico:

| Regra | Como funciona | Exemplo |
|---|---|---|
| Peso fixo | Definido pelo tipo do relacionamento | "Empresa tem_socio Socio" sempre peso 1.0 |
| Peso por frequência | Aumenta com mais ocorrências | "Cliente comprou Produto" pesa mais se compra sempre |
| Pego por recência | Aumenta com dados recentes | "Equipe executou Processo" pesa mais se executou hoje |
| Peso por valor | Determinado por valor financeiro | "Venda gerou Receita" pesa mais se receita alta |

## 12. Caminhos Cognitivos

Caminhos são sequências de relacionamentos que respondem perguntas específicas sobre a empresa.

### 12.1 Caminho da rentabilidade

```
Empresa → vende → Produto
    ↓                ↓
  Receita          Custo (via Estoque → Compra)
    ↓                ↓
  Resultado ←── Margem ←──
```

### 12.2 Caminho do problema

```
Problema → afeta → Processo
   ↓                  ↓
 Causa Raiz        Gargalo
   ↓                  ↓
 Decisao → resolveu → Problema
   ↓
 Aprendizado
```

### 12.3 Caminho do cliente

```
Canal → captou → Lead → Pipeline → virou → Cliente
                                                ↓
                                         comprou → Venda
                                                     ↓
                                              gerou → Receita → Resultado
                                                     ↓
                                              gerou → Qualidade → Aprendizado
```

### 12.4 Caminho do conhecimento

```
Evento → gerou → Padrao → baseou → Hipotese → testada_por → Decisao
                                                               ↓
                                                        Resultado
                                                               ↓
                                                   confirmou → Conhecimento
                                                               ↓
                                                        aplicado_em → Processo
```

### 12.5 Caminho da crise

```
Evento externo → afeta → Receita (cai)
                            ↓
                        Caixa (negativo)
                            ↓
                        Problema (financeiro)
                            ↓
                        Decisao (urgente)
                            ↓
                        Risco materializado
                            ↓
                        Crise
```

## 13. Regras de Integridade do Grafo

### 13.1 Regras estruturais

1. **Toda aresta conecta dois objetos existentes** — não pode haver relacionamento órfão
2. **Empresa é o nó raiz único** — todo objeto tem pelo menos um caminho até a empresa
3. **Nenhum objeto existe sem empresa** — exceto objetos independentes (ex: Pessoa que ainda não é cliente de ninguém)
4. **Venda sempre tem um Cliente** — não existe venda sem comprador
5. **Receita sempre veio de uma Venda** — não existe receita sem transação
6. **Resultado sempre tem Receita + Despesa** — não existe resultado vazio
7. **Problema sempre tem impacto** — todo problema afeta pelo menos um objeto

### 13.2 Regras de consistência

8. **Conflito deve ser armazenado, nunca resolvido** — duas fontes contraditórias coexistem com suas respectivas confianças
9. **Nunca deletar relacionamento, apenas marcar como obsoleto** — o histórico é imutável
10. **Proveniência é obrigatória** — todo relacionamento sabe de onde veio
11. **Peso e confiança são obrigatórios** — não existe relacionamento sem métrica de qualidade

### 13.3 Regras de navegação

12. **Caminhos curtos são preferíveis** — conhecimento com menos saltos tem mais confiança
13. **Caminhos circulares são permitidos** — mas devem ser identificados para evitar loops de inferência
14. **Múltiplos caminhos entre mesmos nós são válidos** — cada um representa perspectiva diferente

---

> **Fim do Grafo de Relacionamentos Cognitivos**
> Próximo: `ONTOLOGIA_EMPRESARIAL.md` — Ontologia formal de domínio empresarial
