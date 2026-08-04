# P70 — Primeira Sessão Estratégica (V3)

**Data:** 3 de agosto de 2026
**STATUS:** IMPLEMENTADO (V3 — primeira sessão como descoberta estratégica).

> A primeira conversa deixou de ser um questionário e virou uma descoberta.
> Princípio de cada bloco: **"o que eu consigo concluir agora?"** — a Ponte conversa
> citando as palavras do empresário, atualiza hipóteses a cada resposta e entrega
> um Retrato que é consequência delas, com cerimônia.

---

## 1. Problema

A auditoria P59–P63 mostrou que a primeira sessão (v5, 24 perguntas) ainda parecia um
formulário:

1. **Começa como cadastro** — as 4 primeiras perguntas eram `empresa.nome`,
   `empresa.oque`, `empresa.haquanto`, `empresario.quem`. O empresário não recebia
   valor antes de responder à primeira pergunta estratégica.
2. **As perguntas não evoluem** — a ordem existia (5 estágios do conselheiro), mas o
   empresário não percebia uma caminhada; as devolutivas de transição eram genéricas
   ("Vamos avançar...") e não citavam o que ele havia dito.
3. **O valor só aparece no final** — o Retrato era texto adaptado com fallbacks
   genéricos e sem cerimônia; "forças", "ponto de evolução" e "primeiro movimento"
   (tarefa) não liam a empresa como um conselheiro leria.

## 2. O que P70 entrega

### 2.1 Fluxo v6 — 7 blocos de descoberta (16 perguntas)

A conversa deixou de ser organizada por estágios do conselheiro e virou **7 blocos**,
cada um com uma conclusão clara:

| Bloco | Perguntas | O que a Ponte conclui |
|---|---|---|
| 1. O momento | frase mais verdadeira (`empresa.momento`, 5 frases) + o que segura o crescimento (`empresa.crescer`) | como o empresário lê o momento; "empresas travam pela complexidade, não por falta de clientes" |
| 2. Como você decide | como descobre se pode investir (`empresa.decisao`) + maior preocupação (`empresa.preocupacao`) | padrão de decisão (intuição × método) |
| 3. A dependência | 30 dias afastado (`empresa.dependencia`) + hora livre por dia (`empresa.horalivre`) | conhecimento só na cabeça do fundador |
| 4. Os clientes | o que faz voltarem (`empresa.clientes`) + cliente a multiplicar (`empresa.multiplicar`) + orgulho (`historia.orgulho`) | conhecimento de cliente vivido, não registrado |
| 5. O dinheiro | consegue prever o próximo mês (`financeiro.previsao`) + o que vê primeiro no caixa (`financeiro.caixa`) | previsibilidade financeira (não faturamento) |
| 6. A energia | o que consumiu energia (`rotina.energia`) + o que ocupa a cabeça (`rotina.cabeca`) + último dia tranquilo (`rotina.tranquilo`) | o que consome energia é o que ocupa a cabeça |
| 7. A visão | se funcionasse como você gostaria (`visao.funcionando`) + objetivo 6 meses (`frente.proximo`) | direção; a conversa termina aberta |

**O que some:** as 4 perguntas cadastrais (`empresa.nome`, `empresa.oque`,
`empresa.haquanto`, `empresario.quem`) saem da conversa — `criar-conta` já coleta
nome e nome da empresa. Removidas também: `historia.nascer`, `historia.momento`,
`rotina.pressao`, `historia.mudanca`, `frente.diferente`, `frente.surpresa`.
Nenhuma pergunta entra sem responder "o que eu consigo concluir agora?".

### 2.2 A Ponte conversa citando evidência

- **`reacoes.ts` v2** — devolutiva de fim de bloco (`devolutivaDeBloco`) cita as
  palavras reais: *"Você me contou que descobre se pode investir assim: «...». Percebi
  um padrão..."* Nunca "acho que".
- **`conversation-engine.ts`** — `responder()` detecta o fechamento de bloco (próxima
  etapa de outro bloco, etapa adaptativa ou fim da conversa) e devolve a fala da Ponte;
  dentro do bloco mantém a reação individual da pergunta. Progresso passou a ser
  **por bloco (7)**, não mais por estágio.

### 2.3 Motor de hipóteses estratégicas (determinístico, sem IA)

- **`hipoteses-estrategicas.ts`** — a cada conjunto de respostas, regras produzem
  até 5 hipóteses: dependência do fundador, maturidade operacional (intuição × método),
  conhecimento do cliente, previsibilidade financeira, sobrecarga do fundador.
  Cada hipótese carrega **força (1–3)**, confiança, evidência (a resposta citada),
  prioridade, decisão e pergunta para a próxima conversa.
- Persistidas ao finalizar: `registrarNaMemoria` (tipo descoberta/confirmação) +
  `SinalValor` com o conjunto de hipóteses. Hipóteses existem para **serem observadas**,
  nunca para rotular a empresa.

### 2.4 Retrato novo — 5 partes, consequência das hipóteses

`retrato-estrategico.ts` reconstruído:

1. **Quem sua empresa parece ser hoje** — leitura do momento + hipótese mais forte.
2. **O que mais chamou minha atenção** — 3 descobertas (não forças), cada uma com a
   evidência citada: *"Você disse: «...»"*.
3. **O que provavelmente merece atenção primeiro** — uma prioridade.
4. **A decisão que eu observaria nas próximas semanas** — decisão, não tarefa:
   *"Se eu estivesse no seu lugar..."*.
5. **Uma pergunta para nossa próxima conversa** — sempre aberta (continuidade).

A "Carta" antiga (`resumoNatural`) deixou de ser exibida — o Retrato é a entrega.

### 2.5 Cerimônia de entrega

`revelacao-card.tsx` + `retrato-estrategico-card.tsx`: tela limpa → ~0,5s →
**"A conversa terminou. Agora quero organizar tudo o que consegui entender."** (~3s,
avatar pensando + pontos) → o Retrato surge **seção por seção** (reveal gradual,
~380ms entre seções), como se estivesse sendo escrito.

## 3. Implementação

- `src/engine/tipos.ts` — `BlocoConversa` + `BLOCOS_ORDEM` + `BLOCO_LABEL` + campo `bloco` na `Etapa`.
- `src/engine/fluxos/primeira-conversa.ts` — v6, 7 blocos, 16 perguntas.
- `src/engine/reacoes.ts` — devolutivas de bloco citando evidência + reações individuais.
- `src/engine/hipoteses-estrategicas.ts` — motor determinístico de hipóteses + persistência.
- `src/engine/retrato-estrategico.ts` — Retrato 5 partes derivado das hipóteses.
- `src/engine/conversation-engine.ts` — progresso por bloco + devolutiva de fim de bloco.
- `src/app/api/conversa/route.ts` e `finalizar/route.ts` — hipóteses + Retrato novo (sem resumoNatural).
- `src/components/conversa/revelacao-card.tsx` e `retrato-estrategico-card.tsx` — cerimônia.
- `src/app/conversa/page.tsx` — label de bloco + cerimônia.

## 4. Critérios de aceite

- [x] A conversa não parece um formulário; nenhuma pergunta é só de cadastro.
- [x] Toda pergunta constrói entendimento (cada bloco tem conclusão clara).
- [x] A Ponte conversa entre blocos citando as palavras do empresário ("Percebi isso porque você comentou que...").
- [x] Devolutivas citam evidência real — nunca "acho que".
- [x] O Retrato virou leitura estratégica: 3 descobertas, 1 prioridade, 1 decisão, 1 pergunta aberta.
- [x] Cerimônia de entrega com revelação gradual.
- [x] Hipóteses atualizadas pelas respostas; Retrato é consequência delas (determinístico, sem IA).
- [x] `tsc --noEmit` limpo e `npm run build` limpo.

## 5. Não fazer

- Não usar IA para gerar hipóteses ou devolutivas (regra "IA é interface, não cérebro").
- Não transformar hipóteses em "certezas" nem exibi-las como rótulos ao empresário.
- Não adicionar novas perguntas por ideia interna — a próxima evolução nasce de evidência dos Founders.
- Não recriar a "Carta" antiga em paralelo ao Retrato.

## 6. Documentos irmãos

- `P59_PRIMEIRO_VALOR_RETENCAO.md`, `P64_O_RETORNO.md` — a primeira sessão e o retorno de 7 dias.
- `PROTOCOLO_FOUNDER_1-10.md` (05-OPERATIONS) — a sessão V3 melhora o bloco "depois da primeira conversa".
