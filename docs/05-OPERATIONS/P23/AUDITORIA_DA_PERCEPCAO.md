# AUDITORIA DA PERCEPÇÃO — Experiência Atual vs Experiência Projetada

**Programa 23 | Fase 14 | Versão 1.0**

> Auditoria completa de todos os pontos de contato entre o empresário e a Ponte Digital. Para cada ponto: o que existe hoje, o que deveria existir segundo o P23, a lacuna, a fricção, o impacto e a prioridade.

---

## Metodologia

Cada ponto de auditoria foi avaliado em:

- **O que existe hoje:** o estado real do código e da interface (observado)
- **O que deveria existir:** o estado projetado pelo P23 e pelos princípios da experiência cognitiva
- **Lacuna:** a diferença entre os dois
- **Fricção atual:** o atrito que o empresário enfrenta hoje
- **Impacto no empresário:** como essa lacuna afeta a percepção de valor
- **Prioridade:** P0 (bloqueante), P1 (importante), P2 (desejável)
- **Complexidade:** baixa, média, alta

---

## 1. Landing (Antes do Login)

### O que existe hoje

Página institucional com:
- Logo + slogan
- "Saiba mais" + "Login"
- Uma seção de funcionalidades
- Footer com contato

A landing é informativa. Apresenta o produto como um software de gestão.

### O que deveria existir (segundo P23)

A landing não deveria ser uma página institucional. Deveria ser o *primeiro ato cognitivo* — uma demonstração ao vivo de como a IA pensa.

- Opção "Experimente o diagnóstico gratuito" — sem login, sem cadastro, o visitante responde 3 perguntas e vê um mini-mapa cognitivo se formando
- Não falar sobre funcionalidades. Falar sobre *decisões que o empresário vai tomar melhor*
- Linguagem: "Antes de tomar decisão, conversa com quem entende do seu negócio" vs "Sistema de gestão empresarial"

### Lacuna identificada

A landing hoje vende um software. A Ponte Digital é uma inteligência. A comunicação errada atrai o perfil errado de usuário (empresário que quer "sistema") e repele o perfil certo (empresário que quer "decisão").

### Fricção atual

Empresário chega, lê sobre funcionalidades, não entende o diferencial, compara com outros sistemas, fecha e vai embora. Zero demonstração de valor cognitivo.

### Impacto no empresário

Empresário não tem como saber *o que é diferente* na Ponte Digital. Ele vê mais um CRM, mais um financeiro, mais um gestor de tarefas.

### Prioridade

**P0** — A landing é a primeira impressão. Se ela comunica o produto errado, o resto não importa.

### Complexidade

**Alta** — requer não apenas redesign de página, mas uma feature nova (mini-diagnóstico ao vivo sem login) e reescrita completa da comunicação.

---

## 2. Conversa (Tela do Assistente)

### O que existe hoje

Chat com IA:
- Input de texto
- Respostas da IA em formato de mensagem
- Histórico da conversa visível
- Botão de nova conversa
- Limite de mensagens por plano exibido no canto

### O que deveria existir (segundo P23)

- Mapa Cognitivo Vivo na lateral (ver `MAPAS_COGNITIVO_VIVO.md`)
- Indicador do que a IA está processando (não apenas "digitando...")
- Hipóteses aparecendo como cards durante a conversa
- Sugestão de próximas perguntas baseadas nas lacunas
- Feedback tátil (mobile) a cada insight
- IA que não apenas responde, mas *conduz* a conversa

### Lacuna identificada

A conversa hoje é um chat genérico de IA. Não há diferenciação visual que mostre o *processo cognitivo* acontecendo. Empresário não vê o motor pensando — vê apenas o resultado.

### Fricção atual

Empresário pergunta, recebe resposta, mas **não sabe como a resposta foi construída**. A confiança na IA é cega ou inexistente. Sem transparência do processo cognitivo, a recomendação vale menos.

### Impacto no empresário

Empresário usa o chat como "tirar dúvidas", não como ferramenta de descoberta. Subutilização de 60% do potencial.

### Prioridade

**P0** — O chat é o coração da experiência. Sem o mapa cognitivo, é apenas mais um chatbot.

### Complexidade

**Alta** — envolve o Mapa Cognitivo completo, sistema de hipóteses em tempo real, e reformulação do fluxo de conversa.

---

## 3. Resumo (Tela de Resultados)

### O que existe hoje

Não existe uma tela de resumo dedicada. O que existe:
- Página de Knowledge Vault (biblioteca de conhecimento validado)
- Timeline de eventos cognitivos
- Cards de conhecimento com score de confiança

### O que deveria existir (segundo P23)

- Resumo de sessão ao final de cada conversa: "Hoje descobrimos X, Y, Z"
- Relatório de diagnóstico completo com: áreas analisadas, hipóteses formadas, confiança, lacunas restantes
- Recomendações priorizadas com evidências
- "Próximos passos" — o que a IA sugere fazer com as descobertas

### Lacuna identificada

Não há um "fechamento" da conversa. A sessão termina sem um resumo que consolide o aprendizado. Empresário sai da conversa com a sensação de que "conversou, mas e agora?"

### Fricção atual

Empresário precisa reler o histórico da conversa para extrair as conclusões. A IA descobre coisas, mas não *entrega* as descobertas de forma organizada.

### Impacto no empresário

Perda do efeito pico-fim (ver `EXPERIENCIA_SENSORIAL.md` seção 9.4). A sessão termina sem ápice e sem desfecho. Empresário não sente que "terminou algo".

### Prioridade

**P1** — Importante para retenção, mas não bloqueia o uso. Sem resumo, o empresário ainda consegue usar a plataforma.

### Complexidade

**Média** — requer nova tela e lógica de sumarização, mas reaproveita APIs de IA existentes.

---

## 4. Login (Autenticação)

### O que existe hoje

Tela padrão de login:
- E-mail + senha
- Botão "Entrar"
- Link "Esqueci a senha"
- Google OAuth disponível

### O que deveria existir (segundo P23)

O login é um momento de transição. Deveria ser:

- **Na primeira vez:** não apenas login, mas *apresentação*. "Bem-vindo, vamos começar?"
- **No retorno:** não apenas "Entrar", mas *continuação*. "João, estávamos analisando seu fluxo de caixa. Quer continuar?"
- Integração com o "estado da conversa" — se o empresário estava no meio de um diagnóstico, o login leva direto para ele
- Nenhum elemento cognitivo novo na tela de login — é momento de acesso, não de descoberta

### Lacuna identificada

Login é genérico. Não há personalização, não há continuidade. Empresário nunca sente que está "voltando" — sente que está "entrando de novo".

### Fricção atual

Nenhuma fricção grave no ato de logar. Mas perde-se uma oportunidade de reforço de continuidade.

### Impacto no empresário

Baixo impacto negativo isoladamente. Mas o acúmulo de pequenas fricções genéricas faz a plataforma parecer "mais um SaaS".

### Prioridade

**P2** — Melhoria de experiência, não funcional.

### Complexidade

**Baixa** — requer apenas personalização de texto e roteamento pós-login. Sem nova infraestrutura.

---

## 5. Dashboard (Visão Geral)

### O que existe hoje

Dashboard com:
- Resumo financeiro (receitas/despesas)
- Pipeline de leads
- Tarefas pendentes
- Alertas de sinal (HistóricoSinal)
- Seção "O que aprendemos sobre sua empresa" (top 3 aprendizados)

### O que deveria existir (segundo P23)

O dashboard deveria ser o **centro de decisão**, não o centro de dados:

- Estado cognitivo atual: "Seu diagnóstico está 72% completo"
- Insight do dia: gerado automaticamente com base nos dados mais recentes
- Recomendações pendentes: "2 recomendações aguardando sua revisão"
- Última sessão: "Na última conversa, descobrimos X. Quer aprofundar?"
- Mapa Cognitivo em versão reduzida (apenas barras de conhecimento + confiança)
- Não apenas *o que aconteceu* (dados), mas *o que significa* (interpretação)

### Lacuna identificada

Dashboard hoje é operacional. Mostra dados. Não mostra *inteligência*. Empresário vê números, mas não vê *o que fazer com eles*.

### Fricção atual

Empresário abre o dashboard, vê números, não sabe o que fazer. Precisaria começar uma conversa com a IA para obter interpretação. A interpretação não está na superfície.

### Impacto no empresário

Dashboard vira "tela de passagem" — empresário abre, olha rapidamente, e fecha. Subutilização completa do principal ponto de entrada.

### Prioridade

**P1** — Impacto alto em engajamento, mas o dashboard atual não impede o uso da plataforma.

### Complexidade

**Alta** — requer reformulação completa da página e integração com o motor cognitivo para gerar insights automáticos.

---

## 6. Primeira Semana de Uso

### O que existe hoje

- Cadastro e onboarding inicial (etapas)
- Primeiro acesso ao assistente IA
- Convite para preencher perguntas rápidas (12 perguntas de aprendizado)
- E-mails transacionais básicos

### O que deveria existir (segundo P23)

A primeira semana é a **janela crítica de ativação**. Deveria ser estruturada como uma jornada:

- **Dia 1 (onboarding):** IA se apresenta, faz as primeiras 5 perguntas, gera um mini-diagnóstico. Empresário vê o mapa pela primeira vez. Recebe 1 insight inicial.
- **Dia 2 (descoberta):** IA pergunta sobre uma área não coberta. Oferece um "resumo do que sabemos até agora".
- **Dia 3 (confiança):** IA gera a primeira hipótese com >60% de confiança. Empresário vê o mapa evoluindo.
- **Dia 4 (profundidade):** IA cruza duas áreas (ex: financeiro + clientes). Primeiro insight cruzado.
- **Dia 5 (recomendação):** Primeira recomendação gerada. Empresário toma a primeira decisão com apoio.
- **Dia 6-7 (consolidação):** Relatório semanal. "O que descobrimos juntos nesta semana."

Cada dia tem uma ação esperada da IA e um momento planejado de "wow".

### Lacuna identificada

A primeira semana hoje é aberta. Empresário decide o que fazer. Sem orientação, a maioria não chega ao primeiro insight — abandona antes de ver valor.

### Fricção atual

Empresário não sabe *o que fazer* na primeira semana. O assistente IA está disponível, mas sem uma narrativa de descoberta, o empresário não faz as perguntas certas. A IA espera — mas não guia.

### Impacto no empresário

Abandono precoce. Empresário não vê valor na primeira semana e não retorna. Perda de 70% dos novos usuários (estimado).

### Prioridade

**P0** — A primeira semana decide se o empresário fica ou vai. Sem jornada estruturada, o churn de novos usuários é altíssimo.

### Complexidade

**Alta** — requer lógica de agendamento de ações da IA, trigger de dias, e-mails comportamentais, e conteúdo de onboarding novo.

---

## 7. Primeiro Mês de Uso

### O que existe hoje

- Empresário continua usando assistente IA semanalmente
- Conhecimento acumulado disponível no vault
- Aprendizados registrados
- Uso esporádico (média 2-3 sessões no mês)

### O que deveria existir (segundo P23)

- Checkpoint de 30 dias: IA inicia a conversa com "Faz um mês que estamos conversando. Vamos ver o que mudou?"
- Relatório mensal automático: evolução do conhecimento, hipóteses confirmadas/descartadas, recomendações feitas, decisões apoiadas
- Detecção de padrão mensal: sazonalidade, comportamento de decisão, áreas negligenciadas
- "O que você aprendeu sobre sua empresa neste mês?" — reflexão guiada

### Lacuna identificada

Não há celebração de marco. O primeiro mês passa sem que o empresário perceba o quanto aprendeu. Sem o relatório, o valor acumulado fica invisível.

### Fricção atual

Média. Empresário não tem uma visão retrospectiva. Sabe que usou a plataforma, mas não consegue quantificar o valor.

### Impacto no empresário

No primeiro mês, o empresário decide se *renova ou não*. Sem uma visão clara do valor acumulado, a decisão de renovação é incerta.

### Prioridade

**P1** — Impacta diretamente retenção no médio prazo.

### Complexidade

**Alta** — requer relatório inteligente com sumarização de todo o período. Uso intensivo da IA generativa.

---

## 8. Primeira Decisão Tomada com Ajuda da IA

### O que existe hoje

Empresário faz perguntas no chat, obtém respostas, decide por conta própria. A IA fornece informações e análises, mas a decisão não é registrada nem celebrada.

### O que deveria existir (segundo P23)

A primeira decisão apoiada pela IA é um **rito de passagem**:

- IA percebe que o empresário está prestes a decidir algo e oferece: "Com base no que conversamos, minha recomendação é X. Mas a decisão é sua."
- Após a decisão: IA registra que a decisão foi tomada com apoio dela
- Celebração sutil: "Ótima decisão. Vou acompanhar os resultados."
- A decisão entra no histórico como um marco: "Primeira decisão apoiada: [decisão] em [data]"
- Se a decisão der certo (mensurável), a IA retorna com "Lembra daquela decisão? Os resultados foram positivos. Quer ver?"

### Lacuna identificada

A IA não sabe quando o empresário tomou uma decisão baseada nela. Não há feedback loop. A decisão acontece e desaparece.

### Fricção atual

O empresário não percebe que a IA está ajudando a decidir — parece que ele decidiu sozinho. O valor da IA fica invisível.

### Impacto no empresário

Sem o feedback loop, o empresário não desenvolve confiança na IA. Cada decisão parece fruto do próprio esforço. A IA não é percebida como essencial.

### Prioridade

**P1** — Fundamental para construir confiança, mas não bloqueia o uso imediato.

### Complexidade

**Média** — requer mecanismo de detecção de decisão no fluxo de conversa e registro de resultado.

---

## 9. Primeiro Insight Gerado

### O que existe hoje

Insights não são formalmente gerados. O que existe:
- Alertas de sinal (HistóricoSinal) — regras simples que disparam quando condições são atendidas
- Conhecimento validado — a IA confirma ou descarta hipóteses

### O que deveria existir (segundo P23)

Insight é o **momento de pico** da experiência:

- IA identifica um padrão que o empresário não viu: "Percebi que suas maiores despesas acontecem sempre na primeira semana do mês. Isso se repete há 6 meses."
- Insight é apresentado com: (1) o padrão, (2) a evidência, (3) o possível impacto, (4) uma pergunta para explorar
- Empresário pode salvar, compartilhar, ou aprofundar o insight
- O insight vira um card na biblioteca de conhecimento
- Se for o *primeiro* insight, a IA celebra explicitamente: "Esse é o primeiro padrão que encontramos juntos."

### Lacuna identificada

Hoje não há geração de insight. Há apenas alertas de sinal, que são regras pré-programadas (ex: "faturamento caiu 20%"). Insights genuínos — padrões não óbvios — não existem.

### Fricção atual

Empresário precisa ele mesmo conectar os pontos. A IA fornece dados, mas não *interpretação*. O valor da plataforma é reativo, não proativo.

### Impacto no empresário

Sem insights, a Ponte é apenas mais uma fonte de dados. Empresário não tem o "wow" que a diferencia de concorrentes.

### Prioridade

**P0** — Insight é o produto principal. Sem ele, não há Inteligência Empresarial. Há apenas dados.

### Complexidade

**Alta** — requer motor de detecção de padrões, capacidade de cruzamento de domínios, e apresentação narrativa do insight.

---

## 10. Primeira Automação Sugerida

### O que existe hoje

Automação não existe como funcionalidade. Não há sugestão de automação em lugar nenhum.

### O que deveria existir (segundo P23)

A IA deve reconhecer tarefas repetitivas e sugerir automatizá-las:

- "Percebi que você lança as mesmas despesas todo mês. Quer que eu automatize isso?"
- "Você envia o mesmo e-mail de cobrança toda semana. Posso fazer isso automaticamente."
- A sugestão aparece como recomendação no dashboard
- Empresário aceita, recusa, ou "lembrar depois"
- Se aceita, a IA configura a automação (ou guia o empresário na configuração)

### Lacuna identificada

Automação não existe. Zero. É uma funcionalidade inteira por construir.

### Fricção atual

Empresário usa a plataforma para *entender* o negócio, mas ainda precisa *executar* manualmente. O "decisão → ação" está quebrado.

### Impacto no empresário

A Ponte vira "ferramenta de diagnóstico que não resolve". Empresário descobre o problema mas tem que resolver sozinho. A percepção de valor cai 50%.

### Prioridade

**P2** — Importante para o ciclo completo decisão→ação, mas não no escopo atual. Depende de maturidade do motor cognitivo.

### Complexidade

**Alta** — requer detecção de padrões de repetição, integração com sistemas externos (ou com as próprias funcionalidades de CRM/Financeiro/Tarefas), e configuração de automação segura.

---

## 11. Primeira Recomendação Feita

### O que existe hoje

Não há sistema de recomendação. O assistente IA pode sugerir algo no chat, mas não há:
- Registro formal da recomendação
- Acompanhamento de aceite/rejeição
- Mensuração de resultado
- Histórico de recomendações feitas

### O que deveria existir (segundo P23)

A recomendação é o **produto final** da inteligência:

- IA recomenda uma ação específica: "Recomendo que você reduza o prazo de cobrança de 30 para 15 dias para melhorar o fluxo de caixa."
- A recomendação aparece em local dedicado (dashboard ou centro de decisão)
- Evidências: "Baseado em: (1) 40% dos clientes pagam após 25 dias, (2) seu fluxo de caixa atual está negativo em R$12k, (3) empresas do seu setor praticam 15 dias"
- Empresário responde: aceita, recusa com motivo, ou agenda para revisar
- Se aceita, a IA acompanha: "Semana passada você aceitou reduzir o prazo de cobrança. Como está sendo?"
- Histórico de recomendações: taxa de aceite, taxa de sucesso, impacto médio

### Lacuna identificada

IA pode recomendar, mas a recomendação não tem *peso* — não é registrada, não é acompanhada, não é medida. É apenas uma mensagem que se perde no histórico.

### Fricção atual

Empresário recebe a recomendação, decide, e pronto. Zero accountability. Se a recomendação der certo, a IA não é creditada. Se der errado, a IA não aprende.

### Impacto no empresário

A confiança na IA não se constrói. Recomendações viram "opinião" em vez de "diagnóstico fundamentado".

### Prioridade

**P1** — Essencial para o ciclo de valor, porém depende de outros componentes (insight, conhecimento confiável) estarem maduros.

### Complexidade

**Alta** — requer sistema de recomendação com evidências, acompanhamento de resultado, e aprendizado com aceite/rejeição.

---

## Sumário Geral das Lacunas

| Ponto | Existe hoje | Prioridade | Complexidade |
|---|---|---|---|
| Landing | Institucional genérica | P0 | Alta |
| Conversa | Chat sem transparência cognitiva | P0 | Alta |
| Resumo | Não existe | P1 | Média |
| Login | Genérico | P2 | Baixa |
| Dashboard | Operacional, sem inteligência | P1 | Alta |
| Primeira semana | Sem jornada estruturada | P0 | Alta |
| Primeiro mês | Sem relatório/célébração | P1 | Alta |
| Primeira decisão | Invisível/não registrada | P1 | Média |
| Primeiro insight | Não existe | P0 | Alta |
| Primeira automação | Não existe | P2 | Alta |
| Primeira recomendação | Informal/não registrada | P1 | Alta |

### Prioridades consolidadas

- **P0 (4):** Landing, Conversa, Primeira Semana, Primeiro Insight
- **P1 (5):** Resumo, Dashboard, Primeiro Mês, Primeira Decisão, Primeira Recomendação
- **P2 (2):** Login, Primeira Automação

### Complexidade por prioridade

- **P0:** 4 itens de alta complexidade
- **P1:** 2 de alta, 2 de média, 1 sem especificação
- **P2:** 1 baixa, 1 alta

---

## Matriz de Impacto vs Esforço (Priorização Final)

```
Alto impacto │ ● Landing (P0)      ● Insight (P0)
             │ ● Primeira Semana   ● Dashboard (P1)
             │ (P0)                ● Recomendação (P1)
             │                     ● Resumo (P1)
             │
             │ ● Primeiro Mês (P1) ● Automação (P2)
             │ ● Primeira Decisão
             │ (P1)
             │
Baixo impacto│ ● Login (P2)
             │
             └────────────────────────────
              Baixa complexidade    Alta complexidade
```

**Ordem recomendada de implementação:**

1. **Conversa (P0)** — Mapa Cognitivo + transparência
2. **Primeiro Insight (P0)** — Motor de detecção de padrões
3. **Primeira Semana (P0)** — Jornada estruturada de 7 dias
4. **Landing (P0)** — Nova comunicação + mini-diagnóstico
5. **Dashboard Inteligente (P1)** — Centro de decisão + insight do dia
6. **Resumo de Sessão (P1)** — Fechamento da conversa
7. **Primeira Recomendação (P1)** — Registro + acompanhamento
8. **Primeira Decisão (P1)** — Feedback loop
9. **Primeiro Mês (P1)** — Relatório automático
10. **Login (P2)** — Personalização
11. **Automação (P2)** — Fechamento do ciclo decisão→ação
