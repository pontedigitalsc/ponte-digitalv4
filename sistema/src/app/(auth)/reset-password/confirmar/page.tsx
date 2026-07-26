'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Eye, EyeOff, Loader2, CheckCircle2 } from 'lucide-react'
import { createSupabaseBrowserClient } from '@/lib/supabase-browser'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/form-elements'

const novaSenhaSchema = z.object({
  senha: z.string().min(6, 'Mínimo 6 caracteres'),
})

type NovaSenhaFormData = z.infer<typeof novaSenhaSchema>

export default function ConfirmarResetPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [serverError, setServerError] = useState('')
  const [sucesso, setSucesso] = useState(false)
  // Enquanto o Supabase ainda não processou o token do link do e-mail,
  // não sabemos se a sessão de recuperação é válida — evita mostrar o
  // formulário antes de confirmar que o link realmente é válido.
  const [sessaoValida, setSessaoValida] = useState<boolean | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<NovaSenhaFormData>({
    resolver: zodResolver(novaSenhaSchema),
  })

  useEffect(() => {
    const supabase = createSupabaseBrowserClient()

    // O Supabase dispara PASSWORD_RECOVERY quando processa o token vindo
    // do link do e-mail e cria uma sessão temporária para esta ação.
    const { data: listener } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') {
        setSessaoValida(true)
      }
    })

    // Se depois de um tempo curto nenhum evento chegou, o link provavelmente
    // expirou ou é inválido — não deixamos o usuário esperando indefinidamente.
    const timeout = setTimeout(() => {
      setSessaoValida((atual) => (atual === null ? false : atual))
    }, 3000)

    return () => {
      listener.subscription.unsubscribe()
      clearTimeout(timeout)
    }
  }, [])

  const onSubmit = async (data: NovaSenhaFormData) => {
    setServerError('')
    const supabase = createSupabaseBrowserClient()
    const { error } = await supabase.auth.updateUser({ password: data.senha })

    if (error) {
      setServerError('Não foi possível redefinir a senha. O link pode ter expirado — solicite um novo.')
      return
    }

    setSucesso(true)
    setTimeout(() => router.push('/login'), 2000)
  }

  // ── Aguardando confirmação do link ──
  if (sessaoValida === null) {
    return (
      <div className="flex flex-col items-center gap-3 py-8 text-center">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        <p className="text-sm text-muted-foreground">Verificando link...</p>
      </div>
    )
  }

  // ── Link inválido ou expirado ──
  if (sessaoValida === false) {
    return (
      <div className="space-y-4 text-center">
        <h1 className="text-xl font-bold">Link inválido ou expirado</h1>
        <p className="text-sm text-muted-foreground">
          Este link de redefinição não é mais válido. Solicite um novo na tela de login.
        </p>
        <Button onClick={() => router.push('/reset-password')} className="w-full">
          Solicitar novo link
        </Button>
      </div>
    )
  }

  // ── Sucesso ──
  if (sucesso) {
    return (
      <div className="space-y-4 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950/40 mx-auto">
          <CheckCircle2 className="h-6 w-6 text-emerald-600" />
        </div>
        <div>
          <h1 className="text-xl font-bold">Senha redefinida</h1>
          <p className="mt-2 text-sm text-muted-foreground">Redirecionando para o login...</p>
        </div>
      </div>
    )
  }

  // ── Formulário de nova senha ──
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Nova senha</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Escolha uma nova senha para sua conta.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="senha">Nova senha</Label>
          <div className="relative">
            <Input
              id="senha"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              autoComplete="new-password"
              autoFocus
              className="pr-10"
              {...register('senha')}
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {errors.senha && (
            <p className="text-xs text-destructive">{errors.senha.message}</p>
          )}
        </div>

        {serverError && (
          <div className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {serverError}
          </div>
        )}

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
          {isSubmitting ? 'Salvando...' : 'Redefinir senha'}
        </Button>
      </form>
    </div>
  )
}
