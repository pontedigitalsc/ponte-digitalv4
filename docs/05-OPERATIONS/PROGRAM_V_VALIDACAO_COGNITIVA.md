# Programa V — Validação Cognitiva

## 1. Propósito

A Ponte Digital adota um processo orientado por hipóteses para garantir que **cada nova capacidade cognitiva nasce primeiro como uma hipótese simples, é validada manualmente ou por regras determinísticas em um cliente real, e só depois ganha uma implementação arquitetural completa dentro do Motor Cognitivo**.

Isso impede que a engenharia se afaste da realidade do empresário sem sacrificar a arquitetura de longo prazo. A arquitetura deixa de nascer de ideias — ela passa a nascer de conhecimento validado.

---

## 2. Os três eixos de evolução

A Ponte Digital passou a distinguir três tipos de evolução, cada um com métricas independentes:

### Evolução da Engenharia

*Mede:* estamos construindo corretamente?

| Indicador | Descrição |
|-----------|-----------|
| WPs concluídos | Milestones do Programa de Execução |
| ADRs registrados | Decisões arquiteturais documentadas |
| Cobertura de testes | Qualidade e segurança do código |
| Performance | Tempo de resposta, vazão, escalabilidade |
| Observabilidade | Monitoramento, logging, métricas |

### Evolução da Inteligência

*Mede:* estamos aprendendo corretamente?

| Indicador | Descrição |
|-----------|-----------|
| TRC (Taxa de Resolução Correta) | Decisões acertadas vs. erradas |
| TDM (Taxa de Decisão Manual) | Decisões que exigiram intervenção humana |
| TCP (Taxa de Conhecimento Promovido) | Hipóteses que se tornaram conhecimento formal |
| Ciclo hipótese → conhecimento | Velocidade de aprendizado |
| Modelos mentais | Qualidade dos padrões identificados |

### Evolução do Negócio

*Mede:* estamos criando valor suficiente?

| Indicador | Descrição |
|-----------|-----------|
| Adoção | Uso recorrente pelas empresas |
| Retenção | Continuidade no uso ao longo do tempo |
| TVE (Taxa de Valor Entregue) | Impacto percebido pelo empresário |

A TVE responde perguntas como: quanto tempo foi economizado? quanto dinheiro foi recuperado? quantos clientes deixaram de ser perdidos? quantas decisões difíceis foram evitadas?

**Engenharia mede capacidade. Motor Cognitivo mede inteligência. TVE mede transformação percebida.**

---

## 3. O ciclo oficial

Toda nova capacidade cognitiva percorre obrigatoriamente este ciclo:

```
Problema observado
       ↓
   Hipótese
       ↓
  Experimento
       ↓
  Validação
       ↓
 Conhecimento
       ↓
  Arquitetura
       ↓
 Implementação
       ↓
   Medição
       ↓
Novo aprendizado
```

Cada etapa depende da conclusão da anterior. Nenhuma etapa pode ser pulada.

---

## 4. Regras obrigatórias

1. **Nenhuma hipótese vira arquitetura sem validação.**
2. **Nenhuma arquitetura nasce apenas por entusiasmo.**
3. **Toda hipótese precisa indicar:**
   - Problema observado
   - Premissas
   - Forma de medir
   - Critério de sucesso
   - Critério de descarte
4. **O experimento pode ser manual, SQL, regra determinística ou script — não precisa de infraestrutura do Motor Cognitivo.**
5. **A implementação arquitetural só começa após a hipótese ser validada com evidências reais.**

---

## 5. Template oficial de hipótese

Cada hipótese registrada deve conter:

| Campo | Descrição |
|-------|-----------|
| **Nome** | Identificador único da hipótese |
| **Problema** | Qual observação motivou esta hipótese |
| **Hipótese** | O que acreditamos ser verdade |
| **Premissas** | O que precisa ser verdade para a hipótese valer |
| **Experimento** | Como vamos testar (pode ser SQL, regra, manual) |
| **Métrica** | O que será medido |
| **Critério de aprovação** | A partir de qual valor a hipótese é considerada válida |
| **Critério de rejeição** | A partir de qual valor a hipótese é descartada |
| **Conhecimento esperado** | O que aprenderemos independentemente do resultado |
| **Impacto esperado na arquitetura** | O que pode precisar ser construído se a hipótese for validada |

---

## 6. Relação com o EXECUTION_PROGRAM

O Programa V **não substitui** os Programas existentes:

- P1 — Fundação
- P2 — Event Bus
- P3 — Cognitive Pipeline
- P4 — Cognitive Engine
- P5 — Collective Intelligence
- P6 — Cognitive Platform

O Programa V **antecede** cada nova evolução arquitetural.

Quando uma hipótese é validada no Programa V, ela pode gerar:

- Nova ADR
- Novo WP
- Nova Engine
- Nova Capability
- Novo fluxo no pipeline cognitivo

O EXECUTION_PROGRAM permanece inalterado. O Programa V é o filtro que decide o que entra no EXECUTION_PROGRAM.

---

## 7. Relação com o Motor Cognitivo

O Motor Cognitivo da Ponte Digital deve usar exatamente este mesmo ciclo internamente:

```
Observação → Hipótese → Experimento → Validação → Conhecimento
```

Ou seja: **o processo usado para evoluir a empresa é o mesmo que a IA usa para evoluir conhecimento.**

Isso garante que:

- O Motor Cognitivo não "chuta" respostas — ele formula hipóteses
- Cada recomendação é um experimento
- Cada feedback é uma validação
- Cada aprendizado vira conhecimento formal

O Motor Cognitivo não é uma caixa-preta que produz verdades. É um ciclo científico executado em tempo real para cada empresa.

---

## 8. Relação com TVE (Taxa de Valor Entregue)

A TVE formaliza a medição de evolução percebida pelo empresário.

**Ela não mede inteligência. Ela mede impacto.**

| Eixo | Mede | Pergunta |
|------|------|----------|
| Engenharia | Capacidade | Estamos construindo corretamente? |
| Motor Cognitivo | Inteligência | Estamos aprendendo corretamente? |
| TVE | Transformação percebida | O empresário está sentindo diferença? |

Exemplos de métricas que compõem a TVE:

- Horas economizadas por mês
- Receita recuperada ou evitada de perda
- Clientes retidos que seriam perdidos
- Decisões difíceis que foram simplificadas
- Tempo médio entre problema detectado e ação tomada

A TVE ainda não possui um sistema de medição automatizado na arquitetura atual. Este documento reconhece sua existência como princípio e direção futura.

---

## 9. Critérios de encerramento

O Programa V termina quando:

1. Uma hipótese foi claramente formulada seguindo o template oficial.
2. Um experimento foi executado (SQL, regra, manual, script).
3. O experimento produziu evidência suficiente para aprovar ou rejeitar a hipótese.
4. O conhecimento gerado foi registrado na documentação ou no Motor Cognitivo.
5. O conhecimento entrou oficialmente na arquitetura (ADR, WP, Engine, Capability).

---

## 10. Princípios finais

1. **Arquitetura não é patrimônio.**
   Código pode ser reescrito. Arquitetura pode ser substituída.

2. **Conhecimento é patrimônio.**
   O que foi aprendido sobre o domínio, o empresário e o mercado não se perde quando o código muda.

3. **Código implementa arquitetura.**
   Código é a manifestação temporária de uma decisão arquitetural.

4. **Arquitetura implementa conhecimento.**
   Cada componente, cada fluxo, cada regra existe porque representa algo que aprendemos.

5. **Conhecimento nasce da realidade.**
   Nenhuma reunião, nenhum documento, nenhum diagrama substitui uma observação real do comportamento do empresário.

6. **Uma hipótese validada vale mais que mil linhas de código.**

---

*Documento criado em julho de 2026. Nenhum documento existente foi alterado. Nenhuma ADR foi modificada. Nenhuma arquitetura foi alterada.*
