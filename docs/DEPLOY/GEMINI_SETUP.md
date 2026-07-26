# Configuração do Google Gemini (Provider IA Padrão)

## 1. Criar conta no Google AI Studio

1. Acesse https://aistudio.google.com/apikey
2. Faça login com sua conta Google
3. Clique em "Create API Key"
4. Selecione ou crie um projeto no Google Cloud

## 2. Gerar chave de API

1. No AI Studio, clique em "Get API Key"
2. Copie a chave gerada
3. A chave é gratuita com limites generosos (60 req/min)

## 3. Configurar na aplicação

### Local (.env)
```env
AI_PROVIDER=google
GOOGLE_API_KEY=AIza_sua_chave_aqui
AI_MODEL=gemini-2.5-flash
```

### Vercel (Production + Preview + Development)
Adicionar nas Environment Variables:
- `AI_PROVIDER` = `google`
- `GOOGLE_API_KEY` = AIza_sua_chave_aqui
- `AI_MODEL` = `gemini-2.5-flash`

## 4. Modelos disponíveis

| Modelo | Uso |
|--------|-----|
| `gemini-2.5-flash` | Padrão — rápido e gratuito |
| `gemini-2.5-pro` | Mais capacidade (limites maiores) |
| `gemini-1.5-flash` | Versão anterior, mais leve |

## 5. Fallback

Se `AI_PROVIDER=google` mas `GOOGLE_API_KEY` não estiver definida, o sistema usa `NoopProvider` (respostas vazias). Nada quebra — apenas o chat não responde.
