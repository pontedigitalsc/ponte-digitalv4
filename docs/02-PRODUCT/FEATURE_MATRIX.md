# Matriz de Funcionalidades — Stable Release V3

*Atualizada em 30/07/2026 — Programa 46 concluído.*

| Funcionalidade | Status | Observação |
|---|---|---|
| Diagnóstico Inteligente / Conversa Contínua (`/conversa`) | ✅ Ativo, relacional | Conversa em 5 Atos com memória viva, continuidade e carta evolutiva |
| Autenticação multiempresa | ✅ Ativo, funcional | Login, criar-conta, reset de senha, papéis (ADMIN/GESTOR/MEMBRO) |
| Página Única de Atendimento (`/atendimento`) | ✅ Ativo, funcional | Busca + reconhecimento + confirmação em ≤5s |
| Check-in Emocional (`/dashboard`) | ✅ Novo, relacional | "Como sua empresa está hoje?" com 5 estados emocionais |
| Timeline Viva (`/historico`) | ✅ Ativo, funcional | Memória unificada da empresa |
| Assistente IA (`/assistente`) | ✅ Ativo, funcional | Chat contextual com Google Gemini |
| Centro de Decisão (`/centro-decisao`) | ✅ Ativo, funcional | Decisões recomendadas com priorização |
| Knowledge Vault (`/conhecimento`) | ✅ Ativo, funcional | Biblioteca de conhecimento validado |
| Aprendizados (`/aprendizados`) | ✅ Ativo, funcional | Aprendizado ativo via perguntas rápidas |
| CRM (pipeline Lead → Cliente) | ✅ Ativo, legado oculto | Mantido, não expandir |
| Financeiro (receita/despesa) | ✅ Ativo, legado oculto | Mantido, não expandir |
| Tarefas | ✅ Ativo, legado oculto | Mantido, não expandir |
| Implantação / Onboarding | ✅ Ativo, legado oculto | Mantido, não expandir |
| Multiempresa / papéis / configurações | ✅ Ativo, funcional | Isolamento por tenant + hierarquia |
| Camada de sinal (`HistoricoSinal`) | ✅ Ativo, funcional | Conecta operação à cognição |
| Carta Evolutiva (`/conversa` → revelacao-card) | ✅ Novo, relacional | Admiração + descoberta + ação única + observação futura |
| Minha Jornada (`/minha-jornada`) | ✅ Novo, relacional | 7 capítulos narrativos da história da empresa |
| Memória Viva (GET /api/conversa) | ✅ Novo, relacional | Contexto emocional entre conversas |
| Founder como Pertencimento | ✅ Novo, relacional | Linguagem não-comercial, comunidade, construção coletiva |
| Sidebar "Sua empresa" | ✅ Novo, relacional | Conversar, Check-in, Jornada como grupo primário |
| Header sem ruído | ✅ Novo, relacional | Search e sinos removidos |
| Diário Científico (`/admin/diario-cientifico`) | ✅ Novo, funcional | Registro de observações, evidências, hipóteses |
| Radar dos Founders (`/admin/radar-founders`) | ✅ Novo, funcional | Métricas por empresa ativa |
| Cognitive Observatory (`/admin/cognitive-observatory`) | ✅ Ativo, funcional | Painel cognitivo avançado |
| Diário do Founder (`/admin/diario-founder`) | ✅ Ativo, funcional | Registro do Founder |
| **Agenda como capacidade** | ❌ Não iniciado | Próximo programa |
| Motor Cognitivo completo | 🧊 Congelado | Ver `MVP_SCOPE.md` |
| Motor 4 (Conversação Contínua) | ✅ Substituído pela Relação Contínua P46 | Memória viva + carta evolutiva substituem engine formal |
| Modelo Cognitivo do Empresário | 🧊 Congelado | Ver `MVP_SCOPE.md` |
| KnowledgeRegistry / Patrimônios de Conhecimento | 🧊 Congelado | Ver `MVP_SCOPE.md` |
| Patrimônio Empresarial (5 dimensões + visualizações) | 🧊 Congelado | Ver `MVP_SCOPE.md` |
| Catálogo formal de `DomainEvent` | 🧊 Congelado | `HistoricoSinal` aceito por ora |
| Camada `server/actions/services/repositories` | 🧊 Congelado | API Routes + services aceito por ora |

## Legenda

- **✅ Ativo, funcional** — em produção, testado, operacional
- **✅ Novo, funcional** — adicionado no P40, funcional
- **✅ Ativo, legado oculto** — existe mas não está no sidebar principal (não expandir)
- **❌ Não iniciado** — planejado, não implementado
- **🧊 Congelado** — adiado para versão futura
