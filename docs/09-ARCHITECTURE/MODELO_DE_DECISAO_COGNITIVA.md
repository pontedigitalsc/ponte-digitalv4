# Modelo de Decisão Cognitiva

> **Programa 12 — Fase 3: Motor Cognitivo**
> Versão: 1.0
> Propósito: Definir como a Ponte Digital constrói, pondera e executa decisões

---

## Preâmbulo

O Documento 1 (ARQUITETURA_DO_RACIOCINIO_COGNITIVO) definiu o ciclo completo de raciocínio. O estágio 6 desse ciclo é a Decisão — o momento em que hipóteses validadas se transformam em ação.

Este documento especifica em profundidade como a Decisão funciona: como o Motor escolhe entre alternativas, como pondera fatores conflitantes, como incorpora confiança, histórico, contexto, a voz do empresário e a sabedoria do coletivo.

A decisão na Ponte Digital nunca é um ato isolado. Ela é sempre o resultado de um processo ponderado, rastreável e reversível.

---

## Seção 1 — Construção de Decisões

### 1.1 O Processo de Decisão

Toda decisão passa por 5 fases sequenciais:

```
ENTRADA → PONDERAÇÃO → CLASSIFICAÇÃO → FORMULAÇÃO → REGISTRO
```

### 1.2 Fase 1 — Entrada

A fase de entrada coleta todos os insumos necessários para a decisão:

**Insumos obrigatórios:**
- **Hipóteses validadas** (do estágio 5 do ciclo de raciocínio) — o que o Motor sabe sobre a situação
- **Contexto Cognitivo vigente** (ADR-021) — pacote fechado com o estado atual da empresa
- **Objetivos ativos** — metas que o empresário definiu ou o Motor inferiu
- **Restrições** — limites que não podem ser ultrapassados (orçamento, tempo, plano contratado)

**Insumos opcionais:**
- **Histórico de decisões similares** — o que foi decidido antes e qual foi o resultado
- **Decisões coletivas** — o que empresas similares decidiram (anonimizado)
- **Preferências do empresário** — expressas em interações anteriores

### 1.3 Fase 2 — Ponderação

Cada alternativa possível recebe um score ponderado:

```
ScoreAlternativa = Σ(pesoFator × valorFator) × ConfiancaBase × ConviccaoBase
```

**Fatores de ponderação:**

| Fator | Peso Padrão | Fonte | Descrição |
|-------|------------|-------|-----------|
| Urgência | 0.25 | prioridade do sinal original | Quão rápido precisa agir |
| Impacto | 0.25 | projeção da hipótese | Consequência da decisão |
| Confiança | 0.20 | score da(s) hipótese(s) base | Quanto o Motor confia nas evidências |
| Alinhamento | 0.15 | objetivos ativos da empresa | A decisão serve aos objetivos? |
| Momento | 0.10 | contexto cognitivo | É o momento certo? |
| Custo | 0.05 | restrições e recursos | Quanto custa implementar |

**Regras de ponderação:**
- Os pesos podem ser ajustados por tipo de decisão (financeira, operacional, estratégica)
- Se o empresário explicitou uma preferência, o peso da preferência é dobrado naquele domínio
- A soma dos pesos deve ser sempre 1.0

### 1.4 Fase 3 — Classificação

Cada alternativa é classificada em uma das categorias:

| Categoria | Score | Ação |
|-----------|-------|------|
| **INVIÁVEL** | Score < 20 | Bloqueada — nem é apresentada como alternativa |
| **POSSÍVEL** | 20 ≤ Score < 50 | Pode ser considerada mas com ressalvas |
| **RECOMENDÁVEL** | 50 ≤ Score < 80 | Recomendada mas requer validação do empresário |
| **CONFIÁVEL** | 80 ≤ Score < 95 | Pode ser executada automaticamente |
| **CRÍTICA** | Score ≥ 95 | Execução imediata com notificação |

### 1.5 Fase 4 — Formulação

A alternativa selecionada é transformada em uma decisão executável:

```
Decisao {
  tipo: 'RECOMENDACAO' | 'ALERTA' | 'PERGUNTA' | 'TAREFA' | 'PLANO' | 'SILENCIO',
  acao: string,
  confianca: number,
  nivelIntervencao: 0-5,
  alternativasPreteridas: Alternativa[],
  evidenciasBase: EvidenciaRef[],
  hipotesesBase: HipoteseRef[],
  prazo: string | null,
  requerValidacao: boolean,
  modoExecucao: 'AUTOMATICO' | 'AGENDADO' | 'MANUAL'
}
```

### 1.6 Fase 5 — Registro

Toda decisão é registrada como patrimônio cognitivo (Lei 10):

- Persistida em AcaoCognitiva
- Vinculada às hipóteses que a fundamentam
- Vinculada ao contexto cognitivo vigente no momento
- Publicado evento DECISAO_REGISTRADA

---

## Seção 2 — Conflitos entre Prioridades

### 2.1 Tipos de Conflito

**C1 — Curto prazo vs Longo prazo:**
Uma ação urgente agora (ex.: pagar fornecedor atrasado) compete com uma ação estratégica (ex.: planejar expansão).

**C2 — Domínios concorrentes:**
Finanças recomenda cortar custos. CRM recomenda contratar vendedor. Ambas não podem ser executadas simultaneamente.

**C3 — Hipóteses contraditórias:**
Hipótese A diz "aumentar preço reduz vendas". Hipótese B diz "aumentar preço não afeta vendas". As recomendações baseadas em cada uma são opostas.

**C4 — Recursos limitados:**
Duas decisões recomendam usar o mesmo recurso (tempo do empresário, orçamento).

### 2.2 Matriz de Resolução de Conflitos

| Conflito | Método de Resolução | Critério de Desempate |
|----------|--------------------|-----------------------|
| C1 — Curto vs Longo | Score ponderado com peso maior para longo prazo (70/30) | Se urgência ≥ 9, curto prazo vence |
| C2 — Domínios | Média dos scores por domínio | Domínio com maior impacto financeiro vence |
| C3 — Hipóteses contraditórias | Hipótese com maior confiança × convicção vence | Se empate, ambas são apresentadas como alternativas |
| C4 — Recursos limitados | Decisão com maior score × impacto vence | Se empate, o empresário decide |

### 2.3 Conflito não resolvível

Se após aplicar a matriz de resolução o conflito persistir (scores equivalentes dentro de 5%), o Motor:
1. Apresenta ambas as alternativas ao empresário
2. Explica o conflito: "As evidências apontam em direções opostas"
3. Pergunta qual caminho seguir
4. Registra a escolha do empresário como aprendizado para conflitos futuros similares

---

## Seção 3 — Influência da Confiança

### 3.1 Como a Confiança Afeta Decisões

A confiança atua em três pontos do processo de decisão:

**Ponto 1 — Threshold de entrada:**
Uma hipótese só participa do processo de decisão se sua confiança ≥ 30. Abaixo disso, a hipótese não é considerada (ainda está em observação).

**Ponto 2 — Peso na ponderação:**
A confiança da hipótese base multiplica o score de cada alternativa (ver fórmula da Seção 1.3).

**Ponto 3 — Nível de intervenção:**
O nível de intervenção (0-5) é diretamente determinado pela confiança da decisão (ver MODELO_DE_INTERVENCAO.md).

### 3.2 Fórmula de Influência da Confiança

```
ConfiancaDecisao = MédiaPonderada(
  ConfiancaHipotese1 × PesoEvidencia1,
  ConfiancaHipotese2 × PesoEvidencia2,
  ...
)
```

Onde:
- PesoEvidencia = confiança da fonte (ver MODELO_DE_CONFIANCA.md) × força da evidência

### 3.3 Degradação da Confiança

A confiança decai naturalmente com o tempo (ADR-026):
- Decisões baseadas em evidências com mais de 30 dias perdem 10% de confiança
- Decisões baseadas em evidências com mais de 90 dias perdem 25% de confiança
- Decisões baseadas em evidências com mais de 1 ano perdem 50% de confiança

A exceção é a convicção (ADR-032): conhecimento que resistiu ao tempo sem refutação mantém sua confiança.

---

## Seção 4 — Influência do Histórico

### 4.1 Como o Histórico Afeta Decisões

O histórico de decisões anteriores influencia a decisão atual de três formas:

**F1 — Aprendizado com resultados passados:**
Se uma decisão similar foi tomada antes, o Motor consulta:
- O resultado foi positivo ou negativo?
- As condições eram similares?
- A decisão anterior foi validada pelo empresário?

**F2 — Padrões de comportamento do empresário:**
Se o empresário consistentemente prefere um tipo de solução (ex.: cortar custos antes de aumentar receita), o Motor aprende essa preferência.

**F3 — Inércia de decisão:**
Se uma decisão similar foi tomada há menos de 7 dias, o Motor tem resistência a reverter:
- Mesma decisão com resultado positivo → reforço
- Mesma decisão com resultado negativo → revisão forçada
- Decisão oposta dentro de 7 dias → exige justificativa extra

### 4.2 Score de Histórico

```
ScoreHistorico = (ResultadosPositivos / TotalDecisoesSimilares) × FatorRecencia
```

- FatorRecencia = resultados recentes (últimos 30 dias) têm peso 2x
- Se não há histórico, ScoreHistorico = 0 (neutro)

---

## Seção 5 — Influência do Contexto

### 5.1 Como o Contexto Afeta Decisões

O Contexto Cognitivo (ADR-021) é o pacote fechado que contém tudo que o Motor sabe sobre a empresa no momento da decisão. Seu pacote influencia a decisão através de:

**C1 — Estado cognitivo da empresa:**
Empresa em estado SAUDÁVEL recebe recomendações de crescimento. Empresa em estado CRÍTICO recebe recomendações de sobrevivência (ver MODELO_DE_ESTADOS.md).

**C2 — Momento do ciclo de vida:**
Empresa em Fase de Implantação (primeiros 30 dias) recebe recomendações de cadastro e configuração. Empresa em Fase de Otimização recebe recomendações de eficiência.

**C3 — Domínio ativo no momento:**
Se o empresário está na seção financeira, decisões financeiras têm precedência. Se está no CRM, decisões de cliente têm precedência.

**C4 — Sobrecarga cognitiva:**
Se o empresário recebeu 3+ intervenções nas últimas 24 horas, o Motor reduz o nível de intervenção em 1 (exceto para CRÍTICO).

### 5.2 Peso do Contexto

O contexto não adiciona peso à fórmula — ele modula o threshold de cada categoria:

| Contexto | Threshold Mínimo para RECOMENDÁVEL | Ajuste |
|----------|----------------------------------|--------|
| Normal | 50 | — |
| Crítico | 70 | Mais evidência necessária |
| Primeira semana | 80 | Apenas recomendações muito seguras |
| Expansão | 40 | Mais permissivo para recomendações de crescimento |
| Retração | 30 | Recomendações de corte têm precedência |

---

## Seção 6 — Influência do Empresário

### 6.1 Hierarquia de Autoridade

O empresário é a maior autoridade no sistema de decisão:

1. **Instrução explícita:** O empresário diz "quero X". O Motor executa X (a menos que X seja impossível ou ilegal).
2. **Preferência expressa:** O empresário escolheu consistentemente opções do tipo A. O Motor assume preferência por A.
3. **Validação de recomendação:** O empresário confirma ou rejeita uma recomendação. A confiança da hipótese base é ajustada.
4. **Silêncio:** O empresário não respondeu a recomendações similares. O Motor assume que a recomendação não era prioritária.

### 6.2 Veto do Empresário

O empresário pode vetar qualquer decisão do Motor:

- **Veto simples:** "Não quero isso." → a recomendação é descartada e o Motor registra o veto como aprendizado.
- **Veto com explicação:** "Não quero isso porque X." → o Motor aprende a regra X permanentemente.
- **Desensinar:** "Isso que você aprendeu está errado." → o Motor refuta a hipótese correspondente.

### 6.3 Adaptação ao Estilo do Empresário

O Motor adapta seu estilo de decisão ao perfil do empresário:

| Perfil | Comportamento do Motor |
|--------|----------------------|
| **Delegador** | Executa recomendações automaticamente com confiança ≥ 60 |
| **Controlador** | Requer validação mesmo para recomendações com confiança ≥ 80 |
| **Consultivo** | Quer ver alternativas antes de decidir |
| **Urgente** | Prioriza rapidez sobre precisão |

O perfil é inferido pelo Motor observando o comportamento do empresário nas primeiras interações.

---

## Seção 7 — Influência do Coletivo

### 7.1 Aprendizado Coletivo Anonimizado

O Motor coleta padrões anonimizados de todas as empresas para melhorar decisões:

**O que é coletado (anonimizado):**
- Padrões de decisão que funcionaram (resultado positivo confirmado)
- Padrões de decisão que não funcionaram (resultado negativo confirmado)
- Correlações entre decisões e outcomes (sem identificar empresas)

**O que NÃO é coletado:**
- Dados específicos de qualquer empresa
- Decisões individuais identificáveis
- Informações financeiras ou de clientes

### 7.2 Como o Coletivo Influencia a Decisão

```
ScoreColetivo = ConfiancaColetiva × RelevanciaParaEmpresa
```

- ConfiancaColetiva: proporção de empresas similares onde a decisão teve resultado positivo (0-100)
- RelevanciaParaEmpresa: quão similares as empresas do coletivo são com esta empresa (0-1)

O ScoreColetivo é incorporado como um fator adicional na ponderação (Seção 1.3) com peso 0.10 (subtraído do peso de Momento).

### 7.3 Limites do Coletivo

- O coletivo nunca sobrepõe a instrução explícita do empresário
- Se o ScoreColetivo contradiz a hipótese base, o Motor apresenta ambas como alternativas
- Empresas com menos de 30 dias de uso não recebem influência coletiva (período de calibragem)

---

## Seção 8 — Casos Especiais de Decisão

### 8.1 Decisão sem Hipóteses

Quando não há hipóteses validadas (empresa nova), o Motor opera em modo exploratório:
- Pergunta ao empresário para coletar informações
- Não faz recomendações (falta base de conhecimento)
- Observa e registra

### 8.2 Decisão Urgente sem Validação Completa

Quando um sinal é classificado como CRÍTICO (urgência ≥ 9):
1. O Motor pula a validação completa (fase de ponderação é acelerada)
2. Toma a decisão com base no melhor conhecimento disponível
3. Executa a intervenção imediata
4. Agenda validação posterior no próximo ciclo noturno

### 8.3 Decisão de Silêncio

A decisão de não intervir também é uma decisão:
- Registrada como Decisao com tipo = SILENCIO
- Vinculada ao contexto e às hipóteses avaliadas
- Publica evento DECISAO_SILENCIO (para auditoria)

---

## Seção 9 — Descobertas, Pressupostos, Lacunas, Riscos

### Descobertas

1. O modelo de decisão da Ponte Digital pode ser implementado inteiramente com regras determinísticas — não requer ML ou IA para a ponderação.
2. A maior complexidade está na gestão de conflitos entre domínios, não no cálculo de scores.
3. A influência do coletivo é o fator mais delicado: muito peso pode homogeneizar decisões; pouco peso ignora aprendizado valioso.

### Pressupostos

1. **P1:** Empresas similares compartilham padrões de decisão que são transferíveis. Pode não ser verdade para negócios muito específicos ou sazonais.
2. **P2:** O empresário tem tempo e disposição para vetar decisões. Se ele nunca veta, o Motor pode não ter feedback para ajustar.
3. **P3:** 7 dias é o período adequado para inércia de decisão (não reverter decisões antes disso).

### Lacunas

1. **L1:** A adaptação ao perfil do empresário (Seção 6.3) precisa de um mecanismo de detecção de perfil. Não foi especificado como inferir o perfil nas primeiras interações.
2. **L2:** O threshold de entrada da hipótese (confiança ≥ 30) não foi diferenciado por tipo de decisão. Decisões financeiras podem exigir threshold maior.
3. **L3:** Fórmula de ScoreColetivo precisa de um mecanismo de similaridade entre empresas (quais são empresas "similares"?).

### Riscos

1. **R1 — Viés de confirmação coletivo:** Se todas as empresas do coletivo tomaram a mesma decisão, o Motor pode perpetuar uma decisão subótima. Mitigação: o coletivo tem peso máximo de 0.10.
2. **R2 — Perfil mal classificado:** Se o Motor classifica o empresário como "Delegador" mas ele é "Controlador", decisões automáticas podem gerar desconfiança. Mitigação: o empresário pode reclassificar seu perfil explicitamente.
3. **R3 — Acúmulo de decisões de silêncio:** Se o Motor decide silenciar em muitas situações, o patrimônio cognitivo fica poluído por decisões de não-ação. Mitigação: decisões de silêncio são registradas mas não contam para o limite de intervenções.

### Conflitos

Nenhum conflito com código, ADRs, ou documentos anteriores.

### Impacto Futuro

1. O modelo de ponderação pode ser evoluído para incluir novos fatores sem quebrar decisões existentes.
2. A separação entre fases de decisão permite que o empresário veja e entenda cada etapa.
3. A influência do coletivo pode ser desligada se houver evidência de que prejudica decisões individuais.
