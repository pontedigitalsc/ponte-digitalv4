# P52 — Perguntas que Constroem Empresas

**1 de agosto de 2026**

Transformar a Ponte Digital em uma empresa que aprende continuamente através de conversas reais, sempre colocando o empresário em primeiro lugar. Este pilar não cria um novo módulo, um novo motor ou um novo fluxo — ele melhora a qualidade das conversas e organiza o aprendizado do fundador.

---

## Princípio fundamental

A Ponte nunca faz perguntas para coletar dados. Ela faz perguntas para ajudar empresários a enxergarem melhor suas empresas. Se essa conversa também fortalecer o conhecimento coletivo da plataforma, isso é consequência — nunca o objetivo principal.

## Princípio ético

Toda pergunta precisa gerar valor imediato para quem responde. Se uma pergunta não ajuda o empresário a refletir, tomar uma decisão ou enxergar algo novo, ela não deve existir. Nunca criar perguntas apenas para validar hipóteses internas.

---

## ETAPA 1 — Biblioteca das Grandes Perguntas

`adaptive-question-engine.ts::BIBLIOTECA_GRANDES_PERGUNTAS` — catálogo permanente curado. Cada pergunta declara: título, pergunta, objetivo, momento ideal, segmentos recomendados, capacidade fortalecida e benefício esperado.

| Título | Pergunta | Benefício |
|---|---|---|
| Liderança | "O que hoje depende mais de você do que deveria?" | Perceber onde o fundador é o gargalo |
| Clientes | "Qual tipo de cliente você gostaria de ter mais?" | Clareza de posicionamento |
| Financeiro | "Quando você olha para o caixa, qual é a sua maior preocupação?" | Preparar recomendações ancoradas na dor real |
| Crescimento | "Se sua empresa dobrasse de tamanho amanhã, o que quebraria primeiro?" | Visão sistêmica |
| Evolução | "O que sua empresa sabe hoje que não sabia há seis meses?" | Memória empresarial |
| Operação | "O que você começou a fazer com regularidade e fez diferença?" | Transformar práticas acidentais em processos |

## ETAPA 2 — Pergunta Aberta da Semana

Modelo `PerguntaAberta` — **apenas uma ativa por vez, nunca duas.** Campos: pergunta, objetivo ("por que queremos entender isso?"), capacidade, benefício, segmentos recomendados, data de início e data de revisão. Criar uma nova desativa a anterior automaticamente.

## ETAPA 3 — Inserção natural na conversa

A pergunta só aparece quando:
- a conversa terminou naturalmente;
- o segmento é compatível (segmentos vazios = vale para todos);
- o empresário ainda não respondeu (unicidade `perguntaId + empresaId`);
- existe contexto (empresa identificada).

Framing natural, nunca "pesquisa":

> "Enquanto conversávamos, fiquei pensando em uma situação comum entre empresas parecidas com a sua." ↓ *Pergunta.*

## ETAPA 4 — Registro automático

Quando o empresário responde, `POST /api/conversa/pergunta-aberta` registra automaticamente: pergunta, empresa, segmento, resumo da resposta e data. Nada mais. Sem classificações complexas, sem formulários, sem telas extras.

## ETAPA 5 — Painel do Fundador

`/painel-do-fundador` — rota interna protegida (role ADMIN), exclusiva do fundador, **não aparece para clientes**. Mostra:
- Pergunta atual e sua revisão
- Empresas participantes (respostas reais)
- Principais padrões observados (palavras recorrentes em 2+ respostas)
- Empresas que trouxeram perspectivas diferentes
- Histórico de Perguntas Abertas

**Nenhuma IA inventando conclusões. Apenas organização.**

## ETAPA 6 — Revisão semanal

Toda semana o fundador responde três perguntas:
1. O que estamos começando a perceber?
2. O que ainda não entendemos?
3. Vale continuar investigando?

Se **não**: nova pergunta. Se **sim**: continua por mais um ciclo (nova data de revisão).

## ETAPA 7 — Promoção para conhecimento

A descoberta só vira patrimônio com maturidade. Fluxo — **nunca invertido**:

```
Pergunta → Conversas → Padrões → Conhecimento → Recomendação → Produto
```

A promoção cria um `ConhecimentoColetivo` candidato (origem `pergunta-aberta`), com score de confiança e repetições reais, e desativa a pergunta.

## ETAPA 8 — Integração com o motor cognitivo

Nenhum motor novo. Reutilização de: strategic-memory, recommendation-auditor, evidence-autologger, adaptive-question-engine, value-index e ConhecimentoColetivo. Toda descoberta fortalece o patrimônio existente — nunca estruturas paralelas.

---

## Arquitetura

- `prisma/schema.prisma` — `PerguntaAberta` (nível plataforma) e `RespostaPerguntaAberta` (tenant, unicidade por empresa) — migration `005_p52_perguntas_que_constroem_empresas`
- `engine/pergunta-aberta-service.ts` — criar (ativa única), obter ativa, compatibilidade de segmento, registro automático, painel do fundador, revisão, promoção
- `api/conversa/finalizar` — expõe a Pergunta Aberta naturalmente ao final
- `api/conversa/pergunta-aberta` — registro automático da resposta
- `api/painel-do-fundador` (+ `/revisar`, `/promover`) — ações internas do fundador, protegidas por ADMIN
- `app/painel-do-fundador/` — painel interno exclusivo do fundador
- `engine/adaptive-question-engine.ts` — `BIBLIOTECA_GRANDES_PERGUNTAS`

## Critérios de qualidade das perguntas

Toda pergunta deve responder: ajuda o empresário a pensar? gera reflexão? melhora decisões? fortalece alguma capacidade empresarial? pode gerar conhecimento reutilizável? Se qualquer resposta for negativa, a pergunta é descartada.

## Critérios de aprovação

- ✅ Nenhuma pergunta parece pesquisa
- ✅ Toda pergunta gera valor imediato para o empresário
- ✅ Apenas uma Pergunta Aberta existe por vez
- ✅ O registro acontece automaticamente
- ✅ Nenhuma tela nova (apenas o painel interno do fundador)
- ✅ Nenhum módulo novo
- ✅ O fundador acompanha tudo em um único painel
- ✅ Todo aprendizado fortalece o patrimônio existente
- ✅ Build limpo
- ✅ TypeScript limpo

---

**Filosofia final:** a Ponte Digital não melhora porque coleta mais dados. Ela melhora porque faz perguntas melhores. E perguntas melhores ajudam empresários a tomar decisões melhores. Esse é o verdadeiro patrimônio que estamos construindo.
