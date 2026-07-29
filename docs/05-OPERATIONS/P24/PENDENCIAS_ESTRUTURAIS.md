# Pendências Estruturais

## Catálogo Oficial de Pendências

Todas as pendências estruturais identificadas durante os Programas 21, 22 e 23, e certificadas no Programa 24.

---

### PEND-001 — Constituição da Engenharia não encontrada

| Campo | Valor |
|---|---|
| Título | Documento "CONSTITUICAO_DA_ENGENHARIA.md" não encontrado no sistema |
| Descrição | O documento é referenciado como fundacional mas não existe em disco. A certificação da governança não pôde auditá-lo. |
| Origem | P24 - Certificação da Governança |
| Tipo | governança |
| Gravidade | crítica |
| Impacto | Bloqueia certificação da governança. Sem constituição, não há documento basal para comparar. |
| Documentos afetados | CONSTITUICAO_DA_ENGENHARIA.md (referenciado, ausente), CERTIFICACAO_DA_GOVERNANCA.md |
| Dependências | Nenhuma |
| Recomendação | Criar o documento ou remover todas as referências a ele |
| Prioridade | P0 |

### PEND-002 — Motor Cognitivo: documentação vs código divergem

| Campo | Valor |
|---|---|
| Título | Documentação do Motor Cognitivo diz "congelado", código tem 58 engines ativos |
| Descrição | A documentação descreve um motor consolidado, mas o código revela 58 engines com responsabilidades sobrepostas. Divergência documental × realidade. |
| Origem | P24 - Certificação da Governança |
| Tipo | arquitetural |
| Gravidade | crítica |
| Impacto | Bloqueia qualquer certificação da implementação. Não se sabe o que é especificação vs o que é realidade. |
| Documentos afetados | Arquitetura Consolidada, Motor Cognitivo |
| Dependências | PEND-001 |
| Recomendação | Auditar as 58 engines, documentar cada uma, alinhar documentação com código |
| Prioridade | P0 |

### PEND-003 — Loading inteligente: spinner genérico

| Campo | Valor |
|---|---|
| Título | Loading inteligente implementado como spinner genérico |
| Descrição | Manifesto da Experiência diz "Toda espera é narrativa" (Princípio 2). A implementação atual usa spinner genérico sem texto de processo. |
| Origem | P24 - Certificação da Implementação (V01) |
| Tipo | visual |
| Gravidade | crítica |
| Impacto | Viola o Manifesto da Experiência. Empresário não percebe inteligência durante espera. |
| Documentos afetados | MANIFESTO_DA_EXPERIENCIA.md, LOADING_INTELIGENTE.md |
| Dependências | Nenhuma |
| Recomendação | Implementar loading inteligente conforme especificação P23 (7 fases do Motor Cognitivo) |
| Prioridade | P0 |

### PEND-004 — Confiança não exibida na interface

| Campo | Valor |
|---|---|
| Título | Indicador de confiança da IA não está visível |
| Descrição | A Certificação da Experiência define confiança como elemento obrigatório. A implementação atual não exibe confiança. |
| Origem | P24 - Certificação da Implementação (V04) |
| Tipo | visual |
| Gravidade | crítica |
| Impacto | Empresário não sabe o quanto confiar nas respostas da IA. Experiência perde transparência. |
| Documentos afetados | CERTIFICACAO_DA_EXPERIENCIA.md, SISTEMA_DE_CONFIANCA_VISUAL.md |
| Dependências | PEND-002 (engine precisa calcular confiança) |
| Recomendação | Implementar anel/barra de confiança conforme especificado |
| Prioridade | P0 |

### PEND-005 — Motor Cognitivo sem perguntas para empresa de tecnologia

| Campo | Valor |
|---|---|
| Título | Domínio do Motor Cognitivo não cobre empresas de tecnologia/software |
| Descrição | Motor foi projetado para empresas tradicionais (comércio, serviços, indústria). Empresas de tecnologia têm dinâmicas diferentes. |
| Origem | P24 - Certificação da Empresa Zero |
| Tipo | arquitetural |
| Gravidade | crítica |
| Impacto | Empresa Zero (a própria Ponte) não consegue se auto-diagnosticar. Bloqueia Certificação da Empresa Zero. |
| Documentos afetados | Motor Cognitivo, CERTIFICACAO_EMPRESA_ZERO.md |
| Dependências | PEND-002 |
| Recomendação | Expandir modelo de domínio para incluir tech/software |
| Prioridade | P0 |

### PEND-006 — Continuidade entre sessões não implementada

| Campo | Valor |
|---|---|
| Título | Acumulação de conhecimento entre sessões não existe |
| Descrição | Cada sessão começa praticamente do zero. Não há patrimônio cognitivo acumulado. |
| Origem | P24 - Certificação da Empresa Zero |
| Tipo | implementação |
| Gravidade | alta |
| Impacto | Empresa Zero não acumula conhecimento sobre si mesma. Retorno não tem contexto. |
| Documentos afetados | EXPERIENCIA_COGNITIVA.md, A_ESPERA_INTELIGENTE.md |
| Dependências | PEND-002 |
| Recomendação | Implementar mecanismo de continuidade entre sessões |
| Prioridade | P0 |

### PEND-007 — 4 WPs P0 do Roadmap P23 bloqueados

| Campo | Valor |
|---|---|
| Título | Work Packages P0 do P23 não implementados conforme especificação |
| Descrição | Mapa Cognitivo, Jornada 7 dias, Motor Insights, Landing Page — nenhum implementado conforme especificado no P23. |
| Origem | P24 - Matriz de Rastreabilidade |
| Tipo | implementação |
| Gravidade | alta |
| Impacto | Experiência core da Ponte Digital não está implementada. Produto não corresponde à especificação. |
| Documentos afetados | ROADMAP_IMPLEMENTACAO_P23.md, múltiplos documentos P23 |
| Dependências | PEND-002, PEND-003, PEND-004 |
| Recomendação | Priorizar implementação dos 4 WPs P0 |
| Prioridade | P0 |

### PEND-008 — Serviços (Services) praticamente inexistentes

| Campo | Valor |
|---|---|
| Título | Camada de serviços tem cobertura de apenas 7% |
| Descrição | A Matriz de Rastreabilidade mostra que a camada de Services tem cobertura quase zero. A lógica está nas engines ou nos componentes. |
| Origem | P24 - Matriz de Rastreabilidade |
| Tipo | arquitetural |
| Gravidade | alta |
| Impacto | Arquitetura não segue o padrão documentado. Dificulta manutenção e evolução. |
| Documentos afetados | Arquitetura Consolidada |
| Dependências | PEND-002 |
| Recomendação | Decidir se services são necessários ou se a arquitetura deve ser revisada |
| Prioridade | P1 |

### PEND-009 — Telas com cobertura baixa (52%)

| Campo | Valor |
|---|---|
| Título | Telas têm apenas 52% de cobertura na rastreabilidade |
| Descrição | Menos da metade das funcionalidades especificadas têm tela implementada. |
| Origem | P24 - Matriz de Rastreabilidade |
| Tipo | implementação |
| Gravidade | alta |
| Impacto | Usuário não vê a maior parte do que foi especificado para a experiência. |
| Documentos afetados | Múltiplos documentos P23 |
| Dependências | PEND-007 |
| Recomendação | Priorizar implementação de telas para funcionalidades P0 |
| Prioridade | P1 |

### PEND-010 — 5 violações do Manifesto da Experiência

| Campo | Valor |
|---|---|
| Título | Manifesto da Experiência violado em 5 pontos |
| Descrição | A implementação atual viola 5 princípios do Manifesto: loading genérico, confiança ausente, etc. |
| Origem | P24 - Certificação da Implementação |
| Tipo | implementação |
| Gravidade | alta |
| Impacto | Experiência real contradiz a identidade documentada da Ponte Digital. |
| Documentos afetados | MANIFESTO_DA_EXPERIENCIA.md |
| Dependências | PEND-003, PEND-004 |
| Recomendação | Corrigir cada violação |
| Prioridade | P0 |

### PEND-011 — Experiência incompleta: nota 6.5/10

| Campo | Valor |
|---|---|
| Título | Certificação da Experiência P23 tem cobertura incompleta |
| Descrição | Avaliação da certificação existente: 6.5/10 em completude, 5.5/10 em testabilidade. |
| Origem | P24 - Certificação da Experiência |
| Tipo | experiência |
| Gravidade | alta |
| Impacto | Lacunas na certificação permitem que implementações futuras desviem da identidade. |
| Documentos afetados | CERTIFICACAO_DA_EXPERIENCIA.md (P23) |
| Dependências | Nenhuma |
| Recomendação | Revisar certificação para aumentar completude e testabilidade |
| Prioridade | P1 |

### PEND-012 — Falta Mapa Cognitivo Vivo na interface

| Campo | Valor |
|---|---|
| Título | Mapa Cognitivo Vivo especificado mas não implementado |
| Descrição | Painel vivo que mostra aprendizado em tempo real durante conversa não existe na interface. |
| Origem | P23, P24 |
| Tipo | implementação |
| Gravidade | alta |
| Impacto | Empresário não vê inteligência sendo construída. Perde o principal diferencial da experiência. |
| Documentos afetados | MAPAS_COGNITIVO_VIVO.md |
| Dependências | PEND-002, PEND-004 |
| Recomendação | Implementar painel cognitivo |
| Prioridade | P0 |

### PEND-013 — Microinterações não implementadas

| Campo | Valor |
|---|---|
| Título | Microinterações especificadas no P23 não existem na interface |
| Descrição | Centenas de microinterações (transições, animações, feedbacks) não foram implementadas. |
| Origem | P23 |
| Tipo | visual |
| Gravidade | média |
| Impacto | Experiência parece genérica, sem os detalhes que comunicam inteligência. |
| Documentos afetados | MICROINTERACOES.md |
| Dependências | PEND-003 |
| Recomendação | Implementar microinterações gradualmente, começando pelas de maior impacto |
| Prioridade | P2 |

### PEND-014 — Gamificação cognitiva ausente

| Campo | Valor |
|---|---|
| Título | Indicadores de gamificação cognitiva não implementados |
| Descrição | Nível de Conhecimento, Índice de Clareza, etc. — nenhum implementado na interface. |
| Origem | P23 |
| Tipo | implementação |
| Gravidade | média |
| Impacto | Empresário não tem visibilidade do próprio progresso cognitivo. |
| Documentos afetados | GAMIFICACAO_COGNITIVA.md |
| Dependências | PEND-004 |
| Recomendação | Implementar indicadores mais simples primeiro (cobertura, confiança) |
| Prioridade | P2 |

### PEND-015 — Experiência sensorial não implementada

| Campo | Valor |
|---|---|
| Título | Sons, vibração, timing de transições não implementados |
| Descrição | A especificação sensorial completa não tem nenhum elemento na interface atual. |
| Origem | P23 |
| Tipo | visual |
| Gravidade | baixa |
| Impacto | Experiência menos rica, mas não bloqueia funcionalidade core. |
| Documentos afetados | EXPERIENCIA_SENSORIAL.md |
| Dependências | PEND-013 |
| Recomendação | Implementar após microinterações base |
| Prioridade | P3 |

### PEND-016 — 61.5% do conhecimento é "ACREDITAMOS"

| Campo | Valor |
|---|---|
| Título | Maioria do conhecimento fundacional não tem validação empírica |
| Descrição | A Certificação Científica revelou que 61.5% das afirmações são "ACREDITAMOS" (hipóteses não validadas). |
| Origem | P24 - Certificação Científica |
| Tipo | cognitivo |
| Gravidade | alta |
| Impacto | Fundação baseada majoritariamente em hipóteses. Risco de decisões erradas. |
| Documentos afetados | Múltiplos |
| Dependências | Nenhuma |
| Recomendação | Iniciar validação com Empresa Zero (Lote 1: imediato). |
| Prioridade | P0 |

### PEND-017 — 8.3% do conhecimento é "NÃO SABEMOS"

| Campo | Valor |
|---|---|
| Título | Afirmações sem qualquer base |
| Descrição | 8.3% das afirmações são suposições sem evidência nem hipótese formal. |
| Origem | P24 - Certificação Científica |
| Tipo | cognitivo |
| Gravidade | média |
| Impacto | Risco de implementar funcionalidades baseadas em suposição. |
| Documentos afetados | Múltiplos |
| Dependências | PEND-016 |
| Recomendação | Transformar em hipóteses formais ou remover |
| Prioridade | P1 |

### PEND-018 — ADRs aceitas não implementadas

| Campo | Valor |
|---|---|
| Título | 9 ADRs aceitas não têm implementação correspondente |
| Descrição | A certificação arquitetural identificou ADRs aceitas mas não refletidas no código. |
| Origem | P24 - Certificação Arquitetural |
| Tipo | governança |
| Gravidade | alta |
| Impacto | Decisões arquiteturais aprovadas não estão sendo executadas. |
| Documentos afetados | ADRs |
| Dependências | PEND-002 |
| Recomendação | Revisar ADRs e implementar ou reverter |
| Prioridade | P1 |

### PEND-019 — Documentos sem owner definido

| Campo | Valor |
|---|---|
| Título | Documentos fundacionais sem owner ou data de revisão |
| Descrição | Muitos documentos não têm owner, data de última revisão ou próxima revisão agendada. |
| Origem | P24 - Certificação da Governança |
| Tipo | governança |
| Gravidade | média |
| Impacto | Documentos podem ficar obsoletos sem que ninguém seja responsável. |
| Documentos afetados | Vários |
| Dependências | Nenhuma |
| Recomendação | Atribuir owner a cada documento fundacional |
| Prioridade | P2 |

### PEND-020 — Governança aprovada em 5.8/10

| Campo | Valor |
|---|---|
| Título | Certificação da Governança com nota 5.8 |
| Descrição | A governança em vigor não está plenamente alinhada com os demais pilares da Ponte Digital. |
| Origem | P24 - Certificação da Governança |
| Tipo | governança |
| Gravidade | alta |
| Impacto | Risco de decisões não alinhadas com a visão fundacional. |
| Documentos afetados | Múltiplos |
| Dependências | PEND-001, PEND-018 |
| Recomendação | Fortalecer mecanismos de governança pós-congelamento |
| Prioridade | P1 |

### PEND-021 — Checklist de experiência com 50.5% de cobertura

| Campo | Valor |
|---|---|
| Título | Checklist de certificação cobre apenas 50.5% da especificação |
| Descrição | Dos ~200 itens da experiência, apenas 97 estão cobertos pela implementação. 99 não localizados. |
| Origem | P24 - CHECKLIST_CERTIFICACAO.md |
| Tipo | implementação |
| Gravidade | alta |
| Impacto | Metade da experiência especificada não existe na implementação. |
| Documentos afetados | Múltiplos P23 |
| Dependências | PEND-007 |
| Recomendação | Implementar itens não cobertos, começando pelos P0 |
| Prioridade | P1 |

### PEND-022 — 8 regras não-testáveis na certificação

| Campo | Valor |
|---|---|
| Título | Regras da certificação da experiência não são objetivamente verificáveis |
| Descrição | A Certificação da Experiência tem regras que não podem ser testadas objetivamente (ex: "parece inteligente"). |
| Origem | P24 - Certificação da Experiência |
| Tipo | experiência |
| Gravidade | média |
| Impacto | Dificuldade em verificar se a experiência está conforme especificação. |
| Documentos afetados | CERTIFICACAO_DA_EXPERIENCIA.md |
| Dependências | Nenhuma |
| Recomendação | Refinar regras para serem testáveis |
| Prioridade | P2 |

### PEND-023 — 5 engines sobrepostas sem dono

| Campo | Valor |
|---|---|
| Título | Engines com responsabilidades sobrepostas no Motor Cognitivo |
| Descrição | A auditoria arquitetural revelou engines com funções duplicadas ou sobrepostas. |
| Origem | P24 - Certificação Arquitetural |
| Tipo | arquitetural |
| Gravidade | média |
| Impacto | Processamento redundante, resultados inconsistentes. |
| Documentos afetados | Motor Cognitivo |
| Dependências | PEND-002 |
| Recomendação | Consolidar engines com responsabilidades sobrepostas |
| Prioridade | P2 |

### PEND-024 — Implementação da experiência sem rastro

| Campo | Valor |
|---|---|
| Título | Documentos P23 sem rastro na implementação |
| Descrição | Vários documentos da experiência não têm correspondência identificável no código. |
| Origem | P24 - CHECKLIST_CERTIFICACAO.md |
| Tipo | implementação |
| Gravidade | alta |
| Impacto | Esforço de especificação não se traduziu em implementação. |
| Documentos afetados | Múltiplos P23 |
| Dependências | PEND-007 |
| Recomendação | Priorizar alinhamento implementação × especificação |
| Prioridade | P1 |

### PEND-025 — Nomenclatura divergente entre docs

| Campo | Valor |
|---|---|
| Título | Mesmo conceito com nomes diferentes em documentos diferentes |
| Descrição | A certificação terminológica identificou termos duplicados/divergentes. Catálogo resolve mas divergências persistem nos documentos originais. |
| Origem | P24 - Certificação Terminológica |
| Tipo | terminológico |
| Gravidade | média |
| Impacto | Confusão conceitual ao navegar pelos documentos. |
| Documentos afetados | Múltiplos |
| Dependências | Nenhuma |
| Recomendação | Revisar documentos para usar terminologia unificada do Catálogo |
| Prioridade | P2 |

---

## Resumo por Gravidade

| Gravidade | Quantidade | IDs |
|---|---|---|
| Crítica | 5 | PEND-001, PEND-002, PEND-003, PEND-004, PEND-005 |
| Alta | 12 | PEND-006, PEND-007, PEND-008, PEND-009, PEND-010, PEND-011, PEND-012, PEND-016, PEND-018, PEND-020, PEND-021, PEND-024 |
| Média | 6 | PEND-013, PEND-014, PEND-017, PEND-019, PEND-022, PEND-023, PEND-025 |
| Baixa | 1 | PEND-015 |

**Total: 25 pendências** (5 críticas, 12 altas, 7 médias, 1 baixa)

---

## Prioridade de Correção

| Lote | IDs | Prazo |
|---|---|---|
| Lote 1 (P0 — imediato) | PEND-001, PEND-002, PEND-003, PEND-004, PEND-005, PEND-010 | Antes do próximo programa |
| Lote 2 (P1 — curto prazo) | PEND-006, PEND-007, PEND-011, PEND-012, PEND-016, PEND-018, PEND-020, PEND-021, PEND-024 | Próximo programa |
| Lote 3 (P2 — médio prazo) | PEND-008, PEND-009, PEND-013, PEND-014, PEND-017, PEND-019, PEND-022, PEND-023, PEND-025 | Até final do trimestre |
| Lote 4 (P3 — longo prazo) | PEND-015 | Próximo semestre |
