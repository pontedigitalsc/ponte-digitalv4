# HIPÓTESES CLASSIFICADAS — Catálogo Revisado para Validação

**Programa 25 | Classificação e Priorização de Hipóteses | 26/07/2026**

> Revisão completa das 22 hipóteses de HIPOTESES_EM_ABERTO.md (P24).
> Classificação atualizada em 4 categorias, com método de validação, empresa-alvo, prioridade e risco.

---

## Nota Metodológica

As 22 hipóteses originais foram mantidas com seus IDs (H-001 a H-022). A classificação original (comportamento do empresário / experiência / adoção) foi refinida para 4 categorias:

| Categoria | Definição |
|---|---|
| **comportamento** | Como o empresário reage, decide, responde |
| **motor** | Como o Motor Cognitivo deve funcionar |
| **experiência** | Como a interface deve se comportar |
| **adoção** | O que faz o empresário voltar e recomendar |

---

## Hipóteses

### H-001 — Confiança na IA que admite incerteza

| Campo | Valor |
|---|---|
| Hipótese | Empresários sentem mais confiança na IA quando ela admite incerteza do que quando parece sempre certa |
| Classificação atualizada | **comportamento** |
| O que sabemos | Estudos de UX mostram que sistemas que admitem incerteza geram mais confiança em contextos médicos e financeiros. Não testado no contexto de empresários brasileiros de PME. |
| O que acreditamos | A transparência sobre incerteza será um diferencial de confiança para o empresário da Ponte Digital |
| O que ainda não sabemos | Se o empresário brasileiro de PME reage como os perfis estudados; se o efeito varia por perfil (analítico vs intuitivo) |
| Como validar | Versão A: IA sempre confiante. Versão B: IA admite incerteza. Medir taxa de conclusão, profundidade das respostas, retorno em 7 dias |
| Empresa validadora | Empresa Zero + cliente parceiro |
| Tempo estimado | 2-3 semanas |
| Prioridade | **Alta** |
| Risco de estar errada | **Alto** — se errada, remove o principal diferencial de transparência |
| Pendência associada | BP-004 (indicador de confiança), BP-010 (violações do manifesto) |

---

### H-002 — Mapa Cognitivo Vivo aumenta engajamento

| Campo | Valor |
|---|---|
| Hipótese | O Mapa Cognitivo Vivo aumenta a percepção de inteligência e engajamento |
| Classificação atualizada | **experiência** |
| O que sabemos | Dashboards de progresso aumentam engajamento em produtos SaaS (estudos de gamificação e onboarding). Não testado com mapa cognitivo em tempo real. |
| O que acreditamos | Ver o mapa crescer durante a conversa fará o empresário perceber inteligência e continuar engajado |
| O que ainda não sabemos | Se o mapa será notado; se será compreendido; se não sobrecarregará |
| Como validar | Versão A: com mapa. Versão B: sem mapa (apenas conversa). Medir NPS e retorno |
| Empresa validadora | Empresa Zero |
| Tempo estimado | 4-6 semanas (depende de BP-008) |
| Prioridade | **Alta** |
| Risco de estar errada | **Médio** |
| Pendência associada | BP-008 (Mapa Cognitivo) |

---

### H-003 — 5 perguntas ideal antes do primeiro resumo

| Campo | Valor |
|---|---|
| Hipótese | 5 perguntas é o número ideal antes do primeiro resumo parcial |
| Classificação atualizada | **experiência** |
| O que sabemos | Nenhuma evidência específica para este contexto |
| O que acreditamos | 5 perguntas equilibra profundidade sem perder o fio da conversa |
| O que ainda não sabemos | O número ideal; se depende do perfil do empresário |
| Como validar | Testar 3, 5, 7 e 10 perguntas. Medir sensação de progresso e clareza |
| Empresa validadora | Empresa Zero |
| Tempo estimado | 2 semanas |
| Prioridade | **Média** |
| Risco de estar errada | **Baixo** — ajuste de configuração, não de arquitetura |
| Pendência associada | Nenhuma |

---

### H-004 — Timing proporcional à complexidade aumenta percepção de inteligência

| Campo | Valor |
|---|---|
| Hipótese | Timing de resposta proporcional à complexidade aumenta percepção de inteligência |
| Classificação atualizada | **experiência** |
| O que sabemos | Estudos de HCI mostram que respostas instantâneas para perguntas complexas reduzem confiança (efeito "resposta decorada"). |
| O que acreditamos | Empresários perceberão a IA como mais inteligente se o tempo de resposta refletir a complexidade da pergunta |
| O que ainda não sabemos | Se o empresário brasileiro prefere velocidade à aparência de reflexão; qual a tolerância por pergunta complexa |
| Como validar | Versão A: timing variável. Versão B: sempre rápido. Medir percepção de inteligência |
| Empresa validadora | Empresa Zero |
| Tempo estimado | 2-3 semanas |
| Prioridade | **Alta** |
| Risco de estar errada | **Alto** — timing variável é complexo de implementar |
| Pendência associada | BP-003 (loading inteligente) |

---

### H-005 — Loading inteligente reduz abandono

| Campo | Valor |
|---|---|
| Hipótese | Loading inteligente (com texto do processo) reduz abandono durante espera |
| Classificação atualizada | **experiência** |
| O que sabemos | Estudos de UX mostram que progress bars com texto reduzem percepção de espera em 20-30% |
| O que acreditamos | Mostrar as fases cognitivas durante o processamento manterá o empresário engajado |
| O que ainda não sabemos | O texto ideal das fases; se o empresário entende os termos cognitivos |
| Como validar | Versão A: loading inteligente com fases. Versão B: spinner genérico. Medir abandono em esperas >5s |
| Empresa validadora | Empresa Zero + cliente parceiro |
| Tempo estimado | 2-3 semanas |
| Prioridade | **Alta** |
| Risco de estar errada | **Médio** |
| Pendência associada | BP-003 (loading inteligente) |

---

### H-006 — Notificação de insight aumenta retorno

| Campo | Valor |
|---|---|
| Hipótese | Empresários retornam mais quando recebem notificação de novo insight |
| Classificação atualizada | **adoção** |
| O que sabemos | Push notifications aumentam retorno em produtos B2B (estudos gerais). Não testado com insights cognitivos. |
| O que acreditamos | Insights são conteúdo de alto valor que motivarão o retorno |
| O que ainda não sabemos | Se o insight é valioso o suficiente para gerar retorno; se notificação será percebida como spam |
| Como validar | Grupo A: notificação de insight. Grupo B: sem notificação. Medir retorno em 7/14/30 dias |
| Empresa validadora | Cliente parceiro |
| Tempo estimado | 4-6 semanas |
| Prioridade | **Média** |
| Risco de estar errada | **Médio** |
| Pendência associada | BP-006 (continuidade entre sessões) |

---

### H-007 — Digitar vs selecionar: preferência por respostas abertas

| Campo | Valor |
|---|---|
| Hipótese | Empresários preferem digitar respostas a selecionar opções em múltipla escolha |
| Classificação atualizada | **comportamento** |
| O que sabemos | Respostas abertas geram dados mais ricos. Múltipla escolha reduz carga cognitiva. Trade-off conhecido em design de surveys. |
| O que acreditamos | Empresários se engajarão mais se puderem se expressar livremente |
| O que ainda não sabemos | O perfil do empresário da Ponte (baixa familiaridade com tecnologia) pode preferir múltipla escolha |
| Como validar | Versão A: apenas texto livre. Versão B: múltipla escolha + opção "outro". Medir qualidade dos dados |
| Empresa validadora | Empresa Zero |
| Tempo estimado | 2-3 semanas |
| Prioridade | **Alta** |
| Risco de estar errada | **Alto** — se errada, Motor Cognitivo precisa ser redesenhado para entrada estruturada |
| Pendência associada | BP-005 (cobertura tech do motor) |

---

### H-008 — Primeira pergunta define o tom da conversa

| Campo | Valor |
|---|---|
| Hipótese | A primeira pergunta define o tom de toda a conversa |
| Classificação atualizada | **experiência** |
| O que sabemos | Efeito de primazia é bem documentado em psicologia cognitiva. Primeira impressão impacta percepção geral. |
| O que acreditamos | Uma primeira pergunta fácil e relevante fará o empresário se engajar mais |
| O que ainda não sabemos | Qual o nível ideal de dificuldade da primeira pergunta; se o efeito se mantém ao longo de múltiplas sessões |
| Como validar | Testar 3 primeiras perguntas diferentes (fácil/médio/difícil). Medir profundidade e duração |
| Empresa validadora | Empresa Zero |
| Tempo estimado | 1-2 semanas |
| Prioridade | **Alta** |
| Risco de estar errada | **Baixo** — ajuste de conteúdo, não de arquitetura |
| Pendência associada | Nenhuma |

---

### H-009 — Proporção de fala IA:empresário 40:60

| Campo | Valor |
|---|---|
| Hipótese | A IA deve falar menos que o empresário (proporção 40:60) |
| Classificação atualizada | **comportamento** |
| O que sabemos | Estudos de entrevista mostram que o entrevistador deve falar ~30% para obter informações ricas. 40:60 é o alvo definido. |
| O que acreditamos | Empresários que falam mais geram diagnósticos mais precisos |
| O que ainda não sabemos | Se o empresário se sente "interrogado"; se prefere IA mais prolixa |
| Como validar | Versão A: IA concisa (40%). Versão B: IA explicativa (60%). Medir qualidade do diagnóstico |
| Empresa validadora | Empresa Zero |
| Tempo estimado | 2-3 semanas |
| Prioridade | **Média** |
| Risco de estar errada | **Médio** |
| Pendência associada | BP-002 (Motor Cognitivo) |

---

### H-010 — Insights com dados percentuais geram mais confiança

| Campo | Valor |
|---|---|
| Hipótese | Empresários confiam mais em insights com dados percentuais do que qualitativos |
| Classificação atualizada | **comportamento** |
| O que sabemos | Números aumentam percepção de precisão (estudos de comunicação científica). Podem intimidar não-analíticos. |
| O que acreditamos | Empresários confiarão mais em "85% dos clientes" do que "Seus clientes estão concentrados" |
| O que ainda não sabemos | Se o perfil do empresário da Ponte (baixa familiaridade com dados) reage positivamente ou se sente intimidado |
| Como validar | Versão A: insight com dados. Versão B: insight qualitativo. Medir confiança percebida |
| Empresa validadora | Empresa Zero |
| Tempo estimado | 2 semanas |
| Prioridade | **Média** |
| Risco de estar errada | **Médio** |
| Pendência associada | BP-004 (indicador de confiança) |

---

### H-011 — Gamificação cognitiva (indicadores de progresso) aumenta engajamento

| Campo | Valor |
|---|---|
| Hipótese | A gamificação cognitiva (indicadores de progresso) aumenta engajamento |
| Classificação atualizada | **experiência** |
| O que sabemos | Progress bars aumentam conclusão em formulários e onboarding. Efeito bem documentado. |
| O que acreditamos | Empresários completarão mais perguntas se virem indicadores de progresso |
| O que ainda não sabemos | Se o empresário quer ver "progresso" ou prefere fluidez sem métricas |
| Como validar | Versão A: com indicadores. Versão B: sem indicadores. Medir conclusão |
| Empresa validadora | Empresa Zero |
| Tempo estimado | 2-3 semanas |
| Prioridade | **Média** |
| Risco de estar errada | **Baixo** |
| Pendência associada | BP-021 (contradição gamificação — precisa ser resolvida antes) |

---

### H-012 — Insights em tempo real aumentam retorno

| Campo | Valor |
|---|---|
| Hipótese | Empresários que veem os insights em tempo real retornam mais |
| Classificação atualizada | **adoção** |
| O que sabemos | Dopamina da descoberta é gatilho de engajamento. Efeito "aha moment" em produtos digitais. |
| O que acreditamos | Ver insight aparecer durante a conversa gerará curiosidade para ver o diagnóstico completo |
| O que ainda não sabemos | Se insight durante vs apenas no final faz diferença no retorno |
| Como validar | Versão A: insight aparece durante. Versão B: insight apenas no resumo final |
| Empresa validadora | Empresa Zero |
| Tempo estimado | 4-6 semanas (depende de motor de insights) |
| Prioridade | **Média** |
| Risco de estar errada | **Médio** |
| Pendência associada | BP-007 (WPs P23), BP-006 (continuidade) |

---

### H-013 — Compartilhar dados sensíveis após ver valor

| Campo | Valor |
|---|---|
| Hipótese | Empresários se sentem mais confortáveis compartilhando dados sensíveis após verem valor |
| Classificação atualizada | **comportamento** |
| O que sabemos | Reciprocidade é princípio de persuasão bem documentado (Cialdini). Demonstrar valor primeiro gera confiança. |
| O que acreditamos | Um insight valioso inicial fará o empresário compartilhar dados mais sensíveis depois |
| O que ainda não sabemos | Que tipo de insight gera valor suficiente; tempo ideal para primeiro "WOW" |
| Como validar | Analisar correlação entre momento do primeiro insight e profundidade dos dados compartilhados |
| Empresa validadora | Empresa Zero |
| Tempo estimado | 3-4 semanas |
| Prioridade | **Alta** |
| Risco de estar errada | **Médio** |
| Pendência associada | BP-007 (WP03 — Motor de Insights) |

---

### H-014 — Tom formal → informal progressivo

| Campo | Valor |
|---|---|
| Hipótese | Tom formal no início seguido de tom mais informal gera mais engajamento |
| Classificação atualizada | **comportamento** |
| O que sabemos | Credibilidade inicial é estabelecida por formalidade. Rapport é construído com informalidade gradual. Conceito de "thin-slicing" em psicologia social. |
| O que acreditamos | Empresários responderão melhor quando a IA "relaxar" após estabelecer credibilidade |
| O que ainda não sabemos | A velocidade ideal da transição; se a mudança será notada como inconsistente |
| Como validar | Versão A: formal → informal gradual. Versão B: tom constante. Medir NPS |
| Empresa validadora | Empresa Zero |
| Tempo estimado | 2-3 semanas |
| Prioridade | **Baixa** |
| Risco de estar errada | **Baixo** |
| Pendência associada | Nenhuma |

---

### H-015 — Diagnóstico em 3 tópicos principais

| Campo | Valor |
|---|---|
| Hipótese | Empresários preferem diagnóstico em 3 tópicos principais (não mais que 5) |
| Classificação atualizada | **comportamento** |
| O que sabemos | Limite de processamento de informação: 3-5 itens (Miller's Law). Resumos com 3 tópicos são mais lembrados. |
| O que acreditamos | 3 tópicos no resumo final serão mais acionáveis que listas longas |
| O que ainda não sabemos | Se o empresário sente falta dos detalhes; se 3 tópicos cobrem a complexidade do negócio |
| Como validar | Versão A: 3 tópicos. Versão B: 7 tópicos. Medir recall e ação após 7 dias |
| Empresa validadora | Empresa Zero |
| Tempo estimado | 2-3 semanas |
| Prioridade | **Média** |
| Risco de estar errada | **Baixo** |
| Pendência associada | BP-007 (WP06 — Resumo de Sessão) |

---

### H-016 — Indicador de confiança sempre visível

| Campo | Valor |
|---|---|
| Hipótese | O indicador de confiança deve ser sempre visível (não colapsável) |
| Classificação atualizada | **experiência** |
| O que sabemos | Informação de calibragem de confiança é mais efetiva quando sempre visível (estudos de decisão assistida por IA). |
| O que acreditamos | Empresários ajustarão seu comportamento baseado no indicador de confiança |
| O que ainda não sabemos | Se o indicador será notado; se não causará distração |
| Como validar | Eye tracking para ver se empresários olham para o indicador |
| Empresa validadora | Cliente parceiro (com laboratório de usabilidade) |
| Tempo estimado | 2-3 semanas |
| Prioridade | **Média** |
| Risco de estar errada | **Médio** |
| Pendência associada | BP-004 (indicador de confiança) |

---

### H-017 — Perfis analítico e intuitivo precisam de experiências diferentes

| Campo | Valor |
|---|---|
| Hipótese | Empresários com perfil "analítico" e "intuitivo" precisam de experiências diferentes |
| Classificação atualizada | **motor** |
| O que sabemos | Personalização por perfil melhora engajamento em produtos de educação e saúde. Consenso parcial na literatura. |
| O que acreditamos | Detectar o perfil nas primeiras 3 respostas e adaptar tom/forma aumentará engajamento |
| O que ainda não sabemos | Se a detecção precoce é precisa; se a adaptação faz diferença mensurável |
| Como validar | Detectar perfil nas primeiras 3 respostas e adaptar tom. Medir engajamento por perfil |
| Empresa validadora | Empresa Zero (após validação das hipóteses de comportamento base) |
| Tempo estimado | 6-8 semanas |
| Prioridade | **Baixa** |
| Risco de estar errada | **Alto** — complexidade alta de implementação para benefício incerto |
| Pendência associada | BP-002 (Motor Cognitivo) |

---

### H-018 — Botão "Continuar agora" durante espera reduz abandono

| Campo | Valor |
|---|---|
| Hipótese | O botão "Continuar agora" durante espera longa reduz abandono |
| Classificação atualizada | **experiência** |
| O que sabemos | Dar controle ao usuário durante espera reduz frustração (estudos de fila/espera). |
| O que acreditamos | Empresários que podem escolher entre esperar e continuar abandonarão menos |
| O que ainda não sabemos | Se o empresário prefere esperar a análise completa ou continuar |
| Como validar | Versão A: com botão. Versão B: sem botão. Medir abandono |
| Empresa validadora | Empresa Zero |
| Tempo estimado | 1-2 semanas |
| Prioridade | **Alta** |
| Risco de estar errada | **Baixo** — implementação simples |
| Pendência associada | BP-003 (loading inteligente) |

---

### H-019 — Silêncio da IA durante reflexão é produtivo

| Campo | Valor |
|---|---|
| Hipótese | Silêncio da IA durante reflexão do empresário é produtivo (não desconfortável) |
| Classificação atualizada | **comportamento** |
| O que sabemos | Pausas em entrevistas aumentam profundidade das respostas. Técnica de "silêncio" em psicoterapia. |
| O que acreditamos | Empresários que têm pausas para pensar darão respostas mais profundas |
| O que ainda não sabemos | Se o silêncio causa ansiedade; se pequenos comentários ("Estou aqui") melhoram a experiência |
| Como validar | Versão A: IA espera em silêncio. Versão B: IA faz pequenos comentários. Medir profundidade |
| Empresa validadora | Empresa Zero |
| Tempo estimado | 2 semanas |
| Prioridade | **Média** |
| Risco de estar errada | **Médio** |
| Pendência associada | Nenhuma |

---

### H-020 — Diagnóstico completo aumenta retorno

| Campo | Valor |
|---|---|
| Hipótese | Empresários que completam o diagnóstico têm 3x mais chance de retornar |
| Classificação atualizada | **adoção** |
| O que sabemos | Correlação entre conclusão de onboarding e retenção é bem estabelecida em SaaS B2B. |
| O que acreditamos | Ver o diagnóstico completo cria senso de valor que motiva retorno |
| O que ainda não sabemos | A magnitude do efeito na Ponte Digital (3x é estimativa); se o diagnóstico é o gatilho correto |
| Como validar | Correlacionar conclusão do diagnóstico com retorno em 7/14/30 dias |
| Empresa validadora | Empresa Zero |
| Tempo estimado | 4-6 semanas |
| Prioridade | **Média** |
| Risco de estar errada | **Baixo** |
| Pendência associada | BP-006 (continuidade entre sessões), BP-014 (métricas) |

---

### H-021 — Microcelebrações a cada insight aumentam engajamento

| Campo | Valor |
|---|---|
| Hipótese | Microcelebrações a cada insight aumentam engajamento na sessão |
| Classificação atualizada | **experiência** |
| O que sabemos | Celebrações aumentam dopamina e engajamento (gamificação). Efeito conhecido mas pode parecer artificial. |
| O que acreditamos | Pequenas celebrações visuais a cada descoberta tornarão a experiência mais prazerosa |
| O que ainda não sabemos | Se o empresário achará artificial; se o efeito se mantém após repetição |
| Como validar | Versão A: com microcelebração. Versão B: sem. Medir NPS e tempo de sessão |
| Empresa validadora | Empresa Zero |
| Tempo estimado | 2-3 semanas |
| Prioridade | **Baixa** |
| Risco de estar errada | **Médio** |
| Pendência associada | BP-025 (microinterações) |

---

### H-022 — Som aumenta percepção de "inteligência viva"

| Campo | Valor |
|---|---|
| Hipótese | A Ponte Digital deve ter som para ser percebida como inteligência viva |
| Classificação atualizada | **experiência** |
| O que sabemos | Som aumenta imersão e percepção de "vida" em sistemas interativos. Pode ser irritante se mal projetado. |
| O que acreditamos | Sons sutis de insight/descoberta farão a Ponte parecer mais viva que uma ferramenta |
| O que ainda não sabemos | Se o empresário achará irritante; se o som agrega valor percebido |
| Como validar | Versão A: com som sutil. Versão B: sem som. Medir percepção de "inteligência viva" |
| Empresa validadora | Cliente parceiro |
| Tempo estimado | 3-4 semanas |
| Prioridade | **Baixa** |
| Risco de estar errada | **Alto** — som pode irritar em vez de encantar |
| Pendência associada | BP-032 (experiência sensorial) |

---

## Hipóteses Prioritárias para Empresa Zero

As 5 hipóteses que devem ser validadas primeiro com a Empresa Zero:

### #1 — H-001: Confiança na IA que admite incerteza

**Justificativa:** Esta hipótese é a base do diferencial competitivo da Ponte Digital. Se o empresário real **não** confiar mais numa IA que admite incerteza, todo o Sistema de Confiança Visual precisa ser repensado. Risco: alto. Impacto se errada: muito alto. Pode ser testada sem implementação complexa (apenas variação de prompt).

### #2 — H-007: Digitar vs selecionar (respostas abertas)

**Justificativa:** Impacta diretamente o design do Motor Cognitivo. Se empresários preferirem múltipla escolha, o motor pode ser significativamente mais simples (entrada estruturada). Risco: alto. Pode ser testada com protótipo funcional em 1-2 semanas.

### #3 — H-008: Primeira pergunta define o tom

**Justificativa:** Mais fácil e rápida de testar (1 semana). A primeira pergunta é o ponto de partida de toda a experiência. Acertar ou errar aqui define todo o resto. Risco: baixo — ajuste de conteúdo. Aprender isso cedo evita retrabalho.

### #4 — H-013: Compartilhar dados sensíveis após ver valor

**Justificativa:** Essencial para entender o fluxo de profundidade da conversa. Se empresários não compartilharem dados mais profundos mesmo após ver valor, o Motor Cognitivo precisa gerar valor imediato mais forte. Pode ser testada com análise de logs das primeiras sessões da Empresa Zero.

### #5 — H-005: Loading inteligente reduz abandono

**Justificativa:** A implementação de loading inteligente é cara (ver BP-003). Validar cedo se o texto do processo reduz abandono evita investimento em funcionalidade que pode não fazer diferença. Pode ser testada com protótipo simples.

---

## Tabelas Resumo

### Total por Classificação

| Classificação | Quantidade | IDs |
|---|---|---|
| comportamento | 7 | H-001, H-007, H-009, H-010, H-013, H-014, H-015, H-019 |
| motor | 1 | H-017 |
| experiência | 10 | H-002, H-003, H-004, H-005, H-008, H-011, H-016, H-018, H-021, H-022 |
| adoção | 3 | H-006, H-012, H-020 |

Wait — that's 8+1+10+3 = 22. But I listed 8 for comportamento. Let me recount: H-001, H-007, H-009, H-010, H-013, H-014, H-015, H-019 = 8. But I wrote 7. Let me fix:

| Classificação | Quantidade | IDs |
|---|---|---|
| comportamento | 8 | H-001, H-007, H-009, H-010, H-013, H-014, H-015, H-019 |
| motor | 1 | H-017 |
| experiência | 10 | H-002, H-003, H-004, H-005, H-008, H-011, H-016, H-018, H-021, H-022 |
| adoção | 3 | H-006, H-012, H-020 |

### Total por Prioridade

| Prioridade | Quantidade | IDs |
|---|---|---|
| Alta | 8 | H-001, H-002, H-004, H-005, H-007, H-008, H-013, H-018 |
| Média | 10 | H-003, H-006, H-009, H-010, H-011, H-012, H-015, H-016, H-019, H-020 |
| Baixa | 4 | H-014, H-017, H-021, H-022 |

### Total por Risco de Estar Errada

| Risco | Quantidade | IDs |
|---|---|---|
| Alto | 5 | H-001, H-004, H-007, H-017, H-022 |
| Médio | 12 | H-002, H-005, H-006, H-009, H-010, H-012, H-013, H-016, H-019, H-021 |
| Baixo | 5 | H-003, H-008, H-011, H-015, H-018, H-020 |

### Total por Tempo Estimado de Validação

| Tempo | Quantidade |
|---|---|
| 1-2 semanas | 4 (H-008, H-018) |
| 2-3 semanas | 10 |
| 3-4 semanas | 3 |
| 4-6 semanas | 4 |
| 6-8 semanas | 1 |

---

*Documento revisado em 26/07/2026 como parte do Programa 25.*
*22 hipóteses revisadas. 5 prioritárias para Empresa Zero. 8 de alta prioridade.*
