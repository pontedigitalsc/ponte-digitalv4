# CERTIFICAÇÃO TERMINOLÓGICA — Catálogo Mestre da Linguagem Ubíqua

**Documento de certificação | 26/07/2026 | Arquiteto-Chefe**

> Unificação de todos os termos da Ponte Digital em um único catálogo mestre. Fontes: TERMINOLOGY.md (visão de produto), ONTOLOGIA_COGNITIVA.md (teoria do conhecimento), CONSTITUICAO_DA_ENGENHARIA.md (arquitetura), P23 (experiência), THESIS.md, FOUNDATION.md, PRINCIPLES.md, CURRENT_PRODUCT.md, MVP_SCOPE.md.
>
> Este documento é a **fonte única da verdade terminológica**. Nenhum documento futuro pode usar termo diferente do aqui definido para o mesmo conceito.

---

## Como usar este catálogo

- **Termos de Produto** — usados na comunicação com o empresário e nas especificações de funcionalidade
- **Termos de Arquitetura** — usados no código, documentação técnica e ADRs
- **Termos da Ontologia Cognitiva** — usados no Motor Cognitivo e na teoria do conhecimento
- **Termos da Experiência (P23)** — usados na interface, identidade da IA e design visual
- **Termos Operacionais** — usados na gestão do projeto e sprints
- **Termos Deprecados** — não usar. Substituir pelo termo oficial indicado

---

## 1. Termos de Produto

| # | Termo | Definição | Fonte | Sinônimos Proibidos |
|---|---|---|---|---|
| P01 | **Ponte Digital** | Plataforma de inteligência para empresários que possui um SaaS (Plataforma Cognitiva) para quem deseja aprofundar a parceria — não o contrário. Não é ERP, CRM ou planilha inteligente. | THESIS.md, TERMINOLOGY.md | "sistema", "ferramenta", "plataforma" (em excesso) |
| P02 | **Ecossistema Público** | Camada gratuita: Diagnóstico, histórico de diagnósticos, recomendações periódicas, conteúdo, comunidade. | TERMINOLOGY.md, ADR-003 | — |
| P03 | **Plataforma Cognitiva** | Camada paga/restrita: CRM Invisível, Agenda, Financeiro Essencial, Assistente da Ponte, Centro de Decisão, Perfil Cognitivo. | TERMINOLOGY.md, ADR-003 | "SaaS", "produto" |
| P04 | **Curioso** | Primeiro estágio da Escada Comunitária — ainda não fez o Diagnóstico. | TERMINOLOGY.md | "visitante", "anônimo" |
| P05 | **Apoiador** | Segundo estágio — completou o Diagnóstico Inteligente, acessa o Ecossistema Público de graça. | TERMINOLOGY.md | "usuário gratuito", "lead" |
| P06 | **Fundador (100 Fundadores)** | Terceiro estágio — primeiros usuários reais da Plataforma Cognitiva, participantes do programa de validação. | TERMINOLOGY.md | "cliente", "testador" |
| P07 | **Embaixador** | Quarto estágio — conteúdo PENDENTE DE DEFINIÇÃO PELO FUNDADOR. | TERMINOLOGY.md | — |
| P08 | **Escada Comunitária** | Jornada de aprofundamento: Curioso → Apoiador → Fundador → Embaixador. Substitui funil de vendas. | TERMINOLOGY.md, THESIS.md | "funil", "jornada do cliente" |
| P09 | **Empresário** | Usuário final: dono de pequeno negócio (lavação, barbearia, oficina, estética), equipe pequena, Brasil, sem experiência em ferramentas de gestão sofisticadas. | TERMINOLOGY.md, ICP.md | "usuário" (PROIBIDO) |
| P10 | **Diagnóstico Inteligente** | Fluxo de perguntas que gera o Perfil Cognitivo. Nome de produto. Sinônimo arquitetural: Motor de Descoberta. Sinônimo conceitual: Diagnóstico Vivo. | TERMINOLOGY.md | "questionário", "formulário", "survey" |
| P11 | **Perfil Cognitivo** | Conjunto estruturado gerado ao final do Diagnóstico. Alimenta o Centro de Decisão e o Assistente. Formato PENDENTE. | TERMINOLOGY.md | "persona", "perfil de usuário" |
| P12 | **Centro de Decisão** | Tela que traduz sinais em prioridades acionáveis. Hoje: regras sobre HistoricoSinal. Futuro: Motor Cognitivo. | TERMINOLOGY.md, THESIS.md | "dashboard", "painel de controle" |
| P13 | **CRM Invisível** | Lista de ações sugeridas gerada a partir do comportamento real. Empresário age, não administra. | TERMINOLOGY.md | "CRM", "pipeline" |
| P14 | **Agenda como Capacidade** | Visualização de capacidade de atendimento, não grade de horários. Ainda não implementado. | TERMINOLOGY.md | "agenda", "calendário" |
| P15 | **Financeiro Essencial** | Estruturado em 5 perguntas que o empresário precisa responder. Não é contabilidade, DRE ou conciliação. 5 perguntas PENDENTES. | TERMINOLOGY.md | "financeiro", "contabilidade" |
| P16 | **Assistente da Ponte** | Chat de IA dentro do produto. Não confundir com agente de código. | TERMINOLOGY.md | "chatbot", "assistente virtual" |
| P17 | **Patrimônios Empresariais (os 5)** | Financeiro, Operacional, Comercial, Cognitivo, Humano. Toda funcionalidade nova fortalece pelo menos um. | THESIS.md, FOUNDATION.md | — |
| P18 | **Knowledge Vault** | Biblioteca de Conhecimento — página que exibe conhecimentos validados, hipóteses e timeline cognitiva. | CURRENT_PRODUCT.md | "biblioteca", "base de conhecimento" |
| P19 | **Conversational Learning** | Página de Aprendizados — captura explícita de valores, regras, preferências e objetivos do empresário. | CURRENT_PRODUCT.md | "aprendizados" |
| P20 | **Marketing Assistido** | Um dos 7 pilares ativos da V4 Founder. Definição PENDENTE. | CURRENT_PRODUCT.md | — |

---

## 2. Termos de Arquitetura

| # | Termo | Definição | Fonte | Sinônimos Proibidos |
|---|---|---|---|---|
| A01 | **Engine** | Capacidade cognitiva autônoma com entrada, processamento e saída definidos. Vive em `engine/`. | CONSTITUIÇÃO | "motor", "módulo" |
| A02 | **Service** | Operação de negócio (CRUD, validação, regra) que acessa banco via prisma-tenant-safe. | CONSTITUIÇÃO | "api", "handler" |
| A03 | **Lib** | Código de utilidade genérica sem dependência de camadas superiores. | CONSTITUIÇÃO | "utils", "helpers" |
| A04 | **Hook** | Função React que conecta estado/efeitos à UI. | CONSTITUIÇÃO | — |
| A05 | **API** | Rota HTTP que valida entrada, chama service/engine, formata resposta. | CONSTITUIÇÃO | "endpoint", "rota" |
| A06 | **Orchestrator** | Coordenador de fluxo cognitivo que conecta engines sem implementar cognição. | CONSTITUIÇÃO | "manager", "coordinator" |
| A07 | **prisma-tenant-safe** | Wrapper do Prisma que detecta queries sem empresaId em desenvolvimento. | CONSTITUIÇÃO | — |
| A08 | **ADR** | Architecture Decision Record — registro formal de decisão arquitetural. | CONSTITUIÇÃO | — |
| A09 | **HistoricoSinal** | Model Prisma que registra sinais da operação. Simplificação aceita do futuro DomainEvent. | ADR-001 | "DomainEvent" (não é) |
| A10 | **DomainEvent** | Conceito futuro (Fase 2) com nomenclatura semântica de negócio. Substituirá HistoricoSinal. | TERMINOLOGY.md | "evento" (genérico) |
| A11 | **Tenant Guard** | Proteção que garante isolamento entre empresas. Implementado via empresaId em toda query. | TERMINOLOGY.md | — |
| A12 | **V4 Founder** | Nome da fase atual do produto — pré-validação. Não é número de versão sequencial. | TERMINOLOGY.md | "v4", "versão 4" |
| A13 | **Cognitive Orchestrator** | Coordenador central do fluxo cognitivo. Nenhuma engine individual decide o fluxo. | CONSTITUIÇÃO | — |
| A14 | **Heritage Engine** | Engine que unifica memória, conhecimento e síntese — o patrimônio cognitivo. | CONSTITUIÇÃO | — |
| A15 | **Cognitive Pipeline** | Fluxo: Sinais → Contexto → Evidências → Decisão → Ação → Outcome. Hoje: monolito em cognitive-pipeline-store.ts. | CONSTITUIÇÃO | — |
| A16 | **Observabilidade Cognitiva** | Capacidade de entender por que o sistema tomou cada decisão. Logs com correlationId. | CONSTITUIÇÃO | — |
| A17 | **Soft Delete** | Exclusão lógica: deletedAt em vez de DELETE. Princípio inegociável. | FOUNDATION.md | "deleção", "remoção" |
| A18 | **empresaId** | Campo obrigatório em toda query multi-tenant. | CONSTITUIÇÃO | "tenantId" (DEPRECADO) |
| A19 | **Cognitive Experience Engine** | Engine de 1898 linhas que agrega 12 engines. Débito reconhecido (ADR-005). | CURRENT_PRODUCT.md | — |
| A20 | **Cognitive Observatory** | Módulo de métricas: KV, learning, OS, evolution. | CURRENT_PRODUCT.md | — |

---

## 3. Termos da Ontologia Cognitiva (19 Conceitos Fundamentais)

| # | Termo | Definição | Quem Cria | Tempo de Vida | Relacionamentos |
|---|---|---|---|---|---|
| O01 | **Fato** | Unidade atômica da realidade. Proposição objetiva verificável. | Mundo real, sistemas externos, empresário | Permanente | → Observação, → Evidência, → Sinal, → Resultado |
| O02 | **Observação** | Representação interna de um fato no sistema cognitivo. Imutável, datada, atribuída. | Observation Engine, integrações, input direto | Permanente | Fato →, → Sinal, → Evidência, Evento → |
| O03 | **Evento** | Notificação de que algo ocorreu. Linguagem de comunicação entre módulos. correlationId obrigatório. | Módulos de domínio, submotores, barramento | Ativo: seg/min. Arquivado: 2+ anos | → Observação, Fato →, Event Bus |
| O04 | **Sinal** | Observação que se destaca do ruído por relevância potencial. Tem score de prioridade. | Signal Engine, regras explícitas, padrões históricos | Ativo até processar ou expirar | Observação →, → Hipótese, → Prioridade, ≠ Ruído |
| O05 | **Evidência** | Conjunto de observações organizadas em função de uma hipótese (a favor ou contra). É relação, não entidade. | Automática, explícita (empresário), por inferência | Enquanto hipótese ativa | Observação ↔ Hipótese, → Confiança, → Conhecimento |
| O06 | **Hipótese** | Explicação candidata para um padrão observado. Responde "por quê?". | Hypothesis Engine, regras, empresário | Ativa até confirmar/refutar/expirar (30d) | Sinal →, Evidência ↔, → Conhecimento, Confiança ≤30 |
| O07 | **Convicção** | Medida de estabilidade temporal: dias_sem_refutação × 0.5. Zera na refutação. | Trust Engine (incrementa), Outcome Engine (zera) | Ativa enquanto não refutado | Confiança +, Conhecimento, → Prioridade |
| O08 | **Conhecimento** | Hipótese com evidência suficiente (score ≥60, 2+ submotores). Verdade funcional, não absoluta. | Knowledge Engine, empresário (score ≥70) | Ativo até arquivar (90d) ou refutar | Hipótese →, Evidência →, → Decisão |
| O09 | **Aprendizado** | Modificação do estado cognitivo do Motor por interpretação de resultados e feedback. É processo. | Learning Engine, empresário (explícito) | Contínuo. Efeito permanente. | Resultado →, Feedback →, → Conhecimento |
| O10 | **Memória** | Capacidade de armazenar/recuperar/organizar conhecimento em 4 níveis (ADR-019): Working, Short, Long, Archived. | Memory Engine, Forgetting Engine | Working: sessão. Short: 30d. Long: 1 ano. Archived: permanente | Conhecimento, → Contexto, Esquecimento |
| O11 | **Contexto** | Pacote fechado e imutável do estado cognitivo para um fim específico. Produzido pelo Context Engine. | Context Engine (único produtor — ADR-021) | Duração da decisão/sessão/notificação | Memória →, → Decisão, → IA |
| O12 | **Decisão** | Recomendação formal de ação com justificativa rastreável. Contém: o quê, por quê, base, confiança, alternativas, risco. | Decision Engine, empresário | Ativa: 7 dias. Arquivada: permanente | Contexto →, Conhecimento →, → Resultado |
| O13 | **Resultado** | Consequência observável de uma decisão no mundo real. Factual. | Outcome Engine, sistemas externos, empresário | Ativo até processar. Arquivado: permanente | Decisão →, → Aprendizado, → Feedback |
| O14 | **Feedback** | Avaliação explícita do empresário sobre qualidade/utilidade. Tipos: AJUDOU, AJUDOU_PARCIALMENTE, NAO_AJUDOU, NAO_EXECUTADA. | Empresário (exclusivamente) | Ativo até processar. Arquivado: permanente | Decisão, Resultado → Aprendizado, Confiança |
| O15 | **Padrão** | Regularidade observável em múltiplas observações. Sugere, não prova, relação subjacente. | Signal Engine, Learning Engine, empresário | Ativo enquanto houver observações | Observação →, → Hipótese, ≠ Conhecimento |
| O16 | **Correlação** | Observação de que 2+ fenômenos ocorrem juntos com frequência maior que o acaso. Nunca é causalidade. | Signal Engine | Ativa com dados. Mínimo: 10 obs ou 30d | Padrão, → Hipótese, ≠ Causalidade |
| O17 | **Regra** | Formalização determinística que dispara comportamento automático. Binária (condição satisfeita ou não). | Domínio, empresário, Motor (sugere) | Regra de negócio: permanente. Personalizada: vigora até remover | Conhecimento →, → Decisão, → Ação |
| O18 | **Insight** | Conexão nova entre 2+ conhecimentos previamente não relacionados. Revela percepção não óbvia. | Decision Engine, Context Engine, empresário | Ativo enquanto conhecimentos fonte forem ativos | Conhecimento →, Contexto →, → Decisão |
| O19 | **Sabedoria Empresarial** | Propriedade emergente do sistema: julgamentos sólidos com base em conhecimento acumulado, convicção e reconhecimento de padrões. | Ninguém — emerge do uso (meses a anos) | Permanente após emergir | Conhecimento, Convicção, Experiência, Memória |

---

## 4. Termos da Experiência (P23)

| # | Termo | Definição | Documento Fonte |
|---|---|---|---|
| X01 | **IA** | Inteligência da Ponte. Não tem nome, rosto, gênero ou avatar. É Consultor Sênior. | IDENTIDADE_DA_INTELIGENCIA |
| X02 | **Mapa Cognitivo Vivo** | Centro semântico da experiência. Mapa de 5 áreas (não 19 conceitos). Sidebar direita. | MAPAS_COGNITIVO_VIVO |
| X03 | **5 Áreas de Conhecimento** | Empresa, Financeiro, Clientes, Equipe, Operação. Apresentação simplificada dos 19 conceitos ontológicos. | MAPAS_COGNITIVO_VIVO |
| X04 | **Painel Cognitivo** | Elemento visual à direita com nível, clareza, confiança, mapa cognitivo, hipóteses, lacunas. | ARQUITETURA_VISUAL_DA_CONVERSA |
| X05 | **Centro de Confiança** | Sistema de 8 níveis (Alta, Média, Baixa, Dúvida, Não Sei, Silêncio, Correção, Evolução). Cores: verde, amarelo, cinza, azul. | SISTEMA_DE_CONFIANCA_VISUAL |
| X06 | **Estados da Tela (E1-E7)** | E1=Landing, E2=Onboarding, E3=Conversa, E4=Pensando, E5=Insight, E6=Resumo, E7=Conclusão. | ARQUITETURA_VISUAL_DA_CONVERSA |
| X07 | **Loading Inteligente** | Fases do processamento narrativas: "Escutando atentamente…", "Relacionando informações…", "Construindo hipótese…", "Validando…" | LOADING_INTELIGENTE |
| X08 | **Momentos WOW** | 20 momentos de alto valor. Máx 3 por sessão. Confiança ≥40%. | SISTEMA_DE_VALOR |
| X09 | **Padrões de Frase** | Afirmação, Pergunta, Insight, Silêncio, Recomendação — 5 padrões fundamentais de comunicação. | IDENTIDADE_DA_INTELIGENCIA |
| X10 | **Rituais** | Abertura, Descoberta, Confirmação, Transição, Encerramento — sequências obrigatórias de interação. | IDENTIDADE_DA_INTELIGENCIA |
| X11 | **Primeira Semana Estruturada** | Jornada de 7 dias com ações automáticas da IA. Dia 1 ao 7. | RELATORIO_FINAL |
| X12 | **ETD (Empresário Tomador de Decisão)** | Perfil do empresário no P23. Pode ser mais sofisticado que o perfil real. | PSICOLOGIA_DA_PRIMEIRA_IMPRESSAO |
| X13 | **Anel de Confiança** | Indicador visual circular (0-100%). Cor varia por nível. Atualização animada (600ms). | MICROINTERACOES |
| X14 | **Badge de Confiança** | Ícone + cor + label. 8 tipos: escudo, lupa, interrogação, balança, seta curva, espiral, ponto, nenhum. | SISTEMA_DE_CONFIANCA_VISUAL |
| X15 | **Decisões Permanentes da Experiência** | (1) IA sem nome/rosto, (2) nunca "Ainda está aí?", (3) som opt-in, (4) mapa > chat, (5) insight > relatório, (6) IA acrescenta sempre, (7) empresa não é dados, (8) empresário não é usuário, (9) gamificação cognitiva, (10) IA não inventa. | RELATORIO_FINAL_P23 |
| X16 | **Níveis de Formalidade** | Nível 1 (alta — primeiro contato), Nível 2 (média — recorrente), Nível 3 (baixa — avançado). Transição natural. | IDENTIDADE_DA_INTELIGENCIA |
| X17 | **Direção de Animação** | → Progresso, ← Revisão, ↓ Revelação, ↑ Conclusão, Zoom in: foco, Zoom out: contexto. | GUIA_DE_IMPLEMENTACAO_VISUAL |
| X18 | **Cadeia de Confiança (Insights)** | Explorando (0-20%) → Investigando (20-50%) → Verificando (50-75%) → Confiante (75-90%) → Pronto (>90%). | SISTEMA_DE_INSIGHTS |
| X19 | **Intenção de Microinteração** | Confirmar (200-400ms), Notificar (300-500ms), Transicionar (400-700ms), Surpreender (600-1000ms), Celebrar (500-800ms), Corrigir (400-600ms), Aguardar (200ms). | GUIA_DE_IMPLEMENTACAO_VISUAL |
| X20 | **Prioridade de Interrupção** | Alta (interrompível sempre), Média (interrompível em pontos específicos), Baixa (deve completar). | MANUAL_DE_TRANSICOES |

---

## 5. Termos Operacionais

| # | Termo | Definição | Fonte |
|---|---|---|---|
| S01 | **Sprint** | Unidade de trabalho com escopo fechado, objetivo único e critérios de aceite. | TERMINOLOGY.md |
| S02 | **Congelado** | Funcionalidade não implementada na fase atual, mas cuja arquitetura não pode impossibilitar. ≠ Cancelado ≠ Backlog. | TERMINOLOGY.md, MVP_SCOPE.md |
| S03 | **V4 Founder** | Fase atual — pré-validação com 100 fundadores. | TERMINOLOGY.md |
| S04 | **Programa 23 (P23)** | Fase de especificação da Experiência Cognitiva. 28 documentos. Encerrado como especulação. | AUDITORIA_COMPLETA_P23 |
| S05 | **Programa 24 (P24)** | Fase atual de certificação arquitetural. 3 documentos de certificação. | (documento atual) |
| S06 | **Matriz de Decisão** | 3 perguntas: ajuda a decidir esta semana? aumenta conhecimento futuro? fortalece Patrimônio Empresarial? | FOUNDATION.md |
| S07 | **Empresa Zero** | Primeira empresa real para validação dos experimentos P23. | RELATORIO_FINAL_P23 |
| S08 | **Arquiteto-Chefe** | Papel responsável pela certificação arquitetural e integridade dos documentos fundacionais. | (documento atual) |

---

## 6. Termos Deprecados e Substituições Oficiais

| # | Termo Deprecado | Substituir Por | Motivo | ADR |
|---|---|---|---|---|
| D01 | `tenantId` | `empresaId` | Inconsistência terminológica | — |
| D02 | `Outcome` | `Resultado` | Português | ADR-029 |
| D03 | `AcaoCognitiva` | `Decisao` | Maior clareza | ADR-029 |
| D04 | `CrencaDaIdentidade` | `Hipotese` (dentro do PatrimonioCognitivo) | Duplicata conceitual | ADR-030 |
| D05 | `ConhecimentoDaIdentidade` | `Conhecimento` (dentro do PatrimonioCognitivo) | Duplicata conceitual | ADR-030 |
| D06 | `FeedbackAcao` / `FeedbackContext` | `Feedback` | Simplificação | ADR-029 |
| D07 | `KnowledgeContext` | `ContextoDeConhecimento` | Português | ADR-029 |
| D08 | `DecisionContext` | `ContextoDeDecisao` | Português | ADR-029 |
| D09 | `Evidencia` (como agregado separado) | `EvidenciaDeHipotese` (relação) | ADR-010 | ADR-010 |
| D10 | `AprendizadoItem` | `Aprendizado` | Sem subdivisão | ADR-029 |
| D11 | `EventoAtivacao` | `MarcoDeJornada` | Não é evento cognitivo | — |
| D12 | `SignalContext` / `ActivationContext` | Infraestrutura/aplicação (não BCs) | Reclassificado | ADR-009 |
| D13 | `sinal-{categoria}` | `EventoDeNegocio: {NomeSemantico}` | ADR-012 | ADR-012 |
| D14 | `HistoricoSinal` (como DomainEvent) | `LogDeEventos` (infraestrutura) | Simplificação aceita V4 Founder | ADR-001 |
| D15 | "Sinal" como sinônimo de "evento" | Usar "Sinal" apenas como observação qualificada | Precisão ontológica | — |
| D16 | "Usuário" | "Empresário" ou "cliente" | Respeito ao perfil do usuário | Decisão Permanente P23 |
| D17 | "Ajudar" em excesso | "Apoiar", "fortalecer", "revelar" | Reduce percepção de suporte | IDENTIDADE |
| D18 | "Inteligência artificial" / "Machine learning" | Mostrar, não nomear | Hype words | IDENTIDADE |

---

## 7. Termos com Definição Pendente

| # | Termo | Pendência | Documento de Origem |
|---|---|---|---|
| TBD01 | Perfil Cognitivo (formato exato) | Estrutura dos campos gerados pelo Diagnóstico | THESIS.md |
| TBD02 | Financeiro Essencial (5 perguntas) | Conteúdo das 5 perguntas | TERMINOLOGY.md |
| TBD03 | Embaixador (conteúdo) | O que o estágio significa | TERMINOLOGY.md |
| TBD04 | Marketing Assistido (status) | Definição detalhada do pilar | CURRENT_PRODUCT.md |
| TBD05 | Escada Comunitária (conteúdo completo) | Progressão detalhada | TERMINOLOGY.md |
| TBD06 | Assistente da Ponte (governança) | Documento dedicado de governança | TERMINOLOGY.md |
| TBD07 | Manufatura Digital | Enquadramento como pilar | — |

---

## 8. Regras Terminológicas Obrigatórias

1. **Nunca** usar "usuário" para se referir ao empresário — é proibido na interface e na documentação.
2. **Nunca** usar "Sinal" como sinônimo de "Evento" — são conceitos ontológicos distintos.
3. **Nunca** usar "Correlação" como sinônimo de "Causalidade" — regra universal R5.
4. **Sempre** usar `empresaId` — nunca `tenantId`.
5. **Sempre** usar português para nomes de domínio no código (`listarClientes`, não `listClients`).
6. **Sempre** usar o termo completo "Contexto Cognitivo" para o pacote fechado (ADR-021).
7. **Sempre** especificar o tipo de Evento: "Evento de negócio", "Evento cognitivo", "Evento de barramento".
8. **Sempre** especificar o tipo de Regra: "Regra de negócio", "Regra personalizada", "Regra derivada".
9. Quando o contexto não deixar claro qual "Fundador" é qual, usar "fundador da Ponte" e "fundador-cliente".
10. Toda decisão permanente da experiência (X15) é inegociável e deve ser respeitada por qualquer implementação.

---

## 9. Índice Remissivo

| Termo | Categoria | Seção |
|---|---|---|
| 5 Áreas de Conhecimento | Experiência | X03 |
| ADR (Architecture Decision Record) | Arquitetura | A08 |
| Agenda como Capacidade | Produto | P14 |
| Anel de Confiança | Experiência | X13 |
| API | Arquitetura | A05 |
| Apoiador | Produto | P05 |
| Aprendizado | Ontologia | O09 |
| Arquiteto-Chefe | Operacional | S08 |
| Assistente da Ponte | Produto | P16 |
| Badge de Confiança | Experiência | X14 |
| Centro de Confiança | Experiência | X05 |
| Centro de Decisão | Produto | P12 |
| Cognitive Experience Engine | Arquitetura | A19 |
| Cognitive Observatory | Arquitetura | A20 |
| Cognitive Orchestrator | Arquitetura | A13 |
| Cognitive Pipeline | Arquitetura | A15 |
| Congelado | Operacional | S02 |
| Conhecimento | Ontologia | O08 |
| Contexto | Ontologia | O11 |
| Convicção | Ontologia | O07 |
| Conversational Learning | Produto | P19 |
| Correlação | Ontologia | O16 |
| CRM Invisível | Produto | P13 |
| Curioso | Produto | P04 |
| Decisão | Ontologia | O12 |
| Diagnóstico Inteligente | Produto | P10 |
| DomainEvent | Arquitetura | A10 |
| Ecossistema Público | Produto | P02 |
| Embaixador | Produto | P07 |
| Empresa Zero | Operacional | S07 |
| empresário | Produto | P09 |
| empresaId | Arquitetura | A18 |
| Engine | Arquitetura | A01 |
| Escada Comunitária | Produto | P08 |
| Estados da Tela (E1-E7) | Experiência | X06 |
| ETD (Empresário Tomador de Decisão) | Experiência | X12 |
| Evidência | Ontologia | O05 |
| Evento | Ontologia | O03 |
| Fato | Ontologia | O01 |
| Feedback | Ontologia | O14 |
| Financeiro Essencial | Produto | P15 |
| Fundador (100 Fundadores) | Produto | P06 |
| Heritage Engine | Arquitetura | A14 |
| Hipótese | Ontologia | O06 |
| HistoricoSinal | Arquitetura | A09 |
| Hook | Arquitetura | A04 |
| IA (Identidade) | Experiência | X01 |
| Insight | Ontologia | O18 |
| Knowledge Vault | Produto | P18 |
| Lib | Arquitetura | A03 |
| Loading Inteligente | Experiência | X07 |
| Mapa Cognitivo Vivo | Experiência | X02 |
| Marketing Assistido | Produto | P20 |
| Matriz de Decisão | Operacional | S06 |
| Memória | Ontologia | O10 |
| Momentos WOW | Experiência | X08 |
| Observabilidade Cognitiva | Arquitetura | A16 |
| Observação | Ontologia | O02 |
| Orchestrator | Arquitetura | A06 |
| Padrão | Ontologia | O15 |
| Painel Cognitivo | Experiência | X04 |
| Patrimônios Empresariais (os 5) | Produto | P17 |
| Perfil Cognitivo | Produto | P11 |
| Plataforma Cognitiva | Produto | P03 |
| Ponte Digital | Produto | P01 |
| prisma-tenant-safe | Arquitetura | A07 |
| Programa 23 (P23) | Operacional | S04 |
| Programa 24 (P24) | Operacional | S05 |
| Regra | Ontologia | O17 |
| Resultado | Ontologia | O13 |
| Sabedoria Empresarial | Ontologia | O19 |
| Service | Arquitetura | A02 |
| Sinal | Ontologia | O04 |
| Soft Delete | Arquitetura | A17 |
| Sprint | Operacional | S01 |
| Tenant Guard | Arquitetura | A11 |
| V4 Founder | Arquitetura/Operacional | A12 / S03 |

---

## 10. Estatísticas do Catálogo

| Categoria | Quantidade |
|---|---|
| Termos de Produto | 20 |
| Termos de Arquitetura | 20 |
| Termos da Ontologia Cognitiva | 19 |
| Termos da Experiência (P23) | 20 |
| Termos Operacionais | 8 |
| Termos Deprecados | 18 |
| Termos com Definição Pendente | 7 |
| **Total** | **112 termos** |

---

## 11. Documentos Fonte e Conflitos Resolvidos

| Documento Fonte | Termos Extraídos | Conflitos Resolvidos |
|---|---|---|
| TERMINOLOGY.md (visão de produto) | 20 | "Sinal" vs "Evento" — Sinal é subconjunto de Observação |
| ONTOLOGIA_COGNITIVA.md (teoria do conhecimento) | 19 + 18 deprecados | CrencaDaIdentidade → Hipótese; AcaoCognitiva → Decisao |
| CONSTITUICAO_DA_ENGENHARIA.md (arquitetura) | 20 | TenantId vs empresaId — usar empresaId |
| P23 — IDENTIDADE_DA_INTELIGENCIA | 5 | "Usuário" proibido; "IA" sem nome/rosto |
| P23 — SISTEMA_DE_CONFIANCA_VISUAL | 3 | Sistema de 8 níveis (não 3) |
| P23 — Outros documentos | 5 | Gamificação: não lúdica, cognitiva |
| THESIS.md + FOUNDATION.md | 5 | Missão e princípios |

---

*Documento certificado por arquitetura em 26/07/2026.*
*112 termos catalogados, 7 fontes consolidadas, 18 termos deprecados, 7 pendências identificadas.*
