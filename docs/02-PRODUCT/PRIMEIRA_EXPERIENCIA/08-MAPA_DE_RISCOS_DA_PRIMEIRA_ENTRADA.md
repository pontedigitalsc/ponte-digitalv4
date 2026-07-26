# Mapa de Riscos da Primeira Entrada

> PROGRAMA 15 — Documento 8 de 10
> Identificação e mitigação de riscos: abandono precoce, excesso de perguntas, login cedo demais, resumo vago, contexto insuficiente, superfície excessiva, perda de confiança

---

## Relatório de execução

- **Descobertas:** os riscos mapeados na Jornada Fundacional são reais. A auditoria de implementação já identificou que o maior risco hoje é a barreira de entrada (login obrigatório). Os demais riscos são mitigáveis por design.
- **Pressupostos:** nenhum risco identificado é bloqueante. Todos podem ser mitigados com ajustes de fluxo, sem alteração arquitetural.
- **Lacunas:** não existe monitoramento de riscos hoje — todos os cenários abaixo seriam detectados apenas por feedback direto (raro) ou abandono silencioso.
- **Riscos:** implementar mitigações para todos os riscos de uma vez pode introduzir complexidade desnecessária. Priorizar os riscos de maior impacto.
- **Conflitos:** nenhum.
- **Impactos futuros:** este mapa de riscos deve ser revisitado após as primeiras 100 entradas reais. Riscos teóricos podem não se confirmar; riscos não mapeados podem surgir.
- **Confirmação de coerência:** coerente com a Jornada Fundacional, com a Auditoria de Implementação, e com os 5 eixos do Programa 15.

---

## 1. Matriz de riscos

Legenda: 🔴 Alto / 🟡 Médio / 🟢 Baixo

| # | Risco | Probabilidade | Impacto | Prioridade |
|---|-------|--------------|---------|------------|
| 1 | Abandono precoce na entrada | 🟡 Média | 🔴 Alto | 🔴 1 |
| 2 | Excesso de perguntas | 🟡 Média | 🟡 Médio | 🟡 2 |
| 3 | Login cedo demais | 🔴 Alta | 🔴 Alto | 🔴 1 |
| 4 | Resumo vago/genérico | 🟡 Média | 🟡 Médio | 🟡 2 |
| 5 | Contexto insuficiente para o Assistente | 🟢 Baixa | 🟡 Médio | 🟡 3 |
| 6 | Superfície excessiva no primeiro login | 🟡 Média | 🔴 Alto | 🔴 1 |
| 7 | Perda de confiança por erro do sistema | 🟢 Baixa | 🔴 Alto | 🔴 2 |
| 8 | Perda de sessão anônima | 🟡 Média | 🟡 Médio | 🟡 2 |
| 9 | Fricção no formulário de cadastro | 🟡 Média | 🟡 Médio | 🟡 2 |
| 10 | Empresário não entende o valor | 🔴 Alta | 🔴 Alto | 🔴 1 |

---

## 2. Detalhamento dos riscos

### Risco 1 — Abandono precoce na entrada

**Descrição:** o empresário chega na landing page, não se identifica com a mensagem, e sai antes de interagir.

**Probabilidade:** 🟡 Média — depende da origem do tráfego e da qualidade da landing

**Impacto:** 🔴 Alto — se ele sai antes de começar, o funil inteiro é perdido

**Sinais de alerta:**
- Taxa de rejeição na landing > 50%
- Tempo na página < 5s
- Baixa taxa de clique no CTA

**Mitigações:**
- Testar diferentes headlines (A/B testing)
- Adicionar prova social quando houver N > 50 diagnósticos
- Garantir carregamento instantâneo (< 2s)
- Versão mobile responsiva (ele acessa do celular)

**Plano de contingência:**
- Se rejeição > 70% por 7 dias consecutivos: pausar campanhas de tráfego e revisar landing page

---

### Risco 2 — Excesso de perguntas

**Descrição:** o empresário acha o diagnóstico longo demais e abandona antes da última pergunta.

**Probabilidade:** 🟡 Média — 17 perguntas é suficiente para gerar contexto, mas pode cansar

**Impacto:** 🟡 Médio — abandono no meio do diagnóstico perde contexto parcial

**Sinais de alerta:**
- Queda na taxa de conclusão do bloco 3 (Gestão) em relação ao bloco 1
- Aumento do tempo médio por pergunta conforme avança
- Feedback explícito "muitas perguntas"

**Mitigações:**
- Manter 17 perguntas (já é o limite ideal identificado)
- Barra de progresso visível (já existe)
- Micro-reações para manter engajamento
- Se houver abandono no bloco 3 consistentemente > 20%, reduzir bloco de gestão para 3 perguntas

**Plano de contingência:**
- Se taxa de conclusão cair abaixo de 40% em qualquer bloco: revisar perguntas daquele bloco

---

### Risco 3 — Login cedo demais

**Descrição:** o sistema pede login ou criação de conta antes do empresário receber valor, e ele abandona.

**Probabilidade:** 🔴 Alta — é exatamente o que acontece hoje (redireciona para /login)

**Impacto:** 🔴 Alto — barreira intransponível para visitantes

**Sinais de alerta:**
- Tráfego na landing → zero conversão para diagnóstico (porque o login bloqueia)
- Sessões anônimas: zero (porque não existe entrada anônima)

**Mitigações:**
- Landing page pública (Eixo 1 — resolvido)
- Diagnóstico sem login (Eixo 1 — resolvido)
- Cookie conv_token gerado automaticamente

**Plano de contingência:**
- Se houver resistência do Conselho em permitir acesso anônimo: implementar com autenticação mínima (e-mail apenas, sem senha)

---

### Risco 4 — Resumo vago/genérico

**Descrição:** o resumo final soa como template, não como análise específica do negócio do empresário.

**Probabilidade:** 🟡 Média — depende da qualidade das interpretações

**Impacto:** 🟡 Médio — resumo genérico não gera confiança; resumo específico gera vínculo

**Sinais de alerta:**
- Taxa de clique em "criar conta" < 5% (indicador de "não me convenceu")
- Feedback 😊 < 50%
- Tempo no resumo < 10s

**Mitigações:**
- Template com placeholders específicos (nome do segmento, número de funcionários, problema declarado)
- 2-3 pontos de atenção personalizados
- Seção "acertou" personalizada com objetivo declarado
- Evitar frases genéricas como "seu negócio tem potencial"

**Plano de contingência:**
- Se feedback 😊 < 30%: identificar quais placeholders estão vazios e revisar o template

---

### Risco 5 — Contexto insuficiente para o Assistente

**Descrição:** o Assistente não tem informações suficientes para responder perguntas do empresário no primeiro login.

**Probabilidade:** 🟢 Baixa — 17 perguntas geram contexto suficiente para o primeiro contato

**Impacto:** 🟡 Médio — Assistente que não sabe responder quebra a confiança

**Sinais de alerta:**
- Mensagens do tipo "Não entendi sua pergunta" > 20% no primeiro login
- Empresário pergunta algo e Assistente não tem dados

**Mitigações:**
- Assistente deve reconhecer limitações: "Ainda não tenho essa informação, mas você pode me contar e eu aprendo."
- Não inventar dados que não existem
- Oferecer ação alternativa: "Quer que eu te ajude a registrar isso?"

**Plano de contingência:**
- Se > 30% das perguntas no primeiro login ficarem sem resposta: ampliar contexto inicial ou adicionar mais perguntas ao diagnóstico

---

### Risco 6 — Superfície excessiva no primeiro login

**Descrição:** o empresário cria conta e vê um dashboard completo com informações demais, sente-se sobrecarregado e não volta.

**Probabilidade:** 🟡 Média — é o que acontece hoje (dashboard completo)

**Impacto:** 🔴 Alto — sobrecarga inicial reduz retorno

**Sinais de alerta:**
- Tempo no primeiro dashboard < 10s
- Nenhum clique além do banner
- Retorno D1 < 20%

**Mitigações:**
- Escopo curado (Eixo 5 — Documento 6)
- Módulos bloqueados visíveis mas não ativos
- Cards de prioridade no centro, não listas

**Plano de contingência:**
- Se retorno D1 continuar baixo mesmo com escopo curado: reduzir ainda mais a superfície (apenas Assistente + 1 card)

---

### Risco 7 — Perda de confiança por erro do sistema

**Descrição:** o sistema interpreta errado uma resposta e o resumo contém informação incorreta sobre o negócio.

**Probabilidade:** 🟢 Baixa — a interpretação é determinística, não generativa

**Impacto:** 🔴 Alto — informação incorreta quebra a confiança imediatamente

**Sinais de alerta:**
- Empresário corrige o Assistente: "Não é bem assim"
- Feedback 😞 > 15%
- Reclamações diretas

**Mitigações:**
- Sistema deve sempre oferecer chance de correção: "Isso está certo?" ao final do resumo
- Se o empresário corrige, o sistema atualiza e pede desculpas: "Obrigado pela correção. Já ajustei."
- Nunca afirmar algo com 100% de certeza se a evidência for fraca

**Plano de contingência:**
- Se taxa de correção > 10%: revisar regras de interpretação para as perguntas mais frequentemente mal interpretadas

---

### Risco 8 — Perda de sessão anônima

**Descrição:** o empresário faz o diagnóstico, sai, e quando volta o cookie expirou — perde todo o progresso.

**Probabilidade:** 🟡 Média — mercê do cookie de 7 dias

**Impacto:** 🟡 Médio — perde o contexto, mas pode refazer em 5 min

**Sinais de alerta:**
- Alta proporção de "novas conversas" de tokens expirados
- Sugestão no feedback: "perdi o que tinha feito"

**Mitigações:**
- Cookie de 7 dias com renovação automática a cada requisição
- Se ele optar por "Guardar e ver depois" e informar e-mail, enviar link único para recuperação
- Aviso no resumo: "Este resumo ficará disponível por mais 7 dias. Crie sua conta para não perder."

**Plano de contingência:**
- Se perda de sessão for um problema recorrente: estender cookie para 14 dias ou permitir recuperação por e-mail sem criar conta

---

### Risco 9 — Fricção no formulário de cadastro

**Descrição:** o empresário decide criar conta, mas o formulário é longo ou confuso, e ele desiste.

**Probabilidade:** 🟡 Média — 4 campos (nome, empresa, e-mail, senha) é razoável

**Impacto:** 🟡 Médio — perde uma conversão que já estava decidida

**Sinais de alerta:**
- Abandono no formulário > 30%
- Erros de validação frequentes
- Tempo no formulário > 3 min

**Mitigações:**
- Formulário de 4 campos, o mínimo necessário
- Validação em tempo real (não após submit)
- Botão "Criar conta com Google" se disponível
- Explicar: "Seus dados do diagnóstico não serão perdidos"

**Plano de contingência:**
- Se abandono > 40%: reduzir para 2 campos (e-mail + senha) e perguntar nome/empresa depois

---

### Risco 10 — Empresário não entende o valor

**Descrição:** o empresário completa o diagnóstico, vê o resumo, mas não entende como a Ponte pode ajudá-lo — e não cria conta.

**Probabilidade:** 🔴 Alta — este é o risco fundamental de qualquer produto novo

**Impacto:** 🔴 Alto — se ele não entende o valor, não há conversão

**Sinais de alerta:**
- Conversão < 5%
- Tempo no resumo > 30s mas sem clique
- Feedback 😐 ou 😞

**Mitigações:**
- O resumo deve terminar com um próximo passo claro
- O convite para criar conta deve ser contextual: "Quer que eu te ajude a resolver [problema específico]?"
- Prova social sutil no convite: "Outros empresários do [segmento] estão usando para [benefício]"
- Garantia de valor: "Se não ajudar em 7 dias, pode cancelar"

**Plano de contingência:**
- Se conversão < 5% por 30 dias: revisar o resumo inteiro (tom, estrutura, profundidade) com base em entrevistas com empresários que não converteram

---

## 3. Riscos que NÃO existem

| Risco considerado | Por que não se aplica |
|-------------------|----------------------|
| Vazamento de dados anônimos | Conversa anônima não contém dados pessoais |
| Sobrecarga do servidor | Landing page é estática, conversa é leve |
| Fraude/criação massiva de contas | Rate limiting + validação de e-mail |
| Canibalização de produto pago | Não há produto pago ainda (fase de validação) |

---

## 4. Monitoramento de riscos

### 4.1 Gatilhos de ação

| Risco | Gatilho | Ação |
|-------|---------|------|
| Abandono precoce | Rejeição > 50% | Revisar landing page |
| Excesso de perguntas | Conclusão < 40% em bloco | Revisar perguntas do bloco |
| Login cedo demais | Zero conversão | Verificar se landing está pública |
| Resumo vago | Conversão < 5% | Revisar template |
| Contexto insuficiente | 30% sem resposta no Assistente | Ampliar escopo de perguntas |
| Superfície excessiva | Retorno D1 < 20% | Reduzir escopo do dashboard |
| Perda de confiança | Feedback 😞 > 15% | Investigar erros de interpretação |
| Perda de sessão | Cookie expirado sem cadastro | Estender prazo ou permitir recall |
| Fricção no cadastro | Abandono > 30% | Simplificar formulário |
| Valor não entendido | Conversão < 5% sustentado | Pesquisa qualitativa |

### 4.2 Revisão periódica

O mapa de riscos deve ser revisitado:
- Após cada 100 entradas reais (ajuste fino)
- Quando houver mudança significativa no fluxo de entrada
- Se qualquer gatilho de ação for disparado

---

*Documento concluído. Avançando para Documento 9.*
