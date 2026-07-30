'use client'

import { useEffect, useState } from 'react'
import { Clock, Sparkles, TrendingUp, RefreshCw } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/card'
import { cn, formatarDataHora } from '@/lib/utils'
import HistoricoContent from '@/app/(dashboard)/historico/historico-content'
import type { HistoricoExperience } from '@/engine'

interface TimelineVivaProps {
  experience: HistoricoExperience
  empresaId: string
}

interface EventoCognitivo {
  id: string
  tipo: 'decisao' | 'conhecimento' | 'aprendizado' | 'evolucao'
  descricao: string
  data: string
  categoria?: string
}

const CONFIG_EVENTO: Record<string, { icone: React.ReactNode; cor: string; bg: string }> = {
  decisao: { icone: <TrendingUp className="h-3 w-3" />, cor: 'text-purple-600', bg: 'bg-purple-50 dark:bg-purple-950/10' },
  conhecimento: { icone: <Sparkles className="h-3 w-3" />, cor: 'text-amber-600', bg: 'bg-amber-50 dark:bg-amber-950/10' },
  aprendizado: { icone: <RefreshCw className="h-3 w-3" />, cor: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-950/10' },
  evolucao: { icone: <TrendingUp className="h-3 w-3" />, cor: 'text-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-950/10' },
}

function SecaoEventos({ titulo, eventos }: { titulo: string; eventos: EventoCognitivo[] }) {
  if (eventos.length === 0) return null
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-sm">
          <Sparkles className="h-4 w-4" />
          {titulo}
          <Badge variant="default" className="ml-auto text-[10px]">{eventos.length}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {eventos.map((ev) => {
          const config = CONFIG_EVENTO[ev.tipo] ?? CONFIG_EVENTO.decisao
          return (
            <div key={ev.id} className={cn('flex items-start gap-3 rounded-lg p-3', config.bg)}>
              <span className={cn('mt-0.5 shrink-0', config.cor)}>{config.icone}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm">{ev.descricao}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px] text-muted-foreground">{ev.categoria}</span>
                  <span className="text-[10px] text-muted-foreground">•</span>
                  <span className="text-[10px] text-muted-foreground">{formatarDataHora(ev.data)}</span>
                </div>
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}

export function TimelineViva({ experience, empresaId: _empresaId }: TimelineVivaProps) {
  const [eventosCognitivos, setEventosCognitivos] = useState<EventoCognitivo[]>([])
  const [carregando, setCarregando] = useState(false)

  useEffect(() => {
    async function carregar() {
      setCarregando(true)
      try {
        const [decisoesRes, conhecimentosRes] = await Promise.all([
          fetch('/api/cognitive/decisoes').then(r => r.json()).catch(() => ({ decisoes: [] })),
          fetch('/api/patrimonio').then(r => r.json()).catch(() => ({})),
        ])
        const eventos: EventoCognitivo[] = []
        if (decisoesRes.decisoes) {
          decisoesRes.decisoes.slice(0, 5).forEach((d: { id: string; titulo: string; criadaEm: string }) => {
            eventos.push({ id: `dec-${d.id}`, tipo: 'decisao', descricao: d.titulo, data: d.criadaEm, categoria: 'Decisão' })
          })
        }
        setEventosCognitivos(eventos)
      } catch {
        // silently fail — cognitive events are supplementary
      }
      setCarregando(false)
    }
    carregar()
  }, [])

  return (
    <div className="space-y-6">
      {carregando && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <RefreshCw className="h-4 w-4 animate-spin" />
          Carregando eventos...
        </div>
      )}

      {eventosCognitivos.length > 0 && (
        <SecaoEventos titulo="Eventos importantes" eventos={eventosCognitivos} />
      )}

      <HistoricoContent experience={experience} />
    </div>
  )
}
