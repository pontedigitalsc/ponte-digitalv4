import type { EventoPonteDigital } from '../cognitive-bus'
import type { EventSubscriber } from '../event-subscriber'
import { EVENTOS_SAIDA } from '../event-catalog'
import { contagemPorCategoria } from '../evidence-engine'

export function contextoAtualizadoHandler(evento: EventoPonteDigital): void {
  const tenantId = evento.metadata.tenantId
  if (!tenantId) return
  void contagemPorCategoria(tenantId).catch(() => {})
}

export function registrarContextoAtualizado(subscriber: EventSubscriber): void {
  subscriber.subscribe(EVENTOS_SAIDA.CONTEXTO_ATUALIZADO, contextoAtualizadoHandler)
}
