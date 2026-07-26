# Configuração do Provider IA (Groq)

A Ponte Digital usa Groq como provider de IA padrão — gratuito, rápido e compatível com a API da OpenAI.

## 1. Criar conta no Groq

1. Acesse https://console.groq.com
2. Clique em "Sign Up" (GitHub ou e-mail)
3. Confirme o e-mail

## 2. Gerar chave de API

1. Acesse https://console.groq.com/keys
2. Clique em "Create API Key"
3. Dê um nome (ex: "Ponte Digital")
4. Copie a chave gerada (começa com `gsk_`)

## 3. Configurar na aplicação

### Local (.env)
```env
GROQ_API_KEY=gsk_seu_token_aqui
AI_MODEL=llama-3.3-70b-versatile
```

### Vercel (Production + Preview + Development)
Adicionar nas Environment Variables do projeto:
- `GROQ_API_KEY` = gsk_seu_token_aqui
- `AI_MODEL` = llama-3.3-70b-versatile

## 4. Verificar funcionamento

Após configurar, teste pelo assistente IA no dashboard. Se a chave for inválida, o sistema cai no `NoopProvider` (respostas vazias) — nada quebra, apenas o chat não responde.

## Modelos disponíveis (gratuitos)

| Modelo | Contexto | Uso recomendado |
|--------|----------|-----------------|
| `llama-3.3-70b-versatile` | 128K | Padrão — melhor custo-benefício |
| `llama-3.1-8b-instant` | 128K | Respostas mais rápidas |
| `mixtral-8x7b-32768` | 32K | Alternativa |

## Fallback

Se `GROQ_API_KEY` não estiver definida, o sistema tenta `ANTHROPIC_API_KEY`. Se nenhuma existir, o assistente opera sem IA (apenas respostas baseadas em regras estáticas).
