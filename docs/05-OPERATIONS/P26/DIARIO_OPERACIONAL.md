# Diário Operacional

## Modelo oficial de registro diário da Empresa Zero

---

## Instruções de preenchimento

### Regra fundamental

**15 minutos por dia, no máximo.** Se você está gastando mais que isso, está escrevendo demais. O valor está na consistência (todos os dias), não na profundidade.

### Como preencher rápido

| Seção | Tempo máximo | Dica |
|-------|-------------|------|
| Decisões tomadas | 3 min | Liste apenas as decisões do dia. Se não tomou nenhuma, escreva "Nenhuma decisão relevante hoje." |
| Clientes/Usuários | 2 min | Só números e fatos. Se não houve interação, escreva "Sem interações hoje." |
| Insights | 2 min | Um insight genuíno por dia já é excelente. Se não teve nenhum, escreva "Nada que se destaque." |
| Hipóteses | 2 min | Só se gerou uma nova. Senão, deixe vazio ou escreva "Nenhuma hipótese nova." |
| Tempo | 2 min | Seja honesto. Tempo perdido é informação valiosa. |
| Dificuldades | 1 min | O que te travou. Se nada, "Sem dificuldades relevantes." |
| Surpresas | 1 min | O que foi inesperado. Se nada, "Nada inesperado." |
| Observações registradas | 1 min | Só os IDs. |
| Aprendizado do dia | 1 min | Uma frase. A mais importante do dia. |

### Quando preencher

- **Durante o dia:** anotações rápidas (tópicos soltos, sem formatar)
- **Fim do dia (17h-18h):** formatação completa no modelo abaixo

### Dicas de ouro

1. Se está sem tempo, preencha só o Aprendizado do Dia. É a única seção obrigatória.
2. Nunca pule dois dias seguidos. Se pular um, preencha o atrasado em 5 min (só o essencial).
3. O diário não é um relatório para ninguém ler. É um instrumento para você pensar melhor.
4. Prefira frases curtas. Tópicos. Staccato. Valorize o conteúdo, não a forma.
5. Se a IA preencheu partes do diário por você, revise antes de finalizar. A IA pode ter interpretado errado.

---

## Template Oficial

```markdown
# Diário Operacional — Dia XX

## Data: DD/MM/AAAA

---

## DECISÕES TOMADAS

<!-- Liste aqui as decisões do dia, mesmo as pequenas.
     Formato: [decisão] | [contexto rápido] | [alternativa preterida]
     Exemplo: "Decidi adiar a feature X para a sprint 3 | Contexto: cliente Y não confirmou necessidade | Alternativa: fazer agora baseado em suposição" -->

- Decisão 1: [contexto | hipótese | evidência | alternativa | escolha]
- Decisão 2:
- Decisão 3:

## CLIENTES / USUÁRIOS

<!-- Apenas números e fatos. Sem opiniões aqui (opiniões vão em Insights). -->

- Interações com clientes:
- Problemas relatados:
- Feedback recebido:

## INSIGHTS DO DIA

<!-- O que você descobriu hoje que não sabia ontem?
     Pode ser pequeno. "Percebi que usuário não lê instruções" é um insight válido. -->

- Insight 1: [o que foi descoberto | como descobriu | confiança]
- Insight 2:
- Insight 3:

## HIPÓTESES GERADAS

<!-- Só preencha se gerou uma hipótese NOVA hoje.
     Hipótese = "se X então Y" que pode ser testado. -->

- Hipótese 1: [observação que gerou | o que acredita | como validar]
- Hipótese 2:

## TEMPO

<!-- Seja honesto. Mentir no diário é roubar de você mesmo. -->

- Tempo perdido: [em quê | quanto | por quê]
- Tempo economizado: [em quê | quanto | por quê]

## DIFICULDADES

<!-- O que travou seu progresso hoje? -->

- [o que travou | o que tentou | o que aprendeu]

## SURPRESAS

<!-- O que foi inesperado hoje? Pode ser positivo ou negativo. -->

- [o que foi inesperado | positivo/negativo | o que revela]

## OBSERVAÇÕES REGISTRADAS

<!-- IDs das observações brutas registradas hoje.
     Se não usa IDs, liste os temas. -->

- [ID-001] — [descrição rápida]
- [ID-002] — [descrição rápida]

## APRENDIZADO DO DIA

<!-- Uma frase. A principal. -->

> **[O principal aprendizado do dia]**
```

---

## Exemplo Preenchido

```markdown
# Diário Operacional — Dia 47

## Data: 15/07/2026

---

## DECISÕES TOMADAS

- Decisão 1: Adiar onboarding tutorial para sprint 4 | Contexto: cliente A disse que "prefere explorar sozinho" | Evidência: 3 de 5 clientes não completaram tutorial | Alternativa: insistir em tutorial guiado | Escolha: tutorial opcional, não obrigatório
- Decisão 2: Remover campo "Cargo" do cadastro | Contexto: 80% dos usuários deixam em branco | Hipótese: campo irrelevante para tomada de decisão | Evidência: dados de preenchimento dos últimos 30 dias | Alternativa: manter como obrigatório | Escolha: remover para reduzir atrito
- Decisão 3: Nenhuma outra decisão relevante

## CLIENTES / USUÁRIOS

- Interações com clientes: 3 (Cliente A por email, Cliente B por telefone, Cliente C por chat)
- Problemas relatados: Cliente B não conseguiu gerar relatório de fluxo de caixa (bug confirmado)
- Feedback recebido: "Gostei da simplicidade, mas sinto falta de comparar com meses anteriores" (Cliente A)

## INSIGHTS DO DIA

- Insight 1: Clientes querem comparação temporal, não relatórios mais complexos | Como descobriu: conversa com Cliente A | Confiança: 70%
- Insight 2: Bug no relatório de fluxo de caixa afeta apenas contas com mais de 50 transações | Como descobriu: investigando o bug | Confiança: 90%

## HIPÓTESES GERADAS

- Hipótese 1: Se adicionarmos comparação mês a mês no relatório financeiro, clientes usarão o sistema 2x por semana em vez de 1x por mês | Observação: feedback do Cliente A + padrão de login dos clientes ativos | Como validar: implementar versão simples e medir frequência de acesso por 2 semanas

## TEMPO

- Tempo perdido: 1h depurando bug que era erro de ambiente local | Por quê: não verifiquei a branch correta antes de começar
- Tempo economizado: 30 min usando IA para revisar documentação | Por quê: IA encontrou 3 inconsistências que eu levaria 30 min para achar

## DIFICULDADES

- Bug do relatório de fluxo de caixa: tentei reproduzir local, não consegui. Depois descobri que era ambiente específico do cliente (Windows vs Linux). Aprendizado: sempre verificar ambiente antes de depurar.

## SURPRESAS

- Cliente B (que estava quieto há 2 semanas) ligou ativamente para relatar o bug — ele está usando o sistema, ao contrário do que eu pensava. Positivo. Revela que ausência de contato não é ausência de uso.

## OBSERVAÇÕES REGISTRADAS

- [OBS-047-01] — Cliente B relatou bug no fluxo de caixa
- [OBS-047-02] — Cliente A pediu comparação temporal
- [OBS-047-03] — Ambiente do Cliente B é Windows Server 2019

## APRENDIZADO DO DIA

> **Clientes em silêncio não são clientes inativos — podem estar usando mais do que imaginamos.**
```

---

## Checklist de integridade do diário

Ao finalizar o dia, verifique:

- [ ] Data e dia # corretos
- [ ] Decisões registradas (mesmo que "nenhuma decisão relevante")
- [ ] Aprendizado do dia preenchido (obrigatório)
- [ ] Nenhuma informação confidencial de cliente exposta
- [ ] Nenhuma opinião apresentada como fato (revise os insights)
- [ ] IA consultada: "O que eu perdi hoje?"
