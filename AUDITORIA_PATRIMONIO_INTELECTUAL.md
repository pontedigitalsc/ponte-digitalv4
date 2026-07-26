# Auditoria de Patrimônio Intelectual — Ponte Digital

**Data:** 2026-07-13
**Escopo lido:** `TERMINOLOGY.md` (enviado à parte) + as duas árvores de documentação encontradas nos arquivos enviados + o código real em `sistema/` (schema.prisma, RLS policies, services, middleware).
**Pergunta que este documento responde:** que conhecimento ainda morreria se o fundador desaparecesse hoje?

---

## Achado zero, antes das quatro categorias: existem DUAS árvores de documentação para o mesmo produto

Isso não estava nas instruções originais como algo a procurar, mas é o achado mais importante da auditoria, porque invalida qualquer leitura ingênua das outras quatro categorias.

| | Árvore A (`ponte-digital/docs/`) | Árvore B (`docs_zip/docs/`) |
|---|---|---|
| Estrutura | `00-foundation` … `06-playbooks` | `01-VISION` … `06-BUSINESS`, com `00-START-HERE.md` na raiz |
| Ponto de entrada | `INDICE_DOCUMENTACAO.md` | `00-START-HERE.md` |
| Vocabulário de domínio | Atendimento, Serviço, Venda, Orçamento, Agenda, PerfilCognitivo | Lead, Cliente, Tarefa, Implantação, Transação, HistoricoSinal (= o schema real) |
| Arquitetura descrita | `server/actions → services → repositories`, `DomainEvent`, interface `MotorDeDecisao` | API Routes → services → Prisma (= o código real) |
| Já se autodeclara desatualizada? | Sim — cada documento tem uma "Nota de consolidação" admitindo a divergência com o código | Não soube que a Árvore A existe |
| Pede uma decisão pendente? | Sim — pede explicitamente um "ADR-006" para decidir qual vocabulário é oficial | Já tomou essa decisão (ADR-001: manter `HistoricoSinal`), sem saber que estava respondendo ao pedido da Árvore A |
| `TERMINOLOGY.md` (o arquivo que você me mandou primeiro) casa com qual árvore? | Não | Sim, exatamente (`01-VISION/THESIS.md`, `06-BUSINESS/DIAGNOSTIC.md` etc. são os caminhos citados lá) |

**Conclusão prática:** a Árvore B é a mais nova, é a que `TERMINOLOGY.md` já assume como fonte, e é a que já resolveu (sem saber) a pergunta em aberto da Árvore A. **Recomendo a Árvore B como canônica** e a Árvore A como acervo de pesquisa a ser garimpado, não como documentação ativa — mas essa é uma decisão de fundador, não uma coisa que decido sozinha. Fiz a organização abaixo assumindo essa recomendação; se você discordar, é só avisar antes de eu mexer no repositório real.

Três coisas concretas que a Árvore A tem e que valem a pena ser herdadas pela B, porque contêm conhecimento real que a B não tem:
1. `MAPA_DE_MATURIDADE.md` — o inventário de 5 níveis de todo conceito já pensado (da filosofia até pesquisa de longo prazo). Não existe equivalente na Árvore B. É provavelmente o documento estratégico mais valioso das duas árvores.
2. `CURRENT_STATE.md` — levantamento por inspeção direta do código (stack real, rotas, models, o que falta). Mais preciso que `03-ENGINEERING/STACK.md` da Árvore B (que está incompleto — ver Categoria 2).
3. `DOMAIN.md` — na verdade **já responde** uma das perguntas que `TERMINOLOGY.md` marca como pendente (ver Categoria 1, item Financeiro Essencial).

---

## Categoria 1 — Conhecimento já documentado (não recriar)

- Filosofia e mantra ("não crie um ERP completo, crie um empresário mais tranquilo"), os 5 Patrimônios Empresariais, a Matriz de Decisão de 3 perguntas — documentados em `01-VISION/FOUNDATION.md` + `THESIS.md` (Árvore B) e reforçados por `00-foundation/MAPA_DE_MATURIDADE.md` Nível 1 (Árvore A).
- Os 7 pilares da V4 Founder e seu status — `02-PRODUCT/CURRENT_PRODUCT.md` + `FEATURE_MATRIX.md`.
- Regra de desacoplamento do Centro de Decisão (interface, futura troca de motor sem reescrever UI) — documentada em ambas as árvores, de forma consistente.
- Decisão de manter `HistoricoSinal` em vez do catálogo formal de `DomainEvent`, e de manter API Routes em vez de Server Actions — `ADR-001` e `ADR-002` (Árvore B). **Achado:** isso é, na prática, a resposta ao "ADR-006" que a Árvore A pede em `02-engineering/ADR.md` e `CHANGELOG_DOCUMENTACAO.md`. As duas árvores nunca foram cruzadas — vale copiar essa decisão para o `ADR.md` da Árvore A (ou aposentar a Árvore A, se você confirmar a recomendação do Achado Zero).
- Conteúdo completo do Diagnóstico Inteligente (5 blocos de perguntas) — `06-BUSINESS/DIAGNOSTIC.md` (Árvore B) e `03-domain/DIAGNOSIS_ENGINE.md` (Árvore A). **Atenção:** as duas versões têm perguntas parecidas mas **não idênticas** — ver Categoria 4 (redundância), porque isso é a sprint ativa agora.
- Regras inegociáveis de todo model (tenant guard, soft delete, audit trail) — documentadas nas duas árvores.
- Stack técnica real (parcialmente) — `03-ENGINEERING/STACK.md` (Árvore B, incompleto) e `01-product/CURRENT_STATE.md` (Árvore A, completo e batendo com sua memória de projeto: Tailwind, shadcn/ui, React Hook Form + Zod, TanStack Query, Recharts, date-fns).

## Categoria 2 — Conhecimento parcialmente documentado (o que falta exatamente)

1. **`03-ENGINEERING/STACK.md` (Árvore B) está incompleto** frente à realidade do código. Falta: Tailwind CSS 4, shadcn/ui (Radix), React Hook Form + Zod, TanStack Query, Recharts, date-fns, `@anthropic-ai/sdk` + Vercel AI SDK. Tudo isso já está listado corretamente em `CURRENT_STATE.md` (Árvore A) — é cópia direta, não trabalho de descoberta.
2. **Soft delete "incompleto"** — `04-OPERATIONS/KNOWN_ISSUES.md` (Árvore B) manda "rodar grep e conferir", sem dar a lista. Eu rodei: confirmado contra `schema.prisma` real.
   - **Têm `deletedAt`:** Cliente, Implantacao, Lead, Tarefa, Transacao (5 de 12 models).
   - **Não têm:** Empresa, Usuario, Contato, EtapaImplantacao, Historico, ConfiguracaoEmpresa, HistoricoSinal (7 de 12 models).
   - Isso resolve o "known issue" com dado real em vez de instrução para refazer — mas a decisão de **quais desses 7 deveriam ter e não têm** (vs. quais são exceção legítima, como o próprio `Empresa`, a raiz do tenant) continua sendo do fundador. Ver `07-KNOWLEDGE/ENGINEERING_KNOWLEDGE.md` (novo, criado nesta auditoria).
3. **Tenant Guard — o princípio diz "sem exceção", a implementação real tem três lacunas verificadas:**
   - `prisma/rls-policies.sql` habilita Row Level Security em 11 tabelas mas só cria a policy `empresa_isolamento` em 8 delas. **`empresas`, `contatos` e `etapas_implantacao` têm RLS habilitado sem nenhuma policy** — a depender de qual role o Prisma usa para conectar (`service_role` do Supabase ignora RLS por padrão), isso pode significar acesso total bloqueado ou RLS simplesmente inofensivo/ignorado. Não dá para saber qual dos dois só lendo os arquivos — é uma pergunta técnica real em aberto.
   - `HistoricoSinal` não está na lista de `ALTER TABLE ... ENABLE ROW LEVEL SECURITY` nenhuma — zero RLS nessa tabela.
   - Existe um wrapper (`src/lib/prisma-tenant-safe.ts`, `prismaSeguro`) desenhado exatamente para pegar queries sem `empresaId` — mas **nenhum dos 7 services do projeto o importa**; todos usam `@/lib/prisma` direto. Ou seja: o "segundo nível de proteção" documentado no próprio comentário do arquivo não está, de fato, rodando em produção nenhuma. Isso é um risco real, não um problema de documentação — registrei como item de prioridade alta em `KNOWN_ISSUES.md` atualizado (ver anexo).
4. **`AGENTS.md` existe em três lugares diferentes com sentidos diferentes** — `sistema/AGENTS.md` (aviso genérico sobre a versão do Next.js, nada de regra de projeto), `docs/04-agents/AGENTS.md` (Árvore A) e `docs/05-AI/AGENTS.md` (Árvore B). Um agente novo pode facilmente ler o errado achando que é o mesmo arquivo.

## Categoria 3 — Conhecimento inexistente (o que ainda não existe, por que importa, prioridade)

| O que falta | Por que importa | Prioridade |
|---|---|---|
| Decisão explícita sobre qual árvore de documentação é oficial (Achado Zero) | Sem isso, qualquer agente de IA novo pode ler a árvore errada e implementar o domínio errado (Atendimento/Venda em vez de Lead/Cliente) | **Alta** |
| `TESE_DE_VALOR.md` como a Árvore A originalmente pedia — **na prática, já parcialmente resolvido**: `01-VISION/THESIS.md` (Árvore B) cumpre esse papel, só que as remissões da Árvore A (`AGENTS.md`, `ARCHITECTURE.md`, `DIAGNOSIS_ENGINE.md` citam "TESE_DE_VALOR.md §8", "§10") continuam apontando para um arquivo que não existe com essa numeração de seção | Média (é conserto de referência, não pesquisa nova) |
| As 5 perguntas do Financeiro Essencial — `TERMINOLOGY.md` e `06-BUSINESS/*` (Árvore B) marcam como `PENDENTE DE DEFINIÇÃO PELO FUNDADOR`, **mas `03-domain/DOMAIN.md` (Árvore A) já as lista**: "tenho dinheiro? quanto sobra? o que venceu? o que vai vencer? estou crescendo?" | Isso não é conhecimento inexistente — é conhecimento existente e disperso. Ver correção proposta abaixo. | **Alta** (resolve um pendente sem precisar perguntar a você) |
| Formato exato do Perfil Cognitivo (campos gerados pelo Diagnóstico) | Sem isso, quem implementar a sprint atual (Diagnóstico Inteligente) tem que inventar um formato | **Alta** — é literalmente a sprint ativa |
| Escada Comunitária (o que se oferece aos 100 fundadores) | Compromisso que será comunicado a clientes reais em breve | Média |
| Governança do Assistente da Ponte (regras de tom, limite, o que ele pode/não pode dizer sobre a empresa do cliente) | Ele já roda em produção (parcial); toda interação sem regra documentada é risco de imagem | Média-Alta |
| ICP, Pricing, Sales — hoje templates vazios | Necessário antes de recrutar os 100 fundadores de verdade | Alta, mas fora do escopo técnico desta auditoria |
| Playbooks (deploy, investigar bug de tenant, revisar sprint de agente) | Pasta existe, vazia, nas duas árvores | Baixa agora — cresce com o primeiro incidente real |
| Decisão sobre o gap de RLS (item 3 da Categoria 2) | Risco de segurança concreto e não resolvido | **Alta** |

## Categoria 4 — Conhecimento redundante (unificar)

1. **Duas árvores de documentação inteiras** (Achado Zero) — a redundância mãe de todas as outras.
2. **Diagnóstico Inteligente documentado duas vezes com conteúdo ligeiramente diferente**: `06-BUSINESS/DIAGNOSTIC.md` (B) vs `03-domain/DIAGNOSIS_ENGINE.md` (A). Os 5 blocos batem (Empresa/Operação/Gestão/Problemas/Objetivos), mas o texto exato das perguntas diverge em detalhes. Como esta é a sprint ativa agora, isso é o item de unificação mais urgente de todos — dois agentes trabalhando um em cada árvore vão implementar diagnósticos diferentes.
3. **ADRs em dois lugares com numeração própria e sem se referenciar**: `02-engineering/ADR.md` (A, ADR-001 a ADR-005 + pedido de ADR-006) vs `03-ENGINEERING/ADR/ADR-001.md` e `ADR-002.md` (B, arquivos separados). Mesmo padrão (Contexto/Decisão/Consequência), zero link entre os dois.
4. **`DECISIONS.md`/`DECISION_LOG` em três formatos**: `04-OPERATIONS/DECISIONS.md` (B), `01-product/PRODUCT_DECISION_LOG.md` (A), e os ADRs em si. Fazem parte do mesmo patrimônio ("por que decidimos X") mas vivem sem cross-reference.
5. **`KNOWN_ISSUES.md` em ambas as árvores**, cada uma com achados que a outra não tem (a B tem a recomendação de descartar auditorias corrompidas; a A tem o achado do `deletedAt` faltando e do `tsconfig.tsbuildinfo` versionado por engano).
6. **`STACK.md` (B) vs a seção de stack de `ARCHITECTURE.md` (A) vs `CURRENT_STATE.md` (A)** — três descrições da mesma coisa, com níveis de precisão diferentes (ver Categoria 2, item 1).

---

## Lista priorizada dos novos documentos (Patrimônio de Conhecimento)

`TERMINOLOGY.md` já existe (você me enviou). Os demais itens do "Patrimônio de Conhecimento" pedidos na missão, com prioridade e justificativa:

| Documento | Prioridade | Justificativa |
|---|---|---|
| `KNOWLEDGE_MAP.md` | Alta | Exigido explicitamente pela missão (item 6); é o único jeito de amarrar as duas árvores + os novos documentos abaixo em um mapa único |
| `ENGINEERING_KNOWLEDGE.md` | Alta | É onde os três achados técnicos verificados desta auditoria (soft delete real, gap de RLS, guard não usado) ficam registrados como conhecimento permanente, não perdidos em um chat |
| `LESSONS_LEARNED.md` | Alta | Já existem lições reais e não-óbvias nesta auditoria (duas árvores divergindo silenciosamente, uma auditoria anterior descartada por corrupção, um guard de segurança desenhado e nunca conectado) — perder isso é repetir o erro |
| `DECISION_LIBRARY.md` | Média | Não deve duplicar `DECISIONS.md`/`ADR.md`/`PRODUCT_DECISION_LOG.md` — deve ser o índice que aponta para os três, resolvendo a redundância 4 acima |
| `UX_DECISIONS.md` | Média | Já existem decisões de tom implícitas espalhadas (CRM invisível como "lista de ações, não cadastro", regra de nunca inferir estado emocional não declarado) que nunca foram consolidadas num lugar de referência para quem escreve texto de interface |
| `KNOWLEDGE_REGISTRY.md` | Baixa por ora | **Atenção a colisão de nome:** já existe um conceito de produto chamado `KnowledgeRegistry` (congelado, Fase 3, backend). Este documento aqui é outra coisa — é o registro de padrões observados sobre o próprio negócio Ponte Digital, não uma feature do produto. Criei com uma nota de desambiguação explícita para não confundir os dois no futuro. |
| `BUSINESS_PATTERNS.md` | Baixa por ora | Sem clientes reais ainda, não há padrão de negócio a registrar — criado como estrutura vazia, correto conforme a regra "nunca preencher com criatividade" |
| `CUSTOMER_PATTERNS.md` | Baixa por ora | Mesma razão — pendente até os 100 fundadores gerarem uso real |

---

## O que fiz agora vs. o que fica pendente de você

**Fiz:** criei os documentos acima (pasta `docs/07-KNOWLEDGE/`), com conteúdo real onde havia informação suficiente e `PENDENTE DE DEFINIÇÃO PELO FUNDADOR` explícito onde não havia. Também corrigi `03-ENGINEERING/STACK.md` (Árvore B) para bater com `CURRENT_STATE.md`, e adicionei uma seção nova em `04-OPERATIONS/KNOWN_ISSUES.md` com os três achados técnicos verificados no código real.

**Pendente de decisão sua** (não decidi sozinho, seguindo a própria regra do repositório):
1. Confirmar se a Árvore B é mesmo a oficial daqui para frente, e o que fazer com a Árvore A (arquivar como pesquisa? mesclar o `MAPA_DE_MATURIDADE.md` para dentro da B?).
2. Decidir o que fazer com o gap de RLS e o guard `prismaSeguro` não conectado — isso é código, não documentação, e devo tratar como uma tarefa de engenharia separada, não silenciosamente corrigir aqui.
3. Confirmar se as 5 perguntas do Financeiro Essencial encontradas em `DOMAIN.md` (Árvore A) são de fato a versão final — só copiei para a B como referência cruzada, não como decisão nova.
