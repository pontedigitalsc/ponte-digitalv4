# LESSONS_LEARNED.md — Lições que Não Podem Ser Aprendidas Duas Vezes

Formato: o que aconteceu → o que isso ensina → o que fazer diferente daqui pra frente. Adicionar sempre no final, nunca reescrever entradas antigas.

---

## LIÇÃO-001 — Duas árvores de documentação nasceram e divergiram em silêncio

**O que aconteceu:** em algum momento, uma nova organização de documentação (`docs/01-VISION`…`06-BUSINESS`) foi criada sem que a organização anterior (`ponte-digital/docs/00-foundation`…`06-playbooks`) fosse arquivada, removida ou sequer referenciada. As duas passaram a descrever o mesmo produto com vocabulários de domínio diferentes (uma fala de "Lead/Cliente/Tarefa", a outra de "Atendimento/Serviço/Venda/Orçamento").

**O que isso ensina:** documentação gerada por sessões de IA separadas, sem um único ponto de entrada versionado, diverge silenciosamente — nenhuma das duas árvores "sabia" que a outra existia, então nenhuma sinalizou o conflito.

**O que fazer diferente:** antes de criar qualquer estrutura de pasta nova para documentação, procurar explicitamente por estruturas equivalentes já existentes no repositório (`find . -iname "*START*" -o -iname "*INDICE*" -o -iname "AGENTS.md"`, por exemplo) e decidir explicitamente entre migrar ou criar do zero — nunca criar em paralelo sem essa checagem.

**Causa raiz confirmada (2026-07-13):** localizado o script gerador da Árvore B, `build_docs_v2.py`. Ele escreve ~32 arquivos direto em `./docs` a partir de um dicionário de strings hardcoded, sem nenhuma leitura prévia do repositório — não verifica se `./docs` já tem conteúdo, não procura por `ponte-digital/docs/`. Isso confirma que a divergência não foi uma decisão consciente de substituir a árvore antiga: foi um script rodado assumindo uma pasta vazia. Qualquer script equivalente no futuro deveria, no mínimo, checar `os.path.exists(base)` e abortar/perguntar se já houver conteúdo.

---

## LIÇÃO-002 — Uma auditoria anterior foi descartada por sinais de corrupção/desobediência

**O que aconteceu:** conforme registrado em `04-DECISIONS/DECISIONS.md` e `CHANGELOG.md`, uma execução de auditoria/análise estrutural anterior apresentou texto corrompido e propôs refatoração arquitetural e catálogo de eventos apesar de instrução explícita em contrário. Foi descartada como fonte de verdade.

**O que isso ensina:** para tarefas de raciocínio estruturado (auditoria, análise, revisão), a saída do agente precisa ser conferida contra a instrução original antes de ser aceita como verdade — sinais de corrupção de texto ou contradição de instrução explícita são motivo para descartar e refazer, não para aceitar parcialmente.

**O que fazer diferente:** manter a prática já registrada em `06-AI/REVIEW_CHECKLIST.md` — toda saída desse tipo passa por essa checagem antes de virar decisão.

---

## LIÇÃO-003 — Um mecanismo de segurança foi desenhado, documentado com cuidado, e nunca conectado

**O que aconteceu:** `sistema/src/lib/prisma-tenant-safe.ts` implementa um wrapper (`prismaSeguro`) desenhado especificamente para pegar, em tempo de desenvolvimento, qualquer query multi-tenant sem `empresaId`. O comentário no topo do arquivo descreve exatamente por que ele existe e como usar. Nenhum dos 7 services do projeto o importa — todos usam o cliente Prisma direto.

**O que isso ensina:** documentação boa dentro do próprio código (comentários claros, motivação explícita) não garante que o mecanismo esteja de fato em uso — é preciso verificar o uso real (`grep` pelo import), não confiar que "se foi bem documentado, foi conectado".

**O que fazer diferente:** qualquer wrapper de segurança criado deveria vir acompanhado, na mesma tarefa/sprint, da migração dos consumidores existentes para usá-lo — ou de um item explícito em `KNOWN_ISSUES.md` registrando que ainda não foi conectado. Nenhuma das duas coisas aconteceu aqui até esta auditoria.

---

## LIÇÃO-004 — Conhecimento que parecia "pendente" às vezes já existe em outro lugar

**O que aconteceu:** `01-VISION/TERMINOLOGY.md` marca as 5 perguntas do Financeiro Essencial como `PENDENTE DE DEFINIÇÃO PELO FUNDADOR`. `03-domain/DOMAIN.md`, na árvore de documentação mais antiga, já as lista.

**O que isso ensina:** antes de tratar algo como lacuna real e pedir para o fundador definir do zero, vale procurar em toda a documentação existente (inclusive árvores mais antigas ou aparentemente obsoletas) — a informação pode já existir, só dispersa.

**O que fazer diferente:** antes de marcar qualquer coisa como `PENDENTE`, buscar pelo termo em todo o repositório de documentação, não só na árvore ativa.

---

## LIÇÃO-005 — Recomendações externas (consultoria, outro agente) chegam sem saber o estado atual do repositório

**O que aconteceu:** mais de uma recomendação de reorganização chegou sugerindo uma pasta nova para sprints (`09-SPRINTS/`) e citando `07-KNOWLEDGE/` — mas o repositório já tinha `05-OPERATIONS/SPRINTS/` e já havia renumerado para `08-KNOWLEDGE/` numa reorganização anterior (Sprint 0.5). Se aplicado ao pé da letra, isso teria recriado exatamente o problema de "duas árvores competindo" que a auditoria original identificou como o achado mais importante.

**O que isso ensina:** toda recomendação de reorganização — de consultor, de outro agente, ou de uma sessão anterior — precisa ser conferida contra o estado *atual* do repositório antes de ser aplicada, não só contra a intenção de quem escreveu. Boa intenção não impede duplicação se quem escreveu não tinha visibilidade do que já mudou.

**O que fazer diferente:** antes de criar qualquer pasta ou renomear qualquer estrutura sugerida por uma fonte externa, rodar `find docs/` (ou equivalente) e comparar contra a sugestão. Se já existir algo equivalente, adaptar o conteúdo da sugestão para o caminho real — nunca criar o caminho novo ao lado do antigo "só para não perder a sugestão".
