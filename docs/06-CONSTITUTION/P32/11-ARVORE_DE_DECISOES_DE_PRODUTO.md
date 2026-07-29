# Árvore de Decisões de Produto

*Estrutura de decisão para toda funcionalidade, alteração ou investimento na Ponte Digital.*

---

## 1. Propósito

A Árvore de Decisões de Produto é o filtro que toda proposta deve atravessar antes de ser implementada. Ela garante que cada decisão de produto seja consistente com a Constituição e com o momento da empresa.

---

## 2. A Árvore

```
NOVA FUNCIONALIDADE/ALTERAÇÃO
         │
         ▼
┌─────────────────────────────────┐
│ 1. ALINHAMENTO CONSTITUCIONAL   │ ← SE NÃO: REJEITAR
└──────────┬──────────────────────┘
           │ SIM
           ▼
┌─────────────────────────────────┐
│ 2. REGRA DE OURO                │ ← SE VIOLAR: REJEITAR
└──────────┬──────────────────────┘
           │ RESPEITA
           ▼
┌─────────────────────────────────┐
│ 3. PROBLEMA REAL DO EMPRESÁRIO  │ ← SE NÃO: REJEITAR
└──────────┬──────────────────────┘
           │ SIM
           ▼
┌─────────────────────────────────┐
│ 4. AJUDA A DECIDIR MELHOR?     │ ← SE NÃO: REJEITAR
└──────────┬──────────────────────┘
           │ SIM
           ▼
┌─────────────────────────────────┐
│ 5. REDUZ TRABALHO MANUAL?      │ ← SE NÃO: QUESTIONAR
└──────────┬──────────────────────┘
           │ SIM
           ▼
┌─────────────────────────────────┐
│ 6. GERA CONHECIMENTO FUTURO?   │ ← SE NÃO: QUESTIONAR
└──────────┬──────────────────────┘
           │ SIM
           ▼
┌─────────────────────────────────┐
│ 7. FORTALECE PATRIMÔNIO?       │ ← SE NÃO: QUESTIONAR
└──────────┬──────────────────────┘
           │ SIM
           ▼
┌─────────────────────────────────┐
│ 8. USO SEMANAL?                 │ ← SE NÃO: QUESTIONAR
└──────────┬──────────────────────┘
           │ SIM
           ▼
┌─────────────────────────────────┐
│ 9. MVP VIÁVEL?                  │ ← SE NÃO: REDUZIR ESCOPO
└──────────┬──────────────────────┘
           │ SIM
           ▼
┌─────────────────────────────────┐
│ 10. SPRING ATUAL?               │ ← SE NÃO: FILA
└──────────┬──────────────────────┘
           │ SIM
           ▼
       IMPLEMENTAR
```

---

## 3. Detalhamento de cada nó

### Nó 1: Alinhamento Constitucional

A funcionalidade viola algum artigo da Constituição?

**Verificar:**
- Regra de Ouro
- Definição de patrimônios
- Modelo de capacidades
- Princípios de experiência
- Domínios definidos

**Se violar:** Rejeitar com justificativa constitucional.

### Nó 2: Regra de Ouro

A funcionalidade faz a Ponte Digital decidir pela empresa?

**Pergunta-chave:** "Isso substitui ou amplifica a decisão do empresário?"

**Se substituir:** Rejeitar.

### Nó 3: Problema Real

A funcionalidade resolve um problema que o empresário realmente tem?

**Verificar:**
- O empresário sabe que tem esse problema?
- O empresário já tentou resolver de outra forma?
- O problema aparece com frequência?

**Se não:** Rejeitar.

### Nó 4: Ajuda a Decidir Melhor

A funcionalidade melhora a qualidade das decisões da empresa?

**Critérios:**
- Reduz incerteza na decisão
- Fornece informação relevante
- Acelera o ciclo decisório
- Aumenta a confiança na decisão

### Nó 5: Reduz Trabalho Manual

A funcionalidade elimina ou reduz trabalho repetitivo do empresário?

**Exemplos:**
- Automatiza coleta de dados
- Gera relatórios automaticamente
- Centraliza informações dispersas

### Nó 6: Gera Conhecimento Futuro

A funcionalidade produz dados ou aprendizados que serão úteis no futuro?

**Critérios:**
- Os dados gerados são reutilizáveis?
- Os padrões identificados são acumuláveis?
- O aprendizado pode ser aplicado em outros contextos?

### Nó 7: Fortalece Patrimônio

A funcionalidade contribui para algum dos cinco patrimônios?

| Patrimônio | Contribuição esperada |
|------------|----------------------|
| Operacional | Melhora processos e métricas |
| Decisório | Gera decisões registradas |
| Conhecimento | Produz aprendizados |
| Evolutivo | Acelera ciclos |
| Coletivo | Gera dados agregáveis |

### Nó 8: Uso Semanal

A funcionalidade será útil pelo menos uma vez por semana?

**Se não:** Pode ser valiosa, mas não deve ser prioridade agora.

### Nó 9: MVP Viável

A funcionalidade pode ser implementada em versão mínima viável?

**Se não:** Reduzir escopo até que seja possível.

### Nó 10: Sprint Atual

A funcionalidade está dentro do escopo da sprint atual?

**Se não:** Colocar na fila para próxima sprint.

---

## 4. Matriz de decisão combinada

| Combinação | Decisão |
|------------|---------|
| 1-7 SIM, 8-10 SIM | Implementar |
| 1-7 SIM, 8-9 SIM, 10 NÃO | Fila para próxima sprint |
| 1-7 SIM, 8 ou 9 NÃO | Redesenhar ou postergar |
| 1-6 SIM, 7 NÃO | Questionar (pode ser exceção) |
| 1-5 SIM, 6 NÃO | Questionar (pode ser funcionalidade pontual) |
| 1-4 SIM, 5 NÃO | Aceitar se for essencial para decisão |
| 1-3 SIM, 4 NÃO | Rejeitar (não ajuda a decidir) |
| 1-2 SIM, 3 NÃO | Rejeitar (não resolve problema real) |

---

## 5. Exceções

A Árvore de Decisões pode ser ignorada apenas em casos de:

1. **Correção crítica:** Bug que afeta dados ou decisões de empresas
2. **Segurança:** Vulnerabilidade que expõe dados de empresas
3. **Regulatório:** Mudança necessária para conformidade legal

Mesmo nesses casos, a funcionalidade deve ser revista assim que a urgência passar.

---

*Esta árvore é o filtro de qualidade da Ponte Digital. Nenhuma funcionalidade passa sem atravessá-la.*
