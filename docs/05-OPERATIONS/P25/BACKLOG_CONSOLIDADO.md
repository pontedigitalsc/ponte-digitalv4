# BACKLOG CONSOLIDADO — Pendências Estruturais da Ponte Digital

**Programa 25 | Consolidação e Priorização | 26/07/2026**

> Backlog unificado de todas as pendências identificadas nos Programas 21, 22, 23 e 24.
> Duplicações fundidas, conflitos resolvidos, prioridades reclassificadas no sistema P0-P4.

---

## Critério de Prioridade (P0-P4)

| Categoria | Definição | Exemplo |
|---|---|---|
| **P0** | Bloqueia operação — sem isso o produto não funciona, está inseguro ou viola um princípio inegociável | Gap de segurança, funcionalidade core quebrada, documento fundacional ausente |
| **P1** | Bloqueia aprendizado — sem isso não conseguimos validar hipóteses críticas com a Empresa Zero | Métricas não definidas, baseline não capturado, experimento inviável |
| **P2** | Melhora experiência — a experiência é funcional mas incompleta ou inconsistente | Microinterações, onboarding, indicadores visuais |
| **P3** | Melhora arquitetura — a arquitetura funciona mas tem débito técnico que precisa ser endereçado | Nomenclatura divergente, engines sobrepostas, documentação desalinhada |
| **P4** | Pode esperar — importante mas não urgente. Pós-validação 100 fundadores | i18n/l10n, automação avançada, gamificação completa |

---

## Backlog Consolidado

### BP-001 — Constituição da Engenharia não encontrada

| Campo | Valor |
|---|---|
| Nome | Documento "CONSTITUICAO_DA_ENGENHARIA.md" ausente |
| Descrição | Documento fundacional referenciado em múltiplos lugares. CERTIFICACAO_CIENTIFICA o cita como fonte com 18 afirmações. PEND-001 reporta que não foi encontrado no sistema. CERTIFICACAO_ARQUITETURAL indica que está em `docs/09-ARCHITECTURE/` (localização não-padrão). Existe contradição entre os próprios documentos de certificação sobre sua existência. |
| Origem | P24 |
| Categoria | **P0** |
| Classificação | documental |
| Documentos afetados | CONSTITUICAO_DA_ENGENHARIA.md (referenciado, não localizado), CERTIFICACAO_DA_GOVERNANCA.md, CERTIFICACAO_CIENTIFICA.md, CERTIFICACAO_ARQUITETURAL.md |
| Dependências | Nenhuma |
| Conhecimento produzido | Localização real do documento; razão do desalinhamento entre certificações |
| Recomendação | Localizar o documento e confirmar sua existência. Se confirmado: mover para localização canônica e atualizar referências. Se inexistente: recriar a partir das 18 afirmações citadas na CERTIFICACAO_CIENTIFICA. |

---

### BP-002 — Motor Cognitivo: documentação vs código divergem

| Campo | Valor |
|---|---|
| Nome | Documentação do Motor Cognitivo diz "congelado" e consolidado, código tem 55+ engines com responsabilidades sobrepostas |
| Descrição | A documentação descreve um motor consolidado congelado. O código revela 55+ engines com responsabilidades sobrepostas. Fases do P23 (Escuta, Correlação, Hipótese…) não correspondem a motores reais (pipeline-motor, segmentação, contexto…). Divergência documental × realidade impede certificação. |
| Origem | P24 (fundido: PEND-002 + I1 + I5 da auditoria P23) |
| Categoria | **P0** |
| Classificação | arquitetural |
| Documentos afetados | Arquitetura Consolidada, Motor Cognitivo, LOADING_INTELIGENTE.md, CURRENT_PRODUCT.md |
| Dependências | BP-001 |
| Conhecimento produzido | Mapeamento real de engines vs fases documentadas; definição do que é "Motor Cognitivo" |
| Recomendação | Auditar as 55+ engines, documentar cada uma, criar tabela de mapeamento fases P23 → motores reais, alinhar documentação com código |

---

### BP-003 — Loading inteligente implementado como spinner genérico

| Campo | Valor |
|---|---|
| Nome | Loading inteligente (Princípio 2 do Manifesto) não implementado |
| Descrição | Manifesto: "Toda espera é narrativa". Implementação atual usa spinner genérico sem texto de processo. Pipeline de 6 fases cognitivas especificado (Escuta, Correlação, Hipótese, Validação, Finalização) não existe no código. Documentos LOADING e A_ESPERA têm durações divergentes. |
| Origem | P24 (fundido: PEND-003 + C5 da auditoria P23) |
| Categoria | **P0** |
| Classificação | implementação |
| Documentos afetados | MANIFESTO_DA_EXPERIENCIA.md, LOADING_INTELIGENTE.md, A_ESPERA_INTELIGENTE.md |
| Dependências | BP-002 (fases do loading dependem do motor cognitivo) |
| Conhecimento produzido | Se loading narrativo reduz abandono (H-005); duração real de cada fase cognitiva |
| Recomendação | Implementar loading inteligente conforme especificação, unificar durações entre LOADING e A_ESPERA |

---

### BP-004 — Indicador de confiança da IA não visível na interface

| Campo | Valor |
|---|---|
| Nome | Sistema de confiança visual não implementado |
| Descrição | Certificação da Experiência define confiança como elemento obrigatório. Implementação atual não exibe nenhum indicador. Três thresholds conflitantes identificados (20%, 40%, >50%). IA deve mostrar confiança quando alta vs deve mostrar incerteza quando baixa — regra de coexistência não implementada. |
| Origem | P24 (fundido: PEND-004 + R1 da auditoria P23 + C3) |
| Categoria | **P0** |
| Classificação | implementação |
| Documentos afetados | CERTIFICACAO_DA_EXPERIENCIA.md, SISTEMA_DE_CONFIANCA_VISUAL.md, ARQUITETURA_VISUAL_DA_CONVERSA.md, SISTEMA_DE_INSIGHTS.md, SISTEMA_DE_VALOR.md |
| Dependências | BP-002 (engine precisa calcular confiança) |
| Conhecimento produzido | Se empresários confiam mais quando IA admite incerteza (H-001); se indicador deve ser sempre visível (H-016) |
| Recomendação | Unificar thresholds (≥20% sugestão, ≥40% WOW), implementar anel/barra de confiança, alinhar ARQUITETURA_VISUAL com SISTEMA_DE_CONFIANCA |

---

### BP-005 — Motor Cognitivo sem cobertura para empresas de tecnologia

| Campo | Valor |
|---|---|
| Nome | Domínio do Motor Cognitivo não contempla empresas de tecnologia/software |
| Descrição | Motor projetado para empresas tradicionais (comércio, serviços, indústria). Empresa Zero (a própria Ponte) é de tecnologia — não consegue se auto-diagnosticar. Perfil ETD do P23 difere do perfil real do empresário da Jornada Fundacional. |
| Origem | P24 (fundido: PEND-005 + I4 da auditoria P23) |
| Categoria | **P0** |
| Classificação | arquitetural |
| Documentos afetados | Motor Cognitivo, CERTIFICACAO_EMPRESA_ZERO.md, PSICOLOGIA_DA_PRIMEIRA_IMPRESSAO.md |
| Dependências | BP-002 |
| Conhecimento produzido | Quais perguntas são relevantes para empresas de tecnologia; diferenças entre perfil ETD e perfil real |
| Recomendação | Expandir modelo de domínio para incluir tech/software. Revisar complexidade da experiência contra o perfil real. |

---

### BP-006 — Continuidade entre sessões não implementada

| Campo | Valor |
|---|---|
| Nome | Acumulação de conhecimento entre sessões não existe |
| Descrição | Cada sessão começa praticamente do zero. Não há patrimônio cognitivo acumulado. MVP atual: "chat com contexto limitado". P23 exige contexto acumulativo. |
| Origem | P24 (fundido: PEND-006 + I2 da auditoria P23) |
| Categoria | **P0** |
| Classificação | implementação |
| Documentos afetados | EXPERIENCIA_COGNITIVA.md, A_ESPERA_INTELIGENTE.md, CURRENT_PRODUCT.md |
| Dependências | BP-002 |
| Conhecimento produzido | Se empresários retornam mais com continuidade (H-006, H-012, H-020); padrões de retorno |
| Recomendação | Implementar mecanismo de continuidade entre sessões: memória persistente de hipóteses e cobertura via banco de dados |

---

### BP-007 — 4 Work Packages P0 do Roadmap P23 não implementados

| Campo | Valor |
|---|---|
| Nome | WP01-WP04 do P23 não implementados conforme especificação |
| Descrição | Mapa Cognitivo (WP01), Jornada 7 dias (WP02), Motor de Insights (WP03), Nova Landing Page (WP04) — nenhum implementado. Experiência core da Ponte Digital não corresponde à especificação. |
| Origem | P24 (fundido: PEND-007 + Roadmap P23 WPs) |
| Categoria | **P0** |
| Classificação | implementação |
| Documentos afetados | ROADMAP_IMPLEMENTACAO_P23.md, múltiplos documentos P23 |
| Dependências | BP-002, BP-003, BP-004, BP-006 |
| Conhecimento produzido | Se a experiência especificada no P23 resolve problemas reais dos empresários |
| Recomendação | Priorizar implementação incremental: WP01 (Mapa) → WP03 (Insights) → WP02 (Jornada) → WP04 (Landing) |

---

### BP-008 — Mapa Cognitivo Vivo não implementado

| Campo | Valor |
|---|---|
| Nome | Painel cognitivo em tempo real não existe na interface |
| Descrição | Painel vivo que mostra aprendizado em tempo real durante conversa. Especificado como centro da experiência. 5 áreas de conhecimento definidas. C1 da auditoria: contradição entre "curta duração (30s-3min)" e experiência longitudinal (dias/meses). |
| Origem | P24 (fundido: PEND-012 + WP01 + C1) |
| Categoria | **P0** |
| Classificação | implementação |
| Documentos afetados | MAPAS_COGNITIVO_VIVO.md, ARQUITETURA_VISUAL_DA_CONVERSA.md |
| Dependências | BP-002, BP-004 |
| Conhecimento produzido | Se mapa cognitivo aumenta engajamento (H-002); se 5 áreas são as certas (MCV-02) |
| Recomendação | Implementar painel cognitivo mínimo. Resolver C1: "cada sessão individual 30s-3min, relação longitudinal dias/meses". |

---

### BP-009 — Conhecimento fundacional sem validação empírica (61.5% ACREDITAMOS)

| Campo | Valor |
|---|---|
| Nome | Maioria do conhecimento fundacional é hipótese não validada |
| Descrição | Certificação Científica: 61.5% das afirmações são ACREDITAMOS, 8.3% são NÃO SABEMOS. Fundação baseada majoritariamente em crenças. Risco de decisões erradas. |
| Origem | P24 (PEND-016) |
| Categoria | **P0** |
| Classificação | cognitivo |
| Documentos afetados | Múltiplos (96 afirmações auditadas em 30 documentos) |
| Dependências | Nenhuma |
| Conhecimento produzido | Quais hipóteses são verdadeiras para empresários reais |
| Recomendação | Iniciar validação imediata com Empresa Zero. Priorizar Lote 1 da CERTIFICACAO_CIENTIFICA (CP-07, C-17, P23-08). |

---

### BP-010 — Violações do Manifesto da Experiência

| Campo | Valor |
|---|---|
| Nome | 5 princípios do Manifesto violados na implementação atual |
| Descrição | Loading genérico (P2), confiança ausente (P6), resposta sem novidade (P1), tela parada (P4), inteligência invisível (P6). A implementação atual contradiz a identidade documentada. |
| Origem | P24 (PEND-010 + R2 da auditoria) |
| Categoria | **P0** |
| Classificação | implementação |
| Documentos afetados | MANIFESTO_DA_EXPERIENCIA.md |
| Dependências | BP-003, BP-004, BP-008 |
| Conhecimento produzido | Se o Manifesto representa o que empresários valorizam |
| Recomendação | Corrigir cada violação individualmente. BP-003, BP-004 e BP-008 resolvem a maioria. |

---

### BP-011 — Estratégia de fallback para falha do motor cognitivo ausente

| Campo | Valor |
|---|---|
| Nome | Nenhum documento especifica o que acontece quando o motor falha |
| Descrição | P23 assume motor perfeito. Sem protocolo para: timeout de API, dado inconsistente, confiança zerada. Primeira falha real pode destruir confiança. |
| Origem | P23 (L2 da auditoria, não coberto pelo P24) |
| Categoria | **P0** |
| Classificação | implementação |
| Documentos afetados | Múltiplos P23 (loading, mapa, sistema de insights, sistema de valor) |
| Dependências | BP-002 |
| Conhecimento produzido | Comportamento da IA em cenários de falha; resiliência do sistema |
| Recomendação | Adicionar seção de fallback e tratamento de erro em cada documento de funcionalidade. Definir frases, estados visuais e fluxos de recuperação. |

---

### BP-012 — Violações de segurança: middleware de autenticação ausente

| Campo | Valor |
|---|---|
| Nome | Ausência de middleware.ts de autenticação |
| Descrição | CONSTITUIÇÃO Erro 7: "A ausência de middleware.ts é o maior gap de segurança". Cada rota protege manualmente. Risco de exposição acidental de dados entre empresas. |
| Origem | P24 (C-17 da CERTIFICACAO_CIENTIFICA, Tipo D da CERTIFICACAO_ARQUITETURAL — não coberto pelas 25 pendências originais) |
| Categoria | **P0** |
| Classificação | implementação |
| Documentos afetados | CONSTITUICAO_DA_ENGENHARIA.md (seção gaps) |
| Dependências | Nenhuma |
| Conhecimento produzido | Superfície de exposição atual; confirmação se há ou houve vazamento de dados entre tenants |
| Recomendação | Criar middleware de autenticação e autorização. Remover proteção manual de cada rota. |

---

### BP-013 — Soft delete incompleto

| Campo | Valor |
|---|---|
| Nome | Models sem soft delete conforme Lei 9 da Constituição |
| Descrição | Lei 9: "Toda migration adiciona dados, nunca remove sem estratégia". Alguns models não têm `deletedAt`. Violação de princípio inegociável. |
| Origem | P24 (CERTIFICACAO_ARQUITETURAL Tipo C, CP-08 da CERTIFICACAO_CIENTIFICA — não coberto pelas 25 pendências originais) |
| Categoria | **P0** |
| Classificação | implementação |
| Documentos afetados | CONSTITUICAO_DA_ENGENHARIA.md, CURRENT_PRODUCT.md, schema.prisma |
| Dependências | Nenhuma |
| Conhecimento produzido | Impacto real da ausência de soft delete; quais models são críticos |
| Recomendação | Completar soft delete nos models faltantes. Adicionar migração de dados. |

---

### BP-014 — Métricas de sucesso da experiência não definidas

| Campo | Valor |
|---|---|
| Nome | KPIs da experiência não existem |
| Descrição | Nenhum documento P23 define métricas objetivas para a experiência. "Empresário confia na IA" não é mensurável sem NPS, taxa de retorno, tempo de sessão. Baseline de ativação, NPS e retorno não capturado. |
| Origem | P23 (L1 da auditoria — não coberto pelo P24) |
| Categoria | **P1** |
| Classificação | experiência |
| Documentos afetados | EXPERIENCIA_COGNITIVA.md, METRICAS_DA_EXPERIENCIA.md, RELATORIO_FINAL.md |
| Dependências | Nenhuma |
| Conhecimento produzido | Baseline real de NPS, retorno em 7 dias, ativação; KPIs por fase da experiência |
| Recomendação | Capturar baseline imediato de: NPS, retorno em 7/14/30 dias, ativação, tempo médio de sessão. Adicionar seção de métricas em EXPERIENCIA_COGNITIVA.md. |

---

### BP-015 — Telas com cobertura baixa (52%)

| Campo | Valor |
|---|---|
| Nome | Apenas 52% das funcionalidades especificadas têm tela implementada |
| Descrição | Matriz de Rastreabilidade mostra que menos da metade do que foi especificado existe na interface. |
| Origem | P24 (PEND-009) |
| Categoria | **P1** |
| Classificação | implementação |
| Documentos afetados | Múltiplos P23 |
| Dependências | BP-007 |
| Conhecimento produzido | Lacuna entre especificação e implementação; funcionalidades mais relevantes para empresários |
| Recomendação | Priorizar implementação de telas para funcionalidades P0, depois P1 |

---

### BP-016 — Checklist de experiência com 50.5% de cobertura

| Campo | Valor |
|---|---|
| Nome | Checklist de certificação cobre apenas metade da especificação |
| Descrição | Dos ~200 itens da experiência, apenas 97 estão cobertos. 99 itens não localizados na implementação. |
| Origem | P24 (PEND-021) |
| Categoria | **P1** |
| Classificação | implementação |
| Documentos afetados | CHECKLIST_DE_EXPERIENCIA.md, múltiplos P23 |
| Dependências | BP-007 |
| Conhecimento produzido | Itens mais críticos não implementados; razões para cada item não localizado |
| Recomendação | Implementar itens não cobertos começando pelos P0 |

---

### BP-017 — Implementação da experiência sem rastro na documentação

| Campo | Valor |
|---|---|
| Nome | Documentos P23 sem correspondência no código |
| Descrição | Vários documentos da experiência não têm rastro identificável na implementação. Esforço de especificação não se traduziu em código. |
| Origem | P24 (PEND-024) |
| Categoria | **P1** |
| Classificação | implementação |
| Documentos afetados | Múltiplos P23 |
| Dependências | BP-007 |
| Conhecimento produzido | Quais especificações foram abandonadas e por quê |
| Recomendação | Priorizar alinhamento implementação × especificação. Decidir: implementar ou arquivar cada documento sem rastro. |

---

### BP-018 — 8.3% do conhecimento é "NÃO SABEMOS"

| Campo | Valor |
|---|---|
| Nome | Afirmações sem qualquer base (suposições sem evidência nem hipótese) |
| Descrição | 8.3% das afirmações auditadas são suposições formais. Risco de implementar funcionalidades baseadas em suposição. |
| Origem | P24 (PEND-017) |
| Categoria | **P1** |
| Classificação | cognitivo |
| Documentos afetados | Múltiplos |
| Dependências | BP-009 |
| Conhecimento produzido | Natureza e risco de cada suposição |
| Recomendação | Transformar cada NÃO SABEMOS em hipótese formal ou remover a afirmação da documentação |

---

### BP-019 — ADRs aceitas não implementadas

| Campo | Valor |
|---|---|
| Nome | 9 ADRs aprovadas sem implementação correspondente |
| Descrição | ADR-010 (Patrimônio Cognitivo), ADR-011 (Event Bus), ADR-013 (Ciclo Cognitivo), ADR-014 (Cache — já existe no código!), ADR-015 (Motor Barramento), ADR-016 (16 Submotores), ADR-019 (Hierarquia Memória), ADR-029 (Renomear PT), ADR-030 (Eliminar Duplicatas). |
| Origem | P24 (PEND-018) |
| Categoria | **P1** |
| Classificação | governança |
| Documentos afetados | ADRs 010-030 |
| Dependências | BP-002 |
| Conhecimento produzido | Se cada ADR ainda é relevante; quais devem ser rejeitadas vs implementadas |
| Recomendação | Revisar cada ADR: implementar, postergar ou reverter. Atualizar ADR-014 (cache já existe). |

---

### BP-020 — Governança com nota 5.8/10

| Campo | Valor |
|---|---|
| Nome | Certificação da Governança desalinhada com pilares |
| Descrição | A governança em vigor não está plenamente alinhada com os demais pilares da Ponte Digital. Risco de decisões não alinhadas. |
| Origem | P24 (PEND-020) |
| Categoria | **P1** |
| Classificação | governança |
| Documentos afetados | Múltiplos |
| Dependências | BP-001, BP-019 |
| Conhecimento produzido | Mecanismos de governança que funcionam na prática |
| Recomendação | Fortalecer mecanismos de governança: owners, revisões periódicas, rastreabilidade de decisões |

---

### BP-021 — Contradição da Gamificação (existe ou não existe?)

| Campo | Valor |
|---|---|
| Nome | GAMIFICACAO_COGNITIVA.md contradiz MANIFESTO e RELATORIO_FINAL |
| Descrição | Três documentos (MANIFESTO, RELATORIO_FINAL, PRINCIPLES) dizem que gamificação não existe. Um documento de 29 seções descreve gamificação em detalhe. Decisão pendente: arquivar ou adotar. |
| Origem | P24 (fundido: PEND-014 + C4 + I3) |
| Categoria | **P1** |
| Classificação | documental |
| Documentos afetados | GAMIFICACAO_COGNITIVA.md, MANIFESTO_DA_EXPERIENCIA.md, RELATORIO_FINAL.md, PRINCIPLES.md |
| Dependências | Nenhuma |
| Conhecimento produzido | Se gamificação cognitiva (não lúdica) agrega valor na visão do produto |
| Recomendação | Decidir formalmente: mover GAMIFICACAO_COGNITIVA.md para archive/ com nota de rejeição, ou atualizar MANIFESTO para permitir gamificação cognitiva. Ação imediata (já identificada como Lote 1 na CERTIFICACAO_CIENTIFICA). |

---

### BP-022 — Contradição das durações: loading vs espera inteligente

| Campo | Valor |
|---|---|
| Nome | Documentos LOADING e A_ESPERA divergem nas fases e durações |
| Descrição | LOADING diz "indeterminado", A_ESPERA diz durações específicas (2-5s, 8-12s, 15-25s). Mesmo processo descrito com dados divergentes. |
| Origem | P23 (C5 — parcialmente coberto por BP-003) |
| Categoria | **P2** |
| Classificação | documental |
| Documentos afetados | LOADING_INTELIGENTE.md, A_ESPERA_INTELIGENTE.md |
| Dependências | BP-003 |
| Conhecimento produzido | Padrão de tolerância a espera dos empresários |
| Recomendação | Unificar: LOADING foca no conteúdo textual das fases; A_ESPERA foca no design da transição. Mesmo pipeline unificado. |

---

### BP-023 — Camada de serviços com cobertura insuficiente (7%)

| Campo | Valor |
|---|---|
| Nome | Services quase inexistentes — lógica nas engines ou componentes |
| Descrição | Matriz de Rastreabilidade: camada de Services tem cobertura de apenas 7%. Arquitetura não segue o padrão documentado. |
| Origem | P24 (PEND-008) |
| Categoria | **P2** |
| Classificação | arquitetural |
| Documentos afetados | Arquitetura Consolidada |
| Dependências | BP-002 |
| Conhecimento produzido | Se services são necessários ou se a arquitetura deve ser revisada |
| Recomendação | Decidir: fortalecer camada de services ou revisar arquitetura para refletir a realidade |

---

### BP-024 — Experiência incompleta — certificação nota 6.5/10

| Campo | Valor |
|---|---|
| Nome | Certificação da Experiência P23 tem cobertura e testabilidade baixas |
| Descrição | Avaliação: 6.5/10 em completude, 5.5/10 em testabilidade. Lacunas permitem desvios futuros. |
| Origem | P24 (PEND-011) |
| Categoria | **P2** |
| Classificação | experiência |
| Documentos afetados | CERTIFICACAO_DA_EXPERIENCIA.md |
| Dependências | BP-003, BP-004, BP-008 |
| Conhecimento produzido | Padrão mínimo de certificação que garante consistência |
| Recomendação | Revisar certificação para aumentar completude e testabilidade |

---

### BP-025 — Microinterações não implementadas

| Campo | Valor |
|---|---|
| Nome | Centenas de microinterações especificadas não existem |
| Descrição | Transições entre estados visuais da IA (E1-E7) não têm máquina de estados documentada (L7). Animações, feedbacks visuais não implementados. |
| Origem | P23/P24 (fundido: PEND-013 + L7) |
| Categoria | **P2** |
| Classificação | visual |
| Documentos afetados | MICROINTERACOES.md, ARQUITETURA_VISUAL_DA_CONVERSA.md |
| Dependências | BP-003 |
| Conhecimento produzido | Quais microinterações têm maior impacto na percepção de inteligência |
| Recomendação | Implementar gradualmente começando pelas de maior impacto. Adicionar máquina de estados com transições. |

---

### BP-026 — Onboarding do Mapa Cognitivo não especificado

| Campo | Valor |
|---|---|
| Nome | Empresário não descobre o mapa cognitivo sozinho |
| Descrição | "Sidebar direita expansível" — mas como o empresário sabe que pode expandir? Nenhum documento descreve onboarding. |
| Origem | P23 (L3 — não coberto pelo P24) |
| Categoria | **P2** |
| Classificação | experiência |
| Documentos afetados | MAPAS_COGNITIVO_VIVO.md |
| Dependências | BP-008 |
| Conhecimento produzido | Comportamento de descoberta do empresário; taxa de adoção do mapa |
| Recomendação | Adicionar tooltip no primeiro acesso, dica visual sutil, IA menciona o mapa na primeira resposta |

---

### BP-027 — Experiência mobile não especificada

| Campo | Valor |
|---|---|
| Nome | Especificação mobile praticamente inexistente |
| Descrição | Nenhum documento P23 descreve experiência mobile em detalhe. MAPAS_COGNITIVO_VIVO dedica 3 linhas. O resto é silêncio. |
| Origem | P23 (L4 — parcialmente coberto por PEND-015) |
| Categoria | **P2** |
| Classificação | experiência |
| Documentos afetados | Múltiplos P23 |
| Dependências | BP-008, BP-025 |
| Conhecimento produzido | Se mobile é o canal principal do empresário real |
| Recomendação | Adicionar seção mobile em cada documento de experiência ou criar documento dedicado |

---

### BP-028 — Descoberta de insights pelo empresário não especificada

| Campo | Valor |
|---|---|
| Nome | Empresário não sabe que pode interagir com insights |
| Descrição | SISTEMA_DE_INSIGHTS descreve timing e posição dos insights, mas não como o empresário descobre que pode clicar/expandir. |
| Origem | P23 (L6 — não coberto pelo P24) |
| Categoria | **P2** |
| Classificação | experiência |
| Documentos afetados | SISTEMA_DE_INSIGHTS.md |
| Dependências | BP-007 (WP03) |
| Conhecimento produzido | Taxa de interação com insights; padrões de descoberta |
| Recomendação | Adicionar onboarding mínimo: tooltip no primeiro insight, microcelebração na primeira descoberta |

---

### BP-029 — Regras não-testáveis na certificação da experiência

| Campo | Valor |
|---|---|
| Nome | 8 regras da certificação não são objetivamente verificáveis |
| Descrição | Regras como "parece inteligente" não podem ser testadas objetivamente. Dificulta verificação de conformidade. |
| Origem | P24 (PEND-022) |
| Categoria | **P2** |
| Classificação | experiência |
| Documentos afetados | CERTIFICACAO_DA_EXPERIENCIA.md |
| Dependências | Nenhuma |
| Conhecimento produzido | Critérios objetivos para avaliar experiência |
| Recomendação | Refinar regras subjetivas para serem testáveis: "tempo médio de resposta <2s" vs "resposta rápida" |

---

### BP-030 — Engines com responsabilidades sobrepostas

| Campo | Valor |
|---|---|
| Nome | 5+ engines com funções duplicadas ou sobrepostas |
| Descrição | Auditoria arquitetural revelou engines sem justificativa cognitiva clara. Processamento redundante. |
| Origem | P24 (PEND-023) |
| Categoria | **P2** |
| Classificação | arquitetural |
| Documentos afetados | Motor Cognitivo |
| Dependências | BP-002 |
| Conhecimento produzido | Quais engines são realmente necessárias; grafo real de dependências |
| Recomendação | Consolidar engines com responsabilidades sobrepostas. Aplicar Lei 7 (checklist de justificativa cognitiva). |

---

### BP-031 — Mecanismo de feedback do empresário ausente

| Campo | Valor |
|---|---|
| Nome | Empresário não tem como dar feedback sobre hipóteses da IA |
| Descrição | Nenhum mecanismo para corrigir hipótese errada, sugerir tema, ou reportar problema. IA não melhora com uso. |
| Origem | P23 (L8 — não coberto pelo P24) |
| Categoria | **P2** |
| Classificação | implementação |
| Documentos afetados | SISTEMA_DE_INSIGHTS.md, EXPERIENCIA_COGNITIVA.md |
| Dependências | BP-007 (WP03) |
| Conhecimento produzido | Taxa de correção necessária das hipóteses da IA; principais erros |
| Recomendação | Implementar botão "isso não está certo" em cada hipótese. Coletar feedback para aprendizado do motor. |

---

### BP-032 — Experiência sensorial não implementada

| Campo | Valor |
|---|---|
| Nome | Sons, vibração, timing de transições não existem |
| Descrição | Especificação sensorial completa sem nenhum elemento na interface atual. |
| Origem | P24 (PEND-015) |
| Categoria | **P3** |
| Classificação | visual |
| Documentos afetados | EXPERIENCIA_SENSORIAL.md |
| Dependências | BP-025 |
| Conhecimento produzido | Se sons sutis aumentam percepção de "sistema vivo" (H-022) |
| Recomendação | Implementar após microinterações base. Sons opt-in, desligados por padrão. |

---

### BP-033 — Nomenclatura divergente entre documentos

| Campo | Valor |
|---|---|
| Nome | Mesmo conceito com nomes diferentes em documentos diferentes |
| Descrição | "Empresa/Financeiro/Clientes/Equipe/Operação" vs "19 conceitos ontológicos"; relação 5 áreas × 19 conceitos não explicitada. "Centro da experiência" vs "chat como centro" (C7). |
| Origem | P24 (fundido: PEND-025 + C2 + C7) |
| Categoria | **P3** |
| Classificação | documental |
| Documentos afetados | Múltiplos |
| Dependências | Nenhuma |
| Conhecimento produzido | Vocabulário unificado da Ponte Digital |
| Recomendação | Usar terminologia do Catálogo. Explicitar relação 5 áreas → 19 conceitos. Reformular C7: "mapa é centro semântico, chat é centro operacional". |

---

### BP-034 — Pós-jornada (após 7 dias) não definida

| Campo | Valor |
|---|---|
| Nome | Experiência pós-primeira semana é indefinida |
| Descrição | RELATORIO_FINAL descreve "primeira semana estruturada" mas não o que acontece depois. Como a relação evolui? |
| Origem | P23 (L5 — não coberto pelo P24) |
| Categoria | **P3** |
| Classificação | experiência |
| Documentos afetados | EXPERIENCIA_COGNITIVA.md, RELATORIO_FINAL.md |
| Dependências | BP-007 (WP02) |
| Conhecimento produzido | Padrões de engajamento de longo prazo |
| Recomendação | Adicionar seção de pós-jornada em EXPERIENCIA_COGNITIVA.md |

---

### BP-035 — Documentos sem owner definido

| Campo | Valor |
|---|---|
| Nome | Documentos fundacionais sem responsável ou data de revisão |
| Descrição | Muitos documentos não têm owner, data de última revisão ou próxima revisão agendada. Risco de obsolescência. |
| Origem | P24 (PEND-019) |
| Categoria | **P3** |
| Classificação | governança |
| Documentos afetados | Vários documentos fundacionais |
| Dependências | Nenhuma |
| Conhecimento produzido | Quem é responsável por cada documento |
| Recomendação | Atribuir owner a cada documento fundacional. Definir periodicidade de revisão. |

---

### BP-036 — Cache in-memory vs ADR-014 desatualizado

| Campo | Valor |
|---|---|
| Nome | ADR-014 diz cache é futuro, mas cache já existe no código |
| Descrição | Cache in-memory implementado em `lib/cache.ts`, usado por 4 engines. ADR-014 ainda marca cache como "Futuro/Fase 4". Documento desatualizado. |
| Origem | P24 (CERTIFICACAO_ARQUITETURAL Tipo E) |
| Categoria | **P3** |
| Classificação | documental |
| Documentos afetados | ADR-014 |
| Dependências | Nenhuma |
| Conhecimento produzido | Política de atualização de ADRs |
| Recomendação | Atualizar ADR-014 para refletir que cache in-memory já existe. Decidir se ADR deve ser pré-código ou pós-código. |

---

### BP-037 — TenantId vs empresaId: inconsistência de nomenclatura

| Campo | Valor |
|---|---|
| Nome | Modelos Event/DeadLetter usam tenantId em vez de empresaId |
| Descrição | Padrão da Constituição é empresaId. Alguns modelos usam tenantId. Inconsistência que pode gerar falhas de isolamento. |
| Origem | P24 (CERTIFICACAO_ARQUITETURAL Tipo C) |
| Categoria | **P3** |
| Classificação | implementação |
| Documentos afetados | CONSTITUICAO_DA_ENGENHARIA.md, schema.prisma |
| Dependências | Nenhuma |
| Conhecimento produzido | Impacto real da inconsistência no isolamento entre empresas |
| Recomendação | Unificar nomenclatura para empresaId em todos os modelos |

---

### BP-038 — engine/index.ts com side-effects na inicialização

| Campo | Valor |
|---|---|
| Nome | Engine index.ts inicializa subscribers no import |
| Descrição | Side-effects em imports violam boas práticas. Inicialização não explícita pode causar comportamento imprevisível. |
| Origem | P24 (CERTIFICACAO_ARQUITETURAL Tipo C) |
| Categoria | **P3** |
| Classificação | arquitetural |
| Documentos afetados | engine/index.ts |
| Dependências | BP-002 |
| Conhecimento produzido | Padrão seguro de inicialização de engines |
| Recomendação | Criar ADR para initialização explícita vs side-effects. Refatorar engine/index.ts. |

---

### BP-039 — Variabilidade linguística não especificada

| Campo | Valor |
|---|---|
| Nome | Frases fixas em português sem i18n/l10n |
| Descrição | IDENTIDADE_DA_INTELIGENCIA especifica frases exatas em português. Sem variação para outros dialetos ou idiomas. |
| Origem | P23 (L9 — não coberto pelo P24) |
| Categoria | **P4** |
| Classificação | documental |
| Documentos afetados | IDENTIDADE_DA_INTELIGENCIA.md |
| Dependências | Nenhuma |
| Conhecimento produzido | Necessidade real de internacionalização |
| Recomendação | Adicionar nota de localização ou criar template parametrizado. Pós-validação 100 fundadores. |

---

### BP-040 — Agenda como capacidade ausente

| Campo | Valor |
|---|---|
| Nome | Capacidade de Agenda prevista no MVP_SCOPE não existe |
| Descrição | MVP_SCOPE.md lista Agenda como capacidade. Não implementada. Gap real de escopo ativo. |
| Origem | P24 (CERTIFICACAO_ARQUITETURAL Tipo D) |
| Categoria | **P4** |
| Classificação | implementação |
| Documentos afetados | MVP_SCOPE.md |
| Dependências | Nenhuma |
| Conhecimento produzido | Se agenda é funcionalidade crítica para o empresário |
| Recomendação | Avaliar prioridade da Agenda com Empresa Zero. Implementar se validado. |

---

## Tabelas Resumo

### Total por Categoria P0-P4

| Categoria | Quantidade | IDs |
|---|---|---|
| **P0** — Bloqueia operação | 13 | BP-001 a BP-013 |
| **P1** — Bloqueia aprendizado | 8 | BP-014 a BP-021 |
| **P2** — Melhora experiência | 10 | BP-022 a BP-031 |
| **P3** — Melhora arquitetura | 8 | BP-032 a BP-038 (excluindo BP-039,40 como P4) |
| **P4** — Pode esperar | 2 | BP-039, BP-040 |
| **Total** | **40** | BP-001 a BP-040 |

Wait — BP-032 (experiência sensorial) is P3, BP-033 (nomenclatura) is P3, BP-034 (pós-jornada) is P3, BP-035 (docs sem owner) is P3, BP-036 (cache ADR) is P3, BP-037 (tenantId) is P3, BP-038 (side-effects) is P3, BP-039 (i18n) is P4, BP-040 (agenda) is P4.

Let me recount:
- P0: BP-001, BP-002, BP-003, BP-004, BP-005, BP-006, BP-007, BP-008, BP-009, BP-010, BP-011, BP-012, BP-013 = 13
- P1: BP-014, BP-015, BP-016, BP-017, BP-018, BP-019, BP-020, BP-021 = 8
- P2: BP-022, BP-023, BP-024, BP-025, BP-026, BP-027, BP-028, BP-029, BP-030, BP-031 = 10
- P3: BP-032, BP-033, BP-034, BP-035, BP-036, BP-037, BP-038 = 7
- P4: BP-039, BP-040 = 2

Total: 13+8+10+7+2 = 40 ✓

### Total por Categoria P0-P4

| Categoria | Quantidade | IDs |
|---|---|---|
| **P0** — Bloqueia operação | 13 | BP-001 a BP-013 |
| **P1** — Bloqueia aprendizado | 8 | BP-014 a BP-021 |
| **P2** — Melhora experiência | 10 | BP-022 a BP-031 |
| **P3** — Melhora arquitetura | 7 | BP-032 a BP-038 |
| **P4** — Pode esperar | 2 | BP-039, BP-040 |
| **Total** | **40** | |

### Total por Classificação

| Classificação | Quantidade | IDs |
|---|---|---|
| **Implementação** | 16 | BP-003, BP-004, BP-006, BP-007, BP-008, BP-010, BP-011, BP-012, BP-013, BP-015, BP-016, BP-017, BP-025, BP-031, BP-037, BP-040 |
| **Documental** | 5 | BP-001, BP-021, BP-022, BP-033, BP-036, BP-039 |
| **Arquitetural** | 7 | BP-002, BP-005, BP-023, BP-030, BP-038 |
| **Experiência** | 7 | BP-014, BP-024, BP-026, BP-027, BP-028, BP-029, BP-034 |
| **Governança** | 3 | BP-019, BP-020, BP-035 |
| **Cognitivo** | 2 | BP-009, BP-018 |
| **Visual** | 2 | BP-032 |

Hmm, I listed 7 for arquitetural but the IDs don't match count. Let me recount: BP-002, BP-005, BP-023, BP-030, BP-038 = 5. And I said 7. Let me fix: 5 arquiteturais + 1 documental extra.

Actually let me just recount all:
- Implementação (16): BP-003, BP-004, BP-006, BP-007, BP-008, BP-010, BP-011, BP-012, BP-013, BP-015, BP-016, BP-017, BP-025, BP-031, BP-037, BP-040 = 16
- Documental (6): BP-001, BP-021, BP-022, BP-033, BP-036, BP-039 = 6
- Arquitetural (5): BP-002, BP-005, BP-023, BP-030, BP-038 = 5
- Experiência (7): BP-014, BP-024, BP-026, BP-027, BP-028, BP-029, BP-034 = 7
- Governança (3): BP-019, BP-020, BP-035 = 3
- Cognitivo (2): BP-009, BP-018 = 2
- Visual (1): BP-032 = 1

Total: 16+6+5+7+3+2+1 = 40 ✓

---

## Observações da Consolidação

### Duplicações fundidas

| Pendência Original | Nova ID | Motivo da fusão |
|---|---|---|
| PEND-002 + I1 + I5 | BP-002 | Mesmo problema: Motor Cognitivo docs vs código |
| PEND-003 + C5 | BP-003 | Loading: spinner genérico + divergência LOADING/A_ESPERA |
| PEND-004 + R1 + C3 | BP-004 | Confiança: ausência + regra conflitante + thresholds |
| PEND-005 + I4 | BP-005 | Cobertura tech + perfil ETD vs real |
| PEND-006 + I2 | BP-006 | Continuidade entre sessões + contexto limitado |
| PEND-007 + WPs P23 | BP-007 | 4 WPs P0 bloqueados |
| PEND-012 + WP01 + C1 | BP-008 | Mapa Cognitivo |
| PEND-014 + C4 + I3 | BP-021 | Gamificação: existe ou não? |
| PEND-025 + C2 + C7 | BP-033 | Nomenclatura divergente |
| PEND-013 + L7 | BP-025 | Microinterações + transições |

### Conflitos resolvidos

| Conflito | Resolução |
|---|---|
| PEND-010 (5 violações) vs PEND-003/PEND-004 | PEND-010 é meta-item. Mantido como BP-010 para rastreamento. BP-003 e BP-004 são as pendências específicas. |
| PEND-014 (gamificação ausente) vs C4 (gamificação contradição) | C4 precisa ser resolvido primeiro (BP-021). PEND-014 é consequência. |
| CERTIFICACAO_CIENTIFICA cita CONSTITUIÇÃO vs PEND-001 diz não encontrado | BP-001 investiga contradição entre certificações. |

### Itens novos não presentes nas 25 pendências originais do P24

| Item | Origem | Nova ID |
|---|---|---|
| Fallback do motor cognitivo | P23 L2 | BP-011 |
| Middleware de autenticação ausente | C-17, Tipo D | BP-012 |
| Soft delete incompleto | Tipo C, CP-08 | BP-013 |
| Métricas de sucesso | P23 L1 | BP-014 |
| Onboarding do mapa | P23 L3 | BP-026 |
| Experiência mobile | P23 L4 | BP-027 |
| Descoberta de insights | P23 L6 | BP-028 |
| Feedback do empresário | P23 L8 | BP-031 |
| Pós-jornada indefinida | P23 L5 | BP-034 |
| Cache vs ADR-014 | Tipo E | BP-036 |
| TenantId vs empresaId | Tipo C | BP-037 |
| Side-effects engine/index.ts | Tipo C | BP-038 |
| Variabilidade linguística | P23 L9 | BP-039 |
| Agenda como capacidade | Tipo D | BP-040 |

---

## Plano de Ação Recomendado

| Lote | IDs | Foco |
|---|---|---|
| Imediato (P0) | BP-001 a BP-013 | Desbloquear operação. Resolver gaps de segurança, fundação documental, motor cognitivo. |
| Curto prazo (P1) | BP-014 a BP-021 | Desbloquear aprendizado. Capturar baselines, resolver contradições, viabilizar experimentos. |
| Médio prazo (P2) | BP-022 a BP-031 | Melhorar experiência. Onboarding, mobile, feedback, microinterações. |
| Longo prazo (P3) | BP-032 a BP-038 | Melhorar arquitetura. Nomenclatura, débitos técnicos, engines sobrepostas. |
| Futuro (P4) | BP-039, BP-040 | Pós-validação 100 fundadores. |

---

*Documento consolidado em 26/07/2026 como parte do Programa 25.*
*40 pendências no backlog. 13 bloqueiam operação. 8 bloqueiam aprendizado.*
