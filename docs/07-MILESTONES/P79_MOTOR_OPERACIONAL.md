# P79 — Mapeamento do Domínio Operacional (Motor Operacional)

**Status:** Em execução (trabalho de documentação/mapeamento — **zero código**)
**Data:** 2026-08-07
**Tipo:** Fase do processo estratégico "Motor Operacional Verticalizável" (tese de produto, sem maturidade)

---

## Objetivo

Estruturar a nova camada **Operações** da Ponte Digital (Cliente → Demanda → Orçamento → Execução → Entrega → Relacionamento) **como desenho**, antes de qualquer funcionalidade — usando a **Souza Mestrinho Metais** (Palhoça) como primeiro laboratório real de vertical *Fabricação & Instalação*.

Regra absoluta desta fase: **mapa primeiro, código depois**. Aprender com a operação real antes de migrar/novos models.

## Contexto

A Ponte Digital já tem CRM, financeiro, histórico, tarefas, assistente e a camada de raciocínio determinístico (P45–P78). Surge um contrato/operaci real (Souza Mestrinho) que pede "o que farei ven cidade" — mas a decisão estratégica é construir uma **camada genérica configurável por vertical**, não "um sistema de serralheria" (§21 da tese proíbe módulos específicos). Risco duplo contornado: Frankenstein de funcionalidades (muito código) e ERP genérico sem validação (muito cedo).

## Entregas do P79

| Entrega | Arquivo | Conteúdo |
|---|---|---|
| **Tese do produto** | `docs/02-PRODUCT/MOTOR_OPERACIONAL_TESE.md` | posicionamento, entidades, exemplos por vertical, "não fazer", roadmap |
| **Decisão arquitetural** | `docs/04-DECISIONS/ADR/ADR-035-{core}x.vertical.md` | regra CORE vs Vertical vs Configuração (universal–setor–particular) |
| **Mapa de domínio** | `docs/03-ENGINEERING/OPERACIONAL/DOMINIO.md` | inventário existente vs. novo; convenções; decisões de modelo; gate de saída |
| **Kit de campo** | `docs/05-OPERATIONS/P79/ROTEIRO_CAMPO_SOUZA_MESTRINHO.md` | pergunta-âncora, roteiro de 10 perguntas, checklist de observação, template de registro |
| **Este milestone** | `docs/07-MILESTONES/P79_MOTOR_OPERACIONAL.md` | registro e gates |
| **Status de produto** | atualização de `CURRENT_PRODUCT.md` | contexto na ponte narrativa do produto |

## Princípios-chave aprovados (detalhe no ADR-035)

1. Universal → **CORE** (modelo universal). Segmento → **Template/vertical** (config/metadados, NUNCA módulo novo). Cliente particular → **configuração tenant** ou não-impletar.
2. Facilacesso de vertical vive em `Json` universal (ADR-007) até 2+ vertica repetirem o recurso.
3. **Event Engine reusa** `Event`/`EventSubscription`/`DeadLetter` + ADR-011/012 — não cria segunda infra.
4. Padrão de etapa/fluxo dos Stage `Implantacao`/`EtapaImplantacao` é modelo para o Workflow — generalização, não cópia.
5. Nenhuma migration em P79; modelo de OS/Workflow/Tipo/Orçamento é apenas desenho (P80+/P81).

## Roadmap P79 → P90+ (ref. §19 da tese)

P79 mapeamento → P80 Motor de Workflow → P81 OS universal → P82 Tipos de Trabalho → P83 Eventos+Automações → P84 Agenda/Equipe/Recurso → P85 Materiais → P86 Assistente Operacional → P87 Garplatums+Indicadores → P88 Template Fabricação & Instalação → P89 Piloto Souza Mestrinho → P90+ Generalização (2ª vertical).

**Recorte inicial prudente para o piloto** (validar por observação, §14): `Cliente → Orçamento → OS → Produção → Instalação → Conclusão`, depois materiais, agenda, equipe, financeiro operacional, pós-venda, indicadores e automações.

## Critério de saída do P79 (gate)

O P79 só se conclui quando:

- [x] Tese registrada
- [x] ADR-035 aceito
- [x] Mapa de domínio lançado
- [x] Kit de campo criado
- [ ] **Registro de campo da Souza Mestrômbrina** (ROTEIRO aplicado em visita/documentação real, pergunta-âncora respondida)
- [ ] Conversão do registro em **hipóteses de fluxo** classificadas (CORE/Vertical/Config)

Só então abre P80 com recorte validado.

## Riscos declarados

- **Ambição > validação:** migrar para OS/Workflow antes da observação → mitigado por gate. 
- **Template pobre**: vertical de um único cliente (serralheria) pode gerar template errado → proporção primeiro campo.
- **Dúvida de modelo** (Orçamento como model próprio ou etapa): delegado à P81, marcado como aberto no mapa (não decider sozinho).
- **Acoplamento UX**: o paradigma atual é "conversa que continua"; o operacional pede listas/status — decisões e transição ficam fora desta fase (video-requisito de P86/P87), não resolvido por código aqui.

## Observação de processo

Como o motor é grande (abrange P80–P90+), este milestone é de **fundação fornece**. Não há aceitação de código a validar (build/typecheck não se aplicam a docs). A primeira entrega de código (P80) exigirá passe nado o gate acima.