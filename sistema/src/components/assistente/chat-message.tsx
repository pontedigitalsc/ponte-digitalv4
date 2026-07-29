'use client'

import { Bot, User } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ChatMessageProps {
  role: 'user' | 'assistant'
  content: string
  loading?: boolean
}

export function ChatMessage({ role, content, loading }: ChatMessageProps) {
  const isUser = role === 'user'

  return (
    <div className={cn('flex gap-3 animate-slide-up', isUser && 'flex-row-reverse')}>
      <div className={cn(
        'shrink-0 flex h-7 w-7 items-center justify-center rounded-full',
        isUser ? 'bg-primary' : 'bg-muted border'
      )}>
        {isUser
          ? <User className="h-3.5 w-3.5 text-primary-foreground" />
          : <Bot className="h-3.5 w-3.5 text-muted-foreground" />
        }
      </div>

      <div className={cn(
        'max-w-[82%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed',
        isUser
          ? 'bg-primary text-primary-foreground rounded-tr-sm'
          : 'bg-muted text-foreground rounded-tl-sm'
      )}>
        {loading ? (
          <div className="flex items-center gap-1 py-0.5">
            <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/60 animate-bounce [animation-delay:0ms]" />
            <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/60 animate-bounce [animation-delay:150ms]" />
            <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/60 animate-bounce [animation-delay:300ms]" />
          </div>
        ) : (
          <div className="whitespace-pre-wrap">{content}</div>
        )}
      </div>
    </div>
  )
}
