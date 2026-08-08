# REGISTRO DE CAMPO — SOUZA MESTRINHO METAIS — TEMPLATE

> Preenchido DURANTE a observação (não depois, de memória). Um registro por visita/observação. Se não houver visita real, este arquivo **não** deve ser preenchido por suposição — a ausência de registro é um dado (P80 bloqueado).
> Ao final, separar SEMPRE: **OBSERVADO** (fato presenciado), **DITO** (fala literal), **INFERIDO** (hipótese minha), **AINDA NÃO SABEMOS**.

## Metadados
- **Data/hora da observação:**
- **Observador(res):**
- **Pessoas presentes (nome/papel):**
- **Duração:** 
- **Apoio:** (fotos, gravações? PEDIR PERMISSÃO antes)
- **Tipo de trabalho observado:** (ex.: pedido de portão, medição, fabricação, instalação de calha, orçamento, cobrança)

## Pergunta-âncora (DO DONO — resposta literal)
> "Se pudéssemos eliminar uma única bagunça da empresa hoje, qual seria?"

**Resposta literal (dita):**
**Por que essa bagunça custa caro (dito/observado):**
**Junção para primeira entrega (hipótese):**

---

## 1. FLUXO REAL (o que é observável — desenhe a linha)
Cada passo: número, OBSERVADO (o que aconteceu), ONDE (WhatsApp/Excel/papel/cabeça/fone), RESPONSÁVEL, ESPERA (quanto tempo e por quê), dependência de que.

| # | Passo observado | Onde vive a info | Responsável | Espera? (motivo) | Depende de | Info perdida? |
|---|---|---|---|---|---|---|
| 1 | | | | | | |
| 2 | | | | | | |
| … | | | | | | |

**Ponto onde o trabalho PARIA (motivo real, dito ou observado):**

---

## 2. ENTRA E SAE (por passo/etapa)
| Etapa | Entrada esperada (o que precisa para começar) | Saída gerada (o que prova que aconteceu) | Como sabem que acabou |
|---|---|---|---|
| | | | |

---

## 3. ESTADOS REAIS observados (não status de formulário)
Para o trabalho observado, quais estados o trabalho de fato assumiu? (ex.: novo → orçado → aprovado → aguardando material → produzindo → aguardando pintura → bloqueado → instalado → concluído; **inclua estados de parada com motivo**):
- Acontecendo: …
- Parado porque: …
- Bloqueado por/falta: …
- Retrabalho ocorreu? Onde/por quê?

---

## 4. DEPENDÊNCIAS E QUEM PERGUNTA PARA QUEM
(Cada dia, quem precisa perguntar algo para avançar — as dependências são o coração do "próxima ação" e "bloqueio")
| Quem | Precisa perguntar o quê | Para quem | Com que frequência | Onde pergunta (WhatsApp? pessoalmente?) |
|---|---|---|---|---|
| | | | | |

---

## 5. OBSERVADO / DITO / INFERIDO / NÃO SABEMOS (registro final)
Cada item marcado com um dos esquemas:
- **[OBSERVADO]** fato presenciado, com hora.
- **[DITO]** fala literal entre aspas, com quem falou.
- **[INFERIDO]** hipótese nossa, claramente marcada (NUNCA como fato).
- **[NÃO SABEMOS]** o que ainda não sabemos (fazer nova pergunta/visita).

| # | Tipo | Relato (datado) |
|---|---|---|
| 1 | OBSERVADO | … |
| 2 | DITO | "…" |
| 3 | INFERIDO | … |
| 4 | NÃO SABEMOS | … |

---

## 6. MAIORES GARGALOS PERCEBIDOS (ordem de impacto)
1. **Gargalo:** [problema real] → **evidência:** (observado/dito) → **onde trava no fluxo:** → **padrão CORE/Template/Config:** a)
2. …
3. …

## 7. CLASSIFICAÇÃO DE PRODUTO (CORE × VERTICAL × CONFIG)
Para cada problema, classificar (regra ADR-035):
| Problema | Serve a qualquer empresa (CORE) | Específico de serralheria (Template) | Só desta empresa (Config) | Não implementar? |
|---|---|---|---|---|
| | | | | |

## 8. OUTROS DADOS OPERACIONAIS (quando houver)
- Tempos reais medidos: etapa → tempo → (se observado).
- A unidade de trabalho ("o que nasce, move-se e termina" — ex.: a OS? o pedido? o serviço?): OBSERVE com que objeto os funcionários se referem ("o portão", "a ordem", "o serviço"…).
- Informação que ninguém consegue responder rápido (o "ouro" da Ponte).
- Diferenças entre o processo descrito (dito pelo dono) e o executado (observado).

---

## 9. HIPÓTESES DE WORKFLOW (depois da visita; não fazer antes)
Baseado NO registro, preencher APÓS: candidatos de unidade operacional → candidatos de fluxo → pontos de parada → dependências. **Nunca criar código aqui.**

## 10. CHECKLIST DE ACEITE DO REGISTRO
- [ ] Pergunta-âncora respondida com fala literal do dono
- [ ] Fluxo real conectado da entrada até o término (com 1–2 paradas descritas)
- [ ] Pelo menos 3 problemas com as 4 classes separadas (O/D/I/N)
- [ ] Cada dependência "quem→perguntar→quem" preenchida
- [ ] Entidades de trabalho real (unidade: "o que se move") registrada
- [ ] Números/valores reais quando disponíveis (tempos, valores)

## ⛔ REGRAS
- Registro é a EVIDÊNCIA; sem ele o motor é opinião do desenvolvedor.
- Só subir de: REGISTRO → P80 (workflow) // → P81 (aprendizado) quando esse arquivo estiver completo e aceite.
- Não transformar aqui em requirements de sistema — apenas o que foi observado/dito.