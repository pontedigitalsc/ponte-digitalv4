# PROTOCOLO DA ERA DA OBSERVAÇÃO

## O Ciclo Obrigatório de Evolução por Evidência

**Programa 25 | Documento Operacional | 26/07/2026 | Versão 1.0**

> Este protocolo substitui qualquer processo anterior de decisão baseado em opinião, intuição, ou especulação.
> A partir deste documento, a Ponte Digital evolui exclusivamente pelo ciclo definido abaixo.
> Nenhuma funcionalidade, mudança arquitetural, ou ajuste de produto pode ignorar este protocolo.

---

## Preâmbulo

A Fundação está congelada. As 10 Leis Imutáveis, os 112 termos, os 12 estados cognitivos, as 10 Decisões Permanentes da Experiência — tudo está certificado e não muda por impulso.

O que muda a partir de agora é **como** a Ponte Digital descobre o que deve ser construído.

Durante a construção da Fundação, o conhecimento veio da especulação projetada: documentos P23 imaginavam o que o empresário sentiria; ADRs decidiam arquitetura antes de existir um único usuário pagante. Isso era necessário — não se constrói uma fundação com experimentos.

Agora a fundação existe. Agora o que importa não é o que imaginamos, mas o que **observamos**.

Este protocolo estabelece o ciclo obrigatório que transforma observação do mundo real em evolução da plataforma.

---

## O Ciclo

```
            USO (contínuo)
                ↓
     ┌── OBSERVAÇÃO (coleta de dado real)
     │         ↓
     │    REGISTRO (documentação do observado)
     │         ↓
     │   CLASSIFICAÇÃO (padrão? anomalia? tendência?)
     │         ↓
     │     HIPÓTESE (por que isso acontece?)
     │         ↓
     │    VALIDAÇÃO (experimento para confirmar/refutar)
     │         ↓
     │       RFC (proposta de mudança baseada em evidência)
     │         ↓
     │  IMPLEMENTAÇÃO (se RFC aprovada)
     │         ↓
     │      DEPLOY (disponibilização)
     │         ↓
     └── NOVA OBSERVAÇÃO (o ciclo recomeça)
```

---

## Etapa 1 — USO

**Nome:** Uso

**Descrição:** O empresário interage com a plataforma em seu dia a dia real. Não é uso induzido, não é sessão monitorada, não é laboratório. É o uso orgânico que acontece quando a plataforma resolve (ou não) um problema real.

**Responsável:** Produto (garantir que instrumentação de uso está ativa)

**Entrada:** Plataforma em produção com pelo menos um empresário ativo

**Saída:** Dados brutos de interação (logs, eventos, métricas de produto)

**Critério de qualidade:** O uso deve ser orgânico — o empresário não sabe que está sendo observado para este ciclo. Dados coletados refletem comportamento natural.

**Duração máxima recomendada:** Contínua (não é etapa com fim — é o estado basal da plataforma)

**Ferramentas/documentos necessários:** Plataforma em produção, analytics, logs estruturados, correlação por `empresaId`

**Exceções:** Nenhuma. Uso é o estado natural da plataforma. Se não há uso, o ciclo não começa — e este é um dado em si.

---

## Etapa 2 — OBSERVAÇÃO

**Nome:** Observação

**Descrição:** Coleta intencional e estruturada de dados reais de uso, comportamento, feedback explícito e implícito. A observação pode ser quantitativa (métricas, funis, taxas) ou qualitativa (entrevistas, sessões gravadas, relatos). A observação nunca é feita para confirmar uma crença — é feita para descobrir o que está acontecendo.

**Responsável:** Arquiteto de Produto ou Arquiteto de Experiência

**Entrada:** Dados brutos gerados pela etapa de Uso

**Saída:** Conjunto de observações brutas, ainda não interpretadas, documentadas em linguagem objetiva

**Critério de qualidade:**
- Dado real, não anedótico (mínimo de 3 ocorrências ou 3 fontes distintas)
- Separado de interpretação ("o empresário clicou 5 vezes no botão X" e não "o empresário ficou confuso")
- Inclui contexto (quem, quando, onde, em qual fluxo, com qual dado)
- Registrado em até 24h após a coleta

**Duração máxima recomendada:** 5 dias corridos

**Ferramentas/documentos necessários:** Analytics (taxa de clique, tempo em tela, funis), logs estruturados com `correlationId`, sessões gravadas (se disponível), template de observação em `docs/08-KNOWLEDGE/`

**Exceções:** ESTA ETAPA NUNCA PODE SER PULADA. É a única etapa obrigatória em absolutamente todos os ciclos. Se não há observação, não há evolução.

---

## Etapa 3 — REGISTRO

**Nome:** Registro

**Descrição:** Documentação formal e estruturada do que foi observado. O registro separa rigorosamente o dado observado da interpretação do observador. O formato é padronizado para permitir busca, comparação e rastreabilidade futura.

**Responsável:** Quem realizou a observação (pode ser qualquer membro da equipe)

**Entrada:** Observações brutas da etapa anterior

**Saída:** Documento de observação registrado em `docs/08-KNOWLEDGE/OBSERVACOES/` com:
- Data e contexto da observação
- Dado observado (descrição objetiva)
- Quem observou
- Em qual fluxo/funcionalidade
- Evidência (print, log, métrica, gravação)

**Critério de qualidade:**
- Zero inferência na seção de "dado observado" (inferências vão na etapa de Hipótese)
- Linguagem clara e objetiva
- Um observador independente deveria chegar à mesma descrição

**Duração máxima recomendada:** 2 dias corridos

**Ferramentas/documentos necessários:** Template de registro em `docs/08-KNOWLEDGE/TEMPLATE_OBSERVACAO.md`, diretório `docs/08-KNOWLEDGE/OBSERVACOES/`

**Exceções:** Emergência de segurança ou violação de dados — registrar imediatamente após a emergência ser contida. Justificar o atraso no próprio documento.

---

## Etapa 4 — CLASSIFICAÇÃO

**Nome:** Classificação

**Descrição:** O observado é classificado em uma das categorias abaixo. A classificação determina o que acontece com a observação dali para frente.

**Responsável:** Arquiteto de Produto

**Entrada:** Registro de observação

**Saída:** Classificação do fenômeno em uma das categorias:
- **Padrão:** Comportamento recorrente observado 3+ vezes em contextos similares
- **Anomalia:** Comportamento que desvia do esperado (pode ser erro, bug, ou descoberta)
- **Tendência:** Mudança gradual no comportamento ao longo do tempo
- **Singleton:** Ocorrência única sem repetição (baixa prioridade, mas registrada)
- **Ruído:** Dado sem significado aparente (pode ser arquivado)

**Critério de qualidade:**
- Classificação comparada com observações anteriores no mesmo fluxo
- Se houver dúvida entre Padrão e Singleton, aguardar mais observações
- A classificação é revisável (uma anomalia pode se tornar padrão com mais dados)

**Duração máxima recomendada:** 1 dia corrido

**Ferramentas/documentos necessários:** Catálogo de padrões conhecidos (a ser construído), `docs/08-KNOWLEDGE/OBSERVACOES/` para comparação

**Exceções:**
- Observação classificada como Ruído pode ser arquivada sem seguir para Hipótese
- Emergência de segurança: classificar como Anomalia e escalar imediatamente

---

## Etapa 5 — HIPÓTESE

**Nome:** Hipótese

**Descrição:** Formulação de uma explicação causal para o fenômeno observado. A hipótese responde "por que isso acontece?" e deve ser falsificável — ou seja, deve existir um experimento que possa prová-la errada.

**Responsável:** Produto + Engenharia (sempre em par)

**Entrada:** Observação classificada (como Padrão, Anomalia ou Tendência)

**Saída:** Hipótese formal documentada contendo:
- Fenômeno observado (referência ao registro)
- Causa proposta ("Acreditamos que X acontece porque Y")
- Predição testável ("Se Y for verdade, então quando fizermos Z, observaremos W")
- O que seria necessário para refutar a hipótese

**Critério de qualidade:**
- A hipótese é falsificável (existe pelo menos um resultado que a contradiria)
- A predição é mensurável
- A hipótese não é óbvia ("o empresário clicou porque queria navegar" não é hipótese)

**Duração máxima recomendada:** 2 dias corridos

**Ferramentas/documentos necessários:** Template de hipótese, referência às 8 hipóteses em aberto do P24 (H01-H08), `docs/08-KNOWLEDGE/HYPOTHESES.md`

**Exceções:**
- Fenômeno auto-explicativo com causa incontestável (ex: "servidor caiu porque acabou a memória") — registrar hipótese mínima, ir direto para implementação
- Anomalia de segurança — escalar imediatamente, hipótese documentada depois

---

## Etapa 6 — VALIDAÇÃO

**Nome:** Validação

**Descrição:** Experimento desenhado para confirmar ou refutar a hipótese. O experimento deve ser o menor possível para responder à pergunta — não é uma implementação completa, é um teste controlado.

**Responsável:** Quem propôs a hipótese (com suporte da área necessária)

**Entrada:** Hipótese formal

**Saída:** Resultado do experimento:
- **Confirmada:** A predição se confirmou. A hipótese pode seguir para RFC.
- **Refutada:** A predição não se confirmou. Registrar aprendizado em `docs/08-KNOWLEDGE/`.
- **Inconclusiva:** Não foi possível confirmar ou refutar. Revisar o experimento ou a hipótese.

**Critério de qualidade:**
- Métrica definida antes do experimento (não vale definir depois de ver o resultado)
- Tamanho amostral mínimo definido antes (não vale "alguns usuários")
- O experimento pode ser executado em paralelo com a operação normal da plataforma
- Resultado documentado de forma que qualquer membro da equipe entenda

**Duração máxima recomendada:** 10 dias corridos

**Ferramentas/documentos necessários:** A/B testing (se aplicável), analytics, template de validação, `docs/08-KNOWLEDGE/`

**Exceções:**
- Hipótese já validada por fonte externa confiável (estudo publicado, benchmark do setor) — registrar a fonte e pular para RFC
- Hipótese que exige experimento com empresa zero (único tenant disponível) — aceitar viés, documentar limitação

---

## Etapa 7 — RFC

**Nome:** RFC (Request for Comments)

**Descrição:** Proposta formal de mudança baseada na evidência validada. A RFC documenta o problema, a solução proposta, alternativas consideradas, impacto esperado, e riscos. A RFC é revisada por pares antes de ser aprovada ou rejeitada.

**Responsável:** Quem validou a hipótese (com coautoria de Engenharia se a mudança for técnica)

**Entrada:** Hipótese confirmada pela validação

**Saída:** RFC documentada seguindo o template obrigatório em `docs/04-DECISIONS/RFC/TEMPLATE.md`

**Critério de qualidade:**
- Segue o template RFC
- Impacto avaliado e classificado (baixo/médio/alto/crítico)
- Alternativas consideradas (mínimo 2)
- Documentos afetados identificados
- Custo estimado (dias de implementação + riscos)

**Duração máxima recomendada:** 5 dias corridos (da abertura à decisão)

**Ferramentas/documentos necessários:** Template RFC em `docs/04-DECISIONS/RFC/TEMPLATE.md`, revisão por 2 pares (Engenharia + Produto)

**Exceções:**
- Mudança crítica de segurança — RFC pode ser escrita após a implementação, mas antes do deploy
- Mudança cosmética sem impacto em domínio — RFC simplificada (aprovada pelo owner do documento)

---

## Etapa 8 — IMPLEMENTAÇÃO

**Nome:** Implementação

**Descrição:** Construção da mudança proposta e aprovada. A implementação segue os padrões da Constituição da Engenharia (Seções 5-6), respeita a pirâmide de dependências, e preserva o congelamento da fundação.

**Responsável:** Engenharia

**Entrada:** RFC aprovada

**Saída:** Código implementado com:
- Testes (unitários para regras de negócio, integração para APIs)
- Documentação atualizada (documentos afetados pela RFC)
- Migration (se aplicável)
- Nenhuma violação das Leis Imutáveis

**Critério de qualidade:**
- Segue checklist de PR da Constituição (Seção 11)
- `tsc --noEmit` passa sem erros
- Build completo sem erros
- Documentação atualizada antes do merge
- ADR criada se a mudança tocar em arquitetura

**Duração máxima recomendada:** 10 dias corridos

**Ferramentas/documentos necessários:** Template RFC, CONSTITUICAO_DA_ENGENHARIA.md, ADR template (se aplicável)

**Exceções:** Nenhuma. Implementação só acontece após RFC aprovada. Se a RFC foi aprovada, a implementação é obrigatória.

---

## Etapa 9 — DEPLOY

**Nome:** Deploy

**Descrição:** Disponibilização da mudança implementada para os usuários. O deploy segue o fluxo definido em TRANSITION_TO_V1_1.md e respeita as regras de release.

**Responsável:** Engenharia

**Entrada:** Código implementado e testado

**Saída:** Funcionalidade em produção com:
- CI/CD verde
- Health check verificando 24h pós-deploy
- Rollback documentado e testado
- Métrica de uso configurada para a nova funcionalidade

**Critério de qualidade:**
- Staging esteve ativo por mínimo 24h sem erros críticos
- Rollback testado (sabe-se exatamente como reverter)
- Equipe sabe que o deploy aconteceu

**Duração máxima recomendada:** 1 dia corrido

**Ferramentas/documentos necessários:** CI/CD, runbook de deploy, health check, TRANSITION_TO_V1_1.md

**Exceções:** Nenhuma. Deploy só acontece após implementação testada.

---

## Etapa 10 — NOVA OBSERVAÇÃO

**Nome:** Nova Observação

**Descrição:** O ciclo recomeça. A mudança implementada e em produção agora gera novos dados de uso que alimentam a próxima observação. O ciclo não termina — ele se realimenta.

**Responsável:** Produto

**Entrada:** Funcionalidade em produção (como parte do Uso contínuo)

**Saída:** Novos dados brutos para a Etapa 2

**Critério de qualidade:** O ciclo não deve fechar sobre si mesmo — a nova observação deve olhar para o que mudou com a implementação.

**Duração máxima recomendada:** Não se aplica (é o reinício do ciclo, não uma etapa com duração própria)

**Ferramentas/documentos necessários:** As mesmas da Etapa 1 (Uso) e Etapa 2 (Observação)

**Exceções:** Nenhuma. A observação é o único caminho para a próxima evolução.

---

## Regras do Protocolo

### Regra 1 — Ciclo completo obrigatório

Nenhuma evolução pode ignorar o ciclo completo. "Pular direto para a implementação" não é permitido. O ciclo começa na Observação e termina no Deploy. Toda funcionalidade, mudança arquitetural, ajuste de produto, ou correção estrutural deve passar por todas as etapas na ordem definida.

### Regra 2 — Observação é a única etapa que nunca pode ser pulada

Se não há dado real observado, não há evolução. Nem a RFC, nem a vontade do fundador, nem a urgência do mercado podem substituir a observação. Se a observação não existe, o ciclo não começa.

Exceção única: ameaça iminente à continuidade do negócio (violação de dados, falha crítica de segurança, indisponibilidade total da plataforma). Nestes casos, a observação é substituída pela documentação da emergência, e o ciclo recomeça imediatamente após a contenção.

### Regra 3 — Implementação só acontece após RFC aprovada

Nenhuma linha de código novo ou alteração em código existente para uma mudança não emergencial pode ser escrita antes da RFC ser aprovada. Código escrito fora do ciclo será desconsiderado ou revertido.

### Regra 4 — Deploy só acontece após implementação testada

Nenhuma mudança vai para produção sem:
- Testes passando
- Revisão de código concluída
- Documentação atualizada
- Rollback conhecido

### Regra 5 — Ciclo inteiro nunca deve ultrapassar 30 dias

Da etapa de Observação ao Deploy, o ciclo completo não pode exceder 30 dias corridos. Se uma etapa individual estourar seu prazo máximo, a etapa anterior deve ser reavaliada (a hipótese era grande demais? a observação era incompleta?).

Se ao final de 30 dias o ciclo não foi concluído, o item volta para a etapa de Classificação para reavaliação.

### Regra 6 — Exceções emergenciais precisam de justificativa registrada

Toda exceção a qualquer etapa do ciclo deve ser documentada em `docs/05-OPERATIONS/KNOWN_ISSUES.md` com:
- Qual etapa foi pulada ou reduzida
- Motivo da exceção
- Quem autorizou
- Data em que o ciclo normal será retomado

### Regra 7 — O protocolo é revisado a cada 6 meses

Este protocolo será revisado integralmente a cada 6 meses. A primeira revisão acontece em **26 de janeiro de 2027**. Na revisão, serão avaliados:
- Se o prazo de 30 dias é adequado
- Se as etapas precisam ser ajustadas
- Se exceções estão sendo usadas de forma abusiva
- Se o protocolo está gerando aprendizado ou burocracia

---

## Fluxo de Exceções Resumido

| Etapa | Pode pular? | Condição |
|-------|-------------|----------|
| Uso | Não | É o estado basal |
| Observação | **NUNCA** | Única etapa inviolável |
| Registro | Sim | Emergência de segurança (registrar depois) |
| Classificação | Sim | Emergência urgente (pular, registrar motivo) |
| Hipótese | Sim | Fenômeno auto-explicativo (registrar justificativa) |
| Validação | Sim | Hipótese já validada externamente (registrar fonte) |
| RFC | Sim | Mudança crítica de segurança (RFC pós-implementação) |
| Implementação | Não | Só acontece após RFC aprovada |
| Deploy | Não | Só após implementação testada |
| Nova Observação | Não | Ciclo se reinicia automaticamente |

---

## Aplicação Prática

### Exemplo 1 — Ciclo completo (recomendado)

1. **Observação:** Analytics mostra que 70% dos empresários abandonam o Mapa Cognitivo nos primeiros 10 segundos.
2. **Registro:** Documentado com print da taxa de abandono, segmentado por plano e setor.
3. **Classificação:** Padrão (observado em 12 de 15 empresas, consistente há 3 semanas).
4. **Hipótese:** "Acreditamos que o abandono acontece porque o mapa não destaca o insight mais relevante para a semana atual do empresário."
5. **Validação:** Testar com 5 empresas: versão A (mapa atual) vs versão B (mapa com insight da semana em destaque). Métrica: tempo médio na tela > 30s.
6. **RFC:** Proposta de mudança no componente Mapa Cognitivo para destacar insight semanal.
7. **Implementação:** 3 dias para alterar o componente.
8. **Deploy:** Release programada.
9. **Nova Observação:** Monitorar se a taxa de abandono caiu.

### Exemplo 2 — Ciclo com exceção (emergência)

1. **Observação:** Todos os tenants reportam erro 500 ao acessar o dashboard financeiro.
2. **Registro:** (pulado — emergência).
3. **Classificação:** Anomalia crítica.
4. **Hipótese:** (pulada — causa óbvia após diagnóstico).
5. **Correção:** Rollback do último deploy (sem RFC).
6. **Registro posterior:** Documentar a causa, a correção, e o que será feito para evitar.
7. **Nova Observação:** Ciclo normal retomado.

---

## Indicadores de Saúde do Protocolo

| Indicador | Meta | Como medir |
|-----------|------|------------|
| Ciclos concluídos por mês | ≥ 2 | Contar RFCs que chegaram ao Deploy |
| Tempo médio do ciclo | ≤ 20 dias | Da Observação ao Deploy |
| Exceções por mês | ≤ 2 | Contar registros em KNOWN_ISSUES.md |
| Observações sem RFC | Qualquer número | Toda observação é válida, mesmo sem ação |
| Hipóteses refutadas | ≥ 30% | Se 100% das hipóteses são confirmadas, o ciclo não está desafiando crenças |
| Tempo médio Observação→Registro | ≤ 24h | Da coleta ao documento |

---

## Compromisso

A Ponte Digital não será mais dirigida por opinião. Será dirigida por este ciclo.

Toda vez que alguém disser "eu acho que deveríamos fazer X", a resposta será: "Que observação sustenta isso?"

Toda vez que alguém disser "precisamos disso urgente", a resposta será: "Qual é a emergência e por que o ciclo não se aplica?"

Este protocolo não é um obstáculo à velocidade. É o caminho mais curto para construir o que realmente importa.

---

*Este documento entra em vigor na data de sua publicação.*
*Primeira revisão programada: 26 de janeiro de 2027.*
*Ponte Digital — Era da Observação.*
