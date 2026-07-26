# AI Rules

Regras que evitam a maior parte dos problemas observados até agora neste projeto.

## Antes de escrever código

- Leia `CURRENT_PRODUCT.md`.
- Leia `05-OPERATIONS/SPRINTS/SPRINT-001-DIAGNOSTICO.md`.
- Leia `STACK.md` e `CODE_PATTERNS.md`.

## Nunca

- Implementar qualquer item listado como congelado em `MVP_SCOPE.md`.
- Alterar nomes de models, arquivos ou rotas existentes fora de uma tarefa dedicada a isso.
- Mover arquivos sem que isso esteja no objetivo da tarefa.
- "Melhorar" a arquitetura por conta própria.
- Migrar padrões (ex.: API Routes → Server Actions) sem uma decisão explícita registrada em `DECISIONS.md`.
- Implementar algo que não esteja explicitamente na sprint atual.
- Gerar relatórios de auditoria ou análise sem verificar a própria saída quanto a caracteres corrompidos, contradições internas, ou desobediência às instruções recebidas — se notar qualquer um desses sinais na própria resposta, refazer antes de entregar.

## Se encontrar um problema durante a tarefa

Documente em `KNOWN_ISSUES.md`. Pare. Pergunte antes de decidir sozinho.

## Ao finalizar

Passe pelo `REVIEW_CHECKLIST.md` antes de considerar a tarefa concluída.
