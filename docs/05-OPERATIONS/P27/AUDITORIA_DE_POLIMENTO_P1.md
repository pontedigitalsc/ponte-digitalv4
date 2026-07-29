# AUDITORIA DE POLIMENTO — P1: Interface, Fluxos e Percepção

**Programa 27 — Polimento e Elegância | 26/07/2026**

> Auditoria itemizada dos primeiros 15 domínios de experiência. Cada item recebe nota 0-10, recomendação de polimento e prioridade. Este documento cobre a experiência da primeira impressão até a base visual do produto.

---

## 1. LANDING

### 1.1 Primeira impressão: o que o visitante vê/sente nos primeiros 3s

**Estado atual:** Tela de login com logo, tagline, formulário de email/senha, link "Conhecer a Ponte". Fundo limpo, paleta escura.

**Problema:** A primeira impressão é de um SaaS genérico. Logo + formulário de login. Nada comunica inteligência, descoberta ou diferenciação. O visitante vê um formulário — não vê valor.

**Nota:** 4/10

**Recomendação:** Substituir o formulário de login por uma experiência de apresentação. O visitante deve ver um elemento de inteligência em ação antes de qualquer cadastro: um diagnóstico simulado, um mapa cognitivo animado, ou uma demonstração de insight. O login fica em segundo plano ou é substituído por um fluxo de "experimentar primeiro, cadastrar depois".

**Prioridade:** P0

**Esforço:** Médio (componente novo de apresentação, reordenação do fluxo de entrada)

---

### 1.2 Tempo até entender o produto (< 5s)

**Estado atual:** O visitante não entende o que a Ponte faz nos primeiros 5 segundos. Vê um formulário de login e uma tagline. Precisa ler ou clicar em "Conhecer" para descobrir.

**Problema:** A janela de atenção é perdida. Sem contexto imediato, o visitante pode assumir que é mais um SaaS de relatórios ou dashboard.

**Nota:** 3/10

**Recomendação:** A tagline + um elemento visual dinâmico (ex.: um insight sendo gerado em tempo real, animado) devem comunicar o propósito em <3s. Texto de apoio curto: "A inteligência que conhece sua empresa melhor que qualquer relatório."

**Prioridade:** P0

**Esforço:** Baixo (ajuste de copy + componente visual)

---

### 1.3 Tempo até clicar (< 15s)

**Estado atual:** O visitante precisa decidir entre "Entrar" (se já tem conta) ou "Conhecer a Ponte" (se é novo). A ação primária não é óbvia para novos visitantes.

**Problema:** Visitantes novos hesitam. "Conhecer" é vago. Não há um CTA claro de "Experimentar" ou "Ver diagnóstico".

**Nota:** 5/10

**Recomendação:** CTA primário único para novos visitantes: "Ver o que a Ponte descobre sobre sua empresa" → leva a uma demonstração interativa. Login fica como link secundário.

**Prioridade:** P1

**Esforço:** Baixo (reordenação de botões + nova rota de demonstração)

---

### 1.4 Mensagem: tagline comunica inteligência ou é genérica?

**Estado atual:** Tagline atual — "A inteligência da sua empresa".

**Problema:** Comunicativa, mas ainda genérica. "Inteligência" é termo desgastado. Não diferencia a Ponte de chatbots, IAs generativas ou ferramentas de BI que se autodenominam "inteligentes".

**Nota:** 6/10

**Recomendação:** Testar alternativas que comuniquem descoberta, não apenas inteligência: "A inteligência que revela o que seus dados escondem", "Seus dados têm uma história. A Ponte conta." Manter essência, aumentar especificidade.

**Prioridade:** P1

**Esforço:** Baixo (copy)

---

### 1.5 Hierarquia visual: o que atrai o olhar primeiro, segundo, terceiro?

**Estado atual:** Logo → formulário → link "Conhecer".

**Problema:** O formulário atrai primeiro, mas para novos visitantes ele é irrelevante. A hierarquia prioriza login sobre valor.

**Nota:** 4/10

**Recomendação:** Reordenar para: (1) elemento visual que demonstra inteligência/descoberta, (2) tagline ou texto de valor, (3) CTA de experimentar. Login fica no final ou em um canto.

**Prioridade:** P0

**Esforço:** Médio (redesign da landing)

---

### 1.6 CTA: é óbvio o que fazer?

**Estado atual:** Dois caminhos: "Entrar" e "Conhecer a Ponte". Nenhum claramente dominante.

**Problema:** Visitantes novos não sabem se devem "Conhecer" (o que significa?) ou ignorar e tentar "Entrar".

**Nota:** 4/10

**Recomendação:** CTA único e inconfundível: "Começar diagnóstico gratuito" ou "Descobrir insights da minha empresa". Secundário: "Já tenho conta → Entrar".

**Prioridade:** P0

**Esforço:** Baixo

---

### 1.7 Emoção: transmite confiança, curiosidade ou indiferença?

**Estado atual:** Indiferença. A tela é limpa, mas fria. Não provoca curiosidade, não gera confiança além da aparência profissional.

**Problema:** A primeira emoção é burocrática ("preciso fazer login") em vez de curiosa ("o que isso vai me mostrar?").

**Nota:** 3/10

**Recomendação:** Injetar um elemento de curiosidade na primeira tela: um insight real, um dado surpreendente, uma pergunta provocativa. A landing precisa gerar "o que é isso?" em vez de "mais um login".

**Prioridade:** P0

**Esforço:** Médio

---

## 2. DIAGNÓSTICO (a conversa)

### 2.1 Cada pergunta é clara e necessária?

**Estado atual:** Perguntas do diagnóstico seguem roteiro linear. Cada pergunta aborda uma área de conhecimento.

**Problema:** Empresário pode não entender por que está sendo perguntado algo. A conexão entre pergunta e objetivo final (insight) não é transparente.

**Nota:** 6/10

**Recomendação:** Antes de cada bloco de perguntas, a IA contextualiza: "Para entender sua operação, preciso saber como funciona seu processo de entregas." A pergunta nunca vem sem contexto.

**Prioridade:** P1

**Esforço:** Baixo (ajuste nos prompts da IA)

---

### 2.2 Cada pausa tem duração correta?

**Estado atual:** Pausas implementadas com timing fixo (~1s entre perguntas).

**Problema:** Pausas uniformes ignoram a complexidade percebida. Perguntas simples têm a mesma pausa que perguntas complexas, o que soa artificial.

**Nota:** 5/10

**Recomendação:** Implementar cadência variável conforme complexidade: perguntas objetivas (0.5s), perguntas reflexivas (2-3s), perguntas confrontadoras (3-5s). A pausa comunica "estou pensando no que você disse".

**Prioridade:** P1

**Esforço:** Médio (lógica de timing no frontend)

---

### 2.3 Cada animação comunica o estado da IA?

**Estado atual:** Indicador de pensamento com pontos pulsantes e texto dinâmico. Presente, mas genérico.

**Problema:** O texto dinâmico ("Relacionando informações...") é bom, mas a animação visual não varia conforme a fase real do processamento. O empresário não consegue distinguir "estou processando dados" de "estou formulando hipótese".

**Nota:** 6/10

**Recomendação:** Mapear visualmente as fases do pipeline motor em tempo real. Cada fase (Escuta, Correlação, Hipótese, Validação) tem expressão visual distinta. Pequeno badge no canto do indicador: "Correlacionando", "Validando", etc. O Mapa Cognitivo reage em paralelo.

**Prioridade:** P1

**Esforço:** Alto (requer integração com estado do pipeline motor)

---

### 2.4 Cada transição é suave e com propósito?

**Estado atual:** Transições fade+slide implementadas, mas o timing é genérico (300ms para tudo).

**Problema:** Transições não são diferenciadas por conteúdo. Um insight (deveria ser mais lento, dramático) usa a mesma transição que uma pergunta simples (deveria ser rápido).

**Nota:** 7/10

**Recomendação:** Diferenciar transições por tipo de conteúdo. Insistir na tabela do MANUAL_DE_TRANSICOES (P23): insight = 600ms ease-out com destaque; pergunta = 300ms ease-out; confirmação = 200ms.

**Prioridade:** P2

**Esforço:** Baixo (ajuste de constantes de animação)

---

### 2.5 Cada mensagem da IA é relevante e bem escrita?

**Estado atual:** Mensagens seguem o tom "Consultor Sênior" definido no P23.

**Problema:** Mensagens são corretas, mas algumas ainda são longas demais. O empresário precisa ler parágrafos para obter o ponto.

**Nota:** 7/10

**Recomendação:** Aplicar a regra do P23 estritamente: primeira resposta curta (<100 caracteres), depois expande. Toda mensagem deve conter algo que o empresário não pediu (princípio 3.1 do Manifesto).

**Prioridade:** P1

**Esforço:** Baixo (revisão de copy nos templates)

---

### 2.6 Cada insight aparece com o destaque correto?

**Estado atual:** Insight tem ícone ✦ e destaque de 3 segundos.

**Problema:** O destaque é sempre o mesmo, independente da confiança ou relevância do insight. Um insight de confiança 85% tem o mesmo tratamento visual que um de 45%.

**Nota:** 6/10

**Recomendação:** Escalar o destaque conforme confiança: confiança alta (✦ + glow + 3s + card no mapa), confiança média (✦ sem glow + 1.5s), confiança baixa (apenas badge "Descoberta", sem destaque).

**Prioridade:** P1

**Esforço:** Médio (lógica de intensidade de destaque)

---

### 2.7 Cada explicação é na medida certa?

**Estado atual:** Explicações tendem ao excesso — a IA explica demais conceitos que o empresário já conhece.

**Problema:** Empresário experiente sente que a IA está sendo paternalista. Empresário iniciante pode sentir falta de explicação em outros momentos.

**Nota:** 6/10

**Recomendação:** Adaptar profundidade da explicação ao perfil do empresário (inferido por comportamento). Perfil "analítico" recebe explicações mais curtas; perfil "iniciante" recebe mais contexto. A IA pergunta "Quer que eu aprofunde?" em vez de presumir.

**Prioridade:** P1

**Esforço:** Alto (requer lógica de perfil + adaptação dinâmica)

---

### 2.8 Cada silêncio é produtivo (não desconfortável)?

**Estado atual:** Após resposta do empresário, há uma pausa de processamento. Se a pausa excede 3s, o texto do loading muda.

**Problema:** Empresário não sabe se a IA está processando, travou ou terminou de pensar. A ausência de microf feedback de transição (de "processando" para "vou responder") deixa um vácuo.

**Nota:** 5/10

**Recomendação:** Adicionar microf feedback de transição. Quando a IA termina de processar, os pontos de pensamento desaparecem com fade (200ms) e o início da digitação aparece instantaneamente. O empresário nunca fica sem saber se a IA está ativa.

**Prioridade:** P1

**Esforço:** Médio

---

## 3. RESUMO

### 3.1 Como aparece: animação de entrada é adequada?

**Estado atual:** Resumo parcial aparece com card expandindo de cima (scale Y 0→1, 700ms).

**Problema:** A animação é funcional, mas não comunica "momento importante". O resumo é um marco da conversa, mas a entrada é tratada como uma transição qualquer.

**Nota:** 6/10

**Recomendação:** Tratar o resumo como um micro-momento de revelação. Animação em cascata: IA pausa (500ms) → "Deixa eu consolidar o que sei" (texto datilografado, 1s) → resumo aparece em fade+slide com itens surgindo sequencialmente (200ms entre cada). O resumo precisa parecer uma conquista.

**Prioridade:** P2

**Esforço:** Médio

---

### 3.2 Como é lido: hierarquia facilita escaneamento?

**Estado atual:** Resumo lista áreas mapeadas, insights gerados, gargalos identificados em formato de lista.

**Problema:** Itens têm peso visual similar. O insight mais importante não se destaca. O empresário precisa ler tudo para encontrar o que importa.

**Nota:** 5/10

**Recomendação:** Hierarquia visual: (1) insight principal em destaque (card maior, cor de acento), (2) insights secundários em cards menores, (3) métricas (cobertura, confiança) em formato compacto. O olho deve ser guiado ao insight mais relevante primeiro.

**Prioridade:** P1

**Esforço:** Médio (redesign do componente de resumo)

---

### 3.3 Como emociona: gera vontade de continuar?

**Estado atual:** Resumo termina com botão "Continuar análise". Funcional, mas frio.

**Problema:** O resumo não gera antecipação. O empresário vê o que já foi descoberto, mas não sente curiosidade sobre o que ainda pode ser descoberto.

**Nota:** 5/10

**Recomendação:** O resumo deve terminar com uma provocação: "Já descobri 3 coisas importantes. Mas ainda tem uma área que não explorei: sua operação. Quer ver o que está escondido lá?" O CTA não é "Continuar" — é "Descobrir o próximo insight".

**Prioridade:** P2

**Esforço:** Baixo (copy + lógica de sugestão)

---

### 3.4 Como demonstra inteligência: conexões são visíveis?

**Estado atual:** Resumo mostra itens isolados. "3 áreas mapeadas", "2 insights". As conexões entre eles não são visíveis.

**Problema:** O empresário vê o que foi descoberto, mas não vê como as descobertas se relacionam. A inteligência está nos resultados, não nas conexões.

**Nota:** 4/10

**Recomendação:** Adicionar linhas de conexão visual entre insights relacionados no resumo. "Seu financeiro mostrou X, que se conecta com Y na operação." O resumo é um mini-mapa cognitivo, não uma lista de itens.

**Prioridade:** P1

**Esforço:** Alto (requer componente visual de conexões)

---

### 3.5 Como gera ação: próximo passo é óbvio?

**Estado atual:** "Continuar análise" ou "Ver dashboard parcial". Duas opções.

**Problema:** O empresário pode não saber qual escolher. "Dashboard parcial" é vago. Não há recomendação clara.

**Nota:** 6/10

**Recomendação:** Uma única ação recomendada: "A próxima área mais promissora é [Operação]. Vamos explorar?" com justificativa. A segunda opção (ir para dashboard) existe mas é secundária.

**Prioridade:** P2

**Esforço:** Baixo

---

## 4. CRIAÇÃO DE CONTA

### 4.1 Existe sensação burocrática?

**Estado atual:** Fluxo de cadastro com email, senha, nome da empresa, telefone.

**Problema:** Sensação de formulário. O empresário quer ver valor, não preencher campos.

**Nota:** 5/10

**Recomendação:** Eliminar cadastro tradicional. Substituir por: email + senha apenas. Demais dados são solicitados pela IA durante a conversa, com contexto e justificativa ("Para entender seu negócio, qual o nome da sua empresa?" em vez de campo obrigatório sem explicação).

**Prioridade:** P0

**Esforço:** Médio (refatoração do fluxo de cadastro)

---

### 4.2 Quantos campos? (ideal: ≤ 3)

**Estado atual:** 4 campos (email, senha, empresa, telefone).

**Problema:** Um campo acima do ideal. Empresa e telefone podem ser solicitados pela IA depois.

**Nota:** 6/10

**Recomendação:** Reduzir para 2 campos: email + senha. Empresa e telefone são coletados na conversa, contextualmente. Se empresa for necessária para personalizar a experiência inicial, usar domain do email para inferir.

**Prioridade:** P1

**Esforço:** Baixo

---

### 4.3 Há explicação do porquê cada campo é necessário?

**Estado atual:** Nenhuma explicação. Campos aparecem sem contexto.

**Problema:** Empresário não sabe por que está sendo solicitado telefone. Gera desconfiança.

**Nota:** 3/10

**Recomendação:** Cada campo deve ter uma justificativa visível: "Precisamos do seu email para enviar seus insights", "A senha protege seus dados". Telefone deve ser opcional com explicação: "Para recuperação de conta (opcional)". Melhor: remover campos que precisam de explicação.

**Prioridade:** P1

**Esforço:** Baixo

---

### 4.4 A transição de "criou conta" para "começar" é fluida?

**Estado atual:** Cadastro → tela de confirmação → botão "Começar" → carregamento → diagnóstico.

**Problema:** Telas intermediárias quebram o momentum. O empresário criou conta, agora precisa esperar e clicar novamente.

**Nota:** 5/10

**Recomendação:** Transição direta: cadastro → IA já aparece com saudação personalizada. Sem tela de confirmação. Sem "conta criada com sucesso". O diagnóstico começa imediatamente. A sensação é de que criar conta e começar são o mesmo ato.

**Prioridade:** P1

**Esforço:** Médio (refatoração do fluxo pós-cadastro)

---

## 5. DASHBOARD

### 5.1 Existe excesso de informação?

**Estado atual:** Dashboard com cards de cobertura, confiança, insights recentes, lacunas, áreas mapeadas.

**Problema:** Muita informação competindo por atenção. O olho não sabe para onde ir.

**Nota:** 4/10

**Recomendação:** Aplicar o princípio de "uma coisa principal por tela". O dashboard deve ter um elemento dominante (ex.: "Seu próximo insight") e os demais elementos em hierarquia decrescente. Cortar cards que não são acionáveis.

**Prioridade:** P1

**Esforço:** Médio (redesign do layout do dashboard)

---

### 5.2 Existe ruído visual?

**Estado atual:** Cards com bordas, badges de confiança (verde/amarelo/cinza), indicadores de progresso, múltiplas cores.

**Problema:** O sistema de cores do P23 (confiança, áreas, estados) sobrecarrega a tela quando aplicado simultaneamente.

**Nota:** 5/10

**Recomendação:** Reduzir a paleta ativa no dashboard para 2 cores + neutro. Badges de confiança aparecem apenas no hover ou em cards específicos, não em todos os elementos simultaneamente. O fundo deve ser predominantemente neutro.

**Prioridade:** P1

**Esforço:** Médio

---

### 5.3 Existe ansiedade (muitos números, alerts)?

**Estado atual:** Indicadores numéricos (cobertura: 45%, confiança: 62%, insights: 3, lacunas: 5).

**Problema:** Números baixos (cobertura 45%, lacunas 5) geram ansiedade, não motivação. O empresário se sente atrasado.

**Nota:** 5/10

**Recomendação:** Substituir métricas de "falta" por métricas de "progresso". "45% de cobertura" → "Você já mapeou quase metade da sua empresa". "5 lacunas" → "5 áreas com potencial de descoberta". O tom do dashboard é de conquista, não de déficit.

**Prioridade:** P1

**Esforço:** Baixo (copy + lógica de apresentação)

---

### 5.4 Existe foco: o empresário sabe para onde olhar?

**Estado atual:** Múltiplos cards de mesmo peso. Sem elemento dominante.

**Problema:** Empresário chega no dashboard e não tem um ponto de partida claro.

**Nota:** 4/10

**Recomendação:** O dashboard deve ter UM elemento principal: "Seu próximo passo" ou "Insight do dia". Esse elemento ocupa 40%+ da tela. Os demais são secundários, menores. O olhar deve ser guiado.

**Prioridade:** P0

**Esforço:** Médio

---

### 5.5 Existe ação clara: o que fazer agora?

**Estado atual:** Dashboard é principalmente informacional. O empresário precisa decidir o que fazer.

**Problema:** Informação sem ação gera paralisia. Empresário olha, não sabe se deve clicar em algo, continuar o diagnóstico ou explorar insights.

**Nota:** 3/10

**Recomendação:** Toda tela deve ter uma ação primária óbvia. O dashboard deve sugerir: "Continue o diagnóstico" ou "Explore o insight mais recente". Botão grande, visível, com justificativa: "Descobrir o que está por trás da sua queda de receita."

**Prioridade:** P0

**Esforço:** Baixo

---

## 6. SIDEBAR

### 6.1 Ordem atual segue módulos ou prioridade mental?

**Estado atual:** Sidebar lista: Diagnóstico, Dashboard, Insights, Mapa Cognitivo, Configurações.

**Problema:** Ordem segue módulos do sistema, não a prioridade mental do empresário. "Diagnóstico" vem primeiro, mas após o diagnóstico feito, o empresário quer "Insights" primeiro.

**Nota:** 6/10

**Recomendação:** Ordem dinâmica conforme estado do empresário. Primeira semana: (1) Continuar diagnóstico, (2) Insights, (3) Mapa, (4) Dashboard. Pós-diagnóstico: (1) Insights, (2) Decisões, (3) Mapa, (4) Dashboard. Configurações sempre ao final.

**Prioridade:** P2

**Esforço:** Médio (lógica de ordenação dinâmica)

---

### 6.2 Reorganizar por prioridade psicológica do empresário

**Estado atual:** Sidebar fixa, independente do estado do usuário.

**Problema:** Um empresário que já completou o diagnóstico ainda vê "Diagnóstico" como primeiro item. Irrelevante.

**Nota:** 5/10

**Recomendação:** Após diagnóstico completo, substituir "Diagnóstico" por "Novas descobertas" ou "Próximas ações". A sidebar reflete o estado atual da relação, não a estrutura do sistema.

**Prioridade:** P2

**Esforço:** Médio

---

### 6.3 O que deve vir primeiro? (visão geral → descobertas → ações → configurações)

**Estado atual:** Diagnóstico → Dashboard → Insights → Mapa → Configurações.

**Ordem proposta:** Visão Geral (dashboard resumido) → Descobertas (insights + novo) → Ações (decisões) → Explorar (mapa) → Configurações.

**Nota atual:** 5/10

**Prioridade:** P2

**Esforço:** Médio

---

## 7. CARDS (todos)

### 7.1 Peso visual: algum card domina sem merecer?

**Estado atual:** Cards de insight têm o mesmo peso que cards de métrica.

**Problema:** Um insight de alto valor compete visualmente com um card de "cobertura: 45%". A hierarquia de importância não é refletida visualmente.

**Nota:** 5/10

**Recomendação:** Cards devem ter peso visual proporcional à sua importância para o empresário. Insights em destaque: borda, sombra mais pronunciada, destaque de cor. Cards de métrica: minimalistas, sem borda, sem cor de fundo.

**Prioridade:** P1

**Esforço:** Médio

---

### 7.2 Espaçamento entre cards é consistente?

**Estado atual:** Espaçamento de 16px entre cards. Consistente na maioria das telas.

**Problema:** Em viewports intermediárias (tablet, 1024px), o espaçamento quebra devido a wrap. Cards ficam desalinhados.

**Nota:** 7/10

**Recomendação:** Grid responsivo com gap consistente (16px). Garantir que em todos os breakpoints o espaçamento se mantém. Usar CSS grid com gap, não margin individual.

**Prioridade:** P2

**Esforço:** Baixo

---

### 7.3 Sombras são sutis e consistentes?

**Estado atual:** Sombras implementadas, mas inconsistentes entre tipos de card. Cards de insight têm sombra diferente de cards de métrica.

**Problema:** Falta de um sistema de sombras. Alguns cards parecem "flutuar" mais que outros.

**Nota:** 6/10

**Recomendação:** Sistema de 3 níveis de sombra: nível 1 (elevação padrão, todos os cards), nível 2 (elevação média, card ativo/hover), nível 3 (elevação alta, modal/dialog). Aplicar consistentemente.

**Prioridade:** P2

**Esforço:** Baixo

---

### 7.4 Movimento de entrada é suave?

**Estado atual:** Cards aparecem com fade+slide, 400ms.

**Problema:** Quando múltiplos cards carregam (ex.: dashboard), a animação em cascata não está implementada. Todos aparecem ao mesmo tempo.

**Nota:** 5/10

**Recomendação:** Implementar animação em cascata (stagger). Cards aparecem em sequência com intervalo de 80ms entre cada. Ordem: mais importante primeiro. Duração: 300ms por card.

**Prioridade:** P2

**Esforço:** Baixo

---

### 7.5 Hierarquia entre cards é clara?

**Estado atual:** Todos os cards no mesmo grid, mesmo tamanho, mesmo tratamento visual.

**Problema:** Sem diferenciação hierárquica. O card de "Insight Crítico" parece igual ao card de "Dica".

**Nota:** 4/10

**Recomendação:** Implementar 3 níveis de card: primário (insight principal, destaque visual, largura 2x), secundário (insights menores, tamanho padrão), terciário (métrica, dica, compacto). A importância visual reflete a importância real.

**Prioridade:** P1

**Esforço:** Médio

---

## 8. ASSISTENTE

### 8.1 É percebido como presença ou como chat?

**Estado atual:** Interface de chat com campo de texto. IA responde em cards.

**Problema:** A interface se parece com um chat. O empresário trata como chat (pergunta-resposta) em vez de consultar uma inteligência.

**Nota:** 5/10

**Recomendação:** Romper visualmente com o formato de chat. A IA não está em "bolhas de mensagem". A conversa é uma narrativa visual contínua, não uma lista de mensagens. Remover campo "Digite sua mensagem" — substituir por "Pergunte à inteligência" ou sugestões contextuais.

**Prioridade:** P1

**Esforço:** Alto (redesign do componente de conversa)

---

### 8.2 Avatar/tag transmite personalidade?

**Estado atual:** IA sem avatar, sem nome, sem rosto. Apenas um badge "IA" ou "Ponte".

**Problema:** A ausência total de identidade visual pode tornar a IA impessoal demais. O P23 decidiu "sem avatar", mas precisa de alguma âncora visual para o empresário associar a voz.

**Nota:** 5/10

**Recomendação:** Manter decisão do P23 (sem rosto, sem nome, sem gênero). Mas adicionar um elemento visual de "presença": um símbolo animado (círculo com pulso luminoso, ou o logo da Ponte com glow) que aparece antes de cada fala. É presença sem personificação.

**Prioridade:** P1

**Esforço:** Médio

---

### 8.3 Tom de voz é consistente?

**Estado atual:** Tom "Consultor Sênior" — sóbrio, analítico, respeitoso.

**Problema:** Consistência geral boa, mas escorrega em momentos de erro (tom fica apologético) ou em momentos de sucesso (tom fica eufórico).

**Nota:** 7/10

**Recomendação:** Reforçar o tom consistente em todos os estados. Consultor Sênior não se desculpa excessivamente ("Peço desculpas pelo erro" → "Vou corrigir isso"). Também não comemora com euforia ("Incrível! Você conseguiu!" → "Esse é um avanço relevante.").

**Prioridade:** P2

**Esforço:** Baixo (revisão de copy)

---

### 8.4 Microfeedback de "ouvindo" existe?

**Estado atual:** Enquanto o empresário digita, não há indicador de que a IA está "ouvindo".

**Problema:** Empresário pode sentir que está falando sozinho. O campo de texto não comunica que a IA está atenta.

**Nota:** 4/10

**Recomendação:** Enquanto o empresário digita, o indicador de presença da IA (círculo pulsante) muda de estado: "Ouvindo..." ou uma leve animação de "escuta" (onda sonora sutil). O empresário sabe que a IA está prestando atenção.

**Prioridade:** P1

**Esforço:** Baixo

---

### 8.5 Transição entre fala e escuta é fluida?

**Estado atual:** Empresário termina de digitar → Enter → IA processa → IA responde.

**Problema:** Não há microf feedback entre o envio e o início do processamento. O card do empresário aparece, mas o indicador de "IA está processando" demora ~200ms para aparecer. Há um micro-buraco.

**Nota:** 6/10

**Recomendação:** Imediatamente após Enter (0ms), o indicador de "IA ouvindo" transiciona para "IA processando" sem intervalo. O badge "✓ Recebido" aparece ao mesmo tempo que o indicador de pensamento. Zero vácuo.

**Prioridade:** P2

**Esforço:** Baixo

---

## 9. CENTRO DE DECISÃO

### 9.1 Transmite segurança ou urgência?

**Estado atual:** Centro de Decisão apresenta opções com riscos associados.

**Problema:** O tom pode pender para urgência ("Você precisa decidir isso agora") em vez de segurança ("Aqui estão suas opções, analise com calma").

**Nota:** 6/10

**Recomendação:** O Centro de Decisão nunca deve pressionar. Timing é flexível: "Você pode decidir agora ou levar isso para pensar." A IA oferece contexto, não prazo.

**Prioridade:** P2

**Esforço:** Baixo (copy + lógica de timing)

---

### 9.2 As opções são claras?

**Estado atual:** Opções apresentadas como cards com título, descrição, risco, confiança.

**Problema:** Informação densa. Empresário pode se sentir sobrecarregado ao comparar múltiplas opções com múltiplos atributos.

**Nota:** 6/10

**Recomendação:** Simplificar: cada opção com um título (< 5 palavras), uma frase de impacto (< 15 palavras), e a confiança da IA. Detalhes ficam em expansão. O olho deve comparar opções em <3s.

**Prioridade:** P1

**Esforço:** Médio

---

### 9.3 O risco de cada decisão é comunicado?

**Estado atual:** Risco expresso como badge "Baixo", "Médio", "Alto".

**Problema:** Rótulos genéricos. "Risco médio" não comunica o que pode acontecer.

**Nota:** 5/10

**Recomendação:** Substituir badges genéricos por frases de consequência: "Pode reduzir margem em 2%", "Pode aumentar retenção em 15%". Risco é narrativa, não label.

**Prioridade:** P1

**Esforço:** Médio (exige dados do motor de decisão)

---

### 9.4 O empresário se sente no controle?

**Estado atual:** IA apresenta opções, empresário escolhe.

**Problema:** Empresário pode sentir que a IA está "empurrando" uma opção se a recomendação for muito destacada visualmente.

**Nota:** 7/10

**Recomendação:** A IA recomenda, mas não destaca visualmente a recomendação acima das outras. A recomendação é textual ("Minha recomendação é a Opção 2"), mas visualmente todas as opções têm o mesmo peso. O empresário decide.

**Prioridade:** P2

**Esforço:** Baixo

---

## 10. LOADING

### 10.1 Nunca parece espera vazia?

**Estado atual:** Loading com texto dinâmico ("Relacionando informações..."). Presente, mas o indicador visual principal ainda é um spinner circular.

**Problema:** Spinner + texto = ainda parece espera. O spinner é genérico e não comunica progresso.

**Nota:** 5/10

**Recomendação:** Substituir spinner por indicador de progresso real do pipeline. Se o motor tem 4 fases, mostrar em qual delas está. Barra de progresso sutil, não circular. Texto informativo alinhado à fase real.

**Prioridade:** P1

**Esforço:** Médio (integração com estado do pipeline)

---

### 10.2 Sempre parece trabalho inteligente?

**Estado atual:** Texto diz o que está sendo processado, mas nem sempre reflete o processamento real.

**Problema:** Se o texto diz "Analisando dados financeiros" mas o motor está fazendo outra coisa, a IA perde credibilidade.

**Nota:** 5/10

**Recomendação:** Mapear cada fase do pipeline motor para um texto público. Se o motor está na fase de embedding, o texto diz "Processando novos dados". Se está na fase de correlação, "Conectando informações". O loading é um reflexo honesto do processamento.

**Prioridade:** P1

**Esforço:** Alto (requer integração frontend ↔ motor)

---

### 10.3 O texto do loading é informativo?

**Estado atual:** "Relacionando informações...", "Construindo hipótese...", "Validando com dados públicos..."

**Problema:** São informativos, mas o empresário médio não sabe o que significam. "Construindo hipótese" é jargão técnico.

**Nota:** 6/10

**Recomendação:** Abaixar o jargão: "Estou ligando os pontos que você me deu...", "Deixa eu ver se faz sentido...", "Estou verificando com dados de mercado..." A linguagem é de raciocínio humano, não de pipeline técnico.

**Prioridade:** P1

**Esforço:** Baixo

---

### 10.4 A animação é agradável de ver?

**Estado atual:** Spinner circular + texto.

**Problema:** O spinner é visualmente pobre. Não há nada agradável ou interessante no loading.

**Nota:** 4/10

**Recomendação:** Substituir por uma animação que reflita inteligência: linhas de conexão sendo desenhadas (como o mapa cognitivo se formando), ou pontos de luz se conectando. O loading é visualmente bonito e temático.

**Prioridade:** P2

**Esforço:** Médio (animação CSS/SVG personalizada)

---

### 10.5 Fallback se exceder tempo existe?

**Estado atual:** Se a IA demora > 8s, o texto muda. Se > 15s, texto de "processamento complexo". Se > 30s, opção de continuar sem análise completa.

**Problema:** O fallback é puramente textual. Empresário pode não notar a mudança de texto.

**Nota:** 6/10

**Recomendação:** Além das mudanças textuais progressivas, adicionar mudança visual para cada threshold. Ex.: > 8s = animação desacelera, indicando "estou trabalhando ainda". > 15s = aparece opção "Quer continuar esperando ou prefere um resumo parcial?". A interface reage ativamente à demora.

**Prioridade:** P2

**Esforço:** Médio

---

## 11. MAPA COGNITIVO

### 11.1 Quando aparece: timing é correto?

**Estado atual:** Mapa aparece na sidebar direita após o login. Recolhido por padrão.

**Problema:** Empresário pode nunca expandir o mapa se não souber que existe. O P23 menciona tooltip, mas não está implementado.

**Nota:** 5/10

**Recomendação:** Mapa aparece pela primeira vez com tooltip + expansão automática sutil durante o primeiro insight. A IA menciona: "Estou montando um mapa mental da sua empresa (à direita)." O primeiro encontro com o mapa é guiado.

**Prioridade:** P1

**Esforço:** Baixo (tooltip + trigger de IA)

---

### 11.2 Quando desaparece: não some abruptamente?

**Estado atual:** Ao fechar/recolher, o mapa desliza para a direita (400ms).

**Problema:** A animação de recolher é suave, mas se o empresário troca de tela (ex.: navega para dashboard), o mapa some abruptamente.

**Nota:** 6/10

**Recomendação:** Garantir que transições de tela preservem o estado do mapa (aberto ou recolhido). Se o mapa estava aberto na conversa, ao voltar ele deve estar aberto. Estado preservado.

**Prioridade:** P2

**Esforço:** Baixo

---

### 11.3 Quanto ocupa na tela: proporção adequada?

**Estado atual:** Mapa expandido ocupa ~30% da largura (sidebar de 320px em desktop 1440px).

**Problema:** Em monitores menores (1366px, 1280px), 320px de sidebar + conversa central comprimem demais o conteúdo.

**Nota:** 6/10

**Recomendação:** Sidebar responsiva: 320px em telas >1440px, 280px em 1280-1440px, recolhida automaticamente em <1280px com indicador de "mapa disponível". O conteúdo nunca deve ser comprimido.

**Prioridade:** P2

**Esforço:** Baixo

---

### 11.4 Quando simplificar: versão reduzida existe?

**Estado atual:** Uma única versão do mapa.

**Problema:** Empresário em mobile ou em tela pequena recebe o mesmo mapa que em desktop. Sem adaptação.

**Nota:** 5/10

**Recomendação:** Duas versões: completa (desktop, com conexões, cards de hipótese, badges) e reduzida (mobile/telas pequenas, apenas áreas com indicadores de confiança, sem conexões visíveis). A versão reduzida expande ao toque.

**Prioridade:** P2

**Esforço:** Médio

---

## 12. MICROINTERAÇÕES

### 12.1 Hover: feedback em todos elementos clicáveis?

**Estado atual:** Botões têm hover. Cards não têm hover.

**Problema:** Cards que são clicáveis (ex.: card de insight que expande) não dão feedback de hover. Empresário não sabe que pode clicar.

**Nota:** 5/10

**Recomendação:** Todo elemento clicável deve ter hover: cards (leve elevação + sombra), badges (mudança de cor), links (underline ou opacidade). Se o cursor muda para pointer, o hover existe.

**Prioridade:** P1

**Esforço:** Baixo

---

### 12.2 Click: resposta tátil/visual em < 100ms?

**Estado atual:** Click tem feedback visual (mudança de estado), mas há latência perceptível em ações que disparam chamadas de API.

**Problema:** Click em botão que inicia processamento mostra feedback visual apenas após a resposta da API (~200-500ms). O usuário clica e nada acontece por 200ms.

**Nota:** 5/10

**Recomendação:** Implementar optimistic UI: ao clicar, o estado visual muda imediatamente (botão desabilitado + spinner ou feedback de "acionado"). O feedback visual é instantâneo (< 50ms). A resposta da API chega depois.

**Prioridade:** P1

**Esforço:** Médio (requer lógica de estado otimista no frontend)

---

### 12.3 Focus: indicador visível em todos inputs?

**Estado atual:** Campo de texto tem foco com borda 2px primary. Outros inputs (select, checkbox) não têm indicador de foco consistente.

**Problema:** Acessibilidade de foco incompleta. Navegação por teclado prejudicada.

**Nota:** 6/10

**Recomendação:** Garantir outline focus visível em todos os inputs, botões, links e elementos interativos. Usar estilo consistente: outline 2px primary + offset 2px. Não remover outline sem fornecer alternativa.

**Prioridade:** P1

**Esforço:** Baixo

---

### 12.4 Success: animação de confirmação?

**Estado atual:** Ação bem-sucedida (ex.: insight confirmado) tem badge "✓ Confirmado". Presente.

**Problema:** A animação de sucesso é apenas textual. Não há uma microcelebração visual que gere satisfação.

**Nota:** 6/10

**Recomendação:** Adicionar micro animação de sucesso: badge aparece com escala (0.8→1.0) + fade, leve glow verde por 1s, e o item afetado (ex.: card de hipótese) tem um leve "pulso" de confirmação.

**Prioridade:** P2

**Esforço:** Baixo

---

### 12.5 Error: mensagem clara + como corrigir?

**Estado atual:** Mensagens de erro técnicas ("Erro ao processar", "Timeout da API").

**Problema:** Mensagens são técnicas e não oferecem solução.

**Nota:** 4/10

**Recomendação:** Toda mensagem de erro deve ter: (1) o que aconteceu em linguagem humana, (2) por que aconteceu (se relevante), (3) o que o empresário pode fazer. Ex.: "Não consegui processar sua resposta agora. Pode tentar novamente?" em vez de "Erro 500".

**Prioridade:** P0

**Esforço:** Baixo

---

### 12.6 Confirmação: não assustadora?

**Estado atual:** Diálogos de confirmação padrão ("Tem certeza?" com botões Sim/Não).

**Problema:** O tom dos diálogos de confirmação pode parecer acusatório ou gerar hesitação desnecessária.

**Nota:** 6/10

**Recomendação:** Substituir "Tem certeza?" por "Entendi. Vou seguir com isso." com botão "Sim, continuar" e "Na verdade, quero revisar". A confirmação é um checkpoint, não uma barreira.

**Prioridade:** P2

**Esforço:** Baixo

---

## 13. PALETA

### 13.1 Contraste: texto sobre fundo atende WCAG AA?

**Estado atual:** Paleta escura com texto claro. Contraste parece adequado, mas não foi auditado formalmente.

**Problema:** Sem auditoria formal de contraste, não há garantia de acessibilidade. Cores de badge (amarelo sobre branco) podem falhar WCAG AA.

**Nota:** 5/10

**Recomendação:** Auditar toda a paleta contra WCAG AA (ratio ≥ 4.5:1 para texto normal, ≥ 3:1 para texto grande). Corrigir combinações que falham. Publicar tabela de contraste.

**Prioridade:** P1

**Esforço:** Médio (auditoria + ajustes de cor)

---

### 13.2 Respiração: cores não cansam?

**Estado atual:** Fundo escuro (#1a1a2e ou similar) com acentos verde, azul, âmbar.

**Problema:** A saturação dos acentos (especialmente verde e âmbar) pode cansar após uso prolongado. O fundo escuro reduz o problema, mas os acentos são intensos.

**Nota:** 6/10

**Recomendação:** Reduzir saturação dos acentos em 15-20%. Cores devem ser "sóbrias" como o tom da IA. Verde de insight: menos vibrante, mais elegante. Âmbar de alerta: mais próximo de ouro que de laranja.

**Prioridade:** P2

**Esforço:** Baixo (ajuste de tokens de cor)

---

### 13.3 Calma: tons não são agressivos?

**Estado atual:** Badges de erro podem usar vermelho (#DC2626). Badges de alerta usam âmbar.

**Problema:** Vermelho puro em erro é agressivo. O P23 definiu que nunca usar vermelho para confiança, mas para erro ainda usa.

**Nota:** 6/10

**Recomendação:** Substituir vermelho puro por tom mais elegante: bordô ou vermelho dessaturado (#B91C1C ou similar). Manter a semântica de erro sem a agressividade visual.

**Prioridade:** P2

**Esforço:** Baixo

---

### 13.4 Sofisticação: paleta parece premium?

**Estado atual:** Paleta escura com acentos. Parece sofisticada à primeira vista.

**Problema:** A paleta se assemelha a muitos dashboards modernos (fundo escuro + gradiente). Perde diferenciação.

**Nota:** 6/10

**Recomendação:** Introduzir um elemento de cor único e memorável (um tom de azul petróleo, um verde menta, ou um tom terroso) que se torne a "assinatura cromática" da Ponte. A paleta precisa ser reconhecível, não apenas bonita.

**Prioridade:** P2

**Esforço:** Baixo (pesquisa de cor de assinatura)

---

### 13.5 Elegância: cores funcionam em conjunto?

**Estado atual:** Múltiplos sistemas de cor convivendo: estados de confiança (verde/amarelo/cinza), áreas (5 cores), tipos de card (insight/métrica/alerta).

**Problema:** Poluição cromática. O empresário vê muitas cores na tela sem um sistema claro de semântica.

**Nota:** 5/10

**Recomendação:** Reduzir para 2 sistemas de cor no máximo: (1) confiança (verde/amarelo/cinza) e (2) um único acento para destaque. Áreas do conhecimento perdem cor própria (usam badges de texto, não cor de fundo). A paleta simplificada é mais elegante.

**Prioridade:** P1

**Esforço:** Médio (refatoração do sistema de cores)

---

## 14. TIPOGRAFIA

### 14.1 Hierarquia: títulos, subtítulos, corpo, label — claramente distinguíveis?

**Estado atual:** Hierarquia existe mas com diferenças sutis demais. Título (18px, 600) e subtítulo (16px, 500) são pouco distinguíveis.

**Problema:** A hierarquia tipográfica não guia o olhar de forma eficiente. Diferenças de 2px e 100 de peso são imperceptíveis.

**Nota:** 5/10

**Recomendação:** Reforçar a hierarquia: título (22px, 700), subtítulo (17px, 600), corpo (15px, 400), label (12px, 500), small (11px, 400). A diferença entre níveis deve ser visualmente óbvia.

**Prioridade:** P1

**Esforço:** Baixo

---

### 14.2 Peso: pesos corretos para cada nível?

**Estado atual:** Uso de 400 (regular) e 600 (semibold) majoritariamente. 700 (bold) raro.

**Problema:** A interface parece homogênea. Peso 400 para corpo é leve demais em monitores de baixa resolução.

**Nota:** 6/10

**Recomendação:** Usar peso 450 (medium) para corpo em vez de 400. Peso 700 para títulos e destaques importantes. Peso 600 para subtítulos. 400 para texto secundário apenas.

**Prioridade:** P2

**Esforço:** Baixo

---

### 14.3 Leitura: tamanho mínimo 16px para corpo?

**Estado atual:** Corpo da mensagem da IA em 16px. Bom. Mas labels e textos auxiliares em 12px, às vezes 11px.

**Problema:** 12px para labels é pequeno em mobile e para empresários com dificuldade de visão.

**Nota:** 6/10

**Recomendação:** Mínimo 14px para qualquer texto informativo. Labels podem ser 13px. Apenas timestamps e metadados (11px) são exceção. Corpo sempre ≥ 16px.

**Prioridade:** P1

**Esforço:** Baixo

---

### 14.4 Escaneabilidade: parágrafos curtos, listas, destaques?

**Estado atual:** Mensagens da IA são blocos de texto. Parágrafos de 2-4 linhas.

**Problema:** Empresário não escaneia — precisa ler. Mensagens longas são puladas.

**Nota:** 5/10

**Recomendação:** Máximo de 3 linhas por parágrafo. Usar listas com bullet points para múltiplos itens. Destacar a conclusão/síntese em negrito ou em card separado. O insight deve ser escaneável em 2 segundos.

**Prioridade:** P1

**Esforço:** Baixo (formatação das respostas no template)

---

## 15. ESPAÇAMENTOS

### 15.1 Sistema de ritmo: padding/margin seguem escala (4/8/12/16/24/32/48/64)?

**Estado atual:** Espaçamentos usam valores arbitrários. 6px, 10px, 14px, 15px existem no código.

**Problema:** Falta de um sistema de ritmo consistente. Espaçamentos quebram a harmonia visual e dificultam manutenção.

**Nota:** 4/10

**Recomendação:** Implementar escala de 8: 4, 8, 12, 16, 24, 32, 48, 64, 96. Eliminar todos os valores fora da escala. Mapear cada componente para tokens de espaçamento.

**Prioridade:** P1

**Esforço:** Alto (refatoração global de espaçamentos)

---

### 15.2 Margens: elementos não encostam?

**Estado atual:** Em geral, elementos não encostam. Mas em viewports extremos ou com conteúdo dinâmico, margens podem colapsar.

**Problema:** Cards em grid podem encostar verticalmente em resoluções específicas devido a quebra de linha.

**Nota:** 7/10

**Recomendação:** Usar gap em flexbox/grid em vez de margin para garantir consistência. Testar em todos os breakpoints.

**Prioridade:** P2

**Esforço:** Baixo

---

### 15.3 Respiração: existe espaço vazio suficiente?

**Estado atual:** Dashboard e conversa têm padding adequado (~24px das bordas). O Mapa Cognitivo expandido reduz o espaço do conteúdo central.

**Problema:** Quando o mapa está aberto, o espaço vazio central encolhe e o conteúdo fica apertado.

**Nota:** 6/10

**Recomendação:** Garantir que o conteúdo central nunca tenha menos que 480px de largura. Se o mapa + conteúdo central exceder a viewport, o mapa recolhe automaticamente.

**Prioridade:** P2

**Esforço:** Baixo

---

### 15.4 Densidade: não parece apertado nem esparso demais?

**Estado atual:** Densidade geral adequada no desktop. Em tablets, pode parecer esparso (muito espaço vazio). Em mobile, apertado.

**Problema:** A densidade não é adaptada por viewport. O conteúdo escala em largura, mas não em compactação.

**Nota:** 6/10

**Recomendação:** Adaptar densidade por breakpoint: desktop (espaçamento 24px, cards confortáveis), tablet (espaçamento 16px, cards ligeiramente mais compactos), mobile (espaçamento 12px, padding reduzido). A experiência não é simplesmente "responsiva" — é adaptativa em densidade.

**Prioridade:** P2

**Esforço:** Médio

---

## RESUMO DE PRIORIDADES

| Prioridade | Itens | Principais ações |
|-----------|-------|-----------------|
| P0 | 7 | Landing emocional, CTA único, ação clara no dashboard, foco visual, erro humano, cadastro sem burocracia |
| P1 | 35+ | Hierarquia visual, timing de respostas, loading honesto, hover/click feedback, paleta consistente, tipografia escaneável, sistema de espaçamento |
| P2 | 20+ | Animações em cascata, sidebar dinâmica, sombras consistentes, cores de assinatura, densidade adaptativa |

---

## NOTA GERAL DE POLIMENTO — PARTE 1

**Nota atual:** **5.3/10**

| Domínio | Nota | Pior item |
|---------|------|-----------|
| Landing | 4.1/10 | Primeira impressão genérica |
| Diagnóstico | 5.8/10 | Silêncio desconfortável |
| Resumo | 5.2/10 | Conexões invisíveis |
| Criação de Conta | 4.8/10 | Sensação burocrática |
| Dashboard | 4.2/10 | Falta de ação clara |
| Sidebar | 5.3/10 | Ordem não-psicológica |
| Cards | 5.4/10 | Hierarquia ausente |
| Assistente | 5.3/10 | Percebido como chat |
| Centro de Decisão | 6.0/10 | Risco genérico |
| Loading | 5.2/10 | Spinner genérico |
| Mapa Cognitivo | 5.5/10 | Timing de aparecimento |
| Microinterações | 5.3/10 | Click sem feedback imediato |
| Paleta | 5.6/10 | Poluição cromática |
| Tipografia | 5.5/10 | Hierarquia fraca |
| Espaçamentos | 5.4/10 | Falta de sistema de ritmo |

---

*Documento 1 de 3 — Programa 27: Polimento e Elegância.*
*Próximo documento: AUDITORIA_DE_POLIMENTO_P2.md (Animações, Mobile, Dark Mode, Performance, Arquitetura Emocional)*
