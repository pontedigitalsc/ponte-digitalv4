'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ArrowLeft, Loader2, MailCheck } from 'lucide-react'
import { createSupabaseBrowserClient } from '@/lib/supabase-browser'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/form-elements'

const emailSchema = z.object({
  email: z.string().email('E-mail inválido'),
})

type EmailFormData = z.infer<typeof emailSchema>

export default function ResetPasswordPage() {
  const [enviado, setEnviado] = useState(false)
  const [serverError, setServerError] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema),
  })

  const onSubmit = async (data: EmailFormData) => {
    setServerError('')
    const supabase = createSupabaseBrowserClient()

    // redirectTo aponta para a página de definição de nova senha — é para
    // onde o Supabase leva o usuário depois que ele clica no link do e-mail
    const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
      redirectTo: `${window.location.origin}/reset-password/confirmar`,
    })

    // Deliberadamente não diferenciamos "e-mail não existe" de "e-mail
    // enviado com sucesso" na resposta visual — enumerar e-mails cadastrados
    // via mensagem de erro é uma prática insegura comum (permite descobrir
    // quais e-mails têm conta só testando este formulário).
    if (error) {
      setServerError('Não foi possível enviar o e-mail agora. Tente novamente em instantes.')
      return
    }
    setEnviado(true)
  }

  if (enviado) {
    return (
      <div className="space-y-6 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mx-auto">
          <MailCheck className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="text-xl font-bold">Verifique seu e-mail</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Se houver uma conta com este e-mail, enviamos um link para redefinir sua senha.
          </p>
        </div>
        <Link href="/login" className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline">
          <ArrowLeft className="h-3.5 w-3.5" />
          Voltar para o login
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Esqueci a senha</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Informe seu e-mail para receber um link de redefinição.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="email">E-mail</Label>
          <Input
            id="email"
            type="email"
            placeholder="voce@empresa.com.br"
            autoComplete="email"
            autoFocus
            {...register('email')}
          />
          {errors.email && (
            <p className="text-xs text-destructive">{errors.email.message}</p>
          )}
        </div>

        {serverError && (
          <div className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {serverError}
          </div>
        )}

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
          {isSubmitting ? 'Enviando...' : 'Enviar link de redefinição'}
        </Button>
      </form>

      <p className="text-center text-sm">
        <Link href="/login" className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-3.5 w-3.5" />
          Voltar para o login
        </Link>
      </p>
    </div>
  )
}
