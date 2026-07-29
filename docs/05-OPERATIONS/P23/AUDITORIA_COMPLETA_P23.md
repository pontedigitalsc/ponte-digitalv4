# AUDITORIA COMPLETA — Programa 23: Consistência dos 17 Documentos + Referências Externas

**Documento de certificação | 26/07/2026**

> Auditoria de contradições, duplicações, regras conflitantes, lacunas e inconsistências com documentos externos. Cada item classificado por gravidade. Documentos classificados individualmente.

---

## 1. CONTRADIÇÕES INTERNAS (entre documentos P23)

### C1 — GRAVE: Curta Duração vs Experiência Longitudinal

**Documento A:** MAPAS_COGNITIVO_VIVO.md — "curta duração (30s-3min)"
**Documento B:** RELATORIO_FINAL.md — "primeira semana estruturada" + ARQUITETURA_VISUAL_DA_CONVERSA — 7 estados de tela

**Conflito:** A especificação completa descreve uma experiência que dura meses (jornada de 7 dias com pós-jornada, gamificação com níveis longos, sistema de confiança que acumula ao longo de datas). Mas MAPAS_COGNITIVO_VIVO descreve a experiência como "curta duração (30s-3min)". Isso é contraditório.
**Recomendação:** Unificar para: "cada sessão individual dura 30s-3min (modo padrão) ou até 15min (modo mergulho). A relação com a IA é longitudinal (dias a meses)."

---

### C2 — GRAVE: 5 áreas vs 19 conceitos

**Documento A:** MAPAS_COGNITIVO_VIVO.md — "5 áreas de conhecimento: Empresa, Financeiro, Clientes, Equipe, Operação"
**Documento B:** SISTEMA_DE_INSIGHTS.md, AUDITORIA_DA_PERCEPCAO.md, C1 relatório — referenciam "19 conceitos fundamentais" da Ontologia Cognitiva
**Documento C:** MAPAS_COGNITIVO_VIVO.md — menciona query da ontologia com "19 concepts + 2 reserved"

**Conflito:** O MAPA diz 5 áreas, define a sidebar com essas 5 áreas, mas internamente as hipóteses usam 19 conceitos. MAPAS_COGNITIVO_VIVO.md diz explicitamente "Não usar grelha 4x5 (19+2). Usar estrutura simplificada de 5 áreas." Mas em outro ponto diz "Query para ontologia (19 concepts + 2 reserved)." 5 áreas é apresentação, 19 conceitos é implementação — mas documentar os dois sem explicar a relação é confuso.
**Recomendação:** Explicitar a relação: "19 conceitos ontológicos internos → agregados em 5 áreas de apresentação. A sidebar mostra 5 áreas; internamente cada área contém de 2 a 6 conceitos."

---

### C3 — ALTA: Três definições de limite de confiança para insight

**Documento A:** SISTEMA_DE_INSIGHTS.md — "confiança ≥20% para sugerir"
**Documento B:** SISTEMA_DE_VALOR.md — "threshold mínimo de 40% de confiança para gerar um WOW"
**Documento C:** SISTEMA_DE_VALOR.md (outra seção) — "apenas insights com confiança > 50% são considerados"

**Conflito:** Três thresholds diferentes para o mesmo conceito (quando mostrar um insight). 20%, 40%, e >50%. O documento SISTEMA_DE_VALOR contém dois thresholds conflitantes dentro de si mesmo (40% vs >50%).
**Recomendação:** Unificar para um único threshold: "confiança ≥40% para WOW, confiança ≥20% para sugestão (não-WOW)". Corrigir SISTEMA_DE_VALOR para eliminar o threshold >50%.

---

### C4 — ALTA: Gamificação existe ou não existe?

**Documento A:** MANIFESTO_DA_EXPERIENCIA.md, seção 4.7 — "A Ponte não gamifica, não distrai, não entretém"
**Documento B:** GAMIFICACAO_COGNITIVA.md — documento completo de 29 seções especificando níveis (1-10), badges, barra de progresso, sistema de recompensas
**Documento C:** RELATORIO_FINAL.md — "Gamificação: Deliberadamente excluída"

**Conflito:** Três documentos dizem que gamificação não existe. Um documento de 29 seções descreve gamificação em detalhe. O manifesto diz "não gamifica". O relatório final diz "excluída". O documento de gamificação existe. Isso sugere que GAMIFICACAO_COGNITIVA.md foi elaborado e depois rejeitado, mas mantido nos arquivos. Se for o caso, deve ser movido para arquivo morto com nota de rejeição. Se não, o manifesto precisa ser atualizado para permitir gamificação cognitiva (não lúdica).
**Recomendação:** Decidir: remover GAMIFICACAO_COGNITIVA.md ou atualizar MANIFESTO. O documento atual de gamificação contradiz três outros documentos.

---

### C5 — MÉDIA: Loading vs Espera — mesmas fases com nomes e durações divergentes

**Documento A:** LOADING_INTELIGENTE.md — fases: "Escutando atentamente…", "Relacionando informações…", "Construindo hipótese…", "Validando com dados públicos…"
**Documento B:** A_ESPERA_INTELIGENTE.md — mesmas fases, textos similares, mas durações diferentes
**Documento C:** LOADING_INTELIGENTE.md — "duração: indeterminado (pipeline)", A_ESPERA_INTELIGENTE.md — "2-5s, 8-12s, 15-25s..."

**Conflito:** Os dois documentos descrevem o mesmo processo com durações inconsistentes. LOADING diz "indeterminado", A_ESPERA diz durações específicas. Os dois precisam descrever o mesmo pipeline, mas com propósitos diferentes (curta vs longa espera).
**Recomendação:** Declarar explicitamente que os dois documentos descrevem o mesmo pipeline unificado. LOADING foca no conteúdo textual das fases; A_ESPERA foca no design da transição de fases.

---

### C6 — MÉDIA: Número de Badges

**Documento A:** GAMIFICACAO_COGNITIVA.md — 6 badges
**Documento B:** GAMIFICACAO_COGNITIVA.md — 10 variações (lista de badges)",
uma mesma seção lista ora 6, ora 10
**Recomendação:** Unificar para 6 badges, que é o número final consistente com as 5 áreas + 1 geral.

---

### C7 — BAIXA: Centro vs chat

**Documento A:** ARQUITETURA_VISUAL_DA_CONVERSA — chat é o centro, mapa é sidebar
**Documento B:** RELATORIO_FINAL — "o mapa é o centro da experiência, não o chat"
**Documento C:** MAPAS_COGNITIVO_VIVO — sidebar recolhível

**Conflito:** RELATORIO_FINAL diz que o mapa é o centro, mas ARQUITETURA diz que o chat é a área principal (68% da tela). Isso não é necessariamente contraditório (centro de atenção ≠ área central da tela), mas precisa ser esclarecido.
**Recomendação:** Reformular: "O mapa é o centro semântico (o que importa). O chat é o centro operacional (onde se interage)."

---

## 2. DUPLICAÇÕES

### D1 Areas de conhecimento em 5 documentos

Presente em: MAPAS_COGNITIVO_VIVO, ARQUITETURA_VISUAL_DA_CONVERSA, GAMIFICACAO_COGNITIVA, SISTEMA_DE_VALOR, AUDITORIA_DA_PERCEPCAO

**Recomendação:** Consolidar definição das 5 áreas em MAPAS_COGNITIVO_VIVO.md. Referenciar nos demais.

### D2 Pipeline do Motor Cognitivo em 3 documentos

Presente em: LOADING_INTELIGENTE (6 fases), A_ESPERA_INTELIGENTE (4 fases com fallback), ARQUITETURA_VISUAL_DA_CONVERSA (E5 — motor funcionando)

**Recomendação:** Consolidar pipeline em LOADING_INTELIGENTE.md como documento fonte.

### D3 Estados da IA em 3 documentos

Presente em: ARQUITETURA_VISUAL_DA_CONVERSA (7 estados E1-E7), EXPERIENCIA_COGNITIVA (Fase 1-5 do diálogo), MICROINTERACOES (3 estados: concordo, discordo, apuro)

**Recomendação:** ARQUITETURA_VISUAL_DA_CONVERSA é o documento fonte. EXPERIENCIA_COGNITIVA descreve fases de conversação (não visuais), complementar. MICROINTERACOES descreve expressões visuais, não estados.

### D4 Definição de "Hipótese" em 4 documentos

Presente em: SISTEMA_DE_INSIGHTS, MAPAS_COGNITIVO_VIVO, SISTEMA_DE_VALOR, GAMIFICACAO_COGNITIVA

**Recomendação:** SISTEMA_DE_INSIGHTS é o documento fonte para definição de hipóteses.

### D5 Jornada do empresário em 2 documentos

Presente em: PSICOLOGIA_DA_PRIMEIRA_IMPRESSAO (jornada do ETD na primeira sessão), RELATORIO_FINAL (jornada de 7 dias)

**Recomendação:** Unificar jornada completa em RELATORIO_FINAL.md (incluindo primeira sessão + 7 dias + pós-jornada). PSICOLOGIA foca apenas no comportamento durante a primeira impressão.

---

## 3. REGRAS CONFLITANTES

### R1 — GRAVE: A IA deve demonstrar confiança vs IA deve mostrar incerteza

**Regra em SISTEMA_DE_CONFIANCA_VISUAL:** A IA tem 3 estados visuais de confiança: Alta (green ring, "Tenho alto grau de confiança"), Média (yellow, "Essa é minha análise inicial"), Baixa (gray, "Ainda estou formando minha opinião")
**Regra em ARQUITETURA_VISUAL_DA_CONVERSA:** "CONFIANTE — IA está segura da informação. MOSTRA_SEGURO — Transmite certeza através de... tom assertivo, sem hesitação"
**Regra em MANIFESTO:** "A IA nunca inventa respostas. 'Não sei' inteligente vale mais que resposta falsa."
**Conflito:** IA deve mostrar certeza (quando confiança é alta) vs IA deve mostrar dúvida (quando não sabe). A coexistência exige que os estados de confiança sejam transparentes para o empresário — o que SISTEMA_DE_CONFIANCA_VISUAL faz. Mas ARQUITETURA sugere que a IA deve parecer segura mesmo quando não está.
**Recomendação:** ARQUITETURA_VISUAL_DA_CONVERSA deve ser revisada para alinhar com SISTEMA_DE_CONFIANCA_VISUAL: a IA só mostra o estado CONFIANTE se o anel de confiança estiver verde. Caso contrário, o tom é cauteloso.

### R2 — MÉDIA: IA deve ser concisa vs IA deve acrescentar sempre

**Regra em MICROINTERACOES:** "Primeira resposta curta (<100 caracteres). Depois expande se necessário."
**Regra em MANIFESTO:** "Toda resposta deve conter algo que o empresário não pediu."
**Conflito:** Curta + acrescentar = contradição. Se toda resposta deve acrescentar algo não pedido, uma resposta de 100 caracteres dificilmente consegue.
**Recomendação:** Resposta curta (foco na pergunta) + 1 linha extra de insight não solicitado (<20% do texto). Isso resolve ambos.

### R3 — BAIXA: IA sem nome vs IA tem endereço

**Regra em IDENTIDADE_DA_INTELIGENCIA:** "IA não tem nome, rosto, gênero ou avatar"
**Regra em EXPERIENCIA_COGNITIVA:** saudação aparece do "canto direito da tela" — tem posição, presença espacial
**Semântica:** uma entidade sem corpo mas que ocupa espaço na tela. Posição é uma forma de presença, não de identidade.
**Recomendação:** Não há conflito real. Posição ≠ identidade. Manter ambos.

---

## 4. LACUNAS

### L1 — GRAVE: Métricas de sucesso da experiência

Nenhum documento P23 define métricas objetivas de sucesso para a experiência. "Empresário confia na IA" não é mensurável sem um NPS, taxa de retorno, tempo de sessão, etc.
**O que falta:** KPIs para cada fase: primeira sessão (taxa de retorno dia 2), primeira semana (dias completados), maturidade (frequência de consulta ao mapa).
**Impacto:** Não dá para saber se a experiência está funcionando.
**Recomendação:** Adicionar seção de métricas em EXPERIENCIA_COGNITIVA.md com KPIs por fase.

### L2 — GRAVE: Estratégia de fallback para falha do motor

P23 assume que o Motor Cognitivo funciona perfeitamente. Nenhum documento especifica o que acontece quando o motor falha: timeout de API, dado inconsistente, confiança zerada.
**O que falta:** Plano de falha: o que a IA diz/faz quando não consegue gerar um insight, quando o mapa não carrega, quando o diagnóstico trava.
**Impacto:** Primeira falha real pode destruir a confiança sem protocolo de recuperação.
**Recomendação:** Adicionar seção de fallback e tratamento de erro em cada documento de funcionalidade.

### L3 — ALTA: Onboarding do Mapa Cognitivo

Nenhum documento descreve como o empresário DESCOBRE o mapa. "Sidebar direita expansível" — mas como ele sabe que pode expandir?
**O que falta:** Tooltip no primeiro acesso? Dica visual sutil? Onboarding guiado?
**Impacto:** Recurso central pode não ser usado.
**Recomendação:** Adicionar a MAPAS_COGNITIVO_VIVO.md: "O mapa aparece recolhido no primeiro acesso, com tooltip indicando expansão. A IA menciona o mapa na primeira resposta: 'Estou montando um mapa mental da sua empresa (sidebar à direita).'"

### L4 — ALTA: Experiência mobile

Nenhum documento P23 descreve a experiência mobile em detalhe. MAPAS_COGNITIVO_VIVO.md dedica 3 linhas. O resto é silêncio.
**O que falta:** Layout mobile do chat, do mapa (modal vs swipe), dos insights, da gamificação.
**Impacto:** Se mobile é o principal canal (provável), a especificação atual é irrelevante.
**Recomendação:** Adicionar seção mobile em cada documento de experiência, ou criar documento separado de experiência mobile.

### L5 — MÉDIA: Pós-jornada (após os 7 dias)

RELATORIO_FINAL.md descreve a "primeira semana estruturada" mas não o que acontece depois.
**O que falta:** Como a relação evolui após a semana inicial? A IA se torna mais passiva? Mais proativa?
**Impacto:** Experiência pós-jornada é indefinida.
**Recomendação:** Adicionar seção de pós-jornada em EXPERIENCIA_COGNITIVA.md.

### L6 — MÉDIA: Descoberta de insights

SISTEMA_DE_INSIGHTS.md descreve como os insights aparecem (timing, posição) mas não como o empresário os descobre pela primeira vez.
**O que falta:** Como o empresário aprende que pode clicar em um insight para expandir?
**Impacto:** Insights podem ser ignorados.
**Recomendação:** Adicionar onboarding mínimo: tooltip no primeiro insight.

### L7 — MÉDIA: Transição entre estados visuais

ARQUITETURA_VISUAL_DA_CONVERSA define 7 estados (E1-E7) mas não descreve as transições entre eles: como se sai de E3 (IA respondendo) para E4 (IA pensando)?
**O que falta:** Diagrama de transições de estado com gatilhos.
**Impacto:** Implementação pode ter transições bruscas.
**Recomendação:** Adicionar máquina de estados com transições em ARQUITETURA_VISUAL_DA_CONVERSA.

### L8 — BAIXA: Feedback do empresário

Nenhum documento descreve como o empresário pode dar feedback sobre a IA: correção de hipótese errada, sugestão de tema, reclamação.
**O que falta:** Mecanismo de feedback.
**Impacto:** IA não melhora com uso.
**Recomendação:** Adicionar como requisito não-funcional em SISTEMA_DE_INSIGHTS: "botão 'isso não está certo' em cada hipótese."

### L9 — BAIXA: Variabilidade linguística

IDENTIDADE_DA_INTELIGENCIA.md especifica frases exatas em português. Sem variação para outros idiomas ou para português menos formal.
**O que falta:** Estratégia de i18n/l10n.
**Impacto:** Arquivos presos a um único dialeto.
**Recomendação:** Adicionar nota de localização ou criar template parametrizado.

---

## 5. INCONSISTÊNCIAS COM DOCUMENTOS DE REFERÊNCIA EXTERNOS

### I1 — GRAVE: Motor Cognitivo existe ou não?

**P23:** Assume que Motor Cognitivo com pipeline completo (Escuta → Correlação → Hipótese → Validação → Insight) existe e está operacional. LOADING_INTELIGENTE descreve fases em tempo real do pipeline. SISTEMA_DE_INSIGHTS assume hipóteses sendo geradas. MAPA_COGNITIVO supõe consultas à ontologia em tempo real.
**CURRENT_PRODUCT.md:** "Motor Cognitivo completo (Observação → Hipótese → Experimento → Conhecimento) — CONGELADO"
**ARCHITECTURE.md:** "Motor Cognitivo: Nenhuma peça deve ser implementada antes da Fase 2"
**MVP_SCOPE.md:** "Nenhuma peça do Motor Cognitivo"

**Realidade:** CURRENT_PRODUCT.md lista 9 motores no sistema/engine/ — pipeline motor, segmentação, contexto, prioridade, decisão, etc. Eles EXISTEM como módulos de engine, mas NÃO implementam o ciclo completo "Motor Cognitivo" que o P23 requer. O P23 precisa de um motor de hipóteses e insights que ainda não está implementado.
**Impacto:** **IMPLEMENTAÇÃO INVIÁVEL** sem resolver isso primeiro.
**Recomendação:** Priorizar a implementação do motor de hipóteses (mínimo necessário para P23) antes dos elementos de experiência. Ou o P23 deve especificar um simulador de motor para os experimentos da Empresa Zero.

---

### I2 — ALTA: Contexto acumulativo vs contexto limitado

**P23:** "A conversa acumula contexto — nada é esquecido" (EXPERIENCIA_COGNITIVA). "Cobertura cognitiva é acumulativa entre sessões" (GAMIFICACAO_COGNITIVA).
**MVP_SCOPE.md:** "Assistente da Ponte (hoje: chat com contexto limitado)"
**CURRENT_PRODUCT.md:** "Diagnóstico básico — o Chat atual responde perguntas sobre dados carregados"

**Conflito:** O MVP atual não acumula contexto entre sessões. O P23 exige. Isso requer desenvolvimento de memória persistente de conversa.
**Impacto:** Funcionalidade de "cobertura acumulativa" e "o mapa lembra de tudo" não pode ser implementada com a arquitetura atual.
**Recomendação:** P23 precisa especificar: (a) sessão individual usa contexto da sessão e (b) cobertura é acumulada via banco de dados de hipóteses, não via memória de conversa. Ou desenvolver memória persistente.

---

### I3 — MÉDIA: Nível de gamificação vs MVP

**P23:** Gamificação detalhada com 6 badges, barra de progresso, níveis 1-10
**MVP_SCOPE.md:** Nível de sofisticação técnica é "MVP/pré-validação"
**PRINCIPLES.md:** "O estágio da empresa (hoje: MVP/pré-validação) é o teto da sofisticação técnica"

**Conflito:** Badges, níveis e barras de progresso são sofisticação de produto que não corresponde ao estágio MVP/pré-validação.
**Impacto:** P23 especifica uma sofisticação de produto que contradiz o princípio fundamental do projeto.
**Nota:** O manifesto P23 também já excluiu gamificação (C4). Esta inconsistência só se aplica se GAMIFICACAO_COGNITIVA.md for mantido. Se for removido, o conflito desaparece.
**Recomendação:** Se gamificação for mantida, adicionar nota em PRINCIPLES.md que a gamificação cognitiva (reflexo de conhecimento real) é uma exceção ao princípio de sofisticação técnica. Ou remover GAMIFICACAO_COGNITIVA.md.

---

### I4 — MÉDIA: Perfil do empresário (ETD vs Jornada Fundacional)

**P23:** ETD — Empresário Tomador de Decisão, perfil corporativo, tempo escasso, familiaridade com tecnologia
**JORNADA_FUNDACIONAL_DO_EMPRESARIO.md:** Empresário real — pequeno negócio, barbearia, lavação, oficina, "não separa CNPJ da vida", não tem familiaridade com tecnologia

**Conflito:** O perfil do P23 é mais sofisticado que o perfil real documentado na Jornada Fundacional. A experiência especificada pode ser complexa demais para o empresário real.
**Impacto:** Risco de a experiência ser rejeitada por ser percebida como complexa ou "fresca" pelo empresário real.
**Recomendação:** Revisar complexidade da experiência contra o perfil real. Simplificar elementos mais abstratos (mapa cognitivo, níveis de confiança, sistema de badges). Validar com Empresa Zero.

---

### I5 — BAIXA: Pipeline de 6 fases vs motores reais

**P23:** Pipeline em LOADING_INTELIGENTE (Escuta, Correlação, Hipótese, Validação, Finalização)
**CURRENT_PRODUCT.md:** Engines reais: pipeline motor, segmentação, contexto, prioridade, decisão, explicação, embedding, consistency, guardrail

**Conflito:** Os nomes das fases no P23 não correspondem aos nomes dos motores reais. LOADING diz "Escutando atentamente" mas o motor real se chama "pipeline motor". Isso pode confundir a equipe técnica.
**Recomendação:** Mapear cada fase do P23 para o motor real correspondente. Incluir tabela de mapeamento.

---

### I6 — BAIXA: Jornada de 7 dias vs desenvolvimento incremental

**P23:** Jornada de 7 dias especificada como roteiro fixo
**ARCHITECTURE.md:** Desenvolvimento incremental, evitar big bang

**Conflito:** Jornada de 7 dias é relativamente grande para ser implementada de uma vez. Pode precisar ser quebrada em entregas menores.
**Recomendação:** Jornada de 7 dias como alvo final, não como primeira entrega. Implementar dia 1 primeiro, validar, depois adicionar dia 2-3, etc.

---

## 6. SAÚDE DO PROGRAMA — CLASSIFICAÇÃO FINAL

### Nota Geral: **6.0/10**

| Critério | Nota | Justificativa |
|----------|------|---------------|
| Coerência interna dos P23 | 5.5/10 | 7 contradições (2 graves, 3 altas, 2 médias), 5 duplicações |
| Completude da especificação | 5/10 | 9 lacunas (2 graves, 2 altas, 3 médias, 2 baixas) |
| Alinhamento com engenharia | 4/10 | Motor Cognitivo não existe, contexto limitado, 9 motores reais diferentes dos nomes do P23 |
| Alinhamento com visão do produto | 5.5/10 | Perfil ETD difere do perfil real; sofisticação excessiva para MVP |
| Implementabilidade | 4.5/10 | 11 WPs, 2 bloqueados por dependência externa (Motor Cognitivo), 3 dependem de contexto persistente |
| Prontidão para Empresa Zero | 6/10 | Experimento 1 viável (primeira impressão) mas experiências 2-5 dependem de motor ou contexto |

### Classificação individual dos documentos

| Documento | Nota | Maior problema |
|-----------|------|----------------|
| MANIFESTO_DA_EXPERIENCIA.md | 9.5 | Perfeito — exceto contradição com gamificação |
| RELATORIO_FINAL.md | 7.0 | Contradiz manifesto (gamificação excluída mas documento existe); métricas faltando |
| EXPERIENCIA_COGNITIVA.md | 7.5 | Métricas faltando (L1) |
| EXPERIENCIA_SENSORIAL.md | 8.0 | Mobile ausente (L4) |
| IDENTIDADE_DA_INTELIGENCIA.md | 9.0 | Variabilidade linguística ausente (L9) |
| PSICOLOGIA_DA_PRIMEIRA_IMPRESSAO.md | 8.5 | Mobile ausente |
| SISTEMA_DE_CONFIANCA_VISUAL.md | 7.0 | Thresholds conflitantes (C3), fallback ausente (L2) |
| SISTEMA_DE_VALOR.md | 6.5 | Contradiz-se nos thresholds (C3), on-boarding de insights ausente (L6) |
| SISTEMA_DE_INSIGHTS.md | 7.0 | Descoberta de insights (L6), contexto acumulativo (I2) |
| GAMIFICACAO_COGNITIVA.md | 4.0 | Contradiz manifesto (C4) e princípios (I3); 6 vs 10 badges (C6) |
| MAPAS_COGNITIVO_VIVO.md | 5.5 | Curta duração vs longa (C1), onboarding (L3), mobile (L4) |
| MICROINTERACOES.md | 7.5 | Mobile ausente |
| LOADING_INTELIGENTE.md | 7.0 | Pipeline inconsistente com A_ESPERA (C5), nomes não correspondem a motores reais (I5) |
| A_ESPERA_INTELIGENTE.md | 7.0 | Pipeline inconsistente com LOADING (C5) |
| ARQUITETURA_VISUAL_DA_CONVERSA.md | 7.0 | Transições faltando (L7), mobile ausente (L4), centro vs chat (C7) |
| AUDITORIA_DA_PERCEPCAO.md | 8.0 | Mobile ausente |
| ROADMAP_IMPLEMENTACAO_P23.md | 7.5 | Métricas faltando; dependência de motor não declarada explicitamente |

### Recomendação final

**O Programa 23 deve ser considerado ENCERRADO como fase de especulação, mas BLOQUEADO para implementação até que duas condições sejam atendidas:**

1. **Motor Cognitivo mínimo implementado** (pipeline de hipóteses funcionando com dados reais da Empresa Zero). Sem isso, LOADING, MAPA, SISTEMA_DE_INSIGHTS e SISTEMA_DE_VALOR não podem ser implementados.

2. **Contradição da gamificação resolvida:** GAMIFICACAO_COGNITIVA.md deve ser oficialmente adotado (com atualização do MANIFESTO) ou oficialmente removido (movido para archive/ com nota de rejeição).

**Recomendações de curto prazo:**
- **Dia 1:** Resolver C3 (thresholds), C4 (gamificação), C5 (loading vs espera)
- **Semana 1:** Resolver L1 (métricas), L3 (onboarding mapa), L7 (transições)
- **Sprint atual:** Implementar motor de hipóteses mínimo (desbloqueia 5 WPs)

**Documentos que não precisam de revisão:** MANIFESTO, IDENTIDADE, PSICOLOGIA, AUDITORIA.

*Documento certificado por auditoria arquitetural em 26/07/2026.*
*17 documentos P23 auditados. 6 documentos de referência externos consultados.*