// P78 — Ritmo de leitura das devolutivas.
//
// FONTE ÚNICA DE VERDADE do tempo de reflexão. O timer lógico (auto-avanço) e
// o timer visual (barra de preenchimento) DEVEM ler desta mesma constante —
// nunca valores independentes espalhados pelo código.
//
// Os 12 segundos não são uma espera obrigatória nem loading: são o ESPAÇO
// COGNITIVO para o empresário ler a micro-descoberta. "Continuar agora" está
// disponível imediatamente — se ele clicar, o timer é cancelado e a transição
// acontece na hora.

export const RITMO_DEVOLUTIVA_MS = 12000
export const RITMO_DEVOLUTIVA_S = `${RITMO_DEVOLUTIVA_MS / 1000}s`