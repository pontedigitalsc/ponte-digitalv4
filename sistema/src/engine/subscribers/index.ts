import { EventSubscriber } from '../event-subscriber'
import { registrarDiagnosticoConcluido } from './diagnostico-concluido.subscriber'
import { registrarConhecimentoPromovido } from './conhecimento-promovido.subscriber'
import { registrarResultadoRegistrado } from './resultado-registrado.subscriber'
import { registrarContextoAtualizado } from './contexto-atualizado.subscriber'

let subscriberInstance: EventSubscriber | null = null

export function inicializarSubscribers(): EventSubscriber {
  if (subscriberInstance) return subscriberInstance

  const subscriber = new EventSubscriber()

  registrarDiagnosticoConcluido(subscriber)
  registrarConhecimentoPromovido(subscriber)
  registrarResultadoRegistrado(subscriber)
  registrarContextoAtualizado(subscriber)

  subscriber.initialize()
  subscriberInstance = subscriber

  return subscriber
}
