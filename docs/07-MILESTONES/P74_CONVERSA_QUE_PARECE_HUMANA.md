# P74 — A Conversa Que Parece Humana

**Data:** 6 de agosto de 2026
**STATUS:** IMPLEMENTADO (comportamento conversacional — sem telas, módulos, banco, rotas ou funcionalidades).

> **"O empresário nunca deve sentir que está falando com um roteiro. Nem com uma IA. Nem com um chatbot. Ele precisa sentir que existe alguém prestando atenção."**

A Ponte já compreendia (P67), conectava (P72), refletia (P65/P70) e descobria (P73). O P74 adiciona a camada mais difícil: **conversar como um excelente conselheiro**. Zero mudança de arquitetura, zero complexidade visual — apenas o comportamento conversacional, mantido 100% determinístico (sem IA), na camada de reação da primeira sessão (`sistema/src/engine/reacoes.ts`).

---

## 1. O que muda

A fala da Ponte após cada resposta deixa de ser "uma reação" e passa a ser **uma conversa** — com aberturas variadas, humildade intelectual, pensamento em voz alta, pequenos silêncios, surpresa discreta e a decisão de **perguntar antes de explicar um conflito**. Tudo derivado de regras + hash estável (mesmo input → mesmo output).

### Parte 1 — A conversa não parece formulário
Pegadas `ABERTURAS_NATURAIS` ("Tem uma curiosidade minha.", "Posso te perguntar uma coisa?", "Enquanto você falava, fiquei pensando...", "Isso me chamou atenção.", "Parece simples, mas...", "Queria entender melhor uma coisa.", "Fiquei com uma dúvida agora."). Essas aberturas **introduzem as contraperguntas** e também aparecem sozinhas no ritmo — nunca duas respostas seguidas começam do mesmo jeito. O aprofundamento nasce da conversa, não de uma lista.

### Parte 3 — Pensar em voz alta: a hipótese mudou
`HIPOTESE_MUDOU` ("Enquanto você respondia, minha hipótese mudou.", "No começo achei que o seu desafio principal fosse um. Agora não acho mais."). A Ponte mostra que **seu próprio raciocínio evoluiu** durante a conversa — quem permanece rígido parece máquina; quem revisa parece inteligente.

### Parte 4 — Mudança de direção
Mantida do P71 (`sinalCriticoDurante`) e realocada **topo** da prioridade: se a resposta revela algo grande (fechar, vender, demitir), a Ponte interrompe o roteiro ("Espera. Isso é grande demais...") para explorar. Quebra completamente a sensação de script.

### Parte 5 — Conflito: perguntar ANTES de explicar
Nova `contradicaoDurante` — três regras povoam o conflito real entre respostas ancoradas à narrativa da empresa (crescimento × dependência; ser a pessoa central × empresa parar sem você; visão de empresa que anda sem você × hoje parar sem você). Ao detectar, a Ponte **pergunta** ("Parece existir uma pequena contradição... Posso explorar isso com você?") **em vez de explicar** — o empresário conduz a conversa. Determinístico, só dispara com duas respostas reais.

### Parte 6 — Pequenos silêncios
`SILENCIOS_CURTOS` ("Entendi.", "Interessante.", "Hm...", "Isso muda bastante a forma como estou enxergando sua empresa."). Nem toda resposta gera uma devolutiva elaborada; às vezes basta o reconhecimento de quem ouve.

### Parte 7 — Humildade intelectual
`HUMILDADE_INTELECTUAL` ("Posso estar interpretando errado.", "Ainda tenho pouca evidência.", "Vou tratar isso como hipótese, não como conclusão."). Toda **percepção** agora vem precedida de humildade (nunca afirma em 100%); e cerca de **1 a cada 3 devolutivas de bloco** abre com um aviso de que a leitura ainda pode mudar (`humildizarDevolutiva`). A Ponte nunca parece perfeita — isso aumenta confiança.

### Parte 8 — O empresário conduz
As contraperguntas terminam com convite ("Posso explorar isso com você?" / "Posso olhar isso com você?" / "Posso explorar isso juntos?"). Respeita o fluxo (reação sem campo de resposta — mesma decisão documental do P70: contrapergunta vive na reação, não como interação nova).

### Parte 9 — Emoções discretas
`surpresaMarcante`: surpresa só aparece quando a resposta tem sinal forte (demitir, fechar, vender, esgotado, "não aguento mais"), e sempre acompanhada de humildade. Pouco, natural, sem exagero — nunca dramático.

### Sem parecer IA tentando parecer humana
Nenhuma frase de coaching, nenhum elogio gratuito, nenhuma teatralidade. Toda novidade é **determinística** e **baseada nas respostas reais** — o padrão do P72/P73 ("nunca afirmar sem evidência") é mantido.

---

## 2. Arquivos

- `sistema/src/engine/reacoes.ts` — única alteração de código. Novos pools (`SILENCIOS_CURTOS`, `HUMILDADE_INTELECTUAL`, `HIPOTESE_MUDOU`, `SURPRESA_DISCRETA`, `ABERTURAS_NATURAIS`), novas funções (`contradicaoDurante`, `surpresaMarcante`), novos auxiliares (`aberturaNatural`, `humildade`, `humildizarDevolutiva`) e a nova ordem de prioridade em `montarRitmoCognitivo`.
- Sem mudança de **schema, rotas, telas, componentes, módulos, IA, migration**.

## 3. Ordem de prioridade final (`montarRitmoCognitivo`)

1. fim de bloco → devolutiva (com humildade ocasional)
2. sinal crítico (P74 Parte 4)
3. contradição (Parte 5)
4. contrapergunta (abertura natural + convite, Partes 1 e 8)
5. conexão com o que foi dito antes (Parte 2)
6. percepção sempre como hipótese, com humildade (Parte 7)
7. ritmo: silêncio curto (6) / hipótese mudou (3) / abertura natural (1) / pensar em voz alta / surpresa discreta (9) ou recompensa

## 4. Critérios (comportamental — aprovação com empresários reais)

O P74 está aprovado quando empresários passarem a dizer espontaneamente:
- "Parecia que você estava acompanhando meu raciocínio."
- "Achei que você mudou de ideia durante a conversa."
- "Você lembrou de algo que eu tinha falado lá no começo."
- "Parecia uma conversa, não um questionário."
- "Esqueci que estava falando com um sistema."

## 5. Verificação

- [x] `npx tsc --noEmit` limpo.
- [x] `npm run build` limpo (Next.js 16.2.9 / Turbopack).
- [x] Nenhuma funcionalidade, tela, módulo, rota, banco ou IA adicionada.
- [x] Todo comportamento determinístico (hash estável).

## 6. Documentos irmãos

- `P70_P71_EXPERIENCIA_COGNITIVA_V1.md` — ritmo cognitivo que o P74 amplia.
- `P72_P73_ENGENHARIA_DA_TRANSFORMACAO.md` — relações, contradições e descoberta que a P74 humaniza na conversa.
- `P67_EXPERIENCIA_COGNITIVA_DE_CONVERSA_V1.md` — percepções como hipótese (origem da humildade).

## 7. Não é

Este programa NÃO cria campo de resposta interativa, NÃO cria telas novas, NÃO adiciona funcionalidades de domínio e NÃO usa IA para gerar as falas. A "pergunta-viva" da Parte 8 permanece na camada de reação (sem bloquear o fluxo), conforme a decisão documentada no P70.