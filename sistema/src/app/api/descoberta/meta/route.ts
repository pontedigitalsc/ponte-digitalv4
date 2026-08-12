import { NextResponse } from 'next/server'
import { requirePlataforma } from '@/lib/authorize'
import {
  obterCategoriasOperacionais,
  obterEmpresasParaDescoberta,
} from '@/services/descoberta-operacional.service'
import { TEMPLATE_SERRALHERIA } from '@/engine/descoberta-operacional'
import { handleApiError } from '@/lib/api-error'

// GET /api/descoberta/meta — P92: dados de apoio para o formulário de criação
// (categorias existentes, empresas reais ativas e o template de vertical).
export async function GET() {
  try {
    await requirePlataforma('FOUNDER_VIEW_INTERNAL')
    const [categorias, empresas] = await Promise.all([
      obterCategoriasOperacionais(),
      obterEmpresasParaDescoberta(),
    ])
    return NextResponse.json({
      data: {
        categorias,
        empresas,
        templateSerralheria: {
          nome: TEMPLATE_SERRALHERIA.nome,
          slug: TEMPLATE_SERRALHERIA.slug,
          descricao: TEMPLATE_SERRALHERIA.descricao,
        },
      },
    })
  } catch (err) {
    return handleApiError(err)
  }
}