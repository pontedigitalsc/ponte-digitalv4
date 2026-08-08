/**
 * ─── PERMISSÕES DE PLATAFORMA (P84 — Founder Access) ─────────────────────────
 *
 * Módulo PURO (sem imports) — a matriz de autorização da camada de plataforma.
 * Nenhuma permissão exclusiva pode ser decidida no frontend; tudo que estiver
 * aqui é validado no servidor via `temPermissaoPlataforma`.
 *
 * A identidade de plataforma nunca vem de `email`, URL, localStorage ou de um
 * campo controlado pelo usuário — ela vem de `Usuario.platformRole`, uma coluna
 * persistida no banco e atribuída por um bootstrap seguro (scripts/provision-founder.ts).
 */
export type PlataformaRole = 'FOUNDER_PRINCIPAL'

export type PlataformaPermissao =
  | 'FOUNDER_VIEW_PLATFORM'
  | 'FOUNDER_VIEW_INTERNAL'
  | 'FOUNDER_VIEW_SYSTEM_HEALTH'
  | 'FOUNDER_MANAGE_PLATFORM'
  | 'FOUNDER_MANAGE_AUDIT_ACCESS'

/** Cada permissão responde a "o que isso permite fazer?" — ver P84 Parte 7. */
export const PERMISSOES_PLATAFORMA: Record<PlataformaPermissao, PlataformaRole[]> = {
  // Acessar painel do fundador + rotas /admin (área interna exclusiva).
  FOUNDER_VIEW_PLATFORM: ['FOUNDER_PRINCIPAL'],
  // Ler engines agregadas de plataforma (painel, inteligência coletiva, observatório).
  FOUNDER_VIEW_INTERNAL: ['FOUNDER_PRINCIPAL'],
  // Ver saúde/observabilidade detalhada da plataforma (/api/health/plataforma).
  FOUNDER_VIEW_SYSTEM_HEALTH: ['FOUNDER_PRINCIPAL'],
  // Ações de escrita de plataforma (criar/revisar/promover/descartar conhecimento).
  FOUNDER_MANAGE_PLATFORM: ['FOUNDER_PRINCIPAL'],
  // Registrar/ler o Platform Audit Trail de ações privilegiadas.
  FOUNDER_MANAGE_AUDIT_ACCESS: ['FOUNDER_PRINCIPAL'],
}

export function temPermissaoPlataforma(
  platformRole: PlataformaRole | null | undefined,
  permissao: PlataformaPermissao,
): boolean {
  if (!platformRole) return false
  return PERMISSOES_PLATAFORMA[permissao]?.includes(platformRole) ?? false
}

export function eFounderPrincipal(platformRole: PlataformaRole | null | undefined): boolean {
  return platformRole === 'FOUNDER_PRINCIPAL'
}