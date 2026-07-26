import type { EventoPonteDigital } from '../cognitive-bus'
import type { EventSubscriber } from '../event-subscriber'
import { EVENTOS_NEGOCIO } from '../event-catalog'
import { calcularNivelAtivacao } from '../founder-activation-engine'

export function diagnosticoConcluidoHandler(evento: EventoPonteDigital): void {
  const tenantId = evento.metadata.tenantId
  if (!tenantId) return
  void calcularNivelAtivacao(tenantId).catch(() => {})
}

export function registrarDiagnosticoConcluido(subscriber: EventSubscriber): void {
  subscriber.subscribe(EVENTOS_NEGOCIO.DIAGNOSTICO_CONCLUIDO, diagnosticoConcluidoHandler)
}
