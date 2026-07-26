# Modelo de Reconstrução — Como a Ponte Digital Reconstrói uma Empresa

> **Programa 12 — Fase 1** | Patrimônio Intelectual da Ponte Digital
> Derivado de: MODELO_COGNITIVO_UNIVERSAL.md
> Nenhum código, classe, API, schema, migration ou engine foi criado.

---

## Índice

1. [O problema da reconstrução](#1-o-problema-da-reconstrução)
2. [Visão geral do processo](#2-visão-geral-do-processo)
3. [Fase 0 — Identificação Inicial](#3-fase-0)
4. [Fase 1 — Esqueleto](#4-fase-1)
5. [Fase 2 — Operação](#5-fase-2)
6. [Fase 3 — Finanças](#6-fase-3)
7. [Fase 4 — Clientes](#7-fase-4)
8. [Fase 5 — Problemas e Decisões](#8-fase-5)
9. [Fase 6 — Conhecimento](#9-fase-6)
10. [Fase 7 — Validação](#10-fase-7)
11. [Estratégias por cenário de entrada](#11-estratégias-por-cenário)
12. [Reconstrução incremental](#12-reconstrução-incremental)
13. [Indicadores de progresso](#13-indicadores-de-progresso)
14. [Armadilhas da reconstrução](#14-armadilhas)

---

## 1. O problema da reconstrução

### 1.1 Começando do zero

Quando a Ponte Digital encontra uma empresa pela primeira vez, o estado cognitivo é **Desconhecida**. Nada se sabe:

- Não sabe o segmento
- Não sabe o que vende
- Não sabe quantas pessoas são
- Não sabe se tem clientes
- Não sabe se fatura
- Não sabe quais problemas enfrenta

É uma **tábula rasa**. O processo de reconstrução preenche essa tábula até que a empresa seja cognitivamente compreendida.

### 1.2 Por que não é "só perguntar"?

| Abordagem ingênua | Problema |
|-------------------|----------|
| Fazer 100 perguntas de uma vez | Empresário abandona |
| Fazer perguntas na mesma ordem para todos | Perguntas irrelevantes para o segmento |
| Só usar conversa | Depende da disposição do empresário |
| Só usar integração | Empresa pode não ter sistema integrado |
| Confiar em tudo que o empresário diz | Sujeito a erro, viés ou esquecimento |

### 1.3 O princípio da reconstrução

A reconstrução não é um **evento**. É um **processo contínuo** que:

1. Começa com o mínimo possível (não o máximo)
2. Usa múltiplas fontes (não apenas uma)
3. Prioriza o que mais agrega valor (não o que é mais fácil)
4. Respeita o ritmo do empresário (não o cronograma da IA)
5. Aceita o incompleto (melhor parcial que nada)
6. Melhora com o tempo (nunca está "pronta")

## 2. Visão geral do processo

### 2.1 As 8 fases

```
FASE 0 ─── Identificação Inicial
  Entrada: CNPJ ou nome
  Saída: Segmento, porte, localização
  Esforço: 1 minuto
  Confiança: 0.30-0.50

FASE 1 ─── Esqueleto
  Entrada: Identidade mínima
  Saída: Pessoas, Oferta, Recursos principais
  Esforço: 5-10 minutos
  Confiança: 0.40-0.60

FASE 2 ─── Operação
  Entrada: Esqueleto
  Saída: Processos, Agenda, Fluxo operacional
  Esforço: 15-30 minutos
  Confiança: 0.50-0.70

FASE 3 ─── Finanças
  Entrada: Operação
  Saída: Receitas, Despesas, Margens, Caixa
  Esforço: 30-60 minutos
  Confiança: 0.50-0.80

FASE 4 ─── Clientes
  Entrada: Operação + Finanças
  Saída: Perfil de clientes, Comportamento, Jornada
  Esforço: 20-40 minutos
  Confiança: 0.50-0.75

FASE 5 ─── Problemas e Decisões
  Entrada: Tudo acima
  Saída: Problemas, Decisões, Riscos
  Esforço: 15-30 minutos
  Confiança: 0.40-0.70

FASE 6 ─── Conhecimento
  Entrada: Tudo acima
  Saída: Padrões, Aprendizados, Conhecimento
  Esforço: Contínuo
  Confiança: 0.30-0.85

FASE 7 ─── Validação
  Entrada: Modelo completo
  Saída: Modelo validado pelo empresário
  Esforço: 10-20 minutos
  Confiança: 0.70-0.95
```

### 2.2 Tempo total estimado

| Modo | Tempo total | Descrição |
|------|------------|-----------|
| Conversa pura | 2-3 horas | Todas as fases via diálogo |
| Conversa + documentos | 1-2 horas | Documentos aceleram fases 3-4 |
| Conversa + integração | 30-60 min | ERP/CRM automatizam fases 2-4 |
| Completo (todas fontes) | 20-40 min | Mínimo esforço do empresário |
| Mínimo (só conversa inicial) | 5 min | Só fase 0-1, depois incremental |

## 3. Fase 0 — Identificação Inicial

### 3.1 Objetivo

Sair de "não sei nada" para "sei o básico": o que é, onde está, quanto tem de porte.

### 3.2 Fontes possíveis

| Fonte | Como | Confiança |
|-------|------|-----------|
| CNPJ (dados públicos) | Consulta automática | 0.70-0.90 |
| Conversa inicial | "Qual o nome do seu negócio?" | 0.50-0.70 |
| Site/Redes sociais | Crawler | 0.40-0.60 |
| Indicação de terceiro | "Meu amigo indicou" | 0.30-0.50 |

### 3.3 O que produzir

```
Empresa {
  nome: "Barbearia do João"
  segmento: "Barbearia" (inferido ou declarado)
  porte: "MEI" (inferido)
  localizacao: "São Paulo, SP"
  fundacao: "Julho/2025" (declarado)
  estado_inicial: "Superficial"
}
```

### 3.4 Perguntas mínimas

Se for por conversa, no máximo 2 perguntas:

1. "Qual o nome do seu negócio e o que você faz?"
2. "Onde você atua?"

Todo o resto (segmento, porte) pode ser inferido do CNPJ ou da resposta.

## 4. Fase 1 — Esqueleto

### 4.1 Objetivo

Montar a estrutura básica da empresa: quem são as pessoas, o que vendem, como se organizam.

### 4.2 O que precisa ser descoberto

| Informação | Como descobre | Pergunta |
|------------|--------------|----------|
| Pessoas chave | Conversa | "Quantas pessoas trabalham com você?" |
| Oferta principal | Conversa/site | "O que você vende?" |
| Precificação | Conversa | "Quanto custa?" |
| Modelo de venda | Conversa | "Como você vende?" |
| Organização | Conversa | "Como vocês se organizam?" |

### 4.3 Perguntas adaptativas

Dependendo da resposta da fase 0, as perguntas mudam:

```
Se segmento = Barbearia:
  "Quantas cadeiras você tem?" (recurso crítico)
  "Você trabalha sozinho ou tem equipe?" (pessoas)

Se segmento = Restaurante:
  "Quantos lugares?" (recurso crítico)
  "Trabalha com delivery?" (canal)

Se segmento = Oficina:
  "Quantos veículos atende por semana?" (volume)
  "Tem sistema de agendamento?" (processo)
```

### 4.4 Saída esperada

```
Pessoa: João (sócio, barbeiro)
Pessoa: Carlos (equipe, barbeiro)
Pessoa: Maria (equipe, recepcionista)

Oferta: Corte (R$ 45)
Oferta: Barba (R$ 25)
Oferta: Corte + Barba (R$ 60)

Recurso: 3 cadeiras, 2 tesouras, 1 máquina
```

## 5. Fase 2 — Operação

### 5.1 Objetivo

Entender como a empresa funciona no dia a dia: processos, agenda, fluxo operacional.

### 5.2 O que precisa ser descoberto

| Informação | Como descobre |
|------------|--------------|
| Processos principais | "Como é um dia normal?" |
| Gargalos operacionais | "O que mais atrasa?" |
| Agenda e horários | "Qual o horário de funcionamento?" |
| Controle de estoque | "Como controla o que tem?" |
| Cadeia de fornecedores | "De quem você compra?" |

### 5.3 Pergunta-chave

"Me conte como foi seu último atendimento do começo ao fim."

Esta pergunta revela:
- O processo completo
- Quem faz cada etapa
- Quanto tempo leva
- Onde há gargalos
- O que funciona bem

### 5.4 Saída esperada

```
Processo: Atendimento [etapas: recepcionar → aguardar → executar → pagar]
Processo: Compras [etapas: perceber falta → pedir → receber → pagar]

Gargalo: Só 1 barbeiro no horário 14h-16h
Gargalo: Tesoura cega e não tem reserva

Agenda: Seg-Sex 9h-19h, Sáb 9h-14h
Fornecedor: BelezaBella (tesouras, máquinas)
```

## 6. Fase 3 — Finanças

### 6.1 Objetivo

Entender o fluxo financeiro: quanto entra, quanto sai, quanto sobra.

### 6.2 O que precisa ser descoberto

| Informação | Melhor fonte | Fonte alternativa |
|------------|-------------|-------------------|
| Receita mensal | Extrato bancário | "Quanto você fatura por mês?" |
| Despesas fixas | Extrato + contrato | "Quais contas fixas você tem?" |
| Despesas variáveis | Histórico de compras | "Quanto gasta com insumos?" |
| Margem por oferta | NF de venda + custo | "Qual serviço dá mais lucro?" |
| Fluxo de caixa | Extrato dos últimos meses | "Sobra dinheiro no fim do mês?" |
| Dívidas | Contratos | "Tem alguma dívida?" |

### 6.3 Estratégia de aproximação

A IA nunca deve perguntar "Qual sua receita?" sem antes:

1. Explicar **por que** precisa saber ("Para calcular sua margem")
2. Oferecer alternativa ("Pode ser o extrato, a NF ou você me falar")
3. Aceitar **range** ("Entre R$ 10 mil e R$ 20 mil?")

### 6.4 Saída esperada

```
Receita mensal: R$ 14.200 (confiança 0.70)
Despesa mensal: R$ 8.500 (confiança 0.60)
├── Aluguel: R$ 2.500
├── Salários: R$ 4.500
└── Insumos: R$ 1.500
Resultado: R$ 5.700 (confiança 0.55)
Margem líquida: 40% (confiança 0.50)
```

## 7. Fase 4 — Clientes

### 7.1 Objetivo

Entender quem compra, como compra, por que compra, por que para de comprar.

### 7.2 O que precisa ser descoberto

| Informação | Como descobre |
|------------|--------------|
| Perfil de clientes | "Quem mais compra de você?" |
| Frequência de compra | "Seus clientes voltam com qual frequência?" |
| Ticket médio | Calculado de receita / número de vendas |
| Satisfação | "O que os clientes mais elogiam e reclamam?" |
| Churn | "Por que clientes deixam de comprar?" |
| Aquisição | "Como novos clientes te encontram?" |

### 7.3 Indicadores mínimos

```
Número de clientes ativos: 120
Ticket médio: R$ 47
Frequência: 1.3x/mês
Churn mensal: ~5%
NPS estimado: 7 (bom)
Origem principal: indicação (45%), Instagram (30%)
```

### 7.4 O que revela

Com estas informações, a IA pode:
- Calcular LTV aproximado (R$ 47 × 1.3 × 20 meses = R$ 1.222)
- Identificar canal de aquisição mais eficaz
- Detectar risco de churn em clientes que não compram há N dias

## 8. Fase 5 — Problemas e Decisões

### 8.1 Objetivo

Identificar o que impede a empresa de crescer e como as decisões são tomadas.

### 8.2 O que precisa ser descoberto

| Informação | Pergunta |
|------------|----------|
| Maior problema atual | "O que mais te preocupa hoje?" |
| Problemas recorrentes | "Qual problema aparece todo mês?" |
| Causa raiz | "Por que isso acontece?" |
| Decisões recentes | "Que decisão importante você tomou este mês?" |
| Quem decide | "Quem decide o quê aqui?" |
| Critério de decisão | "Como você sabe se uma decisão foi boa?" |

### 8.3 Técnica dos 5 porquês

Para cada problema mencionado, perguntar "por quê?" até 5 vezes:

```
"Demora no atendimento" → "Por quê?"
"Só 1 barbeiro no horário" → "Por quê?"
"Carlos trabalha só de manhã" → "Por quê?"
"Carlos estuda à tarde" → "Por quê?"
"Contrato de meio período" → Causa raiz encontrada
```

### 8.4 Saída esperada

```
Problema #1: Demora no atendimento 14h-16h
  Causa raiz: Apenas 1 barbeiro (João) cobre almoço
  Impacto: Perda estimada de 3 clientes/dia = R$ 3.240/mês
  Solução tentada: Nenhuma
  Decisão necessária: Contratar mais 1 barbeiro

Problema #2: Tesoura vive ficando cega
  Causa raiz: Tesoura de baixa qualidade
  Impacto: Retrabalho, insatisfação
  Solução: Comprar tesoura profissional (R$ 200)
  Decisão: Pendente — João está avaliando custo-benefício
```

## 9. Fase 6 — Conhecimento

### 9.1 Objetivo

Extrair padrões, regras e aprendizados que a empresa já possui (muitas vezes de forma tácita).

### 9.2 O que extrair

| Tipo | Descrição | Exemplo |
|------|-----------|---------|
| Padrão | Comportamento que se repete | "Segunda é o dia mais fraco" |
| Regra | Princípio que norteia | "Não trabalho com desconto" |
| Aprendizado | Lição de experiência | "Tesoura X dura mais que Y" |
| Correlação | Uma coisa ligada a outra | "Cliente de barba também compra pomada" |
| Exceção | Caso que foge à regra | "Cliente antigo pode pagar depois" |
| Crença | Algo que o dono acredita | "Cliente prefere atendimento rápido" |

### 9.3 Como extrair conhecimento tácito

A IA não pergunta "qual seu conhecimento?" — extrai por observação e conversa indireta:

```
Observação:
  IA nota que toda segunda-feira tem menos clientes.
  IA pergunta: "Percebi que segunda é mais fraco — você já pensou em fechar nesse dia?"

Conversa indireta:
  João: "Sempre compro tesoura da marca X"
  IA: "Parece que você prefere a marca X — por quê?"
  João: "Dura mais, já testei outras"
  → Conhecimento extraído: "Tesoura X é melhor" com confiança média

Histórico de decisões:
  IA: "Você mencionou que contratou Carlos em março. O que mudou depois disso?"
  João: "Atendi 40% mais clientes"
  → Conhecimento extraído: "2 barbeiros = +40% capacidade"
```

### 9.4 Saída esperada

```
Conhecimento #1: Segunda-feira é 40% mais fraco que outros dias
  Confiança: 0.80 (padrão de 6 meses)
  Aplicação: Fechar uma cadeira na segunda (economia de energia/insumos)

Conhecimento #2: Tesoura marca X dura 3x mais que marca Y
  Confiança: 0.75 (experiência de 2 anos)
  Aplicação: Comprar sempre marca X

Conhecimento #3: Cliente que faz combo volta 2x mais
  Confiança: 0.60 (observação de 3 meses)
  Aplicação: Oferecer combo no início do atendimento
```

## 10. Fase 7 — Validação

### 10.1 Objetivo

O empresário confirma ou corrige o modelo construído pela IA.

### 10.2 Como validar

Apresentar um **resumo cognitivo** em linguagem natural:

```
"João, deixa eu ver se entendi sua barbearia:

Você tem 3 cadeiras, trabalha com João e Carlos de barbeiros
e Maria na recepção. Vende corte (R$ 45), barba (R$ 25)
e combo (R$ 60). Fatura cerca de R$ 14 mil por mês
com margem de 40%.

Seu maior problema é a demora no período da tarde,
quando só você atende. E você já percebeu que
segunda-feira é mais fraco e que cliente de combo volta mais.

Isso está certo?"
```

### 10.3 O que o empresário pode fazer

| Ação | Significado | Confiança após |
|------|-------------|----------------|
| "Tudo certo" | Modelo validado | 0.90+ em todas as informações |
| "A receita é R$ 16 mil, não R$ 14 mil" | Correção de valor | 0.95 no valor corrigido |
| "Faltou dizer que tenho outro barbeiro" | Complemento | Nova informação em nível Alto |
| "Isso não é bem assim..." | Discordância | Revisar com base no feedback |
| "Não sei, acho que sim" | Confirmação fraca | 0.70 nas informações duvidosas |

### 10.4 Lacunas expostas

Ao final da validação, a IA identifica o que **ainda não sabe**:

```
Lacunas remanescentes:
1. Margem exata do combo Corte+Barba (não calculada)
2. Número exato de clientes (estimativa)
3. Churn rate (não medido)
4. Satisfação do cliente (não pesquisada)
```

## 11. Estratégias por cenário de entrada

### 11.1 Matriz de estratégia

| Cenário | Foco | Fases puladas | Estratégia |
|---------|------|---------------|------------|
| Conversa pura | Fases 0-1-2-5 | 3-4 (parciais) | Mais perguntas, aceitar ranges |
| Planilha enviada | Fases 3-4 | 2 (parcial) | Extrair dados, validar consistência |
| ERP integrado | Fases 3-4-6 | 2 (parcial) | Dados estruturados, focar em conhecimento tácito |
| CRM integrado | Fase 4 | 2-5 (parciais) | Clientes mapeados, focar em processo e problemas |
| WhatsApp integrado | Fases 4-5 | Todas parciais | Extrair clientes e problemas das conversas |
| Documentos (NF, contrato) | Fase 3 | 4 (parcial) | Finanças de documentos, clientes por conversa |
| Tudo integrado | Todas | Nenhuma | Foco em validação e conhecimento tácito |

### 11.2 Exemplo: entrada só por conversa

```
Barbearia do João — entrada por WhatsApp:

Dia 1: Fase 0 (5 min) → "Qual seu negócio?" → Identificada
Dia 1: Fase 1 (10 min) → "O que vende, com quem trabalha?" → Esqueleto
Dia 2: Fase 2 (15 min) → "Como é um dia normal?" → Operacional
Dia 3: Fase 3 (15 min) → "Quanto fatura?" → Financeira (ranges)
Dia 3: Fase 4 (10 min) → "Quem são seus clientes?" → Comercial (parcial)
Dia 4: Fase 5 (10 min) → "Qual maior problema?" → Diagnosticada
Dia 5: Fase 7 (5 min) → "Isso está certo?" → Validada (parcial)

Total: 5 dias, ~70 min de conversa, confiança média 0.65
```

### 11.3 Exemplo: entrada com ERP + extrato

```
Barbearia do João — entrada com integração:

Minuto 1: Fase 0 → automática (CNPJ)
Minuto 2: Fase 1 → complemento de conversa
Minuto 5: Fase 3 → automática (extrato + NF → finanças completas)
Minuto 10: Fase 4 → automática (NF → clientes mapeados)
Minuto 15: Fase 2 → conversa para processo e gargalos
Minuto 20: Fase 5 → conversa para problemas
Minuto 25: Fase 7 → validação

Total: 25 minutos, confiança média 0.80
```

## 12. Reconstrução incremental

### 12.1 A reconstrução nunca termina

Uma vez que a empresa atinge o estado Validada, a reconstrução continua em modo **incremental**:

```
Modo contínuo:
├── Novos eventos são percebidos e incorporados
├── Conhecimento é revalidado periodicamente
├── Lacunas são preenchidas quando possível
├── Decaimento temporal é monitorado
├── Mudanças na empresa são detectadas
└── Aprendizados são extraídos continuamente
```

### 12.2 Priorização de lacunas

A IA deve priorizar o preenchimento de lacunas baseada em:

```
Prioridade = Impacto × Urgencia × Facilidade

Impacto: quanto falta para o modelo ser útil
Urgencia: o dado vai desatualizar rápido?
Facilidade: quão fácil é conseguir a informação?

Exemplo:
  Margem do combo: impacto 7, urgencia 3, facilidade 5 → prioridade 105
  CPF dos clientes: impacto 2, urgencia 5, facilidade 8 → prioridade 80
  Segmento exato: impacto 9, urgencia 1, facilidade 9 → prioridade 81
```

## 13. Indicadores de progresso

### 13.1 Métricas da reconstrução

| Indicador | Como medir | Meta |
|-----------|-----------|------|
| Cobertura | % de objetos cognitivos preenchidos | ≥ 70% |
| Confiança média | Média dos scores de confiança | ≥ 0.70 |
| Lacunas abertas | Número de lacunas registradas | ≤ 20 |
| Estado cognitivo | Estado atual da empresa (9 níveis) | ≥ Cognitiva |
| Tempo desde último contato | Dias desde última interação | ≤ 30 |
| Validações pendentes | Informações que precisam de confirmação | ≤ 5 |

### 13.2 Dashboard conceitual

```
BARBEARIA DO JOÃO — RECONSTRUÇÃO

Estado: Diagnosticada (Fase 5 concluída)
Cobertura: 42/58 objetos (72%)
Confiança média: 0.68

Fases concluídas:
✅ Fase 0: Identificação
✅ Fase 1: Esqueleto
✅ Fase 2: Operação
✅ Fase 3: Finanças (parcial — margens não calculadas)
✅ Fase 4: Clientes
✅ Fase 5: Problemas
⏳ Fase 6: Conhecimento (3 extraídos, 5 hipóteses)
⏳ Fase 7: Validação pendente

Lacunas prioritárias:
- Margem do combo Corte+Barba
- NPS dos clientes
- Churn rate

Próxima ação sugerida: Validar modelo com João (Fase 7)
```

## 14. Armadilhas da reconstrução

### 14.1 O que evitar

| Armadilha | Problema | Como evitar |
|-----------|----------|-------------|
| Pressa | Empresário se sente interrogado | Respeitar ritmo, pausas, dias |
| Complexidade | Modelo muito detalhado | Focar no essencial primeiro |
| Suposição | Achar que empresa segue padrão | Perguntar, nunca assumir |
| Viés de segmento | Assumir que toda barbearia é igual | Perguntar o específico |
| Confiança cega | Acreditar em resposta única | Cruzar fontes |
| Esquecimento do tácito | Ignorar o que não é dito | Observar comportamento |

### 14.2 Sinais de que algo está errado

```
Sinais de alerta:
├── Empresário contradiz informação que ele mesmo deu antes
├── Dados financeiros não fecham (receitas < despesas mas empresa não quebrou)
├── Processos descritos não correspondem à observação
├── Clientes informados não aparecem em NFs
├── Problemas mencionados não têm impacto mensurável
└── Empresário parece estar respondendo o que "acha que a IA quer ouvir"
```

---

> **Fim do Modelo de Reconstrução**
> Próximo: `MODELO_DE_ESTADOS.md` — Estados cognitivos da empresa
