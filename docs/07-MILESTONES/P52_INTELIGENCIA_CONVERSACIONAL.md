# P52 — Inteligência Conversacional Estratégica

**1 de agosto de 2026**

Transformar a conversa da Ponte Digital em uma experiência de aconselhamento empresarial contínuo. A Ponte não apenas coleta informações — ela aprende a conduzir melhores conversas. O objetivo não é aumentar a quantidade de perguntas, é aumentar a qualidade. Uma pergunta boa muda uma decisão. Uma decisão melhor muda uma empresa.

---

## Princípios

- **Nunca perguntar sem contexto.** A Ponte nunca pergunta "Qual seu faturamento?" no vácuo. Ela pergunta: *"Nos últimos meses, sua empresa cresceu. Você sente que esse crescimento trouxe mais tranquilidade ou mais pressão?"*
- **A informação vem pela reflexão, não por formulário.**
- **Toda conversa segue a estrutura de um conselheiro**, não de um entrevistador.
- **Cada pergunta possui um propósito estratégico explícito** (estágio, objetivo, capacidade, patrimônio, tipo de resposta, impacto).
- **A Ponte lembra conversas anteriores** e cita o empresário com as palavras dele.
- **Recomendações contam uma história**: origem temporal → o que foi feito → próximo passo.
- **Conversa como ativo empresarial**: toda conversa gera conhecimento, evidência, aprendizado, histórico e evolução.

## Novo modelo de conversa — os 5 estágios do conselheiro

| Estágio | Perguntas-tipo | Objetivo |
|---|---|---|
| **Contexto** | "O que mudou na sua empresa desde nossa última conversa?" | Entender o movimento |
| **Realidade** | "O que está funcionando melhor hoje?" "Qual problema continua aparecendo?" | Separar percepção de realidade |
| **Tensão** | "O que está consumindo energia demais?" "Se nada mudar em seis meses, qual o maior risco?" | Encontrar pontos cegos e oportunidades |
| **Evolução** | "O que sua empresa sabe hoje que não sabia antes?" | Transformar experiência em patrimônio |
| **Próximo movimento** | "Qual mudança teria maior impacto agora?" | Criar direção |

A **primeira conversa** foi reestruturada com esta arquitetura (`versao: 4`): as mesmas 19 perguntas, mesmos IDs, reagrupadas nos 5 estágios. O progresso da conversa passou de bloco por tema para **progresso por estágio** (`calcularProgresso(etapaIndex, fluxo)`).

## Motor de qualidade das perguntas

`adaptive-question-engine.ts` — cada pergunta declara:

- **objetivo** — o que ela precisa descobrir, com a resposta honesta na mão
- **capacidade** — a capacidade empresarial que ela desenvolve (nomes reais do adaptive-capacity-engine)
- **patrimônio** — o que a resposta acrescenta ao patrimônio da empresa
- **tipo de resposta** — fato, percepção, reflexão, decisão, planejamento ou padrão
- **impacto** — o que essa informação muda na relação/evolução

Exemplo: *"O que hoje depende demais de você?"* → capacidade **Adaptação**, patrimônio **Conhecimento operacional**, impacto **identificar gargalos de fundador**.

## Regras adaptativas

A Ponte nunca segue um roteiro fixo. `detectarFocoContextual(empresaId)` combina o contexto real (via `buscarSituacaoEmpresa`):

| Contexto observado | Foco | Estágio prioritário |
|---|---|---|
| Sem transações recentes (7+ dias) | FINANCEIRO | tensão |
| Receita cresceu ≥20% | GESTAO | próximo_movimento |
| Receita caiu ≤−15% | CLIENTES | realidade |
| Clientes inadimplentes | CLIENTES | tensão |
| Tarefas atrasadas | GESTAO | realidade |

`QUALIDADE_POR_LACUNA` cobre todas as 33 lacunas. `obterMultiplasPerguntas(empresaId, 5)` seleciona pela urgência da lacuna ponderada pelo foco contextual.

## Memória de conversa

`relacao-engine.ts::montarContinuidadeConversa(empresaId)` reconstrói o que foi vivido: a última resposta, a última Pergunta Viva respondida e a memória emocional. No prompt do assistente (seção **MEMÓRIA DA RELAÇÃO**) a instrução é clara: referenciar conversas anteriores com as palavras do empresário e **nunca inventar lembranças**.

```
"Na última conversa você mencionou que queria contratar alguém.
Você conseguiu avançar naquela contratação? O que mudou?"
```

Não é chatbot. É relacionamento.

## Evolução das recomendações

As recomendações agora contam história. Em `/centro-decisao`, cada card mostra:

- **A história da recomendação**: as evidências-chave de onde ela nasceu + os outcomes reais já registrados na categoria ("O que já veio disso").
- Origem temporal → estado da ação → próximo passo.

```
Antes:  "Aumente sua retenção."
Agora:  "Há 3 meses identificamos que clientes retornavam menos após o primeiro
        atendimento. Você começou a registrar preferências e isso aumentou o
        conhecimento sobre comportamento. O próximo passo é criar um ritual de retorno."
```

## Centro Diário evolvido

O dashboard responde cinco perguntas com dados reais (`centro-diario.tsx`):

1. O que mudou na minha empresa? — mudanças recentes de alta confiança
2. O que aprendemos? — aprendizados registrados + memórias emocionais
3. O que merece minha atenção? — sinais reais (tarefas, clientes, financeiro)
4. Qual oportunidade estou deixando passar? — leads em negociação / receita em alta
5. Qual é o próximo melhor movimento? — ação sugerida pelo contexto

## Ritual mensal — Revisão da Evolução

`revisao-evolucao.tsx` — para empresas com 30+ dias sem conversa, o dashboard inicia:

> "Passou mais um ciclo. Vamos olhar juntos o que mudou?"

Mostrando os quatro momentos da evolução a partir da história real:
- **Antes** — o que preocupava
- **Durante** — o que foi decidido
- **Depois** — o que aprendemos
- **Próximo** — o que merece atenção agora

## Arquitetura

Integração com o patrimônio existente — nenhum módulo novo, nenhuma tela ERP nova:

- `tipos.ts` — `EstagioConselheiro`, `ESTAGIOS_ORDEM`, `ESTAGIO_LABEL`, campo `estagio` em `Etapa`
- `fluxos/primeira-conversa.ts` — `versao: 4`, export `FLUXOS`
- `reacoes.ts` — transições entre estágios
- `conversation-engine.ts` — `ESTAGIO_POR_ETAPA`, progresso por estágio, reações de mudança de estágio
- `adaptive-question-engine.ts` — motor de qualidade, foco contextual, biblioteca de grandes perguntas
- `cognitive-context-engine.ts` — `SituacaoEmpresa.variacaoReceita`
- `relacao-engine.ts` — `montarContinuidadeConversa`
- `api/assistente` — contexto estruturado com memória da relação
- `outcome-intelligence-engine.ts` + `recommendation-auditor.ts` — origem e auditoria das recomendações

## Critérios de qualidade

Toda pergunta deve responder, na negativa, à exclusão:

1. Ajuda o empresário a pensar?
2. Gera reflexão?
3. Melhora decisões?
4. Fortalece alguma capacidade empresarial?
5. Pode gerar conhecimento reutilizável?

Se qualquer resposta for não, a pergunta é descartada.

## Critérios de aprovação

- ✅ As perguntas mudam conforme o contexto
- ✅ Cada pergunta possui propósito estratégico
- ✅ A Ponte lembra conversas anteriores
- ✅ Recomendações explicam origem
- ✅ O empresário entende por que recebeu aquela sugestão
- ✅ Cada conversa aumenta o conhecimento acumulado
- ✅ Nenhuma tela ERP nova
- ✅ Nenhum módulo novo
- ✅ Build e TypeScript limpos

---

**Visão final:** a Ponte não deve ser lembrada como "um sistema que ajuda a administrar empresas". Ela deve ser lembrada como **o lugar onde empresários conversam para tomar melhores decisões**.
