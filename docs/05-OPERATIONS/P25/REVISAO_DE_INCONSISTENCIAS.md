# REVISÃO DE INCONSISTÊNCIAS — Auditoria Geral da Ponte Digital

**Programa 25 | Revisão de Consistência | 26/07/2026**

> Revisão completa de todas as inconsistências identificadas na auditoria do P24 (AUDITORIA_COMPLETA_P23.md e CERTIFICACAO_ARQUITETURAL.md).
> Separadas em: confirmadas, resolvidas, falsas e novas.

---

## 1. Inconsistências Confirmadas (ainda válidas)

### INC-001 — Motor Cognitivo: documentação diz "consolidado", código tem 55+ engines

| Campo | Valor |
|---|---|
| Descrição original | I1 (P23): "Motor Cognitivo existe ou não?" — P23 assume motor operacional. CURRENT_PRODUCT diz "CONGELADO". Código tem engines mas não implementam ciclo completo. |
| Ainda é válida? | **Sim** |
| Classificação | arquitetural |
| Impacto atual | Bloqueia implementação de 5 WPs do P23. Sem motor de hipóteses, LOADING, MAPA, INSIGHTS e VALOR não podem ser implementados. |
| Pendência associada | BP-002 |

### INC-002 — Contexto acumulativo vs contexto limitado

| Campo | Valor |
|---|---|
| Descrição original | I2 (P23): P23 exige contexto acumulativo entre sessões. MVP atual tem "chat com contexto limitado". |
| Ainda é válida? | **Sim** |
| Classificação | implementação |
| Impacto atual | Funcionalidades de "cobertura acumulativa" e "mapa lembra de tudo" não podem ser implementadas. |
| Pendência associada | BP-006 |

### INC-003 — Três thresholds de confiança conflitantes (20%, 40%, >50%)

| Campo | Valor |
|---|---|
| Descrição original | C3 (P23): SISTEMA_DE_INSIGHTS diz ≥20% para sugerir. SISTEMA_DE_VALOR diz 40% para WOW e >50% em outra seção. Três valores para o mesmo conceito. |
| Ainda é válida? | **Sim** — os documentos não foram corrigidos |
| Classificação | documental |
| Impacto atual | Implementação não tem referência única de threshold. Risco de inconsistência na geração de insights. |
| Pendência associada | BP-004 (já inclui a unificação de thresholds) |

### INC-004 — Gamificação existe ou não existe?

| Campo | Valor |
|---|---|
| Descrição original | C4 (P23): MANIFESTO e RELATORIO_FINAL dizem "não gamifica". GAMIFICACAO_COGNITIVA.md (29 seções) descreve gamificação. |
| Ainda é válida? | **Sim** — documento de gamificação permanece nos arquivos |
| Classificação | documental |
| Impacto atual | Decisão de produto pendente. Documento contradiz manifesto oficial. |
| Pendência associada | BP-021 |

### INC-005 — Loading vs Espera Inteligente: durações divergentes

| Campo | Valor |
|---|---|
| Descrição original | C5 (P23): LOADING diz "indeterminado". A_ESPERA diz durações específicas. Mesmo pipeline com dados conflitantes. |
| Ainda é válida? | **Sim** — documentos não foram unificados |
| Classificação | documental |
| Impacto atual | Implementação não sabe qual duração usar. Risco de implementar versão errada. |
| Pendência associada | BP-022 (desdobramento de BP-003) |

### INC-006 — Curta duração vs experiência longitudinal

| Campo | Valor |
|---|---|
| Descrição original | C1 (P23): MAPAS_COGNITIVO_VIVO diz "curta duração (30s-3min)". RELATORIO_FINAL descreve meses de relação. |
| Ainda é válida? | **Sim** |
| Classificação | documental |
| Impacto atual | Designer e implementador não têm visão unificada do ciclo de vida da experiência. |
| Pendência associada | BP-008 |

### INC-007 — Centro da experiência: mapa vs chat

| Campo | Valor |
|---|---|
| Descrição original | C7 (P23): RELATORIO_FINAL diz "mapa é centro". ARQUITETURA_VISUAL coloca chat como área principal (68% tela). |
| Ainda é válida? | **Sim** — contradição semântica não resolvida |
| Classificação | documental |
| Impacto atual | Decisão de layout pendente. Afeta prioridade de implementação. |
| Pendência associada | BP-033 |

### INC-008 — Pipeline de 6 fases vs 9 motores reais

| Campo | Valor |
|---|---|
| Descrição original | I5 (P23): Fases LOADING (Escuta, Correlação, Hipótese…) não correspondem a motores reais (pipeline-motor, segmentação, contexto…). |
| Ainda é válida? | **Sim** |
| Classificação | arquitetural |
| Impacto atual | Equipe técnica não consegue mapear especificação para motores existentes. |
| Pendência associada | BP-002 |

### INC-009 — Perfil ETD vs perfil real do empresário

| Campo | Valor |
|---|---|
| Descrição original | I4 (P23): ETD é perfil corporativo sofisticado. Jornada Fundacional descreve empresário de pequeno negócio sem familiaridade com tecnologia. |
| Ainda é válida? | **Sim** — experiência não foi simplificada |
| Classificação | arquitetural |
| Impacto atual | Risco de experiência ser rejeitada por complexidade excessiva para o perfil real. |
| Pendência associada | BP-005 |

### INC-010 — Gamificação vs princípio de sofisticação MVP

| Campo | Valor |
|---|---|
| Descrição original | I3 (P23): Badges, níveis e barras de progresso são sofisticação que contradiz PRINCIPLES.md ("MVP/pré-validação é o teto"). |
| Ainda é válida? | **Parcial** — se BP-021 (gamificação contradição) for resolvido com arquivamento da gamificação, esta inconsistência desaparece |
| Classificação | documental |
| Impacto atual | Mesmo que INC-004. Decisão de produto pendente. |
| Pendência associada | BP-021 |

### INC-011 — ADR-014: cache já existe mas ADR diz futuro

| Campo | Valor |
|---|---|
| Descrição original | Tipo E (CERT_ARQ): CONSTITUIÇÃO diz "cache in-memory já está ativo". ADR-014 diz "Futuro/Fase 4". |
| Ainda é válida? | **Sim** |
| Classificação | documental |
| Impacto atual | ADR desatualizado. Novos desenvolvedores podem receber informação errada sobre estado do cache. |
| Pendência associada | BP-036 |

### INC-012 — CONSTITUIÇÃO em localização não-padrão

| Campo | Valor |
|---|---|
| Descrição original | Tipo E (CERT_ARQ): CONSTITUIÇÃO esperada em `03-ENGINEERING/` mas está em `09-ARCHITECTURE/`. |
| Ainda é válida? | **Sim** |
| Classificação | documental |
| Impacto atual | PEND-001 reporta "não encontrado" porque buscou no local errado. Contribui para a confusão sobre existência do documento. |
| Pendência associada | BP-001 |

---

## 2. Inconsistências Resolvidas (não são mais problema)

### INC-013 — Regra IA concisa vs IA acrescenta sempre

| Campo | Valor |
|---|---|
| Descrição original | R2 (P23): MICROINTERACOES: "primeira resposta curta (<100 caracteres)". MANIFESTO: "toda resposta deve conter algo que o empresário não pediu". |
| Ainda é válida? | **Não** — resolvida por recomendação: resposta curta + 1 linha extra de insight não solicitado (<20% do texto). Recomendação aceita. |
| Classificação | documental |
| Impacto atual | Nenhum. Inconsistência tem resolução documentada. |
| Pendência associada | Nenhuma (aguarda implementação via BP-025) |

### INC-014 — 6 vs 10 badges de gamificação

| Campo | Valor |
|---|---|
| Descrição original | C6 (P23): GAMIFICACAO_COGNITIVA.md lista ora 6, ora 10 badges na mesma seção. |
| Ainda é válida? | **Não** — resolução proposta (6 badges consistentes com 5 áreas + 1 geral) é suficiente. A inconsistência é interna a um documento que provavelmente será arquivado. |
| Classificação | documental |
| Impacto atual | Mínimo. Aguarda decisão do BP-021. |
| Pendência associada | BP-021 |

### INC-015 — IA sem nome vs IA tem endereço espacial

| Campo | Valor |
|---|---|
| Descrição original | R3 (P23): IDENTIDADE diz "IA não tem nome, rosto, gênero". EXPERIENCIA_COGNITIVA diz que saudação aparece do "canto direito da tela". |
| Ainda é válida? | **Não** — resolução: posição ≠ identidade. Não há conflito real. |
| Classificação | falsa inconsistência |
| Impacto atual | Nenhum. |
| Pendência associada | Nenhuma |

---

## 3. Falsas Inconsistências (nunca foram problema real)

### INC-016 — CONSTITUIÇÃO vs ARCHITECTURE: visão futura vs estado atual

| Campo | Valor |
|---|---|
| Descrição original | C3 (CERT_ARQ seção 2.1): CONSTITUIÇÃO e ARCHITECTURE.md divergem? |
| Ainda é válida? | **Não** — ARCHITECTURE.md declara-se explicitamente como visão futura. CONSTITUIÇÃO é o documento vigente. A certificação já classificou como "consistente". |
| Classificação | falsa inconsistência |
| Impacto atual | Nenhum. Concordância documentada. |
| Pendência associada | Nenhuma |

### INC-017 — CURRENT_PRODUCT vs CONSTITUIÇÃO: divergência de fase

| Campo | Valor |
|---|---|
| Descrição original | 2.2 (CERT_ARQ): CURRENT_PRODUCT descreve realidade V4 Founder. CONSTITUIÇÃO descreve padrão ideal. |
| Ainda é válida? | **Não** — classificada como Tipo B (simplificação estratégica permitida pela fase V4 Founder). Divergência esperada e autorizada. |
| Classificação | falsa inconsistência |
| Impacto atual | Nenhum. Débito consciente. |
| Pendência associada | Nenhuma |

### INC-018 — API Routes + services sem repositories

| Campo | Valor |
|---|---|
| Descrição original | Tipo B (CERT_ARQ): "server/actions → services → repositories" vs "API Routes → services" real. |
| Ainda é válida? | **Não** — simplificação estratégica permitida pela fase (ADR-002). |
| Classificação | falsa inconsistência |
| Impacto atual | Nenhum. |
| Pendência associada | Nenhuma |

### INC-019 — 55 engines (muitas falsas)

| Campo | Valor |
|---|---|
| Descrição original | Tipo C (CERT_ARQ): Lei 7 exige checklist de justificativa cognitiva para cada engine. 55 engines existem sem justificativa. |
| Ainda é válida? | **Parcial** — a CONSTITUIÇÃO (Erro 1) já reconhece que "muitas podem ser falsas". O débito é conhecido e documentado. A inconsistência é entre o ideal (checklist) e a realidade (engines não auditadas), mas está dentro do esperado para a fase. |
| Classificação | falsa inconsistência (débito conhecido) |
| Impacto atual | Débito reconhecido. Parte do BP-002. |
| Pendência associada | BP-002 |

### INC-020 — Jornada de 7 dias vs desenvolvimento incremental

| Campo | Valor |
|---|---|
| Descrição original | I6 (P23): Jornada de 7 dias como roteiro fixo vs ARCHITECTURE.md que prega desenvolvimento incremental. |
| Ainda é válida? | **Parcial** — a própria recomendação da auditoria resolve: "Jornada como alvo final, não como primeira entrega. Implementar dia 1 primeiro, validar, depois adicionar." A inconsistência é metodológica, não de conteúdo. |
| Classificação | falsa inconsistência (resolvida por recomendação) |
| Impacto atual | Nenhum desde que a abordagem incremental seja seguida. |
| Pendência associada | BP-007 |

---

## 4. Inconsistências Novas (descobertas nesta revisão)

### INC-021 — CERTIFICACAO_CIENTIFICA cita CONSTITUIÇÃO como fonte, PEND-001 diz não encontrado

| Campo | Valor |
|---|---|
| Descrição | CERTIFICACAO_CIENTIFICA lista "CONSTITUIÇÃO: docs/09-ARCHITECTURE/CONSTITUICAO_DA_ENGENHARIA.md" como fonte auditada com 18 afirmações extraídas. PEND-001 afirma que "o documento não existe em disco". As duas certificações do mesmo programa (P24) contradizem-se. |
| Ainda é válida? | **Sim** — descoberta durante consolidação do P25 |
| Classificação | documental |
| Impacto atual | Uma das duas certificações está errada. Se CONSTITUIÇÃO existe, PEND-001 é falso. Se não existe, a CERTIFICACAO_CIENTIFICA auditou um documento inexistente. |
| Pendência associada | BP-001 |

### INC-022 — CONSTITUIÇÃO tem 18 afirmações na CERT_CIENTIFICA mas é reportada como ausente

| Campo | Valor |
|---|---|
| Descrição | Mesma raiz da INC-021. A CERTIFICACAO_CIENTIFICA afirma ter extraído 18 afirmações (C-01 a C-18) da CONSTITUICAO_DA_ENGENHARIA.md, incluindo citações textuais. Isso sugere que o documento EXISTIA no momento da auditoria. PEND-001 pode ser um falso negativo por busca em local errado. |
| Ainda é válida? | **Sim** |
| Classificação | documental |
| Impacto atual | A prioridade P0 de BP-001 pode ser reduzida se CONSTITUIÇÃO for encontrada. |
| Pendência associada | BP-001 |

### INC-023 — 4 Work Packages P0 do P23 dependem de Motor Cognitivo (congelado), mas ROADMAP diz "sem dependências"

| Campo | Valor |
|---|---|
| Descrição | ROADMAP_IMPLEMENTACAO_P23.md lista WP01 como "Dependências: Nenhuma (pode começar imediatamente)". No entanto, o WP01 (Mapa Cognitivo) requer dados do Motor Cognitivo em tempo real, que está CONGELADO. O roadmap subestima a dependência. |
| Ainda é válida? | **Sim** |
| Classificação | implementação |
| Impacto atual | Estimativas de tempo do P23 (90-120 dias) são irreais sem considerar o desbloqueio do Motor Cognitivo. |
| Pendência associada | BP-007, BP-002 |

### INC-024 — Soft delete listado como crítico na CERT_ARQ mas ausente das 25 pendências

| Campo | Valor |
|---|---|
| Descrição | CERTIFICACAO_ARQUITETURAL classifica soft delete incompleto como Tipo C (débito técnico) "Crítico". No entanto, PENDENCIAS_ESTRUTURAIS.md (25 pendências) não inclui este item. Gap de cobertura na lista oficial. |
| Ainda é válida? | **Sim** |
| Classificação | implementação |
| Impacto atual | Débito crítico sem pendência associada. Correção incluída no P25 como BP-013. |
| Pendência associada | BP-013 |

### INC-025 — Métricas de baseline (NPS, retorno, ativação) não capturadas apesar de serem pré-requisito para validação

| Campo | Valor |
|---|---|
| Descrição | CERTIFICACAO_CIENTIFICA (Anexo B) lista como prioridade máxima: "Medir baseline de ativação, NPS e retorno — sem isso, nenhuma meta do P23 é verificável". Nenhuma pendência do P24 cobriu este item. |
| Ainda é válida? | **Sim** |
| Classificação | experiência |
| Impacto atual | Sem baseline, não é possível medir impacto de nenhuma melhoria. Experimentos da Empresa Zero ficam sem referência. |
| Pendência associada | BP-014 |

### INC-026 — GAMIFICACAO_COGNITIVA.md ainda está no diretório P23 ativo

| Campo | Valor |
|---|---|
| Descrição | A auditoria P23 (C4) e a CERTIFICACAO_ARQUITETURAL (Tipo E) recomendam arquivar ou adotar o documento. Três programas depois (P23 → P24 → P25), o documento permanece no diretório ativo sem decisão formal. |
| Ainda é válida? | **Sim** |
| Classificação | documental |
| Impacto atual | A pendência mais antiga não resolvida. Documento continua gerando confusão. Ação imediata já recomendada desde o P23. |
| Pendência associada | BP-021 |

---

## 5. Resumo da Revisão

### Inconsistências por Seção

| Seção | Quantidade | IDs |
|---|---|---|
| Confirmadas (ainda válidas) | 12 | INC-001 a INC-012 |
| Resolvidas (não são mais problema) | 3 | INC-013, INC-014, INC-015 |
| Falsas inconsistências | 5 | INC-016, INC-017, INC-018, INC-019, INC-020 |
| Novas (descobertas nesta revisão) | 6 | INC-021 a INC-026 |
| **Total** | **26** | |

### Inconsistências por Classificação

| Classificação | Quantidade |
|---|---|
| Documental | 12 |
| Arquitetural | 4 |
| Implementação | 4 |
| Experiência | 1 |
| Falsa inconsistência | 5 |

---

*Documento revisado em 26/07/2026 como parte do Programa 25.*
*26 inconsistências revisadas. 12 confirmadas. 3 resolvidas. 5 falsas. 6 novas.*
