import { CheckCircle2 } from 'lucide-react'

interface MicroReactionProps {
  reacao: string
  visivel: boolean
}

export function MicroReaction({ reacao, visivel }: MicroReactionProps) {
  if (!visivel) return null

  return (
    <div className="animate-scale-in rounded-lg border border-emerald-200 dark:border-emerald-900 bg-gradient-to-r from-emerald-50/80 to-transparent dark:from-emerald-950/20 px-4 py-3 text-sm text-muted-foreground leading-relaxed flex items-start gap-2">
      <CheckCircle2 className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
      <span>{reacao}</span>
    </div>
  )
}
