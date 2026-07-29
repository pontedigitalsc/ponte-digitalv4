# DECISAÃO DE ESCOPO — P23 para P24

## O que foi removido (e por quê)

### 1. Validação perceptual via formulário (P23)

**O que era:** Antes de criar orçamento, empresário respondia perguntas sobre percepção de preço, consumo e sazonalidade. O sistema usava isso para calibrar expectativas.

**Removido porque:** Os empresários ignoraram as perguntas (`docs/05-OPERATIONS/P23/AUDITORIA_DA_PERCEPCAO.md`). A taxa de preenchimento foi de 12%. A percepção autorrelatada não é confiável — empresários superestimam ou subestimam consistentemente. Fonte da verdade são **dados reais**, não autorrelato.

**Substituído por:** Nada. A P24 valida contra dados históricos diretamente, sem etapa perceptual.

### 2. Perfil perceptual do empresário

**O que era:** Perfil gerado a partir das respostas do formulário (otimista, realista, conservador).

**Removido porque:** Sem respostas, não há perfil. Mesmo se houvesse, não havia uso claro do perfil nas decisões do sistema.

**Substituído por:** Nada. A P24 foca em validação objetiva, não em perfilamento.

### 3. Sugestão automática de itens (P23 NICE-TO-HAVE)

**O que era:** Sugerir itens para adicionar ao orçamento baseado em histórico.

**Removido porque:** Empresários iniciantes se confundiram ("por que o sistema está sugerindo isso?"). Empresários experientes ignoraram. O custo de implementação não se justifica.

**Substituído por:** Validação do orçamento que o empresário já criou.

---

## O que foi mantido

### 4. Interface de validação visual (card-based)

**Veio da P23 como:** Design conceitual.

**Mantido como:** Implementação completa na P24. O formato de cards com indicador visual (🔴🟡🟢) foi o que os empresários mais engajaram durante os testes de papel.

### 5. Tooltips explicativos em linguagem de negócio

**Veio da P23 como:** Requisito não implementado.

**Mantido como:** Requisito obrigatório da P24. Empresários não querem ver "desvio padrão" — querem "preço 23% acima do que você pagou no mês passado".

---

## O que foi adiado

| Funcionalidade | Previsto | Motivo do adiamento |
|---------------|----------|---------------------|
| Sugestão contextual | Futuro | NICE-TO-HAVE; necessário entender melhor o comportamento de compra |
| Economia Potencial | P24.3 | Requer integração entre fornecedores, que tem baixa adoção |
| Dashboard de maturidade | P24.3 | Sem uso imediato; depende de acúmulo de validações |
| Exportar análise (PDF) | P24.3 | Pode ser substituído por compartilhamento de link |

---

## Aprendizados documentados

Ver `docs/08-KNOWLEDGE/2026-07-26-validacao-vs-sugestao.md`

---

##  Histórico

| Data | Versão | Descrição |
|------|--------|-----------|
| 26/07/2026 | 0.1 | Criação do documento de decisão de escopo |
