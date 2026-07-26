import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'https://pontedigital.com.br'

export const viewport: Viewport = {
  themeColor: '#2563eb',
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  title: { default: 'Ponte Digital', template: '%s | Ponte Digital' },
  description: 'Sistema de gestão inteligente para pequenas e médias empresas',
  metadataBase: new URL(appUrl),
  openGraph: {
    title: 'Ponte Digital',
    description: 'Sistema de gestão inteligente para pequenas e médias empresas',
    url: appUrl,
    siteName: 'Ponte Digital',
    locale: 'pt_BR',
    type: 'website',
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/favicon.ico',
  },
  manifest: '/manifest',
  robots: '/robots',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
