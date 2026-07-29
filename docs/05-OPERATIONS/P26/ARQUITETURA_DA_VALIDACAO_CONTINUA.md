# ARQUITETURA DA VALIDAÇÃO CONTÍNUA

## Sistema permanente de validação de hipóteses

**Programa 26 | Validação Contínua | Julho de 2026 | Versão 1.0**

> Este documento define o sistema que mantém toda hipótese rastreável desde
> seu nascimento até sua resolução. Nenhuma hipótese morre — confirmada vira
> conhecimento, refutada vira aprendizado. O sistema garante que nenhuma
> crença não-testada guie decisões da Ponte Digital.

---

## 1. Ciclo de vida completo da hipótese

```
                  ┌─────────────────────────┐
                  │     NOVA (N)            │
                  │  Hipótese formulada,    │
                  │  ainda sem observações  │
                  └───────────┬─────────────┘
                              │ Primeira observação relacionada
                              ↓
                  ┌─────────────────────────┐
              ┌───│  EM OBSERVAÇÃO (EO)     │
              │   │  Observações sendo       │
              │   │  coletadas, sem          │
              │   │  conclusão parcial       │
              │   └───────────┬─────────────┘
              │               │ Mínimo de observações atingido
              │               ↓
              │   ┌─────────────────────────┐
              │   │  EM VALIDAÇÃO (EV)      │
              │   │  Experimento em          │
              │   │  andamento para          │
              │   │  confirmar ou refutar    │
              │   └───────┬─────────┬───────┘
              │           │         │
              │           │         │
   ┌──────────┘    Confirmada    Refutada
   │                    │         │
   ↓                    ↓         ↓
┌──────────┐   ┌────────────┐  ┌──────────────┐
│ABANDONADA│   │CONFIRMADA  │  │  REFUTADA    │
│(A)       │   │(C)         │  │  (R)         │
│Sem       │   │Vira        │  │Vira          │
│atividade │   │conhecimento│  │aprendizado   │
│>30 dias  │   │Arquivada   │  │Arquivada     │
└──────────┘   └────────────┘  └──────────────┘
```

### Estados

| Estado | Sigla | Definição | Duração recomendada |
|---|---|---|---|
| **Nova** | N | Hipótese foi formulada mas nenhuma observação foi coletada ainda | Máx. 7 dias |
| **Em Observação** | EO | Observações estão sendo coletadas para testar a hipótese | 7-30 dias |
| **Em Validação** | EV | Observações suficientes coletadas; experimento sendo executado | Máx. 10 dias |
| **Confirmada** | C | Hipótese validada por evidências suficientes | Indefinido (arquivada) |
| **Refutada** | R | Hipótese invalidada por evidência em contrário | Indefinido (arquivada) |
| **Abandonada** | A | Hipótese sem atividade por >30 dias | Arquivada |

---

## 2. Registro de hipótese

Toda hipótese no sistema deve ter os seguintes campos, sempre atualizados.

```
─── DADOS DA HIPÓTESE ───
ID: H-[XXX]
Título: [nome descritivo]
Data de criação: [dd/mm/aaaa]
Categoria: [comportamento / motor / experiência / adoção / descoberta]
Autor: [quem formulou]
Estado atual: [N / EO / EV / C / R / A]
Idade: [dias desde a criação]

─── OBSERVAÇÕES ───
Empresas observadas: [lista de empresas que geraram observações]
Total de observações: [número]
Observações relacionadas: [OBS-XXX, OBS-XXX, ...]
Confiança atual: [0-10, atualizada a cada nova observação]

─── EXPERIMENTO ───
Próximo experimento: [o que precisa acontecer para avançar de estado]
Experimento anterior: [se aplicável, descrição e resultado]
Métrica definida antes do experimento: [sim/não]

─── TIMELINE ───
Última atualização: [dd/mm/aaaa]
Última observação: [dd/mm/aaaa]
Próxima revisão agendada: [dd/mm/aaaa — se aplicável]

─── RESULTADO (preencher quando C ou R) ───
Data da conclusão: [dd/mm/aaaa]
Resultado: [confirmada / refutada]
Resumo da evidência: [síntese do que foi aprendido]
Documentos afetados: [lista de documentos que precisam ser atualizados]
```

---

## 3. Transições de estado

### Transição N → EO (Nova → Em Observação)

**O que dispara:** A primeira observação relacionada à hipótese é registrada no Catálogo.

**Quem pode disparar:** Qualquer observador que registrar uma observação e conectá-la à hipótese.

**Condições:**
- A hipótese deve estar no estado N
- A observação deve estar validada (passou pelo checklist anti-viés)
- O observador deve identificar a conexão no campo "Hipótese relacionada"

**Prazo mínimo para permanecer em N:** Nenhum — pode transicionar imediatamente na primeira observação.

**Prazo máximo em N:** 7 dias. Se após 7 dias nenhuma observação foi registrada, a hipótese é revisitada (pode ser reformulada ou abandonada).

### Transição EO → EV (Em Observação → Em Validação)

**O que dispara:** Número mínimo de observações foi atingido e o experimento foi desenhado.

**Quem pode disparar:** Arquiteto de Observação ou Arquiteto de Produto.

**Condições:**
- Mínimo 3 observações consistentes
- Observações de pelo menos 2 fontes diferentes (pessoas ou empresas distintas)
- Confiança média das observações >= 6 (escala 0-10)
- Experimento desenhado com métrica definida antes da execução
- A hipótese continua parecendo plausível (não foi refutada prematuramente)

**Prazo mínimo em EO:** 7 dias (para permitir coleta suficiente).

**Prazo máximo em EO:** 30 dias. Se em 30 dias não foi possível coletar observações suficientes, a hipótese deve ser: (a) reformulada para algo mais testável, ou (b) abandonada.

### Transição EV → C (Em Validação → Confirmada)

**O que dispara:** O experimento foi concluído e os resultados confirmam a predição.

**Quem pode disparar:** Quem conduziu o experimento, com validação de um revisor independente.

**Condições:**
- Mínimo 3 observações consistentes de fontes diferentes
- Mínimo 2 fontes diferentes (empresas ou indivíduos distintos)
- A métrica definida antes do experimento foi atingida
- Os resultados são estatisticamente significativos ou qualitativamente inequívocos
- Um revisor independente confirma a interpretação dos resultados

**Prazo máximo em EV:** 10 dias. Se o experimento não foi concluído em 10 dias, retorna para EO.

### Transição EV → R (Em Validação → Refutada)

**O que dispara:** O experimento foi concluído e os resultados contradizem a predição.

**Quem pode disparar:** Quem conduziu o experimento.

**Condições:**
- O experimento foi executado conforme desenhado
- A métrica definida antes do experimento NÃO foi atingida
- A evidência contrária é clara e reproduzível
- Não há explicação alternativa óbvia para o resultado negativo

**Nota:** Refutar uma hipótese é um resultado tão valioso quanto confirmar. Hipóteses refutadas viram aprendizado documentado.

### Transição N → A ou EO → A (Nova/Em Observação → Abandonada)

**O que dispara:** Inatividade prolongada sem observações ou progresso.

**Quem pode disparar:** Arquiteto de Observação (revisão semanal).

**Condições:**
- Nenhuma observação nova em 30 dias consecutivos (para estado EO)
- Nenhuma observação em 7 dias (para estado N)
- A hipótese foi revisitada e considerada não prioritária ou não testável no momento
- Decisão documentada com justificativa

### Transição A → N (Abandonada → Nova)

Uma hipótese abandonada pode ser reativada se novas evidências surgirem.

**O que dispara:** Nova observação que se conecta a uma hipótese abandonada.

**Quem pode disparar:** Qualquer observador.

**Condições:**
- A hipótese estava em estado A
- A nova observação traz contexto ou evidência que não existia antes
- A reativação é documentada com justificativa

---

## 4. Regras de envelhecimento

### Regra 1 — Hipotese parada > 30 dias é revisitada

Se uma hipótese nos estados N, EO ou EV não recebe nenhuma atualização (observação, experimento ou alteração de estado) por mais de 30 dias consecutivos:

1. O Arquiteto de Observação é notificado
2. A hipótese entra em "revisão de envelhecimento"
3. O Arquiteto decide: reformular, abandonar ou estender prazo
4. A decisão é documentada na própria hipótese

### Regra 2 — Hipótese em N > 7 dias sem observações

Se uma hipótese permanece em N por mais de 7 dias:
- Deve ser revisitada pelo autor
- O autor pode: reformular, conectar a observações existentes que não foram mapeadas, ou abandonar
- Se não houver ação em 7 dias adicionais, transiciona automaticamente para A

### Regra 3 — Hipótese confirmada/refutada não reaberta sem evidência nova

Hipóteses confirmadas ou refutadas não podem ser reabertas sem:
- Evidência nova significativa que não existia no momento da conclusão
- Aprovação do Arquiteto de Observação
- Documentação do motivo da reabertura

### Regra 4 — Revisão trimestral de hipóteses abandonadas

A cada 3 meses, todas as hipóteses em estado A são revisadas:
- Alguma se tornou testável com novo contexto?
- Alguma foi confirmada/refutada por evidência externa?
- Alguma deve ser excluída definitivamente?

---

## 5. Critérios para confirmar

Uma hipótese é considerada **confirmada** quando atinge TODOS os critérios:

| # | Critério | Detalhamento |
|---|---|---|
| 1 | **Mínimo 3 observações consistentes** | Pelo menos 3 registros no Catálogo apontando para a mesma conclusão |
| 2 | **Fontes diferentes** | Observações de pelo menos 2 empresas ou 2 membros distintos |
| 3 | **Confiança média >= 7** | Média da confiança declarada nas observações >= 7 (0-10) |
| 4 | **Experimento concluído** | O experimento desenhado foi executado e teve resultado positivo |
| 5 | **Métrica pré-definida atingida** | A métrica definida antes do experimento foi alcançada |
| 6 | **Revisão independente** | Um revisor que não participou do experimento confirma a interpretação |
| 7 | **Sem viés identificado** | Nenhum viés grave foi identificado nas observações ou no experimento |

### Exceção — Confirmação por evidência externa

Uma hipótese pode ser confirmada sem experimento próprio se:
- Existe evidência externa confiável (estudo publicado, benchmark do setor, dados de mercado)
- A evidência é diretamente aplicável ao contexto da Ponte Digital
- A fonte é documentada e acessível
- Um revisor independente valida a aplicabilidade

---

## 6. Critérios para refutar

Uma hipótese é considerada **refutada** quando QUALQUER UM dos critérios é atingido:

| # | Critério | Detalhamento |
|---|---|---|
| 1 | **Experimento com resultado negativo** | Métrica pré-definida não foi atingida e o resultado é claro |
| 2 | **Evidência contrária consistente** | 3+ observações contradizem a hipótese |
| 3 | **Contradição com hipótese confirmada** | Uma hipótese conflitante foi confirmada com evidência mais forte |
| 4 | **Impossibilidade de testar** | A hipótese não pode ser testada com os recursos disponíveis e não há previsão de mudança |

### O que NÃO refuta uma hipótese

- Opinião de uma pessoa, por mais experiente que seja
- Desconforto da equipe com a hipótese ("não gostamos dessa ideia")
- Falta de tempo para testar ("não deu tempo de executar o experimento")
- Resultado inconclusivo (isso mantém a hipótese em EV, não a refuta)

---

## 7. Como hipóteses confirmadas viram conhecimento

### Processo

1. A hipótese é marcada como CONFIRMADA (C) no sistema
2. O autor escreve um resumo do aprendizado: "O que sabemos agora que não sabíamos antes"
3. O conhecimento é registrado em `docs/08-KNOWLEDGE/` como um verbete
4. Se a hipótese implica mudança em documentos existentes, as alterações são feitas
5. Se a hipótese gera uma RFC, a RFC é escrita e segue seu fluxo

### Formato do verbete de conhecimento

```
─── CONHECIMENTO ───
ID do conhecimento: K-[XXX]
Hipótese de origem: H-XXX
Data de confirmação: [dd/mm/aaaa]
Autores: [nomes]

─── O QUE SABEMOS ───
[Descrição clara do que foi aprendido. Linguagem direta. Deve ser compreensível
por alguém que nunca viu a hipótese original.]

─── EVIDÊNCIA ───
[Hipóteses relacionadas, observações, experimentos que suportam este conhecimento]

─── IMPLICAÇÕES ───
[O que este conhecimento muda na prática — no produto, na arquitetura, na experiência]

─── LIMITAÇÕES ───
[Em que contextos este conhecimento se aplica ou não se aplica]

─── PRÓXIMOS PASSOS ───
[Se este conhecimento abre novas perguntas, registrar aqui]
```

### O conhecimento substitui a hipótese

Uma vez que uma hipótese vira conhecimento, ela não precisa mais ser testada. O conhecimento é considerado verdadeiro até que evidência contrária surja.

---

## 8. Como hipóteses refutadas viram aprendizado (nunca descartadas)

### Processo

1. A hipótese é marcada como REFUTADA (R) no sistema
2. O autor escreve um resumo do aprendizado: "O que aprendemos ao descobrir que estávamos errados"
3. O aprendizado é registrado em `docs/08-KNOWLEDGE/APRENDIZADOS/` como um verbete
4. A hipótese refutada permanece no sistema como consultável — nunca é deletada
5. Se a hipótese refutada implicava mudanças em docs, essas mudanças são desfeitas ou marcadas como não-aplicáveis

### Formato do verbete de aprendizado

```
─── APRENDIZADO ───
ID do aprendizado: APR-[XXX]
Hipótese de origem: H-XXX
Data da refutação: [dd/mm/aaaa]
Autores: [nomes]

─── O QUE ACHÁVAMOS ───
[A hipótese original: o que acreditávamos ser verdade]

─── O QUE DESCOBRIMOS ───
[O resultado do experimento e o que realmente acontece]

─── POR QUE ESTÁVAMOS ERRADOS ───
[Análise do erro: viés não identificado? suposição incorreta? contexto ignorado?]

─── O QUE FAREMOS DIFERENTE ───
[Como este aprendizado evita repetir o erro no futuro]

─── PERGUNTAS QUE PERMANECEM ───
[Se a refutação abriu novas questões, registrar aqui]
```

### Regra do aprendizado valioso

Uma hipótese refutada não é um erro. É um investimento que rendeu conhecimento. A pergunta certa não é "por que testamos isso?", mas "o que aprendemos que não sabíamos antes?"

### Indicador de saúde: taxa de refutação

A proporção de hipóteses refutadas em relação ao total testado é um indicador de saúde do sistema:

| Taxa de refutação | Significado |
|---|---|
| < 20% | Provável viés de confirmação — só testamos o que já acreditamos |
| 20-40% | Saudável — estamos testando crenças reais |
| 40-60% | Muito saudável — estamos genuinamente curiosos |
| > 60% | Nossas intuições são sistematicamente erradas — precisamos observar mais antes de formular hipóteses |

**Meta da Ponte Digital:** manter taxa de refutação entre 30-50%.

---

## 9. Tabela de transições completa

| De | Para | Disparo | Quem dispara | Condições | Prazo mínimo | Prazo máximo |
|---|---|---|---|---|---|---|
| N | EO | 1ª observação registrada | Qualquer observador | Observação conectada à hipótese | Imediato | 7 dias |
| N | A | Inatividade sem observações | Arquiteto de Observação | Nenhuma observação em 7 dias + revisitada | 7 dias | 14 dias |
| EO | EV | Observações suficientes coletadas | Arquiteto de Produto / Observação | ≥3 obs de ≥2 fontes, confiança ≥6, experimento desenhado | 7 dias | 30 dias |
| EO | A | Inatividade >30 dias | Arquiteto de Observação | Nenhuma observação nova em 30 dias | 30 dias | 35 dias |
| EV | C | Experimento positivo | Autor + revisor independente | Métrica atingida, revisão independente positiva | 1 dia | 10 dias |
| EV | R | Experimento negativo ou evidência contrária | Autor + revisor independente | Métrica não atingida OU 3+ obs contrárias | 1 dia | 10 dias |
| EV | EO | Experimento inconclusivo | Arquiteto de Produto | Não foi possível confirmar ou refutar | — | 10 dias |
| C | — | Arquivada como conhecimento | Autor | Verbete de conhecimento escrito | — | — |
| R | — | Arquivada como aprendizado | Autor | Verbete de aprendizado escrito | — | — |
| A | N | Nova evidência surge | Qualquer observador | Observação com contexto novo | — | — |

---

## 10. Diagrama de estados completo (textual)

```
                    ┌──────────┐
                    │   NOVA   │
                    │    (N)   │
                    └────┬─────┘
                         │
               ┌─────────┴──────────┐
               │                    │
          [1ª obs]            [7 dias sem obs]
               │                    │
               ↓                    ↓
        ┌──────────────┐    ┌──────────────┐
        │ EM OBSERVAÇÃO │    │  ABANDONADA  │
        │     (EO)     │───→│     (A)      │
        └──────┬───────┘    └──────────────┘
               │                    ↑
      ┌────────┴────────┐     [nova evidência]
      │                 │           │
 [≥3 obs,      [30 dias sem     ┌───┴───┐
  experimento]   obs]           │REATIVAR│
      │                 │      └───────┘
      ↓                 ↓
┌──────────────┐  ┌──────────────┐
│EM VALIDAÇÃO  │  │  ABANDONADA  │
│    (EV)      │  │     (A)      │
└──────┬───────┘  └──────────────┘
       │
  ┌────┴────┐
  │         │
[positivo] [negativo]
  │         │
  ↓         ↓
┌────────┐ ┌────────┐
│CONFIRM.│ │REFUTADA│
│  (C)   │ │  (R)   │
└───┬────┘ └───┬────┘
    │          │
    ↓          ↓
┌────────┐ ┌───────────┐
│VIRAR   │ │VIRAR      │
│CONHEC. │ │APRENDIZADO│
└────────┘ └───────────┘
```

---

## 11. Revisão semanal obrigatória

Toda sexta-feira, o Arquiteto de Observação conduz a revisão semanal do sistema:

### Pauta da revisão

1. **Observações novas**: quantas foram registradas na semana; quantas têm hipótese conectada
2. **Hipóteses em N**: alguma precisa ser reformulada ou abandonada?
3. **Hipóteses em EO**: alguma atingiu o mínimo de observações para transicionar para EV?
4. **Hipóteses em EV**: algum experimento foi concluído? Resultados?
5. **Hipóteses paradas**: alguma hipótese vai completar 30 dias sem atualização?
6. **Taxa de refutação**: qual a proporção atual? Está dentro da meta (30-50%)?
7. **Aprendizados da semana**: o que as observações nos ensinaram?

### Saída da revisão

- Estado atualizado de todas as hipóteses
- Decisões de transição de estado
- Novas hipóteses formuladas (se aplicável)
- Verbete de conhecimento ou aprendizado (se aplicável)

---

## 12. Métricas do sistema

| Métrica | Fórmula | Meta |
|---|---|---|
| Hipóteses ativas (N + EO + EV) | Contagem | 5-15 |
| Idade média das hipóteses ativas | Média de dias desde criação | < 30 dias |
| Tempo médio N → C/R | Dias da criação à conclusão | < 45 dias |
| Taxa de refutação | R / (C + R) × 100 | 30-50% |
| Observações por hipótese | Total obs / hipóteses com obs | ≥ 3 |
| Hipóteses abandonadas por mês | Contagem | ≤ 3 |
| Hipóteses reativadas por mês | Contagem | Qualquer número |
| Cobertura de empresas | Empresas distintas observadas / total de hipóteses ativas | ≥ 2 |

---

## 13. Exceções

1. **Hipótese urgente de segurança**: pode pular diretamente para EV sem passar por EO (justificar em documento de exceção)

2. **Hipótese trivial auto-evidente**: se a evidência é incontestável (ex: "servidor caiu sem memória"), pode ir direto para confirmada sem experimento formal

3. **Hipótese importada de P25**: as 22 hipóteses do P25 entram no sistema já no estado EO (não precisam de observação inicial porque já foram identificadas como relevantes pelo programa anterior)

---

## 14. Repositório de hipóteses

Toda hipótese do sistema é registrada em:

`docs/08-KNOWLEDGE/HIPOTESES/[H-XXX].md`

Cada arquivo segue o template de registro e é atualizado sempre que o estado muda.

O arquivo `docs/08-KNOWLEDGE/HIPOTESES/INDICE.md` mantém a lista completa com estado atual, idade e link para cada hipótese.

---

*Este sistema entra em vigor na data de publicação.*
*Arquitetura da Validação Contínua — nunca mais uma crença não testada guiará a Ponte Digital.*
*Ponte Digital — Empresa Zero — Validação Permanente.*
