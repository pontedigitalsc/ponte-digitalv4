# Sistema Oficial do Assistente

> Como o Assistente (IA) ocupa espaço, responde, interrompe, permanece invisível, toma iniciativa, espera.
> Este documento define o comportamento espacial e temporal do Assistente em todas as superfícies da Ponte Digital.

---

## 1. Ocupação do Espaço

O Assistente não é um elemento fixo da interface — ele respira, ocupa mais ou menos espaço conforme o estado da interação.

### 1.1 Estados de ocupação

| Estado | Largura ocupada | Componentes visíveis | Quando ocorre |
|---|---|---|---|
| Presente | 25% | Avatar + campo de resposta + indicador de prontidão | Padrão, sem interação ativa |
| Falando | 60% | Avatar expandido + mensagem + campo de resposta | Assistente está respondendo |
| Pensando | 40% | Avatar reduzido + indicador de pensamento | Assistente está processando |
| Invisível | 5% | Apenas avatar mínimo (16px) | Empresário lendo, navegando ou configurando |

### 1.2 Transições entre estados de ocupação

- Presente → Falando: ativado quando empresário envia mensagem ou assistente toma iniciativa
- Falando → Pensando: ativado quando resposta exige raciocínio (loading > 1s)
- Pensando → Falando: ativado quando raciocínio concluído e resposta pronta
- Falando → Presente: ativado 3s após fim da resposta (fade sutil do avatar)
- Presente → Invisível: ativado quando empresário foca em leitura/configuração > 5s
- Invisível → Presente: ativado quando empresário volta ao campo de conversa

### 1.3 Overflow de mensagens longas

Toda mensagem com mais de 400 caracteres ou 8 linhas exibe "Ver mais" ao final.

Regras do overflow:
- Tamanho padrão exibido: 3 linhas + "Ver mais"
- "Ver mais" expande para o conteúdo completo (máximo 30 linhas antes de scroll interno)
- Conteúdo acima de 30 linhas: scroll dentro do card da mensagem
- Card expandido nunca ultrapassa 80% da altura da viewport
- "Ver menos" recolhe para 3 linhas

### 1.4 Limites espaciais do Assistente

- O Assistente nunca ocupa 100% da largura da conversa
- O Assistente nunca ocupa mais que 70% da altura da viewport
- O campo de resposta do empresário está sempre visível (exceto em modais)
- Avatar mínimo permanece visível em todas as telas (ponto de ancoragem)

---

## 2. Comportamento de Resposta

### 2.1 Aparição pensada (não instantânea)

Toda resposta do Assistente segue um ritmo, mesmo quando o conteúdo está pronto.

Mecanismo de aparição:
1. Silêncio de 200ms (processamento simbólico)
2. Indicador de pensamento aparece por 300ms
3. Primeira frase começa a aparecer (slide up + fade, 400ms)
4. Resposta completa é revelada em blocos (cada bloco: 200ms de intervalo)
5. Se resposta > 5 blocos: blocos 1-3 aparecem, restante fica atrás de "Ver mais"

Este ritmo comunica: "Eu pensei antes de responder" — mesmo respostas curtas usam esta cadência.

Exceções:
- Respostas de confirmação ("Feito", "Ok"): aparição instantânea (100ms)
- Respostas de erro: aparecem imediatamente (sem pensamento simulado)
- Comandos de ação confirmados: 100ms

### 2.2 Velocidade de digitação aparente

| Tipo de resposta | Delay inicial | Velocidade | Intervalo entre blocos |
|---|---|---|---|
| Resposta simples (< 100 caracteres) | 200ms | 50ms/palavra | — |
| Resposta média (100-500 caracteres) | 400ms | 30ms/palavra | 150ms |
| Resposta complexa (> 500 caracteres) | 600ms | 20ms/palavra | 200ms |
| Análise de decisão | 800ms | 15ms/palavra | 250ms |
| Insight (WOW) | 1200ms | 10ms/palavra | 300ms |
| Erro | 0ms | instantâneo | — |

### 2.3 Estrutura da mensagem do Assistente

Toda mensagem segue:

```
[Avatar] [Nome]
[Indicador de processo]  ← se pensando
[Timestamp relativo]
[Conteúdo da mensagem]
  [Bloco 1]
  [Bloco 2 se houver]
  ...
[Ações contextuais]  ← botões, se aplicável
```

O conteúdo da mensagem pode incluir:
- Texto formatado (markdown simples: negrito, itálico, listas)
- Cards de decisão (ver SISTEMA_OFICIAL_DO_CENTRO_DE_DECISAO.md)
- Dataviz inline (até 3 métricas)
- Links para relatórios/dashboards
- Botões de ação (máximo 2 por mensagem)

---

## 3. Regras de Interrupção

O Assistente NUNCA interrompe o empresário enquanto ele digita. Exceções rigorosas.

### 3.1 Regra fundamental: campo ativo = silêncio

Enquanto o campo de texto do empresário estiver focado E com conteúdo:
- Assistente NÃO fala
- Assistente NÃO exibe notificações no campo de conversa
- Assistente NÃO toma iniciativa
- Apenas o avatar permanece (modo invisível)

Exceto:
- Erro crítico de sistema (perda de dados iminente)
- Contradição grave (empresário prestes a tomar decisão com dados conflitantes)

### 3.2 Hierarquia de interrupções

| Tipo | Permite interrupção? | Emergência | Como notifica |
|---|---|---|---|
| Erro crítico | Sim | Imediata | Badge vermelho + notificação toast + substitui campo |
| Contradição grave | Sim | Alta | Badge laranja + tooltip ao lado do campo |
| Insight novo | Não | Média | Acumula, exibe após envio da mensagem |
| Sugestão de próximo assunto | Não | Baixa | Acumula, exibe após resposta do assistente |
| Notificação de sistema | Não | Variável | Painel lateral, nunca na conversa |

### 3.3 Interrupção por erro crítico

Quando ocorre:
1. Empresário recebe notificação toast (slide down, 250ms, cor vermelha)
2. Botão "Ver erro" aparece no toast
3. Ao clicar, assistente explica o erro e a ação necessária
4. Campo de digitação do empresário não é apagado — erro é contexto adicional

### 3.4 Interrupção por contradição grave

Quando detectada:
1. Indicador sutil ao lado do campo (ícone de alerta, laranja)
2. Tooltip: "Encontrei uma contradição nos dados. Quer que eu explique?"
3. Empresário escolhe: clica para explicação OU ignora e continua
4. Se ignorar: contradição é registrada no Centro de Decisão como pendente

---

## 4. Iniciativa do Assistente

### 4.1 Gatilhos de iniciativa

| Gatilho | Condição | Ação | Prioridade |
|---|---|---|---|
| Silêncio do empresário | Sem input > 10s | Sugerir próximo assunto | Média |
| Oportunidade de insight | Novo padrão detectado | "Encontrei algo interessante..." | Alta |
| Hesitação do empresário | Campo vazio focado > 5s | "Posso ajudar com algo?" | Alta |
| Atualização importante | Novo dado disponível | Notificar com contexto | Média |
| Conclusão de tarefa | Ação completada | "Mais alguma coisa?" | Baixa |

### 4.2 Protocolo de silêncio ativo

Após 10s sem input do empresário (e sem tarefa em andamento):

1. t=0s: Assistente aguarda (modo presente)
2. t=5s: Se empresário não interagiu, avatar faz animação de respiração (scale 1→1.02→1)
3. t=8s: Se empresário continua inativo, painéis de contexto atualizam (se houver)
4. t=10s: Assistente toma iniciativa: "Parece que você está analisando os dados. Quer que eu destaque algo específico?"

Cenários específicos:
- Empresário olhando dashboard: sugestão relacionada ao gráfico visível
- Empresário em tela de relatório: pergunta sobre o período
- Empresário em tela de configuração: silêncio total (não interromper)
- Empresário em tela de decisão: oferece análise adicional

### 4.3 Protocolo de hesitação

Empresário foca campo de texto mas não digita por > 5s:

1. t=0s: Campo focado
2. t=3s: Avatar inclina levemente (sinal de atenção)
3. t=5s: Assistente pergunta (animação suave): "Está com dúvida sobre o que perguntar?"
4. Opções aparecem: "Sim, me dê sugestões" / "Não, estou pensando"
5. Se "Sim": assistente oferece 3 perguntas sugeridas baseadas no contexto atual
6. Se "Não": assistente volta ao modo presente e não pergunta novamente por 60s

### 4.4 Protocolo de pós-conclusão

Após ação completada (resposta dada, tarefa executada, decisão tomada):

1. t=0s: Fim da resposta
2. t=1s: Avatar transita para "aberto" (postura de escuta)
3. t=3s: Se empresário não respondeu, assistente pergunta: "Posso ajudar em algo mais?"
4. Se empresário responde "não": "Ok. Estou aqui se precisar." + avatar reduz
5. Se empresário responde "sim": assistente aguarda nova pergunta

---

## 5. Espera e Silêncio

### 5.1 Silêncio ativo

O Assistente nunca "desliga". Mesmo em silêncio, ele está presente e trabalhando.

O que acontece durante o silêncio ativo:
- Avatar respira (animação contínua, ciclo de 3s)
- Painéis de contexto continuam atualizando
- Centro de Decisão segue processando novos dados
- Se detectar algo relevante: iniciativa (ver seção 4)

### 5.2 Postura de escuta

Quando o empresário está falando (digitando ou navegando):

- Avatar inclina 5° para frente (sinal de atenção)
- Avatar não respira (parado, focado)
- Indicador de escuta: borda sutil pulsante no avatar
- Se empresário para de digitar > 2s: avatar volta a respirar

### 5.3 Transição fala → escuta

Após o Assistente terminar de responder:

1. t=0ms: Último caractere da resposta aparece
2. t=200ms: Avatar faz transição de "falando" para "aberto" (fade, 300ms)
3. t=500ms: Borda do avatar muda de cor (resposta → escuta)
4. t=1000ms: Avatar inclina 5° para frente (postura de escuta)
5. t=3000ms: Se sem input, pergunta "Posso ajudar em algo mais?"

---

## 6. Personalidade Espacial

### 6.1 O Assistente como centro da experiência

O Assistente não é um chat box no canto da tela. Ele é o CENTRO da experiência cognitiva da Ponte Digital.

Em cada tipo de tela, sua presença se adapta:

| Tipo de tela | Papel do Assistente | Ocupação | Comportamento |
|---|---|---|---|
| Conversa | Protagonista | 60% | Responde, sugere, analisa |
| Dashboard | Coadjuvante | 25% | Interpreta dados, responde perguntas |
| Relatório | Apoiador | 25% | Explica métricas, oferece contexto |
| Decisão | Conselheiro | 40% | Apresenta análises e recomendações |
| Configuração | Disponível | 5% | Apenas avatar, não interrompe |
| Lista/Grade | Auxiliar | 15% | Filtra, ordena, encontra |
| Landing/Onboarding | Guia | 50% | Conduz, explica, acolhe |

### 6.2 Adaptação ao papel

Em telas de conversa:
- Avatar expandido (64px)
- Campo de texto sempre visível
- Histórico visível (scrollável)
- Sugestões de próximo assunto (após pausa)

Em telas de dashboard:
- Avatar reduzido (40px)
- Campo de texto compacto (expande ao focar)
- Assistente não fala a menos que chamado
- Insight aparece como badge no avatar

Em telas de configuração:
- Avatar mínimo (24px)
- Campo de texto oculto (disponível via atalho)
- Assistente não interrompe nem sugere
- Apenas responde quando chamado explicitamente

### 6.3 Ancoragem visual

O Assistente possui posição fixa na interface:

- Conversa: lado direito (padrão ocidental, leitura natural)
- Dashboard: canto inferior direito (fora do caminho mas acessível)
- Mobile: bottom sheet (sobe quando necessário, recolhe quando não)

O avatar é o ponto de ancoragem visual que o empresário usa para localizar o Assistente em qualquer tela.

---

## 7. Avatar

### 7.1 Estados do avatar

| Estado | Tamanho | Animação | Cor da borda | Ícone |
|---|---|---|---|---|
| Presente | 40px | Respiração (3s ciclo) | Neutra | Logo da Ponte |
| Falando | 64px | Onda sonora sutil | Primária | Logo + ondas |
| Pensando | 40px | Pontos pulsando | Neutra | Logo + "..." |
| Invisível | 24px | Parado | Transparente | Logo |
| Escutando | 40px | Inclinado 5° | Destaque | Logo |
| Erro | 40px | Vibração leve | Vermelha | "!" |
| Insight | 64px | Glow + scale | Dourada | "!" estilizado |

### 7.2 Transições do avatar

Toda transição de estado do avatar:
- Duração: 300ms
- Easing: ease-out
- Elementos animados: posição, tamanho, cor da borda, ícone interno
- Múltiplos elementos animam simultaneamente (nunca em oposição)

---

## 8. Árvore de Decisão do Comportamento

```
Empresário digitando?
├── SIM → Modo escuta. Avatar inclinado. Não interromper exceto erro crítico.
└── NÃO → Empresário parou de digitar há quanto tempo?
    ├── < 10s → Modo presente. Avatar respirando. Painéis atualizando.
    └── ≥ 10s → Modo iniciativa.
        ├── Empresário em tela de decisão?
        │   ├── SIM → Oferecer análise adicional.
        │   └── NÃO → Sugerir próximo assunto.
        ├── Novo insight disponível?
        │   ├── SIM → "Encontrei algo interessante..."
        │   └── NÃO → Aguardar.
        └── Empresário hesitando (campo vazio focado > 5s)?
            ├── SIM → "Está com dúvida sobre o que perguntar?"
            └── NÃO → Aguardar mais 5s e repetir ciclo.
```

---

## 9. Contratos de Comportamento (Resumo)

1. O Assistente nunca interrompe o empresário enquanto ele digita.
2. O Assistente sempre responde com ritmo (nunca instantâneo), exceto confirmações e erros.
3. O Assistente toma iniciativa após 10s de silêncio — antes disso, apenas está presente.
4. O Assistente se adapta ao tipo de tela: protagonista na conversa, coadjuvante no dashboard, disponível na configuração.
5. O Assistente nunca ocupa mais que 60% da tela ou 70% da altura da viewport.
6. O Assistente nunca desaparece completamente — o avatar mínimo é o ponto de ancoragem permanente.
7. Toda transição de estado dura 300ms com easing ease-out.
8. Mensagens longas (> 400 caracteres / 8 linhas) usam "Ver mais".
9. O silêncio do Assistente é ativo: avatar respira, painéis atualizam, Centro de Decisão processa.
10. O Assistente hesita antes de insights importantes — 1200ms de delay inicial para comunicar "isto é relevante".
