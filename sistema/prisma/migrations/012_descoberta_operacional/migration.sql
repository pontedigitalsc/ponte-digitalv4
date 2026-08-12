-- 012 — PONTE DESCOBERTA (P92): conhecimento tácito do campo real
-- Nível: PLATAFORMA (sem tenant guard — acesso restrito a FOUNDER).
-- ADR-035: vertical é template/configuração (Json + perguntas), nunca código.
-- 1. enums de descoberta operacional.
-- 2. categorias operacionais (segmento mapeado; pioneiro = 1ª empresa real).
-- 3. diagnóstico (agregado raiz) + histórico.
-- 4. participantes, perguntas, respostas, registros (taxonomia), processos
--    (COMO É), processos desejados (COMO PODERIA SER), divergências e
--    oportunidades.

-- CreateEnum
CREATE TYPE "StatusDiagnosticoDescoberta" AS ENUM ('NAO_INICIADO', 'EM_DESCOBERTA', 'MAPEADO', 'EM_VALIDACAO', 'VALIDADO', 'EM_IMPLEMENTACAO', 'IMPLEMENTADO', 'EM_APRENDIZADO');

-- CreateEnum
CREATE TYPE "PapelParticipanteDescoberta" AS ENUM ('PROPRIETARIO', 'GESTAO', 'OPERACAO');

-- CreateEnum
CREATE TYPE "TipoRegistroDescoberta" AS ENUM ('CONHECIMENTO_CONHECIDO', 'INFORMACAO_FORNECIDA', 'OBSERVACAO', 'HIPOTESE', 'DECISAO', 'OPORTUNIDADE', 'DESCONHECIDO');

-- CreateEnum
CREATE TYPE "StatusDivergenciaDescoberta" AS ENUM ('ABERTA', 'QUESTAO_VALIDACAO', 'RESOLVIDA');

-- CreateEnum
CREATE TYPE "ConfiancaDescoberta" AS ENUM ('ALTA', 'MEDIA', 'BAIXA');

-- CreateEnum
CREATE TYPE "StatusProcessoDesejado" AS ENUM ('PROPOSTO', 'VALIDADO');

-- CreateEnum
CREATE TYPE "StatusOportunidadeDescoberta" AS ENUM ('CANDIDATA', 'VALIDADA', 'EM_IMPLEMENTACAO', 'IMPLEMENTADA', 'DESCARTADA');

-- CreateTable
CREATE TABLE "categorias_operacionais" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "descricao" TEXT,
    "areasTemplate" JSONB,
    "empresaPioneiraId" TEXT,
    "criadaEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadaEm" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "categorias_operacionais_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "categorias_operacionais_nome_key" ON "categorias_operacionais"("nome");
CREATE UNIQUE INDEX "categorias_operacionais_slug_key" ON "categorias_operacionais"("slug");
CREATE INDEX "categorias_operacionais_criadaEm_idx" ON "categorias_operacionais"("criadaEm");

-- CreateTable
CREATE TABLE "diagnosticos_operacionais" (
    "id" TEXT NOT NULL,
    "nomeEmpresa" TEXT NOT NULL,
    "categoriaOperacionalId" TEXT NOT NULL,
    "empresaId" TEXT,
    "unidadeOperacional" TEXT,
    "status" "StatusDiagnosticoDescoberta" NOT NULL DEFAULT 'NAO_INICIADO',
    "respostaAncora" TEXT,
    "resultadoDeclarado" TEXT,
    "iniciadoEm" TIMESTAMP(3),
    "concluidoEm" TIMESTAMP(3),
    "criadoPorUsuarioId" TEXT,
    "criadoPorEmail" TEXT,
    "criadaEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadaEm" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "diagnosticos_operacionais_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "diagnosticos_operacionais_categoriaOperacionalId_idx" ON "diagnosticos_operacionais"("categoriaOperacionalId");
CREATE INDEX "diagnosticos_operacionais_empresaId_idx" ON "diagnosticos_operacionais"("empresaId");
CREATE INDEX "diagnosticos_operacionais_status_idx" ON "diagnosticos_operacionais"("status");
CREATE INDEX "diagnosticos_operacionais_criadaEm_idx" ON "diagnosticos_operacionais"("criadaEm");

-- CreateTable
CREATE TABLE "diagnosticos_operacionais_historico" (
    "id" TEXT NOT NULL,
    "diagnosticoId" TEXT NOT NULL,
    "acao" TEXT NOT NULL,
    "statusDe" TEXT,
    "statusPara" TEXT,
    "detalhes" JSONB,
    "criadoPorUsuarioId" TEXT,
    "criadoPorEmail" TEXT,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "diagnosticos_operacionais_historico_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "diagnosticos_operacionais_historico_diagnosticoId_criadoEm_idx" ON "diagnosticos_operacionais_historico"("diagnosticoId", "criadoEm");

-- CreateTable
CREATE TABLE "participantes_descoberta" (
    "id" TEXT NOT NULL,
    "diagnosticoId" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "papel" "PapelParticipanteDescoberta" NOT NULL,
    "cargo" TEXT,
    "criadoPorUsuarioId" TEXT,
    "criadoPorEmail" TEXT,
    "criadaEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadaEm" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "participantes_descoberta_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "participantes_descoberta_diagnosticoId_idx" ON "participantes_descoberta"("diagnosticoId");

-- CreateTable
CREATE TABLE "perguntas_descoberta" (
    "id" TEXT NOT NULL,
    "categoriaOperacionalId" TEXT,
    "area" TEXT NOT NULL,
    "texto" TEXT NOT NULL,
    "objetivo" TEXT,
    "ordem" INTEGER NOT NULL,
    "ativa" BOOLEAN NOT NULL DEFAULT true,
    "criadaEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "perguntas_descoberta_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "perguntas_descoberta_categoriaOperacionalId_idx" ON "perguntas_descoberta"("categoriaOperacionalId");

-- CreateTable
CREATE TABLE "respostas_descoberta" (
    "id" TEXT NOT NULL,
    "diagnosticoId" TEXT NOT NULL,
    "participanteId" TEXT,
    "perguntaId" TEXT,
    "resposta" TEXT NOT NULL,
    "criadoPorUsuarioId" TEXT,
    "criadoPorEmail" TEXT,
    "criadaEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadaEm" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "respostas_descoberta_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "respostas_descoberta_diagnosticoId_idx" ON "respostas_descoberta"("diagnosticoId");
CREATE INDEX "respostas_descoberta_participanteId_idx" ON "respostas_descoberta"("participanteId");
CREATE INDEX "respostas_descoberta_perguntaId_idx" ON "respostas_descoberta"("perguntaId");

-- CreateTable
CREATE TABLE "registros_descoberta" (
    "id" TEXT NOT NULL,
    "diagnosticoId" TEXT NOT NULL,
    "tipo" "TipoRegistroDescoberta" NOT NULL,
    "conteudo" TEXT NOT NULL,
    "area" TEXT,
    "processoId" TEXT,
    "verificacaoEm" TIMESTAMP(3),
    "confianca" "ConfiancaDescoberta",
    "criadoPorUsuarioId" TEXT,
    "criadoPorEmail" TEXT,
    "criadaEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadaEm" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "registros_descoberta_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "registros_descoberta_diagnosticoId_tipo_idx" ON "registros_descoberta"("diagnosticoId", "tipo");
CREATE INDEX "registros_descoberta_processoId_idx" ON "registros_descoberta"("processoId");

-- CreateTable
CREATE TABLE "processos_descoberta" (
    "id" TEXT NOT NULL,
    "diagnosticoId" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,
    "inicio" TEXT,
    "fim" TEXT,
    "responsavel" TEXT,
    "nivelConfianca" "ConfiancaDescoberta" NOT NULL DEFAULT 'MEDIA',
    "fonte" TEXT,
    "ultimaValidacaoEm" TIMESTAMP(3),
    "etapas" JSONB NOT NULL DEFAULT '[]',
    "entradas" JSONB NOT NULL DEFAULT '[]',
    "saidas" JSONB NOT NULL DEFAULT '[]',
    "ferramentas" JSONB NOT NULL DEFAULT '[]',
    "retrabalhos" JSONB NOT NULL DEFAULT '[]',
    "dependencias" JSONB NOT NULL DEFAULT '[]',
    "riscos" JSONB NOT NULL DEFAULT '[]',
    "indicadores" JSONB NOT NULL DEFAULT '[]',
    "criadoPorUsuarioId" TEXT,
    "criadoPorEmail" TEXT,
    "criadaEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadaEm" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "processos_descoberta_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "processos_descoberta_diagnosticoId_idx" ON "processos_descoberta"("diagnosticoId");

-- CreateTable
CREATE TABLE "processos_desejados_descoberta" (
    "id" TEXT NOT NULL,
    "diagnosticoId" TEXT NOT NULL,
    "processoAtualId" TEXT,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,
    "status" "StatusProcessoDesejado" NOT NULL DEFAULT 'PROPOSTO',
    "etapasDesejadas" JSONB NOT NULL DEFAULT '[]',
    "melhoriaPrincipal" TEXT,
    "validadoEm" TIMESTAMP(3),
    "criadoPorUsuarioId" TEXT,
    "criadoPorEmail" TEXT,
    "criadaEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadaEm" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "processos_desejados_descoberta_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "processos_desejados_descoberta_diagnosticoId_idx" ON "processos_desejados_descoberta"("diagnosticoId");

-- CreateTable
CREATE TABLE "divergencias_descoberta" (
    "id" TEXT NOT NULL,
    "diagnosticoId" TEXT NOT NULL,
    "processoId" TEXT,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "participantesId" TEXT,
    "questaoValidacao" TEXT,
    "status" "StatusDivergenciaDescoberta" NOT NULL DEFAULT 'ABERTA',
    "resolvidaEm" TIMESTAMP(3),
    "criadoPorUsuarioId" TEXT,
    "criadoPorEmail" TEXT,
    "criadaEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadaEm" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "divergencias_descoberta_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "divergencias_descoberta_diagnosticoId_idx" ON "divergencias_descoberta"("diagnosticoId");

-- CreateTable
CREATE TABLE "oportunidades_descoberta" (
    "id" TEXT NOT NULL,
    "diagnosticoId" TEXT NOT NULL,
    "processoId" TEXT,
    "descricao" TEXT NOT NULL,
    "categoria" TEXT NOT NULL,
    "status" "StatusOportunidadeDescoberta" NOT NULL DEFAULT 'CANDIDATA',
    "etapaReferente" TEXT,
    "impactoEstimado" TEXT,
    "criadoPorUsuarioId" TEXT,
    "criadoPorEmail" TEXT,
    "criadaEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadaEm" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "oportunidades_descoberta_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "oportunidades_descoberta_diagnosticoId_status_idx" ON "oportunidades_descoberta"("diagnosticoId", "status");

-- AddForeignKey
ALTER TABLE "diagnosticos_operacionais" ADD CONSTRAINT "diagnosticos_operacionais_categoriaOperacionalId_fkey" FOREIGN KEY ("categoriaOperacionalId") REFERENCES "categorias_operacionais"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "diagnosticos_operacionais_historico" ADD CONSTRAINT "diagnosticos_operacionais_historico_diagnosticoId_fkey" FOREIGN KEY ("diagnosticoId") REFERENCES "diagnosticos_operacionais"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "participantes_descoberta" ADD CONSTRAINT "participantes_descoberta_diagnosticoId_fkey" FOREIGN KEY ("diagnosticoId") REFERENCES "diagnosticos_operacionais"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "perguntas_descoberta" ADD CONSTRAINT "perguntas_descoberta_categoriaOperacionalId_fkey" FOREIGN KEY ("categoriaOperacionalId") REFERENCES "categorias_operacionais"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "respostas_descoberta" ADD CONSTRAINT "respostas_descoberta_diagnosticoId_fkey" FOREIGN KEY ("diagnosticoId") REFERENCES "diagnosticos_operacionais"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "respostas_descoberta" ADD CONSTRAINT "respostas_descoberta_participanteId_fkey" FOREIGN KEY ("participanteId") REFERENCES "participantes_descoberta"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "respostas_descoberta" ADD CONSTRAINT "respostas_descoberta_perguntaId_fkey" FOREIGN KEY ("perguntaId") REFERENCES "perguntas_descoberta"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "registros_descoberta" ADD CONSTRAINT "registros_descoberta_diagnosticoId_fkey" FOREIGN KEY ("diagnosticoId") REFERENCES "diagnosticos_operacionais"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "registros_descoberta" ADD CONSTRAINT "registros_descoberta_processoId_fkey" FOREIGN KEY ("processoId") REFERENCES "processos_descoberta"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "processos_descoberta" ADD CONSTRAINT "processos_descoberta_diagnosticoId_fkey" FOREIGN KEY ("diagnosticoId") REFERENCES "diagnosticos_operacionais"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "processos_desejados_descoberta" ADD CONSTRAINT "processos_desejados_descoberta_diagnosticoId_fkey" FOREIGN KEY ("diagnosticoId") REFERENCES "diagnosticos_operacionais"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "processos_desejados_descoberta" ADD CONSTRAINT "processos_desejados_descoberta_processoAtualId_fkey" FOREIGN KEY ("processoAtualId") REFERENCES "processos_descoberta"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "divergencias_descoberta" ADD CONSTRAINT "divergencias_descoberta_diagnosticoId_fkey" FOREIGN KEY ("diagnosticoId") REFERENCES "diagnosticos_operacionais"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "divergencias_descoberta" ADD CONSTRAINT "divergencias_descoberta_processoId_fkey" FOREIGN KEY ("processoId") REFERENCES "processos_descoberta"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "divergencias_descoberta" ADD CONSTRAINT "divergencias_descoberta_participantesId_fkey" FOREIGN KEY ("participantesId") REFERENCES "participantes_descoberta"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "oportunidades_descoberta" ADD CONSTRAINT "oportunidades_descoberta_diagnosticoId_fkey" FOREIGN KEY ("diagnosticoId") REFERENCES "diagnosticos_operacionais"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "oportunidades_descoberta" ADD CONSTRAINT "oportunidades_descoberta_processoId_fkey" FOREIGN KEY ("processoId") REFERENCES "processos_descoberta"("id") ON DELETE SET NULL ON UPDATE CASCADE;
