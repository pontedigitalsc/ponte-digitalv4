# P57A — Primeira Experiência de Valor e Diagnóstico Estratégico V1

**Data:** 2 de agosto de 2026
**STATUS:** OFICIAL — a primeira interação entrega valor percebido imediato.

> A Ponte não vende diagnóstico. Ela entrega a **Primeira Sessão Estratégica da Empresa**:
> o lugar onde empresários pensam antes de tomar decisões importantes.
> O objetivo não é coletar dados — é **reduzir o risco de decisões ruins**.

---

## 1. Posicionamento

A Ponte não deve parecer formulário, diagnóstico gratuito comum, chatbot ou sistema de gestão.
A primeira experiência deve fazer o empresário pensar: _"Essa plataforma conseguiu enxergar coisas
sobre minha empresa que eu nunca tinha parado para analisar."_

O empresário não abre a Ponte porque quer "analisar a empresa". Ele abre porque precisa decidir:
contratar alguém, aumentar preço, investir, vender mais, reduzir custos, organizar operação,
sair da dependência dele.

---

## 2. Nova entrega — Retrato Estratégico da Empresa

Toda primeira conversa gera um **documento vivo** com cinco partes (P57A):

1. **O que entendemos sobre sua empresa** — mostra interpretação, não dados.
2. **Forças identificadas** — patrimônio existente, nunca apenas problemas.
3. **O que merece atenção** — "ponto de evolução", nunca "problema".
4. **A decisão mais importante agora** — "onde eu colocaria atenção primeiro".
5. **Próxima reflexão** — pergunta aberta para continuidade, não para coleta.

### Implementação técnica
- `src/engine/retrato-estrategico.ts` — gerador determinístico (regra + template, **sem IA**)
  sobre as respostas reais da Primeira Conversa (chaves do fluxo v5 confirmadas).
- Gerado no `POST /api/conversa/finalizar`, retornado ao cliente e exibido na revelação
  (`RevelacaoCard` + novo `RetratoEstrategicoCard`).
- Encerra sempre aberto (ex.: _"Se você tivesse 20% mais tempo livre na sua semana, qual parte
  da empresa você gostaria de desenvolver?"_ — reusando a resposta real `empresa.horalivre`).

---

## 3. Métrica principal — Clareza Gerada

Toda conversa mede o salto de clareza (antes: buscava resposta → depois: sabe qual movimento
merece atenção). **Sem score artificial.** Registra-se via `SinalValor` (`CLAREZA_GERADA`):
- pergunta inicial;
- descoberta;
- decisão sugerida;
- reação do empresário (a ser preenchida com o tempo, via uso real).

---

## 4. Entrega gratuita — Raio-X Inicial da Empresa

O diagnóstico gratuito é o novo funil: **valor antes de criar conta**. A etapa final de
`/diagnostico` agora entrega o **Raio-X Inicial** com cinco partes (momento atual, forças,
pontos de atenção, primeira oportunidade, próximo movimento) e deixa claro:

> _"Esta é uma fotografia inicial. A Ponte fica mais inteligente conforme acompanha sua empresa."_

---

## 5. Exploração de cenários

Dentro da conta gratuita existe a possibilidade de **brincar — como simulação estratégica**,
não como jogo:

- "Como seria se eu aumentasse meus preços?"
- "Como seria se contratasse alguém?"
- "Como seria se criasse uma nova oferta?"

### Implementação técnica
- `src/engine/cenario-engine.ts` — cenários determinísticos (`gerarCenarios`) sobre o contexto
  real (receita do mês, ticket médio, clientes ativos, tarefas pendentes, tamanho da equipe),
  sempre iniciando com **"Com base no que sabemos hoje..."** e **nunca afirmando o futuro**.
- Nova página `/explorar` (guarded), com aviso permanente: _"A Ponte não prevê o futuro.
  Ela explora cenários com base no que sabemos hoje."_

---

## 6. Critérios de aceite

- [x] Retrato Estratégico em 5 partes gerado ao finalizar a primeira conversa.
- [x] Clareza Gerada registrada sem score artificial (SinalValor).
- [x] Raio-X Inicial entregue antes do cadastro, com a ressalva de fotografia inicial.
- [x] Exploração de cenários determinística, "Com base no que sabemos hoje", sem prometer futuro.
- [x] Nenhuma IA usada no motor de valor (regra + template — IA é interface, não cérebro).

---

## 7. Documentos irmãos

- `P57B_FOUNDER_E_PERTENCIMENTO.md` — números e caminhos de pertencimento.
- `P58_OPERATION_FREEZE_V1.md` — regra _"Com base no que entendemos..."_ e operação.
