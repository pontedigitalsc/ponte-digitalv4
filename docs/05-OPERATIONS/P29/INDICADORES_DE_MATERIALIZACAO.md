# INDICADORES DE MATERIALIZAÇÃO — Sistema de Métricas

**Documento P29.5 | Arquiteto de Materialização | Julho 2026**

> Conjunto de 6 índices que medem, de forma objetiva e rastreável, o percentual de materialização da visão da Ponte Digital em software funcionante. Cada índice possui definição, fórmula, metas por fase e interpretação prática.

---

## Como ler este documento

Cada índice segue a mesma estrutura:

1. **Definição** — o que mede e por que importa
2. **Fórmula** — expressão matemática com variáveis rastreáveis
3. **Metas** — valores-alvo por fase (Empresa Zero, Primeiro Cliente, Produção)
4. **Interpretação** — o que cada faixa de valor significa
5. **Como melhorar** — ações concretas para elevar o índice
6. **Status atual** — linha de base calculada em julho/2026

---

## Índice 1 — Materialização Arquitetural (IMA)

### Definição

Percentual da arquitetura documentada que está implementada no código. Mede a fidelidade entre o que foi especificado como arquitetura e o que realmente existe como software.

### Fórmula

```
IMA = (engines e módulos documentados E implementados) / (total de engines e módulos documentados) × 100
```

**Variáveis:**
- `E_doc` = total de engines, módulos e camadas documentados nos documentos de arquitetura (P21, P24, ADRs)
- `E_imp` = subconjunto de `E_doc` que possui implementação correspondente no código (engine, service, API, componente)

### Metas

| Fase | Meta | Prazo estimado |
|------|:----:|:--------------:|
| Empresa Zero (atual) | 80% | Imediato |
| Primeiro cliente | 90% | 90 dias |
| Produção (100 clientes) | 95% | 180 dias |

### Interpretação

| Faixa | Significado |
|:-----:|-------------|
| 0–30% | Arquitetura é predominantemente teórica. Código segue caminho próprio sem documentação correspondente. |
| 31–60% | Implementação parcial com lacunas significativas. Algumas engines documentadas existem, outras não. |
| 61–80% | Maioria da arquitetura está implementada. Divergências são simplificações conscientes. |
| 81–95% | Alta fidelidade arquitetural. Documentação e código caminham juntos. |
| 96–100% | Arquitetura viva: toda mudança documental reflete em código e vice-versa. |

### Como melhorar

1. Mapear engines documentadas em P21/P24 vs engines existentes em `/sistema/src/engine/`
2. Identificar engines faltantes e criar ADRs de implementação
3. Eliminar engines sem justificativa cognitiva (inflação arquitetural)
4. Atualizar documentos de arquitetura para refletir o código real

### Status Atual (Julho/2026)

**IMA = 42%** — Abaixo da meta Empresa Zero (80%). 10 camadas documentadas, ~4 integralmente implementadas no código. A principal lacuna está no Motor Cognitivo formal (ciclo Observação→Conhecimento não implementado, apesar de 58 engines existentes).

---

## Índice 2 — Materialização Cognitiva (IMC)

### Definição

Percentual dos estados cognitivos documentados (E1–E12) que têm comportamento visual implementado na interface. Mede se o que a IA "sabe" sobre a empresa é visível para o empresário.

### Fórmula

```
IMC = (estados cognitivos com comportamento visual implementado) / (total de estados cognitivos documentados) × 100
```

**Variáveis:**
- `E_total` = total de estados cognitivos no mapa oficial (E1–E12 da Certificação Cognitiva)
- `E_visual` = estados que possuem componente, tela, indicador ou card correspondente no frontend

### Metas

| Fase | Meta | Prazo estimado |
|------|:----:|:--------------:|
| Empresa Zero (atual) | 60% | Imediato |
| Primeiro cliente | 80% | 90 dias |
| Produção (100 clientes) | 95% | 180 dias |

### Interpretação

| Faixa | Significado |
|:-----:|-------------|
| 0–30% | IA processa conhecimento que o empresário não vê. Caixa-preta cognitiva. |
| 31–60% | Estados básicos têm representação visual, mas estados intermediários e avançados são invisíveis. |
| 61–80% | Maior parte do processamento cognitivo é transparente. Empresário entende o que a IA sabe. |
| 81–95% | Transparência cognitiva quase total. Empresário vê o raciocínio em tempo real. |
| 96–100% | Cognição visível e inspecionável. Empresário pode contestar qualquer estado com um clique. |

### Como melhorar

1. Implementar o Mapa Cognitivo Vivo (WP01 do P23) — centro da experiência
2. Implementar indicadores de confiança em todas as respostas da IA
3. Adicionar badges de estado cognitivo nos cards de insight e conhecimento
4. Criar timeline visual da evolução cognitiva da empresa

### Status Atual (Julho/2026)

**IMC = 25%** — Abaixo da meta Empresa Zero (60%). Dos 12 estados cognitivos (E1–E12), apenas 3 têm comportamento visual parcial (E0 Desconhecida no diagnóstico, E1 Superficial no resumo, alguns indicadores no dashboard). O Mapa Cognitivo Vivo não existe.

---

## Índice 3 — Materialização Visual (IMV)

### Definição

Percentual dos elementos visuais especificados no P28 (Linguagem Visual Oficial) que estão implementados no código. Mede a fidelidade visual entre especificação e produto real.

### Fórmula

```
IMV = (elementos visuais implementados no código) / (total de elementos visuais especificados em P28) × 100
```

**Variáveis:**
- `V_total` = total de elementos visuais especificados: cores (13), tokens tipográficos (7), border radius (4), sombras (4), ícones (4 variações), espaçamentos (10), densidades (5), animações (4)
- `V_imp` = subconjunto de `V_total` que existe como token CSS, componente ou utilitário no código

### Metas

| Fase | Meta | Prazo estimado |
|------|:----:|:--------------:|
| Empresa Zero (atual) | 50% | Imediato |
| Primeiro cliente | 80% | 90 dias |
| Produção (100 clientes) | 95% | 180 dias |

### Interpretação

| Faixa | Significado |
|:-----:|-------------|
| 0–30% | Produto visualmente genérico. Identidade existe apenas em documentos. |
| 31–60% | Cores e tipografia básicas implementadas, mas elementos de assinatura e tokens avançados ausentes. |
| 61–80% | Maior parte da identidade visual está no código. Produto começa a parecer único. |
| 81–95% | Identidade visual consistente em todas as telas. Elementos de assinatura presentes. |
| 96–100% | Sistema de design completo e vinculado. Qualquer nova tela herda a identidade automaticamente. |

### Como melhorar

1. Implementar os tokens CSS completos da paleta P28 (13 cores)
2. Implementar elementos de assinatura: Anel de Confiança, Barra de Conhecimento, Glow de Insight
3. Criar sistema de design system componentizado com os tokens
4. Auditar cores hardcoded que fogem da paleta oficial (ex: Centro de Decisão)
5. Implementar as 4 transições de animação (hover 150ms, painel 300ms, página 400ms, easing padrao)

### Status Atual (Julho/2026)

**IMV = 35%** — Abaixo da meta Empresa Zero (50%). Cores principais (#0A1F2E, #2B6B9E, #F4F6F8) estão implementadas parcialmente. Tipografia Inter está presente. Mas 0% dos elementos de assinatura existem. Auditado pelo P29: 20 telas reprovadas, média 5.72/10.

---

## Índice 4 — Materialização da Experiência (IME)

### Definição

Percentual dos fluxos de experiência especificados no P23 que estão implementados no código. Mede se a experiência documentada é a mesma que o empresário vive.

### Fórmula

```
IME = (fluxos de experiência implementados conforme especificação) / (total de fluxos de experiência especificados) × 100
```

**Variáveis:**
- `F_total` = total de fluxos de experiência especificados (11 Work Packages do P23)
- `F_imp` = fluxos implementados que atendem aos critérios de aceite do respectivo WP

### Metas

| Fase | Meta | Prazo estimado |
|------|:----:|:--------------:|
| Empresa Zero (atual) | 60% | Imediato |
| Primeiro cliente | 85% | 90 dias |
| Produção (100 clientes) | 90% | 180 dias |

### Interpretação

| Faixa | Significado |
|:-----:|-------------|
| 0–30% | Experiência especificada é apenas documento. Produto entrega funcionalidade, não experiência. |
| 31–60% | Experiência básica implementada (chat, dashboard), mas elementos cognitivos e sensoriais ausentes. |
| 61–80% | Experiência central implementada. Faltam refinamento e elementos de assinatura. |
| 81–95% | Experiência consistentemente próxima da especificação. Empresário recebe o valor prometido. |
| 96–100% | Experiência viva: especificação e produto evoluem juntos em ciclos de aprendizado. |

### Como melhorar

1. Implementar WP01 (Mapa Cognitivo Vivo) — P0, 15 dias estimados
2. Implementar WP03 (Motor de Insights) — P0, 25 dias
3. Implementar WP02 (Jornada Primeira Semana) — P0, 20 dias
4. Implementar WP06 (Resumo de Sessão) — P1, 8 dias
5. Implementar Loading Inteligente conforme especificação (spinner → loading narrativo)
6. Substituir o DRAFT visível em páginas não implementadas por estados de "Em breve" com personalidade

### Status Atual (Julho/2026)

**IME = 25%** — Abaixo da meta Empresa Zero (60%). Dos 11 WPs do P23, nenhum está integralmente implementado. WP04 (Landing) tem versão inicial. WP05 (Dashboard) tem cards básicos, mas sem inteligência. WP10 (Login) existe. Os demais 8 WPs: 0% implementados.

---

## Índice 5 — Materialização da Identidade (IMI)

### Definição

Percentual dos elementos de assinatura visual e de personalidade (documentados no P28 e no P23) que estão implementados no código. Mede se a identidade única da Ponte Digital é percebida pelo empresário.

### Fórmula

```
IMI = (elementos de assinatura implementados) / (total de elementos de assinatura documentados) × 100
```

**Variáveis:**
- `A_total` = total de elementos de assinatura: Anel de Confiança, Barra de Conhecimento, Glow de Insight, Escrita Pensada, Silêncio da IA (avatar que respira), Momento Zero, Transição Entre Mundos, Paleta Exclusiva, Tom Consultor Sênior
- `A_imp` = elementos de assinatura que existem em produção

### Metas

| Fase | Meta | Prazo estimado |
|------|:----:|:--------------:|
| Empresa Zero (atual) | 70% | Imediato |
| Primeiro cliente | 90% | 90 dias |
| Produção (100 clientes) | 100% | 180 dias |

### Interpretação

| Faixa | Significado |
|:-----:|-------------|
| 0–30% | Identidade inexistente no produto. Produto parece SaaS genérico. |
| 31–60% | Identidade emerge em alguns elementos, mas assinatura principal ausente. |
| 61–80% | Elementos de assinatura centrais presentes (Anel, Barra). Personalidade começa a aparecer. |
| 81–99% | Identidade forte e reconhecível. Empresário percebe que não é mais um SaaS. |
| 100% | Identidade completa e inconfundível. Produto é imediatamente reconhecido como Ponte Digital. |

### Como melhorar

1. Implementar o Anel de Confiança em todas as telas (conversa, dashboard, painel cognitivo)
2. Implementar a Barra de Conhecimento no dashboard e painel cognitivo
3. Implementar o Glow de Insight nas revelações
4. Implementar a Escrita Pensada nas respostas da IA
5. Implementar o Silêncio da IA (avatar que respira)
6. Implementar o Momento Zero no retorno ao dashboard

### Status Atual (Julho/2026)

**IMI = 5%** — Abaixo da meta Empresa Zero (70%). Apenas a paleta de cores (parcial) e a tipografia Inter estão implementadas. Zero elementos de assinatura existem. Documentado no P29: "Anel de Confiança ausente em 100% das telas."

---

## Índice 6 — Geral da Plataforma (IGP)

### Definição

Média ponderada dos 5 índices anteriores. Representa o percentual global de materialização da visão da Ponte Digital em software. É o indicador-síntese do programa de materialização.

### Fórmula

```
IGP = (IMA × 0,20) + (IMC × 0,25) + (IMV × 0,15) + (IME × 0,25) + (IMI × 0,15)
```

**Pesos:**

| Índice | Peso | Justificativa |
|--------|:----:|---------------|
| IMA — Arquitetura | 0,20 | Base estrutural, mas parte substancial já existe |
| IMC — Cognitivo | 0,25 | Maior peso: cognição é o diferencial competitivo |
| IMV — Visual | 0,15 | Suporte importante, mas não é o core do valor |
| IME — Experiência | 0,25 | Maior peso: experiência entrega o valor ao empresário |
| IMI — Identidade | 0,15 | Diferenciação, mas pode vir após funcionalidade |

### Metas

| Fase | Meta | Prazo estimado |
|------|:----:|:--------------:|
| Empresa Zero (atual) | 65% | Imediato |
| Primeiro cliente | 85% | 120 dias |
| Produção (100 clientes) | 93% | 240 dias |

### Interpretação

| Faixa | Significado |
|:-----:|-------------|
| 0–30% | Visão majoritariamente no papel. Produto minimalista. |
| 31–50% | Produto funcional, mas longe da visão. Risco de construir direção errada. |
| 51–65% | Produto entrega valor real, mas experiência e identidade são genéricas. |
| 66–80% | Produto reconhecível. Materialização consistente na maioria das camadas. |
| 81–93% | Próximo da visão. Experiência, cognição e identidade alinhadas. |
| 94–100% | Visão materializada. Produto é a visão. |

### Como melhorar

1. Atacar os índices com menor valor primeiro (IMI = 5%, IMC = 25%, IME = 25%)
2. Priorizar implementações que impactam múltiplos índices simultaneamente
3. Estabelecer rituais de medição quinzenais
4. Criar um "Sprint de Materialização" dedicado a cada onda do roadmap

### Status Atual (Julho/2026)

**IGP = (42 × 0,20) + (25 × 0,25) + (35 × 0,15) + (25 × 0,25) + (5 × 0,15)**

**IGP = 8,4 + 6,25 + 5,25 + 6,25 + 0,75**

**IGP = 26,9%**

Muito abaixo da meta Empresa Zero (65%). A plataforma está 27% materializada em relação à visão documentada.

---

## Painel Resumo

| Índice | Sigla | Peso | Atual | Meta EZ | Gap | Prioridade |
|--------|:----:|:----:|:----:|:-------:|:---:|:----------:|
| Materialização Arquitetural | IMA | 0,20 | 42% | 80% | -38pp | Média |
| Materialização Cognitiva | IMC | 0,25 | 25% | 60% | -35pp | Alta |
| Materialização Visual | IMV | 0,15 | 35% | 50% | -15pp | Média |
| Materialização da Experiência | IME | 0,25 | 25% | 60% | -35pp | Alta |
| Materialização da Identidade | IMI | 0,15 | 5% | 70% | -65pp | **Crítica** |
| **Geral da Plataforma** | **IGP** | **1,00** | **26,9%** | **65%** | **-38,1pp** | **Crítico** |

---

## Regras de Medição

1. **Periodicidade:** medir todos os índices quinzenalmente e registrar em `docs/05-OPERATIONS/REPORTS/MATERIALIZACAO.md`
2. **Fonte dos dados:** IMA de `docs/09-ARCHITECTURE/` e `sistema/src/engine/`; IMC de `CURRENT_PRODUCT.md` e código frontend; IMV do P28 e tokens CSS; IME dos WPs do P23; IMI do P28 e P29
3. **Atualização:** cada sprint deve declarar qual(is) índice(s) pretende melhorar e em quanto
4. **Validação:** a cada 3 meses, reavaliar as fórmulas e pesos com base no aprendizado acumulado
5. **Transparência:** todos os índices são públicos para a equipe. Nenhum índice pode ser manipulado — a medição é feita por script ou checklist objetivo, não por autoavaliação

---

## Anexo: Checklist de Verificação por Índice

### IMA — Materialização Arquitetural
- [ ] Cada engine documentada tem arquivo `.ts` correspondente?
- [ ] Cada fase do pipeline cognitivo documentado tem implementação?
- [ ] ADRs aprovadas têm código correspondente (quando aplicável)?
- [ ] A camada de repositórios documentada existe?
- [ ] O barramento de eventos documentado existe?

### IMC — Materialização Cognitiva
- [ ] E0 (Desconhecida) tem tela/estado?
- [ ] E1 (Superficial) tem comportamento visual?
- [ ] E2 (Estrutural) tem comportamento visual?
- [ ] ... (até E12)
- [ ] O Mapa Cognitivo Vivo está implementado?

### IMV — Materialização Visual
- [ ] Todas as 13 cores da paleta têm tokens CSS?
- [ ] Elementos de assinatura estão implementados?
- [ ] Sistema de 8px de espaçamento está no código?
- [ ] Grade de 12 colunas está implementada?
- [ ] Transições e animações seguem a especificação P28?

### IME — Materialização da Experiência
- [ ] WP01 (Mapa Cognitivo) implementado conforme critérios de aceite?
- [ ] WP02 (Jornada 7 dias) implementado?
- [ ] WP03 (Motor de Insights) implementado?
- [ ] WP04 (Landing) implementado?
- [ ] WP05–WP11 implementados conforme prioridade?

### IMI — Materialização da Identidade
- [ ] Anel de Confiança implementado?
- [ ] Barra de Conhecimento implementada?
- [ ] Glow de Insight implementado?
- [ ] Escrita Pensada implementada?
- [ ] Silêncio da IA (avatar que respira) implementado?
- [ ] Momento Zero implementado?
- [ ] Transição Entre Mundos implementada?

---

*Este sistema de indicadores é a referência oficial para medir o progresso da materialização da Ponte Digital. Deve ser revisado a cada 90 dias ou quando um índice atingir 100% de materialização.*

*Arquiteto de Materialização — Julho 2026*
