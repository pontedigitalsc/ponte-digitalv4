# Kit de Reunião — Souza Mestrinho Metais (laboratório da operação)

> **Rodada:** Copiloto Operacional — preparação da primeira reunião de descoberta com a
> **Souza Mestrinho Metais** (serralheria/metais, Palhoça — ferro + calhas, rufos, condutores,
> instalações e trabalhos sob medida).
> **Vínculo:** usa a mesma disciplina do `ROTEIRO_CAMPO_SOUZA_MESTRINHO.md` e do
> `REGISTRO_CAMPO_SOUZA_MESTRINHO_TEMPLATE.md` existentes, porém organiza a reunião para
> **alimentar os registros e modelos da P92** (caderno de descoberta operacional) e, com isso,
> o motor `copiloto-operacional.ts`.
> **Limite:** a reunião produz **fatos e desenhos** (registros/texto) — **nada de funcionalidade
> prometida**, nada de `OrdemServico`/`Workflow` implementado.

---

## 1. Objetivo da reunião (dizer ao dono o que vamos fazer)

> "Vamos entender como um serviço começa e termina na sua empresa — o que precisa acontecer,
> quem participa, onde trava. No fim, você vai me contar qual a única bagunça que pagaria pra
> sumir. Eu anoto, não prometo nada — e essa conversa vira o ponto de partida do que vamos
> construir com vocês."

- **Não** é venda de software. **Não** é demonstração de sistema.
- Resultado esperado: entender **uma operação real** (perfil de venda + fluxo principal +
  pontos de parada + dependências + 1–3 problemas classificados), registrados no caderno P92.

## 2. Pré-requisitos antes de entrar

1. Confirmar a **pergunta-âncora** decidida com o dono (a "maior bagunça" = primeiro recorte).
2. Levar o **template de registro** (`REGISTRO_CAMPO_SOUZA_MESTRINHO_TEMPLATE.md`) pronto para
   preencher DURANTE (não de memória).
3. Acordar **permissão** para anotar falas literais (ética e confidencialidade; fotos/áudio só
   com autorização).
4. Combinar **duração** (60–90 min) e participantes:
   - dono/administração (a venda, o orçamento, o dinheiro);
   - 1 pessoa de produção (como a informação chega e o que falta).
5. Criar (se ainda não existir) a **CategoriaOperacional de Serralheria** com `empresaPioneiraId`
   apontando para a Souza Mestrinho.

## 3. Agenda sugerida (90 min)

| Bloco | Tempo | Objetivo |
|---|---|---|
| 1. Abertura e regra do jogo | 5 min | contexto, objetivo (seção 1), escuta, sem promessas |
| 2. Pergunta-âncora | 10 min | registrar resposta **literal** do dono + por que custa caro |
| 3. Perfil de venda | 15 min | como o cliente chega, quem vende, como cobra (entrada/sinal) |
| 4. Fluxo de um serviço real de ponta a ponta | 25 min | desenhar com o dono NA LOUÇA: pedido → produção → instalação → pagamento |
| 5. Dependências e informação | 15 min | quem pergunta para quem; onde mora a informação (Excel/papel/WhatsApp/cabeça) |
| 6. Dores e exceções | 15 min | os bloqueios reais, o retrabalho, o que "ninguém sabe responder rápido" |
| 7. Fechamento | 5 min | recap das 1–3 dores (sem prometer), combinar continuação, agradecer |

## 4. Roteiro de perguntas (a partir da âncora — “me conta como começa um serviço aqui”)

> Perguntas abrem pela **âncora** e descem para o fluxo real, ecoando as 10 perguntas do
> roteiro P79 (ver `ROTEIRO_CAMPO_SOUZA_MESTRINHO.md` §3). Manter UMA cadeia de perguntas por
> vez; anotar a **resposta literal** e o **local** onde a informação mora.

1. âncora → "Se pudéssemos eliminar uma única bagunça da empresa hoje, qual seria?"
2. Como chega um novo pedido? (WhatsApp/telefone/indicação/presencial)
3. Como o cliente é registrado? (Excel/caderno/cabeça) — onde fica?
4. Como fazem orçamento? (quem, quanto demora, como recebe o sinal)
5. Quando o orçamento é aprovado, para **quem** e **como** a informação chega (para o
   "arranque")?
6. Como a produção sabe o que fazer? (pedido escrito, oral, folha?) — onde mora a medida?
7. Como compram material? (projeto/estimativa/experiência) — quem confere?
8. Como a instalação é agendada? (atrás de quê?) — o que falta para marcar?
9. Como controlam pagamentos? (entrada, restante, notas) — o que falta para receber?
10. Qual o maior problema operacional hoje? (na voz de quem opera)
11. O que ninguém consegue responder rápido? (gap de transparência)

### Fechamento que enquadra a percepção (para a "primeira grande vitória")

- "Qual desses está no caminho do **todo**: algo que afeta a empresa toda, todos os dias?"
- "Se só isso melhorasse, o que mudaria no fim do mês?"

## 5. Como capturar DURANTE (mapa para o caderno P92)

| O que aparece na conversa | Para onde vai | Tipo de registro |
|---|---|---|
| Como um serviço começa e termina (passos reais) | `ProcessoDescoberta` (etapas, entradas/saídas, dependências) | registro do processo |
| "A gente faz assim" / "hoje é assim" | registros com tipo **COMO FAZEMOS** | `INFORMACAO_FORNECIDA` |
| O que o dono diz que é + o que observamos diferente | `DivergenciaDescoberta` (dito × observado) | divergência |
| Onde trava, retrabalho, espera | `ProcessoDescoberta.retrabalhos/riscos` + Oportunidade | `OPORTUNIDADE` |
| "Seria melhor se…" / desejo | `ProcessoDesejadoDescoberta` (COMO PODERIA SER) — separado do "hoje" | desejado |
| Falas/observações soltas | `RegistroDescoberta` | conforme taxonomia |
| Quem faz o quê | `ParticipanteDescoberta` + responsáveis | participante |
| Confirmação de hipótese | `OportunidadeDescoberta` (status candidata → validada) | oportunidade |

> **Regra das 5 realidades na coleta (nunca misturar):**
> **[REALIDADE]** o que é (observado/dito) · **[PROBLEMA]** o que trava ·
> **[HIPÓTESE]** o que achamos (marcado como "achamos") · **[DECISÃO]** o que o dono decidir ·
> **[RESULTADO]** o que deu. A memória liga uma à outra; nada vira regra sem RESULTADO.

## 6. O que a reunião NÃO deve fazer

- ❌ Prometer tela/funcionalidade ("isso nós vamos fazer").
- ❌ Virar regra sem evidência (toda afirmação vira [DITO]/[OBSERVADO]/[INFERIDO]).
- ❌ Misturar "hoje" com "desejo" no mesmo registro (COMO É × COMO PODERIA SER separados).
- ❌ Decidir pioneirismo formal com o dono numa primeira conversa (é construído com o tempo).
- ❌ Abrir P80/P81 (workflow/OS) — o gate continua esperando o `REGISTRO_CAMPO_...` completo.

## 7. Pós-reunião (dentro de 48h)

1. Preencher `REGISTRO_CAMPO_SOUZA_MESTRINHO_<data>.md` (template P79) e aplicar os 4 rótulos
   (OBSERVADO/DITO/INFERIDO/NÃO SABEMOS).
2. Alimentar o caderno P92 no sistema: `DiagnosticoOperacional` (nova empresa/nova categoria →
   diagnóstico), processos, registros, divergências, desejados, oportunidades.
3. Classificar cada problema (CORE / Template / Config) — ADR-035.
4. Rodar o motor `copiloto-operacional.ts` sobre o que foi registrado (Nível de intervenção +
   Visão do gerente + Mapa de atrito) e revisar com o dono a lista de 1–3 prioridades.
5. Registrar a **divergência de nomenclatura** em `KNOWN_ISSUES.md` (canônico: **Souza Mestrinho
   Metais**; variação "Mestre Metais" provém de falas informais).

## 8. Critério de aceite desta etapa (gate P79/P80)

A reunião alimenta o gate quando entrega:
- [ ] Pergunta-âncora respondida (fala literal do dono).
- [ ] ≥2 fluxos reais completos (entrada → término) com paradas e dependências.
- [ ] ≥3 problemas CLASSIFICADOS (CORE/Template/Config) no `REGISTRO_CAMPO_...`.
- [ ] Caderno P92 atualizado (processos, registros, divergências, oportunidades).
- [ ] Nenhuma funcionalidade/regra de operação criada nesta rodada (P80 continua bloqueado).