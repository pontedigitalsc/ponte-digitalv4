# Linguagem Visual Oficial da Ponte Digital

> *Este documento define a personalidade visual da Ponte Digital — não apenas cores, mas a identidade completa que comunica CALMA, DOMÍNIO, INTELIGÊNCIA, CLAREZA e SOFISTICAÇÃO SILENCIOSA.*

---

## 1. Personalidade Visual

### Referências de personalidade

| Referência | O que nos inspira | Onde somos diferentes |
|---|---|---|
| **Stripe** | Precisão cirúrgica, confiança institucional | Somos mais acolhedores, menos frios |
| **Apple** | Simplicidade que elimina atrito, cuidado com cada pixel | Somos menos minimalistas, mais expressivos na comunicação |
| **Linear** | Velocidade que parece antecipação, UI que não atrapalha | Somos mais contemplativos, menos utilitários |
| **Notion** | Organização que liberta, flexibilidade com estrutura | Somos mais direcionados, menos abertos |

### Nossa personalidade em uma frase

> **A Ponte Digital parece uma inteligência trabalhando silenciosamente ao lado do empresário. Nunca chama atenção para si mesma. Chama atenção para o que descobriu.**

### Atributos de personalidade

| Atributo | Manifestação visual |
|---|---|
| **CALMA** | Espaço generoso, transições suaves, cores silenciadas, sem urgência falsa |
| **DOMÍNIO** | Tipografia precisa, alinhamento impecável, hierarquia clara, sem hesitação visual |
| **INTELIGÊNCIA** | Informação bem hierarquizada, conexões visíveis, o dado certo no lugar certo |
| **CLAREZA** | Branco abundante, labels inequívocas, uma ideia por vez |
| **SOFISTICAÇÃO SILENCIOSA** | Cores sóbrias, sem enfeites, sem gradientes chamativos, sem texturas falsas |

---

## 2. Cores

### 2.1 Paleta Principal — 3 cores

| Cor | Hex | Token | Uso principal |
|---|---|---|---|
| **Azul Profundo** | `#0A1F2E` | `--color-primary` | Fundo de headers, títulos principais, superfícies de alto impacto |
| **Azul Tranquilo** | `#2B6B9E` | `--color-secondary` | Ações primárias, links, bordas ativas, elementos interativos |
| **Branco Oceano** | `#F4F6F8` | `--color-bg` | Fundo de páginas, superfícies principais |

Estas 3 cores carregam 80% da identidade visual. Toda tela é predominantemente Branco Oceano com elementos estruturantes em Azul Profundo e acentos em Azul Tranquilo.

**Justificativa:** Azul Profundo transmite domínio e estabilidade. Azul Tranquilo é acessível sem ser infantil. Branco Oceano é mais quente que branco puro (#FFFFFF) — reduz fadiga visual em sessões prolongadas.

### 2.2 Paleta de Apoio — 5 cores

| Cor | Hex | Token | Uso |
|---|---|---|---|
| **Cinza Texto** | `#2D3748` | `--color-text` | Texto corrido, labels, parágrafos |
| **Cinza Suave** | `#718096` | `--color-text-muted` | Metadados, subtítulos, hints |
| **Cinza Borda** | `#E2E8F0` | `--color-border` | Linhas divisórias, bordas de cards, separadores |
| **Azul Gelo** | `#EBF4FF` | `--color-surface-active` | Hover, seleção, realce sutil |
| **Preto Suave** | `#1A202C` | `--color-text-strong` | Títulos, valores numéricos importantes |

Estas 5 cores apoiam sem competir. Nunca superam as cores principais em área ou destaque.

### 2.3 Paleta Semântica — 5 cores

| Significado | Hex | Token | Quando usar |
|---|---|---|---|
| **Sucesso** | `#2F855A` | `--color-success` | Meta alcançada, progresso concluído, indicador positivo |
| **Erro** | `#C53030` | `--color-error` | Problema grave, dado inconsistente, falha confirmada |
| **Alerta** | `#D69E2E` | `--color-warning` | Atenção necessária, quase no limite, revisão recomendada |
| **Insight** | `#6B46C1` | `--color-insight` | Descoberta nova, padrão identificado, conexão inesperada |
| **Confiança** | `#2B6B9E` | `--color-trust` | Score de confiança, nível de convicção, dado validado |

### 2.4 Regras de uso — estado cognitivo

| Estado cognitivo do empresário | Cor dominante | Por quê |
|---|---|---|
| Explorando / aprendendo | Azul Tranquilo | Cor convidativa, segura, não alarmante |
| Decidindo | Azul Profundo | Cor de autoridade, decisão, firmeza |
| Preocupado | Branco Oceano + Cinza Texto | Neutralidade, sem cor que amplifique ansiedade |
| Confiante | Insight (roxo) para novidades | Roxo = descoberta, algo novo merece atenção |
| Em alerta | Amarelo (alerta) + fundo neutro | Amarelo alerta sem o pânico do vermelho |
| Em erro | Vermelho (erro) | Apenas quando algo está realmente errado |

### 2.5 Proporção

| Camada | Proporção | O que cobre |
|---|---|---|
| **Principal** (Azul Profundo + Branco Oceano) | 80% | Fundos, superfícies, tipografia base |
| **Apoio** (Cinzas + Azul Gelo) | 15% | Estrutura, separação, hierarquia sutil |
| **Destaque** (Azul Tranquilo + semânticas) | 5% | Ações, insights, indicadores |

### 2.6 O que NÃO fazer com cores

- ❌ Nunca usar a cor primária (Azul Profundo) para indicar **sucesso** — sucesso é verde.
- ❌ Nunca usar a cor de **erro** (vermelho) para indicar **alerta** — alerta é amarelo.
- ❌ Nunca usar a cor de **insight** (roxo) para ações primárias — roxo é para descoberta, não para cliques.
- ❌ Nunca usar mais de uma cor semântica no mesmo bloco visual.
- ❌ Nunca usar cores vibrantes em áreas que ocupem mais de 10% da tela.
- ❌ Nunca usar preto puro (#000000) — sempre usar Preto Suave.
- ❌ Nunca usar branco puro (#FFFFFF) como fundo de tela — sempre Branco Oceano.

---

## 3. Tipografia

### 3.1 Fonte Principal: **Inter**

**Justificativa:** Inter foi projetada especificamente para interfaces de tela. Sua altura-x generosa garante legibilidade em tamanhos pequenos. Seus terminais abertos transmitem clareza. O desenho equilibrado entre humanista e geométrico comunica simultaneamente acolhimento (curvas suaves) e precisão (construção geométrica). Inter não é uma fonte da moda — é uma fonte para o longo prazo, consistente com nossa personalidade de "sofisticação silenciosa".

Fallback: `system-ui, -apple-system, Segoe UI, sans-serif`

### 3.2 Fonte de Apoio: **JetBrains Mono**

Para dados, números, código, métricas, identificadores técnicos. O peso monoespaçado comunica precisão — cada caractere ocupa seu espaço exato, sem enfeites.

### 3.3 Escala Tipográfica

| Token | Tamanho | Line-height | Onde usar |
|---|---|---|---|
| `--text-xs` | 12px | 16px | Metadados, tags, timestamps, labels secundários |
| `--text-sm` | 14px | 20px | Texto de apoio, subtítulos, hint text |
| `--text-md` | 16px | 24px | **Base** — texto corrido, parágrafos, corpo |
| `--text-lg` | 20px | 28px | Subtítulos, cards, chamadas |
| `--text-xl` | 24px | 32px | Títulos de seção, headlines secundários |
| `--text-2xl` | 32px | 40px | Títulos de página, resultados principais |
| `--text-3xl` | 48px | 56px | Hero, landing, momentos de alto impacto |

### 3.4 Pesos

| Peso | Token | Onde usar | Onde NÃO usar |
|---|---|---|---|
| Light (300) | `--weight-light` | Títulos grandes (2xl+), números grandes | ❌ Texto corrido, labels, botões |
| Regular (400) | `--weight-regular` | Texto corrido, parágrafos, labels | ❌ Títulos, dados importantes |
| Medium (500) | `--weight-medium` | Subtítulos, botões, links, enfases sutis | ❌ Texto corrido longo |
| Semibold (600) | `--weight-semibold` | Títulos, cabeçalhos, valores de destaque | ❌ Parágrafos, labels |
| Bold (700) | `--weight-bold` | Apenas números muito grandes, CTAs fortes | ❌ Texto corrido (sempre) |

### 3.5 Regras tipográficas

- **Nunca usar bold em texto corrido.** Texto corrido (parágrafos, explicações) usa sempre Regular. Bold quebra o fluxo de leitura e a respiração visual.
- **Nunca usar Light em labels.** Botões, labels, inputs e elementos interativos exigem Medium ou Semibold para legibilidade.
- **Nunca usar mais de 2 pesos na mesma tela.** A hierarquia tipográfica deve ser obtida preferencialmente por tamanho e cor, não por peso.
- **Máximo de 2 tamanhos de título por tela.** Um título principal e um subtítulo — nunca mais.
- **Inter sempre limpa.** Sem letter-spacing em texto corrido. Letter-spacing de +0.02em apenas em labels e uppercase.
- **Nunca usar uppercase em parágrafos.** Uppercase apenas em labels de formulário, tags e badges.

### 3.6 O que a tipografia transmite

- **Clareza:** cada caractere é imediatamente reconhecível — sem ambiguidade entre `l`, `1`, `I`.
- **Sofisticação:** a fonte não chama atenção para si — o conteúdo é o protagonista.
- **Modernidade atemporal:** Inter não segue moda passageira. É uma fonte construída para durar.

---

## 4. Forma e Geometria

### 4.1 Border Radius

| Token | Valor | Onde aplicar |
|---|---|---|
| `--radius-sm` | 4px | Inputs, botões pequenos, badges, tags |
| `--radius-md` | 8px | Cards, modais, painéis, dropdowns |
| `--radius-lg` | 12px | Cards grandes, containers de destaque |
| `--radius-xl` | 16px | Modais grandes, seções hero |

**Regras:**
- Todos os cantos do mesmo elemento devem ter o mesmo raio (exceto quando explicitamente definido).
- **Nunca usar bordas perfeitamente redondas** (50%) em elementos retangulares — exceto em avatares e indicadores de status.
- **Nunca misturar radius diferentes no mesmo card** — consistência visual acima de tudo.
- Elementos interativos (botões, inputs) usam sempre `--radius-sm`. Cards usam `--radius-md`. A diferença sinaliza interatividade.

### 4.2 Ícones

| Propriedade | Especificação |
|---|---|
| **Estilo** | Line (outline), traço consistente |
| **Stroke width** | 1.5px (Lucide icons ou equivalente) |
| **Tamanho padrão** | 20x20px |
| **Tamanho pequeno** | 16x16px (dentro de inputs, tags, metadados) |
| **Tamanho grande** | 24x24px (CTAs, cards de feature) |
| **Cor** | Herda a cor do texto do elemento pai (nunca cor fixa) |
| **Preenchimento** | Nunca. Apenas outline. Exceção: indicadores de status (sucesso/erro/alerta) |

**Regras:**
- **Nunca usar ícones complexos** (mais de 3 elementos visuais). Preferir ícones que comuniquem o conceito em 1-2 traços.
- **Nunca misturar famílias de ícones.** Todas as fontes de ícones devem ser da mesma coleção.
- **Nunca usar ícones animados** (a menos que seja explicitamente um loading state).
- Ícone sempre alinhado verticalmente ao centro do texto que acompanha.
- Espaçamento entre ícone e texto: 8px.

### 4.3 Ilustrações

A Ponte Digital utiliza **ilustrações conceituais e minimalistas** quando necessário, seguindo estes princípios:

- **Apenas para landing e telas vazias (empty states).** Nunca para comunicar dados.
- **Estilo:** line art com preenchimento seletivo, paleta reduzida (máximo 3 cores da paleta principal).
- **Figura humana:** estilizada, sem traços faciais detalhados — universal e atemporal.
- **Nunca usar ilustrações stock, fotos de banco de imagens, ou clip art.**
- **Preferir metáforas visuais** (pontes, conexões, mapas, constelações, linhas que se encontram).
- **Nunca usar ilustrações animadas** — a animação rouba atenção do conteúdo.

Se não há orçamento para ilustrações personalizadas: usar espaço negativo e tipografia em vez de ilustração genérica.

### 4.4 O que NÃO fazer com forma e geometria

- ❌ Ícones muito complexos (acima de 3 traços/elementos).
- ❌ Cantos inconsistentes entre elementos do mesmo tipo.
- ❌ Sombras exageradas (sombra máxima: box-shadow sutil com opacidade < 10%).
- ❌ Gradientes como fundo de elementos funcionais.
- ❌ Bordas duplas ou outline + shadow no mesmo elemento.
- ❌ Elementos com proporção diferente em contextos iguais.

---

## 5. Espaçamento e Grade

### 5.1 Sistema de 8px

A base do espaçamento é 8px. Todos os valores de margin, padding e gap devem pertencer a esta escala:

| Token | px | Uso típico |
|---|---|---|
| `--space-0` | 0 | — |
| `--space-0.5` | 4px | Micro-ajustes, gaps internos muito pequenos |
| `--space-1` | 8px | Gap entre ícone e texto, padding de elementos pequenos |
| `--space-1.5` | 12px | Padding de inputs, gap entre label e input |
| `--space-2` | 16px | **Base** — gap entre cards, padding de containers |
| `--space-3` | 24px | Padding de seções, gap entre seções |
| `--space-4` | 32px | Margem entre blocos de conteúdo, padding de página |
| `--space-6` | 48px | Seções grandes, separação entre telas |
| `--space-8` | 64px | Padding de landing, hero sections |
| `--space-12` | 96px | Seções muito grandes, breathe room |
| `--space-16` | 128px | Máximo — momentos de transição, finais de fluxo |

**Regra:** Nunca usar valores fora da escala. Se um espaçamento não parece correto com a escala, ajuste o layout, não o valor.

### 5.2 Grade de 12 colunas

| Propriedade | Valor |
|---|---|
| **Número de colunas** | 12 |
| **Gutter** | 24px (space-3) |
| **Margem lateral** | 24px (space-3) em mobile, 48px (space-6) em desktop |
| **Breakpoints** | Mobile: < 768px, Tablet: 768-1024px, Desktop: > 1024px |

### 5.3 Largura máxima de conteúdo

- **1280px** — largura máxima de qualquer container de página.
- O conteúdo deve ser centralizado horizontalmente.
- Em telas maiores que 1280px, o espaço extra permanece vazio (nunca estica o conteúdo).

### 5.4 Densidade por contexto

| Contexto | Densidade | Princípio |
|---|---|---|
| **Conversa** (IA + empresário) | Folgado (padding space-4+, line-height 1.6) | Cada mensagem precisa respirar. O empresário lê e reflete. |
| **Dashboard** | Compacto (padding space-2, line-height 1.4) | Informação densa, mas organizada. Máximo de dados visíveis sem scroll. |
| **Landing / Hero** | Muito folgado (padding space-8+, scale grande) | Primeira impressão. O espaço comunica confiança. |
| **Formulário / Configuração** | Médio (padding space-2 a space-3) | Funcional, mas não apertado. Preenche sem sufocar. |
| **Lista / Tabela** | Compacto (padding space-1 a space-2) | Eficiência de leitura. Dados alinhados, densos, escaneáveis. |

---

## 6. Sombras e Elevação

| Token | Valor | Onde usar |
|---|---|---|
| `--shadow-sm` | `0 1px 2px rgba(0,0,0,0.04)` | Cards em estado normal |
| `--shadow-md` | `0 2px 8px rgba(0,0,0,0.06)` | Cards em hover, modais pequenos |
| `--shadow-lg` | `0 4px 16px rgba(0,0,0,0.08)` | Modais, dropdowns, elementos flutuantes |
| `--shadow-xl` | `0 8px 32px rgba(0,0,0,0.10)` | Toasts, notificações, elementos de alto destaque |

**Regra:** Sombras são para indicar profundidade, não para decorar. Se um elemento não precisa parecer elevado, não use sombra. Preferir bordas sutis a sombras sempre que possível.

---

## 7. Motion e Transições

| Propriedade | Valor | Onde usar |
|---|---|---|
| **Transição padrão** | `150ms ease-out` | Hover, foco, micro-interações |
| **Transição de painel** | `300ms ease-in-out` | Abrir/fechar painéis laterais |
| **Transição de página** | `400ms ease-in-out` | Transições entre rotas |
| **Easing** | `cubic-bezier(0.4, 0, 0.2, 1)` | Curva padrão (deceleração suave) |

**Regras de motion:**
- **Nunca mais de uma animação por vez.**
- **Mínimo de 200ms entre animações consecutivas.**
- **Animações não podem ocupar mais de 20% da tela** (exceto loading inteligente, até 40%).
- **Preferir fade + translate** a scale, rotação ou efeitos complexos.
- **Nunca usar bounce, spring ou easing elástico** — viola a personalidade de CALMA.

---

## 8. Checklist de consistência visual

Antes de considerar um componente ou página pronto, verificar:

- [ ] Todas as cores pertencem à paleta oficial?
- [ ] A proporção 80/15/5 de cores está respeitada?
- [ ] As cores semânticas estão no contexto correto?
- [ ] A tipografia usa a escala correta e pesos adequados?
- [ ] Não há bold em texto corrido?
- [ ] Os border radius são consistentes com o tipo de elemento?
- [ ] Os ícones são da mesma família e stroke width?
- [ ] O espaçamento segue a escala de 8px?
- [ ] Não há mais de 2 pesos tipográficos na tela?
- [ ] A densidade corresponde ao contexto (conversa vs dashboard)?
- [ ] Nenhuma cor semântica foi usada para função estrutural?
- [ ] O elemento focal está claro? (ver SISTEMA_OFICIAL_DE_ATENCAO.md)

---

*Este documento é complementar ao SISTEMA_OFICIAL_DE_RITMO.md, SISTEMA_OFICIAL_DE_RESPIRACAO.md e SISTEMA_OFICIAL_DE_ATENCAO.md. Nenhum destes documentos existe isoladamente — todos derivam da mesma personalidade: CALMA + DOMÍNIO + INTELIGÊNCIA + CLAREZA + SOFISTICAÇÃO SILENCIOSA.*
