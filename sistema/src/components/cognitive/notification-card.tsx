import { Card, CardContent, CardHeader, CardTitle, Badge } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { AlertCircle, CheckCircle2, TrendingUp, Bell, AlertTriangle } from 'lucide-react'
import type { CognitiveNotification } from '@/engine'

const iconePorCategoria: Record<string, React.ReactNode> = {
  decisao: <CheckCircle2 className="h-4 w-4 text-emerald-500" />,
  alerta: <AlertTriangle className="h-4 w-4 text-red-500" />,
  insight: <CheckCircle2 className="h-4 w-4 text-blue-500" />,
  evolucao: <TrendingUp className="h-4 w-4 text-purple-500" />,
  acao: <Bell className="h-4 w-4 text-amber-500" />,
}

const corPrioridade: Record<string, string> = {
  urgente: 'border-l-red-500',
  importante: 'border-l-amber-500',
  informativa: 'border-l-blue-500',
}

const variantBadge: Record<string, 'destructive' | 'warning' | 'default'> = {
  urgente: 'destructive',
  importante: 'warning',
  informativa: 'default',
}

function NotificationItem({ notification }: { notification: CognitiveNotification }) {
  return (
    <div className={cn('flex items-start gap-3 border-l-4 p-3 rounded-r-lg bg-muted/30', corPrioridade[notification.prioridade] ?? 'border-l-muted')}>
      <span className="mt-0.5 shrink-0 text-muted-foreground">
        {iconePorCategoria[notification.categoria] ?? <AlertCircle className="h-4 w-4" />}
      </span>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium">{notification.titulo}</p>
        <p className="text-xs text-muted-foreground mt-0.5">{notification.descricao}</p>
        <p className="text-xs text-muted-foreground mt-0.5">{notification.categoria} &middot; {notification.origem}</p>
      </div>
      <Badge variant={variantBadge[notification.prioridade]} className="shrink-0">
        {notification.prioridade}
      </Badge>
    </div>
  )
}

interface NotificationCardProps {
  notifications: CognitiveNotification[]
}

export function NotificacaoCard({ notifications }: NotificationCardProps) {
  if (notifications.length === 0) return null

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <Bell className="h-4 w-4" />
          Notificações
          <Badge variant="default" className="ml-auto">{notifications.length}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {notifications.map((n, i) => (
          <NotificationItem key={n.id ?? i} notification={n} />
        ))}
      </CardContent>
    </Card>
  )
}
