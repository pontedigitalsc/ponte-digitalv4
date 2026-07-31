# Acquisition Foundation V1

**Data:** 30/07/2026
**Programa:** 47 — O Primeiro Valor: A Porta de Entrada da Ponte Digital
**Precedido por:** RELATIONSHIP_CONTINUITY_V1.md
**Estado:** OFICIAL — Foundation da Aquisição Relacional

---

## Resumo Executivo

A Ponte Digital criou sua primeira experiência pública de aquisição. Diferente de funis SaaS tradicionais, a aquisição da Ponte entrega valor antes da conversão — o empresário recebe uma reflexão sobre sua empresa antes de criar conta.

A conversão não é o objetivo. O objetivo é que o empresário sinta: "Essa empresa entende algo que eu sinto todos os dias."

---

## O que foi construído

### Landing Page
- Cópia baseada na dor invisível do empresário ("O peso invisível de administrar uma empresa")
- Sem funcionalidades, módulos, tecnologia, IA ou planos
- CTA único: "Entender minha empresa"
- Segunda opção: "Já tenho conta" (login)

### Diagnóstico Inicial Sem Cadastro (`/diagnostico`)
- 5 perguntas abertas sobre papel, peso, decisão, melhoria e futuro
- Sem autenticação, sem email, sem senha
- Progresso visual (5 barras)
- Transição fluida para revelação

### Primeira Revelação
- Reflexão personalizada baseada nas respostas
- "Sua maior dificuldade parece não ser falta de esforço"
- Padrão detectado: empresa que cresceu e precisa transformar esforço em clareza
- Nunca um score frio

### Retrato Inicial da Empresa
- 5 dimensões visuais: Clareza, Conhecimento, Capacidade de Decisão, Organização, Aprendizado
- Cada dimensão com percentual e descrição textual
- Disclaimer: "Isso não é uma avaliação. É apenas o primeiro retrato."

### Sistema de Pertencimento
- Apoiador numerado: `AP-XXXXX` (único, permanente)
- Programa Fundador limitado a 1000 posições
- 3 caminhos equivalentes pós-revelação: explorar / criar jornada / ser Founder

---

## Decisões de produto

1. **Valor antes da conversão**: o diagnóstico não exige cadastro. O empresário recebe reflexão antes de qualquer barreira.
2. **Reflexão, não score**: a revelação é textual e personalizada, não um número frio.
3. **Pertencimento como identidade**: o número Apoiador é sobre história, não sobre benefícios.
4. **Três caminhos equivalentes**: nenhum é "recomendado". São escolhas legítimas.

## Arquivos criados/modificados

- `sistema/src/app/page.tsx` — landing reescrita (dor invisível, CTA "Entender minha empresa")
- `sistema/src/app/diagnostico/page.tsx` — diagnóstico inicial sem cadastro (5 perguntas + revelação + retrato + 3 caminhos + Apoiador)
- `docs/14-CONSTITUTION/CONSTITUICAO_DA_AQUISICAO.md` — Constituição da Aquisição (nova)

## Métricas do snapshot

| Indicador | Valor |
|---|---|
| Rotas da aplicação | 55 |
| Erros de TypeScript | 0 |
| Tempo de compilação | 48s |
| Tempo de type-check | 32s |
| Perguntas no diagnóstico inicial | 5 |
| Dimensões do Retrato Inicial | 5 |
| Limite de Fundadores | 1000 |

## Próximos passos

1. Persistência real dos números Apoiador (hoje: gerados no frontend)
2. Sala Estratégica ("E se contratar alguém?", "E se aumentar preços?")
3. Diagnósticos recorrentes (mensal/semanal)
4. Fundador como comunidade ativa
