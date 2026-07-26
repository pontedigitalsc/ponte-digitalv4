-- ═══════════════════════════════════════════════════════════════════════════════
-- ROW LEVEL SECURITY (RLS) — Ponte Digital
-- Execute this in Supabase SQL Editor after running migrations
-- ═══════════════════════════════════════════════════════════════════════════════

-- Enable RLS on all tenant-isolated tables
ALTER TABLE empresas                  ENABLE ROW LEVEL SECURITY;
ALTER TABLE usuarios                  ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads                     ENABLE ROW LEVEL SECURITY;
ALTER TABLE clientes                  ENABLE ROW LEVEL SECURITY;
ALTER TABLE contatos                  ENABLE ROW LEVEL SECURITY;
ALTER TABLE tarefas                   ENABLE ROW LEVEL SECURITY;
ALTER TABLE implantacoes              ENABLE ROW LEVEL SECURITY;
ALTER TABLE etapas_implantacao        ENABLE ROW LEVEL SECURITY;
ALTER TABLE historicos                ENABLE ROW LEVEL SECURITY;
ALTER TABLE transacoes                ENABLE ROW LEVEL SECURITY;
ALTER TABLE configuracoes_empresa     ENABLE ROW LEVEL SECURITY;
ALTER TABLE historico_sinais          ENABLE ROW LEVEL SECURITY;
ALTER TABLE evidencias                ENABLE ROW LEVEL SECURITY;
ALTER TABLE hipoteses                 ENABLE ROW LEVEL SECURITY;
ALTER TABLE memoria_cognitiva         ENABLE ROW LEVEL SECURITY;
ALTER TABLE acoes_cognitivas          ENABLE ROW LEVEL SECURITY;
ALTER TABLE eventos_ativacao          ENABLE ROW LEVEL SECURITY;
ALTER TABLE outcomes                  ENABLE ROW LEVEL SECURITY;
ALTER TABLE conhecimentos_validados   ENABLE ROW LEVEL SECURITY;
ALTER TABLE feedback_acoes            ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversas                 ENABLE ROW LEVEL SECURITY;
ALTER TABLE identidade_digital        ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversas_historico       ENABLE ROW LEVEL SECURITY;
ALTER TABLE aprendizados              ENABLE ROW LEVEL SECURITY;
ALTER TABLE anotacoes                 ENABLE ROW LEVEL SECURITY;
ALTER TABLE tags                      ENABLE ROW LEVEL SECURITY;
ALTER TABLE onboarding_decisoes       ENABLE ROW LEVEL SECURITY;
ALTER TABLE decisoes_sinais           ENABLE ROW LEVEL SECURITY;
ALTER TABLE eventos                   ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_subscriptions       ENABLE ROW LEVEL SECURITY;
ALTER TABLE dead_letters              ENABLE ROW LEVEL SECURITY;

-- Helper function: get empresa_id from current user
CREATE OR REPLACE FUNCTION get_empresa_id()
RETURNS TEXT AS $$
  SELECT empresa_id FROM usuarios
  WHERE supabase_id = auth.uid()::TEXT
  LIMIT 1;
$$ LANGUAGE SQL SECURITY DEFINER STABLE;

-- Policies: users can only see data from their own company
-- Core business models
CREATE POLICY "empresa_isolamento" ON empresas
  USING (id = get_empresa_id());

CREATE POLICY "empresa_isolamento" ON usuarios
  USING (empresa_id = get_empresa_id());

CREATE POLICY "empresa_isolamento" ON leads
  USING (empresa_id = get_empresa_id());

CREATE POLICY "empresa_isolamento" ON clientes
  USING (empresa_id = get_empresa_id());

CREATE POLICY "empresa_isolamento" ON contatos
  USING (empresa_id = get_empresa_id());

CREATE POLICY "empresa_isolamento" ON tarefas
  USING (empresa_id = get_empresa_id());

CREATE POLICY "empresa_isolamento" ON implantacoes
  USING (empresa_id = get_empresa_id());

CREATE POLICY "empresa_isolamento" ON etapas_implantacao
  USING (empresa_id = get_empresa_id());

CREATE POLICY "empresa_isolamento" ON historicos
  USING (empresa_id = get_empresa_id());

CREATE POLICY "empresa_isolamento" ON transacoes
  USING (empresa_id = get_empresa_id());

CREATE POLICY "empresa_isolamento" ON configuracoes_empresa
  USING (empresa_id = get_empresa_id());

-- Cognitive engine models
CREATE POLICY "empresa_isolamento" ON historico_sinais
  USING (empresa_id = get_empresa_id());

CREATE POLICY "empresa_isolamento" ON evidencias
  USING (empresa_id = get_empresa_id());

CREATE POLICY "empresa_isolamento" ON hipoteses
  USING (empresa_id = get_empresa_id());

CREATE POLICY "empresa_isolamento" ON memoria_cognitiva
  USING (empresa_id = get_empresa_id());

CREATE POLICY "empresa_isolamento" ON acoes_cognitivas
  USING (empresa_id = get_empresa_id());

CREATE POLICY "empresa_isolamento" ON eventos_ativacao
  USING (empresa_id = get_empresa_id());

CREATE POLICY "empresa_isolamento" ON outcomes
  USING (empresa_id = get_empresa_id());

CREATE POLICY "empresa_isolamento" ON conhecimentos_validados
  USING (empresa_id = get_empresa_id());

CREATE POLICY "empresa_isolamento" ON feedback_acoes
  USING (empresa_id = get_empresa_id());

-- Conversational models
CREATE POLICY "empresa_isolamento" ON conversas
  USING (empresa_id = get_empresa_id());

CREATE POLICY "empresa_isolamento" ON identidade_digital
  USING (empresa_id = get_empresa_id());

CREATE POLICY "empresa_isolamento" ON conversas_historico
  USING (empresa_id = get_empresa_id());

CREATE POLICY "empresa_isolamento" ON aprendizados
  USING (empresa_id = get_empresa_id());

-- Support models
CREATE POLICY "empresa_isolamento" ON anotacoes
  USING (empresa_id = get_empresa_id());

CREATE POLICY "empresa_isolamento" ON tags
  USING (empresa_id = get_empresa_id());

CREATE POLICY "empresa_isolamento" ON onboarding_decisoes
  USING (empresa_id = get_empresa_id());

-- Relational bridge
CREATE POLICY "empresa_isolamento" ON decisoes_sinais
  USING (empresa_id = get_empresa_id());

-- Event bus models
CREATE POLICY "empresa_isolamento" ON eventos
  USING (tenant_id = get_empresa_id());

CREATE POLICY "empresa_isolamento" ON event_subscriptions
  USING (empresa_id = get_empresa_id());

CREATE POLICY "empresa_isolamento" ON dead_letters
  USING (tenant_id = get_empresa_id());
