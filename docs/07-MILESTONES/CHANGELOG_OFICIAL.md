# Changelog Oficial — Ponte Digital

*Histórico completo da evolução da empresa, do Programa 0 em diante.*

---

## Programa 70 + 71 — Experiência Cognitiva V1 (Primeira Impressão Memorável + Ritmo Cognitivo)

**5 de agosto de 2026**

**"A Ponte deixa de parecer um software e passa a parecer um conselheiro."** Este programa não adiciona funcionalidades, módulos, IA ou telas — muda exclusivamente a experiência da primeira conversa, para que o empresário esqueça que está respondendo perguntas e sinta que acabou de ter uma conversa útil sobre a própria empresa.

**Ritmo cognitivo imprevisível (determinístico, sem IA).** `montarRitmoCognitivo()` em `reacoes.ts` decide a fala da Ponte após cada resposta em ordem de prioridade: (1) **mudança de direção** — se a resposta menciona fechar/vender a empresa ou demitir, a Ponte abandona o roteiro e explora ("Espera. Isso é grande demais..."); (2) **contrapergunta** — regras por pergunta aprofundam respostas ambíguas ("Quando você diz que a empresa para sem você... fala das decisões ou da operação?"); (3) **conexão** — cita o que foi dito minutos antes e liga com a resposta atual (crescimento × dependência, previsão × caixa); (4) **percepção como hipótese** (P65 preservado); (5) **ritmo imprevisível** — alterna deterministicamente entre recompensa, silêncio inteligente, pensar em voz alta e pequeno mistério (hash estável: mesmo input, mesmo output; respostas diferentes, ritmos diferentes). "Nem toda pergunta gera comentário. Nem todo comentário gera pergunta."

**Pensar em voz alta + pequenos mistérios.** A Ponte diz "Interessante...", "Isso muda um pouco minha percepção", "Espera... isso conecta com outra coisa que você comentou" e cria curiosidade com "Tem uma coisa interessante aparecendo aqui... mas ainda preciso entender mais um ponto."

**Motivo implícito.** O rótulo "Por que pergunto:" foi removido — o motivo de cada pergunta agora é renderizado em tom de quem pensa junto, sem estrutura de formulário (P70).

**Primeira pergunta com abertura emocional.** `empresa.momento` abre com *"Antes de qualquer coisa... quero entender como você enxerga sua empresa neste momento. Não financeiramente. Mas como empresário."* — nunca como cadastro.

**Ritual de digestão variável.** A frase sob a reação passou a variar em sequência estável ("Deixa eu digerir o que você disse...", "Interessante... deixa eu pensar...", "Vou deixar essa resposta falar comigo um instante...", "Isso muda um pouco minha percepção...") — a Ponte não repete a mesma estrutura.

**Decisão documentada:** a contrapergunta vive na camada de reação (provoca reflexão sem bloquear o fluxo) — um campo de resposta interativo seria uma nova interação/feature, fora do escopo deste programa. **STATUS: A PONTE CONVERSA.** Sem migrations, rotas, telas ou módulos. `tsc` e `npm run build` limpos.

**Documentos criados/atualizados:** `P70_P71_EXPERIENCIA_COGNITIVA_V1.md` (novo), `CHANGELOG_OFICIAL.md`, `CURRENT_PRODUCT.md`, `KNOWN_ISSUES.md`.

---

## Programa 69.5 — A Presença Cognitiva Permanente (Versão Fundacional)

**5 de agosto de 2026**

**"Ao abrir a Ponte, o empresário deve sentir: minha empresa continuou sendo compreendida enquanto eu vivia minha rotina."** O P69 cumpriu parcialmente a missão — a agenda existia, mas a abertura ainda parecia um painel de sistema. **P69.5 transformou a entrada na experiência mais valiosa do produto** — sem funcionalidades novas, sem migrations, rotas, telas ou módulos, tudo determinístico (sem IA).

**A primeira tela deixou de ser um dashboard.** A abertura agora diz, com o nome do empresário: *"Bom dia, João. Enquanto você esteve trabalhando na empresa, algumas coisas continuaram chamando minha atenção..."*. **Novo princípio: a Ponte nunca começa perguntando — começa mostrando que lembra.**

**Toda abertura contém cinco camadas:** (1) **Continuidade** — nunca "bem-vindo", sempre "na nossa última conversa..." (via `montarContinuidadeConversa`); (2) **Observação** — interpreta, não repete fato ("o que mais me chamou atenção é que essa decisão está em aberto há alguns dias"); (3) **Conexão** — liga fatos separados (decisão em aberto + hipótese; decisões empilhadas → "talvez exista uma ordem mais segura"); (4) **Prioridade** — POR QUE conversar, nunca lista de tarefas; (5) **Convite** — "Vamos pensar nisso juntos?", parece conversa, não botão.

**Nunca cards.** Os assuntos viram **pequenas conversas** ("Tenho pensado em uma coisa. Há uma decisão em aberto — 'Contratar alguém' — que ainda não sabemos como terminou."). Proibidos: cards genéricos, listas, KPIs protagonistas, "você possui"/"existem"/"foram encontrados", linguagem técnica. **Cada abertura tem um MOMENTO** escolhido pelo sinal mais forte (revisar decisão antiga ≥14 dias, oportunidade, dúvida de hipótese de alto impacto, evolução, ou *"nada urgente — isso é uma boa notícia"*), criando expectativa. **A abertura nunca fica vazia:** sem decisões/hipóteses, a Ponte oferece a pergunta viva ou uma reflexão. **O dashboard vira secundário** — a ordem da home é conversa → agenda → reflexões → módulos. `tsc` e `npm run build` limpos.

**Documentos criados/atualizados:** `P69_5_PRESENCA_COGNITIVA_PERMANENTE.md`, `CHANGELOG_OFICIAL.md`, `CURRENT_PRODUCT.md`, `KNOWN_ISSUES.md`. **STATUS: A PONTE ABRE COMO CONVERSA CONTÍNUA.**

---

## Programa 69 — Conversa Permanente

**4 de agosto de 2026**

**"A Ponte não depende do empresário lembrar dela. Ela lembra do empresário."** A Ponte deixa de ser um sistema de consultas e passa a conduzir a continuidade — sem migrations, sem rotas, telas ou módulos novos, reutilizando P65/P66/P67/P68.

**Agenda Inteligente (`motor-continuacao.ts`):** engine determinística (sem IA) que decide o que merece atenção **hoje**, por **contexto** (a história da empresa), nunca por data. Critérios em ordem de peso: (1) **decisão acompanhada sem retorno** (P68) — decisões vivas sem atualização há ≥ 3 dias viram *"Há uma decisão importante que ainda não sabemos como terminou."*; (2) **hipótese importante não validada** (P65/P66) — *"Você ainda sente isso?"*; (3) **evolução** — tempo sem conversar com retomada via `montarContinuidadeConversa`, usando memória recente e **nunca** "você está há X dias sem acessar". Cada item com prioridade Alta/Média/Baixa e **nunca mais que 3**.

**Abertura da Ponte (`abertura-do-dia.tsx`):** ao abrir, **antes de qualquer módulo**, o empresário encontra **"Hoje vale conversarmos sobre..."** — cards clicáveis (prioridade + motivo legítimo + pergunta + opções) + convite *"Tem alguma decisão acontecendo hoje?"* + CTA **"Conversar agora"** (`/conversa`). O Ritual Diário desceu; a abertura vira o primeiro bloco da home.

**Princípios garantidos:** nunca interrompe sem razão legítima; nunca notificação vazia nem "X dias sem acessar"; agenda vazia mostra apenas a mensagem gentil de disponibilidade; nada de tarefas/agenda/calendário/notificações genéricas/gamificação. A abertura dura menos de um minuto. **STATUS: A PONTE CONDUZ A CONTINUIDADE.** Sem migrations. `tsc` e `npm run build` limpos.

**Documentos criados/atualizados:** `P69_CONVERSA_PERMANENTE.md`, `CHANGELOG_OFICIAL.md`, `CURRENT_PRODUCT.md`, `KNOWN_ISSUES.md`.

---

## Programa 68 — O Ciclo de Decisão Empresarial

**4 de agosto de 2026**

**"A Ponte não apenas lembra o que sua empresa fez. Ela acompanha as decisões que estão construindo o futuro dela."** A Ponte deixa de aconselhar e passa a **acompanhar decisões reais até o resultado** — sem novas telas, sem módulos, conectando o que já existe (P66 ↔ Centro de Decisão + memória decisória).

**Conselheiro → Decisão acompanhada (Parte 1):** quando o conselheiro (P66) detecta uma decisão (contratar, demitir, preço, empréstimo, expansão, compra), um registro `AcaoCognitiva` (origem `ASSISTENTE`) é criado com a **Origem** (o que o empresário disse), o **Contexto** (sinais reais da empresa), a **Hipótese** (a reflexão, sempre como hipótese) e as **Lacunas** — tudo no campo `Json` `impactoEsperado`, sem migration. Dedupe anti-poluição: não duplica decisão aberta da mesma categoria nos últimos 30 dias. O convite *"posso acompanhar essa decisão com você?"* entra no prompt via bloco **DECISÃO ACOMPANHADA**.

**Patrimônio Decisório (Parte 3):** a Ponte agora sabe *"essa empresa já tomou decisões parecidas?"* — o conselheiro carrega as decisões anteriores e as cita no raciocínio (SABEMOS quando há resultado; decisões do mesmo tipo com data na memória), e o Assistente expõe a seção **DECISÕES JÁ TOMADAS OU ACOMPANHADAS** no prompt, com status, data e resultado. O Centro de Decisão passa a listar também as decisões de origem `ASSISTENTE` — a decisão que "ganhou vida" na conversa evolui ali como sempre evoluiu (PATCH: status, o que aconteceu, o que aprendeu, se ajudou).

**Decisão de implementação:** o ciclo rico do spec (7 estados) foi representado nos campos `Json` existentes mantendo os 4 estados atuais — zero migration, zero quebra (desvio documentado). **Parte 4 (loop automático "você tomou aquela decisão?") foi adiada** por falta de evidência de uso e por estar fora do escopo "conectar o que já existe" (ver `KNOWN_ISSUES.md`). Nada de calendário, tarefas genéricas, CRM de decisão ou dashboard. Sem migrations. `tsc` e `npm run build` limpos.

**Documentos criados/atualizados:** `P68_CICLO_DE_DECISAO_EMPRESARIAL.md`, `CHANGELOG_OFICIAL.md`, `CURRENT_PRODUCT.md`, `KNOWN_ISSUES.md`. **STATUS: A PONTE ACOMPANHA DECISÕES.**

---

## Programa 67 — Experiência Cognitiva de Conversa V1

**4 de agosto de 2026**

**"A Ponte não coleta dados. A Ponte ajuda o empresário a pensar sobre a própria empresa."** A primeira conversa deixou de parecer formulário e virou aconselhamento — sem funcionalidades novas de domínio, apenas reestruturação da experiência e da entrega.

**Novo modelo de pergunta (Parte 1):** toda pergunta estratégica agora tem os 4 elementos — **contexto** (amarra a pergunta ao que já foi falado), **motivo** (por que importa), **pergunta** e **opções (3–5) + "Minha situação é diferente"** (campo aberto). O empresário nunca sente que está preenchendo dados: ele vê o contexto como convite e o motivo como nota "Por que pergunto". Nenhuma pergunta estratégica aceita mais apenas caixa de texto vazia (Parte 4).

**Toda resposta gera reação (Parte 2):** as devolutivas de fim de bloco passaram a citar as palavras reais do empresário, como um conselheiro que de fato leu.

**Ritual de 7 segundos (Parte 3):** a percepção fica ~7s com barra de preenchimento (não é spinner, é ritual), e o botão **"Continuar agora"** está sempre disponível — ninguém espera 7s à toa.

**Primeira Sessão Estratégica V4 (Parte 6):** 7 blocos/18 etapas viraram **4 blocos-guia** (`atual`/`peso`/`evolucao`/`atencao`) com 10–14 interações núcleo (até 16 com condicionais de adaptação P65). Os IDs de pergunta foram **preservados** — as engines de hipóteses, reações e memória evolutiva continuam funcionando; apenas o agrupamento em blocos mudou. Ao converter `texto`→`selecao`, os sinais por palavras-chave foram reconduzidos nos rótulos (ex.: "quase sozinha"→delegação, "eu mesmo"→sobrecarga, "confio no meu instinto"→intuição).

**Retrato Estratégico V4 (Parte 7):** virou **"Primeiro diagnóstico cognitivo da empresa"**, com 6 seções e a tripartite **O que sabemos / O que acreditamos / O que precisamos observar** na seção de decisão — sempre consequência de hipóteses sobre respostas reais, nunca template, respeitando "IA é interface, não cérebro".

**Alteração deliberada (a monitorar):** `historia.orgulho` saiu do fluxo ativo para honrar o teto de 14 interações; permanece viva e null-safe nas engines, candidata a voltar nas sessões de retorno do P68. Ver `P67_EXPERIENCIA_COGNITIVA_DE_CONVERSA_V1.md` e `KNOWN_ISSUES.md`. Sem migrations. `tsc` e `npm run build` limpos.

**Documentos criados/atualizados:** `P67_EXPERIENCIA_COGNITIVA_DE_CONVERSA_V1.md`, `CHANGELOG_OFICIAL.md`, `CURRENT_PRODUCT.md`, `KNOWN_ISSUES.md`. **STATUS: EXPERIÊNCIA COGNITIVA DE CONVERSA.**

---

## Programa 66 — O Conselheiro Empresarial

**4 de agosto de 2026**

**"A Ponte não responde imediatamente. A Ponte pensa junto."** Mudança de comportamento do Assistente — sem funcionalidades novas, sem tela nova, sem schema novo.

**Comportamento conselheiro:** quando o empresário traz uma **decisão importante** (contratar, dispensar, mexer em preços, comprar equipamento, pegar empréstimo, expandir), o Assistente deixa de responder na hora e passa a seguir uma **ordem obrigatória, nunca invertida**: (1) o que estou percebendo → (2) por que isso chamou minha atenção → (3) o que ainda não sabemos → (4) uma ou duas perguntas que realmente importam → (5) só então, **se houver evidência**, uma reflexão. A regra "nunca responder imediatamente" entra como regra fundamental do system prompt (nº 8).

**Raciocínio determinístico (`conselheiro-engine.ts`)** — a IA é interface, não cérebro: o raciocínio é construído em código antes da chamada ao modelo, sobre dados e memória reais. Detecção da categoria da decisão por regras de palavras-chave (6 categorias), sinais de contexto (caixa apertado, sobrecarga, receio, decisão adiada, impulso — calculados de receita×despesa, inadimplentes e memória), tensões/contradições que comparam o que ele diz hoje com o que já contou, e níveis de confiança em tudo que a Ponte afirma: **SABEMOS** (evidência) / **ACREDITAMOS** (leitura) / **INVESTIGANDO** (lacuna). Reflexão só existe quando há tensão real na história da empresa — sem evidência, a Ponte **não recomenda**, fica nas perguntas.

**Biblioteca Socrática (`perguntas-socraticas.ts`)** — patrimônio intelectual: 30 perguntas curadas (5 por categoria) que constroem decisão; a IA adapta às palavras do empresário mas nunca inventa pergunta socrática nova. A memória participa: respostas de conversas anteriores, pergunta viva, memórias emocionais e hipóteses ativas entram como material ("oito meses atrás você dizia X... hoje você está dizendo Y... o que mudou?"). Cada intervenção gera uma **evidência** (origem `ASSISTENTE`) — aprendizado real sobre a empresa. Fórmulas factuais (quantos clientes, quanto faturei, tarefas) permanecem sem IA. `tsc` e `npm run build` limpos.

**Documentos criados/atualizados:** `P66_CONSELHEIRO_EMPRESARIAL.md`, `CHANGELOG_OFICIAL.md`, `CURRENT_PRODUCT.md`. **STATUS: CONSELHEIRO EMPRESARIAL.**

---

## Programa 65 — Memória Empresarial Viva + Refinamento Definitivo da Primeira Sessão

**4 de agosto de 2026**

**"A Ponte não guarda dados. A Ponte guarda a evolução da empresa."** Dois refinamentos profundos sobre o que já existia (sem funcionalidades novas).

**Primeira sessão adaptativa (Parte 1):** o fluxo v6 deixa de ser obrigatório e passa a responder ao empresário. `tipos.ts` ganhou `CondicaoEtapa` (`apenasSe`/`pularSe`) e `conversation-engine.ts` passou a escolher a próxima etapa **elegível** (`proximaEtapaElegivel`). Resultado real: quem respondeu que tem equipe/delegação **pula** a pergunta básica sobre a própria hora (`empresa.horalivre`); quem fala em crescer recebe a nova pergunta que questiona *"Crescer costuma significar coisas diferentes... vender mais / ganhar mais / trabalhar menos / abrir novas unidades"* (`exploracao.crescer`). Novas `REGRAS_PERCEPCAO` geram micro devolutivas **durante** a conversa, sempre como hipótese ("Posso compartilhar algo que estou percebendo?..."). **Retrato V3 em 6 partes** com nova seção *"O que talvez você ainda não esteja percebendo"* (ponto cego por hipótese, em linguagem de hipótese). **Cerimônia em 4 passos** (Organizando... → Conectando padrões... → Analisando sua empresa... → Preparando seu Retrato...). **Retrato compartilhável** com botão "Copiar meu Retrato" (sem PDF).

**Memória Viva em painéis (Parte 2):** a timeline morreu. Novo `memoria-evolutiva-engine.ts` monta **5 painéis de evolução** — Empresa, Fundador, Decisões, Clientes, Operação — cada um respondendo **"Estamos evoluindo?"**, mostrando **ANTES (1ª sessão) → HOJE (última sessão) → interpretação**, comparando comportamento e não apenas respostas (delegação × centralização na operação; número × intuição na decisão). **Selos de confiança** em cada painel (O que sabemos / O que acreditamos / O que ainda estamos investigando) — hipótese nunca vira verdade. Narrativa primeiro, gráficos nunca; com uma única sessão mostra o estado atual + aviso honesto. `/minha-jornada` reconstruída como Memória Viva; `/historico` sai da sidebar e redireciona; `timeline-viva.tsx` e `historico-content.tsx` removidos. Sem migrations. `tsc` e `npm run build` limpos.

**Documentos criados/atualizados:** `P65_MEMORIA_EMPRESARIAL_VIVA.md`, `CHANGELOG_OFICIAL.md`, `CURRENT_PRODUCT.md`. **STATUS: MEMÓRIA VIVA.**

---

## Programa 59–63 — Refinamento Founder V2

**3 de agosto de 2026**

Refinamento definitivo da experiência Founder, preservando a regra da V4 Founder (evidência real > funcionalidade; nada artificial). **P59 V2 — Sessão mais profunda:** nova pergunta de tensão "Se você precisasse se afastar por 30 dias, o que aconteceria com a empresa?" (`empresa.dependencia`) no fluxo e no `ESTAGIO_POR_ETAPA`; retrato 6 partes não-genérico (subtítulo e primeiro movimento ancorados na resposta real); landing com CTA direto para `/conversa`; **Área Founder completa** em `/fundador` (tese, como aprende, patrimônio, evidências reais, Inteligência Coletiva com gates, roadmap, "o que acreditamos" como hipóteses, WhatsApp); rota `/tornar-se-fundador` pública. **P60 — Memória Empresarial Viva:** página `/memoria` no menu (patrimônio: decisões com status/resultado/feedback, aprendizados, clarezas com categoria, evoluções, sessões; CTA para continuar conversa aberta); módulo `'memoria'` liberado. **P61 — Conselheiro de Decisões:** componente **"Pensar antes de decidir"** integrado em `/centro-decisao` — registro da decisão com 5 perguntas (o que/por quê/resultado esperado/riscos/condição de sucesso), categoria, e fechamento com "o que aconteceu/o que aprendemos" + feedback (`FeedbackAcao`); APIs `POST/GET /api/centro-decisao/decisoes` e `PATCH /.../[id]` com marcos de experiência (`PRIMEIRA_ACAO_CRIADA`, `PRIMEIRA_ACAO_CONCLUIDA`, `PRIMEIRO_FEEDBACK`). **P62 — Conhecimento Coletivo:** engine `inteligencia-coletiva.ts` com gates de maturidade (10/50/100/500/1000) e padrões coletivos apenas `VALIDADO+` — agregações, nunca dados de uma empresa; seção no Painel do Fundador (ADMIN). **P63 — Métricas de Transformação:** `operacao-founder.ts` (sessões, clarezas por categoria, retorno espontâneo, primeiras decisões/evoluções, apoiadores/founders) exibido como "Transformação, não funcionalidades". Painéis usam `prisma` cru apenas em agregados de plataforma; tenant guard preservado no restante. `tsc` e `npm run build` limpos.

**Documentos atualizados:** `P59_PRIMEIRO_VALOR_RETENCAO.md`, `P60_MEMORIA_EMPRESARIAL_VIVA.md`, `P61_CONSELHEIRO_DE_DECISOES.md`, `P62_CONHECIMENTO_COLETIVO.md`, `P63_ESCALA_COMERCIAL.md`. **STATUS: EXPERIÊNCIA FOUNDER V2.**

---

## Programa 59 — Primeiro Valor e Retenção Founder V1

**2 de agosto de 2026**

Foco em provar utilidade, não em impressionar. **Protocolo Founder 1–10** (`05-OPERATIONS/PROTOCOLO_FOUNDER_1-10.md`): acompanhamento por empresário em 3 momentos (antes da Ponte, depois da primeira conversa, depois de 7 dias). **Clareza Gerada como evidência** (não score): check-in pós-conversa "qual a principal coisa que você percebeu?" com categorias (Nova percepção / Confirmação / Mudança de decisão / Nenhum impacto), gravado no `SinalValor` via `POST /api/conversa/clareza`. **Retrato Estratégico evoluído para 6 partes** (onde está hoje / o que já construiu / risco de continuar igual / decisão merece atenção / primeiro movimento recomendado / pergunta que continuaremos acompanhando). **Linguagem externa** renomeada para "Primeira Sessão Estratégica" (landing + links). `tsc` e `npm run build` limpos. Critérios finais (10 empresários, depoimentos) dependem de humanos — pendência registrada.

**Documentos criados:** `P59_PRIMEIRO_VALOR_RETENCAO.md`, `PROTOCOLO_FOUNDER_1-10.md`. **STATUS: VALOR MENSURÁVEL V1.**

---

## Programa 57A — Primeira Experiência de Valor e Diagnóstico Estratégico V1

**2 de agosto de 2026**

A primeira interação passa a entregar valor percebido imediato. Novo posicionamento: a Ponte não vende diagnóstico — entrega a **Primeira Sessão Estratégica da Empresa** ("o lugar onde empresários pensam antes de decidir"). **Retrato Estratégico da Empresa** em 5 partes (entendimento → forças → pontos de evolução → decisão mais importante → próxima reflexão) gerado ao finalizar a conversa (`gerarRetratoEstrategico`, determinístico, sem IA) e exibido na revelação. Métrica **Clareza Gerada** registrada via `SinalValor` (pergunta inicial, descoberta, decisão sugerida; sem score artificial). **Raio-X Inicial da Empresa** entregue gratuitamente antes do cadastro (5 partes + "fotografia inicial"). **Exploração de cenários** (`/explorar`): "Como seria se eu aumentasse preços / contratasse alguém / criasse uma nova oferta?" — determinística, sempre "Com base no que sabemos hoje...", nunca prevendo futuro. `tsc` e `npm run build` limpos.

**Documento criado:** `P57A_DIAGNOSTICO_VALOR.md`. **STATUS: VALOR PERCEBIDO V1.**

---

## Programa 57B — Fundação Founder e Pertencimento V1

**2 de agosto de 2026**

Pertencimento materializado. A Ponte não tem planos — tem níveis de relacionamento. Cada conta criada recebe automaticamente um número único de pertencimento (`Apoiador #0001`, `Apoiador #0002`...), **nunca reutilizado e nunca alterado**, gravado na `Empresa` (`numeroApoiador`/`numeroFundador`, migração 006 aplicada em produção). Alocação atômica no `POST /api/auth/criar-conta` (transação + retry em colisão de índice único). Exibição: card de pertencimento em `/minha-empresa-hoje` e selos em `/fundador` e `/tornar-se-fundador`. Nova página **"Tornar-se Fundador"** (`/tornar-se-fundador`) — evolução, não venda — com os benefícios de participação simbólica e o botão **"Quero ser Fundador"** que abre o WhatsApp `48991133397` com a mensagem automática "Olá, quero participar como Founder da Ponte Digital." A promoção Apoiador→Fundador é manual inicialmente (a equipe registra data, empresa, número e conversa inicial). Marco histórico: primeiros 1000 usuários. `tsc` e `npm run build` limpos; produção redeployada.

**Documentos criados:** `P57B_FOUNDER_E_PERTENCIMENTO.md`. **STATUS: PERTENCIMENTO V1.**

---

## Programa 58 — Foundation Freeze Operacional V1

**2 de agosto de 2026**

Congelamento operacional: a Ponte Digital deixa oficialmente de ser "um sistema em construção" e passa a ser **"uma empresa de tecnologia aprendendo com seus primeiros usuários."** A partir deste programa, nenhuma funcionalidade é criada por ideia interna — toda evolução nasce de comportamento, pedidos, dificuldades e decisões dos Founders. Auditoria e reafirmação do baseline de estabilidade, segurança (multi-tenant), qualidade da experiência e segurança da IA (regra _"Com base no que entendemos..."_). Estrutura pronta para Founder 1, 10 e 50 sem alteração estrutural.

**Documento criado:** `P58_OPERATION_FREEZE_V1.md`. **STATUS: OPERAÇÃO OFICIAL.**

---

## Programa 56 — Produção Certificada + Fundação Histórica da Ponte Digital

**2 de agosto de 2026**

Encerramento da fase de construção e **início da operação real**. Foi executado o **deploy definitivo de produção** da branch `main` (`ca4a099`) na Vercel (equipe `ponte-digital1`, projeto `ponte-digital`, conta `pontedigitalsc-1314`), publicando `https://ponte-digital.vercel.app` com `target: production` e health `200 {"ambiente":"production"}`. Sincronização absoluta produção == main (migrations 5/5 "up to date", schema inalterado, build e TypeScript limpos, smoke de rotas públicas 200). Auditoria de confiança e da IA por código: `/api/assistente` resiliente (timeout 30s + `FALHA_GENTIL`), `handleApiError` sem vazamento de stack e erro amigável com `correlationId`, chamadas opcionais degradando com `.catch`. Segurança: `.vercel`/`.env*` ignorados no Git (nenhum segredo no repositório); conta Vercel corrigida para a proprietária. Domínio custom `pontedigital.com.br` registrado como pendência operacional (sob outra conta Vercel + DNS antigo); URL oficial é `ponte-digital.vercel.app`.

**Documentos criados:** `PRODUCTION_CERTIFIED_V1.md`, `FOUNDER_V1_FREEZE.md`, `HISTORIA_DA_PONTE_DIGITAL.md`, `INICIO_DA_OPERACAO.md`. **Status: produção VIVA, Founder V1 CONGELADO, OPERAÇÃO INICIADA.**

---

## Programa 55 — Certificação Founder Ready V1

**1 de agosto de 2026**

Congelamento técnico antes de ir para produção: auditoria total em 4 frentes. IA resiliente (`NoopProvider` lança erro, timeout 30s, `FALHA_GENTIL`); bug crítico de produção corrigido (escritas escopadas por `where: { id, empresaId }` + re-fetch, modelos-filho sem `empresaId` isentos do tenant guard); código morto removido (`centro-cognitivo/`, `micro-reaction.tsx`, `confidence-ring.tsx`); fricção de UX corrigida (CTA "Continuar" da Jornada com rota real). `tsc --noEmit` limpo e `npm run build` limpo. **Status: FOUNDER READY V1.**

---

## Programa 54 — Experiência Founder V2: Auditoria Total de Valor e Missão

**1 de agosto de 2026**

Aumento drástico do valor percebido em cada interação — sem adicionar módulos. Primeira conversa reestruturada (v5, 22 perguntas) começando pela empresa antes do empresário, com perguntas que entregam valor antes de pedir resposta e alternativas inteligentes com campo opcional "Se quiser, conte mais". Devolutiva que cita a empresa real (nome, o que faz, há quanto tempo, momento, maior preocupação). Identidade visual premium (tokens, `.card-premium`, gradientes, sombras, tipografia) aplicada na conversa, no Ritual Diário e nas Celebrações. Microcopy humano e auditoria de jargão visível: "leads/pipeline/funil/follow-up" → "negociações/oportunidades/retomar contato" em dashboard, assistente e engines; "Salvar" → "Guardar"; "Excluir" → "Remover"/"Remover desta história"; empty states em primeira pessoa; microcopy centralizado em `constants/index.ts`. Reações mais naturais. Centro de decisão reestruturado na narrativa de conselheiro (O que percebemos / Por que importa / O que pode acontecer / Próximo passo). Auditoria de telas e auditoria técnica com débitos registrados (MicroReaction órfão, `/diagnostico` legado). Nenhum schema novo, nenhum módulo novo, nenhuma tela ERP nova.

**Build: TypeScript 0 erros. Status: EXPERIÊNCIA FOUNDER V2 ATIVA.**

---

## Programa 53 — Experiência Ponte: Da Conversa ao Relacionamento

**1 de agosto de 2026**

Transformação da Ponte em presença constante na vida do empresário. A Ponte deixa de ser um lugar onde se administra e passa a ser o lugar onde o empresário é acolhido, reconhecido e lembrado. Os 16 pilares materializados: conversas vivas (ritual diário com saudação, foco do dia e leitura do momento), reconhecimento de momentos da empresa (crescendo, desacelerando, estagnada, sobrecarregada, comemorando, em recuperação), foco do dia variável por semana/fase do mês, biografia que não se perde (Linha da Vida com marcos reais mês a mês), histórias que criam desejo de voltar, evolução do fundador em 4 dimensões (clareza, confiança, maturidade, capacidade de decisão), percepções espontâneas, silêncio inteligente, conquistas que não são apenas dinheiro, memória afetiva, índice de clareza honesto, próximo melhor movimento único, pergunta que fica, personalidade permanente do assistente e retorno natural. Nenhum schema novo, nenhuma tela ERP nova, nenhum módulo administrativo — tudo reutilizou o patrimônio existente.

**Build: TypeScript 0 erros. Status: EXPERIÊNCIA PONTE ATIVA.**

---

## Programa 52 — Inteligência Conversacional Estratégica + Perguntas que Constroem Empresas

**1 de agosto de 2026**

Transformação da conversa em aconselhamento empresarial contínuo e criação do aprendizado estruturado do fundador. Primeiro pilar (Inteligência Conversacional Estratégica): primeira conversa reestruturada nos 5 estágios do conselheiro (contexto → realidade → tensão → evolução → próximo movimento), motor de qualidade das perguntas (objetivo, capacidade, patrimônio, tipo de resposta, impacto), perguntas adaptativas com foco contextual (sem transações, crescimento, queda, inadimplência, tarefas atrasadas), memória de conversa que cita o empresário com as palavras dele, recomendações que contam história no centro de decisão, Centro Diário respondendo as 5 perguntas essenciais e ritual mensal "Revisão da Evolução" (Antes/Durante/Depois/Próximo). Segundo pilar (Perguntas que Constroem Empresas): Biblioteca das Grandes Perguntas, Pergunta Aberta da Semana (apenas uma ativa por vez), inserção natural no fim de conversas compatíveis, registro automático das respostas, Painel do Fundador (`/painel-do-fundador`, exclusivo, sem IA inventando conclusões), revisão semanal e promoção para conhecimento (ConhecimentoColetivo). Schema: migration `005_p52_perguntas_que_constroem_empresas`.

**Build: TypeScript 0 erros. Status: CONVERSA INTELIGENTE ATIVA.**

---

## Programas 48–51 — Diagnóstico Refinado, Relação Contínua, Fluxo Founder e Regulamentação

**Julho 2026**

Diagnóstico refinado (P48), nascimento da Relação Contínua com Pergunta Viva, Reflexão da Semana, Memória Emocional, Minha Jornada e memória viva (P49), fluxo completo do Founder com dashboard de presença e linha da história (P50/P51). 51 rotas, build e typecheck limpos.

---

## Programa 47 — Acquisition Foundation V1

**30 de julho de 2026**

Primeira experiência pública de aquisição da Ponte Digital. Landing reescrita com base na dor invisível do empresário ("O peso invisível de administrar uma empresa"), CTA "Entender minha empresa" sem linguagem de vendas. Diagnóstico inicial sem cadastro (`/diagnostico`) com 5 perguntas abertas, revelação textual personalizada, Retrato Inicial da Empresa (5 dimensões), sistema Apoiador numerado (`AP-XXXXX`), programa Fundador limitado a 1000 posições históricas, e 3 caminhos equivalentes pós-revelação. Constituição da Aquisição criada.

**Build: 48s compile. TypeScript: 0 erros. 55 rotas. Status: AQUISIÇÃO RELACIONAL ATIVA.**

---

## Programa 46 — Relationship Continuity V1

**30 de julho de 2026**

Nascimento da Relação Contínua. Transformação da Ponte de experiência única de diagnóstico em relação contínua de clareza empresarial. Check-in emocional (dashboard como "Como sua empresa está hoje?" com 5 emojis), carta evolutiva (admiração + descoberta + ação única + observação futura), Minha Jornada (7 capítulos narrativos), memória viva no GET /api/conversa, Founder como pertencimento (não venda), sidebar simplificada (grupo "Sua empresa"), header sem ruído, conversa contínua (carta prepara retorno), silêncio inteligente (reações de maturidade). Auditoria final, freeze da relação contínua, snapshot RELATIONSHIP_CONTINUITY_V1.md.

**Build: 45s compile. TypeScript: 0 erros. 54 rotas. Proxy: ATIVO. Status: RELAÇÃO ATIVA.**

---

## Programa 41 — Stable Release V3

**29 de julho de 2026**

Preparação definitiva para produção. Auditorias completas de aplicação, banco, segurança, deploy, experiência Founder, conversa, conformidade constitucional e performance. Ativação do proxy de autenticação. Correção do tenant guard para bloquear em produção. Remoção de rota morta (`/register`). Atualização de documentação (CURRENT_PRODUCT, FEATURE_MATRIX, CHANGELOG). Snapshot oficial da plataforma (STABLE_RELEASE_V3.md). Congelamento técnico formal (FOUNDATION_STABLE_V3.md). Checklist final de produção. Relatório executivo de liberação.

**Build: 19.1s compile. TypeScript: 0 erros. Proxy: ATIVO. Status: LIBERADO.**

---

## Programa 40 — Era da Validação

**29 de julho de 2026**

Criação do sistema científico da plataforma: Diário Científico (`/admin/diario-cientifico`), Sistema Oficial de Evidências (RegistroCientifico, ConhecimentoColetivo, CasoReal), Radar dos Founders (`/admin/radar-founders`), Índice de Transformação (engine de 6 dimensões), Manifesto da Era da Validação. A plataforma passa a aprender continuamente com Founders reais.

---

## Programas 35–39 — Foundation Release V2.0

**Julho de 2026**

Auditoria patrimonial completa. Auditoria de experiência Founder (22 páginas verificadas, 4 pontos de fricção corrigidos). Auditoria de valor (CaixaDia sem hardcoded zeros). Auditoria de linguagem (6 acentos corrigidos, placeholders unificados, 14 referências no COGNITIVE_MAP.md). Auditoria radical de simplicidade (cards redundantes removidos). Correção constitucional da landing ("A inteligência da sua empresa" → "A clareza que seu negócio precisa"). Manifesto Founder publicado. Plano dos primeiros 10 Founders. Política de evolução baseada em evidência. Foundation Release V2.0 publicada. Foundation Day registrado.

---

## Programas 33–34 — Limpeza & Fluxo Cognitivo

**Julho de 2026**

P33: Eliminação de aparência de ERP — 35 componentes mortos deletados, jargão técnico removido (HealthScore, ConfidenceRing, CognitiveAvatar, ScoreBar), 4 documentos de auditoria produzidos. P34: Design do Fluxo Cognitivo Operacional. P34B: Materialização completa — Página Única de Atendimento, Centro Diário, Timeline Viva, Caixa Inteligente, Ciclo Cognitivo Visual, sidebar simplificada.

---

## Programa 32 — A Constituição da Ponte Digital

**Julho/2026**

Criação da Constituição oficial da Ponte Digital: 13 documentos que definem missão, princípios, patrimônios, capacidades, regra de ouro, arquitetura do motor cognitivo, domínios, ciclo de evolução, árvore de decisões de produto e contrato com o usuário. A empresa passa a ter identidade permanente.

---

## Programa 31D — A Experiência da Evolução (Finalização)

**Julho/2026**

Refinamento final do dashboard evolutivo: ritual diário, espelho da empresa, capacidades vivas, capital cognitivo explicável, curva narrativa, conhecimento gerado, memória viva, evolução visível, próximo nível, auditoria final.

---

## Programa 31 — Dashboard Evolutivo + Fase Final

**Julho/2026**

Transformação do dashboard em ritual diário. Criação de 20 componentes cognitivos: CompanyMirrorCard, KnowledgeGeneratedPanel, MemoryShiftCard, MonthlySummaryCard, ExecutiveNarrativeCard aprimorado, EvolutionCurveCard com narrativa por ponto, AdaptiveCapacityCard, NextLevelCard. Integração da curva evolutiva como narrativa.

---

## Programa 30 — Critérios & Matriz de Materialização

**Julho/2026**

Definição de critérios objetivos para decidir o que construir. Mapa de dependências entre componentes. Matriz de materialização para rastrear o que foi implementado vs. o que é conceitual.

---

## Programa 29 — Materialização & Auditoria

**Junho-Julho/2026**

Materialização dos conceitos cognitivos em componentes de interface. Auditoria completa da superfície. Mapas de materialização. Backlog visual e de interface. 20+ sistemas oficiais (navegação, atenção, continuidade, sofisticação, densidade, layout, movimento, performance percebida, assistente, centro de decisão, conhecimento visível, dashboard).

---

## Programa 28 — Sistema Visual Oficial

**Junho/2026**

Criação do sistema visual oficial da Ponte Digital. Manifesto da Elegância Cognitiva. Sistemas oficiais de: assinatura visual, atenção, hierarquia cognitiva, identidade emocional, narrativa, personalidade, respiração, ritmo, beleza funcional. Biblioteca de referências.

---

## Programa 27 — Polimento & Microinterações

**Junho/2026**

Arquitetura emocional completa. Biblioteca de emoções e microinterações. Cognitive Design System. Guias de desktop, mobile/responsivo, estados e performance. Auditorias de elegância e polimento.

---

## Programa 26 — Empresa que Aprende

**Maio-Junho/2026**

Transição da Era da Observação para a Era da Empresa que Aprende. Criação do ciclo de aprendizado de 90 dias. Sistema de memória empresarial. Protocolos de decisão e observação. Painel da Empresa Zero. Relatórios mensais e semanais de inteligência. Manifesto da Empresa que Aprende. Primeiras 100 observações catalogadas.

---

## Programa 25 — Era da Observação

**Maio/2026**

Início oficial da validação com Empresa Zero. Plano oficial de validação. Backlog científico e consolidado. Hipóteses classificadas. Protocolo da Era da Observação. Revisão de inconsistências. Sistema de priorização oficial. Marco de transição.

---

## Programa 24 — Certificação da Fundação

**Abril-Maio/2026**

Certificação completa da fundação: arquitetural, científica, cognitiva, experiência, governança, implementação, Empresa Zero, terminológica, visual. Ata de congelamento da fundação. Matriz de rastreabilidade. Pendências estruturais. Decisão de scope.

---

## Programa 23 — Experiência Cognitiva

**Abril/2026**

Criação da experiência cognitiva completa: arquitetura visual da conversa, experiência sensorial, gamificação cognitiva, guia da conversa, identidade da inteligência, loading inteligente, manifesto da experiência, manual da inteligência visível, manual de transições, mapas cognitivo vivo, matriz da percepção, métricas da experiência, microinterações, psicologia da primeira impressão, sistema de confiança visual, sistema de insights, sistema de valor.

---

## Programa 22 — Motor Cognitivo

**Março-Abril/2026**

Construção do Motor Cognitivo: orquestrador, engines de capital cognitivo, curva evolutiva, memória, narrativa, radar, calor cognitivo, decisões, hipóteses, evidências, aprendizado, governo do conhecimento. Infraestrutura de eventos, barramento cognitivo, sistema de cache, rate limit.

---

## Programa 21 — Empresa Zero

**Março/2026**

Ativação da Empresa Zero com modelo operacional, diário cognitivo e ciclo de 30 dias. Primeira versão funcional da plataforma com Next.js, Prisma, Supabase. Modelo de dados inicial. Autenticação e autorização. Setup de deploy na Vercel.

---

## Programas 0–20 (Pré-História)

**2024–Fevereiro/2026**

Descoberta do problema, validação de hipóteses, definição da visão, primeiros protótipos. Transição para a versão estruturada com Next.js 16. Este período não está formalmente documentado no changelog oficial.

---

*Changelog mantido a partir do Programa 21. Período anterior registrado como "Pré-História" — não documentado oficialmente.*
