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
CREATE TABLE "decisoes_sinais" (
    "id" TEXT NOT NULL,
    "decisaoId" TEXT NOT NULL,
    "sinalId" TEXT NOT NULL,
    "tipoRelacao" TEXT NOT NULL DEFAULT 'GEROU',
    "peso" DOUBLE PRECISION NOT NULL DEFAULT 1.0,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "decisoes_sinais_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "anotacoes_empresaId_entidadeTipo_entidadeId_idx" ON "anotacoes"("empresaId", "entidadeTipo", "entidadeId");

-- CreateIndex
CREATE INDEX "anotacoes_empresaId_criadoEm_idx" ON "anotacoes"("empresaId", "criadoEm");

-- CreateIndex
CREATE INDEX "anotacoes_criadoPorId_idx" ON "anotacoes"("criadoPorId");

-- CreateIndex
CREATE INDEX "tags_empresaId_idx" ON "tags"("empresaId");

-- CreateIndex
CREATE INDEX "tags_empresaId_criadoEm_idx" ON "tags"("empresaId", "criadoEm");

-- CreateIndex
CREATE UNIQUE INDEX "tags_empresaId_nome_key" ON "tags"("empresaId", "nome");

-- CreateIndex
CREATE INDEX "onboarding_decisoes_empresaId_criadoEm_idx" ON "onboarding_decisoes"("empresaId", "criadoEm");

-- CreateIndex
CREATE INDEX "onboarding_decisoes_implantacaoId_idx" ON "onboarding_decisoes"("implantacaoId");

-- CreateIndex
CREATE INDEX "onboarding_decisoes_responsavelId_idx" ON "onboarding_decisoes"("responsavelId");

-- CreateIndex
CREATE INDEX "decisoes_sinais_decisaoId_idx" ON "decisoes_sinais"("decisaoId");

-- CreateIndex
CREATE INDEX "decisoes_sinais_sinalId_idx" ON "decisoes_sinais"("sinalId");

-- CreateIndex
CREATE UNIQUE INDEX "decisoes_sinais_decisaoId_sinalId_tipoRelacao_key" ON "decisoes_sinais"("decisaoId", "sinalId", "tipoRelacao");

-- CreateIndex
CREATE INDEX "clientes_empresaId_segmento_idx" ON "clientes"("empresaId", "segmento");

-- CreateIndex
CREATE INDEX "clientes_empresaId_criadoEm_idx" ON "clientes"("empresaId", "criadoEm");

-- CreateIndex
CREATE INDEX "conhecimentos_validados_empresaId_criadoEm_idx" ON "conhecimentos_validados"("empresaId", "criadoEm");

-- CreateIndex
CREATE INDEX "conhecimentos_validados_empresaId_ultimaAuditoria_idx" ON "conhecimentos_validados"("empresaId", "ultimaAuditoria");

-- CreateIndex
CREATE INDEX "contatos_clienteId_principal_idx" ON "contatos"("clienteId", "principal");

-- CreateIndex
CREATE INDEX "conversas_token_concluida_idx" ON "conversas"("token", "concluida");

-- CreateIndex
CREATE INDEX "conversas_empresaId_criadaEm_idx" ON "conversas"("empresaId", "criadaEm");

-- CreateIndex
CREATE INDEX "empresas_ativa_idx" ON "empresas"("ativa");

-- CreateIndex
CREATE INDEX "empresas_criadaEm_idx" ON "empresas"("criadaEm");

-- CreateIndex
CREATE INDEX "etapas_implantacao_implantacaoId_concluida_idx" ON "etapas_implantacao"("implantacaoId", "concluida");

-- CreateIndex
CREATE INDEX "etapas_implantacao_implantacaoId_ordem_idx" ON "etapas_implantacao"("implantacaoId", "ordem");

-- CreateIndex
CREATE INDEX "feedback_acoes_empresaId_tipo_idx" ON "feedback_acoes"("empresaId", "tipo");

-- CreateIndex
CREATE INDEX "hipoteses_empresaId_atualizadaEm_idx" ON "hipoteses"("empresaId", "atualizadaEm");

-- CreateIndex
CREATE INDEX "historicos_empresaId_tipo_idx" ON "historicos"("empresaId", "tipo");

-- CreateIndex
CREATE INDEX "implantacoes_empresaId_dataPrevisao_idx" ON "implantacoes"("empresaId", "dataPrevisao");

-- CreateIndex
CREATE INDEX "leads_empresaId_temperatura_idx" ON "leads"("empresaId", "temperatura");

-- CreateIndex
CREATE INDEX "leads_empresaId_criadoEm_idx" ON "leads"("empresaId", "criadoEm");

-- CreateIndex
CREATE INDEX "memoria_cognitiva_empresaId_tipo_idx" ON "memoria_cognitiva"("empresaId", "tipo");

-- CreateIndex
CREATE INDEX "tarefas_empresaId_prioridade_idx" ON "tarefas"("empresaId", "prioridade");

-- CreateIndex
CREATE INDEX "tarefas_empresaId_tipo_idx" ON "tarefas"("empresaId", "tipo");

-- CreateIndex
CREATE INDEX "transacoes_empresaId_dataPagamento_idx" ON "transacoes"("empresaId", "dataPagamento");

-- CreateIndex
CREATE INDEX "transacoes_empresaId_categoria_idx" ON "transacoes"("empresaId", "categoria");

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
ALTER TABLE "decisoes_sinais" ADD CONSTRAINT "decisoes_sinais_decisaoId_fkey" FOREIGN KEY ("decisaoId") REFERENCES "acoes_cognitivas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "decisoes_sinais" ADD CONSTRAINT "decisoes_sinais_sinalId_fkey" FOREIGN KEY ("sinalId") REFERENCES "historico_sinais"("id") ON DELETE CASCADE ON UPDATE CASCADE;

