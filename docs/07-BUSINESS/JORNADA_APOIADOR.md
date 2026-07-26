# Jornada do Apoiador — Escada Comunitária

*Decidido pelo fundador em 2026-07-14 (ver `04-DECISIONS/ADR/ADR-003-ecossistema-publico-vs-plataforma-cognitiva.md`). Este documento é o conteúdo real da "Escada Comunitária" referenciada em `THESIS.md` e `FOUNDERS.md`, antes marcada como pendente. Critérios exatos de quando alguém sobe de estágio ainda são `PENDENTE DE DEFINIÇÃO PELO FUNDADOR` — o que existe aqui é a estrutura da escada, não as regras automáticas de promoção entre estágios.*

## A jornada, substituindo o funil de vendas tradicional

```
Curioso
  ↓
Apoiador
  ↓
Fundador
  ↓
Embaixador
```

Não é um funil (empurrar pessoas para a venda) — é uma escada de aprofundamento de parceria, coerente com o mantra "crie um empresário mais tranquilo", não "crie um cliente".

## Os quatro estágios

### Curioso
Ainda não interagiu de verdade com a Ponte. Equivalente a um visitante — conheceu a marca, mas não fez o Diagnóstico ainda.

### Apoiador
Fez o Diagnóstico Inteligente (Ecossistema Público). Recebe recomendações, histórico do próprio diagnóstico, e conteúdo — de graça. Não é cliente pagante. Cada Apoiador aumenta o patrimônio cognitivo coletivo da Ponte (ver seção "Camadas do Patrimônio Cognitivo" em `THESIS.md`), independente de nunca vir a pagar.

### Fundador
Convidado a aprofundar a parceria e passa a usar a Plataforma Cognitiva (CRM, Agenda, Financeiro, Assistente, Centro de Decisão). É o programa dos 100 Fundadores (ver `FOUNDERS.md`) — validação paga ou com condição especial, `PENDENTE DE DEFINIÇÃO PELO FUNDADOR` quanto ao modelo comercial exato.

### Embaixador
Estágio mais alto — `PENDENTE DE DEFINIÇÃO PELO FUNDADOR`. Presumivelmente Fundadores com resultado comprovado que passam a recomendar a Ponte ativamente, mas o que isso concede (reconhecimento? benefício comercial? acesso antecipado a recursos?) ainda não foi decidido. Não inventar aqui — registrar como está: vazio até virar decisão real.

## O ciclo de aprendizado coletivo (visão de longo prazo — depende do Motor Cognitivo, hoje CONGELADO)

```
N diagnósticos completos
        ↓
Hipóteses geradas por padrão observado
        ↓
Padrões confirmados
        ↓
Motor Cognitivo aprende (congelado — ver MVP_SCOPE.md)
        ↓
Todos os Fundadores recebem recomendações melhores
```

**Atenção — isto é visão, não implementação atual:** este ciclo só funciona de fato quando o Motor Cognitivo existir. Hoje, cada diagnóstico gera dado bruto (Perfil Cognitivo por empresário — ver `DIAGNOSTIC.md`), mas não existe nenhum mecanismo automático de extrair "padrões confirmados" entre diagnósticos de Apoiadores diferentes. Tratar este ciclo como roadmap de Fase 2/3 (`02-PRODUCT/ROADMAP.md`), nunca como algo que a sprint atual precisa entregar.

## O que isso muda na prática, hoje, na V4 Founder

- O Diagnóstico Inteligente (sprint ativa) ganha uma segunda motivação, além de gerar Perfil Cognitivo para a Plataforma Cognitiva: ele também é, sozinho, a entrega de valor completa para quem nunca vira Fundador. Isso não muda os critérios de aceite técnicos da sprint (ver `05-OPERATIONS/SPRINTS/SPRINT-001-DIAGNOSTICO.md`).
- Existe uma lacuna técnica real: o sistema hoje não modela um usuário "Apoiador" fora do conceito de empresa/tenant cadastrada. Um Curioso que vira Apoiador ao completar o Diagnóstico precisaria de algum registro que não é necessariamente uma "Empresa" completa no schema atual. Registrado como known issue — ver `05-OPERATIONS/KNOWN_ISSUES.md`.

## Relação com `FOUNDERS.md`

`FOUNDERS.md` descreve o que se oferece especificamente ao estágio Fundador (os 100 fundadores do programa de validação). Este documento descreve a escada inteira, incluindo os estágios antes e depois dele.
