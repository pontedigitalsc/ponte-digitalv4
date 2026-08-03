# P61 — Conselheiro de Decisões V1

**Data:** 2 de agosto de 2026
**STATUS:** IMPLEMENTADO (V1) — "Pensar antes de decidir" integrado à página `/centro-decisao`.
O acompanhamento das decisões (retorno de 7 dias, perguntas de apoio) permanece planejado.

> O retrato mostra. O conselheiro **ajuda a decidir**. A Ponte não decide pelo empresário —
> ela o ajuda a decidir melhor ("com base no que entendemos até aqui...").

---

## 1. Problema

O empresário tem a visão (retrato), mas quando chega a hora de decidir, ele decide sozinho,
na pressa, sem um espaço para pensar em voz alta.

## 1.1 Implementação (V1)

- Componente **`PensarAntesDeDecidir`** integrado ao topo da página `/centro-decisao`, abaixo do
  painel de decisões da engine.
- O empresário registra a decisão com **5 perguntas** (`src/components/decisao/pensar-antes-de-decidir.tsx`):
  o que precisa decidir, por que isso importa, resultado esperado, riscos e a condição que indicaria
  que a decisão valeu a pena. Categoria opcional (FINANCEIRO/CLIENTES/OPERACAO/GESTAO/PESSOAS/PRODUTO/ESTRATEGIA).
- **APIs** `src/app/api/centro-decisao/decisoes/route.ts` (criar) e `.../[id]/route.ts` (atualizar):
  - cria `AcaoCognitiva` com `origem USUARIO`, status PENDENTE, `impactoEsperado` (resultado/riscos/condição);
  - ao concluir, registra "O que aconteceu?" e "O que aprendemos?" em `resultado` e o feedback
    (`FeedbackAcao` — ajudou/ajudou parcialmente/não ajudou/não executada);
  - grava marcos de experiência (`PRIMEIRA_ACAO_CRIADA`, `PRIMEIRA_ACAO_CONCLUIDA`, `PRIMEIRO_FEEDBACK`).
- A decisão vira patrimônio na página `/memoria` e alimenta P62 no futuro.

## 2. Hipótese central

Um lugar calmo para "pensar antes de decidir" reduz decisões ruins e cria o hábito de voltar.

## 3. Design planejado (continuidade)

- Página **"Antes de decidir"** dedicada (`/decisao`) e acompanhamento da decisão (retorno do que
  foi registrado) — aguarda evidência do P59.
- Perguntas de apoio à decisão com base no contexto já conhecido (retrato, jornada) — determinístico.

## 4. Critérios de aceite (quando iniciar)

- [x] Registrar decisão com o contexto (por quê, resultado esperado, riscos, condição de sucesso).
- [x] Fechar a decisão com resultado, aprendizado e feedback (vira patrimônio em `/memoria`).
- [ ] P59 concluído: as decisões reais dos primeiros empresários estão mapeadas no protocolo.
- [ ] Acompanhamento e perguntas de apoio com base no contexto — aguarda evidência.

## 5. Não fazer

- Não dar respostas prontas ("faça X") — apenas ajudar a enxergar.
- Não criar lógica crítica no modelo de IA.
