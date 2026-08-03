# P62 — Conhecimento Coletivo V1

**Data:** 2 de agosto de 2026
**STATUS:** IMPLEMENTADO (engines + painel interno do founder, agregações apenas). As devoluções
ao empresário (gates 50/100) permanecem bloqueadas por volume real de dados.

> Empresários enfrentam problemas parecidos. A Ponte não pode inventar esse conhecimento —
> ela deve **acumulá-lo** a partir dos padrões reais, anonimizados, e devolvê-lo como aprendizado.

---

## 1. Problema

Cada empresário aprende sozinho o que outros empresários já aprenderam. Não existe um lugar
que devolva esse aprendizado acumulado.

## 1.1 Implementação (V1 — engines de plataforma, founder only)

- **`src/engine/inteligencia-coletiva.ts`**:
  - `obterMaturidadeColetiva()` com gates de volume — [10 coleta, 50 comparação, 100 hipóteses,
    500 conhecimento, 1000 recomendações maduras]. Fase atual rotulada e descrita sem inventar padrão;
  - `obterPadroesColetivos(limite)` — retorna apenas conhecimento `VALIDADO/REPLICADO/CONSOLIDADO`,
    ordenado por repetição e confiança. **Nunca expõe empresa de origem nem dados crus.**
- **Painel do Fundador** (`/painel-do-fundador`): seção "Inteligência Coletiva" com fase atual,
  gates e padrões validados — acessível somente a ADMIN. Quando não há volume, diz explicitamente
  que padrão exige repetição real (nada artificial).
- Usa o client `prisma` cru (agregados de plataforma, nunca linhas de uma empresa específica).

## 2. Hipótese central

Depois de um volume mínimo, padrões reais (ex.: "quem cuida de X também enfrenta Y") geram
valor que nenhuma empresa sozinha conseguiria.

## 3. Gate de dados (devolução ao empresário)

A devolução ao empresário **não está implementada** — inicia apenas quando a base real atingir:

- [x] **Gate 10:** mapear padrões anonimizados e compartilhar com o founder (painel interno — feito).
- [ ] **Gate 50:** primeira devolução simples ao empresário ("empresários na sua fase tendem a...").
- [ ] **Gate 100:** padrões por segmento/porte com confiança mínima.

Regra: **nunca expor dados de um empresário a outro.** Isolamento por tenant inegociável.

## 4. Critérios de aceite (quando iniciar)

- [x] P59 + P60 gerando dados reais (SinalValor com contexto).
- [x] Painel do founder com maturidade e padrões (agregados, founder only).
- [ ] Volume do gate atingido.
- [ ] Nenhuma exposição cruzada entre empresas.

## 5. Não fazer

- Não inventar padrões sem dados (sem evidência, sem conhecimento).
- Não criar recomendações "inteligentes" antes do gate 100.
