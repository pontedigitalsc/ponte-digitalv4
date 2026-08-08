# P81 — APRENDIZADO OPERACIONAL (DOCUMENTO CONCEITUAL — NÃO IMPLEMENTADO)

**Status:** 📌 **CONCEITUAL — zero código.** O aprendizado operacional depende de: (a) dados operacionais reais (P80, que está bloqueado por evidência); (b) ciclo P80 Fase 7. Este documento desenha a hipótese e mapeia o reuso do CORE cognitivo existente.
**Relaciona:** `P80_MOTOR_WORKFLOW.md`, `P79_*`, `ADR-035`, e as engines cognitivas existentes (P65–P78).

---

## 1. TESE DO P81

O Motor Operacional **não deve apenas executar — deve aprender**. O ciclo:

```
TRABALHO → EVENTO → OBSERVAÇÃO → HIPÓTESE → DECISÃO → AÇÃO → RESULTADO → APRENDIZADO → ALTERAÇÃO DO WORKFLOW
```

O objetivo estratégico (Parte 22 do programa P80): a Ponte **compreende como o trabalho acontece e aprende a fazê-lo melhor** — não administra tarefas.

## 2. O LOOP EM TERMOS DA PONTE (aprendizado humilde — sem IA inventar dados)

Exemplo hipotético (para ilustrar a mecânica — NÃO é evidência):

```
Ordem: Instalação de calha
Workflow: Medição → Corte → Montagem → Instalação
Observação: medições incompletas geraram retrabalho em 3 casos.
Hipótese: a ausência de validação antes do corte aumenta retrabalho.
Ação: adicionar confirmação de medida à etapa de Medição.
Resultado: retrabalho caiu (medido).
Aprendizado: "validação pré-corte parece reduzir erros" → registrado no patrimônio cognitivo.
Alteração do workflow: etapa "Confirmação de medida" passa a ser pré-condição do Corte.
```

**Regras duras:**
- Aprendizado só nasce de **evidência** (2+ ocorrências observadas, não anedota única);
- Hipóteses são marcadas como **ACREDITAMOS/INVESTIGANDO** (epistemologia P65) até resultado medido;
- **Nada de gerar aprendizado por suposição** — sem o dado real, não há aprendizado;
- O aprendizado reverte **em configuração do workflow** (mudar template), não em "regra da ponte" engessada.

## 3. Conexão com o CORE cognitivo (o que já existe — reuso)

| Parte do loop (P81) | Estrutura existente | Papel |
|---|---|---|
| EVENTO operacional | `Event`/`cognitive-bus`/`event-store` | gatilho da observação |
| OBSERVAÇÃO | `Hipotese` + evidência (P65/P68) | registrar padrão |
| HIPÓTESE | `Hipotese` (estado/validacao) | tripartite SABEMOS/ACREDITAMOS/INVESTIGANDO já existente |
| DECISÃO | `AcaoCognitiva` (Conselheiro/Decision Engine) | decisão operacional acompanhada |
| AÇÃO | `Tarefa` + `FeedbackAcao` | ação executada e seu resultado |
| RESULTADO | `FeedbackAcao`/`Outcome`/`ConhecimentoValidado` | medida do resultado |
| APRENDIZADO | `MemoriaCognitiva` (`tipo 'descoberta'` — padronização P77) + `ConhecimentoValidado` | patrimônio da Ponte |
| ALTERAÇÃO DO WORKFLOW | a criar (P80) | fechar o ciclo |

Nada aqui pede novo "motor de aprendizado" independente: o CORE já tem as peças; o P81 apenas **conecta** operação → memória com o mesmo padrão P77/P78.

## 4. O que "aprender" NÃO significa (guarda helé)

- Não é "dashboard que mostra estatística".
- Não é IA generativa criando recomendações.
- Não é transformar 1 caso em regra universal (Parte "uma empresa não é regra universal").
- Não é alterar o schema a cada aprendizado — o aprendizado configuralber o WORKFLOW (dados), não adiciona entidade.

## 5. Gatilhos de aprendizado (hipóteses de padrão, a validar)

Possíveis sinais (a confirmar com campo): retrabalho recorrente na mesma etapa; tempo de parada repetindo na mesma causa; dependência que sempre pausa; cliente retornando pelo mesmo motivo.

## 6. Ciclo de validação de um aprendizado (proposto, determinístico)

1. Agregar evidência (N≥2 ocorrências, origem registrada);
2. Form lovar hipótese (epistemologia);
3. Propor ação (no padrão P68: decisão acompanhada);
4. Executar + medir resultado;
5. Se resultado melhora: promover a Aprendizado (ConhecimentoValidado) e aplicar alteração no workflow;
6. Se não: arquivar a hipótese com o resultado (aprendizagem negativa também é patrimônio).

## 7. Descobertas operacionais (P77/P78 aplicadas a dados de operação)

O prefixo de descobertas já persistido em `MemoriaCognitiva` pode, quando houver dado operacional, gerar achados como: *"o prazo médio entre aprovação e produção aumentou nas últimas semanas"* — sempre com humildade e marcando SABEMOS/ACREDITAMOS.

## 8. Status e gate

- **Nada implementado.**
- **Gate de entrada do P81:** existir Motor de Workflow com dados reais (Fase 4+ do P80) e pelo menos subir-3 ciclos "observação→resultado" com dado real documentado.

## 9. Entregáveis desta fase

- Este documento conceitual.
- Atualizações de status (CURRENT_PRODUCT, CHANGELOG, KNOWN_ISSUES).
- Zero código / zero migration.

## Conclusão

O P81 é a **promessa de que a Ponte aprende com o trabalho** — não uma feature. A prova é empírica: primeiro o P80 (campo), depois o ciclo. Até lá, o aprendizado operacional é uma hipótese estruturada, protegida pelas regras de humildade da Ponte.