# P24 — Validação de Orçamento com Inteligência

**Status:** Planejada  
**Início:** 28/07/2026  
**Término previsto:** 22/08/2026  
**Sprint atual:** P24.1 (28/07 – 08/08)

---

## 1. Objetivo

Permitir que o empresário valide orçamentos usando inteligência baseada em dados reais do negócio (histórico de compras, estoque, sazonalidade, variação de preços) em vez de achismo ou referências externas genéricas.

---

## 2. Contexto — Por que agora?

A P23 confirmou que a **sugestão contextual** era uma funcionalidade NICE-TO-HAVE — os empresários mais maduros a usam, mas iniciantes se confundem. O aprendizado real da P23 é: **o empresário não quer que o sistema sugira o que comprar. Ele quer saber se o orçamento que ele mesmo criou está correto.**

As evidências coletadas:

- Empresários confiam em seus fornecedores, mas não têm dados para questionar aumentos.
- Empresários gastam horas conferindo preços manualmente.
- Empresários não têm visibilidade de sazonalidade na hora de orçar.
- Empresários não identificam desvios de consumo até o estoque acabar.
- 100% dos entrevistados disseram que validariam orçamentos se o sistema apontasse anomalias.

**Hipótese central:** Se o sistema analisar o orçamento contra dados reais e apontar anomalias, o empresário tomará decisões melhores e mais rápidas.

---

## 3. O que será construído

### 3.1. Motor de Validação (Core)

Serviço que recebe um orçamento (lista de itens + quantidades + preços) e retorna uma análise:

| Análise | Descrição | Fonte de Dados |
|---------|-----------|----------------|
| **Variação de Preço** | Compara preço do orçamento vs. histórico de compras | `OrcamentoItem.preco_unitario` vs. `Produto.preco_medio` / `CompraItem.preco_unitario` |
| **Variação de Consumo** | Compara quantidade orçada vs. média histórica | Histórico de `CompraItem` nos últimos N meses |
| **Anomalia de Estoque** | Alerta se quantidade orçada pode gerar excesso/ruptura | `Produto.estoque_atual` + `MovimentacaoEstoque` |
| **Sazonalidade** | Indica se o período de compra é atípico | Histórico sazonal por `Categoria` ou `Produto` |
| **Economia Potencial** | Estima economia se comprar de fornecedor alternativo | Histórico de preços por fornecedor |

### 3.2. Interface de Validação

- Modal/página após criar/editar orçamento
- Cards de análise, cada um com: indicador (🔴🟡🟢), descrição, valor atual vs. referência
- Ação "Ignorar alerta" (registra motivo) e "Ajustar orçamento"
- Botão "Exportar análise" (PDF)

### 3.3. Histórico de Validações

- Tabela `OrcamentoValidacao` no banco
- Cada validação gera um registro com: orçamento ID, resultado geral (APROVADO/ALERTAS/REPROVADO), json das análises
- Alimenta dashboard de maturidade do empresário

---

## 4. Funcionalidades por fase

### Fase 1 — Validar (P24.1, dias 1-8)
- Motor de Variação de Preço + Variação de Consumo
- Interface de validação com cards
- Histórico de validações no banco

### Fase 2 — Evoluir (P24.2, dias 9-16)
- Anomalia de Estoque
- Sazonalidade
- Exportar análise

### Fase 3 — Aprender (P24.3, dias 17-21)
- Economia Potencial
- Dashboard de maturidade
- Refinamento com base em feedback

---

## 5. Critérios de aceite

1. Empresário cria orçamento → sistema valida em < 3s
2. Variação de preço detecta desvios > 15% do histórico
3. Variação de consumo detecta desvios > 30% da média
4. Anomalia de estoque alerta se quantidade > 2x consumo médio
5. Sazonalidade indica períodos atípicos (alta/baixa)
6. Empresário pode ignorar alertas com motivo
7. Histórico de validações disponível para consulta
8. Exportação em PDF funcional

---

## 6. Não escopo (P24)

- Sugestão automática de itens (era P23, removeu-se)
- Cadastro de múltiplos fornecedores por item
- Integração com NF-e para preços reais
- Machine Learning preditivo (regras determinísticas)
- Recomendação de fornecedores

---

## 7. Decisões arquiteturais

1. **Motor determinístico, não ML** — regras explícitas baseadas em desvios percentuais. Se precisar de ML no futuro, os dados estruturados estarão prontos.
2. **Validação síncrona** — o empresário espera a resposta. Se orçamento > 50 itens, processar em fila e notificar.
3. **Análises armazenadas como JSON** — flexibilidade para evoluir sem migração de schema.
4. **Alertas ignorados são registrados** — para aprendizado futuro (ex: se sempre ignora alerta de preço de um fornecedor, pode ser relação comercial estabelecida).

---

## 8. Riscos

| Risco | Impacto | Mitigação |
|-------|---------|-----------|
| Empresário ignorar todos alertas | Baixa utilidade | Medir taxa de ignoração; entrevistar após 30 dias |
| Base histórica insuficiente | Falsos positivos | Exibir "dados insuficientes" para itens com < 3 compras |
| Performance com muitos itens | Experiência ruim | Timeout de 5s; fallback para validação parcial |
| Empresário não entender análises | Abandono | Tooltips explicativos em linguagem de negócio |

---

## 9. Dados necessários

Já existentes no banco:
- `Orcamento`, `OrcamentoItem`, `Produto`, `Compra`, `CompraItem`, `MovimentacaoEstoque`, `Fornecedor`

A criar:
- `OrcamentoValidacao` (orcamentoId, resultado, analises JSON, createdAt)
- `OrcamentoValidacaoAlertaIgnorado` (validacaoId, tipo, motivo, createdAt)

---

## 10. Próximos passos

1. ✅ Definir escopo da P24 (este documento)
2. 🔲 Detalhar regras do motor de validação (`docs/03-ENGINEERING/MOTOR_VALIDACAO.md`)
3. 🔲 Atualizar `CURRENT_PRODUCT.md` com fase P24
4. 🔲 Iniciar implementação (P24.1 — dias 1-8)

---

## 11. Histórico

| Data | Versão | Descrição |
|------|--------|-----------|
| 26/07/2026 | 0.1 | Criação do documento de planejamento |
