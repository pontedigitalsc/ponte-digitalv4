import { AvatarPonte } from '@/components/ui/avatar'

export default function DashboardLoading() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="flex flex-col items-center gap-3 text-muted-foreground">
        <AvatarPonte state="thinking" size="md" />
        <p className="text-sm">Só um instante...</p>
      </div>
    </div>
  )
}
