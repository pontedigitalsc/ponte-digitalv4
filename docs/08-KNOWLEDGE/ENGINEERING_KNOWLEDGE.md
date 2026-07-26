# ENGINEERING_KNOWLEDGE.md — Conhecimento Técnico Tácito

Coisas que hoje só se descobrem lendo o código com atenção — registradas aqui para não precisar ser redescobertas. Tudo abaixo foi verificado diretamente contra `sistema/prisma/schema.prisma`, `sistema/prisma/rls-policies.sql` e `sistema/src/` em 2026-07-13, não inferido.

---

## Soft delete — situação real, model por model

`FOUNDATION.md` e `DATABASE.md` dizem "todo model, sem exceção". A realidade hoje:

**Têm `deletedAt`:** `Cliente`, `Implantacao`, `Tarefa`, `Transacao`, `Lead` (5 de 12 models).

**Não têm:** `Empresa`, `Usuario`, `Contato`, `EtapaImplantacao`, `Historico`, `ConfiguracaoEmpresa`, `HistoricoSinal` (7 de 12 models).

Isso não significa necessariamente que os 7 estão errados — `Empresa` é a raiz do tenant (faz sentido soft-delete ser tratado diferente ali), e `HistoricoSinal`/`Historico` são naturalmente registros de log, não editáveis pelo usuário. Mas essa distinção nunca foi tomada como decisão explícita — é o estado em que o código está, não uma escolha registrada. **Decisão pendente:** confirmar quais desses 7 são exceção legítima e quais são lacuna real.

## Row Level Security — o que existe, o que falta, o que é incerto

`sistema/prisma/rls-policies.sql` habilita RLS (`ALTER TABLE ... ENABLE ROW LEVEL SECURITY`) em 11 tabelas, mas só cria a policy `empresa_isolamento` em 8 delas.

- **RLS habilitado, com policy:** leads, clientes, tarefas, implantacoes, transacoes, historicos, configuracoes_empresa, usuarios.
- **RLS habilitado, SEM policy:** `empresas`, `contatos`, `etapas_implantacao`. Sem nenhuma policy, o comportamento padrão do Postgres é negar todo acesso a quem não seja o dono da tabela/superusuário — a não ser que a conexão do Prisma use uma role que ignora RLS (ex.: `service_role` do Supabase, comum em apps backend). **Não é possível confirmar, só lendo os arquivos deste repositório, qual dos dois cenários está acontecendo hoje** — é uma pergunta técnica em aberto que precisa ser respondida olhando a `DATABASE_URL`/role de conexão real.
- **Sem RLS nenhum:** `HistoricoSinal` nem aparece na lista de `ALTER TABLE`.

## O wrapper `prismaSeguro` existe mas não está conectado

`sistema/src/lib/prisma-tenant-safe.ts` define um Prisma Client estendido (`prismaSeguro`) que lança erro (em dev) ou loga (em produção) quando uma query em model multi-tenant não inclui `empresaId`. **Nenhum dos 7 arquivos em `sistema/src/services/` o importa** — todos usam `@/lib/prisma` (o cliente sem guard) diretamente. Ou seja: hoje, o isolamento entre empresas depende inteiramente de disciplina manual do desenvolvedor em cada query, exatamente o risco que esse wrapper foi escrito para eliminar.

**Junte isso ao ponto acima:** três tabelas sem RLS confirmado + o guard de aplicação não conectado = a garantia de tenant guard, hoje, é menos forte do que qualquer documento (`FOUNDATION.md`, `ADR-004` da árvore antiga) afirma. Isso não é um problema de documentação — é uma tarefa de engenharia real, registrada com prioridade alta em `05-OPERATIONS/KNOWN_ISSUES.md`.

## Prisma 7 — detalhe de configuração que já causou confusão

No Prisma 7, `url`/`directUrl` não vivem mais dentro de `schema.prisma` — a configuração de conexão está em `prisma.config.ts`. `DATABASE_URL` (pooling, porta 6543) é usada em runtime; `DIRECT_URL` (porta 5432) é usada pelo Prisma CLI para migrations. Isso já está certo em `SETUP_DO_DESENVOLVEDOR.md` (árvore antiga) — vale garantir que continue documentado depois de qualquer unificação de árvores.

## `Historico` é o único model multi-tenant com `empresaId` opcional

Decisão de schema já existente (não desta auditoria): permite registros de sistema sem vínculo direto de empresa em casos raros. O próprio `sistema/src/lib/prisma-tenant-safe.ts` já trata isso como exceção conhecida (`MODELOS_COM_EMPRESA_ID_OPCIONAL`) — mas isso só está documentado como comentário de código, não em nenhum `.md`. Vale um parágrafo em `03-ENGINEERING/DATABASE.md`.
