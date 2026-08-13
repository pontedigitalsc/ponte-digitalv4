# MAPA_EVOLUCAO_PONTE — Arquitetura de integração: Captar → Entender → Auxiliar → Aprender (P94)

> **Objetivo:** transformar a Ponte de "sistema com vários módulos" em uma **camada viva de
> compreensão da empresa** — o Copiloto Operacional como centro de gravidade, sem novas tabelas
> gigantes e sem inventar domínio bloqueado.
> **Regra absoluta:** reutilizar o que existe antes de criar; inferir com segurança antes de
> perguntar; perguntar em contexto antes de criar formulário; IA só onde interpretação agrega.
> **Status:** arquitetura de integração (documento). Gate de campo da Souza Mestrinho permanece
> (OBSERVADO = ∅) — nada de OS/Orçamento/Workflow codificado.

---

## 1. O ciclo de vida (os 4 movimentos)

```
   ┌───────────────┐    ┌───────────────┐    ┌───────────────┐    ┌───────────────┐
   │    CAPTAR     │───▶│    ENTENDER   │───▶│    AUXILIAR   │───▶│    APRENDER   │
   │  sinais da    │    │  sinais →     │    │  devolve:     │    │  confirma →   │
   │  empresa      │    │  contexto     │    │  alerta,      │    │  registra,    │
   └───────────────┘    └───────────────┘    │  pergunta,    │    │  evolui       │
                                             │  próximo passo│    └───────────────┘
                                             └───────────────┘           │
       ▲                                                                    │
       └────────────────────  observação do resultado  ────────────────────┘
```

### 1.1 CAPTAR — hoje

| Fonte real | Como entra hoje | Estado |
|---|---|---|
| Conversa `/conversa` | fluxo determinístico → Evidência, Hipóteses, Memórias | ✅ funciona |
| Atendimento `/atendimento` | serviço cria Histórico+Transação+Evidência+Outcome | ✅ melhor padrão |
| Caixa `/financeiro` | Transação via API | ✅ |
| CRM `/crm` | Lead + converter→Cliente | ✅ |
| Tarefas `/tarefas` | Tarefa via API | ✅ |
| Implantação `/implantacoes` | Implantacao + EtapaImplantacao | ✅ |
| Sinais de clientes/tarefas/financeiro | `gerarSinais*` em memória | ⚠️ **efêmero** — nasce e morre na request |
| Assistente `/assistente` | chat com IA | ⚠️ não gera tarefa/sinal |

**Lacuna CAPTAR:** sinais operacionais não são persistidos (`HistoricoSinal` vazio). Um cliente
inadimplente ou tarefa atrasada gera um sinal que desaparece.

### 1.2 ENTENDER — hoje

| Peça | O que faz | Estado |
|---|---|---|
| `cognitive-context-engine` | `decidirContexto`, `buscarSituacaoEmpresa`, próximo movimento | ✅ forte |
| `copiloto-operacional.ts` | Nv 0–4 + Visão do gerente + carga cognitiva + atrito + perguntas | ✅ motor pronto, **sem UI** |
| Evidências/Hipóteses | persistidas pelo orquestrador | ✅ |
| `HistoricoSinal` | **modelo pronto, vazio** | 🔴 ocioso |
| `SinalValor` | valor percebido (CLAREZA, DECIDIU, RETORNO) | ✅ |

**Lacuna ENTENDER:** os sinais que representam "o que está acontecendo agora" não são
**materializados** em lugar visível. O dashboard já recebe `situacao.sinais` e `contexto`
mas **não renderiza** `centroDiario`.

### 1.3 AUXILIAR — hoje

| Peça | Onde | Estado |
|---|---|---|
| Centro de Decisão `/centro-decisao` | recomendações priorizadas | ✅ |
| Abertura do dia (dashboard) | texto que conecta fatos | ✅ textual |
| `ComoEstaHoje` | check-in | ⚠️ input descartado |
| Notificações cognitivas | CTA → `/historico` (rota morta) | ⚠️ link errado |
| Assistente | chat com contexto real | ⚠️ informa, não age |

**Lacuna AUXILIAR:** o auxílio existe como **texto** e como **recomendações abstratas**, mas
não como **ação clicável** que leva ao módulo certo. Não existe "próximo melhor movimento"
persistido e acionável.

### 1.4 APRENDER — hoje

| Peça | Onde | Estado |
|---|---|---|
| Evidência/Outcome/Feedback | persistidos | ✅ |
| Memória Cognitiva/Hipóteses | persistidas | ✅ |
| Conhecimento validado | `/conhecimento`, `/memoria` | ✅ |
| Caderno P92 → template/vertical | plataforma | ✅ estrutural |
| Ciclo descobrir→validar→implementar→observar | arquitetura conceitual | ✅ documentado |
| Aprendizado operacional (P81) | **bloqueado** | 🔴 gate campo |

---

## 2. O Copiloto como centro de gravidade

### 2.1 Princípio

Não adicionar "mais um botão chamado Copiloto". O Copiloto deve ser **o estado derivado** da
empresa: cada parte do produto (caixa, CRM, tarefas, atendimento, implantação) passa a
**conversar com um estado único** — o contexto operacional — em vez de serem ilhas.

### 2.2 O que muda na prática (sem schema novo)

```
HOJE:  módulo → API → tabela → (adesivo cognitivo por cima)
NOVO:  módulo → API → tabela → SINAI persistido (HistoricoSinal)
                          └───────▶ CONTEXTO OPERACIONAL (derivado, consulta)
                                          │
                                          ▼
                        "O que está acontecendo agora?" (dashboard/visão)
                        "Por que importa? Quem? O que depende? Próximo passo?"
```

### 2.3 Conexões concretas (o que existe hoje e pode ser ligado)

| Conexão | Peças existentes | Ação |
|---|---|---|
| Atendimento → Caixa → Cliente | Histórico + Transação + Cliente | juntas em `/atendimento` e `/clientes/[id]` ✅ |
| Lead → Cliente → Implantação | `/api/leads/[id]/converter` + Cliente + Implantacao | falta **linha visual** ligando os 3 |
| Tarefa atrasada → alerta | Tarefa + sinais | sinal morre; não persiste nem notifica |
| Transação vencida → alerta | Transacao + sinais financeiro | idem |
| Conversa → ação | conversa determinística | não gera tarefa "ligar pro cliente" |
| Assistente → ação | chat com contexto | informa mas não executa |

### 2.4 Níveis de intervenção (preservar `copiloto-operacional.ts`)

```
Nv 0 silenciosa → registra e organiza
Nv 1 automática → avança estado, gera checklist (regra validada)
Nv 2 sugestão   → "parece pronto para a próxima etapa" (confirmação leve)
Nv 3 confirmação→ precisa de decisão humana ("posso liberar?")
Nv 4 escalada   → risco; responsável informado; acompanha
```
> Silêncio também é inteligência: nem tudo vira alerta. O motor já classifica isso.

---

## 3. Motor de Contexto (sem tabela gigante)

Responder: *o que está acontecendo agora? por que importa? quem? o que depende? o que está
atrasado? última decisão? exceção? próximo passo provável?*

**Decisão de arquitetura:** o Motor de Contexto é **uma consulta derivada** sobre entidades
existentes (Cliente/Lead/Tarefa/Transacao/Implantacao/Historico/Evidencia/SinalValor), **não**
uma nova tabela. Dois blocos:

1. **Contexto em tempo real** (hoje em `buscarSituacaoEmpresa` + `decidirContexto`) — calculado
   a cada request. Já responde a maioria das perguntas.
2. **Contexto persistido** — o que falta: gravar os sinais em `HistoricoSinal` para (a) o
   dashboard mostrar "hoje", (b) detectar mudanças entre dias, (c) alimentar o `copiloto-operacional.ts`.

### 3.1 Plano de escrita de `HistoricoSinal` (reutilizar o modelo existente)

| Fonte | Sinal | Quando gravar |
|---|---|---|
| Tarefas | `TAREFA_ATRASADA`, `TAREFA_CONCLUIDA` | no PATCH/status da tarefa |
| Financeiro | `TRANSACAO_VENCIDA`, `PAGAMENTO_RECEBIDO` | no ciclo da transação |
| Clientes/Leads | `LEAD_QUENTE`, `CLIENTE_NOVO` | na criação/conversão |
| Atendimento | `SERVICO_REGISTRADO` | no `atendimento.service` |
| Conversa | `CONVERSA_FINALIZADA` | no `/finalizar` |
| Decisão | `DECISAO_REGISTRADA` | no centro-decisao |

> Sem inventar schema: `HistoricoSinal` já tem `tipo`, `descricao`, `importancia`, `empresaId`.
> Gravar no mesmo fluxo transacional de cada ação (padrão do `/atendimento`).

### 3.2 Dashboard "A empresa agora" (a visão de hoje)

Substituir a ideia de "painel com números" por uma visão que responde **"o que eu preciso
saber agora?"** — reutilizando o que o dashboard **já calcula e descarta**:

```
🔵 Acontecendo   — atendimentos de hoje, sinais do dia
🟢 Avançando     — implantações com etapas concluídas, tarefas feitas
🟡 Atenção       — sinais de sugestão (Nv 2), pendencias
🔴 Risco         — sinais de escalada (Nv 4): tarefa atrasada, parcela vencida
✦ Ponte percebeu — conexão entre 2+ sinais (ex.: "3 pedidos aguardando a mesma etapa")
```
> `centroDiario` (já construído no dashboard e nunca renderizado) é a base desta camada.

---

## 4. Decisão de priorização (fase P94)

| # | Frente | Tipo | Por quê agora |
|---|---|---|---|
| 1 | Dashboard "A empresa agora" (renderizar `centroDiario`/`revisao` + sinais) | B→A | custo ~zero, dados prontos, impacto máximo no "parece vivo" |
| 2 | Persistir sinais em `HistoricoSinal` (fontes reais) | B→A | base para o estado persistido e o copiloto |
| 3 | Ativar navegação mobile (drawer) + linkar `/crm` `/tarefas` `/implantacoes` no sidebar | F→A | produto é inviável no celular hoje |
| 4 | Ativar botões mortos do perfil do cliente (Nova tarefa/Anotar/cobrança) | B→A | transforma o perfil no hub de ação |
| 5 | Ligar o motor `copiloto-operacional.ts` ao detalhe da descoberta (Visão do gerente) | B→A | o Copiloto deixa de ser conceitual |
| 6 | Corrigir link morto da notificação (`/historico` → `/minha-jornada`) | F→A | quebra funcional real |
| 7 | Fix de pendências P0: `LIMITE_IA_DIARIO`, sitemap | F→B | segurança/correção |
| 8 | Landing: evolução visual/narrativa (sem recomeçar) | A→melhor | item 12–24 do briefing |
| 9 | Limpeza: APIs órfãs, `/diagnostico`, duplicações `normalizarTexto` | E/G→remover | P3, após P0-P2 |

---

## 5. O que fica bloqueado (respeitar gate)

- OS/OrdemServico/Workflow/Orcamento/Agenda/Material: **bloqueado** até reunião Souza Mestrinho
  (OBSERVADO = ∅). Documentado em `KNOWN_ISSUES.md`.
- Motor Cognitivo completo, Domain Events formais, Repositories, Server Actions, Inteligência
  Coletiva: **congelados** (MVP_SCOPE §2).
- Qualquer claim comercial (desconto, garantia, exclusividade): **proibido** sem decisão do produto.

---

## 6. Critério de sucesso da evolução

O empresário deixa de pensar *"qual módulo eu abro?"* e passa a pensar *"o que está acontecendo
na minha empresa?"* — e a Ponte o ajuda a descobrir. A experiência mostra **conexões** (linhas,
fluxos, cartões contextuais, sinais), não apenas CRUDs com texto por cima.
