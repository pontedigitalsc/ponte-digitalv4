export interface RegistroMemoriaEstrategica {
  id: string
  decisaoId: string
  titulo: string
  categoria: string
  funcionou: boolean
  porQue: string
  aprendemos: string
  repetir: string
  nuncaRepetir: string
  dataDecisao: Date
  dataRevisao: Date
  confianca: number
}

export interface MemoriaEstrategica {
  registros: RegistroMemoriaEstrategica[]
  totalRegistros: number
  taxaAcertos: number
  maioresAprendizados: string[]
  padroesIdentificados: string[]
}

function gerarId(): string {
  return `mem_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
}

export function construirMemoriaEstrategica(
  ciclos: { titulo: string; categoria: string; status: string; aprendizadosGerados: string[]; cicloCompleto: boolean }[],
): MemoriaEstrategica {
  const registros: RegistroMemoriaEstrategica[] = []
  const todosAprendizados: string[] = []
  const padroes = new Map<string, number>()

  for (const ciclo of ciclos) {
    if (!ciclo.cicloCompleto) continue

    const funcionou = ciclo.status === 'CONCLUIDO' && ciclo.aprendizadosGerados.length > 0
    const acertos = ciclo.aprendizadosGerados.filter(a => a.includes('validada') || a.includes('positivo'))

    const registro: RegistroMemoriaEstrategica = {
      id: gerarId(),
      decisaoId: ciclo.titulo,
      titulo: ciclo.titulo,
      categoria: ciclo.categoria,
      funcionou,
      porQue: acertos.length > 0
        ? `Decisao validada por ${acertos.length} evidencias`
        : 'Resultado ainda nao avaliado completamente',
      aprendemos: ciclo.aprendizadosGerados.join('; ') || 'Nenhum aprendizado registrado',
      repetir: funcionou ? `Repetir abordagem em contextos similares de ${ciclo.categoria}` : 'Nao aplicar mesma estrategia',
      nuncaRepetir: !funcionou ? `Evitar abordagem utilizada em ${ciclo.categoria}` : 'Nao identificado',
      dataDecisao: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      dataRevisao: new Date(),
      confianca: funcionou ? 0.8 : 0.4,
    }

    registros.push(registro)
    todosAprendizados.push(...ciclo.aprendizadosGerados)
    const chave = ciclo.categoria
    padroes.set(chave, (padroes.get(chave) ?? 0) + 1)
  }

  const totalRegistros = registros.length
  const taxaAcertos = totalRegistros > 0
    ? Math.round((registros.filter(r => r.funcionou).length / totalRegistros) * 100)
    : 0

  const maioresAprendizados = todosAprendizados.slice(0, 5)
  const padroesIdentificados = Array.from(padroes.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([cat, count]) => `${cat}: ${count} ciclo(s)`)

  return { registros, totalRegistros, taxaAcertos, maioresAprendizados, padroesIdentificados }
}