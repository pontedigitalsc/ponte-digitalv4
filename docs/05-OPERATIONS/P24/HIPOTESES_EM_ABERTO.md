# Hipóteses em Aberto

## Propósito

Catalogar todas as hipóteses não validadas sobre a Ponte Digital. Este documento é vivo — deve ser atualizado à medida que hipóteses são confirmadas, refutadas ou refinadas.

---

## Hipótese H-001

| Campo | Valor |
|---|---|
| Hipótese | Empresários sentem mais confiança na IA quando ela admite incerteza do que quando parece sempre certa |
| Origem | P23 - Sistema de Confiança Visual |
| Classificação | comportamento do empresário |
| O que confirma | Empresários que veem a IA dizer "não tenho certeza" compartilham mais dados e continuam a conversa |
| O que refuta | Empresários abandonam a conversa quando a IA demonstra incerteza |
| Experimento sugerido | Versão A: IA sempre confiante. Versão B: IA admite incerteza. Medir taxa de conclusão e dados compartilhados |
| Como medir | Taxa de conclusão, profundidade das respostas, retorno em 7 dias |
| Prioridade | Alta |
| Risco de estar errada | Alto |
| Impacto se errada | Remover transparência de confiança e adotar tom sempre confiante. Perde diferencial de honestidade |

## Hipótese H-002

| Campo | Valor |
|---|---|
| Hipótese | O Mapa Cognitivo Vivo aumenta a percepção de inteligência e engajamento |
| Origem | P23 - Mapas Cognitivo Vivo |
| Classificação | experiência |
| O que confirma | Empresários que veem o mapa crescer têm maior taxa de conclusão e retorno |
| O que refuta | Empresários ignoram o mapa ou se sentem sobrecarregados |
| Experimento sugerido | Versão A: com mapa. Versão B: sem mapa (apenas conversa). Medir NPS e retorno |
| Como medir | Taxa de conclusão, NPS, retorno em 7 dias, eye tracking (para onde olham) |
| Prioridade | Alta |
| Risco de estar errada | Médio |
| Impacto se errada | Simplificar interface removendo painel lateral. Economia de desenvolvimento |

## Hipótese H-003

| Campo | Valor |
|---|---|
| Hipótese | 5 perguntas é o número ideal antes do primeiro resumo parcial |
| Origem | P23 - Experiência Cognitiva |
| Classificação | experiência |
| O que confirma | Empresários não se sentem perdidos nem entediados com resumo a cada 5 perguntas |
| O que refuta | Empresários acham muito frequente ou pouco frequente |
| Experimento sugerido | Testar 3, 5, 7 e 10 perguntas. Medir sensação de progresso e clareza |
| Como medir | Pergunta pós-teste: "Você sentiu que sabia o que a IA já tinha descoberto?" |
| Prioridade | Média |
| Risco de estar errada | Baixo |
| Impacto se errada | Ajustar número ideal. Mudança de configuração, não de arquitetura |

## Hipótese H-004

| Campo | Valor |
|---|---|
| Hipótese | Timing de resposta proporcional à complexidade aumenta percepção de inteligência |
| Origem | P23 - Microinterações |
| Classificação | experiência |
| O que confirma | Respostas imediatas para perguntas complexas parecem "decoradas" e reduzem confiança |
| O que refuta | Empresários preferem respostas rápidas independentemente da complexidade |
| Experimento sugerido | Versão A: timing variável. Versão B: sempre rápido. Medir percepção de inteligência |
| Como medir | Pergunta pós-teste: "A IA pareceu pensar antes de responder?" |
| Prioridade | Alta |
| Risco de estar errada | Alto |
| Impacto se errada | Simplificar para respostas sempre rápidas. Remove complexidade de implementação |

## Hipótese H-005

| Campo | Valor |
|---|---|
| Hipótese | Loading inteligente (com texto do processo) reduz abandono durante espera |
| Origem | P23 - Loading Inteligente |
| Classificação | experiência |
| O que confirma | Empresários esperam mais tempo quando sabem o que está sendo processado |
| O que refuta | Texto do processo não faz diferença vs spinner genérico |
| Experimento sugerido | Versão A: loading inteligente com fases. Versão B: spinner genérico. Medir abandono em esperas > 5s |
| Como medir | Taxa de abandono durante espera, tempo médio de espera tolerado |
| Prioridade | Alta |
| Risco de estar errada | Médio |
| Impacto se errada | Manter spinner genérico. Economia significativa de desenvolvimento |

## Hipótese H-006

| Campo | Valor |
|---|---|
| Hipótese | Empresários retornam mais quando recebem notificação de novo insight |
| Origem | P23 - Relatório Final |
| Classificação | adoção |
| O que confirma | Notificação push de novo insight aumenta retorno em 7 dias em > 30% |
| O que refuta | Notificação é ignorada ou considerada spam |
| Experimento sugerido | Grupo A: notificação de insight. Grupo B: sem notificação. Medir retorno em 7/14/30 dias |
| Como medir | Taxa de retorno, tempo até retorno, taxa de abertura de notificação |
| Prioridade | Média |
| Risco de estar errada | Médio |
| Impacto se errada | Remover notificações ou repensar estratégia de engajamento |

## Hipótese H-007

| Campo | Valor |
|---|---|
| Hipótese | Empresários preferem digitar respostas a selecionar opções em múltipla escolha |
| Origem | P23 - Experiência Cognitiva |
| Classificação | comportamento do empresário |
| O que confirma | Respostas abertas geram mais dados relevantes que respostas fechadas |
| O que refuta | Empresários preferem rapidez das opções pré-definidas |
| Experimento sugerido | Versão A: apenas texto livre. Versão B: múltipla escolha + opção "outro". Medir qualidade dos dados |
| Como medir | Profundidade média das respostas, taxa de correção necessária, dados úteis extraídos |
| Prioridade | Alta |
| Risco de estar errada | Alto |
| Impacto se errada | Adotar múltipla escolha como padrão. Simplifica Motor Cognitivo (entrada estruturada) |

## Hipótese H-008

| Campo | Valor |
|---|---|
| Hipótese | A primeira pergunta define o tom de toda a conversa |
| Origem | P23 - Psicologia da Primeira Impressão |
| Classificação | experiência |
| O que confirma | Perguntas iniciais fáceis e relevantes levam a conversas mais longas e profundas |
| O que refuta | A primeira pergunta não impacta significativamente o restante da conversa |
| Experimento sugerido | Testar 3 primeiras perguntas diferentes (fácil/médio/difícil). Medir profundidade e duração |
| Como medir | Número total de trocas, profundidade máxima, taxa de abandono precoce |
| Prioridade | Alta |
| Risco de estar errada | Baixo |
| Impacto se errada | Ajustar estratégia de primeira pergunta |

## Hipótese H-009

| Campo | Valor |
|---|---|
| Hipótese | A IA deve falar menos que o empresário (proporção 40:60) |
| Origem | P23 - Identidade da Inteligência |
| Classificação | comportamento do empresário |
| O que confirma | Conversas com mais fala do empresário geram insights mais precisos |
| O que refuta | Empresários se sentem "interrogados" e preferem IA mais prolixa |
| Experimento sugerido | Versão A: IA concisa (40%). Versão B: IA explicativa (60%). Medir qualidade do diagnóstico |
| Como medir | Proporção de fala real, profundidade das respostas, NPS |
| Prioridade | Média |
| Risco de estar errada | Médio |
| Impacto se errada | Redefinir tom da IA. Significativo retrabalho de conteúdo |

## Hipótese H-010

| Campo | Valor |
|---|---|
| Hipótese | Empresários confiam mais em insights com dados percentuais do que qualitativos |
| Origem | P23 - Sistema de Valor |
| Classificação | comportamento do empresário |
| O que confirma | "85% dos clientes estão em 2 segmentos" gera mais confiança que "Seus clientes estão concentrados" |
| O que refuta | Percentuais intimidam ou confundem empresários não analíticos |
| Experimento sugerido | Versão A: insight com dados. Versão B: insight qualitativo. Medir confiança percebida |
| Como medir | Pergunta pós-teste: "Você confia neste insight?" (escala 1-5) |
| Prioridade | Média |
| Risco de estar errada | Médio |
| Impacto se errada | Priorizar formato qualitativo. Motor Cognitivo precisa de menos precisão |

## Hipótese H-011

| Campo | Valor |
|---|---|
| Hipótese | A gamificação cognitiva (indicadores de progresso) aumenta engajamento |
| Origem | P23 - Gamificação Cognitiva |
| Classificação | experiência |
| O que confirma | Empresários completam mais perguntas quando veem indicadores de progresso |
| O que refuta | Indicadores distraem ou pressionam o empresário |
| Experimento sugerido | Versão A: com indicadores. Versão B: sem indicadores. Medir conclusão |
| Como medir | Taxa de conclusão, tempo médio de sessão |
| Prioridade | Média |
| Risco de estar errada | Baixo |
| Impacto se errada | Remover indicadores. Simplifica interface |

## Hipótese H-012

| Campo | Valor |
|---|---|
| Hipótese | Empresários que veem os insights em tempo real retornam mais |
| Origem | P23 - Sistema de Insights |
| Classificação | adoção |
| O que confirma | Ver insight aparecer durante conversa gera vontade de ver o diagnóstico completo |
| O que refuta | Insight em tempo real não impacta retorno |
| Experimento sugerido | Versão A: insight aparece durante. Versão B: insight apenas no resumo final |
| Como medir | Taxa de conclusão, retorno em 7 dias |
| Prioridade | Média |
| Risco de estar errada | Médio |
| Impacto se errada | Postergar insights para o resumo final. Simplifica Motor Cognitivo |

## Hipótese H-013

| Campo | Valor |
|---|---|
| Hipótese | Empresários se sentem mais confortáveis compartilhando dados sensíveis após verem valor |
| Origem | P23 - Psicologia da Primeira Impressão |
| Classificação | comportamento do empresário |
| O que confirma | Empresários compartilham dados financeiros após receberem um insight valioso |
| O que refuta | Empresários compartilham independentemente de verem valor primeiro |
| Experimento sugerido | Analisar correlação entre momento do primeiro insight e profundidade dos dados compartilhados |
| Como medir | Momento do primeiro insight vs profundidade das respostas subsequentes |
| Prioridade | Alta |
| Risco de estar errada | Médio |
| Impacto se errada | Reordenar perguntas para gerar valor mais cedo |

## Hipótese H-014

| Campo | Valor |
|---|---|
| Hipótese | Tom formal no início seguido de tom mais informal gera mais engajamento |
| Origem | P23 - Identidade da Inteligência |
| Classificação | comportamento do empresário |
| O que confirma | Empresários respondem melhor quando a IA "relaxa" após estabelecer credibilidade |
| O que refuta | Mudança de tom é percebida como inconsistente |
| Experimento sugerido | Versão A: tom formal → informal gradual. Versão B: tom constante. Medir NPS |
| Como medir | NPS, taxa de conclusão, feedback qualitativo |
| Prioridade | Baixa |
| Risco de estar errada | Baixo |
| Impacto se errada | Manter tom constante. Simplifica conteúdo |

## Hipótese H-015

| Campo | Valor |
|---|---|
| Hipótese | Empresários preferem diagnóstico em 3 tópicos principais (não mais que 5) |
| Origem | P23 - Relatório Final |
| Classificação | comportamento do empresário |
| O que confirma | Resumo com 3 tópicos é mais lembrado e mais acionado que listas longas |
| O que refuta | Empresários querem ver todos os detalhes |
| Experimento sugerido | Versão A: 3 tópicos. Versão B: 7 tópicos. Medir recall e ação após 7 dias |
| Como medir | Número de tópicos lembrados após 7 dias, ações tomadas |
| Prioridade | Média |
| Risco de estar errada | Baixo |
| Impacto se errada | Ajustar número de tópicos no resumo |

## Hipótese H-016

| Campo | Valor |
|---|---|
| Hipótese | O indicador de confiança deve ser sempre visível (não colapsável) |
| Origem | P23 - Sistema de Confiança Visual |
| Classificação | experiência |
| O que confirma | Empresários olham para o indicador de confiança e ajustam comportamento baseado nele |
| O que refuta | Indicador distrai ou não é notado |
| Experimento sugerido | Eye tracking para ver se empresários olham para o indicador |
| Como medir | Eye tracking (quantas vezes olham, tempo de fixação) |
| Prioridade | Média |
| Risco de estar errada | Médio |
| Impacto se errada | Tornar indicador colapsável |

## Hipótese H-017

| Campo | Valor |
|---|---|
| Hipótese | Empresários com perfil "analítico" e "intuitivo" precisam de experiências diferentes |
| Origem | P23 - Psicologia da Primeira Impressão |
| Classificação | comportamento do empresário |
| O que confirma | Perfis diferentes respondem melhor a abordagens diferentes (dados vs histórias) |
| O que refuta | Abordagem única funciona para todos |
| Experimento sugerido | Detectar perfil nas primeiras 3 respostas e adaptar tom. Medir engajamento |
| Como medir | Engajamento por perfil, NPS segmentado |
| Prioridade | Baixa |
| Risco de estar errada | Alto |
| Impacto se errada | Manter abordagem única. Evita complexidade de personalização |

## Hipótese H-018

| Campo | Valor |
|---|---|
| Hipótese | O botão "Continuar agora" durante espera longa reduz abandono |
| Origem | P23 - A Espera Inteligente |
| Classificação | experiência |
| O que confirma | Empresários que podem escolher entre esperar e continuar abandonam menos |
| O que refuta | Empresários preferem esperar a análise completa |
| Experimento sugerido | Versão A: com botão. Versão B: sem botão. Medir abandono |
| Como medir | Taxa de abandono, escolha (continuar vs esperar) |
| Prioridade | Alta |
| Risco de estar errada | Baixo |
| Impacto se errada | Remover botão. Simplifica fluxo |

## Hipótese H-019

| Campo | Valor |
|---|---|
| Hipótese | Silêncio da IA durante reflexão do empresário é produtivo (não desconfortável) |
| Origem | P23 - Experiência Cognitiva |
| Classificação | comportamento do empresário |
| O que confirma | Empresários que têm pausas para pensar dão respostas mais profundas |
| O que refuta | Empresários se sentem abandonados durante o silêncio |
| Experimento sugerido | Versão A: IA espera em silêncio. Versão B: IA faz pequenos comentários ("Estou aqui"). Medir profundidade |
| Como medir | Profundidade das respostas, feedback pós-teste |
| Prioridade | Média |
| Risco de estar errada | Médio |
| Impacto se errada | Adicionar comentários periódicos durante silêncio |

## Hipótese H-020

| Campo | Valor |
|---|---|
| Hipótese | Empresários que completam o diagnóstico têm 3x mais chance de retornar |
| Origem | P23 - Relatório Final |
| Classificação | adoção |
| O que confirma | Empresários que veem o diagnóstico completo retornam mais que os que abandonam |
| O que refuta | Taxa de retorno não difere significativamente |
| Experimento sugerido | Correlacionar conclusão do diagnóstico com retorno em 7/14/30 dias |
| Como medir | Retorno em 7, 14 e 30 dias segmentado por conclusão |
| Prioridade | Média |
| Risco de estar errada | Baixo |
| Impacto se errada | Focar em engajamento pós-diagnóstico |

## Hipótese H-021

| Campo | Valor |
|---|---|
| Hipótese | Microcelebrações a cada insight aumentam engajamento na sessão |
| Origem | P23 - Microinterações |
| Classificação | experiência |
| O que confirma | Empresários reagem positivamente a pequenas celebrações visuais a cada descoberta |
| O que refuta | Celebrações parecem artificiais ou forçadas |
| Experimento sugerido | Versão A: com microcelebração. Versão B: sem. Medir NPS e tempo de sessão |
| Como medir | NPS, tempo de sessão, expressões faciais |
| Prioridade | Baixa |
| Risco de estar errada | Médio |
| Impacto se errada | Remover microcelebrações |

## Hipótese H-022

| Campo | Valor |
|---|---|
| Hipótese | A Ponte Digital deve ter som para ser percebida como inteligência viva |
| Origem | P23 - Experiência Sensorial |
| Classificação | experiência |
| O que confirma | Empresários que ouvem sons de insight/descoberta reportam maior sensação de "sistema vivo" |
| O que refuta | Sons são ignorados ou considerados irritantes |
| Experimento sugerido | Versão A: com som sutil. Versão B: sem som. Medir percepção de "inteligência viva" |
| Como medir | Pergunta pós-teste: "A Ponte pareceu um sistema vivo ou uma ferramenta?" |
| Prioridade | Baixa |
| Risco de estar errada | Alto |
| Impacto se errada | Remover som. Evita risco de irritar usuários |

---

## Resumo

| Métrica | Valor |
|---|---|
| Total de hipóteses | 22 |
| Comportamento do empresário | 6 |
| Experiência | 12 |
| Adoção | 3 |
| Prioridade Alta | 8 |
| Prioridade Média | 10 |
| Prioridade Baixa | 4 |
| Alto risco de estar errada | 5 |
| A validação pode começar | Imediatamente com a Empresa Zero |

## Próximos Passos

1. Iniciar validação das hipóteses de prioridade ALTA durante a Empresa Zero
2. Cada hipótese confirmada vira conhecimento (SABEMOS)
3. Cada hipótese refutada vira aprendizado documentado
4. Hipóteses não validadas em 6 meses são reavaliadas
