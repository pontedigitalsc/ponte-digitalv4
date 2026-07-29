# SISTEMA OFICIAL DE ASSINATURA VISUAL

> **Propósito:** Definir os elementos únicos que fazem alguém reconhecer imediatamente: "Isto é Ponte Digital."
> **Fase:** V4 Founder — identidade em construção, mas as sementes são plantadas agora.
> **Data:** Julho 2026

---

## Regras de Assinatura

1. **Tem função** — cada elemento de assinatura serve a um propósito (nunca decorativo)
2. **Aparece no momento certo** — elementos de assinatura aparecem em momentos específicos (nunca o tempo todo)
3. **É sutil** — a identidade não precisa de logo gigante para ser reconhecida
4. **É consistente** — mesmos elementos em todas as plataformas (web, mobile, email)

---

## 1. O Anel de Confiança

**Elemento primário.** Um círculo que mostra o nível de confiança da IA em tempo real.

**Onde aparece**
- Conversa (ao lado da resposta da IA)
- Dashboard (no canto superior direito)
- Painel Cognitivo (ao lado de cada insight)

**Por que é único**
- Poucas interfaces mostram confiança em tempo real
- A maioria das IAs parece 100% confiante o tempo todo
- O Anel de Confiança humaniza a IA e constrói credibilidade

**Comportamento**
- Preenche no sentido horário conforme a confiança aumenta
- Varia de cor: vermelho (< 40%) → amarelo (40-70%) → verde (> 70%)
- Pulso suave quando a confiança está sendo recalculada
- Preenchimento total + brilho quando atinge confiança máxima

**Métrica associada**
- Abertura do anel (ângulo preenchido) = nível de confiança da última resposta
- Cor = nível absoluto (baixo/médio/alto)
- Velocidade de preenchimento = velocidade de processamento

**Especificações técnicas**
- Diâmetro: 24px (conversa) / 16px (dashboard) / 32px (painel cognitivo)
- Espessura do anel: 3px
- Transição de cor: 600ms ease-in-out
- Animação de preenchimento: duração proporcional ao processamento da IA

---

## 2. O Glow de Insight

**Elemento de momento.** Brilho sutil que acompanha a revelação de um insight.

**Onde aparece**
- Momento exato em que um insight aparece na tela
- Em volta do卡片 de insight recém-criado
- Na primeira vez que uma conexão entre dois pontos é descoberta

**Por que é único**
- Efêmero — dura apenas 3 segundos e desaparece
- Acompanha a natureza de um insight: brilhante e fugaz
- Maioria dos sistemas destaca informações permanentemente

**Comportamento**
- Aparece: glow radial crescendo do centro do insight
- Pico: brilho máximo aos 500ms
- Desaparece: fade suave ao longo de 2.5s
- Rastro: deixa uma sombra sutil que marca o local

**Especificações técnicas**
- Raio do glow: 150% do卡片 de insight
- Opacidade máxima: 30%
- Cor: tom claro da cor primária (brand)
- Duração total: 3s
- Easing: ease-out cúbico

---

## 3. A Barra de Conhecimento

**Elemento de estado.** Barra que mostra o conhecimento acumulado em cada área.

**Onde aparece**
- Painel Cognitivo (visão geral)
- Dashboard (por módulo/área)
- Perfil da empresa (progresso total)

**Por que é único**
- Conhecimento é mostrado como algo que cresce, não como um número
- Visualmente tangível — o empresário vê o conhecimento aumentar
- Cada área tem sua própria barra (gestão, finanças, equipe, etc.)

**Comportamento**
- Preenche horizontalmente conforme o conhecimento é adquirido
- Vazio → preenchido com textura granular (como "partículas de conhecimento")
- Ao receber novo conhecimento: onda suave percorre a barra
- Ao completar 100%: glow sutil + confetes minimalistas

**Especificações técnicas**
- Altura: 8px / 4px (compacto)
- Largura: variável (proporcional ao container)
- Cor de preenchimento: gradiente sutil da cor primária para secundária
- Partículas: 3px de diâmetro, animação browniana suave
- Onda de atualização: 800ms

---

## 4. A Transição Entre Mundos

**Elemento de navegação.** A transição entre "conversa" e "dashboard" não é um corte — é um momento de "respiração".

**Onde aparece**
- Navegação entre modo conversa e modo dashboard
- Qualquer transição entre "fluir" (conversa) e "analisar" (dashboard)

**Por que é único**
- Maioria dos sistemas faz transições abruptas
- A Transição Entre Mundos respeita que o empresário está mudando de estado mental
- Funciona como uma "vírgula visual" — uma pausa que organiza o pensamento

**Comportamento**
- Ao sair da conversa: conteúdo "se recolhe" para o centro
- O anel de confiança se expande brevemente (200ms)
- O dashboard "emerge" do centro (como se saísse do anel)
- Duração total: 400ms

**Especificações técnicas**
- Estado intermediário: 200ms com o anel expandido
- Easing: ease-in-out suave
- Escala do anel: 1x → 3x → 1x
- Opacidade do conteúdo antigo: fade de 1 para 0 em 200ms
- Opacidade do novo conteúdo: fade de 0 para 1 em 300ms (atraso de 100ms)

---

## 5. O Silêncio da IA

**Elemento de presença.** Quando a IA está em silêncio, o avatar respira sutilmente.

**Onde aparece**
- Toda a experiência, sempre que a IA está presente mas não falando
- Especialmente: enquanto empresário digita, enquanto IA processa

**Por que é único**
- A maioria das IAs ou está falando ou está invisível
- O Silêncio da IA comunica: "Estou aqui. Estou presente. Estou pronta."
- Reduz a ansiedade de espera — o empresário sabe que a IA está "viva"

**Comportamento**
- Avatar da IA: movimento sutil de respiração (expansão/contração de 2px)
- Ciclo de respiração: 4 segundos (inspira 2s, expira 2s)
- Amplitude reduzida quando processando (está "concentrada")
- Amplitude normal quando aguardando input

**Especificações técnicas**
- Variação de escala: 0.98x (expira) → 1.02x (inspira)
- Ciclo: 4s (senoidal)
- Opacidade: 80% (respiro) / 60% (processando)

---

## 6. O Momento Zero

**Elemento de abertura.** A primeira tela após o login não é um dashboard — é uma saudação.

**Onde aparece**
- Primeira sessão de cada dia
- Retorno após longa ausência

**Por que é único**
- Maioria dos sistemas joga o usuário em um dashboard
- O Momento Zero reconhece que cada sessão começa com uma intenção
- Personalizado: muda com base no momento do dia, histórico recente, pendências

**Comportamento**
- Saudação com nome do empresário e da empresa
- Contexto: "Na última vez estávamos falando sobre [tópico]"
- Sugestão: "O que você gostaria de explorar hoje?"
- Apenas 3 opções (não paralisar com muitas escolhas)
- Duração na tela: até o empresário escolher ou digitar

**Especificações técnicas**
- Animação de entrada: 500ms (fade + leve deslize)
- Texto aparece letra por letra (400ms total)
- Opções aparecem com stagger de 100ms cada
- Background: versão suave do gradiente da marca

---

## 7. A Escrita Pensada

**Elemento de texto.** O texto da IA não aparece instantaneamente — ele é "pensado" em tempo real.

**Onde aparece**
- Toda resposta da IA na conversa

**Por que é único**
- A maioria mostra texto instantâneo ou cursor genérico
- A Escrita Pensada comunica: "estou pensando no que dizer"
- Cria expectativa e engajamento — o empresário acompanha o raciocínio

**Comportamento**
- Texto aparece palavra por palavra (velocidade de leitura confortável)
- Pequenas pausas em pontuação (como quem respira)
- Palavras-chave têm micro-pausa extra (ênfase natural)
- Se o texto for revisado pela IA, palavras substituídas têm fade suave

**Especificações técnicas**
- Velocidade: ~200ms por palavra (ajustável)
- Pausa em vírgula: +100ms
- Pausa em ponto final: +300ms
- Palavras-chave: +50ms de pausa extra
- Revisão: fade de 150ms para palavra substituída
