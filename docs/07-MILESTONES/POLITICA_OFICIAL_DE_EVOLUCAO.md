# Política Oficial de Evolução

## Aprovada em: 29 de julho de 2026 — Foundation Release V2.0

---

## Princípio

A Ponte Digital não evolui por opinião.

Evolui por **evidência**.

A partir deste programa, nenhuma funcionalidade relevante pode nascer apenas de uma ideia — mesmo que seja uma boa ideia, mesmo que venha do Founder, mesmo que pareça urgente.

Toda evolução deve ser baseada em:

1. Evidências recorrentes
2. Hipóteses registradas
3. Experimentos controlados
4. Padrões observados
5. Solicitações recorrentes de Founders
6. Princípios constitucionais

---

## Hierarquia de Evidência

| Nível | Tipo | Peso | Exemplo |
|-------|------|------|---------|
| 1 | Opinião | Mínimo | "Acho que devíamos ter X" |
| 2 | Solicitação única | Baixo | Um Founder pediu Y |
| 3 | Padrão observado | Médio | 3+ Founders tiveram a mesma dificuldade |
| 4 | Hipótese registrada | Médio-Alto | "Se implementarmos Z, então W melhora" |
| 5 | Experimento | Alto | Teste A/B com resultado mensurável |
| 6 | Evidência recorrente | Máximo | 10+ Founders validaram o mesmo padrão |

**Regra:** Nível 1 ou 2 nunca gera funcionalidade diretamente. No máximo, inicia uma hipótese.

---

## Como uma Funcionalidade Nasce

```
Opinião ou ideia
       ↓
Registrar como hipótese em docs/08-KNOWLEDGE/HIPOTESES/
       ↓
Hipótese precisa responder:
  - Que evidência confirmaria esta hipótese?
  - Como medir?
  - Em quanto tempo?
       ↓
Se evidência suficiente (Nível 4+):
  - Passar pelo Critério de Novos Desenvolvimentos (7 perguntas)
  - Se aprovado: entra no backlog
  - Se rejeitado: aguarda mais evidência
```

---

## O que NUNCA Justifica uma Funcionalidade

- "É uma boa prática de engenharia" — sem evidência de valor para o Founder
- "Todos os concorrentes têm" — a Ponte não compete com concorrentes
- "Um investidor pediu" — investidores não são Founders
- "Vai ser útil um dia" — utilidade futura não é evidência presente
- "É fácil de implementar" — facilidade não é critério
- "O código está feio" — estética de código não justifica funcionalidade

---

## Ciclo de Evolução

```
Observação (Founder usando)
       ↓
Registro (padrão, dificuldade, solicitação)
       ↓
Hipótese ("Se X, então Y")
       ↓
Experimento (implementação mínima + Founder real)
       ↓
Evidência (dados antes/depois)
       ↓
Decisão (evolui, ajusta ou descarta)
       ↓
Incorporação (se positiva: vira patrimônio)
```

Cada ciclo deve durar no máximo **2 semanas** para experimentos pequenos, **1 mês** para experimentos médios.

---

## Papéis

### Founder da Ponte (guardião da Constituição)
- Aprova ou rejeita hipóteses
- Garante que a evolução respeita a Constituição
- Decide quando uma evidência é suficiente

### Founders (empresários usando a Ponte)
- Fornecem evidência através do uso real
- Reportam dificuldades e sugestões
- Validam ou invalidam hipóteses

### Agentes de Código
- Implementam apenas funcionalidades aprovadas
- Nunca propõem funcionalidades novas sem passar pelo ciclo
- Documentam cada alteração

---

## Registro de Hipóteses

Toda hipótese deve ser registrada em `docs/08-KNOWLEDGE/HIPOTESES/` com o formato:

```markdown
# Hipótese: [título]

**Data:** [data]
**Autor:** [quem propôs]
**Nível de evidência:** [1-6]
**Founders envolvidos:** [quantos]

**Afirmação:** Se [mudança], então [resultado esperado]

**Evidência atual:** [o que sabemos hoje]
**Evidência necessária:** [o que precisamos para confirmar]

**Como medir:** [métrica específica]
**Prazo:** [até quando]

**Decisão:** [aprovada / rejeitada / aguardando]
**Data da decisão:** [data]
```

---

## Exceções

As únicas evoluções que não precisam de hipótese prévia:

1. **Correção de bugs** — qualquer bug identificado
2. **Melhorias de performance** — sem mudança de comportamento
3. **Acessibilidade** — sem mudança de funcionalidade
4. **Segurança** — prioridade máxima, qualquer vulnerabilidade
5. **Conformidade legal** — LGPD, regulamentações

Toda exceção deve ser registrada em `docs/05-OPERATIONS/KNOWN_ISSUES.md`.

---

## Vigência

Esta política entra em vigor na **Foundation Release V2.0** e substitui todas as políticas anteriores de priorização.

Ela própria pode ser alterada, mas apenas por ADR aprovado.

---

**A opinião inicia hipóteses. A evidência define prioridades.**
