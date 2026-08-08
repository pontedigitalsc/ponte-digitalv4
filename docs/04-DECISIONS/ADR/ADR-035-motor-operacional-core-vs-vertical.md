# ADR-035: Motor Operacional — CORE universal vs. Vertical configurável vs. Particular de cliente

**Data:** 2026-08-07
**Status:** Aceita

> Decisão estratégica de produto. Sensível à fase: define **como** o domínio operacional evolui, sem liberar nenhuma funcionalidade nele (P79 é mapeamento, zero código).

## Contexto

A Ponte Digital possui CRM, financeiro, histórico, tarefas, assistente inteligente e uma camada de raciocínio determinístico (P65–P78). Surge agora uma oportunidade de evolução concreta: a **Souza Mestrinho Metais** (serralheria, ~8 funcionários, Palhoça) — operação com forte dependência de Excel e organização que pode melhorar.

O risco estratégico imediato é duplo:

1. **Construir "o sistema da Souza Mestrinho"** — cria soluções específicas (`serralheria-service.ts`) que não generalizam.
2. **Construir um ERP genérico gigante** — funcionalidades universais demais, sem validação, contradizendo a disciplina V4 (evidência antes de opinião).

A pergunta que precisa ser decidida como política permanente:

> Isso pertence ao CORE da Ponte Digital ou é uma configuração vertical?

## Decisão

1. **Registrar o Motor Operacional como tese de fase (P79 = Mapeamento), não como regra congelada.** O documento `docs/02-PRODUCT/MOTOR_OPERACIONAL_TESE.md` assume status "tese em validação" — vira compromisso apenas quando a observação real da Souza Mestrinho der evidência (regra de campo do P79).
2. **Adotar a classificação obrigatória para toda capacidade nova:**
   - **Universal** (serve qualquer empresa sem segmento) → **CORE**: modelo de dados e lógica universal.
   - **Específico de segmento** (serralheria, lavação, barbearia…) → **Template/vertical**: dados de configuração e metadados, NUNCA módulo ou serviço dedicado.
   - **Particular de um cliente** (sem valor generalizável) → **configuração do tenant** ou **não implementar**.
3. **Universal-first com metadados flexíveis.** Objetos de vertical (Medidas, Fotos, Veículo, Diagnóstico) são representados como `Json` flexível nos modelos universais (padrão ADR-007), **sem migrations por vertical**. Uma vertical só ganha modelo próprio quando **2+ verticais distintas** pedirem o mesmo recurso (generalização por repetição).
4. **Reutilizar infrastructure existente — não duplicar.** O Event Engine usa o esqueleto já presente (`Event`/`EventSubscription`/`DeadLetter` no schema + ADR-011); o padrão de "etapas de um processo" já existe em `Implantacao`/`EtapaImplantacao` (onboarding) e em `Tarefa`/`Historico`. O novo motor nasce como **reuso + generalização**, nunca segunda instância.
5. **A evolução roda em fases com gates.** P79 (mapeamento, sem código) só libera P80 (workflow) após: (a) tese documentada e ADR aprovada; (b) pelo menos **uma observação/documentação de campo** na Souza Mestrinho registrada (kit P79) com descrições válidas.
6. **Migrations operacionais** (OS, Workflow/Etapa, Tipo de Trabalho, etc.) só acontecem quando o modelo for universal aprovado — cada uma exige o review de banco da V4 (P64/P65) e atualização de `ADMIN` listada (data de inicio/topologia) no próprio ADR/página do modelo.

## Alternativas consideradas

- **Criar módulos por vertical** (`serralheria-module.ts`, etc.) — rejeitada: Frankenstein de características, viola o princípio (§2 da tese).
- **Construir ERP genérico completo agora** — rejeitada: contradiz MVP e o congelamento do V4; vira "esperança" sem validação.
- **Desenvolvimento custom apenas para a Souza Mestrae / começar a construção imediata do workflow** — rejeitada em P79: o próprio roadmap pede mapear antes; permitiria código sem observação real.
- **Adiar a tese indefinidamente** — rejeitada: desperdiça o laboratório real (validação dentro da empresa) que é vantagem competitiva de produto.

## Consequências

- Positivo: a minha pergunta repetível ("CORE, vertical ou config?") vira a proteção permanente contra o "Frankenstein de funcionalidades".
- Positivo: o primeiro cliente real (Souza Mestra) entra pelo caminho "problema observado → hipótese → solução pequena → validação → generalização".
- Positivo: Event/Workflow/etc. nascem reutilizados — zero duplicação estrutural.
- Negativo: camada operacional exige novas migrações universais (OS/Workflow) — a maior intervenção no schema desde o início. Fica condicionada a gates de validação, não é automática.
- Negativo: tese operacional coexiste com o foco atual (conversa cognitiva P74–P78). Enquanto não houver implementação, a "carnada de operações" é **futuro/n-in-construção** — não pode entrar como requisito das sprints vigentes.

## Relação com decisões existentes

- **ADR-003:** permanece válida (Ecossistema público vs Plataforma Cognitiva). O Motor Operacional é de domínio **empresa** (Plataforma Cognitiva / Fundadores) — não altera o posicionamento público.
- **ADR-007 / ADR-020:** metadados `Json` flexíveis são o padrão base para "objetos e campos de vertical".
- **ADR-011 / ADR-012:** Event Engine operacional reutiliza o barramento formal (módulo do evento) e o catálogo.
- **EVOLUCAO_ESTRATEGICA_PLATAFORMA.md:** este ADR executa a linha de separação CORE vs DOMÍNIO já recomendada naquela revisão — o Motor Operacional é o primeiro músculo empresarial com abstração universal.