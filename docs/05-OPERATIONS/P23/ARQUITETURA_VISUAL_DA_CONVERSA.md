# Arquitetura Visual da Conversa

## Propósito

Definir a hierarquia visual de todos os estados da interface da Ponte Digital, garantindo que cada elemento ocupe o espaço correto na percepção do empresário em cada momento da jornada.

## Princípios Visuais

1. **Hierarquia Cognitiva**: o que é mais importante para a decisão atual deve dominar o campo visual
2. **Movimento com Propósito**: cada animação comunica um estado mental da IA
3. **Respiração Visual**: espaços vazios são ferramentas de comunicação, não desperdício
4. **Consistência de Estado**: cada estado (pensando, aprendendo, analisando) tem identidade visual única
5. **Progressão Natural**: o olho do empresário é guiado — nunca abandonado

## Estados da Tela

### E1 — Landing (Pré-login)

```
+----------------------------------------------+
|                                              |
|  [logo]  Ponte Digital                       |
|                                              |
|       "A inteligência da sua empresa"        |
|                                              |
|  [campo email]  [campo senha]                |
|  [botão Entrar]                              |
|                                              |
|  "Primeira vez? Conhecer a Ponte"            |
|                                              |
|  [footer minimalista]                        |
+----------------------------------------------+
```

**Hierarquia visual:**
1. Logo + nome (identidade)
2. Tagline (promessa)
3. Formulário de entrada (ação)
4. Call-to-action secundário (exploração)

**Emoções:** segurança, seriedade, expectativa positiva

**Cores:** fundo escuro ou muito claro com acento na cor primária da Ponte (a definir)

### E2 — Primeiro Login (Onboarding Cognitivo)

```
+----------------------------------------------+
|  [logo minimalista]           [avatar admin]  |
|                                              |
|  +----------------------------------------+  |
|  |  "Bem-vindo. Vou conhecer sua empresa." |  |
|  |  "São algumas perguntas iniciais."      |  |
|  |  ["Vamos começar"]                      |  |
|  +----------------------------------------+  |
|                                              |
|  [indicador: 0% cobertos]                    |
|  [mapa cognitivo: vazio]                      |
+----------------------------------------------+
```

**Hierarquia visual:**
1. Saudação da IA (texto principal)
2. Explicação do que vai acontecer (texto secundário)
3. Botão de ação (convite)
4. Indicadores de progresso (antecipação)

**Transição de E1 para E2:** fade suave, a IA "aparece" gradualmente

### E3 — Conversa (Estado Ativo)

```
+----------------------------------------------+
|  [logo mini]                [mapa cognitivo]  |
|                              [confiança: 23%] |
|  +----------------------------------------+  |
|  | IA: "Quantos funcionários tem hoje?"   |  |
|  |                                        |  |
|  | Você: "12"                             |  |
|  |  [✓ Recebido]                         |  |
|  |                                        |  |
|  | IA: [pensando...]                      |  |
|  |  • Relacionando dados                  |  |
|  |  • Comparando padrões                  |  |
|  |                                        |  |
|  | IA: "Percebo algo interessante..."     |  |
|  +----------------------------------------+  |
|  [campo de texto] [enviar]                  |
|                                              |
|  [cobertura: 15%] [insights: 0] [lacunas: 3]|
+----------------------------------------------+
```

**Hierarquia visual:**
1. Mensagem atual da IA (centro, dominante)
2. Histórico recente (acima, semi-opaco)
3. Campo de resposta (base, pronto para ação)
4. Painel cognitivo (lateral, informação periférica)
5. Indicadores de progresso (rodapé, monitoramento)

**Regras de foco:**
- Última mensagem da IA sempre visível no centro
- Mensagens antigas sobem e ganham opacidade reduzida (70% → 40% → 20%)
- Campo de texto sempre visível, sempre acessível
- Painel cognitivo é periférico — não compete com a conversa

### E4 — IA Pensando

```
+----------------------------------------------+
|                                              |
|  +----------------------------------------+  |
|  | [última mensagem do empresário...]     |  |
|  |                                        |  |
|  | ● ● ●                                  |  |
|  | "Relacionando informações..."          |  |
|  | [progresso sutil]                      |  |
|  |                                        |  |
|  | [mapa cognitivo: animação de busca]    |  |
|  +----------------------------------------+  |
|                                              |
|  [campo desabilitado]                        |
+----------------------------------------------+
```

**Regras:**
- Indicador de pensamento NUNCA é um spinner genérico
- Sempre mostra o que está sendo processado
- Mapa cognitivo reage em tempo real (buscas, conexões)
- Campo desabilitado visualmente (não pode enviar enquanto IA pensa)
- Duração máxima sem resposta: 8s (após isso, mostra progresso detalhado)

### E5 — Insight (Descoberta)

```
+----------------------------------------------+
|                                              |
|  +----------------------------------------+  |
|  | IA: "Encontrei um padrão interessante"  |  |
|  |  ✦                                   |  |
|  |  "Seus clientes estão concentrados    |  |
|  |   em 2 segmentos. Isso é arriscado."  |  |
|  |                                        |  |
|  | [gráfico simples aparece]              |  |
|  |  [Distribuição de clientes]            |  |
|  |                                        |  |
|  | [confiança: 76%]                       |  |
|  +----------------------------------------+  |
|                                              |
|  [mapa: novo card de insight adicionado]     |
+----------------------------------------------+
```

**Hierarquia:**
1. Anúncio da descoberta (✦ + texto)
2. Evidência visual (gráfico, dado)
3. Indicador de confiança
4. Painel cognitivo se atualiza

**Animação:** Card de insight "pulsa" suavemente ao aparecer, confiança sobe com animação de preenchimento

### E6 — Resumo Parcial

```
+----------------------------------------------+
|  [resumo parcial]            [mapa completo]  |
|                                              |
|  +----------------------------------------+  |
|  | "Até agora, sua empresa:"              |  |
|  |                                        |  |
|  |  [3 áreas mapeadas]                    |  |
|  |  [2 insights gerados]                  |  |
|  |  [1 gargalo identificado]              |  |
|  |  [confiança média: 58%]               |  |
|  |                                        |  |
|  | ["Continuar análise"]                  |  |
|  | ["Ver dashboard parcial"]              |  |
|  +----------------------------------------+  |
|                                              |
+----------------------------------------------+
```

**Quando aparece:**
- A cada 5 perguntas respondidas
- Quando a IA precisa consolidar antes de avançar
- Se o empresário pedir "O que você sabe até agora?"

### E7 — Conclusão / Diagnóstico

```
+----------------------------------------------+
|  [diagnóstico completo]                       |
|                                              |
|  +----------------------------------------+  |
|  |  "Conheço sua empresa."                |  |
|  |                                        |  |
|  |  [barra de cobertura: 87%]             |  |
|  |  [confiança: 82%]                      |  |
|  |  [insights: 7]                         |  |
|  |  [lacunas: 2]                          |  |
|  |                                        |  |
|  |  "Principais descobertas:"             |  |
|  |  1. Dependência do proprietário        |  |
|  |  2. Concentração de clientes           |  |
|  |  3. Oportunidade de automatização      |  |
|  |                                        |  |
|  |  ["Ver dashboard completo"]            |  |
|  |  ["Agendar revisão"]                   |  |
|  +----------------------------------------+  |
|                                              |
+----------------------------------------------+
```

## Microestados Visuais

### Card de Mensagem

| Elemento | Especificação |
|---|---|
| Largura máxima | 720px (centralizado) |
| Padding | 24px vertical, 32px horizontal |
| Background | IA: tom neutro da marca (5% opacidade) / Empresário: tom acentuado (10% opacidade) |
| Border radius | 16px (IA) / 12px (empresário) |
| Sombra | Suave, apenas na mensagem ativa (IA) |
| Transição | Fade + slide up, 300ms ease-out |

### Tipografia

| Elemento | Fonte | Tamanho | Peso | Cor |
|---|---|---|---|---|
| Nome IA | System sans-serif | 14px | 600 | Primary |
| Mensagem IA | System sans-serif | 16px | 400 | Text primário |
| Dado / número | System sans-serif | 20px | 700 | Primary |
| Rótulo | System sans-serif | 12px | 500 | Text secundário |
| Timestamp | System sans-serif | 11px | 400 | Text terciário |
| Entrada usuário | System sans-serif | 16px | 400 | Text primário |
| Badge insight | System sans-serif | 13px | 600 | Acento |

### Cores por Estado Cognitivo

| Estado | Cor Primária | Cor Secundária | Badge |
|---|---|---|---|
| Pensando | Azul suave (#4A90D9) | Azul claro (#E8F0FE) | "Processando" |
| Analisando | Roxo (#7C3AED) | Roxo claro (#F3E8FF) | "Analisando" |
| Descobrindo | Verde (#059669) | Verde claro (#D1FAE5) | "Descoberta" |
| Duvidando | Âmbar (#D97706) | Âmbar claro (#FEF3C7) | "Verificando" |
| Confirmando | Azul escuro (#1E40AF) | Azul muito claro (#DBEAFE) | "Confirmado" |
| Concluindo | Verde escuro (#065F46) | Verde claro (#A7F3D0) | "Concluído" |

## Transições entre Telas

| Transição | Duração | Easing | Efeito |
|---|---|---|---|
| Login → Conversa | 600ms | ease-out | Fade + scale sutil |
| Pergunta → Resposta | 300-800ms* | ease-out | Slide up do card |
| Pensando → Insight | 500ms | ease-out | Revelação com destaque |
| Novo insight no painel | 400ms | ease-in-out | Badge aparece com fade |
| Confiança atualiza | 600ms | ease-out | Barra preenche suavemente |
| Resumo parcial aparece | 700ms | ease-out | Card expande de cima |

*Duração varia conforme confiança da IA (mais confiante = mais rápida)

## Responsivo

### Mobile (< 768px)

- Painel cognitivo colapsa em bottom sheet acessível por swipe up
- Mensagens ocupam largura total (margem 16px)
- Indicadores no topo compactos (apenas ícone + número)
- Campo de texto fixo no bottom (como chat nativo)

### Tablet (768-1024px)

- Painel cognitivo como sidebar colapsável (largura: 240px)
- Mensagens em largura reduzida (max 600px centralizado)
- Indicadores integrados ao topo

### Desktop (> 1024px)

- Layout três colunas: conversa (centro) + painel (direita) + histórico (esquerda opcional)
- Mensagens centralizadas com largura controlada
- Painel cognitivo completo com todos os indicadores visíveis

## Checklist de Consistência Visual

- [ ] Todos os estados da tela estão mapeados
- [ ] Cada estado tem hierarquia visual definida
- [ ] Microestados (pensando, insights) têm tratamento visual único
- [ ] Transições têm duração e easing especificados
- [ ] Responsivo: mobile, tablet, desktop
- [ ] Cores por estado cognitivo documentadas
- [ ] Tipografia hierarquizada por função
- [ ] Cards têm padding, border-radius e sombra consistentes
