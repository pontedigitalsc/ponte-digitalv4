# Sprint 7.2 — Conversational Learning (Aprendizados)

## Objetivo

Permitir que o empresário ensine explicitamente à Ponte seus valores, regras, preferências e objetivos — criando a primeira camada de aprendizado ativo onde o empresário ensina, não o contrário.

## O que foi entregue

- Modelo Prisma `Aprendizado` com 11 categorias: VALORES, PREFERENCIAS, REGRAS, OBJETIVOS, ROTINAS, EQUIPE, CLIENTES, FINANCEIRO, OPERACAO, VISAO, RISCOS
- Origens: CONVERSA, MANUAL, PERGUNTA
- `aprendizado-service.ts`: `adicionarAprendizado`, `listarAprendizados`, `contagemPorCategoria`, `aprendizadosParaContexto`, `aprendizadosRecentes`, `desativarAprendizado`
- 12 perguntas rápidas pré-cadastradas (ex: "Como você escolhe um fornecedor?", "Qual valor nunca pode faltar na sua empresa?")
- `obterPerguntasRapidas` — lista completa
- `obterPerguntaAleatoria` — com filtro de já respondidas
- Integração com `identity-engine.ts`: `construirIdentidade` inclui `aprendizadosParaContexto` nas `verdadesEstaveis`; `contextoParaAssistente` retorna `aprendizados`
- Factory `construirLearningExperience` no Experience Engine
- Página `/dashboard/aprendizados`:
  - `ConversationKnowledgeCard` — lista de aprendizados com opção de desativar
  - `QuickLearningQuestion` — pergunta aleatória com input de resposta
  - `LearningHistory` — histórico completo de aprendizados registrados
- API route `/api/aprendizados`:
  - POST: criar aprendizado (descricao, categoria, origem, contexto)
  - DELETE: desativar aprendizado (soft delete via `ativo: false`)
- Sidebar: item "Aprendizados" (RefreshCw) no grupo Inteligência
- Dashboard: seção "O que aprendemos sobre sua empresa" com top 3
- Métrica `obterLearningMetrics` no Observatório
- `prisma db push` + `prisma generate` executados

## Arquitetura

- **Novo model Prisma** `Aprendizado` com relação em `Empresa`
- **Nenhuma IA envolvida** — inserção manual/direta, sem chamadas a provedor de IA
- **Fluxo cognitivo:** `adicionarAprendizado` → `registrarNaMemoria` (tipo: 'descoberta') → disponível via `construirIdentidade`/`contextoParaAssistente`

## Critérios de aceite

- [x] Aprendizado é criado via POST e persiste no banco
- [x] Aprendizado é desativado via DELETE (soft delete)
- [x] Listagem respeita filtros (categoria, ativo, limite)
- [x] Contagem por categoria funciona
- [x] Perguntas rápidas são exibidas e permitem resposta
- [x] Aprendizados aparecem no contexto do assistente
- [x] Aprendizados aparecem no dashboard (top 3)
- [x] Sidebar exibe link para Aprendizados
- [x] Build (`npx tsc --noEmit`) sem erros

## Não implementado (fora de escopo)

- Edição de aprendizado existente
- Categorização automática via IA
- Sugestão inteligente de perguntas baseada no perfil da empresa
- Gamificação ou reconhecimento por responder perguntas
