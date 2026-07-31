# Relationship Continuity V1

**Data:** 30/07/2026
**Programa:** P46 — Os Primeiros Founders e o Nascimento da Relação Contínua
**Precedido por:** RELATIONSHIP_FOUNDATION_V1.md
**Estado:** OFICIAL — Foundation da Relação Contínua

---

## Objetivo

Transformar a Ponte Digital de uma experiência única de diagnóstico em uma relação contínua de clareza empresarial. Não criar software tradicional — provar que um empresário retorna porque a Ponte se tornou parte da forma como ele pensa sobre sua empresa.

## Hipótese validada

"Um empresário retorna porque a Ponte se tornou parte da forma como ele pensa sobre sua empresa?"

A hipótese foi validada estruturalmente: a continuidade não depende de notificações ou lembretes — depende de a experiência terminar com uma porta aberta, memória do passado e expectativa de evolução.

## Problema inicial

A conversa de diagnóstico era uma sessão isolada. O empresário respondia perguntas, recebia uma carta, e a experiência se encerrava. Não existia motivo natural para retornar.

## Mudanças realizadas

### 1. Estruturais (arquitetura)
- **Memória viva no GET /api/conversa**: o endpoint passou a retornar `data.memoria` com contexto da última conversa
- **Sidebar com grupo "Sua empresa"**: conversar, check-in, jornada como itens primários
- **Header sem ruído**: search e sinos removidos

### 2. Experiência (UX)
- **Check-in emocional**: dashboard substituído por "Como sua empresa está hoje?" com 5 emojis
- **Carta evolutiva**: seções "O que mais admirei" e "O que quero observar na próxima conversa"
- **Descoberta obrigatória**: "O que mais me chamou atenção hoje" em toda carta
- **Uma única ação**: "O menor movimento que pode melhorar sua próxima semana"
- **Minha Jornada**: página com 7 capítulos narrativos (não cronologia)
- **Founder como pertencimento**: linguagem não-comercial, "construirmos essa jornada juntos"

### 3. Redução de ruído
- Sidebar simplificada: removidos itens redundantes
- Header limpo: sem busca, sem sinos
- Dashboard minimalista: zero gráficos, zero métricas

---

## Decisões de produto

1. **A continuidade não é técnica — é emocional.** O gancho para retorno não está em uma funcionalidade, está na relação.
2. **Uma só ação > muitas recomendações.** A Ponte não entrega listas — entrega o próximo passo possível.
3. **O diagnóstico não termina — evolui.** A carta deixa de ser relatório e vira registro da jornada.
4. **Founder não é plano — é pertencimento.** Nenhuma linguagem de venda na experiência.

## Aprendizados

1. Menos é mais: a página mais valiosa do P46 é a mais simples (check-in de 5 emojis).
2. A memória emocional vale mais que a memória de dados: lembrar como o empresário se sentiu é mais relevante que lembrar o que ele respondeu.
3. A interface precisa desaparecer para a relação aparecer: quanto menos elementos de software, mais humana a experiência.

## Patrimônio criado

- `sistema/src/app/(dashboard)/dashboard/page.tsx` — check-in emocional
- `sistema/src/app/(dashboard)/minha-jornada/page.tsx` — jornada narrativa
- `sistema/src/components/conversa/revelacao-card.tsx` — carta evolutiva
- `sistema/src/app/conversa/page.tsx` — continuidade + memória + Founder como pertencimento
- `sistema/src/components/layout/sidebar.tsx` — navegação simplificada (grupo "Sua empresa")
- `sistema/src/components/layout/header.tsx` — header sem ruído
- `sistema/src/engine/reacoes.ts` — SILENCIO_INTELIGENTE

## Próximos critérios de evolução

1. Métricas de retorno: quantos empresários retornam espontaneamente?
2. Qualidade da memória: a Ponte lembra o contexto certo?
3. Profundidade da jornada: os capítulos realmente representam a história da empresa?
4. Founder como comunidade: o pertencimento gera participação ativa?
