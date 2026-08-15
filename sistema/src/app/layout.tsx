import type { Metadata, Viewport } from 'next'
import { Inter, Fraunces } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import { ToastProvider } from '@/components/ui/toast'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

// Fraunces: usada com critério — apenas nos grandes momentos narrativos da
// landing (hero, viradas, algumas headlines editoriais). Nunca em interface,
// navegação ou CTAs funcionais, que continuam em Inter. Pesos leves/médios
// para manter o caráter contemporâneo, sem tom clássico/formal.
const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
})

const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'https://pontedigital.com.br'

export const viewport: Viewport = {
  themeColor: '#2563eb',
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  title: { default: 'Ponte Digital', template: '%s | Ponte Digital' },
  description: 'A inteligência da sua empresa — Primeira Sessão Estratégica gratuita em poucos minutos',
  metadataBase: new URL(appUrl),
  openGraph: {
    title: 'Ponte Digital',
    description: 'A inteligência da sua empresa — Primeira Sessão Estratégica gratuita em poucos minutos',
    url: appUrl,
    siteName: 'Ponte Digital',
    locale: 'pt_BR',
    type: 'website',
  },
  // Ícone: file convention `app/icon.svg` — gera o <link rel="icon"> canônico
  // (SVG, sizes=any). O Next ainda injeta um link /favicon.ico?hash default
  // (placeholder padrão, não 404); não removível via metadata. `public/favicon.svg`
  // segue usado pelo manifest/PWA.
  manifest: '/manifest',
  robots: '/robots',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        {/*
          Progressive enhancement para as animações de "reveal" da landing.
          Sem este script (JS desabilitado/bloqueado), a classe "js" nunca é
          adicionada e o CSS correspondente nunca esconde conteúdo — a página
          permanece 100% visível e utilizável. Roda antes do primeiro paint
          para não haver flash de conteúdo.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
      </head>
      <body className={`${inter.variable} ${fraunces.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <ToastProvider>
            {children}
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
