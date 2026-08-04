# P65 — Memória Empresarial Viva + Refinamento Definitivo da Primeira Sessão

**Data:** 4 de agosto de 2026
**STATUS:** IMPLEMENTADO (Memória Viva em painéis de evolução + primeira sessão adaptativa).

> A Ponte não guarda dados. A Ponte guarda a evolução da empresa.
> A primeira sessão deixou de se sentir como um questionário — e a memória deixou de ser uma linha do tempo.

---

## 1. Problema

Duas falhas reais foram observadas após P70:

1. **A primeira sessão ainda podia parecer questionário.** O fluxo v6 perguntava por
   blocos, mas todas as perguntas eram obrigatórias, na mesma ordem, para todo mundo.
   Um empresário que disse "tenho equipe organizada" ainda ouvia a pergunta básica
   sobre o que faria com uma hora livre. A percepção de "estou sendo entrevistado"
   nascia da ausência de adaptação.
2. **A memória era uma linha do tempo, não uma memória.** `minha-jornada` contava
   "capítulos" e marcos em ordem cronológica. Uma linha do tempo mostra o que
   aconteceu; uma memória responde "estamos evoluindo?". O empresário não via
   comparações, via um arquivo.

## 2. O que P65 entrega

### 2.1 Conversa adaptativa (Parte 1 — sem sensação de questionário)

- **`CondicaoEtapa` (`apenasSe` / `pularSe`)** — `tipos.ts` agora permite que uma
  etapa tenha condição: aparece só se o empresário responder de certo jeito
  (`apenasSe`), ou é pulada quando responde de outro (`pularSe`).
  `conversation-engine.ts` ganhou `etapaElegivel` + `proximaEtapaElegivel`, usados
  em `criarConversa` e em `responder` (fluxo sem empresa) — o próximo passo nunca é
  a próxima linha da lista, é a próxima etapa **elegível**.
- **Exemplos reais no fluxo v6:**
  - `empresa.horalivre` tem `pularSe` — quem respondeu "dependência" citando
    equipe/time/funcionário/delegação/repasso/pessoas **não recebe** a pergunta
    básica sobre a própria hora. A conversa salta para o próximo bloco.
  - `exploracao.crescer` (novo, bloco visão) tem `apenasSe` sobre `frente.proximo` —
    quando o empresário fala em crescer/crescimento/expandir/escala/faturar, a Ponte
    **questiona**: *"Crescer costuma significar coisas diferentes... você pensa mais em:
    vender mais / ganhar mais / trabalhar menos / abrir novas unidades."* Quando ele
    não fala em crescer, a pergunta simplesmente não aparece.
- **Micro devolutivas/percepção (`reacoes.ts`):** novas `REGRAS_PERCEPCAO` + função
  `percepcaoDurante` produzem reações **durante** a conversa (não só no fim do bloco):
  *"Posso compartilhar algo que estou percebendo? ... a empresa cresce até o tamanho
  do que você consegue carregar sozinho"* — sempre como hipótese. A devolutiva de fim
  de bloco (P70) continua e tem prioridade quando um bloco fecha.

### 2.2 Retrato V3 — seis partes, com ponto cego

- **`hipoteses-estrategicas.ts`:** cada hipótese ganhou `pontoCego` — o que o
  empresário provavelmente ainda não percebe, sempre em linguagem de hipótese
  ("Posso estar enganada, mas...").
- **`retrato-estrategico.ts`:** o Retrato agora tem **seis partes**:
  1. Quem sua empresa parece ser hoje
  2. O que mais me chamou atenção (3 descobertas, não forças)
  3. **O que talvez você ainda não esteja percebendo** (ponto cego)
  4. A decisão que merece mais atenção
  5. Se eu estivesse no seu lugar
  6. A pergunta que quero continuar investigando (sempre aberta)
- **Cerimônia em 4 passos** (`revelacao-card.tsx`): Organizando... → Conectando
  padrões... → Analisando sua empresa... → Preparando seu Retrato...
- **Retrato compartilhável** (`retrato-estrategico-card.tsx`): botão **"Copiar meu
  Retrato"** gera um texto limpo para colar onde o empresário quiser (sem PDF).

### 2.3 Memória Viva em painéis (Parte 2 — a timeline morreu)

- **`memoria-evolutiva-engine.ts`** — substitui a linha do tempo por **5 painéis de
  evolução** — Empresa, Fundador, Decisões, Clientes, Operação — cada um respondendo
  à pergunta **"Estamos evoluindo?"**. Não existem linhas do tempo, existem
  **comparações**: cada painel mostra **ANTES** (1ª sessão) → **HOJE** (última sessão)
  → **interpretação**. Compara comportamento, nunca apenas respostas (ex.: a operação
  deixou de citar "tudo eu" e passou a citar equipe/delegação = sinal de evolução).
- **Selos de confiança** em cada painel: **O que sabemos** (evidência nas palavras) /
  **O que acreditamos** (leitura, não certeza) / **O que ainda estamos investigando**
  (precisa de mais conversas). Hipótese nunca é apresentada como verdade.
- **Narrativa primeiro, gráficos nunca.** Com uma única sessão, a página mostra o
  estado atual + aviso honesto — não inventa evolução onde não há tempo para ela.
- **`minha-jornada` reconstruída** como a página da Memória Viva.
- **Timeline morreu:** `/historico` ("Nossa caminhada") sai da sidebar e redireciona
  para `/minha-jornada`; `timeline-viva.tsx` e `historico-content.tsx` removidos.
- Sem migrations, sem funcionalidades novas: reusa `RespostasConversa` (por token =
  sessão), `MemoriaEmocional`, `PerguntaViva`, `SinalValor`.

## 3. Regras respeitadas

- **Sem IA como cérebro:** interpretação determinística sobre respostas reais.
- **Surpresa sempre como hipótese:** "Posso estar enganada, mas...", "Existe um
  padrão...".
- **Confiança em três níveis** (sabemos / acreditamos / investigando), nunca uma só.
- **Multi-tenancy preservado** (`empresaId` em todas as queries).
- **Sem migrations, sem novas dependências, sem refactor amplo.**

## 4. Arquivos

- `engine/tipos.ts` — `CondicaoEtapa` + `condicao` em `Etapa`.
- `engine/fluxos/primeira-conversa.ts` — `empresa.horalivre` condicionada; nova
  `exploracao.crescer`.
- `engine/conversation-engine.ts` — `etapaElegivel`, `proximaEtapaElegivel`,
  reação com percepção.
- `engine/reacoes.ts` — `REGRAS_PERCEPCAO` + `percepcaoDurante`.
- `engine/hipoteses-estrategicas.ts` — `pontoCego` por hipótese.
- `engine/retrato-estrategico.ts` — Retrato V3 em 6 partes.
- `engine/memoria-evolutiva-engine.ts` — **novo:** os 5 painéis de evolução.
- `components/conversa/revelacao-card.tsx` — cerimônia em 4 passos.
- `components/conversa/retrato-estrategico-card.tsx` — "Copiar meu Retrato".
- `components/layout/sidebar.tsx` — `/historico` removido.
- `app/(dashboard)/historico/page.tsx` — redirect para `/minha-jornada`.
- `app/(dashboard)/minha-jornada/page.tsx` — Memória Viva.
- Removidos: `components/historico/timeline-viva.tsx`,
  `app/(dashboard)/historico/historico-content.tsx`.

## 5. Critérios de aceite (P65)

- [x] Nenhuma pergunta que só coleta informação permanece no fluxo.
- [x] A conversa muda conforme o empresário responde (pula/seleciona).
- [x] A Ponte questiona ("Crescer costuma significar...") e sempre como hipótese.
- [x] Retrato V3 em 6 partes, com "o que talvez você ainda não esteja percebendo".
- [x] Cerimônia de entrega em 4 passos.
- [x] Retrato compartilhável (copiar texto; sem PDF).
- [x] 5 painéis de evolução respondendo "Estamos evoluindo?".
- [x] Comparar comportamento, não apenas respostas.
- [x] Narrativa primeiro; gráficos nunca.
- [x] Selos de confiança (sabemos / acreditamos / investigando).
- [x] Sem migrations; `tsc` e `build` limpos.
