import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { format, formatDistanceToNow, isToday, isTomorrow, isPast } from 'date-fns'
import { ptBR } from 'date-fns/locale'

// ─── CLASSNAMES ───────────────────────────────────────────────────────────────

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// ─── FORMATAÇÃO DE MOEDA ──────────────────────────────────────────────────────

export function formatarMoeda(valor: number | null | undefined): string {
  if (valor === null || valor === undefined) return '—'
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(valor)
}

// ─── FORMATAÇÃO DE DATAS ──────────────────────────────────────────────────────

export function formatarData(data: Date | string | null | undefined): string {
  if (!data) return '—'
  const d = typeof data === 'string' ? new Date(data) : data
  return format(d, 'dd/MM/yyyy', { locale: ptBR })
}

export function formatarDataHora(data: Date | string | null | undefined): string {
  if (!data) return '—'
  const d = typeof data === 'string' ? new Date(data) : data
  return format(d, "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })
}

export function formatarDataRelativa(data: Date | string | null | undefined): string {
  if (!data) return '—'
  const d = typeof data === 'string' ? new Date(data) : data
  if (isToday(d)) return 'Hoje'
  if (isTomorrow(d)) return 'Amanhã'
  return formatDistanceToNow(d, { addSuffix: true, locale: ptBR })
}

export function estaAtrasado(data: Date | string | null | undefined): boolean {
  if (!data) return false
  const d = typeof data === 'string' ? new Date(data) : data
  return isPast(d) && !isToday(d)
}

// ─── FORMATAÇÃO DE TELEFONE ───────────────────────────────────────────────────

export function formatarTelefone(telefone: string | null | undefined): string {
  if (!telefone) return '—'
  const nums = telefone.replace(/\D/g, '')
  if (nums.length === 11) {
    return `(${nums.slice(0, 2)}) ${nums.slice(2, 7)}-${nums.slice(7)}`
  }
  if (nums.length === 10) {
    return `(${nums.slice(0, 2)}) ${nums.slice(2, 6)}-${nums.slice(6)}`
  }
  return telefone
}

// ─── INICIAIS ─────────────────────────────────────────────────────────────────

export function getIniciais(nome: string): string {
  return nome
    .split(' ')
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
    .toUpperCase()
}

// ─── SLUGIFY ──────────────────────────────────────────────────────────────────

export function slugify(texto: string): string {
  return texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

// ─── TRUNCATE ─────────────────────────────────────────────────────────────────

export function truncar(texto: string, limite: number = 50): string {
  if (texto.length <= limite) return texto
  return texto.slice(0, limite) + '...'
}

// ─── PAGINAÇÃO ────────────────────────────────────────────────────────────────

export function calcularPaginacao(total: number, page: number, pageSize: number) {
  return {
    total,
    page,
    pageSize,
    totalPages: Math.ceil(total / pageSize),
    skip: (page - 1) * pageSize,
  }
}
