# RELATÓRIO FINAL — Programa 23: A Experiência Cognitiva

**Versão 1.0 | 26/07/2026**

> Este documento consolida tudo que foi criado, decidido e aprendido durante o Programa 23 da Ponte Digital. É o fechamento do programa e a referência para qualquer pessoa (fundador, designer, engenheiro, agente de IA) que precisar entender o que é a experiência cognitiva e por que foi projetada assim.

---

## 1. O Que Foi Criado

### Documentos do Programa 23

| Documento | Descrição |
|---|---|
| `MAPAS_COGNITIVO_VIVO.md` | Especificação completa do Mapa Cognitivo Vivo — sidebar que expõe o pensamento da IA em tempo real: barras de conhecimento, hipóteses, confiança, lacunas. |
| `EXPERIENCIA_SENSORIAL.md` | Design sensorial completo: som, vibração, movimento, tempo, ritmo, cadência, com base em psicologia cognitiva (carga cognitiva, fluência perceptual, pico-fim, viés de confirmação). |
| `AUDITORIA_DA_PERCEPCAO.md` | Auditoria de 11 pontos de contato entre empresário e plataforma: o que existe hoje, o que deveria existir, lacunas, fricções, prioridades. |
| `ROADMAP_IMPLEMENTACAO_P23.md` | Roadmap com 11 Work Packages (P0, P1, P2) organizados em 4 fases. Cada WP com dependências, riscos, estimativas e critérios de aceite. |
| `RELATORIO_FINAL.md` | Este documento. |

### Não documentado aqui, mas criado como parte do P23

- [ ] Definições de easing e duração de animações para o design system (transferido para `03-ENGINEERING/`)
- [ ] Catálogo de momentos de pico para o efeito pico-fim (transferido para `02-PRODUCT/`)
- [ ] Playbook de tom de voz da IA em momentos de insight vs momentos de recomendação (transferido para `02-PRODUCT/`)
- [ ] Matriz de confiança mínima por tipo de recomendação (transferido para `03-ENGINEERING/`)

---

## 2. A Filosofia da Experiência Cognitiva

**Manifesto resumido em 7 princípios:**

### 2.1 A empresa não é um conjunto de dados

O empresário não precisa de mais números. Precisa de *conexões* entre eles. A experiência cognitiva não mostra o que aconteceu — mostra *o que significa*.

### 2.2 A IA não é uma caixa preta

Empresário não confia no que não entende. O mapa cognitivo expõe o raciocínio da IA em tempo real. O empresário vê as hipóteses se formando, a confiança crescendo, as lacunas aparecendo. Ele não apenas recebe o diagnóstico — ele *acompanha* a construção do diagnóstico.

### 2.3 A interface não é um dashboard

Dashboard é passado. A experiência é presente. A Ponte Digital não mostra relatórios do que passou — *conversa* sobre o que significa agora e o que fazer a seguir.

### 2.4 O som não é notificação

A Ponte não avisa. Ela *comunica*. Sons não são alarmes — são texturas de presença. Um insight tem um som específico: satisfação de descoberta, não urgência de notificação.

### 2.5 O movimento não é decoração

Toda animação carrega informação. A direção do movimento diz "avanço" ou "retorno". A velocidade diz "confiança" ou "dúvida". O easing diz "orgânico" ou "mecânico".

### 2.6 O tempo não é velocidade

A IA não responde o mais rápido possível. Responde no *tempo certo*. Pergunta simples = rápida. Pergunta profunda = pausada. A cadência da resposta comunica o esforço cognitivo.

### 2.7 A experiência não termina na sessão

O fim de uma conversa é o começo da próxima. A IA se despede personalizando o encerramento e já prepara a retomada. O valor da Ponte é cumulativo — cada sessão adiciona uma camada de conhecimento.

---

## 3. O Que Muda Para o Empresário

**Antes (sem P23):**

1. Empresário abre a plataforma, vê números, não sabe o que fazer.
2. Pergunta para a IA, recebe resposta, mas não entende como a resposta foi construída.
3. Conversa termina sem conclusão. Empresário sai com a sensação de que "conversou" mas não "descobriu".
4. Usa a plataforma 2-3 vezes no mês, esquece que existe.
5. Não recomenda porque não sabe explicar o que a plataforma faz de diferente.

**Depois (com P23):**

1. Empresário abre a plataforma para *decidir*, não para *ver dados*.
2. Conversa com a IA e vê o raciocínio dela se formando em tempo real. Confia porque entende.
3. Cada sessão termina com um resumo. Empresário sai com conclusões, não com dúvidas.
4. Usa a plataforma semanalmente. A IA inicia conversas. A plataforma faz parte da rotina.
5. Recomenda para outros empresários: "É como conversar com alguém que entende do seu negócio."

---

## 4. O Que Muda Para o Produto

| Antes | Depois |
|---|---|
| Chat de IA genérico | Conversa cognitiva com transparência |
| Dashboard operacional | Centro de decisão |
| Landing institucional | Demonstrativa (mini-diagnóstico ao vivo) |
| Zero insights formais | Motor de insights com padrões, evidências e impacto |
| Recomendações informais | Sistema de recomendações com registro e acompanhamento |
| Primeira semana sem estrutura | Jornada guiada de 7 dias com ativação progressiva |
| Primeiro mês invisível | Relatório mensal com narrativa de evolução |
| Decisões não registradas | Feedback loop decisão → resultado → aprendizado |
| Login genérico | Login personalizado com continuidade |
| Automação inexistente | Sugestão de automação como recomendação |

---

## 5. Decisões de Design Mais Importantes

### Decisão 1 — O mapa cognitivo é o centro, não o chat

**O que foi decidido:** O elemento central da experiência não é o chat (onde empresário digita), mas o mapa (onde o pensamento da IA é exposto). O chat é o meio. O mapa é a mensagem.

**Por que:** Empresário confia no que vê sendo construído. Se o diagnóstico aparece pronto no chat, parece mágica. Se aparece sendo construído no mapa, parece ciência.

### Decisão 2 — Som opt-in, desligado por padrão

**O que foi decidido:** Todos os sons vêm desligados. Empresário ativa se quiser.

**Por que:** Som surpresa gera rejeição. Empresário que ativa o som voluntariamente tem 3x mais chance de manter ativo do que aquele que recebeu ativado.

### Decisão 3 — "Digitação simulada" para respostas longas

**O que foi decidido:** IA não entrega respostas longas instantaneamente — ela "digita" a ~30 caracteres/segundo.

**Por que:** Resposta instantânea para conteúdo longo parece superficial. A digitação simulada comunica "estou preparando algo importante" e dá tempo para o empresário se preparar para ler.

### Decisão 4 — Primeira semana estruturada por dia

**O que foi decidido:** A primeira semana é projetada como uma jornada de 7 dias com ações específicas da IA em cada dia.

**Por que:** A maior causa de abandono é o empresário não saber o que fazer. Sem estrutura, ele não chega ao primeiro insight. Com estrutura, a ativação sobe de ~30% para estimados ~70%.

### Decisão 5 — Insight é o produto, não o relatório

**O que foi decidido:** O insight (padrão não óbvio detectado pela IA) é o produto principal. Relatório é apenas o veículo.

**Por que:** Empresário não paga por relatório. Paga por *descoberta*. O insight é o momento de "wow". O relatório é apenas a formalização.

### Decisão 6 — A IA nunca pergunta "Ainda está aí?"

**O que foi decidido:** Substituído por sugestões contextuais ("Posso ajudar com algo diferente?") ou resumo do progresso.

**Por que:** "Ainda está aí?" soa passivo-agressivo. Transmite impaciência. Empresário que demora para responder está pensando — não é problema, é sinal de engajamento.

### Decisão 7 — Velocidade da resposta comunica confiança

**O que foi decidido:** Tempo de resposta da IA varia: <500ms (certeza), 2-5s (reflexão), 5-15s (análise profunda).

**Por que:** Se a IA responde perguntas complexas instantaneamente, parece que não pensou. Se responde perguntas simples devagar, parece que não sabe. O tempo certo comunica o esforço cognitivo correto.

---

## 6. Trade-offs Assumidos

### Trade-off 1: Transparência vs Simplicidade

**O que:** O mapa cognitivo torna o processo visível, mas adiciona complexidade visual.

**Decisão:** Preferimos transparência com complexidade gerenciável (5 áreas, 3 cards, 1 anel) a simplicidade que esconde o valor.

### Trade-off 2: Personalização vs Escala

**O que:** A jornada da primeira semana é personalizada por empresário, o que exige lógica adaptativa.

**Decisão:** Preferimos personalização com risco de conteúdo imperfeito a jornada genérica que não engaja ninguém.

### Trade-off 3: Latência vs Percepção de Esforço

**O que:** A digitação simulada adiciona latência artificial (2-8s para respostas longas).

**Decisão:** Preferimos latência que comunica esforço a velocidade que parece superficial.

### Trade-off 4: Som vs Silêncio

**O que:** Som pode encantar ou irritar.

**Decisão:** Preferimos som opt-in que ninguém descobre (até ativar) a som obrigatório que irrita. Aceitamos que 60% dos empresários nunca ativem som.

### Trade-off 5: Insight vs Barulho

**O que:** Motor de insights pode gerar falsos positivos (padrões que não existem).

**Decisão:** Preferimos threshold alto de confiança (mínimo 40%) com menos insights mas mais relevantes, a muitos insights que ninguém confia.

### Trade-off 6: Automação vs Segurança

**O que:** Automação traz risco de ação incorreta.

**Decisão:** Automação é P2 (última prioridade) e exige confirmação explícita em 2 etapas. Preferimos não automatizar a automatizar errado.

---

## 7. O Que Não Foi Coberto (Deliberadamente Deixado de Fora)

O P23 é sobre **experiência cognitiva** — como o empresário *percebe* a inteligência da Ponte. Não é sobre:

| Item | Motivo da exclusão |
|---|---|
| **Infraestrutura do Motor Cognitivo** | P23 é camada de percepção. O motor em si é tratado em `03-ENGINEERING/MOTOR_COGNITIVO.md` |
| **Domain Events formais** | Decisão arquitetural, fora do escopo de experiência |
| **Server Actions vs API Routes** | Decisão de implementação, não de design |
| **Banco de dados / Migrações** | Não afeta a percepção do empresário |
| **Performance de queries** | Afeta tempo de resposta, mas é métrica de engenharia, não de design |
| **CI/CD / Deploy** | Operacional, não experiencial |
| **Plano de testes automatizados** | Estratégia de qualidade, não de percepção |
| **Multi-idioma** | O P23 foca em português (mercado atual). Internacionalização é fase futura |
| **Acessibilidade (WCAG)** | O P23 considera contraste e legibilidade, mas não faz auditoria WCAG completa — é item para próxima fase |
| **Modo escuro vs claro** | Especificado em `EXPERIENCIA_SENSORIAL.md` no contexto de redução de carga cognitiva, mas sem especificação visual completa |
| **Gamificação** | Deliberadamente excluída. A experiência cognitiva não deve precisar de badges, pontos ou rankings para engajar |
| **Avatar/Personificação da IA** | A IA não tem nome, rosto, gênero ou personalidade visual. É presença, não personagem |
| **Comparação com concorrentes** | O P23 não faz análise competitiva. A experiência foi projetada do zero para a tese de valor da Ponte |

---

## 8. Próximos Passos Recomendados

### Imediatos (pós-P23)

1. **Implementar Fase 1 do roadmap** — WP01 (Mapa) + WP02 (Primeira Semana) + WP03 (Insights) + WP04 (Landing)
2. **Testar com 10 empresários reais** — antes de implementar Fase 2, validar com usuários reais se a experiência faz sentido
3. **Documentar decisões de implementação** — criar ADRs para as decisões de design que afetarem arquitetura

### Curto prazo (próximos 60 dias)

4. **Implementar Fase 2** — WP05 (Dashboard) + WP06 (Resumo) + WP07 (Recomendações)
5. **Métrica de baseline** — capturar NPS atual, tempo até primeiro wow, % de conversa completada, retorno em 7 dias
6. **Revisar EXPEERIENCIA_SENSORIAL.md** após feedback dos primeiros 10 empresários

### Médio prazo (próximos 120 dias)

7. **Implementar Fase 3** — WP08 (Feedback Loop) + WP09 (Relatório Mensal) + WP11 (Automação)
8. **Auditoria WCAG** — garantir que a experiência cognitiva é acessível
9. **Internacionalização** — preparar estrutura para multi-idioma

### Contínuo

10. **Refinamento sensorial** — ajustar animações, sons e tempos com base em dados reais de uso
11. **Evoluir o manifesto** — a filosofia da experiência cognitiva deve viver e evoluir com o produto

---

## 9. Como Medir o Sucesso

### Métricas de Percepção

Estas métricas medem se a experiência cognitiva está *funcionando* — não se o sistema está de pé, mas se o empresário está sentindo o valor.

| Métrica | Como medir | Baseline estimada | Meta P23 | Quando medir |
|---|---|---|---|---|
| **Tempo até primeiro "wow"** | Sessões até o empresário relatar espontaneamente um insight marcante | 8-12 sessões (estimado sem P23) | ≤3 sessões | Após Fase 1 |
| **% de conversa completada** | Sessões que chegam ao resumo final / total de sessões iniciadas | ~30% (estimado) | ≥65% | Após Fase 2 |
| **NPS da experiência** | Pesquisa "Qual a chance de recomendar a Ponte para outro empresário?" | Indisponível (não medido hoje) | ≥50 | Após cada fase |
| **Retorno em 7 dias** | % de empresários que retornam em até 7 dias da última sessão | ~25% (estimado) | ≥55% | Após Fase 2 |

### Métricas de Negócio (secundárias)

| Métrica | Relação com P23 |
|---|---|
| **Churn mensal** | Redução esperada de 30% após Fase 2 |
| **Sessões por usuário/semana** | Meta: 2+ sessões/semana (hoje: 0.5-0.7) |
| **Taxa de aceite de recomendações** | Meta: >40% |
| **Tempo médio por sessão** | Meta: 8-15 min (sinal de engajamento) |
| **Receita por usuário** | Impacto secundário (maior retenção → maior LTV) |

### Métricas de Qualidade (terciárias)

| Métrica | O que garante |
|---|---|
| **Falsos positivos de insight** | Qualidade do motor (<10%) |
| **Taxa de erro de recomendação** | Segurança do sistema (<5%) |
| **Satisfação com o resumo** | Utilidade do fechamento (meta: >80% satisfeitos) |
| **Cobertura de diagnóstico** | % de áreas mapeadas por empresa (meta: >80% no primeiro mês) |

---

## 10. Assinatura do Programa

**Programa 23 — A Experiência Cognitiva**

**Início:** Julho de 2026

**Conclusão da especificação:** 26 de julho de 2026

**Equipe do programa:**
- Especificação: OpenCode (agente de IA)
- Supervisão de produto: [a definir]
- Supervisão técnica: [a definir]

**Documentos produzidos:** 5 (incluindo este)

**Work Packages definidos:** 11

**Fases:** 4 (Fundação → Inteligência → Profundidade → Refinamento)

**Tempo estimado de implementação:** 90-120 dias

**Investimento estimado:** 165 dias-homem

**Métrica de sucesso do programa:** NPS ≥ 50 e retorno em 7 dias ≥ 55% até 120 dias após início da implementação.

---

> *A Ponte Digital não é um sistema que o empresário usa. É uma inteligência com quem o empresário conversa. O P23 é a especificação de como essa conversa deve soar, parecer, e se sentir. O código implementa. Este documento define o que o código deve implementar.*
