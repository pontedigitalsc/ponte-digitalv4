import Link from 'next/link'

const FOUNDER_WHATSAPP_URL =
  'https://api.whatsapp.com/send/?phone=5548991133397&text=Ol%C3%A1%2C+quero+participar+como+Founder+da+Ponte+Digital.&type=phone_number&app_absent=0'

export function MarketingFooter() {
  return (
    <footer className="border-t border-night-700/50 bg-night-950/80">
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left">
          <div>
            <p className="flex items-center justify-center gap-1.5 text-sm font-semibold tracking-tight text-night-text sm:justify-start">
              <span aria-hidden="true" className="text-base leading-none text-night-azure">✦</span>
              Ponte Digital
            </p>
            <p className="mt-1 text-sm italic text-night-text-dim font-editorial">
              Antes de melhorar, enxergue.
            </p>
          </div>

          <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-night-text-soft" aria-label="Links do rodapé">
            <Link href="/conversa" className="transition-colors hover:text-night-text">
              Primeira conversa
            </Link>
            <a
              href={FOUNDER_WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-night-text"
            >
              Founder
            </a>
            <Link href="/login" className="transition-colors hover:text-night-text">
              Já tenho conta
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}
