# P60 — Memória Empresarial Viva V1

**Data:** 2 de agosto de 2026
**STATUS:** PLANEJADO — aguarda evidência do P59 (dependência: dados de retorno dos primeiros 10 empresários).

> A empresa do empresário não nasce na Ponte: ela já tem história. A Ponte deve
> devolver essa história como algo vivo — que ajuda a decidir — e não como um arquivo morto.

---

## 1. Problema

Depois da primeira conversa, o empresário recebe um retrato, mas a conversa parece um evento
isolado. Ele não sente que a empresa dele "continua existindo" dentro da Ponte entre uma sessão e outra.

## 2. Hipótese central

Se a Ponte lembrar da empresa (e da história que ela contou) entre conversas, o empresário
volta porque sente que a Ponte o conhece — e conhecer gera confiança.

## 3. Design planejado (sem IA como regra)

- Reaproveitar a narrativa **`minha-jornada`** (já existente) como a "memória" da empresa.
- A cada nova conversa, o retrato estratégico compara com o anterior e mostra **o que mudou**
  (deliberadamente, sem inferência automática — apenas contraste do que o empresário mesmo disse).
- A pergunta contínua do retrato (seção 6 do P59) vira o fio condutor: "na última conversa,
  você disse que ia observar X. O que aconteceu?"

## 4. Critérios de aceite (quando iniciar)

- [ ] P59 concluído: sabemos que a memória gera valor (evidência do protocolo 1–10).
- [ ] Nenhuma migração de banco planejada (reuso de `RespostasConversa` / `SinalValor`).
- [ ] Não implementar motor de memória automática; apenas re-apresentação do que foi dito.

## 5. Não fazer

- Não criar "cérebro" que interpreta a história sozinho.
- Não criar novas tabelas de "memória" antes de evidência.
