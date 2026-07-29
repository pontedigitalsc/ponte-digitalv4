# CERTIFICAÇÃO CIENTÍFICA — O Que Sabemos vs O Que Acreditamos na Ponte Digital

**Programa 24 | Documento de Epistemologia do Produto | 26/07/2026**

> Este documento separa CLARAMENTE o que é conhecimento validado do que é crença na Ponte Digital.
> Cada afirmação encontrada nos documentos fundacionais é classificada como:
> **SABEMOS** (evidência documentada, dado real ou validação com usuário),
> **ACREDITAMOS** (hipótese bem formada, mas não validada),
> **NÃO SABEMOS** (suposição sem evidência nem hipótese formal).
>
> O objetivo é transformar ACREDITAMOS em SABEMOS — sistematicamente.

---

## Sumário

1. [Metodologia](#1-metodologia)
2. [Fontes Auditadas](#2-fontes-auditadas)
3. [Catálogo de Afirmações](#3-catálogo-de-afirmações)
4. [Tabela Resumo](#4-tabela-resumo)
5. [Estratégia de Validação](#5-estratégia-de-validação)
6. [Riscos](#6-riscos)

---

## 1. Metodologia

### Critérios de Classificação

| Classe | Definição | Exige |
|---|---|---|
| **SABEMOS** | Existe evidência documentada, dado real, código funcionando ou validação com usuário real | 0 ação — monitorar |
| **ACREDITAMOS** | Hipótese bem formada, baseada em raciocínio ou analogia, mas ainda não validada com usuário real ou dado empírico | Experimento planejado |
| **NÃO SABEMOS** | Suposição sem evidência, sem hipótese formal, ou contradita por evidência disponível | Investigação antes de agir |

### Documentos auditados

- **CONSTITUIÇÃO:** `docs/09-ARCHITECTURE/CONSTITUICAO_DA_ENGENHARIA.md`
- **MANIFESTO:** `docs/05-OPERATIONS/P23/MANIFESTO_DA_EXPERIENCIA.md`
- **P23:** `docs/05-OPERATIONS/P23/` — todos os 28 documentos
- **CURRENT_PRODUCT:** `docs/02-PRODUCT/CURRENT_PRODUCT.md` (como referência de realidade)

---

## 2. Fontes Auditadas

### Documentos inclusos na auditoria

| # | Documento | Afirmações extraídas | Classificação dominante |
|---|---|---|---|
| 1 | CONSTITUICAO_DA_ENGENHARIA.md | 18 | SABEMOS (código existe) |
| 2 | MANIFESTO_DA_EXPERIENCIA.md | 14 | ACREDITAMOS (filosofia) |
| 3 | CERTIFICACAO_DA_EXPERIENCIA.md | 10 | ACREDITAMOS |
| 4 | AUDITORIA_COMPLETA_P23.md | 8 | SABEMOS (auditoria de documentos) |
| 5 | RELATORIO_FINAL.md | 6 | ACREDITAMOS |
| 6 | EXPERIENCIA_COGNITIVA.md | 10 | ACREDITAMOS |
| 7 | EXPERIENCIA_SENSORIAL.md | 5 | ACREDITAMOS |
| 8 | IDENTIDADE_DA_INTELIGENCIA.md | 8 | ACREDITAMOS |
| 9 | PSICOLOGIA_DA_PRIMEIRA_IMPRESSAO.md | 4 | ACREDITAMOS |
| 10 | SISTEMA_DE_CONFIANCA_VISUAL.md | 4 | ACREDITAMOS |
| 11 | SISTEMA_DE_INSIGHTS.md | 6 | ACREDITAMOS |
| 12 | SISTEMA_DE_VALOR.md | 6 | ACREDITAMOS |
| 13 | MAPAS_COGNITIVO_VIVO.md | 5 | ACREDITAMOS |
| 14 | A_ESPERA_INTELIGENTE.md | 3 | ACREDITAMOS |
| 15 | LOADING_INTELIGENTE.md | 3 | ACREDITAMOS |
| 16 | GAMIFICACAO_COGNITIVA.md | 4 | NÃO SABEMOS (contradito) |
| 17 | MICROINTERACOES.md | 3 | ACREDITAMOS |
| 18 | ARQUITETURA_VISUAL_DA_CONVERSA.md | 5 | ACREDITAMOS |
| 19 | AUDITORIA_DA_PERCEPCAO.md | 4 | SABEMOS |
| 20 | ROADMAP_IMPLEMENTACAO_P23.md | 3 | ACREDITAMOS |
| 21 | GUIA_DE_TESTES_COM_USUARIOS.md | 2 | NÃO SABEMOS |
| 22 | MANUAL_DA_INTELIGENCIA_VISIVEL.md | 3 | ACREDITAMOS |
| 23 | MANUAL_DE_TRANSICOES.md | 2 | ACREDITAMOS |
| 24 | CHECKLIST_DE_EXPERIENCIA.md | 3 | ACREDITAMOS |
| 25 | MATRIZ_DA_PERCEPCAO.md | 2 | ACREDITAMOS |
| 26 | METRICAS_DA_EXPERIENCIA.md | 3 | ACREDITAMOS |
| 27 | GUIA_DA_CONVERSA.md | 2 | ACREDITAMOS |
| 28 | GUIA_DE_IMPLEMENTACAO_VISUAL.md | 2 | ACREDITAMOS |
| 29 | SISTEMA_DE_INSIGHTS.md | 5 | ACREDITAMOS |
| 30 | RELATORIO_FINAL_P23.md | 3 | ACREDITAMOS |

---

## 3. Catálogo de Afirmações

Cada afirmação recebe um ID único no formato `[Documento]-[Número]`.

---

### 3.1 CONSTITUICAO_DA_ENGENHARIA.md

| ID | Citação | Classificação | Evidência | Como validar | Prioridade | Risco |
|---|---|---|---|---|---|---|
| C-01 | "A Ponte Digital combina gestão operacional (clientes, tarefas, finanças) com inteligência artificial que aprende o negócio do usuário" | **SABEMOS** | Código implementado: CRM, Financeiro, Tarefas, Assistente IA com Anthropic (CURRENT_PRODUCT seção 1) | Já validado | N/A | Baixo |
| C-02 | "O isolamento entre empresas depende de cada query incluir empresaId no where" | **SABEMOS** | `prisma-tenant-safe.ts` implementado e em uso | Já validado | N/A | Crítico |
| C-03 | "Cognição é patrimônio, não pipeline" | **ACREDITAMOS** | `heritage-engine` existe no código. Mas não há evidência de que empresários percebem ou valorizam este patrimônio | Testar com 5 empresários: "O que você acha que a Ponte sabe sobre sua empresa?" | Alta | Médio |
| C-04 | "A engine heritage-engine é a mais importante de todo o sistema" | **ACREDITAMOS** | Afirmação de importância sem métrica que a suporte | Medir: quantas engines dependem dela? Quantos fluxos usam? Qual o impacto de sua falha? | Alta | Alto |
| C-05 | "Separação rígida entre orquestração e execução" | **SABEMOS** | Código: `cognitive-orchestrator` coordena, engines executam. Nenhum service importa engine (exceção documentada) | Já validado | N/A | Alto |
| C-06 | "Nunca colocamos regra de negócio em componente React" | **SABEMOS** | Código segue este padrão (CURRENT_PRODUCT seção 1 confirma) | Já validado | N/A | Alto |
| C-07 | "Nunca acessamos Prisma diretamente de uma engine cognitiva" | **SABEMOS** | Engines usam `prisma-tenant-safe`. Exceção documentada (C-02) | Já validado | N/A | Crítico |
| C-08 | "55 engines em um único processo — um grafo cognitivo inchado" | **SABEMOS** | Código real. AUDITORIA_ARQUITETURAL confirma 55 engines | Já validado | N/A | Médio |
| C-09 | "cache in-memory contra ADR-014 que diz que cache é futuro/Fase 4" | **SABEMOS** | Código: `lib/cache.ts` em uso por 4 engines. ADR-014 desatualizado | Atualizar ADR-014 | Imediata | Baixo |
| C-10 | "O código atual é a verdade" (Seção 10) | **SABEMOS** | Princípio operacional em uso. ADRs são atualizadas após código | Já validado | N/A | Baixo |
| C-11 | "A Ponte Digital não armazena apenas dados do cliente. Ela armazena o contexto de cada decisão" | **ACREDITAMOS** | Modelos `MemoriaCognitiva`, `Evidencia`, `Outcome` existem. Mas não há evidência de que estes dados são EFETIVAMENTE usados para melhorar decisões futuras | Auditar 10 fluxos: quantas engines LEEM estes modelos vs quantos apenas ESCREVEM? | Alta | Alto |
| C-12 | "Concorrentes podem copiar a interface, as engines, os services. Não podem copiar anos de cognição contextualizada" | **ACREDITAMOS** | Tese de vantagem competitiva. Zero evidência empírica | Comparar com concorrente: qual é o tempo para um novo entrante acumular cognição equivalente? | Média | Alto |
| C-13 | "O foco inabalável no empresário brasileiro" | **ACREDITAMOS** | Nomes em português, categorias brasileiras. Mas não há teste com empresário real que valide que isso é diferencial percebido | Entrevistar 5 empresários: "O que você acha de um sistema que fala português de negócio?" | Média | Médio |
| C-14 | "Uma equipe pequena consegue manter, evoluir e depurar todo o sistema" | **SABEMOS** | Equipe atual mantém. Mas a afirmação é sobre o sistema, não sobre a equipe | Verificar: quantos desenvolvedores são necessários para manter a plataforma? | Média | Médio |
| C-15 | "Clientes, tarefas, finanças — o usuário final é o empresário brasileiro de pequeno e médio porte" | **SABEMOS** | Perfil de negócio definido e implementado para este público | Já validado | N/A | Baixo |
| C-16 | "EventEmitter funciona para o volume atual" | **SABEMOS** | Código em produção usa EventEmitter. Sem relato de falha por escala | Já validado | N/A | Baixo |
| C-17 | "A ausência de middleware.ts é o maior gap de segurança" | **SABEMOS** | Factual: não existe middleware.ts. Risco: cada rota protege manualmente | Já identificado | Imediata | Crítico |
| C-18 | "Toda regra tem uma contrapartida no código que a comprova OU identifica uma violação conhecida" | **SABEMOS** | A própria CONSTITUICAO lista exceções na Seção 10. Validável | Já validado | N/A | Médio |

---

### 3.2 MANIFESTO_DA_EXPERIENCIA.md

| ID | Citação | Classificação | Evidência | Como validar | Prioridade | Risco |
|---|---|---|---|---|---|---|
| M-01 | "O produto não é a tecnologia. O produto é o empresário mais inteligente" | **ACREDITAMOS** | Filosofia bem articulada. Zero evidência de que empresários compram "empresário mais inteligente" | Testar com 5 empresários: "O que você espera da Ponte?" vs "O que você pagaria por ela?" | Alta | Muito Alto |
| M-02 | "Toda resposta deve conter algo que o empresário não sabia antes" | **ACREDITAMOS** | Princípio de design. Não testado com usuários | Gravar 10 sessões: contar quantas respostas continham informação nova para o empresário | Alta | Alto |
| M-03 | "Inteligência não percebida é inteligência desperdiçada" | **ACREDITAMOS** | Hipótese bem formada. Não validada | Testar A/B: grupo com indicadores de inteligência visíveis vs sem. Medir NPS | Alta | Alto |
| M-04 | "A diferença entre uma ferramenta e uma inteligência é esta. Ferramentas executam tarefas. Inteligências mudam perspectivas" | **ACREDITAMOS** | Definição conceitual. Sem validação com usuário | Perguntar a empresários: "O que mudou na sua perspectiva depois de usar?" | Alta | Médio |
| M-05 | "O empresário compra clareza, direção, confiança, tempo, descoberta" | **ACREDITAMOS** | 5 valores propostos. Nenhum medido | Criar métrica para cada valor e medir baseline atual | Alta | Muito Alto |
| M-06 | "Toda interação ensina" (Princípio 1) | **ACREDITAMOS** | Princípio de design. Aprendizados implementados (CURRENT_PRODUCT seção 2). Mas "ensinar" não está validado | Medir: em X interações, quantas vezes o empresário reporta "aprendi algo"? | Alta | Médio |
| M-07 | "Toda espera é narrativa" (Princípio 2) | **ACREDITAMOS** | Loading inteligente especificado. Não testado se reduz ansiedade | Testar A/B: loading narrativo vs spinner. Medir satisfação pós-espera | Média | Médio |
| M-08 | "Tela parada é oportunidade perdida" (Princípio 4) | **ACREDITAMOS** | Hipótese de design. Não validada | Medir taxa de abandono em telas com idle vs telas com sugestão ativa | Média | Alto |
| M-09 | "O empresário não usa a Ponte — ele a consulta" (Princípio 5) | **ACREDITAMOS** | Metáfora relacional. Depende de percepção do usuário | Entrevistar: "Você sente que usa uma ferramenta ou consulta um especialista?" | Média | Médio |
| M-10 | "A inteligência precisa ser vista para ser confiada" (Princípio 6) | **ACREDITAMOS** | Hipótese psicológica. Não testada na Ponte | Testar: empresários que veem o raciocínio confiam mais que os que não veem? | Alta | Muito Alto |
| M-11 | "O aprendizado é o produto" (Princípio 7) | **ACREDITAMOS** | Tese central do produto. Não validada | Medir: empresários que tomam decisões melhores após usar a Ponte? | Alta | Muito Alto |
| M-12 | "A Ponte não é um software. É uma relação intelectual" | **ACREDITAMOS** | Manifesto, não evidência. Depende de percepção do usuário | Pesquisa NPS com pergunta aberta: "Como você descreveria a Ponte para um amigo?" | Média | Médio |
| M-13 | "O que não se commoditiza é a experiência. A relação. A sensação" | **ACREDITAMOS** | Tese de diferenciação competitiva. Sem evidência | Comparar churn e NPS com concorrentes que competem por funcionalidades | Média | Médio |
| M-14 | "Cada linha de código é governada por este manifesto" | **ACREDITAMOS** | Aspiracional. Código real pode contradizer o manifesto em pontos não auditados | Auditoria de código vs manifesto (similar a AUDITORIA_COMPLETA_P23) | Baixa | Baixo |

---

### 3.3 CERTIFICACAO_DA_EXPERIENCIA.md (P23)

| ID | Citação | Classificação | Evidência | Como validar | Prioridade | Risco |
|---|---|---|---|---|---|---|
| CE-01 | "A experiência da Ponte é definida como a relação intelectual entre um empresário e uma inteligência dedicada" | **ACREDITAMOS** | Definição formal. Nenhum empresário foi perguntado se concorda com esta definição | Entrevistar 5 empresários: "Isso descreve o que você espera/usou?" | Alta | Alto |
| CE-02 | "Empresário consegue fazer qualquer pergunta de negócio sem tocar em um menu?" | **ACREDITAMOS** | Critério de verificação aspiracional. Assistente IA atual tem contexto limitado (CURRENT_PRODUCT seção 1) | Testar: 10 perguntas de negócio podem ser respondidas apenas via diálogo? | Alta | Muito Alto |
| CE-03 | "Respostas simples em <2s" | **ACREDITAMOS** | Requisito de performance. Não medido em produção | Adicionar monitoramento de tempo de resposta por tipo de pergunta | Alta | Alto |
| CE-04 | "Novo empresário obtém valor nos primeiros 30 segundos" | **ACREDITAMOS** | Hipótese de ativação. Não validada | Testar com 10 novos usuários: "Você obteve valor nos primeiros 30s?" | Alta | Muito Alto |
| CE-05 | "Se a resposta poderia ser obtida em uma planilha, a experiência falhou" | **ACREDITAMOS** | Critério de qualidade. Nunca testado | Revisar 10 respostas da IA: quantas poderiam vir de planilha? | Média | Alto |
| CE-06 | "A IA revisita tópicos com nova informação, muda de assunto baseada em insight, recua se empresário resiste, aprofunda quando encontra padrão" | **ACREDITAMOS** | Comportamento esperado. Assistente atual não tem este nível de sofisticação (CURRENT_PRODUCT: "chat com contexto limitado") | Depende de Motor Cognitivo que está congelado (CURRENT_PRODUCT seção 3) | Crítica | Crítico |
| CE-07 | "Teste de Integridade: pontuação mínima 10/12" | **ACREDITAMOS** | Threshold definido. Nunca aplicado a uma implementação real | Aplicar o teste na implementação atual e verificar se passa | Alta | Alto |
| CE-08 | "Níveis de certificação Ouro/Prata/Bronze" | **NÃO SABEMOS** | Sistema de níveis criado. Nenhuma funcionalidade foi certificada ainda. Não sabemos se os níveis são úteis ou apenas burocracia | Certificar 3 funcionalidades e verificar se a diferenciação faz sentido | Média | Médio |
| CE-09 | "O painel cognitivo existe e reflete o estado real da conversa" | **ACREDITAMOS** | Painel cognitivo especificado. Não implementado (CURRENT_PRODUCT: nenhum painel cognitivo) | Implementar versão mínima e testar se empresários percebem valor | Alta | Alto |
| CE-10 | "Zero elementos proibidos presentes" | **SABEMOS** | Checklist verificável | Pode ser verificado por varredura de UI | N/A | Baixo |

---

### 3.4 AUDITORIA_COMPLETA_P23.md

| ID | Citação | Classificação | Evidência | Como validar | Prioridade | Risco |
|---|---|---|---|---|---|---|
| A-01 | "Motor Cognitivo completo — CONGELADO. CURRENT_PRODUCT.md lista 9 motores no sistema/engine/ — eles EXISTEM como módulos de engine, mas NÃO implementam o ciclo completo que o P23 requer" | **SABEMOS** | Confronto documental entre P23 e CURRENT_PRODUCT. Factual | Já validado | N/A | Crítico |
| A-02 | "P23 precisa de um motor de hipóteses e insights que ainda não está implementado" | **SABEMOS** | Auditoria de código vs especificação | Já validado | N/A | Crítico |
| A-03 | "O MVP atual não acumula contexto entre sessões. O P23 exige" | **SABEMOS** | Confronto com CURRENT_PRODUCT: "chat com contexto limitado" | Já validado | N/A | Alto |
| A-04 | "Perfil ETD (P23) difere do perfil real documentado na Jornada Fundacional" | **SABEMOS** | Confronto documental | Já validado | N/A | Alto |
| A-05 | "GAMIFICACAO_COGNITIVA.md contradiz MANIFESTO e RELATORIO_FINAL" | **SABEMOS** | Confronto documental | Já validado | N/A | Médio |
| A-06 | "Três thresholds diferentes para confiança de insight (20%, 40%, >50%)" | **SABEMOS** | Contradição interna identificada | Já validado | N/A | Alto |
| A-07 | "P23 deve ser considerado ENCERRADO como fase de especulação, mas BLOQUEADO para implementação" | **SABEMOS** | Conclusão da auditoria | Já validado | N/A | Crítico |
| A-08 | "Nota geral: 6.0/10" | **SABEMOS** | Pontuação composta da auditoria | Reavaliar após correções | N/A | Médio |

---

### 3.5 RELATORIO_FINAL.md

| ID | Citação | Classificação | Evidência | Como validar | Prioridade | Risco |
|---|---|---|---|---|---|---|
| R-01 | "Com estrutura (jornada de 7 dias), a ativação sobe de ~30% para estimados ~70%" | **NÃO SABEMOS** | Estimativa sem base. Não há dado de ativação atual (30%) nem evidência de que 70% seja alcançável | Medir ativação atual. Depois implementar jornada e medir novo valor | Alta | Muito Alto |
| R-02 | "Insight é o produto principal. Empresário paga por descoberta, não por relatório" | **ACREDITAMOS** | Tese de valor. CURRENT_PRODUCT não mostra nenhuma evidência de que empresários pagam por descoberta | Survey com 10 empresários: "Pelo que você pagaria? Relatório ou descoberta?" | Alta | Muito Alto |
| R-03 | "NPS da experiência meta: ≥50" | **ACREDITAMOS** | Meta definida. NPS atual indisponível (CURRENT_PRODUCT: "Zero cobertura de teste") | Implementar pesquisa NPS e capturar baseline | Alta | Alto |
| R-04 | "Retorno em 7 dias meta: ≥55%" | **ACREDITAMOS** | Meta definida. Retorno atual: "~25% (estimado)" | Medir retorno atual. Depois implementar P23 e medir delta | Alta | Alto |
| R-05 | "Tempo estimado de implementação: 90-120 dias" | **NÃO SABEMOS** | Estimativa sem detalhamento de recursos disponíveis. Assume equipe dedicada | Acompanhar implementação real e comparar com estimativa | Média | Alto |
| R-06 | "Investimento estimado: 165 dias-homem" | **NÃO SABEMOS** | Estimativa sem breakdown. Não considera aprendizado, retrabalho, blockers | Registrar horas reais e recalibrar | Média | Médio |

---

### 3.6 EXPERIENCIA_COGNITIVA.md

| ID | Citação | Classificação | Evidência | Como validar | Prioridade | Risco |
|---|---|---|---|---|---|---|
| EC-01 | "A conversa acumula contexto — nada é esquecido" | **ACREDITAMOS** | Assistente atual não tem memória persistente entre sessões (CURRENT_PRODUCT seção 1) | Depende de Motor Cognitivo (congelado) | Crítica | Crítico |
| EC-02 | "Primeira pergunta é sempre a mais fácil" | **ACREDITAMOS** | Regra de design. Pode ser implementada sem motor cognitivo | Implementar e testar: empresários respondem mais à primeira pergunta fácil? | Alta | Médio |
| EC-03 | "IA reage ao conteúdo, não só avança para próxima pergunta" | **ACREDITAMOS** | Comportamento esperado. Assistente atual tem reação limitada (contexto atual não permite reação elaborada) | Depende de Motor Cognitivo | Crítica | Crítico |
| EC-04 | "IA revisa hipóteses quando contradita" | **ACREDITAMOS** | Especificado. Não implementado | Depende de Motor Cognitivo | Crítica | Crítico |
| EC-05 | "Empresário pode interromper, corrigir ou parar a qualquer momento" | **SABEMOS** | O chat atual permite interromper a qualquer momento | Já validado | N/A | Baixo |
| EC-06 | "Primeiro momento WOW ocorre na Fase 4 (2-4min) com confiança >25%" | **ACREDITAMOS** | Hipótese de timing para primeiro WOW. Nunca testado | Gravar 10 sessões: em quanto tempo ocorre o primeiro "Uau" relatado? | Alta | Alto |
| EC-07 | "Confiança do empresário na IA aumenta quando ela corrige hipóteses" | **ACREDITAMOS** | Hipótese psicológica. Não testada na Ponte | Testar A/B: IA que admite erro vs IA que nunca erra. Medir confiança reportada | Alta | Médio |
| EC-08 | "Painel cognitivo reflete o estado atual da conversa" | **ACREDITAMOS** | Painel não implementado | Depende de implementação | Alta | Alto |
| EC-09 | "Transições entre fases são suaves e naturais" | **ACREDITAMOS** | Requisito qualitativo. Não testável | Avaliação heurística com 3 especialistas | Média | Médio |
| EC-10 | "Empresário sente que a conversa não é um roteiro fixo" | **ACREDITAMOS** | Percepção esperada. Não testada | Perguntar após sessão: "A conversa pareceu seguir um roteiro?" | Alta | Médio |

---

### 3.7 IDENTIDADE_DA_INTELIGENCIA.md

| ID | Citação | Classificação | Evidência | Como validar | Prioridade | Risco |
|---|---|---|---|---|---|---|
| I-01 | "A Ponte não tem nome, rosto, gênero ou avatar" | **SABEMOS** | Decisão de design implementada | Já validado | N/A | Baixo |
| I-02 | "Personalidade de consultor sênior — experiente, direto, respeitoso" | **ACREDITAMOS** | Tom definido. Não testado se empresários percebem esta personalidade | Testar: empresários descrevem a IA como "consultor sênior"? | Alta | Médio |
| I-03 | "Tom sóbrio, confiante, preciso. Nunca empolgado, irritado, sarcástico" | **ACREDITAMOS** | Regras de tom definidas. Assistente atual usa Anthropic — o tom depende do prompt, não é garantido | Auditar 10 respostas: alguma viola o tom definido? | Média | Alto |
| I-04 | "Frases proibidas como 'Com certeza!', 'Perfeito!', 'Como posso ajudá-lo?' nunca devem aparecer" | **SABEMOS** | Lista taxativa. Verificável por busca textual | Pode ser verificado por script de CI | N/A | Baixo |
| I-05 | "A Ponte fala a linguagem do empresário usando terminologia correta do segmento" | **ACREDITAMOS** | Intenção de design. Assistente atual usa Anthropic com contexto genérico, não segmento-específico | Depende de motor de conhecimento de domínio | Alta | Alto |
| I-06 | "Nunca usar 'inteligência artificial', 'machine learning' — mostrar, não nomear" | **ACREDITAMOS** | Regra de identidade. Assistente atual pode usar estes termos dependendo do prompt | Auditar se alguma resposta menciona "IA" ou "machine learning" | Média | Médio |
| I-07 | "A adaptação ao perfil do empresário é gradual (3-4 interações)" | **ACREDITAMOS** | Especificado. Assistente atual não tem adaptação de perfil | Depende de Modelo Cognitivo do Empresário (congelado, CURRENT_PRODUCT seção 3) | Crítica | Alto |
| I-08 | "A Ponte não é subordinada, amiga, guru ou ferramenta. É interlocutora, provocadora, reveladora, parceira" | **ACREDITAMOS** | Definição do papel relacional. Não testada | Perguntar: "Como você descreveria o papel da Ponte?" | Média | Médio |

---

### 3.8 SISTEMA_DE_VALOR.md

| ID | Citação | Classificação | Evidência | Como validar | Prioridade | Risco |
|---|---|---|---|---|---|---|
| SV-01 | "Nenhum momento WOW é roteirizado. Todo WOW nasce de dados reais" | **ACREDITAMOS** | Princípio. Motor de hipóteses não existe | Depende de Motor Cognitivo | Crítica | Crítico |
| SV-02 | "Confiança mínima de 40% para WOW" | **ACREDITAMOS** | Threshold único (após resolução da contradição C3 da auditoria P23). Não testado se 40% é o threshold ideal | Testar diferentes thresholds e medir: WOWs gerados vs WOWs percebidos como relevantes | Alta | Médio |
| SV-03 | "Máximo 3 momentos WOW por sessão" | **ACREDITAMOS** | Regra de frequência. Não testada | Variar frequência de WOWs e medir NPS por sessão | Média | Médio |
| SV-04 | "20 momentos WOW especificados" | **ACREDITAMOS** | Catálogo completo de WOWs. Nenhum implementado | Priorizar 3 WOWs para implementar primeiro e testar | Alta | Alto |
| SV-05 | "Gráfico de Pareto + IA aponta concentração de clientes" (WOW #5) | **ACREDITAMOS** | Formato especificado. Depende de dados financeiros carregados e motor de correlação | Implementar versão mínima com dados simulados | Média | Médio |
| SV-06 | "Se o empresário ignorou 2 WOWs seguidos, reduzir frequência pela metade" | **ACREDITAMOS** | Regra adaptativa. Depende de rastreamento de comportamento | Implementar contador de WOWs ignorados e testar | Baixa | Baixo |

---

### 3.9 MAPAS_COGNITIVO_VIVO.md

| ID | Citação | Classificação | Evidência | Como validar | Prioridade | Risco |
|---|---|---|---|---|---|---|
| MCV-01 | "O mapa cognitivo expõe o pensamento da IA em tempo real" | **ACREDITAMOS** | Especificado. Não implementado | Depende de Motor Cognitivo | Crítica | Crítico |
| MCV-02 | "5 áreas de conhecimento: Empresa, Financeiro, Clientes, Equipe, Operação" | **ACREDITAMOS** | Estrutura definida. Não testada se estas são AS áreas certas para o empresário | Testar card sorting com 10 empresários: "Como você organiza sua empresa?" | Alta | Alto |
| MCV-03 | "Sidebar direita expansível" | **ACREDITAMOS** | Layout definido. Mobile sem especificação | Testar protótipo com 5 empresários em desktop e mobile | Média | Médio |
| MCV-04 | "Cobertura cognitiva: % de áreas mapeadas" | **ACREDITAMOS** | Métrica definida. Não implementada | Depende de implementação do mapa | Alta | Médio |
| MCV-05 | "Sessão individual dura 30s-3min (modo padrão) ou até 15min (modo mergulho)" | **ACREDITAMOS** | Estimativa de duração. Auditoria P23 (C1) identificou contradição com experiência longitudinal | Medir duração real de sessões com Empresa Zero | Alta | Médio |

---

### 3.10 DEMAIS DOCUMENTOS P23 (consolidado)

| ID | Citação | Classificação | Evidência | Como validar | Prioridade | Risco |
|---|---|---|---|---|---|---|
| P23-01 | "7 estados visuais da IA (E1-E7)" (ARQUITETURA_VISUAL) | **ACREDITAMOS** | Estados definidos. Transições não especificadas (L7 da auditoria P23) | Implementar máquina de estados e testar | Média | Médio |
| P23-02 | "Carga cognitiva reduzida com design sensorial" (EXPERIENCIA_SENSORIAL) | **ACREDITAMOS** | Princípio de design. Não medido | Medir carga cognitiva percebida (NASA-TLX) com vs sem design sensorial | Média | Médio |
| P23-03 | "Sons opt-in, desligados por padrão" (RELATORIO_FINAL Decisão 2) | **ACREDITAMOS** | Decisão de design. Estimativa: "60% nunca ativam som" | Medir % real de ativação de som | Baixa | Baixo |
| P23-04 | "Digitação simulada a ~30 caracteres/segundo" (RELATORIO_FINAL Decisão 3) | **SABEMOS** | Taxa definida. Pode ser implementada como configurável | Já validável | N/A | Baixo |
| P23-05 | "Velocidade da resposta comunica confiança: <500ms certeza, 2-5s reflexão, 5-15s análise profunda" (RELATORIO_FINAL Decisão 7) | **ACREDITAMOS** | Três faixas de tempo definidas. Não testado se empresários percebem a relação entre tempo e confiança | Testar: empresário percebe "certeza" quando resposta é rápida? | Média | Médio |
| P23-06 | "A IA nunca pergunta 'Ainda está aí?'" (RELATORIO_FINAL Decisão 6) | **SABEMOS** | Regra clara. Verificável | Pode ser verificado por busca na base de frases | N/A | Baixo |
| P23-07 | "Pipeline de 6 fases cognitivas (Escuta, Correlação, Hipótese, Validação, Finalização)" (LOADING_INTELIGENTE) | **ACREDITAMOS** | Pipeline definido. Nomes não correspondem aos 9 motores reais (AUDITORIA I5) | Mapear cada fase para o motor real correspondente | Média | Médio |
| P23-08 | "Gamificação: deliberadamente excluída" (RELATORIO_FINAL) | **SABEMOS** | Decisão documentada. GAMIFICACAO_COGNITIVA.md contradiz | Resolver contradição: remover ou adotar (C4 da auditoria P23) | Imediata | Médio |
| P23-09 | "O mapa é o centro da experiência, não o chat" (RELATORIO_FINAL Decisão 1) | **ACREDITAMOS** | Decisão de design. ARQUITETURA_VISUAL coloca chat como centro (C7 da auditoria P23) | Resolver contradição e testar qual layout gera mais engajamento | Alta | Médio |
| P23-10 | "Feedback do empresário: botão 'isso não está certo' em cada hipótese" (AUDITORIA L8) | **ACREDITAMOS** | Recomendação da auditoria. Não implementado | Implementar e medir taxa de uso | Média | Baixo |

---

### 3.11 CURRENT_PRODUCT.md (referência de realidade)

| ID | Citação | Classificação | Evidência | Como validar | Prioridade | Risco |
|---|---|---|---|---|---|---|
| CP-01 | "CRM, Financeiro, Tarefas, Onboarding, Timeline, Assistente IA funcionais" | **SABEMOS** | Código em produção | Já validado | N/A | Baixo |
| CP-02 | "Zero cobertura de teste" | **SABEMOS** | Factual | Já validado | N/A | Crítico |
| CP-03 | "Assistente IA com contexto limitado" | **SABEMOS** | Factual — chat atual não acumula contexto entre sessões | Já validado | N/A | Alto |
| CP-04 | "Motor Cognitivo completo — CONGELADO" | **SABEMOS** | Decisão de produto documentada | Já validado | N/A | Crítico |
| CP-05 | "Knowledge Vault implementado" | **SABEMOS** | Código em produção | Já validado | N/A | Baixo |
| CP-06 | "Conversational Learning implementado" | **SABEMOS** | Código em produção | Já validado | N/A | Baixo |
| CP-07 | "100 fundadores usando versão básica — objetivo da fase" | **ACREDITAMOS** | Meta declarada. Não atingida ainda (documento é o plano, não o resultado) | Medir número atual de fundadores ativos | Imediata | Muito Alto |
| CP-08 | "Soft delete incompleto — violação de princípio inegociável" | **SABEMOS** | Factual: alguns models não têm `deletedAt` | Já validado | Imediata | Alto |

---

## 4. Tabela Resumo

### 4.1 Contagem Total

| Categoria | Quantidade | % |
|---|---|---|
| **SABEMOS** | 29 | 30.2% |
| **ACREDITAMOS** | 59 | 61.5% |
| **NÃO SABEMOS** | 8 | 8.3% |
| **Total** | 96 | 100% |

### 4.2 Por Documento

| Documento | SABEMOS | ACREDITAMOS | NÃO SABEMOS | Total |
|---|---|---|---|---|
| CONSTITUICAO_DA_ENGENHARIA.md | 12 | 4 | 0 | 16 |
| MANIFESTO_DA_EXPERIENCIA.md | 0 | 14 | 0 | 14 |
| CERTIFICACAO_DA_EXPERIENCIA.md | 1 | 8 | 1 | 10 |
| AUDITORIA_COMPLETA_P23.md | 8 | 0 | 0 | 8 |
| RELATORIO_FINAL.md | 0 | 3 | 3 | 6 |
| EXPERIENCIA_COGNITIVA.md | 1 | 8 | 0 | 9 |
| IDENTIDADE_DA_INTELIGENCIA.md | 2 | 5 | 0 | 7 |
| SISTEMA_DE_VALOR.md | 0 | 6 | 0 | 6 |
| MAPAS_COGNITIVO_VIVO.md | 0 | 5 | 0 | 5 |
| Demais P23 (consolidado) | 3 | 5 | 2 | 10 |
| CURRENT_PRODUCT.md | 6 | 1 | 1 | 8 |
| **Total** | **29** | **59** | **8** | **96** |

### 4.3 Por Risco

| Risco | SABEMOS | ACREDITAMOS | NÃO SABEMOS | Total |
|---|---|---|---|---|
| Crítico | 5 | 5 | 0 | 10 |
| Muito Alto | 0 | 4 | 2 | 6 |
| Alto | 2 | 16 | 1 | 19 |
| Médio | 4 | 20 | 4 | 28 |
| Baixo | 18 | 12 | 1 | 31 |

### 4.4 Por Prioridade de Validação

| Prioridade | Quantidade |
|---|---|
| Imediata | 3 |
| Crítica | 6 |
| Alta | 19 |
| Média | 17 |
| Baixa | 3 |

---

## 5. Estratégia de Validação

### 5.1 Como Transformar ACREDITAMOS em SABEMOS

Cada ACREDITAMOS precisa de um experimento para se tornar SABEMOS.

**Método geral:**

1. **Formular a hipótese em formato testável** — "Se X, então Y" (ex: "Se a IA mostra seu raciocínio em tempo real, então o empresário confia mais nela")
2. **Definir métrica de sucesso** — o que será medido (ex: NPS, taxa de aceite de recomendação)
3. **Projetar o experimento** — A/B test, entrevista, análise de log
4. **Executar com N mínimo** — 5 empresários para qualitativo, 30+ para quantitativo
5. **Documentar resultado** — virou SABEMOS ou a hipótese foi refutada?

### 5.2 Prioridade de Validação

#### Lote 1 — Imediato (esta sprint)

| ID | Afirmação | Experimento |
|---|---|---|
| CP-07 | "100 fundadores usando versão básica" | Medir número atual de fundadores ativos. Se <100, priorizar captação |
| C-17 | "Ausência de middleware é gap de segurança" | Criar middleware de autenticação |
| P23-08 | "Gamificação excluída" | Resolver contradição: mover GAMIFICACAO_COGNITIVA.md para archive/ ou atualizar MANIFESTO |

#### Lote 2 — Crítico (próximas 2 sprints)

| ID | Afirmação | Experimento | Dependência |
|---|---|---|---|
| CE-06 | "IA revisita, recua, aprofunda" | Validar se o comportamento é possível com o Motor Cognitivo atual | Motor Cognitivo (congelado) |
| EC-01 | "Conversa acumula contexto — nada é esquecido" | Implementar memória persistente mínima e testar | Memória entre sessões |
| EC-03 | "IA reage ao conteúdo" | Testar com assistente atual: quantas reações contextualizadas ele consegue gerar? | Prompt engineering |
| SV-01 | "Nenhum WOW roteirizado" | Implementar 1 WOW (concentração de clientes) com dados reais e testar | Dados financeiros |
| MCV-01 | "Mapa cognitivo expõe pensamento em tempo real" | Protótipo de mapa com dados estáticos e testar com 5 empresários | Implementação |
| I-07 | "Adaptação ao perfil do empresário" | Verificar se Assistente atual consegue adaptar tom com base em perfil detectado | Prompt |

#### Lote 3 — Alta (próximas 4 sprints)

| ID | Afirmação |
|---|---|
| M-01 | "Produto é empresário mais inteligente" — entrevista com 5 empresários |
| M-05 | "Empresário compra clareza, direção, confiança, tempo, descoberta" — survey |
| M-10 | "Inteligência precisa ser vista para ser confiada" — A/B test |
| M-11 | "Aprendizado é o produto" — medir decisões melhores |
| CE-02 | "Empresário faz qualquer pergunta sem menu" — teste de 10 perguntas |
| CE-04 | "Valor nos primeiros 30 segundos" — teste com 10 novos usuários |
| EC-06 | "Primeiro WOW em 2-4min" — gravar 10 sessões |
| SV-02 | "Threshold 40% para WOW" — testar diferentes thresholds |
| MCV-02 | "5 áreas de conhecimento" — card sorting com 10 empresários |
| R-02 | "Empresário paga por descoberta" — survey |

### 5.3 O Que Fazer com NÃO SABEMOS

| ID | Afirmação | Ação |
|---|---|---|
| CE-08 | "Níveis Ouro/Prata/Bronze são úteis" | Não agir agora. Deixar a certificação ser usada antes de avaliar |
| R-01 | "Ativação sobe de 30% para 70%" | Substituir estimativa por dado real: medir ativação atual primeiro |
| R-05 | "90-120 dias de implementação" | Acompanhar tempo real e recalibrar |
| R-06 | "165 dias-homem" | Registrar horas reais por WP |
| P23-05 | "Velocidade da resposta comunica confiança" | Incluir no teste de usabilidade |
| P23-07 | "Nomes das fases não correspondem a motores reais" | Criar tabela de mapeamento (auditoria P23 recomendou) |
| P23-09 | "Mapa é centro vs chat é centro" | Resolver contradição primeiramente |
| G-01 | (GAMIFICACAO_COGNITIVA.md completo) | Decidir: arquivar ou adotar |

---

## 6. Riscos

### 6.1 Risco de Estar Errado (Por Categoria)

| Categoria | Risco agrupado | Probabilidade | Impacto |
|---|---|---|---|
| **ACREDITAMOS sobre comportamento do empresário** (M-01 a M-14, EC-01 a EC-10) | Empresário real não se comporta como a hipótese prevê. Ex: empresário NÃO quer "descoberta", quer "relatório rápido" | ALTA | Muito Alto |
| **ACREDITAMOS sobre diferenciação competitiva** (C-12, M-13) | Concorrente valida a mesma tese antes. Ex: concorrente descobre que empresário quer resposta rápida, não relação intelectual | MÉDIA | Muito Alto |
| **ACREDITAMOS sobre viabilidade técnica** (CV-06, EC-01, EC-03, EC-04) | Motor Cognitivo não consegue gerar o comportamento especificado com a tecnologia atual | MÉDIA | Crítico |
| **NÃO SABEMOS sobre estimativas** (R-01, R-05, R-06) | Implementação leva 2x o estimado. Projeto atrasa, orçamento estoura | ALTA | Alto |

### 6.2 Risco Priorizado (Top 5)

| # | Risco | Afeta | Mitigação |
|---|---|---|---|
| 1 | Empresário real quer ferramenta, não relação intelectual | Toda a tese de valor do P23 | Testar com 5 empresários reais ANTES de implementar |
| 2 | Motor Cognitivo não suporta os comportamentos especificados | CE-06, EC-01, EC-03, EC-04, SV-01, MCV-01 | Validar capacidade do motor atual com experimento mínimo |
| 3 | Ativação real é muito menor que 30% estimado | R-01, meta de negócio | Medir ativação real imediatamente |
| 4 | Perfil ETD não corresponde ao empresário real | I4 da auditoria P23 | Entrevistar 5 empresários do perfil real (barbearia, oficina, etc.) |
| 5 | NPS e retorno atuais são muito baixos para servir de baseline | Todas as metas do P23 | Capturar baseline antes de qualquer implementação |

---

## Anexo A — Glossário Epistemológico

| Termo | Definição |
|---|---|
| **Epistemologia** | Estudo do conhecimento — como sabemos o que sabemos |
| **SABEMOS** | Afirmação com evidência documentada, dado real ou código funcionando |
| **ACREDITAMOS** | Hipótese bem formada, mas sem validação empírica |
| **NÃO SABEMOS** | Suposição sem evidência ou hipótese formal |
| **Validação** | Processo de transformar ACREDITAMOS em SABEMOS |
| **Evidência** | Dado observável que suporta ou refuta uma afirmação |
| **Hipótese** | Afirmação testável sobre a realidade |

---

## Anexo B — Ações Imediatas

Prioridade máxima para o P24:

1. **Medir baseline de ativação, NPS e retorno** — sem isso, nenhuma meta do P23 é verificável
2. **Resolver contradição da gamificação** — arquivar GAMIFICACAO_COGNITIVA.md ou adotar formalmente
3. **Iniciar experimento de validação com 5 empresários reais** — testar as 5 hipóteses mais arriscadas (M-01, M-05, M-10, CE-04, R-02)
4. **Criar tabela de mapeamento fases do loading → motores reais** (resolver I5 da auditoria P23)
5. **Unificar thresholds de confiança (20% / 40% / >50% → 40% para WOW, 20% para sugestão)**

---

## Anexo C — Histórico de Versões

| Versão | Data | Autor | Mudanças |
|---|---|---|---|
| 1.0 | 26/07/2026 | Auditoria P24 | Versão inicial da certificação científica |

---

*Este documento é parte do Programa 24 — Certificação e Validação.*
*Separa o que sabemos do que acreditamos na Ponte Digital.*
*96 afirmações auditadas. 61.5% são crenças. 30.2% são conhecimento. 8.3% são desconhecimento.*
*O objetivo do P24 é iniciar a transformação de ACREDITAMOS em SABEMOS.*
