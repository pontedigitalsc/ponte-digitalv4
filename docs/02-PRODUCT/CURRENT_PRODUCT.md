# CURRENT_PRODUCT.md — Estado Atual do Produto (V4 Founder)

*Documento operacional, complementar ao FOUNDATION.md e à Tese de Valor (Nível 1). É a referência principal para qualquer agente de código — Roo Code, Gemini CLI, Claude ou outro — antes de qualquer tarefa de implementação. Atualizar a cada sprint concluída. Máximo duas páginas: se crescer além disso, o excesso vira Playbook (Nível 3), não fica aqui.*

**Objetivo desta fase:** colocar 100 fundadores usando uma versão básica, mas funcional, da Ponte — para acumular evidências reais antes de investir em arquitetura cognitiva sofisticada. Os 100 primeiros não são clientes comuns: são o laboratório que valida as hipóteses da Tese de Valor.

**Nota de posicionamento (2026-07-14):** desde `ADR-003`, o produto é entendido em duas camadas — Ecossistema Público (Diagnóstico) e Plataforma Cognitiva (os outros 6 pilares). Isso é reposicionamento estratégico, não muda o que está descrito tecnicamente abaixo: a V4 Founder continua sendo uma única aplicação. Ver `01-VISION/THESIS.md` e `07-BUSINESS/JORNADA_APOIADOR.md`.

**Nota arquitetural (2026-07-18):** 34 ADRs foram revisadas e aprovadas (001–034). A Ontologia Cognitiva — teoria do conhecimento da plataforma — está em `03-ENGINEERING/ONTOLOGIA_COGNITIVA.md` (camada superior ao DDD). A arquitetura do Motor Cognitivo em `03-ENGINEERING/MOTOR_COGNITIVO.md`, a auditoria arquitetural em `03-ENGINEERING/AUDITORIA_ARQUITETURAL.md`, e a especificação DDD em `03-ENGINEERING/ARCHITECTURE_DDD.md`. A implementação segue o plano de 6 fases da auditoria (Fase 0 → Fase 5). Ver `04-DECISIONS/ADR/` para as 34 ADRs.

---

## 1. O que já existe e funciona

*(Atualizado a partir de auditoria de código. Atualizar a cada sprint — esta seção reflete o código real, não a visão.)*

**Construído e funcional:**
- CRM — pipeline de Lead (kanban, temperatura) → conversão em Cliente, contatos, busca/filtro
- Financeiro — transações de receita/despesa, categorização, recorrência, resumo e filtros
- Tarefas — criação, atribuição, prioridade, tipos (ligação, e-mail, reunião, follow-up, visita), status
- Onboarding de cliente — processo em etapas, acompanhamento de conclusão
- Histórico/Timeline consolidado por cliente/lead
- Assistente IA — chat com Anthropic, limites por plano (0/50/500 msgs/dia)
- Multiempresa, papéis de usuário (ADMIN/GESTOR/MEMBRO), configurações por empresa
- Camada de sinal simples (`HistoricoSinal`) gerando alertas — versão simplificada do Motor de Priorização
- **Knowledge Vault (Biblioteca de Conhecimento)** — página `/dashboard/conhecimento` com sumário, filtros (busca, categoria, status, ordenação), cards de conhecimento validado com score de confiança, timeline de eventos cognitivos, categorização por área (FINANCEIRO, CLIENTES, OPERAÇÃO, etc.). Status derivado do `scoreConfiança` (≥60 confirmado, <20 descartado, 20-59 em observação). Reaproveita `ConhecimentoValidado`, `Hipotese`, `Evidencia`, `MemoriaCognitiva` — sem novos models Prisma.
- **Conversational Learning (Aprendizados)** — página `/dashboard/aprendizados` com `ConversationKnowledgeCard`, `QuickLearningQuestion` (12 perguntas rápidas em 11 categorias: VALORES, PREFERENCIAS, REGRAS, OBJETIVOS, ROTINAS, EQUIPE, CLIENTES, FINANCEIRO, OPERACAO, VISAO, RISCOS), `LearningHistory`. Modelo Prisma `Aprendizado` com origens CONVERSA/MANUAL/PERGUNTA. Inserção no fluxo cognitivo via `construirIdentidade` e `contextoParaAssistente`. API route `/api/aprendizados` (POST + DELETE).
- **Infraestrutura Cognitiva completa (10 motores):** Cognitive Orchestrator, Context Engine, Memory Engine, Decision Engine, Action Engine, Feedback Engine, Outcome Engine, Evolution Engine, Knowledge Governance Engine, Identity Engine. Experience Engine com factories para todas as páginas. Cognitive Observatory com métricas KV, learning, OS, evolution.

**Divergências de arquitetura em relação ao Plano Mestre — aceitáveis, dentro do congelamento (seção 3), NÃO são débito a corrigir agora:**
- API Routes chamando services diretamente, em vez de `server/actions → server/services → server/repositories`
- `HistoricoSinal` no lugar de um catálogo formal de `DomainEvent` semânticos
- Motor de decisão como função simples, não Strategy Pattern / Motor Cognitivo

**Gap real (não é simplificação aceitável — é escopo ativo que ficou pra trás):**
- ❌ Agenda como capacidade — não existe

**Violação de princípio inegociável (corrigir logo, independente de fase):**
- ⚠️ Soft delete incompleto — alguns models não têm `deletedAt`. Isso está na lista de princípios que nunca podem ser quebrados (seção 5), não é uma escolha de sofisticação por estágio.

**Zero cobertura de teste** — aceitável por ora, mas recomenda-se um mínimo de testes de fumaça em autenticação e transações financeiras (área de maior risco silencioso), não uma suíte completa — isso ainda seria sofisticação prematura pra esta fase.

## 2. O que foi construído nas últimas sprints

**Sprints concluídas:**

### Sprint 7.1 — Knowledge Vault (Biblioteca de Conhecimento)
Camada de visualização e gestão do conhecimento validado da empresa. Reaproveita modelos existentes (`ConhecimentoValidado`, `Hipotese`, `Evidencia`, `MemoriaCognitiva`) — sem novos models Prisma.

**Entregues:**
- Página `/dashboard/conhecimento` com sumário, filtros (busca textual, categoria, status, ordenação), lista de conhecimentos validados
- Componentes: `KnowledgeTag`, `KnowledgeCard`, `KnowledgeSummary`, `KnowledgeFilters`, `KnowledgeTimeline`
- Factory `construirConhecimentoExperience` no Experience Engine
- Métrica `obterKnowledgeVaultMetrics` no Observatório
- Sidebar: item "Conhecimento" (Sparkles) no grupo Inteligência
- Status derivado do `scoreConfiança` (≥60 confirmado, <20 descartado, 20-59 em observação)

### Sprint 7.2 — Conversational Learning (Aprendizados)
Captura explícita de aprendizados do empresário sobre valores, regras, preferências e objetivos da empresa. Primeira camada de aprendizado ativo — o empresário ensina a Ponte, não o contrário.

**Entregues:**
- Modelo Prisma `Aprendizado` (11 categorias: VALORES, PREFERENCIAS, REGRAS, OBJETIVOS, ROTINAS, EQUIPE, CLIENTES, FINANCEIRO, OPERACAO, VISAO, RISCOS; origens CONVERSA/MANUAL/PERGUNTA)
- `aprendizado-service.ts` — CRUD completo + perguntas rápidas (12 perguntas)
- `identity-engine.ts` — `construirIdentidade` inclui `aprendizadosParaContexto` nas `verdadesEstaveis`; `contextoParaAssistente` retorna `aprendizados`
- Factory `construirLearningExperience` no Experience Engine
- Página `/dashboard/aprendizados` com `ConversationKnowledgeCard`, `QuickLearningQuestion`, `LearningHistory`
- API route `/api/aprendizados` (POST + DELETE)
- Sidebar: item "Aprendizados" (RefreshCw) no grupo Inteligência
- Dashboard: seção "O que aprendemos sobre sua empresa" com top 3
- Métrica `obterLearningMetrics` no Observatório

### Próximas sprints (ordem proposta):
1. **Agenda como capacidade** — ainda não existe
2. **Centro de Decisão** — tela dedicada sobre `HistoricoSinal` com regras de priorização
3. **Assistente IA com contexto completo** — já existe, mas integrar mais dados do diagnóstico + aprendizados

**Fora de escopo para estas sprints:** implementação física das ADRs aprovadas (009–034) que envolvem mudança de código. As ADRs estão aceitas como arquitetura-alvo, mas seguem o plano de 6 fases da auditoria (`03-ENGINEERING/AUDITORIA_ARQUITETURAL.md`). Nenhuma implementação começa antes das ADRs de fundação (Fase 0 documental) estarem refletidas nos documentos de engenharia.

## 3. O que está congelado para versões futuras

Não implementar agora — mas com as ADRs 009–034 aprovadas, a arquitetura futura está definida. A implementação segue o plano de 6 fases da auditoria (`03-ENGINEERING/AUDITORIA_ARQUITETURAL.md`). Itens abaixo permanecem sem ADR e sem previsão:

- Motor 4 — Conversação Contínua
- Modelo Cognitivo do Empresário (perfil adaptativo de decisão)
- Memória de Decisões estruturada e o Espelho de Decisões
- KnowledgeRegistry e os Patrimônios de Conhecimento
- Nível de Confiança do Empresário
- Camada de Sensibilidade Situacional
- BusinessMoment / EmpresaState sofisticado (hoje: status simples, sem inferência)
- Patrimônio Empresarial (5 dimensões) e suas visualizações — Evolução Contínua, DNA da Empresa, Espelho da Empresa
- Inteligência Coletiva (scope coletivo/institucional)
- Opportunity como estágio intermediário antes da Recomendação

**O que as ADRs aprovadas destravam (arquitetura definida, implementação futura):**
- Motor Cognitivo como barramento central (ADR-015) — arquitetura definida, sem código ainda
- Ciclo cognitivo contínuo (ADR-013) + pipeline único (ADR-024) — substituirá o ciclo atual
- Event Bus formal (ADR-011) + catálogo de eventos (ADR-012) — substituirá switch/case
- Submotores isolados por eventos (ADR-016) — engines atuais serão refatoradas gradualmente
- Contexto Cognitivo como pacote fechado (ADR-021) — IA receberá contexto pronto
- IA como tradutora (ADR-017) — IA para de interpretar dados brutos
- Hierarquia de memória (ADR-019) + esquecimento programado (ADR-026) — ciclo de vida completo
- Agregado único PatrimonioCognitivo (ADR-010) — unifica 5 tabelas hoje fragmentadas
- Curadoria obrigatória (ADR-028) + Correlation ID (ADR-027) — qualidade e rastreabilidade
- Agregados renomeados para português (ADR-029) — nomenclatura consistente com a Ontologia
- Eliminação de duplicatas Crenca/ConhecimentoDaIdentidade (ADR-030) — fonte única da verdade
- Padrão e Correlação como conceitos formais (ADR-031) — eventos dedicados no barramento
- Convicção no algoritmo de priorização (ADR-032) — conhecimento testado pelo tempo pesa mais
- Invariantes de domínio separados de regras técnicas (ADR-033) — clareza documental
- Política de causalidade vs correlação (ADR-034) — garantia executável contra falsas causalidades

**Novo na hierarquia de documentos:** `03-ENGINEERING/ONTOLOGIA_COGNITIVA.md` torna-se a camada entre a Constituição e o Motor Cognitivo, definindo formalmente os 19 conceitos fundamentais (Fato, Observação, Evento, Sinal, Evidência, Hipótese, Convicção, Conhecimento, Aprendizado, Memória, Contexto, Decisão, Resultado, Feedback, Padrão, Correlação, Regra, Insight, Sabedoria Empresarial).

**Regra de desacoplamento — a mais importante desta lista:** o Centro de Decisão existe desde o Sprint 6, mas hoje é alimentado por regras simples. Quando o Motor Cognitivo entrar, ele substitui apenas o "motor" por trás da tela — a experiência do empresário não muda. Nenhuma implementação atual pode acoplar lógica de decisão diretamente na tela, exatamente para permitir essa troca sem retrabalho.

## 4. O que é hipótese e não deve ser tratado como verdade do sistema

*Registro completo, com status e evidência por hipótese, em `08-KNOWLEDGE/HYPOTHESES.md` — a lista abaixo é o resumo em prosa.*

Tratar como pergunta em aberto até validar com os 100 fundadores, nunca como regra de negócio definitiva no código:

- Empresários responderão diagnósticos e check-ins continuamente.
- Aceitarão participar de experimentos controlados.
- Conhecimento coletivo produzirá recomendações melhores que conhecimento individual isolado.
- Reconhecimento comunitário será percebido como valioso, não como gamificação vazia.
- Recomendações adaptadas ao perfil de decisão têm maior aceitação que recomendações genéricas.
- O Nível de Confiança realmente prevê quando aceitar sugestões mais ousadas.
- O Índice de Tranquilidade engaja mais que indicadores financeiros tradicionais.

## 5. Princípios que nunca podem ser quebrados, nem nesta fase enxuta

1. Não crie um ERP completo — crie um empresário mais tranquilo.
2. Toda funcionalidade responde: ajuda a decidir esta semana? aumenta conhecimento futuro? fortalece um Patrimônio Empresarial?
3. O estágio da empresa (hoje: MVP/0-25 empresas) é o teto da sofisticação técnica — nunca ativar um recurso avançado antes de evidência real.
4. Soft delete, audit trail e tenant guard em todo model, desde o primeiro módulo.
5. O Centro de Decisão nunca mostra mais itens do que a empresa consegue executar naquele dia.
6. Nenhuma funcionalidade entra sem passar pela Matriz de Decisão de Funcionalidades.
7. Todo pedido para o agente de código chega como especificação fechada (objetivo, arquivos, regras, critérios de aceite) — nunca como "continue o projeto" ou "pense em melhorias".

---

*A Tese de Valor e o FOUNDATION.md continuam sendo a referência de visão de longo prazo, mas não devem guiar decisões de escopo do dia a dia enquanto a V4 Founder estiver em construção — esse papel é deste documento. Quando uma sprint terminar, atualizar as seções 1 e 2 antes de começar a próxima.*
