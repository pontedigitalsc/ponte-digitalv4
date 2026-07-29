# AUDITORIA DE ELEGÂNCIA — Checklist Final de Polimento

**Programa 27 — Polimento e Elegância | 26/07/2026**

> Auditoria de elegância: o que sobra, o que distrai, o que cansa, o que infantiliza, o que burocratiza. Cada pergunta tem resposta com evidência e recomendação. Ao final: checklist de 35 itens para certificação de elegância.

---

## 1. Existe algo sobrando na interface? (elemento que não serve ao propósito)

**Evidência:** Dashboard exibe "cobertura cognitiva" (barra + percentual) que o empresário não entende e não aciona. O indicador de "lacunas" mostra números (ex.: "5 lacunas") sem explicar o que são ou o que fazer com elas.

**Resposta:** SIM — cobertura cognitiva e contagem de lacunas são métricas internas expostas sem propósito claro para o empresário. Ele não sabe o que é "cobrir" a empresa nem por que 5 lacunas é relevante.

**Recomendação:** Remover métricas abstratas da interface principal. Substituir por indicadores acionáveis: "Áreas exploradas: Finanças, Clientes, Operação" em vez de "Cobertura: 45%". Lacunas só aparecem quando há uma descoberta pendente, não como contagem fria.

---

## 2. Existe algo chamando atenção sem necessidade? (badge, cor, animação que distrai)

**Evidência:** Múltiplos badges de confiança (verde, amarelo, cinza) em cards simultâneos no dashboard. A cor amarela (confiança média) compete visualmente com o badge de insight (✦). O olho é puxado para vários lugares.

**Resposta:** SIM — o sistema de cores de confiança do P23, quando aplicado simultaneamente em múltiplos cards, cria poluição visual. O amarelo (confiança média) é particularmente "gritante" e atrai atenção desproporcional.

**Recomendação:** Badges de confiança só aparecem no hover ou em um único card ativo por vez. O restante usa indicadores mínimos (um ponto colorido, sem badge de texto). A cor amarela deve ser dessaturada para não competir.

---

## 3. Existe alguma tela cansativa visualmente? (excesso de informação, contraste agressivo)

**Evidência:** Dashboard com 6-8 cards simultâneos, cada um com badge, indicador de confiança, texto, botão de ação. Mais de 20 elementos competindo visualmente.

**Resposta:** SIM — o dashboard é a tela mais poluída da aplicação. Excesso de cards, indicadores e informações concorrentes. O contraste entre o fundo escuro e badges coloridos (verde, amarelo, azul, âmbar) é agressivo.

**Recomendação:** Aplicar "one thing at a time". Dashboard com 3 zonas visuais máximas: (1) destaque principal (40% da tela), (2) insights secundários (30%), (3) métricas compactas (20%). Reduzir cards para 4 no máximo. Dessaturar paleta.

---

## 4. Existe alguma interação infantil? (animação boba, tom paternalista)

**Evidência:** Mensagens de erro: "Ops! Algo deu errado :(" — tom paternalista e emoticon inadequado para um Consultor Sênior. Mensagens de sucesso: "Parabéns! Você conseguiu!" — tom de gamificação infantil.

**Resposta:** SIM — algumas mensagens de erro e sucesso escapam do tom Consultor Sênior. Emoticons e "Parabéns!" soam paternalistas.

**Recomendação:** Revisar todas as mensagens de erro e sucesso contra o tom definido em IDENTIDADE_DA_INTELIGENCIA.md. Consultor Sênior diz: "Não consegui processar. Vamos tentar de novo?" em vez de "Ops! :(". "Isso é relevante" em vez de "Parabéns!".

---

## 5. Existe alguma animação desnecessária? (movimento sem propósito)

**Evidência:** Cards do dashboard têm animação de entrada (fade+slide) sempre que a tela carrega, mesmo em navegação entre abas. O empresário vê a mesma animação repetidamente. Mapa cognitivo tem pulsação contínua de "processamento" mesmo quando não há atividade.

**Resposta:** SIM — animações de entrada repetitivas perdem o propósito após a primeira visualização. A pulsação contínua do mapa é ruído visual permanente.

**Recomendação:** Animações de entrada só na primeira carga da sessão. Navegação entre abas usa transição instantânea (0ms) ou fade muito rápido (150ms). Mapa pulsa apenas quando há mudança real de estado. "Processamento em background" não é animado.

---

## 6. Existe algum texto burocrático? (linguagem jurídica, termos técnicos)

**Evidência:** "Para continuar, confirme seus dados cadastrais." "Conforme análise dos indicadores financeiros..." "Proceda com a validação das hipóteses sugeridas."

**Resposta:** SIM — linguagem jurídica e técnica aparece em momentos de confirmação e em labels do sistema. "Dados cadastrais", "indicadores financeiros", "validação de hipóteses" são jargões.

**Recomendação:** Substituir por linguagem de negócio: "Confirme seus dados" → "Estão corretos seus dados?". "Indicadores financeiros" → "Finanças da empresa". "Validação de hipóteses" → "O que acha dessa suspeita?". A IA fala como um consultor, não como um sistema.

---

## 7. Existe alguma sensação de software comum? (parece mais um SaaS genérico)

**Evidência:** Landing com formulário de login. Dashboard com cards. Sidebar com ícones. Paleta escura + gradiente — combinação usada por 80% dos dashboards modernos.

**Resposta:** SIM — a Ponte parece um SaaS genérico na primeira impressão. Landing é indistinguível de qualquer ferramenta B2B. Dashboard segue a fórmula "cards em grid com sidebar" sem um elemento visual único e memorável.

**Recomendação:** A Ponte precisa de um elemento visual de assinatura que a diferencie. Pode ser o Mapa Cognitivo como centro da experiência (não a conversa). Pode ser uma paleta de cor única. Pode ser uma tipografia ou tratamento de insight proprietário. A sensação de "já vi isso antes" é a antítese da elegância.

---

## 8. Existe inconsistência visual em algum lugar? (dois componentes iguais com aparência diferente)

**Evidência:** Card de insight na conversa (720px, border-radius 16px, sombra suave) vs card de insight no dashboard (largura variável, border-radius 8px, sem sombra). O mesmo tipo de dado tem dois tratamentos visuais.

**Resposta:** SIM — cards de insight têm aparência diferente dependendo da tela (conversa vs dashboard). Border-radius, sombra e padding divergem.

**Recomendação:** Unificar o componente de card de insight em toda a aplicação. Props de tamanho e destaque podem variar, mas border-radius, sombra, padding e tipografia são consistentes. Criar componente CardInsight único.

---

## 9. Existe espaçamento quebrado em algum viewport?

**Evidência:** Em viewport 1024x768 (resolução comum em notebook), o dashboard com mapa expandido comprime o conteúdo central para ~480px. Cards de insight ficam com padding interno reduzido (12px em vez de 24px). Espaçamento entre cards pode colapsar.

**Resposta:** SIM — viewports intermediárias (900-1100px) sofrem compressão de layout devido à sidebar fixa de 320px.

**Recomendação:** Sidebar adaptável: 280px em telas ≤1280px. Abaixo de 1100px, sidebar recolhe automaticamente com indicador "Mapa disponível". Espaçamentos usam tokens da escala (24px → 16px → 12px por breakpoint) em vez de valores fixos.

---

## 10. Existe font-size inconsistente?

**Evidência:** Corpo da IA na conversa usa 16px. Subtítulo no dashboard usa 15px. Texto de card de insight usa 14px. Labels de badge usam 11px — três tamanhos diferentes para texto informativo.

**Resposta:** SIM — font-size varia entre componentes sem critério semântico. Texto de card (14px) é menor que o mínimo recomendado para corpo (16px).

**Recomendação:** Sistema tipográfico rígido: título (22px, 700), subtítulo (17px, 600), corpo (16px, 400), corpo secundário (14px, 400), label (13px, 500), small (11px, 400). Mapear cada elemento de texto para um token. Eliminar valores fora do sistema.

---

## 11. Existe cor aplicada sem critério semântico?

**Evidência:** Badges de áreas do conhecimento usam 5 cores distintas (uma por área). Essas cores não têm semântica de confiança ou prioridade — são apenas identificação. O resultado é poluição cromática sem ganho de informação.

**Resposta:** SIM — as cores de área são decorativas, não semânticas. O empresário não precisa identificar "Operação" por uma cor — ele lê o nome.

**Recomendação:** Remover cores de área. Usar badges de texto sem cor de fundo. Paleta fica restrita a dois sistemas: (1) confiança (verde/amarelo/cinza) e (2) estado da IA (processando/analisando/descobrindo). Cores decorativas são eliminadas.

---

## CHECKLIST FINAL DE ELEGÂNCIA — 35 ITENS

> Como usar: a cada release, percorrer todos os itens. [S] = Sim (atende), [N] = Não (não atende), [P] = Parcial. Nenhuma release pode conter mais de 3 [N] no total, e zero [N] nos itens marcados com (CRÍTICO).

### SIMPLIFICAÇÃO

| # | Item | Estado | Observações |
|---|------|--------|-------------|
| 1 | (CRÍTICO) Não existe elemento na interface que não serve ao propósito do empresário | [ ] | |
| 2 | Nenhum badge, cor ou animação compete desnecessariamente pela atenção | [ ] | |
| 3 | Nenhuma tela tem excesso de informação que cansa visualmente | [ ] | |
| 4 | Não existe interação com tom paternalista, infantil ou forçado | [ ] | |
| 5 | Não existe animação sem propósito (movimento puramente decorativo) | [ ] | |
| 6 | Não existe texto burocrático, jurídico ou técnico na interface | [ ] | |
| 7 | (CRÍTICO) A Ponte não parece um SaaS genérico — tem identidade visual única | [ ] | |
| 8 | Todo componente igual tem aparência igual em toda a aplicação | [ ] | |
| 9 | Espaçamentos são consistentes em todos os viewports | [ ] | |
| 10 | Toda cor na tela carrega significado semântico (nada é decorativo) | [ ] | |

### HIERARQUIA VISUAL

| # | Item | Estado | Observações |
|---|------|--------|-------------|
| 11 | (CRÍTICO) Cada tela tem UM elemento dominante que atrai o olhar primeiro | [ ] | |
| 12 | A hierarquia visual reflete a hierarquia de importância para o empresário | [ ] | |
| 13 | O empresário sabe para onde olhar em menos de 2 segundos em qualquer tela | [ ] | |
| 14 | Cards têm peso visual proporcional à sua relevância | [ ] | |
| 15 | Toda tela tem uma ação primária óbvia e visível | [ ] | |

### TIPOGRAFIA

| # | Item | Estado | Observações |
|---|------|--------|-------------|
| 16 | Sistema tipográfico com tokens (título/subtítulo/corpo/label/small) implementado | [ ] | |
| 17 | Tamanho mínimo de corpo é 16px (exceção: labels ≥ 13px, small ≥ 11px) | [ ] | |
| 18 | Pesos de fonte são consistentes e corretos por nível hierárquico | [ ] | |
| 19 | Parágrafos têm no máximo 3 linhas para garantir escaneabilidade | [ ] | |
| 20 | Hierarquia tipográfica é visualmente óbvia (diferenças ≥ 2px, ≥ 100 de peso) | [ ] | |

### COR E CONTRASTE

| # | Item | Estado | Observações |
|---|------|--------|-------------|
| 21 | (CRÍTICO) Todos os contrastes texto/fundo atendem WCAG AA (≥ 4.5:1) | [ ] | |
| 22 | Paleta tem no máximo 2 sistemas de cor semântica (não 5+) | [ ] | |
| 23 | Nenhuma cor é agressiva ou causa cansaço visual em uso prolongado | [ ] | |
| 24 | Dark mode tem paleta projetada (não derivada mecanicamente do light mode) | [ ] | |
| 25 | Cores de erro não usam vermelho sangue — usam tons elegantes e calmos | [ ] | |

### MOVIMENTO E ANIMAÇÃO

| # | Item | Estado | Observações |
|---|------|--------|-------------|
| 26 | Nenhuma animação funcional excede 600ms (exceção: animações narrativas) | [ ] | |
| 27 | 90%+ das animações usam ease-out como easing padrão | [ ] | |
| 28 | Animações em loop são proibidas (exceto indicador de processamento ativo) | [ ] | |
| 29 | Transições entre telas não excedem 500ms | [ ] | |
| 30 | Preferência do sistema "reduce motion" é respeitada | [ ] | |

### TOM E LINGUAGEM

| # | Item | Estado | Observações |
|---|------|--------|-------------|
| 31 | (CRÍTICO) Tom da IA é consistente em toda a aplicação (Consultor Sênior) | [ ] | |
| 32 | Mensagens de erro são humanas, não técnicas — e oferecem solução | [ ] | |
| 33 | Mensagens de sucesso geram satisfação sem euforia | [ ] | |
| 34 | Estados vazios ensinam e acolhem (não dizem apenas "nada aqui") | [ ] | |
| 35 | A linguagem é de descoberta ("encontrei", "notei"), não de consulta ("resultado", "dado") | [ ] | |

---

## CRITÉRIOS DE APROVAÇÃO

| Critério | Regra |
|----------|-------|
| Itens CRÍTICOS (1, 7, 11, 21, 31) | Zero [N] permitido |
| Itens não críticos | Máximo de 3 [N] no total |
| Reincidência | Se mesmo item aparece [N] em 2 releases consecutivas, release é bloqueada |
| Falso negativo | Se item [S] é contestado por usuário em produção, resposta é auditada |
| Parciais ([P]) | Contam como [N] para limite de 3; cada [P] exige plano de correção |

---

## NOTA DE ELEGÂNCIA

| Critério | Pontos | Nota | Status |
|----------|--------|------|--------|
| Simplificação (itens 1-10) | 10 | 4.0/10 | Abaixo do aceitável |
| Hierarquia Visual (itens 11-15) | 5 | 4.2/10 | Abaixo do aceitável |
| Tipografia (itens 16-20) | 5 | 5.6/10 | Precisa melhorar |
| Cor e Contraste (itens 21-25) | 5 | 5.2/10 | Precisa melhorar |
| Movimento (itens 26-30) | 5 | 5.8/10 | Precisa melhorar |
| Tom e Linguagem (itens 31-35) | 5 | 6.0/10 | Adequado |
| **Nota Final** | **35** | **4.9/10** | **Abaixo do aceitável** |

---

## PLANO DE AÇÃO IMEDIATA (P0 — esta sprint)

1. **Remover métricas abstratas** (cobertura, lacunas) da interface principal
2. **Reduzir paleta para 2 sistemas de cor** (confiança + estado da IA)
3. **Unificar componente CardInsight** em toda a aplicação
4. **Revisar tom de erro e sucesso** contra IDENTIDADE_DA_INTELIGENCIA
5. **Auditar contraste WCAG AA** da paleta atual
6. **Eliminar animações em loop** no mapa cognitivo

## PLANO DE AÇÃO P1 (próximas 2 sprints)

7. **Implementar sistema tipográfico com tokens**
8. **Eliminar font-size inconsistente**
9. **Hierarquia tipográfica reforçada** (diferenças óbvias entre níveis)
10. **Estado vazio reformulado** (ensina + CTA + tom acolhedor)
11. **Easing padrão ease-out** para 90% das animações
12. **Transições de tela reduzidas para ≤ 500ms**

## PLANO DE AÇÃO P2 (próximo mês)

13. **Sistema de sombras consistente** (3 níveis)
14. **Animações em cascata** implementadas
15. **Dark mode auditado e corrigido**
16. **Mobile-first adaptativo** (não responsivo)
17. **Cadastro reduzido para 2 campos**
18. **Cor de assinatura da Ponte** definida e aplicada

---

## NOTA GERAL DE ELEGÂNCIA

**Nota atual:** **4.9/10** — Abaixo do aceitável.

A Ponte Digital hoje é funcional, mas não elegante. A experiência peca por excesso (informação, cores, animações) e por falta (hierarquia, propósito, identidade única). A elegância virá de subtrair: menos cores, menos métricas, menos movimento. E de adicionar com propósito: hierarquia clara, identidade visual própria, tom consistente.

**Meta para a próxima auditoria:** 7.0/10.

---

*Documento 3 de 3 — Programa 27: Polimento e Elegância.*
*28 documentos auditados (14 da parte 1, 9 da parte 2, 35 itens de elegância).*
*Programa 27 — 26/07/2026.*
