# Mapa Cognitivo Vivo

## 1. Conceito

Painel lateral que expõe em tempo real o que o Motor Cognitivo está aprendendo durante a conversa com o empresário. Não é um gráfico decorativo — é a representação visual do estado interno do motor: conhecimento acumulado, hipóteses formadas, confiança calculada, lacunas identificadas.

O mapa existe para que o empresário confie no diagnóstico porque vê como ele é construído.

---

## 2. Posicionamento na Tela

### Sidebar direita expansível

- **Estado recolhido:** ícone flutuante no canto inferior direito (cérebro/grafos) com indicador de atividade (pulsação sutil quando o motor está processando)
- **Estado expandido:** sidebar de 320px ocupando a borda direita, sobrepondo o conteúdo principal com backdrop semi-transparente
- **Responsivo:** em mobile (<768px), ocupa tela inteira como modal com swipe-to-dismiss
- **Âncora visual:** o mapa é "puxado" pelo canto direito, como se fosse um bloco de notas que o motor está rabiscando

### Hierarquia visual dentro da sidebar

```
[Topo]   Nome do empresário + empresa
         Indicador de sessão ativa (bolinha verde pulsante)

[Meio]   BARRAS DE CONHECIMENTO (5 áreas)
         → Empresa, Financeiro, Clientes, Equipe, Operação
         → Cada barra com label, percentual, ícone, cor

         CARDS DE HIPÓTESE (roláveis)
         → Até 3 cards visíveis, scroll se houver mais
         → Cada card: título, confiança, resumo, botão "Explorar"

         LACUNAS ENCONTRADAS
         → Lista vertical com ícone de alerta suave
         → Cada lacuna: o que falta + sugestão de pergunta

[Base]   CONFIANÇA GERAL DO DIAGNÓSTICO (%)
         → Anel circular animado
         → Abaixo: "Próximas descobertas" (previsão textual)
```

---

## 3. Conhecimento Adquirido — Barras por Área

### Definição

São 5 áreas de conhecimento que o motor mapeia. Cada uma representa um domínio de informação sobre a empresa.

| Área | Cor | Ícone | O que mede |
|---|---|---|---|
| Empresa | #6366F1 (Índigo) | building | Dados cadastrais, porte, segmento, modelo de negócio, maturidade digital |
| Financeiro | #10B981 (Esmeralda) | dollar-sign | Faturamento, margem, fluxo de caixa, custos, sazonalidade, ticket médio |
| Clientes | #F59E0B (Âmbar) | users | Perfil de clientes, concentração, NPS, retenção, ciclo de venda, canais |
| Equipe | #EF4444 (Vermelho) | user-check | Headcount, hierarquia, delegação, dependência do proprietário, turnover |
| Operação | #8B5CF6 (Violeta) | settings | Processos críticos, sistemas, gargalos operacionais, automatização |

### Comportamento

- Cada barra começa em 0% e cresce conforme o empresário responde perguntas daquela área
- Crescimento não é linear: perguntas estratégicas valem mais que perguntas cadastrais
- Uma barra só atinge 100% quando o motor tem informação suficiente para formar um diagnóstico sólido naquela área
- A barra tem micro-animação de preenchimento: ondas suaves que sobem da base ao topo (duração ~800ms)
- Abaixo de cada barra, um texto opcional: "Falta perguntar sobre [tópico específico]" — gerado dinamicamente

### Gatilhos de crescimento

| Evento | Ganho típico |
|---|---|
| Resposta direta a pergunta da área | +8% a +15% |
| Informação voluntária relevante | +5% a +10% |
| Confirmação de hipótese | +3% a +5% |
| Dado numérico concreto | +10% a +20% (bônus) |
| Resposta evasiva/ignorada | 0% (motor registra como lacuna) |

---

## 4. Hipóteses Atuais

### O que são

Conjecturas que o Motor Cognitivo forma ao cruzar dados disponíveis. Aparecem como cards na seção central do mapa.

### Card de hipótese

```
┌─────────────────────────────────────────────┐
│ [Ícone da área] HIPÓTESE                     │
│ ─────────────────────────────────────────── │
│ Você pode ter dependência excessiva do seu   │
│ proprietário nas decisões do dia a dia.      │
│                                              │
│ [Barra de confiança] ████████░░ 72%          │
│                                              │
│ [Explorar] [Ignorar]                         │
└─────────────────────────────────────────────┘
```

### Comportamento

- Hipótese nasce com confiança mínima (40-50%) e sobe ou desce conforme novas informações
- Se confiança > 80%, card ganha borda verde e texto "Evidências suficientes"
- Se confiança < 30% por mais de 3 interações, card desaparece silenciosamente
- Cards entram com animação fade-in + slide-up (300ms) e saem com fade-out + scale-down (200ms)
- Máximo de 5 cards simultâneos — se exceder, os de menor confiança são arquivados

### Interação

- **Clicar em "Explorar":** motor pergunta especificamente sobre aquela hipótese, aprofundando
- **Clicar em "Ignorar":** motor abaixa prioridade da hipótese (não pergunta de novo sobre o mesmo tema por 3 turnos)
- **Clicar na barra de confiança:** tooltip mostra quais evidências sustentam aquele percentual

---

## 5. Confiança Atual

### Indicador principal

Anel circular no rodapé do mapa. O arco se preenche conforme o motor ganha confiança no diagnóstico geral.

### Faixas de confiança

| Percentual | Estado | Cor | Mensagem |
|---|---|---|---|
| 0-20% | Exploratório | Cinza | "Ainda estou conhecendo sua empresa" |
| 20-50% | Hipóteses iniciais | Azul | "Já tenho algumas suspeitas" |
| 50-75% | Em verificação | Âmbar | "Verificando hipóteses com dados" |
| 75-90% | Diagnóstico em formação | Verde claro | "Diagnóstico começando a tomar forma" |
| 90-100% | Diagnóstico sólido | Verde escuro | "Tenho confiança no diagnóstico" |

### Composição da confiança

Não é uma nota subjetiva. É calculada por:

1. **Cobertura de áreas** (peso 40%) — quantas das 5 áreas têm pelo menos 70% de preenchimento
2. **Consistência** (peso 30%) — respostas do empresário não contradizem umas às outras
3. **Profundidade** (peso 20%) — qualidade das informações (dados numéricos > descrições qualitativas)
4. **Validação cruzada** (peso 10%) — hipóteses confirmadas por múltiplas fontes de informação

### Animação

O anel não pula de 30% para 70% instantaneamente. Ele percorre o caminho com easing ease-out, duração proporcional à diferença (mínimo 500ms, máximo 2s).

---

## 6. Lacunas Encontradas

### O que são

Tópicos que o motor identificou como necessários para o diagnóstico mas ainda não foram abordados.

### Formato

```
┌─────────────────────────────────────────────┐
│ [Alerta] 2 lacunas identificadas              │
│                                              │
│ ● Não sei qual seu ticket médio              │
│   💡 "Perguntar sobre ticket médio"           │
│                                              │
│ ● Não sei quantos clientes ativos você tem   │
│   💡 "Perguntar sobre base de clientes"       │
└─────────────────────────────────────────────┘
```

### Comportamento

- Lacuna aparece assim que o motor percebe que precisa da informação (ex: empresário mencionou "faturamento" mas não disse valor)
- Se a lacuna persiste por mais de 5 turnos, ela sobe de prioridade (ícone muda para laranja)
- Quando o empresário supre a lacuna, ela é riscada com animação e move para "histórico de lacunas preenchidas"
- Lacunas têm impacto direto na confiança: cada lacuna não preenchida reduz -3% no indicador geral

---

## 7. Próximas Descobertas

### Previsão textual

Rodapé do mapa, abaixo do anel de confiança. Texto gerado pelo motor com base no que ele planeja investigar a seguir.

### Exemplos

- "Vou explorar a relação entre sazonalidade e fluxo de caixa"
- "Quero entender melhor como sua equipe está estruturada"
- "Pretendo cruzar seu ticket médio com concentração de clientes"

### Comportamento

- Atualizado após cada resposta do empresário
- Se o motor está "processando" (assíncrono), o texto mostra reticências pulsantes: "Analisando sua resposta..."
- Texto tem limite de 120 caracteres para manter legibilidade

---

## 8. Atualizações Síncronas vs Assíncronas

### Síncronas (tempo real)

Ocorrem durante a conversa ativa, enquanto o empresário responde perguntas.

- Barras de conhecimento: atualizam imediatamente após cada resposta
- Cards de hipótese: podem surgir ou desaparecer instantaneamente
- Confiança: recalcula a cada resposta
- Lacunas: aparecem/desaparecem em tempo real

Cada atualização síncrona tem micro-animação de no máximo 300ms.

### Assíncronas (processamento em background)

Ocorrem quando o motor está processando dados, cruzando informações, ou executando análise mais profunda.

- O mapa exibe um estado "Processando..." com efeito de varredura (scanline) sobre as áreas sendo analisadas
- Atualizações assíncronas entram em lote: o motor acumula mudanças e aplica todas de uma vez, com animação sequencial (cada barra uma após a outra, 200ms de intervalo)
- Duração máxima do estado assíncrono: 8 segundos. Se exceder, fallback para mensagem "Ainda estou cruzando dados..."

### Prioridade de atualização

1. Mudanças na hipótese ativa (se o empresário está explorando uma hipótese, o card correspondente atualiza primeiro)
2. Confiança geral
3. Barras de conhecimento
4. Lacunas
5. Próximas descobertas

---

## 9. Estados do Mapa

### Estado Vazio (primeiro acesso)

- Sidebar mostra mensagem: "Vou conhecendo sua empresa conforme você responde."
- Nenhuma barra preenchida
- Anel de confiança em 0% com texto "Aguardando primeiras respostas"
- Todas as 5 áreas aparecem em cinza com outline tracejado

### Estado Preenchendo (conversa ativa)

- Barras preenchendo gradualmente
- Cards de hipótese surgindo e sumindo
- Confiança oscilando (normal — significa que o motor está verificando)
- Lacunas aparecendo e sendo riscadas

### Estado Completo (diagnóstico formado)

- Todas as barras >80%
- Confiança >90%
- "Diagnóstico concluído" no topo da sidebar
- Sugestão: "Quer que eu gere um relatório completo?"
- Mapa reduz automaticamente para o estado recolhido após 10 segundos de inatividade

### Estado Revisando (empresário corrige ou adiciona info)

- Disparado quando o empresário diz "isso mudou" ou "na verdade não é bem assim"
- Barra da área afetada pulsa em amarelo por 2 segundos
- Confiança recua proporcionalmente (-5% a -15%)
- Hipóteses relacionadas são rebaixadas para "em verificação"
- Lacunas podem reaparecer
- Mensagem: "Entendi. Vou ajustar meu diagnóstico."

---

## 10. Interação do Empresário com o Mapa

### Ações possíveis

| Ação | Resultado |
|---|---|
| Clicar em hipótese (Explorar) | Motor faz pergunta específica sobre a hipótese |
| Clicar em lacuna | Motor sugere pergunta que preencheria a lacuna |
| Clicar na confiança | Tooltip com breakdown: "2 áreas completas, 3 lacunas abertas..." |
| Arrastar barra de conhecimento | NADA — barra não é interativa. Apenas informativa |
| Passar mouse sobre área | Tooltip: "Conhecimento em [Área]: 65%. Informações obtidas: ticket médio, margem, sazonalidade" |
| Clicar em "Ignorar" em hipótese | Hipótese arquivada, prioridade reduzida |
| Fechar sidebar | Botão no canto superior direito. Mapa volta a ícone flutuante |

### Feedback para cada interação

- Toda interação tem feedback háptico visual (mudança de cor, escala, brilho)
- Nenhuma interação quebra o fluxo da conversa — o motor processa em background e responde naturalmente
- Se o empresário clica em múltiplas hipóteses, o motor prioriza a última clicada

---

## 11. Mudanças Após Cada Pergunta Respondida

### Fluxo de 1 ciclo de resposta

1. Empresário responde pergunta
2. Motor processa resposta (100-300ms para respostas simples, até 3s para respostas complexas)
3. **Fase 1 — Reconhecimento (0-500ms):** motor identifica qual área a resposta pertence. Mapa ilumina área correspondente.
4. **Fase 2 — Assimilação (500ms-1.5s):** barra da área cresce. Hipóteses relacionadas são recalculadas.
5. **Fase 3 — Síntese (1.5s-3s):** confiança geral atualizada. Novas lacunas identificadas. Próximas descobertas recalculadas.
6. **Fase 4 — Estabilização (3s-4s):** animações concluem. Mapa estabiliza. Motor prepara próxima pergunta.

Cada fase tem feedback visual no mapa (cores, animações, transições).

---

## 12. Cores, Formas e Animações

### Paleta

- **Fundo da sidebar:** #0F172A (slate-900) com opacidade 95%
- **Cards de hipótese:** #1E293B (slate-800) com borda sutil #334155
- **Texto primário:** #F8FAFC (slate-50)
- **Texto secundário:** #94A3B8 (slate-400)
- **Barras de conhecimento:** cores específicas de cada área (ver tabela na seção 3)
- **Confiança (anel):** gradiente dinâmico conforme faixa (seção 5)
- **Destaque de interação:** #818CF8 (índigo-400)

### Animações

| Elemento | Animação | Duração | Easing |
|---|---|---|---|
| Barra de conhecimento | Preenchimento com ondulação | 800ms | ease-out |
| Card de hipótese (entrada) | Fade-in + slide-up | 300ms | ease-out |
| Card de hipótese (saída) | Fade-out + scale 0.95 | 200ms | ease-in |
| Anel de confiança | Crescimento de arco | 500ms-2s | ease-out |
| Lacuna preenchida | Riscado + fade | 400ms | ease-out |
| Estado "Processando" | Scanline varredura | 1.5s/ciclo | linear, loop |
| Pulsação (ícone recolhido) | Opacity 0.6->1.0 | 2s/ciclo | ease-in-out, loop infinito enquanto ativo |

### Formas

- **Barras:** cantos arredondados (4px), gradiente sutil da cor base para tom 20% mais claro
- **Cards:** bordas arredondadas (8px), sombra suave (0 4px 6px rgba(0,0,0,0.3))
- **Confiança:** anel circular com stroke-width 6px, fundo circular escuro
- **Ícones:** line icons, stroke-width 1.5px, consistentes com Phosphor ou Lucide

---

## 13. Regras de Negócio

- O mapa NUNCA mente. Se o motor não sabe algo, a barra não passa de 0%.
- O mapa NUNCA mostra animação decorativa sem significado. Toda animação corresponde a processamento real.
- Se o motor está ocioso (empresário não responde há mais de 5 minutos), o mapa reduz para estado "dormente": cores mais escuras, animações pausadas.
- Ao retomar, o mapa "acorda" com animação de brilho crescente (1.5s).
- Dados do mapa não persistem entre sessões para o mesmo empresário — mas o histórico de conhecimento acumulado pode ser usado para "aquecimento" inicial.