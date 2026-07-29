'use client'

import * as React from 'react'
import * as AvatarPrimitive from '@radix-ui/react-avatar'
import { cn, getIniciais } from '@/lib/utils'

// ─── AVATAR ───────────────────────────────────────────────────────────────────

const AvatarRoot = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn('relative flex h-8 w-8 shrink-0 overflow-hidden rounded-full', className)}
    {...props}
  />
))
AvatarRoot.displayName = AvatarPrimitive.Root.displayName

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn('aspect-square h-full w-full', className)}
    {...props}
  />
))
AvatarImage.displayName = AvatarPrimitive.Image.displayName

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn('flex h-full w-full items-center justify-center rounded-full bg-muted text-xs font-medium text-muted-foreground', className)}
    {...props}
  />
))
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName

// ─── AVATAR COMPOSTO (componente de conveniência) ─────────────────────────────

interface AvatarProps {
  src?: string | null
  nome: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const sizeClasses = { sm: 'h-6 w-6 text-[10px]', md: 'h-8 w-8 text-xs', lg: 'h-10 w-10 text-sm' }

function Avatar({ src, nome, size = 'md', className }: AvatarProps) {
  return (
    <AvatarRoot className={cn(sizeClasses[size], className)}>
      {src && <AvatarImage src={src} alt={nome} />}
      <AvatarFallback>{getIniciais(nome)}</AvatarFallback>
    </AvatarRoot>
  )
}

// ─── AVATAR IA (estados cognitivos) ───────────────────────────────────────────

type CognitiveState = 'idle' | 'breathing' | 'thinking' | 'speaking' | 'success'

interface CognitiveAvatarProps {
  state?: CognitiveState
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

function CognitiveAvatar({ state = 'breathing', size = 'md', className }: CognitiveAvatarProps) {
  const dimension = size === 'sm' ? 'h-8 w-8' : size === 'lg' ? 'h-14 w-14' : 'h-10 w-10'

  const animClass =
    state === 'thinking' ? 'animate-thinking-glow' :
    state === 'breathing' ? 'animate-breathing' :
    state === 'speaking' ? 'animate-scale-in' :
    state === 'success' ? 'animate-scale-in' : ''

  return (
    <AvatarRoot className={cn(dimension, animClass, className)}>
      <AvatarFallback className="bg-gradient-to-br from-primary/20 via-primary/10 to-transparent text-primary text-sm font-semibold">
        <span className="text-lg">✦</span>
      </AvatarFallback>
    </AvatarRoot>
  )
}

// ─── SKELETON ─────────────────────────────────────────────────────────────────

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-muted', className)}
      {...props}
    />
  )
}

// ─── LOADING SPINNER ──────────────────────────────────────────────────────────

function Spinner({ className }: { className?: string }) {
  return (
    <div className={cn('animate-spin rounded-full border-2 border-muted border-t-primary h-4 w-4', className)} />
  )
}

export { Avatar, AvatarRoot, AvatarImage, AvatarFallback, Skeleton, Spinner, CognitiveAvatar }
export type { CognitiveState }
