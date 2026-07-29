# AUDITORIA DE POLIMENTO — P2: Animações, Mobile, Estados, Performance, Arquitetura Emocional

**Programa 27 — Polimento e Elegância | 26/07/2026**

> Continuação da auditoria de polimento. Domínios 16-24: animações, mobile, desktop, dark mode, estados vazios/erro/sucesso, performance percebida e arquitetura emocional da jornada completa. Nota 0-10, recomendação, prioridade.

---

## 16. ANIMAÇÕES

### 16.1 Eliminar exageros: animações que duram mais que 600ms sem justificativa

**Estado atual:** Transições de tela em 700-800ms. Entrada de insight em 800ms + destaque de 3s.

**Problema:** 800ms para transição de tela é lento. O empresário espera a animação terminar para interagir. O destaque de 3s do insight impede interação durante esse período.

**Nota:** 5/10

**Recomendação:** Reduzir transições de tela para 500ms (máximo). Insight: entrada em 500ms, destaque visual de 2s (não bloqueante — empresário pode interagir durante). Nenhuma animação funcional deve exceder 600ms. Apenas animações narrativas (ex.: IA "pensando") podem ser mais longas.

**Prioridade:** P1

**Esforço:** Baixo (ajuste de constantes)

---

### 16.2 Eliminar lentidão: transições que demoram mais que 500ms

**Estado atual:** Transição conversa → resumo (700ms), conversa → diagnóstico (800ms). Acima do limite.

**Problema:** O empresário sente a espera. Transições longas quebram o fluxo.

**Nota:** 5/10

**Recomendação:** Máximo 500ms para transições entre telas. A animação deve ser rápida o suficiente para não ser percebida como "espera". Se precisar de mais tempo para carregar conteúdo, mostrar o content loading antes da transição.

**Prioridade:** P1

**Esforço:** Baixo

---

### 16.3 Eliminar distrações: animações em loop ou que chamam atenção sem necessidade

**Estado atual:** Indicador de pensamento da IA com pontos pulsando em loop + texto dinâmico. Mapa cognitivo com animação contínua de "processamento" (linhas pulsando).

**Problema:** Animações em loop no mapa competem com o conteúdo principal. Empresário pode se distrair com o movimento periférico.

**Nota:** 6/10

**Recomendação:** Animações em loop só quando estritamente necessárias (ex.: IA processando). Mapa cognitivo só anima quando há mudança real de estado. "Processamento em background" não é animado — é indicado por um ponto estático pulsante muito sutil.

**Prioridade:** P1

**Esforço:** Baixo

---

### 16.4 Consistência: easing padrão (ease-out) para 90% dos casos

**Estado atual:** Uso misto de ease-out e ease-in-out. Sem padrão claro.

**Problema:** Transições com ease-in-out parecem mais lentas no início e no fim, criando sensação de "arrasto". Inconsistência perceptível.

**Nota:** 6/10

**Recomendação:** ease-out como padrão para 90% das animações. ease-in-out reservado para: (1) transições entre telas com conteúdo diferente, (2) animações de correção/erro. Documentar exceções.

**Prioridade:** P2

**Esforço:** Baixo

---

## 17. MOBILE

### 17.1 Toque: alvos com mínimo 44x44px?

**Estado atual:** Botões e inputs têm tamanho adequado (~48px). Mas badges, ícones de ação (editar, fechar, expandir) podem ter < 32px.

**Problema:** Ícones pequenos em mobile são difíceis de tocar. Empresário erra o alvo.

**Nota:** 5/10

**Recomendação:** Auditar todos os elementos tocáveis em mobile. Mínimo 44x44px (recomendado 48x48). Badges e ícones pequenos devem ter zona de toque expandida via padding.

**Prioridade:** P0

**Esforço:** Médio

---

### 17.2 Scroll: suave, sem travamentos?

**Estado atual:** Scroll funciona, mas em telas com muitos cards (dashboard), há microtravamentos.

**Problema:** Microtravamentos quebram a percepção de polimento. Empresário nota a falta de suavidade.

**Nota:** 6/10

**Recomendação:** Auditar performance de scroll. Virtualizar listas longas. Garantir 60fps em scroll com will-change e transform GPU. Testar em dispositivos de gama baixa-média.

**Prioridade:** P1

**Esforço:** Médio

---

### 17.3 Layout: adaptado ou responsivo?

**Estado atual:** Layout responsivo (adaptação por breakpoint). Conversa ocupa largura total em mobile.

**Problema:** Responsivo, não adaptativo. A experiência mobile é a versão encolhida da desktop, não uma experiência pensada para mobile-first.

**Nota:** 5/10

**Recomendação:** Adotar mobile-first. A experiência mobile não é "desktop que coube na tela" — é uma reordenação consciente dos elementos. Ex.: Mapa Cognitivo vira bottom sheet ao invés de sidebar espremida. Cards mudam de grid (2 colunas) para lista vertical.

**Prioridade:** P1

**Esforço:** Alto

---

### 17.4 Conversa: campo de texto acessível?

**Estado atual:** Campo de texto no bottom da tela, fixo. Teclado empurra o conteúdo para cima.

**Problema:** Em mobile, o teclado cobre parte da conversa. Empresário perde contexto ao digitar.

**Nota:** 5/10

**Recomendação:** Garantir que o campo de texto + teclado não cubram a última mensagem. Usar ScrollToIndex para manter a última mensagem visível acima do teclado. O campo deve ter altura mínima de 44px e最大 de 120px (auto-expansão).

**Prioridade:** P1

**Esforço:** Médio

---

### 17.5 Painel: colapsado ou visível?

**Estado atual:** Mapa Cognitivo não aparece em mobile, ou aparece como bottom sheet.

**Problema:** O principal diferencial da Ponte (mapa cognitivo) é invisível em mobile. Empresário que usa apenas mobile perde o elemento central.

**Nota:** 4/10

**Recomendação:** Mapa Cognitivo como bottom sheet acessível por swipe up ou botão flutuante. Sheet ocupa 70% da tela, com versão reduzida (apenas áreas). Versão completa em landscape ou tablet. O mapa nunca está ausente — está adaptado.

**Prioridade:** P0

**Esforço:** Alto

---

## 18. DESKTOP

### 18.1 Aproveitamento: espaço é bem usado?

**Estado atual:** Em desktop >1440px, a conversa central tem largura fixa (720px). Sobra espaço nas laterais.

**Problema:** Espaço não é bem aproveitado. O Mapa Cognitivo ocupa apenas 320px. Sobra espaço morto.

**Nota:** 6/10

**Recomendação:** Em telas grandes (>1440px), o layout pode expandir: mapa cognitivo maior (400px), histórico da conversa visível à esquerda, ou cards de insight ao lado da conversa. O espaço extra deve ser usado para contexto, não para esticar a conversa.

**Prioridade:** P2

**Esforço:** Médio

---

### 18.2 Janelas: redimensionamento não quebra layout?

**Estado atual:** Redimensionamento funciona, mas em larguras intermediárias (900-1024px) o layout pode "pular" (reflow brusco).

**Problema:** Transições entre breakpoints não são suaves. O layout pula de 3 colunas para 2 colunas sem transição.

**Nota:** 6/10

**Recomendação:** Implementar transições de layout suaves com CSS transitions no grid. O reordenamento não deve ser instantâneo — deve animar (200-300ms). Testar em todas as larguras de 320px a 1920px.

**Prioridade:** P2

**Esforço:** Médio

---

### 18.3 Multi-tarefa: dá para usar com outras janelas abertas?

**Estado atual:** Ponte ocupa tela cheia. Não há modo compacto ou "janela flutuante".

**Problema:** Empresário que quer usar a Ponte enquanto consulta planilha ou sistema precisa alternar entre abas. A experiência é "tudo ou nada".

**Nota:** 4/10

**Recomendação:** Criar modo compacto: a Ponte pode ser usada em janela de 480x720 (como um chat/assistente flutuante). Nesse modo, apenas a conversa + sugestões são visíveis. Mapa e dashboard ficam acessíveis por atalho.

**Prioridade:** P2

**Esforço:** Alto

---

### 18.4 Atalhos de teclado existem?

**Estado atual:** Nenhum atalho de teclado documentado. Enter para enviar é o único.

**Problema:** Empresário que usa desktop pesado (teclado) não tem atalhos para ações frequentes. Experiência lenta para usuário avançado.

**Nota:** 3/10

**Recomendação:** Implementar atalhos: Ctrl+Enter (enviar), Ctrl+K (busca/pesquisar), Ctrl+M (abrir mapa), Ctrl+D (dashboard), Esc (fechar modal), Seta Cima (editar última resposta). Documentar e ensinar no onboarding.

**Prioridade:** P2

**Esforço:** Médio

---

## 19. DARK MODE

### 19.1 Consistência absoluta com light mode

**Estado atual:** Dark mode parcialmente implementado. Alguns componentes (cards de insight, badges) podem não estar adaptados.

**Problema:** Inconsistências entre modos criam percepção de falta de polimento.

**Nota:** 5/10

**Recomendação:** Auditoria completa dark mode: cada componente deve ser verificado em ambos os modos. Nenhum componente funciona em apenas um modo. Testar em todas as telas.

**Prioridade:** P1

**Esforço:** Médio

---

### 19.2 Cores adaptadas sem perder hierarquia

**Estado atual:** Dark mode usa inversão simples de fundo e texto.

**Problema:** A hierarquia visual pode ser perdida quando cores são simplesmente invertidas. Badges verdes em dark mode podem perder contraste ou significado.

**Nota:** 5/10

**Recomendação:** Adaptar cores semanticamente, não mecanicamente. Verde de confiança em dark mode: mais escuro (para não ofuscar), mas mantendo contraste suficiente. A paleta dark mode é projetada, não derivada.

**Prioridade:** P1

**Esforço:** Médio

---

### 19.3 Contraste mantido

**Estado atual:** Dark mode com texto branco (#FFFFFF) sobre fundo escuro (#1a1a2e). Contrate nominal OK, mas badges de confiança (verde, amarelo) sobre fundo escuro podem ter contraste reduzido.

**Problema:** Badges que funcionam em light mode (texto escuro sobre badge claro) falham em dark mode (texto claro sobre badge escuro).

**Nota:** 5/10

**Recomendação:** Projetar badges específicos para dark mode. Separar tokens de cor por modo. Verificar cada badge individualmente contra WCAG AA.

**Prioridade:** P1

**Esforço:** Médio

---

### 19.4 Imagens/ícones adaptados

**Estado atual:** Ícones podem ser monocromáticos (adaptáveis) ou coloridos fixos.

**Problema:** Ícones com cor fixa podem desaparecer em dark mode se a cor for similar ao fundo.

**Nota:** 6/10

**Recomendação:** Todos os ícones devem ser SVG com currentColor ou ter versão específica para dark mode. Garantir visibilidade em ambos os modos.

**Prioridade:** P2

**Esforço:** Baixo

---

## 20. ESTADOS VAZIOS

### 20.1 Devem ensinar o que fazer, não apenas dizer "nada aqui"

**Estado atual:** Estado vazio do dashboard: "Nenhum insight ainda. Continue o diagnóstico." Estado vazio do mapa: "Nenhuma área mapeada."

**Problema:** Diz o que falta, mas não ensina o que fazer. É informativo, não instrutivo.

**Nota:** 5/10

**Recomendação:** Estado vazio deve conter: (1) explicação do que aquele espaço será, (2) ação clara para preenchê-lo, (3) tom acolhedor. "Seus insights vão aparecer aqui assim que eu conhecer melhor sua empresa. Que tal começarmos pelo diagnóstico?"

**Prioridade:** P1

**Esforço:** Baixo

---

### 20.2 Devem ter ação: botão/CTA para preencher o estado

**Estado atual:** Estados vazios têm texto, mas nem sempre têm CTA.

**Problema:** Empresário olha, lê, mas não tem o que fazer ali. Abandona a tela.

**Nota:** 5/10

**Recomendação:** Todo estado vazio tem um CTA primário: "Iniciar diagnóstico", "Fazer primeira pergunta", "Importar dados". O estado vazio é um ponto de partida, não um beco sem saída.

**Prioridade:** P0

**Esforço:** Baixo

---

### 20.3 Nunca parecer abandono

**Estado atual:** Telas vazias com fundo limpo parecem "não implementadas".

**Problema:** Empresário pode interpretar que a tela está quebrada ou incompleta.

**Nota:** 4/10

**Recomendação:** Todo estado vazio deve ter tratamento visual de "pronto para receber", não de "vazio". Bordas tracejadas, elementos placeholder com animação sutil ("respiro"), ícone ilustrativo. Não parece vazio — parece "à espera".

**Prioridade:** P1

**Esforço:** Médio

---

### 20.4 Tom: acolhedor, não técnico

**Estado atual:** "Nenhum insight disponível." — tom técnico, frio.

**Problema:** O tom não acolhe, apenas informa. Empresário pode se sentir culpado por não ter insights.

**Nota:** 5/10

**Recomendação:** "Ainda não descobri nada novo. Mas estou analisando seus dados — em breve trago algo." Tom de expectativa positiva, não de déficit. O estado vazio é uma promessa, não uma falta.

**Prioridade:** P1

**Esforço:** Baixo

---

## 21. ESTADOS DE ERRO

### 21.1 Devem tranquilizar: "Algo deu errado, mas estamos aqui"

**Estado atual:** "Erro ao processar resposta. Tente novamente." — tom informativo, não tranquilizador.

**Problema:** Empresário pode se sentir inseguro. "Erro" é uma palavra forte.

**Nota:** 5/10

**Recomendação:** "Não consegui processar sua resposta. Isso é temporário. Quer tentar de novo?" Eliminar a palavra "erro" da interface sempre que possível. Substituir por "não consegui", "não foi dessa vez", "vamos tentar novamente".

**Prioridade:** P1

**Esforço:** Baixo

---

### 21.2 Nunca assustar: sem vermelho sangue, sem alertas agressivos

**Estado atual:** Erro usa vermelho (#DC2626) + ícone de alerta (!).

**Problema:** Vermelho + exclamação = alerta de perigo. Em empresário, gera ansiedade desnecessária.

**Nota:** 5/10

**Recomendação:** Substituir vermelho sangue por tom mais suave (laranja-queimado ou bordô). Substituir exclamação por mensagem textual calma. Tom visual de "atenção", não de "perigo".

**Prioridade:** P1

**Esforço:** Baixo

---

### 21.3 Solução: sempre oferecer próximo passo

**Estado atual:** "Tente novamente" — vago, genérico.

**Problema:** "Tentar novamente" pode não resolver se o problema persistir. Empresário fica em loop.

**Nota:** 5/10

**Recomendação:** Oferecer alternativas: "Tentar novamente" + "Pular por enquanto" + "Falar com suporte" (se aplicável). O próximo passo nunca é único — há uma saída alternativa.

**Prioridade:** P1

**Esforço:** Baixo

---

### 21.4 Tom: humano, não técnico

**Estado atual:** Códigos de erro ou mensagens genéricas.

**Problema:** Linguagem técnica cria distanciamento. Empresário sente que está lidando com uma máquina.

**Nota:** 4/10

**Recomendação:** Toda mensagem de erro é em primeira pessoa da IA: "Não consegui processar. Desculpa — acho que me perdi no meio de tantos dados. Pode repetir?" Mantendo o tom Consultor Sênior, sem ser apologético demais.

**Prioridade:** P1

**Esforço:** Baixo

---

## 22. ESTADOS DE SUCESSO

### 22.1 Devem gerar satisfação: "Oba, deu certo!"

**Estado atual:** Confirmação de ação bem-sucedida: badge ✓ + card. Eficiente, mas sem emoção.

**Problema:** A satisfação de uma descoberta ou conclusão não é celebrada visualmente. O momento passa sem destaque.

**Nota:** 5/10

**Recomendação:** Microcelebração: badge ✓ com animação de escala (0.8→1.0) + glow verde sutil (1s) + texto de confirmação da IA. Em momentos importantes (ex.: diagnóstico completo), celebrar mais: "Concluído. Agora conheço sua empresa. Quer ver o resumo?"

**Prioridade:** P2

**Esforço:** Baixo

---

### 22.2 Nunca euforia: sem fogos de artifício, sem exageros

**Estado atual:** Não há euforia — o problema é o oposto (falta de celebração).

**Problema:** N/A — evitar o extremo oposto ao implementar a recomendação acima.

**Nota:** 8/10 (bom — ainda não há euforia)

**Recomendação:** Manter. Nunca adicionar confetes, fogos, troféus ou qualquer elemento de gamificação lúdica. A celebração é sóbria: "Bom trabalho. Isso me ajuda a entender melhor seu negócio."

**Prioridade:** P2 (preventivo)

**Esforço:** N/A

---

### 22.3 Próximo passo: óbvio

**Estado atual:** Após sucesso (ex.: insight confirmado), a IA pergunta "O que mais?".

**Problema:** Vago. Empresário não sabe qual o melhor próximo passo.

**Nota:** 6/10

**Recomendação:** Sugerir um próximo passo específico: "Agora que confirmamos isso, que tal explorarmos como isso afeta sua margem?" O próximo passo é contextual e relevante.

**Prioridade:** P2

**Esforço:** Baixo

---

### 22.4 Tom: natural, não forçado

**Estado atual:** Tom do Consultor Sênior. Bom.

**Nota:** 7/10

**Recomendação:** Manter consistência. Celebrar sem exagerar. "Isso é relevante" em vez de "Incrível!".

**Prioridade:** P2

**Esforço:** Baixo

---

## 23. PERFORMANCE PERCEBIDA

### 23.1 Como parecer rápido mesmo quando o motor está processando

**Estado atual:** Enquanto o motor processa, o indicador de pensamento aparece. A interface espera a resposta.

**Problema:** O empresário sente a espera em tempo real. Não há técnica de "esconder" a latência.

**Nota:** 5/10

**Recomendação:** Implementar optimistic UI parcial: enquanto o motor processa, a interface já mostra um placeholder do resultado (ex.: card de insight com skeleton). Quando a resposta chega, o conteúdo substitui o placeholder com animação suave. A percepção é de processamento contínuo, não de espera vazia.

**Prioridade:** P1

**Esforço:** Alto

---

### 23.2 Técnicas: skeleton screens, loading progressivo, optimistic UI

**Estado atual:** Nenhuma dessas técnicas implementada.

**Problema:** Toda espera é "tela de loading" ou "spinner + texto". A interface não esconde latência.

**Nota:** 4/10

**Recomendação:** Implementar: skeleton screens para carregamento de dashboard/cards, loading progressivo para respostas longas (IA mostra o texto sendo gerado em tempo real), optimistic UI para ações do empresário.

**Prioridade:** P1

**Esforço:** Alto

---

### 23.3 Feedback imediato para qualquer ação (< 100ms)

**Estado atual:** Ações do empresário (clique, envio) têm feedback visual, mas algumas são bloqueantes (ex.: aguardar resposta do servidor para mostrar confirmação).

**Problema:** Qualquer feedback que dependa de rede >100ms quebra a sensação de fluidez.

**Nota:** 5/10

**Recomendação:** Toda ação do empresário deve ter feedback visual imediato (< 50ms) independente de resposta do servidor. O estado "ação recebida" é local, não depende de rede. A confirmação real (servidor) atualiza depois.

**Prioridade:** P1

**Esforço:** Médio

---

### 23.4 Priorizar paint da resposta antes de processamento completo

**Estado atual:** IA espera processamento completo para mostrar resposta.

**Problema:** Respostas longas demoram a aparecer. Empresário espera sem ver progresso.

**Nota:** 4/10

**Recomendação:** Implementar streaming de resposta. A IA começa a "digitar" assim que o primeiro token está disponível. O empresário vê a resposta sendo construída em tempo real. A percepção é de velocidade, mesmo que o processamento total demore.

**Prioridade:** P0

**Esforço:** Alto (requer streaming do motor)

---

## 24. ARQUITETURA EMOCIONAL

### 24.1 Confiança: em quais momentos é gerada ou perdida?

**Mapeamento:**

| Momento | Impacto | Estado atual |
|---------|---------|-------------|
| Primeira impressão | Gera ou quebra | **Perde** — landing genérica não gera confiança inicial |
| Primeira resposta da IA | Gera ou quebra | **Gera parcialmente** — resposta correta, mas genérica se não usar dados reais |
| Primeiro insight | Gera fortemente | **Gera** — momento de "uau" quando conecta pontos |
| Erro/fallback | Quebra | **Perde** — erro técnico quebra a confiança construída |
| Correção de hipótese | Gera (se bem feita) | **Gera parcialmente** — correção não é comunicada com destaque suficiente |
| Silêncio prolongado | Neutral ou quebra | **Neutro** — silêncio não é explicado, empresário pode achar que travou |

**Nota geral:** 5/10

**Recomendação:** Reforçar momentos de geração de confiança (primeiro insight com destaque, correções transparentes) e eliminar momentos de perda (erro técnico, landing genérica, silêncio não explicado).

**Prioridade:** P0

---

### 24.2 Curiosidade: em quais momentos é despertada ou morta?

**Mapeamento:**

| Momento | Impacto | Estado atual |
|---------|---------|-------------|
| Tagline da landing | Desperta ou não | **Não desperta** — genérica |
| Primeira pergunta da IA | Desperta | **Desperta** — pergunta contextualizada |
| Resumo parcial | Desperta (se provocativo) | **Não desperta** — é informativo, não provocativo |
| Estados vazios | Mata | **Matam** — "nada aqui" em vez de "o que está escondido?" |
| Loading | Mata ou desperta | **Mata** — spinner + texto técnico |
| Sugestões da IA | Despertam | **Despertam parcialmente** — sugestões existem mas são genéricas |

**Nota geral:** 5/10

**Recomendação:** Transformar momentos que matam curiosidade em momentos que despertam. Estados vazios viram "mistérios a desvendar". Loading vira "antecipação". Sugestões viram "provocações".

**Prioridade:** P1

---

### 24.3 Segurança: em quais momentos o empresário se sente seguro?

**Mapeamento:**

| Momento | Impacto | Estado atual |
|---------|---------|-------------|
| Login | Segurança ou insegurança | **Seguro** — padrão de login |
| Compartilhamento de dados | Insegurança | **Inseguro** — não há explicação de como os dados serão usados |
| Confirmação de hipótese | Segurança | **Seguro** — IA valida |
| Visualização de dados financeiros | Insegurança | **Inseguro** — dados sensíveis expostos sem contexto de segurança |
| Erro | Insegurança | **Muito inseguro** — erro técnico + sem solução clara |

**Nota geral:** 5/10

**Recomendação:** Adicionar microexplicações de segurança nos momentos de maior sensibilidade. "Seus dados financeiros são usados apenas para gerar insights. Nada é compartilhado." Sempre que o empresário compartilha dado sensível, a IA reconhece e tranquiliza.

**Prioridade:** P1

---

### 24.4 Controle: em quais momentos ele perde o controle?

**Mapeamento:**

| Momento | Impacto | Estado atual |
|---------|---------|-------------|
| IA faz pergunta confrontadora | Perde controle | **Perde** — empresário pode não querer responder |
| IA processa por muito tempo | Perde controle | **Perde** — não pode interromper |
| Sugestões da IA | Ganha controle | **Ganha parcialmente** — sugestões são boas, mas se erradas, frustram |
| Fluxo de diagnóstico linear | Perde controle | **Perde** — não pode pular perguntas ou mudar de tema |

**Nota geral:** 4/10

**Recomendação:** O empresário nunca deve perder o controle. Toda pergunta deve ter opção de "Pular" ou "Não quero responder agora". Processamento longo deve ter botão de "Cancelar e resumir". Diagnóstico deve permitir navegação não-linear.

**Prioridade:** P0

---

### 24.5 Descoberta: em quais momentos ele aprende algo novo?

**Mapeamento:**

| Momento | Impacto | Estado atual |
|---------|---------|-------------|
| Primeiro insight | Alta descoberta | **Aprendizado alto** — conecta pontos |
| Insights subsequentes | Média descoberta | **Aprendizado médio** — podem ser repetitivos |
| Resumo parcial | Baixa descoberta | **Aprendizado baixo** — apenas consolida o que já sabe |
| Dashboard | Baixa descoberta | **Aprendizado baixo** — informacional, não revelador |
| Mapa Cognitivo | Média descoberta | **Aprendizado médio** — mostra conexões, mas empresário precisa explorar |

**Nota geral:** 6/10

**Recomendação:** Garantir que cada sessão tenha pelo menos uma descoberta genuína. Se não há insight novo, a IA diz: "Não descobri nada novo hoje. Mas estou observando — se algo mudar, te conto." A descoberta é o produto; cada sessão sem descoberta é uma sessão perdida.

**Prioridade:** P0

---

### 24.6 Alívio: em quais momentos ele relaxa?

**Mapeamento:**

| Momento | Impacto | Estado atual |
|---------|---------|-------------|
| Diagnóstico completo | Alívio | **Alívio parcial** — concluiu, mas o resumo pode gerar ansiedade (lacunas, cobertura baixa) |
| Insight confirmado | Alívio | **Alívio** — "faz sentido" |
| IA entende resposta ambígua | Alívio | **Alívio parcial** — acontece, mas sem destaque |
| Erro recuperado | Alívio | **Não há alívio** — erro é stress, recuperação não é celebrada |

**Nota geral:** 5/10

**Recomendação:** Celebrar momentos de conclusão com alívio, não com mais ação. "Pronto. Já mapeamos sua empresa. Respire — o diagnóstico está completo." Entre uma etapa e outra, a IA pode oferecer pausas narrativas.

**Prioridade:** P2

---

### 24.7 Orgulho: em quais momentos ele se sente capaz?

**Mapeamento:**

| Momento | Impacto | Estado atual |
|---------|---------|-------------|
| Insight compreendido | Orgulho | **Orgulho parcial** — IA entrega, empresário apenas recebe |
| Empresário corrige IA | Orgulho | **Orgulho** — "eu sabia algo que a IA não sabia" |
| Confirmação de hipótese | Orgulho | **Orgulho parcial** — validação positiva |
| Decisão baseada em insight | Orgulho | **Potencial não explorado** — IA não pergunta "e aí, tomou alguma decisão com isso?" |

**Nota geral:** 5/10

**Recomendação:** Orgulho vem de agência, não de recebimento. O empresário precisa sentir que ele é parte da descoberta, não apenas espectador. "Você me ajudou a conectar esses pontos" em vez de "Eu descobri isso." O crédito é compartilhado.

**Prioridade:** P1

---

## MAPA EMOCIONAL COMPLETO DA JORNADA

| Fase da Jornada | Emoção alvo | Emoção atual | Gap | Correção |
|----------------|-------------|-------------|-----|---------|
| Landing (0-15s) | Curiosidade | Indiferença | 💀 | Landing com demonstração de inteligência |
| Primeira pergunta | Curiosidade | Curiosidade | ✅ | Manter |
| Primeiro insight | Descoberta + Confiança | Descoberta | 🔶 | Reforçar confiança com badge + explicação |
| Diagnóstico (meio) | Controle | Ansiedade | 💀 | Adicionar opção de pular/pausar perguntas |
| Resumo parcial | Orgulho | Indiferença | 💀 | "Você já mapeou X%" em tom de conquista |
| Diagnóstico completo | Alívio + Orgulho | Alívio parcial | 🔶 | Celebrar conclusão, provocar próximo passo |
| Dashboard | Confiança | Ansiedade | 💀 | Métricas de progresso, não de déficit |
| Erro | Segurança | Medo | 💀 | Erro humano + solução clara |
| Sucesso | Satisfação | Neutro | 🔶 | Microcelebração sem euforia |
| Retorno (2ª sessão) | Antecipação | Confusão | 💀 | "Bem-vindo de volta. Na última visita descobrimos X. Hoje podemos explorar Y." |
| Pós-diagnóstico | Confiança | Abandono | 💀 | IA proativa: notas, sugestões, monitoramento |

**Nota emocional geral:** **4.8/10** — a jornada atual gera mais ansiedade e indiferença do que curiosidade, confiança e orgulho.

---

## PLANO DE CORREÇÃO EMOCIONAL POR PRIORIDADE

| Prioridade | Emoção | Ação |
|-----------|--------|------|
| P0 | Controle | Adicionar "Pular", "Não quero responder", "Cancelar" em todo fluxo linear |
| P0 | Curiosidade | Landing + estados vazios transformados em provocação |
| P0 | Confiança | Eliminar erro técnico da interface; erro humano + solução |
| P0 | Descoberta | Garantir 1 descoberta genuína por sessão; streaming de resposta |
| P1 | Orgulho | Crédito compartilhado nas descobertas; empresário é coautor |
| P1 | Segurança | Explicação de privacidade em momentos sensíveis |
| P1 | Ansiedade | Métricas de progresso em vez de déficit; loading narrativo |
| P2 | Alívio | Pausas narrativas; celebração de conclusão sem pressa |
| P2 | Antecipação | Retorno personalizado com contexto da sessão anterior |

---

*Documento 2 de 3 — Programa 27: Polimento e Elegância.*
*Próximo documento: AUDITORIA_DE_ELEGANCIA.md (Checklist final de elegância com 30+ itens)*
