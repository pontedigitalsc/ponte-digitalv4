# MODELO DA PRIMEIRA RFC REAL

## Como nasce a primeira RFC proveniente de uso real

**Programa 26 | Validação Contínua | Julho de 2026 | Versão 1.0**

> Este documento descreve a jornada completa de uma observação real até se
> tornar uma RFC (Request for Comments). Nenhuma implementação acontece
> sem passar por este fluxo. A primeira RFC real é o marco que prova que o
> ciclo de evolução por evidência está funcionando.

---

## A jornada completa (narrativa)

### 1. Observação real durante operação diária → registro no Catálogo

Tudo começa com uma sessão real da Empresa Zero. Durante o uso da plataforma, algo
chama a atenção do observador: uma reação, um dado inesperado, um comportamento
repetido.

**O que acontece:**
- O observador registra o fato no Catálogo das Primeiras 100 Observações
- Usa o template oficial (PROTOCOLO_DA_OBSERVACAO_REAL.md)
- Separa fato de interpretação rigorosamente
- Registra em até 15 minutos

**Exemplo:** Durante a 3ª sessão semanal da Empresa Zero, o time demora 15s para entender
que o insight apresentado se refere a um dado que eles mesmos forneceram na sessão anterior.
O observador registra: "Membro disse em voz alta: 'Isso aí é baseado no que eu falei semana
passada? Nem lembrava mais.' Três membros concordaram que não lembravam."

### 2. Observação se repete → vira padrão identificado

Uma observação isolada é um singleton. A mesma observação em contextos similares
três vezes ou mais vira um padrão.

**O que acontece:**
- O Arquiteto de Observação revisa o catálogo semanalmente
- Identifica observações com características similares
- Se 3+ observações apontam para o mesmo fenômeno, classifica como PADRÃO
- Documenta o padrão no próprio catálogo

**Critério de padrão:**
- Mínimo 3 ocorrências
- Contextos equivalentes (mesmo fluxo, mesma funcionalidade)
- Mesmo tipo de comportamento ou reação
- Observado em pelo menos 2 membros diferentes da equipe (para evitar viés pessoal)

### 3. Padrão vira hipótese → registrada no sistema de hipóteses

Uma vez identificado o padrão, o observador (ou o Arquiteto de Observação) formula
uma explicação causal: POR QUE esse padrão acontece?

**O que acontece:**
- Escreve a hipótese no template de hipóteses
- A hipótese responde: "Acreditamos que esse padrão acontece porque..."
- A hipótese é falsificável — existe pelo menos um experimento que pode prová-la errada
- A hipótese é registrada no sistema de validação (ARQUITETURA_DA_VALIDACAO_CONTINUA.md)

**Template de hipótese:**
```
H-0XX — [Título da hipótese]

Padrão observado: [referência às observações OBS-XXX]
Causa proposta: "Acreditamos que [fenômeno] acontece porque [causa]"
Predição testável: "Se [causa] for verdade, quando fizermos [experimento],
observaremos [resultado esperado]"
O que refutaria: [resultado que contradiria a hipótese]
Experimento mínimo: [menor experimento possível para testar]
```

### 4. Hipótese validada → vira candidata a RFC

A hipótese precisa ser testada antes de virar RFC.

**O que acontece:**
- Desenha-se o experimento mínimo (pode ser um A/B test, uma entrevista, uma análise de logs)
- Executa-se o experimento
- Resultado: confirmada, refutada ou inconclusiva
- Se confirmada: a hipótese vira candidata a RFC
- Se refutada: vira aprendizado documentado (nunca descartada)

**Critérios de validação para virar RFC:**
- Mínimo 3 observações consistentes (fontes diferentes, contextos equivalentes)
- Confiança média das observações >= 7 (escala 0-10)
- Impacto estimado médio >= médio
- A implementação proposta é factível (não requer descongelamento da fundação)
- Não viola as 10 Leis Imutáveis, os 112 termos ou qualquer certificação do P24

### 5. RFC escrita → template oficial, evidências anexadas

Com a hipótese confirmada, escreve-se a RFC (Request for Comments).

**O que acontece:**
- Usa o template oficial de RFC (abaixo)
- Anexa as evidências: observações do catálogo, resultado do experimento, dados coletados
- Propõe a mudança específica
- Avalia impacto, alternativas, riscos
- Estima custo de implementação

### 6. RFC circulada → revisão por pares (mínimo 2)

A RFC não é decidida por uma pessoa. Ela é revisada por pares.

**O que acontece:**
- A RFC é publicada no diretório `docs/04-DECISIONS/RFC/`
- Mínimo de 2 revisores: um de Produto, um de Engenharia (para RFCs técnicas)
- Prazo de revisão: 5 dias corridos
- Cada revisor registra seu parecer: aprova, rejeita, ou solicita alterações
- Se houver divergência entre revisores, um terceiro revisor é designado

### 7. RFC aprovada/rejeitada → decisão documentada

A decisão final é documentada na própria RFC.

**O que acontece:**
- Se aprovada: segue para implementação no próximo programa
- Se rejeitada: documento com justificativa; evidências preservadas para consulta futura
- Se alterações solicitadas: autor ajusta e submete novamente (prazo: 3 dias)
- Toda decisão (inclusive rejeição) é documentada com justificativa

### 8. Se aprovada → implementação (que só acontece em programa futuro)

Importante: RFC aprovada não significa implementação imediata.

**O que acontece:**
- A RFC entra no backlog do próximo programa (P27 em diante)
- A implementação só começa quando o programa dedicado inicia
- Exceção: RFCs classificadas como "críticas" (segurança, continuidade do negócio)
- A RFC aprovada serve como especificação para a implementação futura

---

## Template oficial de RFC

```
┌─────────────────────────────────────────────────────────────────┐
│              REQUEST FOR COMMENTS (RFC) — Ponte Digital         │
│                   Template Oficial v1.0 — P24                   │
└─────────────────────────────────────────────────────────────────┘

RFC-NNN: [Título da RFC]

─── DADOS GERAIS ───
Autor: [nome]
Data de abertura: [dd/mm/aaaa]
Data limite para revisão: [dd/mm/aaaa + 5 dias]
Status: [rascunho / em revisão / aprovada / rejeitada / implementada]
Tipo: [produto / arquitetura / experiência / processo / conteúdo]
Prioridade: [baixa / média / alta / crítica]
Programa alvo: [P27, P28, etc — apenas se aprovada]

─── PROBLEMA ───
1. O que foi observado?
[Descrição clara do fenômeno observado. Referência às observações do
Catálogo (OBS-XXX).]

2. Por que isso é um problema?
[Impacto no usuário, no produto, no negócio. O que acontece se não
mudarmos nada.]

3. Quem é afetado?
[Empresa Zero, clientes parceiros, todos os tenants, equipe interna.]

─── EVIDÊNCIAS ───
[Observações do catálogo: OBS-XXX, OBS-XXX]
[Hipótese relacionada: H-XXX]
[Resultado do experimento de validação]
[Dados quantitativos, se aplicável]
[Contexto de coleta]

─── SOLUÇÃO PROPOSTA ───
1. O que deve ser feito?
[Descrição concisa da mudança proposta.]

2. Como funciona?
[Explicação do comportamento esperado após a mudança.]

3. O que NÃO muda?
[Para evitar escopo creeping. Deixar claro o que está fora desta RFC.]

─── ALTERNATIVAS CONSIDERADAS ───
[Mínimo 2 alternativas. Para cada uma: descrição, por que foi descartada.]

| Alternativa | Motivo da rejeição |
|---|---|
| [Alternativa 1] | [Motivo] |
| [Alternativa 2] | [Motivo] |

─── IMPACTO ───
1. Impacto no usuário: [descrever]
2. Impacto no produto: [descrever]
3. Impacto arquitetural: [descrever]
4. Impacto nos dados: [descrever — migrations, schema, etc]
5. Impacto na experiência: [descrever]
6. Impacto na operação: [descrever — processos, equipe]

─── RISCOS ───
| Risco | Probabilidade | Impacto | Mitigação |
|---|---|---|---|
| [Risco] | [alta/média/baixa] | [alto/médio/baixo] | [ação] |

─── CUSTO ESTIMADO ───
[Estimativa em dias de implementação, não em horas.]
[Recursos necessários (pessoas, ferramentas, serviços externos).]

─── DOCUMENTOS AFETADOS ───
[Listar documentos que precisarão ser atualizados se esta RFC for aprovada.]

─── REVISÃO ───
Revisor 1 (Produto): [nome / parecer / data]
Revisor 2 (Engenharia): [nome / parecer / data]
Revisor 3 (se necessário): [nome / parecer / data]

─── DECISÃO FINAL ───
Decisão: [aprovada / rejeitada / alterações solicitadas]
Justificativa: [texto]
Data da decisão: [dd/mm/aaaa]
Decidido por: [nome(s)]

─── APRENDIZADO (preencher após decisão) ───
[O que esta RFC — aprovada ou rejeitada — nos ensinou sobre o processo
de evolução por evidência?]
```

---

## Exemplo de RFC preenchida (baseada em observação realista)

```
┌─────────────────────────────────────────────────────────────────┐
│              REQUEST FOR COMMENTS (RFC) — Ponte Digital         │
└─────────────────────────────────────────────────────────────────┘

RFC-001: Notificação de conclusão de processamento mais evidente

─── DADOS GERAIS ───
Autor: Arquiteto de Observação
Data de abertura: 05/08/2026
Data limite para revisão: 10/08/2026
Status: aprovada
Tipo: experiência
Prioridade: alta
Programa alvo: P27

─── PROBLEMA ───
1. O que foi observado?
Observou-se em 4 ocasiões (OBS-003, OBS-011, OBS-023, OBS-031) que membros
da Empresa Zero não percebem o momento exato em que o processamento termina.
Em OBS-003, o processamento terminou em 12s, mas o usuário só retornou à tela
35s depois, após se distrair com outra ferramenta. Em OBS-023, o usuário disse
"Já terminou?" mesmo com o resultado visível na tela há 10 segundos.

2. Por que isso é um problema?
A não-percepção do término do processamento:
- Aumenta o tempo de sessão sem aumentar o engajamento
- Quebra a imersão (usuário se distrai e leva tempo para retomar)
- Cria a percepção de que o sistema é lento, mesmo quando não é
- Reduz a sensação de fluidez da experiência

3. Quem é afetado?
Todos os usuários da plataforma, especialmente em momentos de processamento
>5 segundos.

─── EVIDÊNCIAS ───
Observações do catálogo: OBS-003, OBS-011, OBS-023, OBS-031
Hipótese relacionada: H-005 (Loading inteligente reduz abandono)
Hipótese secundária: H-018 (Botão continuar durante espera)
Resultado do experimento: validação rápida com 3 membros — todos relataram
que "não percebem quando o processamento termina" se não há mudança visual
significativa
Tipo de evidência: qualitativa (observação direta) com consistência entre fontes

─── SOLUÇÃO PROPOSTA ───
1. O que deve ser feito?
Adicionar um indicador visual de transição quando o processamento termina:
micro-animação de 1 segundo com mudança de cor + texto "Pronto!" + brilho
sutil no resultado.

2. Como funciona?
- Enquanto processa: estado atual (loading com mensagem)
- Quando termina: animação de 1s (fade + destaque) no resultado
- O resultado aparece gradualmente em vez de subitamente
- Som sutil opcional (opt-in)

3. O que NÃO muda?
- Não altera o tempo de processamento
- Não remove o loading inteligente atual
- Não adiciona som por padrão (opt-in)
- Não muda a posição dos elementos na tela

─── ALTERNATIVAS CONSIDERADAS ───
| Alternativa | Motivo da rejeição |
|---|---|
| Som ao término | H-022 ainda não validada; som pode irritar |
| Barra de progresso contínua | Já existe loading inteligente; adicionar barra duplica |
| Notificação push | Excessivo para processamento de segundos |

─── IMPACTO ───
1. Impacto no usuário: positivo — percepção de fluidez melhora
2. Impacto no produto: mínimo — componente visual isolado
3. Impacto arquitetural: nenhum — frontend puro
4. Impacto nos dados: nenhum
5. Impacto na experiência: médio — transição mais suave
6. Impacto na operação: nenhum

─── RISCOS ───
| Risco | Probabilidade | Impacto | Mitigação |
|---|---|---|---|
| Animação pode distrair | Baixa | Baixo | Duração de 1s, sutil |
| Não resolve o problema | Média | Médio | Testar com 3 sessões antes de lançar |
| Custo de implementação maior que estimado | Baixa | Baixo | Desenvolver em 1 dia; se >2, reavaliar |

─── CUSTO ESTIMADO ───
1-2 dias de desenvolvimento frontend.
Nenhum recurso externo necessário.

─── DOCUMENTOS AFETADOS ───
- docs/02-PRODUCT/CURRENT_PRODUCT.md (adicionar transição de processamento)
- Nenhum documento de engenharia (não altera arquitetura)

─── REVISÃO ───
Revisor 1 (Produto): Mariana A. / Aprovada / 08/08/2026
Revisor 2 (Engenharia): Rafael S. / Aprovada / 09/08/2026
Revisor 3 (se necessário): N/A

─── DECISÃO FINAL ───
Decisão: aprovada
Justificativa: Evidência consistente (4 observações), baixo custo, impacto positivo
provável. Risco mínimo.
Data da decisão: 10/08/2026
Decidido por: Mariana A. + Rafael S.

─── APRENDIZADO ───
Esta RFC mostrou que observações qualitativas consistentes podem gerar mudanças
de alto impacto com baixo custo. A primeira RFC real validou o ciclo de evolução
por evidência. O processo funciona.
```

---

## Critérios de aprovação/rejeição

### Critérios de aprovação

A RFC é aprovada quando atende TODOS os critérios abaixo:

| # | Critério | Como verificar |
|---|---|---|
| 1 | **Evidência suficiente** | Mínimo 3 observações consistentes de fontes diferentes |
| 2 | **Hipótese validada** | A hipótese correspondente foi testada e confirmada |
| 3 | **Não viola a fundação** | Não contradiz as 10 Leis Imutáveis, 112 termos ou certificações P24 |
| 4 | **Escopo definido** | O que muda e o que não muda estão claros |
| 5 | **Alternativas consideradas** | Mínimo 2 alternativas avaliadas e descartadas com justificativa |
| 6 | **Impacto avaliado** | Impacto em todas as dimensões (usuário, produto, arquitetura, dados, experiência, operação) |
| 7 | **Risco conhecido** | Riscos identificados com mitigação |
| 8 | **Custo estimado** | Estimativa de dias de implementação |
| 9 | **2 revisões positivas** | Mínimo 2 revisores aprovaram |

### Critérios de rejeição

A RFC é rejeitada se QUALQUER UM dos critérios abaixo for verdadeiro:

| # | Critério | Exemplo |
|---|---|---|
| 1 | **Evidência insuficiente** | Menos de 3 observações ou fontes não-confirmadas |
| 2 | **Hipótese não testada** | A RFC propõe implementar antes de validar |
| 3 | **Viola a fundação** | Muda um termo certificado, uma Lei Imutável ou uma decisão permanente |
| 4 | **Escopo excessivo** | Tenta resolver múltiplos problemas em uma RFC |
| 5 | **Custo desproporcional ao impacto** | Implementação de 30 dias para benefício marginal |
| 6 | **Alternativa claramente superior ignorada** | Existe solução mais simples e não foi considerada |
| 7 | **Risco não mitigável** | Risco alto sem mitigação viável |
| 8 | **Falta de consenso entre revisores** | Revisores divergem e não há convergência após 3ª revisão |

### Critérios de retorno para ajustes

A RFC retorna para ajustes se:

- Faltam informações em campos obrigatórios do template
- As evidências precisam ser mais detalhadas
- O escopo está impreciso ("O que NÃO muda" não está claro)
- As alternativas são insuficientemente explicadas

---

## Prazos

| Etapa | Prazo máximo | Contagem |
|---|---|---|
| Registro da observação | 15 minutos | Após o fato |
| Classificação como padrão | 5 dias | Após 3ª observação |
| Formulação da hipótese | 2 dias | Após classificação |
| Execução do experimento | 10 dias | Após formulação |
| Escrita da RFC | 3 dias | Após hipótese confirmada |
| Revisão por pares | 5 dias | Após publicação |
| Ajustes pós-revisão | 3 dias | Após solicitação |
| Decisão final | 1 dia | Após revisão concluída |
| Implementação | No programa seguinte | A partir do próximo P## |

### Prazo total máximo da observação à decisão

O ciclo completo da primeira observação até a decisão da RFC não deve ultrapassar
**30 dias corridos** (conforme PROTOCOLO_DA_ERA_DA_OBSERVACAO.md, Regra 5).

---

## Quem aprova cada nível de RFC

| Tipo de RFC | Quem aprova | Revisores necessários |
|---|---|---|
| **Conteúdo** (texto, perguntas, tom) | Arquiteto de Produto | 1 revisor de Produto |
| **Experiência** (UX, fluxo, componente) | Arquiteto de Experiência | 1 revisor de Produto + 1 de Engenharia |
| **Produto** (funcionalidade, feature) | Arquiteto de Produto + Arquiteto de Engenharia | 1 revisor de Produto + 1 de Engenharia |
| **Arquitetura** (schema, API, infra) | Arquiteto de Engenharia + CTO | 2 revisores de Engenharia |
| **Processo** (operação, fluxo interno) | Arquiteto de Observação | 1 revisor de Produto + 1 membro da equipe afetada |
| **Crítica** (segurança, continuidade) | CTO + Fundador | 2 revisores de Engenharia + aprovação executiva |

### Níveis de urgência e aprovação simplificada

| Urgência | Processo de aprovação | Prazo |
|---|---|---|
| **Normal** | Ciclo completo: 2 revisores, 5 dias | 5 dias |
| **Urgente** (impacto médio, necessidade de entrega rápida) | 1 revisor, 2 dias | 2 dias |
| **Crítica** (risco de negócio, segurança) | Aprovação executiva imediata + documentação posterior | Imediato |

---

## Regra fundamental

A primeira RFC real não precisa ser grande. Precisa ser real.

Uma RFC de 1 dia de implementação, baseada em 3 observações consistentes, vale
mais que uma RFC de 30 dias baseada em especulação. O tamanho da mudança não
é medida de sucesso — a existência do ciclo é.

---

*Este documento é parte do Programa 26 — Validação Contínua.*
*A primeira RFC real marca o nascimento da evolução por evidência.*
*Ponte Digital — Empresa Zero — Ciclo de RFC.*
