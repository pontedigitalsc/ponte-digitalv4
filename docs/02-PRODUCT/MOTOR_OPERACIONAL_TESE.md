# Tese do Motor Operacional — A Ponte Digital organiza a operação

**Status:** Tese em fase de mapeamento (P79) — NÃO é regra congelada nem funcionalidade aprovada.
**Registro:** `docs/07-MILESTONES/P79_MOTOR_OPERACIONAL.md` | **Decisão arquitetural:** `ADR-035`.
**Contexto de origem:** oportunidade real com a Souza Mestrinho Metais (serralheria, ~8 funcionários, Palhoça) — não é "criar um sistema para serralheria", é usar esse caso como laboratório para uma camada genérica.

---

## 1. Tese do produto

A Ponte Digital evolui de:

```
Cliente → CRM → Tarefas → Financeiro → Assistente
```

para:

```
Cliente → Demanda → Orçamento → Execução → Entrega → Relacionamento
```

O CRM, o financeiro e o assistente continuam existindo. Surge uma nova camada central:

# OPERAÇÕES

A camada que representa como a empresa **transforma uma demanda de cliente em trabalho executado** — usando o mesmo motor para fluxos diferentes:

- **Serralheria:** Cliente → orçamento → medição → material → fabricação → pintura → instalação → conclusão
- **Calhas:** Cliente → orçamento → medição → material → fabricação → instalação → conclusão
- **Lavação:** Cliente → veículo → serviço → execução → acabamento → entrega
- **Barbearia:** Cliente → agendamento → serviço → profissional → pagamento → retorno
- **Assistência técnica:** Cliente → equipamento → diagnóstico → orçamento → reparo → entrega
- **Manutenção (predial/industrial):** Cliente → chamado → diagnóstico → orçamento → execução → laudo/conclusão

Os fluxos diferem; a infraestrutura por trás é semelhante.

**Regra:** NÃO hard-codar setores. O motor é compartilhado; a vertical é configuração.

## 2. Princípio arquitetural central (a frase-guia)

Toda nova necessidade deve responder:

> "Estamos construindo uma solução para este cliente ou descobrindo uma capacidade que a Ponte Digital deveria possuir?"

| Caso | Classificação |
|---|---|
| Universal (serve qualquer empresa) | **CORE** — modelo/entidade universal |
| Específico de um segmento | **Template/vertical** — dados de configuração, NUNCA código novo |
| Particular de um único cliente, sem valor generalizável | **Configuração tenant** ou **não implementar** |

## 3. Núcleo universal — conceitos

Entidades do modelo universal (nem todas imediatas — o CORE mapear para acomodá-las):

`Cliente · Contato · Demanda · Oportunidade · Orçamento · Ordem de Serviço · Tipo de Trabalho · Workflow · Etapa · Tarefa · Responsável · Equipe · Agenda · Recurso · Material · Pagamento · Interação · Anexo · Foto · Checklist · Ocorrência · Evento · Histórico · Indicador`

O motor não precisa saber o que é uma serralheria. Ele precisa **saber executar um workflow**.

## 4. Motor de operações — Tipo de Trabalho

Um Tipo de Trabalho (Trabalho) representa o que a empresa executa: Fabricação de Portão, Grade, Corrimão, Estrutura Metálica, Instalação de Calha/Rufo/Condutor, Manutenção, Lavagem Completa, Corte de Cabelo, Reparo de Equipamento.

Cada Tipo pode possuir: nome, descrição, workflow, etapas, campos específicos, checklist, materiais, recursos, duração estimada, responsáveis, regras, mensagens e indicadores.

## 5. Workflow configurável

A engine de workflow é única; a configuração é diferente por vertical:

```
Portão:     Orçamento → Medição → Projeto → Aprovação → Material → Fabricação → Pintura → Instalação → Concluído
Calha:      Orçamento → Aprovado → Medição → Material → Fabricação → Instalação → Concluído
Lavação:    Agendamento → Recepção → Lavagem → Acabamento → Entrega
```

## 6. Ordem de Serviço universal ("a ficha viva")

A **Ordem de Serviço** é a entidade operacional central. Uma OS contém: cliente, tipo de trabalho, endereço (obra), medidas, valor, responsável, equipe, prazo, status, workflow + etapa atual, histórico, fotos, anexos, materiais, tarefas, observações, ocorrências, pagamentos e eventos.

> O usuário não deveria perguntar "Em qual planilha isso está?" — deveria perguntar **"Qual é o estado desse trabalho?"** e a Ponte deve responder.

## 7. Objetos específicos por vertical

O núcleo precisa permitir relações específicas sem contaminar a arquitetura (serralheria → Obra, Medidas, Produto; lavação → Veículo; assistência → Equipamento, Diagnóstico). **Decisão (ADR-035):** esses objetos vivem como **metadados `Json` universais** na OS/Tipo (padrão ADR-007), não como tabelas de domínio — até prova de repetição (2ª vertical) exigir generalização.

## 8. Event Engine

Toda mudança relevante gera um evento (orçamento criado/aprovado/perdido, medição realizada, material comprado/recebido, produção iniciada/concluída, instalação agendada/concluída, pagamento recebido, serviço atrasado, etapa bloqueada). Os eventos alimentam: histórico, indicadores, automações, notificações, tarefas, IA e descobertas.

**Estado real:** o schema já possui `Evento` (`eventos`), `EventSubscription` (`event_subscriptions`) e `DeadLetter` (`dead_letters`), além do ADR-011 (Event Bus in-memory). A camada operacional **reutiliza** esse esqueleto — não duplica (ver mapa de domínio P79).

## 9. Automações

Reagir a partir de eventos:

- Orçamento aprovado → criar OS
- Produção concluída → avisar responsável pela instalação
- Instalação concluída → criar tarefa de pós-venda
- OS parada por 3 dias → alerta
- Cliente sem retorno por 5 dias → follow-up
- Material indisponível → marcar OS como bloqueada

## 10. Motor de gargalos

Camada que identifica onde os trabalhos estão parando (aguardando material / pintura / aprovação) e interpreta: *"Existem 3 serviços bloqueados; o principal gargalo é material."* — dados operacionais viram informação gerencial.

## 11. Assistente → Inteligência Operacional

O assistente passa a responder com dados REAIS da empresa: "Quais serviços estão atrasados?", "Quais orçamentos estão parados?", "Onde estão os principais gargalos?", "Qual equipe está sobrecarregada?", "Quais clientes receberam orçamento e não responderam?".

## 12. Descobertas operacionais

Conectar a arquitetura P77/P78 de descobertas aos dados operacionais: prazo médio aprovação→produção aumentando; atrasos ligados à falta de material; retorno em 24h e taxa de aprovação; cinco serviços parados dependendo de uma mesma ação. Crescimento: mostrar o que está acontecendo → por que provavelmente → o que pode significar → o que merece atenção — sempre com humildade.

## 13–14. Primeira vertical — Fabricação & Instalação (Souza Mestrinho)

Primeiro recorte do piloto:

```
Cliente → Orçamento → OS → Produção → Instalação → Conclusão
```

Depois (quando observado/validado): materiais, agenda, equipes, financeiro operacional, pós-venda, indicadores, automações. Não substituir todo o Excel de uma vez.

## 15–16. Descoberta de produto no campo

Regra de descoberta: **Problema observado → hipótese → solução pequena → validação → generalização**. Nunca `ideia → funcionalidade → código → esperança`. Observar: onde procuram informações, o que fica no Excel/WhatsApp/cabeça, onde um pedido travar, quem pergunta para quem, o que gera atraso/retrabalho.

**Pergunta-âncora da primeira entrega:** *"Se pudéssemos eliminar uma única bagunça da empresa hoje, qual seria?"* — a resposta orienta o primeiro recorte, não o contrário. Ver `docs/05-OPERATIONS/P79/ROTEIRO_CAMPO_SOUZA_MESTRINHO.md`.

## 17. Arquitetura conceitual e multi-tenancy

```
PONTE DIGITAL
├── CORE           (CRM, Clientes, Comunicação, Financeiro, Usuários, Permissões, Multi-tenant)
├── MOTOR OPERACIONAL (Demandas, Orçamentos, OS, Workflows, Etapas, Tarefas, Equipes, Recursos, Agenda, Checklists, Ocorrências)
├── EVENT ENGINE   (Eventos, Histórico, Regras, Automações)
├── INTELIGÊNCIA   (Assistente, Conselheiro, Descobertas, Indicadores, Garpos)
└── VERTICAIS      (Fabricação&Opção | Lavação | Barbearia | Assistência técnica | Manutenção | …)
```

A vertical **configura o core, não o duplica**. Tudo tenant-aware: workflows, tipos, campos, eventos, OS e indicadores são por empresa (motor compartilhado, dados isolados).

## 18. Template vertical (app builder operacional)

Uma empresa nova escolhe um modelo ("Fabricação e instalação", "Serviços automotivos", "Barbearia", "Assistência técnica") e ajusta: tipos de trabalho, etapas, campos, checklists, responsáveis, regras, automação e indicadores. Sem ser construtor complexo.

## 19. Roadmap (P79 → P90+)

Referência completa no milestone. Princípio de sequência: **(1) mapear, (2) workflow, (3) OS, (4) tipos, (5) eventos+automação, (6) agenda/equipe/recurso, (7) material, (8) assistente operacional, (9) gargalos+indicadores, (10) template Fabricação & Instalação, (11) piloto Souza Mestrinho, (12) generalização.**

## 20. O que NÃO fazer

- Nenhum `serralheria-service.ts`, `calhas-module.ts`, `barbearia-module.ts`, `lavagem-module.ts` como soluções independentes.
- Nenhuma funcionalidade "porque parece interessante".
- Não substituir todo o ERP/Excel imediatamente; nem estoque contábil completo; nem ERP genérico gigante.
- Não deixar a IA inventar dados; não deixar cada cliente gerar arquitetura própria.

## 21. Posicionamento

"A Ponte Digital organiza a operação da sua empresa, do primeiro contato à entrega." — conceitualmente, "um sistema operacional para pequenos negócios", com verticalização por modelo operacional.

Progressão: **Dados → Contexto → Operação → Eventos → Inteligência → Decisão.** A final: transformar o funcionamento da empresa em um sistema vivo (não "digitalizar o Excel").