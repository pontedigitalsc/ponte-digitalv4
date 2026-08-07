# P77 — A Ponte precisa merecer a conversa

## Objetivo

Deixar de melhorar a **conversa** e começar a melhorar a **inteligência percebida**. Hoje o fluxo é "Empresário fala → Ponte responde → *'Legal.'*". P77 faz: "Empresário fala → Ponte conecta → o empresário para alguns segundos → *'…eu nunca tinha pensado nisso.'*" A Ponte deve **interpretar**, não apenas resumir.

## Missão (limites rígidos)

- ❌ Não adversar funcionalidades.
- ❌ Não mudar telas.
- ❌ Não aumentar perguntas nem o tempo da sessão.
- ❌ Não criar módulos novos para o usuário.
- ❌ Não usar IA para inventar interpretações.
- ✅ Somente aumentar a qualidade da interpretação.

## O que foi entregue

### 1. Motor das Descobertas (`sistema/src/engine/motor-descobertas.ts`) — NOVO engine interno

Antes do Retrato, o motor gera até **3 descobertas**. Cada uma obrigatoriamente:
- conecta **pelo menos duas partes diferentes** da conversa (nunca uma resposta isolada);
- segue o formato: **O que observei → Por que eu acredito → O que pode significar**;
- nasce **exclusivamente de evidência** (match no valor/questão real).

As 3 nascem de regras sobre os IDs reais do fluxo:

| Descoberta | Evidência que conecta (mín. 2) | Leitura |
|---|---|---|
| `crescimento_linear` | `frente.proximo` (crescer/equipe/lucro) × `empresa.dependencia`/`empresa.momento`/`rotina.energia` | crescimento linear vs estrutural — o obstáculo não é vender mais, é desmontar a operação que só anda com você no centro |
| `tempo_sem_espaco` | `empresa.crescer` (tempo) × `rotina.cabeca`/`rotina.tranquilo`/`empresa.decisao` | "falta de tempo" é sintoma, não causa; falta espaço para decisão no centro |
| `dinheiro_e_leitura` | `financeiro.previsao` × `financeiro.caixa` × `empresa.decisao` | o peso do dinheiro é a **leitura** (previsibilidade), não a falta de dinheiro |

**Guarda de evidência:** se não houver suporte em nenhuma prova, o motor devolve `"Ainda não tenho elementos suficientes para afirmar isso."` — nunca preenche lacuncas com criatividade.

### 2. Retrato Estratégico (`retrato-estrategico.ts`)

- Nova seção **3. "As descobertas que eu cheguei"** (o `RetratoEstrategicoCard` renderiza seções genericamente → sem mudança de tela).
- **Frase transformadora final** : o Retrato passa a usar `descobertas.fraseTransformadora` quando há evidência (ex.: *"Talvez sua empresa não precise de mais esforço. Talvez preciso que você deixe de ser o centro dela."*), nunca a motivação clichê.
- Seções renumeradas para 7 (decisão virou 6, pergunta virou 7); `registrarClarezaGerada` agora acha a decisão por título ("A decisão…"), resistindo a renumeração.

## Critério de aprovação (P77)

O programa é considerado concluído quando, em testes reais:
- empresários **interrompem a leitura** para pensar;
- dizem espontaneamente *"nunca tinha visto por aíesse lado"*;
- percebem que a Ponte **conectou informações que eles próprios forneceram**;
- percebem que o valor veio da **interpretação**, não da quantidade de perguntas.

Como a distinção entre chatbot e a Ponte é "chatbot resume, a Ponte interpreta", este motor é a base: cada descoberta nasce da conexão entre respostas distantes, e o empresário passa a voltar para **pensar melhor sobre o negócio**, não para registrar informação.

## Fora do escopo desta entrega (documentado para decisão)

- **Conselheiro que desafia** (`conselheiro-engine.ts`): hoje aconselha pondo causa; a camada de "desafiar com respeito" (ex.: trocar *"talvez organize melhor"* por *"a origem pode estar na operação que depende de você"*) é um passo adjacente e isolado — não misturar nesta entrega para manter o foco e a testabilidade do Motor das Descobertas.
- **Perguntas que deslocam o pensamento** na conversa (ex.: "*Se dobrasse de tamanho, qual problema dobraria junto?*") — podem desafiar "rotina/reflexão" como evolução futura.

## Arquivos afetados

- `sistema/src/engine/motor-descobertas.ts` (novo — Motor das Descobertas).
- `sistema/src/engine/retrato-estrategico.ts` (nova seção 3 + frase transformadora + achat de clareza).
- Nenhuma tela, nenhum módulo, nenhuma pergunta nova.

## Verificação de tipo

`npm run typecheck` → sem erros.