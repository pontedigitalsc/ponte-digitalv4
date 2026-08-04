# CURRENT_PRODUCT.md — Estado Atual do Produto (V4 Founder)

> **MARCO: P64 — O RETORNO — STATUS OFICIAL — 3 de agosto de 2026**
>
> **A primeira sessão agora vira relação.** A auditoria P59–P63 apontou que a primeira sessão entregava o Retrato, mas não existia mecanismo de retorno/evolução no produto (o Protocolo Founder 1–10 era manual). **P64 fechou o loop de retorno:**
>
> - **Agendamento:** finalizar a primeira conversa agenda um retorno para **7 dias depois** (`Conversa.retornoDisponivelEm`) — a Ponte não cobra, apenas lembra que quer saber o que aconteceu.
> - **Check-in de 1 minuto:** quando o empresário volta e a janela está aberta, `/conversa` mostra, junto do Retrato (nunca o bloqueando), _"O que aconteceu depois da nossa conversa?"_ (Voltei a olhar a empresa / Comecei algo que a conversa apontou / Mudou minha visão / Ainda não fiz nada) + texto livre.
> - **Evidência real:** a resposta vira `SinalValor RETORNO_7_DIAS` e grava `EventoAtivacao.PRIMEIRO_RETORNO` (que alimenta o nível Fundador Validado). Funil anônimo preservado (pendência → conta, mesmo padrão da Clareza).
> - **Painel do Fundador:** nova métrica `retornosRegistrados` em "Transformação, não funcionalidades" (P63).
>
> Ver `docs/07-MILESTONES/P64_O_RETORNO.md`.

> **MARCO: P59–P63 — EXPERIÊNCIA FOUNDER V2 — STATUS OFICIAL — 3 de agosto de 2026**
>
> Refinamento definitivo da experiência Founder, sempre por evidência real (regra V4 Founder — nada artificial).
>
> **P59 V2:** nova pergunta de tensão "Se você precisasse se afastar por 30 dias, o que aconteceria com a empresa?" (`empresa.dependencia`) no fluxo de conversa e no mapeamento de estágios. **Retrato Estratégico 6 partes não-genérico** (subtítulo e primeiro movimento ancorados na resposta real — nada de texto que sirva para qualquer empresa). Landing com CTA direto para `/conversa`. **Área Founder completa** em `/fundador` (tese, como a Ponte aprende, patrimônio, evidências reais, Inteligência Coletiva com gates, roadmap, "o que acreditamos" como hipóteses, WhatsApp). Rota `/tornar-se-fundador` pública.
>
> **P60 (Memória Empresarial Viva):** página `/memoria` no menu — o patrimônio da empresa (decisões com status/resultado/feedback, aprendizados, clarezas com categoria, evoluções, sessões) com CTA para continuar conversa em aberto. Módulo `'memoria'` liberado na experiência cognitiva.
>
> **P61 (Conselheiro de Decisões):** **"Pensar antes de decidir"** em `/centro-decisao` — o empresário registra a decisão com 5 perguntas (o que / por quê / resultado esperado / riscos / condição de sucesso) e a fecha com "o que aconteceu / o que aprendemos" + feedback (`FeedbackAcao`). APIs `POST`/`GET` `/api/centro-decisao/decisoes` e `PATCH` `/.../[id]` com marcos de experiência.
>
> **P62 (Conhecimento Coletivo):** engine `inteligencia-coletiva.ts` com gates de maturidade (10 coleta / 50 comparação / 100 hipóteses / 500 conhecimento / 1000 recomendações maduras) e padrões coletivos apenas `VALIDADO+` — sempre agregações, jamais dados de uma empresa. Seção no Painel do Fundador (ADMIN).
>
> **P63 (Métricas de Transformação):** `operacao-founder.ts` mede transformação (sessões, clarezas por categoria, retorno espontâneo, primeiras decisões/evoluções, apoiadores/founders) no Painel do Fundador como "Transformação, não funcionalidades".
>
> Ver `docs/07-MILESTONES/P59_PRIMEIRO_VALOR_RETENCAO.md`, `P60_MEMORIA_EMPRESARIAL_VIVA.md`, `P61_CONSELHEIRO_DE_DECISOES.md`, `P62_CONHECIMENTO_COLETIVO.md`, `P63_ESCALA_COMERCIAL.md`.

> **MARCO: P59 — PRIMEIRO VALOR E RETENÇÃO FOUNDER V1 — STATUS OFICIAL — 2 de agosto de 2026**
>
> A Ponte passa a medir e provar utilidade, não impressionar. **Protocolo Founder 1–10** criado para acompanhar os primeiros 10 empresários (antes da Ponte / depois da primeira conversa / depois de 7 dias). **Clareza Gerada agora é evidência**: check-in pós-conversa com categorias (Nova percepção / Confirmação / Mudança de decisão / Nenhum impacto), gravado no SinalValor via `/api/conversa/clareza`. **Retrato Estratégico evoluído para 6 partes** (contexto, o que já construiu, risco de continuar igual, decisão a priorizar, primeiro movimento, pergunta que continuaremos acompanhando). **Linguagem externa**: "Primeira Sessão Estratégica" no funil gratuito. Critérios finais (10 empresários, depoimentos, evidências de retorno) dependem de humanos — pendência operacional.
>
> Ver `docs/07-MILESTONES/P59_PRIMEIRO_VALOR_RETENCAO.md` e `docs/05-OPERATIONS/PROTOCOLO_FOUNDER_1-10.md`.

> **MARCO: P57A+B — EXPERIÊNCIA DE VALOR + PERTENCIMENTO V1 — STATUS OFICIAL — 2 de agosto de 2026**
>
> A primeira interação entrega valor percebido imediato e pertencimento real.
>
> **P57A (Diagnóstico Estratégico):** nova entrega **Retrato Estratégico da Empresa** em 5 partes (entendimento → forças → pontos de evolução → decisão mais importante → próxima reflexão), gerado ao finalizar a primeira conversa de forma determinística (sem IA). Métrica **Clareza Gerada** registrada via SinalValor (pergunta inicial, descoberta, decisão sugerida — sem score artificial). **Raio-X Inicial** entregue gratuitamente antes do cadastro. **Exploração de cenários** (`/explorar`): "Como seria se..." sempre "Com base no que sabemos hoje..." — nunca prevê futuro.
>
> **P57B (Pertencimento):** toda conta criada recebe número único e permanente (`Apoiador #0001`...), gravado na `Empresa` (`numeroApoiador`/`numeroFundador`, migração 006). Página **"Tornar-se Fundador"** (`/tornar-se-fundador`) — evolução, não venda — com benefícios de participação simbólica e botão **"Quero ser Fundador"** → WhatsApp `48991133397`. Promoção Apoiador→Fundador manual inicialmente.
>
> Ver `docs/07-MILESTONES/P57A_DIAGNOSTICO_VALOR.md` e `docs/07-MILESTONES/P57B_FOUNDER_E_PERTENCIMENTO.md`.

> **MARCO: P58 — FOUNDATION FREEZE OPERACIONAL V1 — STATUS OFICIAL — 2 de agosto de 2026**
>
> **A Ponte Digital passa a ser uma empresa operacional.** Deixa de ser "um sistema que está sendo construído" e passa a ser **"uma empresa de tecnologia aprendendo com seus primeiros usuários."** A partir de P58, nenhuma funcionalidade é criada por ideia interna — toda evolução nasce de comportamento, pedidos, dificuldades e decisões dos Founders (Árvore de Decisões de Produto + critérios de novos desenvolvimentos). Estabilidade, segurança multi-tenant, qualidade da experiência e segurança da IA (regra _"Com base no que entendemos..."_) congeladas como contrato operacional. Produção live em `https://ponte-digital.vercel.app` (produção == `main`), estrutura pronta para Founder 1, 10 e 50.
>
> Ver `docs/07-MILESTONES/P58_OPERATION_FREEZE_V1.md`, `docs/07-MILESTONES/P57A_DIAGNOSTICO_VALOR.md` e `docs/07-MILESTONES/P57B_FOUNDER_E_PERTENCIMENTO.md`.

> **MARCO: Stable Release V3 — Preparação Definitiva para Produção — 29 de julho de 2026**
> 
> Programas 21 a 47 concluídos. Fundação completa, congelada e liberada. Sistema científico implementado. Todas as auditorias de produção aprovadas.
> 
> **A Ponte Digital deixa de ser um projeto em desenvolvimento. Passa a ser uma plataforma em produção, pronta para receber empresas reais e evoluir exclusivamente por meio de evidências coletadas com seus Founders.**
> 
> P41 — Stable Release V3 entregou: auditoria geral da aplicação (código morto removido, /register eliminado), auditoria de banco de dados (3 migrations, sincronizado), auditoria de segurança (proxy/middleware ativo, tenant guard com bloqueio em produção, .env.example completo sem secrets versionados), auditoria de experiência Founder (fluxo completo validado), correção de documentação (FEATURE_MATRIX, CURRENT_PRODUCT, CHANGELOG, MANIFESTO), snapshot oficial da arquitetura, congelamento técnico formal.
> 
> **Build: 45s compile. TypeScript: 0 erros. 54 rotas. Proxy: ATIVO.**
> 
> Principais entregas do P34B:
> - **Página Única de Atendimento** (`/atendimento`) — busca + reconhecimento + confirmação em ≤5s
> - **Centro Diário** (`/dashboard`) — substitui dashboard por 5 perguntas essenciais
> - **Timeline Viva** (`/historico`) — memória unificada da empresa
> - **Caixa Inteligente** — caixa como consequência, não módulo separado
> - **Ciclo Cognitivo Visual** — 8 capacidades visíveis na interface
> - **Sidebar simplificada** — navegação por fluxo (Trabalho/Consultar/Aprender/Sistema)
> - **Foundation Candidate V2** — documento oficial da nova base
> 
> **A partir deste ponto:**
> - Nenhuma alteração na Constituição sem emenda
> - Nenhuma alteração na Teoria da Evolução Empresarial sem ADR
> - Toda nova funcionalidade deve passar pela Árvore de Decisões de Produto (10 nós)
> - A Regra de Ouro ("A Ponte Digital não decide pela empresa") é inegociável
> - **Cada ação operacional deve fortalecer automaticamente o Capital Cognitivo**
> - **Nenhuma informação importante pode depender de lançamentos duplicados**
> - **Nenhuma tela pode existir apenas para registrar dados**
> - **Registrar atendimento em ≤5 segundos** — critério de aprovação do P34B
> 
> Ver `docs/07-MILESTONES/FOUNDATION_CANDIDATE_V2.md` para o candidato oficial.
> Ver `docs/02-PRODUCT/P34_FLUXO_COGNITIVO_OPERACIONAL.md` para o design completo do P34.
> 
> ---
> 
> **Registro histórico da fase (Programa 32-33):**
> 
> A Ponte Digital foi reposicionada em torno de **8 Capacidades Fundamentais**: Observar, Compreender, Esclarecer, Priorizar, Decidir, Executar, Aprender, Evoluir.
> 
> **Capital Cognitivo** passa a ser o patrimônio central da plataforma — composto por decisões validadas, capacidades desenvolvidas, aprendizados registrados, hipóteses confirmadas, conhecimento acumulado e consistência operacional.
> 
> **Programa 33** eliminou toda aparência de ERP: 35 componentes mortos deletados, jargão técnico removido (HealthScore, ConfidenceRing, CognitiveAvatar, ScoreBar), 4 documentos de auditoria produzidos (`docs/05-OPERATIONS/SPRINTS/`).
> 
> **Programa 34 (atual)** projeta o Fluxo Cognitivo Operacional — onde operação e inteligência são inseparáveis.
> 
> **Ciclo oficial de evolução:** OBSERVAR → COMPREENDER → ESCLARECER → PRIORIZAR → DECIDIR → EXECUTAR → APRENDER → INCORPORAR → NOVA CAPACIDADE
> 
> Ver `docs/06-CONSTITUTION/P32/` para a Constituição completa.

> **MARCO: P52 — Inteligência Conversacional Estratégica + Perguntas que Constroem Empresas — 1 de agosto de 2026**
>
> Após P52, a Ponte Digital deixa de apenas acompanhar empresas. Ela passa a desenvolver uma relação contínua de evolução através de conversas inteligentes.
>
> Após o Programa 52, a Ponte Digital passa a aprender continuamente através de conversas que ajudam empresários a refletirem melhor sobre seus negócios. Cada conversa fortalece simultaneamente o empresário e o patrimônio de conhecimento da plataforma.
>
> **Conteúdo:** conversa reestruturada nos 5 estágios do conselheiro (contexto → realidade → tensão → evolução → próximo movimento), motor de qualidade das perguntas, perguntas adaptativas por contexto real, memória de conversa, recomendações com história, Centro Diário com as 5 perguntas essenciais, ritual mensal "Revisão da Evolução", Biblioteca das Grandes Perguntas, Pergunta Aberta da Semana (única ativa) com registro automático e Painel do Fundador interno.
>
> Ver `docs/07-MILESTONES/P52_INTELIGENCIA_CONVERSACIONAL.md` e `docs/07-MILESTONES/P52_PERGUNTAS_QUE_CONSTROEM_EMPRESAS.md`.

> **MARCO: P53 — Experiência Ponte: Da Conversa ao Relacionamento — 1 de agosto de 2026**
>
> Após P53, a Ponte Digital deixa de ser um lugar onde o empresário administra e passa a ser o lugar onde ele é acolhido, reconhecido e lembrado — uma presença constante que reduz ansiedade, aumenta clareza e cria vontade de voltar amanhã.
>
> **Conteúdo:** os 16 pilares materializados — ritual diário (saudação, foco do dia, leitura do momento), reconhecimento de momentos da empresa, foco variável por semana/fase do mês, Linha da Vida da empresa com marcos reais, evolução do fundador em 4 dimensões, percepções espontâneas, silêncio inteligente, conquistas de evolução, memória afetiva, índice de clareza, próximo melhor movimento único, pergunta que fica, personalidade permanente do assistente e retorno natural. Nenhum schema novo, nenhuma tela ERP nova, nenhum módulo administrativo — tudo reutilizou o patrimônio existente.
>
> Ver `docs/07-MILESTONES/P53_EXPERIENCIA_PONTE.md`.

> **MARCO: P54 — Experiência Founder V2: Auditoria Total de Valor e Missão — 1 de agosto de 2026**
>
> Após P54, cada interação da Ponte entrega valor percebido antes de pedir qualquer coisa — sem adicionar módulos. A auditoria percorreu conversa, visual, linguagem e recomendações.
>
> **Conteúdo:** primeira conversa reestruturada (v5, 22 perguntas) começando pela empresa antes do empresário; perguntas que ensinam antes de pedir resposta; alternativas inteligentes com campo opcional "Se quiser, conte mais" (permiteDetalhe); devolutiva que cita a empresa real; tokens visuais premium (card-premium, gradientes, sombras, tipografia); microcopy humano e remoção de jargão visível ("leads/pipeline/funil/follow-up" → "negociações/oportunidades/retomar contato", "Salvar" → "Guardar", "Excluir" → "Remover"); reações naturais; centro de decisão reestruturado na narrativa de conselheiro (O que percebemos / Por que importa / O que pode acontecer / Próximo passo); auditoria de telas e auditoria técnica com débitos registrados (`micro-reaction` órfão, `/diagnostico` legado). Nenhum schema novo, nenhum módulo novo, nenhuma tela ERP nova.
>
> Ver `docs/07-MILESTONES/P54_EXPERIENCIA_FOUNDER_V2.md`.

> **MARCO: P55 — CERTIFICAÇÃO FOUNDER READY V1 — STATUS OFICIAL — 1 de agosto de 2026**
>
> **A Ponte Digital V4 Founder está oficialmente certificada e congelada como **Founder Ready V1**.** Este marco encerra a fase de fundação e valida o produto para receber os primeiros 100 Founders reais. A partir daqui o produto evolui exclusivamente por evidência coletada destes Founders — nenhuma funcionalidade nova fora desta regra.
>
> **O que P55 entregou:**
> - **Auditoria total (4 frentes paralelas):** código morto/bugs, sistema de IA, segurança multi-tenant e experiência/identidade visual.
> - **IA resiliente ("a IA nunca pode simplesmente parar"):** `NoopProvider` agora lança erro explícito (em vez de stream vazio silencioso); chamada ao modelo protegida por timeout de 30s; em falha/timeout/stream vazio a conversa responde com uma mensagem humana de continuidade (`FALHA_GENTIL`) em vez de quebrar com 500.
> - **Bug crítico de produção corrigido:** o `prismaSeguro` (tenant isolation guard) era lançado quando um service fazia `update`/`updateMany`/`delete` por `id` sem `empresaId` — derrubaria a aplicação em produção. Todos os services de escrita foram escopados por `where: { id, empresaId }` + re-fetch preservando o shape de retorno (`transacao`, `tarefa`, `lead`, `cliente`, `implantacao`, `configuracao`, `historico`). Modelos-filho sem coluna `empresaId` (`contato`, `etapaImplantacao`) foram formalmente isentos do guard, isolados indiretamente pelo pai.
> - **Código morto removido:** `centro-cognitivo/`, `micro-reaction.tsx`, `confidence-ring.tsx`. Fricção eliminada: CTA "Continuar" da Jornada agora leva a rota real por categoria; casts desnecessários em `historico-content.tsx` removidos.
> - **Critérios de produção validados:** `npx tsc --noEmit` limpo, `npm run build` limpo (56 páginas, 54 rotas, proxy/middleware ativo).
>
> **Estado oficial a partir de P55:**
> - Produto congelado em **Founder Ready V1** — pronto para receber empresas reais.
> - Nenhuma funcionalidade fora da Árvore de Decisões de Produto.
> - Segurança multi-tenant estrutural com bloqueio em produção.
> - IA sempre continua a conversa (nunca trava a jornada do empresário).
>
> Ver `docs/05-OPERATIONS/P55/FOUNDER_READY_V1.md` e `docs/07-MILESTONES/P55_FOUNDER_READY_V1.md`.

> **MARCO: P56 — PRODUÇÃO CERTIFICADA E OPERAÇÃO FOUNDER V1 — STATUS OFICIAL — 2 de agosto de 2026**
>
> **A Ponte Digital encontra-se oficialmente publicada, certificada e sincronizada entre desenvolvimento e produção.** O deploy de produção (`https://ponte-digital.vercel.app`, commit `ca4a099` de `main`) foi executado em 2/8/2026 e validado (sincronização produção == main, migrations 5/5, build/TypeScript limpos, smoke de rotas públicas 200). Isto encerra a fase de construção.
>
> **Nenhuma evolução futura será iniciada por hipótese interna.** Toda melhoria nascerá exclusivamente da utilização da plataforma por empresas reais (Fase Founder). A Ponte Digital deixa de ser um software em desenvolvimento e passa a ser uma empresa de tecnologia em operação.
>
> **Regras vigentes a partir de P56:**
> - Produção == `main` (`ca4a099`) é a fonte da verdade.
> - Futuros deploys: `npx vercel deploy --prod --yes --scope ponte-digital1` ou Git-integration.
> - Toda evolução exige evidência de utilização real por um Founder (Árvore de Decisões de Produto + Critérios de Novos Desenvolvimentos).
> - Continua valendo o congelamento Founder Ready V1 (P55): IA resiliente, tenant guard ativo, código morto removido.
>
> Ver `docs/07-MILESTONES/PRODUCTION_CERTIFIED_V1.md`, `docs/07-MILESTONES/INICIO_DA_OPERACAO.md` e `docs/05-OPERATIONS/KNOWN_ISSUES.md`.

*Documento operacional, complementar ao FOUNDATION.md e à Tese de Valor (Nível 1). É a referência principal para qualquer agente de código — Roo Code, Gemini CLI, Claude ou outro — antes de qualquer tarefa de implementação. Atualizar a cada sprint concluída. Máximo duas páginas: se crescer além disso, o excesso vira Playbook (Nível 3), não fica aqui.*

**Objetivo desta fase:** validar as **8 Capacidades Fundamentais** com 100 fundadores — não apenas acumular evidências, mas testar se a materialização da Teoria da Evolução Empresarial produz empresários mais conscientes, adaptáveis e tranquilos. Os 100 primeiros são co-autores da tese: cada interação fortalece ou questiona uma capacidade, gera Capital Cognitivo e alimenta a Curva Evolutiva.

**Nota de posicionamento (2026-07-14):** desde `ADR-003`, o produto é entendido em duas camadas — Ecossistema Público (Diagnóstico) e Plataforma Cognitiva (os outros 6 pilares). Isso é reposicionamento estratégico, não muda o que está descrito tecnicamente abaixo: a V4 Founder continua sendo uma única aplicação. Ver `01-VISION/THESIS.md` e `07-BUSINESS/JORNADA_APOIADOR.md`.

**Nota arquitetural (2026-07-18):** 34 ADRs foram revisadas e aprovadas (001–034). A Ontologia Cognitiva — teoria do conhecimento da plataforma — está em `03-ENGINEERING/ONTOLOGIA_COGNITIVA.md` (camada superior ao DDD). A arquitetura do Motor Cognitivo em `03-ENGINEERING/MOTOR_COGNITIVO.md`, a auditoria arquitetural em `03-ENGINEERING/AUDITORIA_ARQUITETURAL.md`, e a especificação DDD em `03-ENGINEERING/ARCHITECTURE_DDD.md`. A implementação segue o plano de 6 fases da auditoria (Fase 0 → Fase 5). Ver `04-DECISIONS/ADR/` para as 34 ADRs.

---

## 1. O que já existe e funciona

*(Atualizado a partir de auditoria de código. Atualizar a cada sprint — esta seção reflete o código real, não a visão.)*

**Construído e funcional (estado atual — Foundation Candidate V2):**

**Fluxo Cognitivo Operacional (P34B):**
- **Página Única de Atendimento** (`/atendimento`) — busca + reconhecimento automático + confirmação em ≤5s. Caixa Inteligente integrada (faturamento, ticket médio, clientes do dia)
- **Centro Diário** (`/dashboard`) — substitui o dashboard antigo. Responde exatamente 5 perguntas: onde estamos, o que mudou, o que merece atenção, quem precisa de você, próximo melhor movimento. Inclui Ciclo Cognitivo Visual (8 capacidades)
- **Timeline Viva** (`/historico`) — memória unificada da empresa: mescla eventos operacionais + cognitivos
- **Sidebar simplificada** — navegação por fluxo: Trabalho / Consultar / Aprender / Sistema

**Núcleo cognitivo (40+ engines, mantidos):**
- Motor Cognitivo — evidência, memória, decisão, aprendizado, confiança, evolução, governança de conhecimento, identidade, orquestração
- Camada de Sinais (`HistoricoSinal`) conectando operação a cognição
- Assistente — chat contextual com Anthropic
- Centro de Decisão — decisões recomendadas com priorização
- Knowledge Vault — biblioteca de conhecimento validado
- Conversational Learning — aprendizado ativo via perguntas rápidas

**Fundação:**
- Diagnóstico (Conversa) — questionário adaptativo com revelação
- Autenticação multiempresa — login, criação de conta, papéis
- Landing, Páginas de suporte (login, criar-conta, configurações)

**Gap ativo:** Agenda como capacidade — não existe (P35+).

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
- P33 — Limpeza de ERP & Fundação (auditoria, simplificação, linguagem)
- P34 — Fluxo Cognitivo Operacional (design)
- P34B — Materialização Completa do Fluxo Cognitivo Operacional

**Fase atual:** Foundation Candidate V2 — pronta para P35 (Founder V1).
Ver `docs/07-MILESTONES/FOUNDATION_CANDIDATE_V2.md` para o candidato oficial.

**Próxima fase:** P35 — Founder V1 (auditoria final, validação com empresa real, estabilização, deploy).
Ver `docs/07-MILESTONES/ROADMAP_POS_FUNDACAO.md` para a visão macro das próximas fases.

**Nota importante:** A auditoria da Foundation V1 identificou débitos técnicos (P0–P3). O Programa 33 endereçou parte (remoção de dead code, simplificação). O Programa 34 projetou o fluxo unificado. O Programa 34B materializou o fluxo: Atendimento, Centro Diário, Timeline Viva, Caixa Inteligente. A dívida restante está documentada em `docs/07-MILESTONES/FOUNDATION_CANDIDATE_V2.md` (seção 6).

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








