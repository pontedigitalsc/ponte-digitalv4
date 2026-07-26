import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function proxy(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return request.cookies.getAll() },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const { data: { session } } = await supabase.auth.getSession()

  const isPublicRoute = request.nextUrl.pathname.startsWith('/login') ||
                        request.nextUrl.pathname.startsWith('/register') ||
                        request.nextUrl.pathname.startsWith('/reset-password') ||
                        request.nextUrl.pathname.startsWith('/reset-password/confirmar') ||
                        request.nextUrl.pathname.startsWith('/conversa') ||
                        request.nextUrl.pathname.startsWith('/criar-conta') ||
                        request.nextUrl.pathname === '/'

  if (!session && !isPublicRoute) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // /reset-password é deliberadamente excluído desta regra: ao clicar no
  // link do e-mail de recuperação, o Supabase cria uma sessão temporária
  // (evento PASSWORD_RECOVERY) para permitir a troca de senha — se essa
  // rota caísse aqui, o usuário seria redirecionado para /dashboard antes
  // de conseguir definir a nova senha.
  if (session && (request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/register')) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return supabaseResponse
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.svg|manifest|robots|sitemap|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
}
