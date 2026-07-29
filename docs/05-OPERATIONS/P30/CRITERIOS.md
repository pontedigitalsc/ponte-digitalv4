# Critérios de Prontidão e Conclusão — Programa 30

## Critérios de Prontidão

Um item MC-XXX só pode ser iniciado quando TODOS os critérios abaixo forem verdadeiros:

### 1. Arquitetura Compatível
- [ ] O schema Prisma reflete o modelo de dados necessário
- [ ] As engines envolvidas existem e estão exportadas no `index.ts`
- [ ] As dependências do Mapa de Dependências estão concluídas
- [ ] O contrato de tipos está definido (entrada/saída)

### 2. Documento Certificado
- [ ] O comportamento está descrito na Matriz de Materialização
- [ ] O documento de origem (P23/P28/P29/P30) especifica o comportamento esperado
- [ ] Não há conflito com decisões arquiteturais existentes

### 3. Dependências Concluídas
- [ ] Todas as dependências diretas (→) estão marcadas como concluídas
- [ ] As engines dependentes foram auditadas e estão estáveis
- [ ] Os contratos de interface não mudarão retroativamente

### 4. Critérios de Teste Definidos
- [ ] Cenário de teste positivo descrito
- [ ] Cenário de teste negativo (falha) descrito
- [ ] Comportamento em estado vazio (zero dados) descrito

---

## Critérios de Conclusão

Um item MC-XXX só pode ser considerado concluído quando TODOS os critérios abaixo forem verdadeiros:

### 1. Funciona Tecnicamente
- [ ] O código compila sem erros (`tsc --noEmit`)
- [ ] O comportamento implementado corresponde à especificação
- [ ] Os dados fluem corretamente entre as camadas
- [ ] Erros são tratados sem quebrar o fluxo

### 2. Coerente com a Arquitetura
- [ ] Segue o padrão de engines existente (funções puras + Prisma)
- [ ] Usa o sistema de tipos existente
- [ ] Respeita o isolamento multi-tenant (empresaId em todas as queries)
- [ ] Usa `BaseAppError` para erros de domínio
- [ ] Evita duplicação com engines existentes
- [ ] Preserva o padrão de graceful degradation (`.catch()` com fallback)

### 3. Coerente com a Constituição
- [ ] Alinhado com as leis do Programa 30:
  - Lei da Presença: nunca parece ocupada
  - Lei da Memória: toda resposta altera o contexto
  - Lei da Curiosidade: próxima pergunta reduz maior incerteza
  - Lei da Evidência: hipóteses nascem fracas, crescem lentamente
  - Lei da Transparência: confiança é explicável

### 4. Coerente com a Experiência Cognitiva (P23)
- [ ] Não quebra o fluxo de 3s/10s/30s/2min/5min
- [ ] Preserva a sensação de controle, clareza, calma, segurança
- [ ] Não introduz ansiedade, pressão ou excesso de informação
- [ ] O empresário pensa "esse sistema entendeu minha empresa"

### 5. Validado na Empresa Zero
- [ ] Um cenário real foi simulado (dados artificiais ou reais)
- [ ] O resultado é observável (mudança no banco, API response, UI)
- [ ] O comportamento persiste após refresh

### 6. Produziu Aprendizado Real
- [ ] O pipeline cognitivo registrou evidência ou memória
- [ ] O estado cognitivo foi alterado
- [ ] Se aplicável, hipóteses foram criadas ou modificadas

---

## Ciclo Oficial de Implementação

```
Documento (Matriz/P30)
    ↓
Auditoria (código atual vs desejado)
    ↓
Materialização (escrever código)
    ↓
Implementação (integrar com orquestrador/rotas)
    ↓
Deploy (próximo build)
    ↓
Empresa Zero (simular cenário real)
    ↓
Observação (verificar resultado)
    ↓
Hipóteses (o comportamento gerou aprendizado?)
    ↓
Validação (os critérios de conclusão foram atingidos?)
    ↓
Conhecimento (documentar aprendizado)
    ↓
RFC (apenas se mudança arquitetural significativa)
    ↓
Patrimônio Permanente (marcar como concluído na Matriz)
```

Nenhuma etapa pode ser ignorada.
