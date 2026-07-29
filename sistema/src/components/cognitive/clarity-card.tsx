import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Sparkles } from 'lucide-react'
import type { AnaliseClareza } from '@/engine'

interface ClarityCardProps {
  analise: AnaliseClareza
}

export function ClarityCard({ analise }: ClarityCardProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <Sparkles className="h-4 w-4 text-indigo-500" />
          Clareza
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="space-y-1">
          <p className="text-[10px] font-medium text-muted-foreground/60">Onde estamos</p>
          <p className="text-xs text-muted-foreground">{analise.ondeEstamos}</p>
        </div>
        <div className="space-y-1">
          <p className="text-[10px] font-medium text-muted-foreground/60">O que mudou</p>
          <p className="text-xs text-muted-foreground">{analise.oQueMudou}</p>
        </div>
        <div className="space-y-1">
          <p className="text-[10px] font-medium text-muted-foreground/60">O que realmente importa</p>
          <p className="text-xs text-muted-foreground">{analise.oQueImporta}</p>
        </div>
        <div className="space-y-1">
          <p className="text-[10px] font-medium text-muted-foreground/60">O que pode esperar</p>
          <p className="text-xs text-muted-foreground">{analise.oQuePodeEsperar}</p>
        </div>
        <div className="rounded-lg border border-indigo-100 dark:border-indigo-900/50 bg-indigo-50/30 dark:bg-indigo-950/10 p-2.5 mt-2">
          <p className="text-[10px] font-medium text-indigo-500 mb-0.5">Proximo melhor movimento</p>
          <p className="text-xs text-muted-foreground">{analise.proximoMelhorMovimento}</p>
        </div>
      </CardContent>
    </Card>
  )
}