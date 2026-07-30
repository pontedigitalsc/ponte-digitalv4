'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { ChevronDown, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react'
import { KnowledgeTag } from './knowledge-tag'
import { ORIGEM_CONHECIMENTO } from '@/constants'
import type { ConhecimentoItem } from '@/engine'

interface KnowledgeCardProps {
  item: ConhecimentoItem
}

export function KnowledgeCard({ item }: KnowledgeCardProps) {
  const [expandido, setExpandido] = useState(false)
  const origemLabel = ORIGEM_CONHECIMENTO[item.origem]?.label ?? item.origem

  const scoreLabel = item.scoreConfianca >= 60 ? 'text-emerald-600' : item.scoreConfianca >= 30 ? 'text-amber-600' : 'text-red-600'
  const scoreBg = item.scoreConfianca >= 60 ? 'bg-emerald-50' : item.scoreConfianca >= 30 ? 'bg-amber-50' : 'bg-red-50'
  const barraCor = item.scoreConfianca >= 60 ? 'bg-emerald-500' : item.scoreConfianca >= 30 ? 'bg-amber-500' : 'bg-red-500'

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <button
          onClick={() => setExpandido(!expandido)}
          className="flex w-full items-start justify-between gap-3 p-4 text-left hover:bg-muted/30 transition-colors"
        >
          <div className="flex-1 space-y-2 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <KnowledgeTag type="categoria" value={item.categoria} />
              <KnowledgeTag type="status" value={item.status} />
              <span className="text-xs text-muted-foreground">{origemLabel}</span>
            </div>
            <p className="text-sm font-medium leading-snug">{item.descricao}</p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <div className={`flex items-center gap-1.5 px-2 py-1 rounded-md ${scoreBg}`}>
              {item.scoreConfianca >= 60 ? <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" /> : item.scoreConfianca >= 30 ? <AlertCircle className="h-3.5 w-3.5 text-amber-500" /> : <Sparkles className="h-3.5 w-3.5 text-red-500" />}
              <span className={`text-xs font-semibold ${scoreLabel}`}>{item.scoreConfianca}%</span>
            </div>
            <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${expandido ? 'rotate-180' : ''}`} />
          </div>
        </button>
        {expandido && (
          <div className="border-t px-4 py-3 space-y-2 bg-muted/20">
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-muted-foreground">Criado em</span>
                <p className="font-medium">{new Date(item.criadoEm).toLocaleDateString('pt-BR')}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Última validação</span>
                <p className="font-medium">{item.ultimaValidacao ? new Date(item.ultimaValidacao).toLocaleDateString('pt-BR') : '—'}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Origem</span>
                <p className="font-medium">{origemLabel}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Confiança</span>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex-1 h-1.5 rounded-full bg-muted">
                    <div className={`h-1.5 rounded-full ${barraCor}`} style={{ width: `${item.scoreConfianca}%` }} />
                  </div>
                  <span className={`font-semibold ${scoreLabel}`}>{item.scoreConfianca}%</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
