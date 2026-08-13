# PENDENCIAS_PRIORIZADAS — Backlog P0→P4 (P94)

> Derivado de `AUDITORIA_INTEGRAL_PONTE.md`. Ordem de execução: P0 → P1 → P2 → P3 → P4.
> Nada de P4 enquanto existir P0/P1 aberto.
> **Regra:** cada item traz *onde está*, *por que*, *risco*, *impacto* e *o que precisa acontecer*.

---

## P0 — Quebra funcional / segurança / dados

| # | Item | Onde | Risco | O que precisa acontecer |
|---|---|---|---|---|
| P0-1 | **Navegação inviável no celular** | `components/layout/app-shell.tsx`, `sidebar.tsx` (sidebar fixa `w-60`/`w-16`, sem drawer) | Perda de uso real; produto inutilizável em 320–430px onde o empresário trabalha | Drawer/overlay mobile com toggle no header; manter sidebar no desktop |
| P0-2 | **`LIMITE_IA_DIARIO` definido e ignorado** | `lib/planos.ts:22` (BASICO 0 / PROF 50 / ENTERPRISE 500); nenhuma rota verifica | Custo de IA sem teto; plano básico ganha IA de graça | Verificar o limite no `api/assistente/route.ts` (e demais usos de IA) antes de chamar o provider |
| P0-3 | **Tenant wrapper desconectado** | `src/lib/prisma-tenant-safe.ts` — existe, 0 services usam | Risco de multi-tenancy depende de disciplina manual | (Avaliar com segurança — pode ser decisão de manter disciplinado; registrar em KNOWN_ISSUES) |
| P0-4 | **RLS incompleta** | `prisma/rls-policies.sql` — faltam policies | Exposição entre tenants em consultas fora do padrão | Completar policies; validar com o banco |
| P0-5 | **Notificação aponta para rota morta** | `engine/cognitive-notification-engine.ts:124` → `/historico` (redireciona) | Usuário clica e cai em tela que some | Apontar para `/minha-jornada` |
| P0-6 | **Sitemap desatualizado** | `src/app/sitemap.ts` — só 3 URLs de ~30 | SEO/inventário público errado | Regenerar com as rotas públicas reais |

## P1 — Fluxos essenciais incompletos

| # | Item | Onde | Risco | O que precisa acontecer |
|---|---|---|---|---|
| P1-1 | **Dashboard descarta o estado da empresa** | `(dashboard)/dashboard/page.tsx:73-99` — `centroDiario` e `revisao` construídos e **nunca renderizados** | O dado mais valioso (sinais, ação sugerida, revisão) é jogado fora; dashboard parece "meditação" | Renderizar `centroDiario` + `revisao` — virar "A empresa agora" |
| P1-2 | **Sinais operacionais efêmeros** | `engine/cognitive-context-engine.ts:314-322` — `buscarSituacaoEmpresa`; `HistoricoSinal` vazio | "O que está acontecendo" não persiste; nada acumula | Gravar sinais reais em `HistoricoSinal` (fontes: tarefa, transação, lead, atendimento, conversa, decisão) |
| P1-3 | **`/crm`, `/tarefas`, `/implantacoes` sem link no sidebar** | `components/layout/sidebar.tsx` (MODULO_MAP sem essas rotas) + `cognitive-experience-engine.ts:2076` (`obterModulosLiberados`) | 40% do produto invisível; desalinhamento liberação × exibição | Adicionar itens ao sidebar respeitando `obterModulosLiberados`; alinhar MODULO_MAP |
| P1-4 | **Botões mortos no perfil do cliente** | `clientes/cliente-perfil.tsx:239-241, 289-291, 434-436` ("Nova tarefa", "Anotar contato", "Nova cobrança" sem `onClick`) | Hub de ação promete e não executa | Implementar modais de ação (reusar tarefa-modal, anotacao, transacao-modal) |
| P1-5 | **`ComoEstaHoje` descarta o input** | `dashboard/como-esta-hoje.tsx` — texto não é salvo; botão só navega | Perde check-in do usuário | Persistir o check-in (ex.: gravar em `HistoricoSinal`/anotação ou memória) |
| P1-6 | **Copiloto sem UI** | `engine/copiloto-operacional.ts` — sem consumidor em produção | Motor pronto (Nv 0–4, visão do gerente, carga, atrito, perguntas) desperdiçado | Ligar ao detalhe da descoberta (`admin/descoberta/[id]`) como bloco "Visão do gerente" + nível |

## P2 — Integração e experiência de ponta a ponta

| # | Item | Onde | O que precisa acontecer |
|---|---|---|---|
| P2-1 | **`/diagnostico` protótipo mock público** | `src/app/diagnostico/page.tsx` — 100% estático, sem backend, proxy libera | Decidir: remover da navegação pública ou dar backend real. Não pode ficar "fantasma" |
| P2-2 | **16 endpoints REST órfãos** | cluster cognitivo, `relacao`, `sessao`, `historicos`, `patrimonio`, POST descoberta, PATCH/DELETE implantacoes | Revisar: reutilizar ou remover (alguns têm valor p/ frente própria) |
| P2-3 | **Conversa/Assistente não geram ação** | `conversa/finalizar`, `api/assistente` — informam mas não executam | Permitir ação executável ("quer que eu deixe uma tarefa?") — determinístico, sem IA mandatória |
| P2-4 | **Fluxo visual Cliente→Implantação→Caixa ausente** | dados existem; nenhuma linha visual | Criar "mapa de vida do cliente" no perfil (contato→proposta→fechado→implantação→receita) |
| P2-5 | **Landing: evolução visual/narrativa** | `components/marketing/*`, `page.tsx` | Evoluir sem recomeçar (seção 12–24 do briefing) |
| P2-6 | **Assistente sem histórico persistido** | `components/assistente/chat.tsx` — mensagens só em `useState` | Avaliar persistência mínima (design atual = sem histórico) |

## P3 — Melhorias estruturais

| # | Item | Onde | O que precisa acontecer |
|---|---|---|---|
| P3-1 | **`normalizarTexto` duplicado (≥8×)** | `conselheiro-engine:83`, `relacao-engine:92`, `memoria-evolutiva:60`, `conversation-engine:46`, `reacoes:153`, `pergunta-aberta-service:20`, `brainstorm:134`, `heatmap:126` | Extrair utilitário único em `lib` |
| P3-2 | **3 caminhos de escrita de evidência** | `atendimento.service:112`, `feedback-intelligence-engine:45`, `decision-engine:357` | Unificar serviço de registro de evidência |
| P3-3 | **`clareza-engine` vs `clarity-engine`** | 2 engines com nomes quase idênticos | Renomear/esclarecer responsabilidades; documentar |
| P3-4 | **Cards/estados vazios duplicados** | narrativa/insight/action/workflow/journey; `estado-vazio` + 6 cópias | Consolidar em sistema único de card |
| P3-5 | **Órfãos de engine** | `p40/transformation-index`, `retry-policy`, `gerarSinais` compositor, exports orquestrador sem rota | Remover ou dar consumidor |

## P4 — Polimento

| # | Item | Onde |
|---|---|---|
| P4-1 | Banco de marca da landing / `(auth)` estáticos | refinar |
| P4-2 | Estados vazios restantes nas telas de CRUD | padronizar |
| P4-3 | Animações de conexão na landing (respeitar `prefers-reduced-motion`) | refinar |

---

## Itens de "decisão necessária do produto" (não inventar)

| Lacuna | Decisão pendente |
|---|---|
| Benefícios comerciais do Founder (descontos/garantias/exclusividade) | definir com o fundador antes de exibir |
| O que o "Pioneiro do Ramo" ganha de concreto | definir após campo real |
| Destino do `/diagnostico` (remover × dar backend) | decidir nesta rodada |
| `LIMITE_IA_DIARIO` por plano — valores | confirmar valores por plano |
