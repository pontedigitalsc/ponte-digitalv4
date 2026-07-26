# Critérios de Aprovação da Primeira Experiência

> PROGRAMA 15 — Documento 9 de 10
> Quando a experiência está pronta: critérios funcionais, cognitivos, de confiança, clareza, simplicidade e continuidade

---

## Relatório de execução

- **Descobertas:** não existem critérios de aprovação para a primeira experiência hoje. O que existe são critérios de aceite para sprints individuais (funcionalidades). Este documento unifica os critérios que a experiência inteira deve atingir para ser considerada "pronta".
- **Pressupostos:** os critérios são objetivos e mensuráveis. Nenhum critério depende de "sensação" ou "impressão" não verificável.
- **Lacunas:** alguns critérios dependem de métricas que só podem ser coletadas após a implementação (taxas de conversão, retenção). Nestes casos, o critério é uma meta a ser atingida, não uma verificação pré-implementação.
- **Riscos:** critérios muito exigentes podem atrasar o lançamento; critérios muito frouxos podem liberar uma experiência ruim. O equilíbrio está em ter critérios mínimos (barreira de qualidade) e critérios ideais (meta).
- **Conflitos:** nenhum.
- **Impactos futuros:** estes critérios definem o padrão de qualidade para TODAS as futuras experiências da Ponte. A primeira experiência define o padrão.
- **Confirmação de coerência:** coerente com os 5 eixos do Programa 15 e com a Jornada Fundacional (todos os capítulos).

---

## 1. Tipos de critério

| Tipo | O que avalia | Peso |
|------|-------------|------|
| Funcional | O sistema funciona corretamente | Eliminatório |
| Cognitivo | O empresário entende e se sente ouvido | Alto |
| Confiança | O empresário confia no que o sistema diz | Alto |
| Clareza | A informação é compreensível | Alto |
| Simplicidade | A experiência não exige esforço | Médio |
| Continuidade | A experiência leva ao uso contínuo | Alto (meta) |

---

## 2. Critérios Funcionais

São eliminatórios — se qualquer um falhar, a experiência não pode ser liberada.

| # | Critério | Verificação | Status |
|---|----------|-------------|--------|
| F1 | Landing page carrega em < 2s em conexão 3G | Teste de performance | Pendente |
| F2 | Diagnóstico inicia sem autenticação | Teste de fluxo anônimo | Pendente |
| F3 | Cookie conv_token é criado e identificável | Teste de cookie | Pendente |
| F4 | Todas as 17 perguntas são renderizadas | Teste de fluxo | ✅ Já funciona |
| F5 | Micro-reações aparecem após cada resposta | Teste de UI | ✅ Já funciona |
| F6 | Barra de progresso mostra o bloco atual | Teste de UI | ✅ Já funciona |
| F7 | Ao final, resumo é exibido | Teste de fluxo | ✅ Parcial (3 cards, não texto) |
| F8 | Botão "Criar conta" leva ao formulário | Teste de navegação | ✅ Já funciona |
| F9 | Formulário de cadastro valida campos | Teste de formulário | ✅ Já funciona |
| F10 | Após cadastro, redireciona para dashboard | Teste de fluxo | ✅ Já funciona |
| F11 | Dashboard pós-cadastro mostra escopo curado | Teste de UI (sidebar reduzida) | Pendente |
| F12 | Módulos não liberados mostram "Em breve" | Teste de UI | Pendente |
| F13 | Assistente tem contexto do diagnóstico | Teste de integração | ✅ Já funciona |
| F14 | Nenhum erro 500 em todo o fluxo | Teste de estresse | Pendente |
| F15 | Fluxo completo funciona em mobile (320px) | Teste responsivo | Pendente |

**Critério de aprovação funcional:** 100% dos critérios F1-F15 verificados como OK.

---

## 3. Critérios Cognitivos

Avaliam se a experiência é compreensível e faz sentido para o empresário.

| # | Critério | Métrica | Meta Mínima | Meta Ideal |
|---|----------|---------|-------------|------------|
| C1 | O empresário entende o propósito da landing | Taxa de clique no CTA | > 30% | > 50% |
| C2 | As perguntas são compreensíveis | Taxa de conclusão | > 50% | > 70% |
| C3 | As micro-reações são percebidas como úteis | Feedback 😊 | > 50% | > 70% |
| C4 | O resumo é percebido como específico | Feedback 😊 no resumo | > 60% | > 80% |
| C5 | O empresário entende o próximo passo | Taxa de clique em ação sugerida | > 20% | > 40% |
| C6 | O dashboard é percebido como "menos do que eu esperava (no bom sentido)" | Feedback após primeiro login | > 40% | > 60% |
| C7 | O Assistente responde coerentemente | Taxa de respostas úteis | > 70% | > 90% |
| C8 | Nenhuma pergunta gera "não sei responder" > 15% | Taxa de abandono por pergunta | < 15% | < 5% |

**Critério de aprovação cognitiva:** 6 de 8 critérios atingindo meta mínima.

---

## 4. Critérios de Confiança

Avaliam se o empresário confia no que o sistema diz e se sente seguro para continuar.

| # | Critério | Métrica | Meta Mínima | Meta Ideal |
|---|----------|---------|-------------|------------|
| T1 | Nenhuma informação incorreta no resumo | Taxa de correções solicitadas | < 5% | < 2% |
| T2 | O resumo soa honesto (admite o que não sabe) | Feedback "sistema honesto" | > 60% | > 80% |
| T3 | Empresário se sente ouvido | Feedback "me senti ouvido" | > 60% | > 80% |
| T4 | Nenhuma tentativa de venda antes do valor | Ausência de reclamações | 100% | 100% |
| T5 | Empresário confia para informar dados reais | Taxa de respostas coerentes | > 80% | > 90% |
| T6 | Empresário recomendaria para outro empresário | NPS (pergunta após 7 dias) | > 30 | > 50 |
| T7 | Zero mensagens de erro técnicas visíveis ao usuário | Monitoramento | 100% | 100% |

**Critério de aprovação de confiança:** 5 de 7 critérios atingindo meta mínima. T4 e T7 são eliminatórios (100%).

---

## 5. Critérios de Clareza

Avaliam se a informação apresentada é clara e acionável.

| # | Critério | Métrica | Meta Mínima | Meta Ideal |
|---|----------|---------|-------------|------------|
| L1 | Resumo tem no máximo 350 palavras | Contagem | ≤ 350 | ≤ 250 |
| L2 | Resumo não contém jargão técnico | Revisão manual | 0 ocorrências | 0 |
| L3 | Próximo passo é uma ação executável em 1 dia | Revisão manual | 100% | 100% |
| L4 | Cards de prioridade têm no máximo 2 itens | Contagem | ≤ 2 | ≤ 2 |
| L5 | Diagnóstico é completável em < 10 min | Tempo médio | < 10 min | < 6 min |
| L6 | Formulário de cadastro tem no máximo 4 campos | Contagem | ≤ 4 | ≤ 3 |
| L7 | Sidebar no primeiro login mostra no máximo 5 itens ativos | Contagem | ≤ 5 | ≤ 3 |

**Critério de aprovação de clareza:** 6 de 7 critérios OK.

---

## 6. Critérios de Simplicidade

Avaliam se a experiência é simples de usar, sem exigir esforço ou aprendizado.

| # | Critério | Métrica | Meta Mínima | Meta Ideal |
|---|----------|---------|-------------|------------|
| S1 | Empresário não precisa de tutorial para completar o diagnóstico | Taxa de abandono por "não sei o que fazer" | < 5% | < 2% |
| S2 | Nenhuma etapa exige mais de 1 clique para ação principal | Revisão de UX | 100% | 100% |
| S3 | Landing page tem 1 única call to action principal | Revisão visual | 1 | 1 |
| S4 | Zero popups, modais ou interrupções durante o diagnóstico | Revisão de UX | 0 | 0 |
| S5 | O resumo é o primeiro conteúdo após o diagnóstico (sem loading/Loading...) | Teste de UX | Imediato | Imediato |
| S6 | Após criar conta, o empresário cai direto no dashboard (sem onboarding step) | Teste de fluxo | Direto | Direto |

**Critério de aprovação de simplicidade:** 5 de 6 critérios OK. S2 e S3 são eliminatórios.

---

## 7. Critérios de Continuidade

Avaliam se a experiência leva naturalmente ao uso contínuo.

| # | Critério | Métrica | Meta Mínima | Meta Ideal |
|---|----------|---------|-------------|------------|
| U1 | Retorno D1 (volta no dia seguinte) | Análise de coorte | > 30% | > 50% |
| U2 | Retorno D7 (volta em 7 dias) | Análise de coorte | > 15% | > 30% |
| U3 | Retorno D30 (volta em 30 dias) | Análise de coorte | > 5% | > 15% |
| U4 | Conversão de Apoiador para Fundador | % que cria conta | > 10% | > 20% |
| U5 | Tempo até o primeiro desbloqueio de módulo | Dias até PRIMEIRA_ACAO_CRIADA | < 7 dias | < 3 dias |
| U6 | Taxa de resposta ao Assistente no primeiro login | % que envia ≥ 1 mensagem | > 40% | > 60% |

**Critério de aprovação de continuidade:** 3 de 6 critérios atingindo meta mínima (são metas de longo prazo, não pré-lançamento). U4 é o mais importante.

---

## 8. Critérios eliminatórios (pré-lançamento)

Estes critérios devem ser 100% atendidos antes de liberar a primeira experiência para qualquer usuário real:

1. F1-F15: 100% funcionais OK
2. T4: zero tentativas de venda antes do valor
3. T7: zero erros técnicos visíveis ao usuário
4. S2: nenhuma etapa exige mais de 1 clique
5. S3: landing page com 1 única CTA
6. S4: zero interrupções durante diagnóstico
7. L2: zero jargão técnico
8. L4: cards de prioridade ≤ 2
9. S6: cadastro → dashboard direto

**Se qualquer critério eliminatório falhar, a experiência não é liberada.**

---

## 9. Critérios de aceite (pós-lançamento)

Após o lançamento, a experiência é considerada "aprovada" quando:

| Prazo | Critérios | Meta |
|-------|-----------|------|
| 7 dias após lançamento | Funcionais (F1-F15) mantidos | 100% |
| 30 dias após lançamento | Cognitivos (C1-C8): 6/8 na meta mínima | ✅ |
| 30 dias após lançamento | Confiança (T1-T7): 5/7 na meta mínima | ✅ |
| 30 dias após lançamento | Clareza (L1-L7): 6/7 OK | ✅ |
| 30 dias após lançamento | Simplicidade (S1-S6): 5/6 OK | ✅ |
| 60 dias após lançamento | Continuidade (U1-U6): 3/6 na meta mínima | ✅ |
| 90 dias após lançamento | Os 6 tipos de critério convergindo para meta ideal | ↗️ |

---

## 10. Checklist de verificação pré-lançamento

```
□ F1: Landing page carrega em < 2s (3G)
□ F2: Diagnóstico inicia sem auth
□ F3: Cookie conv_token criado
□ F4-F6: Fluxo de conversa funciona (já OK)
□ F7: Resumo é exibido ao final
□ F8-F10: Cadastro → dashboard funciona
□ F11: Dashboard com escopo curado
□ F12: Módulos bloqueados com "Em breve"
□ F13: Assistente com contexto
□ F14: Zero erros 500
□ F15: Funciona em mobile 320px
□ T4: Zero tentativas de venda
□ T7: Zero erros visíveis
□ S2: Nada exige > 1 clique
□ S3: 1 única CTA na landing
□ S4: Zero popups/interrupções
□ L2: Zero jargão técnico
□ L4: ≤ 2 cards de prioridade
□ S6: Cadastro → dashboard direto
```

---

*Documento concluído. Avançando para Documento 10 (Plano de Implementação Controlada).*
