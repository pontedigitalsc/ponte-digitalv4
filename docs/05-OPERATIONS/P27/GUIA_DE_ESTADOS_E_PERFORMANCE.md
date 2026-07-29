# GUIA DE ESTADOS E PERFORMANCE

> Programa 27 — O Polimento da Empresa Zero
> Versão: 1.0 | Status: Aprovado

---

## Sumário

1. [Estados Vazios (Empty States)](#1-estados-vazios-empty-states)
2. [Estados de Erro](#2-estados-de-erro)
3. [Estados de Sucesso](#3-estados-de-sucesso)
4. [Dark Mode](#4-dark-mode)
5. [Performance Percebida](#5-performance-percebida)

---

## 1. Estados Vazios (Empty States)

### Princípios Gerais

- Todo estado vazio é uma oportunidade de onboarding, não um vazio.
- O empresário nunca deve sentir que "quebrou" ou "está errado".
- Cada estado vazio responde: "O que aparece aqui quando eu fizer X?"
- Tom: acolhedor, informativo, direcional.
- Toda tela vazia tem um CTA primário que preenche o estado.

---

### 1.1 Tela de Diagnóstico sem Sessões Anteriores

**O que o empresário vê:**
Layout centralizado com ilustração de uma prancheta limpa e um lápis ao lado. Texto principal e botão de ação.

**O que ele deve pensar:**
"Entendi, aqui aparecem os diagnósticos que eu já realizei. Assim que eu fizer o primeiro, ele fica salvo aqui."

**Mensagem:**
"Seu primeiro diagnóstico ainda não foi realizado. Ele aparecerá aqui assim que você completar a avaliação inicial da sua empresa."

**CTA Primário:**
"Realizar Primeiro Diagnóstico" — botão primário, leva ao fluxo de diagnóstico.

**CTA Secundário:**
"Entender como funciona" — link para mini-tutorial de 3 passos.

**Ilustração:**
Prancheta digital com checklist vazia, um traço de luz indicando "pronto para escrever". Estilo line art com uma cor de destaque (verde cognitivo). Sem personagens — o foco é a ação.

**Tom:**
"Está tudo pronto. Só falta você começar."

**Tratamento visual:**
- Espaçamento generoso (vertical padding de 120px+)
- Ilustração com opacidade 70%
- Texto em duas linhas no máximo
- Botão com padding confortável

---

### 1.2 Painel Cognitivo Vazio (Primeiro Uso)

**O que o empresário vê:**
Painel lateral direito com fundo levemente tonificado. No centro, uma silhueta de engrenagens com uma interrogação suave.

**O que ele deve pensar:**
"Aqui é onde a Ponte Digital vai me mostrar o que está aprendendo sobre minha empresa. No momento está vazio porque ainda não tenho dados."

**Mensagem:**
"Seu painel cognitivo está sendo preparado. Assim que você concluir o diagnóstico e registrar algumas observações, a Ponte Digital começará a mostrar padrões e conexões inteligentes aqui."

**Ação Sugerida:**
"Fazer Diagnóstico" — se não houver diagnóstico.
"Registrar Observação" — se já houver diagnóstico.

**Ilustração:**
Engrenagens leves com um ponto de interrogação no centro. Traços pontilhados saindo das engrenagens, sugerindo "conexões em formação". Cores em tom pastel suave.

**Tom:**
"A inteligência só funciona com dados. Quanto mais você usar, mais inteligente ela fica."

**Observação:**
O painel cognitivo nunca deve mostrar "nenhum dado disponível" ou mensagens genéricas de sistema. A mensagem deve sempre conectar a ação do empresário ao resultado.

---

### 1.3 Dashboard sem Dados

**O que o empresário vê:**
Dashboard com gráficos vazios (linhas basais no eixo X sem dados), indicadores mostrando "—" ou "0" com tratamento visual de "ainda não há dados".

**O que ele deve pensar:**
"O dashboard vai mostrar a evolução da minha empresa. No momento estou no ponto de partida."

**Mensagem:**
"Seu dashboard será preenchido automaticamente conforme você utiliza a plataforma. Cada diagnóstico, decisão e observação alimenta esses indicadores."

**Ação Sugerida:**
"Explorar o Diagnóstico" — leva ao diagnóstico.
"Ver Exemplo" — mostra um preview de como o dashboard fica com dados (modo demonstração).

**Ilustração:**
Gráfico de linha em esboço (tracejado fino, como planta arquitetônica), sugerindo "pronto para ser preenchido". Um ponto de luz no início da linha.

**Tom:**
"Todo gráfico começa com um ponto. O seu primeiro dado está a um clique."

**Tratamento visual:**
- Cards com borda tracejada (indicando "em formação")
- Placeholder com skeleton sutil
- Tooltip explicativo ao passar o mouse: "Este indicador será ativado após seu primeiro diagnóstico"

---

### 1.4 Histórico de Insights Vazio

**O que o empresário vê:**
Lista vazia com uma lâmpada desenhada em line art, com um brilho suave ao redor.

**O que ele deve pensar:**
"Aqui a Ponte Digital guarda os insights que ela gerou para mim. Quando eu começar a usar mais, ela vai começar a trazer insights relevantes."

**Mensagem:**
"Insights aparecerão aqui assim que a Ponte Digital identificar padrões relevantes no seu negócio. Quanto mais você alimentar a plataforma com dados e decisões, mais precisos serão os insights."

**Ação Sugerida:**
"Ativar Geração de Insights" — leva às configurações de insight.
"Registrar uma Observação" — alimenta o motor cognitivo.

**Ilustração:**
Lâmpada em wireframe com um leve brilho no centro. Linhas onduladas saindo da lâmpada (sugerindo "ideia emitida, mas ainda não capturada").

**Tom:**
"Insight bom precisa de contexto. Dê contexto à Ponte Digital que ela te devolve insight."

---

### 1.5 Centro de Decisão sem Decisões

**O que o empresário vê:**
Uma mesa de reunião vazia (ilustração) com uma cadeira na cabeceira. Botão proeminente "Registrar Primeira Decisão".

**O que ele deve pensar:**
"Aqui é onde minhas decisões estratégicas ficam registradas. Ainda não registrei nenhuma."

**Mensagem:**
"Toda decisão importante merece registro. Assim que você documentar sua primeira decisão, este centro se torna um histórico consultável do seu raciocínio estratégico."

**Ação Sugerida:**
"Registrar Primeira Decisão" — abre formulário de decisão.
"Entender o Valor" — mini explicação de 2 parágrafos sobre decisões registradas.

**Ilustração:**
Mesa de reunião vista de cima, com blocos de notas e canetas posicionados, mas sem conteúdo. Uma luz suave no centro da mesa.

**Tom:**
"Decisões não registradas são decisões perdidas. Comece hoje."

---

## 2. Estados de Erro

### Princípios Gerais

- Tom tranquilizador, nunca alarmista.
- Mensagem sem jargão técnico.
- Toda mensagem de erro contém: o que aconteceu, o que o empresário pode fazer, e um próximo passo.
- Visual com cores acolhedoras (não vermelho sangue).
- Auto-dismiss após ação do usuário ou 8 segundos para erros não críticos.
- Erro não é punição — é comunicação.

### Paleta de Erro

- Fundo: laranja queimado suave (#FFF3E0 ou equivalente dark)
- Borda: laranja médio
- Texto: marrom escuro
- Ícone: círculo informativo (não triângulo de alerta agressivo)
- NUNCA usar vermelho puro, exclamação tripla, ou termos como "FALHA", "ERRO", "INVÁLIDO"

---

### 2.1 Falha de Rede

**O que o empresário vê:**
Toast ou banner no topo com ícone de rede com um traço. Fundo laranja suave.

**Tom:** "Acontece. Vamos resolver."

**Mensagem:**
"Não foi possível conectar ao servidor. Sua internet pode estar instável. Seus dados estão salvos localmente e sincronizam quando a conexão voltar."

**Ação:**
Botão "Tentar Novamente" com retry automático em 15s.
Opção "Continuar Offline" — permite navegar com dados em cache.

**Visual:**
Ícone de ondas de rede com uma suave interrupção. Fundo em tom laranja acolhedor. Borda sutil.

**Duração:** Persiste até conexão restaurar ou usuário dismiss.

**Comportamento adicional:**
- Indicador de "modo offline" no header
- Dados locais marcados com "pendente de sincronização" (ícone de nuvem com seta)
- Ao reconectar, sincronização automática com toast breve "Dados sincronizados!"

---

### 2.2 Timeout do Motor Cognitivo

**O que o empresário vê:**
Card dentro da área de análise (não modal bloqueante). Ícone de ampulheta ou relógio.

**Tom:** "Estou pensando... deixe-me tentar de novo."

**Mensagem:**
"A análise está demorando mais que o esperado. Isso pode acontecer com perguntas muito complexas. Você pode tentar novamente ou reformular sua pergunta."

**Ação:**
Botão "Tentar Novamente" com o mesmo contexto.
Botão "Simplificar Pergunta" — abre sugestão de reformulação.

**Visual:**
Ícone de ampulheta com areia pela metade. Cor laranja suave. Sem tom de urgência.

**Duração:** Aparece após 15s de espera. Persiste até ação do usuário.

**Tratamento especial:**
- Se for segunda tentativa consecutiva: "A análise está encontrando dificuldades com esta pergunta específica. Sugiro reformular ou tentar mais tarde."
- Se for terceira ou mais: escalar para "Entraremos em contato para ajudar com esta análise. Enquanto isso, tente uma pergunta diferente."

---

### 2.3 Erro de Autenticação

**O que o empresário vê:**
Tela limpa (não abrupta). Ilustração de chave com um cadeado aberto.

**Tom:** "Sua segurança é prioridade."

**Mensagem:**
"Sua sessão expirou por segurança. Não se preocupe — seus dados estão preservados. Faça login novamente para continuar."

**Ação:**
Botão "Fazer Login" — leva ao fluxo de autenticação preservando o estado anterior.
Botão "Voltar ao Início" — leva à landing.

**Visual:**
Chave em line art. Cadeado aberto (não quebrado — a segurança funcionou). Fundo neutro e limpo.

**Duração:** Tela contínua. Não é toast — é redirect.

**Comportamento adicional:**
- Salvar rascunho antes de redirecionar (se aplicável)
- Preservar URL de destino para retorno pós-login
- Notificar se houver múltiplas tentativas falhas: "Muitas tentativas. Aguarde 30 segundos."

---

### 2.4 Dado Inválido

**O que o empresário vê:**
Validação inline no campo específico. Ícone de informação (não "x" vermelho). Mensagem abaixo do campo.

**Tom:** "Quase lá. Só ajuste este ponto."

**Mensagem:**
"Este valor não foi reconhecido. [instrução específica do formato esperado]."

**Exemplos:**
- CNPJ: "Este CNPJ não parece válido. Verifique se digitou os 14 dígitos."
- Email: "Este email não foi reconhecido. Verifique se não há erros de digitação."
- Telefone: "Formato esperado: (11) 91234-5678."

**Ação:**
Correção inline. Não há botão separado — o campo fica destacado para edição.

**Visual:**
Campo com borda laranja suave. Ícone de círculo com "i" à esquerda (dentro do campo ou abaixo). Mensagem em texto pequeno (12px) abaixo.

**Duração:** Persiste até correção válida.

**Regras:**
- Apenas um campo inválido por vez (validar em sequência)
- Não esconder outros campos
- Não travar o formulário inteiro por um campo
- Dar sugestão de correção sempre que possível

---

### 2.5 Erro Inesperado (500)

**O que o empresário vê:**
Toast ou banner suave. Fundo em tom neutro (não vermelho). Ícone de "algo aconteceu".

**Tom:** "Não foi você, foi a gente."

**Mensagem:**
"Algo inesperado aconteceu. Nossa equipe já foi notificada e estamos trabalhando nisso. Seus dados mais recentes estão seguros."

**Ação:**
Botão "Tentar Novamente" com backoff exponencial.
Botão "Voltar" — retorna à tela anterior preservando estado.

**Visual:**
Ícone suave (nuvem com ponto de interrogação ou similar). Fundo neutro cinza claro ou laranja muito claro. Sem bordas agressivas.

**Duração:** Auto-dismiss após navegação. Persiste 8s se apenas toast.

**Tratamento especial:**
- Nunca mostrar stack trace, error code ou linguagem técnica
- Se o erro ocorrer durante uma ação destrutiva: "O processo foi interrompido e nenhum dado foi alterado. Tente novamente."
- Se ocorrer durante salvamento: "Seus dados foram preservados e a tentativa será refeita automaticamente."

---

## 3. Estados de Sucesso

### Princípios Gerais

- Tom satisfeito, natural — nunca eufórico ou exagerado.
- Mensagem: o que aconteceu, o que significa, próximo passo opcional.
- Visual com check animado suave (não explosion).
- Cor de sucesso: verde não agressivo, bem saturado mas suave (#4CAF50 ou equivalente).
- Duração: 2-3s de destaque, depois normaliza.
- Não interromper o fluxo do empresário.

---

### 3.1 Conta Criada

**O que o empresário vê:**
Tela dedicada com check animado (check mark desenhando-se em 600ms). Fundo limpo. Ilustração de boas-vindas.

**Mensagem:**
"Conta criada com sucesso! Sua jornada Ponte Digital começou."

**Próximo Passo:**
"Fazer Diagnóstico Inicial" — CTA primário.
"Explorar Plataforma" — CTA secundário.

**Visual:**
Check verde em círculo, animação de draw. Ilustração de um ponto de partida em uma estrada. Confetes sutis e não intrusivos (apenas no centro da tela).

**Tempo de destaque:** 3s. Após 3s, CTA aparece com fade in.

**Tom:**
"Bem-vindo. O trabalho começa agora, mas você não está sozinho."

---

### 3.2 Diagnóstico Concluído

**O que o empresário vê:**
Toast ou banner no topo + transição suave para a tela de resultados. Barra de progresso do diagnóstico completa com animação de preenchimento.

**Mensagem:**
"Diagnóstico concluído! A Ponte Digital já está processando os dados para gerar seus insights."

**O que significa:**
"Seu perfil empresarial foi registrado. As próximas análises vão comparar seus dados com este diagnóstico base."

**Próximo Passo:**
"Ver Resultados" — leva ao resumo do diagnóstico.
"Agendar Revisão" — se aplicável.

**Visual:**
Barra de progresso que completa com animação de 800ms. Check no final. Card de resumo aparece com fade.

**Tempo de destaque:** 2s na transição, depois resultados ficam em foco.

**Tom:**
"Diagnóstico feito. Agora temos uma base para trabalhar."

---

### 3.3 Insight Gerado

**O que o empresário vê:**
O insight aparece no painel ou na conversa com destaque suave (glow momentâneo no card). Não é modal — é inserção no fluxo.

**Mensagem:**
"Insight disponível" — sutil. O insight em si é a mensagem principal.

**O que significa:**
"A Ponte Digital identificou um padrão relevante no seu negócio."

**Próximo Passo:**
"Explorar Este Insight" — abre visão detalhada.
"Registrar Decisão" — leva ao centro de decisão com contexto do insight.

**Visual:**
Card com glow suave na borda por 2s. Ícone de lâmpada pequena no canto. Background levemente destacado. Após 2s, glow desaparece e o card fica com estilo padrão de insight.

**Tempo de destaque:** 2s de glow, depois item normal na lista.

**Tom:**
"Um padrão foi encontrado. Pode ser nada, pode ser tudo — você decide."

---

### 3.4 Decisão Registrada

**O que o empresário vê:**
Toast rápido no canto inferior + atualização silenciosa do centro de decisão ou timeline. A lista de decisões é atualizada sem refresh perceptível.

**Mensagem:**
"Decisão registrada! Ela já está disponível no seu histórico."

**O que significa:**
"Cada decisão registrada fortalece sua base de conhecimento e melhora as recomendações da Ponte Digital."

**Próximo Passo:**
"Ver na Timeline" — leva à decisão na timeline.
"Registrar Outra" — mantém no fluxo.

**Visual:**
Check pequeno (24x24) com animação de 400ms. Toast com fundo verde suave. A lista atualiza com animação de fade + slide.

**Tempo de destaque:** 2s. Toast desaparece após 2s. A decisão permanece destacada na lista por 4s.

**Tom:**
"Registrado. Isso faz diferença no longo prazo."

---

### 3.5 RFC Submetida

**O que o empresário vê:**
Tela de confirmação após submissão de RFC. Card com resumo da RFC submetida. Barra de status "Em Análise".

**Mensagem:**
"RFC submetida com sucesso! Sua solicitação de mudança entrou no fluxo de análise."

**O que significa:**
"A equipe Ponte Digital vai analisar sua solicitação e você receberá atualizações sobre o andamento."

**Próximo Passo:**
"Acompanhar RFC" — leva ao status da RFC.
"Submeter Outra" — volta ao formulário.

**Visual:**
Documento com check animado. Status tag verde "Em Análise". Card com borda esquerda colorida.

**Tempo de destaque:** 3s na tela de confirmação, depois transição para o acompanhamento.

**Tom:**
"Sua voz foi ouvida. Mudanças levam tempo, mas começam com uma solicitação."

---

### 3.6 Observação Registrada

**O que o empresário vê:**
A observação aparece inline na conversa ou timeline com animação sutil de fade-in. Sem interrupção.

**Mensagem:**
"Observação registrada."

**O que significa:**
"Observações ajudam a Ponte Digital a entender melhor o contexto do seu negócio."

**Próximo Passo:**
"Adicionar Mais Detalhes" — expande a observação.
"Ver Observações" — timeline filtrada.

**Visual:**
A observação aparece onde foi digitada, com transição de 300ms. Um check minúsculo aparece ao lado da observação por 1s. Nenhum toast adicional — o feedback é a própria inserção do conteúdo.

**Tempo de destaque:** 1s (check ao lado). A observação permanece visível no fluxo.

**Tom:**
"Anotado. O contexto do seu negócio está mais rico."

---

## 4. Dark Mode

### 4.1 Princípios

- Dark mode não é "inverter as cores" — é um modo visual completo.
- Manter hierarquia visual: escuro não é desculpa para tudo parecer igual.
- Reduzir saturação em 20% em relação ao light mode.
- Contraste mínimo WCAG AA em todas as superfícies.
- Transição suave entre modos em 300ms (fade das cores).
- Respeitar preferência do sistema (`prefers-color-scheme`) + toggle manual no header.
- Salvamento da preferência do usuário (localStorage + profile).

### 4.2 Paleta Dark

| Função | Light | Dark | Observação |
|--------|-------|------|------------|
| Fundo primário | #FFFFFF | #121212 | Base principal |
| Fundo secundário | #F5F5F5 | #1E1E1E | Cards, painéis |
| Fundo terciário | #EEEEEE | #2C2C2C | Elementos elevados |
| Texto primário | #212121 | #E0E0E0 | Corpo de texto |
| Texto secundário | #616161 | #A0A0A0 | Labels, legendas |
| Texto terciário | #9E9E9E | #707070 | Placeholder, desabilitado |
| Borda sutil | #E0E0E0 | #333333 | Divisórias |
| Borda média | #BDBDBD | #444444 | Inputs, cards |

### 4.3 Cores Semânticas em Dark

Manter matiz original, ajustar luminância.

| Semântica | Light | Dark | Critério |
|-----------|-------|------|----------|
| Sucesso | #4CAF50 | #66BB6A | +20% luminância |
| Atenção | #FF9800 | #FFB74D | +15% luminância |
| Erro | #F44336 | #EF5350 | +10% luminância |
| Informativo | #2196F3 | #42A5F5 | +15% luminância |

### 4.4 Elementos que NÃO Mudam

- Cores semânticas: mantêm matiz, ajustam luminância (tabela acima)
- Ícones de marca: mantêm identidade visual
- Fotografias: não invertidas (aplicar filtro suave se necessário)
- Sombras: substituídas por glow sutil ou bordas em dark mode (sombra em dark não funciona visualmente)

### 4.5 Imagens e Ícones

- Ícones vetoriais precisam de versão dark explícita (não confiar em inversão automática)
- Ilustrações: manter line art, ajustar cor do traço de dark para light
- Fotografia: reduzir brilho em 30% e contraste em 15% no dark mode
- Logotipos: usar variação monocromática branca

### 4.6 Transição

- Transição entre modos: 300ms, easing ease-in-out
- Aplicar transição em: background-color, color, border-color, box-shadow
- NÃO aplicar transição em: imagens raster, iframes, elementos de terceiros
- Durante transição: desabilitar animações de elementos em movimento para evitar dissonância

### 4.7 Detecção e Toggle

1. Ao primeiro acesso: detectar `prefers-color-scheme`
2. Se sistema = dark: aplicar dark mode automaticamente
3. Se usuário alterar toggle manual: salvar em `localStorage` + perfil do usuário
4. Toggle manual sobrescreve preferência do sistema
5. Opção "Seguir Sistema" no toggle (terceiro estado opcional)
6. Ao alterar modo: transição suave + toast informativo "Modo escuro ativado" / "Modo claro ativado"

### 4.8 Verificação de Contraste (WCAG AA)

Pontos de verificação obrigatórios:
- Texto normal (< 18px): contraste mínimo 4.5:1
- Texto grande (>= 18px ou >= 14px bold): contraste mínimo 3:1
- Elementos de interface não-texto (ícones, bordas de input): 3:1
- Estados de foco: mínimo 3:1 em relação ao fundo adjacente

### 4.9 Testes de Dark Mode

- Verificar cada tela em modo escuro
- Verificar transição em cada tema (claro → escuro, escuro → claro)
- Verificar contraste com ferramenta de medição
- Verificar legibilidade de gráficos e visualizações
- Verificar consistência com elementos de terceiros (embeds, etc.)

---

## 5. Performance Percebida

### Princípios Gerais

- Performance percebida não é sinônimo de performance real.
- O que importa: o tempo que o empresário sente que esperou.
- Priorizar paint do conteúdo mais importante primeiro.
- Toda ação do empresário deve ter feedback em menos de 100ms.
- Técnicas de performance percebida são tão importantes quanto otimizações reais.

---

### 5.1 Skeleton Screens

**Descrição:**
Mostrar a estrutura da tela (placeholders de layout) antes do conteúdo carregar. Diferente de spinner, skeleton screens mostram o que vai aparecer e onde.

**Implementação conceitual:**
- Renderizar estrutura da página com blocos de cor sólida (cinza claro/escuro)
- Animação de shimmer (gradiente que se move) nos blocos
- Substituir cada bloco pelo conteúdo real conforme carrega (não esperar tudo)
- Tempo de shimmer: 1.5s por ciclo, fade out do skeleton em 300ms

**Impacto percebido:**
- Reduz sensação de espera em ~40% vs spinner
- Empresário processa o layout antes do conteúdo
- Parece que o sistema está "montando" a tela ao invés de "esperando dados"
- Aplicar especialmente em: dashboard, centro de decisão, painel cognitivo, histórico de insights

**Onde aplicar:**
- Dashboard: skeleton dos cards de indicador (4 cards), skeleton do gráfico principal
- Centro de decisão: skeleton da lista (3-5 linhas), skeleton dos filtros
- Painel cognitivo: skeleton dos módulos (3 blocos)
- Diagnóstico: skeleton das seções do questionário

---

### 5.2 Loading Progressivo

**Descrição:**
Mostrar o que já está pronto enquanto o resto carrega. Não esperar tudo carregar para mostrar algo.

**Implementação conceitual:**
- Identificar ordem de importância dos elementos na tela
- Carregar e renderizar elementos mais importantes primeiro
- Mostrar conteúdo parcial com indicadores de "mais carregando"
- Priorizar: texto → indicadores → gráficos → imagens → dados secundários

**Impacto percebido:**
- Empresário interage com conteúdo mesmo enquanto o restante carrega
- Sensação de "o sistema é rápido, só alguns complementos estão chegando"
- Reduz abandono em telas de carregamento

**Ordem de carregamento sugerida:**

| Tela | 1º (imediato) | 2º (500ms) | 3º (1.5s) |
|------|---------------|-----------|-----------|
| Dashboard | Cabeçalho + filtros | Cards de indicador | Gráficos + tabelas |
| Diagnóstico | Título + barra de progresso | Pergunta atual + opções | Seções seguintes |
| Centro de Decisão | Lista de decisões (texto) | Datas + status | Gráficos de análise |
| Painel Cognitivo | Módulos de insight | Métricas | Recomendações |

---

### 5.3 Optimistic UI

**Descrição:**
Assumir que a operação vai dar certo e mostrar o resultado antes da confirmação do servidor.

**Implementação conceitual:**
- Ao enviar ação (registrar decisão, salvar observação, etc.), mostrar resultado imediatamente
- Atualizar UI de forma otimista (adicionar item na lista, atualizar contador)
- Enquanto isso, enviar requisição ao servidor
- Se servidor confirmar: nada a fazer (já está na UI)
- Se servidor falhar: reverter mudança + mostrar erro + oferecer retry

**Impacto percebido:**
- Ações parecem instantâneas (200ms vs 1-3s reais)
- Empresário não espera por confirmações
- Fluxo contínuo de trabalho

**Onde aplicar:**
- Registrar decisão: aparece imediatamente na timeline
- Registrar observação: aparece inline instantaneamente
- Criar diagnóstico: seção aparece como concluída imediatamente
- Submeter RFC: aparece na lista imediatamente com status "Enviando..."
- Alterar configurações: toggle responde imediatamente

**Riscos e mitigação:**
- Risco: dado não persistir por erro de rede
- Mitigação: reverter com animação suave + explicar o que houve
- Risco: conflito com estado real do servidor
- Mitigação: reconciliar na próxima requisição ou com refresh periódico

---

### 5.4 Feedback Imediato

**Descrição:**
Qualquer ação do empresário com duração < 100ms deve ter resposta visual imediata.

**Implementação conceitual:**
- Botões: mudança de estado no hover, active, disabled (tudo < 50ms)
- Links: sublinhado ou mudança de cor no hover (instantâneo)
- Inputs: borda destaca no focus, validação inline (sem esperar submit)
- Toggles: animação de switch responde no click (não esperar servidor)
- Checkboxes: check mark aparece imediatamente

**Impacto percebido:**
- Sistema parece "responsivo" e "ágil"
- Empresário sente controle sobre a interface
- Reduz sensação de lentidão mesmo em operações lentas

**Tabela de tempos:**
| Ação | Tempo máximo | Resposta visual |
|------|-------------|-----------------|
| Hover | 20ms | Mudança de cor/sublinha |
| Click | 30ms | Estado active/ripple |
| Focus | 30ms | Borda destaca |
| Toggle | 50ms | Switch anima |
| Validação inline | 80ms | Campo destaca + mensagem |
| Scroll | 16ms (60fps) | Scroll suave |

---

### 5.5 Prioridade de Paint

**Descrição:**
O que o empresário olha primeiro carrega primeiro. Priorizar o conteúdo da área de foco inicial.

**Implementação conceitual:**
- Identificar padrão de leitura/scan do empresário na tela
- Carregar conteúdo do topo para baixo e do principal para o secundário
- Adiar carregamento de: imagens abaixo da dobra, scripts de terceiros, analytics
- Usar lazy loading para tudo que não está na viewport inicial

**Hierarquia de prioridade visual:**
1. Cabeçalho + identificação da página (0-200ms)
2. Área de conteúdo principal (200-600ms)
3. Elementos de ação/navegação (600-1000ms)
4. Dados secundários, gráficos (1000-2000ms)
5. Conteúdo abaixo da dobra (2000ms+)

**Onde aplicar mais impacto:**
- Dashboard: indicadores principais primeiro, gráficos depois
- Conversa: mensagens mais recentes primeiro, histórico depois
- Relatórios: sumário executivo primeiro, detalhes depois
- Diagnóstico: pergunta atual primeiro, próximas seções em background

---

### 5.6 Transições Instantâneas

**Descrição:**
Navegação entre telas com tempo percebido < 200ms. Nenhuma tela branca ou flash de carregamento.

**Implementação conceitual:**
- Usar SPA com transições de página suaves
- Prefetch de rotas prováveis (hover em link, scroll próximo ao fim)
- Manter estado de scroll entre navegações (não resetar)
- Transição de saída da tela atual enquanto a próxima carrega
- Se carregamento > 500ms: mostrar skeleton da próxima tela

**Impacto percebido:**
- Navegação parece instantânea
- Empresário não perde contexto entre telas
- Parece "um app" em vez de "um site"

**Técnicas:**
- View transitions API ou equivalente
- Page transition: fade-out de 100ms + fade-in de 100ms (total 200ms)
- Manter scroll position
- Cache de página anterior (voltar é instantâneo)

---

### 5.7 Preloading

**Descrição:**
Carregar a próxima tela ou ação enquanto o empresário interage com a atual.

**Implementação conceitual:**
- Prefetch de rotas com base em padrões de navegação
- Preload de dados ao hover em botões de navegação
- Background fetch de dados complementares após carga inicial
- Cache de recursos estáticos (Service Worker ou similar)

**O que pre carregar:**
| Ação do empresário | O que pre carregar |
|-------------------|-------------------|
| Lendo um relatório | Próximo relatório da lista |
| Preenchendo diagnóstico | Próxima seção do questionário |
| Vendo um insight | Insights relacionados |
| Digitando mensagem | Resultados de busca frequentes |
| Scroll próximo ao fim | Conteúdo da próxima página |

**Limites:**
- Máximo de 3 prefetches simultâneos
- Priorizar banda: não fazer prefetch em conexão lenta
- Cache de prefetch: 5 minutos de validade

---

### 5.8 Tempo de Resposta da IA

**Descrição:**
Simular variação natural no tempo de resposta da IA. Nunca instantâneo para perguntas complexas — a instantaneidade diminui a credibilidade da análise.

**Implementação conceitual:**
- Para perguntas simples (reconhecimento de padrão): 800ms-2s de resposta
- Para análises moderadas (cruzamento de dados): 2-5s de resposta
- Para análises complexas (recomendação estratégica): 5-12s de resposta
- IA nunca responde em < 500ms (pareceria que não pensou)
- Mostrar indicador de "pensando" com variação no texto (não spinner estático)

**Indicadores de processamento:**
| Estágio | Texto | Duração |
|---------|-------|---------|
| 1 | "Analisando seus dados..." | 0-30% do tempo |
| 2 | "Cruzando informações do seu negócio..." | 30-60% |
| 3 | "Identificando padrões relevantes..." | 60-85% |
| 4 | "Preparando recomendação..." | 85-100% |

**Variação natural:**
- Mesma pergunta em momentos diferentes: tempo diferente (adicionar ruído de ±30%)
- Usuários diferentes: tempo diferente baseado na quantidade de dados
- Horário do dia: simular maior carga em horário comercial (variação de até 20%)

**Risco:**
- Não parecer que está "simulando" — a variação deve ser natural e baseada em processamento real
- Não atrasar artificialmente sem benefício — o tempo deve ser justificado pela complexidade

---

## Apêndice A: Matriz de Cobertura de Estados

| Tela/Componente | Vazio | Erro | Sucesso | Dark Mode | Skeleton |
|----------------|-------|------|---------|-----------|----------|
| Dashboard | ✓ | ✓ | - | ✓ | ✓ |
| Diagnóstico | ✓ | ✓ | ✓ | ✓ | ✓ |
| Painel Cognitivo | ✓ | ✓ | ✓ | ✓ | ✓ |
| Centro de Decisão | ✓ | ✓ | ✓ | ✓ | ✓ |
| Histórico de Insights | ✓ | ✓ | ✓ | ✓ | ✓ |
| Autenticação | - | ✓ | ✓ | ✓ | - |
| Perfil | - | ✓ | ✓ | ✓ | - |
| Configurações | - | ✓ | ✓ | ✓ | - |
| Landing | - | ✓ | - | ✓ | - |

---

## Apêndice B: Checklist de Verificação

Antes de liberar qualquer tela:
- [ ] Estado vazio implementado com CTA
- [ ] Todos os erros possíveis têm tratamento
- [ ] Sucesso tem feedback visual adequado
- [ ] Dark mode verificado (contraste WCAG AA)
- [ ] Transição dark/light testada
- [ ] Skeleton screen implementado
- [ ] Feedback imediato em todos elementos interativos
- [ ] Tempo de IA simulado com variação natural
- [ ] Optimistic UI aplicada onde faz sentido
- [ ] Preloading configurado para navegação principal
