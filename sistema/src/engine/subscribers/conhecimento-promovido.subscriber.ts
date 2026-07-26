import type { EventoPonteDigital } from '../cognitive-bus'
import type { EventSubscriber } from '../event-subscriber'
import { EVENTOS_COGNITIVOS } from '../event-catalog'
import { calcularDrift } from '../confidence-drift-engine'

export function conhecimentoPromovidoHandler(evento: EventoPonteDigital): void {
  const tenantId = evento.metadata.tenantId
  if (!tenantId) return
  void calcularDrift(tenantId).catch(() => {})
}

export function registrarConhecimentoPromovido(subscriber: EventSubscriber): void {
  subscriber.subscribe(EVENTOS_COGNITIVOS.CONHECIMENTO_PROMOVIDO, conhecimentoPromovidoHandler)
}
