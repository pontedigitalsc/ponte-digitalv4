-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "Plano" AS ENUM ('BASICO', 'PROFISSIONAL', 'ENTERPRISE');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'GESTOR', 'MEMBRO');

-- CreateEnum
CREATE TYPE "OrigemLead" AS ENUM ('INDICACAO', 'SITE', 'INSTAGRAM', 'FACEBOOK', 'GOOGLE', 'WHATSAPP', 'COLD_OUTREACH', 'EVENTO', 'OUTRO');

-- CreateEnum
CREATE TYPE "EstagioLead" AS ENUM ('CONTATO', 'DIAGNOSTICO', 'PROPOSTA', 'NEGOCIACAO', 'FECHADO_GANHO', 'FECHADO_PERDIDO');

-- CreateEnum
CREATE TYPE "Temperatura" AS ENUM ('QUENTE', 'MORNO', 'FRIO');

-- CreateEnum
CREATE TYPE "StatusCliente" AS ENUM ('ATIVO', 'INATIVO', 'INADIMPLENTE', 'CANCELADO', 'TRIAL');

-- CreateEnum
CREATE TYPE "StatusImplantacao" AS ENUM ('PENDENTE', 'EM_ANDAMENTO', 'AGUARDANDO_CLIENTE', 'CONCLUIDA', 'CANCELADA');

-- CreateEnum
CREATE TYPE "StatusTarefa" AS ENUM ('PENDENTE', 'EM_ANDAMENTO', 'CONCLUIDA', 'CANCELADA');

-- CreateEnum
CREATE TYPE "Prioridade" AS ENUM ('URGENTE', 'ALTA', 'MEDIA', 'BAIXA');

-- CreateEnum
CREATE TYPE "TipoTarefa" AS ENUM ('TAREFA', 'LIGACAO', 'EMAIL', 'REUNIAO', 'FOLLOW_UP', 'VISITA');

-- CreateEnum
CREATE TYPE "TipoHistorico" AS ENUM ('NOTA', 'LIGACAO', 'EMAIL', 'REUNIAO', 'WHATSAPP', 'PROPOSTA', 'CONTRATO', 'SISTEMA');

-- CreateEnum
CREATE TYPE "TipoTransacao" AS ENUM ('RECEITA', 'DESPESA');

-- CreateEnum
CREATE TYPE "StatusTransacao" AS ENUM ('PENDENTE', 'PAGO', 'VENCIDO', 'CANCELADO');

-- CreateEnum
CREATE TYPE "CategoriaEvidencia" AS ENUM ('FINANCEIRO', 'CLIENTES', 'OPERACAO', 'GESTAO', 'PESSOAS', 'PRODUTO', 'ESTRATEGIA');

-- CreateEnum
CREATE TYPE "OrigemEvidencia" AS ENUM ('PRIMEIRA_CONVERSA', 'CONVERSA_MENSAL', 'MODULO_CLIENTES', 'MODULO_FINANCEIRO', 'MODULO_TAREFAS', 'MODULO_CRM', 'MODULO_IMPLANTACAO', 'ASSISTENTE', 'SISTEMA', 'ACAO_USUARIO');

-- CreateEnum
CREATE TYPE "ConfiancaEvidencia" AS ENUM ('ALTA', 'MEDIA', 'BAIXA');

-- CreateEnum
CREATE TYPE "EstadoHipotese" AS ENUM ('NOVA', 'EM_OBSERVACAO', 'FORTALECIDA', 'CONFIRMADA', 'ENFRAQUECIDA', 'DESCARTADA');

-- CreateEnum
CREATE TYPE "ImpactoHipotese" AS ENUM ('BAIXO', 'MEDIO', 'ALTO');

-- CreateEnum
CREATE TYPE "OrigemHipotese" AS ENUM ('ANALISE_EVIDENCIAS', 'PRIMEIRA_CONVERSA', 'ASSISTENTE_IA', 'SISTEMA', 'MANUAL');

-- CreateEnum
CREATE TYPE "StatusAcao" AS ENUM ('PENDENTE', 'EM_ANDAMENTO', 'CONCLUIDA', 'ABANDONADA');

-- CreateEnum
CREATE TYPE "OrigemAcao" AS ENUM ('DECISION_ENGINE', 'ASSISTENTE', 'USUARIO');

-- CreateEnum
CREATE TYPE "TipoEventoAtivacao" AS ENUM ('DIAGNOSTICO_COMPLETO', 'IDENTIDADE_CRIADA', 'PRIMEIRA_DECISAO_VISTA', 'PRIMEIRA_ACAO_CRIADA', 'PRIMEIRA_ACAO_CONCLUIDA', 'PRIMEIRO_FEEDBACK', 'PRIMEIRO_RETORNO', 'CONVERSA_MENSAL_REALIZADA');

-- CreateEnum
CREATE TYPE "CategoriaOutcome" AS ENUM ('FINANCEIRO', 'ORGANIZACAO', 'OPERACAO', 'CLIENTES', 'PRODUTIVIDADE', 'PREVISIBILIDADE', 'BEM_ESTAR', 'ESTRATEGIA');

-- CreateEnum
CREATE TYPE "OrigemOutcome" AS ENUM ('ACAO', 'FEEDBACK', 'CONVERSA', 'SISTEMA');

-- CreateEnum
CREATE TYPE "TipoFeedbackAcao" AS ENUM ('AJUDOU', 'AJUDOU_PARCIALMENTE', 'NAO_AJUDOU', 'NAO_EXECUTADA');

-- CreateEnum
CREATE TYPE "EventStatus" AS ENUM ('PENDENTE', 'PROCESSADO', 'FALHA');

-- CreateEnum
CREATE TYPE "FrequenciaCiclo" AS ENUM ('DIARIA', 'SEMANAL', 'MENSAL');

-- CreateEnum
CREATE TYPE "OrigemResposta" AS ENUM ('PRIMEIRA_CONVERSA', 'ASSISTENTE_IA', 'FORMULARIO', 'MANUAL');

-- CreateTable
CREATE TABLE "empresas" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "logo" TEXT,
    "plano" "Plano" NOT NULL DEFAULT 'BASICO',
    "ativa" BOOLEAN NOT NULL DEFAULT true,
    "criadaEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadaEm" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "empresas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "usuarios" (
    "id" TEXT NOT NULL,
    "empresaId" TEXT NOT NULL,
    "supabaseId" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "avatar" TEXT,
    "cargo" TEXT,
    "role" "Role" NOT NULL DEFAULT 'MEMBRO',
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "leads" (
    "id" TEXT NOT NULL,
    "empresaId" TEXT NOT NULL,
    "responsavelId" TEXT,
    "nome" TEXT NOT NULL,
    "email" TEXT,
    "telefone" TEXT,
    "empresa" TEXT,
    "cargo" TEXT,
    "origem" "OrigemLead" NOT NULL DEFAULT 'INDICACAO',
    "estagio" "EstagioLead" NOT NULL DEFAULT 'CONTATO',
    "temperatura" "Temperatura" NOT NULL DEFAULT 'MORNO',
    "valor" DECIMAL(10,2),
    "observacoes" TEXT,
    "perdidoMotivo" TEXT,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,
    "contatoEm" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "leads_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "clientes" (
    "id" TEXT NOT NULL,
    "empresaId" TEXT NOT NULL,
    "leadId" TEXT,
    "nome" TEXT NOT NULL,
    "email" TEXT,
    "telefone" TEXT,
    "documento" TEXT,
    "segmento" TEXT,
    "site" TEXT,
    "endereco" TEXT,
    "cidade" TEXT,
    "estado" TEXT,
    "status" "StatusCliente" NOT NULL DEFAULT 'ATIVO',
    "observacoes" TEXT,
    "valorMensal" DECIMAL(10,2),
    "diaVencimento" INTEGER,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,
    "proximoContato" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "clientes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contatos" (
    "id" TEXT NOT NULL,
    "empresaId" TEXT NOT NULL,
    "clienteId" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "cargo" TEXT,
    "email" TEXT,
    "telefone" TEXT,
    "principal" BOOLEAN NOT NULL DEFAULT false,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "contatos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "implantacoes" (
    "id" TEXT NOT NULL,
    "empresaId" TEXT NOT NULL,
    "clienteId" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT,
    "status" "StatusImplantacao" NOT NULL DEFAULT 'PENDENTE',
    "dataInicio" TIMESTAMP(3),
    "dataPrevisao" TIMESTAMP(3),
    "dataConclusao" TIMESTAMP(3),
    "criadaEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadaEm" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "implantacoes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "etapas_implantacao" (
    "id" TEXT NOT NULL,
    "empresaId" TEXT NOT NULL,
    "implantacaoId" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT,
    "concluida" BOOLEAN NOT NULL DEFAULT false,
    "ordem" INTEGER NOT NULL,
    "concluidaEm" TIMESTAMP(3),
    "criadaEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadaEm" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "etapas_implantacao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tarefas" (
    "id" TEXT NOT NULL,
    "empresaId" TEXT NOT NULL,
    "criadorId" TEXT NOT NULL,
    "responsavelId" TEXT,
    "clienteId" TEXT,
    "leadId" TEXT,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT,
    "status" "StatusTarefa" NOT NULL DEFAULT 'PENDENTE',
    "prioridade" "Prioridade" NOT NULL DEFAULT 'MEDIA',
    "tipo" "TipoTarefa" NOT NULL DEFAULT 'TAREFA',
    "dataVencimento" TIMESTAMP(3),
    "concluidaEm" TIMESTAMP(3),
    "criadaEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadaEm" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "tarefas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "historicos" (
    "id" TEXT NOT NULL,
    "empresaId" TEXT NOT NULL,
    "usuarioId" TEXT,
    "clienteId" TEXT,
    "leadId" TEXT,
    "implantacaoId" TEXT,
    "tipo" "TipoHistorico" NOT NULL,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT,
    "metadata" JSONB,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "historicos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transacoes" (
    "id" TEXT NOT NULL,
    "empresaId" TEXT NOT NULL,
    "clienteId" TEXT,
    "tipo" "TipoTransacao" NOT NULL,
    "categoria" TEXT,
    "descricao" TEXT NOT NULL,
    "valor" DECIMAL(10,2) NOT NULL,
    "status" "StatusTransacao" NOT NULL DEFAULT 'PENDENTE',
    "dataVencimento" TIMESTAMP(3),
    "dataPagamento" TIMESTAMP(3),
    "recorrente" BOOLEAN NOT NULL DEFAULT false,
    "observacoes" TEXT,
    "criadaEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadaEm" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "transacoes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "configuracoes_empresa" (
    "id" TEXT NOT NULL,
    "empresaId" TEXT NOT NULL,
    "moeda" TEXT NOT NULL DEFAULT 'BRL',
    "fuso" TEXT NOT NULL DEFAULT 'America/Sao_Paulo',
    "corPrimaria" TEXT NOT NULL DEFAULT '#2563EB',
    "notificacoes" BOOLEAN NOT NULL DEFAULT true,
    "etapasImplantacao" JSONB,
    "atualizadaEm" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "configuracoes_empresa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "historico_sinais" (
    "id" TEXT NOT NULL,
    "empresaId" TEXT NOT NULL,
    "motorOrigem" TEXT NOT NULL DEFAULT 'camada-sinais',
    "sinalId" TEXT NOT NULL,
    "dominio" TEXT NOT NULL,
    "urgencia" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT,
    "dadosOriginais" JSONB,
    "metadata" JSONB,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "historico_sinais_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "evidencias" (
    "id" TEXT NOT NULL,
    "empresaId" TEXT NOT NULL,
    "categoria" "CategoriaEvidencia" NOT NULL,
    "origem" "OrigemEvidencia" NOT NULL,
    "descricao" TEXT NOT NULL,
    "confianca" "ConfiancaEvidencia" NOT NULL DEFAULT 'MEDIA',
    "dados" JSONB,
    "criadaEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadaEm" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "evidencias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "hipoteses" (
    "id" TEXT NOT NULL,
    "empresaId" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "categoria" "CategoriaEvidencia" NOT NULL,
    "estado" "EstadoHipotese" NOT NULL DEFAULT 'NOVA',
    "confianca" "ConfiancaEvidencia" NOT NULL DEFAULT 'MEDIA',
    "impacto" "ImpactoHipotese" NOT NULL DEFAULT 'MEDIO',
    "origem" "OrigemHipotese" NOT NULL DEFAULT 'ANALISE_EVIDENCIAS',
    "evidenciaOrigem" TEXT,
    "contagemEvidencias" INTEGER NOT NULL DEFAULT 0,
    "criadaEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadaEm" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "hipoteses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "memoria_cognitiva" (
    "id" TEXT NOT NULL,
    "empresaId" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "categoria" "CategoriaEvidencia" NOT NULL,
    "versao" INTEGER NOT NULL,
    "metadados" JSONB,
    "criadaEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "memoria_cognitiva_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "acoes_cognitivas" (
    "id" TEXT NOT NULL,
    "empresaId" TEXT NOT NULL,
    "decisaoId" TEXT,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "categoria" "CategoriaEvidencia" NOT NULL,
    "status" "StatusAcao" NOT NULL DEFAULT 'PENDENTE',
    "origem" "OrigemAcao" NOT NULL DEFAULT 'DECISION_ENGINE',
    "impactoEsperado" JSONB,
    "resultado" JSONB,
    "evidenciaGeradaId" TEXT,
    "criadaEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadaEm" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "acoes_cognitivas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "eventos_ativacao" (
    "id" TEXT NOT NULL,
    "empresaId" TEXT NOT NULL,
    "tipo" "TipoEventoAtivacao" NOT NULL,
    "dados" JSONB,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "eventos_ativacao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "outcomes" (
    "id" TEXT NOT NULL,
    "empresaId" TEXT NOT NULL,
    "categoria" "CategoriaOutcome" NOT NULL,
    "origem" "OrigemOutcome" NOT NULL,
    "descricao" TEXT NOT NULL,
    "detalhes" JSONB,
    "confianca" "ConfiancaEvidencia" NOT NULL DEFAULT 'MEDIA',
    "evidenciasIds" TEXT[],
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "outcomes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "conhecimentos_validados" (
    "id" TEXT NOT NULL,
    "empresaId" TEXT NOT NULL,
    "hipoteseId" TEXT,
    "descricao" TEXT NOT NULL,
    "categoria" "CategoriaEvidencia" NOT NULL,
    "scoreConfianca" INTEGER NOT NULL DEFAULT 0,
    "quantidadeEvidencias" INTEGER NOT NULL DEFAULT 0,
    "quantidadeConfirmacoes" INTEGER NOT NULL DEFAULT 0,
    "quantidadeRefutacoes" INTEGER NOT NULL DEFAULT 0,
    "ultimaValidacao" TIMESTAMP(3),
    "ultimaAuditoria" TIMESTAMP(3),
    "origem" TEXT NOT NULL,
    "dados" JSONB,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "conhecimentos_validados_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "feedback_acoes" (
    "id" TEXT NOT NULL,
    "empresaId" TEXT NOT NULL,
    "acaoId" TEXT NOT NULL,
    "tipo" "TipoFeedbackAcao" NOT NULL,
    "comentario" TEXT,
    "impactoPercebido" JSONB,
    "dados" JSONB,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "feedback_acoes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "conversas" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "fluxo" TEXT NOT NULL DEFAULT 'primeira-conversa',
    "etapa" TEXT,
    "respostas" JSONB NOT NULL DEFAULT '{}',
    "empresaId" TEXT,
    "concluida" BOOLEAN NOT NULL DEFAULT false,
    "criadaEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadaEm" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "conversas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "identidade_digital" (
    "id" TEXT NOT NULL,
    "empresaId" TEXT NOT NULL,
    "versao" INTEGER NOT NULL DEFAULT 1,
    "dados" JSONB,
    "interpretacoes" JSONB,
    "conhecimentos" JSONB,
    "crencas" JSONB,
    "lacunas" JSONB,
    "narrativaVersao" TEXT,
    "ultimaConversa" TIMESTAMP(3),
    "criadaEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadaEm" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "identidade_digital_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "conversas_historico" (
    "id" TEXT NOT NULL,
    "empresaId" TEXT NOT NULL,
    "identidadeId" TEXT,
    "mes" INTEGER NOT NULL,
    "ano" INTEGER NOT NULL,
    "respostas" JSONB NOT NULL,
    "interpretacoes" JSONB,
    "criadaEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "conversas_historico_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "aprendizados" (
    "id" TEXT NOT NULL,
    "empresaId" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "categoria" TEXT NOT NULL,
    "origem" TEXT NOT NULL,
    "contexto" TEXT,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "aprendizados_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "anotacoes" (
    "id" TEXT NOT NULL,
    "empresaId" TEXT NOT NULL,
    "criadoPorId" TEXT,
    "entidadeTipo" TEXT NOT NULL,
    "entidadeId" TEXT NOT NULL,
    "conteudo" TEXT NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "anotacoes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tags" (
    "id" TEXT NOT NULL,
    "empresaId" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "cor" TEXT NOT NULL DEFAULT '#3B82F6',
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "onboarding_decisoes" (
    "id" TEXT NOT NULL,
    "empresaId" TEXT NOT NULL,
    "implantacaoId" TEXT,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT,
    "decisao" TEXT NOT NULL,
    "tipo" TEXT NOT NULL DEFAULT 'ESCOLHA',
    "dataDecisao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "responsavelId" TEXT,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "onboarding_decisoes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "eventos" (
    "id" TEXT NOT NULL,
    "eventType" TEXT NOT NULL,
    "aggregateId" TEXT NOT NULL,
    "aggregateType" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "correlationId" TEXT NOT NULL,
    "causationId" TEXT,
    "version" INTEGER NOT NULL DEFAULT 1,
    "payload" JSONB NOT NULL,
    "metadata" JSONB,
    "status" "EventStatus" NOT NULL DEFAULT 'PENDENTE',
    "occurredAt" TIMESTAMP(3) NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "processadoEm" TIMESTAMP(3),
    "tentativas" INTEGER NOT NULL DEFAULT 0,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "eventos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "event_subscriptions" (
    "id" TEXT NOT NULL,
    "eventType" TEXT NOT NULL,
    "handlerId" TEXT NOT NULL,
    "empresaId" TEXT,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "event_subscriptions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "dead_letters" (
    "id" TEXT NOT NULL,
    "eventId" TEXT,
    "eventType" TEXT NOT NULL,
    "aggregateId" TEXT NOT NULL,
    "aggregateType" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "correlationId" TEXT NOT NULL,
    "handlerName" TEXT NOT NULL,
    "payload" JSONB NOT NULL,
    "errorName" TEXT NOT NULL,
    "errorMessage" TEXT NOT NULL,
    "error" TEXT NOT NULL,
    "stack" TEXT,
    "tentativas" INTEGER NOT NULL DEFAULT 0,
    "occurredAt" TIMESTAMP(3) NOT NULL,
    "failedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "dead_letters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ciclo_configuracoes" (
    "id" TEXT NOT NULL,
    "empresaId" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "frequencia" "FrequenciaCiclo" NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "ultimaExecucao" TIMESTAMP(3),
    "proximaExecucao" TIMESTAMP(3),
    "heartbeatEm" TIMESTAMP(3),
    "heartbeatOk" BOOLEAN NOT NULL DEFAULT true,
    "config" JSONB,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "ciclo_configuracoes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "confianca_fontes" (
    "id" TEXT NOT NULL,
    "empresaId" TEXT NOT NULL,
    "nomeFonte" TEXT NOT NULL,
    "scoreAtual" INTEGER NOT NULL DEFAULT 50,
    "totalAcertos" INTEGER NOT NULL DEFAULT 0,
    "totalErros" INTEGER NOT NULL DEFAULT 0,
    "ultimoAcertoEm" TIMESTAMP(3),
    "ultimoErroEm" TIMESTAMP(3),
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "confianca_fontes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "respostas_conversa" (
    "id" TEXT NOT NULL,
    "empresaId" TEXT NOT NULL,
    "token" TEXT,
    "perguntaId" TEXT NOT NULL,
    "pergunta" TEXT NOT NULL,
    "valor" TEXT NOT NULL,
    "bloco" TEXT,
    "origem" "OrigemResposta" NOT NULL DEFAULT 'PRIMEIRA_CONVERSA',
    "ordem" INTEGER NOT NULL DEFAULT 0,
    "criadaEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "respostas_conversa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "momentos_wow" (
    "id" TEXT NOT NULL,
    "empresaId" TEXT NOT NULL,
    "frase" TEXT NOT NULL,
    "contexto" TEXT,
    "categoria" TEXT,
    "intensidade" INTEGER NOT NULL DEFAULT 1,
    "origem" TEXT NOT NULL,
    "metadata" JSONB,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "momentos_wow_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fricoes" (
    "id" TEXT NOT NULL,
    "empresaId" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "contexto" TEXT NOT NULL,
    "duracaoSegundos" INTEGER,
    "cliquesExtras" INTEGER,
    "pagina" TEXT,
    "elemento" TEXT,
    "metadata" JSONB,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "fricoes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sinais_valor" (
    "id" TEXT NOT NULL,
    "empresaId" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "origem" TEXT NOT NULL,
    "peso" DOUBLE PRECISION NOT NULL DEFAULT 1.0,
    "metadata" JSONB,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "sinais_valor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "auditoria_recomendacoes" (
    "id" TEXT NOT NULL,
    "empresaId" TEXT NOT NULL,
    "recomendacaoId" TEXT,
    "tipo" TEXT NOT NULL,
    "resultado" TEXT,
    "justificativa" TEXT,
    "metadata" JSONB,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "auditoria_recomendacoes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "plataforma_snapshots" (
    "id" TEXT NOT NULL,
    "hipotesesValidadas" INTEGER NOT NULL DEFAULT 0,
    "hipotesesDescartadas" INTEGER NOT NULL DEFAULT 0,
    "conhecimentosReutilizados" INTEGER NOT NULL DEFAULT 0,
    "recomendacoesEficazes" INTEGER NOT NULL DEFAULT 0,
    "capacidadesFortalecidas" INTEGER NOT NULL DEFAULT 0,
    "precisaoRecomendacoes" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "totalEmpresas" INTEGER NOT NULL DEFAULT 0,
    "periodo" TEXT NOT NULL,
    "dataRef" TIMESTAMP(3) NOT NULL,
    "metadados" JSONB,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "plataforma_snapshots_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "decisoes_sinais" (
    "id" TEXT NOT NULL,
    "empresaId" TEXT NOT NULL,
    "decisaoId" TEXT NOT NULL,
    "sinalId" TEXT NOT NULL,
    "tipoRelacao" TEXT NOT NULL DEFAULT 'GEROU',
    "peso" DOUBLE PRECISION NOT NULL DEFAULT 1.0,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "decisoes_sinais_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "empresas_slug_key" ON "empresas"("slug");

-- CreateIndex
CREATE INDEX "empresas_ativa_idx" ON "empresas"("ativa");

-- CreateIndex
CREATE INDEX "empresas_criadaEm_idx" ON "empresas"("criadaEm");

-- CreateIndex
CREATE INDEX "empresas_deletedAt_idx" ON "empresas"("deletedAt");

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_supabaseId_key" ON "usuarios"("supabaseId");

-- CreateIndex
CREATE INDEX "usuarios_empresaId_idx" ON "usuarios"("empresaId");

-- CreateIndex
CREATE INDEX "usuarios_empresaId_ativo_idx" ON "usuarios"("empresaId", "ativo");

-- CreateIndex
CREATE INDEX "usuarios_empresaId_deletedAt_idx" ON "usuarios"("empresaId", "deletedAt");

-- CreateIndex
CREATE INDEX "leads_empresaId_estagio_idx" ON "leads"("empresaId", "estagio");

-- CreateIndex
CREATE INDEX "leads_empresaId_temperatura_idx" ON "leads"("empresaId", "temperatura");

-- CreateIndex
CREATE INDEX "leads_empresaId_criadoEm_idx" ON "leads"("empresaId", "criadoEm");

-- CreateIndex
CREATE INDEX "leads_empresaId_atualizadoEm_idx" ON "leads"("empresaId", "atualizadoEm");

-- CreateIndex
CREATE INDEX "leads_empresaId_deletedAt_idx" ON "leads"("empresaId", "deletedAt");

-- CreateIndex
CREATE INDEX "leads_responsavelId_idx" ON "leads"("responsavelId");

-- CreateIndex
CREATE INDEX "leads_empresaId_responsavelId_estagio_idx" ON "leads"("empresaId", "responsavelId", "estagio");

-- CreateIndex
CREATE UNIQUE INDEX "clientes_leadId_key" ON "clientes"("leadId");

-- CreateIndex
CREATE INDEX "clientes_empresaId_status_idx" ON "clientes"("empresaId", "status");

-- CreateIndex
CREATE INDEX "clientes_empresaId_segmento_idx" ON "clientes"("empresaId", "segmento");

-- CreateIndex
CREATE INDEX "clientes_empresaId_criadoEm_idx" ON "clientes"("empresaId", "criadoEm");

-- CreateIndex
CREATE INDEX "clientes_empresaId_deletedAt_idx" ON "clientes"("empresaId", "deletedAt");

-- CreateIndex
CREATE INDEX "contatos_empresaId_idx" ON "contatos"("empresaId");

-- CreateIndex
CREATE INDEX "contatos_empresaId_clienteId_idx" ON "contatos"("empresaId", "clienteId");

-- CreateIndex
CREATE INDEX "contatos_empresaId_deletedAt_idx" ON "contatos"("empresaId", "deletedAt");

-- CreateIndex
CREATE INDEX "contatos_clienteId_idx" ON "contatos"("clienteId");

-- CreateIndex
CREATE INDEX "contatos_clienteId_principal_idx" ON "contatos"("clienteId", "principal");

-- CreateIndex
CREATE INDEX "implantacoes_empresaId_status_idx" ON "implantacoes"("empresaId", "status");

-- CreateIndex
CREATE INDEX "implantacoes_empresaId_dataPrevisao_idx" ON "implantacoes"("empresaId", "dataPrevisao");

-- CreateIndex
CREATE INDEX "implantacoes_empresaId_deletedAt_idx" ON "implantacoes"("empresaId", "deletedAt");

-- CreateIndex
CREATE INDEX "implantacoes_clienteId_idx" ON "implantacoes"("clienteId");

-- CreateIndex
CREATE INDEX "etapas_implantacao_empresaId_idx" ON "etapas_implantacao"("empresaId");

-- CreateIndex
CREATE INDEX "etapas_implantacao_empresaId_implantacaoId_idx" ON "etapas_implantacao"("empresaId", "implantacaoId");

-- CreateIndex
CREATE INDEX "etapas_implantacao_empresaId_deletedAt_idx" ON "etapas_implantacao"("empresaId", "deletedAt");

-- CreateIndex
CREATE INDEX "etapas_implantacao_implantacaoId_idx" ON "etapas_implantacao"("implantacaoId");

-- CreateIndex
CREATE INDEX "etapas_implantacao_implantacaoId_concluida_idx" ON "etapas_implantacao"("implantacaoId", "concluida");

-- CreateIndex
CREATE INDEX "etapas_implantacao_implantacaoId_ordem_idx" ON "etapas_implantacao"("implantacaoId", "ordem");

-- CreateIndex
CREATE INDEX "tarefas_empresaId_status_idx" ON "tarefas"("empresaId", "status");

-- CreateIndex
CREATE INDEX "tarefas_empresaId_dataVencimento_idx" ON "tarefas"("empresaId", "dataVencimento");

-- CreateIndex
CREATE INDEX "tarefas_empresaId_prioridade_idx" ON "tarefas"("empresaId", "prioridade");

-- CreateIndex
CREATE INDEX "tarefas_empresaId_tipo_idx" ON "tarefas"("empresaId", "tipo");

-- CreateIndex
CREATE INDEX "tarefas_empresaId_criadaEm_idx" ON "tarefas"("empresaId", "criadaEm");

-- CreateIndex
CREATE INDEX "tarefas_empresaId_deletedAt_idx" ON "tarefas"("empresaId", "deletedAt");

-- CreateIndex
CREATE INDEX "tarefas_responsavelId_idx" ON "tarefas"("responsavelId");

-- CreateIndex
CREATE INDEX "tarefas_clienteId_idx" ON "tarefas"("clienteId");

-- CreateIndex
CREATE INDEX "tarefas_empresaId_responsavelId_status_idx" ON "tarefas"("empresaId", "responsavelId", "status");

-- CreateIndex
CREATE INDEX "historicos_empresaId_criadoEm_idx" ON "historicos"("empresaId", "criadoEm");

-- CreateIndex
CREATE INDEX "historicos_empresaId_tipo_idx" ON "historicos"("empresaId", "tipo");

-- CreateIndex
CREATE INDEX "historicos_empresaId_deletedAt_idx" ON "historicos"("empresaId", "deletedAt");

-- CreateIndex
CREATE INDEX "historicos_clienteId_idx" ON "historicos"("clienteId");

-- CreateIndex
CREATE INDEX "historicos_leadId_idx" ON "historicos"("leadId");

-- CreateIndex
CREATE INDEX "historicos_usuarioId_idx" ON "historicos"("usuarioId");

-- CreateIndex
CREATE INDEX "historicos_implantacaoId_idx" ON "historicos"("implantacaoId");

-- CreateIndex
CREATE INDEX "historicos_clienteId_criadoEm_idx" ON "historicos"("clienteId", "criadoEm");

-- CreateIndex
CREATE INDEX "transacoes_empresaId_status_dataVencimento_idx" ON "transacoes"("empresaId", "status", "dataVencimento");

-- CreateIndex
CREATE INDEX "transacoes_empresaId_tipo_idx" ON "transacoes"("empresaId", "tipo");

-- CreateIndex
CREATE INDEX "transacoes_empresaId_dataPagamento_idx" ON "transacoes"("empresaId", "dataPagamento");

-- CreateIndex
CREATE INDEX "transacoes_empresaId_categoria_idx" ON "transacoes"("empresaId", "categoria");

-- CreateIndex
CREATE INDEX "transacoes_empresaId_criadaEm_idx" ON "transacoes"("empresaId", "criadaEm");

-- CreateIndex
CREATE INDEX "transacoes_empresaId_deletedAt_idx" ON "transacoes"("empresaId", "deletedAt");

-- CreateIndex
CREATE INDEX "transacoes_clienteId_idx" ON "transacoes"("clienteId");

-- CreateIndex
CREATE INDEX "transacoes_empresaId_tipo_status_dataVencimento_idx" ON "transacoes"("empresaId", "tipo", "status", "dataVencimento");

-- CreateIndex
CREATE UNIQUE INDEX "configuracoes_empresa_empresaId_key" ON "configuracoes_empresa"("empresaId");

-- CreateIndex
CREATE INDEX "configuracoes_empresa_empresaId_deletedAt_idx" ON "configuracoes_empresa"("empresaId", "deletedAt");

-- CreateIndex
CREATE INDEX "historico_sinais_empresaId_sinalId_criadoEm_idx" ON "historico_sinais"("empresaId", "sinalId", "criadoEm");

-- CreateIndex
CREATE INDEX "historico_sinais_empresaId_motorOrigem_idx" ON "historico_sinais"("empresaId", "motorOrigem");

-- CreateIndex
CREATE INDEX "historico_sinais_empresaId_deletedAt_idx" ON "historico_sinais"("empresaId", "deletedAt");

-- CreateIndex
CREATE INDEX "evidencias_empresaId_categoria_criadaEm_idx" ON "evidencias"("empresaId", "categoria", "criadaEm");

-- CreateIndex
CREATE INDEX "evidencias_empresaId_criadaEm_idx" ON "evidencias"("empresaId", "criadaEm");

-- CreateIndex
CREATE INDEX "evidencias_empresaId_origem_idx" ON "evidencias"("empresaId", "origem");

-- CreateIndex
CREATE INDEX "evidencias_empresaId_confianca_idx" ON "evidencias"("empresaId", "confianca");

-- CreateIndex
CREATE INDEX "evidencias_empresaId_deletedAt_idx" ON "evidencias"("empresaId", "deletedAt");

-- CreateIndex
CREATE INDEX "evidencias_empresaId_categoria_confianca_idx" ON "evidencias"("empresaId", "categoria", "confianca");

-- CreateIndex
CREATE INDEX "hipoteses_empresaId_estado_idx" ON "hipoteses"("empresaId", "estado");

-- CreateIndex
CREATE INDEX "hipoteses_empresaId_categoria_idx" ON "hipoteses"("empresaId", "categoria");

-- CreateIndex
CREATE INDEX "hipoteses_empresaId_impacto_idx" ON "hipoteses"("empresaId", "impacto");

-- CreateIndex
CREATE INDEX "hipoteses_empresaId_atualizadaEm_idx" ON "hipoteses"("empresaId", "atualizadaEm");

-- CreateIndex
CREATE INDEX "hipoteses_empresaId_deletedAt_idx" ON "hipoteses"("empresaId", "deletedAt");

-- CreateIndex
CREATE INDEX "memoria_cognitiva_empresaId_criadaEm_idx" ON "memoria_cognitiva"("empresaId", "criadaEm");

-- CreateIndex
CREATE INDEX "memoria_cognitiva_empresaId_versao_idx" ON "memoria_cognitiva"("empresaId", "versao");

-- CreateIndex
CREATE INDEX "memoria_cognitiva_empresaId_tipo_idx" ON "memoria_cognitiva"("empresaId", "tipo");

-- CreateIndex
CREATE INDEX "memoria_cognitiva_empresaId_deletedAt_idx" ON "memoria_cognitiva"("empresaId", "deletedAt");

-- CreateIndex
CREATE INDEX "acoes_cognitivas_empresaId_status_idx" ON "acoes_cognitivas"("empresaId", "status");

-- CreateIndex
CREATE INDEX "acoes_cognitivas_empresaId_categoria_idx" ON "acoes_cognitivas"("empresaId", "categoria");

-- CreateIndex
CREATE INDEX "acoes_cognitivas_empresaId_criadaEm_idx" ON "acoes_cognitivas"("empresaId", "criadaEm");

-- CreateIndex
CREATE INDEX "acoes_cognitivas_empresaId_deletedAt_idx" ON "acoes_cognitivas"("empresaId", "deletedAt");

-- CreateIndex
CREATE INDEX "eventos_ativacao_empresaId_criadoEm_idx" ON "eventos_ativacao"("empresaId", "criadoEm");

-- CreateIndex
CREATE INDEX "eventos_ativacao_empresaId_deletedAt_idx" ON "eventos_ativacao"("empresaId", "deletedAt");

-- CreateIndex
CREATE UNIQUE INDEX "eventos_ativacao_empresaId_tipo_key" ON "eventos_ativacao"("empresaId", "tipo");

-- CreateIndex
CREATE INDEX "outcomes_empresaId_categoria_idx" ON "outcomes"("empresaId", "categoria");

-- CreateIndex
CREATE INDEX "outcomes_empresaId_criadoEm_idx" ON "outcomes"("empresaId", "criadoEm");

-- CreateIndex
CREATE INDEX "outcomes_empresaId_deletedAt_idx" ON "outcomes"("empresaId", "deletedAt");

-- CreateIndex
CREATE INDEX "conhecimentos_validados_empresaId_categoria_idx" ON "conhecimentos_validados"("empresaId", "categoria");

-- CreateIndex
CREATE INDEX "conhecimentos_validados_empresaId_scoreConfianca_idx" ON "conhecimentos_validados"("empresaId", "scoreConfianca");

-- CreateIndex
CREATE INDEX "conhecimentos_validados_empresaId_criadoEm_idx" ON "conhecimentos_validados"("empresaId", "criadoEm");

-- CreateIndex
CREATE INDEX "conhecimentos_validados_empresaId_ultimaAuditoria_idx" ON "conhecimentos_validados"("empresaId", "ultimaAuditoria");

-- CreateIndex
CREATE INDEX "conhecimentos_validados_empresaId_deletedAt_idx" ON "conhecimentos_validados"("empresaId", "deletedAt");

-- CreateIndex
CREATE INDEX "feedback_acoes_empresaId_criadoEm_idx" ON "feedback_acoes"("empresaId", "criadoEm");

-- CreateIndex
CREATE INDEX "feedback_acoes_empresaId_tipo_idx" ON "feedback_acoes"("empresaId", "tipo");

-- CreateIndex
CREATE INDEX "feedback_acoes_empresaId_deletedAt_idx" ON "feedback_acoes"("empresaId", "deletedAt");

-- CreateIndex
CREATE INDEX "feedback_acoes_acaoId_idx" ON "feedback_acoes"("acaoId");

-- CreateIndex
CREATE INDEX "conversas_token_idx" ON "conversas"("token");

-- CreateIndex
CREATE INDEX "conversas_token_concluida_idx" ON "conversas"("token", "concluida");

-- CreateIndex
CREATE INDEX "conversas_empresaId_idx" ON "conversas"("empresaId");

-- CreateIndex
CREATE INDEX "conversas_empresaId_criadaEm_idx" ON "conversas"("empresaId", "criadaEm");

-- CreateIndex
CREATE INDEX "conversas_empresaId_deletedAt_idx" ON "conversas"("empresaId", "deletedAt");

-- CreateIndex
CREATE UNIQUE INDEX "identidade_digital_empresaId_key" ON "identidade_digital"("empresaId");

-- CreateIndex
CREATE INDEX "identidade_digital_empresaId_idx" ON "identidade_digital"("empresaId");

-- CreateIndex
CREATE INDEX "identidade_digital_empresaId_deletedAt_idx" ON "identidade_digital"("empresaId", "deletedAt");

-- CreateIndex
CREATE INDEX "conversas_historico_empresaId_ano_mes_idx" ON "conversas_historico"("empresaId", "ano", "mes");

-- CreateIndex
CREATE INDEX "conversas_historico_empresaId_deletedAt_idx" ON "conversas_historico"("empresaId", "deletedAt");

-- CreateIndex
CREATE INDEX "conversas_historico_identidadeId_idx" ON "conversas_historico"("identidadeId");

-- CreateIndex
CREATE INDEX "aprendizados_empresaId_categoria_idx" ON "aprendizados"("empresaId", "categoria");

-- CreateIndex
CREATE INDEX "aprendizados_empresaId_ativo_idx" ON "aprendizados"("empresaId", "ativo");

-- CreateIndex
CREATE INDEX "aprendizados_empresaId_criadoEm_idx" ON "aprendizados"("empresaId", "criadoEm");

-- CreateIndex
CREATE INDEX "aprendizados_empresaId_deletedAt_idx" ON "aprendizados"("empresaId", "deletedAt");

-- CreateIndex
CREATE INDEX "anotacoes_empresaId_entidadeTipo_entidadeId_idx" ON "anotacoes"("empresaId", "entidadeTipo", "entidadeId");

-- CreateIndex
CREATE INDEX "anotacoes_empresaId_criadoEm_idx" ON "anotacoes"("empresaId", "criadoEm");

-- CreateIndex
CREATE INDEX "anotacoes_empresaId_deletedAt_idx" ON "anotacoes"("empresaId", "deletedAt");

-- CreateIndex
CREATE INDEX "anotacoes_criadoPorId_idx" ON "anotacoes"("criadoPorId");

-- CreateIndex
CREATE INDEX "tags_empresaId_idx" ON "tags"("empresaId");

-- CreateIndex
CREATE INDEX "tags_empresaId_criadoEm_idx" ON "tags"("empresaId", "criadoEm");

-- CreateIndex
CREATE INDEX "tags_empresaId_deletedAt_idx" ON "tags"("empresaId", "deletedAt");

-- CreateIndex
CREATE UNIQUE INDEX "tags_empresaId_nome_key" ON "tags"("empresaId", "nome");

-- CreateIndex
CREATE INDEX "onboarding_decisoes_empresaId_criadoEm_idx" ON "onboarding_decisoes"("empresaId", "criadoEm");

-- CreateIndex
CREATE INDEX "onboarding_decisoes_empresaId_deletedAt_idx" ON "onboarding_decisoes"("empresaId", "deletedAt");

-- CreateIndex
CREATE INDEX "onboarding_decisoes_implantacaoId_idx" ON "onboarding_decisoes"("implantacaoId");

-- CreateIndex
CREATE INDEX "onboarding_decisoes_responsavelId_idx" ON "onboarding_decisoes"("responsavelId");

-- CreateIndex
CREATE INDEX "eventos_tenantId_eventType_occurredAt_idx" ON "eventos"("tenantId", "eventType", "occurredAt");

-- CreateIndex
CREATE INDEX "eventos_tenantId_status_idx" ON "eventos"("tenantId", "status");

-- CreateIndex
CREATE INDEX "eventos_tenantId_deletedAt_idx" ON "eventos"("tenantId", "deletedAt");

-- CreateIndex
CREATE INDEX "eventos_correlationId_idx" ON "eventos"("correlationId");

-- CreateIndex
CREATE INDEX "eventos_eventType_occurredAt_idx" ON "eventos"("eventType", "occurredAt");

-- CreateIndex
CREATE INDEX "event_subscriptions_eventType_ativo_idx" ON "event_subscriptions"("eventType", "ativo");

-- CreateIndex
CREATE INDEX "event_subscriptions_empresaId_deletedAt_idx" ON "event_subscriptions"("empresaId", "deletedAt");

-- CreateIndex
CREATE UNIQUE INDEX "event_subscriptions_eventType_handlerId_key" ON "event_subscriptions"("eventType", "handlerId");

-- CreateIndex
CREATE INDEX "dead_letters_tenantId_eventType_idx" ON "dead_letters"("tenantId", "eventType");

-- CreateIndex
CREATE INDEX "dead_letters_tenantId_correlationId_idx" ON "dead_letters"("tenantId", "correlationId");

-- CreateIndex
CREATE INDEX "dead_letters_handlerName_idx" ON "dead_letters"("handlerName");

-- CreateIndex
CREATE INDEX "dead_letters_criadoEm_idx" ON "dead_letters"("criadoEm");

-- CreateIndex
CREATE INDEX "dead_letters_tenantId_deletedAt_idx" ON "dead_letters"("tenantId", "deletedAt");

-- CreateIndex
CREATE INDEX "ciclo_configuracoes_empresaId_ativo_idx" ON "ciclo_configuracoes"("empresaId", "ativo");

-- CreateIndex
CREATE INDEX "ciclo_configuracoes_empresaId_proximaExecucao_idx" ON "ciclo_configuracoes"("empresaId", "proximaExecucao");

-- CreateIndex
CREATE INDEX "ciclo_configuracoes_empresaId_deletedAt_idx" ON "ciclo_configuracoes"("empresaId", "deletedAt");

-- CreateIndex
CREATE UNIQUE INDEX "ciclo_configuracoes_empresaId_tipo_key" ON "ciclo_configuracoes"("empresaId", "tipo");

-- CreateIndex
CREATE INDEX "confianca_fontes_empresaId_scoreAtual_idx" ON "confianca_fontes"("empresaId", "scoreAtual");

-- CreateIndex
CREATE INDEX "confianca_fontes_empresaId_deletedAt_idx" ON "confianca_fontes"("empresaId", "deletedAt");

-- CreateIndex
CREATE UNIQUE INDEX "confianca_fontes_empresaId_nomeFonte_key" ON "confianca_fontes"("empresaId", "nomeFonte");

-- CreateIndex
CREATE INDEX "respostas_conversa_empresaId_criadaEm_idx" ON "respostas_conversa"("empresaId", "criadaEm");

-- CreateIndex
CREATE INDEX "respostas_conversa_empresaId_bloco_idx" ON "respostas_conversa"("empresaId", "bloco");

-- CreateIndex
CREATE INDEX "respostas_conversa_empresaId_perguntaId_idx" ON "respostas_conversa"("empresaId", "perguntaId");

-- CreateIndex
CREATE INDEX "respostas_conversa_token_idx" ON "respostas_conversa"("token");

-- CreateIndex
CREATE INDEX "respostas_conversa_empresaId_deletedAt_idx" ON "respostas_conversa"("empresaId", "deletedAt");

-- CreateIndex
CREATE INDEX "momentos_wow_empresaId_criadoEm_idx" ON "momentos_wow"("empresaId", "criadoEm");

-- CreateIndex
CREATE INDEX "momentos_wow_categoria_idx" ON "momentos_wow"("categoria");

-- CreateIndex
CREATE INDEX "momentos_wow_empresaId_deletedAt_idx" ON "momentos_wow"("empresaId", "deletedAt");

-- CreateIndex
CREATE INDEX "fricoes_empresaId_tipo_idx" ON "fricoes"("empresaId", "tipo");

-- CreateIndex
CREATE INDEX "fricoes_empresaId_contexto_criadoEm_idx" ON "fricoes"("empresaId", "contexto", "criadoEm");

-- CreateIndex
CREATE INDEX "fricoes_empresaId_criadoEm_idx" ON "fricoes"("empresaId", "criadoEm");

-- CreateIndex
CREATE INDEX "fricoes_empresaId_deletedAt_idx" ON "fricoes"("empresaId", "deletedAt");

-- CreateIndex
CREATE INDEX "sinais_valor_empresaId_tipo_idx" ON "sinais_valor"("empresaId", "tipo");

-- CreateIndex
CREATE INDEX "sinais_valor_empresaId_criadoEm_idx" ON "sinais_valor"("empresaId", "criadoEm");

-- CreateIndex
CREATE INDEX "sinais_valor_empresaId_deletedAt_idx" ON "sinais_valor"("empresaId", "deletedAt");

-- CreateIndex
CREATE INDEX "auditoria_recomendacoes_empresaId_tipo_resultado_idx" ON "auditoria_recomendacoes"("empresaId", "tipo", "resultado");

-- CreateIndex
CREATE INDEX "auditoria_recomendacoes_empresaId_recomendacaoId_idx" ON "auditoria_recomendacoes"("empresaId", "recomendacaoId");

-- CreateIndex
CREATE INDEX "auditoria_recomendacoes_empresaId_criadoEm_idx" ON "auditoria_recomendacoes"("empresaId", "criadoEm");

-- CreateIndex
CREATE INDEX "auditoria_recomendacoes_empresaId_deletedAt_idx" ON "auditoria_recomendacoes"("empresaId", "deletedAt");

-- CreateIndex
CREATE INDEX "plataforma_snapshots_periodo_dataRef_idx" ON "plataforma_snapshots"("periodo", "dataRef");

-- CreateIndex
CREATE INDEX "plataforma_snapshots_criadoEm_idx" ON "plataforma_snapshots"("criadoEm");

-- CreateIndex
CREATE INDEX "decisoes_sinais_empresaId_idx" ON "decisoes_sinais"("empresaId");

-- CreateIndex
CREATE INDEX "decisoes_sinais_empresaId_decisaoId_idx" ON "decisoes_sinais"("empresaId", "decisaoId");

-- CreateIndex
CREATE INDEX "decisoes_sinais_empresaId_sinalId_idx" ON "decisoes_sinais"("empresaId", "sinalId");

-- CreateIndex
CREATE INDEX "decisoes_sinais_empresaId_deletedAt_idx" ON "decisoes_sinais"("empresaId", "deletedAt");

-- CreateIndex
CREATE INDEX "decisoes_sinais_decisaoId_idx" ON "decisoes_sinais"("decisaoId");

-- CreateIndex
CREATE INDEX "decisoes_sinais_sinalId_idx" ON "decisoes_sinais"("sinalId");

-- CreateIndex
CREATE UNIQUE INDEX "decisoes_sinais_decisaoId_sinalId_tipoRelacao_key" ON "decisoes_sinais"("decisaoId", "sinalId", "tipoRelacao");

-- AddForeignKey
ALTER TABLE "usuarios" ADD CONSTRAINT "usuarios_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "empresas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "leads" ADD CONSTRAINT "leads_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "empresas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "leads" ADD CONSTRAINT "leads_responsavelId_fkey" FOREIGN KEY ("responsavelId") REFERENCES "usuarios"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "clientes" ADD CONSTRAINT "clientes_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "empresas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "clientes" ADD CONSTRAINT "clientes_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "leads"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contatos" ADD CONSTRAINT "contatos_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "empresas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contatos" ADD CONSTRAINT "contatos_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "clientes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "implantacoes" ADD CONSTRAINT "implantacoes_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "empresas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "implantacoes" ADD CONSTRAINT "implantacoes_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "clientes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "etapas_implantacao" ADD CONSTRAINT "etapas_implantacao_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "empresas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "etapas_implantacao" ADD CONSTRAINT "etapas_implantacao_implantacaoId_fkey" FOREIGN KEY ("implantacaoId") REFERENCES "implantacoes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tarefas" ADD CONSTRAINT "tarefas_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "empresas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tarefas" ADD CONSTRAINT "tarefas_criadorId_fkey" FOREIGN KEY ("criadorId") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tarefas" ADD CONSTRAINT "tarefas_responsavelId_fkey" FOREIGN KEY ("responsavelId") REFERENCES "usuarios"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tarefas" ADD CONSTRAINT "tarefas_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "clientes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tarefas" ADD CONSTRAINT "tarefas_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "leads"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "historicos" ADD CONSTRAINT "historicos_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "empresas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "historicos" ADD CONSTRAINT "historicos_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "historicos" ADD CONSTRAINT "historicos_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "clientes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "historicos" ADD CONSTRAINT "historicos_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "leads"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "historicos" ADD CONSTRAINT "historicos_implantacaoId_fkey" FOREIGN KEY ("implantacaoId") REFERENCES "implantacoes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transacoes" ADD CONSTRAINT "transacoes_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "empresas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transacoes" ADD CONSTRAINT "transacoes_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "clientes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "configuracoes_empresa" ADD CONSTRAINT "configuracoes_empresa_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "empresas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "historico_sinais" ADD CONSTRAINT "historico_sinais_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "empresas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "evidencias" ADD CONSTRAINT "evidencias_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "empresas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hipoteses" ADD CONSTRAINT "hipoteses_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "empresas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "memoria_cognitiva" ADD CONSTRAINT "memoria_cognitiva_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "empresas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "acoes_cognitivas" ADD CONSTRAINT "acoes_cognitivas_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "empresas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "eventos_ativacao" ADD CONSTRAINT "eventos_ativacao_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "empresas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "outcomes" ADD CONSTRAINT "outcomes_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "empresas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "conhecimentos_validados" ADD CONSTRAINT "conhecimentos_validados_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "empresas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "feedback_acoes" ADD CONSTRAINT "feedback_acoes_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "empresas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "feedback_acoes" ADD CONSTRAINT "feedback_acoes_acaoId_fkey" FOREIGN KEY ("acaoId") REFERENCES "acoes_cognitivas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "conversas" ADD CONSTRAINT "conversas_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "empresas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "identidade_digital" ADD CONSTRAINT "identidade_digital_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "empresas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "conversas_historico" ADD CONSTRAINT "conversas_historico_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "empresas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "aprendizados" ADD CONSTRAINT "aprendizados_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "empresas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "anotacoes" ADD CONSTRAINT "anotacoes_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "empresas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "anotacoes" ADD CONSTRAINT "anotacoes_criadoPorId_fkey" FOREIGN KEY ("criadoPorId") REFERENCES "usuarios"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tags" ADD CONSTRAINT "tags_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "empresas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "onboarding_decisoes" ADD CONSTRAINT "onboarding_decisoes_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "empresas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "onboarding_decisoes" ADD CONSTRAINT "onboarding_decisoes_implantacaoId_fkey" FOREIGN KEY ("implantacaoId") REFERENCES "implantacoes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "onboarding_decisoes" ADD CONSTRAINT "onboarding_decisoes_responsavelId_fkey" FOREIGN KEY ("responsavelId") REFERENCES "usuarios"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "eventos" ADD CONSTRAINT "eventos_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "empresas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event_subscriptions" ADD CONSTRAINT "event_subscriptions_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "empresas"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dead_letters" ADD CONSTRAINT "dead_letters_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "empresas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ciclo_configuracoes" ADD CONSTRAINT "ciclo_configuracoes_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "empresas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "confianca_fontes" ADD CONSTRAINT "confianca_fontes_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "empresas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "respostas_conversa" ADD CONSTRAINT "respostas_conversa_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "empresas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "momentos_wow" ADD CONSTRAINT "momentos_wow_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "empresas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fricoes" ADD CONSTRAINT "fricoes_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "empresas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sinais_valor" ADD CONSTRAINT "sinais_valor_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "empresas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "auditoria_recomendacoes" ADD CONSTRAINT "auditoria_recomendacoes_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "empresas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "decisoes_sinais" ADD CONSTRAINT "decisoes_sinais_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "empresas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "decisoes_sinais" ADD CONSTRAINT "decisoes_sinais_decisaoId_fkey" FOREIGN KEY ("decisaoId") REFERENCES "acoes_cognitivas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "decisoes_sinais" ADD CONSTRAINT "decisoes_sinais_sinalId_fkey" FOREIGN KEY ("sinalId") REFERENCES "historico_sinais"("id") ON DELETE CASCADE ON UPDATE CASCADE;
