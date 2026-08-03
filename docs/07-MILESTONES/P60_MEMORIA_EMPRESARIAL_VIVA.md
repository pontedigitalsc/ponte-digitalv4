# P60 — Memória Empresarial Viva V1

**Data:** 2 de agosto de 2026
**STATUS:** IMPLEMENTADO (V1) — página `/memoria` entrega o patrimônio da empresa; a leitura
coletiva ("o que mudou entre conversas") permanece planejada, dependente de evidência.

> A empresa do empresário não nasce na Ponte: ela já tem história. A Ponte deve
> devolver essa história como algo vivo — que ajuda a decidir — e não como um arquivo morto.

---

## 1. Problema

Depois da primeira conversa, o empresário recebe um retrato, mas a conversa parece um evento
isolado. Ele não sente que a empresa dele "continua existindo" dentro da Ponte entre uma sessão e outra.

## 1.1 Implementação (V1)

- **Página `/memoria`** ("A memória da sua empresa") no menu lateral (grupo "Aprender", ícone `BookOpen`).
- Reúne o patrimônio real da empresa, sem nada inventado:
  - decisões registradas (`AcaoCognitiva` com status, resultado e feedback);
  - aprendizados (`Aprendizado`);
  - clarezas percebidas (`SinalValor` de `CLAREZA_GERADA` com categoria e decisão sugerida);
  - evoluções (`Outcome` / `MemoriaEmocional`);
  - histórico de sessões estratégicas com CTA para continuar a conversa em aberto.
- Módulo `'memoria'` liberado na experiência cognitiva (`cognitive-experience-engine.ts`).
- Sem novas tabelas: reuso do schema existente.

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

- [x] Página `/memoria` entregue mostrando o patrimônio real da empresa (decidir/evoluir/lembrar).
- [ ] P59 concluído: sabemos que a memória gera valor (evidência do protocolo 1–10).
- [ ] Contraste "o que mudou entre conversas" (leitura coletiva) — planejado, aguarda evidência.
- [ ] Nenhuma migração de banco planejada (reuso de `RespostasConversa` / `SinalValor`).

## 5. Não fazer

- Não criar "cérebro" que interpreta a história sozinho.
- Não criar novas tabelas de "memória" antes de evidência.
