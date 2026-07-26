export interface ChatMessage {
  role: 'user' | 'assistant' | 'system'
  content: string
}

export interface StreamChunk {
  type: 'text'
  text: string
}

export interface AIStream {
  [Symbol.asyncIterator](): AsyncIterator<StreamChunk>
}

export interface AIProvider {
  streamChat(messages: ChatMessage[], opts?: {
    system?: string
    maxTokens?: number
  }): Promise<AIStream>
}

// ─── Google Gemini Provider ─────────────────────────────────

import { GeminiProvider } from '@/lib/providers/gemini-provider'

// ─── Groq Provider (compatibilidade) ─────────────────────────

class GroqStream implements AIStream {
  private reader: ReadableStreamDefaultReader<Uint8Array>
  private buffer = ''

  constructor(body: ReadableStream<Uint8Array>) {
    this.reader = body.getReader()
  }

  async *[Symbol.asyncIterator](): AsyncIterator<StreamChunk> {
    const decoder = new TextDecoder()
    while (true) {
      const { done, value } = await this.reader.read()
      if (done) break
      this.buffer += decoder.decode(value, { stream: true })
      const lines = this.buffer.split('\n')
      this.buffer = lines.pop() || ''
      for (const line of lines) {
        if (!line.startsWith('data: ')) continue
        const data = line.slice(6).trim()
        if (data === '[DONE]') return
        try {
          const parsed = JSON.parse(data)
          const content = parsed.choices?.[0]?.delta?.content || ''
          if (content) yield { type: 'text' as const, text: content }
        } catch { /* skip malformed chunk */ }
      }
    }
  }
}

class GroqProvider implements AIProvider {
  private apiKey: string
  private baseUrl = 'https://api.groq.com/openai/v1'

  constructor(apiKey: string) { this.apiKey = apiKey }

  async streamChat(messages: ChatMessage[], opts?: { system?: string; maxTokens?: number }) {
    const body: Record<string, unknown> = {
      model: process.env.AI_MODEL ?? 'llama-3.3-70b-versatile',
      messages: messages.map(({ role, content }) => ({ role, content })),
      stream: true,
      max_tokens: opts?.maxTokens ?? 1024,
    }
    if (opts?.system) {
      (body.messages as Array<Record<string, string>>).unshift({ role: 'system', content: opts.system })
    }
    const response = await fetch(`${this.baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
    if (!response.ok) {
      const error = await response.text()
      throw new Error(`Groq API error (${response.status}): ${error}`)
    }
    return new GroqStream(response.body!)
  }
}

// ─── Anthropic Provider (compatibilidade) ────────────────────

class AnthropicStream implements AIStream {
  private stream: AsyncIterable<any>
  constructor(stream: AsyncIterable<any>) { this.stream = stream }

  [Symbol.asyncIterator](): AsyncIterator<StreamChunk> {
    const iter = this.stream[Symbol.asyncIterator]()
    return {
      async next() {
        const { value, done } = await iter.next()
        if (done) return { value: undefined as any, done: true }
        if (value.type === 'content_block_delta' && value.delta.type === 'text_delta') {
          return { value: { type: 'text' as const, text: value.delta.text }, done: false }
        }
        return { value: { type: 'text' as const, text: '' }, done: false }
      },
    }
  }
}

class AnthropicProvider implements AIProvider {
  private client: any

  constructor(apiKey: string) {
    const Anthropic = require('@anthropic-ai/sdk').default
    this.client = new Anthropic({ apiKey })
  }

  async streamChat(messages: ChatMessage[], opts?: { system?: string; maxTokens?: number }) {
    const stream = await this.client.messages.create({
      model: process.env.AI_MODEL ?? 'claude-sonnet-4-6',
      max_tokens: opts?.maxTokens ?? 1024,
      system: opts?.system,
      messages: messages.map(({ role, content }) => ({ role, content })),
      stream: true,
    })
    return new AnthropicStream(stream)
  }
}

// ─── No-op Provider (fallback quando não há API key) ─────────

class NoopProvider implements AIProvider {
  async streamChat() {
    return {
      [Symbol.asyncIterator](): AsyncIterator<StreamChunk> {
        return {
          next() {
            return Promise.resolve({ value: { type: 'text' as const, text: '' }, done: true })
          },
        }
      },
    }
  }
}

// ─── Factory ─────────────────────────────────────────────────

let _provider: AIProvider | null = null

function hasKey(key: string | undefined): boolean {
  return !!key && key !== 'dummy' && key.length > 0
}

export function getAIProvider(): AIProvider {
  if (_provider) return _provider

  const provider = (process.env.AI_PROVIDER || 'google').toLowerCase()

  if (provider === 'google') {
    const key = process.env.GOOGLE_API_KEY
    if (hasKey(key)) {
      _provider = new GeminiProvider(key!)
    }
  } else if (provider === 'groq') {
    const key = process.env.GROQ_API_KEY
    if (hasKey(key)) {
      _provider = new GroqProvider(key!)
    }
  } else if (provider === 'anthropic') {
    const key = process.env.ANTHROPIC_API_KEY
    if (hasKey(key)) {
      _provider = new AnthropicProvider(key!)
    }
  }

  if (!_provider) {
    _provider = new NoopProvider()
  }
  return _provider
}

export function resetAIProvider(): void {
  _provider = null
}
