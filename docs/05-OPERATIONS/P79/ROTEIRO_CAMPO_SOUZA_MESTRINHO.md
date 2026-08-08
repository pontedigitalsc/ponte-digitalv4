# Roteiro de Campo — Souza Mestrinho Metais (P79)

*)

Objetivo do campo: **descobrir e documentar o funcionamento real da operação** para validar/ajustar o mapeamento P79 — NÃO é a venda de software nem a prometidora de funcionalidades.

Local: Souza Mestrinho Metais, Palhoça — serralheria/metais, ~8 funcionários: produtos e serviços de ferro + calhas, rufos, condutores, instalações e trabalhos sob medida.

---

## 1. Regra-mestra da visita

> **Problema observado → Hipótese → Solução pequena → Validação → Generalização.**
> Nunca: ideia → funcionalidade → código → esperança.

A visita produz **hipóteses de fluxo**, não requisitos de sistema. Nada observado vira tabela/módulo por conta própria — passa pelo framework de classificação:

- Universal (serve qualquer empresa) → anotar como **CORE**
- Específico de serralheria (vertical Fabricação & Instalação) → anotar como **Template**
- Particularidade da Souza Mestrinho → anotar como **Configuração/não implementar**

## 2. Pergunta-âncora (primeiro recorte)

> "Se pudéssemos eliminar uma **única** bagunça da empresa hoje, qual seria?"

A resposta define o PRIMEIRO recorte do piloto (o resto fica documentado como descobertas secundárias).

## 3. Roteiro de perguntas (mapear o "hoje")

| # | Pergunta | O que observar |
|---|---|---|
| 1 | Como chega um novo pedido? | WhatsApp? telefone? indicação? presencial |
| 2 | Onde o cliente é registrado? | Excel? caderno? cabeça? |
| 3 | Como fazem orçamento? | quem, quando, quanto demora, como cobra, com que base de preço |
| 4 | O que acontece quando o orçamento é aprovado? | pra quem vai a informação? |
| 5 | Quem recebe a informação de arranque? | dono? funcionário? papel pego |
| 6 | Como a produção sabe o que precisa fazer? | pedido escrito? oral? folha? |
| 7 | Como sabem quais materiais comprar? | projeto? estimativa? experiência |
| 8 | Como organizam as instalações (agenda)? | atrás de qual informação estão instalações marcadas |
| 9 | Como controlam pagamentos? | entrada? sinal? restante? notas? |
| 10 | Qual o maior problema operacional atual? | na voz de quem opera |
| + | Quais informações **ninguém** consegue responder rápido? | gap de transparência (ouro do motor "qual é o estado desse trabalho?") |

## 4. Checklist de observação (o comportamento, não opinião)

- Onde procuram informações? (Excel / WhatsApp / papel / cabeça)
- O que fica em cada meio (o que está no Excel X no WhatsApp X na cabeça de alguém)
- Onde um pedido costuma travar? e em quem "trava"?
- Quem precisa perguntar para quem todos os dias? (rede de dependência)
- Quais informações se perdem? e em que momento?
- O que causa retrabalho? O que causa atraso?
- Onde existe duplicação de trabalho (anota duas vezes)?
- O que o responsável precisa perguntar todos os dias, toda vez?
- Registrar: comportamento real + frases reais (textual), com hora/dia.

## 5. Saída obrigatória do campo (modelo de registro)

Criar depois da visita (ex.: `docs/05-OPERATIONS/P79/REGISTRO_CAMPO_SOUZA_MESTRINHO_<data>.md`):

## REGISTRO DE CAMPO — <data>
**Local/pessoas:** ...
**Pergunta-âncora respondida:** ...
**Fluxo principal observado (com descrição):** Cliente → ..., Orçamento → ..., OS → ..., 
**Lista de problemas [P1..Pn]:**
| # | Problema (observação real, com fala) | Onde acontece | Frequência | Reclassificação (CORE/Vertical/Config) |
|---|---|---|---|---|
| 1 | ... | ... | ... | ... |
**Top 3 hipóteses de fluxo (não funcionalidades):**
1. ...
**Dependências críticas (quem pergunta a quem):**
**O que NÃO dá para saber ainda (lacunas):**

## 6. Compromissos da visita

- NÃO criar nenhuma funcionalidade "prometida na visita" — registrar como hipótese.
- NÃO substituir todo o Excel — pacto com o dono: primeiro aderec canário único ("uma bagunça").
- NÃO gerar tabelas/migrations OBS; P80 usa apenas as hipóteses validadas.
- Pedir permissão para registrar as falas reais; manter ambientes bonitos de ética e confidencialidade.
- Observar as regras da V4: evidência > ideal.

## 7. Critério de encerramento

A visita vale como gate do P79 quando: responder à pergunta-âncora, registrar ≥2 fluxos reais completos e produzir UM registro de campo com clcarit inh de pelo menos 3 problemas CLASSIFICADOS (CORE/Vertical/Config). Acompanhamento e como podem egressão P80.