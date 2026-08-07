# P76 — A Experiência Inesquecível

**Tipo:** Auditoria de experiência (sem funcionalidades, módulos, telas, dashboards ou gráficos novos).
**Data:** 2026-08-06
**Método:** percorrer a experiência inteira como um empresário muito ocupado que nunca viu a Ponte. Toda pergunta: *"Isso me faria confiar mais?"*
**Regra:** não corrigir bugs; corrigir **rupturas de experiência**. Nenhuma mudança por "ficar mais bonita" — só se aumentar a confiança.
**Depósito anterior:** `docs/07-MILESTONES/P75_AUDITORIA_DE_EXCELENCIA.md` (achados consolidados aqui no formato P76, parte inédita).

---

## 0. Veredito de conjunto

A Ponte já tem a **voz** certa — em muitos lugares ela é indistinguível de um sócio que lembra. Mas essa voz se manifesta de forma **desigual**: brilha no Assistente, no painel de autenticação, nas confirmações destrutivas e em alguns estados vazios; e **desaparece** exatamente nos momentos que importam — quando o empresário **conclui** uma ação (zero feedback de sucesso), quando a empresa é **nova** (cai em genérico) e quando algo **falha** (vaza texto técnico ou a Ponte "finge" que se perdeu).

A mensagem do produto pode ser resumida assim: **uma companhia que existe, mas que silencia no momento em que deveria confirmar e acolher.** Corrigir esses três eixos transforma a experiência de "ferramenta com voz" para "relação".

Critério usado em tudo: *"Depois dessa mudança, o empresário confiará mais na Ponte?"* — se não, não entra.

---

## 1. Rupturas de confiança

### R1 — CRÍTICO — Zero confirmação de sucesso (toast montado e morto)
- **Local:** `sistema/src/components/ui/toast.tsx:23` (exporta `useToast`); montado em `layout.tsx:47`; **zero chamadas** em todo `src/` (grep confirma: nenhum CRUD usa).
- **Gravidade:** Crítico
- **O que quebra:** Valor · Confiança · Continuidade
- **Evidência:** criar/editar/deletar termina com o modal fechando e a lista recarregando — "silêncio absoluto". A empresa que cobra por "companhia" se cala exatamente quando o dono faz algo importante.
- **Correção (menor):** ao completar `await criarCliente/criarTarefa/excluir*/guardar...`, chamar `toast('Cliente guardado — lembro dele daqui pra frente', 'success')`. Sem funcionalidade nova; reconectar infra já existente.
- **Resultado esperado:** o dono sai da ação sentindo **"a Ponte viu o que eu fiz"**, não "deu o clique e sumiu".

### R2 — Alto — vazamento técnico de status HTTP no fallback
- **Local:** `sistema/src/lib/api-client/...` `api-client.ts:68` e `:104` — `` `Erro na requisição (${res.status})` ``.
- **Gravidade:** Alto
- **O que quebra:** Confiança (frio/técnico); sem código ou stack, mas ainda fratura a voz.
- **Evidência:** quando o corpo não é JSON válido, lança **"Erro na requisição (500/403)"** para a tela.
- **Correção (menor):** usar a voz já existente `"Não consegui fazer isso agora. Vamos voltar a tentar em instantes."`; manter `res.status` apenas no log.
- **Resultado:** nenhum número de status chega ao dono.

### R3 — Alto — a Ponte "finge que se perdeu" numa falha real
- **Local:** `sistema/src/app/api/assistente/route.ts:301-302` (`FALHA_GENTIL`).
- **Gravidade:** Alto
- **O que quebra:** Confiança · Emoção (honestidade invertida)
- **Evidência:** a resposta é **"Deixa eu me recompor rapidinho — por um instante me perdi aqui."** quando na verdade houve timeout/stream vazio do provedor. A documentação vende "a IA nunca inventa"; nesta fallback a Ponte finge um esquecimento que não é dela.
- **Correção (menor):** manter o tom e ser honesto sem culpa: **"O sistema travou por um instante aqui — mas a nossa conversa continua guardada. Conta de novo, em uma frase, o que está pesando agora."**
- **Resultado esperado:** erro de sistema vira acolhimento de continuidade, não "o sócio desligou".

### P4 — Alto — Assistente novo soa como ChatGPT genérico
- **Local:** `sistema/src/components/assistente/chat.tsx:78-84,146` (`SUGESTOES_PADRAO`).
- **Gravidade:** Alto (único momento em que a Ponte "liga" para modelo genérico)
- **O que quebra:** Confiança · Voz de marca
- **Evidência:** sem memória/feedback/decisão, sugere "Como está a semana na empresa?", "Precisa de ajuda com alguma tarefa?", "Quer conversar sobre algum cliente?" — **qualquer chatbox de SaaS de onboarding** faria o mesmo.
- **Correção (menor):** Âncoras reais de negócio: "Como andam suas contas este mês?", "Tem algum cliente que você atendeu agora?", "O que mais tira sua atenção hoje?".
- **Resultado:** mesmo sem dados, a Ponte pergunta sobre o negócio do dono, não sobre "posso ajudar?".
- **Nota:** o prompt do system (`route.ts:329-368`) e o contexto (`montarContinuidade`, pergunta viva, memórias emocionais, decisões anteriores) já são **excelentes** — P4 não toca neles.

### P5 — CRÍTICO — Contradição real com a resposta do empresário (revalidado)
- **Local:** `sistema/src/engine/reacoes.ts:174` e `:523` (percepção + devolutiva de bloco).
- **Gravidade:** Crítico
- **O que quebra:** Confiança (prioridade máxima de P76)
- **Evidência:** "Empresas geralmente travam pela complexidade, não pela falta de clientes." — **mesmo quando o empresário acabou de escolher a opção "Falta de clientes"** (`empresa.crescer`, palavra `cliente`). O produto parece saber mais do que o dono; o dono foi contradito.
- **Correção (menor):** quando a resposta contiver "falta de clientes / vender", substituir a **tese** por uma **contra-pergunta** que honra a resposta: "Quero entender: quando você diz falta de clientes, é mais sobre atrair ou sobre reter os que já voltam?" — mantém a regra, muda a direção.
- **Resultado:** a Ponte pergunta em vez de contradizer; confiança preservada.

---

## 2. Contradições

### C1 — Alto — três perguntas quase idênticas na primeira sessão
- **Local:** `sistema/src/engine/fluxo/primeira-conversa.ts` — `rotina.energia:60`, `rotina.cabeca:68`, `empresa.preocupacao:112`.
- **Gravidade:** Alto
- **O que quebra:** Ritmo · Emoção (repetição/ tédio)
- **Evidência:** três perguntas distintas perguntam a mesma coisa disfarçada ("o que consumiu energia", "o que ocupa a cabeça", "o que mais ocupa o pensamento").
- **Correção (menor):** fazer da 2ª e 3ª um **aprofundamento** da 1ª, citando a anterior, ou suprimir/reordenar — sem criar pergunta nova.

### C2 — Baixo — título "Assistente" duplicado
- **Localização:** `assistente/page.tsx:26` + `chat.tsx:267`.
- **Gravidade:** Baixa · **Quebra:** Clareza/Ritmo
- **Evidência:** `<h2>Assistente</h2>` renderizado duas vezes na mesma tela.
- **Correção:** manter apenas o subtítulo narrativo ("O que sei sobre sua empresa, pra decidirmos juntos", que é bom); remover o `<h2>` redundante do Chat.

### C3 — Alto — dupla identidade da marca (1ª × 3ª pessoa)
- **Localização:** `atendimento-shell.tsx:136,318` (1ª "Deixei.../Guardei...") vs `implantacoes-content.tsx:164-167` + `constants/index.ts:149` (3ª "a Ponte começará a gerenciar...").
- **Gravidade:** Alto · **Quebra:** Continuidade · Coerência · Voz
- **Evidência:** ora fala **como** a Ponte (1ª pessoa), ora **a respeito** da Ponte (3ª pessoa).
- **Correção:** fixar a **1ª pessoa** em todos os textos de sistema e estados vazios.

### C4 — Média — rótulo "Histórico" redireciona para "Minha Jornada"
- **Localização:** `historico/page.tsx:4-5` (redirect → `/minha-jornada`).
- **Gravidade:** Média
- **O que quebra:** Clareza
- **Evidência:** o item de menu permite "Histórico", mas o conteúdo é "Memória Viva/Jornada".
- **Correção:** alinhar o rótulo ao conteúdo dentro da mesma linha de patrimônio.

---

## 3. Linguagem — apenas a voz da Ponte

### L1 — Médio — spinners frios fora do padrão
- **Localização:** `decisao/pensar-antes-de-decidir.tsx:192` ("Carregando..."), `criar-conta/page.tsx:70` (spinner sem texto), `reset-password/confirmar/page.tsx:80` ("Verificando link...").
- **Gravidade:** Baixo/médio · **Quebra:** Emoção/Ritmo
- **Evidência:** o loading do dashboard (Avatar + "Só um instante..." ─ excelente) não se repetice nessas áreas.
- **Correção:** colocar um texto curto sobre o que a Ponte faz ("Deixa eu olhar o que mudou...") no lugar do spinner sem texto.

### L2 — Baixa/médio — jargão técnico na interface
- **Localização:** `painel.tsx:353` "ETAPA 7 — promover..."; `configuracoes-content.tsx:138` "Endereço da imagem do logo" + placeholder `https://`.
- **Gravidade:** Baixa/Média
- **Quebra:** Clareza
- **Correção:** "Promover: a descoberta passa a valer como conhecimento coletivo candidato" / "Logo da empresa — se Cole o link de uma imagem (PNG ou JPG)".

### L3 — Baixo/médio — validações que explicam a regra errada
- **Localização:** `validations/index.ts:22,40,60,77,90,107` — ex: `z.string().min(2, 'Nome obrigatório')`.
- **Gravidade:** Baixo/Médio
- **Quebra:** Clareza/Confiança
- **Evidência:** usuário digita 1 letra e recebe "Nome obrigatório" (ele preencheu — mensagem enganosa). As regras `min(6)`, "Valor deve ser positivo" e "Resposta muito longa" ficam corretas.
- **Correção:** adequar à regra real: "Dá pra ser mais específico — nome a partir de 2 letras".

### L4 — Baixa — erro com ícone cru de alerta
- **Localização:** `assistente/chat.tsx:227` — "Não consegui responder agora." + `⚠`.
- **Correção:** trocar o `⚠` por tom de sócio ("Aguenta aí, deu uma instabilidade — continuamos daqui a segundos").

### L5 — Médio — erro interno engolido / fria
- **Localização:** `painel.tsx:57,122,133` "Falha na ação"; `atendimento.service.ts:120` `console.error` (engolido).
- **Correção:** passar tudo pela `mensagemDeErro(e, 'Não consegui fazer isso agora')`.

---

## 4. Ritmo

A primeira sessão **já tem** respiro (Q8 "hora livre"), mudança de direção (condicionais, contra-perguntas, sinais críticos) e surpresa com "motivo real". Dois ajustes de cadência para evitar repetição:

- A **barra de progresso** (`progress-bar.tsx`) + rótulo de bloco no topo comunica "preenchimento de formulário" a cada tela. **Médio.** Reforçá-la como "ponto da conversa" (menos ficha de diagnóstico).
- A **rotina das devolutivas de bloco** "Percebo / Reparei / Não por acaso" (`reacoes.ts:538,551`) é cadenciada mas com certo jogo de formulas técnicas; variar as frases de abertura.

---

## 5. Valor — "o empresário acabou de ganhar algo?"

- **Alto valor (preservar):** pergunta viva, retrato final, carta, aprendizado (quick), ciclo de decisão.
- **Alto valor ausente:** **"perda percebida" ao longo do tempo.** O critério da 100ª visita ("perco algo se não abrir") não pode nascer antes de existir um ganho diário. Correção sem funcionalidade: no **Dashboard** a pergunta que acompanha e a contradição diária já existem — reforçar a **continuidade ativa na UI** (priorizar o que `/dashboard` já mostra, em vez de escondê-lo abaixo da dobra).
- **Ganho a cada etapa da 1ª sessão:** as perguntas já entregam leitura; ao resolver C1 (repetição), cada pergunta passa a responder "ganhei leitura".

---

## 6. Emoção

**Momentos positivos (mapeados, preservar):**
- Surpresa: contradição cuidadosa, condicional de "crescer", retrato que reusa palavras.
- Alívio: "Sua situação é diferente" liberta para escrever; estados vazios honestos ("Nada é inventado: tudo veio de você").
- Clareza: selo SABEMOS / ACREDITAMOS / INVESTIGANDO; Radicópia de "confiança".
- Pertencimento: `Fundador #0042 — você está na história da Ponte.`

**Momentos negativos a eliminar (já catalogados):**
- Confusão/tédio: repetição (C1), jargão (L2), spinner frio (L1).
- Ruptura: F1 (silêncio ao concluir), R2 (erro 500), P3 (sistema finge que perde).
- Cansaço: barra de progresso que parece formulário e o "⚠".

**Regra:** para cada momento, a Ponte deve **reforçar o positivo** (não remover a surpresa) e **trocar o negativo** pela voz da companhia.

---

## 7. Inteligência invisível

Existe **muita** inteligência construída que **não aparece**:

### I1 — Alto — Ciclo de aprendizado de decisão invisível
- **Localização:** `engine/decision-learning-cycle-engine.ts` — produz "Estamos fortalecendo: X — aprendizado convertido em competência".
- **Gravidade:** Alto · **Quebra:** Valor/Inteligência visível
- **Evidência:** o dado roda, mas não é consumido pela UI do Centro de Decisão (`centro-decisao/page.tsx`).
- **Correção (só apresentação):** expor no card da decisão "Com essa decisão, você capacitou ____________ — isso vira competência." **Sem funcionalidade.**
- **Resultado:** o dono **vê** a Ponte aprendendo e evoluindo.

### I2 — Alto — Inteligência do Assistente JÁ é visível e excelente (preservar)
- `continuidade`, pergunta viva, memórias emocionais, decisões anteriores, feedback concretizado ("Vocês você não funcionou. Vou parar de reedições isso") — é o "me conhece" da Ponte.
- Guardar o "padrão percebido" pode, sem engine, ser citado no retrato (seção que já existe) para reforçar que a Ponte **descobriu** algo.

### I3 — Alto

**Hipóteses/Espelho/Leitura Cognitiva** são fortes no motor, mas aparecem apenas em partes específicas. Reforçar a visibilidade do "eu percebi um padrão aqui" no Centro de Decisão e no dashboard é a alavanca de "inteligência visível" com custo zero de engine.

---

## 8. Coerência

- **Promessa central a reforçar em tudo:** "A Ponte entende minha empresa". Já é sustentada por SABEMOS/ACREDITAMOS/INVESTIGANDO, pela Memória Viva e pelo feedback do Assistente.
- **Quebras a corrigir:**
  - Voz 1ª vs 3ª (C3) — precisa ser **uma**.
  - Rótulos "guardar informação" de memória → migrar para "conhecer/ me conhece".
  - **Confirmação de todo conclusion** para que cada tela reforce a mesma companhia (F1).
- **Nãoexistam telas independentes** se a voz for global: configurações e painel interno também passam pelo crivo "isto é a Ponte?".
- Evitar uma tela **independente**: journey em CRM (percentual progresso) que contradiz a narrativa do resto.

---

## 9. Critérios de excelência — leitura atual

**1ª sessão:** o retrato é memorável e "mostrável"; pode quebrar com repetição C1 e contradição P5 → corrigidas, resposta **SIM**.

**2ª visita:** "voltou a conversar com alguém que lembra" → **JÁ É**, via continuidade no chat e retorno programado. Manter.

**3ª visita:** "percebe evolução?" → **parcialmente**: o ciclo de aprendizado existe mas é invisível (I1). Expos-lo é a principal alavanca.

**10ª visita:** "consulta antes de decidir" → **JÁ ENTREGA** o Centro de Decisão + pergunta viva; tornar o ciclo visível consolida o hábito.

**100ª visita:** "perde algo se não abrir" → **ainda não**: exige continuidade contínua (tema de produto, não de P76). Não criar tela.

---

## 10. Plano de refinamento incremental (só experiência, ordem por confiança)

**F1 — Confiança (maior impacto):**
1. R1 — ligar o toast de sucesso em todas as criações/edições/exclusões.
2. P5 — não contradizer "falta de clientes".
3. R2 — remover "Erro na requisição (500)" / "Erro desconhecido".
4. P3 — reescrever `FALHA_GENTIL` para honestidade de continuidade.

**F2 — Voz única:**
5. C3 — voz em 1ª pessoa em todos os textos de sistema.
6. L1 — substituir spinners frios por textos de "o que a Ponte está fazendo".
7. L2 — tirar "ETAPA 7", "Endereço da imagem do logo", "⚠".

**F3 — Primeira sessão (anti-formulário):**
8. C1 — resolver a triplicidade de "o que obasal".
9. Progresso como "ponto da conversa", não "ficha de diagnóstico".
10. Retrato com frases que convidam a compartilhar.

**F4 — Inteligência visível:**
11. I1 — expor o ciclo de aprendizado no Centro de Decisão.
12. Reforçar a presença da pergunta viva/evolução no dashboard (sem feature).

**F5 — Consistência e estados:**
13. Estados vazios sem o convite à ação (conhecimento filtrado sem "Limpar filtros"; "Nenhuma..." factuais).
14. Voz da Ponte nos painéis internos.
15. Centralizar a mensagem de erro em implantações (`apiFetch` + `mensagemDeErro`).

---

## 11. "Gostei da ferramenta" vs. "Senti que alguém entendeu minha empresa"

Hoje a Ponte está **a caminho da segunda frase**. A ordem de mudança:

1. **A Ponte deve falar quando você faz algo** — ligar a confirmação de sucesso (F1/R1).
2. **Nunca contradizer o dono** (P5) nem **fingir que se perde** (P3) nem **mostrar "500"** (R2) — as três quebram a confiança na hora mais tensa.
3. **A inteligência precisa ser visível** (ciclo de aprendizado, padrões percebidos) para o dono **ver** que a Ponte evolui com ele.
4. **A voz única** (C3+L2) para que cada tela seja o mesmo "sócio".

Quando esses quatro estiverem resolvidos, **somente com texto, prompt, timing e apresentação**, o empresário não dirá que a ferramenta é boa — dirá **"senti que alguém realmente entendeu minha empresa"**. E é essa a diferença que muda completamente o valor percebido da Ponte.

---

*P 75 cumprindo objetivo: nenhuma funcionalidade, módulo, tela, dashboard ou gráfico novo. Apenas transformação da experiência a partir da arquitetura existente.*