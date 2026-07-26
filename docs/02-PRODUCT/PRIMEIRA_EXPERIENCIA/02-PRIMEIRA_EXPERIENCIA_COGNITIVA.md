# Primeira Experiência Cognitiva

> PROGRAMA 15 — Documento 2 de 10
> Comportamento ideal da primeira experiência: o que vê, sente, faz, não faz, quando fala, quando se cala

---

## Relatório de execução

- **Descobertas:** a primeira experiência já tem 80% dos blocos de construção implementados (conversa anônima, micro-reações, interpretações, experience engine, founder activation). O gap está na orquestração fina — o "como" algo é dito importa mais que o "o que" é dito. O silêncio do sistema (momentos de pausa, não sobrecarregar) é um design ausente hoje.
- **Pressupostos:** a experiência cognitiva não precisa de IA generativa para ser boa. Reações determinísticas + linguagem natural template → suficiente para a primeira experiência.
- **Lacunas:** o sistema hoje fala demais (cards técnicos) e se cala de menos. Não há "momentos de pausa" — o fluxo é pergunta→resposta→reação→próxima pergunta sem respirar. A experiência precisa de silêncio em alguns pontos.
- **Riscos:** humanizar demais a experiência pode criar expectativa de IA conversacional plena, que não existe. O tom precisa ser "sistema inteligente e atento", não "humano simulando conversa".
- **Conflitos:** nenhum.
- **Impactos futuros:** este documento define o tom de TODAS as interações da primeira experiência. Consistência é crítica — uma quebra de tom quebra a confiança.
- **Confirmação de coerência:** coerente com a Jornada Fundacional (Capítulos 3-4) e com o Diagnóstico como Conversa.

---

## 1. O que o empresário vê

### 1.1 Primeira tela (landing)

Visualmente limpo. Uma só call to action. Zero distração.

| Elemento | Presente? | Descrição |
|----------|-----------|-----------|
| Pergunta central | Sim | "Cansou de planilha?" |
| Subtítulo explicativo | Sim | "Responda 5 perguntas e descubra o que está passando despercebido" |
| Botão único | Sim | "Descobrir agora" |
| Prova social sutil | Opcional | "Junte-se a [N] empresários" — só se N > 50 |
| Rodapé mínimo | Sim | Apenas links necessários |

| Elemento | Ausente? | Motivo |
|----------|----------|--------|
| Menu de navegação | Sim | Não confundir antes da hora |
| Preços | Sim | Ele não sabe o que é ainda |
| Login | Sim | Seria barreira |
| Vídeo institucional | Sim | Consome tempo sem entregar valor |

### 1.2 Segunda tela (conversa/diagnóstico)

Uma interface de chat simplificada:
- Balão de pergunta à esquerda (sistema)
- Campo de resposta à direita (empresário)
- Barra de progresso sutil no topo (5 blocos)
- Sem avatar, sem nome, sem "bot está digitando" falso

A cada resposta:
- A resposta some e a pergunta seguinte aparece suavemente
- Uma micro-reação aparece rapidamente entre a resposta e a próxima pergunta
- A transição não é instantânea — há 1 segundo de pausa natural

### 1.3 Terceira tela (resumo)

Um texto corrido em formato de carta/diário. Não é dashboard. Não tem cards lado a lado. Não tem gráfico. É texto só.

Abaixo, dois botões: "Quero criar minha conta" e "Guardar e ver depois". Nenhum é "assine".

### 1.4 Quarta tela (primeiro dashboard)

Parece um dashboard, mas vazio de forma proposital:
- Banner de boas-vindas contextual (personalizado com nome + setor)
- 1-2 cards de prioridade no centro (não mais)
- Sidebar minimalista com módulos principais visíveis e os demais acinzentados
- Assistente acessível no canto

---

## 2. O que o empresário sente

### 2.1 Durante a entrada

| Sentimento | Causa | Medidor |
|------------|-------|---------|
| Curiosidade | "Cansou de planilha?" — ele se identifica | Taxa de clique no botão |
| Desconfiança inicial | "Vai pedir cartão no final?" | Taxa de abandono na primeira pergunta |
| Alívio | Primeira pergunta é fácil (segmento) | Tempo na primeira pergunta (>5s = inseguro) |

### 2.2 Durante o diagnóstico

| Sentimento | Causa | Medidor |
|------------|-------|---------|
| Engajamento | Perguntas fazem ele pensar sobre o negócio | Taxa de conclusão |
| Reflexão | Perguntas "qual serviço dá mais lucro?" | Tempo médio por resposta |
| Leve incômodo | Bloco de Gestão — toca em como ele decide | Taxa de abandono no bloco 3 |
| Catarse | Bloco de Problemas — pode desabafar | Comprimento das respostas |
| Antecipação | Última pergunta "o que gostaria que resolvessem" | Taxa de clique em "ver resumo" |

### 2.3 Após o resumo

| Sentimento | Causa | Medidor |
|------------|-------|---------|
| Reconhecimento | "Isso é exatamente o que eu sinto" | Taxa de compartilhamento |
| Confiança inicial | O sistema ouviu e entendeu | Taxa de criação de conta |
| Segurança | Não fui empurrado para venda | Voltas sem criar conta |

### 2.4 Sentimentos que NÃO devem ocorrer

| Sentimento | O que evitar |
|------------|--------------|
| Frustração | Perguntas que ele não sabe responder |
| Pressa | "Completar 100% do perfil" |
| Culpa | "Você deveria estar controlando X" |
| Confusão | Jargão técnico, termos estrangeiros |
| Desconfiança | Pedir cartão, pedir dados sem contexto |

---

## 3. O que o sistema faz

### 3.1 Na entrada

- Renderiza landing page estática
- No clique em "Descobrir agora": cria cookie `conv_token`, redireciona para `/conversa`
- Inicia sessão anônima

### 3.2 No diagnóstico

- Carrega fluxo de perguntas do arquivo de fluxo (`primeira-conversa.ts`)
- Para cada pergunta respondida:
  1. Salva resposta no banco (`Conversa.respostas`)
  2. Gera micro-reação contextual (`reacoes.ts`)
  3. Avança para próxima pergunta
  4. Atualiza barra de progresso
- Quando bloco termina: gera reação de bloco (ex.: "entendi como sua operação funciona")
- Quando última pergunta: marca conversa como concluída

### 3.3 No resumo

- Chama `POST /api/conversa/finalizar`
- Gera texto corrido a partir das interpretações estruturadas
- Retorna HTML/texto para o frontend renderizar
- Salva o resumo na Identidade Digital (`narrativa`) para referência futura

### 3.4 Na transição

- Oferece criação de conta (nunca obriga)
- Se ele cria conta: executa o fluxo existente de `POST /api/auth/criar-conta`
- Se ele não cria: mantém cookie por 7 dias, permite retorno

### 3.5 No primeiro login

- Gera experiência de dashboard com escopo curado via Experience Engine
- Consulta `EventoAtivacao` para saber o que desbloquear
- Prepara contexto para o Assistente

### 3.6 Rotinas de fundo

- Se cookie expira sem cadastro: perde acesso ao resumo (sem criação de conta, sem Identidade Digital)
- Se ele volta antes de 7 dias: recarrega a conversa de onde parou

---

## 4. O que o sistema NÃO faz

### 4.1 Proibições absolutas

| Ação | Consequência |
|------|--------------|
| Pedir cartão de crédito antes do primeiro valor | Abandono instantâneo |
| Usar jargão técnico | Confusão e desconfiança |
| Avaliar respostas como certas/erradas | Culpa e rejeição |
| Mostrar tutorial antes do valor | Perda de interesse |
| Enviar e-mail sem permissão | Spam = desconfiança |
| Fingir ser humano | Quebra de confiança quando descoberto |
| Interromper o fluxo com popups | Frustração |
| Exigir login para ver o resumo | Abandono |

### 4.2 O que o sistema evita

- **Perguntas redundantes:** se o empresário disse que tem barbearia, não pergunta "qual seu segmento?" de novo
- **Perguntas que ele não sabe responder:** "qual sua margem EBITDA?" seria desastroso
- **Sugestões prematuras:** antes de terminar o diagnóstico, o sistema não sugere nada — apenas ouve
- **Sobrecarga de informações:** o resumo final tem no máximo 5 seções curtas

---

## 5. Quando o sistema fala

### 5.1 Momentos de falar

| Momento | O que diz | Tom |
|---------|-----------|-----|
| Entrada | "Cansou de planilha?" | Direto, identificável |
| A cada resposta | Micro-reação (2-3 palavras ou frase curta) | Empático, observador |
| Fim de bloco | "Entendi como funciona sua [área]" | Confirmatório |
| Fim do diagnóstico | Resumo completo | Honesto, acolhedor |
| Convite para criar conta | "Quer ver como posso te ajudar?" | Aberto, sem pressão |
| Primeiro login | "Bem-vindo. Comecei a organizar suas prioridades." | Acolhedor, produtivo |
| Inatividade (7 dias) | E-mail: "Sua empresa ainda está esperando" | Lembrete, não cobrança |

### 5.2 Tom de voz em cada fala

- **Nunca institucional:** não diz "a Ponte Digital", "nossa plataforma", "nosso sistema"
- **Nunca técnico:** não diz "cognitive mapping", "análise preditiva"
- **Sempre "eu":** o sistema fala como "eu" (a Ponte), não "nós" (a empresa)
- **Sempre "você":** o empresário é "você", nunca "usuário" ou "cliente"
- **Honesto quando não sabe:** "ainda não sei como está seu fluxo de caixa real"
- **Direto mas respeitoso:** sem rodeios, sem falsa animação

---

## 6. Quando o sistema se cala

### 6.1 Momentos de silêncio

| Momento | Por que se cala | Duração |
|---------|-----------------|---------|
| Antes da primeira pergunta | Deixar o empresário processar a tela | 1-2s |
| Entre micro-reação e próxima pergunta | Absorver a reação antes de seguir | 0.5-1s |
| Após o resumo | Deixar o empresário ler e processar | Sem limite — ele decide o que fazer |
| Enquanto ele digita | Não interromper | Até ele enviar |
| Se ele para de responder (abandono) | Não perguntar "ainda está aí?" | Cookie expira em 7 dias |

### 6.2 O que o silêncio comunica

- **Respeito:** não estou apressando você
- **Confiança:** não preciso te empurrar
- **Escuta atenta:** estou processando o que você disse
- **Não-venda:** não estou aqui para te convencer de nada

### 6.3 O que o silêncio NÃO comunica

- **Indiferença:** o sistema escutou e registrou
- **Erro:** o silêncio é proposital, não uma falha
- **Término:** a conversa não acabou até o resumo aparecer

---

## 7. Métricas de qualidade da experiência

| Métrica | O que mede | Meta |
|---------|------------|------|
| Taxa de conclusão do diagnóstico | % que chega ao resumo | > 60% |
| Taxa de criação de conta | % que cria conta após resumo | > 15% |
| Taxa de retorno sem cadastro | % que volta antes do cookie expirar | > 10% |
| Tempo médio no resumo | Quanto leu | > 20s |
| Taxa de clique no "ver depois" | Quer guardar | > 5% |
| Net Promoter Score (pergunta no final) | Recomendaria? | > 30 |

---

*Documento concluído. Avançando para Documento 3.*
