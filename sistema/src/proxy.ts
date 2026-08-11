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
                        request.nextUrl.pathname.startsWith('/diagnostico') ||
                        request.nextUrl.pathname.startsWith('/fundador') ||
                        request.nextUrl.pathname.startsWith('/tornar-se-fundador') ||
                        request.nextUrl.pathname.startsWith('/solicitar-founder') ||
                        request.nextUrl.pathname === '/'

  if (!session && !isPublicRoute) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (session && (request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/register')) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return supabaseResponse
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.svg|manifest|robots|sitemap|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
}
