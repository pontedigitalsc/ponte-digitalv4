# Modelo do Ciclo Cognitivo

> **Programa 12 — Fase 3: Motor Cognitivo**
> Versão: 1.0
> Propósito: Integrar todos os subsistemas em um ciclo operacional completo

---

## Preâmbulo

Os documentos anteriores (1 a 8) especificaram cada subsistema do Motor Cognitivo individualmente: raciocínio, decisão, contexto, memória, perguntas, priorização, observação e intervenção.

Este documento integra todos esses subsistemas em um único ciclo operacional. Ele mostra como a Percepção se conecta à Contextualização, que se conecta à Análise, e assim por diante, formando um fluxo contínuo e coerente.

O ciclo cognitivo é o coração operacional da Ponte Digital. Cada batida deste ciclo transforma estímulo em ação e ação em aprendizado.

---

## Seção 1 — Visão Geral do Ciclo

### 1.1 O Ciclo de 10 Estágios

```
                    ┌──────────────────────────────────────────────────────┐
                    │                    CICLO COGNITIVO                    │
                    └──────────────────────────────────────────────────────┘

  ESTÍMULO EXTERNO
       │
       ▼
┌─────────────┐    ┌──────────────┐    ┌──────────┐    ┌───────────┐
│  01         │    │  02          │    │  03      │    │  04       │
│  PERCEPÇÃO  │───►│ CONTEXTUALI- │───►│ ANÁLISE  │───►│ HIPÓTESE  │
│             │    │ ZAÇÃO        │    │          │    │           │
└─────────────┘    └──────────────┘    └──────────┘    └───────────┘
       │                  │                 │                │
       │                  │                 │                │
       ▼                  ▼                 ▼                ▼
┌─────────────┐    ┌──────────────┐    ┌──────────┐    ┌───────────┐
│  05         │    │  06          │    │  07      │    │  08       │
│  VALIDAÇÃO  │───►│ DECISÃO      │───►│ EXECUÇÃO │───►│ REGISTRO  │
│             │    │              │    │          │    │           │
└─────────────┘    └──────────────┘    └──────────┘    └───────────┘
       │                  │                 │                │
       │                  │                 │                │
       ▼                  ▼                 ▼                ▼
┌─────────────┐    ┌──────────────┐
│  09         │    │  10          │
│ APRENDIZADO │◄───│ ATUALIZAÇÃO  │
│             │    │ DO           │
│             │    │ PATRIMÔNIO   │
└─────────────┘    └──────────────┘
       │
       │ (realimenta a Percepção)
       ▼
  NOVO CICLO (retorna ao estágio 01)
```

### 1.2 Tipos de Ciclo

O ciclo opera em 4 modalidades:

| Modalidade | Duração | Estágios Ativados | Quando |
|:----------:|:-------:|:------------------:|--------|
| Completo | 0.5-1.5s | 01 a 10 | Ciclo agendado, sinal crítico |
| Conversa | 0.5-3s | 01, 02, 03, 06, 07, 08, 10 | Interação com empresário |
| Onboarding | 1-5s | 01, 02, 03, 04, 06, 07, 08, 10 | Primeira conversa (pula validação) |
| Silêncio | 0.2s | 01, 02, 08 | Sinal irrelevante (registra e arquiva) |

---

## Seção 2 — Estágio 01: Percepção

### 2.1 Função

Converter estímulo externo em sinal processável e enfileirar para processamento.

### 2.2 Entrada

```typescript
interface EntradaPercepcao {
  estimulo: EstimuloBruto;
  tipo: 'CONVERSA' | 'IMPORTACAO' | 'DADO_NOVO' | 'CICLO_AGENDADO' | 'EVENTO_EXTERNO';
  fonte: FonteInfo;
  timestamp: string;
  correlationId: string;
}
```

### 2.3 Processo

1. **Recepção:** O estímulo chega via barramento de eventos (cognitive-bus) ou chamada direta
2. **Classificação inicial:** Identificar tipo, fonte, urgência inicial (0-10)
3. **Deduplicação:** Verificar hash — se já processado, ignorar
4. **Enfileiramento:** Colocar na fila de prioridade (ver MODELO_DE_PRIORIZACAO_COGNITIVA.md)
5. **Registro:** Persistir sinal original no Histórico de Sinais

### 2.4 Saída

```typescript
interface SaidaPercepcao {
  sinal: SinalProcessado;
  prioridade: 'URGENTE' | 'IMPORTANTE' | 'OPORTUNIDADE' | 'RISCO' | 'SILENCIO';
  filaPosicao: number;
}
```

### 2.5 Documento Fonte

Detalhado em: ARQUITETURA_DO_RACIOCINIO_COGNITIVO.md (Seção 1.2) e MODELO_DE_PRIORIZACAO_COGNITIVA.md.

---

## Seção 3 — Estágio 02: Contextualização

### 3.1 Função

Inserir o sinal no contexto cognitivo atual da empresa, enriquecendo-o com relacionamentos e histórico.

### 3.2 Entrada

- SinalProcessado (do estágio 01)
- ContextoCognitivo vigente (do cache ou montado sob demanda)

### 3.3 Processo

1. **Carregar contexto:** Buscar Contexto Cognitivo vigente (cache de 5 min)
2. **Cache miss?** Montar novo contexto (ver MODELO_DE_CONTEXTO.md)
3. **Enriquecer:** Identificar relacionamentos entre sinal e objetos cognitivos existentes
4. **Verificar histórico:** A empresa já viu isso antes?
5. **Calcular relevância:** Score de relevância do sinal no momento atual
6. **Produzir pacote:** ContextoEnriquecido imutável

### 3.4 Saída

```typescript
interface SaidaContextualizacao {
  contexto: ContextoEnriquecido;
  cacheUtilizado: boolean;
  tempoMontagem: number; // ms
}
```

### 3.5 Documento Fonte

Detalhado em: MODELO_DE_CONTEXTO.md.

---

## Seção 4 — Estágio 03: Análise

### 4.1 Função

Examinar o sinal contextualizado para extrair padrões, anomalias, correlações e tendências.

### 4.2 Entrada

- ContextoEnriquecido (do estágio 02)

### 4.3 Processo

1. **Detectar padrões:** Aplicar detectores de padrão (MODELO_DE_OBSERVACAO_CONTINUA.md Seção 7)
2. **Detectar anomalias:** Comparar com média histórica e desvio padrão
3. **Detectar correlações:** Calcular pareamentos com variáveis conhecidas (ADR-034)
4. **Calcular força da evidência:** Score 0-100 baseado na qualidade das fontes
5. **Classificar análise:** FATO, CORRELAÇÃO, ANOMALIA, TENDÊNCIA ou INDETERMINADO

### 4.4 Paralelismo

Os detectores de padrão rodam em paralelo para performance:
```
├─ Detector financeiro
├─ Detector de clientes
├─ Detector operacional
├─ Detector de engajamento
└─ Detector cognitivo (saúde do Motor)
```

### 4.5 Saída

```typescript
interface SaidaAnalise {
  padroes: PadraoDetectado[];
  anomalias: AnomaliaDetectada[];
  correlacoes: CorrelacaoDetectada[];
  forcaEvidencia: number;
  tipoAnalise: string;
  dadosSuporte: Evidencia[];
}
```

### 4.6 Documento Fonte

Detalhado em: ARQUITETURA_DO_RACIOCINIO_COGNITIVO.md (Seção 1.4) e MODELO_DE_OBSERVACAO_CONTINUA.md.

---

## Seção 5 — Estágio 04: Hipótese

### 5.1 Função

Formular hipóteses explicativas para as observações da análise.

### 5.2 Entrada

- Analise (do estágio 03)
- Conhecimento Validado existente (para consistência)

### 5.3 Processo

1. **Formular:** Para cada padrão/anomalia, gerar 1+ hipóteses
2. **Atribuir confiança:** Score inicial baseado na força da evidência
3. **Classificar causalidade:** CORRELACIONAL, CAUSAL ou INDETERMINADO (ADR-034)
4. **Verificar consistência:** A hipótese contradiz conhecimento validado?
5. **Verificar limite:** Empresa já tem 7 hipóteses ativas neste domínio?
6. **Registrar:** Persistir hipótese com estado EM_OBSERVAÇÃO

### 5.4 Poda Automática

- Hipóteses com confiança < 20 são descartadas automaticamente
- Hipóteses redundantes são unificadas (mesmo padrão já tem hipótese? reforçar a existente)
- Hipóteses não falsificáveis são rejeitadas

### 5.5 Saída

```typescript
interface SaidaHipotese {
  criadas: Hipotese[];
  descartadas: Hipotese[];
  poda: { motivo: string; contagem: number };
}
```

### 5.6 Documento Fonte

Detalhado em: ARQUITETURA_DO_RACIOCINIO_COGNITIVO.md (Seções 1.5 e 2).

---

## Seção 6 — Estágio 05: Validação

### 6.1 Função

Testar hipóteses contra evidências disponíveis e planejar coleta de novas evidências.

### 6.2 Entrada

- Hipotese[] (do estágio 04)
- Evidências existentes no banco

### 6.3 Processo

1. **Coletar evidências:** Buscar evidências relacionadas à hipótese
2. **Verificar suficiência:** 3+ evidências independentes convergindo?
3. **Calcular score:** Aplicar fórmula de evolução de confiança
4. **Classificar:**
   - Confiança ≥ 70 → CONFIRMADA (se também tem 3+ evidências independentes)
   - Confiança < 10 → DESCARTADA
   - Evidência refutadora forte → REFUTADA
   - Caso contrário → permanece EM_OBSERVAÇÃO
5. **Identificar lacunas:** Se insuficiente, o que falta?
6. **Planejar aquisição:** Se aplicável, formular perguntas (MODELO_DE_PERGUNTAS_INTELIGENTES.md)

### 6.4 Saída

```typescript
interface SaidaValidacao {
  confirmadas: Hipotese[];
  refutadas: Hipotese[];
  descartadas: Hipotese[];
  emObservacao: Hipotese[];
  lacunas: LacunaEvidencia[];
  perguntasPlanejadas: Pergunta[];
}
```

### 6.5 Documento Fonte

Detalhado em: ARQUITETURA_DO_RACIOCINIO_COGNITIVO.md (Seções 1.6 e 3).

---

## Seção 7 — Estágio 06: Decisão

### 7.1 Função

Decidir o que fazer com base nas hipóteses validadas.

### 7.2 Entrada

- HipoteseValidada[] (do estágio 05)
- ContextoCognitivo vigente (para alinhamento)
- Objetivos ativos da empresa

### 7.3 Processo

1. **Agregar:** Reunir hipóteses CONFIRMADAS como insumos
2. **Ponderar:** Aplicar fórmula de prioridade (MODELO_DE_PRIORIZACAO_COGNITIVA.md)
3. **Resolver conflitos:** Se hipóteses contradizem, aplicar matriz de resolução (MODELO_DE_DECISAO_COGNITIVA.md Seção 2)
4. **Classificar:** Escolher nível de intervenção (MODELO_DE_INTERVENCAO.md)
5. **Formular decisão:** Produzir Decisao com tipo, ação, confiança, alternativas

### 7.4 Saída

```typescript
interface SaidaDecisao {
  decisao: Decisao;
  nivelIntervencao: 0-6;
  alternativasPreteridas: AlternativaDecisao[];
  requerValidacao: boolean;
}
```

### 7.5 Documento Fonte

Detalhado em: MODELO_DE_DECISAO_COGNITIVA.md e MODELO_DE_PRIORIZACAO_COGNITIVA.md.

---

## Seção 8 — Estágio 07: Execução

### 8.1 Função

Converter a decisão em ação concreta no sistema.

### 8.2 Entrada

- Decisao + Nível de Intervenção (do estágio 06)

### 8.3 Processo

1. **Mapear para ação:** Decisao.tipo → Ação do sistema:
   - SILENCIO → registrar e parar
   - ALERTA → criar notificação no Centro de Notificações
   - PERGUNTA → criar pergunta inline ou no chat
   - RECOMENDACAO → criar card no Centro de Decisão
   - TAREFA → criar tarefa no sistema de tarefas
   - PLANO → criar plano na seção de Planos
   - ACOMPANHAMENTO → ativar monitoramento pós-ação
2. **Registrar execução:** Persistir como AcaoCognitiva
3. **Notificar:** Se aplicável (+Nível 1), notificar o empresário

### 8.4 Saída

```typescript
interface SaidaExecucao {
  acaoCriada: AcaoCognitiva;
  canal: string;
  sucesso: boolean;
  idExterno: string; // id da tarefa, notificação, plano, etc.
}
```

### 8.5 Documento Fonte

Detalhado em: MODELO_DE_INTERVENCAO.md.

---

## Seção 9 — Estágio 08: Registro (Atualização do Patrimônio)

### 9.1 Função

Persistir todo o ciclo de raciocínio como patrimônio cognitivo.

### 9.2 Entrada

- Todos os outputs dos estágios 01-07

### 9.3 Processo

1. **Persistir sinal:** HistoricosSinal
2. **Persistir evidências:** Evidencia
3. **Persistir hipóteses:** Hipotese (atualizar estado)
4. **Persistir decisão:** AcaoCognitiva
5. **Atualizar memória:** Atualizar Short Term e Long Term conforme aplicável
6. **Publicar eventos:** Publicar eventos para cada etapa (cognitive-bus)
7. **Atualizar contexto:** Marcar contexto como "utilizado" (para controle de TTL)
8. **Verificar Lei 10:** Toda engine registrou sua saída?

### 9.4 Saída

```typescript
interface SaidaRegistro {
  patrimonioAtualizado: boolean;
  eventosPublicados: string[];
  memoriaAtualizada: {
    shortTerm: number; // itens adicionados
    longTerm: number; // itens atualizados
  };
}
```

### 9.5 Documento Fonte

Detalhado em: ARQUITETURA_DA_MEMORIA_OPERACIONAL.md e Lei 10 da Constituição da Engenharia.

---

## Seção 10 — Estágio 09: Aprendizado

### 10.1 Função

Extrair aprendizado do ciclo completo — o que funcionou, o que não funcionou, o que pode ser melhorado.

### 10.2 Entrada

- Decisao + AcaoCognitiva + Resultado observado (posterior)

### 10.3 Processo

1. **Aguardar resultado:** Se a ação gerou uma tarefa/plano, aguardar conclusão
2. **Comparar esperado × real:**
   - Resultado positivo → reforçar hipóteses base (+confiança)
   - Resultado negativo → enfraquecer hipóteses base (-confiança)
   - Resultado neutro/desconhecido → manter confiança
3. **Ajustar Motor:**
   - Hipótese confirmada por resultado → aumentar convicção
   - Hipótese refutada por resultado → mover para REFUTADA
   - Threshold de confiança muito baixo para este tipo de decisão? → ajustar
4. **Registrar aprendizado:**
   - Se confiança ≥ 85 e consistente por 30+ dias → Conhecimento Validado
   - Se não → manter como hipótese ativa

### 10.4 Aprendizado por Tipo de Resultado

| Resultado | Efeito na Confiança | Efeito na Convicção |
|-----------|:-------------------:|:-------------------:|
| Positivo (esperado confirmado) | +10 pontos | +30 dias |
| Positivo (melhor que esperado) | +15 pontos | +45 dias |
| Negativo (pior que esperado) | -20 pontos | Redefinir para 0 |
| Negativo (refutação direta) | -50 pontos | Mover para REFUTADA |
| Neutro (sem resultado observável) | 0 | 0 |

### 10.5 Saída

```typescript
interface SaidaAprendizado {
  conhecimentoValidado: ConhecimentoValidado | null;
  hipotesesAjustadas: AjusteHipotese[];
  metricasAprendizado: {
    ciclosComAprendizado: number;
    taxaRefutacao: number; // % de hipóteses refutadas vs confirmadas
  };
}
```

### 10.6 Documento Fonte

Detalhado em: ARQUITETURA_DO_RACIOCINIO_COGNITIVO.md (Seção 4).

---

## Seção 11 — Estágio 10: Atualização do Patrimônio

### 11.1 Função

Consolidar o aprendizado no patrimônio cognitivo permanente da empresa.

### 11.2 Entrada

- SaidaAprendizado (do estágio 09)

### 11.3 Processo

1. **Atualizar Conhecimento Validado:**
   - Se novo conhecimento: criar registro
   - Se conhecimento atualizado: revisar score, convicção, última validação
   - Se conhecimento refutado: mover para histórico (nunca deletar)
2. **Condensar memória:** Aplicar regras de condensação se aplicável (ARQUITETURA_DA_MEMORIA_OPERACIONAL.md Seção 4)
3. **Atualizar métricas:** Atualizar métricas de saúde cognitiva da empresa
4. **Publicar eventos:** PATRIMONIO_ATUALIZADO, CONHECIMENTO_VALIDADO, APRENDIZADO_REGISTRADO
5. **Retroalimentar:** O novo estado do patrimônio alimenta o próximo ciclo (Percepção)

### 11.4 Saída

```typescript
interface SaidaAtualizacaoPatrimonio {
  patrimonioVersao: number;
  conhecimentoValidado: ConhecimentoValidado[];
  memoriaStatus: { shortTerm: number; longTerm: number; archived: number };
  metricasSaude: MetricasSaudeCognitiva;
}
```

### 11.5 Documento Fonte

Detalhado em: ARQUITETURA_DA_MEMORIA_OPERACIONAL.md e Lei 10 da Constituição.

---

## Seção 12 — Integração entre Estágios

### 12.1 Contratos entre Estágios

Cada estágio tem um contrato de interface com o próximo:

| De | Para | Contrato | Acoplamento |
|:--:|:----:|:--------:|:-----------:|
| 01 | 02 | SinalProcessado → ContextoEnriquecido | Baixo (apenas tipo de dados) |
| 02 | 03 | ContextoEnriquecido → Analise | Baixo |
| 03 | 04 | Analise → Hipotese[] | Baixo |
| 04 | 05 | Hipotese[] → HipoteseValidada[] | Baixo |
| 05 | 06 | HipoteseValidada[] → Decisao | Baixo |
| 06 | 07 | Decisao → AcaoCognitiva | Baixo |
| 07 | 08 | AcaoCognitiva + todo ciclo → Registro | Médio (precisa de todo ciclo) |
| 08 | 09 | Registro → ResultadoObservado | Assíncrono (depende de tempo real) |
| 09 | 10 | Aprendizado → Patrimônio | Baixo |
| 10 | 01 | Patrimônio → novo estímulo | Assíncrono |

### 12.2 Mecanismo de Comunicação

- **Estágios 01-08:** Síncrono (chamada direta ou via cognitive-orchestrator)
- **Estágio 08 → 09:** Assíncrono (via evento: RESULTADO_OBSERVADO)
- **Estágio 10 → 01:** Assíncrono (via evento: PATRIMONIO_ATUALIZADO)

### 12.3 Tolerância a Falhas

| Estágio | Se falhar | Recuperação |
|:-------:|:---------:|:-----------:|
| 01 | Sinal perdido | Próximo ciclo pode recapturar (se for sinal persistente) |
| 02 | Contexto não montado | Usar último contexto válido (stale) |
| 03 | Análise incompleta | Processar parcialmente, agendar complemento |
| 04 | Hipótese não gerada | Regredir para estágio 03 no próximo ciclo |
| 05 | Validação não concluída | Manter hipótese EM_OBSERVAÇÃO |
| 06 | Decisão não tomada | Silêncio (Nível 0) — seguro por padrão |
| 07 | Ação não executada | Re-tentar no próximo ciclo |
| 08 | Registro falhou | Perda de patrimônio — CRÍTICO. Retry com backoff |
| 09 | Aprendizado perdido | Recalcular no próximo ciclo |
| 10 | Patrimônio desatualizado | Próximo ciclo corrige |

---

## Seção 13 — O Ciclo em Modos Especiais

### 13.1 Modo Emergência

Quando o estado cognitivo é CRÍTICO:
- Pulam-se os estágios 04 (Hipótese) e 05 (Validação)
- Vai direto de 03 (Análise) para 06 (Decisão)
- Decisão é tomada com a melhor evidência disponível
- Validação posterior é agendada

### 13.2 Modo Noturno

No ciclo agendado noturno:
- Pulam-se os estágios 06 (Decisão) e 07 (Execução)
- Foco em 03 (Análise), 04 (Hipótese), 05 (Validação), 09 (Aprendizado)
- Resultados disponíveis para o próximo login do empresário

### 13.3 Modo Onboarding

Nos primeiros 7 dias:
- Pulam-se os estágios 05 (Validação) e 06 (Decisão)
- Decisão padrão: PERGUNTAR (Nível 2)
- Objetivo: preencher lacunas de conhecimento, não decidir

### 13.4 Modo Silêncio

Quando confiança < 40 para todos os outputs:
- Executa apenas os estágios 01, 02, 08 (registro)
- Nada é apresentado ao empresário
- O Motor continua observando

---

## Seção 14 — Descobertas, Pressupostos, Lacunas, Riscos

### Descobertas

1. Os 10 estágios podem ser mapeados diretamente para engines existentes na arquitetura: cognitive-context-engine (02), evidence-engine (03), trust-engine (04-05), decision-engine (06), cognitive-experience-engine (07), cognitive-memory-engine (08-10).
2. A tolerância a falhas por estágio (Seção 12.3) mostra que o ciclo é resiliente — a falha de um estágio não quebra todo o sistema.
3. O ciclo noturno (Modo Noturno) é o mais importante para a manutenção do patrimônio cognitivo.

### Pressupostos

1. **P1:** A comunicação síncrona entre estágios 01-08 é viável para o volume atual de empresas.
2. **P2:** O ciclo completo de 10 estágios em 1.5s é aceitável para interação em tempo real.
3. **P3:** O Modo Emergência (pular estágios 04-05) não compromete a qualidade da decisão em situações críticas.

### Lacunas

1. **L1:** Não foi especificado o mecanismo de "resultado observado" — como o Motor sabe que uma ação foi concluída e qual foi o resultado?
2. **L2:** A integração com o cognitive-orchestrator existente não foi detalhada (o orchestrator atual coordena engines; como ele se adapta a este ciclo de 10 estágios?)
3. **L3:** O ciclo paralelo (múltiplos ciclos para a mesma empresa ao mesmo tempo) não foi especificado — pode haver concorrência?

### Riscos

1. **R1 — Ciclo infinito:** Se o estágio 09 (Aprendizado) alimenta o estágio 01 (Percepção) com um resultado que gera novo ciclo, pode haver loop. Mitigação: hash de deduplicação impede reprocessamento do mesmo sinal.
2. **R2 — Latência cumulativa:** Se cada estágio adiciona 200ms, o ciclo total pode chegar a 2s. Mitigação: paralelismo nos estágios 03 e 04.
3. **R3 — Estado inconsistente:** Se o ciclo é interrompido no meio (estágio 05), parte do patrimônio foi atualizada e parte não. Mitigação: cada estágio é transacional — ou persiste tudo ou não persiste nada.

### Conflitos

Nenhum conflito encontrado. O ciclo de 10 estágios é consistente com ADR-013 (ciclo contínuo por eventos), ADR-024 (pipeline único) e com o cognitive-orchestrator existente.

### Impacto Futuro

1. O ciclo de 10 estágios é o blueprint completo para implementação do Motor Cognitivo.
2. Cada estágio pode ser implementado, testado e evoluído independentemente.
3. A tolerância a falhas garante que o Motor continue operando mesmo com estágios individuais degradados.
