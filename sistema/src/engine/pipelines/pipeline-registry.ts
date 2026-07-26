import { EventSubscriber } from '../event-subscriber'
import { featureFlags } from '../feature-flags'
import { EVENTOS_NEGOCIO, EVENTOS_SAIDA, EVENTOS_PIPELINE } from '../event-catalog'
import {
  handlerDiagnosticoPipeline,
  handlerContextoPipeline,
  handlerNivelAtivacaoPipeline,
  handlerHipotesePipeline,
} from './diagnostico.pipeline'

let pipelineSubscriber: EventSubscriber | null = null

export function inicializarPipelines(): EventSubscriber | null {
  if (!featureFlags.isEnabled('enablePipelineSubscribers')) {
    return null
  }

  if (pipelineSubscriber) return pipelineSubscriber

  const subscriber = new EventSubscriber()

  subscriber.subscribe(EVENTOS_NEGOCIO.DIAGNOSTICO_CONCLUIDO, handlerDiagnosticoPipeline)
  subscriber.subscribe(EVENTOS_SAIDA.CONTEXTO_ATUALIZADO, handlerContextoPipeline)
  subscriber.subscribe(EVENTOS_PIPELINE.NIVEL_ATIVACAO_CALCULADO, handlerNivelAtivacaoPipeline)
  subscriber.subscribe(EVENTOS_PIPELINE.HIPOTESE_INICIAL_GERADA, handlerHipotesePipeline)

  subscriber.initialize()
  pipelineSubscriber = subscriber

  return subscriber
}
