'use client'

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { Loader2, Save, Building2, User, Palette, Shield, Settings } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/form-elements'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Separator } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import type { ConfiguracoesExperience, FrequenciaCiclo } from '@/engine'

type Aba = 'empresa' | 'perfil' | 'aparencia' | 'cognitivo'

const ABAS = [
  { id: 'empresa'    as Aba, label: 'Empresa',    icone: Building2 },
  { id: 'perfil'     as Aba, label: 'Meu perfil', icone: User      },
  { id: 'aparencia'  as Aba, label: 'Aparência',  icone: Palette   },
  { id: 'cognitivo'  as Aba, label: 'Aprendizado', icone: Settings },
]

interface DadosConfig {
  empresa: { nome: string; logo: string }
  perfil:  { nome: string; cargo: string; email: string }
}

type Props = {
  experience: ConfiguracoesExperience
}

interface CicloUI {
  tipo: string
  frequencia: FrequenciaCiclo
  ativo: boolean
  ultimaExecucao: string | null
  saudavel: boolean
}

export default function ConfiguracoesContent({ experience }: Props) {
  const { theme, setTheme } = useTheme()
  const [abaAtiva, setAbaAtiva] = useState<Aba>('empresa')
  const [loading, setLoading]   = useState(true)
  const [salvando, setSalvando] = useState(false)
  const [sucesso, setSucesso]   = useState(false)
  const [dados, setDados]       = useState<DadosConfig>({
    empresa: { nome: '', logo: '' },
    perfil:  { nome: '', cargo: '', email: '' },
  })
  const [ciclos, setCiclos]     = useState<CicloUI[]>([])
  const [cicloLoading, setCicloLoading] = useState(false)

  useEffect(() => {
    fetch('/api/configuracoes')
      .then((r) => r.json())
      .then((json) => {
        setDados({
          empresa: { nome: json.empresa?.nome ?? '', logo: json.empresa?.logo ?? '' },
          perfil:  { nome: json.usuario?.nome ?? '', cargo: json.usuario?.cargo ?? '', email: json.usuario?.email ?? '' },
        })
      })
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    if (abaAtiva === 'cognitivo') {
      setCicloLoading(true)
      fetch('/api/cognitivo/config')
        .then((r) => r.json())
        .then((json) => setCiclos(json.data ?? []))
        .finally(() => setCicloLoading(false))
    }
  }, [abaAtiva])

  const salvar = async () => {
    setSalvando(true); setSucesso(false)
    try {
      const secao = abaAtiva === 'aparencia' ? 'configuracao' : abaAtiva
      await fetch('/api/configuracoes', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ secao, dados: dados[abaAtiva as keyof DadosConfig] }),
      })
      setSucesso(true)
      setTimeout(() => setSucesso(false), 3000)
    } finally { setSalvando(false) }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex gap-6">
        <nav className="w-44 shrink-0 space-y-0.5">
          {ABAS.map((aba) => {
            const Icon = aba.icone
            return (
              <button
                key={aba.id}
                onClick={() => setAbaAtiva(aba.id)}
                className={cn(
                  'flex items-center gap-2 w-full rounded-lg px-3 py-2 text-sm font-medium transition-colors text-left',
                  abaAtiva === aba.id
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                )}
              >
                <Icon className="h-4 w-4 shrink-0" />
                {aba.label}
              </button>
            )
          })}
        </nav>

        <div className="flex-1 min-w-0">
          {abaAtiva === 'empresa' && (
            <Card>
              <CardHeader>
                <CardTitle>Dados da empresa</CardTitle>
                <CardDescription>Informações que aparecem na sua conta.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1.5">
                  <Label>Nome da empresa</Label>
                  <Input
                    value={dados.empresa.nome}
                    onChange={(e) => setDados((prev) => ({ ...prev, empresa: { ...prev.empresa, nome: e.target.value } }))}
                    placeholder="Ponte Digital"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>Endereço da imagem do logo</Label>
                  <Input
                    value={dados.empresa.logo}
                    onChange={(e) => setDados((prev) => ({ ...prev, empresa: { ...prev.empresa, logo: e.target.value } }))}
                    placeholder="https://..."
                  />
                  <p className="text-xs text-muted-foreground">Cole o endereço de uma imagem (PNG ou SVG).</p>
                </div>
              </CardContent>
            </Card>
          )}

          {abaAtiva === 'perfil' && (
            <Card>
              <CardHeader>
                <CardTitle>Meu perfil</CardTitle>
                <CardDescription>Suas informações na sua conta.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1.5">
                  <Label>Nome completo</Label>
                  <Input
                    value={dados.perfil.nome}
                    onChange={(e) => setDados((prev) => ({ ...prev, perfil: { ...prev.perfil, nome: e.target.value } }))}
                    placeholder="Seu nome"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>Cargo</Label>
                  <Input
                    value={dados.perfil.cargo}
                    onChange={(e) => setDados((prev) => ({ ...prev, perfil: { ...prev.perfil, cargo: e.target.value } }))}
                    placeholder="Ex: Gerente de Contas"
                  />
                </div>
                <Separator />
                <div className="space-y-1.5">
                  <Label>E-mail</Label>
                  <Input value={dados.perfil.email} disabled className="opacity-60" />
                  <p className="text-xs text-muted-foreground">O e-mail não pode ser alterado por aqui.</p>
                </div>
              </CardContent>
            </Card>
          )}

          {abaAtiva === 'aparencia' && (
            <Card>
              <CardHeader>
                <CardTitle>Aparência</CardTitle>
                <CardDescription>Personalize a aparência.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Tema</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {[{ valor: 'light', label: 'Claro',    preview: 'bg-white border-2' },
                      { valor: 'dark',  label: 'Escuro',   preview: 'bg-zinc-900 border-2' },
                      { valor: 'system',label: 'Automático',  preview: 'bg-gradient-to-br from-white to-zinc-900 border-2' },
                    ].map((t) => (
                      <button
                        key={t.valor}
                        onClick={() => setTheme(t.valor)}
                        className={cn(
                          'rounded-lg border p-3 text-xs font-medium transition-colors text-center',
                          theme === t.valor && 'ring-2 ring-primary'
                        )}
                      >
                        <div className={cn('h-8 rounded-md mb-2', t.preview)} />
                        {t.label}
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground">Use o botão de tema no topo da página para trocar rapidamente.</p>
                </div>

                <Separator />

                <div className="rounded-lg bg-muted/40 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="h-4 w-4 text-muted-foreground" />
                    <p className="text-sm font-medium">Sobre a Ponte</p>
                  </div>
                  <p className="text-xs text-muted-foreground">Cada conversa ajuda a Ponte a entender melhor sua empresa.</p>
                </div>
              </CardContent>
            </Card>
          )}

          {abaAtiva === 'cognitivo' && (
            <Card>
              <CardHeader>
                <CardTitle>Aprendizado da empresa</CardTitle>
                <CardDescription>Acompanhe o ritmo com que a Ponte entende sua empresa.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {cicloLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                  </div>
                ) : ciclos.length === 0 ? (
                  <p className="text-sm text-muted-foreground py-4 text-center">
                    Ainda estou começando a acompanhar os aprendizados da sua empresa. Isso acontece naturalmente conforme usamos a Ponte.
                  </p>
                ) : (
                  <div className="space-y-3">
                    {ciclos.map((ciclo) => (
                      <div key={ciclo.tipo} className="flex items-center justify-between rounded-lg border p-3">
                        <div className="space-y-0.5">
                          <p className="text-sm font-medium">{ciclo.tipo}</p>
                          <p className="text-xs text-muted-foreground">
                            Frequência: {ciclo.frequencia === 'DIARIA' ? 'Diária' : ciclo.frequencia === 'SEMANAL' ? 'Semanal' : 'Mensal'}
                          </p>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span className={cn('inline-block h-1.5 w-1.5 rounded-full', ciclo.saudavel ? 'bg-emerald-500' : 'bg-amber-500')} />
                            {ciclo.saudavel ? 'Em dia' : 'Precisamos conversar'}
                            {ciclo.ultimaExecucao && <> · Última vez: {new Date(ciclo.ultimaExecucao).toLocaleDateString()}</>}
                          </div>
                        </div>
                        <button
                          onClick={async () => {
                            await fetch('/api/cognitivo/config', {
                              method: 'PATCH',
                              headers: { 'Content-Type': 'application/json' },
                              body: JSON.stringify({ tipo: ciclo.tipo, ativo: !ciclo.ativo }),
                            })
                            setCiclos((prev) => prev.map((c) => c.tipo === ciclo.tipo ? { ...c, ativo: !c.ativo } : c))
                          }}
                          className={cn(
                            'rounded-full px-3 py-1 text-xs font-medium transition-colors',
                            ciclo.ativo ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                          )}
                        >
                          {ciclo.ativo ? 'Ligado' : 'Desligado'}
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {abaAtiva !== 'aparencia' && abaAtiva !== 'cognitivo' && (
            <div className="flex items-center gap-3 mt-4">
              <Button onClick={salvar} disabled={salvando}>
                {salvando ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                {salvando ? 'Guardando...' : 'Guardar alterações'}
              </Button>
              {sucesso && (
                <span className="text-sm text-emerald-600 font-medium">✓ Guardado</span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
