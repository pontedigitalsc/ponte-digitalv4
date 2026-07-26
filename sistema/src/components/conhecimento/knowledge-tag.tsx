import { CATEGORIA_EVIDENCIA, STATUS_CONHECIMENTO } from '@/constants'

interface KnowledgeTagProps {
  type: 'categoria' | 'status'
  value: string
}

const FALLBACK_CATEGORIA = { label: 'Outro', cor: '#6B7280', bg: '#F3F4F6' }
const FALLBACK_STATUS = { label: 'Desconhecido', cor: '#6B7280', bg: '#F3F4F6' }

export function KnowledgeTag({ type, value }: KnowledgeTagProps) {
  if (type === 'categoria') {
    const config = CATEGORIA_EVIDENCIA[value] ?? FALLBACK_CATEGORIA
    return (
      <span
        className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium"
        style={{ color: config.cor, backgroundColor: config.bg }}
      >
        {config.label}
      </span>
    )
  }

  const config = STATUS_CONHECIMENTO[value] ?? FALLBACK_STATUS
  return (
    <span
      className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium"
      style={{ color: config.cor, backgroundColor: config.bg }}
    >
      {config.label}
    </span>
  )
}
