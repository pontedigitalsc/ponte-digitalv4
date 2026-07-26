# Decisões

## 2026-07-13 — Diagnóstico antes de qualquer refatoração arquitetural

**Decisão:** a próxima sprint implementa Diagnóstico Inteligente. Nenhuma migração para `server/actions/services/repositories` nem catálogo formal de `DomainEvent` antes da Fase 2.

**Motivo:** Diagnóstico é a única lacuna real dentro do escopo ativo da V4 Founder; o resto do que auditorias apontaram como "dívida" é simplificação estratégica aceita (ver ADR-001).

**Alternativas consideradas:** priorizar o refactor arquitetural sugerido por uma das auditorias — rejeitada, por contrariar o princípio de que o estágio da empresa é o teto da sofisticação técnica.

**Resultado esperado:** Diagnóstico funcional, contexto real fluindo para CRM/Financeiro/Assistente, antes de qualquer investimento em arquitetura mais sofisticada.

---

## 2026-07-13 — Soft delete é exceção ao congelamento

**Decisão:** corrigir o soft delete incompleto em paralelo à sprint de Diagnóstico, sem esperar uma sprint dedicada.

**Motivo:** é o único item das auditorias que é violação de princípio inegociável (risco real de perda permanente de dado), não uma escolha de estágio.

---

## 2026-07-13 — Desconfiar de auditorias com sinais de corrupção ou desobediência de instrução

**Decisão:** uma auditoria gerada apresentou caracteres corrompidos, inconsistência entre duas listagens do mesmo dado, e recomendações que contrariavam instrução explícita de não propor refatoração nem funcionalidade congelada. Essa auditoria foi descartada como fonte de verdade, mantendo-se apenas as conclusões que coincidiam com auditoria anterior mais confiável.

**Motivo:** relatórios de auditoria/análise estrutural devem ser tratados com o mesmo ceticismo que qualquer output de agente — sinais de corrupção de texto ou desobediência de instrução são motivo para descartar e refazer, não para aceitar parcialmente sem crítica.

**Ação:** para tarefas de raciocínio estruturado (auditorias, análises), preferir o modelo com melhor desempenho comprovado disponível no momento — não o mais rápido/barato — e conferir a própria saída contra `06-AI/REVIEW_CHECKLIST.md` antes de aceitar como verdade. Não fixar aqui o nome de um modelo específico: essa escolha muda com o tempo e deve ser reavaliada a cada uso, não herdada de uma decisão antiga.

## 2026-07-14 — Ecossistema Público separado da Plataforma Cognitiva

**Decisão:** o Diagnóstico Inteligente passa a pertencer ao Ecossistema Público (gratuito), separado da Plataforma Cognitiva (CRM, Agenda, Financeiro, Assistente, Centro de Decisão — restrita a Fundadores). A jornada do usuário muda de funil de vendas para Escada Comunitária: Curioso → Apoiador → Fundador → Embaixador. `THESIS.md` ganha uma frase de missão nova.

**Motivo:** o fundador identificou que o modelo de negócio real é inverso ao assumido até aqui — a Ponte não é um SaaS com diagnóstico, é uma plataforma de inteligência com um SaaS para quem aprofunda a parceria. O diagnóstico gratuito gera patrimônio cognitivo coletivo mesmo para quem nunca converte.

**Alternativas consideradas:** manter o diagnóstico só como gerador de contexto técnico para o resto da plataforma, sem reposicionamento — rejeitada pelo fundador, não capturava o valor do Ecossistema Público.

**Resultado esperado:** ver `04-DECISIONS/ADR/ADR-003-ecossistema-publico-vs-plataforma-cognitiva.md` para escopo completo, incluindo o que esta decisão explicitamente NÃO muda (a sprint ativa continua igual; não há re-arquitetura técnica agora).

**Pendência criada:** o sistema não modela hoje um usuário "Apoiador" fora do conceito de empresa/tenant — ver `05-OPERATIONS/KNOWN_ISSUES.md`.

---

*(Adicionar uma entrada por decisão relevante, sempre com data, motivo e alternativas consideradas.)*
