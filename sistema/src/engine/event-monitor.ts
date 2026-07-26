import { categoriaDoEvento } from './event-catalog'
import type { CategoriaEvento } from './event-catalog'

export interface EventCounters {
  publicados: number
  entregues: number
  falhas: number
  deadLetters: number
  retries: number
  handlersExecutados: number
}

export interface EventLatency {
  media: number
  max: number
  min: number
}

export interface EventMetrics {
  total: EventCounters
  latencia: EventLatency
  porCategoria: Record<string, EventCounters>
  porTipo: Record<string, EventCounters>
}

export interface EventMonitorSnapshot {
  metricas: EventMetrics
  timestamp: Date
  desde: Date
}

function novaContagem(): EventCounters {
  return { publicados: 0, entregues: 0, falhas: 0, deadLetters: 0, retries: 0, handlersExecutados: 0 }
}

export class EventMonitor {
  private total = novaContagem()
  private categorias = new Map<string, EventCounters>()
  private tipos = new Map<string, EventCounters>()
  private latencias: number[] = []
  private inicio = new Date()

  registrarPublicacao(eventType: string): void {
    this.total.publicados++
    this.contagemTipo(eventType).publicados++
    const cat = categoriaDoEvento(eventType)
    if (cat) this.contagemCategoria(cat).publicados++
  }

  registrarEntrega(eventType: string, duracaoMs: number): void {
    this.total.entregues++
    this.latencias.push(duracaoMs)
    this.contagemTipo(eventType).entregues++
    const cat = categoriaDoEvento(eventType)
    if (cat) this.contagemCategoria(cat).entregues++
  }

  registrarFalha(eventType: string): void {
    this.total.falhas++
    this.contagemTipo(eventType).falhas++
    const cat = categoriaDoEvento(eventType)
    if (cat) this.contagemCategoria(cat).falhas++
  }

  registrarRetry(): void {
    this.total.retries++
  }

  registrarDeadLetter(eventType: string): void {
    this.total.deadLetters++
    this.contagemTipo(eventType).deadLetters++
    const cat = categoriaDoEvento(eventType)
    if (cat) this.contagemCategoria(cat).deadLetters++
  }

  registrarHandlerExecutado(): void {
    this.total.handlersExecutados++
  }

  obterMetricas(): EventMonitorSnapshot {
    const porCategoria: Record<string, EventCounters> = {}
    for (const [cat, c] of this.categorias) {
      porCategoria[cat] = { ...c }
    }

    const porTipo: Record<string, EventCounters> = {}
    for (const [tipo, c] of this.tipos) {
      porTipo[tipo] = { ...c }
    }

    const latencia = this.calcularLatencia()

    return {
      metricas: {
        total: { ...this.total },
        latencia,
        porCategoria,
        porTipo,
      },
      timestamp: new Date(),
      desde: this.inicio,
    }
  }

  resetarMetricas(): void {
    this.total = novaContagem()
    this.categorias.clear()
    this.tipos.clear()
    this.latencias = []
    this.inicio = new Date()
  }

  private contagemTipo(eventType: string): EventCounters {
    if (!this.tipos.has(eventType)) {
      this.tipos.set(eventType, novaContagem())
    }
    return this.tipos.get(eventType)!
  }

  private contagemCategoria(categoria: CategoriaEvento): EventCounters {
    if (!this.categorias.has(categoria)) {
      this.categorias.set(categoria, novaContagem())
    }
    return this.categorias.get(categoria)!
  }

  private calcularLatencia(): EventLatency {
    if (this.latencias.length === 0) {
      return { media: 0, max: 0, min: 0 }
    }
    const soma = this.latencias.reduce((a, b) => a + b, 0)
    return {
      media: Math.round(soma / this.latencias.length),
      max: Math.max(...this.latencias),
      min: Math.min(...this.latencias),
    }
  }
}
