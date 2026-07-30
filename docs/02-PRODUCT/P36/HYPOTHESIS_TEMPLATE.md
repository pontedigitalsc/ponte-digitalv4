# Sistema Oficial de Hipóteses — Template

## Uso: toda melhoria da Ponte nasce aqui

---

## Template da Hipótese

```markdown
## Hipótese: {título curto}

**O que acreditamos:**
{descrição clara do que acreditamos que vai acontecer}

**Como validar:**
{passo a passo de como testar a hipótese}

**Métrica:**
{qual métrica indica sucesso ou fracasso}

**Período:**
{data início} → {data fim}

**Resultado:**
- Métrica inicial: {valor}
- Métrica final: {valor}
- Variação: {+/-valor}
- Hipótese: [ ] FORTALECIDA  [ ] ENFRAQUECIDA  [ ] INCONCLUSIVA

**Conclusão:**
{o que aprendemos}

**Conhecimento Gerado:**
{qual conhecimento fica para a Ponte}
```

---

## Exemplo

```markdown
## Hipótese: Atendimento em 3 cliques reduz abandono

**O que acreditamos:**
Se o empresário conseguir registrar um atendimento em no máximo 3 cliques,
a taxa de abandono do fluxo de atendimento cairá de 30% para menos de 10%.

**Como validar:**
1. Contar cliques médios por atendimento no fluxo atual
2. Implementar atalhos de reconhecimento automático
3. Medir taxa de abandono antes e depois

**Métrica:**
Taxa de abandono = atendimentos iniciados mas não concluídos / total iniciados

**Período:**
01/08/2026 → 14/08/2026

**Resultado:**
- Métrica inicial: 30%
- Métrica final: 8%
- Variação: -73%
- Hipótese: [x] FORTALECIDA  [ ] ENFRAQUECIDA  [ ] INCONCLUSIVA

**Conclusão:**
A redução de cliques impacta diretamente a conclusão de atendimentos.
O reconhecimento automático foi o principal fator.

**Conhecimento Gerado:**
Empresários de pequena empresa abandonam fluxos com mais de 3 cliques.
O reconhecimento automático é o principal redutor de abandono.
```

---

## Ciclo de Validação

```
1. Nasce como hipótese → 2. Define métrica → 3. Coleta dados
→ 4. Analisa resultado → 5. Conclui → 6. Gera conhecimento
```

Nunca pular etapas. Nunca validar opinião sem dado.
