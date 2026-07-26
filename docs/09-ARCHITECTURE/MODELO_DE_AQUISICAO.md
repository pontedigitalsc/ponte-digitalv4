# Modelo de Aquisição — Como a IA Descobre Respostas

> **Programa 12 — Fase 1** | Patrimônio Intelectual da Ponte Digital
> Derivado de: MODELO_COGNITIVO_UNIVERSAL.md
> Nenhum código, classe, API, schema, migration ou engine foi criado.

---

## Índice

1. [Filosofia da aquisição](#1-filosofia-da-aquisição)
2. [Os 3 modos de aquisição](#2-os-3-modos-de-aquisição)
3. [Modo Ativo — Conversa](#3-modo-ativo--conversa)
4. [Modo Ativo — Observação](#4-modo-ativo--observação)
5. [Modo Passivo — Documentos](#5-modo-passivo--documentos)
6. [Modo Passivo — Integrações](#6-modo-passivo--integrações)
7. [Modo Reativo — Feedback](#7-modo-reativo--feedback)
8. [Inferência](#8-inferência)
9. [Ciclo de aquisição](#9-ciclo-de-aquisição)
10. [Priorização de fontes](#10-priorização-de-fontes)
11. [Estratégia por elemento](#11-estratégia-por-elemento)
12. [Conflito entre fontes](#12-conflito-entre-fontes)

---

## 1. Filosofia da aquisição

### 1.1 Princípios

1. **Nenhuma fonte é completa** — toda fonte tem lacunas, erros e vieses
2. **Toda fonte é bem-vinda** — informação parcial é melhor que nenhuma
3. **Convergência é o caminho** — múltiplas fontes convergindo = verdade aproximada
4. **O empresário é a fonte mais importante** — mas não a única nem a mais precisa
5. **Aquisição não é evento único** — é ciclo contínuo que nunca termina
6. **Qualidade > quantidade** — uma NF vale mais que 10 conversas
7. **Proveniência é obrigatória** — toda informação sabe de onde veio

### 1.2 O espectro da aquisição

```
Ativo (IA inicia)          Passivo (IA recebe)           Reativo (IA responde)
───── ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─
Perguntar                  Receber documento             Responder feedback
Observar                   Integrar sistema              Esclarecer dúvida
Sugerir                    Escutar mensagem              Corrigir rota
Escavar ("me conte mais")  Analisar histórico            Aceitar correção
Desafiar ("já pensou em?") Coletar dado público          Agradecer contribuição

<── MAIS INVASIVO                                    MENOS INVASIVO ──>
```

## 2. Os 3 modos de aquisição

### 2.1 Modo Ativo

A IA inicia a interação para obter informação.

| Subtipo | Descrição | Custo (tempo do empresário) | Confiança |
|---------|-----------|----------------------------|-----------|
| Pergunta direta | "Qual sua receita?" | 5 segundos | 0.60-0.85 |
| Pergunta adaptativa | Segue resposta anterior | 10-30 segundos | 0.65-0.85 |
| Escavação | "Me conte mais sobre..." | 1-5 minutos | 0.70-0.90 |
| Confirmação | "Isso está correto?" | 2 segundos | 0.85-0.95 |
| Sugestão | "Você sabia que pode importar?" | 5 segundos | N/A (educativo) |

### 2.2 Modo Passivo

A IA recebe informação sem solicitar ativamente.

| Subtipo | Descrição | Custo (tempo) | Confiança |
|---------|-----------|--------------|-----------|
| Documento enviado | Empresário faz upload | 1-5 minutos | 0.40-0.85 |
| Integração automática | API conectada | 0 | 0.70-0.85 |
| Mensagem recebida | WhatsApp, email | 0 | 0.35-0.70 |
| Dado público | CNPJ, redes sociais | 0 | 0.30-0.60 |
| Histórico de uso | Comportamento na plataforma | 0 | 0.40-0.60 |

### 2.3 Modo Reativo

A IA responde a um estímulo do empresário ou do sistema.

| Subtipo | Descrição | Custo | Confiança |
|---------|-----------|-------|-----------|
| Correção | "Isso está errado" | 5 segundos | 0.90 (correção) |
| Confirmação | "Isso está certo" | 2 segundos | 0.90 (confirmação) |
| Complemento | "Faltou dizer que..." | 10-30 segundos | 0.70-0.85 |
| Pergunta do empresário | "Por que minha receita caiu?" | 0 (iniciativa dele) | N/A |

## 3. Modo Ativo — Conversa

### 3.1 Técnicas de conversa

#### Pergunta aberta

"Como você descreveria seu negócio?"

- Vantagem: Revela o que o empresário considera importante
- Desvantagem: Pode ser vaga ou incompleta
- Quando usar: Início da conversa, fases 0-1

#### Pergunta fechada

"Você vende para pessoa física?"

- Vantagem: Resposta clara e rápida
- Desvantagem: Não revela contexto
- Quando usar: Para confirmar hipóteses, fases 3-5

#### Escavação

"Você mencionou que a demora é um problema. Me conte mais sobre isso."

- Vantagem: Revela detalhes que a pergunta direta não capturaria
- Desvantagem: Consome tempo
- Quando usar: Para entender causa raiz, fases 2-5

#### Confirmação

"Entendi que sua receita é R$ 14 mil. Está correto?"

- Vantagem: Aumenta confiança drasticamente
- Desvantagem: Nenhuma (rápida e eficaz)
- Quando usar: Sempre que tiver uma informação com confiança média

#### Confrontação educada

"Notei que em janeiro você disse que a receita era R$ 12 mil, mas agora diz R$ 14 mil. O que mudou?"

- Vantagem: Revela evolução ou contradição
- Desvantagem: Pode soar acusatório se mal usada
- Quando usar: Quando detectar contradição ou mudança significativa

### 3.2 Estrutura de uma conversa produtiva

```
1. Abertura: "João, tudo bem? Queria entender melhor sua barbearia."
2. Contexto: "Vi que você tem 3 cadeiras, certo?"
3. Pergunta: "Como está sendo o movimento este mês?"
4. Escuta: Processar resposta, identificar entidades
5. Aprofundamento: "Você disse que está mais cheio — quanto % a mais?"
6. Confirmação: "Então o movimento subiu uns 20%? É isso?"
7. Fechamento: "Obrigado, João! Isso me ajuda a entender melhor."
```

### 3.3 O que evitar em conversas

| Erro | Consequência |
|------|-------------|
| Muitas perguntas seguidas | Empresário se sente interrogado |
| Perguntas irrelevantes ao segmento | Empresário acha que IA não entende |
| Ignorar resposta anterior | Empresário sente que não é ouvido |
| Corrigir o empresário | Empresário se sente diminuído |
| Vocabulário técnico | Empresário não entende |
| Pressão por resposta | Empresário inventa resposta |

## 4. Modo Ativo — Observação

### 4.1 O que observar

A IA pode aprender observando o comportamento do empresário na plataforma:

| Comportamento | O que revela |
|--------------|-------------|
| Página que mais acessa | Prioridade do dono |
| O que nunca acessa | O que não considera importante |
| Horário de uso | Rotina, disponibilidade |
| O que busca | O que está tentando resolver |
| O que preenche vs. o que ignora | Lacunas de informação |
| Função mais usada | O que mais agrega valor |

### 4.2 Padrões de comportamento

```
Padrão detectado: João sempre acessa "Financeiro" no fim do dia
→ Inferência: João controla finanças diariamente
→ Ação: Oferecer resumo financeiro diário às 18h

Padrão detectado: João nunca acessou "Clientes"
→ Inferência: Clientes não são prioridade OU sistema de clientes não é útil
→ Ação: Perguntar "Você controla clientes? Como?"
```

### 4.3 Observação como menor invasão

A observação é o modo **menos invasivo** de aquisição. Não exige tempo do empresário. Mas também é o que produz informação de **menor confiança** (0.35-0.50), pois é indireta.

## 5. Modo Passivo — Documentos

### 5.1 Tipos de documento

| Tipo | Formato | Informação que produz | Confiança |
|------|---------|----------------------|-----------|
| Nota Fiscal | XML/PDF | Vendas, clientes, produtos, preços | 0.85-0.95 (XML) / 0.40-0.70 (PDF OCR) |
| Extrato bancário | PDF/OFX | Receitas, despesas, saldo | 0.70-0.85 |
| Planilha | XLSX/CSV | Qualquer dado tabular | 0.30-0.70 (depende da qualidade) |
| Contrato | PDF | Clientes, fornecedores, valores | 0.50-0.80 |
| Comprovante | Imagem/PDF | Pagamento, recebimento | 0.30-0.60 (OCR) |
| Relatório | PDF | Resumo gerencial | 0.50-0.75 |
| Site da empresa | HTML | Oferta, posicionamento | 0.40-0.60 |
| Conversa WhatsApp | TXT/API | Pedidos, reclamações, clientes | 0.35-0.70 |

### 5.2 Pipeline de processamento de documentos

```
Recebimento
    │
    ▼
Identificação do tipo (NF / extrato / planilha / ...)
    │
    ▼
Extração (XML parser / OCR / CSV parser / ...)
    │
    ▼
Normalização (campos → formato universal)
    │
    ▼
Validação (consistência interna, valores esperados)
    │
    ▼
Extra: Múltiplos docs → deduplicação e consolidação
    │
    ▼
Incorporação ao modelo cognitivo (com proveniência)
```

### 5.3 Estratégia por tipo de documento

```
NF XML:
  → Extração automática (100% dos campos)
  → Validação contra regras fiscais
  → Confiança 0.85-0.95

NF PDF:
  → OCR para extrair campos
  → Validação contra formato esperado
  → Se falhar: pedir XML ou dados manuais
  → Confiança 0.40-0.70

Planilha:
  → Detectar colunas por cabeçalho
  → Mapear colunas para objetos cognitivos
  → Validação: o empresário mapeou certo?
  → Confiança 0.30-0.70

Extrato bancário:
  → Categorizar transações (receita/despesa)
  → Detectar padrões de entrada/saída
  → Conciliar com NFs (se disponíveis)
  → Confiança 0.70-0.85
```

## 6. Modo Passivo — Integrações

### 6.1 Tipos de integração

| Sistema | O que fornece | Como | Confiança |
|---------|--------------|------|-----------|
| ERP (Omie, Bling, ContaAzul) | Vendas, compras, estoque, financeiro | API REST | 0.75-0.85 |
| CRM (RD Station, HubSpot) | Leads, pipeline, histórico | API REST | 0.70-0.80 |
| Banco (OFX, API) | Extrato, saldo, conciliação | API/OFX | 0.80-0.85 |
| E-commerce (Shopify, Loja Integrada) | Vendas, clientes, produtos | API REST | 0.75-0.85 |
| Google Sheets | Planilhas compartilhadas | API Google | 0.50-0.70 |
| Google Calendar | Agenda, compromissos | API Google | 0.75-0.85 |
| WhatsApp Business | Conversas, pedidos | API WhatsApp | 0.50-0.70 |
| Instagram/Facebook | Menções, leads | API Graph | 0.40-0.60 |

### 6.2 Estratégia de integração

```
Prioridade de integração (da mais para menos valiosa):

1. ERP financeiro (dados mais completos e estruturados)
2. Extrato bancário (dinheiro real, não estimativa)
3. CRM (clientes e pipeline)
4. E-commerce (vendas e produtos)
5. WhatsApp (conversas com clientes)
6. Agenda (compromissos)
7. Planilhas (dado que o empresário já organiza)
8. Redes sociais (menções e alcance)
```

### 6.3 Quando NÃO integrar

```
A integração NÃO é recomendada quando:
├── Empresa não tem o sistema (óbvio)
├── Empresa tem mas não usa (dado desatualizado)
├── Empresa tem mas não confia (dado não reflete realidade)
├── Custo de integração > benefício (API cara)
└── Risco de segurança (dado sensível sem proteção adequada)
```

## 7. Modo Reativo — Feedback

### 7.1 Tipos de feedback

| Tipo | Exemplo | Confiança | Ação |
|------|---------|-----------|------|
| Correção direta | "Isso está errado, minha receita é R$ 16 mil" | 0.90 | Substituir valor |
| Correção parcial | "O valor está certo, mas o período está errado" | 0.85 | Ajustar metadados |
| Confirmação | "Sim, está correto" | 0.90 | Aumentar confiança |
| Complemento | "Isso, e também tenho uma terceira cadeira" | 0.75 | Adicionar informação |
| Discordância suave | "Não é bem assim..." | 0.60 | Investigar |
| Ignorar | (empresário não responde) | N/A | Manter confiança atual |

### 7.2 Ciclo de feedback

```
IA apresenta → Empresário responde → IA processa → IA ajusta modelo
                                                         │
                    ←─── IA agradece e confirma ←────────┘

Exemplo:
  IA: "Sua receita é R$ 14 mil?"
  João: "Na verdade é R$ 16 mil — esse mês foi melhor"
  IA: "Obrigado pela correção! Vou atualizar para R$ 16 mil.
       Isso incluiu todos os canais ou só a loja?"
  João: "Só a loja — o Instagram vendeu mais R$ 2 mil"
  IA: "Perfeito! Então sua receita total é R$ 18 mil.
       Vou separar por canal para ficar mais preciso."
```

### 7.3 Quando pedir feedback

| Situação | Frequência |
|----------|-----------|
| Informação nova com confiança < 0.50 | Sempre |
| Informação crítica (finanças, clientes) | Sempre |
| Informação com confiança entre 0.50-0.70 | Às vezes |
| Informação com confiança > 0.80 | Raramente (só se mudou) |
| Informação confirmada pelo empresário | Não perguntar de novo |

## 8. Inferência

### 8.1 O que é inferência

Inferência é o processo de **deduzir nova informação a partir de informação existente**, sem nova coleta.

### 8.2 Tipos de inferência

| Tipo | Confiança | Exemplo |
|------|-----------|---------|
| **Dedução lógica** | 0.70-0.80 | CNPJ → segmento e regime tributário |
| **Correlação** | 0.40-0.60 | "Clientes que compram X também compram Y" |
| **Padrão estatístico** | 0.50-0.70 | "Ticket médio de R$ 47 → ~300 clientes/mês para R$ 14k" |
| **Analogia** | 0.20-0.40 | "Barbearias similares têm ticket entre R$ 40 e R$ 60" |
| **Tendência** | 0.30-0.50 | "Receita subiu 3 meses seguidos → tendência de alta" |
| **Completude** | 0.50-0.70 | "Tem 3 barbeiros, cada um atende 15/dia → ~45 atendimentos/dia" |

### 8.3 Regras de inferência

```
Regra 1: Toda inferência DEVE ser marcada como inferência (nunca como fato)
Regra 2: Toda inferência DEVE ter confiança ≤ confiança da fonte mais fraca
Regra 3: Inferências nunca validam outras inferências (cadeia não se auto-sustenta)
Regra 4: Inferência analógica requer no mínimo 3 empresas similares no banco
Regra 5: Inferência estatística requer no mínimo N observações (ver seção 5 do modelo de aprendizado)
```

## 9. Ciclo de aquisição

### 9.1 O ciclo completo

```
                 ┌────────────────────────────────┐
                 │        ESTADO ATUAL             │
                 │  (confianças, lacunas, dúvidas)  │
                 └────────────┬───────────────────┘
                              │
                              ▼
                 ┌────────────────────────────┐
                 │   AVALIAR PRÓXIMA AÇÃO      │
                 │  O que mais agrega valor?   │
                 └────────────┬───────────────┘
                              │
                    ┌─────────┴─────────┐
                    ▼                   ▼
           ┌──────────────┐   ┌──────────────────┐
           │ Coletar      │   │ Aguardar         │
           │ ativamente   │   │ passivamente     │
           └──────┬───────┘   └────────┬─────────┘
                  │                    │
                  ▼                    ▼
           ┌──────────────┐   ┌──────────────────┐
           │ Conversa /   │   │ Integração /     │
           │ Pergunta     │   │ Documento /      │
           │              │   │ Observação       │
           └──────┬───────┘   └────────┬─────────┘
                  │                    │
                  └─────────┬──────────┘
                            │
                            ▼
                 ┌────────────────────────┐
                 │ PROCESSAR INFORMAÇÃO    │
                 │ Extrair, normalizar,    │
                 │ validar                 │
                 └────────────┬───────────┘
                              │
                            ▼
                 ┌────────────────────────┐
                 │ INCORPORAR AO MODELO   │
                 │ Atualizar confianças,   │
                 │ preencher lacunas       │
                 └────────────┬───────────┘
                              │
                            ▼
                 ┌────────────────────────┐
                 │ AVALIAR NOVO ESTADO    │
                 │ Avançou de estado?     │
                 │ Lacunas resolvidas?    │
                 └────────────┬───────────┘
                              │
                            ──┼── (volta ao início)
```

### 9.2 Ciclo em modo contínuo

```
Minuto 0:      Estado atual (ex: Financeira, 5 lacunas)
Minuto 1:      Avaliar → "Preencher lacuna 'margem por oferta' é prioridade"
Minuto 2:      Coletar → "João, qual a margem do combo?"
Minuto 3:      Processar → João respondeu "uns 60%"
Minuto 4:      Incorporar → Margem do combo = 60% (confiança 0.50)
Minuto 5:      Avaliar → "Lacuna 'margem por oferta' preenchida. Próxima: validar com NF"
```

## 10. Priorização de fontes

### 10.1 Matriz de priorização

A IA deve escolher qual fonte usar baseada em:

```
Prioridade = (Valor × Urgência) / Custo

Valor:     Quanto a informação melhora o modelo (0-10)
Urgência:  Quão crítico é saber isso agora (0-10)
Custo:     Quanto tempo/energia do empresário ou da IA (0-10)
```

### 10.2 Exemplo de priorização

| Informação necessária | Valor | Urgência | Custo | Prioridade |
|----------------------|-------|----------|-------|------------|
| Segmento da empresa | 10 | 10 | 1 (pergunta rápida) | 100 |
| Margem do combo | 8 | 5 | 2 (precisa de dados) | 20 |
| Histórico de 3 anos | 5 | 2 | 8 (muitos dados) | 1.25 |
| NPS dos clientes | 7 | 4 | 5 (precisa pesquisar) | 5.6 |

### 10.3 Ordem recomendada de aquisição

```
1. CNPJ (automático, custo zero)
2. Conversa inicial (2 perguntas, alto valor)
3. Integração disponível (ERP, banco, CRM) (custo zero, alto valor)
4. Documentos (se o empresário tem organizados)
5. Conversa aprofundada (escavação)
6. Observação (comportamento na plataforma)
7. Feedback e correções (quando o empresário oferecer)
8. Inferência (quando nenhuma fonte direta disponível)
```

## 11. Estratégia por elemento

### 11.1 Qual fonte é melhor para cada elemento

| Elemento | Melhor fonte | Segunda melhor | Evitar |
|----------|-------------|----------------|--------|
| Identidade | CNPJ | Conversa | Inferência |
| Pessoas | Conversa | Documento (contrato) | Observação |
| Oferta | Conversa | Site/Redes | Inferência |
| Preços | NF / Cardápio | Conversa | Analogia |
| Processos | Conversa | Observação | Inferência |
| Agenda | Integração (Google) | Conversa | Estimativa |
| Receita | Extrato / NF | ERP | "Qual sua receita?" |
| Despesa | Extrato | NF de compra | Estimativa |
| Margem | NF + custo | Conversa | Analogia |
| Caixa | Extrato | Conversa | Inferência |
| Clientes | CRM / NF | Conversa | Observação |
| Problemas | Conversa | Feedback | Inferência |
| Conhecimento | Histórico + análise | Conversa | Suposição |

### 11.2 Estratégia combinada para cada fase

| Fase | Fonte primária | Fonte secundária | Confiança alvo |
|------|---------------|------------------|----------------|
| Fase 0 — Identificação | CNPJ (automático) | Conversa | 0.70 |
| Fase 1 — Esqueleto | Conversa | Site/Redes | 0.60 |
| Fase 2 — Operação | Conversa | Observação | 0.65 |
| Fase 3 — Finanças | Extrato + NF | ERP | 0.80 |
| Fase 4 — Clientes | CRM / NF | Conversa | 0.70 |
| Fase 5 — Problemas | Conversa | Feedback | 0.65 |
| Fase 6 — Conhecimento | Histórico | Conversa | 0.70 |
| Fase 7 — Validação | Empresário | N/A | 0.90 |

## 12. Conflito entre fontes

### 12.1 Quando fontes discordam

Duas fontes de aquisição dizem coisas diferentes sobre o mesmo objeto.

### 12.2 Matriz de resolução de conflitos

| Fonte A | Fonte B | Ação da IA |
|---------|---------|-----------|
| Conversa (0.70) | Extrato (0.85) | Confiar mais no extrato, mas registrar divergência |
| NF XML (0.90) | Planilha manual (0.40) | Confiar na NF, perguntar sobre a planilha |
| Empresário (0.85) | Documento (0.85) | Apresentar ambos, pedir confirmação |
| Integração (0.80) | Integração (0.80) | Investigar causa (sistema desatualizado?) |
| Inferência (0.30) | Conversa (0.60) | Confiar na conversa |
| Duas conversas (0.60) | Mesma pessoa (0.60) | Pessoa se contradisse — pedir esclarecimento |

### 12.3 Registro de conflito

Todo conflito entre fontes deve ser registrado:

```
ConflitoDeFontes {
  objeto: "Receita mensal"
  fonteA: {origem: "Conversa 15/07", valor: "R$ 14.000", confianca: 0.55}
  fonteB: {origem: "Extrato Julho", valor: "R$ 16.200", confianca: 0.85}
  possivelCausa: "Conversa pode ser de período diferente ou João não lembrou de tudo"
  resolucao: "Confiar em B (maior confiança), marcar A como desatualizada"
  dataRegistro: 18/07/2026
}
```

---

> **Fim do Modelo de Aquisição**
> Todos os 10 documentos do Programa 12 — Fase 1 foram concluídos.
> Voltar para: `MODELO_COGNITIVO_UNIVERSAL.md` — documento mestre
