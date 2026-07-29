# CHECKLIST DE EXPERIÊNCIA — Programa 23

**Versão 1.0 | 26/07/2026**

> Checklist oficial de certificação da experiência cognitiva. Toda implementação, release ou alteração na Ponte Digital deve ser validada contra esta checklist antes de entrar em produção. Cada item é uma pergunta binária (sim/não) — se a resposta for "não", a implementação não está pronta.

---

## Como usar esta checklist

1. A cada implementação, percorrer **todas** as categorias aplicáveis ao que foi alterado.
2. Marcar `[ ]` se o item ainda não foi verificado, `[S]` se sim, `[N]` se não.
3. Para cada `[N]`, preencher o campo **Observações** com o motivo e o plano de correção.
4. Nenhuma release pode conter mais de 3 itens `[N]` no total, e nenhum item `[N]` pode estar nas categorias **PRIMEIRA IMPRESSÃO**, **CONFIANÇA** ou **CLAREZA**.
5. Itens marcados com `(CRÍTICO)` são inegociáveis — qualquer `[N]` bloqueia a release.

---

## PRIMEIRA IMPRESSÃO (15 itens)

| # | Item | S/N | Observações |
|---|------|-----|-------------|
| 1 | Existe valor antes do cadastro? O empresário vê algo útil antes de criar conta. | [ ] | |
| 2 | O empresário entende o que é a Ponte em menos de 5 segundos, sem precisar ler explicação? | [ ] | |
| 3 | A identidade visual comunica inteligência, não "chatbot" nem "SaaS genérico"? | [ ] | |
| 4 | O tom da primeira mensagem não soa como chatbot ("Olá! Como posso ajudar")? | [ ] | |
| 5 | A tela carrega em menos de 1 segundo (percepção visual, não técnica)? | [ ] | |
| 6 | O layout é minimalista ao extremo — sem excesso de botões, textos ou opções? | [ ] | |
| 7 | Existe um elemento visual único e memorável que diferencia a Ponte de qualquer outra ferramenta? | [ ] | |
| 8 | O sistema já inicia a conversa com algo relevante, em vez de esperar o empresário perguntar? | [ ] | |
| 9 | A primeira pergunta da IA é a mais fácil de responder (quebra-gelo)? | [ ] | |
| 10 | O visual não contém elementos que lembrem chatbot (bolha, avatar de robô, campo "Digite sua mensagem")? | [ ] | |
| 11 | A identidade visual comunica inteligência e seriedade, sem parecer brinquedo ou gamificação? | [ ] | |
| 12 | O empresário sente nos primeiros 3 segundos que "isso é diferente" de tudo que já viu? | [ ] | |
| 13 | (CRÍTICO) Não há tour guiado, tutorial, vídeo de apresentação ou onboarding forçado? | [ ] | |
| 14 | A primeira interação usa dados do empresário (ou contexto), não é genérica? | [ ] | |
| 15 | O empresário sabe exatamente o que fazer nos primeiros 2 segundos sem instrução? | [ ] | |

---

## PERCEPÇÃO DE INTELIGÊNCIA (15 itens)

| # | Item | S/N | Observações |
|---|------|-----|-------------|
| 16 | Existe percepção de inteligência nos primeiros 30 segundos de interação? | [ ] | |
| 17 | A IA mostra que entende o contexto do negócio, não apenas a pergunta literal? | [ ] | |
| 18 | A IA conecta informações que o empresário não conectou sozinho? | [ ] | |
| 19 | A IA admite quando não sabe, de forma inteligente (não "Não entendi")? | [ ] | |
| 20 | A IA demonstra raciocínio ("Considerei X, Y e Z..."), não apenas entrega resultado? | [ ] | |
| 21 | A IA usa dados concretos e específicos da empresa, não afirmações genéricas? | [ ] | |
| 22 | A velocidade da resposta varia conforme a complexidade (rápida para simples, pausada para complexa)? | [ ] | |
| 23 | Existe pelo menos um momento de "Como isso sabe?" nos primeiros 5 minutos? | [ ] | |
| 24 | A IA demonstra memória de interações anteriores dentro da mesma sessão? | [ ] | |
| 25 | A IA demonstra aprendizado entre sessões ("Da última vez eu não sabia disso, agora sei")? | [ ] | |
| 26 | A IA antecipa perguntas que o empresário ainda não fez? | [ ] | |
| 27 | A IA usa terminologia correta do setor/negócio do empresário? | [ ] | |
| 28 | (CRÍTICO) A IA nunca alucina — nunca inventa dados ou evidências que não existem? | [ ] | |
| 29 | A IA mostra incerteza calculada ("Tenho 85% de confiança") em vez de certeza falsa? | [ ] | |
| 30 | A IA parece estar processando e raciocinando, não apenas recuperando texto pronto? | [ ] | |

---

## CONVERSA (25 itens)

| # | Item | S/N | Observações |
|---|------|-----|-------------|
| 31 | Existe explicação suficiente do que está acontecendo em cada fase da conversa? | [ ] | |
| 32 | A cadência da conversa se adapta ao perfil do empresário (rápido para pragmático, pausado para analítico)? | [ ] | |
| 33 | As pausas entre fala da IA e resposta do empresário são naturais? | [ ] | |
| 34 | A IA reage ao conteúdo da resposta do empresário, não apenas avança para a próxima pergunta? | [ ] | |
| 35 | A conversa não é linear — a IA pode revisitar tópicos, mudar de direção, aprofundar? | [ ] | |
| 36 | A IA respeita o silêncio do empresário (não pergunta "Ainda está aí?" nem apressa)? | [ ] | |
| 37 | O empresário pode interromper, corrigir ou parar a conversa a qualquer momento? | [ ] | |
| 38 | Resumos parciais aparecem a cada 5 perguntas ou 3 minutos de conversa? | [ ] | |
| 39 | A IA faz perguntas de aprofundamento que mostram que ela lembra do que foi dito antes? | [ ] | |
| 40 | A conversa alterna entre confirmação, revelação, provocação e ação? | [ ] | |
| 41 | A IA evita fazer mais de uma pergunta por vez? | [ ] | |
| 42 | Perguntas confrontadoras só aparecem depois de confiança estabelecida (> 50%)? | [ ] | |
| 43 | Se o empresário resiste a uma pergunta, a IA recua (não insiste)? | [ ] | |
| 44 | A IA celebra descobertas do empresário ("Boa percepção!", "Isso é relevante")? | [ ] | |
| 45 | A conversa tem um arco — começo, meio, encaminhamento para fechamento? | [ ] | |
| 46 | A IA nunca interrompe o empresário enquanto ele digita? | [ ] | |
| 47 | Se o empresário responde algo inesperado, a IA reage com curiosidade, não com confusão? | [ ] | |
| 48 | A IA evita linguagem burocrática ("Conforme mencionado anteriormente", "Em atenção à sua solicitação")? | [ ] | |
| 49 | A IA usa linguagem de descoberta ("Encontrei algo interessante"), não de consulta ("Aqui está o resultado")? | [ ] | |
| 50 | O empresário consegue diferenciar quando a IA está afirmando vs. quando está hipotetizando? | [ ] | |
| 51 | Após cada resposta do empresário, a IA demonstra que "absorveu" (pausa de 500ms + badge)? | [ ] | |
| 52 | A IA adapta o vocabulário ao nível de sofisticação do empresário? | [ ] | |
| 53 | Perguntas abertas e fechadas se alternam naturalmente? | [ ] | |
| 54 | A IA pergunta "Isso faz sentido para você?" após insights, não após informações triviais? | [ ] | |
| 55 | (CRÍTICO) A conversa jamais soa como interrogatório — o empresário sente que está sendo investigado com inteligência, não entrevistado? | [ ] | |

---

## EXCESSOS (12 itens)

| # | Item | S/N | Observações |
|---|------|-----|-------------|
| 56 | Existe excesso de texto nas respostas da IA? (R: deve ser não — respostas devem ser concisas) | [ ] | |
| 57 | Existe excesso de animação ou movimento na tela? | [ ] | |
| 58 | Existe excesso de perguntas em sequência sem pausa para processamento? | [ ] | |
| 59 | Existe excesso de informação visual na tela (cards, badges, indicadores)? | [ ] | |
| 60 | Existe excesso de opções para o empresário escolher a qualquer momento? | [ ] | |
| 61 | Existe excesso de estímulos concorrentes (notificações, alertas, sons)? | [ ] | |
| 62 | Existe excesso de badges de confiança, cores ou indicadores visuais? | [ ] | |
| 63 | Existe excesso de personalização a ponto de parecer invasivo? | [ ] | |
| 64 | Existe excesso de transparência (mostrar todo o processamento, não apenas o raciocínio)? | [ ] | |
| 65 | Existe excesso de confirmações solicitadas ao empresário ("Confirma?", "Está correto?")? | [ ] | |
| 66 | Existe excesso de dados na tela (números, métricas, gráficos) que o empresário não pediu? | [ ] | |
| 67 | Existe excesso de "inteligência" — a IA tenta impressionar em toda interação, cansando o empresário? | [ ] | |

---

## ESPERA E TEMPO (12 itens)

| # | Item | S/N | Observações |
|---|------|-----|-------------|
| 68 | Existe espera desnecessária (spinner, loading sem propósito)? | [ ] | |
| 69 | O loading comunica o que está sendo processado ("Analisando seus dados de vendas...")? | [ ] | |
| 70 | O tempo de resposta é proporcional à complexidade percebida da pergunta? | [ ] | |
| 71 | Respostas para perguntas complexas têm uma pausa perceptível que comunica "estou pensando"? | [ ] | |
| 72 | Respostas para perguntas simples são instantâneas (< 500ms)? | [ ] | |
| 73 | (CRÍTICO) A IA nunca faz o empresário esperar por uma resposta que parece genérica ou pré-pronta? | [ ] | |
| 74 | A espera gera antecipação, não ansiedade? | [ ] | |
| 75 | O tempo de digitação simulada (para respostas longas) é natural (~30 caracteres/s)? | [ ] | |
| 76 | O empresário não sente que está esperando — sente que a IA está processando? | [ ] | |
| 77 | Se a IA erra ou falha, a resposta vem em menos de 500ms (sem deixar o empresário esperando)? | [ ] | |
| 78 | A duração das animações é adequada ao contexto (rápida para ações, lenta para revelações)? | [ ] | |
| 79 | O empresário nunca precisa esperar para saber se a IA está ativa ou travada? | [ ] | |

---

## FRICÇÃO (16 itens)

| # | Item | S/N | Observações |
|---|------|-----|-------------|
| 80 | Existe fricção no primeiro uso — o empresário precisa aprender algo antes de obter valor? | [ ] | |
| 81 | Existe fricção no retorno — o empresário precisa lembrar onde parou? | [ ] | |
| 82 | Existe fricção na digitação — o empresário precisa escrever muito para se comunicar? | [ ] | |
| 83 | Existe fricção na leitura — as respostas são longas, densas ou mal formatadas? | [ ] | |
| 84 | Existe fricção de navegação — o empresário precisa ir para outra tela para continuar? | [ ] | |
| 85 | Existe fricção de contexto — o empresário precisa repetir informação já fornecida? | [ ] | |
| 86 | Existe fricção de decisão — o empresário precisa escolher entre muitas opções? | [ ] | |
| 87 | Existe fricção de confiança — o empresário hesita em compartilhar dados sensíveis? | [ ] | |
| 88 | Existe fricção de expectativa — o empresário esperava algo diferente do que recebeu? | [ ] | |
| 89 | Existe fricção de formato — a informação chega em formato que o empresário não espera? | [ ] | |
| 90 | Existe fricção de progresso — o empresário não sabe quanto falta para o diagnóstico completo? | [ ] | |
| 91 | Existe fricção de erro — quando algo dá errado, o caminho de recuperação não é óbvio? | [ ] | |
| 92 | Existe fricção de vocabulário — a IA usa termos que o empresário não conhece? | [ ] | |
| 93 | Existe fricção de ritmo — a IA é rápida demais (empresário não acompanha) ou lenta demais? | [ ] | |
| 94 | (CRÍTICO) O empresário consegue obter o primeiro insight sem nenhuma fricção? | [ ] | |
| 95 | Existe fricção de continuidade — o empresário perde o fio da meiota se sai e volta? | [ ] | |

---

## CLAREZA (12 itens)

| # | Item | S/N | Observações |
|---|------|-----|-------------|
| 96 | O empresário entende o que a IA está perguntando em cada pergunta? | [ ] | |
| 97 | O empresário entende o que a IA descobriu quando ela apresenta um insight? | [ ] | |
| 98 | O empresário entende o que pode fazer a seguir após cada resposta? | [ ] | |
| 99 | (CRÍTICO) O empresário entende o propósito da conversa nos primeiros 10 segundos? | [ ] | |
| 100 | As badges, cores e indicadores visuais são intuitivos (não precisam de legenda)? | [ ] | |
| 101 | O empresário entende a diferença entre confiança alta, média e baixa sem explicação? | [ ] | |
| 102 | O resumo parcial é claro o suficiente para o empresário corrigir se a IA entendeu errado? | [ ] | |
| 103 | O diagnóstico final é apresentado em linguagem de negócio, não técnica? | [ ] | |
| 104 | O empresário entende o que precisa fazer depois que a conversa termina? | [ ] | |
| 105 | Cada elemento visual tem propósito claro e é compreendido em < 2 segundos? | [ ] | |
| 106 | A IA nunca pergunta algo que já foi respondido antes? | [ ] | |
| 107 | O empresário entende por que a IA está fazendo cada pergunta (o contexto da investigação)? | [ ] | |

---

## CONFIANÇA (12 itens)

| # | Item | S/N | Observações |
|---|------|-----|-------------|
| 108 | A IA constrói confiança antes de perguntar dados sensíveis? | [ ] | |
| 109 | A IA mostra confiança adequada nas respostas (segura quando sabe, cautelosa quando não sabe)? | [ ] | |
| 110 | (CRÍTICO) A IA admite incerteza quando necessário, de forma inteligente? | [ ] | |
| 111 | A IA demonstra honestidade quando corrige uma hipótese anterior? | [ ] | |
| 112 | O empresário vê as evidências por trás de cada insight? | [ ] | |
| 113 | O sistema de confiança visual (cores, badges) é consistente em toda a plataforma? | [ ] | |
| 114 | A IA nunca usa linguagem autoelogiosa ("Sou inteligente porque...")? | [ ] | |
| 115 | A IA respeita quando o empresário discorda — não argumenta, investiga? | [ ] | |
| 116 | O empresário confia nos insights da IA a ponto de tomar decisões baseadas neles? | [ ] | |
| 117 | A IA é consistente — não contradiz insights anteriores sem explicação? | [ ] | |
| 118 | O sistema de confiança é transparente — o empresário pode ver como cada score é calculado? | [ ] | |
| 119 | A IA pede confirmação do empresário antes de transformar hipótese em conhecimento validado? | [ ] | |

---

## CONTINUIDADE (12 itens)

| # | Item | S/N | Observações |
|---|------|-----|-------------|
| 120 | A experiência funciona se o empresário sair e voltar (estado preservado)? | [ ] | |
| 121 | O histórico da conversa anterior é preservado e acessível? | [ ] | |
| 122 | O estado cognitivo (confiança, hipóteses, lacunas) é restaurado ao retornar? | [ ] | |
| 123 | O empresário retoma de onde parou, sem precisar repetir informação? | [ ] | |
| 124 | A saudação de retorno é personalizada ("Bem-vindo de volta. Sua última visita foi na terça")? | [ ] | |
| 125 | Insights descobertos em sessões anteriores são referenciados na nova sessão? | [ ] | |
| 126 | A IA detecta mudanças desde a última visita ("Desde sua última visita, notei que...")? | [ ] | |
| 127 | O fechamento de cada sessão prepara a próxima ("Na próxima visita, vou investigar...")? | [ ] | |
| 128 | O empresário pode continuar de qualquer dispositivo com o mesmo contexto? | [ ] | |
| 129 | O aprendizado entre sessões é cumulativo (cada sessão adiciona, não substitui)? | [ ] | |
| 130 | Se houve correção de hipótese entre sessões, a IA comunica na retomada? | [ ] | |
| 131 | O empresário não precisa refazer configurações ou preferências ao retornar? | [ ] | |

---

## ANIMAÇÃO E MOVIMENTO (12 itens)

| # | Item | S/N | Observações |
|---|------|-----|-------------|
| 132 | Cada animação tem propósito — nenhuma é meramente decorativa? | [ ] | |
| 133 | A duração das animações é adequada ao contexto (300-400ms para transições, mais lentas para revelações)? | [ ] | |
| 134 | Animações não competem entre si — não há movimentos paralelos conflitantes? | [ ] | |
| 135 | A direção do movimento comunica significado (slide up = avanço, slide down = retorno)? | [ ] | |
| 136 | O easing das animações é orgânico (ease-out, ease-in-out), não mecânico (linear)? | [ ] | |
| 137 | A digitação simulada de respostas longas usa velocidade natural (~30 caracteres/s)? | [ ] | |
| 138 | O indicador de "pensamento" da IA (pontos pulsando) tem texto dinâmico que comunica o que está sendo processado? | [ ] | |
| 139 | Animações de insight (destaque, ✦) têm duração adequada (~3s) antes de normalizar? | [ ] | |
| 140 | Transições entre fases da conversa são suaves (fade + slide, sem cortes bruscos)? | [ ] | |
| 141 | Animações respeitam preferência do sistema por redução de movimento? | [ ] | |
| 142 | A velocidade das animações não interfere na legibilidade ou compreensão? | [ ] | |
| 143 | Microinterações (hover, clique, recebimento de mensagem) têm feedback visual imediato? | [ ] | |

---

## SOM E SENSAÇÕES (8 itens)

| # | Item | S/N | Observações |
|---|------|-----|-------------|
| 144 | Sons vêm desligados por padrão (opt-in, não opt-out)? | [ ] | |
| 145 | Se ativados, os sons comunicam conteúdo (insight, notificação, início/fim), não são decorativos? | [ ] | |
| 146 | O som de insight soa como satisfação de descoberta, não como urgência de notificação? | [ ] | |
| 147 | O volume dos sons é adequado (nunca estridente, nunca imperceptível)? | [ ] | |
| 148 | O empresário pode escolher quais sons ativar (insight, alerta, início de sessão)? | [ ] | |
| 149 | O silêncio (som desligado) não quebra a experiência — a experiência é completa sem som? | [ ] | |
| 150 | Vibração/háptico (mobile) é usado com moderação, apenas para momentos de insight? | [ ] | |
| 151 | A ausência de som não deixa o empresário sem feedback crítico (ex.: erro)? | [ ] | |

---

## ERRO E RECUPERAÇÃO (10 itens)

| # | Item | S/N | Observações |
|---|------|-----|-------------|
| 152 | (CRÍTICO) Se a IA dá uma resposta errada, ela consegue se corrigir de forma elegante? | [ ] | |
| 153 | Mensagens de erro são em linguagem humana, não técnica ("Algo deu errado", não "Erro 500")? | [ ] | |
| 154 | Após um erro, o empresário sabe exatamente o que fazer para continuar? | [ ] | |
| 155 | A IA nunca culpa o empresário por erros do sistema? | [ ] | |
| 156 | Se a IA não entende, ela pergunta de forma inteligente, não "Não entendi, pode reformular?" | [ ] | |
| 157 | Se a conexão cai, o estado é preservado e a retomada é automática? | [ ] | |
| 158 | O empresário pode reportar um erro sem sair do fluxo atual? | [ ] | |
| 159 | Se a IA detecta que está sendo inconsistente, ela pausa e se corrige antes de continuar? | [ ] | |
| 160 | Correções de hipótese são comunicadas de forma que aumentam a confiança, não que a diminuem? | [ ] | |
| 161 | Após uma correção, a IA explica o que mudou e por quê? | [ ] | |

---

## ACESSIBILIDADE E INCLUSÃO (8 itens)

| # | Item | S/N | Observações |
|---|------|-----|-------------|
| 162 | O contraste entre texto e fundo atende a padrões mínimos de legibilidade? | [ ] | |
| 163 | A hierarquia visual funciona sem depender apenas de cores (daltônicos)? | [ ] | |
| 164 | O tamanho da fonte é adequado para leitura em tela (mínimo 16px para corpo)? | [ ] | |
| 165 | Todos os elementos interativos são acessíveis por teclado? | [ ] | |
| 166 | A linguagem é simples o suficiente para empresários com diferentes níveis de escolaridade? | [ ] | |
| 167 | A IA evita jargão técnico, siglas não explicadas e estrangeirismos desnecessários? | [ ] | |
| 168 | O ritmo da conversa não exclui empresários que processam informação mais devagar? | [ ] | |
| 169 | As animações respeitam a preferência do sistema operacional por redução de movimento? | [ ] | |

---

## DISPOSITIVOS E CONTEXTO (6 itens)

| # | Item | S/N | Observações |
|---|------|-----|-------------|
| 170 | A experiência funciona em mobile (responsivo, touch-friendly)? | [ ] | |
| 171 | A experiência funciona em tablet (modo paisagem e retrato)? | [ ] | |
| 172 | O campo de entrada é fácil de usar em mobile (teclado contextual, sem digitação excessiva)? | [ ] | |
| 173 | A experiência preserva contexto se o empresário alterna entre dispositivos? | [ ] | |
| 174 | Notificações push/mobile são usadas com moderação e relevância? | [ ] | |
| 175 | O empresário pode iniciar uma conversa no mobile e continuar no desktop? | [ ] | |

---

## Resumo da Checklist

| Categoria | Total Itens | [S] | [N] | [ ] (não verificado) |
|-----------|-------------|-----|-----|-----------------------|
| Primeira Impressão | 15 | | | |
| Percepção de Inteligência | 15 | | | |
| Conversa | 25 | | | |
| Excesso | 12 | | | |
| Espera e Tempo | 12 | | | |
| Fricção | 16 | | | |
| Clareza | 12 | | | |
| Confiança | 12 | | | |
| Continuidade | 12 | | | |
| Animação e Movimento | 12 | | | |
| Som e Sensações | 8 | | | |
| Erro e Recuperação | 10 | | | |
| Acessibilidade e Inclusão | 8 | | | |
| Dispositivos e Contexto | 6 | | | |
| **Total** | **175** | | | |

---

## Regras de Aprovação

- **Itens CRÍTICOS:** qualquer `[N]` bloqueia a release.
- **Itens não críticos:** máximo de 3 `[N]` no total geral.
- **Primeira Impressão, Confiança, Clareza:** zero `[N]` permitidos.
- **Reincidência:** se um mesmo item aparecer como `[N]` em duas releases consecutivas, a implementação é suspensa até correção.
- **Falsos negativos:** se um item for marcado como `[S]` mas um usuário reportar o problema em produção, a resposta `[S]` será auditada e o responsável pela verificação notificado.

---

## Histórico de Versões

| Data | Versão | Alterações |
|------|--------|------------|
| 26/07/2026 | 1.0 | Criação inicial — 175 itens em 14 categorias |

---

*Esta checklist é um documento vivo. Novos itens podem ser adicionados conforme aprendizado com testes reais. Todo item adicionado deve ser registrado neste documento com data e justificativa.*
