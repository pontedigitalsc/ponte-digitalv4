import type { EventoPonteDigital } from '../cognitive-bus'
import type { EventSubscriber } from '../event-subscriber'
import { EVENTOS_COGNITIVOS } from '../event-catalog'
import { calcularImpactoEmpresa } from '../outcome-intelligence-engine'

export function resultadoRegistradoHandler(evento: EventoPonteDigital): void {
  const tenantId = evento.metadata.tenantId
  if (!tenantId) return
  void calcularImpactoEmpresa(tenantId).catch(() => {})
}

export function registrarResultadoRegistrado(subscriber: EventSubscriber): void {
  subscriber.subscribe(EVENTOS_COGNITIVOS.RESULTADO_REGISTRADO, resultadoRegistradoHandler)
}
