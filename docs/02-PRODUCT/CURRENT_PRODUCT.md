# CURRENT_PRODUCT.md — Estado Atual do Produto (V4 Founder)

> **MARCO: Foundation Freeze V1 — 29 de julho de 2026**
>
> A Fundação V1 da Ponte Digital está oficialmente congelada.
>
> Programas 21 a 32 concluídos. Constituição aprovada (13 documentos). Motor Cognitivo implementado. Dashboard Evolutivo com 33 componentes. Curva de Evolução, Capital Cognitivo, Capacidades e Patrimônios implementados.
>
> **A partir deste ponto:**
> - Nenhuma alteração na Constituição sem emenda
> - Nenhuma alteração na Teoria da Evolução Empresarial sem ADR
> - Toda nova funcionalidade deve passar pela Árvore de Decisões de Produto (10 nós)
> - A Regra de Ouro ("A Ponte Digital não decide pela empresa") é inegociável
>
> Ver `docs/07-MILESTONES/FOUNDATION_FREEZE_V1.md` para o congelamento completo.
> Ver `docs/07-MILESTONES/RELATORIO_EXECUTIVO_FOUNDATION_V1.md` para a auditoria completa.
>
> ---
>
> **Registro histórico da fase (Programa 32):**
>
> A Ponte Digital foi reposicionada em torno de **9 Capacidades Fundamentais**: Observar, Compreender, Esclarecer, Priorizar, Decidir, Executar, Aprender, Incorporar, Adaptar.
>
> **Capital Cognitivo** passa a ser o patrimônio central da plataforma — composto por decisões validadas, capacidades desenvolvidas, aprendizados registrados, hipóteses confirmadas, conhecimento acumulado e consistência operacional.
>
> **Ciclo oficial de evolução:** OBSERVAR → COMPREENDER → ESCLARECER → PRIORIZAR → DECIDIR → EXECUTAR → APRENDER → INCORPORAR → NOVA CAPACIDADE
>
> Ver `docs/06-CONSTITUTION/P32/` para a Constituição completa.

*Documento operacional, complementar ao FOUNDATION.md e à Tese de Valor (Nível 1). É a referência principal para qualquer agente de código — Roo Code, Gemini CLI, Claude ou outro — antes de qualquer tarefa de implementação. Atualizar a cada sprint concluída. Máximo duas páginas: se crescer além disso, o excesso vira Playbook (Nível 3), não fica aqui.*

**Objetivo desta fase:** validar as **8 Capacidades Fundamentais** com 100 fundadores — não apenas acumular evidências, mas testar se a materialização da Teoria da Evolução Empresarial produz empresários mais conscientes, adaptáveis e tranquilos. Os 100 primeiros são co-autores da tese: cada interação fortalece ou questiona uma capacidade, gera Capital Cognitivo e alimenta a Curva Evolutiva.

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

## 2. Foundation Freeze V1 (Programas 21–32 concluídos)

**A fundação está congelada.** Os programas abaixo foram concluídos e documentados em `docs/07-MILESTONES/CHANGELOG_OFICIAL.md`.

**Programas concluídos:**
- P21 — Empresa Zero
- P22 — Motor Cognitivo
- P23 — Experiência Cognitiva
- P24 — Certificação da Fundação
- P25 — Era da Observação
- P26 — Empresa que Aprende
- P27 — Polimento & Microinterações
- P28 — Sistema Visual Oficial
- P29 — Materialização & Auditoria
- P30 — Critérios & Matriz de Materialização
- P31 — Dashboard Evolutivo + Fase Final
- P31D — Experiência da Evolução (Finalização)
- P32 — Constituição da Ponte Digital

**Próxima fase:** Fase 2 — Primeiros Clientes.
Ver `docs/07-MILESTONES/ROADMAP_POS_FUNDACAO.md` para a visão macro das próximas fases.

**Nota importante:** A auditoria da Foundation V1 (ver `docs/07-MILESTONES/RELATORIO_EXECUTIVO_FOUNDATION_V1.md`) identificou débitos técnicos significativos (P0–P3) que devem ser resolvidos antes de iniciar a Fase 2. Em especial: simplificação do dashboard (33 → 7 cards), eliminação de 60% dos engines, correção de rotas quebradas e remoção de dead code.

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

1. Não crie um ERP completo — crie um empresário mais tranquilo. Toda funcionalidade deve responder: **Qual capacidade empresarial ela fortalece?** Se não fortalece nenhuma das 8 (Observar, Compreender, Esclarecer, Priorizar, Decidir, Executar, Aprender, Evoluir), não implementar.
2. **Capital Cognitivo é o patrimônio central** — decisões validadas, capacidades desenvolvidas, aprendizados registrados, hipóteses confirmadas, conhecimento acumulado, consistência operacional. Toda funcionalidade deve aumentar pelo menos um destes.
3. **Esforço mental é o inimigo** — o critério universal de avaliação inclui: a funcionalidade reduz o esforço mental do empresário? Se não, ela precisa gerar Capital Cognitivo suficiente para justificar o custo de atenção.
4. O estágio da empresa (hoje: MVP/0-25 empresas) é o teto da sofisticação técnica — nunca ativar um recurso avançado antes de evidência real.
5. Soft delete, audit trail e tenant guard em todo model, desde o primeiro módulo.
6. O Centro de Decisão nunca mostra mais itens do que a empresa consegue executar naquele dia.
7. Nenhuma funcionalidade entra sem passar pelo critério universal: (a) Qual capacidade fortalece? (b) Como aumenta Capital Cognitivo? (c) Como reduz esforço mental?
8. Todo pedido para o agente de código chega como especificação fechada (objetivo, arquivos, regras, critérios de aceite) — nunca como "continue o projeto" ou "pense em melhorias".

---

*A Tese de Valor e o FOUNDATION.md continuam sendo a referência de visão de longo prazo, mas não devem guiar decisões de escopo do dia a dia enquanto a V4 Founder estiver em construção — esse papel é deste documento. Quando uma sprint terminar, atualizar as seções 1 e 2 antes de começar a próxima.*
