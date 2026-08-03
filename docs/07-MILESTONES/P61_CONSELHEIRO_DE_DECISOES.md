# P61 — Conselheiro de Decisões V1

**Data:** 2 de agosto de 2026
**STATUS:** PLANEJADO — aguarda evidência do P59 (dependência: saber quais decisões os primeiros empresários tomam).

> O retrato mostra. O conselheiro **ajuda a decidir**. A Ponte não decide pelo empresário —
> ela o ajuda a decidir melhor ("com base no que entendemos até aqui...").

---

## 1. Problema

O empresário tem a visão (retrato), mas quando chega a hora de decidir, ele decide sozinho,
na pressa, sem um espaço para pensar em voz alta.

## 2. Hipótese central

Um lugar calmo para "pensar antes de decidir" reduz decisões ruins e cria o hábito de voltar.

## 3. Design planejado

- Página **"Antes de decidir"** (`/decisao`): o empresário escreve a decisão que está diante dele.
- A Ponte apresenta o **contexto que ela já conhece** (retrato, jornada, sinal anterior) e faz
  perguntas de apoio à decisão (regras/templates, determinístico, sem IA como cérebro).
- Ao final, grava a decisão e o que motivou — vira patrimônio (e alimenta P62 no futuro).

## 4. Critérios de aceite (quando iniciar)

- [ ] P59 concluído: as decisões reais dos primeiros empresários estão mapeadas no protocolo.
- [ ] Reuso de `SinalValor` para registrar a decisão (sem novas tabelas sem necessidade).

## 5. Não fazer

- Não dar respostas prontas ("faça X") — apenas ajudar a enxergar.
- Não criar lógica crítica no modelo de IA.
