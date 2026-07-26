
[+] Added Schemas
  - public

[+] Added enums
  - Plano
  - Role
  - OrigemLead
  - EstagioLead
  - Temperatura
  - StatusCliente
  - StatusImplantacao
  - StatusTarefa
  - Prioridade
  - TipoTarefa
  - TipoHistorico
  - TipoTransacao
  - StatusTransacao
  - CategoriaEvidencia
  - OrigemEvidencia
  - ConfiancaEvidencia
  - EstadoHipotese
  - StatusAcao
  - OrigemAcao
  - TipoEventoAtivacao
  - CategoriaOutcome
  - OrigemOutcome
  - TipoFeedbackAcao
  - EventStatus

[+] Added tables
  - empresas
  - usuarios
  - leads
  - clientes
  - contatos
  - implantacoes
  - etapas_implantacao
  - tarefas
  - historicos
  - transacoes
  - configuracoes_empresa
  - historico_sinais
  - evidencias
  - hipoteses
  - memoria_cognitiva
  - acoes_cognitivas
  - eventos_ativacao
  - outcomes
  - conhecimentos_validados
  - feedback_acoes
  - conversas
  - identidade_digital
  - conversas_historico
  - aprendizados
  - anotacoes
  - tags
  - onboarding_decisoes
  - eventos
  - event_subscriptions
  - dead_letters
  - decisoes_sinais

[*] Changed the `acoes_cognitivas` table
  [+] Added index on columns (empresaId, status)
  [+] Added index on columns (empresaId, categoria)
  [+] Added index on columns (empresaId, criadaEm)
  [+] Added index on columns (empresaId, deletedAt)
  [+] Added foreign key on columns (empresaId)

[*] Changed the `anotacoes` table
  [+] Added index on columns (empresaId, entidadeTipo, entidadeId)
  [+] Added index on columns (empresaId, criadoEm)
  [+] Added index on columns (empresaId, deletedAt)
  [+] Added index on columns (criadoPorId)
  [+] Added foreign key on columns (empresaId)
  [+] Added foreign key on columns (criadoPorId)

[*] Changed the `aprendizados` table
  [+] Added index on columns (empresaId, categoria)
  [+] Added index on columns (empresaId, ativo)
  [+] Added index on columns (empresaId, criadoEm)
  [+] Added index on columns (empresaId, deletedAt)
  [+] Added foreign key on columns (empresaId)

[*] Changed the `clientes` table
  [+] Added unique index on columns (leadId)
  [+] Added index on columns (empresaId, status)
  [+] Added index on columns (empresaId, segmento)
  [+] Added index on columns (empresaId, criadoEm)
  [+] Added index on columns (empresaId, deletedAt)
  [+] Added foreign key on columns (empresaId)
  [+] Added foreign key on columns (leadId)

[*] Changed the `configuracoes_empresa` table
  [+] Added unique index on columns (empresaId)
  [+] Added index on columns (empresaId, deletedAt)
  [+] Added foreign key on columns (empresaId)

[*] Changed the `conhecimentos_validados` table
  [+] Added index on columns (empresaId, categoria)
  [+] Added index on columns (empresaId, scoreConfianca)
  [+] Added index on columns (empresaId, criadoEm)
  [+] Added index on columns (empresaId, ultimaAuditoria)
  [+] Added index on columns (empresaId, deletedAt)
  [+] Added foreign key on columns (empresaId)

[*] Changed the `contatos` table
  [+] Added index on columns (empresaId)
  [+] Added index on columns (empresaId, clienteId)
  [+] Added index on columns (empresaId, deletedAt)
  [+] Added index on columns (clienteId)
  [+] Added index on columns (clienteId, principal)
  [+] Added foreign key on columns (empresaId)
  [+] Added foreign key on columns (clienteId)

[*] Changed the `conversas` table
  [+] Added index on columns (token)
  [+] Added index on columns (token, concluida)
  [+] Added index on columns (empresaId)
  [+] Added index on columns (empresaId, criadaEm)
  [+] Added index on columns (empresaId, deletedAt)
  [+] Added foreign key on columns (empresaId)

[*] Changed the `conversas_historico` table
  [+] Added index on columns (empresaId, ano, mes)
  [+] Added index on columns (empresaId, deletedAt)
  [+] Added foreign key on columns (empresaId)

[*] Changed the `dead_letters` table
  [+] Added index on columns (tenantId, eventType)
  [+] Added index on columns (criadoEm)
  [+] Added index on columns (tenantId, deletedAt)
  [+] Added foreign key on columns (tenantId)

[*] Changed the `decisoes_sinais` table
  [+] Added index on columns (empresaId)
  [+] Added index on columns (empresaId, decisaoId)
  [+] Added index on columns (empresaId, sinalId)
  [+] Added index on columns (empresaId, deletedAt)
  [+] Added index on columns (decisaoId)
  [+] Added index on columns (sinalId)
  [+] Added unique index on columns (decisaoId, sinalId, tipoRelacao)
  [+] Added foreign key on columns (empresaId)
  [+] Added foreign key on columns (decisaoId)
  [+] Added foreign key on columns (sinalId)

[*] Changed the `empresas` table
  [+] Added unique index on columns (slug)
  [+] Added index on columns (ativa)
  [+] Added index on columns (criadaEm)
  [+] Added index on columns (deletedAt)

[*] Changed the `etapas_implantacao` table
  [+] Added index on columns (empresaId)
  [+] Added index on columns (empresaId, implantacaoId)
  [+] Added index on columns (empresaId, deletedAt)
  [+] Added index on columns (implantacaoId)
  [+] Added index on columns (implantacaoId, concluida)
  [+] Added index on columns (implantacaoId, ordem)
  [+] Added foreign key on columns (empresaId)
  [+] Added foreign key on columns (implantacaoId)

[*] Changed the `event_subscriptions` table
  [+] Added index on columns (eventType, ativo)
  [+] Added index on columns (empresaId, deletedAt)
  [+] Added unique index on columns (eventType, handlerId)
  [+] Added foreign key on columns (empresaId)

[*] Changed the `eventos` table
  [+] Added index on columns (tenantId, eventType, occurredAt)
  [+] Added index on columns (tenantId, status)
  [+] Added index on columns (tenantId, deletedAt)
  [+] Added index on columns (correlationId)
  [+] Added index on columns (eventType, occurredAt)
  [+] Added foreign key on columns (tenantId)

[*] Changed the `eventos_ativacao` table
  [+] Added index on columns (empresaId, criadoEm)
  [+] Added index on columns (empresaId, deletedAt)
  [+] Added unique index on columns (empresaId, tipo)
  [+] Added foreign key on columns (empresaId)

[*] Changed the `evidencias` table
  [+] Added index on columns (empresaId, categoria, criadaEm)
  [+] Added index on columns (empresaId, criadaEm)
  [+] Added index on columns (empresaId, origem)
  [+] Added index on columns (empresaId, deletedAt)
  [+] Added foreign key on columns (empresaId)

[*] Changed the `feedback_acoes` table
  [+] Added index on columns (empresaId, criadoEm)
  [+] Added index on columns (empresaId, tipo)
  [+] Added index on columns (empresaId, deletedAt)
  [+] Added index on columns (acaoId)
  [+] Added foreign key on columns (empresaId)
  [+] Added foreign key on columns (acaoId)

[*] Changed the `hipoteses` table
  [+] Added index on columns (empresaId, estado)
  [+] Added index on columns (empresaId, categoria)
  [+] Added index on columns (empresaId, atualizadaEm)
  [+] Added index on columns (empresaId, deletedAt)
  [+] Added foreign key on columns (empresaId)

[*] Changed the `historico_sinais` table
  [+] Added index on columns (empresaId, sinalId, criadoEm)
  [+] Added index on columns (empresaId, motorOrigem)
  [+] Added index on columns (empresaId, deletedAt)
  [+] Added foreign key on columns (empresaId)

[*] Changed the `historicos` table
  [+] Added index on columns (empresaId, criadoEm)
  [+] Added index on columns (empresaId, tipo)
  [+] Added index on columns (empresaId, deletedAt)
  [+] Added index on columns (clienteId)
  [+] Added index on columns (leadId)
  [+] Added foreign key on columns (empresaId)
  [+] Added foreign key on columns (usuarioId)
  [+] Added foreign key on columns (clienteId)
  [+] Added foreign key on columns (leadId)
  [+] Added foreign key on columns (implantacaoId)

[*] Changed the `identidade_digital` table
  [+] Added unique index on columns (empresaId)
  [+] Added index on columns (empresaId)
  [+] Added index on columns (empresaId, deletedAt)
  [+] Added foreign key on columns (empresaId)

[*] Changed the `implantacoes` table
  [+] Added index on columns (empresaId, status)
  [+] Added index on columns (empresaId, dataPrevisao)
  [+] Added index on columns (empresaId, deletedAt)
  [+] Added index on columns (clienteId)
  [+] Added foreign key on columns (empresaId)
  [+] Added foreign key on columns (clienteId)

[*] Changed the `leads` table
  [+] Added index on columns (empresaId, estagio)
  [+] Added index on columns (empresaId, temperatura)
  [+] Added index on columns (empresaId, criadoEm)
  [+] Added index on columns (empresaId, deletedAt)
  [+] Added index on columns (responsavelId)
  [+] Added foreign key on columns (empresaId)
  [+] Added foreign key on columns (responsavelId)

[*] Changed the `memoria_cognitiva` table
  [+] Added index on columns (empresaId, criadaEm)
  [+] Added index on columns (empresaId, versao)
  [+] Added index on columns (empresaId, tipo)
  [+] Added index on columns (empresaId, deletedAt)
  [+] Added foreign key on columns (empresaId)

[*] Changed the `onboarding_decisoes` table
  [+] Added index on columns (empresaId, criadoEm)
  [+] Added index on columns (empresaId, deletedAt)
  [+] Added index on columns (implantacaoId)
  [+] Added index on columns (responsavelId)
  [+] Added foreign key on columns (empresaId)
  [+] Added foreign key on columns (implantacaoId)
  [+] Added foreign key on columns (responsavelId)

[*] Changed the `outcomes` table
  [+] Added index on columns (empresaId, categoria)
  [+] Added index on columns (empresaId, criadoEm)
  [+] Added index on columns (empresaId, deletedAt)
  [+] Added foreign key on columns (empresaId)

[*] Changed the `tags` table
  [+] Added index on columns (empresaId)
  [+] Added index on columns (empresaId, criadoEm)
  [+] Added index on columns (empresaId, deletedAt)
  [+] Added unique index on columns (empresaId, nome)
  [+] Added foreign key on columns (empresaId)

[*] Changed the `tarefas` table
  [+] Added index on columns (empresaId, status)
  [+] Added index on columns (empresaId, dataVencimento)
  [+] Added index on columns (empresaId, prioridade)
  [+] Added index on columns (empresaId, tipo)
  [+] Added index on columns (empresaId, deletedAt)
  [+] Added index on columns (responsavelId)
  [+] Added index on columns (clienteId)
  [+] Added foreign key on columns (empresaId)
  [+] Added foreign key on columns (criadorId)
  [+] Added foreign key on columns (responsavelId)
  [+] Added foreign key on columns (clienteId)
  [+] Added foreign key on columns (leadId)

[*] Changed the `transacoes` table
  [+] Added index on columns (empresaId, status, dataVencimento)
  [+] Added index on columns (empresaId, tipo)
  [+] Added index on columns (empresaId, dataPagamento)
  [+] Added index on columns (empresaId, categoria)
  [+] Added index on columns (empresaId, deletedAt)
  [+] Added index on columns (clienteId)
  [+] Added foreign key on columns (empresaId)
  [+] Added foreign key on columns (clienteId)

[*] Changed the `usuarios` table
  [+] Added unique index on columns (supabaseId)
  [+] Added index on columns (empresaId)
  [+] Added index on columns (empresaId, deletedAt)
  [+] Added foreign key on columns (empresaId)
