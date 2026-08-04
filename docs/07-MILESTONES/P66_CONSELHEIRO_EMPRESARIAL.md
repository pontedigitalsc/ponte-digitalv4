# P66 — O Conselheiro Empresarial

**Data:** 4 de agosto de 2026
**STATUS:** IMPLEMENTADO (mudança de comportamento do Assistente — pensa antes de responder).

> A Ponte não responde imediatamente. A Ponte pensa junto.
> Antes de qualquer recomendação, ela pergunta internamente: o que já sabemos?
> O que ele disse meses atrás? Há contradições? Qual o risco? E só então responde.

---

## 1. Problema

O Assistente (P52+ / P65) já usava memória e contexto real, mas ainda respondia
**imediatamente**: o empresário trazia "estou pensando em contratar alguém" e a
Ponte já opinava. Um conselheiro de verdade não faz isso. Ele:

- percebe a decisão antes de aconselhar;
- conecta com a história da empresa (o que ele contou meses atrás);
- identifica o que ainda não sabe;
- faz 1–2 perguntas que mudam a qualidade da decisão;
- e só então — com evidência — oferece uma reflexão.

Sem essa mudança, a Ponte continuava sendo um "chatbot com contexto": respondia
bem, mas não **pensava junto**.

## 2. O que P66 entrega

### 2.1 Comportamento conselheiro (mudança de comportamento, não funcionalidade)

Quando o empresário traz uma **decisão importante** — contratar, dispensar, mexer
em preços, comprar equipamento, pegar empréstimo, expandir — o Assistente passa a
seguir uma **ordem obrigatória, nunca invertida**:

1. **O que estou percebendo** — nomeia a decisão, sem aconselhar ainda.
2. **Por que isso chamou minha atenção** — o que muda no caixa e na rotina,
   conectando com o que ele já contou.
3. **O que ainda não sabemos** — os pontos abertos antes de decidir.
4. **Uma ou duas perguntas que realmente importam** — nunca mais que duas.
5. **Só então, se houver evidência, uma reflexão** — nunca recomendação sem base.

A regra **"nunca responder imediatamente"** é estrutural: entra no system prompt
como regra fundamental (nº 8) e é materializada por um raciocínio determinístico
construído ANTES da chamada ao modelo.

### 2.2 Raciocínio determinístico (`conselheiro-engine.ts`)

Princípio da Constituição: **a IA é interface, não cérebro**. O raciocínio é
construído em código, sobre dados e memória reais:

- **Detecção da decisão** (`detectarCategoriaDecisao`) — regras de palavras-chave
  por categoria: `CONTRATACAO`, `DEMISSAO`, `PRECOS`, `EQUIPAMENTO`,
  `EMPRESTIMO`, `EXPANSAO`.
- **Sinais de contexto** (`detectarSinais`) — caixa apertado, sobrecarga, receio
  de perder clientes, decisão adiada, decisão por impulso. Calculados de
  números reais (receita × despesa, inadimplentes) e da memória.
- **Tensões / contradições** (`encontrarTensoes`) — compara o que ele diz hoje
  com o que já contou: *"ele quer expandir, mas já disse que as decisões passam
  todas por ele"*. Intervenção nasce da história, nunca de frase pronta.
- **Níveis de confiança** — tudo que a Ponte afirma vem com nível: **SABEMOS**
  (evidência real), **ACREDITAMOS** (leitura, não certeza), **INVESTIGANDO**
  (o que ainda não sabemos). A IA traduz para linguagem de conversa ("eu sei",
  "eu acredito", "estou investigando").
- **Reflexão só com evidência** — a reflexão só existe quando há uma tensão real
  identificada na história da empresa. Sem tensão, a Ponte **não recomenda**:
  fica nas perguntas.

### 2.3 Biblioteca Socrática (`perguntas-socraticas.ts`)

**Patrimônio intelectual.** Perguntas que constroem decisão, curadas uma a uma,
por categoria — a IA nunca inventa uma pergunta socrática nova por conta própria,
ela apenas adapta às palavras do empresário. São 30 perguntas (5 por categoria),
cada uma com critério determinístico de priorização (ex.: "caixa apertado →
pergunta de custo real primeiro").

### 2.4 A memória participa da decisão

O raciocínio carrega: respostas reais de conversas anteriores (via
`listarRespostasPorEmpresa`), pergunta viva, memórias emocionais e hipóteses
ativas. A IA recebe isso como material e conversa relembrando —
*"oito meses atrás você dizia X... hoje você está dizendo Y... o que mudou?"* —
sempre com o que está no contexto, nunca inventando lembrança.

### 2.5 Evidência da intervenção

Cada intervenção do conselheiro gera uma **evidência** (origem `ASSISTENTE`,
categoria `ESTRATEGIA`) — a memória da Ponte registra que aquele empresário
trouxe aquela decisão. É aprendizado real sobre a empresa, não log.

## 3. O que NÃO mudou

- **Nenhuma tela, rota ou schema novo.** Só comportamento do Assistente.
- **Fórmulas mantidas** — perguntas factuais simples (quantos clientes, quanto
  faturei, tarefas atrasadas, leads) continuam respondidas por fórmula, sem IA.
- **Sem migrations, sem novas dependências, sem refactor amplo.**

## 4. Arquivos

- `engine/perguntas-socraticas.ts` — **novo:** biblioteca socrática (30 perguntas
  em 6 categorias + `LABEL_CATEGORIA`).
- `engine/conselheiro-engine.ts` — **novo:** detecção, sinais, tensões, níveis de
  confiança, reflexão condicionada a evidência, formatação para o prompt.
- `app/api/assistente/route.ts` — integração: `montarRaciocinioConselheiro` antes
  da chamada ao modelo; `systemPrompt` com regra nº 8, estrutura em 5 passos e
  níveis de confiança; raciocínio injetado como material.

## 5. Critérios de aceite (P66)

- [x] Toda decisão importante gera reflexão (estrutura em 5 passos no Assistente).
- [x] A Ponte nunca responde imediatamente (regra fundamental + raciocínio antes do modelo).
- [x] Raciocínio construído (determinístico, em código, não inventado pela IA).
- [x] Contexto presente (números reais de receita/despesa/clientes/tarefas no raciocínio).
- [x] A memória participa (respostas passadas, pergunta viva, memórias emocionais, hipóteses).
- [x] Perguntas são melhores que respostas (biblioteca socrática, 1–2 por vez).
- [x] Toda hipótese identificada (SABEMOS / ACREDITAMOS / INVESTIGANDO).
- [x] Nenhuma recomendação sem evidência (reflexão só quando há tensão real).
- [x] O empresário sente que alguém pensou junto (linguagem de memória + nível de confiança).
- [x] Conversa impossível em chatbot tradicional (referencia o passado, questiona antes de opinar).
- [x] `tsc` e `build` limpos.
