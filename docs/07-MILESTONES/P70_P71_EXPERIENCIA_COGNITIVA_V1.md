# P70 + P71 — Experiência Cognitiva V1 (Primeira Impressão Memorável + Ritmo Cognitivo)

**Data:** 5 de agosto de 2026
**STATUS:** IMPLEMENTADO (experiência da primeira conversa).

> **"A Ponte deixa de parecer um software e passa a parecer um conselheiro."**
> Este programa NÃO adiciona funcionalidades, módulos, IA ou telas. Ele muda
> exclusivamente a experiência: o empresário deve esquecer que está respondendo
> perguntas e sentir que acabou de ter uma conversa útil sobre a própria empresa.

> **Nota de nomenclatura:** existe `P70_PRIMEIRA_SESSAO_ESTRATEGICA_V3.md` (a
> sessão v6/v7 de descoberta, 3 de agosto). Este documento é o **P70+P71 —
> Experiência Cognitiva V1**, que refina a *experiência* dessa mesma conversa.
> Não são duplicatas: um reconstruiu o fluxo; este muda como a conversa sente.

---

## 1. Problema

Mesmo com P67 (contexto + motivo + reações) e P70 (sessão v7 em 4 blocos), a
primeira conversa ainda podia parecer roteiro:

1. **Pergunta → Resposta → Comentário → Pergunta.** O ritmo era previsível —
   toda resposta recebia o mesmo tipo de devolutiva. Parecia chatbot.
2. **Contraperguntas praticamente inexistiam.** A conversa nunca aprofundava
   uma resposta ambígua ("Quando você diz 'tudo'... fala das decisões ou da
   operação?").
3. **Sem pequenos mistérios.** Não existia curiosidade ("Tem uma coisa
   interessante aparecendo aqui...").
4. **A Ponte nunca pensava em voz alta.** Não dizia "Interessante...",
   "Isso muda um pouco minha percepção", "Espera... isso conecta com outra
   coisa que você comentou."
5. **Nunca mudava de direção.** Se o empresário mencionasse fechar a empresa,
   a conversa continuava como se nada tivesse acontecido.
6. **"Por que pergunto:"** ainda aparecia como rótulo de formulário — exatamente
   o que o princípio da experiência proíbe (o motivo precisa ser implícito).

## 2. O que P70 + P71 entrega

### 2.1 Ritmo cognitivo imprevisível (determinístico, sem IA)

`montarRitmoCognitivo()` em `reacoes.ts` decide a fala da Ponte após cada
resposta, em ordem de prioridade:

1. **Mudança de direção (sinal crítico):** se a resposta menciona fechar a
   empresa, falência, vender ou demitir, a Ponte **abandona o roteiro** e
   explora ("Espera. Você disse... Isso é grande demais para eu seguir o roteiro
   como se nada tivesse acontecido.").
2. **Contrapergunta:** regras por pergunta + palavras-chave aprofundam a
   resposta ("Quando você diz que a empresa para sem você... você fala das
   decisões ou da operação?").
3. **Conexão:** a Ponte cita o que foi dito minutos antes e liga com a resposta
   atual (crescimento × dependência; falta de previsão × leitura do caixa;
   energia × cabeça).
4. **Percepção como hipótese** (P65, preservado).
5. **Ritmo imprevisível:** quando nenhuma regra se aplica, a Ponte alterna
   deterministicamente entre **recompensa** (reação individual), **silêncio
   inteligente**, **pensar em voz alta** e **pequeno mistério**. O sorteio é um
   hash estável (pergunta + resposta normalizada) — o mesmo input produz o mesmo
   output, mas respostas diferentes produzem ritmos diferentes.

"Nem toda pergunta gera comentário. Nem todo comentário gera pergunta." — a
imprevisibilidade é o que faz parecer humano.

### 2.2 Pensar em voz alta

Novas falas determinísticas: "Interessante...", "Isso muda um pouco minha
percepção.", "Acho que encontrei um padrão.", "Espera... isso conecta com outra
coisa que você comentou." A ponte deixa o raciocínio aparecer.

### 2.3 Pequenos mistérios (curiosidade)

"Tem uma coisa interessante aparecendo aqui... mas ainda preciso entender mais um
ponto antes de te dizer." — cria expectativa e mantém a atenção até a próxima
pergunta resolver o mistério.

### 2.4 Motivo implícito (P70)

O rótulo "Por que pergunto:" foi removido do `QuestionCard`. O `motivo` de cada
pergunta agora é renderizado em tom de quem pensa junto, sem estrutura de
formulário — a razão da pergunta fica implícita, como um conselheiro que
compartilha seu raciocínio.

### 2.5 Primeira pergunta com abertura emocional (P70)

A primeira pergunta passou a abrir como o programa descreve: *"Antes de qualquer
coisa... quero entender como você enxerga sua empresa neste momento. Não
financeiramente. Mas como empresário."* Nunca como cadastro.

### 2.6 Ritual de digestão variável (P71)

A frase sob a reação ("Deixa eu digerir o que você disse...") passou a variar em
sequência estável: "Interessante... deixa eu pensar...", "Vou deixar essa resposta
falar comigo um instante...", "Isso muda um pouco minha percepção..." — a Ponte
não repete a mesma estrutura.

## 3. Implementação

- `src/engine/reacoes.ts` — `PENSAR_EM_VOZ_ALTA`, `CURIOSIDADE`,
  `REGRAS_CONTRAPERGUNTA`, `SINAIS_CRITICOS`, `REGRAS_CONEXAO`,
  `montarRitmoCognitivo()` (prioridade: crítico → contrapergunta → conexão →
  percepção → ritmo). Funções existentes preservadas (null-safe, testes de
  hipóteses dependem delas).
- `src/engine/conversation-engine.ts` — `responder()` agora chama
  `montarRitmoCognitivo` no lugar da seleção anterior de reação.
- `src/engine/fluxos/primeira-conversa.ts` — abertura emocional da primeira
  pergunta (`empresa.momento`).
- `src/components/conversa/question-card.tsx` — motivo implícito (removido o
  rótulo "Por que pergunto:").
- `src/app/conversa/page.tsx` — ritual de digestão variável (sequência estável).

## 4. Critérios de aceite

- [x] A Ponte pensa em voz alta ("Interessante...", "Espera... isso conecta...").
- [x] Contraperguntas aprofundam respostas ambíguas (dependência, momento,
      previsão, crescimento).
- [x] A Ponte conecta o que foi dito minutos antes com a resposta atual.
- [x] A Ponte muda de direção quando aparece um sinal crítico (fechar/vender/
      demitir).
- [x] O ritmo é imprevisível de forma determinística — nunca o mesmo para toda
      resposta.
- [x] Pequenos mistérios criam curiosidade entre perguntas.
- [x] O motivo de cada pergunta é implícito (não há "Por que pergunto:").
- [x] Primeira pergunta abre com emoção, nunca como cadastro.
- [x] Ritual de digestão varia (sem repetição de estrutura).
- [x] Nenhuma funcionalidade, módulo, IA, tela ou migration adicionada.
- [x] `tsc --noEmit` limpo e `npm run build` limpo.

## 5. Não fazer

- Não adicionar um campo de resposta para contraperguntas (seria nova interação/
  feature — a contrapergunta vive na reação e provoca reflexão).
- Não usar IA para gerar as falas — tudo determinístico (regra "IA é interface,
  não cérebro").
- Não criar novas telas, rotas ou módulos para "mostrar" a experiência.
- Não remover/renomear IDs de pergunta (engines de hipóteses, reações e memória
  dependem deles).

## 6. Documentos irmãos

- `P67_EXPERIENCIA_COGNITIVA_DE_CONVERSA_V1.md` — contexto + motivo + reação 7s.
- `P70_PRIMEIRA_SESSAO_ESTRATEGICA_V3.md` — a sessão de descoberta que este
  programa refina na experiência.
- `P71_RITMO_COGNITIVO` — incorporado neste programa (P70+P71).
