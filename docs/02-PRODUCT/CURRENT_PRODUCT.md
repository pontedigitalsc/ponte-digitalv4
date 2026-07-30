# CURRENT_PRODUCT.md â€” Estado Atual do Produto (V4 Founder)

> **MARCO: Stable Release V3 â€” PreparaÃ§Ã£o Definitiva para ProduÃ§Ã£o â€” 29 de julho de 2026**
> 
> Programas 21 a 41 concluÃ­dos. FundaÃ§Ã£o completa, congelada e liberada. Sistema cientÃ­fico implementado. Todas as auditorias de produÃ§Ã£o aprovadas.
> 
> **A Ponte Digital deixa de ser um projeto em desenvolvimento. Passa a ser uma plataforma em produÃ§Ã£o, pronta para receber empresas reais e evoluir exclusivamente por meio de evidÃªncias coletadas com seus Founders.**
> 
> P41 â€” Stable Release V3 entregou: auditoria geral da aplicaÃ§Ã£o (cÃ³digo morto removido, /register eliminado), auditoria de banco de dados (3 migrations, sincronizado), auditoria de seguranÃ§a (proxy/middleware ativo, tenant guard com bloqueio em produÃ§Ã£o, .env.example completo sem secrets versionados), auditoria de experiÃªncia Founder (fluxo completo validado), correÃ§Ã£o de documentaÃ§Ã£o (FEATURE_MATRIX, CURRENT_PRODUCT, CHANGELOG, MANIFESTO), snapshot oficial da arquitetura, congelamento tÃ©cnico formal.
> 
> **Build: 19.1s compile. TypeScript: 0 erros. 45 rotas (24 pÃ¡ginas + 30 APIs). Proxy: ATIVO.**
> 
> Principais entregas do P34B:
> - **PÃ¡gina Ãšnica de Atendimento** (`/atendimento`) â€” busca + reconhecimento + confirmaÃ§Ã£o em â‰¤5s
> - **Centro DiÃ¡rio** (`/dashboard`) â€” substitui dashboard por 5 perguntas essenciais
> - **Timeline Viva** (`/historico`) â€” memÃ³ria unificada da empresa
> - **Caixa Inteligente** â€” caixa como consequÃªncia, nÃ£o mÃ³dulo separado
> - **Ciclo Cognitivo Visual** â€” 8 capacidades visÃ­veis na interface
> - **Sidebar simplificada** â€” navegaÃ§Ã£o por fluxo (Trabalho/Consultar/Aprender/Sistema)
> - **Foundation Candidate V2** â€” documento oficial da nova base
> 
> **A partir deste ponto:**
> - Nenhuma alteraÃ§Ã£o na ConstituiÃ§Ã£o sem emenda
> - Nenhuma alteraÃ§Ã£o na Teoria da EvoluÃ§Ã£o Empresarial sem ADR
> - Toda nova funcionalidade deve passar pela Ãrvore de DecisÃµes de Produto (10 nÃ³s)
> - A Regra de Ouro ("A Ponte Digital nÃ£o decide pela empresa") Ã© inegociÃ¡vel
> - **Cada aÃ§Ã£o operacional deve fortalecer automaticamente o Capital Cognitivo**
> - **Nenhuma informaÃ§Ã£o importante pode depender de lanÃ§amentos duplicados**
> - **Nenhuma tela pode existir apenas para registrar dados**
> - **Registrar atendimento em â‰¤5 segundos** â€” critÃ©rio de aprovaÃ§Ã£o do P34B
> 
> Ver `docs/07-MILESTONES/FOUNDATION_CANDIDATE_V2.md` para o candidato oficial.
> Ver `docs/02-PRODUCT/P34_FLUXO_COGNITIVO_OPERACIONAL.md` para o design completo do P34.
> 
> ---
> 
> **Registro histÃ³rico da fase (Programa 32-33):**
> 
> A Ponte Digital foi reposicionada em torno de **8 Capacidades Fundamentais**: Observar, Compreender, Esclarecer, Priorizar, Decidir, Executar, Aprender, Evoluir.
> 
> **Capital Cognitivo** passa a ser o patrimÃ´nio central da plataforma â€” composto por decisÃµes validadas, capacidades desenvolvidas, aprendizados registrados, hipÃ³teses confirmadas, conhecimento acumulado e consistÃªncia operacional.
> 
> **Programa 33** eliminou toda aparÃªncia de ERP: 35 componentes mortos deletados, jargÃ£o tÃ©cnico removido (HealthScore, ConfidenceRing, CognitiveAvatar, ScoreBar), 4 documentos de auditoria produzidos (`docs/05-OPERATIONS/SPRINTS/`).
> 
> **Programa 34 (atual)** projeta o Fluxo Cognitivo Operacional â€” onde operaÃ§Ã£o e inteligÃªncia sÃ£o inseparÃ¡veis.
> 
> **Ciclo oficial de evoluÃ§Ã£o:** OBSERVAR â†’ COMPREENDER â†’ ESCLARECER â†’ PRIORIZAR â†’ DECIDIR â†’ EXECUTAR â†’ APRENDER â†’ INCORPORAR â†’ NOVA CAPACIDADE
> 
> Ver `docs/06-CONSTITUTION/P32/` para a ConstituiÃ§Ã£o completa.

*Documento operacional, complementar ao FOUNDATION.md e Ã  Tese de Valor (NÃ­vel 1). Ã‰ a referÃªncia principal para qualquer agente de cÃ³digo â€” Roo Code, Gemini CLI, Claude ou outro â€” antes de qualquer tarefa de implementaÃ§Ã£o. Atualizar a cada sprint concluÃ­da. MÃ¡ximo duas pÃ¡ginas: se crescer alÃ©m disso, o excesso vira Playbook (NÃ­vel 3), nÃ£o fica aqui.*

**Objetivo desta fase:** validar as **8 Capacidades Fundamentais** com 100 fundadores â€” nÃ£o apenas acumular evidÃªncias, mas testar se a materializaÃ§Ã£o da Teoria da EvoluÃ§Ã£o Empresarial produz empresÃ¡rios mais conscientes, adaptÃ¡veis e tranquilos. Os 100 primeiros sÃ£o co-autores da tese: cada interaÃ§Ã£o fortalece ou questiona uma capacidade, gera Capital Cognitivo e alimenta a Curva Evolutiva.

**Nota de posicionamento (2026-07-14):** desde `ADR-003`, o produto Ã© entendido em duas camadas â€” Ecossistema PÃºblico (DiagnÃ³stico) e Plataforma Cognitiva (os outros 6 pilares). Isso Ã© reposicionamento estratÃ©gico, nÃ£o muda o que estÃ¡ descrito tecnicamente abaixo: a V4 Founder continua sendo uma Ãºnica aplicaÃ§Ã£o. Ver `01-VISION/THESIS.md` e `07-BUSINESS/JORNADA_APOIADOR.md`.

**Nota arquitetural (2026-07-18):** 34 ADRs foram revisadas e aprovadas (001â€“034). A Ontologia Cognitiva â€” teoria do conhecimento da plataforma â€” estÃ¡ em `03-ENGINEERING/ONTOLOGIA_COGNITIVA.md` (camada superior ao DDD). A arquitetura do Motor Cognitivo em `03-ENGINEERING/MOTOR_COGNITIVO.md`, a auditoria arquitetural em `03-ENGINEERING/AUDITORIA_ARQUITETURAL.md`, e a especificaÃ§Ã£o DDD em `03-ENGINEERING/ARCHITECTURE_DDD.md`. A implementaÃ§Ã£o segue o plano de 6 fases da auditoria (Fase 0 â†’ Fase 5). Ver `04-DECISIONS/ADR/` para as 34 ADRs.

---

## 1. O que jÃ¡ existe e funciona

*(Atualizado a partir de auditoria de cÃ³digo. Atualizar a cada sprint â€” esta seÃ§Ã£o reflete o cÃ³digo real, nÃ£o a visÃ£o.)*

**ConstruÃ­do e funcional (estado atual â€” Foundation Candidate V2):**

**Fluxo Cognitivo Operacional (P34B):**
- **PÃ¡gina Ãšnica de Atendimento** (`/atendimento`) â€” busca + reconhecimento automÃ¡tico + confirmaÃ§Ã£o em â‰¤5s. Caixa Inteligente integrada (faturamento, ticket mÃ©dio, clientes do dia)
- **Centro DiÃ¡rio** (`/dashboard`) â€” substitui o dashboard antigo. Responde exatamente 5 perguntas: onde estamos, o que mudou, o que merece atenÃ§Ã£o, quem precisa de vocÃª, prÃ³ximo melhor movimento. Inclui Ciclo Cognitivo Visual (8 capacidades)
- **Timeline Viva** (`/historico`) â€” memÃ³ria unificada da empresa: mescla eventos operacionais + cognitivos
- **Sidebar simplificada** â€” navegaÃ§Ã£o por fluxo: Trabalho / Consultar / Aprender / Sistema

**NÃºcleo cognitivo (40+ engines, mantidos):**
- Motor Cognitivo â€” evidÃªncia, memÃ³ria, decisÃ£o, aprendizado, confianÃ§a, evoluÃ§Ã£o, governanÃ§a de conhecimento, identidade, orquestraÃ§Ã£o
- Camada de Sinais (`HistoricoSinal`) conectando operaÃ§Ã£o a cogniÃ§Ã£o
- Assistente â€” chat contextual com Anthropic
- Centro de DecisÃ£o â€” decisÃµes recomendadas com priorizaÃ§Ã£o
- Knowledge Vault â€” biblioteca de conhecimento validado
- Conversational Learning â€” aprendizado ativo via perguntas rÃ¡pidas

**FundaÃ§Ã£o:**
- DiagnÃ³stico (Conversa) â€” questionÃ¡rio adaptativo com revelaÃ§Ã£o
- AutenticaÃ§Ã£o multiempresa â€” login, criaÃ§Ã£o de conta, papÃ©is
- Landing, PÃ¡ginas de suporte (login, criar-conta, configuraÃ§Ãµes)

**Gap ativo:** Agenda como capacidade â€” nÃ£o existe (P35+).

**DivergÃªncias de arquitetura em relaÃ§Ã£o ao Plano Mestre â€” aceitÃ¡veis, dentro do congelamento (seÃ§Ã£o 3), NÃƒO sÃ£o dÃ©bito a corrigir agora:**
- API Routes chamando services diretamente, em vez de `server/actions â†’ server/services â†’ server/repositories`
- `HistoricoSinal` no lugar de um catÃ¡logo formal de `DomainEvent` semÃ¢nticos
- Motor de decisÃ£o como funÃ§Ã£o simples, nÃ£o Strategy Pattern / Motor Cognitivo

**Gap real (nÃ£o Ã© simplificaÃ§Ã£o aceitÃ¡vel â€” Ã© escopo ativo que ficou pra trÃ¡s):**
- âŒ Agenda como capacidade â€” nÃ£o existe

**ViolaÃ§Ã£o de princÃ­pio inegociÃ¡vel (corrigir logo, independente de fase):**
- âš ï¸ Soft delete incompleto â€” alguns models nÃ£o tÃªm `deletedAt`. Isso estÃ¡ na lista de princÃ­pios que nunca podem ser quebrados (seÃ§Ã£o 5), nÃ£o Ã© uma escolha de sofisticaÃ§Ã£o por estÃ¡gio.

**Zero cobertura de teste** â€” aceitÃ¡vel por ora, mas recomenda-se um mÃ­nimo de testes de fumaÃ§a em autenticaÃ§Ã£o e transaÃ§Ãµes financeiras (Ã¡rea de maior risco silencioso), nÃ£o uma suÃ­te completa â€” isso ainda seria sofisticaÃ§Ã£o prematura pra esta fase.

## 2. Foundation Freeze V1 (Programas 21â€“32 concluÃ­dos)

**A fundaÃ§Ã£o estÃ¡ congelada.** Os programas abaixo foram concluÃ­dos e documentados em `docs/07-MILESTONES/CHANGELOG_OFICIAL.md`.

**Programas concluÃ­dos:**
- P21 â€” Empresa Zero
- P22 â€” Motor Cognitivo
- P23 â€” ExperiÃªncia Cognitiva
- P24 â€” CertificaÃ§Ã£o da FundaÃ§Ã£o
- P25 â€” Era da ObservaÃ§Ã£o
- P26 â€” Empresa que Aprende
- P27 â€” Polimento & MicrointeraÃ§Ãµes
- P28 â€” Sistema Visual Oficial
- P29 â€” MaterializaÃ§Ã£o & Auditoria
- P30 â€” CritÃ©rios & Matriz de MaterializaÃ§Ã£o
- P31 â€” Dashboard Evolutivo + Fase Final
- P31D â€” ExperiÃªncia da EvoluÃ§Ã£o (FinalizaÃ§Ã£o)
- P32 â€” ConstituiÃ§Ã£o da Ponte Digital
- P33 â€” Limpeza de ERP & FundaÃ§Ã£o (auditoria, simplificaÃ§Ã£o, linguagem)
- P34 â€” Fluxo Cognitivo Operacional (design)
- P34B â€” MaterializaÃ§Ã£o Completa do Fluxo Cognitivo Operacional

**Fase atual:** Foundation Candidate V2 â€” pronta para P35 (Founder V1).
Ver `docs/07-MILESTONES/FOUNDATION_CANDIDATE_V2.md` para o candidato oficial.

**PrÃ³xima fase:** P35 â€” Founder V1 (auditoria final, validaÃ§Ã£o com empresa real, estabilizaÃ§Ã£o, deploy).
Ver `docs/07-MILESTONES/ROADMAP_POS_FUNDACAO.md` para a visÃ£o macro das prÃ³ximas fases.

**Nota importante:** A auditoria da Foundation V1 identificou dÃ©bitos tÃ©cnicos (P0â€“P3). O Programa 33 endereÃ§ou parte (remoÃ§Ã£o de dead code, simplificaÃ§Ã£o). O Programa 34 projetou o fluxo unificado. O Programa 34B materializou o fluxo: Atendimento, Centro DiÃ¡rio, Timeline Viva, Caixa Inteligente. A dÃ­vida restante estÃ¡ documentada em `docs/07-MILESTONES/FOUNDATION_CANDIDATE_V2.md` (seÃ§Ã£o 6).

## 3. O que estÃ¡ congelado para versÃµes futuras

NÃ£o implementar agora â€” mas com as ADRs 009â€“034 aprovadas, a arquitetura futura estÃ¡ definida. A implementaÃ§Ã£o segue o plano de 6 fases da auditoria (`03-ENGINEERING/AUDITORIA_ARQUITETURAL.md`). Itens abaixo permanecem sem ADR e sem previsÃ£o:

- Motor 4 â€” ConversaÃ§Ã£o ContÃ­nua
- Modelo Cognitivo do EmpresÃ¡rio (perfil adaptativo de decisÃ£o)
- MemÃ³ria de DecisÃµes estruturada e o Espelho de DecisÃµes
- KnowledgeRegistry e os PatrimÃ´nios de Conhecimento
- NÃ­vel de ConfianÃ§a do EmpresÃ¡rio
- Camada de Sensibilidade Situacional
- BusinessMoment / EmpresaState sofisticado (hoje: status simples, sem inferÃªncia)
- PatrimÃ´nio Empresarial (5 dimensÃµes) e suas visualizaÃ§Ãµes â€” EvoluÃ§Ã£o ContÃ­nua, DNA da Empresa, Espelho da Empresa
- InteligÃªncia Coletiva (scope coletivo/institucional)
- Opportunity como estÃ¡gio intermediÃ¡rio antes da RecomendaÃ§Ã£o

**O que as ADRs aprovadas destravam (arquitetura definida, implementaÃ§Ã£o futura):**
- Motor Cognitivo como barramento central (ADR-015) â€” arquitetura definida, sem cÃ³digo ainda
- Ciclo cognitivo contÃ­nuo (ADR-013) + pipeline Ãºnico (ADR-024) â€” substituirÃ¡ o ciclo atual
- Event Bus formal (ADR-011) + catÃ¡logo de eventos (ADR-012) â€” substituirÃ¡ switch/case
- Submotores isolados por eventos (ADR-016) â€” engines atuais serÃ£o refatoradas gradualmente
- Contexto Cognitivo como pacote fechado (ADR-021) â€” IA receberÃ¡ contexto pronto
- IA como tradutora (ADR-017) â€” IA para de interpretar dados brutos
- Hierarquia de memÃ³ria (ADR-019) + esquecimento programado (ADR-026) â€” ciclo de vida completo
- Agregado Ãºnico PatrimonioCognitivo (ADR-010) â€” unifica 5 tabelas hoje fragmentadas
- Curadoria obrigatÃ³ria (ADR-028) + Correlation ID (ADR-027) â€” qualidade e rastreabilidade
- Agregados renomeados para portuguÃªs (ADR-029) â€” nomenclatura consistente com a Ontologia
- EliminaÃ§Ã£o de duplicatas Crenca/ConhecimentoDaIdentidade (ADR-030) â€” fonte Ãºnica da verdade
- PadrÃ£o e CorrelaÃ§Ã£o como conceitos formais (ADR-031) â€” eventos dedicados no barramento
- ConvicÃ§Ã£o no algoritmo de priorizaÃ§Ã£o (ADR-032) â€” conhecimento testado pelo tempo pesa mais
- Invariantes de domÃ­nio separados de regras tÃ©cnicas (ADR-033) â€” clareza documental
- PolÃ­tica de causalidade vs correlaÃ§Ã£o (ADR-034) â€” garantia executÃ¡vel contra falsas causalidades

**Novo na hierarquia de documentos:** `03-ENGINEERING/ONTOLOGIA_COGNITIVA.md` torna-se a camada entre a ConstituiÃ§Ã£o e o Motor Cognitivo, definindo formalmente os 19 conceitos fundamentais (Fato, ObservaÃ§Ã£o, Evento, Sinal, EvidÃªncia, HipÃ³tese, ConvicÃ§Ã£o, Conhecimento, Aprendizado, MemÃ³ria, Contexto, DecisÃ£o, Resultado, Feedback, PadrÃ£o, CorrelaÃ§Ã£o, Regra, Insight, Sabedoria Empresarial).

**Regra de desacoplamento â€” a mais importante desta lista:** o Centro de DecisÃ£o existe desde o Sprint 6, mas hoje Ã© alimentado por regras simples. Quando o Motor Cognitivo entrar, ele substitui apenas o "motor" por trÃ¡s da tela â€” a experiÃªncia do empresÃ¡rio nÃ£o muda. Nenhuma implementaÃ§Ã£o atual pode acoplar lÃ³gica de decisÃ£o diretamente na tela, exatamente para permitir essa troca sem retrabalho.

## 4. O que Ã© hipÃ³tese e nÃ£o deve ser tratado como verdade do sistema

*Registro completo, com status e evidÃªncia por hipÃ³tese, em `08-KNOWLEDGE/HYPOTHESES.md` â€” a lista abaixo Ã© o resumo em prosa.*

Tratar como pergunta em aberto atÃ© validar com os 100 fundadores, nunca como regra de negÃ³cio definitiva no cÃ³digo:

- EmpresÃ¡rios responderÃ£o diagnÃ³sticos e check-ins continuamente.
- AceitarÃ£o participar de experimentos controlados.
- Conhecimento coletivo produzirÃ¡ recomendaÃ§Ãµes melhores que conhecimento individual isolado.
- Reconhecimento comunitÃ¡rio serÃ¡ percebido como valioso, nÃ£o como gamificaÃ§Ã£o vazia.
- RecomendaÃ§Ãµes adaptadas ao perfil de decisÃ£o tÃªm maior aceitaÃ§Ã£o que recomendaÃ§Ãµes genÃ©ricas.
- O NÃ­vel de ConfianÃ§a realmente prevÃª quando aceitar sugestÃµes mais ousadas.
- O Ãndice de Tranquilidade engaja mais que indicadores financeiros tradicionais.

## 5. PrincÃ­pios que nunca podem ser quebrados, nem nesta fase enxuta

1. NÃ£o crie um ERP completo â€” crie um empresÃ¡rio mais tranquilo. Toda funcionalidade deve responder: **Qual capacidade empresarial ela fortalece?** Se nÃ£o fortalece nenhuma das 8 (Observar, Compreender, Esclarecer, Priorizar, Decidir, Executar, Aprender, Evoluir), nÃ£o implementar.
2. **Capital Cognitivo Ã© o patrimÃ´nio central** â€” decisÃµes validadas, capacidades desenvolvidas, aprendizados registrados, hipÃ³teses confirmadas, conhecimento acumulado, consistÃªncia operacional. Toda funcionalidade deve aumentar pelo menos um destes.
3. **EsforÃ§o mental Ã© o inimigo** â€” o critÃ©rio universal de avaliaÃ§Ã£o inclui: a funcionalidade reduz o esforÃ§o mental do empresÃ¡rio? Se nÃ£o, ela precisa gerar Capital Cognitivo suficiente para justificar o custo de atenÃ§Ã£o.
4. O estÃ¡gio da empresa (hoje: MVP/0-25 empresas) Ã© o teto da sofisticaÃ§Ã£o tÃ©cnica â€” nunca ativar um recurso avanÃ§ado antes de evidÃªncia real.
5. Soft delete, audit trail e tenant guard em todo model, desde o primeiro mÃ³dulo.
6. O Centro de DecisÃ£o nunca mostra mais itens do que a empresa consegue executar naquele dia.
7. Nenhuma funcionalidade entra sem passar pelo critÃ©rio universal: (a) Qual capacidade fortalece? (b) Como aumenta Capital Cognitivo? (c) Como reduz esforÃ§o mental?
8. Todo pedido para o agente de cÃ³digo chega como especificaÃ§Ã£o fechada (objetivo, arquivos, regras, critÃ©rios de aceite) â€” nunca como "continue o projeto" ou "pense em melhorias".

---

*A Tese de Valor e o FOUNDATION.md continuam sendo a referÃªncia de visÃ£o de longo prazo, mas nÃ£o devem guiar decisÃµes de escopo do dia a dia enquanto a V4 Founder estiver em construÃ§Ã£o â€” esse papel Ã© deste documento. Quando uma sprint terminar, atualizar as seÃ§Ãµes 1 e 2 antes de comeÃ§ar a prÃ³xima.*



