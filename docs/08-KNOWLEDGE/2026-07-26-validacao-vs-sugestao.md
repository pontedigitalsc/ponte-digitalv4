# Validação vs. Sugestão — O que a P23 nos ensinou

**Data:** 26/07/2026  
**Autoria:** Time Ponte Digital (síntese pós-P23)  
**Tipo:** Aprendizado validado

---

## O problema

Na P23, partimos da premissa de que o empresário queria ajuda para **decidir o que comprar** — por isso construímos sugestão contextual. A hipótese era: "se o sistema sugerir itens baseado no histórico, o empresário economiza tempo e compra melhor."

Essa hipótese estava **parcialmente errada**.

---

## O que observamos

### Comportamento dos iniciantes ( < 6 meses de uso)
- Ignoraram as sugestões ("não confio")
- Ficaram confusos ("por que está aparecendo isso?")
- Preferiram montar manualmente item por item
- Mas **engajaram fortemente** com a validação visual (cards 🔴🟡🟢)

### Comportamento dos experientes ( > 6 meses)
- Usaram sugestões ocasionalmente como "checklist"
- Mas relataram que o maior valor era **conferir se o orçamento estava correto**
- Um empresário disse: "Eu sei o que preciso comprar. O que eu não sei é se o preço está justo."

### Padrão unânime
100% dos empresários entrevistados (n=8) disseram que validariam orçamentos se o sistema apontasse anomalias.

---

## A descoberta

**O empresário não quer que o sistema pense por ele. Ele quer que o sistema valide o que ele já pensou.**

Isso muda tudo:
- Não é sobre sugerir → é sobre conferir
- Não é sobre substituir a decisão → é sobre dar confiança
- Não é sobre Machine Learning → é sobre comparar com dados reais

---

## O que isso implica

### Para o produto
- Validação é o novo norte. Sugestão é acessório.
- O dado real do negócio (histórico de compras, estoque) é a fonte da verdade, não um perfil perceptual.
- A interface deve comunicar desvios, não recomendações.

### Para a arquitetura
- Motor determinístico é suficiente (e desejável) — regras claras baseadas em desvios percentuais.
- ML futuro pode refinar, mas não substituir as regras.
- Precisamos de dados estruturados de comparação, não de modelos preditivos.

### Para a estratégia
- A Ponte Digital não precisa ser "inteligente" — precisa ser **confiável**.
- Cada validação correta gera confiança. Cada sugestão errada destrói.
- A prioridade é acertar o simples, não implementar o complexo.

---

## Perguntas em aberto

1. Empresário vai ignorar alertas sistematicamente? (medir na P24)
2. Base histórica de 3 meses é suficiente para comparação? (testar na P24.1)
3. O alerta de preço vai gerar ação (renegociar) ou resignação ("é o mercado")? (entrevistar na P24.2)

---

## Decisões tomadas

| Decisão | Base | Data |
|---------|------|------|
| Remover sugestão contextual do escopo | Baixo engajamento + confusão | 26/07/2026 |
| Remover formulário de percepção | 12% preenchimento | 26/07/2026 |
| Validar orçamento contra dados reais | 100% dos entrevistados | 26/07/2026 |
| Implementar motor determinístico | Simplicidade + confiabilidade | 26/07/2026 |

---

## ⚠️ Alerta para futuros sprints

Se alguém sugerir "adicionar IA para sugerir itens", lembre-se deste documento.

IA na Ponte Digital não significa "adivinhar o que o usuário quer". Significa "usar dados para dar confiança nas decisões que o usuário já toma".

---

## Referências

- `docs/05-OPERATIONS/P23/AUDITORIA_DA_PERCEPCAO.md`
- `docs/05-OPERATIONS/P23/CHECKLIST_DE_EXPERIENCIA.md`
- `docs/02-PRODUCT/CURRENT_PRODUCT.md`
- `docs/02-PRODUCT/CORE_PROPERTIES.md`
